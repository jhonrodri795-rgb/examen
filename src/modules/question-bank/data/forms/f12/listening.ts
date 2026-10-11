import type { Difficulty, ListeningSet, Topic, Voice } from '../../../types';

/** Simulación n.º 12 — Listening (contenido original). */

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
    form: 12,
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
  cr('f12-ls-cr-safety-goggles', 'easy', 'female', 'Did you remember to bring the safety goggles today?', [
    'I remember the lab was really fun.',
    "Yes, they're in my backpack.",
    'Safety rules are important.',
    'I brought them tomorrow.',
  ], 1, 'Es una pregunta de sí/no; "Yes, they\'re in my backpack" responde y dice dónde están. "I remember…" solo repite "remember", y "brought them tomorrow" mezcla pasado con futuro.'),
  cr('f12-ls-cr-cook-together', 'easy', 'male', 'Do you want to cook dinner together tonight?', [
    'I cooked it for an hour.',
    'Dinner is usually served at seven.',
    'Yes, they cooked together.',
    "Sure, I'll buy some vegetables.",
  ], 3, 'Es una invitación; la respuesta natural la acepta y aporta algo ("I\'ll buy some vegetables"). Las demás repiten "cook" o "dinner" sin aceptar ni rechazar la propuesta.', 'daily-life'),
  cr('f12-ls-cr-take-stairs', 'easy', 'female', "Let's take the stairs. The elevator is so slow.", [
    "Good idea. It's only two floors.",
    'The elevator was built last year.',
    'I took the stairs last week.',
    'The stairs are made of stone.',
  ], 0, 'Es una sugerencia; "Good idea" la acepta y añade una razón ("It\'s only two floors"). "I took the stairs last week" habla del pasado y no responde a la propuesta.'),
  cr('f12-ls-cr-missed-call', 'easy', 'male', 'Sorry I missed your call last night.', [
    "I'll miss you too.",
    'My phone is a new model.',
    'No worries. It was about Friday.',
    'I missed the bus again last night.',
  ], 2, 'Ante una disculpa se responde quitándole importancia: "No worries", y se explica el motivo de la llamada. "I\'ll miss you too" y "I missed the bus" son trampas de sonido con "miss".', 'daily-life'),
  cr('f12-ls-cr-novel-opinion', 'easy', 'female', 'What did you think of the novel we read for literature class?', [
    'I liked it, especially the ending.',
    'I thought it was due on Tuesday.',
    'It has about three hundred pages.',
    'I will think about the class later.',
  ], 0, 'Se pide una opinión; "I liked it, especially the ending" la da. "It has about three hundred pages" es un dato, no una opinión, y "I thought it was due…" malinterpreta "think".'),
  cr('f12-ls-cr-lecture-canceled', 'easy', 'male', "Did you hear? Tomorrow's morning lecture has been canceled.", [
    'I heard the music this morning.',
    'The lecture hall is very large.',
    "Yes, I'll cancel it tomorrow.",
    'Really? Then I can sleep in.',
  ], 3, 'Es una noticia; la reacción natural muestra sorpresa y una consecuencia: "Really? Then I can sleep in". "I\'ll cancel it tomorrow" cambia el sujeto de la acción: la clase ya está cancelada. "I heard the music" es una trampa con "hear".'),

  // ---------- Listen and Choose a Response: medium ----------
  cr('f12-ls-cr-repeat-trial', 'medium', 'female', 'Maybe we should repeat the trial to double-check these readings.', [
    'The readings were all in the textbook.',
    'I double-checked my reading glasses.',
    'Good idea. The second one looked off.',
    'We repeated it after we finish.',
  ], 2, 'Es una sugerencia; "Good idea" la acepta y da un motivo ("The second one looked off"). "Reading glasses" juega con el sonido de "readings", y "repeated… after we finish" mezcla tiempos verbales.'),
  cr('f12-ls-cr-grams-milligrams', 'medium', 'male', 'Should I record the mass in grams or milligrams?', [
    'Yes, you should record it.',
    'Use grams. The lab sheet asks for that.',
    'The scale is right next to the sink.',
    'I recorded a song with my band last weekend.',
  ], 1, 'Es una pregunta alternativa (A o B), así que no se responde con "Yes". La respuesta elige una opción y la justifica: "Use grams. The lab sheet asks for that". "Recorded a song" es una trampa con "record".'),
  cr('f12-ls-cr-new-sofa', 'medium', 'female', 'Honestly, I think we should just buy a new sofa instead of repairing the old one.', [
    'I usually sit on the left side of it.',
    'They repair shoes downtown.',
    'It was delivered on a Tuesday.',
    'Maybe, but a new one costs more.',
  ], 3, 'Se expresa una opinión; la respuesta natural reacciona a ella con un matiz: "Maybe, but a new one costs more". Las demás mencionan "sit", "repair" o la entrega del sofá sin opinar sobre la propuesta.', 'daily-life'),
  cr('f12-ls-cr-track-deadlines', 'medium', 'male', 'How do you keep track of all your deadlines?', [
    'I put them all in a calendar app.',
    'The deadline is next Friday at noon.',
    'I ran on the track this morning.',
    'I kept them all last semester.',
  ], 0, 'Pide un consejo sobre el método; "I put them all in a calendar app" explica cómo lo hace. "The deadline is next Friday" responde a otra pregunta (cuándo), y "ran on the track" es una trampa de sonido.'),
  cr('f12-ls-cr-passport-reminder', 'medium', 'female', "Don't forget to bring your passport for the conference trip.", [
    'I forgot the name of the speaker.',
    "Thanks. I'll pack it tonight.",
    'The trip was really interesting.',
    'Yes, I brought it to the last one.',
  ], 1, 'Ante un recordatorio se agradece y se confirma: "Thanks. I\'ll pack it tonight". "The trip was really interesting" está en pasado, pero el viaje aún no se ha hecho.'),
  cr('f12-ls-cr-report-percent', 'medium', 'male', "The lab report counts for twenty percent, doesn't it?", [
    'Yes, I counted twenty people.',
    "No, it doesn't report anything.",
    "Actually, I think it's thirty.",
    'The lab is on the twentieth floor.',
  ], 2, 'La "tag question" pide confirmar un dato; "Actually, I think it\'s thirty" lo corrige de forma natural. Las demás repiten "count", "report" o "twenty" sin responder sobre el porcentaje.'),

  // ---------- Listen and Choose a Response: hard ----------
  cr('f12-ls-cr-wrong-building', 'hard', 'female', "Hmm, you might want to double-check the room number. Isn't that one in the science building?", [
    'The room is on the second floor.',
    "Sure, I'll check out a book there.",
    'Science is my favorite subject too.',
    "Oh, you're right. I mixed them up.",
  ], 3, '"You might want to double-check" es una forma cortés de decir que te has equivocado de edificio. La respuesta adecuada reconoce el error: "Oh, you\'re right. I mixed them up". "Check out a book" es una trampa con "check".'),
  cr('f12-ls-cr-final-project', 'hard', 'male', "I'm curious whether anyone has started the final project yet.", [
    "I've only done a bit of research.",
    'The final exam starts at nine.',
    "Yes, you're a very curious person.",
    'The project room is open all night.',
  ], 0, '"I\'m curious whether…" es una pregunta indirecta: quiere saber si alguien ha empezado. "I\'ve only done a bit of research" responde. "You\'re a very curious person" toma la frase literalmente.'),
  cr('f12-ls-cr-think-cost', 'hard', 'female', 'That might work, but have you thought about the cost?', [
    'Yes, it worked the last time.',
    'I thought about it at lunch.',
    "True. I'll find a cheaper one.",
    'The cost was paid by the store.',
  ], 2, 'Es una objeción suavizada: el problema es el precio. "True. I\'ll find a cheaper one" la acepta y propone una solución. "I thought about it at lunch" interpreta la pregunta literalmente.'),
  cr('f12-ls-cr-photography-class', 'hard', 'male', "I wish I'd signed up for that photography class with you.", [
    'Yes, I signed it yesterday.',
    "It's offered again next term.",
    'The photos were taken with my phone.',
    'I wish you a happy birthday too.',
  ], 1, 'Expresa arrepentimiento; la respuesta empática ofrece una solución: "It\'s offered again next term" (aún puede apuntarse). "I wish you a happy birthday" es una trampa con "wish".'),
  cr('f12-ls-cr-soup-pot', 'hard', 'female', "I'm making a huge pot of soup tonight. There'll be plenty.", [
    "I'd love some, if you don't mind.",
    'Plenty of people like soup in winter.',
    'I made a pot of coffee this morning.',
    'How long have you been a cook?',
  ], 0, '"There\'ll be plenty" es una invitación implícita a compartir la sopa. "I\'d love some, if you don\'t mind" la acepta con cortesía. Las demás repiten "plenty" o "pot" sin captar la invitación.', 'daily-life'),
  cr('f12-ls-cr-registration-fee', 'hard', 'male', 'Conference registration goes up after Friday, you know.', [
    'It went up the stairs on Friday.',
    'The conference was really useful.',
    'Prices usually rise in the summer.',
    "Then I'd better sign up today.",
  ], 3, 'La frase sugiere de forma implícita que te inscribas ya, antes de que suba el precio. "Then I\'d better sign up today" capta esa intención. "The conference was really useful" está en pasado y no tiene sentido aquí.'),

  // ---------- Conversations ----------
  {
    id: 'f12-ls-cv-poster-printing',
    form: 12,
    section: 'listening',
    task: 'conversation',
    title: 'Printing a Symposium Poster',
    topic: 'campus-life',
    difficulty: 'easy',
    context: 'Listen to a conversation between a student and an employee at the campus print center.',
    script: [
      { speaker: 'Student', voice: 'female', text: 'Hi. I need to print a research poster for the undergraduate symposium next Thursday. Is this the right place?' },
      { speaker: 'Employee', voice: 'male', text: 'It is. We print posters up to forty-two inches wide. Do you have the file with you?' },
      { speaker: 'Student', voice: 'female', text: "Yes, it's on my flash drive. It's a PowerPoint file." },
      { speaker: 'Employee', voice: 'male', text: "Okay, we'll need it as a PDF. PowerPoint files sometimes shift the fonts and images when we open them on our machines. You can convert it on one of our computers before you leave." },
      { speaker: 'Student', voice: 'female', text: 'Sure, I can do that. What kind of paper do you have?' },
      { speaker: 'Employee', voice: 'male', text: "There are two options. Matte paper is twenty-five dollars, and it doesn't reflect light, so it's easy to read under bright lamps. Glossy is thirty dollars. It makes photos look sharper, but it shows glare." },
      { speaker: 'Student', voice: 'female', text: "My poster is mostly charts and text. And the symposium is in the student center ballroom, which is really bright." },
      { speaker: 'Employee', voice: 'male', text: "Then I'd go with matte. As for timing, posters take two business days, so if you submit it today, it'll be ready Wednesday afternoon." },
      { speaker: 'Student', voice: 'female', text: "That's cutting it close, but it works. Can I pay with my student account?" },
      { speaker: 'Employee', voice: 'male', text: "Yes, you can. And we'll send you an email when it's ready for pickup." },
    ],
    questions: [
      {
        id: 'f12-ls-cv-poster-printing-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'Why does the student go to the print center?',
        options: [
          'To learn how to design a poster in PowerPoint',
          'To pick up a poster she ordered last week',
          'To arrange the printing of a symposium poster',
          'To ask about a job at the student center',
        ],
        answer: [2],
        explanation:
          'La estudiante dice: "I need to print a research poster for the undergraduate symposium". No va a recoger un póster ya encargado: se lo darán "Wednesday afternoon".',
      },
      {
        id: 'f12-ls-cv-poster-printing-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'Why does the employee ask for a PDF file?',
        options: [
          'Other formats may shift fonts and images.',
          'PDF files print faster on very large paper.',
          'The symposium requires all posters as PDFs.',
          'PowerPoint files cost more money to print.',
        ],
        answer: [0],
        explanation:
          'El empleado explica: "PowerPoint files sometimes shift the fonts and images when we open them on our machines". No dice nada sobre velocidad, precio ni requisitos del simposio.',
      },
      {
        id: 'f12-ls-cv-poster-printing-q3',
        kind: 'single',
        skill: 'inference',
        prompt: 'What will the student probably do?',
        options: [
          'Choose glossy paper so that her photos look sharper',
          'Pay extra so that the poster is ready the next day',
          'Bring a different poster file on Wednesday',
          'Use matte paper because the room is bright',
        ],
        answer: [3],
        explanation:
          'La sala es "really bright" y el póster es "mostly charts and text"; el empleado recomienda "Then I\'d go with matte", porque el papel mate "doesn\'t reflect light". El papel brillante "shows glare".',
      },
    ],
  },
  {
    id: 'f12-ls-cv-discussion-section',
    form: 12,
    section: 'listening',
    task: 'conversation',
    title: 'Rethinking a Discussion Section',
    topic: 'campus-life',
    difficulty: 'medium',
    context: 'Listen to a conversation between a student and a tutor at the writing center.',
    script: [
      { speaker: 'Tutor', voice: 'female', text: 'So, you mentioned that your lab report draft got some comments from your TA. What did she say?' },
      { speaker: 'Student', voice: 'male', text: "She wrote that my discussion section just restates the results. Honestly, I'm not sure what else I'm supposed to put there." },
      { speaker: 'Tutor', voice: 'female', text: "That's a really common issue. Let's see... yes, here you list the reaction rates again for each temperature. Those numbers already appear in your results section and in your table." },
      { speaker: 'Student', voice: 'male', text: 'Right. I thought the discussion was where you summarize what happened.' },
      { speaker: 'Tutor', voice: 'female', text: 'Not quite. The results section says what you found; the discussion explains what it means. A good way to organize it is to state your main finding in a sentence or two, and then interpret it.' },
      { speaker: 'Student', voice: 'male', text: 'Interpret it how?' },
      { speaker: 'Tutor', voice: 'female', text: 'Well, you found that the reaction rate roughly doubled with every ten-degree increase. Why might that be? And how does it compare with what your textbook predicts?' },
      { speaker: 'Student', voice: 'male', text: 'Oh, I see. The textbook actually mentions that rule, so I could connect my data to it.' },
      { speaker: 'Tutor', voice: 'female', text: "Exactly. After that, discuss anything unexpected. You had one trial at forty degrees that didn't fit the pattern, right?" },
      { speaker: 'Student', voice: 'male', text: "Yeah. I think the water bath wasn't stable. The temperature kept dropping." },
      { speaker: 'Tutor', voice: 'female', text: "That's exactly the kind of thing to explain: possible sources of error and how you'd improve the procedure next time. Then finish with a sentence or two about what the experiment shows overall." },
      { speaker: 'Student', voice: 'male', text: "Okay. Main finding, interpretation, unexpected results, and a conclusion. That's a lot more useful than repeating my table." },
    ],
    questions: [
      {
        id: 'f12-ls-cv-discussion-section-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'What is the main purpose of the conversation?',
        options: [
          "To correct errors in the student's data table",
          'To help the student rethink a section of his report',
          'To explain how to measure reaction rates accurately',
          "To discuss the TA's grading policy for lab reports",
        ],
        answer: [1],
        explanation:
          'La TA comentó que la discusión "just restates the results", y la tutora le ayuda a reorganizarla: hallazgo principal, interpretación, resultados inesperados y conclusión. La tabla no tiene errores; solo no debe repetirse.',
      },
      {
        id: 'f12-ls-cv-discussion-section-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'According to the tutor, how should the student begin his discussion section?',
        options: [
          'By listing the reaction rate for each temperature',
          'By describing the problems with the water bath',
          "By comparing his results with his classmates' results",
          'By stating his main finding in a sentence or two',
        ],
        answer: [3],
        explanation:
          'La tutora aconseja "state your main finding in a sentence or two, and then interpret it". Volver a enumerar los datos de cada temperatura es justo lo que la TA criticó.',
      },
      {
        id: 'f12-ls-cv-discussion-section-q3',
        kind: 'single',
        skill: 'function',
        prompt: 'Why does the tutor mention the trial at forty degrees?',
        options: [
          'To show an unexpected result he should explain',
          'To suggest that he remove that trial from his report',
          'To point out that his textbook predicted that result',
          'To show that the water bath was working correctly',
        ],
        answer: [0],
        explanation:
          'Tras decir "discuss anything unexpected", la tutora menciona la prueba a cuarenta grados "that didn\'t fit the pattern" como ejemplo de lo que debe explicar ("possible sources of error"). No le pide eliminarla.',
      },
    ],
  },
  {
    id: 'f12-ls-cv-welsh-fieldwork',
    form: 12,
    section: 'listening',
    task: 'conversation',
    title: 'Planning a Welsh Recording Session',
    topic: 'linguistics',
    difficulty: 'hard',
    context: 'Listen to a conversation between a student and her linguistics professor.',
    script: [
      { speaker: 'Student', voice: 'female', text: "Professor Hughes, thanks for meeting with me. I've finally scheduled my first recording session with Mrs. Davies, the heritage speaker of Welsh I told you about. It's next Saturday, at her house." },
      { speaker: 'Professor', voice: 'male', text: "That's great news. Let's go through your plan. First, equipment. What were you going to record with?" },
      { speaker: 'Student', voice: 'female', text: 'My phone. It is fairly new, and the sound seems clear to me.' },
      { speaker: 'Professor', voice: 'male', text: "Phones are convenient, but they compress the audio, and that can blur exactly the details we care about, like vowel length. Borrow the department's recorder and a clip-on microphone, and save uncompressed files. Also, pick the quietest room. Kitchens are the worst, because refrigerators hum constantly." },
      { speaker: 'Student', voice: 'female', text: "Okay, I'll ask if we can use her living room. For the elicitation, I prepared a list of English words for her to translate." },
      { speaker: 'Professor', voice: 'male', text: "Word lists have their place, but be careful. Heritage speakers usually learned the language at home, not in school, so translating isolated words on demand can feel like a test. Some people freeze up, or they give you a formal word they'd never actually use." },
      { speaker: 'Student', voice: 'female', text: 'So what would you suggest instead?' },
      { speaker: 'Professor', voice: 'male', text: "Start with something conversational. Ask her to describe a picture, or to tell you about a family holiday from her childhood. You'll get more natural speech, and you can come back to specific words later in the session." },
      { speaker: 'Student', voice: 'female', text: 'That makes sense. And for consent, I have the form the ethics board approved.' },
      { speaker: 'Professor', voice: 'male', text: 'Good. Go over it with her before you turn on the recorder, not after. Make sure she understands she can stop at any time, and ask specifically whether the recordings may be archived for other researchers or used only for your project.' },
      { speaker: 'Student', voice: 'female', text: "I hadn't thought about the archive question. I'll just add a separate checkbox to the form." },
      { speaker: 'Professor', voice: 'male', text: 'Well, since the form has already been approved, check with the ethics office before you change it. They may only need a quick amendment.' },
    ],
    questions: [
      {
        id: 'f12-ls-cv-welsh-fieldwork-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'What are the speakers mainly discussing?',
        options: [
          'How to find a heritage speaker willing to be recorded',
          'Why Welsh vowels are difficult for English speakers',
          'How the student should prepare for the session',
          'What the ethics board requires in a final report',
        ],
        answer: [2],
        explanation:
          'La sesión ya está programada ("I\'ve finally scheduled my first recording session"); hablan del equipo, el método de elicitación y el consentimiento. Encontrar a la hablante ya no es un problema.',
      },
      {
        id: 'f12-ls-cv-welsh-fieldwork-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'Why does the professor advise the student not to use her phone?',
        options: [
          'Phones cannot record for longer than an hour.',
          'Phones compress audio and lose fine detail.',
          'Phones pick up the hum of kitchen appliances.',
          'Phones are not permitted by the ethics board.',
        ],
        answer: [1],
        explanation:
          'El profesor dice: "they compress the audio, and that can blur exactly the details we care about, like vowel length". El zumbido de los frigoríficos se menciona para elegir la habitación, no por el teléfono.',
      },
      {
        id: 'f12-ls-cv-welsh-fieldwork-q3',
        kind: 'single',
        skill: 'attitude',
        prompt: "What is the professor's opinion of starting the session with the word list?",
        options: [
          'It is fine if the words are translated into Welsh first.',
          'It is the most efficient way to collect many words.',
          'It may make the speaker feel uncomfortable or tested.',
          'It is useless because the list has too many formal words.',
        ],
        answer: [2],
        explanation:
          'Según el profesor, traducir palabras sueltas "can feel like a test. Some people freeze up", por eso recomienda empezar con algo "conversational". Lo de "a formal word" se refiere a las respuestas de la hablante, no a la lista.',
      },
    ],
  },

  // ---------- Announcements ----------
  {
    id: 'f12-ls-an-flu-clinics',
    form: 12,
    section: 'listening',
    task: 'announcement',
    title: 'Free Flu-Shot Clinics',
    topic: 'campus-life',
    difficulty: 'easy',
    context: 'Listen to an announcement on a university campus.',
    script: [
      {
        speaker: 'Announcer',
        voice: 'female',
        text: "Good morning, everyone. This is an announcement from the Student Health Center. Next week, we're holding free flu-shot clinics for all students. The clinics will run Monday through Thursday, from ten a.m. to four p.m., in the lobby of the recreation center, not at the health center itself. You don't need an appointment. Walk-ins are welcome, but please bring your student ID, because we can't vaccinate anyone without it. The whole visit usually takes about fifteen minutes, including a short wait afterward to make sure you feel fine. If you have a fever on the day you planned to come, please wait and come to a later clinic. Protect yourself and your classmates before flu season really starts!",
      },
    ],
    questions: [
      {
        id: 'f12-ls-an-flu-clinics-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'What is the announcement mainly about?',
        options: [
          'A new location for the student health center',
          'Free vaccination sessions offered next week',
          'How to make an appointment with a doctor',
          'Flu symptoms that students should watch for',
        ],
        answer: [1],
        explanation:
          'El anuncio informa de "free flu-shot clinics for all students" la semana próxima. El centro de salud no cambia de lugar: solo las campañas se hacen "in the lobby of the recreation center".',
      },
      {
        id: 'f12-ls-an-flu-clinics-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'What must students bring to get a flu shot?',
        options: [
          'A completed appointment form',
          'A record of their earlier vaccinations',
          'Their student identification card',
          'A small payment for the vaccine',
        ],
        answer: [2],
        explanation:
          '"Please bring your student ID, because we can\'t vaccinate anyone without it." No hace falta cita ("You don\'t need an appointment") y la vacuna es gratuita ("free").',
      },
      {
        id: 'f12-ls-an-flu-clinics-q3',
        kind: 'single',
        skill: 'inference',
        prompt: 'What is implied about a student who has a fever on Monday?',
        options: [
          'The student should come to a clinic on a later day.',
          'The student should go straight to the health center.',
          'The student will be vaccinated before other students.',
          'The student must call to make a new appointment.',
        ],
        answer: [0],
        explanation:
          'El anuncio dice: "If you have a fever on the day you planned to come, please wait and come to a later clinic". Como hay sesiones hasta el jueves, puede volver otro día; no se necesitan citas.',
      },
    ],
  },
  {
    id: 'f12-ls-an-research-posters',
    form: 12,
    section: 'listening',
    task: 'announcement',
    title: 'Call for Symposium Posters',
    topic: 'campus-life',
    difficulty: 'medium',
    context: 'Listen to an announcement from a university research office.',
    script: [
      {
        speaker: 'Announcer',
        voice: 'male',
        text: "Attention, undergraduate researchers. The Office of Undergraduate Research is now accepting poster proposals for this year's Spring Research Symposium, which will take place on April eighteenth in the student center. To apply, submit an abstract of no more than two hundred fifty words through the research office website by Friday, March seventh, at five p.m. Late submissions won't be considered.",
      },
      {
        speaker: 'Announcer',
        voice: 'male',
        text: 'When you apply, choose one of four categories: natural sciences, social sciences, engineering and technology, or arts and humanities. If your project crosses two fields, pick the category that best matches your methods. Every abstract also needs a short note of approval from your faculty mentor. Accepted presenters will be notified by March twenty-first, and we will hold a poster-design workshop the following week.',
      },
    ],
    questions: [
      {
        id: 'f12-ls-an-research-posters-q1',
        kind: 'single',
        skill: 'purpose',
        prompt: 'What is the main purpose of the announcement?',
        options: [
          'To invite students to a poster-design workshop',
          "To announce the winners of last year's awards",
          'To explain how mentors should review abstracts',
          'To invite poster proposals for a symposium',
        ],
        answer: [3],
        explanation:
          'La oficina "is now accepting poster proposals" para el simposio y explica plazo, extensión y categorías. El taller de diseño solo se menciona al final, para los aceptados.',
      },
      {
        id: 'f12-ls-an-research-posters-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'What is the maximum length of the abstract?',
        options: ['One hundred fifty words', 'Two hundred fifty words', 'Three hundred fifty words', 'Two hundred words'],
        answer: [1],
        explanation: 'El resumen debe tener "no more than two hundred fifty words", es decir, 250 palabras como máximo.',
      },
      {
        id: 'f12-ls-an-research-posters-q3',
        kind: 'single',
        skill: 'inference',
        prompt: 'What is implied about an abstract submitted on March eighth?',
        options: [
          'It will be reviewed after the others.',
          'It must be shortened to be accepted.',
          'It will not be considered at all.',
          "It needs a second mentor's approval.",
        ],
        answer: [2],
        explanation:
          'El plazo termina el "Friday, March seventh, at five p.m." y "Late submissions won\'t be considered". Un resumen enviado el 8 de marzo llega tarde, así que no se evaluará.',
      },
    ],
  },
  {
    id: 'f12-ls-an-telescope-time',
    form: 12,
    section: 'listening',
    task: 'announcement',
    title: 'Telescope Time and Cloudy Nights',
    topic: 'astronomy',
    difficulty: 'hard',
    context: 'Listen to the director of the campus observatory speaking to a group of students.',
    script: [
      {
        speaker: 'Professor',
        voice: 'male',
        text: "Good afternoon. I want to explain how telescope time will be assigned this semester. Because demand has grown, we're replacing the old first-come, first-served sign-up sheet with a proposal system. Each student or team should submit a one-page proposal describing what you want to observe, why it matters for your course or project, and how many hours you need. A faculty committee will rank the proposals, and we'll publish the schedule two weeks after the deadline.",
      },
      {
        speaker: 'Professor',
        voice: 'male',
        text: "Now, about the weather. If clouds cancel your session, you don't simply lose it. You'll go on a standby list, and when a slot opens, say, because another group cancels, we'll offer it to standby students in order of their original ranking. However, we can't guarantee replacement time, so include a backup target in your proposal, something bright enough to observe through thin clouds.",
      },
    ],
    questions: [
      {
        id: 'f12-ls-an-telescope-time-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'What is the talk mainly about?',
        options: [
          'A new system for assigning observatory time',
          'The results of a recent student observation',
          "How to operate the observatory's telescope",
          'Why the observatory will close this semester',
        ],
        answer: [0],
        explanation:
          'El director explica "how telescope time will be assigned this semester": el nuevo sistema de propuestas y qué pasa con las sesiones perdidas por las nubes. No habla de cómo usar el telescopio.',
      },
      {
        id: 'f12-ls-an-telescope-time-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'What happens when a session is canceled because of clouds?',
        options: [
          'It moves automatically to the next clear night.',
          'It goes to the team with the next proposal.',
          'It is canceled, and the student must reapply.',
          'The student is placed on a list for openings.',
        ],
        answer: [3],
        explanation:
          '"You\'ll go on a standby list", y los huecos libres se ofrecen "in order of their original ranking". No se traslada automáticamente a otra noche ni hay que presentar otra propuesta.',
      },
      {
        id: 'f12-ls-an-telescope-time-q3',
        kind: 'single',
        skill: 'inference',
        prompt: 'What does the director imply about students on the standby list?',
        options: [
          'They will be ranked again by the committee.',
          'They may never get a replacement session.',
          'They must write a new one-page proposal.',
          'They will have priority over all others.',
        ],
        answer: [1],
        explanation:
          'El director advierte que "we can\'t guarantee replacement time" y por eso recomienda un objetivo de reserva ("a backup target"). Se mantiene el orden de la clasificación original; no se vuelve a clasificar a nadie.',
      },
    ],
  },

  // ---------- Academic Talks ----------
  {
    id: 'f12-ls-at-roman-aqueducts',
    form: 12,
    section: 'listening',
    task: 'academic-talk',
    title: 'Aqueducts on a Gentle Slope',
    topic: 'engineering',
    difficulty: 'easy',
    context: 'Listen to part of a lecture in an engineering class.',
    script: [
      { speaker: 'Professor', voice: 'male', text: "Today we're looking at one of the great engineering achievements of the ancient world: the Roman aqueduct. When people picture an aqueduct, they usually imagine a long row of tall stone arches. But actually, most of an aqueduct's length was underground or at ground level. The arches are just the most visible part." },
      { speaker: 'Professor', voice: 'male', text: "The key principle was gravity. The Romans had no pumps powerful enough to move large amounts of water over long distances, so the water had to flow downhill the entire way, from a spring in the hills to the city. The challenge was keeping the slope gentle and continuous. Too steep, and the fast-moving water would wear away the channel. Too flat, and the water would stop moving. The aqueduct that supplied the city of Nîmes, in what is now France, dropped only about twelve meters over roughly fifty kilometers. That's an average of about twenty-five centimeters per kilometer." },
      { speaker: 'Professor', voice: 'male', text: 'Most of the water traveled in a covered channel, usually lined with waterproof mortar. When the route reached a valley, engineers had two options. If the valley was not too deep, they built a bridge of arches to carry the channel across at the right height. The famous Pont du Gard, near Nîmes, is about fifty meters tall.' },
      { speaker: 'Professor', voice: 'male', text: 'For deeper valleys, they sometimes used an inverted siphon. Water entered sealed pipes, often made of lead, flowed down into the valley, and was pushed back up the other side by pressure. It could rise almost, but not quite, to its starting height, so the end of the siphon always had to be a little lower than the beginning.' },
      { speaker: 'Professor', voice: 'male', text: 'So the next time you see a picture of those arches, remember: they were only one solution to a much bigger problem, which was keeping water moving downhill for dozens of kilometers.' },
    ],
    questions: [
      {
        id: 'f12-ls-at-roman-aqueducts-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'What is the lecture mainly about?',
        options: [
          'Why Roman cities depended on underground springs',
          'How the Pont du Gard was built in southern France',
          'Why Roman engineers preferred lead pipes to stone',
          'How Roman aqueducts kept water flowing by gravity',
        ],
        answer: [3],
        explanation:
          'El profesor dice que "The key principle was gravity" y explica cómo mantenían una pendiente suave con canales, arcos y sifones. El Pont du Gard es solo un ejemplo.',
      },
      {
        id: 'f12-ls-at-roman-aqueducts-q2',
        kind: 'single',
        skill: 'detail',
        prompt: "According to the professor, what would happen if an aqueduct's slope were too steep?",
        options: [
          'The fast water would wear away the channel.',
          'The water would stop moving in the channel.',
          'The arches would collapse under the weight.',
          'The pipes would burst from the pressure.',
        ],
        answer: [0],
        explanation:
          '"Too steep, and the fast-moving water would wear away the channel." Que el agua se detuviera es lo que pasaría si la pendiente fuera demasiado plana ("Too flat").',
      },
      {
        id: 'f12-ls-at-roman-aqueducts-q3',
        kind: 'single',
        skill: 'organization',
        prompt: 'Why does the professor mention that the Nîmes aqueduct dropped only about twelve meters over fifty kilometers?',
        options: [
          'To show that aqueducts were also built outside Italy',
          'To explain why the arches had to be so tall',
          'To illustrate how gentle the slope had to be',
          'To compare the costs of different routes',
        ],
        answer: [2],
        explanation:
          'Justo después de decir que el reto era mantener "the slope gentle and continuous", el profesor da el dato de Nîmes ("about twenty-five centimeters per kilometer") como ejemplo de esa pendiente mínima.',
      },
      {
        id: 'f12-ls-at-roman-aqueducts-q4',
        kind: 'single',
        skill: 'inference',
        prompt: 'What can be inferred about inverted siphons?',
        options: [
          'They allowed water to reach cities higher than its source.',
          'They were used when a valley was too deep for arches.',
          'They were built from stone rather than metal pipes.',
          'They made water flow faster than open channels did.',
        ],
        answer: [1],
        explanation:
          'Los arcos se usaban "If the valley was not too deep", y los sifones "For deeper valleys"; se deduce que eran la alternativa cuando los arcos no servían. El agua no podía subir por encima de su origen ("almost, but not quite").',
      },
    ],
  },
  {
    id: 'f12-ls-at-weimar-hyperinflation',
    form: 12,
    section: 'listening',
    task: 'academic-talk',
    title: 'Hyperinflation in 1923 Germany',
    topic: 'economics',
    difficulty: 'medium',
    context: 'Listen to part of a lecture in an economics class.',
    script: [
      { speaker: 'Professor', voice: 'female', text: 'Last time, we defined inflation as a general rise in prices. Today we will look at an extreme case, hyperinflation, and its most famous example: Germany in 1923. To understand it, we need to go back a few years. After World War One, the German government owed enormous sums, both its own war debts and the reparations demanded by the victorious Allies. Rather than raise taxes sharply, the government increasingly paid its bills by printing money.' },
      { speaker: 'Professor', voice: 'female', text: "Then, in January 1923, French and Belgian troops occupied the Ruhr, Germany's main industrial region, because Germany had fallen behind on its reparation payments. The government encouraged workers there to go on strike and kept paying their wages, again with newly printed money. With fewer goods being produced and far more money in circulation, prices exploded. In 1914, one U.S. dollar had cost about four marks. By November 1923, it cost about four trillion marks." },
      { speaker: 'Student', voice: 'male', text: 'How did people actually live with prices changing that fast?' },
      { speaker: 'Professor', voice: 'female', text: 'Good question. Many workers were paid every day, sometimes twice a day, and they rushed to spend their wages before prices rose again. There are accounts of people carrying their pay home in baskets, and of families burning banknotes in their stoves because paper money was cheaper than firewood. Families with savings saw a lifetime of savings become worthless. On the other hand, people who owed money, such as landowners with mortgages, could suddenly pay off their debts with almost worthless marks.' },
      { speaker: 'Professor', voice: 'female', text: 'The crisis ended in late 1923, when a new currency, the Rentenmark, was introduced. One Rentenmark replaced one trillion old marks, and, this is the crucial part, the authorities strictly limited how many were issued. Once people believed that the supply of money was under control, prices stabilized remarkably quickly.' },
    ],
    questions: [
      {
        id: 'f12-ls-at-weimar-hyperinflation-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'What is the lecture mainly about?',
        options: [
          'The causes and effects of German hyperinflation',
          'How the Allies calculated the reparations owed',
          'Why the Ruhr became the center of German industry',
          'How modern central banks keep prices from rising',
        ],
        answer: [0],
        explanation:
          'La profesora presenta "an extreme case, hyperinflation", explica sus causas (imprimir dinero, la ocupación del Ruhr), sus efectos en la vida diaria y cómo terminó. Las reparaciones solo son parte del contexto.',
      },
      {
        id: 'f12-ls-at-weimar-hyperinflation-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'How did the German government pay the striking workers in the Ruhr?',
        options: [
          'By borrowing money from French banks',
          'By raising taxes on industrial companies',
          'By selling land owned by the government',
          'By printing money to pay their wages',
        ],
        answer: [3],
        explanation:
          'El Gobierno "kept paying their wages, again with newly printed money". Además, la profesora dice que evitó "raise taxes sharply", así que la opción de los impuestos es falsa.',
      },
      {
        id: 'f12-ls-at-weimar-hyperinflation-q3',
        kind: 'single',
        skill: 'organization',
        prompt: 'Why does the professor mention landowners with mortgages?',
        options: [
          'To show that every German lost money in the crisis',
          'To point out that some people gained from inflation',
          'To explain why banks stopped lending money in 1923',
          'To describe how the Rentenmark was first distributed',
        ],
        answer: [1],
        explanation:
          'Con "On the other hand", la profesora contrasta a quienes perdieron sus ahorros con quienes tenían deudas, que "could suddenly pay off their debts with almost worthless marks". Es decir, algunos salieron beneficiados.',
      },
      {
        id: 'f12-ls-at-weimar-hyperinflation-q4',
        kind: 'single',
        skill: 'inference',
        prompt: "What does the professor imply about the Rentenmark's success?",
        options: [
          'It succeeded mainly because it was backed by gold.',
          'It took several years before prices became stable.',
          'It depended on people trusting the money supply.',
          'It worked because Germany stopped paying reparations.',
        ],
        answer: [2],
        explanation:
          'La clave fue limitar la emisión: "Once people believed that the supply of money was under control, prices stabilized". La segunda opción contradice "remarkably quickly", y el oro no se menciona.',
      },
    ],
  },
  {
    id: 'f12-ls-at-cognitive-dissonance',
    form: 12,
    section: 'listening',
    task: 'academic-talk',
    title: 'The One-Dollar Experiment',
    topic: 'psychology',
    difficulty: 'hard',
    context: 'Listen to part of a lecture in a psychology class.',
    script: [
      { speaker: 'Professor', voice: 'male', text: 'Let us turn to cognitive dissonance, a theory proposed by the psychologist Leon Festinger in the 1950s. The basic idea is that we feel uncomfortable when we hold two ideas that conflict, or when our behavior conflicts with our beliefs. Festinger argued that this discomfort, which he called dissonance, motivates us to reduce it, often by changing one of our attitudes.' },
      { speaker: 'Professor', voice: 'male', text: 'The classic test of this idea is an experiment Festinger published with James Carlsmith in 1959. Students spent an hour on extremely dull tasks, such as turning wooden pegs on a board a quarter turn at a time, over and over. When they finished, the experimenter asked each of them for a favor: to tell the next participant, who was actually working with the researchers, that the tasks had been interesting and enjoyable. Some participants were paid one dollar for telling this lie; others were paid twenty dollars, which was a lot of money in 1959.' },
      { speaker: 'Professor', voice: 'male', text: 'Afterward, everyone was asked how much they had actually enjoyed the tasks. Now, common sense, and many learning theories of the time, would predict that the people paid twenty dollars would feel more positive, since they had been rewarded more. But the result was the opposite. The one-dollar group rated the tasks as more enjoyable than the twenty-dollar group did.' },
      { speaker: 'Professor', voice: 'male', text: "Why? Festinger and Carlsmith argued that the twenty-dollar participants had a clear external justification: 'I said it was fun because I was paid well.' No conflict there. The one-dollar participants didn't have that excuse. A single dollar wasn't enough to explain why they had misled someone, so the dissonance remained. The easiest way to reduce it was to change their belief, to decide that the task really hadn't been so bad." },
      { speaker: 'Professor', voice: 'male', text: 'This is sometimes called the insufficient justification effect, and it suggests something a little surprising: small rewards can sometimes change attitudes more than large ones.' },
    ],
    questions: [
      {
        id: 'f12-ls-at-cognitive-dissonance-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'What is the lecture mainly about?',
        options: [
          "Why boring tasks lower students' motivation to learn",
          'How researchers persuade participants to be honest',
          'A study that supports a theory of attitude change',
          'The ethical problems with paying research participants',
        ],
        answer: [2],
        explanation:
          'La clase presenta la teoría de la disonancia cognitiva y "The classic test of this idea", el experimento de 1959, que muestra cómo cambiamos nuestras actitudes. Las tareas aburridas son solo parte del diseño.',
      },
      {
        id: 'f12-ls-at-cognitive-dissonance-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'What were the participants asked to tell the next participant?',
        options: [
          'That the payment would be given at the end',
          'That the tasks had been interesting and fun',
          'That the experiment would last about an hour',
          'That the researchers were studying honesty',
        ],
        answer: [1],
        explanation:
          'Debían decir "that the tasks had been interesting and enjoyable", lo cual era mentira. La hora de duración era el tiempo que ellos mismos dedicaron a las tareas.',
      },
      {
        id: 'f12-ls-at-cognitive-dissonance-q3',
        kind: 'single',
        skill: 'organization',
        prompt: 'Why does the professor mention common sense and the learning theories of the time?',
        options: [
          'To explain how Festinger first developed his theory',
          'To argue that the experiment was poorly designed',
          'To show that the results confirmed earlier research',
          'To emphasize how unexpected the results were',
        ],
        answer: [3],
        explanation:
          'El profesor dice que esas teorías "would predict" más satisfacción con veinte dólares, "But the result was the opposite". Las menciona para subrayar lo sorprendente del resultado, no para confirmarlas.',
      },
      {
        id: 'f12-ls-at-cognitive-dissonance-q4',
        kind: 'single',
        skill: 'inference',
        prompt: 'According to the theory in the lecture, which person would most likely change an attitude?',
        options: [
          'Someone who argues for a view after a tiny reward',
          'Someone who is paid generously to praise a product',
          'Someone who defends a view they already hold',
          'Someone who refuses to do a task they find dull',
        ],
        answer: [0],
        explanation:
          'Según el "insufficient justification effect", "small rewards can sometimes change attitudes more than large ones": quien defiende algo por una recompensa mínima no tiene justificación externa y cambia su creencia. Con un pago generoso hay justificación y no hay conflicto.',
      },
    ],
  },
];
