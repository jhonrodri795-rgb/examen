import { useEffect, useMemo, useRef, useState } from 'react';
import { CheckCircle2, CornerDownLeft, Mail, MessagesSquare, RotateCcw, XCircle } from 'lucide-react';
import type { BuildSentenceSet, DiscussionTaskSet, EmailTaskSet } from '@/modules/question-bank/types';
import { Badge, Button } from '@/components/ui';
import { createRng, hashString, shuffle } from '@/lib/random';
import { cn, countWords } from '@/lib/format';

/** Build a Sentence: colocar fragmentos en orden con clic o teclado. */
export function BuildSentenceView({
  set,
  order,
  onChange,
  disabled,
  revealed,
  onCheck,
}: {
  set: BuildSentenceSet;
  order: string[];
  onChange: (order: string[]) => void;
  disabled: boolean;
  revealed: boolean;
  onCheck?: () => void;
}) {
  const pool = useMemo(() => {
    const all = [...set.chunks, ...(set.distractors ?? [])];
    let shuffled = shuffle(all, createRng(hashString(set.id)));
    if (shuffled.join('|') === set.chunks.join('|')) shuffled = [...shuffled].reverse();
    return shuffled.map((text, i) => ({ key: `${i}:${text}`, text }));
  }, [set]);

  // Cada fragmento colocado se identifica por su clave en el pool (permite textos repetidos).
  const placedKeys = useMemo(() => {
    const used = new Set<string>();
    return order.map((t) => {
      const chunk = pool.find((p) => p.text === t && !used.has(p.key));
      if (chunk) used.add(chunk.key);
      return chunk?.key ?? t;
    });
  }, [order, pool]);
  const available = pool.filter((p) => !placedKeys.includes(p.key));
  const correctOrders = [set.chunks, ...(set.acceptedOrders ?? [])];
  const isCorrect = correctOrders.some((o) => o.join('|') === order.join('|'));

  return (
    <section aria-label="Build a Sentence" className="space-y-5">
      <div>
        <Badge tone="brand">Build a Sentence</Badge>
        <p className="mt-2 text-sm text-muted">Ordena los fragmentos para formar una respuesta correcta y adecuada. {set.distractors?.length ? 'Puede sobrar algún fragmento.' : 'Usa todos los fragmentos.'}</p>
      </div>
      <div className="rounded-xl border border-line bg-surface p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted">{set.context.speaker}</p>
        <p className="mt-1 rounded-lg bg-surface-3 px-3 py-2 text-ink">“{set.context.text}”</p>
        <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-muted">Tu respuesta</p>
        <div
          className={cn(
            'mt-1 flex min-h-14 flex-wrap items-center gap-2 rounded-lg border-2 border-dashed p-2',
            revealed ? (isCorrect ? 'border-ok bg-ok-soft' : 'border-bad bg-bad-soft') : 'border-line',
          )}
          aria-label="Frase construida"
        >
          {order.length === 0 && <span className="px-1 text-sm text-muted">Pulsa los fragmentos de abajo en orden…</span>}
          {order.map((text, i) => (
            <button
              key={placedKeys[i]}
              type="button"
              disabled={disabled}
              onClick={() => onChange(order.filter((_, j) => j !== i))}
              className="rounded-md border border-accent bg-accent-soft px-2.5 py-1.5 text-sm text-ink hover:brightness-95 disabled:cursor-default"
              aria-label={`Quitar "${text}" (posición ${i + 1})`}
            >
              {text}
            </button>
          ))}
          {order.length > 0 && <span className="text-lg text-ink">{set.endPunctuation}</span>}
        </div>
      </div>
      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">Fragmentos disponibles</p>
        <div className="flex flex-wrap gap-2">
          {available.map((p) => (
            <button
              key={p.key}
              type="button"
              disabled={disabled}
              onClick={() => onChange([...order, p.text])}
              className="rounded-md border border-line bg-surface px-2.5 py-1.5 text-sm text-ink shadow-sm hover:bg-surface-3 disabled:opacity-50"
              aria-label={`Añadir "${p.text}"`}
            >
              {p.text}
            </button>
          ))}
          {available.length === 0 && <span className="text-sm text-muted">No quedan fragmentos.</span>}
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          <Button variant="ghost" size="sm" disabled={disabled || order.length === 0} onClick={() => onChange(order.slice(0, -1))} icon={<CornerDownLeft className="h-4 w-4" />}>
            Deshacer
          </Button>
          <Button variant="ghost" size="sm" disabled={disabled || order.length === 0} onClick={() => onChange([])} icon={<RotateCcw className="h-4 w-4" />}>
            Reiniciar
          </Button>
          {onCheck && !revealed && (
            <Button variant="secondary" size="sm" onClick={onCheck} disabled={order.length === 0}>
              Comprobar
            </Button>
          )}
        </div>
      </div>
      {revealed && (
        <div className="rounded-lg border border-line bg-surface-3 p-3 text-sm">
          <p className="flex items-center gap-2 font-semibold text-ink">
            {isCorrect ? <CheckCircle2 className="h-4 w-4 text-ok" /> : <XCircle className="h-4 w-4 text-bad" />}
            {isCorrect ? 'Correcto' : 'Incorrecto'}
          </p>
          <p className="mt-1 text-ink">
            Respuesta: <strong>{set.chunks.join(' ')}{set.endPunctuation}</strong>
          </p>
          <p className="mt-1 text-ink-2">{set.explanation}</p>
        </div>
      )}
    </section>
  );
}

