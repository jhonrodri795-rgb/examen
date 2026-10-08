// @vitest-environment node
import { describe, expect, it, vi } from 'vitest';
import { createApp } from './app.ts';
import { loadServerConfig } from './config.ts';
import { parseWav, sniffContainer, validateAudio } from './validation.ts';
import { mapDeepgramResponse, mapWhisperResponse, createOpenAiStt } from './providers/stt.ts';
import { mapAzureResponse } from './providers/pronunciation.ts';
import { postProcessSpeaking, postProcessWriting, quoteIsVerbatim } from './providers/anthropic.ts';
import { ProviderError, type Evaluator, type SttProvider } from './providers/types.ts';
import type { Transcript } from '../../shared/speaking-types.ts';

const WEBM = new Uint8Array([0x1a, 0x45, 0xdf, 0xa3, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 4]);

function wav(seconds: number, rate = 16000): Uint8Array {
  const samples = Math.round(seconds * rate);
  const buf = new ArrayBuffer(44 + samples * 2);
  const v = new DataView(buf);
  const w = (o: number, s: string) => [...s].forEach((ch, i) => v.setUint8(o + i, ch.charCodeAt(0)));
  w(0, 'RIFF'); v.setUint32(4, 36 + samples * 2, true); w(8, 'WAVE'); w(12, 'fmt ');
  v.setUint32(16, 16, true); v.setUint16(20, 1, true); v.setUint16(22, 1, true); v.setUint32(24, rate, true);
  v.setUint32(28, rate * 2, true); v.setUint16(32, 2, true); v.setUint16(34, 16, true); w(36, 'data'); v.setUint32(40, samples * 2, true);
  return new Uint8Array(buf);
}

const transcript: Transcript = {
  provider: 'fake', model: 'fake-1', text: 'I usually study in the library because it is quiet.', words: [], segments: [],
  capabilities: { wordTimestamps: false, wordConfidence: false, segmentConfidence: false, fillerDetection: 'none' }, createdAt: 0,
};

const fakeStt = (impl?: Partial<SttProvider>): SttProvider => ({
  name: 'fake', model: 'fake-1', dataPolicy: 'test', transcribe: vi.fn(async () => transcript), ...impl,
});

const baseCfg = () => loadServerConfig({ RATE_LIMIT_MAX: '100' });
const consent = { 'x-external-processing-consent': 'granted' };

describe('configuración', () => {
  it('sin claves no hay proveedores configurados', () => {
    const cfg = loadServerConfig({});
    expect(cfg.stt.provider).toBeNull();
    expect(cfg.evaluator.provider).toBeNull();
    expect(cfg.pronunciation.provider).toBeNull();
  });
  it('detecta proveedores a partir de las claves', () => {
    const cfg = loadServerConfig({ OPENAI_API_KEY: 'k', ANTHROPIC_API_KEY: 'a', AZURE_SPEECH_KEY: 'z', AZURE_SPEECH_REGION: 'westeurope' });
    expect(cfg.stt).toMatchObject({ provider: 'openai', model: 'whisper-1' });
    expect(cfg.evaluator).toMatchObject({ provider: 'anthropic', model: 'claude-opus-5-5', effort: 'high' });
    expect(cfg.pronunciation).toMatchObject({ provider: 'azure', region: 'westeurope' });
  });
});

