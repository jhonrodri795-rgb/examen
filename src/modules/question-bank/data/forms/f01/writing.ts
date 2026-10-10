import type { BuildSentenceSet, Difficulty, Topic, WritingSet } from '../../../types';

/** Simulación n.º 1 — Writing (contenido original). */

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
    form: 1,
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
  bs('f01-wr-bs-coast-trip', 'easy', 'Friend', 'How was your weekend trip to the coast?',
    ['We had', 'a great time,', 'but it', 'rained all day', 'on Sunday'], '.',
    'Pasado simple ("had", "rained") con expresiones de tiempo al final: "all day on Sunday". "Rains" no concuerda con un hecho ya terminado.',
    { distractors: ['rains all day'], topic: 'daily-life' }),
  bs('f01-wr-bs-study-tomorrow', 'easy', 'Classmate', 'Are you free to study together tomorrow afternoon?',
    ["Sorry, I'm meeting", 'my advisor', 'at two,', "but I'm free", 'after four'], '.',
    'Presente continuo para un plan ya acordado en el futuro: "I\'m meeting my advisor at two". "But" introduce la alternativa ("but I\'m free after four").'),
  bs('f01-wr-bs-coffee-shop', 'easy', 'Classmate', 'Which coffee shop near campus do you like better?',
    ['I like', 'the one on Main Street', "because it's", 'cheaper than', 'the others'], '.',
    'Comparativo de un adjetivo corto: "cheap" → "cheaper than". "More cheap than" es incorrecto porque los adjetivos de una sílaba toman -er.',
    { distractors: ['more cheap than'] }),
  bs('f01-wr-bs-neighborhood', 'medium', 'Neighbor', 'How long have you lived in this neighborhood?',
    ["I've lived", 'here', 'since', 'my family', 'moved to town', 'in 2019'], '.',
    'Presente perfecto ("I\'ve lived") + "since" seguido del momento en que empezó la situación ("since my family moved to town in 2019"). "For" se usa con periodos de tiempo, no con un punto de inicio.',
    { distractors: ['for'], topic: 'daily-life' }),
  bs('f01-wr-bs-science-building', 'medium', 'Classmate', 'Who designed the new science building?',
    ['I think', 'it was designed', 'by the same architect', 'who', 'built', 'the art museum'], '.',
    'Pasiva en pasado simple: "it was designed by + agente". La forma activa "it designed" diría que el edificio diseñó algo.',
    { distractors: ['it designed'] }),
  bs('f01-wr-bs-roommate', 'medium', 'Housing advisor', 'What kind of roommate are you looking for?',
    ["I'm looking for", 'someone', 'who keeps', 'the kitchen clean', "and doesn't", 'stay up too late'], '.',
    'Oración de relativo con "who" para personas: "someone who keeps… and doesn\'t stay up…". "Which" se usa para cosas, no para personas.',
    { distractors: ['which keeps'] }),
  bs('f01-wr-bs-poster', 'medium', 'Classmate', "Do you think we'll finish the poster on time?",
    ["We won't", 'make the deadline', 'unless', 'everyone', 'finishes', 'their section by Friday'], '.',
    'Condicional con "unless" (= if not): la cláusula de "unless" va en presente ("unless everyone finishes"), nunca con "will".',
    { distractors: ['will finish'] }),
  bs('f01-wr-bs-tutoring-center', 'hard', 'Classmate', 'The tutoring center moved to a different building.',
    ['Could you', 'tell me', 'how', 'I can get', 'to the new', 'location from here'], '?',
    'Pregunta indirecta tras "Could you tell me": la cláusula mantiene el orden afirmativo sujeto + verbo ("how I can get"), no el orden de pregunta ("how can I get").',
    { distractors: ['can I get'] }),
  bs('f01-wr-bs-textbook', 'hard', 'Classmate', "Why didn't you buy the textbook at the bookstore?",
    ['The copies', 'sold', 'at the bookstore', 'cost', 'twice as much as', 'the ones', 'offered online'], '.',
    'Relativas reducidas con participio pasado: "the copies (that are) sold at the bookstore" y "the ones (that are) offered online". "Selling" tendría sentido activo y no encaja.',
    { distractors: ['selling'] }),
  bs('f01-wr-bs-extra-hour', 'hard', 'Friend', 'What would you do with an extra hour every day?',
    ['If I', 'had', 'an extra hour,', 'I would', 'spend it', 'learning to play', 'the guitar'], '.',
    'Segundo condicional (situación irreal en el presente): "If + pasado simple (had), would + infinitivo (would spend)". "Have" correspondería al primer condicional.',
    { distractors: ['have'], topic: 'daily-life' }),

  // ---------- Write an Email ----------
  {
    id: 'f01-wr-em-flu-extension',
    form: 1,
    section: 'writing',
    task: 'email',
    title: 'Paper Delayed by the Flu',
    topic: 'campus-life',
    difficulty: 'medium',
    scenario:
      'You are taking Introduction to Sociology. You were sick with the flu for a week and could not finish your research paper, which is due in three days.',
    recipient: 'Professor Helen Ortiz, instructor of your Introduction to Sociology course',
    subject: 'Request for an extension on my research paper',
    bulletPoints: [
      'Explain why you were unable to complete the paper on time.',
      'Propose a specific new deadline for submitting it.',
      'Ask whether you may submit the sections you have already finished.',
    ],
    recommendedWords: [90, 150],
    timeLimitSec: 420,
    sampleResponse:
      'Dear Professor Ortiz,\n\nI am writing to ask for a short extension on my research paper for Introduction to Sociology, which is due this Friday. Unfortunately, I had the flu last week and spent most of it in bed with a high fever, so I was unable to work on the paper or attend class. I can provide a note from the campus health center if you need one.\n\nI am feeling much better now, and I believe I could submit a complete, carefully revised paper by next Wednesday. That would give me enough time to finish my analysis and check all of my sources.\n\nIn the meantime, I have already completed the introduction and the literature review. Would it be acceptable for me to submit those sections on Friday so that you can see my progress?\n\nThank you very much for your understanding.\n\nSincerely,\nMaria Lopez',
  },

  // ---------- Academic Discussion ----------
  {
    id: 'f01-wr-ad-community-ties',
    form: 1,
    section: 'writing',
    task: 'academic-discussion',
    title: 'Are Local Community Ties Weakening?',
    topic: 'sociology',
    difficulty: 'medium',
    course: 'Sociology',
    professor: 'Dr. Bennett',
    professorPrompt:
      'This week we have been reading about how social connections have changed over the past century. Some sociologists argue that people today have weaker connections to their local communities than earlier generations did: they know fewer neighbors and take part less often in local clubs and civic groups. Others say that community has not declined but has simply taken new forms, such as online groups and networks built around shared interests. Which view do you find more convincing, and why?',
    posts: [
      {
        author: 'Kelly',
        text: "I think local ties really are weaker. People move often for jobs, so they rarely stay in one place long enough to know their neighbors. My parents grew up on a street where everyone helped each other, but in my apartment building I don't even know the names of the people next door. Free time now goes to screens instead of local clubs or neighborhood groups.",
      },
      {
        author: 'Andrew',
        text: 'In my view, community has changed form, not disappeared. Online groups and hobby networks connect people with shared interests across long distances. When my cousin was diagnosed with a rare illness, an online support group gave her advice and encouragement that no one in her town could offer. These ties provide real support, even if the people involved never meet face to face.',
      },
    ],
    recommendedWords: [100, 150],
    timeLimitSec: 600,
    sampleResponse:
      "I find Kelly's view more convincing, although Andrew is right that online groups can offer real support. My main reason is that local communities provide a kind of help that distant networks cannot. When a storm knocked out the power in my neighborhood last winter, the people who checked on elderly residents and shared their generators were neighbors, not online friends. An online group can give advice, but it cannot bring you soup when you are sick or watch your children in an emergency. In addition, local ties matter for civic life: when people do not know their neighbors, fewer of them attend town meetings or vote in local elections, so shared problems are ignored. Online communities are valuable, but they supplement local ones rather than replace them. For that reason, I believe the decline in local ties is a real loss.",
  },
];
