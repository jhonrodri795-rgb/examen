import type { Difficulty, ListeningSet, Topic, Voice } from '../../../types';

/** Simulación n.º 13 — Listening (contenido original). */

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
    form: 13,
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
  cr('f13-ls-cr-cafe-cards', 'easy', 'female', 'Does the campus café take credit cards?', [
    'I usually order a large latte there.',
    'Yes, for orders over five dollars.',
    'The café first opened last semester.',
    'I gave my card to the cashier.',
  ], 1, 'Es una pregunta de sí/no sobre formas de pago; la respuesta natural confirma y añade una condición: "Yes, for orders over five dollars". Las demás repiten palabras ("café", "card") sin responder.'),
  cr('f13-ls-cr-morning-run', 'easy', 'male', 'A few of us from the running club are going for a run at six tomorrow morning. Want to join?', [
    'I ran there yesterday afternoon.',
    'The club has about twenty members.',
    'Yes, they joined it last month.',
    'Six is early, but count me in!',
  ], 3, 'Es una invitación; la respuesta adecuada la acepta: "count me in" (cuenta conmigo). Las otras opciones hablan del pasado o de datos del club sin responder a la invitación.'),
  cr('f13-ls-cr-slides-tonight', 'easy', 'female', "Why don't we start working on the slides tonight instead of waiting until tomorrow?", [
    "Good idea. That gives us time to practice.",
    "Because I didn't make the slides yesterday.",
    "Tomorrow's weather should be a lot better.",
    'I waited for you at the library until nine.',
  ], 0, '"Why don\'t we…?" es una sugerencia, no una pregunta por la causa. Por eso se responde aceptándola ("Good idea"). La opción que empieza por "Because" trata la frase como si pidiera un motivo.'),
  cr('f13-ls-cr-missed-practice', 'easy', 'male', 'Sorry I missed practice on Tuesday. I had a family emergency.', [
    'Practice starts at four on Tuesdays.',
    'I missed the bus on Tuesday too.',
    "No problem. Is everything okay?",
    'Yes, we practiced that play twice.',
  ], 2, 'Ante una disculpa por una emergencia familiar, lo natural es quitarle importancia y mostrar interés: "No problem. Is everything okay?". "I missed the bus" repite "missed" sin responder.'),
  cr('f13-ls-cr-library-app', 'easy', 'female', "What do you think of the library's new mobile app?", [
    'I left my phone in the library.',
    "It's handy for renewing books.",
    'I think the library opens at eight.',
    'My phone is a much newer model.',
  ], 1, 'Se pide una opinión; la respuesta correcta valora la aplicación: "It\'s handy". La opción con "I think the library opens at eight" repite "think" y "library" pero no opina sobre la app.'),
  cr('f13-ls-cr-bookstore-sale', 'easy', 'male', 'Did you hear? The campus bookstore is having a half-price sale this week.', [
    'Really? I need a new hoodie anyway.',
    'Yes, I can hear you just fine.',
    'I bought half of the books there.',
    'The bookstore is right next to the gym.',
  ], 0, 'Es una noticia; la reacción natural muestra interés y una intención: "Really? I need a new hoodie anyway". "Yes, I can hear you just fine" interpreta "Did you hear?" de forma literal.'),

  // ---------- Choose a Response: medium ----------
  cr('f13-ls-cr-courtyard-meeting', 'medium', 'female', "It's so sunny today. How about we hold the club meeting out in the courtyard?", [
    'The meeting lasted about an hour.',
    'Yes, the sun rises in the east.',
    'Sure, if we can find enough benches.',
    'The courtyard was built in the 1960s.',
  ], 2, '"How about…?" introduce una sugerencia; se acepta con una condición razonable: "Sure, if we can find enough benches". Las demás opciones dan datos irrelevantes o hablan en pasado.'),
  cr('f13-ls-cr-group-grade', 'medium', 'male', 'Will everyone in the group get the same grade for the project?', [
    'The group meets every Thursday.',
    'I got an A on the last project.',
    'Yes, everyone in the group is here today.',
    'Mostly, but peer reviews can adjust it.',
  ], 3, 'Se pide una aclaración sobre la nota; la respuesta explica la regla: "Mostly, but peer reviews can adjust it". "Yes, everyone in the group is here" repite "everyone in the group" pero responde a otra cosa.'),
  cr('f13-ls-cr-film-adaptation', 'medium', 'female', 'Honestly, I thought the film adaptation was way better than the book.', [
    'Really? It left out half the story.',
    'The book came out about ten years ago.',
    'The film starts at seven thirty.',
    'Yes, I booked the tickets online.',
  ], 0, 'Ante una opinión, la respuesta natural reacciona con otra opinión: "Really? It left out half the story" (no está de acuerdo y da un motivo). "I booked the tickets" es una trampa de sonido ("book"/"booked").'),
  cr('f13-ls-cr-coffee-stain', 'medium', 'male', 'Do you know how to get a coffee stain out of a white shirt?', [
    'I usually drink my coffee without milk.',
    'Soak it in cold water with some dish soap.',
    'Yes, white shirts are really popular now.',
    'I bought it at the mall downtown last week.',
  ], 1, 'Es una petición de consejo; la única respuesta que da una solución práctica es "Soak it in cold water with some dish soap". Las otras repiten "coffee" o "white shirt" sin aconsejar.', 'daily-life'),
  cr('f13-ls-cr-clock-out', 'medium', 'female', "Don't forget to clock out before you leave tonight.", [
    'The clock in the break room is slow.',
    'I left work at eight last night.',
    'I forgot my jacket here yesterday.',
    "Thanks, I'll do it on my way out.",
  ], 3, 'Es un recordatorio; la respuesta adecuada lo agradece y confirma que lo hará: "Thanks, I\'ll do it on my way out". "The clock in the break room" es una trampa de sonido con "clock out".', 'daily-life'),
  cr('f13-ls-cr-downtown-bus', 'medium', 'male', "This bus goes downtown, doesn't it?", [
    'No, I usually walk to work in the morning.',
    "Yes, it's the biggest bus in the city.",
    'It does. It stops near City Hall.',
    'I went downtown with my sister on Saturday.',
  ], 2, 'La pregunta coletilla ("doesn\'t it?") pide confirmación; "It does" confirma y añade un dato útil sobre la parada. Las demás hablan de otras cosas (cómo va al trabajo, el tamaño del autobús, el pasado).', 'daily-life'),

  // ---------- Choose a Response: hard ----------
  cr('f13-ls-cr-better-weekends', 'hard', 'female', "To be honest, I've had better weekends.", [
    'Oh no, sorry to hear that. What happened?',
    "Great! I'm glad you had so much fun there.",
    'Yes, weekends are always better than weekdays.',
    'Next weekend is a long one, I think.',
  ], 0, '"I\'ve had better weekends" es un eufemismo: el fin de semana fue malo. Lo natural es mostrar empatía y preguntar: "Oh no… What happened?". La opción "Great! I\'m glad you had so much fun" interpreta lo contrario.', 'daily-life'),
  cr('f13-ls-cr-assignment-page', 'hard', 'male', "I don't suppose you remember which page the assignment ended on?", [
    'Yes, I really enjoyed the assignment.',
    'The assignment is due next Monday.',
    'I think it was page eighty-four.',
    'I remember the page was torn.',
  ], 2, '"I don\'t suppose you remember…?" es una pregunta indirecta y cortés que pide un dato concreto: la página. Solo "I think it was page eighty-four" lo da. La fecha de entrega responde a otra pregunta.'),
  cr('f13-ls-cr-hedged-objection', 'hard', 'female', "It's not that I don't like your idea. I'm just worried we won't finish it in time.", [
    "Great, so you like it. Let's start, then.",
    "I didn't have time to finish it either.",
    'Yes, I worry about the weather too.',
    'Fair enough. We could make it simpler.',
  ], 3, 'Es una objeción suavizada: le preocupa el tiempo. La respuesta adecuada reconoce la preocupación y propone una solución: "We could make it simpler". La opción "so you like it" ignora la objeción.'),
  cr('f13-ls-cr-sworn-thursday', 'hard', 'male', "Wait, the exam's today? I could have sworn it was on Thursday.", [
    "You really shouldn't swear like that in class.",
    "They moved it. Didn't you get the email?",
    'Yes, Thursday works better for me too.',
    'I swore I would study harder this time.',
  ], 1, '"I could have sworn…" significa "estaba seguro de que…": el hablante está confundido con la fecha. La respuesta aclara el cambio: "They moved it". Las opciones con "swear/swore" lo toman literalmente.'),
  cr('f13-ls-cr-ask-extension', 'hard', 'female', "If you're that far behind on your paper, it wouldn't hurt to ask for an extension.", [
    "Good point. I'll email my professor.",
    "Don't worry, it didn't hurt at all.",
    'The extension cord is under my desk.',
    'I finished the paper last weekend.',
  ], 0, '"It wouldn\'t hurt to…" es una sugerencia (no pierdes nada si lo haces). La respuesta correcta la acepta: "Good point. I\'ll email my professor". "It didn\'t hurt at all" interpreta "hurt" de forma literal y "extension cord" es una trampa de sonido.'),
  cr('f13-ls-cr-course-fills', 'hard', 'male', 'Just so you know, that course usually fills up within the first hour of registration.', [
    'I filled out the form last week.',
    'An hour is enough time to grab some lunch.',
    'The course covers modern history.',
    "Then I'll sign up the moment it opens.",
  ], 3, 'El asesor no da una orden, pero sugiere matricularse pronto. La respuesta que capta la implicación es "Then I\'ll sign up the moment it opens". "I filled out the form" es una trampa de sonido con "fills up".'),

  // ---------- Conversations ----------
  {
    id: 'f13-ls-cv-rent-textbook',
    form: 13,
    section: 'listening',
    task: 'conversation',
    title: 'Renting a Biology Textbook',
    topic: 'campus-life',
    difficulty: 'easy',
    context: 'Listen to a conversation between a student and a bookstore clerk.',
    script: [
      { speaker: 'Student', voice: 'female', text: "Hi. I need the textbook for Biology 101, and I see there's a used copy and a rental option. Which one makes more sense?" },
      { speaker: 'Clerk', voice: 'male', text: 'Well, it depends on whether you want to keep it. A used copy costs eighty-five dollars. Renting it for the semester is forty-two.' },
      { speaker: 'Student', voice: 'female', text: "Renting is half the price. What's the catch?" },
      { speaker: 'Clerk', voice: 'male', text: "There are a few rules. You can highlight in a rental, but please don't write notes in the margins or tear out any pages. If the book comes back with writing in it, we charge you the difference between the rental price and the used price." },
      { speaker: 'Student', voice: 'female', text: 'Hmm, I usually write a lot of notes. But highlighting is okay?' },
      { speaker: 'Clerk', voice: 'male', text: 'Highlighting is fine. A lot of students put their comments on sticky notes instead.' },
      { speaker: 'Student', voice: 'female', text: "That's a good idea. And when would I have to return it?" },
      { speaker: 'Clerk', voice: 'male', text: "Rentals are due back on December fifteenth. After that, there's a late fee of five dollars a day." },
      { speaker: 'Student', voice: 'female', text: 'Oh. My biology final is on the eighteenth, though.' },
      { speaker: 'Clerk', voice: 'male', text: 'In that case, you can extend the rental online for a small fee. Or you could buy the used copy and sell it back to us at the end of the semester for about a third of the price.' },
      { speaker: 'Student', voice: 'female', text: "I think I'll rent it and pay to extend. Thanks!" },
    ],
    questions: [
      {
        id: 'f13-ls-cv-rent-textbook-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'What is the student trying to decide?',
        options: [
          'Which biology course she should take',
          'Whether to sell her old textbooks',
          'Whether to rent or buy a used textbook',
          'Which store has the cheapest textbooks',
        ],
        answer: [2],
        explanation:
          'Al principio pregunta si le conviene "a used copy" o "a rental option": "Which one makes more sense?". La reventa del libro solo aparece como detalle al final.',
      },
      {
        id: 'f13-ls-cv-rent-textbook-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'According to the clerk, what may students NOT do in a rented book?',
        options: [
          'Use a highlighter on the pages',
          'Write notes in the margins',
          'Put sticky notes inside it',
          'Pay to extend the rental online',
        ],
        answer: [1],
        explanation:
          'El dependiente dice "You can highlight in a rental, but please don\'t write notes in the margins". Subrayar está permitido, las notas adhesivas son la alternativa que recomienda y ampliar el alquiler en línea también se ofrece.',
      },
      {
        id: 'f13-ls-cv-rent-textbook-q3',
        kind: 'single',
        skill: 'function',
        prompt: 'Why does the student mention her biology final?',
        options: [
          'To ask whether the store sells study guides',
          'To explain why she needs a newer edition',
          'To complain that renting is too expensive',
          'To point out that the due date is too early',
        ],
        answer: [3],
        explanation:
          'El alquiler vence el "December fifteenth" y su examen es "on the eighteenth": necesita el libro después de la fecha de devolución. Por eso el dependiente le ofrece "extend the rental online".',
      },
    ],
  },
  {
    id: 'f13-ls-cv-news-article',
    form: 13,
    section: 'listening',
    task: 'conversation',
    title: 'Trimming a Newspaper Article',
    topic: 'campus-life',
    difficulty: 'medium',
    context: 'Listen to a conversation between a student reporter and the editor of the student newspaper.',
    script: [
      { speaker: 'Editor', voice: 'female', text: "Hi, Marcus. I read your piece on the new recycling program. It's good, but it's about two hundred words over the limit." },
      { speaker: 'Reporter', voice: 'male', text: 'Two hundred? I was hoping you could find space somewhere. Every part of it feels important.' },
      { speaker: 'Editor', voice: 'female', text: "I know the feeling, but the page layout is fixed at eight hundred words. Your first three paragraphs give the history of the old program. Readers mainly want to know what's changing now." },
      { speaker: 'Reporter', voice: 'male', text: "So you'd cut the history?" },
      { speaker: 'Editor', voice: 'female', text: "I'd shrink it to one or two sentences. That alone saves about a hundred and fifty words. Then you could shorten the list of bin locations and just link to the map on our website." },
      { speaker: 'Reporter', voice: 'male', text: 'Okay, that makes sense. Anything else?' },
      { speaker: 'Editor', voice: 'female', text: "One more thing, and it matters more than length. You quote the facilities director saying the program will 'cut campus waste in half by next year.' Is that exactly what she said?" },
      { speaker: 'Reporter', voice: 'male', text: 'I think so. I was taking notes by hand, and she was talking pretty fast.' },
      { speaker: 'Editor', voice: 'female', text: "'I think so' isn't good enough for a direct quote, especially one with a specific number. Did you record the interview?" },
      { speaker: 'Reporter', voice: 'male', text: 'No, but I have her email address.' },
      { speaker: 'Editor', voice: 'female', text: "Then email her today, read the sentence back to her, and ask her to confirm it. If she can't, we'll paraphrase it instead of using quotation marks." },
      { speaker: 'Reporter', voice: 'male', text: "Got it. I'll write to her right after this and get you the shorter version by tomorrow." },
    ],
    questions: [
      {
        id: 'f13-ls-cv-news-article-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'What are the speakers mainly discussing?',
        options: [
          'How to revise an article before it is printed',
          'How to record interviews with campus officials',
          'Whether to add a map to the newspaper website',
          'Whether the new recycling program will succeed',
        ],
        answer: [0],
        explanation:
          'La editora pide recortar el artículo ("about two hundred words over the limit") y verificar una cita antes de publicarlo. El programa de reciclaje es el tema del artículo, no de la conversación.',
      },
      {
        id: 'f13-ls-cv-news-article-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'What does the editor suggest doing with the history of the old program?',
        options: [
          'Moving it to the end of the article',
          'Replacing it with a link to a map',
          'Reducing it to one or two sentences',
          'Publishing it as a separate article',
        ],
        answer: [2],
        explanation:
          'La editora dice "I\'d shrink it to one or two sentences". El enlace al mapa sustituye a la lista de contenedores ("the list of bin locations"), no a la historia del programa.',
      },
      {
        id: 'f13-ls-cv-news-article-q3',
        kind: 'single',
        skill: 'attitude',
        prompt: "What is the editor's attitude toward the quotation?",
        options: [
          'She thinks it makes the article too long.',
          'She is worried that it may not be accurate.',
          'She wants it moved to the opening paragraph.',
          'She thinks the number in it is too small.',
        ],
        answer: [1],
        explanation:
          'Pregunta "Is that exactly what she said?" y afirma que "\'I think so\' isn\'t good enough for a direct quote": le preocupa la exactitud. Además aclara que este asunto "matters more than length", así que no es un problema de extensión.',
      },
    ],
  },
  {
    id: 'f13-ls-cv-conference-abstract',
    form: 13,
    section: 'listening',
    task: 'conversation',
    title: 'Preparing a Conference Abstract',
    topic: 'campus-life',
    difficulty: 'hard',
    context: 'Listen to a conversation between a student and a history professor.',
    script: [
      { speaker: 'Student', voice: 'male', text: 'Professor Hale, do you have a minute? You mentioned in class that some term papers could be submitted to the undergraduate research conference. I was wondering if mine might work.' },
      { speaker: 'Professor', voice: 'female', text: 'Yes, I was going to suggest it. Your paper on how small-town public libraries were used during the Great Depression was one of the strongest. Have you looked at the submission guidelines?' },
      { speaker: 'Student', voice: 'male', text: "I have. They want an abstract of no more than two hundred fifty words, and mine is almost six hundred. I'm not sure what to cut." },
      { speaker: 'Professor', voice: 'female', text: "That's the usual problem. Right now your abstract summarizes every section of the paper in order. Reviewers don't need a tour. They need to know your argument and why it matters." },
      { speaker: 'Student', voice: 'male', text: 'My argument is that libraries were important during the Depression.' },
      { speaker: 'Professor', voice: 'female', text: "Nobody would disagree with that. What did you actually find that surprised you?" },
      { speaker: 'Student', voice: 'male', text: 'Well, library use went up even in towns where the libraries had to cut their hours and stop buying new books.' },
      { speaker: 'Professor', voice: 'female', text: "Now that's a claim. People were borrowing more from libraries that were offering less. Lead with that. Then give one or two pieces of evidence, like the circulation records you found, and end with what it suggests about public institutions in hard times." },
      { speaker: 'Student', voice: 'male', text: 'So I should drop the background on how the libraries were funded?' },
      { speaker: 'Professor', voice: 'female', text: "Keep one sentence at most. The rest can go in the presentation itself if you're accepted. Send me a draft by Friday, and I'll look it over before the deadline." },
      { speaker: 'Student', voice: 'male', text: "Thanks. I'll start rewriting it tonight." },
    ],
    questions: [
      {
        id: 'f13-ls-cv-conference-abstract-q1',
        kind: 'single',
        skill: 'purpose',
        prompt: 'Why does the student go to see the professor?',
        options: [
          'To ask for an extension on his term paper',
          'To find sources about libraries in the 1930s',
          'To invite her to speak at a research event',
          'To discuss sending his paper to a conference',
        ],
        answer: [3],
        explanation:
          'El estudiante explica que algunos trabajos "could be submitted to the undergraduate research conference" y pregunta "if mine might work". No pide una prórroga ni invita a la profesora.',
      },
      {
        id: 'f13-ls-cv-conference-abstract-q2',
        kind: 'single',
        skill: 'detail',
        prompt: "What is the main problem with the student's current abstract?",
        options: [
          'It covers each section instead of stating a claim.',
          'It uses language that is too informal for reviewers.',
          'It includes too few pieces of evidence from records.',
          'It argues something that most historians reject.',
        ],
        answer: [0],
        explanation:
          'La profesora dice "your abstract summarizes every section of the paper in order" y que los evaluadores "need to know your argument". La última opción es lo contrario: la idea inicial es tan obvia que "Nobody would disagree with that".',
      },
      {
        id: 'f13-ls-cv-conference-abstract-q3',
        kind: 'single',
        skill: 'function',
        prompt: 'Why does the professor say, "Nobody would disagree with that"?',
        options: [
          'To praise the student for choosing a popular topic',
          "To suggest that the student's evidence is incorrect",
          "To indicate that the student's claim is too obvious",
          'To show that reviewers will accept the paper easily',
        ],
        answer: [2],
        explanation:
          'Con esa frase indica que la tesis es demasiado evidente para ser un argumento; por eso pregunta "What did you actually find that surprised you?". No es un elogio ni una crítica a las pruebas.',
      },
    ],
  },

  // ---------- Announcements ----------
  {
    id: 'f13-ls-an-market-indoors',
    form: 13,
    section: 'listening',
    task: 'announcement',
    title: 'Farmers Market Moves Indoors',
    topic: 'campus-life',
    difficulty: 'easy',
    context: 'Listen to an announcement on a university campus.',
    script: [
      {
        speaker: 'Announcer',
        voice: 'female',
        text: "Good morning, everyone. Here's a quick update about Saturday's campus farmers market. Because heavy rain is expected all day, the market will move indoors to the student center this week. Vendors will set up in the main lounge on the first floor, and the hours will stay the same, from nine a.m. to one p.m. Please use the north entrance, since the south doors are closed for repairs. Space inside is more limited, so the cooking demonstration has been canceled, but the live music will go ahead in the food court. Most vendors accept cards, but the honey and bakery stands take cash only. We'll be back outside on the lawn next Saturday if the weather improves.",
      },
    ],
    questions: [
      {
        id: 'f13-ls-an-market-indoors-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'What is the main purpose of the announcement?',
        options: [
          'To introduce new vendors at the market',
          "To announce a change in the market's location",
          'To explain why the market will close early',
          'To recruit helpers for a cooking demonstration',
        ],
        answer: [1],
        explanation:
          'Por la lluvia, "the market will move indoors to the student center". El horario no cambia ("the hours will stay the same") y la demostración de cocina se cancela, no busca ayudantes.',
      },
      {
        id: 'f13-ls-an-market-indoors-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'Which entrance should visitors use?',
        options: ['The south doors', 'The east side door', 'The north entrance', 'The food court door'],
        answer: [2],
        explanation:
          'El anuncio dice "Please use the north entrance, since the south doors are closed for repairs". La zona de restauración solo se menciona por la música en directo.',
      },
      {
        id: 'f13-ls-an-market-indoors-q3',
        kind: 'single',
        skill: 'inference',
        prompt: 'What is implied about shoppers who want to buy honey?',
        options: [
          'They should bring some cash with them.',
          'They will have to wait until next week.',
          'They can find it in the food court.',
          'They must order it before Saturday.',
        ],
        answer: [0],
        explanation:
          'Se dice que "the honey and bakery stands take cash only", así que quien quiera comprar miel debe llevar efectivo. El puesto de miel sí estará este sábado; solo cambia el lugar del mercado.',
      },
    ],
  },
  {
    id: 'f13-ls-an-textiles-docents',
    form: 13,
    section: 'listening',
    task: 'announcement',
    title: 'Ancient Textiles Exhibition',
    topic: 'campus-life',
    difficulty: 'medium',
    context: 'Listen to an announcement from the campus museum.',
    script: [
      {
        speaker: 'Announcer',
        voice: 'female',
        text: "Attention, students. The Hartwell Campus Museum is pleased to announce a new exhibition, Threads of Time: Ancient Textiles, opening on October fourteenth. The show brings together more than sixty fabrics, some over two thousand years old, including woven tunics from Peru and fragments of Egyptian linen. Because many of these pieces are fragile, they'll be displayed in low light, and flash photography won't be allowed.",
      },
      {
        speaker: 'Announcer',
        voice: 'female',
        text: "We're also looking for student volunteers to serve as docents, leading short tours for visitors and school groups. No background in art history is required. Volunteers must complete three training sessions on Wednesday evenings in late September and commit to at least two hours a week during the exhibition. Docents receive free admission to all museum events and a letter of recommendation. To apply, fill out the form on the museum's website by September fifteenth.",
      },
    ],
    questions: [
      {
        id: 'f13-ls-an-textiles-docents-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'What is the announcement mainly about?',
        options: [
          'A lecture on the history of ancient clothing',
          "A change in the museum's opening hours",
          'A course on preserving ancient fabrics',
          'A new exhibit and a call for volunteers',
        ],
        answer: [3],
        explanation:
          'La primera parte presenta la exposición "Threads of Time: Ancient Textiles" y la segunda busca "student volunteers to serve as docents". La formación de guías no es un curso de conservación de tejidos.',
      },
      {
        id: 'f13-ls-an-textiles-docents-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'Why will the textiles be displayed in low light?',
        options: [
          'To make the colors look more vivid',
          'To protect pieces that are fragile',
          'To allow visitors to take photographs',
          'To save energy during the evening',
        ],
        answer: [1],
        explanation:
          '"Because many of these pieces are fragile, they\'ll be displayed in low light." Además, las fotos con flash "won\'t be allowed", así que la tercera opción contradice el anuncio.',
      },
      {
        id: 'f13-ls-an-textiles-docents-q3',
        kind: 'single',
        skill: 'inference',
        prompt: 'What is implied about students who want to become docents?',
        options: [
          'They must be majoring in art history.',
          'They will be paid for each tour they lead.',
          'They must be free on certain weekday nights.',
          'They can start giving tours on October first.',
        ],
        answer: [2],
        explanation:
          'Deben completar "three training sessions on Wednesday evenings", así que necesitan estar libres esas noches entre semana. "No background in art history is required", y la recompensa es entrada gratuita y una carta, no un pago.',
      },
    ],
  },
  {
    id: 'f13-ls-an-greenhouse-quarantine',
    form: 13,
    section: 'listening',
    task: 'announcement',
    title: 'Greenhouse Quarantine Rules',
    topic: 'campus-life',
    difficulty: 'hard',
    context: 'Listen to an announcement at a university research greenhouse.',
    script: [
      {
        speaker: 'Announcer',
        voice: 'male',
        text: "Hello, everyone. This is an important message from the greenhouse manager about new quarantine rules. Over the summer, an outbreak of whiteflies in Bay Three damaged several research collections, and we traced it to a single plant brought in from a home garden. So, starting next Monday, any plant coming from outside the facility, whether it's from a nursery, another lab, or your own backyard, must go to the quarantine room first.",
      },
      {
        speaker: 'Announcer',
        voice: 'male',
        text: "It will stay there for at least fourteen days. During that time, staff will inspect it twice a week, checking the undersides of leaves and the soil surface for insects and eggs. If we find pests, the plant will be treated or, in serious cases, destroyed, and the quarantine period starts over. Please label each plant with your name and the date it arrived. Plants without labels will be removed.",
      },
    ],
    questions: [
      {
        id: 'f13-ls-an-greenhouse-quarantine-q1',
        kind: 'single',
        skill: 'purpose',
        prompt: 'Why is the greenhouse manager making this announcement?',
        options: [
          'To explain new rules for plants from outside',
          'To report that a research collection has been sold',
          'To ask staff to help treat the plants in Bay Three',
          'To announce that the quarantine room will close',
        ],
        answer: [0],
        explanation:
          'El mensaje trata de "new quarantine rules": "any plant coming from outside the facility… must go to the quarantine room first". Bay Three solo se menciona como origen del problema.',
      },
      {
        id: 'f13-ls-an-greenhouse-quarantine-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'What will happen if pests are found on a plant in quarantine?',
        options: [
          'It will be returned to its owner right away.',
          'It will be moved to Bay Three.',
          'It will be inspected once a week.',
          'Its quarantine period will start over.',
        ],
        answer: [3],
        explanation:
          'Si se encuentran plagas, la planta se trata o se destruye "and the quarantine period starts over". Las inspecciones son "twice a week", no una vez por semana.',
      },
      {
        id: 'f13-ls-an-greenhouse-quarantine-q3',
        kind: 'single',
        skill: 'inference',
        prompt: 'What can be inferred about the plant that caused the whitefly outbreak?',
        options: [
          'It had already spent several weeks in quarantine.',
          'It entered the greenhouse without quarantine.',
          'It was brought in from a commercial nursery.',
          'It had been labeled with the wrong date.',
        ],
        answer: [1],
        explanation:
          'La planta venía "from a home garden" y la cuarentena obligatoria empieza "starting next Monday", así que entró sin pasar por ella; por eso se crean las nuevas normas. No venía de un vivero ("nursery").',
      },
    ],
  },

  // ---------- Academic Talks ----------
  {
    id: 'f13-ls-at-hawaii-hotspot',
    form: 13,
    section: 'listening',
    task: 'academic-talk',
    title: 'Hawaii and the Hotspot',
    topic: 'geology',
    difficulty: 'easy',
    context: 'Listen to part of a lecture in a geology class.',
    script: [
      { speaker: 'Professor', voice: 'male', text: "Okay, let's turn to a question that puzzled geologists for a long time. Most volcanoes on Earth form near the edges of tectonic plates, where plates pull apart or where one plate sinks beneath another. But the Hawaiian Islands sit right in the middle of the Pacific Plate, thousands of kilometers from the nearest plate boundary. So where do their volcanoes come from?" },
      { speaker: 'Professor', voice: 'male', text: 'The most widely accepted explanation is something called a hotspot. A hotspot is a place where unusually hot material rises from deep in the mantle and partly melts as it nears the surface, feeding volcanoes above it. The key idea is that the hotspot stays more or less in one place, while the Pacific Plate slowly moves over it toward the northwest, at roughly seven to ten centimeters a year.' },
      { speaker: 'Professor', voice: 'male', text: "So picture a conveyor belt passing over a candle flame. As the plate moves, a volcano forms over the hotspot, grows into an island, and then gets carried away from its source of magma. Once it's cut off, it stops erupting, and over time it erodes and slowly sinks. Meanwhile, a new volcano starts forming over the hotspot." },
      { speaker: 'Professor', voice: 'male', text: "And that's exactly the pattern we see. The Big Island of Hawaii, at the southeastern end of the chain, is the youngest island, and it still has active volcanoes. As you move northwest, the islands get older and smaller: Maui, then Oahu, then Kauai, which is around five million years old. And southeast of the Big Island, deep under the ocean, a new volcano is already growing. In tens of thousands of years, it may break the surface and become the next Hawaiian island." },
    ],
    questions: [
      {
        id: 'f13-ls-at-hawaii-hotspot-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'What is the lecture mainly about?',
        options: [
          'Why volcanoes usually form along plate boundaries',
          'How scientists measure the speed of tectonic plates',
          'Why the Big Island has the most active volcanoes',
          'How a chain of islands formed over a hotspot',
        ],
        answer: [3],
        explanation:
          'El profesor explica cómo se formaron las islas hawaianas: el "hotspot" permanece fijo mientras "the Pacific Plate slowly moves over it". Los bordes de placa solo sirven de contraste al inicio.',
      },
      {
        id: 'f13-ls-at-hawaii-hotspot-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'According to the professor, why does a Hawaiian volcano eventually stop erupting?',
        options: [
          'The plate carries it away from the hotspot.',
          'Its magma cools on the way to the surface.',
          'The hotspot beneath it moves somewhere else.',
          'It sinks under the edge of another plate.',
        ],
        answer: [0],
        explanation:
          'El volcán "gets carried away from its source of magma. Once it\'s cut off, it stops erupting". La tercera opción es lo contrario de lo que se dice: el punto caliente "stays more or less in one place".',
      },
      {
        id: 'f13-ls-at-hawaii-hotspot-q3',
        kind: 'single',
        skill: 'function',
        prompt: 'Why does the professor mention a conveyor belt and a candle flame?',
        options: [
          'To describe how magma is heated in the mantle',
          'To explain why older islands erode and shrink over time',
          'To illustrate a plate moving over a fixed heat source',
          'To compare the speed of plates with everyday objects',
        ],
        answer: [2],
        explanation:
          'La imagen de "a conveyor belt passing over a candle flame" ilustra la placa que se desplaza sobre una fuente de calor fija (el punto caliente). No se usa para hablar de velocidades ni de erosión.',
      },
      {
        id: 'f13-ls-at-hawaii-hotspot-q4',
        kind: 'single',
        skill: 'inference',
        prompt: 'What can be inferred about the island of Kauai?',
        options: [
          'It has more active volcanoes than the Big Island.',
          'It was once located over the hotspot.',
          'It is moving toward the southeast every year.',
          'It formed more recently than Maui and Oahu.',
        ],
        answer: [1],
        explanation:
          'Según el modelo, cada isla se forma sobre el punto caliente y luego se aleja; Kauai es la más antigua mencionada ("around five million years old"), así que en su día estuvo sobre él. La placa se mueve "toward the northwest", no al sureste.',
      },
    ],
  },
  {
    id: 'f13-ls-at-warning-colors',
    form: 13,
    section: 'listening',
    task: 'academic-talk',
    title: 'Warning Colors and Mimicry',
    topic: 'biology',
    difficulty: 'medium',
    context: 'Listen to part of a lecture in a biology class.',
    script: [
      { speaker: 'Professor', voice: 'female', text: 'Last time we talked about camouflage, how animals avoid being noticed. Today I want to look at the opposite strategy. Think of poison dart frogs in the rain forests of Central and South America. They are tiny, but they are bright blue, or yellow, or red with black spots. Why would a small animal advertise itself like that?' },
      { speaker: 'Professor', voice: 'female', text: "The answer is that many of these frogs are toxic. They carry powerful toxins in their skin, which, interestingly, they get from the ants and mites they eat. A predator that bites one may become sick or even die. Biologists call this combination of danger and bright coloring aposematism, or warning coloration. Because the colors are so easy to remember, a predator that has one bad experience will tend to avoid similar-looking prey in the future." },
      { speaker: 'Student', voice: 'male', text: "But doesn't that mean some frogs have to get eaten first for the predators to learn?" },
      { speaker: 'Professor', voice: 'female', text: "Good question. Yes, at least at first. But once predators in an area have learned the lesson, the whole population benefits. Now, if predators avoid anything with a certain warning pattern, then a harmless animal could benefit just by looking dangerous. This is called Batesian mimicry, named after the naturalist Henry Walter Bates, who studied butterflies in the Amazon in the eighteen-hundreds." },
      { speaker: 'Professor', voice: 'female', text: "A familiar example is the hoverfly. Many hoverflies have yellow and black stripes, so they look a lot like wasps, but they can't sting at all. Birds that have been stung by wasps tend to leave them alone. There's a catch, though. Mimicry works best when the mimics are less common than the dangerous models. If harmless hoverflies far outnumbered wasps, birds would learn that the pattern usually means a safe meal." },
    ],
    questions: [
      {
        id: 'f13-ls-at-warning-colors-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'What is the lecture mainly about?',
        options: [
          'How animals use camouflage to avoid predators',
          'Where poison dart frogs obtain their toxins',
          'Why some animals benefit from being easy to see',
          'Why birds prefer to eat flies rather than wasps',
        ],
        answer: [2],
        explanation:
          'La clase trata de "the opposite strategy" al camuflaje: animales llamativos que se protegen con colores de advertencia (ranas venenosas) o imitándolos (sírfidos). El camuflaje se mencionó en la clase anterior.',
      },
      {
        id: 'f13-ls-at-warning-colors-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'According to the professor, where do poison dart frogs get their toxins?',
        options: [
          'From glands that develop as they grow older',
          'From the ants and mites that they eat',
          'From the plants where they lay their eggs',
          'From bacteria that live in the rain forest',
        ],
        answer: [1],
        explanation:
          'La profesora dice que las toxinas "they get from the ants and mites they eat". Las demás fuentes no se mencionan.',
      },
      {
        id: 'f13-ls-at-warning-colors-q3',
        kind: 'single',
        skill: 'function',
        prompt: 'Why does the professor mention Henry Walter Bates?',
        options: [
          'To explain the origin of a term she introduces',
          'To give an example of a scientist who studied frogs',
          'To show that mimicry was first observed in hoverflies',
          'To argue that butterflies are toxic to most birds',
        ],
        answer: [0],
        explanation:
          'Lo menciona al presentar la "Batesian mimicry, named after the naturalist Henry Walter Bates": explica de dónde viene el nombre. Bates estudió mariposas, no ranas ni sírfidos.',
      },
      {
        id: 'f13-ls-at-warning-colors-q4',
        kind: 'single',
        skill: 'inference',
        prompt: 'What would probably happen if harmless hoverflies became far more common than wasps?',
        options: [
          "Wasps would begin to copy the hoverflies' colors.",
          'Hoverflies would develop the ability to sting.',
          'Birds would stop eating both wasps and hoverflies entirely.',
          'Birds would be more likely to attack striped insects.',
        ],
        answer: [3],
        explanation:
          'La profesora explica que, si los imitadores fueran mayoría, "birds would learn that the pattern usually means a safe meal", así que atacarían más a los insectos con rayas. Dejar de comer ambos es lo contrario de lo que se deduce.',
      },
    ],
  },
  {
    id: 'f13-ls-at-nicaraguan-sign',
    form: 13,
    section: 'listening',
    task: 'academic-talk',
    title: 'The Birth of Nicaraguan Sign Language',
    topic: 'linguistics',
    difficulty: 'hard',
    context: 'Listen to part of a lecture in a linguistics class.',
    script: [
      { speaker: 'Professor', voice: 'male', text: "Linguists have long wondered how human languages begin, but there's an obvious problem: every spoken language we know of developed thousands of years ago, long before anyone could record the process. That's why Nicaraguan Sign Language is so remarkable. It's one of the very few cases in which researchers could watch a new language emerge almost from the beginning." },
      { speaker: 'Professor', voice: 'male', text: 'Before the late nineteen-seventies, deaf people in Nicaragua were largely isolated from one another. Most grew up in hearing families and communicated with simple home signs, gestures invented within a single family. Then, starting in 1977 and especially after 1980, new special education programs opened in Managua, and for the first time hundreds of deaf children were brought together in the same schools.' },
      { speaker: 'Professor', voice: 'male', text: 'The teachers focused on lip-reading and spoken Spanish, and that approach largely failed. But on the buses and in the schoolyards, the children began combining their home signs into a shared system. The first group of students developed a basic system that worked, but it was fairly limited and inconsistent.' },
      { speaker: 'Professor', voice: 'male', text: "The striking part is what happened next. Younger children who entered the schools in the mid-eighties learned this system from the older students, but they didn't just copy it. They made it more systematic. For example, older signers tended to describe a ball rolling down a hill with one gesture that showed the rolling and the downward path at the same time. Younger signers more often split the event into separate signs, one for rolling and one for going down, and put them in a sequence, the way languages build sentences from words." },
      { speaker: 'Professor', voice: 'male', text: "So what does this tell us? Many linguists see it as strong evidence that children don't simply absorb the language around them. When the input is incomplete or irregular, children can actively impose structure on it, although exactly how much of this ability is innate is still debated." },
    ],
    questions: [
      {
        id: 'f13-ls-at-nicaraguan-sign-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'What is the lecture mainly about?',
        options: [
          'What a new sign language shows about how languages form',
          'Why lip-reading programs for deaf children often fail',
          'How Nicaraguan schools taught spoken Spanish to children',
          'How home signs differ from one family to another',
        ],
        answer: [0],
        explanation:
          'El profesor presenta el caso como una oportunidad única de "watch a new language emerge" y termina explicando lo que revela sobre los niños y la gramática. El fracaso de la lectura labial es solo un detalle.',
      },
      {
        id: 'f13-ls-at-nicaraguan-sign-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'According to the professor, what made the emergence of the new language possible?',
        options: [
          'Teachers created a dictionary of common home signs.',
          'Deaf adults taught the children an existing language.',
          'Families began using the same gestures at home.',
          'Many deaf children were brought together in schools.',
        ],
        answer: [3],
        explanation:
          'Con los nuevos programas, "for the first time hundreds of deaf children were brought together in the same schools", y allí combinaron sus "home signs". Los profesores se centraban en el español hablado, no en crear signos.',
      },
      {
        id: 'f13-ls-at-nicaraguan-sign-q3',
        kind: 'single',
        skill: 'function',
        prompt: 'Why does the professor describe a ball rolling down a hill?',
        options: [
          'To show how the first students learned spoken Spanish',
          'To illustrate how younger signers broke events into parts',
          'To explain why teachers relied on gestures in class',
          'To prove that home signs were more precise than spoken words',
        ],
        answer: [1],
        explanation:
          'El ejemplo muestra la diferencia entre generaciones: los mayores usaban "one gesture", mientras que los más jóvenes "split the event into separate signs" y los ordenaban en secuencia.',
      },
      {
        id: 'f13-ls-at-nicaraguan-sign-q4',
        kind: 'single',
        skill: 'inference',
        prompt: 'What does the professor imply about the system that the younger children learned from older students?',
        options: [
          'It was already a complete and consistent language.',
          'It was based mainly on words borrowed from spoken Spanish.',
          'It was less regular than a fully developed language.',
          'It was taught to them directly by their teachers.',
        ],
        answer: [2],
        explanation:
          'El sistema del primer grupo era "fairly limited and inconsistent", y la conclusión habla de un "input" "incomplete or irregular" al que los niños imponen estructura. Por tanto, no era aún una lengua completa y regular.',
      },
    ],
  },
];
