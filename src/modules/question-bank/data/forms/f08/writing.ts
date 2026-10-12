import type { BuildSentenceSet, Difficulty, Topic, WritingSet } from '../../../types';

/** Simulación n.º 8 — Writing (contenido original). */

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
    form: 8,
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
  bs('f08-wr-bs-cousin-wedding', 'easy', 'Friend', "How did you get to your cousin's wedding?",
    ['We', 'flew there,', 'and my aunt', 'gave us', 'a ride from the airport'], '.',
    'Pasado simple de verbos irregulares: "fly → flew" y "give → gave". "Gived" no existe: "give" es irregular y no admite la terminación -ed.',
    { distractors: ['gived us'], topic: 'daily-life' }),
  bs('f08-wr-bs-football-saturday', 'easy', 'Friend', 'Are you going to the football game on Saturday?',
    ["I'd like to,", 'but I', 'need to finish', 'my lab report', 'by Monday'], '.',
    '"Need to + infinitivo" expresa obligación o necesidad: "I need to finish". "Need finish" (sin "to") es un calco del español "necesito terminar" y es incorrecto con "need" como verbo principal.',
    { distractors: ['need finish'], topic: 'daily-life' }),
  bs('f08-wr-bs-cafe-seating', 'easy', 'Neighbor', 'Does the new café have outdoor seating?',
    ['Yes, it has', 'tables', 'both inside', 'and on', 'the patio'], '.',
    'Estructura correlativa "both ... and" (tanto ... como): "both inside and on the patio". "Both" siempre se combina con "and", nunca con "or".',
    { distractors: ['or on'], topic: 'daily-life' }),
  bs('f08-wr-bs-documentary', 'medium', 'Friend', 'What was the documentary about?',
    ['It was about', 'a remote island', 'where scientists', 'study', 'endangered seabirds'], '.',
    'Oración de relativo con "where" para referirse a un lugar: "an island where scientists study seabirds". "Which" no sirve aquí porque la oración relativa ya tiene sujeto y objeto completos.',
    { distractors: ['which scientists'], topic: 'daily-life' }),
  bs('f08-wr-bs-drive-to-work', 'medium', 'Coworker', 'Do you drive to work every day?',
    ['No, I', 'usually take', 'the subway', 'instead of', 'driving'], '.',
    '"Instead of" es una preposición, así que va seguida de gerundio (-ing): "instead of driving". "Instead of drive" es incorrecto.',
    { distractors: ['drive'], topic: 'daily-life' }),
  bs('f08-wr-bs-library-built', 'medium', 'Visitor', 'When was this library built?',
    ['I think', 'it was', 'built', 'in the 1920s,', 'but it was', 'renovated recently'], '.',
    'Pasiva en pasado simple: "was + participio" ("was built", "was renovated"), con el complemento de tiempo al final ("in the 1920s"). "Builded" no existe: el participio de "build" es "built".',
    { distractors: ['builded'] }),
  bs('f08-wr-bs-vocabulary', 'medium', 'Classmate', 'How do you remember all the new vocabulary?',
    ['Writing', 'new words', 'on flashcards', 'helps me', 'remember them'], '.',
    'Gerundio como sujeto: "Writing new words on flashcards" funciona como un sujeto singular, por eso el verbo es "helps" (no "help"). Tras "help me" va el infinitivo sin "to": "helps me remember".',
    { distractors: ['help me'] }),
  bs('f08-wr-bs-research-assistant', 'hard', 'Classmate', "I'm thinking of applying for the research assistant position.",
    ['Me too,', 'but I', 'wonder', 'whether', 'the position', 'is', 'open to first-year students'], '.',
    'Pregunta indirecta con "whether" después de "wonder": la cláusula mantiene el orden afirmativo sujeto + verbo ("whether the position is open"), no el orden de pregunta ("whether is the position").',
    { distractors: ['does'] }),
  bs('f08-wr-bs-apartment-heating', 'hard', 'Roommate', 'The heating in our apartment stopped working again.',
    ['I think', 'the whole system', 'should be', 'checked', 'by a professional', 'before winter'], '.',
    'Pasiva con modal: "should be + participio" ("should be checked"). Después de "be" nunca va el infinitivo ("should be check" es incorrecto). El agente ("by a professional") y el tiempo ("before winter") pueden ir en cualquier orden al final.',
    { distractors: ['check'], acceptedOrders: [['I think', 'the whole system', 'should be', 'checked', 'before winter', 'by a professional']], topic: 'daily-life' }),
  bs('f08-wr-bs-soccer-confident', 'hard', 'Friend', 'Why does the soccer team seem so confident?',
    ['What', 'makes them', 'so confident', 'is', 'that they', "haven't lost", 'a single game'], '.',
    'Cláusula nominal con "what" como sujeto: "What makes them so confident" es el sujeto de "is". Dentro de la cláusula, "what" es singular, por eso el verbo es "makes" (no "make").',
    { distractors: ['make them'], topic: 'daily-life' }),

  // ---------- Write an Email ----------
  {
    id: 'f08-wr-em-night-shift-roommate',
    form: 8,
    section: 'writing',
    task: 'email',
    title: "A Roommate's Night Shifts",
    topic: 'campus-life',
    difficulty: 'medium',
    scenario:
      'You live in a university residence hall. Your roommate works night shifts and comes home very late, which makes it hard for you to sleep before your early morning classes.',
    recipient: 'The Residence Life Office',
    subject: 'Request for a room change',
    bulletPoints: [
      'Describe the situation and how long it has been happening.',
      'Explain what you and your roommate have already tried.',
      'Request a specific solution, such as moving to another room.',
    ],
    recommendedWords: [80, 140],
    timeLimitSec: 420,
    sampleResponse:
      "Dear Residence Life Office,\n\nMy name is Daniela Ruiz, and I live in Room 314 of Oakwood Hall. For the past five weeks, my roommate has been working night shifts at a hospital, and she usually comes home around two in the morning. Although she tries to be quiet, the door and lights wake me up almost every night, and I have 8 a.m. classes four days a week.\n\nWe have discussed this several times. She now gets ready for bed in the bathroom, and I bought earplugs and a sleep mask, but I still lose two or three hours of sleep each night.\n\nWould it be possible for me to move to another room, ideally with a roommate who keeps a similar schedule? I would be happy to discuss the options.\n\nThank you.\n\nSincerely,\nDaniela Ruiz",
  },

  // ---------- Academic Discussion ----------
  {
    id: 'f08-wr-ad-sugary-drink-tax',
    form: 8,
    section: 'writing',
    task: 'academic-discussion',
    title: 'Taxing Sugary Drinks',
    topic: 'economics',
    difficulty: 'medium',
    course: 'Public Health',
    professor: 'Dr. Patel',
    professorPrompt:
      "Over the past decade, a number of countries and cities have introduced a special tax on sugary drinks such as sodas and sweetened juices. The goal is to make these drinks more expensive so that people consume less sugar, which could lower rates of obesity, diabetes, and tooth decay. Critics, however, question whether these taxes really change people's diets and whether they place an unfair burden on some groups. In your opinion, is a tax on sugary drinks an effective and fair public health policy? Why or why not?",
    posts: [
      { author: 'Aisha', text: 'I think the tax works. When prices rise, people buy fewer sodas, especially teenagers, who are very sensitive to price. In several places that introduced the tax, sales of sugary drinks dropped noticeably within a year. Another advantage is that the money collected can pay for health and nutrition programs, such as free water fountains in schools.' },
      { author: 'Ben', text: 'In my view, the tax is unfair. Low-income families spend a bigger share of their budget on food and drinks, so they end up paying the most. It also ignores the deeper causes of poor diets, like a lack of time, money, or nearby grocery stores. Better nutrition education and healthier school meals would improve public health more effectively.' },
    ],
    recommendedWords: [100, 150],
    timeLimitSec: 600,
    sampleResponse:
      "I believe a sugary drink tax can be both effective and fair if it is designed carefully. Aisha is right that higher prices reduce consumption, but I think the most important effect is on companies rather than consumers. When the United Kingdom introduced a tax based on the amount of sugar in each drink, many manufacturers reduced the sugar in their recipes to avoid paying it. As a result, people consumed less sugar without having to change their habits at all. I understand Ben's concern that low-income families pay more, but these families also suffer the most from diet-related diseases, so they benefit the most from lower sugar intake. Moreover, if the revenue is used to fund healthier school meals, as Ben suggests, the tax and nutrition education can work together instead of being alternatives.",
  },
];
