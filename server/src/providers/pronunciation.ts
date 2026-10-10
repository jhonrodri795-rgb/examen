import type { PronunciationAssessment } from '../../../shared/speaking-types.ts';
import { httpProviderError, readErrorBody, ProviderError, type PronunciationProvider } from './types.ts';

interface AzureScores {
  AccuracyScore?: number;
  FluencyScore?: number;
  CompletenessScore?: number;
  ProsodyScore?: number;
  PronScore?: number;
}
export interface AzureWord {
  Word: string;
  /** Inicio y duración en unidades de 100 ns. */
  Offset?: number;
  Duration?: number;
  AccuracyScore?: number;
  ErrorType?: string;
  PronunciationAssessment?: { AccuracyScore?: number; ErrorType?: string };
}
export interface AzureResponse {
  RecognitionStatus?: string;
  DisplayText?: string;
  Offset?: number;
  Duration?: number;
  NBest?: (AzureScores & { Confidence?: number; Display?: string; Lexical?: string; PronunciationAssessment?: AzureScores; Words?: AzureWord[] })[];
}

/** Límites documentados de la API REST de audio corto: 60 s de audio; 30 s con evaluación de pronunciación. */
export const AZURE_SHORT_AUDIO_MAX_SEC = 60;
export const AZURE_PRON_MAX_SEC = 30;

/**
 * Configuración de la evaluación. Sin texto de referencia es una evaluación
 * "sin guion" (unscripted): Azure puntúa precisión, fluidez y prosodia de lo
 * que reconoce (no hay completitud ni errores de omisión).
 */
export function azureAssessmentHeader(referenceText: string): string {
  const scripted = referenceText.trim().length > 0;
  const config = {
    ...(scripted ? { ReferenceText: referenceText } : {}),
    GradingSystem: 'HundredMark',
    Granularity: 'Word',
    Dimension: 'Comprehensive',
    EnableMiscue: scripted,
    EnableProsodyAssessment: true,
  };
  return Buffer.from(JSON.stringify(config), 'utf8').toString('base64');
}

export function azureEndpoint(region: string): string {
  return `https://${region}.stt.speech.microsoft.com/speech/recognition/conversation/cognitiveservices/v1?language=en-US&format=detailed`;
}

/**
 * Llamada REST de audio corto (WAV PCM 16 kHz mono). Con `assess` añade la
 * evaluación de pronunciación (y entonces devuelve tiempos por palabra).
 */
export async function callAzure(
  cfg: { key: string; region: string },
  wav: Uint8Array,
  referenceText: string,
  signal: AbortSignal,
  fetchImpl: typeof fetch,
  opts: { assess?: boolean } = {},
): Promise<AzureResponse> {
  const headers: Record<string, string> = {
    'Ocp-Apim-Subscription-Key': cfg.key,
    'Content-Type': 'audio/wav; codecs=audio/pcm; samplerate=16000',
    Accept: 'application/json',
  };
  if (opts.assess !== false) headers['Pronunciation-Assessment'] = azureAssessmentHeader(referenceText);
  const res = await fetchImpl(azureEndpoint(cfg.region), {
    method: 'POST',
    headers,
    body: wav as Uint8Array<ArrayBuffer>,
    signal,
  });
  if (!res.ok) throw httpProviderError('Azure AI Speech', res, await readErrorBody(res));
  return (await res.json()) as AzureResponse;
}

const n = (v: number | undefined) => (typeof v === 'number' && Number.isFinite(v) ? v : null);

/** Admite las dos formas documentadas de la respuesta (puntuaciones en NBest o en NBest.PronunciationAssessment). */
export function mapAzureResponse(json: AzureResponse, referenceText: string): PronunciationAssessment {
  if (json.RecognitionStatus && json.RecognitionStatus !== 'Success') {
    throw new ProviderError(422, 'no_speech', json.RecognitionStatus === 'NoMatch' || json.RecognitionStatus === 'InitialSilenceTimeout' ? 'No se reconoció voz en la grabación.' : `Reconocimiento no completado (${json.RecognitionStatus}).`);
  }
  const best = json.NBest?.[0];
  if (!best) throw new ProviderError(502, 'provider_bad_response', 'Respuesta de evaluación de pronunciación incompleta.');
  const s: AzureScores = best.PronunciationAssessment ?? best;
  return {
    provider: 'azure',
    referenceText,
    recognizedText: best.Display ?? json.DisplayText ?? best.Lexical ?? '',
    accuracy: n(s.AccuracyScore),
    fluency: n(s.FluencyScore),
    completeness: n(s.CompletenessScore),
    prosody: n(s.ProsodyScore),
    pronunciation: n(s.PronScore),
    words: (best.Words ?? []).map((w) => ({
      word: w.Word,
      accuracy: n(w.PronunciationAssessment?.AccuracyScore ?? w.AccuracyScore),
      errorType: w.PronunciationAssessment?.ErrorType ?? w.ErrorType ?? 'None',
    })),
    createdAt: Date.now(),
  };
}

