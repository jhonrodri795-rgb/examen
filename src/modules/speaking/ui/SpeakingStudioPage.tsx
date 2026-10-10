import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router';
import { ArrowRight, FlaskConical, GitCompare, History, Mic, ShieldCheck, Trash2 } from 'lucide-react';
import type { Criterion } from '@shared/speaking-types';
import { useBank, useCapabilities, useMic, useSettings, useToast } from '@/app/context';
import { Alert, Badge, Button, Card, CardHeader, ConfirmDialog, EmptyState, PageHeader, Select, Switch, Tabs } from '@/components/ui';
import { LineChart } from '@/components/charts/Charts';
import { formatClock, formatDate } from '@/lib/format';
import type { IndependentSpeakingSet, InterviewSet, ListenRepeatSet } from '@/modules/question-bank/types';
import type { RecordingMeta, SpeakingReportRecord } from '@/modules/storage/db';
import { clearSpeakingHistory, listRecordingMeta, listSpeakingReports } from '@/modules/storage/repositories';
import { MicSetupPanel } from './MicPanel';
import { SpeakingRecorder } from './SpeakingRecorder';
import { DictationCheck } from './DictationCheck';
import { STATIC_BUILD } from '@/lib/runtime';
import { CRITERION_LABEL, SpeakingReportView, type SpeakingTaskInfo } from './SpeakingReportView';

type StudioSet = ListenRepeatSet | InterviewSet | IndependentSpeakingSet;

interface StudioItem {
  id: string;
  label: string;
  task: SpeakingTaskInfo;
  promptLines: { speaker: string; voice: 'female' | 'male' | 'narrator'; text: string }[] | null;
  showText: boolean;
  prepSec: number;
}

function itemsOf(set: StudioSet): StudioItem[] {
  if (set.task === 'listen-repeat') {
    return set.sentences.map((s, i) => ({
      id: s.id, label: `Frase ${i + 1}`, showText: false, prepSec: 0,
      task: { type: 'listen-repeat', prompt: s.text, referenceText: s.text, responseSec: s.responseSec },
      promptLines: [{ speaker: 'Guide', voice: set.speakerVoice, text: s.text }],
    }));
  }
  if (set.task === 'interview') {
    return set.questions.map((q, i) => ({
      id: q.id, label: `Pregunta ${i + 1}`, showText: true, prepSec: q.prepSec,
      task: { type: 'interview', prompt: q.text, responseSec: q.responseSec },
      promptLines: [...(i === 0 ? [{ speaker: 'Interviewer', voice: set.interviewerVoice, text: set.intro }] : []), { speaker: 'Interviewer', voice: set.interviewerVoice, text: q.text }],
    }));
  }
  return [{ id: set.id, label: 'Consigna', showText: true, prepSec: set.prepSec, task: { type: 'independent-speaking', prompt: set.prompt, responseSec: set.responseSec }, promptLines: [{ speaker: 'Narrator', voice: 'narrator', text: set.prompt }] }];
}

function taskForItem(bankSets: StudioSet[], itemId: string): SpeakingTaskInfo | null {
  for (const s of bankSets) for (const it of itemsOf(s)) if (it.id === itemId) return it.task;
  return null;
}

