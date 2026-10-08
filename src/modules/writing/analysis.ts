/**
 * Análisis local y transparente de textos escritos (sin IA).
 * Cada indicador se basa en reglas explícitas; los resultados son orientativos
 * y no sustituyen la corrección de un profesor.
 */
import { countWords } from '@/lib/format';

export interface GrammarFlag {
  rule: string;
  message: string;
  excerpt: string;
  index: number;
}

export interface TaskCheck {
  label: string;
  met: boolean;
  detail: string;
}

export interface HeuristicCriterion {
  criterion: 'development' | 'organization' | 'grammar' | 'vocabulary' | 'task';
  label: string;
  score: number;
  rationale: string;
}

export interface WritingAnalysis {
  wordCount: number;
  sentenceCount: number;
  paragraphCount: number;
  avgSentenceLength: number;
  longSentences: string[];
  lexicalDiversity: number;
  academicWords: string[];
  transitions: { word: string; count: number }[];
  repeatedWords: { word: string; count: number }[];
  grammarFlags: GrammarFlag[];
  taskChecks: TaskCheck[];
  lengthStatus: 'short' | 'ok' | 'long';
  heuristic: { criteria: HeuristicCriterion[]; overall5: number };
}

const TRANSITIONS = [
  'however', 'therefore', 'moreover', 'furthermore', 'in addition', 'for example', 'for instance', 'as a result',
  'consequently', 'on the other hand', 'in contrast', 'although', 'while', 'whereas', 'first', 'second', 'finally',
  'in conclusion', 'overall', 'because', 'since', 'thus', 'instead', 'similarly', 'also', 'besides', 'nevertheless',
  'in my opinion', 'i believe', 'i think', 'such as', 'that way', 'in fact', 'to begin with', 'as well as',
];

/** Subconjunto de la Academic Word List (Coxhead) para estimar registro académico. */
const ACADEMIC = new Set([
  'analyze', 'analysis', 'approach', 'area', 'assess', 'assume', 'authority', 'available', 'benefit', 'concept', 'consist',
  'context', 'contract', 'create', 'data', 'define', 'derive', 'distribute', 'economy', 'environment', 'establish',
  'estimate', 'evidence', 'factor', 'function', 'identify', 'income', 'indicate', 'individual', 'interpret', 'involve',
  'issue', 'method', 'occur', 'percent', 'period', 'policy', 'principle', 'process', 'require', 'research', 'respond',
  'role', 'section', 'significant', 'similar', 'source', 'specific', 'structure', 'theory', 'variable', 'achieve',
  'acquire', 'affect', 'appropriate', 'aspect', 'category', 'community', 'consequence', 'considerable', 'constant',
  'construct', 'consume', 'credit', 'culture', 'design', 'distinct', 'element', 'equate', 'evaluate', 'feature',
  'final', 'focus', 'impact', 'injure', 'institute', 'invest', 'item', 'journal', 'maintain', 'normal', 'obtain',
  'participate', 'perceive', 'positive', 'potential', 'previous', 'primary', 'purchase', 'range', 'region', 'regulate',
  'relevant', 'resource', 'restrict', 'secure', 'seek', 'select', 'site', 'strategy', 'survey', 'technique',
  'technology', 'alternative', 'circumstance', 'comment', 'compensate', 'component', 'consent', 'considerable',
  'contribute', 'convene', 'coordinate', 'core', 'corporate', 'correspond', 'criteria', 'deduce', 'demonstrate',
  'document', 'dominate', 'emphasis', 'ensure', 'exclude', 'framework', 'fund', 'illustrate', 'immigrate', 'imply',
  'initial', 'instance', 'interact', 'justify', 'layer', 'link', 'locate', 'maximize', 'minor', 'negate', 'outcome',
  'partner', 'philosophy', 'physical', 'proportion', 'publish', 'react', 'register', 'rely', 'remove', 'scheme',
  'sequence', 'sex', 'shift', 'specify', 'sufficient', 'task', 'technical', 'valid', 'volume', 'access', 'adequate',
  'annual', 'apparent', 'approximate', 'attitude', 'attribute', 'civil', 'code', 'commit', 'communicate', 'concentrate',
  'conference', 'contrast', 'cycle', 'debate', 'despite', 'dimension', 'domestic', 'emerge', 'error', 'ethnic', 'goal',
  'grant', 'hence', 'hypothesis', 'implement', 'implicate', 'impose', 'integrate', 'internal', 'investigate', 'job',
  'label', 'mechanism', 'obvious', 'occupy', 'option', 'output', 'overall', 'parallel', 'parameter', 'phase', 'predict',
  'principal', 'prior', 'professional', 'project', 'promote', 'regime', 'resolve', 'retain', 'series', 'statistic',
  'status', 'stress', 'subsequent', 'sum', 'summary', 'undertake', 'flexible', 'sustainable', 'infrastructure',
]);