/** Muestras PCM de 16 bits de un WAV (16 kHz mono ya validado). */
function pcmOf(wav: Uint8Array): { pcm: Int16Array; rate: number } | null {
  const view = new DataView(wav.buffer, wav.byteOffset, wav.byteLength);
  let off = 12;
  let rate = 16000;
  while (off + 8 <= wav.length) {
    const id = String.fromCharCode(wav[off]!, wav[off + 1]!, wav[off + 2]!, wav[off + 3]!);
    const size = view.getUint32(off + 4, true);
    if (id === 'fmt ') rate = view.getUint32(off + 12, true);
    if (id === 'data') {
      const start = off + 8;
      const len = Math.min(size, wav.length - start) & ~1;
      const copy = wav.slice(start, start + len);
      return { pcm: new Int16Array(copy.buffer, copy.byteOffset, len / 2), rate };
    }
    off += 8 + size + (size % 2);
  }
  return null;
}

function wavOf(pcm: Int16Array, rate: number): Uint8Array {
  const out = new Uint8Array(44 + pcm.length * 2);
  const v = new DataView(out.buffer);
  const w = (o: number, t: string) => [...t].forEach((c, i) => v.setUint8(o + i, c.charCodeAt(0)));
  w(0, 'RIFF');
  v.setUint32(4, 36 + pcm.length * 2, true);
  w(8, 'WAVE');
  w(12, 'fmt ');
  v.setUint32(16, 16, true);
  v.setUint16(20, 1, true);
  v.setUint16(22, 1, true);
  v.setUint32(24, rate, true);
  v.setUint32(28, rate * 2, true);
  v.setUint16(32, 2, true);
  v.setUint16(34, 16, true);
  w(36, 'data');
  v.setUint32(40, pcm.length * 2, true);
  new Int16Array(out.buffer, 44, pcm.length).set(pcm);
  return out;
}

/**
 * Divide un WAV en tramos de como máximo `maxSec`, cortando en el punto más
 * silencioso (ventanas de 100 ms) de los últimos 8 s de cada tramo.
 */
export function splitWav(wav: Uint8Array, maxSec = AZURE_PRON_MAX_SEC): { wav: Uint8Array; startSec: number }[] {
  const parsed = pcmOf(wav);
  if (!parsed) return [{ wav, startSec: 0 }];
  const { pcm, rate } = parsed;
  if (pcm.length <= (maxSec + 0.5) * rate) return [{ wav, startSec: 0 }];
  const win = Math.round(0.1 * rate);
  const chunks: { wav: Uint8Array; startSec: number }[] = [];
  let start = 0;
  while (start < pcm.length) {
    let end = Math.min(pcm.length, start + maxSec * rate);
    if (end < pcm.length) {
      let bestAt = end;
      let bestE = Infinity;
      for (let a = Math.max(start + win, end - 8 * rate); a + win <= end; a += win / 2) {
        let e = 0;
        for (let i = a; i < a + win; i++) e += pcm[i]! * pcm[i]!;
        if (e < bestE) {
          bestE = e;
          bestAt = a + Math.floor(win / 2);
        }
      }
      end = bestAt;
    }
    chunks.push({ wav: wavOf(pcm.subarray(start, end), rate), startSec: start / rate });
    start = end;
  }
  return chunks.filter((c) => c.wav.length > 44 + rate * 2 * 0.3); // descarta colas < 0,3 s
}

/**
 * Evaluación sin guion de una respuesta de hasta 60 s: se envía en tramos de
 * ≤ 30 s (límite documentado) y se combinan transcripción, tiempos y
 * puntuaciones (media ponderada por la duración reconocida de cada tramo).
 */