describe('validación de audio', () => {
  const limits = { maxAudioBytes: 1000, maxAudioSec: 60, minAudioSec: 1 };
  it('detecta contenedores por firma', () => {
    expect(sniffContainer(WEBM)).toBe('webm');
    expect(sniffContainer(wav(0.1))).toBe('wav');
    expect(sniffContainer(new Uint8Array(20))).toBe('unknown');
  });
  it('lee la duración real de un WAV', () => {
    expect(parseWav(wav(2))?.durationSec).toBeCloseTo(2, 2);
  });
  it('rechaza audio vacío, demasiado corto, demasiado largo, demasiado grande o con firma falsa', () => {
    expect(validateAudio(new Uint8Array(), 'audio/webm', 5000, limits)).toMatchObject({ ok: false, code: 'empty_audio' });
    expect(validateAudio(WEBM, 'audio/webm', 300, limits)).toMatchObject({ ok: false, code: 'audio_too_short' });
    expect(validateAudio(WEBM, 'audio/webm', 61_000, limits)).toMatchObject({ ok: false, code: 'audio_too_long' });
    expect(validateAudio(new Uint8Array(2000).fill(0x1a), 'audio/webm', 5000, limits)).toMatchObject({ ok: false, code: 'audio_too_large' });
    expect(validateAudio(WEBM, 'audio/ogg', 5000, limits)).toMatchObject({ ok: false, code: 'content_mismatch' });
    expect(validateAudio(WEBM, 'video/mp4', 5000, limits)).toMatchObject({ ok: false, code: 'unsupported_type' });
    expect(validateAudio(WEBM, 'audio/webm;codecs=opus', 5000, limits)).toMatchObject({ ok: true, container: 'webm' });
  });
});

