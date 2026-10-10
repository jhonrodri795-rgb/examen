/**
 * Evaluación con Claude en la versión publicada en claude.ai, mediante la
 * capacidad `sample` del visor: la página pide la evaluación a Claude con la
 * cuenta (y el uso) de quien la abre. No hay claves en el navegador: el visor
 * gestiona el acceso y pide permiso la primera vez.
 *
 * Solo se envía texto (enunciado, respuesta escrita o transcripción y
 * métricas calculadas). El audio nunca se envía: `sample` no lo acepta.
 * La salida se valida con los mismos esquemas y comprobaciones de honestidad
 * que usa el servidor (citas literales, criterios no evaluables, etc.).
 */
import { z } from 'zod';
import {
  SPEAKING_SYSTEM, SpeakingSchema, WRITING_SYSTEM, WritingSchema, postProcessSpeaking, postProcessWriting, speakingUserMessage, writingUserMessage,
  type SpeakingEvalInput, type WritingEvalInput,
} from '@shared/evaluation';
import type { ProviderInfo, SpeakingEvaluation, WritingEvaluation } from '@shared/speaking-types';
import { hostCapability } from './runtime';

type ModelTier = 'default' | 'complex' | 'quick';

interface SampleResult {
  text: string;
  truncated: boolean;
  modelTierApplied?: ModelTier;
}

interface SampleOptions {
  signal?: AbortSignal;
  modelTier?: ModelTier;
  onText?: (u: { text: string; delta: string }) => void;
}

export type SampleFn = (input: string, options?: SampleOptions) => Promise<SampleResult>;

interface SampleError {
  code: string;
  message: string;
  text?: string;
}

/** Error de evaluación con un mensaje apto para el usuario. */
export class SampleEvalError extends Error {
  constructor(
    public readonly code: string,
    message: string,
    /** Si es definitivo para esta vista (no volver a ofrecer la función). */
    public readonly permanent = false,
  ) {
    super(message);
    this.name = 'SampleEvalError';
  }
}

const PERMANENT = new Set(['not_granted', 'sampling_disabled', 'not_declared', 'capability_disabled', 'capability_removed']);

const MESSAGES: Record<string, string> = {
  not_granted: 'No se permitió que esta página use Claude. Para activarlo, vuelve a abrir la página y acepta el aviso de claude.ai.',
  sampling_disabled: 'Claude no está disponible para esta cuenta u organización.',
  not_declared: 'Esta versión de la página no tiene activada la evaluación con Claude.',
  capability_disabled: 'La evaluación con Claude no está disponible en este visor.',
  capability_removed: 'La evaluación con Claude no está disponible en esta versión de la aplicación de Claude.',
  rate_limited: 'Has alcanzado el límite de uso de Claude por ahora. Inténtalo de nuevo más tarde.',
  session_expired: 'Tu sesión de claude.ai ha caducado. Vuelve a iniciar sesión y reinténtalo.',
  refused: 'Claude no pudo evaluar este contenido. Revisa el texto e inténtalo de nuevo.',
  empty_completion: 'Claude no devolvió ninguna evaluación. Inténtalo de nuevo.',
  prompt_too_large: 'El texto es demasiado largo para evaluarlo.',
  cancelled: 'Evaluación cancelada.',
  bad_format: 'La evaluación no tiene el formato esperado. Inténtalo de nuevo.',
  truncated: 'La evaluación quedó incompleta (límite de longitud). Inténtalo de nuevo.',
};

let samplePromise: Promise<SampleFn | null> | null = null;
let blockedReason: string | null = null;

/** Para pruebas: permite inyectar la función o reiniciar el estado. */
export function __resetSampleForTests(fn?: SampleFn | null): void {
  samplePromise = fn === undefined ? null : Promise.resolve(fn);
  blockedReason = null;
}

export function getSample(): Promise<SampleFn | null> {
  samplePromise ??= hostCapability<SampleFn>('sample');
  return samplePromise;
}

export function sampleBlockedReason(): string | null {
  return blockedReason;
}

const TIER_LABEL: Record<ModelTier, string> = {
  default: 'modelo equilibrado',
  complex: 'modelo más capaz',
  quick: 'modelo rápido',
};

export const SAMPLE_DATA_POLICY =
  'Se envía a Claude, a través de tu propia cuenta de claude.ai (consume tu uso), solo texto: el enunciado, tu respuesta escrita o la transcripción que escribas o dictes, y las métricas calculadas en tu navegador. El audio nunca se envía. claude.ai te pedirá permiso la primera vez.';

