import type { BuildSentenceSet, Difficulty, Topic, WritingSet } from '../../../types';

/** Simulación n.º 7 — Writing (contenido original). */

function bs(
  id: string,
  difficulty: Difficulty,
  speaker: string,
  context: string,
  chunks: string[],
  endPunctuation: '.' | '?',
  explanation: string,
  extra: Partial<Pick<BuildSentenceSet, 'distractors' | 'acceptedOrders' | 'topic'>> = {},
): BuildSentenceSet {
  const { topic, ...rest } = extra;
  return {
    id,
    form: 7,
    section: 'writing',
    task: 'build-sentence',
    title: context,
    topic: (topic ?? 'campus-life') as Topic,
    difficulty,
    context: { speaker, text: context },
    chunks,
    endPunctuation,
    explanation,
    ...rest,
  };
}

export const sets: WritingSet[] = [
  // ---------- Build a Sentence ----------
  bs('f07-wr-bs-phone-plan', 'easy', 'Friend', 'Which phone plan did you choose?',
    ['I chose', 'the cheapest plan', "because it's", 'as fast as', 'the expensive ones'], '.',
    'Comparación de igualdad "as + adjetivo + as": "as fast as the expensive ones". "As faster as" es incorrecto: entre los dos "as" va el adjetivo en grado positivo, no el comparativo.',
    { distractors: ['as faster as'], topic: 'daily-life' }),
  bs('f07-wr-bs-other-languages', 'easy', 'Classmate', 'Can you speak any other languages?',
    ['I can speak', 'a little French,', "but I can't", 'write it', 'very well'], '.',
    'Modal "can" para expresar habilidad: después de "can" / "can\'t" va el infinitivo sin "to" ("I can\'t write it"). "Can\'t to write" es un error típico de hispanohablantes.',
    { distractors: ['to write it'], topic: 'daily-life' }),
  bs('f07-wr-bs-picnic', 'easy', 'Friend', 'What should we bring to the picnic?',
    ["Let's bring", 'some sandwiches', 'and a big', 'bottle of lemonade'], '.',
    'Sugerencia con "let\'s" + infinitivo sin "to": "Let\'s bring some sandwiches". "Let\'s to bring" es incorrecto. "A big bottle of lemonade" sigue el orden artículo + adjetivo + sustantivo.',
    { distractors: ["Let's to bring"], topic: 'daily-life' }),
  bs('f07-wr-bs-roommate', 'medium', 'Classmate', 'How long have you known your roommate?',
    ["We've known", 'each other', 'since we', 'were in', 'high school'], '.',
    'Presente perfecto con "since" para indicar el punto de inicio de una situación que continúa: "We\'ve known each other since we were in high school". "We know ... since" (calco del español "nos conocemos desde") es incorrecto en inglés.',
    { distractors: ['We know'] }),
  bs('f07-wr-bs-why-university', 'medium', 'Classmate', 'Why did you choose this university?',
    ['I chose it', 'for its', 'marine biology program,', 'which', 'is one of', 'the best in the country'], '.',
    'Oración de relativo explicativa (no especificativa) con "which", separada por una coma: "its marine biology program, which is one of the best…". "What" no puede funcionar como pronombre relativo después de un sustantivo.',
    { distractors: ['what'] }),
  bs('f07-wr-bs-beach', 'medium', 'Friend', 'Will you join us at the beach tomorrow?',
    ["I'll go", 'only if', 'my sister', 'can drive', 'us there'], '.',
    'Condicional con "only if" (solo si): la condición es imprescindible. "I\'ll go only if my sister can drive us there". "If only" significa "ojalá" y no expresa una condición.',
    { distractors: ['if only'], topic: 'daily-life' }),
  bs('f07-wr-bs-bike-campus', 'medium', 'Classmate', 'Do you still bike to campus every day?',
    ['I do,', 'even though', 'the hill', 'near my apartment', 'is really steep'], '.',
    'Concesión con "even though" (aunque) + oración completa (sujeto + verbo): "even though the hill … is really steep". "Despite" iría seguido de un sustantivo o de un gerundio, no de una oración con verbo conjugado.',
    { distractors: ['despite'], acceptedOrders: [['I do,', 'even though', 'the hill', 'is really steep', 'near my apartment']] }),
  bs('f07-wr-bs-transcript', 'hard', 'Classmate', "The registrar's office just emailed me about my transcript.",
    ['Did they say', 'whether', 'the mistake', 'in your grades', 'has been', 'corrected'], '?',
    'Pregunta indirecta tras "Did they say": la cláusula con "whether" mantiene el orden afirmativo (sujeto + verbo: "whether the mistake … has been corrected"). El verbo concuerda con "the mistake" (singular), no con "grades", por eso "have been" es incorrecto. El complemento "in your grades" también puede ir al final.',
    { distractors: ['have been'], acceptedOrders: [['Did they say', 'whether', 'the mistake', 'has been', 'corrected', 'in your grades']] }),
  bs('f07-wr-bs-tables-outside', 'hard', 'Friend', 'Who are those people setting up tables outside?',
    ['I think', "they're", 'volunteers', 'handing out', 'free tickets', "to tonight's concert"], '.',
    'Oración de relativo reducida con participio presente: "volunteers handing out free tickets" equivale a "volunteers who are handing out free tickets". "Handed out" (participio pasado) tendría sentido pasivo y no encaja aquí.',
    { distractors: ['handed out'] }),
  bs('f07-wr-bs-train', 'hard', 'Friend', 'I almost missed my train this morning.',
    ['If you', 'had missed it,', 'you would', 'have had to', 'wait', 'another hour'], '.',
    'Tercer condicional (irreal en el pasado): "If + past perfect" ("had missed") en la condición y "would have + participio" ("would have had to wait") en el resultado. "Would miss" no sirve en la cláusula con "if" para una situación pasada.',
    { distractors: ['would miss it,'], topic: 'daily-life' }),

  // ---------- Write an Email ----------
  {
    id: 'f07-wr-em-cs-minor',
    form: 7,
    section: 'writing',
    task: 'email',
    title: 'Adding a Computer Science Minor',
    topic: 'campus-life',
    difficulty: 'medium',
    scenario:
      'You are a third-year student, and you want to add a minor in computer science. However, you are not sure you can complete all the required courses before you graduate. You decide to write to your academic advisor.',
    recipient: 'Dr. Priya Nair, your academic advisor',
    subject: 'Question about adding a computer science minor',
    bulletPoints: [
      'Explain why you are interested in the minor.',
      'Ask which courses are required and whether any courses you have already taken will count.',
      'Request a meeting at a specific time next week.',
    ],
    recommendedWords: [80, 140],
    timeLimitSec: 420,
    sampleResponse:
      "Dear Dr. Nair,\n\nI am a third-year economics student, and I am thinking about adding a minor in computer science. Last semester I took an introductory programming class and discovered that I really enjoy writing code to analyze data. I believe these skills would strengthen my applications for jobs in financial analysis.\n\nHowever, I only have three semesters left, so I am worried that I might not finish the minor in time. Could you tell me which courses are required? I have already completed Introduction to Programming and Statistics for Economists; will either of them count toward the minor?\n\nWould you be available to meet next Tuesday at 2 p.m.? If that does not suit you, I am also free on Wednesday morning.\n\nThank you for your help.\n\nBest regards,\nDaniel",
  },

  // ---------- Academic Discussion ----------
  {
    id: 'f07-wr-ad-news-paywalls',
    form: 7,
    section: 'writing',
    task: 'academic-discussion',
    title: 'Paywalls and Quality Journalism',
    topic: 'sociology',
    difficulty: 'medium',
    course: 'Media Studies',
    professor: 'Professor Haddad',
    professorPrompt:
      'Over the past decade, many newspapers have placed their online articles behind paywalls, so readers must buy a subscription to read more than a few stories each month. Supporters argue that subscriptions give news organizations a stable income that pays for careful reporting. Critics worry that paywalls limit access to reliable information for people who cannot afford them. In your opinion, are paywalls the right way to support quality journalism, or should news be freely available to everyone? Explain your reasoning.',
    posts: [
      { author: 'Nina', text: 'Paywalls are necessary. Good reporting costs money: journalists need time to investigate, check facts and travel to where events happen. When news outlets rely only on advertising, they need as many clicks as possible, and that pushes them toward sensational headlines and clickbait. Paying subscribers, on the other hand, expect accurate and thoughtful stories, so paywalls reward quality instead of attention.' },
      { author: 'Tom', text: 'I see it differently. Paywalls create an information gap between people who can pay for several subscriptions and people who cannot. Those readers do not stop following the news; they simply turn to free sources, such as social media posts, that are often less reliable. In the end, this weakens public discussion, because citizens make decisions about elections and health based on poorer information.' },
    ],
    recommendedWords: [100, 150],
    timeLimitSec: 600,
    sampleResponse:
      "I understand Tom's concern about an information gap, but I agree with Nina that paywalls are a reasonable way to fund serious journalism. My main reason is independence. When a newspaper depends on its readers rather than on advertisers, it can publish stories that might upset powerful companies. For example, a local paper investigating pollution from a large factory could lose that factory's advertising, but if most of its income comes from subscribers, it can still publish the story. That said, Tom is right that cost can exclude people, so I think the best model is a flexible paywall. Newspapers could keep urgent news about emergencies and elections free, offer discounted subscriptions to students and low-income readers, and partner with public libraries so that anyone can read articles there. This approach protects the income that quality reporting needs while keeping the most important information open to everyone.",
  },
];
