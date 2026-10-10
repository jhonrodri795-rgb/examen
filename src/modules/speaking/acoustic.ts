/**
 * Análisis acústico local de la grabación (sin servicios externos).
 *
 * Método: detección de actividad de voz (VAD) por energía en tramas de 20 ms
 * con salto de 10 ms y umbral adaptativo al ruido de fondo. Mide tiempo de
 * habla, pausas y continuidad. NO mide pronunciación ni inteligibilidad:
 * solo describe cuándo hay señal de voz y su nivel.
 */
import type { AcousticMetrics } from '@shared/speaking-types';
import { analyzeProsody } from './prosody';

export interface VadOptions {
  frameMs: number;
  hopMs: number;
  /** Huecos más cortos que esto se consideran parte del habla (articulación). */
  minPauseMs: number;
  /** Segmentos de voz más cortos que esto se descartan (clics, golpes). */
  minRunMs: number;
  longPauseMs: number;
  /** Calcular sílabas y tono (por defecto sí). */
  prosody?: boolean;
}

export const DEFAULT_VAD: VadOptions = { frameMs: 20, hopMs: 10, minPauseMs: 250, minRunMs: 80, longPauseMs: 1000 };

const toDb = (x: number) => 20 * Math.log10(Math.max(x, 1e-10));

function percentile(sorted: number[], p: number): number {
  if (!sorted.length) return -100;
  const idx = Math.min(sorted.length - 1, Math.max(0, Math.round((p / 100) * (sorted.length - 1))));
  return sorted[idx]!;
}

export function analyzeSamples(samples: Float32Array, sampleRate: number, opts: VadOptions = DEFAULT_VAD): AcousticMetrics {
  const totalDurationSec = samples.length / sampleRate;
  const frame = Math.max(1, Math.round((opts.frameMs / 1000) * sampleRate));
  const hop = Math.max(1, Math.round((opts.hopMs / 1000) * sampleRate));

  let peak = 0;
  let clipped = 0;
  for (let i = 0; i < samples.length; i++) {
    const v = Math.abs(samples[i]!);
    if (v > peak) peak = v;
    if (v >= 0.99) clipped++;
  }

  const frameDb: number[] = [];
  for (let start = 0; start + frame <= samples.length; start += hop) {
    let sum = 0;
    for (let i = start; i < start + frame; i++) sum += samples[i]! * samples[i]!;
    frameDb.push(toDb(Math.sqrt(sum / frame)));
  }

  const sorted = [...frameDb].sort((a, b) => a - b);
  const noiseFloor = percentile(sorted, 10);
  const loud = percentile(sorted, 95);
  // Umbral adaptativo: 10 dB sobre el ruido de fondo, sin bajar de -50 dBFS y
  // sin exigir más de 15 dB por debajo de los picos (válido aunque casi todo sea voz).
  const threshold = Math.max(-50, Math.min(noiseFloor + 10, loud - 15));
  // Una señal estacionaria (zumbido, ventilador) tiene muy poca variación de energía; la voz no.
  const mean = frameDb.reduce((a, b) => a + b, 0) / Math.max(1, frameDb.length);
  const std = Math.sqrt(frameDb.reduce((a, b) => a + (b - mean) ** 2, 0) / Math.max(1, frameDb.length));
  const stationary = std < 3;

  // Tramas con voz → segmentos.
  const hopSec = hop / sampleRate;
  const frameSec = frame / sampleRate;
  let runs: [number, number][] = [];
  let runStart = -1;
  for (let i = 0; i < frameDb.length; i++) {
    const voiced = !stationary && frameDb[i]! >= threshold;
    if (voiced && runStart < 0) runStart = i;
    if ((!voiced || i === frameDb.length - 1) && runStart >= 0) {
      const endIdx = voiced ? i : i - 1;
      runs.push([runStart * hopSec, Math.min(totalDurationSec, endIdx * hopSec + frameSec)]);
      runStart = -1;
    }
  }

  // Fusionar huecos cortos y descartar segmentos muy breves.
  const merged: [number, number][] = [];
  for (const r of runs) {
    const last = merged[merged.length - 1];
    if (last && r[0] - last[1] < opts.minPauseMs / 1000) last[1] = r[1];
    else merged.push([r[0], r[1]]);
  }
  runs = merged.filter(([s, e]) => e - s >= opts.minRunMs / 1000);

  const speechDurationSec = runs.reduce((s, [a, b]) => s + (b - a), 0);
  const pauses: number[] = [];
  for (let i = 1; i < runs.length; i++) pauses.push(runs[i]![0] - runs[i - 1]![1]);
  const firstStart = runs[0]?.[0] ?? totalDurationSec;
  const lastEnd = runs[runs.length - 1]?.[1] ?? totalDurationSec;
  const span = Math.max(0, lastEnd - firstStart);

  let voicedEnergy = 0;
  let voicedFrames = 0;
  for (let i = 0; i < frameDb.length; i++) {
    const t = i * hopSec;
    if (runs.some(([a, b]) => t >= a && t <= b)) {
      voicedEnergy += Math.pow(10, frameDb[i]! / 10);
      voicedFrames++;
    }
  }
  const rmsDbfs = voicedFrames ? 10 * Math.log10(voicedEnergy / voicedFrames) : -100;
  const peakDbfs = toDb(peak);
  const clippingRatio = samples.length ? clipped / samples.length : 0;

  const r2 = (x: number) => Math.round(x * 100) / 100;
  const mostlySilent = speechDurationSec < 0.5 || (totalDurationSec > 0 && speechDurationSec / totalDurationSec < 0.15);
  const prosody = !mostlySilent && opts.prosody !== false ? analyzeProsody(samples, sampleRate, runs) : undefined;
  return {
    method: 'energy-vad-v1',
    totalDurationSec: r2(totalDurationSec),
    speechDurationSec: r2(speechDurationSec),
    leadingSilenceSec: r2(runs.length ? firstStart : totalDurationSec),
    trailingSilenceSec: r2(runs.length ? totalDurationSec - lastEnd : 0),
    phonationRatio: span > 0 ? r2(speechDurationSec / span) : 0,
    pauseCount: pauses.length,
    longPauseCount: pauses.filter((p) => p >= opts.longPauseMs / 1000).length,
    meanPauseSec: pauses.length ? r2(pauses.reduce((a, b) => a + b, 0) / pauses.length) : 0,
    longestPauseSec: pauses.length ? r2(Math.max(...pauses)) : 0,
    pausesPerMinute: span > 0 ? r2(pauses.length / (span / 60)) : 0,
    meanRunSec: runs.length ? r2(speechDurationSec / runs.length) : 0,
    runCount: runs.length,
    peakDbfs: r2(peakDbfs),
    rmsDbfs: r2(rmsDbfs),
    noiseFloorDbfs: r2(noiseFloor),
    clippingRatio: Math.round(clippingRatio * 1e5) / 1e5,
    runs: runs.map(([a, b]) => [r2(a), r2(b)]),
    quality: {
      tooQuiet: voicedFrames > 0 ? rmsDbfs < -40 || peakDbfs < -30 : peakDbfs < -40,
      clipping: clippingRatio > 0.001,
      noisy: stationary ? loud > -50 : noiseFloor > -45 && rmsDbfs - noiseFloor < 15,
      mostlySilent,
    },
    ...(prosody ? { prosody } : {}),
  };
}

