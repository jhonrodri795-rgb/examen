import type { Difficulty, ListeningSet, Topic, Voice } from '../../../types';

/** Simulación n.º 20 — Listening (contenido original). */

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
    form: 20,
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
  cr('f20-ls-cr-new-ta', 'easy', 'female', 'Have you met the new teaching assistant for our chemistry lab yet?', [
    "Yes, I'll meet you at the lab.",
    'The chemistry lab is on the second floor.',
    "Not yet, but I hear she's really helpful.",
    "No, I haven't assisted anyone yet.",
  ], 2, 'Es una pregunta de sí/no sobre si ya conoces al nuevo asistente; "Not yet, but I hear she\'s really helpful" responde con naturalidad. "I\'ll meet you at the lab" repite "meet" y "lab" pero cambia el sentido, y "assisted" es una trampa de sonido.'),
  cr('f20-ls-cr-open-mic', 'easy', 'male', 'A few of us are going to the open-mic night at the campus coffee house on Friday. Want to come?', [
    'Sure, what time does it start?',
    'I usually drink my coffee black.',
    'Yes, the microphone was working fine.',
    "I've already ordered a sandwich, thanks.",
  ], 0, 'Es una invitación ("Want to come?"); la respuesta adecuada la acepta y pide un detalle: "Sure, what time does it start?". Las demás juegan con "coffee" y "mic" o interpretan la invitación como una oferta de comida.', 'campus-life'),
  cr('f20-ls-cr-ask-professor', 'easy', 'female', 'That last homework question is so confusing. Maybe we should ask Professor Lin about it after class.', [
    'I asked for the homework yesterday.',
    'Yes, the class ended early today, actually.',
    "It's question number five, I think.",
    "Good idea. Let's catch her after class.",
  ], 3, 'La compañera hace una sugerencia ("Maybe we should ask Professor Lin"); lo natural es aceptarla: "Good idea. Let\'s catch her after class." Las otras opciones repiten "homework" o "class" sin reaccionar a la propuesta.'),
  cr('f20-ls-cr-novel-apology', 'easy', 'female', "I'm so sorry I kept your novel for so long. I promised I'd return it two weeks ago.", [
    "I'm sorry, I don't have any novels.",
    "Don't worry about it. Did you enjoy it?",
    "I'll return it to the library tomorrow.",
    'Yes, I promise to read it soon.',
  ], 1, 'Ante una disculpa, la respuesta natural es quitarle importancia: "Don\'t worry about it. Did you enjoy it?". "I\'ll return it to the library" confunde quién tiene el libro, y "I promise to read it" repite "promise" sin sentido.', 'daily-life'),
  cr('f20-ls-cr-bookshelf-color', 'easy', 'female', "I can't decide what color to paint my bookshelf. What do you think would look best?", [
    'I painted it last weekend.',
    "I've read most of those books already.",
    'Maybe white, so it matches the walls.',
    'The paint store closes at six.',
  ], 2, 'Pide una opinión sobre el color; "Maybe white, so it matches the walls" da una sugerencia concreta. "I painted it last weekend" cambia la persona y el tiempo verbal, y "The paint store closes at six" no responde a qué color elegir.', 'daily-life'),
  cr('f20-ls-cr-off-campus', 'easy', 'female', "Guess what? I'm moving to an off-campus apartment next month.", [
    "Really? That's exciting! Where is it?",
    'I moved here last month, too.',
    'The apartment was on campus last year.',
    "Next month I'm taking five classes.",
  ], 0, 'Ante una noticia ("Guess what?") se reacciona con interés: "Really? That\'s exciting! Where is it?". "I moved here last month, too" usa mal "too" (ella aún no se ha mudado) y "Next month" solo repite palabras.'),

  // ---------- Choose a Response: medium ----------
  cr('f20-ls-cr-rehearse-room', 'medium', 'male', "Why don't we rehearse our presentation in the actual classroom? That way we can test the projector.", [
    'Because the classroom was too small.',
    'The projector belongs to the department.',
    'I presented last week in that room.',
    "Good idea. I'll check when it's free.",
  ], 3, '"Why don\'t we…?" no es una pregunta por una causa, sino una sugerencia; la respuesta adecuada la acepta: "Good idea. I\'ll check when it\'s free." "Because the classroom was too small" interpreta "why" literalmente.'),
  cr('f20-ls-cr-open-book', 'medium', 'female', 'Excuse me, Professor. For the take-home quiz, are we allowed to use our textbook and notes?', [
    'Yes, you can take it home on Tuesday.',
    'Yes, but you have to work on it alone.',
    'The textbook costs about sixty dollars.',
    'I took notes during the whole lecture.',
  ], 1, 'La estudiante pide una aclaración sobre si pueden usar libro y apuntes; "Yes, but you have to work on it alone" responde y añade una condición. "Take it home" es una trampa con "take-home", y "I took notes" cambia la persona.'),
  cr('f20-ls-cr-handout-detail', 'medium', 'male', "Honestly, I think our handout has way too much detail. Nobody's going to read three pages during a ten-minute talk.", [
    "You're right. Let's cut it to one page.",
    "I agree. Let's add a few more examples.",
    'The talk was longer than ten minutes last time.',
    "I'll hand it in before the deadline.",
  ], 0, 'El compañero opina que el folleto es demasiado largo, lo que implica que hay que acortarlo; "Let\'s cut it to one page" responde a esa sugerencia implícita. "Let\'s add a few more examples" dice "I agree" pero propone lo contrario.'),
  cr('f20-ls-cr-recommendation', 'medium', 'female', 'I need a recommendation letter from Dr. Patel. Should I email her or just stop by her office?', [
    'She recommended a good book to me.',
    'Yes, I emailed her last week.',
    "I'd go in person. It's more personal.",
    'Her office is in the science building.',
  ], 2, 'Es una pregunta alternativa ("email her or just stop by"), así que hay que elegir una opción y dar consejo: "I\'d go in person." "Yes, I emailed her" no sirve porque no se responde con sí/no, y "recommended" es una trampa de sonido.'),
  cr('f20-ls-cr-tournament-bus', 'medium', 'male', "Don't forget, the bus for the tournament leaves at seven sharp tomorrow morning.", [
    'I forgot my racket at the gym yesterday.',
    'The tournament lasted for two days.',
    'I usually take the bus to class.',
    "Thanks. I'll set my alarm for six.",
  ], 3, 'Es un recordatorio; lo natural es agradecerlo y mostrar que se actuará: "Thanks. I\'ll set my alarm for six." Las demás repiten "forget", "tournament" o "bus" sin responder.'),
  cr('f20-ls-cr-career-fair', 'medium', 'female', "The career fair is in the gym this year, isn't it?", [
    'Yes, I go to the gym almost every morning.',
    'No, they moved it to the student center.',
    "I'm looking for a summer job.",
    "It isn't fair to charge students.",
  ], 1, 'La pregunta coletilla ("isn\'t it?") pide confirmar el lugar; "No, they moved it to the student center" lo corrige. "Fair" (feria) y "fair" (justo) suenan igual: esa es la trampa de la última opción.'),

  // ---------- Choose a Response: hard ----------
  cr('f20-ls-cr-thesis-approach', 'hard', 'male', "Well... that's certainly one way to approach the thesis.", [
    "You don't sound sure. What would you change?",
    "Thanks! I'm glad you think it's perfect.",
    'I approached the professor after class.',
    "Yes, there's really only one way to write it.",
  ], 0, '"That\'s certainly one way to approach it", dicho con duda ("Well..."), expresa desacuerdo cortés; la respuesta adecuada lo capta: "You don\'t sound sure." Tomarlo como un elogio ("I\'m glad you think it\'s perfect") es malinterpretar el tono.'),
  cr('f20-ls-cr-ferry-late', 'hard', 'female', 'I wonder if the ferry is still running this late in the season.', [
    'I wonder about that every time I go running.',
    'Yes, it ran late yesterday too.',
    'Let me check the schedule on my phone.',
    'The season starts in early June.',
  ], 2, '"I wonder if…" es una pregunta indirecta: quiere saber si el ferri sigue funcionando. "Let me check the schedule" responde de forma útil. "It ran late" confunde "late in the season" con "con retraso", y "running" se usa como trampa de sonido.', 'daily-life'),
  cr('f20-ls-cr-reading-evidence', 'hard', 'male', 'Interesting reading. Where in the text do you see that?', [
    'I read it on the train early this morning.',
    "In chapter two, in the narrator's letters.",
    'I see it better with my glasses on.',
    'Thank you, I found it interesting too.',
  ], 1, 'El profesor cuestiona la interpretación y pide pruebas ("where in the text"); hay que señalar el pasaje: "In chapter two, in the narrator\'s letters." Tomar "Interesting" como un cumplido o "see" en sentido literal no responde.'),
  cr('f20-ls-cr-eight-am', 'hard', 'female', 'Next time, remind me never to take an eight a.m. class.', [
    "Okay, I'll set an alarm for eight.",
    "The class starts at eight sharp, doesn't it?",
    'I took that class last semester.',
    "Rough morning? I don't know how you do it.",
  ], 3, 'No es una petición literal sino una queja que expresa arrepentimiento por haber elegido una clase tan temprana; la respuesta natural muestra comprensión: "Rough morning?". "I\'ll set an alarm" interpreta "remind me" al pie de la letra.'),
  cr('f20-ls-cr-poster-instead', 'hard', 'male', 'Have you considered doing a poster instead of a paper for the final project?', [
    'No, but it might suit my topic better.',
    'Yes, I posted the paper online.',
    'The final project is due in May.',
    'I considered it a very good paper, actually.',
  ], 0, 'La pregunta es en realidad una sugerencia; "No, but it might suit my topic better" muestra que se toma en cuenta. "Posted" suena como "poster", y "I considered it a very good paper" usa "consider" con otro significado.'),
  cr('f20-ls-cr-botanical-garden', 'hard', 'female', 'You know, the botanical garden is usually empty on weekday mornings.', [
    "It's empty because the plants died.",
    "I garden at my parents' house on weekends.",
    "Great, let's go on Tuesday before class.",
    'Mornings are usually busy for me too.',
  ], 2, 'El comentario sugiere de forma implícita que es buen momento para ir; "Great, let\'s go on Tuesday before class" capta la sugerencia. "Empty because the plants died" toma "empty" al pie de la letra, y "too" en la última opción no tiene sentido.', 'daily-life'),

  // ---------- Conversations ----------
  {
    id: 'f20-ls-cv-tour-guide',
    form: 20,
    section: 'listening',
    task: 'conversation',
    title: 'Becoming a Campus Tour Guide',
    topic: 'campus-life',
    difficulty: 'easy',
    context: 'Listen to a conversation between a student and a coordinator in the admissions office.',
    script: [
      { speaker: 'Student', voice: 'male', text: 'Hi, I saw a flyer saying the admissions office is hiring campus tour guides. Is it too late to apply?' },
      { speaker: 'Coordinator', voice: 'female', text: "Not at all. We're accepting applications until the end of this month. Are you a first-year student?" },
      { speaker: 'Student', voice: 'male', text: "I'm a sophomore. I really like this school, and I think I'd enjoy showing it to visitors." },
      { speaker: 'Coordinator', voice: 'female', text: "That's exactly what we look for. Before you lead any tours, though, you'd need to complete our training. There are three evening sessions, each about two hours, during the first two weeks of next month." },
      { speaker: 'Student', voice: 'male', text: 'What do you cover in the training?' },
      { speaker: 'Coordinator', voice: 'female', text: "The first session is about the history of the campus and the facts families usually ask about, like class sizes and housing. In the second one, you'll walk the tour route with an experienced guide. And in the last one, you'll lead a practice tour while we give you feedback." },
      { speaker: 'Student', voice: 'male', text: 'That sounds manageable. How many hours a week would I work after that?' },
      { speaker: 'Coordinator', voice: 'female', text: 'Most guides give two tours a week, and each tour takes about an hour and fifteen minutes. During the busy season in April, we sometimes ask for a third tour.' },
      { speaker: 'Student', voice: 'male', text: "Okay. I have labs on Tuesday and Thursday afternoons, so I'd need mornings or Mondays." },
      { speaker: 'Coordinator', voice: 'female', text: "That's fine. You'll list your availability on the application, and we build the tour schedule around your classes. You can pick up the form right here." },
    ],
    questions: [
      {
        id: 'f20-ls-cv-tour-guide-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'Why does the student go to the admissions office?',
        options: [
          'To sign up for a tour of the campus',
          'To ask about working as a tour guide',
          'To change the time of his lab classes',
          'To get information about student housing',
        ],
        answer: [1],
        explanation:
          'El estudiante vio un anuncio de que "the admissions office is hiring campus tour guides" y pregunta si aún puede presentarse. No quiere hacer una visita guiada, sino trabajar como guía.',
      },
      {
        id: 'f20-ls-cv-tour-guide-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'What happens in the final training session?',
        options: [
          'Trainees learn the history of the campus.',
          'Trainees answer questions about housing.',
          'Trainees walk the route with a guide.',
          'Trainees lead a tour and get feedback.',
        ],
        answer: [3],
        explanation:
          'La coordinadora explica: "in the last one, you\'ll lead a practice tour while we give you feedback". Recorrer la ruta con un guía corresponde a la segunda sesión y la historia del campus, a la primera.',
      },
      {
        id: 'f20-ls-cv-tour-guide-q3',
        kind: 'single',
        skill: 'inference',
        prompt: "What does the coordinator imply about the student's lab schedule?",
        options: [
          'It will not stop him from becoming a guide.',
          'It will make it hard for him to attend training.',
          'He will have to change it before April.',
          'He must give extra tours to make up for it.',
        ],
        answer: [0],
        explanation:
          'Ante sus laboratorios de martes y jueves, la coordinadora responde "That\'s fine" y añade "we build the tour schedule around your classes": su horario no es un obstáculo. Nada indica que la formación, que es por la tarde-noche, choque con sus clases.',
      },
    ],
  },
  {
    id: 'f20-ls-cv-credit-transfer',
    form: 20,
    section: 'listening',
    task: 'conversation',
    title: 'Transferring Credits from Spain',
    topic: 'campus-life',
    difficulty: 'medium',
    context: 'Listen to a conversation between a student and a study-abroad adviser.',
    script: [
      { speaker: 'Student', voice: 'female', text: "Hi, I'm thinking about a summer program in Seville, and I want to make sure the courses count toward my economics major, not just as electives." },
      { speaker: 'Adviser', voice: 'male', text: "Good that you're asking now rather than after you get back. Which courses are you looking at?" },
      { speaker: 'Student', voice: 'female', text: "There's one called International Trade and another on the economy of the European Union. Both are taught in English." },
      { speaker: 'Adviser', voice: 'male', text: "Okay. The program itself is already approved by the university, so the credits will transfer. The question is whether they'll count as major credit. For that, the economics department has to review each course." },
      { speaker: 'Student', voice: 'female', text: 'How do they decide?' },
      { speaker: 'Adviser', voice: 'male', text: "They compare the course with ours. So you'll need a detailed syllabus for each one, not just the short description on the program's website. It should list the readings, the assignments, and how many hours the class meets." },
      { speaker: 'Student', voice: 'female', text: 'I can probably ask the program coordinator for those. Anything else?' },
      { speaker: 'Adviser', voice: 'male', text: 'Yes, you fill out a course approval form, and your faculty adviser in economics has to sign it. Then I send everything to the department. It usually takes about three weeks.' },
      { speaker: 'Student', voice: 'female', text: 'Three weeks? The application deadline is in a month.' },
      { speaker: 'Adviser', voice: 'male', text: "Then I'd request the syllabi today. And keep in mind, even if a course is approved, you'll need to earn a C or better for it to transfer at all." },
      { speaker: 'Student', voice: 'female', text: "Got it. I'll email the coordinator this afternoon." },
    ],
    questions: [
      {
        id: 'f20-ls-cv-credit-transfer-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'What is the conversation mainly about?',
        options: [
          'Whether the student should study in Spain or elsewhere',
          'How the student can raise her grades before going abroad',
          'How to get her summer courses counted for her major',
          'Why the university has stopped approving summer programs',
        ],
        answer: [2],
        explanation:
          'Desde el principio la estudiante quiere asegurarse de que "the courses count toward my economics major", y el asesor explica el proceso. El programa ya está aprobado ("already approved by the university"), así que la última opción es falsa.',
      },
      {
        id: 'f20-ls-cv-credit-transfer-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'What does the department need in order to review a course?',
        options: [
          'A detailed syllabus for the course',
          'The short description from the website',
          'A letter from the program coordinator',
          "The student's grades from last year",
        ],
        answer: [0],
        explanation:
          'El asesor dice "you\'ll need a detailed syllabus for each one, not just the short description on the program\'s website". La descripción breve es precisamente lo que no basta; la coordinadora solo se menciona como la persona a quien pedir los programas.',
      },
      {
        id: 'f20-ls-cv-credit-transfer-q3',
        kind: 'single',
        skill: 'function',
        prompt: "Why does the adviser say, \"Then I'd request the syllabi today\"?",
        options: [
          'To point out that the department already has them',
          'To suggest that she apply to a different program',
          'To show that he doubts the courses will be approved',
          'To urge her to act fast because of the deadline',
        ],
        answer: [3],
        explanation:
          'La revisión tarda "about three weeks" y la estudiante responde que "The application deadline is in a month"; por eso el asesor le aconseja pedir los programas ese mismo día. No expresa dudas sobre la aprobación.',
      },
    ],
  },
  {
    id: 'f20-ls-cv-grade-replacement',
    form: 20,
    section: 'listening',
    task: 'conversation',
    title: 'Retaking a Failed Course',
    topic: 'campus-life',
    difficulty: 'hard',
    context: 'Listen to a conversation between a student and an academic adviser.',
    script: [
      { speaker: 'Adviser', voice: 'female', text: 'Come in, Marcus. So, you got the letter about academic probation.' },
      { speaker: 'Student', voice: 'male', text: "Yes. My GPA dropped to 1.8 after last semester, mostly because I failed Calculus Two. I'm worried I'll be dismissed." },
      { speaker: 'Adviser', voice: 'female', text: 'I understand. The good news is that you have a full semester to fix this. To get off probation, your cumulative GPA needs to be at least 2.0 by the end of the spring.' },
      { speaker: 'Student', voice: 'male', text: 'Someone told me that if I retake Calculus, the F just disappears. Is that true?' },
      { speaker: 'Adviser', voice: 'female', text: "Partly. Under our grade replacement policy, if you retake a course you failed, the new grade replaces the old one in your GPA calculation. But the F doesn't disappear from your transcript. It stays there, marked as repeated, so anyone reading the transcript will still see it." },
      { speaker: 'Student', voice: 'male', text: "Oh. But it won't count in the average anymore?" },
      { speaker: 'Adviser', voice: 'female', text: 'Exactly. And because Calculus Two is a four-credit course, replacing that F will have a big effect. If you earn a C in the retake and at least a C average in your other courses, your GPA should end up a little above 2.0.' },
      { speaker: 'Student', voice: 'male', text: 'So a C is enough?' },
      { speaker: 'Adviser', voice: 'female', text: "A C is the minimum I'd aim for. A D would still replace the F, but your GPA would probably stay below 2.0, and you'd remain on probation. Also, you can only use grade replacement twice during your degree, so use it carefully." },
      { speaker: 'Student', voice: 'male', text: 'Then I should retake Calculus this spring instead of waiting.' },
      { speaker: 'Adviser', voice: 'female', text: "I'd recommend it. And I'd strongly suggest the math tutoring center. Students who go at least once a week do noticeably better in that course." },
      { speaker: 'Student', voice: 'male', text: "Okay. I'll register for both today." },
    ],
    questions: [
      {
        id: 'f20-ls-cv-grade-replacement-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'What is the main purpose of the conversation?',
        options: [
          'To explain why the student was put on probation',
          'To help the student choose a different major',
          'To discuss how to appeal a failing grade',
          'To plan how the student can raise his GPA',
        ],
        answer: [3],
        explanation:
          'La asesora explica qué necesita el estudiante ("at least 2.0 by the end of the spring") y cómo repetir Cálculo le ayudaría a lograrlo. La causa de la condicional se menciona solo al principio; no es el tema central.',
      },
      {
        id: 'f20-ls-cv-grade-replacement-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'According to the adviser, what happens to the original F if the student retakes the course?',
        options: [
          'It is erased from his transcript completely.',
          'It stays on his record but not in his GPA.',
          'It is averaged together with the new grade.',
          'It counts as a D in his GPA calculation.',
        ],
        answer: [1],
        explanation:
          'La asesora aclara que "the new grade replaces the old one in your GPA calculation", pero "the F doesn\'t disappear from your transcript". Por eso es falso que se borre por completo, que es justo lo que el estudiante había oído.',
      },
      {
        id: 'f20-ls-cv-grade-replacement-q3',
        kind: 'single',
        skill: 'function',
        prompt: 'Why does the adviser mention that grade replacement can be used only twice?',
        options: [
          'To suggest that he retake two courses this spring',
          'To explain why his F will stay on his transcript',
          'To warn him that the option is limited and valuable',
          'To show that the policy applies only to math courses',
        ],
        answer: [2],
        explanation:
          'Dice "you can only use grade replacement twice during your degree, so use it carefully": es una advertencia de que la opción es limitada y no conviene desperdiciarla. No recomienda repetir dos cursos ni relaciona ese límite con el expediente.',
      },
    ],
  },

  // ---------- Announcements ----------
  {
    id: 'f20-ls-an-writing-center-evenings',
    form: 20,
    section: 'listening',
    task: 'announcement',
    title: 'Evening Hours at the Writing Center',
    topic: 'campus-life',
    difficulty: 'easy',
    context: 'Listen to an announcement on a university campus.',
    script: [
      {
        speaker: 'Announcer',
        voice: 'female',
        text: "Good afternoon, everyone. This is a message from the University Writing Center. Starting next Monday, we're adding evening tutoring hours for students who have classes or jobs during the day. From Monday through Thursday, tutors will be available from six to nine p.m. at our second location, on the ground floor of Hayes Library. Our daytime hours in Morgan Hall will stay the same. Evening sessions last forty-five minutes, just like daytime sessions, and you can book them on the Writing Center website up to one week in advance. A few walk-in spots will be available each night, but they fill up quickly during midterms, so we recommend booking ahead. And please remember to bring a copy of your assignment.",
      },
    ],
    questions: [
      {
        id: 'f20-ls-an-writing-center-evenings-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'What is the announcement mainly about?',
        options: [
          'New evening hours for writing tutoring',
          'A change in the location of the library',
          'A workshop on how to write assignments',
          'New rules for canceling appointments',
        ],
        answer: [0],
        explanation:
          'El anuncio informa de que "we\'re adding evening tutoring hours" de lunes a jueves. La biblioteca solo se menciona como lugar de las sesiones; no cambia de ubicación.',
      },
      {
        id: 'f20-ls-an-writing-center-evenings-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'Where will the evening sessions take place?',
        options: ['In Morgan Hall', 'In the student center', 'In Hayes Library', "In the tutors' offices"],
        answer: [2],
        explanation:
          'Las sesiones nocturnas serán "at our second location, on the ground floor of Hayes Library". Morgan Hall es el lugar del horario diurno, que "will stay the same".',
      },
      {
        id: 'f20-ls-an-writing-center-evenings-q3',
        kind: 'single',
        skill: 'inference',
        prompt: 'What does the speaker imply about walk-in sessions?',
        options: [
          'They are available only on Fridays.',
          'They may run out during midterms.',
          'They last longer than booked sessions.',
          'They must be reserved one week ahead.',
        ],
        answer: [1],
        explanation:
          'Los huecos sin cita "fill up quickly during midterms", por lo que se recomienda reservar. Lo de "one week in advance" se refiere a las citas reservadas por internet, no a las sesiones sin cita.',
      },
    ],
  },
  {
    id: 'f20-ls-an-electronics-recycling',
    form: 20,
    section: 'listening',
    task: 'announcement',
    title: 'Electronics Recycling Drive',
    topic: 'campus-life',
    difficulty: 'medium',
    context: 'Listen to an announcement on a university campus.',
    script: [
      {
        speaker: 'Announcer',
        voice: 'male',
        text: "Attention, students and staff. The Office of Sustainability is holding its spring electronics recycling drive next Wednesday and Thursday, from ten a.m. to four p.m., in the parking lot behind the Recreation Center. We'll accept laptops, phones, tablets, keyboards, printers, chargers, and cables. However, we can't take large appliances like refrigerators or microwaves, and we can't accept broken light bulbs, for safety reasons.",
      },
      {
        speaker: 'Announcer',
        voice: 'male',
        text: "Before you drop off a phone or computer, please erase your personal data. Back up anything you want to keep, sign out of all your accounts, and then do a full factory reset. Simply deleting files doesn't actually remove them from the device. If you're not sure how to do this, the IT help desk in the library will walk you through it for free. Everything we collect goes to a certified recycler, so valuable metals can be recovered instead of ending up in a landfill.",
      },
    ],
    questions: [
      {
        id: 'f20-ls-an-electronics-recycling-q1',
        kind: 'single',
        skill: 'purpose',
        prompt: 'What is the main purpose of the announcement?',
        options: [
          'To ask students to donate working laptops to classmates',
          'To explain how the IT help desk repairs old devices',
          'To warn students about the dangers of broken bulbs',
          'To announce an event for recycling electronics',
        ],
        answer: [3],
        explanation:
          'La Oficina de Sostenibilidad anuncia "its spring electronics recycling drive" y explica qué se acepta y cómo preparar los aparatos. El servicio informático solo ayuda a borrar datos; no repara dispositivos.',
      },
      {
        id: 'f20-ls-an-electronics-recycling-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'Which item will NOT be accepted at the drive?',
        options: ['Printers', 'Microwaves', 'Phone chargers', 'Tablets'],
        answer: [1],
        explanation:
          'El anunciante dice "we can\'t take large appliances like refrigerators or microwaves". Las impresoras, los cargadores y las tabletas sí aparecen en la lista de objetos aceptados.',
      },
      {
        id: 'f20-ls-an-electronics-recycling-q3',
        kind: 'single',
        skill: 'inference',
        prompt: 'What is implied about deleting files from a phone?',
        options: [
          'It is the best way to protect personal information.',
          'It must be done by the IT help desk staff.',
          'It may leave personal data on the device.',
          'It is required before backing up the phone.',
        ],
        answer: [2],
        explanation:
          '"Simply deleting files doesn\'t actually remove them from the device": borrar archivos no basta y los datos pueden quedar en el aparato; por eso se pide un "full factory reset". La primera opción afirma justo lo contrario.',
      },
    ],
  },
  {
    id: 'f20-ls-an-flipped-classroom',
    form: 20,
    section: 'listening',
    task: 'announcement',
    title: 'Switching to a Flipped Classroom',
    topic: 'campus-life',
    difficulty: 'hard',
    context: 'Listen to a professor making an announcement at the beginning of a class.',
    script: [
      {
        speaker: 'Professor',
        voice: 'male',
        text: "Before we begin, I want to tell you about a change to how this course will run for the rest of the semester. Starting next week, we're switching to what's called a flipped classroom. Instead of hearing my lectures in class, you'll watch short video lectures online before each session, usually two or three videos of about fifteen minutes each.",
      },
      {
        speaker: 'Professor',
        voice: 'male',
        text: "Then we'll use class time to work through problems in small groups, and I'll move around the room to help. So coming to class without watching the videos really won't work. To help everyone keep up, there'll be a short online quiz on each set of videos, due one hour before class. Those quizzes will be worth ten percent of your final grade, so the midterm will drop from thirty to twenty percent. Everything else stays the same.",
      },
    ],
    questions: [
      {
        id: 'f20-ls-an-flipped-classroom-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'What is the announcement mainly about?',
        options: [
          "A new date for the course's midterm exam",
          'A change in how the course will be taught',
          'A new policy about group projects in class',
          'Problems students have had with online quizzes',
        ],
        answer: [1],
        explanation:
          'El profesor anuncia "a change to how this course will run": clases en vídeo antes de cada sesión y resolución de problemas en clase. El examen parcial no cambia de fecha; solo cambia su peso.',
      },
      {
        id: 'f20-ls-an-flipped-classroom-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'According to the professor, when are the online quizzes due?',
        options: ['One hour before each class', 'At the end of each class', 'Fifteen minutes after class', 'The day before the midterm'],
        answer: [0],
        explanation:
          'Cada cuestionario vence "due one hour before class". "Fifteen minutes" es la duración aproximada de cada vídeo, no el plazo.',
      },
      {
        id: 'f20-ls-an-flipped-classroom-q3',
        kind: 'single',
        skill: 'inference',
        prompt: 'What can be inferred about students who do not watch the videos?',
        options: [
          'They will be asked to leave the classroom.',
          'They can make up the work during the midterm.',
          'They will lose ten percent of their final grade.',
          'They will struggle to take part in class.',
        ],
        answer: [3],
        explanation:
          'Como la clase se dedica a resolver problemas, "coming to class without watching the videos really won\'t work": esos estudiantes tendrán dificultades para participar. El diez por ciento es el peso total de los cuestionarios, no una penalización por no ver los vídeos.',
      },
    ],
  },

  // ---------- Academic Talks ----------
  {
    id: 'f20-ls-at-railway-time',
    form: 20,
    section: 'listening',
    task: 'academic-talk',
    title: 'Railroads and Standard Time',
    topic: 'history',
    difficulty: 'easy',
    context: 'Listen to part of a lecture in a history class.',
    script: [
      { speaker: 'Professor', voice: 'female', text: "Today I want to look at something we all take for granted: the idea that everyone in a large region shares the same clock time. Until the late nineteenth century, that simply wasn't true. Each town set its clocks by the sun. When the sun reached its highest point in the sky, it was noon. That meant noon in Boston came about twelve minutes earlier than noon in New York, which is farther west." },
      { speaker: 'Professor', voice: 'female', text: "For most of history, these small differences didn't matter. If it took you two days to ride a horse to the next city, nobody cared whether its clocks were twelve minutes ahead. The railroads changed that. Trains traveled fast enough that the differences became a real problem. Each railroad company usually ran on the local time of its headquarters city, so a single station might display several clocks showing different times. By some counts, North American railroads were using more than fifty different times. Passengers missed connections, and, more seriously, scheduling errors could put two trains on the same track." },
      { speaker: 'Professor', voice: 'female', text: "So the railroads decided to solve the problem themselves. On November 18, 1883, railroads across the United States and Canada switched to a system of standard time zones. In the United States, there were four main zones, essentially the Eastern, Central, Mountain, and Pacific zones we use today. Within each zone, every clock showed the same time, and neighboring zones differed by exactly one hour. People called it the day of two noons, because in many cities the clocks were set back at midday, so noon happened twice." },
      { speaker: 'Professor', voice: 'female', text: "Interestingly, this was a decision made by private companies, not by the government. Most towns quickly adopted railroad time because daily life revolved around the trains, but some cities resisted for years. The U.S. Congress didn't make standard time official until 1918. In other words, railroad schedules shaped the way millions of people organized their days long before any law required it." },
    ],
    questions: [
      {
        id: 'f20-ls-at-railway-time-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'What is the lecture mainly about?',
        options: [
          'Why some cities refused to change their clocks',
          'How trains became faster in the nineteenth century',
          'How railroads led to the creation of time zones',
          'Why Congress passed a law about railroad safety',
        ],
        answer: [2],
        explanation:
          'La clase explica cómo los ferrocarriles, ante el caos horario, adoptaron en 1883 "a system of standard time zones". La resistencia de algunas ciudades es solo un detalle, y la ley de 1918 trataba de la hora oficial, no de la seguridad ferroviaria.',
      },
      {
        id: 'f20-ls-at-railway-time-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'According to the professor, how did towns set their clocks before 1883?',
        options: [
          'By the position of the sun at midday',
          'By the time used in the nearest big city',
          'By signals sent from railroad stations',
          'By a national time set by the government',
        ],
        answer: [0],
        explanation:
          '"Each town set its clocks by the sun. When the sun reached its highest point in the sky, it was noon." Usar la hora de una ciudad sede era lo que hacían las compañías ferroviarias, no los pueblos.',
      },
      {
        id: 'f20-ls-at-railway-time-q3',
        kind: 'single',
        skill: 'organization',
        prompt: 'Why does the professor mention riding a horse to the next city?',
        options: [
          'To describe how mail was delivered before railroads',
          'To show that early trains were slower than horses',
          'To explain why towns were built so far apart',
          'To show why time differences once mattered little',
        ],
        answer: [3],
        explanation:
          'Con viajes tan lentos, "nobody cared whether its clocks were twelve minutes ahead": el ejemplo muestra por qué las diferencias de hora local no importaban antes del tren. La profesora dice lo contrario de que los trenes fueran lentos.',
      },
      {
        id: 'f20-ls-at-railway-time-q4',
        kind: 'single',
        skill: 'inference',
        prompt: 'What does the professor imply about the adoption of standard time?',
        options: [
          'It was required by law first and later used by railroads.',
          'It spread because daily life depended on trains.',
          'It was accepted at once by every city in North America.',
          'It was designed by the government to prevent accidents.',
        ],
        answer: [1],
        explanation:
          'Los pueblos adoptaron la hora ferroviaria "because daily life revolved around the trains", y la ley llegó mucho después, en 1918. Por eso la primera opción invierte el orden, y la tercera contradice "some cities resisted for years".',
      },
    ],
  },
  {
    id: 'f20-ls-at-hangul',
    form: 20,
    section: 'listening',
    task: 'academic-talk',
    title: 'Designing the Korean Alphabet',
    topic: 'linguistics',
    difficulty: 'medium',
    context: 'Listen to part of a lecture in a linguistics class.',
    script: [
      { speaker: 'Professor', voice: 'male', text: "Last time we looked at writing systems that developed gradually over centuries. Today's example is different, because we know exactly when and why it was invented: the Korean alphabet, Hangul. In the 1440s, Korea's King Sejong and a group of scholars at his court created a new script, and it was presented to the public in 1446." },
      { speaker: 'Professor', voice: 'male', text: 'Why did Korea need a new script? At the time, educated Koreans wrote using Chinese characters. But Chinese and Korean are very different languages, and learning thousands of characters took years of study. So reading and writing were largely limited to a small elite. Sejong wanted a system that ordinary people could learn quickly. In fact, a document from the period claimed that a clever person could learn it in a single morning, and even a slow learner within about ten days.' },
      { speaker: 'Professor', voice: 'male', text: "What makes Hangul so interesting to linguists is how the letters were designed. The basic consonant shapes are pictures of the speech organs making each sound. The letter for the k or g sound looks like an angle, and it shows the back of the tongue rising to block the throat. The letter for n shows the tip of the tongue touching the ridge behind the upper teeth. And the letter for m is a square, representing the closed mouth. Related sounds were then shown by adding strokes; adding a line to the k letter creates the letter for a stronger, breathier k." },
      { speaker: 'Professor', voice: 'male', text: "The vowels follow a different logic. They're built from three simple elements: a dot for heaven, a horizontal line for the earth, and a vertical line for a human being. And the letters aren't written in a single row like English. They're grouped into blocks, one block per syllable." },
      { speaker: 'Professor', voice: 'male', text: 'Not everyone welcomed the new script. Some scholars argued that giving up Chinese characters would cut Korea off from classical learning, and for centuries Hangul was used mostly in private letters and popular writing. It only became the official script for government documents in the late nineteenth century.' },
    ],
    questions: [
      {
        id: 'f20-ls-at-hangul-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'What is the lecture mainly about?',
        options: [
          'The creation and design of the Korean alphabet',
          'The influence of Chinese culture on Korean history',
          'The grammatical differences between Korean and Chinese',
          "The reasons scholars rejected King Sejong's reforms",
        ],
        answer: [0],
        explanation:
          'El profesor explica cuándo y por qué se inventó Hangul y, sobre todo, "how the letters were designed". La oposición de algunos eruditos aparece solo al final y no es el tema principal.',
      },
      {
        id: 'f20-ls-at-hangul-q2',
        kind: 'single',
        skill: 'detail',
        prompt: "According to the professor, what does the letter for the m sound represent?",
        options: [
          'The tongue touching the teeth',
          'A dot symbolizing heaven',
          'The back of the tongue rising',
          'The shape of the closed mouth',
        ],
        answer: [3],
        explanation:
          '"The letter for m is a square, representing the closed mouth." La lengua que se eleva corresponde a la letra de k/g, y el punto del cielo es un elemento de las vocales.',
      },
      {
        id: 'f20-ls-at-hangul-q3',
        kind: 'single',
        skill: 'organization',
        prompt: 'Why does the professor mention that a clever person could learn the script in a single morning?',
        options: [
          'To suggest that scholars found the script too simple',
          'To stress how easy the script was meant to be',
          'To explain why the script borrowed Chinese characters',
          'To compare the speed of learning Korean and English',
        ],
        answer: [1],
        explanation:
          'La cita sigue a "Sejong wanted a system that ordinary people could learn quickly": ilustra lo fácil que debía ser el nuevo sistema. Nada indica que el alfabeto tomara caracteres chinos; al contrario, debía sustituirlos.',
      },
      {
        id: 'f20-ls-at-hangul-q4',
        kind: 'single',
        skill: 'inference',
        prompt: 'What can be inferred about Hangul in the centuries after it was introduced?',
        options: [
          'It quickly replaced Chinese characters in government.',
          'It was used mainly by scholars of classical texts.',
          'It was not fully accepted by the educated elite.',
          'It was written in single rows, like English.',
        ],
        answer: [2],
        explanation:
          'Algunos eruditos se opusieron y Hangul se usó "mostly in private letters and popular writing" hasta finales del siglo XIX, lo que indica que la élite culta no lo aceptó del todo. La primera opción contradice que solo fuera oficial siglos después.',
      },
    ],
  },
  {
    id: 'f20-ls-at-light-pollution',
    form: 20,
    section: 'listening',
    task: 'academic-talk',
    title: 'Light Pollution and Wildlife',
    topic: 'environment',
    difficulty: 'hard',
    context: 'Listen to part of a lecture in an environmental science class.',
    script: [
      { speaker: 'Professor', voice: 'female', text: "Most of the pollution we've discussed this term, like smoke, chemicals, and plastic, is something you can measure in a sample. Today's topic is different. It's light. Artificial light at night has spread so quickly that most people in North America and Europe can no longer see the Milky Way from where they live. For us, that's a cultural loss. But many animals evolved to rely on natural patterns of light and darkness, so for them it can be a matter of survival." },
      { speaker: 'Professor', voice: 'female', text: "Let's start with birds. Many songbirds migrate at night, and they navigate partly by the stars and partly by sensing Earth's magnetic field. Bright city lights seem to confuse them. Especially on cloudy nights, migrating birds are drawn toward illuminated buildings, where they may circle until they're exhausted or crash into windows. That's why several cities now run Lights Out programs, asking building owners to turn off unnecessary lights during migration seasons." },
      { speaker: 'Student', voice: 'male', text: 'Is that only a problem in cities, or does it happen on the coast too?' },
      { speaker: 'Professor', voice: 'female', text: "Good question, and it leads to my second example: sea turtles. Females lay their eggs in the sand, and when the hatchlings emerge, usually at night, they need to reach the ocean quickly. They do this by crawling toward the brightest horizon, which on a natural beach is the open sky over the water. But if there are hotels or streetlights behind the beach, hatchlings may head inland, toward roads, where many die. Some coastal communities now require shielded or amber-colored lights during nesting season, since turtles are less sensitive to those longer wavelengths." },
      { speaker: 'Professor', voice: 'female', text: "Finally, insects. Many are attracted to lamps and keep circling them until they die of exhaustion or get eaten. That matters because nighttime insects pollinate many plants. One study in Switzerland found that plants near streetlights received far fewer visits from nocturnal pollinators than plants in dark areas. The encouraging part is that, unlike a chemical spill, light pollution disappears the moment you switch the light off. Pointing fixtures downward, using motion sensors, and choosing warmer colors can help all three groups at once." },
    ],
    questions: [
      {
        id: 'f20-ls-at-light-pollution-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'What is the lecture mainly about?',
        options: [
          'Why cities have stopped using streetlights at night',
          'How migrating birds use the stars to navigate',
          'Why sea turtles lay their eggs on dark beaches',
          'How night lighting harms different kinds of animals',
        ],
        answer: [3],
        explanation:
          'La profesora presenta la luz artificial nocturna como contaminación y da tres ejemplos de animales afectados: aves, tortugas marinas e insectos. La navegación de las aves es solo uno de esos ejemplos.',
      },
      {
        id: 'f20-ls-at-light-pollution-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'According to the professor, how do sea-turtle hatchlings find the ocean?',
        options: [
          'By following the sound of the waves',
          'By heading for the brightest horizon',
          "By sensing Earth's magnetic field",
          "By following their mothers' tracks",
        ],
        answer: [1],
        explanation:
          'Las crías avanzan "toward the brightest horizon, which on a natural beach is the open sky over the water". El campo magnético se menciona para las aves, no para las tortugas.',
      },
      {
        id: 'f20-ls-at-light-pollution-q3',
        kind: 'single',
        skill: 'organization',
        prompt: 'Why does the professor mention a chemical spill?',
        options: [
          'To argue that light is as harmful as chemical waste',
          'To give an example of pollution that affects insects',
          'To show how easily light pollution can be stopped',
          'To explain why sea turtles avoid polluted beaches',
        ],
        answer: [2],
        explanation:
          'El contraste es "unlike a chemical spill, light pollution disappears the moment you switch the light off": la luz es fácil de eliminar. La profesora no compara la gravedad de ambas contaminaciones.',
      },
      {
        id: 'f20-ls-at-light-pollution-q4',
        kind: 'single',
        skill: 'inference',
        prompt: 'What can be inferred about amber-colored lights?',
        options: [
          'They are less likely to mislead hatchlings.',
          'They are brighter than the lights used in most hotels.',
          'They attract more moths than ordinary white lights.',
          'They help migrating birds navigate on cloudy nights.',
        ],
        answer: [0],
        explanation:
          'Se exigen luces ámbar en la temporada de anidación "since turtles are less sensitive to those longer wavelengths"; por tanto, desorientan menos a las crías. Nada se dice de que sean más brillantes ni de que ayuden a las aves.',
      },
    ],
  },
];