export async function assessUnscripted(cfg: { key: string; region: string }, wav: Uint8Array, signal: AbortSignal, fetchImpl: typeof fetch): Promise<AzureResponse> {
  const parts: { json: AzureResponse; startSec: number }[] = [];
  for (const chunk of splitWav(wav)) parts.push({ json: await callAzure(cfg, chunk.wav, '', signal, fetchImpl), startSec: chunk.startSec });
  const ok = parts.filter((p) => p.json.RecognitionStatus === 'Success' && p.json.NBest?.[0]);
  if (!ok.length) return parts[0]?.json ?? { RecognitionStatus: 'NoMatch' };
  if (ok.length === 1 && parts.length === 1) return ok[0]!.json;
  const ticks = (sec: number) => Math.round(sec * 1e7);
  const keys = ['AccuracyScore', 'FluencyScore', 'ProsodyScore', 'PronScore', 'CompletenessScore'] as const;
  const sums: Record<string, { v: number; w: number }> = {};
  const words: AzureWord[] = [];
  let conf = 0;
  for (const { json, startSec } of ok) {
    const best = json.NBest![0]!;
    const weight = Math.max(1, json.Duration ?? 1);
    const sc = best.PronunciationAssessment ?? best;
    for (const k of keys) {
      const v = sc[k];
      if (typeof v === 'number') {
        sums[k] ??= { v: 0, w: 0 };
        sums[k]!.v += v * weight;
        sums[k]!.w += weight;
      }
    }
    conf += (best.Confidence ?? 0) * weight;
    for (const w of best.Words ?? []) words.push({ ...w, Offset: typeof w.Offset === 'number' ? w.Offset + ticks(startSec) : w.Offset });
  }
  const totalW = ok.reduce((s, p) => s + Math.max(1, p.json.Duration ?? 1), 0);
  const scores: AzureScores = {};
  for (const k of keys) if (sums[k]) scores[k] = Math.round((sums[k]!.v / sums[k]!.w) * 10) / 10;
  const first = ok[0]!;
  const last = ok[ok.length - 1]!;
  const begin = (first.json.Offset ?? 0) + ticks(first.startSec);
  const end = (last.json.Offset ?? 0) + (last.json.Duration ?? 0) + ticks(last.startSec);
  const display = ok.map((p) => p.json.NBest![0]!.Display ?? '').join(' ').trim();
  return {
    RecognitionStatus: 'Success',
    Offset: begin,
    Duration: Math.max(0, end - begin),
    DisplayText: display,
    NBest: [{ Confidence: Math.round((conf / totalW) * 100) / 100, Display: display, Lexical: ok.map((p) => p.json.NBest![0]!.Lexical ?? '').join(' ').trim(), PronunciationAssessment: scores, Words: words }],
  };
}

/**
 * Azure AI Speech — Pronunciation Assessment (REST para audio corto, WAV PCM
 * 16 kHz mono). Con frase de referencia (Listen and Repeat, ≤ 30 s) es una
 * evaluación con guion; sin ella (Interview, ≤ 60 s en tramos de 30 s), sin guion.
 */
export function createAzurePronunciation(cfg: { key: string; region: string }, fetchImpl: typeof fetch = fetch): PronunciationProvider {
  return {
    name: 'azure',
    dataPolicy: `El audio de la respuesta (WAV 16 kHz) y, en Listen and Repeat, la frase de referencia se envían a Azure AI Speech (región ${cfg.region}) para puntuar pronunciación, fluidez y prosodia. El servidor local no los almacena.`,
    async assess(wav, referenceText, { signal }) {
      if (referenceText.trim()) {
        const len = pcmOf(wav);
        if (len && len.pcm.length / len.rate > AZURE_PRON_MAX_SEC + 0.5) {
          throw new ProviderError(422, 'audio_too_long', `La evaluación con frase de referencia admite hasta ${AZURE_PRON_MAX_SEC} s.`);
        }
        return mapAzureResponse(await callAzure(cfg, wav, referenceText, signal, fetchImpl), referenceText);
      }
      return mapAzureResponse(await assessUnscripted(cfg, wav, signal, fetchImpl), '');
    },
  };
}
