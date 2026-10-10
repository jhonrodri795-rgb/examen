import { describe, expect, it } from 'vitest';
import { choiceQuestions, clozeGaps } from './items';
import { FORM_COUNT, FORM_REQUIREMENTS, formPrefix } from './forms';
import { validateSets } from './validate';
import type { ContentSet, TaskType } from './types';

/**
 * Validación de los formularios de simulación completa (data/forms/fNN/*.ts).
 * Con la variable de entorno FORM=n solo se carga y valida ese formulario
 * (lo usan los generadores de contenido): `FORM=7 npx vitest run src/modules/question-bank/forms.test.ts`.
 */
const formLoaders = import.meta.glob<{ sets: ContentSet[] }>('./data/forms/**/*.ts');
const baseModules = import.meta.glob<{ sets: ContentSet[] }>(['./data/**/*.ts', '!./data/forms/**'], { eager: true });
const baseSets = Object.values(baseModules).flatMap((m) => m.sets ?? []);
const ENV = (globalThis as unknown as { process?: { env: Record<string, string | undefined> } }).process?.env ?? {};
const ONLY = ENV.FORM ? Number(ENV.FORM) : null;

const words = (t: string) => t.trim().split(/\s+/).filter(Boolean).length;
const plain = (t: string) => t.replace(/\{\{([^|}]*)\|([^}]*)\}\}/g, '$1$2');

async function loadForm(n: number): Promise<ContentSet[]> {
  const dir = `./data/forms/${formPrefix(n).slice(0, -1)}/`;
  const paths = Object.keys(formLoaders).filter((p) => p.startsWith(dir)).sort();
  const out: ContentSet[] = [];
  for (const p of paths) out.push(...((await formLoaders[p]!()).sets ?? []));
  return out;
}

