import type { Difficulty, ListeningSet, Topic, Voice } from '../../../types';

/** Simulación n.º 17 — Listening (contenido original). */

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
    form: 17,
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
  cr('f17-ls-cr-admissions-building', 'easy', 'female', 'Excuse me, which building is the admissions office in?', [
    "It's in Carter Hall, by the library.",
    'I was admitted here two years ago.',
    'Yes, the office opens at nine.',
    'The building was finished last spring.',
  ], 0, 'Es una pregunta de información sobre un lugar ("which building"); solo la opción que nombra el edificio ("It\'s in Carter Hall") responde. "I was admitted" repite el sonido de "admissions" sin contestar, y "Yes" no responde a una pregunta con "which".'),
  cr('f17-ls-cr-water-plants', 'easy', 'female', "Could you water my plants while I'm away this weekend?", [
    'My plants grow well near the window.',
    'I was away for the weekend too.',
    'Sure, just leave me your key.',
    'They need water and sunlight to grow.',
  ], 2, 'Es una petición ("Could you…?"); lo natural es aceptar y resolver un detalle práctico: "Sure, just leave me your key". Las demás repiten palabras ("plants", "away", "water") sin aceptar ni rechazar el favor.', 'daily-life'),
  cr('f17-ls-cr-outline-offer', 'easy', 'male', "If you'd like, I can look over your outline before you start writing.", [
    "I'll look for it in the library.",
    "Great, can I send it to you tonight?",
    'Yes, I really liked the outline you wrote.',
    'I started writing at eight o\'clock.',
  ], 1, 'El asistente ofrece ayuda ("I can look over your outline"); la respuesta adecuada acepta la oferta: "Great, can I send it to you tonight?". "I\'ll look for it" juega con "look" y "I liked the outline you wrote" confunde quién escribió el esquema.'),
  cr('f17-ls-cr-new-apartment', 'easy', 'female', "So how's the new apartment working out?", [
    'I work out at the gym on most weekends.',
    'I moved my things there in a car.',
    'It was built about ten years ago.',
    'Pretty well, but the kitchen is tiny.',
  ], 3, '"How\'s … working out?" pregunta cómo va algo; la respuesta natural es "Pretty well, but the kitchen is tiny". "Work out at the gym" es una trampa de sonido: "work out" también significa hacer ejercicio.', 'daily-life'),
  cr('f17-ls-cr-cake-compliment', 'easy', 'male', 'This cake you made for the club party is delicious!', [
    "Don't worry, I'll make it to the party.",
    'The club meets every Friday afternoon.',
    "Thanks! It's my grandmother's recipe.",
    "Yes, I'd love a piece of the cake.",
  ], 2, 'Ante un cumplido lo natural es agradecerlo: "Thanks! It\'s my grandmother\'s recipe". "I\'ll make it to the party" usa "make it" con otro sentido (llegar a tiempo), y "I\'d love a piece" trata el cumplido como una oferta.'),
  cr('f17-ls-cr-borrow-laptop', 'easy', 'female', 'Would you mind if I used your laptop to check my email quickly?', [
    "Not at all. Go ahead, it's unlocked.",
    'I already checked my email this morning.',
    "Yes, it's a really quick laptop.",
    'My laptop was pretty expensive.',
  ], 0, '"Would you mind if…?" pide permiso; "Not at all" significa que no te importa, es decir, das permiso, y "Go ahead" lo confirma. "Yes" significaría que sí te importa, y además "a really quick laptop" juega con "quickly".'),

  // ---------- Choose a Response: medium ----------
  cr('f17-ls-cr-extra-hour-lab', 'medium', 'male', "I don't suppose you could stay an extra hour to help clean the equipment?", [
    'Yes, the equipment is very expensive.',
    'I usually arrive an hour early.',
    "No, I don't think it was cleaned.",
    "Sure, I don't have class until six.",
  ], 3, '"I don\'t suppose you could…?" es una petición indirecta y cortés. Se acepta con "Sure" y se explica la disponibilidad. "No, I don\'t think it was cleaned" la trata como una pregunta sobre un hecho.'),
  cr('f17-ls-cr-dirty-dishes', 'medium', 'female', 'You left your dirty dishes in the sink again.', [
    'The sink was installed last year.',
    "Sorry, I'll wash them right now.",
    "I'd rather eat at the dining hall.",
    'Yes, I bought new dishes again.',
  ], 1, 'Es una queja con una petición implícita (lava los platos). La respuesta apropiada es disculparse y actuar: "Sorry, I\'ll wash them right now". Las demás repiten "sink", "dishes" o "again" sin atender la queja.', 'daily-life'),
  cr('f17-ls-cr-rehearsal-day', 'medium', 'male', 'Would you rather rehearse on Tuesday or Thursday?', [
    'Thursday works better for me.',
    'Yes, I would like to rehearse.',
    'We rehearsed for two hours.',
    'Tuesday was a really long day.',
  ], 0, 'Es una pregunta de elección ("Tuesday or Thursday?"); hay que elegir una opción: "Thursday works better for me". "Yes, I would…" la trata como pregunta de sí/no, y "Tuesday was a really long day" habla del pasado.'),
  cr('f17-ls-cr-internship-news', 'medium', 'female', "Shouldn't we have heard back about the internship by now?", [
    'I heard it on the radio this morning.',
    'Yes, we should apply for it soon.',
    'They said it might take three weeks.',
    'The internship lasts all summer.',
  ], 2, 'La pregunta negativa expresa preocupación porque aún no hay respuesta. Lo natural es tranquilizar con información: "They said it might take three weeks". "Heard it on the radio" juega con "heard", y "we should apply" ignora que ya se postularon.'),
  cr('f17-ls-cr-museum-pass', 'medium', 'male', "I've got a spare museum pass if you can meet me by noon.", [
    'The museum closes at five on Sundays.',
    'I passed the history exam this morning.',
    'I spent all morning at the museum.',
    "Great! I'll be there by eleven-thirty.",
  ], 3, 'Es una oferta con condición ("if you can meet me by noon"); la respuesta adecuada acepta y cumple la condición: "I\'ll be there by eleven-thirty". "I passed" es una trampa de sonido con "pass".', 'daily-life'),
  cr('f17-ls-cr-field-site-drive', 'medium', 'female', "I'm worried I'll get lost driving out to the field site tomorrow.", [
    'The field site is for the geology class.',
    "Why don't you just follow my car?",
    'I lost my keys yesterday too.',
    'Tomorrow is supposed to be sunny.',
  ], 1, 'Ella expresa una preocupación; la mejor respuesta ofrece una solución: "Why don\'t you just follow my car?". "I lost my keys" repite "lost" con otro sentido y "The field site is for the geology class" no responde a la preocupación.'),

  // ---------- Choose a Response: hard ----------
  cr('f17-ls-cr-a-cappella', 'hard', 'male', "You've got a great voice. You should really audition for the a cappella group!", [
    'Yes, the group meets every Monday night.',
    "I'm glad you passed the audition.",
    "That's sweet, but I freeze up on stage.",
    'They sing without any instruments.',
  ], 2, 'Es una invitación con cumplido; la respuesta natural agradece y rechaza con cortesía explicando el motivo: "That\'s sweet, but I freeze up on stage" (pánico escénico). "I\'m glad you passed the audition" confunde quién hace la audición.'),
  cr('f17-ls-cr-lunch-bill', 'hard', 'female', "Don't worry about the bill. It's on me.", [
    "Thanks! I'll get it next time.",
    "It's on the table right next to you.",
    'Did you order dessert as well?',
    "Sorry, I didn't see it there.",
  ], 0, '"It\'s on me" es una expresión idiomática: "yo invito". Lo natural es agradecer y ofrecer devolver el gesto: "Thanks! I\'ll get it next time". "It\'s on the table" y "I didn\'t see it there" interpretan "on me" literalmente como un lugar.', 'daily-life'),
  cr('f17-ls-cr-trash-smell', 'hard', 'male', 'The trash is starting to smell.', [
    'It started raining an hour ago.',
    "I'm starting a new job tomorrow.",
    'We bought the trash bags on sale.',
    "Oh, sorry. I'll take it out now.",
  ], 3, 'El comentario es una petición implícita: "saca la basura". La respuesta adecuada es "I\'ll take it out now". Las otras repiten "starting"/"started" o "trash" sin reaccionar a la petición.', 'daily-life'),
  cr('f17-ls-cr-professor-surprise', 'hard', 'female', "That's the last thing I expected Professor Grant to say.", [
    'Yes, it was the last class of the term.',
    'I know! I was shocked too.',
    'She expects us to finish by Friday.',
    "I'll say it to her after class.",
  ], 1, '"The last thing I expected" expresa sorpresa (era lo menos esperado). La respuesta natural comparte la sorpresa: "I know! I was shocked too". "The last class of the term" interpreta "last" literalmente como "último".'),
  cr('f17-ls-cr-punctual-groupmate', 'hard', 'male', "He's not the most punctual person, is he?", [
    'True. He was twenty minutes late again.',
    "He's the most popular person in our group.",
    'Yes, he points out all our spelling errors.',
    'We should meet at the usual place.',
  ], 0, '"Not the most punctual" es un eufemismo para decir que suele llegar tarde. La respuesta que lo confirma es "He was twenty minutes late again". "Points out all our spelling errors" confunde "punctual" con puntuación o corrección.'),
  cr('f17-ls-cr-unclear-instructions', 'hard', 'female', 'The instructions for this assignment could have been a lot clearer.', [
    'I can clean the whiteboard for you.',
    'Yes, the sky is really clear today.',
    'Agreed. I had to read them twice.',
    'They were printed on blue paper.',
  ], 2, '"Could have been a lot clearer" es una crítica implícita: las instrucciones eran confusas. La respuesta natural muestra acuerdo: "Agreed. I had to read them twice". "The sky is really clear" toma "clear" en sentido literal.'),

  // ---------- Conversations ----------
  {
    id: 'f17-ls-cv-wind-presentation',
    form: 17,
    section: 'listening',
    task: 'conversation',
    title: 'Splitting a Wind Energy Presentation',
    topic: 'campus-life',
    difficulty: 'easy',
    context: 'Listen to a conversation between two students.',
    script: [
      { speaker: 'Kevin', voice: 'male', text: "Hey Laura, have you looked at our presentation assignment on wind energy? It's due on the twenty-first, and we haven't divided anything up yet." },
      { speaker: 'Laura', voice: 'female', text: "I know, I've been meaning to text you. The professor wants four parts: how turbines work, where wind farms are built, the costs, and the environmental effects." },
      { speaker: 'Kevin', voice: 'male', text: 'I\'d like to take how turbines work. I did a project on generators in high school, so I already know the basics.' },
      { speaker: 'Laura', voice: 'female', text: 'Great. Then I\'ll do the environmental effects. I read an article about how wind farms affect birds and bats, and I think I can use it.' },
      { speaker: 'Kevin', voice: 'male', text: 'What about the other two parts? Should we split them?' },
      { speaker: 'Laura', voice: 'female', text: "Let's do that. You take the locations, since that connects to how turbines need steady wind, and I'll cover the costs." },
      { speaker: 'Kevin', voice: 'male', text: "Sounds fair. When should we put our slides together? I'd like some time to practice." },
      { speaker: 'Laura', voice: 'female', text: 'How about the fourteenth? That gives us a full week to rehearse before we present.' },
      { speaker: 'Kevin', voice: 'male', text: "The fourteenth is a Thursday, right? I have a lab until four, but I'm free after that." },
      { speaker: 'Laura', voice: 'female', text: "Perfect. Let's meet at the library at four-thirty and combine everything into one file." },
    ],
    questions: [
      {
        id: 'f17-ls-cv-wind-presentation-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'What are the students mainly discussing?',
        options: [
          'Which topic to choose for their presentation',
          'How to divide their work and when to combine it',
          'Why wind farms can be harmful to birds and bats',
          'How to practice speaking in front of the class',
        ],
        answer: [1],
        explanation:
          'Kevin abre con "we haven\'t divided anything up yet"; se reparten las cuatro partes y acuerdan una fecha para juntar las diapositivas ("When should we put our slides together?"). El tema (energía eólica) ya está decidido, y las aves solo se mencionan de paso.',
      },
      {
        id: 'f17-ls-cv-wind-presentation-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'Which parts of the presentation will the man prepare?',
        options: [
          'The costs and the effects on wildlife',
          'The costs and how turbines work',
          'Wildlife effects and wind farm sites',
          'How turbines work and wind farm sites',
        ],
        answer: [3],
        explanation:
          'Kevin dice "I\'d like to take how turbines work", y Laura añade "You take the locations… and I\'ll cover the costs". Por tanto, él hace turbinas y ubicaciones; los costos y los efectos ambientales son de Laura.',
      },
      {
        id: 'f17-ls-cv-wind-presentation-q3',
        kind: 'single',
        skill: 'function',
        prompt: 'Why does the man mention his lab?',
        options: [
          'To show when he will be free on that day',
          'To suggest that they meet in the lab instead',
          'To explain why he needs more time to practice',
          'To ask the woman to change the due date',
        ],
        answer: [0],
        explanation:
          'Kevin dice "I have a lab until four, but I\'m free after that"; así indica su disponibilidad, y Laura propone reunirse "at four-thirty". No sugiere reunirse en el laboratorio ni cambiar la fecha de entrega.',
      },
    ],
  },
  {
    id: 'f17-ls-cv-microfilm',
    form: 17,
    section: 'listening',
    task: 'conversation',
    title: 'Reading Old Newspapers on Microfilm',
    topic: 'campus-life',
    difficulty: 'medium',
    context: 'Listen to a conversation between a student and a librarian.',
    script: [
      { speaker: 'Student', voice: 'female', text: "Hi, I'm writing a paper on the 1927 flood here in town, and my professor said the local newspaper from that time would be useful. Do you have it?" },
      { speaker: 'Librarian', voice: 'male', text: 'We do, but not in print. Papers that old are very fragile, so we keep them on microfilm. Do you know which dates you need?' },
      { speaker: 'Student', voice: 'female', text: 'The flood happened in early April, so probably the first two weeks of April 1927.' },
      { speaker: 'Librarian', voice: 'male', text: 'OK. The reels are organized by year and month in these cabinets. Here, this one covers March through May of 1927.' },
      { speaker: 'Student', voice: 'female', text: "Great. I've actually never used a microfilm reader. Is it complicated?" },
      { speaker: 'Librarian', voice: 'male', text: 'Not really. You put the reel on this spindle on the left, then thread the film under the glass and onto the empty reel on the right. This knob moves the film forward and backward, and this one focuses the image.' },
      { speaker: 'Student', voice: 'female', text: "OK. Whoa, it's moving really fast." },
      { speaker: 'Librarian', voice: 'male', text: 'Turn the knob gently. The speed depends on how far you turn it. And if the text looks sideways, this button rotates the image.' },
      { speaker: 'Student', voice: 'female', text: 'Oh, there it is. April third. Can I save a copy of this page?' },
      { speaker: 'Librarian', voice: 'male', text: 'Sure. Press the scan button on the screen, and you can either email the image to yourself or save it to a flash drive. Printing costs ten cents a page.' },
      { speaker: 'Student', voice: 'female', text: "Email is perfect. I don't have a flash drive with me anyway. Thanks so much!" },
    ],
    questions: [
      {
        id: 'f17-ls-cv-microfilm-q1',
        kind: 'single',
        skill: 'purpose',
        prompt: 'Why does the student go to talk to the librarian?',
        options: [
          'To ask about printing costs at the library',
          'To return a reel that she borrowed earlier',
          'To find an old newspaper for her research',
          'To ask the librarian about the 1927 flood',
        ],
        answer: [2],
        explanation:
          'La estudiante explica que escribe un trabajo y que "the local newspaper from that time would be useful. Do you have it?". La inundación es el tema de su trabajo, pero no le pregunta al bibliotecario por ella; el precio de impresión se menciona solo al final.',
      },
      {
        id: 'f17-ls-cv-microfilm-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'Why are the old newspapers kept on microfilm?',
        options: [
          'Microfilm is easier to search by topic.',
          'The original papers are very fragile.',
          'The library lost most printed copies.',
          'Students may not borrow them at all.',
        ],
        answer: [1],
        explanation:
          'El bibliotecario dice: "Papers that old are very fragile, so we keep them on microfilm". No menciona búsquedas por tema ni copias perdidas.',
      },
      {
        id: 'f17-ls-cv-microfilm-q3',
        kind: 'single',
        skill: 'inference',
        prompt: 'What will the student probably do next?',
        options: [
          'Print the page for ten cents',
          'Look for a different reel in the cabinet',
          'Save the image on a flash drive',
          'Send the scanned page to her email',
        ],
        answer: [3],
        explanation:
          'Tras conocer las opciones, ella responde "Email is perfect. I don\'t have a flash drive with me anyway", así que probablemente se enviará la imagen por correo. Ya encontró la página que buscaba ("April third"), por lo que no necesita otro carrete.',
      },
    ],
  },
  {
    id: 'f17-ls-cv-ethics-approval',
    form: 17,
    section: 'listening',
    task: 'conversation',
    title: 'Ethics Approval for a Survey',
    topic: 'psychology',
    difficulty: 'hard',
    context: 'Listen to a conversation between a student and a psychology professor.',
    script: [
      { speaker: 'Student', voice: 'male', text: "Professor Hayes, do you have a minute? I got an email saying my survey on students' sleep and stress can't go out until the ethics board approves it. I thought that was only for medical experiments." },
      { speaker: 'Professor', voice: 'female', text: "That's a common assumption, but any research that collects data from people needs review, even a simple questionnaire. Your survey asks about stress and mental health, so the board wants to make sure participants are protected." },
      { speaker: 'Student', voice: 'male', text: "Protected from what, though? It's just a few questions." },
      { speaker: 'Professor', voice: 'female', text: 'Well, questions about anxiety can be upsetting for some people. And if answers could be traced back to individuals, that information could cause harm if it got out. The board checks that the benefits of a study justify those risks.' },
      { speaker: 'Student', voice: 'male', text: "OK, that makes sense. The email also said my consent form needs revisions. What's wrong with it?" },
      { speaker: 'Professor', voice: 'female', text: "Let me see. Right, first, it doesn't say that participation is voluntary. Students need to know they can skip any question or stop at any time without a penalty." },
      { speaker: 'Student', voice: 'male', text: 'I can add that. Anything else?' },
      { speaker: 'Professor', voice: 'female', text: 'You ask for names and student ID numbers. Do you actually need them?' },
      { speaker: 'Student', voice: 'male', text: 'Not really. I just wanted to make sure nobody answered twice.' },
      { speaker: 'Professor', voice: 'female', text: "Then take them out. The survey platform can limit each account to one response without recording who answered. And because of the topic, I'd add contact information for the campus counseling center at the end of the form." },
      { speaker: 'Student', voice: 'male', text: "That's a good idea. If I resubmit by Friday, how long will approval take?" },
      { speaker: 'Professor', voice: 'female', text: 'For a low-risk survey like this, usually about a week. So you could probably launch it before midterms.' },
    ],
    questions: [
      {
        id: 'f17-ls-cv-ethics-approval-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'What is the conversation mainly about?',
        options: [
          'Why a survey needs approval and how to fix a form',
          'How stress and poor sleep affect students\' grades',
          'Why medical experiments require stricter review',
          'How to analyze the results of a campus survey',
        ],
        answer: [0],
        explanation:
          'El estudiante pregunta por qué su encuesta necesita la aprobación del comité ("can\'t go out until the ethics board approves it") y luego qué cambiar en el formulario ("my consent form needs revisions"). El sueño y el estrés son el tema de la encuesta, no de la conversación.',
      },
      {
        id: 'f17-ls-cv-ethics-approval-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'Why does the professor tell the student to remove names and ID numbers?',
        options: [
          'The board does not allow surveys over one page.',
          'Students might answer the survey more than once.',
          'They are not needed and could identify people.',
          'The counseling center already has that data.',
        ],
        answer: [2],
        explanation:
          'La profesora pregunta "Do you actually need them?" y explica que la plataforma puede limitar las respuestas "without recording who answered"; antes había advertido del riesgo de que las respuestas "could be traced back to individuals". Evitar respuestas duplicadas era la razón del estudiante para pedirlos, no la de ella para quitarlos.',
      },
      {
        id: 'f17-ls-cv-ethics-approval-q3',
        kind: 'single',
        skill: 'attitude',
        prompt: 'What is the student\'s attitude toward the ethics review at first?',
        options: [
          'He worries that his questions may be harmful.',
          'He sees no need for a review of his survey.',
          'He is pleased that the board replied so quickly.',
          'He is unsure how to get in touch with the board.',
        ],
        answer: [1],
        explanation:
          'Al principio dice "I thought that was only for medical experiments" y "Protected from what, though? It\'s just a few questions", lo que muestra que considera la revisión innecesaria. Solo después acepta: "OK, that makes sense".',
      },
    ],
  },

  // ---------- Announcements ----------
  {
    id: 'f17-ls-an-conversation-cafe',
    form: 17,
    section: 'listening',
    task: 'announcement',
    title: 'Weekly Language Conversation Café',
    topic: 'campus-life',
    difficulty: 'easy',
    context: 'Listen to an announcement on a university campus.',
    script: [
      {
        speaker: 'Announcer',
        voice: 'female',
        text: "Hello, everyone! The Department of Modern Languages is starting a weekly Conversation Café, and we'd love for you to join us. Every Wednesday from four to six p.m., in the lounge on the second floor of Morrison Hall, we'll pair language learners with native speakers for relaxed, informal conversation. This semester there will be Spanish, French, Japanese, and Arabic tables. Here's how it works: you spend thirty minutes speaking the language you're learning, and then you switch and help your partner with English or your own first language. There's no cost and no need to register. Just show up! Coffee and snacks are provided. And if you're a native speaker of another language and would like to host a table, please email the department office by Friday.",
      },
    ],
    questions: [
      {
        id: 'f17-ls-an-conversation-cafe-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'What is the announcement mainly about?',
        options: [
          'A new course in conversational Spanish',
          'A job opening in the language department',
          'A coffee shop opening in Morrison Hall',
          'A weekly event for practicing languages',
        ],
        answer: [3],
        explanation:
          'Se anuncia "a weekly Conversation Café" que empareja a estudiantes de idiomas con hablantes nativos. No es un curso ni una cafetería: el café y los aperitivos son solo un detalle ("Coffee and snacks are provided").',
      },
      {
        id: 'f17-ls-an-conversation-cafe-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'What do participants do after thirty minutes?',
        options: [
          'They switch and help their partner.',
          'They move to another language table.',
          'They take a short break for snacks.',
          'They write a summary of their talk.',
        ],
        answer: [0],
        explanation:
          'El anuncio dice: "you spend thirty minutes speaking the language you\'re learning, and then you switch and help your partner". No se menciona cambiar de mesa ni hacer una pausa.',
      },
      {
        id: 'f17-ls-an-conversation-cafe-q3',
        kind: 'single',
        skill: 'inference',
        prompt: 'What is implied about students who want to take part as learners?',
        options: [
          'They must email the office by Friday.',
          'They need to pay a fee for the snacks.',
          'They can attend without signing up.',
          'They must already speak two languages.',
        ],
        answer: [2],
        explanation:
          'Se dice "There\'s no cost and no need to register. Just show up!", así que pueden asistir sin inscribirse. El correo antes del viernes es solo para quienes quieran dirigir una mesa ("host a table").',
      },
    ],
  },
  {
    id: 'f17-ls-an-room-lottery',
    form: 17,
    section: 'listening',
    task: 'announcement',
    title: 'Housing Room Selection Lottery',
    topic: 'campus-life',
    difficulty: 'medium',
    context: 'Listen to an announcement from the university housing office.',
    script: [
      {
        speaker: 'Announcer',
        voice: 'male',
        text: "Good afternoon. This is a message from the Office of Residential Life about room selection for next year. All current residents who submitted a housing application by March first have been entered into the lottery, and your lottery number will be emailed to you on Monday. The lower your number, the earlier your selection time. Each student will receive a fifteen-minute time slot between April tenth and April fourteenth. During your slot, you'll log in to the housing portal and choose any room that's still available.",
      },
      {
        speaker: 'Announcer',
        voice: 'male',
        text: "If you want to live with a specific roommate, you must both confirm the request in the portal by April fifth. Roommate pairs will use the better of their two lottery numbers, so only one of you needs to log in during your slot. If you miss your slot, you can still choose a room afterward, but the most popular options will probably be gone by then.",
      },
    ],
    questions: [
      {
        id: 'f17-ls-an-room-lottery-q1',
        kind: 'single',
        skill: 'purpose',
        prompt: 'What is the purpose of the announcement?',
        options: [
          'To remind students to apply for housing',
          'To explain the room selection process',
          'To announce new rules for sharing a room',
          'To apologize for late lottery numbers',
        ],
        answer: [1],
        explanation:
          'El mensaje trata sobre "room selection for next year": números de lotería, franjas horarias y cómo se gestionan las parejas de compañeros. Las solicitudes ya se entregaron ("submitted… by March first"), por lo que no es un recordatorio para solicitar.',
      },
      {
        id: 'f17-ls-an-room-lottery-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'How is the selection time decided for a pair of roommates?',
        options: [
          'Each of them receives a separate slot.',
          'They get the average of their numbers.',
          'They are given the last available slot.',
          'They use the lower of their two numbers.',
        ],
        answer: [3],
        explanation:
          'Las parejas usan "the better of their two lottery numbers", y antes se explica que "The lower your number, the earlier your selection time"; por tanto, el número mejor es el más bajo. No se mencionan promedios ni franjas separadas.',
      },
      {
        id: 'f17-ls-an-room-lottery-q3',
        kind: 'single',
        skill: 'inference',
        prompt: 'What is implied about a student who misses the assigned time slot?',
        options: [
          'The student may get a less desirable room.',
          'The student cannot live on campus next year.',
          'The student must reapply for housing.',
          'The student will get a random roommate.',
        ],
        answer: [0],
        explanation:
          'El anuncio dice que se puede elegir habitación después, "but the most popular options will probably be gone by then"; es decir, quizá le toque una habitación menos deseable. No pierde el derecho a vivir en el campus.',
      },
    ],
  },
  {
    id: 'f17-ls-an-grading-changes',
    form: 17,
    section: 'listening',
    task: 'announcement',
    title: 'Dropped Quizzes and Midterm Replacement',
    topic: 'campus-life',
    difficulty: 'hard',
    context: 'Listen to an instructor talking to a class.',
    script: [
      {
        speaker: 'Professor',
        voice: 'female',
        text: "Before we start today, I want to tell you about two changes to the grading policy, and both of them work in your favor. First, I'm going to drop your lowest quiz score. We have eight quizzes this semester, so only your best seven will count. If you missed a quiz, it counts as a zero, so that's the one that will be dropped.",
      },
      {
        speaker: 'Professor',
        voice: 'female',
        text: "Second, I know several of you were disappointed with your midterm. So here's the deal: if your score on the final exam is higher than your midterm score, the final will replace the midterm in your grade. If it's lower, nothing changes, and your midterm stays as it is. Keep in mind that the final is cumulative, so it will cover everything from the first week on, not just the material after the midterm. I'll post the updated syllabus online this afternoon.",
      },
    ],
    questions: [
      {
        id: 'f17-ls-an-grading-changes-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'What is the main purpose of the talk?',
        options: [
          'To review material for the upcoming final exam',
          'To explain why the midterm scores were so low',
          'To describe changes in how grades are calculated',
          'To announce that two quizzes have been cancelled',
        ],
        answer: [2],
        explanation:
          'La profesora anuncia "two changes to the grading policy": eliminar la nota más baja de los cuestionarios y permitir que el final reemplace al parcial. Menciona la decepción con el parcial, pero no explica por qué las notas fueron bajas.',
      },
      {
        id: 'f17-ls-an-grading-changes-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'What happens if a student\'s final exam score is lower than the midterm score?',
        options: [
          'The two scores are averaged together.',
          'The midterm score stays as it is.',
          'The final replaces the midterm anyway.',
          'The lowest quiz is no longer dropped.',
        ],
        answer: [1],
        explanation:
          'Ella dice: "If it\'s lower, nothing changes, and your midterm stays as it is". El reemplazo solo ocurre si el final es más alto ("higher than your midterm score").',
      },
      {
        id: 'f17-ls-an-grading-changes-q3',
        kind: 'single',
        skill: 'inference',
        prompt: 'What can be inferred about a student who missed one quiz?',
        options: [
          'The student must take a make-up quiz.',
          'The student\'s final exam will count double.',
          'The student will receive a zero in the course.',
          'The missed quiz will not hurt the final grade.',
        ],
        answer: [3],
        explanation:
          'El cuestionario no hecho "counts as a zero, so that\'s the one that will be dropped"; al eliminarse, no afectará a la nota. Recibir un cero solo se aplica a ese cuestionario, no al curso entero.',
      },
    ],
  },

  // ---------- Academic Talks ----------
  {
    id: 'f17-ls-at-e-ink',
    form: 17,
    section: 'listening',
    task: 'academic-talk',
    title: 'How E-Ink Screens Work',
    topic: 'technology',
    difficulty: 'easy',
    context: 'Listen to part of a lecture in a technology class.',
    script: [
      { speaker: 'Professor', voice: 'male', text: "Today let's look at a technology many of you probably use without thinking about it: the screen on an e-reader. These screens are called electronic paper, or e-ink displays, and they work very differently from the screen on your phone or laptop." },
      { speaker: 'Professor', voice: 'male', text: 'Inside an e-ink screen there are millions of tiny capsules, each about as wide as a human hair. Every capsule is filled with a clear liquid that contains two kinds of particles: white ones with a positive charge and black ones with a negative charge. Above and below the capsules are thin layers of electrodes. When the display applies a negative charge at the top of a capsule, the positively charged white particles are pulled up to the surface, and that spot looks white. Reverse the charge, and the black particles rise instead. By controlling thousands of these spots, the screen forms letters and pictures.' },
      { speaker: 'Professor', voice: 'male', text: "Here's the key advantage. Once the particles have moved, they stay where they are, even if the power is switched off. So the screen uses electricity only when the image changes, for example when you turn a page. A phone screen, by contrast, has to be refreshed many times every second just to keep showing the same picture. That's why an e-reader can run for weeks on a single charge." },
      { speaker: 'Professor', voice: 'male', text: "Another benefit is that e-ink doesn't produce its own light. Like printed paper, it reflects the light around it, so it stays easy to read in bright sunlight, where phone screens often look washed out." },
      { speaker: 'Professor', voice: 'male', text: "Of course, there are trade-offs. Because the particles have to physically move through the liquid, the screen changes slowly, which makes it a poor choice for video. And most e-ink displays show only black, white, and shades of gray, although color versions now exist. That's why you'll see e-ink in e-readers and in electronic price labels on store shelves, but not in televisions." },
    ],
    questions: [
      {
        id: 'f17-ls-at-e-ink-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'What is the lecture mainly about?',
        options: [
          'Why phone screens use more power than laptops',
          'The history of the first electronic readers',
          'How e-ink screens work and where they are useful',
          'How stores use electronic labels to set prices',
        ],
        answer: [2],
        explanation:
          'El profesor explica el funcionamiento de las pantallas de tinta electrónica (cápsulas, partículas cargadas) y sus ventajas y limitaciones, terminando con dónde se usan: "in e-readers and in electronic price labels… but not in televisions". Las etiquetas de las tiendas son solo un ejemplo.',
      },
      {
        id: 'f17-ls-at-e-ink-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'According to the professor, when does an e-ink screen use electricity?',
        options: [
          'Only when the image on it changes',
          'Many times during every second',
          'Only when the room becomes dark',
          'Whenever the device is switched on',
        ],
        answer: [0],
        explanation:
          'El profesor dice: "the screen uses electricity only when the image changes, for example when you turn a page". Refrescarse "many times every second" es lo que hace la pantalla de un teléfono, no la de tinta electrónica.',
      },
      {
        id: 'f17-ls-at-e-ink-q3',
        kind: 'single',
        skill: 'function',
        prompt: 'Why does the professor mention that a phone screen is refreshed many times every second?',
        options: [
          'To explain why phones are better for reading',
          'To show how e-ink screens can display video',
          'To describe a problem with older e-readers',
          'To contrast it with how e-ink saves energy',
        ],
        answer: [3],
        explanation:
          'Lo introduce con "by contrast" justo después de decir que la tinta electrónica solo consume energía al cambiar la imagen, y concluye "That\'s why an e-reader can run for weeks". Es un contraste para explicar el ahorro de energía.',
      },
      {
        id: 'f17-ls-at-e-ink-q4',
        kind: 'single',
        skill: 'inference',
        prompt: 'What can be inferred about reading an e-reader outdoors on a sunny day?',
        options: [
          'The screen would be hard to see in the sun.',
          'The text would remain easy to read.',
          'The battery would run out more quickly.',
          'The pages would turn more slowly than usual.',
        ],
        answer: [1],
        explanation:
          'Como la tinta electrónica "reflects the light around it, so it stays easy to read in bright sunlight", se deduce que se leería bien al sol. Verse "washed out" es lo que les pasa a las pantallas de los teléfonos.',
      },
    ],
  },
  {
    id: 'f17-ls-at-landslides',
    form: 17,
    section: 'listening',
    task: 'academic-talk',
    title: 'Why Slopes Give Way',
    topic: 'geology',
    difficulty: 'medium',
    context: 'Listen to part of a lecture in a geology class.',
    script: [
      { speaker: 'Professor', voice: 'female', text: 'Last week we talked about weathering and erosion. Today I want to focus on one of the fastest and most dangerous ways that material moves downhill: landslides. To understand why a slope fails, it helps to think of it as a kind of tug-of-war between two forces.' },
      { speaker: 'Professor', voice: 'female', text: "On one side is gravity, which constantly pulls soil and rock down the slope. On the other side is the slope's resistance, mainly the friction between particles and the cohesion that holds them together, along with things like plant roots. As long as the resistance is greater than the downhill pull, the slope stays put. A landslide happens when that balance tips." },
      { speaker: 'Professor', voice: 'female', text: "So what tips it? The most common trigger is heavy or prolonged rain. Water fills the tiny spaces between soil grains, and the pressure of that water pushes the grains apart, which reduces friction. Water also adds weight to the slope. That's why landslides so often follow a week of storms or a rapid snowmelt." },
      { speaker: 'Professor', voice: 'female', text: 'Earthquakes are another trigger. The shaking can loosen material in seconds, and in some kinds of soil it can make wet sediment behave almost like a liquid, so a slope that was stable for centuries suddenly gives way.' },
      { speaker: 'Professor', voice: 'female', text: "Finally, people can trigger landslides too. When engineers cut into a hillside to build a road, they remove material at the base of the slope, material that was supporting everything above it. It's a bit like pulling a book out of the bottom of a stack. To reduce the risk, engineers build retaining walls, install drains to carry water away, and plant vegetation on exposed slopes." },
    ],
    questions: [
      {
        id: 'f17-ls-at-landslides-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'What is the lecture mainly about?',
        options: [
          'How engineers design roads on steep hills',
          'Why earthquakes occur along mountain ranges',
          'How weathering slowly breaks down rock',
          'What causes slopes to fail and slide downhill',
        ],
        answer: [3],
        explanation:
          'La profesora anuncia "Today I want to focus on… landslides" y explica el equilibrio entre gravedad y resistencia y tres desencadenantes (lluvia, terremotos y cortes de carretera). La meteorización se mencionó la semana anterior ("Last week").',
      },
      {
        id: 'f17-ls-at-landslides-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'According to the professor, how does heavy rain make a slope less stable?',
        options: [
          'It washes away the plant roots on the slope.',
          'Water pushes grains apart and reduces friction.',
          'It freezes inside cracks and splits the rock.',
          'It makes the base of the slope much wider.',
        ],
        answer: [1],
        explanation:
          'La profesora explica: "the pressure of that water pushes the grains apart, which reduces friction". Las raíces se mencionan como parte de la resistencia, pero no dice que la lluvia las arrastre.',
      },
      {
        id: 'f17-ls-at-landslides-q3',
        kind: 'single',
        skill: 'function',
        prompt: 'Why does the professor mention pulling a book out of the bottom of a stack?',
        options: [
          'To show how rain adds weight to a slope',
          'To describe how layers of rock are formed',
          'To illustrate the effect of a road cut',
          'To explain why retaining walls can fail',
        ],
        answer: [2],
        explanation:
          'La comparación aparece justo después de explicar que al construir una carretera se quita material "at the base of the slope, material that was supporting everything above it". Ilustra el efecto de ese corte, no la lluvia ni los muros de contención.',
      },
      {
        id: 'f17-ls-at-landslides-q4',
        kind: 'single',
        skill: 'inference',
        prompt: 'What can be inferred about installing drains on a hillside?',
        options: [
          'It reduces the effect of water on the slope.',
          'It increases the pull of gravity on the soil.',
          'It is useful mainly after an earthquake.',
          'It makes the slope heavier and steeper.',
        ],
        answer: [0],
        explanation:
          'Los drenajes sirven "to carry water away", y la profesora explicó que el agua reduce la fricción y añade peso. Se deduce que el drenaje disminuye el efecto del agua y estabiliza la ladera. No tiene relación con los terremotos.',
      },
    ],
  },
  {
    id: 'f17-ls-at-dunning-kruger',
    form: 17,
    section: 'listening',
    task: 'academic-talk',
    title: 'Misjudging Our Own Skill',
    topic: 'psychology',
    difficulty: 'hard',
    context: 'Listen to part of a lecture in a psychology class.',
    script: [
      { speaker: 'Professor', voice: 'male', text: "Let's turn to a finding about self-assessment that you've probably seen mentioned online, often in a distorted form. It's called the Dunning-Kruger effect, after the two psychologists at Cornell University who described it in 1999." },
      { speaker: 'Professor', voice: 'male', text: 'In their studies, participants took tests of skills like logical reasoning, grammar, and humor, and then estimated how well they had done compared with the others. The striking result came from the people who scored in the bottom quarter. On average, they placed themselves above the sixtieth percentile. In other words, they believed they had outperformed most of the other participants, when in fact about three quarters of the group had done better than they had.' },
      { speaker: 'Professor', voice: 'male', text: "Dunning and Kruger proposed an explanation they called a double burden. The knowledge you need to perform well in an area is often the same knowledge you need to recognize good performance. If you don't understand the rules of grammar, for instance, you can't easily spot the errors in your own writing. So people with little skill both make mistakes and fail to notice them." },
      { speaker: 'Student', voice: 'female', text: "But doesn't that mean the most skilled people judged themselves accurately?" },
      { speaker: 'Professor', voice: 'male', text: "Good question. Actually, the top performers tended to underestimate their rank somewhat. They judged their own scores fairly well, but they assumed the test was easy for everyone, so they thought the others had done nearly as well as they had. That's a different mistake. It's about misjudging other people, not themselves." },
      { speaker: 'Professor', voice: 'male', text: "Now, a couple of cautions. The effect doesn't mean that less skilled people are unintelligent, and it isn't limited to some small group. It applies to all of us in areas where we're beginners. Some researchers have also argued that part of the pattern may be a statistical artifact. Still, one encouraging result from the original work is that when low scorers were given brief training in the skill, their self-assessments became more accurate." },
    ],
    questions: [
      {
        id: 'f17-ls-at-dunning-kruger-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'What is the lecture mainly about?',
        options: [
          'How researchers at Cornell design ability tests',
          'Why people with low skill misjudge their ability',
          'Why experts tend to perform poorly on easy tests',
          'How humor can be used to measure reasoning',
        ],
        answer: [1],
        explanation:
          'La clase explica el efecto Dunning-Kruger: quienes puntúan más bajo "believed they had outperformed most of the other participants", y la causa es el "double burden". Cornell y el humor son detalles del estudio, no el tema central.',
      },
      {
        id: 'f17-ls-at-dunning-kruger-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'According to the professor, what mistake did the top performers tend to make?',
        options: [
          'They overestimated their own test scores.',
          'They refused to compare themselves to others.',
          'They failed to notice errors in their work.',
          'They assumed others had done nearly as well.',
        ],
        answer: [3],
        explanation:
          'Los mejores "judged their own scores fairly well, but they assumed the test was easy for everyone, so they thought the others had done nearly as well". Sobrestimar la propia puntuación es el error de los menos hábiles, no el suyo.',
      },
      {
        id: 'f17-ls-at-dunning-kruger-q3',
        kind: 'single',
        skill: 'function',
        prompt: 'Why does the professor mention spotting errors in your own writing?',
        options: [
          'To illustrate why low skill can hide one\'s mistakes',
          'To show that grammar tests are unreliable measures',
          'To suggest that students take more writing courses',
          'To compare skilled writers with skilled readers',
        ],
        answer: [0],
        explanation:
          'El ejemplo ilustra el "double burden": "If you don\'t understand the rules of grammar… you can\'t easily spot the errors in your own writing". Muestra cómo la falta de habilidad oculta los propios errores; no critica las pruebas de gramática.',
      },
      {
        id: 'f17-ls-at-dunning-kruger-q4',
        kind: 'single',
        skill: 'inference',
        prompt: 'Based on the lecture, what would most likely help a beginner judge his ability more accurately?',
        options: [
          'Taking many tests without getting feedback',
          'Comparing himself only with other beginners',
          'Receiving some brief training in the skill',
          'Assuming the test is easy for everyone',
        ],
        answer: [2],
        explanation:
          'Al final el profesor dice que "when low scorers were given brief training in the skill, their self-assessments became more accurate". Suponer que la prueba es fácil para todos es precisamente el error de los más hábiles.',
      },
    ],
  },
];
