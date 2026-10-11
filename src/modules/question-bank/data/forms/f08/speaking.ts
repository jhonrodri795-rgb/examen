import type { SpeakingSet } from '../../../types';

/** Simulación n.º 8 — Speaking (contenido original). */
export const sets: SpeakingSet[] = [
  // ---------- Listen and Repeat ----------
  {
    id: 'f08-sp-lr-media-center',
    form: 8,
    section: 'speaking',
    task: 'listen-repeat',
    title: 'Media Center Equipment',
    topic: 'campus-life',
    difficulty: 'medium',
    speakerVoice: 'male',
    scenario: {
      title: 'Campus media center: borrowing equipment',
      description:
        'A staff member at the campus media center explains how students can borrow cameras and microphones, reserve equipment, return it on time, and book the editing room.',
      icon: 'camera',
    },
    sentences: [
      { id: 'f08-sp-lr-media-center-1', text: 'Welcome to the media center.', responseSec: 8 },
      { id: 'f08-sp-lr-media-center-2', text: 'Our cameras are behind this desk.', responseSec: 8 },
      { id: 'f08-sp-lr-media-center-3', text: 'You can reserve any equipment on our website.', responseSec: 9 },
      { id: 'f08-sp-lr-media-center-4', text: 'Bring your student ID when you pick up your items.', responseSec: 10 },
      { id: 'f08-sp-lr-media-center-5', text: 'All cameras and microphones must be returned within three days.', responseSec: 10 },
      { id: 'f08-sp-lr-media-center-6', text: 'There is a late fee of five dollars for each extra day.', responseSec: 12 },
      { id: 'f08-sp-lr-media-center-7', text: 'You can book the editing room for up to three hours at a time.', responseSec: 13 },
    ],
  },

  // ---------- Take an Interview ----------
  {
    id: 'f08-sp-iv-shopping-habits',
    form: 8,
    section: 'speaking',
    task: 'interview',
    title: 'Shopping Online or in Stores',
    topic: 'daily-life',
    difficulty: 'medium',
    interviewerVoice: 'female',
    intro:
      "Thank you for taking part in our study about how people shop today. I'll ask you a few questions about your own shopping habits and opinions.",
    questions: [
      { id: 'f08-sp-iv-shopping-habits-q1', text: 'Do you usually prefer to buy things online or in physical stores? Why?', responseSec: 45, prepSec: 0 },
      { id: 'f08-sp-iv-shopping-habits-q2', text: 'Describe a shopping experience, online or in person, that went badly or turned out surprisingly well.', responseSec: 45, prepSec: 0 },
      { id: 'f08-sp-iv-shopping-habits-q3', text: 'Some people believe that online shopping is harming small local stores. Do you agree? Please explain your view.', responseSec: 45, prepSec: 0 },
      { id: 'f08-sp-iv-shopping-habits-q4', text: 'Imagine that all the stores in your city closed and everything had to be ordered online. What would you miss most, and why?', responseSec: 45, prepSec: 0 },
    ],
  },
];
