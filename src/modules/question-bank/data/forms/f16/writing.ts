import type { BuildSentenceSet, Difficulty, Topic, WritingSet } from '../../../types';

/** Simulación n.º 16 — Writing (contenido original). */

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
    form: 16,
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
  bs('f16-wr-bs-summer-trip', 'easy', 'Classmate', 'Where did you spend your summer vacation?',
    ['I visited', 'my grandparents', 'in Peru', 'two months ago'], '.',
    'Con "ago" se usa el pasado simple ("I visited … two months ago"), nunca el presente perfecto: "I have visited … ago" es incorrecto. La expresión temporal también puede ir al principio: "Two months ago I visited my grandparents in Peru".',
    {
      distractors: ['I have visited'],
      acceptedOrders: [
        ['two months ago', 'I visited', 'my grandparents', 'in Peru'],
        ['I visited', 'my grandparents', 'two months ago', 'in Peru'],
      ],
      topic: 'daily-life',
    }),
  bs('f16-wr-bs-sandwich', 'easy', 'Coworker', "Why aren't you eating your sandwich?",
    ['The bread', "isn't", 'fresh enough', 'to eat'], '.',
    '"Enough" va después del adjetivo y antes del infinitivo: "fresh enough to eat". "Enough fresh" es un error típico de hispanohablantes (con sustantivos sí va delante: "enough time").',
    { distractors: ['enough fresh'], topic: 'daily-life' }),
  bs('f16-wr-bs-meet-earlier', 'easy', 'Classmate', "Could we meet earlier than three o'clock?",
    ['Why', "don't we", 'meet at noon', 'in the library'], '?',
    'Sugerencia con "Why don\'t we + infinitivo sin to": "Why don\'t we meet at noon…?". Aunque sea una propuesta, mantiene el orden de pregunta (auxiliar antes del sujeto); "Why we don\'t" es incorrecto.',
    { distractors: ["we don't"] }),
  bs('f16-wr-bs-old-theater', 'medium', 'Neighbor', 'Is it true that the old theater downtown closed?',
    ['Yes, it', 'was sold', 'to a company', 'that plans', 'to build apartments'], '.',
    'Pasiva en pasado simple: "was + participio" ("it was sold to a company"). "Was sell" no es una forma válida. La oración relativa "that plans to build apartments" describe a "a company".',
    { distractors: ['was sell'], topic: 'daily-life' }),
  bs('f16-wr-bs-public-speaking', 'medium', 'Classmate', 'How did you improve your public speaking skills?',
    ['I got better', 'by recording', 'my practice talks', 'and watching', 'them later'], '.',
    '"By + gerundio" expresa el método: "by recording … and watching them later". Tras una preposición el verbo va en -ing, por eso "by record" es incorrecto; los dos gerundios se coordinan con "and".',
    { distractors: ['by record'] }),
  bs('f16-wr-bs-vacation-request', 'medium', 'Friend', 'What did your manager say about your vacation request?',
    ['She said', 'that I', 'could take', 'two weeks off', 'in July'], '.',
    'Estilo indirecto: "She said that I could take…" ("can" pasa a "could" tras un verbo en pasado). Después de "could" va el infinitivo sin "to", por eso "could took" es incorrecto.',
    { distractors: ['could took'], topic: 'daily-life' }),
  bs('f16-wr-bs-safe-neighborhood', 'medium', 'New neighbor', 'Is this neighborhood safe at night?',
    ['Although', "it's usually quiet,", 'you should', 'avoid walking alone', 'after midnight'], '.',
    'La concesión con "Although" va primero y se separa con coma ("Although it\'s usually quiet,"); después viene el consejo con "you should". "Avoid" exige gerundio ("avoid walking"), no infinitivo ("avoid to walk").',
    {
      distractors: ['avoid to walk alone'],
      acceptedOrders: [['Although', "it's usually quiet,", 'after midnight', 'you should', 'avoid walking alone']],
      topic: 'daily-life',
    }),
  bs('f16-wr-bs-club-room', 'hard', 'Club president', 'We need to book a room for the club meeting.',
    ['Can you', 'remind me', 'how far', 'in advance', 'we have to', 'reserve it'], '?',
    'Pregunta indirecta tras "Can you remind me": la parte incrustada usa orden afirmativo ("how far in advance we have to reserve it"), sin el auxiliar "do". "Do we have to" sería el orden de una pregunta directa.',
    { distractors: ['do we have to'] }),
  bs('f16-wr-bs-trip-photos', 'hard', 'Classmate', 'The photos from the field trip look amazing!',
    ['I especially like', 'the one', 'showing', 'all of us', 'at the top', 'of the waterfall'], '.',
    'Oración de relativo reducida con participio presente: "the one showing all of us…" equivale a "the one that shows all of us…". "Shown" (participio pasado) tendría sentido pasivo y no encaja.',
    { distractors: ['shown'] }),
  bs('f16-wr-bs-london-offer', 'hard', 'Friend', "Why didn't you take the job offer in London?",
    ['If I', 'had accepted it,', 'I would', 'be living', 'far from my family', 'right now'], '.',
    'Condicional mixto: condición en el pasado ("If I had accepted it") con resultado en el presente ("I would be living … right now"). "Have accepted" no es correcto tras "If I" en este tipo de condicional.',
    {
      distractors: ['have accepted it,'],
      acceptedOrders: [['If I', 'had accepted it,', 'right now', 'I would', 'be living', 'far from my family']],
      topic: 'daily-life',
    }),

  // ---------- Write an Email ----------
  {
    id: 'f16-wr-em-course-login',
    form: 16,
    section: 'writing',
    task: 'email',
    title: 'Locked Out Before a Deadline',
    topic: 'campus-life',
    difficulty: 'medium',
    scenario:
      'Since yesterday, you have not been able to log in to your university\'s online course system. An important assignment for one of your courses must be submitted through the system by tomorrow night.',
    recipient: 'The university IT Help Desk',
    subject: 'Urgent: unable to log in to the online course system',
    bulletPoints: [
      'Describe the error message and when the problem started.',
      'List the steps you have already tried.',
      'Explain why the problem is urgent and ask for help as soon as possible.',
    ],
    recommendedWords: [80, 140],
    timeLimitSec: 420,
    sampleResponse:
      'Dear IT Help Desk,\n\nI am writing because I cannot log in to the online course system. The problem started yesterday at around 6 p.m. Every time I enter my username and password, the message "Authentication failed: account not recognized" appears.\n\nI have already tried several solutions. I reset my password twice, cleared my browser\'s cache, and tried logging in from two different browsers and from my phone, but the same error appears every time.\n\nThis is urgent because I have a major assignment for my statistics course due tomorrow at 11:59 p.m., and it can only be submitted through the system. Could you please check my account as soon as possible? I can be reached at 555-0172 at any time.\n\nThank you for your help.\n\nSincerely,\nDaniel Ortiz',
  },

  // ---------- Academic Discussion ----------
  {
    id: 'f16-wr-ad-deep-sea-mining',
    form: 16,
    section: 'writing',
    task: 'academic-discussion',
    title: 'Mining the Deep Ocean Floor',
    topic: 'environment',
    difficulty: 'medium',
    course: 'Marine Biology',
    professor: 'Dr. Okafor',
    professorPrompt:
      'The batteries in electric vehicles depend on metals such as nickel, cobalt, and manganese. Several companies now want to collect these metals from the deep ocean floor, where potato-sized rocks called nodules lie scattered across plains thousands of meters below the surface. Supporters argue that this could supply the clean-energy transition with less harm than mining on land. Opponents warn that the deep sea is one of the least understood environments on Earth. Should deep-sea mining be allowed? Why or why not?',
    posts: [
      {
        author: 'Rachel',
        text: 'Yes, but only with strict rules. Clean energy needs these metals, and demand is growing fast. Mining on land also has serious costs: it destroys forests, pollutes rivers, and sometimes forces whole communities to move. If international agencies set clear limits and monitor every project, careful mining on the ocean floor could actually be less harmful overall than opening new mines on land.',
      },
      {
        author: 'Liam',
        text: "No, I don't think it should be allowed. Scientists know very little about deep-sea ecosystems, and many species living there have never even been described. Animals in the deep ocean grow and reproduce very slowly, so any damage there could be permanent. Before taking that risk, we should improve battery recycling and recover the metals already sitting in old phones, laptops, and car batteries.",
      },
    ],
    recommendedWords: [100, 150],
    timeLimitSec: 600,
    sampleResponse:
      "I understand Rachel's point that mining on land causes real harm, but I agree with Liam that deep-sea mining should not be allowed yet. One reason that has not been mentioned is that the damage would not stay in one place. When machines scrape the seafloor, they stir up huge clouds of sediment that currents can carry for many kilometers, possibly burying animals far from the mining site. In other words, even a small, carefully regulated project could affect a much larger area than its permit covers. Unlike a damaged forest, the deep ocean cannot simply be replanted, so the risk is too high. Instead, governments could require manufacturers to design batteries that are easier to recycle and fund research on batteries made from more common materials, such as sodium. If scientists later show that the damage can be limited, the question could be reconsidered.",
  },
];
