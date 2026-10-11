import type { SpeakingSet } from '../../../types';

/** Simulación n.º 12 — Speaking (contenido original). */
export const sets: SpeakingSet[] = [
  // ---------- Listen and Repeat ----------
  {
    id: 'f12-sp-lr-career-center',
    form: 12,
    section: 'speaking',
    task: 'listen-repeat',
    title: 'Career Center Welcome',
    topic: 'campus-life',
    difficulty: 'medium',
    speakerVoice: 'female',
    scenario: {
      title: 'Campus tour: the career center',
      description: 'A career counselor is introducing the services of the campus career center to new students.',
      icon: 'briefcase',
    },
    sentences: [
      { id: 'f12-sp-lr-career-center-1', text: 'Welcome to the career center.', responseSec: 8 },
      { id: 'f12-sp-lr-career-center-2', text: 'Our counselors can review your résumé.', responseSec: 8 },
      { id: 'f12-sp-lr-career-center-3', text: 'Practice interviews are held every Tuesday and Thursday.', responseSec: 9 },
      { id: 'f12-sp-lr-career-center-4', text: 'You can look for jobs on our online board.', responseSec: 10 },
      { id: 'f12-sp-lr-career-center-5', text: 'To book an appointment, use the link on our website.', responseSec: 11 },
      { id: 'f12-sp-lr-career-center-6', text: 'Please bring a printed copy of your résumé to every practice interview.', responseSec: 12 },
      { id: 'f12-sp-lr-career-center-7', text: 'The next career fair is on October twentieth, and over sixty employers will attend.', responseSec: 14 },
    ],
  },

  // ---------- Take an Interview ----------
  {
    id: 'f12-sp-iv-travel',
    form: 12,
    section: 'speaking',
    task: 'interview',
    title: 'Travel and New Places',
    topic: 'daily-life',
    difficulty: 'medium',
    interviewerVoice: 'male',
    intro:
      "Thank you for taking part in our study about how students experience travel and new places. I'll ask you a few questions.",
    questions: [
      {
        id: 'f12-sp-iv-travel-q1',
        text: 'Think of a place you have visited that you would like to return to. Where is it, and why would you go back?',
        responseSec: 45,
        prepSec: 0,
      },
      {
        id: 'f12-sp-iv-travel-q2',
        text: 'Some people plan every detail of a trip, while others decide things as they go. Which do you prefer? Please give an example.',
        responseSec: 45,
        prepSec: 0,
      },
      {
        id: 'f12-sp-iv-travel-q3',
        text: 'Some people say that traveling is a necessary part of a good education. Do you agree? Explain why or why not.',
        responseSec: 45,
        prepSec: 0,
      },
      {
        id: 'f12-sp-iv-travel-q4',
        text: 'If you could spend a semester studying in any country, where would you go, and what would you hope to learn there?',
        responseSec: 45,
        prepSec: 0,
      },
    ],
  },
];
