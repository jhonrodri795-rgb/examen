import type { ReadingSet } from '../../../types';

/** Simulación n.º 1 — Reading (contenido original). */
export const sets: ReadingSet[] = [
  // ---------- Complete the Words ----------
  {
    id: 'f01-rd-cw-tadpoles',
    form: 1,
    section: 'reading',
    task: 'complete-words',
    title: 'From Tadpole to Frog',
    topic: 'biology',
    difficulty: 'easy',
    text:
      'Most frogs begin life as tiny eggs laid in ponds, lakes, or slow streams. When a {{tad|pole}} hatches, {{i|t}} breathes {{thr|ough}} gills {{a|nd}} swims {{wi|th}} a {{lo|ng}} tail. {{Ov|er}} the {{ne|xt}} few {{we|eks}}, its {{bo|dy}} slowly changes in a process called metamorphosis. The tadpole grows back legs first and then front legs, while its tail is gradually absorbed into its body. Its gills disappear as lungs develop, so the young frog must swim to the surface to breathe air. Finally, the animal leaves the water and begins to hunt insects on land.',
    note: 'Fíjate en las palabras funcionales (it, through, and, with) y en la expresión de tiempo "Over the next few weeks", muy frecuente en textos de procesos.',
  },
  {
    id: 'f01-rd-cw-champagne-fairs',
    form: 1,
    section: 'reading',
    task: 'complete-words',
    title: 'The Champagne Trade Fairs',
    topic: 'history',
    difficulty: 'medium',
    text:
      'In medieval Europe, many towns held seasonal trade fairs, and the most famous took place in the County of Champagne in northeastern France. Merchants {{trav|eled}} long {{dist|ances}} to {{att|end}} them, {{bec|ause}} the {{fa|irs}} offered {{prote|ction}}, clear {{ru|les}}, and {{ma|ny}} potential {{cust|omers}}. The {{rul|ing}} counts guaranteed the safety of anyone traveling to and from the fairs, and special officials settled disputes between traders. Since these gatherings brought together buyers and sellers from across Europe, they also became early centers of banking and credit.',
    note: 'Observa la colocación "travel long distances", el conector causal "because" y la enumeración paralela "protection, clear rules, and many potential customers".',
  },
  {
    id: 'f01-rd-cw-metamorphic-rocks',
    form: 1,
    section: 'reading',
    task: 'complete-words',
    title: 'How Metamorphic Rocks Form',
    topic: 'geology',
    difficulty: 'hard',
    text:
      'Metamorphic rocks form when existing igneous, sedimentary, or older metamorphic rocks are transformed by intense heat and pressure deep within the Earth. Under {{su|ch}} extreme {{condi|tions}}, minerals {{wit|hin}} the {{ro|ck}} become {{unst|able}} and {{recrys|tallize}} into {{n|ew}}, denser {{arrang|ements}} without {{mel|ting}}. Heat {{spe|eds}} up the chemical reactions that produce minerals such as garnet and mica, whereas directed pressure aligns flat crystals into parallel layers. This alignment, called foliation, explains why slate splits into thin sheets and why gneiss displays distinctive light and dark bands.',
    note: 'Atención a los sufijos académicos (-tions, -ize, -ments) y al verbo frasal "speeds up" (acelera), que concuerda con el sujeto singular "Heat".',
  },

  // ---------- Read in Daily Life ----------
  {
    id: 'f01-rd-dl-move-in-date',
    form: 1,
    section: 'reading',
    task: 'daily-life',
    genre: 'email',
    title: 'Confirm Your Move-In Date',
    topic: 'campus-life',
    difficulty: 'easy',
    header: ['From: Office of Residential Life', 'To: Priya Nair', 'Subject: Please confirm your move-in date'],
    text:
      'Dear Priya,\n\nWelcome to Lakeview Hall! Our records show that you plan to move in on Saturday, August 23. Please confirm this date by replying to this email no later than August 10. In your reply, also choose one arrival time slot: 9–11 a.m., 12–2 p.m., or 3–5 p.m. Each slot is limited to 40 students so that elevators and moving carts are available for everyone. If you do not choose a slot, we will assign one for you.\n\nBest wishes,\nOffice of Residential Life',
    questions: [
      {
        id: 'f01-rd-dl-move-in-date-q1',
        kind: 'single',
        skill: 'purpose',
        prompt: 'What is the main purpose of the email?',
        options: [
          'To ask Priya to confirm her date and pick an arrival time',
          'To inform Priya that her move-in date has been changed',
          'To explain how Priya can reserve an elevator and a cart',
          'To remind Priya that her housing payment is due August 10',
        ],
        answer: [0],
        explanation:
          'El correo pide dos cosas: "Please confirm this date" y "choose one arrival time slot". La fecha no cambia (B), y el 10 de agosto es el plazo para responder, no para pagar (D).',
      },
      {
        id: 'f01-rd-dl-move-in-date-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'What will happen if Priya replies but does not choose a time slot?',
        options: [
          'She will have to move in on a different day.',
          'She will be placed on a waiting list for a slot.',
          'The housing office will choose a time for her.',
          'She will be allowed to arrive at any time.',
        ],
        answer: [2],
        explanation:
          'El texto dice "If you do not choose a slot, we will assign one for you": la oficina elegirá la franja. No se menciona ninguna lista de espera (B) ni un cambio de día (A).',
      },
    ],
  },
  {
    id: 'f01-rd-dl-water-shutoff',
    form: 1,
    section: 'reading',
    task: 'daily-life',
    genre: 'notice',
    title: 'Tuesday Water Shut-Off',
    topic: 'daily-life',
    difficulty: 'easy',
    header: ['NOTICE TO ALL RESIDENTS — Maple Court Apartments'],
    text:
      'Water service to the entire building will be shut off on Tuesday, May 14, from 8:00 a.m. to 12:00 p.m. so that plumbers can replace a leaking pipe in the basement. We recommend filling a few containers with water on Monday evening for drinking and cooking. When service returns, the water may look cloudy for a short time. This is normal; simply let the tap run until the water is clear. If you have questions, please contact the building manager at 555-0142.',
    questions: [
      {
        id: 'f01-rd-dl-water-shutoff-q1',
        kind: 'single',
        skill: 'detail',
        prompt: 'Why will the water be turned off on Tuesday?',
        options: [
          'The building will be cleaned before an inspection.',
          'Workers need to fix a pipe that is leaking.',
          'The water has become cloudy and unsafe to drink.',
          'The city is testing the quality of the water.',
        ],
        answer: [1],
        explanation:
          'El aviso explica: "so that plumbers can replace a leaking pipe in the basement". El agua turbia (C) es algo que puede ocurrir después de la reparación, no la causa del corte.',
      },
      {
        id: 'f01-rd-dl-water-shutoff-q2',
        kind: 'single',
        skill: 'inference',
        prompt: 'What should a resident probably do if the water looks cloudy at 12:15 p.m. on Tuesday?',
        options: [
          'Call the building manager right away.',
          'Avoid using the tap until Monday evening.',
          'Fill several containers with the cloudy water.',
          'Let the water run until it becomes clear.',
        ],
        answer: [3],
        explanation:
          'Según el aviso, el agua turbia "is normal; simply let the tap run until the water is clear". Llamar al administrador (A) es solo para dudas, y no hace falta porque el aviso ya dice que es normal.',
      },
    ],
  },
  {
    id: 'f01-rd-dl-river-sampling',
    form: 1,
    section: 'reading',
    task: 'daily-life',
    genre: 'text-message',
    title: 'River Sampling Gear',
    topic: 'campus-life',
    difficulty: 'medium',
    text:
      "Sofia (8:02 p.m.): Hi! For Saturday's river sampling trip, Dr. Kim says each pair needs waders, a thermometer, sample bottles, and a field notebook.\nDaniel (8:05 p.m.): I can bring the waders. My cousin has two pairs I can borrow.\nSofia (8:06 p.m.): Great. The biology lab lends thermometers, but the checkout desk closes at 5 on Friday, so I'll pick one up after my chemistry class that afternoon.\nDaniel (8:09 p.m.): Perfect. I'm out of sample bottles, though. Do you have any?\nSofia (8:10 p.m.): I have six, but Dr. Kim wants ten per pair. Could you buy the rest at the campus store?\nDaniel (8:12 p.m.): Sure. And I'll bring my notebook, since yours got soaked on the last trip.",
    questions: [
      {
        id: 'f01-rd-dl-river-sampling-q1',
        kind: 'single',
        skill: 'detail',
        prompt: 'How will the students get the sample bottles they need?',
        options: [
          'Sofia will bring all ten bottles from home.',
          "Daniel will borrow them from his cousin.",
          'Sofia will bring six, and Daniel will buy four.',
          'The biology lab will lend them on Friday.',
        ],
        answer: [2],
        explanation:
          'Sofia escribe "I have six, but Dr. Kim wants ten per pair" y pide a Daniel "buy the rest at the campus store" (10 − 6 = 4). El primo de Daniel presta las botas de agua ("waders"), no las botellas (B).',
      },
      {
        id: 'f01-rd-dl-river-sampling-q2',
        kind: 'single',
        skill: 'inference',
        prompt: 'Why will Daniel most likely bring his own notebook?',
        options: [
          "Sofia's notebook was damaged by water before.",
          'Dr. Kim requires each student to bring one.',
          'Sofia forgot to buy a notebook at the store.',
          "Daniel's notebook has the sampling instructions.",
        ],
        answer: [0],
        explanation:
          'Daniel dice "since yours got soaked on the last trip": el cuaderno de Sofia se mojó en la salida anterior. El profesor pide un cuaderno por pareja ("each pair needs… a field notebook"), no uno por estudiante (B).',
      },
      {
        id: 'f01-rd-dl-river-sampling-q3',
        kind: 'single',
        skill: 'vocabulary',
        prompt: 'In Daniel\'s message at 8:09 p.m., the phrase "out of" is closest in meaning to',
        options: ['outside of', 'tired of', 'made from', 'without any'],
        answer: [3],
        explanation:
          '"I\'m out of sample bottles" significa que ya no le quedan botellas ("without any"); por eso pregunta "Do you have any?". "Outside of" (A) es el sentido literal de lugar, que no encaja aquí.',
      },
    ],
  },
  {
    id: 'f01-rd-dl-pool-timetable',
    form: 1,
    section: 'reading',
    task: 'daily-life',
    genre: 'schedule',
    title: 'Community Pool Timetable',
    topic: 'daily-life',
    difficulty: 'medium',
    header: ['Riverside Community Pool — Weekly Timetable'],
    text:
      'Lap Swimming (ages 16+; lanes divided by speed)\nMon–Fri: 6:00–8:30 a.m. and 7:00–9:00 p.m.\nSat: 7:00–9:00 a.m. | Sun: 5:30–7:00 p.m.\n\nSwim Lessons (registration required)\nMon, Wed, Fri: 4:00–6:00 p.m. (two lanes remain open for lap swimming)\nSat: 9:30 a.m.–12:00 p.m.\n\nFamily Swim (children under 12 must be accompanied by an adult in the water)\nTue, Thu: 4:00–6:00 p.m.\nSat, Sun: 1:00–5:00 p.m.\n\nNote: The pool is closed every Sunday until 12:30 p.m. for cleaning. Times may change during holiday weeks; ask at the front desk for updates.',
    questions: [
      {
        id: 'f01-rd-dl-pool-timetable-q1',
        kind: 'single',
        skill: 'detail',
        prompt: 'An adult wants to swim laps at 5:00 p.m. on a Wednesday. What does the timetable indicate?',
        options: [
          'The pool is closed for cleaning at that time.',
          'Only two lanes are available for laps then.',
          'Lap swimmers must register for a lesson first.',
          'Only families with children may use the pool.',
        ],
        answer: [1],
        explanation:
          'Los miércoles de 4:00 a 6:00 p.m. hay clases, pero "two lanes remain open for lap swimming". La limpieza (A) es los domingos por la mañana, y la inscripción (C) solo se exige para las clases.',
      },
      {
        id: 'f01-rd-dl-pool-timetable-q2',
        kind: 'single',
        skill: 'inference',
        prompt: 'What can be inferred about a parent who brings an eight-year-old child to Family Swim?',
        options: [
          'The parent must register the child in advance.',
          'The parent may wait in the lobby during the swim.',
          'The parent will need to get into the water too.',
          'The child may also swim in the lap lanes on Thursday.',
        ],
        answer: [2],
        explanation:
          'El horario indica "children under 12 must be accompanied by an adult in the water": con un niño de ocho años, el adulto debe entrar al agua, así que no puede esperar fuera (B). La inscripción (A) es solo para "Swim Lessons".',
      },
      {
        id: 'f01-rd-dl-pool-timetable-q3',
        kind: 'single',
        skill: 'detail',
        prompt: 'At which of the following times is the pool unavailable to all swimmers?',
        options: ['Sunday at 10:00 a.m.', 'Saturday at 8:00 a.m.', 'Tuesday at 4:30 p.m.', 'Sunday at 6:00 p.m.'],
        answer: [0],
        explanation:
          'La nota dice "The pool is closed every Sunday until 12:30 p.m. for cleaning", así que el domingo a las 10:00 no se puede nadar. El domingo a las 6:00 p.m. (D) hay "Lap Swimming" (5:30–7:00 p.m.).',
      },
    ],
  },
  {
    id: 'f01-rd-dl-language-exchange',
    form: 1,
    section: 'reading',
    task: 'daily-life',
    genre: 'advertisement',
    title: 'Language Exchange Partners Wanted',
    topic: 'campus-life',
    difficulty: 'hard',
    header: ['Become a Conversation Partner — Global Language Exchange'],
    text:
      "Want to practice a new language while helping international students build confidence in English? The Global Language Exchange pairs you with a partner for weekly meetings: one hour in English and one hour in your partner's language, for a total of two hours a week over ten weeks. To be eligible, you must be a currently enrolled student, a native or highly fluent speaker of English, and available for the full ten weeks. First-year students may apply only with a recommendation from a language instructor. Graduate students are welcome; however, teaching assistants may not be paired with students in their own courses. Participants who complete the program receive a certificate of participation. Those who miss more than two meetings without notice will not be matched again the following term. Applications close September 20, and meetings begin the first week of October.",
    questions: [
      {
        id: 'f01-rd-dl-language-exchange-q1',
        kind: 'single',
        skill: 'purpose',
        prompt: 'What is the main purpose of the advertisement?',
        options: [
          'To announce new English courses for first-year students',
          'To explain how teaching assistants are assigned to courses',
          'To offer international students a ten-week English class',
          'To recruit students to practice languages with a partner',
        ],
        answer: [3],
        explanation:
          'El anuncio invita a participar ("Become a Conversation Partner") y detalla requisitos y compromiso semanal. No es un curso de inglés (C): son encuentros de intercambio, "one hour in English and one hour in your partner\'s language".',
      },
      {
        id: 'f01-rd-dl-language-exchange-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'What must a first-year student do in order to apply?',
        options: [
          'Prove that they speak a second language fluently',
          'Get a recommendation from a language instructor',
          'Wait until the program begins in October',
          'Agree to meet for more than two hours a week',
        ],
        answer: [1],
        explanation:
          'El texto dice "First-year students may apply only with a recommendation from a language instructor". Se exige dominio del inglés ("native or highly fluent speaker of English"), no de una segunda lengua (A).',
      },
      {
        id: 'f01-rd-dl-language-exchange-q3',
        kind: 'single',
        skill: 'inference',
        prompt: 'What can be inferred about a participant who misses three meetings without giving notice?',
        options: [
          'The participant will have to pay a program fee.',
          'The participant will get a new partner at once.',
          'The participant will not be paired again next term.',
          'The participant will be allowed to switch languages.',
        ],
        answer: [2],
        explanation:
          'Según el anuncio, "Those who miss more than two meetings without notice will not be matched again the following term"; tres ausencias superan ese límite. No se menciona ninguna tarifa (A) ni un cambio inmediato de pareja (B).',
      },
    ],
  },

  // ---------- Read an Academic Passage ----------
  {
    id: 'f01-rd-ap-roman-aqueducts',
    form: 1,
    section: 'reading',
    task: 'academic-passage',
    title: 'Roman Aqueducts and Gravity',
    topic: 'engineering',
    difficulty: 'easy',
    paragraphs: [
      'At its height, ancient Rome was home to perhaps a million people, and its residents needed enormous amounts of fresh water for drinking, bathing, and public fountains. Local wells and the Tiber River could not supply enough clean water, so Roman engineers built aqueducts, channels that carried water from distant springs and lakes into the city.',
      'Remarkably, aqueducts used no pumps. They relied entirely on gravity, which meant that the water source had to be higher than the city and the channel had to slope gently downhill along its entire length. If the slope was too steep, fast-moving water could wear away the channel; if it was too shallow, the water would stagnate. Some aqueducts dropped less than a meter for every kilometer they traveled.',
      'Keeping this steady slope across uneven land was a major challenge. Most of an aqueduct actually ran underground in covered channels that followed the natural contours of the hills. Where the route crossed a valley, engineers built the tall stone arches that people associate with aqueducts today, such as the Pont du Gard in southern France. In other places, they used inverted siphons, sealed pipes that carried water down one side of a valley and up the other under pressure.',
      'When the water reached the city, it flowed into distribution tanks that divided it among public fountains, baths, and private homes whose owners paid for a connection. Some Roman aqueducts remained in use for centuries, and a few restored channels still supply water today, which shows the skill of their builders.',
    ],
    questions: [
      {
        id: 'f01-rd-ap-roman-aqueducts-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'What is the passage mainly about?',
        options: [
          'Why ancient Rome grew into a city of a million people',
          'How Roman engineers moved water using only gravity',
          'Why the Pont du Gard is the best-known Roman structure',
          'How Roman homeowners paid for their water supply',
        ],
        answer: [1],
        explanation:
          'Todo el texto explica cómo los acueductos transportaban el agua: "They relied entirely on gravity" (pendiente, canales subterráneos, arcos, sifones y distribución). El tamaño de Roma (A) y el pago de las conexiones (D) son detalles secundarios.',
      },
      {
        id: 'f01-rd-ap-roman-aqueducts-q2',
        kind: 'single',
        skill: 'detail',
        paragraph: 1,
        prompt: 'According to paragraph 2, why did engineers avoid making the slope of an aqueduct too steep?',
        options: [
          'Water would flow too slowly to reach the city.',
          'The source would have to be lower than the city.',
          'Builders would need pumps to control the flow.',
          'Fast-moving water could wear away the channel.',
        ],
        answer: [3],
        explanation:
          'El párrafo 2 dice "If the slope was too steep, fast-moving water could wear away the channel". La opción A describe el problema contrario, el de una pendiente demasiado suave ("the water would stagnate").',
      },
      {
        id: 'f01-rd-ap-roman-aqueducts-q3',
        kind: 'single',
        skill: 'vocabulary',
        paragraph: 1,
        highlight: 'stagnate',
        prompt: 'The word "stagnate" in paragraph 2 is closest in meaning to',
        options: ['stop moving', 'spill over', 'turn salty', 'heat up'],
        answer: [0],
        explanation:
          '"Stagnate" significa estancarse: con una pendiente demasiado suave, el agua apenas avanzaba ("stop moving"), en contraste con el "fast-moving water" de la pendiente excesiva.',
      },
      {
        id: 'f01-rd-ap-roman-aqueducts-q4',
        kind: 'single',
        skill: 'inference',
        paragraph: 2,
        prompt: 'What can be inferred from paragraph 3 about the tall stone arches of aqueducts?',
        options: [
          'They were built mainly to decorate Roman cities.',
          'They removed the need for a gentle downhill slope.',
          'They formed only a small part of most aqueduct routes.',
          'They replaced underground channels in hilly areas.',
        ],
        answer: [2],
        explanation:
          'El párrafo 3 afirma que "Most of an aqueduct actually ran underground" y que los arcos se construían solo "Where the route crossed a valley"; por tanto, eran una parte pequeña del recorrido. B es falsa: la pendiente seguía siendo necesaria.',
      },
      {
        id: 'f01-rd-ap-roman-aqueducts-q5',
        kind: 'single',
        skill: 'purpose',
        paragraph: 2,
        prompt: 'Why does the author mention the Pont du Gard in paragraph 3?',
        options: [
          'To show that most aqueducts were built in France',
          'To give an example of arches used to cross a valley',
          'To explain how inverted siphons kept water under pressure',
          'To argue that arches were stronger than underground pipes',
        ],
        answer: [1],
        explanation:
          'El autor dice "Where the route crossed a valley, engineers built the tall stone arches…, such as the Pont du Gard": es un ejemplo. Los sifones (C) aparecen en la frase siguiente como una solución distinta.',
      },
    ],
  },
  {
    id: 'f01-rd-ap-ocean-acidification',
    form: 1,
    section: 'reading',
    task: 'academic-passage',
    title: 'Acidifying Oceans and Shells',
    topic: 'environment',
    difficulty: 'medium',
    paragraphs: [
      'Since the Industrial Revolution, the oceans have absorbed roughly a quarter of the carbon dioxide that human activities have released into the atmosphere. This uptake has slowed the pace of climate change, but it comes at a cost. When carbon dioxide dissolves in seawater, it forms carbonic acid, which releases hydrogen ions. As these ions accumulate, the water becomes more acidic. The average pH of surface seawater has fallen from about 8.2 to about 8.1, which corresponds to an increase in acidity of roughly 30 percent.',
      'This change matters greatly to organisms that build shells or skeletons from calcium carbonate, including corals, oysters, clams, sea urchins, and tiny swimming snails called pteropods. To make calcium carbonate, these animals need carbonate ions from the surrounding water. However, many of the extra hydrogen ions combine with carbonate ions to form bicarbonate, reducing the amount of carbonate available. As a result, organisms must spend more energy to build and maintain their shells, leaving less energy for growth and reproduction.',
      'Where carbonate becomes especially scarce, existing shells can even begin to dissolve. In laboratory experiments, pteropod shells kept in seawater with the chemistry expected later this century became pitted and thin within weeks. Young organisms appear to be the most vulnerable. On the Pacific coast of the United States, oyster hatcheries suffered massive die-offs of larvae in the late 2000s when naturally acidic deep water rose toward the surface. Hatchery managers now monitor the chemistry of incoming water and adjust it when necessary.',
      'The effects can spread through entire food webs. Pteropods, for example, are an important food source for fish such as salmon, and coral reefs provide habitat for roughly a quarter of all marine species. Some species may adapt over many generations, but scientists worry that the current rate of change is faster than anything these organisms have experienced in millions of years.',
    ],
    questions: [
      {
        id: 'f01-rd-ap-ocean-acidification-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'Which of the following best expresses the main idea of the passage?',
        options: [
          'The oceans have now stopped absorbing carbon dioxide from the air.',
          'Oyster hatcheries have discovered a way to reverse ocean acidification.',
          'More acidic seawater makes shell building harder for many sea creatures.',
          'Coral reefs provide a home for about a quarter of all marine species.',
        ],
        answer: [2],
        explanation:
          'El pasaje explica cómo la acidificación reduce los iones carbonato y dificulta construir y mantener conchas, con efectos en las cadenas tróficas. D es un dato cierto ("roughly a quarter of all marine species") pero secundario; B exagera: los criaderos solo "adjust" el agua que usan.',
      },
      {
        id: 'f01-rd-ap-ocean-acidification-q2',
        kind: 'single',
        skill: 'detail',
        paragraph: 1,
        prompt: 'According to paragraph 2, why must shell-building organisms use more energy in more acidic water?',
        options: [
          'Fewer carbonate ions are available to them.',
          'Their shells absorb the extra hydrogen ions.',
          'They must swim farther to find enough food.',
          'Bicarbonate makes their shells grow too fast.',
        ],
        answer: [0],
        explanation:
          'Los iones de hidrógeno se combinan con el carbonato y forman bicarbonato, "reducing the amount of carbonate available"; por eso "organisms must spend more energy". B usa palabras del texto ("hydrogen ions") pero describe una relación que no aparece.',
      },
      {
        id: 'f01-rd-ap-ocean-acidification-q3',
        kind: 'single',
        skill: 'vocabulary',
        paragraph: 2,
        highlight: 'vulnerable',
        prompt: 'The word "vulnerable" in paragraph 3 is closest in meaning to',
        options: ['numerous', 'adaptable', 'productive', 'easily harmed'],
        answer: [3],
        explanation:
          '"Vulnerable" significa fácil de dañar ("easily harmed"). El contexto lo confirma: las larvas de ostra sufrieron "massive die-offs". "Adaptable" (B) remite al último párrafo, pero no es sinónimo.',
      },
      {
        id: 'f01-rd-ap-ocean-acidification-q4',
        kind: 'single',
        skill: 'inference',
        paragraph: 2,
        prompt: 'What can be inferred from paragraph 3 about the oyster hatcheries?',
        options: [
          'They caused the deep water to rise toward the surface.',
          'Their managers believe water chemistry can be controlled.',
          'They stopped raising oysters after the late 2000s.',
          'Their adult oysters were harmed more than the larvae.',
        ],
        answer: [1],
        explanation:
          'Los responsables "now monitor the chemistry of incoming water and adjust it when necessary", lo que implica que creen poder controlarla. D contradice el texto: los más afectados son los jóvenes ("Young organisms appear to be the most vulnerable").',
      },
      {
        id: 'f01-rd-ap-ocean-acidification-q5',
        kind: 'single',
        skill: 'paragraph-relation',
        paragraph: 3,
        prompt: 'How does paragraph 4 relate to paragraph 3?',
        options: [
          'It questions the laboratory evidence in paragraph 3.',
          'It offers a solution to the problem in paragraph 3.',
          'It gives a second example of a hatchery die-off.',
          'It extends the effects from organisms to ecosystems.',
        ],
        answer: [3],
        explanation:
          'El párrafo 4 empieza con "The effects can spread through entire food webs": pasa de los daños en organismos concretos (párrafo 3) a las consecuencias para el ecosistema (salmones, arrecifes). No propone ninguna solución (B).',
      },
    ],
  },
  {
    id: 'f01-rd-ap-cognitive-dissonance',
    form: 1,
    section: 'reading',
    task: 'academic-passage',
    title: 'Cognitive Dissonance Theory',
    topic: 'psychology',
    difficulty: 'hard',
    paragraphs: [
      'In 1957, the social psychologist Leon Festinger proposed that people experience an uncomfortable state of tension when they hold two beliefs, or a belief and a behavior, that are inconsistent with each other. He called this state cognitive dissonance. A smoker who knows that smoking causes serious disease, for instance, faces a conflict between what she does and what she knows. According to Festinger, such tension motivates people to restore consistency, much as hunger motivates them to eat. They can do so by changing their behavior, by changing one of their beliefs, or by adding new thoughts that make the inconsistency seem less important, such as deciding that the health risks are exaggerated.',
      'The best-known test of the theory was conducted by Festinger and James Carlsmith in 1959. Participants spent an hour on deliberately dull tasks, such as turning pegs on a board a quarter turn at a time. Afterward, the experimenter asked each participant to tell the next person waiting that the tasks had been enjoyable. Some participants were paid one dollar for telling this lie, while others were paid twenty dollars. Later, when asked privately how much they had actually enjoyed the tasks, those paid only one dollar gave noticeably more positive ratings than those paid twenty.',
      'This result contradicted a simple reward-based prediction, which would expect the better-paid group to develop more favorable attitudes. Festinger and Carlsmith argued that twenty dollars, a substantial sum at the time, provided sufficient external justification for the lie, so those participants felt little dissonance. Those paid one dollar, by contrast, lacked an adequate reason for saying something they did not believe. Unable to take back their statement, they reduced their discomfort by persuading themselves that the tasks had not been so boring after all.',
      'Later research extended the theory to other situations. In one study, people who had gone through an embarrassing initiation to join a discussion group rated its dull conversation as more interesting than people who had joined easily, apparently because admitting that their effort had been wasted would have created dissonance. Similarly, after choosing between two equally attractive products, people tend to rate the chosen item more highly than before. Critics have proposed other explanations for some of these findings, but the idea that people adjust their attitudes to justify their actions remains highly influential in social psychology.',
    ],
    questions: [
      {
        id: 'f01-rd-ap-cognitive-dissonance-q1',
        kind: 'single',
        skill: 'organization',
        prompt: 'Which of the following best describes the organization of the passage?',
        options: [
          'A theory is introduced, a key experiment is explained, and further evidence is given.',
          'Two competing theories are compared, and the author argues that one is correct.',
          'Several experiments are described in the order in which their results were rejected.',
          'A common belief is presented and is then disproved with the help of new data.',
        ],
        answer: [0],
        explanation:
          'El párrafo 1 presenta la teoría de Festinger; los párrafos 2 y 3 describen e interpretan el experimento de uno y veinte dólares; el 4 añade "Later research" que amplía la teoría. Aunque se mencionan críticos, no se comparan dos teorías (B).',
      },
      {
        id: 'f01-rd-ap-cognitive-dissonance-q2',
        kind: 'single',
        skill: 'detail',
        paragraph: 1,
        prompt: 'According to paragraph 2, what were participants asked to do after finishing the tasks?',
        options: [
          'Rate the tasks in front of the experimenter',
          'Repeat the same tasks for one more hour',
          'Tell a waiting person the tasks were enjoyable',
          'Choose between one dollar and twenty dollars',
        ],
        answer: [2],
        explanation:
          'El experimentador "asked each participant to tell the next person waiting that the tasks had been enjoyable". La cantidad de dinero no la elegían los participantes (D), y la valoración se hizo "privately" (A).',
      },
      {
        id: 'f01-rd-ap-cognitive-dissonance-q3',
        kind: 'single',
        skill: 'vocabulary',
        paragraph: 2,
        highlight: 'substantial',
        prompt: 'The word "substantial" in paragraph 3 is closest in meaning to',
        options: ['symbolic', 'considerable', 'secret', 'fixed'],
        answer: [1],
        explanation:
          '"A substantial sum" es una suma considerable; por eso veinte dólares bastaban como "sufficient external justification". "Symbolic" (A) sugeriría lo contrario: una cantidad pequeña.',
      },
      {
        id: 'f01-rd-ap-cognitive-dissonance-q4',
        kind: 'single',
        skill: 'inference',
        paragraph: 2,
        prompt: 'What can be inferred about the participants who were paid twenty dollars?',
        options: [
          'They enjoyed the tasks more than the other group did.',
          'They refused to tell the next person a lie.',
          'They felt more discomfort than those paid one dollar.',
          'They could explain their lie by pointing to the money.',
        ],
        answer: [3],
        explanation:
          'Según el párrafo 3, veinte dólares "provided sufficient external justification for the lie", así que podían atribuir su mentira al dinero y sentían "little dissonance". A y C invierten los resultados descritos.',
      },
      {
        id: 'f01-rd-ap-cognitive-dissonance-q5',
        kind: 'single',
        skill: 'negative-factual',
        paragraph: 0,
        prompt: 'According to paragraph 1, which of the following is NOT a way people reduce cognitive dissonance?',
        options: [
          'Asking other people to make decisions for them',
          'Changing the behavior that causes the conflict',
          'Changing one of the inconsistent beliefs',
          'Adding thoughts that make the conflict seem minor',
        ],
        answer: [0],
        explanation:
          'El párrafo 1 menciona tres vías: "changing their behavior", "changing one of their beliefs" y "adding new thoughts that make the inconsistency seem less important". Pedir a otros que decidan no aparece en el texto.',
      },
    ],
  },
  {
    id: 'f01-rd-ap-comparative-advantage',
    form: 1,
    section: 'reading',
    task: 'academic-passage',
    title: 'The Logic of Comparative Advantage',
    topic: 'economics',
    difficulty: 'hard',
    paragraphs: [
      'Why would a country import goods that it could produce more efficiently itself? The answer lies in the principle of comparative advantage, first clearly stated by the British economist David Ricardo in 1817. Earlier, Adam Smith had argued that two countries benefit from trade when each is better at producing a different good, a situation known as absolute advantage. Ricardo went further, showing that trade can benefit both partners even when one country is more productive in every industry.',
      'Ricardo illustrated the idea with England and Portugal producing wine and cloth. To use simplified numbers, suppose that in one day a Portuguese worker can make either four barrels of wine or two bolts of cloth, while an English worker can make either one barrel of wine or one bolt of cloth. Portugal is more productive in both goods, so it has an absolute advantage in each. What matters, however, is opportunity cost: what must be given up to produce something else. For Portugal, each bolt of cloth costs two barrels of wine, but for England it costs only one. England therefore has a comparative advantage in cloth, and Portugal has a comparative advantage in wine.',
      'If each country specializes in the good it produces at the lower opportunity cost and trades for the other, total output rises. Suppose the two countries agree to exchange one bolt of cloth for one and a half barrels of wine. England can now obtain one and a half barrels of wine for each bolt of cloth it makes, instead of the single barrel it could produce at home. Portugal, meanwhile, pays only one and a half barrels for cloth that would cost it two barrels to make itself. Both countries end up able to consume more than they could on their own.',
      'The principle helps explain why wealthy, highly productive economies still import many goods. It also has important limits. The model assumes that workers can move easily from one industry to another, but in reality those who lose jobs in shrinking industries may struggle to find new work. Thus, although trade generally raises a nation\'s total income, the gains are not shared equally, which is why many economists support policies that help displaced workers.',
    ],
    questions: [
      {
        id: 'f01-rd-ap-comparative-advantage-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'What is the passage mainly about?',
        options: [
          'Why Adam Smith rejected the theory of absolute advantage',
          'How England became more productive than Portugal in cloth',
          'Why productive nations should avoid importing most goods',
          'Why both partners can gain from trade despite unequal efficiency',
        ],
        answer: [3],
        explanation:
          'El texto explica la ventaja comparativa: "trade can benefit both partners even when one country is more productive in every industry". A es incorrecta: Smith no rechazó la ventaja absoluta, fue quien la planteó.',
      },
      {
        id: 'f01-rd-ap-comparative-advantage-q2',
        kind: 'single',
        skill: 'detail',
        paragraph: 1,
        prompt: 'According to paragraph 2, why does England have a comparative advantage in cloth?',
        options: [
          'An English worker makes more cloth than a Portuguese worker.',
          'Making cloth costs England less wine than it costs Portugal.',
          'England has an absolute advantage in producing cloth.',
          'Portugal is unable to produce cloth of good quality.',
        ],
        answer: [1],
        explanation:
          'La clave es el coste de oportunidad: "For Portugal, each bolt of cloth costs two barrels of wine, but for England it costs only one". A y C son falsas: el trabajador portugués es más productivo en ambos bienes (Portugal tiene la ventaja absoluta).',
      },
      {
        id: 'f01-rd-ap-comparative-advantage-q3',
        kind: 'single',
        skill: 'vocabulary',
        paragraph: 3,
        highlight: 'displaced',
        prompt: 'The word "displaced" in paragraph 4 is closest in meaning to',
        options: ['moved to another country', 'trained in new skills', 'forced out of their jobs', 'paid much lower wages'],
        answer: [2],
        explanation:
          '"Displaced workers" son los que han perdido su empleo; el texto acaba de mencionar a "those who lose jobs in shrinking industries". A recoge el sentido literal de "desplazar", pero no encaja en este contexto.',
      },
      {
        id: 'f01-rd-ap-comparative-advantage-q4',
        kind: 'single',
        skill: 'inference',
        paragraph: 2,
        prompt: 'Based on paragraph 3, what would most likely be true if one bolt of cloth traded for only one barrel of wine?',
        options: [
          'England would gain nothing compared with making wine itself.',
          'Portugal would no longer be able to produce any wine.',
          'Both countries would gain more than at the earlier rate.',
          'England would lose its comparative advantage in cloth.',
        ],
        answer: [0],
        explanation:
          'Inglaterra gana porque obtiene "one and a half barrels of wine for each bolt of cloth… instead of the single barrel it could produce at home"; con un intercambio de 1 por 1, obtendría lo mismo que produciendo vino ella misma. D es falsa: la ventaja comparativa depende de los costes de producción, no del precio de intercambio.',
      },
      {
        id: 'f01-rd-ap-comparative-advantage-q5',
        kind: 'single',
        skill: 'purpose',
        paragraph: 1,
        prompt: 'Why does the author provide specific numbers in paragraph 2?',
        options: [
          "To prove that Ricardo's original figures were wrong",
          'To show that England was the more productive country',
          'To make the idea of opportunity cost easier to follow',
          'To explain why wine is more valuable than cloth',
        ],
        answer: [2],
        explanation:
          'El autor introduce "simplified numbers" para calcular el coste de oportunidad de cada país ("each bolt of cloth costs two barrels of wine"). B contradice el texto: Portugal es más productivo en ambos bienes.',
      },
    ],
  },
];
