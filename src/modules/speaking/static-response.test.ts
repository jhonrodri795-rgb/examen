import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { ServerCapabilities, SpeakingEvaluation } from '@shared/speaking-types';

const evaluateSpeaking = vi.fn();
const transcribe = vi.fn();
vi.mock('@/lib/api', async (orig) => ({ ...(await orig<typeof import('@/lib/api')>()), evaluateSpeaking, transcribe }));

const { runPipeline } = await import('./pipeline');
const { hasAudio, loadRecording, selfTranscriptOf, storeStaticResponse } = await import('./recordings');

const info = (configured: boolean) => ({ configured, provider: configured ? 'claude.ai' : null, model: configured ? 'Claude' : null, dataPolicy: '' });
const caps = (evaluator: boolean): ServerCapabilities => ({
  version: 'static', stt: info(false), pronunciation: info(false), evaluator: info(evaluator),
  limits: { maxAudioBytes: 1, maxAudioSec: 300, minAudioSec: 0.8, maxTextChars: 8000, acceptedAudioTypes: [] }, storage: '',
});
const meta = { attemptId: null, itemId: 'it-1', setId: 'set-1', task: 'interview' as const, prompt: 'Where do you like to study?', context: 'studio' as const };
const task = { type: 'interview' as const, prompt: 'Where do you like to study?', responseSec: 45 };
const aiResult: SpeakingEvaluation = {
  provider: 'claude.ai', model: 'Claude', mode: 'ai', overall: 3, overall5: 4, criteria: [], strengths: [], issues: [], improvedResponse: null,
  exercises: [], pronunciationAdvice: [], limitations: [], droppedEvidence: 0, createdAt: 0,
};

beforeEach(() => {
  evaluateSpeaking.mockReset();
  transcribe.mockReset();
});

describe('respuesta de Speaking sin micrófono (versión publicada)', () => {
  it('guarda una respuesta solo de texto sin audio', async () => {
    const rec = await storeStaticResponse({ audio: null, durationMs: 41_000, selfTranscript: '  I study at home.  ' }, meta, false);
    expect(rec.source).toBe('text');
    expect(rec.sizeBytes).toBe(0);
    expect(hasAudio(rec)).toBe(false);
    expect(rec.selfTranscript).toBe('I study at home.');
    expect(await loadRecording(rec.id)).toBe(rec);
    expect(selfTranscriptOf(rec)).toMatchObject({ provider: 'self', text: 'I study at home.', words: [] });
  });

  it('evalúa la transcripción propia sin transcribir ni analizar audio, y sin inventar ritmo', async () => {
    evaluateSpeaking.mockResolvedValue(aiResult);
    const rec = await storeStaticResponse({ audio: null, durationMs: 41_000, selfTranscript: 'I usually study in the library because it is quiet.' }, meta, false);
    const consent = vi.fn(async () => true);
    const report = await runPipeline(rec, { caps: caps(true), consent, task, persist: false });
    expect(transcribe).not.toHaveBeenCalled();
    expect(consent).toHaveBeenCalledWith(['evaluator']);
    expect(report.acoustic).toBeNull();
    expect(report.transcript?.provider).toBe('self');
    expect(report.transcriptMetrics?.wordsPerMinute).toBeNull(); // sin audio no hay ritmo medido
    const body = evaluateSpeaking.mock.calls[0]![0];
    expect(body.transcript).toMatchObject({ source: 'self', provider: 'self' });
    expect(body.durationSec).toBeNull();
    expect(body.acoustic).toBeNull();
    expect(report.evaluation).toBe(aiResult);
  });

  it('si Claude deja de estar disponible, avisa y usa la evaluación heurística', async () => {
    evaluateSpeaking.mockRejectedValue(Object.assign(new Error('No se permitió que esta página use Claude.'), { permanent: true }));
    const rec = await storeStaticResponse({ audio: null, durationMs: 0, selfTranscript: 'I usually study in the library because it is quiet and I can focus.' }, meta, false);
    const onPermanentFailure = vi.fn();
    const report = await runPipeline(rec, { caps: caps(true), consent: async () => true, task, persist: false, onPermanentFailure });
    expect(onPermanentFailure).toHaveBeenCalled();
    expect(report.evaluation?.mode).toBe('heuristic');
    expect(report.evaluationError).toMatch(/Claude/);
    expect(report.evaluation?.criteria.find((c) => c.criterion === 'delivery')?.evaluable).toBe(false);
  });

  it('en Listen and Repeat compara el texto dictado con la frase de referencia', async () => {
    const rec = await storeStaticResponse({ audio: null, durationMs: 0, selfTranscript: 'The library closes at nine tonight.' }, { ...meta, task: 'listen-repeat' }, false);
    const report = await runPipeline(rec, { caps: caps(false), consent: async () => false, task: { type: 'listen-repeat', prompt: 'x', referenceText: 'The library closes at nine tonight.', responseSec: 10 }, persist: false });
    expect(report.repeatAccuracy?.accuracy).toBe(1);
    expect(evaluateSpeaking).not.toHaveBeenCalled();
  });
});
