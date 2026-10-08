import type { EmailTaskSet } from '../../types';

/** Write an Email (Writing, formato 2026). Aprox. 7 minutos. */
export const sets: EmailTaskSet[] = [
  {
    id: 'wr-em-presentation-date',
    section: 'writing',
    task: 'email',
    title: 'Rescheduling a Presentation',
    topic: 'campus-life',
    difficulty: 'easy',
    scenario:
      'You are scheduled to give a presentation in your history class next Tuesday. However, you have just learned that you must attend an important family event that day.',
    recipient: 'Professor Martínez',
    subject: 'Request to change my presentation date',
    bulletPoints: [
      'Explain why you cannot present on Tuesday.',
      'Suggest a new date for your presentation.',
      'Ask whether you should prepare anything differently.',
    ],
    recommendedWords: [80, 140],
    timeLimitSec: 420,
    sampleResponse:
      "Dear Professor Martínez,\n\nI am writing to ask whether I could change the date of my presentation, which is currently scheduled for next Tuesday. I recently found out that my sister is getting married that day in another city, and my family expects me to be there.\n\nWould it be possible for me to present on Thursday instead? I will have my slides ready by then, and I would be happy to switch places with a classmate if that is easier for you.\n\nAlso, since Thursday's class focuses on a different period, should I adjust my presentation to connect it with that topic, or should I keep it as planned?\n\nThank you for your understanding.\n\nBest regards,\nAlex",
  },
  {
    id: 'wr-em-gym-equipment',
    section: 'writing',
    task: 'email',
    title: 'Problems at the Campus Gym',
    topic: 'campus-life',
    difficulty: 'medium',
    scenario:
      'You use the campus fitness center regularly. For the past three weeks, two of the four treadmills have been broken, and students often wait more than twenty minutes to use one.',
    recipient: 'Ms. Chen, Fitness Center Manager',
    subject: 'Broken treadmills at the fitness center',
    bulletPoints: [
      'Describe the problem.',
      'Explain how it affects you.',
      'Suggest a possible solution.',
    ],
    recommendedWords: [80, 140],
    timeLimitSec: 420,
    sampleResponse:
      "Dear Ms. Chen,\n\nI am a regular user of the campus fitness center, and I would like to let you know about a problem with the treadmills. For the past three weeks, two of the four machines have been out of order, and there is often a line of students waiting to use the remaining two.\n\nThis has been difficult for me because I train for a half marathon and usually go to the gym between classes. Waiting more than twenty minutes means I often have to leave before finishing my workout.\n\nWould it be possible to schedule a repair as soon as possible? In the meantime, perhaps the center could set a thirty-minute limit on each treadmill during busy hours so that more students can use them.\n\nThank you for your attention.\n\nSincerely,\nSam",
  },
  {
    id: 'wr-em-missed-meeting',
    section: 'writing',
    task: 'email',
    title: 'Update for a Teammate',
    topic: 'campus-life',
    difficulty: 'medium',
    scenario:
      'Your project group met yesterday to plan a presentation for your marketing class. One member, Daniel, was sick and could not attend.',
    recipient: 'Daniel',
    subject: 'What we decided at yesterday\'s meeting',
    bulletPoints: [
      'Summarize what the group decided.',
      'Tell Daniel which task he has been assigned.',
      'Ask when he will be available to meet next.',
    ],
    recommendedWords: [80, 140],
    timeLimitSec: 420,
    sampleResponse:
      "Hi Daniel,\n\nI hope you are feeling better! I wanted to update you on yesterday's meeting. We decided to focus our presentation on how small coffee shops use social media to compete with big chains. We will interview two local café owners next week and use their answers as case studies.\n\nSince you are great with numbers, we assigned you the market data section. Could you find statistics about coffee consumption in our city and prepare two or three simple charts?\n\nWe would like to meet again before Friday to put everything together. When are you available? Thursday afternoon works for most of us, but let us know if another time is better for you.\n\nTake care,\nMaria",
  },
  {
    id: 'wr-em-library-hours',
    section: 'writing',
    task: 'email',
    title: 'Responding to a Newspaper Article',
    topic: 'campus-life',
    difficulty: 'hard',
    scenario:
      'The student newspaper published an article reporting that the university plans to close the main library at 8 p.m. instead of midnight to save money. The editor invites readers to respond.',
    recipient: 'The Editor, The Campus Herald',
    subject: 'Response to the article on library hours',
    bulletPoints: [
      'State your opinion about the proposed change.',
      'Support your opinion with a reason or personal experience.',
      'Propose an alternative way for the university to save money.',
    ],
    recommendedWords: [90, 150],
    timeLimitSec: 420,
    sampleResponse:
      "Dear Editor,\n\nI am writing in response to your article about closing the main library at 8 p.m. In my opinion, this change would seriously harm students, especially those who work part-time.\n\nI have a job at a restaurant until 7 p.m. on weekdays, so the evening is the only time I can use the library's computers and quiet study rooms. Many of my classmates are in the same situation, and the library is often full after 9 p.m. during exam periods.\n\nInstead of reducing hours, the university could save money by keeping only the first floor open late at night, which would lower heating and staffing costs. Another option would be to replace old lighting with energy-efficient lamps, as other campuses have done.\n\nSincerely,\nJordan Rivera",
  },
  {
    id: 'wr-em-conference-volunteer',
    section: 'writing',
    task: 'email',
    title: 'Volunteering at a Conference',
    topic: 'technology',
    difficulty: 'easy',
    scenario:
      'Your university is hosting a technology conference next month, and the organizers are looking for student volunteers.',
    recipient: 'Dr. Patel, Conference Organizer',
    subject: 'Interest in volunteering at the conference',
    bulletPoints: [
      'Introduce yourself.',
      'Explain why you would be a good volunteer.',
      'Ask about the schedule or responsibilities.',
    ],
    recommendedWords: [80, 140],
    timeLimitSec: 420,
    sampleResponse:
      "Dear Dr. Patel,\n\nMy name is Lina Park, and I am a second-year computer science student. I saw the announcement about the technology conference, and I would love to volunteer.\n\nI think I would be a good volunteer because I have experience helping at events. Last year I worked at the registration desk of our department's open day, and I am comfortable answering questions from visitors. I also speak English, Korean, and some Spanish, which could be useful for international guests.\n\nCould you tell me how many hours volunteers are expected to work and what kinds of tasks they will do? I have classes on Monday mornings, but I am free the rest of the week.\n\nThank you for considering my request.\n\nBest regards,\nLina Park",
  },
];
