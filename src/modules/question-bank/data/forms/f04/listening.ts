import type { Difficulty, ListeningSet, Topic, Voice } from '../../../types';

/** Simulación n.º 4 — Listening (contenido original). */

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
    form: 4,
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
  cr('f04-ls-cr-quiz-chapter', 'easy', 'female', "Which chapter is Friday's quiz going to cover?", [
    "I'll cover for you on Friday.",
    'Just chapter six, on cell division.',
    'The quiz was easier than I expected.',
    'I usually go to the gym on Fridays.',
  ], 1, 'Es una pregunta con "Which chapter"; la única respuesta que da un capítulo es "Just chapter six". La primera opción repite "cover" con otro significado (sustituir a alguien) y la tercera habla en pasado de un examen que aún no ha ocurrido.'),
  cr('f04-ls-cr-phone-charger', 'easy', 'male', 'Could I borrow your phone charger for an hour? Mine just broke.', [
    "Sure, it's on my desk. Help yourself.",
    'It takes about an hour to charge.',
    "No, I didn't borrow it from anyone.",
    'My phone is a different color.',
  ], 0, 'Es una petición ("Could I borrow…?"); la respuesta natural la concede: "Sure… Help yourself". La segunda opción repite "an hour" sin responder, y la tercera confunde quién pide prestado.', 'daily-life'),
  cr('f04-ls-cr-basketball-ticket', 'easy', 'female', "I have an extra ticket to tonight's basketball game. Do you want to come?", [
    'I played basketball in high school.',
    'The tickets were sold out last night.',
    'Yes, the game was really exciting.',
    "I'd love to! What time does it start?",
  ], 3, 'Es una invitación; se acepta ("I\'d love to!") y se pide un dato útil (la hora). "The game was really exciting" usa el pasado para un partido que es esta noche.'),
  cr('f04-ls-cr-animal-shelter', 'easy', 'male', 'So, how did the volunteer day at the animal shelter go?', [
    "I'm going to volunteer there next Saturday.",
    'The shelter is on the other side of town.',
    'Great! I spent the whole morning walking dogs.',
    'Yes, I have two cats and a dog at home.',
  ], 2, '"How did… go?" pide una valoración de algo ya ocurrido: "Great! I spent the whole morning walking dogs". La primera opción habla del futuro y la segunda responde a "where", no a "how".', 'daily-life'),
  cr('f04-ls-cr-lab-thanks', 'easy', 'female', 'Thanks so much for staying late to finish the experiment with me.', [
    "No problem. I'm glad we got it done.",
    'The experiment starts at eight tomorrow.',
    "You're late for the lab again.",
    "I'll stay home tonight, I think.",
  ], 0, 'Ante un agradecimiento, lo natural es restarle importancia: "No problem. I\'m glad we got it done". Las demás repiten palabras del enunciado ("late", "stay", "experiment") sin responder al "Thanks".'),
  cr('f04-ls-cr-borrow-bike', 'easy', 'male', 'Do you mind if I borrow your bike this afternoon?', [
    'Yes, I bought it last summer.',
    'Not at all. Just bring it back by six.',
    'I rode it to class this morning.',
    'It is a mountain bike with ten gears.',
  ], 1, '"Do you mind if…?" significa "¿te importa si…?"; "Not at all" (no me importa) da permiso, y se añade una condición. Ojo: "Yes" significaría "sí me importa", y además la primera opción no tiene relación con la petición.', 'daily-life'),

  // ---------- Listen and Choose a Response: medium ----------
  cr('f04-ls-cr-move-couch', 'medium', 'female', 'Would it be a problem if I borrowed your car on Saturday to move a couch?', [
    'Yes, I moved into my apartment last year.',
    'That couch looks really comfortable.',
    'Not at all, as long as you fill up the tank.',
    'My car had a problem on Saturday.',
  ], 2, 'Es una petición indirecta ("Would it be a problem if…?"). "Not at all" indica que no hay problema, con una condición razonable. La última opción repite "problem" y "Saturday" pero no responde.', 'daily-life'),
  cr('f04-ls-cr-cold-library', 'medium', 'male', "The library's air conditioning is set way too cold. I can barely feel my fingers.", [
    "I'll set the table for dinner.",
    'Yes, the library closes at midnight.',
    'The air in the mountains is cleaner.',
    'I know! I always bring a sweater now.',
  ], 3, 'Es una queja; la respuesta natural muestra acuerdo y comparte una solución: "I know! I always bring a sweater". Las otras opciones reutilizan palabras ("set", "library", "air") con otro sentido.'),
  cr('f04-ls-cr-single-double', 'medium', 'female', 'Would you rather live in a single or a double room next year?', [
    'A single, definitely. I need my own space.',
    "Yes, I'd rather live there next year.",
    'I lived in a double room last year.',
    'The rooms are all on the second floor.',
  ], 0, 'Es una pregunta de elección ("single or double"), así que se responde eligiendo una opción: "A single, definitely". Responder "Yes" no tiene sentido ante dos alternativas, y la tercera habla del año pasado, no de la preferencia para el próximo.'),
  cr('f04-ls-cr-moved-out', 'medium', 'male', "Didn't you move out of the dorm last month?", [
    'The dorm is right next to the new gym.',
    'Yes, I have an apartment downtown now.',
    "I'll help you move out this weekend.",
    'No, I never liked the dorm food much.',
  ], 1, 'La pregunta negativa ("Didn\'t you…?") busca confirmar algo; "Yes, I have an apartment downtown now" lo confirma y añade información. La tercera opción cambia la persona (quien se muda es el oyente, no el hablante).'),
  cr('f04-ls-cr-club-role', 'medium', 'female', "We'd like you to be our event coordinator, but only if you can come to every weekly meeting.", [
    'I coordinated my schedule yesterday.',
    'The meetings were held every week.',
    "I'd be glad to. I can make it every week.",
    'Yes, the club has a lot of members.',
  ], 2, 'Es una oferta condicionada ("only if you can come to every weekly meeting"); la respuesta adecuada la acepta y confirma la condición: "I can make it every week". Las demás repiten "coordinator" o "every week" sin aceptar ni rechazar.'),
  cr('f04-ls-cr-professor-email', 'medium', 'male', "I'm worried Professor Kim never got my email about the extension.", [
    'The extension cord is under my desk.',
    'Yes, I emailed my parents yesterday.',
    'Professor Kim teaches on Tuesdays.',
    'Why not stop by her office hours to check?',
  ], 3, 'El hablante expresa una preocupación; lo natural es sugerir una solución: "Why not stop by her office hours to check?". La primera opción es una trampa de sonido: "extension cord" (alargador) no tiene nada que ver con una prórroga.'),

  // ---------- Listen and Choose a Response: hard ----------
  cr('f04-ls-cr-borrow-camera', 'hard', 'female', "Could I borrow your camera for my hiking trip this weekend? I promise I'll be really careful with it.", [
    'I took a lot of great photos on my last hiking trip.',
    'Yes, the camera was very expensive when I bought it.',
    "I'd rather not. It was a gift, and I'd be too nervous.",
    'You should always be careful when you go hiking alone.',
  ], 2, 'Es una petición, y la única respuesta adecuada es una negativa cortés que da una razón: "I\'d rather not. It was a gift…". "Yes, the camera was very expensive" empieza con "Yes" pero no concede el préstamo; la última solo repite "careful".'),
  cr('f04-ls-cr-ball-court', 'hard', 'male', "I've given you three possible topics for your paper. Now the ball is in your court.", [
    "Thanks. I'll pick one by Friday.",
    "I didn't know you played basketball, Professor.",
    "So you'll pick the topic for me, then?",
    'The court near the gym was closed for repairs.',
  ], 0, '"The ball is in your court" significa que ahora la decisión es del estudiante. Por eso la respuesta es "I\'ll pick one by Friday". La tercera opción entiende lo contrario (que decidirá el profesor), y la segunda y la cuarta interpretan la frase literalmente.'),
  cr('f04-ls-cr-top-shelf', 'hard', 'female', 'Ugh, I can never reach that top shelf.', [
    'The shelf was put up last year.',
    "I can't reach you by phone either.",
    'Top grades are hard to get in this lab.',
    'Here, let me get that down for you.',
  ], 3, 'Es una petición implícita: la compañera no pide ayuda directamente, pero la necesita. "Here, let me get that down for you" responde a esa necesidad. La segunda opción juega con otro sentido de "reach" (contactar).'),
  cr('f04-ls-cr-early-packing', 'hard', 'male', "Don't you think it's a bit early to start packing? We don't leave until next Friday.", [
    'Yes, we left for the trip last Friday.',
    'Maybe, but I like to be ready ahead of time.',
    "I think it's about seven o'clock right now.",
    "I'll pack your lunch for you tomorrow morning.",
  ], 1, 'La pregunta expresa una opinión implícita (es demasiado pronto para hacer la maleta). "Maybe, but I like to be ready ahead of time" reconoce la opinión y se justifica. La tercera opción interpreta "early" como una pregunta sobre la hora.'),
  cr('f04-ls-cr-seafood-place', 'hard', 'female', "That new seafood place isn't cheap, I'll tell you that.", [
    "Great, let's eat there every week, then.",
    'What exactly did you tell them about it?',
    "Then let's save it for a special occasion.",
    "I've never been fishing in the ocean before.",
  ], 2, '"Isn\'t cheap, I\'ll tell you that" es una forma enfática de decir que es muy caro. La respuesta lógica ("Then let\'s save it for a special occasion") propone reservarlo para una ocasión especial. La primera opción lo entiende al revés y la segunda toma "I\'ll tell you that" de forma literal.', 'daily-life'),
  cr('f04-ls-cr-bathroom', 'hard', 'male', "I noticed the bathroom hasn't been cleaned in a while.", [
    "Sorry, it's my turn. I'll do it tonight.",
    'Yes, I noticed you at the gym yesterday.',
    'The bathroom is at the end of the hall.',
    'I cleaned my car and my bike last weekend.',
  ], 0, 'El compañero no solo describe el baño: se queja de forma indirecta. La respuesta adecuada reconoce la responsabilidad y ofrece una solución: "Sorry, it\'s my turn". Las demás repiten "noticed", "bathroom" o "cleaned" sin responder a la queja.', 'daily-life'),

  // ---------- Listen to a Conversation ----------
  {
    id: 'f04-ls-cv-volleyball-waitlist',
    form: 4,
    section: 'listening',
    task: 'conversation',
    title: 'Volleyball League Waitlist',
    topic: 'campus-life',
    difficulty: 'easy',
    context: 'Listen to a conversation between a student and an employee at the recreation center.',
    script: [
      { speaker: 'Student', voice: 'female', text: "Hi, I'd like to sign up for the intramural volleyball league. Is this the right place?" },
      { speaker: 'Employee', voice: 'male', text: "It is, but I'm afraid the league filled up yesterday. All twelve teams already have full rosters." },
      { speaker: 'Student', voice: 'female', text: 'Oh no. I was really hoping to play this semester. Is there anything I can do?' },
      { speaker: 'Employee', voice: 'male', text: 'You have two options. First, I can put you on the waitlist. If a player drops out, the team captain gets the list and usually picks the first name on it.' },
      { speaker: 'Student', voice: 'female', text: 'How often does that happen?' },
      { speaker: 'Employee', voice: 'male', text: "Honestly, maybe two or three times a season, so it's not very likely. The other option is to register a brand-new team. We can still add up to four more teams this week." },
      { speaker: 'Student', voice: 'female', text: 'A new team? How many players would I need?' },
      { speaker: 'Employee', voice: 'male', text: 'At least six. And one person has to be the captain and complete a short online training. The deadline is Friday at five.' },
      { speaker: 'Student', voice: 'female', text: 'My roommate and a few friends from my chemistry class said they wanted to play, too. I think I could get six people.' },
      { speaker: 'Employee', voice: 'male', text: "Great. Here's the form. Bring it back with everyone's student ID numbers by Friday. And put your name on the waitlist too, just in case." },
      { speaker: 'Student', voice: 'female', text: "That's a good idea. Thanks so much!" },
    ],
    questions: [
      {
        id: 'f04-ls-cv-volleyball-waitlist-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: "What is the student's problem?",
        options: [
          'She missed the training for team captains.',
          'She does not have enough players for a team.',
          'The volleyball league she wants to join is full.',
          'Her student ID number is not in the system.',
        ],
        answer: [2],
        explanation:
          'El empleado le dice: "the league filled up yesterday. All twelve teams already have full rosters". La falta de jugadores no es su problema inicial: ella cree que puede reunir a seis personas.',
      },
      {
        id: 'f04-ls-cv-volleyball-waitlist-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'According to the man, what does a new team need?',
        options: [
          'At least six players and a trained captain',
          'Twelve players and a faculty coach',
          'Permission from another team captain',
          'A registration fee paid before Friday',
        ],
        answer: [0],
        explanation:
          'El empleado dice "At least six" y añade que "one person has to be the captain and complete a short online training". "Twelve" es el número de equipos, no de jugadores.',
      },
      {
        id: 'f04-ls-cv-volleyball-waitlist-q3',
        kind: 'single',
        skill: 'inference',
        prompt: 'What will the student probably do next?',
        options: [
          'Wait until next semester to play volleyball',
          'Ask a team captain to let her join',
          'Join a team organized by the chemistry department',
          'Ask her roommate and friends to form a team',
        ],
        answer: [3],
        explanation:
          'Ella menciona que "My roommate and a few friends from my chemistry class said they wanted to play" y que puede reunir a seis personas; además, recibe el formulario. La química es solo la clase donde conoció a sus amigos, no un equipo del departamento.',
      },
    ],
  },
  {
    id: 'f04-ls-cv-sleep-survey',
    form: 4,
    section: 'listening',
    task: 'conversation',
    title: 'Designing a Sleep Survey',
    topic: 'sociology',
    difficulty: 'medium',
    context: 'Listen to a conversation between two students working on a sociology project.',
    script: [
      { speaker: 'Priya', voice: 'female', text: "OK, we need to finalize our survey on sleep habits. I drafted the first question: 'Don't you agree that students get too little sleep?'" },
      { speaker: 'Daniel', voice: 'male', text: "Hmm, I'm worried about that wording. It kind of pushes people toward saying yes. Professor Hale called that a leading question in class last week." },
      { speaker: 'Priya', voice: 'female', text: "You're right. What if we just ask, 'On a typical school night, how many hours do you sleep?' and give them ranges to choose from?" },
      { speaker: 'Daniel', voice: 'male', text: 'That sounds much more neutral. And ranges are easier to analyze than open answers. Should we ask about weekends separately?' },
      { speaker: 'Priya', voice: 'female', text: 'Definitely. A lot of people catch up on sleep on Saturdays, so a single number would hide that. Now, how many students should we survey?' },
      { speaker: 'Daniel', voice: 'male', text: 'I was thinking twenty. We could just ask people in our dorm.' },
      { speaker: 'Priya', voice: 'female', text: "Twenty seems too small. And if they all live in our dorm, they'd probably have pretty similar schedules. The guidelines say the sample should reflect the whole student body." },
      { speaker: 'Daniel', voice: 'male', text: 'Fair point. Maybe a hundred, then? We could set up a table outside the student center and the library at different times of day.' },
      { speaker: 'Priya', voice: 'female', text: 'That works. And we should record what year each person is in, so we can compare first-year students with seniors.' },
      { speaker: 'Daniel', voice: 'male', text: "Good idea. I'll revise the questions tonight and send them to you." },
    ],
    questions: [
      {
        id: 'f04-ls-cv-sleep-survey-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'What are the students mainly discussing?',
        options: [
          'Why university students do not get enough sleep',
          'How to design a survey for their class project',
          'Which professor to ask for help with their research',
          'The results of a survey about weekend activities',
        ],
        answer: [1],
        explanation:
          'Desde el principio ("we need to finalize our survey on sleep habits") hablan de cómo redactar las preguntas y a cuántos estudiantes encuestar. No comentan resultados: la encuesta aún no se ha hecho.',
      },
      {
        id: 'f04-ls-cv-sleep-survey-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'Why does the woman object to surveying twenty students from their dorm?',
        options: [
          'Dorm residents usually refuse to answer surveys.',
          'The professor told them to survey only seniors.',
          'Interviewing twenty students would take too long.',
          'The group would be too small and too similar.',
        ],
        answer: [3],
        explanation:
          'Priya dice "Twenty seems too small" y que los residentes "would probably have pretty similar schedules"; la muestra debe "reflect the whole student body". Los "seniors" solo aparecen como grupo de comparación.',
      },
      {
        id: 'f04-ls-cv-sleep-survey-q3',
        kind: 'single',
        skill: 'function',
        prompt: 'Why does the man mention what Professor Hale said in class?',
        options: [
          'To support his concern about how a question is worded',
          'To suggest that they ask the professor to write the survey',
          'To explain why the survey should ask about weekends',
          'To show that the professor disliked their research topic',
        ],
        answer: [0],
        explanation:
          'Daniel critica la redacción de la pregunta ("I\'m worried about that wording") y la respalda citando al profesor: "Professor Hale called that a leading question". No propone que el profesor escriba la encuesta.',
      },
    ],
  },
  {
    id: 'f04-ls-cv-manuscript-dates',
    form: 4,
    section: 'listening',
    task: 'conversation',
    title: 'Dating a Medieval Manuscript',
    topic: 'history',
    difficulty: 'hard',
    context: 'Listen to a conversation between two students who are writing a history paper together.',
    script: [
      { speaker: 'Elena', voice: 'female', text: "I've hit a problem with our section on the psalter. The museum catalog dates the manuscript to around 1150, but the article by Dr. Weiss puts it closer to 1200." },
      { speaker: 'Marcus', voice: 'male', text: "Fifty years is a big gap. What does each one base its date on?" },
      { speaker: 'Elena', voice: 'female', text: "The catalog relies on the handwriting. The script looks like what scribes in that region used in the mid-twelfth century. Weiss argues from the illustrations. She says that style of painting the figures didn't appear until later." },
      { speaker: 'Marcus', voice: 'male', text: 'So maybe both are right, in a way. Could the text have been copied first and the pictures added decades later? That happened sometimes, right?' },
      { speaker: 'Elena', voice: 'female', text: 'It did. Actually, Weiss mentions that some of the paintings cover small corrections in the text, which would fit your idea.' },
      { speaker: 'Marcus', voice: 'male', text: "Then the date depends on what we mean by 'the manuscript.' But we can't settle it ourselves. Neither of us is an expert on medieval handwriting." },
      { speaker: 'Elena', voice: 'female', text: "True. So should we just go with the more recent source? Weiss's article only came out a few years ago." },
      { speaker: 'Marcus', voice: 'male', text: "Newer isn't automatically better. I think we should give both dates, explain the evidence behind each one, and mention the two-stage idea, since Weiss's own observation supports it." },
      { speaker: 'Elena', voice: 'female', text: 'So a short paragraph that lays out the disagreement, instead of hiding it in a footnote.' },
      { speaker: 'Marcus', voice: 'male', text: 'Exactly. Our professor said the strongest papers show how historians know what they know. This is a perfect example.' },
      { speaker: 'Elena', voice: 'female', text: "OK. I'll draft that paragraph tonight, and you can check the catalog's bibliography for any newer studies." },
    ],
    questions: [
      {
        id: 'f04-ls-cv-manuscript-dates-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'What are the students mainly discussing?',
        options: [
          'Whether a museum catalog contains copying errors',
          'Which of two professors to ask about a manuscript',
          'How medieval scribes trained their apprentices',
          'How to handle conflicting dates for a manuscript',
        ],
        answer: [3],
        explanation:
          'El problema es que el catálogo fecha el manuscrito "around 1150" y el artículo "closer to 1200"; deciden cómo presentar ese desacuerdo en el trabajo. Las correcciones del texto son un detalle, no el tema.',
      },
      {
        id: 'f04-ls-cv-manuscript-dates-q2',
        kind: 'single',
        skill: 'detail',
        prompt: "According to the woman, what is the museum catalog's date based on?",
        options: [
          'The style of the illustrations',
          'Corrections made to the text',
          'The style of the handwriting',
          'A recently published article',
        ],
        answer: [2],
        explanation:
          'Elena explica: "The catalog relies on the handwriting". El estilo de las ilustraciones es el argumento de Weiss, no del catálogo.',
      },
      {
        id: 'f04-ls-cv-manuscript-dates-q3',
        kind: 'single',
        skill: 'attitude',
        prompt: 'What is the man\'s opinion about relying on the more recent source?',
        options: [
          'He thinks it is the safest choice for their paper.',
          'He thinks a newer study is not necessarily more reliable.',
          'He thinks it should be mentioned only in a footnote.',
          'He thinks it was written by a handwriting expert.',
        ],
        answer: [1],
        explanation:
          'Marcus responde "Newer isn\'t automatically better" y propone presentar las dos fechas. La idea de la nota al pie la rechazan: quieren un párrafo "instead of hiding it in a footnote".',
      },
    ],
  },

  // ---------- Listen to an Announcement ----------
  {
    id: 'f04-ls-an-choir-concert',
    form: 4,
    section: 'listening',
    task: 'announcement',
    title: 'Choir Spring Concert Tickets',
    topic: 'art',
    difficulty: 'easy',
    context: 'Listen to an announcement on a university campus.',
    script: [
      {
        speaker: 'Announcer',
        voice: 'female',
        text: "Good afternoon, everyone. The Department of Music is proud to present the University Choir's spring concert on Friday, April twenty-fourth, at seven-thirty p.m. in Harmon Concert Hall. This year's program features music from five centuries, ending with a piece written especially for the choir by one of our own composition students. Tickets are free for students, but you do need one to get in. You can pick up your ticket at the box office in the Arts Center lobby, Monday through Friday from noon to five. Just bring your student ID; there's a limit of one ticket per ID. Tickets for friends and family cost ten dollars. Student tickets usually run out several days before the concert, so don't wait too long!",
      },
    ],
    questions: [
      {
        id: 'f04-ls-an-choir-concert-q1',
        kind: 'single',
        skill: 'purpose',
        prompt: 'What is the main purpose of the announcement?',
        options: [
          'To promote a concert and explain how to get tickets',
          'To invite students to audition for the choir',
          'To announce new opening hours for the box office',
          'To ask composition students to submit new music',
        ],
        answer: [0],
        explanation:
          'El anuncio presenta "the University Choir\'s spring concert" y explica dónde y cómo conseguir las entradas. La obra del estudiante de composición ya está escrita; no se pide que envíen música nueva.',
      },
      {
        id: 'f04-ls-an-choir-concert-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'What must students bring to get a free ticket?',
        options: [
          'Ten dollars in cash',
          'A printed online reservation',
          'Their student ID',
          'A friend or family member',
        ],
        answer: [2],
        explanation:
          'El anunciante dice: "Just bring your student ID". Los "ten dollars" son el precio de las entradas para amigos y familiares, no para estudiantes.',
      },
      {
        id: 'f04-ls-an-choir-concert-q3',
        kind: 'single',
        skill: 'inference',
        prompt: 'What does the speaker imply about student tickets?',
        options: [
          'Each student can collect several of them.',
          'Students who wait too long may not get one.',
          'They will also be given out at the door.',
          'Family members can get them with a student ID.',
        ],
        answer: [1],
        explanation:
          'Las entradas "usually run out several days before the concert, so don\'t wait too long": quien espere demasiado puede quedarse sin entrada. Además, hay "a limit of one ticket per ID", así que no se pueden recoger varias.',
      },
    ],
  },
  {
    id: 'f04-ls-an-midterm-review',
    form: 4,
    section: 'listening',
    task: 'announcement',
    title: 'Midterm Review Session Details',
    topic: 'campus-life',
    difficulty: 'medium',
    context: 'Listen to a teaching assistant making an announcement at the end of a psychology class.',
    script: [
      {
        speaker: 'Announcer',
        voice: 'male',
        text: "Hi, everyone. Before you go, a quick announcement about the midterm. I'll be running a review session next Tuesday from six to eight p.m. Please note that it's not in our usual lecture hall. It's in Room 210 of the Carver Building, because the lecture hall is booked that evening.",
      },
      {
        speaker: 'Announcer',
        voice: 'male',
        text: "The session will be built around a practice exam that I'll post online on Monday morning. It has the same format as the real midterm: thirty multiple-choice questions and two short essays. Try the multiple-choice part on your own before Tuesday and bring your answers. We won't go through every question. Instead, we'll focus on the ones most of you got wrong, so at the start I'll ask you to vote on which ones those are. Then we'll spend the second hour outlining the essay questions together.",
      },
    ],
    questions: [
      {
        id: 'f04-ls-an-midterm-review-q1',
        kind: 'single',
        skill: 'purpose',
        prompt: 'What is the main purpose of the announcement?',
        options: [
          'To explain why the midterm exam has been postponed',
          'To say that the lecture hall will be closed for repairs',
          'To return students\' grades on a practice exam',
          'To give details about a review session before an exam',
        ],
        answer: [3],
        explanation:
          'El asistente anuncia "a review session next Tuesday" y explica lugar, horario y formato. El aula no está en obras: simplemente "is booked that evening".',
      },
      {
        id: 'f04-ls-an-midterm-review-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'Where will the review session take place?',
        options: [
          'In the usual lecture hall',
          'In a room in the Carver Building',
          'In an online meeting room',
          'In the teaching assistant\'s office',
        ],
        answer: [1],
        explanation:
          'Dice: "it\'s not in our usual lecture hall. It\'s in Room 210 of the Carver Building". Lo único que estará en línea es el examen de práctica ("I\'ll post online").',
      },
      {
        id: 'f04-ls-an-midterm-review-q3',
        kind: 'single',
        skill: 'inference',
        prompt: 'What will students probably do at the beginning of the session?',
        options: [
          'Take the whole practice exam under timed conditions',
          'Write outlines for the two essay questions',
          'Show which multiple-choice questions they found hard',
          'Hand in their essays for the assistant to grade',
        ],
        answer: [2],
        explanation:
          'El asistente dice que "at the start I\'ll ask you to vote" sobre las preguntas que más fallaron; es decir, indicarán cuáles les resultaron difíciles. Los esquemas de los ensayos se harán en "the second hour", no al principio.',
      },
    ],
  },
  {
    id: 'f04-ls-an-dig-rules',
    form: 4,
    section: 'listening',
    task: 'announcement',
    title: 'Rules for Dig Volunteers',
    topic: 'history',
    difficulty: 'hard',
    context: 'Listen to a professor speaking to volunteers at an archaeological excavation.',
    script: [
      {
        speaker: 'Professor',
        voice: 'female',
        text: "Welcome, volunteers, and thank you for joining the excavation at the Mill Creek site this summer. Before you pick up a trowel, there are three rules you need to know. First, when you uncover something, leave it exactly where it is. An artifact's position, its depth, and what's lying next to it often tell us more than the object itself, so call a supervisor, who will photograph it and record its location before anything is lifted.",
      },
      {
        speaker: 'Professor',
        voice: 'female',
        text: "Second, nothing leaves the site. Not even a small piece of pottery you think is worthless. Removing artifacts is against state law, and it also destroys information we can never get back. Third, safety. Stay out of any trench deeper than one meter unless a supervisor is with you, and wear your hard hat near the open trenches at all times.",
      },
    ],
    questions: [
      {
        id: 'f04-ls-an-dig-rules-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'What is the talk mainly about?',
        options: [
          'How to identify different kinds of old pottery',
          'The history of the Mill Creek excavation site',
          'Rules that volunteers must follow at the dig',
          'How supervisors photograph and label artifacts',
        ],
        answer: [2],
        explanation:
          'La profesora anuncia "there are three rules you need to know" y las explica una a una. La fotografía de los hallazgos es solo un detalle de la primera regla.',
      },
      {
        id: 'f04-ls-an-dig-rules-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'What should volunteers do when they uncover an object?',
        options: [
          'Leave it in place and call a supervisor',
          'Lift it carefully and then photograph it',
          'Measure its depth and put it in a bag',
          'Take it to a supervisor right away',
        ],
        answer: [0],
        explanation:
          'La regla es "leave it exactly where it is" y "call a supervisor", que lo fotografía y registra "before anything is lifted". Por eso levantarlo o llevárselo al supervisor es justo lo que no se debe hacer.',
      },
      {
        id: 'f04-ls-an-dig-rules-q3',
        kind: 'single',
        skill: 'inference',
        prompt: 'What can be inferred about a volunteer who takes home a small piece of pottery?',
        options: [
          'He may keep it if a supervisor has photographed it.',
          'He needs written permission from the department.',
          'He would not cause any real loss of information.',
          'He would be breaking the law, even if it seemed worthless.',
        ],
        answer: [3],
        explanation:
          'La profesora insiste en "Not even a small piece of pottery you think is worthless" y en que "Removing artifacts is against state law". Además, sacarlo "destroys information", así que la tercera opción es falsa.',
      },
    ],
  },

  // ---------- Listen to an Academic Talk ----------
  {
    id: 'f04-ls-at-zeigarnik-effect',
    form: 4,
    section: 'listening',
    task: 'academic-talk',
    title: 'Why Unfinished Tasks Linger',
    topic: 'psychology',
    difficulty: 'easy',
    context: 'Listen to part of a lecture in an introductory psychology class.',
    script: [
      { speaker: 'Professor', voice: 'female', text: "Have you ever noticed that a task you haven't finished keeps popping into your head, even when you're trying to relax? Psychologists have a name for this. It's called the Zeigarnik effect, after Bluma Zeigarnik, a psychologist who studied it in Berlin in the nineteen twenties." },
      { speaker: 'Professor', voice: 'female', text: "The story goes that her teacher, Kurt Lewin, noticed something odd about a waiter in a café. The waiter could remember every detail of the orders that hadn't been paid yet. But once a customer paid, he seemed to forget the order almost right away. Zeigarnik wanted to know if this was true for people in general." },
      { speaker: 'Professor', voice: 'female', text: 'So she designed an experiment. She gave people a series of small tasks, like solving puzzles or making little figures out of clay. She let them finish some of the tasks, but she stopped them in the middle of others. Later, she asked them to list all the tasks they could remember. They recalled the interrupted tasks much more often, roughly twice as often as the finished ones.' },
      { speaker: 'Professor', voice: 'female', text: 'Why would that happen? The explanation Zeigarnik and Lewin offered was that starting a task creates a kind of mental tension. That tension keeps the task active in your mind until you finish it. When the task is complete, the tension goes away, and the mind lets it go.' },
      { speaker: 'Professor', voice: 'female', text: "Later studies haven't always found such a strong effect, so psychologists still debate how reliable it is. But the idea has a practical use. If you keep putting off a big assignment, try just starting it, even for ten minutes. Once it's unfinished instead of unstarted, it tends to stay on your mind, and that can pull you back to it." },
    ],
    questions: [
      {
        id: 'f04-ls-at-zeigarnik-effect-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'What is the lecture mainly about?',
        options: [
          'How waiters manage to remember many orders at once',
          'Why unfinished tasks tend to stay on our minds',
          'Methods for finishing big assignments on time',
          'How people can learn to relax after a hard day',
        ],
        answer: [1],
        explanation:
          'La clase explica "the Zeigarnik effect": una tarea sin terminar "keeps popping into your head" y se recuerda mejor que una terminada. El camarero es solo la anécdota que inspiró el estudio, y el consejo sobre los trabajos es una aplicación al final.',
      },
      {
        id: 'f04-ls-at-zeigarnik-effect-q2',
        kind: 'single',
        skill: 'detail',
        prompt: "According to the professor, what did Zeigarnik find in her experiment?",
        options: [
          'People remembered the tasks they had completed best.',
          'People enjoyed the puzzles more than the clay figures.',
          'People refused to stop working when they were interrupted.',
          'People recalled the interrupted tasks more frequently.',
        ],
        answer: [3],
        explanation:
          'La profesora dice: "They recalled the interrupted tasks much more often, roughly twice as often as the finished ones". La primera opción dice lo contrario, y nada indica que los participantes se negaran a parar o prefirieran los rompecabezas.',
      },
      {
        id: 'f04-ls-at-zeigarnik-effect-q3',
        kind: 'single',
        skill: 'function',
        prompt: 'Why does the professor mention a waiter in a café?',
        options: [
          'To describe what led Zeigarnik to study the effect',
          'To show that the effect is strongest in busy jobs',
          'To suggest that memory improves with work experience',
          'To explain why later studies found a weaker effect',
        ],
        answer: [0],
        explanation:
          'La anécdota del camarero ("The story goes that her teacher, Kurt Lewin, noticed something odd about a waiter") es lo que llevó a Zeigarnik a preguntarse "if this was true for people in general" y a diseñar su experimento.',
      },
      {
        id: 'f04-ls-at-zeigarnik-effect-q4',
        kind: 'single',
        skill: 'inference',
        prompt: 'What can be inferred about a student who works on an assignment for ten minutes and then stops?',
        options: [
          'The student will probably forget about it quickly.',
          'The student will feel less tension than before starting.',
          'The student is more likely to return to the task.',
          'The student will have to start the work all over again.',
        ],
        answer: [2],
        explanation:
          'Según la profesora, una vez que la tarea queda "unfinished instead of unstarted, it tends to stay on your mind, and that can pull you back to it". Empezar una tarea crea tensión, no la reduce.',
      },
    ],
  },
  {
    id: 'f04-ls-at-gear-ratios',
    form: 4,
    section: 'listening',
    task: 'academic-talk',
    title: 'Gear Ratios: Speed and Torque',
    topic: 'engineering',
    difficulty: 'medium',
    context: 'Listen to part of a lecture in an engineering class.',
    script: [
      { speaker: 'Professor', voice: 'male', text: "Today we're looking at one of the oldest tools in mechanical engineering: gears. When two gears mesh, their teeth push against each other, so the edges of both gears move at the same speed. But if one gear is bigger than the other, they won't turn at the same rate. Suppose a small gear with ten teeth drives a large gear with forty teeth. Each time the small gear makes one full turn, it pushes only ten teeth of the large gear past the contact point, so the large gear makes just a quarter of a turn. We call that a gear ratio of four to one." },
      { speaker: 'Professor', voice: 'male', text: "Now here's the key point: you don't get something for nothing. If we ignore friction, the power going in equals the power coming out, and power depends on both speed and torque, which is the turning force. So if the output gear turns four times more slowly, it delivers about four times as much torque. Going the other way, from a large gear to a small one, you gain speed but lose torque. Gears let you trade one for the other." },
      { speaker: 'Professor', voice: 'male', text: 'A bicycle is a good everyday example. When you shift into a low gear to climb a hill, the chain connects a small front chainring to a large rear cog. Your pedals go around quite a lot, but the rear wheel turns relatively slowly, with more torque, so climbing feels easier. On a flat road you shift the other way: a large chainring and a small cog. Now each turn of the pedals turns the wheel several times, and you go faster, but every push takes more effort.' },
      { speaker: 'Professor', voice: 'male', text: "Mechanical clocks use the same principle for a different purpose: precision rather than force. A train of gears makes the minute hand go around exactly twelve times for every single turn of the hour hand. There, the ratio isn't about making work easier; it's about keeping the hands perfectly coordinated." },
    ],
    questions: [
      {
        id: 'f04-ls-at-gear-ratios-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'What is the lecture mainly about?',
        options: [
          'How gears trade rotational speed for turning force',
          'Why bicycles need chains to transfer their power',
          'The history of gear design in mechanical clocks',
          'How friction reduces the power of a machine',
        ],
        answer: [0],
        explanation:
          'La idea central es "Gears let you trade one for the other": velocidad por par (torque). La bicicleta y el reloj son ejemplos; la fricción solo se menciona para ignorarla.',
      },
      {
        id: 'f04-ls-at-gear-ratios-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'According to the professor, what happens when a gear with ten teeth drives a gear with forty teeth?',
        options: [
          'The large gear turns four times as fast.',
          'The two gears turn at the same rate.',
          'The large gear turns slowly but with more torque.',
          'The small gear produces four times more torque.',
        ],
        answer: [2],
        explanation:
          'El engranaje grande da "just a quarter of a turn" por cada vuelta del pequeño y, al girar más despacio, "delivers about four times as much torque". Lo que se mueve a la misma velocidad son los bordes de los dientes, no los engranajes completos.',
      },
      {
        id: 'f04-ls-at-gear-ratios-q3',
        kind: 'single',
        skill: 'function',
        prompt: 'Why does the professor mention mechanical clocks?',
        options: [
          'To show that clocks waste less power than bicycles',
          'To explain how torque is measured in small machines',
          'To show that clocks need low gears, as bicycles do',
          'To show that gear ratios can serve other purposes',
        ],
        answer: [3],
        explanation:
          'El profesor dice que los relojes usan el mismo principio "for a different purpose: precision rather than force". No compara la eficiencia de relojes y bicicletas ni habla de medir el par.',
      },
      {
        id: 'f04-ls-at-gear-ratios-q4',
        kind: 'single',
        skill: 'inference',
        prompt: 'What can be inferred about a cyclist who shifts into a low gear to climb a hill?',
        options: [
          'Her rear wheel turns faster than her pedals do.',
          'She must pedal more times to cover the same distance.',
          'She is using a large chainring and a small rear cog.',
          'She produces less torque at the rear wheel.',
        ],
        answer: [1],
        explanation:
          'En una marcha corta "Your pedals go around quite a lot, but the rear wheel turns relatively slowly", así que hacen falta más pedaladas para recorrer la misma distancia. Plato grande y piñón pequeño corresponden al terreno llano.',
      },
    ],
  },
  {
    id: 'f04-ls-at-moral-panics',
    form: 4,
    section: 'listening',
    task: 'academic-talk',
    title: 'Folk Devils and Moral Panics',
    topic: 'sociology',
    difficulty: 'hard',
    context: 'Listen to part of a lecture in a sociology of deviance class.',
    script: [
      { speaker: 'Professor', voice: 'female', text: "Today's concept comes from the sociologist Stanley Cohen, who did his research in Britain, and it's a term people now use rather loosely: moral panic. In Cohen's sense, a moral panic occurs when some group or behavior comes to be defined as a serious threat to society's values, and the public reaction is out of all proportion to the actual danger." },
      { speaker: 'Professor', voice: 'female', text: 'His case study was the reaction to two youth groups in nineteen sixty four, the Mods, who rode scooters, and the Rockers, who rode motorcycles. Over a cold, wet holiday weekend in the seaside town of Clacton, groups of bored teenagers scuffled and some property was damaged. Fairly minor, by most accounts. Yet the national newspapers ran headlines about terror and invasion, as if the town had been under siege.' },
      { speaker: 'Professor', voice: 'female', text: "What Cohen showed is that the exaggeration followed a sequence. The press first presented the young people in a simplified, stereotyped way. Cohen called groups cast in this role folk devils, visible symbols of whatever seemed to be going wrong with society. Then editors, politicians, and church leaders lined up to condemn them, experts offered diagnoses, and the authorities responded, with more police at the next holiday and calls for tougher sentences." },
      { speaker: 'Student', voice: 'male', text: "But wouldn't having more police there have stopped the trouble?" },
      { speaker: 'Professor', voice: 'female', text: "You'd think so, and that's what makes Cohen's analysis interesting. He argued that the reaction could feed the very behavior it targeted. Teenagers who had never thought of themselves as Mods or Rockers began to adopt the labels, crowds gathered expecting a fight, and heavy policing made clashes more likely. Sociologists call this loop deviancy amplification." },
      { speaker: 'Professor', voice: 'female', text: "One caution, though. Calling something a moral panic doesn't mean the underlying problem is imaginary. Cohen's claim is about proportion, the gap between the threat and the reaction, and judging that gap is usually the hardest part of applying the concept." },
    ],
    questions: [
      {
        id: 'f04-ls-at-moral-panics-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'What is the lecture mainly about?',
        options: [
          'How British youth fashions changed in the nineteen sixties',
          'Why the police failed to control violence in seaside towns',
          'How newspapers decide which events deserve big headlines',
          'A concept for exaggerated reactions to a perceived threat',
        ],
        answer: [3],
        explanation:
          'La clase presenta el concepto de "moral panic" de Stanley Cohen: una reacción pública "out of all proportion to the actual danger". Los Mods y los Rockers son el caso de estudio, no el tema principal.',
      },
      {
        id: 'f04-ls-at-moral-panics-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'According to the professor, what did Cohen mean by "folk devils"?',
        options: [
          'Experts who publicly explain the causes of social problems',
          'Groups cast as symbols of what is going wrong in society',
          'Journalists who invent stories in order to sell newspapers',
          'Teenagers who caused serious damage in the seaside towns',
        ],
        answer: [1],
        explanation:
          'Cohen llamaba "folk devils" a los grupos presentados como "visible symbols of whatever seemed to be going wrong with society". Los expertos solo "offered diagnoses", y los daños de Clacton fueron "Fairly minor".',
      },
      {
        id: 'f04-ls-at-moral-panics-q3',
        kind: 'single',
        skill: 'function',
        prompt: 'Why does the professor say that the underlying problem in a moral panic is not necessarily imaginary?',
        options: [
          'To admit that the Mods and Rockers were truly dangerous',
          'To suggest that Cohen later rejected his own concept',
          'To stress that the concept is really about proportion',
          'To show that the police response was in fact justified',
        ],
        answer: [2],
        explanation:
          'Tras la advertencia ("One caution, though"), aclara que "Cohen\'s claim is about proportion, the gap between the threat and the reaction". No dice que los jóvenes fueran realmente peligrosos ni que Cohen abandonara su idea.',
      },
      {
        id: 'f04-ls-at-moral-panics-q4',
        kind: 'single',
        skill: 'inference',
        prompt: "What does the professor imply in her answer to the student's question?",
        options: [
          'Extra policing may have increased the trouble it targeted.',
          'Extra policing quickly ended the clashes between the groups.',
          'The police mainly wanted to protect visitors to the town.',
          'Most of the teenagers there already belonged to a gang.',
        ],
        answer: [0],
        explanation:
          'La profesora responde "You\'d think so" pero explica que la reacción "could feed the very behavior it targeted" y que "heavy policing made clashes more likely". Además, muchos jóvenes "had never thought of themselves as Mods or Rockers".',
      },
    ],
  },
];
