import type { Difficulty, ListeningSet, Topic, Voice } from '../../../types';

/** Simulación n.º 16 — Listening (contenido original). */

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
    form: 16,
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
  cr('f16-ls-cr-econ-instructor', 'easy', 'female', "Do you know who's teaching Introduction to Economics next term?", [
    'I took that class last spring.',
    "I heard it's Professor Grant again.",
    'It meets on Mondays and Wednesdays.',
    'Economics is my favorite subject.',
  ], 1, 'La pregunta empieza por "who" y pide una persona; solo "Professor Grant" responde a eso. "It meets on Mondays…" contesta a "cuándo", no a "quién".'),
  cr('f16-ls-cr-watch-register', 'easy', 'male', 'Could you keep an eye on the register for five minutes while I grab more cups?', [
    'The register is next to the door.',
    'I bought five cups this morning.',
    'Yes, I watched it on the news last week.',
    "Sure, go ahead. I've got it.",
  ], 3, 'Es una petición ("Could you keep an eye on…"); lo natural es aceptarla: "Sure, go ahead. I\'ve got it". Las demás repiten palabras del enunciado ("register", "five", "cups") o cambian el sentido y el tiempo verbal ("watched it on the news").', 'daily-life'),
  cr('f16-ls-cr-share-book', 'easy', 'male', 'I see you forgot your book. Do you want to share mine?', [
    'Thanks, that would really help.',
    "No, I don't have one to share.",
    'I bought mine at the bookstore.',
    'Yes, I remember it now.',
  ], 0, 'Es un ofrecimiento ("Do you want to share mine?"); se responde agradeciéndolo: "Thanks, that would really help". "No, I don\'t have one to share" interpreta al revés quién ofrece el libro.'),
  cr('f16-ls-cr-chem-quiz', 'easy', 'female', 'So, how did the chemistry quiz go for you?', [
    'It goes every Tuesday at nine.',
    "I'm going to the chemistry lab.",
    'Better than I expected, actually.',
    'The quiz has ten multiple-choice questions.',
  ], 2, '"How did … go for you?" pregunta por el resultado o la experiencia; "Better than I expected" responde a eso. Las otras opciones juegan con "go" o con "quiz" sin contestar.'),
  cr('f16-ls-cr-birthday-card', 'easy', 'female', 'Thanks so much for the birthday card. It really made my day!', [
    'My birthday is in March.',
    'The card shop is downtown.',
    "I'll make one tomorrow.",
    "I'm so glad you liked it!",
  ], 3, 'Ante un agradecimiento ("Thanks so much…"), lo natural es mostrar alegría: "I\'m so glad you liked it!". "I\'ll make one tomorrow" confunde la expresión "made my day" (me alegró el día).', 'daily-life'),
  cr('f16-ls-cr-record-talk', 'easy', 'female', 'Would you mind if I recorded your practice talk so I can give you feedback later?', [
    'Not at all. Go right ahead.',
    'Yes, I recorded it last night.',
    'I gave a talk in class last week.',
    "No, I don't have any feedback yet.",
  ], 0, 'Con "Would you mind if…?" se pide permiso; "Not at all" significa "no me importa", es decir, sí se concede. "No, I don\'t have any feedback yet" confunde quién va a dar la opinión.'),

  // ---------- Choose a Response: medium ----------
  cr('f16-ls-cr-present-first', 'medium', 'male', 'I was wondering whether your group might be willing to present its results first today.', [
    'We first met in the library on Monday.',
    'Our results were better than we expected.',
    "Sure, we're ready whenever you are.",
    'I wonder who presented first last week.',
  ], 2, '"I was wondering whether…" es una petición indirecta y cortés del asistente; la respuesta adecuada es aceptar: "Sure, we\'re ready whenever you are". Las demás repiten "first", "results" o "wonder" sin responder a la petición.'),
  cr('f16-ls-cr-reading-list', 'medium', 'female', "I can't believe we're supposed to get through this whole reading list in one week.", [
    'The list is posted on the course website.',
    'I know. Should we split the articles?',
    'I believe you did a great job on it.',
    'One week from Friday, I think.',
  ], 1, 'Es una queja; la respuesta natural muestra acuerdo y propone una solución: "I know. Should we split the articles?". "One week from Friday" respondería a una pregunta sobre una fecha.'),
  cr('f16-ls-cr-movie-choice', 'medium', 'male', 'Do you feel like seeing the documentary or the comedy tonight?', [
    "Yes, I'd really like that, thanks.",
    'I saw a documentary last weekend.',
    "It starts at eight o'clock, I think.",
    'I could use a laugh, so the comedy.',
  ], 3, 'Es una pregunta de elección ("the documentary or the comedy"); hay que elegir una opción: "so the comedy". Responder "Yes" a una pregunta con "or" es la trampa típica.', 'daily-life'),
  cr('f16-ls-cr-calculators', 'medium', 'female', "Didn't the professor say calculators weren't allowed on the exam?", [
    'No, she said basic ones are fine.',
    "Yes, I'm allowed to take the exam.",
    'My calculator needs new batteries.',
    'The exam is on Thursday afternoon.',
  ], 0, 'La pregunta negativa busca confirmar una información; "No, she said basic ones are fine" la corrige con un dato concreto. "Yes, I\'m allowed to take the exam" repite "allowed" pero habla de otra cosa.'),
  cr('f16-ls-cr-graphs-abstract', 'medium', 'male', 'If you write the abstract, I can finish the graphs tonight.', [
    'The graphs were finished last night.',
    "Abstract art isn't really my thing.",
    "Deal. I'll send it to you by ten.",
    'You can write it if you want.',
  ], 2, 'Es una oferta condicional ("If you write the abstract, I can…"); "Deal. I\'ll send it to you by ten" la acepta y asume la parte propia. "Abstract art" confunde el significado de "abstract" (resumen de un informe).'),
  cr('f16-ls-cr-housing-form', 'medium', 'male', 'Oh no, I think I forgot to submit my housing application!', [
    'I applied for a job last week.',
    "Let's check the housing portal.",
    'The application form has four pages.',
    "No, I didn't forget your birthday.",
  ], 1, 'El hablante está preocupado; la respuesta útil propone comprobarlo: "Let\'s check the housing portal". Las demás repiten "applied", "application" o "forget" sin ayudar.'),

  // ---------- Choose a Response: hard ----------
  cr('f16-ls-cr-copy-problem-set', 'hard', 'male', 'Could I copy your finished problem set? Just to check my answers, I promise.', [
    "I'd rather not, but I can explain them.",
    'Yes, the copier is on the second floor.',
    "I promise I'll finish mine by tonight.",
    'The problems were easier than last time.',
  ], 0, 'Copiar el trabajo de otro no es apropiado; la respuesta adecuada rechaza con tacto ("I\'d rather not") y ofrece una alternativa ("but I can explain them"). "The copier" confunde "copy" con fotocopiar.'),
  cr('f16-ls-cr-rain-check', 'hard', 'female', "Lunch sounds great, but can I take a rain check? I've got a meeting at noon.", [
    "Don't worry, I'll bring an umbrella.",
    'Sure, you can pay by check if you like.',
    'Great, see you at noon, then.',
    'No problem. How about Friday instead?',
  ], 3, '"Take a rain check" significa aplazar una invitación para otro momento; lo natural es proponer otra fecha: "How about Friday instead?". El paraguas y el cheque interpretan la expresión literalmente.', 'daily-life'),
  cr('f16-ls-cr-references-format', 'hard', 'female', "Your paper looks so professional. I'd love to see how you formatted your references.", [
    "I'd love to see it too, honestly.",
    "Sure, I'll send you my list.",
    'I formatted my laptop last week.',
    'My professor wrote me a reference.',
  ], 1, '"I\'d love to see…" es una petición implícita: quiere ver la bibliografía. La respuesta adecuada es ofrecérsela: "Sure, I\'ll send you my list". "Wrote me a reference" usa otro significado de "reference" (carta de recomendación).'),
  cr('f16-ls-cr-essay-midnight', 'hard', 'male', "You're not still working on that essay, are you? It's almost midnight.", [
    "No, I'm not working at the café anymore.",
    "Yes, it's almost midnight already.",
    "Afraid so. I'm stuck on the conclusion.",
    'I worked on it until next week.',
  ], 2, 'La pregunta con coletilla negativa expresa sorpresa; "Afraid so" confirma que sigue trabajando y explica por qué. "Yes, it\'s almost midnight already" solo repite la información del hablante.', 'daily-life'),
  cr('f16-ls-cr-cozy-studio', 'hard', 'female', "My new studio apartment is, well... let's just say it's cozy.", [
    "So there's not much room, huh?",
    'Then it must be really spacious.',
    'I study in my apartment too.',
    'Is the studio open to the public?',
  ], 0, '"Cozy" se usa aquí como eufemismo de "pequeño"; la pausa ("well… let\'s just say") lo indica. "So there\'s not much room, huh?" capta el sentido implícito; "spacious" lo interpreta al revés.', 'daily-life'),
  cr('f16-ls-cr-new-schedule', 'hard', 'male', "The new schedule doesn't seem to be working for everyone.", [
    'Everyone is working this weekend.',
    'I printed the new schedule this morning.',
    'Yes, it started working yesterday.',
    'Should we ask the manager to change it?',
  ], 3, 'Es una queja implícita que invita a cambiar algo; la respuesta adecuada propone actuar: "Should we ask the manager to change it?". Las demás repiten "working" o "schedule" con otro sentido.', 'daily-life'),

  // ---------- Conversations ----------
  {
    id: 'f16-ls-cv-resume-review',
    form: 16,
    section: 'listening',
    task: 'conversation',
    title: 'Résumé Help Before the Job Fair',
    topic: 'campus-life',
    difficulty: 'easy',
    context: 'Listen to a conversation between a student and a career center adviser.',
    script: [
      { speaker: 'Student', voice: 'female', text: "Hi, is this where I can get my résumé checked? The job fair is next Thursday, and I've never been to one before." },
      { speaker: 'Adviser', voice: 'male', text: "You're in the right place. You don't need an appointment for a résumé review. We have drop-in hours every weekday from one to four in the afternoon." },
      { speaker: 'Student', voice: 'female', text: 'Oh, good. Could someone look at it now, then?' },
      { speaker: 'Adviser', voice: 'male', text: "Unfortunately, on Fridays we close at two because of staff training, and it's already past three. But you could come on Monday. I'd try to arrive right at one, though. The week before a job fair gets really busy." },
      { speaker: 'Student', voice: 'female', text: 'Okay. What should I bring?' },
      { speaker: 'Adviser', voice: 'male', text: "A printed copy of your résumé, plus the description of at least one job or internship you're interested in. That way, the reviewer can help you match your experience to what the employer wants." },
      { speaker: 'Student', voice: 'female', text: "I don't really have a job description. I just know I'd like to work in marketing." },
      { speaker: 'Adviser', voice: 'male', text: "That's fine. Our website lists the companies coming to the fair. Pick one or two marketing positions and print those out." },
      { speaker: 'Student', voice: 'female', text: 'That makes sense. How long does a review usually take?' },
      { speaker: 'Adviser', voice: 'male', text: "About fifteen minutes. And once you've revised it, you're welcome to come back for a second look before Thursday." },
    ],
    questions: [
      {
        id: 'f16-ls-cv-resume-review-q1',
        kind: 'single',
        skill: 'purpose',
        prompt: 'Why does the student go to the career center?',
        options: [
          'To apply for a marketing internship',
          'To find out which companies will attend the fair',
          'To have her résumé checked before a job fair',
          'To make an appointment with a career adviser',
        ],
        answer: [2],
        explanation:
          'Al principio pregunta "is this where I can get my résumé checked? The job fair is next Thursday". El asesor aclara que no hace falta cita ("You don\'t need an appointment"), y la lista de empresas solo aparece después como consejo.',
      },
      {
        id: 'f16-ls-cv-resume-review-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'What does the adviser tell the student to bring?',
        options: [
          'A printed résumé and a job description',
          'A list of the marketing courses she took',
          'A letter from one of her past employers',
          'Her student ID and a cover letter',
        ],
        answer: [0],
        explanation:
          'El asesor dice: "A printed copy of your résumé, plus the description of at least one job or internship you\'re interested in". No menciona cartas, cursos ni identificación.',
      },
      {
        id: 'f16-ls-cv-resume-review-q3',
        kind: 'single',
        skill: 'inference',
        prompt: 'What does the adviser imply about the week before a job fair?',
        options: [
          'Reviews take much longer than fifteen minutes.',
          'The center offers extra drop-in hours that week.',
          'Students must book an appointment in advance.',
          'Many students come in to have résumés checked.',
        ],
        answer: [3],
        explanation:
          'Le aconseja llegar "right at one" porque "The week before a job fair gets really busy": se deduce que muchos estudiantes acuden a revisar su currículum. Los quince minutos son la duración normal y no se habla de horas extra.',
      },
    ],
  },
  {
    id: 'f16-ls-cv-electron-microscope',
    form: 16,
    section: 'listening',
    task: 'conversation',
    title: 'Training on the Electron Microscope',
    topic: 'biology',
    difficulty: 'medium',
    context: 'Listen to a conversation between a student and the manager of a biology imaging facility.',
    script: [
      { speaker: 'Student', voice: 'male', text: "Hi, I'm Marcus. I work in Dr. Patel's lab, and my adviser wants me to take images of insect wings with the scanning electron microscope. How do I get trained?" },
      { speaker: 'Manager', voice: 'female', text: "Welcome. There are three steps. First, everyone has to complete our online safety course. It covers the high-voltage equipment and the chemicals we use to prepare samples. It takes about an hour, and you need at least ninety percent on the final quiz." },
      { speaker: 'Student', voice: 'male', text: "Ninety percent? Can I retake it if I don't pass?" },
      { speaker: 'Manager', voice: 'female', text: "As many times as you need. Once you pass, you'll get access to our online booking system. That's step two. But at first, you can only book sessions marked 'supervised.'" },
      { speaker: 'Student', voice: 'male', text: 'What does supervised mean, exactly? Is it a class?' },
      { speaker: 'Manager', voice: 'female', text: "Not really. It's one-on-one. A staff member sits with you while you operate the microscope. After three supervised sessions, you can book the instrument on your own. That's the third step." },
      { speaker: 'Student', voice: 'male', text: 'Three sessions? I was hoping to have my images ready for a poster in about three weeks.' },
      { speaker: 'Manager', voice: 'female', text: "That's doable if you start now. Supervised slots fill up fast, though, so book all three as soon as your access is turned on. Also, your samples have to be completely dry and coated before you come. Insect wings usually need a thin layer of gold." },
      { speaker: 'Student', voice: 'male', text: 'Do I do the coating myself?' },
      { speaker: 'Manager', voice: 'female', text: 'In your first session, the staff member will show you how. After that, yes, it\'s up to you.' },
      { speaker: 'Student', voice: 'male', text: "Great. Then I'll do the safety course tonight." },
    ],
    questions: [
      {
        id: 'f16-ls-cv-electron-microscope-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'What is the conversation mainly about?',
        options: [
          'How to prepare insect wings for a poster',
          'How to get trained on a microscope',
          'Why the safety quiz is so hard to pass',
          'How to apply for a job at the facility',
        ],
        answer: [1],
        explanation:
          'El estudiante pregunta "How do I get trained?" y la responsable explica "three steps": curso de seguridad, sistema de reservas y sesiones supervisadas. Las alas de insecto y el póster son solo el contexto.',
      },
      {
        id: 'f16-ls-cv-electron-microscope-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'What must the student do before he can book the microscope on his own?',
        options: [
          'Coat all of his insect samples with gold',
          'Attend a group class on imaging',
          'Get written approval from his adviser',
          'Complete three supervised sessions',
        ],
        answer: [3],
        explanation:
          'La responsable dice: "After three supervised sessions, you can book the instrument on your own", y explica que en ellas "A staff member sits with you". No es una clase en grupo ("Not really. It\'s one-on-one").',
      },
      {
        id: 'f16-ls-cv-electron-microscope-q3',
        kind: 'single',
        skill: 'function',
        prompt: 'Why does the manager say, "Supervised slots fill up fast"?',
        options: [
          'To suggest that he use a different facility',
          'To explain why the quiz can be retaken',
          'To urge him to book his sessions early',
          'To warn him that his poster will be late',
        ],
        answer: [2],
        explanation:
          'Justo después añade "so book all three as soon as your access is turned on": quiere que reserve pronto. De hecho, cree que el plazo del póster es posible ("That\'s doable if you start now"), así que no le advierte de un retraso.',
      },
    ],
  },
  {
    id: 'f16-ls-cv-thesis-images',
    form: 16,
    section: 'listening',
    task: 'conversation',
    title: 'Museum Images in an Online Thesis',
    topic: 'campus-life',
    difficulty: 'hard',
    context: 'Listen to a conversation between a graduate student and a librarian.',
    script: [
      { speaker: 'Student', voice: 'female', text: "Hi. I'm finishing my thesis on nineteenth-century landscape painting, and I want to include images from a few museum websites. But the graduate school says all theses are published online in the university's repository. Is that a problem?" },
      { speaker: 'Librarian', voice: 'male', text: "It might be, depending on the images. The first question is whether the paintings themselves are still under copyright. Works from the nineteenth century are almost certainly in the public domain, so the paintings aren't the issue." },
      { speaker: 'Student', voice: 'female', text: 'Then why would there be a problem at all?' },
      { speaker: 'Librarian', voice: 'male', text: "Because some museums claim rights in their photographs of those paintings, or they attach terms of use to their websites. In the U.S., courts have generally said that an exact photo of a flat, public-domain painting doesn't create a new copyright. But a website's terms can still limit what you're allowed to do with the files you download." },
      { speaker: 'Student', voice: 'female', text: 'So I have to check each museum separately?' },
      { speaker: 'Librarian', voice: 'male', text: "Yes. The good news is that many major museums now have open-access programs. They release images of public-domain works for any use, including publication. Look for a label that says 'open access' or 'public domain' next to the image." },
      { speaker: 'Student', voice: 'female', text: 'Okay. But I also have two paintings from the 1950s. Those are probably still protected, right?' },
      { speaker: 'Librarian', voice: 'male', text: "Most likely. For those, you could rely on fair use, which allows limited use for purposes like scholarship and criticism. You'd want to discuss each work directly in your text, use a fairly small image, and include only what you actually analyze." },
      { speaker: 'Student', voice: 'female', text: "And if I'm not comfortable relying on that?" },
      { speaker: 'Librarian', voice: 'male', text: "Then you ask the rights holder for permission, which is often the artist's estate. Just start early, because replies can take weeks. Meanwhile, I'll email you our fair use checklist so you can document your reasoning." },
      { speaker: 'Student', voice: 'female', text: 'That would be really helpful. Thank you.' },
    ],
    questions: [
      {
        id: 'f16-ls-cv-thesis-images-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'What is the conversation mainly about?',
        options: [
          'Whether she may use museum images in her online thesis',
          'How to find nineteenth-century paintings in online collections',
          'Why the graduate school publishes every thesis on the internet',
          'How to photograph paintings in a museum without breaking rules',
        ],
        answer: [0],
        explanation:
          'La estudiante pregunta si incluir imágenes de museos en una tesis que se publicará en línea "is a problem", y el bibliotecario habla de dominio público, términos de uso, "fair use" y permisos. La publicación en línea es solo el punto de partida.',
      },
      {
        id: 'f16-ls-cv-thesis-images-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'According to the librarian, what should the student look for on museum websites?',
        options: [
          'A form for requesting a larger image file',
          'The name of the person who took the photo',
          'A label saying an image is open access',
          'The year in which a painting was created',
        ],
        answer: [2],
        explanation:
          'El bibliotecario dice: "Look for a label that says \'open access\' or \'public domain\' next to the image". La fecha de la obra se menciona, pero como criterio general de derechos, no como algo que buscar en la web.',
      },
      {
        id: 'f16-ls-cv-thesis-images-q3',
        kind: 'single',
        skill: 'inference',
        prompt: 'What does the librarian imply about the two paintings from the 1950s?',
        options: [
          'Their images can be used with no restrictions.',
          'Using them may require fair use or permission.',
          'Museums usually refuse to share images of them.',
          'They cannot appear in a thesis published online.',
        ],
        answer: [1],
        explanation:
          'Como "Most likely" siguen protegidas, propone dos vías: "rely on fair use" o pedir "permission" al titular de los derechos. No dice que sea imposible incluirlas, así que la última opción exagera.',
      },
    ],
  },

  // ---------- Announcements ----------
  {
    id: 'f16-ls-an-water-shutoff',
    form: 16,
    section: 'listening',
    task: 'announcement',
    title: 'Thursday Morning Water Shut-Off',
    topic: 'campus-life',
    difficulty: 'easy',
    context: 'Listen to an announcement in a university residence hall.',
    script: [
      {
        speaker: 'Announcer',
        voice: 'female',
        text: "Good evening, Maple Hall residents. This is a reminder from Housing Services. On Thursday morning, the water in the entire building will be shut off from seven a.m. until about noon so that plumbers can repair a leaking pipe in the basement. During that time, sinks, showers, and toilets will not work. We strongly recommend filling a few water bottles on Wednesday night and taking your shower before seven. If you need a restroom during the repairs, the student center across the street will open early, at six-thirty. The repairs should also fix the low water pressure that some of you have reported on the upper floors. Thank you for your patience.",
      },
    ],
    questions: [
      {
        id: 'f16-ls-an-water-shutoff-q1',
        kind: 'single',
        skill: 'purpose',
        prompt: 'What is the main purpose of the announcement?',
        options: [
          'To report low water pressure on upper floors',
          'To ask residents to use less water this week',
          'To explain how to report a leaking pipe',
          'To warn residents about a water shut-off',
        ],
        answer: [3],
        explanation:
          'El anuncio avisa de que "the water in the entire building will be shut off from seven a.m. until about noon" el jueves. La baja presión se menciona solo al final, como algo que la reparación también resolverá.',
      },
      {
        id: 'f16-ls-an-water-shutoff-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'Where can residents use a restroom during the repairs?',
        options: [
          'In a restroom in the basement of Maple Hall',
          'In the student center across the street',
          'On the upper floors of the residence hall',
          'In the Housing Services office',
        ],
        answer: [1],
        explanation:
          '"If you need a restroom during the repairs, the student center across the street will open early, at six-thirty." El sótano es donde está la tubería que se repara.',
      },
      {
        id: 'f16-ls-an-water-shutoff-q3',
        kind: 'single',
        skill: 'inference',
        prompt: 'What will residents probably do on Wednesday night?',
        options: [
          'Move temporarily to another residence hall',
          'Meet the plumbers in the basement',
          'Fill bottles with water for Thursday',
          'Report problems with their showers',
        ],
        answer: [2],
        explanation:
          'El anuncio recomienda "filling a few water bottles on Wednesday night", porque el jueves por la mañana no habrá agua. No se pide a nadie que se traslade ni que se reúna con los fontaneros.',
      },
    ],
  },
  {
    id: 'f16-ls-an-korea-exchange',
    form: 16,
    section: 'listening',
    task: 'announcement',
    title: 'New Exchange Program in Seoul',
    topic: 'campus-life',
    difficulty: 'medium',
    context: 'Listen to an announcement on a university campus.',
    script: [
      {
        speaker: 'Announcer',
        voice: 'male',
        text: "Attention, students. The Study Abroad Office is excited to announce a new exchange partnership with a leading university in Seoul, South Korea, beginning next fall. Through this program, you can spend one semester in Seoul while paying your regular tuition here. Courses are taught in English, so no knowledge of Korean is required, although a free introductory language course will be offered before departure. To learn more, come to our information session next Tuesday at five p.m. in Room 210 of the International Center. Two students from Seoul who are studying on our campus this year will talk about daily life at their home university. Applications for the fall semester are due March first, and you'll need a GPA of at least 3.0. Please note that the program can accept only six students each semester.",
      },
    ],
    questions: [
      {
        id: 'f16-ls-an-korea-exchange-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'What is the announcement mainly about?',
        options: [
          'A new exchange program and a session about it',
          'A Korean language course for beginning students',
          'Changes to tuition for students who study abroad',
          'Visiting students from a university in Seoul',
        ],
        answer: [0],
        explanation:
          'El anuncio presenta "a new exchange partnership" con una universidad de Seúl e invita a "our information session next Tuesday". El curso de coreano y los estudiantes visitantes son detalles secundarios.',
      },
      {
        id: 'f16-ls-an-korea-exchange-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'What is required to apply for the program?',
        options: [
          'A basic knowledge of the Korean language',
          'Attendance at the information session',
          'A letter from a student now in Seoul',
          'A grade point average of at least 3.0',
        ],
        answer: [3],
        explanation:
          'El requisito explícito es "you\'ll need a GPA of at least 3.0". El coreano no es necesario ("no knowledge of Korean is required") y la sesión informativa es una invitación, no una obligación.',
      },
      {
        id: 'f16-ls-an-korea-exchange-q3',
        kind: 'single',
        skill: 'inference',
        prompt: 'What is implied about the program?',
        options: [
          'Students will pay higher tuition while in Seoul.',
          'Not every qualified applicant may be accepted.',
          'It is open only to students who speak Korean.',
          'Students can stay in Seoul for a full year.',
        ],
        answer: [1],
        explanation:
          'Como "the program can accept only six students each semester", es probable que algunos candidatos que cumplen el requisito no consigan plaza. La matrícula es la habitual ("your regular tuition") y la estancia es de "one semester".',
      },
    ],
  },
  {
    id: 'f16-ls-an-chemical-spill',
    form: 16,
    section: 'listening',
    task: 'announcement',
    title: 'Handling a Minor Chemical Spill',
    topic: 'campus-life',
    difficulty: 'hard',
    context: 'Listen to a chemistry professor speaking to students at the start of a lab session.',
    script: [
      {
        speaker: 'Professor',
        voice: 'female',
        text: "Before we begin today's lab, let's review what to do if a minor chemical spill happens. By minor, I mean less than about a liter of a substance you can identify and that isn't highly toxic. First, alert the people around you so that no one walks through it. Second, put on gloves and goggles, and contain the spill with the kit under the sink. Place the absorbent pads around it, working from the outside in, so it doesn't spread.",
      },
      {
        speaker: 'Professor',
        voice: 'female',
        text: "Third, improve the ventilation: turn on the fume hood, and open the windows if there's a strong smell. Used pads go in the yellow hazardous waste bag, not the trash. Finally, every spill, however small, must be reported online within twenty-four hours. And if a spill is large, or you're not sure what it is, leave the room and call campus safety.",
      },
    ],
    questions: [
      {
        id: 'f16-ls-an-chemical-spill-q1',
        kind: 'single',
        skill: 'purpose',
        prompt: 'What is the main purpose of the talk?',
        options: [
          'To explain how to throw away hazardous waste',
          'To describe what happened during a recent spill',
          'To review the steps for handling a small spill',
          'To show students how to operate the fume hood',
        ],
        answer: [2],
        explanation:
          'La profesora dice "let\'s review what to do if a minor chemical spill happens" y enumera los pasos (First, Second, Third, Finally). La bolsa amarilla y la campana extractora son solo partes de ese procedimiento.',
      },
      {
        id: 'f16-ls-an-chemical-spill-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'According to the professor, how should the absorbent pads be used?',
        options: [
          'They should be placed from the outside of the spill inward.',
          'They should be thrown in the regular trash after use.',
          'They should be used to cover the center of the spill first.',
          'They should be soaked in water before they are used.',
        ],
        answer: [0],
        explanation:
          'Indica: "Place the absorbent pads around it, working from the outside in, so it doesn\'t spread". Empezar por el centro es lo contrario, y los paños usados van "in the yellow hazardous waste bag, not the trash".',
      },
      {
        id: 'f16-ls-an-chemical-spill-q3',
        kind: 'single',
        skill: 'inference',
        prompt: 'What should a student do if a large amount of an unknown liquid spills?',
        options: [
          'Contain it with the kit under the sink',
          'Open the windows and turn on the fume hood',
          'Wait until the next day to file a report',
          'Leave the lab and contact campus safety',
        ],
        answer: [3],
        explanation:
          'El procedimiento con el kit es solo para derrames "minor"; para uno grande o desconocido dice: "leave the room and call campus safety". Las dos primeras opciones son pasos del caso menor.',
      },
    ],
  },

  // ---------- Academic Talks ----------
  {
    id: 'f16-ls-at-dunbar-number',
    form: 16,
    section: 'listening',
    task: 'academic-talk',
    title: "Dunbar's Number and Friendship",
    topic: 'sociology',
    difficulty: 'easy',
    context: 'Listen to part of a lecture in a sociology class.',
    script: [
      { speaker: 'Professor', voice: 'male', text: "Let's start with a question. How many friends do you have? I don't mean everyone you've ever met. I mean people you'd happily join for coffee if you ran into them at an airport. In the 1990s, the British anthropologist Robin Dunbar proposed that, for most people, that number is around one hundred fifty. It's now known as Dunbar's number." },
      { speaker: 'Professor', voice: 'male', text: 'Dunbar started with primates. He noticed that monkeys and apes with a larger neocortex, the outer part of the brain involved in complex thinking, tend to live in larger social groups. Keeping track of who is friends with whom takes a lot of mental work. When he used the size of the human neocortex to predict our natural group size, the answer came out at roughly one hundred fifty.' },
      { speaker: 'Professor', voice: 'male', text: 'Then he looked for real-world evidence. Many early farming villages seem to have had about one hundred fifty inhabitants. The Hutterites, a religious community in North America that lives on shared farms, traditionally split a colony in two when it grows much beyond that size, because members find it hard to keep order through personal relationships alone. Military units show a similar pattern: a company, often the largest unit in which soldiers all know one another, usually has between one hundred and two hundred people.' },
      { speaker: 'Professor', voice: 'male', text: "What about social media, where people can have a thousand 'friends'? Interestingly, studies of online networks suggest that the number of people we actually interact with regularly is still about the same. Social media makes it easier to stay in contact, but it doesn't give us more time, or a bigger brain, to maintain close relationships." },
      { speaker: 'Professor', voice: 'male', text: 'So the key idea is this: our social world is limited not by opportunity, but by the time and mental effort that real relationships require.' },
    ],
    questions: [
      {
        id: 'f16-ls-at-dunbar-number-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'What is the lecture mainly about?',
        options: [
          'How social media has changed modern friendship',
          'Evidence for a limit on stable relationships',
          'The differences between human and primate brains',
          'Why early farming villages grew larger over time',
        ],
        answer: [1],
        explanation:
          'La clase presenta "Dunbar\'s number" (unas 150 relaciones) y las pruebas que lo apoyan: primates, aldeas, huteritas, ejércitos y redes sociales. Las redes sociales son solo uno de esos ejemplos.',
      },
      {
        id: 'f16-ls-at-dunbar-number-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'According to the professor, what did Dunbar notice about primates?',
        options: [
          'Larger groups made primates more aggressive.',
          'Monkeys keep friends for longer than apes do.',
          'Species with a larger neocortex live in larger groups.',
          'Primates usually form groups of exactly one hundred fifty.',
        ],
        answer: [2],
        explanation:
          'El profesor dice que los primates "with a larger neocortex… tend to live in larger social groups". El número 150 es la predicción para los humanos, no el tamaño de los grupos de primates.',
      },
      {
        id: 'f16-ls-at-dunbar-number-q3',
        kind: 'single',
        skill: 'organization',
        prompt: 'Why does the professor mention the Hutterites?',
        options: [
          'To give an example of a group that splits when it gets too big',
          'To show that religious communities have more friends than others',
          'To explain how the earliest farming villages were organized',
          'To suggest that military units were modeled on farm communities',
        ],
        answer: [0],
        explanation:
          'Los huteritas "split a colony in two when it grows much beyond that size": son un ejemplo real que respalda el límite de unas 150 personas. No se comparan con otras religiones ni con el origen de los ejércitos.',
      },
      {
        id: 'f16-ls-at-dunbar-number-q4',
        kind: 'single',
        skill: 'inference',
        prompt: 'What does the professor imply about people with a thousand online friends?',
        options: [
          'They have larger brains than most other people.',
          'They spend less time with their own families.',
          'They are likely to have more close relationships.',
          'They regularly interact with far fewer people.',
        ],
        answer: [3],
        explanation:
          'Según los estudios citados, "the number of people we actually interact with regularly is still about the same" (unas 150), así que alguien con mil contactos trata habitualmente con muchos menos. La tercera opción contradice esa idea.',
      },
    ],
  },
  {
    id: 'f16-ls-at-seurat-pointillism',
    form: 16,
    section: 'listening',
    task: 'academic-talk',
    title: 'Seurat and Optical Mixing',
    topic: 'art',
    difficulty: 'medium',
    context: 'Listen to part of a lecture in an art history class.',
    script: [
      { speaker: 'Professor', voice: 'female', text: 'Last time we looked at the Impressionists, who painted quickly, with loose brushstrokes, trying to capture a passing moment. Today\'s artist, Georges Seurat, took some of their ideas in a very different direction. Instead of quick, spontaneous strokes, he built his paintings out of thousands of tiny dots of color. This technique is usually called pointillism.' },
      { speaker: 'Professor', voice: 'female', text: "Seurat was fascinated by the science of color. He read the work of scientists who studied how we perceive color, including the idea that colors placed side by side affect one another. So rather than mixing paints on his palette, he put small dots of pure, unmixed color next to each other on the canvas. A patch of green grass, for example, might contain dots of yellow and blue, plus touches of orange where sunlight falls on it. From a distance, the viewer's eye blends these dots. This is called optical mixing." },
      { speaker: 'Professor', voice: 'female', text: 'Why go to all this trouble? Well, when you mix paints physically, the result tends to become duller and darker. Seurat hoped that colors mixed in the eye would look brighter and more luminous. In reality, the dots never blend perfectly at a normal viewing distance, so the surface seems to shimmer, which is part of its charm.' },
      { speaker: 'Professor', voice: 'female', text: "His most famous example is A Sunday on La Grande Jatte, which shows Parisians relaxing in a park on an island in the Seine River. It's huge, about two meters by three, and it took him roughly two years to complete. He made dozens of drawings and small oil studies before he even started the final canvas." },
      { speaker: 'Professor', voice: 'female', text: "Now, notice how still the people look. Unlike the lively crowds in Impressionist paintings, Seurat's figures are stiff and carefully arranged, almost like figures in an ancient stone carving. That careful, almost scientific approach is what set him apart from the Impressionists, even though the painting was first shown at their final group exhibition, in 1886." },
    ],
    questions: [
      {
        id: 'f16-ls-at-seurat-pointillism-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'What is the lecture mainly about?',
        options: [
          'Why the Impressionists painted so quickly',
          'How Parisians spent their weekends in the 1880s',
          'The chemistry of the paints Seurat preferred',
          'A painting method based on dots of pure color',
        ],
        answer: [3],
        explanation:
          'La profesora explica la técnica de Seurat, "thousands of tiny dots of color" o puntillismo, la teoría de la mezcla óptica y su obra más famosa. Los impresionistas solo sirven de contraste.',
      },
      {
        id: 'f16-ls-at-seurat-pointillism-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'According to the professor, what happens in optical mixing?',
        options: [
          "The viewer's eye blends separate dots of color.",
          'The artist mixes the paints before applying them.',
          'Sunlight gradually changes the colors of a painting.',
          'Two layers of paint combine with each other as they dry.',
        ],
        answer: [0],
        explanation:
          '"From a distance, the viewer\'s eye blends these dots. This is called optical mixing." Seurat precisamente evitaba mezclar en la paleta ("rather than mixing paints on his palette").',
      },
      {
        id: 'f16-ls-at-seurat-pointillism-q3',
        kind: 'single',
        skill: 'function',
        prompt: 'Why does the professor mention a patch of green grass?',
        options: [
          'To show that Seurat avoided using green paint',
          'To describe the park where Seurat liked to paint',
          'To illustrate how Seurat built colors from dots',
          'To explain why the painting took two years',
        ],
        answer: [2],
        explanation:
          'El césped verde "might contain dots of yellow and blue, plus touches of orange": es un ejemplo de cómo construía un color a partir de puntos de colores puros. No describe el parque ni la duración del trabajo.',
      },
      {
        id: 'f16-ls-at-seurat-pointillism-q4',
        kind: 'single',
        skill: 'detail',
        prompt: 'What does the professor say about the figures in La Grande Jatte?',
        options: [
          'They were painted quickly from life in the park.',
          'They look still and carefully arranged.',
          'They were copied from an ancient carving.',
          'They are smaller than in Impressionist works.',
        ],
        answer: [1],
        explanation:
          'Dice que "Seurat\'s figures are stiff and carefully arranged, almost like figures in an ancient stone carving". La comparación con la talla antigua es solo un símil: no las copió de ninguna escultura.',
      },
    ],
  },
  {
    id: 'f16-ls-at-dust-bowl',
    form: 16,
    section: 'listening',
    task: 'academic-talk',
    title: 'What Caused the Dust Bowl',
    topic: 'history',
    difficulty: 'hard',
    context: 'Listen to part of a lecture in a history class.',
    script: [
      { speaker: 'Professor', voice: 'male', text: "Today we're looking at one of the worst environmental disasters in American history: the Dust Bowl of the 1930s. It hit the southern Great Plains, meaning parts of Kansas, Oklahoma, Texas, Colorado, and New Mexico. Drought was the trigger, but the story really starts decades earlier, with the way the land was farmed." },
      { speaker: 'Professor', voice: 'male', text: 'Originally, the Plains were covered with native grasses. Their deep roots formed a thick mat that held the soil in place and trapped moisture, even in dry years. In the late 1800s and early 1900s, settlers began plowing up that grassland to grow wheat. During World War One, wheat prices were high, and new gasoline tractors made it possible to plow millions of acres quickly. In the 1920s, when the rains were good, this looked like a great success.' },
      { speaker: 'Professor', voice: 'male', text: 'Then, in the early thirties, a severe drought set in, and it lasted for most of the decade. Crops failed, and with the grass gone, nothing held the dry topsoil. Strong winds lifted it into enormous clouds that people called black blizzards. The worst one, on April fourteenth, 1935, became known as Black Sunday. Some storms even carried dust all the way to cities on the East Coast.' },
      { speaker: 'Student', voice: 'female', text: 'So was it mainly a natural disaster, or did people cause it?' },
      { speaker: 'Professor', voice: 'male', text: 'Good question. Most historians would say it was both. Droughts had struck the Plains before without producing anything like this. What was different was that so much of the protective grass had been removed. Around two and a half million people left the Plains states during the decade, many of them heading west to California.' },
      { speaker: 'Professor', voice: 'male', text: "The federal government responded by creating the Soil Conservation Service in 1935. It paid farmers to adopt practices like crop rotation and contour plowing, which follows the natural shape of the land so that rainwater doesn't run straight downhill. Farmers also left crop stubble in their fields after harvest, and millions of trees were planted in long rows called shelterbelts to slow the wind. Many of these practices are still standard today." },
    ],
    questions: [
      {
        id: 'f16-ls-at-dust-bowl-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'What is the lecture mainly about?',
        options: [
          'How tractors changed farming in the early 1900s',
          'Why many families moved from the Plains to California',
          'The causes of the Dust Bowl and the response to it',
          'The rise of wheat prices during World War One',
        ],
        answer: [2],
        explanation:
          'El profesor explica por qué se produjo el Dust Bowl (arado de las praderas + sequía) y cómo respondió el gobierno con el "Soil Conservation Service". Los tractores, los precios del trigo y la emigración son detalles dentro de esa explicación.',
      },
      {
        id: 'f16-ls-at-dust-bowl-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'According to the professor, what role did the native grasses play?',
        options: [
          'They fed the settlers\' cattle during droughts.',
          'They held the soil in place and trapped moisture.',
          'They blocked the strong winds that caused storms.',
          'They were planted in rows to protect the crops.',
        ],
        answer: [1],
        explanation:
          'Sus raíces "formed a thick mat that held the soil in place and trapped moisture". Las hileras de árboles contra el viento son los "shelterbelts", que se plantaron después, no las hierbas nativas.',
      },
      {
        id: 'f16-ls-at-dust-bowl-q3',
        kind: 'single',
        skill: 'function',
        prompt: 'Why does the professor say that droughts had struck the Plains before?',
        options: [
          'To show that the drought of the 1930s was fairly short',
          'To explain why farmers ignored warnings about the soil',
          'To suggest that the disaster could not have been predicted',
          'To support the view that human activity played a role',
        ],
        answer: [3],
        explanation:
          'Responde a la pregunta de la estudiante: las sequías anteriores no causaron algo así, y "What was different was that so much of the protective grass had been removed". Es decir, la acción humana contribuyó. Además, la sequía "lasted for most of the decade", no fue corta.',
      },
      {
        id: 'f16-ls-at-dust-bowl-q4',
        kind: 'single',
        skill: 'inference',
        prompt: 'What can be inferred about contour plowing?',
        options: [
          'It helps keep water from washing soil away.',
          'It was given up soon after the drought ended.',
          'It requires farmers to plant trees beside fields.',
          'It was one of the main causes of the dust storms.',
        ],
        answer: [0],
        explanation:
          'El arado en curvas de nivel sigue la forma del terreno "so that rainwater doesn\'t run straight downhill", lo que reduce la pérdida de suelo por el agua. No se abandonó: "Many of these practices are still standard today".',
      },
    ],
  },
];
