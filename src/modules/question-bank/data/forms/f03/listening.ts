import type { Difficulty, ListeningSet, Topic, Voice } from '../../../types';

/** Simulación n.º 3 — Listening (contenido original). */

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
  const id = `f03-ls-cr-${slug}`;
  return {
    id,
    form: 3,
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
  cr('laundry-room', 'easy', 'female', 'Do you know when the laundry room will open again after the cleaning?', [
    'Yes, I cleaned my room this morning.',
    "The sign says it'll reopen at four.",
    'I usually do my laundry on Sundays.',
    'It was closed for about two hours.',
  ], 1, 'Es una pregunta de información ("when… will open again"); solo "it\'ll reopen at four" da una hora futura. La primera opción repite "clean" sin responder y la última habla del pasado.', 'daily-life'),
  cr('clock-tower-photo', 'easy', 'female', 'Excuse me, would you mind taking a picture of me in front of the clock tower?', [
    "It's the oldest building on campus.",
    'Yes, I took a lot of pictures yesterday.',
    "It's almost three o'clock now.",
    'Not at all. Which button do I press?',
  ], 3, '"Would you mind…?" es una petición; "Not at all" significa que no le importa hacerlo, y la pregunta por el botón muestra que acepta. "It\'s almost three o\'clock" es una trampa por la palabra "clock".'),
  cr('engineering-tour', 'easy', 'male', "I'm a senior in engineering. Do you want me to show you around our building?", [
    'Great, thanks. I always get lost in there.',
    'The building was designed by a famous engineer.',
    'I showed it to my parents last weekend.',
    'Engineering is a very demanding major.',
  ], 0, 'Es un ofrecimiento; la respuesta natural lo acepta y da un motivo ("I always get lost"). Las demás repiten "building", "show" o "engineering" sin responder a la oferta.'),
  cr('sister-graduation', 'easy', 'female', "So how was your sister's graduation ceremony last weekend?", [
    "She's graduating from college next spring.",
    "I'll ask her about it when she calls me.",
    'Lovely, but the speeches went on forever.',
    "It's always held in the main stadium in May.",
  ], 2, 'Pregunta de cortesía sobre un hecho pasado ("how was… last weekend"); "Lovely" da una valoración. "She\'s graduating from college next spring" contradice que la ceremonia ya ocurrió.', 'daily-life'),
  cr('essay-intro', 'easy', 'male', 'The introduction to your essay was really interesting.', [
    'I introduced myself to the whole class.',
    'Thanks. I rewrote it about five times.',
    'Yes, the essay is due on Friday.',
    "I'm interested in history too.",
  ], 1, 'La respuesta natural a un cumplido es agradecerlo: "Thanks". Las opciones con "introduced" e "interested" son trampas de sonido parecido a "introduction" e "interesting".'),
  cr('friend-stay-over', 'easy', 'female', 'Would it be OK if my friend stayed over here on Saturday night?', [
    "I stayed over at my cousin's place last Saturday.",
    'My friend is coming on Sunday.',
    'Saturday nights are busy downtown.',
    "Sure, as long as she doesn't mind the couch.",
  ], 3, 'Pide permiso ("Would it be OK if…"); "Sure" lo concede y añade una condición lógica ("as long as she doesn\'t mind the couch"). Las demás repiten "stayed", "friend" o "Saturday" sin contestar.', 'daily-life'),

  // ---------- Listen and Choose a Response: medium ----------
  cr('sign-for-package', 'medium', 'male', "I was wondering if you could sign for a package if it comes while I'm out tomorrow.", [
    'I signed up for that class last week.',
    'Yes, I wonder about that too.',
    "Sure. I'll be home all afternoon.",
    'The package went to the wrong address.',
  ], 2, '"I was wondering if you could…" es una petición indirecta. "Sure" acepta y explica que estará en casa. "Signed up" y "wonder" son trampas de palabras repetidas.', 'daily-life'),
  cr('parking-space', 'medium', 'female', "Someone keeps parking in my assigned space, and it's the third time this week.", [
    'How annoying! Have you told the manager?',
    'The parking lot holds about thirty cars.',
    'This week has gone by really fast.',
    "I'll keep it in a safe place for you, then.",
  ], 0, 'Es una queja; la respuesta adecuada muestra empatía ("How annoying!") y sugiere una solución. "I\'ll keep it…" malinterpreta "keeps", y "This week…" solo repite una palabra.', 'daily-life'),
  cr('lab-roles', 'medium', 'male', 'Would you rather record the data or operate the equipment today?', [
    'Yes, I would.',
    'I recorded a song with my band last weekend.',
    "Today's lab should take about two hours.",
    "I'll take notes, if that's OK with you.",
  ], 3, 'Es una pregunta de elección ("A or B?"); hay que elegir una opción: "I\'ll take notes" equivale a registrar los datos. "Yes, I would" responde como si fuera una pregunta de sí/no.'),
  cr('swim-team', 'medium', 'female', "Aren't you on the swim team? I thought I saw you at the pool.", [
    'Yes, the pool is open until nine.',
    'I was, but I quit to focus on my classes.',
    "I'll see you at the meeting tonight, then.",
    'The team won its last three meets in a row.',
  ], 1, 'La pregunta negativa ("Aren\'t you…?") busca confirmar algo; "I was, but I quit" corrige la suposición con naturalidad. La opción de la piscina repite "pool" sin responder.'),
  cr('shift-swap', 'medium', 'female', 'I can cover your Friday shift if you take my Sunday morning one.', [
    'I already covered that chapter on Friday.',
    'Sunday mornings are usually quiet.',
    "Deal. I'm free on Sunday mornings anyway.",
    'My shift ended an hour ago.',
  ], 2, 'Es una oferta condicional ("if you take my Sunday morning one"); "Deal" acepta el intercambio y explica por qué le conviene. "Covered that chapter" juega con otro sentido de "cover".', 'daily-life'),
  cr('narrow-topic', 'medium', 'male', "I'm worried my topic might be too narrow for a ten-page paper.", [
    'You could compare it with a similar case.',
    'The paper is on the printer by the door.',
    "Yes, I've already written ten pages.",
    'The hallway in this building is very narrow.',
  ], 0, 'El hablante expresa una duda y busca consejo; la respuesta útil propone ampliar el tema ("compare it with a similar case"). "Paper" y "narrow" se repiten en las trampas con otro significado.'),

  // ---------- Listen and Choose a Response: hard ----------
  cr('peer-mentor', 'hard', 'female', "We're looking for peer mentors next year. Would you be interested?", [
    "I didn't know you were a peer mentor.",
    'They should apply before the end of the year.',
    'My peer mentor was really helpful last year.',
    "That's very kind of you. Can I think it over?",
  ], 3, 'La profesora ofrece un puesto; la respuesta agradece ("That\'s very kind of you") sin comprometerse ("Can I think it over?"). Las otras opciones malinterpretan a quién se ofrece el puesto o solo repiten "peer mentor".'),
  cr('hands-tied', 'hard', 'male', "I'd love to fund the trip, but my hands are tied.", [
    'Do you need help untying them?',
    'I see. Could we raise the money some other way?',
    "Great! When will the money be in the club's account?",
    'The trip was really fun last year.',
  ], 1, '"My hands are tied" es una expresión idiomática: no puede hacer nada (no hay fondos o no tiene autorización). Se acepta la negativa y se busca otra solución. "Great!" lo entiende como un sí, y "untying them" lo interpreta de forma literal.'),
  cr('home-cooked', 'hard', 'female', "You're making lasagna tonight? I haven't had a home-cooked meal in weeks.", [
    "Why don't you join us? There's plenty.",
    "I haven't cooked at home in weeks either.",
    'Lasagna takes about an hour to bake.',
    'Yes, I made it last weekend too.',
  ], 0, 'La frase es una indirecta: la amiga insinúa que le gustaría comer. La respuesta natural capta la indirecta y la invita ("Why don\'t you join us?"). Las demás ignoran la insinuación o contradicen que esa noche se cocina.', 'daily-life'),
  cr('quiet-debater', 'hard', 'male', 'Who would have guessed the quiet guy would win the debate?', [
    'I guessed most of the answers on the quiz.',
    'The debate is on Thursday at five.',
    'I know! He hardly said a word all semester.',
    'I think it was the guy in the dark blue shirt.',
  ], 2, 'Es una pregunta retórica que expresa sorpresa, no una petición de información. "I know!" comparte la sorpresa. La última opción la trata como una pregunta real sobre quién era.'),
  cr('hundred-times', 'hard', 'female', "I've read that chapter about a hundred times, and I still don't get it.", [
    'Wow, a hundred times? That must have taken months.',
    'The chapter has about a hundred pages.',
    "I'm glad you finally understood it.",
    'Want to go over it together tonight?',
  ], 3, '"About a hundred times" es una exageración que expresa frustración. La respuesta adecuada ofrece ayuda. La primera opción toma la cifra al pie de la letra y la tercera contradice "I still don\'t get it".'),
  cr('slides-reminder', 'hard', 'male', "I'm still waiting for your half of the slides for tomorrow's presentation.", [
    'Don\'t worry, I can wait a little longer for yours.',
    "Sorry, I'll send them to you within the hour.",
    'I think half of the class will be there.',
    'The presentation went really well.',
  ], 1, 'Es un recordatorio con tono de queja: el compañero aún no ha enviado su parte. Lo natural es disculparse y comprometerse ("Sorry, I\'ll send them…"). La primera opción invierte los papeles y la última habla en pasado.'),

  // ---------- Conversations ----------
  {
    id: 'f03-ls-cv-practice-room',
    form: 3,
    section: 'listening',
    task: 'conversation',
    title: 'Reserving a Piano Practice Room',
    topic: 'campus-life',
    difficulty: 'easy',
    context: 'Listen to a conversation between a student and a department secretary.',
    script: [
      { speaker: 'Student', voice: 'male', text: "Hi, I'm a music minor, and I need somewhere to practice piano for my recital. Is there a way to reserve one of the practice rooms?" },
      { speaker: 'Secretary', voice: 'female', text: 'Sure. The rooms with pianos are on the third floor, rooms 301 to 306. You reserve them on the sign-up sheet on the bulletin board outside this office.' },
      { speaker: 'Student', voice: 'male', text: "Oh, so it's not online? I looked on the department website and couldn't find anything." },
      { speaker: 'Secretary', voice: 'female', text: "Not yet. We're hoping to move it online next year, but for now it's paper only. A new sheet goes up every Monday morning at eight, and it covers the whole week." },
      { speaker: 'Student', voice: 'male', text: 'Is there a limit on how long I can book a room?' },
      { speaker: 'Secretary', voice: 'female', text: "Yes, two hours per day, so everyone gets a fair chance. If nobody has signed up for the next slot, you can stay longer, but you can't write your name down for more than two hours." },
      { speaker: 'Student', voice: 'male', text: 'Got it. And do I need a key?' },
      { speaker: 'Secretary', voice: 'female', text: "You pick up the key here with your student ID and return it when you're done. If a key comes back late, we suspend that student's booking privileges for a week." },
      { speaker: 'Student', voice: 'male', text: "That seems fair. I have a class at eight on Mondays, so I'll come by and sign up right after it." },
      { speaker: 'Secretary', voice: 'female', text: "I'd come as early as you can. The evening slots usually fill up by lunchtime on Monday." },
    ],
    questions: [
      {
        id: 'f03-ls-cv-practice-room-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'Why does the student go to the department office?',
        options: [
          'To find out how to book a room for piano practice',
          'To sign up to perform in a department recital',
          'To report that a practice room key is missing',
          'To ask why the reservation website is not working',
        ],
        answer: [0],
        explanation:
          'El estudiante pregunta: "Is there a way to reserve one of the practice rooms?" para practicar piano. Menciona su "recital", pero no va a inscribirse en él; y la web no está rota: la reserva simplemente no es online.',
      },
      {
        id: 'f03-ls-cv-practice-room-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'What does the secretary say about the length of a reservation?',
        options: [
          'Students may book a room for an entire week.',
          'Reservations last until the next Monday morning.',
          'Students may sign up for up to two hours a day.',
          'Rooms can be booked for four hours on weekends.',
        ],
        answer: [2],
        explanation:
          'La secretaria dice: "two hours per day, so everyone gets a fair chance". La hoja "covers the whole week", pero eso no significa que se pueda reservar una semana entera.',
      },
      {
        id: 'f03-ls-cv-practice-room-q3',
        kind: 'single',
        skill: 'inference',
        prompt: 'What does the secretary imply when she says that the evening slots fill up by lunchtime?',
        options: [
          'The student should practice during his lunch break.',
          'The student may miss the evening slots if he waits.',
          'The office will be closed on Monday afternoons.',
          'Evening slots are kept for music majors only.',
        ],
        answer: [1],
        explanation:
          'El estudiante piensa apuntarse después de su clase de las ocho; la secretaria le aconseja "come as early as you can" porque los turnos de tarde "fill up by lunchtime": si se retrasa, puede quedarse sin ellos.',
      },
    ],
  },
  {
    id: 'f03-ls-cv-chemistry-withdrawal',
    form: 3,
    section: 'listening',
    task: 'conversation',
    title: 'Withdrawing from Chemistry',
    topic: 'campus-life',
    difficulty: 'medium',
    context: 'Listen to a conversation between a student and an academic adviser.',
    script: [
      { speaker: 'Student', voice: 'female', text: "Thanks for seeing me, Dr. Lewis. I'm really struggling in General Chemistry, and I'm thinking about dropping it." },
      { speaker: 'Adviser', voice: 'male', text: "Well, the drop deadline passed two weeks ago, so if you leave the course now, it counts as a withdrawal. You'd get a W on your transcript." },
      { speaker: 'Student', voice: 'female', text: "Is a W bad? I've heard medical schools look at those." },
      { speaker: 'Adviser', voice: 'male', text: "One W isn't a big deal. It doesn't affect your GPA at all. What admissions committees notice is a pattern, like several W's in science courses. So how are you doing right now?" },
      { speaker: 'Student', voice: 'female', text: 'I got a 58 on the first exam and a 64 on the second. But the final is worth forty percent of the grade.' },
      { speaker: 'Adviser', voice: 'male', text: "So you're not out of it. If you did well on the final, you could probably still pass, maybe with a C. But a D or an F would hurt your GPA much more than a W." },
      { speaker: 'Student', voice: 'female', text: "That's what worries me. I'm also taking four other courses, and chemistry is eating up all my time." },
      { speaker: 'Adviser', voice: 'male', text: "Here's what I'd suggest. The withdrawal deadline is November fifteenth, so you still have some time. Go to the chemistry tutoring center this week, and ask your professor where you lost points. Then see how you do on the next quiz." },
      { speaker: 'Student', voice: 'female', text: "And if my score doesn't improve?" },
      { speaker: 'Adviser', voice: 'male', text: "Then withdraw before the fifteenth and retake the course in the spring, when your schedule is lighter. Either way, you'll be deciding with more information." },
      { speaker: 'Student', voice: 'female', text: "Okay, that sounds like a plan. I'll go to the tutoring center tomorrow." },
    ],
    questions: [
      {
        id: 'f03-ls-cv-chemistry-withdrawal-q1',
        kind: 'single',
        skill: 'purpose',
        prompt: 'What is the main purpose of the conversation?',
        options: [
          'To find out what medical schools look for in applicants',
          'To ask the adviser to extend the drop deadline',
          "To complain about a professor's grading policy",
          'To decide whether to leave a course or try to pass it',
        ],
        answer: [3],
        explanation:
          'La estudiante dice "I\'m thinking about dropping it" y ambos comparan la "W" con intentar aprobar ("you could probably still pass"). La facultad de medicina solo se menciona como preocupación secundaria.',
      },
      {
        id: 'f03-ls-cv-chemistry-withdrawal-q2',
        kind: 'single',
        skill: 'detail',
        prompt: "According to the adviser, how does a W affect a student's record?",
        options: [
          "It does not change the student's GPA.",
          'It counts as a failing grade in science.',
          'It is removed once the course is retaken.',
          'It is noticed only by medical schools.',
        ],
        answer: [0],
        explanation:
          'El asesor afirma: "It doesn\'t affect your GPA at all". En cambio, una D o una F "would hurt your GPA much more". No dice que la W desaparezca al repetir el curso.',
      },
      {
        id: 'f03-ls-cv-chemistry-withdrawal-q3',
        kind: 'single',
        skill: 'inference',
        prompt: 'What will the student probably do next?',
        options: [
          'Withdraw from the chemistry course right away',
          'Drop one of her other four courses',
          'Get help at the chemistry tutoring center',
          'Register for chemistry again in the spring',
        ],
        answer: [2],
        explanation:
          'Al final dice: "I\'ll go to the tutoring center tomorrow". Retirarse y repetir el curso en primavera solo ocurriría "if my score doesn\'t improve".',
      },
    ],
  },
  {
    id: 'f03-ls-cv-rembrandt-workshop',
    form: 3,
    section: 'listening',
    task: 'conversation',
    title: "A Painting from Rembrandt's Workshop?",
    topic: 'art',
    difficulty: 'hard',
    context: 'Listen to a conversation between a student and an art history professor.',
    script: [
      { speaker: 'Student', voice: 'male', text: 'Professor Hayes, do you have a minute? It\'s about my paper on the portrait at the city museum, the old man in the fur hat.' },
      { speaker: 'Professor', voice: 'female', text: "Of course. You're arguing that it's by Rembrandt, right?" },
      { speaker: 'Student', voice: 'male', text: "Right. The museum label says Rembrandt, so I assumed that was settled. But then I found an article that lists it as 'Rembrandt workshop.' Now I'm not sure what to write." },
      { speaker: 'Professor', voice: 'female', text: "That's a great find, actually. Rembrandt ran a busy studio in Amsterdam with many students and assistants. They learned by imitating his style, and some of their paintings were sold as his. So over the last few decades, experts have reattributed quite a few paintings that used to be credited to him." },
      { speaker: 'Student', voice: 'male', text: 'But how can experts tell the difference if the students were copying him so closely?' },
      { speaker: 'Professor', voice: 'female', text: "They look at several kinds of evidence. One is technical. X-rays can reveal changes underneath the paint surface; a master often changed his mind as he worked, while a copyist usually didn't need to. Another is the material itself. Tree rings in a wooden panel can tell you roughly when the tree was cut down." },
      { speaker: 'Student', voice: 'male', text: 'So if the wood turned out to be from after Rembrandt died, that would settle it.' },
      { speaker: 'Professor', voice: 'female', text: 'Exactly, though results are usually less dramatic. Often the evidence just narrows the possibilities. Did the article say why the painting was downgraded?' },
      { speaker: 'Student', voice: 'male', text: "It said the brushwork in the face is 'unusually cautious' for Rembrandt." },
      { speaker: 'Professor', voice: 'female', text: "That's a judgment about style, and experts often disagree about those. My advice: don't try to settle the question yourself. Make the debate part of your paper. Explain both attributions and the kind of evidence behind each one." },
      { speaker: 'Student', voice: 'male', text: "That's actually a more interesting paper. Should I contact the museum, too?" },
      { speaker: 'Professor', voice: 'female', text: "Definitely. Curators often keep files on technical studies that haven't been published yet." },
    ],
    questions: [
      {
        id: 'f03-ls-cv-rembrandt-workshop-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'What is the conversation mainly about?',
        options: [
          'How Rembrandt trained the assistants in his studio',
          'How to deal with a disputed attribution in a paper',
          'Why museums should change the labels on paintings',
          'How X-rays are used to restore damaged paintings',
        ],
        answer: [1],
        explanation:
          'El estudiante no sabe si atribuir el cuadro a Rembrandt o a su taller, y la profesora le aconseja "Make the debate part of your paper". El taller de Rembrandt y los rayos X son detalles que apoyan esa idea central.',
      },
      {
        id: 'f03-ls-cv-rembrandt-workshop-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'According to the professor, what can tree rings in a wooden panel reveal?',
        options: [
          'Which assistant prepared the panel',
          'Whether the paint was changed later',
          'Where in Amsterdam the panel was made',
          'Roughly when the tree was cut down',
        ],
        answer: [3],
        explanation:
          'La profesora dice: "Tree rings in a wooden panel can tell you roughly when the tree was cut down". Los cambios bajo la pintura se detectan con rayos X, no con los anillos de la madera.',
      },
      {
        id: 'f03-ls-cv-rembrandt-workshop-q3',
        kind: 'single',
        skill: 'attitude',
        prompt: 'What is the professor\'s attitude toward the article the student found?',
        options: [
          'She thinks it is a useful discovery for his paper.',
          'She believes it proves the painting is not genuine.',
          'She doubts that it was written by an expert.',
          'She thinks the student should simply ignore it.',
        ],
        answer: [0],
        explanation:
          'Reacciona con "That\'s a great find, actually" y le pide que incluya ambas atribuciones en el trabajo. No cree que el artículo zanje la cuestión: el argumento estilístico es algo sobre lo que "experts often disagree".',
      },
    ],
  },

  // ---------- Announcements ----------
  {
    id: 'f03-ls-an-museum-trip',
    form: 3,
    section: 'listening',
    task: 'announcement',
    title: 'Natural History Museum Trip',
    topic: 'campus-life',
    difficulty: 'easy',
    context: 'Listen to an instructor making an announcement at the end of class.',
    script: [
      {
        speaker: 'Professor',
        voice: 'female',
        text: "Before you go, a few details about Friday's trip to the natural history museum. The bus leaves at eight-thirty sharp, so please meet in front of the science building by eight-fifteen, not in the parking lot like last time. The bus can't wait for anyone who's late, because our tour guide is expecting us at nine-thirty. We'll stay at the museum until about two o'clock. The museum café is closed for renovation, so please bring a packed lunch. If the weather's nice, we'll eat together in the picnic area behind the museum. And remember, you'll be completing a worksheet in the fossil hall, so bring a pen.",
      },
    ],
    questions: [
      {
        id: 'f03-ls-an-museum-trip-q1',
        kind: 'single',
        skill: 'purpose',
        prompt: 'What is the main purpose of the announcement?',
        options: [
          "To explain the rules of the museum's fossil hall",
          'To announce that a class trip has been canceled',
          'To give students practical details about a trip',
          'To ask students to choose a place to have lunch',
        ],
        answer: [2],
        explanation:
          'La instructora da "a few details about Friday\'s trip": hora del autobús, punto de encuentro, comida y material. La hoja de trabajo del "fossil hall" es solo uno de esos detalles.',
      },
      {
        id: 'f03-ls-an-museum-trip-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'Where should students meet on Friday?',
        options: [
          'In the parking lot',
          'In front of the science building',
          'In the picnic area behind the museum',
          'At the entrance to the museum café',
        ],
        answer: [1],
        explanation:
          'Dice: "meet in front of the science building by eight-fifteen, not in the parking lot like last time". El aparcamiento es justamente el lugar que ya no se usa.',
      },
      {
        id: 'f03-ls-an-museum-trip-q3',
        kind: 'single',
        skill: 'inference',
        prompt: 'What is implied about the previous class trip?',
        options: [
          'It started at nine-thirty in the morning.',
          'It was canceled because of bad weather.',
          'The bus left without some of the students.',
          'Students met in a different place.',
        ],
        answer: [3],
        explanation:
          'Con "not in the parking lot like last time" la instructora da a entender que la vez anterior el punto de encuentro fue el aparcamiento. No dice que el autobús dejara a nadie atrás; solo advierte que esta vez "can\'t wait".',
      },
    ],
  },
  {
    id: 'f03-ls-an-wifi-upgrade',
    form: 3,
    section: 'listening',
    task: 'announcement',
    title: 'Overnight Wi-Fi Upgrade',
    topic: 'campus-life',
    difficulty: 'medium',
    context: "Listen to an announcement from the university's IT services office.",
    script: [
      {
        speaker: 'Announcer',
        voice: 'male',
        text: "Good afternoon. This is a message from IT Services. This Thursday night, campus Wi-Fi will be unavailable from eleven p.m. until about five a.m. while we upgrade the wireless network. During that time, wired connections in the library and the computer labs will continue to work normally. After the upgrade, the old network, CampusNet, will be replaced by a more secure network called CampusNet-Secure.",
      },
      {
        speaker: 'Announcer',
        voice: 'male',
        text: "The first time you connect, you'll need to log in with your full university email address instead of just your username, and you'll be asked to approve the login in the authentication app on your phone. So please make sure that app is installed before Thursday. If you have trouble connecting on Friday morning, the IT help desk in the library will open an hour early, at seven a.m.",
      },
    ],
    questions: [
      {
        id: 'f03-ls-an-wifi-upgrade-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'What is the announcement mainly about?',
        options: [
          'A network shutdown and a new way of logging in',
          'New rules for using the computer labs at night',
          "A problem with students' university email accounts",
          'The opening of a new IT help desk in the library',
        ],
        answer: [0],
        explanation:
          'El anuncio informa de que el Wi-Fi "will be unavailable" el jueves por la noche y explica los nuevos pasos para conectarse a "CampusNet-Secure". El servicio de ayuda ya existe; solo abrirá antes.',
      },
      {
        id: 'f03-ls-an-wifi-upgrade-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'What will students need to do the first time they connect to the new network?',
        options: [
          'Enter their username and then choose a new password',
          'Visit the help desk to register their phones',
          'Use a wired connection in a computer lab',
          'Use their full email and approve it on their phone',
        ],
        answer: [3],
        explanation:
          'Hay que iniciar sesión "with your full university email address instead of just your username" y aprobar el acceso "in the authentication app on your phone". La primera opción contradice lo que se dice sobre el nombre de usuario.',
      },
      {
        id: 'f03-ls-an-wifi-upgrade-q3',
        kind: 'single',
        skill: 'inference',
        prompt: 'What can be inferred about a student who has not installed the authentication app?',
        options: [
          'The student can keep using the old network on Friday.',
          "The student's email account will be closed.",
          'The student may be unable to log in after the upgrade.',
          'The student must stay in the library on Thursday night.',
        ],
        answer: [2],
        explanation:
          'Como el primer acceso exige aprobarlo en la app, quien no la tenga no podrá completar el inicio de sesión; por eso se pide "make sure that app is installed before Thursday". La red antigua "will be replaced", así que no seguirá disponible.',
      },
    ],
  },
  {
    id: 'f03-ls-an-alert-test',
    form: 3,
    section: 'listening',
    task: 'announcement',
    title: 'Campus Alert System Test',
    topic: 'campus-life',
    difficulty: 'hard',
    context: "Listen to an announcement from the university's office of emergency management.",
    script: [
      {
        speaker: 'Announcer',
        voice: 'female',
        text: "Attention, please. This is the Office of Emergency Management. Tomorrow, Wednesday, at ten a.m., we will test the campus alert system. You'll hear sirens outdoors and receive a text message and an email marked TEST. No action is needed during the test, but we'd like to use this opportunity to remind you what real alerts mean.",
      },
      {
        speaker: 'Announcer',
        voice: 'female',
        text: "A shelter-in-place message means it's safer to stay inside than to leave, for example during a severe storm or a nearby chemical spill. Go to an interior room, away from windows, and stay there until you receive an all-clear. An evacuation message means the opposite: leave the building immediately by the nearest safe exit, don't use elevators, and go to your building's assembly point, which is posted next to every main entrance. Finally, if you didn't receive last month's test alert, please update your phone number in the student portal today.",
      },
    ],
    questions: [
      {
        id: 'f03-ls-an-alert-test-q1',
        kind: 'single',
        skill: 'purpose',
        prompt: 'What is the main purpose of the announcement?',
        options: [
          'To warn people about a chemical spill near campus',
          'To announce a test and explain two kinds of alerts',
          'To show students how to use the student portal',
          'To tell people where every assembly point is located',
        ],
        answer: [1],
        explanation:
          'Se anuncia que "we will test the campus alert system" y se aprovecha para explicar qué significan los mensajes de "shelter-in-place" y de "evacuation". El derrame químico es solo un ejemplo.',
      },
      {
        id: 'f03-ls-an-alert-test-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'What should people do when they receive a shelter-in-place message?',
        options: [
          'Leave the building by the nearest exit',
          'Go to the assembly point by the entrance',
          'Stay in an interior room away from windows',
          'Reply to the message to confirm they are safe',
        ],
        answer: [2],
        explanation:
          'El anuncio dice: "Go to an interior room, away from windows, and stay there until you receive an all-clear". Salir del edificio e ir al punto de reunión corresponde a la evacuación, que es "the opposite".',
      },
      {
        id: 'f03-ls-an-alert-test-q3',
        kind: 'single',
        skill: 'inference',
        prompt: "What can be inferred about students who did not receive last month's test alert?",
        options: [
          'Their phone numbers may be incorrect in the system.',
          'They will not hear the sirens during tomorrow\'s test.',
          'They must go to their assembly point tomorrow.',
          'They are not allowed to use the elevators.',
        ],
        answer: [0],
        explanation:
          'Se les pide "update your phone number in the student portal", lo que implica que su número podría estar mal o desactualizado. Las sirenas se oyen "outdoors" y no dependen del teléfono.',
      },
    ],
  },

  // ---------- Academic Talks ----------
  {
    id: 'f03-ls-at-silk-road',
    form: 3,
    section: 'listening',
    task: 'academic-talk',
    title: 'Trade and Ideas on the Silk Road',
    topic: 'history',
    difficulty: 'easy',
    context: 'Listen to part of a lecture in a history class.',
    script: [
      { speaker: 'Professor', voice: 'male', text: "Okay, today we're looking at the Silk Road. Now, the name is a little misleading. It wasn't a single road at all. It was a network of overland routes, thousands of kilometers long, that connected China with Central Asia, Persia, and eventually the Mediterranean world. And the name itself was invented in the nineteenth century by a German geographer. The people who used these routes never called them that." },
      { speaker: 'Professor', voice: 'male', text: "The routes became important around the second century BCE, during China's Han dynasty, when the Chinese government sent missions to the west and began protecting trade along the way. Interestingly, very few merchants traveled the whole distance. Goods usually moved in stages. A merchant might carry silk a few hundred kilometers to an oasis town and sell it there, and then another trader would carry it farther west. So by the time Chinese silk reached Rome, it had passed through many hands, and its price had gone up enormously." },
      { speaker: 'Professor', voice: 'male', text: 'Silk was the famous product, of course; wealthy Romans loved it. But many other goods moved along these routes too: spices, precious stones, horses. Glassware, for example, traveled east from the Mediterranean to China.' },
      { speaker: 'Professor', voice: 'male', text: "But I'd argue that the most important things that traveled the Silk Road weren't goods at all. They were ideas and technologies. Take paper-making. Paper was invented in China, and the technique slowly spread west. By the eighth century, it had reached the Islamic world, and paper mills appeared in Baghdad. From there, paper eventually reached Europe. Religions traveled the same way. Buddhism, for instance, spread from India into China along these routes, carried by merchants and monks." },
      { speaker: 'Professor', voice: 'male', text: 'So when you think of the Silk Road, think of it less as a highway for luxury goods and more as a long chain of connections between very different cultures.' },
    ],
    questions: [
      {
        id: 'f03-ls-at-silk-road-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'What is the lecture mainly about?',
        options: [
          'Why Chinese silk became so expensive by the time it reached Rome',
          'How the Han dynasty built a single road to the west',
          'How paper-making spread from Baghdad to China',
          'What moved along the routes linking China and the West',
        ],
        answer: [3],
        explanation:
          'El profesor describe la red de rutas ("a network of overland routes") y lo que circulaba por ellas: mercancías, pero sobre todo "ideas and technologies". El precio de la seda en Roma es solo un detalle.',
      },
      {
        id: 'f03-ls-at-silk-road-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'According to the professor, how did goods usually travel along the Silk Road?',
        options: [
          'In stages, passed from one trader to another',
          'With one merchant who traveled the entire route',
          'Under the protection of Roman soldiers',
          'By ship across the Mediterranean Sea',
        ],
        answer: [0],
        explanation:
          'El profesor dice: "very few merchants traveled the whole distance. Goods usually moved in stages" y pone el ejemplo de la seda que pasa de un comerciante a otro.',
      },
      {
        id: 'f03-ls-at-silk-road-q3',
        kind: 'single',
        skill: 'organization',
        prompt: 'Why does the professor mention paper-making?',
        options: [
          'To explain why silk became less popular in Rome',
          'To show that China kept some inventions secret',
          'To give an example of a technology that spread',
          'To compare Chinese paper with European paper',
        ],
        answer: [2],
        explanation:
          'Tras afirmar que lo más importante "weren\'t goods at all. They were ideas and technologies", dice "Take paper-making": es un ejemplo de tecnología que se difundió hacia el oeste.',
      },
      {
        id: 'f03-ls-at-silk-road-q4',
        kind: 'single',
        skill: 'inference',
        prompt: 'What does the professor imply about the name "Silk Road"?',
        options: [
          'It was chosen by officials of the Han dynasty.',
          'It gives too narrow a picture of the routes.',
          'It was first used by merchants in Rome.',
          'It refers only to the routes through Persia.',
        ],
        answer: [1],
        explanation:
          'Dice que el nombre es "a little misleading" (no era una sola ruta) y concluye que hay que verla "less as a highway for luxury goods": el nombre sugiere una imagen demasiado limitada. Fue inventado por "a German geographer", no por los Han.',
      },
    ],
  },
  {
    id: 'f03-ls-at-diffusion-innovations',
    form: 3,
    section: 'listening',
    task: 'academic-talk',
    title: 'How Innovations Spread',
    topic: 'sociology',
    difficulty: 'medium',
    context: 'Listen to part of a lecture in a sociology class.',
    script: [
      { speaker: 'Professor', voice: 'female', text: "Last time we talked about how social norms change. Today I want to look at a related question: how do new ideas and products spread through a society? One of the most influential answers comes from the sociologist Everett Rogers, who published a book called Diffusion of Innovations in 1962. Rogers built on earlier research, including a famous study of how farmers in Iowa started using a new hybrid corn seed. Not everyone adopted the seed at the same time; it spread gradually." },
      { speaker: 'Professor', voice: 'female', text: "Rogers sorted adopters into five categories. First come the innovators, about two and a half percent of people. They're adventurous, willing to take risks, and often wealthy enough to survive a failure. Next are the early adopters, about thirteen and a half percent. This group really matters, because early adopters tend to be respected opinion leaders in their communities. When they adopt something, other people pay attention." },
      { speaker: 'Professor', voice: 'female', text: "Then come the early majority and the late majority, each about thirty-four percent. The early majority adopts after careful thought, once they've seen the innovation work for others. The late majority is more skeptical; they often adopt only because of economic pressure, or because almost everyone around them already has. Finally, there are the laggards, the last sixteen percent, who are the most attached to tradition." },
      { speaker: 'Student', voice: 'male', text: "Isn't 'laggards' kind of an insulting term? Maybe they have good reasons to wait." },
      { speaker: 'Professor', voice: 'female', text: "That's a fair point, and Rogers himself said the label wasn't meant as criticism. Waiting can be perfectly rational; a laggard may simply be unable to afford the risk. Also, the categories describe the adoption of one particular innovation. Someone could be an innovator with smartphones and a laggard with kitchen appliances. Now, if you plot the total number of adopters over time, you get an S-shaped curve: slow at first, then rapid, then leveling off. That's why marketers pay so much attention to the early adopters. A product that wins them over has a much better chance of reaching the majority." },
    ],
    questions: [
      {
        id: 'f03-ls-at-diffusion-innovations-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'What is the lecture mainly about?',
        options: [
          'Why farmers in Iowa were slow to plant a new hybrid corn seed',
          'How marketers create demand for new technologies',
          'A model that groups people by when they adopt innovations',
          'Why most people are skeptical of new social norms',
        ],
        answer: [2],
        explanation:
          'La profesora explica cómo Rogers clasificó a los adoptantes en "five categories" según el momento en que adoptan una innovación. El estudio de Iowa y el marketing son detalles de apoyo.',
      },
      {
        id: 'f03-ls-at-diffusion-innovations-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'According to the professor, why are early adopters especially important?',
        options: [
          'They are wealthy enough to survive a failure.',
          'Other people respect them and follow their lead.',
          'They form the largest group of adopters.',
          'They invent most of the new products themselves.',
        ],
        answer: [1],
        explanation:
          'La profesora dice que "early adopters tend to be respected opinion leaders… When they adopt something, other people pay attention". La riqueza para soportar un fracaso describe a los "innovators", no a los "early adopters".',
      },
      {
        id: 'f03-ls-at-diffusion-innovations-q3',
        kind: 'single',
        skill: 'function',
        prompt: 'Why does the professor say that someone could be an innovator with smartphones and a laggard with kitchen appliances?',
        options: [
          'To show that the categories are based mainly on age',
          'To explain why laggards cannot afford risks',
          'To give an example of an S-shaped curve',
          'To show that categories depend on the innovation',
        ],
        answer: [3],
        explanation:
          'Justo antes dice: "the categories describe the adoption of one particular innovation". El ejemplo muestra que una misma persona puede estar en categorías distintas según el producto.',
      },
      {
        id: 'f03-ls-at-diffusion-innovations-q4',
        kind: 'single',
        skill: 'inference',
        prompt: 'What can be inferred about a new product that early adopters reject?',
        options: [
          'It is less likely to reach most consumers.',
          'It will be adopted quickly by the late majority.',
          'It will become popular mainly among laggards.',
          'It will spread faster than other products.',
        ],
        answer: [0],
        explanation:
          'Si "a product that wins them over has a much better chance of reaching the majority", un producto rechazado por ellos tendrá menos posibilidades de llegar a la mayoría. Nada indica que la "late majority" lo adopte rápidamente.',
      },
    ],
  },
  {
    id: 'f03-ls-at-color-terms',
    form: 3,
    section: 'listening',
    task: 'academic-talk',
    title: 'Color Words and Perception',
    topic: 'linguistics',
    difficulty: 'hard',
    context: 'Listen to part of a lecture in a linguistics class.',
    script: [
      { speaker: 'Professor', voice: 'male', text: "Today's topic is an old debate in linguistics: does the language you speak shape the way you perceive the world? This idea is called linguistic relativity. In its strongest form, it claims that language determines thought, so if your language lacks a word for something, you can't really perceive it. Very few researchers accept that strong version today. The real question is whether language has weaker effects." },
      { speaker: 'Professor', voice: 'male', text: "Color turned out to be a perfect test case. Physically, the color spectrum is continuous; there's no natural boundary between, say, green and blue. Yet languages divide it up differently, and some have only a few basic color terms. So if relativity were right, you might expect color vocabularies to vary more or less randomly." },
      { speaker: 'Professor', voice: 'male', text: "In 1969, however, Brent Berlin and Paul Kay published a study that pointed the other way. They defined a basic color term strictly: it must be a single word, like 'red,' and not a kind of another color, the way 'scarlet' is a kind of red. Comparing many languages, they found a striking pattern. If a language has only two basic terms, they mean dark and light. If it has three, the third is red. Next come green and yellow, then blue, then brown, and so on. Speakers of very different languages also tended to choose the same best example of each color. This suggested that color naming rests on universal features of human vision." },
      { speaker: 'Professor', voice: 'male', text: "But the debate didn't end there. Russian has two basic words for blue, one for lighter blues and one for darker blues. In experiments, Russian speakers were slightly faster at telling two shades of blue apart when the shades fell on opposite sides of that boundary. English speakers showed no such advantage. Interestingly, the advantage disappeared when participants had to silently repeat a string of numbers during the task, which suggests that language was actively involved." },
      { speaker: 'Professor', voice: 'male', text: "So most researchers now take a middle position. Shared biology explains the universal patterns, but the words we learn can sharpen certain distinctions. Language doesn't determine what we can see, but it may affect how quickly we notice some differences." },
    ],
    questions: [
      {
        id: 'f03-ls-at-color-terms-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'What is the lecture mainly about?',
        options: [
          'Evidence on whether language affects how people see color',
          'Why English has more color terms than other languages',
          'How the human eye tells apart different shades of blue',
          'Why most linguists now accept the strong form of relativity',
        ],
        answer: [0],
        explanation:
          'La clase usa el color como "a perfect test case" para la pregunta de si el idioma influye en la percepción, y repasa los estudios de Berlin y Kay y el de los hablantes de ruso. La última opción contradice "Very few researchers accept that strong version".',
      },
      {
        id: 'f03-ls-at-color-terms-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'According to the professor, what did Berlin and Kay find?',
        options: [
          'Color vocabularies vary randomly from language to language.',
          'Most languages have exactly the same number of color terms.',
          'Russian speakers perceive blue differently from others.',
          'Basic color terms are added in a predictable order.',
        ],
        answer: [3],
        explanation:
          'Encontraron "a striking pattern": con dos términos, "dark and light"; con tres, "red"; luego verde y amarillo, después azul… Es decir, un orden predecible. La variación aleatoria era lo que habría predicho la relatividad.',
      },
      {
        id: 'f03-ls-at-color-terms-q3',
        kind: 'single',
        skill: 'function',
        prompt: "Why does the professor mention that the Russian speakers' advantage disappeared when they repeated numbers?",
        options: [
          'To show that the Russian experiment was poorly designed',
          'To suggest that language was involved in the task',
          'To explain why Russian has two words for blue',
          'To argue that memory and vision are unrelated',
        ],
        answer: [1],
        explanation:
          'Repetir números ocupa los recursos verbales; si la ventaja desaparece, es que el lenguaje intervenía: "which suggests that language was actively involved". No critica el diseño del experimento.',
      },
      {
        id: 'f03-ls-at-color-terms-q4',
        kind: 'single',
        skill: 'inference',
        prompt: 'Which statement would the professor most likely agree with?',
        options: [
          'People cannot see a color that has no name in their language.',
          "Berlin and Kay's findings have been completely disproven.",
          'Language can influence perception without determining it.',
          'Color is the only area in which language affects thought.',
        ],
        answer: [2],
        explanation:
          'Su conclusión es la "middle position": "Language doesn\'t determine what we can see, but it may affect how quickly we notice some differences". La primera opción es la versión fuerte que, según él, casi nadie acepta.',
      },
    ],
  },
];
