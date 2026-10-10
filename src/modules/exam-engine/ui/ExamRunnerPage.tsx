import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link, Navigate, useBlocker, useNavigate, useParams } from 'react-router';
import {
  AlertTriangle, ArrowLeft, ArrowRight, CheckCircle2, Clock, Flag, Grid3x3, Headphones, LogOut, Mic, Pause, PenLine, Play, BookOpen, Save,
} from 'lucide-react';
import { useBank, useMic, useToast } from '@/app/context';
import { Alert, Badge, Button, ConfirmDialog, Dialog, EmptyState, ProgressBar, Spinner } from '@/components/ui';
import { cn, formatClock, formatDuration } from '@/lib/format';
import { MicSetupPanel, StaticMicNotice } from '@/modules/speaking/ui/MicPanel';
import { DictationCheck } from '@/modules/speaking/ui/DictationCheck';
import { STATIC_BUILD } from '@/lib/runtime';
import { sectionName } from '@/modules/scoring/results';
import type { SectionId } from '@/modules/question-bank/types';
import {
  beginModule, beginSection, canGoTo, currentModule, currentPage, currentSection, finishModule, goToPage, moduleCounts,
  navigationMode, nextSection, pageStatus, pauseAttempt, resumeAttempt, skipSection, submitAttempt,
} from '../engine';
import { remainingMs } from '../timer';
import type { Attempt } from '../types';
import { PageRenderer } from './PageRenderer';
import { useAttempt, useNow } from './useAttempt';

const SECTION_ICON: Record<SectionId, typeof BookOpen> = { reading: BookOpen, listening: Headphones, writing: PenLine, speaking: Mic };

function SectionStepper({ attempt }: { attempt: Attempt }) {
  return (
    <ol className="flex items-center gap-1 overflow-x-auto text-xs" aria-label="Progreso por secciones">
      {attempt.sections.map((s, i) => {
        const Icon = SECTION_ICON[s.id];
        const current = i === attempt.cursor.section;
        return (
          <li key={s.id} className="flex items-center gap-1">
            {i > 0 && <span className="h-px w-3 bg-line" aria-hidden />}
            <span
              aria-current={current ? 'step' : undefined}
              className={cn(
                'flex items-center gap-1 rounded-full px-2 py-1 font-medium',
                current ? 'bg-accent-soft text-accent' : s.status === 'done' ? 'text-ok' : s.status === 'skipped' ? 'text-muted line-through' : 'text-muted',
              )}
            >
              {s.status === 'done' ? <CheckCircle2 className="h-3.5 w-3.5" /> : <Icon className="h-3.5 w-3.5" />}
              {sectionName(s.id)}
            </span>
          </li>
        );
      })}
    </ol>
  );
}

function TimerDisplay({ attempt, now }: { attempt: Attempt; now: number }) {
  const mod = currentModule(attempt);
  const announced = useRef<Set<number>>(new Set());
  const [announce, setAnnounce] = useState('');
  const left = mod ? remainingMs(mod.timer, now) : null;
  useEffect(() => {
    if (left == null) return;
    for (const mark of [300_000, 60_000]) {
      if (left <= mark && left > mark - 2000 && !announced.current.has(mark)) {
        announced.current.add(mark);
        setAnnounce(`Quedan ${mark / 60_000} minuto${mark > 60_000 ? 's' : ''}.`);
      }
    }
  }, [left]);
  if (!mod) return null;
  if (left == null) {
    return (
      <span className="flex items-center gap-1.5 text-sm text-muted">
        <Clock className="h-4 w-4" aria-hidden /> Sin límite
      </span>
    );
  }
  const warn = left <= 60_000 ? 'bad' : left <= 300_000 ? 'warn' : null;
  return (
    <>
      <span
        className={cn(
          'flex items-center gap-1.5 rounded-lg px-2.5 py-1 font-mono text-base font-semibold tabular-nums',
          warn === 'bad' ? 'bg-bad-soft text-bad' : warn === 'warn' ? 'bg-warn-soft text-warn' : 'bg-surface-3 text-ink',
        )}
        role="timer"
        aria-label={`Tiempo restante ${formatClock(left)}`}
      >
        <Clock className="h-4 w-4" aria-hidden />
        {formatClock(left)}
      </span>
      <span className="sr-only" aria-live="assertive">
        {announce}
      </span>
    </>
  );
}

