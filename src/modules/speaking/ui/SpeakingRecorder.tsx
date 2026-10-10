import { useCallback, useEffect, useRef, useState } from 'react';
import { Headphones, Mic, RotateCcw, Square, Timer } from 'lucide-react';
import type { ScriptLine } from '@/modules/question-bank/types';
import type { RecordingRecord } from '@/modules/storage/db';
import { Alert, Badge, Button, ProgressBar } from '@/components/ui';
import { useMic, useSettings } from '@/app/context';
import { formatClock } from '@/lib/format';
import { playScript, type PlaybackHandle } from '@/modules/listening/tts';
import { ISSUE_MESSAGES, Recorder, validateRecording } from '../recorder';
import { loadRecording, recordingBlob, storeRecording, type RecordingMetaInput } from '../recordings';
import { LevelMeterBar, MicStatusBadge } from './MicPanel';
import { StaticSpeakingResponse } from './StaticSpeakingResponse';
import { STATIC_BUILD } from '@/lib/runtime';

type Phase = 'ready' | 'prompt' | 'prep' | 'recording' | 'saving' | 'saved' | 'error';

export function beep(freq = 880, ms = 160): void {
  try {
    const Ctx = window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new Ctx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    gain.gain.value = 0.08;
    osc.frequency.value = freq;
    osc.connect(gain).connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + ms / 1000);
    osc.onended = () => void ctx.close();
  } catch {
    /* sin audio: se omite el pitido */
  }
}

export interface SpeakingRecorderProps {
  promptLines: ScriptLine[] | null;
  promptText?: string;
  /** Mostrar el texto de la consigna (en Listen and Repeat se oculta como en el examen). */
  showPromptText: boolean;
  prepSec: number;
  responseSec: number;
  minMs: number;
  meta: RecordingMetaInput;
  autoStart: boolean;
  allowRetry: boolean;
  existingRecordingId?: string | null;
  onSaved: (rec: RecordingRecord) => void;
  onSkip?: (reason: 'no-mic' | 'skipped' | 'error') => void;
  /** Permite volver a escuchar la consigna (práctica). */
  allowReplayPrompt?: boolean;
}

/** Grabadora de respuestas; en la versión publicada (sin micrófono), respuesta dictada o escrita. */
export function SpeakingRecorder(props: SpeakingRecorderProps) {
  return STATIC_BUILD ? <StaticSpeakingResponse {...props} /> : <MicSpeakingRecorder {...props} />;
}

