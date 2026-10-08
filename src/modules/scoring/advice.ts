import type { Skill } from '../question-bank/types';
import type { Recommendation } from '../exam-engine/types';

export const SKILL_LABEL: Record<Skill, string> = {
  'main-idea': 'Idea principal',
  detail: 'Información específica',
  vocabulary: 'Vocabulario en contexto',
  inference: 'Inferencias',
  purpose: 'Propósito del autor',
  'paragraph-relation': 'Relación entre párrafos',
  organization: 'Organización de ideas',
  'negative-factual': 'Información NO mencionada',
  reference: 'Referencia',
  'multi-select': 'Selección múltiple',
  'word-completion': 'Complete the Words',
  pragmatics: 'Respuesta adecuada (pragmática)',
  function: 'Función del enunciado',
  attitude: 'Actitud del hablante',
  'sentence-construction': 'Construcción de frases',
  'email-writing': 'Correo electrónico',
  'discussion-writing': 'Discusión académica',
  repeat: 'Repetición de frases',
  'interview-response': 'Respuestas de entrevista',
  'opinion-speaking': 'Opinión oral con preparación',
};

/** Recomendaciones de estudio por habilidad débil. */
export const SKILL_ADVICE: Partial<Record<Skill, Recommendation>> = {
  'main-idea': { section: 'reading', task: 'academic-passage', title: 'Refuerza la idea principal', detail: 'Antes de responder, resume cada párrafo en 5–7 palabras. La idea principal debe cubrir todo el texto, no un solo detalle.' },
  detail: { section: 'reading', task: 'academic-passage', title: 'Localiza información específica', detail: 'Busca palabras clave del enunciado en el texto y relee la oración completa. Desconfía de opciones que copian palabras literales pero cambian el sentido.' },
  vocabulary: { section: 'reading', task: 'academic-passage', title: 'Vocabulario en contexto', detail: 'Sustituye cada opción en la frase original y comprueba si conserva el significado. Repasa listas de vocabulario académico (AWL) por familias de palabras.' },
  inference: { section: 'reading', task: 'academic-passage', title: 'Practica inferencias', detail: 'La respuesta correcta no está escrita literalmente, pero debe estar respaldada por el texto. Descarta opciones que exageran o añaden información externa.' },
  purpose: { section: 'reading', task: 'academic-passage', title: 'Propósito del autor', detail: 'Pregúntate "¿por qué menciona el autor esto aquí?": suele ser ejemplificar, contrastar, apoyar o refutar una idea del párrafo.' },
  'paragraph-relation': { section: 'reading', task: 'academic-passage', title: 'Relación entre párrafos', detail: 'Fíjate en la primera frase de cada párrafo y en conectores como however, therefore, in contrast: indican la función del párrafo.' },
  organization: { section: 'reading', task: 'academic-passage', title: 'Organización del texto', detail: 'Esquematiza la estructura (problema→causa→solución, comparación, cronología) mientras lees.' },
  'negative-factual': { section: 'reading', task: 'academic-passage', title: 'Preguntas NOT/EXCEPT', detail: 'Verifica cada opción en el texto y elimina las que sí aparecen. La correcta suele contradecir el texto o no aparecer.' },
  reference: { section: 'reading', task: 'academic-passage', title: 'Referencias pronominales', detail: 'Busca el sustantivo anterior que concuerda en número y que tiene sentido al sustituir el pronombre.' },
  'multi-select': { section: 'reading', title: 'Preguntas de varias respuestas', detail: 'Necesitas acertar todas las opciones. Evalúa cada opción por separado como verdadera/falsa según el texto.' },
  'word-completion': { section: 'reading', task: 'complete-words', title: 'Complete the Words', detail: 'Lee la frase completa antes de rellenar. Usa la gramática (concordancia, tiempo verbal, plural) y colocaciones frecuentes; revisa la ortografía.' },
  pragmatics: { section: 'listening', task: 'choose-response', title: 'Respuestas adecuadas al contexto', detail: 'Identifica la función (petición, invitación, queja, sugerencia). Desconfía de opciones que repiten palabras del audio sin responder.' },
  function: { section: 'listening', task: 'conversation', title: 'Función de lo que se dice', detail: 'Pregúntate por qué el hablante menciona algo: advertir, ejemplificar, cambiar de tema, matizar.' },
  attitude: { section: 'listening', task: 'academic-talk', title: 'Actitud del hablante', detail: 'Presta atención al tono y a expresiones de opinión (I\'d rather, I want to be careful, honestly).' },
  'sentence-construction': { section: 'writing', task: 'build-sentence', title: 'Orden de palabras', detail: 'Repasa preguntas indirectas (Do you know where it is?), oraciones de relativo y la posición de adverbios.' },
  'email-writing': { section: 'writing', task: 'email', title: 'Correos eficaces', detail: 'Cubre explícitamente los tres puntos del enunciado, usa saludo y despedida adecuados y un tono cortés. Apunta a 100–130 palabras.' },
  'discussion-writing': { section: 'writing', task: 'academic-discussion', title: 'Discusión académica', detail: 'Toma postura en la primera frase, añade una razón con ejemplo concreto y responde a al menos un compañero por su nombre.' },
  repeat: { section: 'speaking', task: 'listen-repeat', title: 'Listen and Repeat', detail: 'Practica shadowing: repite frases cortas inmediatamente después del audio, imitando ritmo y acento de frase. Aumenta la longitud progresivamente.' },
  'interview-response': { section: 'speaking', task: 'interview', title: 'Respuestas de entrevista', detail: 'Estructura: respuesta directa → razón → ejemplo personal → cierre. Usa todo el tiempo sin rellenar con muletillas.' },
  'opinion-speaking': { section: 'speaking', task: 'independent-speaking', title: 'Opinión oral', detail: 'Usa la plantilla postura–razón 1–ejemplo–razón 2–conclusión y practica con temporizador.' },
};
