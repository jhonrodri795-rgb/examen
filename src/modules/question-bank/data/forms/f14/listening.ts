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
      { speaker: 'Teaching Assistant', voice: 'female', text: 'Room two-fourteen in Hadley Hall, the building next to the library. The chemistry building is being renovated, so all the TAs were moved over there. Same times, though: Wednesdays from two to four.' },
      { speaker: 'Student', voice: 'male', text: "Hadley Hall, room two-fourteen, Wednesdays from two to four. Got it. I'll go through the old quizzes tonight and come by if I have questions." },
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
        text: "Attention, please. This is an update from the Department of Earth Sciences about Thursday's guest lecture by Doctor Helena Strand, a volcanologist who studies eruptions in Iceland and Chile. Because so many people have expressed interest, the talk has been moved from Room one-oh-five in the Science Center to the Morrison Auditorium, which seats four hundred. The time hasn't changed: it still begins at seven p.m.",
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
        text: 'Please also learn the warning signs of heat exhaustion: heavy sweating, dizziness, headache, nausea, and cold, clammy skin. If a teammate shows any of these signs, move them to a cool or shaded area right away, give them water, and alert a coach or athletic trainer. If someone becomes confused or faints, call nine-one-one immediately, because this may be heat stroke, which is a medical emergency.',
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
    id: 'f14-ls-at-vertical-farming',
    form: 14,
    section: 'listening',
    task: 'academic-talk',
    title: 'Growing Crops in Stacked Layers',
    topic: 'environment',
    difficulty: 'easy',
    context: 'Listen to part of a lecture in an environmental science class.',
    script: [
      { speaker: 'Professor', voice: 'female', text: "Today let's look at a kind of farm you might find inside an old warehouse in a city. It's called vertical farming. Instead of planting crops in one flat field, growers stack them in layers, shelf on top of shelf, inside a building. There's no sunlight. The plants grow under rows of energy-saving lamps called light-emitting diodes." },
      { speaker: 'Professor', voice: 'female', text: "Most vertical farms don't use soil, either. The roots sit in water with nutrients mixed in. And this is where vertical farms really shine: water. Because the room is closed, the water that the roots don't take up is collected and pumped back to the plants again. Very little is lost. Some growers say they use up to ninety percent less water than a field growing the same lettuce." },
      { speaker: 'Professor', voice: 'female', text: "So what's the catch? Energy. Outdoors, sunlight is free. Indoors, every bit of light has to be paid for with electricity, and so do the heating, the cooling, and the fans. Electricity is usually a vertical farm's biggest cost. And if that electricity comes from burning coal or gas, a farm that saves water may still add to air pollution." },
      { speaker: 'Professor', voice: 'female', text: "That's why these farms mostly grow lettuce, herbs, and other leafy greens. They grow fast and sell for a good price. What about wheat? Wheat needs a lot of light over several months to make a small amount of grain, and grain is cheap. Paying for all that light with electricity would make indoor wheat far too expensive." },
      { speaker: 'Professor', voice: 'female', text: 'So, is this the future of farming? For fresh greens near big cities, especially in dry places, it can make a lot of sense. But for the grains that feed most of the world, the open field and the sun are still hard to beat.' },
    ],
    questions: [
      {
        id: 'f14-ls-at-vertical-farming-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'What is the lecture mainly about?',
        options: [
          'Why cities are running out of land to grow food',
          'How lamps that help plants grow were invented',
          'Why leafy greens sell for more than grain crops',
          'The benefits and limits of farming indoors',
        ],
        answer: [3],
        explanation:
          'La profesora describe las granjas verticales ("growers stack them in layers") y compara su gran ventaja, el agua ("this is where vertical farms really shine: water"), con su principal problema ("So what\'s the catch? Energy"). No habla de la falta de tierra en las ciudades ni de la invención de las lámparas.',
      },
      {
        id: 'f14-ls-at-vertical-farming-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'According to the professor, why do vertical farms use so little water?',
        options: [
          'The plants grow in a special soil that holds water.',
          'Water the roots do not use is collected and reused.',
          'The lamps keep the air in the building cool and damp.',
          'Leafy greens need almost no water at all to grow.',
        ],
        answer: [1],
        explanation:
          'La profesora explica que "the water that the roots don\'t take up is collected and pumped back to the plants again. Very little is lost." Además, la mayoría de estas granjas no usa tierra ("Most vertical farms don\'t use soil").',
      },
      {
        id: 'f14-ls-at-vertical-farming-q3',
        kind: 'single',
        skill: 'function',
        prompt: 'Why does the professor mention wheat?',
        options: [
          'To name a crop that grows quickly under the lamps',
          'To show that grain crops need the most water',
          'To show a crop that is too costly to grow indoors',
          'To compare the price of bread with that of lettuce',
        ],
        answer: [2],
        explanation:
          'El trigo necesita "a lot of light over several months" y el grano es barato, así que pagar esa luz con electricidad "would make indoor wheat far too expensive". Es un ejemplo de cultivo que no compensa producir en interior; los que crecen rápido son las verduras de hoja.',
      },
      {
        id: 'f14-ls-at-vertical-farming-q4',
        kind: 'single',
        skill: 'inference',
        prompt: "What can be inferred about the professor's view of vertical farming?",
        options: [
          'It suits some crops but cannot replace all farming.',
          'It will soon replace most of the farms in open fields.',
          'It costs too much to be worth any more research.',
          'It actually uses more water than field farming does.',
        ],
        answer: [0],
        explanation:
          'Para las verduras frescas cerca de las ciudades "it can make a lot of sense", pero para los cereales "the open field and the sun are still hard to beat". Por tanto, la profesora la ve útil para algunos cultivos, no como sustituto de toda la agricultura.',
      },
    ],
  },
  {
    id: 'f14-ls-at-timbuktu-scholarship',
    form: 14,
    section: 'listening',
    task: 'academic-talk',
    title: "Timbuktu's Scholars and Manuscripts",
    topic: 'history',
    difficulty: 'medium',
    context: 'Listen to part of a lecture in an African history class.',
    script: [
      { speaker: 'Professor', voice: 'male', text: "Today let's visit one of the most famous stops of the Saharan camel caravans: Timbuktu, in what is now Mali. It probably began, around the twelfth century, as a seasonal camp near the Niger River, at the edge of the desert. Caravans from the north brought slabs of salt from desert mines, while traders on the Niger brought gold from the south, and Timbuktu became the place where the two were exchanged." },
      { speaker: 'Professor', voice: 'male', text: 'In the fourteenth century, the city became part of the Mali Empire. Its most famous ruler, Mansa Musa, made a pilgrimage to Mecca and, according to Arab writers of the time, gave away so much gold in Cairo that its value there fell for years. After his return, he is said to have ordered a great mosque built in Timbuktu. And mosques here were not only for prayer. They became places of study.' },
      { speaker: 'Professor', voice: 'male', text: 'Later, especially under the Songhai Empire, Timbuktu drew scholars from across North and West Africa. They taught Islamic law and theology, but also grammar, mathematics, astronomy, and medicine. One mosque, Sankore, became especially famous for learning. All that teaching needed books. Paper was carried across the desert, and local copyists produced manuscripts by hand. An early sixteenth-century visitor, known in Europe as Leo Africanus, wrote that handwritten books from North Africa were sold there for more money than any other merchandise.' },
      { speaker: 'Student', voice: 'female', text: 'So was Sankore basically a university?' },
      { speaker: 'Professor', voice: 'male', text: "People often call it that, but it worked differently. There was no central administration and no fixed program leading to a degree. Individual scholars taught small groups of students in mosques and in their own homes, and a student collected a certificate from each teacher listing the texts he had mastered." },
      { speaker: 'Professor', voice: 'male', text: "This golden age ended suddenly. In fifteen ninety-one, an army from Morocco defeated the Songhai, and a few years later many of the city's leading scholars were arrested and sent into exile in Marrakesh. Yet the habit of collecting books survived. Families kept manuscripts in private libraries for generations, and today tens of thousands of them, by some estimates far more, are being preserved and studied." },
    ],
    questions: [
      {
        id: 'f14-ls-at-timbuktu-scholarship-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'What is the lecture mainly about?',
        options: [
          'How the Mali Empire expanded across West Africa',
          'Why camel caravans carried salt across the Sahara',
          'How a trading city became a center of learning',
          'Why Mansa Musa made a pilgrimage to Mecca',
        ],
        answer: [2],
        explanation:
          'El profesor explica que Timbuktu nació como lugar de intercambio de sal y oro y que después sus mezquitas "became places of study", con eruditos, libros y manuscritos. Las caravanas y la peregrinación de Mansa Musa son solo partes de la historia.',
      },
      {
        id: 'f14-ls-at-timbuktu-scholarship-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'According to the professor, how was teaching organized in Timbuktu?',
        options: [
          'Scholars taught small groups in mosques and homes.',
          'Students followed one fixed program to earn a degree.',
          'Teachers were appointed and paid by the Mali rulers.',
          'Classes were held mainly in the city marketplace.',
        ],
        answer: [0],
        explanation:
          'El profesor dice: "Individual scholars taught small groups of students in mosques and in their own homes". También aclara que no había "fixed program leading to a degree".',
      },
      {
        id: 'f14-ls-at-timbuktu-scholarship-q3',
        kind: 'single',
        skill: 'function',
        prompt: 'Why does the professor mention Leo Africanus?',
        options: [
          'To describe the army that conquered the city',
          'To name a scholar who taught at the Sankore mosque',
          'To explain how paper was brought across the desert',
          'To show that books were a valuable trade good',
        ],
        answer: [3],
        explanation:
          'Leo Africanus escribió que los libros "were sold there for more money than any other merchandise". El profesor lo cita para mostrar lo valiosos que eran los libros como mercancía, no como maestro de Sankore.',
      },
      {
        id: 'f14-ls-at-timbuktu-scholarship-q4',
        kind: 'single',
        skill: 'inference',
        prompt: 'What can be inferred about Timbuktu after the Moroccan conquest?',
        options: [
          'It became the new capital of the Mali Empire.',
          'It lost much of its importance as a place of study.',
          'Its families stopped collecting and keeping books.',
          'It drew more scholars from North Africa than before.',
        ],
        answer: [1],
        explanation:
          'Tras la conquista, "This golden age ended suddenly" y "many of the city\'s leading scholars were arrested and sent into exile". Se deduce que la ciudad perdió peso como centro de estudio. Las familias, en cambio, siguieron guardando manuscritos ("the habit of collecting books survived").',
      },
    ],
  },
  {
    id: 'f14-ls-at-keynesian-multiplier',
    form: 14,
    section: 'listening',
    task: 'academic-talk',
    title: 'The Keynesian Multiplier',
    topic: 'economics',
    difficulty: 'hard',
    context: 'Listen to part of a lecture in a macroeconomics class.',
    script: [
      { speaker: 'Professor', voice: 'female', text: "Today we turn to one of the central ideas in Keynesian economics: the multiplier. An early version was published in nineteen thirty-one by Richard Kahn, a young colleague of John Maynard Keynes, and Keynes made it a cornerstone of his General Theory five years later. The claim is striking: an increase in spending, say by the government, can raise a country's total income by more than the amount originally spent." },
      { speaker: 'Professor', voice: 'female', text: "How? Because one person's spending is another person's income. Suppose the government spends one hundred million dollars on a bridge. That money becomes wages for workers and revenue for suppliers. They won't spend all of it, and they won't save all of it. The share of each extra dollar that people spend is called the marginal propensity to consume. Say it's eighty percent. Then eighty million dollars goes to groceries, rent, and so on, becoming income for shopkeepers and landlords, who spend eighty percent of that, sixty-four million, and so on, each round smaller than the last." },
      { speaker: 'Professor', voice: 'female', text: 'Add up all the rounds and you get five hundred million dollars, five times the original spending. The shortcut is that the multiplier equals one divided by the share of extra income that people save. Here they save one fifth, so the multiplier is five. Notice the implication: the more people save out of each extra dollar, the sooner the chain dies out, and the smaller the multiplier.' },
      { speaker: 'Student', voice: 'male', text: "But wouldn't some of that money go to taxes, or to imported goods?" },
      { speaker: 'Professor', voice: 'female', text: "Exactly, and that's why real multipliers are much smaller than our textbook example. Taxes and imports, like saving, are leakages: money that drops out of the domestic spending chain. Empirical estimates vary widely, and many fall between about one half and two. They also depend on the state of the economy. In a deep recession, with idle factories and unemployed workers, new spending puts those resources to work, so the multiplier tends to be larger. Near full employment, extra spending mostly pushes up prices rather than output." },
    ],
    questions: [
      {
        id: 'f14-ls-at-keynesian-multiplier-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'What is the lecture mainly about?',
        options: [
          'Why governments should spend more in every recession',
          'How new spending can raise income by a larger amount',
          'Why Kahn and Keynes disagreed about the role of saving',
          'How imports and taxes slow down long-term growth',
        ],
        answer: [1],
        explanation:
          'La profesora presenta la idea central del multiplicador: "an increase in spending ... can raise a country\'s total income by more than the amount originally spent", y explica cómo funciona y sus límites. No habla de un desacuerdo entre Kahn y Keynes ni recomienda gastar en todas las recesiones.',
      },
      {
        id: 'f14-ls-at-keynesian-multiplier-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'According to the professor, what happens to the multiplier when people save a larger share of extra income?',
        options: [
          'It grows, since banks have more money to lend out.',
          'It rises, since the government has to spend more.',
          'It falls, since the spending chain ends sooner.',
          'It is unchanged, since savings are spent later on.',
        ],
        answer: [2],
        explanation:
          'El multiplicador "equals one divided by the share of extra income that people save", y la profesora añade: "the more people save out of each extra dollar, the sooner the chain dies out, and the smaller the multiplier". No dice que el ahorro se gaste más tarde ni que aumente el préstamo bancario.',
      },
      {
        id: 'f14-ls-at-keynesian-multiplier-q3',
        kind: 'single',
        skill: 'function',
        prompt: 'Why does the professor mention idle factories and unemployed workers?',
        options: [
          'To explain when the multiplier is likely larger',
          'To explain why extra spending can push up prices',
          'To give an example of a leakage from the spending chain',
          'To describe who was hired to build the new bridge',
        ],
        answer: [0],
        explanation:
          'En una recesión profunda, "with idle factories and unemployed workers", el nuevo gasto pone esos recursos a trabajar, "so the multiplier tends to be larger". La subida de precios corresponde al caso contrario, cerca del pleno empleo.',
      },
      {
        id: 'f14-ls-at-keynesian-multiplier-q4',
        kind: 'single',
        skill: 'inference',
        prompt: 'What can be inferred about the multiplier in an economy where people spend much of any extra income on imported goods?',
        options: [
          'It would be larger than in the textbook example.',
          'It would depend mostly on what the central bank did.',
          'It would push domestic prices up very quickly.',
          'It would be smaller than in the textbook example.',
        ],
        answer: [3],
        explanation:
          'Las importaciones son "leakages: money that drops out of the domestic spending chain", y por eso "real multipliers are much smaller than our textbook example". Si se gasta mucho en productos importados, el multiplicador sería menor.',
      },
    ],
  },
];
