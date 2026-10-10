/**
 * Evaluador con Claude (Anthropic) mediante el SDK oficial y salidas
 * estructuradas validadas con Zod. Se ejecuta exclusivamente en el servidor.
 */
import Anthropic from '@anthropic-ai/sdk';
import { betaZodOutputFormat } from '@anthropic-ai/sdk/helpers/beta/zod';
import { z } from 'zod';
import {
  SPEAKING_SYSTEM, SpeakingSchema, WRITING_SYSTEM, WritingSchema, postProcessSpeaking, postProcessWriting, quoteIsVerbatim, speakingUserMessage, writingUserMessage,
} from '../../../shared/evaluation.ts';
import { ProviderError, type Evaluator } from './types.ts';
import type { EffortLevel } from '../config.ts';

function mapSdkError(err: unknown): never {
  if (err instanceof ProviderError) throw err;
  if (err instanceof Anthropic.RateLimitError) throw new ProviderError(429, 'provider_rate_limited', 'El servicio de evaluación ha alcanzado su límite de uso. Inténtalo más tarde.');
  if (err instanceof Anthropic.AuthenticationError || err instanceof Anthropic.PermissionDeniedError) throw new ProviderError(502, 'provider_auth', 'Las credenciales del servicio de evaluación no son válidas. Revisa la configuración del servidor.');
  if (err instanceof Anthropic.APIConnectionTimeoutError) throw new ProviderError(504, 'provider_timeout', 'El servicio de evaluación tardó demasiado en responder.');
  if (err instanceof Anthropic.BadRequestError) throw new ProviderError(422, 'provider_rejected', 'El servicio de evaluación rechazó la solicitud.');
  if (err instanceof Anthropic.APIConnectionError) throw new ProviderError(502, 'provider_unreachable', 'No se pudo conectar con el servicio de evaluación.');
  if (err instanceof Anthropic.APIError) throw new ProviderError(502, 'provider_unavailable', `El servicio de evaluación devolvió un error (${err.status ?? 'desconocido'}).`);
  if ((err as Error)?.name === 'AbortError') throw new ProviderError(504, 'provider_timeout', 'La evaluación superó el tiempo máximo.');
  throw new ProviderError(502, 'provider_error', 'Error inesperado del servicio de evaluación.');
}

export function createAnthropicEvaluator(cfg: { model: string; effort: EffortLevel; apiKey: string | null; timeoutMs: number }, client?: Anthropic): Evaluator {
  const anthropic = client ?? new Anthropic({ ...(cfg.apiKey ? { apiKey: cfg.apiKey } : {}), timeout: cfg.timeoutMs, maxRetries: 2 });

  async function run<T extends z.ZodType>(system: string, user: string, schema: T, signal: AbortSignal): Promise<z.infer<T>> {
    try {
      const response = await anthropic.beta.messages.parse(
        {
          model: cfg.model,
          max_tokens: 16000,
          betas: ['server-side-fallback-2026-07-01'],
          fallbacks: 'default',
          system,
          output_config: { effort: cfg.effort, format: betaZodOutputFormat(schema) },
          messages: [{ role: 'user', content: user }],
        },
        { signal },
      );
      if (response.stop_reason === 'refusal') throw new ProviderError(422, 'refused', 'El servicio de evaluación no pudo evaluar esta respuesta.');
      if (response.stop_reason === 'max_tokens') throw new ProviderError(502, 'truncated', 'La evaluación quedó incompleta (límite de longitud).');
      if (!response.parsed_output) throw new ProviderError(502, 'provider_bad_response', 'La evaluación no tiene el formato esperado.');
      return response.parsed_output as z.infer<T>;
    } catch (e) {
      mapSdkError(e);
    }
  }

  return {
    name: 'anthropic',
    model: cfg.model,
    dataPolicy: `La transcripción (texto), las métricas calculadas y el enunciado se envían a la API de Anthropic (modelo ${cfg.model}). El audio no se envía al evaluador. El servidor local no almacena estos datos.`,
    async evaluateSpeaking(input, { signal }) {
      const raw = await run(SPEAKING_SYSTEM, speakingUserMessage(input), SpeakingSchema, signal);
      return postProcessSpeaking(raw, input, { provider: 'anthropic', model: cfg.model });
    },
    async evaluateWriting(input, { signal }) {
      const raw = await run(WRITING_SYSTEM, writingUserMessage(input), WritingSchema, signal);
      return postProcessWriting(raw, input, { provider: 'anthropic', model: cfg.model });
    },
  };
}

export { SpeakingSchema, WritingSchema, postProcessSpeaking, postProcessWriting, quoteIsVerbatim };
