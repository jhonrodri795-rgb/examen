import type { Difficulty, TaskType } from './types';

/** Número de simulaciones completas con contenido propio (formularios). */
export const FORM_COUNT = 20;

/**
 * Contenido exacto de cada formulario: cubre el módulo 1 y las dos rutas
 * adaptativas del módulo 2 (superior e inferior) del blueprint completo.
 */
export const FORM_REQUIREMENTS: Partial<Record<TaskType, Partial<Record<Difficulty, number>> & { any?: number }>> = {
  'complete-words': { easy: 1, medium: 1, hard: 1 },
  'daily-life': { easy: 2, medium: 2, hard: 1 },
  'academic-passage': { easy: 1, medium: 1, hard: 2 },
  'choose-response': { easy: 6, medium: 6, hard: 6 },
  conversation: { easy: 1, medium: 1, hard: 1 },
  announcement: { easy: 1, medium: 1, hard: 1 },
  'academic-talk': { easy: 1, medium: 1, hard: 1 },
  'build-sentence': { easy: 3, medium: 4, hard: 3 },
  email: { any: 1 },
  'academic-discussion': { any: 1 },
  'listen-repeat': { any: 1 },
  interview: { any: 1 },
};

export const formPrefix = (form: number) => `f${String(form).padStart(2, '0')}-`;
