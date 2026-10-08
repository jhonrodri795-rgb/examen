import { useCallback, useEffect, useState } from 'react';
import { NotebookPen } from 'lucide-react';
import type { ContentSet } from '@/modules/question-bank/types';
import { ChoiceQuestion } from '@/components/exam/ChoiceQuestion';
import { Badge } from '@/components/ui';
import { ClozeView, PassageView } from '@/modules/reading/ui/ReadingViews';
import { AudioPlayer } from '@/modules/listening/ui/AudioPlayer';
import { BuildSentenceView, EssayEditor, EssayPrompt } from '@/modules/writing/ui/WritingViews';
import { autosaveDraft } from '@/modules/storage/repositories';
import { countWords } from '@/lib/format';
import { SpeakingRecorder } from '@/modules/speaking/ui/SpeakingRecorder';
import { canEdit, checkItem, maxPlays, registerPlay, setNotes, setResponse, toggleFlag } from '../engine';
import type { Attempt, Page } from '../types';

export interface PageRendererProps {
  attempt: Attempt;
  page: Page;
  set: ContentSet;
  now: number;
  apply: (fn: (a: Attempt, now: number) => Attempt, opts?: { immediate?: boolean }) => unknown;
  /** Bloquea "Siguiente" con un mensaje (p. ej. escuchar el audio primero). */
  setGate: (msg: string | null) => void;
  onAdvance: () => void;
  /** Número de la primera pregunta de la página dentro del módulo. */
  questionNumber: number;
}

function NotesPanel({ attempt, setId, apply }: { attempt: Attempt; setId: string; apply: PageRendererProps['apply'] }) {
  const [open, setOpen] = useState(true);
  return (
    <details open={open} onToggle={(e) => setOpen((e.target as HTMLDetailsElement).open)} className="rounded-xl border border-line bg-surface p-3">
      <summary className="flex cursor-pointer items-center gap-2 text-sm font-medium text-ink">
        <NotebookPen className="h-4 w-4 text-accent" aria-hidden /> Notas
      </summary>
      <label htmlFor={`notes-${setId}`} className="sr-only">
        Notas para este audio
      </label>
      <textarea
        id={`notes-${setId}`}
        className="mt-2 h-40 w-full resize-y rounded-lg border border-line bg-surface-2 p-2 text-sm text-ink"
        placeholder="Toma notas mientras escuchas (se guardan con el intento)…"
        value={attempt.notes[setId] ?? ''}
        onChange={(e) => {
          const v = e.target.value;
          apply((a, n) => setNotes(a, setId, v, n));
        }}
      />
    </details>
  );
}

