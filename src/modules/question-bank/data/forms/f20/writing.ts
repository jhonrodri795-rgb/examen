import type { BuildSentenceSet, Difficulty, Topic, WritingSet } from '../../../types';

/** Simulación n.º 20 — Writing (contenido original). */

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
    form: 20,
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
  bs('f20-wr-bs-folding-chairs', 'easy', 'campus-life', 'Volunteer', 'Where should I put these folding chairs?',
    ['Please stack them', 'in the corner', 'of the', 'main hall'], '.',
    'Imperativo con complemento de lugar: «Please stack them» + «in the corner of the main hall». La preposición «in» se usa con «corner» cuando hablamos del interior de una sala.'),
  bs('f20-wr-bs-taller-brother', 'easy', 'daily-life', 'Friend', 'Are you taller than your brother?',
    ['Yes, but', "I'm only", 'a little', 'taller than', 'he is'], '.',
    'Comparativo de superioridad matizado: «a little» va delante del adjetivo comparativo («a little taller than he is»). No se dice «more taller».',
    { distractors: ['more'] }),
  bs('f20-wr-bs-learning-drive', 'easy', 'daily-life', 'Neighbor', 'Why are you learning to drive?',
    ['I want', 'to visit', 'my grandparents', 'more often'], '.',
    'Verbo + infinitivo: «want» exige «to + verbo» («I want to visit»), nunca la forma en -ing. «More often» va al final como complemento de frecuencia.',
    { distractors: ['visiting'] }),
  bs('f20-wr-bs-new-manager', 'medium', 'daily-life', 'Coworker', 'Has the new manager started yet?',
    ['Yes, she', 'has already', 'met', 'most of', 'the staff', 'on our floor'], '.',
    'Presente perfecto con «already»: el adverbio va entre «has» y el participio («has already met»). El participio de «meet» es «met», no «meet».',
    { distractors: ['meet'] }),
  bs('f20-wr-bs-crowded-streets', 'medium', 'daily-life', 'Roommate', 'Why are the streets so crowded today?',
    ['The main avenue', 'is being', 'repaved,', 'so everyone', 'is using', 'the side streets'], '.',
    'Presente continuo pasivo: «is being + participio» («is being repaved») indica una acción en curso que alguien realiza sobre el sujeto. «Is been» no es correcto.',
    { distractors: ['is been'] }),
  bs('f20-wr-bs-club-movie', 'medium', 'campus-life', 'Classmate', 'Did you like the movie the club showed last night?',
    ['It was', 'so funny', 'that I', "couldn't stop", 'laughing'], '.',
    'Estructura «so + adjetivo + that» para expresar un resultado en pasado: «so funny that I couldn\'t stop laughing». «Such» necesita un sustantivo («such a funny movie»).',
    { distractors: ['such funny'] }),
  bs('f20-wr-bs-water-plants', 'medium', 'daily-life', 'Neighbor', "Can you water my plants while I'm away?",
    ['Sure, I can', 'as long as', 'you leave', 'a spare key', 'with me'], '.',
    'Condicional con «as long as» (siempre que): la condición va en presente («as long as you leave»), no en futuro con «will».',
    { distractors: ['you will leave'] }),
  bs('f20-wr-bs-extra-readings', 'hard', 'campus-life', 'Classmate', "The professor posted extra readings, but I can't find them.",
    ['Did you', 'check', 'whether she', 'uploaded them', 'to the course page', 'or sent them', 'by email'], '?',
    'Pregunta indirecta con «whether … or»: tras «check» la cláusula mantiene el orden afirmativo («whether she uploaded them»), sin inversión ni auxiliar «did».',
    { distractors: ['whether did she'] }),
  bs('f20-wr-bs-stadium-late', 'hard', 'daily-life', 'Friend', 'Did you get to the stadium before the game started?',
    ['No, by the time', 'we finally', 'found', 'a parking spot,', 'the first half', 'had already', 'ended'], '.',
    'Pasado perfecto con «by the time»: la acción anterior va en pasado perfecto («had already ended») y la posterior en pasado simple («we finally found»).',
    { distractors: ['has already'] }),
  bs('f20-wr-bs-sick-tell', 'hard', 'daily-life', 'Friend', "Why didn't you tell anyone you were sick?",
    ["You're right,", 'I should have', 'said something', 'earlier,', 'but I', "didn't want", 'to worry anyone'], '.',
    'Modal perfecto «should have + participio» para expresar arrepentimiento por el pasado («I should have said something»), con el adverbio de tiempo «earlier» al final de la cláusula.',
    { distractors: ['should had'] }),

  // ---------- Write an Email ----------
  {
    id: 'f20-wr-em-science-center-visit',
    form: 20,
    section: 'writing',
    task: 'email',
    title: 'Group Visit to a Science Center',
    topic: 'daily-life',
    difficulty: 'medium',
    scenario:
      'You volunteer with an after-school program at a community center. You would like to bring a group of twenty children to the city science center for a guided visit next month.',
    recipient: 'Ms. Rivera, Education Coordinator at the Lakeside Science Center',
    subject: 'Guided visit for an after-school group',
    bulletPoints: [
      'Describe the group and your preferred date for the visit.',
      'Ask whether the center offers group rates or discounts for nonprofit programs.',
      'Request any accommodations the group needs, such as wheelchair access and a place to eat lunch.',
    ],
    recommendedWords: [100, 150],
    timeLimitSec: 420,
    sampleResponse:
      "Dear Ms. Rivera,\n\nMy name is Daniel Ortiz, and I volunteer with the Bright Futures after-school program at the Eastside Community Center. I am writing to request a guided visit to the science center for our group next month.\n\nWe would bring twenty children between the ages of eight and eleven, along with four adult volunteers. The children have been studying weather and space this term, so a tour on those topics would be ideal. Our preferred date is Wednesday, May 14, in the morning, but Thursday, May 15, would also work.\n\nSince we are a nonprofit program with a small budget, could you tell me whether you offer group rates or discounts for organizations like ours?\n\nFinally, one of the children uses a wheelchair, so we would need an accessible route through the exhibits. We would also appreciate a place where the group could eat packed lunches.\n\nThank you for your help.\n\nBest regards,\nDaniel Ortiz",
  },

  // ---------- Academic Discussion ----------
  {
    id: 'f20-wr-ad-tourism-limits',
    form: 20,
    section: 'writing',
    task: 'academic-discussion',
    title: 'Limiting Tourist Numbers',
    topic: 'economics',
    difficulty: 'medium',
    course: 'Tourism Management',
    professor: 'Dr. Okafor',
    professorPrompt:
      'Over the past decade, several famous destinations, from historic city centers to national parks, have started limiting the number of visitors allowed each day or charging tourists a special entry fee. Supporters say these measures prevent overcrowding and pay for the protection of fragile places. Critics argue that they turn travel into a privilege and damage the local economy. Is limiting visitor numbers or charging entry fees a good way to manage tourism? Why or why not?',
    posts: [
      {
        author: 'Elena',
        text: 'Yes, I think these measures make sense. Some sites are simply too fragile to handle thousands of people a day: footpaths erode, old buildings get damaged, and residents can no longer walk through their own neighborhoods. Daily limits protect both the places and the people who live there, and entry fees can pay for maintenance and conservation work that would otherwise be underfunded.',
      },
      {
        author: 'Josh',
        text: 'I understand the goal, but I disagree. If a destination charges high fees or sells only a few tickets, travel becomes possible mainly for wealthier people, and students or families on a budget get left out. Limits also hurt small local businesses, like family restaurants and souvenir shops, that depend on large numbers of visitors to survive, especially in towns with few other jobs.',
      },
    ],
    recommendedWords: [100, 150],
    timeLimitSec: 600,
    sampleResponse:
      "I agree with Elena that limits and fees can be a good tool, although Josh raises a fair point about cost. In my opinion, the strongest argument for these measures is that they improve the experience for visitors themselves. When a museum or a narrow mountain trail is packed with people, nobody can really enjoy it, and many tourists leave disappointed. For example, some popular heritage sites now sell timed tickets, so visitors spread out during the day instead of arriving all at once. To address Josh's concern, destinations could keep fees low for students or offer a few free days each month. They could also promote nearby towns as additional attractions, which would spread tourist spending to more local businesses instead of concentrating it in one crowded place.",
  },
];