/** Problemas de un formulario, con mensajes accionables. */
export function checkForm(n: number, allSets: ContentSet[], otherIds: Set<string>, tasks?: string[]): string[] {
  const problems: string[] = [];
  const sets = tasks ? allSets.filter((s) => tasks.includes(s.task)) : allSets;
  const P = formPrefix(n);
  for (const i of validateSets(sets, otherIds)) problems.push(`[${i.setId}] ${i.message}`);

  // Recuento por tarea y dificultad.
  const count = new Map<string, number>();
  for (const s of sets) {
    const key = `${s.task}:${s.difficulty}`;
    count.set(key, (count.get(key) ?? 0) + 1);
    count.set(`${s.task}:any`, (count.get(`${s.task}:any`) ?? 0) + 1);
  }
  for (const [task, req] of Object.entries(FORM_REQUIREMENTS) as [TaskType, Record<string, number>][]) {
    if (tasks && !tasks.includes(task)) continue;
    for (const [d, want] of Object.entries(req)) {
      const got = count.get(`${task}:${d}`) ?? 0;
      if (got !== want) problems.push(`Recuento: ${task} ${d === 'any' ? '' : `(${d}) `}tiene ${got}, se requieren ${want}.`);
    }
  }
  for (const s of sets) if (!(s.task in FORM_REQUIREMENTS)) problems.push(`[${s.id}] La tarea ${s.task} no forma parte de los formularios.`);

  const singles = new Map<string, number[]>();
  const titles = new Set<string>();
  for (const s of sets) {
    const fail = (m: string) => problems.push(`[${s.id}] ${m}`);
    if (s.form !== n) fail(`"form" debe ser ${n}.`);
    if (!s.id.startsWith(P)) fail(`El id debe empezar por "${P}".`);
    if (titles.has(s.title)) fail(`Título repetido en el formulario: ${s.title}`);
    titles.add(s.title);
    for (const q of choiceQuestions(s)) {
      if (!q.id.startsWith(P)) fail(`La pregunta ${q.id} debe empezar por "${P}".`);
      if (q.options.length !== 4) fail(`La pregunta ${q.id} debe tener 4 opciones (tiene ${q.options.length}).`);
      if (new Set(q.options.map((o) => o.trim().toLowerCase())).size !== q.options.length) fail(`La pregunta ${q.id} tiene opciones repetidas.`);
      if (q.kind === 'single') singles.set(s.section, [...(singles.get(s.section) ?? []), q.answer[0]!]);
      if (!/[áéíóúñ¿¡]|\b(la|el|que|porque|respuesta|opción|texto)\b/i.test(q.explanation)) fail(`La explicación de ${q.id} debe estar en español.`);
    }
    switch (s.task) {
      case 'complete-words': {
        const gaps = clozeGaps(s.text);
        if (gaps.length < 8 || gaps.length > 12) fail(`Complete the Words necesita 8–12 huecos (tiene ${gaps.length}).`);
        const first = s.text.split(/(?<=[.!?])\s/)[0] ?? '';
        if (first.includes('{{')) fail('La primera frase debe quedar intacta (sin huecos).');
        const w = words(plain(s.text));
        if (w < 45 || w > 130) fail(`Texto de ${w} palabras (45–130).`);
        break;
      }
      case 'daily-life':
        if (s.questions.length < 2 || s.questions.length > 3) fail(`Read in Daily Life necesita 2–3 preguntas (tiene ${s.questions.length}).`);
        if (words(s.text) < 40) fail('Texto demasiado breve (mín. 40 palabras).');
        break;
      case 'academic-passage': {
        if (s.paragraphs.length < 3 || s.paragraphs.length > 5) fail(`Pasaje con ${s.paragraphs.length} párrafos (3–5).`);
        if (s.questions.length !== 5) fail(`El pasaje necesita 5 preguntas (tiene ${s.questions.length}).`);
        const w = words(s.paragraphs.join(' '));
        const [lo, hi] = s.difficulty === 'easy' ? [170, 330] : s.difficulty === 'medium' ? [210, 390] : [250, 460];
        if (w < lo || w > hi) fail(`Pasaje de ${w} palabras (${lo}–${hi} para ${s.difficulty}).`);
        break;
      }
      case 'choose-response':
        if (s.script.length !== 1) fail('Choose a Response lleva una sola línea de audio.');
        if (s.questions.length !== 1) fail('Choose a Response lleva una sola pregunta.');
        break;
      case 'conversation':
        if (s.script.length < 6 || s.script.length > 14) fail(`Conversación de ${s.script.length} turnos (6–14).`);
        if (s.questions.length !== 3) fail(`La conversación necesita 3 preguntas (tiene ${s.questions.length}).`);
        break;
      case 'announcement':
        if (s.script.length < 1 || s.script.length > 3) fail(`Anuncio de ${s.script.length} líneas (1–3).`);
        if (s.questions.length < 2 || s.questions.length > 3) fail(`El anuncio necesita 2–3 preguntas (tiene ${s.questions.length}).`);
        break;
      case 'academic-talk':
        if (s.script.length < 3 || s.script.length > 8) fail(`Clase de ${s.script.length} líneas (3–8).`);
        if (s.questions.length !== 4) fail(`La clase necesita 4 preguntas (tiene ${s.questions.length}).`);
        if (words(s.script.map((l) => l.text).join(' ')) < 180) fail('Clase demasiado breve (mín. 180 palabras).');
        break;
      case 'build-sentence':
        if (s.chunks.length < 4 || s.chunks.length > 8) fail(`Build a Sentence con ${s.chunks.length} fragmentos (4–8).`);
        if (new Set(s.chunks).size !== s.chunks.length) fail('Fragmentos repetidos: usa acceptedOrders o fragmentos distintos.');
        if (s.distractors?.some((d) => s.chunks.includes(d))) fail('Un distractor coincide con un fragmento.');
        break;
      case 'email':
        if (s.bulletPoints.length !== 3) fail('El correo necesita 3 puntos.');
        if (s.timeLimitSec !== 420) fail('timeLimitSec del correo debe ser 420.');
        if (words(s.sampleResponse) < 90 || words(s.sampleResponse) > 180) fail(`Respuesta modelo de ${words(s.sampleResponse)} palabras (90–180).`);
        break;
      case 'academic-discussion':
        if (s.posts.length !== 2) fail('La discusión necesita 2 aportaciones de estudiantes.');
        if (s.timeLimitSec !== 600) fail('timeLimitSec de la discusión debe ser 600.');
        if (words(s.sampleResponse) < 100 || words(s.sampleResponse) > 180) fail(`Respuesta modelo de ${words(s.sampleResponse)} palabras (100–180).`);
        break;
      case 'listen-repeat': {
        if (s.sentences.length !== 7) fail(`Listen and Repeat necesita 7 frases (tiene ${s.sentences.length}).`);
        const lens = s.sentences.map((x) => words(x.text));
        if (lens[0]! > 8 || lens[lens.length - 1]! < 11) fail(`Las frases deben ir de cortas (≤ 8 palabras) a largas (≥ 11): ${lens.join(', ')}.`);
        for (const x of s.sentences) {
          if (!x.id.startsWith(P)) fail(`La frase ${x.id} debe empezar por "${P}".`);
          if (x.responseSec < 8 || x.responseSec > 15) fail(`responseSec de ${x.id} fuera de 8–15.`);
        }
        break;
      }
      case 'interview':
        if (s.questions.length !== 4) fail(`La entrevista necesita 4 preguntas (tiene ${s.questions.length}).`);
        for (const q of s.questions) {
          if (!q.id.startsWith(P)) fail(`La pregunta ${q.id} debe empezar por "${P}".`);
          if (q.responseSec !== 45 || q.prepSec !== 0) fail(`La pregunta ${q.id} debe tener responseSec 45 y prepSec 0.`);
        }
        break;
    }
  }
  // Posición de la respuesta correcta repartida por sección (no siempre la misma letra).
  for (const [section, list] of singles) {
    if (list.length < 20) continue;
    for (let i = 0; i < 4; i++) {
      const share = list.filter((a) => a === i).length / list.length;
      if (share > 0.4) problems.push(`Reparto de respuestas (${section}): la opción ${'ABCD'[i]} es la correcta en el ${Math.round(share * 100)} % de las preguntas (máx. 40 %).`);
      if (share < 0.1) problems.push(`Reparto de respuestas (${section}): la opción ${'ABCD'[i]} es la correcta solo en el ${Math.round(share * 100)} % (mín. 10 %).`);
    }
  }
  return problems;
}

