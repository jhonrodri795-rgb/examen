import type { ExamMode, TimingMode } from '../exam-engine/types';
import { kvGet, kvSet } from '../storage/repositories';

export type Theme = 'system' | 'light' | 'dark';

export interface Settings {
  theme: Theme;
  defaultMode: ExamMode;
  defaultTiming: TimingMode;
  defaultBlueprintId: string;
  instantFeedback: boolean;
  relaxedListening: boolean;
  speakingPrepSec: number;
  ttsRate: number;
  ttsVoiceFemale: string | null;
  ttsVoiceMale: string | null;
  micDeviceId: string | null;
  /** Guardar grabaciones de Speaking en este navegador. */
  saveRecordings: boolean;
  /** Consentimiento para enviar audio/texto a proveedores externos configurados en el servidor. */
  cloudConsent: 'ask' | 'granted' | 'denied';
  largeText: boolean;
}

export const DEFAULT_SETTINGS: Settings = {
  theme: 'system',
  defaultMode: 'practice',
  defaultTiming: 'standard',
  defaultBlueprintId: 'toefl-ibt-2026',
  instantFeedback: true,
  relaxedListening: true,
  speakingPrepSec: 0,
  ttsRate: 0.95,
  ttsVoiceFemale: null,
  ttsVoiceMale: null,
  micDeviceId: null,
  saveRecordings: true,
  cloudConsent: 'ask',
  largeText: false,
};

const KEY = 'settings';

export async function loadSettings(): Promise<Settings> {
  const stored = await kvGet<Partial<Settings>>(KEY).catch(() => undefined);
  return { ...DEFAULT_SETTINGS, ...(stored ?? {}) };
}

export async function persistSettings(s: Settings): Promise<void> {
  await kvSet(KEY, s);
  try {
    localStorage.setItem('toefl.theme', s.theme);
  } catch {
    /* almacenamiento no disponible: el tema se aplica igualmente en esta sesión */
  }
}

/** ¿El entorno pide modo oscuro? Respeta el tema del visor (data-theme) y, si no, el del sistema. */
export function systemPrefersDark(): boolean {
  const host = document.documentElement.getAttribute('data-theme');
  if (host === 'dark' || host === 'light') return host === 'dark';
  return !!window.matchMedia?.('(prefers-color-scheme: dark)').matches;
}

export function applyTheme(theme: Theme, largeText = false): void {
  const dark = theme === 'dark' || (theme === 'system' && systemPrefersDark());
  document.documentElement.classList.toggle('dark', dark);
  document.documentElement.classList.toggle('light', !dark);
  document.documentElement.classList.toggle('text-lg-mode', largeText);
}
