import type { BuildSentenceSet, Difficulty, Topic, WritingSet } from '../../../types';

/** Simulación n.º 11 — Writing (contenido original). */
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
    form: 11,
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
  bs('f11-wr-bs-learn-to-cook', 'easy', 'daily-life', 'Where did you learn to cook so well?',
    ['I learned', 'to cook', 'from my grandmother', 'when I', 'lived with her'], '.',
    'Pasado simple con una oración de "when": las dos acciones están terminadas en el pasado ("I learned… when I lived with her"). El presente perfecto ("I have learned") no se combina con una cláusula de tiempo pasado concreta como "when I lived with her".',
    { distractors: ['I have learned'] }),
  bs('f11-wr-bs-lecture-hall-size', 'easy', 'campus-life', 'Is the lecture hall big enough for the event?',
    ["I'm afraid", "it's", 'too small', 'for', 'that many guests'], '.',
    'Estructura "too + adjetivo + for + sustantivo" para decir que algo excede lo adecuado: "too small for that many guests". En inglés no se dice "too much small": "too" va directamente delante del adjetivo.',
    { distractors: ['too much small'] }),
  bs('f11-wr-bs-walking-fast', 'easy', 'daily-life', 'Why are you walking so fast?',
    ["I'm having", 'lunch with', 'my professor', 'in ten minutes'], '.',
    'Presente continuo para un plan ya acordado en el futuro cercano: "I\'m having lunch with my professor in ten minutes". La expresión de tiempo ("in ten minutes") va al final.'),
  bs('f11-wr-bs-learning-japanese', 'medium', 'campus-life', 'How long have you been learning Japanese?',
    ["I've been", 'taking', 'evening classes', 'since', 'I started college'], '.',
    'Presente perfecto continuo ("I\'ve been taking") para una actividad que empezó en el pasado y sigue ahora. "Since" va con un punto de inicio ("since I started college"); "for" iría con una duración (for two years).',
    { distractors: ['for'] }),
  bs('f11-wr-bs-campus-newspaper', 'medium', 'campus-life', 'Is the campus newspaper printed every week?',
    ['Actually,', 'it', 'is only printed', 'twice a month', 'during the semester'], '.',
    'Presente simple pasivo: "be + participio" ("it is only printed"), porque el periódico no imprime, sino que es impreso. La forma activa "only prints" no tiene sentido con "it" (the newspaper) como sujeto.',
    { distractors: ['only prints'] }),
  bs('f11-wr-bs-mentor-advice', 'medium', 'campus-life', 'What advice did your mentor give you?',
    ['She', 'told me', 'to focus on', 'courses', 'that I', 'really enjoy'], '.',
    'Orden en estilo indirecto: "tell + persona + to + infinitivo" ("She told me to focus on…"). "Said me" es incorrecto: "say" no lleva a la persona como objeto directo.',
    { distractors: ['said me'] }),
  bs('f11-wr-bs-storm-tonight', 'medium', 'daily-life', 'The forecast says a big storm is coming tonight.',
    ['In that case,', 'we', 'had better', 'bring our bikes', 'inside', 'before dark'], '.',
    '"Had better + infinitivo sin to" expresa un consejo fuerte o una advertencia: "we had better bring our bikes inside". "Had better to" es un error frecuente.',
    { distractors: ['had better to'] }),
  bs('f11-wr-bs-registration-error', 'hard', 'campus-life', 'The online registration system keeps showing an error.',
    ['Could you', 'tell me', 'what', 'the error message', 'says', 'when you', 'try to log in'], '?',
    'Pregunta indirecta tras "Could you tell me": la cláusula lleva orden afirmativo, sujeto + verbo ("what the error message says"), sin el auxiliar "does" de la pregunta directa ("What does it say?").',
    { distractors: ['does'] }),
  bs('f11-wr-bs-housing-report', 'hard', 'campus-life', 'Did you read the report about campus housing costs?',
    ['Yes, and', 'what', 'surprised me', 'was', 'how quickly', 'rents near campus', 'have risen'], '.',
    'Oración escindida (cleft) "What surprised me was…": la cláusula con "what" funciona como sujeto y destaca lo que sigue a "was". Después va una pregunta indirecta con orden afirmativo ("how quickly rents… have risen"). En inglés es "what", no "that" (calco de «lo que»).',
    { distractors: ['that'] }),
  bs('f11-wr-bs-mark-absent', 'hard', 'campus-life', "Why didn't Mark come to the study session?",
    ['He', 'must have', 'forgotten', 'that we', 'moved', 'the session', 'to the library'], '.',
    'Verbo modal perfecto "must have + participio" para una deducción lógica sobre el pasado: "He must have forgotten". "Must had" es incorrecto, porque después de un modal va siempre "have".',
    { distractors: ['must had'] }),

  // ---------- Write an Email ----------
  {
    id: 'f11-wr-em-unsafe-crossing',
    form: 11,
    section: 'writing',
    task: 'email',
    title: 'Unsafe Road Crossing Near Campus',
    topic: 'daily-life',
    difficulty: 'medium',
    scenario:
      'Many students at your university cross a busy road near campus at a spot where there is no crosswalk or traffic light. You decide to write to a member of the city council about the problem.',
    recipient: 'Ms. Teresa Morgan, City Council Member',
    subject: 'Request for a safe crossing on Harmon Road',
    bulletPoints: [
      'Describe the location and explain why it is dangerous.',
      'Explain who is affected and at what times of day.',
      'Propose a specific solution that the city could carry out.',
    ],
    recommendedWords: [90, 150],
    timeLimitSec: 420,
    sampleResponse:
      'Dear Ms. Morgan,\n\nI am a third-year student at Lakeview University, and I am writing about a dangerous spot on Harmon Road, between the north gate of campus and the Pine Grove apartments. Hundreds of students cross there every day because it is the shortest way to class, but there is no crosswalk or traffic light for almost half a mile. Cars often drive fast, and a curve just before the spot makes it hard for drivers to see pedestrians.\n\nThe risk is highest between 8 and 10 a.m., when students rush to morning classes, and after evening classes end around 9 p.m., when it is already dark. Local residents walking to the bus stop also use this crossing.\n\nI would like to propose that the city install a marked crosswalk with a pedestrian-activated signal at this location. A lower speed limit near campus would also help.\n\nThank you for considering this request.\n\nSincerely,\nAna Torres',
  },

  // ---------- Academic Discussion ----------
  {
    id: 'f11-wr-ad-returning-objects',
    form: 11,
    section: 'writing',
    task: 'academic-discussion',
    title: 'Returning Museum Objects Home',
    topic: 'sociology',
    difficulty: 'medium',
    course: 'Anthropology',
    professor: 'Dr. Nakamura',
    professorPrompt:
      'This week we have been discussing how cultural objects move between societies. Many museums in Europe and North America hold sculptures, textiles, and ceremonial items that were taken from other countries long ago, sometimes during wars or periods of colonial rule. In recent years, several governments and communities have asked for these objects to be returned. Some museums have agreed, while others have refused. Should museums return such objects to their countries of origin? Why or why not?',
    posts: [
      {
        author: 'Leila',
        text: 'Yes, I think they should. These objects belong to the communities that made them, and many of them have cultural or spiritual meaning that is lost in a foreign display case. A sacred mask, for example, was created to be used in ceremonies, not to sit behind glass with a short label. Returning it would allow people to reconnect with their own history and traditions.',
      },
      {
        author: 'Ethan',
        text: 'Not necessarily. Large museums have the expertise and equipment to preserve fragile objects safely, and they show them to millions of visitors from all over the world every year. If an object is sent to a place without proper storage, it could be damaged forever. I think long-term loans or shared exhibitions between museums may be a better solution that respects both sides.',
      },
    ],
    recommendedWords: [100, 150],
    timeLimitSec: 600,
    sampleResponse:
      "I agree with Leila that most of these objects should be returned, although Ethan raises a fair concern about preservation. In my view, the strongest reason is that many of these items were taken when their owners had no power to refuse, for example during wars or colonial rule. Keeping them today simply continues that unfair situation. Ethan's worry about damage is reasonable, but it is becoming less convincing. In recent years, several countries in Africa and Asia have built modern museums and trained their own conservators, and international partners can share equipment and expertise with them. Moreover, returning an object does not have to end public access. A country that gets its heritage back could still lend some pieces to foreign museums for temporary exhibitions. That way, millions of visitors can still see them, but the decision about how they are displayed belongs to the people whose culture they represent.",
  },
];