describe('API', () => {
  it('informa de capacidades sin exponer claves', async () => {
    const app = createApp(loadServerConfig({ OPENAI_API_KEY: 'sk-secret-123', ANTHROPIC_API_KEY: 'sk-ant-secret' }));
    const res = await app.request('/api/capabilities');
    const text = await res.text();
    expect(res.status).toBe(200);
    expect(text).not.toContain('secret');
    const caps = JSON.parse(text);
    expect(caps.stt.configured).toBe(true);
    expect(caps.evaluator.model).toBe('claude-opus-5-5');
  });

  it('API no configurada → 503 con mensaje claro', async () => {
    const app = createApp(baseCfg(), { stt: null, evaluator: null, pronunciation: null });
    const res = await app.request('/api/speaking/transcribe?durationMs=5000', { method: 'POST', headers: { 'content-type': 'audio/webm', ...consent }, body: WEBM });
    expect(res.status).toBe(503);
    expect((await res.json()).error.code).toBe('stt_not_configured');
    const ev = await app.request('/api/writing/evaluate', { method: 'POST', headers: { 'content-type': 'application/json', ...consent }, body: '{}' });
    expect(ev.status).toBe(503);
  });

  it('exige consentimiento explícito antes de enviar datos a terceros', async () => {
    const stt = fakeStt();
    const app = createApp(baseCfg(), { stt });
    const res = await app.request('/api/speaking/transcribe?durationMs=5000', { method: 'POST', headers: { 'content-type': 'audio/webm' }, body: WEBM });
    expect(res.status).toBe(428);
    expect(stt.transcribe).not.toHaveBeenCalled();
  });

  it('transcribe audio válido', async () => {
    const stt = fakeStt();
    const app = createApp(baseCfg(), { stt });
    const res = await app.request('/api/speaking/transcribe?durationMs=5000', { method: 'POST', headers: { 'content-type': 'audio/webm', ...consent }, body: WEBM });
    expect(res.status).toBe(200);
    expect((await res.json()).text).toContain('library');
    expect(res.headers.get('cache-control')).toBe('no-store');
  });

  it('gestiona transcripción fallida, tiempo de espera y ausencia de voz', async () => {
    const failing = createApp(baseCfg(), { stt: fakeStt({ transcribe: async () => { throw new ProviderError(429, 'provider_rate_limited', 'límite', 30); } }) });
    const r1 = await failing.request('/api/speaking/transcribe?durationMs=5000', { method: 'POST', headers: { 'content-type': 'audio/webm', ...consent }, body: WEBM });
    expect(r1.status).toBe(429);
    expect(r1.headers.get('retry-after')).toBe('30');

    const timeout = createApp(baseCfg(), { stt: fakeStt({ transcribe: async () => { throw Object.assign(new Error('t'), { name: 'TimeoutError' }); } }) });
    const r2 = await timeout.request('/api/speaking/transcribe?durationMs=5000', { method: 'POST', headers: { 'content-type': 'audio/webm', ...consent }, body: WEBM });
    expect(r2.status).toBe(504);

    const silent = createApp(baseCfg(), { stt: fakeStt({ transcribe: async () => ({ ...transcript, text: '  ' }) }) });
    const r3 = await silent.request('/api/speaking/transcribe?durationMs=5000', { method: 'POST', headers: { 'content-type': 'audio/webm', ...consent }, body: WEBM });
    expect((await r3.json()).error.code).toBe('no_speech');
  });

  it('rechaza audio cuya duración real excede el límite aunque la declarada sea menor', async () => {
    const app = createApp(loadServerConfig({ MAX_AUDIO_SECONDS: '60', RATE_LIMIT_MAX: '100' }), { stt: fakeStt({ transcribe: async () => ({ ...transcript, durationSec: 300 }) }) });
    const res = await app.request('/api/speaking/transcribe?durationMs=5000', { method: 'POST', headers: { 'content-type': 'audio/webm', ...consent }, body: WEBM });
    expect(res.status).toBe(422);
  });

  it('aplica el límite de uso', async () => {
    const app = createApp(loadServerConfig({ RATE_LIMIT_MAX: '2' }), { stt: fakeStt() });
    const send = () => app.request('/api/speaking/transcribe?durationMs=5000', { method: 'POST', headers: { 'content-type': 'audio/webm', ...consent }, body: WEBM });
    expect((await send()).status).toBe(200);
    expect((await send()).status).toBe(200);
    const third = await send();
    expect(third.status).toBe(429);
    expect(Number(third.headers.get('retry-after'))).toBeGreaterThan(0);
  });

  it('rechaza cuerpos de audio por encima del tamaño máximo', async () => {
    const app = createApp(loadServerConfig({ MAX_AUDIO_MB: '0.001', RATE_LIMIT_MAX: '100' }), { stt: fakeStt() });
    const big = new Uint8Array(5000);
    big.set(WEBM);
    const res = await app.request('/api/speaking/transcribe?durationMs=5000', { method: 'POST', headers: { 'content-type': 'audio/webm', 'content-length': '5000', ...consent }, body: big });
    expect(res.status).toBe(413);
  });

  it('valida el cuerpo de evaluación y la longitud mínima', async () => {
    const evaluator: Evaluator = {
      name: 'fake', model: 'm', dataPolicy: '',
      evaluateSpeaking: vi.fn(), evaluateWriting: vi.fn(async () => ({ provider: 'fake', model: 'm', mode: 'ai' as const, overall5: 4, criteria: [], issues: [], strengths: [], improvedVersion: '', limitations: [], droppedEvidence: 0, createdAt: 0 })),
    };
    const app = createApp(baseCfg(), { evaluator });
    const bad = await app.request('/api/speaking/evaluate', { method: 'POST', headers: { 'content-type': 'application/json', ...consent }, body: JSON.stringify({ task: {} }) });
    expect(bad.status).toBe(400);
    const short = await app.request('/api/writing/evaluate', {
      method: 'POST', headers: { 'content-type': 'application/json', ...consent },
      body: JSON.stringify({ task: { type: 'email', prompt: 'p', details: [], recommendedWords: [80, 120] }, text: 'Too short.' }),
    });
    expect(short.status).toBe(422);
    const ok = await app.request('/api/writing/evaluate', {
      method: 'POST', headers: { 'content-type': 'application/json', ...consent },
      body: JSON.stringify({ task: { type: 'email', prompt: 'p', details: [], recommendedWords: [80, 120] }, text: 'word '.repeat(30) }),
    });
    expect(ok.status).toBe(200);
  });

  it('pronunciación exige WAV 16 kHz mono', async () => {
    const pron = { name: 'fake', dataPolicy: '', assess: vi.fn(async () => ({ provider: 'fake', referenceText: 'x', recognizedText: 'x', accuracy: 90, fluency: 90, completeness: 100, prosody: null, pronunciation: 91, words: [], createdAt: 0 })) };
    const app = createApp(baseCfg(), { pronunciation: pron });
    const wrongRate = await app.request('/api/speaking/pronunciation?referenceText=Hello%20there', { method: 'POST', headers: { 'content-type': 'audio/wav', ...consent }, body: wav(2, 44100) as Uint8Array<ArrayBuffer> });
    expect(wrongRate.status).toBe(415);
    const good = await app.request('/api/speaking/pronunciation?referenceText=Hello%20there', { method: 'POST', headers: { 'content-type': 'audio/wav', ...consent }, body: wav(2) as Uint8Array<ArrayBuffer> });
    expect(good.status).toBe(200);
    expect(pron.assess).toHaveBeenCalledOnce();
  });
});

