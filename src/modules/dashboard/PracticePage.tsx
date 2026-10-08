import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { ArrowRight, Dumbbell, Play } from 'lucide-react';
import { useBank, useSettings, useToast } from '@/app/context';
import { Badge, Button, Card, CardHeader, PageHeader } from '@/components/ui';
import { createRng, shuffle } from '@/lib/random';
import type { SectionId, TaskType } from '@/modules/question-bank/types';
import { sectionName } from '@/modules/scoring/results';
import { startAttempt } from '@/modules/exam-engine/ui/ExamSetupPage';
import { setExposure } from '@/modules/storage/repositories';
import { SECTION_INFO } from './DashboardPage';

const DRILLS: { section: SectionId; task: TaskType; label: string; sets: number; note: string }[] = [
  { section: 'reading', task: 'complete-words', label: 'Complete the Words', sets: 1, note: '1 párrafo · 10 huecos' },
  { section: 'reading', task: 'daily-life', label: 'Read in Daily Life', sets: 3, note: '3 textos breves' },
  { section: 'reading', task: 'academic-passage', label: 'Academic Passage', sets: 2, note: '2 lecturas · 10 preguntas' },
  { section: 'listening', task: 'choose-response', label: 'Listen and Choose a Response', sets: 8, note: '8 ítems' },
  { section: 'listening', task: 'conversation', label: 'Conversations', sets: 2, note: '2 conversaciones' },
  { section: 'listening', task: 'announcement', label: 'Announcements', sets: 2, note: '2 anuncios' },
  { section: 'listening', task: 'academic-talk', label: 'Academic Talks', sets: 2, note: '2 clases' },
  { section: 'writing', task: 'build-sentence', label: 'Build a Sentence', sets: 10, note: '10 frases' },
  { section: 'writing', task: 'email', label: 'Write an Email', sets: 1, note: '7 minutos' },
  { section: 'writing', task: 'academic-discussion', label: 'Academic Discussion', sets: 1, note: '10 minutos' },
  { section: 'speaking', task: 'listen-repeat', label: 'Listen and Repeat', sets: 1, note: '7 frases' },
  { section: 'speaking', task: 'interview', label: 'Take an Interview', sets: 1, note: '4 preguntas · 45 s' },
];

export function PracticePage() {
  const { bank } = useBank();
  const { settings } = useSettings();
  const toast = useToast();
  const navigate = useNavigate();
  const [busy, setBusy] = useState<string | null>(null);

  const startDrill = async (task: TaskType, count: number) => {
    setBusy(task);
    try {
      const exposure = await setExposure().catch(() => ({} as Record<string, number>));
      const rng = createRng(Date.now() & 0x7fffffff);
      const pool = shuffle(bank.sets.filter((s) => s.task === task), rng).sort((a, b) => (exposure[a.id] ?? 0) - (exposure[b.id] ?? 0));
      const chosen = pool.slice(0, count).map((s) => s.id);
      if (!chosen.length) throw new Error('No hay contenido para esta tarea.');
      const id = await startAttempt(
        {
          kind: 'custom', mode: 'practice', blueprintId: settings.defaultBlueprintId, sections: [], timing: settings.defaultTiming,
          instantFeedback: settings.instantFeedback, relaxedListening: settings.relaxedListening, speakingPrepSec: settings.speakingPrepSec,
          customSetIds: chosen, seed: Date.now() & 0x7fffffff,
        },
        bank,
      );
      navigate(`/exam/${id}`);
    } catch (e) {
      toast((e as Error).message, 'bad');
      setBusy(null);
    }
  };

  return (
    <div className="space-y-8">
      <PageHeader title="Práctica por sección" description="Practica una sección completa con su estructura adaptativa o entrena un tipo de tarea concreto." actions={<Link to="/bank"><Button variant="outline">Elegir preguntas en el banco</Button></Link>} />
      <div className="grid gap-4 md:grid-cols-2">
        {(Object.keys(SECTION_INFO) as SectionId[]).map((section) => {
          const Icon = SECTION_INFO[section].icon;
          return (
            <Card key={section}>
              <CardHeader
                icon={<Icon className="h-5 w-5" />}
                title={sectionName(section)}
                description={SECTION_INFO[section].blurb}
                actions={
                  <Link to={`/exam/new?section=${section}`}>
                    <Button size="sm" icon={<Play className="h-4 w-4" />}>Sección completa</Button>
                  </Link>
                }
              />
              <ul className="divide-y divide-line">
                {DRILLS.filter((d) => d.section === section).map((d) => {
                  const available = bank.sets.filter((s) => s.task === d.task).length;
                  return (
                    <li key={d.task} className="flex items-center justify-between gap-3 px-5 py-3">
                      <div className="min-w-0">
                        <p className="flex items-center gap-2 text-sm font-medium text-ink">
                          <Dumbbell className="h-4 w-4 text-muted" aria-hidden /> {d.label}
                        </p>
                        <p className="text-xs text-muted">{d.note} · {available} en el banco</p>
                      </div>
                      <Button variant="outline" size="sm" loading={busy === d.task} disabled={!available || !!busy} onClick={() => startDrill(d.task, d.sets)}>
                        Entrenar <ArrowRight className="h-4 w-4" />
                      </Button>
                    </li>
                  );
                })}
              </ul>
            </Card>
          );
        })}
      </div>
      <Card>
        <CardHeader title="Práctica adicional de Speaking con preparación" description="Tareas de opinión con 15 s de preparación (estilo anterior a 2026). No forman parte de la simulación actual." actions={<Badge tone="accent">Formato anterior</Badge>} />
        <div className="p-5">
          <Link to="/speaking?tab=practice">
            <Button variant="secondary">Abrir estudio de Speaking</Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
