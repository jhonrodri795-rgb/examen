import { describe, expect, it, vi } from 'vitest';
import { analyzeSamples, encodeWav } from './acoustic';
import { alignWords, computeTranscriptMetrics, normalizeForAlignment } from './transcript-analysis';
import { MicrophoneManager, browserHelp, describeMicError, type MediaEnv } from './microphone';
import { Recorder, pickMimeType, validateRecording } from './recorder';
import type { Transcript } from '@shared/speaking-types';

// ---------- Señales sintéticas ----------
const RATE = 16000;
function signal(parts: { sec: number; amp: number }[], noise = 0.0005): Float32Array {
  const total = parts.reduce((s, p) => s + p.sec, 0);
  const out = new Float32Array(Math.round(total * RATE));
  let i = 0;
  let seed = 1;
  const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647 - 0.5) * 2;
  for (const p of parts) {
    const n = Math.round(p.sec * RATE);
    for (let k = 0; k < n; k++, i++) out[i] = p.amp * Math.sin((2 * Math.PI * 180 * k) / RATE) + noise * rnd();
  }
  return out;
}

describe('análisis acústico (VAD por energía)', () => {
  it('mide habla, pausas y silencios iniciales/finales', () => {
    const s = signal([
      { sec: 0.5, amp: 0 }, { sec: 2, amp: 0.3 }, { sec: 0.8, amp: 0 }, { sec: 1.5, amp: 0.3 }, { sec: 1.2, amp: 0 }, { sec: 1, amp: 0.3 }, { sec: 0.4, amp: 0 },
    ]);
    const m = analyzeSamples(s, RATE);
    expect(m.totalDurationSec).toBeCloseTo(7.4, 1);
    expect(m.speechDurationSec).toBeCloseTo(4.5, 0);
    expect(m.pauseCount).toBe(2);
    expect(m.longPauseCount).toBe(1);
    expect(m.longestPauseSec).toBeCloseTo(1.2, 1);
    expect(m.leadingSilenceSec).toBeCloseTo(0.5, 1);
    expect(m.trailingSilenceSec).toBeCloseTo(0.4, 1);
    expect(m.runCount).toBe(3);
    expect(m.quality.mostlySilent).toBe(false);
  });

  it('una grabación en silencio se marca como vacía de voz', () => {
    const m = analyzeSamples(signal([{ sec: 3, amp: 0 }]), RATE);
    expect(m.speechDurationSec).toBe(0);
    expect(m.quality.mostlySilent).toBe(true);
  });

  it('las pausas breves de articulación no cuentan como pausas', () => {
    const m = analyzeSamples(signal([{ sec: 1, amp: 0.3 }, { sec: 0.1, amp: 0 }, { sec: 1, amp: 0.3 }]), RATE);
    expect(m.pauseCount).toBe(0);
    expect(m.runCount).toBe(1);
  });

  it('detecta saturación y volumen bajo', () => {
    expect(analyzeSamples(signal([{ sec: 1, amp: 1.2 }]), RATE).quality.clipping).toBe(true);
    expect(analyzeSamples(signal([{ sec: 0.3, amp: 0 }, { sec: 1, amp: 0.004 }, { sec: 0.3, amp: 0 }], 0.00001), RATE).quality.tooQuiet).toBe(true);
  });

  it('codifica WAV PCM 16 bits', () => {
    const buf = encodeWav(new Float32Array([0, 0.5, -0.5, 1]), 16000);
    const v = new DataView(buf);
    expect(String.fromCharCode(v.getUint8(0), v.getUint8(1), v.getUint8(2), v.getUint8(3))).toBe('RIFF');
    expect(v.getUint32(24, true)).toBe(16000);
    expect(v.getInt16(44 + 2 * 3, true)).toBe(32767);
  });
});

