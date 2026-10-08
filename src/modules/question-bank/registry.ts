import { itemsOfSet } from './items';
import type { BankItem, ContentSet, SectionId, TaskType } from './types';

/**
 * Descubre automáticamente todos los archivos de contenido.
 * Cada archivo en `data/**` exporta `sets: ContentSet[]`.
 */
const modules = import.meta.glob<{ sets: ContentSet[] }>('./data/**/*.ts', { eager: true });

export const builtinSets: ContentSet[] = Object.keys(modules)
  .sort()
  .flatMap((path) => (modules[path]?.sets ?? []).map((s) => ({ ...s, source: s.source ?? 'builtin' })));

export interface QuestionBank {
  sets: ContentSet[];
  items: BankItem[];
  setById: Map<string, ContentSet>;
  itemById: Map<string, BankItem>;
}

export function buildBank(sets: ContentSet[]): QuestionBank {
  const setById = new Map<string, ContentSet>();
  const itemById = new Map<string, BankItem>();
  const items: BankItem[] = [];
  for (const set of sets) {
    if (setById.has(set.id)) continue; // el primero gana (los integrados tienen prioridad)
    setById.set(set.id, set);
    for (const item of itemsOfSet(set)) {
      items.push(item);
      itemById.set(item.id, item);
    }
  }
  return { sets: [...setById.values()], items, setById, itemById };
}

export const builtinBank = buildBank(builtinSets);

export function setsFor(bank: QuestionBank, filter: { section?: SectionId; task?: TaskType }): ContentSet[] {
  return bank.sets.filter((s) => (!filter.section || s.section === filter.section) && (!filter.task || s.task === filter.task));
}
