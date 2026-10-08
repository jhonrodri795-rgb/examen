import type { QuestionBank } from '../question-bank/registry';
import type { SectionId, Skill, TaskType } from '../question-bank/types';
import { elapsedMs } from '../exam-engine/timer';
import type { Attempt, AttemptResults, ComponentScore, ItemStats, Recommendation, SectionResult, SectionRun } from '../exam-engine/types';
import { cefrFor, interpolate, legacyEquivalent, roundToStep, rubricToBand, scoreItem } from './score';
import { SKILL_ADVICE } from './advice';

const emptyStats = (): ItemStats => ({ correct: 0, incorrect: 0, unanswered: 0, partial: 0, total: 0, earned: 0, max: 0 });

function add(stats: ItemStats, status: string, earned: number, max: number) {
  stats.total += 1;
  stats.earned += earned;
  stats.max += max;
  if (status === 'correct') stats.correct += 1;
  else if (status === 'incorrect') stats.incorrect += 1;
  else if (status === 'partial') stats.partial += 1;
  else if (status === 'unanswered') stats.unanswered += 1;
}

export const ratio = (s: ItemStats) => (s.max > 0 ? s.earned / s.max : 0);

const TASK_LABEL: Partial<Record<TaskType, string>> = {
  'build-sentence': 'Build a Sentence',
  email: 'Write an Email',
  'academic-discussion': 'Academic Discussion',
  'listen-repeat': 'Listen and Repeat',
  interview: 'Take an Interview',
};

/** Calcula las estadísticas y la banda estimada de una sección. */
export function computeSectionResult(attempt: Attempt, run: SectionRun, bank: QuestionBank, now: number): SectionResult {
  const spec = attempt.blueprint.scoring;
  const objective = emptyStats();
  const byTask: SectionResult['byTask'] = {};
  const bySkill: SectionResult['bySkill'] = {};
  const rubric: Partial<Record<TaskType, { sum: number; count: number; pending: number; sources: Set<string> }>> = {};
  let timeUsedMs = 0;
  let timeLimitMs: number | null = 0;
  let timeouts = 0;

  for (const mod of run.modules) {
    timeUsedMs += elapsedMs(mod.timer, now);
    timeLimitMs = mod.timer.limitMs == null || timeLimitMs == null ? null : timeLimitMs + mod.timer.limitMs;
    if (mod.endReason === 'timeout') timeouts += 1;
    for (const itemId of mod.itemIds) {
      const item = bank.itemById.get(itemId);
      const set = item && bank.setById.get(item.setId);
      if (!item || !set) continue;
      const score = scoreItem(item, set, attempt.responses[itemId], attempt.ratings[itemId]);
      if (item.objective) {
        add(objective, score.status, score.earned, score.max);
        add((byTask[item.task] ??= emptyStats()), score.status, score.earned, score.max);
        add((bySkill[item.skill] ??= emptyStats()), score.status, score.earned, score.max);
      } else {
        const r = (rubric[item.task] ??= { sum: 0, count: 0, pending: 0, sources: new Set() });
        const rating = attempt.ratings[itemId];
        if (rating) {
          r.sum += score.earned;
          r.count += 1;
          r.sources.add(rating.source);
        } else r.pending += 1;
      }
    }
  }

  const base = { id: run.id, objective, byTask, bySkill, timeUsedMs, timeLimitMs, timeouts, route: run.route };

  if (run.status === 'skipped') {
    return { ...base, status: 'skipped', band: null, bandBasis: run.skipReason ?? 'Sección omitida.', components: [] };
  }

  if (run.id === 'reading' || run.id === 'listening') {
    if (objective.max === 0) return { ...base, status: 'pending', band: null, bandBasis: 'Sin ítems puntuables.', components: [] };
    const curve = run.route ? spec.curves[run.route] : spec.curves.linear;
    const band = roundToStep(interpolate(curve, ratio(objective)), spec);
    const basis = run.route
      ? `Proporción de aciertos ${(ratio(objective) * 100).toFixed(0)} % en la ruta ${run.route === 'upper' ? 'superior' : 'inferior'} del módulo adaptativo.`
      : `Proporción de aciertos ${(ratio(objective) * 100).toFixed(0)} % (sin ruta adaptativa).`;
    return { ...base, status: 'scored', band, bandBasis: basis, components: [] };
  }

  // Writing / Speaking: combinación ponderada de componentes.
  const weights: Partial<Record<TaskType, number>> = run.id === 'writing' ? spec.writingWeights : spec.speakingWeights;
  const components: ComponentScore[] = [];
  for (const [task, weight] of Object.entries(weights) as [TaskType, number][]) {
    if (task === 'build-sentence') {
      const st = byTask['build-sentence'];
      if (!st) continue;
      components.push({
        task, label: TASK_LABEL[task] ?? task, weight, basis: 'objective',
        band: roundToStep(interpolate(spec.curves.linear, ratio(st)), spec),
        detail: `${st.correct}/${st.total} frases correctas`,
      });
      continue;
    }
    const r = rubric[task];
    if (!r) continue;
    if (r.pending > 0 || r.count === 0) {
      components.push({ task, label: TASK_LABEL[task] ?? task, weight, basis: 'pending', band: null, detail: `${r.pending} respuesta(s) sin valorar` });
    } else {
      const mean = r.sum / r.count;
      const basis = r.sources.size > 1 ? 'mixed' : ([...r.sources][0] as ComponentScore['basis']);
      components.push({ task, label: TASK_LABEL[task] ?? task, weight, basis, band: rubricToBand(mean), detail: `Media de rúbrica ${mean.toFixed(1)}/5 (${r.count} respuesta/s)` });
    }
  }

  const pending = components.filter((c) => c.band == null);
  if (components.length === 0) return { ...base, status: 'pending', band: null, bandBasis: 'Sin componentes puntuables.', components };
  if (pending.length > 0) {
    return { ...base, status: 'pending', band: null, bandBasis: `Pendiente: valora ${pending.map((c) => c.label).join(', ')} con la rúbrica.`, components };
  }
  const totalW = components.reduce((s, c) => s + c.weight, 0);
  const mean = components.reduce((s, c) => s + (c.band ?? 0) * c.weight, 0) / totalW;
  return {
    ...base,
    status: 'scored',
    band: roundToStep(mean, spec),
    bandBasis: `Media ponderada de ${components.map((c) => `${c.label} (${Math.round((c.weight / totalW) * 100)} %)`).join(', ')}.`,
    components,
  };
}

