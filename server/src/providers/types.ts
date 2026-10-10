import type { PronunciationAssessment, SpeakingEvaluation, Transcript, WritingEvaluation } from '../../../shared/speaking-types.ts';
import type { SpeakingEvalInput, WritingEvalInput } from '../../../shared/evaluation.ts';

export type { SpeakingEvalInput, WritingEvalInput };

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
  /** `pronunciation: false` evita la evaluación agrupada (p. ej. Listen and Repeat, que se evalúa con guion aparte). */
  transcribe(audio: Uint8Array, mime: string, opts: { signal: AbortSignal; pronunciation?: boolean }): Promise<Transcript>;
}

export interface PronunciationProvider {
  name: string;
  dataPolicy: string;
  assess(wav: Uint8Array, referenceText: string, opts: { signal: AbortSignal }): Promise<PronunciationAssessment>;
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
