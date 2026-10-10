import { Hono, type Context } from 'hono';
import { bodyLimit } from 'hono/body-limit';
import { z } from 'zod';
import type { ServerCapabilities } from '../../shared/speaking-types.ts';
import type { ServerConfig } from './config.ts';
import { ACCEPTED_AUDIO_TYPES, parseWav, validateAudio } from './validation.ts';
import { createRateLimiter } from './rate-limit.ts';
import { createAnthropicEvaluator } from './providers/anthropic.ts';
import { createAzurePronunciation } from './providers/pronunciation.ts';
import { createAzureStt, createDeepgramStt, createOpenAiStt } from './providers/stt.ts';
import { ProviderError, type Evaluator, type PronunciationProvider, type SttProvider } from './providers/types.ts';

export const API_VERSION = '1.0.0';

export interface AppDeps {
  stt?: SttProvider | null;
  pronunciation?: PronunciationProvider | null;
  evaluator?: Evaluator | null;
  now?: () => number;
  log?: (msg: string, meta?: Record<string, unknown>) => void;
}

function buildProviders(cfg: ServerConfig, deps: AppDeps) {
  const stt =
    deps.stt !== undefined
      ? deps.stt
      : cfg.stt.provider === 'openai'
        ? createOpenAiStt(cfg.stt)
        : cfg.stt.provider === 'deepgram'
          ? createDeepgramStt(cfg.stt)
          : cfg.stt.provider === 'azure'
            ? createAzureStt({ key: cfg.stt.key, region: cfg.stt.region, withPronunciation: cfg.pronunciation.provider === 'azure' })
            : null;
  const pronunciation = deps.pronunciation !== undefined ? deps.pronunciation : cfg.pronunciation.provider === 'azure' ? createAzurePronunciation(cfg.pronunciation) : null;
  const evaluator =
    deps.evaluator !== undefined
      ? deps.evaluator
      : cfg.evaluator.provider === 'anthropic'
        ? createAnthropicEvaluator({ ...cfg.evaluator, timeoutMs: cfg.providerTimeoutMs })
        : null;
  return { stt, pronunciation, evaluator };
}

const SpeakingEvalBody = z.object({
  task: z.object({
    type: z.enum(['listen-repeat', 'interview', 'independent-speaking']),
    prompt: z.string().min(1).max(2000),
    referenceText: z.string().max(1000).optional(),
    responseSec: z.number().positive().max(600),
  }),
  transcript: z.object({ text: z.string().max(20000), provider: z.string().max(60), lowConfidenceWords: z.array(z.string().max(60)).max(500), source: z.enum(['asr', 'self', 'none']).optional() }),
  durationSec: z.number().positive().max(600).nullable(),
  acoustic: z.record(z.string(), z.unknown()).nullable(),
  transcriptMetrics: z.record(z.string(), z.unknown()).nullable(),
  pronunciation: z.record(z.string(), z.unknown()).nullable(),
});

const WritingEvalBody = z.object({
  task: z.object({
    type: z.enum(['email', 'academic-discussion']),
    prompt: z.string().min(1).max(4000),
    details: z.array(z.string().max(2000)).max(10),
    recommendedWords: z.tuple([z.number().int().positive(), z.number().int().positive()]),
  }),
  text: z.string(),
});

