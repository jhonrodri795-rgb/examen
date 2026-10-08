import type { SectionId, Skill, TaskType } from '../question-bank/types';
import type { ExamBlueprint } from './blueprint-types';

export type ExamMode = 'practice' | 'exam';
export type TimingMode = 'standard' | 'extended' | 'untimed';

export interface ExamConfig {
  kind: 'full' | 'section' | 'custom';
  mode: ExamMode;
  blueprintId: string;
  sections: SectionId[];
  timing: TimingMode;
  /** Práctica: permitir comprobar cada respuesta y ver la explicación. */
  instantFeedback: boolean;
  /** Práctica: reproducciones ilimitadas y navegación libre en Listening. */
  relaxedListening: boolean;
  /** Práctica: segundos de preparación añadidos antes de cada respuesta oral. */
  speakingPrepSec: number;
  /** Práctica personalizada: sets elegidos en el banco. */
  customSetIds?: string[];
  seed: number;
}

export type Response =
  | { kind: 'choice'; selected: number[] }
  | { kind: 'gap'; value: string }
  | { kind: 'order'; order: string[] }
  | { kind: 'essay'; text: string; updatedAt: number }
  | {
      kind: 'speech';
      recordingId: string | null;
      durationMs?: number;
      status: 'recorded' | 'skipped' | 'no-mic' | 'error';
    };

export type PageView = 'question' | 'cloze' | 'listen' | 'build' | 'essay' | 'speak';

export interface Page {
  id: string;
  setId: string;
  view: PageView;
  itemIds: string[];
  /** Para Listening: el audio se reproduce en la propia página (Choose a Response). */
  inlineAudio?: boolean;
}

export interface TimerState {
  limitMs: number | null;
  elapsedMs: number;
  startedAt: number | null;
}

export interface ModuleRun {
  key: string;
  specId: string;
  title: string;
  variant: 'upper' | 'lower' | null;
  status: 'pending' | 'active' | 'done';
  setIds: string[];
  pages: Page[];
  itemIds: string[];
  timer: TimerState;
  warnings: string[];
  endReason?: 'submitted' | 'timeout' | 'skipped';
}

export interface SectionRun {
  id: SectionId;
  status: 'pending' | 'active' | 'done' | 'skipped';
  modules: ModuleRun[];
  route?: 'upper' | 'lower';
  routingScore?: number;
  skipReason?: string;
}

export type Stage = 'section-intro' | 'module-intro' | 'module' | 'section-end' | 'finished';

export interface Cursor {
  section: number;
  module: number;
  page: number;
  stage: Stage;
}

/** Valoración de una respuesta construida (Writing/Speaking) en escala 0–5. */
export interface RubricRating {
  source: 'self' | 'ai' | 'auto';
  overall: number;
  criteria?: Record<string, number | null>;
  at: number;
  reportId?: string;
  note?: string;
}

export interface ItemStats {
  correct: number;
  incorrect: number;
  unanswered: number;
  partial: number;
  total: number;
  earned: number;
  max: number;
}

export interface ComponentScore {
  task: TaskType;
  label: string;
  band: number | null;
  /** Fuente de la puntuación. */
  basis: 'objective' | 'self' | 'ai' | 'auto' | 'mixed' | 'pending';
  detail: string;
  weight: number;
}

export interface SectionResult {
  id: SectionId;
  status: 'scored' | 'pending' | 'skipped';
  objective: ItemStats;
  byTask: Partial<Record<TaskType, ItemStats>>;
  bySkill: Partial<Record<Skill, ItemStats>>;
  timeUsedMs: number;
  timeLimitMs: number | null;
  timeouts: number;
  route?: 'upper' | 'lower';
  band: number | null;
  bandBasis: string;
  components: ComponentScore[];
}

export interface Recommendation {
  title: string;
  detail: string;
  section: SectionId;
  task?: TaskType;
}

export interface AttemptResults {
  computedAt: number;
  sections: SectionResult[];
  overallBand: number | null;
  overallComplete: boolean;
  cefr: string | null;
  legacy: { value: number | null; note: string };
  strengths: { skill: Skill; pct: number; total: number }[];
  weaknesses: { skill: Skill; pct: number; total: number }[];
  recommendations: Recommendation[];
}

export interface Attempt {
  id: string;
  schemaVersion: 1;
  /** Revisión monotónica: evita que una escritura antigua sobrescriba una más reciente. */
  rev: number;
  createdAt: number;
  updatedAt: number;
  finishedAt?: number;
  status: 'in-progress' | 'completed' | 'abandoned';
  config: ExamConfig;
  /** Copia del blueprint usado (los intentos antiguos no dependen de cambios futuros). */
  blueprint: ExamBlueprint;
  sections: SectionRun[];
  cursor: Cursor;
  responses: Record<string, Response>;
  flags: Record<string, boolean>;
  checked: Record<string, boolean>;
  notes: Record<string, string>;
  plays: Record<string, number>;
  ratings: Record<string, RubricRating>;
  /** Exposición previa de cada set (para ensamblar módulos adaptativos con contenido poco visto). */
  exposure: Record<string, number>;
  /** La sesión se interrumpió (recarga/cierre) y requiere reanudar. */
  interrupted: boolean;
  results?: AttemptResults;
}
