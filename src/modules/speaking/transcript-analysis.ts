/**
 * Métricas derivadas de la transcripción y alineación con un texto de
 * referencia (Listen and Repeat). Todo se calcula a partir de datos reales
 * del proveedor de transcripción; si un dato no existe, se devuelve null.
 */
import type { AcousticMetrics, Transcript, TranscriptMetrics } from '@shared/speaking-types';
import { mattr, splitSentences, tokenize } from '../writing/analysis';

export const FILLERS = new Set(['um', 'uh', 'erm', 'er', 'hmm', 'mm', 'ah', 'eh', 'uhm', 'umm', 'uhh', 'mhm']);

export function computeTranscriptMetrics(t: Transcript, acoustic: AcousticMetrics | null): TranscriptMetrics {
  const tokens = t.words.length ? t.words.map((w) => w.word.toLowerCase().replace(/[^a-z']/g, '')).filter(Boolean) : tokenize(t.text);
  const fillerCounts = new Map<string, number>();
  t.words.forEach((w, i) => {
    const tok = tokens[i] ?? '';
    if (w.filler || FILLERS.has(tok)) fillerCounts.set(tok || w.word, (fillerCounts.get(tok || w.word) ?? 0) + 1);
  });
  if (!t.words.length) for (const tok of tokens) if (FILLERS.has(tok)) fillerCounts.set(tok, (fillerCounts.get(tok) ?? 0) + 1);
  const fillerCount = [...fillerCounts.values()].reduce((a, b) => a + b, 0);
  const lexical = tokens.filter((x) => !FILLERS.has(x));
  const wordCount = lexical.length;

  // Ritmo: preferimos el intervalo de habla medido en la señal; si no, los tiempos del proveedor.
  let spanSec: number | null = null;
  if (acoustic && acoustic.runs.length) spanSec = acoustic.runs[acoustic.runs.length - 1]![1] - acoustic.runs[0]![0];
  else if (t.words.length) spanSec = t.words[t.words.length - 1]!.end - t.words[0]!.start;
  else if (t.durationSec) spanSec = t.durationSec;
  const wordsPerMinute = spanSec && spanSec > 1 ? Math.round((wordCount / spanSec) * 60) : null;
  const articulationRate = acoustic && acoustic.speechDurationSec > 1 ? Math.round((wordCount / acoustic.speechDurationSec) * 60) : null;

  const repetitions = new Map<string, number>();
  for (let i = 1; i < lexical.length; i++) {
    if (lexical[i] === lexical[i - 1]) repetitions.set(lexical[i]!, (repetitions.get(lexical[i]!) ?? 0) + 1);
  }

  const sentences = splitSentences(t.text);
  return {
    wordCount,
    wordsPerMinute,
    articulationRate,
    fillerCount,
    fillers: [...fillerCounts.entries()].map(([word, count]) => ({ word, count })).sort((a, b) => b.count - a.count),
    uniqueWordRatio: Math.round(mattr(lexical, 40) * 100) / 100,
    meanSentenceLength: sentences.length ? Math.round((wordCount / sentences.length) * 10) / 10 : wordCount,
    lowConfidenceWords: t.words
      .filter((w) => w.confidence !== undefined && w.confidence < 0.6 && !FILLERS.has(w.word.toLowerCase()))
      .map((w) => ({ word: w.word, start: w.start, confidence: Math.round((w.confidence ?? 0) * 100) / 100 })),
    repetitions: [...repetitions.entries()].map(([phrase, count]) => ({ phrase: `${phrase} ${phrase}`, count })),
  };
}

// ---------- Alineación para Listen and Repeat ----------

const NUMBERS: Record<string, string> = {
  '0': 'zero', '1': 'one', '2': 'two', '3': 'three', '4': 'four', '5': 'five', '6': 'six', '7': 'seven', '8': 'eight', '9': 'nine',
  '10': 'ten', '11': 'eleven', '12': 'twelve', '15': 'fifteen', '20': 'twenty', '30': 'thirty', '100': 'hundred',
};
const CONTRACTIONS: Record<string, string[]> = {
  "it's": ['it', 'is'], "don't": ['do', 'not'], "can't": ['can', 'not'], "won't": ['will', 'not'], "i'm": ['i', 'am'],
  "you're": ['you', 'are'], "we're": ['we', 'are'], "they're": ['they', 'are'], "that's": ['that', 'is'], "isn't": ['is', 'not'],
  "aren't": ['are', 'not'], "doesn't": ['does', 'not'], "didn't": ['did', 'not'], "i'll": ['i', 'will'], "you'll": ['you', 'will'],
  "there's": ['there', 'is'], "let's": ['let', 'us'], "o'clock": ['oclock'],
};

export function normalizeForAlignment(text: string): string[] {
  const out: string[] = [];
  const raw = text.toLowerCase().replace(/[’]/g, "'").replace(/(\d+):00/g, '$1').match(/[a-z0-9']+/g) ?? [];
  for (const tok of raw) {
    if (FILLERS.has(tok)) continue;
    if (CONTRACTIONS[tok]) out.push(...CONTRACTIONS[tok]!);
    else if (NUMBERS[tok]) out.push(NUMBERS[tok]!);
    else out.push(tok.replace(/'/g, ''));
  }
  return out;
}

export interface AlignmentOp {
  type: 'ok' | 'sub' | 'del' | 'ins';
  ref?: string;
  hyp?: string;
}

/** Alineación por distancia de edición a nivel de palabra (WER). */
export function alignWords(reference: string, hypothesis: string): { ops: AlignmentOp[]; accuracy: number; matched: number; total: number } {
  const r = normalizeForAlignment(reference);
  const h = normalizeForAlignment(hypothesis);
  const n = r.length;
  const m = h.length;
  const d: number[][] = Array.from({ length: n + 1 }, (_, i) => Array.from({ length: m + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0)));
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      const cost = r[i - 1] === h[j - 1] ? 0 : 1;
      d[i]![j] = Math.min(d[i - 1]![j]! + 1, d[i]![j - 1]! + 1, d[i - 1]![j - 1]! + cost);
    }
  }
  const ops: AlignmentOp[] = [];
  let i = n;
  let j = m;
  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && d[i]![j] === d[i - 1]![j - 1]! + (r[i - 1] === h[j - 1] ? 0 : 1)) {
      ops.push(r[i - 1] === h[j - 1] ? { type: 'ok', ref: r[i - 1], hyp: h[j - 1] } : { type: 'sub', ref: r[i - 1], hyp: h[j - 1] });
      i--;
      j--;
    } else if (i > 0 && d[i]![j] === d[i - 1]![j]! + 1) {
      ops.push({ type: 'del', ref: r[i - 1] });
      i--;
    } else {
      ops.push({ type: 'ins', hyp: h[j - 1] });
      j--;
    }
  }
  ops.reverse();
  const errors = ops.filter((o) => o.type !== 'ok').length;
  const matched = ops.filter((o) => o.type === 'ok').length;
  const accuracy = n === 0 ? 0 : Math.max(0, 1 - errors / n);
  return { ops, accuracy: Math.round(accuracy * 1000) / 1000, matched, total: n };
}
