import type { BuildSentenceSet, Difficulty, Topic, WritingSet } from '../../../types';

/** Simulación n.º 19 — Writing (contenido original). */

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
    form: 19,
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
  bs('f19-wr-bs-market', 'easy', 'daily-life', 'Roommate', 'What did you buy at the market?',
    ['I bought', 'some fresh tomatoes,', 'a loaf of bread,', 'and a bag of apples'], '.',
    'Pasado simple de un verbo irregular: "buy → bought" ("buyed" no existe). En una enumeración, los elementos se separan con comas y el último va precedido de "and"; por eso los dos primeros productos pueden intercambiarse.',
    {
      distractors: ['I buyed'],
      acceptedOrders: [['I bought', 'a loaf of bread,', 'some fresh tomatoes,', 'and a bag of apples']],
    }),
  bs('f19-wr-bs-exam-prediction', 'easy', 'campus-life', 'Classmate', 'Do you think the exam will be difficult?',
    ['I think', 'it will', 'probably be', 'harder than', 'the midterm'], '.',
    '"Will probably + verbo base" expresa una predicción bastante segura; el adverbio "probably" va entre "will" y el verbo ("it will probably be"). "Probably being" no forma un verbo conjugado.',
    { distractors: ['probably being'] }),
  bs('f19-wr-bs-cold-classroom', 'easy', 'campus-life', 'Classmate', 'Why is the classroom so cold today?',
    ['Maybe', "it's cold", 'because the heater', "isn't working", 'properly'], '.',
    'Oración causal con "because" + verbo en forma negativa: "because the heater isn\'t working properly" (presente continuo negativo: isn\'t + -ing). "Doesn\'t working" mezcla dos estructuras y es incorrecto.',
    { distractors: ["doesn't working"] }),
  bs('f19-wr-bs-animal-shelter', 'medium', 'daily-life', 'Neighbor', 'How long have you volunteered at the animal shelter?',
    ["I've been", 'walking', 'the dogs', 'there', 'since', 'February'], '.',
    'Presente perfecto continuo ("I\'ve been + -ing") para una actividad que empezó en el pasado y continúa ahora. Con un punto de inicio, como un mes, se usa "since February"; "for" se usa con periodos ("for six months"). El lugar ("there") va antes del tiempo.',
    { distractors: ['for'] }),
  bs('f19-wr-bs-restaurant-name', 'medium', 'daily-life', 'Friend', 'Do you remember the name of that restaurant?',
    ["I can't recall it,", 'but', "it's the place", 'where we', 'celebrated', "Mia's birthday"], '.',
    'Oración relativa con "where" para referirse a un lugar: "the place where we celebrated Mia\'s birthday", con el verbo en pasado simple. "Which we celebrated" sería incorrecto sin preposición ("the place in which…").',
    { distractors: ['which we'] }),
  bs('f19-wr-bs-stay-focused', 'medium', 'campus-life', 'Classmate', 'How do you stay focused when you study?',
    ['I', 'avoid', 'checking', 'my phone', 'until I finish', 'each chapter'], '.',
    'Tras "avoid" se usa gerundio (-ing): "avoid checking my phone", nunca "avoid to check" (error típico por influencia del español "evitar + infinitivo"). "Until I finish" va en presente aunque se refiera a un momento posterior.',
    { distractors: ['to check'] }),
  bs('f19-wr-bs-late-assignments', 'medium', 'campus-life', 'Classmate', 'Does the professor accept late assignments?',
    ['She', "doesn't accept them", 'unless', 'you bring', 'a note', 'from a doctor'], '.',
    '"Unless" equivale a "if… not" (a menos que): "She doesn\'t accept them unless you bring a note from a doctor". Tras "unless" el verbo va en presente y en forma afirmativa; "unless you don\'t bring" sería una doble negación incorrecta.',
    { distractors: ["you don't bring"] }),
  bs('f19-wr-bs-internship-office', 'hard', 'campus-life', 'Classmate', "I've lost the address of the internship office.",
    ["I'm not sure", 'which building', "it's in,", 'but', 'someone at', 'the career center', 'can tell you'], '.',
    'Pregunta indirecta tras "I\'m not sure which…": se usa el orden de una afirmación (sujeto + verbo), "which building it\'s in", y no el de una pregunta directa ("which building is it in"). La preposición "in" queda al final de la cláusula.',
    { distractors: ['is it in,'] }),
  bs('f19-wr-bs-bridge-closed', 'hard', 'daily-life', 'Coworker', 'Why was the bridge closed this morning?',
    ['I heard', 'that', 'it', 'was being', 'inspected', 'for storm damage'], '.',
    'Pasiva en pasado continuo: "was being + participio" ("it was being inspected") describe una acción que estaba en curso en el pasado y que recibe el sujeto. "Was been" no existe.',
    { distractors: ['was been'] }),
  bs('f19-wr-bs-after-graduation', 'hard', 'campus-life', 'Advisor', 'Have you figured out what to do after graduation?',
    ['Not yet,', 'but', 'what I', 'really want', 'is to', 'work abroad', 'for a year'], '.',
    'Oración escindida (cleft sentence) para dar énfasis: "What I really want is to work abroad". La cláusula con "what" funciona como sujeto singular, por eso va seguida de "is" + infinitivo con "to"; "really wants" no concuerda con "I".',
    { distractors: ['really wants'] }),

  // ---------- Write an Email ----------
  {
    id: 'f19-wr-em-choir-rehearsals',
    form: 19,
    section: 'writing',
    task: 'email',
    title: 'Missing Two Choir Rehearsals',
    topic: 'campus-life',
    difficulty: 'medium',
    scenario:
      'You sing in the university choir, which is preparing for its spring concert. You have just learned that a required field trip for another course will make you miss two rehearsals before the concert.',
    recipient: 'Dr. Elaine Foster, director of the university choir',
    subject: 'Missing two rehearsals before the spring concert',
    bulletPoints: [
      'Explain the reason for your absence and give the dates.',
      'Describe how you plan to learn the music on your own.',
      'Ask whether she can provide recordings or an extra practice session.',
    ],
    recommendedWords: [100, 150],
    timeLimitSec: 420,
    sampleResponse:
      "Dear Dr. Foster,\n\nI am writing to let you know that I will have to miss two rehearsals before the spring concert. My geology course has a required field trip to Red Rock Canyon from April 8 to April 10, so I will be absent on Tuesday, April 8, and Thursday, April 10. I am sorry for the timing, but the trip counts toward my final grade.\n\nI do not want to fall behind, so I plan to practice my alto part every day using the score and the piano app on my phone. I will also ask Laura, our section leader, to go over the most difficult passages with me as soon as I return.\n\nWould it be possible to record those two rehearsals and share the files with me? Alternatively, if you are planning an extra practice session before the concert, I would be very grateful to attend it.\n\nThank you for your understanding.\n\nBest regards,\nDaniela Ruiz",
  },

  // ---------- Academic Discussion ----------
  {
    id: 'f19-wr-ad-public-art',
    form: 19,
    section: 'writing',
    task: 'academic-discussion',
    title: 'Public Art on a Tight Budget',
    topic: 'art',
    difficulty: 'medium',
    course: 'Fine Arts',
    professor: 'Dr. Okafor',
    professorPrompt:
      'Next week we will study the history of public art, from ancient monuments to modern street murals. Many cities pay for sculptures, murals, and installations in parks and squares, and supporters say these works give neighborhoods character and bring people together. However, when budgets are tight, every dollar spent on art is a dollar not spent on roads, schools, or public safety. When city budgets are tight, should governments continue to fund public art such as murals and sculptures, or should that money go to basic services instead? Why?',
    posts: [
      {
        author: 'Sophie',
        text: 'I think cities should keep funding public art. A colorful mural or an unusual sculpture makes a neighborhood more attractive, which encourages people to walk around, visit local shops, and feel proud of where they live. Public art also brings residents together at unveilings and festivals. Besides, art programs cost only a tiny part of a city budget, so cutting them would not pay for many road repairs anyway.',
      },
      {
        author: 'Mateo',
        text: "I disagree. When roads are full of potholes and school buildings need new roofs, art is a luxury that taxpayers should not have to pay for. Basic services affect everyone's safety and education every day. If a neighborhood wants a mural, private donors and local businesses can sponsor it, and many companies are happy to do so because it gives them good publicity.",
      },
    ],
    recommendedWords: [100, 150],
    timeLimitSec: 600,
    sampleResponse:
      "I understand Mateo's point that basic services must come first, but I agree with Sophie that cities should continue to fund public art, even in difficult years. One reason nobody has mentioned is that public art supports local workers. When a city commissions a mural, it pays local artists, who are often poorly paid, as well as small businesses such as paint suppliers. I am also not convinced that private sponsors are a perfect solution. If only companies pay for art, they may choose safe, commercial designs or place them only in wealthy areas where their customers shop. Public funding allows every neighborhood, including poorer ones, to have art that reflects its own history. Of course, a city could reduce its art budget slightly during a crisis, but eliminating it completely would save very little money and cost communities a great deal.",
  },
];