export function PageRenderer({ attempt, page, set, now, apply, setGate, onAdvance, questionNumber }: PageRendererProps) {
  const practice = attempt.config.mode === 'practice';
  const feedback = practice && attempt.config.instantFeedback;
  const editable = (id: string) => canEdit(attempt, id, now);
  const plays = attempt.plays[set.id] ?? 0;
  const limit = maxPlays(attempt);
  const playsLeft = limit === null ? null : Math.max(0, limit - plays);
  const onPlayStart = useCallback(() => apply((a, n) => registerPlay(a, set.id, n), { immediate: true }), [apply, set.id]);

  // Puerta de "escuchar antes de continuar" en modo examen.
  useEffect(() => {
    if (page.view === 'listen' && limit !== null && plays === 0) setGate('Reproduce el audio antes de continuar.');
    else setGate(null);
  }, [page.view, limit, plays, setGate]);
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    if (page.view === 'listen' && playing && limit !== null) setGate('Espera a que termine el audio.');
    else if (page.view === 'listen' && !(limit !== null && plays === 0)) setGate(null);
  }, [playing, page.view, limit, plays, setGate]);

  switch (page.view) {
    case 'question': {
      const itemId = page.itemIds[0]!;
      if (!('questions' in set) || set.task === 'interview') return null;
      const q = set.questions.find((x) => x.id === itemId)!;
      const resp = attempt.responses[itemId];
      const selected = resp?.kind === 'choice' ? resp.selected : [];
      const question = (
        <ChoiceQuestion
          question={q}
          number={questionNumber}
          selected={selected}
          disabled={!editable(itemId)}
          revealed={!!attempt.checked[itemId]}
          flagged={!!attempt.flags[itemId]}
          onToggleFlag={() => apply((a, n) => toggleFlag(a, itemId, n))}
          onCheck={feedback ? () => apply((a, n) => checkItem(a, itemId, n), { immediate: true }) : undefined}
          onChange={(sel) => apply((a, n) => setResponse(a, itemId, { kind: 'choice', selected: sel }, n))}
        />
      );
      if (set.section === 'reading' && (set.task === 'daily-life' || set.task === 'academic-passage')) {
        return (
          <div className="grid gap-5 lg:grid-cols-2">
            <div className="lg:max-h-[calc(100dvh-14rem)] lg:overflow-y-auto">
              <PassageView set={set} question={q} />
            </div>
            <div>{question}</div>
          </div>
        );
      }
      if (set.section === 'listening') {
        const isCR = set.task === 'choose-response';
        return (
          <div className="grid gap-5 lg:grid-cols-[1fr_18rem]">
            <div className="space-y-5">
              {isCR && (
                <AudioPlayer
                  id={set.id}
                  script={set.script}
                  audioSrc={set.audioSrc}
                  playsLeft={playsLeft}
                  onPlayStart={onPlayStart}
                  autoPlay={plays === 0}
                  showTranscript={!!attempt.checked[itemId]}
                />
              )}
              {!isCR && <p className="text-sm text-muted">{set.context}</p>}
              {question}
              {!isCR && attempt.checked[itemId] && (
                <AudioPlayer id={`${set.id}-review`} script={set.script} audioSrc={set.audioSrc} playsLeft={null} onPlayStart={() => undefined} showTranscript compact />
              )}
            </div>
            {!isCR && <NotesPanel attempt={attempt} setId={set.id} apply={apply} />}
          </div>
        );
      }
      return question;
    }

    case 'cloze': {
      if (set.task !== 'complete-words') return null;
      const values: Record<string, string> = {};
      for (const id of page.itemIds) {
        const r = attempt.responses[id];
        if (r?.kind === 'gap') values[id] = r.value;
      }
      return (
        <ClozeView
          set={set}
          values={values}
          disabled={!editable(page.itemIds[0]!)}
          revealed={page.itemIds.every((id) => attempt.checked[id])}
          onCheck={feedback ? () => apply((a, n) => page.itemIds.reduce((acc, id) => checkItem(acc, id, n), a), { immediate: true }) : undefined}
          onChange={(id, value) => apply((a, n) => setResponse(a, id, { kind: 'gap', value }, n))}
        />
      );
    }

    case 'listen': {
      if (set.section !== 'listening') return null;
      return (
        <div className="grid gap-5 lg:grid-cols-[1fr_18rem]">
          <div className="space-y-4">
            <div>
              <Badge tone="brand">{{ conversation: 'Conversation', announcement: 'Announcement', 'academic-talk': 'Academic Talk', 'choose-response': 'Choose a Response' }[set.task]}</Badge>
              <h2 className="mt-2 text-lg font-semibold text-ink">{set.context}</h2>
              <p className="text-sm text-muted">
                {limit === null ? 'Puedes reproducir el audio las veces que quieras (modo práctica).' : `Puedes escuchar el audio ${limit === 1 ? 'una sola vez' : `${limit} veces`}. Las preguntas aparecerán después.`}
              </p>
            </div>
            <AudioPlayer
              id={set.id}
              script={set.script}
              audioSrc={set.audioSrc}
              playsLeft={playsLeft}
              onPlayStart={onPlayStart}
              onPlayingChange={setPlaying}
              onEnded={() => setGate(null)}
              showTranscript={practice && attempt.config.relaxedListening && plays > 0}
            />
          </div>
          <NotesPanel attempt={attempt} setId={set.id} apply={apply} />
        </div>
      );
    }

    case 'build': {
      if (set.task !== 'build-sentence') return null;
      const id = page.itemIds[0]!;
      const r = attempt.responses[id];
      return (
        <BuildSentenceView
          set={set}
          order={r?.kind === 'order' ? r.order : []}
          disabled={!editable(id)}
          revealed={!!attempt.checked[id]}
          onCheck={feedback ? () => apply((a, n) => checkItem(a, id, n), { immediate: true }) : undefined}
          onChange={(order) => apply((a, n) => setResponse(a, id, { kind: 'order', order }, n))}
        />
      );
    }

    case 'essay': {
      if (set.task !== 'email' && set.task !== 'academic-discussion') return null;
      const id = page.itemIds[0]!;
      const r = attempt.responses[id];
      const text = r?.kind === 'essay' ? r.text : '';
      return (
        <div className="grid gap-5 lg:grid-cols-2">
          <EssayPrompt set={set} />
          <EssayEditor
            value={text}
            disabled={!editable(id)}
            recommended={set.recommendedWords}
            saveLabel="Guardado automático"
            onChange={(v) => {
              apply((a, n) => setResponse(a, id, { kind: 'essay', text: v, updatedAt: n }, n));
              void autosaveDraft({ setId: set.id, attemptId: attempt.id, text: v, wordCount: countWords(v), at: Date.now() }).catch(() => undefined);
            }}
          />
        </div>
      );
    }

    case 'speak': {
      const id = page.itemIds[0]!;
      const r = attempt.responses[id];
      const existing = r?.kind === 'speech' ? r.recordingId : null;
      let promptLines = null;
      let promptText: string | undefined;
      let responseSec = 45;
      let prepSec = 0;
      let header = null;
      if (set.task === 'listen-repeat') {
        const idx = set.sentences.findIndex((s) => s.id === id);
        const s = set.sentences[idx]!;
        promptLines = [{ speaker: 'Guide', voice: set.speakerVoice, text: s.text }];
        promptText = s.text;
        responseSec = s.responseSec;
        header = (
          <div className="rounded-xl border border-line bg-surface p-4">
            <Badge tone="brand">Listen and Repeat · {idx + 1}/{set.sentences.length}</Badge>
            <p className="mt-2 font-semibold text-ink">{set.scenario.title}</p>
            <p className="text-sm text-muted">{set.scenario.description}</p>
            <p className="mt-2 text-sm text-ink-2">Escucha la frase y repítela exactamente después del pitido.</p>
          </div>
        );
      } else if (set.task === 'interview') {
        const idx = set.questions.findIndex((q) => q.id === id);
        const q = set.questions[idx]!;
        promptLines = [...(idx === 0 ? [{ speaker: 'Interviewer', voice: set.interviewerVoice, text: set.intro }] : []), { speaker: 'Interviewer', voice: set.interviewerVoice, text: q.text }];
        promptText = q.text;
        responseSec = q.responseSec;
        prepSec = q.prepSec;
        header = (
          <div className="rounded-xl border border-line bg-surface p-4">
            <Badge tone="brand">Take an Interview · {idx + 1}/{set.questions.length}</Badge>
            <p className="mt-2 font-semibold text-ink">{set.title}</p>
            <p className="text-sm text-ink-2">Escucha la pregunta y responde tras el pitido. Tienes {q.responseSec} segundos.</p>
          </div>
        );
      } else if (set.task === 'independent-speaking') {
        promptText = set.prompt;
        responseSec = set.responseSec;
        prepSec = set.prepSec;
      }
      prepSec += practice ? attempt.config.speakingPrepSec : 0;
      return (
        <div className="mx-auto max-w-2xl space-y-4">
          {header}
          <SpeakingRecorder
            key={id}
            promptLines={promptLines}
            promptText={promptText}
            showPromptText={set.task !== 'listen-repeat' || !!attempt.checked[id]}
            prepSec={prepSec}
            responseSec={responseSec}
            minMs={set.task === 'listen-repeat' ? 600 : 1500}
            meta={{ attemptId: attempt.id, itemId: id, setId: set.id, task: set.task, prompt: promptText ?? '', referenceText: set.task === 'listen-repeat' ? promptText : undefined, context: 'exam' }}
            autoStart={!existing && !practice}
            allowRetry={practice}
            allowReplayPrompt={practice}
            existingRecordingId={existing}
            onSaved={(rec) => {
              apply((a, n) => setResponse(a, id, { kind: 'speech', recordingId: rec.id, durationMs: rec.durationMs, status: 'recorded' }, n), { immediate: true });
              if (!practice) setTimeout(onAdvance, 1200);
            }}
            onSkip={(reason) => {
              apply((a, n) => setResponse(a, id, { kind: 'speech', recordingId: null, status: reason === 'no-mic' ? 'no-mic' : 'skipped' }, n), { immediate: true });
              onAdvance();
            }}
          />
        </div>
      );
    }
  }
}
