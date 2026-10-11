import type { ReadingSet } from '../../../types';

/** Simulación n.º 16 — Reading (contenido original). */
export const sets: ReadingSet[] = [
  // ---------- Complete the Words ----------
  {
    id: 'f16-rd-cw-nile-flood',
    form: 16,
    section: 'reading',
    task: 'complete-words',
    title: 'Farming With the Nile Flood',
    topic: 'history',
    difficulty: 'easy',
    text:
      'For thousands of years, farming in ancient Egypt depended on the yearly flooding of the Nile River. Every {{sum|mer}}, the {{ri|ver}} rose {{a|nd}} covered the {{la|nd}} along {{i|ts}} banks. {{Af|ter}} the {{wa|ter}} finally {{we|nt}} down, it {{le|ft}} behind a {{la|yer}} of dark, fertile mud. Farmers planted wheat and barley in this rich soil, which needed little extra fertilizer. Because a weak flood could lead to hunger, officials carefully measured the height of the river every year.',
    note: 'El texto narra un ciclo del pasado: mantén el pasado simple (rose, went, left) y fíjate en "After…" para la secuencia temporal; "its banks" se refiere a "the river".',
  },
  {
    id: 'f16-rd-cw-permineralization',
    form: 16,
    section: 'reading',
    task: 'complete-words',
    title: 'Turning Bone Into Stone',
    topic: 'geology',
    difficulty: 'medium',
    text:
      'Many fossils form through a process called permineralization, which slowly turns once-living tissue into stone. When a {{pl|ant}} or animal {{di|es}}, its {{rem|ains}} must {{b|e}} buried {{qui|ckly}} under sand or mud. Groundwater then {{se|eps}} into the {{em|pty}} spaces inside bones, {{she|lls}}, or wood, {{carr|ying}} dissolved minerals {{su|ch}} as silica. Over time, these minerals crystallize and fill every pore, creating a stone copy of the original structure. In some petrified wood, even individual cells are preserved.',
    note: '"Dies" concuerda con "a plant or animal" (singular); "carrying" (gerundio) describe una acción simultánea y "such as" introduce ejemplos.',
  },
  {
    id: 'f16-rd-cw-catalytic-converter',
    form: 16,
    section: 'reading',
    task: 'complete-words',
    title: 'Inside a Catalytic Converter',
    topic: 'engineering',
    difficulty: 'hard',
    text:
      "A catalytic converter is a device in a car's exhaust system that reduces the harmful gases released into the air. Inside {{i|ts}} steel {{hou|sing}}, exhaust {{pas|ses}} through a ceramic {{hone|ycomb}} coated {{wi|th}} precious {{met|als}}. These metals {{a|ct}} as {{cata|lysts}}, speeding up {{chem|ical}} reactions without {{be|ing}} consumed. As the hot gases flow through the narrow channels, poisonous carbon monoxide is oxidized into carbon dioxide, and nitrogen oxides are broken down into nitrogen and oxygen. Unburned hydrocarbons are also converted into water vapor and carbon dioxide.",
    note: '"Act as" significa "funcionar como"; tras una preposición se usa gerundio, también en pasiva: "without being consumed".',
  },

  // ---------- Read in Daily Life ----------
  {
    id: 'f16-rd-dl-ice-cream-menu',
    form: 16,
    section: 'reading',
    task: 'daily-life',
    genre: 'menu',
    title: 'Polar Scoop Ice Cream Menu',
    topic: 'daily-life',
    difficulty: 'easy',
    header: ['Polar Scoop Ice Cream — Menu'],
    text:
      "FLAVORS\nClassic: vanilla, chocolate, strawberry, mint chip\nSpecial (+$0.75 per scoop): salted caramel, pistachio, mango sorbet\nFlavor of the week: honey lavender (classic price)\n\nSIZES\nKid's cone (1 scoop) — $3.25\nRegular (2 scoops) — $4.95\nLarge (3 scoops) — $6.25\nCups and plain cones are free; waffle cones add $1.00.\n\nTOPPINGS — $0.60 each\nRainbow sprinkles · crushed cookies · hot fudge · fresh berries\n\nOur mango sorbet is completely dairy-free. Ask for a free taste — up to two per customer.",
    questions: [
      {
        id: 'f16-rd-dl-ice-cream-menu-q1',
        kind: 'single',
        skill: 'detail',
        prompt: 'How much does a regular plain cone with two scoops of pistachio cost?',
        options: ['$4.95', '$5.70', '$6.45', '$7.45'],
        answer: [2],
        explanation:
          'La medida "Regular (2 scoops)" cuesta $4.95 y el pistacho es un sabor especial: "+$0.75 per scoop". Con dos bolas: 4.95 + 0.75 + 0.75 = $6.45. La opción $5.70 es la trampa: suma el recargo una sola vez. El cono simple es gratis ("plain cones are free").',
      },
      {
        id: 'f16-rd-dl-ice-cream-menu-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'Which flavor is the best choice for a customer who does not eat dairy products?',
        options: ['Mango sorbet', 'Honey lavender', 'Salted caramel', 'Mint chip'],
        answer: [0],
        explanation:
          'El menú indica: "Our mango sorbet is completely dairy-free". Del resto de sabores no se dice que no lleven lácteos; "honey lavender" solo se destaca por ser el sabor de la semana.',
      },
    ],
  },
  {
    id: 'f16-rd-dl-textbook-rentals',
    form: 16,
    section: 'reading',
    task: 'daily-life',
    genre: 'webpage',
    title: 'Bookstore Rental Return Dates',
    topic: 'campus-life',
    difficulty: 'easy',
    header: ['Carrow University Bookstore — Textbook Rentals'],
    text:
      'Save up to 60% by renting your textbooks instead of buying them. Rentals are available in the store and online for any course that uses a printed textbook. To rent, you need a valid student ID and a credit or debit card, which is kept on file in case a book is not returned.\n\nReturn dates: Fall rentals are due December 18, and spring rentals are due May 12. Books returned up to seven days late are charged a $10 late fee. After that, your card will be charged the full purchase price of the book. Highlighting is allowed, but books with water damage or missing pages cannot be accepted.',
    questions: [
      {
        id: 'f16-rd-dl-textbook-rentals-q1',
        kind: 'single',
        skill: 'inference',
        prompt: 'What will probably happen to a student who returns a fall rental on December 30?',
        options: [
          'The student will pay a $10 late fee.',
          'The student will be unable to rent again.',
          'The book will be rented for another term.',
          "The book's full price will be charged.",
        ],
        answer: [3],
        explanation:
          'El plazo de otoño vence el 18 de diciembre y solo se cobra la multa de $10 "up to seven days late" (hasta el 25). El 30 ya se ha superado ese margen, así que "your card will be charged the full purchase price". La multa de $10 es la trampa: solo vale para la primera semana.',
      },
      {
        id: 'f16-rd-dl-textbook-rentals-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'What does a student need in order to rent a textbook?',
        options: [
          'Proof of enrollment in the course',
          'A student ID and a payment card',
          'A deposit of 60% of the book price',
          'An account on the bookstore website',
        ],
        answer: [1],
        explanation:
          'El texto dice: "you need a valid student ID and a credit or debit card". El 60 % es el ahorro máximo ("Save up to 60%"), no un depósito, y la web es solo una de las dos formas de alquilar.',
      },
    ],
  },
  {
    id: 'f16-rd-dl-holiday-staffing',
    form: 16,
    section: 'reading',
    task: 'daily-life',
    genre: 'memo',
    title: 'Holiday Staffing and Overtime',
    topic: 'daily-life',
    difficulty: 'medium',
    header: ['MEMO', 'To: All sales associates', 'From: Dana Whitfield, Store Manager', 'Date: November 3', 'Subject: Holiday staffing and overtime'],
    text:
      "As in past years, we expect our busiest weeks between Thanksgiving and New Year's Day. To cover the extra hours, the store will open at 8:00 a.m. instead of 10:00 a.m. from November 27 through December 31, and three seasonal employees will join our team on November 20.\n\nOvertime shifts will be offered to current associates before any additional staff are hired. If you would like extra hours, write your name and availability on the sign-up sheet in the break room by November 14. Shifts will be assigned by seniority, and the holiday schedule will be posted on November 18.\n\nPlease note that no new vacation requests can be approved for December 15–31. If your time off during that period has already been approved, it will still be honored.",
    questions: [
      {
        id: 'f16-rd-dl-holiday-staffing-q1',
        kind: 'single',
        skill: 'purpose',
        prompt: 'What is the main purpose of the memo?',
        options: [
          'To announce that several full-time workers will be hired',
          'To explain holiday staffing and how to sign up for overtime',
          'To remind associates to submit their vacation requests early',
          'To introduce new opening hours for the rest of the year',
        ],
        answer: [1],
        explanation:
          'El memorando explica cómo se cubrirá la temporada alta (horario ampliado, empleados temporales) y cómo apuntarse a horas extra ("write your name and availability on the sign-up sheet"). Los nuevos empleados son "seasonal", no fijos, y el horario de las 8:00 solo rige "from November 27 through December 31".',
      },
      {
        id: 'f16-rd-dl-holiday-staffing-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'How will overtime shifts be given out?',
        options: [
          'By a random drawing among those who sign up',
          'To the seasonal employees before anyone else',
          'By length of time at the store',
          'Equally among all associates in the store',
        ],
        answer: [2],
        explanation:
          'El texto dice "Shifts will be assigned by seniority", es decir, según la antigüedad en la empresa. Los empleados temporales no tienen prioridad: las horas extra se ofrecen primero a "current associates".',
      },
      {
        id: 'f16-rd-dl-holiday-staffing-q3',
        kind: 'single',
        skill: 'inference',
        prompt: 'What is implied about an associate whose request for December 20 off was approved in October?',
        options: [
          'The associate can still take that day off.',
          'The associate must work an overtime shift instead.',
          'The associate needs to submit a new request.',
          'The associate will lose the approved vacation day.',
        ],
        answer: [0],
        explanation:
          'Aunque no se aprobarán nuevas solicitudes para el 15–31 de diciembre, el memorando aclara: "If your time off during that period has already been approved, it will still be honored". Por tanto, ese empleado conserva su día libre; la opción de perderlo contradice el texto.',
      },
    ],
  },
  {
    id: 'f16-rd-dl-climbing-course',
    form: 16,
    section: 'reading',
    task: 'daily-life',
    genre: 'advertisement',
    title: 'Learn to Climb This Winter',
    topic: 'campus-life',
    difficulty: 'medium',
    header: ['Campus Recreation — Beginner Climbing Course'],
    text:
      'Have you always wanted to try rock climbing? Our four-week Beginner Climbing Course meets on Tuesdays from 6:00 to 7:30 p.m. at the Summit Wall in the Recreation Center, starting February 4. Certified instructors will teach basic movement, knot tying, and belaying, which means handling the rope that protects your climbing partner.\n\nCost: $45 for students, $60 for faculty and staff. Climbing shoes and harnesses are provided.\n\nSafety requirements: All participants must sign a liability waiver at the first session. To climb without an instructor, you must pass a belay test in the final session. Remove all jewelry and trim long fingernails before climbing. Anyone with a recent injury needs written approval from a doctor. Each course is limited to 12 participants, so register early at the front desk.',
    questions: [
      {
        id: 'f16-rd-dl-climbing-course-q1',
        kind: 'single',
        skill: 'detail',
        prompt: 'What must participants do before they can climb without an instructor?',
        options: [
          'Buy their own climbing shoes',
          'Attend an extra practice session',
          'Get written approval from a doctor',
          'Pass a test in the last session',
        ],
        answer: [3],
        explanation:
          'El anuncio indica: "To climb without an instructor, you must pass a belay test in the final session". La aprobación médica solo se exige a "Anyone with a recent injury", y el calzado se presta ("Climbing shoes and harnesses are provided").',
      },
      {
        id: 'f16-rd-dl-climbing-course-q2',
        kind: 'single',
        skill: 'vocabulary',
        prompt: 'In the advertisement, the word "belaying" refers to',
        options: [
          "controlling a partner's safety rope",
          'climbing quickly to the top of the wall',
          'checking all the equipment before class',
          'tying climbing shoes and harnesses tightly',
        ],
        answer: [0],
        explanation:
          'El propio texto define la palabra: "belaying, which means handling the rope that protects your climbing partner". Las demás opciones mezclan palabras del anuncio (equipment, shoes, harnesses) pero no corresponden a la definición.',
      },
      {
        id: 'f16-rd-dl-climbing-course-q3',
        kind: 'single',
        skill: 'inference',
        prompt: 'What can be inferred about the course?',
        options: [
          'It is open only to registered students.',
          'Participants need some climbing experience.',
          'Some people who want to join may not get a place.',
          'Its sessions take place outdoors on natural rock.',
        ],
        answer: [2],
        explanation:
          'Como "Each course is limited to 12 participants, so register early", se deduce que algunas personas podrían quedarse sin plaza. No es solo para estudiantes (hay precio para "faculty and staff") y se imparte en el "Recreation Center", no al aire libre.',
      },
    ],
  },
  {
    id: 'f16-rd-dl-exam-timetable',
    form: 16,
    section: 'reading',
    task: 'daily-life',
    genre: 'schedule',
    title: 'Fall Finals Timetable and Conflicts',
    topic: 'campus-life',
    difficulty: 'hard',
    header: ['Fall Semester Final Examination Timetable', 'December 9–13'],
    text:
      'Exam times are based on the regular meeting time of each course.\n\nMWF 8:00–8:50 a.m. classes → Mon., Dec. 9, 8:00–10:00 a.m.\nMWF 11:00–11:50 a.m. classes → Mon., Dec. 9, 1:00–3:00 p.m.\nTTh 9:30–10:45 a.m. classes → Mon., Dec. 9, 6:00–8:00 p.m.\nTTh 2:00–3:15 p.m. classes → Wed., Dec. 11, 8:00–10:00 a.m.\nThursday evening classes (6:00–8:50 p.m.) → Thu., Dec. 12, 6:00–8:00 p.m.\nCommon exams (all sections of Chemistry 101 and Calculus I) → Thu., Dec. 12, 6:00–8:00 p.m.\n\nConflict rules:\n1. Two exams on the same day are not considered a conflict.\n2. A student with three exams on the same day may reschedule the second of the three.\n3. If two exams are scheduled at the same time, the common exam takes priority, and the other exam must be rescheduled.\nSubmit all conflict requests to the Registrar by November 22. Rescheduled exams take place on Friday, Dec. 13.',
    questions: [
      {
        id: 'f16-rd-dl-exam-timetable-q1',
        kind: 'single',
        skill: 'inference',
        prompt: 'A student takes classes that meet MWF at 8:00, MWF at 11:00, and TTh at 9:30. What should the student do?',
        options: [
          'Take all three exams on Monday as scheduled',
          'Ask to move the 8:00 a.m. exam to Friday',
          'Request a new time for the 1:00 p.m. exam',
          'Ask for the evening exam to be moved to Thursday',
        ],
        answer: [2],
        explanation:
          'Las tres clases tienen examen el lunes 9 (8:00, 1:00 y 6:00). Según la regla 2, "A student with three exams on the same day may reschedule the second of the three", es decir, el de la 1:00 p.m. El de las 8:00 es el primero, no el segundo.',
      },
      {
        id: 'f16-rd-dl-exam-timetable-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'What is true about a student whose only exams are at 8:00 a.m. and 6:00 p.m. on Monday, Dec. 9?',
        options: [
          'The student may move the evening exam to Friday.',
          'The student should take both exams as planned.',
          'The student must contact the Registrar by November 22.',
          'The student can take one exam with another section.',
        ],
        answer: [1],
        explanation:
          'La regla 1 dice: "Two exams on the same day are not considered a conflict". Como además no coinciden en la misma hora, el estudiante debe presentarse a ambos el lunes. Trasladar un examen al viernes solo se permite con "three exams on the same day" o con dos exámenes "at the same time", y el plazo del 22 de noviembre solo afecta a quien tiene un conflicto.',
      },
      {
        id: 'f16-rd-dl-exam-timetable-q3',
        kind: 'single',
        skill: 'inference',
        prompt: 'A student is taking Calculus I and a Thursday evening seminar. Which exam will be rescheduled?',
        options: [
          'The Calculus I exam',
          'Both of the two exams',
          'Neither of the exams',
          'The seminar exam',
        ],
        answer: [3],
        explanation:
          'Calculus I es un examen común (jueves 12, 6:00–8:00 p.m.) y coincide con el de las clases del jueves por la tarde. La regla 3 dice que "the common exam takes priority, and the other exam must be rescheduled": se cambia el del seminario, no el de Calculus I.',
      },
    ],
  },

  // ---------- Read an Academic Passage ----------
  {
    id: 'f16-rd-ap-solar-panels',
    form: 16,
    section: 'reading',
    task: 'academic-passage',
    title: 'How Solar Cells Make Electricity',
    topic: 'technology',
    difficulty: 'easy',
    paragraphs: [
      'Solar panels have become a familiar sight on rooftops and in open fields around the world. They produce electricity directly from sunlight, without moving parts, fuel, or noise. The key to this process is the photovoltaic cell, a name that combines the Greek word for light with the volt, a unit of electricity. A typical panel contains dozens of these cells connected together.',
      'Most photovoltaic cells are made of silicon, the same element found in ordinary sand. The silicon is purified and then treated with small amounts of other elements, so that the cell has two layers with different electrical properties. Where these layers meet, an electric field forms. When sunlight strikes the cell, its energy knocks electrons loose from silicon atoms. The electric field then pushes these free electrons in one direction, creating an electric current that thin metal contacts collect.',
      'The electricity produced this way is direct current (DC), which flows in only one direction. Homes and power grids, however, use alternating current (AC). For this reason, solar systems include a device called an inverter, which converts DC into AC so that the power can run household appliances or be sent to the grid.',
      'Solar panels are not perfectly efficient. Most commercial panels turn only about 15 to 22 percent of the sunlight that reaches them into electricity; the rest is reflected or becomes heat. Their output also drops on cloudy days and stops at night, so many owners store extra energy in batteries or draw power from the grid when needed. Even so, steady improvements and falling prices have made solar power one of the fastest-growing energy sources.',
    ],
    questions: [
      {
        id: 'f16-rd-ap-solar-panels-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'What is the passage mainly about?',
        options: [
          'Where the silicon used in solar cells comes from',
          'How solar panels work and what limits them',
          'The history of the photovoltaic cell and its name',
          'The reasons why homes prefer alternating current',
        ],
        answer: [1],
        explanation:
          'El texto explica cómo la célula fotovoltaica genera corriente (párrafo 2), cómo el inversor la hace utilizable (párrafo 3) y qué limita a los paneles (párrafo 4: "not perfectly efficient"). Las demás opciones son detalles aislados, como el origen del nombre en el párrafo 1.',
      },
      {
        id: 'f16-rd-ap-solar-panels-q2',
        kind: 'single',
        skill: 'detail',
        paragraph: 1,
        prompt: 'According to paragraph 2, what happens when sunlight strikes a photovoltaic cell?',
        options: [
          'The two silicon layers join into a single layer.',
          'The metal contacts heat up and release current.',
          'The silicon atoms take in electrons from the air.',
          'Electrons are knocked loose from silicon atoms.',
        ],
        answer: [3],
        explanation:
          'El párrafo 2 dice: "When sunlight strikes the cell, its energy knocks electrons loose from silicon atoms". Los contactos metálicos solo recogen la corriente ("metal contacts collect"), no la producen al calentarse.',
      },
      {
        id: 'f16-rd-ap-solar-panels-q3',
        kind: 'single',
        skill: 'vocabulary',
        paragraph: 3,
        highlight: 'draw',
        prompt: 'The word "draw" in paragraph 4 is closest in meaning to',
        options: ['take', 'sketch', 'send', 'measure'],
        answer: [0],
        explanation:
          'En "draw power from the grid", "draw" significa obtener o tomar (energía) de la red cuando los paneles no producen. "Sketch" es el otro significado de "draw" (dibujar), que no encaja aquí; "send" es lo contrario.',
      },
      {
        id: 'f16-rd-ap-solar-panels-q4',
        kind: 'single',
        skill: 'inference',
        paragraph: 2,
        prompt: 'What can be inferred from paragraph 3 about a solar system without an inverter?',
        options: [
          'It would produce alternating current only at night.',
          'It would generate more electricity than usual.',
          'Its power could not directly run most home appliances.',
          'Its cells would stop releasing any free electrons.',
        ],
        answer: [2],
        explanation:
          'El inversor "converts DC into AC so that the power can run household appliances", y los hogares usan corriente alterna. Sin inversor, la corriente continua no serviría directamente para los aparatos. Nada indica que cambie la producción de electrones o de electricidad.',
      },
      {
        id: 'f16-rd-ap-solar-panels-q5',
        kind: 'single',
        skill: 'negative-factual',
        paragraph: 3,
        prompt: 'According to paragraph 4, all of the following are limitations of solar panels EXCEPT:',
        options: [
          'Much of the sunlight they receive becomes heat.',
          'They need a regular supply of fuel to operate.',
          'They produce less electricity when it is cloudy.',
          'They generate no electricity during the night.',
        ],
        answer: [1],
        explanation:
          'El párrafo 4 menciona el calor ("becomes heat"), los días nublados ("drops on cloudy days") y la noche ("stops at night"). La necesidad de combustible no es una limitación: el párrafo 1 afirma que funcionan "without moving parts, fuel, or noise".',
      },
    ],
  },
  {
    id: 'f16-rd-ap-solar-cycle',
    form: 16,
    section: 'reading',
    task: 'academic-passage',
    title: "The Sun's Eleven-Year Rhythm",
    topic: 'astronomy',
    difficulty: 'medium',
    paragraphs: [
      "The Sun may look unchanging from Earth, but its surface follows a regular rhythm of activity. Astronomers have tracked this pattern, known as the solar cycle, for centuries, mainly by counting sunspots, the dark patches that appear on the Sun's visible surface. On average, the number of sunspots rises and falls over a period of about eleven years. At solar minimum, weeks may pass without a single spot; at solar maximum, more than a hundred can be visible at once.",
      "Sunspots are dark only in comparison with their surroundings. They are regions where intense magnetic fields slow the flow of heat rising from the Sun's interior, making them roughly 1,500 degrees Celsius cooler than the area around them. These magnetic fields are generated by the movement of electrically charged gas inside the Sun. Because the Sun rotates faster at its equator than near its poles, the fields gradually become twisted and tangled. Around solar maximum, the Sun's overall magnetic field flips, so its north and south magnetic poles trade places.",
      "Periods of high activity also bring more solar flares and coronal mass ejections, sudden explosions that hurl enormous clouds of charged particles into space. When such a cloud reaches Earth, usually one to three days later, it interacts with the planet's magnetic field, which guides many particles toward the polar regions. There they collide with oxygen and nitrogen in the upper atmosphere, causing the gases to glow. The result is the shimmering curtains of light known as auroras. Oxygen usually produces green or red light, while nitrogen adds blue and purple tones.",
      'Solar activity can also cause practical problems. Strong geomagnetic storms can disrupt satellites, interfere with radio and GPS signals, and create electric currents that damage power grids. In 1989, one such storm caused a blackout across the Canadian province of Quebec that lasted about nine hours. For this reason, space agencies monitor the Sun continuously, and forecasters use the solar cycle to anticipate when severe storms are most likely.',
    ],
    questions: [
      {
        id: 'f16-rd-ap-solar-cycle-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'What is the passage mainly about?',
        options: [
          'A repeating pattern of solar activity and its effects on Earth',
          'The methods astronomers use to measure the temperature of the Sun',
          'The reasons auroras can be seen only from northern countries',
          'A history of blackouts caused by severe weather on Earth',
        ],
        answer: [0],
        explanation:
          'El pasaje presenta el ciclo de unos once años ("the solar cycle"), explica las manchas solares y luego sus efectos en la Tierra: auroras (párrafo 3) y problemas técnicos (párrafo 4). El apagón de Quebec es solo un ejemplo y no lo causó el clima terrestre.',
      },
      {
        id: 'f16-rd-ap-solar-cycle-q2',
        kind: 'single',
        skill: 'detail',
        paragraph: 1,
        prompt: 'According to paragraph 2, why do sunspots look dark?',
        options: [
          "They are openings that reveal the Sun's interior.",
          'They contain gases that block light from Earth.',
          'They are cooler than their surroundings.',
          'They form only when the Sun stops rotating.',
        ],
        answer: [2],
        explanation:
          'El párrafo 2 explica que son oscuras "only in comparison with their surroundings" porque son "roughly 1,500 degrees Celsius cooler than the area around them". El texto no habla de aberturas ni de gases que bloqueen la luz; la rotación del Sol nunca se detiene.',
      },
      {
        id: 'f16-rd-ap-solar-cycle-q3',
        kind: 'single',
        skill: 'vocabulary',
        paragraph: 2,
        highlight: 'hurl',
        prompt: 'The word "hurl" in paragraph 3 is closest in meaning to',
        options: ['heat', 'pull', 'hide', 'throw'],
        answer: [3],
        explanation:
          '"Hurl" significa lanzar con fuerza: las explosiones "hurl enormous clouds of charged particles into space", es decir, las arrojan al espacio. "Pull" (tirar hacia sí) indica la dirección contraria.',
      },
      {
        id: 'f16-rd-ap-solar-cycle-q4',
        kind: 'single',
        skill: 'inference',
        paragraph: 2,
        prompt: 'What can be inferred from paragraph 3 about auroras?',
        options: [
          'They are caused by sunlight reflecting off polar ice.',
          'They are probably seen more often near solar maximum.',
          'They usually appear on the same day as a solar flare.',
          'They are produced mainly by gases from the Sun itself.',
        ],
        answer: [1],
        explanation:
          'Los periodos de alta actividad traen "more solar flares and coronal mass ejections", y son sus partículas las que producen las auroras; por tanto, cabe esperar más auroras cerca del máximo solar. La opción del mismo día es falsa: las partículas llegan "one to three days later", y el brillo procede del oxígeno y el nitrógeno terrestres.',
      },
      {
        id: 'f16-rd-ap-solar-cycle-q5',
        kind: 'single',
        skill: 'purpose',
        paragraph: 3,
        prompt: 'Why does the author mention the 1989 blackout in Quebec?',
        options: [
          'To illustrate the damage a strong solar storm can cause',
          'To show that auroras can be seen far from the poles',
          'To explain how power grids create magnetic fields',
          'To argue that satellites were poorly designed then',
        ],
        answer: [0],
        explanation:
          'El párrafo 4 trata de los "practical problems" de la actividad solar; el apagón de Quebec es un ejemplo concreto de que las tormentas pueden "damage power grids". El texto no relaciona ese episodio con auroras ni con satélites.',
      },
    ],
  },
  {
    id: 'f16-rd-ap-critical-period',
    form: 16,
    section: 'reading',
    task: 'academic-passage',
    title: 'A Critical Period for Language',
    topic: 'linguistics',
    difficulty: 'hard',
    paragraphs: [
      'Why do young children seem to pick up languages so effortlessly, while adults struggle for years with grammar and pronunciation? One influential answer is the critical period hypothesis, proposed in its best-known form by the neurologist Eric Lenneberg in 1967. According to this idea, the brain is especially prepared to acquire language during a limited window early in life, lasting roughly until puberty. After the window closes, learning a language is still possible but considerably harder, and native-like mastery may be out of reach.',
      'Some of the strongest evidence comes from deaf individuals who were born to hearing parents and had no access to sign language until later in life. Studies comparing such signers have found that those who began learning in early childhood use the grammar of sign language more accurately than those who started as teenagers or adults, even after decades of daily use. Because the late learners had no fully accessible first language during childhood, their experience suggests that early exposure to some language is crucial for the normal development of grammatical ability.',
      'Research on second-language learning points in a similar direction. In a well-known 1989 study, immigrants to the United States who had arrived between the ages of three and seven performed like native speakers on a test of English grammar, whereas those who had arrived later scored lower, and scores fell steadily as age of arrival rose toward puberty. Age of arrival also predicts accent: people who move to a new country as young children usually sound native, while those who arrive as adults almost always retain a noticeable foreign accent.',
      "Nevertheless, the hypothesis remains controversial. In the early stages of instruction, adults and older children actually learn faster than young children, probably because they can use memory strategies and explicit rules. Moreover, some adult learners do achieve near-native proficiency, and several large studies have found that ability declines gradually across the lifespan instead of dropping sharply at a particular age. Critics also note that younger immigrants usually receive more exposure to the new language, attend local schools, and feel less attached to their first language. For these reasons, many researchers prefer to speak of a 'sensitive period,' during which learning is easier but not strictly limited to childhood.",
    ],
    questions: [
      {
        id: 'f16-rd-ap-critical-period-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'What is the main purpose of the passage?',
        options: [
          'To prove that adults are unable to learn a second language well',
          'To compare the ways sign languages and spoken languages are learned',
          'To describe a teaching method based on research with immigrants',
          'To present evidence for and against a theory about language learning',
        ],
        answer: [3],
        explanation:
          'Los párrafos 2 y 3 aportan pruebas a favor de la hipótesis del periodo crítico y el párrafo 4 presenta las objeciones ("Nevertheless, the hypothesis remains controversial"). La primera opción exagera: el texto dice que aprender después es "still possible" y que algunos adultos logran "near-native proficiency".',
      },
      {
        id: 'f16-rd-ap-critical-period-q2',
        kind: 'single',
        skill: 'detail',
        paragraph: 1,
        prompt: 'According to paragraph 2, what did studies of deaf signers find?',
        options: [
          'Late learners caught up after decades of daily use.',
          'Early starters used its grammar more accurately.',
          'Hearing parents taught sign language better than schools did.',
          'Teenagers learned sign language faster than young children.',
        ],
        answer: [1],
        explanation:
          'El párrafo 2 indica que quienes empezaron "in early childhood use the grammar of sign language more accurately" que los que empezaron de adolescentes o adultos, "even after decades of daily use". Por eso la primera opción es falsa: los tardíos no alcanzaron a los tempranos.',
      },
      {
        id: 'f16-rd-ap-critical-period-q3',
        kind: 'single',
        skill: 'vocabulary',
        paragraph: 2,
        highlight: 'retain',
        prompt: 'The word "retain" in paragraph 3 is closest in meaning to',
        options: ['lose', 'imitate', 'keep', 'hide'],
        answer: [2],
        explanation:
          '"Retain" significa conservar: los que llegan de adultos "almost always retain a noticeable foreign accent", es decir, mantienen el acento extranjero. "Lose" es justo lo contrario.',
      },
      {
        id: 'f16-rd-ap-critical-period-q4',
        kind: 'single',
        skill: 'inference',
        paragraph: 2,
        prompt: 'What can be inferred from paragraph 3 about a woman who moved to the United States at age five?',
        options: [
          "Her English grammar is likely to resemble a native speaker's.",
          'She probably scored lower than people who arrived at twelve.',
          'Her accent probably became more native only after puberty.',
          'She most likely needed formal grammar lessons to succeed.',
        ],
        answer: [0],
        explanation:
          'Quienes llegaron "between the ages of three and seven performed like native speakers on a test of English grammar"; con cinco años, lo esperable es una gramática nativa. Los que llegaron más tarde "scored lower", así que la segunda opción invierte la relación.',
      },
      {
        id: 'f16-rd-ap-critical-period-q5',
        kind: 'single',
        skill: 'purpose',
        paragraph: 3,
        prompt: 'Why does the author mention that younger immigrants "attend local schools" in paragraph 4?',
        options: [
          'To show that schools teach grammar better than families do',
          'To explain why young children learn faster than adults at first',
          'To support the claim that age of arrival predicts a foreign accent',
          'To suggest that factors other than age may explain their success',
        ],
        answer: [3],
        explanation:
          'Es una de las críticas: los inmigrantes jóvenes reciben "more exposure to the new language" y asisten a escuelas locales, de modo que su éxito podría deberse a esas circunstancias y no solo a la edad. La segunda opción es falsa: el texto dice que al principio aprenden más rápido los adultos.',
      },
    ],
  },
  {
    id: 'f16-rd-ap-antibiotic-resistance',
    form: 16,
    section: 'reading',
    task: 'academic-passage',
    title: 'How Bacteria Outwit Antibiotics',
    topic: 'biology',
    difficulty: 'hard',
    paragraphs: [
      'Antibiotics are among the most important medical discoveries of the twentieth century, yet their effectiveness is steadily declining. Infections that were once easy to cure, including some forms of pneumonia and tuberculosis, are increasingly caused by bacteria that survive standard treatments. This phenomenon, known as antibiotic resistance, does not occur because the drugs give bacteria new abilities. Rather, it is a clear example of evolution taking place on a timescale that humans can observe directly.',
      'The process begins with variation. Bacteria reproduce rapidly, with some species dividing every twenty minutes under ideal conditions, and each division carries a small chance of a random mutation in the DNA. Occasionally, a mutation makes a bacterium less vulnerable to a particular drug, for example by changing the protein the antibiotic normally attacks or by allowing the cell to pump the drug out. When a patient takes an antibiotic, susceptible bacteria are killed, but any resistant individuals survive and multiply. Before long, the resistant strain can dominate the population. This is natural selection: the antibiotic does not cause the mutation; it simply determines which bacteria survive.',
      'Bacteria also have a way of acquiring resistance that animals and plants generally lack. Through horizontal gene transfer, they can exchange genetic material with neighboring cells, even cells of different species. In one common mechanism, called conjugation, a bacterium passes a small circular piece of DNA known as a plasmid to another cell through a direct connection. Because a single plasmid may carry genes for resistance to several antibiotics, one transfer can turn a defenseless bacterium into a multidrug-resistant one. Bacteria can also absorb DNA released by dead cells or receive genes carried by viruses that infect them.',
      'Human behavior has accelerated these processes. Antibiotics are often prescribed for viral illnesses such as colds, against which they have no effect, and patients who stop treatment early may allow the hardiest bacteria to survive. Large quantities of antibiotics are also given to farm animals to make them grow faster. Each unnecessary use creates new opportunities for selection. Public health experts therefore urge doctors to prescribe antibiotics only when they are needed, and they support the development of new drugs and of vaccines that prevent infections in the first place.',
    ],
    questions: [
      {
        id: 'f16-rd-ap-antibiotic-resistance-q1',
        kind: 'single',
        skill: 'organization',
        prompt: 'Which of the following best describes the organization of the passage?',
        options: [
          'A medical problem is described, and several failed solutions are evaluated.',
          'Two competing theories of resistance are compared, and the weaker one is rejected.',
          'A problem is introduced, its causes explained, and human factors discussed.',
          'The history of antibiotics is traced from their discovery up to the present day.',
        ],
        answer: [2],
        explanation:
          'El párrafo 1 presenta el problema ("antibiotic resistance"), los párrafos 2 y 3 explican sus causas biológicas (selección natural y "horizontal gene transfer") y el párrafo 4 trata del papel humano ("Human behavior has accelerated these processes"). No se comparan teorías ni se evalúan soluciones fallidas.',
      },
      {
        id: 'f16-rd-ap-antibiotic-resistance-q2',
        kind: 'single',
        skill: 'detail',
        paragraph: 1,
        prompt: 'According to paragraph 2, what role does an antibiotic play in natural selection?',
        options: [
          'It determines which bacteria survive and multiply.',
          'It causes the mutations that make bacteria resistant.',
          'It increases the speed at which bacteria divide.',
          'It changes the proteins of the bacteria it kills.',
        ],
        answer: [0],
        explanation:
          'El párrafo 2 lo dice expresamente: "the antibiotic does not cause the mutation; it simply determines which bacteria survive". La segunda opción es la trampa: contradice esa misma frase.',
      },
      {
        id: 'f16-rd-ap-antibiotic-resistance-q3',
        kind: 'single',
        skill: 'vocabulary',
        paragraph: 1,
        highlight: 'vulnerable',
        prompt: 'The word "vulnerable" in paragraph 2 is closest in meaning to',
        options: ['visible', 'sensitive', 'resistant', 'attracted'],
        answer: [1],
        explanation:
          '"Vulnerable" significa expuesto o sensible a un daño: una mutación hace a la bacteria "less vulnerable to a particular drug", es decir, menos sensible al fármaco. "Resistant" es el significado opuesto.',
      },
      {
        id: 'f16-rd-ap-antibiotic-resistance-q4',
        kind: 'single',
        skill: 'inference',
        paragraph: 2,
        prompt: 'What can be inferred from paragraph 3 about horizontal gene transfer?',
        options: [
          'It happens only between bacteria of the same species.',
          'It is the main way that animals become resistant to disease.',
          'It requires bacteria to be infected by viruses first.',
          'It can spread resistance faster than random mutation alone.',
        ],
        answer: [3],
        explanation:
          'Mientras que una mutación útil aparece solo "Occasionally" (párrafo 2), una sola transferencia de un plásmido puede convertir a una bacteria en "multidrug-resistant", así que la transferencia acelera la difusión de la resistencia. La primera opción contradice "even cells of different species".',
      },
      {
        id: 'f16-rd-ap-antibiotic-resistance-q5',
        kind: 'single',
        skill: 'negative-factual',
        paragraph: 3,
        prompt: 'According to paragraph 4, all of the following contribute to resistance EXCEPT:',
        options: [
          'prescribing antibiotics for illnesses caused by viruses',
          'giving antibiotics to farm animals to make them grow',
          'using vaccines to keep infections from occurring',
          'stopping a course of treatment earlier than planned',
        ],
        answer: [2],
        explanation:
          'Las vacunas no contribuyen a la resistencia: el párrafo 4 las propone como solución porque "prevent infections in the first place". Las otras tres opciones aparecen como usos que favorecen la selección de bacterias resistentes.',
      },
    ],
  },
];
