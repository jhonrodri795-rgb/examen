import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { BookOpen, Clock, Headphones, Mic, PenLine, Play, RotateCcw, ShieldCheck, Shuffle, Sparkles } from 'lucide-react';
import { useBank, useSettings, useToast } from '@/app/context';
import { Alert, Badge, Button, Card, CardHeader, PageHeader, Select, Switch } from '@/components/ui';
import { cn } from '@/lib/format';
import type { SectionId } from '@/modules/question-bank/types';
import { listAttempts, saveAttempt, setExposure } from '@/modules/storage/repositories';
import type { QuestionBank } from '@/modules/question-bank/registry';
import { BLUEPRINTS, getBlueprint } from '../blueprints';
import { createAttempt } from '../engine';
import { formStatuses, nextForm, type FormStatus } from '../forms-progress';
import type { ExamConfig, ExamMode, TimingMode } from '../types';

function formLabel(f: FormStatus): string {
  const state = f.inProgressId ? 'en curso' : f.completed ? `hecha${f.completed > 1 ? ` ×${f.completed}` : ''}${f.bestBand !== null ? ` · mejor banda ${f.bestBand}` : ''}` : 'nueva';
  return `Simulación n.º ${f.form} — ${state}`;
}

const SECTION_META: Record<SectionId, { label: string; icon: typeof BookOpen }> = {
  reading: { label: 'Reading', icon: BookOpen },
  listening: { label: 'Listening', icon: Headphones },
  writing: { label: 'Writing', icon: PenLine },
  speaking: { label: 'Speaking', icon: Mic },
};

/** Crea, guarda y devuelve el id de un intento nuevo. */
export async function startAttempt(config: ExamConfig, bank: QuestionBank): Promise<string> {
  const exposure = await setExposure().catch(() => ({}));
  const attempt = createAttempt(config, getBlueprint(config.blueprintId), bank, exposure);
  const res = await saveAttempt({ ...attempt, rev: 1 });
  if (!res.ok) throw new Error('No se pudo guardar el intento.');
  return attempt.id;
}

