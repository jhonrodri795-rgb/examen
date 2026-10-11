import type { SpeakingSet } from '../../../types';

/** Simulación n.º 10 — Speaking (contenido original). */
export const sets: SpeakingSet[] = [
  {
    id: 'f10-sp-lr-giraffe-keeper',
    form: 10,
    section: 'speaking',
    task: 'listen-repeat',
    title: 'Wildlife Park Keeper Talk',
    topic: 'biology',
    difficulty: 'medium',
    speakerVoice: 'female',
    scenario: {
      title: 'Wildlife park: the giraffe enclosure',
      description:
        'A keeper at a wildlife park is giving a short talk to visitors at the giraffe enclosure about feeding, safety rules, and how the herd behaves.',
      icon: 'paw-print',
    },
    sentences: [
      { id: 'f10-sp-lr-giraffe-keeper-1', text: 'Welcome to the giraffe enclosure.', responseSec: 8 },
      { id: 'f10-sp-lr-giraffe-keeper-2', text: 'This herd has six adult giraffes.', responseSec: 8 },
      { id: 'f10-sp-lr-giraffe-keeper-3', text: 'Giraffes eat mostly leaves, twigs, and fresh hay.', responseSec: 9 },
      { id: 'f10-sp-lr-giraffe-keeper-4', text: 'Our feeding platform holds food high above the ground.', responseSec: 10 },
      { id: 'f10-sp-lr-giraffe-keeper-5', text: "Please don't feed the animals, even if they come close.", responseSec: 10 },
      { id: 'f10-sp-lr-giraffe-keeper-6', text: 'Food from visitors can upset their stomachs and make them seriously ill.', responseSec: 12 },
      { id: 'f10-sp-lr-giraffe-keeper-7', text: 'If one giraffe senses danger, the rest of the herd stops eating and watches.', responseSec: 14 },
    ],
  },
  {
    id: 'f10-sp-iv-friendship',
    form: 10,
    section: 'speaking',
    task: 'interview',
    title: 'Friendship and Keeping in Touch',
    topic: 'sociology',
    difficulty: 'medium',
    interviewerVoice: 'male',
    intro:
      "Hi, and thanks for joining us. We're doing a study about friendship and how people keep in touch with each other. I'll ask you a few questions.",
    questions: [
      { id: 'f10-sp-iv-friendship-q1', text: 'How do you usually keep in touch with friends who live far away from you?', responseSec: 45, prepSec: 0 },
      { id: 'f10-sp-iv-friendship-q2', text: 'Tell me about a friendship that has lasted a long time. What do you think has kept it strong?', responseSec: 45, prepSec: 0 },
      { id: 'f10-sp-iv-friendship-q3', text: 'Some people say social media makes friendships stronger, while others say it makes them weaker. What do you think, and why?', responseSec: 45, prepSec: 0 },
      { id: 'f10-sp-iv-friendship-q4', text: 'Imagine you moved to a new city where you knew nobody. How would you try to make friends there?', responseSec: 45, prepSec: 0 },
    ],
  },
];
