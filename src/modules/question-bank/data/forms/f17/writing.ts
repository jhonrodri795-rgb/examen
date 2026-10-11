import type { BuildSentenceSet, Difficulty, Topic, WritingSet } from '../../../types';

/** Simulación n.º 17 — Writing (contenido original). */

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
    form: 17,
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
  bs('f17-wr-bs-city-life', 'easy', 'Friend', 'Do you like living in the city?',
    ['I love it', 'because everything', 'is within', 'walking distance'], '.',
    'Oración causal con "because + sujeto + verbo": "because everything is within walking distance". "Everything" es singular y lleva "is". "Because of" va seguido de un sustantivo, no de una oración, por eso "because of everything is…" es incorrecto.',
    { distractors: ['because of everything'], topic: 'daily-life' }),
  bs('f17-wr-bs-after-finals', 'easy', 'Classmate', 'What are your plans after the final exam?',
    ['I plan', 'to visit', 'my family', 'for a week'], '.',
    'Verbo + infinitivo: "plan to + verbo" ("I plan to visit…"). Después de "plan" no se usa el gerundio, por eso "I plan visiting" es incorrecto. La duración ("for a week") va al final.',
    { distractors: ['visiting'] }),
  bs('f17-wr-bs-student-lounge', 'easy', 'Classmate', 'Is the new student lounge comfortable?',
    ['Yes,', 'there are', 'plenty of', 'soft sofas', 'by the windows'], '.',
    '"There are + sustantivo plural" ("there are plenty of soft sofas"). Con un plural no se usa "there is". "Plenty of" (muchos) precede al sustantivo y el lugar ("by the windows") suele cerrar la frase, aunque también puede ir tras "Yes,".',
    {
      distractors: ['there is'],
      acceptedOrders: [['Yes,', 'by the windows', 'there are', 'plenty of', 'soft sofas']],
    }),
  bs('f17-wr-bs-hometown-friends', 'medium', 'Roommate', 'When did you last see your hometown friends?',
    ['Sadly, I', "haven't seen", 'them', 'for', 'almost two years'], '.',
    'Presente perfecto negativo con "for" + periodo de tiempo: "I haven\'t seen them for almost two years". "Since" se usa con un punto de inicio ("since 2024"), no con una duración, por eso "since almost two years" es incorrecto.',
    { distractors: ['since'], topic: 'daily-life' }),
  bs('f17-wr-bs-science-fair', 'medium', 'Parent', 'Is the science fair judged by teachers?',
    ['No, it', 'is judged', 'by a panel', 'of local', 'engineers'], '.',
    'Pasiva en presente simple: "is + participio" ("it is judged") y el agente con "by" ("by a panel of local engineers"). "Is judging" es activa continua y cambiaría el sentido (la feria juzgaría a alguien).',
    { distractors: ['is judging'] }),
  bs('f17-wr-bs-laptop-choice', 'medium', 'Classmate', 'Why did you choose that particular laptop?',
    ['It was', 'the lightest one', 'that I', 'could find', 'in my price range'], '.',
    'Tras un superlativo se usa el relativo "that": "the lightest one that I could find". El superlativo de "light" es "lightest"; "the most light" es incorrecto con adjetivos cortos. "In my price range" puede ir al final o justo después de "the lightest one".',
    {
      distractors: ['the most light one'],
      acceptedOrders: [['It was', 'the lightest one', 'in my price range', 'that I', 'could find']],
    }),
  bs('f17-wr-bs-dinner-tonight', 'medium', 'Roommate', 'Are you going to cook dinner tonight?',
    ["No, I'm going", 'to order', 'some takeout', 'instead of', 'cooking'], '.',
    '"Instead of" es una preposición y va seguida de gerundio: "instead of cooking", al final de la oración. "Instead of to cook" es incorrecto. "Be going to + infinitivo" expresa el plan.',
    { distractors: ['to cook'], topic: 'daily-life' }),
  bs('f17-wr-bs-summer-festival', 'hard', 'Neighbor', 'I heard the city might cancel the summer festival.',
    ['I wonder', 'why', 'they would', 'cancel', 'such a', 'popular', 'event'], '.',
    'Pregunta indirecta tras "I wonder why": la cláusula mantiene el orden afirmativo sujeto + verbo ("why they would cancel"), no el de pregunta ("why would they"). Por eso termina en punto. "Such a + adjetivo + sustantivo": "such a popular event".',
    { distractors: ['would they'], topic: 'daily-life' }),
  bs('f17-wr-bs-broken-window', 'hard', 'Teacher', 'Has the broken window in the classroom been fixed?',
    ['Not yet, but', "it's going", 'to be', 'repaired', 'early', 'next week'], '.',
    'Pasiva de futuro con "be going to": "it\'s going to be + participio" ("going to be repaired"). "Repairing" no forma pasiva; la ventana no repara nada, la reparan.',
    { distractors: ['repairing'] }),
  bs('f17-wr-bs-portuguese', 'hard', 'Coworker', 'You speak Portuguese really well.',
    ['Thanks! I', 'had studied', 'it', 'for three years', 'before', 'I moved', 'to Brazil'], '.',
    'Pasado perfecto con "before": "I had studied it for three years before I moved to Brazil". "Had studied" indica la acción anterior a otra acción pasada ("I moved"). "Have studied" (presente perfecto) no encaja con una secuencia en el pasado.',
    { distractors: ['have studied'], topic: 'daily-life' }),

  // ---------- Write an Email ----------
  {
    id: 'f17-wr-em-forgotten-jacket',
    form: 17,
    section: 'writing',
    task: 'email',
    title: 'Jacket Left in a Hotel Room',
    topic: 'daily-life',
    difficulty: 'medium',
    scenario:
      'Last weekend you stayed at a hotel in another city. After checking out, you realized that you had left your jacket in your room, and your house keys are in one of its pockets.',
    recipient: 'The front desk manager, Harborview Hotel',
    subject: 'Jacket left in Room 512',
    bulletPoints: [
      'Give the details of your stay, including your room number and dates.',
      'Describe the jacket and where you think you left it.',
      'Ask how you can get it back and offer to pay for shipping.',
    ],
    recommendedWords: [80, 140],
    timeLimitSec: 420,
    sampleResponse:
      'Dear Front Desk Manager,\n\nI stayed at your hotel from October 2 to October 4 in Room 512, and the reservation was under my name, Daniel Ortega. After I checked out on Sunday morning, I realized that I had left my jacket in the room.\n\nIt is a dark green rain jacket with a hood and a black zipper. I believe I hung it on the hook behind the bathroom door, although it might also be in the closet near the entrance. Unfortunately, my house keys are in the right pocket, so finding it is quite urgent for me.\n\nCould you please let me know whether your housekeeping staff has found it? If so, I would be grateful if you could mail it to my home address. I will gladly pay the shipping costs by credit card or any other method you prefer.\n\nThank you very much for your help.\n\nSincerely,\nDaniel Ortega',
  },

  // ---------- Academic Discussion ----------
  {
    id: 'f17-wr-ad-endangered-languages',
    form: 17,
    section: 'writing',
    task: 'academic-discussion',
    title: 'Funding Endangered Languages',
    topic: 'linguistics',
    difficulty: 'medium',
    course: 'Linguistics',
    professor: 'Dr. Okafor',
    professorPrompt:
      'Linguists estimate that around 7,000 languages are spoken in the world today, and hundreds of them are expected to disappear this century as younger generations switch to more widely used languages. Some communities have kept their languages alive through school programs, dictionaries, and recordings of elderly speakers, often with government support. However, these projects cost money that could be spent on other needs. Should governments spend public money to preserve endangered languages? Why or why not?',
    posts: [
      {
        author: 'Mei',
        text: 'Yes, governments should fund these efforts. Each language holds unique knowledge, such as names for local plants, traditional stories, and ways of describing the world that cannot be fully translated. Once the last speakers are gone, that knowledge and history are lost forever. Compared with other public spending, paying for recordings and community classes is a small price to keep a people\'s identity alive.',
      },
      {
        author: 'David',
        text: 'I see the value, but it shouldn\'t be a priority. If speakers choose widely used languages for work and school, that is their decision, and governments shouldn\'t try to reverse it. Public money would be better spent teaching languages like English, Spanish, or Mandarin, which open up job opportunities. Communities that want to protect their language can still raise money on their own.',
      },
    ],
    recommendedWords: [100, 150],
    timeLimitSec: 600,
    sampleResponse:
      'I agree with Mei that governments should spend some public money on endangered languages, although I understand David\'s concern about jobs. In my view, these two goals are not in conflict. Children who grow up speaking a heritage language can still learn English or Spanish at school, and being bilingual often makes them more flexible learners. Moreover, a language cannot be saved by a few families alone, because it needs teachers, schools, and materials that only the state can provide on a large scale. Wales is a good example: public support for Welsh-language schools and broadcasting has helped keep the language part of everyday life. To address David\'s point about cost, governments could fund only the most effective programs, such as recording elderly speakers and training teachers. That would be a modest investment to protect an irreplaceable part of human history.',
  },
];
