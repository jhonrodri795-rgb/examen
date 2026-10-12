import type { BuildSentenceSet, Difficulty, Topic, WritingSet } from '../../../types';

/** Simulación n.º 3 — Writing (contenido original). */

function bs(
  slug: string,
  difficulty: Difficulty,
  speaker: string,
  context: string,
  chunks: string[],
  endPunctuation: '.' | '?',
  explanation: string,
  extra: Partial<Pick<BuildSentenceSet, 'distractors' | 'acceptedOrders' | 'topic'>> = {},
): BuildSentenceSet {
  const { topic = 'daily-life' as Topic, ...rest } = extra;
  return {
    id: `f03-wr-bs-${slug}`,
    form: 3,
    section: 'writing',
    task: 'build-sentence',
    title: context,
    topic,
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
  bs('stadium-food', 'easy', 'Friend', 'Is there anywhere to eat near the stadium?',
    ['Yes, there are', 'a few', 'food trucks', 'right outside', 'the main gate'], '.',
    '"There are" concuerda con el sustantivo plural "food trucks"; el complemento de lugar ("right outside the main gate") va al final. "There is" no concuerda con un plural.',
    { distractors: ['Yes, there is'] }),
  bs('call-family', 'easy', 'Roommate', 'How often do you call your family?',
    ['Well, I', 'usually', 'call', 'my parents', 'twice a week'], '.',
    'El adverbio de frecuencia "usually" va entre el sujeto y el verbo principal ("I usually call"), nunca entre el verbo y el objeto ("call usually my parents"). "Twice a week" cierra la frase.'),
  bs('heavy-box', 'easy', 'Neighbor', 'Can you carry this box up the stairs alone?',
    ["No, it's", 'too heavy', 'for me', 'to carry', 'by myself'], '.',
    'Estructura "too + adjetivo + (for + persona) + to + infinitivo": "too heavy for me to carry" (demasiado pesada para que yo la cargue). "By myself" equivale a "alone".'),
  bs('history-essay', 'medium', 'Classmate', 'Have you started your history essay yet?',
    ['Yes, I have', 'already', 'written', 'the first', 'two pages'], '.',
    'Presente perfecto con "already": have + already + participio ("have already written"). "Already" también puede ir al final de la frase, y se acepta "I have the first two pages (already) written" (have + objeto + participio). "Wrote" es pasado simple y no sirve tras "have".',
    { distractors: ['wrote'], acceptedOrders: [
      ['Yes, I have', 'written', 'the first', 'two pages', 'already'],
      ['Yes, I have', 'the first', 'two pages', 'already', 'written'],
      ['Yes, I have', 'the first', 'two pages', 'written', 'already'],
    ], topic: 'campus-life' }),
  bs('photography-class', 'medium', 'Classmate', 'Why are you taking a photography class?',
    ["I'm taking it", 'to improve', 'the photos', 'that I post', 'on my travel blog'], '.',
    'Infinitivo de propósito: "to improve" expresa la finalidad (para mejorar). En inglés no se dice "for improve"; tras "for" iría un sustantivo o un gerundio.',
    { distractors: ['for improve'], topic: 'campus-life' }),
  bs('advisor-schedule', 'medium', 'Friend', 'What did the advisor say about your schedule?',
    ['She', 'said that', 'I should', 'drop one', 'of my', 'lab courses'], '.',
    'Estilo indirecto con "said that" + oración ("She said that I should drop…"). "Told" exige un objeto de persona ("told me that"), así que "told that" es incorrecto.',
    { distractors: ['told that'], topic: 'campus-life' }),
  bs('hospital-parking', 'medium', 'Coworker', 'Is it hard to find parking near the hospital?',
    ['It', 'usually takes', 'about', 'twenty minutes', 'to find', 'a free spot'], '.',
    'Estructura "it takes + tiempo + to + infinitivo": "It usually takes about twenty minutes to find a free spot". El adverbio "usually" va delante de "takes".'),
  bs('lost-phone', 'hard', 'Classmate', 'Somebody left a phone in the lecture hall.',
    ['I have', 'no idea', 'whose phone', 'it is,', 'but we', 'could take it', 'to security'], '.',
    'Pregunta indirecta tras "I have no idea": se usa el orden afirmativo sujeto + verbo ("whose phone it is"), no el interrogativo ("whose phone is it").',
    { distractors: ['is it,'], topic: 'campus-life' }),
  bs('apartment-choice', 'hard', 'Friend', 'Which apartment did you finally choose?',
    ['The one', 'overlooking', 'the park', 'was', 'too expensive,', 'so I', 'took the other one'], '.',
    'Relativo reducido con participio presente: "the one overlooking the park" equivale a "the one that overlooks the park". "Overlooked" (pasado) no funciona sin "that".',
    { distractors: ['overlooked'] }),
  bs('presentation-regret', 'hard', 'Classmate', 'You look worried about the presentation.',
    ['Yes, I', 'should have', 'started', 'preparing', 'my slides', 'much earlier'], '.',
    '"Should have + participio" expresa arrepentimiento por algo que no se hizo en el pasado: "I should have started" (debería haber empezado). "Should had" es incorrecto: tras un modal va "have".',
    { distractors: ['should had'], topic: 'campus-life' }),

  // ---------- Write an Email ----------
  {
    id: 'f03-wr-em-camping-trip',
    form: 3,
    section: 'writing',
    task: 'email',
    title: 'Joining the Club Camping Trip',
    topic: 'campus-life',
    difficulty: 'medium',
    scenario:
      "You have just joined your university's Outdoor Adventure Club, but you missed its first meeting. You would like to go on the club's weekend camping trip next month.",
    recipient: 'Rosa Kim, organizer of the Outdoor Adventure Club',
    subject: 'New member interested in the camping trip',
    bulletPoints: [
      'Introduce yourself and describe your outdoor experience.',
      'Ask what equipment you need to bring for the trip.',
      'Offer to drive other members who need a ride.',
    ],
    recommendedWords: [80, 140],
    timeLimitSec: 420,
    sampleResponse:
      "Dear Rosa,\n\nMy name is Marco Silva, and I joined the Outdoor Adventure Club last week. Unfortunately, I missed the first meeting because of a lab session, but I am excited about next month's camping trip. I have some outdoor experience: I went hiking with my family almost every summer, and last year I spent three nights camping in a national park with friends.\n\nCould you tell me what equipment I should bring? I already have a sleeping bag and a backpack, but I do not own a tent or a camping stove, so I wonder whether the club provides them.\n\nAlso, I have a car with room for four people, so I would be glad to drive any members who need a ride.\n\nThank you, and I look forward to meeting everyone.\n\nBest regards,\nMarco",
  },

  // ---------- Academic Discussion ----------
  {
    id: 'f03-wr-ad-factory-or-small-business',
    form: 3,
    section: 'writing',
    task: 'academic-discussion',
    title: 'Factory or Small Businesses?',
    topic: 'economics',
    difficulty: 'medium',
    course: 'Economics',
    professor: 'Dr. Alvarez',
    professorPrompt:
      "This week we have been discussing regional development policy. When a region suffers from high unemployment, its government usually has limited funds to spend on recovery. One option is to offer generous tax breaks to attract a large international factory. Another is to use the same money to support many small local businesses through grants, low-interest loans, and training. Both approaches have produced success stories as well as failures. Which strategy do you think is better for the region's long-term economy, and why?",
    posts: [
      {
        author: 'Daniel',
        text: 'In my opinion, the factory is the better choice. A large plant creates hundreds of jobs very quickly, which is exactly what a region with high unemployment needs. Factories also bring training programs and new roads, and they attract suppliers that open nearby, creating even more jobs. Small businesses grow too slowly to make a real difference.',
      },
      {
        author: 'Sofia',
        text: 'I prefer supporting small businesses. When local owners succeed, the profits stay in the community instead of going to shareholders in another country. Small firms are also unlikely to leave, because their owners live in the region. A large factory, on the other hand, might move somewhere cheaper as soon as the tax breaks end, and then hundreds of people would lose their jobs at once.',
      },
    ],
    recommendedWords: [100, 150],
    timeLimitSec: 600,
    sampleResponse:
      "Although Daniel is right that a factory can create jobs quickly, I agree with Sofia that supporting small businesses is the wiser long-term strategy. My main reason is diversity. If a region depends on a single large employer, its whole economy is tied to one company and one industry. When demand for that product falls, the entire region suffers, as many former manufacturing towns have discovered. By contrast, a hundred small firms in different sectors, such as food, repair services, and software, are unlikely to fail at the same time. Small businesses also help local people develop management skills, which helps the region create new companies in the future. To respond to Daniel's concern about speed, the government could combine its grants with job-training programs so that new businesses can hire workers sooner. That way, the region would gain jobs now while building a stronger economic foundation.",
  },
];
