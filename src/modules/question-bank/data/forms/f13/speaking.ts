import type { SpeakingSet } from '../../../types';

/** Simulación n.º 13 — Speaking (contenido original). */
export const sets: SpeakingSet[] = [
  {
    id: 'f13-sp-lr-observatory-night',
    form: 13,
    section: 'speaking',
    task: 'listen-repeat',
    title: 'Observatory Open Night',
    topic: 'campus-life',
    difficulty: 'medium',
    speakerVoice: 'female',
    scenario: {
      title: 'Campus observatory: open night',
      description: 'An astronomer welcomes visitors to an open night at the campus observatory and explains the rules for viewing.',
      icon: 'telescope',
    },
    sentences: [
      { id: 'f13-sp-lr-observatory-night-1', text: 'Welcome to the campus observatory.', responseSec: 8 },
      { id: 'f13-sp-lr-observatory-night-2', text: 'Please line up near the telescope.', responseSec: 8 },
      { id: 'f13-sp-lr-observatory-night-3', text: 'Each visitor gets two minutes at the eyepiece.', responseSec: 9 },
      { id: 'f13-sp-lr-observatory-night-4', text: 'Please use only red flashlights while you are outside.', responseSec: 10 },
      { id: 'f13-sp-lr-observatory-night-5', text: "Red light helps everyone's eyes stay adjusted to the dark.", responseSec: 11 },
      { id: 'f13-sp-lr-observatory-night-6', text: 'Tonight both Jupiter and Saturn will be visible above the eastern horizon.', responseSec: 12 },
      { id: 'f13-sp-lr-observatory-night-7', text: 'It gets cold on the roof after dark, so please keep your jackets on.', responseSec: 14 },
    ],
  },
  {
    id: 'f13-sp-iv-foreign-languages',
    form: 13,
    section: 'speaking',
    task: 'interview',
    title: 'Learning Foreign Languages',
    topic: 'linguistics',
    difficulty: 'medium',
    interviewerVoice: 'male',
    intro:
      "Thank you for taking part in our study about how people learn foreign languages. I'll ask you a few questions about your experiences and opinions.",
    questions: [
      { id: 'f13-sp-iv-foreign-languages-q1', text: 'What languages have you studied, and how did you learn them?', responseSec: 45, prepSec: 0 },
      { id: 'f13-sp-iv-foreign-languages-q2', text: 'Tell me about a time when knowing another language helped you, or when not knowing one made things difficult.', responseSec: 45, prepSec: 0 },
      { id: 'f13-sp-iv-foreign-languages-q3', text: 'Some people believe children should start learning a second language in elementary school. Do you agree? Why or why not?', responseSec: 45, prepSec: 0 },
      { id: 'f13-sp-iv-foreign-languages-q4', text: 'Imagine that translation apps became perfect. Would people still need to learn foreign languages? Please explain.', responseSec: 45, prepSec: 0 },
    ],
  },
];