/** Panel de revisión: estado de cada pregunta del módulo. */
function ReviewGrid({ attempt, onGo, disabledNav }: { attempt: Attempt; onGo: (i: number) => void; disabledNav: boolean }) {
  const mod = currentModule(attempt)!;
  let n = 0;
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3 text-xs text-muted">
        <span className="flex items-center gap-1"><span className="h-3 w-3 rounded bg-accent" /> Respondida</span>
        <span className="flex items-center gap-1"><span className="h-3 w-3 rounded border border-line bg-surface" /> Pendiente</span>
        <span className="flex items-center gap-1"><span className="h-3 w-3 rounded bg-warn" /> Parcial</span>
        <span className="flex items-center gap-1"><Flag className="h-3 w-3 fill-current text-warn" /> Marcada</span>
      </div>
      <div className="grid grid-cols-5 gap-2 sm:grid-cols-8">
        {mod.pages.map((p, i) => {
          const st = pageStatus(attempt, p);
          const flagged = p.itemIds.some((id) => attempt.flags[id]);
          const label = st === 'info' ? 'Audio' : p.itemIds.length > 1 ? `${n + 1}–${n + p.itemIds.length}` : String(n + 1);
          n += p.itemIds.length;
          const can = !disabledNav && canGoTo(attempt, i);
          return (
            <button
              key={p.id}
              type="button"
              disabled={!can}
              onClick={() => onGo(i)}
              aria-current={i === attempt.cursor.page ? 'true' : undefined}
              aria-label={`Ir a ${label}: ${st === 'answered' ? 'respondida' : st === 'partial' ? 'parcial' : st === 'info' ? 'audio' : 'pendiente'}${flagged ? ', marcada' : ''}`}
              className={cn(
                'relative flex h-10 items-center justify-center rounded-lg border text-xs font-semibold',
                st === 'answered' && 'border-accent bg-accent text-white dark:text-navy-950',
                st === 'partial' && 'border-warn bg-warn-soft text-warn',
                st === 'unanswered' && 'border-line bg-surface text-ink',
                st === 'info' && 'border-dashed border-line bg-surface-2 text-muted',
                i === attempt.cursor.page && 'ring-2 ring-offset-1 ring-accent ring-offset-surface',
                !can && 'cursor-not-allowed opacity-60',
              )}
            >
              {label}
              {flagged && <Flag className="absolute -right-1 -top-1 h-3.5 w-3.5 fill-current text-warn" aria-hidden />}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ModuleView({ attempt, apply, saveState }: { attempt: Attempt; apply: ReturnType<typeof useAttempt>['apply']; saveState: string }) {
  const { bank } = useBank();
  const toast = useToast();
  const now = useNow(250);
  const section = currentSection(attempt)!;
  const mod = currentModule(attempt)!;
  const page = currentPage(attempt);
  const [gate, setGate] = useState<string | null>(null);
  const [reviewOpen, setReviewOpen] = useState(false);
  const [confirmFinish, setConfirmFinish] = useState(false);
  const [confirmSkip, setConfirmSkip] = useState(false);
  const counts = moduleCounts(attempt, mod);
  const nav = navigationMode(attempt);
  const practice = attempt.config.mode === 'practice';
  const isLast = attempt.cursor.page >= mod.pages.length - 1;
  const timedOut = useRef(false);

  // Fin automático por tiempo.
  useEffect(() => {
    const left = remainingMs(mod.timer, now);
    if (left !== null && left <= 0 && !timedOut.current && mod.status === 'active' && !attempt.interrupted) {
      timedOut.current = true;
      apply((a, n) => finishModule(a, bank, n, 'timeout'), { immediate: true });
      toast('Tiempo agotado: tus respuestas se han guardado.', 'warn');
    }
  }, [now, mod, apply, bank, toast, attempt.interrupted]);

  const finish = useCallback(() => apply((a, n) => finishModule(a, bank, n, 'submitted'), { immediate: true }), [apply, bank]);
  const next = useCallback(() => {
    const a = attempt;
    if (a.cursor.page >= currentModule(a)!.pages.length - 1) {
      if (section.id === 'speaking') finish();
      else setConfirmFinish(true);
      return;
    }
    apply((x, n) => goToPage(x, x.cursor.page + 1, n));
  }, [attempt, apply, finish, section.id]);

  const onNextClick = () => {
    if (gate) return;
    const unanswered = page && page.itemIds.length > 0 && pageStatus(attempt, page) === 'unanswered';
    if (nav === 'forward-only' && unanswered && !isLast) return setConfirmSkip(true);
    next();
  };

  // Atajos de teclado: Alt+→ / Alt+←.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!e.altKey) return;
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        onNextClick();
      } else if (e.key === 'ArrowLeft' && canGoTo(attempt, attempt.cursor.page - 1)) {
        e.preventDefault();
        apply((x, n) => goToPage(x, x.cursor.page - 1, n));
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  const set = page ? bank.setById.get(page.setId) : undefined;
  const questionNumber = useMemo(() => {
    let n = 1;
    for (let i = 0; i < attempt.cursor.page; i++) n += mod.pages[i]!.itemIds.length;
    return n;
  }, [attempt.cursor.page, mod.pages]);

  return (
    <div className="flex min-h-[calc(100dvh-3.5rem)] flex-col">
      <div className="sticky top-14 z-20 border-b border-line bg-surface/95 px-4 py-2 backdrop-blur sm:px-6">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="text-sm font-semibold text-ink">
              {sectionName(section.id)} · {mod.title}
              {practice && mod.variant && <Badge className="ml-2" tone="accent">Ruta {mod.variant === 'upper' ? 'superior' : 'inferior'}</Badge>}
            </p>
            <p className="text-xs text-muted">
              {counts.answered}/{counts.total} respondidas · {counts.flagged} marcadas · Página {attempt.cursor.page + 1} de {mod.pages.length}
              {nav === 'forward-only' && ' · Solo avance'}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden text-xs text-muted sm:inline" aria-live="polite">
              <Save className="mr-1 inline h-3 w-3" />
              {saveState === 'saving' ? 'Guardando…' : saveState === 'error' ? 'Error al guardar' : 'Guardado'}
            </span>
            <TimerDisplay attempt={attempt} now={now} />
            {practice && (
              <Button variant="ghost" size="icon" aria-label="Pausar" title="Pausar" onClick={() => apply((a, n) => pauseAttempt(a, n), { immediate: true })}>
                <Pause className="h-4 w-4" />
              </Button>
            )}
            <Button variant="outline" size="sm" aria-label="Revisar" onClick={() => setReviewOpen(true)} icon={<Grid3x3 className="h-4 w-4" />}>
              <span className="hidden sm:inline">Revisar</span>
            </Button>
          </div>
        </div>
        <ProgressBar className="mx-auto mt-2 max-w-7xl" value={counts.answered} max={counts.total || 1} label="Preguntas respondidas" />
      </div>

      <div className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6">
        {page && set ? (
          <PageRenderer key={page.id} attempt={attempt} page={page} set={set} now={now} apply={apply} setGate={setGate} onAdvance={next} questionNumber={questionNumber} />
        ) : (
          <EmptyState title="Este módulo no tiene contenido" description="El banco no tenía suficientes preguntas para este módulo. Puedes finalizarlo y continuar." />
        )}
      </div>

      {section.id !== 'speaking' && (
        <div className="sticky bottom-0 z-20 border-t border-line bg-surface/95 px-4 py-3 backdrop-blur sm:px-6">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-3">
            <Button variant="outline" disabled={!canGoTo(attempt, attempt.cursor.page - 1)} onClick={() => apply((x, n) => goToPage(x, x.cursor.page - 1, n))} icon={<ArrowLeft className="h-4 w-4" />}>
              Anterior
            </Button>
            {gate && <p className="hidden text-sm text-warn sm:block">{gate}</p>}
            {isLast ? (
              <Button onClick={() => setConfirmFinish(true)} disabled={!!gate} icon={<CheckCircle2 className="h-4 w-4" />}>
                Finalizar {section.modules.length > 1 ? 'módulo' : 'sección'}
              </Button>
            ) : (
              <Button onClick={onNextClick} disabled={!!gate}>
                Siguiente <ArrowRight className="h-4 w-4" />
              </Button>
            )}
          </div>
          {gate && <p className="mx-auto mt-1 max-w-7xl text-center text-xs text-warn sm:hidden">{gate}</p>}
        </div>
      )}
      {section.id === 'speaking' && (
        <div className="border-t border-line px-4 py-3 text-center">
          <Button variant="ghost" size="sm" onClick={() => setConfirmFinish(true)}>
            Finalizar sección de Speaking
          </Button>
        </div>
      )}

      <Dialog open={reviewOpen} onOpenChange={setReviewOpen} title="Revisión del módulo" description={nav === 'forward-only' ? 'En esta sección solo puedes avanzar; el panel muestra el estado de cada pregunta.' : 'Selecciona una pregunta para ir a ella.'} size="lg">
        <ReviewGrid
          attempt={attempt}
          disabledNav={false}
          onGo={(i) => {
            apply((x, n) => goToPage(x, i, n));
            setReviewOpen(false);
          }}
        />
      </Dialog>

      <ConfirmDialog
        open={confirmFinish}
        onOpenChange={setConfirmFinish}
        title={`¿Finalizar ${section.modules.length > 1 ? 'el módulo' : 'la sección'}?`}
        confirmLabel="Finalizar"
        onConfirm={finish}
        description={
          <span>
            {counts.unanswered > 0 ? <strong className="text-warn">{counts.unanswered} pregunta(s) sin responder. </strong> : 'Has respondido todas las preguntas. '}
            {counts.flagged > 0 && <>{counts.flagged} marcada(s) para revisión. </>}
            No podrás volver a este {section.modules.length > 1 ? 'módulo' : 'apartado'}.
          </span>
        }
      />
      <ConfirmDialog
        open={confirmSkip}
        onOpenChange={setConfirmSkip}
        title="No has respondido"
        confirmLabel="Continuar sin responder"
        cancelLabel="Responder"
        onConfirm={next}
        description="En esta sección no podrás volver a esta pregunta."
      />
    </div>
  );
}

function SectionIntro({ attempt, apply }: { attempt: Attempt; apply: ReturnType<typeof useAttempt>['apply'] }) {
  const section = currentSection(attempt)!;
  const spec = attempt.blueprint.sections.find((s) => s.id === section.id);
  const { state } = useMic();
  const [skip, setSkip] = useState(false);
  const Icon = SECTION_ICON[section.id];
  const totalItems = section.modules.reduce((s, m) => s + m.itemIds.length, 0);
  const minutes = section.modules.reduce((s, m) => s + (m.timer.limitMs ?? 0), 0) / 60_000;
  // En la versión publicada no hay micrófono: se responde dictando o escribiendo.
  const needsMic = section.id === 'speaking' && !STATIC_BUILD;
  const micOk = state.status === 'active';
  const warnings = section.modules.flatMap((m) => m.warnings);
  return (
    <div className="mx-auto max-w-3xl space-y-6 px-4 py-8">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-soft text-accent">
          <Icon className="h-6 w-6" aria-hidden />
        </div>
        <div>
          <h1 className="text-2xl font-semibold text-ink">{sectionName(section.id)}</h1>
          <p className="text-sm text-muted">
            {spec?.description ?? 'Práctica personalizada'} {minutes > 0 && `· ${Math.round(minutes)} min`} {totalItems > 0 && `· ${totalItems}${section.modules.some((m) => m.setIds.length === 0) ? '+' : ''} ítems`}
          </p>
        </div>
      </div>
      <div className="rounded-xl border border-line bg-surface p-5">
        <h2 className="mb-2 text-sm font-semibold text-ink">Instrucciones</h2>
        <ul className="list-disc space-y-1.5 pl-5 text-sm text-ink-2">
          {(spec?.instructions ?? ['Responde a las preguntas seleccionadas. Puedes navegar libremente.']).filter((i) => !(STATIC_BUILD && /micrófono|grabaci/i.test(i))).map((i) => (
            <li key={i}>{i}</li>
          ))}
          {attempt.config.mode === 'practice' && <li>Modo práctica: {attempt.config.instantFeedback ? 'puedes comprobar cada respuesta y ver la explicación.' : 'las soluciones se muestran al final.'}</li>}
          {attempt.config.mode === 'exam' && <li>Modo examen: las soluciones se ocultan hasta entregar el intento.</li>}
          <li>Atajos: Alt + → (siguiente), Alt + ← (anterior).</li>
        </ul>
      </div>
      {warnings.length > 0 && (
        <Alert tone="warn" title="Contenido ajustado">
          {warnings.join(' ')}
        </Alert>
      )}
      {needsMic && (
        <div className="rounded-xl border border-line bg-surface p-5">
          <h2 className="mb-3 text-sm font-semibold text-ink">Comprobación del micrófono</h2>
          <MicSetupPanel compact />
        </div>
      )}
      {section.id === 'speaking' && STATIC_BUILD && (
        <div className="space-y-3 rounded-xl border border-line bg-surface p-5">
          <h2 className="text-sm font-semibold text-ink">Cómo responder en esta versión</h2>
          <StaticMicNotice />
          <details className="rounded-lg border border-line bg-surface-2 p-3 text-sm">
            <summary className="cursor-pointer font-medium text-ink">Opcional: dictar o escribir tus respuestas (para evaluar el contenido)</summary>
            <div className="mt-2">
              <DictationCheck className="border-0 bg-transparent p-0" />
            </div>
          </details>
        </div>
      )}
      <div className="flex flex-wrap gap-3">
        <Button size="lg" onClick={() => apply((a, n) => beginSection(a, n), { immediate: true })} disabled={needsMic && !micOk} icon={<Play className="h-5 w-5" />}>
          Comenzar {sectionName(section.id)}
        </Button>
        {needsMic && !micOk && (
          <Button size="lg" variant="ghost" onClick={() => setSkip(true)}>
            Continuar sin micrófono
          </Button>
        )}
      </div>
      <ConfirmDialog
        open={skip}
        onOpenChange={setSkip}
        title="¿Omitir Speaking?"
        tone="danger"
        confirmLabel="Omitir sección"
        description="La sección de Speaking quedará como no evaluada y el intento no tendrá banda global."
        onConfirm={() => apply((a, n) => skipSection(a, 'Omitida: micrófono no disponible o no autorizado.', n), { immediate: true })}
      />
    </div>
  );
}

function ModuleIntro({ attempt, apply }: { attempt: Attempt; apply: ReturnType<typeof useAttempt>['apply'] }) {
  const mod = currentModule(attempt)!;
  const section = currentSection(attempt)!;
  return (
    <div className="mx-auto max-w-2xl space-y-6 px-4 py-12 text-center">
      <CheckCircle2 className="mx-auto h-10 w-10 text-ok" aria-hidden />
      <h1 className="text-2xl font-semibold text-ink">
        {sectionName(section.id)}: {mod.title}
      </h1>
      <p className="text-ink-2">
        Tus respuestas anteriores se han guardado. {mod.timer.limitMs ? `Este apartado dura ${formatDuration(mod.timer.limitMs)}.` : ''}
        {section.route && ' El contenido de este módulo se ha seleccionado según tu rendimiento.'}
      </p>
      {attempt.config.mode === 'practice' && section.route && (
        <Badge tone="accent">
          Ruta {section.route === 'upper' ? 'superior (más difícil)' : 'inferior'} · aciertos en el módulo 1: {Math.round((section.routingScore ?? 0) * 100)} %
        </Badge>
      )}
      <Button size="lg" onClick={() => apply((a, n) => beginModule(a, n), { immediate: true })} icon={<Play className="h-5 w-5" />}>
        Continuar
      </Button>
    </div>
  );
}

function SectionEnd({ attempt, apply, onSubmitAll }: { attempt: Attempt; apply: ReturnType<typeof useAttempt>['apply']; onSubmitAll: () => void }) {
  const { bank } = useBank();
  const { mic } = useMic();
  const section = currentSection(attempt)!;
  const last = attempt.cursor.section >= attempt.sections.length - 1;
  const [confirm, setConfirm] = useState(false);
  useEffect(() => {
    if (section.id === 'speaking') mic.release();
  }, [section.id, mic]);
  return (
    <div className="mx-auto max-w-2xl space-y-6 px-4 py-12 text-center">
      <CheckCircle2 className="mx-auto h-10 w-10 text-ok" aria-hidden />
      <h1 className="text-2xl font-semibold text-ink">{section.status === 'skipped' ? `${sectionName(section.id)} omitida` : `${sectionName(section.id)} completada`}</h1>
      <p className="text-ink-2">{last ? 'Has llegado al final. Entrega el examen para ver tus resultados.' : 'Tómate un respiro si lo necesitas. La siguiente sección empezará cuando pulses "Continuar".'}</p>
      {last ? (
        <Button size="lg" onClick={() => setConfirm(true)} icon={<CheckCircle2 className="h-5 w-5" />}>
          Entregar y ver resultados
        </Button>
      ) : (
        <div className="flex flex-wrap justify-center gap-3">
          <Button size="lg" onClick={() => apply((a, n) => nextSection(a, bank, n), { immediate: true })}>
            Continuar a {sectionName(attempt.sections[attempt.cursor.section + 1]!.id)} <ArrowRight className="h-5 w-5" />
          </Button>
          <Button size="lg" variant="ghost" onClick={onSubmitAll}>
            Entregar ahora
          </Button>
        </div>
      )}
      <ConfirmDialog
        open={confirm}
        onOpenChange={setConfirm}
        title="¿Entregar el examen?"
        confirmLabel="Entregar"
        description="Una vez entregado no podrás modificar tus respuestas. Podrás revisarlas con sus explicaciones."
        onConfirm={() => apply((a, n) => nextSection(a, bank, n), { immediate: true })}
      />
    </div>
  );
}

export function ExamRunnerPage() {
  const { attemptId = '' } = useParams();
  const { bank } = useBank();
  const { mic } = useMic();
  const navigate = useNavigate();
  const { attempt, status, saveState, error, apply, flush } = useAttempt(attemptId);
  const [confirmSubmit, setConfirmSubmit] = useState(false);
  const [confirmExit, setConfirmExit] = useState(false);
  const inModule = attempt?.status === 'in-progress' && attempt.cursor.stage === 'module' && !attempt.interrupted;

  // Aviso del navegador al cerrar/recargar con un módulo en curso.
  useEffect(() => {
    if (!inModule) return;
    const onBeforeUnload = (e: BeforeUnloadEvent) => {
      void flush();
      e.preventDefault();
    };
    window.addEventListener('beforeunload', onBeforeUnload);
    return () => window.removeEventListener('beforeunload', onBeforeUnload);
  }, [inModule, flush]);

  // Bloquear la navegación interna sin confirmar.
  // Se lee de una ref actualizada en el render para no usar un valor obsoleto.
  const inModuleRef = useRef(false);
  inModuleRef.current = !!inModule;
  const blocker = useBlocker(({ currentLocation, nextLocation }) => inModuleRef.current && currentLocation.pathname !== nextLocation.pathname);

  // Detener el micrófono al salir del examen.
  useEffect(() => () => mic.release(), [mic]);

  if (status === 'loading') {
    return (
      <div className="flex min-h-dvh items-center justify-center">
        <Spinner label="Cargando intento…" />
      </div>
    );
  }
  if (status === 'missing' || status === 'error' || !attempt) {
    return (
      <div className="mx-auto max-w-xl p-8">
        <EmptyState title="Intento no encontrado" description={error ?? 'Puede que se haya eliminado o que pertenezca a otro navegador.'} action={<Link to="/"><Button>Volver al inicio</Button></Link>} />
      </div>
    );
  }
  if (attempt.status === 'completed' || attempt.cursor.stage === 'finished') return <Navigate to={`/results/${attempt.id}`} replace />;

  const submitAll = () => apply((a, n) => submitAttempt(a, bank, n), { immediate: true });

  return (
    <div className="min-h-dvh bg-surface-2">
      <header className="sticky top-0 z-30 flex h-14 items-center justify-between gap-3 border-b border-line bg-navy-900 px-4 text-white sm:px-6 dark:bg-navy-950">
        <div className="flex min-w-0 items-center gap-3">
          <BookOpen className="h-5 w-5 shrink-0 text-sky-300" aria-hidden />
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">{attempt.blueprint.name}</p>
            <p className="text-[11px] text-sky-200">{attempt.config.mode === 'exam' ? 'Modo examen' : 'Modo práctica'}</p>
          </div>
        </div>
        <div className="hidden md:block [&_span]:text-sky-100 [&_[aria-current]]:bg-white/15 [&_[aria-current]]:text-white">
          <SectionStepper attempt={attempt} />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="onDark" size="sm" onClick={() => setConfirmSubmit(true)}>
            Entregar
          </Button>
          <Button variant="onDark" size="sm" aria-label="Salir" onClick={() => setConfirmExit(true)} icon={<LogOut className="h-4 w-4" />}>
            <span className="hidden sm:inline">Salir</span>
          </Button>
        </div>
      </header>

      {status === 'conflict' && (
        <div className="mx-auto max-w-3xl px-4 pt-4">
          <Alert tone="bad" title="Este intento se modificó en otra pestaña" action={<Button size="sm" onClick={() => window.location.reload()}>Recargar</Button>}>
            Para no sobrescribir datos más recientes, esta pestaña dejó de guardar. Recarga para continuar con la versión actual.
          </Alert>
        </div>
      )}
      {saveState === 'error' && status !== 'conflict' && (
        <div className="mx-auto max-w-3xl px-4 pt-4">
          <Alert tone="warn" title="No se pudo guardar">
            {error ?? 'Revisa el espacio disponible del navegador. Seguiremos intentándolo con cada cambio.'}
          </Alert>
        </div>
      )}

      {attempt.interrupted ? (
        <div className="mx-auto max-w-xl space-y-5 px-4 py-16 text-center">
          <Pause className="mx-auto h-10 w-10 text-accent" aria-hidden />
          <h1 className="text-2xl font-semibold text-ink">Sesión en pausa</h1>
          <p className="text-ink-2">
            Tus respuestas están guardadas. El temporizador se detuvo en el último guardado
            {currentModule(attempt)?.timer.limitMs ? ` (quedan ${formatClock(remainingMs(currentModule(attempt)!.timer, Date.now()) ?? 0)})` : ''}.
          </p>
          <Button size="lg" onClick={() => apply((a, n) => resumeAttempt(a, n), { immediate: true })} icon={<Play className="h-5 w-5" />}>
            Reanudar
          </Button>
        </div>
      ) : (
        <>
          {attempt.cursor.stage === 'section-intro' && <SectionIntro attempt={attempt} apply={apply} />}
          {attempt.cursor.stage === 'module-intro' && <ModuleIntro attempt={attempt} apply={apply} />}
          {attempt.cursor.stage === 'module' && <ModuleView attempt={attempt} apply={apply} saveState={saveState} />}
          {attempt.cursor.stage === 'section-end' && <SectionEnd attempt={attempt} apply={apply} onSubmitAll={() => setConfirmSubmit(true)} />}
        </>
      )}

      <ConfirmDialog
        open={confirmSubmit}
        onOpenChange={setConfirmSubmit}
        title="¿Entregar el examen ahora?"
        tone="danger"
        confirmLabel="Entregar"
        description="Las secciones no completadas se marcarán como omitidas y no podrás seguir respondiendo."
        onConfirm={submitAll}
      />
      <ConfirmDialog
        open={confirmExit || blocker.state === 'blocked'}
        onOpenChange={(v) => {
          setConfirmExit(v);
          if (!v && blocker.state === 'blocked') blocker.reset?.();
        }}
        title="¿Salir del examen?"
        confirmLabel="Guardar y salir"
        description="Tu progreso se guarda y el temporizador se pausará. Podrás reanudar el intento desde Inicio o Historial."
        onConfirm={async () => {
          apply((a, n) => pauseAttempt(a, n), { immediate: true });
          await flush();
          mic.release();
          if (blocker.state === 'blocked') blocker.proceed?.();
          else navigate('/');
        }}
      >
        {attempt.config.mode === 'exam' && (
          <p className="flex items-center gap-2 text-xs text-warn">
            <AlertTriangle className="h-4 w-4" /> En el examen oficial no es posible pausar; úsalo solo si es necesario.
          </p>
        )}
      </ConfirmDialog>
    </div>
  );
}
