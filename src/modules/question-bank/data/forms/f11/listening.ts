import type { Difficulty, ListeningSet, Topic, Voice } from '../../../types';

/** Simulación n.º 11 — Listening (contenido original). */
function cr(
  id: string,
  difficulty: Difficulty,
  voice: Voice,
  line: string,
  options: string[],
  answer: number,
  explanation: string,
  topic: Topic = 'campus-life',
): ListeningSet {
  return {
    id,
    form: 11,
    section: 'listening',
    task: 'choose-response',
    title: line.length > 48 ? `${line.slice(0, 45)}…` : line,
    topic,
    difficulty,
    context: 'Listen to the speaker. Choose the best response.',
    script: [{ speaker: voice === 'female' ? 'Woman' : 'Man', voice, text: line }],
    questions: [
      {
        id: `${id}-q1`,
        kind: 'single',
        skill: 'pragmatics',
        prompt: 'Choose the best response.',
        options,
        answer: [answer],
        explanation,
      },
    ],
  };
}

export const sets: ListeningSet[] = [
  // ---------- Choose a Response: easy ----------
  cr('f11-ls-cr-observatory', 'easy', 'female', 'Have you ever been to the observatory on top of the science building?', [
    'The science building closes at six.',
    'Once, on an open night last spring.',
    "I'd love to be an astronomer someday.",
    'It was built about fifty years ago.',
  ], 1, 'Es una pregunta de sí/no sobre una experiencia ("Have you ever been…?"); "Once, on an open night last spring" responde que sí y da un detalle. Las demás hablan del edificio o del observatorio sin contestar si el oyente ha estado allí.'),
  cr('f11-ls-cr-basketball', 'easy', 'male', 'A few of us are playing basketball at the rec center on Saturday morning. Want to join us?', [
    'I played really well last Saturday.',
    'The rec center has two indoor courts.',
    'Yes, they won the game easily.',
    'Sure. What time are you starting?',
  ], 3, 'Es una invitación ("Want to join us?"); lo natural es aceptarla y pedir un detalle ("What time are you starting?"). "I played really well last Saturday" habla del pasado y no responde a la invitación.'),
  cr('f11-ls-cr-quiet-floor', 'easy', 'female', "This café is so noisy. Why don't we study on the library's quiet floor instead?", [
    'Good idea. I can actually focus there.',
    'Because the coffee is too expensive here.',
    'I studied at this café yesterday.',
    'The floor was cleaned this morning.',
  ], 0, '"Why don\'t we…?" es una sugerencia, no una pregunta sobre causas; se acepta con "Good idea". "Because the coffee is too expensive" malinterpreta la función de la frase, y "The floor was cleaned" repite la palabra "floor" sin responder.'),
  cr('f11-ls-cr-late-bus', 'easy', 'male', "Sorry I'm late, everyone. The bus took forever this morning.", [
    "You're welcome. It was no trouble.",
    'The bus stop is across the street.',
    'No problem. We just got started.',
    "I'll be late tomorrow morning too.",
  ], 2, 'Ante una disculpa ("Sorry I\'m late"), la respuesta natural es quitarle importancia: "No problem. We just got started". "You\'re welcome" responde a un agradecimiento, no a una disculpa.'),
  cr('f11-ls-cr-student-center', 'easy', 'female', 'So what do you think of the new student center?', [
    'I think it opens next Monday.',
    "It's right in the center of the campus.",
    'I love it. The study rooms are great.',
    'They built it with student fees.',
  ], 2, 'Se pide una opinión ("What do you think of…?"); "I love it. The study rooms are great" da una valoración y la justifica. "I think it opens next Monday" usa "I think" pero da un dato, no una opinión, y "center of campus" es una trampa de sonido.'),
  cr('f11-ls-cr-internship-news', 'easy', 'female', 'Guess what? I got accepted into the summer internship at the city museum!', [
    "That's wonderful! You must be thrilled.",
    "I'm sorry to hear that. Maybe next year.",
    'The museum is open every summer.',
    'Yes, I accepted their offer yesterday.',
  ], 0, 'Es una buena noticia, así que se felicita: "That\'s wonderful! You must be thrilled". "I\'m sorry to hear that" sería la reacción a una mala noticia, y "I accepted their offer" cambia de persona.'),

  // ---------- Choose a Response: medium ----------
  cr('f11-ls-cr-divide-report', 'medium', 'male', "This report is huge. Why don't we divide it by sections?", [
    "Because it's due next Thursday morning.",
    'The report has five sections.',
    'We divided it into three groups.',
    "Sure. I'll take the methods part.",
  ], 3, 'Es una sugerencia ("Why don\'t we…?"); la respuesta natural la acepta y se ofrece a hacer una parte: "I\'ll take the methods part". "Because it\'s due next Thursday" trata la frase como una pregunta sobre causas, y "We divided it" usa un pasado que no encaja.'),
  cr('f11-ls-cr-due-friday', 'medium', 'female', "When the syllabus says 'due Friday,' does that mean by the start of class or by midnight?", [
    "Yes, it's due on Friday.",
    'Before class, I think. She said so.',
    'Midnight is too late to start writing.',
    'The syllabus is posted on the course page.',
  ], 1, 'Es una pregunta de alternativa ("by the start of class or by midnight?"), así que se elige una opción: "Before class, I think" y se indica la fuente. "Yes, it\'s due on Friday" responde con sí/no, que no sirve para una pregunta de "or".'),
  cr('f11-ls-cr-grading-rubric', 'medium', 'male', 'Honestly, the new grading rubric seems kind of unfair to me.', [
    'Really? Which part bothers you?',
    'Yes, the grades were posted online.',
    "I'll grade the papers this weekend.",
    "It's fair weather this afternoon.",
  ], 0, 'El hablante da una opinión y espera una reacción; "Really? Which part bothers you?" continúa la conversación pidiendo detalles. "Fair weather" es una trampa de sonido con "unfair", y "grade the papers" repite "grading" sin responder.'),
  cr('f11-ls-cr-oral-exam', 'medium', 'female', 'Do you have any tips for preparing for the oral exam?', [
    'The exam is in Room 210.',
    'Yes, I prepared dinner for everyone.',
    'Practice answering out loud with a friend.',
    'The professor gave me a tip after class yesterday.',
  ], 2, 'Se pide un consejo ("any tips"); "Practice answering out loud with a friend" da uno útil. "I prepared dinner" juega con "preparing", y "gave me a tip" repite la palabra "tip" sin ofrecer ningún consejo.'),
  cr('f11-ls-cr-quiz-reminder', 'medium', 'male', "Don't forget, the reading quiz is tomorrow morning.", [
    'The reading room is on the second floor.',
    'I took that quiz last Tuesday.',
    "No, I don't remember his name.",
    "Thanks. I'll review the chapter tonight.",
  ], 3, 'Es un recordatorio; lo natural es agradecerlo y decir qué se hará: "Thanks. I\'ll review the chapter tonight". "I took that quiz last Tuesday" usa el pasado para algo que será mañana.'),
  cr('f11-ls-cr-museum-tuesdays', 'medium', 'female', "The art museum is free on Tuesdays, isn't it?", [
    "Yes, I'm free on Tuesday after my last class.",
    'Yes, but only for students with an ID.',
    "No, it isn't an art class.",
    'I bought a painting there once.',
  ], 1, 'La pregunta coletilla ("isn\'t it?") busca confirmación; "Yes, but only for students with an ID" confirma y añade una condición. "I\'m free on Tuesday" juega con otro sentido de "free" (disponible, no gratis).'),

  // ---------- Choose a Response: hard ----------
  cr('f11-ls-cr-new-restaurant', 'hard', 'male', "The new Thai place? Well, the food was hot, I'll give it that.", [
    "Great! Let's go back there this weekend.",
    'Be careful. Let it cool down first.',
    "So I guess you won't be going back?",
    'Did you give the waiter a good tip?',
  ], 2, '"The food was hot, I\'ll give it that" es un elogio mínimo: lo único bueno era que la comida estaba caliente, lo que implica una opinión negativa. "So I guess you won\'t be going back?" capta esa crítica. "Let\'s go back there" la interpreta como un elogio.', 'daily-life'),
  cr('f11-ls-cr-registrar-lunch', 'hard', 'female', "I was wondering whether the registrar's office stays open over lunch.", [
    'It does, but with only one clerk.',
    'I was there before lunch yesterday.',
    "Yes, I'm staying for lunch too.",
    'The registrar handles transcripts.',
  ], 0, '"I was wondering whether…" es una pregunta indirecta y cortés; equivale a "Does it stay open over lunch?". "It does, but with only one clerk" la responde. "I\'m staying for lunch too" repite "stay" y "lunch" con otro sentido.'),
  cr('f11-ls-cr-small-sample', 'hard', 'male', "I see your point, but isn't the sample kind of small?", [
    'Yes, I can see it clearly from here.',
    'The free samples ran out quickly.',
    "Thanks. I'm glad you agree with me.",
    "True, but it's all the data we had.",
  ], 3, 'Es un desacuerdo suavizado ("I see your point, but…"); lo natural es reconocer la crítica y justificarse: "True, but it\'s all the data we had". "I\'m glad you agree with me" interpreta mal la frase como un acuerdo, y "I can see it" juega con "see".'),
  cr('f11-ls-cr-if-only', 'hard', 'female', "If only I'd started the project last week.", [
    'Great, then you can help me with mine later.',
    'You still have time if you start today.',
    'I started mine last week too.',
    'Only one project is due this week.',
  ], 1, '"If only I\'d started…" expresa arrepentimiento: no empezó a tiempo. La respuesta natural la anima: "You still have time if you start today". "I started mine last week too" supone que ella sí empezó, que es lo contrario de lo que dice.'),
  cr('f11-ls-cr-copy-center', 'hard', 'male', "You still need copies of your handout? I'm heading to the copy center anyway.", [
    'Could you make ten copies for me?',
    'I copied the notes from my friend.',
    'Which way is the center of town?',
    "No, I'm not going anywhere today.",
  ], 0, '"I\'m heading to the copy center anyway" es un ofrecimiento implícito: como va de todos modos, puede hacer las copias. "Could you make ten copies for me?" acepta la oferta. "Center of town" es una trampa de sonido, y "I\'m not going anywhere" responde como si le preguntaran por sus planes.'),
  cr('f11-ls-cr-thunderstorms', 'hard', 'female', "You're biking to the lake today? The forecast says thunderstorms all afternoon.", [
    'Great, the lake will be warm today.',
    'I bought this bike last month.',
    "I'll bring my sunglasses and sunscreen, then.",
    "Then maybe I'll go tomorrow instead.",
  ], 3, 'Mencionar las tormentas es una sugerencia implícita de cambiar de plan. "Then maybe I\'ll go tomorrow instead" muestra que se ha entendido. "I\'ll bring my sunglasses" ignora el aviso del pronóstico.', 'daily-life'),

  // ---------- Conversations ----------
  {
    id: 'f11-ls-cv-off-campus-databases',
    form: 11,
    section: 'listening',
    task: 'conversation',
    title: 'Reaching Journals From Off Campus',
    topic: 'campus-life',
    difficulty: 'easy',
    context: 'Listen to a conversation between a student and a reference librarian.',
    script: [
      { speaker: 'Student', voice: 'female', text: "Hi. I'm writing a paper for my sociology class, and I need some journal articles. But I'm going home for the weekend. Can I use the library databases from there?" },
      { speaker: 'Librarian', voice: 'male', text: "Absolutely. All of our online journals are available off campus. You just have to go through the library's proxy login." },
      { speaker: 'Student', voice: 'female', text: "The proxy login? What's that?" },
      { speaker: 'Librarian', voice: 'male', text: "It's a page that checks that you're a current student. When you click a database link on the library website from home, it asks for your student ID number and your campus password. After that, the database works exactly the way it does here." },
      { speaker: 'Student', voice: 'female', text: 'Oh, that sounds easy. Last night I searched for articles on a regular search engine, and every single one wanted me to pay thirty dollars.' },
      { speaker: 'Librarian', voice: 'male', text: "Right, that happens when you go to the publisher's site directly. The publisher doesn't know you're one of our students. If you always start from the library website, the library pays for your access." },
      { speaker: 'Student', voice: 'female', text: "Good to know. And what if the login doesn't work?" },
      { speaker: 'Librarian', voice: 'male', text: 'Sometimes your browser remembers an old login. Clearing your browser history usually fixes it. Here, take this handout. It has step-by-step instructions with screenshots, and the number for our chat service is at the bottom.' },
      { speaker: 'Student', voice: 'female', text: 'Perfect. Thanks so much.' },
      { speaker: 'Librarian', voice: 'male', text: "You're welcome. Good luck with the paper." },
    ],
    questions: [
      {
        id: 'f11-ls-cv-off-campus-databases-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'Why does the student talk to the librarian?',
        options: [
          'To ask for help choosing a topic for her paper',
          'To find out how to use the databases from home',
          'To complain about a fee she was charged online',
          'To borrow a laptop to use over the weekend',
        ],
        answer: [1],
        explanation:
          'La estudiante pregunta: "Can I use the library databases from there?" porque se va a casa el fin de semana. No le cobraron nada: solo vio que los artículos "wanted me to pay thirty dollars".',
      },
      {
        id: 'f11-ls-cv-off-campus-databases-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'What does the student need in order to use the proxy login?',
        options: [
          "A paid subscription to the publisher's site",
          'A printed copy of the library handout',
          'Her student ID number and campus password',
          "A code from the library's chat service",
        ],
        answer: [2],
        explanation:
          'El bibliotecario explica que la página "asks for your student ID number and your campus password". El folleto y el servicio de chat son ayudas adicionales, no requisitos.',
      },
      {
        id: 'f11-ls-cv-off-campus-databases-q3',
        kind: 'single',
        skill: 'inference',
        prompt: "What can be inferred about the student's search last night?",
        options: [
          'She did not start from the library website.',
          'She typed in the wrong student ID number.',
          'Her browser had saved an old library password.',
          'The articles she needed did not exist.',
        ],
        answer: [0],
        explanation:
          'Los cobros aparecen "when you go to the publisher\'s site directly", y el bibliotecario aconseja "always start from the library website". Por tanto, ella buscó fuera de la web de la biblioteca. El problema del navegador se menciona para otro caso, si el inicio de sesión falla.',
      },
    ],
  },
  {
    id: 'f11-ls-cv-tournament-debate',
    form: 11,
    section: 'listening',
    task: 'conversation',
    title: 'Tournament Conflicts With a Debate',
    topic: 'campus-life',
    difficulty: 'medium',
    context: 'Listen to a conversation between a student and a professor.',
    script: [
      { speaker: 'Student', voice: 'male', text: "Professor Hayes, do you have a minute? I'm on the tennis team, and we just found out we're playing in a tournament in Ohio on the twelfth." },
      { speaker: 'Professor', voice: 'female', text: 'Congratulations. Let me guess. The twelfth is the day of our in-class debate.' },
      { speaker: 'Student', voice: 'male', text: "Exactly. We leave on the eleventh and come back on the fourteenth. I really don't want to lose the points. Is there any way I could do something else instead?" },
      { speaker: 'Professor', voice: 'female', text: "Well, the debate is worth fifteen percent of the grade, and the whole point is to practice responding to arguments on the spot. A written paper wouldn't really test that." },
      { speaker: 'Student', voice: 'male', text: 'I understand. Could I maybe debate with another group on a different day?' },
      { speaker: 'Professor', voice: 'female', text: "The teams are already set, so that's difficult. But here's an option. You could record a video of your opening statement before you leave. Then, after the debate, I'll send you two arguments from the other side, and you'll have twenty-four hours to record your responses." },
      { speaker: 'Student', voice: 'male', text: 'That sounds fair. Do I need anything from the athletics department?' },
      { speaker: 'Professor', voice: 'female', text: 'Yes. Ask your coach for the official travel letter. I need it by Friday for my records. And send me the video of your opening statement by the tenth, so I can play it for the class during the debate.' },
      { speaker: 'Student', voice: 'male', text: "I'll get the letter from my coach tomorrow. Thank you so much." },
      { speaker: 'Professor', voice: 'female', text: 'Of course. And good luck in Ohio.' },
    ],
    questions: [
      {
        id: 'f11-ls-cv-tournament-debate-q1',
        kind: 'single',
        skill: 'purpose',
        prompt: 'Why does the student go to see the professor?',
        options: [
          'To ask her to move the debate to another week',
          'To request a letter from the athletics department',
          'To find out how the debate will be graded',
          'To ask for another way to complete an assignment',
        ],
        answer: [3],
        explanation:
          'El estudiante tiene un torneo el día del debate y pregunta: "Is there any way I could do something else instead?". No pide cambiar la fecha del debate para toda la clase, y la carta del entrenador surge al final, a petición de la profesora.',
      },
      {
        id: 'f11-ls-cv-tournament-debate-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'What must the student send the professor by the tenth?',
        options: [
          'A written paper on the debate topic',
          'A video of his opening statement',
          'The official travel letter from his coach',
          'His responses to two counterarguments',
        ],
        answer: [1],
        explanation:
          'La profesora dice: "send me the video of your opening statement by the tenth". La carta de viaje la necesita "by Friday", y las respuestas se graban después del debate, en 24 horas.',
      },
      {
        id: 'f11-ls-cv-tournament-debate-q3',
        kind: 'single',
        skill: 'function',
        prompt: 'Why does the professor say, "A written paper wouldn\'t really test that"?',
        options: [
          'To suggest that writing is harder than debating',
          'To explain why the debate is worth fifteen percent',
          'To explain why she will not simply accept a paper',
          'To encourage the student to skip the tournament',
        ],
        answer: [2],
        explanation:
          'El objetivo del debate es "responding to arguments on the spot", algo que un trabajo escrito no evalúa; por eso la profesora rechaza esa alternativa y propone otra (los vídeos). No le pide que renuncie al torneo: "good luck in Ohio".',
      },
    ],
  },
  {
    id: 'f11-ls-cv-double-major',
    form: 11,
    section: 'listening',
    task: 'conversation',
    title: 'Double Major or Math Minor?',
    topic: 'campus-life',
    difficulty: 'hard',
    context: 'Listen to a conversation between a student and an academic adviser.',
    script: [
      { speaker: 'Adviser', voice: 'female', text: "So, Daniel, your email said you're thinking about adding math as a second major. What got you interested?" },
      { speaker: 'Student', voice: 'male', text: "Well, I'm an economics major, and the graduate programs I'm looking at expect a lot of math, like linear algebra and real analysis. So I figured a double major would make me more competitive." },
      { speaker: 'Adviser', voice: 'female', text: "That's smart to think about. Let's look at the timeline, though. You're in the fall of your sophomore year, and you've finished Calculus Two. The math major requires eleven more courses, and several of them come in a chain." },
      { speaker: 'Student', voice: 'male', text: 'A chain?' },
      { speaker: 'Adviser', voice: 'female', text: "Each one is a prerequisite for the next. You need Proofs before Real Analysis, for example, and Real Analysis is offered only in the fall. So if you don't take Proofs next semester, Real Analysis gets pushed to your senior fall, and Real Analysis Two to your very last semester. There'd be no room for any delay." },
      { speaker: 'Student', voice: 'male', text: "And with my economics requirements on top of that, it's a lot of courses each semester." },
      { speaker: 'Adviser', voice: 'female', text: "Five per semester, plus one summer session, by my count. It's doable, but if a single course is full or you fail one, you'd probably need a fifth year." },
      { speaker: 'Student', voice: 'male', text: "I really can't afford a fifth year. What about a math minor instead?" },
      { speaker: 'Adviser', voice: 'female', text: "The minor is six courses: Linear Algebra, Proofs, Real Analysis One, and three electives. Honestly, that covers most of what economics graduate programs look for. What you'd miss are the advanced algebra courses, and they rarely require those." },
      { speaker: 'Student', voice: 'male', text: 'So the minor gives me most of the benefit with a lot less risk.' },
      { speaker: 'Adviser', voice: 'female', text: "That's how I see it. But either way, register for Proofs next semester. That keeps both options open." },
      { speaker: 'Student', voice: 'male', text: "Okay. I'll sign up for Proofs and make a final decision by the end of the year." },
    ],
    questions: [
      {
        id: 'f11-ls-cv-double-major-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'What are the speakers mainly discussing?',
        options: [
          'Whether the student should add a second major or a minor',
          'Which graduate programs the student should apply to',
          'How the student could pay for an additional year of study',
          'Why the student failed a required mathematics course',
        ],
        answer: [0],
        explanation:
          'La conversación empieza con "adding math as a second major" y termina comparándolo con "a math minor instead". Los programas de posgrado son el motivo, no el tema, y el quinto año solo aparece como riesgo.',
      },
      {
        id: 'f11-ls-cv-double-major-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'According to the adviser, what is the main risk of the double major?',
        options: [
          'The student would have to drop his economics major.',
          'Graduate programs do not value advanced algebra.',
          'The department may stop offering Real Analysis.',
          'One full or failed course could delay graduation.',
        ],
        answer: [3],
        explanation:
          'La asesora advierte: "if a single course is full or you fail one, you\'d probably need a fifth year". Lo de que los programas "rarely require" álgebra avanzada sirve para defender la opción del minor, no es el riesgo del doble grado.',
      },
      {
        id: 'f11-ls-cv-double-major-q3',
        kind: 'single',
        skill: 'attitude',
        prompt: "What is the adviser's opinion about the student's options?",
        options: [
          'She thinks he should give up math completely.',
          'She thinks the minor is the wiser choice.',
          'She thinks a fifth year would be easy to afford.',
          'She doubts that he is able to pass Proofs.',
        ],
        answer: [1],
        explanation:
          'Cuando el estudiante dice que el minor da "most of the benefit with a lot less risk", la asesora responde "That\'s how I see it". Aun así le recomienda cursar Proofs, así que no quiere que abandone las matemáticas.',
      },
    ],
  },

  // ---------- Announcements ----------
  {
    id: 'f11-ls-an-fire-drill',
    form: 11,
    section: 'listening',
    task: 'announcement',
    title: 'Science Building Fire Drill',
    topic: 'campus-life',
    difficulty: 'easy',
    context: 'Listen to an announcement in a university science building.',
    script: [
      {
        speaker: 'Announcer',
        voice: 'male',
        text: "Attention, everyone in the Morrison Science Building. This is the building manager with a reminder about next week's fire drill. On Tuesday at ten a.m., the fire alarm will sound for about two minutes. When you hear it, please stop what you're doing and leave the building by the nearest stairway. Do not use the elevators. Once you're outside, walk to the parking lot behind the tennis courts, not the front lawn, because fire trucks will need that space. Instructors will take attendance there, so please stay with your class until we give the all-clear. The drill should take about fifteen minutes. If you have a lab running at that time, please plan to pause your experiment before ten. Thank you.",
      },
    ],
    questions: [
      {
        id: 'f11-ls-an-fire-drill-q1',
        kind: 'single',
        skill: 'purpose',
        prompt: 'What is the main purpose of the announcement?',
        options: [
          "To report a problem with the building's elevators",
          'To explain how to use a fire extinguisher safely',
          'To prepare people for a planned emergency exercise',
          'To announce that some laboratory classes are canceled',
        ],
        answer: [2],
        explanation:
          'El encargado del edificio da "a reminder about next week\'s fire drill" y explica qué hacer durante el simulacro. Los ascensores solo aparecen en la instrucción "Do not use the elevators".',
      },
      {
        id: 'f11-ls-an-fire-drill-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'Where should people gather after leaving the building?',
        options: [
          'In the parking lot behind the tennis courts',
          'On the front lawn of the science building',
          'At the nearest stairway inside the building',
          'Next to the fire trucks near the entrance',
        ],
        answer: [0],
        explanation:
          '"Walk to the parking lot behind the tennis courts, not the front lawn, because fire trucks will need that space." El césped delantero se menciona precisamente como lugar que hay que evitar.',
      },
      {
        id: 'f11-ls-an-fire-drill-q3',
        kind: 'single',
        skill: 'inference',
        prompt: 'What will students working in a lab at ten a.m. probably do?',
        options: [
          'Leave their experiments running during the drill',
          'Skip the drill and stay inside the laboratory',
          'Use an elevator to carry their equipment out',
          'Pause their experiments shortly before the alarm',
        ],
        answer: [3],
        explanation:
          'El aviso pide: "please plan to pause your experiment before ten", que es cuando suena la alarma. Nadie puede quedarse dentro, y está prohibido usar los ascensores.',
      },
    ],
  },
  {
    id: 'f11-ls-an-eye-wash',
    form: 11,
    section: 'listening',
    task: 'announcement',
    title: 'New Eye-Wash Station',
    topic: 'campus-life',
    difficulty: 'medium',
    context: 'Listen to an announcement for students in a chemistry course.',
    script: [
      {
        speaker: 'Announcer',
        voice: 'female',
        text: "Good afternoon, chemistry students. This is Dr. Patel, the lab coordinator, with two safety updates before your lab sections begin this week. First, we've installed a new eye-wash station in Lab 204, right next to the sink by the back door. It replaces the old one near the windows, which has been removed. If a chemical gets in your eyes, go straight to the station, push the green handle, and keep rinsing for at least fifteen minutes, even if your eyes start to feel better.",
      },
      {
        speaker: 'Announcer',
        voice: 'female',
        text: 'Second, a reminder about goggles. You must wear them whenever chemicals or hot equipment are in use anywhere in the room, not just at your own bench. The only time you may take them off is during the pre-lab discussion, before any bottles are opened. Teaching assistants will ask anyone without goggles to leave the lab.',
      },
    ],
    questions: [
      {
        id: 'f11-ls-an-eye-wash-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'What is the announcement mainly about?',
        options: [
          'Changes to the schedule of chemistry lab sections',
          'Safety equipment and rules in the chemistry lab',
          'How teaching assistants will grade lab reports',
          'A chemical accident that happened in Lab 204',
        ],
        answer: [1],
        explanation:
          'La coordinadora anuncia "two safety updates": la nueva estación lavaojos y las normas sobre las gafas. No se habla de horarios ni de ningún accidente real.',
      },
      {
        id: 'f11-ls-an-eye-wash-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'Where is the new eye-wash station located?',
        options: [
          'Near the windows at the front of the lab',
          "At each student's own lab bench",
          'Outside the lab, beside the back door',
          'Next to the sink by the back door',
        ],
        answer: [3],
        explanation:
          'La nueva estación está "right next to the sink by the back door". La de las ventanas era la antigua, "which has been removed".',
      },
      {
        id: 'f11-ls-an-eye-wash-q3',
        kind: 'single',
        skill: 'inference',
        prompt: 'What is implied about wearing goggles?',
        options: [
          'They are needed even when only others are using chemicals.',
          'Students may remove them once their own bench is clean.',
          'Goggles are required only when hot equipment is in use.',
          'Teaching assistants will lend goggles to anyone who forgets.',
        ],
        answer: [0],
        explanation:
          'Hay que llevarlas cuando se usan productos o equipo caliente "anywhere in the room, not just at your own bench", es decir, también si es otro estudiante quien trabaja. Los químicos también cuentan, no solo el equipo caliente, y a quien no las lleve se le pedirá "to leave".',
      },
    ],
  },
  {
    id: 'f11-ls-an-rare-books',
    form: 11,
    section: 'listening',
    task: 'announcement',
    title: 'Handling Rare Books Safely',
    topic: 'campus-life',
    difficulty: 'hard',
    context: 'Listen to a librarian speaking to a class visiting the special collections reading room.',
    script: [
      {
        speaker: 'Announcer',
        voice: 'female',
        text: "Welcome to the Special Collections reading room. Before you start working with our rare books, let me go over a few rules. First, the reading room is open by appointment only, so if you'd like to come back on your own, book a time online at least two days in advance. Second, pencils only, please. Ink can't be removed if there's an accident, so pens stay in the lockers with your bags.",
      },
      {
        speaker: 'Announcer',
        voice: 'female',
        text: "Now, many of you are probably expecting white cotton gloves. We actually don't use them for books. Gloves make your fingers clumsy, and they can catch on fragile pages and tear them. Clean, dry hands are safer, so please wash your hands at the sink by the door and skip the hand lotion. Finally, never open a book flat on the table. Rest it on these gray foam supports, which hold the covers at a gentle angle and protect the spine.",
      },
    ],
    questions: [
      {
        id: 'f11-ls-an-rare-books-q1',
        kind: 'single',
        skill: 'purpose',
        prompt: 'What is the main purpose of the talk?',
        options: [
          "To describe the history of the library's rare books",
          'To explain how to borrow books from other libraries',
          'To explain how to handle rare materials properly',
          'To announce new opening hours for the reading room',
        ],
        answer: [2],
        explanation:
          'La bibliotecaria dice "let me go over a few rules" y explica cómo tratar los libros: citas, lápices, manos limpias y soportes de espuma. No habla del horario: la sala abre "by appointment only".',
      },
      {
        id: 'f11-ls-an-rare-books-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'Why does the librarian discourage wearing gloves?',
        options: [
          'They leave cotton fibers inside the old books.',
          'They can make it easier to tear fragile pages.',
          'They are not allowed in the reading room lockers.',
          'They keep hand lotion from reaching the pages.',
        ],
        answer: [1],
        explanation:
          'Los guantes "make your fingers clumsy, and they can catch on fragile pages and tear them". La crema de manos se menciona aparte: hay que evitarla, no es un motivo contra los guantes.',
      },
      {
        id: 'f11-ls-an-rare-books-q3',
        kind: 'single',
        skill: 'inference',
        prompt: 'What will a student who wants to return alone next week probably need to do?',
        options: [
          'Ask the librarian for a pair of cotton gloves',
          'Come back with the whole class at the same hour',
          'Bring a pen to sign the reading room register',
          'Reserve a visit online a couple of days ahead',
        ],
        answer: [3],
        explanation:
          'La sala funciona "by appointment only", y para volver solo hay que "book a time online at least two days in advance". Los bolígrafos están prohibidos ("pencils only") y no se usan guantes.',
      },
    ],
  },

  // ---------- Academic Talks ----------
  {
    id: 'f11-ls-at-classical-conditioning',
    form: 11,
    section: 'listening',
    task: 'academic-talk',
    title: 'Pavlov and Learned Responses',
    topic: 'psychology',
    difficulty: 'easy',
    context: 'Listen to part of a lecture in a psychology class.',
    script: [
      { speaker: 'Professor', voice: 'male', text: "Today we're starting our unit on learning, and we'll begin with one of the most famous discoveries in psychology. In the 1890s, a Russian scientist named Ivan Pavlov was studying digestion in dogs. He wasn't interested in learning at all. He was measuring how much saliva the dogs produced when food was placed in their mouths." },
      { speaker: 'Professor', voice: 'male', text: 'But his assistants noticed something odd. After a while, the dogs began to salivate before they got any food, for instance, when they saw the assistant who usually fed them or heard his footsteps. Pavlov realized the dogs had learned something, and he decided to study it carefully.' },
      { speaker: 'Professor', voice: 'male', text: "So he set up an experiment. He used a neutral stimulus, a sound like a metronome or a bell, something that on its own doesn't make a dog salivate. He presented the sound right before giving the dog food. Food is what we call an unconditioned stimulus, because it causes salivation automatically, without any learning. After the sound and the food had been paired many times, Pavlov presented the sound alone, and the dog salivated anyway." },
      { speaker: 'Professor', voice: 'male', text: "At that point, the sound is no longer neutral. It has become a conditioned stimulus, and the salivation it produces is a conditioned response. Notice that the behavior itself, salivating, is the same. What's different is what triggers it." },
      { speaker: 'Professor', voice: 'male', text: "Pavlov also found that this learning could be undone. If he kept presenting the sound without ever bringing food, the salivation gradually weakened and eventually stopped. This is called extinction. And this isn't just about dogs. If you've ever felt nervous just hearing a dentist's drill, you've experienced classical conditioning yourself." },
    ],
    questions: [
      {
        id: 'f11-ls-at-classical-conditioning-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'What is the lecture mainly about?',
        options: [
          'How dogs produce saliva when they digest food',
          'Why fears of the dentist are hard to unlearn',
          'How Pavlov selected and trained his assistants',
          'How animals learn to link a signal with food',
        ],
        answer: [3],
        explanation:
          'La clase explica cómo un sonido neutro, emparejado con comida, llega a provocar salivación: "It has become a conditioned stimulus". La digestión era el tema original de Pavlov, pero no el de la clase.',
      },
      {
        id: 'f11-ls-at-classical-conditioning-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'What was Pavlov originally studying?',
        options: ['Digestion in dogs', 'Learning in animals', 'Fear of loud noises', 'Memory in humans'],
        answer: [0],
        explanation:
          'El profesor dice: "Pavlov was studying digestion in dogs. He wasn\'t interested in learning at all." El aprendizaje fue un descubrimiento accidental.',
      },
      {
        id: 'f11-ls-at-classical-conditioning-q3',
        kind: 'single',
        skill: 'function',
        prompt: "Why does the professor mention a dentist's drill?",
        options: [
          'To describe a sound Pavlov used in his lab',
          'To explain how extinction can be prevented in people',
          'To show that conditioning also occurs in people',
          'To give an example of a neutral stimulus',
        ],
        answer: [2],
        explanation:
          'Justo antes dice "this isn\'t just about dogs": el torno del dentista es un ejemplo de condicionamiento clásico en humanos. No es neutro, porque ya provoca nervios: es un estímulo condicionado.',
      },
      {
        id: 'f11-ls-at-classical-conditioning-q4',
        kind: 'single',
        skill: 'inference',
        prompt: 'What would probably happen to a conditioned dog that kept hearing the sound but never received food?',
        options: [
          'It would salivate more strongly over time.',
          'Its salivation to the sound would fade.',
          'It would begin to salivate at footsteps.',
          'It would stop salivating when given food.',
        ],
        answer: [1],
        explanation:
          'Es la extinción: "the salivation gradually weakened and eventually stopped". La salivación ante la comida es una respuesta no condicionada y no desaparece.',
      },
    ],
  },
  {
    id: 'f11-ls-at-yellowstone-wolves',
    form: 11,
    section: 'listening',
    task: 'academic-talk',
    title: 'Wolves Return to Yellowstone',
    topic: 'environment',
    difficulty: 'medium',
    context: 'Listen to part of a lecture in an ecology class.',
    script: [
      { speaker: 'Professor', voice: 'female', text: "Today I want to look at one of the most famous experiments in wildlife management, although nobody planned it as an experiment. By the 1920s, gray wolves had been completely eliminated from Yellowstone National Park, mostly by government hunters who saw them as a threat to livestock. For about seventy years, the park had no wolves at all." },
      { speaker: 'Professor', voice: 'female', text: "Without their main predator, elk numbers grew, and the elk spent a lot of time feeding along rivers and streams. They ate young willow and aspen trees before the trees could grow tall. Then, in 1995 and 1996, the park brought in thirty-one wolves from Canada. The wolves did well. Within a decade there were well over a hundred of them, and the elk population on the park's northern range dropped sharply." },
      { speaker: 'Professor', voice: 'female', text: "Here's where it gets interesting. Many scientists described what happened next as a trophic cascade, an effect that moves down the food chain from a top predator through several levels. The idea was that wolves didn't just eat elk. They also made elk nervous, so the elk avoided places where they could easily be trapped, like narrow stream valleys. With less browsing, willows recovered along some streams, which provided food for beavers and shade for fish. You may have seen a popular video claiming that wolves even changed the course of rivers." },
      { speaker: 'Student', voice: 'male', text: 'So the wolves basically fixed the whole ecosystem?' },
      { speaker: 'Professor', voice: 'female', text: "Well, that's exactly what's being debated. More recent studies suggest the story is more complicated. Elk numbers also fell because of human hunting outside the park, several years of drought, and growing numbers of bears, which eat many elk calves. And when researchers measured willows carefully, the recovery turned out to be patchy. In some areas the trees are still short, partly because beavers disappeared long ago, and without their dams, the water table dropped. So most ecologists today would say that wolves did play a role, but as one factor among several, not as a single switch that restored the park." },
    ],
    questions: [
      {
        id: 'f11-ls-at-yellowstone-wolves-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'What is the lecture mainly about?',
        options: [
          'Why wolves were removed from Yellowstone in the 1920s',
          'How beavers build dams that change the flow of rivers',
          'The return of wolves and a debate about its effects',
          'Methods that scientists use to count elk populations',
        ],
        answer: [2],
        explanation:
          'La profesora cuenta la reintroducción de 1995-1996 y luego dice "that\'s exactly what\'s being debated" sobre la cascada trófica. La eliminación de los lobos en los años veinte es solo el contexto inicial.',
      },
      {
        id: 'f11-ls-at-yellowstone-wolves-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'According to the professor, how did wolves change where elk fed?',
        options: [
          'Elk moved closer to rivers to find more water.',
          'Elk began feeding only at night in open areas.',
          'Elk left the park and fed on nearby farmland.',
          'Elk avoided areas where they could be trapped.',
        ],
        answer: [3],
        explanation:
          'Los lobos "made elk nervous, so the elk avoided places where they could easily be trapped, like narrow stream valleys". Es lo contrario de acercarse a los ríos.',
      },
      {
        id: 'f11-ls-at-yellowstone-wolves-q3',
        kind: 'single',
        skill: 'function',
        prompt: 'Why does the professor mention a popular video?',
        options: [
          'To recommend a source that students should watch',
          'To show how far the cascade story has been taken',
          'To prove that wolves changed rivers in the park',
          'To explain how willow growth was first measured',
        ],
        answer: [1],
        explanation:
          'El vídeo afirma que los lobos "even changed the course of rivers": ilustra lo exagerada que se volvió la versión popular. Después la profesora matiza esa idea, así que no la presenta como prueba.',
      },
      {
        id: 'f11-ls-at-yellowstone-wolves-q4',
        kind: 'single',
        skill: 'attitude',
        prompt: "What is the professor's view of the trophic cascade explanation?",
        options: [
          'It is partly correct but too simple.',
          'It has been completely disproved.',
          'It explains all the changes in the park.',
          'It applies only to beavers and fish.',
        ],
        answer: [0],
        explanation:
          'Concluye que "wolves did play a role, but as one factor among several, not as a single switch". Es decir, la explicación es en parte válida pero simplista; no dice que esté refutada.',
      },
    ],
  },
  {
    id: 'f11-ls-at-cosmic-background',
    form: 11,
    section: 'listening',
    task: 'academic-talk',
    title: 'The Cosmic Microwave Background',
    topic: 'astronomy',
    difficulty: 'hard',
    context: 'Listen to part of a lecture in an astronomy class.',
    script: [
      { speaker: 'Professor', voice: 'female', text: 'Last week we discussed the expanding universe. Today I want to tell you about the discovery that convinced most astronomers that the universe really did begin in a hot, dense state, what we call the Big Bang. And the funny thing is, the two people who made it were not looking for it at all.' },
      { speaker: 'Professor', voice: 'female', text: 'In 1964, two radio astronomers at Bell Laboratories in New Jersey, Arno Penzias and Robert Wilson, were working with a large horn-shaped antenna that had originally been built for satellite communication. They wanted to use it to study radio waves from our own galaxy. But first they had to account for every source of noise in the system, and there was a faint hiss of microwaves they could not get rid of. It was the same in every direction, day and night, in every season. They checked the wiring, they re-aimed the antenna, and they even removed a pair of pigeons that had been nesting inside it. The hiss remained.' },
      { speaker: 'Professor', voice: 'female', text: 'Meanwhile, just a short drive away at Princeton, a group of physicists was building an instrument to search for exactly this kind of signal. They had reasoned that if the universe began hot and dense, some of that early radiation should still be around. When the two groups finally talked, the Princeton team realized they had been beaten to the discovery.' },
      { speaker: 'Professor', voice: 'female', text: "So why is this radiation such strong evidence? In the early universe, matter was so hot that atoms couldn't form, and light kept bouncing off free electrons, like light in a thick fog. After about 380,000 years, the universe cooled enough for atoms to form, the fog cleared, and that light could finally travel freely. As space has expanded since then, its wavelengths have been stretched into microwaves. Today it corresponds to a temperature of less than three degrees above absolute zero." },
      { speaker: 'Professor', voice: 'female', text: "The main competing idea at the time, the steady state theory, said the universe had always looked basically the same. It had no natural way to produce a uniform glow coming from every direction. The Big Bang model predicted exactly that. Penzias and Wilson shared the Nobel Prize in Physics in 1978, and after their discovery, very few astronomers continued to defend the steady state view." },
    ],
    questions: [
      {
        id: 'f11-ls-at-cosmic-background-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'What is the lecture mainly about?',
        options: [
          'A chance discovery that supports the Big Bang model',
          'How radio antennas were used for satellite calls',
          'Why pigeons cause problems for radio telescopes',
          'The rivalry between Princeton and Bell Laboratories',
        ],
        answer: [0],
        explanation:
          'La profesora presenta "the discovery that convinced most astronomers" del Big Bang, hecha por personas que "were not looking for it at all", y luego explica por qué es una prueba sólida. Las palomas y Princeton son detalles de la historia.',
      },
      {
        id: 'f11-ls-at-cosmic-background-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'What did Penzias and Wilson originally plan to use the antenna for?',
        options: [
          'To communicate with orbiting satellites',
          'To search for radiation left from the Big Bang',
          'To study radio waves from our own galaxy',
          'To measure the temperature of distant stars',
        ],
        answer: [2],
        explanation:
          '"They wanted to use it to study radio waves from our own galaxy." La antena "had originally been built for satellite communication", pero ese no era su plan; y quienes buscaban la radiación del Big Bang eran los físicos de Princeton.',
      },
      {
        id: 'f11-ls-at-cosmic-background-q3',
        kind: 'single',
        skill: 'function',
        prompt: 'Why does the professor compare the early universe to a thick fog?',
        options: [
          'To explain why the universe expanded so quickly',
          "To describe how the antenna's signal was weakened",
          'To show why the hiss came from every direction',
          'To show why light could not travel freely',
        ],
        answer: [3],
        explanation:
          'La luz "kept bouncing off free electrons, like light in a thick fog"; cuando se formaron los átomos, "the fog cleared, and that light could finally travel freely". La niebla ilustra por qué la luz no podía viajar libremente al principio.',
      },
      {
        id: 'f11-ls-at-cosmic-background-q4',
        kind: 'single',
        skill: 'inference',
        prompt: 'What can be inferred about the steady state theory?',
        options: [
          'It correctly predicted the temperature of the hiss.',
          'It lost support after the radiation was discovered.',
          'It was first proposed by the Princeton physicists.',
          'It explained the noise that Penzias and Wilson heard.',
        ],
        answer: [1],
        explanation:
          'La teoría del estado estacionario "had no natural way to produce a uniform glow", y tras el descubrimiento "very few astronomers continued to defend" esa idea. Quien predijo la radiación fue el modelo del Big Bang.',
      },
    ],
  },
];
