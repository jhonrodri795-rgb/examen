/**
 * Fluidez y prosodia medidas en la señal, sin transcripción ni servicios
 * externos. Todo es aproximado y se etiqueta como tal.
 *
 * - Sílabas: detección de núcleos silábicos por picos de intensidad con
 *   caída mínima entre picos y comprobación de sonoridad (inspirado en
 *   De Jong & Wempe, 2009, "Praat script to detect syllable nuclei").
 *   De ahí: velocidad de habla (sílabas/s sobre el tiempo total), velocidad
 *   de articulación (sílabas/s sobre el tiempo de habla) y longitud media de
 *   los tramos entre pausas (en sílabas).
 * - Tono (F0): autocorrelación normalizada en tramas de 40 ms sobre la señal
 *   remuestreada a 8 kHz (75–400 Hz), con filtrado de errores de octava.
 *   De ahí: mediana, rango (percentiles 10–90) y desviación en semitonos.
 * - Variación de intensidad entre sílabas (dB): indicio de contraste de acento.
 *
 * No mide pronunciación ni inteligibilidad; un acento no nativo no es un error.
 */
import type { ProsodyMetrics } from '@shared/speaking-types';

const TARGET_RATE = 8000;
const FRAME = 320; // 40 ms a 8 kHz
const HOP = 80; // 10 ms
const MIN_F0 = 75;
const MAX_F0 = 400;
const CLARITY = 0.5; // correlación normalizada mínima para considerar sonoro
const DIP_DB = 2;
const PEAK_REL_DB = 25;

/** Remuestreo a 8 kHz con doble filtro de caja (paso bajo triangular) e interpolación lineal. */
export function downsample(samples: Float32Array, sampleRate: number, target = TARGET_RATE): Float32Array {
  if (sampleRate <= target) return samples;
  const ratio = sampleRate / target;
  const w = Math.max(1, Math.round(ratio));
  const box = (src: Float32Array): Float32Array => {
    const prefix = new Float64Array(src.length + 1);
    for (let i = 0; i < src.length; i++) prefix[i + 1] = prefix[i]! + src[i]!;
    const out = new Float32Array(src.length);
    const half = Math.floor(w / 2);
    for (let i = 0; i < src.length; i++) {
      const a = Math.max(0, i - half);
      const b = Math.min(src.length, a + w);
      out[i] = (prefix[b]! - prefix[a]!) / (b - a);
    }
    return out;
  };
  const filtered = box(box(samples));
  const n = Math.floor(samples.length / ratio);
  const out = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const pos = i * ratio;
    const j = Math.floor(pos);
    const frac = pos - j;
    out[i] = filtered[j]! * (1 - frac) + (filtered[Math.min(filtered.length - 1, j + 1)] ?? 0) * frac;
  }
  return out;
}

/** F0 de una trama por autocorrelación normalizada (null si no es sonora). */
export function framePitch(x: Float32Array, start: number, n: number, rate: number): number | null {
  if (start + n > x.length) return null;
  let mean = 0;
  for (let i = 0; i < n; i++) mean += x[start + i]!;
  mean /= n;
  const buf = new Float64Array(n);
  let energy = 0;
  for (let i = 0; i < n; i++) {
    buf[i] = x[start + i]! - mean;
    energy += buf[i]! * buf[i]!;
  }
  if (energy < 1e-8) return null;
  const minLag = Math.floor(rate / MAX_F0);
  const maxLag = Math.min(n - 2, Math.ceil(rate / MIN_F0));
  const r = new Float64Array(maxLag + 2);
  let best = -1;
  for (let lag = minLag; lag <= maxLag + 1; lag++) {
    let num = 0;
    let e1 = 0;
    let e2 = 0;
    for (let i = 0; i + lag < n; i++) {
      num += buf[i]! * buf[i + lag]!;
      e1 += buf[i]! * buf[i]!;
      e2 += buf[i + lag]! * buf[i + lag]!;
    }
    r[lag] = e1 > 0 && e2 > 0 ? num / Math.sqrt(e1 * e2) : 0;
    if (lag <= maxLag && r[lag]! > best) best = r[lag]!;
  }
  if (best < CLARITY) return null;
  // El primer máximo local cercano al mejor evita errores de octava hacia abajo.
  let lag = -1;
  for (let l = minLag + 1; l <= maxLag; l++) {
    if (r[l]! >= 0.9 * best && r[l]! >= r[l - 1]! && r[l]! >= r[l + 1]!) {
      lag = l;
      break;
    }
  }
  if (lag < 0) return null;
  const a = r[lag - 1]!;
  const b = r[lag]!;
  const c = r[lag + 1]!;
  const denom = a - 2 * b + c;
  const shift = denom !== 0 ? Math.max(-0.5, Math.min(0.5, (0.5 * (a - c)) / denom)) : 0;
  return rate / (lag + shift);
}

const quantile = (sorted: number[], q: number) => (sorted.length ? sorted[Math.min(sorted.length - 1, Math.max(0, Math.round(q * (sorted.length - 1))))]! : NaN);
const round = (v: number, d = 2) => Math.round(v * 10 ** d) / 10 ** d;

/**
 * @param runs Segmentos con voz [inicio, fin] en segundos (del VAD).
 */
