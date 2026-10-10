import { useEffect, useMemo, useRef, useState } from 'react';
import { Bot, Calculator, CheckCircle2, Download, FileText, Loader2, Sparkles, Square, XCircle } from 'lucide-react';
import type { WritingEvaluation } from '@shared/speaking-types';
import { useCapabilities, useConsent, useToast } from '@/app/context';
import { Alert, Badge, Button, Card, CardHeader } from '@/components/ui';
import { ApiRequestError, downloadText, evaluateWriting } from '@/lib/api';
import { newId } from '@/lib/random';
import type { DiscussionTaskSet, EmailTaskSet } from '@/modules/question-bank/types';
import type { RubricRating } from '@/modules/exam-engine/types';
import { listWritingReports, saveWritingReport } from '@/modules/storage/repositories';
import type { WritingReportRecord } from '@/modules/storage/db';
import { analyzeWriting, type WritingAnalysis } from '../analysis';
import { cn } from '@/lib/format';
import { STATIC_BUILD } from '@/lib/runtime';

const SELF_CRITERIA = [
  { key: 'development', label: 'Desarrollo de ideas', hint: 'Razones y ejemplos relevantes y bien explicados.' },
  { key: 'organization', label: 'Coherencia y cohesión', hint: 'Orden lógico, conectores, párrafos.' },
  { key: 'grammar', label: 'Gramática', hint: 'Estructuras correctas y variadas.' },
  { key: 'vocabulary', label: 'Vocabulario', hint: 'Precisión y variedad léxica.' },
  { key: 'task', label: 'Cumplimiento de la tarea', hint: 'Responde a todo lo que se pide con el registro adecuado.' },
];

const AI_LABEL: Record<string, string> = {
  coherence: 'Coherencia', cohesion: 'Cohesión', grammar: 'Gramática', vocabulary: 'Vocabulario', development: 'Desarrollo', taskFulfillment: 'Cumplimiento de la tarea',
};

export function analysisContext(set: EmailTaskSet | DiscussionTaskSet) {
  return set.task === 'email'
    ? { task: 'email' as const, recommendedWords: set.recommendedWords, bulletPoints: set.bulletPoints }
    : { task: 'academic-discussion' as const, recommendedWords: set.recommendedWords, classmates: set.posts.map((p) => p.author) };
}

function reportMarkdown(set: EmailTaskSet | DiscussionTaskSet, text: string, a: WritingAnalysis, ev: WritingEvaluation | null): string {
  const lines = [
    `# Informe de Writing — ${set.title}`,
    '',
    `Generado: ${new Date().toLocaleString('es')}`,
    '',
    '> Evaluación orientativa. No es una puntuación oficial de ETS.',
    '',
    '## Texto',
    '',
    text,
    '',
    '## Indicadores locales',
    '',
    `- Palabras: ${a.wordCount} · Oraciones: ${a.sentenceCount} · Media por oración: ${a.avgSentenceLength.toFixed(1)}`,
    `- Diversidad léxica (MATTR): ${a.lexicalDiversity.toFixed(2)} · Palabras académicas: ${a.academicWords.join(', ') || '—'}`,
    `- Conectores: ${a.transitions.map((t) => `${t.word} (${t.count})`).join(', ') || '—'}`,
    '',
    '### Posibles errores detectados por reglas',
    ...(a.grammarFlags.length ? a.grammarFlags.map((f) => `- ${f.message} — «${f.excerpt}»`) : ['- Ninguno detectado (las reglas no cubren todos los errores).']),
    '',
    '### Estimación heurística',
    ...a.heuristic.criteria.map((c) => `- ${c.label}: ${c.score}/5 — ${c.rationale}`),
    `- Global: ${a.heuristic.overall5}/5`,
  ];
  if (ev) {
    lines.push('', `## Evaluación con IA (${ev.provider} · ${ev.model})`, '', `Global: ${ev.overall5}/5`, '');
    for (const c of ev.criteria) lines.push(`- **${AI_LABEL[c.name] ?? c.name}**: ${c.score}/5 — ${c.rationale}${c.evidence.length ? ` (evidencia: ${c.evidence.map((e) => `«${e}»`).join('; ')})` : ''}`);
    if (ev.issues.length) lines.push('', '### Correcciones', ...ev.issues.map((i) => `- «${i.quote}»: ${i.problem} → ${i.suggestion}`));
    lines.push('', '### Versión mejorada', '', ev.improvedVersion, '', '### Limitaciones', ...ev.limitations.map((l) => `- ${l}`));
  }
  return lines.join('\n');
}