describe('proveedores (respuestas simuladas)', () => {
  it('mapea Whisper verbose_json con marcas de tiempo y confianza de segmento', () => {
    const t = mapWhisperResponse({
      text: ' Um, I think so.', duration: 2.5, language: 'english',
      words: [{ word: 'Um', start: 0, end: 0.3 }, { word: 'I', start: 0.5, end: 0.6 }, { word: 'think', start: 0.6, end: 0.9 }, { word: 'so', start: 0.9, end: 1.1 }],
      segments: [{ text: ' Um, I think so.', start: 0, end: 1.1, avg_logprob: -0.2 }],
    }, 'whisper-1', true);
    expect(t.words[0]!.filler).toBe(true);
    expect(t.segments[0]!.confidence).toBeCloseTo(0.82, 2);
    expect(t.capabilities.wordTimestamps).toBe(true);
    expect(t.capabilities.wordConfidence).toBe(false);
  });

  it('envía multipart a OpenAI con el modelo y formato correctos', async () => {
    const fetchMock = vi.fn(async (_url: string | URL | Request, init?: RequestInit) => {
      const form = init!.body as FormData;
      expect(form.get('model')).toBe('whisper-1');
      expect(form.get('response_format')).toBe('verbose_json');
      expect(form.getAll('timestamp_granularities[]')).toEqual(['word', 'segment']);
      expect((init!.headers as Record<string, string>).Authorization).toBe('Bearer key');
      return new Response(JSON.stringify({ text: 'Hello', words: [], segments: [] }), { status: 200 });
    });
    const p = createOpenAiStt({ apiKey: 'key', baseUrl: 'https://api.openai.com/v1', model: 'whisper-1' }, fetchMock as unknown as typeof fetch);
    const t = await p.transcribe(WEBM, 'audio/webm', { signal: new AbortController().signal });
    expect(t.text).toBe('Hello');
    const failing = createOpenAiStt({ apiKey: 'bad', baseUrl: 'https://api.openai.com/v1', model: 'whisper-1' }, (async () => new Response('nope', { status: 401 })) as unknown as typeof fetch);
    await expect(failing.transcribe(WEBM, 'audio/webm', { signal: new AbortController().signal })).rejects.toMatchObject({ code: 'provider_auth' });
  });

  it('mapea Deepgram con confianza por palabra y muletillas', () => {
    const t = mapDeepgramResponse({
      metadata: { duration: 3 },
      results: { channels: [{ alternatives: [{ transcript: 'uh I agree', confidence: 0.9, words: [
        { word: 'uh', start: 0, end: 0.2, confidence: 0.7 }, { word: 'i', punctuated_word: 'I', start: 0.3, end: 0.4, confidence: 0.99 }, { word: 'agree', start: 0.4, end: 0.8, confidence: 0.4 },
      ] }] }] },
    }, 'nova-3');
    expect(t.words.map((w) => w.word)).toEqual(['uh', 'I', 'agree']);
    expect(t.words[0]!.filler).toBe(true);
    expect(t.capabilities).toMatchObject({ wordConfidence: true, fillerDetection: 'provider' });
  });

  it('mapea Azure en sus dos formatos y detecta ausencia de voz', () => {
    const a = mapAzureResponse({ RecognitionStatus: 'Success', NBest: [{ Display: 'Hello.', AccuracyScore: 80, FluencyScore: 70, CompletenessScore: 100, PronScore: 78, Words: [{ Word: 'hello', AccuracyScore: 80, ErrorType: 'None' }] }] }, 'Hello.');
    expect(a.pronunciation).toBe(78);
    const b = mapAzureResponse({ RecognitionStatus: 'Success', NBest: [{ Display: 'Hi.', PronunciationAssessment: { AccuracyScore: 60, PronScore: 55 }, Words: [{ Word: 'hi', PronunciationAssessment: { AccuracyScore: 60, ErrorType: 'Mispronunciation' } }] }] }, 'Hi.');
    expect(b.words[0]).toEqual({ word: 'hi', accuracy: 60, errorType: 'Mispronunciation' });
    expect(() => mapAzureResponse({ RecognitionStatus: 'NoMatch' }, 'x')).toThrow(/No se reconoció/);
  });
});

