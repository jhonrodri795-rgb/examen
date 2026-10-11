import type { BuildSentenceSet, Difficulty, Topic, WritingSet } from '../../../types';

/** Simulación n.º 6 — Writing (contenido original). */
function bs(
  id: string,
  difficulty: Difficulty,
  topic: Topic,
  context: string,
  chunks: string[],
  endPunctuation: '.' | '?',
  explanation: string,
  extra: Partial<Pick<BuildSentenceSet, 'distractors' | 'acceptedOrders'>> = {},
): BuildSentenceSet {
  return {
    id,
    form: 6,
    section: 'writing',
    task: 'build-sentence',
    title: context,
    topic,
    difficulty,
    context: { speaker: 'Classmate', text: context },
    chunks,
    endPunctuation,
    explanation,
    ...extra,
  };
}

export const sets: WritingSet[] = [
  // ---------- Build a Sentence ----------
  bs('f06-wr-bs-graduation-day', 'easy', 'daily-life', "When is your sister's graduation ceremony?",
    ['The ceremony', 'is on', 'Saturday', 'at ten', 'in the morning'], '.',
    'Preposiciones de tiempo: "on" con días de la semana y fechas ("on Saturday") y "at" con horas concretas ("at ten"). "In" se usa con partes del día ("in the morning"), no con días: "is in Saturday" es incorrecto.',
    { distractors: ['is in'] }),
  bs('f06-wr-bs-wet-shoes', 'easy', 'daily-life', 'Why are your shoes so wet?',
    ['I missed', 'the bus,', 'so I', 'walked home', 'in the rain'], '.',
    'Oración de resultado con "so": primero la causa ("I missed the bus") y, tras la coma, la consecuencia ("so I walked home in the rain"). "Because" introduciría una causa, no un resultado, y la lógica quedaría invertida.',
    { distractors: ['because I'] }),
  bs('f06-wr-bs-after-graduation', 'easy', 'campus-life', 'What do you want to study after graduation?',
    ['I hope', 'to earn', "a master's degree", 'in public health'], '.',
    'Verbo + infinitivo: "hope" va seguido de "to + infinitivo" ("I hope to earn"), no de gerundio ("hope earning" es incorrecto). "In public health" indica la especialidad del título.',
    { distractors: ['earning'] }),
  bs('f06-wr-bs-weekend-snow', 'medium', 'daily-life', 'Do you think it will snow this weekend?',
    ['If the temperature', 'drops below zero,', 'it will', 'probably snow', 'on Sunday'], '.',
    'Primer condicional (situación futura real): "If + presente simple" ("If the temperature drops") + "will + infinitivo" ("it will probably snow"). "It would" corresponde al segundo condicional (situación hipotética) y no concuerda con "drops".',
    { distractors: ['it would'] }),
  bs('f06-wr-bs-woman-dean', 'medium', 'campus-life', 'Who is the woman talking to the dean?',
    ["She's the", 'professor', 'whose book', 'we read', 'in our', 'history seminar'], '.',
    'Oración relativa con "whose" (posesivo): "the professor whose book we read" = la profesora cuyo libro leímos. "Who\'s" es la contracción de "who is" y no expresa posesión, aunque suene igual.',
    { distractors: ["who's book"] }),
  bs('f06-wr-bs-early-riser', 'medium', 'daily-life', "Isn't it hard to wake up at five every day?",
    ['Not anymore,', "I'm", 'used to', 'getting up', 'before sunrise'], '.',
    '"Be used to + gerundio" significa «estar acostumbrado a»: "I\'m used to getting up". Aquí "to" es preposición, por eso no va seguido de infinitivo ("used to get up" significaría «solía levantarme»).',
    { distractors: ['get up'] }),
  bs('f06-wr-bs-novel-finished', 'medium', 'campus-life', 'Did you finish reading the novel for class?',
    ['Yes, it was', 'so', 'exciting', 'that I', "couldn't", 'put it down'], '.',
    'Estructura de resultado "so + adjetivo + that": "so exciting that I couldn\'t put it down". "Such" se usa con un sustantivo ("such an exciting book"), no con un adjetivo solo.',
    { distractors: ['such'] }),
  bs('f06-wr-bs-professor-meeting', 'hard', 'campus-life', 'The professor wants to see you after class.',
    ['I wonder', 'whether', 'it is', 'about', 'the research paper', 'I submitted', 'last week'], '.',
    'Pregunta indirecta tras "I wonder": la cláusula incrustada conserva el orden afirmativo (sujeto + verbo: "whether it is"), no el orden interrogativo ("whether is it"). "I submitted last week" es una relativa sin "that".',
    { distractors: ['is it'] }),
  bs('f06-wr-bs-parking-closed', 'hard', 'campus-life', 'Why is the parking lot behind the library closed?',
    ['Apparently,', 'the whole lot', 'needs', 'to be', 'repaved', 'before', 'the first snowfall'], '.',
    'Infinitivo pasivo tras "need": "needs to be repaved" (necesita ser repavimentado), porque el estacionamiento recibe la acción. Tras "to be" se usa el participio ("repaved"), no la forma en -ing.',
    { distractors: ['repaving'] }),
  bs('f06-wr-bs-study-abroad', 'hard', 'campus-life', 'Do you regret not studying abroad last year?',
    ['Yes,', 'I wish', 'I had', 'applied for', 'the exchange program', 'when I', 'had the chance'], '.',
    '"Wish + pasado perfecto" expresa arrepentimiento sobre el pasado: "I wish I had applied" (ojalá hubiera solicitado). "I have" (presente perfecto) no es posible después de "wish".',
    { distractors: ['I have'] }),

  // ---------- Write an Email ----------
  {
    id: 'f06-wr-em-book-purchase',
    form: 6,
    section: 'writing',
    task: 'email',
    title: 'Library Book Purchase Request',
    topic: 'campus-life',
    difficulty: 'medium',
    scenario:
      'You are working on your senior research project, and you need a book that was published a few months ago. However, the university library does not own a copy, and you would like the library to buy one.',
    recipient: 'Mr. Alan Brooks, Acquisitions Librarian',
    subject: 'Request to purchase a recently published book',
    bulletPoints: [
      'Identify the book and explain why it is important for your research.',
      'Explain how other students and courses could benefit from it.',
      'Ask about the purchase request process and how long it usually takes.',
    ],
    recommendedWords: [80, 140],
    timeLimitSec: 420,
    sampleResponse:
      "Dear Mr. Brooks,\n\nI am a senior in the environmental science program, and I am writing to ask whether the library could purchase a recently published book, Cooling the City: Green Infrastructure and Urban Heat. My senior research project examines how tree cover affects summer temperatures in different neighborhoods, and this book contains the most up-to-date data and case studies on that topic. Unfortunately, the library does not currently own a copy.\n\nI believe the book would be valuable for other students as well. It would fit naturally into courses such as Urban Ecology and Climate Policy, and graduate students in geography could also use it for their own research.\n\nCould you please tell me how to submit a formal purchase request? I would also like to know how long the process usually takes, since my project is due in April.\n\nThank you for your time.\n\nSincerely,\nLaura Kim",
  },

  // ---------- Academic Discussion ----------
  {
    id: 'f06-wr-ad-pedestrian-zones',
    form: 6,
    section: 'writing',
    task: 'academic-discussion',
    title: 'Car-Free Downtown Streets',
    topic: 'sociology',
    difficulty: 'medium',
    course: 'Urban Planning',
    professor: 'Dr. Patel',
    professorPrompt:
      'This week we have been discussing how street design shapes city life. In recent decades, several cities, such as Copenhagen in Denmark, have closed some of their main downtown streets to cars and turned them into pedestrian-only zones. Supporters say these changes make city centers livelier and safer, while critics point to the practical costs for residents, businesses, and visitors. Should more cities create pedestrian-only zones downtown, or do the disadvantages outweigh the benefits? Explain your view.',
    posts: [
      { author: 'Grace', text: "More cities should do it. When my hometown turned its main street into a pedestrian zone, it became much safer and more pleasant to walk around. Families started spending whole afternoons downtown, and several new cafés opened. Visitors stay longer when they don't have to worry about traffic, and that means more customers for local shops." },
      { author: 'Victor', text: "I think the costs are too high. Stores still need deliveries, and trucks can't easily reach shops on a closed street. The traffic doesn't disappear, either; it just moves into nearby residential neighborhoods. Most importantly, elderly and disabled people who depend on cars or taxis may find it difficult to reach downtown at all." },
    ],
    recommendedWords: [100, 150],
    timeLimitSec: 600,
    sampleResponse:
      "I agree with Grace that more cities should create pedestrian zones, although Victor raises concerns that planners need to take seriously. One reason that neither of them mentioned is public health. When people can walk safely through a city center, they tend to walk more, and fewer cars downtown also means cleaner air and less noise for the people who live and work there. Victor's points about deliveries and accessibility are valid, but they can be solved through careful design rather than by keeping cars everywhere. For example, many pedestrian streets allow delivery trucks only early in the morning, and cities can run small electric shuttles or provide drop-off points at the edges of the zone for elderly and disabled visitors. With these measures in place, the benefits of a car-free downtown clearly outweigh the disadvantages.",
  },
];
