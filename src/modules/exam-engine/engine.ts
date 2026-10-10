/**
 * Motor del examen: funciones puras que transforman un `Attempt`.
 * La interfaz llama a estas funciones y persiste el resultado; así la lógica
 * (navegación, rutas adaptativas, temporizadores, finalización) es testeable
 * sin navegador.
 */
import { hashString, newId } from '@/lib/random';
import { itemsOfSet } from '../question-bank/items';
import type { QuestionBank } from '../question-bank/registry';
import { SECTION_IDS, type ContentSet, type SectionId, type TaskType } from '../question-bank/types';
import { computeResults, ratio } from '../scoring/results';
import { scoreItem } from '../scoring/score';
import type { ExamBlueprint, ModuleSpec, SectionSpec } from './blueprint-types';
import { assembleParts, buildPages } from './assembly';
import { createTimer, isExpired, scaleLimit, startTimer, stopTimer } from './timer';
import type { Attempt, ExamConfig, ItemStats, ModuleRun, Page, Response, RubricRating, SectionRun } from './types';

const clone = <T,>(v: T): T => structuredClone(v);

/** Segundos orientativos por set para prácticas personalizadas cronometradas. */
const CUSTOM_SECONDS: Record<TaskType, (set: ContentSet) => number> = {
  'complete-words': () => 180,
  'daily-life': (s) => 75 * itemsOfSet(s).length,
  'academic-passage': (s) => 100 * itemsOfSet(s).length,
  'choose-response': () => 35,
  conversation: (s) => 90 + 35 * itemsOfSet(s).length,
  announcement: (s) => 70 + 35 * itemsOfSet(s).length,
  'academic-talk': (s) => 120 + 40 * itemsOfSet(s).length,
  'build-sentence': () => 36,
  email: () => 420,
  'academic-discussion': () => 600,
  'listen-repeat': () => 0,
  interview: () => 0,
  'independent-speaking': () => 0,
};

function sectionSpec(attempt: Attempt, id: SectionId): SectionSpec | undefined {
  return attempt.blueprint.sections.find((s) => s.id === id);
}

function makeModule(
  sectionId: SectionId,
  spec: ModuleSpec,
  setIds: string[],
  warnings: string[],
  bank: QuestionBank,
  config: ExamConfig,
  variant: 'upper' | 'lower' | null,
  limitOverrideSec?: number | null,
): ModuleRun {
  const { pages, itemIds } = buildPages(setIds, bank);
  const limitSec = limitOverrideSec !== undefined ? limitOverrideSec : spec.timeLimitSec;
  return {
    key: `${sectionId}.${spec.id}`,
    specId: spec.id,
    title: spec.title,
    variant,
    status: 'pending',
    setIds,
    pages,
    itemIds,
    timer: createTimer(scaleLimit(limitSec, config.timing)),
    warnings,
  };
}

/** Crea un intento nuevo y ensambla los módulos no adaptativos. */
export function createAttempt(
  config: ExamConfig,
  blueprint: ExamBlueprint,
  bank: QuestionBank,
  exposure: Record<string, number> = {},
  now = Date.now(),
): Attempt {
  const used = new Set<string>();
  const sections: SectionRun[] = [];

  if (config.kind === 'custom') {
    const chosen = (config.customSetIds ?? []).map((id) => bank.setById.get(id)).filter((s): s is ContentSet => !!s);
    for (const sectionId of SECTION_IDS) {
      const sets = chosen.filter((s) => s.section === sectionId);
      if (!sets.length) continue;
      const seconds = sets.reduce((sum, s) => sum + CUSTOM_SECONDS[s.task](s), 0);
      const spec: ModuleSpec = { id: 'custom', title: 'Práctica personalizada', timeLimitSec: seconds > 0 ? seconds : null };
      sections.push({
        id: sectionId,
        status: 'pending',
        modules: [makeModule(sectionId, spec, sets.map((s) => s.id), [], bank, config, null)],
      });
    }
  } else {
    for (const sectionId of config.sections) {
      const sSpec = blueprint.sections.find((s) => s.id === sectionId);
      if (!sSpec) continue;
      const modules: ModuleRun[] = [];
      for (const mSpec of sSpec.modules) {
        if (mSpec.adaptive) {
          modules.push({
            key: `${sectionId}.${mSpec.id}`,
            specId: mSpec.id,
            title: mSpec.title,
            variant: null,
            status: 'pending',
            setIds: [],
            pages: [],
            itemIds: [],
            timer: createTimer(scaleLimit(mSpec.timeLimitSec, config.timing)),
            warnings: [],
          });
          continue;
        }
        const { setIds, warnings } = assembleParts(mSpec.parts ?? [], bank, used, hashString(`${config.seed}:${sectionId}.${mSpec.id}`), exposure, config.form);
        modules.push(makeModule(sectionId, mSpec, setIds, warnings, bank, config, null));
      }
      sections.push({ id: sectionId, status: 'pending', modules });
    }
  }

  return {
    id: newId('att'),
    schemaVersion: 1,
    rev: 0,
    createdAt: now,
    updatedAt: now,
    status: 'in-progress',
    config,
    blueprint: clone(blueprint),
    sections,
    cursor: { section: 0, module: 0, page: 0, stage: sections.length ? 'section-intro' : 'finished' },
    responses: {},
    flags: {},
    checked: {},
    notes: {},
    plays: {},
    ratings: {},
    exposure,
    interrupted: false,
  };
}

