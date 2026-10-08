import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, useSyncExternalStore, type ReactNode } from 'react';
import { ShieldCheck } from 'lucide-react';
import type { ServerCapabilities } from '@shared/speaking-types';
import { Alert, Button, Dialog } from '@/components/ui';
import { getCapabilities } from '@/lib/api';
import { builtinSets, buildBank, type QuestionBank } from '@/modules/question-bank/registry';
import { DEFAULT_SETTINGS, applyTheme, loadSettings, persistSettings, type Settings } from '@/modules/settings/settings';
import { MicrophoneManager, type MicState } from '@/modules/speaking/microphone';
import { listCustomSets } from '@/modules/storage/repositories';
import type { CustomSetRecord } from '@/modules/storage/db';

// ---------- Ajustes ----------

interface SettingsCtx {
  settings: Settings;
  ready: boolean;
  storageError: string | null;
  update: (patch: Partial<Settings>) => void;
}
const SettingsContext = createContext<SettingsCtx | null>(null);

function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const [ready, setReady] = useState(false);
  const [storageError, setStorageError] = useState<string | null>(null);

  useEffect(() => {
    loadSettings()
      .then((s) => setSettings(s))
      .catch((e: Error) => setStorageError(e.message))
      .finally(() => setReady(true));
  }, []);

  useEffect(() => {
    applyTheme(settings.theme, settings.largeText);
    if (settings.theme !== 'system') return;
    const mq = window.matchMedia?.('(prefers-color-scheme: dark)');
    const onChange = () => applyTheme('system', settings.largeText);
    mq?.addEventListener('change', onChange);
    return () => mq?.removeEventListener('change', onChange);
  }, [settings.theme, settings.largeText]);

  const update = useCallback((patch: Partial<Settings>) => {
    setSettings((prev) => {
      const next = { ...prev, ...patch };
      persistSettings(next).catch((e: Error) => setStorageError(e.message));
      return next;
    });
  }, []);

  return <SettingsContext.Provider value={{ settings, ready, storageError, update }}>{children}</SettingsContext.Provider>;
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error('useSettings fuera de SettingsProvider');
  return ctx;
}

// ---------- Banco de preguntas (integrado + importado) ----------

interface BankCtx {
  bank: QuestionBank;
  custom: CustomSetRecord[];
  reload: () => Promise<void>;
}
const BankContext = createContext<BankCtx | null>(null);

function BankProvider({ children }: { children: ReactNode }) {
  const [custom, setCustom] = useState<CustomSetRecord[]>([]);
  const [audio, setAudio] = useState<Record<string, string>>({});
  // Grabaciones opcionales: public/audio/manifest.json → { "<setId>": "<archivo>" }.
  useEffect(() => {
    fetch('/audio/manifest.json')
      .then((r) => (r.ok ? r.json() : {}))
      .then((m: unknown) => {
        if (m && typeof m === 'object') setAudio(Object.fromEntries(Object.entries(m as Record<string, unknown>).filter(([, v]) => typeof v === 'string').map(([k, v]) => [k, `/audio/${String(v).replace(/^\/+/, '')}`])));
      })
      .catch(() => undefined);
  }, []);
  const reload = useCallback(async () => {
    try {
      setCustom(await listCustomSets());
    } catch {
      setCustom([]);
    }
  }, []);
  useEffect(() => {
    void reload();
  }, [reload]);
  const bank = useMemo(
    () =>
      buildBank(
        [...builtinSets, ...custom.map((c) => ({ ...c.set, source: c.pack }))].map((s) =>
          s.section === 'listening' && !s.audioSrc && audio[s.id] ? { ...s, audioSrc: audio[s.id] } : s,
        ),
      ),
    [custom, audio],
  );
  return <BankContext.Provider value={{ bank, custom, reload }}>{children}</BankContext.Provider>;
}

export function useBank() {
  const ctx = useContext(BankContext);
  if (!ctx) throw new Error('useBank fuera de BankProvider');
  return ctx;
}

// ---------- Capacidades del servidor ----------

interface CapsCtx {
  caps: ServerCapabilities | null;
  loading: boolean;
  refresh: () => Promise<void>;
}
const CapsContext = createContext<CapsCtx | null>(null);

function CapabilitiesProvider({ children }: { children: ReactNode }) {
  const [caps, setCaps] = useState<ServerCapabilities | null>(null);
  const [loading, setLoading] = useState(true);
  const refresh = useCallback(async () => {
    setLoading(true);
    setCaps(await getCapabilities());
    setLoading(false);
  }, []);
  useEffect(() => {
    void refresh();
  }, [refresh]);
  return <CapsContext.Provider value={{ caps, loading, refresh }}>{children}</CapsContext.Provider>;
}

export function useCapabilities() {
  const ctx = useContext(CapsContext);
  if (!ctx) throw new Error('useCapabilities fuera de CapabilitiesProvider');
  return ctx;
}

// ---------- Micrófono (instancia única) ----------

const MicContext = createContext<MicrophoneManager | null>(null);

