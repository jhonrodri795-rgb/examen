import { useEffect, useRef, useState } from 'react';
import { AlertTriangle, CheckCircle2, Loader2, Mic, MicOff, Power, RefreshCw } from 'lucide-react';
import { Alert, Badge, Button, Select } from '@/components/ui';
import { useMic, useSettings } from '@/app/context';
import { cn, formatClock } from '@/lib/format';
import { LevelMeter, type MicState, type MicStatus } from '../microphone';
import { Recorder, type RecordingResult } from '../recorder';
import { STATIC_BUILD } from '@/lib/runtime';
import { micPolicy } from '../dictation';

/** Aviso para la versión publicada en claude.ai: cómo se responde a Speaking allí. */
export function StaticMicNotice() {
  if (!STATIC_BUILD) return null;
  const blocked = micPolicy() === 'blocked';
  return (
    <Alert tone={blocked ? 'warn' : 'info'} title={blocked ? 'Esta página no puede grabar tu voz' : 'Speaking en la versión publicada'}>
      {blocked ? (
        <p>El visor de claude.ai no permite que las páginas publicadas usen el micrófono. Tu respuesta cuenta cuando tu voz se convierte en <strong>texto</strong> con el <strong>dictado de tu sistema</strong> (prueba abajo cómo activarlo) o cuando la escribes. No hace falta subir audio.</p>
      ) : (
        <p>Puedes intentar grabar con el micrófono de esta página; si el visor lo bloquea, responde con el <strong>dictado de tu sistema</strong> o escribiendo.</p>
      )}
      <ul className="mt-1 list-disc pl-5">
        <li>Claude evalúa el contenido (uso de la lengua, desarrollo y cumplimiento de la tarea) con tu cuenta de claude.ai.</li>
        <li>Opcional: sube un audio grabado con otra app para medir pausas y ritmo. La pronunciación no se puntúa.</li>
      </ul>
      <p className="mt-1">Para grabar con transcripción automática del audio, ejecuta la aplicación en tu ordenador (<code>npm install</code> y <code>npm run dev</code>, ver README).</p>
    </Alert>
  );
}

const STATUS: Record<MicStatus, { label: string; tone: 'ok' | 'warn' | 'bad' | 'neutral' | 'accent' }> = {
  idle: { label: 'Disponible', tone: 'neutral' },
  requesting: { label: 'Solicitando permiso…', tone: 'accent' },
  active: { label: 'Activo', tone: 'ok' },
  blocked: { label: 'Bloqueado', tone: 'bad' },
  unavailable: { label: 'No disponible', tone: 'bad' },
  busy: { label: 'Ocupado', tone: 'warn' },
  disconnected: { label: 'Desconectado', tone: 'warn' },
  unsupported: { label: 'No compatible', tone: 'bad' },
  error: { label: 'Error', tone: 'bad' },
};

export function MicStatusBadge({ state }: { state: MicState }) {
  const s = STATUS[state.status];
  const icon = state.status === 'active' ? <Mic className="h-3 w-3" /> : state.status === 'requesting' ? <Loader2 className="h-3 w-3 animate-spin" /> : <MicOff className="h-3 w-3" />;
  return (
    <Badge tone={s.tone}>
      {icon} Micrófono: {s.label}
      {state.muted && state.status === 'active' ? ' (silenciado)' : ''}
    </Badge>
  );
}