export function ExamSetupPage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const toast = useToast();
  const { bank } = useBank();
  const { settings } = useSettings();
  const initialSection = params.get('section') as SectionId | null;
  const [kind, setKind] = useState<'full' | 'section'>(initialSection ? 'section' : 'full');
  const [blueprintId, setBlueprintId] = useState(params.get('blueprint') ?? settings.defaultBlueprintId);
  const [mode, setMode] = useState<ExamMode>((params.get('mode') as ExamMode) ?? (initialSection ? 'practice' : settings.defaultMode));
  const [timing, setTiming] = useState<TimingMode>(settings.defaultTiming);
  const [sections, setSections] = useState<SectionId[]>(initialSection ? [initialSection] : ['reading', 'listening', 'writing', 'speaking']);
  const [instantFeedback, setInstantFeedback] = useState(settings.instantFeedback);
  const [relaxedListening, setRelaxedListening] = useState(settings.relaxedListening);
  const [speakingPrepSec, setSpeakingPrepSec] = useState(settings.speakingPrepSec);
  const [busy, setBusy] = useState(false);
  const blueprint = getBlueprint(blueprintId);
  const formParam = params.get('form');
  const [statuses, setStatuses] = useState<FormStatus[] | null>(null);
  /** Formulario elegido: número, 'random' (mezcla del banco) o null mientras se resuelve «siguiente». */
  const [formChoice, setFormChoice] = useState<number | 'random' | null>(formParam === 'random' ? 'random' : Number(formParam) > 0 ? Number(formParam) : null);

  useEffect(() => {
    let alive = true;
    listAttempts()
      .catch(() => [])
      .then((attempts) => {
        if (!alive) return;
        const st = formStatuses(attempts, bank);
        setStatuses(st);
        setFormChoice((prev) => {
          if (prev === 'random') return prev;
          if (typeof prev === 'number' && st.some((f) => f.form === prev && f.available)) return prev;
          return nextForm(st) ?? 'random';
        });
      });
    return () => {
      alive = false;
    };
  }, [bank]);

  const availableForms = statuses?.filter((f) => f.available) ?? [];
  const chosenForm = typeof formChoice === 'number' ? statuses?.find((f) => f.form === formChoice) : undefined;

  const summary = useMemo(() => {
    const chosen = blueprint.sections.filter((s) => (kind === 'full' ? true : sections.includes(s.id)));
    const minutes = chosen.reduce((sum, s) => sum + s.modules.reduce((m, x) => m + (x.timeLimitSec ?? (s.id === 'speaking' ? 8 * 60 : 0)), 0), 0) / 60;
    return { chosen, minutes: Math.round(minutes * (timing === 'extended' ? 1.5 : 1)) };
  }, [blueprint, kind, sections, timing]);

  const start = async () => {
    setBusy(true);
    try {
      const config: ExamConfig = {
        kind,
        mode,
        blueprintId,
        sections: kind === 'full' ? ['reading', 'listening', 'writing', 'speaking'] : sections,
        timing: mode === 'exam' && timing === 'untimed' ? 'standard' : timing,
        instantFeedback: mode === 'practice' && instantFeedback,
        relaxedListening: mode === 'practice' && relaxedListening,
        speakingPrepSec: mode === 'practice' ? speakingPrepSec : 0,
        seed: Math.floor(Math.random() * 2 ** 31),
        ...(kind === 'full' && typeof formChoice === 'number' ? { form: formChoice } : {}),
      };
      const id = await startAttempt(config, bank);
      navigate(`/exam/${id}`);
    } catch (e) {
      toast(`No se pudo crear el intento: ${(e as Error).message}`, 'bad');
      setBusy(false);
    }
  };

  return (
    <div>
      <PageHeader title="Configurar simulación" description="Elige el tipo de práctica, el modo y las condiciones de tiempo. Revisa las instrucciones antes de empezar." />
      <div className="grid gap-6 lg:grid-cols-[1fr_22rem]">
        <div className="space-y-6">
          <Card>
            <CardHeader title="1. Tipo de práctica" />
            <div className="grid gap-3 p-5 sm:grid-cols-2">
              {(['full', 'section'] as const).map((k) => (
                <button
                  key={k}
                  type="button"
                  onClick={() => setKind(k)}
                  aria-pressed={kind === k}
                  className={cn('rounded-xl border p-4 text-left transition-colors', kind === k ? 'border-accent bg-accent-soft' : 'border-line hover:bg-surface-3')}
                >
                  <p className="font-semibold text-ink">{k === 'full' ? 'Simulación completa' : 'Secciones individuales'}</p>
                  <p className="mt-1 text-sm text-muted">{k === 'full' ? 'Las cuatro secciones en orden, con banda global estimada.' : 'Practica una o varias secciones por separado.'}</p>
                </button>
              ))}
            </div>
            {kind === 'section' && (
              <div className="flex flex-wrap gap-2 px-5 pb-5" role="group" aria-label="Secciones">
                {(Object.keys(SECTION_META) as SectionId[]).map((s) => {
                  const Icon = SECTION_META[s].icon;
                  const on = sections.includes(s);
                  return (
                    <button
                      key={s}
                      type="button"
                      aria-pressed={on}
                      onClick={() => setSections((prev) => (on ? prev.filter((x) => x !== s) : [...prev, s].sort((a, b) => ['reading', 'listening', 'writing', 'speaking'].indexOf(a) - ['reading', 'listening', 'writing', 'speaking'].indexOf(b))))}
                      className={cn('flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium', on ? 'border-accent bg-accent-soft text-ink' : 'border-line text-muted hover:bg-surface-3')}
                    >
                      <Icon className="h-4 w-4" /> {SECTION_META[s].label}
                    </button>
                  );
                })}
              </div>
            )}
            {kind === 'full' && availableForms.length > 0 && (
              <div className="space-y-3 border-t border-line p-5">
                <Select
                  id="form"
                  label="Prueba"
                  value={formChoice === null ? '' : String(formChoice)}
                  onChange={(v) => setFormChoice(v === 'random' ? 'random' : Number(v))}
                  options={[
                    ...(formChoice === null ? [{ value: '', label: 'Cargando…' }] : []),
                    ...availableForms.map((f) => ({ value: String(f.form), label: formLabel(f) })),
                    { value: 'random', label: 'Aleatoria (mezcla del banco general)' },
                  ]}
                />
                <p className="flex gap-2 text-xs text-muted">
                  {formChoice === 'random' ? <Shuffle className="h-4 w-4 shrink-0" /> : <Sparkles className="h-4 w-4 shrink-0" />}
                  {formChoice === 'random'
                    ? 'Combina textos y tareas del banco general, priorizando los que menos has visto. Puede repetir contenido de las simulaciones numeradas.'
                    : `Cada simulación numerada tiene sus propios textos, audios y tareas, distintos de las otras ${availableForms.length - 1}. Por defecto se propone la siguiente que no has hecho.`}
                </p>
                {chosenForm?.inProgressId && (
                  <Alert
                    tone="info"
                    action={
                      <Button size="sm" variant="secondary" icon={<RotateCcw className="h-4 w-4" />} onClick={() => navigate(`/exam/${chosenForm.inProgressId}`)}>
                        Continuar donde la dejaste
                      </Button>
                    }
                  >
                    Ya tienes esta simulación empezada. Si pulsas «Empezar» se creará un intento nuevo con el mismo contenido.
                  </Alert>
                )}
              </div>
            )}
          </Card>

          <Card>
            <CardHeader title="2. Modo y estructura" />
            <div className="grid gap-4 p-5 sm:grid-cols-2">
              <Select id="mode" label="Modo" value={mode} onChange={(v) => setMode(v as ExamMode)} options={[{ value: 'practice', label: 'Práctica (explicaciones y pausas)' }, { value: 'exam', label: 'Examen (soluciones al final)' }]} />
              <Select id="blueprint" label="Estructura" value={blueprintId} onChange={setBlueprintId} options={BLUEPRINTS.map((b) => ({ value: b.id, label: b.name }))} />
              <Select
                id="timing"
                label="Tiempo"
                value={timing}
                onChange={(v) => setTiming(v as TimingMode)}
                options={[
                  { value: 'standard', label: 'Estándar' },
                  { value: 'extended', label: 'Extendido (×1,5)' },
                  ...(mode === 'practice' ? [{ value: 'untimed', label: 'Sin límite (solo práctica)' }] : []),
                ]}
              />
            </div>
            {mode === 'practice' && (
              <div className="divide-y divide-line border-t border-line px-5 py-2">
                <Switch id="instant" checked={instantFeedback} onCheckedChange={setInstantFeedback} label="Comprobar respuestas al momento" description="Muestra si aciertas y la explicación en cada pregunta (la respuesta queda bloqueada)." />
                <Switch id="relaxed" checked={relaxedListening} onCheckedChange={setRelaxedListening} label="Listening flexible" description="Reproducciones ilimitadas, transcripción tras escuchar y navegación libre." />
                <Select
                  className="py-2"
                  id="prep"
                  label="Preparación extra en Speaking (el formato 2026 no tiene)"
                  value={String(speakingPrepSec)}
                  onChange={(v) => setSpeakingPrepSec(Number(v))}
                  options={[0, 10, 15, 30].map((n) => ({ value: String(n), label: n === 0 ? 'Sin preparación (como el examen)' : `${n} segundos` }))}
                />
              </div>
            )}
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader title="Resumen" icon={<Sparkles className="h-5 w-5" />} />
            <div className="space-y-4 p-5 text-sm">
              <div className="flex items-center gap-2 text-ink">
                <Clock className="h-4 w-4 text-accent" /> Duración aproximada: <strong>{timing === 'untimed' ? 'libre' : `${summary.minutes} min`}</strong>
              </div>
              <ul className="space-y-2">
                {summary.chosen.map((s) => (
                  <li key={s.id} className="rounded-lg bg-surface-3 p-2.5">
                    <p className="font-medium text-ink">{SECTION_META[s.id].label}</p>
                    <p className="text-xs text-muted">{s.description}</p>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-2">
                <Badge tone={mode === 'exam' ? 'brand' : 'accent'}>{mode === 'exam' ? 'Modo examen' : 'Modo práctica'}</Badge>
                {kind === 'full' && typeof formChoice === 'number' && <Badge tone="neutral">Simulación n.º {formChoice}</Badge>}
                {kind === 'full' && formChoice === 'random' && <Badge tone="neutral">Prueba aleatoria</Badge>}
              </div>
              {summary.chosen.some((s) => s.id === 'speaking') && (
                <Alert tone="info">Speaking necesita micrófono. Se te pedirá permiso al empezar esa sección.</Alert>
              )}
              <p className="flex gap-2 text-xs text-muted">
                <ShieldCheck className="h-4 w-4 shrink-0" /> Las respuestas se guardan automáticamente en este navegador. Si recargas, podrás reanudar el intento.
              </p>
              <Button size="lg" className="w-full justify-center" onClick={start} loading={busy} disabled={(kind === 'section' && sections.length === 0) || (kind === 'full' && availableForms.length > 0 && formChoice === null)} icon={<Play className="h-5 w-5" />}>
                Empezar
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
