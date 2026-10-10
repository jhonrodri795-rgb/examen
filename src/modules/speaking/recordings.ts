import type { Transcript } from '@shared/speaking-types';
import { newId } from '@/lib/random';
import type { SectionId, TaskType } from '../question-bank/types';
import type { RecordingRecord } from '../storage/db';
import { getRecording, saveRecording } from '../storage/repositories';
import type { RecordingResult } from './recorder';

/**
 * Si el usuario desactiva el guardado local, las grabaciones viven solo en
 * memoria durante la sesión (se pierden al recargar).
 */
const memory = new Map<string, RecordingRecord>();

export interface RecordingMetaInput {
  attemptId: string | null;
  itemId: string;
  setId: string;
  task: TaskType;
  prompt: string;
  referenceText?: string;
  context: 'exam' | 'studio';
}

export async function storeRecording(result: RecordingResult, meta: RecordingMetaInput, persist: boolean): Promise<RecordingRecord> {
  const rec: RecordingRecord = {
    id: newId('rec'),
    ...meta,
    section: 'speaking' as SectionId,
    mimeType: result.mimeType,
    data: await result.blob.arrayBuffer(),
    sizeBytes: result.sizeBytes,
    durationMs: result.durationMs,
    createdAt: Date.now(),
  };
  if (persist) {
    try {
      await saveRecording(rec);
      return rec;
    } catch {
      // Cuota agotada u otro error: se conserva en memoria para no perder la respuesta.
    }
  }
  memory.set(rec.id, rec);
  return rec;
}

/**
 * Respuesta sin micrófono (versión publicada): texto escrito o dictado y,
 * opcionalmente, un audio grabado con otra aplicación.
 */
export async function storeStaticResponse(
  input: { audio: Blob | null; audioSource?: 'mic' | 'upload'; durationMs: number; selfTranscript: string },
  meta: RecordingMetaInput,
  persist: boolean,
): Promise<RecordingRecord> {
  const data = input.audio ? await input.audio.arrayBuffer() : new ArrayBuffer(0);
  const rec: RecordingRecord = {
    id: newId('rec'),
    ...meta,
    section: 'speaking' as SectionId,
    mimeType: input.audio ? input.audio.type || 'audio/mpeg' : 'text/plain',
    data,
    sizeBytes: data.byteLength,
    durationMs: Math.round(input.durationMs),
    createdAt: Date.now(),
    source: input.audio ? (input.audioSource ?? 'upload') : 'text',
    selfTranscript: input.selfTranscript.trim() || undefined,
  };
  if (persist) {
    try {
      await saveRecording(rec);
      return rec;
    } catch {
      /* se conserva en memoria */
    }
  }
  memory.set(rec.id, rec);
  return rec;
}

export function hasAudio(rec: Pick<RecordingRecord, 'sizeBytes' | 'source'>): boolean {
  return rec.source !== 'text' && rec.sizeBytes > 0;
}

/** Transcripción aportada por el propio estudiante (no es reconocimiento automático). */
export function selfTranscriptOf(rec: RecordingRecord): Transcript | null {
  const text = rec.selfTranscript?.trim();
  if (!text) return null;
  return {
    provider: 'self',
    model: 'escrita o dictada por el estudiante',
    text,
    words: [],
    segments: [],
    capabilities: { wordTimestamps: false, wordConfidence: false, segmentConfidence: false, fillerDetection: 'none' },
    createdAt: rec.createdAt,
  };
}

export async function loadRecording(id: string): Promise<RecordingRecord | undefined> {
  return memory.get(id) ?? (await getRecording(id).catch(() => undefined));
}

export function isMemoryOnly(id: string): boolean {
  return memory.has(id);
}

export function recordingBlob(rec: RecordingRecord): Blob {
  return new Blob([rec.data], { type: rec.mimeType });
}
