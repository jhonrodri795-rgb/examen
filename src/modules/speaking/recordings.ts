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

export async function loadRecording(id: string): Promise<RecordingRecord | undefined> {
  return memory.get(id) ?? (await getRecording(id).catch(() => undefined));
}

export function isMemoryOnly(id: string): boolean {
  return memory.has(id);
}

export function recordingBlob(rec: RecordingRecord): Blob {
  return new Blob([rec.data], { type: rec.mimeType });
}
