import { useEffect, useRef, useState } from 'react';
import { Headphones, Pause, Play, RotateCcw, Square, Volume2 } from 'lucide-react';
import type { ScriptLine } from '@/modules/question-bank/types';
import { Alert, Badge, Button } from '@/components/ui';
import { useSettings } from '@/app/context';
import { estimateScriptSec, playScript, ttsSupported, type PlaybackHandle } from '../tts';
import { formatClock } from '@/lib/format';

export interface AudioPlayerProps {
  /** Identificador para contar reproducciones. */
  id: string;
  script: ScriptLine[];
  audioSrc?: string;
  /** Reproducciones restantes (null = ilimitadas). */
  playsLeft: number | null;
  onPlayStart: () => void;
  onEnded?: () => void;
  onPlayingChange?: (playing: boolean) => void;
  autoPlay?: boolean;
  /** Mostrar el guion (práctica/revisión o accesibilidad). */
  showTranscript?: boolean;
  compact?: boolean;
}

/**
 * Reproductor integrado: usa la grabación local si existe; si no, síntesis de
 * voz del navegador. Respeta el número de reproducciones permitido.
 */
export function AudioPlayer({ id, script, audioSrc, playsLeft, onPlayStart, onEnded, onPlayingChange, autoPlay, showTranscript, compact }: AudioPlayerProps) {
  const { settings } = useSettings();
  const [state, setState] = useState<'idle' | 'playing' | 'paused' | 'ended' | 'error'>('idle');
  const [line, setLine] = useState(-1);
  const [elapsed, setElapsed] = useState(0);
  const [fileFailed, setFileFailed] = useState(false);
  const handle = useRef<PlaybackHandle | null>(null);
  const audioEl = useRef<HTMLAudioElement | null>(null);
  const started = useRef<number>(0);
  const useFile = !!audioSrc && !fileFailed;
  const total = estimateScriptSec(script, settings.ttsRate);
  const canPlay = playsLeft === null || playsLeft > 0;

  useEffect(() => onPlayingChange?.(state === 'playing'), [state, onPlayingChange]);

  useEffect(() => {
    if (state !== 'playing' || useFile) return;
    const t = setInterval(() => setElapsed((Date.now() - started.current) / 1000), 250);
    return () => clearInterval(t);
  }, [state, useFile]);

  // Detener al desmontar o al cambiar de audio.
  useEffect(() => {
    return () => {
      handle.current?.stop();
      audioEl.current?.pause();
    };
  }, [id]);

  const start = () => {
    if (!canPlay) return;
    onPlayStart();
    setState('playing');
    setLine(0);
    setElapsed(0);
    started.current = Date.now();
    if (useFile) {
      const el = audioEl.current!;
      el.currentTime = 0;
      el.play().catch(() => {
        setFileFailed(true);
        setState('error');
      });
      return;
    }
    const h = playScript(script, { female: settings.ttsVoiceFemale, male: settings.ttsVoiceMale, rate: settings.ttsRate }, { onLine: setLine });
    handle.current = h;
    void h.done.then((r) => {
      if (handle.current !== h) return;
      if (r === 'ended') {
        setState('ended');
        setLine(-1);
        onEnded?.();
      } else if (r === 'error') setState('error');
    });
  };

  const stop = () => {
    handle.current?.stop();
    handle.current = null;
    audioEl.current?.pause();
    setState('ended');
    setLine(-1);
    onEnded?.();
  };

  useEffect(() => {
    if (autoPlay && state === 'idle' && canPlay) start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoPlay, id]);

  const noAudio = !useFile && !ttsSupported();

  return (
    <div className={compact ? 'space-y-2' : 'space-y-3 rounded-xl border border-line bg-surface p-4'}>
      {useFile && (
        <audio
          ref={audioEl}
          src={audioSrc}
          preload="auto"
          onEnded={() => {
            setState('ended');
            onEnded?.();
          }}
          onTimeUpdate={(e) => setElapsed(e.currentTarget.currentTime)}
          onError={() => setFileFailed(true)}
        />
      )}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-soft text-accent" aria-hidden>
          {state === 'playing' ? <Volume2 className="h-5 w-5 animate-pulse" /> : <Headphones className="h-5 w-5" />}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-ink">
            {state === 'playing' ? 'Reproduciendo…' : state === 'ended' ? 'Audio finalizado' : state === 'error' ? 'No se pudo reproducir el audio' : 'Audio listo'}
          </p>
          <p className="text-xs text-muted">
            {useFile ? 'Grabación local' : 'Síntesis de voz del navegador'} · {formatClock(elapsed * 1000)} / ~{formatClock((useFile ? audioEl.current?.duration || total : total) * 1000)}
            {playsLeft !== null && <> · Reproducciones restantes: {playsLeft}</>}
          </p>
        </div>
        <div className="flex gap-2">
          {state === 'playing' ? (
            <>
              {useFile && (
                <Button variant="outline" size="sm" onClick={() => { audioEl.current?.pause(); setState('paused'); }} icon={<Pause className="h-4 w-4" />}>
                  Pausa
                </Button>
              )}
              {playsLeft === null && (
                <Button variant="outline" size="sm" onClick={stop} icon={<Square className="h-4 w-4" />}>
                  Detener
                </Button>
              )}
            </>
          ) : state === 'paused' ? (
            <Button size="sm" onClick={() => { void audioEl.current?.play(); setState('playing'); }} icon={<Play className="h-4 w-4" />}>
              Continuar
            </Button>
          ) : (
            <Button size="sm" onClick={start} disabled={!canPlay || noAudio} icon={state === 'ended' ? <RotateCcw className="h-4 w-4" /> : <Play className="h-4 w-4" />}>
              {state === 'ended' ? 'Volver a escuchar' : 'Reproducir'}
            </Button>
          )}
        </div>
      </div>
      {state === 'playing' && !useFile && line >= 0 && (
        <div className="flex items-center gap-2 text-xs text-muted" aria-live="polite">
          <Badge>{script[line]?.speaker}</Badge> hablando ({line + 1}/{script.length})
        </div>
      )}
      {(noAudio || state === 'error') && (
        <Alert tone="warn" title="Audio no disponible">
          Este navegador no puede reproducir síntesis de voz o falló la reproducción. Puedes leer la transcripción como alternativa accesible. Para una experiencia realista, añade grabaciones en <code>public/audio/</code> (ver README).
        </Alert>
      )}
      {(showTranscript || noAudio || state === 'error') && (
        <details className="rounded-lg bg-surface-3 p-3 text-sm" open={noAudio || state === 'error'}>
          <summary className="cursor-pointer font-medium text-ink">Transcripción</summary>
          <div className="mt-2 space-y-1.5">
            {script.map((l, i) => (
              <p key={i} className={i === line ? 'text-ink' : 'text-ink-2'}>
                <span className="font-semibold">{l.speaker}:</span> {l.text}
              </p>
            ))}
          </div>
        </details>
      )}
    </div>
  );
}