/** Enunciado de las tareas de redacción. */
export function EssayPrompt({ set }: { set: EmailTaskSet | DiscussionTaskSet }) {
  if (set.task === 'email') {
    return (
      <div className="space-y-3 rounded-xl border border-line bg-surface p-4 text-sm">
        <div className="flex items-center gap-2">
          <Mail className="h-4 w-4 text-accent" aria-hidden />
          <Badge tone="brand">Write an Email</Badge>
        </div>
        <p className="text-ink">{set.scenario}</p>
        <p className="text-ink">
          Escribe un correo a <strong>{set.recipient}</strong>. En tu correo:
        </p>
        <ul className="list-disc space-y-1 pl-5 text-ink">
          {set.bulletPoints.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
        <p className="text-xs text-muted">
          Asunto: {set.subject} · Extensión orientativa: {set.recommendedWords[0]}–{set.recommendedWords[1]} palabras · Tiempo: {Math.round(set.timeLimitSec / 60)} min
        </p>
      </div>
    );
  }
  return (
    <div className="space-y-3 rounded-xl border border-line bg-surface p-4 text-sm">
      <div className="flex items-center gap-2">
        <MessagesSquare className="h-4 w-4 text-accent" aria-hidden />
        <Badge tone="brand">Academic Discussion</Badge>
        <span className="text-xs text-muted">{set.course}</span>
      </div>
      <div className="rounded-lg bg-surface-3 p-3">
        <p className="text-xs font-semibold text-muted">{set.professor}</p>
        <p className="mt-1 text-ink">{set.professorPrompt}</p>
      </div>
      {set.posts.map((p) => (
        <div key={p.author} className="ml-4 rounded-lg border border-line p-3">
          <p className="text-xs font-semibold text-muted">{p.author}</p>
          <p className="mt-1 text-ink">{p.text}</p>
        </div>
      ))}
      <p className="text-xs text-muted">
        Escribe una contribución a la discusión. Extensión orientativa: {set.recommendedWords[0]}+ palabras · Tiempo: {Math.round(set.timeLimitSec / 60)} min
      </p>
    </div>
  );
}

/** Editor de texto con contador de palabras e indicador de guardado. */
export function EssayEditor({
  value,
  onChange,
  disabled,
  recommended,
  saveLabel,
  label = 'Tu respuesta',
  minRows = 12,
}: {
  value: string;
  onChange: (v: string) => void;
  disabled?: boolean;
  recommended: [number, number];
  saveLabel?: string;
  label?: string;
  minRows?: number;
}) {
  const ref = useRef<HTMLTextAreaElement>(null);
  const [local, setLocal] = useState(value);
  useEffect(() => setLocal(value), [value]);
  const words = countWords(local);
  const status = words < recommended[0] ? 'warn' : 'ok';
  return (
    <div>
      <div className="mb-1 flex flex-wrap items-center justify-between gap-2">
        <label htmlFor="essay-editor" className="text-sm font-medium text-ink">
          {label}
        </label>
        <div className="flex items-center gap-3 text-xs" aria-live="polite">
          {saveLabel && <span className="text-muted">{saveLabel}</span>}
          <span className={cn('font-semibold tabular-nums', status === 'ok' ? 'text-ok' : 'text-warn')}>
            {words} palabras
          </span>
          <span className="text-muted">objetivo {recommended[0]}–{recommended[1]}</span>
        </div>
      </div>
      <textarea
        id="essay-editor"
        ref={ref}
        value={local}
        disabled={disabled}
        spellCheck={false}
        autoCorrect="off"
        autoCapitalize="sentences"
        rows={minRows}
        onChange={(e) => {
          setLocal(e.target.value);
          onChange(e.target.value);
        }}
        className="w-full resize-y rounded-xl border border-line bg-surface p-4 font-serif text-[1.02rem] leading-relaxed text-ink focus:border-accent disabled:opacity-70"
        placeholder="Escribe aquí en inglés…"
      />
      <p className="mt-1 text-xs text-muted">El corrector ortográfico del navegador está desactivado, como en el examen.</p>
    </div>
  );
}
