import type { BuildSentenceSet, Difficulty, Topic, WritingSet } from '../../../types';

/** Simulación n.º 15 — Writing (contenido original). */

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
    form: 15,
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
  bs('f15-wr-bs-pharmacy-hours', 'easy', 'Neighbor', 'What time does the pharmacy across the street open?',
    ['I think', 'it opens', 'at eight', 'in the morning', 'on weekdays'], '.',
    'Preposiciones de tiempo: "at" con horas ("at eight") y "on" con días ("on weekdays"). "On eight" es incorrecto. También se acepta "it opens on weekdays at eight in the morning".',
    {
      distractors: ['on eight'],
      acceptedOrders: [['I think', 'it opens', 'on weekdays', 'at eight', 'in the morning']],
      topic: 'daily-life',
    }),
  bs('f15-wr-bs-apartment-distance', 'easy', 'Classmate', 'Is your new apartment close to campus?',
    ['No, it', "isn't as", 'close', 'as my old', 'apartment was'], '.',
    'Comparación negativa de igualdad: "not as + adjetivo + as" ("isn\'t as close as my old apartment was"). Con "as … as" no se usa "than"; "than my old" sería un error.',
    { distractors: ['than my old'], topic: 'daily-life' }),
  bs('f15-wr-bs-beach-invite', 'easy', 'Friend', "Why don't you come to the beach with us?",
    ["I'd love to,", 'but I', 'have to', 'finish my essay', 'by Monday'], '.',
    '"Have to + infinitivo" expresa una obligación que impide el plan: "but I have to finish my essay by Monday". Con el sujeto "I" se usa "have to", no "has to".',
    { distractors: ['has to'], topic: 'daily-life' }),
  bs('f15-wr-bs-professor-kim', 'medium', 'Classmate', 'How long has Professor Kim taught at this university?',
    ['As far as I know,', 'she has', 'taught', 'in the biology department', 'since 2009'], '.',
    'Presente perfecto ("she has taught") con "since" + año para indicar el punto de inicio. "For" se usa con periodos ("for ten years"), no con un año, por eso "for 2009" es incorrecto. También se acepta "she has taught since 2009 in the biology department".',
    {
      distractors: ['for 2009'],
      acceptedOrders: [['As far as I know,', 'she has', 'taught', 'since 2009', 'in the biology department']],
    }),
  bs('f15-wr-bs-sold-car', 'medium', 'Coworker', 'Why did you sell your car?',
    ['It took me', 'almost an hour', 'every day', 'to find', 'a parking spot', 'near campus'], '.',
    'Estructura "it took + persona + tiempo + to + infinitivo": "It took me almost an hour every day to find a parking spot". "For finding" no es correcto aquí. "Every day" también puede ir al final de la frase.',
    {
      distractors: ['for finding'],
      acceptedOrders: [['It took me', 'almost an hour', 'to find', 'a parking spot', 'near campus', 'every day']],
      topic: 'daily-life',
    }),
  bs('f15-wr-bs-stadium-building', 'medium', 'Visitor', "What's that building next to the stadium?",
    ["That's", 'the new gym', 'where', 'the basketball team', 'practices', 'every afternoon'], '.',
    'Oración relativa con "where" para describir un lugar: "the new gym where the basketball team practices". "Which" necesitaría una preposición ("in which"), por eso no encaja.',
    { distractors: ['which'] }),
  bs('f15-wr-bs-ice-rink', 'medium', 'Roommate', 'Will the ice rink be open during the holidays?',
    ['It will', 'stay open', 'unless', 'the weather', 'gets', 'too warm'], '.',
    'Condicional con "unless" (a menos que): la oración principal va en futuro ("It will stay open") y la cláusula con "unless" en presente simple ("unless the weather gets too warm"), nunca con "will get".',
    { distractors: ['will get'], topic: 'daily-life' }),
  bs('f15-wr-bs-late-package', 'hard', 'Roommate', 'My package was supposed to arrive yesterday.',
    ['Did you', 'check', 'whether', 'it was', 'delivered', 'to the wrong', 'address'], '?',
    'Pregunta indirecta tras "Did you check": la cláusula con "whether" mantiene el orden afirmativo sujeto + verbo ("whether it was delivered"), no el orden interrogativo "was it".',
    { distractors: ['was it'], topic: 'daily-life' }),
  bs('f15-wr-bs-chemistry-professor', 'hard', 'Classmate', 'Why is everyone talking about the new chemistry professor?',
    ["She's", 'a chemist', 'known for', 'her research', 'on batteries', 'that charge', 'in minutes'], '.',
    'Oración relativa reducida con participio pasado: "a chemist known for her research" equivale a "a chemist who is known for…". "Knowing for" es incorrecto porque el sentido es pasivo.',
    { distractors: ['knowing for'] }),
  bs('f15-wr-bs-final-match', 'hard', 'Friend', 'Our team lost the final match by one point.',
    ['If the referee', 'had noticed', 'that late foul,', 'your team', 'would have won', 'the championship'], '.',
    'Tercer condicional para una situación pasada irreal: "If + had + participio" ("had noticed") y "would have + participio" ("would have won"). "Would win" no corresponde a un hecho pasado.',
    { distractors: ['would win'], topic: 'daily-life' }),

  // ---------- Write an Email ----------
  {
    id: 'f15-wr-em-scholarship-reference',
    form: 15,
    section: 'writing',
    task: 'email',
    title: 'Asking for a Scholarship Reference',
    topic: 'campus-life',
    difficulty: 'medium',
    scenario:
      'You are applying for a science scholarship that requires a recommendation letter from a teacher who knows your work well. You would like to ask your former high school chemistry teacher, whom you have not contacted since you graduated.',
    recipient: 'Mr. Robert Hayes, your former high school chemistry teacher',
    subject: 'Request for a scholarship recommendation letter',
    bulletPoints: [
      'Remind him who you are and what you accomplished in his class.',
      'Describe the scholarship and explain why you are applying.',
      'Give the deadline and offer to send any materials that would help him.',
    ],
    recommendedWords: [80, 140],
    timeLimitSec: 420,
    sampleResponse:
      "Dear Mr. Hayes,\n\nI hope you are doing well. My name is Lucía Torres, and I took your chemistry class two years ago. You may remember my project on local water quality, which won second place at the regional science fair.\n\nI am now applying for the Greenfield Science Scholarship, which covers tuition for future science majors. I am applying because I want to study environmental chemistry, and the award would let me focus on research instead of working two part-time jobs.\n\nThe scholarship requires a letter from a teacher who knows my work well, and I immediately thought of you. The deadline is March 15. If you are willing to help, I would be glad to send my résumé, my personal statement, or my science fair report.\n\nThank you for considering my request.\n\nSincerely,\nLucía Torres",
  },

  // ---------- Academic Discussion ----------
  {
    id: 'f15-wr-ad-self-driving-cars',
    form: 15,
    section: 'writing',
    task: 'academic-discussion',
    title: 'Self-Driving Cars on Public Roads',
    topic: 'engineering',
    difficulty: 'medium',
    course: 'Engineering',
    professor: 'Dr. Okafor',
    professorPrompt:
      'Self-driving cars have improved quickly over the past decade. In some cities, driverless taxis already carry paying passengers, and supporters claim that automated vehicles cause fewer crashes per mile than human drivers. However, these cars still make occasional mistakes, sometimes in situations that a person would handle easily. For our next class, I would like you to consider this question: should self-driving cars be allowed on public roads now, or only after they are proven to be almost perfectly safe? Explain your reasoning.',
    posts: [
      {
        author: 'Jasmine',
        text: 'Allow them now. Human drivers cause most accidents: people text, drive when they are exhausted, or get behind the wheel after drinking. A self-driving car never gets distracted or sleepy. If these cars are already safer than the average driver, then every year we delay them actually costs lives. Demanding perfection from a machine is unfair when we accept much worse performance from people.',
      },
      {
        author: 'Carlos',
        text: 'I think we should wait. Public roads should not be testing labs, and the pedestrians and drivers around these cars never agreed to take part in an experiment. It is also still unclear who is responsible when a self-driving car crashes: the owner, the manufacturer, or the software company? Even if failures are rare, they can be serious.',
      },
    ],
    recommendedWords: [100, 150],
    timeLimitSec: 600,
    sampleResponse:
      "I understand Carlos's concern about responsibility, but I mostly agree with Jasmine that self-driving cars should be allowed now, as long as they are introduced gradually. Waiting for near-perfect safety sounds reasonable, but no technology meets that standard. We use elevators, airplanes, and medicines because they are much safer than the alternatives, not because they never fail. A better approach would be to allow these cars first in limited areas, such as well-mapped city centers in good weather, and to expand only when the data show fewer crashes than human drivers in the same conditions. This plan could also answer Carlos's question about liability, because governments could require companies to carry insurance and publish their crash records as a condition for operating. In my view, careful real-world use is the only way to collect the evidence that will make these cars truly safe.",
  },
];
