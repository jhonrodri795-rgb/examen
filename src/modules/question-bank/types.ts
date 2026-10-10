/**
 * Modelo de datos del banco de preguntas.
 *
 * El contenido se organiza en "sets": un estímulo (texto, audio, tarea) con uno
 * o varios ítems puntuables. Añadir contenido nuevo = añadir un archivo en
 * `data/**` que exporte `sets`; el registro lo descubre automáticamente.
 */

export type SectionId = 'reading' | 'listening' | 'writing' | 'speaking';
export const SECTION_IDS: readonly SectionId[] = ['reading', 'listening', 'writing', 'speaking'];

export type Difficulty = 'easy' | 'medium' | 'hard';
export const DIFFICULTIES: readonly Difficulty[] = ['easy', 'medium', 'hard'];

export type Topic =
  | 'biology'
  | 'history'
  | 'geology'
  | 'engineering'
  | 'environment'
  | 'psychology'
  | 'economics'
  | 'sociology'
  | 'art'
  | 'technology'
  | 'astronomy'
  | 'linguistics'
  | 'campus-life'
  | 'daily-life';

/** Tareas del formato TOEFL iBT vigente (enero 2026) + práctica adicional. */
export type TaskType =
  // Reading
  | 'complete-words'
  | 'daily-life'
  | 'academic-passage'
  // Listening
  | 'choose-response'
  | 'conversation'
  | 'announcement'
  | 'academic-talk'
  // Writing
  | 'build-sentence'
  | 'email'
  | 'academic-discussion'
  // Speaking
  | 'listen-repeat'
  | 'interview'
  /** Práctica adicional con tiempo de preparación (formato anterior a 2026). No forma parte de la simulación 2026. */
  | 'independent-speaking';

/** Habilidad evaluada por cada ítem (para estadísticas por tipo de pregunta). */
export type Skill =
  | 'main-idea'
  | 'detail'
  | 'vocabulary'
  | 'inference'
  | 'purpose'
  | 'paragraph-relation'
  | 'organization'
  | 'negative-factual'
  | 'reference'
  | 'multi-select'
  | 'word-completion'
  | 'pragmatics'
  | 'function'
  | 'attitude'
  | 'sentence-construction'
  | 'email-writing'
  | 'discussion-writing'
  | 'repeat'
  | 'interview-response'
  | 'opinion-speaking';

export interface ChoiceQuestion {
  id: string;
  /** single = una respuesta; multiple = seleccionar varias (todas deben acertarse salvo `partialCredit`). */
  kind: 'single' | 'multiple';
  skill: Skill;
  prompt: string;
  options: string[];
  /** Índices (base 0) de las opciones correctas. */
  answer: number[];
  /** Explicación detallada en español. */
  explanation: string;
  points?: number;
  partialCredit?: boolean;
  /** Párrafo de referencia (base 0) para resaltar en lecturas. */
  paragraph?: number;
  /** Palabra o frase a resaltar en el texto (vocabulario, referencia). */
  highlight?: string;
  difficulty?: Difficulty;
}

interface SetBase {
  id: string;
  section: SectionId;
  task: TaskType;
  title: string;
  topic: Topic;
  difficulty: Difficulty;
  /** Pack de origen (built-in o importado por el usuario). */
  source?: string;
  /** Formulario de simulación completa al que pertenece (1–20). Sin él, contenido general de práctica. */
  form?: number;
}

// ---------- Reading ----------

/**
 * Complete the Words. El texto marca cada hueco como `{{prefijo|resto}}`.
 * Ej.: "Glaciers are large {{mas|ses}} of ice" → se muestra "mas___" y se espera "ses".
 */
export interface CompleteWordsSet extends SetBase {
  section: 'reading';
  task: 'complete-words';
  text: string;
  note?: string;
}

export interface DailyLifeSet extends SetBase {
  section: 'reading';
  task: 'daily-life';
  genre: 'email' | 'notice' | 'text-message' | 'schedule' | 'advertisement' | 'memo' | 'webpage' | 'menu';
  /** Cabecera opcional (De/Para/Asunto, título del aviso…). */
  header?: string[];
  text: string;
  questions: ChoiceQuestion[];
}

