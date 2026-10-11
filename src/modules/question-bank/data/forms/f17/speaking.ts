import type { SpeakingSet } from '../../../types';

/** Simulación n.º 17 — Speaking (contenido original). */
export const sets: SpeakingSet[] = [
  {
    id: 'f17-sp-lr-farmers-market',
    form: 17,
    section: 'speaking',
    task: 'listen-repeat',
    title: 'Farmers Market Volunteers',
    topic: 'daily-life',
    difficulty: 'medium',
    speakerVoice: 'male',
    scenario: {
      title: 'Saturday farmers market: volunteer briefing',
      description:
        'A coordinator is briefing volunteers before a Saturday farmers market, explaining how to set up the tents, who will staff the information booth, where the recycling bins go, how to help vendors unload, and when each shift ends.',
      icon: 'tent',
    },
    sentences: [
      { id: 'f17-sp-lr-farmers-market-1', text: 'Thanks for volunteering this morning.', responseSec: 8 },
      { id: 'f17-sp-lr-farmers-market-2', text: "Let's start by setting up tents.", responseSec: 8 },
      { id: 'f17-sp-lr-farmers-market-3', text: 'Please put a weight on every tent leg.', responseSec: 9 },
      { id: 'f17-sp-lr-farmers-market-4', text: 'Maria and Josh will staff the information booth today.', responseSec: 10 },
      { id: 'f17-sp-lr-farmers-market-5', text: 'The recycling bins should go next to the main entrance.', responseSec: 10 },
      { id: 'f17-sp-lr-farmers-market-6', text: 'When vendors arrive, please help them carry their boxes from the trucks.', responseSec: 12 },
      { id: 'f17-sp-lr-farmers-market-7', text: "The first shift ends at eleven, and the second one ends at three o'clock.", responseSec: 13 },
    ],
  },
  {
    id: 'f17-sp-iv-following-news',
    form: 17,
    section: 'speaking',
    task: 'interview',
    title: 'Following the News',
    topic: 'daily-life',
    difficulty: 'medium',
    interviewerVoice: 'female',
    intro:
      "Thanks for joining us. Our student media team is researching how young people keep up with current events, so I'd like to ask you a few questions about your own news habits.",
    questions: [
      { id: 'f17-sp-iv-following-news-q1', text: 'How do you usually find out about current events, and how often do you check the news?', responseSec: 45, prepSec: 0 },
      { id: 'f17-sp-iv-following-news-q2', text: 'Tell me about a news story that you followed closely. Why did it interest you?', responseSec: 45, prepSec: 0 },
      { id: 'f17-sp-iv-following-news-q3', text: 'Do you think young people today are well informed about what happens in the world? Why or why not?', responseSec: 45, prepSec: 0 },
      { id: 'f17-sp-iv-following-news-q4', text: 'If you were in charge of a news website for students, what kinds of stories would you publish, and why?', responseSec: 45, prepSec: 0 },
    ],
  },
];
