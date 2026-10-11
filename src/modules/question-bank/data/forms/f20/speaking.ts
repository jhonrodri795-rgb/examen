import type { SpeakingSet } from '../../../types';

/** Simulación n.º 20 — Speaking (contenido original). */
export const sets: SpeakingSet[] = [
  {
    id: 'f20-sp-lr-writing-center',
    form: 20,
    section: 'speaking',
    task: 'listen-repeat',
    title: 'Writing Center Session',
    topic: 'campus-life',
    difficulty: 'medium',
    speakerVoice: 'female',
    scenario: {
      title: 'Campus writing center: how a session works',
      description: 'A tutor at the campus writing center is explaining to a new student how tutoring sessions work.',
      icon: 'pen-line',
    },
    sentences: [
      { id: 'f20-sp-lr-writing-center-1', text: 'Welcome to the writing center.', responseSec: 8 },
      { id: 'f20-sp-lr-writing-center-2', text: 'Each tutoring session lasts forty-five minutes.', responseSec: 8 },
      { id: 'f20-sp-lr-writing-center-3', text: 'Please bring a copy of your assignment instructions.', responseSec: 9 },
      { id: 'f20-sp-lr-writing-center-4', text: "Tutors give you feedback, but they don't edit papers.", responseSec: 10 },
      { id: 'f20-sp-lr-writing-center-5', text: 'You can book an appointment online through the student portal.', responseSec: 11 },
      { id: 'f20-sp-lr-writing-center-6', text: 'We can help you organize your ideas, but the revisions are yours.', responseSec: 12 },
      { id: 'f20-sp-lr-writing-center-7', text: 'If you want more help, you can schedule a follow-up visit before you leave.', responseSec: 14 },
    ],
  },
  {
    id: 'f20-sp-iv-celebrations',
    form: 20,
    section: 'speaking',
    task: 'interview',
    title: 'Celebrations and Traditions',
    topic: 'sociology',
    difficulty: 'medium',
    interviewerVoice: 'male',
    intro:
      "Thank you for taking part in our study about how people celebrate holidays and keep traditions alive. I'll ask you a few questions.",
    questions: [
      { id: 'f20-sp-iv-celebrations-q1', text: 'What is your favorite holiday or celebration, and how do you usually spend it?', responseSec: 45, prepSec: 0 },
      { id: 'f20-sp-iv-celebrations-q2', text: 'Please describe a family tradition that is important to you, and explain why it matters.', responseSec: 45, prepSec: 0 },
      { id: 'f20-sp-iv-celebrations-q3', text: 'Some people say that traditional celebrations are losing their meaning in modern society. Do you agree? Why or why not?', responseSec: 45, prepSec: 0 },
      { id: 'f20-sp-iv-celebrations-q4', text: 'If you could create a new public holiday for your country, what would it celebrate, and how would people mark it?', responseSec: 45, prepSec: 0 },
    ],
  },
];