export interface AcademicPassageSet extends SetBase {
  section: 'reading';
  task: 'academic-passage';
  paragraphs: string[];
  questions: ChoiceQuestion[];
}

// ---------- Listening ----------

export type Voice = 'female' | 'male' | 'narrator';

export interface ScriptLine {
  speaker: string;
  voice: Voice;
  text: string;
}

export interface ListeningSet extends SetBase {
  section: 'listening';
  task: 'choose-response' | 'conversation' | 'announcement' | 'academic-talk';
  /** Instrucción previa (p. ej. "Listen to a conversation between…"). */
  context: string;
  script: ScriptLine[];
  /** Grabación opcional (ruta en /public). Si no existe, se usa síntesis de voz del navegador. */
  audioSrc?: string;
  questions: ChoiceQuestion[];
}

// ---------- Writing ----------

export interface BuildSentenceSet extends SetBase {
  section: 'writing';
  task: 'build-sentence';
  /** Lo que dice el interlocutor (contexto). */
  context: { speaker: string; text: string };
  /** Fragmentos en el orden correcto. */
  chunks: string[];
  /** Fragmentos sobrantes que no deben usarse (opcional). */
  distractors?: string[];
  /** Ordenaciones alternativas aceptadas (por texto de fragmento). */
  acceptedOrders?: string[][];
  /** Puntuación final que se añade tras la frase ("." o "?"). */
  endPunctuation: '.' | '?' | '!';
  explanation: string;
}

export interface EmailTaskSet extends SetBase {
  section: 'writing';
  task: 'email';
  scenario: string;
  recipient: string;
  subject: string;
  /** Puntos que el correo debe cubrir. */
  bulletPoints: string[];
  recommendedWords: [number, number];
  timeLimitSec: number;
  sampleResponse: string;
}

export interface DiscussionTaskSet extends SetBase {
  section: 'writing';
  task: 'academic-discussion';
  course: string;
  professor: string;
  professorPrompt: string;
  posts: { author: string; text: string }[];
  recommendedWords: [number, number];
  timeLimitSec: number;
  sampleResponse: string;
}

// ---------- Speaking ----------

export interface ListenRepeatSet extends SetBase {
  section: 'speaking';
  task: 'listen-repeat';
  scenario: { title: string; description: string; icon: string };
  speakerVoice: Voice;
  sentences: { id: string; text: string; responseSec: number }[];
}

export interface InterviewSet extends SetBase {
  section: 'speaking';
  task: 'interview';
  intro: string;
  interviewerVoice: Voice;
  questions: { id: string; text: string; responseSec: number; prepSec: number }[];
}

export interface IndependentSpeakingSet extends SetBase {
  section: 'speaking';
  task: 'independent-speaking';
  prompt: string;
  prepSec: number;
  responseSec: number;
  tips: string[];
}

export type ReadingSet = CompleteWordsSet | DailyLifeSet | AcademicPassageSet;
export type WritingSet = BuildSentenceSet | EmailTaskSet | DiscussionTaskSet;
export type SpeakingSet = ListenRepeatSet | InterviewSet | IndependentSpeakingSet;
export type ContentSet = ReadingSet | ListeningSet | WritingSet | SpeakingSet;

/** Tipo de respuesta que admite un ítem. */
export type ItemKind = 'choice' | 'gap' | 'order' | 'essay' | 'speech';

/** Unidad puntuable derivada de un set. */
export interface BankItem {
  id: string;
  setId: string;
  section: SectionId;
  task: TaskType;
  skill: Skill;
  kind: ItemKind;
  difficulty: Difficulty;
  topic: Topic;
  points: number;
  /** Ítem evaluado automáticamente (objetivo) o mediante rúbrica. */
  objective: boolean;
}

export const TASK_SECTION: Record<TaskType, SectionId> = {
  'complete-words': 'reading',
  'daily-life': 'reading',
  'academic-passage': 'reading',
  'choose-response': 'listening',
  conversation: 'listening',
  announcement: 'listening',
  'academic-talk': 'listening',
  'build-sentence': 'writing',
  email: 'writing',
  'academic-discussion': 'writing',
  'listen-repeat': 'speaking',
  interview: 'speaking',
  'independent-speaking': 'speaking',
};
