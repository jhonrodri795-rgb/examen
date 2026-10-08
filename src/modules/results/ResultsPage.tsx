import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import { Award, BookOpen, ChevronDown, ClipboardCheck, Clock, Headphones, Info, ListChecks, Mic, PenLine, RotateCcw, TrendingDown, TrendingUp } from 'lucide-react';
import { useBank, useToast } from '@/app/context';
import { Alert, Badge, Button, Card, CardHeader, EmptyState, PageHeader, Spinner } from '@/components/ui';
import { BarChart } from '@/components/charts/Charts';
import { cn, formatBand, formatDate, formatDuration } from '@/lib/format';
import type { Attempt, RubricRating, SectionResult } from '@/modules/exam-engine/types';
import { rateItem } from '@/modules/exam-engine/engine';
import { getAttempt, saveAttempt } from '@/modules/storage/repositories';
import type { SectionId, Skill } from '@/modules/question-bank/types';
import { SKILL_LABEL } from '@/modules/scoring/advice';
import { computeResults, ratio, sectionName } from '@/modules/scoring/results';
import { WritingAssessment } from '@/modules/writing/ui/WritingAssessment';
import { SpeakingReportView } from '@/modules/speaking/ui/SpeakingReportView';
import { startAttempt } from '@/modules/exam-engine/ui/ExamSetupPage';

const ICONS: Record<SectionId, typeof BookOpen> = { reading: BookOpen, listening: Headphones, writing: PenLine, speaking: Mic };
const BASIS_LABEL = { objective: 'automática', self: 'autoevaluación', ai: 'IA', auto: 'heurística', mixed: 'mixta', pending: 'pendiente' } as const;

export function useStoredAttempt(attemptId: string) {
  const [attempt, setAttempt] = useState<Attempt | null | undefined>(undefined);
  const latest = useRef<Attempt | null>(null);
  useEffect(() => {
    getAttempt(attemptId)
      .then((a) => {
        latest.current = a ?? null;
        setAttempt(a ?? null);
      })
      .catch(() => setAttempt(null));
  }, [attemptId]);
  /** Aplica un cambio y lo guarda con una revisión nueva (sin efectos dentro del setState). */
  const update = useCallback(async (fn: (a: Attempt) => Attempt) => {
    const prev = latest.current;
    if (!prev) return;
    const next = { ...fn(prev), rev: prev.rev + 1 };
    latest.current = next;
    setAttempt(next);
    await saveAttempt(next);
  }, []);
  return { attempt, update };
}

function SectionCard({ s }: { s: SectionResult }) {
  const Icon = ICONS[s.id];
  const answered = s.objective.total - s.objective.unanswered;
  return (
    <Card className="flex flex-col">
      <div className="flex items-start justify-between gap-3 p-5">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-soft text-accent">
            <Icon className="h-5 w-5" aria-hidden />
          </span>
          <div>
            <p className="font-semibold text-ink">{sectionName(s.id)}</p>
            <p className="text-xs text-muted">{s.status === 'skipped' ? 'Omitida' : s.status === 'pending' ? 'Pendiente de valorar' : 'Banda estimada'}</p>
          </div>
        </div>
        <p className="text-3xl font-semibold tabular-nums text-ink" aria-label={`Banda estimada ${formatBand(s.band)}`}>{formatBand(s.band)}</p>
      </div>
      <div className="flex-1 space-y-2 border-t border-line px-5 py-4 text-sm">
        {s.objective.total > 0 && (
          <>
            <p className="flex justify-between"><span className="text-muted">Correctas</span><span className="font-medium tabular-nums text-ok">{s.objective.correct}{s.objective.partial ? ` (+${s.objective.partial} parciales)` : ''}</span></p>
            <p className="flex justify-between"><span className="text-muted">Incorrectas</span><span className="font-medium tabular-nums text-bad">{s.objective.incorrect}</span></p>
            <p className="flex justify-between"><span className="text-muted">Sin responder</span><span className="font-medium tabular-nums text-ink">{s.objective.unanswered}</span></p>
            <p className="flex justify-between"><span className="text-muted">Respondidas</span><span className="font-medium tabular-nums text-ink">{answered}/{s.objective.total}</span></p>
            <p className="flex justify-between"><span className="text-muted">Aciertos</span><span className="font-medium tabular-nums text-ink">{Math.round(ratio(s.objective) * 100)} %</span></p>
          </>
        )}
        <p className="flex justify-between"><span className="text-muted">Tiempo usado</span><span className="tabular-nums text-ink">{formatDuration(s.timeUsedMs)}{s.timeLimitMs ? ` / ${formatDuration(s.timeLimitMs)}` : ''}</span></p>
        {s.route && <p className="flex justify-between"><span className="text-muted">Ruta adaptativa</span><Badge tone="accent">{s.route === 'upper' ? 'Superior' : 'Inferior'}</Badge></p>}
        {s.components.map((c) => (
          <div key={c.task} className="rounded-lg bg-surface-2 px-2.5 py-1.5">
            <p className="flex justify-between gap-2">
              <span className="text-ink">{c.label}</span>
              <span className="font-semibold tabular-nums text-ink">{c.band != null ? formatBand(c.band) : '—'}</span>
            </p>
            <p className="text-xs text-muted">{BASIS_LABEL[c.basis]} · {c.detail}</p>
          </div>
        ))}
        <p className="pt-1 text-xs text-muted">{s.bandBasis}</p>
      </div>
    </Card>
  );
}

