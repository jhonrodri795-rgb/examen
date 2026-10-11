import type { SpeakingSet } from '../../../types';

/** Simulación n.º 7 — Speaking (contenido original). */
export const sets: SpeakingSet[] = [
  {
    id: 'f07-sp-lr-old-town-tour',
    form: 7,
    section: 'speaking',
    task: 'listen-repeat',
    title: 'Historic Walking Tour',
    topic: 'history',
    difficulty: 'medium',
    speakerVoice: 'male',
    scenario: {
      title: 'Walking tour: the historic old town',
      description: 'A city guide is beginning a walking tour of the old town with a group of visitors.',
      icon: 'landmark',
    },
    sentences: [
      { id: 'f07-sp-lr-old-town-tour-1', text: 'Welcome to the old town.', responseSec: 8 },
      { id: 'f07-sp-lr-old-town-tour-2', text: 'Our meeting point is this fountain.', responseSec: 8 },
      { id: 'f07-sp-lr-old-town-tour-3', text: 'The town hall was rebuilt after a fire.', responseSec: 9 },
      { id: 'f07-sp-lr-old-town-tour-4', text: 'Its clock tower is the oldest in the region.', responseSec: 10 },
      { id: 'f07-sp-lr-old-town-tour-5', text: "In the market square, you'll find local cheese and flowers.", responseSec: 11 },
      { id: 'f07-sp-lr-old-town-tour-6', text: 'Please stay together, because the narrow streets here can be very confusing.', responseSec: 12 },
      { id: 'f07-sp-lr-old-town-tour-7', text: "We'll stop for a coffee break at the café near the river around eleven.", responseSec: 14 },
    ],
  },
  {
    id: 'f07-sp-iv-volunteering',
    form: 7,
    section: 'speaking',
    task: 'interview',
    title: 'Volunteering in the Community',
    topic: 'sociology',
    difficulty: 'medium',
    interviewerVoice: 'female',
    intro: "Hello, and thank you for taking part in our study about volunteering and helping others. I'll ask you four short questions.",
    questions: [
      { id: 'f07-sp-iv-volunteering-q1', text: 'Have you ever volunteered for an organization or an event? What did you do there?', responseSec: 45, prepSec: 0 },
      { id: 'f07-sp-iv-volunteering-q2', text: 'How did that experience affect you? Or, if you have never volunteered, how do you think it would affect you?', responseSec: 45, prepSec: 0 },
      { id: 'f07-sp-iv-volunteering-q3', text: 'Some companies give their employees paid time off to do volunteer work. Do you think all companies should do this? Why or why not?', responseSec: 45, prepSec: 0 },
      { id: 'f07-sp-iv-volunteering-q4', text: 'If you could start a volunteer project in your community, what would it focus on, and why?', responseSec: 45, prepSec: 0 },
    ],
  },
];
