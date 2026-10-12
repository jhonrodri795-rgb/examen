import type { BuildSentenceSet, Difficulty, Topic, WritingSet } from '../../../types';

/** Simulación n.º 5 — Writing (contenido original). */
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
    form: 5,
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
  bs('f05-wr-bs-fire-alarm', 'easy', 'campus-life', 'Where were you when the fire alarm went off?',
    ['I was', 'studying in', 'the library', 'when the alarm', 'went off'], '.',
    'Pasado continuo interrumpido por "when": la acción en curso ("I was studying") se ve interrumpida por una acción breve en pasado simple ("when the alarm went off"). También se acepta empezar por la cláusula con "when" ("When the alarm went off, I was studying in the library").',
    { distractors: ['studied in'], acceptedOrders: [['when the alarm', 'went off', 'I was', 'studying in', 'the library']] }),
  bs('f05-wr-bs-biggest-rooms', 'easy', 'campus-life', 'Which dorm has the biggest rooms?',
    ['I think', 'Birch Hall', 'has the', 'largest rooms', 'on campus'], '.',
    'Adjetivo superlativo: "the + adjetivo-est" ("the largest rooms"), a menudo seguido del ámbito de comparación ("on campus"). "Larger" es comparativo y no encaja con "the… on campus".',
    { distractors: ['larger rooms'] }),
  bs('f05-wr-bs-forgot-wallet', 'easy', 'daily-life', 'I forgot my wallet at home today.',
    ["Don't worry,", "I'll", 'lend you', 'some money', 'for lunch'], '.',
    '"Will" para ofrecer ayuda en el momento: "I\'ll lend you some money". Ojo: "lend" es «prestar» (dar); "borrow" es «pedir prestado», por eso "borrow you" es incorrecto.',
    { distractors: ['borrow you'] }),
  bs('f05-wr-bs-bookstore-job', 'medium', 'campus-life', 'When did you start working at the campus bookstore?',
    ['I have', 'had this', 'part-time job', 'for almost', 'two years'], '.',
    'Presente perfecto con "for" + periodo de tiempo ("for almost two years") para una situación que empezó en el pasado y continúa. "Since" iría con un punto de inicio (since 2024), no con una duración.',
    { distractors: ['since almost'] }),
  bs('f05-wr-bs-raincoat', 'medium', 'daily-life', 'Why are you bringing a raincoat today?',
    ['The forecast', 'is uncertain,', 'so', "I'm bringing it", 'in case', 'it rains'], '.',
    'Oración con "in case" (por si acaso): tras "in case" se usa presente simple con valor de futuro ("in case it rains"), no "will".',
    { distractors: ['it will rain'] }),
  bs('f05-wr-bs-sunday-mornings', 'medium', 'daily-life', 'What do you usually do on Sunday mornings?',
    ['I really', 'enjoy', 'cooking', 'a big breakfast', 'for my roommates'], '.',
    'Verbo + gerundio: "enjoy" exige la forma -ing ("enjoy cooking"), nunca "enjoy to cook". El objeto ("a big breakfast") va antes del beneficiario ("for my roommates").',
    { distractors: ['to cook'] }),
  bs('f05-wr-bs-librarian-request', 'medium', 'campus-life', 'What did the librarian ask you to do?',
    ['She', 'asked me', 'to return', 'my overdue books', 'by the end', 'of the week'], '.',
    'Petición en estilo indirecto: "asked + objeto + to + infinitivo" ("She asked me to return…"). "Ask" no lleva "to" antes de la persona, por eso "asked to me" es incorrecto.',
    { distractors: ['asked to me'] }),
  bs('f05-wr-bs-airport-shuttle', 'hard', 'campus-life', "I'm planning to take the airport shuttle tonight.",
    ['Good idea,', 'but', 'do you know', 'what time', 'the last shuttle', 'leaves', 'from campus'], '?',
    'Pregunta indirecta tras "Do you know": la cláusula interrogativa lleva orden afirmativo (sujeto + verbo: "what time the last shuttle leaves"), sin el auxiliar "does".',
    { distractors: ['does'] }),
  bs('f05-wr-bs-presentation-topic', 'hard', 'campus-life', "Our group still hasn't picked a presentation topic.",
    ['What', 'we need', 'is', 'a quick meeting', 'where everyone', 'suggests', 'one topic'], '.',
    'Oración escindida (cleft) con "What we need is…": la cláusula con "what" funciona como sujeto y destaca la información que sigue a "is". En inglés es "What", no "That" (calco de «Lo que»).',
    { distractors: ['That'] }),
  bs('f05-wr-bs-final-exam', 'hard', 'campus-life', 'Was the final exam as hard as you expected?',
    ['Having studied', 'every weekend', 'for a month,', 'I found it', 'easier', 'than I expected'], '.',
    'Cláusula de participio perfecto: "Having + participio" ("Having studied…") indica una acción anterior a la principal y su causa; el sujeto implícito coincide con el de la oración principal ("I").',
    { distractors: ['Have studied'] }),

  // ---------- Write an Email ----------
  {
    id: 'f05-wr-em-damaged-lamp',
    form: 5,
    section: 'writing',
    task: 'email',
    title: 'Damaged Desk Lamp Order',
    topic: 'daily-life',
    difficulty: 'medium',
    scenario:
      'Last week you ordered a desk lamp from an online home-goods store. When the package arrived, the base of the lamp was cracked, and the power cable was not in the box.',
    recipient: 'Customer Service Department, Brightway Home Goods',
    subject: 'Damaged lamp and missing cable in my order',
    bulletPoints: [
      'Give the details of your order.',
      'Describe the problems with the lamp.',
      'Say whether you want a replacement or a refund, and ask how to return the item.',
    ],
    recommendedWords: [90, 150],
    timeLimitSec: 420,
    sampleResponse:
      'Dear Customer Service Team,\n\nI am writing about order #48217, which I placed on your website on March 3. It contained one adjustable desk lamp in matte black, and it was delivered to my apartment yesterday.\n\nUnfortunately, the lamp arrived in poor condition. The base has a long crack across the bottom, so the lamp does not stand straight and could easily tip over. In addition, the power cable was missing from the box, which means I cannot use the lamp at all. Since the outer packaging looked undamaged, I believe the problem happened before the item was shipped.\n\nI would prefer a replacement rather than a refund, as I still need a lamp for studying. Could you please explain how I should return the damaged one? I would also appreciate knowing whether you can provide a prepaid shipping label.\n\nThank you for your help.\n\nSincerely,\nDaniel Ruiz',
  },

  // ---------- Academic Discussion ----------
  {
    id: 'f05-wr-ad-choice-overload',
    form: 5,
    section: 'writing',
    task: 'academic-discussion',
    title: 'More Choices or Fewer?',
    topic: 'psychology',
    difficulty: 'medium',
    course: 'Psychology',
    professor: 'Dr. Alvarez',
    professorPrompt:
      'This week we have been studying research on decision-making. In several well-known experiments, shoppers who were offered a small selection of products were more likely to buy something than shoppers who faced dozens of options, and they often felt more satisfied with their choice. Psychologists call this "choice overload." Yet many people say they want as many options as possible, whether they are choosing a phone plan, a university course, or a streaming service. Do people generally benefit from having more choices, or would they be happier with fewer? Explain your view.',
    posts: [
      {
        author: 'Hannah',
        text: 'I think fewer options are better. When I shop online, I can spend an hour comparing almost identical headphones, and even after I buy a pair, I keep wondering whether another one would have been better. With endless choices in stores and on apps, people feel stressed and less confident. A shorter list of good options would save time and make people happier with their decisions.',
      },
      {
        author: 'Omar',
        text: 'I see it differently. People have very different needs, budgets, and tastes, and more options let each person find something that truly fits. For example, my brother has a serious food allergy, and he can eat safely only because supermarkets now offer many specialized products. If we limited options, many people would be forced to accept something unsuitable just to make decisions simpler.',
      },
    ],
    recommendedWords: [100, 150],
    timeLimitSec: 600,
    sampleResponse:
      "I understand Omar's point that people's needs vary, but I mostly agree with Hannah that fewer choices usually make people happier. My main reason is that every decision requires mental energy, and that energy is limited. For example, my university offers hundreds of electives, and many of my friends spend weeks reading course descriptions and still feel unsure afterward. In contrast, my cousin's college gives first-year students a short list of recommended classes, and she told me this made her first semester much less stressful. Of course, Omar is right that some people, like his brother, need specialized products. However, the solution is not unlimited choice but well-organized choice: stores and apps can highlight a few carefully selected options while still allowing people with special needs to search for more. That way, people avoid feeling overwhelmed without being forced to accept something unsuitable.",
  },
];
