import type { ChoiceQuestion, Difficulty, ListeningSet, Skill, Topic, Voice } from '../../../types';

/** Simulación n.º 10 — Listening (contenido original). */

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
    form: 10,
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

function q(id: string, skill: Skill, prompt: string, options: string[], answer: number, explanation: string): ChoiceQuestion {
  return { id, kind: 'single', skill, prompt, options, answer: [answer], explanation };
}

export const sets: ListeningSet[] = [
  // ---------- Choose a Response: easy ----------
  cr('f10-ls-cr-paper-length', 'easy', 'male', 'How many pages should the reflection paper be?', [
    'I reflected on it all weekend.',
    "It's due next Friday, before class.",
    'Three to four pages, double-spaced.',
    'Yes, the paper should be printed.',
  ], 2, 'Es una pregunta de información con "how many pages"; la única respuesta que da una cantidad es "Three to four pages". "It\'s due next Friday" responde a otra pregunta (cuándo), y "reflected" solo repite el sonido de "reflection".'),
  cr('f10-ls-cr-cover-letter', 'easy', 'female', "Could you proofread my cover letter? It's only one page.", [
    'Sure, just send it over after class.',
    'I wrote my own cover letter last spring.',
    'One page is the normal length for letters.',
    'Yes, she proofread it for you yesterday.',
  ], 0, 'Es una petición ("Could you proofread…?"); la respuesta natural la acepta: "Sure, just send it over after class". La opción sobre "one page" comenta un dato sin responder, y "she proofread it" cambia la persona y el tiempo verbal.'),
  cr('f10-ls-cr-moving-boxes', 'easy', 'male', 'Those boxes look heavy. Want me to help you carry them inside?', [
    'I bought these boxes at the hardware store.',
    'Yes, I carried them inside yesterday.',
    "Sure, I'll help you move next weekend.",
    'That would be great. Thanks a lot!',
  ], 3, 'Es un ofrecimiento de ayuda; lo adecuado es aceptarlo y agradecerlo: "That would be great. Thanks a lot!". "I\'ll help you move" invierte los papeles (es quien ofrece la ayuda quien habla), y "carried them inside yesterday" usa un tiempo que no encaja.', 'daily-life'),
  cr('f10-ls-cr-ankle', 'easy', 'female', "How's your ankle feeling after yesterday's game?", [
    'We won the game by two points.',
    "Much better, thanks. The swelling's down.",
    "I'll ask him how he's feeling later.",
    "The next game starts at six o'clock tomorrow.",
  ], 1, 'La compañera muestra preocupación por el tobillo; la respuesta natural informa de cómo está y agradece: "Much better, thanks". "We won the game" responde sobre el partido, no sobre la lesión, y "I\'ll ask him" se refiere a otra persona.'),
  cr('f10-ls-cr-tournament-ride', 'easy', 'male', 'Thanks again for driving me to the tournament this morning.', [
    'The tournament was held in the next town.',
    'No problem. It was right on my way.',
    "Sure, I'd love a ride to the tournament.",
    "I'm thankful the morning was so sunny.",
  ], 1, 'Ante un agradecimiento se responde quitándole importancia: "No problem. It was right on my way." "I\'d love a ride" interpreta mal la función (como si fuera un ofrecimiento) y "thankful" solo repite el sonido de "thanks".'),
  cr('f10-ls-cr-campus-map', 'easy', 'male', 'Sorry, could I look at your campus map for a second?', [
    'I looked at it a second time.',
    'The campus is a lot bigger than it looks.',
    "No, I've never seen a map like that.",
    'Of course. Where are you trying to go?',
  ], 3, 'Pide permiso ("could I look at…?"); la respuesta natural lo concede y ofrece ayuda: "Of course. Where are you trying to go?". "A second time" es una trampa de sonido con "for a second", y "never seen a map like that" no responde a la petición.'),

  // ---------- Choose a Response: medium ----------
  cr('f10-ls-cr-read-conclusion', 'medium', 'female', 'Would you mind reading through my conclusion before I submit the paper?', [
    'Not at all. Just email me the file.',
    'Yes, I submitted mine on Monday.',
    'My conclusion was that it worked.',
    "No, she hasn't finished reading it yet.",
  ], 0, 'Petición indirecta con "Would you mind…?": para aceptar se dice "Not at all" (no me importa), y después "Just email me the file". "My conclusion was…" repite una palabra sin responder, y "she hasn\'t finished" cambia la persona.'),
  cr('f10-ls-cr-quiet-microphone', 'medium', 'male', 'I could barely hear the professor. The microphone in the lecture hall was way too quiet.', [
    'The lecture hall holds three hundred people.',
    "Sorry, I'll try to be quieter next time.",
    'I know. I had to move to the front row.',
    "The microphone was on the professor's desk.",
  ], 2, 'Es una queja; la respuesta natural muestra acuerdo y comparte la experiencia: "I know. I had to move to the front row." "I\'ll try to be quieter" malinterpreta la queja como si fuera contra el oyente, y las otras opciones dan datos irrelevantes.'),
  cr('f10-ls-cr-lab-tense', 'medium', 'female', 'Should the lab report be written in the past tense or the present tense?', [
    'Yes, it should all be written in formal English.',
    'I wrote mine in the lab last week.',
    'I was really tense during the lab.',
    "Past tense, since it describes what you did.",
  ], 3, 'Es una pregunta de elección ("past… or present…?"), así que no se responde con "Yes"; la respuesta adecuada elige una opción y la justifica: "Past tense, since it describes what you did." "Tense" (nervioso) es una trampa de sonido.'),
  cr('f10-ls-cr-brother', 'medium', 'male', "Isn't your brother a student here too?", [
    'He was, but he graduated last May.',
    "No, I'm not a student here anymore.",
    'I have one brother and one sister.',
    'The students here are very friendly.',
  ], 0, 'Pregunta negativa que busca confirmar algo que el hablante cree; la respuesta natural corrige la información: "He was, but he graduated last May." "I\'m not a student here" habla de uno mismo y no del hermano, y "one brother and one sister" no responde.'),
  cr('f10-ls-cr-quiz-trade', 'medium', 'female', 'If you help me with grammar, I can quiz you on vocabulary before the test.', [
    'The vocabulary test is on Thursday morning.',
    'I quizzed him on grammar yesterday.',
    'Deal. Want to meet after class today?',
    'Grammar is harder than vocabulary.',
  ], 2, 'Es un ofrecimiento condicional (un intercambio de ayuda); la respuesta natural lo acepta y propone cuándo: "Deal. Want to meet after class today?". Las demás opciones repiten palabras ("vocabulary", "grammar") sin aceptar ni rechazar la propuesta.'),
  cr('f10-ls-cr-fundraiser-rain', 'medium', 'male', "I'm worried it's going to rain on Saturday. The whole fundraiser is outdoors.", [
    'I raised over fifty dollars at the last one.',
    "Let's ask about using the gym as a backup.",
    'Saturday works better than Sunday for me.',
    'Yes, the fundraiser was a big success.',
  ], 1, 'El compañero expresa una preocupación; la respuesta útil propone una solución: "Let\'s ask about using the gym as a backup." "Saturday works better" responde a otra pregunta (elegir día), y "was a big success" usa el pasado para un evento futuro.'),

  // ---------- Choose a Response: hard ----------
  cr('f10-ls-cr-dog-sitting', 'hard', 'female', "I'm visiting my family for two weeks. Would you be able to look after my dog while I'm gone?", [
    'Yes, I visited my family last weekend.',
    "Sorry, I can't. I've got finals then.",
    'Two weeks is a long time to be away from home.',
    "No, I don't have a dog of my own.",
  ], 1, 'Es una petición, y la única respuesta que la contesta es un rechazo cortés: "Sorry, I can\'t. I\'ve got finals then." "I visited my family" repite palabras de la frase con otra persona y otro tiempo verbal, y "I don\'t have a dog" malinterpreta la pregunta.', 'daily-life'),
  cr('f10-ls-cr-under-weather', 'hard', 'male', "I'm feeling a bit under the weather. Could you all go ahead with the meeting tonight?", [
    "The forecast says it'll clear up tonight.",
    "Great, then we'll see you there at seven.",
    'I went ahead and booked the room already.',
    "Sure. Rest up. I'll send you the notes.",
  ], 3, '"Under the weather" significa sentirse algo enfermo, y "go ahead with the meeting" implica que él no irá. La respuesta adecuada lo entiende: "Rest up. I\'ll send you the notes." "The forecast…" toma el modismo literalmente y "we\'ll see you there" ignora que no asistirá.'),
  cr('f10-ls-cr-tuesday-notes', 'hard', 'female', "If only someone had taken notes in Tuesday's lecture. I was out sick.", [
    'I did. You can borrow mine if you want.',
    'Yes, you should have taken notes.',
    'The lecture is on Tuesdays and Thursdays.',
    'Someone took my notebook on Tuesday.',
  ], 0, '"If only someone had taken notes" es una petición implícita: quiere los apuntes. La respuesta natural los ofrece: "I did. You can borrow mine." "You should have taken notes" ignora que estaba enferma, y "took my notebook" es una trampa de sonido.'),
  cr('f10-ls-cr-vegetarian', 'hard', 'male', 'Wait, I thought you were a vegetarian.', [
    'Yes, I thought about it for a while.',
    'No, the vegetables here are very fresh.',
    'I am. This burger is made from beans.',
    "I'll wait for you at the restaurant.",
  ], 2, 'El compañero expresa confusión porque ve algo que contradice lo que creía; la respuesta natural aclara la contradicción: "I am. This burger is made from beans." "Thought about it" y "wait for you" solo repiten palabras de la frase.', 'daily-life'),
  cr('f10-ls-cr-picnic-weather', 'hard', 'female', 'Well, the weather could be better for a picnic.', [
    'True. Should we eat indoors instead?',
    "Yes, it's perfect picnic weather today.",
    "I'd better bring more sunscreen, then.",
    'We had a picnic here last summer.',
  ], 0, '"Could be better" es un eufemismo: el tiempo es malo. La respuesta adecuada lo reconoce y propone una alternativa: "True. Should we eat indoors instead?" "It\'s perfect picnic weather" y "bring more sunscreen" entienden lo contrario de lo que implica la hablante (que hace mal tiempo).', 'daily-life'),
  cr('f10-ls-cr-heads-up', 'hard', 'male', "I'd appreciate a heads-up next time you invite people over.", [
    'Thanks, I really appreciate your help too.',
    "Sure, I'll look up when they arrive.",
    'Yes, I invited them over here last night.',
    "Sorry. I'll tell you in advance next time.",
  ], 3, '"A heads-up" es un aviso previo; la frase es una queja educada. Lo natural es disculparse y prometer avisar: "Sorry. I\'ll tell you in advance next time." "Look up" toma "heads-up" literalmente, y "I invited them" solo confirma el hecho sin disculparse.', 'daily-life'),

  // ---------- Conversations ----------
  {
    id: 'f10-ls-cv-cpr-course',
    form: 10,
    section: 'listening',
    task: 'conversation',
    title: 'Signing Up for CPR Training',
    topic: 'campus-life',
    difficulty: 'easy',
    context: 'Listen to a conversation between a student and a staff member at the campus health center.',
    script: [
      { speaker: 'Student', voice: 'female', text: 'Hi. I saw a flyer about a first-aid and CPR course this weekend. Is there still room to sign up?' },
      { speaker: 'Staff member', voice: 'male', text: "Let me check. Yes, we have three spots left in Saturday's session. Are you taking it for a job, or just to learn?" },
      { speaker: 'Student', voice: 'female', text: "For a job, actually. I'm going to be a lifeguard at the campus pool this summer, and they told me I need a certificate." },
      { speaker: 'Staff member', voice: 'male', text: "Then this is the right course. It runs on Saturday from nine to four, with an hour for lunch. The first half is first aid, and after lunch you'll practice CPR on training dummies." },
      { speaker: 'Student', voice: 'female', text: "Okay. And how much does it cost? The flyer didn't say." },
      { speaker: 'Staff member', voice: 'male', text: "It's forty dollars for students. That covers the training manual and the certificate. You can pay here today, or we can charge it to your student account." },
      { speaker: 'Student', voice: 'female', text: "I'll put it on my account. When do I get the certificate?" },
      { speaker: 'Staff member', voice: 'male', text: "You'll take a short skills test at the end of the day. If you pass, we'll email you a digital certificate within a few days. It's valid for two years." },
      { speaker: 'Student', voice: 'female', text: 'Two years, great. Is there anything I should bring?' },
      { speaker: 'Staff member', voice: 'male', text: "Just wear comfortable clothes. You'll be kneeling on the floor a lot during the CPR practice." },
      { speaker: 'Student', voice: 'female', text: 'Good to know. Thanks!' },
    ],
    questions: [
      q('f10-ls-cv-cpr-course-q1', 'main-idea', 'Why does the student go to the health center?', [
        'To renew a certificate that has expired',
        'To register for a first-aid and CPR course',
        'To apply for a lifeguard job at the pool',
        'To pay a fee that was added to her account',
      ], 1, 'Pregunta "Is there still room to sign up?" por el curso de "first-aid and CPR". Ya tiene el trabajo de socorrista ("I\'m going to be a lifeguard"), así que no va a solicitarlo; solo necesita el certificado.'),
      q('f10-ls-cv-cpr-course-q2', 'detail', 'What does the course fee include?', [
        'Lunch and a training dummy to take home',
        'Lifeguard training at the campus pool',
        'A second session if she fails the test',
        'The training manual and the certificate',
      ], 3, '"It\'s forty dollars for students. That covers the training manual and the certificate." El almuerzo y los muñecos de práctica se mencionan, pero no como parte de lo que incluye la tarifa.'),
      q('f10-ls-cv-cpr-course-q3', 'function', 'Why does the staff member mention kneeling on the floor?', [
        'To explain why she should wear comfortable clothes',
        'To warn her that the skills test is very difficult',
        'To suggest that she bring a mat to the session',
        'To describe where the first-aid part takes place',
      ], 0, 'Dice "Just wear comfortable clothes. You\'ll be kneeling on the floor a lot": la mención justifica la recomendación sobre la ropa. No habla de la dificultad del examen ni de traer una esterilla.'),
    ],
  },
  {
    id: 'f10-ls-cv-seedling-light',
    form: 10,
    section: 'listening',
    task: 'conversation',
    title: 'Planning a Seedling Light Experiment',
    topic: 'biology',
    difficulty: 'medium',
    context: 'Listen to a conversation between two students in a biology class.',
    script: [
      { speaker: 'Maya', voice: 'female', text: 'So for our lab project, I was thinking we could test how different colors of light affect seedling growth. We could put red, blue, and green filters over the trays.' },
      { speaker: 'Leo', voice: 'male', text: "I like that. But we'll need a control group too, right? Some seedlings under ordinary white light, so we have something to compare with." },
      { speaker: 'Maya', voice: 'female', text: 'Good point. So four trays: red, blue, green, and white. Same type of seed, same soil, same amount of water.' },
      { speaker: 'Leo', voice: 'male', text: 'And what exactly are we measuring? Just height?' },
      { speaker: 'Maya', voice: 'female', text: 'Height, and also the number of leaves. Dr. Kim said height alone can be misleading, because seedlings in dim light sometimes grow tall and thin while they search for more light.' },
      { speaker: 'Leo', voice: 'male', text: 'Right, they stretch out. Okay. The problem is that we have to measure every day for three weeks, including weekends.' },
      { speaker: 'Maya', voice: 'female', text: "I know. I'm away most weekends, so what if I take Monday through Friday, and you take Saturdays and Sundays?" },
      { speaker: 'Leo', voice: 'male', text: "That's fine, but then you're doing five days and I'm only doing two. How about I also handle the spreadsheet and the graphs?" },
      { speaker: 'Maya', voice: 'female', text: 'Deal. Just make sure we both measure the same way, from the soil to the tip of the tallest leaf, so the numbers are consistent.' },
      { speaker: 'Leo', voice: 'male', text: "Let's write that into the procedure so we don't forget. I'll set up the trays on Thursday." },
    ],
    questions: [
      q('f10-ls-cv-seedling-light-q1', 'main-idea', 'What are the students mainly discussing?', [
        'Why their seedlings are not growing as expected',
        'Which color of light Dr. Kim told them to use',
        'How to design an experiment and share the work',
        'How to turn their measurements into graphs',
      ], 2, 'Deciden el diseño ("a control group", "four trays", qué medir) y se reparten las tareas ("I take Monday through Friday, and you take Saturdays and Sundays"). Las gráficas se mencionan solo como un detalle del reparto.'),
      q('f10-ls-cv-seedling-light-q2', 'detail', 'Why will the students also count the number of leaves?', [
        'Height alone can be misleading in dim light.',
        'Leaves are easier to measure than height is.',
        'Dr. Kim requires a leaf count in every report.',
        'Green light affects only the number of leaves.',
      ], 0, '"Dr. Kim said height alone can be misleading, because seedlings in dim light sometimes grow tall and thin." La opción de Dr. Kim exigiendo un recuento usa su nombre, pero ella no impuso esa regla.'),
      q('f10-ls-cv-seedling-light-q3', 'inference', 'What can be inferred about Leo?', [
        'He will take most of the daily measurements.',
        'He thinks the experiment needs fewer trays.',
        'He would prefer to measure on weekdays.',
        'He wants the workload to be roughly equal.',
      ], 3, 'Leo observa "you\'re doing five days and I\'m only doing two" y se ofrece a hacer "the spreadsheet and the graphs": quiere equilibrar el trabajo. No hará la mayoría de las mediciones (solo los fines de semana).'),
    ],
  },
  {
    id: 'f10-ls-cv-research-method',
    form: 10,
    section: 'listening',
    task: 'conversation',
    title: 'Interviews or Participant Observation',
    topic: 'sociology',
    difficulty: 'hard',
    context: 'Listen to a conversation between a student and a sociology professor.',
    script: [
      { speaker: 'Student', voice: 'male', text: "Professor Alvarez, thanks for meeting with me. For my research project, I want to study how the campus hiking club welcomes new members, but I can't decide on a method." },
      { speaker: 'Professor', voice: 'female', text: 'Okay. What are you choosing between?' },
      { speaker: 'Student', voice: 'male', text: 'Interviews or participant observation. Interviews seem easier. I could talk to ten new members and ask them how they were treated.' },
      { speaker: 'Professor', voice: 'female', text: "Interviews can work, but think about what you'd actually get. People tend to describe their experience in a tidy, positive way, especially about a group they've just joined. They might not even notice the small things that made them feel included or left out." },
      { speaker: 'Student', voice: 'male', text: 'So observation would capture more of what actually happens?' },
      { speaker: 'Professor', voice: 'female', text: "Potentially. If you join the club and go on the outings, you can see the routines: who talks to newcomers, whether there are inside jokes nobody explains. But it takes much longer, and you have to be open with the club about your role." },
      { speaker: 'Student', voice: 'male', text: "I'd have to tell them I'm researching them? Wouldn't that change how they act?" },
      { speaker: 'Professor', voice: 'female', text: "At first, maybe. But people usually get used to an observer after a few weeks. And it's an ethical requirement. You can't study people secretly for a class project; you need their consent." },
      { speaker: 'Student', voice: 'male', text: "The semester's only twelve weeks, though. What if I did both? Observe for most of the term, and then interview a few new members at the end?" },
      { speaker: 'Professor', voice: 'female', text: "That's actually a strong design. The interviews would let you check whether your interpretations match how the newcomers themselves saw things. Just keep the interviews small, maybe four or five people." },
      { speaker: 'Student', voice: 'male', text: "Okay. I'll write up a plan and send it to you by Friday." },
    ],
    questions: [
      q('f10-ls-cv-research-method-q1', 'purpose', 'What is the main purpose of the conversation?', [
        'To get permission to join the hiking club',
        'To discuss the results of a completed study',
        'To find ten new members to interview',
        'To choose a research method for a project',
      ], 3, 'El estudiante dice "I can\'t decide on a method" y comparan "interviews or participant observation". Lo de entrevistar a diez miembros es solo su idea inicial, no el propósito de la reunión.'),
      q('f10-ls-cv-research-method-q2', 'detail', 'According to the professor, what is one weakness of relying only on interviews?', [
        'Club members often refuse to be interviewed.',
        'New members may describe events too positively.',
        'Interviews take longer than observation does.',
        'Interviews require consent, but observation does not.',
      ], 1, '"People tend to describe their experience in a tidy, positive way, especially about a group they\'ve just joined." Es la observación la que "takes much longer", y ambas requieren consentimiento.'),
      q('f10-ls-cv-research-method-q3', 'attitude', "What is the professor's opinion of the student's final plan?", [
        'It is too long to finish in one semester.',
        'It would be stronger with more interviews.',
        'It is strong if the interviews stay small.',
        'It raises ethical concerns about secrecy.',
      ], 2, 'Dice "That\'s actually a strong design" y añade "Just keep the interviews small, maybe four or five people". Por eso no pide más entrevistas; al contrario, sugiere pocas.'),
    ],
  },

  // ---------- Announcements ----------
  {
    id: 'f10-ls-an-career-fair',
    form: 10,
    section: 'listening',
    task: 'announcement',
    title: 'Getting Ready for the Career Fair',
    topic: 'campus-life',
    difficulty: 'easy',
    context: 'Listen to an announcement on a university campus.',
    script: [
      {
        speaker: 'Announcer',
        voice: 'female',
        text: "Good morning, everyone. This is a reminder from Career Services that the fall career fair will take place next Thursday, from ten a.m. to three p.m., in the student center ballroom. More than sixty employers will attend. To get in, you must register in advance on the Career Services website by Tuesday at five p.m. There will be no registration at the door. Please bring several printed copies of your résumé, since many employers won't accept résumés by email at the fair. We also recommend business casual dress, such as a collared shirt or blouse with neat trousers or a skirt. And if you'd like feedback on your résumé first, drop-in reviews are available in our office every afternoon this week.",
      },
    ],
    questions: [
      q('f10-ls-an-career-fair-q1', 'purpose', 'What is the main purpose of the announcement?', [
        'To tell students how to prepare for the career fair',
        'To announce that the career fair has been moved',
        'To invite employers to register for a campus event',
        'To explain how students can write an effective résumé',
      ], 0, 'Recuerda la feria ("the fall career fair will take place next Thursday") y explica cómo inscribirse, qué llevar y cómo vestirse. No habla de cambios de fecha ni de cómo redactar un currículum.'),
      q('f10-ls-an-career-fair-q2', 'detail', 'What must students do in order to attend the fair?', [
        'Email their résumés to employers beforehand',
        'Register at the door on the day of the fair',
        'Sign up online by Tuesday afternoon',
        'Attend a résumé review earlier in the week',
      ], 2, '"You must register in advance on the Career Services website by Tuesday at five p.m." Se dice expresamente "There will be no registration at the door", y la revisión del currículum es opcional.'),
      q('f10-ls-an-career-fair-q3', 'inference', 'What will a student who wants advice on a résumé probably do?', [
        'Ask an employer at the fair to look at it',
        'Stop by the Career Services office one afternoon',
        'Email it to Career Services before Tuesday',
        'Bring it to the student center ballroom early',
      ], 1, '"Drop-in reviews are available in our office every afternoon this week." El correo electrónico solo se menciona para decir que muchos empleadores no aceptan currículums así.'),
    ],
  },
  {
    id: 'f10-ls-an-thesis-advisers',
    form: 10,
    section: 'listening',
    task: 'announcement',
    title: 'Ranking Thesis Adviser Preferences',
    topic: 'campus-life',
    difficulty: 'medium',
    context: 'Listen to a professor making an announcement at the beginning of a class.',
    script: [
      {
        speaker: 'Professor',
        voice: 'male',
        text: "Before we begin, an announcement for seniors. Starting this year, the department is changing how students are matched with thesis advisers. In the past, you had to approach faculty members yourselves, and some professors ended up with far more students than they could supervise. Now you'll fill out an online preference form instead. You'll rank your top four choices of adviser and write a short paragraph describing your proposed topic. A committee will then make the matches, trying to give each student one of their top choices while keeping every professor's group a reasonable size. The form is due on November first, and results will be sent out two weeks later. So please don't email professors asking them to supervise you directly. However, you're still welcome to visit their office hours to discuss whether your topic fits their research.",
      },
    ],
    questions: [
      q('f10-ls-an-thesis-advisers-q1', 'main-idea', 'What is the announcement mainly about?', [
        'A list of professors who are accepting thesis students',
        'A deadline extension for submitting thesis proposals',
        'A change in the topics that seniors may write about',
        'A new procedure for assigning seniors to thesis advisers',
      ], 3, '"The department is changing how students are matched with thesis advisers": ahora se usa "an online preference form". La fecha del formulario es un detalle, no una prórroga.'),
      q('f10-ls-an-thesis-advisers-q2', 'detail', 'Why did the department change the process?', [
        'Students found the old forms confusing.',
        'Some professors had too many students to supervise.',
        'Professors wanted to choose students by their grades.',
        'Many seniors were finishing without an adviser.',
      ], 1, '"Some professors ended up with far more students than they could supervise." El sistema antiguo no usaba formularios, por lo que la primera opción no tiene base en el anuncio.'),
      q('f10-ls-an-thesis-advisers-q3', 'inference', 'What is implied about visiting professors during office hours?', [
        'It is no longer allowed under the new system.',
        "It guarantees a student's first choice of adviser.",
        'It can help students decide whom to rank on the form.',
        'It is required before students submit the form.',
      ], 2, 'Se prohíbe pedir supervisión por correo, pero "you\'re still welcome to visit their office hours to discuss whether your topic fits their research", lo que ayuda a elegir a quién poner en la lista. No es obligatorio ni garantiza la primera opción.'),
    ],
  },
  {
    id: 'f10-ls-an-science-building',
    form: 10,
    section: 'listening',
    task: 'announcement',
    title: 'Science Building Construction Detours',
    topic: 'campus-life',
    difficulty: 'hard',
    context: 'Listen to an announcement on a university campus.',
    script: [
      {
        speaker: 'Announcer',
        voice: 'female',
        text: "Attention, students, faculty, and staff. Construction of the new science building begins next Monday on the former parking lot behind Harper Hall. For safety, the walkway between Harper Hall and the library will be closed for the entire project. Pedestrians should use the path along Elm Street instead, which adds about three minutes to the walk.",
      },
      {
        speaker: 'Announcer',
        voice: 'female',
        text: "Noisy work, such as drilling, will be limited to weekdays from eight a.m. to four p.m., and it will stop completely during the final exam period in December. Because the east side of Harper Hall faces the site, all classes in rooms one-oh-one through one-fifteen will move to the Chen Learning Center for the rest of the semester. Labs on the west side of the building are not affected. Updated room assignments are already posted on the registrar's website, so please check them before your next class.",
      },
    ],
    questions: [
      q('f10-ls-an-science-building-q1', 'purpose', 'What is the main purpose of the announcement?', [
        'To ask for volunteers to help plan a new building',
        'To explain why a parking lot has been closed',
        'To tell people how a construction project affects them',
        'To announce new opening hours for the campus library',
      ], 2, 'Explica los efectos de la obra: el desvío peatonal ("use the path along Elm Street"), el horario del trabajo ruidoso y el traslado de clases. El aparcamiento solo se menciona como lugar de la obra.'),
      q('f10-ls-an-science-building-q2', 'detail', 'When will noisy construction work NOT take place?', [
        'During the final exam period in December',
        'On weekday mornings before ten a.m.',
        'While classes are held in Harper Hall',
        'On days when west-side labs are meeting',
      ], 0, '"It will stop completely during the final exam period in December." El trabajo ruidoso empieza a las "eight a.m.", así que sí habrá ruido antes de las diez.'),
      q('f10-ls-an-science-building-q3', 'inference', 'What will a student with a class in Harper Hall room 108 probably do?', [
        'Walk along Elm Street to reach Harper Hall',
        'Go to the Chen Learning Center for that class',
        'Attend the class in a lab on the west side',
        'Wait until the construction work has ended',
      ], 1, 'Las aulas "one-oh-one through one-fifteen" (101–115) "will move to the Chen Learning Center", y el aula 108 está en ese rango. Los laboratorios del lado oeste no se ven afectados, pero no reciben clases trasladadas.'),
    ],
  },

  // ---------- Academic talks ----------
  {
    id: 'f10-ls-at-ozone-recovery',
    form: 10,
    section: 'listening',
    task: 'academic-talk',
    title: 'Repairing the Ozone Layer',
    topic: 'environment',
    difficulty: 'easy',
    context: 'Listen to part of a lecture in an environmental science class.',
    script: [
      { speaker: 'Professor', voice: 'female', text: "Today let's look at one of the real success stories in environmental policy: the ozone layer. High up in the stratosphere, roughly fifteen to thirty-five kilometers above the ground, there's a layer where ozone is concentrated. Ozone absorbs most of the sun's ultraviolet-B radiation, the kind that causes sunburn and skin cancer and damages crops. So it acts like a sunscreen for the whole planet." },
      { speaker: 'Professor', voice: 'female', text: "In the 1970s, chemists began to suspect that a group of human-made chemicals called CFCs, or chlorofluorocarbons, were a threat to that layer. CFCs were everywhere back then: in refrigerators, air conditioners, and aerosol spray cans. They were popular precisely because they're so stable; they hardly react with anything at ground level. But that stability means they drift up to the stratosphere intact. There, strong ultraviolet light breaks them apart and releases chlorine, and a single chlorine atom can destroy thousands of ozone molecules." },
      { speaker: 'Professor', voice: 'female', text: 'Then, in 1985, British scientists working in Antarctica reported that ozone levels over the South Pole were dropping sharply every spring. This became known as the ozone hole, and it got the attention of the world very quickly.' },
      { speaker: 'Professor', voice: 'female', text: 'Just two years later, in 1987, countries signed the Montreal Protocol, an agreement to phase out CFCs and related chemicals. It was strengthened several times, and eventually every member of the United Nations ratified it. Production of CFCs has essentially stopped worldwide.' },
      { speaker: 'Professor', voice: 'female', text: "Now, here's the important part: the hole didn't close overnight. CFCs can stay in the atmosphere for decades, so the chlorine already up there kept doing damage. But measurements now show the ozone layer slowly healing, and scientists expect the Antarctic ozone hole to recover to its 1980 condition around the 2060s. So when people ask whether international environmental agreements can actually work, this is the example I usually point to." },
    ],
    questions: [
      q('f10-ls-at-ozone-recovery-q1', 'main-idea', 'What is the lecture mainly about?', [
        'Why CFCs were useful in refrigerators and spray cans',
        'How ultraviolet radiation causes sunburn and skin cancer',
        'How scientists in Antarctica measure ozone each spring',
        'How a global agreement helped the ozone layer recover',
      ], 3, 'La profesora presenta el tema como "one of the real success stories in environmental policy": cómo el "Montreal Protocol" eliminó los CFC y la capa se está "slowly healing". Los usos de los CFC y la radiación UV son detalles de apoyo.'),
      q('f10-ls-at-ozone-recovery-q2', 'detail', 'According to the professor, why were CFCs able to reach the stratosphere?', [
        'They were released directly by high-flying aircraft.',
        'They were too stable to break down near the ground.',
        'They reacted with ozone at ground level and then rose.',
        'They were carried upward by ultraviolet light.',
      ], 1, '"They hardly react with anything at ground level. But that stability means they drift up to the stratosphere intact." La luz ultravioleta los rompe arriba; no los transporta.'),
      q('f10-ls-at-ozone-recovery-q3', 'organization', 'Why does the professor mention the year 1985?', [
        'To show when CFCs were first used in spray cans',
        'To explain when the Montreal Protocol took effect',
        'To mark a discovery that drew attention to the problem',
        'To indicate when the ozone layer started to recover',
      ], 2, 'En 1985 "British scientists… reported that ozone levels over the South Pole were dropping sharply", y "it got the attention of the world very quickly". El Protocolo de Montreal es de 1987, no de 1985.'),
      q('f10-ls-at-ozone-recovery-q4', 'inference', 'What does the professor imply about the Montreal Protocol?', [
        'It shows that global agreements can work.',
        'It failed because the ozone hole did not close at once.',
        'It banned CFCs before scientists understood the danger.',
        'It will soon need to be replaced by a stronger treaty.',
      ], 0, 'Termina diciendo que, cuando se pregunta "whether international environmental agreements can actually work, this is the example I usually point to". Que el agujero no se cerrara "overnight" se debe a la larga vida de los CFC, no a un fracaso del acuerdo.'),
    ],
  },
  {
    id: 'f10-ls-at-network-effects',
    form: 10,
    section: 'listening',
    task: 'academic-talk',
    title: 'Why Networks Gain Value With Users',
    topic: 'economics',
    difficulty: 'medium',
    context: 'Listen to part of a lecture in an economics class.',
    script: [
      { speaker: 'Professor', voice: 'male', text: "Let's start with a simple question. What is one telephone worth? If you're the only person in the world who owns one, the answer is basically nothing. There's nobody to call. Once a second person buys a phone, both phones suddenly become useful. And every new user makes the network more valuable for everyone already on it. Economists call this a network effect." },
      { speaker: 'Professor', voice: 'male', text: 'You can see why the value grows so fast if you count possible connections. Two phones allow one connection. Five phones allow ten. With a hundred users, there are nearly five thousand possible pairs. The number of users goes up steadily, but the number of possible connections grows much faster.' },
      { speaker: 'Student', voice: 'female', text: 'So is that the same reason everyone ends up using the same messaging app?' },
      { speaker: 'Professor', voice: 'male', text: "Exactly. That's a direct network effect: the users benefit from each other. There are also indirect network effects. Think of a video game console. Players don't necessarily communicate through it, but the more people own a console, the more game studios want to make games for it, and more games attract even more buyers." },
      { speaker: 'Professor', voice: 'male', text: "This creates a challenge for new products, sometimes called the chicken-and-egg problem. Nobody wants to join an empty network. So companies often sell the product cheaply, or even give it away, at the beginning, hoping to reach a critical mass of users. After that point, growth can feed itself." },
      { speaker: 'Professor', voice: 'male', text: "It also explains why these markets often end up dominated by one or two firms. Once a network is large, even a better product may struggle, because switching means leaving all your contacts behind. Economists call that lock-in." },
    ],
    questions: [
      q('f10-ls-at-network-effects-q1', 'main-idea', 'What is the lecture mainly about?', [
        'The history of the telephone and its first users',
        'How a product can gain value as more people use it',
        'Why game studios prefer some consoles to others',
        'How companies set prices for messaging apps',
      ], 1, 'El tema central es el "network effect": "every new user makes the network more valuable for everyone already on it". El teléfono y las consolas son ejemplos, no el tema.'),
      q('f10-ls-at-network-effects-q2', 'detail', 'According to the professor, why do companies sometimes sell a new network product very cheaply?', [
        "To make up for the product's lack of features",
        'To keep users from switching to a competitor',
        'To follow rules against one firm controlling a market',
        'To attract enough users for growth to sustain itself',
      ], 3, 'Lo hacen "hoping to reach a critical mass of users. After that point, growth can feed itself." Evitar que los usuarios cambien de producto es el "lock-in", que es consecuencia de una red grande, no el motivo del precio bajo.'),
      q('f10-ls-at-network-effects-q3', 'organization', 'Why does the professor mention a video game console?', [
        'To give an example of an indirect network effect',
        'To give an example of the chicken-and-egg problem',
        'To contrast an unsuccessful product with the telephone',
        'To explain how users become locked into one product',
      ], 0, 'Tras decir "There are also indirect network effects", pone el ejemplo de la consola: más jugadores atraen a más estudios, y más juegos atraen a más compradores.'),
      q('f10-ls-at-network-effects-q4', 'inference', 'What can be inferred about a new messaging app that is better than the most popular one?', [
        'It will quickly replace the popular app.',
        'It will gain value mainly from indirect effects.',
        'It may struggle to attract users from the leader.',
        'It will have to charge more than the popular app.',
      ], 2, 'El profesor afirma que "even a better product may struggle, because switching means leaving all your contacts behind" (el "lock-in"). Por eso no es probable que sustituya rápidamente a la app popular.'),
    ],
  },
  {
    id: 'f10-ls-at-concentric-zones',
    form: 10,
    section: 'listening',
    task: 'academic-talk',
    title: 'Burgess and the Concentric City',
    topic: 'sociology',
    difficulty: 'hard',
    context: 'Listen to part of a lecture in a sociology class.',
    script: [
      { speaker: 'Professor', voice: 'female', text: "Today we're looking at one of the earliest attempts to explain how cities grow: the concentric zone model. It was proposed in the 1920s by Ernest Burgess, a sociologist at the University of Chicago. Burgess and his colleagues, who became known as the Chicago School, treated the city almost like a natural environment. In fact, they borrowed ideas from plant ecology and called their approach human ecology." },
      { speaker: 'Professor', voice: 'female', text: "Burgess pictured the city as a set of rings around a center. In the middle is the central business district, with offices, department stores, and banks. Around it is what he called the zone in transition. This was the most unstable area: older houses divided into cheap rooms, factories moving in, and many newly arrived immigrants who couldn't afford to live anywhere else." },
      { speaker: 'Professor', voice: 'female', text: 'Beyond that came a ring of working-class homes, often occupied by families who had moved out of the transition zone once they were a bit more established. Then a residential zone of middle-class houses and apartments, and finally, at the edge, a commuter zone of suburbs, home to people who traveled into the center each day.' },
      { speaker: 'Professor', voice: 'female', text: 'Now, the key idea is that the rings are not fixed. As the city grows, each zone expands outward into the next one. Burgess used the terms invasion and succession for this, the way one plant species gradually replaces another in a field. A new group moves into a neighborhood, the older residents move farther out, and the character of the area changes.' },
      { speaker: 'Professor', voice: 'female', text: "The model was influential, but it has real limits. It was based on Chicago, a city on flat land with one dominant downtown. Many cities don't look like that. Some have several business centers, and transportation lines like railways and highways tend to pull development outward in wedges rather than neat circles. And in a number of cities, especially outside North America, wealthier families have traditionally lived near the center, the reverse of Burgess's pattern." },
      { speaker: 'Professor', voice: 'female', text: 'So why do we still teach it? Because it was one of the first models to connect where people live with social processes like migration and mobility, and many later models were built by revising it.' },
    ],
    questions: [
      q('f10-ls-at-concentric-zones-q1', 'main-idea', 'What is the lecture mainly about?', [
        "How immigrants changed Chicago's business district",
        'Why plant ecology became part of sociology',
        'An early model of city growth and its limitations',
        'How highways shaped cities outside North America',
      ], 2, 'La clase explica "the concentric zone model", "one of the earliest attempts to explain how cities grow", y luego sus "real limits". La ecología vegetal y las autopistas son detalles dentro de esa explicación.'),
      q('f10-ls-at-concentric-zones-q2', 'detail', 'According to the professor, what characterized the zone in transition?', [
        'Cheap rooms, factories, and newly arrived immigrants',
        'Middle-class houses and large apartment buildings',
        'Offices, department stores, and major banks',
        'Suburbs where daily commuters made their homes',
      ], 0, 'La zona en transición tenía "older houses divided into cheap rooms, factories moving in, and many newly arrived immigrants". Las oficinas y bancos pertenecen al "central business district".'),
      q('f10-ls-at-concentric-zones-q3', 'organization', 'Why does the professor mention one plant species replacing another?', [
        'To show that Burgess was first trained as a biologist',
        'To explain why cities on flat land grow in circles',
        'To contrast natural change with planned urban growth',
        'To clarify how neighborhoods change as a city expands',
      ], 3, 'Lo usa para explicar "invasion and succession": "A new group moves into a neighborhood, the older residents move farther out, and the character of the area changes." No dice nada sobre la formación de Burgess.'),
      q('f10-ls-at-concentric-zones-q4', 'inference', "What can be inferred about the professor's view of the concentric zone model?", [
        'It accurately describes most cities today.',
        'It is flawed but still worth studying.',
        'It should no longer be taught in sociology.',
        'It fits cities outside North America better.',
      ], 1, 'Reconoce que "it has real limits", pero pregunta "So why do we still teach it?" y destaca que conectó la vivienda con "migration and mobility". Lo de fuera de Norteamérica es precisamente un contraejemplo al modelo.'),
    ],
  },
];