/** Decodifica un Blob de audio a muestras mono (navegador). */
export async function decodeToMono(data: ArrayBuffer): Promise<{ samples: Float32Array; sampleRate: number }> {
  const Ctx = window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  const ctx = new Ctx();
  try {
    const buffer = await ctx.decodeAudioData(data.slice(0));
    const mono = new Float32Array(buffer.length);
    for (let c = 0; c < buffer.numberOfChannels; c++) {
      const ch = buffer.getChannelData(c);
      for (let i = 0; i < ch.length; i++) mono[i]! += ch[i]! / buffer.numberOfChannels;
    }
    return { samples: mono, sampleRate: buffer.sampleRate };
  } finally {
    void ctx.close();
  }
}

/** Convierte audio a WAV PCM 16 bits mono 16 kHz (requerido por algunos proveedores). */
export async function toWav16kMono(data: ArrayBuffer): Promise<ArrayBuffer> {
  const { samples, sampleRate } = await decodeToMono(data);
  const targetRate = 16000;
  const length = Math.ceil((samples.length * targetRate) / sampleRate);
  const offline = new OfflineAudioContext(1, length, targetRate);
  const buf = offline.createBuffer(1, samples.length, sampleRate);
  buf.copyToChannel(samples as Float32Array<ArrayBuffer>, 0);
  const src = offline.createBufferSource();
  src.buffer = buf;
  src.connect(offline.destination);
  src.start();
  const rendered = await offline.startRendering();
  return encodeWav(rendered.getChannelData(0), targetRate);
}

export function encodeWav(samples: Float32Array, sampleRate: number): ArrayBuffer {
  const buffer = new ArrayBuffer(44 + samples.length * 2);
  const view = new DataView(buffer);
  const writeStr = (o: number, s: string) => {
    for (let i = 0; i < s.length; i++) view.setUint8(o + i, s.charCodeAt(i));
  };
  writeStr(0, 'RIFF');
  view.setUint32(4, 36 + samples.length * 2, true);
  writeStr(8, 'WAVE');
  writeStr(12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  writeStr(36, 'data');
  view.setUint32(40, samples.length * 2, true);
  for (let i = 0; i < samples.length; i++) {
    const s = Math.max(-1, Math.min(1, samples[i]!));
    view.setInt16(44 + i * 2, s < 0 ? s * 0x8000 : s * 0x7fff, true);
  }
  return buffer;
}
