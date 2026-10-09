/**
 * Cliente de la API local. El navegador nunca contacta directamente con
 * proveedores externos ni conoce sus claves: todo pasa por el servidor.
 */
import type {
  ApiError, PronunciationAssessment, ServerCapabilities, SpeakingEvaluation, Transcript, WritingEvaluation,
} from '@shared/speaking-types';
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

async function request<T>(path: string, init: RequestInit, timeoutMs = 90_000): Promise<T> {
  let res: Response;
  try {
    res = await fetch(path, { ...init, signal: AbortSignal.timeout(timeoutMs) });
  } catch (e) {
    const name = (e as Error).name;
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
  // La versión estática no tiene servidor: funciona solo con análisis local.
  if (STATIC_BUILD) return null;
  try {
    return await request<ServerCapabilities>('/api/capabilities', { method: 'GET' }, 5000);
  } catch {
    return null;
  }
}

export function transcribe(audio: Blob, mimeType: string, durationMs: number): Promise<Transcript> {
  return request<Transcript>(`/api/speaking/transcribe?durationMs=${Math.round(durationMs)}`, {
    method: 'POST',
    headers: { 'content-type': mimeType, ...CONSENT_HEADER },
    body: audio,
  });
}

export function assessPronunciation(wav: ArrayBuffer, referenceText: string): Promise<PronunciationAssessment> {
  return request<PronunciationAssessment>(`/api/speaking/pronunciation?referenceText=${encodeURIComponent(referenceText)}`, {
    method: 'POST',
    headers: { 'content-type': 'audio/wav', ...CONSENT_HEADER },
    body: wav,
  });
}

export interface SpeakingEvalRequest {
  task: { type: 'listen-repeat' | 'interview' | 'independent-speaking'; prompt: string; referenceText?: string; responseSec: number };
  transcript: { text: string; provider: string; lowConfidenceWords: string[] };
  durationSec: number;
  acoustic: Record<string, unknown> | null;
  transcriptMetrics: Record<string, unknown> | null;
  pronunciation: Record<string, unknown> | null;
}

export function evaluateSpeaking(body: SpeakingEvalRequest): Promise<SpeakingEvaluation> {
  return request<SpeakingEvaluation>('/api/speaking/evaluate', {
    method: 'POST',
    headers: { 'content-type': 'application/json', ...CONSENT_HEADER },
    body: JSON.stringify(body),
  }, 180_000);
}

export interface WritingEvalRequest {
  task: { type: 'email' | 'academic-discussion'; prompt: string; details: string[]; recommendedWords: [number, number] };
  text: string;
}

export function evaluateWriting(body: WritingEvalRequest): Promise<WritingEvaluation> {
  return request<WritingEvaluation>('/api/writing/evaluate', {
    method: 'POST',
    headers: { 'content-type': 'application/json', ...CONSENT_HEADER },
    body: JSON.stringify(body),
  }, 180_000);
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
