import type { BuildSentenceSet, Difficulty, Topic, WritingSet } from '../../../types';

/** Simulación n.º 18 — Writing (contenido original). */

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
    form: 18,
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
  bs('f18-wr-bs-tall-man', 'easy', 'Classmate', 'Who is that tall man near the entrance?',
    ['I think', "he's", "my roommate's", 'older brother', 'from Toronto'], '.',
    'Genitivo sajón (possessive \'s): "my roommate\'s older brother" = el hermano mayor de mi compañero de cuarto. Sin apóstrofo ("my roommates") sería un plural, no un posesivo. El poseedor va antes del objeto poseído, al revés que en español ("el hermano de mi compañero").',
    { distractors: ['my roommates'] }),
  bs('f18-wr-bs-last-night-game', 'easy', 'Friend', 'Did you watch the game last night?',
    ['No, I', "didn't have", 'time to watch it', 'because I', 'was working late'], '.',
    'Pasado simple negativo: "didn\'t + verbo en forma base" ("I didn\'t have"). Como "didn\'t" ya marca el pasado, "didn\'t had" es incorrecto. La causa se añade al final con "because I was working late".',
    { distractors: ["didn't had"], topic: 'daily-life' }),
  bs('f18-wr-bs-part-time-job', 'easy', 'Classmate', 'Is it difficult to find a part-time job here?',
    ['It is', 'usually easy', 'to find', 'weekend work', 'at restaurants downtown'], '.',
    'Estructura "It is + adjetivo + to + infinitivo": "It is usually easy to find weekend work". Tras el adjetivo va el infinitivo con "to", no el gerundio ("finding"). El adverbio "usually" se coloca antes del adjetivo.',
    { distractors: ['finding'], topic: 'daily-life' }),
  bs('f18-wr-bs-food-hall', 'medium', 'Friend', 'Have you been to the new food hall downtown?',
    ['Yes,', 'I have', 'already tried', 'the noodle stand', 'on the first floor'], '.',
    'Presente perfecto con "already": "I have already tried". "Already" va entre el auxiliar "have" y el participio "tried". "Already try" no es correcto porque el presente perfecto exige el participio pasado.',
    { distractors: ['already try'], topic: 'daily-life' }),
  bs('f18-wr-bs-hallway', 'medium', 'Classmate', 'Why are you studying in the hallway?',
    ["I'm reviewing", 'my notes', 'while I', 'wait for', 'the exam', 'to start'], '.',
    'Oración temporal con "while" (mientras): "while I wait for the exam to start". Tras "while" va sujeto + verbo; "during" es una preposición y solo puede ir seguida de un sustantivo ("during the exam"), por eso "during I" es incorrecto.',
    { distractors: ['during I'] }),
  bs('f18-wr-bs-exchange-program', 'medium', 'Classmate', 'Do you think I should apply for the exchange program?',
    ['If you', 'apply before March,', 'you will', 'have a better chance', 'of getting', 'a scholarship'], '.',
    'Primer condicional para dar un consejo: "If + presente, will + verbo" ("If you apply before March, you will have…"). "You would" corresponde al segundo condicional (situación hipotética) y no encaja con "apply" en presente.',
    { distractors: ['you would'] }),
  bs('f18-wr-bs-old-job', 'medium', 'Friend', 'Why did you leave your old job?',
    ['Even though', 'the pay', 'was good,', 'the hours', 'were too long', 'for me'], '.',
    'Concesión con "even though" (aunque) + oración completa: "Even though the pay was good, the hours were too long for me". "Despite" es una preposición y no puede ir seguida de sujeto + verbo ("despite the pay was good" es incorrecto).',
    { distractors: ['Despite'], topic: 'daily-life' }),
  bs('f18-wr-bs-bus-schedule', 'hard', 'Classmate', 'The bus schedule changed again this semester.',
    ['Do you know', 'when', 'the new', 'weekend routes', 'are going', 'to start', 'running'], '?',
    'Pregunta indirecta tras "Do you know when…": la cláusula mantiene el orden afirmativo sujeto + verbo ("when the new weekend routes are going to start running"), sin invertir ni añadir el auxiliar "do". Por eso "when do the new routes start" sería incorrecto aquí.',
    { distractors: ['do'] }),
  bs('f18-wr-bs-knee', 'hard', 'Friend', 'What did the doctor tell you about your knee?',
    ['She said', 'that my knee', 'should be', 'rested', 'for at least', 'two weeks', 'before I run again'], '.',
    'Estilo indirecto con modal en pasiva: "She said that my knee should be rested". La pasiva con modal se forma con "modal + be + participio" ("should be rested"); "should been" es incorrecto porque tras un modal va el infinitivo "be".',
    { distractors: ['should been'], topic: 'daily-life' }),
  bs('f18-wr-bs-moving-abroad', 'hard', 'Friend', "Is it true you're moving abroad next year?",
    ['Yes, and', 'wherever', 'I end up', 'living,', "I'll make sure", 'to visit you', 'every summer'], '.',
    'Oración adverbial con "wherever" (dondequiera que): "wherever I end up living, I\'ll make sure to visit you". La cláusula con "wherever" va en presente aunque se refiera al futuro, y la principal usa "will". "Whatever" (lo que sea) no expresa lugar.',
    { distractors: ['whatever'], topic: 'daily-life' }),

  // ---------- Write an Email ----------
  {
    id: 'f18-wr-em-garden-plot',
    form: 18,
    section: 'writing',
    task: 'email',
    title: 'Asking About a Garden Plot',
    topic: 'daily-life',
    difficulty: 'easy',
    scenario:
      'You recently moved to a new neighborhood that has a community garden. You would like to rent a garden plot for the coming season, so you decide to write to the person who coordinates the garden.',
    recipient: 'Mr. Samuel Ortega, coordinator of the neighborhood community garden',
    subject: 'Renting a plot for the coming season',
    bulletPoints: [
      'Introduce yourself and describe any gardening experience you have.',
      'Explain what you would like to grow.',
      'Ask about the rental fee, water access, and whether tools are shared.',
    ],
    recommendedWords: [80, 140],
    timeLimitSec: 420,
    sampleResponse:
      'Dear Mr. Ortega,\n\nMy name is Laura Kim, and I recently moved into an apartment on Birch Avenue, just two blocks from the community garden. I would very much like to rent a plot for the coming season.\n\nAt my previous home, I grew tomatoes and herbs in containers on my balcony for three years, so I know how to care for plants, although I have never worked with a full plot.\n\nThis season, I would like to grow tomatoes, peppers, and lettuce, and perhaps a row of sunflowers along one edge.\n\nCould you tell me how much the rental fee is and when it must be paid? I would also like to know whether there is a water tap near the plots. Finally, are tools shared among members, or should I bring my own?\n\nThank you for your time. I look forward to hearing from you.\n\nBest regards,\nLaura Kim',
  },

  // ---------- Academic Discussion ----------
  {
    id: 'f18-wr-ad-white-lies',
    form: 18,
    section: 'writing',
    task: 'academic-discussion',
    title: 'Small Lies to Spare Feelings',
    topic: 'psychology',
    difficulty: 'medium',
    course: 'Ethics',
    professor: 'Dr. Hayes',
    professorPrompt:
      "This week we have been discussing honesty and its limits. Most ethical traditions treat truthfulness as an important value, yet in everyday life people often tell small lies to spare others' feelings, such as praising a gift they secretly dislike. Some philosophers see these white lies as harmless courtesy, while others argue that any deception weakens trust. What do you think? Is it ever right to tell a small lie to protect someone's feelings, or should we always tell the truth even when it hurts? Explain your view.",
    posts: [
      {
        author: 'Anna',
        text: 'I think small, kind lies are acceptable. If a friend spends all afternoon cooking dinner for me, telling her I love the meal protects our relationship and causes no real harm. The purpose of honesty is to help people, not to hurt them, so when the truth has no practical value, kindness should come first.',
      },
      {
        author: 'Jacob',
        text: 'I disagree. Even kind lies damage trust over time. If my friends always say they love my cooking, how can I believe them when they praise something important, like my job application? People deserve honest feedback so they can improve, and the truth can always be delivered gently, for example by mentioning what was good before suggesting changes.',
      },
    ],
    recommendedWords: [100, 150],
    timeLimitSec: 600,
    sampleResponse:
      "I mostly agree with Jacob, although Anna makes a fair point about kindness. In my view, the problem with small lies is that they rarely stay small. For example, when I was in high school, my friends kept telling me that my singing was wonderful, so I signed up for a talent show and was embarrassed in front of the whole school. A little honest feedback earlier would have saved me from that moment. That said, I think there is a difference between lying and choosing what to emphasize. If a friend cooks a meal I don't enjoy, I don't need to criticize it; I can sincerely thank her for the effort and praise the dish I liked most. This approach respects people's feelings without deceiving them, so it protects both the friendship and the trust that Jacob is worried about.",
  },
];
