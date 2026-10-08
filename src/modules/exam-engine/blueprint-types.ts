import type { Difficulty, SectionId, TaskType } from '../question-bank/types';

/**
 * Estructura configurable del examen. Cambiar el formato (número de tareas,
 * tiempos, módulos adaptativos, escalas) solo requiere editar un blueprint.
 */

export interface PartSpec {
  task: TaskType;
  /** Número de sets de esta tarea. */
  sets: number;
  /** Dificultades preferidas, en orden. Si no hay contenido suficiente, se relaja. */
  difficulty?: Difficulty[];
}

export interface ModuleSpec {
  id: string;
  title: string;
  /** Límite de tiempo en segundos; null = sin temporizador global (p. ej. Speaking, cronometrado por ítem). */
  timeLimitSec: number | null;
  parts?: PartSpec[];
  /** Módulo adaptativo: su contenido depende del rendimiento en otro módulo. */
  adaptive?: {
    basedOn: string;
    /** Proporción de aciertos (0–1) a partir de la cual se asigna la ruta superior. */
    threshold: number;
    upper: PartSpec[];
    lower: PartSpec[];
  };
}

export interface SectionSpec {
  id: SectionId;
  title: string;
  description: string;
  /** Instrucciones mostradas antes de empezar. */
  instructions: string[];
  modules: ModuleSpec[];
  /** Reglas de navegación en modo examen. */
  navigation: 'free' | 'forward-only';
  /** Reproducciones permitidas por audio en modo examen. */
  maxPlays?: number;
}

/** Puntos de interpolación (proporción 0–1 → banda 1–6). */
export type BandCurve = [number, number][];

export interface ScoringSpec {
  /** Escala de bandas (formato 2026: 1–6 en pasos de 0.5). */
  bandMin: number;
  bandMax: number;
  bandStep: number;
  /** Curvas de estimación para secciones objetivas. */
  curves: {
    linear: BandCurve;
    upper: BandCurve;
    lower: BandCurve;
  };
  /** Pesos para combinar componentes de Writing y Speaking (deben sumar 1). */
  writingWeights: { 'build-sentence': number; email: number; 'academic-discussion': number };
  speakingWeights: { 'listen-repeat': number; interview: number };
  /** Correspondencia aproximada banda → CEFR. */
  cefr: { minBand: number; level: string }[];
  /**
   * Equivalencias publicadas por ETS entre la escala 1–6 y la escala 0–120
   * (solo los puntos documentados). El resto se interpola y se marca como aproximado.
   */
  legacyAnchors: [number, number][];
}

export interface ExamBlueprint {
  id: string;
  name: string;
  version: string;
  effectiveFrom: string;
  description: string;
  /** Fuentes y notas sobre el formato. */
  sourceNotes: string[];
  sections: SectionSpec[];
  scoring: ScoringSpec;
}
