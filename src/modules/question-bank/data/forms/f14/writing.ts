import type { BuildSentenceSet, Difficulty, Topic, WritingSet } from '../../../types';

/** Simulación n.º 14 — Writing (contenido original). */

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
    form: 14,
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
  bs('f14-wr-bs-first-day-job', 'easy', 'Friend', 'How was your first day at the new job?',
    ['I met', 'my new coworkers', 'and they', 'showed me around', 'the office'], '.',
    'Dos oraciones en pasado simple unidas con "and": "I met my new coworkers and they showed me around the office". Ambos verbos van en pasado; "shows" (presente) no concuerda con el relato en pasado.',
    { distractors: ['shows me around'], topic: 'daily-life' }),
  bs('f14-wr-bs-tired-brother', 'easy', 'Neighbor', 'Why is your brother so tired today?',
    ['He always', 'stays up late', 'when he has', 'an exam'], '.',
    'El adverbio de frecuencia "always" va antes del verbo principal ("He always stays up"), y "when" introduce la oración temporal. Con "he" el verbo lleva -s: "stays", no "stay".',
    { distractors: ['stay up late'], topic: 'daily-life' }),
  bs('f14-wr-bs-tea-or-coffee', 'easy', 'Host', 'Do you want tea or coffee?',
    ['I would', 'like', 'a cup of', 'tea', 'with milk'], '.',
    '"Would like + sustantivo" es la forma cortés de pedir algo: "I would like a cup of tea with milk". Tras el modal "would" va el verbo base sin "to" ("would to like" es incorrecto).',
    { distractors: ['to like'], topic: 'daily-life' }),
  bs('f14-wr-bs-radio-station', 'medium', 'Classmate', 'When did you join the campus radio station?',
    ['I have', 'been', 'a news reporter', 'for', 'three semesters'], '.',
    'Presente perfecto + "for" + periodo de tiempo: "I have been a news reporter for three semesters" (y sigo siéndolo). "Since" se usa con un punto de inicio ("since 2024"), no con una duración.',
    { distractors: ['since'] }),
  bs('f14-wr-bs-old-photograph', 'medium', 'Cousin', 'Who is the man in this old photograph?',
    ["That's", 'my grandfather,', 'whose bakery', 'supplied bread', 'to the whole town'], '.',
    'Oración de relativo con "whose + sustantivo" para expresar posesión: "my grandfather, whose bakery…" (la panadería de mi abuelo). "Who\'s" es la contracción de "who is" y no indica posesión.',
    { distractors: ["who's bakery"], topic: 'daily-life' }),
  bs('f14-wr-bs-paper-notebook', 'medium', 'Classmate', 'Why do you write everything in a notebook?',
    ['I keep', 'paper notes', 'in case', 'my laptop', 'stops working'], '.',
    '"In case" introduce un posible problema para el que uno se prepara, y va seguido de presente: "in case my laptop stops working". No se usa "will" después de "in case".',
    { distractors: ['will stop working'] }),
  bs('f14-wr-bs-conference-city', 'medium', 'Colleague', 'Is the conference in Chicago or Boston this year?',
    ['Actually,', 'neither Chicago', 'nor Boston', 'was selected', 'as the host city'], '.',
    'La estructura correlativa es "neither … nor" (ninguno de los dos): "neither Chicago nor Boston". "Neither" nunca se combina con "or". Con dos sujetos singulares, el verbo va en singular ("was selected").',
    { distractors: ['or Boston'] }),
  bs('f14-wr-bs-part-time', 'hard', 'Classmate', "I'm thinking about switching to a part-time schedule.",
    ['Before you decide,', 'you should', 'check', 'whether', 'your scholarship', 'still covers', 'part-time students'], '.',
    'Pregunta indirecta con "whether" tras "check": "check whether your scholarship still covers…". Dentro de la pregunta incrustada se usa el orden afirmativo (sujeto + verbo), no "does your scholarship cover".'),
  bs('f14-wr-bs-project-quickly', 'hard', 'Teammate', 'How did you finish the project so quickly?',
    ['Having divided', 'the work', 'into smaller tasks,', 'we', 'were able to', 'finish it', 'in two days'], '.',
    'Cláusula de participio perfecto ("Having + participio"): indica una acción terminada antes de la principal y comparte su sujeto ("we"). "Have divided" no puede iniciar esta cláusula sin sujeto.',
    { distractors: ['Have divided'] }),
  bs('f14-wr-bs-bookstore-closing', 'hard', 'Friend', 'Did you hear that the bookstore is closing?',
    ['Yes,', 'the owner', 'told me', 'that she', 'had been', 'losing money', 'for years'], '.',
    'En estilo indirecto con "told me", el tiempo retrocede: "I have been losing money" pasa a "she had been losing money" (pasado perfecto continuo). "Have been" es incorrecto: con el sujeto "she" nunca se usa "have", y además el verbo introductor en pasado pide "had been".',
    { distractors: ['have been'], topic: 'daily-life' }),

  // ---------- Write an Email ----------
  {
    id: 'f14-wr-em-missed-lab',
    form: 14,
    section: 'writing',
    task: 'email',
    title: 'Missing Lab Because of a Fever',
    topic: 'campus-life',
    difficulty: 'medium',
    scenario:
      'You are taking an introductory biology course with a weekly lab session. You missed this week\'s lab because you had a high fever, and the lab report for that experiment is due next week.',
    recipient: 'Ms. Grace Thompson, the teaching assistant for your biology lab',
    subject: "Missed this week's biology lab",
    bulletPoints: [
      "Explain your absence and offer to provide a doctor's note.",
      'Ask how you can make up the missed lab.',
      'Ask for the handouts or data you need to complete the lab report.',
    ],
    recommendedWords: [80, 140],
    timeLimitSec: 420,
    sampleResponse:
      "Dear Ms. Thompson,\n\nI am writing to explain why I missed this week's biology lab on Wednesday. On Tuesday night I developed a high fever, and the doctor at the campus health center told me to stay home for two days. I would be happy to send you a doctor's note if you need one.\n\nI know the lab sessions are required, so I would like to make up the experiment as soon as possible. Would it be possible for me to join another section later this week, or is there a different makeup option?\n\nAlso, could you please send me the handout for the experiment and the data that my lab group collected? I will need both to complete the lab report that is due next week.\n\nThank you very much for your help.\n\nBest regards,\nDaniel Ruiz",
  },

  // ---------- Academic Discussion ----------
  {
    id: 'f14-wr-ad-preservation-housing',
    form: 14,
    section: 'writing',
    task: 'academic-discussion',
    title: 'Historic Buildings or New Housing?',
    topic: 'engineering',
    difficulty: 'medium',
    course: 'Architecture',
    professor: 'Professor Hartley',
    professorPrompt:
      "As cities grow, many of them face a difficult choice. Older neighborhoods often contain historic buildings that are beautiful and meaningful but house relatively few people. Developers argue that replacing some of these buildings with modern apartment blocks is the fastest way to ease housing shortages and lower rents. Preservationists respond that historic architecture is part of a city's identity and cannot be rebuilt once it is gone. When these two goals conflict, which should usually take priority: preserving historic buildings or building new housing? Explain your view.",
    posts: [
      {
        author: 'Olivia',
        text: 'I believe preservation should come first. Historic buildings give a city its identity, and they are a major reason tourists visit places like Prague or Kyoto. Tourism brings jobs and money that benefit everyone. Most importantly, once an old building is torn down, it can never be replaced. New apartments can be built on empty lots or old parking areas instead of on top of our history.',
      },
      {
        author: 'Kevin',
        text: 'I see it differently. Housing shortages hurt real people right now: families pay huge rents, and young workers are forced to move far from their jobs. A city is not a museum. Cities should allow new development in most neighborhoods and protect only their most important landmarks, such as a famous cathedral or an old town hall. Otherwise, preservation rules simply become a way to block change.',
      },
    ],
    recommendedWords: [100, 150],
    timeLimitSec: 600,
    sampleResponse:
      "I agree with Kevin that new housing should usually take priority, although Olivia makes a fair point about identity. In my view, the most basic purpose of a city is to give people a place to live near their work. When there is not enough housing, rents rise so quickly that teachers, nurses, and students can no longer afford to live where they are needed, and that damages a community far more than the loss of an ordinary old building. However, I would add something neither classmate mentioned: the choice is not always all or nothing. Many old warehouses and factories can be converted into apartments, which keeps their historic facades while adding homes. So my position is that housing should come first, but cities should require developers to reuse valuable buildings whenever it is practical.",
  },
];
