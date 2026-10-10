/**
 * Localiza en una grabación externa los pitidos que emite la página (inicio
 * de respuesta a 880 Hz, fin a 660 Hz) para analizar solo la respuesta y no
 * la consigna leída por la página. Algoritmo de Goertzel por tramas de 20 ms;
 * un pitido es una racha de tramas dominadas por esa frecuencia, sin energía
 * en sus subarmónicos (la voz siempre tiene F0 por debajo: un armónico de la
 * voz que coincida con 660/880 Hz no es un tono puro) y de duración acotada.
 */

export const START_BEEP_HZ = 880;
export const END_BEEP_HZ = 660;

const FRAME_SEC = 0.02;
const HOP_SEC = 0.01;
/** Fracción mínima de la energía de la trama concentrada en la frecuencia del pitido. */
const DOMINANCE = 0.7;
/** Máxima energía relativa admitida en f/2, f/3 y f/4 (un tono puro no tiene subarmónicos; la voz sí: su F0). */
const SUBHARMONIC = 0.03;
/** El pitido dura 160 ms: rachas de 100 ms a 600 ms (con reverberación). */
const MIN_FRAMES = 10;
const MAX_SEC = 0.6;

const hannCache = new Map<number, Float32Array>();
function hann(n: number): Float32Array {
  let w = hannCache.get(n);
  if (!w) {
    w = Float32Array.from({ length: n }, (_, i) => 0.5 - 0.5 * Math.cos((2 * Math.PI * i) / (n - 1)));
    hannCache.set(n, w);
  }
  return w;
}

function goertzelRatio(x: Float32Array, start: number, n: number, freq: number, rate: number, w: Float32Array): number {
  const coeff = 2 * Math.cos((2 * Math.PI * freq) / rate);
  let s1 = 0;
  let s2 = 0;
  let energy = 0;
  for (let i = 0; i < n; i++) {
    const v = x[start + i]! * w[i]!;
    energy += v * v;
    const s0 = v + coeff * s1 - s2;
    s2 = s1;
    s1 = s0;
  }
  if (energy < 1e-9) return 0;
  const power = s1 * s1 + s2 * s2 - coeff * s1 * s2;
  return power / ((n / 2) * energy) / 0.75; // normaliza la pérdida de la ventana de Hann
}

/** Intervalos [inicio, fin] en segundos donde suena un tono puro de la frecuencia dada. */
export function findTones(samples: Float32Array, rate: number, freq: number): [number, number][] {
  const n = Math.round(FRAME_SEC * rate);
  const hop = Math.round(HOP_SEC * rate);
  const w = hann(n);
  const out: [number, number][] = [];
  let runStart = -1;
  let count = 0;
  const close = (endSample: number) => {
    const s = runStart / rate;
    const e = endSample / rate;
    if (count >= MIN_FRAMES && e - s <= MAX_SEC) out.push([s, e]);
  };
  for (let start = 0; start + n <= samples.length; start += hop) {
    let rms = 0;
    for (let i = start; i < start + n; i++) rms += samples[i]! * samples[i]!;
    rms = Math.sqrt(rms / n);
    const on =
      rms > 0.003 &&
      goertzelRatio(samples, start, n, freq, rate, w) >= DOMINANCE &&
      [2, 3, 4].every((k) => goertzelRatio(samples, start, n, freq / k, rate, w) < SUBHARMONIC);
    if (on) {
      if (runStart < 0) runStart = start;
      count++;
    } else {
      if (runStart >= 0) close(start - hop + n);
      runStart = -1;
      count = 0;
    }
  }
  if (runStart >= 0) close(samples.length);
  return out;
}

export interface ResponseWindow {
  start: number;
  end: number;
  /** Se encontró el pitido de fin dentro del tiempo de respuesta. */
  endBeep: boolean;
}

/**
 * Tramo de la respuesta: desde el último pitido de inicio hasta el pitido de
 * fin posterior. El pitido de fin solo se acepta dentro del tiempo de
 * respuesta (+2 s); si no aparece, el tramo se limita a ese tiempo.
 * null si no hay pitido de inicio.
 */
export function responseWindow(samples: Float32Array, rate: number, expectedSec?: number): ResponseWindow | null {
  const starts = findTones(samples, rate, START_BEEP_HZ);
  if (!starts.length) return null;
  const last = starts[starts.length - 1]!;
  const total = samples.length / rate;
  const start = Math.min(total, last[1] + 0.05);
  const limit = expectedSec ? start + expectedSec + 2 : total;
  const ends = findTones(samples, rate, END_BEEP_HZ).filter(([a]) => a > last[1] && a <= limit);
  const end = ends.length ? Math.max(start, ends[0]![0] - 0.02) : Math.min(total, expectedSec ? start + expectedSec + 0.5 : total);
  const r2 = (v: number) => Math.round(v * 100) / 100;
  return { start: r2(start), end: r2(end), endBeep: ends.length > 0 };
}
