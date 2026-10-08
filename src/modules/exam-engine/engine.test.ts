import { describe, expect, it } from 'vitest';
import { builtinBank } from '../question-bank/registry';
import { clozeGaps } from '../question-bank/items';
import type { ContentSet } from '../question-bank/types';
import { toeflIbt2026, toeflQuick2026 } from './blueprints/toefl-ibt-2026';
import {
  beginModule, beginSection, canEdit, canGoTo, checkItem, createAttempt, currentModule, finishModule, goToPage,
  nextSection, rateItem, recoverInterrupted, resumeAttempt, setResponse, skipSection, submitAttempt,
} from './engine';
import { remainingMs } from './timer';
import type { Attempt, ExamConfig, Response } from './types';

const bank = builtinBank;
const T0 = 1_700_000_000_000;

function config(partial: Partial<ExamConfig> = {}): ExamConfig {
  return {
    kind: 'full', mode: 'exam', blueprintId: toeflIbt2026.id, sections: ['reading', 'listening', 'writing', 'speaking'],
    timing: 'standard', instantFeedback: false, relaxedListening: false, speakingPrepSec: 0, seed: 42, ...partial,
  };
}

/** Respuesta correcta (o incorrecta) para cualquier ítem objetivo. */
function answerFor(itemId: string, correct: boolean): Response | null {
  const item = bank.itemById.get(itemId)!;
  const set = bank.setById.get(item.setId) as ContentSet;
  if (item.kind === 'choice' && 'questions' in set && set.task !== 'interview') {
    const q = set.questions.find((x) => x.id === itemId)!;
    return { kind: 'choice', selected: correct ? [...q.answer] : [q.options.findIndex((_, i) => !q.answer.includes(i))] };
  }
  if (item.kind === 'gap' && set.task === 'complete-words') {
    const gap = clozeGaps(set.text)[Number(itemId.split('-g').pop()) - 1]!;
    return { kind: 'gap', value: correct ? gap.missing : 'zzz' };
  }
  if (item.kind === 'order' && set.task === 'build-sentence') {
    return { kind: 'order', order: correct ? [...set.chunks] : [...set.chunks].reverse() };
  }
  return null;
}

function answerModule(a: Attempt, correct: boolean, now: number): Attempt {
  let out = a;
  for (const id of currentModule(out)!.itemIds) {
    const r = answerFor(id, correct);
    if (r) out = setResponse(out, id, r, now);
  }
  return out;
}

describe('ensamblaje del examen', () => {
  it('crea un intento completo con la estructura 2026', () => {
    const a = createAttempt(config(), toeflIbt2026, bank, {}, T0);
    expect(a.sections.map((s) => s.id)).toEqual(['reading', 'listening', 'writing', 'speaking']);
    const reading = a.sections[0]!;
    expect(reading.modules[0]!.itemIds.length).toBeGreaterThanOrEqual(18);
    expect(reading.modules[1]!.setIds).toEqual([]); // adaptativo: se ensambla después
    const writing = a.sections[2]!;
    expect(writing.modules.map((m) => m.itemIds.length)).toEqual([10, 1, 1]);
    expect(a.sections[3]!.modules[0]!.itemIds.length).toBe(11);
    expect(a.sections.flatMap((s) => s.modules.flatMap((m) => m.warnings))).toEqual([]);
  });

  it('no repite sets dentro de un intento y es reproducible con la misma semilla', () => {
    const a = createAttempt(config(), toeflIbt2026, bank, {}, T0);
    const b = createAttempt(config(), toeflIbt2026, bank, {}, T0);
    const ids = a.sections.flatMap((s) => s.modules.flatMap((m) => m.setIds));
    expect(new Set(ids).size).toBe(ids.length);
    expect(b.sections.flatMap((s) => s.modules.flatMap((m) => m.setIds))).toEqual(ids);
  });

  it('prioriza contenido no visto según la exposición previa', () => {
    const first = createAttempt(config({ sections: ['writing'] }), toeflIbt2026, bank, {}, T0);
    const email1 = first.sections[0]!.modules[1]!.setIds[0]!;
    const second = createAttempt(config({ sections: ['writing'], seed: 42 }), toeflIbt2026, bank, { [email1]: 3 }, T0);
    expect(second.sections[0]!.modules[1]!.setIds[0]).not.toBe(email1);
  });

  it('el blueprint breve también se ensambla sin avisos', () => {
    const a = createAttempt(config({ blueprintId: toeflQuick2026.id }), toeflQuick2026, bank, {}, T0);
    expect(a.sections.flatMap((s) => s.modules.flatMap((m) => m.warnings))).toEqual([]);
  });
});

