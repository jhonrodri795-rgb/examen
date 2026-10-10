import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FileAudio, Gauge, Headphones, Info, Mic, Play, RotateCcw, Save, Scissors, Square, Timer, Trash2, Upload } from 'lucide-react';
import { Alert, Badge, Button, ProgressBar } from '@/components/ui';
import { useMic, useSettings } from '@/app/context';
import { countWords, formatClock } from '@/lib/format';
import { playScript, type PlaybackHandle } from '@/modules/listening/tts';
import { decodeToMono, encodeWav } from '../acoustic';
import { END_BEEP_HZ, responseWindow } from '../beep';
import { BROWSER_STT_POLICY, LiveTranscriber, speechRecognitionCtor } from '../browser-stt';
import { currentPlatform, DICTATION_GUIDES, looksSpanish, micPolicy, RECORDER_GUIDES } from '../dictation';
import { Recorder, type RecordingResult } from '../recorder';
import { hasAudio, loadRecording, recordingBlob, storeStaticResponse } from '../recordings';
import { DictationCheck, DictationGuide } from './DictationCheck';
import { LevelMeterBar } from './MicPanel';
import { beep, type SpeakingRecorderProps } from './SpeakingRecorder';

type Phase = 'ready' | 'prompt' | 'prep' | 'respond' | 'review' | 'saving' | 'saved';

interface AudioClip {
  blob: Blob;
  name: string;
  durationMs: number;
  url: string;
  source: 'mic' | 'upload';
  /** Audio subido decodificado, para recortar la respuesta. */
  decoded?: { samples: Float32Array; sampleRate: number; original: Blob };
  /** Tramo analizado (s), si se detectó por el pitido y si se oyó el pitido de fin. */
  trim?: Trim;
}

interface Trim {
  start: number;
  end: number;
  total: number;
  auto: boolean;
  endBeep?: boolean;
}

