import type { SpeakingSet } from '../../../types';

/** Simulación n.º 11 — Speaking (contenido original). */
export const sets: SpeakingSet[] = [
  {
    id: 'f11-sp-lr-theater-backstage',
    form: 11,
    section: 'speaking',
    task: 'listen-repeat',
    title: 'Theater Backstage Tour',
    topic: 'campus-life',
    difficulty: 'easy',
    speakerVoice: 'female',
    scenario: {
      title: 'Backstage tour: the university theater',
      description:
        'A stage manager is leading a group of visitors on a backstage tour of the university theater, showing the dressing rooms, the prop table, and the lighting booth.',
      icon: 'theater',
    },
    sentences: [
      { id: 'f11-sp-lr-theater-backstage-1', text: 'Welcome to the backstage area.', responseSec: 8 },
      { id: 'f11-sp-lr-theater-backstage-2', text: 'Please stay close to the group.', responseSec: 8 },
      { id: 'f11-sp-lr-theater-backstage-3', text: 'These are the dressing rooms for the actors.', responseSec: 9 },
      { id: 'f11-sp-lr-theater-backstage-4', text: 'All the props are kept on this long table.', responseSec: 10 },
      { id: 'f11-sp-lr-theater-backstage-5', text: 'The lights are controlled from the booth above the audience.', responseSec: 11 },
      {
        id: 'f11-sp-lr-theater-backstage-6',
        text: 'During rehearsals, please stay quiet so the actors can hear their cues.',
        responseSec: 12,
      },
      {
        id: 'f11-sp-lr-theater-backstage-7',
        text: 'In an emergency, use the green exit doors on either side of the stage.',
        responseSec: 14,
      },
    ],
  },
  {
    id: 'f11-sp-iv-student-money',
    form: 11,
    section: 'speaking',
    task: 'interview',
    title: 'Managing Money as a Student',
    topic: 'daily-life',
    difficulty: 'medium',
    interviewerVoice: 'male',
    intro:
      "Hi, and thanks for joining our study on how university students handle their finances. I'd like to ask you a few questions about money and budgeting.",
    questions: [
      {
        id: 'f11-sp-iv-student-money-q1',
        text: 'How do you usually keep track of what you spend each month?',
        responseSec: 45,
        prepSec: 0,
      },
      {
        id: 'f11-sp-iv-student-money-q2',
        text: 'Tell me about a time when you saved money for something that was important to you.',
        responseSec: 45,
        prepSec: 0,
      },
      {
        id: 'f11-sp-iv-student-money-q3',
        text: 'Do you think high schools should teach personal finance as a required subject? Why or why not?',
        responseSec: 45,
        prepSec: 0,
      },
      {
        id: 'f11-sp-iv-student-money-q4',
        text: 'Imagine that you unexpectedly received a gift of one thousand dollars. How would you use it, and why?',
        responseSec: 45,
        prepSec: 0,
      },
    ],
  },
];
