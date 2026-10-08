import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Activity, AlertTriangle, Bot, Calculator, Download, FileJson, Loader2, Pencil, RotateCcw, Trash2, Wand2 } from 'lucide-react';
import type { Criterion, SpeakingEvaluation } from '@shared/speaking-types';
import { useCapabilities, useConsent, useSettings, useToast } from '@/app/context';
import { Alert, Badge, Button, Card, CardHeader, ConfirmDialog } from '@/components/ui';
import { downloadBlob, downloadText } from '@/lib/api';
import { cn, formatClock, formatDate } from '@/lib/format';
import type { RubricRating } from '@/modules/exam-engine/types';
import type { RecordingRecord, SpeakingReportRecord } from '@/modules/storage/db';
import { deleteRecording, getSpeakingReportByRecording, saveSpeakingReport } from '@/modules/storage/repositories';
import { runPipeline, type PipelineStep } from '../pipeline';
import { isMemoryOnly, loadRecording, recordingBlob } from '../recordings';
import { extensionFor } from '../recorder';

export const CRITERION_LABEL: Record<Criterion, string> = {
  delivery: 'Fluidez y claridad (Delivery)',
  languageUse: 'Uso de la lengua (Language use)',
  topicDevelopment: 'Desarrollo del tema (Topic development)',
  taskFulfillment: 'Cumplimiento de la tarea',
};

const STEP_LABEL: Record<PipelineStep, string> = {
  acoustic: 'Analizando la señal de audio…',
  transcribe: 'Transcribiendo…',
  pronunciation: 'Evaluando la pronunciación…',
  evaluate: 'Generando la evaluación…',
  done: 'Listo',
};

export interface SpeakingTaskInfo {
  type: 'listen-repeat' | 'interview' | 'independent-speaking';
  prompt: string;
  referenceText?: string;
  responseSec: number;
}

/** Línea de tiempo de los segmentos de voz detectados. */
function SpeechTimeline({ runs, total, current, onSeek }: { runs: [number, number][]; total: number; current: number; onSeek: (t: number) => void }) {
  if (total <= 0) return null;
  return (
    <div>
      <div
        className="relative h-6 cursor-pointer overflow-hidden rounded-md bg-surface-3"
        role="slider"
        aria-label="Línea de tiempo: segmentos con voz (azul) y pausas (gris)"
        aria-valuemin={0}
        aria-valuemax={Math.round(total)}
        aria-valuenow={Math.round(current)}
        tabIndex={0}
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          onSeek(((e.clientX - rect.left) / rect.width) * total);
        }}
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') onSeek(Math.min(total, current + 1));
          if (e.key === 'ArrowLeft') onSeek(Math.max(0, current - 1));
        }}
      >
        {runs.map(([a, b], i) => (
          <span key={i} className="absolute inset-y-1 rounded-sm" style={{ left: `${(a / total) * 100}%`, width: `${Math.max(0.5, ((b - a) / total) * 100)}%`, background: 'var(--series-1)' }} />
        ))}
        <span className="absolute inset-y-0 w-0.5 bg-ink" style={{ left: `${(current / total) * 100}%` }} aria-hidden />
      </div>
      <div className="mt-1 flex justify-between text-[11px] text-muted">
        <span>0:00</span>
        <span>Voz detectada (azul) · pausas (gris)</span>
        <span>{formatClock(total * 1000)}</span>
      </div>
    </div>
  );
}

