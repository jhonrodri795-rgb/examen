import type { Difficulty, ListeningSet, Topic, Voice } from '../../../types';

/** Simulación n.º 2 — Listening (contenido original). */

function cr(
  slug: string,
  difficulty: Difficulty,
  voice: Voice,
  line: string,
  options: string[],
  answer: number,
  explanation: string,
  topic: Topic = 'campus-life',
): ListeningSet {
  const id = `f02-ls-cr-${slug}`;
  return {
    id,
    form: 2,
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
  cr('walk-art-building', 'easy', 'female', 'How long does it take to walk from the dorms to the art building?', [
    "It's a long building with three floors.",
    'About fifteen minutes through the park.',
    'I walked there with my roommate yesterday.',
    'The art building opens at eight every morning.',
  ], 1, 'Se pregunta por la duración del trayecto ("how long… to walk"); solo "About fifteen minutes" da ese dato. La primera opción repite "long" pero habla del tamaño del edificio.'),
  cr('save-seat', 'easy', 'female', "Could you save me a seat at the film screening tonight? I'm running a bit late.", [
    'I saved a lot of money on the movie tickets.',
    'The film was already screened last week.',
    "Yes, she's running in the big race tonight.",
    "No problem. I'll keep the one next to me.",
  ], 3, 'Es una petición ("Could you save me a seat"); la respuesta natural acepta ("No problem") y promete guardar el asiento de al lado. "Saved… money" y "running in the race" solo repiten palabras con otro sentido.'),
  cr('coffee-offer', 'easy', 'female', "I'm stopping at the café on my way back. Want me to grab you a coffee?", [
    "That'd be great. A small latte, please.",
    'I grabbed my bag on the way out.',
    'The café is right across from the bank.',
    'I usually stop there on my way to class.',
  ], 0, 'Es un ofrecimiento ("Want me to grab you a coffee?"); se acepta y se concreta el pedido. "Grabbed my bag" repite el verbo sin responder a la oferta.', 'daily-life'),
  cr('spring-break-question', 'easy', 'male', 'So, what did you do over spring break?', [
    "I'm going to the beach with friends next week.",
    'Spring is my favorite time of the year.',
    'Not much. I mostly visited my parents.',
    'It broke on the first day of the trip.',
  ], 2, 'La pregunta es sobre el pasado ("what did you do"); la respuesta adecuada cuenta qué hizo. "I\'m going to the beach with friends next week" usa futuro, y "Spring…" y "broke" son trampas de sonido.'),
  cr('new-backpack', 'easy', 'female', 'I love your new backpack! It looks really practical.', [
    "I'll pack it tonight before the trip.",
    'I usually practice in the evenings.',
    "It's in the back of the classroom.",
    'Thanks! It even has a laptop pocket.',
  ], 3, 'Ante un cumplido se agradece y se añade un comentario ("Thanks! It even has a laptop pocket."). Las demás opciones juegan con sonidos parecidos: "pack", "practice", "back".'),
  cr('bring-cousin', 'easy', 'female', 'Would it be okay if I brought my cousin to dinner on Friday?', [
    "Of course! I'll cook a little extra.",
    'My cousin lives in another city now.',
    'Dinner was delicious last Friday night.',
    'Yes, I brought it with me this time.',
  ], 0, 'Pide permiso ("Would it be okay if…"); la respuesta lo concede y añade un detalle lógico. "Yes, I brought it with me this time" repite el verbo pero no responde a la petición.', 'daily-life'),

  // ---------- Choose a Response: medium ----------
  cr('fundraiser-poster', 'medium', 'male', 'I was wondering if you might have time to design the poster for our fundraiser.', [
    'The fundraiser raised over two thousand dollars.',
    'I wonder who designed that poster.',
    "I'd be happy to. When do you need it by?",
    'Yes, the poster is hanging by the door.',
  ], 2, '"I was wondering if you might…" es una petición indirecta; la respuesta natural acepta y pregunta por el plazo. "I wonder who designed…" solo imita la estructura sin aceptar.'),
  cr('group-video', 'medium', 'female', 'Honestly, it feels like only two of us did any work on the group video.', [
    'The video is only about ten minutes long.',
    "I know. Let's talk to the others about it.",
    'Two of us are working at the library tomorrow.',
    'I watched the whole video twice last night.',
  ], 1, 'Es una queja sobre el reparto del trabajo; la respuesta adecuada muestra acuerdo ("I know") y propone una solución. Las otras opciones repiten "video" o "two of us" sin reaccionar a la queja.'),
  cr('meeting-place', 'medium', 'male', 'Would you rather meet in the library or the student lounge?', [
    'Yes, I would rather do that this time.',
    'I met him in the student lounge yesterday.',
    'Both of those buildings were built in the 1960s.',
    "The lounge. We won't have to whisper there.",
  ], 3, 'Una pregunta de elección ("the library or the student lounge?") no se contesta con "yes"; hay que elegir una opción: "The lounge…", con una razón.'),
  cr('thursday-lab', 'medium', 'female', "Don't you have a lab on Thursday afternoons?", [
    'Not anymore. It moved to Tuesday mornings.',
    'The lab just got some new microscopes.',
    'I had a lot of fun there last Thursday.',
    'Thursdays are usually busy for her.',
  ], 0, 'La pregunta negativa ("Don\'t you have…?") pide confirmar un dato; "Not anymore. It moved to Tuesday" corrige la suposición. La última opción cambia de persona ("her").'),
  cr('cook-dishes', 'medium', 'male', "I'll cook tonight if you do the dishes afterward.", [
    'The dishes are in the top cabinet.',
    "Deal. I'll clean up after dinner.",
    'I did my homework afterward.',
    'He cooks for his family every night.',
  ], 1, 'Es una propuesta condicional (un trato): "I\'ll cook… if you do the dishes". "Deal. I\'ll clean up" la acepta. Las demás opciones repiten "dishes", "afterward" o "cooks" sin aceptar el trato.', 'daily-life'),
  cr('summer-job-worry', 'medium', 'female', "I've applied to so many places, and I'm worried I won't find a summer job.", [
    'Yes, I applied sunscreen before going out.',
    'That job pays about fifteen dollars an hour.',
    "Don't give up. The career center can help.",
    "I'm not worried about the weather this week.",
  ], 2, 'Ante una preocupación se ofrece ánimo y una ayuda concreta: "Don\'t give up. The career center can help". "Applied sunscreen" y "not worried about the weather" son trampas de palabras repetidas.', 'daily-life'),

  // ---------- Choose a Response: hard ----------
  cr('cover-shift', 'hard', 'male', 'Is there any chance you could cover my shift this Saturday?', [
    "Sorry, I can't, but Ana wants extra hours.",
    'I covered the table with a clean white cloth.',
    'My shift ended at six o\'clock yesterday.',
    "Yes, there's a good chance of rain on Saturday.",
  ], 0, 'Es una petición de favor; la respuesta rechaza con cortesía ("Sorry, I can\'t") y ofrece una alternativa (Ana quiere más horas). "Good chance of rain" interpreta "chance" de forma literal.', 'daily-life'),
  cr('square-one', 'hard', 'female', "The file with all our survey data is gone. We're back to square one.", [
    'The square is just behind the library.',
    "Great, so we're almost finished with it.",
    "I'll be back here in about one hour.",
    "Then we'll have to run the survey again.",
  ], 3, '"Back to square one" significa volver a empezar desde cero. La respuesta lógica acepta que hay que repetir la encuesta ("run the survey again"). "Great, so we\'re almost finished" interpreta el modismo al revés.'),
  cr('heavy-box', 'hard', 'male', 'This box is a lot heavier than I expected.', [
    'I expected it to rain this afternoon.',
    'Yes, it weighs about the same as mine.',
    'Here, let me grab the other end.',
    'The box was delivered on Monday.',
  ], 2, 'El comentario es una petición implícita de ayuda; "let me grab the other end" ofrece ayuda. "It weighs about the same as mine" responde solo al dato literal y no reacciona a la necesidad.'),
  cr('lost-keys', 'hard', 'female', "Don't tell me you lost your keys again.", [
    "Okay, I won't tell you anything about it.",
    'I know. They must be in my other jacket.',
    'I lost the tennis match again last night.',
    "No, I didn't tell anyone about the keys.",
  ], 1, '"Don\'t tell me…" expresa fastidio, no es una orden literal. La respuesta natural lo reconoce ("I know") y da una pista de dónde están las llaves. "Okay, I won\'t tell you" lo interpreta literalmente.', 'daily-life'),
  cr('hike-bargain', 'hard', 'male', 'That hike was a bit more than I bargained for.', [
    'Same here. My legs are really sore.',
    'Did you get a good price for the trip?',
    'The hike starts at nine tomorrow morning.',
    "I'd like a bit more of that, please.",
  ], 0, '"More than I bargained for" = más duro de lo que esperaba; implica cansancio. "Same here. My legs are really sore" comparte esa idea. "A good price" malinterpreta "bargain" como regatear.', 'daily-life'),
  cr('meeting-rescheduled', 'hard', 'female', 'This is the third time the meeting has been rescheduled.', [
    'The third meeting was held on Tuesday morning.',
    'I scheduled three classes on Monday.',
    "I'm the third person in line right now.",
    "I know. It's getting really annoying.",
  ], 3, 'Es una queja; la respuesta adecuada muestra empatía ("I know") y comparte la frustración. Las demás opciones repiten "third" o "schedule" sin reaccionar a la queja.'),

  // ---------- Conversations ----------
  {
    id: 'f02-ls-cv-window-latch',
    form: 2,
    section: 'listening',
    task: 'conversation',
    title: 'Reporting a Broken Window Latch',
    topic: 'campus-life',
    difficulty: 'easy',
    context: 'Listen to a conversation between a student and a housing office employee.',
    script: [
      { speaker: 'Student', voice: 'female', text: "Hi. I live in Carter Hall, room 112, and the latch on my window is broken. The window won't stay shut, and it gets really cold at night." },
      { speaker: 'Employee', voice: 'male', text: 'Sorry to hear that. Have you submitted a maintenance request yet?' },
      { speaker: 'Student', voice: 'female', text: 'No. I thought I could just report it here at the front desk.' },
      { speaker: 'Employee', voice: 'male', text: "We actually can't create work orders at the desk anymore. Everything goes through the online maintenance portal now. You log in with your student ID, choose your building, and describe the problem." },
      { speaker: 'Student', voice: 'female', text: 'Okay. How long does it usually take for someone to come?' },
      { speaker: 'Employee', voice: 'male', text: "It depends on the category. Urgent problems, like a water leak or a door that won't lock, are handled within twenty-four hours. Most other repairs take three to five business days." },
      { speaker: 'Student', voice: 'female', text: "Hmm. Would a broken window latch count as urgent? My room's on the ground floor." },
      { speaker: 'Employee', voice: 'male', text: "Actually, yes. If a ground-floor window can't be locked, that's a security issue. Select 'urgent' and mention that it's a ground-floor room." },
      { speaker: 'Student', voice: 'female', text: "Great. I'll do that as soon as I get back to my room." },
      { speaker: 'Employee', voice: 'male', text: "And if no one has come by tomorrow afternoon, call the number on our website and we'll follow up." },
    ],
    questions: [
      {
        id: 'f02-ls-cv-window-latch-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'Why does the student go to the housing office?',
        options: [
          'To ask for a room on a higher floor',
          'To complain about a noisy neighbor',
          'To report a problem with her window',
          'To pick up a replacement student ID',
        ],
        answer: [2],
        explanation:
          'La estudiante dice al empezar: "the latch on my window is broken. The window won\'t stay shut". El carné de estudiante solo se menciona para entrar en el portal.',
      },
      {
        id: 'f02-ls-cv-window-latch-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'How must the student request the repair?',
        options: [
          'By submitting a request online',
          'By filling out a form at the desk',
          'By calling the maintenance office',
          'By emailing her resident advisor',
        ],
        answer: [0],
        explanation:
          'El empleado explica: "Everything goes through the online maintenance portal now". Llamar por teléfono solo se sugiere si nadie ha ido al día siguiente, no para pedir la reparación.',
      },
      {
        id: 'f02-ls-cv-window-latch-q3',
        kind: 'single',
        skill: 'inference',
        prompt: "What can be inferred about the student's repair?",
        options: [
          'It will take three to five business days.',
          'It will probably be handled within a day.',
          'It will not be done until next month.',
          'It will have to be paid for by the student.',
        ],
        answer: [1],
        explanation:
          'Como su habitación está en la planta baja y la ventana no cierra, es "a security issue" y debe marcarse como urgente; los casos urgentes se atienden "within twenty-four hours". Los "three to five business days" son para reparaciones normales.',
      },
    ],
  },
  {
    id: 'f02-ls-cv-dress-rehearsal',
    form: 2,
    section: 'listening',
    task: 'conversation',
    title: 'Missing the Dress Rehearsal',
    topic: 'campus-life',
    difficulty: 'medium',
    context: 'Listen to a conversation between a student and an orchestra conductor.',
    script: [
      { speaker: 'Student', voice: 'male', text: 'Professor Reyes, do you have a minute? I need to talk to you about the dress rehearsal next Thursday.' },
      { speaker: 'Conductor', voice: 'female', text: "Of course, Ethan. What's going on?" },
      { speaker: 'Student', voice: 'male', text: "My sister is getting married that weekend in Ohio, and I have to fly out on Thursday morning. I'm really sorry. I only found out about the flight yesterday." },
      { speaker: 'Conductor', voice: 'female', text: "Congratulations to your sister. But you know the policy: anyone who misses the dress rehearsal normally can't play in the concert." },
      { speaker: 'Student', voice: 'male', text: "I know. That's why I wanted to tell you as early as possible. Is there anything I can do?" },
      { speaker: 'Conductor', voice: 'female', text: 'Well, the rule exists because the dress rehearsal is the only time we play the full program, in order, in the concert hall. The acoustics there are very different from our rehearsal room.' },
      { speaker: 'Student', voice: 'male', text: "That makes sense. I wouldn't want to throw off the rest of the cello section." },
      { speaker: 'Conductor', voice: 'female', text: "Here's what I can offer. The cellos are having an extra sectional rehearsal on Tuesday evening, in the concert hall. If you attend that and stay afterward so we can run your two solo passages, I'll make an exception." },
      { speaker: 'Student', voice: 'male', text: "Tuesday evening works for me. Thank you so much. I'll be there." },
      { speaker: 'Conductor', voice: 'female', text: 'Good. And send me an email confirming all of this, so I have it in writing for the music department.' },
    ],
    questions: [
      {
        id: 'f02-ls-cv-dress-rehearsal-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'Why does the student go to see the conductor?',
        options: [
          'To ask for permission to play a solo',
          'To complain about the rehearsal room',
          "To invite her to his sister's wedding",
          'To explain why he will miss a rehearsal',
        ],
        answer: [3],
        explanation:
          'Ethan quiere hablar "about the dress rehearsal next Thursday" porque tiene que viajar a la boda de su hermana. Los solos se mencionan después, como parte de la solución de la directora.',
      },
      {
        id: 'f02-ls-cv-dress-rehearsal-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'According to the conductor, why is the dress rehearsal required?',
        options: [
          'It is the only rehearsal that includes all the soloists.',
          'It is held in the concert hall with the full program.',
          'The department records it to assign final grades.',
          'New members learn the seating plan during it.',
        ],
        answer: [1],
        explanation:
          'La directora explica: "the dress rehearsal is the only time we play the full program, in order, in the concert hall", donde la acústica es distinta. No dice que sea el único ensayo con solistas.',
      },
      {
        id: 'f02-ls-cv-dress-rehearsal-q3',
        kind: 'single',
        skill: 'attitude',
        prompt: "What is the conductor's attitude toward the student's situation?",
        options: [
          'She plans to change the attendance policy for everyone.',
          'She thinks the student should skip the wedding.',
          'She will bend the rule if he meets her conditions.',
          "She does not believe the student's explanation.",
        ],
        answer: [2],
        explanation:
          'Recuerda la norma, pero ofrece una salida: "If you attend that and stay afterward… I\'ll make an exception". Es una excepción solo para él, no un cambio de la política general.',
      },
    ],
  },
  {
    id: 'f02-ls-cv-grant-budget',
    form: 2,
    section: 'listening',
    task: 'conversation',
    title: 'Fixing a Research Grant Budget',
    topic: 'campus-life',
    difficulty: 'hard',
    context: 'Listen to a conversation between a student and her professor.',
    script: [
      { speaker: 'Student', voice: 'female', text: "Thanks for reading my grant application, Professor Lin. I'm hoping to submit it to the undergraduate research office by Friday." },
      { speaker: 'Professor', voice: 'male', text: "You're welcome, Maya. Your research question is strong. Studying how road salt affects frogs in the campus ponds is exactly the kind of local project the committee likes. The budget justification, though, needs work." },
      { speaker: 'Student', voice: 'female', text: 'Really? I thought the budget was the easy part. I just listed everything I need.' },
      { speaker: 'Professor', voice: 'male', text: "That's the problem. A list isn't a justification. For each item, the committee wants to know why it's necessary and how you arrived at the cost. For example, you've asked for twelve hundred dollars for a water-quality meter, but you don't say why you can't use the meters our department already owns." },
      { speaker: 'Student', voice: 'female', text: "Oh. I didn't know the department had any." },
      { speaker: 'Professor', voice: 'male', text: "We have two. If you really need your own, say, because you'll be sampling every day for three months, explain that. Otherwise, reviewers may assume you're padding the budget." },
      { speaker: 'Student', voice: 'female', text: 'Okay. What about the travel costs? I included gas money for driving to the ponds.' },
      { speaker: 'Professor', voice: 'male', text: "All the ponds are within walking distance of campus, aren't they? Asking for mileage there will look careless. Remove it, or explain why you'd need a car, to carry heavy equipment, for instance." },
      { speaker: 'Student', voice: 'female', text: 'That makes sense. Anything else?' },
      { speaker: 'Professor', voice: 'male', text: 'One more thing. You ask for a stipend for forty hours a week over the summer, but your timeline only describes about twenty hours of work a week. The numbers in the budget and the timeline have to match.' },
      { speaker: 'Student', voice: 'female', text: 'I see. So I should either add tasks to the timeline or lower the stipend.' },
      { speaker: 'Professor', voice: 'male', text: "Exactly. Make those changes and send it back to me by Wednesday. I'll take one more look before Friday." },
    ],
    questions: [
      {
        id: 'f02-ls-cv-grant-budget-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'What is the conversation mainly about?',
        options: [
          'How to design an experiment on road salt',
          'Weaknesses in how the student justified her costs',
          'Whether the student should choose a new project',
          'How the committee decides which projects to fund',
        ],
        answer: [1],
        explanation:
          'El profesor elogia la pregunta de investigación, pero dice: "The budget justification, though, needs work", y repasa el medidor, el transporte y el estipendio. No le pide cambiar de proyecto.',
      },
      {
        id: 'f02-ls-cv-grant-budget-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'What problem does the professor point out about the water-quality meter?',
        options: [
          "Its price is above the grant's spending limit.",
          'It cannot measure road salt accurately.',
          'It must be ordered several months in advance.',
          'She did not explain why she needs her own.',
        ],
        answer: [3],
        explanation:
          'El profesor dice: "you don\'t say why you can\'t use the meters our department already owns". No critica el precio en sí, sino la falta de justificación.',
      },
      {
        id: 'f02-ls-cv-grant-budget-q3',
        kind: 'single',
        skill: 'inference',
        prompt: 'What does the professor imply about the travel costs?',
        options: [
          'They are probably unnecessary for this project.',
          'They should be moved into the stipend budget instead.',
          'They are lower than reviewers usually expect.',
          'They must include the cost of a rental car.',
        ],
        answer: [0],
        explanation:
          'Al decir "All the ponds are within walking distance of campus, aren\'t they?" y que pedir kilometraje "will look careless", da a entender que ese gasto sobra, salvo que haya una razón clara.',
      },
    ],
  },

  // ---------- Announcements ----------
  {
    id: 'f02-ls-an-lot-b-repaving',
    form: 2,
    section: 'listening',
    task: 'announcement',
    title: 'Lot B Closed for Repaving',
    topic: 'campus-life',
    difficulty: 'easy',
    context: 'Listen to an announcement on a university campus.',
    script: [
      {
        speaker: 'Announcer',
        voice: 'female',
        text: "Attention, students and staff. This is an announcement from Parking Services. Beginning next Monday, Parking Lot B, behind the science building, will be closed for repaving. The work is expected to take five days, and the lot should reopen the following Monday. During the closure, drivers with a Lot B permit may park in Lot D, next to the stadium. You don't need a new permit; simply display your current one. Because Lot D is farther from the main buildings, a free shuttle will run from Lot D to the science building every ten minutes from seven in the morning until six in the evening Any vehicles left in Lot B after Sunday night will be towed at the owner's expense. Thank you for your patience.",
      },
    ],
    questions: [
      {
        id: 'f02-ls-an-lot-b-repaving-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'What is the main purpose of the announcement?',
        options: [
          'To inform drivers about a temporary parking change',
          'To announce new prices for parking permits',
          'To explain how to apply for a parking permit',
          'To describe a new bus route around the stadium area',
        ],
        answer: [0],
        explanation:
          'El anuncio informa de que el aparcamiento B "will be closed for repaving" durante cinco días y de que se debe usar el D. El autobús lanzadera es solo un detalle de ese cambio temporal.',
      },
      {
        id: 'f02-ls-an-lot-b-repaving-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'What must Lot B permit holders do to park in Lot D?',
        options: [
          'Buy a temporary permit online',
          'Register their car for the shuttle',
          'Display the permit they already have',
          'Arrive before seven in the morning',
        ],
        answer: [2],
        explanation:
          'Se dice: "You don\'t need a new permit; simply display your current one." Las siete de la mañana es la hora de inicio de la lanzadera, no un requisito para aparcar.',
      },
      {
        id: 'f02-ls-an-lot-b-repaving-q3',
        kind: 'single',
        skill: 'inference',
        prompt: 'What will probably happen to a car that is still in Lot B on Monday morning?',
        options: [
          'It will be moved to Lot D at no cost.',
          'Its owner will be given a new permit.',
          'It will only get a warning on the windshield.',
          'It will be towed, and the owner will pay.',
        ],
        answer: [3],
        explanation:
          'El anuncio advierte: "Any vehicles left in Lot B after Sunday night will be towed at the owner\'s expense". Por eso no lo moverán gratis al aparcamiento D.',
      },
    ],
  },
  {
    id: 'f02-ls-an-fitness-reservations',
    form: 2,
    section: 'listening',
    task: 'announcement',
    title: 'Reservations for Fitness Classes',
    topic: 'campus-life',
    difficulty: 'medium',
    context: 'Listen to an announcement from the campus recreation center.',
    script: [
      {
        speaker: 'Announcer',
        voice: 'male',
        text: "Good morning, everyone. Here's an important update from the campus recreation center. Starting next Monday, all group fitness classes, including yoga, spin, and kickboxing, will require an online reservation. You can reserve a spot through the recreation center app up to forty-eight hours before a class begins. Walk-ins will be admitted only if spots are still open five minutes after the class starts. We're making this change because many popular classes have been overcrowded, and some students have been turned away at the door. Please note our new no-show rule: if you reserve a spot and don't attend, and you haven't canceled at least two hours in advance, that counts as a no-show. Three no-shows within one month will block your account from making reservations for two weeks. Thank you, and we'll see you at the gym!",
      },
    ],
    questions: [
      {
        id: 'f02-ls-an-fitness-reservations-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'What is the announcement mainly about?',
        options: [
          'The opening of a new kickboxing class',
          'A new booking system for fitness classes',
          "Changes to the recreation center's hours",
          'A discount for students who use the app',
        ],
        answer: [1],
        explanation:
          'El anuncio explica que las clases "will require an online reservation" y la nueva norma de ausencias. El kickboxing es solo un ejemplo de clase.',
      },
      {
        id: 'f02-ls-an-fitness-reservations-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'Why is the recreation center making this change?',
        options: [
          'Instructors asked for smaller classes.',
          'The new app needed to be tested.',
          'Some classes were canceled too often.',
          'Popular classes have been too crowded.',
        ],
        answer: [3],
        explanation:
          'El motivo es explícito: "many popular classes have been overcrowded, and some students have been turned away at the door". No se habla de peticiones de los instructores.',
      },
      {
        id: 'f02-ls-an-fitness-reservations-q3',
        kind: 'single',
        skill: 'inference',
        prompt: 'What will probably happen to a student who misses three reserved classes in a month without canceling?',
        options: [
          'The student will have to pay a cancellation fine.',
          'The student will lose all access to the gym.',
          'The student will be unable to reserve for a while.',
          'The student will be placed on a waiting list.',
        ],
        answer: [2],
        explanation:
          'Tres ausencias "will block your account from making reservations for two weeks": no podrá reservar durante un tiempo. No pierde el acceso al gimnasio, solo la opción de reservar clases.',
      },
    ],
  },
  {
    id: 'f02-ls-an-honors-application',
    form: 2,
    section: 'listening',
    task: 'announcement',
    title: 'New Honors Application Requirements',
    topic: 'campus-life',
    difficulty: 'hard',
    context: 'Listen to the director of the honors program making an announcement.',
    script: [
      {
        speaker: 'Professor',
        voice: 'female',
        text: "Good afternoon. I'd like to announce two changes to this year's honors program application. First, in addition to the personal statement, applicants must now submit a writing portfolio. The portfolio should include two or three pieces of academic writing from your college courses, with a total length of ten to fifteen pages. Creative writing will not be accepted, and at least one piece must involve research with cited sources. Second, students will no longer upload recommendation letters themselves. Instead, you'll enter your recommenders' email addresses in the application system, and each recommender will receive a short online form with specific questions about your work. We still require two recommendations, and at least one must come from a professor in your major. The deadline is still February first, so please contact your recommenders early.",
      },
    ],
    questions: [
      {
        id: 'f02-ls-an-honors-application-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'What is the announcement mainly about?',
        options: [
          'A new deadline for honors applications',
          'How to write a strong personal statement',
          "Changes to the honors program's application",
          'Research opportunities for honors students',
        ],
        answer: [2],
        explanation:
          'La directora anuncia "two changes to this year\'s honors program application": el portafolio y el nuevo formato de las cartas. La fecha límite no cambia ("is still February first").',
      },
      {
        id: 'f02-ls-an-honors-application-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'What is a requirement for the writing portfolio?',
        options: [
          'At least one piece must use cited research.',
          'It must include a piece of creative writing.',
          'It must be at least twenty pages long.',
          'It should be written for an honors course.',
        ],
        answer: [0],
        explanation:
          'Se exige que "at least one piece must involve research with cited sources". La escritura creativa "will not be accepted" y la extensión es de diez a quince páginas.',
      },
      {
        id: 'f02-ls-an-honors-application-q3',
        kind: 'single',
        skill: 'inference',
        prompt: "What does the speaker imply about students' role in the recommendations?",
        options: [
          'They must collect and upload both letters.',
          'They will not handle the letters directly.',
          'They may choose any two people they like.',
          'They must complete the online form themselves.',
        ],
        answer: [1],
        explanation:
          'Los estudiantes "will no longer upload recommendation letters themselves"; solo dan los correos y cada recomendador recibe el formulario. No pueden elegir a cualquiera: uno debe ser "a professor in your major".',
      },
    ],
  },

  // ---------- Academic Talks ----------
  {
    id: 'f02-ls-at-phoenician-alphabet',
    form: 2,
    section: 'listening',
    task: 'academic-talk',
    title: 'From Pictures to Letters',
    topic: 'linguistics',
    difficulty: 'easy',
    context: 'Listen to part of a lecture in a linguistics class.',
    script: [
      { speaker: 'Professor', voice: 'female', text: "Today, let's look at where the letters you're reading right now came from. The earliest writing systems, like Egyptian hieroglyphs and Mesopotamian cuneiform, used hundreds of different signs. Many signs stood for whole words or syllables, so learning to write took years, and writing was mostly done by specially trained scribes." },
      { speaker: 'Professor', voice: 'female', text: "About three thousand years ago, the Phoenicians, a trading people living along the eastern coast of the Mediterranean, in what is now Lebanon, used a much simpler system: an alphabet of just twenty-two letters. Each letter stood for a single consonant sound. Interestingly, the names of the letters came from pictures. The first letter, aleph, meant 'ox,' and its shape originally looked like an ox's head. The second, beth, meant 'house.' But by this time, the pictures no longer mattered. Each letter simply represented a sound." },
      { speaker: 'Professor', voice: 'female', text: "Because the Phoenicians traded all over the Mediterranean, their alphabet traveled with them. Around the eighth century BCE, the Greeks adopted it, but they made one important change. Greek depends heavily on vowels, and a script with only consonants would have been hard to read. So the Greeks took some Phoenician letters for consonant sounds that Greek didn't have and used them for vowels instead. Aleph, for instance, became alpha, the vowel A." },
      { speaker: 'Professor', voice: 'female', text: "From Greek, the alphabet passed to the Etruscans in Italy, and from them to the Romans, whose Latin alphabet is the one English and Spanish use today. In fact, the word 'alphabet' itself comes from the first two Greek letters, alpha and beta. So every time you write a capital A, you're drawing a very distant descendant of an ox's head." },
    ],
    questions: [
      {
        id: 'f02-ls-at-phoenician-alphabet-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'What is the lecture mainly about?',
        options: [
          'Why hieroglyphs took scribes so many years to learn',
          'How the Phoenician alphabet led to later alphabets',
          'How Phoenician traders organized their sea routes',
          'Why the Romans replaced Greek letters with Latin ones',
        ],
        answer: [1],
        explanation:
          'La clase sigue el recorrido del alfabeto fenicio: de los fenicios a los griegos y luego a los etruscos y romanos ("whose Latin alphabet is the one English and Spanish use today"). Los jeroglíficos solo sirven de introducción.',
      },
      {
        id: 'f02-ls-at-phoenician-alphabet-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'What change did the Greeks make to the Phoenician alphabet?',
        options: [
          'They reduced the number of letters to twenty-two.',
          'They gave each letter the name of an animal.',
          'They began writing whole words with single signs.',
          'They used some letters to represent vowel sounds.',
        ],
        answer: [3],
        explanation:
          'La profesora explica que los griegos "took some Phoenician letters for consonant sounds that Greek didn\'t have and used them for vowels instead". Las veintidós letras ya eran del alfabeto fenicio.',
      },
      {
        id: 'f02-ls-at-phoenician-alphabet-q3',
        kind: 'single',
        skill: 'function',
        prompt: "Why does the professor mention an ox's head?",
        options: [
          'To show that letters began as pictures of things',
          'To explain why the Phoenicians traded animals',
          'To describe a common Egyptian hieroglyph',
          'To give an example of a Greek vowel sign',
        ],
        answer: [0],
        explanation:
          'Lo menciona para ilustrar que "the names of the letters came from pictures": aleph significaba "ox" y su forma recordaba una cabeza de buey. No habla del comercio de animales.',
      },
      {
        id: 'f02-ls-at-phoenician-alphabet-q4',
        kind: 'single',
        skill: 'inference',
        prompt: 'What can be inferred about writing systems such as cuneiform?',
        options: [
          'They were used mainly by Phoenician traders.',
          'They had fewer signs than the Phoenician alphabet.',
          'Few ordinary people were able to write them.',
          'They were the direct ancestors of Latin letters.',
        ],
        answer: [2],
        explanation:
          'Tenían "hundreds of different signs", aprender llevaba años y la escritura la hacían "specially trained scribes"; se deduce que poca gente común sabía escribir. Tenían más signos, no menos, que el alfabeto fenicio.',
      },
    ],
  },
  {
    id: 'f02-ls-at-wright-wind-tunnel',
    form: 2,
    section: 'listening',
    task: 'academic-talk',
    title: "The Wright Brothers' Wind Tunnel",
    topic: 'engineering',
    difficulty: 'medium',
    context: 'Listen to part of a lecture in an engineering class.',
    script: [
      { speaker: 'Professor', voice: 'male', text: "Last time we talked about the basic forces acting on a wing. Today I want to show you how two bicycle makers from Ohio, Wilbur and Orville Wright, used careful testing to solve a problem that nearly stopped them. In 1900 and 1901, the brothers flew gliders at Kitty Hawk, North Carolina. They had designed the wings using the best published data available, including tables from the German glider pioneer Otto Lilienthal. But their 1901 glider produced only about a third of the lift those calculations predicted." },
      { speaker: 'Professor', voice: 'male', text: "The brothers were deeply discouraged. But instead of giving up, they asked a different question: what if the published data were wrong? To find out, they built a wind tunnel in their bicycle shop. It was a wooden box about six feet long, with a fan at one end that blew a steady stream of air over small model wings." },
      { speaker: 'Student', voice: 'female', text: 'How did they measure the lift on such small wings?' },
      { speaker: 'Professor', voice: 'male', text: "Good question. They built measuring devices called balances out of bicycle spokes and old hacksaw blades. A model wing was mounted on the balance, and when the air flowed, the balance turned by an angle that showed how much lift the wing produced. It was simple, but remarkably precise. Over about two months in late 1901, they tested roughly two hundred wing shapes, changing one feature at a time: the curve of the wing, the shape of the tips, the ratio of length to width." },
      { speaker: 'Professor', voice: 'male', text: "The results were striking. They found that a number used in the standard lift equation for over a century, called Smeaton's coefficient, was too high, which explained much of their missing lift. They also learned that long, narrow wings were more efficient than short, wide ones. With this new data, they built the 1902 glider, which flew beautifully, and in December 1903 they made the first powered, controlled airplane flight. The lesson for engineers? When your results don't match the theory, test the assumptions behind it." },
    ],
    questions: [
      {
        id: 'f02-ls-at-wright-wind-tunnel-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'What is the lecture mainly about?',
        options: [
          'The career of the glider pioneer Otto Lilienthal',
          'Why the 1903 flight took place at Kitty Hawk',
          'How wind tunnel tests helped correct lift data',
          'How bicycle design shaped early aircraft engines',
        ],
        answer: [2],
        explanation:
          'La clase explica cómo los Wright, con su túnel de viento, descubrieron que los datos publicados eran erróneos ("what if the published data were wrong?") y los corrigieron. Lilienthal solo aparece como fuente de esos datos.',
      },
      {
        id: 'f02-ls-at-wright-wind-tunnel-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'What problem did the Wrights have with their 1901 glider?',
        options: [
          'It gave much less lift than they had calculated.',
          'Its wings were too heavy to carry an engine.',
          'It could not be controlled in strong winds.',
          'It was badly damaged during its tests at Kitty Hawk.',
        ],
        answer: [0],
        explanation:
          'El profesor dice que el planeador de 1901 "produced only about a third of the lift those calculations predicted". No se mencionan daños ni problemas de control.',
      },
      {
        id: 'f02-ls-at-wright-wind-tunnel-q3',
        kind: 'single',
        skill: 'function',
        prompt: 'Why does the professor mention bicycle spokes and hacksaw blades?',
        options: [
          "To explain why the brothers' model wings were so light",
          "To suggest that the brothers' shop lacked money",
          'To compare early bicycles with early airplanes',
          'To show that precise tools came from simple parts',
        ],
        answer: [3],
        explanation:
          'Las balanzas se hicieron con esas piezas y el profesor añade: "It was simple, but remarkably precise". El objetivo es destacar instrumentos precisos hechos con materiales sencillos.',
      },
      {
        id: 'f02-ls-at-wright-wind-tunnel-q4',
        kind: 'single',
        skill: 'inference',
        prompt: "What can be inferred about Smeaton's coefficient before the Wrights' tests?",
        options: [
          'It had been measured in an earlier wind tunnel.',
          'It had been widely accepted without being questioned.',
          'It applied correctly to long, narrow wings only.',
          'It had been invented by Lilienthal in the 1890s.',
        ],
        answer: [1],
        explanation:
          'Se había usado "in the standard lift equation for over a century" y aun así era "too high"; se deduce que muchos lo aceptaban sin comprobarlo. La clase no dice que lo inventara Lilienthal.',
      },
    ],
  },
  {
    id: 'f02-ls-at-public-key',
    form: 2,
    section: 'listening',
    task: 'academic-talk',
    title: 'How Public and Private Keys Work',
    topic: 'technology',
    difficulty: 'hard',
    context: 'Listen to part of a lecture in a computer science class.',
    script: [
      { speaker: 'Professor', voice: 'female', text: "Let's start with an old problem. For most of history, encryption was symmetric: the same secret key was used to lock a message and to unlock it. That works fine if you and I can meet in person and agree on a key. But what if we've never met? If I send you the key over the internet, anyone who intercepts it can read everything that follows. Cryptographers call this the key distribution problem." },
      { speaker: 'Professor', voice: 'female', text: 'In the mid-1970s, researchers proposed a radically different solution: public-key cryptography. Instead of one shared key, each person has two keys that are mathematically linked. The public key can be given to anyone; you could even post it on a website. The private key is never shared. A message locked with someone\'s public key can be unlocked only with the matching private key.' },
      { speaker: 'Professor', voice: 'female', text: "Here's an analogy I find useful. Imagine I hand out hundreds of open padlocks, and only my key can open them. Anyone can put a message in a box and snap one of my padlocks shut. Once it's locked, not even the sender can open it again. Only I can, because I'm the one holding the key." },
      { speaker: 'Professor', voice: 'female', text: "Now, why can't someone simply work out the private key from the public one? Because the keys are based on mathematical operations that are easy in one direction but extremely hard to reverse. In the widely used RSA system, for example, it's easy for a computer to multiply two very large prime numbers. But if you're given only the product, finding the original two primes would take today's computers an impractically long time." },
      { speaker: 'Professor', voice: 'female', text: "The key pair can also work the other way around. If I sign a message with my private key, anyone can check the signature with my public key, which proves the message really came from me. That's called a digital signature. In practice, though, public-key methods are fairly slow, so your browser uses them mainly at the start of a connection, to agree on a temporary shared key. After that, faster symmetric encryption takes over." },
    ],
    questions: [
      {
        id: 'f02-ls-at-public-key-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'What is the lecture mainly about?',
        options: [
          'Why symmetric encryption has been completely abandoned',
          'How web browsers display security warnings',
          'How prime numbers were first discovered',
          'How paired keys let strangers share secrets',
        ],
        answer: [3],
        explanation:
          'La clase explica cómo un par de claves, "mathematically linked", resuelve el problema de comunicarse con alguien a quien nunca has visto. El cifrado simétrico no se abandona: "faster symmetric encryption takes over".',
      },
      {
        id: 'f02-ls-at-public-key-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'What is the key distribution problem?',
        options: [
          'Private keys are too long for people to remember.',
          'A shared key sent online could be intercepted.',
          'Public keys can be copied by anyone on the web.',
          'Computers cannot multiply large prime numbers.',
        ],
        answer: [1],
        explanation:
          'La profesora lo define así: "If I send you the key over the internet, anyone who intercepts it can read everything that follows." Que cualquiera pueda copiar la clave pública no es un problema; es parte del diseño.',
      },
      {
        id: 'f02-ls-at-public-key-q3',
        kind: 'single',
        skill: 'function',
        prompt: 'Why does the professor talk about padlocks?',
        options: [
          'To describe an early method of protecting letters',
          'To explain why physical security still matters',
          'To illustrate a key that can lock but not unlock',
          'To show that senders can reopen their messages',
        ],
        answer: [2],
        explanation:
          'Los candados abiertos representan la clave pública: cualquiera puede cerrarlos, pero "not even the sender can open it again"; solo el dueño de la llave (la clave privada) puede abrir. La última opción dice lo contrario.',
      },
      {
        id: 'f02-ls-at-public-key-q4',
        kind: 'single',
        skill: 'inference',
        prompt: 'What can be inferred about a typical secure connection in a web browser?',
        options: [
          'It uses both public-key and symmetric encryption.',
          'It relies only on digital signatures for privacy.',
          'It sends the private key to the browser first.',
          'It avoids public-key methods because they are slow.',
        ],
        answer: [0],
        explanation:
          'El navegador usa los métodos de clave pública "at the start of a connection, to agree on a temporary shared key", y luego "symmetric encryption takes over": combina ambos. No los evita, solo los limita al inicio.',
      },
    ],
  },
];