export function analyzeProsody(samples: Float32Array, sampleRate: number, runs: [number, number][]): ProsodyMetrics {
  const x = downsample(samples, sampleRate);
  const rate = sampleRate <= TARGET_RATE ? sampleRate : TARGET_RATE;
  const frames = Math.max(0, Math.floor((x.length - FRAME) / HOP) + 1);
  const inRun = (t: number) => runs.some(([a, b]) => t >= a && t <= b);

  // Contorno de intensidad (dB) y F0 por trama (centro de la trama).
  const db = new Float64Array(frames);
  const f0: (number | null)[] = new Array(frames).fill(null);
  const speech = new Uint8Array(frames);
  for (let i = 0; i < frames; i++) {
    const s = i * HOP;
    let sum = 0;
    for (let k = 0; k < FRAME; k++) sum += x[s + k]! * x[s + k]!;
    db[i] = 10 * Math.log10(Math.max(sum / FRAME, 1e-12));
    const t = (s + FRAME / 2) / rate;
    if (inRun(t)) {
      speech[i] = 1;
      f0[i] = framePitch(x, s, FRAME, rate);
    }
  }
  // Suavizado ligero del contorno de intensidad (3 tramas).
  const sm = new Float64Array(frames);
  for (let i = 0; i < frames; i++) sm[i] = (db[Math.max(0, i - 1)]! + db[i]! + db[Math.min(frames - 1, i + 1)]!) / 3;

  // Errores de octava: se descartan valores lejos de la mediana.
  const raw = f0.filter((v): v is number => v !== null).sort((a, b) => a - b);
  const med0 = quantile(raw, 0.5);
  const valid = (v: number | null): v is number => v !== null && v > med0 * 0.55 && v < med0 * 1.8;
  const pitched = f0.map((v) => (valid(v) ? v : null));

  // Núcleos silábicos: picos de intensidad sonoros con caída mínima entre ellos.
  const allDb = Array.from(sm).sort((a, b) => a - b);
  const q99 = quantile(allDb, 0.99);
  const noise = quantile(allDb, 0.1);
  const threshold = Math.max(q99 - PEAK_REL_DB, noise + 6);
  const kept: number[] = [];
  for (let i = 1; i < frames - 1; i++) {
    if (!speech[i] || sm[i]! < threshold || sm[i]! < sm[i - 1]! || sm[i]! < sm[i + 1]!) continue;
    if (sm[i] === sm[i - 1]) continue; // meseta: cuenta solo su primer punto
    const voiced = [i - 2, i - 1, i, i + 1, i + 2].some((j) => j >= 0 && j < frames && pitched[j] !== null);
    if (!voiced) continue;
    const prev = kept[kept.length - 1];
    if (prev === undefined) {
      kept.push(i);
      continue;
    }
    let dip = Infinity;
    for (let j = prev; j <= i; j++) dip = Math.min(dip, sm[j]!);
    if (Math.min(sm[prev]!, sm[i]!) - dip >= DIP_DB) kept.push(i);
    else if (sm[i]! > sm[prev]!) kept[kept.length - 1] = i;
  }
  const peakTimes = kept.map((i) => (i * HOP + FRAME / 2) / rate);

  const speechSec = runs.reduce((s, [a, b]) => s + (b - a), 0);
  const span = runs.length ? runs[runs.length - 1]![1] - runs[0]![0] : 0;
  const syllables = kept.length;
  const perRun = runs.map(([a, b]) => peakTimes.filter((t) => t >= a && t <= b).length).filter((n) => n > 0);

  const voicedF0 = pitched.filter((v): v is number => v !== null);
  const speechFrames = speech.reduce((s, v) => s + v, 0);
  const median = quantile([...voicedF0].sort((a, b) => a - b), 0.5);
  const st = voicedF0.map((v) => 12 * Math.log2(v / median)).sort((a, b) => a - b);
  const stMean = st.reduce((a, b) => a + b, 0) / Math.max(1, st.length);
  const stStd = Math.sqrt(st.reduce((a, b) => a + (b - stMean) ** 2, 0) / Math.max(1, st.length));
  const peakDb = kept.map((i) => sm[i]!);
  const peakMean = peakDb.reduce((a, b) => a + b, 0) / Math.max(1, peakDb.length);
  const peakStd = Math.sqrt(peakDb.reduce((a, b) => a + (b - peakMean) ** 2, 0) / Math.max(1, peakDb.length));

  const voicedRatio = speechFrames ? voicedF0.length / speechFrames : 0;
  const enoughPitch = voicedF0.length >= 30;
  return {
    method: 'syllable-nuclei-f0-v1',
    syllableCount: syllables,
    speechRateSps: span >= 1 ? round(syllables / span) : null,
    articulationRateSps: speechSec >= 1 ? round(syllables / speechSec) : null,
    meanRunSyllables: perRun.length ? round(perRun.reduce((a, b) => a + b, 0) / perRun.length, 1) : null,
    voicedRatio: round(voicedRatio),
    f0MedianHz: enoughPitch ? Math.round(median) : null,
    f0RangeSt: enoughPitch ? round(quantile(st, 0.9) - quantile(st, 0.1), 1) : null,
    f0StdSt: enoughPitch ? round(stStd, 1) : null,
    intensityVarDb: peakDb.length >= 5 ? round(peakStd, 1) : null,
    reliability: speechSec >= 3 && syllables >= 8 && voicedRatio >= 0.3 ? 'ok' : 'low',
  };
}
