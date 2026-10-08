import { describe, expect, it } from 'vitest';
import { builtinBank, builtinSets } from './registry';
import { validateSets } from './validate';
import { clozeGaps, parseCloze } from './items';
import type { TaskType } from './types';

describe('banco de preguntas integrado', () => {
  it('no tiene errores de validación', () => {
    expect(validateSets(builtinSets)).toEqual([]);
  });

  it('contiene contenido para todas las tareas del formato 2026', () => {
    const tasks: TaskType[] = [
      'complete-words', 'daily-life', 'academic-passage', 'choose-response', 'conversation', 'announcement',
      'academic-talk', 'build-sentence', 'email', 'academic-discussion', 'listen-repeat', 'interview',
    ];
    for (const t of tasks) expect(builtinBank.sets.some((s) => s.task === t), t).toBe(true);
  });

  it('cada Complete the Words tiene 10 huecos', () => {
    for (const s of builtinBank.sets) {
      if (s.task === 'complete-words') expect(clozeGaps(s.text).length, s.id).toBe(10);
    }
  });

  it('cubre los 10 temas sugeridos', () => {
    const topics = new Set(builtinBank.sets.map((s) => s.topic));
    for (const t of ['biology', 'history', 'geology', 'engineering', 'environment', 'psychology', 'economics', 'sociology', 'art', 'technology']) {
      expect(topics.has(t as never), t).toBe(true);
    }
  });

  it('detecta errores en packs inválidos', () => {
    const bad = [
      { id: 'x1', section: 'reading', task: 'daily-life', title: 'T', topic: 'biology', difficulty: 'easy', genre: 'email', text: 'hi',
        questions: [{ id: 'x1-q', kind: 'single', skill: 'detail', prompt: 'p', options: ['a', 'b'], answer: [5], explanation: 'e' }] },
      { id: 'x1', section: 'listening', task: 'daily-life', title: '', topic: 'nope', difficulty: 'impossible' },
    ];
    const issues = validateSets(bad);
    const messages = issues.map((i) => i.message).join('\n');
    expect(messages).toMatch(/fuera de rango/);
    expect(messages).toMatch(/duplicado/);
    expect(messages).toMatch(/Tema inválido/);
    expect(messages).toMatch(/Dificultad inválida/);
  });

  it('parsea huecos con prefijo y letras ausentes', () => {
    const segs = parseCloze('A {{bi|g}} dog {{r|uns}}.');
    expect(segs.filter((s) => s.type === 'gap').map((s) => s.gap?.word)).toEqual(['big', 'runs']);
  });
});