describe('navegación y respuestas', () => {
  it('conserva las respuestas al navegar entre preguntas', () => {
    let a = createAttempt(config({ sections: ['reading'] }), toeflIbt2026, bank, {}, T0);
    a = beginSection(a, T0);
    const mod = currentModule(a)!;
    const first = mod.pages[1]!.itemIds[0]!;
    a = goToPage(a, 1, T0 + 1000);
    a = setResponse(a, first, answerFor(first, true)!, T0 + 2000);
    a = goToPage(a, 3, T0 + 3000);
    a = goToPage(a, 1, T0 + 4000);
    expect(a.cursor.page).toBe(1);
    expect(a.responses[first]).toEqual(answerFor(first, true));
  });

  it('Listening en modo examen no permite volver atrás', () => {
    let a = createAttempt(config({ sections: ['listening'] }), toeflIbt2026, bank, {}, T0);
    a = beginSection(a, T0);
    a = goToPage(a, 1, T0 + 1);
    expect(a.cursor.page).toBe(1);
    expect(canGoTo(a, 0)).toBe(false);
    expect(canGoTo(a, 2)).toBe(true);
    expect(canGoTo(a, 3)).toBe(false);
  });

  it('Listening en modo práctica relajado permite navegar libremente', () => {
    let a = createAttempt(config({ sections: ['listening'], mode: 'practice', relaxedListening: true }), toeflIbt2026, bank, {}, T0);
    a = beginSection(a, T0);
    a = goToPage(a, 3, T0 + 1);
    expect(canGoTo(a, 0)).toBe(true);
  });

  it('en práctica, comprobar una respuesta la bloquea', () => {
    let a = createAttempt(config({ sections: ['reading'], mode: 'practice', instantFeedback: true }), toeflIbt2026, bank, {}, T0);
    a = beginSection(a, T0);
    const id = currentModule(a)!.pages[1]!.itemIds[0]!;
    a = setResponse(a, id, answerFor(id, false)!, T0 + 1);
    a = checkItem(a, id, T0 + 2);
    expect(canEdit(a, id, T0 + 3)).toBe(false);
    const after = setResponse(a, id, answerFor(id, true)!, T0 + 4);
    expect(after.responses[id]).toEqual(answerFor(id, false));
  });

  it('en modo examen no se pueden revelar soluciones', () => {
    let a = createAttempt(config({ sections: ['reading'] }), toeflIbt2026, bank, {}, T0);
    a = beginSection(a, T0);
    const id = currentModule(a)!.itemIds[0]!;
    expect(checkItem(a, id, T0).checked[id]).toBeUndefined();
  });
});

describe('módulos adaptativos', () => {
  it('asigna la ruta superior con buen rendimiento', () => {
    let a = createAttempt(config({ sections: ['reading'] }), toeflIbt2026, bank, {}, T0);
    a = beginSection(a, T0);
    a = answerModule(a, true, T0 + 1000);
    a = finishModule(a, bank, T0 + 2000);
    expect(a.cursor.stage).toBe('module-intro');
    expect(a.sections[0]!.route).toBe('upper');
    const m2 = a.sections[0]!.modules[1]!;
    expect(m2.variant).toBe('upper');
    expect(m2.setIds.every((id) => bank.setById.get(id)!.difficulty === 'hard')).toBe(true);
  });

  it('asigna la ruta inferior con bajo rendimiento', () => {
    let a = createAttempt(config({ sections: ['listening'] }), toeflIbt2026, bank, {}, T0);
    a = beginSection(a, T0);
    a = answerModule(a, false, T0 + 1000);
    a = finishModule(a, bank, T0 + 2000);
    expect(a.sections[0]!.route).toBe('lower');
    const m1Sets = new Set(a.sections[0]!.modules[0]!.setIds);
    expect(a.sections[0]!.modules[1]!.setIds.some((id) => m1Sets.has(id))).toBe(false);
  });
});

