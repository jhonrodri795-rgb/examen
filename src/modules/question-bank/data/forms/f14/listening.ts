import type { Difficulty, ListeningSet, Topic, Voice } from '../../../types';

/** Simulación n.º 14 — Listening (contenido original). */

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
    form: 14,
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
  cr('f14-ls-cr-double-spaced', 'easy', 'female', "Does the essay for Professor Kim's class have to be double-spaced?", [
    'Yes, I spaced out during class.',
    "Yes, it's in the syllabus guidelines.",
    "It's about five pages long, I think.",
    'No, I handed mine in twice.',
  ], 1, 'Es una pregunta de sí/no sobre el formato; la respuesta adecuada confirma y da la fuente: "it\'s in the syllabus guidelines". "Spaced out" (distraerse) es una trampa de sonido, y la extensión del ensayo responde a otra pregunta.'),
  cr('f14-ls-cr-board-games', 'easy', 'male', "We're having a board-game night in the common room on Friday. Want to come?", [
    'The board meeting was on Friday.',
    'The common room is on the first floor.',
    'I came last Friday at eight.',
    'Sounds fun! What time does it start?',
  ], 3, 'Ante una invitación ("Want to come?"), lo natural es aceptarla o rechazarla. "Sounds fun! What time does it start?" acepta y pide un detalle. "I came last Friday" está en pasado y no responde a la invitación.', 'daily-life'),
  cr('f14-ls-cr-shared-spreadsheet', 'easy', 'female', "Why don't we put all our lab measurements in a shared spreadsheet?", [
    'Good idea. Then we can all edit it.',
    'Because we measured them twice.',
    'The spreadsheet already has three tabs.',
    'I shared my lunch with her today.',
  ], 0, '"Why don\'t we…?" es una sugerencia, no una pregunta sobre causas. Por eso "Good idea. Then we can all edit it" es la reacción adecuada; "Because we measured them twice" interpreta mal la función y responde como si preguntaran "por qué".'),
  cr('f14-ls-cr-party-noise', 'easy', 'female', "I'm so sorry about all the noise from my party last night.", [
    "Yes, the party starts at nine o'clock tonight.",
    "No, I didn't make any noise at all.",
    "Don't worry about it. It wasn't that bad.",
    'It was a really noisy part of town.',
  ], 2, 'Ante una disculpa se suele quitar importancia: "Don\'t worry about it. It wasn\'t that bad." "I didn\'t make any noise" confunde quién hizo el ruido, y "noisy part of town" solo imita el sonido de "party".', 'daily-life'),
  cr('f14-ls-cr-elective', 'easy', 'male', 'Which elective would you recommend for first-year students?', [
    'I elected a new class president.',
    "Yes, I'd definitely recommend it to them.",
    "Intro to Film. The workload's light.",
    'I was a first-year student once.',
  ], 2, 'Piden una recomendación concreta ("Which elective…?"); solo "Intro to Film" nombra una asignatura y da un motivo. "Yes, I\'d definitely recommend it to them" contesta como si fuera una pregunta de sí/no.'),
  cr('f14-ls-cr-new-kitten', 'easy', 'female', 'Guess what? I just adopted a kitten from the animal shelter!', [
    "That's great! What's its name?",
    "I'll adopt the new policy soon.",
    'The shelter closes on Sundays.',
    "No, I can't guess anything.",
  ], 0, 'Es una noticia alegre: lo natural es reaccionar con entusiasmo e interés ("That\'s great! What\'s its name?"). "Guess what?" no es una petición literal de adivinar, por eso "No, I can\'t guess anything" es incorrecta.', 'daily-life'),

  // ---------- Listen and Choose a Response: medium ----------
  cr('f14-ls-cr-online-calendar', 'medium', 'male', 'Maybe we should use a shared online calendar to schedule our group meetings.', [
    'I scheduled it for the online course last term.',
    'Our group has four members this term.',
    "The wall calendar in our room is from last year.",
    'Sure. Then we can see when people are free.',
  ], 3, 'Es una sugerencia ("Maybe we should…"); la respuesta adecuada la acepta y explica la ventaja: "Then we can see when people are free". Las demás repiten palabras ("online", "group", "calendar") sin reaccionar a la propuesta.'),
  cr('f14-ls-cr-which-saturday', 'medium', 'female', 'Wait, when you said Saturday, did you mean this Saturday or next Saturday?', [
    'Yes, I meant exactly what I said.',
    "Next one. I'm away this weekend.",
    'I said it on Saturday morning.',
    'Saturdays are usually quiet.',
  ], 1, 'Es una pregunta de alternativa ("this Saturday or next Saturday?"), así que hay que elegir una opción: "Next one. I\'m away this weekend." "Yes, I meant exactly what I said" responde como si fuera una pregunta de sí/no.'),
  cr('f14-ls-cr-exam-curve', 'medium', 'male', 'I bet Professor Lyons will curve the exam grades. Almost everyone struggled with it.', [
    'I hope so. That last part was tough.',
    'I bet five dollars on the game last night.',
    'The road curves near the stadium.',
    'Everyone in the class has an exam.',
  ], 0, 'Es una predicción ("I bet… will curve the grades"); lo natural es reaccionar a ella: "I hope so. That last part was tough." "I bet five dollars" y "The road curves" son trampas de sonido con "bet" y "curve".'),
  cr('f14-ls-cr-admissions-test', 'medium', 'female', 'How should I start preparing for the graduate admissions test?', [
    'I started graduate school last fall.',
    'The test takes about four hours to finish.',
    'Try a practice test to find weak spots.',
    'I should have prepared dinner earlier.',
  ], 2, 'Pide un consejo ("How should I start preparing…?"); la respuesta adecuada da uno: "Try a practice test to find weak spots." La duración del examen responde a otra pregunta.'),
  cr('f14-ls-cr-image-credits', 'medium', 'male', "Don't forget to credit the sources of the images on your slides.", [
    "I'll pay by credit card instead this time.",
    "Thanks. I'll add a caption to each one.",
    'I forgot my slides on the bus this morning.',
    'The images are very colorful.',
  ], 1, 'Es un recordatorio; lo natural es agradecerlo y decir qué se hará: "Thanks. I\'ll add a caption to each one." "Credit card" juega con otro significado de "credit".'),
  cr('f14-ls-cr-pool-reopens', 'medium', 'female', "The campus pool reopens next week, doesn't it?", [
    'Yes, I swam there almost every day last week.',
    'The pool is fifty meters long.',
    "No, I didn't reopen it.",
    "Yes, on Monday. The repairs are done.",
  ], 3, 'La pregunta coletilla ("doesn\'t it?") pide confirmar una información: "Yes, on Monday. The repairs are done." "I swam there almost every day last week" está en pasado y no confirma la reapertura; "I didn\'t reopen it" confunde el sujeto.'),

  // ---------- Listen and Choose a Response: hard ----------
  cr('f14-ls-cr-paragraph-support', 'hard', 'male', 'This paragraph is interesting, but it could use a bit more support.', [
    "Thanks, I'm glad you found it interesting.",
    'I can support you with your paragraph.',
    "Okay, I'll add data from the study we read.",
    "Yes, it's the longest one in the essay.",
  ], 2, 'El asistente hace una crítica suave: el párrafo necesita más pruebas ("more support"). La respuesta adecuada propone añadir evidencia: "I\'ll add data from the study we read". Quedarse solo con el elogio ("glad you found it interesting") ignora la crítica.'),
  cr('f14-ls-cr-recommendation-letters', 'hard', 'female', "I can't recall whether the scholarship application needs two recommendation letters.", [
    'It does. The website says two.',
    'You can recall it later if needed.',
    "I'd recommend applying for it.",
    'Yes, I wrote two letters home.',
  ], 0, 'Aunque no es una pregunta directa, la hablante pide la información de forma indirecta ("I can\'t recall whether…"). "It does. The website says two." se la da. "I\'d recommend applying" solo imita el sonido de "recommendation".'),
  cr('f14-ls-cr-add-video', 'hard', 'male', 'Sure, we can add the video, if we have any time left at the end.', [
    "Great, I'll make it the opening of our talk.",
    'The end of the video is the best.',
    'I had time left after the exam.',
    "Fair enough. Let's do the slides first.",
  ], 3, 'El compañero acepta a medias: el vídeo irá solo "if we have any time left at the end". La respuesta natural acepta esa prioridad: "Fair enough. Let\'s do the slides first." Convertir el vídeo en la apertura ("make it the opening of our talk") ignora su reticencia.'),
  cr('f14-ls-cr-late-text', 'hard', 'female', "You could have at least texted me that you'd be late.", [
    'Yes, I could text you later tonight.',
    "You're right. Sorry, my phone died.",
    'At least three people were late.',
    "I'll probably be late tomorrow too.",
  ], 1, '"You could have at least texted me…" expresa una queja implícita, no una posibilidad. La respuesta adecuada reconoce el error y se disculpa: "You\'re right. Sorry, my phone died." La opción "I could text you later tonight" interpreta "could" como una posibilidad futura y no responde a la queja.'),
  cr('f14-ls-cr-writing-center', 'hard', 'male', 'You know, the writing center does free consultations for essays like yours.', [
    "Good idea. I'll book a session there.",
    'Yes, I know where the writing center is.',
    'My essay is free to read online.',
    'I consulted the dictionary already.',
  ], 0, 'Con "You know, the writing center does free consultations…" el hablante sugiere indirectamente pedir ayuda. La respuesta adecuada acepta la sugerencia: "I\'ll book a session there." "I know where the writing center is" se queda en el sentido literal.'),
  cr('f14-ls-cr-cheap-textbooks', 'hard', 'female', "I didn't buy new books this term. My cousin sold me his old textbooks for half price.", [
    'Half of the textbooks are in the library.',
    'Why did he sell you only half of them?',
    'Smart. Maybe I should buy used ones too.',
    'I sold my car for a good price last year.',
  ], 2, 'La hablante insinúa que comprar libros usados ahorra dinero; la respuesta natural recoge la idea: "Maybe I should buy used ones too." "Why did he sell you only half of them?" malinterpreta "half price" (mitad de precio).'),

  // ---------- Listen to a Conversation ----------
  {
    id: 'f14-ls-cv-practice-problems',
    form: 14,
    section: 'listening',
    task: 'conversation',
    title: 'Extra Practice and New Office Hours',
    topic: 'campus-life',
    difficulty: 'easy',
    context: 'Listen to a conversation between a student and a teaching assistant.',
    script: [
      { speaker: 'Student', voice: 'male', text: "Hi, Maria. Do you have a minute? I'm in your Tuesday chemistry section." },
      { speaker: 'Teaching Assistant', voice: 'female', text: 'Sure. What can I help you with?' },
      { speaker: 'Student', voice: 'male', text: "I did all the homework problems for chapter five, but I still don't feel ready for the quiz. Are there any extra practice problems somewhere?" },
      { speaker: 'Teaching Assistant', voice: 'female', text: "Yes, actually. The textbook's website has a problem set for every chapter, with answers. There's also a folder of old quizzes on the course page, under Resources." },
      { speaker: 'Student', voice: 'male', text: "Old quizzes? That's perfect. I didn't even know that folder existed." },
      { speaker: 'Teaching Assistant', voice: 'female', text: "Not many people do. And if you get stuck, come to my office hours. But be careful: they've moved. I'm not in the chemistry building anymore." },
      { speaker: 'Student', voice: 'male', text: 'Oh, where are you now?' },
      { speaker: 'Teaching Assistant', voice: 'female', text: 'Room 214 in Hadley Hall, the building next to the library. The chemistry building is being renovated, so all the TAs were moved over there. Same times, though: Wednesdays from two to four.' },
      { speaker: 'Student', voice: 'male', text: "Hadley Hall, room 214, Wednesdays from two to four. Got it. I'll go through the old quizzes tonight and come by if I have questions." },
      { speaker: 'Teaching Assistant', voice: 'female', text: "Sounds like a good plan. Bring your work so we can see where you're getting stuck." },
    ],
    questions: [
      {
        id: 'f14-ls-cv-practice-problems-q1',
        kind: 'single',
        skill: 'purpose',
        prompt: 'Why does the student go to see the teaching assistant?',
        options: [
          'To ask about the date of the next quiz',
          'To complain about the renovation noise',
          'To find extra material to practice with',
          'To hand in his chapter five homework',
        ],
        answer: [2],
        explanation:
          'El estudiante pregunta: "Are there any extra practice problems somewhere?" porque no se siente preparado para el examen. Menciona el capítulo cinco, pero ya ha hecho los deberes; no viene a entregarlos.',
      },
      {
        id: 'f14-ls-cv-practice-problems-q2',
        kind: 'single',
        skill: 'detail',
        prompt: "Why did the teaching assistant's office hours move?",
        options: [
          'Her old building is being renovated.',
          'She wanted a room near the library.',
          'The times of her office hours changed.',
          'Too many students came to her office.',
        ],
        answer: [0],
        explanation:
          'La asistente explica: "The chemistry building is being renovated, so all the TAs were moved over there". Hadley Hall está junto a la biblioteca, pero ese no es el motivo, y el horario no cambia ("Same times, though").',
      },
      {
        id: 'f14-ls-cv-practice-problems-q3',
        kind: 'single',
        skill: 'inference',
        prompt: 'What will the student probably do first?',
        options: [
          'Go to Hadley Hall to meet the TA',
          'Buy a new copy of the textbook',
          'Ask the TA to email him the answers',
          'Work through the old quizzes online',
        ],
        answer: [3],
        explanation:
          'Dice: "I\'ll go through the old quizzes tonight and come by if I have questions". Solo irá a Hadley Hall después, y únicamente si tiene dudas.',
      },
    ],
  },
  {
    id: 'f14-ls-cv-autograder',
    form: 14,
    section: 'listening',
    task: 'conversation',
    title: 'Failing the Autograder Tests',
    topic: 'technology',
    difficulty: 'medium',
    context: 'Listen to a conversation between a student and a computer science teaching assistant.',
    script: [
      { speaker: 'Student', voice: 'female', text: 'Hi, Daniel. I got my grade for the sorting assignment, and the autograder says I failed four of the tests. But my program worked perfectly when I ran it.' },
      { speaker: 'Teaching Assistant', voice: 'male', text: "Let's take a look. Which inputs did you use when you tested it?" },
      { speaker: 'Student', voice: 'female', text: 'A few lists of random numbers, about ten or twenty values each. They all came out sorted.' },
      { speaker: 'Teaching Assistant', voice: 'male', text: "Okay, so that's the typical case. The autograder also checks edge cases, the unusual inputs at the boundaries. Look here: test seven gives your function an empty list." },
      { speaker: 'Student', voice: 'female', text: 'An empty list? Why would anyone sort a list with nothing in it?' },
      { speaker: 'Teaching Assistant', voice: 'male', text: "In real programs, it happens all the time. The data might not have arrived yet, or a search might return no results. Your code tries to read the first element, and since there isn't one, the program crashes." },
      { speaker: 'Student', voice: 'female', text: 'Oh, I see. What about the other failures?' },
      { speaker: 'Teaching Assistant', voice: 'male', text: 'One is a list with only one item, and two have repeated values. Your loop skips numbers that are equal to each other, so the duplicates just disappear from the output.' },
      { speaker: 'Student', voice: 'female', text: "That's frustrating. Is it too late to fix it?" },
      { speaker: 'Teaching Assistant', voice: 'male', text: 'No. You can resubmit once within five days of getting your grade. The highest score you can get on a resubmission is ninety percent, though, not a hundred.' },
      { speaker: 'Student', voice: 'female', text: "Well, ninety is a lot better than what I have now. I'll write my own tests for those cases before I resubmit." },
    ],
    questions: [
      {
        id: 'f14-ls-cv-autograder-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'What is the conversation mainly about?',
        options: [
          'How to choose the fastest sorting method',
          "Why the student's program failed some tests",
          'Why the autograder gave her the wrong grade',
          'How to ask the professor for an extension',
        ],
        answer: [1],
        explanation:
          'La estudiante cuenta que "the autograder says I failed four of the tests", y el asistente le explica las causas (los "edge cases"). No es que el corrector se equivoque: el programa realmente fallaba con esas entradas.',
      },
      {
        id: 'f14-ls-cv-autograder-q2',
        kind: 'single',
        skill: 'detail',
        prompt: "What happened to repeated values in the student's program?",
        options: [
          'They were sorted in reverse order.',
          'They caused the program to crash.',
          'They were moved to the end of the list.',
          'They were left out of the output.',
        ],
        answer: [3],
        explanation:
          'El asistente dice: "Your loop skips numbers that are equal to each other, so the duplicates just disappear from the output". El bloqueo ("crashes") se produce con la lista vacía, no con los valores repetidos.',
      },
      {
        id: 'f14-ls-cv-autograder-q3',
        kind: 'single',
        skill: 'attitude',
        prompt: "What is the student's attitude toward the resubmission policy?",
        options: [
          'She accepts it despite the limit on the score.',
          'She thinks the ninety percent limit is unfair.',
          'She feels that five days is not enough time.',
          'She doubts that resubmitting is worth it.',
        ],
        answer: [0],
        explanation:
          'Su comentario "ninety is a lot better than what I have now" muestra que acepta el límite y piensa reenviar el trabajo ("before I resubmit"). No se queja del plazo ni del límite de nota.',
      },
    ],
  },
  {
    id: 'f14-ls-cv-gym-grades',
    form: 14,
    section: 'listening',
    task: 'conversation',
    title: 'Gym Visits and Grades',
    topic: 'economics',
    difficulty: 'hard',
    context: 'Listen to a conversation between a student and an economics professor.',
    script: [
      { speaker: 'Student', voice: 'male', text: 'Professor Ellis, for my project I used the campus data on gym check-ins and GPAs. Students who go to the gym three or more times a week have noticeably higher grades. So I was going to argue that the university should require exercise.' },
      { speaker: 'Professor', voice: 'female', text: "It's an interesting pattern. But before you make that recommendation, ask yourself: does your data show that exercise causes higher grades?" },
      { speaker: 'Student', voice: 'male', text: 'Well, the two clearly go together. The correlation is pretty strong.' },
      { speaker: 'Professor', voice: 'female', text: 'Going together is exactly what correlation means. Causation is a stronger claim: that changing one thing would change the other. Can you think of anything else that might explain the pattern?' },
      { speaker: 'Student', voice: 'male', text: 'Hmm, maybe students with good grades just have more free time to go to the gym?' },
      { speaker: 'Professor', voice: 'female', text: "That's one possibility. The causation might run the other way. Here's another: what about students who work part-time jobs?" },
      { speaker: 'Student', voice: 'male', text: "Oh. They'd have less time for both the gym and studying. So having a job could lower both numbers at once." },
      { speaker: 'Professor', voice: 'female', text: "Exactly. That's what we call a confounding variable, a third factor that influences both of the things you're measuring. Self-discipline could be another one." },
      { speaker: 'Student', voice: 'male', text: 'So my whole project is useless?' },
      { speaker: 'Professor', voice: 'female', text: 'Not at all. The correlation is real, and it is worth reporting. You just need to be careful about the conclusion. If your data include work hours, you can compare students with similar schedules and see whether the gap remains.' },
      { speaker: 'Student', voice: 'male', text: "We do have that. There's a column for employment. I'll redo the analysis that way." },
      { speaker: 'Professor', voice: 'female', text: 'Good. And in your conclusion, describe what you found as an association, not as proof. That alone will make your argument much stronger.' },
    ],
    questions: [
      {
        id: 'f14-ls-cv-gym-grades-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'What is the main topic of the conversation?',
        options: [
          'Whether the university should build a new gym',
          "How to collect data on students' gym visits",
          "Why part-time jobs lower students' grades",
          'Why a pattern in data may not prove a cause',
        ],
        answer: [3],
        explanation:
          'La profesora pregunta "does your data show that exercise causes higher grades?" y explica la diferencia entre correlación y causalidad. Los trabajos a tiempo parcial son solo un ejemplo de variable de confusión, no el tema central.',
      },
      {
        id: 'f14-ls-cv-gym-grades-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'According to the professor, what is a confounding variable?',
        options: [
          'A cause that runs in the opposite direction',
          'A factor that affects both things measured',
          'A mistake made while collecting the data',
          'A pattern that appears only in small groups',
        ],
        answer: [1],
        explanation:
          'La profesora la define como "a third factor that influences both of the things you\'re measuring". La causalidad inversa ("The causation might run the other way") es otra explicación distinta que también menciona.',
      },
      {
        id: 'f14-ls-cv-gym-grades-q3',
        kind: 'single',
        skill: 'function',
        prompt: 'Why does the professor mention students who work part-time jobs?',
        options: [
          'To suggest that the student should study less',
          'To show that the gym data are not accurate',
          'To give an example of a hidden third factor',
          'To argue that exercise is harmful to grades',
        ],
        answer: [2],
        explanation:
          'Con esa pregunta lleva al estudiante a ver que un trabajo "could lower both numbers at once"; justo después lo llama "a confounding variable". No dice que los datos sean incorrectos: "The correlation is real".',
      },
    ],
  },

  // ---------- Listen to an Announcement ----------
  {
    id: 'f14-ls-an-senior-exhibition',
    form: 14,
    section: 'listening',
    task: 'announcement',
    title: 'Senior Thesis Exhibition Reception',
    topic: 'art',
    difficulty: 'easy',
    context: 'Listen to an announcement on a university campus.',
    script: [
      {
        speaker: 'Announcer',
        voice: 'female',
        text: "Good afternoon, everyone. The Department of Art and Design invites the whole campus to the opening reception of this year's Senior Thesis Exhibition. The reception will take place this Friday from six to eight p.m. at the Linden Gallery, on the ground floor of the Fine Arts Building. The show features paintings, photography, sculpture, and digital work by twenty-two graduating art majors, and many of the artists will be there to talk about their pieces. Admission is free, and light refreshments will be served. If you can't make it on Friday, don't worry: the exhibition stays open until April twenty-sixth, Tuesday through Saturday, from ten a.m. to five p.m. Please note that photography is allowed in the gallery, but flash is not.",
      },
    ],
    questions: [
      {
        id: 'f14-ls-an-senior-exhibition-q1',
        kind: 'single',
        skill: 'purpose',
        prompt: 'What is the main purpose of the announcement?',
        options: [
          'To invite people to the opening of a student art show',
          'To ask art majors to submit work for an exhibition',
          'To announce new opening hours for the campus gallery',
          'To advertise a photography class for beginners',
        ],
        answer: [0],
        explanation:
          'El departamento "invites the whole campus to the opening reception of this year\'s Senior Thesis Exhibition". El horario de la galería se menciona solo como información adicional, no es el propósito.',
      },
      {
        id: 'f14-ls-an-senior-exhibition-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'What will visitors be able to do at the reception?',
        options: [
          'Buy artwork directly from the students',
          'Take part in a digital art workshop',
          'Vote for the best piece in the show',
          'Talk with some of the student artists',
        ],
        answer: [3],
        explanation:
          'Se dice que "many of the artists will be there to talk about their pieces". Hay obras digitales, pero no se menciona ningún taller ni la venta de obras.',
      },
      {
        id: 'f14-ls-an-senior-exhibition-q3',
        kind: 'single',
        skill: 'inference',
        prompt: 'What is implied about people who cannot attend on Friday?',
        options: [
          'They can watch the reception online.',
          'They can still see the exhibition later.',
          'They must make a reservation in advance.',
          'They need permission from the department.',
        ],
        answer: [1],
        explanation:
          '"If you can\'t make it on Friday, don\'t worry: the exhibition stays open until April twenty-sixth". Nada indica que haya retransmisión en línea ni que haga falta reservar.',
      },
    ],
  },
  {
    id: 'f14-ls-an-volcano-lecture',
    form: 14,
    section: 'listening',
    task: 'announcement',
    title: 'Volcanologist Lecture Moved',
    topic: 'geology',
    difficulty: 'medium',
    context: 'Listen to an announcement from an academic department.',
    script: [
      {
        speaker: 'Announcer',
        voice: 'male',
        text: "Attention, please. This is an update from the Department of Earth Sciences about Thursday's guest lecture by Dr. Helena Strand, a volcanologist who studies eruptions in Iceland and Chile. Because so many people have expressed interest, the talk has been moved from Room 105 in the Science Center to the Morrison Auditorium, which seats four hundred. The time hasn't changed: it still begins at seven p.m.",
      },
      {
        speaker: 'Announcer',
        voice: 'male',
        text: "However, there's one new requirement. Everyone who plans to attend must now register online through the department website. Registration is free, but you'll need to show your confirmation email at the door. Earth Sciences majors will have priority seating until six forty-five; after that, any open seats will go to other registered guests. Registration closes Wednesday at midnight.",
      },
    ],
    questions: [
      {
        id: 'f14-ls-an-volcano-lecture-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'What is the announcement mainly about?',
        options: [
          "A volcanologist's research in Iceland and Chile",
          'A new course in the earth sciences department',
          'Changes in where and how to attend a talk',
          "The cancellation of Thursday's guest lecture",
        ],
        answer: [2],
        explanation:
          'El anuncio informa de que la charla "has been moved… to the Morrison Auditorium" y de un nuevo requisito: "must now register online". La investigación de la ponente solo se menciona para presentarla.',
      },
      {
        id: 'f14-ls-an-volcano-lecture-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'Why was the lecture moved to a different room?',
        options: [
          'Room 105 is being repaired this week.',
          'More people want to attend than expected.',
          'The speaker requested a larger lecture hall.',
          'The time of the lecture has changed.',
        ],
        answer: [1],
        explanation:
          'El motivo es "Because so many people have expressed interest". La hora no cambia ("The time hasn\'t changed"), y no se menciona ninguna reparación.',
      },
      {
        id: 'f14-ls-an-volcano-lecture-q3',
        kind: 'single',
        skill: 'inference',
        prompt: 'What is implied about registered guests who are not Earth Sciences majors?',
        options: [
          'They are not allowed to register online.',
          'They must pay a small fee at the door.',
          'They may enter only after the talk begins.',
          'They may have to wait until 6:45 for a seat.',
        ],
        answer: [3],
        explanation:
          'Los estudiantes de la especialidad tienen prioridad "until six forty-five; after that, any open seats will go to other registered guests". Por eso los demás quizá tengan que esperar hasta las 6:45, no hasta que empiece la charla (a las 7:00). La inscripción es gratuita ("Registration is free").',
      },
    ],
  },
  {
    id: 'f14-ls-an-heat-advisory',
    form: 14,
    section: 'listening',
    task: 'announcement',
    title: 'Heat Advisory Practice Schedule',
    topic: 'campus-life',
    difficulty: 'hard',
    context: 'Listen to an announcement from the university athletics department.',
    script: [
      {
        speaker: 'Announcer',
        voice: 'male',
        text: 'Attention, all student athletes and coaches. Because the National Weather Service has issued a heat advisory through Sunday, the Athletics Department is changing outdoor practice schedules. Starting tomorrow, all outdoor practices must end by ten a.m. Afternoon sessions are canceled, although teams may still use the indoor training center, which is air-conditioned. During every outdoor practice, coaches must stop for a water break at least every twenty minutes, and athletes may not skip these breaks.',
      },
      {
        speaker: 'Announcer',
        voice: 'male',
        text: 'Please also learn the warning signs of heat exhaustion: heavy sweating, dizziness, headache, nausea, and cold, clammy skin. If a teammate shows any of these signs, move them to a cool or shaded area right away, give them water, and alert a coach or athletic trainer. If someone becomes confused or faints, call 911 immediately, because this may be heat stroke, which is a medical emergency.',
      },
    ],
    questions: [
      {
        id: 'f14-ls-an-heat-advisory-q1',
        kind: 'single',
        skill: 'purpose',
        prompt: 'What is the main purpose of the announcement?',
        options: [
          'To cancel all athletic events until Sunday',
          'To explain safety changes during hot weather',
          'To introduce the new indoor training center',
          'To recruit volunteers for the medical staff',
        ],
        answer: [1],
        explanation:
          'Por la "heat advisory", el departamento cambia horarios, impone pausas para beber agua y explica los síntomas del agotamiento por calor. No se cancelan todas las actividades: las prácticas matinales y las de interior continúan.',
      },
      {
        id: 'f14-ls-an-heat-advisory-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'What are coaches required to do during outdoor practices?',
        options: [
          'Stop for water breaks at least every twenty minutes',
          'End every session before eight in the morning',
          'Move their teams to the indoor center at noon',
          "Check each athlete's temperature before training",
        ],
        answer: [0],
        explanation:
          '"Coaches must stop for a water break at least every twenty minutes". Las prácticas deben terminar a las diez ("must end by ten a.m."), no a las ocho.',
      },
      {
        id: 'f14-ls-an-heat-advisory-q3',
        kind: 'single',
        skill: 'inference',
        prompt: 'What can be inferred about a team that wants to train in the afternoon?',
        options: [
          'It needs permission from the weather service.',
          'It can train outside if a trainer is present.',
          'It will be allowed to skip the water breaks.',
          'It will have to hold its practice indoors.',
        ],
        answer: [3],
        explanation:
          'Las sesiones de tarde al aire libre se cancelan ("Afternoon sessions are canceled"), pero "teams may still use the indoor training center". Por tanto, por la tarde solo se puede entrenar dentro. Las pausas para beber agua no pueden saltarse.',
      },
    ],
  },

  // ---------- Listen to an Academic Talk ----------
  {
    id: 'f14-ls-at-cane-toads',
    form: 14,
    section: 'listening',
    task: 'academic-talk',
    title: 'The Cane Toad Invasion',
    topic: 'environment',
    difficulty: 'easy',
    context: 'Listen to part of a lecture in an environmental science class.',
    script: [
      { speaker: 'Professor', voice: 'female', text: "Today's topic is a classic example of how trying to solve one environmental problem can create a much bigger one. In the early twentieth century, sugar-cane farmers in Queensland, in northeastern Australia, were losing crops to beetles whose larvae ate the roots of the cane. So in 1935, about a hundred cane toads were brought over from Hawaii, bred, and thousands of young toads were released into the fields. The idea was simple: the toads would eat the beetles." },
      { speaker: 'Professor', voice: 'female', text: "It didn't work. The adult beetles spent much of their time high up on the cane stalks, out of reach of a toad on the ground, and the larvae lived underground. So the toads simply ate other things, almost anything they could fit in their mouths." },
      { speaker: 'Professor', voice: 'female', text: "Meanwhile, the toads thrived. A single female can lay tens of thousands of eggs at a time, and in Australia the toads had few natural enemies. Why? Because cane toads are poisonous. They carry toxins in glands behind their heads, and Australia's native predators had never met an animal like that. Snakes, large lizards, and small marsupials such as quolls that tried to eat a toad often died. In some areas, populations of these predators dropped sharply after the toads arrived." },
      { speaker: 'Professor', voice: 'female', text: 'Today, cane toads have spread thousands of kilometers across northern Australia, and there may be more than two hundred million of them. Researchers are now testing ways to protect native wildlife. For instance, they feed predators small pieces of toad that make them sick but do not kill them, so the animals learn to avoid toads in the wild.' },
      { speaker: 'Professor', voice: 'female', text: 'So the lesson here is that before you introduce a species to control a pest, you need to understand how both animals actually behave in their environment.' },
    ],
    questions: [
      {
        id: 'f14-ls-at-cane-toads-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'What is the lecture mainly about?',
        options: [
          'How sugar-cane farming spread across Australia',
          'Why cane toads are dangerous to humans',
          'How scientists bred toads in Hawaii',
          'How an introduced species became a pest',
        ],
        answer: [3],
        explanation:
          'La profesora lo presenta como un ejemplo de cómo resolver un problema ambiental "can create a much bigger one": el sapo de caña, introducido contra un escarabajo, se convirtió en plaga. No se habla de peligro para los humanos.',
      },
      {
        id: 'f14-ls-at-cane-toads-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'Why did the toads fail to control the beetles?',
        options: [
          'The beetles were poisonous to the toads.',
          "Most beetles were out of the toads' reach.",
          'The toads were released in the wrong season.',
          'The toads would eat only the beetle larvae.',
        ],
        answer: [1],
        explanation:
          'Los escarabajos adultos estaban "high up on the cane stalks, out of reach of a toad on the ground", y las larvas vivían bajo tierra. Los venenosos son los sapos, no los escarabajos.',
      },
      {
        id: 'f14-ls-at-cane-toads-q3',
        kind: 'single',
        skill: 'function',
        prompt: 'Why does the professor mention quolls?',
        options: [
          'To name an animal that eats cane beetles',
          'To show that some animals resist toxins',
          'To show a predator harmed by the toads',
          'To explain how the toads reached Australia',
        ],
        answer: [2],
        explanation:
          'Los "quolls" aparecen entre los depredadores que "tried to eat a toad often died". Es un ejemplo del daño que causa el veneno del sapo, no de resistencia a las toxinas.',
      },
      {
        id: 'f14-ls-at-cane-toads-q4',
        kind: 'single',
        skill: 'inference',
        prompt: "What can be inferred about the researchers' training method?",
        options: [
          'It relies on predators learning from a bad experience.',
          'It is designed to kill toads before they can breed.',
          'It has already removed toads from most areas.',
          'It uses beetles to make the toads sick.',
        ],
        answer: [0],
        explanation:
          'Los depredadores comen trozos que "make them sick but do not kill them, so the animals learn to avoid toads": aprenden de una mala experiencia. El método protege a la fauna nativa; no busca matar a los sapos.',
      },
    ],
  },
  {
    id: 'f14-ls-at-hanseatic-league',
    form: 14,
    section: 'listening',
    task: 'academic-talk',
    title: 'The Hanseatic League',
    topic: 'history',
    difficulty: 'medium',
    context: 'Listen to part of a lecture in a European history class.',
    script: [
      { speaker: 'Professor', voice: 'male', text: "Last time we talked about the growth of medieval towns. Today I want to look at how some of those towns cooperated on a remarkable scale: the Hanseatic League. Starting in the twelfth and thirteenth centuries, merchants from towns in northern Germany formed associations to protect themselves while trading abroad. Over time, these groups grew into a league of towns, led by Lübeck on the Baltic coast, that at its height included around two hundred communities." },
      { speaker: 'Professor', voice: 'male', text: 'Why cooperate? Because medieval trade was dangerous. Pirates attacked ships, and local rulers could seize goods or charge heavy tolls. By acting together, Hanseatic merchants could negotiate privileges in foreign ports, such as lower taxes and legal protection. They set up major trading posts in London, Bruges, Bergen in Norway, and Novgorod in Russia.' },
      { speaker: 'Professor', voice: 'male', text: 'And what did they trade? Think of it as linking east and west. From the east came furs, wax, timber, and grain. From the west came cloth, especially from Flanders and England. And then there was fish. Salted herring was a staple food, and salt from the German town of Lüneburg kept it from spoiling.' },
      { speaker: 'Student', voice: 'female', text: 'Did the League have its own army, like a country?' },
      { speaker: 'Professor', voice: 'male', text: "Good question. The answer is no, not really. The League never became a state. It had no permanent army or navy, and its assembly met only irregularly. Its most powerful weapon was economic: a trade boycott. If a ruler mistreated Hanseatic merchants, the League could simply cut off all trade with that territory. Still, when Denmark threatened their interests, the towns did go to war together, and in 1370 they forced the Danish king to accept a treaty that confirmed their privileges." },
      { speaker: 'Professor', voice: 'male', text: 'By the sixteenth century, though, the League was declining. Strong national monarchies were less willing to grant privileges to foreign merchants, Dutch traders became serious rivals, and Atlantic trade routes grew in importance. Even so, Hamburg and Lübeck still officially call themselves Hanseatic cities.' },
    ],
    questions: [
      {
        id: 'f14-ls-at-hanseatic-league-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'What is the lecture mainly about?',
        options: [
          'Why medieval towns in Germany grew so quickly',
          'How Denmark controlled trade in the Baltic Sea',
          'How an alliance of merchant towns ran trade',
          'Why fish became a staple food in Europe',
        ],
        answer: [2],
        explanation:
          'El profesor explica qué fue la Liga Hanseática, por qué cooperaban sus ciudades, qué comerciaban y por qué decayó. Dinamarca aparece solo como un rival al que la Liga venció en 1370.',
      },
      {
        id: 'f14-ls-at-hanseatic-league-q2',
        kind: 'single',
        skill: 'detail',
        prompt: "According to the professor, what was the League's most powerful weapon?",
        options: [
          'Cutting off all trade with an opponent',
          'A permanent navy based in Lübeck',
          'Taxes charged on ships in foreign ports',
          'Its control over salt from Lüneburg',
        ],
        answer: [0],
        explanation:
          '"Its most powerful weapon was economic: a trade boycott." El profesor aclara que la Liga "had no permanent army or navy".',
      },
      {
        id: 'f14-ls-at-hanseatic-league-q3',
        kind: 'single',
        skill: 'function',
        prompt: 'Why does the professor mention salt from Lüneburg?',
        options: [
          'To explain why the League fought Denmark',
          'To name a product that came from the east',
          'To show where the League held its meetings',
          'To explain how herring was kept from spoiling',
        ],
        answer: [3],
        explanation:
          'Dice que el arenque salado era un alimento básico y que "salt from the German town of Lüneburg kept it from spoiling". Los productos del este que menciona son pieles, cera, madera y grano, no la sal.',
      },
      {
        id: 'f14-ls-at-hanseatic-league-q4',
        kind: 'single',
        skill: 'inference',
        prompt: 'What can be inferred about the decline of the League?',
        options: [
          'It was caused mainly by the war with Denmark.',
          'It was linked to the rise of stronger states.',
          'It began when Hamburg left the organization.',
          'It happened after its trading posts burned.',
        ],
        answer: [1],
        explanation:
          'Entre las causas, el profesor cita que "Strong national monarchies were less willing to grant privileges to foreign merchants". La guerra con Dinamarca fue, al contrario, una victoria de la Liga.',
      },
    ],
  },
  {
    id: 'f14-ls-at-market-for-lemons',
    form: 14,
    section: 'listening',
    task: 'academic-talk',
    title: 'The Market for Lemons',
    topic: 'economics',
    difficulty: 'hard',
    context: 'Listen to part of a lecture in an economics class.',
    script: [
      { speaker: 'Professor', voice: 'female', text: "In 1970, the economist George Akerlof published a short paper with an unusual title: The Market for Lemons. In American slang, a lemon is a car that turns out to be defective. Akerlof used the used-car market to illustrate a problem economists call asymmetric information, a situation in which one side of a transaction knows much more than the other." },
      { speaker: 'Professor', voice: 'female', text: "Think about it. The seller of a used car has driven it for years, so she knows whether it's reliable or whether it breaks down every winter. The buyer can look at it and take a short test drive, but he can't really tell. So what does a rational buyer do? Since he can't distinguish good cars from lemons, he'll only pay a price that reflects the average quality of the cars on the market." },
      { speaker: 'Professor', voice: 'female', text: "Now here's where it gets interesting. Suppose you own a car in excellent condition. That average price is lower than what your car is really worth, so you keep it, or you sell it to a friend who trusts you. Owners of good cars leave the market. But then the average quality of the cars for sale goes down, and buyers, expecting this, lower the price they're willing to pay even further. More good cars leave, and the cycle continues." },
      { speaker: 'Professor', voice: 'female', text: 'In the extreme case, Akerlof showed, the market could shrink until mostly lemons are left, or it could disappear entirely, even though there are buyers and sellers who would happily trade at a fair price. This process, in which low quality drives out high quality, is called adverse selection.' },
      { speaker: 'Professor', voice: 'female', text: "So how do real markets survive? Mostly by shrinking the information gap. Warranties are a good example. A seller who knows the car is reliable can afford to promise free repairs, because she doesn't expect to pay for many. The seller of a lemon can't make that promise without losing money. So a warranty works as a believable signal of quality. Dealer reputations and independent inspections do similar work. And the idea goes well beyond cars: the same logic applies to health insurance, lending, and even hiring." },
    ],
    questions: [
      {
        id: 'f14-ls-at-market-for-lemons-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'What is the lecture mainly about?',
        options: [
          'Why used cars lose value faster than new cars',
          'How unequal information can damage a market',
          'How Akerlof chose the title of his paper',
          'Why buyers should always test-drive cars',
        ],
        answer: [1],
        explanation:
          'La clase explica la "asymmetric information" con el ejemplo de los coches usados y cómo puede reducir o hacer desaparecer un mercado. El título del artículo y la prueba de conducción son solo detalles.',
      },
      {
        id: 'f14-ls-at-market-for-lemons-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'According to the professor, why do owners of good cars leave the market?',
        options: [
          'Dealers refuse to buy cars without warranties.',
          'They are afraid of being sold a lemon.',
          "The going price is below their cars' value.",
          'Buyers prefer to buy from private sellers.',
        ],
        answer: [2],
        explanation:
          'La profesora dice: "That average price is lower than what your car is really worth, so you keep it". El miedo a comprar un "lemon" es del comprador, no del vendedor.',
      },
      {
        id: 'f14-ls-at-market-for-lemons-q3',
        kind: 'single',
        skill: 'function',
        prompt: 'Why does the professor discuss warranties?',
        options: [
          'To show how sellers can signal good quality',
          'To explain why lemons are cheaper to repair',
          'To argue that warranties raise prices too much',
          'To give an example of adverse selection',
        ],
        answer: [0],
        explanation:
          'Las garantías ilustran cómo reducir la brecha de información: "a warranty works as a believable signal of quality". No son un ejemplo de selección adversa, sino una solución a ella.',
      },
      {
        id: 'f14-ls-at-market-for-lemons-q4',
        kind: 'single',
        skill: 'inference',
        prompt: 'What can be inferred about a used-car seller who refuses to offer any warranty?',
        options: [
          'The seller probably owns a car in perfect condition.',
          'The seller must have a strong reputation already.',
          'The seller expects buyers to pay a higher price.',
          'Buyers may suspect that the car is of poor quality.',
        ],
        answer: [3],
        explanation:
          'Si solo quien vende un buen coche "can afford to promise free repairs", y "The seller of a lemon can\'t make that promise", negarse a dar garantía hace sospechar que el coche es malo. Por eso la primera opción es justo lo contrario.',
      },
    ],
  },
];
