import { createRng, shuffle } from '@/lib/random';
import { itemsOfSet } from '../question-bank/items';
import type { QuestionBank } from '../question-bank/registry';
import type { ContentSet, Difficulty } from '../question-bank/types';
import type { PartSpec } from './blueprint-types';
import type { Page } from './types';

export interface AssemblyResult {
  setIds: string[];
  warnings: string[];
}

const DIFF_LABEL: Record<Difficulty, string> = { easy: 'fácil', medium: 'media', hard: 'difícil' };

/**
 * Selecciona sets del banco para las partes de un módulo.
 * - Respeta la dificultad preferida y la relaja si no hay contenido suficiente.
 * - Evita repetir sets dentro del mismo intento.
 * - Prioriza los sets menos vistos en intentos anteriores.
 */
export function assembleParts(
  parts: PartSpec[],
  bank: QuestionBank,
  used: Set<string>,
  seed: number,
  exposure: Record<string, number> = {},
): AssemblyResult {
  const rng = createRng(seed);
  const setIds: string[] = [];
  const warnings: string[] = [];

  const rank = (sets: ContentSet[]) =>
    shuffle(sets, rng).sort((a, b) => (exposure[a.id] ?? 0) - (exposure[b.id] ?? 0));

  for (const part of parts) {
    const available = bank.sets.filter((s) => s.task === part.task && !used.has(s.id));
    const chosen: ContentSet[] = [];
    const prefs = part.difficulty ?? [];
    for (const d of prefs) {
      if (chosen.length >= part.sets) break;
      for (const s of rank(available.filter((x) => x.difficulty === d && !chosen.includes(x)))) {
        if (chosen.length >= part.sets) break;
        chosen.push(s);
      }
    }
    if (chosen.length < part.sets) {
      const before = chosen.length;
      for (const s of rank(available.filter((x) => !chosen.includes(x)))) {
        if (chosen.length >= part.sets) break;
        chosen.push(s);
      }
      if (prefs.length && chosen.length > before) {
        warnings.push(`${part.task}: no había suficiente contenido de dificultad ${prefs.map((d) => DIFF_LABEL[d]).join('/')}; se usó otra dificultad.`);
      }
    }
    if (chosen.length < part.sets) {
      warnings.push(`${part.task}: el banco solo tiene ${chosen.length} de ${part.sets} sets disponibles.`);
    }
    for (const s of chosen) {
      used.add(s.id);
      setIds.push(s.id);
    }
  }
  return { setIds, warnings };
}

/** Construye las páginas de navegación para una lista de sets. */
export function buildPages(setIds: string[], bank: QuestionBank): { pages: Page[]; itemIds: string[] } {
  const pages: Page[] = [];
  const itemIds: string[] = [];
  for (const setId of setIds) {
    const set = bank.setById.get(setId);
    if (!set) continue;
    const items = itemsOfSet(set);
    itemIds.push(...items.map((i) => i.id));
    switch (set.task) {
      case 'complete-words':
        pages.push({ id: `${setId}:cloze`, setId, view: 'cloze', itemIds: items.map((i) => i.id) });
        break;
      case 'daily-life':
      case 'academic-passage':
        for (const it of items) pages.push({ id: `${setId}:${it.id}`, setId, view: 'question', itemIds: [it.id] });
        break;
      case 'choose-response':
        for (const it of items) pages.push({ id: `${setId}:${it.id}`, setId, view: 'question', itemIds: [it.id], inlineAudio: true });
        break;
      case 'conversation':
      case 'announcement':
      case 'academic-talk':
        pages.push({ id: `${setId}:listen`, setId, view: 'listen', itemIds: [] });
        for (const it of items) pages.push({ id: `${setId}:${it.id}`, setId, view: 'question', itemIds: [it.id] });
        break;
      case 'build-sentence':
        pages.push({ id: `${setId}:build`, setId, view: 'build', itemIds: [items[0]!.id] });
        break;
      case 'email':
      case 'academic-discussion':
        pages.push({ id: `${setId}:essay`, setId, view: 'essay', itemIds: [items[0]!.id] });
        break;
      case 'listen-repeat':
      case 'interview':
      case 'independent-speaking':
        for (const it of items) pages.push({ id: `${setId}:${it.id}`, setId, view: 'speak', itemIds: [it.id] });
        break;
    }
  }
  return { pages, itemIds };
}