describe('verificación de evidencias del evaluador', () => {
  const input = {
    task: { type: 'interview' as const, prompt: 'Where do you study?', responseSec: 45 },
    transcript: { text: transcript.text, provider: 'fake', lowConfidenceWords: [] },
    durationSec: 20, acoustic: null, transcriptMetrics: null, pronunciation: null,
  };

  it('acepta citas literales e ignora mayúsculas y puntuación', () => {
    expect(quoteIsVerbatim('because it is quiet', transcript.text)).toBe(true);
    expect(quoteIsVerbatim('I USUALLY study in the library,', transcript.text)).toBe(true);
    expect(quoteIsVerbatim('I go to the park', transcript.text)).toBe(false);
  });

  it('descarta evidencias inventadas, no evalúa fluidez sin métricas y recalcula la nota global', () => {
    const ev = postProcessSpeaking({
      criteria: [
        { criterion: 'delivery', evaluable: true, score: 3, rationale: 'Fluido', evidence: [{ quote: 'pauseCount = 2', source: 'audio-metrics' }] },
        { criterion: 'languageUse', evaluable: true, score: 3, rationale: 'Bien', evidence: [{ quote: 'I usually study in the library', source: 'transcript' }] },
        { criterion: 'topicDevelopment', evaluable: true, score: 2, rationale: 'Breve', evidence: [{ quote: 'something never said', source: 'transcript' }] },
      ],
      strengths: ['x'],
      issues: [{ quote: 'invented phrase', problem: 'p', suggestion: 's', kind: 'grammar' }, { quote: 'because it is quiet', problem: 'p', suggestion: 's', kind: 'coherence' }],
      improvedResponse: 'Better.', exercises: [], pronunciationAdvice: [], limitations: [],
    }, input, 'm');
    const by = Object.fromEntries(ev.criteria.map((c) => [c.criterion, c]));
    expect(by.delivery!.evaluable).toBe(false);
    expect(by.languageUse!.score).toBe(3);
    expect(by.topicDevelopment!.evaluable).toBe(false); // su única evidencia era inventada
    expect(by.taskFulfillment!.evaluable).toBe(false); // el modelo no lo devolvió
    expect(ev.overall).toBe(3);
    expect(ev.overall5).toBe(4); // 3/4*5 = 3.75 → 4
    expect(ev.issues).toHaveLength(1);
    expect(ev.droppedEvidence).toBe(3);
    expect(ev.limitations.join(' ')).toMatch(/pronunciación/);
  });

  it('limita las puntuaciones de Writing a 0–5 y filtra citas', () => {
    const ev = postProcessWriting({
      criteria: [{ name: 'grammar', score: 7, rationale: 'r', evidence: ['dear sir', 'not in text'] }],
      issues: [], strengths: [], improvedVersion: 'v', limitations: [],
    }, { task: { type: 'email', prompt: 'p', details: [], recommendedWords: [80, 120] }, text: 'Dear Sir, hello.' }, 'm');
    expect(ev.criteria[0]!.score).toBe(5);
    expect(ev.criteria[0]!.evidence).toEqual(['dear sir']);
    expect(ev.droppedEvidence).toBe(1);
  });
});