describe('métricas de transcripción', () => {
  const t: Transcript = {
    provider: 'x', model: 'x', text: 'Um, I think I I prefer studying alone. Uh, it helps me focus.', durationSec: 10,
    words: [
      { word: 'Um', start: 0, end: 0.3 }, { word: 'I', start: 0.5, end: 0.6 }, { word: 'think', start: 0.6, end: 0.9 },
      { word: 'I', start: 1, end: 1.1 }, { word: 'I', start: 1.2, end: 1.3 }, { word: 'prefer', start: 1.3, end: 1.7 },
      { word: 'studying', start: 1.7, end: 2.2, confidence: 0.4 }, { word: 'alone.', start: 2.2, end: 2.6 }, { word: 'Uh,', start: 3, end: 3.2 },
      { word: 'it', start: 3.3, end: 3.4 }, { word: 'helps', start: 3.4, end: 3.7 }, { word: 'me', start: 3.7, end: 3.8 }, { word: 'focus.', start: 3.8, end: 4.2 },
    ],
    segments: [],
    capabilities: { wordTimestamps: true, wordConfidence: true, segmentConfidence: false, fillerDetection: 'provider' },
    createdAt: 0,
  };
  it('cuenta muletillas, repeticiones, palabras de baja confianza y ritmo', () => {
    const m = computeTranscriptMetrics(t, null);
    expect(m.fillerCount).toBe(2);
    expect(m.wordCount).toBe(11);
    expect(m.repetitions[0]!.phrase).toBe('i i');
    expect(m.lowConfidenceWords).toEqual([{ word: 'studying', start: 1.7, confidence: 0.4 }]);
    expect(m.wordsPerMinute).toBe(Math.round((11 / 4.2) * 60));
    expect(m.articulationRate).toBeNull();
  });
});

describe('alineación Listen and Repeat', () => {
  it('normaliza números y contracciones', () => {
    expect(normalizeForAlignment("It's 10 o'clock")).toEqual(['it', 'is', 'ten', 'oclock']);
  });
  it('calcula precisión y operaciones', () => {
    const r = alignWords('You can borrow up to ten books at a time.', 'you can borrow up to 10 book at time');
    expect(r.total).toBe(10);
    expect(r.ops.filter((o) => o.type === 'sub')).toEqual([{ type: 'sub', ref: 'books', hyp: 'book' }]);
    expect(r.ops.filter((o) => o.type === 'del')).toEqual([{ type: 'del', ref: 'a' }]);
    expect(r.accuracy).toBe(0.8);
  });
  it('repetición perfecta = 1 y vacía = 0', () => {
    expect(alignWords('Welcome to the main library.', 'welcome to the main library').accuracy).toBe(1);
    expect(alignWords('Welcome to the main library.', '').accuracy).toBe(0);
  });
});

// ---------- Micrófono con API simuladas ----------

class FakeTrack extends EventTarget {
  readyState: 'live' | 'ended' = 'live';
  muted = false;
  label: string;
  constructor(private deviceId: string) {
    super();
    this.label = `Mic ${deviceId}`;
  }
  stop = vi.fn(() => {
    this.readyState = 'ended';
  });
  getSettings() {
    return { deviceId: this.deviceId };
  }
  end() {
    this.readyState = 'ended';
    this.dispatchEvent(new Event('ended'));
  }
}

function fakeEnv(opts: { fail?: string; devices?: string[] } = {}) {
  const tracks: FakeTrack[] = [];
  const md = new EventTarget() as EventTarget & { getUserMedia: ReturnType<typeof vi.fn>; enumerateDevices: ReturnType<typeof vi.fn> };
  let devices = opts.devices ?? ['default', 'usb'];
  md.getUserMedia = vi.fn(async (c: MediaStreamConstraints) => {
    if (opts.fail) throw Object.assign(new Error(opts.fail), { name: opts.fail });
    const id = ((c.audio as MediaTrackConstraints).deviceId as { exact?: string } | undefined)?.exact ?? 'default';
    const t = new FakeTrack(id);
    tracks.push(t);
    return { getAudioTracks: () => [t], getTracks: () => [t] } as unknown as MediaStream;
  });
  md.enumerateDevices = vi.fn(async () => devices.map((d) => ({ deviceId: d, kind: 'audioinput', label: `Mic ${d}` })));
  const env: MediaEnv = { mediaDevices: md as unknown as MediaDevices, isSecureContext: true, userAgent: 'Mozilla/5.0 Chrome/141' };
  return { env, md, tracks, setDevices: (d: string[]) => (devices = d) };
}

