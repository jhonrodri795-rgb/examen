import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router';
import { Clock, Eye, GitCompare, History, Play, Trash2 } from 'lucide-react';
import { useToast } from '@/app/context';
import { Badge, Button, Card, CardHeader, ConfirmDialog, EmptyState, PageHeader, Select, Spinner } from '@/components/ui';
import { BarChart, LineChart } from '@/components/charts/Charts';
import { formatBand, formatDate, formatDuration } from '@/lib/format';
import type { Attempt } from '@/modules/exam-engine/types';
import { deleteAttempt, listAttempts } from '@/modules/storage/repositories';
import { ratio, sectionName } from '@/modules/scoring/results';
import { SKILL_LABEL } from '@/modules/scoring/advice';
import type { Skill } from '@/modules/question-bank/types';
import { attemptTitle as formAttemptTitle } from '@/modules/exam-engine/forms-progress';
import { bandSeries } from '../dashboard/DashboardPage';

function attemptTitle(a: Attempt) {
  if (a.config.kind === 'full') return formAttemptTitle(a);
  if (a.config.kind === 'custom') return 'Práctica personalizada';
  return `Práctica: ${a.sections.map((s) => sectionName(s.id)).join(', ')}`;
}

export function HistoryPage() {
  const toast = useToast();
  const [attempts, setAttempts] = useState<Attempt[] | null>(null);
  const [toDelete, setToDelete] = useState<Attempt | null>(null);
  const [cmpA, setCmpA] = useState('');
  const [cmpB, setCmpB] = useState('');

  const load = () => listAttempts().then(setAttempts).catch(() => setAttempts([]));
  useEffect(() => {
    void load();
  }, []);

  const completed = useMemo(() => (attempts ?? []).filter((a) => a.status === 'completed' && a.results), [attempts]);
  const chart = useMemo(() => bandSeries(attempts ?? []), [attempts]);
  const skillProgress = useMemo(() => {
    const acc = new Map<Skill, { earned: number; max: number; total: number }>();
    for (const a of completed) for (const s of a.results!.sections) for (const [k, v] of Object.entries(s.bySkill)) {
      const cur = acc.get(k as Skill) ?? { earned: 0, max: 0, total: 0 };
      cur.earned += v!.earned;
      cur.max += v!.max;
      cur.total += v!.total;
      acc.set(k as Skill, cur);
    }
    return [...acc.entries()].map(([k, v]) => ({ key: k, label: SKILL_LABEL[k], value: v.max ? v.earned / v.max : 0, detail: `${v.total}` })).sort((a, b) => a.value - b.value);
  }, [completed]);

  const a = completed.find((x) => x.id === cmpA);
  const b = completed.find((x) => x.id === cmpB);

  if (attempts === null) return <Spinner />;

  return (
    <div className="space-y-6">
      <PageHeader title="Historial y progreso" description="Todos tus intentos guardados en este navegador, la evolución entre intentos y la comparación de resultados." />
      {attempts.length === 0 ? (
        <EmptyState icon={<History className="h-8 w-8" />} title="Sin intentos todavía" description="Cuando completes una práctica o simulación aparecerá aquí." action={<Link to="/exam/new"><Button>Empezar</Button></Link>} />
      ) : (
        <>
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader title="Evolución de la banda estimada" />
              <div className="p-5"><LineChart title="Banda estimada por sección" xLabels={chart.xLabels} series={chart.series} yMin={1} yMax={6} yStep={1} /></div>
            </Card>
            <Card>
              <CardHeader title="Aciertos acumulados por tipo de pregunta" description="Todos los intentos completados (número de preguntas a la derecha)." />
              <div className="p-5"><BarChart title="Aciertos por habilidad" data={skillProgress} /></div>
            </Card>
          </div>

          <Card>
            <CardHeader title="Comparar intentos" icon={<GitCompare className="h-5 w-5" />} />
            <div className="space-y-4 p-5">
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  ['cmp-a', 'Intento A', cmpA, setCmpA],
                  ['cmp-b', 'Intento B', cmpB, setCmpB],
                ].map(([id, label, value, set]) => (
                  <Select
                    key={id as string}
                    id={id as string}
                    label={label as string}
                    value={value as string}
                    onChange={set as (v: string) => void}
                    options={[{ value: '', label: 'Selecciona…' }, ...completed.map((x) => ({ value: x.id, label: `${formatDate(x.createdAt)} · ${attemptTitle(x)}` }))]}
                  />
                ))}
              </div>
              {a && b && (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="text-left text-xs text-muted">
                      <tr><th className="py-1">Sección</th><th>Banda A</th><th>Banda B</th><th>Aciertos A</th><th>Aciertos B</th><th>Cambio</th></tr>
                    </thead>
                    <tbody>
                      {(['reading', 'listening', 'writing', 'speaking'] as const).map((id) => {
                        const ra = a.results!.sections.find((s) => s.id === id);
                        const rb = b.results!.sections.find((s) => s.id === id);
                        if (!ra && !rb) return null;
                        const diff = ra?.band != null && rb?.band != null ? rb.band - ra.band : null;
                        return (
                          <tr key={id} className="border-t border-line">
                            <td className="py-1.5 text-ink">{sectionName(id)}</td>
                            <td className="tabular-nums">{formatBand(ra?.band)}</td>
                            <td className="tabular-nums">{formatBand(rb?.band)}</td>
                            <td className="tabular-nums">{ra && ra.objective.max ? `${Math.round(ratio(ra.objective) * 100)} %` : '—'}</td>
                            <td className="tabular-nums">{rb && rb.objective.max ? `${Math.round(ratio(rb.objective) * 100)} %` : '—'}</td>
                            <td className={diff == null ? 'text-muted' : diff > 0 ? 'text-ok' : diff < 0 ? 'text-bad' : 'text-muted'}>{diff == null ? '—' : `${diff > 0 ? '▲ +' : diff < 0 ? '▼ ' : ''}${diff.toFixed(1)}`}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </Card>

          <Card>
            <CardHeader title="Intentos" description={`${attempts.length} en total`} />
            <ul className="divide-y divide-line">
              {attempts.map((x) => (
                <li key={x.id} className="flex flex-wrap items-center justify-between gap-3 px-5 py-3">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-ink">{attemptTitle(x)}</p>
                    <p className="text-xs text-muted">
                      {formatDate(x.createdAt)} · {x.config.mode === 'exam' ? 'examen' : 'práctica'} · {x.config.timing === 'untimed' ? 'sin tiempo' : x.config.timing === 'extended' ? 'tiempo extendido' : 'tiempo estándar'}
                      {x.results && ` · ${formatDuration(x.results.sections.reduce((s, r) => s + r.timeUsedMs, 0))}`}
                    </p>
                    {x.results && (
                      <div className="mt-1 flex flex-wrap gap-1">
                        {x.results.sections.map((s) => (
                          <Badge key={s.id} tone={s.band != null ? 'accent' : 'neutral'}>{sectionName(s.id)} {formatBand(s.band)}</Badge>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {x.status === 'completed' ? (
                      <>
                        {x.results?.overallBand != null && <Badge tone="brand">Global {formatBand(x.results.overallBand)}</Badge>}
                        <Link to={`/results/${x.id}`}><Button size="sm" variant="outline" icon={<Eye className="h-4 w-4" />}>Resultados</Button></Link>
                      </>
                    ) : (
                      <>
                        <Badge tone="warn"><Clock className="h-3 w-3" /> En curso</Badge>
                        <Link to={`/exam/${x.id}`}><Button size="sm" icon={<Play className="h-4 w-4" />}>Continuar</Button></Link>
                      </>
                    )}
                    <Button size="icon" variant="ghost" aria-label="Eliminar intento" onClick={() => setToDelete(x)}>
                      <Trash2 className="h-4 w-4 text-bad" />
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          </Card>
        </>
      )}
      <ConfirmDialog
        open={!!toDelete}
        onOpenChange={(v) => !v && setToDelete(null)}
        title="¿Eliminar este intento?"
        tone="danger"
        confirmLabel="Eliminar"
        description="Se borrarán sus respuestas, resultados y grabaciones asociadas."
        onConfirm={async () => {
          if (!toDelete) return;
          await deleteAttempt(toDelete.id);
          toast('Intento eliminado.', 'ok');
          setToDelete(null);
          void load();
        }}
      />
    </div>
  );
}
