import type { ReadingSet } from '../../../types';

/** Simulación n.º 10 — Reading (contenido original). */
export const sets: ReadingSet[] = [
  // ---------- Complete the Words ----------
  {
    id: 'f10-rd-cw-levers-pulleys',
    form: 10,
    section: 'reading',
    task: 'complete-words',
    title: 'Levers, Pulleys, and Force',
    topic: 'engineering',
    difficulty: 'easy',
    text:
      'Simple machines allow people to lift loads that would otherwise be far too heavy. A lever {{i|s}} a rigid {{b|ar}} that turns {{aro|und}} a fixed {{po|int}} called a fulcrum. {{Wh|en}} the load {{i|s}} placed close {{t|o}} the fulcrum, a {{sm|all}} push on {{t|he}} far {{e|nd}} can raise it. Pulleys work in a similar way. When a rope passes around several wheels, the weight is shared among many sections of rope, so the worker pulls with less force. The cost is distance: the rope must be pulled much farther than the load rises.',
    note: 'Fíjate en las palabras funcionales (is, to, the) y en colocaciones fijas como "fixed point" y "far end". "Small push" contrasta con "heavy load".',
  },
  {
    id: 'f10-rd-cw-acid-rain',
    form: 10,
    section: 'reading',
    task: 'complete-words',
    title: 'How Acid Rain Forms',
    topic: 'environment',
    difficulty: 'medium',
    text:
      'Acid rain forms when pollutants released by burning coal and oil react with water in the atmosphere. Sulfur dioxide {{a|nd}} nitrogen oxides {{com|bine}} with moisture {{t|o}} produce weak {{ac|ids}} that later {{fa|ll}} as rain, snow, or fog. {{Wh|en}} this water {{rea|ches}} lakes, it {{low|ers}} their pH, {{wh|ich}} can kill {{fi|sh}} eggs and the insects that young fish eat. In forests, acid rain strips calcium and other nutrients from the soil, leaving trees weaker and more vulnerable to disease and cold.',
    note: 'Observa la concordancia en presente: "this water reaches", "it lowers" (tercera persona con -s). "Combine with" y "weak acids" son colocaciones habituales en textos científicos.',
  },
  {
    id: 'f10-rd-cw-anchoring',
    form: 10,
    section: 'reading',
    task: 'complete-words',
    title: 'The Anchoring Effect',
    topic: 'psychology',
    difficulty: 'hard',
    text:
      'The anchoring effect is a cognitive bias in which an initial number strongly shapes later estimates, even when that number is obviously irrelevant. In classic {{exper|iments}}, participants who {{fi|rst}} considered an {{arbi|trary}} figure later {{prod|uced}} estimates that {{clus|tered}} around it. Psychologists {{exp|lain}} this pattern {{thr|ough}} insufficient adjustment: people {{be|gin}} at the anchor {{a|nd}} shift away from it, {{b|ut}} usually stop too soon. Notably, the effect appears even among experts such as judges and real estate agents, and simply warning people about it does little to reduce its influence.',
    note: 'El relato de un experimento va en pasado (produced, clustered), pero la explicación general va en presente (explain, begin). "Arbitrary" (arbitrario) es clave en textos sobre sesgos cognitivos.',
  },

  // ---------- Read in Daily Life ----------
  {
    id: 'f10-rd-dl-fire-drill',
    form: 10,
    section: 'reading',
    task: 'daily-life',
    genre: 'notice',
    title: 'Maple Hall Fire Drill',
    topic: 'campus-life',
    difficulty: 'easy',
    header: ['NOTICE TO RESIDENTS — Maple Hall'],
    text:
      'A fire drill will take place in Maple Hall on Wednesday, September 17, at some point between 10:00 a.m. and noon. When the alarm sounds, leave your room immediately, close the door behind you, and use the nearest stairway. Do not use the elevators. Gather on the lawn across from the dining center and wait there until a resident assistant tells you it is safe to return. Residents who are in the shower or asleep must still leave the building. The drill should last about 15 minutes.',
    questions: [
      {
        id: 'f10-rd-dl-fire-drill-q1',
        kind: 'single',
        skill: 'detail',
        prompt: 'Where should residents go after they leave the building?',
        options: [
          'Into the nearby dining center',
          'To the stairway landing outside',
          'To the lawn facing the dining center',
          "To the resident assistant's office",
        ],
        answer: [2],
        explanation:
          'El aviso dice: "Gather on the lawn across from the dining center". La opción del comedor ("dining center") es tentadora porque se menciona, pero solo como referencia: hay que esperar en el césped de enfrente, no dentro.',
      },
      {
        id: 'f10-rd-dl-fire-drill-q2',
        kind: 'single',
        skill: 'inference',
        prompt: 'What is implied about the start time of the drill?',
        options: [
          'Residents will not know the exact time in advance.',
          'It will be posted on the elevator doors that morning.',
          'It depends on the weather on Wednesday morning.',
          'Resident assistants will announce it at 10:00 a.m.',
        ],
        answer: [0],
        explanation:
          'El simulacro será "at some point between 10:00 a.m. and noon", es decir, no se da la hora exacta. La opción de las 10:00 a.m. confunde el inicio del intervalo con un anuncio que el texto no menciona.',
      },
    ],
  },
  {
    id: 'f10-rd-dl-dental-visit',
    form: 10,
    section: 'reading',
    task: 'daily-life',
    genre: 'email',
    title: 'Dental Appointment Confirmation',
    topic: 'daily-life',
    difficulty: 'easy',
    header: ['From: Brightside Dental Care', 'To: Daniel Ortiz', 'Subject: Your appointment on Tuesday, May 6'],
    text:
      'Dear Daniel,\n\nThis email confirms your cleaning and checkup with Dr. Lin on Tuesday, May 6, at 9:30 a.m. Because this is your first visit, please arrive 20 minutes early to complete a health history form and a short insurance form at the front desk. Remember to bring your insurance card and a photo ID. If you need to reschedule, please call us at least 24 hours before your appointment.\n\nSee you soon,\nBrightside Dental Care',
    questions: [
      {
        id: 'f10-rd-dl-dental-visit-q1',
        kind: 'single',
        skill: 'detail',
        prompt: 'Why is Daniel asked to arrive early?',
        options: [
          'To have X-rays taken before his cleaning',
          'To pay for the visit before it begins',
          'To meet Dr. Lin before the checkup',
          'To fill out paperwork at the front desk',
        ],
        answer: [3],
        explanation:
          'Debe llegar antes "to complete a health history form and a short insurance form at the front desk". No se habla de radiografías ni de pagar por adelantado; la tarjeta del seguro se pide, pero no un pago.',
      },
      {
        id: 'f10-rd-dl-dental-visit-q2',
        kind: 'single',
        skill: 'inference',
        prompt: 'What can be inferred about Daniel?',
        options: [
          'He missed an earlier appointment at the office.',
          'He has not been a patient at this office before.',
          'He needs to change his current insurance plan.',
          'He asked to move his visit to a later time.',
        ],
        answer: [1],
        explanation:
          'El correo dice "Because this is your first visit", así que Daniel es un paciente nuevo. La opción de reprogramar es tentadora porque se menciona "reschedule", pero solo como instrucción por si lo necesitara.',
      },
    ],
  },
  {
    id: 'f10-rd-dl-bike-repair',
    form: 10,
    section: 'reading',
    task: 'daily-life',
    genre: 'menu',
    title: 'Bicycle Repair Service Menu',
    topic: 'daily-life',
    difficulty: 'medium',
    header: ['Spoke & Chain Bicycle Repair — Service Menu'],
    text:
      'BASIC TUNE-UP — $45 (ready in 1 day)\nAdjust brakes and gears, inflate tires, lubricate chain, safety check.\n\nSTANDARD TUNE-UP — $85 (ready in 2 days)\nEverything in the Basic, plus wheel straightening and a deep cleaning of the chain and gears.\n\nCOMPLETE OVERHAUL — $160 (ready in 4–5 days)\nBike fully taken apart, cleaned, and rebuilt. Includes new brake pads and cables.\n\nFLAT TIRE REPAIR — $12 per tire (while you wait, about 20 minutes)\n\nPrices cover labor only; replacement parts are extra unless listed above. Students with a valid ID receive 10% off any tune-up. During April and May, please add 2 days to all turnaround times.',
    questions: [
      {
        id: 'f10-rd-dl-bike-repair-q1',
        kind: 'single',
        skill: 'detail',
        prompt: 'Which service includes new brake pads at no extra cost?',
        options: ['The Complete Overhaul', 'The Standard Tune-Up', 'The Basic Tune-Up', 'The Flat Tire Repair'],
        answer: [0],
        explanation:
          'Solo el "Complete Overhaul" dice "Includes new brake pads and cables". El Basic ajusta los frenos ("Adjust brakes"), pero no incluye pastillas nuevas, y las piezas son "extra unless listed above".',
      },
      {
        id: 'f10-rd-dl-bike-repair-q2',
        kind: 'single',
        skill: 'inference',
        prompt: 'A customer brings in a bike for a Standard Tune-Up in early May. When will it probably be ready?',
        options: ['Later the same day', 'In about two days', 'In about four days', 'In about a week'],
        answer: [2],
        explanation:
          'El Standard tarda "ready in 2 days", pero "During April and May, please add 2 days", así que en mayo serán unos cuatro días. "Two days" es la trampa: ignora la condición de abril y mayo.',
      },
      {
        id: 'f10-rd-dl-bike-repair-q3',
        kind: 'single',
        skill: 'detail',
        prompt: 'How much would a student with a valid ID pay for a Basic Tune-Up that needs no new parts?',
        options: ['$45.00', '$35.00', '$44.50', '$40.50'],
        answer: [3],
        explanation:
          'El Basic cuesta "$45" y los estudiantes reciben "10% off any tune-up": 45 − 4,50 = 40,50 dólares. $35.00 resta 10 dólares en lugar del 10 %.',
      },
    ],
  },
  {
    id: 'f10-rd-dl-counseling',
    form: 10,
    section: 'reading',
    task: 'daily-life',
    genre: 'webpage',
    title: 'Counseling Center First Visit',
    topic: 'campus-life',
    difficulty: 'medium',
    header: ['Hollins University Counseling Center — Your First Appointment'],
    text:
      'Scheduling: Currently enrolled students can request a first appointment online through the student portal or by calling 555-0148 during office hours (Monday–Friday, 8:30 a.m.–5:00 p.m.). Most students are offered an appointment within five business days. If you are in crisis, do not wait for a scheduled appointment: walk in during office hours or call our 24-hour support line.\n\nWhat to expect: Your first visit is a 45-minute conversation with a counselor about your concerns and goals. Please arrive 10 minutes early to complete a short questionnaire. Together, you and the counselor will decide on next steps, which may include individual sessions, a group program, or a referral to another campus office. All services are free and confidential.',
    questions: [
      {
        id: 'f10-rd-dl-counseling-q1',
        kind: 'single',
        skill: 'purpose',
        prompt: 'What is the main purpose of the webpage?',
        options: [
          "To list the training and backgrounds of the counselors",
          'To explain how to book and prepare for a first visit',
          "To announce changes to the center's office hours",
          'To promote a new group program for students',
        ],
        answer: [1],
        explanation:
          'Las dos secciones, "Scheduling" y "What to expect", explican cómo pedir la primera cita y qué ocurre en ella. El programa de grupo ("a group program") solo aparece como una posible opción posterior.',
      },
      {
        id: 'f10-rd-dl-counseling-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'According to the webpage, what should a student in crisis do?',
        options: [
          'Request an appointment through the portal',
          'Complete the short questionnaire online',
          'Wait up to five business days for a reply',
          'Go to the center without an appointment',
        ],
        answer: [3],
        explanation:
          'El texto indica "do not wait for a scheduled appointment: walk in during office hours". Pedir cita por el portal es el procedimiento normal, no el indicado para una crisis.',
      },
      {
        id: 'f10-rd-dl-counseling-q3',
        kind: 'single',
        skill: 'vocabulary',
        prompt: 'The word "referral" in the webpage is closest in meaning to',
        options: [
          'a recommendation to use another service',
          "a written report on a student's progress",
          'a fee charged for additional sessions',
          'a reminder about a future appointment',
        ],
        answer: [0],
        explanation:
          '"A referral to another campus office" es una derivación: el consejero recomienda acudir a otro servicio. No puede ser una tarifa, porque el texto dice "All services are free".',
      },
    ],
  },
  {
    id: 'f10-rd-dl-carver-renovation',
    form: 10,
    section: 'reading',
    task: 'daily-life',
    genre: 'memo',
    title: 'Carver Hall Renovation Memo',
    topic: 'campus-life',
    difficulty: 'hard',
    header: [
      'MEMO',
      'To: Science Division faculty, staff, and students',
      'From: Office of Facilities Management',
      'Re: Renovation of Carver Hall',
    ],
    text:
      'Renovation of Carver Hall begins Monday, January 26, and will last about six weeks, closing the building in two phases.\n\nPhase 1 (January 26–February 13): The first and second floors will close. Lectures in Rooms 101–120 will move to the Tanner Building, and chemistry teaching labs will run in the Tanner basement. Faculty offices on these floors will be accessible from 7:00 to 9:00 a.m. only.\n\nPhase 2 (February 16–March 6): The third floor will close, and biology labs will relocate to Room B12 of the library annex. Because the annex has no fume hoods, any lab that requires one will be rescheduled rather than moved; instructors will notify affected students directly.\n\nUpdated room assignments will appear in the online course schedule by January 20. Please direct questions to the Facilities help desk (ext. 4410), not to department offices.',
    questions: [
      {
        id: 'f10-rd-dl-carver-renovation-q1',
        kind: 'single',
        skill: 'inference',
        prompt: 'What is implied about a biology lab that needs a fume hood during Phase 2?',
        options: [
          'It will meet in the Tanner Building basement.',
          'It will be held in Room B12 as usual.',
          'It will take place on a different date.',
          'It will be canceled for the rest of the term.',
        ],
        answer: [2],
        explanation:
          'El memo dice que, como el anexo no tiene campanas, "any lab that requires one will be rescheduled rather than moved": se hará en otra fecha. "Canceled" es la trampa: reprogramar no es cancelar.',
      },
      {
        id: 'f10-rd-dl-carver-renovation-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'During Phase 1, when can faculty use their offices on the second floor?',
        options: [
          'Only after 5:00 p.m. on weekdays',
          'Only early in the morning',
          'At any time with written permission',
          'Not at all until March 6',
        ],
        answer: [1],
        explanation:
          'En la fase 1, "Faculty offices on these floors will be accessible from 7:00 to 9:00 a.m. only", es decir, solo a primera hora. "March 6" es el final de la fase 2, no una restricción para los despachos.',
      },
      {
        id: 'f10-rd-dl-carver-renovation-q3',
        kind: 'single',
        skill: 'detail',
        prompt: 'According to the memo, how should questions about the renovation be handled?',
        options: [
          'They should go to the department offices.',
          'They should be raised with lab instructors.',
          'They should wait until the schedule is updated.',
          'They should go to the Facilities help desk.',
        ],
        answer: [3],
        explanation:
          'El memo pide "direct questions to the Facilities help desk (ext. 4410), not to department offices". Los instructores solo avisarán a los estudiantes afectados por los laboratorios reprogramados.',
      },
    ],
  },

  // ---------- Read an Academic Passage ----------
  {
    id: 'f10-rd-ap-microfinance',
    form: 10,
    section: 'reading',
    task: 'academic-passage',
    title: 'Microfinance and Small Loans',
    topic: 'economics',
    difficulty: 'easy',
    paragraphs: [
      'In many low-income countries, millions of people want to start or expand small businesses but cannot borrow from banks. Banks usually require collateral, such as land or a house, that they can take if a loan is not repaid. They also find very small loans unprofitable, because the paperwork for a loan of fifty dollars is almost the same as for a loan of fifty thousand. As a result, poor entrepreneurs have often depended on local moneylenders who charge extremely high interest.',
      'Microfinance developed as an alternative. Microfinance institutions offer small loans, often called microloans, to people who have no collateral and no credit history. One of the best-known examples is the Grameen Bank, which grew out of a project begun in Bangladesh in the 1970s and lent mainly to rural women. Borrowers typically use the money to buy items such as a sewing machine, a few animals, or goods for a small shop.',
      "Instead of collateral, many programs rely on group lending. Borrowers form small groups, and each member's access to future loans depends on whether the whole group repays. This arrangement creates social pressure to pay on time and encourages members to help one another. Repayment rates in many programs have been high, often above 90 percent.",
      'However, microfinance is not a complete solution to poverty. Interest rates on microloans remain fairly high, because lenders must cover the cost of managing many tiny accounts. In addition, several studies have found that small loans increase business activity without greatly raising average household incomes. For this reason, many institutions now combine loans with savings accounts, insurance, and training.',
    ],
    questions: [
      {
        id: 'f10-rd-ap-microfinance-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'What is the passage mainly about?',
        options: [
          'Why banks charge more interest than moneylenders',
          'How small loans reach people banks do not serve',
          'How the Grameen Bank was organized and managed',
          'Why group lending has put an end to poverty',
        ],
        answer: [1],
        explanation:
          'El pasaje explica por qué los bancos no prestan a los pobres y cómo las microfinanzas ("small loans… to people who have no collateral") cubren ese vacío. El Grameen Bank es solo un ejemplo, y el párrafo 4 dice que no es "a complete solution to poverty".',
      },
      {
        id: 'f10-rd-ap-microfinance-q2',
        kind: 'single',
        skill: 'detail',
        paragraph: 0,
        prompt: 'According to paragraph 1, why do banks find very small loans unprofitable?',
        options: [
          'Small borrowers usually prefer local moneylenders.',
          'Governments limit the interest banks may charge.',
          'Small loans are rarely used to start businesses.',
          'Processing them costs about as much as large loans.',
        ],
        answer: [3],
        explanation:
          'El párrafo 1 dice que "the paperwork for a loan of fifty dollars is almost the same as for a loan of fifty thousand". Los prestamistas locales se mencionan como consecuencia, no como la causa.',
      },
      {
        id: 'f10-rd-ap-microfinance-q3',
        kind: 'single',
        skill: 'vocabulary',
        paragraph: 1,
        highlight: 'typically',
        prompt: 'The word "typically" in paragraph 2 is closest in meaning to',
        options: ['usually', 'rarely', 'quickly', 'secretly'],
        answer: [0],
        explanation:
          '"Typically" significa "normalmente, por lo general" ("usually"): describe el uso habitual del dinero ("Borrowers typically use the money…"). "Rarely" expresa justo lo contrario.',
      },
      {
        id: 'f10-rd-ap-microfinance-q4',
        kind: 'single',
        skill: 'inference',
        paragraph: 2,
        prompt: 'What can be inferred from paragraph 3 about group lending?',
        options: [
          "Members must repay one another's loans in cash.",
          'Groups are formed by bank employees, not borrowers.',
          'Borrowers have reasons to care whether others repay.',
          'It works only in very small rural villages.',
        ],
        answer: [2],
        explanation:
          'Como "each member\'s access to future loans depends on whether the whole group repays", a cada prestatario le interesa que los demás paguen. El texto no dice que deban pagar las deudas de otros en efectivo, y afirma que "Borrowers form small groups".',
      },
      {
        id: 'f10-rd-ap-microfinance-q5',
        kind: 'single',
        skill: 'purpose',
        paragraph: 3,
        prompt: 'Why does the author mention "savings accounts, insurance, and training" in paragraph 4?',
        options: [
          'To list the costs that make microloans expensive',
          'To show a response to the limits of loans alone',
          'To explain why repayment rates are so high',
          'To give examples of items borrowers often buy',
        ],
        answer: [1],
        explanation:
          'Tras señalar que los préstamos no elevan mucho los ingresos, el autor dice "For this reason, many institutions now combine loans with savings accounts, insurance, and training": es la respuesta a esas limitaciones. Los costes de gestión explican los intereses, no estos servicios.',
      },
    ],
  },
  {
    id: 'f10-rd-ap-gentrification',
    form: 10,
    section: 'reading',
    task: 'academic-passage',
    title: 'How Gentrification Reshapes Neighborhoods',
    topic: 'sociology',
    difficulty: 'medium',
    paragraphs: [
      'Gentrification is the process by which a lower-income urban neighborhood is transformed as wealthier residents and businesses move in. The term was coined in 1964 by the British sociologist Ruth Glass, who observed middle-class households buying and renovating working-class homes in parts of London. Since then, similar changes have been documented in cities around the world, from New York to Berlin.',
      'The process often begins when a neighborhood offers something that more affluent people value, such as historic architecture, a convenient location near the city center, or rents far lower than in surrounding areas. Artists and students are frequently among the first newcomers, attracted by cheap space. As the area gains a reputation as interesting or safe, developers and higher-income buyers follow, and property values rise. New cafés, galleries, and shops appear, often replacing businesses that served long-time residents.',
      'Supporters point out that gentrification can bring real benefits. Renovated buildings and new investment enlarge the local tax base, which may improve public services, and crime rates sometimes fall. Homeowners who already lived in the neighborhood may also see the value of their property increase substantially.',
      'Critics, however, focus on who is able to stay. Renters are especially vulnerable, because landlords can raise rents or sell buildings once demand increases. Long-time residents who are priced out may have to move far from their jobs, schools, and social networks. Even those who remain can feel like outsiders as familiar stores close and the character of the community changes. For this reason, some cities have adopted policies such as rent stabilization and rules requiring new developments to include affordable units, hoping to share the benefits of investment more widely.',
    ],
    questions: [
      {
        id: 'f10-rd-ap-gentrification-q1',
        kind: 'single',
        skill: 'organization',
        prompt: 'How is the passage organized?',
        options: [
          'It compares how gentrification unfolded in London and New York.',
          'It describes a problem and argues that it cannot be solved.',
          'It defines a process, traces its stages, and weighs its effects.',
          'It presents the history of a term and then rejects its use.',
        ],
        answer: [2],
        explanation:
          'El párrafo 1 define el término, el 2 describe cómo avanza el proceso ("The process often begins…") y los párrafos 3 y 4 presentan beneficios ("Supporters") y críticas ("Critics"). Londres y Nueva York solo se mencionan de pasada.',
      },
      {
        id: 'f10-rd-ap-gentrification-q2',
        kind: 'single',
        skill: 'detail',
        paragraph: 1,
        prompt: 'According to paragraph 2, who is often among the first to move into a neighborhood that later gentrifies?',
        options: [
          'Artists and students looking for cheap space',
          'Developers planning new apartment buildings',
          'Wealthy buyers searching for historic houses',
          'Owners of cafés and galleries from downtown',
        ],
        answer: [0],
        explanation:
          'El texto dice "Artists and students are frequently among the first newcomers, attracted by cheap space". Los promotores y compradores ricos llegan después: "developers and higher-income buyers follow".',
      },
      {
        id: 'f10-rd-ap-gentrification-q3',
        kind: 'single',
        skill: 'vocabulary',
        paragraph: 1,
        highlight: 'affluent',
        prompt: 'The word "affluent" in paragraph 2 is closest in meaning to',
        options: ['educated', 'creative', 'elderly', 'wealthy'],
        answer: [3],
        explanation:
          '"Affluent" significa "adinerado" ("wealthy"). El contexto lo confirma: la gentrificación ocurre cuando llegan "wealthier residents" y "higher-income buyers".',
      },
      {
        id: 'f10-rd-ap-gentrification-q4',
        kind: 'single',
        skill: 'inference',
        paragraph: 2,
        prompt: 'Based on paragraphs 3 and 4, which long-time residents are most likely to benefit from gentrification?',
        options: [
          'Renters whose landlords renovate their buildings',
          'Residents who already own their homes',
          'Workers at businesses that later close',
          'Families who move far from their schools',
        ],
        answer: [1],
        explanation:
          'El párrafo 3 dice que "Homeowners who already lived in the neighborhood may also see the value of their property increase", mientras que el 4 indica que "Renters are especially vulnerable". Los inquilinos con edificios renovados pueden sufrir subidas de alquiler.',
      },
      {
        id: 'f10-rd-ap-gentrification-q5',
        kind: 'single',
        skill: 'negative-factual',
        paragraph: 3,
        prompt: 'According to paragraph 4, all of the following are problems that critics associate with gentrification EXCEPT',
        options: [
          'rising crime in the neighborhood',
          'higher rents for tenants',
          'longer trips to jobs and schools',
          'the closing of familiar stores',
        ],
        answer: [0],
        explanation:
          'El párrafo 4 menciona la subida de alquileres ("raise rents"), la distancia a "jobs, schools" y el cierre de "familiar stores". El aumento del crimen no aparece; de hecho, el párrafo 3 dice que "crime rates sometimes fall".',
      },
    ],
  },
  {
    id: 'f10-rd-ap-photography-painting',
    form: 10,
    section: 'reading',
    task: 'academic-passage',
    title: 'Photography and the Purpose of Painting',
    topic: 'art',
    difficulty: 'hard',
    paragraphs: [
      "When the French government announced the daguerreotype process in 1839, many observers predicted the decline of painting. A daguerreotype could record a face or a building in minutes, with a level of detail few painters could match, and it did so mechanically, without years of training. The painter Paul Delaroche is often quoted as declaring, upon seeing one, that 'from today, painting is dead,' although whether he actually said this is uncertain.",
      'The earliest and most immediate effect was felt in portraiture. For generations, small painted portraits known as miniatures had been the main way for middle-class families to preserve the likeness of a relative. Photographic studios offered the same service more cheaply and quickly, and by the 1860s, demand for miniature painters had collapsed in cities such as Paris and London. Many former miniaturists became photographers themselves or earned a living by retouching and coloring photographs.',
      "Yet photography did not simply replace painting; it pushed painters to reconsider what their art was for. If a camera could reproduce appearances, accurate imitation could no longer be painting's chief justification. Some artists responded by emphasizing qualities that the camera of that era lacked, above all color and the visible touch of the artist's hand. The Impressionists, who first exhibited as a group in 1874, set out to capture shifting effects of light and atmosphere, as well as their own fleeting perceptions, using loose brushstrokes that no lens would produce.",
      "The relationship was not purely competitive, however. Many painters used photographs as tools, studying them to reduce the need for long sittings with models. Edgar Degas, who was himself an amateur photographer, composed scenes in which figures are abruptly cut off at the edges, a framing that resembles a casual snapshot. Eadweard Muybridge's photographic studies of horses in motion, published in the late 1870s, even showed that painters had depicted galloping horses incorrectly for centuries. By the end of the century, painting was increasingly valued not as a record of the visible world but as an expression of the artist's personal vision, a shift that helped prepare the way for modern art.",
    ],
    questions: [
      {
        id: 'f10-rd-ap-photography-painting-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'Which of the following best expresses the main idea of the passage?',
        options: [
          'Photography ended the careers of most nineteenth-century painters.',
          'The Impressionists were the first artists to work from photographs.',
          'Early photographs were valued mainly for accuracy and low cost.',
          'Photography led painting to move its purpose away from imitation.',
        ],
        answer: [3],
        explanation:
          'La tesis aparece en el párrafo 3 ("it pushed painters to reconsider what their art was for") y se cierra en el 4: la pintura pasó a valorarse "not as a record of the visible world but as an expression of the artist\'s personal vision". Solo los miniaturistas perdieron su oficio, no la mayoría de los pintores.',
      },
      {
        id: 'f10-rd-ap-photography-painting-q2',
        kind: 'single',
        skill: 'detail',
        paragraph: 1,
        prompt: 'According to paragraph 2, what happened to many miniature painters after photography spread?',
        options: [
          'They began painting landscapes instead of faces.',
          'They found work in photography or retouching.',
          'They lowered their prices to compete with studios.',
          'They moved from Paris and London to small towns.',
        ],
        answer: [1],
        explanation:
          'El párrafo 2 dice: "Many former miniaturists became photographers themselves or earned a living by retouching and coloring photographs". París y Londres se citan como lugares donde cayó la demanda, no como ciudades que abandonaron.',
      },
      {
        id: 'f10-rd-ap-photography-painting-q3',
        kind: 'single',
        skill: 'vocabulary',
        paragraph: 2,
        highlight: 'fleeting',
        prompt: 'The word "fleeting" in paragraph 3 is closest in meaning to',
        options: ['vivid', 'shared', 'brief', 'careful'],
        answer: [2],
        explanation:
          '"Fleeting" significa "fugaz, pasajero" ("brief"). Encaja con "shifting effects of light": los impresionistas querían captar impresiones momentáneas. "Vivid" (intenso) es tentador, pero no significa lo mismo.',
      },
      {
        id: 'f10-rd-ap-photography-painting-q4',
        kind: 'single',
        skill: 'inference',
        paragraph: 2,
        prompt: 'What can be inferred from paragraph 3 about photography at that time?',
        options: [
          'It could not reproduce the colors of a scene.',
          'It was too expensive for most painters to use.',
          'It was first developed by Impressionist painters.',
          'It was rejected by art critics in the 1870s.',
        ],
        answer: [0],
        explanation:
          'Los pintores destacaron "qualities that the camera of that era lacked, above all color", de modo que la fotografía de entonces no captaba el color. Nada indica que fuera demasiado cara; el párrafo 4 dice incluso que muchos pintores la usaban como herramienta.',
      },
      {
        id: 'f10-rd-ap-photography-painting-q5',
        kind: 'single',
        skill: 'purpose',
        paragraph: 3,
        prompt: "Why does the author mention Eadweard Muybridge's studies of horses in paragraph 4?",
        options: [
          'To suggest that photographers were more skilled than painters',
          'To explain why Degas decided to become a photographer',
          'To illustrate how photography exposed an error in painting',
          'To argue that animals were a common subject in modern art',
        ],
        answer: [2],
        explanation:
          'Las fotos de Muybridge "showed that painters had depicted galloping horses incorrectly for centuries": son un ejemplo de cómo la fotografía corrigió a la pintura. El texto no compara la habilidad de fotógrafos y pintores ni relaciona a Muybridge con Degas.',
      },
    ],
  },
  {
    id: 'f10-rd-ap-packet-switching',
    form: 10,
    section: 'reading',
    task: 'academic-passage',
    title: 'Packet Switching on the Internet',
    topic: 'technology',
    difficulty: 'hard',
    paragraphs: [
      'Before the internet, long-distance communication relied mainly on circuit switching, the method used by traditional telephone networks. When a call was placed, the network reserved a dedicated path between the two telephones for the entire conversation. This worked well for voice, but it was inefficient for computer data, which tends to travel in short bursts separated by long silences. A reserved circuit sits idle during those silences, wasting capacity that other users could have shared.',
      "Packet switching, developed independently in the 1960s by Paul Baran in the United States and Donald Davies in Britain, takes a different approach. A message is divided into small units called packets, each carrying a portion of the data along with a header that contains information such as the destination address and the packet's position in the sequence. Packets from many different users travel over the same links, interleaved with one another, so the network's capacity is used far more efficiently.",
      "Along the way, devices called routers examine each packet's header and forward it toward its destination, choosing among available links on the basis of routing tables that are continually updated. Because these decisions are made one packet at a time, packets belonging to the same message may follow different routes and arrive out of order. The receiving computer uses the sequence information to reassemble them correctly. If a packet is lost or damaged, protocols such as TCP detect the gap and request that the missing piece be sent again.",
      "This design also made networks more resilient. Baran's original research was motivated by the need for a communications system that could survive damage to parts of the network. Since no single path is essential, routers can simply send traffic around a failed link or an overloaded node. The trade-off is that delivery times can vary, which matters little for e-mail but can cause problems for live video calls; engineers have therefore developed techniques that give time-sensitive packets priority.",
    ],
    questions: [
      {
        id: 'f10-rd-ap-packet-switching-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'What is the passage mainly about?',
        options: [
          'How splitting data into packets changed networks',
          'Why telephone networks still depend on circuit switching',
          'How routers decide which packets should receive priority',
          'Why the internet was designed to survive military attacks',
        ],
        answer: [0],
        explanation:
          'Todo el pasaje explica el "packet switching": su contraste con la conmutación de circuitos, el papel de los routers y sus ventajas e inconvenientes. La prioridad de paquetes y la resistencia a daños son solo detalles del párrafo 4.',
      },
      {
        id: 'f10-rd-ap-packet-switching-q2',
        kind: 'single',
        skill: 'detail',
        paragraph: 0,
        prompt: 'According to paragraph 1, why was circuit switching poorly suited to computer data?',
        options: [
          'It could not carry signals over long distances.',
          'It required computers to use telephone handsets.',
          'Its reserved paths were left unused between bursts.',
          'It divided messages into units that were often lost.',
        ],
        answer: [2],
        explanation:
          'El párrafo 1 explica que los datos viajan "in short bursts separated by long silences" y que "A reserved circuit sits idle during those silences". Dividir mensajes en unidades es precisamente el packet switching, no la conmutación de circuitos.',
      },
      {
        id: 'f10-rd-ap-packet-switching-q3',
        kind: 'single',
        skill: 'vocabulary',
        paragraph: 1,
        highlight: 'interleaved',
        prompt: 'The word "interleaved" in paragraph 2 is closest in meaning to',
        options: ['held back', 'mixed together', 'made smaller', 'kept apart'],
        answer: [1],
        explanation:
          '"Interleaved" significa "intercalados": los paquetes de distintos usuarios viajan "over the same links… with one another", es decir, mezclados. "Kept apart" dice justo lo contrario de lo que afirma el texto.',
      },
      {
        id: 'f10-rd-ap-packet-switching-q4',
        kind: 'single',
        skill: 'inference',
        paragraph: 3,
        prompt: 'What can be inferred from paragraph 4 about live video calls?',
        options: [
          'They are usually sent by circuit switching.',
          'They cannot be carried over packet networks.',
          'They use more capacity than e-mail does.',
          'They suffer more from uneven delivery times.',
        ],
        answer: [3],
        explanation:
          'El texto dice que la variación en los tiempos de entrega "matters little for e-mail but can cause problems for live video calls". No afirma que no puedan viajar por redes de paquetes: los ingenieros les dan prioridad ("give time-sensitive packets priority").',
      },
      {
        id: 'f10-rd-ap-packet-switching-q5',
        kind: 'single',
        skill: 'reference',
        paragraph: 2,
        highlight: 'them',
        prompt: 'The word "them" in paragraph 3 refers to',
        options: ['routers', 'routing tables', 'packets', 'destinations'],
        answer: [2],
        explanation:
          'La frase anterior habla de "packets belonging to the same message" que llegan desordenados; el ordenador receptor los reensambla ("reassemble them"). No se reensamblan routers ni tablas.',
      },
    ],
  },
];
