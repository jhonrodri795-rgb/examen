import type { DiscussionTaskSet } from '../../types';

/** Writing for an Academic Discussion (Writing, formato 2026). 10 minutos. */
export const sets: DiscussionTaskSet[] = [
  {
    id: 'wr-ad-general-education',
    section: 'writing',
    task: 'academic-discussion',
    title: 'Courses Outside Your Major',
    topic: 'sociology',
    difficulty: 'medium',
    course: 'Education Policy',
    professor: 'Dr. Gómez',
    professorPrompt:
      'Many universities require students to take several courses outside their major, such as art for engineering students or science for history students. Supporters say this creates well-rounded graduates. Critics argue that it wastes time and money. Should universities require students to take courses outside their major? Why or why not?',
    posts: [
      { author: 'Claire', text: 'I think these requirements are valuable. My philosophy class taught me how to build an argument, and that has helped me write better lab reports in my biology major. Employers want people who can think in different ways, not just specialists.' },
      { author: 'Andrew', text: 'I disagree. Tuition is expensive, and many students already struggle to finish their degrees in four years. Students should be free to choose extra courses if they want, but forcing them to take unrelated classes delays graduation.' },
    ],
    recommendedWords: [100, 150],
    timeLimitSec: 600,
    sampleResponse:
      "I understand Andrew's concern about cost, but I agree with Claire that universities should require some courses outside a student's major. The main reason is that many important problems today cross disciplinary boundaries. For example, an engineer designing a new dam needs to understand not only the technical details but also how the project will affect local communities and the environment. A course in sociology or ecology can prepare students to ask those questions. However, universities could address Andrew's point by limiting the requirement to two or three courses and allowing students to choose ones that complement their major. That way, students gain a broader perspective without adding an extra semester to their studies.",
  },
  {
    id: 'wr-ad-transport-investment',
    section: 'writing',
    task: 'academic-discussion',
    title: 'Public Transit or Better Roads?',
    topic: 'engineering',
    difficulty: 'medium',
    course: 'Urban Planning',
    professor: 'Professor Lee',
    professorPrompt:
      'As electric cars become more common, some city planners argue that investing in better roads and charging stations is enough to reduce pollution. Others believe cities should invest mainly in public transportation, such as buses and trains. If a city had to choose one priority for the next ten years, which should it be? Explain your reasoning.',
    posts: [
      { author: 'Nadia', text: "Public transportation should be the priority. Electric cars still cause traffic jams, and they take up a lot of space for parking. A good subway or bus system can move thousands of people using much less space." },
      { author: 'Tom', text: "I think electric cars are the more realistic option. In many cities, people live far from stations, and buses are slow. If we build more charging stations, people can keep the convenience of driving while reducing emissions." },
    ],
    recommendedWords: [100, 150],
    timeLimitSec: 600,
    sampleResponse:
      "In my view, cities should make public transportation their main priority, although Tom is right that convenience matters. The key issue is not only pollution but also space. Even if every car were electric, a city with growing traffic would still face congestion, and parking lots would continue to occupy valuable land that could be used for housing or parks. A frequent, reliable bus network can carry far more people on the same road. To respond to Tom's concern about people living far from stations, cities could combine both approaches by placing charging stations and secure bike parking near major transit stops. That way, residents could drive or cycle a short distance and then take the train, which would reduce both emissions and traffic.",
  },
  {
    id: 'wr-ad-plastic-waste',
    section: 'writing',
    task: 'academic-discussion',
    title: 'Reducing Plastic Waste',
    topic: 'environment',
    difficulty: 'easy',
    course: 'Environmental Science',
    professor: 'Dr. Okoro',
    professorPrompt:
      'Plastic waste is a growing problem around the world. Some people believe the best solution is to ban single-use plastic products, such as bags and straws. Others think it is more effective to improve recycling systems. Which approach do you think would reduce plastic waste more effectively, and why?',
    posts: [
      { author: 'Lucas', text: "Banning single-use plastics is the most direct solution. When my city banned plastic bags, almost everyone started bringing reusable bags within a few months. Recycling is useful, but a lot of plastic never actually gets recycled." },
      { author: 'Hana', text: "Bans only cover a few products. Most plastic waste comes from packaging that can't simply be banned. I think we should invest in better recycling technology and make it easier for people to sort their trash." },
    ],
    recommendedWords: [100, 150],
    timeLimitSec: 600,
    sampleResponse:
      "I agree with Lucas that bans are more effective, at least as a first step. The biggest advantage of a ban is that it changes people's habits immediately, while recycling depends on many steps working correctly. As Lucas pointed out, a large share of the plastic that people put in recycling bins ends up in landfills anyway because it is dirty or made of mixed materials. Hana makes a good point that bans cannot cover all packaging, but they can be expanded gradually, and they also send a strong message to companies to design products with less plastic. For example, after some countries taxed or banned plastic bags, supermarkets started offering paper and reusable alternatives. Recycling should still improve, but reducing plastic at the source matters more.",
  },
  {
    id: 'wr-ad-grades',
    section: 'writing',
    task: 'academic-discussion',
    title: 'Grades or Written Feedback?',
    topic: 'psychology',
    difficulty: 'hard',
    course: 'Educational Psychology',
    professor: 'Dr. Weiss',
    professorPrompt:
      'Some educators argue that schools should replace traditional letter grades with detailed written feedback, claiming that grades encourage students to focus on scores rather than learning. Others say grades provide a clear and fair measure of achievement. What is your position on this issue? Support your view with reasons or examples.',
    posts: [
      { author: 'Ines', text: "I support replacing grades with feedback. When I get a grade, I usually just look at the letter and forget about the comments. Without a grade, I would actually read the feedback and learn from my mistakes." },
      { author: 'Marcus', text: "Grades are necessary because universities and employers need a quick way to compare students. Written feedback is useful, but it is subjective and hard to compare across different schools and teachers." },
    ],
    recommendedWords: [100, 150],
    timeLimitSec: 600,
    sampleResponse:
      "Both Ines and Marcus raise valid points, but I believe the best solution is to delay grades rather than eliminate them. Research on motivation suggests that when students receive a grade and comments together, they tend to focus on the number, exactly as Ines describes. However, Marcus is right that some form of standardized measurement is necessary for admissions and scholarships. A practical compromise is to give students written feedback first and release the grade only after they have responded to the comments or revised their work. Some teachers in my high school used this approach, and I noticed that my classmates engaged much more seriously with the feedback. In this way, schools can encourage genuine learning while still providing a clear record of achievement.",
  },
  {
    id: 'wr-ad-remote-work',
    section: 'writing',
    task: 'academic-discussion',
    title: 'Remote Work and Local Economies',
    topic: 'economics',
    difficulty: 'hard',
    course: 'Regional Economics',
    professor: 'Professor Duarte',
    professorPrompt:
      'Since remote work became common, some economists have predicted that small towns will grow as workers leave expensive cities. Others believe large cities will remain dominant because of the opportunities they offer. In your opinion, will remote work significantly benefit small towns? Explain why or why not.',
    posts: [
      { author: 'Priya', text: "Yes. Several of my friends moved back to their hometowns after their companies allowed remote work. They spend their salaries at local businesses, which helps the whole community." },
      { author: 'Kevin', text: "I'm skeptical. Most jobs still require being in the office at least part of the time, and young people move to cities for social life and career networks, not just for work. Small towns will see only small changes." },
    ],
    recommendedWords: [100, 150],
    timeLimitSec: 600,
    sampleResponse:
      "I think remote work will benefit some small towns, but not all of them equally. Priya is correct that remote workers bring city salaries into local economies, which can support restaurants, shops, and services. However, Kevin's point about career networks suggests that the benefits will mainly go to towns that are within a few hours of a major city. Workers in hybrid jobs who must visit the office once or twice a week can live in those towns, but not in very remote areas. In addition, towns need reliable high-speed internet and good schools to attract families. Therefore, I believe remote work will lead to growth in well-connected small towns near large cities, while more isolated places will see little change unless they invest in infrastructure.",
  },
];
