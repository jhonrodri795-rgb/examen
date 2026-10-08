/**
 * Contrato compartido entre el navegador y el servidor para transcripción y
 * evaluación. Solo tipos: no contiene secretos ni lógica de proveedores.
 */

export type SpeakingTaskType = 'listen-repeat' | 'interview' | 'independent-speaking';

export interface TranscriptWord {
  word: string;
  /** Segundos desde el inicio. */
  start: number;
  end: number;
  /** 0–1 si el proveedor lo proporciona. */
  confidence?: number;
  /** Marcada por el proveedor como palabra de relleno (um, uh…). */
  filler?: boolean;
}

export interface TranscriptSegment {
  text: string;
  start: number;
  end: number;
  /** Confianza aproximada del segmento (0–1) si existe. */
  confidence?: number;
}

export interface Transcript {
  provider: string;
  model: string;
  text: string;
  language?: string;
  durationSec?: number;
  words: TranscriptWord[];
  segments: TranscriptSegment[];
  /** Qué datos aportó realmente el proveedor. */
  capabilities: {
    wordTimestamps: boolean;
    wordConfidence: boolean;
    segmentConfidence: boolean;
    fillerDetection: 'provider' | 'prompted' | 'none';
  };
  createdAt: number;
}

export interface PronunciationAssessment {
  provider: string;
  referenceText: string;
  recognizedText: string;
  accuracy: number | null;
  fluency: number | null;
  completeness: number | null;
  prosody: number | null;
  pronunciation: number | null;
  words: { word: string; accuracy: number | null; errorType: string }[];
  createdAt: number;
}

/** Métricas acústicas calculadas localmente a partir de la señal (VAD por energía). */
export interface AcousticMetrics {
  method: 'energy-vad-v1';
  totalDurationSec: number;
  speechDurationSec: number;
  leadingSilenceSec: number;
  trailingSilenceSec: number;
  phonationRatio: number;
  pauseCount: number;
  longPauseCount: number;
  meanPauseSec: number;
  longestPauseSec: number;
  pausesPerMinute: number;
  meanRunSec: number;
  runCount: number;
  peakDbfs: number;
  rmsDbfs: number;
  noiseFloorDbfs: number;
  clippingRatio: number;
  /** Segmentos de habla detectados [inicio, fin] en segundos. */
  runs: [number, number][];
  quality: { tooQuiet: boolean; clipping: boolean; noisy: boolean; mostlySilent: boolean };
}

/** Métricas derivadas de la transcripción (y su alineación temporal si existe). */
export interface TranscriptMetrics {
  wordCount: number;
  wordsPerMinute: number | null;
  articulationRate: number | null;
  fillerCount: number;
  fillers: { word: string; count: number }[];
  uniqueWordRatio: number;
  meanSentenceLength: number;
  lowConfidenceWords: { word: string; start: number; confidence: number }[];
  repetitions: { phrase: string; count: number }[];
}

export type Criterion = 'delivery' | 'languageUse' | 'topicDevelopment' | 'taskFulfillment';

export interface CriterionAssessment {
  criterion: Criterion;
  /** 0–4 (o null si no hay datos suficientes). */
  score: number | null;
  evaluable: boolean;
  rationale: string;
  evidence: { quote: string; source: 'transcript' | 'audio-metrics' }[];
}

export interface SpeakingEvaluation {
  provider: string;
  model: string;
  mode: 'ai' | 'heuristic';
  overall: number | null;
  /** Equivalente en escala 0–5 para combinar con otras rúbricas. */
  overall5: number | null;
  criteria: CriterionAssessment[];
  strengths: string[];
  issues: { quote: string; problem: string; suggestion: string; kind: 'grammar' | 'vocabulary' | 'coherence' | 'fluency' | 'task' | 'recognition' }[];
  improvedResponse: string | null;
  exercises: string[];
  pronunciationAdvice: string[];
  limitations: string[];
  /** Citas que el modelo devolvió pero no aparecen en la transcripción (se descartan). */
  droppedEvidence: number;
  createdAt: number;
}

export interface WritingEvaluation {
  provider: string;
  model: string;
  mode: 'ai';
  overall5: number;
  criteria: { name: 'coherence' | 'cohesion' | 'grammar' | 'vocabulary' | 'development' | 'taskFulfillment'; score: number; rationale: string; evidence: string[] }[];
  issues: { quote: string; problem: string; suggestion: string }[];
  strengths: string[];
  improvedVersion: string;
  limitations: string[];
  droppedEvidence: number;
  createdAt: number;
}

export interface ProviderInfo {
  configured: boolean;
  provider: string | null;
  model: string | null;
  /** Descripción de qué datos se envían y a quién. */
  dataPolicy: string;
}

export interface ServerCapabilities {
  version: string;
  stt: ProviderInfo;
  pronunciation: ProviderInfo;
  evaluator: ProviderInfo;
  limits: {
    maxAudioBytes: number;
    maxAudioSec: number;
    minAudioSec: number;
    maxTextChars: number;
    acceptedAudioTypes: string[];
  };
  storage: string;
}

export interface ApiError {
  error: { code: string; message: string; retryAfterSec?: number };
}
