import type { ReadingSet } from '../../../types';

/** Simulación n.º 4 — Reading (contenido original). */
export const sets: ReadingSet[] = [
  // ---------- Complete the Words ----------
  {
    id: 'f04-rd-cw-qr-codes',
    form: 4,
    section: 'reading',
    task: 'complete-words',
    title: 'How QR Codes Store Data',
    topic: 'technology',
    difficulty: 'easy',
    text:
      'A QR code is a square pattern that stores information in a grid of black and white cells. Each {{ce|ll}} represents {{o|ne}} bit {{o|f}} data, {{a|nd}} the {{cam|era}} of {{a|ny}} phone {{c|an}} turn {{t|he}} whole {{pat|tern}} back {{in|to}} text or links. Three large squares in the corners show the camera where the code is and which way it is turned. Some cells also repeat part of the message, so a code that is dirty or scratched can often still be read.',
    note: 'La primera frase ya presenta "cells", así que "Each ce__" solo puede ser "cell". Fíjate en las palabras funcionales (one, of, and, any, can, the, into): son las más frecuentes en esta tarea.',
  },
  {
    id: 'f04-rd-cw-eclipses',
    form: 4,
    section: 'reading',
    task: 'complete-words',
    title: 'Why Eclipses Happen',
    topic: 'astronomy',
    difficulty: 'medium',
    text:
      'An eclipse occurs when one object in space blocks the light that normally reaches another. Solar {{ecli|pses}} take {{pl|ace}} when {{t|he}} Moon {{tra|vels}} between {{t|he}} Sun {{a|nd}} Earth, {{s|o}} its {{sha|dow}} sweeps {{acr|oss}} part {{o|f}} our planet. A lunar eclipse is the reverse: Earth lies between the Sun and the Moon, and Earth\'s shadow darkens the full Moon. Eclipses do not happen every month because the Moon\'s orbit is tilted about five degrees relative to Earth\'s orbit, so the three bodies rarely line up exactly.',
    note: '"Take place" es una colocación fija (= ocurrir). Tras "the Moon" hace falta un verbo en tercera persona con -s (travels) y "sweeps acr___ part" pide la preposición "across".',
  },
  {
    id: 'f04-rd-cw-vowel-shift',
    form: 4,
    section: 'reading',
    task: 'complete-words',
    title: 'The Great Vowel Shift',
    topic: 'linguistics',
    difficulty: 'hard',
    text:
      'Modern English spelling often seems illogical because it reflects how words were pronounced several centuries ago. Beginning {{aro|und}} 1400, {{spea|kers}} gradually {{rai|sed}} the {{lo|ng}} vowels, {{prono|uncing}} them {{hig|her}} in {{t|he}} mouth; {{mean|while}}, the {{hig|hest}} vowels {{tur|ned}} into diphthongs. For example, the vowel in "bite" was once pronounced like the vowel in modern "beet", and "house" sounded much like "hoose". Because spelling was becoming standardized at the same time, partly through printing, the written forms largely stayed the same, leaving a lasting mismatch between letters and sounds.',
    note: 'Usa la morfología: tras la coma, un participio en -ing (pronouncing); tras "the", un superlativo en -est (highest); "raised… higher" mantiene la idea de subir. "Meanwhile" introduce un cambio simultáneo.',
  },

  // ---------- Read in Daily Life ----------
  {
    id: 'f04-rd-dl-food-truck',
    form: 4,
    section: 'reading',
    task: 'daily-life',
    genre: 'menu',
    title: 'Rolling Fire Lunch Menu',
    topic: 'daily-life',
    difficulty: 'easy',
    header: ['ROLLING FIRE KITCHEN — Weekday Lunch, 11 a.m. to 3 p.m.'],
    text:
      'MAINS\nChicken Rice Bowl — $9\nGrilled Veggie Wrap — $8\nSpicy Lamb Wrap — $9\nBeef Noodle Bowl — $10\n\nCOMBO DEALS\nMake any main a combo: add fries and a drink for $3.\nWrap Duo: any two wraps for $14 (Tuesdays and Thursdays only).\n\nSPICE LEVELS\nChoose 1 (Mild), 2 (Medium) or 3 (Fire) for any main.\nLevel 3 is made with fresh ghost peppers and cannot be made milder once it is cooked.\nFree glass of milk for anyone brave enough to finish a Level 3 bowl!',
    questions: [
      {
        id: 'f04-rd-dl-food-truck-q1',
        kind: 'single',
        skill: 'detail',
        prompt: 'How much does a Beef Noodle Bowl cost as a combo?',
        options: ['$10', '$13', '$14', '$12'],
        answer: [1],
        explanation:
          'El bol cuesta "$10" y el combo añade patatas y bebida "for $3": 10 + 3 = 13 dólares. La opción de 14 dólares es el precio de "Wrap Duo", que no tiene relación con el bol.',
      },
      {
        id: 'f04-rd-dl-food-truck-q2',
        kind: 'single',
        skill: 'inference',
        prompt: 'What can be inferred about spice level 3?',
        options: [
          'It costs more than the other spice levels.',
          'It is offered only on Tuesdays and Thursdays.',
          'Many customers probably find it extremely hot.',
          'It can be made milder after the food is cooked.',
        ],
        answer: [2],
        explanation:
          'El menú regala leche a quien sea "brave enough to finish a Level 3 bowl" y menciona "fresh ghost peppers": se deduce que es muy picante. La última opción contradice "cannot be made milder once it is cooked"; los martes y jueves solo se refieren al "Wrap Duo".',
      },
    ],
  },
  {
    id: 'f04-rd-dl-hiking-club',
    form: 4,
    section: 'reading',
    task: 'daily-life',
    genre: 'email',
    title: 'Hiking Club Welcome Email',
    topic: 'campus-life',
    difficulty: 'easy',
    header: ['From: Maya Torres, President, Ridgeline Hiking Club', 'To: New Members', 'Subject: Welcome and our first meeting'],
    text:
      'Hi everyone,\n\nWelcome to the Ridgeline Hiking Club! We\'re thrilled to have 23 new members this semester. Our first meeting will be on Wednesday, September 10, at 6:30 p.m. in Room 112 of the Student Union. We\'ll introduce the club officers, share the fall hiking calendar, and explain how to sign up for trips. You don\'t need any equipment yet, but please bring a water bottle, because we\'ll be testing a few filters from our gear library. Pizza will be provided, so let me know by Monday if you have any food allergies.\n\nSee you there,\nMaya',
    questions: [
      {
        id: 'f04-rd-dl-hiking-club-q1',
        kind: 'single',
        skill: 'detail',
        prompt: 'What does Maya ask new members to do by Monday?',
        options: [
          'Tell her about any food allergies',
          'Sign up for the first fall trip',
          'Borrow a filter from the gear library',
          'Buy the equipment needed for hiking',
        ],
        answer: [0],
        explanation:
          'Maya escribe: "let me know by Monday if you have any food allergies", porque habrá pizza. La inscripción en excursiones se explicará en la reunión ("explain how to sign up for trips"), no hay que hacerla antes.',
      },
      {
        id: 'f04-rd-dl-hiking-club-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'What will happen at the first meeting?',
        options: [
          'New club officers will be elected.',
          'Members will go on a short hike.',
          'Used equipment will be sold to members.',
          'Members will see the plan for fall hikes.',
        ],
        answer: [3],
        explanation:
          'En la reunión van a "share the fall hiking calendar", es decir, mostrar el plan de excursiones de otoño. Los responsables del club solo se presentarán ("introduce the club officers"); no se dice que haya elecciones.',
      },
    ],
  },
  {
    id: 'f04-rd-dl-3d-printers',
    form: 4,
    section: 'reading',
    task: 'daily-life',
    genre: 'notice',
    title: '3D Printer Safety Requirement',
    topic: 'campus-life',
    difficulty: 'medium',
    header: ['NOTICE — Hartwell Engineering Library', 'New Requirement for 3D Printer Use'],
    text:
      'Starting Monday, February 2, all users of the library\'s 3D printers must hold a valid Safety Training Certificate. The certificate is earned by completing a 45-minute online module and a short hands-on session with a lab assistant. Hands-on sessions run every Tuesday and Friday at 4 p.m. in Room B14; each session is limited to eight participants, so register in advance through the library website. Certificates remain valid for one academic year. Print jobs already in the queue on February 2 will be completed, but new jobs from users without a certificate will be cancelled automatically. Students who completed the Makerspace orientation last semester are exempt from the online module but must still attend a hands-on session.',
    questions: [
      {
        id: 'f04-rd-dl-3d-printers-q1',
        kind: 'single',
        skill: 'purpose',
        prompt: 'What is the main purpose of the notice?',
        options: [
          'To advertise a new orientation at the Makerspace',
          'To explain how to repair the library\'s 3D printers',
          'To announce a new condition for using the printers',
          'To invite students to work as lab assistants',
        ],
        answer: [2],
        explanation:
          'El aviso empieza con "all users of the library\'s 3D printers must hold a valid Safety Training Certificate": anuncia un requisito nuevo. La orientación del Makerspace solo aparece como excepción al final; no se anuncia una nueva.',
      },
      {
        id: 'f04-rd-dl-3d-printers-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'What must a student who completed the Makerspace orientation last semester do?',
        options: [
          'Attend a hands-on session',
          'Complete only the online module',
          'Repeat the Makerspace orientation',
          'Nothing, since the student is fully exempt',
        ],
        answer: [0],
        explanation:
          'Estos estudiantes "are exempt from the online module but must still attend a hands-on session". La última opción es la trampa: la exención solo cubre el módulo en línea, no todo el requisito.',
      },
      {
        id: 'f04-rd-dl-3d-printers-q3',
        kind: 'single',
        skill: 'inference',
        prompt: 'What is suggested about the hands-on sessions?',
        options: [
          'They can also be completed online at home.',
          'They last about 45 minutes from start to end.',
          'They take place every weekday in the afternoon.',
          'They may fill up before some students register.',
        ],
        answer: [3],
        explanation:
          'Cada sesión "is limited to eight participants, so register in advance": se deduce que las plazas pueden agotarse. Los "45 minutes" corresponden al módulo en línea, no a la sesión práctica, que solo se ofrece martes y viernes.',
      },
    ],
  },
  {
    id: 'f04-rd-dl-birthday-dinner',
    form: 4,
    section: 'reading',
    task: 'daily-life',
    genre: 'text-message',
    title: 'Surprise Birthday Dinner Change',
    topic: 'daily-life',
    difficulty: 'medium',
    header: ['Group chat: Mom\'s Birthday Plan'],
    text:
      'Nina (9:02 a.m.): Bad news. Lucca\'s called. Their kitchen flooded, so they\'re closed all weekend and our 7:00 table on Saturday is cancelled.\nOwen (9:05 a.m.): Seriously? Mom has been talking about their lasagna for weeks. Any chance they reopen by Saturday?\nNina (9:06 a.m.): They said Tuesday at the earliest.\nOwen (9:10 a.m.): OK. What about Harbor Grill? It\'s close to her place, and she liked it last year.\nNina (9:12 a.m.): I checked. They only have a table at 8:30. That\'s too late for Grandpa.\nOwen (9:14 a.m.): Then let\'s try Rosa\'s Trattoria at 6:45. I\'ll call them now. Can you text Aunt Julia the new plan? Just don\'t post it in the family group. Mom reads that one!\nNina (9:15 a.m.): Ha, good point. On it.',
    questions: [
      {
        id: 'f04-rd-dl-birthday-dinner-q1',
        kind: 'single',
        skill: 'detail',
        prompt: 'Why do Nina and Owen need to change their plans?',
        options: [
          'Their mother already has plans on Saturday.',
          'The first restaurant must close because of damage.',
          'Harbor Grill is too far from their mother\'s home.',
          'Their reservation was made for the wrong day.',
        ],
        answer: [1],
        explanation:
          'Nina explica: "Their kitchen flooded, so they\'re closed all weekend". Harbor Grill, al contrario, está "close to her place"; el problema de ese restaurante es la hora, no la distancia.',
      },
      {
        id: 'f04-rd-dl-birthday-dinner-q2',
        kind: 'single',
        skill: 'inference',
        prompt: 'Why does Owen ask Nina not to post the new plan in the family group?',
        options: [
          'Aunt Julia is not a member of that group.',
          'Rosa\'s Trattoria has not confirmed the table yet.',
          'Their grandfather prefers to receive phone calls.',
          'Their mother might read it and discover the secret.',
        ],
        answer: [3],
        explanation:
          'Owen dice "Mom reads that one!": si la madre ve el mensaje, la cena dejaría de ser sorpresa. Es cierto que Owen todavía tiene que llamar a Rosa\'s ("I\'ll call them now"), pero no es la razón que da para evitar el grupo familiar.',
      },
      {
        id: 'f04-rd-dl-birthday-dinner-q3',
        kind: 'single',
        skill: 'inference',
        prompt: 'Why did the siblings most likely decide against Harbor Grill?',
        options: [
          'Its only free table was too late for one of the guests.',
          'Their mother did not enjoy it the last time she went.',
          'It will be closed until Tuesday because of a flood.',
          'It does not accept reservations for large groups.',
        ],
        answer: [0],
        explanation:
          'Nina dice que solo hay mesa "at 8:30" y que "That\'s too late for Grandpa". El cierre hasta el martes corresponde a Lucca\'s, no a Harbor Grill, y a la madre sí le gustó ("she liked it last year").',
      },
    ],
  },
  {
    id: 'f04-rd-dl-ferry-timetable',
    form: 4,
    section: 'reading',
    task: 'daily-life',
    genre: 'schedule',
    title: 'Gull Island Ferry Timetable',
    topic: 'daily-life',
    difficulty: 'hard',
    header: ['Island Link Ferries — Port Avery ↔ Gull Island'],
    text:
      'SUMMER (June 1 – September 15)\nFrom Port Avery: 7:00, 9:30, 12:00, 15:00, 18:30\nFrom Gull Island: 8:15, 10:45, 13:30, 16:15, 20:00\nThe 7:00 sailing does not run on Sundays.\n\nWINTER (September 16 – May 31)\nFrom Port Avery: 8:00, 13:00, 17:00\nFrom Gull Island: 9:15, 14:30, 18:15\n\nWEATHER: Sailings are cancelled when winds exceed 40 knots. Notices are posted online at least 90 minutes before departure whenever possible. Passengers on a cancelled sailing may take the next available departure at no extra cost.\n\nVEHICLES: Reservations are required in summer and recommended in winter. Vehicles must check in 30 minutes before departure; unclaimed spaces are given to standby vehicles 15 minutes before departure. Reservations can be changed free of charge up to 24 hours in advance; later changes cost $15. Foot passengers and bicycles do not need reservations.',
    questions: [
      {
        id: 'f04-rd-dl-ferry-timetable-q1',
        kind: 'single',
        skill: 'inference',
        prompt: 'A driver with a summer reservation decides, three hours before her sailing, to switch to a later one on the same day. What will happen?',
        options: [
          'The change will be free because it is on the same day.',
          'She will have to wait in the standby line for a space.',
          'She will be charged $15 to make the change.',
          'She will not be allowed to change the reservation.',
        ],
        answer: [2],
        explanation:
          'Los cambios son gratis solo "up to 24 hours in advance"; después, "later changes cost $15". Tres horas antes ya no es gratis, pero el cambio sí está permitido, por eso la última opción es incorrecta.',
      },
      {
        id: 'f04-rd-dl-ferry-timetable-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'What happens to passengers whose sailing is cancelled because of strong winds?',
        options: [
          'They receive an automatic refund by email.',
          'They may board the next available ferry for free.',
          'They must pay $15 to move to a different sailing.',
          'They have to rebook online at least 90 minutes in advance.',
        ],
        answer: [1],
        explanation:
          'El horario indica: "Passengers on a cancelled sailing may take the next available departure at no extra cost". Los "90 minutes" se refieren al aviso de cancelación publicado en línea, no a un plazo para el pasajero, y los $15 son para cambios de reserva tardíos.',
      },
      {
        id: 'f04-rd-dl-ferry-timetable-q3',
        kind: 'single',
        skill: 'inference',
        prompt: 'What is the earliest departure a traveler can take from Port Avery on a Sunday in July?',
        options: ['9:30', '7:00', '8:00', '12:00'],
        answer: [0],
        explanation:
          'Julio está en el horario de verano, cuya primera salida es a las 7:00, pero "The 7:00 sailing does not run on Sundays"; por tanto, la primera es la de las 9:30. Las 8:00 pertenecen al horario de invierno.',
      },
    ],
  },

  // ---------- Read an Academic Passage ----------
  {
    id: 'f04-rd-ap-salmon',
    form: 4,
    section: 'reading',
    task: 'academic-passage',
    title: 'How Salmon Find Their Way Home',
    topic: 'biology',
    difficulty: 'easy',
    paragraphs: [
      'Pacific salmon have one of the most remarkable life cycles in the animal world. They hatch in small freshwater streams, travel downstream to the ocean as young fish, and spend one to several years feeding and growing at sea, sometimes thousands of kilometers from where they were born. Then, when they are ready to reproduce, most of them return to the very stream in which they hatched. Scientists have long wondered how the fish manage such an accurate journey.',
      'In the open ocean, salmon appear to rely mainly on Earth\'s magnetic field. Experiments with young salmon have shown that they respond to magnetic conditions like those found at different places along their migration route. This suggests that the fish carry a kind of internal map that tells them roughly where they are and which direction will take them back toward the river they left.',
      'Once salmon reach the coast, smell takes over. While they were young, the fish memorized the chemical "signature" of their home stream, which comes from the soil, plants, and minerals in its water. As adults, they swim upstream and choose the correct branch at each fork by following this familiar scent. In classic experiments, salmon whose sense of smell was blocked were much less likely to find their home stream.',
      'This homing ability has an important benefit. A stream where a salmon successfully hatched has already proven to be a good place for eggs to survive. Still, a small number of salmon stray to other streams, which allows the species to colonize new habitats when conditions change.',
    ],
    questions: [
      {
        id: 'f04-rd-ap-salmon-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'What is the passage mainly about?',
        options: [
          'Why salmon die soon after they reproduce in streams',
          'How salmon return to the streams where they hatched',
          'How young salmon survive their years in the ocean',
          'Why some salmon leave their home rivers for new ones',
        ],
        answer: [1],
        explanation:
          'Todo el texto explica cómo los salmones regresan "to the very stream in which they hatched": primero con el campo magnético y luego con el olfato. La colonización de nuevos ríos es solo un detalle del último párrafo.',
      },
      {
        id: 'f04-rd-ap-salmon-q2',
        kind: 'single',
        skill: 'detail',
        paragraph: 1,
        prompt: 'According to paragraph 2, what helps salmon find their way in the open ocean?',
        options: [
          'The smell of plants along the coast',
          'The direction of ocean currents',
          'Memories of minerals in their stream',
          'Information from Earth\'s magnetic field',
        ],
        answer: [3],
        explanation:
          'El párrafo 2 dice que en mar abierto "salmon appear to rely mainly on Earth\'s magnetic field". El olor de los minerales del río es lo que usan después, "Once salmon reach the coast" (párrafo 3).',
      },
      {
        id: 'f04-rd-ap-salmon-q3',
        kind: 'single',
        skill: 'vocabulary',
        paragraph: 1,
        highlight: 'rely',
        prompt: 'The word "rely" in paragraph 2 is closest in meaning to',
        options: ['depend', 'comment', 'wait', 'focus'],
        answer: [0],
        explanation:
          '"Rely on" significa depender de algo o confiar en ello: los salmones "depend on" el campo magnético para orientarse. "Focus on" (concentrarse en) no expresa esa dependencia.',
      },
      {
        id: 'f04-rd-ap-salmon-q4',
        kind: 'single',
        skill: 'inference',
        paragraph: 2,
        prompt: 'What can be inferred from paragraph 3 about the scent of a stream?',
        options: [
          'It is the same in all branches of a river.',
          'It is first learned when salmon are adults.',
          'It differs from one stream to another.',
          'It gets stronger as salmon move toward the ocean.',
        ],
        answer: [2],
        explanation:
          'Si los salmones eligen "the correct branch at each fork" siguiendo el olor y cada río tiene su propia "signature" (que viene del suelo, las plantas y los minerales), se deduce que el olor varía de un río a otro. El texto dice que lo memorizan "While they were young", no de adultos.',
      },
      {
        id: 'f04-rd-ap-salmon-q5',
        kind: 'single',
        skill: 'purpose',
        paragraph: 3,
        prompt: 'Why does the author mention salmon that "stray to other streams" in paragraph 4?',
        options: [
          'To show that the magnetic map is often wrong',
          'To explain why many salmon eggs do not survive',
          'To point out an advantage of imperfect homing',
          'To argue that salmon rarely return home',
        ],
        answer: [2],
        explanation:
          'El autor señala que este desvío "allows the species to colonize new habitats when conditions change": que unos pocos se desvíen es una ventaja. No contradice el regreso general, ya que se trata de "a small number of salmon".',
      },
    ],
  },
  {
    id: 'f04-rd-ap-hanseatic',
    form: 4,
    section: 'reading',
    task: 'academic-passage',
    title: 'The Hanseatic Trade Network',
    topic: 'history',
    difficulty: 'medium',
    paragraphs: [
      'Between the thirteenth and fifteenth centuries, much of the trade in northern Europe was controlled by the Hanseatic League, an association of merchant groups and trading towns centered on the Baltic and North Seas. The league began not as a political state but as a practical arrangement. Merchants traveling far from home faced pirates, bandits, and unfriendly local rulers, and they found that they were safer and more powerful when they cooperated.',
      'At its height, the league linked nearly two hundred towns, with Lübeck in northern Germany serving as its leading city. Member towns agreed to protect one another\'s merchants, follow shared commercial rules, and settle disputes among themselves. Representatives met occasionally in an assembly called the Diet, usually in Lübeck, but many decisions were left to individual towns. This loose structure allowed the league to act together when necessary without creating a central government.',
      'The league also established permanent trading posts, known as kontors, in major foreign cities such as London, Bruges, Bergen, and Novgorod. These posts gave Hanseatic merchants warehouses, lodging, and special legal privileges, including exemption from certain local taxes. Through this network, goods flowed between regions with very different resources: furs and wax from Russia, dried fish from Norway, grain from the Baltic lands, and cloth from Flanders and England.',
      'The league\'s power rested on its ability to act collectively. When a foreign ruler threatened its privileges, the members could refuse to trade with that country, and in 1370 they forced Denmark to accept a favorable peace treaty after a war. However, the rise of strong territorial states, new Atlantic trade routes, and competition from Dutch and English merchants gradually weakened the league, and its last assembly met in 1669.',
    ],
    questions: [
      {
        id: 'f04-rd-ap-hanseatic-q1',
        kind: 'single',
        skill: 'organization',
        prompt: 'Which of the following best describes the organization of the passage?',
        options: [
          'It compares the league with Dutch and English trading companies.',
          'It describes a series of wars between northern European cities.',
          'It explains how a trade network formed, operated, and declined.',
          'It argues that the league should be seen as a true political state.',
        ],
        answer: [2],
        explanation:
          'El texto sigue un orden cronológico: el origen (párrafo 1), la organización y las rutas comerciales (párrafos 2 y 3) y el declive ("gradually weakened the league", párrafo 4). Los comerciantes holandeses e ingleses solo se mencionan como una causa del declive, no como objeto de comparación.',
      },
      {
        id: 'f04-rd-ap-hanseatic-q2',
        kind: 'single',
        skill: 'detail',
        paragraph: 2,
        prompt: 'According to paragraph 3, what did the kontors provide to Hanseatic merchants?',
        options: [
          'Storage space, housing, and legal advantages abroad',
          'Ships and crews for long voyages to Russia',
          'Soldiers to defend foreign cities from pirates',
          'The right to collect taxes from local traders',
        ],
        answer: [0],
        explanation:
          'Los kontors daban "warehouses, lodging, and special legal privileges". La última opción distorsiona el texto: los mercaderes estaban exentos de algunos impuestos ("exemption from certain local taxes"), pero no los cobraban.',
      },
      {
        id: 'f04-rd-ap-hanseatic-q3',
        kind: 'single',
        skill: 'vocabulary',
        paragraph: 1,
        highlight: 'settle',
        prompt: 'The word "settle" in paragraph 2 is closest in meaning to',
        options: ['record', 'start', 'avoid', 'resolve'],
        answer: [3],
        explanation:
          '"Settle disputes" significa resolver conflictos ("resolve"): las ciudades acordaron solucionar sus desacuerdos entre ellas, sin un gobierno central. "Avoid" (evitar) es la trampa: el texto no dice que no tuvieran disputas.',
      },
      {
        id: 'f04-rd-ap-hanseatic-q4',
        kind: 'single',
        skill: 'inference',
        paragraph: 1,
        prompt: 'What can be inferred from paragraph 2 about the Diet?',
        options: [
          'It had complete authority over every member town.',
          'It did not meet according to a fixed, regular schedule.',
          'It was held in a different foreign city each time.',
          'It was created mainly to manage the foreign trading posts.',
        ],
        answer: [1],
        explanation:
          'La Dieta se reunía "occasionally", así que no tenía un calendario fijo. No tenía autoridad total: "many decisions were left to individual towns", y solía reunirse "usually in Lübeck", no en una ciudad extranjera distinta.',
      },
      {
        id: 'f04-rd-ap-hanseatic-q5',
        kind: 'single',
        skill: 'negative-factual',
        paragraph: 2,
        prompt: 'According to paragraph 3, all of the following were traded through the Hanseatic network EXCEPT',
        options: ['furs from Russia', 'dried fish from Norway', 'spices from India', 'grain from the Baltic lands'],
        answer: [2],
        explanation:
          'El párrafo 3 enumera "furs and wax from Russia, dried fish from Norway, grain from the Baltic lands, and cloth from Flanders and England". Las especias de la India no aparecen.',
      },
    ],
  },
  {
    id: 'f04-rd-ap-magnetic-stripes',
    form: 4,
    section: 'reading',
    task: 'academic-passage',
    title: 'Magnetic Stripes on the Seafloor',
    topic: 'geology',
    difficulty: 'hard',
    paragraphs: [
      'In the early twentieth century, the idea that continents drift across Earth\'s surface was widely rejected, largely because no one could explain what force might move them. The decisive evidence came only after the Second World War, when oceanographers began mapping the deep seafloor in detail. They discovered a nearly continuous chain of underwater mountains, the mid-ocean ridges, winding through every major ocean basin. Along the crest of many of these ridges runs a rift valley where the crust is unusually thin and the flow of heat from the interior is high.',
      'In the early 1960s, the geologists Harry Hess and Robert Dietz proposed an explanation for these features that became known as seafloor spreading. According to this hypothesis, hot material from the mantle rises beneath the ridges, partially melts, and erupts as new basaltic crust. As fresh crust forms, older crust is pushed outward on both sides of the ridge, so the ocean floor becomes progressively older with distance from the crest. Because Earth is not growing larger, crust must be destroyed elsewhere, and Hess suggested that it sinks back into the mantle at deep ocean trenches.',
      'The strongest support for the hypothesis came from magnetism. When basaltic lava cools, iron-rich minerals in it become aligned with Earth\'s magnetic field and preserve its direction, much like tiny compass needles frozen in place. Studies of lava flows on land had already shown that the field has reversed its polarity many times, with magnetic north and south switching places at irregular intervals. Meanwhile, magnetometers towed behind ships revealed that the seafloor near ridges is marked by long stripes of rock with alternating normal and reversed magnetization, running parallel to the ridge axis.',
      'In 1963, researchers recognized that these stripes are exactly what seafloor spreading predicts. Each stripe represents crust that formed during one period of normal or reversed polarity and was then carried away from the ridge as newer crust took its place. Crucially, the pattern on one side of a ridge is a mirror image of the pattern on the other. Once the reversals were dated, the widths of the stripes also allowed scientists to calculate spreading rates, which range from about two to more than fifteen centimeters per year. Later deep-sea drilling confirmed that the crust grows older away from the ridges.',
    ],
    questions: [
      {
        id: 'f04-rd-ap-magnetic-stripes-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'Which of the following best expresses the main idea of the passage?',
        options: [
          'Mid-ocean ridges were the first deep-sea features mapped after the Second World War.',
          'Earth\'s magnetic field reverses its polarity at regular and predictable intervals.',
          'Deep-sea drilling was the main method used to discover how ocean crust forms.',
          'Magnetic patterns in ocean crust strongly supported the idea that seafloor spreads.',
        ],
        answer: [3],
        explanation:
          'El pasaje presenta la hipótesis de la expansión del fondo oceánico y muestra que "The strongest support for the hypothesis came from magnetism" (las bandas magnéticas). La opción sobre inversiones regulares contradice el texto ("at irregular intervals"), y la perforación solo confirmó la idea más tarde.',
      },
      {
        id: 'f04-rd-ap-magnetic-stripes-q2',
        kind: 'single',
        skill: 'detail',
        paragraph: 1,
        prompt: 'According to paragraph 2, what happens to oceanic crust at deep ocean trenches?',
        options: [
          'It is pushed upward to form new ridges.',
          'It sinks back down into the mantle.',
          'It cools and records the magnetic field.',
          'It melts and erupts as fresh basalt.',
        ],
        answer: [1],
        explanation:
          'Hess propuso que la corteza "sinks back into the mantle at deep ocean trenches", ya que la Tierra no crece. La erupción de basalto nuevo ocurre en las dorsales ("beneath the ridges"), no en las fosas.',
      },
      {
        id: 'f04-rd-ap-magnetic-stripes-q3',
        kind: 'single',
        skill: 'vocabulary',
        paragraph: 0,
        highlight: 'decisive',
        prompt: 'The word "decisive" in paragraph 1 is closest in meaning to',
        options: ['earliest', 'disputed', 'conclusive', 'accidental'],
        answer: [2],
        explanation:
          '"Decisive evidence" es una prueba concluyente, que resuelve la cuestión ("conclusive"). "Earliest" es una trampa: el texto dice que esas pruebas llegaron "only after the Second World War", es decir, tarde.',
      },
      {
        id: 'f04-rd-ap-magnetic-stripes-q4',
        kind: 'single',
        skill: 'inference',
        paragraph: 3,
        prompt: 'What can be inferred from paragraph 4 about two stripes located at equal distances on opposite sides of a ridge?',
        options: [
          'They formed at roughly the same time.',
          'They have opposite magnetic polarity.',
          'They are older than the stripes farther out.',
          'They formed at different spreading rates.',
        ],
        answer: [0],
        explanation:
          'La corteza nueva se forma en la dorsal y se desplaza "on both sides", y el patrón de un lado es "a mirror image" del otro: dos bandas a la misma distancia se formaron a la vez y tienen la misma polaridad. Además, la corteza "grows older away from the ridges", así que no son más antiguas que las bandas más alejadas.',
      },
      {
        id: 'f04-rd-ap-magnetic-stripes-q5',
        kind: 'single',
        skill: 'purpose',
        paragraph: 2,
        prompt: 'Why does the author compare iron-rich minerals to "tiny compass needles frozen in place" in paragraph 3?',
        options: [
          'To show that lava contains a large amount of iron',
          'To explain why ships carried magnetometers',
          'To suggest that the magnetic field is weakening',
          'To clarify how rock can record the field\'s direction',
        ],
        answer: [3],
        explanation:
          'La comparación ilustra que los minerales "become aligned with Earth\'s magnetic field and preserve its direction": como una brújula congelada, la roca conserva la dirección del campo. El texto no habla de la cantidad de hierro ni de que el campo se debilite.',
      },
    ],
  },
  {
    id: 'f04-rd-ap-quake-towers',
    form: 4,
    section: 'reading',
    task: 'academic-passage',
    title: 'Isolators and Dampers in Towers',
    topic: 'engineering',
    difficulty: 'hard',
    paragraphs: [
      'When an earthquake strikes, the ground beneath a building moves rapidly back and forth, and the structure above must either resist that motion or move with it. A rigid building that is firmly attached to its foundation receives nearly the full force of the shaking, and its upper floors may sway violently. Engineers have therefore developed strategies that do not simply make buildings stronger but instead control how seismic energy enters and moves through them. Two of the most important are base isolation and tuned mass dampers.',
      'Base isolation separates a building from the ground on which it stands. Instead of resting directly on its foundation, the structure sits on flexible bearings, commonly made of alternating layers of rubber and steel, sometimes with a lead core that absorbs energy. These bearings are stiff vertically, so they can carry the building\'s weight, but soft horizontally, so the ground can shift sideways while the building above moves far more slowly and gently. In effect, isolation lengthens the building\'s natural period of vibration, moving it away from the rapid shaking that carries most of an earthquake\'s energy. The method works best for low- and medium-rise structures, such as hospitals, that must keep operating after a major quake.',
      'Very tall, slender towers present a different problem. Their natural periods are already long, and they tend to sway in a slow rhythm in response to both earthquakes and strong winds. For these buildings, engineers often install a tuned mass damper: a heavy block of concrete or steel, or sometimes a tank of water, placed near the top and attached to the structure by springs and shock absorbers or hung like a pendulum. The damper is tuned so that its natural frequency matches that of the building.',
      'When the tower begins to sway, the damper\'s inertia makes it lag behind the building\'s motion, so it pulls against the sway while hydraulic cylinders convert part of the energy into heat. Taipei 101 in Taiwan, for example, contains a steel sphere weighing about 660 metric tons suspended between its upper floors. Such devices can noticeably reduce swaying, improving comfort and limiting damage, but because each damper is tuned to one frequency, it is less effective when the building vibrates in other ways.',
    ],
    questions: [
      {
        id: 'f04-rd-ap-quake-towers-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'What is the passage mainly about?',
        options: [
          'Why tall buildings suffer more damage than short ones',
          'Two methods that control how earthquakes affect buildings',
          'The history of earthquake-resistant construction in Taiwan',
          'How engineers make buildings stronger with steel and concrete',
        ],
        answer: [1],
        explanation:
          'El primer párrafo anuncia "Two of the most important are base isolation and tuned mass dampers", y el resto del texto explica ambos métodos. La última opción contradice la idea de que estas estrategias "do not simply make buildings stronger".',
      },
      {
        id: 'f04-rd-ap-quake-towers-q2',
        kind: 'single',
        skill: 'detail',
        paragraph: 1,
        prompt: 'According to paragraph 2, why are the bearings used in base isolation stiff in the vertical direction?',
        options: [
          'To lengthen the building\'s natural period',
          'To absorb energy through a lead core',
          'To support the weight of the structure',
          'To stop the ground from shifting sideways',
        ],
        answer: [2],
        explanation:
          'Los apoyos "are stiff vertically, so they can carry the building\'s weight". Alargar el periodo natural es efecto de su flexibilidad horizontal, no de su rigidez vertical; y el suelo sí se desplaza ("the ground can shift sideways").',
      },
      {
        id: 'f04-rd-ap-quake-towers-q3',
        kind: 'single',
        skill: 'vocabulary',
        paragraph: 2,
        highlight: 'slender',
        prompt: 'The word "slender" in paragraph 3 is closest in meaning to',
        options: ['thin', 'modern', 'heavy', 'flexible'],
        answer: [0],
        explanation:
          '"Slender" significa delgado o esbelto ("thin"). Aunque estas torres se balancean, "flexible" no es el significado de la palabra, sino una característica distinta.',
      },
      {
        id: 'f04-rd-ap-quake-towers-q4',
        kind: 'single',
        skill: 'inference',
        prompt: 'What can be inferred from the passage about using base isolation in a very tall, slender tower?',
        options: [
          'It would be cheaper than installing a tuned mass damper.',
          'It would make the tower completely safe from strong winds.',
          'It is the method most often required by building codes.',
          'It would help less because the tower\'s period is already long.',
        ],
        answer: [3],
        explanation:
          'El aislamiento funciona porque "lengthens the building\'s natural period" y "works best for low- and medium-rise structures"; en las torres altas "Their natural periods are already long", así que aportaría poco. El texto no menciona costes ni normativas.',
      },
      {
        id: 'f04-rd-ap-quake-towers-q5',
        kind: 'single',
        skill: 'paragraph-relation',
        paragraph: 2,
        prompt: 'How does paragraph 3 relate to paragraph 2?',
        options: [
          'It describes a weakness of the bearings discussed in paragraph 2.',
          'It turns to buildings for which a different solution is needed.',
          'It gives more details about how base isolation is installed.',
          'It provides evidence that base isolation fails in strong winds.',
        ],
        answer: [1],
        explanation:
          'El párrafo 3 empieza con "Very tall, slender towers present a different problem" y presenta otra solución, el amortiguador de masa sintonizado. No critica los apoyos del párrafo 2 ni añade detalles sobre su instalación.',
      },
    ],
  },
];
