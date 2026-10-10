import { useEffect, useId, useMemo, useState } from 'react';
import { CheckCircle2, Keyboard, Languages } from 'lucide-react';
import { cn, countWords } from '@/lib/format';
import { currentPlatform, DICTATION_GUIDES, looksSpanish, type Platform } from '../dictation';

const PLATFORM_LABEL: Record<Platform, string> = {
  windows: 'Windows',
  mac: 'Mac',
  ios: 'iPhone / iPad',
  android: 'Android',
  chromeos: 'Chromebook',
  linux: 'Linux',
  other: 'tu dispositivo',
};

const OK_KEY = 'toefl-dictation-ok';

export function dictationVerified(): boolean {
  try {
    return sessionStorage.getItem(OK_KEY) === '1';
  } catch {
    return false;
  }
}

function markVerified() {
  try {
    sessionStorage.setItem(OK_KEY, '1');
  } catch {
    /* almacenamiento no disponible */
  }
}

/** Instrucciones del dictado para el sistema detectado (y los demás, plegados). */
export function DictationGuide({ platform = currentPlatform() }: { platform?: Platform }) {
  const g = DICTATION_GUIDES[platform];
  const others = (Object.keys(DICTATION_GUIDES) as Platform[]).filter((p) => p !== platform && p !== 'other' && p !== 'linux');
  return (
    <div className="space-y-2 text-sm">
      <p className="flex flex-wrap items-center gap-2 text-ink">
        <Keyboard className="h-4 w-4 text-accent" aria-hidden />
        <span>
          Dictado en <strong>{PLATFORM_LABEL[platform]}</strong>
          {!g.unavailable && (
            <>
              : <kbd className="rounded border border-line bg-surface-3 px-1.5 py-0.5 font-mono text-xs">{g.shortcut}</kbd>
            </>
          )}
        </span>
      </p>
      <ol className="list-decimal space-y-0.5 pl-5 text-ink-2">
        {g.steps.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ol>
      {g.language && (
        <p className="flex items-start gap-2 text-xs text-muted">
          <Languages className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden /> {g.language}
        </p>
      )}
      <details className="text-xs text-muted">
        <summary className="cursor-pointer">Otros sistemas</summary>
        <ul className="mt-1 list-disc space-y-0.5 pl-5">
          {others.map((p) => (
            <li key={p}>
              <strong>{PLATFORM_LABEL[p]}:</strong> {DICTATION_GUIDES[p].shortcut} — {DICTATION_GUIDES[p].steps.at(-1)}
            </li>
          ))}
        </ul>
      </details>
    </div>
  );
}

/**
 * Prueba guiada del dictado antes de responder: el estudiante comprueba que
 * su voz se convierte en texto (y en inglés) dentro de la página.
 */
export function DictationCheck({ onVerified, className }: { onVerified?: () => void; className?: string }) {
  const id = useId();
  const [text, setText] = useState('');
  const [verified, setVerified] = useState(dictationVerified);
  const words = countWords(text);
  const spanish = useMemo(() => looksSpanish(text), [text]);
  const ok = words >= 3 && !spanish;

  useEffect(() => {
    if (!ok || verified) return;
    setVerified(true);
    markVerified();
    onVerified?.();
  }, [ok, verified, onVerified]);

  return (
    <div className={cn('space-y-3 rounded-lg border border-line bg-surface-2 p-3', className)}>
      <DictationGuide />
      <div className="space-y-1">
        <label htmlFor={id} className="text-sm font-medium text-ink">
          Prueba el dictado: activa el dictado aquí y di «Hello, I am practicing for the TOEFL».
        </label>
        <input
          id={id}
          type="text"
          lang="en"
          autoComplete="off"
          spellCheck={false}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Tu voz debería aparecer aquí como texto…"
          className="w-full rounded-lg border border-line bg-surface p-2 text-ink"
        />
        <p className="text-xs" aria-live="polite">
          {spanish ? (
            <span className="text-warn">Parece español: cambia el idioma del dictado a inglés y prueba de nuevo.</span>
          ) : ok || verified ? (
            <span className="flex items-center gap-1 text-ok">
              <CheckCircle2 className="h-3.5 w-3.5" aria-hidden /> El dictado funciona. Úsalo igual en el cuadro de tu respuesta.
            </span>
          ) : (
            <span className="text-muted">Si no aparece nada al hablar, el dictado no está activo: revisa los pasos de arriba.</span>
          )}
        </p>
      </div>
    </div>
  );
}