describe('gestión del micrófono', () => {
  it('permiso concedido: activa y reutiliza el flujo sin volver a pedir permiso', async () => {
    const { env, md } = fakeEnv();
    const mic = new MicrophoneManager(env);
    const s1 = await mic.acquire();
    const s2 = await mic.acquire();
    expect(s1).toBe(s2);
    expect(md.getUserMedia).toHaveBeenCalledTimes(1);
    expect(mic.getState().status).toBe('active');
    expect(mic.getState().devices).toHaveLength(2);
  });

  it('permiso denegado: estado bloqueado con instrucciones', async () => {
    const mic = new MicrophoneManager(fakeEnv({ fail: 'NotAllowedError' }).env);
    expect(await mic.acquire()).toBeNull();
    const st = mic.getState();
    expect(st.status).toBe('blocked');
    expect(st.permission).toBe('denied');
    expect(st.error?.help.length).toBeGreaterThan(0);
  });

  it('sin micrófono y micrófono ocupado', async () => {
    const none = new MicrophoneManager(fakeEnv({ fail: 'NotFoundError' }).env);
    await none.acquire();
    expect(none.getState().status).toBe('unavailable');
    const busy = new MicrophoneManager(fakeEnv({ fail: 'NotReadableError' }).env);
    await busy.acquire();
    expect(busy.getState().status).toBe('busy');
  });

  it('contexto inseguro o sin soporte', () => {
    const mic = new MicrophoneManager({ isSecureContext: false, userAgent: '' });
    expect(mic.getState().status).toBe('unsupported');
    expect(mic.getState().error?.message).toMatch(/HTTPS|localhost/);
  });

  it('release() detiene las pistas', async () => {
    const { env, tracks } = fakeEnv();
    const mic = new MicrophoneManager(env);
    await mic.acquire();
    mic.release();
    expect(tracks[0]!.stop).toHaveBeenCalled();
    expect(mic.getState().status).toBe('idle');
    expect(mic.getStream()).toBeNull();
  });

  it('cambio de dispositivo: selecciona otro micrófono y detiene el anterior', async () => {
    const { env, tracks, md } = fakeEnv();
    const mic = new MicrophoneManager(env);
    await mic.acquire();
    await mic.selectDevice('usb');
    expect(tracks[0]!.stop).toHaveBeenCalled();
    expect(md.getUserMedia).toHaveBeenLastCalledWith(expect.objectContaining({ audio: expect.objectContaining({ deviceId: { exact: 'usb' } }) }));
    expect(mic.getState().activeDeviceId).toBe('usb');
  });

  it('desconexión del dispositivo activo durante el uso', async () => {
    const { env, md, setDevices } = fakeEnv();
    const mic = new MicrophoneManager(env);
    await mic.selectDevice('usb');
    setDevices(['default']);
    md.dispatchEvent(new Event('devicechange'));
    await vi.waitFor(() => expect(mic.getState().status).toBe('disconnected'));
  });

  it('pista finalizada (permiso revocado o cable desconectado)', async () => {
    const { env, tracks } = fakeEnv();
    const mic = new MicrophoneManager(env);
    await mic.acquire();
    tracks[0]!.end();
    expect(mic.getState().status).toBe('disconnected');
    expect(mic.getStream()).toBeNull();
  });

  it('mensajes de ayuda por navegador', () => {
    expect(browserHelp('iPhone Safari').join(' ')).toMatch(/Ajustes/);
    expect(browserHelp('Firefox/130').join(' ')).toMatch(/micrófono/);
    expect(describeMicError({ name: 'OverconstrainedError' }, '').status).toBe('unavailable');
  });
});

// ---------- Grabadora con MediaRecorder simulado ----------

