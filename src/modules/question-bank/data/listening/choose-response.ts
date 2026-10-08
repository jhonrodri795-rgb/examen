import type { Difficulty, ListeningSet, Topic, Voice } from '../../types';

/**
 * Listen and Choose a Response (Listening, formato 2026).
 * Se escucha una frase breve y se elige la respuesta más adecuada (pragmática).
 */
function cr(
  id: string,
  difficulty: Difficulty,
  voice: Voice,
  line: string,
  options: string[],
  answer: number,
  explanation: string,
  topic: Topic = 'campus-life',
): ListeningSet {
  return {
    id,
    section: 'listening',
    task: 'choose-response',
    title: line.length > 48 ? `${line.slice(0, 45)}…` : line,
    topic,
    difficulty,
    context: 'Listen to the speaker. Choose the best response.',
    script: [{ speaker: voice === 'female' ? 'Woman' : 'Man', voice, text: line }],
    questions: [
      {
        id: `${id}-q1`,
        kind: 'single',
        skill: 'pragmatics',
        prompt: 'Choose the best response.',
        options,
        answer: [answer],
        explanation,
      },
    ],
  };
}

export const sets: ListeningSet[] = [
  // ---- easy ----
  cr('ls-cr-library-hours', 'easy', 'female', 'Do you know when the library closes tonight?', [
    'Yes, I closed it yesterday.',
    "I think it's open until midnight.",
    'The library has a lot of books.',
    'I read it last night.',
  ], 1, 'Pregunta por una hora; la única respuesta que da esa información es "open until midnight". Las demás reutilizan palabras ("closes", "library") sin responder.'),
  cr('ls-cr-study-group', 'easy', 'male', 'Would you like to join our study group on Thursday?', [
    'I studied on Tuesday.',
    'Thursday is a day of the week.',
    'Sure. What time do you usually meet?',
    'Yes, they joined it.',
  ], 2, 'Es una invitación; se acepta y se pide un detalle relevante (la hora). Las otras opciones no responden a la invitación.'),
  cr('ls-cr-seat', 'easy', 'female', 'Excuse me, is this seat taken?', [
    "No, it's free. Go ahead.",
    'I took the bus this morning.',
    "It's a comfortable chair.",
    'Yes, I am seating.',
  ], 0, '"Is this seat taken?" = ¿está ocupado? La respuesta natural indica que está libre e invita a sentarse.'),
  cr('ls-cr-presentation', 'easy', 'male', 'How was your presentation this morning?', [
    "It's at ten o'clock.",
    'Better than I expected, actually.',
    "I'll present it tomorrow morning.",
    'The morning was cold.',
  ], 1, 'Pregunta por una valoración de algo pasado. "Better than I expected" la ofrece. La opción 3 contradice el tiempo verbal.'),
  cr('ls-cr-calculator', 'easy', 'female', 'Could you lend me your calculator for a minute?', [
    'I calculated it already.',
    'It costs about twenty dollars.',
    'Of course. Here you go.',
    'A minute is very short.',
  ], 2, 'Es una petición; la respuesta adecuada es acceder ("Here you go" = aquí tienes).'),
  cr('ls-cr-id-card', 'easy', 'male', 'Where can I pick up my student ID card?', [
    'At the registration office in Hall B.',
    'Yesterday afternoon.',
    'It has your photo on it.',
    'I lost mine last year.',
  ], 0, 'Pregunta "Where": solo la opción 1 indica un lugar.'),
  cr('ls-cr-reading', 'easy', 'female', "Have you finished the reading for Professor Kim's class?", [
    'Professor Kim is very nice.',
    'I will finish the class.',
    'Reading is my favorite hobby.',
    'Almost. I just have the last chapter left.',
  ], 3, 'Pregunta si ha terminado; "Almost… last chapter left" responde directamente. Las otras repiten palabras sin responder.'),
  cr('ls-cr-cafeteria', 'easy', 'male', 'Is the cafeteria still serving lunch?', [
    'I had lunch with Sam.',
    "Only until two, so you'd better hurry.",
    'The cafeteria is on campus.',
    'Yes, I served it.',
  ], 1, 'Responde a la pregunta (sí, hasta las dos) y añade un consejo coherente.'),

  // ---- medium ----
  cr('ls-cr-printer', 'medium', 'female', "I can't seem to get the printer in the lab to work.", [
    'The lab closes at nine.',
    'Have you checked whether it is out of paper?',
    'I printed my essay yesterday.',
    "It's a new printer model.",
  ], 1, 'La hablante expresa un problema; la mejor respuesta ofrece una posible solución. Las otras no ayudan.'),
  cr('ls-cr-dinner', 'medium', 'male', 'Do you want to grab dinner after the seminar?', [
    'The seminar was about economics.',
    'Dinner is usually served at six.',
    "I'd love to, but I promised to call my parents tonight.",
    'I already grabbed it.',
  ], 2, 'Rechazo cortés de una invitación con una razón. "Grab dinner" = ir a cenar algo rápido.'),
  cr('ls-cr-lab-report', 'medium', 'female', "Weren't you supposed to submit your lab report today?", [
    'Professor Diaz gave us an extension until Friday.',
    'The lab is on the third floor.',
    "I'm supposed to be a biology major.",
    "Yes, it's a report about labs.",
  ], 0, 'La pregunta negativa expresa sorpresa; la respuesta explica por qué no lo entregó hoy (prórroga).'),
  cr('ls-cr-field-trip', 'medium', 'male', 'I heard the field trip might be canceled.', [
    'Yes, I took a trip last summer.',
    'The field is very large.',
    "Really? I hope it's not because of the weather.",
    "I'll cancel my membership.",
  ], 2, 'Reacciona a una noticia con sorpresa y una suposición lógica sobre la causa.'),
  cr('ls-cr-textbook', 'medium', 'female', "Why don't we split the cost of the textbook?", [
    'Because it was expensive.',
    "That's a good idea. We could take turns using it.",
    'The textbook has twelve chapters.',
    'I split my notes into sections.',
  ], 1, '"Why don\'t we…?" es una sugerencia, no una pregunta de causa. Por eso "Because…" es incorrecta.'),
  cr('ls-cr-exhausted', 'medium', 'male', 'You look exhausted.', [
    'Yes, I look at it every day.',
    "I'll be exhausted next week.",
    'The project looks interesting.',
    'I was up all night finishing my project.',
  ], 3, 'Comentario sobre su aspecto; la respuesta natural explica la causa del cansancio.'),
  cr('ls-cr-statistics', 'medium', 'female', 'Should I take Statistics this semester or wait until next fall?', [
    'It depends on whether you need it for the research methods course.',
    'Next fall begins in September.',
    'Statistics are numbers.',
    'I took it last fall semester.',
  ], 0, 'Pide consejo entre dos opciones; la mejor respuesta da un criterio para decidir.'),
  cr('ls-cr-inflation', 'medium', 'male', "I'm not sure I understood the professor's point about inflation.", [
    "I'm sure you will.",
    'He pointed at the board.',
    'Me neither. Maybe we should ask her during office hours.',
    'The professor has a point.',
  ], 2, 'Expresa confusión; la respuesta muestra acuerdo y propone una acción útil. Las otras juegan con "point" o "sure".', 'economics'),

  // ---- hard ----
  cr('ls-cr-concert', 'hard', 'female', 'Did you manage to get tickets for the concert?', [
    'I managed the concert last year.',
    "Let's just say I'll be watching it online.",
    'The tickets were made of paper.',
    'Concerts are usually on weekends.',
  ], 1, 'Respuesta indirecta: verlo en línea implica que NO consiguió entradas.'),
  cr('ls-cr-cumulative', 'hard', 'male', 'The professor said the final exam would be cumulative.', [
    "Then I'd better start reviewing the first unit again.",
    'I accumulated a lot of points.',
    'The final exam is on Monday.',
    'She said it, not me.',
  ], 0, '"Cumulative" = incluye toda la materia; por eso la respuesta lógica es repasar también las primeras unidades.'),
  cr('ls-cr-bookstore-line', 'hard', 'female', "I can't believe how long the line at the bookstore was.", [
    'The line was straight.',
    'The bookstore sells books.',
    "That's why I ordered mine online this time.",
    'I believe it was long.',
  ], 2, 'Queja implícita; la respuesta muestra acuerdo indirecto explicando cómo evitó la cola.'),
  cr('ls-cr-presenting-first', 'hard', 'male', "Aren't you presenting first tomorrow?", [
    "Yes, I'm presenting a gift.",
    "Don't remind me. I haven't even finished my slides.",
    'Tomorrow comes after today.',
    'First, I need to remind you.',
  ], 1, '"Don\'t remind me" confirma que sí presenta y expresa preocupación porque no está listo.'),
  cr('ls-cr-return-book', 'hard', 'female', "If you're heading to the library, could you return this book for me?", [
    'The library is heading north.',
    'I returned from the library.',
    "I wasn't planning to, but I can make a stop there.",
    'This book was due last week.',
  ], 2, 'Corrige la suposición (no iba a la biblioteca) pero accede a la petición.'),
  cr('ls-cr-long-lecture', 'hard', 'male', "I thought Dr. Walsh's lecture would never end.", [
    'It will end at noon tomorrow.',
    'I know. I could barely keep my eyes open.',
    'Dr. Walsh thought so too.',
    'Lectures are usually informative.',
  ], 1, 'Exageración que expresa aburrimiento; la respuesta muestra acuerdo con otra expresión de aburrimiento.'),
  cr('ls-cr-housing-email', 'hard', 'female', "The housing office still hasn't answered my email.", [
    'Email is faster than regular mail.',
    'Houses are expensive in this area.',
    'I answered it already.',
    'You might have better luck if you go there in person.',
  ], 3, 'Problema implícito (no le responden); la respuesta sugiere una alternativa razonable.'),
  cr('ls-cr-study-outside', 'hard', 'male', 'So much for our plan to study outside today.', [
    'I know. Who expected it to rain this hard?',
    'Yes, the plan was very much.',
    "Today is perfect for studying outside.",
    'We studied outside as planned.',
  ], 0, '"So much for…" indica que un plan fracasó. La respuesta coherente identifica una causa (la lluvia).'),
];
