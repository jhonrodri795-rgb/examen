import { FORM_COUNT } from '../question-bank/forms';
import type { QuestionBank } from '../question-bank/registry';
import type { Attempt } from './types';

export interface FormStatus {
  form: number;
  /** El banco tiene contenido para este formulario. */
  available: boolean;
  /** Simulaciones completas terminadas con este formulario. */
  completed: number;
  lastCompletedAt: number | null;
  /** Intento en curso con este formulario (para continuar en vez de repetir). */
  inProgressId: string | null;
  bestBand: number | null;
}

/** Estado de cada formulario a partir del historial de intentos. */
export function formStatuses(attempts: Attempt[], bank: QuestionBank): FormStatus[] {
  const withContent = new Set(bank.sets.map((s) => s.form).filter((f): f is number => typeof f === 'number'));
  return Array.from({ length: FORM_COUNT }, (_, i) => i + 1).map((form) => {
    const mine = attempts.filter((a) => a.config.kind === 'full' && a.config.form === form);
    const done = mine.filter((a) => a.status === 'completed');
    const bands = done.map((a) => a.results?.overallBand).filter((b): b is number => typeof b === 'number');
    return {
      form,
      available: withContent.has(form),
      completed: done.length,
      lastCompletedAt: done.length ? Math.max(...done.map((a) => a.updatedAt)) : null,
      inProgressId: mine.find((a) => a.status === 'in-progress')?.id ?? null,
      bestBand: bands.length ? Math.max(...bands) : null,
    };
  });
}

/**
 * Siguiente formulario para «Simulación completa»: el primero que no se ha
 * hecho; si ya se hicieron todos, el que se completó hace más tiempo.
 */
export function nextForm(statuses: FormStatus[]): number | null {
  const avail = statuses.filter((s) => s.available);
  if (!avail.length) return null;
  const fresh = avail.find((s) => s.completed === 0 && !s.inProgressId);
  if (fresh) return fresh.form;
  const notStarted = avail.find((s) => s.completed === 0);
  if (notStarted) return notStarted.form;
  return [...avail].sort((a, b) => (a.lastCompletedAt ?? 0) - (b.lastCompletedAt ?? 0))[0]!.form;
}

/** Nombre visible de un intento de simulación completa. */
export function attemptTitle(a: Pick<Attempt, 'config' | 'blueprint'>): string {
  return a.config.kind === 'full' && a.config.form ? `${a.blueprint.name} · Simulación n.º ${a.config.form}` : a.blueprint.name;
}
