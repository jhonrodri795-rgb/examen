import type { BuildSentenceSet, Difficulty, Topic, WritingSet } from '../../../types';

/** Simulación n.º 10 — Writing (contenido original). */

function bs(
  id: string,
  difficulty: Difficulty,
  topic: Topic,
  speaker: string,
  context: string,
  chunks: string[],
  endPunctuation: '.' | '?',
  explanation: string,
  extra: Partial<Pick<BuildSentenceSet, 'distractors' | 'acceptedOrders'>> = {},
): BuildSentenceSet {
  return {
    id,
    form: 10,
    section: 'writing',
    task: 'build-sentence',
    title: context,
    topic,
    difficulty,
    context: { speaker, text: context },
    chunks,
    endPunctuation,
    explanation,
    ...extra,
  };
}

export const sets: WritingSet[] = [
  // ---------- Build a Sentence ----------
  bs('f10-wr-bs-breakfast', 'easy', 'daily-life', 'Roommate', 'Did you eat breakfast this morning?',
    ['No, I', 'almost never', 'eat breakfast', 'before my', 'morning classes'], '.',
    'Adverbio de frecuencia con presente simple: "almost never" va entre el sujeto y el verbo principal ("I almost never eat"). Con sujeto "I" el verbo no lleva -s, por eso sobra "eats breakfast".',
    { distractors: ['eats breakfast'] }),
  bs('f10-wr-bs-laptops', 'easy', 'daily-life', 'Friend', 'Which of these two laptops should I buy?',
    ['Get the gray one', 'because it', 'is much lighter', 'than the', 'other model'], '.',
    'Comparativo de superioridad con "than": "lighter than the other model". "Much" refuerza el comparativo. "More lighter" es incorrecto porque "light" ya forma el comparativo con -er.',
    { distractors: ['more lighter'] }),
  bs('f10-wr-bs-station', 'easy', 'daily-life', 'Friend', 'Can you meet me at the station at noon?',
    ['Sorry, I', "won't be able", 'to get there', 'until one'], '.',
    '"Be able to" sustituye a "can" en futuro: "I won\'t be able to get there". "Won\'t can" no existe en inglés, porque "can" no tiene forma de futuro.',
    { distractors: ["won't can"] }),
  bs('f10-wr-bs-lighthouse', 'medium', 'daily-life', 'Friend', 'Have you ever visited the old lighthouse?',
    ['No, I', 'have never', 'been inside it,', "but I'd love", 'to go'], '.',
    'Presente perfecto de experiencia con "never": "I have never been inside it" (nunca en mi vida). "Never went" es pasado simple y no encaja con la estructura "have…".',
    { distractors: ['never went'] }),
  bs('f10-wr-bs-welcome-speech', 'medium', 'campus-life', 'Classmate', 'Who is the student giving the welcome speech?',
    ["She's the", 'junior', 'who won', 'the poetry prize', 'last spring'], '.',
    'Oración de relativo con "who" para personas: "the junior who won the poetry prize". "Which" se usa para cosas, por eso sobra "which won".',
    { distractors: ['which won'] }),
  bs('f10-wr-bs-group-survey', 'medium', 'campus-life', 'Classmate', 'Did you finish the group survey yet?',
    ['Almost, but', 'I need to', 'proofread it', 'before sending', 'it to everyone'], '.',
    'Tras una preposición como "before" se usa el gerundio (-ing): "before sending it". "Before send" es incorrecto porque la preposición no admite el infinitivo sin "to".',
    { distractors: ['before send'] }),
  bs('f10-wr-bs-quieter-dorm', 'medium', 'campus-life', 'Classmate', 'Why did you move to a quieter dorm?',
    ['My old building', 'was so', 'noisy that', 'I could never', 'get any sleep'], '.',
    'Estructura de resultado "so + adjetivo + that": "so noisy that I could never get any sleep". "Such" necesita un sustantivo ("such a noisy building"), por eso sobra "such noisy".',
    { distractors: ['such noisy'] }),
  bs('f10-wr-bs-financial-aid', 'hard', 'campus-life', 'Classmate', 'I just got an email from the financial aid office.',
    ['Did they', 'ask', 'whether you', 'had already', 'sent in', 'your tax documents'], '?',
    'Pregunta referida con "whether": tras "ask whether" se usa el orden afirmativo (sujeto + verbo) y el pasado perfecto por el cambio de tiempo: "whether you had already sent in…". "Whether had you" invierte el orden por error.',
    { distractors: ['whether had you'] }),
  bs('f10-wr-bs-internship', 'hard', 'campus-life', 'Classmate', 'Are you still looking for a summer internship?',
    ['Actually, I', 'have just', 'been offered', 'a position', 'at a small', 'design studio downtown'], '.',
    'Presente perfecto pasivo: "have + been + participio" ("I have just been offered a position"). "Been offer" es incorrecto porque falta el participio "offered".',
    { distractors: ['been offer'] }),
  bs('f10-wr-bs-student-government', 'hard', 'campus-life', 'Classmate', 'Would you ever run for student government?',
    ['If I', 'had', 'more free time,', 'I would', 'definitely', 'consider running'], '.',
    'Segundo condicional (situación irreal en el presente): "If + pasado simple, would + infinitivo" ("If I had more free time, I would…"). "I will" corresponde al primer condicional y no concuerda con "had".',
    { distractors: ['I will'] }),

  // ---------- Write an Email ----------
  {
    id: 'f10-wr-em-barking-dog',
    form: 10,
    section: 'writing',
    task: 'email',
    title: "A Neighbor's Barking Dog",
    topic: 'daily-life',
    difficulty: 'medium',
    scenario:
      "You recently moved into a new apartment. Your neighbor's dog barks for hours every afternoon while she is at work, which makes it difficult for you to study at home.",
    recipient: 'Mrs. Patel, your neighbor in the apartment next door',
    subject: 'A friendly note about afternoon noise',
    bulletPoints: [
      'Introduce yourself politely.',
      'Describe the problem and how it affects you.',
      'Suggest a friendly solution you could both agree on.',
    ],
    recommendedWords: [80, 140],
    timeLimitSec: 420,
    sampleResponse:
      "Dear Mrs. Patel,\n\nMy name is Lucía Romero, and I moved into apartment 4B, right next to yours, about two months ago. I hope you are enjoying the building as much as I am.\n\nI wanted to mention something I have noticed. On weekday afternoons, while you are at work, your dog barks for long periods, often from about one o'clock until five. I am a university student and do most of my studying at home in the afternoons, so the noise makes it hard for me to concentrate, especially before exams.\n\nI am sure you were not aware of this, and I would like to find a solution that works for both of us. Perhaps a dog walker could take him out in the early afternoon, or I could keep him company for a while on my study breaks. Please let me know what you think.\n\nKind regards,\nLucía",
  },

  // ---------- Academic Discussion ----------
  {
    id: 'f10-wr-ad-open-source',
    form: 10,
    section: 'writing',
    task: 'academic-discussion',
    title: 'Open-Source Software in Government',
    topic: 'technology',
    difficulty: 'hard',
    course: 'Computer Science',
    professor: 'Dr. Okafor',
    professorPrompt:
      'Over the past two decades, several governments have introduced rules requiring public agencies, such as ministries, schools, and city offices, to use open-source software whenever possible instead of buying products from private software companies. Open-source programs can be freely used, studied, and modified by anyone. Supporters see this as a smart use of public money, while critics worry about reliability and the cost of change. What do you think? Is requiring public agencies to use open-source software a good policy? Explain why or why not.',
    posts: [
      {
        author: 'Priya',
        text: "Yes, I think it's a good policy. Open-source software saves taxpayer money because agencies don't have to pay expensive license fees every year. It also keeps governments from depending on a single company that could raise prices or stop supporting a product. And because the code is public, independent experts can inspect it and find security problems before attackers do.",
      },
      {
        author: 'Marco',
        text: "I don't agree. Commercial software usually comes with professional support and training, which public employees need when something goes wrong. Switching thousands of computers to new systems is also expensive and risky. If a hospital or a tax office has problems during the transition, citizens could lose access to important services. The savings on licenses might disappear once you add the cost of switching.",
      },
    ],
    recommendedWords: [100, 150],
    timeLimitSec: 600,
    sampleResponse:
      "I agree with Priya that open-source software is a good choice for governments, although Marco raises a fair point about the transition. In my view, the strongest argument is one that neither of them mentioned: public records should remain accessible to the public. When an agency stores documents in a format controlled by one company, citizens may need that company's product just to open official files decades later. Open standards protect that long-term access. As for Marco's concern, the policy does not have to mean switching everything overnight. Governments could require open-source tools for new projects and replace older systems gradually, paying local firms to provide the support and training that employees need. That way, the money saved on licenses stays in the local economy, and essential services are not disrupted.",
  },
];
