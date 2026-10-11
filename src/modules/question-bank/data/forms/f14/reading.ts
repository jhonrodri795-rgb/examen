import type { ReadingSet } from '../../../types';

/** Simulación n.º 14 — Reading (contenido original). */
export const sets: ReadingSet[] = [
  // ---------- Complete the Words ----------
  {
    id: 'f14-rd-cw-animal-sounds',
    form: 14,
    section: 'reading',
    task: 'complete-words',
    title: 'Animal Sounds Across Languages',
    topic: 'linguistics',
    difficulty: 'easy',
    text:
      'Words that imitate animal sounds are known as onomatopoeia. Although {{do|gs}} bark {{i|n}} the {{sa|me}} way {{every|where}}, the {{wo|rds}} people {{u|se}} for {{bar|king}} vary {{wid|ely}}. This {{i|s}} because {{ev|ery}} language has its own limited set of sounds. When speakers describe a noise, they choose the closest sounds their language allows. As a result, the same bark becomes "woof" in English and "wang wang" in Mandarin. Children learn these traditional forms early, mostly from parents and picture books.',
    note: 'Fíjate en las colocaciones «in the same way» y «vary widely» (variar mucho), y en «This is because…», que introduce la causa de lo dicho antes.',
  },
  {
    id: 'f14-rd-cw-hibernation',
    form: 14,
    section: 'reading',
    task: 'complete-words',
    title: 'How Hibernation Saves Energy',
    topic: 'biology',
    difficulty: 'medium',
    text:
      'Hibernation allows some mammals to survive long winters when food is scarce. During {{hiber|nation}}, the {{he|art}} rate {{o|f}} the {{ani|mal}} drops {{dramat|ically}}, and {{i|ts}} breathing {{bec|omes}} extremely {{sl|ow}}. Body {{tempe|rature}} also {{decl|ines}}, sometimes to just a few degrees above freezing. These changes greatly reduce the amount of energy the body needs, so the animal can live for months on the fat it stored in autumn. Many small hibernators also wake briefly at regular intervals, although scientists still debate why.',
    note: 'El texto está en presente («drops», «becomes», «declines»): usa ese tiempo verbal al completar. «Heart rate» y «body temperature» son colocaciones fijas.',
  },
  {
    id: 'f14-rd-cw-meiji',
    form: 14,
    section: 'reading',
    task: 'complete-words',
    title: "Japan's Meiji Modernization",
    topic: 'history',
    difficulty: 'hard',
    text:
      'In 1868, a political revolution in Japan restored formal authority to the emperor and ended over two centuries of military rule by the Tokugawa shoguns. The {{n|ew}} government, {{deter|mined}} to {{av|oid}} Western {{domin|ation}}, launched {{a|n}} ambitious {{camp|aign}} of {{ref|orm}}. Officials {{stu|died}} European {{a|nd}} American {{instit|utions}}, then adapted them to Japanese conditions. Within a few decades, Japan had built railways, a national school system, modern factories, and a conscript army, becoming the first non-Western nation to industrialize.',
    note: '«Determined to + verbo» expresa una firme intención; «an» va delante de vocal («an ambitious»). Ojo con sustantivos largos como «domination» o «institutions»: cuenta las letras que faltan.',
  },

  // ---------- Read in Daily Life ----------
  {
    id: 'f14-rd-dl-newspaper-deadlines',
    form: 14,
    section: 'reading',
    task: 'daily-life',
    genre: 'memo',
    title: 'Newspaper Submission Deadlines',
    topic: 'campus-life',
    difficulty: 'easy',
    header: ['MEMO', 'To: Staff Writers, The Campus Ledger', 'From: Priya Nair, Editor-in-Chief', 'Re: New article deadlines'],
    text:
      'Starting next week, our print day moves from Friday to Thursday. Because of this change, all news articles must now be submitted by 6:00 p.m. on Monday instead of Tuesday. Opinion pieces and reviews are due by noon on Tuesday. Please upload your work to the shared Ledger folder, not by email, so our copy editors can find it easily. Late articles will be held for the following week\'s issue. If you think you will miss a deadline, tell your section editor as early as possible.',
    questions: [
      {
        id: 'f14-rd-dl-newspaper-deadlines-q1',
        kind: 'single',
        skill: 'detail',
        prompt: 'When is the new deadline for news articles?',
        options: ['Noon on Tuesday', '6:00 p.m. on Monday', '6:00 p.m. on Tuesday', 'Thursday morning'],
        answer: [1],
        explanation:
          'El memorando dice: "all news articles must now be submitted by 6:00 p.m. on Monday instead of Tuesday". "Noon on Tuesday" es la fecha límite de las columnas de opinión y reseñas, no de las noticias.',
      },
      {
        id: 'f14-rd-dl-newspaper-deadlines-q2',
        kind: 'single',
        skill: 'inference',
        prompt: 'What will probably happen to a news article that is uploaded on Tuesday afternoon?',
        options: [
          'It will be returned to the writer by email.',
          'It will be printed on Thursday as usual.',
          'It will be moved to the opinion section.',
          'It will appear in the next week\'s issue.',
        ],
        answer: [3],
        explanation:
          'El martes por la tarde ya ha pasado el plazo del lunes, y el texto indica que "Late articles will be held for the following week\'s issue". Que se imprima el jueves "as usual" es falso, porque el artículo llegó tarde.',
      },
    ],
  },
  {
    id: 'f14-rd-dl-flea-market',
    form: 14,
    section: 'reading',
    task: 'daily-life',
    genre: 'advertisement',
    title: 'Riverside Weekend Flea Market',
    topic: 'daily-life',
    difficulty: 'easy',
    header: ['RIVERSIDE WEEKEND FLEA MARKET'],
    text:
      'Every Saturday and Sunday in October, 8 a.m. to 2 p.m.\nElm Street Parking Lot (next to the public library)\n\nAdmission is FREE for shoppers! Browse vintage clothing, used books, furniture, vinyl records, and handmade crafts.\n\nWant to sell? Vendor tables cost $20 per day or $35 for the whole weekend. Each table comes with two folding chairs. Reserve online at riversidemarket.org until the Thursday before each market. Vendors may begin setting up at 7 a.m.\n\nFood trucks on site. Pets are welcome but must stay on a leash.',
    questions: [
      {
        id: 'f14-rd-dl-flea-market-q1',
        kind: 'single',
        skill: 'detail',
        prompt: 'How much does a vendor pay to sell on both days of one weekend?',
        options: ['$35', '$20', '$40', 'Nothing at all'],
        answer: [0],
        explanation:
          'El anuncio indica "$20 per day or $35 for the whole weekend". La opción "$40" es la trampa: sale de multiplicar 20 × 2, pero existe una tarifa especial de fin de semana. Lo gratuito es la entrada para compradores, no la mesa.',
      },
      {
        id: 'f14-rd-dl-flea-market-q2',
        kind: 'single',
        skill: 'vocabulary',
        prompt: 'The word "Browse" in the advertisement is closest in meaning to',
        options: ['Buy in large quantities', 'Sell at low prices', 'Look through casually', 'Return for a refund'],
        answer: [2],
        explanation:
          '"Browse" significa mirar u ojear sin prisa, sin obligación de comprar: "Browse vintage clothing, used books…". No implica comprar en grandes cantidades ni vender.',
      },
    ],
  },
  {
    id: 'f14-rd-dl-festival-lineup',
    form: 14,
    section: 'reading',
    task: 'daily-life',
    genre: 'schedule',
    title: 'Harbor Lights Festival Lineup',
    topic: 'daily-life',
    difficulty: 'medium',
    header: ['HARBOR LIGHTS MUSIC FESTIVAL — Saturday Lineup'],
    text:
      'MAIN STAGE\n3:00–4:00 p.m. The Copper Lanterns (folk rock)\n5:00–6:30 p.m. Velvet Static (indie pop)\n8:00–10:00 p.m. Marisol Vega & the North Wind (headliner)\n\nRIVER STAGE\n2:30–3:30 p.m. Kid Monsoon (hip-hop)\n4:00–5:00 p.m. The Night Ferry (jazz trio)\n6:30–7:30 p.m. Lena Okafor (acoustic soul)\n\nGARDEN TENT (seated, 120 people max)\n3:30–4:30 p.m. Poetry & Strings (spoken word with cello)\n7:00–8:00 p.m. Open-mic showcase (sign up at the info booth by 5:00 p.m.)\n\nGates open at 1:00 p.m. Garden Tent seats are first come, first served. Keep your wristband on: it is required for re-entry.',
    questions: [
      {
        id: 'f14-rd-dl-festival-lineup-q1',
        kind: 'single',
        skill: 'detail',
        prompt: "Which performance partly overlaps with The Night Ferry's set?",
        options: ['The Copper Lanterns', 'Velvet Static', 'Poetry & Strings', 'Kid Monsoon'],
        answer: [2],
        explanation:
          'The Night Ferry toca de 4:00 a 5:00, y "Poetry & Strings" va de 3:30 a 4:30 p.m., así que coinciden de 4:00 a 4:30. The Copper Lanterns termina justo a las 4:00 y Velvet Static empieza a las 5:00, por lo que no se solapan.',
      },
      {
        id: 'f14-rd-dl-festival-lineup-q2',
        kind: 'single',
        skill: 'inference',
        prompt: 'What can be inferred about a festivalgoer who wants to perform at the open mic?',
        options: [
          "They must sign up by the time Velvet Static starts playing.",
          'They will perform on the Main Stage right after the headliner.',
          'They need to show their wristband in order to sign up.',
          'They can reserve a seat in the Garden Tent in advance.',
        ],
        answer: [0],
        explanation:
          'La inscripción es "at the info booth by 5:00 p.m.", y Velvet Static empieza precisamente a las 5:00 p.m. La pulsera ("wristband") se exige para volver a entrar, no para inscribirse.',
      },
      {
        id: 'f14-rd-dl-festival-lineup-q3',
        kind: 'single',
        skill: 'vocabulary',
        prompt: 'What does "first come, first served" mean in the schedule?',
        options: [
          'Seats can be booked at the info booth.',
          'People with headliner tickets sit first.',
          'Seats are saved for the performers\' guests.',
          'Seats go to whoever arrives earliest.',
        ],
        answer: [3],
        explanation:
          '"First come, first served" significa que los asientos se asignan por orden de llegada. Por eso no se pueden reservar en la caseta de información ni están guardados para invitados.',
      },
    ],
  },
  {
    id: 'f14-rd-dl-debate-travel',
    form: 14,
    section: 'reading',
    task: 'daily-life',
    genre: 'text-message',
    title: 'Debate Tournament Travel Plans',
    topic: 'campus-life',
    difficulty: 'medium',
    text:
      "Nadia (7:02 p.m.): Hi Jess! Coach just confirmed we're in the novice bracket at the Lakeview Invitational. First round is Saturday at 8:30 a.m.\nJess (7:05 p.m.): Great! Are we driving up Friday with the rest of the team?\nNadia (7:06 p.m.): The van only has room for eight, and there are ten of us. Coach asked if we could take the 4:15 train instead. The department will reimburse our tickets if we keep the receipts.\nJess (7:09 p.m.): That works. My last class ends at 3:00, so I can make it. What about the hotel?\nNadia (7:11 p.m.): We're sharing a room with Priya and Carmen at the Harbor Inn. It's a ten-minute walk from the building where the rounds are held.\nJess (7:12 p.m.): Perfect. I'll buy our train tickets tonight and send you yours.",
    questions: [
      {
        id: 'f14-rd-dl-debate-travel-q1',
        kind: 'single',
        skill: 'detail',
        prompt: 'Why are Nadia and Jess taking the train?',
        options: [
          'The first round starts too early for the van.',
          'There are not enough seats in the team van.',
          'The train is cheaper than driving with the team.',
          'Jess has a class that ends late on Friday.',
        ],
        answer: [1],
        explanation:
          'Nadia explica: "The van only has room for eight, and there are ten of us". La clase de Jess termina a las 3:00, lo que le permite llegar al tren de las 4:15; no es el motivo del cambio.',
      },
      {
        id: 'f14-rd-dl-debate-travel-q2',
        kind: 'single',
        skill: 'inference',
        prompt: 'What can be inferred about the cost of the train tickets?',
        options: [
          'Jess will end up paying for both tickets herself.',
          'The Harbor Inn will refund part of the price.',
          'The students will likely get their money back.',
          'Coach has already bought tickets for everyone.',
        ],
        answer: [2],
        explanation:
          'Según Nadia, "The department will reimburse our tickets if we keep the receipts", así que probablemente recuperarán el dinero. Aunque Jess compra los billetes ("I\'ll buy our train tickets tonight"), no los pagará al final.',
      },
      {
        id: 'f14-rd-dl-debate-travel-q3',
        kind: 'single',
        skill: 'detail',
        prompt: 'What does Jess offer to do?',
        options: [
          'Purchase the train tickets for both of them',
          'Ask Coach to rent a larger van for the team',
          'Book a room for four people at the Harbor Inn',
          'Find out where the tournament rounds are held',
        ],
        answer: [0],
        explanation:
          'Jess escribe: "I\'ll buy our train tickets tonight and send you yours". La habitación del Harbor Inn ya está organizada ("We\'re sharing a room…"), así que no es lo que ella ofrece.',
      },
    ],
  },
  {
    id: 'f14-rd-dl-withdrawal-policy',
    form: 14,
    section: 'reading',
    task: 'daily-life',
    genre: 'notice',
    title: 'Course-Withdrawal Policy Changes',
    topic: 'campus-life',
    difficulty: 'hard',
    header: ['OFFICE OF THE REGISTRAR', 'Changes to the Course-Withdrawal Policy — Effective Spring Semester'],
    text:
      'Beginning this spring, the deadline to drop a course without any record moves from the end of week 3 to the end of week 2. Courses dropped by this date will not appear on your transcript, and tuition will be refunded in full.\n\nFrom week 3 through week 10, students may still withdraw, but a grade of "W" will be recorded. A "W" does not affect your GPA. Refunds during this period follow a sliding scale: 50% in weeks 3–4, 25% in weeks 5–6, and none after week 6.\n\nAfter week 10, withdrawals are permitted only for documented medical or family emergencies and require approval from the Dean of Students. Students receiving financial aid should consult the Financial Aid Office before withdrawing, as dropping below 12 credits may reduce their award.',
    questions: [
      {
        id: 'f14-rd-dl-withdrawal-policy-q1',
        kind: 'single',
        skill: 'detail',
        prompt: 'What will happen if a student withdraws from a course in week 5?',
        options: [
          'The course will be removed from the transcript.',
          'The student will get half of the tuition back.',
          'The student\'s GPA will fall because of the "W."',
          'A "W" will be recorded, with a partial refund.',
        ],
        answer: [3],
        explanation:
          'Entre las semanas 3 y 10 se registra una "W", y el reembolso es del "25% in weeks 5–6". El 50 % ("half") corresponde solo a las semanas 3–4, y el aviso aclara que "A W does not affect your GPA".',
      },
      {
        id: 'f14-rd-dl-withdrawal-policy-q2',
        kind: 'single',
        skill: 'inference',
        prompt: 'What can be inferred about the previous policy?',
        options: [
          'It did not allow any withdrawals after week 10.',
          'It gave an extra week to drop without a record.',
          'It offered full tuition refunds until week 6.',
          'It required the Dean\'s approval for all withdrawals.',
        ],
        answer: [1],
        explanation:
          'El plazo para darse de baja sin dejar rastro "moves from the end of week 3 to the end of week 2", es decir, antes había una semana más. Nada indica que antes se reembolsara todo hasta la semana 6.',
      },
      {
        id: 'f14-rd-dl-withdrawal-policy-q3',
        kind: 'single',
        skill: 'detail',
        prompt: 'Why should students with financial aid contact the Financial Aid Office first?',
        options: [
          'To get approval from the Dean of Students',
          'To check whether their refund will be larger',
          'Because dropping credits may reduce their aid',
          'Because a "W" cannot appear on their transcripts',
        ],
        answer: [2],
        explanation:
          'El aviso advierte que "dropping below 12 credits may reduce their award". La aprobación del decano solo se exige para bajas después de la semana 10 por emergencias.',
      },
    ],
  },

  // ---------- Read an Academic Passage ----------
  {
    id: 'f14-rd-ap-third-places',
    form: 14,
    section: 'reading',
    task: 'academic-passage',
    title: 'Third Places and Community Life',
    topic: 'sociology',
    difficulty: 'easy',
    paragraphs: [
      'In his 1989 book The Great Good Place, the American sociologist Ray Oldenburg introduced the term "third place" to describe informal gathering spots that exist outside the home, the first place, and the workplace, the second place. Cafes, public libraries, barbershops, and parks are common examples. According to Oldenburg, these places are important to community life because they bring people together in a relaxed setting where no one is required to be.',
      'Third places share several features. They are usually inexpensive or free, so people with different incomes can visit them. They are easy to reach, often within walking distance of home. Most importantly, they have "regulars," people who come often and help newcomers feel welcome. In a good third place, conversation is the main activity, and social status matters less than it does at work.',
      'Researchers argue that third places benefit both individuals and neighborhoods. For individuals, they offer a remedy for loneliness and a chance to meet people unlike themselves. For neighborhoods, they help residents build trust and share information. A casual conversation at a local cafe, for example, might lead neighbors to organize a cleanup of a nearby park.',
      'Some sociologists worry that third places are disappearing. Car-centered suburbs, long working hours, and the rise of online entertainment keep many people at home. In response, some cities are redesigning libraries with comfortable seating and community rooms and adding benches and small plazas to parks. These efforts suggest that third places do not simply appear; communities must plan for them.',
    ],
    questions: [
      {
        id: 'f14-rd-ap-third-places-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'What is the passage mainly about?',
        options: [
          'Why people prefer to work in cafes rather than offices',
          'How Ray Oldenburg became a well-known sociologist',
          'What third places are and why communities need them',
          'How cities decide where to build new public parks',
        ],
        answer: [2],
        explanation:
          'El texto define el "third place" (párrafo 1), describe sus rasgos (párrafo 2), sus beneficios (párrafo 3) y su posible desaparición (párrafo 4). Oldenburg solo se menciona como autor del término, no es el tema central.',
      },
      {
        id: 'f14-rd-ap-third-places-q2',
        kind: 'single',
        skill: 'detail',
        paragraph: 1,
        prompt: 'According to paragraph 2, what is one feature of a typical third place?',
        options: [
          'Regulars who help new visitors feel welcome',
          'Membership fees that keep the space quiet',
          'Strict rules about how long people may stay there',
          'A focus on work rather than on conversation',
        ],
        answer: [0],
        explanation:
          'El párrafo 2 dice que tienen "regulars": "people who come often and help newcomers feel welcome". Además, son baratos o gratuitos ("inexpensive or free"), por lo que las cuotas de socio contradicen el texto.',
      },
      {
        id: 'f14-rd-ap-third-places-q3',
        kind: 'single',
        skill: 'vocabulary',
        paragraph: 2,
        highlight: 'remedy',
        prompt: 'The word "remedy" in paragraph 3 is closest in meaning to',
        options: ['reason', 'source', 'complication', 'solution'],
        answer: [3],
        explanation:
          '"A remedy for loneliness" es algo que cura o soluciona la soledad, es decir, una "solution". "Source" (origen) sería lo contrario: algo que causa la soledad.',
      },
      {
        id: 'f14-rd-ap-third-places-q4',
        kind: 'single',
        skill: 'inference',
        paragraph: 3,
        prompt: 'What can be inferred from paragraph 4 about car-centered suburbs?',
        options: [
          'They usually contain more cafes than city centers do.',
          'They make it harder for residents to meet informally.',
          'They were planned by sociologists to reduce loneliness.',
          'They have replaced their libraries with online services.',
        ],
        answer: [1],
        explanation:
          'Los "car-centered suburbs" aparecen entre las causas de que los terceros lugares desaparezcan y de que la gente se quede en casa ("keep many people at home"); por tanto, dificultan los encuentros informales. Lo de las bibliotecas es una distorsión: las ciudades las están rediseñando, no sustituyendo.',
      },
      {
        id: 'f14-rd-ap-third-places-q5',
        kind: 'single',
        skill: 'purpose',
        paragraph: 2,
        prompt: 'Why does the author mention a park cleanup in paragraph 3?',
        options: [
          'To show how casual talk can lead to community action',
          'To show that parks are the most important third places',
          'To argue that cafes should take care of public spaces',
          'To explain why some neighbors avoid local third places',
        ],
        answer: [0],
        explanation:
          'La limpieza del parque es un ejemplo ("for example") de cómo "a casual conversation at a local cafe" puede llevar a los vecinos a organizarse. El texto no afirma que los parques sean los terceros lugares más importantes.',
      },
    ],
  },
  {
    id: 'f14-rd-ap-bauhaus',
    form: 14,
    section: 'reading',
    task: 'academic-passage',
    title: 'The Bauhaus and Functional Design',
    topic: 'art',
    difficulty: 'medium',
    paragraphs: [
      'The Bauhaus was a German school of art and design founded by the architect Walter Gropius in Weimar in 1919. Although it operated for only fourteen years, moving to Dessau in 1925 and to Berlin in 1932 before closing under pressure from the Nazi government in 1933, it became one of the most influential schools in the history of modern design.',
      'Gropius wanted to end the traditional separation between the fine arts and the crafts. Students began with a preliminary course on basic forms, colors, and materials, and then trained in workshops devoted to metalwork, weaving, furniture, and pottery. The goal was not to produce unique objects for wealthy collectors but to create well-made prototypes that factories could manufacture in large numbers at an affordable price.',
      'This approach reflected the principle that "form follows function," a phrase associated with the American architect Louis Sullivan. In practice, it meant that an object\'s shape should arise from its purpose and materials rather than from added decoration. A famous example is the tubular steel chair designed by Marcel Breuer, a former Bauhaus student who later taught there. Inspired partly by bicycle handlebars, the chair was light, strong, and simple to produce, and its bare metal frame openly showed how it was built.',
      'When the school closed, many of its teachers emigrated, carrying its ideas abroad. Gropius taught at Harvard, and Ludwig Mies van der Rohe led the architecture program at what became the Illinois Institute of Technology. Critics have argued that the Bauhaus style could feel cold and that its simplicity was sometimes more a matter of taste than of true function. Nevertheless, its clean lines and emphasis on practical, mass-produced design remain visible in everyday objects, from office chairs to desk lamps.',
    ],
    questions: [
      {
        id: 'f14-rd-ap-bauhaus-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'Which of the following best expresses the main idea of the passage?',
        options: [
          'The Bauhaus closed because its products cost too much to manufacture.',
          'The Bauhaus linked art and industry, letting function guide form.',
          'Louis Sullivan founded a German school that promoted decorated objects.',
          'The Bauhaus mainly trained painters to sell their work to collectors.',
        ],
        answer: [1],
        explanation:
          'El pasaje explica que la escuela quiso unir artes y oficios para la producción industrial, siguiendo el principio "form follows function". Cerró por la presión nazi ("under pressure from the Nazi government"), no por costes.',
      },
      {
        id: 'f14-rd-ap-bauhaus-q2',
        kind: 'single',
        skill: 'detail',
        paragraph: 1,
        prompt: 'According to paragraph 2, what was the purpose of the Bauhaus workshops?',
        options: [
          'To preserve traditional decorative styles in furniture',
          'To train students to make unique pieces for collectors',
          'To replace the preliminary course on colors and forms',
          'To design affordable objects for mass production',
        ],
        answer: [3],
        explanation:
          'El objetivo era "to create well-made prototypes that factories could manufacture in large numbers at an affordable price". La opción de piezas únicas para coleccionistas es justo lo que el texto niega ("not to produce unique objects for wealthy collectors").',
      },
      {
        id: 'f14-rd-ap-bauhaus-q3',
        kind: 'single',
        skill: 'vocabulary',
        paragraph: 2,
        highlight: 'arise',
        prompt: 'The word "arise" in paragraph 3 is closest in meaning to',
        options: ['result', 'differ', 'escape', 'recover'],
        answer: [0],
        explanation:
          '"Arise from" significa surgir o derivarse de algo: la forma debe "result from" la función y los materiales. "Differ" (diferir) cambiaría el sentido de la frase.',
      },
      {
        id: 'f14-rd-ap-bauhaus-q4',
        kind: 'single',
        skill: 'purpose',
        paragraph: 2,
        prompt: 'Why does the author mention bicycle handlebars in paragraph 3?',
        options: [
          'To show that Breuer preferred engineering to art',
          'To argue that the chair was copied from a factory',
          "To name an everyday source of the chair's design",
          'To explain why the school moved to a new city',
        ],
        answer: [2],
        explanation:
          'El autor dice que la silla estaba "Inspired partly by bicycle handlebars": un objeto industrial cotidiano inspiró el uso del tubo de acero. "Partly" indica inspiración, no copia, por eso la segunda opción es incorrecta.',
      },
      {
        id: 'f14-rd-ap-bauhaus-q5',
        kind: 'single',
        skill: 'inference',
        paragraph: 3,
        prompt: 'What can be inferred from paragraph 4 about the critics of the Bauhaus?',
        options: [
          'They believed the school should never have been closed.',
          'They found Bauhaus objects too heavily decorated.',
          'They praised its influence on modern office furniture.',
          'They doubted its designs always met practical needs.',
        ],
        answer: [3],
        explanation:
          'Los críticos dicen que su sencillez era a veces "more a matter of taste than of true function", es decir, dudan de que siempre respondiera a necesidades prácticas. Lo de "heavily decorated" contradice el estilo sobrio que se describe.',
      },
    ],
  },
  {
    id: 'f14-rd-ap-machine-learning',
    form: 14,
    section: 'reading',
    task: 'academic-passage',
    title: 'Learning from Labeled Examples',
    topic: 'technology',
    difficulty: 'hard',
    paragraphs: [
      'Traditional computer programs follow rules written explicitly by programmers. For many tasks, however, the rules are too complex to state. It is difficult, for instance, to write precise instructions for recognizing a handwritten digit or deciding whether an email is spam. Machine learning takes a different approach: instead of being given rules, a system is given examples and must work out the rules itself. In its most common form, known as supervised learning, each example is paired with a label that states the correct answer, such as an image of a handwritten "7" labeled "7" or an email labeled "spam."',
      'Learning begins with a model whose internal settings, called parameters, are initially arbitrary. The model makes a prediction for each training example, and the prediction is compared with the label. A mathematical function measures the size of the error, and an optimization procedure, usually a variant of gradient descent, adjusts the parameters slightly in the direction that reduces that error. Repeated over thousands or millions of examples, these small adjustments gradually tune the model so that its predictions match the labels more closely. Crucially, no one tells the model which features matter; it discovers on its own, for example, that certain stroke patterns distinguish a "7" from a "1."',
      'Success on the training data, however, is not the real goal. A model with enough parameters can simply memorize its examples, a problem called overfitting, and then perform poorly on data it has never seen. To detect this, researchers set aside part of the labeled data as a test set that is never used during training. Performance on this held-out set provides an estimate of how well the model will generalize to new cases.',
      'Supervised learning also has important limitations. Because a model can only learn patterns present in its examples, the quality of the labels is critical. If the labels contain mistakes or reflect human prejudices, the model will reproduce them. Moreover, labeling is often expensive, since experts such as radiologists may be needed to annotate medical images. These costs have encouraged interest in methods that learn from unlabeled data, although labeled examples remain central to many practical systems.',
    ],
    questions: [
      {
        id: 'f14-rd-ap-machine-learning-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'What is the passage mainly about?',
        options: [
          'Why rule-based programs are more reliable than learning systems',
          'How radiologists label medical images for computer systems',
          'Why overfitting makes machine learning useless in practice',
          'How systems learn from labeled data and what limits them',
        ],
        answer: [3],
        explanation:
          'El pasaje explica el aprendizaje supervisado (párrafos 1–2), cómo se evalúa (párrafo 3) y sus límites (párrafo 4). Los radiólogos son solo un ejemplo del coste de etiquetar, y el sobreajuste es un problema que se detecta, no algo que vuelva inútil el método.',
      },
      {
        id: 'f14-rd-ap-machine-learning-q2',
        kind: 'single',
        skill: 'detail',
        paragraph: 1,
        prompt: "According to paragraph 2, what happens after a model's prediction is compared with the label?",
        options: [
          'A programmer rewrites the rules the model follows.',
          'The training example is moved into the test set.',
          'The parameters are adjusted to reduce the error.',
          'The model decides which labels to keep or discard.',
        ],
        answer: [2],
        explanation:
          'Tras medir el error, "an optimization procedure … adjusts the parameters slightly in the direction that reduces that error". Que un programador reescriba reglas es lo propio de los programas tradicionales, no del aprendizaje automático.',
      },
      {
        id: 'f14-rd-ap-machine-learning-q3',
        kind: 'single',
        skill: 'vocabulary',
        paragraph: 1,
        highlight: 'arbitrary',
        prompt: 'The word "arbitrary" in paragraph 2 is closest in meaning to',
        options: ['carefully selected in advance', 'not based on any plan', 'extremely large', 'hidden from users'],
        answer: [1],
        explanation:
          'Los parámetros son "initially arbitrary": al principio no responden a ningún criterio y se van ajustando con el entrenamiento. "Carefully selected in advance" es lo contrario de lo que se quiere decir.',
      },
      {
        id: 'f14-rd-ap-machine-learning-q4',
        kind: 'single',
        skill: 'inference',
        paragraph: 2,
        prompt: 'What can be inferred from paragraph 3 about a model that performs very well on its training data?',
        options: [
          'It may still fail on many new examples.',
          'It must have been trained without any labels.',
          'It has fewer parameters than other models.',
          'It will do equally well on any test set.',
        ],
        answer: [0],
        explanation:
          'El párrafo 3 dice que "Success on the training data … is not the real goal", porque un modelo puede memorizar los ejemplos y "perform poorly on data it has never seen". Por eso no se puede asegurar que funcione igual de bien con el conjunto de prueba.',
      },
      {
        id: 'f14-rd-ap-machine-learning-q5',
        kind: 'single',
        skill: 'negative-factual',
        paragraph: 3,
        prompt: 'According to paragraph 4, all of the following are limitations of supervised learning EXCEPT:',
        options: [
          'Errors in the labels are learned by the model.',
          'Labels may require costly work by experts.',
          'Models cannot be tested before they are used.',
          'Human biases in labels can be reproduced.',
        ],
        answer: [2],
        explanation:
          'El párrafo 4 menciona los errores de etiquetado ("mistakes"), los prejuicios ("human prejudices") y el coste ("labeling is often expensive"). En cambio, el párrafo 3 explica que sí se evalúan los modelos con un "test set", así que esa opción no es una limitación del texto.',
      },
    ],
  },
  {
    id: 'f14-rd-ap-cosmic-distances',
    form: 14,
    section: 'reading',
    task: 'academic-passage',
    title: 'Measuring Distances to the Stars',
    topic: 'astronomy',
    difficulty: 'hard',
    paragraphs: [
      'Measuring the distance to a star is one of the oldest problems in astronomy, because a point of light in the sky gives no direct clue to how far away it is. The most fundamental technique is parallax, the apparent shift in an object\'s position when it is viewed from two different places. Holding up a finger at arm\'s length and looking at it first with one eye and then with the other demonstrates the effect: the finger seems to jump against the more distant background.',
      'Astronomers apply the same principle by using Earth\'s orbit as a baseline. They record a nearby star\'s position against much more distant stars and then observe it again six months later, when Earth is on the opposite side of the Sun. The closer the star, the larger its apparent shift, and simple geometry converts the angle into a distance. The angles involved, however, are tiny; even for the nearest stars they are less than one arcsecond, a small fraction of a degree. As a result, the first successful measurement was not made until 1838, by the German astronomer Friedrich Bessel. Today, satellites above the blurring effects of the atmosphere measure parallax for stars thousands of light-years away, but beyond that range the shifts become too small to detect.',
      'For more remote objects, astronomers rely on "standard candles," objects whose true brightness can be determined independently. The most famous are Cepheid variables, stars that pulsate, growing brighter and dimmer in a regular cycle. In the early 1900s, Henrietta Swan Leavitt, studying Cepheids in the Small Magellanic Cloud, discovered that the brighter ones had longer periods. Because all of these stars lay at roughly the same distance from Earth, differences in how bright they appeared reflected real differences in their luminosity. Her finding meant that simply timing a Cepheid\'s cycle reveals its true brightness.',
      'Comparing that true brightness with how bright the star appears from Earth then yields its distance, since light grows fainter in a predictable way as it spreads out. First, however, the relationship had to be calibrated using nearby Cepheids whose distances could be measured by other means, such as parallax. In this way, each method supports the next, forming what astronomers call the cosmic distance ladder. In the 1920s, Edwin Hubble used Cepheids in the Andromeda nebula to show that it lay far beyond the Milky Way, demonstrating that our galaxy is only one of many.',
    ],
    questions: [
      {
        id: 'f14-rd-ap-cosmic-distances-q1',
        kind: 'single',
        skill: 'organization',
        prompt: 'Which of the following best describes the organization of the passage?',
        options: [
          'A basic method and its limit are explained, then a method built on it.',
          'Two rival methods are compared, and the older one is shown to be more accurate.',
          'A historical error about the Milky Way is described and then slowly corrected.',
          'Several kinds of variable stars are classified according to their brightness.',
        ],
        answer: [0],
        explanation:
          'Primero se explica el paralaje, luego su límite ("beyond that range the shifts become too small to detect") y después las cefeidas, calibradas con el paralaje: "each method supports the next". Los métodos no compiten, se complementan.',
      },
      {
        id: 'f14-rd-ap-cosmic-distances-q2',
        kind: 'single',
        skill: 'detail',
        paragraph: 1,
        prompt: 'According to paragraph 2, why do astronomers observe a star twice, six months apart?',
        options: [
          'To wait until the star completes a full pulsation',
          'To view it from opposite sides of Earth\'s orbit',
          'To avoid the blurring effects of the atmosphere',
          'To compare it with stars in another galaxy',
        ],
        answer: [1],
        explanation:
          'Seis meses después, "Earth is on the opposite side of the Sun", y así se usa la órbita terrestre como línea de base. La atmósfera se evita con satélites, no esperando seis meses.',
      },
      {
        id: 'f14-rd-ap-cosmic-distances-q3',
        kind: 'single',
        skill: 'vocabulary',
        paragraph: 3,
        highlight: 'yields',
        prompt: 'The word "yields" in paragraph 4 is closest in meaning to',
        options: ['delays', 'requires', 'produces', 'conceals'],
        answer: [2],
        explanation:
          'Comparar el brillo real con el aparente "yields its distance", es decir, da como resultado o "produces" la distancia. "Requires" invierte la relación: la distancia es el resultado, no un requisito.',
      },
      {
        id: 'f14-rd-ap-cosmic-distances-q4',
        kind: 'single',
        skill: 'inference',
        paragraph: 2,
        prompt: "It can be inferred from paragraph 3 that Leavitt's conclusion would have been less reliable if",
        options: [
          'the Cepheids had pulsated in regular cycles',
          'she had observed the stars through a telescope',
          'the cloud had contained only very bright stars',
          'her stars had been at very different distances',
        ],
        answer: [3],
        explanation:
          'Su razonamiento funcionó "Because all of these stars lay at roughly the same distance from Earth": así, las diferencias de brillo aparente reflejaban diferencias reales. Si las distancias hubieran sido muy distintas, esa conclusión no sería fiable. Los ciclos regulares son precisamente lo que permite usarlas.',
      },
      {
        id: 'f14-rd-ap-cosmic-distances-q5',
        kind: 'single',
        skill: 'purpose',
        paragraph: 3,
        prompt: "Why does the author mention Edwin Hubble's work on the Andromeda nebula?",
        options: [
          'To show that parallax can reach other galaxies',
          'To illustrate a key discovery Cepheids made possible',
          'To explain how Leavitt\'s relationship was calibrated',
          'To suggest that Leavitt\'s work was at first ignored',
        ],
        answer: [1],
        explanation:
          'Hubble usó cefeidas para demostrar que Andrómeda "lay far beyond the Milky Way", un gran descubrimiento posible gracias a este método. El paralaje no llega tan lejos: el texto dice que deja de funcionar más allá de miles de años luz.',
      },
    ],
  },
];
