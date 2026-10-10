import type { SpeakingSet } from '../../../types';

/** Simulación n.º 3 — Speaking (contenido original). */
export const sets: SpeakingSet[] = [
  {
    id: 'f03-sp-lr-health-clinic',
    form: 3,
    section: 'speaking',
    task: 'listen-repeat',
    title: 'Health Clinic Check-In',
    topic: 'campus-life',
    difficulty: 'medium',
    speakerVoice: 'female',
    scenario: {
      title: 'Student health clinic: checking in',
      description: 'A receptionist at the student health clinic is explaining the check-in process to a new patient.',
      icon: 'stethoscope',
    },
    sentences: [
      { id: 'f03-sp-lr-health-clinic-1', text: 'Welcome to the student health clinic.', responseSec: 8 },
      { id: 'f03-sp-lr-health-clinic-2', text: 'Please sign in at the front desk.', responseSec: 8 },
      { id: 'f03-sp-lr-health-clinic-3', text: 'Fill out both forms on this clipboard, please.', responseSec: 9 },
      { id: 'f03-sp-lr-health-clinic-4', text: 'The blue form asks about any allergies you have.', responseSec: 10 },
      { id: 'f03-sp-lr-health-clinic-5', text: "I'll need to make a copy of your insurance card.", responseSec: 10 },
      { id: 'f03-sp-lr-health-clinic-6', text: 'The wait is usually about twenty minutes, but mornings can be busier.', responseSec: 12 },
      { id: 'f03-sp-lr-health-clinic-7', text: 'After your appointment, you can pick up any prescriptions at the pharmacy down the hall.', responseSec: 14 },
    ],
  },
  {
    id: 'f03-sp-iv-cooking',
    form: 3,
    section: 'speaking',
    task: 'interview',
    title: 'Cooking and Eating Habits',
    topic: 'daily-life',
    difficulty: 'medium',
    interviewerVoice: 'male',
    intro: "Hi, and thanks for taking part. We're doing a survey about students' cooking and eating habits. I'll ask you a few questions.",
    questions: [
      { id: 'f03-sp-iv-cooking-q1', text: 'How often do you cook your own meals, and what do you usually make?', responseSec: 45, prepSec: 0 },
      { id: 'f03-sp-iv-cooking-q2', text: 'Tell me about a dish that is important to you or your family. Why does it matter to you?', responseSec: 45, prepSec: 0 },
      { id: 'f03-sp-iv-cooking-q3', text: 'Some people think schools should teach students how to cook healthy meals. Do you agree? Why or why not?', responseSec: 45, prepSec: 0 },
      { id: 'f03-sp-iv-cooking-q4', text: 'Imagine your university replaced its cafeteria with a shared kitchen where students cook for themselves. How do you think students would react, and why?', responseSec: 45, prepSec: 0 },
    ],
  },
];
