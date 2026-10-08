/**
 * Reproducción de guiones con la síntesis de voz del navegador (Web Speech
 * API). Se usa como solución de demostración cuando no hay grabaciones
 * locales (`audioSrc`). Cada línea se reproduce por separado para evitar el
 * corte de enunciados largos en algunos navegadores y para poder detenerla.
 */
import type { ScriptLine, Voice } from '../question-bank/types';

const FEMALE_HINTS = /(female|woman|samantha|victoria|karen|moira|tessa|fiona|zira|aria|jenny|susan|hazel|libby|sonia|natasha|serena|allison|ava|joanna|kendra|salli|emma|olivia|google us english$|google uk english female)/i;
const MALE_HINTS = /(male|man\b|daniel|alex|fred|tom\b|david|mark|guy|ryan|george|arthur|oliver|james|matthew|joey|justin|brian|eric|google uk english male)/i;

export function ttsSupported(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window && typeof SpeechSynthesisUtterance !== 'undefined';
}

export function englishVoices(): SpeechSynthesisVoice[] {
  if (!ttsSupported()) return [];
  return window.speechSynthesis.getVoices().filter((v) => v.lang?.toLowerCase().startsWith('en'));
}

/** Espera a que el navegador cargue la lista de voces (asíncrona en Chrome). */
export function loadVoices(timeoutMs = 1500): Promise<SpeechSynthesisVoice[]> {
  if (!ttsSupported()) return Promise.resolve([]);
  const now = englishVoices();
  if (now.length) return Promise.resolve(now);
  return new Promise((resolve) => {
    const done = () => resolve(englishVoices());
    window.speechSynthesis.addEventListener('voiceschanged', done, { once: true });
    setTimeout(done, timeoutMs);
  });
}

export interface VoicePrefs {
  female: string | null;
  male: string | null;
  rate: number;
}

export function pickVoice(voices: SpeechSynthesisVoice[], kind: Voice, prefs: VoicePrefs): SpeechSynthesisVoice | null {
  const wanted = kind === 'male' ? prefs.male : prefs.female;
  const byName = wanted ? voices.find((v) => v.name === wanted) : undefined;
  if (byName) return byName;
  const us = voices.filter((v) => /en[-_]US/i.test(v.lang));
  const pool = us.length ? us : voices;
  const hint = kind === 'male' ? MALE_HINTS : FEMALE_HINTS;
  const other = kind === 'male' ? FEMALE_HINTS : MALE_HINTS;
  return pool.find((v) => hint.test(v.name) && !(kind === 'female' && MALE_HINTS.test(v.name))) ?? pool.find((v) => !other.test(v.name)) ?? pool[0] ?? null;
}

export interface PlaybackHandle {
  stop: () => void;
  done: Promise<'ended' | 'stopped' | 'error'>;
}

/**
 * Reproduce un guion línea a línea. Incluye un temporizador de seguridad por
 * línea: si el navegador no emite `end` (ocurre en algunos entornos), se
 * continúa con la siguiente para no bloquear el examen.
 */
export function playScript(
  lines: ScriptLine[],
  prefs: VoicePrefs,
  hooks: { onLine?: (index: number) => void } = {},
): PlaybackHandle {
  let stopped = false;
  let resolveDone!: (v: 'ended' | 'stopped' | 'error') => void;
  const done = new Promise<'ended' | 'stopped' | 'error'>((r) => (resolveDone = r));
  if (!ttsSupported()) {
    resolveDone('error');
    return { stop: () => undefined, done };
  }
  const synth = window.speechSynthesis;
  synth.cancel();

  void (async () => {
    const voices = await loadVoices();
    for (let i = 0; i < lines.length && !stopped; i++) {
      const line = lines[i]!;
      hooks.onLine?.(i);
      const ok = await new Promise<boolean>((resolve) => {
        const u = new SpeechSynthesisUtterance(line.text);
        const v = pickVoice(voices, line.voice, prefs);
        if (v) u.voice = v;
        u.lang = v?.lang ?? 'en-US';
        u.rate = prefs.rate;
        // Si solo hay una voz disponible, el tono ayuda a distinguir hablantes.
        const distinct = voices.length > 1 && pickVoice(voices, 'male', prefs)?.name !== pickVoice(voices, 'female', prefs)?.name;
        u.pitch = distinct ? 1 : line.voice === 'male' ? 0.8 : line.voice === 'female' ? 1.2 : 1;
        const words = line.text.split(/\s+/).length;
        const watchdog = setTimeout(() => resolve(true), ((words / (2.4 * prefs.rate)) * 1000) + 2500);
        u.onend = () => {
          clearTimeout(watchdog);
          resolve(true);
        };
        u.onerror = (e) => {
          clearTimeout(watchdog);
          resolve(e.error === 'interrupted' || e.error === 'canceled');
        };
        synth.speak(u);
      });
      if (!ok) {
        resolveDone('error');
        return;
      }
      if (i < lines.length - 1 && !stopped) await new Promise((r) => setTimeout(r, 350));
    }
    resolveDone(stopped ? 'stopped' : 'ended');
  })();

  return {
    stop: () => {
      stopped = true;
      synth.cancel();
      resolveDone('stopped');
    },
    done,
  };
}

/** Duración estimada de un guion (para mostrar progreso aproximado). */
export function estimateScriptSec(lines: ScriptLine[], rate: number): number {
  const words = lines.reduce((s, l) => s + l.text.split(/\s+/).length, 0);
  return Math.round(words / (2.5 * rate) + lines.length * 0.35);
}
