/**
 * Evaluación orientativa SIN IA, basada en reglas explícitas sobre:
 * - métricas acústicas reales (pausas, tiempo de habla) calculadas localmente;
 * - la transcripción del proveedor (si existe) y sus métricas;
 * - la alineación con la frase de referencia (Listen and Repeat).
 * Nunca puntúa la pronunciación: no hay datos fonéticos para hacerlo.
 */
import type { AcousticMetrics, CriterionAssessment, PronunciationAssessment, SpeakingEvaluation, Transcript, TranscriptMetrics } from '@shared/speaking-types';
import { grammarFlags, tokenize } from '../writing/analysis';
import type { AlignmentOp } from './transcript-analysis';

export interface HeuristicInput {
  task: 'listen-repeat' | 'interview' | 'independent-speaking';
  prompt: string;
  responseSec: number;
  acoustic: AcousticMetrics | null;
  transcript: Transcript | null;
  metrics: TranscriptMetrics | null;
  alignment: { accuracy: number; ops: AlignmentOp[] } | null;
  pronunciation: PronunciationAssessment | null;
}

const half = (v: number) => Math.round(Math.max(0, Math.min(4, v)) * 2) / 2;
const STOP = new Set(['what', 'which', 'your', 'you', 'that', 'this', 'with', 'would', 'should', 'there', 'their', 'about', 'please', 'explain', 'think', 'some', 'others', 'while', 'other', 'most', 'often', 'when', 'have', 'does', 'from', 'into', 'more', 'than', 'they', 'them', 'were', 'will', 'could', 'like', 'make', 'many', 'much', 'very', 'also', 'just', 'why', 'not', 'and', 'the', 'for', 'are']);

