import type { SpeakingSet } from '../../../types';

/** Simulación n.º 2 — Speaking (contenido original). */
export const sets: SpeakingSet[] = [
  {
    id: 'f02-sp-lr-botanical-garden',
    form: 2,
    section: 'speaking',
    task: 'listen-repeat',
    title: 'Botanical Garden Walk',
    topic: 'campus-life',
    difficulty: 'medium',
    speakerVoice: 'female',
    scenario: {
      title: 'Botanical Garden Walk',
      description:
        'A volunteer guide leads visitors through the university botanical garden, showing them the tropical greenhouse and the desert plant section.',
      icon: 'flower',
    },
    sentences: [
      { id: 'f02-sp-lr-botanical-garden-1', text: 'Welcome to our botanical garden.', responseSec: 8 },
      { id: 'f02-sp-lr-botanical-garden-2', text: 'Please stay on the paths today.', responseSec: 8 },
      { id: 'f02-sp-lr-botanical-garden-3', text: 'The tropical greenhouse is just ahead of us.', responseSec: 9 },
      { id: 'f02-sp-lr-botanical-garden-4', text: "It's kept warm and humid throughout the whole year.", responseSec: 10 },
      { id: 'f02-sp-lr-botanical-garden-5', text: "Next, we'll visit the desert section with its cactus collection.", responseSec: 11 },
      { id: 'f02-sp-lr-botanical-garden-6', text: 'Walking off the paths can damage delicate roots hidden under the soil.', responseSec: 12 },
      { id: 'f02-sp-lr-botanical-garden-7', text: "Don't forget that the gift shop is holding a plant sale until five o'clock.", responseSec: 14 },
    ],
  },
  {
    id: 'f02-sp-iv-sleep-study',
    form: 2,
    section: 'speaking',
    task: 'interview',
    title: 'Sleep Habits and Study Routines',
    topic: 'campus-life',
    difficulty: 'medium',
    interviewerVoice: 'male',
    intro:
      "Thank you for taking part in our campus wellness survey about students' sleep habits and study routines. I'll ask you a few questions.",
    questions: [
      {
        id: 'f02-sp-iv-sleep-study-q1',
        text: 'What does a typical evening look like for you during a busy week of classes?',
        responseSec: 45,
        prepSec: 0,
      },
      {
        id: 'f02-sp-iv-sleep-study-q2',
        text: 'Describe a time when you stayed up late to study. How did it affect you the next day?',
        responseSec: 45,
        prepSec: 0,
      },
      {
        id: 'f02-sp-iv-sleep-study-q3',
        text: 'Some people believe that schools and universities should start later in the morning so that students can sleep more. Do you agree? Why or why not?',
        responseSec: 45,
        prepSec: 0,
      },
      {
        id: 'f02-sp-iv-sleep-study-q4',
        text: 'If you could design an ideal daily schedule for students, what would it look like, and why?',
        responseSec: 45,
        prepSec: 0,
      },
    ],
  },
];