// ---------- Acceso ----------

export function currentSection(a: Attempt): SectionRun | undefined {
  return a.sections[a.cursor.section];
}
export function currentModule(a: Attempt): ModuleRun | undefined {
  return currentSection(a)?.modules[a.cursor.module];
}
export function currentPage(a: Attempt): Page | undefined {
  return currentModule(a)?.pages[a.cursor.page];
}

/** Navegación efectiva del módulo actual según modo y sección. */
export function navigationMode(a: Attempt): 'free' | 'forward-only' {
  const section = currentSection(a);
  if (!section) return 'free';
  if (section.id === 'speaking') return 'forward-only';
  if (a.config.kind === 'custom') return 'free';
  const spec = sectionSpec(a, section.id);
  if (section.id === 'listening' && a.config.mode === 'practice' && a.config.relaxedListening) return 'free';
  return spec?.navigation ?? 'free';
}

/** Reproducciones permitidas para un audio (null = ilimitadas). */
export function maxPlays(a: Attempt): number | null {
  const section = currentSection(a);
  if (!section || section.id !== 'listening') return null;
  if (a.config.mode === 'practice' && a.config.relaxedListening) return null;
  return sectionSpec(a, 'listening')?.maxPlays ?? 1;
}

export function canGoTo(a: Attempt, pageIndex: number): boolean {
  const mod = currentModule(a);
  if (!mod || a.cursor.stage !== 'module' || mod.status !== 'active') return false;
  if (pageIndex < 0 || pageIndex >= mod.pages.length) return false;
  if (pageIndex === a.cursor.page) return true;
  if (navigationMode(a) === 'free') return true;
  return pageIndex === a.cursor.page + 1;
}

// ---------- Transiciones ----------

function touch(a: Attempt, now: number): Attempt {
  a.updatedAt = now;
  return a;
}

export function beginSection(attempt: Attempt, now: number): Attempt {
  const a = clone(attempt);
  const section = currentSection(a);
  if (!section || a.cursor.stage !== 'section-intro') return attempt;
  section.status = 'active';
  return beginModuleMut(a, now);
}

function beginModuleMut(a: Attempt, now: number): Attempt {
  const mod = currentModule(a);
  if (!mod) return a;
  mod.status = 'active';
  mod.timer = startTimer(mod.timer, now);
  a.cursor.page = 0;
  a.cursor.stage = 'module';
  return touch(a, now);
}

export function beginModule(attempt: Attempt, now: number): Attempt {
  if (attempt.cursor.stage !== 'module-intro') return attempt;
  return beginModuleMut(clone(attempt), now);
}

export function goToPage(attempt: Attempt, pageIndex: number, now: number): Attempt {
  if (!canGoTo(attempt, pageIndex) || pageIndex === attempt.cursor.page) return attempt;
  const a = clone(attempt);
  a.cursor.page = pageIndex;
  return touch(a, now);
}

/** ¿Se puede modificar la respuesta de un ítem ahora? */
export function canEdit(a: Attempt, itemId: string, now: number): boolean {
  const mod = currentModule(a);
  if (!mod || a.cursor.stage !== 'module' || mod.status !== 'active' || a.interrupted) return false;
  if (!mod.itemIds.includes(itemId)) return false;
  if (a.checked[itemId]) return false;
  if (isExpired(mod.timer, now)) return false;
  return true;
}

export function setResponse(attempt: Attempt, itemId: string, response: Response, now: number): Attempt {
  if (!canEdit(attempt, itemId, now)) return attempt;
  const a = clone(attempt);
  a.responses[itemId] = response;
  return touch(a, now);
}