class FakeMediaRecorder {
  static instances: FakeMediaRecorder[] = [];
  state: 'inactive' | 'recording' = 'inactive';
  mimeType: string;
  ondataavailable: ((e: { data: Blob }) => void) | null = null;
  onstop: (() => void) | null = null;
  onerror: ((e: unknown) => void) | null = null;
  constructor(_s: MediaStream, opts?: { mimeType?: string }) {
    this.mimeType = opts?.mimeType ?? 'audio/webm';
    FakeMediaRecorder.instances.push(this);
  }
  start() {
    this.state = 'recording';
  }
  stop() {
    this.state = 'inactive';
    this.ondataavailable?.({ data: new Blob([new Uint8Array(1200)], { type: this.mimeType }) });
    this.onstop?.();
  }
  fail() {
    this.onerror?.({ error: new Error('hardware') });
  }
}

const fakeStream = () => {
  const t = new FakeTrack('default');
  return { stream: { getAudioTracks: () => [t], getTracks: () => [t] } as unknown as MediaStream, track: t };
};

describe('grabadora', () => {
  it('elige el primer formato compatible', () => {
    expect(pickMimeType((t) => t === 'audio/mp4')).toBe('audio/mp4');
    expect(pickMimeType(() => false)).toBe('');
  });

  it('graba, mide la duración y detiene manualmente', async () => {
    let clock = 0;
    const rec = new Recorder({ Ctor: FakeMediaRecorder as unknown as typeof MediaRecorder, now: () => clock });
    const p = rec.start(fakeStream().stream, { maxMs: 45_000, mimeType: 'audio/webm;codecs=opus' });
    clock = 12_000;
    rec.stop();
    const r = await p;
    expect(r.durationMs).toBe(12_000);
    expect(r.sizeBytes).toBe(1200);
    expect(r.stopReason).toBe('manual');
  });

  it('finaliza automáticamente al llegar al límite de tiempo', async () => {
    vi.useFakeTimers();
    let clock = 0;
    const onAutoStop = vi.fn();
    const rec = new Recorder({ Ctor: FakeMediaRecorder as unknown as typeof MediaRecorder, now: () => clock });
    const p = rec.start(fakeStream().stream, { maxMs: 45_000, onAutoStop });
    clock = 45_000;
    vi.advanceTimersByTime(45_000);
    const r = await p;
    expect(r.stopReason).toBe('time-limit');
    expect(onAutoStop).toHaveBeenCalled();
    vi.useRealTimers();
  });

  it('error de grabación rechaza la promesa', async () => {
    const rec = new Recorder({ Ctor: FakeMediaRecorder as unknown as typeof MediaRecorder, now: () => 0 });
    const p = rec.start(fakeStream().stream, { maxMs: 1000 });
    FakeMediaRecorder.instances.at(-1)!.fail();
    await expect(p).rejects.toThrow(/Error de grabación/);
  });

  it('si el micrófono se desconecta, conserva lo grabado y marca la interrupción', async () => {
    const { stream, track } = fakeStream();
    const rec = new Recorder({ Ctor: FakeMediaRecorder as unknown as typeof MediaRecorder, now: () => 0 });
    const p = rec.start(stream, { maxMs: 10_000 });
    track.end();
    expect((await p).stopReason).toBe('interrupted');
  });

  it('valida grabación vacía, corta y larga', () => {
    const limits = { minMs: 1000, maxMs: 45_000 };
    expect(validateRecording({ sizeBytes: 0, durationMs: 5000 }, limits)).toBe('empty');
    expect(validateRecording({ sizeBytes: 10, durationMs: 400 }, limits)).toBe('too-short');
    expect(validateRecording({ sizeBytes: 10, durationMs: 60_000 }, limits)).toBe('too-long');
    expect(validateRecording({ sizeBytes: 10, durationMs: 20_000 }, limits)).toBeNull();
  });
});

describe('análisis acústico: ruido estacionario', () => {
  it('un zumbido constante no se cuenta como habla', () => {
    const hum = new Float32Array(RATE * 3).map((_, k) => 0.05 * Math.sin((2 * Math.PI * 50 * k) / RATE));
    const m = analyzeSamples(hum, RATE);
    expect(m.speechDurationSec).toBe(0);
    expect(m.quality.noisy).toBe(true);
  });
});