/** Medidor de nivel de entrada en tiempo real. */
export function LevelMeterBar({ stream, className }: { stream: MediaStream | null; className?: string }) {
  const [level, setLevel] = useState({ pct: 0, db: -100 });
  useEffect(() => {
    if (!stream) return;
    let meter: LevelMeter | null = null;
    try {
      meter = new LevelMeter(stream);
    } catch {
      return;
    }
    let raf = 0;
    let last = 0;
    const loop = (t: number) => {
      if (t - last > 60) {
        const r = meter!.read();
        setLevel({ pct: Math.max(0, Math.min(100, ((r.db + 60) / 60) * 100)), db: r.db });
        last = t;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      meter?.dispose();
    };
  }, [stream]);
  const tone = level.db > -6 ? 'bg-bad' : level.db > -40 ? 'bg-ok' : 'bg-warn';
  return (
    <div className={className}>
      <div className="h-3 w-full overflow-hidden rounded-full bg-surface-3" role="meter" aria-label="Nivel de entrada del micrófono" aria-valuemin={-60} aria-valuemax={0} aria-valuenow={Math.round(level.db)}>
        <div className={cn('h-full rounded-full transition-[width] duration-75', stream ? tone : 'bg-surface-3')} style={{ width: `${stream ? level.pct : 0}%` }} />
      </div>
      <p className="mt-1 text-xs text-muted">
        {!stream ? 'Micrófono inactivo' : level.db < -50 ? 'No se detecta sonido: habla para comprobar el nivel.' : level.db > -6 ? 'Nivel demasiado alto: aléjate un poco.' : level.db < -40 ? 'Nivel bajo: acércate al micrófono.' : 'Nivel correcto.'}
      </p>
    </div>
  );
}

/** Panel de configuración del micrófono: estado, selección de dispositivo, nivel y prueba. */
export function MicSetupPanel({ compact }: { compact?: boolean }) {
  const { mic, state } = useMic();
  const { settings, update } = useSettings();
  const [testing, setTesting] = useState<'idle' | 'recording' | 'done'>('idle');
  const [testUrl, setTestUrl] = useState<string | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const [testError, setTestError] = useState<string | null>(null);
  const recRef = useRef<Recorder | null>(null);
  const stream = state.status === 'active' ? mic.getStream() : null;

  useEffect(() => () => {
    if (testUrl) URL.revokeObjectURL(testUrl);
  }, [testUrl]);

  useEffect(() => {
    if (testing !== 'recording') return;
    const t = setInterval(() => setElapsed(recRef.current?.elapsedMs() ?? 0), 200);
    return () => clearInterval(t);
  }, [testing]);

  const activate = () => void mic.acquire(settings.micDeviceId);

  const runTest = async () => {
    setTestError(null);
    const s = await mic.acquire(settings.micDeviceId);
    if (!s) return;
    const rec = new Recorder();
    recRef.current = rec;
    setTesting('recording');
    try {
      const result: RecordingResult = await rec.start(s, { maxMs: 4000 });
      if (testUrl) URL.revokeObjectURL(testUrl);
      if (result.sizeBytes === 0) setTestError('La grabación de prueba está vacía. Comprueba el dispositivo.');
      else setTestUrl(URL.createObjectURL(result.blob));
      setTesting('done');
    } catch (e) {
      setTestError((e as Error).message);
      setTesting('idle');
    }
  };

  if (STATIC_BUILD) return <StaticMicNotice />;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <MicStatusBadge state={state} />
        <div className="flex flex-wrap gap-2">
          {state.status === 'active' ? (
            <Button variant="outline" size="sm" onClick={() => mic.release()} icon={<Power className="h-4 w-4" />}>
              Detener micrófono
            </Button>
          ) : (
            <Button size="sm" onClick={activate} disabled={state.status === 'unsupported' || state.status === 'requesting'} icon={state.status === 'idle' ? <Mic className="h-4 w-4" /> : <RefreshCw className="h-4 w-4" />}>
              {state.status === 'idle' ? 'Activar micrófono' : 'Reintentar'}
            </Button>
          )}
        </div>
      </div>

      {state.error && (
        <Alert tone={state.status === 'busy' || state.status === 'disconnected' ? 'warn' : 'bad'} title={state.error.title}>
          <p>{state.error.message}</p>
          {state.error.help.length > 0 && (
            <ol className="mt-2 list-decimal space-y-1 pl-5">
              {state.error.help.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ol>
          )}
        </Alert>
      )}
      {state.notice && <Alert tone="info">{state.notice}</Alert>}

      {state.devices.length > 0 && (
        <Select
          id="mic-device"
          label="Dispositivo de entrada"
          value={state.activeDeviceId ?? settings.micDeviceId ?? state.devices[0]!.deviceId}
          onChange={(id) => {
            update({ micDeviceId: id });
            void mic.selectDevice(id);
          }}
          options={state.devices.map((d) => ({ value: d.deviceId, label: d.label }))}
        />
      )}
      {state.devices.length > 0 && state.permission !== 'granted' && (
        <p className="text-xs text-muted">Los nombres de los dispositivos se muestran después de conceder el permiso.</p>
      )}

      <LevelMeterBar stream={stream} />

      {!compact && (
        <div className="rounded-lg border border-line p-3">
          <p className="text-sm font-medium text-ink">Prueba de audio</p>
          <p className="text-xs text-muted">Graba 4 segundos y escucha el resultado para comprobar calidad y volumen.</p>
          <div className="mt-2 flex flex-wrap items-center gap-3">
            <Button variant="secondary" size="sm" onClick={runTest} disabled={testing === 'recording' || state.status === 'unsupported'} icon={<Mic className="h-4 w-4" />}>
              {testing === 'recording' ? `Grabando… ${formatClock(elapsed)}` : 'Grabar prueba'}
            </Button>
            {testUrl && <audio controls src={testUrl} className="h-9 max-w-full" aria-label="Reproducir grabación de prueba" />}
          </div>
          {testing === 'done' && !testError && (
            <p className="mt-2 flex items-center gap-1 text-xs text-ok">
              <CheckCircle2 className="h-3.5 w-3.5" /> Grabación correcta. Si no se oye bien, revisa el dispositivo seleccionado.
            </p>
          )}
          {testError && (
            <p className="mt-2 flex items-center gap-1 text-xs text-bad">
              <AlertTriangle className="h-3.5 w-3.5" /> {testError}
            </p>
          )}
        </div>
      )}
      <p className="text-xs text-muted">
        La aplicación solo activa el micrófono cuando lo pides o durante una tarea de Speaking, y lo detiene al salir del módulo. Requiere HTTPS o localhost.
      </p>
    </div>
  );
}
