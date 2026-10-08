import { beforeEach, describe, expect, it } from 'vitest';
import { IDBFactory } from 'fake-indexeddb';
import { builtinBank } from '../question-bank/registry';
import { toeflIbt2026 } from '../exam-engine/blueprints/toefl-ibt-2026';
import { beginSection, createAttempt, recoverInterrupted, setResponse, currentModule } from '../exam-engine/engine';
import { resetDbForTests } from './db';
import {
  autosaveDraft, clearSpeakingHistory, deleteRecording, getAttempt, getAutosave, getRecording, listAttempts, listRecordingMeta,
  saveAttempt, saveRecording, saveSpeakingReport, setExposure, getSpeakingReportByRecording,
} from './repositories';
import { exportAll, importAll } from './export-import';

beforeEach(async () => {
  await resetDbForTests();
  globalThis.indexedDB = new IDBFactory();
});

const T0 = 1_700_000_000_000;
const attempt = () =>
  createAttempt(
    { kind: 'full', mode: 'exam', blueprintId: toeflIbt2026.id, sections: ['reading'], timing: 'standard', instantFeedback: false, relaxedListening: false, speakingPrepSec: 0, seed: 1 },
    toeflIbt2026, builtinBank, {}, T0,
  );

describe('persistencia de intentos', () => {
  it('guarda y recupera un intento con sus respuestas', async () => {
    let a = beginSection(attempt(), T0);
    const id = currentModule(a)!.itemIds[0]!;
    a = { ...setResponse(a, id, { kind: 'gap', value: 'abc' }, T0 + 1), rev: 1 };
    expect((await saveAttempt(a)).ok).toBe(true);
    const loaded = await getAttempt(a.id);
    expect(loaded?.responses[id]).toEqual({ kind: 'gap', value: 'abc' });
    // Tras una recarga, la sesión se recupera en pausa sin perder respuestas.
    const recovered = recoverInterrupted(loaded!);
    expect(recovered.interrupted).toBe(true);
    expect(recovered.responses[id]).toEqual({ kind: 'gap', value: 'abc' });
  });

  it('no permite que una revisión antigua sobrescriba una más reciente', async () => {
    const a = { ...attempt(), rev: 5 };
    await saveAttempt(a);
    const stale = { ...a, rev: 3, notes: { x: 'antiguo' } };
    const res = await saveAttempt(stale);
    expect(res.ok).toBe(false);
    expect((await getAttempt(a.id))?.rev).toBe(5);
    const newer = { ...a, rev: 6, notes: { x: 'nuevo' } };
    expect((await saveAttempt(newer)).ok).toBe(true);
    expect((await getAttempt(a.id))?.notes.x).toBe('nuevo');
  });

  it('lista intentos y calcula exposición de sets', async () => {
    const a = { ...attempt(), rev: 1 };
    await saveAttempt(a);
    expect((await listAttempts()).length).toBe(1);
    const exp = await setExposure();
    expect(exp[a.sections[0]!.modules[0]!.setIds[0]!]).toBe(1);
  });
});

describe('borradores de Writing', () => {
  it('el autoguardado no sobrescribe un texto más reciente con uno antiguo', async () => {
    await autosaveDraft({ setId: 'wr-em-gym-equipment', attemptId: null, text: 'nuevo', wordCount: 1, at: 2000 });
    await autosaveDraft({ setId: 'wr-em-gym-equipment', attemptId: null, text: 'viejo', wordCount: 1, at: 1000 });
    expect((await getAutosave('wr-em-gym-equipment', null))?.text).toBe('nuevo');
  });
});

describe('grabaciones', () => {
  const rec = (id: string) => ({
    id, attemptId: null, itemId: 'sp-int-careers-1', setId: 'sp-int-careers', task: 'interview' as const, section: 'speaking' as const,
    prompt: 'q', mimeType: 'audio/webm', data: new Uint8Array([1, 2, 3, 4]).buffer, sizeBytes: 4, durationMs: 1000, createdAt: T0, context: 'studio' as const,
  });

  it('recupera el audio y elimina grabación con su informe', async () => {
    await saveRecording(rec('r1'));
    await saveSpeakingReport({
      id: 'rep1', recordingId: 'r1', itemId: 'sp-int-careers-1', setId: 'sp-int-careers', task: 'interview', attemptId: null,
      createdAt: T0, updatedAt: T0, transcript: null, editedTranscript: null, pronunciation: null, acoustic: null,
      transcriptMetrics: null, evaluation: null, selfAssessment: null,
    });
    const back = await getRecording('r1');
    expect(new Uint8Array(back!.data)).toEqual(new Uint8Array([1, 2, 3, 4]));
    expect((await listRecordingMeta())[0]).not.toHaveProperty('data');
    await deleteRecording('r1');
    expect(await getRecording('r1')).toBeUndefined();
    expect(await getSpeakingReportByRecording('r1')).toBeUndefined();
  });

  it('borra todo el historial de Speaking', async () => {
    await saveRecording(rec('a'));
    await saveRecording(rec('b'));
    await clearSpeakingHistory();
    expect(await listRecordingMeta()).toEqual([]);
  });
});

describe('exportación e importación', () => {
  it('exporta e importa datos incluyendo audio', async () => {
    const a = { ...attempt(), rev: 2 };
    await saveAttempt(a);
    await saveRecording({
      id: 'r9', attemptId: a.id, itemId: 'x', setId: 'y', task: 'interview', section: 'speaking', prompt: 'p', mimeType: 'audio/webm',
      data: new Uint8Array([9, 8, 7]).buffer, sizeBytes: 3, durationMs: 500, createdAt: T0, context: 'exam',
    });
    const file = JSON.parse(JSON.stringify(await exportAll({ includeAudio: true })));
    expect(file.format).toBe('toefl-prep-export');

    await resetDbForTests();
    globalThis.indexedDB = new IDBFactory();
    const summary = await importAll(file, 'merge');
    expect(summary.imported.attempts).toBe(1);
    expect(summary.imported.recordings).toBe(1);
    expect(new Uint8Array((await getRecording('r9'))!.data)).toEqual(new Uint8Array([9, 8, 7]));

    // Importar de nuevo no duplica ni sobrescribe con datos iguales.
    const again = await importAll(file, 'merge');
    expect(again.skipped.attempts).toBe(1);
  });

  it('rechaza archivos con formato desconocido', async () => {
    await expect(importAll({ foo: 1 }, 'merge')).rejects.toThrow(/no es una exportación válida/);
    await expect(importAll({ format: 'toefl-prep-export', version: 99, data: {} }, 'merge')).rejects.toThrow(/no compatible/);
  });
});
