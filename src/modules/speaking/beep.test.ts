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

  it('no confunde con un pitido el armónico de una voz aguda que coincide con 660/880 Hz', () => {
    // Voz de F0 ≈ 220 Hz con el 3.er armónico (660 Hz) y el 4.º (880 Hz) reforzados por un formante.
    const vowel = (f0: number, sec: number, amps: number[]) => {
      let ph = 0;
      return Float32Array.from({ length: Math.round(sec * SR) }, (_, i) => {
        const f = f0 * (1 + 0.005 * Math.sin((2 * Math.PI * 5 * i) / SR));
        ph += (2 * Math.PI * f) / SR;
        return 0.08 * amps.reduce((acc, a, k) => acc + a * Math.sin((k + 1) * ph), 0);
      });
    };
    // Vocales con un armónico muy dominante (formante encima): 3.º = 660 Hz y 4.º = 880 Hz.
    const x = concat(vowel(220, 0.5, [0.3, 0.2, 1, 0.3, 0.1]), noise(0.1), vowel(220, 0.5, [0.3, 0.2, 0.3, 1, 0.1]));
    expect(findTones(x, SR, END_BEEP_HZ)).toHaveLength(0);
    expect(findTones(x, SR, START_BEEP_HZ)).toHaveLength(0);
  });

  it('sin pitido de fin limita el tramo al tiempo de respuesta', () => {
    // pitido de inicio → 4 s de respuesta → 20 s de ruido (no se pulsó «Terminar» y la grabadora siguió)
    const x = concat(speechLike(2), tone(START_BEEP_HZ, 0.16), speechLike(4), noise(20));
    const w = responseWindow(x, SR, 10)!;
    expect(w.endBeep).toBe(false);
    expect(w.end).toBeCloseTo(w.start + 10.5, 1);
  });

  it('ignora un tono de 660 Hz posterior al tiempo de respuesta', () => {
    const x = concat(tone(START_BEEP_HZ, 0.16), speechLike(5), noise(10), tone(END_BEEP_HZ, 0.16), noise(1));
    const w = responseWindow(x, SR, 8)!;
    expect(w.endBeep).toBe(false);
    expect(w.end).toBeLessThan(9);
  });

  it('sin pitido no recorta', () => {
    expect(responseWindow(speechLike(5), SR)).toBeNull();
  });
});
