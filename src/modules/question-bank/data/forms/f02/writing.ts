import type { BuildSentenceSet, Difficulty, Topic, WritingSet } from '../../../types';

/** Simulación n.º 2 — Writing (contenido original). */

function bs(
  slug: string,
  difficulty: Difficulty,
  title: string,
  speaker: string,
  context: string,
  chunks: string[],
  endPunctuation: '.' | '?' | '!',
  explanation: string,
  extra: Partial<Pick<BuildSentenceSet, 'distractors' | 'acceptedOrders' | 'topic'>> = {},
): BuildSentenceSet {
  const topic: Topic = extra.topic ?? 'campus-life';
  return {
    id: `f02-wr-bs-${slug}`,
    form: 2,
    section: 'writing',
    task: 'build-sentence',
    title,
    topic,
    difficulty,
    context: { speaker, text: context },
    chunks,
    endPunctuation,
    explanation,
    ...(extra.distractors ? { distractors: extra.distractors } : {}),
    ...(extra.acceptedOrders ? { acceptedOrders: extra.acceptedOrders } : {}),
  };
}

export const sets: WritingSet[] = [
  // ---------- Build a Sentence ----------
  bs('spring-break', 'easy', 'Spring Break Plans', 'Classmate', 'What are you doing for spring break?',
    ["I'm going to", 'visit', 'my grandparents', 'in the mountains'], '.',
    '"Be going to + infinitivo" expresa un plan futuro ya decidido: "I\'m going to visit…". Tras "going to" va el verbo en forma base, nunca "visiting".',
    { distractors: ['visiting'], topic: 'daily-life' }),
  bs('frozen-laptop', 'easy', 'A Laptop That Keeps Freezing', 'Classmate', 'My laptop keeps freezing during online lectures.',
    ['You should', 'ask the help desk', 'to update', 'your software'], '.',
    'El modal "should" da un consejo y va seguido del verbo base ("should ask"). Después, "ask someone to do something": "ask the help desk to update your software".',
    { distractors: ['updating'] }),
  bs('left-party', 'easy', 'Leaving the Party Early', 'Friend', 'Why did you leave the party so early?',
    ['I left early', 'because', 'I had to', 'catch the last bus', 'home'], '.',
    'Oración de causa con "because": primero el hecho ("I left early") y después la razón ("because I had to catch the last bus home").',
    { topic: 'daily-life' }),
  bs('piano', 'medium', 'Playing the Piano', 'Friend', 'Do you still play the piano?',
    ['I used to', 'play', 'every weekend,', 'but I', "haven't touched it", 'in years'], '.',
    '"Used to + verbo base" describe un hábito pasado que ya no existe: "I used to play". No se confunde con "be used to + -ing" (estar acostumbrado), por eso "playing" sobra.',
    { distractors: ['playing'], topic: 'daily-life' }),
  bs('chemistry-final', 'medium', 'Preparing for the Chemistry Final', 'Classmate', "What's the best way to prepare for the chemistry final?",
    ['Reviewing', 'the old exams', 'with a partner', 'is probably', 'the best strategy'], '.',
    'Un gerundio puede ser sujeto de la oración: "Reviewing the old exams with a partner" funciona como sustantivo y lleva el verbo en singular ("is"). El verbo base "Review" no puede ser sujeto.',
    { distractors: ['Review'] }),
  bs('guest-speaker', 'medium', "The Guest Speaker's Talk", 'Classmate', "How was the guest speaker's talk on climate policy?",
    ['Although', 'it was', 'a bit technical,', 'I learned', 'a lot from it'], '.',
    '"Although + sujeto + verbo" introduce una concesión: "Although it was a bit technical, I learned a lot". "Despite" no puede ir seguido de una oración completa.',
    { distractors: ['Despite'] }),
  bs('survey-results', 'medium', 'Sending the Survey Results', 'Classmate', 'When will you send me the survey results?',
    ["I'll email them", 'to you', 'as soon as', 'I finish', 'the analysis'], '.',
    'En las oraciones temporales con "as soon as" se usa presente con valor de futuro: "as soon as I finish", no "as soon as I will finish".',
    { distractors: ['I will finish'] }),
  bs('career-fair', 'hard', 'The Career Fair Date', 'Classmate', 'Has anyone announced the date of the career fair?',
    ["I don't know", 'whether', 'the organizers', 'have set', 'a date', 'yet'], '.',
    'Pregunta indirecta con "whether" tras "I don\'t know": la cláusula mantiene el orden afirmativo (sujeto + verbo: "the organizers have set"), no el orden interrogativo "have the organizers set".',
    { distractors: ['have the organizers'] }),
  bs('new-bike', 'hard', 'A Bike That Looks Brand New', 'Friend', 'Your bike looks brand new!',
    ['I', 'just had', 'the frame', 'repainted', 'and', 'the tires', 'replaced'], '.',
    'Causativa "have + objeto + participio": otra persona hizo el trabajo ("I just had the frame repainted"). Las dos partes coordinadas pueden intercambiarse: "just had the tires replaced and the frame repainted". "Repainting" no sirve: tras el objeto se necesita el participio.',
    {
      distractors: ['repainting'],
      acceptedOrders: [['I', 'just had', 'the tires', 'replaced', 'and', 'the frame', 'repainted']],
      topic: 'daily-life',
    }),
  bs('scholarship-deadline', 'hard', 'A Missed Scholarship Deadline', 'Classmate', 'I missed the scholarship deadline by one day.',
    ['If', 'you had', 'asked me,', 'I would have', 'helped you', 'finish', 'on time'], '.',
    'Tercer condicional (pasado irreal): "If + past perfect (you had asked), would have + participio (I would have helped)". "I will have" no corresponde a una situación pasada imaginaria.',
    { distractors: ['I will have'] }),

  // ---------- Write an Email ----------
  {
    id: 'f02-wr-em-broken-heating',
    form: 2,
    section: 'writing',
    task: 'email',
    title: 'No Heat in the Apartment',
    topic: 'daily-life',
    difficulty: 'medium',
    scenario:
      'You rent an apartment with a roommate. The heating in your apartment stopped working two days ago, in the middle of a very cold week. Write an email to your landlord.',
    recipient: 'Mr. Daniel Price, the landlord of your apartment building',
    subject: 'Heating not working in Apartment 4B',
    bulletPoints: [
      'Describe the problem and when it started.',
      'Explain how it is affecting you and your roommate.',
      'Ask when it will be repaired and request a temporary solution in the meantime.',
    ],
    recommendedWords: [80, 140],
    timeLimitSec: 420,
    sampleResponse:
      'Dear Mr. Price,\n\nI am writing to report that the heating in Apartment 4B has stopped working. The radiators went cold on Monday evening, two days ago, and they have not come back on, even though we checked the thermostat and reset the circuit breaker.\n\nTemperatures have dropped below freezing this week, so the apartment has become extremely cold. My roommate and I have been wearing our coats indoors, and it is very hard to sleep or study at home. My roommate also has a bad cold, which seems to be getting worse.\n\nCould you please let me know when a technician will be able to repair the system? In the meantime, could you lend us two portable electric heaters? We can pick them up from your office.\n\nThank you for your help.\n\nSincerely,\nLaura Méndez',
  },

  // ---------- Academic Discussion ----------
  {
    id: 'f02-wr-ad-species-or-habitats',
    form: 2,
    section: 'writing',
    task: 'academic-discussion',
    title: 'Species or Whole Habitats?',
    topic: 'environment',
    difficulty: 'medium',
    course: 'Environmental Science',
    professor: 'Professor Hartley',
    professorPrompt:
      'This week we have been discussing how governments decide where to spend limited conservation funds. Some programs concentrate on rescuing particular endangered species, often large and well-known animals. Others aim to protect entire habitats, such as wetlands or grasslands, even when no famous species lives there. Both approaches have produced successes, but no country can afford to do everything. When conservation budgets are limited, should governments focus on saving specific endangered species, or on protecting entire habitats? Explain your position.',
    posts: [
      {
        author: 'Maria',
        text: 'I think governments should focus on famous species such as tigers or pandas. These animals attract public attention, and people are much more willing to donate money to save them. Protecting them also indirectly protects the places where they live, because a panda cannot survive without its bamboo forest. A campaign about a wetland full of insects would never raise the same level of support.',
      },
      {
        author: 'James',
        text: 'I disagree with focusing on individual animals. Whole ecosystems, like wetlands, provide services that everyone depends on, such as clean water and the pollination of crops by insects. Many of the most important species are plants and insects that nobody puts on a poster. Besides, saving one animal is pointless if its habitat disappears, so it makes more sense to protect the entire area from the start.',
      },
    ],
    recommendedWords: [100, 150],
    timeLimitSec: 600,
    sampleResponse:
      "I understand why Maria believes famous animals are useful for raising money, but I agree with James that protecting entire habitats is the better use of a limited budget. My main reason is efficiency. When a government protects a whole wetland or forest, it saves hundreds of species at once, including many that scientists have not even studied yet. In contrast, programs for a single species can be extremely expensive; breeding a few animals in captivity may cost millions and still fail if there is no safe place to release them. Habitat protection also benefits people directly. For example, healthy forests on hillsides reduce flooding and landslides in nearby towns. That said, Maria makes a good point about public attention, so governments could use a well-known animal as the symbol of a campaign while spending the money on the whole ecosystem.",
  },
];