/** Análisis local, evaluación con IA opcional y autoevaluación de un texto. */
export function WritingAssessment({
  set,
  text,
  attemptId,
  itemId,
  draftId = null,
  currentRating,
  onRated,
}: {
  set: EmailTaskSet | DiscussionTaskSet;
  text: string;
  attemptId: string | null;
  itemId: string;
  draftId?: string | null;
  currentRating?: RubricRating;
  onRated?: (r: RubricRating) => void;
}) {
  const { caps, refresh } = useCapabilities();
  const consent = useConsent();
  const toast = useToast();
  const analysis = useMemo(() => analyzeWriting(text, analysisContext(set)), [text, set]);
  const [evaluation, setEvaluation] = useState<WritingEvaluation | null>(null);
  const [evalError, setEvalError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState<'thinking' | 'writing' | null>(null);
  const abort = useRef<AbortController | null>(null);
  useEffect(() => () => abort.current?.abort(), []);
  const [self, setSelf] = useState<Record<string, number>>(() => Object.fromEntries(SELF_CRITERIA.map((c) => [c.key, Number(currentRating?.criteria?.[c.key] ?? 3)])));
  const [note, setNote] = useState('');

  // Recuperar la última evaluación con IA de este texto.
  useEffect(() => {
    void listWritingReports(set.id).then((list) => {
      const match = list.find((r) => r.text === text && r.evaluation);
      if (match) setEvaluation(match.evaluation);
    }).catch(() => undefined);
  }, [set.id, text]);

  const runAi = async () => {
    setEvalError(null);
    const ok = await consent(['evaluator']);
    if (!ok) {
      setEvalError('No se envió el texto: falta el consentimiento para el servicio externo.');
      return;
    }
    setLoading(true);
    setProgress('thinking');
    const ctl = new AbortController();
    abort.current = ctl;
    try {
      const ev = await evaluateWriting({
        task: {
          type: set.task,
          prompt: set.task === 'email' ? set.scenario : set.professorPrompt,
          details: set.task === 'email' ? [`Recipient: ${set.recipient}`, ...set.bulletPoints] : set.posts.map((p) => `${p.author}: ${p.text}`),
          recommendedWords: set.recommendedWords,
        },
        text,
      }, { signal: ctl.signal, onWriting: () => setProgress('writing') });
      setEvaluation(ev);
      const rec: WritingReportRecord = { id: newId('wrep'), draftId, setId: set.id, attemptId, itemId, text, createdAt: Date.now(), analysis, evaluation: ev, selfAssessment: null };
      await saveWritingReport(rec).catch(() => undefined);
    } catch (e) {
      if (!ctl.signal.aborted) setEvalError(e instanceof ApiRequestError ? e.message : (e as Error).message);
      // Rechazos definitivos del visor (permiso denegado, etc.): ocultar la función.
      if ((e as { permanent?: boolean }).permanent) void refresh();
    } finally {
      if (abort.current === ctl) abort.current = null;
      setLoading(false);
      setProgress(null);
    }
  };

  const selfOverall = Math.round((Object.values(self).reduce((a, b) => a + b, 0) / SELF_CRITERIA.length) * 2) / 2;

  return (
    <div className="space-y-5">
      <Card>
        <CardHeader
          icon={<Calculator className="h-5 w-5" />}
          title="Análisis local (sin IA)"
          description="Indicadores calculados con reglas transparentes. Orientativo."
          actions={<Badge tone="neutral">Estimación heurística: {analysis.heuristic.overall5}/5</Badge>}
        />
        <div className="grid gap-5 p-5 lg:grid-cols-2">
          <div className="space-y-3 text-sm">
            <dl className="grid grid-cols-2 gap-2">
              {[
                ['Palabras', analysis.wordCount],
                ['Oraciones', analysis.sentenceCount],
                ['Palabras/oración', analysis.avgSentenceLength.toFixed(1)],
                ['Diversidad (MATTR)', analysis.lexicalDiversity.toFixed(2)],
                ['Conectores distintos', analysis.transitions.length],
                ['Párrafos', analysis.paragraphCount],
              ].map(([k, v]) => (
                <div key={k} className="rounded-lg bg-surface-3 p-2">
                  <dt className="text-xs text-muted">{k}</dt>
                  <dd className="font-semibold tabular-nums text-ink">{v}</dd>
                </div>
              ))}
            </dl>
            {analysis.transitions.length > 0 && <p className="text-xs text-muted">Conectores: {analysis.transitions.map((t) => t.word).join(', ')}</p>}
            {analysis.academicWords.length > 0 && <p className="text-xs text-muted">Vocabulario académico: {analysis.academicWords.join(', ')}</p>}
            {analysis.repeatedWords.length > 0 && <p className="text-xs text-warn">Palabras muy repetidas: {analysis.repeatedWords.map((w) => `${w.word} (${w.count})`).join(', ')}</p>}
            {analysis.longSentences.length > 0 && <p className="text-xs text-warn">{analysis.longSentences.length} oración(es) de más de 40 palabras: revisa posibles oraciones demasiado largas.</p>}
            <div>
              <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted">Comprobaciones de la tarea</p>
              <ul className="space-y-1">
                {analysis.taskChecks.map((c) => (
                  <li key={c.label} className="flex items-start gap-2">
                    {c.met ? <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-ok" aria-label="Cumplido" /> : <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-bad" aria-label="No cumplido" />}
                    <span>
                      <span className="text-ink">{c.label}</span>
                      <span className="block text-xs text-muted">{c.detail}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="space-y-3 text-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">Posibles errores (reglas)</p>
            {analysis.grammarFlags.length === 0 ? (
              <p className="text-muted">No se detectaron errores con las reglas disponibles. Esto no garantiza que no existan.</p>
            ) : (
              <ul className="space-y-1.5">
                {analysis.grammarFlags.slice(0, 12).map((f, i) => (
                  <li key={i} className="rounded-lg border border-line p-2">
                    <p className="text-ink">{f.message}</p>
                    <p className="font-mono text-xs text-muted">{f.excerpt}</p>
                  </li>
                ))}
              </ul>
            )}
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">Rúbrica heurística (0–5)</p>
            <ul className="space-y-1">
              {analysis.heuristic.criteria.map((c) => (
                <li key={c.criterion} className="flex items-start justify-between gap-3">
                  <span>
                    <span className="text-ink">{c.label}</span>
                    <span className="block text-xs text-muted">{c.rationale}</span>
                  </span>
                  <span className="font-semibold tabular-nums text-ink">{c.score}</span>
                </li>
              ))}
            </ul>
            {onRated && (
              <Button variant="outline" size="sm" onClick={() => onRated({ source: 'auto', overall: analysis.heuristic.overall5, criteria: Object.fromEntries(analysis.heuristic.criteria.map((c) => [c.criterion, c.score])), at: Date.now() })}>
                Usar estimación heurística como valoración
              </Button>
            )}
          </div>
        </div>
      </Card>

      <Card>
        <CardHeader
          icon={<Bot className="h-5 w-5" />}
          title="Evaluación con IA"
          description={
            caps?.evaluator.configured
              ? `Proveedor: ${caps.evaluator.provider} · ${caps.evaluator.model}. Se envía solo el texto y el enunciado.`
              : STATIC_BUILD
                ? caps?.evaluator.dataPolicy ?? 'Comprobando si Claude está disponible…'
                : 'No hay un evaluador de IA configurado en el servidor (ver README → variables de entorno).'
          }
          actions={
            caps?.evaluator.configured && (
              <>
                {loading && (
                  <Button variant="ghost" size="sm" onClick={() => abort.current?.abort()} icon={<Square className="h-4 w-4" />}>
                    Cancelar
                  </Button>
                )}
                <Button onClick={runAi} loading={loading} disabled={analysis.wordCount < 20} icon={<Sparkles className="h-4 w-4" />}>
                  {evaluation ? 'Reevaluar' : STATIC_BUILD ? 'Evaluar con Claude' : 'Evaluar con IA'}
                </Button>
              </>
            )
          }
        />
        <div className="space-y-4 p-5 text-sm">
          {progress && (
            <p className="flex items-center gap-2 text-accent" aria-live="polite">
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
              {progress === 'thinking' ? 'Claude está analizando tu texto (puede tardar hasta 1–2 minutos)…' : 'Redactando la evaluación…'}
            </p>
          )}
          {analysis.wordCount < 20 && caps?.evaluator.configured && <p className="text-muted">Escribe al menos 20 palabras para solicitar la evaluación.</p>}
          {evalError && <Alert tone="bad">{evalError}</Alert>}
          {!evaluation && !evalError && <p className="text-muted">{caps?.evaluator.configured ? 'Aún no se ha evaluado este texto.' : 'Puedes usar el análisis local y la autoevaluación.'}</p>}
          {evaluation && (
            <>
              <div className="flex flex-wrap items-center gap-2">
                <Badge tone="brand">Global {evaluation.overall5}/5</Badge>
                <Badge>Orientativo · no oficial</Badge>
                {onRated && (
                  <Button size="sm" variant="outline" onClick={() => onRated({ source: 'ai', overall: evaluation.overall5, criteria: Object.fromEntries(evaluation.criteria.map((c) => [c.name, c.score])), at: Date.now() })}>
                    Usar como valoración
                  </Button>
                )}
              </div>
              <ul className="grid gap-3 md:grid-cols-2">
                {evaluation.criteria.map((c) => (
                  <li key={c.name} className="rounded-lg border border-line p-3">
                    <p className="flex justify-between font-medium text-ink">
                      {AI_LABEL[c.name] ?? c.name} <span className="tabular-nums">{c.score}/5</span>
                    </p>
                    <p className="mt-1 text-ink-2">{c.rationale}</p>
                    {c.evidence.map((e) => (
                      <p key={e} className="mt-1 border-l-2 border-accent pl-2 font-mono text-xs text-muted">«{e}»</p>
                    ))}
                  </li>
                ))}
              </ul>
              {evaluation.strengths.length > 0 && (
                <div>
                  <p className="font-semibold text-ink">Aspectos positivos</p>
                  <ul className="list-disc pl-5 text-ink-2">{evaluation.strengths.map((s) => <li key={s}>{s}</li>)}</ul>
                </div>
              )}
              {evaluation.issues.length > 0 && (
                <div>
                  <p className="font-semibold text-ink">Correcciones</p>
                  <ul className="space-y-1.5">
                    {evaluation.issues.map((i, k) => (
                      <li key={k} className="rounded-lg bg-surface-3 p-2">
                        <span className="font-mono text-xs text-bad">«{i.quote}»</span> — {i.problem} <span className="text-ok">→ {i.suggestion}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <details className="rounded-lg border border-line p-3">
                <summary className="cursor-pointer font-medium text-ink">Versión mejorada</summary>
                <p className="mt-2 whitespace-pre-line font-serif text-ink">{evaluation.improvedVersion}</p>
              </details>
              {evaluation.limitations.length > 0 && <Alert tone="info" title="Limitaciones">{evaluation.limitations.join(' ')}</Alert>}
            </>
          )}
        </div>
      </Card>

      {onRated && (
        <Card>
          <CardHeader title="Autoevaluación con rúbrica (0–5)" description="Compara tu texto con la respuesta modelo y puntúa cada criterio con honestidad." actions={currentRating && <Badge tone="ok">Valoración actual: {currentRating.overall}/5 ({currentRating.source === 'self' ? 'propia' : currentRating.source === 'ai' ? 'IA' : 'heurística'})</Badge>} />
          <div className="space-y-3 p-5 text-sm">
            {SELF_CRITERIA.map((c) => (
              <div key={c.key} className="grid items-center gap-2 sm:grid-cols-[14rem_1fr_2rem]">
                <label htmlFor={`self-${itemId}-${c.key}`}>
                  <span className="text-ink">{c.label}</span>
                  <span className="block text-xs text-muted">{c.hint}</span>
                </label>
                <input id={`self-${itemId}-${c.key}`} type="range" min={0} max={5} step={0.5} value={self[c.key]} onChange={(e) => setSelf((s) => ({ ...s, [c.key]: Number(e.target.value) }))} className="accent-sky-600" />
                <span className="text-right font-semibold tabular-nums text-ink">{self[c.key]}</span>
              </div>
            ))}
            <label htmlFor={`self-note-${itemId}`} className="block text-xs text-muted">Notas (opcional)</label>
            <textarea id={`self-note-${itemId}`} value={note} onChange={(e) => setNote(e.target.value)} rows={2} className="w-full rounded-lg border border-line bg-surface p-2 text-ink" />
            <div className="flex flex-wrap items-center gap-3">
              <Button onClick={() => onRated({ source: 'self', overall: selfOverall, criteria: self, note, at: Date.now() })}>Guardar autoevaluación ({selfOverall}/5)</Button>
            </div>
            <details className="rounded-lg border border-line p-3">
              <summary className="cursor-pointer font-medium text-ink">Ver respuesta modelo</summary>
              <p className="mt-2 whitespace-pre-line font-serif text-ink">{set.sampleResponse}</p>
            </details>
          </div>
        </Card>
      )}

      <div className={cn('flex flex-wrap gap-2')}>
        <Button variant="outline" size="sm" icon={<FileText className="h-4 w-4" />} onClick={() => downloadText(text, `${set.id}.txt`)}>
          Exportar texto
        </Button>
        <Button variant="outline" size="sm" icon={<Download className="h-4 w-4" />} onClick={() => { downloadText(reportMarkdown(set, text, analysis, evaluation), `informe-${set.id}.md`, 'text/markdown'); toast('Informe exportado.', 'ok'); }}>
          Exportar informe (.md)
        </Button>
      </div>
    </div>
  );
}
