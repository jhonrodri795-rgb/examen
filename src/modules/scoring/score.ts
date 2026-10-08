import { clozeGaps, findChoiceQuestion } from '../question-bank/items';
import type { BankItem, ContentSet } from '../question-bank/types';
import type { BandCurve, ScoringSpec } from '../exam-engine/blueprint-types';
import type { Response, RubricRating } from '../exam-engine/types';

export type ItemStatus = 'correct' | 'incorrect' | 'partial' | 'unanswered' | 'pending' | 'rated';

export interface ItemScore {
  status: ItemStatus;
  earned: number;
  max: number;
}

const norm = (s: string) => s.trim().toLowerCase().replace(/\s+/g, ' ');

/** ¿La respuesta tiene contenido? (para contar respondidas/pendientes). */
export function isAnswered(response: Response | undefined): boolean {
  if (!response) return false;
  switch (response.kind) {
    case 'choice':
      return response.selected.length > 0;
    case 'gap':
      return response.value.trim().length > 0;
    case 'order':
      return response.order.length > 0;
    case 'essay':
      return response.text.trim().length > 0;
    case 'speech':
      return response.status === 'recorded';
  }
}

/** Puntúa un ítem objetivo; los ítems de rúbrica usan la valoración (0–5) si existe. */
export function scoreItem(item: BankItem, set: ContentSet, response: Response | undefined, rating?: RubricRating): ItemScore {
  const max = item.points;
  if (!item.objective) {
    if (rating) return { status: 'rated', earned: Math.max(0, Math.min(5, rating.overall)), max: 5 };
    return { status: 'pending', earned: 0, max: 5 };
  }
  if (!isAnswered(response)) return { status: 'unanswered', earned: 0, max };

  switch (item.kind) {
    case 'choice': {
      const q = findChoiceQuestion(set, item.id);
      if (!q || response?.kind !== 'choice') return { status: 'incorrect', earned: 0, max };
      const selected = new Set(response.selected);
      const answer = new Set(q.answer);
      const exact = selected.size === answer.size && [...answer].every((a) => selected.has(a));
      if (exact) return { status: 'correct', earned: max, max };
      if (q.kind === 'multiple' && q.partialCredit) {
        const hits = [...selected].filter((s) => answer.has(s)).length;
        const wrong = selected.size - hits;
        const ratio = Math.max(0, (hits - wrong) / answer.size);
        if (ratio > 0) return { status: 'partial', earned: +(max * ratio).toFixed(2), max };
      }
      return { status: 'incorrect', earned: 0, max };
    }
    case 'gap': {
      if (set.task !== 'complete-words' || response?.kind !== 'gap') return { status: 'incorrect', earned: 0, max };
      const index = Number(item.id.split('-g').pop()) - 1;
      const gap = clozeGaps(set.text)[index];
      if (!gap) return { status: 'incorrect', earned: 0, max };
      const v = norm(response.value);
      const ok = v === norm(gap.missing) || v === norm(gap.word);
      return ok ? { status: 'correct', earned: max, max } : { status: 'incorrect', earned: 0, max };
    }
    case 'order': {
      if (set.task !== 'build-sentence' || response?.kind !== 'order') return { status: 'incorrect', earned: 0, max };
      const candidate = response.order.map(norm).join('|');
      const valid = [set.chunks, ...(set.acceptedOrders ?? [])].some((o) => o.map(norm).join('|') === candidate);
      return valid ? { status: 'correct', earned: max, max } : { status: 'incorrect', earned: 0, max };
    }
    default:
      return { status: 'pending', earned: 0, max };
  }
}

/** Interpolación lineal sobre una curva (proporción → banda). */
export function interpolate(curve: BandCurve, x: number): number {
  const p = Math.max(0, Math.min(1, x));
  for (let i = 1; i < curve.length; i++) {
    const [x0, y0] = curve[i - 1]!;
    const [x1, y1] = curve[i]!;
    if (p <= x1) return x1 === x0 ? y1 : y0 + ((p - x0) / (x1 - x0)) * (y1 - y0);
  }
  return curve[curve.length - 1]![1];
}

export function roundToStep(value: number, spec: Pick<ScoringSpec, 'bandMin' | 'bandMax' | 'bandStep'>): number {
  const r = Math.round(value / spec.bandStep) * spec.bandStep;
  return Math.max(spec.bandMin, Math.min(spec.bandMax, +r.toFixed(2)));
}

export function cefrFor(band: number | null, spec: ScoringSpec): string | null {
  if (band == null) return null;
  return spec.cefr.find((c) => band >= c.minBand)?.level ?? null;
}

/**
 * Puntuación comparable 0–120 a partir de los puntos de equivalencia
 * publicados. Fuera de ese rango no se extrapola.
 */
export function legacyEquivalent(band: number | null, spec: ScoringSpec): { value: number | null; note: string } {
  if (band == null) return { value: null, note: 'Sin banda global.' };
  const anchors = spec.legacyAnchors;
  if (!anchors.length) return { value: null, note: 'Sin equivalencias configuradas.' };
  const [minB, minV] = anchors[0]!;
  const [maxB, maxV] = anchors[anchors.length - 1]!;
  if (band < minB) return { value: null, note: `Por debajo de ${minB} (≈${minV}); no se extrapola fuera de las equivalencias publicadas.` };
  if (band > maxB) return { value: null, note: `Por encima de ${maxB} (≈${maxV}); no se extrapola fuera de las equivalencias publicadas.` };
  for (let i = 0; i < anchors.length; i++) {
    const [b, v] = anchors[i]!;
    if (b === band) return { value: v, note: 'Equivalencia publicada por ETS para requisitos de admisión.' };
    const next = anchors[i + 1];
    if (next && band > b && band < next[0]) {
      const value = Math.round(v + ((band - b) / (next[0] - b)) * (next[1] - v));
      return { value, note: 'Valor interpolado entre equivalencias publicadas (aproximado).' };
    }
  }
  return { value: null, note: 'Sin equivalencia.' };
}

/** Rúbrica 0–5 → banda 1–6 (aproximación: 0→1, 5→6). */
export function rubricToBand(score: number): number {
  return 1 + Math.max(0, Math.min(5, score));
}

/** Precisión de Listen and Repeat (0–1) → escala 0–5. */
export function accuracyToRubric(accuracy: number): number {
  if (accuracy >= 0.95) return 5;
  if (accuracy >= 0.85) return 4;
  if (accuracy >= 0.7) return 3;
  if (accuracy >= 0.5) return 2;
  if (accuracy > 0) return 1;
  return 0;
}
