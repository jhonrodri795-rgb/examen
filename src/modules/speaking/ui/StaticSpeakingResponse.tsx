import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AlertTriangle, FileAudio, Headphones, Mic, Play, RotateCcw, Save, Square, Timer, Trash2, Type, Upload } from 'lucide-react';
import { Alert, Badge, Button, ProgressBar } from '@/components/ui';
import { useMic, useSettings } from '@/app/context';
import { countWords, formatClock } from '@/lib/format';
import { playScript, type PlaybackHandle } from '@/modules/listening/tts';
import { decodeToMono } from '../acoustic';
import { BROWSER_STT_POLICY, LiveTranscriber, speechRecognitionCtor } from '../browser-stt';
import { currentPlatform, DICTATION_GUIDES, looksSpanish, micPolicy } from '../dictation';
import { Recorder, type RecordingResult } from '../recorder';
import { hasAudio, loadRecording, recordingBlob, storeStaticResponse } from '../recordings';
import { DictationCheck, DictationGuide, dictationVerified } from './DictationCheck';
import { LevelMeterBar } from './MicPanel';
import { beep, type SpeakingRecorderProps } from './SpeakingRecorder';

type Phase = 'ready' | 'prompt' | 'prep' | 'respond' | 'review' | 'saving' | 'saved';

interface AudioClip {
  blob: Blob;
  name: string;
  durationMs: number;
  url: string;
  source: 'mic' | 'upload';
}

const MAX_UPLOAD_BYTES = 25 * 1024 * 1024;
const MAX_UPLOAD_MS = 300_000;
/** Segundos de respuesta sin texto tras los que se avisa de que el dictado no llega. */
const NO_TEXT_WARNING_SEC = 8;
const MIME_BY_EXT: Record<string, string> = {
  mp3: 'audio/mpeg', m4a: 'audio/mp4', mp4: 'audio/mp4', aac: 'audio/aac', wav: 'audio/wav', ogg: 'audio/ogg', oga: 'audio/ogg', opus: 'audio/ogg', webm: 'audio/webm', flac: 'audio/flac', '3gp': 'audio/3gpp', amr: 'audio/amr',
};

function mimeOf(file: File): string {
  if (file.type) return file.type;
  const ext = file.name.split('.').pop()?.toLowerCase() ?? '';
  return MIME_BY_EXT[ext] ?? 'audio/mpeg';
}

function readPref(key: string, fallback: boolean): boolean {
  try {
    const v = sessionStorage.getItem(key);
    return v === null ? fallback : v === '1';
  } catch {
    return fallback;
  }
}
function writePref(key: string, v: boolean) {
  try {
    sessionStorage.setItem(key, v ? '1' : '0');
  } catch {
    /* sin almacenamiento */
  }
}

/** Compatibilidad: instrucciones + prueba del dictado. */
export function DictationHelp({ open = false }: { open?: boolean }) {
  return open ? <DictationCheck /> : (
    <details className="rounded-lg border border-line bg-surface-2 p-3 text-sm">
      <summary className="cursor-pointer font-medium text-ink">Cómo dictar tu respuesta (en inglés)</summary>
      <div className="mt-2">
        <DictationCheck className="border-0 bg-transparent p-0" />
      </div>
    </details>
  );
}

/**
 * Respuesta de Speaking en la versión publicada. Si el visor permite el
 * micrófono, la página graba el audio (y, si el usuario lo activa, lo
 * transcribe con el reconocimiento del navegador). Si no, la voz se convierte
 * en texto con el dictado del sistema operativo; la página lo deja claro y
 * avisa si no llega texto. Un audio grabado con otra app es opcional.
 */