function MicProvider({ children }: { children: ReactNode }) {
  const ref = useRef<MicrophoneManager | null>(null);
  if (!ref.current) ref.current = new MicrophoneManager();
  useEffect(() => {
    const mic = ref.current!;
    void mic.init();
    const stop = () => mic.release();
    window.addEventListener('pagehide', stop);
    return () => {
      window.removeEventListener('pagehide', stop);
      mic.release();
    };
  }, []);
  return <MicContext.Provider value={ref.current}>{children}</MicContext.Provider>;
}

export function useMic(): { mic: MicrophoneManager; state: MicState } {
  const mic = useContext(MicContext);
  if (!mic) throw new Error('useMic fuera de MicProvider');
  const state = useSyncExternalStore(
    (cb) => mic.subscribe(() => cb()),
    () => mic.getState(),
    () => mic.getState(),
  );
  return { mic, state };
}

// ---------- Avisos (toasts) ----------

interface Toast {
  id: number;
  message: string;
  tone: 'info' | 'ok' | 'warn' | 'bad';
}
const ToastContext = createContext<(message: string, tone?: Toast['tone']) => void>(() => undefined);

function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const push = useCallback((message: string, tone: Toast['tone'] = 'info') => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t.slice(-3), { id, message, tone }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 5000);
  }, []);
  return (
    <ToastContext.Provider value={push}>
      {children}
      <div className="pointer-events-none fixed bottom-4 right-4 z-[60] flex w-[min(24rem,calc(100%-2rem))] flex-col gap-2" aria-live="polite">
        {toasts.map((t) => (
          <div key={t.id} className="pointer-events-auto shadow-lg">
            <Alert tone={t.tone}>{t.message}</Alert>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);

// ---------- Consentimiento para servicios externos ----------

export type ExternalService = 'stt' | 'pronunciation' | 'evaluator';
type ConsentFn = (services: ExternalService[]) => Promise<boolean>;
const ConsentContext = createContext<ConsentFn>(async () => false);

const SERVICE_LABEL: Record<ExternalService, string> = {
  stt: 'Transcripción automática',
  pronunciation: 'Evaluación de pronunciación',
  evaluator: 'Evaluación con IA',
};

function ConsentProvider({ children }: { children: ReactNode }) {
  const { settings, update } = useSettings();
  const { caps } = useCapabilities();
  const [pending, setPending] = useState<{ services: ExternalService[]; resolve: (v: boolean) => void } | null>(null);
  const sessionGrant = useRef(false);

  const ensure = useCallback<ConsentFn>(
    (services) => {
      const configured = services.filter((s) => caps?.[s]?.configured);
      if (!configured.length) return Promise.resolve(false);
      if (settings.cloudConsent === 'denied') return Promise.resolve(false);
      if (settings.cloudConsent === 'granted' || sessionGrant.current) return Promise.resolve(true);
      return new Promise<boolean>((resolve) => setPending({ services: configured, resolve }));
    },
    [caps, settings.cloudConsent],
  );

  const close = (value: boolean, remember?: 'session' | 'always' | 'never') => {
    if (remember === 'session') sessionGrant.current = true;
    if (remember === 'always') update({ cloudConsent: 'granted' });
    if (remember === 'never') update({ cloudConsent: 'denied' });
    pending?.resolve(value);
    setPending(null);
  };

  return (
    <ConsentContext.Provider value={ensure}>
      {children}
      <Dialog
        open={!!pending}
        onOpenChange={(v) => !v && close(false)}
        title="¿Enviar datos a un servicio externo?"
        description="Antes de continuar, revisa qué se enviará y a quién."
        footer={
          <>
            <Button variant="ghost" onClick={() => close(false, 'never')}>
              No, nunca
            </Button>
            <Button variant="outline" onClick={() => close(false)}>
              Ahora no
            </Button>
            <Button variant="outline" onClick={() => close(true, 'session')}>
              Permitir en esta sesión
            </Button>
            <Button icon={<ShieldCheck className="h-4 w-4" />} onClick={() => close(true, 'always')}>
              Permitir siempre
            </Button>
          </>
        }
      >
        <ul className="space-y-3">
          {pending?.services.map((s) => (
            <li key={s}>
              <p className="font-medium text-ink">{SERVICE_LABEL[s]}</p>
              <p>{caps?.[s]?.dataPolicy}</p>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-xs text-muted">
          Puedes cambiar esta decisión en Configuración → Privacidad. Si no aceptas, la evaluación se hará solo con análisis local y rúbricas.
        </p>
      </Dialog>
    </ConsentContext.Provider>
  );
}

export const useConsent = () => useContext(ConsentContext);

// ---------- Composición ----------

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <SettingsProvider>
      <CapabilitiesProvider>
        <BankProvider>
          <MicProvider>
            <ToastProvider>
              <ConsentProvider>{children}</ConsentProvider>
            </ToastProvider>
          </MicProvider>
        </BankProvider>
      </CapabilitiesProvider>
    </SettingsProvider>
  );
}
