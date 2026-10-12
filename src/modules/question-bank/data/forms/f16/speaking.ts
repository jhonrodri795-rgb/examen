import type { SpeakingSet } from '../../../types';

/** Simulación n.º 16 — Speaking (contenido original). */
export const sets: SpeakingSet[] = [
  {
    id: 'f16-sp-lr-makerspace',
    form: 16,
    section: 'speaking',
    task: 'listen-repeat',
    title: 'Makerspace 3D Printing',
    topic: 'campus-life',
    difficulty: 'medium',
    speakerVoice: 'female',
    scenario: {
      title: 'Library makerspace: 3D printing orientation',
      description: 'A staff member is explaining to new students how to use the 3D printers in the library makerspace.',
      icon: 'printer',
    },
    sentences: [
      { id: 'f16-sp-lr-makerspace-1', text: 'Welcome to the library makerspace.', responseSec: 8 },
      { id: 'f16-sp-lr-makerspace-2', text: 'Safety training is required for everyone.', responseSec: 8 },
      { id: 'f16-sp-lr-makerspace-3', text: 'You can book printers on the library website.', responseSec: 9 },
      { id: 'f16-sp-lr-makerspace-4', text: 'Each student may print for three hours a day.', responseSec: 10 },
      { id: 'f16-sp-lr-makerspace-5', text: 'Please upload your design file at least one day in advance.', responseSec: 10 },
      { id: 'f16-sp-lr-makerspace-6', text: 'Printing material costs ten cents per gram, paid with your student card.', responseSec: 12 },
      { id: 'f16-sp-lr-makerspace-7', text: 'Safety goggles must be worn whenever you remove supports or sand a finished print.', responseSec: 13 },
    ],
  },
  {
    id: 'f16-sp-iv-shared-living',
    form: 16,
    section: 'speaking',
    task: 'interview',
    title: 'Sharing a Living Space',
    topic: 'daily-life',
    difficulty: 'medium',
    interviewerVoice: 'male',
    intro: "Thanks for taking part in our study on student housing. We're interested in how people share a living space, so I'll ask you a few questions about your own experience.",
    questions: [
      { id: 'f16-sp-iv-shared-living-q1', text: 'Who do you live with right now, and how do you divide household tasks like cooking and cleaning?', responseSec: 45, prepSec: 0 },
      { id: 'f16-sp-iv-shared-living-q2', text: 'Tell me about a disagreement you had with someone you lived with. How did you resolve it?', responseSec: 45, prepSec: 0 },
      { id: 'f16-sp-iv-shared-living-q3', text: 'Some people say that living with roommates teaches important life skills. Do you agree? Please explain.', responseSec: 45, prepSec: 0 },
      { id: 'f16-sp-iv-shared-living-q4', text: 'If you could create one rule that every roommate in the world had to follow, what would it be, and why?', responseSec: 45, prepSec: 0 },
    ],
  },
];