/** Acciones rápidas: puntuar en bloque respuestas vacías y Listen and Repeat. */
function BulkRating({ items, onRate }: { items: { id: string; task: string; hasResponse: boolean; rated: boolean }[]; onRate: (ids: string[], overall: number, note: string) => void }) {
  const [lr, setLr] = useState('3');
  const empty = items.filter((i) => !i.hasResponse && !i.rated).map((i) => i.id);
  const repeat = items.filter((i) => i.task === 'listen-repeat' && i.hasResponse && !i.rated).map((i) => i.id);
  if (!empty.length && !repeat.length) return null;
  return (
    <div className="flex flex-wrap items-end gap-3 border-b border-line bg-surface-2 px-5 py-3 text-sm">
      {empty.length > 0 && (
        <Button size="sm" variant="outline" onClick={() => onRate(empty, 0, 'Sin respuesta')}>
          Puntuar con 0 las {empty.length} respuesta(s) vacía(s)
        </Button>
      )}
      {repeat.length > 0 && (
        <div className="flex flex-wrap items-end gap-2">
          <label htmlFor="lr-bulk" className="text-xs text-muted">
            Autoevaluación rápida de {repeat.length} frase(s) de Listen and Repeat (0–5)
            <select id="lr-bulk" value={lr} onChange={(e) => setLr(e.target.value)} className="mt-1 block h-9 rounded-lg border border-line bg-surface px-2 text-ink">
              {[['5', '5 · todas exactas'], ['4', '4 · errores mínimos'], ['3', '3 · algunas palabras omitidas'], ['2', '2 · frases incompletas'], ['1', '1 · muy incompletas'], ['0', '0 · sin repetir']].map(([v, l]) => <option key={v} value={v}>{l}</option>)}
            </select>
          </label>
          <Button size="sm" variant="secondary" onClick={() => onRate(repeat, Number(lr), 'Autoevaluación en bloque')}>Aplicar</Button>
        </div>
      )}
    </div>
  );
}

