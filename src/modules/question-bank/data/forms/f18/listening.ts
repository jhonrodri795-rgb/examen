import type { Difficulty, ListeningSet, Topic, Voice } from '../../../types';

/** Simulación n.º 18 — Listening (contenido original). */

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
    form: 18,
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
  cr('f18-ls-cr-lecture-slides', 'easy', 'female', "Has Professor Lin posted the slides from today's lecture yet?", [
    "I'll post the letter later today.",
    'The lecture was about early cities in Asia.',
    'Yes, they went up about an hour ago.',
    'I usually take notes on my laptop.',
  ], 2, 'Es una pregunta de sí/no sobre si ya están las diapositivas; "Yes, they went up about an hour ago" responde directamente ("went up" = se publicaron). "Post the letter" repite el verbo "post" con otro significado (trampa de sonido).'),
  cr('f18-ls-cr-birthday-picnic', 'easy', 'female', "I'm having a birthday picnic in Riverside Park on Sunday. Can you come?", [
    "I'd love to! Should I bring anything?",
    'I went to the park last Sunday.',
    'The picnic tables there are made of wood.',
    'My birthday is in March, actually.',
  ], 0, 'Es una invitación: la respuesta natural la acepta y ofrece ayuda ("Should I bring anything?"). "I went to the park last Sunday" está en pasado y no responde a la invitación; las otras repiten palabras ("picnic", "birthday") sin contestar.', 'daily-life'),
  cr('f18-ls-cr-compare-answers', 'easy', 'male', "Why don't we meet fifteen minutes before class to compare our answers?", [
    'Our class usually lasts about fifty minutes.',
    'I compared prices at two stores.',
    'Because I answered every question.',
    "Good idea. Let's meet outside the room.",
  ], 3, '"Why don\'t we…?" es una sugerencia, no una pregunta sobre la causa; se acepta con "Good idea". La opción "Because I answered every question" malinterpreta "why" como petición de una razón.'),
  cr('f18-ls-cr-last-cereal', 'easy', 'male', 'Sorry, I finished the last of your cereal this morning.', [
    'I usually eat breakfast at eight.',
    "Don't worry. I'll buy more later.",
    'Yes, the cereal was on the top shelf.',
    "You're welcome. Enjoy your breakfast.",
  ], 1, 'Ante una disculpa, la respuesta natural la acepta: "Don\'t worry. I\'ll buy more later". "You\'re welcome" es la respuesta a un agradecimiento, no a una disculpa.', 'daily-life'),
  cr('f18-ls-cr-study-cafe', 'easy', 'female', 'Which café on campus is the best place to study?', [
    'I usually drink tea, not coffee.',
    'Yes, the campus has several cafés.',
    "Try the one in the library. It's quiet.",
    "I've already finished studying for today.",
  ], 2, 'Piden una recomendación ("Which café…?") y solo "Try the one in the library. It\'s quiet" elige un café y da un motivo. "Yes, the campus has several cafés" contesta como si fuera una pregunta de sí/no.'),
  cr('f18-ls-cr-lost-key', 'easy', 'male', 'I think I lost my dorm key somewhere today.', [
    'Oh no! Have you checked with the front desk?',
    'I locked the door when I left this morning.',
    "Congratulations! That's really great news.",
    'The dorm is right next to the new gym.',
  ], 0, 'Es una mala noticia: lo adecuado es mostrar preocupación y sugerir una solución ("Oh no! Have you checked with the front desk?"). "Congratulations!" es una reacción a una buena noticia; las otras solo repiten "dorm" o hablan de otra cosa.'),

  // ---------- Choose a Response: medium ----------
  cr('f18-ls-cr-storm-online', 'medium', 'female', 'With this storm coming, maybe we should meet online instead of at the library.', [
    'The library has a really great online catalog.',
    'It stormed all night last weekend.',
    'I met her online a few years ago.',
    "That makes sense. I'll send everyone a link.",
  ], 3, 'Es una sugerencia ("maybe we should meet online"); "That makes sense. I\'ll send everyone a link" la acepta y propone el siguiente paso. Las demás reutilizan "online", "storm" o "library" sin responder a la propuesta.'),
  cr('f18-ls-cr-chapter-or-section', 'medium', 'male', 'Did the professor say we should read chapter five or section five?', [
    'Yes, she said we should.',
    "Section five, I think. It's short.",
    "I've read five chapters this week.",
    "She'll be in her office until five.",
  ], 1, 'Es una pregunta alternativa ("chapter five or section five?") que pide aclarar cuál de las dos; "Section five, I think" elige una. "Yes, she said we should" responde como si fuera una pregunta de sí/no.'),
  cr('f18-ls-cr-online-classes', 'medium', 'female', 'Honestly, I think online classes are just as effective as in-person ones.', [
    'Maybe, but I find it harder to focus at home.',
    'My classes are mostly on Tuesday mornings.',
    'The effects lasted for several weeks.',
    "They're held in the science building.",
  ], 0, 'Ante una opinión se responde con acuerdo o desacuerdo razonado: "Maybe, but I find it harder to focus at home". "The effects lasted…" es una trampa de sonido ("effective"/"effects").'),
  cr('f18-ls-cr-job-during-finals', 'medium', 'male', 'Do you think I should take that part-time job, even though finals start next week?', [
    'I took a job at the bookstore last year.',
    'Finals are usually held in the gym.',
    "I'd wait until finals are over.",
    'Yes, I think he should take it.',
  ], 2, 'Pide consejo ("Do you think I should…?"); "I\'d wait until finals are over" lo da teniendo en cuenta los exámenes. "Yes, I think he should" usa la persona equivocada (he en lugar de you).', 'daily-life'),
  cr('f18-ls-cr-rent-reminder', 'medium', 'female', 'Just a reminder that the rent is due on the first of the month.', [
    'First, I need to finish reading this chapter.',
    'I rented a bike for the weekend.',
    'The month went by really quickly.',
    "Thanks. I'll send you my share tonight.",
  ], 3, 'Es un recordatorio; lo natural es agradecerlo y decir cuándo se pagará: "Thanks. I\'ll send you my share tonight". "First, I need…" y "I rented a bike" son trampas de sonido ("first", "rent").', 'daily-life'),
  cr('f18-ls-cr-review-session', 'medium', 'male', "You're coming to the review session, aren't you?", [
    'Yes, I reviewed that new restaurant online.',
    'Definitely. I need all the help I can get.',
    "No, it isn't. It's on Thursday.",
    'The session lasted about two hours.',
  ], 1, 'La pregunta coletilla ("aren\'t you?") busca confirmación; "Definitely. I need all the help I can get" confirma y explica por qué. "No, it isn\'t" no concuerda con "You\'re coming" (debería ser "I am/I\'m not").'),

  // ---------- Choose a Response: hard ----------
  cr('f18-ls-cr-framing-grade', 'hard', 'female', "Let's just say I won't be framing my grade on that exam.", [
    'That bad, huh? Want to study together next time?',
    'Great! You should hang it up on your bedroom wall.',
    'I can lend you a frame if you need one.',
    'The exam is next Tuesday at nine.',
  ], 0, '"I won\'t be framing my grade" es una forma indirecta de decir que la nota fue mala (no la enmarcará para presumir). La respuesta adecuada reconoce la decepción y ofrece ayuda. "Great! You should hang it…" y "lend you a frame" interpretan la frase de forma literal.'),
  cr('f18-ls-cr-participation-weight', 'hard', 'male', 'Do you have any idea how the professor weighs participation?', [
    'Yes, I have an idea for my project.',
    'She weighs about the same as I do.',
    "I think it's fifteen percent of the grade.",
    'I participated in a lot of class discussions.',
  ], 2, 'Es una pregunta indirecta: "Do you have any idea how…" pide la información (el peso de la participación en la nota), y "fifteen percent of the grade" la da. "I have an idea" y "She weighs" toman las palabras de forma literal.'),
  cr('f18-ls-cr-data-back-up', 'hard', 'female', "You could be right, though I'm not sure the data back that up.", [
    "Great, I'm glad you agree with me completely.",
    'Fair point. Let me check the numbers again.',
    'I backed up the data on my laptop last night.',
    'Yes, I could be there by noon tomorrow.',
  ], 1, 'Es un desacuerdo suavizado ("You could be right, though…"): la otra persona duda de que los datos apoyen la idea. "Fair point. Let me check the numbers again" reconoce la objeción. "You agree with me completely" malinterpreta la cortesía y "backed up the data" es una trampa de sonido ("back up").'),
  cr('f18-ls-cr-backup-regret', 'hard', 'male', "I should've listened when you told me to back up my files.", [
    "I'm sure I'll listen to it later.",
    "Thanks, I'll tell you when I'm done.",
    "No, you didn't tell me about the files.",
    'Oh no! Did you lose all your work?',
  ], 3, '"I should\'ve listened" expresa arrepentimiento: implica que perdió sus archivos por no hacer copia de seguridad. La reacción natural es preguntar por el problema ("Did you lose all your work?"). "No, you didn\'t tell me" confunde quién dio el consejo.'),
  cr('f18-ls-cr-empty-seat', 'hard', 'female', "I've got an empty seat in my car on Friday.", [
    "That'd be great. I was going to take the bus.",
    'My car is parked behind the library.',
    'You should clean those seats before Friday, then.',
    'I sat in the front row on Friday.',
  ], 0, 'La frase es una oferta implícita para llevar a alguien en coche. "That\'d be great. I was going to take the bus" la acepta. "Clean the seats" la interpreta literalmente y "I sat in the front row" está en pasado y no responde.', 'daily-life'),
  cr('f18-ls-cr-final-posted', 'hard', 'male', 'The professor just posted something about the final.', [
    'I posted my vacation photos last night.',
    'The final was really difficult.',
    'Uh-oh. Is it good news or bad news?',
    "Yes, he's the final speaker today.",
  ], 2, 'La frase despierta curiosidad e inquietud sobre el examen final; "Uh-oh. Is it good news or bad news?" reacciona y pide más información. "The final was really difficult" usa el pasado para un examen que aún no ha ocurrido.'),

  // ---------- Conversations ----------
  {
    id: 'f18-ls-cv-visitor-permit',
    form: 18,
    section: 'listening',
    task: 'conversation',
    title: 'Visitor Parking for Family Weekend',
    topic: 'campus-life',
    difficulty: 'easy',
    context: 'Listen to a conversation between a student and a clerk at the campus parking office.',
    script: [
      { speaker: 'Student', voice: 'female', text: "Hi. My parents are visiting for family weekend, and they're driving here on Friday. Do they need a parking permit?" },
      { speaker: 'Clerk', voice: 'male', text: 'They do. Every car parked on campus needs a permit, even on Saturday and Sunday. You can get a temporary visitor permit right here.' },
      { speaker: 'Student', voice: 'female', text: 'Great. How much does it cost?' },
      { speaker: 'Clerk', voice: 'male', text: "It's eight dollars a day, or twenty dollars for all three days, Friday through Sunday." },
      { speaker: 'Student', voice: 'female', text: "They're staying until Sunday afternoon, so the three-day one makes more sense. Can they park in the lot next to my dorm?" },
      { speaker: 'Clerk', voice: 'male', text: 'Unfortunately, no. Residential lots are for students with resident permits only. Visitors can park in the Elm Street garage or in Lot C, next to the stadium.' },
      { speaker: 'Student', voice: 'female', text: "Which one is closer to Hayes Hall? That's where I live." },
      { speaker: 'Clerk', voice: 'male', text: "The Elm Street garage. It's about a five-minute walk. And there's a football game on Saturday, so Lot C will fill up early anyway." },
      { speaker: 'Student', voice: 'female', text: 'Then the garage it is. Do I have to bring my parents here to pick up the permit?' },
      { speaker: 'Clerk', voice: 'male', text: "No, you can buy it for them now. Just give me their license plate number. They'll need to hang the permit from the rearview mirror." },
      { speaker: 'Student', voice: 'female', text: 'Perfect. My dad texted me the plate number. Let me find it.' },
    ],
    questions: [
      {
        id: 'f18-ls-cv-visitor-permit-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'Why does the student go to the parking office?',
        options: [
          'To pay a fine her parents received last year',
          'To get a parking permit for her visiting parents',
          'To request a permit for the lot next to her dorm',
          "To ask about tickets for Saturday's football game",
        ],
        answer: [1],
        explanation:
          'La estudiante explica que sus padres vienen en coche para el fin de semana familiar y pregunta "Do they need a parking permit?". Pregunta por el aparcamiento junto a su residencia, pero no es el motivo de la visita, y el empleado le dice que no está permitido.',
      },
      {
        id: 'f18-ls-cv-visitor-permit-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'How much will the student pay for the permit?',
        options: ['Eight dollars', 'Sixteen dollars', 'Twenty-four dollars', 'Twenty dollars'],
        answer: [3],
        explanation:
          'El permiso cuesta "eight dollars a day, or twenty dollars for all three days", y ella decide que "the three-day one makes more sense". Veinticuatro dólares sería pagar tres días sueltos.',
      },
      {
        id: 'f18-ls-cv-visitor-permit-q3',
        kind: 'single',
        skill: 'function',
        prompt: "Why does the clerk mention Saturday's football game?",
        options: [
          'To point out that Lot C may be crowded that day',
          "To invite the student's parents to the game",
          'To explain why permits cost more on weekends',
          'To warn that the garage will close early that day',
        ],
        answer: [0],
        explanation:
          'El empleado dice que por el partido "Lot C will fill up early anyway": es otra razón para elegir el garaje de Elm Street. No dice nada de precios más altos ni de que el garaje cierre antes.',
      },
    ],
  },
  {
    id: 'f18-ls-cv-costume-shop',
    form: 18,
    section: 'listening',
    task: 'conversation',
    title: 'Sewing Job at the Costume Shop',
    topic: 'campus-life',
    difficulty: 'medium',
    context: "Listen to a conversation between a student and the manager of the theater's costume shop.",
    script: [
      { speaker: 'Student', voice: 'male', text: 'Hi, are you Ms. Delgado? I saw a flyer saying the costume shop is hiring student assistants.' },
      { speaker: 'Manager', voice: 'female', text: "That's me. Yes, we need two more people for the spring musical. Have you done any sewing before?" },
      { speaker: 'Student', voice: 'male', text: "A little. My grandmother taught me to use a sewing machine, and I've made a few simple things, like curtains and a bag. But I've never made clothing." },
      { speaker: 'Manager', voice: 'female', text: "That's actually fine. We don't expect assistants to design anything. Most of the work is hemming pants, sewing on buttons, and taking in costumes that are too big. What matters most is that you can sew a straight seam and that you're careful with measurements." },
      { speaker: 'Student', voice: 'male', text: 'I can definitely do that. How many hours a week would it be?' },
      { speaker: 'Manager', voice: 'female', text: "Normally ten hours, at fifteen dollars an hour. But I have to be honest: the week before opening night is called tech week, and it's intense. Assistants usually work every evening until about eleven, because actors find problems with their costumes during rehearsals." },
      { speaker: 'Student', voice: 'male', text: "Every evening? I have a chemistry lab on Wednesday nights that I can't miss." },
      { speaker: 'Manager', voice: 'female', text: "Hmm. One evening off is manageable if you tell me now, so I can plan the schedule around it. What I can't accept is someone disappearing during tech week without warning." },
      { speaker: 'Student', voice: 'male', text: "That's fair. And the extra hours are paid too, right?" },
      { speaker: 'Manager', voice: 'female', text: "Of course. Every hour you work is paid. If you're interested, come by Thursday afternoon and I'll give you a short sewing test. Nothing difficult, just a seam and a button." },
      { speaker: 'Student', voice: 'male', text: "Thursday works. I'll practice a bit before then." },
    ],
    questions: [
      {
        id: 'f18-ls-cv-costume-shop-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'What is the conversation mainly about?',
        options: [
          "The student's design ideas for the spring musical",
          'How to repair a costume damaged during rehearsal',
          "A paid job helping in the theater's costume shop",
          "The schedule for the student's chemistry lab",
        ],
        answer: [2],
        explanation:
          'El estudiante pregunta por el anuncio de que "the costume shop is hiring student assistants", y hablan de las habilidades, las horas y el sueldo. La directora aclara que los asistentes no diseñan nada, y el laboratorio es solo un detalle.',
      },
      {
        id: 'f18-ls-cv-costume-shop-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'According to the manager, what matters most for the job?',
        options: [
          'Sewing straight seams and measuring carefully',
          'Designing costumes from simple sketches',
          'Using a sewing machine to make curtains',
          'Working quickly when actors change their clothes',
        ],
        answer: [0],
        explanation:
          'La directora dice: "What matters most is that you can sew a straight seam and that you\'re careful with measurements". Las cortinas son algo que el estudiante hizo antes, no un requisito.',
      },
      {
        id: 'f18-ls-cv-costume-shop-q3',
        kind: 'single',
        skill: 'attitude',
        prompt: "What is the manager's attitude toward the student's Wednesday lab?",
        options: [
          'She thinks he should drop the lab during tech week.',
          'She believes it makes him unsuitable for the job.',
          'She is surprised that he takes chemistry courses.',
          'She can accept it as long as she knows in advance.',
        ],
        answer: [3],
        explanation:
          'Ella responde: "One evening off is manageable if you tell me now"; lo que no acepta es que alguien desaparezca "without warning". No le pide que deje el laboratorio.',
      },
    ],
  },
  {
    id: 'f18-ls-cv-memory-replication',
    form: 18,
    section: 'listening',
    task: 'conversation',
    title: 'A Small Replication Study',
    topic: 'psychology',
    difficulty: 'hard',
    context: 'Listen to a conversation between a student and her psychology professor.',
    script: [
      { speaker: 'Student', voice: 'female', text: 'Professor Grant, thanks for meeting with me. I wanted to talk about my proposal for the research methods project.' },
      { speaker: 'Professor', voice: 'male', text: "Sure. You're planning to replicate the classic context-dependent memory study, right? The one where divers learned words either underwater or on land?" },
      { speaker: 'Student', voice: 'female', text: "Exactly, but on dry land. Half of my participants would learn a word list in a quiet room and half in a noisy cafeteria, and then I'd test them either in the same place or in the other one. I've already recruited twenty people from my dorm." },
      { speaker: 'Professor', voice: 'male', text: "It's a nice design. My concern is the number. With twenty people split into four groups, you'd have only five per condition. That's a study with very low statistical power." },
      { speaker: 'Student', voice: 'female', text: "I know power has something to do with sample size, but I'm not completely sure what it means." },
      { speaker: 'Professor', voice: 'male', text: "Power is the probability that your study will detect an effect if the effect is real. Context effects in everyday settings tend to be fairly small. With five people per group, even if the effect exists, you could easily find nothing, and then you might wrongly conclude that the original finding doesn't hold." },
      { speaker: 'Student', voice: 'female', text: "So a null result wouldn't really tell me anything." },
      { speaker: 'Professor', voice: 'male', text: 'Not much. And there\'s a second, less obvious problem: if a small study does happen to find a significant result, the effect it reports is usually exaggerated.' },
      { speaker: 'Student', voice: 'female', text: "Hmm. But I can't recruit a hundred people before the end of the semester." },
      { speaker: 'Professor', voice: 'male', text: 'You may not need to. What if every participant did all four conditions, with a different word list each time? Comparing people with themselves removes a lot of noise, so twenty participants would go much further. Just make sure you vary the order of the conditions.' },
      { speaker: 'Student', voice: 'female', text: "That's a good idea. I'll redesign it and run a power analysis before I submit the proposal." },
    ],
    questions: [
      {
        id: 'f18-ls-cv-memory-replication-q1',
        kind: 'single',
        skill: 'purpose',
        prompt: 'What is the main purpose of the conversation?',
        options: [
          'To decide which classic study the student should replicate',
          'To discuss results the student has already collected',
          'To explain how divers were tested in the original study',
          "To address a weakness in the design of the student's study",
        ],
        answer: [3],
        explanation:
          'La estudiante ya ha elegido el estudio; el profesor señala el problema: "only five per condition… very low statistical power", y juntos buscan una solución. Aún no hay resultados, y los buzos solo se mencionan para identificar el estudio original.',
      },
      {
        id: 'f18-ls-cv-memory-replication-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'According to the professor, what is statistical power?',
        options: [
          'The size of the difference between two groups',
          'The chance of detecting an effect that really exists',
          'The number of participants needed in each condition',
          'The likelihood that a published finding is exaggerated',
        ],
        answer: [1],
        explanation:
          'El profesor lo define así: "Power is the probability that your study will detect an effect if the effect is real". La exageración del efecto es un segundo problema de los estudios pequeños, no la definición de potencia.',
      },
      {
        id: 'f18-ls-cv-memory-replication-q3',
        kind: 'single',
        skill: 'inference',
        prompt: 'What can be inferred about the professor\'s suggestion that every participant complete all four conditions?',
        options: [
          'It would make recruiting a hundred people easier.',
          'It would remove the need for different word lists each time.',
          'It would make a small sample more likely to find an effect.',
          'It would guarantee that the original finding is confirmed.',
        ],
        answer: [2],
        explanation:
          'Al comparar a cada persona consigo misma se elimina "a lot of noise", de modo que "twenty participants would go much further": aumenta la potencia con la misma muestra. El profesor pide precisamente usar "a different word list each time", y nada garantiza confirmar el hallazgo.',
      },
    ],
  },

  // ---------- Announcements ----------
  {
    id: 'f18-ls-an-lost-and-found',
    form: 18,
    section: 'listening',
    task: 'announcement',
    title: 'Unclaimed Lost-and-Found Items',
    topic: 'campus-life',
    difficulty: 'easy',
    context: 'Listen to an announcement at the student union.',
    script: [
      {
        speaker: 'Announcer',
        voice: 'female',
        text: "Attention, everyone. This is a message from the Student Union information desk. Our lost-and-found shelves are full, and we need your help. Any items that have not been claimed by the last day of the semester, Friday, May ninth, will be donated to the Riverside Community Shelter. This includes jackets, umbrellas, water bottles, and books. Electronics, such as phones and laptops, are handled differently: we'll keep them for thirty more days, and after that they'll be recycled. Student IDs and keys go to the campus police. If you think you've lost something this semester, stop by our desk on the first floor between nine and six and describe the item. Thank you!",
      },
    ],
    questions: [
      {
        id: 'f18-ls-an-lost-and-found-q1',
        kind: 'single',
        skill: 'purpose',
        prompt: 'What is the main purpose of the announcement?',
        options: [
          'To urge students to claim lost items before they are donated',
          'To ask students to donate their old clothing to a local shelter',
          'To announce new opening hours for the information desk',
          'To explain how students can recycle old phones and laptops',
        ],
        answer: [0],
        explanation:
          'El anuncio avisa de que los objetos no reclamados "will be donated to the Riverside Community Shelter" y pide pasar por el mostrador. No se pide a los estudiantes que donen su propia ropa: se donarán los objetos perdidos.',
      },
      {
        id: 'f18-ls-an-lost-and-found-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'What will happen to unclaimed laptops at first?',
        options: [
          'They will be donated to the community shelter.',
          'They will be sent to the campus police.',
          'They will be kept for thirty more days.',
          'They will be sold to raise money for charity.',
        ],
        answer: [2],
        explanation:
          'Los aparatos electrónicos "are handled differently: we\'ll keep them for thirty more days". A la policía del campus van las tarjetas de estudiante y las llaves, no los portátiles.',
      },
      {
        id: 'f18-ls-an-lost-and-found-q3',
        kind: 'single',
        skill: 'inference',
        prompt: 'What will a student who lost an umbrella this semester probably do?',
        options: [
          'Call the campus police to report it',
          'Visit the community shelter after May ninth',
          'Fill out a form on the student union website',
          'Go to the first-floor desk and describe it',
        ],
        answer: [3],
        explanation:
          'El anunciante indica: "stop by our desk on the first floor between nine and six and describe the item". La policía solo recibe identificaciones y llaves, y el refugio recibirá los objetos después del plazo.',
      },
    ],
  },
  {
    id: 'f18-ls-an-insurance-waiver',
    form: 18,
    section: 'listening',
    task: 'announcement',
    title: 'Waiving the Student Health Plan',
    topic: 'campus-life',
    difficulty: 'medium',
    context: 'Listen to an announcement from student health services.',
    script: [
      {
        speaker: 'Announcer',
        voice: 'male',
        text: "Good afternoon. This is an announcement from Student Health Services. All full-time students are automatically enrolled in the university health insurance plan, and the cost, about nine hundred dollars per semester, is added to your tuition bill. If you already have comparable coverage, for example through a parent's employer, you may waive the plan, but you must do so online by September twentieth. To complete the waiver, you'll need to upload photos of both sides of your insurance card and confirm that your plan covers regular care in this state, not just emergencies. Please note that we cannot accept waivers after the deadline, even if your other coverage began earlier. International students follow a separate process, so please check with the International Office instead.",
      },
    ],
    questions: [
      {
        id: 'f18-ls-an-insurance-waiver-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'What is the announcement mainly about?',
        options: [
          'How to make an appointment at the Health Center',
          'How and when students can opt out of a health plan',
          'Why the cost of tuition has risen this semester',
          'Which doctors accept the university insurance plan',
        ],
        answer: [1],
        explanation:
          'El anuncio explica que se puede renunciar al seguro ("you may waive the plan") si se tiene otra cobertura, el plazo y los documentos necesarios. La matrícula se menciona solo porque el coste se añade a la factura, no porque haya subido.',
      },
      {
        id: 'f18-ls-an-insurance-waiver-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'What must students upload to complete the waiver?',
        options: [
          "A letter from a parent's employer about coverage",
          'A receipt showing their tuition payment',
          'A form signed by the International Office',
          'Photos of both sides of their insurance card',
        ],
        answer: [3],
        explanation:
          'Hay que subir "photos of both sides of your insurance card". El empleador de los padres es solo un ejemplo de cómo se puede tener cobertura, no un documento exigido.',
      },
      {
        id: 'f18-ls-an-insurance-waiver-q3',
        kind: 'single',
        skill: 'inference',
        prompt: 'What is implied about a student who submits a waiver on September twenty-fifth?',
        options: [
          'The student will still be charged for the university plan.',
          'The student will receive a partial refund of the cost.',
          'The student must ask the International Office for help.',
          'The student can waive the plan if coverage began earlier.',
        ],
        answer: [0],
        explanation:
          'El plazo es el 20 de septiembre y "we cannot accept waivers after the deadline, even if your other coverage began earlier"; como la inscripción es automática, el estudiante seguirá pagando el seguro. La última opción contradice esa frase.',
      },
    ],
  },
  {
    id: 'f18-ls-an-similarity-reports',
    form: 18,
    section: 'listening',
    task: 'announcement',
    title: 'Similarity Reports and Draft Checks',
    topic: 'campus-life',
    difficulty: 'hard',
    context: 'Listen to an instructor talking to a class at the beginning of the semester.',
    script: [
      {
        speaker: 'Professor',
        voice: 'female',
        text: "Before you submit your first essay, I want to explain how we'll use text-similarity software in this course. When you upload an essay, the program compares it with published sources, websites, and papers by other students, and it gives an overall similarity percentage. Please don't panic about that number. A high percentage doesn't automatically mean plagiarism: correctly quoted and cited material, and even your bibliography, can be highlighted as matches. I read every report myself and look at what was matched, not just the total.",
      },
      {
        speaker: 'Professor',
        voice: 'female',
        text: "I've also set up an optional draft check. You can upload a draft up to three days before each deadline and see your report. Draft checks aren't graded or saved, so your final version won't be flagged for matching your own draft. But you only get one check per essay, so don't upload an early outline.",
      },
    ],
    questions: [
      {
        id: 'f18-ls-an-similarity-reports-q1',
        kind: 'single',
        skill: 'purpose',
        prompt: 'What is the main purpose of the talk?',
        options: [
          "To warn students about the penalties for copying others' work",
          'To teach students how to cite published sources',
          'To explain how a similarity tool will be used in the course',
          'To announce a change in the deadlines for essays',
        ],
        answer: [2],
        explanation:
          'La profesora dice: "I want to explain how we\'ll use text-similarity software in this course", y después explica el informe y la revisión opcional del borrador. No menciona sanciones ni cambios de plazos.',
      },
      {
        id: 'f18-ls-an-similarity-reports-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'According to the professor, why can a high similarity percentage be misleading?',
        options: [
          'The software cannot read papers by other students.',
          'Correctly cited quotations may be counted as matches.',
          "Students' drafts are stored in the comparison database.",
          'The percentage includes errors in grammar and spelling.',
        ],
        answer: [1],
        explanation:
          'Un porcentaje alto no implica plagio porque "correctly quoted and cited material, and even your bibliography, can be highlighted as matches". Los borradores, en cambio, "aren\'t… saved".',
      },
      {
        id: 'f18-ls-an-similarity-reports-q3',
        kind: 'single',
        skill: 'inference',
        prompt: 'What is implied about uploading an early outline to the draft check?',
        options: [
          'It would lower the grade that the essay receives.',
          'It would cause the final essay to be flagged.',
          'It would be rejected by the software automatically.',
          'It would use up the only check allowed for that essay.',
        ],
        answer: [3],
        explanation:
          'La profesora advierte: "you only get one check per essay, so don\'t upload an early outline"; subir un esquema gastaría la única revisión. Las revisiones "aren\'t graded" y la versión final "won\'t be flagged", así que las otras opciones son falsas.',
      },
    ],
  },

  // ---------- Academic Talks ----------
  {
    id: 'f18-ls-at-fiber-optics',
    form: 18,
    section: 'listening',
    task: 'academic-talk',
    title: 'Guiding Light Through Glass Fibers',
    topic: 'technology',
    difficulty: 'easy',
    context: 'Listen to part of a lecture in an engineering technology class.',
    script: [
      { speaker: 'Professor', voice: 'female', text: "Today let's look at the technology that carries most of the world's internet traffic: fiber optics. An optical fiber is a strand of very pure glass, about as thin as a human hair. Instead of sending electricity through copper wires, we send pulses of light through these glass strands. A pulse of light can stand for a one, and no pulse for a zero, so the light carries digital information." },
      { speaker: 'Professor', voice: 'female', text: 'Now, you might ask: how does the light stay inside the fiber, especially when the cable bends? The answer is a principle called total internal reflection. Each fiber has two layers of glass: an inner core and an outer layer called the cladding. The cladding is made so that light travels slightly faster in it than in the core.' },
      { speaker: 'Professor', voice: 'female', text: "Because of that difference, when light traveling in the core hits the boundary with the cladding at a shallow angle, it doesn't escape. It bounces back into the core completely, a bit like a ball bouncing off a wall. The light keeps reflecting, zigzagging along the fiber, even around gentle curves. You can see a similar effect in some decorative fountains, where light shone into a stream of water seems to follow the water as it curves through the air." },
      { speaker: 'Professor', voice: 'female', text: "So why use light instead of electricity? Fibers can carry far more data, and the signal weakens much more slowly, so it can travel many kilometers before it needs to be boosted. Light signals also aren't disturbed by electrical interference from nearby equipment. That's why the cables that cross the ocean floor and connect continents are fiber-optic cables." },
    ],
    questions: [
      {
        id: 'f18-ls-at-fiber-optics-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'What is the lecture mainly about?',
        options: [
          'Why copper wires are still used in most homes',
          'How optical fibers guide light and why they are used',
          'How fountains were used in early experiments with light',
          'Why light travels faster than electricity in cables',
        ],
        answer: [1],
        explanation:
          'La profesora explica cómo la luz se queda dentro de la fibra ("total internal reflection") y por qué se usa la luz en lugar de la electricidad ("So why use light instead of electricity?"). Las fuentes son solo un ejemplo.',
      },
      {
        id: 'f18-ls-at-fiber-optics-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'According to the professor, what happens when light in the core hits the cladding at a shallow angle?',
        options: [
          'It is reflected back into the core.',
          'It escapes into the outer layer.',
          'It slows down and loses its signal.',
          'It changes into an electrical pulse.',
        ],
        answer: [0],
        explanation:
          'La profesora dice que la luz "doesn\'t escape. It bounces back into the core completely". Escapar al revestimiento es justo lo contrario de lo que ocurre.',
      },
      {
        id: 'f18-ls-at-fiber-optics-q3',
        kind: 'single',
        skill: 'function',
        prompt: 'Why does the professor mention decorative fountains?',
        options: [
          'To explain how fiber-optic cables are kept cool',
          'To show that water works better than glass in fibers',
          'To describe where fiber optics were first invented',
          'To give a familiar example of light being guided',
        ],
        answer: [3],
        explanation:
          'Las menciona como un efecto parecido que se puede ver en la vida diaria: la luz "seems to follow the water as it curves". No dice que el agua sea mejor que el vidrio ni que la fibra se inventara allí.',
      },
      {
        id: 'f18-ls-at-fiber-optics-q4',
        kind: 'single',
        skill: 'detail',
        prompt: 'According to the professor, what is one advantage of fiber-optic cables over copper wires?',
        options: [
          'They are much cheaper to lay across the ocean floor.',
          'They can bend sharply without losing any light.',
          'They are not affected by electrical interference.',
          'They do not need a glass core to carry signals.',
        ],
        answer: [2],
        explanation:
          'La profesora afirma: "Light signals also aren\'t disturbed by electrical interference from nearby equipment". Solo habla de "gentle curves", no de curvas pronunciadas, y no menciona el coste.',
      },
    ],
  },
  {
    id: 'f18-ls-at-art-nouveau',
    form: 18,
    section: 'listening',
    task: 'academic-talk',
    title: 'Art Nouveau and the Flowing Line',
    topic: 'art',
    difficulty: 'medium',
    context: 'Listen to part of a lecture in an art history class.',
    script: [
      { speaker: 'Professor', voice: 'male', text: "Today I want to look at a style that changed not only paintings but also buildings, posters, furniture, and even jewelry: Art Nouveau, which is French for 'new art.' It flourished from about 1890 to 1910, and it spread across Europe under different names. In Germany, for example, it was called Jugendstil, or 'youth style.'" },
      { speaker: 'Professor', voice: 'male', text: "The most recognizable feature of Art Nouveau is the line. Artists favored long, flowing, curving lines inspired by plants, such as stems, vines, and flower petals, and by other natural forms like insects and waves. A line might start as a woman's hair in a poster and end as a twisting vine in the border." },
      { speaker: 'Professor', voice: 'male', text: 'Why nature? Many designers were reacting against two things. One was the habit of copying historical styles, like Gothic or classical, that dominated nineteenth-century architecture. The other was the flood of cheap, factory-made goods. Art Nouveau designers wanted beauty in everyday objects, and they found their models in living forms rather than in the past.' },
      { speaker: 'Student', voice: 'female', text: 'So was it mainly about decoration, or did it change how things were actually built?' },
      { speaker: 'Professor', voice: 'male', text: 'Good question. In the best examples, decoration and structure are the same thing. Think of the entrances to the Paris Métro, designed around 1900. The iron supports rise from the ground like plant stalks, and the lamps hang like flower buds. The ironwork holds up the roof and decorates it at the same time.' },
      { speaker: 'Professor', voice: 'male', text: 'Ironically, this love of handcrafted detail helped bring the style to an end. Those curving designs were expensive to produce, and by the time of the First World War, tastes were shifting toward simpler, more geometric forms that suited factory production.' },
    ],
    questions: [
      {
        id: 'f18-ls-at-art-nouveau-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'What is the lecture mainly about?',
        options: [
          'How Impressionist painters influenced modern posters',
          'Why the Paris Métro was built at the turn of the century',
          'The main features and origins of the Art Nouveau style',
          'How factories changed the design of everyday objects',
        ],
        answer: [2],
        explanation:
          'El profesor presenta el Art Nouveau, su rasgo principal ("the line"), sus motivos ("Why nature?") y su declive. El metro de París es solo un ejemplo.',
      },
      {
        id: 'f18-ls-at-art-nouveau-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'According to the professor, what were Art Nouveau designers reacting against?',
        options: [
          'The use of plant forms in nineteenth-century posters',
          'The copying of historical styles and cheap factory goods',
          'The simple, geometric forms of industrial design',
          'The bright colors used by Impressionist painters',
        ],
        answer: [1],
        explanation:
          'Reaccionaban contra "the habit of copying historical styles" y "the flood of cheap, factory-made goods". Las formas geométricas simples son las que llegaron después y sustituyeron al estilo.',
      },
      {
        id: 'f18-ls-at-art-nouveau-q3',
        kind: 'single',
        skill: 'organization',
        prompt: 'Why does the professor mention the entrances to the Paris Métro?',
        options: [
          'To show that decoration and structure could be the same',
          'To explain why Art Nouveau buildings were so expensive',
          'To give an example of a design copied from Gothic style',
          'To describe the first building in the Art Nouveau style',
        ],
        answer: [0],
        explanation:
          'Responde a la pregunta de la estudiante con este ejemplo: "decoration and structure are the same thing… The ironwork holds up the roof and decorates it at the same time". No dice que fuera el primer edificio del estilo.',
      },
      {
        id: 'f18-ls-at-art-nouveau-q4',
        kind: 'single',
        skill: 'inference',
        prompt: 'What can be inferred about why Art Nouveau declined?',
        options: [
          'Critics considered its plant designs old-fashioned.',
          'Its detailed designs did not suit mass production.',
          'It was banned in several countries during the war.',
          'Designers ran out of natural forms to use as models.',
        ],
        answer: [1],
        explanation:
          'El profesor explica que los diseños curvos "were expensive to produce" y que el gusto cambió hacia formas "that suited factory production"; se deduce que el estilo no encajaba con la producción en serie. No menciona prohibiciones.',
      },
    ],
  },
  {
    id: 'f18-ls-at-quorum-sensing',
    form: 18,
    section: 'listening',
    task: 'academic-talk',
    title: 'How Bacteria Count Their Neighbors',
    topic: 'biology',
    difficulty: 'hard',
    context: 'Listen to part of a lecture in a microbiology class.',
    script: [
      { speaker: 'Professor', voice: 'female', text: "We usually think of bacteria as individuals, each cell simply dividing and doing its own thing. But around 1970, researchers studying a glowing marine bacterium, Vibrio fischeri, found that bacteria can coordinate their behavior, almost as if they were voting. The process is now called quorum sensing. A quorum, as you may know, is the minimum number of members a committee needs before it can make a decision." },
      { speaker: 'Professor', voice: 'female', text: 'Here was the puzzle. When Vibrio fischeri cells float freely in the ocean, they produce no light. But when they reach very high densities, for example in a laboratory flask, they begin to glow, all at roughly the same time. Why would a cell care how many neighbors it has?' },
      { speaker: 'Professor', voice: 'female', text: 'Each cell constantly releases a small signaling molecule, called an autoinducer, which passes freely in and out of cells. When there are only a few bacteria, the signal drifts away and its concentration stays low. But as the population grows, the molecule builds up. Once it reaches a threshold concentration, it binds to a receptor protein inside each cell, and that switches on the genes for light production. Because every cell is exposed to the same concentration, they all switch on together.' },
      { speaker: 'Professor', voice: 'female', text: "Glowing only makes sense in a crowd. A single bacterium making light would waste energy on a glow nobody could see. In nature, Vibrio fischeri reaches high densities inside the light organ of the Hawaiian bobtail squid. The squid hunts at night, and the bacterial light, shining downward, matches the moonlight from above, so predators below don't see the squid's shadow. In exchange, the squid feeds the bacteria." },
      { speaker: 'Professor', voice: 'female', text: "Quorum sensing has since been found in many other species, including bacteria that cause disease. Some of them wait until their numbers are large before releasing toxins, which makes it harder for the host's immune system to respond in time. That's why some researchers are testing drugs that block the signal molecules instead of killing the bacteria." },
    ],
    questions: [
      {
        id: 'f18-ls-at-quorum-sensing-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'What is the lecture mainly about?',
        options: [
          'How bacteria sense their numbers and act together',
          'How the bobtail squid hunts in the dark ocean at night',
          'Why some bacteria release toxins inside their hosts',
          'How scientists first grew bacteria in laboratory flasks',
        ],
        answer: [0],
        explanation:
          'La clase explica el "quorum sensing": cómo las bacterias detectan cuántas hay mediante una molécula señal y activan genes "all together". El calamar y las toxinas son ejemplos dentro de esa idea central.',
      },
      {
        id: 'f18-ls-at-quorum-sensing-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'According to the professor, what happens when the autoinducer reaches a threshold concentration?',
        options: [
          'The bacteria stop releasing the signal molecule.',
          'The cells begin to divide much more quickly.',
          'The molecule drifts away from the population.',
          'It binds to a receptor and turns on light genes.',
        ],
        answer: [3],
        explanation:
          'La profesora dice: "Once it reaches a threshold concentration, it binds to a receptor protein inside each cell, and that switches on the genes for light production". La molécula se dispersa ("drifts away") cuando hay pocas bacterias, no al alcanzar el umbral.',
      },
      {
        id: 'f18-ls-at-quorum-sensing-q3',
        kind: 'single',
        skill: 'function',
        prompt: 'Why does the professor explain the meaning of the word "quorum"?',
        options: [
          'To point out that the term was borrowed from law',
          "To compare the bacteria's behavior to a group decision",
          'To explain why scientists disagreed about the process',
          'To define the number of cells in a light organ',
        ],
        answer: [1],
        explanation:
          'Antes dice que las bacterias coordinan su conducta "almost as if they were voting", y luego define "quorum" como el mínimo de miembros que necesita un comité para decidir: es una comparación con una decisión de grupo. No habla de desacuerdos científicos.',
      },
      {
        id: 'f18-ls-at-quorum-sensing-q4',
        kind: 'single',
        skill: 'inference',
        prompt: 'What can be inferred about drugs that block the signal molecules?',
        options: [
          'They kill harmful bacteria faster than antibiotics.',
          'They would make Vibrio fischeri glow more brightly.',
          'They could keep harmful bacteria from acting together.',
          'They are already widely used to treat infections.',
        ],
        answer: [2],
        explanation:
          'Si las bacterias patógenas esperan a ser muchas para liberar toxinas usando señales, bloquear "the signal molecules" impediría esa acción coordinada. La profesora dice que los fármacos actúan "instead of killing the bacteria" y que aún se están probando ("testing").',
      },
    ],
  },
];
