import type { SpeakingSet } from '../../../types';

/** Simulación n.º 15 — Speaking (contenido original). */
export const sets: SpeakingSet[] = [
  {
    id: 'f15-sp-lr-trail-briefing',
    form: 15,
    section: 'speaking',
    task: 'listen-repeat',
    title: 'National Park Trail Briefing',
    topic: 'daily-life',
    difficulty: 'medium',
    speakerVoice: 'female',
    scenario: {
      title: 'National park: ranger briefing before a mountain hike',
      description:
        'A park ranger briefs a group of hikers before a mountain trail, explaining how much water to carry, how to follow the trail markers, what to do if they see wildlife, how quickly the weather can change, and when they must be back.',
      icon: 'mountain',
    },
    sentences: [
      { id: 'f15-sp-lr-trail-briefing-1', text: 'Welcome to the Ridge Trail.', responseSec: 8 },
      { id: 'f15-sp-lr-trail-briefing-2', text: 'Carry at least two liters of water.', responseSec: 8 },
      { id: 'f15-sp-lr-trail-briefing-3', text: 'Follow the yellow markers painted on the trees.', responseSec: 9 },
      { id: 'f15-sp-lr-trail-briefing-4', text: "If you can't see the next marker, turn back.", responseSec: 10 },
      { id: 'f15-sp-lr-trail-briefing-5', text: 'If you see a bear, stay calm and back away slowly.', responseSec: 10 },
      { id: 'f15-sp-lr-trail-briefing-6', text: 'The weather on the mountain can change very quickly, even in summer.', responseSec: 12 },
      {
        id: 'f15-sp-lr-trail-briefing-7',
        text: 'Everyone must be back at this trailhead by four, before the last shuttle leaves.',
        responseSec: 13,
      },
    ],
  },
  {
    id: 'f15-sp-iv-museums-culture',
    form: 15,
    section: 'speaking',
    task: 'interview',
    title: 'Museums and Cultural Events',
    topic: 'art',
    difficulty: 'medium',
    interviewerVoice: 'male',
    intro:
      "Hello, and thank you for joining us. We're doing a survey about how people take part in museums and cultural events. I'll ask you four questions.",
    questions: [
      {
        id: 'f15-sp-iv-museums-culture-q1',
        text: 'When was the last time you went to a museum, a concert, or a cultural festival? What was it like?',
        responseSec: 45,
        prepSec: 0,
      },
      {
        id: 'f15-sp-iv-museums-culture-q2',
        text: 'What kind of cultural event do you enjoy most, and why?',
        responseSec: 45,
        prepSec: 0,
      },
      {
        id: 'f15-sp-iv-museums-culture-q3',
        text: 'Some people think museums should be free for everyone. Do you agree? Why or why not?',
        responseSec: 45,
        prepSec: 0,
      },
      {
        id: 'f15-sp-iv-museums-culture-q4',
        text: 'If your city asked you to plan a cultural festival, what would you include, and why?',
        responseSec: 45,
        prepSec: 0,
      },
    ],
  },
];
