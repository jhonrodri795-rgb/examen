import type { Attempt } from '../exam-engine/types';
import {
  getDb, type CustomSetRecord, type NoteRecord, type RecordingMeta, type RecordingRecord, type SpeakingReportRecord,
  type WritingDraftRecord, type WritingReportRecord,
} from './db';

// ---------- Intentos ----------

export type SaveResult = { ok: true; attempt: Attempt } | { ok: false; reason: 'stale'; current: Attempt };

/**
 * Guarda un intento solo si su revisión es mayor que la almacenada.
 * La comprobación y la escritura ocurren en la misma transacción, de modo que
 * una pestaña con datos antiguos no puede sobrescribir datos más recientes.
 */
export async function saveAttempt(attempt: Attempt): Promise<SaveResult> {
  const db = await getDb();
  const tx = db.transaction('attempts', 'readwrite');
  const current = await tx.store.get(attempt.id);
  if (current && current.rev >= attempt.rev) {
    await tx.done;
    if (current.rev === attempt.rev) return { ok: true, attempt: current };
    return { ok: false, reason: 'stale', current };
  }
  await tx.store.put(attempt);
  await tx.done;
  return { ok: true, attempt };
}

export async function getAttempt(id: string): Promise<Attempt | undefined> {
  return (await getDb()).get('attempts', id);
}

export async function listAttempts(): Promise<Attempt[]> {
  const all = await (await getDb()).getAllFromIndex('attempts', 'by-created');
  return all.reverse();
}

export async function deleteAttempt(id: string): Promise<void> {
  const db = await getDb();
  const tx = db.transaction(['attempts', 'recordings', 'speakingReports'], 'readwrite');
  const recs = await tx.objectStore('recordings').index('by-attempt').getAllKeys(id);
  for (const key of recs) {
    await tx.objectStore('recordings').delete(key);
    const reports = await tx.objectStore('speakingReports').index('by-recording').getAllKeys(key);
    for (const r of reports) await tx.objectStore('speakingReports').delete(r);
  }
  await tx.objectStore('attempts').delete(id);
  await tx.done;
}

/** Exposición de cada set en intentos previos (para variar el contenido). */
export async function setExposure(): Promise<Record<string, number>> {
  const out: Record<string, number> = {};
  for (const a of await listAttempts()) {
    for (const s of a.sections) for (const m of s.modules) for (const id of m.setIds) out[id] = (out[id] ?? 0) + 1;
  }
  return out;
}

// ---------- Grabaciones ----------

export async function saveRecording(rec: RecordingRecord): Promise<void> {
  await (await getDb()).put('recordings', rec);
}

export async function getRecording(id: string): Promise<RecordingRecord | undefined> {
  return (await getDb()).get('recordings', id);
}

export async function updateRecordingMeta(id: string, patch: Partial<RecordingMeta>): Promise<void> {
  const db = await getDb();
  const tx = db.transaction('recordings', 'readwrite');
  const rec = await tx.store.get(id);
  if (rec) await tx.store.put({ ...rec, ...patch, id, data: rec.data });
  await tx.done;
}

export async function listRecordingMeta(): Promise<RecordingMeta[]> {
  const db = await getDb();
  const out: RecordingMeta[] = [];
  let cursor = await db.transaction('recordings').store.index('by-created').openCursor(null, 'prev');
  while (cursor) {
    const { data: _data, ...meta } = cursor.value;
    void _data;
    out.push(meta);
    cursor = await cursor.continue();
  }
  return out;
}

export async function deleteRecording(id: string): Promise<void> {
  const db = await getDb();
  const tx = db.transaction(['recordings', 'speakingReports'], 'readwrite');
  await tx.objectStore('recordings').delete(id);
  const reports = await tx.objectStore('speakingReports').index('by-recording').getAllKeys(id);
  for (const r of reports) await tx.objectStore('speakingReports').delete(r);
  await tx.done;
}

/** Borra todo el historial de Speaking (grabaciones e informes). */
export async function clearSpeakingHistory(): Promise<void> {
  const db = await getDb();
  const tx = db.transaction(['recordings', 'speakingReports'], 'readwrite');
  await tx.objectStore('recordings').clear();
  await tx.objectStore('speakingReports').clear();
  await tx.done;
}

// ---------- Informes de Speaking ----------

export async function saveSpeakingReport(r: SpeakingReportRecord): Promise<void> {
  await (await getDb()).put('speakingReports', r);
}

export async function getSpeakingReportByRecording(recordingId: string): Promise<SpeakingReportRecord | undefined> {
  const list = await (await getDb()).getAllFromIndex('speakingReports', 'by-recording', recordingId);
  return list.sort((a, b) => b.updatedAt - a.updatedAt)[0];
}

