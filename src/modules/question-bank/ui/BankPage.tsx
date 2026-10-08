import { useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { Download, Eye, FileUp, Library, Play, Search, Trash2 } from 'lucide-react';
import { useBank, useSettings, useToast } from '@/app/context';
import { Alert, Badge, Button, Card, ConfirmDialog, Dialog, EmptyState, PageHeader, Select } from '@/components/ui';
import { ChoiceQuestion } from '@/components/exam/ChoiceQuestion';
import { downloadText } from '@/lib/api';
import { cn } from '@/lib/format';
import { ClozeView, PassageView } from '@/modules/reading/ui/ReadingViews';
import { AudioPlayer } from '@/modules/listening/ui/AudioPlayer';
import { BuildSentenceView, EssayPrompt } from '@/modules/writing/ui/WritingViews';
import { deleteCustomPack, saveCustomSets } from '@/modules/storage/repositories';
import { SKILL_LABEL } from '@/modules/scoring/advice';
import { sectionName } from '@/modules/scoring/results';
import { startAttempt } from '@/modules/exam-engine/ui/ExamSetupPage';
import { choiceQuestions, itemsOfSet, setSearchText } from '../items';
import { validateSets } from '../validate';
import { builtinSets } from '../registry';
import type { ContentSet, SectionId } from '../types';

const TASK_LABEL: Record<string, string> = {
  'complete-words': 'Complete the Words', 'daily-life': 'Read in Daily Life', 'academic-passage': 'Academic Passage', 'choose-response': 'Choose a Response',
  conversation: 'Conversation', announcement: 'Announcement', 'academic-talk': 'Academic Talk', 'build-sentence': 'Build a Sentence', email: 'Write an Email',
  'academic-discussion': 'Academic Discussion', 'listen-repeat': 'Listen and Repeat', interview: 'Take an Interview', 'independent-speaking': 'Opinión (formato anterior)',
};
const TOPIC_LABEL: Record<string, string> = {
  biology: 'Biología', history: 'Historia', geology: 'Geología', engineering: 'Ingeniería', environment: 'Medioambiente', psychology: 'Psicología', economics: 'Economía',
  sociology: 'Sociología', art: 'Arte', technology: 'Tecnología', astronomy: 'Astronomía', linguistics: 'Lingüística', 'campus-life': 'Vida universitaria', 'daily-life': 'Vida cotidiana',
};
const DIFF_LABEL = { easy: 'Fácil', medium: 'Media', hard: 'Difícil' } as const;

function Preview({ set }: { set: ContentSet }) {
  const [reveal, setReveal] = useState(false);
  const qs = choiceQuestions(set);
  return (
    <div className="space-y-4">
      <Button size="sm" variant="outline" onClick={() => setReveal((v) => !v)}>{reveal ? 'Ocultar soluciones' : 'Mostrar soluciones'}</Button>
      {(set.task === 'daily-life' || set.task === 'academic-passage') && <PassageView set={set} />}
      {set.section === 'listening' && <AudioPlayer id={`pv-${set.id}`} script={set.script} audioSrc={set.audioSrc} playsLeft={null} onPlayStart={() => undefined} showTranscript={reveal} compact />}
      {set.task === 'complete-words' && <ClozeView set={set} values={{}} onChange={() => undefined} disabled revealed={reveal} />}
      {set.task === 'build-sentence' && <BuildSentenceView set={set} order={reveal ? set.chunks : []} onChange={() => undefined} disabled revealed={reveal} />}
      {(set.task === 'email' || set.task === 'academic-discussion') && (
        <>
          <EssayPrompt set={set} />
          {reveal && <div className="whitespace-pre-line rounded-lg bg-surface-3 p-3 font-serif text-sm text-ink">{set.sampleResponse}</div>}
        </>
      )}
      {set.task === 'listen-repeat' && <ol className="list-decimal space-y-1 pl-5 text-sm">{set.sentences.map((s) => <li key={s.id}>{reveal ? s.text : '•••'}</li>)}</ol>}
      {set.task === 'interview' && <ol className="list-decimal space-y-1 pl-5 text-sm">{set.questions.map((q) => <li key={q.id}>{q.text}</li>)}</ol>}
      {set.task === 'independent-speaking' && <p className="text-sm">{set.prompt}</p>}
      {qs.map((q, i) => (
        <ChoiceQuestion key={q.id} question={q} number={i + 1} selected={reveal ? q.answer : []} onChange={() => undefined} disabled revealed={reveal} showSkill />
      ))}
    </div>
  );
}

export function BankPage() {
  const { bank, custom, reload } = useBank();
  const { settings } = useSettings();
  const toast = useToast();
  const navigate = useNavigate();
  const fileRef = useRef<HTMLInputElement>(null);
  const [section, setSection] = useState('all');
  const [task, setTask] = useState('all');
  const [difficulty, setDifficulty] = useState('all');
  const [topic, setTopic] = useState('all');
  const [skill, setSkill] = useState('all');
  const [q, setQ] = useState('');
  const [selected, setSelected] = useState<string[]>([]);
  const [preview, setPreview] = useState<ContentSet | null>(null);
  const [importErrors, setImportErrors] = useState<string[]>([]);
  const [removePack, setRemovePack] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const filtered = useMemo(
    () =>
      bank.sets.filter(
        (s) =>
          (section === 'all' || s.section === section) &&
          (task === 'all' || s.task === task) &&
          (difficulty === 'all' || s.difficulty === difficulty) &&
          (topic === 'all' || s.topic === topic) &&
          (skill === 'all' || itemsOfSet(s).some((i) => i.skill === skill)) &&
          (!q.trim() || setSearchText(s).includes(q.trim().toLowerCase())),
      ),
    [bank, section, task, difficulty, topic, skill, q],
  );

  const packs = [...new Set(custom.map((c) => c.pack))];

  const onImport = async (file: File) => {
    setImportErrors([]);
    try {
      const raw = JSON.parse(await file.text());
      const sets: unknown[] = Array.isArray(raw) ? raw : Array.isArray(raw?.sets) ? raw.sets : [];
      if (!sets.length) throw new Error('El archivo debe contener un array de sets o un objeto { "sets": [...] }.');
      const issues = validateSets(sets, new Set(bank.sets.map((s) => s.id).concat(bank.items.map((i) => i.id))));
      if (issues.length) {
        setImportErrors(issues.slice(0, 20).map((i) => `${i.setId}: ${i.message}`));
        return;
      }
      const pack = (raw?.name as string) || file.name.replace(/\.json$/i, '');
      await saveCustomSets(sets.map((s) => ({ id: (s as ContentSet).id, pack, set: { ...(s as ContentSet), source: pack }, importedAt: Date.now() })));
      await reload();
      toast(`Importados ${sets.length} sets en el pack "${pack}".`, 'ok');
    } catch (e) {
      setImportErrors([`No se pudo importar: ${(e as Error).message}`]);
    }
  };

  const practice = async () => {
    setBusy(true);
    try {
      const id = await startAttempt(
        { kind: 'custom', mode: 'practice', blueprintId: settings.defaultBlueprintId, sections: [], timing: settings.defaultTiming, instantFeedback: settings.instantFeedback, relaxedListening: settings.relaxedListening, speakingPrepSec: settings.speakingPrepSec, customSetIds: selected, seed: Date.now() & 0x7fffffff },
        bank,
      );
      navigate(`/exam/${id}`);
    } catch (e) {
      toast((e as Error).message, 'bad');
      setBusy(false);
    }
  };

  const tasksForSection = [...new Set(bank.sets.filter((s) => section === 'all' || s.section === section).map((s) => s.task))];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Banco de preguntas"
        description={`${bank.sets.length} sets y ${bank.items.length} ítems originales organizados por sección, tarea, dificultad, tema y habilidad. Selecciona sets para crear una práctica personalizada.`}
        actions={
          <>
            <input ref={fileRef} type="file" accept="application/json,.json" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) void onImport(f); e.target.value = ''; }} />
            <Button variant="outline" icon={<FileUp className="h-4 w-4" />} onClick={() => fileRef.current?.click()}>Importar pack JSON</Button>
            <Button variant="ghost" icon={<Download className="h-4 w-4" />} onClick={() => downloadText(JSON.stringify({ name: 'mi-pack', sets: builtinSets.slice(0, 2).map((s) => ({ ...s, id: `${s.id}-copia`, source: undefined })) }, null, 2), 'plantilla-pack.json', 'application/json')}>
              Plantilla
            </Button>
          </>
        }
      />

      {importErrors.length > 0 && (
        <Alert tone="bad" title="El pack no se importó">
          <ul className="list-disc pl-4">{importErrors.map((e) => <li key={e}>{e}</li>)}</ul>
          <p className="mt-1 text-xs">Nota: en la plantilla, cambia también los identificadores de las preguntas para que sean únicos.</p>
        </Alert>
      )}
      {packs.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <span className="text-muted">Packs importados:</span>
          {packs.map((p) => (
            <Badge key={p} tone="accent">
              {p} ({custom.filter((c) => c.pack === p).length})
              <button type="button" aria-label={`Eliminar pack ${p}`} onClick={() => setRemovePack(p)} className="ml-1 rounded hover:text-bad"><Trash2 className="h-3 w-3" /></button>
            </Badge>
          ))}
        </div>
      )}

      <Card className="p-4">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <label htmlFor="bank-q" className="mb-1 block text-xs font-medium text-muted">Buscar</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" aria-hidden />
              <input id="bank-q" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Palabra clave…" className="h-10 w-full rounded-lg border border-line bg-surface pl-9 pr-3 text-sm text-ink" />
            </div>
          </div>
          <Select id="bank-section" label="Sección" value={section} onChange={(v) => { setSection(v); setTask('all'); }} options={[{ value: 'all', label: 'Todas' }, ...(['reading', 'listening', 'writing', 'speaking'] as SectionId[]).map((s) => ({ value: s, label: sectionName(s) }))]} />
          <Select id="bank-task" label="Tarea" value={task} onChange={setTask} options={[{ value: 'all', label: 'Todas' }, ...tasksForSection.map((t) => ({ value: t, label: TASK_LABEL[t] ?? t }))]} />
          <Select id="bank-diff" label="Dificultad" value={difficulty} onChange={setDifficulty} options={[{ value: 'all', label: 'Todas' }, ...Object.entries(DIFF_LABEL).map(([v, l]) => ({ value: v, label: l }))]} />
          <Select id="bank-topic" label="Tema" value={topic} onChange={setTopic} options={[{ value: 'all', label: 'Todos' }, ...[...new Set(bank.sets.map((s) => s.topic))].sort().map((t) => ({ value: t, label: TOPIC_LABEL[t] ?? t }))]} />
          <Select className="sm:col-span-2 lg:col-span-2" id="bank-skill" label="Tipo de pregunta" value={skill} onChange={setSkill} options={[{ value: 'all', label: 'Todos' }, ...[...new Set(bank.items.map((i) => i.skill))].map((k) => ({ value: k, label: SKILL_LABEL[k] }))]} />
        </div>
      </Card>

      {selected.length > 0 && (
        <div className="sticky top-16 z-20 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-accent bg-accent-soft p-3 lg:top-4">
          <span className="text-sm text-ink">{selected.length} set(s) seleccionado(s)</span>
          <div className="flex gap-2">
            <Button size="sm" variant="ghost" onClick={() => setSelected([])}>Limpiar</Button>
            <Button size="sm" onClick={practice} loading={busy} icon={<Play className="h-4 w-4" />}>Practicar selección</Button>
          </div>
        </div>
      )}

      {filtered.length === 0 ? (
        <EmptyState icon={<Library className="h-8 w-8" />} title="Sin resultados" description="Prueba con otros filtros." />
      ) : (
        <ul className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((s) => {
            const items = itemsOfSet(s);
            const on = selected.includes(s.id);
            return (
              <li key={s.id} className={cn('flex min-w-0 flex-col rounded-xl border bg-surface p-4', on ? 'border-accent ring-1 ring-accent' : 'border-line')}>
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="truncate font-medium text-ink" title={s.title}>{s.title}</p>
                    <p className="text-xs text-muted">{TASK_LABEL[s.task]} · {items.length} ítem(s)</p>
                  </div>
                  <input type="checkbox" checked={on} onChange={() => setSelected((sel) => (on ? sel.filter((x) => x !== s.id) : [...sel, s.id]))} aria-label={`Seleccionar ${s.title}`} className="mt-1 h-4 w-4 accent-sky-600" />
                </div>
                <div className="mt-2 flex flex-wrap gap-1">
                  <Badge tone="brand">{sectionName(s.section)}</Badge>
                  <Badge tone={s.difficulty === 'hard' ? 'warn' : s.difficulty === 'easy' ? 'ok' : 'accent'}>{DIFF_LABEL[s.difficulty]}</Badge>
                  <Badge>{TOPIC_LABEL[s.topic] ?? s.topic}</Badge>
                  {s.source && s.source !== 'builtin' && <Badge tone="accent">{s.source}</Badge>}
                </div>
                <p className="mt-2 text-[11px] text-muted">ID: {s.id}</p>
                <div className="mt-auto pt-3">
                  <Button size="sm" variant="ghost" onClick={() => setPreview(s)} icon={<Eye className="h-4 w-4" />}>Vista previa</Button>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      <Dialog open={!!preview} onOpenChange={(v) => !v && setPreview(null)} title={preview?.title ?? ''} description={preview ? `${TASK_LABEL[preview.task]} · ${DIFF_LABEL[preview.difficulty]} · ${TOPIC_LABEL[preview.topic] ?? preview.topic}` : undefined} size="xl">
        {preview && <Preview set={preview} />}
      </Dialog>
      <ConfirmDialog
        open={!!removePack}
        onOpenChange={(v) => !v && setRemovePack(null)}
        title={`¿Eliminar el pack "${removePack}"?`}
        tone="danger"
        confirmLabel="Eliminar"
        description="Los intentos que usaron estas preguntas no podrán mostrarlas en la revisión."
        onConfirm={async () => {
          if (removePack) await deleteCustomPack(removePack);
          await reload();
          setRemovePack(null);
        }}
      />
    </div>
  );
}
