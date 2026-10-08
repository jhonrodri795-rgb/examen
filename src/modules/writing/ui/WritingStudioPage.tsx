import { useCallback, useEffect, useRef, useState } from 'react';
import { Clock, History, Pause, Play, RotateCcw, Save, Trash2 } from 'lucide-react';
import { useBank, useToast } from '@/app/context';
import { Badge, Button, Card, CardHeader, ConfirmDialog, PageHeader, Select } from '@/components/ui';
import { countWords, formatClock, formatDate } from '@/lib/format';
import { newId } from '@/lib/random';
import type { DiscussionTaskSet, EmailTaskSet } from '@/modules/question-bank/types';
import type { WritingDraftRecord } from '@/modules/storage/db';
import { autosaveDraft, deleteDraft, getAutosave, listDrafts, saveDraftSnapshot, saveWritingReport } from '@/modules/storage/repositories';
import { analyzeWriting } from '../analysis';
import { EssayEditor, EssayPrompt } from './WritingViews';
import { WritingAssessment, analysisContext } from './WritingAssessment';

type EssaySet = EmailTaskSet | DiscussionTaskSet;

export function WritingStudioPage() {
  const { bank } = useBank();
  const toast = useToast();
  const sets = bank.sets.filter((s): s is EssaySet => s.task === 'email' || s.task === 'academic-discussion');
  const [setId, setSetId] = useState(sets[0]?.id ?? '');
  const set = sets.find((s) => s.id === setId) ?? sets[0];
  const [text, setText] = useState('');
  const [savedAt, setSavedAt] = useState<number | null>(null);
  const [drafts, setDrafts] = useState<WritingDraftRecord[]>([]);
  const [timer, setTimer] = useState<{ running: boolean; left: number }>({ running: false, left: set?.timeLimitSec ?? 600 });
  const [showAnalysis, setShowAnalysis] = useState(false);
  // El editor se habilita tras cargar el autoguardado para que no sobrescriba lo que se escribe.
  const [loaded, setLoaded] = useState(false);
  const [toDelete, setToDelete] = useState<WritingDraftRecord | null>(null);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const refreshDrafts = useCallback(() => {
    if (set) void listDrafts(set.id).then(setDrafts).catch(() => undefined);
  }, [set]);

  // Cargar el autoguardado del ejercicio seleccionado.
  useEffect(() => {
    if (!set) return;
    setShowAnalysis(false);
    setTimer({ running: false, left: set.timeLimitSec });
    setLoaded(false);
    void getAutosave(set.id, null)
      .then((d) => {
        setText(d?.text ?? '');
        setSavedAt(d?.updatedAt ?? null);
      })
      .catch(() => toast('No se pudo cargar el borrador guardado.', 'warn'))
      .finally(() => setLoaded(true));
    refreshDrafts();
  }, [set, refreshDrafts, toast]);

  useEffect(() => {
    if (!timer.running) return;
    const started = Date.now();
    const base = timer.left;
    const id = setInterval(() => {
      const left = Math.max(0, base - (Date.now() - started) / 1000);
      setTimer({ running: left > 0, left });
      if (left <= 0) toast('Tiempo agotado. Tu texto está guardado; puedes seguir editándolo fuera de tiempo.', 'warn');
    }, 250);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timer.running]);

  const onChange = (v: string) => {
    setText(v);
    if (!set) return;
    if (saveTimer.current) clearTimeout(saveTimer.current);
    const at = Date.now();
    saveTimer.current = setTimeout(() => {
      void autosaveDraft({ setId: set.id, attemptId: null, text: v, wordCount: countWords(v), at }).then(() => setSavedAt(at)).catch(() => toast('No se pudo guardar el borrador.', 'bad'));
    }, 600);
  };

  const snapshot = async () => {
    if (!set) return;
    await saveDraftSnapshot({ setId: set.id, attemptId: null, text, wordCount: countWords(text), kind: 'snapshot', at: Date.now() });
    toast('Versión guardada en el historial de borradores.', 'ok');
    refreshDrafts();
  };

  if (!set) return null;

  return (
    <div className="space-y-6">
      <PageHeader title="Estudio de Writing" description="Practica Write an Email y Academic Discussion con temporizador, autoguardado, historial de borradores y evaluación por rúbrica." />
      <div className="flex flex-wrap items-end gap-3">
        <Select className="min-w-72" id="w-set" label="Tarea" value={set.id} onChange={setSetId} options={sets.map((s) => ({ value: s.id, label: `${s.task === 'email' ? 'Email' : 'Discusión'} · ${s.title} (${s.difficulty})` }))} />
        <div className="flex items-center gap-2 rounded-lg border border-line bg-surface px-3 py-2">
          <Clock className="h-4 w-4 text-accent" aria-hidden />
          <span className="font-mono font-semibold tabular-nums text-ink" role="timer">{formatClock(timer.left * 1000)}</span>
          <Button size="sm" variant="ghost" onClick={() => setTimer((t) => ({ ...t, running: !t.running }))} disabled={timer.left <= 0} icon={timer.running ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}>
            {timer.running ? 'Pausar' : 'Iniciar'}
          </Button>
          <Button size="icon" variant="ghost" aria-label="Reiniciar temporizador" onClick={() => setTimer({ running: false, left: set.timeLimitSec })}>
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <EssayPrompt set={set} />
        <div className="space-y-3">
          <EssayEditor value={text} onChange={onChange} disabled={!loaded} recommended={set.recommendedWords} saveLabel={savedAt ? `Guardado ${new Date(savedAt).toLocaleTimeString('es')}` : 'Sin guardar'} />
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" onClick={snapshot} disabled={!text.trim()} icon={<Save className="h-4 w-4" />}>Guardar versión</Button>
            <Button size="sm" onClick={() => setShowAnalysis(true)} disabled={countWords(text) < 5}>Analizar y evaluar</Button>
          </div>
        </div>
      </div>

      {showAnalysis && (
        <WritingAssessment
          key={`${set.id}-${text.length}`}
          set={set}
          text={text}
          attemptId={null}
          itemId={set.id}
          onRated={(r) => {
            void saveWritingReport({ id: newId('wrep'), draftId: null, setId: set.id, attemptId: null, itemId: set.id, text, createdAt: Date.now(), analysis: analyzeWriting(text, analysisContext(set)), evaluation: null, selfAssessment: { scores: Object.fromEntries(Object.entries(r.criteria ?? {}).map(([k, v]) => [k, v ?? 0])), overall5: r.overall, note: r.note ?? '', at: r.at } });
            toast(`Valoración guardada (${r.overall}/5).`, 'ok');
          }}
        />
      )}

      <Card>
        <CardHeader title="Historial de borradores" icon={<History className="h-5 w-5" />} description="Versiones guardadas de esta tarea. El autoguardado conserva siempre la última." />
        {drafts.length === 0 ? (
          <p className="p-5 text-sm text-muted">Sin borradores todavía.</p>
        ) : (
          <ul className="divide-y divide-line">
            {drafts.map((d) => (
              <li key={d.id} className="flex flex-wrap items-center justify-between gap-3 px-5 py-3">
                <div className="min-w-0">
                  <p className="text-sm text-ink">
                    <Badge tone={d.kind === 'autosave' ? 'neutral' : d.kind === 'submitted' ? 'brand' : 'accent'}>{d.kind === 'autosave' ? (d.attemptId ? 'Simulación' : 'Autoguardado') : d.kind === 'submitted' ? 'Entregado' : 'Versión'}</Badge>{' '}
                    {formatDate(d.updatedAt)} · {d.wordCount} palabras
                  </p>
                  <p className="truncate text-xs text-muted">{d.text.slice(0, 140) || '(vacío)'}</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => { onChange(d.text); toast('Borrador restaurado en el editor.', 'ok'); }}>Restaurar</Button>
                  <Button size="icon" variant="ghost" aria-label="Eliminar borrador" onClick={() => setToDelete(d)}>
                    <Trash2 className="h-4 w-4 text-bad" />
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Card>
      <ConfirmDialog
        open={!!toDelete}
        onOpenChange={(v) => !v && setToDelete(null)}
        title="¿Eliminar este borrador?"
        tone="danger"
        confirmLabel="Eliminar"
        onConfirm={async () => {
          if (toDelete) await deleteDraft(toDelete.id);
          setToDelete(null);
          refreshDrafts();
        }}
      />
    </div>
  );
}
