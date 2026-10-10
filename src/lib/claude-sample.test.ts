import { afterEach, describe, expect, it, vi } from 'vitest';
import { SPEAKING_SYSTEM, WRITING_SYSTEM, SELF_TRANSCRIPT_LIMITATION, type SpeakingEvalInput, type WritingEvalInput } from '@shared/evaluation';
import { SampleEvalError, __resetSampleForTests, extractJson, sampleEvaluateSpeaking, sampleEvaluateWriting, sampleEvaluatorInfo, type SampleFn } from './claude-sample';

const essay = 'Dear Professor Lee, I am writing to ask whether I could submit my lab report two days late because I was sick last week. I have attached a note from the clinic. Thank you for your understanding.';
const writingInput: WritingEvalInput = { task: { type: 'email', prompt: 'Write to your professor.', details: ['Explain the problem'], recommendedWords: [80, 120] }, text: essay };

const writingReply = {
  criteria: [
    { name: 'grammar', score: 4, rationale: 'Correcta.', evidence: ['I am writing to ask whether', 'a sentence that was never written'] },
    { name: 'taskFulfillment', score: 9, rationale: 'Cumple.', evidence: ['I have attached a note from the clinic'] },
  ],
  issues: [{ quote: 'two days late', problem: 'p', suggestion: 's' }, { quote: 'invented quote', problem: 'p', suggestion: 's' }],
  strengths: ['Registro adecuado.'],
  improvedVersion: 'Dear Professor Lee, ...',
  limitations: [],
};

function fakeSample(reply: unknown, extra: Partial<{ truncated: boolean; tier: 'default' | 'complex' | 'quick' }> = {}) {
  return vi.fn<SampleFn>(async () => ({ text: typeof reply === 'string' ? reply : JSON.stringify(reply), truncated: extra.truncated ?? false, modelTierApplied: extra.tier ?? 'default' }));
}

afterEach(() => __resetSampleForTests());

describe('extracción de JSON de la respuesta de Claude', () => {
  it('acepta JSON puro, bloque de código y texto alrededor', () => {
    expect(extractJson('{"a":1}')).toEqual({ a: 1 });
    expect(extractJson('```json\n{"a":2}\n```')).toEqual({ a: 2 });
    expect(extractJson('Aquí está: {"a":3} fin')).toEqual({ a: 3 });
  });
  it('rechaza respuestas sin JSON', () => {
    expect(() => extractJson('no hay datos')).toThrow(SampleEvalError);
  });
});

