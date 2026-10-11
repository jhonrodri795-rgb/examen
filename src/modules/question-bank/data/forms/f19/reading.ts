import type { ReadingSet } from '../../../types';

/** Simulación n.º 19 — Reading (contenido original). */
export const sets: ReadingSet[] = [
  // ---------- Complete the Words ----------
  {
    id: 'f19-rd-cw-saturn-rings',
    form: 19,
    section: 'reading',
    task: 'complete-words',
    title: "What Saturn's Rings Are Made Of",
    topic: 'astronomy',
    difficulty: 'easy',
    text:
      "Saturn's rings are one of the most beautiful sights in the solar system. Although {{th|ey}} look {{so|lid}} from {{f|ar}} away, the rings are {{actu|ally}} made of {{bill|ions}} of separate {{pie|ces}}. Most {{o|f}} these pieces {{a|re}} frozen water, {{mi|xed}} with small {{amo|unts}} of dust and rock. Some are as tiny as grains of sand, while others are as large as houses. Because ice reflects sunlight so well, the rings appear bright even through a small telescope.",
    note: 'Tras "made of" y "billions of" vienen sustantivos en plural (billions, pieces). "From far away" es una expresión fija, y "mixed with" se usa para describir mezclas (agua helada mezclada con polvo y roca).',
  },
  {
    id: 'f19-rd-cw-code-switching',
    form: 19,
    section: 'reading',
    task: 'complete-words',
    title: 'Why Bilinguals Switch Languages',
    topic: 'linguistics',
    difficulty: 'medium',
    text:
      'Bilingual speakers often move between two languages within a single conversation, a practice known as code-switching. Although {{i|t}} was {{lo|ng}} seen {{a|s}} a sign {{o|f}} weak {{lang|uage}} skills, {{resea|rchers}} now {{reg|ard}} it {{a|s}} a {{sophis|ticated}} ability. Speakers {{m|ay}} switch when a word in the other language expresses an idea more precisely. They also switch to signal group identity, to quote someone, or to change the tone of a conversation. In fact, fluent bilinguals tend to switch at points where the word order of the two languages matches.',
    note: '"Was long seen as… now regard it as" marca un contraste entre el pasado y el presente. "Regard X as Y" (considerar X como Y) y "a sign of" son colocaciones fijas; el modal "may" va seguido de infinitivo sin "to".',
  },
  {
    id: 'f19-rd-cw-nephrons',
    form: 19,
    section: 'reading',
    task: 'complete-words',
    title: 'How Nephrons Filter Blood',
    topic: 'biology',
    difficulty: 'hard',
    text:
      'Each human kidney contains about a million microscopic filtering units called nephrons, which together process the entire blood supply many times a day. Blood {{ent|ers}} each nephron {{thr|ough}} a tight {{clu|ster}} of {{capil|laries}}, where high {{pres|sure}} pushes water {{a|nd}} dissolved {{subst|ances}} into a cup-shaped capsule. This filtrate then passes {{al|ong}} a {{win|ding}} tube, where nearly all of the water and glucose are {{reabs|orbed}} into nearby blood vessels. Only about one percent of the filtered fluid finally leaves the body as urine.',
    note: 'En los textos científicos abundan las colocaciones (a cluster of capillaries, dissolved substances). Tras "are" se necesita un participio pasado (reabsorbed), y el prefijo "re-" indica que algo se vuelve a hacer.',
  },

  // ---------- Read in Daily Life ----------
  {
    id: 'f19-rd-dl-band-drummer',
    form: 19,
    section: 'reading',
    task: 'daily-life',
    genre: 'advertisement',
    title: 'Band Seeks Weekend Drummer',
    topic: 'daily-life',
    difficulty: 'easy',
    header: ['DRUMMER WANTED — The Rust Street Ramblers'],
    text:
      'We are a four-piece folk-rock band that plays covers and our own songs at local cafés and street fairs. Our drummer is moving to another city this summer, so we need someone new. Rehearsals are on Saturdays and Sundays from 2 to 5 p.m. in our guitarist\'s garage on Elm Avenue. A full drum kit stays in the garage, so you only need to bring your own sticks. No professional experience is required, just steady timing and a friendly attitude. Interested? Send a short video of yourself playing to ramblers.band@example.com by May 20.',
    questions: [
      {
        id: 'f19-rd-dl-band-drummer-q1',
        kind: 'single',
        skill: 'detail',
        prompt: 'What must people who are interested send to the band?',
        options: [
          'A list of other bands they have joined',
          'A copy of their weekly availability',
          'A short video of themselves playing',
          'A photo of the drum kit they own',
        ],
        answer: [2],
        explanation:
          'El anuncio termina con "Send a short video of yourself playing… by May 20". No se pide una lista de bandas ni una foto de la batería; de hecho, la batería ya está en el garaje.',
      },
      {
        id: 'f19-rd-dl-band-drummer-q2',
        kind: 'single',
        skill: 'inference',
        prompt: "What can be inferred about the band's new drummer?",
        options: [
          'The drummer will not need to carry a drum kit to rehearsals.',
          'The drummer must have played professionally in the past.',
          'The drummer will practice with the band on weekday evenings.',
          'The drummer will replace someone who joined another band.',
        ],
        answer: [0],
        explanation:
          'Se deduce de "A full drum kit stays in the garage, so you only need to bring your own sticks". La última opción es una trampa: el baterista actual se va porque "is moving to another city", no porque se una a otra banda.',
      },
    ],
  },
  {
    id: 'f19-rd-dl-art-store-pickup',
    form: 19,
    section: 'reading',
    task: 'daily-life',
    genre: 'webpage',
    title: 'Art Supply Store Pickup',
    topic: 'daily-life',
    difficulty: 'easy',
    header: ['Canvas & Co. Art Supplies — In-Store Pickup'],
    text:
      'Order online and collect your supplies at our Maple Street store at no extra cost. Just choose "In-Store Pickup" at checkout. We will email you when your order is ready, usually within two hours during opening times. Please bring your order number and a photo ID. Orders are held at the front counter for seven days; after that, they are canceled and fully refunded. Large items, such as easels and canvases over 36 inches, must be collected at the loading door at the back of the building.',
    questions: [
      {
        id: 'f19-rd-dl-art-store-pickup-q1',
        kind: 'single',
        skill: 'inference',
        prompt: 'What will probably happen if a customer arrives nine days after an order is ready?',
        options: [
          'The order will be moved to the loading door.',
          'The order will already be canceled and refunded.',
          'The customer will have to pay a daily storage fee.',
          'The store will email the customer a new time.',
        ],
        answer: [1],
        explanation:
          'Los pedidos se guardan siete días: "after that, they are canceled and fully refunded". Nueve días supera ese plazo. La puerta de carga ("loading door") solo se usa para artículos grandes, no para pedidos atrasados.',
      },
      {
        id: 'f19-rd-dl-art-store-pickup-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'Where should a customer collect a large easel?',
        options: [
          'At the front counter inside the store',
          'At another branch on Maple Street',
          "At the customer's home, by delivery",
          'At a door at the back of the building',
        ],
        answer: [3],
        explanation:
          'El texto indica que "easels and canvases over 36 inches must be collected at the loading door at the back of the building". El mostrador delantero ("front counter") es para los pedidos normales.',
      },
    ],
  },
  {
    id: 'f19-rd-dl-makeup-quiz',
    form: 19,
    section: 'reading',
    task: 'daily-life',
    genre: 'text-message',
    title: 'Arranging a Make-Up Quiz',
    topic: 'campus-life',
    difficulty: 'medium',
    text:
      "Priya (9:05 a.m.): Hi Daniel, I missed Tuesday's statistics quiz because I had a fever. I have a note from the health center. Is it possible to take a make-up?\nDaniel, TA (9:20 a.m.): Sorry to hear that! Yes, make-ups are allowed with a medical note. Can you come to my office hours on Thursday at 3?\nPriya (9:22 a.m.): I have a lab until 4 on Thursdays. Would Friday morning work?\nDaniel, TA (9:31 a.m.): Friday at 10 is fine, in Room 214 of the Math Building. You'll have 30 minutes, the same as in class. Bring the note and a calculator, since phones aren't allowed.\nPriya (9:33 a.m.): Perfect, thank you! See you then.",
    questions: [
      {
        id: 'f19-rd-dl-makeup-quiz-q1',
        kind: 'single',
        skill: 'purpose',
        prompt: 'Why does Priya first contact Daniel?',
        options: [
          'To ask whether she may use her phone during a quiz',
          'To find out which chapters the next quiz will cover',
          'To tell him that her lab session has been moved',
          'To request a chance to take a quiz she missed',
        ],
        answer: [3],
        explanation:
          'Priya explica que perdió el examen ("I missed Tuesday\'s statistics quiz") y pregunta "Is it possible to take a make-up?". Lo del teléfono lo menciona Daniel después, no es el motivo del mensaje.',
      },
      {
        id: 'f19-rd-dl-makeup-quiz-q2',
        kind: 'single',
        skill: 'inference',
        prompt: 'Why does Priya suggest Friday morning instead of Thursday?',
        options: [
          'Daniel does not hold office hours on Thursdays.',
          'She has another academic commitment at that time.',
          'The health center told her to rest until Friday.',
          'Room 214 is only available at the end of the week.',
        ],
        answer: [1],
        explanation:
          'Daniel propone el jueves a las 3, pero Priya responde "I have a lab until 4 on Thursdays". De hecho, Daniel sí tiene horas de oficina el jueves, así que la primera opción es falsa.',
      },
      {
        id: 'f19-rd-dl-makeup-quiz-q3',
        kind: 'single',
        skill: 'detail',
        prompt: 'What does Daniel tell Priya to bring?',
        options: [
          'Her medical note and a calculator',
          'Her phone and her lecture notes',
          'A permission form signed by the professor',
          'Her student ID card and a pencil',
        ],
        answer: [0],
        explanation:
          'Daniel escribe "Bring the note and a calculator, since phones aren\'t allowed". El teléfono, precisamente, está prohibido.',
      },
    ],
  },
  {
    id: 'f19-rd-dl-rail-replacement',
    form: 19,
    section: 'reading',
    task: 'daily-life',
    genre: 'schedule',
    title: 'Weekend Rail Replacement Buses',
    topic: 'daily-life',
    difficulty: 'medium',
    header: ['Riverside Line — Weekend Engineering Works (Sat 14 – Sun 15 June)'],
    text:
      'Line order: City Central – Ashford Junction – Kenley – Lowmoor – Bayport\nTrains will NOT run between Ashford Junction and Lowmoor while track repairs take place.\nReplacement buses: Ashford Junction (Station Road stop) → Kenley → Lowmoor, every 20 minutes, 6:00 a.m.–11:30 p.m.\nJourney time: about 45 minutes longer than usual.\nTrains run normally between City Central and Ashford Junction, and between Lowmoor and Bayport.\nBicycles: not allowed on replacement buses, except folding bikes.\nTickets: all rail tickets are valid on replacement buses. No refunds for delays.\nNormal service resumes Monday 16 June at 5:30 a.m.',
    questions: [
      {
        id: 'f19-rd-dl-rail-replacement-q1',
        kind: 'single',
        skill: 'detail',
        prompt: 'How can a passenger travel from Ashford Junction to Lowmoor on Saturday?',
        options: [
          'By train, with departures every 20 minutes',
          'By train, but only after 11:30 p.m.',
          'By bus, from the Station Road stop',
          'By bus, leaving from City Central',
        ],
        answer: [2],
        explanation:
          'Entre Ashford Junction y Lowmoor no hay trenes; el horario indica "Replacement buses: Ashford Junction (Station Road stop) → Kenley → Lowmoor". Los autobuses salen de Station Road, no de City Central.',
      },
      {
        id: 'f19-rd-dl-rail-replacement-q2',
        kind: 'single',
        skill: 'inference',
        prompt: 'A passenger wants to go from City Central to Bayport on Sunday with a regular, non-folding bicycle. What problem will she most likely face?',
        options: [
          'She cannot take the bicycle on part of the trip.',
          'She must buy an extra ticket for the bus section.',
          'She will have to wait until Monday to leave.',
          'She will receive no train service at Bayport.',
        ],
        answer: [0],
        explanation:
          'Según el orden de la línea, el viaje pasa por el tramo Ashford Junction–Lowmoor, que se cubre en autobús, y "Bicycles: not allowed on replacement buses, except folding bikes". El billete no es problema: "all rail tickets are valid on replacement buses".',
      },
      {
        id: 'f19-rd-dl-rail-replacement-q3',
        kind: 'single',
        skill: 'vocabulary',
        prompt: 'The word "resumes" in the schedule is closest in meaning to',
        options: ['is reduced', 'is replaced', 'is postponed', 'starts again'],
        answer: [3],
        explanation:
          '"Resumes" significa "se reanuda": el servicio normal vuelve a empezar el lunes a las 5:30. No significa que se aplace ("is postponed") ni que se sustituya ("is replaced").',
      },
    ],
  },
  {
    id: 'f19-rd-dl-travel-reimbursement',
    form: 19,
    section: 'reading',
    task: 'daily-life',
    genre: 'memo',
    title: 'Revised Travel Reimbursement Rules',
    topic: 'daily-life',
    difficulty: 'hard',
    header: ['MEMO', 'To: All Staff', 'From: Human Resources', 'Date: March 3', 'Subject: Changes to travel reimbursement'],
    text:
      'Effective April 1, the following changes apply to all business travel. First, receipts must be uploaded through the ExpenseHub app within 30 days of your return; paper forms will no longer be accepted. Second, the daily meal allowance will rise from $45 to $55, although alcohol will not be reimbursed under any circumstances. Third, economy class remains the standard for flights. Business class may be booked only for flights longer than eight hours, and only with written approval from a department director. Finally, personal car use will be reimbursed at $0.60 per mile, provided the total does not exceed the cost of an economy flight for the same trip. Claims for trips completed before April 1 may still be submitted on paper until April 30. Please direct any questions to Karen Lowe in HR (ext. 4417).',
    questions: [
      {
        id: 'f19-rd-dl-travel-reimbursement-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'What is the main purpose of the memo?',
        options: [
          'To announce that business trips will be reduced',
          'To explain new rules for claiming travel costs',
          'To introduce a new employee in the HR office',
          'To remind staff to submit their March receipts',
        ],
        answer: [1],
        explanation:
          'El memo enumera cambios ("First… Second… Third… Finally…") sobre cómo se reembolsan los gastos de viaje a partir del 1 de abril. No dice que se vayan a reducir los viajes.',
      },
      {
        id: 'f19-rd-dl-travel-reimbursement-q2',
        kind: 'single',
        skill: 'inference',
        prompt: 'An employee returns on March 25 from a five-day business trip. Which statement about her claim is true?',
        options: [
          'She must use the app because paper forms are banned.',
          'She may use paper, but not with a meal allowance.',
          'She may still use paper if she submits by April 30.',
          'She must call Karen Lowe to get her claim approved.',
        ],
        answer: [2],
        explanation:
          'El viaje termina antes del 1 de abril, y el memo dice: "Claims for trips completed before April 1 may still be submitted on paper until April 30". La prohibición del papel solo rige para los viajes sujetos a la nueva norma.',
      },
      {
        id: 'f19-rd-dl-travel-reimbursement-q3',
        kind: 'single',
        skill: 'detail',
        prompt: 'Under the new policy, which flight could be booked in business class?',
        options: [
          'A ten-hour flight approved in writing by a director',
          'A six-hour flight booked at least a month early',
          'A ten-hour flight approved verbally by a team leader',
          'Any flight that costs less than driving the same route',
        ],
        answer: [0],
        explanation:
          'Se exigen dos condiciones: "flights longer than eight hours" y "written approval from a department director". La tercera opción falla porque la aprobación es verbal y no la da un director.',
      },
    ],
  },

  // ---------- Read an Academic Passage ----------
  {
    id: 'f19-rd-ap-stock-exchanges',
    form: 19,
    section: 'reading',
    task: 'academic-passage',
    title: 'How Companies Raise Money with Shares',
    topic: 'economics',
    difficulty: 'easy',
    paragraphs: [
      'When a company wants to grow, for example by building a factory or developing a new product, it needs money. One way to obtain it is to borrow from a bank, but loans must be repaid with interest. Another option is to sell part of the ownership of the company itself. This ownership is divided into small units called shares, and the people who buy them become part-owners known as shareholders.',
      'The first time a company sells shares to the general public is called an initial public offering, or IPO. Before an IPO, a firm is usually owned by its founders and a few early investors. Through the offering, it can raise a large amount of money from thousands of buyers at once. Unlike a loan, this money does not have to be paid back. In exchange, however, the original owners give up some control, and the company must publish regular financial reports.',
      'After the IPO, shares are traded on a stock exchange, an organized market such as the New York Stock Exchange. There, investors buy and sell shares among themselves, and the company receives no money from these trades. Still, the exchange plays an important role: because investors know they can easily sell their shares later, they are more willing to buy them in the first place.',
      'Shareholders hope to profit in two ways. If the company does well, the price of its shares may rise, and they can sell them for more than they paid. Some companies also share part of their profits through regular payments called dividends. However, share prices can also fall, so investors always risk losing money.',
    ],
    questions: [
      {
        id: 'f19-rd-ap-stock-exchanges-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'What is the passage mainly about?',
        options: [
          'Why bank loans are cheaper than selling shares',
          'How investors decide which shares to buy',
          'The history of the New York Stock Exchange',
          'How selling shares helps companies get money',
        ],
        answer: [3],
        explanation:
          'El texto explica cómo una empresa obtiene dinero vendiendo acciones ("sell part of the ownership"), la IPO, el papel de la bolsa y lo que ganan los accionistas. La Bolsa de Nueva York solo aparece como ejemplo.',
      },
      {
        id: 'f19-rd-ap-stock-exchanges-q2',
        kind: 'single',
        skill: 'detail',
        paragraph: 1,
        prompt: 'According to paragraph 2, what is one advantage of an IPO compared with a bank loan?',
        options: [
          'The founders keep complete control of the firm.',
          'The money raised does not need to be repaid.',
          'The company no longer has to publish reports.',
          'Only early investors are allowed to buy shares.',
        ],
        answer: [1],
        explanation:
          'El párrafo 2 dice: "Unlike a loan, this money does not have to be paid back". Los fundadores, en cambio, "give up some control", y la empresa debe publicar informes.',
      },
      {
        id: 'f19-rd-ap-stock-exchanges-q3',
        kind: 'single',
        skill: 'vocabulary',
        paragraph: 0,
        highlight: 'obtain',
        prompt: 'The word "obtain" in paragraph 1 is closest in meaning to',
        options: ['invest', 'borrow', 'acquire', 'protect'],
        answer: [2],
        explanation:
          '"Obtain" significa conseguir u obtener ("acquire"). "Borrow" es una trampa: pedir prestado es solo una de las formas de conseguir el dinero que menciona la frase siguiente.',
      },
      {
        id: 'f19-rd-ap-stock-exchanges-q4',
        kind: 'single',
        skill: 'inference',
        paragraph: 2,
        prompt: 'What can be inferred from paragraph 3 about a company whose shares would be very hard to resell?',
        options: [
          'Investors would probably be less eager to buy its shares.',
          'It would receive money each time its shares changed hands.',
          'It would be required to pay its shareholders dividends.',
          'Its founders would have to borrow money from a bank.',
        ],
        answer: [0],
        explanation:
          'El párrafo 3 explica que los inversores compran con más gusto "because investors know they can easily sell their shares later". Si fuera difícil revender, se deduce lo contrario. La segunda opción contradice "the company receives no money from these trades".',
      },
      {
        id: 'f19-rd-ap-stock-exchanges-q5',
        kind: 'single',
        skill: 'negative-factual',
        paragraph: 3,
        prompt: 'According to paragraph 4, all of the following are true about shareholders EXCEPT:',
        options: [
          'They may sell shares for more than they paid.',
          'They are sure to receive yearly dividends.',
          'They can lose money if share prices go down.',
          "They may receive part of a company's profits.",
        ],
        answer: [1],
        explanation:
          'El texto dice "Some companies also share part of their profits… called dividends": solo algunas empresas pagan dividendos, así que no están garantizados. Las demás opciones aparecen en el párrafo 4.',
      },
    ],
  },
  {
    id: 'f19-rd-ap-social-capital',
    form: 19,
    section: 'reading',
    task: 'academic-passage',
    title: 'Social Capital and Civic Decline',
    topic: 'sociology',
    difficulty: 'medium',
    paragraphs: [
      "In the 1990s, the American political scientist Robert Putnam popularized the idea of social capital: the networks of relationships, shared norms, and trust that allow people to cooperate. Just as physical capital, such as tools and machines, and human capital, such as education and skills, make individuals more productive, social capital makes communities more effective. Neighbors who know and trust one another are more likely to watch each other's homes, organize local projects, and solve problems without official help.",
      'Putnam argued that this resource had been declining in the United States since the 1960s. Drawing on surveys and membership records, he showed that Americans were voting less, attending fewer public meetings, and joining fewer clubs, unions, and parent-teacher associations. His most famous illustration was bowling: although more Americans were bowling than ever, fewer were doing so in organized leagues. People were, in his memorable phrase, "bowling alone," which became the title of his influential 2000 book.',
      'To explain the decline, Putnam examined several suspects. Busier work schedules and longer commutes left people with less free time, and the spread of suburbs separated homes from workplaces. However, he concluded that the most important factor was generational. Americans who came of age around World War II had been unusually active in civic life, and as they were gradually replaced by younger generations who participated less, overall involvement fell. He also blamed television, which turned leisure into a private activity spent at home.',
      'Putnam\'s thesis sparked considerable debate. Some critics argued that civic life had not disappeared but had changed form, moving into new organizations, informal groups, and later online communities. Others noted that membership in national advocacy groups had grown, even if members rarely met face to face. Nevertheless, the concept of social capital is now widely used by researchers who study health, education, and economic development.',
    ],
    questions: [
      {
        id: 'f19-rd-ap-social-capital-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'Which of the following best expresses the main idea of the passage?',
        options: [
          'Television was the only cause of falling civic participation in America.',
          'Bowling leagues grew more popular in the United States after the 1960s.',
          "Putnam argued that Americans' civic and social connections had weakened.",
          'Social capital matters less to communities than physical or human capital.',
        ],
        answer: [2],
        explanation:
          'El pasaje presenta el concepto de capital social, la tesis de Putnam sobre su declive ("this resource had been declining"), sus causas y el debate posterior. La televisión es solo uno de los factores ("He also blamed television"), no el único.',
      },
      {
        id: 'f19-rd-ap-social-capital-q2',
        kind: 'single',
        skill: 'detail',
        paragraph: 1,
        prompt: 'According to paragraph 2, what did Putnam observe about bowling?',
        options: [
          'Fewer Americans went bowling than in earlier decades.',
          'Bowling leagues attracted mostly younger players.',
          'Most bowlers also belonged to parent-teacher groups.',
          'More people bowled, but fewer did so in leagues.',
        ],
        answer: [3],
        explanation:
          'El párrafo 2 dice: "although more Americans were bowling than ever, fewer were doing so in organized leagues". La primera opción contradice "more Americans were bowling than ever".',
      },
      {
        id: 'f19-rd-ap-social-capital-q3',
        kind: 'single',
        skill: 'vocabulary',
        paragraph: 2,
        highlight: 'suspects',
        prompt: 'The word "suspects" in paragraph 3 is closest in meaning to',
        options: ['possible causes', 'criminal acts', 'reliable sources', 'final results'],
        answer: [0],
        explanation:
          'Aquí "suspects" se usa en sentido figurado: los "sospechosos" son las posibles causas del declive (horarios, suburbios, generaciones, televisión). "Criminal acts" recoge el sentido literal, que no encaja.',
      },
      {
        id: 'f19-rd-ap-social-capital-q4',
        kind: 'single',
        skill: 'inference',
        paragraph: 2,
        prompt: 'What can be inferred from paragraph 3 about Americans who came of age around World War II?',
        options: [
          'They spent more time watching television than later generations.',
          'They took part in civic life more than the generations after them.',
          'They were mainly responsible for the growth of the suburbs.',
          'They had longer commutes to work than younger Americans.',
        ],
        answer: [1],
        explanation:
          'Fueron "unusually active in civic life" y los sustituyeron "younger generations who participated less", por lo que participaban más que las generaciones posteriores. El texto no los relaciona con la televisión ni con los suburbios.',
      },
      {
        id: 'f19-rd-ap-social-capital-q5',
        kind: 'single',
        skill: 'purpose',
        paragraph: 3,
        prompt: 'Why does the author mention national advocacy groups in paragraph 4?',
        options: [
          "To show that Putnam's data on voting were incorrect",
          'To explain how television reduced civic participation',
          'To give an example of groups that met face to face',
          "To report an argument made by Putnam's critics",
        ],
        answer: [3],
        explanation:
          'Tras "Putnam\'s thesis sparked considerable debate", el autor recoge objeciones: "Others noted that membership in national advocacy groups had grown". Es un argumento de los críticos. La tercera opción contradice "members rarely met face to face".',
      },
    ],
  },
  {
    id: 'f19-rd-ap-cubism',
    form: 19,
    section: 'reading',
    task: 'academic-passage',
    title: 'Cubism and Multiple Viewpoints',
    topic: 'art',
    difficulty: 'hard',
    paragraphs: [
      'For nearly five centuries, most European painting followed the rules of linear perspective developed during the Renaissance. A picture was treated as a window: the artist observed a scene from a single, fixed position and arranged lines so that they converged toward a vanishing point, creating the illusion of depth on a flat surface. Around 1907, Pablo Picasso and Georges Braque began to question this convention. Working closely together in Paris over the next several years, they developed Cubism, one of the most radical movements in modern art.',
      'Their central idea was that a single viewpoint captures only part of what we know about an object. When we look at a guitar or a bottle, we understand it as a three-dimensional thing with a back, sides, and an interior, even though we cannot see them all at once. The Cubists therefore broke objects into flat, angular planes and showed several views simultaneously, such as the front of a face beside its profile, or the top of a glass alongside its side. Partly inspired by Paul Cézanne, who had simplified natural forms into geometric shapes, they also flattened space, so that objects and background seemed to interlock rather than recede.',
      'Scholars usually divide the movement into two phases. In Analytic Cubism, roughly from 1909 to 1912, the artists fragmented their subjects so thoroughly that they were often difficult to recognize. To keep attention on structure, they limited their palettes largely to browns, grays, and muted greens. In Synthetic Cubism, which followed, the approach was reversed: instead of taking objects apart, the artists built images up from simpler, bolder shapes and brighter colors. They also began attaching real materials, such as newspaper and patterned wallpaper, to their pictures, a technique known as collage.',
      "Cubism's influence extended far beyond painting. By rejecting the idea that art must imitate what the eye sees from one spot, it opened the way to abstraction and inspired movements such as Futurism in Italy and Constructivism in Russia. Critics at first ridiculed the style; the name itself came from a mocking remark that Braque's landscapes were made of little cubes. Yet within a few decades, Cubism had become one of the foundations of twentieth-century art.",
    ],
    questions: [
      {
        id: 'f19-rd-ap-cubism-q1',
        kind: 'single',
        skill: 'organization',
        prompt: 'Which of the following best describes the organization of the passage?',
        options: [
          'It describes a tradition, a movement that broke with it, its phases, and its legacy.',
          'It compares two painters in detail and argues that one of them was far more original.',
          'It traces Cubism back to Cézanne and then explains why critics rejected it.',
          'It lists several modern art movements and ranks them by their influence.',
        ],
        answer: [0],
        explanation:
          'El párrafo 1 presenta la perspectiva lineal y el inicio del cubismo; el 2, su idea central; el 3, sus dos fases ("two phases"); el 4, su influencia. Cézanne y las críticas son detalles, no la estructura general.',
      },
      {
        id: 'f19-rd-ap-cubism-q2',
        kind: 'single',
        skill: 'detail',
        paragraph: 1,
        prompt: 'According to paragraph 2, how did the Cubists represent objects?',
        options: [
          'By painting them from a single, carefully chosen position',
          'By placing them in front of a deep, receding background',
          'By showing several sides of them within the same image',
          'By copying photographs of them that were taken from above',
        ],
        answer: [2],
        explanation:
          'El párrafo 2 afirma que "showed several views simultaneously, such as the front of a face beside its profile". El punto de vista único es justamente lo que rechazaban, y el fondo no se aleja ("rather than recede").',
      },
      {
        id: 'f19-rd-ap-cubism-q3',
        kind: 'single',
        skill: 'vocabulary',
        paragraph: 2,
        highlight: 'muted',
        prompt: 'The word "muted" in paragraph 3 is closest in meaning to',
        options: ['bright', 'subdued', 'blended', 'silent'],
        answer: [1],
        explanation:
          '"Muted" aplicado a colores significa apagado o suave ("subdued"), en línea con "browns, grays". "Silent" es una trampa: corresponde al sentido de "mute" referido al sonido.',
      },
      {
        id: 'f19-rd-ap-cubism-q4',
        kind: 'single',
        skill: 'inference',
        paragraph: 2,
        prompt: 'What can be inferred from paragraph 3 about the limited colors used in Analytic Cubism?',
        options: [
          'Bright paints were too expensive for the artists at the time.',
          'The palette was copied directly from the works of Cézanne.',
          'The colors were chosen to make subjects easier to recognize.',
          'Strong colors might have drawn attention away from structure.',
        ],
        answer: [3],
        explanation:
          'El texto dice que limitaron la paleta "to keep attention on structure", de modo que los colores intensos habrían distraído de la estructura. La tercera opción contradice que los objetos fueran "difficult to recognize".',
      },
      {
        id: 'f19-rd-ap-cubism-q5',
        kind: 'single',
        skill: 'purpose',
        paragraph: 3,
        prompt: 'Why does the author mention the origin of the name "Cubism" in paragraph 4?',
        options: [
          'To explain why Braque later gave up the style',
          'To show that critics praised the style at once',
          'To illustrate the early hostility toward the style',
          'To suggest that the style mainly involved cubes',
        ],
        answer: [2],
        explanation:
          'La frase empieza con "Critics at first ridiculed the style" y el nombre surgió de "a mocking remark": sirve para ilustrar el rechazo inicial. La segunda opción dice lo contrario.',
      },
    ],
  },
  {
    id: 'f19-rd-ap-moores-law',
    form: 19,
    section: 'reading',
    task: 'academic-passage',
    title: "Shrinking Transistors and Moore's Law",
    topic: 'technology',
    difficulty: 'hard',
    paragraphs: [
      'A transistor is a tiny electronic switch that can turn an electric current on or off or amplify a weak signal. Every digital device, from a calculator to a supercomputer, relies on enormous numbers of them, because their on and off states can represent the ones and zeros of binary code. The first working transistor was built at Bell Laboratories in 1947. It was bulky by modern standards and assembled by hand, yet it was already a major improvement over the fragile, power-hungry vacuum tubes used in early computers.',
      "The next breakthrough came in the late 1950s with the integrated circuit, in which many transistors and their connections were formed together on a single piece of silicon. Because these components were created through photolithography, a process that uses light to print patterns onto the chip, engineers could make them smaller by refining the printing process. In 1965, Gordon Moore, who later co-founded Intel, observed that the number of components on a chip had been doubling every year, and he predicted that the trend would continue. In 1975 he revised the rate to a doubling roughly every two years, and this forecast became known as Moore's law.",
      "Strictly speaking, Moore's law is not a law of nature but an observation about engineering and economics. For decades, however, it functioned almost as a self-fulfilling prophecy: chip manufacturers used it to set research goals and schedules, so the industry worked hard to keep pace with it. The results were astonishing. Intel's 4004 processor of 1971 contained about 2,300 transistors; by the 2020s, leading processors held tens of billions. As transistors shrank, they also became faster and used less energy, while the cost of each transistor fell dramatically.",
      'In recent years, however, progress has slowed. Some features of modern transistors are only a few dozen atoms wide, and at this scale electrons can leak through barriers that are supposed to block them, wasting power and generating heat. Manufacturing such tiny structures also requires extremely expensive equipment. Engineers have responded by stacking components vertically, designing new transistor shapes, and building specialized chips for particular tasks. Many experts now believe that the era of steady, predictable shrinking is ending, even if computing power continues to grow.',
    ],
    questions: [
      {
        id: 'f19-rd-ap-moores-law-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'What is the passage mainly about?',
        options: [
          'The business rivalry between Bell Laboratories and Intel',
          'How transistors shrank and why progress is now slowing',
          'Why engineers preferred vacuum tubes in early computers',
          'How binary code is used to represent numbers and text',
        ],
        answer: [1],
        explanation:
          'El pasaje recorre la historia de la miniaturización (transistor de 1947, circuito integrado, ley de Moore) y termina con "progress has slowed". No habla de una rivalidad empresarial, y los tubos de vacío solo sirven de contraste.',
      },
      {
        id: 'f19-rd-ap-moores-law-q2',
        kind: 'single',
        skill: 'detail',
        paragraph: 1,
        prompt: 'According to paragraph 2, why could components on integrated circuits be made smaller over time?',
        options: [
          'Engineers kept improving the process used to print them.',
          'Workers became more skilled at assembling them by hand.',
          'Vacuum tubes were added to make the circuits stronger.',
          'Moore developed a new material to replace the silicon.',
        ],
        answer: [0],
        explanation:
          'Gracias a la fotolitografía, "engineers could make them smaller by refining the printing process". El montaje a mano se refiere al primer transistor de 1947 (párrafo 1), no a los circuitos integrados.',
      },
      {
        id: 'f19-rd-ap-moores-law-q3',
        kind: 'single',
        skill: 'vocabulary',
        paragraph: 2,
        highlight: 'astonishing',
        prompt: 'The word "astonishing" in paragraph 3 is closest in meaning to',
        options: ['predictable', 'disappointing', 'temporary', 'remarkable'],
        answer: [3],
        explanation:
          '"Astonishing" significa asombroso ("remarkable"); lo confirma el salto de "about 2,300 transistors" a "tens of billions". "Predictable" es una trampa porque la ley de Moore era una predicción, pero la palabra expresa asombro.',
      },
      {
        id: 'f19-rd-ap-moores-law-q4',
        kind: 'single',
        skill: 'inference',
        paragraph: 2,
        prompt: "What can be inferred from paragraph 3 about Moore's law?",
        options: [
          'It was proven to follow from the laws of physics in the 1970s.',
          'It was ignored by most chip manufacturers for several decades.',
          "It came true partly through the industry's own determined efforts.",
          'It predicted that the cost of each transistor would rise over time.',
        ],
        answer: [2],
        explanation:
          'El texto la llama "a self-fulfilling prophecy": los fabricantes la usaban para fijar objetivos y "worked hard to keep pace with it", así que se cumplió en parte por ese esfuerzo. La primera opción contradice "not a law of nature".',
      },
      {
        id: 'f19-rd-ap-moores-law-q5',
        kind: 'single',
        skill: 'negative-factual',
        paragraph: 3,
        prompt: 'According to paragraph 4, engineers have responded to the slowdown in all of the following ways EXCEPT',
        options: [
          'returning to vacuum tubes for some tasks',
          'stacking components on top of each other',
          'creating transistors with new shapes',
          'building chips designed for specific jobs',
        ],
        answer: [0],
        explanation:
          'El párrafo 4 menciona "stacking components vertically, designing new transistor shapes, and building specialized chips". Los tubos de vacío solo aparecen en el párrafo 1 como tecnología antigua.',
      },
    ],
  },
];
