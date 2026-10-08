import type { ExamBlueprint } from '../blueprint-types';
import { toeflIbt2026, toeflQuick2026 } from './toefl-ibt-2026';

/** Registro de estructuras de examen disponibles. Añade aquí nuevos formatos. */
export const BLUEPRINTS: ExamBlueprint[] = [toeflIbt2026, toeflQuick2026];
export const DEFAULT_BLUEPRINT_ID = toeflIbt2026.id;

export function getBlueprint(id: string): ExamBlueprint {
  return BLUEPRINTS.find((b) => b.id === id) ?? toeflIbt2026;
}