export function heuristicEvaluation(input: HeuristicInput): SpeakingEvaluation {
  const { acoustic: a, transcript: t, metrics: m } = input;
  const isRepeat = input.task === 'listen-repeat';
  const criteria: CriterionAssessment[] = [];
  const strengths: string[] = [];
  const issues: SpeakingEvaluation['issues'] = [];
  const exercises: string[] = [];
  const limitations: string[] = [
    'Evaluación heurística basada en reglas transparentes; no es una puntuación oficial ni sustituye a un evaluador humano.',
    input.pronunciation ? 'La pronunciación se basa en el servicio fonético configurado.' : 'No se evaluó la pronunciación: no hay un servicio de evaluación fonética configurado.',
  ];

  // ---- Delivery ----
  if (a && !a.quality.mostlySilent) {
    let s = 4;
    const ev: CriterionAssessment['evidence'] = [];
    const span = a.runs.length ? a.runs[a.runs.length - 1]![1] - a.runs[0]![0] : 0;
    const longPerMin = span > 0 ? a.longPauseCount / (span / 60) : 0;
    ev.push({ quote: `longPauseCount = ${a.longPauseCount}; longestPauseSec = ${a.longestPauseSec}`, source: 'audio-metrics' });
    ev.push({ quote: `phonationRatio = ${a.phonationRatio}`, source: 'audio-metrics' });
    if (longPerMin > 4) s -= 1.5;
    else if (longPerMin > 2) s -= 1;
    if (a.phonationRatio < 0.5) s -= 1;
    else if (a.phonationRatio < 0.65) s -= 0.5;
    if (!isRepeat && a.leadingSilenceSec > 3) {
      s -= 0.5;
      ev.push({ quote: `leadingSilenceSec = ${a.leadingSilenceSec}`, source: 'audio-metrics' });
    }
    if (m?.wordsPerMinute != null) {
      ev.push({ quote: `wordsPerMinute = ${m.wordsPerMinute}`, source: 'audio-metrics' });
      if (m.wordsPerMinute < 80) s -= 1.5;
      else if (m.wordsPerMinute < 100) s -= 0.5;
      else if (m.wordsPerMinute > 190) s -= 0.5;
      else strengths.push(`Ritmo de habla adecuado (${m.wordsPerMinute} palabras por minuto).`);
    }
    if (m && m.wordCount > 0) {
      const per100 = (m.fillerCount / m.wordCount) * 100;
      if (per100 > 8) s -= 1;
      else if (per100 > 4) s -= 0.5;
      if (m.fillerCount) ev.push({ quote: `fillerCount = ${m.fillerCount}`, source: 'audio-metrics' });
    }
    if (input.pronunciation?.fluency != null) {
      ev.push({ quote: `pronunciationAssessment.fluency = ${input.pronunciation.fluency}`, source: 'audio-metrics' });
      if (input.pronunciation.fluency < 60) s -= 0.5;
    }
    if (a.longPauseCount === 0 && a.phonationRatio >= 0.7) strengths.push('Habla continua, sin pausas largas.');
    criteria.push({
      criterion: 'delivery',
      evaluable: true,
      score: half(s),
      rationale: `Basado en pausas largas (${a.longPauseCount}), proporción de tiempo hablando (${Math.round(a.phonationRatio * 100)} %)${m?.wordsPerMinute != null ? `, ritmo (${m.wordsPerMinute} ppm)` : ''}${m ? ` y muletillas detectadas (${m.fillerCount})` : ''}. ${m ? '' : 'Sin transcripción no se puede medir el ritmo en palabras por minuto.'}`.trim(),
      evidence: ev,
    });
    if (a.longPauseCount > 1) exercises.push('Practica respuestas de 45 s con la estructura respuesta → razón → ejemplo para reducir pausas largas; graba y compara el número de pausas.');
  } else {
    criteria.push({ criterion: 'delivery', evaluable: false, score: null, rationale: a ? 'La grabación apenas contiene voz detectable.' : 'No se pudo analizar el audio.', evidence: [] });
  }

  // ---- Language use ----
  if (isRepeat) {
    criteria.push({ criterion: 'languageUse', evaluable: false, score: null, rationale: 'No aplica en Listen and Repeat: se evalúa la reproducción exacta de la frase.', evidence: [] });
    criteria.push({ criterion: 'topicDevelopment', evaluable: false, score: null, rationale: 'No aplica en Listen and Repeat.', evidence: [] });
  } else if (t && m && m.wordCount >= 10) {
    const flags = grammarFlags(t.text).filter((f) => !['sentence-capital', 'missing-space', 'pronoun-i'].includes(f.rule));
    const per100 = (flags.length / m.wordCount) * 100;
    let s = 4;
    if (per100 > 3) s -= 1.5;
    else if (per100 > 1.5) s -= 1;
    else if (per100 > 0) s -= 0.5;
    if (m.uniqueWordRatio < 0.55) s -= 1;
    else if (m.uniqueWordRatio < 0.65) s -= 0.5;
    const evidence: CriterionAssessment['evidence'] = flags.slice(0, 3).map((f) => ({ quote: f.excerpt.replace(/…/g, '').trim(), source: 'transcript' as const }));
    evidence.push({ quote: `uniqueWordRatio (MATTR) = ${m.uniqueWordRatio}`, source: 'audio-metrics' });
    for (const f of flags.slice(0, 5)) issues.push({ quote: f.excerpt.replace(/…/g, '').trim(), problem: f.message, suggestion: 'Revisa esta construcción.', kind: 'grammar' });
    criteria.push({
      criterion: 'languageUse',
      evaluable: true,
      score: half(s),
      rationale: `${flags.length} posible(s) error(es) detectado(s) por reglas y diversidad léxica ${m.uniqueWordRatio}. El reconocimiento de voz puede corregir u ocultar errores, por lo que esta estimación es limitada.`,
      evidence,
    });
    limitations.push('La transcripción automática puede normalizar la gramática; los errores reales pueden estar infrarrepresentados.');
  } else {
    criteria.push({ criterion: 'languageUse', evaluable: false, score: null, rationale: t ? 'La transcripción es demasiado breve.' : 'Sin transcripción no se puede evaluar gramática ni vocabulario.', evidence: [] });
  }

  // ---- Topic development ----
  if (!isRepeat) {
    if (t && m) {
      const expected = input.responseSec * 2;
      const ratio = m.wordCount / expected;
      let s = ratio < 0.35 ? 1 : ratio < 0.55 ? 2 : ratio < 0.75 ? 3 : 3.5;
      const connectors = (t.text.toLowerCase().match(/\b(because|for example|for instance|first|second|also|however|so|that's why|in addition|finally|on the other hand)\b/g) ?? []);
      if (new Set(connectors).size >= 2) s += 0.5;
      const sentence = t.text.split(/(?<=[.!?])\s+/).find((x) => /because|for example|for instance/i.test(x));
      const evidence: CriterionAssessment['evidence'] = [{ quote: `wordCount = ${m.wordCount} (≈${expected} esperado en ${input.responseSec} s)`, source: 'audio-metrics' }];
      if (sentence) evidence.push({ quote: sentence.trim(), source: 'transcript' });
      criteria.push({
        criterion: 'topicDevelopment',
        evaluable: true,
        score: half(s),
        rationale: `${m.wordCount} palabras y ${new Set(connectors).size} conector(es) distinto(s) (${[...new Set(connectors)].join(', ') || 'ninguno'}).`,
        evidence,
      });
      if (ratio < 0.55) exercises.push('Amplía tus respuestas: añade una razón concreta y un ejemplo personal hasta usar casi todo el tiempo.');
      if (new Set(connectors).size >= 2) strengths.push('Usa conectores para organizar las ideas.');
    } else {
      criteria.push({ criterion: 'topicDevelopment', evaluable: false, score: null, rationale: 'Sin transcripción no se puede valorar el desarrollo de ideas.', evidence: [] });
    }
  }

  // ---- Task fulfillment ----
  if (isRepeat) {
    if (input.alignment && t) {
      const acc = input.alignment.accuracy;
      const errs = input.alignment.ops.filter((o) => o.type !== 'ok');
      criteria.push({
        criterion: 'taskFulfillment',
        evaluable: true,
        score: half(acc * 4),
        rationale: `Precisión de la repetición ${Math.round(acc * 100)} % (${errs.length} diferencia(s) con la frase de referencia). Algunas diferencias pueden deberse al reconocimiento automático.`,
        evidence: [{ quote: t.text, source: 'transcript' }],
      });
      for (const o of errs.slice(0, 5)) {
        issues.push({
          quote: o.hyp ?? o.ref ?? '',
          problem: o.type === 'del' ? `Falta la palabra "${o.ref}".` : o.type === 'ins' ? `Palabra añadida: "${o.hyp}".` : `"${o.hyp}" en lugar de "${o.ref}".`,
          suggestion: 'Escucha de nuevo y repite la frase completa imitando el ritmo.',
          kind: o.type === 'sub' ? 'recognition' : 'task',
        });
      }
      if (acc >= 0.95) strengths.push('Repetición prácticamente exacta de la frase.');
      else exercises.push('Shadowing: reproduce la frase en fragmentos (2–4 palabras) y luego completa.');
    } else {
      criteria.push({ criterion: 'taskFulfillment', evaluable: false, score: null, rationale: 'Sin transcripción no se puede comparar con la frase de referencia. Usa la autoevaluación.', evidence: [] });
    }
  } else if (t && m) {
    const qWords = new Set(tokenize(input.prompt).filter((w) => w.length > 3 && !STOP.has(w)));
    const tWords = new Set(tokenize(t.text));
    const overlap = [...qWords].filter((w) => tWords.has(w) || tWords.has(w.replace(/s$/, '')));
    let s = overlap.length >= 2 ? 3.5 : overlap.length === 1 ? 3 : 2;
    const used = a && a.runs.length ? (a.runs[a.runs.length - 1]![1] - a.runs[0]![0]) / input.responseSec : 0;
    if (used >= 0.6) s += 0.5;
    criteria.push({
      criterion: 'taskFulfillment',
      evaluable: true,
      score: half(s),
      rationale: `Coincidencia con términos clave de la pregunta: ${overlap.join(', ') || 'ninguna'}; uso del tiempo disponible: ${Math.round(used * 100)} %. Es una aproximación por palabras clave.`,
      evidence: [{ quote: `keywordOverlap = ${overlap.length}; timeUsed = ${Math.round(used * 100)}%`, source: 'audio-metrics' }],
    });
    if (used < 0.6) exercises.push('Usa al menos 35–40 de los 45 segundos: prepara mentalmente una razón adicional antes de terminar.');
  } else {
    criteria.push({ criterion: 'taskFulfillment', evaluable: false, score: null, rationale: 'Sin transcripción no se puede comprobar si respondiste a la pregunta. Usa la autoevaluación.', evidence: [] });
  }

  for (const w of m?.lowConfidenceWords.slice(0, 5) ?? []) {
    issues.push({ quote: w.word, problem: `Baja confianza del reconocimiento (${Math.round(w.confidence * 100)} %).`, suggestion: 'Puede ser un error del reconocedor o una palabra poco clara: escucha ese fragmento.', kind: 'recognition' });
  }

  const pronunciationAdvice: string[] = [];
  if (input.pronunciation) {
    for (const w of input.pronunciation.words.filter((x) => x.accuracy != null && x.accuracy < 60).slice(0, 6)) {
      pronunciationAdvice.push(`"${w.word}": precisión ${w.accuracy}/100${w.errorType !== 'None' ? ` (${w.errorType})` : ''}. Escucha un modelo y repítela despacio.`);
    }
  } else {
    pronunciationAdvice.push('Sin evaluación fonética configurada: compara tu grabación con el audio modelo y presta atención a las sílabas acentuadas.');
  }
  if (a?.quality.tooQuiet) limitations.push('El nivel de grabación es bajo; acércate al micrófono para mejorar el análisis.');
  if (a?.quality.clipping) limitations.push('Se detectó saturación en la grabación; aléjate un poco del micrófono.');
  if (a?.quality.noisy) limitations.push('Hay bastante ruido de fondo; las pausas detectadas pueden ser menos precisas.');

  const scored = criteria.filter((c) => c.score !== null);
  const overall = scored.length ? half(scored.reduce((s, c) => s + (c.score ?? 0), 0) / scored.length) : null;
  return {
    provider: 'local',
    model: 'heuristic-v1',
    mode: 'heuristic',
    overall,
    overall5: overall == null ? null : Math.round((overall / 4) * 5 * 2) / 2,
    criteria,
    strengths,
    issues,
    improvedResponse: null,
    exercises: exercises.length ? exercises : ['Repite la tarea centrándote en el criterio con menor puntuación.'],
    pronunciationAdvice,
    limitations,
    droppedEvidence: 0,
    createdAt: Date.now(),
  };
}
