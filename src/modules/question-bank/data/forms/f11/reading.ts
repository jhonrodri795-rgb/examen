import type { ReadingSet } from '../../../types';

/** Simulación n.º 11 — Reading (contenido original). */
export const sets: ReadingSet[] = [
  // ---------- Complete the Words ----------
  {
    id: 'f11-rd-cw-comets',
    form: 11,
    section: 'reading',
    task: 'complete-words',
    title: 'Icy Comets and Their Tails',
    topic: 'astronomy',
    difficulty: 'easy',
    text:
      'Comets are small frozen bodies that travel around the Sun in long, oval orbits. Their solid {{co|re}}, called {{t|he}} nucleus, {{i|s}} a {{mix|ture}} of {{wa|ter}} ice, {{fro|zen}} gases, {{a|nd}} dust. As a comet {{mo|ves}} closer {{t|o}} the Sun, sunlight {{wa|rms}} the ice and turns it into gas. This gas, along with loosened dust, forms a glowing cloud around the nucleus. Pressure from sunlight and the solar wind then pushes this material outward into a long tail, which always points away from the Sun.',
    note: '«Is» concuerda con el sujeto singular «core» y «a mixture of» va seguido de una lista (water ice, frozen gases, and dust). «Moves closer to» y «warms» están en presente simple porque el texto describe un proceso que se repite.',
  },
  {
    id: 'f11-rd-cw-tone-languages',
    form: 11,
    section: 'reading',
    task: 'complete-words',
    title: 'Pitch That Changes Meaning',
    topic: 'linguistics',
    difficulty: 'medium',
    text:
      'In a tone language, the pitch of a syllable can change the meaning of a word. Mandarin Chinese {{i|s}} a {{cla|ssic}} example {{o|f}} this {{sys|tem}}. For {{inst|ance}}, the {{syll|able}} "ma" {{me|ans}} "mother" {{i|f}} it {{i|s}} pronounced {{wi|th}} a high, level tone, but it means "horse" if the pitch first falls and then rises. Because pitch carries meaning, speakers must control it carefully, and listeners rely on it as much as on consonants and vowels. A large share of the world\'s languages use tone in some way, including many languages of Africa, East Asia, and the Americas.',
    note: '«A classic example of» es una colocación muy frecuente para presentar un caso típico. Fíjate en la condicional «if it is pronounced with…»: el verbo «means» se repite más adelante en la misma frase y confirma el presente simple.',
  },
  {
    id: 'f11-rd-cw-tardigrades',
    form: 11,
    section: 'reading',
    task: 'complete-words',
    title: 'Tardigrades in Cryptobiosis',
    topic: 'biology',
    difficulty: 'hard',
    text:
      'Tardigrades are microscopic animals that can survive conditions that would kill almost any other organism. During {{dro|ught}}, these {{crea|tures}} gradually {{with|draw}} their {{li|mbs}}, expel {{nea|rly}} all {{inte|rnal}} water, {{a|nd}} curl {{in|to}} a dry, barrel-shaped form called a tun. In this {{cond|ition}}, their {{metab|olism}} slows almost to a halt, a reversible state known as cryptobiosis. Specialized proteins and sugars appear to replace the lost water, preventing membranes and other cell structures from collapsing. When moisture returns, a tun can rehydrate and resume normal activity within hours, sometimes after years of dormancy.',
    note: 'Los verbos de la serie «withdraw… expel… and curl into» comparten el sujeto «these creatures», así que van en presente sin -s. «Drought» (sequía) explica por qué el animal pierde agua, y «metabolism slows» es la colocación típica para hablar de la actividad del organismo.',
  },

  // ---------- Read in Daily Life ----------
  {
    id: 'f11-rd-dl-flower-show',
    form: 11,
    section: 'reading',
    task: 'daily-life',
    genre: 'webpage',
    title: 'Spring Flower Show Visits',
    topic: 'daily-life',
    difficulty: 'easy',
    header: ['Willowmere Botanical Garden — Spring Flower Show', 'Hours and Photography'],
    text:
      'Our Spring Flower Show runs from April 5 to May 4. During the show, the garden is open daily from 9:00 a.m. to 6:00 p.m., with late hours until 8:00 p.m. on Fridays. Last entry is one hour before closing.\n\nPhotography: Personal photos are welcome throughout the garden. To protect the plants, please stay on marked paths and do not use tripods in the greenhouses. Professional photo sessions, including wedding and graduation portraits, require a permit, which can be booked online for $40.',
    questions: [
      {
        id: 'f11-rd-dl-flower-show-q1',
        kind: 'single',
        skill: 'inference',
        prompt: 'What is the latest time a visitor can enter the garden on a Friday during the show?',
        options: ['6:00 p.m.', '8:00 p.m.', '7:00 p.m.', '5:00 p.m.'],
        answer: [2],
        explanation:
          'Los viernes el jardín cierra a las 8:00 p.m. ("late hours until 8:00 p.m. on Fridays") y "Last entry is one hour before closing", así que la última entrada es a las 7:00 p.m. La opción 8:00 p.m. es la hora de cierre, no la de última entrada.',
      },
      {
        id: 'f11-rd-dl-flower-show-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'Which visitor needs to book a permit?',
        options: [
          'A photographer taking paid graduation portraits',
          'A visitor photographing tulips with a phone',
          'A guest who plans to stay for the Friday late hours',
          'A family that wants to walk on the marked paths',
        ],
        answer: [0],
        explanation:
          'El permiso es para "Professional photo sessions, including wedding and graduation portraits". Las fotos personales con el teléfono no lo necesitan: "Personal photos are welcome throughout the garden".',
      },
    ],
  },
  {
    id: 'f11-rd-dl-shift-swaps',
    form: 11,
    section: 'reading',
    task: 'daily-life',
    genre: 'memo',
    title: 'New Shift-Swap Procedure',
    topic: 'daily-life',
    difficulty: 'easy',
    header: ['MEMO', 'To: All servers', 'From: Dana Ruiz, Floor Manager', 'Subject: Changes to shift swaps'],
    text:
      'Starting Monday, all shift swaps must go through the scheduling app instead of the paper sheet by the kitchen door. Post the shift you want to give away, and once a coworker accepts it, I will review the change within 24 hours. A swap is not final until you see my approval in the app. Please arrange swaps at least two days before the shift. For last-minute emergencies, call me directly rather than sending a text.',
    questions: [
      {
        id: 'f11-rd-dl-shift-swaps-q1',
        kind: 'single',
        skill: 'purpose',
        prompt: 'What is the main purpose of the memo?',
        options: [
          'To announce that servers will work more weekend shifts',
          'To explain a new way for servers to trade shifts',
          'To remind servers to arrive on time for their shifts',
          'To introduce a new manager to the restaurant staff',
        ],
        answer: [1],
        explanation:
          'El memo explica que "all shift swaps must go through the scheduling app instead of the paper sheet": es un procedimiento nuevo para intercambiar turnos. No habla de más turnos de fin de semana ni de puntualidad.',
      },
      {
        id: 'f11-rd-dl-shift-swaps-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'According to the memo, when is a shift swap final?',
        options: [
          'When a coworker accepts the posted shift',
          'When the server writes it on the paper sheet',
          'When the swap is arranged two days in advance',
          'When the manager approves it in the app',
        ],
        answer: [3],
        explanation:
          '"A swap is not final until you see my approval in the app." Que un compañero acepte el turno es solo un paso previo; la gerente todavía tiene que revisarlo.',
      },
    ],
  },
  {
    id: 'f11-rd-dl-move-out',
    form: 11,
    section: 'reading',
    task: 'daily-life',
    genre: 'advertisement',
    title: 'Student Move-Out Packages',
    topic: 'daily-life',
    difficulty: 'medium',
    header: ['Hilltop Movers — Student Move-Out Packages'],
    text:
      'Heading home for the summer? Let Hilltop Movers handle the heavy lifting.\n\nBasic Package — $89: We collect up to 10 boxes from your residence hall and deliver them anywhere within 50 miles.\nStore & Return — $149: We collect up to 10 boxes, keep them in our climate-controlled warehouse for up to four months, and deliver them to your new address in the fall.\n\nExtra boxes are $8 each. Bicycles and mini-fridges count as two boxes.\n\nBook by April 20 to receive free packing supplies. Pickups are available from May 5 to May 16 only, and spots fill quickly during exam week. Please show a valid campus ID at pickup.',
    questions: [
      {
        id: 'f11-rd-dl-move-out-q1',
        kind: 'single',
        skill: 'inference',
        prompt: 'How much would a student pay to store 10 boxes and one mini-fridge over the summer?',
        options: ['$165', '$157', '$149', '$105'],
        answer: [0],
        explanation:
          'El paquete "Store & Return — $149" cubre 10 cajas, y "mini-fridges count as two boxes": son 2 cajas extra a "$8 each", es decir, 149 + 16 = $165. La opción $157 suma solo una caja extra.',
      },
      {
        id: 'f11-rd-dl-move-out-q2',
        kind: 'single',
        skill: 'vocabulary',
        prompt: 'The phrase "handle the heavy lifting" in the advertisement is closest in meaning to',
        options: [
          'teach students to lift safely',
          'move only very heavy furniture',
          'take care of the hard work',
          'raise prices during busy weeks',
        ],
        answer: [2],
        explanation:
          '"Handle the heavy lifting" es una expresión que significa encargarse del trabajo pesado o difícil. La empresa ofrece hacer la mudanza por el estudiante, no solo mover muebles pesados.',
      },
      {
        id: 'f11-rd-dl-move-out-q3',
        kind: 'single',
        skill: 'inference',
        prompt: 'What is implied about students who want a pickup during exam week?',
        options: [
          'They will have to pay an extra fee for the service.',
          'They may not get a slot if they wait to book.',
          'They must store their boxes for four months.',
          'They will receive free packing supplies.',
        ],
        answer: [1],
        explanation:
          '"Spots fill quickly during exam week" implica que quien reserve tarde puede quedarse sin hueco. Los materiales gratuitos dependen de reservar "by April 20", no de la semana de exámenes.',
      },
    ],
  },
  {
    id: 'f11-rd-dl-symposium',
    form: 11,
    section: 'reading',
    task: 'daily-life',
    genre: 'schedule',
    title: 'Undergraduate Research Symposium Program',
    topic: 'campus-life',
    difficulty: 'medium',
    header: ['Undergraduate Research Symposium — Program', 'Thursday–Friday, March 26–27 · Larkin Hall'],
    text:
      'THURSDAY, MARCH 26\n9:00–9:30 a.m. Welcome and opening remarks (Room 101)\n9:45–11:45 a.m. Poster Session A: Life and Physical Sciences (Atrium)\n1:00–3:00 p.m. Short talks: Social Sciences (Room 204)\n3:30–4:30 p.m. Workshop: Turning Your Project into a Publication (Room 101)\n\nFRIDAY, MARCH 27\n9:30–11:30 a.m. Poster Session B: Humanities and Engineering (Atrium)\n1:00–2:30 p.m. Short talks: Natural Sciences (Room 204)\n3:00–4:00 p.m. Awards ceremony and reception (Room 101)\n\nNotes: Poster presenters must set up 30 minutes before their session begins and stay with their posters for the entire session. Each short talk lasts 12 minutes, followed by 3 minutes for questions. Prizes for the best poster and the best talk will be announced at the awards ceremony.',
    questions: [
      {
        id: 'f11-rd-dl-symposium-q1',
        kind: 'single',
        skill: 'inference',
        prompt: 'When should a student presenting an engineering poster begin setting up?',
        options: ['9:15 a.m. on Thursday', '9:30 a.m. on Friday', '9:00 a.m. on Thursday', '9:00 a.m. on Friday'],
        answer: [3],
        explanation:
          'Los pósteres de ingeniería están en "Poster Session B: Humanities and Engineering", el viernes a las 9:30, y "presenters must set up 30 minutes before their session begins": a las 9:00 del viernes. La opción 9:30 es la hora de inicio de la sesión.',
      },
      {
        id: 'f11-rd-dl-symposium-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'How much time is given to each short talk, including questions?',
        options: ['12 minutes', '15 minutes', '30 minutes', '90 minutes'],
        answer: [1],
        explanation:
          '"Each short talk lasts 12 minutes, followed by 3 minutes for questions": 12 + 3 = 15 minutos. La opción de 12 minutos olvida el turno de preguntas.',
      },
      {
        id: 'f11-rd-dl-symposium-q3',
        kind: 'single',
        skill: 'inference',
        prompt: 'A student who studies voting behavior is giving a short talk. When will the student most likely present?',
        options: [
          'Thursday morning in the Atrium',
          'Friday afternoon in Room 204',
          'Thursday afternoon in Room 204',
          'Friday morning in the Atrium',
        ],
        answer: [2],
        explanation:
          'El comportamiento electoral pertenece a las ciencias sociales, y "Short talks: Social Sciences (Room 204)" es el jueves de 1:00 a 3:00 p.m. El viernes por la tarde en la sala 204 son las charlas de "Natural Sciences".',
      },
    ],
  },
  {
    id: 'f11-rd-dl-plumber-texts',
    form: 11,
    section: 'reading',
    task: 'daily-life',
    genre: 'text-message',
    title: 'Leaky Sink Repair Texts',
    topic: 'daily-life',
    difficulty: 'hard',
    text:
      'Priya (8:02 a.m.): Hi, this is Priya in unit 4C at 210 Alder Street. The pipe under my kitchen sink is leaking. Could you come today?\nMarco (8:15 a.m.): I can come between 1 and 3 p.m. The call-out fee is $75, which covers the first 30 minutes. After that, it\'s $25 per half hour, plus parts.\nPriya (8:17 a.m.): I\'m at work until 5. Could the building manager let you in?\nMarco (8:20 a.m.): Only if you email her written permission first. That\'s her rule, not mine. Otherwise, I can come at 5:30, but evening visits cost an extra $40.\nPriya (8:22 a.m.): I\'ll email her now, then. Please text me before you start anything that would cost more than $150 in total.\nMarco (8:24 a.m.): Will do. If the drain trap needs replacing, I\'ll pick one up on the way, so you won\'t need a second visit.',
    questions: [
      {
        id: 'f11-rd-dl-plumber-texts-q1',
        kind: 'single',
        skill: 'inference',
        prompt: 'If Marco works for one hour during the afternoon visit and needs no parts, how much will Priya pay?',
        options: ['$75', '$140', '$100', '$125'],
        answer: [2],
        explanation:
          'La tarifa "$75" cubre "the first 30 minutes" y después son "$25 per half hour": 75 + 25 = $100 por una hora. $140 sumaría el recargo de "$40" de la visita nocturna, pero Priya elige la visita de la tarde.',
      },
      {
        id: 'f11-rd-dl-plumber-texts-q2',
        kind: 'single',
        skill: 'purpose',
        prompt: 'Why does Priya decide to email the building manager?',
        options: [
          'So that Marco can get in while she is at work',
          'So that the manager will pay for the repair',
          'So that she can avoid paying the call-out fee',
          'So that the repair can be moved to the evening',
        ],
        answer: [0],
        explanation:
          'Priya trabaja "until 5" y Marco dice que la administradora solo le abrirá "if you email her written permission first". El correo permite la visita de la tarde; evita justamente la visita nocturna, no la tarifa de salida.',
      },
      {
        id: 'f11-rd-dl-plumber-texts-q3',
        kind: 'single',
        skill: 'vocabulary',
        prompt: 'In Marco\'s 8:15 a.m. message, the "call-out fee" is most likely',
        options: [
          'a charge for answering a phone call',
          'a discount for booking a visit early',
          'a penalty for canceling at the last minute',
          'a basic charge for coming to the home',
        ],
        answer: [3],
        explanation:
          'El "call-out fee" de "$75" cubre "the first 30 minutes" de la visita: es el cargo básico por desplazarse y empezar el trabajo. La opción de la llamada telefónica interpreta "call" de forma literal.',
      },
    ],
  },

  // ---------- Read an Academic Passage ----------
  {
    id: 'f11-rd-ap-great-wall',
    form: 11,
    section: 'reading',
    task: 'academic-passage',
    title: 'The Great Wall Across Dynasties',
    topic: 'history',
    difficulty: 'easy',
    paragraphs: [
      'The Great Wall of China is often imagined as a single structure built all at once, but it is really a series of walls constructed and repaired over roughly two thousand years. Different dynasties built their own sections, using the materials and workers available to them. When all of its branches are measured together, the wall stretches for more than 20,000 kilometers.',
      'The earliest walls appeared during the Warring States period, when rival kingdoms built barriers to protect themselves from one another and from northern nomads. Workers packed layers of soil tightly between wooden frames until the earth became almost as hard as stone. After the Qin state unified China in 221 BCE, its ruler ordered many older walls to be connected and extended along the northern frontier. Hundreds of thousands of soldiers, farmers, and prisoners were forced to work on the project, and many of them died.',
      'Later dynasties continued the work. The Han dynasty pushed the wall far to the west, across deserts, to protect the trade routes later known as the Silk Road. Because stone and timber were hard to find there, builders layered gravel with reeds and branches, a method that has allowed some sections to survive for two thousand years.',
      'The wall most visitors see today, however, was largely built by the Ming dynasty between the late 1300s and the 1600s. Ming builders used fired bricks and cut stone, which made the wall taller and far more durable. They also added thousands of watchtowers, where guards could send warnings by lighting signal fires. Even so, the wall could not save the Ming: in 1644, a Ming general opened a gate to an invading Manchu army.',
    ],
    questions: [
      {
        id: 'f11-rd-ap-great-wall-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'What is the main idea of the passage?',
        options: [
          'The wall was designed by one emperor to protect the Silk Road.',
          'The wall was built and rebuilt by many different dynasties.',
          'The wall succeeded in keeping northern invaders out of China.',
          'The wall was built mostly by prisoners using packed soil.',
        ],
        answer: [1],
        explanation:
          'Desde el primer párrafo el texto dice que es "a series of walls constructed and repaired over roughly two thousand years" y luego recorre los Estados Combatientes, los Qin, los Han y los Ming. La opción de los invasores contradice el último párrafo ("the wall could not save the Ming").',
      },
      {
        id: 'f11-rd-ap-great-wall-q2',
        kind: 'single',
        skill: 'detail',
        paragraph: 1,
        prompt: 'According to paragraph 2, how were the earliest walls built?',
        options: [
          'By stacking fired bricks around wooden towers',
          'By cutting large blocks of stone from mountains',
          'By layering gravel with reeds and branches',
          'By packing soil tightly between wooden frames',
        ],
        answer: [3],
        explanation:
          'El párrafo 2 dice: "Workers packed layers of soil tightly between wooden frames". La grava con juncos es el método de los Han (párrafo 3) y los ladrillos cocidos son de los Ming (párrafo 4).',
      },
      {
        id: 'f11-rd-ap-great-wall-q3',
        kind: 'single',
        skill: 'vocabulary',
        paragraph: 3,
        highlight: 'durable',
        prompt: 'The word "durable" in paragraph 4 is closest in meaning to',
        options: ['long-lasting', 'attractive', 'well-guarded', 'lightweight'],
        answer: [0],
        explanation:
          '"Durable" significa duradero, resistente al paso del tiempo ("long-lasting"). El ladrillo y la piedra hicieron el muro "taller and far more durable", es decir, más resistente al paso del tiempo; "well-guarded" se relaciona con las torres de vigilancia, pero no es el significado de la palabra.',
      },
      {
        id: 'f11-rd-ap-great-wall-q4',
        kind: 'single',
        skill: 'inference',
        paragraph: 2,
        prompt: 'What can be inferred from paragraph 3 about the Han builders?',
        options: [
          'They preferred reeds because reeds were stronger than stone.',
          'They built the sections that most tourists visit today.',
          'They adapted their building methods to local materials.',
          'They stopped building after the Silk Road declined.',
        ],
        answer: [2],
        explanation:
          'Los Han usaron grava, juncos y ramas "Because stone and timber were hard to find there": adaptaron la técnica a lo que había. El texto no dice que los juncos fueran más fuertes que la piedra; los tramos que visitan los turistas son de los Ming.',
      },
      {
        id: 'f11-rd-ap-great-wall-q5',
        kind: 'single',
        skill: 'purpose',
        paragraph: 3,
        prompt: 'Why does the author mention the events of 1644 in paragraph 4?',
        options: [
          'To explain why the Ming built so many watchtowers',
          'To show that the wall could not ensure safety',
          'To describe how the Manchus later repaired the wall',
          'To give the date when the Ming wall was completed',
        ],
        answer: [1],
        explanation:
          'La frase empieza con "Even so, the wall could not save the Ming": a pesar de los ladrillos y las torres, un general abrió una puerta y el ejército manchú pasó. El año 1644 no es la fecha de finalización del muro.',
      },
    ],
  },
  {
    id: 'f11-rd-ap-hawaii-hotspot',
    form: 11,
    section: 'reading',
    task: 'academic-passage',
    title: 'Hawaii and the Pacific Hotspot',
    topic: 'geology',
    difficulty: 'medium',
    paragraphs: [
      "Most of the world's volcanoes form near the edges of tectonic plates, where plates pull apart or one plate sinks beneath another. The Hawaiian Islands are a puzzling exception. They rise from the middle of the Pacific Plate, thousands of kilometers from the nearest plate boundary. In the 1960s, the Canadian geophysicist J. Tuzo Wilson proposed an explanation that is now widely accepted: the islands were created by a hotspot.",
      "A hotspot is an area where unusually hot material rises from deep within the Earth's mantle. As this material approaches the surface, the drop in pressure causes part of it to melt, producing magma. The magma forces its way up through the overlying plate and erupts on the seafloor. Over hundreds of thousands of years, repeated eruptions pile lava higher and higher until a volcano finally breaks the surface of the ocean and becomes an island.",
      'The key to the island chain is that the hotspot stays in roughly the same place while the Pacific Plate slides over it toward the northwest at several centimeters per year. Each volcano is gradually carried away from its source of magma, its eruptions stop, and a new volcano begins to grow over the hotspot. As a result, the islands form a line that gets steadily older toward the northwest. The island of Hawaii, which still has active volcanoes, is less than a million years old, whereas Kauai, farther to the northwest, is about five million years old.',
      'Once a volcano moves off the hotspot, other forces take over. The cooling crust beneath it contracts and sinks, while waves and rain wear the island down. Over millions of years, the older islands shrink until only low coral atolls or underwater mountains called seamounts remain. Meanwhile, the process continues: southeast of the island of Hawaii, a young volcano is already building up from the seafloor and may emerge as a new island tens of thousands of years from now.',
    ],
    questions: [
      {
        id: 'f11-rd-ap-hawaii-hotspot-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'What is the passage mainly about?',
        options: [
          'Why most volcanoes form where tectonic plates meet',
          'How coral atolls develop on top of sinking islands',
          'Why some Hawaiian volcanoes are more active than others',
          'How a hotspot and a moving plate formed an island chain',
        ],
        answer: [3],
        explanation:
          'El texto presenta Hawái como "a puzzling exception" y explica que las islas "were created by a hotspot" mientras "the Pacific Plate slides over it". Los volcanes en los bordes de placas solo se mencionan como contraste en la primera frase.',
      },
      {
        id: 'f11-rd-ap-hawaii-hotspot-q2',
        kind: 'single',
        skill: 'vocabulary',
        paragraph: 0,
        highlight: 'puzzling',
        prompt: 'The word "puzzling" in paragraph 1 is closest in meaning to',
        options: ['hard to explain', 'very dangerous', 'widely known', 'extremely large'],
        answer: [0],
        explanation:
          '"Puzzling" significa desconcertante o difícil de explicar. Hawái es una excepción extraña porque está "thousands of kilometers from the nearest plate boundary", y por eso hizo falta la explicación de Wilson.',
      },
      {
        id: 'f11-rd-ap-hawaii-hotspot-q3',
        kind: 'single',
        skill: 'detail',
        paragraph: 1,
        prompt: 'According to paragraph 2, why does part of the rising material melt?',
        options: [
          'It is heated by friction with the moving plate.',
          'It mixes with seawater that seeps into the crust.',
          'The pressure on it drops as it nears the surface.',
          'It is pushed sideways toward a plate boundary.',
        ],
        answer: [2],
        explanation:
          'El párrafo 2 dice: "As this material approaches the surface, the drop in pressure causes part of it to melt". El texto no menciona la fricción con la placa ni el agua de mar.',
      },
      {
        id: 'f11-rd-ap-hawaii-hotspot-q4',
        kind: 'single',
        skill: 'inference',
        paragraph: 2,
        prompt: 'What can be inferred from paragraph 3 about an island located far to the northwest of Kauai?',
        options: [
          'It is probably younger than the island of Hawaii.',
          'It probably formed over five million years ago.',
          'It is probably still located above the hotspot.',
          'It probably has more active volcanoes than Kauai.',
        ],
        answer: [1],
        explanation:
          'Las islas forman "a line that gets steadily older toward the northwest" y Kauai tiene "about five million years"; una isla más al noroeste debe ser aún más antigua. El punto caliente queda en el extremo sureste de la cadena, bajo la isla de Hawái.',
      },
      {
        id: 'f11-rd-ap-hawaii-hotspot-q5',
        kind: 'single',
        skill: 'negative-factual',
        paragraph: 3,
        prompt: 'According to paragraph 4, all of the following happen after a volcano moves off the hotspot EXCEPT:',
        options: [
          'Its eruptions become larger and more frequent.',
          'The crust beneath it cools, contracts, and sinks.',
          'Waves and rain gradually wear it down over time.',
          'It may eventually become an underwater seamount.',
        ],
        answer: [0],
        explanation:
          'El párrafo 4 menciona que la corteza "contracts and sinks", que "waves and rain wear the island down" y que al final quedan "seamounts". Las erupciones no aumentan: según el párrafo 3, al alejarse del punto caliente "its eruptions stop".',
      },
    ],
  },
  {
    id: 'f11-rd-ap-tunnel-boring',
    form: 11,
    section: 'reading',
    task: 'academic-passage',
    title: 'How Tunnel Boring Machines Dig',
    topic: 'engineering',
    difficulty: 'hard',
    paragraphs: [
      'For most of history, tunnels were dug by hand or blasted with explosives, slow and dangerous methods that also shook the ground around the work site. Today, many large tunnels for subways, highways, and water supply are excavated by tunnel boring machines, or TBMs. These machines, some of which are longer than a football field, work like enormous mechanical earthworms: they cut through the ground at the front, remove the loosened material, and line the new tunnel behind them, all in one continuous operation.',
      'The working end of a TBM is a rotating cutterhead whose diameter matches that of the tunnel. In hard rock, the cutterhead is studded with steel disc cutters. Powerful hydraulic cylinders press these discs against the rock face with enormous force, and as the cutterhead turns, the discs roll across the rock and split off thin chips. To push forward, a hard-rock TBM extends side pads called grippers, which brace firmly against the tunnel walls and provide the resistance needed for the thrust. The broken rock, known as muck, falls through openings in the cutterhead and is carried away on conveyor belts.',
      'Soft ground presents a different problem. Clay, sand, and gravel do not break into chips, but they may collapse into the tunnel or let groundwater rush in. Machines designed for these conditions are enclosed in a steel shield and keep the excavated face under constant pressure. In an earth pressure balance machine, the excavated soil itself is packed into a chamber behind the cutterhead, where its pressure holds back the surrounding ground; a screw conveyor then removes the soil at a carefully controlled rate. Slurry machines achieve the same goal by filling the chamber with a pressurized mixture of water and clay, which is then pumped out together with the excavated material.',
      'Behind the cutterhead, the TBM lines the tunnel as it advances. A mechanical arm called an erector lifts curved, precast concrete segments into position and bolts them together into a complete ring. In soft-ground machines, which cannot grip the loose walls, hydraulic cylinders push against the most recently installed ring to drive the machine forward. Although TBMs are expensive and can take months to design and assemble, they cause far less vibration than blasting, leave smooth tunnel walls, and allow work to continue beneath busy cities with little disturbance at the surface.',
    ],
    questions: [
      {
        id: 'f11-rd-ap-tunnel-boring-q1',
        kind: 'single',
        skill: 'organization',
        prompt: 'How is the passage organized?',
        options: [
          'It compares several famous tunnels and ranks them by length.',
          'It describes a flaw in TBMs and then proposes a solution.',
          'It presents TBMs and how they work in rock and soft ground.',
          'It argues that blasting is still safer than using TBMs.',
        ],
        answer: [2],
        explanation:
          'El párrafo 1 presenta las TBM; el 2 explica su funcionamiento "In hard rock"; el 3, el caso de "Soft ground"; y el 4, el revestimiento y sus ventajas. El texto no defiende las explosiones: dice que las TBM "cause far less vibration than blasting".',
      },
      {
        id: 'f11-rd-ap-tunnel-boring-q2',
        kind: 'single',
        skill: 'detail',
        paragraph: 1,
        prompt: 'According to paragraph 2, what allows a hard-rock TBM to push itself forward?',
        options: [
          'Disc cutters that roll along the tunnel floor',
          'Grippers that brace against the tunnel walls',
          'Conveyor belts that pull the cutterhead ahead',
          'Concrete rings placed in front of the machine',
        ],
        answer: [1],
        explanation:
          '"To push forward, a hard-rock TBM extends side pads called grippers, which brace firmly against the tunnel walls". Empujar contra los anillos de hormigón es lo que hacen las máquinas de suelo blando (párrafo 4), y los anillos están detrás, no delante.',
      },
      {
        id: 'f11-rd-ap-tunnel-boring-q3',
        kind: 'single',
        skill: 'vocabulary',
        paragraph: 1,
        highlight: 'studded',
        prompt: 'The word "studded" in paragraph 2 is closest in meaning to',
        options: ['polished', 'repaired', 'balanced', 'dotted'],
        answer: [3],
        explanation:
          '"Studded with" significa salpicado o cubierto de elementos repartidos por la superficie ("dotted with"): la cabeza de corte lleva muchos discos de acero distribuidos por su cara frontal.',
      },
      {
        id: 'f11-rd-ap-tunnel-boring-q4',
        kind: 'single',
        skill: 'inference',
        paragraph: 2,
        prompt: 'What can be inferred from paragraph 3 about an earth pressure balance machine?',
        options: [
          'Removing soil too quickly could let the ground give way.',
          'Its disc cutters wear out faster than those used in rock.',
          'It works only in places where there is no groundwater.',
          'It can dig safely without any kind of protective shield.',
        ],
        answer: [0],
        explanation:
          'La tierra acumulada en la cámara "holds back the surrounding ground" y se retira "at a carefully controlled rate"; si se sacara demasiado rápido, bajaría la presión y el terreno podría ceder. El texto dice que estas máquinas sí van "enclosed in a steel shield".',
      },
      {
        id: 'f11-rd-ap-tunnel-boring-q5',
        kind: 'single',
        skill: 'negative-factual',
        paragraph: 3,
        prompt: 'According to paragraph 4, all of the following are advantages of TBMs EXCEPT:',
        options: [
          'They cause less vibration than blasting.',
          'They leave the tunnel walls smooth.',
          'They cause little disturbance at the surface.',
          'They can be designed and built quickly.',
        ],
        answer: [3],
        explanation:
          'El párrafo 4 dice lo contrario: las TBM "are expensive and can take months to design and assemble". Las otras tres ventajas aparecen en la misma frase: "far less vibration", "smooth tunnel walls" y "little disturbance at the surface".',
      },
    ],
  },
  {
    id: 'f11-rd-ap-permafrost',
    form: 11,
    section: 'reading',
    task: 'academic-passage',
    title: 'Thawing Permafrost and Carbon',
    topic: 'environment',
    difficulty: 'hard',
    paragraphs: [
      'Across vast areas of Siberia, Alaska, and northern Canada, the ground beneath the surface stays frozen all year. Scientists call this ground permafrost, defined as soil, sediment, or rock that remains at or below zero degrees Celsius for at least two consecutive years. Permafrost underlies roughly a quarter of the exposed land in the Northern Hemisphere. Above it lies a thin active layer that thaws each summer and refreezes each winter.',
      'Permafrost matters for the climate because of what it contains. Over many thousands of years, the remains of plants and animals accumulated in these cold soils, where low temperatures prevented them from fully decomposing. As a result, permafrost holds an enormous store of organic carbon, by recent estimates roughly twice as much as the atmosphere currently contains. As long as the ground stays frozen, this carbon is effectively locked away.',
      'Rising temperatures threaten that storage. The Arctic is warming more than twice as fast as the global average, and as permafrost thaws, microbes become active and begin breaking down the ancient organic matter. Where the thawed soil has access to oxygen, decomposition releases mainly carbon dioxide. In waterlogged soils, such as the bottoms of lakes and wetlands, other microbes produce methane, a gas that traps far more heat than carbon dioxide during the first few decades after its release. These gases add to the warming that caused the thaw in the first place, creating a feedback loop: warming leads to thaw, thaw releases greenhouse gases, and the additional gases cause further warming.',
      'How strong this feedback will be remains uncertain. In many places, thaw proceeds slowly from the surface downward, but where the ground contains large amounts of ice, melting can make the land collapse suddenly, forming pits and lakes that expose deeper layers to warmth. On the other hand, longer growing seasons may allow Arctic plants to absorb some of the released carbon. Most researchers expect permafrost emissions to rise gradually over the coming century rather than all at once, but they agree that these emissions will make limiting global warming more difficult.',
    ],
    questions: [
      {
        id: 'f11-rd-ap-permafrost-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'What is the passage mainly about?',
        options: [
          'How thawing frozen ground may worsen global warming',
          'Why Arctic plants grow faster in a warming climate',
          'How scientists measure the temperature of frozen soils',
          'Why methane forms mainly at the bottoms of lakes',
        ],
        answer: [0],
        explanation:
          'El texto explica qué es el permafrost, el carbono que almacena y cómo su deshielo crea "a feedback loop" que causa "further warming". El crecimiento de las plantas y el metano son detalles dentro de esa idea central.',
      },
      {
        id: 'f11-rd-ap-permafrost-q2',
        kind: 'single',
        skill: 'detail',
        paragraph: 1,
        prompt: 'According to paragraph 2, why did organic matter build up in permafrost?',
        options: [
          'Microbes in the soil converted it into methane.',
          'Plants in the Arctic grew unusually quickly.',
          'Low temperatures kept it from fully decaying.',
          'Lakes and wetlands buried it under thick ice.',
        ],
        answer: [2],
        explanation:
          'El párrafo 2 dice que los restos se acumularon en suelos fríos "where low temperatures prevented them from fully decomposing". La producción de metano por microbios ocurre al descongelarse (párrafo 3), no explica la acumulación.',
      },
      {
        id: 'f11-rd-ap-permafrost-q3',
        kind: 'single',
        skill: 'vocabulary',
        paragraph: 1,
        highlight: 'accumulated',
        prompt: 'The word "accumulated" in paragraph 2 is closest in meaning to',
        options: ['disappeared', 'built up', 'froze solid', 'moved away'],
        answer: [1],
        explanation:
          '"Accumulated" significa que se fue acumulando, que se amontonó con el tiempo ("built up"). La frase siguiente lo confirma: el permafrost "holds an enormous store of organic carbon". "Froze solid" es tentadora por el contexto frío, pero no es el significado de la palabra.',
      },
      {
        id: 'f11-rd-ap-permafrost-q4',
        kind: 'single',
        skill: 'inference',
        paragraph: 2,
        prompt: 'Based on paragraph 3, which location would most likely produce the most methane?',
        options: [
          'Dry soil on a well-drained, sunny hillside',
          'Frozen ground that has not yet thawed',
          'The thin active layer during winter',
          'Thawed sediment at the bottom of a lake',
        ],
        answer: [3],
        explanation:
          'Según el párrafo 3, el metano se produce "In waterlogged soils, such as the bottoms of lakes and wetlands". El suelo seco con oxígeno libera "mainly carbon dioxide", y el suelo congelado no tiene microbios activos.',
      },
      {
        id: 'f11-rd-ap-permafrost-q5',
        kind: 'single',
        skill: 'paragraph-relation',
        paragraph: 3,
        prompt: 'How does paragraph 4 relate to paragraph 3?',
        options: [
          'It shows that the feedback loop in paragraph 3 has already stopped.',
          'It defines a term that paragraph 3 used without any explanation.',
          'It explains why the size of the feedback in paragraph 3 is unclear.',
          'It describes a region where the process in paragraph 3 does not occur.',
        ],
        answer: [2],
        explanation:
          'El párrafo 4 empieza con "How strong this feedback will be remains uncertain" y presenta factores en ambos sentidos: el colapso repentino del suelo y las plantas que "may absorb some of the released carbon". No dice que el ciclo se haya detenido.',
      },
    ],
  },
];
