import type { ReadingSet } from '../../../types';

/** Simulación n.º 7 — Reading (contenido original). */
export const sets: ReadingSet[] = [
  // ---------- Complete the Words ----------
  {
    id: 'f07-rd-cw-barter-money',
    form: 7,
    section: 'reading',
    task: 'complete-words',
    title: 'Money and the Barter Problem',
    topic: 'economics',
    difficulty: 'easy',
    text:
      'Before money existed, people usually exchanged goods directly through a system called barter. This {{sys|tem}} worked {{on|ly}} when {{ea|ch}} trader {{wan|ted}} exactly {{wh|at}} the {{ot|her}} person offered. A {{far|mer}} with {{ex|tra}} wheat {{w|ho}} needed {{sh|oes}} had to find a shoemaker who wanted wheat at the same moment. Economists call this the double coincidence of wants. Money solved the problem because everyone accepted it, so the farmer could sell wheat to anyone and later spend the coins on shoes.',
    note: 'Usa el contexto posterior: "a shoemaker" confirma "shoes", y "worked only when" expresa una condición necesaria. Recuerda que el número de guiones indica cuántas letras faltan.',
  },
  {
    id: 'f07-rd-cw-hawthorne',
    form: 7,
    section: 'reading',
    task: 'complete-words',
    title: 'The Hawthorne Factory Studies',
    topic: 'sociology',
    difficulty: 'medium',
    text:
      'In the 1920s and 1930s, researchers studied workers at the Hawthorne Works, a factory near Chicago. They {{fi|rst}} changed {{t|he}} lighting {{t|o}} see {{whe|ther}} brighter {{condi|tions}} would {{ra|ise}} productivity. Surprisingly, {{out|put}} increased {{ev|en}} when {{t|he}} lights {{we|re}} dimmed, and it also rose after changes to breaks and working hours. Later analysts suggested that the workers were responding not to the physical changes but to the attention they received from researchers. This tendency to behave differently when observed is now called the Hawthorne effect.',
    note: '"To see whether…" introduce una pregunta indirecta (si…); "even when" (incluso cuando) marca un resultado inesperado. "Raise productivity" es una colocación habitual.',
  },
  {
    id: 'f07-rd-cw-chiaroscuro',
    form: 7,
    section: 'reading',
    task: 'complete-words',
    title: "Caravaggio's Light and Shadow",
    topic: 'art',
    difficulty: 'hard',
    text:
      'Chiaroscuro, from the Italian words for light and dark, is the use of strong tonal contrasts to model three-dimensional forms. Although {{ear|lier}} painters {{h|ad}} employed {{gra|dual}} shading, Caravaggio {{pus|hed}} the {{tech|nique}} to dramatic {{extr|emes}} around 1600. His {{fig|ures}} often {{eme|rge}} from {{nea|rly}} black {{backg|rounds}}, illuminated by a single, sharply focused beam of light. This theatrical approach, sometimes called tenebrism, heightened the emotional intensity of religious scenes and influenced artists across Europe for generations.',
    note: '"Although earlier painters had employed…" usa el pasado perfecto para una acción anterior; "push something to extremes" es una expresión fija (llevar algo al extremo).',
  },

  // ---------- Read in Daily Life ----------
  {
    id: 'f07-rd-dl-zoo-visit',
    form: 7,
    section: 'reading',
    task: 'daily-life',
    genre: 'webpage',
    title: 'City Zoo Visitor Information',
    topic: 'daily-life',
    difficulty: 'easy',
    header: ['Maplewood City Zoo — Plan Your Visit'],
    text:
      'OPENING HOURS\nDaily, 9:00 a.m. to 5:00 p.m. (last entry at 4:00 p.m.). Closed on December 25.\n\nTICKETS\nAdults: $18 | Seniors (65+): $12 | Children (3–12): $10 | Children under 3: free\nTickets bought online are $2 cheaper.\n\nFEEDING DEMONSTRATIONS\nPenguins: 10:30 a.m. at Polar Point\nGiraffes: 1:00 p.m. at the Savanna Deck\nSea lions: 3:30 p.m. at the Harbor Pool\nEach demonstration lasts about 20 minutes. Please arrive early, as seating is limited.',
    questions: [
      {
        id: 'f07-rd-dl-zoo-visit-q1',
        kind: 'single',
        skill: 'detail',
        prompt: 'How much does an adult ticket cost if it is bought online?',
        options: ['$18', '$12', '$16', '$20'],
        answer: [2],
        explanation:
          'La entrada de adulto cuesta "$18" y "Tickets bought online are $2 cheaper", así que en línea cuesta $16. La opción $18 es el precio en taquilla y $20 suma los $2 en lugar de restarlos.',
      },
      {
        id: 'f07-rd-dl-zoo-visit-q2',
        kind: 'single',
        skill: 'inference',
        prompt: 'What is suggested about the feeding demonstrations?',
        options: [
          'Visitors who arrive late may not find a seat.',
          'They cost $2 less when booked online.',
          'Each one lasts for about an hour.',
          'They take place only on weekends and holidays.',
        ],
        answer: [0],
        explanation:
          'La página pide "Please arrive early, as seating is limited": quien llegue tarde puede quedarse sin asiento. El descuento de $2 se refiere a las entradas, no a las demostraciones, y cada demostración dura "about 20 minutes".',
      },
    ],
  },
  {
    id: 'f07-rd-dl-family-brunch',
    form: 7,
    section: 'reading',
    task: 'daily-life',
    genre: 'menu',
    title: 'Family Weekend Brunch Menu',
    topic: 'campus-life',
    difficulty: 'easy',
    header: ['Hillcrest Dining Hall — Family Weekend Brunch', 'Saturday, October 18 · 10:00 a.m.–1:30 p.m.'],
    text:
      "HOT DISHES\nVegetable omelets made to order\nBlueberry pancakes with maple syrup\nRoasted potatoes and turkey sausage\n\nLIGHT CHOICES\nYogurt and granola bar\nFresh fruit platter\nWhole-wheat bagels with cream cheese\n\nDRINKS\nCoffee, tea, orange juice\n\nPRICES\nStudents with a meal plan: one meal swipe\nGuest adults: $14\nGuest children (4–10): $7\nChildren under 4: free\n\nGuest tickets are sold at the cashier's desk only; cards and cash are accepted. Gluten-free pancakes are available on request.",
    questions: [
      {
        id: 'f07-rd-dl-family-brunch-q1',
        kind: 'single',
        skill: 'detail',
        prompt: 'How much will a student pay for two adult guests and one six-year-old?',
        options: ['$28', '$35', '$21', '$42'],
        answer: [1],
        explanation:
          'Cada adulto invitado paga "$14" y cada niño de 4 a 10 años "$7": 14 + 14 + 7 = $35. La opción $28 olvida al niño y $42 cobra al niño como adulto.',
      },
      {
        id: 'f07-rd-dl-family-brunch-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'Where can guests buy brunch tickets?',
        options: ['Online before the weekend', 'From students with meal plans', 'At the omelet station', "At the cashier's desk"],
        answer: [3],
        explanation:
          'El menú dice "Guest tickets are sold at the cashier\'s desk only". Los estudiantes con plan de comidas pagan con "one meal swipe", pero no venden entradas; la venta en línea no se menciona.',
      },
    ],
  },
  {
    id: 'f07-rd-dl-lease-renewal',
    form: 7,
    section: 'reading',
    task: 'daily-life',
    genre: 'email',
    title: 'Renewing an Apartment Lease',
    topic: 'daily-life',
    difficulty: 'medium',
    header: ['From: Diane Kowalski, Elm Court Apartments', 'To: Marcus Webb', 'Subject: Renewing your lease for next year'],
    text:
      'Hi Marcus,\n\nYour current lease ends on July 31. If you would like to stay, here is how the renewal process works.\n\nFirst, let me know by May 15 whether you plan to renew. After that date, we will begin showing your unit to new applicants. Second, I will send you the new lease by June 1. The monthly rent will go up by $35, but you can keep the current rate by signing a two-year lease instead of a one-year lease. Finally, please sign and return the lease within two weeks of receiving it. Your security deposit will simply carry over, so no new payment is needed.\n\nFeel free to call me if you have any questions.\n\nDiane',
    questions: [
      {
        id: 'f07-rd-dl-lease-renewal-q1',
        kind: 'single',
        skill: 'purpose',
        prompt: 'Why did Diane write to Marcus?',
        options: [
          'To explain the steps for staying in the apartment',
          "To announce that Marcus's rent will rise next month",
          'To ask Marcus to pay a new security deposit',
          'To inform Marcus that his unit has been rented',
        ],
        answer: [0],
        explanation:
          'Diane escribe "here is how the renewal process works" y enumera los pasos (First, Second, Finally). El aumento de $35 solo se aplicaría con el nuevo contrato, no "next month", y el depósito "will simply carry over".',
      },
      {
        id: 'f07-rd-dl-lease-renewal-q2',
        kind: 'single',
        skill: 'inference',
        prompt: 'What will probably happen if Marcus has not replied by May 20?',
        options: [
          'His rent will increase by $35 immediately.',
          'He will have to sign a two-year lease.',
          'Other people may be shown his apartment.',
          'Diane will mail him the new lease early.',
        ],
        answer: [2],
        explanation:
          'El plazo para avisar es el 15 de mayo y "After that date, we will begin showing your unit to new applicants". El contrato de dos años es solo una opción para evitar el aumento, no una consecuencia de responder tarde.',
      },
      {
        id: 'f07-rd-dl-lease-renewal-q3',
        kind: 'single',
        skill: 'detail',
        prompt: 'According to the email, how can Marcus avoid the rent increase?',
        options: [
          'By returning the lease within two weeks',
          'By agreeing to a longer lease term',
          'By replying to Diane before May 15',
          'By paying his security deposit again',
        ],
        answer: [1],
        explanation:
          'El correo dice "you can keep the current rate by signing a two-year lease instead of a one-year lease", es decir, aceptando un contrato más largo. Devolver el contrato en dos semanas es un requisito general, no evita el aumento.',
      },
    ],
  },
  {
    id: 'f07-rd-dl-parking-zones',
    form: 7,
    section: 'reading',
    task: 'daily-life',
    genre: 'notice',
    title: 'New Campus Parking Zones',
    topic: 'campus-life',
    difficulty: 'medium',
    header: ['NOTICE FROM THE CAMPUS PARKING OFFICE', 'New Permit Zones Begin This Fall'],
    text:
      'Starting this semester, campus parking will be divided into three color-coded zones. Blue permits are for residents and allow parking only in the lots next to the residence halls. Green permits are for commuting students and cover the North and Stadium lots. Gold permits are reserved for faculty and staff. Your current permit remains valid until September 14. Beginning Monday, September 15, officers will issue $40 tickets to any vehicle parked outside its assigned zone. Visitors may continue to use the metered spaces near the Welcome Center. To exchange your old permit for a new one at no cost, bring your student ID to the Parking Office in Lane Hall.',
    questions: [
      {
        id: 'f07-rd-dl-parking-zones-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'What is the main purpose of the notice?',
        options: [
          'To announce that parking fines will rise to $40',
          'To explain where visitors are allowed to park',
          'To ask students to apply for faculty permits',
          'To introduce new parking zones and a start date',
        ],
        answer: [3],
        explanation:
          'El aviso presenta "three color-coded zones" y la fecha en que empieza a aplicarse ("Beginning Monday, September 15"). Las multas de $40 y los visitantes son detalles; el texto no dice que las multas "suban".',
      },
      {
        id: 'f07-rd-dl-parking-zones-q2',
        kind: 'single',
        skill: 'inference',
        prompt: 'A commuting student parks in a lot next to a residence hall on September 16. What will most likely happen?',
        options: [
          'The student will be asked to buy a gold permit.',
          'The student may receive a $40 ticket.',
          'Nothing, because old permits are still valid.',
          "The student's car will be moved to the Stadium lot.",
        ],
        answer: [1],
        explanation:
          'Los estudiantes que viajan a diario tienen permisos verdes ("North and Stadium lots"); los lotes junto a las residencias son zona azul. Desde el 15 de septiembre "officers will issue $40 tickets". Los permisos antiguos solo valen "until September 14".',
      },
      {
        id: 'f07-rd-dl-parking-zones-q3',
        kind: 'single',
        skill: 'detail',
        prompt: 'What must students do to get a new permit?',
        options: [
          'Bring their student ID to Lane Hall',
          'Pay a replacement fee at the Welcome Center',
          'Return their old permit by mail',
          'Apply online before September 15',
        ],
        answer: [0],
        explanation:
          'El aviso indica "bring your student ID to the Parking Office in Lane Hall" y que el cambio es "at no cost". El Welcome Center solo se menciona por los parquímetros para visitantes.',
      },
    ],
  },
  {
    id: 'f07-rd-dl-microscope-slots',
    form: 7,
    section: 'reading',
    task: 'daily-life',
    genre: 'text-message',
    title: 'Rebooking a Broken Microscope',
    topic: 'campus-life',
    difficulty: 'hard',
    text:
      "Hana (9:02 a.m.): Hi Daniel, the confocal microscope just shut down in the middle of my session. There's an error code on the screen, and the laser won't restart.\nDaniel (9:10 a.m.): Please don't try to reboot it again. I've called the service technician, but she can't come until Thursday morning.\nHana (9:12 a.m.): That's a problem. My samples have to be imaged within 48 hours of staining, or the signal fades.\nDaniel (9:15 a.m.): Understood. The older microscope in Room 214 is free tomorrow from 1 to 5. It doesn't have the same laser, but it should work fine for your stain.\nHana (9:16 a.m.): I'll take it. What about my Thursday slot?\nDaniel (9:20 a.m.): If the repair is finished by noon, you keep your 2 p.m. slot. If not, I'll push all bookings back one week, starting with Thursday's. I'll email the group once I hear from the technician.",
    questions: [
      {
        id: 'f07-rd-dl-microscope-slots-q1',
        kind: 'single',
        skill: 'detail',
        prompt: 'Why is Hana worried about the delay?',
        options: [
          "She has already paid for the technician's visit.",
          'The older microscope cannot detect her stain.',
          'Her stained samples must be imaged soon.',
          'Her Thursday slot was given to another user.',
        ],
        answer: [2],
        explanation:
          'Hana explica "My samples have to be imaged within 48 hours of staining, or the signal fades". Daniel dice lo contrario de la opción del microscopio antiguo: "it should work fine for your stain".',
      },
      {
        id: 'f07-rd-dl-microscope-slots-q2',
        kind: 'single',
        skill: 'inference',
        prompt: "What will happen to Hana's Thursday booking if the repair is finished at 3 p.m.?",
        options: [
          'Hana will use the microscope at 2 p.m. as planned.',
          'Hana will move her session to Room 214.',
          "Daniel will cancel the technician's visit.",
          'It will be pushed back by one week.',
        ],
        answer: [3],
        explanation:
          'La condición es "If the repair is finished by noon, you keep your 2 p.m. slot. If not, I\'ll push all bookings back one week". Terminar a las 3 p.m. es después del mediodía, así que la reserva se retrasa una semana; la primera opción solo valdría si la reparación terminara antes de las 12.',
      },
      {
        id: 'f07-rd-dl-microscope-slots-q3',
        kind: 'single',
        skill: 'purpose',
        prompt: 'Why does Daniel mention that the older microscope "doesn\'t have the same laser"?',
        options: [
          'To explain why the group rarely books that room',
          "To note a difference that will not affect Hana's work",
          'To suggest that Hana should wait until the repair is done',
          'To warn Hana that her samples could be damaged',
        ],
        answer: [1],
        explanation:
          'Daniel admite la diferencia pero añade "but it should work fine for your stain": señala una limitación que no importa para el trabajo de Hana. No le aconseja esperar; al contrario, le ofrece el otro microscopio para mañana.',
      },
    ],
  },

  // ---------- Read an Academic Passage ----------
  {
    id: 'f07-rd-ap-telegraph',
    form: 7,
    section: 'reading',
    task: 'academic-passage',
    title: 'How the Telegraph Shrank Distance',
    topic: 'technology',
    difficulty: 'easy',
    paragraphs: [
      'Before the nineteenth century, a message could travel only as fast as the person or animal carrying it. A letter sent from New York to New Orleans might take weeks to arrive, and news from Europe crossed the Atlantic by ship. The electric telegraph changed this situation dramatically by sending signals along wires almost instantly.',
      'Several inventors worked on electric telegraphs in the 1830s. In Britain, William Cooke and Charles Wheatstone built a system that used magnetic needles to point at letters. In the United States, Samuel Morse developed a simpler device, and in 1844 he sent the famous message "What hath God wrought" from Washington to Baltimore. Morse\'s system relied on a code of short and long signals, called dots and dashes, which a trained operator could translate into letters.',
      'The telegraph spread rapidly. Lines often ran beside railroad tracks, and railroad companies used them to coordinate train schedules and prevent collisions. Newspapers also benefited, since reporters could send stories from distant cities on the same day the events occurred. In 1866, a durable cable was laid across the floor of the Atlantic Ocean, allowing messages between Europe and North America to arrive in minutes rather than days.',
      'Sending a telegram was not cheap, however, so ordinary people usually reserved it for urgent news, such as a birth or a death. Businesses and governments were its heaviest users. Even so, the telegraph established a basic idea that later technologies, from the telephone to the internet, would build on: information could move separately from people and objects.',
    ],
    questions: [
      {
        id: 'f07-rd-ap-telegraph-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'What is the passage mainly about?',
        options: [
          'The rivalry between British and American inventors',
          'How the telegraph made distant communication fast',
          'Why railroad companies built telegraph lines',
          'The technical design of the Atlantic cable',
        ],
        answer: [1],
        explanation:
          'Todo el texto gira en torno a cómo el telégrafo envió señales "almost instantly" y cambió la comunicación a distancia. Los inventores británicos y estadounidenses aparecen solo en el párrafo 2, sin hablar de rivalidad.',
      },
      {
        id: 'f07-rd-ap-telegraph-q2',
        kind: 'single',
        skill: 'detail',
        paragraph: 1,
        prompt: "According to paragraph 2, what was a feature of Morse's system?",
        options: [
          'It used magnetic needles that pointed at letters.',
          'It was first tested between New York and New Orleans.',
          'It could be operated without any special training.',
          'It represented letters with short and long signals.',
        ],
        answer: [3],
        explanation:
          'El párrafo 2 dice que el sistema de Morse "relied on a code of short and long signals, called dots and dashes". Las agujas magnéticas pertenecen al sistema de Cooke y Wheatstone, y el código lo traducía "a trained operator".',
      },
      {
        id: 'f07-rd-ap-telegraph-q3',
        kind: 'single',
        skill: 'vocabulary',
        paragraph: 2,
        highlight: 'coordinate',
        prompt: 'The word "coordinate" in paragraph 3 is closest in meaning to',
        options: ['organize', 'shorten', 'advertise', 'repair'],
        answer: [0],
        explanation:
          '"Coordinate train schedules" = organizar los horarios para que encajen y evitar choques ("prevent collisions"). "Shorten" (acortar) no tiene relación con evitar colisiones.',
      },
      {
        id: 'f07-rd-ap-telegraph-q4',
        kind: 'single',
        skill: 'inference',
        paragraph: 3,
        prompt: 'What can be inferred from paragraph 4 about ordinary people in the 1800s?',
        options: [
          'They used the telegraph more often than businesses did.',
          'They rarely learned about births or deaths in their families.',
          'They still used slower methods for most everyday messages.',
          'They could not send telegrams without government permission.',
        ],
        answer: [2],
        explanation:
          'Como el telegrama "was not cheap" y la gente lo reservaba "for urgent news", se deduce que para los mensajes cotidianos seguía usando medios más lentos, como las cartas. La primera opción contradice "Businesses and governments were its heaviest users".',
      },
      {
        id: 'f07-rd-ap-telegraph-q5',
        kind: 'single',
        skill: 'purpose',
        paragraph: 2,
        prompt: 'Why does the author mention railroad companies in paragraph 3?',
        options: [
          'To explain why telegrams were so expensive',
          'To show that trains carried most messages before 1844',
          'To contrast the telegraph with the Atlantic cable',
          'To illustrate one practical use of the telegraph',
        ],
        answer: [3],
        explanation:
          'Las compañías ferroviarias usaban las líneas "to coordinate train schedules and prevent collisions": es un ejemplo de uso práctico del telégrafo, igual que el de los periódicos. El precio de los telegramas se trata en el párrafo 4, no aquí.',
      },
    ],
  },
  {
    id: 'f07-rd-ap-seasons',
    form: 7,
    section: 'reading',
    task: 'academic-passage',
    title: 'What Really Causes the Seasons',
    topic: 'astronomy',
    difficulty: 'medium',
    paragraphs: [
      "Many people assume that summer occurs when Earth is closest to the Sun and winter when it is farthest away. This explanation seems logical, but it does not match the evidence. Earth's orbit is nearly circular, and the planet is actually closest to the Sun in early January, during winter in the Northern Hemisphere. Moreover, if distance controlled the seasons, both hemispheres would experience summer at the same time. Instead, when it is summer in Canada, it is winter in Argentina.",
      "The real cause of the seasons is the tilt of Earth's axis. The imaginary line around which Earth spins is tilted about 23.5 degrees relative to the plane of its orbit. Because the axis keeps pointing in the same direction in space as Earth travels around the Sun, each hemisphere leans toward the Sun for part of the year and away from it for another part.",
      'This tilt affects the seasons in two ways. First, it changes the angle at which sunlight strikes the ground. When a hemisphere leans toward the Sun, sunlight arrives more directly, so the same amount of energy is concentrated on a smaller area and heats it more effectively. When the hemisphere leans away, sunlight arrives at a low angle and is spread over a larger area. Second, the tilt changes the length of the day. In summer, the Sun stays above the horizon longer, giving the ground more time to absorb heat, while long winter nights allow more heat to escape.',
      'Seasonal differences are greatest near the poles and smallest near the equator. At high latitudes, summer brings weeks of continuous daylight and winter brings weeks of darkness. Near the equator, by contrast, the Sun is high in the sky all year, and temperatures change relatively little from month to month.',
    ],
    questions: [
      {
        id: 'f07-rd-ap-seasons-q1',
        kind: 'single',
        skill: 'organization',
        prompt: 'How is the passage organized?',
        options: [
          'A common belief is rejected, and the actual cause is then explained.',
          'Two competing theories are described, and both are found partly correct.',
          'A historical discovery is presented in the order in which it occurred.',
          'A problem is identified, and several possible solutions are compared.',
        ],
        answer: [0],
        explanation:
          'El párrafo 1 descarta la idea de que la distancia causa las estaciones ("it does not match the evidence") y el párrafo 2 presenta "The real cause": la inclinación del eje. No se aceptan dos teorías a la vez, así que la segunda opción es incorrecta.',
      },
      {
        id: 'f07-rd-ap-seasons-q2',
        kind: 'single',
        skill: 'detail',
        paragraph: 0,
        prompt: 'According to paragraph 1, which fact shows that distance from the Sun does not cause the seasons?',
        options: [
          "Earth's orbit is a long and narrow oval.",
          'Earth is farthest from the Sun in January.',
          'The hemispheres experience opposite seasons.',
          'Summer lasts longer in Canada than in Argentina.',
        ],
        answer: [2],
        explanation:
          'El texto argumenta que, si la distancia controlara las estaciones, "both hemispheres would experience summer at the same time"; en cambio, "when it is summer in Canada, it is winter in Argentina". En enero la Tierra está más cerca ("closest"), no más lejos, y la órbita es "nearly circular".',
      },
      {
        id: 'f07-rd-ap-seasons-q3',
        kind: 'single',
        skill: 'vocabulary',
        paragraph: 2,
        highlight: 'concentrated',
        prompt: 'The word "concentrated" in paragraph 3 is closest in meaning to',
        options: ['reflected', 'reduced', 'delayed', 'focused'],
        answer: [3],
        explanation:
          '"Concentrated on a smaller area" = la energía se enfoca o reúne en una superficie menor ("focused"). No se reduce la energía: el texto dice "the same amount of energy".',
      },
      {
        id: 'f07-rd-ap-seasons-q4',
        kind: 'single',
        skill: 'inference',
        paragraph: 3,
        prompt: 'What can be inferred from paragraph 4 about the number of daylight hours near the equator?',
        options: [
          'It is greatest in early January.',
          'It changes relatively little during the year.',
          'It is always lower than at high latitudes.',
          "It depends mainly on Earth's distance from the Sun.",
        ],
        answer: [1],
        explanation:
          'El párrafo 4 contrasta ("by contrast") las semanas de luz y oscuridad continuas de las latitudes altas con el ecuador, donde el Sol está alto "all year" y las diferencias estacionales son "smallest"; se deduce que la duración del día cambia poco. La última opción repite la creencia que el texto rechaza.',
      },
      {
        id: 'f07-rd-ap-seasons-q5',
        kind: 'single',
        skill: 'negative-factual',
        paragraph: 2,
        prompt: 'According to paragraph 3, all of the following help explain why summer is warmer EXCEPT',
        options: [
          'Earth moves faster in its orbit during summer.',
          'Sunlight strikes the ground more directly.',
          'The Sun stays above the horizon for a longer time.',
          'Solar energy falls on a smaller area.',
        ],
        answer: [0],
        explanation:
          'El párrafo 3 menciona la luz más directa ("arrives more directly"), la energía concentrada "on a smaller area" y los días más largos ("stays above the horizon longer"). La velocidad orbital de la Tierra no se menciona.',
      },
    ],
  },
  {
    id: 'f07-rd-ap-pidgins-creoles',
    form: 7,
    section: 'reading',
    task: 'academic-passage',
    title: 'From Pidgin to Creole',
    topic: 'linguistics',
    difficulty: 'hard',
    paragraphs: [
      "When groups of people who share no common language are brought into sustained contact, they often develop a simplified means of communication known as a pidgin. Pidgins have typically arisen in settings such as trading ports, plantations, and colonial labor camps, where speakers needed to cooperate but had little opportunity or reason to master one another's languages. Crucially, a pidgin is no one's native language; it is a contact language used for limited purposes, such as bargaining or giving instructions.",
      'Most pidgins draw the bulk of their vocabulary from one dominant language, usually that of the group holding economic or political power, which linguists call the lexifier. Their grammar, however, is greatly reduced. Pidgins tend to lack inflections such as verb endings for tense or plural markers on nouns, and they rely instead on word order and separate words to convey these meanings. Vocabulary is also limited, so a single word may cover a broad range of meanings, and speakers frequently combine words into descriptive phrases to express concepts for which there is no dedicated term.',
      "A dramatic change occurs when children grow up in a community where a pidgin is the main shared language. These children acquire the pidgin as their first language and, in doing so, expand it into a fully developed language called a creole. Creoles possess consistent rules for marking tense, aspect, and mood, as well as complex sentence structures such as relative clauses. Some researchers, most notably the linguist Derek Bickerton, have argued that the striking grammatical similarities among creoles that developed independently reflect an innate human capacity for language. Others maintain that these similarities can be explained by features carried over from the speakers' original languages.",
      'Creoles are therefore not broken or inferior versions of their lexifiers, though they have frequently been stigmatized as such. Haitian Creole, whose vocabulary is largely derived from French, and Tok Pisin, an English-based language of Papua New Guinea, are spoken by millions of people and are used in newspapers, radio broadcasts, and, in some cases, government. Tok Pisin is especially interesting because it illustrates the gradual transition from pidgin to creole: it began as a contact language but now has many native speakers.',
    ],
    questions: [
      {
        id: 'f07-rd-ap-pidgins-creoles-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'Which of the following best expresses the main idea of the passage?',
        options: [
          'Pidgins are temporary languages that usually disappear once trade ends.',
          'Creoles borrow nearly all of their grammar from one dominant language.',
          'Linguists now agree that creole grammar comes from an innate capacity.',
          'Simplified contact languages can develop into full languages.',
        ],
        answer: [3],
        explanation:
          'El pasaje describe el pidgin como sistema simplificado y explica cómo se convierte en "a fully developed language called a creole". La tercera opción es falsa porque el texto presenta un debate ("Some researchers… Others maintain…"), no un acuerdo.',
      },
      {
        id: 'f07-rd-ap-pidgins-creoles-q2',
        kind: 'single',
        skill: 'detail',
        paragraph: 1,
        prompt: 'According to paragraph 2, how do pidgins typically express meanings such as tense?',
        options: [
          'By adding endings borrowed from the lexifier',
          'By using word order and separate words',
          'By changing the stress pattern of verbs',
          'By inventing a new term for each meaning',
        ],
        answer: [1],
        explanation:
          'El párrafo 2 dice que los pidgins carecen de flexiones y "rely instead on word order and separate words to convey these meanings". La primera opción contradice que "tend to lack inflections such as verb endings".',
      },
      {
        id: 'f07-rd-ap-pidgins-creoles-q3',
        kind: 'single',
        skill: 'vocabulary',
        paragraph: 3,
        highlight: 'stigmatized',
        prompt: 'The word "stigmatized" in paragraph 4 is closest in meaning to',
        options: ['translated', 'standardized', 'viewed negatively', 'officially recognized'],
        answer: [2],
        explanation:
          '"Stigmatized as such" = considerados de forma negativa, como versiones "broken or inferior". "Standardized" (normalizado) no encaja con la idea de desprecio que transmite la frase.',
      },
      {
        id: 'f07-rd-ap-pidgins-creoles-q4',
        kind: 'single',
        skill: 'inference',
        paragraph: 2,
        prompt: 'What can be inferred from paragraph 3 about a pidgin that is spoken only by adults who learned it later in life?',
        options: [
          'It has not yet become a creole.',
          'It has developed relative clauses.',
          'It has replaced its speakers’ native languages.',
          'It has more inflections than its lexifier.',
        ],
        answer: [0],
        explanation:
          'Según el párrafo 3, el criollo surge cuando los niños "acquire the pidgin as their first language". Si solo lo hablan adultos que lo aprendieron después, todavía no es un criollo. Las cláusulas relativas son rasgo de los criollos, no de los pidgins.',
      },
      {
        id: 'f07-rd-ap-pidgins-creoles-q5',
        kind: 'single',
        skill: 'purpose',
        paragraph: 3,
        prompt: 'Why does the author mention that Tok Pisin "now has many native speakers"?',
        options: [
          'To show that most creoles are based on English',
          'To explain why creoles are often stigmatized',
          'To illustrate how a pidgin can become a creole',
          'To contrast Tok Pisin with Haitian Creole',
        ],
        answer: [2],
        explanation:
          'El autor dice que Tok Pisin "illustrates the gradual transition from pidgin to creole": empezó como lengua de contacto y ahora tiene hablantes nativos. No se afirma que la mayoría de los criollos se basen en el inglés; Haitian Creole, de hecho, procede del francés.',
      },
    ],
  },
  {
    id: 'f07-rd-ap-endosymbiosis',
    form: 7,
    section: 'reading',
    task: 'academic-passage',
    title: 'Organelles That Were Once Bacteria',
    topic: 'biology',
    difficulty: 'hard',
    paragraphs: [
      'Eukaryotic cells, which make up plants, animals, and fungi, contain specialized internal compartments called organelles. Two of these, mitochondria and chloroplasts, stand out because they appear to have originated as independent organisms. According to the endosymbiotic theory, more than a billion years ago an ancestral cell engulfed free-living bacteria but, instead of digesting the bacteria, allowed them to survive inside it. Over many generations, host and guest became so interdependent that neither could live without the other.',
      'Although versions of this idea were proposed in the early twentieth century, it was largely dismissed until the American biologist Lynn Margulis championed it in the late 1960s. Her proposal met considerable resistance, since it challenged the prevailing view that evolution proceeds mainly through the gradual accumulation of small genetic changes. Over the following decades, however, a growing body of evidence persuaded most biologists that the theory was correct.',
      "Several lines of evidence support the endosymbiotic origin of these organelles. Both mitochondria and chloroplasts are enclosed by two membranes, consistent with a bacterium that was wrapped in a membrane of the host cell when it was engulfed. Each contains its own small, circular DNA molecule, resembling the chromosomes of bacteria rather than the linear chromosomes in the cell's nucleus. Moreover, they reproduce by splitting in two, much as bacteria do, and their ribosomes, the structures that build proteins, are similar in size and structure to bacterial ribosomes. Genetic comparisons have further revealed that mitochondria are most closely related to a group called alphaproteobacteria, whereas chloroplasts descend from cyanobacteria.",
      "The relationship has nonetheless changed dramatically since it began. Over time, most of the genes originally carried by the bacteria were lost or transferred to the host's nucleus, which is why mitochondria and chloroplasts can no longer survive on their own. Because the engulfment of the ancestor of mitochondria appears to have occurred before that of chloroplasts, nearly all eukaryotes possess mitochondria, while only plants and algae contain chloroplasts.",
    ],
    questions: [
      {
        id: 'f07-rd-ap-endosymbiosis-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'What is the passage mainly about?',
        options: [
          'How Lynn Margulis discovered mitochondria and chloroplasts',
          'Why eukaryotic cells digest most of the bacteria they engulf',
          'The theory that two organelles began as free-living bacteria',
          'The main differences between plant cells and animal cells',
        ],
        answer: [2],
        explanation:
          'El pasaje explica la teoría endosimbiótica: mitocondrias y cloroplastos "appear to have originated as independent organisms", y presenta su historia, sus pruebas y sus consecuencias. Margulis no descubrió los orgánulos; defendió ("championed") la teoría.',
      },
      {
        id: 'f07-rd-ap-endosymbiosis-q2',
        kind: 'single',
        skill: 'detail',
        paragraph: 2,
        prompt: "According to paragraph 3, how does the DNA of mitochondria and chloroplasts differ from the DNA in the cell's nucleus?",
        options: [
          'It is circular, like the DNA of bacteria.',
          'It is enclosed by two separate membranes.',
          'It contains more genes than nuclear DNA.',
          'It is copied only when the cell divides.',
        ],
        answer: [0],
        explanation:
          'El texto dice que cada orgánulo tiene "its own small, circular DNA molecule, resembling the chromosomes of bacteria rather than the linear chromosomes in the cell\'s nucleus". Las dos membranas rodean al orgánulo, no a su ADN.',
      },
      {
        id: 'f07-rd-ap-endosymbiosis-q3',
        kind: 'single',
        skill: 'reference',
        paragraph: 2,
        highlight: 'Each',
        prompt: 'The word "Each" in paragraph 3 refers to each',
        options: ['line of evidence', 'organelle', 'membrane', 'bacterium'],
        answer: [1],
        explanation:
          '"Each contains its own small, circular DNA molecule" se refiere a cada uno de los orgánulos mencionados en la frase anterior ("mitochondria and chloroplasts"). "Bacterium" es tentador porque aparece justo antes, pero allí describe el origen de las membranas.',
      },
      {
        id: 'f07-rd-ap-endosymbiosis-q4',
        kind: 'single',
        skill: 'vocabulary',
        paragraph: 1,
        highlight: 'championed',
        prompt: 'The word "championed" in paragraph 2 is closest in meaning to',
        options: ['questioned', 'translated', 'rejected', 'promoted'],
        answer: [3],
        explanation:
          '"Championed" = defendió y promovió activamente una idea. La teoría estaba "largely dismissed" hasta que Margulis la impulsó; "rejected" expresa lo contrario.',
      },
      {
        id: 'f07-rd-ap-endosymbiosis-q5',
        kind: 'single',
        skill: 'inference',
        paragraph: 3,
        prompt: 'What can be inferred from paragraph 4 about the cell that first acquired the ancestor of chloroplasts?',
        options: [
          'It lacked a nucleus of its own.',
          'It already contained mitochondria.',
          'It was later engulfed by a cyanobacterium.',
          'It could survive without any organelles.',
        ],
        answer: [1],
        explanation:
          'El párrafo 4 dice que la incorporación del antepasado de las mitocondrias ocurrió "before that of chloroplasts", así que esa célula ya tenía mitocondrias. Fue la célula la que engulló a la cianobacteria, no al revés.',
      },
    ],
  },
];
