import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { ArrowRight, BookOpen, Clock, GraduationCap, Headphones, History, Library, Lightbulb, Mic, PenLine, Play, RotateCcw, Settings, Sparkles, Zap } from 'lucide-react';
import { useBank, useCapabilities, useSettings } from '@/app/context';
import { Alert, Badge, Button, Card, CardHeader, Spinner, Stat } from '@/components/ui';
import { LineChart } from '@/components/charts/Charts';
import { formatBand, formatDate } from '@/lib/format';
import type { Attempt } from '@/modules/exam-engine/types';
import { listAttempts, listRecordingMeta } from '@/modules/storage/repositories';
import { sectionName } from '@/modules/scoring/results';
import type { SectionId } from '@/modules/question-bank/types';

export const SECTION_INFO: Record<SectionId, { icon: typeof BookOpen; color: number; blurb: string }> = {
  reading: { icon: BookOpen, color: 0, blurb: 'Complete the Words, textos cotidianos y lecturas académicas.' },
  listening: { icon: Headphones, color: 1, blurb: 'Respuestas breves, conversaciones, anuncios y clases.' },
  writing: { icon: PenLine, color: 2, blurb: 'Build a Sentence, correo y discusión académica.' },
  speaking: { icon: Mic, color: 3, blurb: 'Listen and Repeat y entrevista grabada.' },
};

export function bandSeries(attempts: Attempt[]) {
  const done = attempts.filter((a) => a.status === 'completed' && a.results).sort((a, b) => a.createdAt - b.createdAt).slice(-12);
  const xLabels = done.map((a) => new Intl.DateTimeFormat('es', { day: '2-digit', month: 'short' }).format(a.createdAt));
  const series = (['reading', 'listening', 'writing', 'speaking'] as SectionId[]).map((id, i) => ({
    key: id,
    label: sectionName(id),
    colorIndex: i,
    values: done.map((a) => a.results!.sections.find((s) => s.id === id)?.band ?? null),
  }));
  return { xLabels, series: series.filter((s) => s.values.some((v) => v != null)) };
}

