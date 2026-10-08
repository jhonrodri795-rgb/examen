import { describe, expect, it } from 'vitest';
import { builtinBank } from '../question-bank/registry';
import { DEFAULT_SCORING } from '../exam-engine/blueprints/toefl-ibt-2026';
import { accuracyToRubric, cefrFor, interpolate, legacyEquivalent, roundToStep, rubricToBand, scoreItem } from './score';

const item = (id: string) => builtinBank.itemById.get(id)!;
const set = (id: string) => builtinBank.setById.get(id)!;

describe('puntuación por ítem', () => {
  it('opción única', () => {
    const it1 = item('rd-ap-camels-q1');
    expect(scoreItem(it1, set('rd-ap-camels'), { kind: 'choice', selected: [1] }).status).toBe('correct');
    expect(scoreItem(it1, set('rd-ap-camels'), { kind: 'choice', selected: [0] }).status).toBe('incorrect');
    expect(scoreItem(it1, set('rd-ap-camels'), undefined).status).toBe('unanswered');
    expect(scoreItem(it1, set('rd-ap-camels'), { kind: 'choice', selected: [] }).status).toBe('unanswered');
  });

  it('selección múltiple exige todas las respuestas', () => {
    const q = item('rd-ap-camels-q5');
    expect(scoreItem(q, set('rd-ap-camels'), { kind: 'choice', selected: [2, 0] }).status).toBe('correct');
    expect(scoreItem(q, set('rd-ap-camels'), { kind: 'choice', selected: [0] }).status).toBe('incorrect');
    expect(scoreItem(q, set('rd-ap-camels'), { kind: 'choice', selected: [0, 2, 3] }).status).toBe('incorrect');
  });

  it('Complete the Words acepta las letras que faltan o la palabra completa, sin distinguir mayúsculas', () => {
    const g1 = item('rd-cw-bees-g1'); // vis|its
    expect(scoreItem(g1, set('rd-cw-bees'), { kind: 'gap', value: 'its' }).status).toBe('correct');
    expect(scoreItem(g1, set('rd-cw-bees'), { kind: 'gap', value: ' ITS ' }).status).toBe('correct');
    expect(scoreItem(g1, set('rd-cw-bees'), { kind: 'gap', value: 'visits' }).status).toBe('correct');
    expect(scoreItem(g1, set('rd-cw-bees'), { kind: 'gap', value: 'it' }).status).toBe('incorrect');
  });

  it('Build a Sentence acepta el orden correcto y alternativas declaradas', () => {
    const s = set('wr-bs-committee');
    if (s.task !== 'build-sentence') throw new Error('tipo');
    const i = item('wr-bs-committee');
    expect(scoreItem(i, s, { kind: 'order', order: s.chunks }).status).toBe('correct');
    expect(scoreItem(i, s, { kind: 'order', order: s.acceptedOrders![0]! }).status).toBe('correct');
    expect(scoreItem(i, s, { kind: 'order', order: [...s.chunks].reverse() }).status).toBe('incorrect');
    expect(scoreItem(i, s, { kind: 'order', order: s.chunks.slice(0, 3) }).status).toBe('incorrect');
  });

  it('los ítems de rúbrica quedan pendientes hasta valorarse', () => {
    const e = item('wr-em-gym-equipment');
    const s = set('wr-em-gym-equipment');
    expect(scoreItem(e, s, { kind: 'essay', text: 'Hello', updatedAt: 0 }).status).toBe('pending');
    expect(scoreItem(e, s, undefined, { source: 'self', overall: 3, at: 0 })).toEqual({ status: 'rated', earned: 3, max: 5 });
  });
});

describe('escalas', () => {
  it('interpola y redondea a pasos de 0,5', () => {
    const curve = DEFAULT_SCORING.curves.linear;
    expect(interpolate(curve, 0)).toBe(1);
    expect(interpolate(curve, 1)).toBe(6);
    expect(roundToStep(interpolate(curve, 0.75), DEFAULT_SCORING)).toBe(4);
    expect(roundToStep(3.26, DEFAULT_SCORING)).toBe(3.5);
    expect(roundToStep(3.24, DEFAULT_SCORING)).toBe(3);
    expect(roundToStep(9, DEFAULT_SCORING)).toBe(6);
  });

  it('MCER y equivalencia 0–120 solo dentro de los puntos publicados', () => {
    expect(cefrFor(5, DEFAULT_SCORING)).toBe('C1');
    expect(cefrFor(4.5, DEFAULT_SCORING)).toBe('B2');
    expect(cefrFor(6, DEFAULT_SCORING)).toBe('C2');
    expect(legacyEquivalent(4, DEFAULT_SCORING).value).toBe(80);
    expect(legacyEquivalent(5, DEFAULT_SCORING).value).toBe(100);
    expect(legacyEquivalent(6, DEFAULT_SCORING).value).toBeNull();
    expect(legacyEquivalent(2, DEFAULT_SCORING).value).toBeNull();
  });

  it('rúbrica y precisión', () => {
    expect(rubricToBand(5)).toBe(6);
    expect(rubricToBand(0)).toBe(1);
    expect(accuracyToRubric(1)).toBe(5);
    expect(accuracyToRubric(0.86)).toBe(4);
    expect(accuracyToRubric(0)).toBe(0);
  });
});
