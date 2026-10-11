import type { SpeakingSet } from '../../../types';

/** Simulación n.º 9 — Speaking (contenido original). */
export const sets: SpeakingSet[] = [
  {
    id: 'f09-sp-lr-ceramics-studio',
    form: 9,
    section: 'speaking',
    task: 'listen-repeat',
    title: 'Ceramics Studio Safety',
    topic: 'art',
    difficulty: 'medium',
    speakerVoice: 'male',
    scenario: {
      title: 'Ceramics studio: first-day introduction',
      description:
        'An instructor gives a first-day introduction in the ceramics studio, explaining where to find aprons, how to store clay, why students must never open the kilns, how to clean the pottery wheels, and where to wash their hands.',
      icon: 'palette',
    },
    sentences: [
      { id: 'f09-sp-lr-ceramics-studio-1', text: 'Welcome to the ceramics studio, everyone.', responseSec: 8 },
      { id: 'f09-sp-lr-ceramics-studio-2', text: "You'll find clean aprons beside the door.", responseSec: 8 },
      { id: 'f09-sp-lr-ceramics-studio-3', text: 'Store your clay in the sealed plastic bins.', responseSec: 9 },
      { id: 'f09-sp-lr-ceramics-studio-4', text: "Any clay that's left uncovered will dry out overnight.", responseSec: 10 },
      { id: 'f09-sp-lr-ceramics-studio-5', text: 'Never open the kilns, because they reach extremely high temperatures.', responseSec: 11 },
      { id: 'f09-sp-lr-ceramics-studio-6', text: 'When class ends, wipe down your pottery wheel with a damp sponge.', responseSec: 13 },
      { id: 'f09-sp-lr-ceramics-studio-7', text: 'Then wash your hands at the large sink in the back, not in the restrooms.', responseSec: 15 },
    ],
  },
  {
    id: 'f09-sp-iv-staying-active',
    form: 9,
    section: 'speaking',
    task: 'interview',
    title: 'Exercise and Staying Active',
    topic: 'daily-life',
    difficulty: 'medium',
    interviewerVoice: 'female',
    intro:
      "Hi, and thanks for taking part. We're doing a study about exercise and how students stay active during the school year. I'll ask you a few questions.",
    questions: [
      { id: 'f09-sp-iv-staying-active-q1', text: 'What do you usually do to stay physically active during a normal week?', responseSec: 45, prepSec: 0 },
      { id: 'f09-sp-iv-staying-active-q2', text: 'Tell me about a sport or physical activity you tried for the first time. How did it go?', responseSec: 45, prepSec: 0 },
      { id: 'f09-sp-iv-staying-active-q3', text: 'Some people think universities should require all students to take physical education classes. Do you agree? Why or why not?', responseSec: 45, prepSec: 0 },
      { id: 'f09-sp-iv-staying-active-q4', text: 'Imagine your university offered lower fees to students who exercise regularly. Would that be a fair idea? Explain your answer.', responseSec: 45, prepSec: 0 },
    ],
  },
];
