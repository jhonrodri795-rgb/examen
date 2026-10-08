import type { BankItem, ContentSet, ChoiceQuestion } from './types';

export interface Gap {
  index: number;
  prefix: string;
  missing: string;
  word: string;
}

export interface ClozeSegment {
  type: 'text' | 'gap';
  text: string;
  gap?: Gap;
}

const GAP_RE = /\{\{([^|}]*)\|([^}]+)\}\}/g;

/** Divide un texto de Complete the Words en segmentos de texto y huecos. */
export function parseCloze(text: string): ClozeSegment[] {
  const segments: ClozeSegment[] = [];
  let last = 0;
  let index = 0;
  for (const m of text.matchAll(GAP_RE)) {
    const start = m.index ?? 0;
    if (start > last) segments.push({ type: 'text', text: text.slice(last, start) });
    const prefix = m[1] ?? '';
    const missing = m[2] ?? '';
    segments.push({ type: 'gap', text: prefix, gap: { index, prefix, missing, word: prefix + missing } });
    index += 1;
    last = start + m[0].length;
  }
  if (last < text.length) segments.push({ type: 'text', text: text.slice(last) });
  return segments;
}

export function clozeGaps(text: string): Gap[] {
  return parseCloze(text).flatMap((s) => (s.gap ? [s.gap] : []));
}

export const gapItemId = (setId: string, index: number) => `${setId}-g${index + 1}`;

/** Preguntas de opción múltiple de un set (si las tiene). */
export function choiceQuestions(set: ContentSet): ChoiceQuestion[] {
  if ('questions' in set && Array.isArray(set.questions) && set.task !== 'interview') {
    return set.questions as ChoiceQuestion[];
  }
  return [];
}

/** Deriva los ítems puntuables de un set. */
export function itemsOfSet(set: ContentSet): BankItem[] {
  const base = { setId: set.id, section: set.section, task: set.task, topic: set.topic };
  switch (set.task) {
    case 'complete-words':
      return clozeGaps(set.text).map((g) => ({
        ...base,
        id: gapItemId(set.id, g.index),
        skill: 'word-completion',
        kind: 'gap',
        difficulty: set.difficulty,
        points: 1,
        objective: true,
      }));
    case 'daily-life':
    case 'academic-passage':
    case 'choose-response':
    case 'conversation':
    case 'announcement':
    case 'academic-talk':
      return set.questions.map((q) => ({
        ...base,
        id: q.id,
        skill: q.skill,
        kind: 'choice',
        difficulty: q.difficulty ?? set.difficulty,
        points: q.points ?? 1,
        objective: true,
      }));
    case 'build-sentence':
      return [{ ...base, id: set.id, skill: 'sentence-construction', kind: 'order', difficulty: set.difficulty, points: 1, objective: true }];
    case 'email':
      return [{ ...base, id: set.id, skill: 'email-writing', kind: 'essay', difficulty: set.difficulty, points: 5, objective: false }];
    case 'academic-discussion':
      return [{ ...base, id: set.id, skill: 'discussion-writing', kind: 'essay', difficulty: set.difficulty, points: 5, objective: false }];
    case 'listen-repeat':
      return set.sentences.map((s) => ({ ...base, id: s.id, skill: 'repeat', kind: 'speech', difficulty: set.difficulty, points: 5, objective: false }));
    case 'interview':
      return set.questions.map((q) => ({ ...base, id: q.id, skill: 'interview-response', kind: 'speech', difficulty: set.difficulty, points: 5, objective: false }));
    case 'independent-speaking':
      return [{ ...base, id: set.id, skill: 'opinion-speaking', kind: 'speech', difficulty: set.difficulty, points: 5, objective: false }];
  }
}

/** Busca el texto de una pregunta de opción múltiple por id. */
export function findChoiceQuestion(set: ContentSet, itemId: string): ChoiceQuestion | undefined {
  return choiceQuestions(set).find((q) => q.id === itemId);
}

/** Texto plano que representa un set (búsqueda en el banco). */
export function setSearchText(set: ContentSet): string {
  const parts: string[] = [set.title, set.topic, set.task];
  switch (set.task) {
    case 'complete-words':
      parts.push(set.text.replace(GAP_RE, '$1$2'));
      break;
    case 'daily-life':
      parts.push(set.text);
      break;
    case 'academic-passage':
      parts.push(...set.paragraphs);
      break;
    case 'choose-response':
    case 'conversation':
    case 'announcement':
    case 'academic-talk':
      parts.push(...set.script.map((l) => l.text));
      break;
    case 'build-sentence':
      parts.push(set.context.text, set.chunks.join(' '));
      break;
    case 'email':
      parts.push(set.scenario);
      break;
    case 'academic-discussion':
      parts.push(set.professorPrompt);
      break;
    case 'listen-repeat':
      parts.push(...set.sentences.map((s) => s.text));
      break;
    case 'interview':
      parts.push(...set.questions.map((q) => q.text));
      break;
    case 'independent-speaking':
      parts.push(set.prompt);
      break;
  }
  for (const q of choiceQuestions(set)) parts.push(q.prompt);
  return parts.join(' ').toLowerCase();
}
