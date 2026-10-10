import type { SpeakingSet } from '../../../types';

/** Simulación n.º 1 — Speaking (contenido original). */
export const sets: SpeakingSet[] = [
  {
    id: 'f01-sp-lr-fitness-center',
    form: 1,
    section: 'speaking',
    task: 'listen-repeat',
    title: 'Fitness Center Orientation',
    topic: 'campus-life',
    difficulty: 'medium',
    speakerVoice: 'male',
    scenario: {
      title: 'Campus fitness center: new member orientation',
      description: 'A staff member is welcoming new members and explaining the rules of the campus fitness center.',
      icon: 'dumbbell',
    },
    sentences: [
      { id: 'f01-sp-lr-fitness-center-1', text: 'Welcome to the fitness center.', responseSec: 8 },
      { id: 'f01-sp-lr-fitness-center-2', text: 'Please scan your student ID here.', responseSec: 8 },
      { id: 'f01-sp-lr-fitness-center-3', text: 'Lockers are free, but bring your own lock.', responseSec: 9 },
      { id: 'f01-sp-lr-fitness-center-4', text: 'Wipe down every machine as soon as you finish.', responseSec: 10 },
      { id: 'f01-sp-lr-fitness-center-5', text: 'You can book group fitness classes online one week ahead.', responseSec: 11 },
      { id: 'f01-sp-lr-fitness-center-6', text: 'If you lift heavy weights, ask a staff member to spot you.', responseSec: 12 },
      { id: 'f01-sp-lr-fitness-center-7', text: 'In the weight area, return the dumbbells to the rack and never drop them.', responseSec: 14 },
    ],
  },
  {
    id: 'f01-sp-iv-public-transport',
    form: 1,
    section: 'speaking',
    task: 'interview',
    title: 'Students and Public Transportation',
    topic: 'daily-life',
    difficulty: 'medium',
    interviewerVoice: 'female',
    intro:
      "Thank you for joining us. We're conducting a study about how university students use public transportation. I'll ask you a few questions.",
    questions: [
      {
        id: 'f01-sp-iv-public-transport-q1',
        text: 'How do you usually get around your city or campus, and why do you choose that way of traveling?',
        responseSec: 45,
        prepSec: 0,
      },
      {
        id: 'f01-sp-iv-public-transport-q2',
        text: 'Tell me about a time when public transportation helped you or caused you a problem. What happened?',
        responseSec: 45,
        prepSec: 0,
      },
      {
        id: 'f01-sp-iv-public-transport-q3',
        text: 'Some people think cities should make public transportation free for students. Do you agree? Why or why not?',
        responseSec: 45,
        prepSec: 0,
      },
      {
        id: 'f01-sp-iv-public-transport-q4',
        text: 'If your city could improve just one thing about its transportation system, what should it be, and how would that change daily life?',
        responseSec: 45,
        prepSec: 0,
      },
    ],
  },
];