export function DashboardPage() {
  const navigate = useNavigate();
  const { bank } = useBank();
  const { caps } = useCapabilities();
  const { storageError } = useSettings();
  const [attempts, setAttempts] = useState<Attempt[] | null>(null);
  const [recordings, setRecordings] = useState(0);

  useEffect(() => {
    listAttempts().then(setAttempts).catch(() => setAttempts([]));
    listRecordingMeta().then((r) => setRecordings(r.length)).catch(() => undefined);
  }, []);

  const inProgress = attempts?.find((a) => a.status === 'in-progress');
  const completed = attempts?.filter((a) => a.status === 'completed') ?? [];
  const lastFull = completed.find((a) => a.config.kind === 'full' && a.results?.overallBand != null);
  const chart = useMemo(() => bandSeries(attempts ?? []), [attempts]);
  const accuracy = useMemo(() => {
    let earned = 0;
    let max = 0;
    for (const a of completed.slice(0, 10)) for (const s of a.results?.sections ?? []) {
      earned += s.objective.earned;
      max += s.objective.max;
    }
    return max ? earned / max : null;
  }, [completed]);

  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-2xl bg-navy-900 text-white shadow-sm dark:bg-navy-950 dark:ring-1 dark:ring-line">
        <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <Badge className="bg-white/10 text-sky-100">Formato vigente desde el 21 de enero de 2026</Badge>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Prepara el TOEFL iBT con simulaciones realistas</h1>
            <p className="mt-3 max-w-xl text-sky-100/85">
              Reading y Listening adaptativos, Writing con corrección por rúbrica y Speaking con grabación y análisis. Todo funciona en tu navegador, sin registro.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button size="lg" variant="light" onClick={() => navigate('/exam/new')} icon={<Play className="h-5 w-5" />}>
                Simulación completa
              </Button>
              <Button size="lg" variant="onDark" onClick={() => navigate('/exam/new?blueprint=toefl-ibt-2026-quick&mode=practice')} icon={<Zap className="h-5 w-5" />}>
                Simulación breve
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 self-end text-sm">
            {[
              ['Reading', '≈27 min · adaptativo'],
              ['Listening', '≈27 min · adaptativo'],
              ['Writing', '≈23 min · 12 ítems'],
              ['Speaking', '≈8 min · 11 ítems'],
            ].map(([t, d]) => (
              <div key={t} className="rounded-xl bg-white/8 p-3 ring-1 ring-white/10">
                <p className="font-semibold">{t}</p>
                <p className="text-xs text-sky-100/75">{d}</p>
              </div>
            ))}
            <p className="col-span-2 text-xs text-sky-100/70">Escala de bandas 1–6 (MCER). Las bandas que muestra la aplicación son estimaciones orientativas, no puntuaciones oficiales de ETS.</p>
          </div>
        </div>
      </section>

      {storageError && (
        <Alert tone="warn" title="Almacenamiento local no disponible">
          {storageError} Puedes practicar, pero el progreso no se conservará (p. ej. en modo privado).
        </Alert>
      )}

      {inProgress && (
        <Alert
          tone="info"
          title="Tienes un intento sin terminar"
          action={
            <Link to={`/exam/${inProgress.id}`}>
              <Button size="sm" icon={<RotateCcw className="h-4 w-4" />}>
                Reanudar
              </Button>
            </Link>
          }
        >
          {inProgress.blueprint.name} · {inProgress.config.mode === 'exam' ? 'modo examen' : 'modo práctica'} · iniciado el {formatDate(inProgress.createdAt)}
        </Alert>
      )}

      <section aria-label="Estadísticas" className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Stat label="Intentos completados" value={attempts ? completed.length : '…'} icon={<History className="h-4 w-4" />} />
        <Stat label="Última banda global" value={formatBand(lastFull?.results?.overallBand)} hint={lastFull ? `${lastFull.results?.cefr ?? ''} · estimación` : 'Completa una simulación'} icon={<Sparkles className="h-4 w-4" />} />
        <Stat label="Aciertos objetivos" value={accuracy == null ? '—' : `${Math.round(accuracy * 100)} %`} hint="Últimos 10 intentos" icon={<GraduationCap className="h-4 w-4" />} />
        <Stat label="Grabaciones" value={recordings} hint="Speaking guardado localmente" icon={<Mic className="h-4 w-4" />} />
      </section>

      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <Card>
          <CardHeader title="Evolución por sección" description="Banda estimada (1–6) en tus intentos completados." actions={<Link to="/history" className="text-sm font-medium text-accent hover:underline">Ver historial</Link>} />
          <div className="p-5">
            {attempts === null ? <Spinner /> : <LineChart title="Banda estimada por intento" xLabels={chart.xLabels} series={chart.series} yMin={1} yMax={6} yStep={1} emptyText="Completa una práctica para ver tu evolución." />}
          </div>
        </Card>
        <Card>
          <CardHeader title="Práctica por sección" description="Módulos cronometrados o libres." />
          <ul className="divide-y divide-line">
            {(Object.keys(SECTION_INFO) as SectionId[]).map((id) => {
              const info = SECTION_INFO[id];
              const Icon = info.icon;
              return (
                <li key={id}>
                  <Link to={`/exam/new?section=${id}`} className="flex items-center gap-3 px-5 py-3 hover:bg-surface-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-soft text-accent">
                      <Icon className="h-4 w-4" aria-hidden />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-medium text-ink">{sectionName(id)}</span>
                      <span className="block truncate text-xs text-muted">{info.blurb}</span>
                    </span>
                    <ArrowRight className="h-4 w-4 text-muted" aria-hidden />
                  </Link>
                </li>
              );
            })}
          </ul>
        </Card>
      </div>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" aria-label="Accesos">
        {[
          { to: '/speaking', icon: Mic, title: 'Estudio de Speaking', text: 'Micrófono, grabación, transcripción e informes.' },
          { to: '/writing', icon: PenLine, title: 'Estudio de Writing', text: 'Editor con autoguardado, borradores y rúbricas.' },
          { to: '/bank', icon: Library, title: 'Banco de preguntas', text: `${bank.sets.length} sets · ${bank.items.length} ítems originales.` },
          { to: '/tips', icon: Lightbulb, title: 'Consejos', text: 'Estrategias por sección y escala de puntuación.' },
        ].map(({ to, icon: Icon, title, text }) => (
          <Link key={to} to={to} className="group rounded-xl border border-line bg-surface p-4 transition-colors hover:border-accent">
            <Icon className="h-5 w-5 text-accent" aria-hidden />
            <p className="mt-2 font-semibold text-ink group-hover:text-accent">{title}</p>
            <p className="mt-1 text-sm text-muted">{text}</p>
          </Link>
        ))}
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader title="Intentos recientes" actions={<Link to="/history" className="text-sm font-medium text-accent hover:underline">Todos</Link>} />
          {attempts === null ? (
            <div className="p-5"><Spinner /></div>
          ) : attempts.length === 0 ? (
            <p className="p-5 text-sm text-muted">Aún no hay intentos. Empieza con una simulación breve o una práctica por sección.</p>
          ) : (
            <ul className="divide-y divide-line">
              {attempts.slice(0, 5).map((a) => (
                <li key={a.id}>
                  <Link to={a.status === 'completed' ? `/results/${a.id}` : `/exam/${a.id}`} className="flex items-center justify-between gap-3 px-5 py-3 hover:bg-surface-3">
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-medium text-ink">
                        {a.config.kind === 'full' ? a.blueprint.name : a.config.kind === 'custom' ? 'Práctica personalizada' : `Práctica: ${a.sections.map((s) => sectionName(s.id)).join(', ')}`}
                      </span>
                      <span className="block text-xs text-muted">{formatDate(a.createdAt)}</span>
                    </span>
                    {a.status === 'completed' ? (
                      <Badge tone={a.results?.overallBand != null ? 'brand' : 'neutral'}>{a.results?.overallBand != null ? `Banda ${formatBand(a.results.overallBand)}` : 'Completado'}</Badge>
                    ) : (
                      <Badge tone="warn"><Clock className="h-3 w-3" /> En curso</Badge>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Card>
        <Card>
          <CardHeader title="Servicios de evaluación" description="Estado de la configuración del servidor local." actions={<Link to="/settings" className="text-sm text-accent hover:underline"><Settings className="inline h-4 w-4" /></Link>} />
          <ul className="space-y-2 p-5 text-sm">
            {caps === null ? (
              <li className="text-muted">Servidor local no disponible: la app funciona sin transcripción ni IA (análisis local y rúbricas).</li>
            ) : (
              ([
                ['Transcripción', caps.stt],
                ['Pronunciación', caps.pronunciation],
                ['Evaluación con IA', caps.evaluator],
              ] as const).map(([label, info]) => (
                <li key={label} className="flex items-center justify-between gap-3">
                  <span className="text-ink">{label}</span>
                  <Badge tone={info.configured ? 'ok' : 'neutral'}>{info.configured ? `${info.provider}${info.model ? ` · ${info.model}` : ''}` : 'No configurado'}</Badge>
                </li>
              ))
            )}
          </ul>
        </Card>
      </div>
    </div>
  );
}