export function ResultsPage() {
  const { attemptId = '' } = useParams();
  const { bank } = useBank();
  const toast = useToast();
  const navigate = useNavigate();
  const { attempt, update } = useStoredAttempt(attemptId);
  const [open, setOpen] = useState<string | null>(null);

  const results = useMemo(() => (attempt && attempt.status === 'completed' ? attempt.results ?? computeResults(attempt, bank, attempt.finishedAt ?? Date.now()) : null), [attempt, bank]);

  const rate = (itemId: string, r: RubricRating) => {
    void update((a) => rateItem(a, itemId, r, bank, Date.now()));
    toast('Valoración guardada. Resultados actualizados.', 'ok');
  };

  if (attempt === undefined) return <Spinner label="Cargando resultados…" />;
  if (attempt === null) return <EmptyState title="Intento no encontrado" action={<Link to="/history"><Button>Ir al historial</Button></Link>} />;
  if (attempt.status !== 'completed' || !results) {
    return <EmptyState title="Este intento no ha terminado" description="Termina o entrega el intento para ver los resultados." action={<Link to={`/exam/${attempt.id}`}><Button>Continuar intento</Button></Link>} />;
  }

  const skills = Object.entries(
    results.sections.reduce<Record<string, { earned: number; max: number; correct: number; total: number }>>((acc, s) => {
      for (const [k, v] of Object.entries(s.bySkill)) {
        const cur = (acc[k] ??= { earned: 0, max: 0, correct: 0, total: 0 });
        cur.earned += v!.earned;
        cur.max += v!.max;
        cur.correct += v!.correct;
        cur.total += v!.total;
      }
      return acc;
    }, {}),
  )
    .map(([k, v]) => ({ key: k, label: SKILL_LABEL[k as Skill] ?? k, value: v.max ? v.earned / v.max : 0, detail: `${v.correct}/${v.total}` }))
    .sort((a, b) => a.value - b.value);

  const constructed = attempt.sections.flatMap((s) =>
    s.modules.flatMap((m) =>
      m.itemIds
        .map((id) => bank.itemById.get(id))
        .filter((it): it is NonNullable<typeof it> => !!it && !it.objective)
        .map((it) => ({ item: it, set: bank.setById.get(it.setId)!, response: attempt.responses[it.id], rating: attempt.ratings[it.id] })),
    ),
  );

  const retry = async () => {
    try {
      const id = await startAttempt({ ...attempt.config, seed: Math.floor(Math.random() * 2 ** 31) }, bank);
      navigate(`/exam/${id}`);
    } catch (e) {
      toast((e as Error).message, 'bad');
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Resultados"
        description={`${attempt.blueprint.name} · ${attempt.config.mode === 'exam' ? 'modo examen' : 'modo práctica'} · ${formatDate(attempt.finishedAt ?? attempt.createdAt)}`}
        actions={
          <>
            <Link to={`/results/${attempt.id}/review`}>
              <Button variant="outline" icon={<ListChecks className="h-4 w-4" />}>Revisar respuestas</Button>
            </Link>
            <Button onClick={retry} icon={<RotateCcw className="h-4 w-4" />}>Repetir con contenido nuevo</Button>
          </>
        }
      />

      <Alert tone="info" title="Cómo interpretar estas puntuaciones">
        Los aciertos y porcentajes son <strong>cálculos exactos</strong> de la aplicación. Las bandas (1–6), el nivel MCER y la equivalencia 0–120 son <strong>estimaciones orientativas</strong> basadas en curvas propias; no son calificaciones oficiales de ETS.
      </Alert>

      <Card className="overflow-hidden">
        <div className="grid gap-6 bg-navy-900 p-6 text-white sm:grid-cols-3 dark:bg-navy-950">
          <div>
            <p className="text-xs uppercase tracking-wide text-sky-200">Banda global estimada</p>
            <p className="mt-1 text-5xl font-semibold tabular-nums">{formatBand(results.overallBand)}</p>
            <p className="mt-1 text-sm text-sky-100/80">{results.overallComplete ? 'Media de las cuatro secciones, redondeada a 0,5.' : 'Requiere las cuatro secciones puntuadas (valora Writing/Speaking abajo).'}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-sky-200">Nivel MCER aproximado</p>
            <p className="mt-1 text-4xl font-semibold">{results.cefr ?? '—'}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-sky-200">Escala 0–120 comparable</p>
            <p className="mt-1 text-4xl font-semibold tabular-nums">{results.legacy.value ?? '—'}</p>
            <p className="mt-1 text-xs text-sky-100/80">{results.legacy.note}</p>
          </div>
        </div>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {results.sections.map((s) => <SectionCard key={s.id} s={s} />)}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader title="Resultados por tipo de pregunta" description="Proporción de aciertos (preguntas objetivas)." />
          <div className="p-5"><BarChart title="Aciertos por habilidad" data={skills} emptyText="Sin preguntas objetivas en este intento." /></div>
        </Card>
        <div className="space-y-6">
          <Card>
            <CardHeader title="Fortalezas y debilidades" icon={<Award className="h-5 w-5" />} />
            <div className="grid gap-4 p-5 text-sm sm:grid-cols-2">
              <div>
                <p className="mb-2 flex items-center gap-1.5 font-semibold text-ok"><TrendingUp className="h-4 w-4" /> Fortalezas</p>
                {results.strengths.length ? (
                  <ul className="space-y-1">{results.strengths.map((s) => <li key={s.skill} className="flex justify-between gap-2"><span className="text-ink">{SKILL_LABEL[s.skill]}</span><span className="tabular-nums text-muted">{Math.round(s.pct * 100)} %</span></li>)}</ul>
                ) : <p className="text-muted">Aún no hay habilidades con ≥ 80 % (mín. 2 preguntas).</p>}
              </div>
              <div>
                <p className="mb-2 flex items-center gap-1.5 font-semibold text-bad"><TrendingDown className="h-4 w-4" /> A mejorar</p>
                {results.weaknesses.length ? (
                  <ul className="space-y-1">{results.weaknesses.map((s) => <li key={s.skill} className="flex justify-between gap-2"><span className="text-ink">{SKILL_LABEL[s.skill]}</span><span className="tabular-nums text-muted">{Math.round(s.pct * 100)} %</span></li>)}</ul>
                ) : <p className="text-muted">Ninguna habilidad por debajo del 50 %.</p>}
              </div>
            </div>
          </Card>
          <Card>
            <CardHeader title="Recomendaciones de estudio" icon={<ClipboardCheck className="h-5 w-5" />} />
            <ul className="space-y-3 p-5 text-sm">
              {results.recommendations.length === 0 && <li className="text-muted">¡Buen trabajo! Prueba una simulación en modo examen o con tiempo estándar para afianzar.</li>}
              {results.recommendations.map((r, i) => (
                <li key={i} className="rounded-lg bg-surface-3 p-3">
                  <p className="font-medium text-ink">{r.title}</p>
                  <p className="mt-0.5 text-ink-2">{r.detail}</p>
                  {r.task && <Link className="mt-1 inline-block text-xs font-medium text-accent hover:underline" to="/practice">Practicar {sectionName(r.section)} →</Link>}
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>

      {constructed.length > 0 && (
        <Card>
          <CardHeader
            title="Valoración de Writing y Speaking"
            description="Estas respuestas se puntúan con rúbrica: usa la autoevaluación, el análisis local o la IA (si está configurada) para completar la banda."
            icon={<Info className="h-5 w-5" />}
          />
          <BulkRating
            items={constructed.map(({ item, set, response, rating }) => ({ id: item.id, task: set.task, hasResponse: response?.kind === 'essay' ? response.text.trim().length > 0 : response?.kind === 'speech' && response.status === 'recorded', rated: !!rating }))}
            onRate={(ids, overall, note) => {
              void update((a) => ids.reduce((acc, id) => rateItem(acc, id, { source: 'self', overall, at: Date.now(), note }, bank, Date.now()), a));
              toast(`${ids.length} valoración(es) guardada(s).`, 'ok');
            }}
          />
          <ul className="divide-y divide-line">
            {constructed.map(({ item, set, response, rating }) => {
              const isOpen = open === item.id;
              const label = set.task === 'email' ? 'Write an Email' : set.task === 'academic-discussion' ? 'Academic Discussion' : set.task === 'listen-repeat' ? 'Listen and Repeat' : set.task === 'interview' ? 'Interview' : set.task;
              const prompt =
                set.task === 'listen-repeat' ? set.sentences.find((s) => s.id === item.id)?.text ?? '' : set.task === 'interview' ? set.questions.find((q) => q.id === item.id)?.text ?? '' : set.title;
              const hasResponse = response?.kind === 'essay' ? response.text.trim().length > 0 : response?.kind === 'speech' && response.status === 'recorded';
              return (
                <li key={item.id}>
                  <button type="button" onClick={() => setOpen(isOpen ? null : item.id)} aria-expanded={isOpen} className="flex w-full items-center justify-between gap-3 px-5 py-3 text-left hover:bg-surface-3">
                    <span className="min-w-0">
                      <span className="block text-sm font-medium text-ink">{label}</span>
                      <span className="block truncate text-xs text-muted">{prompt}</span>
                    </span>
                    <span className="flex shrink-0 items-center gap-2">
                      {!hasResponse ? <Badge>Sin respuesta</Badge> : rating ? <Badge tone="ok">{rating.overall}/5 · {BASIS_LABEL[rating.source]}</Badge> : <Badge tone="warn">Sin valorar</Badge>}
                      <ChevronDown className={cn('h-4 w-4 text-muted transition-transform', isOpen && 'rotate-180')} />
                    </span>
                  </button>
                  {isOpen && (
                    <div className="border-t border-line bg-surface-2 p-5">
                      {!hasResponse && (
                        <div className="space-y-3">
                          <p className="text-sm text-muted">No hay respuesta para este ítem.</p>
                          <Button size="sm" variant="outline" onClick={() => rate(item.id, { source: 'self', overall: 0, at: Date.now(), note: 'Sin respuesta' })}>Puntuar como 0</Button>
                        </div>
                      )}
                      {hasResponse && response?.kind === 'essay' && (set.task === 'email' || set.task === 'academic-discussion') && (
                        <div className="space-y-4">
                          <div className="rounded-xl border border-line bg-surface p-4 font-serif whitespace-pre-line text-ink">{response.text}</div>
                          <WritingAssessment set={set} text={response.text} attemptId={attempt.id} itemId={item.id} currentRating={rating} onRated={(r) => rate(item.id, r)} />
                        </div>
                      )}
                      {hasResponse && response?.kind === 'speech' && response.recordingId && (
                        <SpeakingReportView
                          recordingId={response.recordingId}
                          task={{
                            type: set.task === 'listen-repeat' ? 'listen-repeat' : 'interview',
                            prompt,
                            referenceText: set.task === 'listen-repeat' ? prompt : undefined,
                            responseSec: set.task === 'listen-repeat' ? set.sentences.find((s) => s.id === item.id)?.responseSec ?? 10 : 45,
                          }}
                          currentRating={rating}
                          onRated={(r) => rate(item.id, r)}
                        />
                      )}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </Card>
      )}

      <p className="flex items-center gap-2 text-xs text-muted">
        <Clock className="h-3.5 w-3.5" /> Tiempo total: {formatDuration(results.sections.reduce((s, x) => s + x.timeUsedMs, 0))}
      </p>
    </div>
  );
}