export function createApp(cfg: ServerConfig, deps: AppDeps = {}) {
  const app = new Hono();
  const { stt, pronunciation, evaluator } = buildProviders(cfg, deps);
  const now = deps.now ?? Date.now;
  const log = deps.log ?? ((msg, meta) => console.info(`[api] ${msg}`, meta ?? ''));
  const limiter = createRateLimiter(cfg.rateLimit, now);

  const fail = (c: Context, status: number, code: string, message: string, retryAfterSec?: number) => {
    if (retryAfterSec) c.header('Retry-After', String(retryAfterSec));
    return c.json({ error: { code, message, ...(retryAfterSec ? { retryAfterSec } : {}) } }, status as 400);
  };

  const clientKey = (c: Context) =>
    c.req.header('x-forwarded-for')?.split(',')[0]?.trim() ||
    (c.env as { incoming?: { socket?: { remoteAddress?: string } } } | undefined)?.incoming?.socket?.remoteAddress ||
    'local';

  /** Ejecuta una llamada a un proveedor con tiempo máximo y errores comprensibles. */
  async function callProvider<T>(c: Context, label: string, fn: (signal: AbortSignal) => Promise<T>) {
    const started = now();
    const signal = AbortSignal.timeout(cfg.providerTimeoutMs);
    try {
      const result = await fn(signal);
      log(`${label} ok`, { ms: now() - started });
      return { ok: true as const, result };
    } catch (e) {
      const err = e as Error;
      log(`${label} error`, { ms: now() - started, name: err.name, code: (e as ProviderError).code });
      if (e instanceof ProviderError) return { ok: false as const, response: fail(c, e.status, e.code, e.message, e.retryAfterSec) };
      if (err.name === 'TimeoutError' || err.name === 'AbortError') return { ok: false as const, response: fail(c, 504, 'provider_timeout', 'El proveedor tardó demasiado en responder. Inténtalo de nuevo.') };
      return { ok: false as const, response: fail(c, 502, 'provider_error', 'Error al comunicarse con el proveedor externo.') };
    }
  }

  app.use('/api/*', async (c, next) => {
    await next();
    c.header('Cache-Control', 'no-store');
    c.header('X-Content-Type-Options', 'nosniff');
    c.header('Referrer-Policy', 'no-referrer');
  });

  app.onError((err, c) => {
    log('unhandled', { name: err.name });
    return fail(c, 500, 'internal_error', 'Error interno del servidor.');
  });

  app.get('/api/health', (c) => c.json({ ok: true, version: API_VERSION }));

  app.get('/api/capabilities', (c) => {
    const caps: ServerCapabilities = {
      version: API_VERSION,
      stt: stt
        ? { configured: true, provider: stt.name, model: stt.model, dataPolicy: stt.dataPolicy }
        : { configured: false, provider: null, model: null, dataPolicy: 'No hay servicio de transcripción configurado: el audio no sale de tu navegador.' },
      pronunciation: pronunciation
        ? { configured: true, provider: pronunciation.name, model: null, dataPolicy: pronunciation.dataPolicy }
        : { configured: false, provider: null, model: null, dataPolicy: 'Sin evaluación fonética: no se mide la pronunciación.' },
      evaluator: evaluator
        ? { configured: true, provider: evaluator.name, model: evaluator.model, dataPolicy: evaluator.dataPolicy }
        : { configured: false, provider: null, model: null, dataPolicy: 'Sin evaluador de IA: se usan rúbricas y análisis local transparentes.' },
      limits: { ...cfg.limits, acceptedAudioTypes: ACCEPTED_AUDIO_TYPES },
      storage: 'El servidor no guarda audio, textos ni informes: procesa cada solicitud en memoria y la descarta. Todo el historial se conserva solo en tu navegador.',
    };
    return c.json(caps);
  });

  // ---- Consentimiento y límite de uso para rutas que contactan proveedores externos ----
  const guarded = async (c: Context, next: () => Promise<void>) => {
    if (c.req.header('x-external-processing-consent') !== 'granted') {
      return fail(c, 428, 'consent_required', 'Se necesita tu consentimiento explícito para enviar datos a un servicio externo.');
    }
    const r = limiter.hit(clientKey(c));
    if (!r.allowed) return fail(c, 429, 'rate_limited', 'Has alcanzado el límite de solicitudes. Espera unos minutos.', r.retryAfterSec);
    await next();
  };

  const audioLimit = bodyLimit({
    maxSize: cfg.limits.maxAudioBytes,
    onError: (c) => fail(c, 413, 'audio_too_large', `El audio supera el tamaño máximo (${Math.round(cfg.limits.maxAudioBytes / 1024 / 1024)} MB).`),
  });
  const jsonLimit = bodyLimit({ maxSize: 256 * 1024, onError: (c) => fail(c, 413, 'body_too_large', 'La solicitud es demasiado grande.') });

  app.post('/api/speaking/transcribe', audioLimit, guarded, async (c) => {
    if (!stt) return fail(c, 503, 'stt_not_configured', 'No hay un servicio de transcripción configurado en el servidor.');
    const bytes = new Uint8Array(await c.req.arrayBuffer());
    const durationParam = c.req.query('durationMs');
    const v = validateAudio(bytes, c.req.header('content-type'), durationParam ? Number(durationParam) : null, cfg.limits);
    if (!v.ok) return fail(c, v.status, v.code, v.message);
    const out = await callProvider(c, 'transcribe', (signal) => stt.transcribe(bytes, v.mime, { signal, pronunciation: c.req.query('pronunciation') !== '0' }));
    if (!out.ok) return out.response;
    const t = out.result;
    if (t.durationSec && t.durationSec > cfg.limits.maxAudioSec + 2) {
      return fail(c, 422, 'audio_too_long', `El audio real dura ${Math.round(t.durationSec)} s y supera el máximo permitido.`);
    }
    if (!t.text.trim()) return fail(c, 422, 'no_speech', 'No se detectó habla en la grabación.');
    return c.json(t);
  });

  app.post('/api/speaking/pronunciation', audioLimit, guarded, async (c) => {
    if (!pronunciation) return fail(c, 503, 'pronunciation_not_configured', 'No hay un servicio de evaluación de pronunciación configurado.');
    // Sin frase de referencia: evaluación sin guion (respuestas libres de Interview).
    const referenceText = (c.req.query('referenceText') ?? '').trim();
    if (referenceText.length > 500) return fail(c, 400, 'reference_too_long', 'La frase de referencia es demasiado larga.');
    const bytes = new Uint8Array(await c.req.arrayBuffer());
    const v = validateAudio(bytes, c.req.header('content-type'), null, { ...cfg.limits, maxAudioSec: Math.min(cfg.limits.maxAudioSec, 60) });
    if (!v.ok) return fail(c, v.status, v.code, v.message);
    const wav = parseWav(bytes);
    if (!wav || wav.sampleRate !== 16000 || wav.channels !== 1 || wav.bitsPerSample !== 16) {
      return fail(c, 415, 'wav_format', 'Se requiere WAV PCM de 16 bits, mono, 16 kHz.');
    }
    const out = await callProvider(c, 'pronunciation', (signal) => pronunciation.assess(bytes, referenceText, { signal }));
    return out.ok ? c.json(out.result) : out.response;
  });

  app.post('/api/speaking/evaluate', jsonLimit, guarded, async (c) => {
    if (!evaluator) return fail(c, 503, 'evaluator_not_configured', 'No hay un evaluador de IA configurado en el servidor.');
    const parsed = SpeakingEvalBody.safeParse(await c.req.json().catch(() => null));
    if (!parsed.success) return fail(c, 400, 'invalid_body', 'Datos de evaluación incompletos o inválidos.');
    const body = parsed.data;
    // Sin texto se puede evaluar solo la fluidez si hay métricas del audio.
    const words = body.transcript.text.trim().split(/\s+/).filter(Boolean).length;
    if (words < 3 && !(body.transcript.source === 'none' && body.acoustic)) return fail(c, 422, 'transcript_too_short', 'La transcripción es demasiado breve para evaluarla.');
    const out = await callProvider(c, 'evaluate-speaking', (signal) => evaluator.evaluateSpeaking(body, { signal }));
    return out.ok ? c.json(out.result) : out.response;
  });

  app.post('/api/writing/evaluate', jsonLimit, guarded, async (c) => {
    if (!evaluator) return fail(c, 503, 'evaluator_not_configured', 'No hay un evaluador de IA configurado en el servidor.');
    const parsed = WritingEvalBody.safeParse(await c.req.json().catch(() => null));
    if (!parsed.success) return fail(c, 400, 'invalid_body', 'Datos de evaluación incompletos o inválidos.');
    const body = parsed.data;
    if (body.text.length > cfg.limits.maxTextChars) return fail(c, 413, 'text_too_long', `El texto supera ${cfg.limits.maxTextChars} caracteres.`);
    if (body.text.trim().split(/\s+/).length < 20) return fail(c, 422, 'text_too_short', 'El texto es demasiado breve para evaluarlo (mínimo 20 palabras).');
    const out = await callProvider(c, 'evaluate-writing', (signal) => evaluator.evaluateWriting(body, { signal }));
    return out.ok ? c.json(out.result) : out.response;
  });

  app.all('/api/*', (c) => fail(c, 404, 'not_found', 'Ruta de API no encontrada.'));

  return app;
}
