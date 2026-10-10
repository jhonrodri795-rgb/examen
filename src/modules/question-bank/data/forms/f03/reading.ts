import type { ReadingSet } from '../../../types';

/** Simulación n.º 3 — Reading (contenido original). */
export const sets: ReadingSet[] = [
  // ---------- Complete the Words ----------
  {
    id: 'f03-rd-cw-dunes',
    form: 3,
    section: 'reading',
    task: 'complete-words',
    title: 'Wind and Moving Dunes',
    topic: 'geology',
    difficulty: 'easy',
    text:
      'Sand dunes are hills of loose sand that are built and shaped by the wind. As {{wi|nd}} blows {{acr|oss}} the {{des|ert}}, it {{li|fts}} grains {{o|f}} sand {{a|nd}} bounces {{th|em}} along {{t|he}} surface. Grains {{pi|le}} up {{o|n}} the gentle slope that faces the wind and then slide down the steep side behind it. Because sand keeps moving from one side of the dune to the other, the whole dune slowly travels in the direction of the wind.',
    note: '"Them" se refiere a "grains"; "pile up on" (amontonarse sobre) es un verbo frasal muy frecuente en textos de geografía.',
  },
  {
    id: 'f03-rd-cw-counterweights',
    form: 3,
    section: 'reading',
    task: 'complete-words',
    title: 'Elevator Counterweights',
    topic: 'engineering',
    difficulty: 'medium',
    text:
      'Most elevators in tall buildings rely on a simple device called a counterweight. This {{hea|vy}} block {{i|s}} attached {{t|o}} the {{oppo|site}} end {{o|f}} the {{ste|el}} cables, {{s|o}} it {{desc|ends}} whenever {{t|he}} car {{ri|ses}}. Its mass usually equals the weight of the empty car plus about forty percent of its maximum load. Because the two sides nearly balance each other, the motor only has to move the small difference in weight rather than the entire car and its passengers. This design greatly reduces the electricity an elevator consumes and also lessens wear on the motor and brakes.',
    note: '"So" introduce una consecuencia y "whenever" (cada vez que) relaciona dos movimientos opuestos: el contrapeso "descends" cuando la cabina "rises".',
  },
  {
    id: 'f03-rd-cw-dead-zones',
    form: 3,
    section: 'reading',
    task: 'complete-words',
    title: 'Fertilizer and Dead Zones',
    topic: 'environment',
    difficulty: 'hard',
    text:
      'When farmers apply more fertilizer than their crops can absorb, rainwater washes the excess nitrogen and phosphorus into rivers that flow to the coast. These {{nutr|ients}} trigger {{t|he}} rapid {{multipl|ication}} of {{micro|scopic}} algae, {{wh|ich}} form {{de|nse}} blooms {{acr|oss}} the {{sur|face}}. When {{t|he}} algae {{event|ually}} die, bacteria decompose them and consume large amounts of dissolved oxygen. The resulting low-oxygen water, known as a dead zone, cannot support fish, crabs, or other marine animals, which must either flee or suffocate. The largest dead zone in the United States forms each summer in the Gulf of Mexico, near the mouth of the Mississippi River.',
    note: 'Las palabras largas de registro académico (nutrients, multiplication, microscopic) se deducen por la familia léxica; "which" retoma "algae" como antecedente.',
  },

  // ---------- Read in Daily Life ----------
  {
    id: 'f03-rd-dl-tent',
    form: 3,
    section: 'reading',
    task: 'daily-life',
    genre: 'text-message',
    title: 'Borrowing a Camping Tent',
    topic: 'daily-life',
    difficulty: 'easy',
    text:
      "Nina (7:42 p.m.): Hi Sam! Are you still using your big tent? Jess and I are going camping at Pine Lake this weekend, and mine has a broken pole.\nSam (7:50 p.m.): You can borrow it! It sleeps four, so you'll have plenty of room. I'm home tomorrow until 5, and then I have soccer practice.\nNina (7:52 p.m.): Perfect. Can I come by around 4:30?\nSam (7:53 p.m.): Sure. I'll leave the sleeping pads with it too. Just bring it back dry, please, or it gets moldy.\nNina (7:54 p.m.): Of course. Thanks so much!",
    questions: [
      {
        id: 'f03-rd-dl-tent-q1',
        kind: 'single',
        skill: 'detail',
        prompt: "Why does Nina want to borrow Sam's tent?",
        options: [
          'Her own tent is too small for two people.',
          'She has never gone camping before.',
          'Part of her own tent is broken.',
          'Jess forgot to pack her tent.',
        ],
        answer: [2],
        explanation:
          'Nina explica que su tienda está dañada: "mine has a broken pole". La opción del tamaño es una trampa: Sam dice que la suya es grande ("plenty of room"), pero Nina nunca dice que la suya sea pequeña.',
      },
      {
        id: 'f03-rd-dl-tent-q2',
        kind: 'single',
        skill: 'inference',
        prompt: "What can be inferred about Nina's visit to Sam's home?",
        options: [
          'It will happen before Sam leaves for practice.',
          'Jess will come along to help her carry the tent.',
          'Nina will return the sleeping pads that day.',
          'Sam will miss practice in order to meet her.',
        ],
        answer: [0],
        explanation:
          'Sam está en casa "until 5, and then I have soccer practice", y Nina propone ir "around 4:30"; por tanto, la visita será antes del entrenamiento. Nada indica que Sam vaya a faltar al entrenamiento ni que Jess acompañe a Nina.',
      },
    ],
  },
  {
    id: 'f03-rd-dl-orientation',
    form: 3,
    section: 'reading',
    task: 'daily-life',
    genre: 'schedule',
    title: 'International Orientation Week Schedule',
    topic: 'campus-life',
    difficulty: 'easy',
    header: ['Orientation Week for New International Students — August 25–29'],
    text:
      'Monday, Aug. 25, 9:00 a.m.: Welcome breakfast (Student Union, Room 210)\nTuesday, Aug. 26, 10:00 a.m.: Immigration check-in. Bring your passport and visa documents.\nWednesday, Aug. 27, 1:00 p.m.: Campus tour (meet on the main library steps)\nThursday, Aug. 28, 2:00 p.m.: Opening a bank account and choosing a phone plan\nFriday, Aug. 29, 6:00 p.m.: International Food Night (free for new students; guests $5)\nNote: The immigration check-in is required for all new international students. If you arrive after Tuesday, visit the International Office before September 2.',
    questions: [
      {
        id: 'f03-rd-dl-orientation-q1',
        kind: 'single',
        skill: 'detail',
        prompt: 'Which event must all new international students attend?',
        options: ['The welcome breakfast', 'The immigration check-in', 'The campus tour', 'The International Food Night'],
        answer: [1],
        explanation:
          'La nota final lo indica: "The immigration check-in is required for all new international students". Los demás eventos aparecen en el horario, pero no se dice que sean obligatorios.',
      },
      {
        id: 'f03-rd-dl-orientation-q2',
        kind: 'single',
        skill: 'inference',
        prompt: 'What can be inferred about a new student who arrives on Thursday, August 28?',
        options: [
          'The student will not be able to attend the Food Night.',
          'The student will have to pay $5 for the Food Night.',
          'The student cannot take part in any of the orientation events.',
          'The student will need to visit the International Office.',
        ],
        answer: [3],
        explanation:
          'Quien llega el jueves llega "after Tuesday", así que debe ir a la oficina: "visit the International Office before September 2". Los $5 son solo para invitados ("guests $5"); los estudiantes nuevos entran gratis.',
      },
    ],
  },
  {
    id: 'f03-rd-dl-bread-classes',
    form: 3,
    section: 'reading',
    task: 'daily-life',
    genre: 'advertisement',
    title: 'Weekend Bread-Making Classes',
    topic: 'daily-life',
    difficulty: 'medium',
    header: ['Golden Crust Bakery — Weekend Bread-Making Classes'],
    text:
      'Ever wanted to bake your own bread? Join our head baker on weekend mornings in our kitchen on Elm Street.\n\nBeginner (Saturdays, 9–11 a.m., $35): Learn to mix, knead, and shape a simple white loaf. No experience needed.\nIntermediate (Sundays, 9 a.m.–12 p.m., $50): Work with whole-grain flours and make braided loaves. Recommended for those who have completed our beginner class or who bake at home regularly.\nAdvanced Sourdough (first Sunday of each month, 1–5 p.m., $75): Create and care for your own sourdough starter, which you take home in a glass jar.\n\nAll ingredients and aprons are provided. Classes are limited to eight students, so register early at the front counter. Sign up for two classes in the same month and get 10% off the second one.',
    questions: [
      {
        id: 'f03-rd-dl-bread-classes-q1',
        kind: 'single',
        skill: 'purpose',
        prompt: 'What is the main purpose of the advertisement?',
        options: [
          'To promote baking classes for different skill levels',
          'To announce that the bakery is moving to Elm Street',
          'To recruit an experienced baker to teach on weekends',
          'To offer a discount on bread bought on weekend mornings',
        ],
        answer: [0],
        explanation:
          'El anuncio presenta tres clases ("Beginner", "Intermediate", "Advanced Sourdough") para distintos niveles. El descuento del 10 % existe, pero es para quien se apunta a dos clases, no para comprar pan.',
      },
      {
        id: 'f03-rd-dl-bread-classes-q2',
        kind: 'single',
        skill: 'inference',
        prompt: 'Who would most likely be advised to take the Intermediate class?',
        options: [
          'Someone who has never baked bread before',
          'Someone who wants to take home a starter',
          'Someone who makes bread at home every week',
          'Someone who is free only on Saturday mornings',
        ],
        answer: [2],
        explanation:
          'La clase intermedia se recomienda a quienes "bake at home regularly"; hornear pan cada semana encaja con esa descripción. Quien nunca ha horneado debe empezar por "Beginner" ("No experience needed").',
      },
      {
        id: 'f03-rd-dl-bread-classes-q3',
        kind: 'single',
        skill: 'detail',
        prompt: 'What will students in the Advanced Sourdough class take home?',
        options: ['An apron from the bakery', 'A jar of sourdough starter', 'A braided loaf of whole-grain bread', 'A coupon for 10% off'],
        answer: [1],
        explanation:
          'El anuncio dice: "your own sourdough starter, which you take home in a glass jar". Los delantales se proporcionan durante la clase ("aprons are provided"), pero no se dice que los alumnos se los lleven.',
      },
    ],
  },
  {
    id: 'f03-rd-dl-grades-memo',
    form: 3,
    section: 'reading',
    task: 'daily-life',
    genre: 'memo',
    title: 'New Final Grade Procedure',
    topic: 'campus-life',
    difficulty: 'medium',
    header: [
      'MEMO',
      'To: Teaching Assistants, Department of Biology',
      'From: Dr. Helen Park, Department Chair',
      'Date: December 1',
      'Subject: New procedure for submitting final grades',
    ],
    text:
      'Starting this semester, final grades will no longer be submitted on paper forms. Instead, please enter them directly into the online Grade Center by 5:00 p.m. on Monday, December 18. After entering the grades, click "Send for Review" rather than "Submit." The course instructor will then check your entries and give final approval; grades are not official until this step is complete.\n\nIf you notice an error after sending your grades for review, do not try to re-enter them yourself. Contact the department office, and a staff member will unlock the record for you. Training workshops on the new system will be held on December 5 and 7 in Room 114. Attendance is strongly encouraged for anyone who has not used the Grade Center before.',
    questions: [
      {
        id: 'f03-rd-dl-grades-memo-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'Why did Dr. Park write the memo?',
        options: [
          'To remind assistants to attend a required training workshop',
          "To ask assistants to correct last semester's grades",
          'To announce that instructors will now enter all grades',
          'To explain a change in how and when grades are submitted',
        ],
        answer: [3],
        explanation:
          'El memorando presenta un procedimiento nuevo ("will no longer be submitted on paper forms… enter them directly into the online Grade Center") y una fecha límite. El taller no es obligatorio: "Attendance is strongly encouraged".',
      },
      {
        id: 'f03-rd-dl-grades-memo-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'What should a teaching assistant do right after entering the grades?',
        options: [
          'Print a paper copy for the department office',
          'Choose the option that sends them for review',
          'Click "Submit" to make the grades official',
          'Contact the instructor to arrange a review meeting',
        ],
        answer: [1],
        explanation:
          'El texto indica: "After entering the grades, click \'Send for Review\' rather than \'Submit.\'" La opción de "Submit" es justo lo que el memorando dice que no se debe hacer.',
      },
      {
        id: 'f03-rd-dl-grades-memo-q3',
        kind: 'single',
        skill: 'vocabulary',
        prompt: 'The word "unlock" in the memo is closest in meaning to',
        options: ['delete permanently', 'print out', 'make available for changes', 'send directly to the instructor'],
        answer: [2],
        explanation:
          'Tras enviar las notas a revisión, el asistente no puede modificarlas; el personal debe "unlock the record", es decir, volver a permitir cambios para corregir el error. No se trata de borrar el registro.',
      },
    ],
  },
  {
    id: 'f03-rd-dl-room-swap',
    form: 3,
    section: 'reading',
    task: 'daily-life',
    genre: 'webpage',
    title: 'Mid-Semester Room Swaps',
    topic: 'campus-life',
    difficulty: 'hard',
    header: ['Residence Life Portal — Mid-Semester Room Swaps'],
    text:
      'Who can request a swap? Any resident who has lived in their current room for at least four weeks may apply. First-year students in learning communities may swap only with another member of the same community.\n\nHow does it work? Both students must submit the online Swap Request Form by October 20. Requests are approved only if both residents agree and both rooms are the same type (for example, a double for a double). Approved swaps must be completed during the move window, October 27–31.\n\nWhat does it cost? Each student pays a $40 processing fee, which is charged to the student account after approval. If the new room has a higher rate, the difference will be prorated for the rest of the semester. Students who move before receiving approval will be charged a $100 unauthorized-move fine and may be required to return to their original rooms.',
    questions: [
      {
        id: 'f03-rd-dl-room-swap-q1',
        kind: 'single',
        skill: 'detail',
        prompt: 'According to the webpage, what is required for a swap request to be approved?',
        options: [
          'Both students must have lived on campus for a semester.',
          'Both students must pay the processing fee when they submit the form.',
          'Both students must agree to exchange rooms of the same type.',
          'Both students must belong to the same learning community.',
        ],
        answer: [2],
        explanation:
          'La página dice: "Requests are approved only if both residents agree and both rooms are the same type". La cuota se cobra "after approval", no al enviar el formulario, y la regla de la comunidad de aprendizaje solo afecta a ciertos estudiantes de primer año.',
      },
      {
        id: 'f03-rd-dl-room-swap-q2',
        kind: 'single',
        skill: 'vocabulary',
        prompt: 'The word "prorated" in the webpage is closest in meaning to',
        options: [
          'divided according to the time left',
          'paid in full before the move takes place',
          'canceled for approved students',
          'added to the processing fee',
        ],
        answer: [0],
        explanation:
          '"Prorated for the rest of the semester" significa que la diferencia se calcula de forma proporcional al tiempo que queda del semestre. No se dice que se pague por adelantado ni que se sume a la cuota de $40.',
      },
      {
        id: 'f03-rd-dl-room-swap-q3',
        kind: 'single',
        skill: 'inference',
        prompt: 'A student moves into a friend\'s room on October 25 before the request is approved. What will most likely happen?',
        options: [
          'The student will pay only the $40 processing fee.',
          'The move will be approved automatically on October 27.',
          "The student's new rate will be prorated for the semester.",
          'The student may have to pay a fine and move back.',
        ],
        answer: [3],
        explanation:
          'Mudarse antes de la aprobación implica "a $100 unauthorized-move fine" y la posibilidad de "return to their original rooms". Además, el 25 de octubre está fuera del periodo permitido ("October 27–31").',
      },
    ],
  },

  // ---------- Read an Academic Passage ----------
  {
    id: 'f03-rd-ap-habits',
    form: 3,
    section: 'reading',
    task: 'academic-passage',
    title: 'How Habits Take Shape',
    topic: 'psychology',
    difficulty: 'easy',
    paragraphs: [
      'Much of what people do each day is not the result of careful decisions. Brushing your teeth, checking your phone, and taking the same route to work are habits: behaviors that have been repeated so often that they happen almost automatically. Because habits require little thought, they free the mind to focus on new or difficult problems.',
      'Psychologists often describe a habit as a loop with three parts. First comes a cue, a signal that triggers the behavior. A cue can be a time of day, a place, an emotion, or the presence of certain people. Next comes the routine, which is the behavior itself. Finally, there is a reward, a pleasant result such as a good taste, a feeling of relief, or praise from others. The reward teaches the brain that the loop is worth remembering.',
      'When the loop is repeated many times in the same situation, the link between cue and routine grows stronger. Eventually, the cue alone is enough to start the behavior, even before the person thinks about the reward. This is why habits are so persistent. A person who always eats a snack while watching television may feel hungry as soon as the television is turned on, whether or not the body needs food.',
      'Understanding the loop can help people change their behavior. Because cues are often hard to avoid, experts suggest keeping the same cue and reward but replacing the routine. For example, someone who smokes during work breaks might take a short walk instead, which still provides a break and a sense of relief. With enough repetition, the new routine can become just as automatic as the old one.',
    ],
    questions: [
      {
        id: 'f03-rd-ap-habits-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'What is the passage mainly about?',
        options: [
          'Why people find it impossible to break bad habits',
          'How habits develop and how they can be changed',
          'Which daily activities are most likely to be habits',
          'Why rewards matter more than cues in habit loops',
        ],
        answer: [1],
        explanation:
          'El texto explica el bucle "cue, routine, reward" (párrafos 2 y 3) y cómo cambiar un hábito ("Understanding the loop can help people change their behavior"). La primera opción contradice el párrafo 4, que dice que sí se pueden cambiar.',
      },
      {
        id: 'f03-rd-ap-habits-q2',
        kind: 'single',
        skill: 'detail',
        paragraph: 1,
        prompt: 'According to paragraph 2, which of the following can serve as a cue?',
        options: ['A pleasant taste after eating', 'The behavior that is repeated', 'Praise from other people', 'A particular time of day'],
        answer: [3],
        explanation:
          'El párrafo 2 dice: "A cue can be a time of day, a place, an emotion…". El sabor agradable y los elogios ("praise from others") son ejemplos de recompensa, y la conducta repetida es la rutina.',
      },
      {
        id: 'f03-rd-ap-habits-q3',
        kind: 'single',
        skill: 'vocabulary',
        paragraph: 2,
        highlight: 'persistent',
        prompt: 'The word "persistent" in paragraph 3 is closest in meaning to',
        options: ['long-lasting', 'damaging to health', 'obvious', 'pleasant'],
        answer: [0],
        explanation:
          '"Persistent" significa duradero, difícil de eliminar: los hábitos persisten porque la señal sola ya basta para iniciar la conducta ("the cue alone is enough to start the behavior"). El texto no dice que sean dañinos.',
      },
      {
        id: 'f03-rd-ap-habits-q4',
        kind: 'single',
        skill: 'inference',
        paragraph: 2,
        prompt: 'What can be inferred from paragraph 3 about the person who snacks while watching television?',
        options: [
          'The person watches television mainly to forget about being hungry.',
          'The person has recently decided to change this routine.',
          'The person may feel hungry because of the cue, not real need.',
          'The person no longer enjoys the reward of eating the snack.',
        ],
        answer: [2],
        explanation:
          'La persona siente hambre "as soon as the television is turned on, whether or not the body needs food": la señal (encender la tele) provoca la sensación, no una necesidad real. Nada indica que quiera cambiar la rutina.',
      },
      {
        id: 'f03-rd-ap-habits-q5',
        kind: 'single',
        skill: 'purpose',
        paragraph: 3,
        prompt: 'Why does the author mention a person who takes a short walk during work breaks?',
        options: [
          'To show that exercise is a stronger reward than smoking',
          'To illustrate replacing a routine but keeping cue and reward',
          'To suggest that employers should offer workers longer breaks',
          'To give an example of a cue that is easy to avoid',
        ],
        answer: [1],
        explanation:
          'El ejemplo ilustra la recomendación anterior: "keeping the same cue and reward but replacing the routine"; el paseo sustituye al cigarrillo y sigue dando "a break and a sense of relief". El texto dice lo contrario de la última opción: "cues are often hard to avoid".',
      },
    ],
  },
  {
    id: 'f03-rd-ap-interest-rates',
    form: 3,
    section: 'reading',
    task: 'academic-passage',
    title: 'Central Banks and Inflation',
    topic: 'economics',
    difficulty: 'medium',
    paragraphs: [
      'Inflation is a general rise in the prices of goods and services over time. A small amount of inflation is considered normal in a growing economy, but when prices climb too quickly, the money people earn and save buys less and less. For this reason, most countries give a central bank, such as the Federal Reserve in the United States or the European Central Bank, the task of keeping inflation low and stable. Many central banks aim for an inflation rate of about 2 percent per year.',
      'The main tool a central bank uses is a short-term interest rate, often called the policy rate. This is the rate at which commercial banks borrow from one another or from the central bank itself. When the central bank raises this rate, commercial banks pay more for funds, and they pass the higher cost on to their customers in the form of more expensive mortgages, car loans, and business credit.',
      'Higher borrowing costs gradually slow the economy. Families postpone buying homes, companies delay building new factories, and consumers spend less on credit cards. At the same time, savings accounts pay more, which encourages people to save rather than spend. As overall demand weakens, businesses find it harder to raise prices, and inflation begins to fall. When inflation is too low or the economy is in recession, the central bank does the opposite: it lowers rates to make borrowing cheaper and spending more attractive.',
      'This process is far from precise. Economists estimate that changes in interest rates may take a year or more to have their full effect on prices, so central bankers must act on forecasts rather than on current conditions. If they raise rates too sharply, they risk causing unemployment; if they move too slowly, inflation may become firmly established as people come to expect continual price increases.',
    ],
    questions: [
      {
        id: 'f03-rd-ap-interest-rates-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'Which of the following best states the main idea of the passage?',
        options: [
          'Central banks lend money directly to families and firms.',
          'Any amount of inflation is harmful to a growing economy.',
          'Low interest rates are the main cause of high inflation.',
          'Central banks adjust interest rates to influence prices.',
        ],
        answer: [3],
        explanation:
          'Todo el texto explica cómo el banco central usa "a short-term interest rate" para frenar o estimular el gasto y así controlar la inflación. La segunda opción contradice el párrafo 1: "A small amount of inflation is considered normal".',
      },
      {
        id: 'f03-rd-ap-interest-rates-q2',
        kind: 'single',
        skill: 'detail',
        paragraph: 1,
        prompt: 'According to paragraph 2, what happens when a central bank raises its policy rate?',
        options: [
          'Commercial banks charge their customers more for loans.',
          'Commercial banks stop lending money to one another entirely.',
          'The central bank buys mortgages from commercial banks.',
          'Customers can obtain business credit more cheaply.',
        ],
        answer: [0],
        explanation:
          'El párrafo 2 dice que los bancos comerciales "pass the higher cost on to their customers in the form of more expensive mortgages, car loans, and business credit". No dejan de prestarse entre sí; simplemente les cuesta más.',
      },
      {
        id: 'f03-rd-ap-interest-rates-q3',
        kind: 'single',
        skill: 'vocabulary',
        paragraph: 2,
        highlight: 'postpone',
        prompt: 'The word "postpone" in paragraph 3 is closest in meaning to',
        options: ['reconsider', 'finance', 'put off', 'cancel'],
        answer: [2],
        explanation:
          '"Postpone" significa aplazar ("put off"). El paralelismo con "companies delay building new factories" lo confirma. "Cancel" es la trampa: aplazar no es renunciar definitivamente.',
      },
      {
        id: 'f03-rd-ap-interest-rates-q4',
        kind: 'single',
        skill: 'negative-factual',
        paragraph: 2,
        prompt: 'According to paragraph 3, all of the following are effects of higher interest rates EXCEPT:',
        options: [
          'Companies wait longer to build factories.',
          'Businesses can raise prices more easily.',
          'Savings accounts pay higher interest.',
          'Consumers spend less on credit cards.',
        ],
        answer: [1],
        explanation:
          'El texto afirma lo contrario: "businesses find it harder to raise prices". Las demás opciones sí aparecen en el párrafo 3 ("delay building new factories", "savings accounts pay more", "spend less on credit cards").',
      },
      {
        id: 'f03-rd-ap-interest-rates-q5',
        kind: 'single',
        skill: 'inference',
        paragraph: 3,
        prompt: 'What can be inferred from paragraph 4 about inflation?',
        options: [
          "People's expectations can make inflation harder to control.",
          'Inflation usually disappears on its own once unemployment rises.',
          'Interest rate changes affect prices within a few weeks.',
          'Inflation can be stopped only by raising rates sharply.',
        ],
        answer: [0],
        explanation:
          'Si el banco actúa tarde, "inflation may become firmly established as people come to expect continual price increases": las expectativas de la gente consolidan la inflación. La tercera opción contradice "may take a year or more".',
      },
    ],
  },
  {
    id: 'f03-rd-ap-bureaucracy',
    form: 3,
    section: 'reading',
    task: 'academic-passage',
    title: "Weber's Model of Bureaucracy",
    topic: 'sociology',
    difficulty: 'hard',
    paragraphs: [
      'At the beginning of the twentieth century, the German sociologist Max Weber (1864–1920) set out to explain a defining feature of modern life: the growing dominance of large, formal organizations. Governments, armies, universities, and corporations, he observed, were increasingly run according to written rules rather than tradition or personal loyalty. Weber called this broad historical shift rationalization, a process in which calculation, efficiency, and predictability replace custom and emotion as the foundations of social action.',
      'To describe the form of organization that rationalization produces, Weber constructed an "ideal type" of bureaucracy. An ideal type is neither a description of any real organization nor a statement of what is desirable; it is a model that exaggerates key features so that actual cases can be compared against it. In Weber\'s model, a bureaucracy has a clear hierarchy of offices, each with defined duties and limited authority. Officials are selected on the basis of technical qualifications, often demonstrated through examinations, and they are promoted according to seniority or achievement. Work is governed by impersonal rules and recorded in written files, and an official\'s position is kept separate from his or her private property and household.',
      'Weber argued that this arrangement was technically superior to earlier forms of administration. Under patrimonial systems, for example, positions were frequently granted to relatives or loyal followers of a ruler, and decisions could depend on personal favor. A bureaucracy, by contrast, applies the same rules to every case, which makes its actions precise, swift, and calculable. These qualities, Weber believed, explained why bureaucratic organization had spread so widely in both capitalist economies and modern states.',
      'Yet Weber was far from an uncritical admirer of the system he analyzed. He worried that rationalization would trap individuals in what has been translated as an "iron cage" of rules, in which efficiency becomes an end in itself and questions of meaning and value are pushed aside. Later sociologists extended this concern, noting that rigid adherence to procedure can produce the very inefficiency that bureaucracy was meant to prevent, as when officials follow regulations even in situations the rules never anticipated.',
    ],
    questions: [
      {
        id: 'f03-rd-ap-bureaucracy-q1',
        kind: 'single',
        skill: 'organization',
        prompt: 'Which of the following best describes the organization of the passage?',
        options: [
          'A theory is presented, and each later paragraph offers evidence that contradicts it.',
          'Two competing theories of modern organizations are described and then evaluated.',
          'A process is defined, a model is described, and its merits and risks are discussed.',
          'A problem in modern organizations is identified, and several possible solutions are proposed.',
        ],
        answer: [2],
        explanation:
          'El párrafo 1 define "rationalization", el 2 describe el "ideal type" de burocracia, el 3 explica por qué era "technically superior" y el 4 presenta las preocupaciones ("iron cage"). No se comparan dos teorías rivales ni se proponen soluciones.',
      },
      {
        id: 'f03-rd-ap-bureaucracy-q2',
        kind: 'single',
        skill: 'detail',
        paragraph: 1,
        prompt: 'According to paragraph 2, what is an "ideal type"?',
        options: [
          'A description of the most efficient real organization',
          'A model that exaggerates key features for comparison',
          'A statement of how organizations ought to be run',
          'A summary of the rules used by a particular government',
        ],
        answer: [1],
        explanation:
          'El texto lo define como "a model that exaggerates key features so that actual cases can be compared against it". La tercera opción es la trampa de la palabra "ideal": el texto aclara que no es "a statement of what is desirable".',
      },
      {
        id: 'f03-rd-ap-bureaucracy-q3',
        kind: 'single',
        skill: 'purpose',
        paragraph: 2,
        prompt: 'Why does the author mention patrimonial systems in paragraph 3?',
        options: [
          'To show that bureaucracy grew out of earlier family businesses',
          'To give a historical example of an ideal type',
          'To argue that personal loyalty is more efficient than rules',
          'To highlight the strengths of bureaucracy through contrast',
        ],
        answer: [3],
        explanation:
          'Los sistemas patrimoniales, donde los cargos se daban a familiares y las decisiones dependían de "personal favor", sirven de contraste ("by contrast") para mostrar que la burocracia es "precise, swift, and calculable".',
      },
      {
        id: 'f03-rd-ap-bureaucracy-q4',
        kind: 'single',
        skill: 'vocabulary',
        paragraph: 3,
        highlight: 'adherence',
        prompt: 'The word "adherence" in paragraph 4 is closest in meaning to',
        options: ['observance', 'objection', 'concentration', 'addition'],
        answer: [0],
        explanation:
          '"Rigid adherence to procedure" es el cumplimiento estricto de las normas, es decir, "observance"; el ejemplo lo confirma: "officials follow regulations". "Attention" (atención) no implica obedecer.',
      },
      {
        id: 'f03-rd-ap-bureaucracy-q5',
        kind: 'single',
        skill: 'inference',
        paragraph: 3,
        prompt: "What can be inferred from paragraph 4 about Weber's view of bureaucracy?",
        options: [
          'He expected bureaucracy to disappear in modern states.',
          'He thought bureaucracy was less efficient than older systems.',
          'He denied that bureaucracy was technically superior.',
          'He believed its efficiency could come at a human cost.',
        ],
        answer: [3],
        explanation:
          'Weber no era "an uncritical admirer": temía que la eficiencia se convirtiera en "an end in itself" y que se dejaran de lado "questions of meaning and value". No negaba su superioridad técnica, que él mismo defendía en el párrafo 3.',
      },
    ],
  },
  {
    id: 'f03-rd-ap-impressionists',
    form: 3,
    section: 'reading',
    task: 'academic-passage',
    title: 'Impressionists and Outdoor Light',
    topic: 'art',
    difficulty: 'hard',
    paragraphs: [
      'In the mid-nineteenth century, success for a French painter depended largely on the Salon, the official exhibition held in Paris under the authority of the Académie des Beaux-Arts. The Salon\'s juries favored large, carefully finished canvases depicting historical, religious, or mythological scenes. Brushstrokes were expected to be invisible, surfaces smooth, and colors blended gradually from light to shadow, all qualities that demonstrated years of academic training.',
      'During the 1860s and 1870s, a group of younger artists, including Claude Monet, Pierre-Auguste Renoir, and Camille Pissarro, began to challenge these conventions. Rather than working entirely in the studio, they often painted outdoors, or en plein air, in order to capture the shifting effects of sunlight and atmosphere. Their efforts were aided by a practical invention: paint sold in portable metal tubes, which made it far easier to work outside. Because natural light changes from minute to minute, the painters worked rapidly, applying short, visible strokes of unmixed color side by side and allowing the viewer\'s eye to combine them at a distance. Shadows, they observed, were rarely simply brown or black; they often contained blues and violets reflected from the sky.',
      'To the Salon\'s juries, these canvases looked unfinished, more like quick sketches than serious works of art. Many of the group\'s submissions were rejected, and in 1874 the artists decided to organize an independent exhibition of their own. A critic, Louis Leroy, mocked a painting by Monet titled Impression, Sunrise, and used its title to label the entire group "Impressionists," a term he intended as an insult.',
      'Over the following decades, however, attitudes changed. Collectors and dealers, notably Paul Durand-Ruel, promoted the new style both in France and abroad, especially in the United States. By the end of the century, the techniques that had once been ridiculed were influencing young painters across Europe, and the very name that had been meant to dismiss the movement had become a mark of its distinction.',
    ],
    questions: [
      {
        id: 'f03-rd-ap-impressionists-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'What is the passage mainly about?',
        options: [
          'How a new way of painting light was first rejected but later accepted',
          'Why painting outdoors was impossible before the invention of paint tubes',
          'How the Salon juries selected paintings for the official exhibition',
          'Why critics preferred historical scenes to paintings of landscapes',
        ],
        answer: [0],
        explanation:
          'El texto describe la técnica al aire libre ("en plein air"), el rechazo del Salón ("these canvases looked unfinished") y la aceptación posterior ("attitudes changed"). Los tubos de pintura son solo un detalle: el texto dice que facilitaron el trabajo ("far easier"), no que antes fuera imposible.',
      },
      {
        id: 'f03-rd-ap-impressionists-q2',
        kind: 'single',
        skill: 'vocabulary',
        paragraph: 1,
        highlight: 'conventions',
        prompt: 'The word "conventions" in paragraph 2 is closest in meaning to',
        options: ['formal meetings', 'public exhibitions', 'accepted practices', 'written agreements'],
        answer: [2],
        explanation:
          '"These conventions" retoma las normas del Salón descritas en el párrafo 1 (pinceladas invisibles, superficies lisas…), es decir, prácticas aceptadas. "Formal meetings" es otro significado de "convention" que no encaja aquí.',
      },
      {
        id: 'f03-rd-ap-impressionists-q3',
        kind: 'single',
        skill: 'detail',
        paragraph: 1,
        prompt: 'According to paragraph 2, why did the Impressionists paint rapidly?',
        options: [
          'Paint stored in metal tubes dried very quickly.',
          'Natural light changes from minute to minute.',
          'The Salon required artists to submit many works.',
          'They wanted to keep their brushstrokes invisible.',
        ],
        answer: [1],
        explanation:
          'El texto da la causa: "Because natural light changes from minute to minute, the painters worked rapidly". Las pinceladas invisibles eran lo que exigía el Salón, no lo que buscaban los impresionistas ("visible strokes").',
      },
      {
        id: 'f03-rd-ap-impressionists-q4',
        kind: 'single',
        skill: 'reference',
        paragraph: 1,
        highlight: 'them',
        prompt: 'The word "them" in paragraph 2 refers to',
        options: ['the painters', 'the eyes of the viewer', 'the shadows', 'the strokes of color'],
        answer: [3],
        explanation:
          'En "applying short, visible strokes of unmixed color side by side and allowing the viewer\'s eye to combine them", lo que el ojo combina son las pinceladas de color ("strokes of unmixed color").',
      },
      {
        id: 'f03-rd-ap-impressionists-q5',
        kind: 'single',
        skill: 'inference',
        paragraph: 2,
        prompt: 'What can be inferred from paragraph 3 about the exhibition of 1874?',
        options: [
          'It was organized by the Académie des Beaux-Arts.',
          'It included only paintings that had been made by Monet.',
          "It let the artists exhibit without the Salon's approval.",
          'It was praised by most of the critics who went to see it.',
        ],
        answer: [2],
        explanation:
          'Como el Salón rechazaba sus obras, los artistas organizaron "an independent exhibition of their own", es decir, una muestra que no dependía de los jurados del Salón. La crítica de Leroy ("mocked") contradice la última opción.',
      },
    ],
  },
];
