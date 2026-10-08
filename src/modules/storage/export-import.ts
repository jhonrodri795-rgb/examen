import type { Attempt } from '../exam-engine/types';
import { getDb, type RecordingRecord, type ToeflDB } from './db';

export const EXPORT_FORMAT = 'toefl-prep-export';
export const EXPORT_VERSION = 1;

type RecordingExport = Omit<RecordingRecord, 'data'> & { dataBase64?: string };

export interface ExportFile {
  format: typeof EXPORT_FORMAT;
  version: number;
  exportedAt: string;
  app: string;
  includesAudio: boolean;
  data: {
    attempts: Attempt[];
    recordings: RecordingExport[];
    speakingReports: ToeflDB['speakingReports']['value'][];
    writingDrafts: ToeflDB['writingDrafts']['value'][];
    writingReports: ToeflDB['writingReports']['value'][];
    notes: ToeflDB['notes']['value'][];
    customSets: ToeflDB['customSets']['value'][];
    kv: ToeflDB['kv']['value'][];
  };
}

export function bufferToBase64(buf: ArrayBuffer): string {
  const bytes = new Uint8Array(buf);
  let binary = '';
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) binary += String.fromCharCode(...bytes.subarray(i, i + chunk));
  return btoa(binary);
}

export function base64ToBuffer(b64: string): ArrayBuffer {
  const binary = atob(b64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes.buffer;
}

/** Exporta todos los datos locales a un objeto JSON estructurado. */
export async function exportAll(options: { includeAudio: boolean }): Promise<ExportFile> {
  const db = await getDb();
  const recordings = (await db.getAll('recordings')).map(({ data, ...meta }) =>
    options.includeAudio ? { ...meta, dataBase64: bufferToBase64(data) } : meta,
  );
  return {
    format: EXPORT_FORMAT,
    version: EXPORT_VERSION,
    exportedAt: new Date().toISOString(),
    app: 'TOEFL Prep Studio',
    includesAudio: options.includeAudio,
    data: {
      attempts: await db.getAll('attempts'),
      recordings,
      speakingReports: await db.getAll('speakingReports'),
      writingDrafts: await db.getAll('writingDrafts'),
      writingReports: await db.getAll('writingReports'),
      notes: await db.getAll('notes'),
      customSets: await db.getAll('customSets'),
      kv: await db.getAll('kv'),
    },
  };
}

export interface ImportSummary {
  imported: Record<string, number>;
  skipped: Record<string, number>;
  warnings: string[];
}

function isObj(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null;
}

/**
 * Importa un archivo exportado. Modo "merge": conserva el registro más reciente
 * (por `rev` en intentos y `updatedAt`/`createdAt` en el resto). Modo
 * "replace": borra los datos actuales antes de importar.
 */
export async function importAll(raw: unknown, mode: 'merge' | 'replace'): Promise<ImportSummary> {
  if (!isObj(raw) || raw.format !== EXPORT_FORMAT) throw new Error('El archivo no es una exportación válida de esta aplicación.');
  if (typeof raw.version !== 'number' || raw.version > EXPORT_VERSION) throw new Error(`Versión de exportación no compatible: ${String(raw.version)}.`);
  if (!isObj(raw.data)) throw new Error('El archivo no contiene datos.');
  const data = raw.data as Partial<ExportFile['data']>;
  const summary: ImportSummary = { imported: {}, skipped: {}, warnings: [] };
  const db = await getDb();
  const stores = ['attempts', 'recordings', 'speakingReports', 'writingDrafts', 'writingReports', 'notes', 'customSets', 'kv'] as const;
  const tx = db.transaction([...stores], 'readwrite');

  if (mode === 'replace') for (const s of stores) await tx.objectStore(s).clear();

  const count = (store: string, ok: boolean) => {
    const bucket = ok ? summary.imported : summary.skipped;
    bucket[store] = (bucket[store] ?? 0) + 1;
  };
  const stamp = (v: Record<string, unknown>) => Number(v.rev ?? v.updatedAt ?? v.createdAt ?? 0);

  async function putNewer<S extends (typeof stores)[number]>(store: S, records: unknown[] | undefined, keyField: string) {
    if (!Array.isArray(records)) return;
    const os = tx.objectStore(store);
    for (const rec of records) {
      if (!isObj(rec) || typeof rec[keyField] !== 'string') {
        count(store, false);
        continue;
      }
      const existing = (await os.get(rec[keyField] as string)) as Record<string, unknown> | undefined;
      if (existing && stamp(existing) >= stamp(rec)) {
        count(store, false);
        continue;
      }
      await os.put(rec as never);
      count(store, true);
    }
  }

  await putNewer('attempts', data.attempts, 'id');
  await putNewer('speakingReports', data.speakingReports, 'id');
  await putNewer('writingDrafts', data.writingDrafts, 'id');
  await putNewer('writingReports', data.writingReports, 'id');
  await putNewer('notes', data.notes, 'id');
  await putNewer('customSets', data.customSets, 'id');
  await putNewer('kv', data.kv, 'key');

  if (Array.isArray(data.recordings)) {
    const os = tx.objectStore('recordings');
    for (const r of data.recordings) {
      if (!isObj(r) || typeof r.id !== 'string') {
        count('recordings', false);
        continue;
      }
      if (typeof r.dataBase64 !== 'string') {
        count('recordings', false);
        continue;
      }
      if (await os.get(r.id)) {
        count('recordings', false);
        continue;
      }
      const { dataBase64, ...meta } = r as RecordingExport;
      await os.put({ ...(meta as Omit<RecordingRecord, 'data'>), data: base64ToBuffer(dataBase64!) });
      count('recordings', true);
    }
    const withoutAudio = data.recordings.filter((r) => isObj(r) && typeof r.dataBase64 !== 'string').length;
    if (withoutAudio) summary.warnings.push(`${withoutAudio} grabación(es) sin audio en el archivo no se importaron.`);
  }

  await tx.done;
  return summary;
}