export async function listSpeakingReports(): Promise<SpeakingReportRecord[]> {
  return (await (await getDb()).getAllFromIndex('speakingReports', 'by-created')).reverse();
}

export async function deleteSpeakingReport(id: string): Promise<void> {
  await (await getDb()).delete('speakingReports', id);
}

// ---------- Writing ----------

/**
 * Autoguardado de borradores: actualiza el borrador "autosave" del set/intento
 * solo si el texto entrante es más reciente que el almacenado.
 */
export async function autosaveDraft(input: { setId: string; attemptId: string | null; text: string; wordCount: number; at: number }): Promise<WritingDraftRecord> {
  const db = await getDb();
  const id = `draft:${input.attemptId ?? 'studio'}:${input.setId}`;
  const tx = db.transaction('writingDrafts', 'readwrite');
  const existing = await tx.store.get(id);
  if (existing && existing.updatedAt > input.at) {
    await tx.done;
    return existing;
  }
  const rec: WritingDraftRecord = {
    id, setId: input.setId, attemptId: input.attemptId, text: input.text, wordCount: input.wordCount, kind: 'autosave',
    createdAt: existing?.createdAt ?? input.at, updatedAt: input.at,
  };
  await tx.store.put(rec);
  await tx.done;
  return rec;
}

export async function saveDraftSnapshot(input: { setId: string; attemptId: string | null; text: string; wordCount: number; kind: 'snapshot' | 'submitted'; at: number }): Promise<WritingDraftRecord> {
  const rec: WritingDraftRecord = {
    id: `snap:${input.setId}:${input.at}`, setId: input.setId, attemptId: input.attemptId, text: input.text, wordCount: input.wordCount,
    kind: input.kind, createdAt: input.at, updatedAt: input.at,
  };
  await (await getDb()).put('writingDrafts', rec);
  return rec;
}

export async function getAutosave(setId: string, attemptId: string | null): Promise<WritingDraftRecord | undefined> {
  return (await getDb()).get('writingDrafts', `draft:${attemptId ?? 'studio'}:${setId}`);
}

export async function listDrafts(setId?: string): Promise<WritingDraftRecord[]> {
  const db = await getDb();
  const list = setId ? await db.getAllFromIndex('writingDrafts', 'by-set', setId) : await db.getAll('writingDrafts');
  return list.sort((a, b) => b.updatedAt - a.updatedAt);
}

export async function deleteDraft(id: string): Promise<void> {
  await (await getDb()).delete('writingDrafts', id);
}

export async function saveWritingReport(r: WritingReportRecord): Promise<void> {
  await (await getDb()).put('writingReports', r);
}

export async function listWritingReports(setId?: string): Promise<WritingReportRecord[]> {
  const db = await getDb();
  const list = setId ? await db.getAllFromIndex('writingReports', 'by-set', setId) : await db.getAll('writingReports');
  return list.sort((a, b) => b.createdAt - a.createdAt);
}

export async function deleteWritingReport(id: string): Promise<void> {
  await (await getDb()).delete('writingReports', id);
}

// ---------- Notas ----------

export async function listNotes(): Promise<NoteRecord[]> {
  return (await (await getDb()).getAllFromIndex('notes', 'by-updated')).reverse();
}
export async function saveNote(n: NoteRecord): Promise<void> {
  await (await getDb()).put('notes', n);
}
export async function deleteNote(id: string): Promise<void> {
  await (await getDb()).delete('notes', id);
}

// ---------- Contenido importado ----------

export async function listCustomSets(): Promise<CustomSetRecord[]> {
  return (await getDb()).getAll('customSets');
}
export async function saveCustomSets(records: CustomSetRecord[]): Promise<void> {
  const db = await getDb();
  const tx = db.transaction('customSets', 'readwrite');
  for (const r of records) await tx.store.put(r);
  await tx.done;
}
export async function deleteCustomPack(pack: string): Promise<void> {
  const db = await getDb();
  const tx = db.transaction('customSets', 'readwrite');
  for (const r of await tx.store.getAll()) if (r.pack === pack) await tx.store.delete(r.id);
  await tx.done;
}

// ---------- Clave-valor ----------

export async function kvGet<T>(key: string): Promise<T | undefined> {
  return (await (await getDb()).get('kv', key))?.value as T | undefined;
}
export async function kvSet(key: string, value: unknown): Promise<void> {
  await (await getDb()).put('kv', { key, value });
}

/** Borra todos los datos locales de la aplicación. */
export async function clearAllData(): Promise<void> {
  const db = await getDb();
  const stores = ['attempts', 'recordings', 'speakingReports', 'writingDrafts', 'writingReports', 'notes', 'customSets', 'kv'] as const;
  const tx = db.transaction([...stores], 'readwrite');
  for (const s of stores) await tx.objectStore(s).clear();
  await tx.done;
}
