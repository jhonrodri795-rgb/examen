import type { BuildSentenceSet, Difficulty, Topic, WritingSet } from '../../../types';

/** Simulación n.º 12 — Writing (contenido original). */

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
    form: 12,
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
  bs('f12-wr-bs-fresh-fruit', 'easy', 'Neighbor', 'Do you know a good place to buy fresh fruit?',
    ['There is', 'a small', "farmers' market", 'behind the library', 'every Saturday morning'], '.',
    '"There is" + sustantivo singular ("a small farmers\' market"); después van el lugar ("behind the library") y el tiempo ("every Saturday morning"). "There are" no concuerda con un sustantivo singular. También se acepta poner el tiempo antes del lugar.',
    {
      distractors: ['There are'],
      acceptedOrders: [['There is', 'a small', "farmers' market", 'every Saturday morning', 'behind the library']],
      topic: 'daily-life',
    }),
  bs('f12-wr-bs-favorite-season', 'easy', 'Friend', 'Which season do you like best?',
    ['Autumn is', 'the most', 'colorful season', 'in my hometown'], '.',
    'Superlativo de adjetivos largos: "the most + adjetivo + sustantivo" ("the most colorful season"). "The more" es comparativo y no sirve aquí.',
    { distractors: ['the more'], topic: 'daily-life' }),
  bs('f12-wr-bs-homework-dinner', 'easy', 'Roommate', 'Did you finish your homework before dinner?',
    ['No, I was', 'still solving', 'the last problem', 'when', 'dinner was ready'], '.',
    'Pasado continuo ("I was still solving") para una acción en curso que se ve interrumpida por otra en pasado simple, introducida con "when" ("when dinner was ready"). "Still solved" no forma el pasado continuo.',
    { distractors: ['still solved'], topic: 'daily-life' }),
  bs('f12-wr-bs-city-life', 'medium', 'Classmate', 'Have you always lived in the city?',
    ['No, I', 'used to', 'live on', 'a small farm', 'about an hour', 'from here'], '.',
    '"Used to + infinitivo" expresa una situación pasada que ya no es verdad ("I used to live on a small farm"). "Am used to" significa "estar acostumbrado" y exige -ing, así que no encaja.',
    { distractors: ['am used to'], topic: 'daily-life' }),
  bs('f12-wr-bs-useful-workshop', 'medium', 'Classmate', 'What made the workshop so useful?',
    ['The speaker', 'gave us', 'practical tips', 'that we', 'can use', 'right away'], '.',
    'Oración de relativo con "that": "practical tips that we can use right away". El relativo va justo después del sustantivo que describe; "what" no puede funcionar como relativo detrás de un sustantivo.',
    { distractors: ['what we'] }),
  bs('f12-wr-bs-flight-lands', 'medium', 'Friend', 'Will you call me when your flight lands?',
    ["Sure, I'll", 'call you', 'as soon as', 'I get off', 'the plane'], '.',
    'Oración temporal con "as soon as": el verbo de la oración principal va en futuro ("I\'ll call you"), pero el de la oración temporal va en presente ("as soon as I get off"), nunca con "will".',
    { distractors: ["I'll get off"], topic: 'daily-life' }),
  bs('f12-wr-bs-bike-path', 'medium', 'Neighbor', 'Why is the city building a new bike path?',
    ['I think', "they're building it", 'in order to', 'reduce traffic', 'around the campus'], '.',
    '"In order to + infinitivo" expresa finalidad: "in order to reduce traffic". Después de "to" va el verbo en forma base, no en -ing ("reducing").',
    { distractors: ['reducing traffic'], topic: 'daily-life' }),
  bs('f12-wr-bs-package-door', 'hard', 'Roommate', 'Someone left a package outside our door.',
    ['Do you', 'know', 'what time', 'the delivery driver', 'dropped', 'it off'], '?',
    'Pregunta indirecta tras "Do you know": la cláusula interrogativa usa orden de oración afirmativa ("what time the delivery driver dropped it off"), sin el auxiliar "did".',
    { distractors: ['did'], topic: 'daily-life' }),
  bs('f12-wr-bs-survey-results', 'hard', 'Classmate', 'Have the results of the student survey come out?',
    ['Not yet, but', 'a summary', 'has already', 'been shared', 'with', 'the student council'], '.',
    'Presente perfecto pasivo: "has (already) been + participio" ("has already been shared"). El resumen recibe la acción, por eso se usa la pasiva; "been sharing" sería una forma continua activa.',
    { distractors: ['been sharing'] }),
  bs('f12-wr-bs-library-midnight', 'hard', 'Classmate', 'The library is staying open until midnight this week.',
    ['Really? I thought', 'it was', 'supposed to', 'close early', 'because of', 'the renovations'], '.',
    '"Was supposed to + infinitivo" expresa algo que se esperaba en el pasado y no ocurrió ("I thought it was supposed to close early"). La forma correcta es "supposed", con -d, aunque al hablar casi no se oiga.',
    { distractors: ['suppose to'] }),

  // ---------- Write an Email ----------
  {
    id: 'f12-wr-em-birthday-dinner',
    form: 12,
    section: 'writing',
    task: 'email',
    title: 'Praise for a Birthday Dinner',
    topic: 'daily-life',
    difficulty: 'medium',
    scenario:
      "Last weekend, you celebrated a friend's birthday at a local restaurant. Your server went out of her way to make the dinner special, but booking the table on the restaurant's website was confusing.",
    recipient: 'The manager of the restaurant',
    subject: "Thank you for a wonderful birthday dinner",
    bulletPoints: [
      'Describe your visit and the occasion.',
      'Praise the server and explain specifically what she did.',
      'Suggest an improvement to the online reservation system.',
    ],
    recommendedWords: [100, 150],
    timeLimitSec: 420,
    sampleResponse:
      "Dear Manager,\n\nLast Friday evening, I celebrated my best friend Laura's twenty-first birthday at your restaurant with five other friends. It was a memorable night, and I wanted to tell you why.\n\nOur server, Megan, went far beyond what we expected. When she heard that it was Laura's birthday, she brought out a small cake with a candle, and several staff members sang to her. She also recommended dishes that were safe for two guests with food allergies, and she checked on us regularly without ever making us feel rushed.\n\nHowever, booking the table online was confusing. The website did not show whether a table for seven was available, and I received two confirmation emails with different times. A calendar that displays open tables and a single, clear confirmation message would make the process much easier.\n\nThank you again for a wonderful evening.\n\nSincerely,\nDaniel Ortiz",
  },

  // ---------- Academic Discussion ----------
  {
    id: 'f12-wr-ad-mandatory-voting',
    form: 12,
    section: 'writing',
    task: 'academic-discussion',
    title: 'Should Voting Be Compulsory?',
    topic: 'sociology',
    difficulty: 'medium',
    course: 'Political Science',
    professor: 'Dr. Okafor',
    professorPrompt:
      'In most democracies, voting is a right that citizens may choose to use or ignore. A few countries, however, such as Australia and Belgium, legally require citizens to vote in national elections. Supporters say that compulsory voting raises participation and makes governments more representative. Critics reply that it limits personal freedom and may encourage careless choices. What is your view? Should voting be mandatory in all democracies? Support your opinion with specific reasons or examples.',
    posts: [
      {
        author: 'Samuel',
        text: 'Yes, I think voting should be mandatory. When participation is voluntary, the people who vote tend to be older, wealthier, or part of well-organized groups, so politicians pay most attention to them. If everyone has to vote, election results reflect the whole population rather than only the most motivated citizens. Politicians would then have to address the issues that matter to young and low-income voters too.',
      },
      {
        author: 'Yuki',
        text: 'I disagree. Forcing people to vote does not make them informed. Someone with no interest in politics might simply pick a name at random to avoid a fine, and those random votes could decide a close election. Besides, in a free society, the right to vote should also include the right not to vote. Choosing to stay home can itself be a form of political expression.',
      },
    ],
    recommendedWords: [100, 150],
    timeLimitSec: 600,
    sampleResponse:
      "I understand Yuki's concern about uninformed voters, but I agree with Samuel that mandatory voting would strengthen democracies. One reason that has not been mentioned yet is that compulsory voting changes the way campaigns work. When turnout is voluntary, parties spend enormous amounts of money just persuading their own supporters to show up, and they often rely on fear or anger to do it. If everyone must vote, campaigns can focus instead on convincing undecided citizens with real policy arguments. Australia is a good example: voting there has been compulsory for about a century, and turnout is usually around ninety percent. As for Yuki's point about freedom, ballots are secret, so a citizen who rejects every candidate can still hand in a blank ballot. In my opinion, a small obligation to participate is a reasonable price for a government that truly represents everyone.",
  },
];
