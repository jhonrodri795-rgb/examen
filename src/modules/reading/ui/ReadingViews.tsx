import { Fragment, useState, type ReactNode } from 'react';
import { BookOpenText, CheckCircle2, ListChecks, XCircle } from 'lucide-react';
import type { AcademicPassageSet, ChoiceQuestion, CompleteWordsSet, DailyLifeSet } from '@/modules/question-bank/types';
import { gapItemId, parseCloze } from '@/modules/question-bank/items';
import { Badge, Button } from '@/components/ui';
import { cn } from '@/lib/format';
import { gapMatches } from '@/modules/scoring/spelling';

const GENRE: Record<DailyLifeSet['genre'], string> = {
  email: 'Correo electrónico', notice: 'Aviso', 'text-message': 'Mensajes', schedule: 'Horario', advertisement: 'Anuncio', memo: 'Memorando', webpage: 'Página web', menu: 'Menú',
};

function highlightText(text: string, phrase?: string): ReactNode {
  if (!phrase) return text;
  const idx = text.indexOf(phrase);
  if (idx < 0) return text;
  return (
    <>
      {text.slice(0, idx)}
      <mark className="rounded bg-amber-200 px-0.5 text-navy-950 dark:bg-amber-300">{phrase}</mark>
      {text.slice(idx + phrase.length)}
    </>
  );
}

/** Estímulo de lectura (Read in Daily Life o Academic Passage) con resaltado. */
export function PassageView({ set, question }: { set: DailyLifeSet | AcademicPassageSet; question?: ChoiceQuestion }) {
  if (set.task === 'daily-life') {
    return (
      <article aria-label={`Texto: ${set.title}`} className="rounded-xl border border-line bg-surface p-5">
        <div className="mb-3 flex items-center gap-2">
          <Badge tone="accent">{GENRE[set.genre]}</Badge>
          <h2 className="text-sm font-semibold text-ink">{set.title}</h2>
        </div>
        {set.header && (
          <div className="mb-3 border-b border-line pb-3 text-sm text-ink-2">
            {set.header.map((h) => (
              <p key={h} className="font-medium">
                {h}
              </p>
            ))}
          </div>
        )}
        <div className="whitespace-pre-line font-serif text-[1.02rem] leading-relaxed text-ink">{set.text}</div>
      </article>
    );
  }
  return (
    <article aria-label={`Lectura: ${set.title}`} className="rounded-xl border border-line bg-surface p-5">
      <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-ink">
        <BookOpenText className="h-5 w-5 text-accent" aria-hidden /> {set.title}
      </h2>
      <div className="reading-text font-serif text-[1.05rem] leading-relaxed text-ink">
        {set.paragraphs.map((p, i) => {
          const active = question?.paragraph === i;
          return (
            <p key={i} className={cn('relative rounded-md transition-colors', active && 'bg-accent-soft/70 ring-1 ring-accent/40 -mx-2 px-2 py-1')}>
              <span className="mr-2 select-none text-xs font-sans font-semibold text-muted" aria-label={`Párrafo ${i + 1}`}>
                {active ? '➤' : ''}P{i + 1}
              </span>
              {highlightText(p, active || question?.paragraph === undefined ? question?.highlight : undefined)}
            </p>
          );
        })}
      </div>
    </article>
  );
}

/** Complete the Words: texto con huecos rellenables. */
export function ClozeView({
  set,
  values,
  onChange,
  disabled,
  revealed,
  onCheck,
}: {
  set: CompleteWordsSet;
  values: Record<string, string>;
  onChange: (itemId: string, value: string) => void;
  disabled: boolean;
  revealed: boolean;
  onCheck?: () => void;
}) {
  const segments = parseCloze(set.text);
  const [showHelp, setShowHelp] = useState(false);
  const total = segments.filter((s) => s.gap).length;
  let correctCount = 0;
  return (
    <section aria-label="Complete the Words" className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <Badge tone="brand">Complete the Words</Badge>
          <h2 className="mt-2 text-lg font-semibold text-ink">{set.title}</h2>
          <p className="text-sm text-muted">Completa las letras que faltan en cada palabra. El número de casillas indica cuántas letras faltan.</p>
        </div>
        <Button variant="ghost" size="sm" onClick={() => setShowHelp((v) => !v)} aria-expanded={showHelp} icon={<ListChecks className="h-4 w-4" />}>
          Cómo responder
        </Button>
      </div>
      {showHelp && (
        <p className="rounded-lg bg-surface-3 p-3 text-sm text-ink-2">
          Escribe solo las letras que faltan (también se acepta la palabra completa). Usa Tab para pasar al siguiente hueco. No se distingue entre mayúsculas y minúsculas.
        </p>
      )}
      <div className="rounded-xl border border-line bg-surface p-5 font-serif text-[1.08rem] leading-[2.4] text-ink">
        {segments.map((seg, i) => {
          if (!seg.gap) return <Fragment key={i}>{seg.text}</Fragment>;
          const id = gapItemId(set.id, seg.gap.index);
          const val = values[id] ?? '';
          const ok = gapMatches(val, seg.gap);
          if (revealed && ok) correctCount++;
          return (
            <span key={i} className="inline-flex items-baseline whitespace-nowrap">
              <span>{seg.gap.prefix}</span>
              <input
                aria-label={`Hueco ${seg.gap.index + 1}: palabra que empieza por "${seg.gap.prefix}", faltan ${seg.gap.missing.length} letras`}
                value={val}
                disabled={disabled}
                maxLength={seg.gap.word.length + 2}
                autoComplete="off"
                autoCapitalize="off"
                spellCheck={false}
                onChange={(e) => onChange(id, e.target.value)}
                style={{ width: `${Math.max(2.2, seg.gap.missing.length * 0.78 + 1)}em` }}
                className={cn(
                  'mx-0.5 h-8 rounded-md border-b-2 border-x border-t border-line bg-surface-2 px-1 font-sans text-base tracking-wider text-ink',
                  'focus:border-accent focus:bg-accent-soft',
                  revealed && (ok ? 'border-ok bg-ok-soft' : 'border-bad bg-bad-soft'),
                )}
                placeholder={'_'.repeat(seg.gap.missing.length)}
              />
              {revealed && !ok && (
                <span className="ml-1 font-sans text-xs text-ok" aria-label={`Correcta: ${seg.gap.word}`}>
                  ({seg.gap.missing})
                </span>
              )}
            </span>
          );
        })}
      </div>
      {onCheck && !revealed && (
        <Button variant="secondary" onClick={onCheck}>
          Comprobar respuestas
        </Button>
      )}
      {revealed && (
        <div className="rounded-lg border border-line bg-surface-3 p-3 text-sm">
          <p className="flex items-center gap-2 font-semibold text-ink">
            {correctCount === total ? <CheckCircle2 className="h-4 w-4 text-ok" /> : <XCircle className="h-4 w-4 text-bad" />}
            {correctCount} de {total} correctas
          </p>
          {set.note && <p className="mt-1 text-ink-2">{set.note}</p>}
        </div>
      )}
    </section>
  );
}
