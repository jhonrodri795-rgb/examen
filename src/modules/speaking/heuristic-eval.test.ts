import { describe, expect, it } from 'vitest';
import type { AcousticMetrics, Transcript } from '@shared/speaking-types';
import { heuristicEvaluation } from './heuristic-eval';
import { alignWords, computeTranscriptMetrics } from './transcript-analysis';

const acoustic = (patch: Partial<AcousticMetrics> = {}): AcousticMetrics => ({
  method: 'energy-vad-v1', totalDurationSec: 44, speechDurationSec: 36, leadingSilenceSec: 1, trailingSilenceSec: 1, phonationRatio: 0.85,
  pauseCount: 6, longPauseCount: 0, meanPauseSec: 0.5, longestPauseSec: 0.8, pausesPerMinute: 8.6, meanRunSec: 5, runCount: 7,
  peakDbfs: -3, rmsDbfs: -20, noiseFloorDbfs: -60, clippingRatio: 0, runs: [[1, 43]],
  quality: { tooQuiet: false, clipping: false, noisy: false, mostlySilent: false }, ...patch,
});

const transcript = (text: string): Transcript => ({
  provider: 'test', model: 't', text, words: [], segments: [], durationSec: 44,
  capabilities: { wordTimestamps: false, wordConfidence: false, segmentConfidence: false, fillerDetection: 'none' }, createdAt: 0,
});

describe('evaluación heurística de Speaking', () => {
  it('sin transcripción solo evalúa la fluidez a partir de la señal', () => {
    const ev = heuristicEvaluation({ task: 'interview', prompt: 'What technology do you use when you study?', responseSec: 45, acoustic: acoustic(), transcript: null, metrics: null, alignment: null, pronunciation: null });
    const by = Object.fromEntries(ev.criteria.map((c) => [c.criterion, c]));
    expect(by.delivery!.evaluable).toBe(true);
    expect(by.languageUse!.evaluable).toBe(false);
    expect(by.topicDevelopment!.evaluable).toBe(false);
    expect(by.taskFulfillment!.evaluable).toBe(false);
    expect(ev.mode).toBe('heuristic');
    expect(ev.limitations.join(' ')).toMatch(/pronunciación/);
  });

  it('una grabación silenciosa no recibe puntuación', () => {
    const ev = heuristicEvaluation({ task: 'interview', prompt: 'Q', responseSec: 45, acoustic: acoustic({ speechDurationSec: 0, quality: { tooQuiet: true, clipping: false, noisy: false, mostlySilent: true } }), transcript: null, metrics: null, alignment: null, pronunciation: null });
    expect(ev.overall).toBeNull();
  });

  it('pausas largas reducen la puntuación de fluidez', () => {
    const good = heuristicEvaluation({ task: 'interview', prompt: 'Q', responseSec: 45, acoustic: acoustic(), transcript: null, metrics: null, alignment: null, pronunciation: null });
    const bad = heuristicEvaluation({ task: 'interview', prompt: 'Q', responseSec: 45, acoustic: acoustic({ longPauseCount: 6, phonationRatio: 0.45 }), transcript: null, metrics: null, alignment: null, pronunciation: null });
    expect(bad.criteria[0]!.score!).toBeLessThan(good.criteria[0]!.score!);
  });

  it('con transcripción evalúa todos los criterios y cita evidencia real', () => {
    const t = transcript('I usually use my laptop and a flashcard app when I study because they help me review. For example, I review vocabulary every morning. Also, my university library has good computers, so I go there on weekends.');
    const m = computeTranscriptMetrics(t, acoustic());
    const ev = heuristicEvaluation({ task: 'interview', prompt: 'What kinds of technology do you use most often when you study?', responseSec: 45, acoustic: acoustic(), transcript: t, metrics: m, alignment: null, pronunciation: null });
    expect(ev.criteria.every((c) => c.evaluable)).toBe(true);
    for (const c of ev.criteria) for (const e of c.evidence) if (e.source === 'transcript') expect(t.text).toContain(e.quote);
    expect(ev.overall5).not.toBeNull();
  });

  it('Listen and Repeat usa la precisión de la alineación', () => {
    const ref = 'Please keep your voice down in the quiet reading areas.';
    const t = transcript('please keep your voice down in the reading areas');
    const al = alignWords(ref, t.text);
    const ev = heuristicEvaluation({ task: 'listen-repeat', prompt: ref, responseSec: 10, acoustic: acoustic(), transcript: t, metrics: computeTranscriptMetrics(t, null), alignment: al, pronunciation: null });
    const task = ev.criteria.find((c) => c.criterion === 'taskFulfillment')!;
    expect(task.score).toBe(3.5);
    expect(ev.issues.some((i) => i.problem.includes('quiet'))).toBe(true);
  });
});
