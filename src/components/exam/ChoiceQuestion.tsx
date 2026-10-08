import { CheckCircle2, Flag, XCircle } from 'lucide-react';
import type { ChoiceQuestion as Q } from '@/modules/question-bank/types';
import { Badge, Button } from '@/components/ui';
import { SKILL_LABEL } from '@/modules/scoring/advice';
import { cn } from '@/lib/format';

export interface ChoiceQuestionProps {
  question: Q;
  selected: number[];
  onChange: (selected: number[]) => void;
  disabled: boolean;
  /** Mostrar solución y explicación (práctica comprobada o revisión). */
  revealed: boolean;
  flagged?: boolean;
  onToggleFlag?: () => void;
  onCheck?: () => void;
  number?: number;
  showSkill?: boolean;
}

const LETTERS = 'ABCDEFGH';

export function ChoiceQuestion({ question, selected, onChange, disabled, revealed, flagged, onToggleFlag, onCheck, number, showSkill }: ChoiceQuestionProps) {
  const multiple = question.kind === 'multiple';
  const correct = new Set(question.answer);
  const isCorrect = selected.length === correct.size && selected.every((s) => correct.has(s));
  const groupName = `q-${question.id}`;

  const toggle = (i: number) => {
    if (disabled) return;
    if (!multiple) return onChange([i]);
    const set = new Set(selected);
    if (set.has(i)) set.delete(i);
    else set.add(i);
    onChange([...set].sort((a, b) => a - b));
  };

  return (
    <fieldset className="space-y-4" aria-describedby={revealed ? `${groupName}-exp` : undefined}>
      <legend className="w-full">
        <div className="mb-2 flex flex-wrap items-center gap-2">
          {number !== undefined && <Badge tone="brand">Pregunta {number}</Badge>}
          {multiple && <Badge tone="accent">Selecciona {question.answer.length}</Badge>}
          {showSkill && <Badge>{SKILL_LABEL[question.skill]}</Badge>}
          {onToggleFlag && (
            <Button variant={flagged ? 'secondary' : 'ghost'} size="sm" onClick={onToggleFlag} aria-pressed={!!flagged} icon={<Flag className={cn('h-3.5 w-3.5', flagged && 'fill-current text-warn')} />}>
              {flagged ? 'Marcada' : 'Marcar para revisión'}
            </Button>
          )}
        </div>
        <p className="text-base font-medium leading-relaxed text-ink">{question.prompt}</p>
      </legend>

      <div className="space-y-2" role={multiple ? 'group' : 'radiogroup'} aria-label="Opciones de respuesta">
        {question.options.map((opt, i) => {
          const isSel = selected.includes(i);
          const showCorrect = revealed && correct.has(i);
          const showWrong = revealed && isSel && !correct.has(i);
          return (
            <label
              key={i}
              className={cn(
                'flex cursor-pointer items-start gap-3 rounded-lg border px-3 py-2.5 text-sm transition-colors',
                disabled && 'cursor-default',
                isSel ? 'border-accent bg-accent-soft' : 'border-line bg-surface hover:bg-surface-3',
                showCorrect && 'border-ok bg-ok-soft',
                showWrong && 'border-bad bg-bad-soft',
              )}
            >
              <input
                type={multiple ? 'checkbox' : 'radio'}
                name={groupName}
                className="mt-0.5 h-4 w-4 accent-sky-600"
                checked={isSel}
                disabled={disabled}
                onChange={() => toggle(i)}
              />
              <span className="font-semibold text-muted">{LETTERS[i]}.</span>
              <span className="flex-1 text-ink">{opt}</span>
              {showCorrect && <CheckCircle2 className="h-4 w-4 shrink-0 text-ok" aria-label="Respuesta correcta" />}
              {showWrong && <XCircle className="h-4 w-4 shrink-0 text-bad" aria-label="Respuesta incorrecta" />}
            </label>
          );
        })}
      </div>

      {onCheck && !revealed && (
        <Button variant="secondary" onClick={onCheck} disabled={selected.length === 0}>
          Comprobar respuesta
        </Button>
      )}

      {revealed && (
        <div id={`${groupName}-exp`} className={cn('rounded-lg border p-3 text-sm', isCorrect ? 'border-ok bg-ok-soft' : 'border-line bg-surface-3')}>
          <p className="font-semibold text-ink">
            {selected.length === 0 ? 'Sin responder' : isCorrect ? '¡Correcto!' : 'Incorrecto'} · Respuesta: {question.answer.map((a) => LETTERS[a]).join(', ')}
          </p>
          <p className="mt-1 text-ink-2">{question.explanation}</p>
        </div>
      )}
    </fieldset>
  );
}
