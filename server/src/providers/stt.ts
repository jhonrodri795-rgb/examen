import type { Transcript, TranscriptSegment, TranscriptWord } from '../../../shared/speaking-types.ts';
import { httpProviderError, ProviderError, readErrorBody, type SttProvider } from './types.ts';
import { AZURE_SHORT_AUDIO_MAX_SEC, assessUnscripted, callAzure, mapAzureResponse, type AzureResponse } from './pronunciation.ts';
import { parseWav } from '../validation.ts';

const FILLERS = new Set(['um', 'uh', 'erm', 'er', 'hmm', 'mm', 'ah', 'eh', 'uhm', 'umm', 'uhh', 'mhm']);
const clean = (w: string) => w.toLowerCase().replace(/[^a-z']/g, '');

/**
 * Indicación para que Whisper conserve muletillas (por defecto tiende a
 * omitirlas). Es un ajuste conocido del modelo, no garantiza su detección.
 */
const VERBATIM_PROMPT = 'Umm, let me think, like, hmm... Okay, so, uh, here is what I, um, think.';

function ext(mime: string) {
  if (mime.includes('webm')) return 'webm';
  if (mime.includes('ogg')) return 'ogg';
  if (mime.includes('wav')) return 'wav';
  if (mime.includes('mpeg')) return 'mp3';
  return 'm4a';
}

interface WhisperVerbose {
  text?: string;
  language?: string;
  duration?: number;
  words?: { word: string; start: number; end: number }[];
  segments?: { text: string; start: number; end: number; avg_logprob?: number }[];
}

export function mapWhisperResponse(json: WhisperVerbose, model: string, verbose: boolean): Transcript {
  const words: TranscriptWord[] = (json.words ?? []).map((w) => ({ word: w.word.trim(), start: w.start, end: w.end, filler: FILLERS.has(clean(w.word)) || undefined }));
  const segments: TranscriptSegment[] = (json.segments ?? []).map((s) => ({
    text: s.text.trim(),
    start: s.start,
    end: s.end,
    confidence: typeof s.avg_logprob === 'number' ? Math.round(Math.exp(s.avg_logprob) * 100) / 100 : undefined,
  }));
  return {
    provider: 'openai',
    model,
    text: (json.text ?? '').trim(),
    language: json.language,
    durationSec: json.duration,
    words,
    segments,
    capabilities: {
      wordTimestamps: verbose && words.length > 0,
      wordConfidence: false,
      segmentConfidence: segments.some((s) => s.confidence !== undefined),
      fillerDetection: 'prompted',
    },
    createdAt: Date.now(),
  };
}

/** OpenAI (o servidor compatible con la API de transcripción de OpenAI, p. ej. Whisper autoalojado). */
export function createOpenAiStt(cfg: { apiKey: string; baseUrl: string; model: string }, fetchImpl: typeof fetch = fetch): SttProvider {
  const verbose = cfg.model.startsWith('whisper');
  const host = new URL(cfg.baseUrl).host;
  return {
    name: 'openai',
    model: cfg.model,
    dataPolicy: `El audio de la respuesta se envía a ${host} (modelo ${cfg.model}) para transcribirlo. El servidor local no lo almacena.`,
    async transcribe(audio, mime, { signal }) {
      const form = new FormData();
      form.append('file', new Blob([audio as Uint8Array<ArrayBuffer>], { type: mime }), `response.${ext(mime)}`);
      form.append('model', cfg.model);
      form.append('language', 'en');
      form.append('temperature', '0');
      form.append('prompt', VERBATIM_PROMPT);
      if (verbose) {
        form.append('response_format', 'verbose_json');
        form.append('timestamp_granularities[]', 'word');
        form.append('timestamp_granularities[]', 'segment');
      } else {
        form.append('response_format', 'json');
      }
      const res = await fetchImpl(`${cfg.baseUrl}/audio/transcriptions`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${cfg.apiKey}` },
        body: form,
        signal,
      });
      if (!res.ok) throw httpProviderError('Servicio de transcripción', res, await readErrorBody(res));
      return mapWhisperResponse((await res.json()) as WhisperVerbose, cfg.model, verbose);
    },
  };
}

interface DeepgramResponse {
  metadata?: { duration?: number };
  results?: {
    channels?: { alternatives?: { transcript?: string; confidence?: number; words?: { word: string; punctuated_word?: string; start: number; end: number; confidence?: number }[] }[] }[];
    utterances?: { transcript: string; start: number; end: number; confidence?: number }[];
  };
}

export function mapDeepgramResponse(json: DeepgramResponse, model: string): Transcript {
  const alt = json.results?.channels?.[0]?.alternatives?.[0];
  const words: TranscriptWord[] = (alt?.words ?? []).map((w) => ({
    word: w.punctuated_word ?? w.word,
    start: w.start,
    end: w.end,
    confidence: w.confidence,
    filler: FILLERS.has(clean(w.word)) || undefined,
  }));
  const segments: TranscriptSegment[] = (json.results?.utterances ?? []).map((u) => ({ text: u.transcript, start: u.start, end: u.end, confidence: u.confidence }));
  return {
    provider: 'deepgram',
    model,
    text: (alt?.transcript ?? '').trim(),
    language: 'en',
    durationSec: json.metadata?.duration,
    words,
    segments,
    capabilities: {
      wordTimestamps: words.length > 0,
      wordConfidence: words.some((w) => w.confidence !== undefined),
      segmentConfidence: segments.some((s) => s.confidence !== undefined),
      fillerDetection: 'provider',
    },
    createdAt: Date.now(),
  };
}

export function createDeepgramStt(cfg: { apiKey: string; model: string }, fetchImpl: typeof fetch = fetch): SttProvider {
  return {
    name: 'deepgram',
    model: cfg.model,
    dataPolicy: `El audio de la respuesta se envía a Deepgram (api.deepgram.com, modelo ${cfg.model}) para transcribirlo. El servidor local no lo almacena.`,
    async transcribe(audio, mime, { signal }) {
      const params = new URLSearchParams({ model: cfg.model, language: 'en', punctuate: 'true', smart_format: 'true', filler_words: 'true', utterances: 'true' });
      const res = await fetchImpl(`https://api.deepgram.com/v1/listen?${params}`, {
        method: 'POST',
        headers: { Authorization: `Token ${cfg.apiKey}`, 'Content-Type': mime },
        body: audio as Uint8Array<ArrayBuffer>,
        signal,
      });
      if (!res.ok) throw httpProviderError('Deepgram', res, await readErrorBody(res));
      return mapDeepgramResponse((await res.json()) as DeepgramResponse, cfg.model);
    },
  };
}

/** Transcripción con Azure (REST de audio corto) + evaluación de pronunciación sin guion en la misma llamada. */
export function mapAzureTranscript(json: AzureResponse): Transcript {
  const best = json.NBest?.[0];
  const pronunciation = mapAzureResponse(json, '');
  const words: TranscriptWord[] = (best?.Words ?? [])
    .filter((w) => typeof w.Offset === 'number' && typeof w.Duration === 'number')
    .map((w) => ({ word: w.Word, start: w.Offset! / 1e7, end: (w.Offset! + w.Duration!) / 1e7, filler: FILLERS.has(clean(w.Word)) || undefined }));
  const text = (best?.Display ?? json.DisplayText ?? '').trim();
  const start = typeof json.Offset === 'number' ? json.Offset / 1e7 : words[0]?.start ?? 0;
  const end = typeof json.Duration === 'number' ? start + json.Duration / 1e7 : words.at(-1)?.end ?? 0;
  return {
    provider: 'azure',
    model: 'speech-to-text (audio corto)',
    text,
    language: 'en-US',
    durationSec: end > 0 ? Math.round(end * 100) / 100 : undefined,
    words,
    segments: text ? [{ text, start, end, confidence: typeof best?.Confidence === 'number' ? Math.round(best.Confidence * 100) / 100 : undefined }] : [],
    capabilities: { wordTimestamps: words.length > 0, wordConfidence: false, segmentConfidence: typeof best?.Confidence === 'number', fillerDetection: 'none' },
    createdAt: Date.now(),
    pronunciation,
  };
}

export function createAzureStt(cfg: { key: string; region: string; withPronunciation: boolean }, fetchImpl: typeof fetch = fetch): SttProvider {
  return {
    name: 'azure',
    model: 'speech-to-text (audio corto)',
    dataPolicy: `El audio de la respuesta (WAV 16 kHz) se envía a Azure AI Speech (región ${cfg.region}) para transcribirlo${cfg.withPronunciation ? ' y puntuar pronunciación, fluidez y prosodia en la misma llamada' : ''}. El servidor local no lo almacena.`,
    async transcribe(audio, mime, { signal, pronunciation }) {
      const wav = parseWav(audio);
      if (!mime.includes('wav') || !wav || wav.sampleRate !== 16000 || wav.channels !== 1 || wav.bitsPerSample !== 16) {
        throw new ProviderError(415, 'wav_format', 'Azure requiere audio WAV PCM de 16 bits, mono, 16 kHz.');
      }
      if (wav.durationSec > AZURE_SHORT_AUDIO_MAX_SEC + 0.5) {
        throw new ProviderError(422, 'audio_too_long', `Azure (audio corto) admite hasta ${AZURE_SHORT_AUDIO_MAX_SEC} s por respuesta.`);
      }
      if (cfg.withPronunciation && pronunciation !== false) {
        // Sin guion, en tramos de ≤ 30 s: transcripción con tiempos por palabra + pronunciación.
        return mapAzureTranscript(await assessUnscripted(cfg, audio, signal, fetchImpl));
      }
      // Solo transcripción (sin evaluación, que se factura aparte): sin tiempos por palabra.
      const t = mapAzureTranscript(await callAzure(cfg, audio, '', signal, fetchImpl, { assess: false }));
      return { ...t, pronunciation: undefined };
    },
  };
}
