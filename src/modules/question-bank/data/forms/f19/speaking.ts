import type { SpeakingSet } from '../../../types';

/** Simulación n.º 19 — Speaking (contenido original). */
export const sets: SpeakingSet[] = [
  {
    id: 'f19-sp-lr-arrival-welcome',
    form: 19,
    section: 'speaking',
    task: 'listen-repeat',
    title: 'International Student Arrival Desk',
    topic: 'campus-life',
    difficulty: 'medium',
    speakerVoice: 'female',
    scenario: {
      title: 'Welcome desk: new international students',
      description:
        'A staff member at the international student welcome desk greets new arrivals and explains the shuttle, housing check-in, documents, phone cards, and orientation.',
      icon: 'plane',
    },
    sentences: [
      { id: 'f19-sp-lr-arrival-welcome-1', text: 'Welcome to the university, everyone.', responseSec: 8 },
      { id: 'f19-sp-lr-arrival-welcome-2', text: 'The shuttle stops outside Door 4.', responseSec: 8 },
      { id: 'f19-sp-lr-arrival-welcome-3', text: 'Shuttles run every thirty minutes until midnight tonight.', responseSec: 9 },
      { id: 'f19-sp-lr-arrival-welcome-4', text: 'At your residence, check in at the housing desk.', responseSec: 10 },
      { id: 'f19-sp-lr-arrival-welcome-5', text: 'Please keep your passport and admission letter in your bag.', responseSec: 10 },
      { id: 'f19-sp-lr-arrival-welcome-6', text: 'You can buy a local SIM card at the campus convenience store.', responseSec: 12 },
      { id: 'f19-sp-lr-arrival-welcome-7', text: 'Orientation begins on Monday at nine, so try to get some rest this weekend.', responseSec: 14 },
    ],
  },
  {
    id: 'f19-sp-iv-pets',
    form: 19,
    section: 'speaking',
    task: 'interview',
    title: 'Pets and Caring for Animals',
    topic: 'daily-life',
    difficulty: 'medium',
    interviewerVoice: 'male',
    intro: "Hello, and thank you for joining us. We're conducting a study about people's experiences with pets and other animals. I'll ask you a few questions.",
    questions: [
      { id: 'f19-sp-iv-pets-q1', text: 'Have you ever had a pet or taken care of an animal? Tell me about that experience.', responseSec: 45, prepSec: 0 },
      { id: 'f19-sp-iv-pets-q2', text: 'What did you learn from that experience? Or, if you have never had a pet, what do you think caring for an animal teaches people?', responseSec: 45, prepSec: 0 },
      { id: 'f19-sp-iv-pets-q3', text: 'Some apartment buildings do not allow tenants to keep pets. Do you think pets should be allowed in apartments? Why or why not?', responseSec: 45, prepSec: 0 },
      { id: 'f19-sp-iv-pets-q4', text: 'Imagine that your university allowed students to bring their pets to class. What do you think would happen, and would it be a good idea?', responseSec: 45, prepSec: 0 },
    ],
  },
];