export function toggleFlag(attempt: Attempt, itemId: string, now: number): Attempt {
  const a = clone(attempt);
  if (a.flags[itemId]) delete a.flags[itemId];
  else a.flags[itemId] = true;
  return touch(a, now);
}

/** Modo práctica: revela la solución del ítem y bloquea la respuesta. */
export function checkItem(attempt: Attempt, itemId: string, now: number): Attempt {
  if (attempt.config.mode !== 'practice' || !attempt.config.instantFeedback) return attempt;
  const a = clone(attempt);
  a.checked[itemId] = true;
  return touch(a, now);
}

export function setNotes(attempt: Attempt, key: string, text: string, now: number): Attempt {
  const a = clone(attempt);
  a.notes[key] = text;
  return touch(a, now);
}

export function registerPlay(attempt: Attempt, setId: string, now: number): Attempt {
  const a = clone(attempt);
  a.plays[setId] = (a.plays[setId] ?? 0) + 1;
  return touch(a, now);
}

/** Proporción de aciertos en un módulo (para el enrutamiento adaptativo). */
export function moduleScore(a: Attempt, mod: ModuleRun, bank: QuestionBank): ItemStats {
  const st: ItemStats = { correct: 0, incorrect: 0, unanswered: 0, partial: 0, total: 0, earned: 0, max: 0 };
  for (const id of mod.itemIds) {
    const item = bank.itemById.get(id);
    const set = item && bank.setById.get(item.setId);
    if (!item || !set || !item.objective) continue;
    const s = scoreItem(item, set, a.responses[id]);
    st.total += 1;
    st.earned += s.earned;
    st.max += s.max;
    if (s.status === 'correct') st.correct += 1;
  }
  return st;
}

/**
 * Finaliza el módulo actual (entrega o tiempo agotado). Si el siguiente
 * módulo es adaptativo, decide la ruta y ensambla su contenido.
 */
export function finishModule(attempt: Attempt, bank: QuestionBank, now: number, reason: 'submitted' | 'timeout' = 'submitted'): Attempt {
  const a = clone(attempt);
  const section = currentSection(a);
  const mod = currentModule(a);
  if (!section || !mod || mod.status !== 'active') return attempt;
  mod.timer = stopTimer(mod.timer, now);
  mod.status = 'done';
  mod.endReason = reason;

  const nextIndex = a.cursor.module + 1;
  const next = section.modules[nextIndex];
  if (next) {
    const sSpec = sectionSpec(a, section.id);
    const mSpec = sSpec?.modules.find((m) => m.id === next.specId);
    if (mSpec?.adaptive && next.setIds.length === 0) {
      const base = section.modules.find((m) => m.specId === mSpec.adaptive!.basedOn) ?? mod;
      const score = ratio(moduleScore(a, base, bank));
      const variant = score >= mSpec.adaptive.threshold ? 'upper' : 'lower';
      const used = new Set(a.sections.flatMap((s) => s.modules.flatMap((m) => m.setIds)));
      const { setIds, warnings } = assembleParts(
        mSpec.adaptive[variant],
        bank,
        used,
        hashString(`${a.config.seed}:${next.key}:${variant}`),
        a.exposure,
        a.config.form,
      );
      const built = makeModule(section.id, mSpec, setIds, warnings, bank, a.config, variant);
      section.modules[nextIndex] = { ...built, timer: next.timer };
      section.route = variant;
      section.routingScore = score;
    }
    a.cursor.module = nextIndex;
    a.cursor.page = 0;
    a.cursor.stage = 'module-intro';
  } else {
    section.status = 'done';
    a.cursor.stage = 'section-end';
  }
  return touch(a, now);
}

/** Omite la sección actual (p. ej. Speaking sin micrófono). */
export function skipSection(attempt: Attempt, reason: string, now: number): Attempt {
  const a = clone(attempt);
  const section = currentSection(a);
  if (!section) return attempt;
  for (const m of section.modules) {
    m.timer = stopTimer(m.timer, now);
    if (m.status !== 'done') {
      m.status = 'done';
      m.endReason = 'skipped';
    }
  }
  section.status = 'skipped';
  section.skipReason = reason;
  a.cursor.stage = 'section-end';
  return touch(a, now);
}

export function nextSection(attempt: Attempt, bank: QuestionBank, now: number): Attempt {
  if (attempt.cursor.stage !== 'section-end') return attempt;
  const a = clone(attempt);
  if (a.cursor.section + 1 < a.sections.length) {
    a.cursor = { section: a.cursor.section + 1, module: 0, page: 0, stage: 'section-intro' };
    return touch(a, now);
  }
  return finishAttemptMut(a, bank, now);
}

