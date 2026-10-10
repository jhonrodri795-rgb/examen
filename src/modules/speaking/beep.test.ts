import { describe, expect, it } from 'vitest';
import { END_BEEP_HZ, START_BEEP_HZ, findTones, responseWindow } from './beep';

const SR = 16000;
const tone = (hz: number, sec: number, amp = 0.2) => Float32Array.from({ length: Math.round(sec * SR) }, (_, i) => amp * Math.sin((2 * Math.PI * hz * i) / SR) + (Math.random() - 0.5) * 0.004);
const noise = (sec: number, amp = 0.002) => Float32Array.from({ length: Math.round(sec * SR) }, () => (Math.random() - 0.5) * amp);
/** Habla sintética: armónicos que cambian de tono cada 120 ms (no es un tono puro). */
const speechLike = (sec: number) => {
  let ph = 0;
  return Float32Array.from({ length: Math.round(sec * SR) }, (_, i) => {
    const f = 110 + 60 * Math.sin(i / 1900) + ((Math.floor(i / 1920) * 37) % 50);
    ph += (2 * Math.PI * f) / SR;
    const env = 0.5 + 0.5 * Math.sin((2 * Math.PI * 3.5 * i) / SR);
    return 0.2 * env * (Math.sin(ph) + 0.6 * Math.sin(2 * ph) + 0.4 * Math.sin(3 * ph) + 0.3 * Math.sin(5 * ph) + 0.2 * Math.sin(8 * ph));
  });
};
const concat = (...p: Float32Array[]) => {
  const out = new Float32Array(p.reduce((s, x) => s + x.length, 0));
  let o = 0;
  for (const x of p) {
    out.set(x, o);
    o += x.length;
  }
  return out;
};

describe('detección de los pitidos de la página en una grabación externa', () => {
  it('encuentra el pitido de inicio aunque esté atenuado y con ruido', () => {
    const x = concat(noise(1), speechLike(3), noise(0.3), tone(START_BEEP_HZ, 0.16, 0.03), speechLike(5));
    const t = findTones(x, SR, START_BEEP_HZ);
    expect(t).toHaveLength(1);
    expect(t[0]![0]).toBeGreaterThan(4.2);
    expect(t[0]![0]).toBeLessThan(4.4);
  });

  it('no confunde la voz con un pitido', () => {
    expect(findTones(speechLike(10), SR, START_BEEP_HZ)).toHaveLength(0);
    expect(findTones(speechLike(10), SR, END_BEEP_HZ)).toHaveLength(0);
  });

  it('delimita la respuesta entre el pitido de inicio y el de fin', () => {
    // consigna (voz) → pitido inicio → respuesta 6 s → pitido fin → ruido
    const x = concat(speechLike(4), tone(START_BEEP_HZ, 0.16), speechLike(6), tone(END_BEEP_HZ, 0.16), noise(2));
    const w = responseWindow(x, SR)!;
    expect(w.start).toBeGreaterThan(4.15);
    expect(w.start).toBeLessThan(4.3);
    expect(w.end).toBeGreaterThan(10.05);
    expect(w.end).toBeLessThan(10.2);
    expect(w.endBeep).toBe(true);
  });

  it('usa el último pitido de inicio si se grabaron varios intentos', () => {
    const x = concat(tone(START_BEEP_HZ, 0.16), speechLike(3), tone(START_BEEP_HZ, 0.16), speechLike(4));
    const w = responseWindow(x, SR)!;
    expect(w.start).toBeGreaterThan(3.3);
    expect(w.endBeep).toBe(false);
    expect(w.end).toBeCloseTo(x.length / SR, 1);
  });

  it('sin pitido no recorta', () => {
    expect(responseWindow(speechLike(5), SR)).toBeNull();
  });
});
