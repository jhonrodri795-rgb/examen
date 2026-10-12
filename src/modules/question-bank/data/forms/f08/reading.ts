import type { ReadingSet } from '../../../types';

/** Simulación n.º 8 — Reading (contenido original). */
export const sets: ReadingSet[] = [
  // ---------- Complete the Words ----------
  {
    id: 'f08-rd-cw-ancient-olympics',
    form: 8,
    section: 'reading',
    task: 'complete-words',
    title: 'Organizing the Ancient Olympics',
    topic: 'history',
    difficulty: 'easy',
    text:
      'The ancient Olympic Games were held every four years at Olympia, a religious sanctuary in southern Greece. Only {{fr|ee}} Greek {{m|en}} could {{com|pete}}, and {{mar|ried}} women {{we|re}} not {{all|owed}} to {{wa|tch}} the {{cont|ests}}. Athletes {{h|ad}} to {{tr|ain}} for months before the festival and swear an oath to obey the rules. Judges from the city of Elis organized the events and punished anyone who cheated. Winners received only a crown of olive leaves, but they returned home as celebrated heroes.',
    note: 'Repasa las estructuras de permiso y obligación en pasado: "were not allowed to + verbo" y "had to + verbo". Ambas exigen el infinitivo sin "to" extra detrás.',
  },
  {
    id: 'f08-rd-cw-glacial-valleys',
    form: 8,
    section: 'reading',
    task: 'complete-words',
    title: 'Glaciers and U-Shaped Valleys',
    topic: 'geology',
    difficulty: 'medium',
    text:
      'Glaciers are among the most powerful forces that shape mountain landscapes. Moving {{slo|wly}} downhill, {{t|he}} ice {{scr|apes}} the {{bot|tom}} and {{si|des}} of {{t|he}} valley {{wi|th}} rocks {{fro|zen}} into {{i|ts}} base. {{Ov|er}} thousands of years, this process turns a narrow V-shaped river valley into a wide U-shaped one with steep sides and a flat floor. When the glacier finally melts, it leaves behind ridges of rock and soil called moraines, which mark how far the ice once reached.',
    note: 'Fíjate en los pares que describen el valle ("the bottom and sides") y en el participio "frozen into its base", que funciona como adjetivo detrás de "rocks".',
  },
  {
    id: 'f08-rd-cw-metal-fatigue',
    form: 8,
    section: 'reading',
    task: 'complete-words',
    title: 'Why Metal Parts Fatigue',
    topic: 'engineering',
    difficulty: 'hard',
    text:
      "Metal fatigue is the gradual weakening of a material that is subjected to repeated cycles of stress. Although {{ea|ch}} individual {{lo|ad}} may {{b|e}} far {{sma|ller}} than {{t|he}} material's {{ulti|mate}} strength, {{micro|scopic}} cracks {{grad|ually}} develop {{aro|und}} tiny {{def|ects}} or sharp corners where stress becomes concentrated. With every additional cycle, these cracks grow a little longer, until the remaining cross-section can no longer carry the load and the part suddenly fractures. For this reason, engineers carefully estimate how many load cycles a component will experience and inspect aircraft and bridges regularly for early signs of cracking.",
    note: 'Las comparaciones "far smaller than" exigen el comparativo en -er. Vocabulario técnico útil: "ultimate strength" (resistencia máxima), "defects" (defectos) y el adverbio "gradually".',
  },

  // ---------- Read in Daily Life ----------
  {
    id: 'f08-rd-dl-community-classes',
    form: 8,
    section: 'reading',
    task: 'daily-life',
    genre: 'schedule',
    title: 'Community Center Class Timetable',
    topic: 'daily-life',
    difficulty: 'easy',
    header: ['Maple Grove Community Center — Weekly Classes'],
    text:
      'MONDAY & WEDNESDAY\n6:00–7:00 p.m. — Gentle Yoga (Studio A). Mats provided.\n\nTUESDAY\n7:00–9:00 p.m. — Beginner Pottery (Craft Room). $5 materials fee.\n\nTHURSDAY\n4:00–5:30 p.m. — Chess Club for Teens (Library Corner)\n6:30–8:00 p.m. — Chess Club for Adults (Library Corner)\n\nSATURDAY\n9:00–10:00 a.m. — Morning Yoga (Studio A). Bring your own mat.\n\nClasses are free for members; non-members pay $4 per visit. Pottery is limited to 12 people, so sign up at the front desk by noon the day before.',
    questions: [
      {
        id: 'f08-rd-dl-community-classes-q1',
        kind: 'single',
        skill: 'detail',
        prompt: 'What is true about the Saturday yoga class?',
        options: [
          'It takes place in the Craft Room.',
          'It lasts for two full hours.',
          'Participants must bring a mat.',
          'It is offered only to teenagers.',
        ],
        answer: [2],
        explanation:
          'En la línea del sábado se lee "Morning Yoga (Studio A). Bring your own mat." La opción del Craft Room confunde la sala de cerámica con la de yoga, que es "Studio A"; además la clase dura una hora (9:00–10:00).',
      },
      {
        id: 'f08-rd-dl-community-classes-q2',
        kind: 'single',
        skill: 'inference',
        prompt: 'What should a person who wants to join the Tuesday pottery class probably do?',
        options: [
          'Sign up at the front desk by Monday at noon',
          'Pay $4 at the door on Tuesday evening',
          'Bring a mat and a set of their own tools',
          'Arrive early on Tuesday to get one of the 12 places',
        ],
        answer: [0],
        explanation:
          'El horario indica que la cerámica tiene plazas limitadas: "sign up at the front desk by noon the day before". Para el martes, el día anterior es el lunes. Pagar $4 en la puerta no basta, porque hay que inscribirse antes.',
      },
    ],
  },
  {
    id: 'f08-rd-dl-dog-walking',
    form: 8,
    section: 'reading',
    task: 'daily-life',
    genre: 'advertisement',
    title: 'Dog-Walking Service Rates',
    topic: 'daily-life',
    difficulty: 'easy',
    header: ['HAPPY TAILS DOG WALKING'],
    text:
      'Busy day? Let us give your dog the exercise it needs!\n\n• 30-minute walk: $15\n• 60-minute walk: $25\n• Second dog from the same home: add $8\n\nWalks are available Monday to Saturday, 7 a.m. to 6 p.m. We do not work on Sundays or public holidays. All of our walkers are insured and trained in pet first aid. Book a weekly plan of at least three walks and your first 30-minute walk is free! Call or text 555-0148 at least 24 hours in advance.',
    questions: [
      {
        id: 'f08-rd-dl-dog-walking-q1',
        kind: 'single',
        skill: 'detail',
        prompt: 'How much would a 60-minute walk for two dogs from the same home cost?',
        options: ['$25', '$30', '$40', '$33'],
        answer: [3],
        explanation:
          'El paseo de 60 minutos cuesta "$25" y por el segundo perro de la misma casa hay que "add $8": 25 + 8 = 33. La opción $25 es la trampa, porque ignora el suplemento por el segundo perro.',
      },
      {
        id: 'f08-rd-dl-dog-walking-q2',
        kind: 'single',
        skill: 'inference',
        prompt: 'Which customer would most likely receive a free walk?',
        options: [
          'Someone who books one walk on a Sunday',
          'Someone who signs up for three walks a week',
          'Someone who calls a full day in advance',
          'Someone who has two dogs at the same home',
        ],
        answer: [1],
        explanation:
          'El anuncio ofrece el primer paseo gratis a quien reserve "a weekly plan of at least three walks". Llamar con 24 horas de antelación es solo un requisito para reservar, no da derecho a un paseo gratis; y los domingos no hay servicio.',
      },
    ],
  },
  {
    id: 'f08-rd-dl-attendance-memo',
    form: 8,
    section: 'reading',
    task: 'daily-life',
    genre: 'memo',
    title: 'Online Attendance Reporting Memo',
    topic: 'campus-life',
    difficulty: 'medium',
    header: [
      'MEMO',
      'To: All Teaching Faculty',
      'From: Office of the Registrar',
      'Date: August 28',
      'Subject: New online attendance reporting',
    ],
    text:
      'Beginning this fall semester, attendance for all undergraduate courses must be reported through the new ClassTrack system instead of on paper rosters. ClassTrack can be accessed from the faculty portal with your regular university login. Instructors should record attendance within 48 hours of each class meeting.\n\nPlease note that students who miss the first two meetings of a course without contacting the instructor may be dropped to make room for students on the waiting list, so accurate early records are especially important. Graduate seminars are not affected by this change.\n\nTwo optional training sessions will be held in the library computer lab on September 2 and September 4. Faculty who cannot attend may watch a recorded demonstration on the portal.',
    questions: [
      {
        id: 'f08-rd-dl-attendance-memo-q1',
        kind: 'single',
        skill: 'purpose',
        prompt: 'What is the main purpose of the memo?',
        options: [
          'To introduce a new way for instructors to report attendance',
          'To remind students that attendance will affect their grades',
          'To announce changes to the schedule of graduate seminars',
          'To invite faculty members to help design a new computer system',
        ],
        answer: [0],
        explanation:
          'Desde la primera frase el memorando explica que la asistencia "must be reported through the new ClassTrack system instead of on paper rosters". Los seminarios de posgrado se mencionan, pero solo para decir que "are not affected".',
      },
      {
        id: 'f08-rd-dl-attendance-memo-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'According to the memo, why are early attendance records especially important?',
        options: [
          'They are used to calculate final course grades.',
          'They decide which training session each instructor attends.',
          'They may be used to free seats for waitlisted students.',
          'They must be submitted on paper before September 2.',
        ],
        answer: [2],
        explanation:
          'Los estudiantes que faltan a las dos primeras clases "may be dropped to make room for students on the waiting list, so accurate early records are especially important". El texto no relaciona la asistencia con las notas finales.',
      },
      {
        id: 'f08-rd-dl-attendance-memo-q3',
        kind: 'single',
        skill: 'inference',
        prompt: 'What can be inferred about a professor who teaches only graduate seminars?',
        options: [
          'She must attend one of the two training sessions.',
          'She should record attendance within 48 hours.',
          'She will need to request a new university login.',
          'She does not need to start using ClassTrack.',
        ],
        answer: [3],
        explanation:
          'El nuevo sistema es para "all undergraduate courses" y el memorando aclara que "Graduate seminars are not affected by this change". La regla de las 48 horas solo se aplica a quien usa ClassTrack, y las sesiones de formación son "optional".',
      },
    ],
  },
  {
    id: 'f08-rd-dl-writing-center',
    form: 8,
    section: 'reading',
    task: 'daily-life',
    genre: 'webpage',
    title: 'Writing Center Booking Policy',
    topic: 'campus-life',
    difficulty: 'medium',
    header: ['Campus Writing Center — Book a Tutoring Session'],
    text:
      'Our peer tutors can help with any stage of the writing process, from brainstorming to final revisions. Sessions last 45 minutes and are free for all enrolled students. To book, log in to the online scheduler and choose an open time slot; you may hold up to two appointments per week. Please upload a draft or your assignment sheet at least two hours before your session so that your tutor can prepare.\n\nCancellation policy: If you cannot attend, cancel through the scheduler at least four hours in advance. Students who miss two appointments without cancelling will lose online booking privileges for the rest of the semester, although they may still use our drop-in hours (Monday–Thursday, 3–5 p.m.). Please note that tutors will not proofread or edit papers for you; instead, they will help you learn to revise your own work.',
    questions: [
      {
        id: 'f08-rd-dl-writing-center-q1',
        kind: 'single',
        skill: 'detail',
        prompt: 'According to the page, what should students do before a session?',
        options: [
          'Pay a small fee at the front desk',
          'Upload a draft or the assignment sheet',
          'Choose a tutor from their own department',
          'Confirm the appointment by telephone',
        ],
        answer: [1],
        explanation:
          'La página pide: "Please upload a draft or your assignment sheet at least two hours before your session". No hay tarifa, porque las sesiones "are free for all enrolled students".',
      },
      {
        id: 'f08-rd-dl-writing-center-q2',
        kind: 'single',
        skill: 'inference',
        prompt: 'What would most likely happen to a student who misses two sessions without cancelling?',
        options: [
          'She would have to pay for all future sessions.',
          'She would be banned from the center completely.',
          'She would be limited to one appointment a week.',
          'She could get help only during drop-in hours.',
        ],
        answer: [3],
        explanation:
          'Quien falte dos veces sin cancelar "will lose online booking privileges", aunque "they may still use our drop-in hours". Por eso la opción de la prohibición total es incorrecta: todavía puede acudir sin cita.',
      },
      {
        id: 'f08-rd-dl-writing-center-q3',
        kind: 'single',
        skill: 'vocabulary',
        highlight: 'hold',
        prompt: 'The word "hold" in the text is closest in meaning to',
        options: ['have', 'carry', 'delay', 'grip'],
        answer: [0],
        explanation:
          'En "you may hold up to two appointments per week", "hold" significa tener o mantener reservadas (have). "Carry" y "grip" son sentidos físicos de "hold" que no encajan con citas.',
      },
    ],
  },
  {
    id: 'f08-rd-dl-catering-menu',
    form: 8,
    section: 'reading',
    task: 'daily-life',
    genre: 'menu',
    title: 'Green Fork Catering Menu',
    topic: 'daily-life',
    difficulty: 'hard',
    header: ['GREEN FORK CATERING — Event Menu (prices per person)'],
    text:
      'PACKAGES\nClassic Buffet — $18: roasted chicken, rice pilaf, garden salad, bread rolls. Minimum 20 guests.\nDeluxe Buffet — $26: grilled salmon or beef, two side dishes, salad, dessert. Minimum 30 guests.\nLunch Boxes — $12: sandwich, fruit, cookie. Minimum 15 boxes.\n\nADD-ONS\nCoffee and tea service — $3\nDessert table (Classic Buffet only) — $5\n\nDIETARY SUBSTITUTIONS\nVegetarian or vegan main dishes may replace any meat or fish at no extra charge. Gluten-free versions cost an additional $2 per person. We cannot guarantee a nut-free kitchen. Please request all substitutions when you place your order; changes made less than 72 hours before the event cost $4 for each meal changed.\n\nOrders below the minimum may be accepted with a $50 small-event fee. A 15% deposit is required to confirm any booking.',
    questions: [
      {
        id: 'f08-rd-dl-catering-menu-q1',
        kind: 'single',
        skill: 'detail',
        prompt:
          'A customer orders the Classic Buffet for 25 guests and adds the dessert table and coffee service for everyone. What is the cost per person?',
        options: ['$21', '$23', '$26', '$29'],
        answer: [2],
        explanation:
          'El "Classic Buffet" cuesta $18, la mesa de postres $5 y el servicio de café $3: 18 + 5 + 3 = 26. Con 25 invitados se supera el mínimo de 20, así que no hay recargo. $23 olvida el café y $21 olvida los postres.',
      },
      {
        id: 'f08-rd-dl-catering-menu-q2',
        kind: 'single',
        skill: 'inference',
        prompt: 'What is suggested about a group of 12 people who want the Deluxe Buffet?',
        options: [
          'They cannot order any package from Green Fork.',
          'They might be served if they pay an extra fee.',
          'They must order lunch boxes for the event instead.',
          'They will receive coffee and tea at no charge.',
        ],
        answer: [1],
        explanation:
          'El Deluxe exige 30 invitados, pero el menú dice: "Orders below the minimum may be accepted with a $50 small-event fee". "May" indica posibilidad, por eso "might be served". La primera opción es demasiado absoluta.',
      },
      {
        id: 'f08-rd-dl-catering-menu-q3',
        kind: 'single',
        skill: 'detail',
        prompt:
          'Two days before an event, a customer asks to change five chicken meals to vegetarian ones. What will happen?',
        options: [
          'The change will be refused because it is late.',
          'The change will be made at no extra charge.',
          'The customer will pay $2 for each changed meal.',
          'The customer will pay $4 for each changed meal.',
        ],
        answer: [3],
        explanation:
          'Dos días son 48 horas, menos de 72, y el menú indica que "changes made less than 72 hours before the event cost $4 for each meal changed". La opción "no extra charge" es la trampa: solo es gratis si se pide al hacer el pedido. $2 es el precio de la versión sin gluten.',
      },
    ],
  },

  // ---------- Read an Academic Passage ----------
  {
    id: 'f08-rd-ap-wildlife-corridors',
    form: 8,
    section: 'reading',
    task: 'academic-passage',
    title: 'Corridors for Fragmented Habitats',
    topic: 'environment',
    difficulty: 'easy',
    paragraphs: [
      'When forests, grasslands, and wetlands are cut apart by roads, farms, and cities, the habitat that remains is divided into small, isolated patches. This process, known as habitat fragmentation, is one of the main threats to wildlife today. Animals living in a small patch may not find enough food or mates, and they cannot easily move away when conditions change.',
      'One way to reduce this problem is to build wildlife corridors. A corridor is a strip of natural habitat that links two or more larger areas, allowing animals to travel safely between them. Corridors can be as simple as a line of trees along a river or as large as a protected valley many kilometers long. Where busy highways divide habitats, engineers may construct overpasses covered with soil and plants, or tunnels beneath the road, so that animals can cross without being hit by cars.',
      'Corridors benefit wildlife in several ways. By connecting populations, they allow animals to breed with individuals from other groups, which increases genetic diversity and makes populations healthier. They also give species a route to escape fires or floods and, over longer periods, to shift their ranges as the climate warms. In Banff National Park in Canada, crossings over and under the Trans-Canada Highway have been used by bears, elk, wolves, and many other animals, and collisions with vehicles have dropped sharply.',
      'Corridors are not a perfect solution, however. They can be expensive to build, and a narrow corridor may also help invasive species or diseases spread. For this reason, scientists study how particular animals move before deciding where corridors should be placed and how wide they need to be.',
    ],
    questions: [
      {
        id: 'f08-rd-ap-wildlife-corridors-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'What is the passage mainly about?',
        options: [
          'The reasons highways are built through national parks',
          'How linking separated habitats can help wildlife',
          'Why invasive species spread faster than native ones',
          'The history of a famous national park in Canada',
        ],
        answer: [1],
        explanation:
          'El texto presenta la fragmentación del hábitat y explica cómo los "wildlife corridors" que "links two or more larger areas" ayudan a los animales, además de sus límites. Banff es solo un ejemplo del párrafo 3, no el tema central.',
      },
      {
        id: 'f08-rd-ap-wildlife-corridors-q2',
        kind: 'single',
        skill: 'vocabulary',
        paragraph: 0,
        highlight: 'isolated',
        prompt: 'The word "isolated" in paragraph 1 is closest in meaning to',
        options: ['crowded', 'protected', 'damaged', 'separated'],
        answer: [3],
        explanation:
          '"Isolated patches" son fragmentos aislados, separados unos de otros ("cut apart by roads, farms, and cities"). "Damaged" es tentador porque el hábitat está afectado, pero la palabra se refiere a la separación, no al daño.',
      },
      {
        id: 'f08-rd-ap-wildlife-corridors-q3',
        kind: 'single',
        skill: 'detail',
        paragraph: 1,
        prompt: 'According to paragraph 2, how do engineers help animals cross busy highways?',
        options: [
          'By building planted bridges or tunnels under roads',
          'By lowering the speed limits near large forests',
          'By putting fences along both sides of rivers',
          'By moving animals to larger protected valleys',
        ],
        answer: [0],
        explanation:
          'El párrafo 2 dice que los ingenieros "may construct overpasses covered with soil and plants, or tunnels beneath the road". El "protected valley" aparece en el texto, pero como ejemplo de corredor, no como solución para cruzar carreteras.',
      },
      {
        id: 'f08-rd-ap-wildlife-corridors-q4',
        kind: 'single',
        skill: 'inference',
        paragraph: 2,
        prompt: 'What can be inferred from paragraph 3 about animal populations that remain isolated?',
        options: [
          'They usually move to warmer areas over time.',
          'They tend to be larger than connected populations.',
          'They are likely to have lower genetic diversity.',
          'They are well protected from fires and floods.',
        ],
        answer: [2],
        explanation:
          'Si conectar poblaciones permite criar con otros grupos, lo que "increases genetic diversity", se deduce que las poblaciones aisladas tienen menos diversidad genética. La opción de los incendios es lo contrario: los corredores dan "a route to escape fires or floods".',
      },
      {
        id: 'f08-rd-ap-wildlife-corridors-q5',
        kind: 'single',
        skill: 'negative-factual',
        paragraph: 3,
        prompt: 'According to paragraph 4, all of the following are possible drawbacks of corridors EXCEPT',
        options: [
          'high construction costs',
          'more collisions with vehicles',
          'the spread of invasive species',
          'the spread of diseases',
        ],
        answer: [1],
        explanation:
          'El párrafo 4 menciona que son "expensive to build" y que pueden ayudar a que "invasive species or diseases spread". Las colisiones no son un inconveniente; según el párrafo 3, en Banff "collisions with vehicles have dropped sharply".',
      },
    ],
  },
  {
    id: 'f08-rd-ap-classical-conditioning',
    form: 8,
    section: 'reading',
    task: 'academic-passage',
    title: "Pavlov's Conditioned Reflexes",
    topic: 'psychology',
    difficulty: 'medium',
    paragraphs: [
      'In the 1890s, the Russian physiologist Ivan Pavlov was studying digestion in dogs when he noticed something unexpected. His dogs began to salivate not only when food was placed in their mouths but also when they saw the laboratory assistant who usually fed them. Pavlov realized that the dogs had learned to connect the assistant with food. This observation led him to investigate a basic form of learning that is now called classical conditioning.',
      'Pavlov’s experiments followed a simple pattern. Before training, food naturally caused salivation; he called the food an unconditioned stimulus and the salivation an unconditioned response, because no learning was required. A neutral stimulus, such as the sound of a metronome, produced no salivation on its own. Pavlov then presented the sound just before giving the dogs food, repeating this pairing many times. Eventually, the sound alone caused the dogs to salivate. At that point, the sound had become a conditioned stimulus, and the salivation it produced was a conditioned response.',
      'Pavlov also discovered that learned associations can change. If the sound was repeatedly presented without food, salivation gradually weakened and finally stopped, a process known as extinction. However, the response was not completely erased. After a rest period, the sound could again produce some salivation, an effect called spontaneous recovery. Pavlov further found that dogs often responded to sounds similar to the original one, which is known as generalization.',
      'Classical conditioning helps explain many everyday reactions in humans. A person who once became ill after eating a certain food may feel sick simply at its smell, and some fears appear to develop when a harmless object becomes associated with a frightening experience. Because such associations are learned, therapists can use the principle of extinction to help people reduce unwanted fears by exposing them gradually to the feared object in a safe setting.',
    ],
    questions: [
      {
        id: 'f08-rd-ap-classical-conditioning-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'What is the passage mainly about?',
        options: [
          'How Pavlov discovered a type of learning and how it works',
          'Why dogs produce saliva during the process of digestion',
          'The life and scientific career of a Russian physiologist',
          'Methods that therapists use to treat people with allergies',
        ],
        answer: [0],
        explanation:
          'El pasaje explica cómo Pavlov descubrió "a basic form of learning that is now called classical conditioning", su funcionamiento, la extinción y sus aplicaciones. La digestión es solo el contexto inicial del descubrimiento.',
      },
      {
        id: 'f08-rd-ap-classical-conditioning-q2',
        kind: 'single',
        skill: 'detail',
        paragraph: 1,
        prompt: 'According to paragraph 2, what happened after the sound and the food had been paired many times?',
        options: [
          'The dogs stopped salivating when food was given.',
          'The dogs ignored the sound of the metronome.',
          'The dogs salivated when they heard only the sound.',
          'The dogs became afraid of the laboratory assistant.',
        ],
        answer: [2],
        explanation:
          'Tras repetir el emparejamiento, "Eventually, the sound alone caused the dogs to salivate". Ignorar el sonido describe la situación antes del entrenamiento, cuando era un estímulo neutro.',
      },
      {
        id: 'f08-rd-ap-classical-conditioning-q3',
        kind: 'single',
        skill: 'vocabulary',
        paragraph: 2,
        highlight: 'erased',
        prompt: 'The word "erased" in paragraph 3 is closest in meaning to',
        options: ['repeated', 'weakened', 'delayed', 'removed'],
        answer: [3],
        explanation:
          '"Not completely erased" significa que la respuesta no se eliminó del todo (removed): por eso reaparece en la "spontaneous recovery". "Weakened" es tentador porque aparece en la frase anterior, pero debilitar no es borrar.',
      },
      {
        id: 'f08-rd-ap-classical-conditioning-q4',
        kind: 'single',
        skill: 'inference',
        paragraph: 3,
        prompt: 'What can be inferred from paragraph 4 about the therapy described there?',
        options: [
          'It requires patients to relive their original frightening experience.',
          'It presents the feared object without anything harmful happening.',
          'It is effective only for fears that began during early childhood.',
          'It trains people to link the feared object with a pleasant meal.',
        ],
        answer: [1],
        explanation:
          'La terapia usa "the principle of extinction" y expone a la persona al objeto temido "in a safe setting". Como la extinción consiste en presentar el estímulo sin la consecuencia, se deduce que el objeto aparece sin que ocurra nada malo. El texto no habla de revivir la experiencia original.',
      },
      {
        id: 'f08-rd-ap-classical-conditioning-q5',
        kind: 'single',
        skill: 'purpose',
        paragraph: 3,
        prompt: 'Why does the author mention a person who became ill after eating a certain food?',
        options: [
          'To give an example of conditioning in everyday life',
          'To show that Pavlov also experimented on humans',
          'To explain why some foods cause stomach problems',
          'To argue that extinction does not work for people',
        ],
        answer: [0],
        explanation:
          'El párrafo 4 empieza: "Classical conditioning helps explain many everyday reactions in humans", y el ejemplo de la comida ilustra esa idea. El texto nunca dice que Pavlov experimentara con personas.',
      },
    ],
  },
  {
    id: 'f08-rd-ap-market-for-lemons',
    form: 8,
    section: 'reading',
    task: 'academic-passage',
    title: "Akerlof's Market for Lemons",
    topic: 'economics',
    difficulty: 'hard',
    paragraphs: [
      'In many markets, one side of a transaction knows more than the other. Economists call this situation asymmetric information. A seller of a used car, for example, usually knows whether the vehicle has been reliable or has a history of mechanical problems, while a buyer can only guess from a brief inspection and a test drive. In a famous 1970 paper titled "The Market for \'Lemons,\'" the economist George Akerlof showed that such differences in knowledge can cause a market to perform very poorly, or even to collapse.',
      'Akerlof’s argument begins with the buyer’s dilemma. Suppose that half of the used cars on sale are good and half are "lemons," an American slang term for defective cars. Because buyers cannot tell them apart, they are willing to pay only an average price, somewhere between the value of a good car and that of a lemon. For owners of lemons, this price is attractive, but owners of good cars find it too low and decide to keep their vehicles rather than sell them.',
      'This withdrawal sets off a chain reaction. As good cars leave the market, the share of lemons rises, so buyers sensibly lower the price they are willing to pay. The lower price then drives even more owners of good cars away. In the extreme case, only lemons remain for sale, and many transactions that would have benefited both buyers and sellers never take place. Economists refer to this process as adverse selection: the products of lowest quality are the ones most likely to be offered.',
      'Markets have developed several ways to reduce the problem. Sellers can offer warranties, which signal confidence in quality because a seller of a lemon would expect to pay for frequent repairs. Dealers build reputations that they do not want to lose, and independent inspection services allow buyers to learn more before they pay. The same logic applies far beyond cars; it helps explain why health insurers worry that the people who expect high medical costs are the most eager to buy coverage. Akerlof later shared the 2001 Nobel Prize in economics for this work on markets with asymmetric information.',
    ],
    questions: [
      {
        id: 'f08-rd-ap-market-for-lemons-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'Which of the following best expresses the main idea of the passage?',
        options: [
          'Used-car dealers usually earn more profit than private sellers.',
          'Buyers of used cars should always pay an independent mechanic.',
          'Health insurance markets work more efficiently than car markets.',
          'Unequal knowledge between buyers and sellers can damage markets.',
        ],
        answer: [3],
        explanation:
          'La idea central aparece en el párrafo 1: "such differences in knowledge can cause a market to perform very poorly, or even to collapse"; el resto desarrolla el mecanismo y las soluciones. Las inspecciones independientes son solo una de las soluciones del párrafo 4.',
      },
      {
        id: 'f08-rd-ap-market-for-lemons-q2',
        kind: 'single',
        skill: 'detail',
        paragraph: 1,
        prompt: 'According to paragraph 2, why do owners of good cars decide not to sell them?',
        options: [
          'Buyers usually refuse to test-drive cars that look old.',
          'The average price offered is below what their cars are worth.',
          'They worry that their own cars might turn out to be lemons.',
          'Dealers charge them high fees for inspections and repairs.',
        ],
        answer: [1],
        explanation:
          'Los compradores pagan "only an average price", y los dueños de coches buenos "find it too low and decide to keep their vehicles". La opción de que temen que su coche resulte ser un "lemon" es incorrecta porque los vendedores sí conocen la calidad de su coche.',
      },
      {
        id: 'f08-rd-ap-market-for-lemons-q3',
        kind: 'single',
        skill: 'vocabulary',
        paragraph: 2,
        highlight: 'withdrawal',
        prompt: 'The word "withdrawal" in paragraph 3 is closest in meaning to',
        options: ['repair', 'inspection', 'removal', 'discount'],
        answer: [2],
        explanation:
          '"This withdrawal" se refiere a que los dueños retiran sus buenos coches del mercado ("keep their vehicles rather than sell them"; "good cars leave the market"), es decir, una retirada (removal). "Discount" es tentador porque se habla de precios, pero no es el significado.',
      },
      {
        id: 'f08-rd-ap-market-for-lemons-q4',
        kind: 'single',
        skill: 'inference',
        prompt:
          'Based on paragraphs 2 and 3, what would most likely happen if buyers could easily judge the quality of every used car?',
        options: [
          'Owners of good cars would be more willing to sell them.',
          'The share of lemons offered for sale would keep rising.',
          'Buyers would still pay only an average price for any car.',
          'Good cars and lemons would end up selling for the same price.',
        ],
        answer: [0],
        explanation:
          'El problema surge "Because buyers cannot tell them apart" y pagan un precio medio que los dueños de coches buenos consideran "too low". Si se pudiera juzgar la calidad, los coches buenos se pagarían según su valor y sus dueños estarían dispuestos a venderlos. Las demás opciones describen justamente lo que ocurre sin esa información.',
      },
      {
        id: 'f08-rd-ap-market-for-lemons-q5',
        kind: 'single',
        skill: 'purpose',
        paragraph: 3,
        prompt: 'Why does the author mention health insurers in paragraph 4?',
        options: [
          'To describe a market in which adverse selection cannot occur',
          'To explain how car dealers set the price of their warranties',
          'To show that the same problem also appears in other markets',
          'To argue that insurance is more profitable than selling cars',
        ],
        answer: [2],
        explanation:
          'La frase empieza "The same logic applies far beyond cars", y el ejemplo de los seguros médicos lo demuestra. La primera opción dice lo contrario: el seguro es un caso donde el problema sí aparece.',
      },
    ],
  },
  {
    id: 'f08-rd-ap-dramaturgical-approach',
    form: 8,
    section: 'reading',
    task: 'academic-passage',
    title: "Goffman's Dramaturgical Approach",
    topic: 'sociology',
    difficulty: 'hard',
    paragraphs: [
      'In The Presentation of Self in Everyday Life, a book first published in 1956, the sociologist Erving Goffman proposed that social interaction can be understood by comparing it to a theatrical performance. According to this dramaturgical approach, people constantly manage the impressions that others form of them, much as actors try to convince an audience that the characters they play are real. Goffman did not claim that people are simply dishonest. Rather, he argued that presenting a particular version of oneself is a normal and necessary part of social life.',
      'A central idea in Goffman’s framework is the distinction between the front stage and the back stage. The front stage is any setting in which a person performs for an audience and follows the expectations attached to a role. A waiter in a restaurant, for instance, is polite and attentive in the dining room, where customers can see him. In the kitchen, which serves as the back stage, the same waiter may joke with coworkers, complain about difficult customers, and relax his posture. The back stage allows performers to rest, prepare, and drop the role temporarily.',
      'Performances often depend on cooperation. Goffman used the term "team" for a group of people who work together to maintain a shared impression, such as the staff of a store or the members of a family entertaining guests. Each member relies on the others not to reveal information that would contradict the performance. Audiences cooperate too: when a speaker makes a small error, listeners frequently pretend not to notice, a form of what Goffman called tact. In this way, both performers and observers help to protect the definition of the situation that everyone has accepted.',
      'The dramaturgical approach has been influential, but it has also been criticized. Some scholars argue that it presents people as calculating manipulators and pays too little attention to sincere emotion. Others note that it describes how interaction works without fully explaining why particular roles and expectations exist in the first place. Nevertheless, the concepts of impression management and of front and back stages remain widely used, and researchers have applied them to new settings, including the carefully selected images that people share on social media.',
    ],
    questions: [
      {
        id: 'f08-rd-ap-dramaturgical-approach-q1',
        kind: 'single',
        skill: 'organization',
        prompt: 'Which of the following best describes the organization of the passage?',
        options: [
          'A theory is compared with two rival theories, and one is chosen.',
          'A historical event is described, and its causes are analyzed.',
          'A perspective is introduced, its concepts explained, and its limits noted.',
          'A social problem is identified, and several possible solutions are evaluated.',
        ],
        answer: [2],
        explanation:
          'El párrafo 1 presenta el enfoque dramatúrgico, los párrafos 2 y 3 explican sus conceptos ("front stage", "back stage", "team", "tact") y el párrafo 4 señala que "it has also been criticized". No se compara con teorías rivales.',
      },
      {
        id: 'f08-rd-ap-dramaturgical-approach-q2',
        kind: 'single',
        skill: 'detail',
        paragraph: 1,
        prompt: 'According to paragraph 2, what is the function of the back stage?',
        options: [
          'It lets people relax and step out of their role for a while.',
          'It is where performers try hardest to impress an audience.',
          'It allows customers to see how a restaurant really operates.',
          'It is the place where social roles are first created.',
        ],
        answer: [0],
        explanation:
          'El párrafo 2 dice: "The back stage allows performers to rest, prepare, and drop the role temporarily". Impresionar al público es lo que ocurre en el "front stage", no en el back stage.',
      },
      {
        id: 'f08-rd-ap-dramaturgical-approach-q3',
        kind: 'single',
        skill: 'vocabulary',
        paragraph: 2,
        highlight: 'contradict',
        prompt: 'The word "contradict" in paragraph 3 is closest in meaning to',
        options: ['agree with', 'go against', 'make public', 'account for'],
        answer: [1],
        explanation:
          'Los miembros del equipo no deben revelar información que "would contradict the performance", es decir, que entraría en conflicto con ella y la desmentiría. "Reveal" aparece en la misma frase, pero es el verbo que acompaña a "information", no un sinónimo de "contradict".',
      },
      {
        id: 'f08-rd-ap-dramaturgical-approach-q4',
        kind: 'single',
        skill: 'reference',
        paragraph: 2,
        highlight: 'the others',
        prompt: 'The phrase "the others" in paragraph 3 refers to',
        options: [
          'guests of the family',
          'members of the audience',
          'customers in a store',
          'fellow team members',
        ],
        answer: [3],
        explanation:
          'En "Each member relies on the others not to reveal information", "the others" son los demás miembros del mismo equipo ("team"). Los invitados y los clientes son el público ante el que actúa el equipo.',
      },
      {
        id: 'f08-rd-ap-dramaturgical-approach-q5',
        kind: 'single',
        skill: 'inference',
        paragraph: 2,
        prompt: 'What can be inferred about a listener who pretends not to notice a speaker’s small error?',
        options: [
          'The listener has not understood what the speaker said.',
          'The listener is a member of the speaker’s own team.',
          'The listener plans to embarrass the speaker later on.',
          'The listener is helping to keep the situation intact.',
        ],
        answer: [3],
        explanation:
          'Fingir no notar el error es "tact", y así "both performers and observers help to protect the definition of the situation". La opción del equipo es tentadora, pero el texto presenta a estos oyentes como "Audiences", distintos del "team".',
      },
    ],
  },
];