function reportToMarkdown(task: SpeakingTaskInfo, r: SpeakingReportRecord): string {
  const ev = r.evaluation;
  const a = r.acoustic;
  const m = r.transcriptMetrics;
  const lines = [
    `# Informe de Speaking`,
    '',
    `Tarea: ${task.type} · ${formatDate(r.createdAt)}`,
    '',
    `> Evaluación orientativa. No es una puntuación oficial de ETS.`,
    '',
    `## Consigna`,
    task.prompt,
    '',
    '## Transcripción original',
    r.transcript ? `${r.transcript.text}\n\n(Proveedor: ${r.transcript.provider} · ${r.transcript.model})` : `No disponible: ${r.transcriptError ?? '—'}`,
  ];
  if (r.editedTranscript) lines.push('', '## Transcripción corregida por el estudiante', r.editedTranscript);
  if (a) lines.push('', '## Métricas acústicas (análisis local)', `- Duración: ${a.totalDurationSec} s · Habla: ${a.speechDurationSec} s · Proporción de habla: ${Math.round(a.phonationRatio * 100)} %`, `- Pausas: ${a.pauseCount} (largas: ${a.longPauseCount}) · Pausa media: ${a.meanPauseSec} s · Más larga: ${a.longestPauseSec} s`, `- Segmento medio de habla: ${a.meanRunSec} s`);
  if (m) lines.push(`- Palabras: ${m.wordCount} · Ritmo: ${m.wordsPerMinute ?? '—'} ppm · Muletillas: ${m.fillerCount}`);
  if (r.repeatAccuracy) lines.push('', `## Precisión de la repetición: ${Math.round(r.repeatAccuracy.accuracy * 100)} %`);
  if (ev) {
    lines.push('', `## Evaluación (${ev.mode === 'ai' ? `IA: ${ev.provider} · ${ev.model}` : 'heurística local'})`, `Global: ${ev.overall ?? '—'}/4`);
    for (const c of ev.criteria) lines.push(`- **${CRITERION_LABEL[c.criterion]}**: ${c.score ?? 'no evaluable'}${c.score != null ? '/4' : ''} — ${c.rationale}${c.evidence.length ? ` (evidencia: ${c.evidence.map((e) => `«${e.quote}»`).join('; ')})` : ''}`);
    if (ev.strengths.length) lines.push('', '### Aspectos positivos', ...ev.strengths.map((s) => `- ${s}`));
    if (ev.issues.length) lines.push('', '### Fragmentos a revisar', ...ev.issues.map((i) => `- «${i.quote}»: ${i.problem} → ${i.suggestion}`));
    if (ev.improvedResponse) lines.push('', '### Versión mejorada', ev.improvedResponse);
    if (ev.exercises.length) lines.push('', '### Ejercicios', ...ev.exercises.map((s) => `- ${s}`));
    if (ev.pronunciationAdvice.length) lines.push('', '### Pronunciación y fluidez', ...ev.pronunciationAdvice.map((s) => `- ${s}`));
    lines.push('', '### Limitaciones', ...ev.limitations.map((s) => `- ${s}`));
  }
  if (r.selfAssessment) lines.push('', `## Autoevaluación: ${r.selfAssessment.overall5}/5`, r.selfAssessment.note);
  return lines.join('\n');
}