const FORM_SECTION_TASKS: Record<string, string[]> = {
  reading: ['complete-words', 'daily-life', 'academic-passage'],
  listening: ['choose-response', 'conversation', 'announcement', 'academic-talk'],
  writing: ['build-sentence', 'email', 'academic-discussion'],
  speaking: ['listen-repeat', 'interview'],
  'writing-speaking': ['build-sentence', 'email', 'academic-discussion', 'listen-repeat', 'interview'],
};

const baseIds = new Set<string>();
for (const s of baseSets) baseIds.add(s.id);

const forms = ONLY ? [ONLY] : Array.from({ length: FORM_COUNT }, (_, i) => i + 1);
const SECTION = ENV.SECTION ?? null;

describe('formularios de simulación completa', () => {
  it.each(forms)('formulario %i completo y válido', async (n) => {
    const sets = await loadForm(n);
    // Con FORM y SECTION se valida solo esa parte (cada generador escribe una sección).
    const tasks = ONLY && SECTION ? FORM_SECTION_TASKS[SECTION] : undefined;
    // Los ids del resto del formulario cuentan como existentes para detectar duplicados.
    const others = new Set(baseIds);
    if (tasks) for (const s of sets) if (!tasks.includes(s.task)) others.add(s.id);
    const problems = checkForm(n, sets, others, tasks);
    expect(problems, `Formulario ${n}${SECTION ? ` (${SECTION})` : ''}:\n${problems.join('\n')}`).toEqual([]);
  });

  if (!ONLY) {
    it('ids y títulos únicos entre formularios y con el banco general', async () => {
      const all = (await Promise.all(forms.map(loadForm))).flat();
      const ids = new Set(baseIds);
      const dupIds: string[] = [];
      for (const s of all) {
        if (ids.has(s.id)) dupIds.push(s.id);
        ids.add(s.id);
      }
      expect(dupIds).toEqual([]);
      const titles = new Map<string, string>();
      const dupTitles: string[] = [];
      for (const s of [...baseSets, ...all]) {
        if (s.task === 'choose-response' || s.task === 'build-sentence') continue;
        const k = `${s.task}:${s.title.toLowerCase()}`;
        if (titles.has(k)) dupTitles.push(`${s.title} (${titles.get(k)} / ${s.id})`);
        titles.set(k, s.id);
      }
      expect(dupTitles).toEqual([]);
    });
  }
});
