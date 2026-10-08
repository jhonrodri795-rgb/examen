import { clozeGaps, itemsOfSet, choiceQuestions } from './items';
import { DIFFICULTIES, TASK_SECTION, type ContentSet, type TaskType } from './types';

export interface ValidationIssue {
  setId: string;
  message: string;
}

const TOPICS = new Set([
  'biology', 'history', 'geology', 'engineering', 'environment', 'psychology', 'economics', 'sociology', 'art',
  'technology', 'astronomy', 'linguistics', 'campus-life', 'daily-life',
]);

const SKILLS = new Set([
  'main-idea', 'detail', 'vocabulary', 'inference', 'purpose', 'paragraph-relation', 'organization', 'negative-factual',
  'reference', 'multi-select', 'word-completion', 'pragmatics', 'function', 'attitude', 'sentence-construction',
  'email-writing', 'discussion-writing', 'repeat', 'interview-response', 'opinion-speaking',
]);

const isNonEmptyString = (v: unknown): v is string => typeof v === 'string' && v.trim().length > 0;

/**
 * Valida un conjunto de sets: estructura, campos obligatorios, índices de
 * respuesta e identificadores únicos (de sets e ítems).
 * Se usa en las pruebas del banco integrado y al importar packs JSON.
 */
export function validateSets(sets: unknown[], existingIds: Set<string> = new Set()): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const seen = new Set(existingIds);

  for (const raw of sets) {
    const set = raw as Partial<ContentSet> & Record<string, unknown>;
    const setId = typeof set?.id === 'string' ? set.id : '(sin id)';
    const fail = (message: string) => issues.push({ setId, message });

    if (!set || typeof set !== 'object') {
      fail('El set no es un objeto.');
      continue;
    }
    if (!isNonEmptyString(set.id)) fail('Falta "id".');
    if (!isNonEmptyString(set.title)) fail('Falta "title".');
    const task = set.task as TaskType | undefined;
    if (!task || !(task in TASK_SECTION)) {
      fail(`Tipo de tarea desconocido: ${String(set.task)}`);
      continue;
    }
    if (set.section !== TASK_SECTION[task]) fail(`La sección "${String(set.section)}" no corresponde a la tarea "${task}".`);
    if (!DIFFICULTIES.includes(set.difficulty as never)) fail(`Dificultad inválida: ${String(set.difficulty)}`);
    if (!TOPICS.has(set.topic as string)) fail(`Tema inválido: ${String(set.topic)}`);

    if (seen.has(setId)) fail(`Identificador de set duplicado: ${setId}`);
    seen.add(setId);

    try {
      validateTaskSpecific(set as ContentSet, fail);
    } catch (e) {
      fail(`Estructura inválida: ${(e as Error).message}`);
      continue;
    }

    try {
      for (const item of itemsOfSet(set as ContentSet)) {
        if (item.id !== setId) {
          if (seen.has(item.id)) fail(`Identificador de ítem duplicado: ${item.id}`);
          seen.add(item.id);
        }
      }
    } catch (e) {
      fail(`No se pudieron derivar los ítems: ${(e as Error).message}`);
    }
  }
  return issues;
}

function validateTaskSpecific(set: ContentSet, fail: (m: string) => void) {
  for (const q of choiceQuestions(set)) {
    if (!isNonEmptyString(q.id)) fail('Pregunta sin id.');
    if (!isNonEmptyString(q.prompt)) fail(`Pregunta ${q.id}: falta el enunciado.`);
    if (!SKILLS.has(q.skill)) fail(`Pregunta ${q.id}: habilidad desconocida "${q.skill}".`);
    if (!Array.isArray(q.options) || q.options.length < 2) fail(`Pregunta ${q.id}: necesita al menos 2 opciones.`);
    if (!Array.isArray(q.answer) || q.answer.length === 0) fail(`Pregunta ${q.id}: falta la respuesta correcta.`);
    else {
      if (q.answer.some((a) => !Number.isInteger(a) || a < 0 || a >= q.options.length)) fail(`Pregunta ${q.id}: índice de respuesta fuera de rango.`);
      if (new Set(q.answer).size !== q.answer.length) fail(`Pregunta ${q.id}: respuestas duplicadas.`);
      if (q.kind === 'single' && q.answer.length !== 1) fail(`Pregunta ${q.id}: "single" debe tener exactamente una respuesta.`);
      if (q.kind === 'multiple' && q.answer.length < 2) fail(`Pregunta ${q.id}: "multiple" debe tener al menos dos respuestas.`);
    }
    if (!isNonEmptyString(q.explanation)) fail(`Pregunta ${q.id}: falta la explicación.`);
    if (q.paragraph !== undefined && set.task === 'academic-passage' && (q.paragraph < 0 || q.paragraph >= set.paragraphs.length)) {
      fail(`Pregunta ${q.id}: párrafo de referencia inexistente.`);
    }
    if (q.highlight && set.task === 'academic-passage') {
      const text = q.paragraph !== undefined ? set.paragraphs[q.paragraph] : set.paragraphs.join(' ');
      if (!text?.includes(q.highlight)) fail(`Pregunta ${q.id}: el texto resaltado "${q.highlight}" no aparece en el pasaje.`);
    }
  }

  switch (set.task) {
    case 'complete-words': {
      const gaps = clozeGaps(set.text);
      if (gaps.length === 0) fail('Complete the Words sin huecos ({{prefijo|resto}}).');
      if (gaps.some((g) => !g.missing.trim())) fail('Hueco sin letras que completar.');
      break;
    }
    case 'daily-life':
      if (!isNonEmptyString(set.text)) fail('Falta el texto.');
      if (!set.questions?.length) fail('Sin preguntas.');
      break;
    case 'academic-passage':
      if (!Array.isArray(set.paragraphs) || set.paragraphs.length === 0) fail('Faltan párrafos.');
      if (!set.questions?.length) fail('Sin preguntas.');
      break;
    case 'choose-response':
    case 'conversation':
    case 'announcement':
    case 'academic-talk':
      if (!Array.isArray(set.script) || set.script.length === 0) fail('Falta el guion de audio.');
      if (set.script?.some((l) => !isNonEmptyString(l.text))) fail('Línea de guion vacía.');
      if (!set.questions?.length) fail('Sin preguntas.');
      break;
    case 'build-sentence':
      if (!Array.isArray(set.chunks) || set.chunks.length < 3) fail('Build a Sentence necesita al menos 3 fragmentos.');
      if (!isNonEmptyString(set.explanation)) fail('Falta la explicación.');
      if (set.acceptedOrders?.some((o) => [...o].sort().join('|') !== [...set.chunks].sort().join('|'))) {
        fail('Una ordenación alternativa no usa exactamente los mismos fragmentos.');
      }
      break;
    case 'email':
      if (!set.bulletPoints?.length) fail('El correo necesita puntos a cubrir.');
      if (!isNonEmptyString(set.sampleResponse)) fail('Falta la respuesta modelo.');
      break;
    case 'academic-discussion':
      if (!set.posts?.length) fail('La discusión necesita aportaciones de estudiantes.');
      if (!isNonEmptyString(set.sampleResponse)) fail('Falta la respuesta modelo.');
      break;
    case 'listen-repeat':
      if (!set.sentences?.length) fail('Listen and Repeat sin frases.');
      break;
    case 'interview':
      if (!set.questions?.length) fail('Entrevista sin preguntas.');
      break;
    case 'independent-speaking':
      if (!isNonEmptyString(set.prompt)) fail('Falta la consigna.');
      break;
  }
}
