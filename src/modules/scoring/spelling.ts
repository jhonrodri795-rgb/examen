/**
 * Variantes ortográficas británicas de palabras escritas en inglés
 * estadounidense, para no dar por incorrecto un hueco de Complete the Words
 * escrito con la otra ortografía (el TOEFL acepta ambas).
 *
 * Solo se aplican reglas seguras: listas cerradas de raíces y los sufijos
 * -ize/-yze, que no generan otra palabra inglesa distinta.
 */

/** Raíces en -or con variante -our (behavior → behaviour, colorful → colourful). */
const OUR_STEMS = [
  'armor', 'behavior', 'candor', 'clamor', 'color', 'endeavor', 'favor', 'flavor', 'glamor', 'harbor', 'honor',
  'humor', 'labor', 'neighbor', 'odor', 'parlor', 'rigor', 'rumor', 'savior', 'splendor', 'tumor', 'valor', 'vapor', 'vigor',
];
/** Verbos en -l que doblan la consonante en británico (traveled → travelled). */
const DOUBLE_L = [
  'cancel', 'channel', 'counsel', 'dial', 'equal', 'fuel', 'jewel', 'label', 'level', 'marvel', 'model', 'quarrel',
  'rival', 'shovel', 'signal', 'total', 'travel', 'tunnel',
];
/** Palabras en -er con variante -re (center → centre). */
const RE_WORDS = ['center', 'centers', 'fiber', 'fibers', 'liter', 'liters', 'meter', 'meters', 'theater', 'theaters', 'caliber', 'somber', 'luster'];
const OTHER: Record<string, string[]> = {
  gray: ['grey'],
  aluminum: ['aluminium'],
  catalog: ['catalogue'],
  analog: ['analogue'],
  defense: ['defence'],
  offense: ['offence'],
  jewelry: ['jewellery'],
  mold: ['mould'],
  plow: ['plough'],
};

/** Formas aceptables de una palabra (incluida ella misma), en minúsculas. */
export function spellingVariants(word: string): string[] {
  const w = word.toLowerCase();
  const out = new Set([w]);
  // -ize / -yze y derivados (organize, organization, analyze…). Excluye palabras cortas como "size" o "prize".
  if (w.length > 6) {
    const ise = w.replace(/iz(e|es|ed|ing|er|ers|ation|ations)$/, 'is$1');
    if (ise !== w) out.add(ise);
    const yse = w.replace(/yz(e|es|ed|ing|er|ers)$/, 'ys$1');
    if (yse !== w) out.add(yse);
  }
  for (const stem of OUR_STEMS) {
    if (w.startsWith(stem)) out.add(`${stem.slice(0, -2)}our${w.slice(stem.length)}`);
  }
  for (const stem of DOUBLE_L) {
    const m = w.match(new RegExp(`^${stem}(ed|ing|er|ers)$`));
    if (m) out.add(`${stem}l${m[1]}`);
  }
  if (RE_WORDS.includes(w)) out.add(w.replace(/er(s?)$/, 're$1'));
  for (const v of OTHER[w] ?? []) out.add(v);
  return [...out];
}

/**
 * ¿Es correcta la respuesta a un hueco? Se admite escribir solo las letras
 * que faltan o la palabra completa, con ortografía estadounidense o británica.
 */
export function gapMatches(typed: string, gap: { prefix: string; missing: string; word: string }): boolean {
  const t = typed.trim().toLowerCase();
  if (!t) return false;
  const prefix = gap.prefix.toLowerCase();
  const candidates = new Set([t, prefix + t]);
  const accepted = spellingVariants(gap.word);
  return accepted.some((v) => candidates.has(v));
}