describe('evaluación de Writing con Claude (versión publicada)', () => {
  it('envía rúbrica, datos y esquema; valida y aplica las comprobaciones de honestidad', async () => {
    const fn = fakeSample(writingReply);
    __resetSampleForTests(fn);
    const ev = await sampleEvaluateWriting(writingInput);
    const prompt = fn.mock.calls[0]![0];
    expect(prompt).toContain(WRITING_SYSTEM);
    expect(prompt).toContain(`<text>${essay}</text>`);
    expect(prompt).toContain('"improvedVersion"'); // esquema JSON incluido
    expect(fn.mock.calls[0]![1]).toMatchObject({ modelTier: 'default' });
    expect(ev.provider).toBe('claude.ai');
    expect(ev.model).toContain('Claude');
    expect(ev.criteria.find((c) => c.name === 'grammar')!.evidence).toEqual(['I am writing to ask whether']);
    expect(ev.criteria.find((c) => c.name === 'taskFulfillment')!.score).toBe(5); // limitado a 0–5
    expect(ev.issues).toHaveLength(1);
    expect(ev.droppedEvidence).toBe(2);
    expect(ev.overall5).toBe(4.5);
  });

  it('no llama a Claude con textos demasiado breves', async () => {
    const fn = fakeSample(writingReply);
    __resetSampleForTests(fn);
    await expect(sampleEvaluateWriting({ ...writingInput, text: 'Too short.' })).rejects.toMatchObject({ code: 'text_too_short' });
    expect(fn).not.toHaveBeenCalled();
  });

  it('rechaza respuestas incompletas o con formato inválido', async () => {
    __resetSampleForTests(fakeSample(writingReply, { truncated: true }));
    await expect(sampleEvaluateWriting(writingInput)).rejects.toMatchObject({ code: 'truncated' });
    __resetSampleForTests(fakeSample({ criteria: 'x' }));
    await expect(sampleEvaluateWriting(writingInput)).rejects.toMatchObject({ code: 'bad_format' });
  });

  it('un permiso denegado desactiva la función para esta vista sin volver a llamar', async () => {
    const fn = vi.fn<SampleFn>(async () => Promise.reject({ code: 'not_granted', message: 'no' }));
    __resetSampleForTests(fn);
    expect((await sampleEvaluatorInfo()).configured).toBe(true);
    await expect(sampleEvaluateWriting(writingInput)).rejects.toMatchObject({ code: 'not_granted', permanent: true });
    expect((await sampleEvaluatorInfo()).configured).toBe(false);
    await expect(sampleEvaluateWriting(writingInput)).rejects.toMatchObject({ permanent: true });
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('un límite de uso se comunica sin desactivar la función', async () => {
    __resetSampleForTests(vi.fn<SampleFn>(async () => Promise.reject({ code: 'rate_limited', message: 'slow down' })));
    await expect(sampleEvaluateWriting(writingInput)).rejects.toMatchObject({ code: 'rate_limited', permanent: false });
    expect((await sampleEvaluatorInfo()).configured).toBe(true);
  });

  it('sin el visor de claude.ai la evaluación no está disponible', async () => {
    __resetSampleForTests(null);
    const info = await sampleEvaluatorInfo();
    expect(info.configured).toBe(false);
    expect(info.dataPolicy).toMatch(/claude\.ai/);
    await expect(sampleEvaluateWriting(writingInput)).rejects.toMatchObject({ code: 'unavailable' });
  });
});

describe('evaluación de Speaking con transcripción propia', () => {
  const text = 'I usually study in the library because it is quiet and um I can focus better there.';
  const input: SpeakingEvalInput = {
    task: { type: 'interview', prompt: 'Where do you like to study?', responseSec: 45 },
    transcript: { text, provider: 'self', lowConfidenceWords: [], source: 'self' },
    durationSec: null,
    acoustic: null,
    transcriptMetrics: null,
    pronunciation: null,
  };
  const reply = {
    criteria: [
      { criterion: 'delivery', evaluable: true, score: 3, rationale: 'Fluida', evidence: [{ quote: 'pauseCount = 1', source: 'audio-metrics' }] },
      { criterion: 'languageUse', evaluable: true, score: 3, rationale: 'Correcta', evidence: [{ quote: 'because it is quiet', source: 'transcript' }] },
      { criterion: 'topicDevelopment', evaluable: true, score: 2.5, rationale: 'Breve', evidence: [{ quote: 'I can focus better there', source: 'transcript' }] },
      { criterion: 'taskFulfillment', evaluable: true, score: 4, rationale: 'Responde', evidence: [{ quote: 'I usually study in the library', source: 'transcript' }] },
    ],
    strengths: [], issues: [], improvedResponse: 'I usually study in the library because…', exercises: [], pronunciationAdvice: [], limitations: [],
  };

  it('marca la fluidez como no evaluable sin audio e indica que la transcripción es propia', async () => {
    const fn = fakeSample(reply);
    __resetSampleForTests(fn);
    const ev = await sampleEvaluateSpeaking(input);
    expect(fn.mock.calls[0]![0]).toContain(SPEAKING_SYSTEM);
    expect(fn.mock.calls[0]![0]).toContain('<transcript source="self"');
    const by = Object.fromEntries(ev.criteria.map((c) => [c.criterion, c]));
    expect(by.delivery!.evaluable).toBe(false);
    expect(by.delivery!.score).toBeNull();
    expect(by.languageUse!.score).toBe(3);
    expect(ev.overall).toBe(3); // (3 + 2.5 + 4) / 3 = 3.17 → 3
    expect(ev.limitations).toContain(SELF_TRANSCRIPT_LIMITATION);
    expect(ev.limitations.join(' ')).toMatch(/pronunciación/);
  });

  it('con métricas acústicas reales la fluidez sí es evaluable', async () => {
    __resetSampleForTests(fakeSample(reply));
    const ev = await sampleEvaluateSpeaking({ ...input, durationSec: 30, acoustic: { pauseCount: 1 } });
    expect(ev.criteria.find((c) => c.criterion === 'delivery')!.score).toBe(3);
  });
});