const MAX_UPLOAD_BYTES = 25 * 1024 * 1024;
const MAX_UPLOAD_MS = 180_000;
const MIN_CLIP_SEC = 1;
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

  const phaseRef = useRef(phase);
  phaseRef.current = phase;
  // Cada recorte crea un WAV nuevo: se libera la URL del anterior.
  useEffect(() => {
    const u = audio?.url;
    return () => {
      if (u) {
        URL.revokeObjectURL(u);
        urls.current = urls.current.filter((x) => x !== u);
      }
    };
  }, [audio?.url]);

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
    recorder.current = null;
    // Pitido de fin (también al pulsar «Terminar»): marca el final en una grabación externa.
    beep(END_BEEP_HZ);
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
        if (left <= 0 && alive.current) void finishResponse();
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
    let stream: MediaStream | null = null;
    if (useMicNow) {
      // Solo tras pulsar «Empezar» (o al entrar en el ítem de una simulación).
      stream = await mic.acquire(settings.micDeviceId);
      if (!alive.current) return;
      if (!stream) {
        // No se continúa: el estudiante necesita poner a grabar otra app antes de la consigna.
        const err = mic.getState().error;
        setMicBlocked(true);
        setUseMicPref(false);
        writePref('toefl-static-use-mic', false);
        setMicNote(`${err ? `${err.title}. ` : ''}Esta página no puede grabar: empieza a grabar con la grabadora de tu dispositivo y pulsa «Empezar» de nuevo.`);
        return;
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
    // Solo arranca solo si la propia página va a grabar; si no, el estudiante debe poner antes su grabadora.
    if (autoStart && useMicNow && phase === 'ready') void start();
    // Solo al montar / cambiar de ítem.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoStart, meta.itemId]);

  /** Recorta el audio subido al tramo [start, end] (s) y lo codifica en WAV para analizar solo la respuesta. */
  const trimClip = (clip: AudioClip, start: number, end: number, auto: boolean, endBeep?: boolean): AudioClip => {
    const d = clip.decoded!;
    const total = d.samples.length / d.sampleRate;
    const a = Math.max(0, Math.min(start, total));
    const b = Math.max(a, Math.min(end, total));
    if (b - a < MIN_CLIP_SEC) {
      setAudioError(`El tramo debe durar al menos ${MIN_CLIP_SEC} s.`);
      return clip;
    }
    setAudioError(null);
    if (a <= 0.01 && b >= total - 0.01) {
      return { ...clip, blob: d.original, url: makeUrl(d.original), durationMs: total * 1000, trim: { start: 0, end: total, total, auto: false } };
    }
    const wav = new Blob([encodeWav(d.samples.subarray(Math.round(a * d.sampleRate), Math.round(b * d.sampleRate)), d.sampleRate)], { type: 'audio/wav' });
    return { ...clip, blob: wav, url: makeUrl(wav), durationMs: (b - a) * 1000, trim: { start: a, end: b, total, auto, endBeep } };
  };

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
      if (durationMs > MAX_UPLOAD_MS) return setAudioError('El audio dura más de 3 minutos: graba solo esta respuesta (o recórtala antes).');
      const original = new Blob([buf], { type: mimeOf(file) });
      const base: AudioClip = { blob: original, name: file.name, durationMs, url: '', source: 'upload', decoded: { samples, sampleRate, original } };
      // Si la grabación incluye el pitido de inicio (y el de fin), se analiza solo la respuesta.
      const w = responseWindow(samples, sampleRate, responseSec);
      const clip = w && w.end - w.start >= MIN_CLIP_SEC ? trimClip(base, w.start, w.end, true, w.endBeep) : trimClip(base, 0, durationMs / 1000, false);
      if (!alive.current || phaseRef.current === 'saved') return;
      setAudio(clip);
    } catch {
      setAudioError('No se pudo leer el audio en este navegador. Prueba con MP3, M4A, WAV, OGG o WebM.');
    } finally {
      setCheckingAudio(false);
    }
  };

  const save = async () => {
    if (checkingAudio) return;
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
      setAudio((c) => c && { ...c, decoded: undefined }); // libera las muestras decodificadas
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
  const dictationShortcut = guide.unavailable ? null : guide.shortcut;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <Badge tone={recording ? 'bad' : 'neutral'}>
          {recording || useMicNow ? <Mic className="h-3 w-3" aria-hidden /> : <FileAudio className="h-3 w-3" aria-hidden />}
          {recording ? 'Grabando con el micrófono' : useMicNow ? 'Micrófono de la página' : 'Grabación con otra app'}
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

      <div className="space-y-4 rounded-xl border border-line bg-surface p-5">
        {phase === 'ready' && (
          <div className="space-y-4">
            {!micBlocked && (
              <div className="space-y-2 rounded-lg border border-line p-3 text-sm">
                <label className="flex items-start gap-2">
                  <input type="checkbox" className="mt-1 accent-sky-600" checked={useMicPref} onChange={(e) => { setUseMicPref(e.target.checked); writePref('toefl-static-use-mic', e.target.checked); }} />
                  <span>
                    <span className="font-medium text-ink">Grabar con el micrófono en esta página</span>
                    <span className="block text-xs text-muted">Se pedirá permiso al pulsar «Empezar». El audio se analiza en tu navegador (ritmo, pausas, entonación) y no se envía a Claude.</span>
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
              </div>
            )}
            {!useMicNow && (
              <div className="space-y-3">
                {micBlocked ? (
                  <Alert tone="info" title="Para calificar tu fluidez, grábate con otra app">
                    El visor de claude.ai no deja que esta página use el micrófono. Graba tu respuesta con la grabadora de tu dispositivo y súbela: la página mide tu ritmo (sílabas por segundo), tus pausas y tu entonación, y Claude califica tu fluidez con esas medidas.
                  </Alert>
                ) : (
                  <p className="text-sm text-ink-2">Sin el micrófono de esta página, grábate con otra app y sube el audio para medir tu fluidez.</p>
                )}
                <ol className="list-decimal space-y-1.5 pl-5 text-sm text-ink-2">
                  <li>
                    Abre la grabadora: <span className="text-ink">{RECORDER_GUIDES[platform]}</span>
                  </li>
                  <li>Empieza a grabar y pulsa «Empezar». {promptLines ? 'Escucharás la consigna y un pitido' : 'Sonará un pitido'}: responde en voz alta después del pitido. Al terminar sonará otro pitido.</li>
                  <li>Detén la grabación y súbela aquí (o arrástrala). La página detecta los pitidos y analiza solo tu respuesta.</li>
                </ol>
              </div>
            )}
            {micNote && <Alert tone="warn">{micNote}</Alert>}
            {!liveStt && (
              <details className="rounded-lg border border-line bg-surface-2 p-3 text-sm">
                <summary className="cursor-pointer font-medium text-ink">Opcional: dicta o escribe tu respuesta para evaluar también gramática y contenido</summary>
                <div className="mt-2">
                  <DictationCheck className="border-0 bg-transparent p-0" />
                </div>
              </details>
            )}
            <div className="flex flex-wrap gap-2">
              <Button size="lg" onClick={() => void start()} icon={useMicNow ? <Mic className="h-5 w-5" /> : <Play className="h-5 w-5" />}>
                Empezar
              </Button>
              <Button variant="ghost" onClick={() => setPhase('review')}>
                {micBlocked ? 'Ya tengo la grabación' : 'Responder sin cronómetro'}
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
            {!useMicNow && <p className="text-xs text-muted">Comprueba que tu grabadora está grabando: responderás al sonar el pitido.</p>}
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
            {!recording && (
              <p className="flex items-start gap-2 rounded-lg bg-accent-soft p-2 text-sm text-ink">
                <Mic className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
                <span>
                  <strong>Habla ahora: tu grabadora debe estar grabando.</strong> Esta página no graba; al terminar subirás el audio.
                </span>
              </p>
            )}
          </div>
        )}
        {(phase === 'respond' || phase === 'review' || phase === 'saving') && (
          <div className="space-y-2">
            <label htmlFor={`self-tr-${meta.itemId}`} className="text-sm font-medium text-ink">
              {sttActive ? 'Tu respuesta en inglés (transcripción automática en curso)' : 'Opcional: tu respuesta en texto (dictada o escrita, tal como la dijiste) para evaluar también gramática y contenido'}
            </label>
            <textarea
              ref={textRef}
              id={`self-tr-${meta.itemId}`}
              rows={4}
              value={text}
              readOnly={sttActive}
              onChange={(e) => setText(e.target.value)}
              spellCheck={false}
              autoCorrect="off"
              autoCapitalize="sentences"
              lang="en"
              placeholder={sttActive ? 'Habla: el texto aparecerá aquí…' : `Dicta aquí${dictationShortcut ? ` (${dictationShortcut})` : ''} o escribe lo que dijiste, incluidos titubeos (um, uh) y errores.`}
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
            {audio ? (
              <div className="space-y-2 rounded-lg border border-line p-3">
                <p className="flex items-center gap-2 text-sm font-medium text-ink">
                  <FileAudio className="h-4 w-4 text-accent" aria-hidden /> {audio.source === 'mic' ? 'Audio grabado en esta página' : 'Audio de tu respuesta'}
                </p>
                <audio controls src={audio.url} className="w-full" aria-label="Escuchar el audio que se analizará" />
                {audio.trim && (
                  <TrimControls
                    trim={audio.trim}
                    onApply={(a, b) => setAudio(trimClip(audio, a, b, false))}
                    onFull={() => setAudio(trimClip(audio, 0, audio.trim!.total, false))}
                  />
                )}
                <div className="flex flex-wrap items-center gap-2 text-xs text-muted">
                  <span className="truncate">{audio.name} · se analiza {formatClock(audio.durationMs)} en tu navegador; el audio no se envía a Claude</span>
                  <Button size="sm" variant="ghost" onClick={() => setAudio(null)} icon={<Trash2 className="h-4 w-4" />}>
                    Quitar
                  </Button>
                </div>
              </div>
            ) : (
              <div
                className="space-y-2 rounded-lg border-2 border-dashed border-accent/50 bg-accent-soft/40 p-4"
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  void onFile(e.dataTransfer.files?.[0]);
                }}
              >
                <p className="flex items-center gap-2 font-medium text-ink">
                  <Gauge className="h-4 w-4 text-accent" aria-hidden /> Sube la grabación de tu respuesta para calificar tu fluidez
                </p>
                <p className="text-xs text-muted">Elige el archivo o arrástralo aquí: MP3, M4A, WAV, OGG o WebM (máx. 25 MB, 3 min). Si grabaste también la consigna, la página detecta los pitidos y analiza solo tu respuesta. El audio se analiza en tu navegador y no se envía a Claude.</p>
                <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-navy-900 px-4 py-2 text-sm font-medium text-white hover:bg-navy-800 dark:bg-sky-400 dark:text-navy-950 dark:hover:bg-sky-300">
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
                {audioError && <p className="text-xs text-bad">{audioError}</p>}
              </div>
            )}
            {saveError && <Alert tone="bad">{saveError}</Alert>}
            <div className="flex flex-wrap gap-2">
              <Button onClick={() => void save()} loading={phase === 'saving'} disabled={checkingAudio || (!text.trim() && !audio)} icon={<Save className="h-4 w-4" />}>
                Guardar y evaluar
              </Button>
              {onSkip && (
                <Button variant="ghost" onClick={() => onSkip('skipped')}>
                  Omitir esta respuesta
                </Button>
              )}
            </div>
            {!text.trim() && audio && (
              <p className="flex items-start gap-1 text-xs text-muted">
                <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden /> Sin texto, Claude calificará solo tu fluidez (ritmo, pausas y entonación). Dicta o escribe lo que dijiste para evaluar también la gramática y el contenido.
              </p>
            )}
            {checkingAudio && <p className="text-xs text-muted">Espera a que termine de leerse el audio.</p>}
            {!text.trim() && !audio && !checkingAudio && <p className="text-xs text-muted">Sube tu grabación (fluidez) o escribe lo que dijiste (contenido) para poder evaluar.</p>}
          </div>
        )}
        {phase === 'saved' && (
          <div className="space-y-3">
            <p className="text-sm font-medium text-ok" role="status">Respuesta guardada{saved?.hasAudio ? ` (audio de ${formatClock(saved.durationMs)})` : ''}.</p>
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

/** Acepta «m:ss(.d)» o segundos («75», «1:15», «1:15.5»). */
export function parseClock(v: string): number | null {
  const t = v.trim().replace(',', '.');
  if (!t) return null;
  const m = /^(\d+):([0-5]?\d(?:\.\d+)?)$/.exec(t);
  if (m) return Number(m[1]) * 60 + Number(m[2]);
  return /^\d+(\.\d+)?$/.test(t) ? Number(t) : null;
}

const clock1 = (sec: number) => {
  const m = Math.floor(sec / 60);
  const s = sec - m * 60;
  return `${m}:${s.toFixed(1).padStart(4, '0')}`;
};

/** Ajuste del tramo analizado de un audio subido (detectado por los pitidos o manual). */
function TrimControls({ trim, onApply, onFull }: { trim: Trim; onApply: (start: number, end: number) => void; onFull: () => void }) {
  const [a, setA] = useState(clock1(trim.start));
  const [b, setB] = useState(clock1(trim.end));
  useEffect(() => {
    setA(clock1(trim.start));
    setB(clock1(trim.end));
  }, [trim.start, trim.end]);
  const full = trim.start <= 0.01 && trim.end >= trim.total - 0.01;
  const lo = parseClock(a);
  const hi = parseClock(b);
  const error =
    lo === null || hi === null
      ? 'Escribe los tiempos como m:ss (p. ej. 0:42) o en segundos.'
      : lo < 0 || hi > trim.total + 0.05
        ? `Los tiempos deben estar entre 0:00 y ${formatClock(trim.total * 1000)}.`
        : hi - lo < MIN_CLIP_SEC
          ? `El tramo debe durar al menos ${MIN_CLIP_SEC} s.`
          : null;
  return (
    <div className="space-y-2 rounded-lg bg-surface-2 p-2 text-xs text-ink-2">
      <p>
        {trim.auto
          ? `Se detectó el pitido de inicio: se analiza desde ${formatClock(trim.start * 1000)} hasta ${formatClock(trim.end * 1000)} de un audio de ${formatClock(trim.total * 1000)}.`
          : full
            ? `Se analiza el audio completo (${formatClock(trim.total * 1000)}). Si incluye la consigna u otros sonidos, recórtalo:`
            : `Se analiza desde ${formatClock(trim.start * 1000)} hasta ${formatClock(trim.end * 1000)} del audio original.`}
        {trim.auto && trim.endBeep === false && ' No se oyó el pitido de fin: se analiza como máximo el tiempo de respuesta; si al final hay ruidos o comentarios, ajusta el fin.'}
      </p>
      <p className="text-muted">Los tiempos se refieren al audio original; el reproductor de arriba empieza en el inicio del tramo.</p>
      <div className="flex flex-wrap items-end gap-2">
        <label className="flex flex-col gap-0.5">
          <span>Inicio (m:ss)</span>
          <input type="text" inputMode="decimal" value={a} onChange={(e) => setA(e.target.value)} className="w-20 rounded border border-line bg-surface px-2 py-1 text-ink" />
        </label>
        <label className="flex flex-col gap-0.5">
          <span>Fin (m:ss)</span>
          <input type="text" inputMode="decimal" value={b} onChange={(e) => setB(e.target.value)} className="w-20 rounded border border-line bg-surface px-2 py-1 text-ink" />
        </label>
        <Button size="sm" variant="outline" icon={<Scissors className="h-3.5 w-3.5" />} onClick={() => lo !== null && hi !== null && onApply(lo, hi)} disabled={!!error}>
          Recortar
        </Button>
        {!full && (
          <Button size="sm" variant="ghost" onClick={onFull}>
            Usar audio completo
          </Button>
        )}
      </div>
      {error && <p className="text-warn">{error}</p>}
    </div>
  );
}

export { DictationGuide };
