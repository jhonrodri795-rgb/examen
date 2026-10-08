import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router';
import { ArrowLeft, Flag } from 'lucide-react';
import { useBank } from '@/app/context';
import { Badge, Button, EmptyState, PageHeader, Select, Spinner } from '@/components/ui';
import { ChoiceQuestion } from '@/components/exam/ChoiceQuestion';
import { ClozeView, PassageView } from '@/modules/reading/ui/ReadingViews';
import { AudioPlayer } from '@/modules/listening/ui/AudioPlayer';
import { BuildSentenceView, EssayPrompt } from '@/modules/writing/ui/WritingViews';
import { scoreItem } from '@/modules/scoring/score';
import { sectionName } from '@/modules/scoring/results';
import type { Page } from '@/modules/exam-engine/types';
import { useStoredAttempt } from './ResultsPage';

type Filter = 'all' | 'incorrect' | 'unanswered' | 'flagged';

export function ReviewPage() {
  const { attemptId = '' } = useParams();
  const { bank } = useBank();
  const { attempt } = useStoredAttempt(attemptId);
  const [filter, setFilter] = useState<Filter>('all');
  const [section, setSection] = useState('all');

  const pages = useMemo(() => {
    if (!attempt) return [];
    const out: { sectionId: string; moduleTitle: string; page: Page; status: string[] }[] = [];
    for (const s of attempt.sections) {
      for (const m of s.modules) {
        for (const p of m.pages) {
          const status = p.itemIds.map((id) => {
            const item = bank.itemById.get(id);
            const set = item && bank.setById.get(item.setId);
            return item && set ? scoreItem(item, set, attempt.responses[id], attempt.ratings[id]).status : 'unknown';
          });
          out.push({ sectionId: s.id, moduleTitle: m.title, page: p, status });
        }
      }
    }
    return out;
  }, [attempt, bank]);

  if (attempt === undefined) return <Spinner />;
  if (!attempt) return <EmptyState title="Intento no encontrado" />;
  if (attempt.status !== 'completed') return <EmptyState title="El intento no ha terminado" description="Las soluciones se muestran al entregar el intento." action={<Link to={`/exam/${attempt.id}`}><Button>Continuar</Button></Link>} />;

  const visible = pages.filter((p) => {
    if (section !== 'all' && p.sectionId !== section) return false;
    if (filter === 'incorrect') return p.status.some((s) => s === 'incorrect' || s === 'partial');
    if (filter === 'unanswered') return p.status.some((s) => s === 'unanswered');
    if (filter === 'flagged') return p.page.itemIds.some((id) => attempt.flags[id]);
    return p.page.itemIds.length > 0 || p.page.view === 'listen';
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Revisión de respuestas"
        description="Tu respuesta, la solución y la explicación de cada pregunta."
        actions={<Link to={`/results/${attempt.id}`}><Button variant="outline" icon={<ArrowLeft className="h-4 w-4" />}>Resultados</Button></Link>}
      />
      <div className="flex flex-wrap gap-3">
        <Select id="f-section" label="Sección" value={section} onChange={setSection} options={[{ value: 'all', label: 'Todas' }, ...attempt.sections.map((s) => ({ value: s.id, label: sectionName(s.id) }))]} />
        <Select id="f-filter" label="Mostrar" value={filter} onChange={(v) => setFilter(v as Filter)} options={[{ value: 'all', label: 'Todas' }, { value: 'incorrect', label: 'Incorrectas' }, { value: 'unanswered', label: 'Sin responder' }, { value: 'flagged', label: 'Marcadas' }]} />
      </div>
      {visible.length === 0 && <EmptyState title="No hay preguntas con este filtro" />}
      <div className="space-y-6">
        {visible.map(({ page, sectionId, moduleTitle }) => {
          const set = bank.setById.get(page.setId);
          if (!set) return null;
          const flagged = page.itemIds.some((id) => attempt.flags[id]);
          return (
            <section key={page.id} className="rounded-xl border border-line bg-surface p-5">
              <div className="mb-3 flex flex-wrap items-center gap-2 text-xs">
                <Badge tone="brand">{sectionName(sectionId as never)}</Badge>
                <Badge>{moduleTitle}</Badge>
                <Badge>{set.title}</Badge>
                {flagged && <Badge tone="warn"><Flag className="h-3 w-3" /> Marcada</Badge>}
              </div>
              {page.view === 'question' && 'questions' in set && set.task !== 'interview' && (() => {
                const q = set.questions.find((x) => x.id === page.itemIds[0])!;
                const r = attempt.responses[q.id];
                return (
                  <div className="grid gap-5 lg:grid-cols-2">
                    <div>
                      {(set.task === 'daily-life' || set.task === 'academic-passage') && <PassageView set={set} question={q} />}
                      {set.section === 'listening' && <AudioPlayer id={`rv-${page.id}`} script={set.script} audioSrc={set.audioSrc} playsLeft={null} onPlayStart={() => undefined} showTranscript compact />}
                    </div>
                    <ChoiceQuestion question={q} selected={r?.kind === 'choice' ? r.selected : []} onChange={() => undefined} disabled revealed showSkill />
                  </div>
                );
              })()}
              {page.view === 'listen' && set.section === 'listening' && (
                <div>
                  <p className="mb-2 text-sm text-muted">{set.context}</p>
                  <AudioPlayer id={`rv-${page.id}`} script={set.script} audioSrc={set.audioSrc} playsLeft={null} onPlayStart={() => undefined} showTranscript compact />
                  {attempt.notes[set.id] && (
                    <div className="mt-3 rounded-lg bg-surface-3 p-3 text-sm">
                      <p className="text-xs font-semibold text-muted">Tus notas</p>
                      <p className="whitespace-pre-line text-ink">{attempt.notes[set.id]}</p>
                    </div>
                  )}
                </div>
              )}
              {page.view === 'cloze' && set.task === 'complete-words' && (
                <ClozeView
                  set={set}
                  values={Object.fromEntries(page.itemIds.map((id) => [id, (attempt.responses[id] as { value?: string } | undefined)?.value ?? '']))}
                  onChange={() => undefined}
                  disabled
                  revealed
                />
              )}
              {page.view === 'build' && set.task === 'build-sentence' && (
                <BuildSentenceView set={set} order={(attempt.responses[set.id] as { order?: string[] } | undefined)?.order ?? []} onChange={() => undefined} disabled revealed />
              )}
              {page.view === 'essay' && (set.task === 'email' || set.task === 'academic-discussion') && (
                <div className="grid gap-5 lg:grid-cols-2">
                  <EssayPrompt set={set} />
                  <div>
                    <p className="mb-1 text-sm font-medium text-ink">Tu texto</p>
                    <div className="min-h-32 whitespace-pre-line rounded-xl border border-line p-4 font-serif text-ink">{(attempt.responses[set.id] as { text?: string } | undefined)?.text || <span className="text-muted">Sin respuesta</span>}</div>
                    <details className="mt-3 rounded-lg border border-line p-3 text-sm">
                      <summary className="cursor-pointer font-medium text-ink">Respuesta modelo</summary>
                      <p className="mt-2 whitespace-pre-line font-serif text-ink">{set.sampleResponse}</p>
                    </details>
                    <Link to={`/results/${attempt.id}`} className="mt-2 inline-block text-sm text-accent hover:underline">Valorar con rúbrica en Resultados →</Link>
                  </div>
                </div>
              )}
              {page.view === 'speak' && (
                <div className="text-sm">
                  <p className="text-ink">
                    {set.task === 'listen-repeat' ? `Frase: "${set.sentences.find((s) => s.id === page.itemIds[0])?.text}"` : set.task === 'interview' ? set.questions.find((q) => q.id === page.itemIds[0])?.text : ''}
                  </p>
                  <p className="mt-1 text-muted">
                    {(attempt.responses[page.itemIds[0]!] as { status?: string } | undefined)?.status === 'recorded' ? 'Respuesta grabada.' : 'Sin grabación.'}{' '}
                    <Link to={`/results/${attempt.id}`} className="text-accent hover:underline">Escuchar y valorar en Resultados →</Link>
                  </p>
                </div>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}
