/**
 * Localiza en una grabación externa los pitidos que emite la página (inicio
 * de respuesta a 880 Hz, fin de tiempo a 660 Hz) para analizar solo la
 * respuesta y no la consigna leída por la página. Algoritmo de Goertzel por
 * tramas de 20 ms; un pitido es una racha de tramas dominadas por esa
 * frecuencia.
 */

export const START_BEEP_HZ = 880;
export const END_BEEP_HZ = 660;

const FRAME_SEC = 0.02;
const HOP_SEC = 0.01;
/** Fracción mínima de la energía de la trama concentrada en la frecuencia del pitido. */
const DOMINANCE = 0.45;
const MIN_FRAMES = 6;

function goertzelRatio(x: Float32Array, start: number, n: number, freq: number, rate: number): number {
  const k = (2 * Math.PI * freq) / rate;
  const coeff = 2 * Math.cos(k);
  let s1 = 0;
  let s2 = 0;
  let energy = 0;
  for (let i = 0; i < n; i++) {
    // Ventana de Hann para reducir fugas espectrales.
    const w = 0.5 - 0.5 * Math.cos((2 * Math.PI * i) / (n - 1));
    const v = x[start + i]! * w;
    energy += v * v;
    const s0 = v + coeff * s1 - s2;
    s2 = s1;
    s1 = s0;
  }
  if (energy < 1e-9) return 0;
  const power = s1 * s1 + s2 * s2 - coeff * s1 * s2;
  return power / ((n / 2) * energy) / 0.75; // normaliza la pérdida de la ventana de Hann
}

/** Intervalos [inicio, fin] en segundos donde suena un tono de la frecuencia dada. */
export function findTones(samples: Float32Array, rate: number, freq: number): [number, number][] {
  const n = Math.round(FRAME_SEC * rate);
  const hop = Math.round(HOP_SEC * rate);
  const out: [number, number][] = [];
  let runStart = -1;
  let count = 0;
  for (let start = 0; start + n <= samples.length; start += hop) {
    let rms = 0;
    for (let i = start; i < start + n; i++) rms += samples[i]! * samples[i]!;
    rms = Math.sqrt(rms / n);
    const on = rms > 0.003 && goertzelRatio(samples, start, n, freq, rate) >= DOMINANCE;
    if (on) {
      if (runStart < 0) runStart = start;
      count++;
    } else {
      if (runStart >= 0 && count >= MIN_FRAMES) out.push([runStart / rate, (start - hop + n) / rate]);
      runStart = -1;
      count = 0;
    }
  }
  if (runStart >= 0 && count >= MIN_FRAMES) out.push([runStart / rate, samples.length / rate]);
  return out;
}

/**
 * Tramo de la respuesta: desde el último pitido de inicio hasta el pitido de
 * fin posterior (o el final del audio). null si no hay pitido de inicio.
 */
export function responseWindow(samples: Float32Array, rate: number): { start: number; end: number; endBeep: boolean } | null {
  const starts = findTones(samples, rate, START_BEEP_HZ);
  if (!starts.length) return null;
  const last = starts[starts.length - 1]!;
  const ends = findTones(samples, rate, END_BEEP_HZ).filter(([a]) => a > last[1]);
  const total = samples.length / rate;
  const start = Math.min(total, last[1] + 0.05);
  const end = ends.length ? Math.max(start, ends[0]![0] - 0.02) : total;
  return { start: Math.round(start * 100) / 100, end: Math.round(end * 100) / 100, endBeep: ends.length > 0 };
}
