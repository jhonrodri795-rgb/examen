import { describe, expect, it } from 'vitest';
import { buildBank, builtinSets } from '../question-bank/registry';
import { clozeGaps } from '../question-bank/items';
import type { ContentSet } from '../question-bank/types';
import { toeflIbt2026 } from './blueprints/toefl-ibt-2026';
import { beginSection, createAttempt, currentModule, finishModule, setResponse } from './engine';
import { attemptTitle, formStatuses, nextForm } from './forms-progress';
import type { Attempt, ExamConfig, Response } from './types';

const T0 = 1_700_000_000_000;

/** Copia del banco general como formulario `n` (ids con prefijo propio). */
function asForm(n: number): ContentSet[] {
  const base = builtinSets.filter((s) => !s.form);
  return base.map((s) => ({ ...(JSON.parse(JSON.stringify(s).replace(/"id":"/g, `"id":"t${n}-`)) as ContentSet), form: n }));
}
const general = builtinSets.filter((s) => !s.form);
const bank = buildBank([...general, ...asForm(1), ...asForm(2)]);

function config(partial: Partial<ExamConfig> = {}): ExamConfig {
  return {
    kind: 'full', mode: 'exam', blueprintId: toeflIbt2026.id, sections: ['reading', 'listening', 'writing', 'speaking'],
    timing: 'standard', instantFeedback: false, relaxedListening: false, speakingPrepSec: 0, seed: 7, ...partial,
  };
}

function answerFor(itemId: string, correct: boolean): Response | null {
  const item = bank.itemById.get(itemId)!;
  const set = bank.setById.get(item.setId)!;
  if (item.kind === 'choice' && 'questions' in set && set.task !== 'interview') {
    const q = set.questions.find((x) => x.id === itemId)!;
    return { kind: 'choice', selected: correct ? [...q.answer] : [q.options.findIndex((_, i) => !q.answer.includes(i))] };
  }
  if (item.kind === 'gap' && set.task === 'complete-words') {
    const gap = clozeGaps(set.text)[Number(itemId.split('-g').pop()) - 1]!;
    return { kind: 'gap', value: correct ? gap.missing : 'zzz' };
  }
  return null;
}

const setsOf = (a: Attempt) => a.sections.flatMap((s) => s.modules.flatMap((m) => m.setIds));
const formOf = (id: string) => bank.setById.get(id)!.form;

describe('simulaciones completas con contenido propio', () => {
  it('con formulario, todo el contenido del intento es de ese formulario', () => {
    const a = createAttempt(config({ form: 2 }), toeflIbt2026, bank, {}, T0);
    const ids = setsOf(a);
    expect(ids.length).toBeGreaterThan(10);
    expect(ids.every((id) => formOf(id) === 2)).toBe(true);
    expect(a.sections.flatMap((s) => s.modules.flatMap((m) => m.warnings))).toEqual([]);
  });

  it('formularios distintos no comparten ningún set', () => {
    const a = new Set(setsOf(createAttempt(config({ form: 1 }), toeflIbt2026, bank, {}, T0)));
    const b = setsOf(createAttempt(config({ form: 2 }), toeflIbt2026, bank, {}, T0));
    expect(b.some((id) => a.has(id))).toBe(false);
  });

  it.each([
    ['superior', true],
    ['inferior', false],
  ])('el módulo adaptativo (ruta %s) también sale del formulario', (_, correct) => {
    let a = createAttempt(config({ form: 1, sections: ['reading'] }), toeflIbt2026, bank, {}, T0);
    a = beginSection(a, T0);
    for (const id of currentModule(a)!.itemIds) {
      const r = answerFor(id, correct);
      if (r) a = setResponse(a, id, r, T0 + 1000);
    }
    a = finishModule(a, bank, T0 + 2000);
    const m2 = a.sections[0]!.modules[1]!;
    expect(m2.setIds.length).toBeGreaterThan(0);
    expect(m2.setIds.every((id) => formOf(id) === 1)).toBe(true);
    expect(m2.warnings).toEqual([]);
  });

  it('sin formulario (aleatoria o práctica) no gasta contenido de las simulaciones', () => {
    const a = createAttempt(config(), toeflIbt2026, bank, {}, T0);
    expect(setsOf(a).every((id) => !formOf(id))).toBe(true);
  });

  it('si al formulario le falta contenido, completa con el banco general y lo avisa', () => {
    const partial = buildBank([...general, ...asForm(3).filter((s) => s.task !== 'email')]);
    const a = createAttempt(config({ form: 3, sections: ['writing'] }), toeflIbt2026, partial, {}, T0);
    const email = a.sections[0]!.modules[1]!;
    expect(email.setIds).toHaveLength(1);
    expect(partial.setById.get(email.setIds[0]!)!.form).toBeUndefined();
    expect(email.warnings.join(' ')).toMatch(/formulario 3/);
  });
});

describe('progreso de las simulaciones', () => {
  const att = (form: number, status: Attempt['status'], updatedAt: number, band?: number) =>
    ({ id: `a${form}-${updatedAt}`, status, updatedAt, config: config({ form }), results: band === undefined ? undefined : { overallBand: band } }) as unknown as Attempt;

  it('marca hechas, en curso y sin contenido', () => {
    const st = formStatuses([att(1, 'completed', 10, 4), att(1, 'completed', 20, 4.5), att(2, 'in-progress', 30)], bank);
    expect(st).toHaveLength(20);
    expect(st[0]).toMatchObject({ form: 1, available: true, completed: 2, lastCompletedAt: 20, bestBand: 4.5, inProgressId: null });
    expect(st[1]).toMatchObject({ form: 2, available: true, completed: 0, inProgressId: 'a2-30' });
    expect(st[2]).toMatchObject({ form: 3, available: false });
  });

  it('propone la primera no hecha; después la completada hace más tiempo', () => {
    expect(nextForm(formStatuses([], bank))).toBe(1);
    expect(nextForm(formStatuses([att(1, 'completed', 10)], bank))).toBe(2);
    // La n.º 2 en curso: se propone solo si no queda ninguna nueva.
    expect(nextForm(formStatuses([att(1, 'completed', 10), att(2, 'in-progress', 20)], bank))).toBe(2);
    expect(nextForm(formStatuses([att(1, 'completed', 30), att(2, 'completed', 20)], bank))).toBe(2);
    expect(nextForm(formStatuses([], buildBank(general)))).toBeNull();
  });

  it('el título indica el número de simulación', () => {
    expect(attemptTitle({ config: config({ form: 7 }), blueprint: toeflIbt2026 } as Attempt)).toBe(`${toeflIbt2026.name} · Simulación n.º 7`);
    expect(attemptTitle({ config: config(), blueprint: toeflIbt2026 } as Attempt)).toBe(toeflIbt2026.name);
  });
});
