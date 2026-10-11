import type { SpeakingSet } from '../../../types';

/** Simulación n.º 14 — Speaking (contenido original). */
export const sets: SpeakingSet[] = [
  {
    id: 'f14-sp-lr-bike-workshop',
    form: 14,
    section: 'speaking',
    task: 'listen-repeat',
    title: 'Bike Repair Workshop',
    topic: 'daily-life',
    difficulty: 'easy',
    speakerVoice: 'male',
    scenario: {
      title: 'Community bike repair workshop',
      description:
        'A volunteer mechanic at a community bike workshop explains how to sign in, where the tools are kept, how to fix a flat tire with help, why tools must be returned, and how donations support the shop.',
      icon: 'bike',
    },
    sentences: [
      { id: 'f14-sp-lr-bike-workshop-1', text: 'Welcome to our bike workshop.', responseSec: 8 },
      { id: 'f14-sp-lr-bike-workshop-2', text: 'Please sign in at the front desk.', responseSec: 8 },
      { id: 'f14-sp-lr-bike-workshop-3', text: 'The tools hang on the wall behind me.', responseSec: 9 },
      { id: 'f14-sp-lr-bike-workshop-4', text: 'Each tool has its own outline on the pegboard.', responseSec: 10 },
      { id: 'f14-sp-lr-bike-workshop-5', text: 'If your tire is flat, a volunteer can help you.', responseSec: 10 },
      { id: 'f14-sp-lr-bike-workshop-6', text: 'Please put each tool back on the wall after you use it.', responseSec: 12 },
      {
        id: 'f14-sp-lr-bike-workshop-7',
        text: 'Your donations help us buy new parts and keep the workshop open for everyone.',
        responseSec: 13,
      },
    ],
  },
  {
    id: 'f14-sp-iv-time-management',
    form: 14,
    section: 'speaking',
    task: 'interview',
    title: 'Time Management and Deadlines',
    topic: 'campus-life',
    difficulty: 'medium',
    interviewerVoice: 'female',
    intro:
      "Thank you for taking part in our study on how students manage their time. I'll ask you a few questions about planning and deadlines.",
    questions: [
      {
        id: 'f14-sp-iv-time-management-q1',
        text: 'How do you usually plan your week when you have several deadlines at the same time?',
        responseSec: 45,
        prepSec: 0,
      },
      {
        id: 'f14-sp-iv-time-management-q2',
        text: 'Describe a time when you put off a task until the last minute. What happened?',
        responseSec: 45,
        prepSec: 0,
      },
      {
        id: 'f14-sp-iv-time-management-q3',
        text: 'Do you think calendar apps and to-do lists really help people manage their time better? Why or why not?',
        responseSec: 45,
        prepSec: 0,
      },
      {
        id: 'f14-sp-iv-time-management-q4',
        text: 'If you had a completely free month with no classes or work, how would you spend it, and why?',
        responseSec: 45,
        prepSec: 0,
      },
    ],
  },
];
