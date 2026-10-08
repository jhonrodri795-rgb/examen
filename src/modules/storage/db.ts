import { openDB, type DBSchema, type IDBPDatabase } from 'idb';
import type { Attempt } from '../exam-engine/types';
import type { ContentSet, SectionId, TaskType } from '../question-bank/types';
import type {
  AcousticMetrics, PronunciationAssessment, SpeakingEvaluation, Transcript, TranscriptMetrics, WritingEvaluation,
} from '@shared/speaking-types';
import type { WritingAnalysis } from '../writing/analysis';

/**
 * Persistencia local en IndexedDB. Los audios se guardan como ArrayBuffer
 * (no en localStorage) para no bloquear el hilo principal ni agotar cuotas.
 *
 * Para migrar a un backend (p. ej. PostgreSQL), basta con implementar los
 * repositorios de `repositories.ts` contra una API: la interfaz no cambia.
 */

export interface RecordingRecord {
  id: string;
  attemptId: string | null;
  itemId: string;
  setId: string;
  task: TaskType;
  section: SectionId;
  prompt: string;
  referenceText?: string;
  mimeType: string;
  data: ArrayBuffer;
  sizeBytes: number;
  durationMs: number;
  createdAt: number;
  context: 'exam' | 'studio';
  acoustic?: AcousticMetrics;
}

export type RecordingMeta = Omit<RecordingRecord, 'data'>;

export interface SpeakingReportRecord {
  id: string;
  recordingId: string;
  itemId: string;
  setId: string;
  task: TaskType;
  attemptId: string | null;
  createdAt: number;
  updatedAt: number;
  /** Transcripción original del proveedor (no se modifica). */
  transcript: Transcript | null;
  /** Versión corregida por el usuario para estudiar (no se usa como única base de evaluación). */
  editedTranscript: string | null;
  transcriptError?: string;
  pronunciation: PronunciationAssessment | null;
  acoustic: AcousticMetrics | null;
  transcriptMetrics: TranscriptMetrics | null;
  repeatAccuracy?: { accuracy: number; matched: number; total: number; ops: { type: 'ok' | 'sub' | 'del' | 'ins'; ref?: string; hyp?: string }[] } | null;
  evaluation: SpeakingEvaluation | null;
  evaluationError?: string;
  selfAssessment: { scores: Record<string, number>; overall5: number; note: string; at: number } | null;
}

export interface WritingDraftRecord {
  id: string;
  setId: string;
  attemptId: string | null;
  text: string;
  wordCount: number;
  kind: 'autosave' | 'snapshot' | 'submitted';
  createdAt: number;
  updatedAt: number;
}

export interface WritingReportRecord {
  id: string;
  draftId: string | null;
  setId: string;
  attemptId: string | null;
  itemId: string;
  text: string;
  createdAt: number;
  analysis: WritingAnalysis;
  evaluation: WritingEvaluation | null;
  evaluationError?: string;
  selfAssessment: { scores: Record<string, number>; overall5: number; note: string; at: number } | null;
}

export interface NoteRecord {
  id: string;
  title: string;
  text: string;
  createdAt: number;
  updatedAt: number;
}

export interface CustomSetRecord {
  id: string;
  pack: string;
  set: ContentSet;
  importedAt: number;
}

export interface KvRecord {
  key: string;
  value: unknown;
}

export interface ToeflDB extends DBSchema {
  attempts: { key: string; value: Attempt; indexes: { 'by-created': number; 'by-status': string } };
  recordings: { key: string; value: RecordingRecord; indexes: { 'by-item': string; 'by-attempt': string; 'by-created': number } };
  speakingReports: { key: string; value: SpeakingReportRecord; indexes: { 'by-recording': string; 'by-created': number } };
  writingDrafts: { key: string; value: WritingDraftRecord; indexes: { 'by-set': string; 'by-updated': number } };
  writingReports: { key: string; value: WritingReportRecord; indexes: { 'by-set': string; 'by-created': number } };
  notes: { key: string; value: NoteRecord; indexes: { 'by-updated': number } };
  customSets: { key: string; value: CustomSetRecord };
  kv: { key: string; value: KvRecord };
}

export const DB_NAME = 'toefl-prep';
export const DB_VERSION = 1;

let dbPromise: Promise<IDBPDatabase<ToeflDB>> | null = null;

export function getDb(): Promise<IDBPDatabase<ToeflDB>> {
  if (!dbPromise) {
    if (typeof indexedDB === 'undefined') {
      return Promise.reject(new Error('IndexedDB no está disponible en este navegador (¿modo privado?).'));
    }
    dbPromise = openDB<ToeflDB>(DB_NAME, DB_VERSION, {
      upgrade(db) {
        const attempts = db.createObjectStore('attempts', { keyPath: 'id' });
        attempts.createIndex('by-created', 'createdAt');
        attempts.createIndex('by-status', 'status');
        const rec = db.createObjectStore('recordings', { keyPath: 'id' });
        rec.createIndex('by-item', 'itemId');
        rec.createIndex('by-attempt', 'attemptId');
        rec.createIndex('by-created', 'createdAt');
        const sr = db.createObjectStore('speakingReports', { keyPath: 'id' });
        sr.createIndex('by-recording', 'recordingId');
        sr.createIndex('by-created', 'createdAt');
        const wd = db.createObjectStore('writingDrafts', { keyPath: 'id' });
        wd.createIndex('by-set', 'setId');
        wd.createIndex('by-updated', 'updatedAt');
        const wr = db.createObjectStore('writingReports', { keyPath: 'id' });
        wr.createIndex('by-set', 'setId');
        wr.createIndex('by-created', 'createdAt');
        const notes = db.createObjectStore('notes', { keyPath: 'id' });
        notes.createIndex('by-updated', 'updatedAt');
        db.createObjectStore('customSets', { keyPath: 'id' });
        db.createObjectStore('kv', { keyPath: 'key' });
      },
      blocked() {
        console.warn('Actualización de la base de datos bloqueada por otra pestaña abierta.');
      },
    }).catch((e: unknown) => {
      dbPromise = null;
      throw e;
    });
  }
  return dbPromise;
}

/** Solo para pruebas: cierra y olvida la conexión actual. */
export async function resetDbForTests(): Promise<void> {
  if (dbPromise) {
    const db = await dbPromise.catch(() => null);
    db?.close();
  }
  dbPromise = null;
}
