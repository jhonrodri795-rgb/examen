import type { BuildSentenceSet, Difficulty, Topic, WritingSet } from '../../../types';

/** Simulación n.º 9 — Writing (contenido original). */

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
    form: 9,
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
  bs('f09-wr-bs-study-room-food', 'easy', 'campus-life', 'Classmate', 'Is it okay to bring food into the study room?',
    ['Yes, you', 'can bring', 'snacks, but not', 'hot meals'], '.',
    'El modal "can" expresa permiso y va seguido del infinitivo sin "to" y sin -s: "you can bring". "Can brings" es incorrecto porque los modales nunca llevan la -s de tercera persona en el verbo que les sigue.',
    { distractors: ['can brings'] }),
  bs('f09-wr-bs-hiking-saturday', 'easy', 'daily-life', 'Friend', 'Do you want to go hiking this Saturday?',
    ['Sorry, I', 'am going to', 'help my sister', 'move into', 'her new apartment'], '.',
    '"Be going to + infinitivo" expresa un plan ya decidido, y aquí sirve de motivo para rechazar la invitación: "I am going to help my sister". Tras "going to" va el infinitivo, por eso sobra "helping my sister".',
    { distractors: ['helping my sister'] }),
  bs('f09-wr-bs-big-suitcase', 'easy', 'daily-life', 'Roommate', 'Why are you buying such a big suitcase?',
    ['I need', 'a larger one', 'because my old one', 'broke during', 'my last trip'], '.',
    'Oración causal con "because" + sujeto + verbo: "because my old one broke during my last trip". "Because of" solo puede ir seguido de un sustantivo, no de una oración con verbo, por eso sobra "because of my old one".',
    { distractors: ['because of my old one'] }),
  bs('f09-wr-bs-cafe-job', 'medium', 'daily-life', 'Friend', 'Do you like your new job at the café?',
    ['I love it,', 'and', "I'm getting", 'better at', 'making', 'complicated drinks'], '.',
    'Adjetivo + preposición + gerundio: "better at making". Después de una preposición como "at" el verbo va en -ing, por eso sobra "make".',
    { distractors: ['make'] }),
  bs('f09-wr-bs-swimming-pool', 'medium', 'daily-life', 'Neighbor', 'When did the city open the new swimming pool?',
    ['It', 'has been open', 'since', 'we moved', 'into the neighborhood', 'last year'], '.',
    'Presente perfecto con "since" + oración en pasado simple: "It has been open since we moved…". El presente perfecto describe un estado que empezó en el pasado y continúa. "Is open since" (calco del español "está abierta desde") es incorrecto.',
    { distractors: ['is open'] }),
  bs('f09-wr-bs-coach-news', 'medium', 'campus-life', 'Teammate', 'Did you hear what the coach told the team?',
    ['Yes, she', 'told us', 'that practice', 'would start', 'an hour earlier'], '.',
    'Estilo indirecto con "told + persona + that": "she told us that practice would start…". El verbo "tell" exige un objeto de persona; "say" no lo admite sin "to", por eso sobra "said us". "Will" pasa a "would" por el tiempo pasado del verbo introductor.',
    { distractors: ['said us'] }),
  bs('f09-wr-bs-rehearsal-place', 'medium', 'campus-life', 'Classmate', 'Where should we meet to rehearse our presentation?',
    ['We can', 'meet either', 'in the library', 'or in', 'my room'], '.',
    'Correlativa "either … or" para ofrecer dos opciones: "either in the library or in my room". "Nor" se combina con "neither", nunca con "either", por eso sobra "nor in".',
    { distractors: ['nor in'] }),
  bs('f09-wr-bs-auditorium-line', 'hard', 'campus-life', 'Friend', "There's a long line outside the auditorium.",
    ["Let's", 'find out', 'what time', 'the doors are', 'supposed to', 'open'], '.',
    'Pregunta indirecta después de "Let\'s find out": la cláusula mantiene el orden afirmativo sujeto + verbo ("what time the doors are supposed to open"). "Are the doors" invierte el orden como en una pregunta directa y es incorrecto aquí.',
    { distractors: ['are the doors'] }),
  bs('f09-wr-bs-play-seats', 'hard', 'daily-life', 'Friend', 'Which seats did you get for the play?',
    ['We got', 'two of', 'the seats', 'reserved for', 'members of', 'the drama club'], '.',
    'Relativa reducida con participio pasado: "the seats reserved for members…" equivale a "the seats that were reserved for…" (sentido pasivo). "Reserving for" tendría sentido activo (los asientos reservarían algo), por eso sobra.',
    { distractors: ['reserving for'] }),
  bs('f09-wr-bs-rent-increase', 'hard', 'daily-life', 'Roommate', 'Our landlord is raising the rent next month.',
    ["I'd rather", 'he', 'gave us', 'more time', 'to find', 'a cheaper place'], '.',
    '"Would rather" + sujeto distinto + pasado simple expresa una preferencia sobre el presente o el futuro: "I\'d rather he gave us more time". Aunque se refiere al futuro, el verbo va en pasado, por eso sobra "gives us".',
    { distractors: ['gives us'] }),

  // ---------- Write an Email ----------
  {
    id: 'f09-wr-em-internship-start',
    form: 9,
    section: 'writing',
    task: 'email',
    title: 'Internship Start Date Request',
    topic: 'campus-life',
    difficulty: 'medium',
    scenario:
      'You have been offered a summer internship at a local engineering firm. However, the first day of the internship falls in the same week as your final exams at the university.',
    recipient: 'Mr. Jordan Lee, internship coordinator at a local engineering firm',
    subject: 'Accepting the summer internship and a question about the start date',
    bulletPoints: [
      'Thank him and confirm that you accept the offer.',
      'Explain the conflict with your exam schedule.',
      'Ask whether you can start one week later and what you should prepare beforehand.',
    ],
    recommendedWords: [80, 140],
    timeLimitSec: 420,
    sampleResponse:
      "Dear Mr. Lee,\n\nThank you very much for offering me the summer internship at your firm. I am delighted to accept, and I am excited about the chance to work with your structural design team.\n\nUnfortunately, I have noticed a scheduling problem. The internship begins on June 2, which is the same week as my final exams. I have four exams between June 2 and June 6, and they cannot be moved because they are set by the university.\n\nWould it be possible for me to start one week later, on June 9? If so, is there anything I should prepare before my first day? I would be glad to read any project documents or learn the software your team uses so that I can contribute right away.\n\nThank you again for this opportunity.\n\nBest regards,\nDaniela Ruiz",
  },

  // ---------- Academic Discussion ----------
  {
    id: 'f09-wr-ad-pay-transparency',
    form: 9,
    section: 'writing',
    task: 'academic-discussion',
    title: 'Publishing Salary Ranges at Work',
    topic: 'economics',
    difficulty: 'medium',
    course: 'Business',
    professor: 'Dr. Nakamura',
    professorPrompt:
      'This week we have been studying how companies decide what to pay their employees. Traditionally, salaries have been kept private, and in some workplaces employees are even discouraged from discussing their pay. Recently, however, a growing number of companies have started publishing the salary range for every position, so that employees know roughly what their colleagues earn. Some governments now require job advertisements to include pay ranges as well. Should more companies adopt this kind of pay transparency? Why or why not?',
    posts: [
      {
        author: 'Chloe',
        text: 'Yes, I think more companies should do this. When salaries are secret, unfair pay gaps between groups, such as men and women, can continue for years without anyone noticing. Publishing the ranges forces companies to follow clear rules when they set pay. It also builds trust, because employees can see that their salary depends on their position and experience rather than on who negotiated hardest.',
      },
      {
        author: 'Ryan',
        text: 'I disagree. Publishing salaries can create jealousy among coworkers, especially when two people with the same job title earn different amounts. Employees may start comparing themselves with others instead of focusing on their work. It also makes it harder for managers to reward employees who perform exceptionally well, because any large raise would be visible to everyone and might have to be justified to the whole team.',
      },
    ],
    recommendedWords: [100, 150],
    timeLimitSec: 600,
    sampleResponse:
      "I side with Chloe, although I understand Ryan's concern about jealousy. In my opinion, the biggest benefit of pay transparency is one that neither of them mentioned: it helps companies hire and keep good people. When job seekers can see the salary range in advance, they do not waste time applying for positions that cannot meet their needs, and companies avoid long negotiations that end in a rejection. Transparency also helps current employees plan their careers, because they can see how much more they would earn by moving into a senior role. As for Ryan's point, publishing a range does not mean that everyone earns the same amount. Managers can still reward excellent performance within the range or through bonuses, as long as they explain the criteria clearly. In fact, clear criteria may motivate employees more than secret raises ever could.",
  },
];
