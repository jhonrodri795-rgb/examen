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
    id: 'f11-ls-at-spotlight-effect',
    form: 11,
    section: 'listening',
    task: 'academic-talk',
    title: 'The Spotlight Effect',
    topic: 'psychology',
    difficulty: 'easy',
    context: 'Listen to part of a lecture in a social psychology class.',
    script: [
      { speaker: 'Professor', voice: 'male', text: "Have you ever walked into class with a stain on your shirt and felt sure that everyone was staring at it? Today we'll look at why that feeling is usually wrong. Psychologists call it the spotlight effect. It's our tendency to believe that other people notice our appearance and our actions much more than they really do, as if we were standing on a stage under a bright light." },
      { speaker: 'Professor', voice: 'male', text: 'One well-known study was done by the psychologist Thomas Gilovich and his colleagues at Cornell University. They asked college students to wear a T-shirt with a big picture of a singer that most students at the time found pretty embarrassing. Each student then walked into a room where other students were filling out questionnaires. Afterward, the student in the T-shirt guessed how many people in the room had noticed the shirt. On average, they guessed about half. In reality, only about a quarter could say who was on it.' },
      { speaker: 'Professor', voice: 'male', text: "So why do we make this mistake? Mainly because we're so aware of ourselves. You know exactly what you're wearing, so it seems obvious to everyone. But most of the people around you are busy thinking about themselves, their own clothes and their own problems." },
      { speaker: 'Student', voice: 'female', text: 'Does the same thing happen with mistakes, or just with how we look?' },
      { speaker: 'Professor', voice: 'male', text: 'It happens with mistakes too. In other studies, people in group discussions believed the others would clearly remember their comments, including the clumsy ones. Actually, the others noticed them much less than expected. So the next time you trip over a word during a presentation, try to keep this research in mind.' },
    ],
    questions: [
      {
        id: 'f11-ls-at-spotlight-effect-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'What is the lecture mainly about?',
        options: [
          'How people choose clothes to make a good impression',
          'Why many students feel nervous about speaking in class',
          'How psychologists use T-shirts to study memory',
          'Why we think others notice us more than they do',
        ],
        answer: [3],
        explanation:
          'La clase trata del "spotlight effect": "our tendency to believe that other people notice our appearance and our actions much more than they really do". El estudio de la camiseta es solo un ejemplo, y no se habla de cómo elegir la ropa.',
      },
      {
        id: 'f11-ls-at-spotlight-effect-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'In the study, how many observers did the students wearing the T-shirt think had noticed it?',
        options: ['About half of them', 'About a quarter of them', 'Almost all of them', 'Very few of them'],
        answer: [0],
        explanation:
          'El profesor dice: "On average, they guessed about half." La cuarta parte es lo que ocurrió en realidad ("only about a quarter could say who was on it"), no lo que esperaban los estudiantes.',
      },
      {
        id: 'f11-ls-at-spotlight-effect-q3',
        kind: 'single',
        skill: 'function',
        prompt: 'Why does the professor mention a stain on a shirt?',
        options: [
          'To describe how the T-shirt study was set up',
          'To show that clothing affects how others judge us',
          'To introduce a familiar feeling he will explain',
          'To prove that people notice small details easily',
        ],
        answer: [2],
        explanation:
          'Es una situación conocida que le sirve de entrada al tema; justo después dice: "Today we\'ll look at why that feeling is usually wrong." No describe el estudio ni demuestra que la gente se fije en los detalles: la clase sostiene lo contrario.',
      },
      {
        id: 'f11-ls-at-spotlight-effect-q4',
        kind: 'single',
        skill: 'inference',
        prompt: 'What does the professor imply about tripping over a word during a presentation?',
        options: [
          'Most listeners will remember it after the talk ends.',
          'Fewer people will notice it than the speaker fears.',
          'It is more noticeable than a stain on a shirt.',
          'It suggests that the speaker did not prepare well.',
        ],
        answer: [1],
        explanation:
          'Se deduce de la investigación que cita: los demás notaron los comentarios torpes "much less than expected". Por eso aconseja "keep this research in mind": probablemente menos gente se fijará en el error de lo que uno teme.',
      },
    ],
  },
  {
    id: 'f11-ls-at-sea-level-rise',
    form: 11,
    section: 'listening',
    task: 'academic-talk',
    title: 'Why the Oceans Are Rising',
    topic: 'environment',
    difficulty: 'medium',
    context: 'Listen to part of a lecture in an environmental science class.',
    script: [
      { speaker: 'Professor', voice: 'female', text: "Today's topic is sea-level rise. Tide gauges, and more recently satellites, show that the average level of the world's oceans has gone up by roughly twenty centimeters since the early nineteen hundreds. And the rise is speeding up. It's now more than twice as fast as it was for most of the twentieth century. So where is the extra water coming from? Well, part of the answer is that it isn't extra water at all." },
      { speaker: 'Professor', voice: 'female', text: 'The first cause is called thermal expansion. When water warms up, its molecules move around more and take up slightly more space. The oceans have absorbed more than ninety percent of the extra heat trapped by greenhouse gases. Even a small temperature change, spread through that enormous volume, makes the oceans expand noticeably. And because heat travels slowly into the deep ocean, this process lags behind. Even if global temperatures stopped rising tomorrow, the deep ocean would keep warming and expanding for centuries.' },
      { speaker: 'Professor', voice: 'female', text: 'The second cause is melting land ice, meaning mountain glaciers and the huge ice sheets that cover Greenland and Antarctica. When that ice melts, or when pieces of it break off into the sea, water that was stored on land is added to the ocean. For much of the past fifty years, thermal expansion was responsible for about half of the total rise. But in the last couple of decades, melting land ice has overtaken it, mainly because Greenland and Antarctica are losing ice faster.' },
      { speaker: 'Student', voice: 'male', text: "But what about the ice in the Arctic Ocean? We keep hearing about how fast that's melting." },
      { speaker: 'Professor', voice: 'female', text: "Right, that's a common confusion. Arctic sea ice is already floating, so it's already pushing aside about as much water as it will add when it melts. Picture a glass of water with ice cubes in it. When the cubes melt, the water level barely changes. Sea ice works the same way. Its loss matters for other reasons, like how much sunlight the Arctic reflects. But for sea level, what counts is ice that's sitting on land." },
    ],
    questions: [
      {
        id: 'f11-ls-at-sea-level-rise-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'What is the lecture mainly about?',
        options: [
          'How satellites are used to measure ocean height',
          'Why sea ice in the Arctic is melting so quickly',
          'Two main processes that are raising sea level',
          'How the ice sheets of Greenland formed over time',
        ],
        answer: [2],
        explanation:
          'La profesora explica dos causas: "The first cause is called thermal expansion" y "The second cause is melting land ice". El hielo marino del Ártico aparece solo para aclarar que apenas influye en el nivel del mar.',
      },
      {
        id: 'f11-ls-at-sea-level-rise-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'According to the professor, why would thermal expansion continue even if global temperatures stopped rising?',
        options: [
          'Melting glaciers would keep cooling the surface water.',
          'The oceans would keep absorbing greenhouse gases.',
          'Floating sea ice would keep reflecting sunlight.',
          'Heat takes a long time to reach the deep ocean.',
        ],
        answer: [3],
        explanation:
          '"Because heat travels slowly into the deep ocean, this process lags behind", y por eso "the deep ocean would keep warming and expanding for centuries". La profesora dice que los océanos absorben calor, no que sigan absorbiendo gases.',
      },
      {
        id: 'f11-ls-at-sea-level-rise-q3',
        kind: 'single',
        skill: 'function',
        prompt: 'Why does the professor mention a glass of water with ice cubes?',
        options: [
          'To show how scientists measure the heat in the ocean',
          'To explain why floating ice barely affects sea level',
          'To describe how pieces of glaciers break off into the sea',
          'To show how warm water melts the ice sheets from below',
        ],
        answer: [1],
        explanation:
          'El vaso ilustra que el hielo que ya flota no eleva el nivel: "When the cubes melt, the water level barely changes. Sea ice works the same way." Lo que cuenta es "ice that\'s sitting on land".',
      },
      {
        id: 'f11-ls-at-sea-level-rise-q4',
        kind: 'single',
        skill: 'detail',
        prompt: 'According to the professor, what has changed in the last couple of decades?',
        options: [
          'Land ice has become the larger cause of the rise.',
          'Thermal expansion has caused about half of the rise.',
          'Arctic sea ice has become the main cause of the rise.',
          'Satellites have replaced tide gauges in most places.',
        ],
        answer: [0],
        explanation:
          '"In the last couple of decades, melting land ice has overtaken it", es decir, ha superado a la expansión térmica. La cifra de "about half of the total rise" se refiere a buena parte de los últimos cincuenta años, no al cambio reciente.',
      },
    ],
  },
  {
    id: 'f11-ls-at-dark-matter',
    form: 11,
    section: 'listening',
    task: 'academic-talk',
    title: 'Rotation Curves and Dark Matter',
    topic: 'astronomy',
    difficulty: 'hard',
    context: 'Listen to part of a lecture in an astronomy class.',
    script: [
      { speaker: 'Professor', voice: 'female', text: 'Today we turn to one of the strangest ideas in astronomy: that most matter in the universe gives off no light. In the nineteen thirties, Fritz Zwicky noticed that galaxies in one cluster moved too fast to be held together by the visible matter, but his suggestion was largely set aside. What finally made astronomers take it seriously was a different measurement: how fast stars orbit the center of a single galaxy.' },
      { speaker: 'Professor', voice: 'female', text: 'First, what would we expect? In our solar system, nearly all the mass is in the Sun, so the farther out a planet is, the more slowly it moves. Mercury races along, while Neptune crawls. In a spiral galaxy, most light comes from the crowded center. So if the mass is where the light is, outer stars should move more slowly than inner ones.' },
      { speaker: 'Professor', voice: 'female', text: "Starting in the late nineteen sixties, Vera Rubin and the instrument builder Kent Ford measured these speeds in the Andromeda galaxy and then in many other spirals. They used the Doppler effect. Light from the side of a galaxy turning toward us shifts toward blue, light from the receding side shifts toward red, and the size of the shift gives the speed. Plot speed against distance from the center, and you get a rotation curve. Beyond the central region, the curves didn't drop. They stayed nearly flat. Radio astronomers tracking hydrogen gas beyond the visible edges of galaxies found the same pattern." },
      { speaker: 'Professor', voice: 'female', text: "A flat curve means the mass keeps growing as you move outward, even where there's little light. So each galaxy seems to sit inside a vast halo of unseen material, what we now call dark matter. Could it just be ordinary matter that's too dim to see, like cold gas or burned-out stars? Searches have found far too little of that. Most astronomers think dark matter doesn't emit, absorb, or reflect light at all, though its nature is still unknown." },
      { speaker: 'Professor', voice: 'female', text: 'A minority of physicists argue instead that gravity itself works differently on the scale of galaxies. But dark matter also explains how strongly the gravity of galaxy clusters bends light from objects behind them, so it remains the leading explanation.' },
    ],
    questions: [
      {
        id: 'f11-ls-at-dark-matter-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'What is the lecture mainly about?',
        options: [
          'How galaxy rotation speeds revealed hidden mass',
          'How the Doppler effect is used to find galaxies',
          "Why stars near a galaxy's center move so quickly",
          "Why Fritz Zwicky's ideas were ignored for decades",
        ],
        answer: [0],
        explanation:
          'La profesora explica cómo medir "how fast stars orbit the center of a single galaxy" llevó a la idea de "a vast halo of unseen material". Zwicky y el efecto Doppler son partes de la historia, no el tema central.',
      },
      {
        id: 'f11-ls-at-dark-matter-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'What did Rubin and Ford find about stars far from the center of spiral galaxies?',
        options: [
          'They orbited more slowly than stars closer in.',
          'They gave off more light than had been expected.',
          'They moved about as fast as stars closer in.',
          'They were surrounded by large clouds of hydrogen.',
        ],
        answer: [2],
        explanation:
          '"Beyond the central region, the curves didn\'t drop. They stayed nearly flat": las estrellas exteriores se mueven casi tan rápido como las interiores. Lo esperado era lo contrario ("outer stars should move more slowly"), y el hidrógeno lo estudiaron radioastrónomos.',
      },
      {
        id: 'f11-ls-at-dark-matter-q3',
        kind: 'single',
        skill: 'function',
        prompt: 'Why does the professor mention Mercury and Neptune?',
        options: [
          'To show how planet speeds are measured with light',
          'To show that planets contain very little dark matter',
          'To compare the size of the solar system to a galaxy',
          'To illustrate the pattern astronomers expected',
        ],
        answer: [3],
        explanation:
          'Ilustran lo que se esperaba: en el sistema solar "the farther out a planet is, the more slowly it moves", y lo mismo debería pasar en una galaxia "if the mass is where the light is". La pregunta inicial es "what would we expect?".',
      },
      {
        id: 'f11-ls-at-dark-matter-q4',
        kind: 'single',
        skill: 'inference',
        prompt: 'What can be inferred about dark matter from the lecture?',
        options: [
          'It is found mostly near the centers of galaxies.',
          'Its presence is revealed mainly by its gravity.',
          'It was first observed directly by radio astronomers.',
          'It is made largely of cold gas and burned-out stars.',
        ],
        answer: [1],
        explanation:
          'No emite ni refleja luz ("doesn\'t emit, absorb, or reflect light at all"), pero se detecta por la velocidad de las estrellas y porque "the gravity of galaxy clusters bends light". La masa aumenta hacia fuera, no en el centro, y la profesora descarta el gas frío y las estrellas apagadas.',
      },
    ],
  },
];