export function StaticSpeakingResponse(props: SpeakingRecorderProps) {
  const { promptLines, promptText, showPromptText, prepSec, responseSec, minMs, meta, autoStart, allowRetry, existingRecordingId, onSaved, onSkip, allowReplayPrompt } = props;
  const { settings } = useSettings();
  const { mic, state: micState } = useMic();
  const policy = useMemo(() => micPolicy(), []);
  const platform = useMemo(() => currentPlatform(), []);
  const guide = DICTATION_GUIDES[platform];
  const SR = useMemo(() => speechRecognitionCtor(), []);

  const [phase, setPhase] = useState<Phase>(existingRecordingId ? 'saved' : 'ready');
  const [text, setText] = useState('');
  const [interim, setInterim] = useState('');
  const [countdown, setCountdown] = useState(0);
  const [elapsedMs, setElapsedMs] = useState(0);
  const [audio, setAudio] = useState<AudioClip | null>(null);
  const [audioError, setAudioError] = useState<string | null>(null);
  const [checkingAudio, setCheckingAudio] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saved, setSaved] = useState<{ text: string | null; url: string | null; durationMs: number; hasAudio: boolean } | null>(null);
  // Micrófono de la página: solo se ofrece si la política del visor no lo prohíbe.
  const [micBlocked, setMicBlocked] = useState(policy === 'blocked');
  const [micNote, setMicNote] = useState<string | null>(null);
  const [useMicPref, setUseMicPref] = useState(() => readPref('toefl-static-use-mic', policy === 'allowed'));
  const [liveSttPref, setLiveSttPref] = useState(() => readPref('toefl-static-live-stt', false));
  const [recording, setRecording] = useState(false);
  const [sttActive, setSttActive] = useState(false);
  const [sttError, setSttError] = useState<string | null>(null);
  const [showCheck, setShowCheck] = useState(() => !dictationVerified());

  const useMicNow = !micBlocked && useMicPref;
  const liveStt = useMicNow && !!SR && liveSttPref && settings.cloudConsent !== 'denied';

  const tts = useRef<PlaybackHandle | null>(null);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const respondStart = useRef(0);
  const alive = useRef(true);
  const textRef = useRef<HTMLTextAreaElement>(null);
  const urls = useRef<string[]>([]);
  const recorder = useRef<Recorder | null>(null);
  const recordingDone = useRef<Promise<RecordingResult> | null>(null);
  const transcriber = useRef<LiveTranscriber | null>(null);
  const finishing = useRef(false);

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
      recorder.current?.cancel();
      transcriber.current?.abort();
      urls.current.forEach((u) => URL.revokeObjectURL(u));
      mic.release();
    };
  }, [mic]);

  // Respuesta ya guardada (al volver a la página en una simulación).
  useEffect(() => {
    if (!existingRecordingId) return;
    void loadRecording(existingRecordingId).then((r) => {
      if (!r || !alive.current) return;
      const withAudio = hasAudio(r);
      setSaved({ text: r.selfTranscript ?? null, url: withAudio ? makeUrl(recordingBlob(r)) : null, durationMs: r.durationMs, hasAudio: withAudio });
    });
  }, [existingRecordingId]);

  const finishResponse = useCallback(async () => {
    if (finishing.current) return;
    finishing.current = true;
    stopTimer();
    setElapsedMs(Math.min(responseSec * 1000, Date.now() - respondStart.current));
    setPhase('review');
    recorder.current?.stop();
    const pending = recordingDone.current;
    recordingDone.current = null;
    const stt = transcriber.current;
    transcriber.current = null;
    if (pending) {
      try {
        const r = await pending;
        if (alive.current && r.sizeBytes > 0 && r.durationMs >= minMs) setAudio({ blob: r.blob, name: 'Grabación de esta página', durationMs: r.durationMs, url: makeUrl(r.blob), source: 'mic' });
        else if (alive.current) setMicNote('La grabación quedó vacía o es demasiado corta; no se guardará audio.');
      } catch (e) {
        if (alive.current) setMicNote(`No se pudo completar la grabación: ${(e as Error).message}`);
      }
    }
    setRecording(false);
    mic.release();
    if (stt) {
      const out = await stt.stop();
      if (alive.current && out.text) setText(out.text);
      if (alive.current) {
        setInterim('');
        setSttActive(false);
      }
    }
    finishing.current = false;
  }, [responseSec, minMs, mic]);

  const startResponse = useCallback(
    (stream: MediaStream | null) => {
      beep();
      setPhase('respond');
      respondStart.current = Date.now();
      setCountdown(responseSec);
      if (stream) {
        const rec = new Recorder();
        recorder.current = rec;
        recordingDone.current = rec.start(stream, { maxMs: responseSec * 1000 + 500 });
        setRecording(true);
      }
      if (stream && liveStt && SR) {
        const t = new LiveTranscriber(SR, {
          onUpdate: (finalText, interimText) => {
            if (!alive.current) return;
            setText(finalText);
            setInterim(interimText);
          },
          onError: (message) => {
            if (!alive.current) return;
            setSttError(`${message} Puedes dictar con tu sistema o escribir.`);
            setSttActive(false);
          },
        });
        transcriber.current = t;
        try {
          t.start();
          setSttActive(true);
        } catch (e) {
          setSttError(`No se pudo iniciar el reconocimiento de voz: ${(e as Error).message}`);
        }
      } else {
        setTimeout(() => textRef.current?.focus(), 50);
      }
      timer.current = setInterval(() => {
        const left = responseSec - (Date.now() - respondStart.current) / 1000;
        setCountdown(Math.max(0, left));
        if (left <= 0 && alive.current) {
          beep(660);
          void finishResponse();
        }
      }, 200);
    },
    [responseSec, liveStt, SR, finishResponse],
  );

  const startPrep = useCallback(
    (stream: MediaStream | null) => {
      if (prepSec <= 0) return startResponse(stream);
      setPhase('prep');
      setCountdown(prepSec);
      const started = Date.now();
      timer.current = setInterval(() => {
        const left = prepSec - (Date.now() - started) / 1000;
        setCountdown(Math.max(0, left));
        if (left <= 0) {
          stopTimer();
          if (alive.current) startResponse(stream);
        }
      }, 200);
    },
    [prepSec, startResponse],
  );

  const start = useCallback(async () => {
    setSaveError(null);
    setMicNote(null);
    setSttError(null);
    setShowCheck(false);
    let stream: MediaStream | null = null;
    if (useMicNow) {
      // Solo tras pulsar «Empezar» (o al entrar en el ítem de una simulación).
      stream = await mic.acquire(settings.micDeviceId);
      if (!alive.current) return;
      if (!stream) {
        const err = mic.getState().error;
        setMicBlocked(true);
        setMicNote(`${err ? `${err.title}. ` : ''}No se puede grabar en esta página: continúa con el dictado de tu sistema o escribe tu respuesta.`);
      }
    }
    if (promptLines?.length) {
      setPhase('prompt');
      const h = playScript(promptLines, { female: settings.ttsVoiceFemale, male: settings.ttsVoiceMale, rate: settings.ttsRate });
      tts.current = h;
      await h.done;
      if (!alive.current || tts.current !== h) return;
    }
    startPrep(stream);
  }, [useMicNow, mic, settings, promptLines, startPrep]);

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
      setAudio({ blob, name: file.name, durationMs, url: makeUrl(blob), source: 'upload' });
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
      const rec = await storeStaticResponse(
        { audio: audio?.blob ?? null, audioSource: audio?.source, durationMs: audio ? audio.durationMs : elapsedMs, selfTranscript: text },
        meta,
        settings.saveRecordings,
      );
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
    recorder.current?.cancel();
    recordingDone.current = null;
    transcriber.current?.abort();
    transcriber.current = null;
    mic.release();
    setRecording(false);
    setSttActive(false);
    setInterim('');
    setText('');
    setAudio(null);
    setAudioError(null);
    setSaved(null);
    setElapsedMs(0);
    setMicNote(null);
    setSttError(null);
    setPhase('ready');
  };

  const replayPrompt = () => {
    if (!promptLines) return;
    tts.current?.stop();
    tts.current = playScript(promptLines, { female: settings.ttsVoiceFemale, male: settings.ttsVoiceMale, rate: settings.ttsRate });
  };

  const words = countWords(text);
  const spanish = looksSpanish(text);
  const respondedSec = responseSec - countdown;
  const noTextYet = phase === 'respond' && !sttActive && words === 0 && respondedSec >= NO_TEXT_WARNING_SEC;
  const dictationShortcut = guide.unavailable ? null : guide.shortcut;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <Badge tone={recording ? 'bad' : 'neutral'}>
          {recording ? <Mic className="h-3 w-3" aria-hidden /> : <Type className="h-3 w-3" aria-hidden />}
          {recording ? 'Grabando con el micrófono' : useMicNow ? 'Micrófono + texto' : 'Respuesta por dictado o escrita'}
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
          <div className="space-y-4">
            {micBlocked ? (
              <Alert tone="warn" title="Esta página no puede grabar tu voz">
                El visor de claude.ai no permite que las páginas publicadas usen el micrófono. Para que tu respuesta cuente, tu voz tiene que convertirse en <strong>texto</strong> en el cuadro de respuesta con el <strong>dictado de tu sistema</strong>
                {dictationShortcut ? <> ({dictationShortcut})</> : null}, o puedes escribirla justo después de decirla. No necesitas subir ningún audio.
              </Alert>
            ) : (
              <div className="space-y-2 rounded-lg border border-line p-3 text-sm">
                <label className="flex items-start gap-2">
                  <input type="checkbox" className="mt-1 accent-sky-600" checked={useMicPref} onChange={(e) => { setUseMicPref(e.target.checked); writePref('toefl-static-use-mic', e.target.checked); }} />
                  <span>
                    <span className="font-medium text-ink">Grabar con el micrófono en esta página</span>
                    <span className="block text-xs text-muted">Se pedirá permiso al pulsar «Empezar». El audio se analiza en tu navegador (pausas, ritmo) y no se envía a Claude.</span>
                  </span>
                </label>
                {useMicPref && SR && settings.cloudConsent !== 'denied' && (
                  <label className="flex items-start gap-2">
                    <input type="checkbox" className="mt-1 accent-sky-600" checked={liveSttPref} onChange={(e) => { setLiveSttPref(e.target.checked); writePref('toefl-static-live-stt', e.target.checked); }} />
                    <span>
                      <span className="font-medium text-ink">Transcribir automáticamente lo que digo</span>
                      <span className="block text-xs text-muted">{BROWSER_STT_POLICY}</span>
                    </span>
                  </label>
                )}
                {useMicPref && !liveStt && <p className="text-xs text-muted">Sin transcripción automática, usa también el dictado de tu sistema o escribe lo que dijiste para que Claude evalúe el contenido.</p>}
              </div>
            )}
            {micNote && <Alert tone="warn">{micNote}</Alert>}
            {!liveStt && (
              showCheck ? (
                <DictationCheck />
              ) : (
                <details className="rounded-lg border border-line bg-surface-2 p-3 text-sm">
                  <summary className="cursor-pointer font-medium text-ink">Cómo dictar y probar el dictado</summary>
                  <div className="mt-2">
                    <DictationCheck className="border-0 bg-transparent p-0" />
                  </div>
                </details>
              )
            )}
            <ol className="list-decimal space-y-1 pl-5 text-sm text-ink-2">
              <li>Pulsa «Empezar»{promptLines ? ', escucha la consigna' : ''} y espera el pitido.</li>
              <li>{liveStt ? 'Responde en voz alta: lo que digas se transcribirá en el cuadro.' : useMicNow ? 'Responde en voz alta (se graba el audio) y activa el dictado en el cuadro para que tu respuesta quede escrita.' : `Activa el dictado${dictationShortcut ? ` (${dictationShortcut})` : ''} con el cursor en el cuadro y responde en voz alta: tu voz se escribirá en el cuadro.`}</li>
              <li>Al terminar, revisa que el texto refleje lo que dijiste y pulsa «Guardar y evaluar».</li>
            </ol>
            <div className="flex flex-wrap gap-2">
              <Button size="lg" onClick={() => void start()} icon={useMicNow ? <Mic className="h-5 w-5" /> : <Play className="h-5 w-5" />}>
                Empezar
              </Button>
              <Button variant="ghost" onClick={() => { setShowCheck(false); setPhase('review'); }}>
                Escribir sin cronómetro
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
            {!useMicNow && <p className="text-xs text-muted">Prepara el dictado{dictationShortcut ? ` (${dictationShortcut})` : ''}: lo activarás cuando suene el pitido.</p>}
          </div>
        )}
        {phase === 'respond' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-3">
              <span className="flex items-center gap-2 font-semibold text-accent">
                {recording && <span className="rec-dot inline-block h-3 w-3 rounded-full bg-red-500" aria-hidden />}
                Responde ahora en voz alta
              </span>
              <span className="text-2xl font-semibold tabular-nums text-ink" aria-label="Tiempo restante">
                {formatClock(countdown * 1000)}
              </span>
            </div>
            <ProgressBar value={respondedSec} max={responseSec} label="Tiempo de respuesta" tone={countdown < responseSec * 0.2 ? 'warn' : 'accent'} />
            {recording && <LevelMeterBar stream={mic.getStream()} />}
            {!recording && !sttActive && (
              <p className="rounded-lg bg-accent-soft p-2 text-sm text-ink">
                <strong>La página no graba tu voz.</strong> Con el cursor en el cuadro, activa el dictado{dictationShortcut ? <> (<kbd className="font-mono">{dictationShortcut}</kbd>)</> : null}: lo que digas debe aparecer escrito abajo.
              </p>
            )}
            {noTextYet && (
              <Alert tone="warn" title="No está llegando texto">
                El dictado no parece activo. Haz clic en el cuadro y pulsa {dictationShortcut ?? 'el dictado de tu sistema'}; o sigue hablando y escribe tu respuesta al terminar.
              </Alert>
            )}
          </div>
        )}
        {(phase === 'respond' || phase === 'review' || phase === 'saving') && (
          <div className="space-y-2">
            <label htmlFor={`self-tr-${meta.itemId}`} className="text-sm font-medium text-ink">
              Tu respuesta en inglés {sttActive ? '(transcripción automática en curso)' : '(dictada o escrita, tal como la dijiste)'}
            </label>
            <textarea
              ref={textRef}
              id={`self-tr-${meta.itemId}`}
              rows={5}
              value={text}
              readOnly={sttActive}
              onChange={(e) => setText(e.target.value)}
              spellCheck={false}
              autoCorrect="off"
              autoCapitalize="sentences"
              lang="en"
              placeholder={sttActive ? 'Habla: el texto aparecerá aquí…' : 'Activa el dictado aquí o escribe lo que dijiste, incluidos titubeos (um, uh) y errores.'}
              className="w-full rounded-lg border border-line bg-surface p-3 text-ink"
            />
            {interim && <p className="text-sm italic text-muted">{interim}…</p>}
            <p className="text-xs text-muted">{words} palabras · No corrijas tu respuesta: la evaluación debe reflejar lo que dijiste.</p>
            {spanish && <p className="text-xs text-warn">El texto parece estar en español: pon el dictado en inglés.</p>}
            {sttError && <Alert tone="warn">{sttError}</Alert>}
            {phase === 'respond' && (
              <Button variant="outline" onClick={() => void finishResponse()} icon={<Square className="h-4 w-4" />}>
                Terminar respuesta
              </Button>
            )}
          </div>
        )}
        {(phase === 'review' || phase === 'saving') && (
          <div className="space-y-3">
            {elapsedMs > 0 && <p className="text-xs text-muted">Tiempo de respuesta: {formatClock(elapsedMs)}</p>}
            {micNote && <Alert tone="warn">{micNote}</Alert>}
            {!text.trim() && !audio && (
              <Alert tone="warn" title="No se recibió tu respuesta">
                <p>El cuadro está vacío: el dictado no estaba activo o no escribió nada. Esta página no graba la voz, así que no hay nada que evaluar todavía.</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  <Button size="sm" variant="outline" onClick={() => textRef.current?.focus()} icon={<Type className="h-4 w-4" />}>
                    Escribir lo que dije
                  </Button>
                  <Button size="sm" variant="ghost" onClick={reset} icon={<RotateCcw className="h-4 w-4" />}>
                    Volver a responder
                  </Button>
                </div>
              </Alert>
            )}
            {audio && (
              <div className="space-y-2 rounded-lg border border-line p-3">
                <p className="flex items-center gap-2 text-sm font-medium text-ink">
                  <FileAudio className="h-4 w-4 text-accent" aria-hidden /> {audio.source === 'mic' ? 'Audio grabado en esta página' : 'Audio subido'}
                </p>
                <audio controls src={audio.url} className="w-full" aria-label="Escuchar el audio de tu respuesta" />
                <div className="flex flex-wrap items-center gap-2 text-xs text-muted">
                  <span className="truncate">{audio.name} · {formatClock(audio.durationMs)} · se analiza en tu navegador, no se envía a Claude</span>
                  <Button size="sm" variant="ghost" onClick={() => setAudio(null)} icon={<Trash2 className="h-4 w-4" />}>
                    Quitar
                  </Button>
                </div>
              </div>
            )}
            {!audio && (
              <details className="rounded-lg border border-dashed border-line p-3 text-sm">
                <summary className="cursor-pointer text-ink-2">Opcional: añadir un audio grabado con otra app para medir pausas y ritmo</summary>
                <p className="mt-2 text-xs text-muted">No es necesario para la evaluación. Si te grabaste con la grabadora del móvil o del ordenador, súbelo: se analiza en tu navegador y nunca se envía a Claude.</p>
                <label className="mt-2 inline-flex cursor-pointer items-center gap-2 rounded-lg border border-line px-3 py-1.5 text-sm text-ink hover:bg-surface-3">
                  <Upload className="h-4 w-4" aria-hidden />
                  {checkingAudio ? 'Leyendo audio…' : 'Elegir archivo de audio'}
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
                {audioError && <p className="mt-2 text-xs text-bad">{audioError}</p>}
              </details>
            )}
            {saveError && <Alert tone="bad">{saveError}</Alert>}
            <div className="flex flex-wrap gap-2">
              <Button onClick={() => void save()} loading={phase === 'saving'} disabled={!text.trim() && !audio} icon={<Save className="h-4 w-4" />}>
                Guardar y evaluar
              </Button>
              {onSkip && (
                <Button variant="ghost" onClick={() => onSkip('skipped')}>
                  Omitir esta respuesta
                </Button>
              )}
            </div>
            {!text.trim() && audio && (
              <p className="flex items-center gap-1 text-xs text-warn">
                <AlertTriangle className="h-3.5 w-3.5" aria-hidden /> Sin texto solo se medirán pausas y ritmo; Claude no podrá evaluar el contenido.
              </p>
            )}
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

      {micState.error && useMicPref && !micBlocked && phase === 'ready' && <Alert tone="warn" title={micState.error.title}>{micState.error.message}</Alert>}

      {allowReplayPrompt && promptLines && phase !== 'prompt' && phase !== 'respond' && (
        <Button variant="ghost" size="sm" onClick={replayPrompt} icon={<Headphones className="h-4 w-4" />}>
          Escuchar la consigna de nuevo
        </Button>
      )}
    </div>
  );
}

export { DictationGuide };
