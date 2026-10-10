import { useCallback, useEffect, useRef, useState } from 'react';
import { FileAudio, Headphones, Keyboard, Mic, RotateCcw, Save, Square, Timer, Trash2, Upload } from 'lucide-react';
import { Alert, Badge, Button, ProgressBar } from '@/components/ui';
import { useSettings } from '@/app/context';
import { countWords, formatClock } from '@/lib/format';
import { playScript, type PlaybackHandle } from '@/modules/listening/tts';
import { decodeToMono } from '../acoustic';
import { hasAudio, loadRecording, recordingBlob, storeStaticResponse } from '../recordings';
import { beep, type SpeakingRecorderProps } from './SpeakingRecorder';

type Phase = 'ready' | 'prompt' | 'prep' | 'respond' | 'review' | 'saving' | 'saved';

const MAX_UPLOAD_BYTES = 25 * 1024 * 1024;
const MAX_UPLOAD_MS = 300_000;
const MIME_BY_EXT: Record<string, string> = {
  mp3: 'audio/mpeg', m4a: 'audio/mp4', mp4: 'audio/mp4', aac: 'audio/aac', wav: 'audio/wav', ogg: 'audio/ogg', oga: 'audio/ogg', opus: 'audio/ogg', webm: 'audio/webm', flac: 'audio/flac', '3gp': 'audio/3gpp', amr: 'audio/amr',
};

function mimeOf(file: File): string {
  if (file.type) return file.type;
  const ext = file.name.split('.').pop()?.toLowerCase() ?? '';
  return MIME_BY_EXT[ext] ?? 'audio/mpeg';
}

/** Cómo dictar con el sistema operativo: la página nunca accede al micrófono. */
export function DictationHelp({ open = false }: { open?: boolean }) {
  return (
    <details open={open} className="rounded-lg border border-line bg-surface-2 p-3 text-sm">
      <summary className="cursor-pointer font-medium text-ink">Cómo dictar tu respuesta (en inglés)</summary>
      <ul className="mt-2 list-disc space-y-1 pl-5 text-ink-2">
        <li><strong>Windows 10/11:</strong> pulsa <kbd>Win</kbd> + <kbd>H</kbd> con el cursor en el cuadro de texto.</li>
        <li><strong>macOS:</strong> pulsa dos veces <kbd>Fn</kbd> (o la tecla 🎤), o Edición → Iniciar dictado.</li>
        <li><strong>Android / iPhone:</strong> toca el micrófono del teclado.</li>
        <li><strong>ChromeOS:</strong> <kbd>Buscar</kbd> + <kbd>D</kbd>.</li>
      </ul>
      <p className="mt-2 text-xs text-muted">
        Configura el idioma del dictado en <strong>inglés</strong>. El dictado lo hace tu sistema, no esta página (que no tiene acceso al micrófono). Los dictados suelen corregir titubeos y algunos errores: la evaluación lo tiene en cuenta.
      </p>
    </details>
  );
}

/**
 * Respuesta de Speaking en la versión publicada, donde el visor no permite el
 * micrófono: el estudiante responde en voz alta con cronómetro, dicta (con el
 * dictado del sistema) o escribe lo que dijo y, opcionalmente, sube una
 * grabación hecha con otra app para medir pausas y ritmo en el navegador.
 */
