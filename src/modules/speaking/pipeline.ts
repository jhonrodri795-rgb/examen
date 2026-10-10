/**
 * Orquesta el análisis de una grabación:
 *   1. Análisis acústico local (siempre, sin red).
 *   2. Transcripción (solo si hay proveedor configurado y consentimiento).
 *   3. Métricas de transcripción y alineación (Listen and Repeat).
 *   4. Evaluación fonética (opcional, Listen and Repeat).
 *   5. Evaluación con IA (si está configurada) o heurística transparente.
 * Cada paso registra su error sin invalidar los anteriores (informe parcial).
 */
import type { ServerCapabilities } from '@shared/speaking-types';
import { newId } from '@/lib/random';
import { STATIC_BUILD } from '@/lib/runtime';
import { ApiRequestError, assessPronunciation, evaluateSpeaking, transcribe } from '@/lib/api';
import type { SpeakingReportRecord, RecordingRecord } from '../storage/db';
import { saveSpeakingReport, updateRecordingMeta } from '../storage/repositories';
import { analyzeSamples, decodeToMono, toWav16kMono } from './acoustic';
import { heuristicEvaluation } from './heuristic-eval';
import { alignWords, computeTranscriptMetrics } from './transcript-analysis';
import { hasAudio, isMemoryOnly, selfTranscriptOf } from './recordings';

export type PipelineStep = 'acoustic' | 'transcribe' | 'pronunciation' | 'evaluate' | 'done';

export interface PipelineContext {
  caps: ServerCapabilities | null;
  consent: (services: ('stt' | 'pronunciation' | 'evaluator')[]) => Promise<boolean>;
  task: { type: 'listen-repeat' | 'interview' | 'independent-speaking'; prompt: string; referenceText?: string; responseSec: number };
  onStep?: (step: PipelineStep) => void;
  persist: boolean;
  /** Reutilizar un informe existente (p. ej. reevaluar tras editar). */
  existing?: SpeakingReportRecord;
  /** El evaluador dejó de estar disponible en esta vista (p. ej. permiso denegado). */
  onPermanentFailure?: () => void;
}

const msg = (e: unknown) => (e instanceof ApiRequestError ? e.message : (e as Error)?.message ?? String(e));

