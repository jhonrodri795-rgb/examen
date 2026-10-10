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
    id: 'f05-ls-at-glacial-landforms',
    form: 5,
    section: 'listening',
    task: 'academic-talk',
    title: 'What Glaciers Leave Behind',
    topic: 'geology',
    difficulty: 'easy',
    context: 'Listen to part of a lecture in a geology class.',
    script: [
      { speaker: 'Professor', voice: 'male', text: "Okay, last time we talked about how glaciers form. Today let's look at what they leave behind. The great ice sheets of the last ice age melted thousands of years ago, but you can still read their history in the landscape, if you know what to look for." },
      { speaker: 'Professor', voice: 'male', text: "Let's start with valleys. A river cuts down into the land and usually makes a narrow valley with a V shape. But when a glacier flows through that same valley, it acts like a giant bulldozer. The ice can be hundreds of meters thick, and it carries rocks frozen into its base. Those rocks scrape the bottom and the sides of the valley, widening and deepening it. The result is a valley with steep walls and a broad, flat floor, what we call a U-shaped valley. Yosemite Valley in California is a classic example." },
      { speaker: 'Professor', voice: 'male', text: 'Second, moraines. As a glacier moves, it picks up huge amounts of rock debris, everything from fine clay to enormous boulders. When the ice melts, it simply drops all of this material in a jumbled, unsorted pile. A ridge of debris that builds up at the very front of a glacier, marking the farthest point the ice reached, is called a terminal moraine. Long Island, in New York, is largely made of moraine deposits.' },
      { speaker: 'Professor', voice: 'male', text: "Finally, there are glacial erratics. These are large boulders sitting in places where they clearly don't belong. Imagine a granite boulder resting in a field where all the bedrock is limestone. For a long time, people couldn't explain them, and some thought great floods had carried them. We now know that glaciers transported them, sometimes hundreds of kilometers, and left them behind when the ice melted. So an erratic is a kind of clue: by matching its rock type to its source, geologists can tell which direction the ice was moving." },
    ],
    questions: [
      {
        id: 'f05-ls-at-glacial-landforms-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'What is the lecture mainly about?',
        options: [
          'How glaciers form from layers of snow',
          'Why the last ice age came to an end',
          'Landforms that glaciers leave behind',
          'Differences between rivers and glaciers',
        ],
        answer: [2],
        explanation:
          'El profesor anuncia el tema: "Today let\'s look at what they leave behind", y describe valles en U, morrenas y bloques erráticos. La formación de los glaciares se trató en la clase anterior ("last time").',
      },
      {
        id: 'f05-ls-at-glacial-landforms-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'According to the professor, what gives a glacial valley its broad, flat floor?',
        options: [
          'Rocks in the ice scrape and widen the valley.',
          'Rivers cut downward into the valley floor over time.',
          'Floods leave layers of clay on the bottom.',
          'Melting ice fills the valley with boulders.',
        ],
        answer: [0],
        explanation:
          'Las rocas incrustadas en la base del hielo "scrape the bottom and the sides of the valley, widening and deepening it". Los ríos, en cambio, forman valles en V.',
      },
      {
        id: 'f05-ls-at-glacial-landforms-q3',
        kind: 'single',
        skill: 'function',
        prompt: 'Why does the professor mention a granite boulder resting on limestone?',
        options: [
          'To show how floods can move very heavy rocks',
          'To explain how terminal moraines are formed',
          'To compare two common kinds of bedrock',
          'To give an example of a glacial erratic',
        ],
        answer: [3],
        explanation:
          'Es un ejemplo de bloque errático, una roca "in places where they clearly don\'t belong". La idea de las inundaciones fue una explicación antigua y equivocada.',
      },
      {
        id: 'f05-ls-at-glacial-landforms-q4',
        kind: 'single',
        skill: 'inference',
        prompt: 'What can be inferred about a terminal moraine?',
        options: [
          'It forms when rivers sort rocks by size.',
          'It shows how far a glacier once advanced.',
          'It is found mainly in California and New York.',
          'It is made mostly of granite boulders.',
        ],
        answer: [1],
        explanation:
          'La morrena terminal se forma en el frente del glaciar, "marking the farthest point the ice reached", así que indica hasta dónde avanzó el hielo. Los depósitos son "unsorted", es decir, no están clasificados por tamaño.',
      },
    ],
  },
  {
    id: 'f05-ls-at-columbian-exchange',
    form: 5,
    section: 'listening',
    task: 'academic-talk',
    title: 'The Columbian Exchange',
    topic: 'history',
    difficulty: 'medium',
    context: 'Listen to part of a lecture in a history class.',
    script: [
      { speaker: 'Professor', voice: 'female', text: "When people talk about 1492, they usually focus on Columbus and the voyages themselves. But many historians argue that the most important consequences were biological. In 1972, the historian Alfred Crosby gave this process a name: the Columbian Exchange. It refers to the transfer of plants, animals, and diseases between the Americas and Afro-Eurasia after Columbus's voyages." },
      { speaker: 'Professor', voice: 'female', text: "Let's start with crops. From the Americas came maize, potatoes, tomatoes, cacao, and chili peppers. It's hard to imagine Italian cooking without tomatoes, but tomatoes were unknown in Europe before the sixteenth century. The potato was especially significant. It produces a lot of calories on a small plot of land, and many historians link its spread to the rapid population growth in northern Europe in the 1700s and 1800s. Maize, meanwhile, became a staple food in parts of Africa and China." },
      { speaker: 'Professor', voice: 'female', text: 'Movement in the other direction was just as dramatic. Europeans brought wheat, sugarcane, and coffee to the Americas, along with horses, cattle, and pigs. Horses had actually lived in North America long before, but they had died out thousands of years earlier. Once they returned, they transformed life on the Great Plains. Peoples like the Comanche became expert riders, and horses changed the way they hunted bison, traded, and fought.' },
      { speaker: 'Professor', voice: 'female', text: 'But the exchange also had a devastating side. Diseases such as smallpox, measles, and influenza had circulated in Afro-Eurasia for centuries, so many people there had some immunity. Indigenous peoples of the Americas had never been exposed to them. As a result, epidemics swept through communities, often spreading ahead of the Europeans themselves. Estimates vary, but in many regions the population fell by more than half within a century of contact.' },
      { speaker: 'Professor', voice: 'female', text: 'So when you think about the Columbian Exchange, remember that it reshaped diets, economies, and populations on both sides of the Atlantic, and not always for the better.' },
    ],
    questions: [
      {
        id: 'f05-ls-at-columbian-exchange-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'What is the lecture mainly about?',
        options: [
          'The navigation methods that Columbus used on his voyages',
          "The biological transfers after Columbus's voyages",
          'How horses first evolved in North America',
          'Why tomatoes became popular in Italian cooking',
        ],
        answer: [1],
        explanation:
          'La profesora define el tema: "the transfer of plants, animals, and diseases between the Americas and Afro-Eurasia after Columbus\'s voyages". Los tomates italianos son solo un ejemplo.',
      },
      {
        id: 'f05-ls-at-columbian-exchange-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'According to the professor, why did diseases from Afro-Eurasia affect Indigenous peoples so severely?',
        options: [
          'Europeans spread the diseases on purpose.',
          'The diseases were new in Afro-Eurasia as well.',
          'Indigenous peoples lived in larger, crowded cities.',
          'Indigenous peoples had no prior exposure to them.',
        ],
        answer: [3],
        explanation:
          '"Indigenous peoples of the Americas had never been exposed to them", mientras que en Afro-Eurasia esas enfermedades "had circulated… for centuries", así que no eran nuevas allí.',
      },
      {
        id: 'f05-ls-at-columbian-exchange-q3',
        kind: 'single',
        skill: 'function',
        prompt: 'Why does the professor mention the Comanche?',
        options: [
          'To show how horses changed life on the Plains',
          'To name a people who resisted European diseases',
          'To explain why horses died out in North America',
          'To give an example of a group that grew maize',
        ],
        answer: [0],
        explanation:
          'Los menciona justo después de decir que los caballos "transformed life on the Great Plains": los comanches "became expert riders", y los caballos cambiaron su forma de cazar, comerciar y luchar.',
      },
      {
        id: 'f05-ls-at-columbian-exchange-q4',
        kind: 'single',
        skill: 'inference',
        prompt: 'What does the professor suggest about the potato?',
        options: [
          'It was first grown in northern Europe.',
          'It needed more land than most other crops.',
          "It may have helped Europe's population grow.",
          'It replaced maize as a staple food in China.',
        ],
        answer: [2],
        explanation:
          '"Many historians link its spread to the rapid population growth in northern Europe". Además, la patata da muchas calorías "on a small plot of land", lo contrario de necesitar más tierra.',
      },
    ],
  },
  {
    id: 'f05-ls-at-tuned-mass-dampers',
    form: 5,
    section: 'listening',
    task: 'academic-talk',
    title: 'Tuned Mass Dampers in Skyscrapers',
    topic: 'engineering',
    difficulty: 'hard',
    context: 'Listen to part of a lecture in an engineering class.',
    script: [
      { speaker: 'Professor', voice: 'male', text: 'Today I want to talk about a problem every tall building faces: sway. Skyscrapers are designed to bend slightly in strong wind. A perfectly rigid building would actually be more likely to crack. But that flexibility creates a different problem. If the top floors move back and forth too much, people inside start to feel seasick, even though the structure is perfectly safe.' },
      { speaker: 'Professor', voice: 'male', text: "One elegant solution is the tuned mass damper. The idea is to place a very heavy mass near the top of the building and let it move independently. The most famous example is in Taipei 101, in Taiwan, which was the world's tallest building when it opened in 2004. Between its eighty-seventh and ninety-second floors hangs a steel sphere weighing about 660 metric tons, suspended by cables like a giant pendulum." },
      { speaker: 'Student', voice: 'female', text: "But how does adding weight help? Wouldn't a heavier top make the swaying worse?" },
      { speaker: 'Professor', voice: 'male', text: "Good question. The key word is tuned. Every building has a natural frequency, the rate at which it tends to sway when it's pushed. Engineers adjust the length of the pendulum's cables so that its frequency matches the building's. Then, when the wind pushes the building one way, the pendulum lags behind and swings the opposite way, pulling against the building and canceling part of its motion. Large hydraulic cylinders, which work a lot like the shock absorbers in a car, connect the sphere to the structure and turn the energy of that motion into heat." },
      { speaker: 'Professor', voice: 'male', text: "How effective is it? In Taipei 101, the damper can reduce the building's sway by up to forty percent in strong winds. Dampers can also help during earthquakes, although they work best against the steady, repeated pushes of wind, because those match the building's natural frequency. Today, many tall buildings and even some long bridges use similar systems." },
    ],
    questions: [
      {
        id: 'f05-ls-at-tuned-mass-dampers-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'What is the lecture mainly about?',
        options: [
          'Why skyscrapers must be completely rigid',
          'The history of how Taipei 101 was designed and built',
          'How earthquakes damage tall buildings',
          'How a heavy pendulum reduces building sway',
        ],
        answer: [3],
        explanation:
          'La clase explica "the tuned mass damper", un péndulo pesado que reduce el balanceo ("sway") de los rascacielos. La primera opción contradice al profesor: un edificio totalmente rígido "would actually be more likely to crack".',
      },
      {
        id: 'f05-ls-at-tuned-mass-dampers-q2',
        kind: 'single',
        skill: 'detail',
        prompt: "According to the professor, why do engineers adjust the length of the pendulum's cables?",
        options: [
          'To make the sphere heavier during storms',
          'To keep the sphere from hitting the floors',
          "To match its frequency to the building's",
          'To allow the building to bend in strong wind',
        ],
        answer: [2],
        explanation:
          '"Engineers adjust the length of the pendulum\'s cables so that its frequency matches the building\'s." Por eso el sistema se llama "tuned" (sintonizado).',
      },
      {
        id: 'f05-ls-at-tuned-mass-dampers-q3',
        kind: 'single',
        skill: 'function',
        prompt: "Why does the professor compare the hydraulic cylinders to a car's shock absorbers?",
        options: [
          'To show that dampers were first designed for cars',
          'To explain how the cylinders absorb motion energy',
          'To suggest that the cylinders need frequent repair',
          'To explain why the top floors feel like a car ride',
        ],
        answer: [1],
        explanation:
          'Los amortiguadores sirven de ejemplo conocido para explicar que los cilindros "turn the energy of that motion into heat". En ningún momento dice que los amortiguadores se inventaran para coches.',
      },
      {
        id: 'f05-ls-at-tuned-mass-dampers-q4',
        kind: 'single',
        skill: 'inference',
        prompt: 'What does the professor imply about tuned mass dampers and earthquakes?',
        options: [
          'They work less well against earthquakes than wind.',
          'Dampers make earthquake damage worse in tall buildings.',
          'Dampers were originally designed to resist earthquakes.',
          'Dampers cannot be installed in earthquake zones.',
        ],
        answer: [0],
        explanation:
          'Dice que los amortiguadores "can also help during earthquakes, although they work best against the steady, repeated pushes of wind": ayudan con los terremotos, pero menos que con el viento.',
      },
    ],
  },
];
