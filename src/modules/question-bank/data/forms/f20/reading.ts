import type { ReadingSet } from '../../../types';

/** Simulación n.º 20 — Reading (contenido original). */
export const sets: ReadingSet[] = [
  // ---------- Complete the Words ----------
  {
    id: 'f20-rd-cw-flow-state',
    form: 20,
    section: 'reading',
    task: 'complete-words',
    title: 'Absorbed in Flow',
    topic: 'psychology',
    difficulty: 'easy',
    text:
      "Psychologists use the word flow to describe a state of complete absorption in an activity. People {{i|n}} flow are {{s|o}} focused {{th|at}} they often lose {{tr|ack}} of {{ti|me}}. This state {{usu|ally}} occurs {{wh|en}} a {{ta|sk}} is challenging {{b|ut}} still within a person's {{abi|lity}}. If the task is too easy, people feel bored; if it is too hard, they feel anxious. Athletes, musicians, and even surgeons report experiencing flow during their work. Many researchers believe that frequent flow experiences make people happier.",
    note: '«So + adjetivo + that» expresa consecuencia (so focused that…), y «lose track of time» es una expresión fija: perder la noción del tiempo.',
  },
  {
    id: 'f20-rd-cw-paradox-thrift',
    form: 20,
    section: 'reading',
    task: 'complete-words',
    title: 'The Paradox of Thrift',
    topic: 'economics',
    difficulty: 'medium',
    text:
      "The paradox of thrift describes a surprising conflict between individual and collective behavior. When one {{fam|ily}} saves more {{o|f}} its {{inc|ome}}, it {{bec|omes}} financially {{sa|fer}}. However, {{i|f}} every {{hous|ehold}} cuts {{spen|ding}} at {{t|he}} same {{ti|me}}, businesses sell fewer goods. Those businesses may then reduce wages or dismiss workers, so total income falls. As a result, the nation's total savings may not increase at all. This is why some economists argue that governments should spend more during recessions.",
    note: 'Observa el contraste entre lo individual («When one family…») y lo colectivo («However, if every household…»); «at the same time» es una expresión fija.',
  },
  {
    id: 'f20-rd-cw-thomas-theorem',
    form: 20,
    section: 'reading',
    task: 'complete-words',
    title: 'Beliefs That Become Real',
    topic: 'sociology',
    difficulty: 'hard',
    text:
      "The Thomas theorem, proposed by the sociologists William and Dorothy Thomas in 1928, states that if people define situations as real, they are real in their consequences. In {{ot|her}} words, {{bel|iefs}} shape {{beha|vior}} regardless of {{whe|ther}} they are {{accu|rate}}. Robert Merton {{la|ter}} used this {{prin|ciple}} to explain the self-fulfilling {{prop|hecy}}, in which a false {{expec|tation}} produces the very {{out|come}} it predicts. A classic illustration is a bank run: if depositors wrongly believe a bank is failing, they withdraw their savings, and the bank may genuinely collapse.",
    note: '«Regardless of whether» (independientemente de si) y «self-fulfilling prophecy» (profecía autocumplida) son expresiones fijas del registro académico; fíjate también en «the very outcome» (precisamente el resultado).',
  },

  // ---------- Read in Daily Life ----------
  {
    id: 'f20-rd-dl-cafe-early-closing',
    form: 20,
    section: 'reading',
    task: 'daily-life',
    genre: 'notice',
    title: 'Café Early Closing Notice',
    topic: 'daily-life',
    difficulty: 'easy',
    header: ['NOTICE — Maple Street Café'],
    text:
      'Please note that Maple Street Café will close at 3:00 p.m. this Saturday, June 14, instead of at our usual time of 8:00 p.m., because we are hosting a private wedding reception. We are sorry for any inconvenience. To thank you for your understanding, every customer who makes a purchase this week will receive a coupon for 20% off any drink. Coupons can be used until the end of the month. Our normal hours return on Sunday.',
    questions: [
      {
        id: 'f20-rd-dl-cafe-early-closing-q1',
        kind: 'single',
        skill: 'detail',
        prompt: 'Why will the café close early on Saturday?',
        options: [
          'Its staff will attend a wedding.',
          'It is being cleaned for the summer.',
          'It is hosting a private event.',
          'It is changing its regular hours.',
        ],
        answer: [2],
        explanation:
          'El aviso dice "because we are hosting a private wedding reception": el café organiza un evento privado. La opción de la boda es tentadora, pero el texto no dice que el personal asista como invitado, y "Our normal hours return on Sunday" descarta un cambio de horario permanente.',
      },
      {
        id: 'f20-rd-dl-cafe-early-closing-q2',
        kind: 'single',
        skill: 'inference',
        prompt: 'What can be inferred about a customer who buys a coffee on Thursday of that week?',
        options: [
          'They will get a discount on a future drink.',
          'They must use the coupon before Saturday afternoon.',
          'They will be invited to the private event.',
          'They will receive a free meal on Sunday.',
        ],
        answer: [0],
        explanation:
          'Quien compra esa semana recibe "a coupon for 20% off any drink", y el cupón vale "until the end of the month", así que podrá usarlo en una bebida posterior. La opción del sábado es incorrecta: el plazo no termina ese día.',
      },
    ],
  },
  {
    id: 'f20-rd-dl-alumni-dinner',
    form: 20,
    section: 'reading',
    task: 'daily-life',
    genre: 'email',
    title: 'Senior Networking Dinner Invitation',
    topic: 'campus-life',
    difficulty: 'easy',
    header: [
      'From: Office of Alumni Relations',
      'To: Graduating Seniors',
      'Subject: Invitation to the Senior Networking Dinner',
    ],
    text:
      'Dear Seniors,\n\nCongratulations on reaching your final semester! The Office of Alumni Relations invites you to our annual Senior Networking Dinner on Thursday, April 9, at 6:30 p.m. in the Riverside Ballroom. More than forty graduates who work in fields such as engineering, health care, and publishing will join us to share career advice. The dinner is free, but space is limited to 120 students, so please register on the alumni website by April 2. Business casual dress is recommended.\n\nWarm regards,\nOffice of Alumni Relations',
    questions: [
      {
        id: 'f20-rd-dl-alumni-dinner-q1',
        kind: 'single',
        skill: 'purpose',
        prompt: 'What is the main purpose of the email?',
        options: [
          'To ask seniors to join the alumni association',
          'To invite seniors to a dinner with graduates',
          'To announce a change to the graduation ceremony',
          'To request volunteers for a fundraising dinner',
        ],
        answer: [1],
        explanation:
          'El correo "invites you to our annual Senior Networking Dinner", donde "More than forty graduates" (antiguos alumnos) darán consejos profesionales. No pide que se unan a la asociación ni busca voluntarios: los estudiantes son los invitados.',
      },
      {
        id: 'f20-rd-dl-alumni-dinner-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'What must students do to attend the dinner?',
        options: [
          'Pay a small fee at the door',
          'Bring a printed copy of their résumé',
          'Contact a graduate in their field',
          'Sign up online no later than April 2',
        ],
        answer: [3],
        explanation:
          'El texto indica "please register on the alumni website by April 2". La cena es gratuita ("The dinner is free"), por lo que la opción de la cuota es falsa; el currículum no se menciona.',
      },
    ],
  },
  {
    id: 'f20-rd-dl-copy-center-prices',
    form: 20,
    section: 'reading',
    task: 'daily-life',
    genre: 'menu',
    title: 'Copy Center Price List',
    topic: 'campus-life',
    difficulty: 'medium',
    header: ['Hartwell Campus Copy Center — Price List'],
    text:
      'PRINTING (per page)\nBlack-and-white: $0.08 single-sided / $0.12 double-sided\nColor: $0.35 single-sided / $0.60 double-sided\nPosters (up to 24 x 36 in.): $18.00 each\n\nBINDING\nStaple binding: free for documents under 50 pages\nSpiral binding: $3.50 (up to 150 pages)\nHardcover thesis binding: $25.00 per copy (allow 5 business days)\n\nLAMINATION\nLetter size: $1.25 per sheet\nID or badge size: $0.50 per card\n\nStudents who show a valid student ID receive 10% off orders over $20. Same-day service is available for orders placed before noon, except where noted.',
    questions: [
      {
        id: 'f20-rd-dl-copy-center-prices-q1',
        kind: 'single',
        skill: 'detail',
        prompt:
          'How much would a student pay, before any discount, to print a 10-page document in color on one side of each page?',
        options: ['$0.80', '$6.00', '$1.20', '$3.50'],
        answer: [3],
        explanation:
          'La impresión en color a una cara cuesta "$0.35 single-sided" por página: 10 × 0,35 = 3,50 dólares. La opción de 6,00 corresponde al precio a doble cara ("$0.60 double-sided").',
      },
      {
        id: 'f20-rd-dl-copy-center-prices-q2',
        kind: 'single',
        skill: 'inference',
        prompt: 'What can be inferred about a student who needs a hardcover copy of a thesis by tomorrow?',
        options: [
          'The center will probably not finish the order in time.',
          'The order will be ready the same day if placed before noon.',
          'The student should choose spiral binding to save money.',
          'The student will also have to pay for staple binding.',
        ],
        answer: [0],
        explanation:
          'Para la encuadernación de tesis hay que contar con cinco días: "(allow 5 business days)". El servicio en el mismo día es la trampa: se ofrece "except where noted", y la tesis es justamente una excepción.',
      },
      {
        id: 'f20-rd-dl-copy-center-prices-q3',
        kind: 'single',
        skill: 'vocabulary',
        prompt: 'The word "allow" in the price list is closest in meaning to',
        options: ['permit', 'postpone', 'plan for', 'pay for'],
        answer: [2],
        explanation:
          'En "allow 5 business days", "allow" significa prever o contar con ese tiempo ("plan for"). El significado más común, "permit" (permitir), no tiene sentido en este contexto.',
      },
    ],
  },
  {
    id: 'f20-rd-dl-bookstore-shift-cover',
    form: 20,
    section: 'reading',
    task: 'daily-life',
    genre: 'text-message',
    title: 'Covering a Bookstore Shift',
    topic: 'daily-life',
    difficulty: 'medium',
    text:
      "Priya (7:42 a.m.): Hi Marcus, sorry for the early text. My grandmother was taken to the hospital last night, and I need to drive to Dayton this morning. Is there any chance you could cover my shift at the bookstore today from 12 to 6?\nMarcus (7:55 a.m.): Oh no, I'm so sorry. I have class until 1, but I could come in at 1:30 and stay until 6.\nPriya (7:58 a.m.): That would be amazing. I'll ask Dana if she can come in at noon and handle the first hour and a half.\nMarcus (8:03 a.m.): Sounds good. Don't worry about the textbook delivery. I'll unpack it when I get there. Just focus on your family.\nPriya (8:05 a.m.): Thank you so much. I'll take your Saturday morning shift next week to make it up to you.",
    questions: [
      {
        id: 'f20-rd-dl-bookstore-shift-cover-q1',
        kind: 'single',
        skill: 'purpose',
        prompt: 'Why does Priya send the first message?',
        options: [
          'To ask Marcus to deliver some textbooks',
          'To find someone to work in her place',
          'To tell Marcus that the store will close early',
          'To ask for a ride to the hospital',
        ],
        answer: [1],
        explanation:
          'Priya pregunta "could you cover my shift at the bookstore today from 12 to 6?" porque debe viajar por una emergencia familiar. Los libros de texto aparecen después, y es Marcus quien los desempaquetará; no se trata de entregarlos.',
      },
      {
        id: 'f20-rd-dl-bookstore-shift-cover-q2',
        kind: 'single',
        skill: 'inference',
        prompt: 'What can be inferred about the time from 12:00 to 1:30?',
        options: [
          'The bookstore will be closed during that time.',
          'Marcus will work it after leaving class early.',
          'Priya hopes another coworker will cover it.',
          'The textbook delivery will be unpacked then.',
        ],
        answer: [2],
        explanation:
          'Marcus solo puede llegar "at 1:30", así que Priya dice "I\'ll ask Dana if she can come in at noon and handle the first hour and a half". Marcus no sale antes de clase ("I have class until 1").',
      },
      {
        id: 'f20-rd-dl-bookstore-shift-cover-q3',
        kind: 'single',
        skill: 'detail',
        prompt: 'What does Priya offer to do for Marcus?',
        options: [
          'Take one of his shifts next week',
          'Unpack the textbook delivery for him',
          'Drive him to class before his shift',
          'Ask Dana to cover his Saturday shift',
        ],
        answer: [0],
        explanation:
          'Priya escribe "I\'ll take your Saturday morning shift next week to make it up to you". Desempaquetar el pedido es lo que ofrece Marcus, no Priya.',
      },
    ],
  },
  {
    id: 'f20-rd-dl-research-program-schedule',
    form: 20,
    section: 'reading',
    task: 'daily-life',
    genre: 'schedule',
    title: 'Summer Research Program Schedule',
    topic: 'campus-life',
    difficulty: 'hard',
    header: ['Summer Undergraduate Research Program — Schedule and Attendance Policy'],
    text:
      'WEEK 1 (June 2–6): Orientation\nMon–Tue, 9:00 a.m.–4:00 p.m.: Lab safety training (required; students who miss it may not enter any lab)\nWed–Fri: Library research workshops (strongly recommended)\n\nWEEKS 2–7 (June 9–July 18): Lab Rotations\nStudents spend two weeks in each of three labs. Rotation requests are due by Friday, June 6; late requests will be assigned to labs at random.\n\nWEEK 8 (July 21–25): Final Presentations\nEach student gives a 12-minute talk on Thursday or Friday. Attendance at all presentations on both days is required.\n\nATTENDANCE: Students may miss up to two rotation days for illness or emergencies if they notify their lab supervisor. Any additional absence must be approved by the program director and may reduce the final stipend.',
    questions: [
      {
        id: 'f20-rd-dl-research-program-schedule-q1',
        kind: 'single',
        skill: 'inference',
        prompt: 'What will probably happen to a student who submits rotation requests on June 9?',
        options: [
          'The student will lose part of the final stipend.',
          'The student will have to repeat the safety training.',
          'The student will be removed from the program.',
          'The student will be placed in labs at random.',
        ],
        answer: [3],
        explanation:
          'Las solicitudes vencen "by Friday, June 6", y "late requests will be assigned to labs at random". La reducción del estipendio es la trampa: se aplica a ausencias adicionales, no a solicitudes tardías.',
      },
      {
        id: 'f20-rd-dl-research-program-schedule-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'According to the schedule, which activity is optional?',
        options: [
          'Lab safety training',
          'Library research workshops',
          "Attending other students' talks",
          'Giving a 12-minute presentation',
        ],
        answer: [1],
        explanation:
          'Los talleres de la biblioteca son "strongly recommended", es decir, recomendados pero no obligatorios. En cambio, la formación de seguridad es "required" y la asistencia a todas las presentaciones también: "Attendance at all presentations on both days is required".',
      },
      {
        id: 'f20-rd-dl-research-program-schedule-q3',
        kind: 'single',
        skill: 'inference',
        prompt: 'A student is sick and misses three rotation days. What does the policy require?',
        options: [
          'Only a message to the lab supervisor',
          "A doctor's note sent to the library",
          'Approval from the program director',
          'An extra week of lab rotations',
        ],
        answer: [2],
        explanation:
          'Avisar al supervisor solo cubre "up to two rotation days"; el tercer día es una ausencia adicional, y "Any additional absence must be approved by the program director". Por eso la opción del supervisor, aunque tentadora, es insuficiente.',
      },
    ],
  },

  // ---------- Read an Academic Passage ----------
  {
    id: 'f20-rd-ap-inca-quipus',
    form: 20,
    section: 'reading',
    task: 'academic-passage',
    title: 'Inca Records in Knotted Cords',
    topic: 'history',
    difficulty: 'easy',
    paragraphs: [
      'The Inca Empire, which stretched along the Andes Mountains of South America in the fifteenth and early sixteenth centuries, governed millions of people without a writing system like the alphabets used in Europe. Instead, Inca officials kept records with quipus, devices made of knotted strings. A typical quipu consisted of a main cord from which dozens or even hundreds of thinner cords hung down.',
      'Information was stored mainly in the knots. Most quipus used a decimal system, similar to the one we use today. The position of a group of knots on a cord showed whether it stood for ones, tens, hundreds, or larger units, and the number of knots in the group gave the digit. An empty space on the cord represented zero. Colors probably carried meaning as well; a cord of a certain color may have referred to a particular product or village.',
      'Specialists called quipucamayocs were trained to make and read these records. They tracked population counts, the goods kept in government storehouses, and the labor that each community owed to the state. Because the empire was linked by an extensive road network, runners could carry quipus between provincial centers and the capital, Cusco, allowing rulers to monitor distant regions.',
      'After the Spanish conquest in the 1530s, many quipus were destroyed, and the knowledge needed to interpret them was gradually lost. Roughly a thousand examples survive in museums today. Researchers have decoded much of their numerical content, but they still debate whether some quipus also recorded non-numerical information, such as names or stories.',
    ],
    questions: [
      {
        id: 'f20-rd-ap-inca-quipus-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'What is the passage mainly about?',
        options: [
          'How the Inca used knotted cords to store and share information',
          'Why the Inca refused to adopt the writing systems of Europe',
          'How Spanish conquerors learned to read the records of the Inca',
          'Why the Inca road network was so important for long-distance trade',
        ],
        answer: [0],
        explanation:
          'Todo el texto trata de los quipus: qué eran ("devices made of knotted strings"), cómo guardaban números, quién los leía y qué pasó con ellos. El texto no dice que los incas rechazaran la escritura europea ni que los españoles aprendieran a leerlos; al contrario, ese conocimiento "was gradually lost".',
      },
      {
        id: 'f20-rd-ap-inca-quipus-q2',
        kind: 'single',
        skill: 'detail',
        paragraph: 1,
        prompt: 'According to paragraph 2, how was zero shown on a quipu?',
        options: [
          'By a knot of a special color',
          'By a cord tied at both ends',
          'By an empty space on a cord',
          'By a single knot near the main cord',
        ],
        answer: [2],
        explanation:
          'El párrafo 2 lo dice explícitamente: "An empty space on the cord represented zero". Los colores se mencionan en el mismo párrafo, pero para referirse a productos o aldeas, no al cero.',
      },
      {
        id: 'f20-rd-ap-inca-quipus-q3',
        kind: 'single',
        skill: 'vocabulary',
        paragraph: 2,
        highlight: 'monitor',
        prompt: 'The word "monitor" in paragraph 3 is closest in meaning to',
        options: ['defend', 'keep watch on', 'travel to', 'build roads in'],
        answer: [1],
        explanation:
          '"Monitor" significa vigilar o supervisar ("keep watch on"): los quipus llegaban a Cusco y así los gobernantes controlaban las regiones lejanas. "Travel to" es tentador porque los corredores viajaban, pero eran ellos, no los gobernantes.',
      },
      {
        id: 'f20-rd-ap-inca-quipus-q4',
        kind: 'single',
        skill: 'inference',
        paragraph: 3,
        prompt: 'What can be inferred from paragraph 4 about quipus?',
        options: [
          'Most of them were shipped to Spain after the conquest.',
          'Their number system remains a complete mystery today.',
          'They were used mainly to record historical stories.',
          'The full range of their uses is still uncertain.',
        ],
        answer: [3],
        explanation:
          'Los investigadores "still debate whether some quipus also recorded non-numerical information", así que no se sabe del todo para qué se usaban. La opción del sistema numérico contradice "Researchers have decoded much of their numerical content".',
      },
      {
        id: 'f20-rd-ap-inca-quipus-q5',
        kind: 'single',
        skill: 'purpose',
        paragraph: 2,
        prompt: 'Why does the author mention the road network in paragraph 3?',
        options: [
          'To show that the Inca traded quipus with neighboring peoples',
          'To explain how records could reach the capital from far away',
          'To argue that runners were more important than quipucamayocs',
          'To describe how roads were measured with the help of cords',
        ],
        answer: [1],
        explanation:
          'Gracias a la red de caminos, "runners could carry quipus between provincial centers and the capital, Cusco", lo que permitía controlar regiones lejanas. El texto no habla de comercio con otros pueblos ni compara la importancia de corredores y especialistas.',
      },
    ],
  },
  {
    id: 'f20-rd-ap-soil-formation',
    form: 20,
    section: 'reading',
    task: 'academic-passage',
    title: 'From Bedrock to Topsoil',
    topic: 'geology',
    difficulty: 'medium',
    paragraphs: [
      "Soil may look like simple dirt, but it is a complex mixture of mineral particles, organic matter, water, and air that takes a very long time to form. In many regions, producing just a few centimeters of soil requires several centuries. The process begins with weathering, the breakdown of solid rock at or near Earth's surface into smaller fragments.",
      'Weathering occurs in two main ways. In physical weathering, rock is broken apart without any change in its chemical makeup; for example, water that seeps into cracks expands when it freezes, gradually forcing the rock apart. In chemical weathering, minerals react with water, oxygen, or weak acids and are transformed into new substances, such as clay. Warm, wet climates speed up chemical weathering, which is one reason soils in the tropics are often deep.',
      'Living things then turn this weathered material into true soil. Lichens and mosses colonize bare rock, and when they die, their remains add organic matter. Over time, larger plants take root, while earthworms, insects, fungi, and bacteria break down dead leaves and mix them into the ground. The dark, partly decomposed material that results, called humus, holds the water and nutrients that plants need.',
      'As these processes continue, soil develops distinct layers, or horizons, that can be seen in a vertical cut called a soil profile. In a typical profile, the top layer, the O horizon, consists largely of fallen leaves and other organic debris. Beneath it lies the A horizon, or topsoil, a dark layer rich in humus where most roots grow. Water moving downward carries dissolved minerals and fine clay particles out of the upper layers and deposits them in the B horizon, or subsoil. Below that, the C horizon contains partly weathered pieces of the bedrock from which the soil originally formed.',
    ],
    questions: [
      {
        id: 'f20-rd-ap-soil-formation-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'Which of the following best states the main idea of the passage?',
        options: [
          'Chemical weathering matters more than physical weathering in soil formation.',
          'Soil forms quickly wherever bare rock is exposed to warm, wet weather.',
          'Soil forms slowly from weathered rock and gradually develops layers.',
          'Living organisms are the main cause of the breakdown of solid rock.',
        ],
        answer: [2],
        explanation:
          'El texto explica que el suelo "takes a very long time to form" a partir de la meteorización de la roca y que con el tiempo "develops distinct layers, or horizons". La opción del clima cálido y húmedo contradice la lentitud del proceso ("several centuries").',
      },
      {
        id: 'f20-rd-ap-soil-formation-q2',
        kind: 'single',
        skill: 'detail',
        paragraph: 1,
        prompt: 'According to paragraph 2, what happens during physical weathering?',
        options: [
          'Minerals react with oxygen and slowly form clay.',
          'Weak acids dissolve the surface of rocks.',
          'Plants add organic matter to broken rock.',
          'Rock breaks apart without changing chemically.',
        ],
        answer: [3],
        explanation:
          'En la meteorización física "rock is broken apart without any change in its chemical makeup". Las reacciones con oxígeno o ácidos débiles corresponden a la meteorización química, descrita en la frase siguiente.',
      },
      {
        id: 'f20-rd-ap-soil-formation-q3',
        kind: 'single',
        skill: 'vocabulary',
        paragraph: 2,
        highlight: 'colonize',
        prompt: 'The word "colonize" in paragraph 3 is closest in meaning to',
        options: ['settle on', 'wear away', 'protect', 'feed on'],
        answer: [0],
        explanation:
          '"Colonize" significa establecerse en un lugar nuevo ("settle on"): líquenes y musgos son los primeros en instalarse sobre la roca desnuda. "Wear away" (desgastar) describe la meteorización, no lo que hacen estos organismos en la frase.',
      },
      {
        id: 'f20-rd-ap-soil-formation-q4',
        kind: 'single',
        skill: 'inference',
        paragraph: 1,
        prompt: 'What can be inferred from paragraph 2 about soils in cold, dry regions?',
        options: [
          'They contain more clay than tropical soils.',
          'They tend to be thinner than tropical soils.',
          'They form mainly through chemical weathering.',
          'They are not affected by physical weathering.',
        ],
        answer: [1],
        explanation:
          'Si "Warm, wet climates speed up chemical weathering" y por eso "soils in the tropics are often deep", se deduce que en climas fríos y secos el suelo suele ser menos profundo. La opción de que no hay meteorización física es falsa: el agua que se congela es precisamente un ejemplo de ella.',
      },
      {
        id: 'f20-rd-ap-soil-formation-q5',
        kind: 'single',
        skill: 'negative-factual',
        paragraph: 3,
        prompt: 'According to paragraph 4, all of the following are true of soil horizons EXCEPT:',
        options: [
          'The O horizon is made up mostly of organic debris.',
          'Most plant roots grow in the A horizon.',
          'The B horizon receives minerals carried down by water.',
          'The C horizon is the layer that is richest in humus.',
        ],
        answer: [3],
        explanation:
          'La capa rica en humus es la A ("a dark layer rich in humus"); el horizonte C contiene "partly weathered pieces of the bedrock". Las otras tres afirmaciones aparecen tal cual en el párrafo 4.',
      },
    ],
  },
  {
    id: 'f20-rd-ap-pumped-storage',
    form: 20,
    section: 'reading',
    task: 'academic-passage',
    title: 'Pumped-Storage Hydroelectric Plants',
    topic: 'engineering',
    difficulty: 'hard',
    paragraphs: [
      "Electricity is difficult to store in large quantities, yet demand for it rises and falls throughout the day. Power grids must therefore match supply to demand almost instantly. For decades, the most widely used method of storing energy on a large scale has been pumped-storage hydroelectricity, which still accounts for the great majority of the world's grid storage capacity.",
      'A pumped-storage plant consists of two reservoirs located at different elevations and connected by large tunnels or pipes. When electricity is cheap and plentiful, typically at night when demand is low, the plant draws power from the grid to run reversible pump-turbines that move water from the lower reservoir to the upper one. In this way, electrical energy is converted into gravitational potential energy. Later, when demand peaks, the water is released downhill through the same machines, which now operate as turbines and drive generators that return electricity to the grid.',
      'The system is not perfectly efficient. Friction in the pipes, evaporation from the reservoirs, and losses in the machinery mean that a plant typically recovers only about 70 to 85 percent of the energy it consumes. Operators accept this loss because of the economics involved: they buy power when prices are low and sell it when prices are high. Just as important, pumped-storage plants can begin producing electricity within minutes, which allows grid managers to respond quickly to sudden changes, such as the failure of another power station.',
      "In recent years, interest in pumped storage has grown along with wind and solar power. Because these sources depend on the weather, their output often fails to coincide with demand; a sunny afternoon may produce more electricity than consumers need, while evenings bring a shortage. Storage plants can absorb the surplus and release it hours later. Their main drawback is geography: a suitable site needs a large height difference between two bodies of water, and building new reservoirs can flood valleys and disturb ecosystems. Engineers are therefore exploring closed-loop systems, which use artificial reservoirs that are not connected to rivers.",
    ],
    questions: [
      {
        id: 'f20-rd-ap-pumped-storage-q1',
        kind: 'single',
        skill: 'organization',
        prompt: 'Which of the following best describes the organization of the passage?',
        options: [
          'It compares several energy storage methods and ranks them by cost.',
          'It explains how one storage method works and weighs its pros and cons.',
          'It traces the history of hydroelectric power from its origins to today.',
          'It argues that wind and solar power should replace pumped storage.',
        ],
        answer: [1],
        explanation:
          'El texto presenta un único método (pumped storage), explica su funcionamiento en el párrafo 2 y luego valora sus ventajas ("can begin producing electricity within minutes") y limitaciones ("not perfectly efficient", "Their main drawback is geography"). No compara varios métodos ni defiende sustituirlo.',
      },
      {
        id: 'f20-rd-ap-pumped-storage-q2',
        kind: 'single',
        skill: 'detail',
        paragraph: 1,
        prompt: 'According to paragraph 2, when does a pumped-storage plant usually move water to the upper reservoir?',
        options: [
          'When electricity is inexpensive and demand is low',
          'When demand reaches its highest point of the day',
          'When the lower reservoir is about to overflow',
          'When another power station suddenly stops working',
        ],
        answer: [0],
        explanation:
          'El agua se bombea hacia arriba "When electricity is cheap and plentiful, typically at night when demand is low". Cuando la demanda es máxima ("when demand peaks") ocurre lo contrario: el agua se libera para generar electricidad.',
      },
      {
        id: 'f20-rd-ap-pumped-storage-q3',
        kind: 'single',
        skill: 'vocabulary',
        paragraph: 3,
        highlight: 'coincide',
        prompt: 'The word "coincide" in paragraph 4 is closest in meaning to',
        options: ['compete', 'increase', 'interfere', 'match up'],
        answer: [3],
        explanation:
          '"Fails to coincide with demand" significa que la producción no coincide con la demanda en el tiempo ("match up"), como muestra el ejemplo de la tarde soleada frente a la noche. "Compete" e "interfere" no encajan con la idea de desajuste temporal.',
      },
      {
        id: 'f20-rd-ap-pumped-storage-q4',
        kind: 'single',
        skill: 'inference',
        paragraph: 2,
        prompt: 'What can be inferred from paragraph 3 about pumped-storage plants?',
        options: [
          'They generate more electricity than they take from the grid.',
          'They earn money only when evaporation is fully prevented.',
          'They can be profitable even though they lose energy.',
          'They need several hours before they can generate power.',
        ],
        answer: [2],
        explanation:
          'Recuperan solo "about 70 to 85 percent of the energy", pero los operadores aceptan la pérdida porque "they buy power when prices are low and sell it when prices are high": el negocio es rentable pese a la pérdida. La opción de las horas contradice "within minutes".',
      },
      {
        id: 'f20-rd-ap-pumped-storage-q5',
        kind: 'single',
        skill: 'purpose',
        paragraph: 2,
        prompt: 'Why does the author mention "the failure of another power station" in paragraph 3?',
        options: [
          'To give an example of a situation requiring a fast response',
          'To explain why pumped-storage plants lose some energy',
          'To show that pumped-storage plants often break down',
          'To compare the reliability of different kinds of power plants',
        ],
        answer: [0],
        explanation:
          'La avería aparece como ejemplo ("such as") de los "sudden changes" a los que la red debe responder rápidamente gracias a que estas centrales arrancan "within minutes". No se refiere a las pérdidas de energía, que se explican al principio del párrafo.',
      },
    ],
  },
  {
    id: 'f20-rd-ap-amazon-rainfall',
    form: 20,
    section: 'reading',
    task: 'academic-passage',
    title: 'How the Amazon Makes Its Rain',
    topic: 'environment',
    difficulty: 'hard',
    paragraphs: [
      'The Amazon rainforest does not simply receive rain; to a remarkable extent, it produces its own. Moist air blowing in from the Atlantic Ocean drops rain over the eastern part of the basin, but much of that water does not run off into rivers. Instead, trees draw it up through their roots and release it through tiny pores in their leaves, a process called transpiration. Together with evaporation from wet surfaces, transpiration returns enormous amounts of water vapor to the atmosphere.',
      "This vapor is carried westward by the prevailing winds, and it condenses and falls as rain again. The cycle can repeat several times as air moves across the continent, so the same water may fall and rise repeatedly before it reaches the Andes. Scientists estimate that roughly a quarter to a half of the rain that falls in the Amazon basin comes from moisture recycled by the forest itself. Some of this moisture is also carried south by air currents, sometimes called 'flying rivers,' that bring rain to farming regions far beyond the forest.",
      'Deforestation disrupts this cycle. When forest is cleared for cattle pasture or crops, the shallow-rooted grasses that replace the trees release far less water, especially during the dry season, when deep tree roots can still reach moisture stored underground. In addition, rain that falls on cleared land tends to run off quickly instead of soaking into the soil and returning to the air. As a result, less vapor travels downwind, and studies combining satellite observations with climate models suggest that areas downwind of heavily cleared land receive less rainfall.',
      "Researchers worry that these changes could reinforce one another. A drier, warmer forest is more vulnerable to fire, and fires kill additional trees, further reducing transpiration. Some scientists have warned that if clearing continues, large parts of the southern and eastern Amazon could pass a tipping point, beyond which the rainforest would gradually give way to a drier, savanna-like landscape. Such a shift would threaten not only the region's extraordinary biodiversity but also the farms and cities that depend on rain originating in the forest.",
    ],
    questions: [
      {
        id: 'f20-rd-ap-amazon-rainfall-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'What is the passage mainly about?',
        options: [
          'Why cattle ranching has expanded so rapidly across the Amazon basin',
          'How winds from the Atlantic Ocean control river levels in the Amazon',
          'Why savannas are gradually replacing tropical rainforests worldwide',
          'How the forest recycles rain and how clearing it reduces rainfall',
        ],
        answer: [3],
        explanation:
          'El texto explica que la selva "produces its own" lluvia mediante la transpiración y que "Deforestation disrupts this cycle", con menos lluvia a sotavento. La ganadería solo se menciona como causa de la tala, y la sabana es un posible futuro regional, no un fenómeno mundial.',
      },
      {
        id: 'f20-rd-ap-amazon-rainfall-q2',
        kind: 'single',
        skill: 'detail',
        paragraph: 1,
        prompt: "According to paragraph 2, what are 'flying rivers'?",
        options: [
          'Rivers that flow from the Andes toward the Atlantic',
          'Rainstorms that move westward across the forest',
          'Air currents that carry forest moisture far away',
          'Streams that form on cleared land after heavy rain',
        ],
        answer: [2],
        explanation:
          'Los "flying rivers" son "air currents" que llevan hacia el sur la humedad de la selva y "bring rain to farming regions far beyond the forest". La opción de las tormentas hacia el oeste mezcla otro dato del párrafo (el viento lleva el vapor "westward").',
      },
      {
        id: 'f20-rd-ap-amazon-rainfall-q3',
        kind: 'single',
        skill: 'vocabulary',
        paragraph: 3,
        highlight: 'reinforce',
        prompt: 'The word "reinforce" in paragraph 4 is closest in meaning to',
        options: ['cancel out', 'strengthen', 'interrupt', 'accompany'],
        answer: [1],
        explanation:
          '"Reinforce one another" significa que los cambios se refuerzan mutuamente ("strengthen"): la sequía favorece los incendios y estos reducen aún más la transpiración. "Cancel out" (anular) expresa lo contrario.',
      },
      {
        id: 'f20-rd-ap-amazon-rainfall-q4',
        kind: 'single',
        skill: 'inference',
        paragraph: 2,
        prompt: 'What can be inferred from paragraph 3 about trees with deep roots?',
        options: [
          'They can keep releasing water when the surface soil is dry.',
          'They absorb less water than grasses during the wet season.',
          'They are usually the first plants cleared for cattle pasture.',
          'They cause rainwater to run off more quickly into rivers.',
        ],
        answer: [0],
        explanation:
          'Las hierbas transpiran menos "especially during the dry season, when deep tree roots can still reach moisture stored underground"; por tanto, los árboles siguen liberando agua en la estación seca. La escorrentía rápida se asocia al terreno talado, no a los árboles.',
      },
      {
        id: 'f20-rd-ap-amazon-rainfall-q5',
        kind: 'single',
        skill: 'paragraph-relation',
        paragraph: 3,
        prompt: 'How does paragraph 4 relate to paragraph 3?',
        options: [
          'It offers evidence that contradicts the studies in paragraph 3.',
          'It explains how forests recover after the clearing in paragraph 3.',
          'It shows how the effects in paragraph 3 could worsen over time.',
          'It introduces a cause of rainfall unrelated to paragraph 3.',
        ],
        answer: [2],
        explanation:
          'El párrafo 3 describe cómo la tala reduce la lluvia; el párrafo 4 advierte que estos cambios "could reinforce one another" y llevar a un "tipping point". No contradice los estudios ni habla de recuperación del bosque.',
      },
    ],
  },
];