export async function runPipeline(rec: RecordingRecord, ctx: PipelineContext): Promise<SpeakingReportRecord> {
  const now = Date.now();
  const report: SpeakingReportRecord = ctx.existing
    ? { ...ctx.existing, updatedAt: now }
    : {
        id: newId('rep'),
        recordingId: rec.id,
        itemId: rec.itemId,
        setId: rec.setId,
        task: rec.task,
        attemptId: rec.attemptId,
        createdAt: now,
        updatedAt: now,
        transcript: null,
        editedTranscript: null,
        pronunciation: null,
        acoustic: null,
        transcriptMetrics: null,
        repeatAccuracy: null,
        evaluation: null,
        selfAssessment: null,
      };

  const audio = hasAudio(rec);
  const selfTranscript = selfTranscriptOf(rec);

  // 1. Acústica local (solo si hay audio)
  ctx.onStep?.('acoustic');
  if (!report.acoustic && audio) {
    try {
      const { samples, sampleRate } = await decodeToMono(rec.data);
      report.acoustic = analyzeSamples(samples, sampleRate);
      if (!isMemoryOnly(rec.id)) await updateRecordingMeta(rec.id, { acoustic: report.acoustic }).catch(() => undefined);
    } catch (e) {
      report.evaluationError = `No se pudo analizar el audio: ${msg(e)}`;
    }
  }

  const wantStt = !!ctx.caps?.stt.configured && audio && !selfTranscript;
  const wantPron = audio && ctx.task.type === 'listen-repeat' && !!ctx.caps?.pronunciation.configured && !!ctx.task.referenceText;
  const wantEval = !!ctx.caps?.evaluator.configured;
  const services = [wantStt && 'stt', wantPron && 'pronunciation', wantEval && 'evaluator'].filter(Boolean) as ('stt' | 'pronunciation' | 'evaluator')[];
  const consented = services.length ? await ctx.consent(services) : false;

  // 2. Transcripción (o la respuesta escrita/dictada por el estudiante)
  if (selfTranscript) {
    report.transcript = selfTranscript;
    report.transcriptError = undefined;
  } else if (!audio) {
    report.transcriptError = 'No hay audio ni texto de la respuesta.';
  } else if (wantStt && consented && !report.transcript) {
    ctx.onStep?.('transcribe');
    try {
      report.transcript = await transcribe(new Blob([rec.data], { type: rec.mimeType }), rec.mimeType, rec.durationMs);
      report.transcriptError = undefined;
    } catch (e) {
      report.transcriptError = msg(e);
    }
  } else if (!wantStt) {
    report.transcriptError = STATIC_BUILD
      ? 'Sin transcripción: en la versión publicada no hay reconocimiento de voz. Escribe o dicta tu respuesta para que se evalúe el contenido.'
      : 'Transcripción no configurada en el servidor (modo sin servicios externos).';
  } else if (!consented) {
    report.transcriptError = 'No se envió el audio: no se otorgó el consentimiento para servicios externos.';
  }

  // 3. Métricas de transcripción + alineación
  if (report.transcript) {
    report.transcriptMetrics = computeTranscriptMetrics(report.transcript, report.acoustic);
    if (ctx.task.type === 'listen-repeat' && ctx.task.referenceText) {
      const al = alignWords(ctx.task.referenceText, report.transcript.text);
      report.repeatAccuracy = { accuracy: al.accuracy, matched: al.matched, total: al.total, ops: al.ops };
    }
  }

  // 4. Pronunciación (solo con texto de referencia)
  if (wantPron && consented && !report.pronunciation) {
    ctx.onStep?.('pronunciation');
    try {
      const wav = await toWav16kMono(rec.data);
      report.pronunciation = await assessPronunciation(wav, ctx.task.referenceText!);
    } catch (e) {
      report.evaluationError = `Evaluación fonética no disponible: ${msg(e)}`;
    }
  }

  // 5. Evaluación
  ctx.onStep?.('evaluate');
  let aiDone = false;
  // Con solo audio (sin texto) se evalúa la fluidez a partir de las medidas de la señal.
  const audioOnly = !report.transcript && !!report.acoustic && !report.acoustic.quality.mostlySilent;
  if (wantEval && consented && (report.transcript || audioOnly)) {
    try {
      report.evaluation = await evaluateSpeaking({
        task: ctx.task,
        transcript: report.transcript
          ? {
              text: report.transcript.text,
              provider: selfTranscript ? 'self' : `${report.transcript.provider}/${report.transcript.model}`,
              lowConfidenceWords: report.transcriptMetrics?.lowConfidenceWords.map((w) => w.word) ?? [],
              source: selfTranscript ? 'self' : 'asr',
            }
          : { text: '', provider: 'none', lowConfidenceWords: [], source: 'none' },
        durationSec: audio ? Math.max(0.1, rec.durationMs / 1000) : null,
        acoustic: report.acoustic ? { ...report.acoustic, runs: undefined } : null,
        transcriptMetrics: report.transcriptMetrics ? { ...report.transcriptMetrics } : null,
        pronunciation: report.pronunciation ? { ...report.pronunciation } : null,
      });
      aiDone = true;
    } catch (e) {
      report.evaluationError = `La evaluación con IA falló (${msg(e)}). Se muestra una evaluación heurística.`;
      if ((e as { permanent?: boolean }).permanent) ctx.onPermanentFailure?.();
    }
  }
  if (!aiDone && (report.acoustic || report.transcript)) {
    report.evaluation = heuristicEvaluation({
      task: ctx.task.type,
      prompt: ctx.task.prompt,
      responseSec: ctx.task.responseSec,
      acoustic: report.acoustic,
      transcript: report.transcript,
      metrics: report.transcriptMetrics,
      alignment: report.repeatAccuracy ?? null,
      pronunciation: report.pronunciation,
    });
  }

  report.updatedAt = Date.now();
  if (ctx.persist && !isMemoryOnly(rec.id)) await saveSpeakingReport(report).catch(() => undefined);
  ctx.onStep?.('done');
  return report;
}
