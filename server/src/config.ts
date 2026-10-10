/**
 * Configuración del servidor a partir de variables de entorno.
 * Las claves solo viven en el proceso de Node; nunca se envían al navegador.
 */

export type SttProviderName = 'openai' | 'deepgram' | 'azure';
export type EffortLevel = 'low' | 'medium' | 'high' | 'xhigh' | 'max';

export interface ServerConfig {
  stt:
    | { provider: 'openai'; apiKey: string; baseUrl: string; model: string }
    | { provider: 'deepgram'; apiKey: string; model: string }
    | { provider: 'azure'; key: string; region: string }
    | { provider: null };
  pronunciation: { provider: 'azure'; key: string; region: string } | { provider: null };
  evaluator: { provider: 'anthropic'; model: string; effort: EffortLevel; apiKey: string | null } | { provider: null };
  limits: {
    maxAudioBytes: number;
    maxAudioSec: number;
    minAudioSec: number;
    maxTextChars: number;
  };
  rateLimit: { windowMs: number; max: number };
  providerTimeoutMs: number;
}

const num = (v: string | undefined, d: number) => {
  const n = Number(v);
  return Number.isFinite(n) && n > 0 ? n : d;
};

export function loadServerConfig(env: Record<string, string | undefined>): ServerConfig {
  const azureReady = !!(env.AZURE_SPEECH_KEY && env.AZURE_SPEECH_REGION);
  const sttName = (env.STT_PROVIDER ?? (env.OPENAI_API_KEY ? 'openai' : env.DEEPGRAM_API_KEY ? 'deepgram' : azureReady ? 'azure' : 'none')).toLowerCase();
  let stt: ServerConfig['stt'] = { provider: null };
  if (sttName === 'openai' && env.OPENAI_API_KEY) {
    stt = {
      provider: 'openai',
      apiKey: env.OPENAI_API_KEY,
      baseUrl: (env.OPENAI_BASE_URL ?? 'https://api.openai.com/v1').replace(/\/$/, ''),
      model: env.OPENAI_STT_MODEL ?? 'whisper-1',
    };
  } else if (sttName === 'deepgram' && env.DEEPGRAM_API_KEY) {
    stt = { provider: 'deepgram', apiKey: env.DEEPGRAM_API_KEY, model: env.DEEPGRAM_MODEL ?? 'nova-3' };
  } else if (sttName === 'azure' && azureReady) {
    stt = { provider: 'azure', key: env.AZURE_SPEECH_KEY!, region: env.AZURE_SPEECH_REGION! };
  }

  const pronName = (env.PRONUNCIATION_PROVIDER ?? (env.AZURE_SPEECH_KEY ? 'azure' : 'none')).toLowerCase();
  const pronunciation: ServerConfig['pronunciation'] =
    pronName === 'azure' && env.AZURE_SPEECH_KEY && env.AZURE_SPEECH_REGION
      ? { provider: 'azure', key: env.AZURE_SPEECH_KEY, region: env.AZURE_SPEECH_REGION }
      : { provider: null };

  const evalName = (env.EVALUATOR_PROVIDER ?? (env.ANTHROPIC_API_KEY ? 'anthropic' : 'none')).toLowerCase();
  const effort = (env.ANTHROPIC_EFFORT ?? 'high') as EffortLevel;
  const evaluator: ServerConfig['evaluator'] =
    evalName === 'anthropic'
      ? {
          provider: 'anthropic',
          model: env.ANTHROPIC_MODEL ?? 'claude-opus-5-5',
          effort: ['low', 'medium', 'high', 'xhigh', 'max'].includes(effort) ? effort : 'high',
          apiKey: env.ANTHROPIC_API_KEY ?? null,
        }
      : { provider: null };

  return {
    stt,
    pronunciation,
    evaluator,
    limits: {
      maxAudioBytes: Math.round(num(env.MAX_AUDIO_MB, 10) * 1024 * 1024),
      maxAudioSec: num(env.MAX_AUDIO_SECONDS, 120),
      minAudioSec: num(env.MIN_AUDIO_SECONDS, 0.8),
      maxTextChars: num(env.MAX_TEXT_CHARS, 8000),
    },
    rateLimit: { windowMs: num(env.RATE_LIMIT_WINDOW_MIN, 10) * 60_000, max: num(env.RATE_LIMIT_MAX, 40) },
    providerTimeoutMs: num(env.PROVIDER_TIMEOUT_MS, 60_000),
  };
}