function PracticeTab({ initialItem }: { initialItem?: string | null }) {
  const { bank } = useBank();
  const { settings } = useSettings();
  const sets = bank.sets.filter((s): s is StudioSet => s.section === 'speaking');
  const [kind, setKind] = useState<StudioSet['task']>('interview');
  const [setId, setSetId] = useState<string>('');
  const [itemIdx, setItemIdx] = useState(0);
  const [recordingId, setRecordingId] = useState<string | null>(null);
  const [run, setRun] = useState(0);
  const [extraPrep, setExtraPrep] = useState(settings.speakingPrepSec);

  useEffect(() => {
    if (!initialItem) return;
    for (const s of sets) {
      const idx = itemsOf(s).findIndex((i) => i.id === initialItem);
      if (idx >= 0) {
        setKind(s.task);
        setSetId(s.id);
        setItemIdx(idx);
        return;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialItem]);

  const ofKind = sets.filter((s) => s.task === kind);
  const set = ofKind.find((s) => s.id === setId) ?? ofKind[0];
  const items = set ? itemsOf(set) : [];
  const item = items[Math.min(itemIdx, items.length - 1)];

  const reset = () => {
    setRecordingId(null);
    setRun((r) => r + 1);
  };

  return (
    <div className="space-y-5">
      <div className="grid gap-3 sm:grid-cols-3">
        <Select id="sp-kind" label="Tipo de tarea" value={kind} onChange={(v) => { setKind(v as StudioSet['task']); setSetId(''); setItemIdx(0); reset(); }} options={[
          { value: 'listen-repeat', label: 'Listen and Repeat (2026)' },
          { value: 'interview', label: 'Take an Interview (2026)' },
          { value: 'independent-speaking', label: 'Opinión con preparación (formato anterior)' },
        ]} />
        <Select id="sp-set" label="Ejercicio" value={set?.id ?? ''} onChange={(v) => { setSetId(v); setItemIdx(0); reset(); }} options={ofKind.map((s) => ({ value: s.id, label: `${s.title} · ${s.difficulty}` }))} />
        {items.length > 1 && <Select id="sp-item" label="Ítem" value={String(itemIdx)} onChange={(v) => { setItemIdx(Number(v)); reset(); }} options={items.map((it, i) => ({ value: String(i), label: it.label }))} />}
      </div>
      {kind !== 'independent-speaking' && (
        <Select className="max-w-xs" id="sp-extra-prep" label="Preparación extra (el formato 2026 no tiene)" value={String(extraPrep)} onChange={(v) => { setExtraPrep(Number(v)); reset(); }} options={[0, 10, 15, 30].map((n) => ({ value: String(n), label: n ? `${n} s` : 'Ninguna (como el examen)' }))} />
      )}
      {set?.task === 'listen-repeat' && <Alert tone="info" title={set.scenario.title}>{set.scenario.description} La frase no se muestra hasta que grabas (como en el examen).</Alert>}
      {set?.task === 'independent-speaking' && (
        <Alert tone="info" title="Consejos">
          <ul className="list-disc pl-4">{set.tips.map((t) => <li key={t}>{t}</li>)}</ul>
        </Alert>
      )}
      {item && set && (
        <div className="grid gap-6 xl:grid-cols-[1fr_1.2fr]">
          <SpeakingRecorder
            key={`${item.id}-${run}`}
            promptLines={item.promptLines}
            promptText={item.task.prompt}
            showPromptText={item.showText || !!recordingId}
            prepSec={item.prepSec + (kind === 'independent-speaking' ? 0 : extraPrep)}
            responseSec={item.task.responseSec}
            minMs={item.task.type === 'listen-repeat' ? 600 : 1500}
            meta={{ attemptId: null, itemId: item.id, setId: set.id, task: set.task, prompt: item.task.prompt, referenceText: item.task.referenceText, context: 'studio' }}
            autoStart={false}
            allowRetry
            allowReplayPrompt
            onSaved={(rec) => setRecordingId(rec.id)}
          />
          <div>
            {recordingId ? (
              <SpeakingReportView key={recordingId} recordingId={recordingId} task={item.task} autoAnalyze onPracticeAgain={reset} onDeleted={reset} />
            ) : (
              <EmptyState icon={<Mic className="h-8 w-8" />} title={STATIC_BUILD ? 'Responde a la pregunta' : 'Graba tu respuesta'} description={STATIC_BUILD ? 'Cuando guardes tu respuesta verás aquí tu fluidez medida en el audio (ritmo, pausas, entonación) y la evaluación por criterios con Claude.' : 'Cuando termines, verás aquí el análisis: métricas de la señal, transcripción (si está configurada) y evaluación por criterios.'} />
            )}
            {recordingId && itemIdx < items.length - 1 && (
              <Button className="mt-4" variant="secondary" onClick={() => { setItemIdx((i) => i + 1); reset(); }}>
                Siguiente ítem <ArrowRight className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function HistoryTab() {
  const { bank } = useBank();
  const toast = useToast();
  const sets = bank.sets.filter((s): s is StudioSet => s.section === 'speaking');
  const [recs, setRecs] = useState<RecordingMeta[] | null>(null);
  const [reports, setReports] = useState<SpeakingReportRecord[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [compare, setCompare] = useState<string[]>([]);
  const [confirmClear, setConfirmClear] = useState(false);

  const load = () => {
    void listRecordingMeta().then(setRecs).catch(() => setRecs([]));
    void listSpeakingReports().then(setReports).catch(() => undefined);
  };
  useEffect(load, []);

  const byRec = useMemo(() => new Map(reports.map((r) => [r.recordingId, r])), [reports]);
  const chartData = useMemo(() => {
    const evaluated = [...reports].filter((r) => r.evaluation).sort((a, b) => a.createdAt - b.createdAt).slice(-15);
    const crits: Criterion[] = ['delivery', 'languageUse', 'topicDevelopment', 'taskFulfillment'];
    return {
      xLabels: evaluated.map((r) => new Intl.DateTimeFormat('es', { day: '2-digit', month: 'short' }).format(r.createdAt)),
      series: crits.map((c, i) => ({ key: c, label: CRITERION_LABEL[c].split(' (')[0]!, colorIndex: i, values: evaluated.map((r) => r.evaluation!.criteria.find((x) => x.criterion === c)?.score ?? null) })).filter((s) => s.values.some((v) => v != null)),
    };
  }, [reports]);

  const selectedRec = recs?.find((r) => r.id === selected);
  const cmp = compare.map((id) => ({ rec: recs?.find((r) => r.id === id), rep: byRec.get(id) })).filter((x) => x.rec);

  if (recs === null) return null;
  if (recs.length === 0) return <EmptyState icon={<History className="h-8 w-8" />} title="Sin grabaciones" description="Tus respuestas de Speaking (estudio y simulaciones) aparecerán aquí si el guardado local está activado." />;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader title="Evolución por criterio" description="Puntuación 0–4 en tus respuestas evaluadas (IA o heurística)." />
        <div className="p-5"><LineChart title="Criterios de Speaking por respuesta" xLabels={chartData.xLabels} series={chartData.series} yMin={0} yMax={4} yStep={1} emptyText="Analiza alguna respuesta para ver la evolución." /></div>
      </Card>

      {cmp.length === 2 && (
        <Card>
          <CardHeader title="Comparación entre respuestas" icon={<GitCompare className="h-5 w-5" />} actions={<Button size="sm" variant="ghost" onClick={() => setCompare([])}>Cerrar</Button>} />
          <div className="overflow-x-auto p-5">
            <table className="w-full text-sm">
              <thead className="text-left text-xs text-muted"><tr><th className="py-1">Métrica</th><th>{formatDate(cmp[0]!.rec!.createdAt)}</th><th>{formatDate(cmp[1]!.rec!.createdAt)}</th></tr></thead>
              <tbody>
                {[
                  ['Duración', (_r?: SpeakingReportRecord, m?: RecordingMeta) => formatClock(m?.durationMs ?? 0)],
                  ['Tiempo de habla', (r?: SpeakingReportRecord) => (r?.acoustic ? `${r.acoustic.speechDurationSec} s` : '—')],
                  ['Pausas largas', (r?: SpeakingReportRecord) => (r?.acoustic ? String(r.acoustic.longPauseCount) : '—')],
                  ['Palabras/min', (r?: SpeakingReportRecord) => String(r?.transcriptMetrics?.wordsPerMinute ?? '—')],
                  ['Muletillas', (r?: SpeakingReportRecord) => String(r?.transcriptMetrics?.fillerCount ?? '—')],
                  ['Global (0–4)', (r?: SpeakingReportRecord) => String(r?.evaluation?.overall ?? '—')],
                  ...(['delivery', 'languageUse', 'topicDevelopment', 'taskFulfillment'] as Criterion[]).map((c) => [CRITERION_LABEL[c].split(' (')[0]!, (r?: SpeakingReportRecord) => String(r?.evaluation?.criteria.find((x) => x.criterion === c)?.score ?? '—')] as const),
                ].map(([label, fn]) => (
                  <tr key={label as string} className="border-t border-line">
                    <td className="py-1.5 text-ink">{label as string}</td>
                    <td className="tabular-nums">{(fn as (r?: SpeakingReportRecord, m?: RecordingMeta) => string)(cmp[0]!.rep, cmp[0]!.rec)}</td>
                    <td className="tabular-nums">{(fn as (r?: SpeakingReportRecord, m?: RecordingMeta) => string)(cmp[1]!.rep, cmp[1]!.rec)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      <div className="grid gap-6 xl:grid-cols-[22rem_1fr]">
        <Card>
          <CardHeader title="Grabaciones" description={`${recs.length} guardadas`} actions={<Button size="sm" variant="ghost" className="text-bad" onClick={() => setConfirmClear(true)} icon={<Trash2 className="h-4 w-4" />}>Borrar todo</Button>} />
          <ul className="max-h-[36rem] divide-y divide-line overflow-y-auto">
            {recs.map((r) => {
              const rep = byRec.get(r.id);
              return (
                <li key={r.id} className={selected === r.id ? 'bg-accent-soft' : ''}>
                  <div className="flex items-center gap-2 px-4 py-2.5">
                    <input type="checkbox" aria-label="Seleccionar para comparar" checked={compare.includes(r.id)} onChange={(e) => setCompare((c) => (e.target.checked ? [...c, r.id].slice(-2) : c.filter((x) => x !== r.id)))} className="accent-sky-600" />
                    <button type="button" onClick={() => setSelected(r.id)} className="min-w-0 flex-1 text-left">
                      <span className="block truncate text-sm text-ink">{r.prompt}</span>
                      <span className="block text-xs text-muted">{formatDate(r.createdAt)} · {formatClock(r.durationMs)} · {r.context === 'exam' ? 'simulación' : 'estudio'}</span>
                    </button>
                    {rep?.evaluation?.overall != null && <Badge tone="accent">{rep.evaluation.overall}/4</Badge>}
                  </div>
                </li>
              );
            })}
          </ul>
          <p className="px-4 pb-3 text-xs text-muted">Marca dos casillas para comparar respuestas.</p>
        </Card>
        <div>
          {selectedRec ? (
            <SpeakingReportView
              key={selectedRec.id}
              recordingId={selectedRec.id}
              task={taskForItem(sets, selectedRec.itemId) ?? { type: selectedRec.task === 'listen-repeat' ? 'listen-repeat' : 'interview', prompt: selectedRec.prompt, referenceText: selectedRec.referenceText, responseSec: 45 }}
              onDeleted={() => { setSelected(null); load(); }}
            />
          ) : (
            <EmptyState title="Selecciona una grabación" description="Podrás escucharla, revisar su informe, editar la transcripción para estudiar o exportarla." />
          )}
        </div>
      </div>
      <ConfirmDialog
        open={confirmClear}
        onOpenChange={setConfirmClear}
        title="¿Borrar todo el historial de Speaking?"
        tone="danger"
        confirmLabel="Borrar"
        description="Se eliminarán todas las grabaciones e informes de este navegador."
        onConfirm={async () => {
          await clearSpeakingHistory();
          toast('Historial de Speaking borrado.', 'ok');
          setSelected(null);
          load();
        }}
      />
    </div>
  );
}

function PrivacyTab() {
  const { settings, update } = useSettings();
  const { caps } = useCapabilities();
  const { mic, state } = useMic();
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader title="Controles" icon={<ShieldCheck className="h-5 w-5" />} />
        <div className="divide-y divide-line px-5 py-2">
          <Switch id="save-rec" checked={settings.saveRecordings} onCheckedChange={(v) => update({ saveRecordings: v })} label="Guardar grabaciones en este navegador" description="Si lo desactivas, las grabaciones solo existen en memoria hasta recargar." />
          <Select
            className="py-3"
            id="consent"
            label="Envío a servicios externos (transcripción/IA)"
            value={settings.cloudConsent}
            onChange={(v) => update({ cloudConsent: v as typeof settings.cloudConsent })}
            options={[{ value: 'ask', label: 'Preguntar antes de enviar' }, { value: 'granted', label: 'Permitir siempre' }, { value: 'denied', label: 'No enviar nunca (solo análisis local)' }]}
          />
          <div className="flex items-center justify-between gap-3 py-3">
            <span className="text-sm text-ink">Micrófono: {state.status === 'active' ? `activo (${state.activeLabel})` : 'inactivo'}</span>
            <Button size="sm" variant="outline" disabled={state.status !== 'active'} onClick={() => mic.release()}>Detener ahora</Button>
          </div>
        </div>
      </Card>
      <Card>
        <CardHeader title="¿Qué datos salen de tu navegador?" />
        <ul className="space-y-3 p-5 text-sm">
          {caps === null ? (
            <li className="text-ink-2">El servidor local no responde: no se envía nada fuera del navegador.</li>
          ) : (
            ([['Transcripción', caps.stt], ['Pronunciación', caps.pronunciation], ['Evaluación con IA', caps.evaluator]] as const).map(([l, i]) => (
              <li key={l}>
                <p className="flex items-center gap-2 font-medium text-ink">{l} <Badge tone={i.configured ? 'ok' : 'neutral'}>{i.configured ? 'configurado' : 'no configurado'}</Badge></p>
                <p className="text-ink-2">{i.dataPolicy}</p>
              </li>
            ))
          )}
          {caps && <li className="rounded-lg bg-surface-3 p-3 text-ink-2">{caps.storage}</li>}
          <li className="text-xs text-muted">{STATIC_BUILD ? 'Esta página no contiene claves de ningún proveedor: Claude se usa a través de tu sesión de claude.ai, que pide tu permiso.' : 'Las claves de los proveedores solo existen en el servidor (variables de entorno); el navegador nunca las recibe.'}</li>
        </ul>
      </Card>
    </div>
  );
}

/** Informe de ejemplo claramente identificado (no procede de tu voz). */
function DemoTab() {
  const criteria: { c: Criterion; s: number; r: string; e: string }[] = [
    { c: 'delivery', s: 3, r: 'Ritmo adecuado con dos pausas largas a mitad de respuesta.', e: '📊 longPauseCount = 2; wordsPerMinute = 118' },
    { c: 'languageUse', s: 2.5, r: 'Vocabulario adecuado; error de concordancia en una oración.', e: '«my friends was always telling me»' },
    { c: 'topicDevelopment', s: 3, r: 'Postura clara con una razón y un ejemplo; falta una segunda razón.', e: '«for example, last semester I used an app»' },
    { c: 'taskFulfillment', s: 3.5, r: 'Responde directamente a la pregunta.', e: '«I prefer digital textbooks because»' },
  ];
  return (
    <div className="space-y-4">
      <Alert tone="warn" title="DEMOSTRACIÓN — datos de ejemplo">
        Este informe es ilustrativo: no procede de tu voz ni de ninguna grabación real. Sirve para ver qué ofrece el módulo cuando la transcripción y la evaluación con IA están configuradas.
      </Alert>
      <Card>
        <CardHeader icon={<FlaskConical className="h-5 w-5" />} title="Ejemplo: Take an Interview" description="«Some students prefer printed textbooks, while others prefer digital ones. Which do you prefer, and why?»" actions={<Badge tone="brand">Global 3/4 (ejemplo)</Badge>} />
        <div className="space-y-4 p-5 text-sm">
          <p className="rounded-lg bg-surface-3 p-3 font-serif text-ink">
            «I prefer digital textbooks because they are lighter and, um, I can search words quickly. For example, last semester I used an app that let me highlight and share notes. But my friends was always telling me that paper is better for concentration…»
          </p>
          <ul className="grid gap-3 md:grid-cols-2">
            {criteria.map((x) => (
              <li key={x.c} className="rounded-lg border border-line p-3">
                <p className="flex justify-between font-medium text-ink">{CRITERION_LABEL[x.c]} <span>{x.s}/4</span></p>
                <p className="text-ink-2">{x.r}</p>
                <p className="mt-1 border-l-2 border-accent pl-2 font-mono text-xs text-muted">{x.e}</p>
              </li>
            ))}
          </ul>
          <p className="text-xs text-muted">En el informe real, cada observación cita la transcripción o una métrica medida, y los criterios sin datos suficientes se marcan como «No evaluable».</p>
        </div>
      </Card>
    </div>
  );
}

export function SpeakingStudioPage() {
  const [params, setParams] = useSearchParams();
  const tab = params.get('tab') ?? (STATIC_BUILD ? 'practice' : 'mic');
  const { mic } = useMic();
  // Liberar el micrófono al salir del módulo.
  useEffect(() => () => mic.release(), [mic]);
  return (
    <div>
      <PageHeader title="Estudio de Speaking" description={STATIC_BUILD ? 'Practica las tareas del formato 2026 en voz alta: sube la grabación de tu respuesta para medir tu fluidez (ritmo, pausas, entonación) y recibe una evaluación por criterios con Claude.' : 'Configura el micrófono, practica las tareas del formato 2026 y revisa informes basados en evidencia de tu audio y su transcripción.'} />
      <Tabs
        value={tab}
        onValueChange={(v) => setParams({ tab: v }, { replace: true })}
        tabs={[
          { value: 'mic', label: STATIC_BUILD ? 'Cómo responder' : 'Micrófono', content: <Card className="max-w-2xl space-y-4 p-5"><MicSetupPanel />{STATIC_BUILD && (
            <details className="rounded-lg border border-line bg-surface-2 p-3 text-sm">
              <summary className="cursor-pointer font-medium text-ink">Opcional: dictar o escribir tu respuesta (para evaluar el contenido)</summary>
              <div className="mt-2">
                <DictationCheck className="border-0 bg-transparent p-0" />
              </div>
            </details>
          )}</Card> },
          { value: 'practice', label: 'Practicar', content: <PracticeTab initialItem={params.get('item')} /> },
          { value: 'history', label: 'Historial', content: <HistoryTab /> },
          { value: 'privacy', label: 'Privacidad', content: <PrivacyTab /> },
          { value: 'demo', label: 'Demo', content: <DemoTab /> },
        ]}
      />
    </div>
  );
}
