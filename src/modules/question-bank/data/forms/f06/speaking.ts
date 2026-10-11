import type { SpeakingSet } from '../../../types';

/** Simulación n.º 6 — Speaking (contenido original). */
export const sets: SpeakingSet[] = [
  // ---------- Listen and Repeat ----------
  {
    id: 'f06-sp-lr-aquarium-guide',
    form: 6,
    section: 'speaking',
    task: 'listen-repeat',
    title: 'Aquarium Visitor Guide',
    topic: 'daily-life',
    difficulty: 'easy',
    speakerVoice: 'female',
    scenario: {
      title: 'Guided visit: the public aquarium',
      description: 'A guide at a public aquarium welcomes a group of visitors and explains what they will see and the rules for the visit.',
      icon: 'fish',
    },
    sentences: [
      { id: 'f06-sp-lr-aquarium-guide-1', text: 'Welcome to the aquarium, everyone.', responseSec: 8 },
      { id: 'f06-sp-lr-aquarium-guide-2', text: 'The tour lasts about one hour.', responseSec: 8 },
      { id: 'f06-sp-lr-aquarium-guide-3', text: 'First, we will walk through the shark tunnel.', responseSec: 9 },
      { id: 'f06-sp-lr-aquarium-guide-4', text: 'At the touch pool, please use only two fingers.', responseSec: 10 },
      { id: 'f06-sp-lr-aquarium-guide-5', text: 'The penguins are fed at eleven and again at three.', responseSec: 10 },
      { id: 'f06-sp-lr-aquarium-guide-6', text: 'Flash photography is not allowed because bright light can stress the animals.', responseSec: 12 },
      { id: 'f06-sp-lr-aquarium-guide-7', text: 'When the tour ends, we will meet at the gift shop near the main entrance.', responseSec: 13 },
    ],
  },

  // ---------- Take an Interview ----------
  {
    id: 'f06-sp-iv-music-daily',
    form: 6,
    section: 'speaking',
    task: 'interview',
    title: 'Music in Everyday Life',
    topic: 'daily-life',
    difficulty: 'medium',
    interviewerVoice: 'male',
    intro: "Thank you for taking part in our research study about the role of music in people's daily lives. I'll ask you a few questions.",
    questions: [
      { id: 'f06-sp-iv-music-daily-q1', text: 'When and where do you usually listen to music during a typical day?', responseSec: 45, prepSec: 0 },
      { id: 'f06-sp-iv-music-daily-q2', text: 'Tell me about a song or a live performance that you remember especially well. Why does it stand out to you?', responseSec: 45, prepSec: 0 },
      { id: 'f06-sp-iv-music-daily-q3', text: 'Some people think music education should be required in all schools. Do you agree? Why or why not?', responseSec: 45, prepSec: 0 },
      { id: 'f06-sp-iv-music-daily-q4', text: "Imagine that music were no longer allowed in public places such as stores and cafés. How would people's daily lives change?", responseSec: 45, prepSec: 0 },
    ],
  },
];