const STOP = new Set([
  'the', 'a', 'an', 'and', 'or', 'but', 'to', 'of', 'in', 'on', 'for', 'with', 'at', 'by', 'from', 'is', 'are', 'was',
  'were', 'be', 'been', 'it', 'this', 'that', 'these', 'those', 'i', 'you', 'he', 'she', 'we', 'they', 'my', 'your',
  'our', 'their', 'his', 'her', 'its', 'as', 'if', 'so', 'not', 'do', 'does', 'did', 'have', 'has', 'had', 'can',
  'could', 'would', 'should', 'will', 'me', 'them', 'us', 'there', 'what', 'which', 'who', 'when', 'about', 'more',
  'also', 'than', 'then', 'very', 'just', 'because', 'all', 'some', 'many', 'much', 'one', 'how', 'why', 'into', 'out',
  "i'm", "it's", "don't", 'am', 'such', 'other', 'only', 'most', 'may', 'might', 'any', 'each', 'both', 'like', 'even',
  'whether', 'while', 'own', 'make', 'get', 'think', 'people',
]);

const A_EXCEPTIONS = /^(uni|use|usu|uti|eu|one|once|ur)/i; // "a university", "a useful", "a one-time"
const AN_EXCEPTIONS = /^(hour|honest|honou?r|heir|mba|fbi|mri|x-ray|sat\b)/i;

