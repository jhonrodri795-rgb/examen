import type { BuildSentenceSet, Difficulty, Topic, WritingSet } from '../../../types';

/** Simulación n.º 4 — Writing (contenido original). */

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
    form: 4,
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
  bs('f04-wr-bs-food-trucks', 'easy', 'campus-life', 'Classmate', 'The food trucks are parked outside the library today.',
    ['I would like', 'to try', 'the noodles', 'from the', 'blue truck'], '.',
    '"Would like + to + infinitivo" expresa un deseo de forma educada: "I would like to try…". Después de "would like" no se usa la forma en -ing ("trying").',
    { distractors: ['trying'] }),
  bs('f04-wr-bs-winter-jacket', 'easy', 'daily-life', 'Friend', 'Is this jacket warm enough for winter here?',
    ['No, it is not', 'thick enough', 'for the', 'freezing winds', 'we get here'], '.',
    '"Enough" va después del adjetivo: "thick enough", no "enough thick". Con sustantivos es al revés ("enough time").',
    { distractors: ['enough thick'] }),
  bs('f04-wr-bs-leave-early', 'easy', 'daily-life', 'Classmate', 'Why do you have to leave so early today?',
    ['I have to', 'pick up', 'my little sister', 'from her', 'piano lesson'], '.',
    '"Have to + infinitivo" expresa una obligación externa: "I have to pick up…". El objeto ("my little sister") va tras el verbo con partícula "pick up", y "from her piano lesson" indica de dónde la recoges.'),
  bs('f04-wr-bs-bus-wait', 'medium', 'daily-life', 'Friend', 'How long have you been waiting for the bus?',
    ['I have', 'been waiting', 'for', 'over twenty minutes,', "and I'm freezing"], '.',
    'Presente perfecto continuo ("have been waiting") con "for" + periodo de tiempo ("for over twenty minutes"). "Since" se usa con un punto de inicio (since 3:00), no con una duración.',
    { distractors: ['since'] }),
  bs('f04-wr-bs-dining-menu', 'medium', 'campus-life', 'Roommate', 'What did you think of the new dining hall menu?',
    ['It offers', 'not only', 'more', 'vegetarian dishes', 'but also', 'cheaper combo meals'], '.',
    'Estructura correlativa "not only… but also…": cada parte va seguida de un elemento del mismo tipo (dos sintagmas nominales). Las dos partes pueden intercambiarse.',
    { acceptedOrders: [['It offers', 'not only', 'cheaper combo meals', 'but also', 'more', 'vegetarian dishes']] }),
  bs('f04-wr-bs-lab-reports', 'medium', 'campus-life', 'Classmate', 'Are the lab reports graded by the professor?',
    ['No, they', 'are usually', 'graded', 'by the two', 'teaching assistants'], '.',
    'Voz pasiva en presente simple: "are + participio" ("are graded"), con el agente introducido por "by". El adverbio "usually" va entre el auxiliar y el participio.',
    { distractors: ['grading'] }),
  bs('f04-wr-bs-train-or-bus', 'medium', 'daily-life', 'Friend', 'Should I take the train or the bus to the city?',
    ['The farther', 'you go,', 'the more sense', 'it makes', 'to take', 'the train'], '.',
    'Doble comparativo "the + comparativo…, the + comparativo…": "The farther you go, the more sense it makes…". Indica que dos cosas aumentan a la vez; no se usa el superlativo ("the most").',
    { distractors: ['the most sense'] }),
  bs('f04-wr-bs-blue-notebook', 'hard', 'campus-life', 'Roommate', 'Have you seen my blue notebook anywhere?',
    ["I'm not sure", 'if', 'the notebook', 'I saw', 'in the lounge', 'was yours'], '.',
    'Pregunta indirecta de sí/no introducida por "if" tras "I\'m not sure": se usa el orden afirmativo (sujeto + verbo), sin auxiliar "did". "The notebook I saw in the lounge" es el sujeto de "was".',
    { distractors: ['did I see'] }),
  bs('f04-wr-bs-seminar-article', 'hard', 'campus-life', 'Classmate', 'Which article should I read for the seminar?',
    ['I would', 'start with', 'the short article', 'written by', "next week's", 'guest speaker'], '.',
    'Oración de relativo reducida con participio pasado: "the short article written by…" equivale a "the short article that was written by…". "Wrote" (pasado simple) no puede modificar al sustantivo.',
    { distractors: ['wrote by'] }),
  bs('f04-wr-bs-closed-bakery', 'hard', 'daily-life', 'Friend', 'The bakery was already closed when we arrived.',
    ['Yes, the owner', 'told me', 'that they', 'had already', 'sold out', 'of bread', 'by noon'], '.',
    'Pasado perfecto ("had sold out") para una acción anterior a otra acción pasada ("told me"). El presente perfecto ("have already") no concuerda con un relato en pasado.',
    { distractors: ['have already'] }),

  // ---------- Write an Email ----------
  {
    id: 'f04-wr-em-cafe-shifts',
    form: 4,
    section: 'writing',
    task: 'email',
    title: 'Exam Week Shift Conflict',
    topic: 'campus-life',
    difficulty: 'medium',
    scenario:
      'You work part-time at a café near campus. Your final exams fall during two weeks when you have been assigned several evening shifts at the café.',
    recipient: 'Ms. Laura Chen, manager of the café where you work part-time',
    subject: 'Shift conflicts during final exams',
    bulletPoints: [
      'Explain the conflict between your exam schedule and your shifts.',
      'Propose specific alternative shifts you could work.',
      'Offer to help find a coworker who can cover for you.',
    ],
    recommendedWords: [90, 150],
    timeLimitSec: 420,
    sampleResponse:
      "Dear Ms. Chen,\n\nI hope you are doing well. I am writing about my schedule for the next two weeks. My final exams run from December 8 to December 19, and three of them begin at 8:00 a.m. I have been assigned evening shifts on December 9, 11, and 16, which end at 11:00 p.m., the night before some of my most important exams.\n\nWould it be possible for me to work different shifts instead? I am free on Saturday and Sunday mornings, and I could also take the 7:00 to 11:00 a.m. shift on December 12 and 18, when I have no exams.\n\nI would also be glad to help find someone to cover my evening shifts. Jordan and Priya have mentioned that they would like extra hours, so I could ask them today and let you know by Friday.\n\nThank you for your understanding.\n\nBest regards,\nDaniel",
  },

  // ---------- Academic Discussion ----------
  {
    id: 'f04-wr-ad-community-service',
    form: 4,
    section: 'writing',
    task: 'academic-discussion',
    title: 'Required Community Service',
    topic: 'sociology',
    difficulty: 'medium',
    course: 'Education',
    professor: 'Dr. Okafor',
    professorPrompt:
      'In many school districts, students must complete a set number of community service hours, often between 20 and 100, before they can receive a high school diploma. Supporters argue that service connects teenagers with their communities and teaches responsibility. Critics respond that required volunteering is a contradiction and that it can be unfair to students with heavy obligations outside school. What is your view? Is mandatory community service a good graduation requirement, or should volunteering remain a personal choice? Explain your reasoning.',
    posts: [
      {
        author: 'Emma',
        text: 'I think it is a good requirement. Service exposes teenagers to real problems in their communities, like hunger or loneliness among older people, and it builds skills and empathy they would not develop in a classroom. When I tutored younger kids at a community center, I learned patience and how to explain ideas clearly. Many students would never try something like that unless their school asked them to.',
      },
      {
        author: 'Lucas',
        text: 'Forced volunteering loses its meaning. In my experience, many students just collect hours by doing easy tasks and getting a signature, without really caring about the cause. The requirement is also unfair to students who already have part-time jobs or have to take care of younger siblings after school. Schools should encourage and celebrate service, but the decision to volunteer should belong to each student.',
      },
    ],
    recommendedWords: [100, 150],
    timeLimitSec: 600,
    sampleResponse:
      'Although Lucas makes a fair point about students who just collect signatures, I agree with Emma that community service should be a graduation requirement. My main reason is that many teenagers do not know which volunteer opportunities exist, or they feel too shy to contact an organization on their own. A requirement gives them a reason to take that first step, and some of them discover interests that shape their future. For example, a friend of mine started volunteering at a food bank only because of the rule, and she is now studying public health. However, Lucas is right that the requirement should not burden students who have jobs or family duties. Schools could solve this by counting caregiving or work for community organizations as service and by offering short projects during school hours. With that flexibility, the requirement would open doors without punishing students who already carry heavy responsibilities.',
  },
];
