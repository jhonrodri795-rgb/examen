import type { Difficulty, ListeningSet, Topic, Voice } from '../../../types';

/** Simulación n.º 8 — Listening (contenido original). */

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
    form: 8,
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
  cr('f08-ls-cr-stadium-bus', 'easy', 'male', "Excuse me, I'm new here. Where's the closest bus stop to the football stadium?", [
    "There's one just across from the east gate.",
    'The football game starts at seven tonight.',
    'I usually take the bus to my classes.',
    'The stadium holds forty thousand fans.',
  ], 0, 'Es una pregunta de información sobre un lugar ("Where\'s the closest bus stop…?"). Solo "There\'s one just across from the east gate" indica dónde está la parada. Las demás repiten palabras del enunciado ("football", "bus", "stadium") sin dar la ubicación.'),
  cr('f08-ls-cr-music-down', 'easy', 'female', "Could you turn your music down a little? I'm about to make a phone call.", [
    "I'll call you back later tonight.",
    "Yes, it's by my favorite band.",
    "Sure, sorry. I'll use my headphones.",
    'Your phone is on the kitchen table, I think.',
  ], 2, 'Es una petición ("Could you turn your music down…?"). La respuesta adecuada acepta y ofrece una solución: "Sure, sorry. I\'ll use my headphones". "Yes, it\'s by my favorite band" trata la petición como una pregunta sobre la música.', 'daily-life'),
  cr('f08-ls-cr-umbrella', 'easy', 'female', "It's starting to rain. Do you want to borrow my umbrella?", [
    'Yes, it rained a lot last week.',
    "That'd be great. I'll return it tomorrow.",
    "No, I didn't borrow anything from you yesterday.",
    'I bought my umbrella downtown.',
  ], 1, 'Es un ofrecimiento ("Do you want to borrow my umbrella?"). La respuesta natural lo acepta y agradece: "That\'d be great. I\'ll return it tomorrow". "No, I didn\'t borrow it from you" usa un tiempo pasado que no corresponde al ofrecimiento.', 'daily-life'),
  cr('f08-ls-cr-guest-speaker', 'easy', 'male', "So, what did you think of yesterday's guest speaker?", [
    "She's speaking again next Tuesday afternoon.",
    'I think it was in the auditorium.',
    "Yes, I'll be there tomorrow.",
    'She was really interesting, actually.',
  ], 3, 'Se pide una opinión ("what did you think of…?"). Solo "She was really interesting, actually" da una valoración. "She\'s speaking again next Tuesday" informa de una fecha, pero no dice qué te pareció la charla.'),
  cr('f08-ls-cr-slide-design', 'easy', 'female', 'Your presentation slides looked amazing. Did you design them yourself?', [
    'Thanks! I just edited a free template.',
    'No, the presentation is next Monday.',
    'Sure, I can design them for you later.',
    'I sent the slides to the professor.',
  ], 0, 'Es un cumplido seguido de una pregunta. La respuesta adecuada agradece y contesta: "Thanks! I just edited a free template". "No, the presentation is next Monday" contradice lo dicho: la presentación ya se vio ("looked amazing").'),
  cr('f08-ls-cr-open-window', 'easy', 'male', "Do you mind if I open the window? It's a bit stuffy in here.", [
    'Yes, I closed it this morning.',
    'The window faces the parking lot.',
    'Not at all. Go right ahead.',
    "I'll open my books in a minute.",
  ], 2, 'Pide permiso con "Do you mind if…?". Para dar permiso se responde en negativo: "Not at all. Go right ahead" (= no me molesta). "Yes, I closed it this morning" significaría que sí molesta y además habla de otra acción.', 'daily-life'),

  // ---------- Choose a Response: medium ----------
  cr('f08-ls-cr-problem-four', 'medium', 'female', 'I was wondering if you could explain how you solved problem four. I keep getting a different answer.', [
    'There were only four problems, I think.',
    "Sure. Let's go through it step by step.",
    "It's on page twenty-three of the book.",
    'I keep getting the same grade as well.',
  ], 1, '"I was wondering if you could explain…" es una petición indirecta y cortés. La respuesta natural acepta ayudar: "Sure. Let\'s go through it step by step". "It\'s on page twenty-three" da la ubicación del ejercicio, pero no lo explica.'),
  cr('f08-ls-cr-wifi-dropping', 'medium', 'male', "The Wi-Fi keeps dropping every evening. I can barely get any work done.", [
    'I usually do my homework in the evening too.',
    'Yes, I dropped my laptop last week.',
    'The password is on the back of the router.',
    'Maybe we should report it to the IT desk.',
  ], 3, 'Es una queja que pide implícitamente una solución. "Maybe we should report it to the IT desk" propone contactar con soporte técnico. "Yes, I dropped my laptop" es una trampa de sonido ("dropping"/"dropped") y la contraseña no resuelve las caídas de conexión.', 'daily-life'),
  cr('f08-ls-cr-intro-or-conclusion', 'medium', 'female', 'For our group presentation, would you rather do the introduction or the conclusion?', [
    "The introduction, if that's okay.",
    "Yes, I'd rather do it myself.",
    'The presentation went really well.',
    'We concluded that it was too long.',
  ], 0, 'Es una pregunta de elección ("the introduction or the conclusion?"), así que hay que escoger una opción: "The introduction, if that\'s okay". "Yes, I\'d rather do it myself" responde con sí/no, lo que no sirve para elegir entre dos cosas.'),
  cr('f08-ls-cr-scholarship-deadline', 'medium', 'male', "Isn't the scholarship deadline next Monday?", [
    'I applied for it last Monday.',
    'The scholarship covers full tuition and housing.',
    "Yes, so I'm finishing my essay this weekend.",
    "No, I don't like Mondays either.",
  ], 2, 'La pregunta negativa ("Isn\'t the deadline…?") busca confirmar un dato. "Yes, so I\'m finishing my essay this weekend" lo confirma y añade una consecuencia lógica. "No, I don\'t like Mondays either" responde a algo que no se preguntó.'),
  cr('f08-ls-cr-airport-ride', 'medium', 'female', 'I can drive you to the airport on Friday if you can leave by 6 a.m.', [
    "I've never been to that airport before.",
    'I usually drive to work at six.',
    'Yes, I left at six yesterday.',
    "Great, I'll be ready before six.",
  ], 3, 'Es un ofrecimiento con condición ("if you can leave by 6 a.m."). La respuesta adecuada acepta la condición: "Great, I\'ll be ready before six". "Yes, I left at six yesterday" usa el pasado y no responde al plan del viernes.', 'daily-life'),
  cr('f08-ls-cr-banquet-speech', 'medium', 'male', "I'm so nervous about giving the speech at the club banquet tomorrow.", [
    'The banquet food was really great last year.',
    "You'll be great. Want to practice on me?",
    'I gave my speech yesterday afternoon.',
    'Yes, the club meets every Thursday.',
  ], 1, 'El hablante expresa preocupación. La respuesta natural tranquiliza y ofrece ayuda: "You\'ll be great. Want to practice on me?". Las demás repiten palabras ("banquet", "speech", "club") sin responder a los nervios.'),

  // ---------- Choose a Response: hard ----------
  cr('f08-ls-cr-coast-trip', 'hard', 'female', 'A few of us are driving to the coast this weekend. You should come with us!', [
    'Yes, the coast was beautiful last weekend.',
    'Sure, I can drive you to work on Saturday morning.',
    'Sounds fun, but I promised to cover a shift.',
    "Thanks, I'll work on it this weekend.",
  ], 2, 'Es una invitación; la respuesta cortés la rechaza dando un motivo: "Sounds fun, but I promised to cover a shift". "Sure, I can drive you to work" malinterpreta la invitación como una petición de transporte.'),
  cr('f08-ls-cr-swamped', 'hard', 'female', "Getting together sounds great, but honestly, I'm swamped this week.", [
    "No problem. Maybe some other time, then.",
    "Great! I'll see you on Wednesday, then.",
    'Really? Is there a swamp near you?',
    "Thanks, I'm glad you're free this week.",
  ], 0, '"I\'m swamped" es una expresión idiomática que significa estar desbordado de trabajo; en la práctica rechaza el plan. La respuesta adecuada lo acepta con comprensión: "No problem. Maybe some other time, then". "Great! I\'ll see you on Wednesday" interpreta la frase como si fuera un sí.', 'daily-life'),
  cr('f08-ls-cr-freezing-window', 'hard', 'male', "Brr, it's freezing in here with that window open.", [
    "Yes, it's supposed to snow tomorrow.",
    'I opened it about an hour ago.',
    'The freezer is next to the fridge.',
    "Sorry! I'll close it right now.",
  ], 3, 'Al decir "it\'s freezing in here with that window open", el hablante pide implícitamente que se cierre la ventana. "Sorry! I\'ll close it right now" responde a esa petición. "I opened it about an hour ago" solo da un dato y no reacciona a la queja.', 'daily-life'),
  cr('f08-ls-cr-since-coffee', 'hard', 'female', 'Since when do you drink coffee?', [
    'I drink it with milk and sugar.',
    'Since finals started. I need the energy!',
    'I usually drink it in the morning before class.',
    "Yes, I'd love a cup, thanks.",
  ], 1, '"Since when do you…?" expresa sorpresa ante un hábito nuevo. La respuesta natural explica desde cuándo y por qué: "Since finals started. I need the energy!". "I usually drink it in the morning" interpreta "when" como la hora del día.', 'daily-life'),
  cr('f08-ls-cr-waiting-forever', 'hard', 'male', "There you are! I've been waiting here forever.", [
    'Forever is a very long time.',
    "I'll wait for you here, then.",
    "Sorry! My bus got stuck in traffic.",
    "I've been here many times before, too.",
  ], 2, '"I\'ve been waiting here forever" es una exageración que expresa una queja leve por un retraso. Lo adecuado es disculparse y explicar: "Sorry! My bus got stuck in traffic". "Forever is a very long time" toma la exageración al pie de la letra.', 'daily-life'),
  cr('f08-ls-cr-read-the-email', 'hard', 'female', 'It would be nice if everyone read the email before the meeting.', [
    "Sorry. I'll read it before next time.",
    'Yes, it was a really nice meeting.',
    'I sent you an email last night.',
    'The meeting room is very nice, too.',
  ], 0, 'La frase es una crítica implícita: alguien no leyó el correo. La respuesta adecuada reconoce el problema: "Sorry. I\'ll read it before next time". "Yes, it was a really nice meeting" es una trampa con la palabra "nice".'),

  // ---------- Conversations ----------
  {
    id: 'f08-ls-cv-kiln-firing',
    form: 8,
    section: 'listening',
    task: 'conversation',
    title: 'Getting Pieces Ready for the Kiln',
    topic: 'campus-life',
    difficulty: 'easy',
    context: 'Listen to a conversation between a student and a ceramics studio technician.',
    script: [
      { speaker: 'Student', voice: 'female', text: 'Hi, excuse me. Are you the studio technician? I wanted to ask when the kiln will be fired next.' },
      { speaker: 'Technician', voice: 'male', text: "Yes, that's me. The next bisque firing is this Thursday night. That's the first firing, for pieces that haven't been glazed yet." },
      { speaker: 'Student', voice: 'female', text: "Great. I have two bowls I'd like to get in. Do I just leave them somewhere?" },
      { speaker: 'Technician', voice: 'male', text: "Put them on the gray shelf by the door, the one marked 'Ready to Fire.' But they have to be there by Wednesday at five, and they have to be completely dry." },
      { speaker: 'Student', voice: 'female', text: 'Hmm. One of them still feels a little cool to the touch. I only finished trimming it yesterday.' },
      { speaker: 'Technician', voice: 'male', text: "If it feels cool, there's still water in the clay. Wet pieces can crack or even explode in the kiln, and that can ruin other people's work too. Leave it uncovered tonight and check it again tomorrow. If it isn't dry by Wednesday, it'll go into the next firing, two weeks from now." },
      { speaker: 'Student', voice: 'female', text: 'OK. And how should I label them? Last time I wrote my name on a piece of tape, but it fell off.' },
      { speaker: 'Technician', voice: 'male', text: "Yeah, tape burns off in the kiln. Scratch your initials and your class section into the bottom with a needle tool, or write them with an underglaze pencil. Don't use a regular marker. It just disappears in the heat." },
      { speaker: 'Student', voice: 'female', text: 'Initials and section number on the bottom. Got it. Thanks a lot!' },
    ],
    questions: [
      {
        id: 'f08-ls-cv-kiln-firing-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'Why does the student talk to the technician?',
        options: [
          'To report that a bowl was damaged in the kiln',
          'To find out how to get her pieces fired',
          'To ask how to trim a bowl she has started',
          'To sign up for a glazing workshop on Thursday',
        ],
        answer: [1],
        explanation:
          'La estudiante pregunta "when the kiln will be fired next" y después cómo dejar y etiquetar sus cuencos. Ningún cuenco se ha dañado todavía: el técnico solo advierte que una pieza húmeda "can crack or even explode".',
      },
      {
        id: 'f08-ls-cv-kiln-firing-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'What does the technician say about labeling pieces?',
        options: [
          'Names should be written on a piece of tape.',
          'Labels must be attached to the gray shelf.',
          'A regular marker works if the ink is dark.',
          'Initials and section go on the bottom.',
        ],
        answer: [3],
        explanation:
          'El técnico dice: "Scratch your initials and your class section into the bottom". La cinta no sirve porque "tape burns off in the kiln", y el rotulador normal "just disappears in the heat".',
      },
      {
        id: 'f08-ls-cv-kiln-firing-q3',
        kind: 'single',
        skill: 'function',
        prompt: "Why does the technician mention other people's work?",
        options: [
          'To explain why wet pieces must not be fired',
          'To suggest that she share the shelf with others',
          'To show that the kiln is usually very full',
          "To praise the quality of the student's bowls",
        ],
        answer: [0],
        explanation:
          'Lo menciona para justificar la regla de que las piezas estén secas: "Wet pieces can crack or even explode in the kiln, and that can ruin other people\'s work too". No habla de compartir la estantería ni de lo lleno que está el horno.',
      },
    ],
  },
  {
    id: 'f08-ls-cv-seminar-permission',
    form: 8,
    section: 'listening',
    task: 'conversation',
    title: 'Requesting a Seminar Permission Number',
    topic: 'campus-life',
    difficulty: 'medium',
    context: 'Listen to a conversation between a student and a professor.',
    script: [
      { speaker: 'Student', voice: 'male', text: "Hi, Professor Lindqvist? I'm Marcus. I emailed you yesterday about your seminar on urban sociology. The registration system says it's full, so I was hoping you could give me a permission number." },
      { speaker: 'Professor', voice: 'female', text: 'Hi, Marcus. Yes, I saw your email. The seminar is capped at fifteen, and right now there are fifteen students enrolled and six on the waiting list. Are you a sociology major?' },
      { speaker: 'Student', voice: 'male', text: "No, I'm in environmental studies. But I'm really interested in how cities plan green spaces, and I'm hoping to write my senior thesis on that." },
      { speaker: 'Professor', voice: 'female', text: "That's a great topic. The problem is that sociology majors get priority for four-hundred-level seminars, because they need them to graduate. Most of the people on the waiting list are majors." },
      { speaker: 'Student', voice: 'male', text: 'I understand. Is there any chance at all?' },
      { speaker: 'Professor', voice: 'female', text: "Usually a few students drop during the first week, once they see the reading load. If a spot is still open after the majors are placed, I can give it to a non-major. But first, have you taken Research Methods? It's a prerequisite, and our fieldwork depends on it." },
      { speaker: 'Student', voice: 'male', text: "I took a research methods course at a community college last summer. I'm not sure it's showing up on my record yet." },
      { speaker: 'Professor', voice: 'female', text: "Transfer credit can take a while to be processed. Send me a copy of your transcript and the course description, and I'll check whether it covers the same material. Meanwhile, come to the first two classes and do the readings, just in case." },
      { speaker: 'Student', voice: 'male', text: 'I will. Thank you so much.' },
      { speaker: 'Professor', voice: 'female', text: "You're welcome. I'll let you know by the end of the first week." },
    ],
    questions: [
      {
        id: 'f08-ls-cv-seminar-permission-q1',
        kind: 'single',
        skill: 'purpose',
        prompt: 'Why does the student go to see the professor?',
        options: [
          'To ask about topics for his senior thesis',
          'To get credit for a course he took last summer',
          'To ask for permission to join a full seminar',
          'To find out about fieldwork opportunities',
        ],
        answer: [2],
        explanation:
          'Marcus dice que el seminario está lleno ("it\'s full") y pide "a permission number". Menciona su tesis y el curso de verano solo como datos de apoyo, no como motivo de la visita.',
      },
      {
        id: 'f08-ls-cv-seminar-permission-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'Why do sociology majors get priority for the seminar?',
        options: [
          'They need such seminars in order to graduate.',
          'They have already completed the fieldwork.',
          'They registered before the waiting list opened.',
          'They are writing theses on urban green spaces.',
        ],
        answer: [0],
        explanation:
          'La profesora explica: "sociology majors get priority for four-hundred-level seminars, because they need them to graduate". El tema de los espacios verdes es el interés de Marcus, no de los estudiantes de sociología.',
      },
      {
        id: 'f08-ls-cv-seminar-permission-q3',
        kind: 'single',
        skill: 'inference',
        prompt: "What can be inferred about the student's chances of joining the seminar?",
        options: [
          'He will get in because his topic is interesting.',
          'He must first repeat the research methods course.',
          'He has no chance because the waiting list is long.',
          'They depend on dropouts and on his transfer credit.',
        ],
        answer: [3],
        explanation:
          'Podrá entrar solo si queda una plaza libre ("If a spot is still open after the majors are placed") y si su curso de verano cubre el requisito ("I\'ll check whether it covers the same material"). Aunque la profesora elogia su tema ("That\'s a great topic"), eso no le garantiza la plaza.',
      },
    ],
  },
  {
    id: 'f08-ls-cv-solar-heater',
    form: 8,
    section: 'listening',
    task: 'conversation',
    title: 'Diagnosing a Solar Water Heater',
    topic: 'engineering',
    difficulty: 'hard',
    context: 'Listen to a conversation between a student and an engineering professor.',
    script: [
      { speaker: 'Student', voice: 'female', text: "Professor Hayes, do you have a minute? I've been testing my solar water heater prototype, and the results are pretty disappointing." },
      { speaker: 'Professor', voice: 'male', text: 'Sure, Elena. What are you seeing?' },
      { speaker: 'Student', voice: 'female', text: 'On a sunny afternoon, the water in the tank only gets to about thirty-five degrees Celsius. My calculations said it should reach at least fifty.' },
      { speaker: 'Professor', voice: 'male', text: "OK. Let's think about where the energy goes. Your collector absorbs sunlight on the black plate, right? What's covering the plate?" },
      { speaker: 'Student', voice: 'female', text: 'A single sheet of ordinary window glass. I thought that would trap the heat, like a greenhouse.' },
      { speaker: 'Professor', voice: 'male', text: "It does trap some. Glass lets visible sunlight in and blocks most of the infrared that the hot plate gives off. But the glass itself gets warm and loses heat to the outside air, especially when it's windy. With only one layer, a lot of the heat you collect escapes right back through the cover. A second pane with an air gap between the two would cut that loss considerably." },
      { speaker: 'Student', voice: 'female', text: 'That makes sense. It was pretty windy during my last two tests, actually.' },
      { speaker: 'Professor', voice: 'male', text: 'There you go. Now, what about the back and sides of the collector?' },
      { speaker: 'Student', voice: 'female', text: "There's about one centimeter of foam under the plate. The sides are just the wooden frame." },
      { speaker: 'Professor', voice: 'male', text: "That's thin. Heat flows out wherever the insulation is weakest, so the bare sides are probably leaking a lot. And what about the pipes running to the tank? Are they insulated?" },
      { speaker: 'Student', voice: 'female', text: "No, they're just bare copper. I didn't think about them at all." },
      { speaker: 'Professor', voice: 'male', text: "Copper is an excellent conductor, so those pipes act like radiators. Here's what I'd do: insulate the pipes and the sides first, since that's cheap and quick, and then add the second layer of glass. But change one thing at a time and rerun your test, so you'll know how much each improvement contributes." },
    ],
    questions: [
      {
        id: 'f08-ls-cv-solar-heater-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'What are the speakers mainly discussing?',
        options: [
          'How to calculate the energy in sunlight',
          'Whether to use copper or plastic pipes',
          'How greenhouses keep plants warm during winter',
          "Why a student's prototype loses too much heat",
        ],
        answer: [3],
        explanation:
          'Elena explica que el agua solo llega a "thirty-five degrees" y el profesor analiza "where the energy goes": la cubierta de vidrio, el aislamiento y las tuberías. El invernadero solo aparece como comparación de la estudiante.',
      },
      {
        id: 'f08-ls-cv-solar-heater-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'According to the professor, how would a second pane of glass help?',
        options: [
          'It would let more infrared light reach the plate.',
          'An air gap would cut heat loss through the cover.',
          'It would protect the black plate from wind damage.',
          'It would make the collector easier to clean.',
        ],
        answer: [1],
        explanation:
          'El profesor dice que con una sola capa "a lot of the heat you collect escapes right back through the cover" y que "a second pane with an air gap between the two would cut that loss considerably". El viento aumenta la pérdida de calor, pero no daña la placa.',
      },
      {
        id: 'f08-ls-cv-solar-heater-q3',
        kind: 'single',
        skill: 'function',
        prompt: "Why does the professor say that the copper pipes 'act like radiators'?",
        options: [
          'To suggest replacing copper with a cheaper metal',
          'To explain how the water is heated in the tank',
          'To point out that they lose heat to the air',
          "To praise the student's choice of pipe material",
        ],
        answer: [2],
        explanation:
          'Tras "Copper is an excellent conductor", la comparación con radiadores indica que las tuberías sin aislar ("just bare copper") desprenden el calor del agua al aire. Por eso recomienda "insulate the pipes", no cambiar de metal.',
      },
    ],
  },

  // ---------- Announcements ----------
  {
    id: 'f08-ls-an-food-court',
    form: 8,
    section: 'listening',
    task: 'announcement',
    title: 'Food Court Closing Early',
    topic: 'campus-life',
    difficulty: 'easy',
    context: 'Listen to an announcement on a university campus.',
    script: [
      {
        speaker: 'Announcer',
        voice: 'female',
        text: "Attention, please. This is a message from the Student Union. On Friday, the food court on the first floor will close at two p.m. for a private event, the university's annual awards dinner for staff. All food court restaurants, including the coffee counter, will stop serving at two o'clock sharp, so if you usually have dinner there, you'll need to make other plans. Fortunately, there are several alternatives. Hilltop Dining Hall will be open until nine p.m., and on Friday only, students with a meal plan can bring one guest for free. The Corner Market in the library lobby will also stay open until eleven, with sandwiches and salads. The food court will reopen at its regular time on Saturday morning. Thank you for your understanding.",
      },
    ],
    questions: [
      {
        id: 'f08-ls-an-food-court-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'What is the main purpose of the announcement?',
        options: [
          'To invite students to an awards dinner',
          'To announce longer hours at the market',
          'To report an early closing of the food court',
          'To explain upcoming changes to student meal plans',
        ],
        answer: [2],
        explanation:
          'El anuncio informa de que "the food court on the first floor will close at two p.m." el viernes y ofrece alternativas. La cena de premios es un evento privado para el personal ("for staff"), no una invitación a los estudiantes.',
      },
      {
        id: 'f08-ls-an-food-court-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'What is offered at Hilltop Dining Hall on Friday?',
        options: [
          'A discount on sandwiches and salads',
          'A free guest pass for meal-plan students',
          'A special dinner for university staff members',
          'Breakfast served until eleven o\'clock',
        ],
        answer: [1],
        explanation:
          'Se dice: "on Friday only, students with a meal plan can bring one guest for free". Los sándwiches y ensaladas se venden en el Corner Market, no en Hilltop Dining Hall.',
      },
      {
        id: 'f08-ls-an-food-court-q3',
        kind: 'single',
        skill: 'inference',
        prompt: 'Where will a student who wants something to eat at 10 p.m. on Friday probably go?',
        options: [
          'To Hilltop Dining Hall',
          'To the first-floor food court',
          'To the coffee counter',
          'To the Corner Market in the library',
        ],
        answer: [3],
        explanation:
          'A las 10 p.m. el comedor Hilltop ya ha cerrado ("open until nine p.m.") y el food court cierra a las 2 p.m.; solo el Corner Market sigue abierto ("open until eleven").',
      },
    ],
  },
  {
    id: 'f08-ls-an-project-groups',
    form: 8,
    section: 'listening',
    task: 'announcement',
    title: 'Project Groups and Peer Evaluations',
    topic: 'campus-life',
    difficulty: 'medium',
    context: 'Listen to a professor making an announcement at the end of a class.',
    script: [
      {
        speaker: 'Professor',
        voice: 'male',
        text: "Before we finish today, let me explain how the semester projects will work. You'll work in groups of four, and I'll form the groups myself instead of letting you choose. Why? In past semesters, friends tended to group together, and many groups ended up with members who all had the same strengths. So on Thursday, you'll each fill out a short survey about your skills and your weekly schedule, and I'll use it to build balanced groups whose members can actually meet. Now, about grading. Seventy percent of your project grade will be the group's grade. The other thirty percent depends on peer evaluations. Twice during the semester, you'll anonymously rate each teammate's contributions. If your teammates consistently report that you didn't do your share, your individual grade can end up lower than the group's.",
      },
    ],
    questions: [
      {
        id: 'f08-ls-an-project-groups-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'What is the professor mainly explaining?',
        options: [
          'How project groups will be formed and graded',
          'Why the skills survey will be anonymous',
          'How students should choose a topic for the project',
          'Why students should work with their friends',
        ],
        answer: [0],
        explanation:
          'El profesor explica "how the semester projects will work": cómo formará los grupos y cómo se calificará ("Now, about grading…"). Lo anónimo son las evaluaciones entre compañeros ("anonymously rate"), no la encuesta.',
      },
      {
        id: 'f08-ls-an-project-groups-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'Why will the professor form the groups himself?',
        options: [
          'Students asked him to choose the groups for them.',
          'Some students missed the first class.',
          'Groups were too large in past semesters.',
          "Friends' groups often had similar strengths.",
        ],
        answer: [3],
        explanation:
          'Lo justifica así: "friends tended to group together, and many groups ended up with members who all had the same strengths". No menciona grupos demasiado grandes; de hecho, fija el tamaño en cuatro.',
      },
      {
        id: 'f08-ls-an-project-groups-q3',
        kind: 'single',
        skill: 'inference',
        prompt: 'What is implied about a student who does little work for the group?',
        options: [
          'The student will have to redo the project.',
          'The student may get a lower grade than teammates.',
          'The student will be reported to the department.',
          'The group will be allowed to remove that student.',
        ],
        answer: [1],
        explanation:
          'Se deduce de "your individual grade can end up lower than the group\'s": las evaluaciones de los compañeros (el 30 %) pueden bajar su nota. No se habla de expulsarlo del grupo ni de repetir el proyecto.',
      },
    ],
  },
  {
    id: 'f08-ls-an-research-data',
    form: 8,
    section: 'listening',
    task: 'announcement',
    title: 'New Research Data Storage Policy',
    topic: 'campus-life',
    difficulty: 'hard',
    context: 'Listen to an announcement from a university research office.',
    script: [
      {
        speaker: 'Announcer',
        voice: 'female',
        text: "Attention, graduate students and research staff. Beginning March first, a new data-management policy takes effect. All research data collected for university projects must be stored on university servers, either your department's secure network drive or the university's approved cloud storage. Personal laptops and USB drives may no longer serve as the main place to keep research data. Why the change? Last year, two stolen laptops exposed confidential information from survey participants, and in another case, several months of lab results were lost because they existed only on a single flash drive. University servers are encrypted and backed up every night. You may still analyze data on your laptop, but the original files must remain on the server. If your project involves human participants, you must also complete a short online training module before March first.",
      },
    ],
    questions: [
      {
        id: 'f08-ls-an-research-data-q1',
        kind: 'single',
        skill: 'purpose',
        prompt: 'What is the main purpose of the announcement?',
        options: [
          'To promote new encryption software for laptops',
          'To introduce rules on storing research data',
          'To report the results of a recent participant survey',
          'To explain how to back up files on USB drives',
        ],
        answer: [1],
        explanation:
          'El anuncio presenta "a new data-management policy": los datos deben guardarse "on university servers". El cifrado se menciona como ventaja de los servidores, no de un programa para portátiles.',
      },
      {
        id: 'f08-ls-an-research-data-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'According to the announcement, what happened last year?',
        options: [
          "The university's servers were shut down briefly.",
          'A cloud storage company lost participant data.',
          'Data on personal devices was exposed or lost.',
          'Researchers failed to complete required training.',
        ],
        answer: [2],
        explanation:
          'Se cuenta que "two stolen laptops exposed confidential information" y que se perdieron resultados porque "existed only on a single flash drive". El fallo no fue de los servidores ni de la nube, que son precisamente la solución propuesta.',
      },
      {
        id: 'f08-ls-an-research-data-q3',
        kind: 'single',
        skill: 'inference',
        prompt: 'What can be inferred about researchers who analyze data on their laptops?',
        options: [
          'They may continue if the original files stay on the server.',
          'They may no longer do so after March first.',
          'They must register their laptops with the research office.',
          'They must copy their data to a USB drive every night.',
        ],
        answer: [0],
        explanation:
          'Se dice: "You may still analyze data on your laptop, but the original files must remain on the server". Lo que se prohíbe es usar el portátil como lugar principal de almacenamiento, no como herramienta de análisis.',
      },
    ],
  },

  // ---------- Academic Talks ----------
  {
    id: 'f08-ls-at-hummingbird-hovering',
    form: 8,
    section: 'listening',
    task: 'academic-talk',
    title: 'How Hummingbirds Hover in Place',
    topic: 'biology',
    difficulty: 'easy',
    context: 'Listen to part of a lecture in a biology class.',
    script: [
      { speaker: 'Professor', voice: 'female', text: "Today let's look at one of the most remarkable fliers in the animal world, the hummingbird. Hummingbirds can hover, staying almost perfectly still in the air in front of a flower while they drink its nectar. They can even fly backward. So how do they do it?" },
      { speaker: 'Professor', voice: 'female', text: 'It starts with the way they move their wings. Most birds get most of their lift on the downstroke, when the wing pushes down. On the way back up, the wing mostly just gets back into position. A hummingbird is different. Its shoulder joint is very flexible, so the wing can turn over at the end of each stroke. In slow-motion video, the tip of the wing traces a shape like a figure eight. Because the wing turns over, it pushes air down on the forward stroke and again on the backward stroke. So the bird gets lift in both directions, and that lets it stay in one place.' },
      { speaker: 'Professor', voice: 'female', text: "Of course, all that flapping takes a lot of energy. Many small hummingbirds beat their wings around fifty times per second. For their size, hummingbirds have one of the fastest metabolisms of any animal, and while they're flying, their hearts can beat more than a thousand times a minute. Their tiny bodies can't store much fuel, so during the day they have to feed every few minutes, visiting hundreds of flowers." },
      { speaker: 'Student', voice: 'male', text: "But what about at night? They can't feed in the dark, can they?" },
      { speaker: 'Professor', voice: 'female', text: "No, and that's a real problem. Their solution is a state called torpor. At night, especially when it's cold, a hummingbird lets its body temperature fall by many degrees, and its heart rate slows down dramatically. In this state it uses only a small fraction of its normal energy. In the morning, it warms back up and heads straight for the flowers." },
    ],
    questions: [
      {
        id: 'f08-ls-at-hummingbird-hovering-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'What is the lecture mainly about?',
        options: [
          'Why hummingbirds visit so many flowers each day',
          'How hummingbirds lower their heart rate at night',
          'How the wings of most birds produce lift',
          'How hummingbirds hover and fuel their flight',
        ],
        answer: [3],
        explanation:
          'La profesora pregunta cómo logran quedarse quietos en el aire ("So how do they do it?") y explica el movimiento de las alas, el enorme gasto de energía ("all that flapping takes a lot of energy") y cómo lo cubren: comiendo "every few minutes" y entrando en "torpor" por la noche. Las flores, el ritmo cardíaco nocturno y las alas de otras aves son solo detalles.',
      },
      {
        id: 'f08-ls-at-hummingbird-hovering-q2',
        kind: 'single',
        skill: 'detail',
        prompt: "According to the professor, what is special about a hummingbird's wing stroke?",
        options: [
          'It creates lift only when the wings move downward.',
          'It creates lift in both directions of the stroke.',
          'It moves the wings in a simple up-and-down line.',
          'It depends on the tail feathers to push the bird up.',
        ],
        answer: [1],
        explanation:
          'Se dice que el ala "pushes air down on the forward stroke and again on the backward stroke. So the bird gets lift in both directions". Obtener la sustentación sobre todo al bajar el ala ("on the downstroke") es lo que hacen la mayoría de las aves, no el colibrí, cuyo ala dibuja "a figure eight".',
      },
      {
        id: 'f08-ls-at-hummingbird-hovering-q3',
        kind: 'single',
        skill: 'function',
        prompt: "Why does the professor mention that a hummingbird's heart can beat more than a thousand times a minute?",
        options: [
          'To explain why hummingbirds rarely fly backward',
          'To describe what happens to the bird at night',
          'To illustrate how fast the bird uses energy',
          'To show that its wings beat as fast as its heart',
        ],
        answer: [2],
        explanation:
          'El dato aparece junto a "all that flapping takes a lot of energy" y "one of the fastest metabolisms of any animal": ilustra lo rápido que el colibrí gasta energía. Por la noche ocurre lo contrario: "its heart rate slows down dramatically".',
      },
      {
        id: 'f08-ls-at-hummingbird-hovering-q4',
        kind: 'single',
        skill: 'inference',
        prompt: 'What can be inferred about torpor?',
        options: [
          "It helps the bird's fuel last until morning.",
          'It allows a hummingbird to keep feeding in the dark.',
          'It speeds up the heart to keep the bird warm.',
          'It happens only to birds that are sick or injured.',
        ],
        answer: [0],
        explanation:
          'El colibrí no puede almacenar mucho combustible ("can\'t store much fuel") ni comer de noche, y en "torpor" usa "only a small fraction of its normal energy". Se deduce que este estado hace que su energía le alcance hasta la mañana. El corazón se ralentiza, no se acelera.',
      },
    ],
  },
  {
    id: 'f08-ls-at-smoke-detectors',
    form: 8,
    section: 'listening',
    task: 'academic-talk',
    title: 'Two Ways to Detect Smoke',
    topic: 'technology',
    difficulty: 'medium',
    context: 'Listen to part of a lecture in an engineering class.',
    script: [
      { speaker: 'Professor', voice: 'male', text: "Most of you have a smoke detector on the ceiling at home, but you've probably never wondered what's inside it. There are actually two main designs, and they sense smoke in quite different ways: ionization alarms and photoelectric alarms." },
      { speaker: 'Professor', voice: 'male', text: "Let's start with ionization alarms. Inside there's a small chamber with two metal plates, one positively charged and one negatively charged, and a tiny amount of a radioactive material, usually americium. Don't worry, the amount is very small, and in normal use it's considered safe. The radiation turns some of the air molecules in the chamber into charged particles called ions, which move toward the plates and create a small, steady electric current. When smoke drifts in, the ions stick to the much heavier smoke particles and slow down, so the current drops. The alarm is designed to notice that drop and sound." },
      { speaker: 'Professor', voice: 'male', text: 'Photoelectric alarms rely on light instead. Inside, a small light is aimed so that its beam misses a light sensor, which normally sits in the dark. But when smoke enters, the particles scatter the light in all directions. Think of the dust you suddenly see floating in a beam of sunlight in a dark room. Some of the scattered light reaches the sensor, and that triggers the alarm.' },
      { speaker: 'Professor', voice: 'male', text: "Why does this matter? Because fires don't all produce the same smoke. A fast, flaming fire, say a wastebasket full of paper, gives off huge numbers of very tiny particles, and ionization alarms tend to respond to those a bit sooner. A slow, smoldering fire, like a cigarette burning into a sofa cushion, produces fewer but larger particles, which scatter light very well. Photoelectric alarms usually detect that kind of fire earlier, sometimes much earlier. However, ionization alarms are more likely to go off when someone's just making toast." },
      { speaker: 'Student', voice: 'female', text: 'So which kind should people buy?' },
      { speaker: 'Professor', voice: 'male', text: "Well, nobody knows in advance what kind of fire they'll have, so many fire safety organizations recommend having both types, or combination alarms with both sensors." },
    ],
    questions: [
      {
        id: 'f08-ls-at-smoke-detectors-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'What is the lecture mainly about?',
        options: [
          'Why smoke alarms sometimes go off during cooking',
          'How two types of smoke alarms sense smoke',
          'Why radioactive materials are found in homes',
          'How flaming and smoldering fires start',
        ],
        answer: [1],
        explanation:
          'El profesor anuncia que hay "two main designs" que "sense smoke in quite different ways" y explica cada uno: las alarmas de ionización y las fotoeléctricas. Las falsas alarmas al hacer tostadas ("making toast") y el material radiactivo son solo detalles.',
      },
      {
        id: 'f08-ls-at-smoke-detectors-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'According to the professor, what makes an ionization alarm sound?',
        options: [
          'Smoke scatters light onto a sensor.',
          'The radioactive material heats the air.',
          'Smoke particles block a beam of light.',
          'A small current in the chamber drops.',
        ],
        answer: [3],
        explanation:
          'En la alarma de ionización, los iones se pegan al humo y se frenan, "so the current drops. The alarm is designed to notice that drop and sound". Que el humo disperse la luz hacia un sensor es el mecanismo de la alarma fotoeléctrica.',
      },
      {
        id: 'f08-ls-at-smoke-detectors-q3',
        kind: 'single',
        skill: 'function',
        prompt: 'Why does the professor mention dust in a beam of sunlight?',
        options: [
          'To illustrate how smoke scatters light',
          'To explain why alarms need regular cleaning',
          'To show how ions stick to smoke particles',
          'To suggest where alarms should be placed',
        ],
        answer: [0],
        explanation:
          'Es una comparación: el polvo que se ve flotar cuando entra un rayo de sol ilustra que las partículas de humo "scatter the light in all directions", de modo que parte de la luz llega al sensor. No habla de limpieza ni de dónde colocar las alarmas.',
      },
      {
        id: 'f08-ls-at-smoke-detectors-q4',
        kind: 'single',
        skill: 'inference',
        prompt: 'What can be inferred about a home that has only an ionization alarm?',
        options: [
          'It is exposed to unsafe levels of radiation.',
          'It would not detect fast, flaming fires.',
          'It may get a late warning from a smoldering fire.',
          'It will have fewer false alarms from making toast.',
        ],
        answer: [2],
        explanation:
          'Ante un fuego lento ("a slow, smoldering fire"), las alarmas fotoeléctricas "usually detect that kind of fire earlier, sometimes much earlier". Se deduce que una casa con solo una alarma de ionización podría recibir el aviso más tarde en ese caso. Las de ionización sí responden, incluso antes, a los fuegos con llama.',
      },
    ],
  },
  {
    id: 'f08-ls-at-moment-magnitude',
    form: 8,
    section: 'listening',
    task: 'academic-talk',
    title: 'From Richter to Moment Magnitude',
    topic: 'geology',
    difficulty: 'hard',
    context: 'Listen to part of a lecture in a geology class.',
    script: [
      { speaker: 'Professor', voice: 'female', text: "When the news reports an earthquake, you'll often hear something like 'a magnitude seven on the Richter scale.' But here's a surprise: seismologists haven't used the original Richter scale for large earthquakes in decades. Let's look at why." },
      { speaker: 'Professor', voice: 'female', text: 'Charles Richter developed his scale in 1935 for earthquakes in Southern California. His method was based on the amplitude, basically the height, of the largest wave recorded on a particular type of seismometer, adjusted for the distance to the earthquake. The scale is logarithmic, so each step up by one whole number means the waves are ten times larger, and the energy released is roughly thirty-two times greater. For local, moderate earthquakes, it worked very well.' },
      { speaker: 'Professor', voice: 'female', text: "The trouble appeared with very large earthquakes. Richter's method relied on fairly short, quick waves. In a huge earthquake, the fault can keep rupturing for a minute or more, over hundreds of kilometers, and much of the energy is released in long, slow waves that the scale didn't capture. As a result, above roughly magnitude seven, the Richter values stopped increasing much, even when one earthquake was clearly far more powerful than another. Seismologists say the scale saturates. It's like a bathroom scale that can't show any weight above its maximum." },
      { speaker: 'Student', voice: 'male', text: 'So does that mean the Richter numbers for smaller earthquakes were wrong too?' },
      { speaker: 'Professor', voice: 'female', text: "Good question. No. For small and moderate earthquakes, the two scales give similar values, and that was intentional. In the 1970s, seismologists introduced the moment magnitude scale and calibrated it to match Richter's numbers in the range where his scale worked well. What's different is what it measures. Moment magnitude is based on the physical size of the event: how large an area of the fault slipped, how far the rock moved, and how stiff that rock is. Because it's tied to the actual rupture, it doesn't saturate. That's why we can say that the 1960 earthquake in Chile, the largest ever recorded, was a magnitude nine point five. So when you hear 'Richter' on the news after a major earthquake, the number reported is almost certainly a moment magnitude." },
    ],
    questions: [
      {
        id: 'f08-ls-at-moment-magnitude-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'What is the lecture mainly about?',
        options: [
          'How seismometers record several kinds of waves',
          'Why the 1960 Chile earthquake was so destructive',
          "Why Richter's scale was replaced for big quakes",
          'How the news exaggerates the size of earthquakes',
        ],
        answer: [2],
        explanation:
          'La profesora anuncia que los sismólogos ya no usan la escala de Richter "for large earthquakes" y explica por qué ("Let\'s look at why") y qué la sustituyó: la "moment magnitude scale". El terremoto de Chile es solo un ejemplo.',
      },
      {
        id: 'f08-ls-at-moment-magnitude-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'According to the professor, what is moment magnitude based on?',
        options: [
          'The size of the fault rupture and the slip',
          'The height of the largest wave on a seismometer',
          'The distance between the quake and a city',
          'The amount of damage done to buildings',
        ],
        answer: [0],
        explanation:
          'Se basa en "how large an area of the fault slipped, how far the rock moved, and how stiff that rock is". La altura de la onda mayor ("the amplitude… of the largest wave") era la base de la escala de Richter.',
      },
      {
        id: 'f08-ls-at-moment-magnitude-q3',
        kind: 'single',
        skill: 'function',
        prompt: 'Why does the professor mention a bathroom scale?',
        options: [
          'To show how seismometers are calibrated',
          'To compare the energy of two earthquakes',
          'To explain why the Richter scale is logarithmic',
          'To illustrate why Richter values stop rising',
        ],
        answer: [3],
        explanation:
          'La báscula ilustra la saturación: "the scale saturates. It\'s like a bathroom scale that can\'t show any weight above its maximum". Es decir, por encima de cierto valor la escala de Richter deja de subir. No explica el carácter logarítmico.',
      },
      {
        id: 'f08-ls-at-moment-magnitude-q4',
        kind: 'single',
        skill: 'inference',
        prompt: "What does the professor imply about news reports that mention the 'Richter scale'?",
        options: [
          'They often give the wrong location.',
          'They often use an outdated name for the scale.',
          'They tend to underestimate small earthquakes.',
          'They rely on seismometers built in the 1930s.',
        ],
        answer: [1],
        explanation:
          'Aunque las noticias digan "Richter", "the number reported is almost certainly a moment magnitude". Se deduce que el nombre que usan está desfasado. No se critica la ubicación ni la medición de terremotos pequeños.',
      },
    ],
  },
];
