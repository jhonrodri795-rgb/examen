import type { Difficulty, ListeningSet, Topic, Voice } from '../../../types';

/** Simulación n.º 1 — Listening (contenido original). */

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
    form: 1,
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
  // ---------- Listen and Choose a Response: easy ----------
  cr('f01-ls-cr-review-room', 'easy', 'female', 'Do you know which room the chemistry midterm review is in?', [
    "It's going to cover chapters five through eight.",
    "I think it's in Room 204, next to the lab.",
    'I reviewed my chemistry notes last night.',
    'Yes, the midterm was really hard for me.',
  ], 1, 'La pregunta "which room" pide un lugar; solo "Room 204, next to the lab" lo da. A habla del contenido del repaso y C repite "review" sin responder.'),
  cr('f01-ls-cr-history-notes', 'easy', 'male', "Could I borrow your notes from Monday's history lecture?", [
    'I borrowed them from the library on Monday.',
    'History is my favorite subject this year.',
    'The lecture starts at ten on Mondays.',
    "Sure, I'll bring them to class tomorrow.",
  ], 3, 'Es una petición ("Could I borrow…?"); la respuesta natural la acepta: "Sure, I\'ll bring them". A repite "borrow" y "Monday" pero cambia quién presta.'),
  cr('f01-ls-cr-station-ride', 'easy', 'female', "I'm driving past the train station later. Do you want a ride?", [
    "That'd be great. What time are you leaving?",
    'The train station was built a long time ago.',
    'I rode my bike to the station last week.',
    'No, I never learned how to drive a car.',
  ], 0, 'Es un ofrecimiento; la respuesta adecuada lo acepta y pregunta la hora: "That\'d be great. What time are you leaving?". D no tiene sentido porque quien conduce es la otra persona.', 'daily-life'),
  cr('f01-ls-cr-coast-weekend', 'easy', 'male', 'So, how did your weekend trip to the coast go?', [
    "I'm going to the coast next weekend.",
    'It takes about three hours by car.',
    'It was wonderful. The weather was perfect.',
    'The coast is west of the city.',
  ], 2, 'Pregunta "how did… go?" sobre algo ya ocurrido: "It was wonderful" responde con el tiempo verbal correcto. A usa el futuro y B contesta "how long", otra pregunta.', 'daily-life'),
  cr('f01-ls-cr-stats-thanks', 'easy', 'female', 'Thanks so much for helping me with the statistics homework.', [
    'Statistics is a required course for my major.',
    'Yes, I need some help with it too.',
    'The homework is due on Thursday.',
    "No problem. I'm glad it helped.",
  ], 3, 'Ante un agradecimiento, lo natural es "No problem. I\'m glad it helped." B interpreta mal la función (como si le pidieran ayuda) y C solo repite "homework".'),
  cr('f01-ls-cr-borrow-pen', 'easy', 'female', 'Excuse me, do you mind if I use your pen to fill out this form?', [
    'Yes, I filled it out yesterday.',
    'Not at all. Here you go.',
    'I bought it at the bookstore.',
    'The form is on the front desk.',
  ], 1, 'Con "Do you mind if…?", "Not at all" significa "no me importa", es decir, sí da permiso. "Yes" (A) significaría que le molesta, y además habla de otra cosa.'),

  // ---------- medium ----------
  cr('f01-ls-cr-switch-lab', 'medium', 'female', "Would you mind switching lab sections with me next week? I have a doctor's appointment on Tuesday.", [
    'Sure, I can switch to your Tuesday section.',
    "The doctor's office is right next to the lab.",
    'I switched to a new major last semester.',
    'My appointment was last Tuesday, actually.',
  ], 0, 'Es una petición indirecta; la respuesta adecuada acepta el cambio: "Sure, I can switch to your Tuesday section." B y C repiten palabras ("doctor", "switch") sin responder.'),
  cr('f01-ls-cr-quiz-closed', 'medium', 'male', 'I can\'t believe it. The online quiz closed before I could even submit my answers.', [
    'I closed the window because it was cold.',
    'The quiz had twenty multiple-choice questions.',
    "That's frustrating. You should email the instructor.",
    "I can't believe you finished it so early.",
  ], 2, 'Es una queja; lo natural es mostrar empatía y dar un consejo: "That\'s frustrating. You should email the instructor." A juega con "closed" y D malinterpreta la situación (no terminó).'),
  cr('f01-ls-cr-dinner-choice', 'medium', 'female', 'Would you rather eat at the dining hall tonight or just get takeout?', [
    'Yes, I would like that very much.',
    "Let's get takeout. I still have a lot to study.",
    'I ate there with my roommate last Friday.',
    'The dining hall is right next to the gym.',
  ], 1, 'Una pregunta de elección ("A or B?") no se responde con "Yes" (A), sino eligiendo una opción: "Let\'s get takeout", con un motivo. C habla del pasado.'),
  cr('f01-ls-cr-spanish-class', 'medium', 'male', "Didn't you say you were taking Spanish this term?", [
    'Spanish is spoken in many countries.',
    'I said it to the professor yesterday.',
    "Yes, I'm traveling to Spain this summer.",
    'I was, but I switched to French last week.',
  ], 3, 'La pregunta negativa comprueba una información; "I was, but I switched to French" la confirma y la corrige. C empieza con "Yes" pero habla de un viaje, no de la clase.'),
  cr('f01-ls-cr-lab-manual', 'medium', 'female', 'You can borrow my lab manual if you can get it back to me by Friday.', [
    "Thanks, I'll return it by Thursday at the latest.",
    "I got back from Friday's lab very late.",
    'My lab partner bought a new manual.',
    'Yes, I can lend it to you until Friday.',
  ], 0, 'Es un ofrecimiento con condición ("if you can get it back… by Friday"); la respuesta acepta y cumple la condición: "I\'ll return it by Thursday". D confunde quién presta ("lend") el manual.'),
  cr('f01-ls-cr-wrong-chapters', 'medium', 'female', "I'm worried I studied the wrong chapters for tomorrow's test.", [
    'I studied in the library until midnight.',
    'The test was easier than I expected.',
    "Don't worry, we can check the syllabus together.",
    'The wrong answers will lose points.',
  ], 2, 'Busca tranquilidad; "Don\'t worry, we can check the syllabus together" la calma y ofrece una solución. B usa el pasado, pero el examen es mañana ("tomorrow\'s test").'),

  // ---------- hard ----------
  cr('f01-ls-cr-midnight-movie', 'hard', 'male', 'A few of us are going to see the midnight movie tonight. Want to come along?', [
    'The theater downtown stays open until midnight.',
    'Yes, I saw that movie with my roommate last night.',
    'The movie is based on a very famous novel.',
    'I wish I could, but I have an exam at eight.',
  ], 3, 'Es una invitación; la respuesta adecuada es un rechazo cortés con motivo: "I wish I could, but I have an exam at eight." B dice "Yes" pero habla de anoche, sin aceptar ni rechazar.'),
  cr('f01-ls-cr-swim-test', 'hard', 'female', 'The swimming test for the PE requirement? Honestly, it was a piece of cake.', [
    'Really? Did they serve dessert after the test?',
    "That's a relief. I'm nervous about taking it.",
    "I'm sorry it was so hard for you.",
    'You should have practiced more before it.',
  ], 1, '"A piece of cake" es una expresión que significa "muy fácil". La respuesta lógica es de alivio: "That\'s a relief". A la interpreta literalmente (un pastel) y C entiende lo contrario.'),
  cr('f01-ls-cr-lab-coat', 'hard', 'male', "I forgot my lab coat, and they won't let me in without one.", [
    'I forgot my keys in the lab yesterday.',
    'They let me in early this morning.',
    'I have an extra one in my locker. Want it?',
    'Lab coats are sold in many different colors.',
  ], 2, 'Detrás del comentario hay una petición implícita de ayuda; la respuesta adecuada ofrece una bata: "I have an extra one in my locker." A y B repiten "forgot" y "let me in" sin ayudar.'),
  cr('f01-ls-cr-whole-book', 'hard', 'female', 'You finished the whole book already?', [
    "Yeah, I couldn't put it down.",
    'Yes, the bookshelf is already full.',
    "Don't worry, you'll finish it soon.",
    'The bookstore closes early on Sundays.',
  ], 0, 'La pregunta expresa sorpresa; "Yeah, I couldn\'t put it down" (no podía dejar de leer) explica por qué terminó tan rápido. C cambia la persona: es quien habla el que no lo ha terminado.', 'daily-life'),
  cr('f01-ls-cr-handwriting', 'hard', 'male', "The professor's handwriting isn't exactly easy to read.", [
    'Yes, she writes very clearly on the board.',
    'I know. I had to ask a classmate what she wrote.',
    "She's writing a new textbook this year.",
    'Reading is my favorite way to relax.',
  ], 1, '"Isn\'t exactly easy to read" es una forma suave de decir que se lee muy mal. La respuesta que coincide es "I know. I had to ask a classmate what she wrote." A dice lo contrario.'),
  cr('f01-ls-cr-milk-again', 'hard', 'female', 'Someone forgot to buy milk again.', [
    'Milk is good for your bones and teeth.',
    'Yes, someone forgot it at the store.',
    'I usually forget people\'s names, too.',
    "Sorry, that was me. I'll pick some up today.",
  ], 3, 'Es una queja indirecta dirigida al compañero de piso; la respuesta adecuada asume la culpa y propone una solución: "Sorry, that was me. I\'ll pick some up today." B solo repite "someone forgot".', 'daily-life'),

  // ---------- Conversations ----------
  {
    id: 'f01-ls-cv-lost-charger',
    form: 1,
    section: 'listening',
    task: 'conversation',
    title: 'A Charger at Lost and Found',
    topic: 'campus-life',
    difficulty: 'easy',
    context: 'Listen to a conversation between a student and a staff member at the student union.',
    script: [
      { speaker: 'Student', voice: 'female', text: 'Hi. I think I left my laptop charger in Lecture Hall B yesterday afternoon. Has anyone turned one in?' },
      { speaker: 'Staff member', voice: 'male', text: 'Possibly. We get a lot of chargers. Every item that comes in is logged in our database with the date, the building, and a short description. Can you describe yours?' },
      { speaker: 'Student', voice: 'female', text: "It's white, with a long cable, and there's a green sticker with my initials on the plug." },
      { speaker: 'Staff member', voice: 'male', text: "Okay, let me search. I see three chargers from Lecture Hall B this week. One was logged yesterday at four fifteen, and the note says 'white, green sticker.'" },
      { speaker: 'Student', voice: 'female', text: "That's probably mine! Can I take it now?" },
      { speaker: 'Staff member', voice: 'male', text: 'Almost. Before I release anything, I need to see your student ID, and the name on it has to match the initials on the item. Then you sign a release form.' },
      { speaker: 'Student', voice: 'female', text: 'Oh no. I left my ID in my dorm room. I only have my phone with me.' },
      { speaker: 'Staff member', voice: 'male', text: "Unfortunately, a photo of your ID on your phone doesn't count. It has to be the physical card. But I can put the charger on hold under your name until we close at six." },
      { speaker: 'Student', voice: 'female', text: "That works. My dorm is only ten minutes away, so I'll be back before five." },
      { speaker: 'Staff member', voice: 'male', text: "Great. Just give me item number four seventy-two when you come back, and it'll be quick." },
    ],
    questions: [
      {
        id: 'f01-ls-cv-lost-charger-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'Why does the student go to the lost-and-found office?',
        options: [
          'To turn in a charger she found in a lecture hall',
          "To ask about the office's closing time that day",
          'To find out whether her lost charger was turned in',
          'To replace a student ID card that she has lost',
        ],
        answer: [2],
        explanation:
          'La estudiante dice "I think I left my laptop charger in Lecture Hall B… Has anyone turned one in?". No encontró un cargador (A), lo perdió; y su carné no está perdido, sino en su habitación (D).',
      },
      {
        id: 'f01-ls-cv-lost-charger-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'What must the student show before she can collect the charger?',
        options: ['Her physical student ID card', 'A photo of her ID on her phone', 'A receipt for the charger', 'A signed note from her dorm'],
        answer: [0],
        explanation:
          'El empleado explica que "a photo of your ID on your phone doesn\'t count. It has to be the physical card." La foto en el móvil (B) se menciona precisamente para descartarla.',
      },
      {
        id: 'f01-ls-cv-lost-charger-q3',
        kind: 'single',
        skill: 'inference',
        prompt: 'What will the student probably do next?',
        options: [
          'Sign the release form and take the charger',
          'Buy a new charger at the campus store',
          'Wait at the office until six o\'clock',
          'Go to her dorm room to get her ID',
        ],
        answer: [3],
        explanation:
          'Dice "My dorm is only ten minutes away, so I\'ll be back before five": irá a buscar su carné. Aún no puede firmar y llevarse el cargador (A) porque no tiene el carné físico.',
      },
    ],
  },
  {
    id: 'f01-ls-cv-bike-workshop',
    form: 1,
    section: 'listening',
    task: 'conversation',
    title: 'Proposing a Bike Repair Workshop',
    topic: 'campus-life',
    difficulty: 'medium',
    context: 'Listen to a conversation between a student and the coordinator of the campus sustainability office.',
    script: [
      { speaker: 'Student', voice: 'male', text: "Hi, I'm Marcus. I emailed last week about an idea for a free bike repair workshop on campus." },
      { speaker: 'Coordinator', voice: 'female', text: 'Yes, I remember. You want students to be able to fix their own bikes, right?' },
      { speaker: 'Student', voice: 'male', text: 'Exactly. Lots of students stop riding because of a flat tire or a loose chain, and the shops in town charge thirty dollars just to look at a bike. With the right tools and a little guidance, most repairs would take ten minutes.' },
      { speaker: 'Coordinator', voice: 'female', text: 'I like it. It fits our goal of getting people out of their cars. What would you need to get started?' },
      { speaker: 'Student', voice: 'male', text: 'Mainly a basic tool kit: tire levers, a pump, wrenches, and a repair stand. I priced it out at about six hundred dollars.' },
      { speaker: 'Coordinator', voice: 'female', text: "I'm afraid our office can't cover that from this year's budget. But the Green Fund gives grants of up to a thousand dollars for student projects. The next deadline is the fifteenth of next month." },
      { speaker: 'Student', voice: 'male', text: 'That would cover everything. What about a location, though? I was thinking of the plaza outside the student union.' },
      { speaker: 'Coordinator', voice: 'female', text: "Outdoors could be a problem when it rains, and you'd have to carry the tools back and forth every time. The parking garage on Elm Street has an empty storage room on the ground floor. It's covered, and it can be locked." },
      { speaker: 'Student', voice: 'male', text: "Oh, that's even better. We could leave the repair stand set up all week." },
      { speaker: 'Coordinator', voice: 'female', text: "Right. I'll ask facilities whether we can use it. In the meantime, start on the grant application and send me a draft. I'm happy to look it over." },
      { speaker: 'Student', voice: 'male', text: "Thanks. I'll have a draft to you by Friday." },
    ],
    questions: [
      {
        id: 'f01-ls-cv-bike-workshop-q1',
        kind: 'single',
        skill: 'purpose',
        prompt: 'Why does the student meet with the coordinator?',
        options: [
          'To complain about the price of bike repairs in town',
          'To discuss his plan for a free bike repair workshop',
          'To apply for a job at the sustainability office',
          'To ask permission to park his bike in the garage',
        ],
        answer: [1],
        explanation:
          'Marcus dice que escribió "about an idea for a free bike repair workshop on campus", y toda la conversación trata de financiación y lugar. El precio de los talleres (A) es solo un argumento a favor de su idea.',
      },
      {
        id: 'f01-ls-cv-bike-workshop-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'How does the coordinator suggest paying for the tools?',
        options: [
          'By charging students a small fee for each repair',
          "By using money from her office's current budget",
          'By asking bike shops in town to donate them',
          'By applying for a grant from the Green Fund',
        ],
        answer: [3],
        explanation:
          'La coordinadora dice que su oficina "can\'t cover that from this year\'s budget", pero que "the Green Fund gives grants of up to a thousand dollars". B es justo lo que descarta.',
      },
      {
        id: 'f01-ls-cv-bike-workshop-q3',
        kind: 'single',
        skill: 'function',
        prompt: 'Why does the coordinator mention the storage room in the parking garage?',
        options: [
          'It solves the problems of rain and moving the tools.',
          'It is closer to the student union than the plaza is.',
          'It is the only place where bikes are allowed on campus.',
          'It would cost less to rent than an outdoor space.',
        ],
        answer: [0],
        explanation:
          'Tras señalar que en el exterior "could be a problem when it rains" y que habría que "carry the tools back and forth", propone el almacén porque "It\'s covered, and it can be locked". No se habla de distancia ni de alquiler (B, D).',
      },
    ],
  },
  {
    id: 'f01-ls-cv-memoir-sources',
    form: 1,
    section: 'listening',
    task: 'conversation',
    title: 'Relying on a Memoir',
    topic: 'history',
    difficulty: 'hard',
    context: 'Listen to a conversation between a student and her history professor.',
    script: [
      { speaker: 'Student', voice: 'female', text: 'Thanks for meeting with me, Professor. I wanted to talk about my paper on the 1937 dock strike. Your comment said I relied too much on one source.' },
      { speaker: 'Professor', voice: 'male', text: "Right. Your writing was clear, and the argument was well organized. But almost every key claim came from the mayor's memoir." },
      { speaker: 'Student', voice: 'female', text: "But he was actually there. He negotiated the settlement himself. Isn't that the best kind of primary source?" },
      { speaker: 'Professor', voice: 'male', text: "It's a valuable source, but think about when and why he wrote it. He published it twenty years later, while he was running for the Senate. What might that mean?" },
      { speaker: 'Student', voice: 'female', text: 'I guess he would want to make himself look good. Like a peacemaker.' },
      { speaker: 'Professor', voice: 'male', text: 'Exactly. Memoirs are written with hindsight, and usually with an audience in mind. Memory also fades over twenty years. So a memoir tells you a lot about how someone wanted to be remembered, but it is weaker evidence of what actually happened in a meeting.' },
      { speaker: 'Student', voice: 'female', text: 'So should I just take it out?' },
      { speaker: 'Professor', voice: 'male', text: "No, keep it, but corroborate it. Check his claims against sources created at the time: newspaper reports from that week, the union's meeting minutes, letters from his office. If they agree with the memoir, your argument becomes much stronger." },
      { speaker: 'Student', voice: 'female', text: "And if they don't agree?" },
      { speaker: 'Professor', voice: 'male', text: "Then that's interesting in itself. You could discuss why his later account is different. That kind of analysis is exactly what turns a good paper into an excellent one." },
      { speaker: 'Student', voice: 'female', text: 'Okay. Does the library have newspapers from 1937?' },
      { speaker: 'Professor', voice: 'male', text: "It does, on microfilm and online. And the city archive keeps the mayor's office letters. You can revise the paper and resubmit it by the end of the month." },
    ],
    questions: [
      {
        id: 'f01-ls-cv-memoir-sources-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'What is the main purpose of the conversation?',
        options: [
          'To discuss where to find old newspapers in the library',
          'To decide whether the student should change her topic',
          "To explain a weakness in the student's paper and how to fix it",
          "To compare the mayor's memoir with other published memoirs",
        ],
        answer: [2],
        explanation:
          'El profesor explica que "almost every key claim came from the mayor\'s memoir" y luego cómo mejorarlo: "keep it, but corroborate it". Los periódicos (A) son solo un detalle al final.',
      },
      {
        id: 'f01-ls-cv-memoir-sources-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'According to the professor, why is the memoir weaker evidence of what happened?',
        options: [
          'It was written by someone who was not present.',
          'It was written years later, when he sought office.',
          "It contradicts the union's meeting minutes.",
          'It was never published or made available.',
        ],
        answer: [1],
        explanation:
          'El profesor señala que "He published it twenty years later, while he was running for the Senate", y añade que la memoria se debilita. A es falsa: el alcalde "was actually there".',
      },
      {
        id: 'f01-ls-cv-memoir-sources-q3',
        kind: 'single',
        skill: 'inference',
        prompt: 'What does the professor imply about sources that disagree with the memoir?',
        options: [
          'They should be left out of the revised paper.',
          'They prove that the mayor deliberately lied.',
          'They are less reliable than the memoir itself.',
          'They could become a valuable part of her analysis.',
        ],
        answer: [3],
        explanation:
          'Ante la pregunta "And if they don\'t agree?", responde "Then that\'s interesting in itself. You could discuss why his later account is different." No afirma que el alcalde mintiera (B).',
      },
    ],
  },

  // ---------- Announcements ----------
  {
    id: 'f01-ls-an-stargazing-night',
    form: 1,
    section: 'listening',
    task: 'announcement',
    title: 'Free Stargazing Night',
    topic: 'campus-life',
    difficulty: 'easy',
    context: 'Listen to an announcement on a university campus.',
    script: [
      {
        speaker: 'Announcer',
        voice: 'female',
        text: "Hi, everyone! The Astronomy Club invites you to a free public stargazing night this Friday from eight to eleven p.m. at the campus observatory on top of Hill Hall. Club members will set up four large telescopes, so you'll be able to see the rings of Saturn and the craters on the Moon. Everyone is welcome, including friends and family, and no experience is needed. Dress warmly, because the observation deck gets cold after dark. Please keep in mind that the event depends on the weather. If the sky is cloudy, we'll cancel and try again the following Friday. We'll post any updates on the club's social media page by five p.m. on the day of the event.",
      },
    ],
    questions: [
      {
        id: 'f01-ls-an-stargazing-night-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'What is the announcement mainly about?',
        options: [
          'A free evening event for viewing the night sky',
          'A new astronomy course offered next semester',
          'The opening of a new observatory on campus',
          'A club meeting to elect new officers',
        ],
        answer: [0],
        explanation:
          'Se anuncia "a free public stargazing night this Friday" en el observatorio. El observatorio ya existe (C): solo es el lugar del evento.',
      },
      {
        id: 'f01-ls-an-stargazing-night-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'What will happen if the sky is cloudy on Friday?',
        options: [
          'The event will be moved indoors to Hill Hall.',
          'Club members will show photos of Saturn instead.',
          'The event will take place a week later instead.',
          'The event will start later in the evening.',
        ],
        answer: [2],
        explanation:
          'El anuncio dice "If the sky is cloudy, we\'ll cancel and try again the following Friday", es decir, una semana después. Hill Hall (A) es el edificio del observatorio, no un plan alternativo.',
      },
      {
        id: 'f01-ls-an-stargazing-night-q3',
        kind: 'single',
        skill: 'inference',
        prompt: 'What should people probably do before going to the event on Friday?',
        options: [
          'Register online with the Astronomy Club',
          "Check the club's page for updates that afternoon",
          'Bring their own telescope to the observatory',
          "Sign up for a beginners' training session",
        ],
        answer: [1],
        explanation:
          'Como el evento depende del tiempo, conviene revisar las novedades: "We\'ll post any updates… by five p.m. on the day of the event." No hace falta inscribirse ni experiencia previa ("no experience is needed").',
      },
    ],
  },
  {
    id: 'f01-ls-an-online-quiz-rules',
    form: 1,
    section: 'listening',
    task: 'announcement',
    title: 'Rules for Online Quizzes',
    topic: 'campus-life',
    difficulty: 'medium',
    context: 'Listen to an instructor talking to a class.',
    script: [
      {
        speaker: 'Professor',
        voice: 'male',
        text: "Before you take your first online quiz on Thursday, I want to go over the rules. First, your camera must be on for the whole quiz, and your face should be clearly visible. If the proctoring software can't see you, it will flag your attempt, and I'll have to review the recording. Second, you may have only one browser tab open, and that's the quiz itself. Opening any other tab or window will end your attempt automatically.",
      },
      {
        speaker: 'Professor',
        voice: 'male',
        text: "Now, what if your internet connection drops? Don't panic. Reconnect as quickly as you can and log back in. The timer keeps running, but your saved answers won't be lost. If you can't get back in within ten minutes, email me right away with a screenshot of the error message, and I'll arrange a make-up time.",
      },
    ],
    questions: [
      {
        id: 'f01-ls-an-online-quiz-rules-q1',
        kind: 'single',
        skill: 'purpose',
        prompt: 'What is the main purpose of the talk?',
        options: [
          'To explain how quiz scores will be calculated',
          "To announce that Thursday's quiz has been canceled",
          'To describe the topics that the quiz will cover',
          'To explain the rules for taking quizzes online',
        ],
        answer: [3],
        explanation:
          'El profesor dice "I want to go over the rules" y explica la cámara, las pestañas del navegador y qué hacer si se cae la conexión. El examen del jueves no se cancela (B).',
      },
      {
        id: 'f01-ls-an-online-quiz-rules-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'What will happen if a student opens a second browser tab?',
        options: [
          'The quiz attempt will end automatically.',
          'The professor will review the recording.',
          'The timer will stop until the tab is closed.',
          'The student will receive a warning message.',
        ],
        answer: [0],
        explanation:
          '"Opening any other tab or window will end your attempt automatically." Revisar la grabación (B) es lo que ocurre cuando la cámara no ve al estudiante.',
      },
      {
        id: 'f01-ls-an-online-quiz-rules-q3',
        kind: 'single',
        skill: 'inference',
        prompt: 'What is implied about a student whose connection drops for five minutes?',
        options: [
          'The student will have to take the quiz on another day.',
          'The student must email the professor a screenshot.',
          'The student will have less time left to finish.',
          "The student's saved answers will be erased.",
        ],
        answer: [2],
        explanation:
          'Si vuelve antes de diez minutos, solo tiene que conectarse de nuevo, pero "The timer keeps running", así que le quedará menos tiempo. El correo con captura (B) solo es necesario después de diez minutos.',
      },
    ],
  },
  {
    id: 'f01-ls-an-research-credits',
    form: 1,
    section: 'listening',
    task: 'announcement',
    title: 'Psychology Research Credits',
    topic: 'psychology',
    difficulty: 'hard',
    context: 'Listen to an announcement from the psychology department.',
    script: [
      {
        speaker: 'Professor',
        voice: 'female',
        text: "This announcement is for all students enrolled in Introduction to Psychology. As part of the course, you're required to earn four research credits by the last day of classes. You earn credits by taking part in studies run by the department. Each half hour of participation counts as one credit, so a one-hour study earns two. You'll sign up through the online research system, which lists each study's length and location. If you sign up but don't show up, and you didn't cancel at least twenty-four hours in advance, you'll lose one credit.",
      },
      {
        speaker: 'Professor',
        voice: 'female',
        text: "Now, some students prefer not to take part in research, and that's completely fine. Instead, you can write two short papers, each summarizing a published psychology study. Each paper is worth two credits. Either option counts the same toward your final grade.",
      },
    ],
    questions: [
      {
        id: 'f01-ls-an-research-credits-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'What is the announcement mainly about?',
        options: [
          'How to design a research study in psychology',
          'How students can meet a course research requirement',
          'Why the department needs more volunteers this term',
          'How to write a summary of a published study',
        ],
        answer: [1],
        explanation:
          'El anuncio explica que hay que "earn four research credits" y las dos formas de conseguirlos: participar en estudios o escribir resúmenes. D es solo una de esas opciones.',
      },
      {
        id: 'f01-ls-an-research-credits-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'How many credits does a student earn for a study that lasts ninety minutes?',
        options: ['One credit', 'Two credits', 'Four credits', 'Three credits'],
        answer: [3],
        explanation:
          '"Each half hour of participation counts as one credit"; noventa minutos son tres medias horas, es decir, tres créditos. "Two credits" (B) corresponde al ejemplo de un estudio de una hora.',
      },
      {
        id: 'f01-ls-an-research-credits-q3',
        kind: 'single',
        skill: 'inference',
        prompt: 'What can be inferred about a student who chooses not to take part in research?',
        options: [
          'The student can still earn all four credits by writing.',
          'The student will receive a lower grade in the course.',
          'The student must cancel twenty-four hours in advance.',
          'The student needs to write four papers instead of two.',
        ],
        answer: [0],
        explanation:
          'Se pueden escribir "two short papers" y "Each paper is worth two credits": 2 × 2 = 4, los créditos exigidos. B contradice "Either option counts the same toward your final grade".',
      },
    ],
  },

  // ---------- Academic Talks ----------
  {
    id: 'f01-ls-at-sunk-cost',
    form: 1,
    section: 'listening',
    task: 'academic-talk',
    title: 'The Sunk Cost Fallacy',
    topic: 'economics',
    difficulty: 'easy',
    context: 'Listen to part of a lecture in an economics class.',
    script: [
      { speaker: 'Professor', voice: 'male', text: "Okay, let's start with a situation you've probably experienced. Imagine you bought a nonrefundable concert ticket for fifty dollars. On the night of the concert, there's a snowstorm, you're feeling sick, and honestly, you'd rather stay home. But you think, 'I paid fifty dollars, so I have to go.' Sound familiar?" },
      { speaker: 'Professor', voice: 'male', text: "Economists call this the sunk cost fallacy. A sunk cost is money, time, or effort that you've already spent and can't get back. The key word is can't. Whether you go to the concert or not, that fifty dollars is gone. So, logically, it shouldn't affect your decision. The only question that matters is this: from this moment on, which option gives you the greater benefit compared with its cost?" },
      { speaker: 'Professor', voice: 'male', text: "In the concert example, going means driving through a storm while you're sick. Staying home means rest and safety. If staying home is better from now on, you should stay home, even though it feels like you're wasting the ticket. The ticket is wasted either way." },
      { speaker: 'Professor', voice: 'male', text: "And this doesn't just happen to individuals. Businesses and governments fall into the same trap. A company might keep pouring money into a failing project because it has already invested millions, when the smart move would be to stop and use the remaining money elsewhere. People sometimes call this throwing good money after bad." },
      { speaker: 'Professor', voice: 'male', text: 'So why do we do it? Part of the reason is that people hate admitting a loss. Quitting feels like confessing that the original decision was a mistake. Recognizing that feeling is the first step toward making better choices.' },
    ],
    questions: [
      {
        id: 'f01-ls-at-sunk-cost-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'What is the lecture mainly about?',
        options: [
          'Why concert tickets are usually nonrefundable',
          'How companies decide which projects to fund',
          'Why past costs should not guide future decisions',
          'How people can save money on entertainment',
        ],
        answer: [2],
        explanation:
          'La clase define la falacia del coste hundido y concluye que lo ya gastado "shouldn\'t affect your decision". La entrada de concierto (A) y la empresa (B) son solo ejemplos.',
      },
      {
        id: 'f01-ls-at-sunk-cost-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'According to the professor, what question should guide a decision?',
        options: [
          'How much money has already been spent on it',
          'Which option offers the greater benefit from now on',
          'Which option other people would most likely choose',
          'How the original decision could have been avoided',
        ],
        answer: [1],
        explanation:
          'El profesor dice: "The only question that matters is this: from this moment on, which option gives you the greater benefit compared with its cost?" A es justo el error que describe la falacia.',
      },
      {
        id: 'f01-ls-at-sunk-cost-q3',
        kind: 'single',
        skill: 'organization',
        prompt: 'Why does the professor mention a company that keeps funding a failing project?',
        options: [
          'To show that organizations also make this mistake',
          'To explain how businesses recover their sunk costs',
          'To argue that companies should never take risks',
          'To compare the cost of a project with a ticket',
        ],
        answer: [0],
        explanation:
          'Lo presenta con "this doesn\'t just happen to individuals. Businesses and governments fall into the same trap": el ejemplo amplía la idea a las organizaciones. Los costes hundidos no se recuperan (B).',
      },
      {
        id: 'f01-ls-at-sunk-cost-q4',
        kind: 'single',
        skill: 'inference',
        prompt: 'What does the professor imply about people who continue something only because of past costs?',
        options: [
          'They usually have more money than other people.',
          'They are carefully weighing future benefits.',
          'They may be trying to avoid admitting a mistake.',
          'They will eventually recover what they spent.',
        ],
        answer: [2],
        explanation:
          'Al final explica que "people hate admitting a loss" y que "Quitting feels like confessing that the original decision was a mistake". B es lo contrario: no están pensando en los beneficios futuros.',
      },
    ],
  },
  {
    id: 'f01-ls-at-monarch-migration',
    form: 1,
    section: 'listening',
    task: 'academic-talk',
    title: 'How Monarchs Find Mexico',
    topic: 'biology',
    difficulty: 'medium',
    context: 'Listen to part of a lecture in a biology class.',
    script: [
      { speaker: 'Professor', voice: 'female', text: 'Today I want to talk about one of the most remarkable journeys in the animal world: the migration of the monarch butterfly. Every autumn, monarchs from the eastern United States and southern Canada fly south, some of them traveling more than four thousand kilometers, to spend the winter in a few mountain forests in central Mexico.' },
      { speaker: 'Professor', voice: 'female', text: "Now, here's the surprising part. The butterflies that arrive in Mexico have never been there before. In fact, no single monarch makes the whole round trip. The migrating generation is special: these butterflies live for about eight months, while summer monarchs live only a few weeks. In spring, the migrants fly north, lay eggs on milkweed plants in the southern United States, and die. Their offspring continue north, and it takes three or four generations to reach Canada. Then, in late summer, a new long-lived generation is born and heads south." },
      { speaker: 'Professor', voice: 'female', text: "So how do they find a place they've never seen? Their main tool is the sun. Monarchs use the sun's position as a compass. But there's a problem: the sun moves across the sky during the day. If a butterfly simply flew toward the sun, it would head east in the morning and west in the afternoon." },
      { speaker: 'Professor', voice: 'female', text: "To solve this, monarchs combine the sun's position with an internal clock. This is called a time-compensated sun compass. The butterfly adjusts its flight angle relative to the sun depending on the time of day, so it keeps heading southwest all day long." },
      { speaker: 'Student', voice: 'male', text: 'So is that clock in the brain?' },
      { speaker: 'Professor', voice: 'female', text: "That's what researchers expected. But experiments suggest that clocks in the antennae play a key role. When the antennae were removed, monarchs could still see the sun, yet they couldn't hold a steady course to the southwest. So the antennae seem to supply the timing information that the compass needs." },
    ],
    questions: [
      {
        id: 'f01-ls-at-monarch-migration-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'What is the lecture mainly about?',
        options: [
          'Why monarch populations in Mexico are declining',
          'How monarchs choose plants on which to lay eggs',
          'Why summer monarchs live longer than migrants',
          'How monarchs migrate and find their way to Mexico',
        ],
        answer: [3],
        explanation:
          'La profesora describe el viaje multigeneracional y cómo se orientan ("how do they find a place they\'ve never seen?"). C invierte el dato: los migrantes viven más ("about eight months").',
      },
      {
        id: 'f01-ls-at-monarch-migration-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'According to the professor, what is special about the generation that migrates south?',
        options: [
          'Its members live much longer than summer monarchs.',
          'Its members have made the journey once before.',
          'Its members lay their eggs on the way to Mexico.',
          'Its members travel only during the morning.',
        ],
        answer: [0],
        explanation:
          'La profesora explica que "these butterflies live for about eight months, while summer monarchs live only a few weeks". B contradice la afirmación de que "have never been there before".',
      },
      {
        id: 'f01-ls-at-monarch-migration-q3',
        kind: 'single',
        skill: 'organization',
        prompt: 'Why does the professor say that a butterfly flying toward the sun would head east in the morning?',
        options: [
          'To show that monarchs prefer to fly early in the day',
          'To explain why monarchs spend the winter in Mexico',
          'To illustrate why a sun compass alone is not enough',
          'To point out an error in earlier research on monarchs',
        ],
        answer: [2],
        explanation:
          'Lo dice para presentar "a problem: the sun moves across the sky"; por eso los monarcas necesitan además un reloj interno ("time-compensated sun compass").',
      },
      {
        id: 'f01-ls-at-monarch-migration-q4',
        kind: 'single',
        skill: 'inference',
        prompt: 'What can be inferred about the monarchs whose antennae were removed?',
        options: [
          'They could no longer see the position of the sun.',
          'They lacked the timing information needed to navigate.',
          'They flew toward Mexico faster than other monarchs.',
          "They relied on Earth's magnetic field to find their way.",
        ],
        answer: [1],
        explanation:
          'Sin antenas "could still see the sun, yet they couldn\'t hold a steady course", y la profesora concluye que "the antennae seem to supply the timing information". A contradice "could still see the sun".',
      },
    ],
  },
  {
    id: 'f01-ls-at-cepheid-variables',
    form: 1,
    section: 'listening',
    task: 'academic-talk',
    title: 'Cepheids and Cosmic Distances',
    topic: 'astronomy',
    difficulty: 'hard',
    context: 'Listen to part of a lecture in an astronomy class.',
    script: [
      { speaker: 'Professor', voice: 'male', text: "Last time we saw that measuring the distance to a star is one of the hardest problems in astronomy. Parallax works well for relatively nearby stars, but for more distant objects the shift becomes too small to measure. So how can we measure the distance to another galaxy? Today's story begins with a particular kind of star, the Cepheid variable." },
      { speaker: 'Professor', voice: 'male', text: 'Cepheids are stars that pulsate. They swell and shrink in a regular rhythm, and as they do, their brightness rises and falls. One cycle, which we call the period, can last anywhere from about a day to a few months, and for any given Cepheid the period stays remarkably steady.' },
      { speaker: 'Professor', voice: 'male', text: "In the early nineteen hundreds, Henrietta Leavitt was working at the Harvard College Observatory, studying photographic plates of the Small Magellanic Cloud, a small galaxy near our own. She identified many Cepheids there and noticed something striking: the brighter ones had longer periods. Why did that matter? Because all the stars in the Small Magellanic Cloud are at roughly the same distance from us. So if one Cepheid there looks brighter than another, it really is giving off more light. Leavitt had found that a Cepheid's true brightness, its luminosity, is linked to its period. She published this period-luminosity relationship in 1912." },
      { speaker: 'Professor', voice: 'male', text: "Here's why that is so powerful. Suppose you find a Cepheid in a distant galaxy. You measure its period, and the relationship tells you how luminous the star really is. Then you compare that with how bright it appears from Earth. Since light grows fainter in a predictable way as it spreads out, the difference tells you the distance. Astronomers call objects like this standard candles." },
      { speaker: 'Professor', voice: 'male', text: 'There was one catch: at first, the relationship gave only relative distances, so astronomers had to measure the actual distance to a few nearby Cepheids to calibrate it. Once that was done, it changed our picture of the universe. In the 1920s, Edwin Hubble found Cepheids in the Andromeda nebula and used them to show that it lies far outside the Milky Way. It was a separate galaxy.' },
    ],
    questions: [
      {
        id: 'f01-ls-at-cepheid-variables-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'What is the lecture mainly about?',
        options: [
          'Why parallax is the best way to measure distance',
          'How Cepheid stars let astronomers measure great distances',
          'How Hubble discovered that the universe is expanding',
          'Why the Small Magellanic Cloud contains so many stars',
        ],
        answer: [1],
        explanation:
          'La clase explica la relación periodo-luminosidad de Leavitt y cómo convierte a las cefeidas en "standard candles" para medir distancias. A es falsa: el paralaje no sirve para objetos lejanos; la expansión del universo (C) no se menciona.',
      },
      {
        id: 'f01-ls-at-cepheid-variables-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'Why was it important that the Cepheids Leavitt studied were all in the Small Magellanic Cloud?',
        options: [
          'They were close enough to be measured by parallax.',
          'They all pulsated with exactly the same period.',
          'Their differences in brightness reflected true luminosity.',
          'They were brighter than any Cepheids in the Milky Way.',
        ],
        answer: [2],
        explanation:
          'Como "all the stars in the Small Magellanic Cloud are at roughly the same distance from us", si una parece más brillante "it really is giving off more light". B es falsa: las más brillantes tenían periodos más largos.',
      },
      {
        id: 'f01-ls-at-cepheid-variables-q3',
        kind: 'single',
        skill: 'organization',
        prompt: "Why does the professor mention Edwin Hubble's work on the Andromeda nebula?",
        options: [
          'To show how Cepheids changed our view of the universe',
          "To give an example of an error in Leavitt's work",
          'To explain how parallax measurements were calibrated',
          'To show that Cepheids exist only in other galaxies',
        ],
        answer: [0],
        explanation:
          'El profesor dice que, una vez calibrada la relación, "it changed our picture of the universe", y lo ilustra con Hubble, que demostró que Andrómeda "was a separate galaxy". No se señala ningún error de Leavitt (B).',
      },
      {
        id: 'f01-ls-at-cepheid-variables-q4',
        kind: 'single',
        skill: 'inference',
        prompt: 'What can be inferred about two Cepheids that have the same period but differ in apparent brightness?',
        options: [
          'The fainter one must have a shorter true period.',
          'The brighter one must give off much more light.',
          'Both stars must be located in the same galaxy.',
          'The fainter one must be farther away from Earth.',
        ],
        answer: [3],
        explanation:
          'Si tienen el mismo periodo, la relación indica la misma luminosidad real; entonces, como "light grows fainter… as it spreads out", la que se ve más débil está más lejos. B contradice la relación periodo-luminosidad.',
      },
    ],
  },
];
