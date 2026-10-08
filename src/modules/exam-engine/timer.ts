import type { TimerState } from './types';

/**
 * Temporizadores basados en marcas de tiempo (no en contadores de intervalos):
 * siguen siendo exactos aunque el navegador ralentice `setInterval` en
 * pestañas en segundo plano.
 */
export function createTimer(limitMs: number | null): TimerState {
  return { limitMs, elapsedMs: 0, startedAt: null };
}

export function elapsedMs(t: TimerState, now: number): number {
  return t.elapsedMs + (t.startedAt != null ? Math.max(0, now - t.startedAt) : 0);
}

export function remainingMs(t: TimerState, now: number): number | null {
  if (t.limitMs == null) return null;
  return Math.max(0, t.limitMs - elapsedMs(t, now));
}

export function isExpired(t: TimerState, now: number): boolean {
  const r = remainingMs(t, now);
  return r !== null && r <= 0;
}

export function startTimer(t: TimerState, now: number): TimerState {
  return t.startedAt != null ? t : { ...t, startedAt: now };
}

export function stopTimer(t: TimerState, now: number): TimerState {
  if (t.startedAt == null) return t;
  const elapsed = elapsedMs(t, now);
  return { ...t, elapsedMs: t.limitMs != null ? Math.min(elapsed, t.limitMs) : elapsed, startedAt: null };
}

export function scaleLimit(limitSec: number | null, timing: 'standard' | 'extended' | 'untimed'): number | null {
  if (limitSec == null || timing === 'untimed') return null;
  return Math.round(limitSec * 1000 * (timing === 'extended' ? 1.5 : 1));
}
