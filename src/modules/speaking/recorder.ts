/**
 * Grabadora basada en MediaRecorder. Elige un formato compatible con el
 * navegador y con los proveedores de transcripción (webm/ogg con Opus o mp4/AAC).
 */

export const PREFERRED_MIME_TYPES = [
  'audio/webm;codecs=opus',
  'audio/ogg;codecs=opus',
  'audio/mp4;codecs=mp4a.40.2',
  'audio/mp4',
  'audio/webm',
  'audio/aac',
];

export function pickMimeType(isTypeSupported: (t: string) => boolean = (t) => typeof MediaRecorder !== 'undefined' && MediaRecorder.isTypeSupported(t)): string {
  return PREFERRED_MIME_TYPES.find((t) => {
    try {
      return isTypeSupported(t);
    } catch {
      return false;
    }
  }) ?? '';
}

export function extensionFor(mime: string): string {
  if (mime.includes('webm')) return 'webm';
  if (mime.includes('ogg')) return 'ogg';
  if (mime.includes('mp4') || mime.includes('aac')) return 'm4a';
  if (mime.includes('wav')) return 'wav';
  if (mime.includes('mpeg') || mime.includes('mp3')) return 'mp3';
  if (mime.includes('flac')) return 'flac';
  return 'audio';
}

export interface RecordingResult {
  blob: Blob;
  mimeType: string;
  durationMs: number;
  sizeBytes: number;
  stopReason: 'manual' | 'time-limit' | 'interrupted';
}

export type RecordingIssue = 'empty' | 'too-short' | 'too-long';

export function validateRecording(r: Pick<RecordingResult, 'sizeBytes' | 'durationMs'>, limits: { minMs: number; maxMs: number }): RecordingIssue | null {
  if (r.sizeBytes === 0) return 'empty';
  if (r.durationMs < limits.minMs) return 'too-short';
  if (r.durationMs > limits.maxMs + 1500) return 'too-long';
  return null;
}

export const ISSUE_MESSAGES: Record<RecordingIssue, string> = {
  empty: 'La grabación está vacía: no se recibió audio del micrófono. Comprueba el dispositivo y vuelve a intentarlo.',
  'too-short': 'La grabación es demasiado corta para analizarla. Graba de nuevo y habla durante más tiempo.',
  'too-long': 'La grabación supera el tiempo máximo permitido para esta tarea.',
};

type RecorderCtor = new (stream: MediaStream, options?: MediaRecorderOptions) => MediaRecorder;

export class Recorder {
  private recorder: MediaRecorder | null = null;
  private chunks: Blob[] = [];
  private startedAt = 0;
  private timer: ReturnType<typeof setTimeout> | null = null;
  private stopReason: RecordingResult['stopReason'] = 'manual';
  private pending: { resolve: (r: RecordingResult) => void; reject: (e: Error) => void } | null = null;
  private Ctor: RecorderCtor;
  private now: () => number;
  mimeType = '';

  constructor(opts: { Ctor?: RecorderCtor; now?: () => number } = {}) {
    this.Ctor = opts.Ctor ?? (typeof MediaRecorder !== 'undefined' ? MediaRecorder : (undefined as unknown as RecorderCtor));
    this.now = opts.now ?? (() => performance.now());
  }

  static isSupported(): boolean {
    return typeof MediaRecorder !== 'undefined';
  }

  get isRecording(): boolean {
    return this.recorder?.state === 'recording';
  }

  elapsedMs(): number {
    return this.isRecording ? this.now() - this.startedAt : 0;
  }

  /**
   * Inicia la grabación. `maxMs` detiene automáticamente al alcanzar el límite
   * de la tarea; el resultado se entrega mediante la promesa devuelta por `done`.
   */
  start(stream: MediaStream, opts: { maxMs: number; mimeType?: string; onAutoStop?: () => void }): Promise<RecordingResult> {
    if (!this.Ctor) return Promise.reject(new Error('MediaRecorder no está disponible en este navegador.'));
    if (this.isRecording) return Promise.reject(new Error('Ya hay una grabación en curso.'));
    this.mimeType = opts.mimeType ?? pickMimeType();
    this.chunks = [];
    this.stopReason = 'manual';
    let rec: MediaRecorder;
    try {
      rec = this.mimeType ? new this.Ctor(stream, { mimeType: this.mimeType, audioBitsPerSecond: 64000 }) : new this.Ctor(stream);
    } catch (e) {
      return Promise.reject(new Error(`No se pudo iniciar la grabación: ${(e as Error).message}`));
    }
    this.recorder = rec;
    const done = new Promise<RecordingResult>((resolve, reject) => {
      this.pending = { resolve, reject };
    });

    rec.ondataavailable = (e) => {
      if (e.data && e.data.size > 0) this.chunks.push(e.data);
    };
    rec.onerror = (e) => {
      this.clearTimer();
      const err = (e as unknown as { error?: Error }).error;
      this.pending?.reject(new Error(`Error de grabación: ${err?.message ?? 'desconocido'}`));
      this.pending = null;
    };
    rec.onstop = () => {
      this.clearTimer();
      const durationMs = Math.round(this.now() - this.startedAt);
      const type = rec.mimeType || this.mimeType || 'audio/webm';
      const blob = new Blob(this.chunks, { type });
      this.pending?.resolve({ blob, mimeType: type, durationMs, sizeBytes: blob.size, stopReason: this.stopReason });
      this.pending = null;
      this.recorder = null;
    };
    // Si la pista termina (desconexión/permiso revocado), la grabación se cierra con lo capturado.
    stream.getAudioTracks().forEach((t) =>
      t.addEventListener('ended', () => {
        if (this.recorder === rec && rec.state === 'recording') {
          this.stopReason = 'interrupted';
          rec.stop();
        }
      }),
    );

    this.startedAt = this.now();
    try {
      rec.start(250);
    } catch (e) {
      this.pending?.reject(new Error(`No se pudo iniciar la grabación: ${(e as Error).message}`));
      this.pending = null;
      return done;
    }
    this.timer = setTimeout(() => {
      if (rec.state === 'recording') {
        this.stopReason = 'time-limit';
        rec.stop();
        opts.onAutoStop?.();
      }
    }, opts.maxMs);
    return done;
  }

  stop(): void {
    if (this.recorder && this.recorder.state !== 'inactive') {
      this.stopReason = 'manual';
      this.recorder.stop();
    }
  }

  /** Cancela sin conservar el audio. */
  cancel(): void {
    this.pending = null;
    this.clearTimer();
    if (this.recorder && this.recorder.state !== 'inactive') this.recorder.stop();
    this.recorder = null;
    this.chunks = [];
  }

  private clearTimer() {
    if (this.timer) clearTimeout(this.timer);
    this.timer = null;
  }
}
