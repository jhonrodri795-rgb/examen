import type { SpeakingSet } from '../../../types';

/** Simulación n.º 5 — Speaking (contenido original). */
export const sets: SpeakingSet[] = [
  {
    id: 'f05-sp-lr-dining-hall',
    form: 5,
    section: 'speaking',
    task: 'listen-repeat',
    title: 'Dining Hall Introduction',
    topic: 'campus-life',
    difficulty: 'easy',
    speakerVoice: 'male',
    scenario: {
      title: 'Campus tour: the main dining hall',
      description: 'A dining services employee is showing new students around the main dining hall.',
      icon: 'utensils',
    },
    sentences: [
      { id: 'f05-sp-lr-dining-hall-1', text: 'Welcome to our dining hall.', responseSec: 8 },
      { id: 'f05-sp-lr-dining-hall-2', text: 'Each visit uses one meal swipe.', responseSec: 8 },
      { id: 'f05-sp-lr-dining-hall-3', text: 'Hot meals are served at the back counter.', responseSec: 9 },
      { id: 'f05-sp-lr-dining-hall-4', text: 'Red labels mark any dishes that contain common allergens.', responseSec: 10 },
      { id: 'f05-sp-lr-dining-hall-5', text: 'If you have an allergy, please talk to our chef.', responseSec: 10 },
      { id: 'f05-sp-lr-dining-hall-6', text: 'After eating, please leave your tray on the belt near the exit.', responseSec: 12 },
      { id: 'f05-sp-lr-dining-hall-7', text: 'On weekdays we open at seven a.m., but on weekends breakfast starts at nine.', responseSec: 13 },
    ],
  },
  {
    id: 'f05-sp-iv-part-time-work',
    form: 5,
    section: 'speaking',
    task: 'interview',
    title: 'Working While Studying',
    topic: 'campus-life',
    difficulty: 'medium',
    interviewerVoice: 'female',
    intro:
      "Hi, and thanks for taking part in our study about how students balance work and school. I'd like to ask you a few questions.",
    questions: [
      {
        id: 'f05-sp-iv-part-time-work-q1',
        text: 'Have you ever had a part-time job or a regular responsibility outside of school? Tell me what you did.',
        responseSec: 45,
        prepSec: 0,
      },
      {
        id: 'f05-sp-iv-part-time-work-q2',
        text: 'What is the most valuable thing you learned from that experience?',
        responseSec: 45,
        prepSec: 0,
      },
      {
        id: 'f05-sp-iv-part-time-work-q3',
        text: 'Some people think university students should work while they study, while others believe students should focus only on their classes. What is your opinion?',
        responseSec: 45,
        prepSec: 0,
      },
      {
        id: 'f05-sp-iv-part-time-work-q4',
        text: 'Imagine your university offered course credit for part-time work. Would that be a good idea? Why or why not?',
        responseSec: 45,
        prepSec: 0,
      },
    ],
  },
];
