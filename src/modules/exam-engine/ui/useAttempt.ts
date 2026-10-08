import { useCallback, useEffect, useRef, useState } from 'react';
import { getAttempt, saveAttempt } from '../../storage/repositories';
import { recoverInterrupted } from '../engine';
import type { Attempt } from '../types';

export type AttemptStatus = 'loading' | 'ready' | 'missing' | 'error' | 'conflict';
export type SaveState = 'saved' | 'saving' | 'error';

/**
 * Carga un intento, aplica transformaciones del motor y lo guarda con
 * autoguardado (debounce) + latido periódico mientras corre el tiempo.
 * Cada cambio incrementa `rev`; el repositorio rechaza escrituras antiguas.
 */
export function useAttempt(attemptId: string) {
  const [attempt, setAttempt] = useState<Attempt | null>(null);
  const [status, setStatus] = useState<AttemptStatus>('loading');
  const [saveState, setSaveState] = useState<SaveState>('saved');
  const [error, setError] = useState<string | null>(null);
  const latest = useRef<Attempt | null>(null);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const saving = useRef<Promise<void> | null>(null);
  const dirty = useRef(false);

  useEffect(() => {
    let cancelled = false;
    setStatus('loading');
    getAttempt(attemptId)
      .then((a) => {
        if (cancelled) return;
        if (!a) {
          setStatus('missing');
          return;
        }
        const recovered = recoverInterrupted(a);
        latest.current = recovered;
        setAttempt(recovered);
        setStatus('ready');
      })
      .catch((e: Error) => {
        if (cancelled) return;
        setError(e.message);
        setStatus('error');
      });
    return () => {
      cancelled = true;
    };
  }, [attemptId]);

  const flush = useCallback(async () => {
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = null;
    if (!dirty.current || !latest.current) return;
    if (saving.current) await saving.current;
    const toSave = latest.current;
    dirty.current = false;
    setSaveState('saving');
    saving.current = saveAttempt(toSave)
      .then((res) => {
        if (!res.ok) {
          setStatus('conflict');
          setSaveState('error');
          return;
        }
        setSaveState(dirty.current ? 'saving' : 'saved');
      })
      .catch((e: Error) => {
        dirty.current = true;
        setSaveState('error');
        setError(`No se pudo guardar: ${e.message}`);
      })
      .finally(() => {
        saving.current = null;
      });
    await saving.current;
  }, []);

  const schedule = useCallback(
    (immediate: boolean) => {
      dirty.current = true;
      setSaveState('saving');
      if (saveTimer.current) clearTimeout(saveTimer.current);
      saveTimer.current = setTimeout(() => void flush(), immediate ? 0 : 400);
    },
    [flush],
  );

  /** Aplica una función pura del motor sobre el estado más reciente. */
  const apply = useCallback(
    (fn: (a: Attempt, now: number) => Attempt, opts: { immediate?: boolean } = {}) => {
      const prev = latest.current;
      if (!prev) return prev;
      const now = Date.now();
      const out = fn(prev, now);
      if (out === prev) return prev;
      const next = { ...out, rev: prev.rev + 1 };
      latest.current = next;
      setAttempt(next);
      schedule(!!opts.immediate);
      return next;
    },
    [schedule],
  );

  // Latido: guarda el progreso del temporizador cada 5 s para recuperar sesiones interrumpidas.
  useEffect(() => {
    const id = setInterval(() => {
      const a = latest.current;
      if (!a || a.status !== 'in-progress' || a.interrupted) return;
      const running = a.sections.some((s) => s.modules.some((m) => m.timer.startedAt != null));
      if (running) apply((x, now) => ({ ...x, updatedAt: now }));
    }, 5000);
    return () => clearInterval(id);
  }, [apply]);

  // Guardado inmediato al ocultar/cerrar la pestaña.
  useEffect(() => {
    const onHide = () => {
      if (document.visibilityState === 'hidden') void flush();
    };
    const onPageHide = () => void flush();
    document.addEventListener('visibilitychange', onHide);
    window.addEventListener('pagehide', onPageHide);
    return () => {
      document.removeEventListener('visibilitychange', onHide);
      window.removeEventListener('pagehide', onPageHide);
      void flush();
    };
  }, [flush]);

  return { attempt, status, saveState, error, apply, flush };
}

/** Reloj que se actualiza periódicamente (para temporizadores en pantalla). */
export function useNow(intervalMs = 250): number {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), intervalMs);
    return () => clearInterval(id);
  }, [intervalMs]);
  return now;
}
