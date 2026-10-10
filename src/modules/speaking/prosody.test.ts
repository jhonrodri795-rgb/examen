import { describe, expect, it } from 'vitest';
import { analyzeSamples } from './acoustic';
import { analyzeProsody, downsample, framePitch } from './prosody';

const SR = 16000;

/** Voz sintética: sílabas con tono armónico (f0) y envolvente de Hann, separadas por breves caídas. */
function syllables(opts: { perSecond: number; seconds: number; f0: (t: number) => number; pauseEvery?: number; pauseSec?: number; amp?: number }): Float32Array {
  const out: number[] = [];
  const sylDur = 1 / opts.perSecond;
  let phase = 0;
  let count = 0;
  let t = 0;
  while (t < opts.seconds) {
    const n = Math.round(sylDur * SR);
    for (let i = 0; i < n; i++) {
      const tt = t + i / SR;
      const env = Math.sin((Math.PI * i) / n) ** 2;
      phase += (2 * Math.PI * opts.f0(tt)) / SR;
      const v = Math.sin(phase) + 0.5 * Math.sin(2 * phase) + 0.25 * Math.sin(3 * phase);
      out.push((opts.amp ?? 0.25) * env * v + (Math.random() - 0.5) * 0.001);
    }
    t += sylDur;
    count++;
    if (opts.pauseEvery && count % opts.pauseEvery === 0) {
      const p = Math.round((opts.pauseSec ?? 0.6) * SR);
      for (let i = 0; i < p; i++) out.push((Math.random() - 0.5) * 0.001);
      t += opts.pauseSec ?? 0.6;
    }
  }
  return Float32Array.from(out);
}

const silence = (sec: number) => Float32Array.from({ length: Math.round(sec * SR) }, () => (Math.random() - 0.5) * 0.001);
const concat = (...parts: Float32Array[]) => {
  const out = new Float32Array(parts.reduce((s, p) => s + p.length, 0));
  let o = 0;
  for (const p of parts) {
    out.set(p, o);
    o += p.length;
  }
  return out;
};

describe('tono (F0) por autocorrelación', () => {
  it('estima la frecuencia fundamental de un tono armónico', () => {
    for (const f of [110, 150, 220, 300]) {
      const x = Float32Array.from({ length: 4000 }, (_, i) => Math.sin((2 * Math.PI * f * i) / 8000) + 0.4 * Math.sin((4 * Math.PI * f * i) / 8000));
      const est = framePitch(x, 1000, 320, 8000)!;
      expect(Math.abs(est - f) / f).toBeLessThan(0.03);
    }
  });
  it('voces agudas cerca de 400 Hz no se reducen a la mitad, y por encima se descartan', () => {
    const tone = (f: number) => Float32Array.from({ length: 4000 }, (_, i) => Math.sin((2 * Math.PI * f * i) / 8000) + 0.4 * Math.sin((4 * Math.PI * f * i) / 8000));
    for (const f of [380, 392, 396, 399]) expect(Math.abs(framePitch(tone(f), 1000, 320, 8000)! - f) / f).toBeLessThan(0.03);
    expect(framePitch(tone(450), 1000, 320, 8000)).toBeNull();
    expect(framePitch(tone(520), 1000, 320, 8000)).toBeNull();
  });

  it('no da tono en ruido', () => {
    const x = Float32Array.from({ length: 4000 }, () => Math.random() - 0.5);
    expect(framePitch(x, 1000, 320, 8000)).toBeNull();
  });
  it('remuestrea a 8 kHz conservando la duración', () => {
    expect(downsample(new Float32Array(48000), 48000).length).toBe(8000);
    expect(downsample(new Float32Array(44100), 44100).length).toBe(8000);
  });
});

describe('fluidez: núcleos silábicos y velocidad', () => {
  it('cuenta sílabas y estima la velocidad de articulación', () => {
    const x = concat(silence(0.5), syllables({ perSecond: 4, seconds: 8, f0: () => 150 }), silence(0.5));
    const m = analyzeSamples(x, SR);
    const p = m.prosody!;
    expect(p.syllableCount).toBeGreaterThanOrEqual(29);
    expect(p.syllableCount).toBeLessThanOrEqual(35);
    expect(p.articulationRateSps!).toBeGreaterThan(3.4);
    expect(p.articulationRateSps!).toBeLessThan(4.6);
    expect(p.f0MedianHz!).toBeGreaterThan(140);
    expect(p.f0MedianHz!).toBeLessThan(160);
    expect(p.reliability).toBe('ok');
  });

  it('distingue un ritmo lento de uno rápido', () => {
    const slow = analyzeSamples(concat(silence(0.3), syllables({ perSecond: 2.5, seconds: 8, f0: () => 140 })), SR).prosody!;
    const fast = analyzeSamples(concat(silence(0.3), syllables({ perSecond: 5, seconds: 8, f0: () => 140 })), SR).prosody!;
    expect(fast.articulationRateSps!).toBeGreaterThan(slow.articulationRateSps! * 1.6);
  });

  it('las pausas reducen la velocidad de habla y acortan los tramos', () => {
    const fluent = analyzeSamples(syllables({ perSecond: 4, seconds: 10, f0: () => 150 }), SR);
    const choppy = analyzeSamples(syllables({ perSecond: 4, seconds: 10, f0: () => 150, pauseEvery: 3, pauseSec: 0.8 }), SR);
    expect(choppy.prosody!.speechRateSps!).toBeLessThan(fluent.prosody!.speechRateSps! * 0.75);
    expect(choppy.prosody!.meanRunSyllables!).toBeLessThan(fluent.prosody!.meanRunSyllables!);
    expect(choppy.pauseCount).toBeGreaterThan(fluent.pauseCount);
  });
});

describe('prosodia: variación de tono', () => {
  it('un tono plano es monótono y una entonación variada tiene más rango', () => {
    const flat = analyzeSamples(syllables({ perSecond: 4, seconds: 8, f0: () => 150 }), SR).prosody!;
    const varied = analyzeSamples(syllables({ perSecond: 4, seconds: 8, f0: (t) => 150 * 2 ** ((5 * Math.sin(2 * Math.PI * 0.4 * t)) / 12) }), SR).prosody!;
    expect(flat.f0RangeSt!).toBeLessThan(1.5);
    expect(varied.f0RangeSt!).toBeGreaterThan(6);
  });

  it('una voz aguda y monótona (≈375 Hz) no aparece como entonación variada', () => {
    const p = analyzeSamples(syllables({ perSecond: 4, seconds: 8, f0: (t) => 375 * 2 ** ((0.5 * Math.sin(2 * Math.PI * 0.5 * t)) / 12) }), SR).prosody!;
    expect(p.f0MedianHz!).toBeGreaterThan(355);
    expect(p.f0MedianHz!).toBeLessThan(395);
    expect(p.f0RangeSt!).toBeLessThan(3);
  });

  it('cuenta las sílabas aunque el audio no tenga silencio alrededor', () => {
    const p = analyzeSamples(syllables({ perSecond: 4, seconds: 10, f0: () => 150 }), SR).prosody!;
    expect(p.syllableCount).toBeGreaterThanOrEqual(36);
    expect(p.syllableCount).toBeLessThanOrEqual(44);
  });

  it('marca baja fiabilidad con muy poca voz', () => {
    const p = analyzeProsody(syllables({ perSecond: 4, seconds: 1, f0: () => 150 }), SR, [[0, 1]]);
    expect(p.reliability).toBe('low');
  });
});
