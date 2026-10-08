import type { PronunciationAssessment, SpeakingEvaluation, Transcript, WritingEvaluation } from '../../../shared/speaking-types.ts';

export class ProviderError extends Error {
  constructor(
    public readonly status: number,
    public readonly code: string,
    message: string,
    public readonly retryAfterSec?: number,
  ) {
    super(message);
    this.name = 'ProviderError';
  }
}

export interface SttProvider {
  name: string;
  model: string;
  dataPolicy: string;
  transcribe(audio: Uint8Array, mime: string, opts: { signal: AbortSignal }): Promise<Transcript>;
}

export interface PronunciationProvider {
  name: string;
  dataPolicy: string;
  assess(wav: Uint8Array, referenceText: string, opts: { signal: AbortSignal }): Promise<PronunciationAssessment>;
}

export interface SpeakingEvalInput {
  task: { type: 'listen-repeat' | 'interview' | 'independent-speaking'; prompt: string; referenceText?: string; responseSec: number };
  transcript: { text: string; provider: string; lowConfidenceWords: string[] };
  durationSec: number;
  acoustic: Record<string, unknown> | null;
  transcriptMetrics: Record<string, unknown> | null;
  pronunciation: Record<string, unknown> | null;
}

export interface WritingEvalInput {
  task: { type: 'email' | 'academic-discussion'; prompt: string; details: string[]; recommendedWords: [number, number] };
  text: string;
}

export interface Evaluator {
  name: string;
  model: string;
  dataPolicy: string;
  evaluateSpeaking(input: SpeakingEvalInput, opts: { signal: AbortSignal }): Promise<SpeakingEvaluation>;
  evaluateWriting(input: WritingEvalInput, opts: { signal: AbortSignal }): Promise<WritingEvaluation>;
}

export async function readErrorBody(res: Response): Promise<string> {
  try {
    const t = await res.text();
    return t.slice(0, 300);
  } catch {
    return '';
  }
}

/** Traduce respuestas HTTP de proveedores a errores comprensibles (sin filtrar detalles sensibles). */
export function httpProviderError(provider: string, res: Response, detail: string): ProviderError {
  const retry = Number(res.headers.get('retry-after')) || undefined;
  if (res.status === 401 || res.status === 403) return new ProviderError(502, 'provider_auth', `${provider}: credenciales rechazadas. Revisa la clave configurada en el servidor.`);
  if (res.status === 429) return new ProviderError(429, 'provider_rate_limited', `${provider}: límite de uso alcanzado. Inténtalo más tarde.`, retry);
  if (res.status === 413) return new ProviderError(413, 'provider_too_large', `${provider}: el audio es demasiado grande para el proveedor.`);
  if (res.status >= 400 && res.status < 500) return new ProviderError(422, 'provider_rejected', `${provider} rechazó la solicitud (${res.status}). ${detail ? 'Detalle: ' + detail.replace(/\s+/g, ' ').slice(0, 160) : ''}`.trim());
  return new ProviderError(502, 'provider_unavailable', `${provider} no está disponible en este momento (${res.status}).`);
}