function finishAttemptMut(a: Attempt, bank: QuestionBank, now: number): Attempt {
  for (const s of a.sections) {
    for (const m of s.modules) {
      m.timer = stopTimer(m.timer, now);
      if (m.status === 'active') {
        m.status = 'done';
        m.endReason = m.endReason ?? 'submitted';
      }
    }
    if (s.status === 'active' || s.status === 'pending') s.status = s.status === 'pending' ? 'skipped' : 'done';
    if (s.status === 'skipped' && !s.skipReason) s.skipReason = 'Sección no realizada (examen entregado antes).';
  }
  a.cursor.stage = 'finished';
  a.status = 'completed';
  a.finishedAt = now;
  a.interrupted = false;
  a.results = computeResults(a, bank, now);
  return touch(a, now);
}

/** Entrega el examen completo (las secciones no iniciadas se marcan como omitidas). */
export function submitAttempt(attempt: Attempt, bank: QuestionBank, now: number): Attempt {
  if (attempt.status === 'completed') return attempt;
  return finishAttemptMut(clone(attempt), bank, now);
}

/**
 * Recuperación tras recarga/cierre: el tiempo transcurrido hasta el último
 * guardado se conserva y el temporizador queda en pausa hasta "Reanudar".
 */
export function recoverInterrupted(attempt: Attempt): Attempt {
  if (attempt.status !== 'in-progress') return attempt;
  const a = clone(attempt);
  let wasRunning = false;
  for (const s of a.sections) {
    for (const m of s.modules) {
      if (m.timer.startedAt != null) {
        wasRunning = true;
        m.timer = stopTimer(m.timer, Math.max(m.timer.startedAt, a.updatedAt));
      }
    }
  }
  a.interrupted = wasRunning || a.cursor.stage === 'module';
  return a;
}

/** Pausa explícita (solo modo práctica) o pausa por interrupción. */
export function pauseAttempt(attempt: Attempt, now: number): Attempt {
  const mod = currentModule(attempt);
  if (!mod || mod.timer.startedAt == null) return attempt;
  const a = clone(attempt);
  const m = currentModule(a)!;
  m.timer = stopTimer(m.timer, now);
  a.interrupted = true;
  return touch(a, now);
}

export function resumeAttempt(attempt: Attempt, now: number): Attempt {
  const a = clone(attempt);
  a.interrupted = false;
  const mod = currentModule(a);
  if (mod && mod.status === 'active' && a.cursor.stage === 'module') mod.timer = startTimer(mod.timer, now);
  return touch(a, now);
}

/** Registra una valoración de rúbrica y recalcula resultados si el intento está terminado. */
export function rateItem(attempt: Attempt, itemId: string, rating: RubricRating | null, bank: QuestionBank, now: number): Attempt {
  const a = clone(attempt);
  if (rating) a.ratings[itemId] = rating;
  else delete a.ratings[itemId];
  if (a.status === 'completed') a.results = computeResults(a, bank, now);
  return touch(a, now);
}

/** Estado de cada página para el panel de navegación. */
export function pageStatus(a: Attempt, page: Page): 'answered' | 'partial' | 'unanswered' | 'info' {
  if (page.itemIds.length === 0) return 'info';
  const answered = page.itemIds.filter((id) => {
    const r = a.responses[id];
    if (!r) return false;
    if (r.kind === 'choice') return r.selected.length > 0;
    if (r.kind === 'gap') return r.value.trim().length > 0;
    if (r.kind === 'order') return r.order.length > 0;
    if (r.kind === 'essay') return r.text.trim().length > 0;
    return r.status === 'recorded';
  }).length;
  if (answered === 0) return 'unanswered';
  return answered === page.itemIds.length ? 'answered' : 'partial';
}

export function moduleCounts(a: Attempt, mod: ModuleRun) {
  let answered = 0;
  let flagged = 0;
  for (const p of mod.pages) {
    const st = pageStatus(a, p);
    if (st === 'answered') answered += p.itemIds.length;
    else if (st === 'partial') answered += p.itemIds.filter((id) => a.responses[id]).length;
    for (const id of p.itemIds) if (a.flags[id]) flagged += 1;
  }
  const total = mod.itemIds.length;
  return { answered, unanswered: total - answered, flagged, total };
}

export const ALL_SECTIONS: SectionId[] = [...SECTION_IDS];