/** Resultados completos de un intento (se recalculan cuando cambian las valoraciones). */
export function computeResults(attempt: Attempt, bank: QuestionBank, now: number): AttemptResults {
  const spec = attempt.blueprint.scoring;
  const sections = attempt.sections.map((run) => computeSectionResult(attempt, run, bank, now));

  const scored = sections.filter((s) => s.band != null);
  const overallComplete = attempt.config.kind === 'full' && sections.length === 4 && scored.length === 4;
  const overallBand = overallComplete ? roundToStep(scored.reduce((s, x) => s + (x.band ?? 0), 0) / scored.length, spec) : null;

  const skillTotals = new Map<Skill, ItemStats>();
  for (const s of sections) {
    for (const [skill, st] of Object.entries(s.bySkill) as [Skill, ItemStats][]) {
      const acc = skillTotals.get(skill) ?? emptyStats();
      acc.correct += st.correct; acc.incorrect += st.incorrect; acc.unanswered += st.unanswered; acc.partial += st.partial;
      acc.total += st.total; acc.earned += st.earned; acc.max += st.max;
      skillTotals.set(skill, acc);
    }
  }
  const skillList = [...skillTotals.entries()].map(([skill, st]) => ({ skill, pct: ratio(st), total: st.total }));
  const strengths = skillList.filter((s) => s.total >= 2 && s.pct >= 0.8).sort((a, b) => b.pct - a.pct);
  const weaknesses = skillList.filter((s) => s.total >= 2 && s.pct <= 0.5).sort((a, b) => a.pct - b.pct);

  return {
    computedAt: now,
    sections,
    overallBand,
    overallComplete,
    cefr: cefrFor(overallBand, spec),
    legacy: legacyEquivalent(overallBand, spec),
    strengths,
    weaknesses,
    recommendations: buildRecommendations(sections, weaknesses),
  };
}

function buildRecommendations(sections: SectionResult[], weaknesses: { skill: Skill }[]): Recommendation[] {
  const recs: Recommendation[] = [];
  for (const w of weaknesses.slice(0, 4)) {
    const advice = SKILL_ADVICE[w.skill];
    if (advice) recs.push(advice);
  }
  for (const s of sections) {
    if (s.timeouts > 0 && s.objective.unanswered > 0) {
      recs.push({
        section: s.id,
        title: `Gestión del tiempo en ${sectionName(s.id)}`,
        detail: `Se agotó el tiempo con ${s.objective.unanswered} pregunta(s) sin responder. Responde primero lo que sepas, marca las dudosas y vuelve a ellas; nunca dejes respuestas en blanco (no hay penalización por error).`,
      });
    }
    const pending = s.components.filter((c) => c.basis === 'pending');
    if (pending.length) {
      recs.push({
        section: s.id,
        title: `Valora tus respuestas de ${sectionName(s.id)}`,
        detail: `Pendiente: ${pending.map((c) => c.label).join(', ')}. Usa la autoevaluación, el análisis local o la IA (si está configurada) en "Valoración de Writing y Speaking" para obtener la banda de esta sección.`,
      });
    }
    for (const c of s.components) {
      if (c.basis === 'pending') continue;
      else if (c.band != null && c.band < 4) {
        const advice = c.task === 'interview' ? SKILL_ADVICE['interview-response'] : c.task === 'listen-repeat' ? SKILL_ADVICE.repeat : c.task === 'email' ? SKILL_ADVICE['email-writing'] : c.task === 'academic-discussion' ? SKILL_ADVICE['discussion-writing'] : c.task === 'build-sentence' ? SKILL_ADVICE['sentence-construction'] : undefined;
        if (advice && !recs.includes(advice)) recs.push(advice);
      }
    }
  }
  return recs.slice(0, 7);
}

export function sectionName(id: SectionId): string {
  return { reading: 'Reading', listening: 'Listening', writing: 'Writing', speaking: 'Speaking' }[id];
}