/** Estado del evaluador para mostrarlo en la interfaz. */
export async function sampleEvaluatorInfo(): Promise<ProviderInfo> {
  const fn = await getSample();
  if (fn && !blockedReason) return { configured: true, provider: 'claude.ai', model: 'Claude (tu cuenta)', dataPolicy: SAMPLE_DATA_POLICY };
  return {
    configured: false,
    provider: null,
    model: null,
    dataPolicy: blockedReason ?? 'La evaluación con Claude solo funciona al abrir esta página dentro de claude.ai. Fuera de ella se usa el análisis local.',
  };
}

/** Extrae un valor JSON de la respuesta (texto completo, bloque ``` o del primer { al último }). */
export function extractJson(text: string): unknown {
  const t = text.trim();
  const attempts: string[] = [t];
  const fence = /```(?:json)?\s*([\s\S]*?)```/i.exec(t);
  if (fence) attempts.push(fence[1]!.trim());
  const s = t.indexOf('{');
  const e = t.lastIndexOf('}');
  if (s >= 0 && e > s) attempts.push(t.slice(s, e + 1));
  for (const a of attempts) {
    try {
      return JSON.parse(a);
    } catch {
      /* siguiente intento */
    }
  }
  throw new SampleEvalError('bad_format', MESSAGES.bad_format!);
}

function buildPrompt(system: string, data: string, schema: z.ZodType): string {
  return [
    system,
    '',
    'DATA TO EVALUATE:',
    data,
    '',
    'Reply with ONLY one JSON object (no Markdown fences, no text before or after it) that validates against this JSON Schema:',
    JSON.stringify(z.toJSONSchema(schema)),
  ].join('\n');
}

export interface SampleCallOptions {
  signal?: AbortSignal;
  /** Se llama cuando Claude empieza a escribir (tras pensar). */
  onWriting?: () => void;
}

async function ask<T extends z.ZodType>(system: string, data: string, schema: T, opts: SampleCallOptions): Promise<{ value: z.infer<T>; model: string }> {
  if (blockedReason) throw new SampleEvalError('blocked', blockedReason, true);
  const fn = await getSample();
  if (!fn) throw new SampleEvalError('unavailable', 'La evaluación con Claude solo funciona al abrir esta página dentro de claude.ai.', true);
  let result: SampleResult;
  let writing = false;
  try {
    result = await fn(buildPrompt(system, data, schema), {
      modelTier: 'default',
      signal: opts.signal,
      onText: () => {
        if (!writing) {
          writing = true;
          opts.onWriting?.();
        }
      },
    });
  } catch (e) {
    const err = e as SampleError | undefined;
    const code = typeof err?.code === 'string' ? err.code : 'upstream_error';
    const message = MESSAGES[code] ?? 'Error temporal del servicio de Claude. Inténtalo de nuevo.';
    if (PERMANENT.has(code)) blockedReason = message;
    throw new SampleEvalError(code, message, PERMANENT.has(code));
  }
  if (result.truncated) throw new SampleEvalError('truncated', MESSAGES.truncated!);
  const parsed = schema.safeParse(extractJson(result.text));
  if (!parsed.success) throw new SampleEvalError('bad_format', MESSAGES.bad_format!);
  const tier = result.modelTierApplied;
  return { value: parsed.data, model: tier && TIER_LABEL[tier] ? `Claude · ${TIER_LABEL[tier]}` : 'Claude' };
}

const wordCount = (t: string) => t.trim().split(/\s+/).filter(Boolean).length;

export async function sampleEvaluateWriting(input: WritingEvalInput, opts: SampleCallOptions = {}): Promise<WritingEvaluation> {
  if (wordCount(input.text) < 20) throw new SampleEvalError('text_too_short', 'El texto es demasiado breve para evaluarlo (mínimo 20 palabras).');
  if (input.text.length > 8000) throw new SampleEvalError('text_too_long', 'El texto supera 8000 caracteres.');
  const { value, model } = await ask(WRITING_SYSTEM, writingUserMessage(input), WritingSchema, opts);
  return postProcessWriting(value, input, { provider: 'claude.ai', model });
}

export async function sampleEvaluateSpeaking(input: SpeakingEvalInput, opts: SampleCallOptions = {}): Promise<SpeakingEvaluation> {
  if (wordCount(input.transcript.text) < 3) throw new SampleEvalError('transcript_too_short', 'La respuesta es demasiado breve para evaluarla.');
  if (input.transcript.text.length > 8000) throw new SampleEvalError('text_too_long', 'La respuesta supera 8000 caracteres.');
  const { value, model } = await ask(SPEAKING_SYSTEM, speakingUserMessage(input), SpeakingSchema, opts);
  return postProcessSpeaking(value, input, { provider: 'claude.ai', model });
}