describe('temporizadores', () => {
  it('cuenta hacia atrás y bloquea las respuestas al agotarse', () => {
    let a = createAttempt(config({ sections: ['reading'] }), toeflIbt2026, bank, {}, T0);
    a = beginSection(a, T0);
    const mod = currentModule(a)!;
    expect(remainingMs(mod.timer, T0 + 60_000)).toBe(13 * 60_000 - 60_000);
    const id = mod.itemIds[0]!;
    expect(canEdit(a, id, T0 + 13 * 60_000 + 1)).toBe(false);
    const after = setResponse(a, id, answerFor(id, true)!, T0 + 13 * 60_000 + 1);
    expect(after.responses[id]).toBeUndefined();
  });

  it('el tiempo extendido multiplica por 1,5 y sin tiempo no hay límite', () => {
    const ext = createAttempt(config({ sections: ['reading'], timing: 'extended' }), toeflIbt2026, bank, {}, T0);
    expect(ext.sections[0]!.modules[0]!.timer.limitMs).toBe(13 * 60_000 * 1.5);
    const none = createAttempt(config({ sections: ['reading'], timing: 'untimed' }), toeflIbt2026, bank, {}, T0);
    expect(none.sections[0]!.modules[0]!.timer.limitMs).toBeNull();
  });

  it('al finalizar por tiempo registra el motivo', () => {
    let a = createAttempt(config({ sections: ['writing'] }), toeflIbt2026, bank, {}, T0);
    a = beginSection(a, T0);
    a = finishModule(a, bank, T0 + 6 * 60_000, 'timeout');
    expect(a.sections[0]!.modules[0]!.endReason).toBe('timeout');
    expect(a.sections[0]!.modules[0]!.timer.elapsedMs).toBe(6 * 60_000);
  });

  it('recupera una sesión interrumpida sin perder tiempo ni respuestas', () => {
    let a = createAttempt(config({ sections: ['reading'] }), toeflIbt2026, bank, {}, T0);
    a = beginSection(a, T0);
    const id = currentModule(a)!.itemIds[0]!;
    a = setResponse(a, id, answerFor(id, true)!, T0 + 30_000); // updatedAt = T0+30s
    const recovered = recoverInterrupted(a);
    expect(recovered.interrupted).toBe(true);
    const mod = currentModule(recovered)!;
    expect(mod.timer.startedAt).toBeNull();
    expect(mod.timer.elapsedMs).toBe(30_000);
    expect(recovered.responses[id]).toEqual(answerFor(id, true));
    const resumed = resumeAttempt(recovered, T0 + 10 * 60_000);
    expect(remainingMs(currentModule(resumed)!.timer, T0 + 10 * 60_000)).toBe(13 * 60_000 - 30_000);
  });
});

describe('finalización y resultados', () => {
  it('completa un examen y calcula bandas', () => {
    let a = createAttempt(config(), toeflIbt2026, bank, {}, T0);
    let t = T0;
    // Reading y Listening: todo correcto.
    for (let s = 0; s < 2; s++) {
      a = beginSection(a, (t += 1000));
      a = answerModule(a, true, (t += 1000));
      a = finishModule(a, bank, (t += 1000));
      a = beginModule(a, (t += 1000));
      a = answerModule(a, true, (t += 1000));
      a = finishModule(a, bank, (t += 1000));
      expect(a.cursor.stage).toBe('section-end');
      a = nextSection(a, bank, (t += 1000));
    }
    // Writing: frases correctas, ensayos sin valorar.
    a = beginSection(a, (t += 1000));
    a = answerModule(a, true, (t += 1000));
    a = finishModule(a, bank, (t += 1000));
    for (let i = 0; i < 2; i++) {
      a = beginModule(a, (t += 1000));
      const id = currentModule(a)!.itemIds[0]!;
      a = setResponse(a, id, { kind: 'essay', text: 'I believe this is a good idea because…', updatedAt: t }, (t += 1000));
      a = finishModule(a, bank, (t += 1000));
    }
    a = nextSection(a, bank, (t += 1000));
    // Speaking omitido (sin micrófono).
    a = skipSection(a, 'Micrófono no disponible', (t += 1000));
    a = nextSection(a, bank, (t += 1000));

    expect(a.status).toBe('completed');
    const r = a.results!;
    expect(r.sections[0]!.band).toBe(6);
    expect(r.sections[0]!.route).toBe('upper');
    expect(r.sections[1]!.band).toBe(6);
    expect(r.sections[2]!.status).toBe('pending');
    expect(r.sections[3]!.status).toBe('skipped');
    expect(r.overallBand).toBeNull();

    // Valorar los ensayos con la rúbrica recalcula Writing.
    const essays = a.sections[2]!.modules.slice(1).map((m) => m.itemIds[0]!);
    for (const id of essays) a = rateItem(a, id, { source: 'self', overall: 4, at: t }, bank, t);
    const w = a.results!.sections[2]!;
    expect(w.status).toBe('scored');
    // 0.3*6 (frases) + 0.3*5 + 0.4*5 = 5.3 → 5.5
    expect(w.band).toBe(5.5);
  });

  it('entregar antes de tiempo marca las secciones no iniciadas como omitidas', () => {
    let a = createAttempt(config(), toeflIbt2026, bank, {}, T0);
    a = beginSection(a, T0);
    a = submitAttempt(a, bank, T0 + 5000);
    expect(a.status).toBe('completed');
    expect(a.sections.slice(1).every((s) => s.status === 'skipped')).toBe(true);
    expect(a.results!.sections[0]!.objective.unanswered).toBeGreaterThan(0);
  });

  it('práctica personalizada crea una sección por cada sección elegida', () => {
    const a = createAttempt(
      config({ kind: 'custom', mode: 'practice', customSetIds: ['rd-ap-camels', 'wr-em-gym-equipment', 'ls-cr-seat'] }),
      toeflIbt2026, bank, {}, T0,
    );
    expect(a.sections.map((s) => s.id)).toEqual(['reading', 'listening', 'writing']);
    expect(a.sections[2]!.modules[0]!.timer.limitMs).toBe(420_000);
  });
});