function MicSpeakingRecorder(props: SpeakingRecorderProps) {
  const { promptLines, promptText, showPromptText, prepSec, responseSec, minMs, meta, autoStart, allowRetry, existingRecordingId, onSaved, onSkip, allowReplayPrompt } = props;
  const { mic, state: micState } = useMic();
  const { settings } = useSettings();
  const [phase, setPhase] = useState<Phase>(existingRecordingId ? 'saved' : 'ready');
  const [countdown, setCountdown] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [savedDuration, setSavedDuration] = useState<number | null>(null);
  const recorder = useRef<Recorder | null>(null);
  const tts = useRef<PlaybackHandle | null>(null);
  const alive = useRef(true);
  const timers = useRef<ReturnType<typeof setInterval>[]>([]);

  const clearTimers = () => {
    timers.current.forEach(clearInterval);
    timers.current = [];
  };

  useEffect(() => {
    alive.current = true;
    return () => {
      alive.current = false;
      clearTimers();
      tts.current?.stop();
      recorder.current?.cancel();
    };
  }, []);

  // Cargar grabación existente para reproducirla.
  useEffect(() => {
    if (!existingRecordingId) return;
    let url: string | null = null;
    void loadRecording(existingRecordingId).then((r) => {
      if (!r || !alive.current) return;
      url = URL.createObjectURL(recordingBlob(r));
      setAudioUrl(url);
      setSavedDuration(r.durationMs);
    });
    return () => {
      if (url) URL.revokeObjectURL(url);
    };
  }, [existingRecordingId]);

  const record = useCallback(async () => {
    const stream = await mic.acquire(settings.micDeviceId);
    if (!alive.current) return;
    if (!stream) {
      setPhase('error');
      setError('No se puede grabar: el micrófono no está disponible.');
      return;
    }
    beep();
    const rec = new Recorder();
    recorder.current = rec;
    setPhase('recording');
    setElapsed(0);
    const tick = setInterval(() => setElapsed(rec.elapsedMs()), 200);
    timers.current.push(tick);
    try {
      const result = await rec.start(stream, { maxMs: responseSec * 1000 });
      clearInterval(tick);
      if (!alive.current) return;
      const issue = validateRecording(result, { minMs, maxMs: responseSec * 1000 });
      if (issue === 'empty' || issue === 'too-short') {
        setPhase('error');
        setError(ISSUE_MESSAGES[issue]);
        return;
      }
      setPhase('saving');
      const saved = await storeRecording(result, meta, settings.saveRecordings);
      if (!alive.current) return;
      if (audioUrl) URL.revokeObjectURL(audioUrl);
      setAudioUrl(URL.createObjectURL(result.blob));
      setSavedDuration(result.durationMs);
      setPhase('saved');
      if (result.stopReason === 'interrupted') setError('La grabación se interrumpió (micrófono desconectado). Se guardó lo grabado hasta ese momento.');
      onSaved(saved);
    } catch (e) {
      clearInterval(tick);
      if (!alive.current) return;
      setPhase('error');
      setError((e as Error).message);
    }
  }, [mic, settings.micDeviceId, settings.saveRecordings, responseSec, minMs, meta, onSaved, audioUrl]);

  const startPrep = useCallback(() => {
    if (prepSec <= 0) return void record();
    setPhase('prep');
    setCountdown(prepSec);
    const started = Date.now();
    const t = setInterval(() => {
      const left = prepSec - (Date.now() - started) / 1000;
      setCountdown(Math.max(0, left));
      if (left <= 0) {
        clearInterval(t);
        if (alive.current) void record();
      }
    }, 200);
    timers.current.push(t);
  }, [prepSec, record]);

  const start = useCallback(async () => {
    setError(null);
    // Activar el micrófono antes de la consigna para no perder tiempo de respuesta.
    const stream = await mic.acquire(settings.micDeviceId);
    if (!alive.current) return;
    if (!stream) {
      setPhase('error');
      setError('No se puede grabar: el micrófono no está disponible.');
      return;
    }
    if (promptLines?.length) {
      setPhase('prompt');
      const h = playScript(promptLines, { female: settings.ttsVoiceFemale, male: settings.ttsVoiceMale, rate: settings.ttsRate });
      tts.current = h;
      await h.done;
      if (!alive.current || tts.current !== h) return;
    }
    startPrep();
  }, [mic, settings, promptLines, startPrep]);

  useEffect(() => {
    if (autoStart && phase === 'ready') void start();
    // Solo al montar / cambiar de ítem.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoStart, meta.itemId]);

  const replayPrompt = () => {
    if (!promptLines) return;
    tts.current?.stop();
    tts.current = playScript(promptLines, { female: settings.ttsVoiceFemale, male: settings.ttsVoiceMale, rate: settings.ttsRate });
  };

  const micBlocked = ['blocked', 'unavailable', 'unsupported'].includes(micState.status);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <MicStatusBadge state={micState} />
        <div className="flex items-center gap-2 text-xs text-muted">
          <Timer className="h-3.5 w-3.5" aria-hidden />
          {prepSec > 0 && <>Preparación {prepSec} s · </>}Respuesta {responseSec} s
        </div>
      </div>

      {showPromptText && promptText && (
        <div className="rounded-xl border border-line bg-surface p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted">Pregunta</p>
          <p className="mt-1 text-lg text-ink">{promptText}</p>
        </div>
      )}

      <div className="rounded-xl border border-line bg-surface p-5" aria-live="polite">
        {phase === 'ready' && (
          <div className="flex flex-col items-center gap-3 text-center">
            <p className="text-sm text-ink-2">{promptLines ? 'Pulsa "Comenzar": escucharás la consigna y, tras el pitido, empezará la grabación.' : 'Pulsa "Comenzar" para iniciar la grabación.'}</p>
            <Button size="lg" onClick={() => void start()} disabled={micBlocked} icon={<Mic className="h-5 w-5" />}>
              Comenzar
            </Button>
          </div>
        )}
        {phase === 'prompt' && (
          <div className="flex items-center justify-center gap-3 py-4 text-ink">
            <Headphones className="h-6 w-6 animate-pulse text-accent" aria-hidden />
            <span className="font-medium">Escucha…</span>
          </div>
        )}
        {phase === 'prep' && (
          <div className="space-y-2 py-2 text-center">
            <Badge tone="accent">Tiempo de preparación</Badge>
            <p className="text-4xl font-semibold tabular-nums text-ink">{formatClock(countdown * 1000)}</p>
            <ProgressBar value={prepSec - countdown} max={prepSec} label="Preparación" />
          </div>
        )}
        {phase === 'recording' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-3">
              <span className="flex items-center gap-2 font-semibold text-bad">
                <span className="rec-dot inline-block h-3 w-3 rounded-full bg-red-500" aria-hidden /> Grabando
              </span>
              <span className="text-2xl font-semibold tabular-nums text-ink" aria-label="Tiempo restante">
                {formatClock(Math.max(0, responseSec * 1000 - elapsed))}
              </span>
            </div>
            <ProgressBar value={elapsed} max={responseSec * 1000} label="Tiempo de respuesta" tone={elapsed > responseSec * 800 ? 'warn' : 'accent'} />
            <LevelMeterBar stream={mic.getStream()} />
            <Button variant="outline" onClick={() => recorder.current?.stop()} icon={<Square className="h-4 w-4" />}>
              Terminar respuesta
            </Button>
          </div>
        )}
        {phase === 'saving' && <p className="py-4 text-center text-sm text-muted">Guardando grabación…</p>}
        {phase === 'saved' && (
          <div className="space-y-3">
            <p className="text-sm font-medium text-ok">Respuesta grabada{savedDuration ? ` (${formatClock(savedDuration)})` : ''}.</p>
            {audioUrl && <audio controls src={audioUrl} className="w-full" aria-label="Escuchar tu respuesta" />}
            {!settings.saveRecordings && <p className="text-xs text-warn">El guardado local está desactivado: esta grabación se perderá al recargar.</p>}
            {allowRetry && (
              <Button variant="outline" size="sm" onClick={() => { setPhase('ready'); void start(); }} icon={<RotateCcw className="h-4 w-4" />}>
                Volver a grabar
              </Button>
            )}
          </div>
        )}
        {phase === 'error' && (
          <div className="space-y-3">
            <Alert tone="bad" title="No se completó la grabación">
              {error}
            </Alert>
            <div className="flex flex-wrap gap-2">
              <Button onClick={() => { setPhase('ready'); void start(); }} disabled={micBlocked} icon={<RotateCcw className="h-4 w-4" />}>
                Reintentar
              </Button>
              {onSkip && (
                <Button variant="ghost" onClick={() => onSkip(micBlocked ? 'no-mic' : 'error')}>
                  Omitir esta respuesta
                </Button>
              )}
            </div>
          </div>
        )}
        {error && phase === 'saved' && <p className="mt-2 text-xs text-warn">{error}</p>}
      </div>

      {allowReplayPrompt && promptLines && phase !== 'recording' && phase !== 'prompt' && (
        <Button variant="ghost" size="sm" onClick={replayPrompt} icon={<Headphones className="h-4 w-4" />}>
          Escuchar la consigna de nuevo
        </Button>
      )}
      {micBlocked && micState.error && (
        <Alert tone="warn" title={micState.error.title}>
          {micState.error.message}
          {onSkip && (
            <div className="mt-2">
              <Button size="sm" variant="outline" onClick={() => onSkip('no-mic')}>
                Continuar sin grabar
              </Button>
            </div>
          )}
        </Alert>
      )}
    </div>
  );
}
