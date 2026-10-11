import type { Difficulty, ListeningSet, Topic, Voice } from '../../../types';

/** Simulación n.º 5 — Listening (contenido original). */
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
    form: 5,
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
  cr('f05-ls-cr-front-door', 'easy', 'female', 'Did you remember to lock the front door this morning?', [
    'I locked my bike outside the library.',
    'Yes, I checked it twice before I left.',
    'The door is painted a dark red.',
    "No, I don't remember the morning class.",
  ], 1, 'Es una pregunta de sí/no sobre cerrar la puerta; "Yes, I checked it twice before I left" responde directamente. Las demás repiten palabras ("lock", "door", "remember") sin contestar.', 'daily-life'),
  cr('f05-ls-cr-photo-club', 'easy', 'male', "The photography club is having its first meeting on Friday. Want to come?", [
    'I took that photo last Friday.',
    'The club met for the first time.',
    "Sure, I'd love to. Where is it?",
    "Yes, he's a great photographer.",
  ], 2, 'Es una invitación ("Want to come?"); lo natural es aceptarla y pedir un detalle ("Where is it?"). "The club met…" usa el pasado para algo que aún no ha ocurrido.'),
  cr('f05-ls-cr-order-pizza', 'easy', 'female', "The dining hall's closed tonight. Why don't we order a pizza?", [
    "Good idea. I'll find the menu.",
    'Because it closed at eight.',
    'I ordered the salad last week.',
    'The dining hall is very big.',
  ], 0, '"Why don\'t we…?" es una sugerencia, no una pregunta sobre causas; se acepta con "Good idea". "Because it closed at eight" interpreta mal la función de la frase.', 'daily-life'),
  cr('f05-ls-cr-data-sheets', 'easy', 'male', "I'm so sorry. I forgot to bring the data sheets for our lab.", [
    "You're welcome. Anytime you need help.",
    'The lab opens at nine o’clock tomorrow.',
    'I forgot what the data showed last week.',
    'No problem. I have copies on my laptop.',
  ], 3, 'Ante una disculpa se tranquiliza a la otra persona: "No problem. I have copies on my laptop". "You\'re welcome" responde a un agradecimiento, no a una disculpa.'),
  cr('f05-ls-cr-class-time', 'easy', 'female', 'Do you prefer taking classes in the morning or in the afternoon?', [
    'Yes, I do.',
    'I took a class this afternoon.',
    'Mornings, definitely. I focus better early.',
    'The class starts at nine in the morning, I think.',
  ], 2, 'Es una pregunta de elección ("morning or afternoon"), así que hay que elegir una opción: "Mornings, definitely". "Yes, I do" no sirve para una pregunta con "or".'),
  cr('f05-ls-cr-snow-forecast', 'easy', 'male', "The forecast says we're getting snow tomorrow.", [
    "No, I didn't see the show last night.",
    "Really? I'd better find my boots.",
    'Yes, I said that yesterday.',
    'I usually get up early tomorrow.',
  ], 1, 'Ante una noticia se reacciona con sorpresa y una consecuencia lógica: "Really? I\'d better find my boots". "Show" es una trampa fonética de "snow".', 'daily-life'),

  // ---------- Choose a Response: medium ----------
  cr('f05-ls-cr-earlier-train', 'medium', 'female', "Why don't we catch the earlier train on Friday so we can avoid the holiday crowds?", [
    'Because the train was crowded.',
    'I caught a cold during the holidays last year.',
    'The train station is downtown.',
    "Good thinking. I'll pack tonight, then.",
  ], 3, '"Why don\'t we…?" propone un plan; "Good thinking. I\'ll pack tonight, then" lo acepta y saca una consecuencia. "Because…" trata la sugerencia como una pregunta por la causa.', 'daily-life'),
  cr('f05-ls-cr-room-number', 'medium', 'male', 'Sorry, did you say the meeting is in Room 210 or Room 201?', [
    'Two-ten, next to the elevator.',
    'Yes, I said that earlier.',
    'The meeting starts at two-ten.',
    "It's about the new room schedule.",
  ], 0, 'Pide una aclaración entre dos números, así que hay que elegir uno: "Two-ten…". "The meeting is at two-ten" confunde el número de sala con una hora.'),
  cr('f05-ls-cr-history-exam', 'medium', 'female', 'I thought the history exam was a lot easier than the last one.', [
    'The last one is on Thursday.',
    'I think history is in Room 5.',
    'Really? I found it just as hard.',
    'It was easier to find the room this time.',
  ], 2, 'Expresa una opinión; la respuesta natural da otra opinión: "Really? I found it just as hard". "It was easier to find the room" solo repite "easier".'),
  cr('f05-ls-cr-meal-plan', 'medium', 'male', "I'm new here. Which meal plan do you think is the best value?", [
    'I planned the meal myself last weekend.',
    'The basic one. Most people skip meals.',
    'Yes, the dining hall is new this year.',
    'I value my free time a lot, actually.',
  ], 1, 'Pide un consejo; la respuesta recomienda un plan y da una razón ("Most people skip meals"). "Value" y "planned" son trampas que repiten palabras del enunciado.'),
  cr('f05-ls-cr-hot-plate', 'medium', 'female', 'Careful! The hot plate is still on.', [
    "Thanks, I'll put it on later today.",
    'Yes, the plate is on the shelf.',
    'It was hot yesterday too.',
    "Oh, thanks! I'll turn it off now.",
  ], 3, 'Es una advertencia ("Careful!"); se agradece y se actúa: "I\'ll turn it off now". "Put it on" significa encenderlo, justo lo contrario.'),
  cr('f05-ls-cr-three-sources', 'medium', 'male', "We need at least three sources for this essay, don't we?", [
    'Right, and at least one has to be a book.',
    'Yes, I wrote three essays this term.',
    'The essay is about renewable energy sources.',
    "No, we didn't finish the essay.",
  ], 0, 'La "tag question" busca confirmación; "Right, and at least one has to be a book" confirma y añade información. "No, we didn\'t finish the essay" usa el tiempo verbal equivocado y no responde.'),

  // ---------- Choose a Response: hard ----------
  cr('f05-ls-cr-clinic-wait', 'hard', 'female', "If you're going to the campus clinic this afternoon, I'd bring a book if I were you.", [
    "Thanks, but I've already read that book.",
    "I'm not sure the clinic has a library.",
    'Is the wait really that long?',
    "Sure, I'll bring it back to you.",
  ], 2, '"I\'d bring a book if I were you" da a entender que la espera será larga; la respuesta adecuada lo capta: "Is the wait really that long?". Las otras interpretan "book" literalmente.'),
  cr('f05-ls-cr-admissions-office', 'hard', 'male', 'Excuse me, would you happen to know where the graduate admissions office moved?', [
    'Yes, I happen to know it.',
    "I think it's in Morrison Hall now.",
    'It moved very quickly last year.',
    "I'm applying to graduate school too.",
  ], 1, 'Es una pregunta indirecta y cortés: pide un lugar, no un sí o un no. "I think it\'s in Morrison Hall now" da la información; "Yes, I happen to know it" responde solo de forma literal.'),
  cr('f05-ls-cr-masterpiece', 'hard', 'female', "A masterpiece? Hmm, I'm not sure I'd go that far.", [
    'How far is it from here, exactly?',
    "Yes, it's a masterpiece, just as you said.",
    "I'm sure you'll finish reading it soon enough.",
    'Fair enough, but the characters were great.',
  ], 3, '"I\'m not sure I\'d go that far" expresa un desacuerdo suave; lo natural es conceder y defender la propia opinión: "Fair enough, but…". "How far is it" interpreta "far" en sentido literal.'),
  cr('f05-ls-cr-surprise-quiz', 'hard', 'male', "Had I known the quiz was today, I'd have reviewed my notes last night.", [
    "Oh no, didn't you see the announcement?",
    "I'm glad you reviewed your notes, then.",
    "Yes, I knew you'd review them carefully.",
    'The quiz will be next week, then.',
  ], 0, '"Had I known…" (condicional irreal) indica que NO lo sabía y no repasó; la respuesta natural reacciona a su sorpresa. "I\'m glad you reviewed" entiende lo contrario.'),
  cr('f05-ls-cr-organic-chem', 'hard', 'female', "You're taking Organic Chemistry next term? I took that course last year, if it's any help.", [
    'Oh, did you take it last year too?',
    'Great! Could I ask you a few questions?',
    "No, it's not helpful at all, thanks.",
    "I'm helping with that course next term.",
  ], 1, '"If it\'s any help" es un ofrecimiento implícito de consejo; se acepta con "Great! Could I ask you a few questions?". "Did you take it last year too?" ignora lo que acaba de decir.'),
  cr('f05-ls-cr-last-bus', 'hard', 'male', 'The last bus leaves at 11:15, you know.', [
    'Yes, I left at eleven fifteen yesterday.',
    'The bus stop is near the bookstore, right?',
    "Thanks. I'll leave before eleven, then.",
    'You know, I like taking the bus.',
  ], 2, '"…you know" convierte el dato en una advertencia implícita (no pierdas el autobús). "Thanks. I\'ll leave before eleven, then" muestra que se ha entendido. "Yes, I left…" usa el pasado.', 'daily-life'),

  // ---------- Conversations ----------
  {
    id: 'f05-ls-cv-email-lockout',
    form: 5,
    section: 'listening',
    task: 'conversation',
    title: 'Locked Out of University Email',
    topic: 'campus-life',
    difficulty: 'easy',
    context: 'Listen to a conversation between a student and a technician at the IT help desk.',
    script: [
      { speaker: 'Student', voice: 'female', text: "Hi. I changed my university password yesterday, and now I can't get into my email at all. It keeps saying my account is locked." },
      { speaker: 'Technician', voice: 'male', text: 'That usually happens when a device tries the old password too many times. Do you check your email on your phone?' },
      { speaker: 'Student', voice: 'female', text: "Yes, I do. Oh, wait. I haven't updated the password on my phone yet." },
      { speaker: 'Technician', voice: 'male', text: "That's probably it. Your phone kept trying the old password automatically, and after five failed attempts, the system locks the account for security. Can I see your student ID?" },
      { speaker: 'Student', voice: 'female', text: 'Sure, here it is.' },
      { speaker: 'Technician', voice: 'male', text: "Okay, I've unlocked your account and sent a temporary password to your personal email address. When you log in, you'll be asked to set up two-step verification." },
      { speaker: 'Student', voice: 'female', text: "What's that, exactly?" },
      { speaker: 'Technician', voice: 'male', text: "After you type your password, the system sends a six-digit code to an app on your phone. You enter that code to finish logging in. So even if someone steals your password, they can't get in without your phone." },
      { speaker: 'Student', voice: 'female', text: 'That sounds like an extra step every single time, though.' },
      { speaker: 'Technician', voice: 'male', text: "Only on new devices. On your own laptop, you can check a box so it remembers you for thirty days. But first, update the password on your phone, or you'll be locked out again." },
      { speaker: 'Student', voice: 'female', text: "Got it. I'll do that right now." },
    ],
    questions: [
      {
        id: 'f05-ls-cv-email-lockout-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'Why does the student go to the IT help desk?',
        options: [
          'To learn how to change her university password',
          'To regain access to her email account',
          'To report that her phone was stolen',
          'To borrow a laptop for thirty days',
        ],
        answer: [1],
        explanation:
          'La estudiante dice "I can\'t get into my email at all. It keeps saying my account is locked". Ya había cambiado la contraseña ("I changed my university password yesterday"), así que no viene a aprender a hacerlo.',
      },
      {
        id: 'f05-ls-cv-email-lockout-q2',
        kind: 'single',
        skill: 'detail',
        prompt: "According to the technician, why was the student's account locked?",
        options: [
          'She entered the wrong student ID number.',
          'Her temporary password had expired.',
          'Someone had tried to steal her password.',
          'Her phone kept trying the old password.',
        ],
        answer: [3],
        explanation:
          'El técnico explica: "Your phone kept trying the old password automatically, and after five failed attempts, the system locks the account". El robo de contraseñas solo se menciona al hablar de la verificación en dos pasos.',
      },
      {
        id: 'f05-ls-cv-email-lockout-q3',
        kind: 'single',
        skill: 'inference',
        prompt: 'What will the student probably do first?',
        options: [
          'Update the password on her phone',
          'Install a new email app on her laptop',
          'Turn off two-step verification',
          'Return to the help desk in thirty days',
        ],
        answer: [0],
        explanation:
          'El técnico le dice "But first, update the password on your phone, or you\'ll be locked out again", y ella responde "I\'ll do that right now". Los "thirty days" se refieren a que el portátil la recuerde, no a volver al servicio técnico.',
      },
    ],
  },
  {
    id: 'f05-ls-cv-noisy-neighbor',
    form: 5,
    section: 'listening',
    task: 'conversation',
    title: 'A Noisy Neighbor During Exams',
    topic: 'campus-life',
    difficulty: 'medium',
    context: 'Listen to a conversation between a student and a resident assistant.',
    script: [
      { speaker: 'Student', voice: 'male', text: "Hi, Melissa. Do you have a minute? It's about the guy in Room 214, next to mine." },
      { speaker: 'Resident Assistant', voice: 'female', text: "Sure, come in. What's going on?" },
      { speaker: 'Student', voice: 'male', text: "He's been playing music really loud until two or three in the morning. It's exam week, and I have my statistics final on Thursday. I've barely slept." },
      { speaker: 'Resident Assistant', voice: 'female', text: "I'm sorry to hear that. During exam week, quiet hours start at eight p.m., so he really shouldn't be doing that. Have you said anything to him?" },
      { speaker: 'Student', voice: 'male', text: "Not yet. I don't really know him, and I didn't want to start a conflict. I was hoping you could just write him up." },
      { speaker: 'Resident Assistant', voice: 'female', text: "I could, but a formal report goes to the housing office, and it can take a week to process. By then, exams would be over. In my experience, most people just don't realize how thin the walls are. A friendly knock usually works faster." },
      { speaker: 'Student', voice: 'male', text: "I guess that's true. But what if he doesn't change anything?" },
      { speaker: 'Resident Assistant', voice: 'female', text: "Then come back, and I'll talk to him myself. If it still continues after that, we'll file the report. Oh, and in the meantime, the student center library is open all night this week if you need somewhere quiet." },
      { speaker: 'Student', voice: 'male', text: "Okay. I'll knock on his door this evening, before it gets late. Thanks, Melissa." },
      { speaker: 'Resident Assistant', voice: 'female', text: 'Good luck, and good luck on your final, too.' },
    ],
    questions: [
      {
        id: 'f05-ls-cv-noisy-neighbor-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'What is the conversation mainly about?',
        options: [
          'How to file a report with the housing office',
          'Where the student can study for his statistics final',
          'How the student should handle a noisy neighbor',
          'Why quiet hours are longer during exam week',
        ],
        answer: [2],
        explanation:
          'El estudiante se queja de que su vecino pone música "really loud until two or three in the morning", y ambos acuerdan cómo resolverlo. El informe formal y la biblioteca son detalles secundarios.',
      },
      {
        id: 'f05-ls-cv-noisy-neighbor-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'Why does the resident assistant advise against filing a formal report right away?',
        options: [
          'It would probably take too long to help.',
          'The neighbor has not broken any rules.',
          'The housing office is closed during exams.',
          'Only students can file that kind of report.',
        ],
        answer: [0],
        explanation:
          'Explica que el informe "can take a week to process. By then, exams would be over". La segunda opción contradice lo dicho: las horas de silencio empiezan a las ocho, así que el vecino sí incumple las normas.',
      },
      {
        id: 'f05-ls-cv-noisy-neighbor-q3',
        kind: 'single',
        skill: 'inference',
        prompt: 'What does the resident assistant imply when she says most people "don\'t realize how thin the walls are"?',
        options: [
          'The building needs better soundproofing.',
          'The student should move to a different room.',
          'The neighbor is breaking the rules on purpose.',
          "He probably doesn't know he's bothering anyone.",
        ],
        answer: [3],
        explanation:
          'Con esa frase sugiere que el vecino probablemente no sabe que molesta, y por eso "A friendly knock usually works faster". La tercera opción dice lo contrario (que lo hace a propósito).',
      },
    ],
  },
  {
    id: 'f05-ls-cv-capstone-privacy',
    form: 5,
    section: 'listening',
    task: 'conversation',
    title: 'Privacy in a Capstone App',
    topic: 'technology',
    difficulty: 'hard',
    context: 'Listen to a conversation between a student and a computer science professor.',
    script: [
      { speaker: 'Professor', voice: 'female', text: "Come in, Jason. I've been looking at the demo of your capstone app. The campus event finder is a nice idea, but I have some concerns about the location data." },
      { speaker: 'Student', voice: 'male', text: 'Oh. The app needs location to show events near the user. Is that a problem?' },
      { speaker: 'Professor', voice: 'female', text: "Needing location isn't the problem. The problem is how you collect it. Right now the app records the user's position every five minutes, even when it's closed, and it stores the whole history on your server." },
      { speaker: 'Student', voice: 'male', text: "I did that so I could recommend events based on where people usually go. Like, if someone's always near the gym, the app suggests fitness classes." },
      { speaker: 'Professor', voice: 'female', text: "I understand the reasoning. But think about what that history reveals: where someone lives, when they're home, which clinic they visit. If your server were ever breached, that's very sensitive information. And most users would never expect an event app to track them in the background." },
      { speaker: 'Student', voice: 'male', text: 'So should I just remove the recommendation feature?' },
      { speaker: 'Professor', voice: 'female', text: 'Not necessarily. There\'s a principle called data minimization: collect only what you need for a specific purpose. You could check location only while the app is open, and do the matching on the phone itself, so the raw coordinates never reach your server.' },
      { speaker: 'Student', voice: 'male', text: 'That would mean rewriting the recommendation part. Right now it runs on the server.' },
      { speaker: 'Professor', voice: 'female', text: "It would. But for a capstone, showing that you can design with privacy in mind is worth more than one extra feature. The review committee will definitely ask about it. Also, add a clear screen that explains what's collected and lets users opt out." },
      { speaker: 'Student', voice: 'male', text: "Okay. I'll start by moving the matching to the phone, and then I'll add the consent screen. Could I show you the revised version next week?" },
      { speaker: 'Professor', voice: 'female', text: 'Absolutely. Send me a message when it\'s ready.' },
    ],
    questions: [
      {
        id: 'f05-ls-cv-capstone-privacy-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'What is the main purpose of the conversation?',
        options: [
          "To address how the student's app handles location data",
          "To decide whether the student's app idea is good enough",
          'To explain how to protect a server from attacks',
          'To help the student add a fitness-class feature',
        ],
        answer: [0],
        explanation:
          'La profesora lo dice al principio: "I have some concerns about the location data", y toda la conversación trata de cómo recoger esos datos. De hecho, la idea de la aplicación le parece buena ("a nice idea").',
      },
      {
        id: 'f05-ls-cv-capstone-privacy-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'What does the professor suggest the student do?',
        options: [
          'Remove the recommendation feature entirely',
          'Store the location history on a safer server',
          'Do the matching on the phone, not the server',
          'Record locations less often in the background',
        ],
        answer: [2],
        explanation:
          'Propone "do the matching on the phone itself, so the raw coordinates never reach your server". Ante la idea de eliminar la función responde "Not necessarily".',
      },
      {
        id: 'f05-ls-cv-capstone-privacy-q3',
        kind: 'single',
        skill: 'attitude',
        prompt: 'What is the professor\'s attitude toward the extra work the changes will require?',
        options: [
          'She worries it will delay his graduation.',
          'She thinks it is worthwhile for his project.',
          'She feels it is optional for a student app.',
          'She expects the committee to reject the app.',
        ],
        answer: [1],
        explanation:
          'Admite que habrá que reescribir ("It would"), pero añade que diseñar pensando en la privacidad "is worth more than one extra feature". También dice que el comité preguntará por ello, no que vaya a rechazarlo.',
      },
    ],
  },

  // ---------- Announcements ----------
  {
    id: 'f05-ls-an-online-office-hours',
    form: 5,
    section: 'listening',
    task: 'announcement',
    title: 'Online Office Hours Next Week',
    topic: 'campus-life',
    difficulty: 'easy',
    context: 'Listen to a professor making an announcement at the end of class.',
    script: [
      {
        speaker: 'Professor',
        voice: 'female',
        text: "Before you go, a quick announcement about office hours. Next week I'll be attending a conference in Denver, so I won't be on campus from Monday to Friday. However, I'll still hold office hours at the usual times, Tuesday and Thursday from two to four, but they'll be online. The video link will be posted on the course page under Announcements by Sunday evening. You don't need an appointment. Just click the link and wait in the virtual waiting room, and I'll let you in one at a time. If you have questions about the essay that's due next Friday, this is a good chance to ask them. Regular office hours in my office will start again the following Tuesday.",
      },
    ],
    questions: [
      {
        id: 'f05-ls-an-online-office-hours-q1',
        kind: 'single',
        skill: 'purpose',
        prompt: 'What is the main purpose of the announcement?',
        options: [
          "To cancel next week's office hours",
          'To describe a conference in Denver next week',
          'To remind students about an essay',
          'To explain a change to office hours',
        ],
        answer: [3],
        explanation:
          'La profesora no cancela las tutorías: "I\'ll still hold office hours at the usual times… but they\'ll be online". El congreso y el ensayo son detalles que explican o acompañan ese cambio.',
      },
      {
        id: 'f05-ls-an-online-office-hours-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'Where will students find the video link?',
        options: ['In an email sent on Monday', 'On the course page', 'On the conference website', 'On her office door'],
        answer: [1],
        explanation: 'La profesora dice: "The video link will be posted on the course page under Announcements by Sunday evening". Las otras ubicaciones no se mencionan en el anuncio.',
      },
      {
        id: 'f05-ls-an-online-office-hours-q3',
        kind: 'single',
        skill: 'inference',
        prompt: 'What can be inferred about students who join the online office hours?',
        options: [
          'They must book an appointment in advance.',
          'They will meet the professor as a large group.',
          'They may have to wait for their turn.',
          'They can only join on Monday or Friday.',
        ],
        answer: [2],
        explanation:
          'Deben esperar en "the virtual waiting room", y la profesora los dejará entrar "one at a time", así que quizá tengan que esperar su turno. Además dice "You don\'t need an appointment", lo que descarta la primera opción.',
      },
    ],
  },
  {
    id: 'f05-ls-an-interlibrary-loan',
    form: 5,
    section: 'listening',
    task: 'announcement',
    title: 'New Interlibrary Loan Portal',
    topic: 'campus-life',
    difficulty: 'medium',
    context: 'Listen to an announcement in the university library.',
    script: [
      {
        speaker: 'Announcer',
        voice: 'male',
        text: "Attention, library users. Starting this Monday, all interlibrary loan requests must be submitted through our new online portal, which you can reach from the library homepage. Paper request forms at the circulation desk will no longer be accepted. To log in, simply use your university username and password. Through interlibrary loan, you can borrow materials that our library doesn't own from partner libraries across the country. Journal articles are usually delivered as PDF files to your email within two to three days. Books take longer, typically seven to ten days, because they have to be shipped. When a book arrives, you'll get a notification, and you can pick it up at the circulation desk. So if you need a book for a paper that's due at the end of the month, we recommend requesting it as soon as possible.",
      },
    ],
    questions: [
      {
        id: 'f05-ls-an-interlibrary-loan-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'What is the announcement mainly about?',
        options: [
          'A new system for interlibrary loan requests',
          "Changes to the library's opening hours",
          'How to log in to the university email system',
          'A new partnership between national libraries',
        ],
        answer: [0],
        explanation:
          'El anuncio presenta el nuevo portal: "all interlibrary loan requests must be submitted through our new online portal". El usuario y la contraseña son solo un detalle sobre cómo entrar.',
      },
      {
        id: 'f05-ls-an-interlibrary-loan-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'How long does it usually take to receive a journal article?',
        options: ['One day', 'Seven to ten days', 'About a month', 'Two to three days'],
        answer: [3],
        explanation: '"Journal articles are usually delivered as PDF files… within two to three days." "Seven to ten days" es el plazo de los libros.',
      },
      {
        id: 'f05-ls-an-interlibrary-loan-q3',
        kind: 'single',
        skill: 'inference',
        prompt: 'What is implied about students who need a book for a paper due soon?',
        options: [
          'They should use the paper forms at the desk.',
          'They might not get it in time if they wait.',
          'They will receive the book as a PDF file.',
          'They must ask the library to buy a copy.',
        ],
        answer: [1],
        explanation:
          'Los libros tardan "seven to ten days" y el anunciante recomienda "requesting it as soon as possible"; si esperan, puede que no llegue a tiempo. Los formularios en papel "will no longer be accepted".',
      },
    ],
  },
  {
    id: 'f05-ls-an-makeup-lab-policy',
    form: 5,
    section: 'listening',
    task: 'announcement',
    title: 'Revised Lab Attendance Policy',
    topic: 'biology',
    difficulty: 'hard',
    context: 'Listen to an announcement from the biology department.',
    script: [
      {
        speaker: 'Announcer',
        voice: 'female',
        text: "This is an announcement from the Department of Biology for all students in introductory biology labs. Starting this semester, each student may make up only one missed lab per semester. To qualify, you must submit documentation within five days of the missed session, for example, a note from a health care provider, or a letter from a coach or the dean's office for an official university event. Personal travel, including leaving early for the holidays, does not count as a valid reason. Make-up sessions are held during the last week of each month, and space is limited, so register on the department website as soon as your documentation is approved. Any additional missed lab will receive a score of zero, regardless of the reason. Students with a long-term medical condition should contact Disability Services rather than their lab instructor.",
      },
    ],
    questions: [
      {
        id: 'f05-ls-an-makeup-lab-policy-q1',
        kind: 'single',
        skill: 'purpose',
        prompt: 'What is the main purpose of the announcement?',
        options: [
          'To announce new dates for the biology final',
          'To encourage students to join sports teams',
          'To explain new rules for making up missed labs',
          'To describe changes to the content of the labs',
        ],
        answer: [2],
        explanation:
          'El anuncio explica que "each student may make up only one missed lab per semester" y qué documentos se exigen. Los entrenadores ("coach") solo aparecen como ejemplo de justificante.',
      },
      {
        id: 'f05-ls-an-makeup-lab-policy-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'Which of the following would be accepted as a reason for missing a lab?',
        options: [
          'Playing in an official university game',
          'Leaving early for a family holiday',
          "Attending a friend's wedding out of town",
          'Taking a weekend trip with classmates',
        ],
        answer: [0],
        explanation:
          'Se acepta "a letter from a coach or the dean\'s office for an official university event". En cambio, "Personal travel, including leaving early for the holidays, does not count", lo que descarta las otras tres.',
      },
      {
        id: 'f05-ls-an-makeup-lab-policy-q3',
        kind: 'single',
        skill: 'inference',
        prompt: 'What will most likely happen to a student who misses a second lab because of illness?',
        options: [
          'The student can make it up at the end of the month.',
          'The student must contact Disability Services.',
          "The student will need a doctor's note to make it up.",
          'The student will receive no credit for that lab.',
        ],
        answer: [3],
        explanation:
          'Solo se puede recuperar una práctica, y "Any additional missed lab will receive a score of zero, regardless of the reason", aunque sea por enfermedad. Disability Services es solo para "a long-term medical condition".',
      },
    ],
  },

  // ---------- Academic Talks ----------
  {
    id: 'f05-ls-at-geode-formation',
    form: 5,
    section: 'listening',
    task: 'academic-talk',
    title: 'How Geodes Grow Their Crystals',
    topic: 'geology',
    difficulty: 'easy',
    context: 'Listen to part of a lecture in a geology class.',
    script: [
      { speaker: 'Professor', voice: 'male', text: "Okay, I brought something to show you today. From the outside, this rock looks pretty boring, doesn't it? It's round, gray, and a little bumpy. But this one has been cut in half, so take a look inside. It's hollow, and the walls are covered with sparkling crystals. This is a geode, and today I want to explain how a plain rock like this ends up full of crystals." },
      { speaker: 'Professor', voice: 'male', text: 'Every geode starts as an empty space inside a rock. In volcanic areas, that space is often an old gas bubble. When lava cools and hardens, bubbles of gas can get trapped in it and leave round holes behind. In limestone, a hollow can form in a different way, when water slowly dissolves part of the rock. Either way, step one is a hole.' },
      { speaker: 'Professor', voice: 'male', text: "Step two needs water. Groundwater carries dissolved minerals, especially silica, which is what quartz is made of. That water seeps through tiny openings in the rock and into the hollow space. Over time, the minerals come out of the water and stick to the walls. Usually a thin layer forms first and becomes an outer shell, and that layer is harder than the rock around it. That's why geodes often survive after the surrounding rock wears away. Then crystals start to grow on top of that layer, and they grow inward, pointing toward the center." },
      { speaker: 'Professor', voice: 'male', text: "This process is very slow. A geode may take thousands of years to form, or even much longer. The crystals also depend on what the water carries. Clear quartz is the most common, but small amounts of iron can help produce amethyst, the purple kind. And if the minerals keep coming until the whole space is filled, there's no hollow left. Then we don't call it a geode anymore. We call it a nodule." },
    ],
    questions: [
      {
        id: 'f05-ls-at-geode-formation-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'What is the lecture mainly about?',
        options: [
          'Why volcanic rock is full of gas bubbles',
          'Where the largest amethyst geodes are found',
          'How crystals grow inside hollow rocks',
          'How to tell quartz apart from other minerals',
        ],
        answer: [2],
        explanation:
          'El profesor anuncia el tema: "today I want to explain how a plain rock like this ends up full of crystals", y describe el hueco inicial, el agua con minerales y el crecimiento de los cristales. Las burbujas de gas son solo una de las formas de crear el hueco.',
      },
      {
        id: 'f05-ls-at-geode-formation-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'According to the professor, why do geodes often survive after the rock around them wears away?',
        options: [
          'Their outer layer is harder than that rock.',
          'Their crystals all point in toward the center.',
          'Groundwater keeps filling their hollow space.',
          'They form only in very hard volcanic rock.',
        ],
        answer: [0],
        explanation:
          'La primera capa que se forma es más dura: "that layer is harder than the rock around it. That\'s why geodes often survive after the surrounding rock wears away". Las geodas también se forman en caliza ("limestone"), no solo en roca volcánica.',
      },
      {
        id: 'f05-ls-at-geode-formation-q3',
        kind: 'single',
        skill: 'function',
        prompt: 'Why does the professor say that the rock looks boring from the outside?',
        options: [
          'To explain why geodes are not worth collecting',
          'To show that the rock has not been cut open yet',
          'To suggest that most geodes contain no crystals',
          'To contrast its plain outside with its inside',
        ],
        answer: [3],
        explanation:
          'Por fuera la roca "looks pretty boring", pero por dentro "the walls are covered with sparkling crystals": el profesor quiere marcar el contraste. Además, la roca ya está cortada ("this one has been cut in half").',
      },
      {
        id: 'f05-ls-at-geode-formation-q4',
        kind: 'single',
        skill: 'inference',
        prompt: 'What can be inferred about a geode that is still hollow in the center?',
        options: [
          'It formed in limestone rather than in lava.',
          'Its mineral supply stopped before it filled.',
          'Its outer shell is made of amethyst crystals.',
          'Its crystals grew outward from the center.',
        ],
        answer: [1],
        explanation:
          'Si los minerales siguen llegando "until the whole space is filled, there\'s no hollow left" y la roca pasa a llamarse "nodule". Por tanto, una geoda que sigue hueca dejó de recibir minerales antes de llenarse. Los cristales crecen "inward", no hacia afuera.',
      },
    ],
  },
  {
    id: 'f05-ls-at-domesday-book',
    form: 5,
    section: 'listening',
    task: 'academic-talk',
    title: 'The Domesday Book',
    topic: 'history',
    difficulty: 'medium',
    context: 'Listen to part of a lecture in a medieval history class.',
    script: [
      { speaker: 'Professor', voice: 'female', text: 'Last week we discussed the Norman Conquest. In ten sixty-six, William, Duke of Normandy, defeated the English at the Battle of Hastings and became king of England. Twenty years later, he did something few medieval rulers ever attempted. At Christmas in ten eighty-five, according to one chronicle, he held long and deep discussions with his advisers about the country, and he ordered a survey of the whole kingdom. The results, gathered the following year, are what we now call the Domesday Book.' },
      { speaker: 'Professor', voice: 'female', text: 'So how did it work? The king sent groups of royal officials, called commissioners, to different regions. In each area, local people had to swear an oath and answer a set list of questions. Who held this land before the Conquest? Who holds it now? How many plowing teams, how many peasants, how much woodland and meadow, how many mills? And how much was the land worth then, and how much is it worth now? Keep in mind that most English landowners had been replaced by Norman lords, so the survey also documented that enormous transfer of property.' },
      { speaker: 'Professor', voice: 'female', text: "People at the time were impressed, but also resentful. One English chronicler complained that not a single ox, cow, or pig was left out. That's probably an exaggeration, but it tells us how thorough, and how intrusive, the survey felt to ordinary people." },
      { speaker: 'Student', voice: 'male', text: 'Why is it called Domesday? Does that mean doomsday?' },
      { speaker: 'Professor', voice: 'female', text: "In a sense, yes. The name came later, nearly a century afterward. A royal treasury official explained that, like the Last Judgment, its decisions could not be appealed. If two people argued over a piece of land, the book's record settled the matter. Historians still debate William's main goal. Most agree he wanted to know what taxes he could collect, but the survey also confirmed who held what after the Conquest." },
      { speaker: 'Professor', voice: 'female', text: 'William died the next year, and the work was never fully completed; London, for instance, is missing. Even so, the book covers more than thirteen thousand places, and for many English villages it is the earliest written record of their existence.' },
    ],
    questions: [
      {
        id: 'f05-ls-at-domesday-book-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'What is the lecture mainly about?',
        options: [
          'How William won the Battle of Hastings',
          'A survey William ordered of his kingdom',
          'Why medieval people feared the Last Judgment',
          'How English villages kept their own records',
        ],
        answer: [1],
        explanation:
          'La profesora explica el estudio que ordenó Guillermo: "he ordered a survey of the whole kingdom", cuyos resultados son "the Domesday Book". La batalla de Hastings es solo el contexto inicial.',
      },
      {
        id: 'f05-ls-at-domesday-book-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'According to the professor, which of the following was one of the questions local people had to answer?',
        options: [
          'How many soldiers they could send to the king',
          'Whether they supported the new Norman king',
          'How much grain they had eaten in the past year',
          'Who had held the land before the Conquest',
        ],
        answer: [3],
        explanation:
          'Entre las preguntas estaba "Who held this land before the Conquest?". La profesora no menciona soldados, lealtad al rey ni el cereal consumido.',
      },
      {
        id: 'f05-ls-at-domesday-book-q3',
        kind: 'single',
        skill: 'function',
        prompt: "Why does the professor mention the chronicler's complaint about oxen, cows, and pigs?",
        options: [
          'To show how thorough the survey seemed to people',
          'To show that farm animals were taxed more than land',
          'To explain how the book later got its name',
          'To prove that the survey recorded every animal',
        ],
        answer: [0],
        explanation:
          'La queja muestra "how thorough, and how intrusive, the survey felt to ordinary people". La profesora añade que es "probably an exaggeration", así que no prueba que se registraran todos los animales.',
      },
      {
        id: 'f05-ls-at-domesday-book-q4',
        kind: 'single',
        skill: 'inference',
        prompt: 'What does the professor imply about the name Domesday?',
        options: [
          "It was chosen by William's own advisers.",
          'It referred to the year that William died.',
          'William did not use that name for it.',
          'It came from an old word for a royal tax.',
        ],
        answer: [2],
        explanation:
          'El nombre apareció "nearly a century afterward", y Guillermo murió al año siguiente del estudio ("William died the next year"), así que él no pudo llamarlo así. El nombre se compara con "the Last Judgment", no con un impuesto.',
      },
    ],
  },
  {
    id: 'f05-ls-at-heat-pumps',
    form: 5,
    section: 'listening',
    task: 'academic-talk',
    title: 'How Heat Pumps Move Heat',
    topic: 'engineering',
    difficulty: 'hard',
    context: 'Listen to part of a lecture in a mechanical engineering class.',
    script: [
      { speaker: 'Professor', voice: 'male', text: "Today's topic is the heat pump. Let me start with a puzzle. Heat naturally flows from warmer things to cooler ones; a hot cup of coffee cools down, but it never warms up by itself. Yet a heat pump takes heat from cold outdoor air and delivers it into a warm house, the opposite of the natural direction. That's allowed, but only if you supply work, and here the work comes from an electric compressor." },
      { speaker: 'Student', voice: 'female', text: "But if it's below freezing outside, is there really any heat out there to collect?" },
      { speaker: 'Professor', voice: 'male', text: 'There is. Air at minus ten degrees Celsius still contains plenty of thermal energy; it only feels cold compared with our bodies. The trick is to make something even colder than that air, so heat flows into it. That something is a refrigerant, a fluid chosen because it boils at very low temperatures. The cycle has four main steps.' },
      { speaker: 'Professor', voice: 'male', text: "First, cold, low-pressure liquid refrigerant flows through the outdoor coil. Because it's colder than the air, it absorbs heat and evaporates into a gas. Second, the compressor squeezes that gas, raising its temperature until it's hotter than the air indoors. Third, in the indoor coil, it releases that heat to the room and condenses back into a liquid. Finally, an expansion valve drops the pressure suddenly, the refrigerant becomes very cold again, and the loop starts over." },
      { speaker: 'Professor', voice: 'male', text: 'If this sounds familiar, it should. A refrigerator runs the same cycle, pulling heat out of the food compartment and releasing it into your kitchen.' },
      { speaker: 'Professor', voice: 'male', text: "Now, efficiency. Engineers use the coefficient of performance: heat delivered divided by electrical energy consumed. An electric space heater converts electricity directly into heat, so its ratio can never be more than one. A typical heat pump in mild weather delivers roughly two to four units of heat per unit of electricity. That doesn't violate conservation of energy, because most of that heat is moved, not created. The catch is that as outdoor temperatures fall, the pump must lift heat across a larger gap, so its performance declines. Modern cold-climate models still work well below freezing, but many systems keep a backup heater for the coldest days." },
    ],
    questions: [
      {
        id: 'f05-ls-at-heat-pumps-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'What is the lecture mainly about?',
        options: [
          'Why refrigerants must boil at high temperatures',
          'How refrigerators keep food from spoiling',
          'Why electric heaters waste most of their energy',
          'How heat pumps move heat into warm buildings',
        ],
        answer: [3],
        explanation:
          'La clase explica cómo una bomba de calor "takes heat from cold outdoor air and delivers it into a warm house" mediante el ciclo del refrigerante. El frigorífico es solo un ejemplo, y el refrigerante hierve "at very low temperatures", no a temperaturas altas.',
      },
      {
        id: 'f05-ls-at-heat-pumps-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'According to the professor, what happens to the refrigerant in the outdoor coil?',
        options: [
          'It is compressed until it becomes hotter than the air.',
          'It releases heat and condenses back into a liquid.',
          'It absorbs heat from the air and turns into a gas.',
          'It passes through a valve that lowers its pressure.',
        ],
        answer: [2],
        explanation:
          'En la unidad exterior, como el refrigerante está más frío que el aire, "it absorbs heat and evaporates into a gas". La compresión, la condensación en la unidad interior y la válvula de expansión son los otros pasos del ciclo.',
      },
      {
        id: 'f05-ls-at-heat-pumps-q3',
        kind: 'single',
        skill: 'function',
        prompt: 'Why does the professor mention a refrigerator?',
        options: [
          'To explain why heat pumps need a backup heater',
          'To give a familiar example of the same cycle',
          'To show that heat pumps can also cool a home',
          'To compare how efficient the two devices are',
        ],
        answer: [1],
        explanation:
          '"If this sounds familiar, it should. A refrigerator runs the same cycle": el profesor usa un aparato conocido como ejemplo del mismo ciclo. No compara la eficiencia de ambos aparatos ni habla de enfriar la casa.',
      },
      {
        id: 'f05-ls-at-heat-pumps-q4',
        kind: 'single',
        skill: 'inference',
        prompt: 'What does the professor imply about an electric space heater?',
        options: [
          'It needs more electricity for the same heat.',
          'It breaks the law of conservation of energy.',
          'It works poorly when it is cold outdoors.',
          'It moves heat indoors from the outside air.',
        ],
        answer: [0],
        explanation:
          'Su relación "can never be more than one", mientras que una bomba de calor da "roughly two to four units of heat per unit of electricity". Por tanto, la estufa eléctrica necesita más electricidad para dar el mismo calor. Ninguno de los dos aparatos rompe la conservación de la energía.',
      },
    ],
  },
];
