import type { SpeakingSet } from '../../../types';

/** Simulación n.º 4 — Speaking (contenido original). */
export const sets: SpeakingSet[] = [
  {
    id: 'f04-sp-lr-move-in',
    form: 4,
    section: 'speaking',
    task: 'listen-repeat',
    title: 'Residence Hall Move-In',
    topic: 'campus-life',
    difficulty: 'medium',
    speakerVoice: 'female',
    scenario: {
      title: 'Move-in day at a residence hall',
      description: 'A resident assistant is welcoming first-year students and their families on move-in day.',
      icon: 'house',
    },
    sentences: [
      { id: 'f04-sp-lr-move-in-1', text: 'Welcome to Maple Hall, everyone.', responseSec: 8 },
      { id: 'f04-sp-lr-move-in-2', text: 'Cars can unload by the side entrance.', responseSec: 8 },
      { id: 'f04-sp-lr-move-in-3', text: 'Room keys are available at the front desk.', responseSec: 9 },
      { id: 'f04-sp-lr-move-in-4', text: 'Bring your student ID when you collect your key.', responseSec: 10 },
      { id: 'f04-sp-lr-move-in-5', text: "Quiet hours start at ten o'clock every night, including weekends.", responseSec: 11 },
      { id: 'f04-sp-lr-move-in-6', text: 'The laundry room is in the basement, next to the bike storage.', responseSec: 12 },
      { id: 'f04-sp-lr-move-in-7', text: 'Our first floor meeting is on Sunday at seven p.m. in the main lounge.', responseSec: 14 },
    ],
  },
  {
    id: 'f04-sp-iv-reading-pleasure',
    form: 4,
    section: 'speaking',
    task: 'interview',
    title: 'Reading for Pleasure',
    topic: 'daily-life',
    difficulty: 'medium',
    interviewerVoice: 'male',
    intro: "Hi, and thanks for joining us. We're doing a study on the reading habits of university students. I'll ask you a few questions.",
    questions: [
      { id: 'f04-sp-iv-reading-pleasure-q1', text: 'What kinds of books, magazines, or articles do you enjoy reading in your free time?', responseSec: 45, prepSec: 0 },
      { id: 'f04-sp-iv-reading-pleasure-q2', text: 'Describe a book or story that changed the way you think about something.', responseSec: 45, prepSec: 0 },
      { id: 'f04-sp-iv-reading-pleasure-q3', text: 'Some people say that young people read less for pleasure than previous generations did. Do you agree? Why or why not?', responseSec: 45, prepSec: 0 },
      { id: 'f04-sp-iv-reading-pleasure-q4', text: 'If your town wanted to encourage more people to read, what kind of program would you suggest, and why?', responseSec: 45, prepSec: 0 },
    ],
  },
];
