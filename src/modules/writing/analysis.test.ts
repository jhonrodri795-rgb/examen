import { describe, expect, it } from 'vitest';
import { analyzeWriting, grammarFlags, mattr, splitSentences } from './analysis';

describe('reglas gramaticales', () => {
  it('detecta errores frecuentes con citas del texto', () => {
    const rules = grammarFlags('i think he dont know. People is happy and this is more better. We could of gone. It was a amazing day and an big success. the the end.').map((f) => f.rule);
    expect(rules).toEqual(expect.arrayContaining(['pronoun-i', 'third-person-dont', 'people-is', 'double-comparative', 'modal-of', 'article-a', 'article-an', 'repeated-word']));
  });
  it('no marca usos correctos', () => {
    expect(grammarFlags('I think a university is an honest place, i.e. a good one. That that is fine.')).toEqual([]);
  });
});

describe('métricas de texto', () => {
  it('divide oraciones y calcula diversidad', () => {
    expect(splitSentences('Hello there. How are you? Fine!')).toHaveLength(3);
    expect(mattr(['a', 'b', 'c', 'd'])).toBe(1);
    expect(mattr(['a', 'a', 'a', 'a'])).toBe(0.25);
  });

  it('comprueba los requisitos de un correo', () => {
    const a = analyzeWriting(
      'Dear Professor Martinez,\n\nI cannot present on Tuesday because my sister is getting married. Could I present on Thursday instead? Should I prepare anything differently?\n\nBest regards,\nAlex',
      { task: 'email', recommendedWords: [80, 140], bulletPoints: ['Explain why you cannot present on Tuesday.', 'Suggest a new date for your presentation.', 'Ask whether you should prepare anything differently.'] },
    );
    const byLabel = Object.fromEntries(a.taskChecks.map((c) => [c.label, c.met]));
    expect(byLabel['Saludo inicial']).toBe(true);
    expect(byLabel['Despedida']).toBe(true);
    expect(byLabel['Extensión recomendada']).toBe(false);
    expect(a.lengthStatus).toBe('short');
    expect(a.heuristic.overall5).toBeGreaterThan(0);
    expect(a.heuristic.criteria.find((c) => c.criterion === 'development')!.score).toBeLessThan(4);
  });

  it('un texto vacío puntúa 0', () => {
    const a = analyzeWriting('', { task: 'academic-discussion', recommendedWords: [100, 150], classmates: ['Claire'] });
    expect(a.wordCount).toBe(0);
    expect(a.heuristic.overall5).toBe(0);
  });
});
