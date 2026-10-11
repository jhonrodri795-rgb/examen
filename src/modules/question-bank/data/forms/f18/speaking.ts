import type { SpeakingSet } from '../../../types';

/** Simulación n.º 18 — Speaking (contenido original). */
export const sets: SpeakingSet[] = [
  {
    id: 'f18-sp-lr-aquatic-center',
    form: 18,
    section: 'speaking',
    task: 'listen-repeat',
    title: 'Aquatic Center Pool Rules',
    topic: 'campus-life',
    difficulty: 'medium',
    speakerVoice: 'male',
    scenario: {
      title: 'Campus tour: the aquatic center',
      description:
        'A lifeguard explains the rules of the university aquatic center: showering first, choosing a lane by speed, no running on the deck, where diving is allowed, and the lap-swimming hours.',
      icon: 'waves',
    },
    sentences: [
      { id: 'f18-sp-lr-aquatic-center-1', text: 'Welcome to the aquatic center.', responseSec: 8 },
      { id: 'f18-sp-lr-aquatic-center-2', text: 'Please shower before entering the pool.', responseSec: 8 },
      { id: 'f18-sp-lr-aquatic-center-3', text: 'Choose a lane that matches your swimming speed.', responseSec: 9 },
      { id: 'f18-sp-lr-aquatic-center-4', text: 'Faster swimmers should use the lanes on the left.', responseSec: 10 },
      { id: 'f18-sp-lr-aquatic-center-5', text: 'For your safety, running on the pool deck is not allowed.', responseSec: 11 },
      { id: 'f18-sp-lr-aquatic-center-6', text: 'Diving is permitted only at the deep end, near the blue flags.', responseSec: 12 },
      {
        id: 'f18-sp-lr-aquatic-center-7',
        text: 'Lap swimming is available every morning from six to nine and on weekday evenings.',
        responseSec: 14,
      },
    ],
  },
  {
    id: 'f18-sp-iv-hobbies',
    form: 18,
    section: 'speaking',
    task: 'interview',
    title: 'Hobbies and Creativity',
    topic: 'daily-life',
    difficulty: 'medium',
    interviewerVoice: 'female',
    intro:
      "Thank you for taking part in our study about how people spend their free time and express their creativity. I'll ask you a few questions.",
    questions: [
      { id: 'f18-sp-iv-hobbies-q1', text: 'What hobby do you enjoy most, and how did you first get started with it?', responseSec: 45, prepSec: 0 },
      { id: 'f18-sp-iv-hobbies-q2', text: 'Please describe something you created or made yourself that you are especially proud of.', responseSec: 45, prepSec: 0 },
      {
        id: 'f18-sp-iv-hobbies-q3',
        text: 'Some people say adults should make more time for creative hobbies, even when they are busy with work. Do you agree? Why or why not?',
        responseSec: 45,
        prepSec: 0,
      },
      {
        id: 'f18-sp-iv-hobbies-q4',
        text: 'If you could instantly master any creative skill, such as painting, music, or cooking, which one would you choose, and how would you use it?',
        responseSec: 45,
        prepSec: 0,
      },
    ],
  },
];
