import type { BuildSentenceSet, Difficulty, Topic, WritingSet } from '../../../types';

/** Simulación n.º 13 — Writing (contenido original). */

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
    form: 13,
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
  bs('f13-wr-bs-evening-plan', 'easy', 'Roommate', 'What are you doing this evening?',
    ["I'm", 'going to', 'cook dinner', 'for my roommates'], '.',
    'Para hablar de un plan ya decidido se usa "be going to + verbo base": "I\'m going to cook dinner". "Cooking" no puede seguir a "going to" en esta estructura.',
    { distractors: ['cooking'], topic: 'daily-life' }),
  bs('f13-wr-bs-umbrella', 'easy', 'Friend', 'Should I take my umbrella today?',
    ['Yes, it', 'might', 'rain', 'later this afternoon'], '.',
    'El modal "might" expresa posibilidad y va seguido del verbo base sin "to": "it might rain". "Might to rain" es un error frecuente entre hispanohablantes.',
    { distractors: ['to rain'], topic: 'daily-life' }),
  bs('f13-wr-bs-math-help', 'easy', 'Classmate', 'Can you explain this math problem to me?',
    ['Sure, I can', 'help', 'you', 'solve it', 'after class'], '.',
    'Estructura "help + objeto + verbo base": "help you solve it". Tras "help" + objeto no se usa la forma en -ing ("solving").',
    { distractors: ['solving'] }),
  bs('f13-wr-bs-mountain-photos', 'medium', 'Classmate', 'Where did you get such nice photos of the mountains?',
    ['They were', 'taken', 'by my cousin', 'during her', 'hiking trip'], '.',
    'Pasiva en pasado simple: "were + participio" ("were taken"), y el agente se introduce con "by" ("by my cousin"). "Took" es el pasado simple activo, no el participio.',
    { distractors: ['took'], topic: 'daily-life' }),
  bs('f13-wr-bs-packing', 'medium', 'Friend', 'Have you finished packing for the trip?',
    ['No, I', "haven't", 'even', 'started', 'packing', 'yet'], '.',
    'Presente perfecto en negativa con "yet" al final: "I haven\'t even started packing yet". "Already" se usa en afirmativas, no con este sentido negativo.',
    { distractors: ['already'], topic: 'daily-life' }),
  bs('f13-wr-bs-study-medicine', 'medium', 'Advisor', 'Are you still planning to study medicine?',
    ['Yes, if I', 'pass', 'the entrance exam,', 'I will apply', 'to medical school', 'next fall'], '.',
    'Primer condicional (futuro real): "if + presente" ("if I pass") y "will + verbo" en la oración principal ("I will apply"). Tras "if" no se usa "will pass".',
    { distractors: ['will pass'] }),
  bs('f13-wr-bs-student-play', 'medium', 'Classmate', 'How was the play at the student theater?',
    ['It was', 'not only', 'funny', 'but also', 'surprisingly moving'], '.',
    'Estructura correlativa "not only … but also" que une dos adjetivos paralelos: "not only funny but also surprisingly moving". También se acepta invertir el orden de los dos adjetivos.',
    { acceptedOrders: [['It was', 'not only', 'surprisingly moving', 'but also', 'funny']] }),
  bs('f13-wr-bs-closing-time', 'hard', 'Friend', "The tour guide didn't mention the closing time.",
    ["Let's ask her", 'what time', 'the galleries', 'close', 'before we', 'go upstairs'], '.',
    'Pregunta indirecta tras "Let\'s ask her": la cláusula lleva orden afirmativo sin auxiliar ("what time the galleries close"), no "what time do the galleries close". También se acepta colocar "before we go upstairs" justo después de "ask her".',
    {
      distractors: ['do'],
      acceptedOrders: [["Let's ask her", 'before we', 'go upstairs', 'what time', 'the galleries', 'close']],
      topic: 'daily-life',
    }),
  bs('f13-wr-bs-mural', 'hard', 'Classmate', 'Who painted the mural in the student center?',
    ['It was', 'painted', 'by two artists', 'invited', 'from a', 'design school', 'in Mexico City'], '.',
    'Pasiva ("was painted by") seguida de una relativa reducida con participio: "two artists invited from…" equivale a "two artists who were invited from…". "Inviting" tendría sentido activo, que no corresponde.',
    { distractors: ['inviting'] }),
  bs('f13-wr-bs-thesis-topic', 'hard', 'Classmate', 'I wish I had chosen a different thesis topic.',
    ['If I', 'were you,', "I wouldn't", 'switch topics', 'this late', 'in the semester'], '.',
    'Segundo condicional para dar un consejo o advertencia: "If I were you, I wouldn\'t + verbo base". "Won\'t" pertenece al primer condicional y no concuerda con "If I were you".',
    { distractors: ["won't"] }),

  // ---------- Write an Email ----------
  {
    id: 'f13-wr-em-japan-credits',
    form: 13,
    section: 'writing',
    task: 'email',
    title: 'Getting Credit for Courses in Japan',
    topic: 'campus-life',
    difficulty: 'medium',
    scenario:
      'You plan to spend next spring semester at a partner university in Japan. Before you apply, you want to make sure that the courses you take there will count toward your degree at your home university.',
    recipient: 'Study Abroad Office',
    subject: 'Course approval for my spring semester in Japan',
    bulletPoints: [
      'Describe the program and the courses you plan to take.',
      'Ask how credits are approved and transferred.',
      'Ask about deadlines and the forms you need to submit.',
    ],
    recommendedWords: [100, 150],
    timeLimitSec: 420,
    sampleResponse:
      'Dear Study Abroad Advisors,\n\nMy name is Daniel Ortiz, and I am a second-year economics major. Next spring, I plan to study at our partner university in Osaka through the semester exchange program. I hope to take four courses there: Japanese Economic History, International Trade, Introduction to Statistics, and an intermediate Japanese language course.\n\nBecause I want to graduate on time, I need to make sure these credits will count toward my degree. Could you explain how courses taken abroad are approved? Does my academic advisor need to sign off on each course before I leave, and how are the credits transferred once the semester ends?\n\nI would also like to know the deadlines for this process. Which forms do I need to submit, and by what date must everything be completed?\n\nThank you for your help. I look forward to hearing from you.\n\nBest regards,\nDaniel Ortiz',
  },

  // ---------- Academic Discussion ----------
  {
    id: 'f13-wr-ad-lab-grown-meat',
    form: 13,
    section: 'writing',
    task: 'academic-discussion',
    title: 'Public Funding for Lab-Grown Meat',
    topic: 'environment',
    difficulty: 'medium',
    course: 'Food Science',
    professor: 'Dr. Lindqvist',
    professorPrompt:
      'Over the past decade, scientists have learned to grow real meat from a small sample of animal cells in a laboratory, without raising and slaughtering livestock. Supporters say this "cultivated meat" could transform our food system, but production is still costly, and only a few countries have approved it for sale. Some people argue that public funding could speed up progress. Should governments invest public money in lab-grown meat as a replacement for traditional livestock farming? Why or why not?',
    posts: [
      {
        author: 'Isabel',
        text: 'Yes, I think public investment is worthwhile. Livestock farming uses huge amounts of land and water, and it produces a large share of greenhouse gas emissions. Lab-grown meat could reduce all of these problems and also prevent a great deal of animal suffering. Private companies may not take the risk on their own, so governments should help the technology reach the market sooner.',
      },
      {
        author: 'Noah',
        text: 'I disagree. The technology is still very expensive and unproven on a large scale, so it may never become affordable. Meanwhile, millions of farmers depend on livestock for their income. I think the money would be better spent helping existing farms become more sustainable, for example by improving animal feed to reduce methane or by restoring damaged grazing land.',
      },
    ],
    recommendedWords: [100, 150],
    timeLimitSec: 600,
    sampleResponse:
      "I understand Noah's concern about farmers, but I agree with Isabel that governments should invest in lab-grown meat, at least in its early stages. One reason nobody has mentioned yet is food security. Traditional livestock is vulnerable to droughts and disease outbreaks, such as bird flu, which can wipe out entire flocks and cause prices to rise sharply. Meat produced in controlled facilities would be far less exposed to these risks, making the food supply more stable. Public money matters here because basic research, like finding cheaper ways to feed the growing cells, is too risky for most private companies to fund alone. Still, governments could respond to Noah's point by also helping farmers move into new roles, such as supplying ingredients to this industry. That way, the transition would not leave rural communities behind.",
  },
];