export function tokenize(text: string): string[] {
  return (text.toLowerCase().match(/[a-z]+(?:['’][a-z]+)?/g) ?? []).map((w) => w.replace('’', "'"));
}

export function splitSentences(text: string): string[] {
  return text
    .replace(/\s+/g, ' ')
    .split(/(?<=[.!?])\s+(?=[A-Z"“(])/)
    .map((s) => s.trim())
    .filter((s) => /[A-Za-z]/.test(s));
}

/** Moving-Average Type-Token Ratio (menos sensible a la longitud que el TTR simple). */
export function mattr(tokens: string[], window = 50): number {
  if (tokens.length === 0) return 0;
  if (tokens.length <= window) return new Set(tokens).size / tokens.length;
  let sum = 0;
  const counts = new Map<string, number>();
  for (let i = 0; i < window; i++) counts.set(tokens[i]!, (counts.get(tokens[i]!) ?? 0) + 1);
  sum += counts.size / window;
  for (let i = window; i < tokens.length; i++) {
    const out = tokens[i - window]!;
    const c = counts.get(out)! - 1;
    if (c === 0) counts.delete(out);
    else counts.set(out, c);
    counts.set(tokens[i]!, (counts.get(tokens[i]!) ?? 0) + 1);
    sum += counts.size / window;
  }
  return sum / (tokens.length - window + 1);
}

function excerptAt(text: string, index: number, length: number): string {
  const start = Math.max(0, index - 20);
  const end = Math.min(text.length, index + length + 20);
  return `${start > 0 ? '…' : ''}${text.slice(start, end).replace(/\s+/g, ' ')}${end < text.length ? '…' : ''}`;
}

/** Reglas gramaticales de alta precisión (no pretende ser un corrector completo). */
export function grammarFlags(text: string): GrammarFlag[] {
  const flags: GrammarFlag[] = [];
  const add = (rule: string, message: string, re: RegExp, filter?: (m: RegExpMatchArray) => boolean) => {
    for (const m of text.matchAll(re)) {
      if (filter && !filter(m)) continue;
      flags.push({ rule, message, excerpt: excerptAt(text, m.index ?? 0, m[0].length), index: m.index ?? 0 });
    }
  };
  add('pronoun-i', 'El pronombre "I" siempre va en mayúscula.', /(?<![A-Za-z'’.])i(?![A-Za-z'’.])/g);
  add('repeated-word', 'Palabra repetida consecutivamente.', /\b([A-Za-z]+)\s+\1\b/gi, (m) => !['that', 'had'].includes(m[1]!.toLowerCase()));
  add('article-a', 'Usa "an" delante de sonido vocálico.', /\ba\s+([aeiouAEIOU][a-z]*)/g, (m) => !A_EXCEPTIONS.test(m[1]!));
  add('article-an', 'Usa "a" delante de sonido consonántico.', /\ban\s+([b-df-hj-np-tv-zB-DF-HJ-NP-TV-Z][a-z]*)/g, (m) => !AN_EXCEPTIONS.test(m[1]!));
  add('double-comparative', 'Comparativo doble (p. ej. "more better" → "better").', /\b(more|most)\s+(better|worse|easier|harder|bigger|smaller|faster|best|worst|easiest|biggest)\b/gi);
  add('third-person-dont', 'Tercera persona: "doesn\'t", no "don\'t".', /\b(he|she|it)\s+don'?t\b/gi);
  add('people-is', '"People" es plural: "people are/were".', /\bpeople\s+(is|was|has)\b/gi);
  add('modal-of', 'Debe ser "could/should/would have", no "of".', /\b(could|should|would|must)\s+of\b/gi);
  add('alot', '"A lot" se escribe separado.', /\balot\b/gi);
  add('sentence-capital', 'Las oraciones empiezan con mayúscula.', /[.!?]\s+([a-z])/g, (m) => !/\b(e\.g|i\.e|etc|vs|approx|Mr|Mrs|Ms|Dr|Prof|St)$/i.test(text.slice(Math.max(0, (m.index ?? 0) - 6), m.index ?? 0)));
  add('missing-space', 'Falta un espacio después del signo de puntuación.', /[a-z]{2,}[,.;:](?=[A-Za-z]{2,})/g, (m) => !/\b(e\.g|i\.e|etc)$/i.test(m[0]));
  add('subject-verb', 'Concordancia sujeto-verbo ("there are" + plural).', /\bthere\s+is\s+(many|several|two|three|four|five|lots)\b/gi);
  return flags.sort((a, b) => a.index - b.index);
}

function contentKeywords(s: string): string[] {
  return tokenize(s).filter((w) => w.length > 3 && !STOP.has(w));
}

export interface AnalysisContext {
  task: 'email' | 'academic-discussion' | 'free';
  recommendedWords?: [number, number];
  bulletPoints?: string[];
  classmates?: string[];
}

export function analyzeWriting(text: string, ctx: AnalysisContext): WritingAnalysis {
  const tokens = tokenize(text);
  const wordCount = countWords(text);
  const sentences = splitSentences(text);
  const paragraphs = text.split(/\n\s*\n/).filter((p) => p.trim().length > 0);
  const lower = ` ${text.toLowerCase().replace(/\s+/g, ' ')} `;

  const transitions = TRANSITIONS.map((t) => ({ word: t, count: lower.split(new RegExp(`\\b${t.replace(/ /g, '\\s+')}\\b`)).length - 1 }))
    .filter((t) => t.count > 0)
    .sort((a, b) => b.count - a.count);

  const freq = new Map<string, number>();
  for (const t of tokens) if (!STOP.has(t) && t.length > 3) freq.set(t, (freq.get(t) ?? 0) + 1);
  const repeatedWords = [...freq.entries()]
    .filter(([, c]) => c >= 3 && c / Math.max(1, wordCount) > 0.025)
    .map(([word, count]) => ({ word, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 6);

  const academicWords = [...new Set(tokens.filter((t) => ACADEMIC.has(t) || ACADEMIC.has(t.replace(/(s|es|ed|ing|ly)$/, ''))))];
  const flags = grammarFlags(text);
  const sentenceLengths = sentences.map((s) => countWords(s));
  const avgSentenceLength = sentences.length ? sentenceLengths.reduce((a, b) => a + b, 0) / sentences.length : 0;
  const longSentences = sentences.filter((_, i) => sentenceLengths[i]! > 40);
  const diversity = mattr(tokens);

  const [minW, maxW] = ctx.recommendedWords ?? [100, 150];
  const lengthStatus: WritingAnalysis['lengthStatus'] = wordCount < minW ? 'short' : wordCount > maxW * 1.6 ? 'long' : 'ok';

  // ---- Comprobaciones de la tarea ----
  const taskChecks: TaskCheck[] = [];
  const firstLine = text.trim().split('\n')[0] ?? '';
  if (ctx.task === 'email') {
    taskChecks.push({ label: 'Saludo inicial', met: /^(dear|hi|hello|good (morning|afternoon|evening))\b/i.test(firstLine.trim()), detail: 'Empieza con "Dear …," o "Hi …,".' });
    taskChecks.push({ label: 'Despedida', met: /(regards|sincerely|best|thank you|thanks|cheers|take care)[,!.]?\s*\n?.{0,40}$/is.test(text.trim()), detail: 'Cierra con "Best regards," / "Sincerely," y tu nombre.' });
    for (const b of ctx.bulletPoints ?? []) {
      const kws = contentKeywords(b).slice(0, 6);
      const hits = kws.filter((k) => lower.includes(k.slice(0, Math.max(4, k.length - 2))));
      taskChecks.push({
        label: `Punto: ${b}`,
        met: kws.length === 0 ? true : hits.length / kws.length >= 0.34,
        detail: kws.length ? `Coincidencia aproximada por palabras clave (${hits.length}/${kws.length}). Revisa que el punto esté cubierto explícitamente.` : 'Revisa manualmente.',
      });
    }
  }
  if (ctx.task === 'academic-discussion') {
    taskChecks.push({ label: 'Postura clara', met: /\b(i (strongly )?(think|believe|agree|disagree|feel)|in my (view|opinion)|my position)\b/i.test(text), detail: 'Expresa tu opinión de forma explícita.' });
    taskChecks.push({ label: 'Ejemplo o razón concreta', met: /\b(for example|for instance|such as|in my experience|when i|because)\b/i.test(text), detail: 'Apoya tu postura con una razón y un ejemplo.' });
    const names = ctx.classmates ?? [];
    taskChecks.push({ label: 'Referencia a un compañero', met: names.length === 0 || names.some((n) => lower.includes(n.toLowerCase())), detail: `Menciona o responde a ${names.join(' o ') || 'otro estudiante'}.` });
  }
  taskChecks.push({ label: 'Extensión recomendada', met: lengthStatus !== 'short', detail: `${wordCount} palabras (recomendado ${minW}–${maxW}).` });

  // ---- Estimación heurística (0–5) ----
  const ratioLen = wordCount / minW;
  const hasExample = /\b(for example|for instance|such as|in my experience)\b/i.test(text);
  const development = ratioLen < 0.4 ? 1 : ratioLen < 0.7 ? 2 : ratioLen < 1 ? 3 : hasExample ? 5 : 4;
  const distinctTransitions = transitions.length;
  const organization = distinctTransitions === 0 ? 2 : distinctTransitions <= 2 ? 3 : distinctTransitions >= 4 && (paragraphs.length >= 2 || ctx.task !== 'email') ? 5 : 4;
  const per100 = (flags.length / Math.max(1, wordCount)) * 100;
  const grammar = wordCount < 20 ? 1 : per100 === 0 ? 5 : per100 < 1 ? 4 : per100 < 2 ? 3 : per100 < 4 ? 2 : 1;
  const vocabulary = wordCount < 20 ? 1 : diversity >= 0.75 ? 5 : diversity >= 0.7 ? 4 : diversity >= 0.62 ? 3 : diversity >= 0.55 ? 2 : 1;
  const met = taskChecks.filter((c) => c.met).length / Math.max(1, taskChecks.length);
  const task = met >= 1 ? 5 : met >= 0.75 ? 4 : met >= 0.5 ? 3 : met >= 0.25 ? 2 : 1;

  const criteria: HeuristicCriterion[] = [
    { criterion: 'development', label: 'Desarrollo de ideas', score: wordCount === 0 ? 0 : development, rationale: `${wordCount} palabras frente a un mínimo recomendado de ${minW}; ${hasExample ? 'incluye' : 'no se detecta'} un ejemplo explícito.` },
    { criterion: 'organization', label: 'Coherencia y cohesión', score: wordCount === 0 ? 0 : organization, rationale: `${distinctTransitions} conector(es) distinto(s) detectado(s); ${paragraphs.length} párrafo(s).` },
    { criterion: 'grammar', label: 'Gramática y mecánica', score: wordCount === 0 ? 0 : grammar, rationale: `${flags.length} posible(s) error(es) detectado(s) por reglas (${per100.toFixed(1)} por cada 100 palabras). Las reglas no detectan todos los errores.` },
    { criterion: 'vocabulary', label: 'Variedad léxica', score: wordCount === 0 ? 0 : vocabulary, rationale: `Diversidad léxica MATTR ${diversity.toFixed(2)}; ${academicWords.length} palabra(s) de la lista académica.` },
    { criterion: 'task', label: 'Cumplimiento de la tarea', score: wordCount === 0 ? 0 : task, rationale: `${taskChecks.filter((c) => c.met).length}/${taskChecks.length} comprobaciones cumplidas.` },
  ];
  const overall5 = Math.round((criteria.reduce((s, c) => s + c.score, 0) / criteria.length) * 2) / 2;

  return {
    wordCount,
    sentenceCount: sentences.length,
    paragraphCount: paragraphs.length,
    avgSentenceLength,
    longSentences,
    lexicalDiversity: diversity,
    academicWords,
    transitions,
    repeatedWords,
    grammarFlags: flags,
    taskChecks,
    lengthStatus,
    heuristic: { criteria, overall5 },
  };
}
