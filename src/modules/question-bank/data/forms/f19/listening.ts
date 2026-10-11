import type { Difficulty, ListeningSet, Topic, Voice } from '../../../types';

/** Simulación n.º 19 — Listening (contenido original). */

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
    form: 19,
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
  cr('f19-ls-cr-gym-holidays', 'easy', 'female', 'Is the campus gym open on public holidays?', [
    'I usually go to the gym after class.',
    'Yes, but only from ten to four.',
    'The holiday was really relaxing.',
    "No, I've never been to that campus.",
  ], 1, 'Es una pregunta de sí o no sobre el horario; "Yes, but only from ten to four" responde y añade un dato útil. Las demás repiten palabras ("gym", "holiday", "campus") sin contestar.'),
  cr('f19-ls-cr-hiking-sunday', 'easy', 'male', 'Do you want to go hiking at the state park on Sunday?', [
    'The park was crowded last weekend.',
    'I went hiking with my cousins last month.',
    'It opens at eight on weekdays.',
    "Sure! What time should we leave?",
  ], 3, 'Es una invitación: lo natural es aceptarla ("Sure!") y pedir un detalle práctico. "I went hiking with my cousins" usa el pasado y no responde a la invitación para el domingo.', 'daily-life'),
  cr('f19-ls-cr-flash-cards', 'easy', 'female', "Why don't we make flash cards to learn the vocabulary list?", [
    "Good idea. I'll bring some index cards.",
    'Because the list is on page forty.',
    'The cards were sent to me by mail last week.',
    'Yes, I made a list for the store.',
  ], 0, '"Why don\'t we…?" es una sugerencia, no una pregunta sobre la causa. Por eso "Because the list is on page forty" es una trampa; lo adecuado es aceptar la idea: "Good idea".'),
  cr('f19-ls-cr-spilled-coffee', 'easy', 'male', "Oh no, I'm so sorry! I bumped into you and spilled your coffee.", [
    "Yes, I'd like a coffee, please.",
    'I spilled it on the bus yesterday.',
    "Don't worry. It was almost empty.",
    "I'm sorry, but I don't drink coffee at all.",
  ], 2, 'Ante una disculpa, la respuesta natural le quita importancia: "Don\'t worry. It was almost empty". Las otras opciones repiten "coffee" o "spilled" sin responder a la disculpa.', 'daily-life'),
  cr('f19-ls-cr-laptop-or-paper', 'easy', 'female', 'Do you think a laptop or paper is better for taking notes?', [
    'I took notes on the reading for this week.',
    'My laptop is about two years old.',
    'Yes, I think so too.',
    'Paper, for me. I remember more that way.',
  ], 3, 'Es una pregunta alternativa (¿A o B?), así que se elige una opción y se justifica: "Paper, for me". Responder "Yes, I think so too" no tiene sentido ante una elección entre dos cosas.'),
  cr('f19-ls-cr-flat-tire', 'easy', 'female', 'My bike got a flat tire on the way to campus this morning.', [
    'I usually take the bus to campus in winter.',
    'Oh no! Did you have to walk the rest?',
    'The new tires are on sale this week.',
    'I rode my bike all last weekend.',
  ], 1, 'La amiga cuenta un contratiempo; lo adecuado es mostrar empatía ("Oh no!") y preguntar por la situación. Las demás opciones hablan del propio hablante o de "tires" sin reaccionar al problema.', 'daily-life'),

  // ---------- Choose a Response: medium ----------
  cr('f19-ls-cr-older-edition', 'medium', 'male', 'Maybe we should ask the librarian if the older edition is on reserve.', [
    "Good idea. Let's check at the front desk.",
    'I reserved a table for dinner at seven.',
    'The newer edition has a different blue cover.',
    'She retired from the library last year.',
  ], 0, 'Es una sugerencia ("Maybe we should…"); se acepta y se propone actuar: "Let\'s check at the front desk". "I reserved a table" juega con el parecido entre "reserve" y "reserved".'),
  cr('f19-ls-cr-annotated-bibliography', 'medium', 'female', "What did the professor mean by an 'annotated bibliography'?", [
    "She said it's due at the end of the month.",
    'I bought the book at the campus store.',
    "It's a source list with short summaries.",
    'Yes, she meant every word of it.',
  ], 2, 'Se pide una aclaración del significado, y la respuesta lo define: "a source list with short summaries". "She said it\'s due at the end of the month" responde a cuándo se entrega, no a qué es.'),
  cr('f19-ls-cr-group-projects', 'medium', 'male', 'Honestly, I think group projects are a waste of time.', [
    'The final project is due next Thursday at noon.',
    'Really? I learn a lot from my teammates.',
    'I wasted a lot of paper on it.',
    'Yes, it takes about an hour.',
  ], 1, 'Ante una opinión, se reacciona con otra opinión: "Really? I learn a lot from my teammates" muestra desacuerdo de forma natural. "I wasted a lot of paper" solo repite la idea de "waste".'),
  cr('f19-ls-cr-bus-pass', 'medium', 'female', "Do you think it's worth getting a monthly bus pass to get to campus?", [
    'The bus was late again this morning.',
    'I passed the driving test last month.',
    'It takes about twenty minutes by bus from my place.',
    "If you ride every day, it'll save you money.",
  ], 3, 'Se pide un consejo ("is it worth…?"), y la respuesta lo da con una condición: "If you ride every day, it\'ll save you money". "I passed the driving test" es una trampa sonora con "pass".', 'daily-life'),
  cr('f19-ls-cr-study-room-booked', 'medium', 'male', 'Just a reminder: another group has booked this study room at three.', [
    'We booked a flight for the holidays.',
    "I'll remind them about the meeting.",
    "Thanks. We'll be out before then.",
    "It's three floors up from here.",
  ], 2, 'El bibliotecario hace un recordatorio; lo adecuado es agradecerlo y confirmar que se cumplirá: "We\'ll be out before then". Las demás opciones repiten "booked", "reminder" o "three" sin sentido.'),
  cr('f19-ls-cr-professor-lin', 'medium', 'female', "You've met Professor Lin before, haven't you?", [
    'Yes, she was my advisor last year.',
    "She'll meet you at the front office.",
    'Yes, I have to meet the deadline by Friday.',
    'The meeting lasted almost an hour.',
  ], 0, 'La "tag question" ("haven\'t you?") pide confirmar algo; se confirma y se añade un detalle: "Yes, she was my advisor last year". "Yes, I have to meet the deadline" usa "meet" con otro significado.'),

  // ---------- Choose a Response: hard ----------
  cr('f19-ls-cr-hold-my-breath', 'hard', 'male', "You think we'll get our essays back this week? I wouldn't hold my breath.", [
    "Don't worry, I can swim pretty well.",
    'Yes, I think she will return them too.',
    'I held it for almost a minute in the pool.',
    'Oh, is she usually that slow with grading?',
  ], 3, '"I wouldn\'t hold my breath" significa que es poco probable que ocurra pronto. La respuesta natural pregunta por la causa: "is she usually that slow with grading?". Las opciones sobre nadar o aguantar la respiración interpretan la expresión literalmente.'),
  cr('f19-ls-cr-alumni-dinner', 'hard', 'female', "Any chance you know who's organizing the alumni dinner?", [
    'Yes, there is a good chance of rain.',
    'I believe someone in the alumni office is.',
    'The dinner starts at seven thirty on Friday.',
    "No, I'm not organizing my notes yet.",
  ], 1, '"Any chance you know…?" es una forma indirecta y cortés de preguntar quién organiza la cena. Solo "I believe someone in the alumni office is" da esa información; "a good chance of rain" toma "chance" en otro sentido.'),
  cr('f19-ls-cr-article-argued', 'hard', 'male', "With all due respect, that's not quite what the article argued.", [
    'Thanks, I respect the author too.',
    'Yes, the article was quite long and detailed.',
    'Oh? How would you sum up its main point?',
    'I argued with my roommate last night.',
  ], 2, '"With all due respect, that\'s not quite…" es un desacuerdo cortés. Lo adecuado es abrirse a la otra interpretación: "How would you sum up its main point?". "I respect the author" malinterpreta "respect".'),
  cr('f19-ls-cr-told-me-about-it', 'hard', 'female', "I'd have come if someone had told me about it.", [
    'Sorry, I thought you were in the group chat.',
    "Great, I'm so glad you could make it after all.",
    'Someone told me about it yesterday.',
    'Yes, it starts at six tomorrow.',
  ], 0, 'El condicional en pasado ("I\'d have come if…") indica que no fue porque nadie le avisó: es una queja implícita. Lo natural es disculparse y explicar: "Sorry, I thought you were in the group chat". "I\'m glad you could make it" supone que sí vino.'),
  cr('f19-ls-cr-door-always-open', 'hard', 'male', "My door's always open if you get stuck on the problem set.", [
    "Thanks, but I'll close it on my way out.",
    'Thanks, I may stop by during office hours.',
    'I got stuck in traffic on the way here today.',
    'The door was locked when I tried it.',
  ], 1, '"My door\'s always open" es una oferta de ayuda (puedes venir cuando quieras). Se agradece y se acepta: "I may stop by during office hours". Las opciones sobre cerrar la puerta o que estaba cerrada la toman al pie de la letra.'),
  cr('f19-ls-cr-cafe-new-management', 'hard', 'female', 'I heard the café on Main Street is under new management.', [
    'The manager is on the second floor.',
    'I heard it on the radio this morning.',
    "Yes, I'm managing my time better now.",
    "Really? Let's try it this weekend.",
  ], 3, 'El comentario sugiere de forma implícita probar el café, y la respuesta natural recoge la idea y propone ir: "Let\'s try it this weekend". "I\'m managing my time" solo juega con "management".', 'daily-life'),

  // ---------- Conversations ----------
  {
    id: 'f19-ls-cv-enrollment-letter',
    form: 19,
    section: 'listening',
    task: 'conversation',
    title: 'Enrollment Letter for a Bank Account',
    topic: 'campus-life',
    difficulty: 'easy',
    context: 'Listen to a conversation between a student and a staff member at the international student office.',
    script: [
      { speaker: 'Student', voice: 'female', text: "Hi, I just arrived from Brazil, and I'm trying to open a bank account. The bank says I need a letter proving I'm enrolled here. Is that something your office provides?" },
      { speaker: 'Staff Member', voice: 'male', text: "Yes, we do. It's called an enrollment verification letter. You'll need to fill out a short request form, either here or online through the student portal." },
      { speaker: 'Student', voice: 'female', text: "I'd rather do it here. Does the bank need anything special on the letter?" },
      { speaker: 'Staff Member', voice: 'male', text: 'Good question. Most banks want your local address on it, so make sure the address you write on the form matches the one on your housing contract.' },
      { speaker: 'Student', voice: 'female', text: "Okay. I'm still in temporary housing, though. I move into my residence hall next week." },
      { speaker: 'Staff Member', voice: 'male', text: 'Then use the temporary address for now. The bank only needs proof of where you live at the moment, and you can update your address with them later.' },
      { speaker: 'Student', voice: 'female', text: 'Great. How long does it take to get the letter?' },
      { speaker: 'Staff Member', voice: 'male', text: "Normally two business days. But this is the first week of the semester and we're getting a lot of requests, so it may take up to four. We'll email you when it's ready to pick up." },
      { speaker: 'Student', voice: 'female', text: 'Four days? I was hoping to deposit my scholarship money this week.' },
      { speaker: 'Staff Member', voice: 'male', text: "In that case, check the box marked 'urgent' and attach your bank appointment confirmation. We try to process urgent requests within one day." },
      { speaker: 'Student', voice: 'female', text: 'Perfect, I have the confirmation on my phone. Thanks so much!' },
    ],
    questions: [
      {
        id: 'f19-ls-cv-enrollment-letter-q1',
        kind: 'single',
        skill: 'purpose',
        prompt: 'Why does the student go to the international student office?',
        options: [
          'To change the address on her housing contract',
          'To ask how to deposit her scholarship money',
          'To get a document that her bank has asked for',
          'To register for her first week of classes',
        ],
        answer: [2],
        explanation:
          'La estudiante dice: "The bank says I need a letter proving I\'m enrolled here". Menciona la beca ("scholarship money") solo para explicar su prisa, no como motivo de la visita.',
      },
      {
        id: 'f19-ls-cv-enrollment-letter-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'According to the staff member, how long does a request normally take?',
        options: ['Two business days', 'One full week', 'Four business days', 'About one day'],
        answer: [0],
        explanation:
          'El empleado responde "Normally two business days". "Up to four" se aplica solo a esta semana por la cantidad de solicitudes, y "within one day" corresponde a las solicitudes urgentes.',
      },
      {
        id: 'f19-ls-cv-enrollment-letter-q3',
        kind: 'single',
        skill: 'inference',
        prompt: 'What will the student probably do next?',
        options: [
          'Move into her residence hall right away',
          'Fill out the request form online at home',
          'Call the bank to cancel her appointment',
          'Ask for urgent processing of her letter',
        ],
        answer: [3],
        explanation:
          'El empleado le aconseja marcar "urgent" y adjuntar la confirmación de la cita, y ella responde "Perfect, I have the confirmation on my phone". Antes dijo "I\'d rather do it here", así que no lo hará en línea.',
      },
    ],
  },
  {
    id: 'f19-ls-cv-work-study-lab',
    form: 19,
    section: 'listening',
    task: 'conversation',
    title: 'Work-Study Shifts and a New Lab',
    topic: 'campus-life',
    difficulty: 'medium',
    context: 'Listen to a conversation between a student and a financial aid officer.',
    script: [
      { speaker: 'Student', voice: 'male', text: 'Hi, I have a work-study job at the campus recycling center, but I have a problem. The chemistry department just added a lab section to my course, and it meets Tuesday and Thursday afternoons, exactly when my shifts are.' },
      { speaker: 'Officer', voice: 'female', text: 'I see. Is the lab required, or could you choose a different section?' },
      { speaker: 'Student', voice: 'male', text: "It's required, and there's only one section now. The professor said the morning section was canceled because there weren't enough teaching assistants." },
      { speaker: 'Officer', voice: 'female', text: 'All right. Well, you have a couple of options. The first is to ask your supervisor at the recycling center about moving your shifts. Work-study supervisors are usually pretty flexible, especially at the start of the semester.' },
      { speaker: 'Student', voice: 'male', text: "I could ask. I know the center is open on weekends, but I'm not sure they need anyone then." },
      { speaker: 'Officer', voice: 'female', text: "That's worth finding out. If it doesn't work, the second option is to look for a different position. The campus job board lists all the work-study openings, and you can filter them by the hours you're available." },
      { speaker: 'Student', voice: 'male', text: 'Would I lose my work-study award if I switched jobs?' },
      { speaker: 'Officer', voice: 'female', text: "No. The award is attached to you, not to the job. Just keep in mind that you can't earn more than the total amount of your award this year, no matter which job you have." },
      { speaker: 'Student', voice: 'male', text: "Okay, that's a relief. I'll talk to my supervisor this afternoon, then." },
      { speaker: 'Officer', voice: 'female', text: 'Good plan. And if you do change jobs, let us know so we can update your payroll information.' },
    ],
    questions: [
      {
        id: 'f19-ls-cv-work-study-lab-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: "What is the student's main problem?",
        options: [
          'His work shifts clash with a required lab.',
          'His work-study award was reduced this year.',
          'His supervisor wants him to work on weekends.',
          'His only chemistry lab section was canceled.',
        ],
        answer: [0],
        explanation:
          'El estudiante explica que el nuevo laboratorio "meets Tuesday and Thursday afternoons, exactly when my shifts are". Lo que se canceló fue la sección de la mañana, no su única sección.',
      },
      {
        id: 'f19-ls-cv-work-study-lab-q2',
        kind: 'single',
        skill: 'detail',
        prompt: "What does the officer say about the student's work-study award?",
        options: [
          'It can only be used at the recycling center.',
          'It will increase if he works on weekends.',
          'It must be renewed whenever he changes jobs.',
          'It stays with him even if he changes jobs.',
        ],
        answer: [3],
        explanation:
          'La funcionaria afirma: "The award is attached to you, not to the job". Además, no puede ganar más del total de la ayuda, así que no aumentará por trabajar los fines de semana.',
      },
      {
        id: 'f19-ls-cv-work-study-lab-q3',
        kind: 'single',
        skill: 'inference',
        prompt: 'What does the officer imply about work-study supervisors?',
        options: [
          'They rarely let students change their shifts.',
          'They decide how much each student can earn.',
          'They often adjust schedules early in the term.',
          'They post their own openings on the job board.',
        ],
        answer: [2],
        explanation:
          'Dice que "Work-study supervisors are usually pretty flexible, especially at the start of the semester", lo que implica que suelen ajustar horarios al principio del curso. La primera opción dice lo contrario.',
      },
    ],
  },
  {
    id: 'f19-ls-cv-graded-layers',
    form: 19,
    section: 'listening',
    task: 'conversation',
    title: 'Graded Layers in a Rock Sample',
    topic: 'geology',
    difficulty: 'hard',
    context: 'Listen to a conversation between a student and a geology professor.',
    script: [
      { speaker: 'Professor', voice: 'male', text: "So, Emma, you wanted to talk about the sample you collected on Saturday's field trip?" },
      { speaker: 'Student', voice: 'female', text: "Yes. It's this piece of sandstone from the riverbank outcrop. I'm writing my field report, and I can't decide how these layers formed. My first thought was one big flood." },
      { speaker: 'Professor', voice: 'male', text: 'Let\'s look closely. What do you notice about the grain size within a single layer?' },
      { speaker: 'Student', voice: 'female', text: "Well, the bottom of each layer is coarse, almost like gravel, and it gets finer toward the top, until it's basically silt." },
      { speaker: 'Professor', voice: 'male', text: "Right. That's what we call graded bedding. When a fast, muddy current slows down, the heaviest grains settle first and the finest ones settle last. So each graded layer tells you that the water lost its energy fairly quickly." },
      { speaker: 'Student', voice: 'female', text: "So that supports my flood idea, doesn't it?" },
      { speaker: 'Professor', voice: 'male', text: 'For one layer, yes. But count them. How many graded layers do you see?' },
      { speaker: 'Student', voice: 'female', text: 'Um, at least seven. Oh. So it can\'t be just one flood.' },
      { speaker: 'Professor', voice: 'male', text: 'Exactly. Each layer has its own coarse base, and the bases are sharp, as if the next current cut into the layer below. That points to a series of separate events, not one flood, and not slow, steady settling either. Slow deposition usually leaves thin, even layers of fine grains, often with burrows made by animals living on the bottom.' },
      { speaker: 'Student', voice: 'female', text: "I didn't see any burrows, but I only looked with my eyes." },
      { speaker: 'Professor', voice: 'male', text: 'Then check it under a hand lens in the lab. If there are no burrows, the layers were probably buried quickly, one after another. If you find burrows in the silty tops, there was quiet time between the floods.' },
      { speaker: 'Student', voice: 'female', text: "That makes sense. I'll look this afternoon and add it to my report." },
    ],
    questions: [
      {
        id: 'f19-ls-cv-graded-layers-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'What are the speakers mainly discussing?',
        options: [
          'Where the student should collect more samples',
          'How to measure grain size with a hand lens',
          'Why the riverbank was chosen for the field trip',
          "How the layers in the student's sample formed",
        ],
        answer: [3],
        explanation:
          'La estudiante dice "I can\'t decide how these layers formed", y toda la conversación analiza si se deben a una inundación o a un depósito lento. La lupa ("hand lens") solo se menciona al final para buscar madrigueras.',
      },
      {
        id: 'f19-ls-cv-graded-layers-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'According to the professor, what does a single graded layer indicate?',
        options: [
          'Animals lived on the bottom for a very long time.',
          'A current carrying sediment slowed down quickly.',
          'Fine grains settled before the coarse ones did.',
          'The water level stayed the same for many years.',
        ],
        answer: [1],
        explanation:
          'El profesor explica: "When a fast, muddy current slows down, the heaviest grains settle first… the water lost its energy fairly quickly". La tercera opción invierte el orden: los granos gruesos se depositan primero.',
      },
      {
        id: 'f19-ls-cv-graded-layers-q3',
        kind: 'single',
        skill: 'function',
        prompt: 'Why does the professor ask the student to count the layers?',
        options: [
          'To help her see that one flood cannot explain them',
          'To check whether her field report is long enough',
          'To show that she collected the sample incorrectly',
          'To prove that the layers formed by slow settling',
        ],
        answer: [0],
        explanation:
          'Al contarlas, la estudiante concluye: "So it can\'t be just one flood". El profesor descarta también el depósito lento ("not slow, steady settling either"), así que la última opción es incorrecta.',
      },
    ],
  },

  // ---------- Announcements ----------
  {
    id: 'f19-ls-an-bookstore-buyback',
    form: 19,
    section: 'listening',
    task: 'announcement',
    title: 'Bookstore Hours and Buyback Dates',
    topic: 'campus-life',
    difficulty: 'easy',
    context: 'Listen to an announcement on a university campus.',
    script: [
      {
        speaker: 'Announcer',
        voice: 'female',
        text: "Good morning, and welcome back to campus! The University Bookstore will have extended hours during the first week of classes. From Monday through Friday, we'll be open from seven thirty in the morning until nine at night, so you can pick up your textbooks before or after class. On Saturday, regular hours return: ten a.m. to four p.m. Please bring a copy of your class schedule, because it makes finding the right books much faster. Also, mark your calendars for our end-of-term textbook buyback. It will take place from December eleventh to December fifteenth at the bookstore's side entrance. Books must be in good condition, and you'll need your student ID to receive cash. Thanks, and have a great semester!",
      },
    ],
    questions: [
      {
        id: 'f19-ls-an-bookstore-buyback-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'What is the main purpose of the announcement?',
        options: [
          'To advertise a sale on used textbooks',
          'To give bookstore hours and buyback dates',
          'To explain how to order your textbooks online',
          'To introduce the new bookstore manager',
        ],
        answer: [1],
        explanation:
          'El anuncio informa del horario ampliado ("extended hours during the first week of classes") y de las fechas de recompra ("end-of-term textbook buyback"). No menciona rebajas ni pedidos en línea.',
      },
      {
        id: 'f19-ls-an-bookstore-buyback-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'Why should students bring their class schedules?',
        options: [
          'To get a discount on new textbooks',
          'To enter the bookstore after nine p.m.',
          'To help them find their books quickly',
          'To sell their old books back for cash',
        ],
        answer: [2],
        explanation:
          'El anunciante dice: "bring a copy of your class schedule, because it makes finding the right books much faster". Para vender libros hace falta el carné de estudiante ("student ID"), no el horario.',
      },
      {
        id: 'f19-ls-an-bookstore-buyback-q3',
        kind: 'single',
        skill: 'inference',
        prompt: 'What can be inferred about the textbook buyback?',
        options: [
          'Damaged books may not be accepted.',
          'It happens in the first week of classes.',
          'It is open only on Saturdays from ten to four.',
          'Students will get store credit instead of cash.',
        ],
        answer: [0],
        explanation:
          'Como "Books must be in good condition", se deduce que los libros dañados pueden ser rechazados. La recompra es en diciembre, al final del trimestre, y se paga en efectivo ("receive cash").',
      },
    ],
  },
  {
    id: 'f19-ls-an-snowstorm-closing',
    form: 19,
    section: 'listening',
    task: 'announcement',
    title: 'Early Closing for a Snowstorm',
    topic: 'campus-life',
    difficulty: 'medium',
    context: 'Listen to an announcement from the university administration.',
    script: [
      {
        speaker: 'Announcer',
        voice: 'male',
        text: "Attention, all students, faculty, and staff. Because of the heavy snowstorm expected this afternoon, the university will close at one p.m. today. All classes beginning at one o'clock or later are canceled, and instructors will post any changes to deadlines online. Most offices will close at that time as well.",
      },
      {
        speaker: 'Announcer',
        voice: 'male',
        text: 'However, a few services will remain open. The main library will stay open until six p.m. for students who live on campus, and the student health center will operate normally until eight p.m. The campus shuttle will stop running at two. Students who live off campus are strongly encouraged to leave before the roads become dangerous. Please check your university email tomorrow at six a.m. for an update on whether campus will open on time.',
      },
    ],
    questions: [
      {
        id: 'f19-ls-an-snowstorm-closing-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'What is the announcement mainly about?',
        options: [
          'A change to the final exam schedule',
          'New opening hours for the main library',
          'An early closure caused by bad weather',
          'Repairs to the roads near the campus',
        ],
        answer: [2],
        explanation:
          'El anuncio comunica que "the university will close at one p.m. today" por "the heavy snowstorm" y qué servicios siguen abiertos. El horario de la biblioteca es solo un detalle.',
      },
      {
        id: 'f19-ls-an-snowstorm-closing-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'Which service will stay open the latest today?',
        options: ['The student health center', 'The main library', 'The campus shuttle', 'The administrative offices'],
        answer: [0],
        explanation:
          'El centro de salud funcionará "until eight p.m."; la biblioteca, "until six p.m."; el autobús deja de circular "at two", y la mayoría de las oficinas cierran a la una.',
      },
      {
        id: 'f19-ls-an-snowstorm-closing-q3',
        kind: 'single',
        skill: 'inference',
        prompt: 'What will students who live off campus probably do?',
        options: [
          'Study in the library until six p.m.',
          'Leave campus soon after the announcement',
          'Take the campus shuttle home at three p.m.',
          'Attend their afternoon classes online',
        ],
        answer: [1],
        explanation:
          'Se les recomienda irse pronto: "strongly encouraged to leave before the roads become dangerous". La biblioteca es para quienes viven en el campus, y el autobús deja de funcionar a las dos, no a las tres.',
      },
    ],
  },
  {
    id: 'f19-ls-an-scholarship-renewal',
    form: 19,
    section: 'listening',
    task: 'announcement',
    title: 'New Scholarship Renewal Requirements',
    topic: 'campus-life',
    difficulty: 'hard',
    context: 'Listen to an announcement from the scholarship office.',
    script: [
      {
        speaker: 'Announcer',
        voice: 'female',
        text: 'Good afternoon. This is the Office of Scholarships with changes to renewal requirements, starting next academic year. First, to keep your scholarship, you must complete at least twenty-four credits per year, up from the current twenty. Summer courses will count toward this total. Second, the minimum cumulative GPA will rise from 2.8 to 3.0.',
      },
      {
        speaker: 'Announcer',
        voice: 'female',
        text: 'Students who fall below 3.0 will not lose their award immediately; instead, they will be placed on probation for one semester to raise their average. Finally, if you lose your scholarship because of a medical or family emergency, you may file an appeal. Appeals must be submitted within thirty days of your notice and should include supporting documents, such as a letter from a doctor. Advisors will hold drop-in sessions every Wednesday this month.',
      },
    ],
    questions: [
      {
        id: 'f19-ls-an-scholarship-renewal-q1',
        kind: 'single',
        skill: 'purpose',
        prompt: 'What is the purpose of the announcement?',
        options: [
          'To explain new rules for keeping a scholarship',
          'To invite students to apply for new scholarships',
          'To announce that summer courses will be canceled',
          'To describe how advisors are assigned to students',
        ],
        answer: [0],
        explanation:
          'El anuncio trata de "changes to renewal requirements": créditos mínimos, nota media y apelaciones para conservar la beca. Los cursos de verano no se cancelan; al contrario, "will count toward this total".',
      },
      {
        id: 'f19-ls-an-scholarship-renewal-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'What will happen to a student whose GPA falls to 2.9?',
        options: [
          'The scholarship will be canceled at once.',
          'The student must take extra summer courses.',
          'The student will have a semester to improve.',
          'The student must file an appeal within 30 days.',
        ],
        answer: [2],
        explanation:
          'Quien baje de 3.0 "will not lose their award immediately"; queda "on probation for one semester to raise their average". La apelación es para quien pierde la beca por una emergencia.',
      },
      {
        id: 'f19-ls-an-scholarship-renewal-q3',
        kind: 'single',
        skill: 'inference',
        prompt: 'What is implied about students who lose their scholarship for reasons other than an emergency?',
        options: [
          'They can appeal at any point during the year.',
          'They are automatically given a second probation.',
          'They must attend a drop-in session to appeal.',
          'They probably cannot appeal the decision.',
        ],
        answer: [3],
        explanation:
          'La apelación solo se menciona "if you lose your scholarship because of a medical or family emergency", por lo que se deduce que en otros casos no se puede apelar. Además, el plazo es de "thirty days", no de todo el año.',
      },
    ],
  },

  // ---------- Academic Talks ----------
  {
    id: 'f19-ls-at-urbanization',
    form: 19,
    section: 'listening',
    task: 'academic-talk',
    title: 'Why the World Moved to Cities',
    topic: 'sociology',
    difficulty: 'easy',
    context: 'Listen to part of a lecture in a sociology class.',
    script: [
      { speaker: 'Professor', voice: 'female', text: "Today let's look at one of the biggest changes in human history: urbanization, the movement of people from the countryside into cities. Here's a striking fact. In 1950, only about thirty percent of the world's population lived in urban areas. But around 2007, for the first time ever, more than half of humanity lived in cities, and the United Nations expects that share to reach about two-thirds by 2050." },
      { speaker: 'Professor', voice: 'female', text: 'So why do people move? Sociologists often talk about push factors and pull factors. Push factors drive people away from rural areas, like a shortage of farmland, low incomes, or a lack of schools and hospitals. Pull factors attract people to cities: jobs in factories and offices, better education for their children, and access to health care.' },
      { speaker: 'Professor', voice: 'female', text: 'Moving to a city changes daily life in very concrete ways. Think about a family that used to farm. In the village, they grew much of their own food and worked according to the seasons. In the city, they earn wages, pay rent, and buy almost everything they eat. Their day is organized by the clock, not by the sun.' },
      { speaker: 'Professor', voice: 'female', text: "Family life changes too. Urban families tend to have fewer children, partly because children are expensive to raise in a city and don't help out on the farm. And social networks shift. In a village, you might know almost everyone. In a city, you're surrounded by strangers, but you also meet people from many different backgrounds." },
      { speaker: 'Professor', voice: 'female', text: "Of course, urbanization isn't always smooth. When cities grow faster than housing can be built, many newcomers end up in crowded informal settlements without clean water. Next time, we'll look at how some cities have tried to manage that kind of rapid growth." },
    ],
    questions: [
      {
        id: 'f19-ls-at-urbanization-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'What is the lecture mainly about?',
        options: [
          'Why people move to cities and how their lives change',
          'How the United Nations measures population growth',
          'Why farming methods have improved since 1950',
          'How cities manage to build enough housing for newcomers',
        ],
        answer: [0],
        explanation:
          'La profesora explica por qué la gente se muda ("push factors and pull factors") y cómo cambia su vida ("changes daily life", "Family life changes too"). La ONU solo aparece en una cifra inicial.',
      },
      {
        id: 'f19-ls-at-urbanization-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'According to the professor, which of the following is a pull factor?',
        options: [
          'A shortage of farmland in rural areas',
          'Low incomes in the countryside',
          'Better schooling for children in cities',
          'Crowded settlements without clean water',
        ],
        answer: [2],
        explanation:
          'Los "pull factors" atraen a la gente a las ciudades, como "better education for their children". La escasez de tierras y los bajos ingresos son "push factors", que expulsan a la gente del campo.',
      },
      {
        id: 'f19-ls-at-urbanization-q3',
        kind: 'single',
        skill: 'organization',
        prompt: 'Why does the professor describe a family that used to farm?',
        options: [
          'To show that farming families earn high wages',
          'To explain why villages have better schools',
          'To argue that more people should stay in rural areas',
          'To illustrate how daily routines change in cities',
        ],
        answer: [3],
        explanation:
          'El ejemplo sigue a la frase "Moving to a city changes daily life in very concrete ways" y contrasta las estaciones con el reloj, y cultivar con pagar el alquiler. No defiende quedarse en el campo.',
      },
      {
        id: 'f19-ls-at-urbanization-q4',
        kind: 'single',
        skill: 'inference',
        prompt: 'What does the professor imply about children in rural farming families?',
        options: [
          'They usually move to cities before their parents.',
          'They often help with the work on the family farm.',
          'They cost more to raise than children in cities.',
          'They rarely meet anyone outside their own family.',
        ],
        answer: [1],
        explanation:
          'Al decir que en la ciudad los hijos "don\'t help out on the farm", la profesora da a entender que en el campo sí ayudan. La tercera opción invierte la idea: lo caro es criarlos en la ciudad.',
      },
    ],
  },
  {
    id: 'f19-ls-at-fuel-cells',
    form: 19,
    section: 'listening',
    task: 'academic-talk',
    title: 'How Hydrogen Fuel Cells Work',
    topic: 'technology',
    difficulty: 'medium',
    context: 'Listen to part of a lecture in a technology class.',
    script: [
      { speaker: 'Professor', voice: 'male', text: 'Last week we talked about batteries. Today I want to introduce a related technology: the hydrogen fuel cell. Like a battery, a fuel cell turns chemical energy directly into electricity. The difference is that a battery holds a fixed amount of chemicals and eventually runs down, while a fuel cell keeps producing electricity as long as you keep feeding it fuel, in this case hydrogen, plus oxygen from the air.' },
      { speaker: 'Professor', voice: 'male', text: "So how does it work? A typical fuel cell has two electrodes, the anode and the cathode, with a thin membrane between them. Hydrogen gas flows to the anode, where a catalyst, usually platinum, splits each hydrogen molecule into protons and electrons. Here's the clever part. The membrane lets the protons pass through, but it blocks the electrons. So the electrons have to take the long way around, through an outside wire, and that flow of electrons is the current that powers a motor or a light." },
      { speaker: 'Professor', voice: 'male', text: "At the cathode, everything comes back together. The electrons arrive through the wire, the protons arrive through the membrane, and they combine with oxygen to form water. That's why people say the only exhaust is water, plus some heat. In fact, on the Apollo missions to the Moon, fuel cells supplied electricity to the spacecraft, and the astronauts drank the water they produced." },
      { speaker: 'Student', voice: 'female', text: "If it's that clean, why aren't all cars using fuel cells?" },
      { speaker: 'Professor', voice: 'male', text: "Good question. There are a few problems. First, most hydrogen today is made from natural gas, and that process releases carbon dioxide. Second, hydrogen is a very light gas, so it has to be stored in heavy tanks at extremely high pressure. And platinum is expensive. Researchers are working on all three issues, for example by making hydrogen from water with electricity from solar or wind power." },
    ],
    questions: [
      {
        id: 'f19-ls-at-fuel-cells-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'What is the lecture mainly about?',
        options: [
          'Why batteries run down faster than expected',
          'Why the Apollo spacecraft needed so much electricity',
          'How fuel cells make electricity and their limits',
          'How platinum is mined and used in industry',
        ],
        answer: [2],
        explanation:
          'El profesor explica el funcionamiento de la pila de combustible ("So how does it work?") y después sus problemas ("There are a few problems"). Las baterías y el programa Apolo son solo comparación y ejemplo.',
      },
      {
        id: 'f19-ls-at-fuel-cells-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'According to the professor, what does the membrane in a fuel cell do?',
        options: [
          'It splits hydrogen molecules into smaller parts.',
          'It lets protons through but blocks the electrons.',
          'It stores the hydrogen gas at very high pressure.',
          'It mixes oxygen with natural gas to create heat.',
        ],
        answer: [1],
        explanation:
          '"The membrane lets the protons pass through, but it blocks the electrons." Separar las moléculas de hidrógeno es la función del catalizador ("a catalyst, usually platinum"), no de la membrana.',
      },
      {
        id: 'f19-ls-at-fuel-cells-q3',
        kind: 'single',
        skill: 'organization',
        prompt: 'Why does the professor mention the Apollo missions?',
        options: [
          'To show that the water fuel cells produce is usable',
          'To explain why platinum has become so expensive today',
          'To compare fuel cells with rechargeable batteries',
          'To argue that cars should use the same technology',
        ],
        answer: [0],
        explanation:
          'Tras decir que el único residuo es agua, añade que "the astronauts drank the water they produced": el ejemplo demuestra que esa agua era aprovechable. No habla del precio del platino en ese momento.',
      },
      {
        id: 'f19-ls-at-fuel-cells-q4',
        kind: 'single',
        skill: 'inference',
        prompt: 'What does the professor imply about hydrogen made from natural gas?',
        options: [
          'It produces more electricity than other hydrogen.',
          'It can be stored without high-pressure tanks.',
          'It is cheaper than hydrogen made with solar power.',
          'Using it does not fully avoid carbon emissions.',
        ],
        answer: [3],
        explanation:
          'Aunque el escape sea solo agua, producir hidrógeno a partir de gas natural "releases carbon dioxide", así que no se evitan del todo las emisiones. El profesor no compara los costes con la energía solar.',
      },
    ],
  },
  {
    id: 'f19-ls-at-price-discrimination',
    form: 19,
    section: 'listening',
    task: 'academic-talk',
    title: 'Why Prices Differ for the Same Product',
    topic: 'economics',
    difficulty: 'hard',
    context: 'Listen to part of a lecture in an economics class.',
    script: [
      { speaker: 'Professor', voice: 'female', text: 'Let\'s start with a puzzle. Two passengers sit side by side on the same flight, in identical seats, eating the same snack. Yet one paid two hundred dollars for her ticket, and the other paid over six hundred. Nobody made a mistake. The airline is practicing what economists call price discrimination: charging different customers different prices for the same product, when the difference isn\'t explained by any difference in cost.' },
      { speaker: 'Professor', voice: 'female', text: "Why would a firm do this? Because customers differ in their willingness to pay. With a single price, a firm faces a trade-off. A high price loses the customers who won't pay much, and a low price gives away money to customers who would happily have paid more. If the firm can charge each group something close to what it's willing to pay, it earns more than with any single price." },
      { speaker: 'Professor', voice: 'female', text: 'But this only works under certain conditions. First, the firm needs some market power; in a perfectly competitive market, rivals would simply undercut the high price. Second, the firm must be able to tell customer groups apart. And third, it has to prevent resale. If students could buy cheap tickets and sell them to everyone else, the whole scheme would collapse.' },
      { speaker: 'Professor', voice: 'female', text: 'So how do firms sort customers? Airlines know that business travelers often book at the last minute and can\'t change their plans, so late bookings cost more. Cinemas give discounts to students and seniors and check ID at the door. Software companies sell a basic version and a professional version, and customers sort themselves by choosing the one that fits their needs.' },
      { speaker: 'Professor', voice: 'female', text: 'Is this unfair? It\'s not that simple. Price discrimination shifts some benefit from consumers to firms. But it can also let people buy who would otherwise be priced out, like the student who can only afford a discounted ticket. So economists usually judge it case by case.' },
    ],
    questions: [
      {
        id: 'f19-ls-at-price-discrimination-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'What is the lecture mainly about?',
        options: [
          'Why airline tickets have become more expensive',
          'Why firms charge different prices for one product',
          'How competition among firms lowers prices in most markets',
          'How software companies design new products',
        ],
        answer: [1],
        explanation:
          'La clase define la "price discrimination" ("charging different customers different prices for the same product") y explica por qué y cómo se practica. Las aerolíneas son solo uno de los ejemplos.',
      },
      {
        id: 'f19-ls-at-price-discrimination-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'According to the professor, what must a firm be able to do for price discrimination to work?',
        options: [
          'Lower its costs below those of its rivals',
          'Charge every customer one single price',
          'Sell its product in a competitive market',
          'Stop customers from reselling the product',
        ],
        answer: [3],
        explanation:
          'Una de las condiciones es "it has to prevent resale". La tercera opción contradice la clase: en un mercado perfectamente competitivo "rivals would simply undercut the high price".',
      },
      {
        id: 'f19-ls-at-price-discrimination-q3',
        kind: 'single',
        skill: 'organization',
        prompt: 'Why does the professor begin with two passengers on the same flight?',
        options: [
          'To show that airlines often make pricing errors',
          'To explain why business travelers book late',
          'To introduce the concept with a familiar case',
          'To argue that ticket prices should be regulated',
        ],
        answer: [2],
        explanation:
          'Presenta el caso como "a puzzle" y enseguida lo nombra: "The airline is practicing what economists call price discrimination". Además aclara que "Nobody made a mistake", lo que descarta la primera opción.',
      },
      {
        id: 'f19-ls-at-price-discrimination-q4',
        kind: 'single',
        skill: 'inference',
        prompt: 'What does the professor imply about basic and professional versions of software?',
        options: [
          "Buyers' choices reveal how much they value it.",
          'The professional version costs far more to produce.',
          'Students are not allowed to buy the basic version.',
          'Most customers end up buying the professional one.',
        ],
        answer: [0],
        explanation:
          'Con dos versiones, "customers sort themselves by choosing the one that fits their needs": al elegir revelan cuánto están dispuestos a pagar. La clase define esta práctica como precios distintos que no se explican por los costes, así que la segunda opción no tiene apoyo.',
      },
    ],
  },
];