export function SpeakingReportView({
  recordingId,
  task,
  currentRating,
  onRated,
  onPracticeAgain,
  onDeleted,
  autoAnalyze,
}: {
  recordingId: string;
  task: SpeakingTaskInfo;
  currentRating?: RubricRating;
  onRated?: (r: RubricRating) => void;
  onPracticeAgain?: () => void;
  onDeleted?: () => void;
  autoAnalyze?: boolean;
}) {
  const { caps } = useCapabilities();
  const consent = useConsent();
  const { settings } = useSettings();
  const toast = useToast();
  const [rec, setRec] = useState<RecordingRecord | null>(null);
  const [missing, setMissing] = useState(false);
  const [report, setReport] = useState<SpeakingReportRecord | null>(null);
  const [step, setStep] = useState<PipelineStep | null>(null);
  const [url, setUrl] = useState<string | null>(null);
  const [time, setTime] = useState(0);
  const [editing, setEditing] = useState(false);
  const [edited, setEdited] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [self, setSelf] = useState<Record<Criterion, number>>({ delivery: 2, languageUse: 2, topicDevelopment: 2, taskFulfillment: 2 });
  const audio = useRef<HTMLAudioElement>(null);
  const autoRan = useRef(false);

  useEffect(() => {
    let u: string | null = null;
    void loadRecording(recordingId).then(async (r) => {
      if (!r) return setMissing(true);
      setRec(r);
      u = URL.createObjectURL(recordingBlob(r));
      setUrl(u);
      const existing = await getSpeakingReportByRecording(recordingId).catch(() => undefined);
      if (existing) {
        setReport(existing);
        setEdited(existing.editedTranscript ?? existing.transcript?.text ?? '');
      }
    });
    return () => {
      if (u) URL.revokeObjectURL(u);
    };
  }, [recordingId]);

  const analyze = useCallback(
    async (fresh = false) => {
      if (!rec) return;
      setStep('acoustic');
      try {
        const r = await runPipeline(rec, { caps, consent, task, persist: settings.saveRecordings, onStep: setStep, existing: fresh ? undefined : report ?? undefined });
        setReport(r);
        setEdited(r.editedTranscript ?? r.transcript?.text ?? '');
      } catch (e) {
        toast(`Error al analizar: ${(e as Error).message}`, 'bad');
      } finally {
        setStep(null);
      }
    },
    [rec, caps, consent, task, settings.saveRecordings, report, toast],
  );

  useEffect(() => {
    if (autoAnalyze && rec && !report && !autoRan.current) {
      autoRan.current = true;
      void analyze();
    }
  }, [autoAnalyze, rec, report, analyze]);

  const words = report?.transcript?.words ?? [];
  const activeWord = useMemo(() => words.findIndex((w) => time >= w.start && time <= w.end + 0.05), [words, time]);
  const seek = (t: number) => {
    if (!audio.current) return;
    audio.current.currentTime = t;
    void audio.current.play().catch(() => undefined);
  };

  const persist = async (r: SpeakingReportRecord) => {
    setReport(r);
    if (!isMemoryOnly(r.recordingId)) await saveSpeakingReport(r).catch(() => undefined);
  };

  const ev: SpeakingEvaluation | null = report?.evaluation ?? null;
  const a = report?.acoustic;
  const m = report?.transcriptMetrics;
  const selfOverall5 = Math.round(((Object.values(self).reduce((x, y) => x + y, 0) / 4 / 4) * 5) * 2) / 2;

  if (missing) return <Alert tone="warn" title="Grabación no disponible">Se eliminó o se grabó con el guardado local desactivado en una sesión anterior.</Alert>;
  if (!rec) return <p className="text-sm text-muted">Cargando grabación…</p>;

  return (
    <div className="space-y-5">
      <Card>
        <CardHeader
          title="Tu respuesta"
          description={`${formatDate(rec.createdAt)} · ${formatClock(rec.durationMs)} · ${rec.mimeType.split(';')[0]}${isMemoryOnly(rec.id) ? ' · solo en memoria' : ''}`}
          actions={
            <>
              {!report && (
                <Button size="sm" onClick={() => void analyze()} loading={!!step} icon={<Wand2 className="h-4 w-4" />}>
                  Analizar respuesta
                </Button>
              )}
              {report && (
                <Button size="sm" variant="outline" onClick={() => void analyze(true)} loading={!!step} icon={<RotateCcw className="h-4 w-4" />}>
                  Volver a analizar
                </Button>
              )}
            </>
          }
        />
        <div className="space-y-4 p-5">
          {url && <audio ref={audio} controls src={url} className="w-full" onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)} aria-label="Reproducir respuesta" />}
          {step && (
            <p className="flex items-center gap-2 text-sm text-accent" aria-live="polite">
              <Loader2 className="h-4 w-4 animate-spin" /> {STEP_LABEL[step]}
            </p>
          )}
          {a && <SpeechTimeline runs={a.runs} total={a.totalDurationSec} current={time} onSeek={seek} />}
          <p className="text-sm text-ink-2">
            <span className="font-medium text-ink">Consigna: </span>
            {task.prompt}
          </p>
        </div>
      </Card>

      {report && (
        <>
          <div className="grid gap-5 lg:grid-cols-2">
            <Card>
              <CardHeader icon={<Activity className="h-5 w-5" />} title="Métricas acústicas" description="Calculadas en tu navegador a partir de la señal (detección de voz por energía)." />
              <div className="p-5 text-sm">
                {a ? (
                  <>
                    <dl className="grid grid-cols-2 gap-2">
                      {[
                        ['Duración total', `${a.totalDurationSec} s`],
                        ['Tiempo de habla', `${a.speechDurationSec} s (${Math.round(a.phonationRatio * 100)} %)`],
                        ['Pausas (≥0,25 s)', `${a.pauseCount} · ${a.pausesPerMinute}/min`],
                        ['Pausas largas (≥1 s)', `${a.longPauseCount} · máx. ${a.longestPauseSec} s`],
                        ['Segmento medio de habla', `${a.meanRunSec} s`],
                        ['Silencio inicial', `${a.leadingSilenceSec} s`],
                        ...(m ? [['Ritmo', m.wordsPerMinute != null ? `${m.wordsPerMinute} palabras/min` : '—'], ['Muletillas detectadas', `${m.fillerCount}${m.fillers.length ? ` (${m.fillers.map((f) => f.word).join(', ')})` : ''}`]] : []),
                      ].map(([k, v]) => (
                        <div key={k} className="rounded-lg bg-surface-3 p-2">
                          <dt className="text-xs text-muted">{k}</dt>
                          <dd className="font-semibold tabular-nums text-ink">{v}</dd>
                        </div>
                      ))}
                    </dl>
                    {(a.quality.tooQuiet || a.quality.clipping || a.quality.noisy || a.quality.mostlySilent) && (
                      <Alert tone="warn" className="mt-3" title="Calidad de la grabación">
                        {[a.quality.mostlySilent && 'Apenas se detecta voz.', a.quality.tooQuiet && 'Nivel bajo.', a.quality.clipping && 'Saturación.', a.quality.noisy && 'Ruido de fondo elevado.'].filter(Boolean).join(' ')}
                      </Alert>
                    )}
                    <p className="mt-3 text-xs text-muted">
                      Estas métricas describen pausas y continuidad; no miden pronunciación ni inteligibilidad. {m ? '' : 'Sin transcripción no se calculan palabras por minuto ni muletillas.'}
                    </p>
                  </>
                ) : (
                  <p className="text-muted">No se pudo analizar el audio en este navegador.</p>
                )}
              </div>
            </Card>

            <Card>
              <CardHeader
                title="Transcripción"
                description={report.transcript ? `${report.transcript.provider} · ${report.transcript.model}${report.transcript.capabilities.wordConfidence ? ' · con confianza por palabra' : report.transcript.capabilities.segmentConfidence ? ' · confianza por segmento' : ''}` : 'No disponible'}
                actions={
                  report.transcript && (
                    <Button variant="ghost" size="sm" onClick={() => setEditing((v) => !v)} icon={<Pencil className="h-4 w-4" />}>
                      {editing ? 'Cerrar edición' : 'Corregir para estudiar'}
                    </Button>
                  )
                }
              />
              <div className="space-y-3 p-5 text-sm">
                {!report.transcript && <Alert tone="info">{report.transcriptError ?? 'La transcripción no está disponible.'} Las métricas acústicas y la autoevaluación siguen disponibles.</Alert>}
                {report.transcript && (
                  <>
                    <p className="leading-relaxed text-ink" aria-label="Transcripción sincronizada; pulsa una palabra para escucharla">
                      {words.length
                        ? words.map((w, i) => {
                            const low = w.confidence !== undefined && w.confidence < 0.6;
                            return (
                              <button
                                key={i}
                                type="button"
                                onClick={() => seek(w.start)}
                                title={w.confidence !== undefined ? `Confianza ${Math.round(w.confidence * 100)} %` : undefined}
                                className={cn(
                                  'mr-1 rounded px-0.5 hover:bg-surface-3',
                                  i === activeWord && 'bg-accent-soft text-accent',
                                  w.filler && 'italic text-warn',
                                  low && 'underline decoration-bad decoration-wavy underline-offset-4',
                                )}
                              >
                                {w.word}
                              </button>
                            );
                          })
                        : report.transcript.text}
                    </p>
                    <p className="text-xs text-muted">
                      {report.transcript.capabilities.wordConfidence && 'Subrayado ondulado = baja confianza del reconocimiento (puede ser un error del sistema, no tuyo). '}
                      {report.transcript.capabilities.fillerDetection === 'prompted' && 'Este proveedor puede omitir muletillas; su recuento puede ser incompleto. '}
                      {report.transcript.segments.some((s) => s.confidence !== undefined) && `Confianza media aproximada: ${Math.round((report.transcript.segments.reduce((s, x) => s + (x.confidence ?? 0), 0) / report.transcript.segments.length) * 100)} %.`}
                    </p>
                    {editing && (
                      <div className="space-y-2">
                        <label htmlFor="edit-transcript" className="text-xs text-muted">
                          Versión corregida (solo para estudiar; la evaluación usa la transcripción original)
                        </label>
                        <textarea id="edit-transcript" rows={4} value={edited} onChange={(e) => setEdited(e.target.value)} className="w-full rounded-lg border border-line bg-surface p-2 text-ink" />
                        <Button size="sm" onClick={() => void persist({ ...report, editedTranscript: edited, updatedAt: Date.now() }).then(() => { setEditing(false); toast('Corrección guardada. La original se conserva.', 'ok'); })}>
                          Guardar corrección
                        </Button>
                      </div>
                    )}
                    {report.editedTranscript && !editing && (
                      <div className="rounded-lg bg-surface-3 p-2 text-xs">
                        <p className="font-semibold text-ink">Tu versión corregida</p>
                        <p className="text-ink-2">{report.editedTranscript}</p>
                      </div>
                    )}
                  </>
                )}
                {report.repeatAccuracy && (
                  <div className="rounded-lg border border-line p-3">
                    <p className="font-semibold text-ink">Precisión de la repetición: {Math.round(report.repeatAccuracy.accuracy * 100)} %</p>
                    <p className="mt-1 leading-loose">
                      {report.repeatAccuracy.ops.map((o, i) => (
                        <span
                          key={i}
                          className={cn('mr-1 rounded px-1', o.type === 'ok' && 'text-ink', o.type === 'sub' && 'bg-warn-soft text-warn', o.type === 'del' && 'bg-bad-soft text-bad line-through', o.type === 'ins' && 'bg-accent-soft text-accent')}
                          title={o.type === 'sub' ? `Dijiste "${o.hyp}"` : o.type === 'del' ? 'Omitida' : o.type === 'ins' ? 'Añadida' : 'Correcta'}
                        >
                          {o.type === 'ins' ? `+${o.hyp}` : o.ref}
                        </span>
                      ))}
                    </p>
                    <p className="mt-1 text-xs text-muted">Tachado = omitida · ámbar = sustituida · +azul = añadida. Algunas diferencias pueden deberse al reconocimiento automático.</p>
                  </div>
                )}
                {report.pronunciation && (
                  <div className="rounded-lg border border-line p-3">
                    <p className="font-semibold text-ink">Evaluación fonética ({report.pronunciation.provider})</p>
                    <p className="text-xs text-ink-2">
                      Precisión {report.pronunciation.accuracy ?? '—'} · Fluidez {report.pronunciation.fluency ?? '—'} · Completitud {report.pronunciation.completeness ?? '—'} · Prosodia {report.pronunciation.prosody ?? '—'} (0–100)
                    </p>
                  </div>
                )}
              </div>
            </Card>
          </div>

          <Card>
            <CardHeader
              icon={ev?.mode === 'ai' ? <Bot className="h-5 w-5" /> : <Calculator className="h-5 w-5" />}
              title="Evaluación por criterios"
              description={ev ? (ev.mode === 'ai' ? `Evaluación con IA (${ev.provider} · ${ev.model}) basada en la transcripción y las métricas.` : 'Evaluación heurística local basada en reglas transparentes (sin IA).') : 'Sin evaluación.'}
              actions={
                ev && (
                  <>
                    <Badge tone="brand">Global {ev.overall ?? '—'}/4</Badge>
                    {onRated && ev.overall5 != null && (
                      <Button size="sm" variant="outline" onClick={() => onRated({ source: ev.mode === 'ai' ? 'ai' : 'auto', overall: ev.overall5!, criteria: Object.fromEntries(ev.criteria.map((c) => [c.criterion, c.score])), at: Date.now(), reportId: report.id })}>
                        Usar como valoración
                      </Button>
                    )}
                  </>
                )
              }
            />
            <div className="space-y-4 p-5 text-sm">
              {report.evaluationError && <Alert tone="warn">{report.evaluationError}</Alert>}
              {!caps?.evaluator.configured && (
                <Alert tone="info" title="Modo sin IA">
                  No hay evaluador de IA configurado. Se muestra una evaluación heurística; no se inventan puntuaciones de pronunciación. Configura el servidor (README) para activar la evaluación avanzada.
                </Alert>
              )}
              {ev && (
                <>
                  <ul className="grid gap-3 md:grid-cols-2">
                    {ev.criteria.map((c) => (
                      <li key={c.criterion} className={cn('rounded-lg border p-3', c.evaluable ? 'border-line' : 'border-dashed border-line bg-surface-2')}>
                        <p className="flex justify-between gap-2 font-medium text-ink">
                          {CRITERION_LABEL[c.criterion]}
                          <span className="tabular-nums">{c.score != null ? `${c.score}/4` : 'No evaluable'}</span>
                        </p>
                        <p className="mt-1 text-ink-2">{c.rationale}</p>
                        {c.evidence.map((e, i) => (
                          <p key={i} className={cn('mt-1 border-l-2 pl-2 text-xs text-muted', e.source === 'transcript' ? 'border-accent font-mono' : 'border-line')}>
                            {e.source === 'transcript' ? `«${e.quote}»` : `📊 ${e.quote}`}
                          </p>
                        ))}
                      </li>
                    ))}
                  </ul>
                  {ev.strengths.length > 0 && (
                    <div>
                      <p className="font-semibold text-ink">Aspectos positivos</p>
                      <ul className="list-disc pl-5 text-ink-2">{ev.strengths.map((s) => <li key={s}>{s}</li>)}</ul>
                    </div>
                  )}
                  {ev.issues.length > 0 && (
                    <div>
                      <p className="font-semibold text-ink">Fragmentos a revisar</p>
                      <ul className="space-y-1.5">
                        {ev.issues.map((i, k) => (
                          <li key={k} className="rounded-lg bg-surface-3 p-2">
                            <Badge tone={i.kind === 'recognition' ? 'neutral' : 'warn'}>{i.kind === 'recognition' ? 'posible error de reconocimiento' : i.kind}</Badge>{' '}
                            <span className="font-mono text-xs">«{i.quote}»</span> — {i.problem} <span className="text-ok">→ {i.suggestion}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {ev.improvedResponse && (
                    <details className="rounded-lg border border-line p-3">
                      <summary className="cursor-pointer font-medium text-ink">Versión mejorada de tu respuesta</summary>
                      <p className="mt-2 font-serif text-ink">{ev.improvedResponse}</p>
                    </details>
                  )}
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <p className="font-semibold text-ink">Ejercicios para la próxima práctica</p>
                      <ul className="list-disc pl-5 text-ink-2">{ev.exercises.map((s) => <li key={s}>{s}</li>)}</ul>
                    </div>
                    <div>
                      <p className="font-semibold text-ink">Pronunciación y fluidez</p>
                      <ul className="list-disc pl-5 text-ink-2">{ev.pronunciationAdvice.map((s) => <li key={s}>{s}</li>)}</ul>
                    </div>
                  </div>
                  <Alert tone="info" title="Limitaciones">
                    <ul className="list-disc pl-4">{ev.limitations.map((l) => <li key={l}>{l}</li>)}</ul>
                  </Alert>
                </>
              )}
            </div>
          </Card>
        </>
      )}

      {onRated && (
        <Card>
          <CardHeader title="Autoevaluación (0–4 por criterio)" description="Escucha tu grabación y valora cada criterio. Se convierte a la escala 0–5 para la banda estimada." actions={currentRating && <Badge tone="ok">Valoración actual: {currentRating.overall}/5</Badge>} />
          <div className="space-y-3 p-5 text-sm">
            {(Object.keys(CRITERION_LABEL) as Criterion[]).filter((c) => task.type !== 'listen-repeat' || c === 'delivery' || c === 'taskFulfillment').map((c) => (
              <div key={c} className="grid items-center gap-2 sm:grid-cols-[16rem_1fr_2rem]">
                <label htmlFor={`sp-self-${recordingId}-${c}`} className="text-ink">{CRITERION_LABEL[c]}</label>
                <input id={`sp-self-${recordingId}-${c}`} type="range" min={0} max={4} step={0.5} value={self[c]} onChange={(e) => setSelf((s) => ({ ...s, [c]: Number(e.target.value) }))} className="accent-sky-600" />
                <span className="text-right font-semibold tabular-nums">{self[c]}</span>
              </div>
            ))}
            <p className="text-xs text-muted">Guía: 4 = claro, fluido y completo; 3 = adecuado con fallos menores; 2 = limitado; 1 = muy limitado; 0 = sin respuesta o fuera de tema.</p>
            <Button
              onClick={() => {
                const crit = task.type === 'listen-repeat' ? { delivery: self.delivery, taskFulfillment: self.taskFulfillment } : self;
                const vals = Object.values(crit);
                const overall5 = task.type === 'listen-repeat' ? Math.round(((vals.reduce((x, y) => x + y, 0) / vals.length / 4) * 5) * 2) / 2 : selfOverall5;
                onRated({ source: 'self', overall: overall5, criteria: crit, at: Date.now(), reportId: report?.id });
                if (report) void persist({ ...report, selfAssessment: { scores: crit, overall5, note: '', at: Date.now() } });
              }}
            >
              Guardar autoevaluación
            </Button>
          </div>
        </Card>
      )}

      <div className="flex flex-wrap gap-2">
        <Button variant="outline" size="sm" icon={<Download className="h-4 w-4" />} onClick={() => downloadBlob(recordingBlob(rec), `respuesta-${rec.itemId}.${extensionFor(rec.mimeType)}`)}>
          Descargar audio
        </Button>
        {report && (
          <>
            <Button variant="outline" size="sm" icon={<Download className="h-4 w-4" />} onClick={() => downloadText(reportToMarkdown(task, report), `informe-speaking-${rec.itemId}.md`, 'text/markdown')}>
              Exportar informe (.md)
            </Button>
            <Button variant="outline" size="sm" icon={<FileJson className="h-4 w-4" />} onClick={() => downloadText(JSON.stringify({ task, report }, null, 2), `informe-speaking-${rec.itemId}.json`, 'application/json')}>
              JSON
            </Button>
          </>
        )}
        {onPracticeAgain && (
          <Button variant="secondary" size="sm" icon={<RotateCcw className="h-4 w-4" />} onClick={onPracticeAgain}>
            Practicar de nuevo
          </Button>
        )}
        <Button variant="ghost" size="sm" className="text-bad" icon={<Trash2 className="h-4 w-4" />} onClick={() => setConfirmDelete(true)}>
          Eliminar grabación e informe
        </Button>
      </div>
      <ConfirmDialog
        open={confirmDelete}
        onOpenChange={setConfirmDelete}
        title="¿Eliminar la grabación?"
        tone="danger"
        confirmLabel="Eliminar"
        description="Se borrarán el audio y su informe de este navegador. No se puede deshacer."
        onConfirm={async () => {
          await deleteRecording(rec.id).catch(() => undefined);
          toast('Grabación eliminada.', 'ok');
          onDeleted?.();
        }}
      >
        <p className="flex items-center gap-2 text-xs text-muted">
          <AlertTriangle className="h-4 w-4" /> El servidor no guarda copias: solo existía en este navegador.
        </p>
      </ConfirmDialog>
    </div>
  );
}
