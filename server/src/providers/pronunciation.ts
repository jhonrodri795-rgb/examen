import type { PronunciationAssessment } from '../../../shared/speaking-types.ts';
import { httpProviderError, readErrorBody, ProviderError, type PronunciationProvider } from './types.ts';

interface AzureScores {
  AccuracyScore?: number;
  FluencyScore?: number;
  CompletenessScore?: number;
  ProsodyScore?: number;
  PronScore?: number;
}
interface AzureWord {
  Word: string;
  AccuracyScore?: number;
  ErrorType?: string;
  PronunciationAssessment?: { AccuracyScore?: number; ErrorType?: string };
}
interface AzureResponse {
  RecognitionStatus?: string;
  DisplayText?: string;
  NBest?: (AzureScores & { Display?: string; Lexical?: string; PronunciationAssessment?: AzureScores; Words?: AzureWord[] })[];
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
 * 16 kHz mono). Se usa solo con texto de referencia (Listen and Repeat).
 */
export function createAzurePronunciation(cfg: { key: string; region: string }, fetchImpl: typeof fetch = fetch): PronunciationProvider {
  return {
    name: 'azure',
    dataPolicy: `El audio de Listen and Repeat (WAV 16 kHz) y la frase de referencia se envían a Azure AI Speech (región ${cfg.region}). El servidor local no los almacena.`,
    async assess(wav, referenceText, { signal }) {
      const config = {
        ReferenceText: referenceText,
        GradingSystem: 'HundredMark',
        Granularity: 'Word',
        Dimension: 'Comprehensive',
        EnableMiscue: true,
        EnableProsodyAssessment: true,
      };
      const res = await fetchImpl(
        `https://${cfg.region}.stt.speech.microsoft.com/speech/recognition/conversation/cognitiveservices/v1?language=en-US&format=detailed`,
        {
          method: 'POST',
          headers: {
            'Ocp-Apim-Subscription-Key': cfg.key,
            'Content-Type': 'audio/wav; codecs=audio/pcm; samplerate=16000',
            'Pronunciation-Assessment': Buffer.from(JSON.stringify(config), 'utf8').toString('base64'),
            Accept: 'application/json',
          },
          body: wav as Uint8Array<ArrayBuffer>,
          signal,
        },
      );
      if (!res.ok) throw httpProviderError('Azure AI Speech', res, await readErrorBody(res));
      return mapAzureResponse((await res.json()) as AzureResponse, referenceText);
    },
  };
}