export function StaticSpeakingResponse(props: SpeakingRecorderProps) {
  const { promptLines, promptText, showPromptText, prepSec, responseSec, meta, autoStart, allowRetry, existingRecordingId, onSaved, onSkip, allowReplayPrompt } = props;
  const { settings } = useSettings();
  const [phase, setPhase] = useState<Phase>(existingRecordingId ? 'saved' : 'ready');
  const [text, setText] = useState('');
  const [countdown, setCountdown] = useState(0);
  const [elapsedMs, setElapsedMs] = useState(0);
  const [audio, setAudio] = useState<{ blob: Blob; name: string; durationMs: number; url: string } | null>(null);
  const [audioError, setAudioError] = useState<string | null>(null);
  const [checkingAudio, setCheckingAudio] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saved, setSaved] = useState<{ text: string | null; url: string | null; durationMs: number; hasAudio: boolean } | null>(null);
  const tts = useRef<PlaybackHandle | null>(null);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const respondStart = useRef(0);
  const alive = useRef(true);
  const textRef = useRef<HTMLTextAreaElement>(null);
  const urls = useRef<string[]>([]);

  const makeUrl = (b: Blob) => {
    const u = URL.createObjectURL(b);
    urls.current.push(u);
    return u;
  };
  const stopTimer = () => {
    if (timer.current) clearInterval(timer.current);
    timer.current = null;
  };

  useEffect(() => {
    alive.current = true;
    return () => {
      alive.current = false;
      stopTimer();
      tts.current?.stop();
      urls.current.forEach((u) => URL.revokeObjectURL(u));
    };
  }, []);

  // Respuesta ya guardada (al volver a la página en una simulación).
  useEffect(() => {
    if (!existingRecordingId) return;
    void loadRecording(existingRecordingId).then((r) => {
      if (!r || !alive.current) return;
      const withAudio = hasAudio(r);
      setSaved({ text: r.selfTranscript ?? null, url: withAudio ? makeUrl(recordingBlob(r)) : null, durationMs: r.durationMs, hasAudio: withAudio });
    });
  }, [existingRecordingId]);

  const finishResponse = useCallback(() => {
    stopTimer();
    setElapsedMs(Math.min(responseSec * 1000, Date.now() - respondStart.current));
    setPhase('review');
  }, [responseSec]);

  const startResponse = useCallback(() => {
    beep();
    setPhase('respond');
    respondStart.current = Date.now();
    setCountdown(responseSec);
    setTimeout(() => textRef.current?.focus(), 50);
    timer.current = setInterval(() => {
      const left = responseSec - (Date.now() - respondStart.current) / 1000;
      setCountdown(Math.max(0, left));
      if (left <= 0 && alive.current) {
        beep(660);
        finishResponse();
      }
    }, 200);
  }, [responseSec, finishResponse]);

  const startPrep = useCallback(() => {
    if (prepSec <= 0) return startResponse();
    setPhase('prep');
    setCountdown(prepSec);
    const started = Date.now();
    timer.current = setInterval(() => {
      const left = prepSec - (Date.now() - started) / 1000;
      setCountdown(Math.max(0, left));
      if (left <= 0) {
        stopTimer();
        if (alive.current) startResponse();
      }
    }, 200);
  }, [prepSec, startResponse]);

  const start = useCallback(async () => {
    setSaveError(null);
    if (promptLines?.length) {
      setPhase('prompt');
      const h = playScript(promptLines, { female: settings.ttsVoiceFemale, male: settings.ttsVoiceMale, rate: settings.ttsRate });
      tts.current = h;
      await h.done;
      if (!alive.current || tts.current !== h) return;
    }
    startPrep();
  }, [promptLines, settings, startPrep]);

  useEffect(() => {
    if (autoStart && phase === 'ready') void start();
    // Solo al montar / cambiar de ítem.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoStart, meta.itemId]);

  const onFile = async (file: File | undefined) => {
    setAudioError(null);
    if (!file) return;
    if (file.size > MAX_UPLOAD_BYTES) return setAudioError('El archivo supera 25 MB.');
    setCheckingAudio(true);
    try {
      const buf = await file.arrayBuffer();
      const { samples, sampleRate } = await decodeToMono(buf);
      const durationMs = (samples.length / sampleRate) * 1000;
      if (durationMs < 800) return setAudioError('El audio dura menos de 1 segundo.');
      if (durationMs > MAX_UPLOAD_MS) return setAudioError('El audio dura más de 5 minutos: recórtalo a tu respuesta.');
      const blob = new Blob([buf], { type: mimeOf(file) });
      if (audio) URL.revokeObjectURL(audio.url);
      setAudio({ blob, name: file.name, durationMs, url: makeUrl(blob) });
    } catch {
      setAudioError('No se pudo leer el audio en este navegador. Prueba con MP3, M4A, WAV, OGG o WebM.');
    } finally {
      setCheckingAudio(false);
    }
  };

  const save = async () => {
    setSaveError(null);
    setPhase('saving');
    try {
      const rec = await storeStaticResponse({ audio: audio?.blob ?? null, durationMs: audio ? audio.durationMs : elapsedMs, selfTranscript: text }, meta, settings.saveRecordings);
      if (!alive.current) return;
      setSaved({ text: rec.selfTranscript ?? null, url: audio?.url ?? null, durationMs: rec.durationMs, hasAudio: !!audio });
      setPhase('saved');
      onSaved(rec);
    } catch (e) {
      setPhase('review');
      setSaveError(`No se pudo guardar la respuesta: ${(e as Error).message}`);
    }
  };

  const reset = () => {
    stopTimer();
    tts.current?.stop();
    setText('');
    setAudio(null);
    setAudioError(null);
    setSaved(null);
    setElapsedMs(0);
    setPhase('ready');
  };

  const replayPrompt = () => {
    if (!promptLines) return;
    tts.current?.stop();
    tts.current = playScript(promptLines, { female: settings.ttsVoiceFemale, male: settings.ttsVoiceMale, rate: settings.ttsRate });
  };

  const words = countWords(text);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <Badge tone="neutral">
          <Keyboard className="h-3 w-3" aria-hidden /> Respuesta dictada o escrita
        </Badge>
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

      <div className="space-y-4 rounded-xl border border-line bg-surface p-5" aria-live="polite">
        {phase === 'ready' && (
          <div className="space-y-3">
            <p className="text-sm text-ink-2">
              El visor de claude.ai no permite usar el micrófono desde la página. Responde <strong>en voz alta</strong> cuando empiece el cronómetro y, a la vez, <strong>dicta</strong> tu respuesta en el cuadro de texto con el dictado de tu teclado o sistema (o escríbela justo después). Si quieres métricas de pausas y ritmo, grábate con otra app y sube el audio al terminar.
            </p>
            <DictationHelp />
            <div className="flex flex-wrap gap-2">
              <Button size="lg" onClick={() => void start()} icon={<Mic className="h-5 w-5" />}>
                Comenzar
              </Button>
              <Button variant="ghost" onClick={() => setPhase('review')}>
                Responder sin cronómetro
              </Button>
            </div>
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
        {phase === 'respond' && (
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-3">
              <span className="font-semibold text-accent">Responde ahora en voz alta</span>
              <span className="text-2xl font-semibold tabular-nums text-ink" aria-label="Tiempo restante">
                {formatClock(countdown * 1000)}
              </span>
            </div>
            <ProgressBar value={responseSec - countdown} max={responseSec} label="Tiempo de respuesta" tone={countdown < responseSec * 0.2 ? 'warn' : 'accent'} />
          </div>
        )}
        {(phase === 'respond' || phase === 'review' || phase === 'saving') && (
          <div className="space-y-2">
            <label htmlFor={`self-tr-${meta.itemId}`} className="text-sm font-medium text-ink">
              Tu respuesta en inglés (dictada o escrita, tal como la dijiste)
            </label>
            <textarea
              ref={textRef}
              id={`self-tr-${meta.itemId}`}
              rows={5}
              value={text}
              onChange={(e) => setText(e.target.value)}
              spellCheck={false}
              autoCorrect="off"
              autoCapitalize="sentences"
              lang="en"
              placeholder="Dicta o escribe aquí lo que dijiste, incluidos titubeos (um, uh) y errores."
              className="w-full rounded-lg border border-line bg-surface p-3 text-ink"
            />
            <p className="text-xs text-muted">{words} palabras · No corrijas tu respuesta: la evaluación debe reflejar lo que dijiste.</p>
            {phase === 'respond' && (
              <Button variant="outline" onClick={finishResponse} icon={<Square className="h-4 w-4" />}>
                Terminar respuesta
              </Button>
            )}
          </div>
        )}
        {(phase === 'review' || phase === 'saving') && (
          <div className="space-y-3">
            {elapsedMs > 0 && <p className="text-xs text-muted">Tiempo de respuesta: {formatClock(elapsedMs)}</p>}
            <div className="rounded-lg border border-dashed border-line p-3">
              <p className="flex items-center gap-2 text-sm font-medium text-ink">
                <FileAudio className="h-4 w-4 text-accent" aria-hidden /> Audio de tu respuesta (opcional)
              </p>
              <p className="mt-1 text-xs text-muted">
                Si te grabaste con la grabadora del móvil o del ordenador, súbelo para medir pausas, tiempo de habla y ritmo. Se analiza en tu navegador y nunca se envía a Claude.
              </p>
              {audio ? (
                <div className="mt-2 space-y-2">
                  <audio controls src={audio.url} className="w-full" aria-label="Escuchar el audio subido" />
                  <div className="flex flex-wrap items-center gap-2 text-xs text-muted">
                    <span className="truncate">{audio.name} · {formatClock(audio.durationMs)}</span>
                    <Button size="sm" variant="ghost" onClick={() => setAudio(null)} icon={<Trash2 className="h-4 w-4" />}>
                      Quitar
                    </Button>
                  </div>
                </div>
              ) : (
                <label className="mt-2 inline-flex cursor-pointer items-center gap-2 rounded-lg border border-line px-3 py-1.5 text-sm text-ink hover:bg-surface-3">
                  <Upload className="h-4 w-4" aria-hidden />
                  {checkingAudio ? 'Leyendo audio…' : 'Subir audio'}
                  <input
                    type="file"
                    accept="audio/*,.m4a,.mp3,.wav,.ogg,.webm,.aac,.opus,.flac,.3gp,.amr"
                    className="sr-only"
                    disabled={checkingAudio}
                    onChange={(e) => {
                      void onFile(e.target.files?.[0]);
                      e.target.value = '';
                    }}
                  />
                </label>
              )}
              {audioError && <p className="mt-2 text-xs text-bad">{audioError}</p>}
            </div>
            {saveError && <Alert tone="bad">{saveError}</Alert>}
            <div className="flex flex-wrap gap-2">
              <Button onClick={() => void save()} loading={phase === 'saving'} disabled={!text.trim() && !audio} icon={<Save className="h-4 w-4" />}>
                Guardar respuesta
              </Button>
              {onSkip && (
                <Button variant="ghost" onClick={() => onSkip('skipped')}>
                  Omitir esta respuesta
                </Button>
              )}
            </div>
            {!text.trim() && audio && <p className="text-xs text-warn">Sin texto solo se medirán pausas y ritmo; el contenido no podrá evaluarse.</p>}
          </div>
        )}
        {phase === 'saved' && (
          <div className="space-y-3">
            <p className="text-sm font-medium text-ok">Respuesta guardada{saved?.hasAudio ? ` (audio de ${formatClock(saved.durationMs)})` : ''}.</p>
            {saved?.text && <p className="rounded-lg bg-surface-3 p-3 font-serif text-ink">{saved.text}</p>}
            {saved?.url && <audio controls src={saved.url} className="w-full" aria-label="Escuchar tu respuesta" />}
            {!settings.saveRecordings && <p className="text-xs text-warn">El guardado local está desactivado: esta respuesta se perderá al recargar.</p>}
            {allowRetry && (
              <Button variant="outline" size="sm" onClick={reset} icon={<RotateCcw className="h-4 w-4" />}>
                Responder de nuevo
              </Button>
            )}
          </div>
        )}
      </div>

      {allowReplayPrompt && promptLines && phase !== 'prompt' && phase !== 'respond' && (
        <Button variant="ghost" size="sm" onClick={replayPrompt} icon={<Headphones className="h-4 w-4" />}>
          Escuchar la consigna de nuevo
        </Button>
      )}
    </div>
  );
}
