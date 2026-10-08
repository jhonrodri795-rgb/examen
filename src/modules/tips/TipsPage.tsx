import { BookOpen, Gauge, Headphones, Keyboard, Mic, PenLine } from 'lucide-react';
import { Alert, Card, CardHeader, PageHeader } from '@/components/ui';
import { toeflIbt2026 } from '@/modules/exam-engine/blueprints/toefl-ibt-2026';

const FORMAT = [
  { section: 'Reading', tasks: 'Complete the Words · Read in Daily Life · Read an Academic Passage', time: '≈27–30 min', notes: 'Adaptativa en dos módulos (multietapa).' },
  { section: 'Listening', tasks: 'Listen and Choose a Response · Conversation · Announcement · Academic Talk', time: '≈27–29 min', notes: 'Adaptativa en dos módulos.' },
  { section: 'Writing', tasks: 'Build a Sentence (10) · Write an Email · Writing for an Academic Discussion', time: '≈23 min', notes: '12 ítems; email ≈7 min, discusión 10 min.' },
  { section: 'Speaking', tasks: 'Listen and Repeat (7) · Take an Interview (4)', time: '≈8 min', notes: '11 ítems; sin tiempo de preparación.' },
];

const TIPS: { icon: typeof BookOpen; title: string; items: string[] }[] = [
  {
    icon: BookOpen,
    title: 'Reading',
    items: [
      'Complete the Words: lee la frase completa antes de escribir; usa la gramática (tiempo verbal, plural, concordancia) para deducir la terminación.',
      'Read in Daily Life: identifica primero el propósito del texto (aviso, correo, anuncio) y localiza fechas, condiciones y excepciones.',
      'Academic Passage: lee la pregunta antes de releer el párrafo indicado. En vocabulario, sustituye cada opción en la frase.',
      'Preguntas NOT/EXCEPT: marca como verdaderas las opciones que encuentres en el texto; la que queda es la respuesta.',
    ],
  },
  {
    icon: Headphones,
    title: 'Listening',
    items: [
      'Choose a Response: identifica la función (petición, invitación, queja, sugerencia). Las respuestas que repiten palabras del audio suelen ser trampas.',
      'Toma notas con abreviaturas: idea principal, ejemplos, cambios de opinión ("however", "actually").',
      'En clases académicas, presta atención a las definiciones y a frases como "I want to be careful here" o "the key point is".',
      'No puedes volver atrás en modo examen: responde y avanza; no dejes preguntas en blanco.',
    ],
  },
  {
    icon: PenLine,
    title: 'Writing',
    items: [
      'Build a Sentence: busca primero el sujeto y el verbo; recuerda el orden de las preguntas indirectas ("Do you know where it is?").',
      'Email: cubre los tres puntos del enunciado en párrafos breves, con saludo y despedida adecuados al destinatario.',
      'Academic Discussion: postura clara en la primera frase, una razón con ejemplo concreto y referencia a la idea de un compañero. Apunta a 100–150 palabras.',
      'Reserva 1 minuto para revisar concordancias, artículos y puntuación.',
    ],
  },
  {
    icon: Mic,
    title: 'Speaking',
    items: [
      'Listen and Repeat: concéntrate en el ritmo y en los grupos de palabras; repite la frase completa aunque dudes de una palabra.',
      'Interview: responde directamente, da una razón y un ejemplo personal; usa casi todo el tiempo (35–45 s).',
      'Evita pausas largas reformulando con frases de transición ("What I mean is…", "For instance…").',
      'Un acento no nativo no es un error: prioriza la claridad, el acento de palabra y la entonación.',
    ],
  },
];

export function TipsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Consejos y formato del examen" description="Resumen del TOEFL iBT vigente desde el 21 de enero de 2026 y estrategias por sección." />
      <Card>
        <CardHeader title="Estructura actual (2026)" description="Datos publicados por ETS y fuentes de preparación; Reading y Listening varían según la ruta adaptativa." />
        <div className="overflow-x-auto p-5">
          <table className="w-full min-w-[40rem] text-left text-sm">
            <thead className="text-xs uppercase tracking-wide text-muted">
              <tr><th className="py-2 pr-4">Sección</th><th className="py-2 pr-4">Tareas</th><th className="py-2 pr-4">Duración</th><th className="py-2">Notas</th></tr>
            </thead>
            <tbody>
              {FORMAT.map((f) => (
                <tr key={f.section} className="border-t border-line">
                  <td className="py-2 pr-4 font-medium text-ink">{f.section}</td>
                  <td className="py-2 pr-4 text-ink-2">{f.tasks}</td>
                  <td className="py-2 pr-4 tabular-nums text-ink-2">{f.time}</td>
                  <td className="py-2 text-ink-2">{f.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <ul className="mt-4 list-disc space-y-1 pl-5 text-xs text-muted">
            {toeflIbt2026.sourceNotes.map((n) => <li key={n}>{n}</li>)}
          </ul>
        </div>
      </Card>

      <Card>
        <CardHeader title="Puntuación" icon={<Gauge className="h-5 w-5" />} />
        <div className="space-y-3 p-5 text-sm text-ink-2">
          <p>Cada sección se informa en una escala de <strong>1 a 6</strong> en pasos de 0,5, alineada con el MCER (6 ≈ C2, 5 ≈ C1, 4 ≈ B2, 3 ≈ B1, 2 ≈ A2, 1 ≈ A1). La puntuación global es la media de las cuatro secciones redondeada a 0,5. Durante la transición, ETS también informa una puntuación comparable 0–120 (equivalencias publicadas: 5 ≈ 100, 4,5 ≈ 90, 4 ≈ 80, 3,5 ≈ 70).</p>
          <Alert tone="warn" title="Estimaciones, no puntuaciones oficiales">
            Esta aplicación calcula aciertos exactos, pero las bandas son estimaciones orientativas con curvas propias. Writing y Speaking dependen de tu autoevaluación o de una evaluación automática que no replica a los evaluadores de ETS.
          </Alert>
        </div>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        {TIPS.map(({ icon: Icon, title, items }) => (
          <Card key={title}>
            <CardHeader title={title} icon={<Icon className="h-5 w-5" />} />
            <ul className="list-disc space-y-2 py-4 pl-10 pr-5 text-sm text-ink-2">
              {items.map((i) => <li key={i}>{i}</li>)}
            </ul>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader title="Atajos y accesibilidad" icon={<Keyboard className="h-5 w-5" />} />
        <ul className="list-disc space-y-1 py-4 pl-10 pr-5 text-sm text-ink-2">
          <li><kbd className="rounded border border-line px-1">Alt</kbd> + <kbd className="rounded border border-line px-1">→</kbd> / <kbd className="rounded border border-line px-1">←</kbd>: pregunta siguiente / anterior.</li>
          <li>Flechas dentro de las opciones para cambiar la respuesta; <kbd className="rounded border border-line px-1">Tab</kbd> para pasar entre huecos en Complete the Words.</li>
          <li>Los gráficos tienen vista de tabla y se pueden recorrer con las flechas del teclado.</li>
          <li>Configuración → Texto más grande, tema claro/oscuro y voces de síntesis.</li>
        </ul>
      </Card>
    </div>
  );
}
