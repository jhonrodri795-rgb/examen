/**
 * Cliente de la API local. El navegador nunca contacta directamente con
 * proveedores externos ni conoce sus claves: todo pasa por el servidor.
 * En la versión publicada (sin servidor) la evaluación usa Claude a través
 * del visor de claude.ai (ver claude-sample.ts).
 */
import type {
  ApiError, PronunciationAssessment, ServerCapabilities, SpeakingEvaluation, Transcript, WritingEvaluation,
} from '@shared/speaking-types';
import type { SpeakingEvalInput, WritingEvalInput } from '@shared/evaluation';
import { STATIC_BUILD, hostCapability } from './runtime';

export class ApiRequestError extends Error {
  constructor(
    public readonly status: number,
    public readonly code: string,
    message: string,
    public readonly retryAfterSec?: number,
  ) {
    super(message);
    this.name = 'ApiRequestError';
  }
}

const CONSENT_HEADER = { 'x-external-processing-consent': 'granted' };

async function request<T>(path: string, init: RequestInit, timeoutMs = 90_000, cancel?: AbortSignal): Promise<T> {
  let res: Response;
  try {
    const timeout = AbortSignal.timeout(timeoutMs);
    res = await fetch(path, { ...init, signal: cancel ? AbortSignal.any([timeout, cancel]) : timeout });
  } catch (e) {
    const name = (e as Error).name;
    if (cancel?.aborted) throw new ApiRequestError(0, 'cancelled', 'Evaluación cancelada.');
    if (name === 'TimeoutError') throw new ApiRequestError(0, 'timeout', 'La solicitud tardó demasiado. Comprueba tu conexión e inténtalo de nuevo.');
    throw new ApiRequestError(0, 'network', 'No se pudo conectar con el servidor local. ¿Está en marcha "npm run dev" o "npm start"?');
  }
  const text = await res.text();
  let body: unknown = null;
  try {
    body = text ? JSON.parse(text) : null;
  } catch {
    /* respuesta no JSON */
  }
  if (!res.ok) {
    const err = (body as ApiError | null)?.error;
    throw new ApiRequestError(res.status, err?.code ?? 'http_error', err?.message ?? `Error del servidor (${res.status}).`, err?.retryAfterSec);
  }
  return body as T;
}

export async function getCapabilities(): Promise<ServerCapabilities | null> {
  // La versión estática no tiene servidor: análisis local + Claude vía claude.ai si está disponible.
  if (STATIC_BUILD) return staticCapabilities();
  try {
    return await request<ServerCapabilities>('/api/capabilities', { method: 'GET' }, 5000);
  } catch {
    return null;
  }
}

/** Capacidades de la versión publicada: sin servidor; evaluación con Claude si el visor la ofrece. */
async function staticCapabilities(): Promise<ServerCapabilities> {
  const { sampleEvaluatorInfo } = await import('./claude-sample');
  return {
    version: 'static',
    stt: {
      configured: false,
      provider: null,
      model: null,
      dataPolicy: 'Sin transcripción automática en la versión publicada (el visor no permite el micrófono): escribe o dicta tu respuesta con el dictado de tu teclado o sistema.',
    },
    pronunciation: { configured: false, provider: null, model: null, dataPolicy: 'No disponible en la versión publicada: la pronunciación no se puntúa.' },
    evaluator: await sampleEvaluatorInfo(),
    limits: { maxAudioBytes: 25 * 1024 * 1024, maxAudioSec: 300, minAudioSec: 0.8, maxTextChars: 8000, acceptedAudioTypes: ['audio/*'] },
    storage: 'Versión publicada: respuestas, audios subidos e informes se guardan solo en este navegador (IndexedDB). No hay servidor que guarde copias.',
  };
}

export function transcribe(audio: Blob, mimeType: string, durationMs: number): Promise<Transcript> {
  return request<Transcript>(`/api/speaking/transcribe?durationMs=${Math.round(durationMs)}`, {
    method: 'POST',
    headers: { 'content-type': mimeType, ...CONSENT_HEADER },
    body: audio,
  });
}

/** Sin frase de referencia, la evaluación es sin guion (respuestas libres). */
export function assessPronunciation(wav: ArrayBuffer, referenceText = ''): Promise<PronunciationAssessment> {
  const q = referenceText.trim() ? `?referenceText=${encodeURIComponent(referenceText)}` : '';
  return request<PronunciationAssessment>(`/api/speaking/pronunciation${q}`, {
    method: 'POST',
    headers: { 'content-type': 'audio/wav', ...CONSENT_HEADER },
    body: wav,
  });
}

export type SpeakingEvalRequest = SpeakingEvalInput;

export interface EvalOptions {
  signal?: AbortSignal;
  /** Claude empezó a redactar (solo versión publicada). */
  onWriting?: () => void;
}

export async function evaluateSpeaking(body: SpeakingEvalRequest, opts: EvalOptions = {}): Promise<SpeakingEvaluation> {
  if (STATIC_BUILD) return (await import('./claude-sample')).sampleEvaluateSpeaking(body, opts);
  return request<SpeakingEvaluation>('/api/speaking/evaluate', {
    method: 'POST',
    headers: { 'content-type': 'application/json', ...CONSENT_HEADER },
    body: JSON.stringify(body),
  }, 180_000, opts.signal);
}

export type WritingEvalRequest = WritingEvalInput;

export async function evaluateWriting(body: WritingEvalRequest, opts: EvalOptions = {}): Promise<WritingEvaluation> {
  if (STATIC_BUILD) return (await import('./claude-sample')).sampleEvaluateWriting(body, opts);
  return request<WritingEvaluation>('/api/writing/evaluate', {
    method: 'POST',
    headers: { 'content-type': 'application/json', ...CONSENT_HEADER },
    body: JSON.stringify(body),
  }, 180_000, opts.signal);
}

interface DownloadsCapability {
  save(req: { filename: string; data: Blob }): Promise<{ status: string }>;
}

/** Ofrece un archivo al usuario. Dentro del visor de claude.ai usa su capacidad de descargas. */
export function downloadBlob(blob: Blob, filename: string): void {
  if (STATIC_BUILD) {
    void hostCapability<DownloadsCapability>('downloads').then((d) => {
      if (d) {
        d.save({ filename, data: blob }).catch(() => undefined);
        return;
      }
      anchorDownload(blob, filename);
    });
    return;
  }
  anchorDownload(blob, filename);
}

function anchorDownload(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}

export function downloadText(text: string, filename: string, type = 'text/plain'): void {
  downloadBlob(new Blob([text], { type: `${type};charset=utf-8` }), filename);
}
