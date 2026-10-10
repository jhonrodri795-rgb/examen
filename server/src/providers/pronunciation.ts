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

export const AZURE_SHORT_AUDIO_MAX_SEC = 60;

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

/** Llamada REST de audio corto con evaluación de pronunciación (WAV PCM 16 kHz mono). */
export async function callAzure(cfg: { key: string; region: string }, wav: Uint8Array, referenceText: string, signal: AbortSignal, fetchImpl: typeof fetch): Promise<AzureResponse> {
  const res = await fetchImpl(azureEndpoint(cfg.region), {
    method: 'POST',
    headers: {
      'Ocp-Apim-Subscription-Key': cfg.key,
      'Content-Type': 'audio/wav; codecs=audio/pcm; samplerate=16000',
      'Pronunciation-Assessment': azureAssessmentHeader(referenceText),
      Accept: 'application/json',
    },
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

/**
 * Azure AI Speech — Pronunciation Assessment (REST para audio corto, WAV PCM
 * 16 kHz mono, hasta 60 s). Con frase de referencia (Listen and Repeat) es
 * una evaluación con guion; sin ella (Interview), sin guion.
 */
export function createAzurePronunciation(cfg: { key: string; region: string }, fetchImpl: typeof fetch = fetch): PronunciationProvider {
  return {
    name: 'azure',
    dataPolicy: `El audio de la respuesta (WAV 16 kHz) y, en Listen and Repeat, la frase de referencia se envían a Azure AI Speech (región ${cfg.region}) para puntuar pronunciación, fluidez y prosodia. El servidor local no los almacena.`,
    async assess(wav, referenceText, { signal }) {
      return mapAzureResponse(await callAzure(cfg, wav, referenceText, signal, fetchImpl), referenceText);
    },
  };
}
