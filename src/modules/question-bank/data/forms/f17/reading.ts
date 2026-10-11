import type { ReadingSet } from '../../../types';

/** Simulación n.º 17 — Reading (contenido original). */
export const sets: ReadingSet[] = [
  // ---------- Complete the Words ----------
  {
    id: 'f17-rd-cw-natural-pigments',
    form: 17,
    section: 'reading',
    task: 'complete-words',
    title: 'Colors From Earth and Plants',
    topic: 'art',
    difficulty: 'easy',
    text:
      'Before paint could be bought in stores, artists had to prepare their own colors from natural materials. The {{old|est}} known {{pig|ments}} were {{ma|de}} from {{col|ored}} clay {{a|nd}} crushed {{ro|ck}}. Artists {{gro|und}} these {{mate|rials}} into {{fi|ne}} powder, {{th|en}} mixed them with a binder such as egg, oil, or animal glue so the color would stick to a wall or panel. Plants offered other shades: the roots of the madder plant produced a deep red, and the leaves of the indigo plant gave a strong blue. Some mineral colors, such as the blue made from lapis lazuli, were more expensive than gold.',
    note: '"The oldest known" es una colocación fija con superlativo; "were made from" es pasiva en pasado. Observa la secuencia "ground… then mixed" (primero molían, luego mezclaban).',
  },
  {
    id: 'f17-rd-cw-noise-cancelling',
    form: 17,
    section: 'reading',
    task: 'complete-words',
    title: 'Silence From Opposing Waves',
    topic: 'technology',
    difficulty: 'medium',
    text:
      'Noise-cancelling headphones reduce unwanted sound by creating sound of their own. Inside {{ea|ch}} ear {{c|up}}, a {{ti|ny}} microphone {{det|ects}} outside {{no|ise}}, and {{a|n}} electronic {{cir|cuit}} quickly {{meas|ures}} its {{sh|ape}} very {{prec|isely}}. The headphones then produce a second wave that is an exact opposite of the first: where the noise has a peak of pressure, the new wave has a trough. When the two waves meet, they cancel each other out, a process called destructive interference. This method works best for steady, low-pitched sounds, such as the hum of an airplane engine, and less well for sudden noises like voices.',
    note: 'Recuerda "an" ante sonido vocálico (an electronic). "Detects" y "measures" concuerdan con sujetos singulares (a microphone, an electronic circuit); "very" modifica al adverbio "precisely".',
  },
  {
    id: 'f17-rd-cw-comet-reservoirs',
    form: 17,
    section: 'reading',
    task: 'complete-words',
    title: 'Distant Reservoirs of Comets',
    topic: 'astronomy',
    difficulty: 'hard',
    text:
      'Most comets that enter the inner solar system come from two distant reservoirs of icy bodies. Comets {{wi|th}} relatively {{sh|ort}} orbits {{typi|cally}} originate {{i|n}} a {{flat|tened}} region {{bey|ond}} Neptune {{cal|led}} the Kuiper Belt. {{Colli|sions}} and {{gravit|ational}} tugs {{fr|om}} the giant planets gradually shift some of these icy objects inward, where the Sun\'s heat turns their ice into glowing tails of gas and dust. Comets with far longer orbits, by contrast, are thought to come from the Oort Cloud, a vast spherical shell that may extend more than a light-year from the Sun. A passing star can nudge some of them inward.',
    note: '"Typically" es un adverbio que modifica a "originate"; "flattened" (aplanada) describe la forma de disco del cinturón y "gravitational" es el adjetivo de "gravity". "Beyond" significa "más allá de".',
  },

  // ---------- Read in Daily Life ----------
  {
    id: 'f17-rd-dl-radio-weekend',
    form: 17,
    section: 'reading',
    task: 'daily-life',
    genre: 'schedule',
    title: 'Weekend Radio Program Guide',
    topic: 'daily-life',
    difficulty: 'easy',
    header: ['Riverside Public Radio 89.7 FM — Weekend Schedule'],
    text:
      'SATURDAY\n7:00–9:00 a.m. Weekend Wake-Up: local news, weather, and traffic\n9:00–11:00 a.m. The Garden Line: call-in advice on plants and lawns\n11:00 a.m.–1:00 p.m. Kitchen Table: recipes and interviews with local chefs\n1:00–5:00 p.m. Saturday Classics: orchestral music\nSUNDAY\n8:00–10:00 a.m. Sunday Paper: a review of the week\'s top stories\n10:00 a.m.–noon Story Hour: short fiction read aloud (family-friendly)\nNoon–4:00 p.m. Jazz Avenue: live recordings from local clubs\nNote: On Sunday, March 9, Jazz Avenue will begin one hour late because of live coverage of the city marathon. Garden Line call-in number: (555) 018-2240.',
    questions: [
      {
        id: 'f17-rd-dl-radio-weekend-q1',
        kind: 'single',
        skill: 'detail',
        prompt: 'A listener wants advice about a tomato plant with yellow leaves. When should she call the station?',
        options: [
          'Sunday between 8:00 and 10:00 a.m.',
          'Saturday between 11:00 a.m. and 1:00 p.m.',
          'Saturday between 9:00 and 11:00 a.m.',
          'Sunday between 10:00 a.m. and noon',
        ],
        answer: [2],
        explanation:
          'El programa de consejos sobre plantas es "The Garden Line: call-in advice on plants and lawns", el sábado de 9:00 a 11:00. La franja de 11:00 a 1:00 corresponde a "Kitchen Table" (recetas), que es la opción más tentadora si se lee la línea equivocada.',
      },
      {
        id: 'f17-rd-dl-radio-weekend-q2',
        kind: 'single',
        skill: 'inference',
        prompt: 'What can be inferred about Jazz Avenue on March 9?',
        options: [
          'It will start at 1:00 p.m.',
          'It will not be broadcast at all.',
          'It will include coverage of a race.',
          'It will end at 3:00 p.m.',
        ],
        answer: [0],
        explanation:
          'Jazz Avenue empieza normalmente a mediodía ("Noon–4:00 p.m.") y la nota dice que "will begin one hour late"; por tanto empezará a la 1:00 p.m. No se cancela, y la cobertura del maratón ocurre antes del programa, no dentro de él.',
      },
    ],
  },
  {
    id: 'f17-rd-dl-plant-mail-favor',
    form: 17,
    section: 'reading',
    task: 'daily-life',
    genre: 'text-message',
    title: 'Neighbor Asks a Travel Favor',
    topic: 'daily-life',
    difficulty: 'easy',
    text:
      'Elena (8:05 p.m.): Hi Marcus! It\'s Elena from 4B. I\'m flying to my sister\'s wedding on Thursday morning and won\'t be back until Monday night. Could you water my plants while I\'m gone? The big fern by the window needs water every day, but the cactus only needs a little on Saturday.\nElena (8:07 p.m.): Also, could you pick up my mail from the box downstairs? The spare key is under the blue flowerpot next to my door. I\'ll bring you some sweets from the trip!\nMarcus (8:20 p.m.): No problem. Have a great time!',
    questions: [
      {
        id: 'f17-rd-dl-plant-mail-favor-q1',
        kind: 'single',
        skill: 'detail',
        prompt: 'How often should Marcus water the cactus?',
        options: ['Every day', 'Once, on Saturday', 'Twice a day', 'Only on Monday night'],
        answer: [1],
        explanation:
          'Elena escribe que "the cactus only needs a little on Saturday". Regarlo "every day" es lo que necesita el helecho ("The big fern… needs water every day"), por eso esa opción es la trampa.',
      },
      {
        id: 'f17-rd-dl-plant-mail-favor-q2',
        kind: 'single',
        skill: 'purpose',
        prompt: 'Why does Elena send the messages?',
        options: [
          'To invite him to her sister\'s wedding',
          'To tell him where she hid his spare key',
          'To complain about mail left in her box',
          'To ask for his help while she is away',
        ],
        answer: [3],
        explanation:
          'Elena pide dos favores durante su viaje: "Could you water my plants while I\'m gone?" y "could you pick up my mail". Menciona la boda solo como motivo del viaje, y la llave escondida es la de ella, no la de Marcus.',
      },
    ],
  },
  {
    id: 'f17-rd-dl-damaged-lamp',
    form: 17,
    section: 'reading',
    task: 'daily-life',
    genre: 'email',
    title: 'Returning a Cracked Lamp',
    topic: 'daily-life',
    difficulty: 'medium',
    header: ['From: Customer Care, Brightline Home Goods', 'To: Priya Shah', 'Subject: Re: Damaged lamp — Order #48213'],
    text:
      'Dear Priya,\n\nWe\'re sorry to hear that your ceramic table lamp arrived with a cracked base. To start a return, log in to your account, open Order #48213, and click "Report a Problem." Please upload one photo of the damage; this allows us to skip our inspection step. We will then email you a prepaid shipping label, so the return will cost you nothing.\n\nOnce you drop the lamp off at any post office, you can choose how you would like to be compensated. A full refund will appear on your original payment method within 5–7 business days after the lamp reaches our warehouse. If you prefer a replacement, we will ship it as soon as the carrier scans your package, without waiting for the return to arrive. Please note that requests must be submitted within 30 days of delivery.\n\nKind regards,\nTomás Reyes\nCustomer Care Team',
    questions: [
      {
        id: 'f17-rd-dl-damaged-lamp-q1',
        kind: 'single',
        skill: 'purpose',
        prompt: 'What is the main purpose of the email?',
        options: [
          'To explain how to return a damaged product',
          'To apologize for a delay in shipping an order',
          'To announce a new policy on store credit',
          'To ask the customer to pay for return postage',
        ],
        answer: [0],
        explanation:
          'Tras disculparse por la lámpara rota, el correo explica los pasos: "To start a return, log in…", subir una foto, usar la etiqueta prepagada y elegir reembolso o reemplazo. No pide pagar el envío: la etiqueta es "prepaid" y "the return will cost you nothing".',
      },
      {
        id: 'f17-rd-dl-damaged-lamp-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'According to the email, when will a replacement lamp be shipped?',
        options: [
          'After the cracked lamp reaches the warehouse',
          'Once the inspection step has been completed',
          'As soon as the returned package is scanned',
          'Within 5–7 business days of the photo upload',
        ],
        answer: [2],
        explanation:
          'El texto dice: "we will ship it as soon as the carrier scans your package, without waiting for the return to arrive". La llegada al almacén ("reaches our warehouse") es la condición del reembolso, no del reemplazo.',
      },
      {
        id: 'f17-rd-dl-damaged-lamp-q3',
        kind: 'single',
        skill: 'vocabulary',
        highlight: 'compensated',
        prompt: 'The word "compensated" in the email is closest in meaning to',
        options: ['contacted', 'paid back', 'charged', 'informed'],
        answer: [1],
        explanation:
          '"Compensated" significa recibir algo a cambio de una pérdida; aquí se refiere a elegir entre "a full refund" o "a replacement", es decir, ser "paid back". "Charged" significa lo contrario (cobrar).',
      },
    ],
  },
  {
    id: 'f17-rd-dl-chorale-auditions',
    form: 17,
    section: 'reading',
    task: 'daily-life',
    genre: 'advertisement',
    title: 'University Chorale Auditions',
    topic: 'campus-life',
    difficulty: 'medium',
    header: ['SING WITH US! — University Chorale Spring Auditions'],
    text:
      'The University Chorale is looking for new sopranos, altos, tenors, and basses for the spring semester. No previous choir experience is required, but you should be able to match pitch and learn new music quickly.\n\nWhen and where: Monday, January 19, and Tuesday, January 20, 4:00–8:00 p.m., Room 210, Hollis Music Building. Sign up for a 10-minute slot on the sheet outside the room.\n\nWhat to prepare: one short song of your choice (about one minute), sung without accompaniment. You will also sing a few scales and repeat short melodies played on the piano. Reading music is helpful but not required.\n\nCommitment: Members rehearse Tuesdays and Thursdays from 6:30 to 8:30 p.m. and perform in two concerts each semester. Missing more than three rehearsals may mean sitting out the next concert. Members earn one academic credit per semester.',
    questions: [
      {
        id: 'f17-rd-dl-chorale-auditions-q1',
        kind: 'single',
        skill: 'detail',
        prompt: 'What must students prepare for the audition?',
        options: [
          'A piece to perform on the piano',
          'A recording of a past performance',
          'A list of choirs they have joined',
          'A short song with no instruments',
        ],
        answer: [3],
        explanation:
          'El anuncio pide "one short song of your choice (about one minute), sung without accompaniment", es decir, sin instrumentos. El piano solo se usa para tocar melodías que el aspirante debe repetir, no para que él toque.',
      },
      {
        id: 'f17-rd-dl-chorale-auditions-q2',
        kind: 'single',
        skill: 'inference',
        prompt: 'What can be inferred about a student who cannot read music?',
        options: [
          'He must first take a course in music theory.',
          'He may still be accepted into the chorale.',
          'He will be placed in the tenor section.',
          'He should audition on Tuesday instead.',
        ],
        answer: [1],
        explanation:
          'El texto dice "Reading music is helpful but not required" y "No previous choir experience is required"; por tanto, puede ser admitido aunque no sepa leer partituras. Nada indica cursos previos ni asignación de voz.',
      },
      {
        id: 'f17-rd-dl-chorale-auditions-q3',
        kind: 'single',
        skill: 'detail',
        prompt: 'What may happen to a member who misses four rehearsals?',
        options: [
          'The member may not sing in the next concert.',
          'The member will lose the academic credit.',
          'The member will have to audition again next term.',
          'The member must attend extra rehearsals.',
        ],
        answer: [0],
        explanation:
          'Cuatro faltas superan el límite: "Missing more than three rehearsals may mean sitting out the next concert". El crédito académico se menciona en el anuncio, pero no se relaciona con las ausencias, por eso esa opción es una trampa.',
      },
    ],
  },
  {
    id: 'f17-rd-dl-drought-rules',
    form: 17,
    section: 'reading',
    task: 'daily-life',
    genre: 'notice',
    title: 'Stage 2 Watering Restrictions',
    topic: 'daily-life',
    difficulty: 'hard',
    header: ['CEDAR VALLEY WATER DISTRICT — Notice to All Customers'],
    text:
      'Because reservoir levels have fallen below 40 percent of capacity, Stage 2 drought restrictions take effect on Monday, July 7.\n\nOutdoor watering with sprinklers is limited to two days per week, based on the last digit of your street address:\n• Addresses ending in 0, 2, 4, 6, or 8: Tuesday and Saturday\n• Addresses ending in 1, 3, 5, 7, or 9: Wednesday and Sunday\nOn assigned days, sprinklers may be used only before 9:00 a.m. or after 7:00 p.m. Hand watering with a hose fitted with an automatic shut-off nozzle is permitted on any day, as is drip irrigation for vegetable gardens.\n\nWashing driveways or sidewalks is prohibited at all times, except when necessary for health or safety. Penalties: a written warning for a first offense, a $100 fine for a second offense, and a $250 fine for each additional offense.\n\nCustomers with lawns planted within the last 30 days may apply for a temporary exemption at any District office.',
    questions: [
      {
        id: 'f17-rd-dl-drought-rules-q1',
        kind: 'single',
        skill: 'detail',
        prompt: 'On which days may a resident of 417 Oak Street use a sprinkler?',
        options: [
          'Tuesday and Saturday',
          'Any day before 9:00 a.m.',
          'Wednesday and Sunday',
          'Sunday after 7:00 p.m. only',
        ],
        answer: [2],
        explanation:
          'La dirección 417 termina en 7, y el aviso indica "Addresses ending in 1, 3, 5, 7, or 9: Wednesday and Sunday". "Tuesday and Saturday" corresponde a las direcciones pares; el horario (antes de las 9:00 o después de las 7:00) se aplica solo en los días asignados.',
      },
      {
        id: 'f17-rd-dl-drought-rules-q2',
        kind: 'single',
        skill: 'inference',
        prompt: 'A customer has already received a written warning. What will most likely happen if she breaks the rules again?',
        options: [
          'She will receive a second written warning.',
          'She will have to pay a fine of $250.',
          'Her water service will be cut off.',
          'She will be charged a $100 fine.',
        ],
        answer: [3],
        explanation:
          'El aviso escrito corresponde a la primera infracción, así que la siguiente sería la segunda: "a $100 fine for a second offense". Los $250 son para "each additional offense" (tercera en adelante), la trampa más probable.',
      },
      {
        id: 'f17-rd-dl-drought-rules-q3',
        kind: 'single',
        skill: 'detail',
        prompt: 'Which activity is allowed on any day of the week?',
        options: [
          'Running a sprinkler early in the morning',
          'Watering vegetables with a drip system',
          'Washing a sidewalk with a hose nozzle',
          'Watering a new lawn without an exemption',
        ],
        answer: [1],
        explanation:
          'El aviso dice que el riego manual con boquilla automática "is permitted on any day, as is drip irrigation for vegetable gardens". Los aspersores solo se usan en los días asignados, aunque sea temprano, y lavar aceras "is prohibited at all times".',
      },
    ],
  },

  // ---------- Read an Academic Passage ----------
  {
    id: 'f17-rd-ap-rain-gardens',
    form: 17,
    section: 'reading',
    task: 'academic-passage',
    title: 'Rain Gardens and Green Roofs',
    topic: 'environment',
    difficulty: 'easy',
    paragraphs: [
      'In a forest or meadow, most rainwater soaks into the ground, where soil and roots slow it down and filter it. In cities, however, much of the land is covered by roofs, roads, and parking lots. These hard surfaces are impermeable, meaning that water cannot pass through them. During a heavy storm, rain runs quickly across them into drains, carrying oil, litter, and other pollutants. When too much water arrives at once, sewers can overflow and streets can flood.',
      'Rain gardens offer one solution. A rain garden is a shallow, bowl-shaped area planted with grasses, shrubs, and flowers that can tolerate both wet and dry conditions. It is usually placed where water naturally collects, such as at the bottom of a slope or beside a parking lot. After a storm, the garden holds runoff for a short time while the water slowly sinks into the soil. Along the way, plants and soil microbes remove many of the pollutants.',
      'Green roofs work on a similar principle, but higher up. A layer of lightweight soil and hardy plants is spread over a waterproof sheet on top of a building. The soil absorbs rain like a sponge, and the plants release part of that water back into the air. As a result, less water flows off the roof, and the water that does drain away leaves more slowly.',
      'These approaches bring other benefits as well. Green roofs insulate the buildings beneath them, which lowers heating and cooling costs, and both features provide habitat for birds and insects. Although they cannot replace sewer systems entirely, they help cities handle storms in a more natural and less expensive way.',
    ],
    questions: [
      {
        id: 'f17-rd-ap-rain-gardens-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'What is the passage mainly about?',
        options: [
          'Why forests absorb more rain than meadows',
          'How two designs help cities manage rainwater',
          'Why cities should replace their sewer systems',
          'How pollutants harm plants in urban gardens',
        ],
        answer: [1],
        explanation:
          'El texto presenta el problema del agua de lluvia en las ciudades y dos soluciones: "Rain gardens offer one solution" y "Green roofs work on a similar principle". La opción de reemplazar las alcantarillas contradice el párrafo 4: "they cannot replace sewer systems entirely".',
      },
      {
        id: 'f17-rd-ap-rain-gardens-q2',
        kind: 'single',
        skill: 'vocabulary',
        paragraph: 1,
        highlight: 'tolerate',
        prompt: 'The word "tolerate" in paragraph 2 is closest in meaning to',
        options: ['require', 'avoid', 'produce', 'survive'],
        answer: [3],
        explanation:
          '"Tolerate" significa soportar o resistir: las plantas sobreviven tanto en condiciones húmedas como secas ("both wet and dry conditions"). "Require" (necesitar) no encaja, porque no necesitan ambas condiciones a la vez.',
      },
      {
        id: 'f17-rd-ap-rain-gardens-q3',
        kind: 'single',
        skill: 'detail',
        paragraph: 0,
        prompt: 'According to paragraph 1, what happens when heavy rain falls on hard city surfaces?',
        options: [
          'It flows quickly into drains and picks up pollutants.',
          'It soaks slowly into the soil beneath the pavement.',
          'It evaporates before it is able to reach the sewers.',
          'It is filtered by roots growing between the roads.',
        ],
        answer: [0],
        explanation:
          'El párrafo 1 dice: "rain runs quickly across them into drains, carrying oil, litter, and other pollutants". Filtrarse lentamente en el suelo es lo que ocurre en un bosque o pradera, no en la ciudad.',
      },
      {
        id: 'f17-rd-ap-rain-gardens-q4',
        kind: 'single',
        skill: 'inference',
        paragraph: 2,
        prompt: 'What can be inferred from paragraph 3 about a building with an ordinary roof?',
        options: [
          'It loses less heat during the winter.',
          'It needs a thicker waterproof sheet.',
          'Rain drains off its roof more quickly.',
          'It attracts more birds and insects.',
        ],
        answer: [2],
        explanation:
          'Con un techo verde "less water flows off the roof, and the water that does drain away leaves more slowly"; se deduce que en un techo normal el agua escurre más rápido. Lo del calor es al revés: los techos verdes son los que aíslan ("insulate").',
      },
      {
        id: 'f17-rd-ap-rain-gardens-q5',
        kind: 'single',
        skill: 'negative-factual',
        prompt: 'All of the following are mentioned as benefits of rain gardens or green roofs EXCEPT',
        options: [
          'making sewer systems unnecessary',
          'lowering heating and cooling costs',
          'removing pollutants from runoff',
          'providing habitat for wildlife',
        ],
        answer: [0],
        explanation:
          'El párrafo 4 aclara que "they cannot replace sewer systems entirely", así que no eliminan la necesidad de alcantarillas. Las demás ventajas sí aparecen: "lowers heating and cooling costs", "remove many of the pollutants" y "habitat for birds and insects".',
      },
    ],
  },
  {
    id: 'f17-rd-ap-sleep-memory',
    form: 17,
    section: 'reading',
    task: 'academic-passage',
    title: 'How Sleep Strengthens Memory',
    topic: 'psychology',
    difficulty: 'medium',
    paragraphs: [
      'For a long time, sleep was viewed as a period when the brain simply rested. Research over the past several decades, however, shows that the sleeping brain is highly active and that some of this activity helps preserve what we learned during the day. When we first acquire new information, the memory is fragile and easily disrupted. Through a process called consolidation, it gradually becomes more stable and is linked to existing knowledge.',
      'A structure called the hippocampus plays a central role in this process. During waking hours, it rapidly records the details of new experiences. Then, during deep slow-wave sleep, the hippocampus appears to "replay" these patterns of activity. Studies in rats have shown that groups of neurons that fired while an animal explored a maze fire again, in a similar order, while it sleeps. This replay is thought to transfer information gradually to the cortex, the brain\'s outer layer, where memories can be stored for the long term.',
      'Different stages of sleep may support different kinds of memory. Slow-wave sleep seems especially important for facts and events, such as vocabulary words or the content of a lecture. Rapid eye movement (REM) sleep, the stage most associated with vivid dreaming, has been linked to emotional memories and to certain skills. Because the two stages alternate in cycles throughout the night, a full night of sleep provides repeated opportunities for both types of processing.',
      'These findings have practical implications for students. In experiments, people who slept after learning a list of word pairs usually recalled more of them the next day than people who stayed awake for the same length of time. Staying up all night to study, by contrast, may leave newly learned material poorly consolidated. Even a short nap after studying can produce measurable benefits.',
    ],
    questions: [
      {
        id: 'f17-rd-ap-sleep-memory-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'Which of the following best states the main idea of the passage?',
        options: [
          'The hippocampus is the only brain area involved in memory.',
          'Dreams during REM sleep reveal what a person learned that day.',
          'Sleep plays an active role in making new memories more stable.',
          'Students remember more when they study late into the night.',
        ],
        answer: [2],
        explanation:
          'El pasaje sostiene que el cerebro dormido "is highly active" y que esa actividad ayuda a la "consolidation" de la memoria; los párrafos siguientes explican el mecanismo y sus consecuencias. La idea de estudiar de noche contradice el párrafo 4.',
      },
      {
        id: 'f17-rd-ap-sleep-memory-q2',
        kind: 'single',
        skill: 'vocabulary',
        paragraph: 0,
        highlight: 'fragile',
        prompt: 'The word "fragile" in paragraph 1 is closest in meaning to',
        options: ['easily damaged', 'highly detailed', 'quickly formed', 'rarely used'],
        answer: [0],
        explanation:
          '"Fragile" significa frágil; el propio texto lo aclara con "and easily disrupted" (fácil de alterar). "Quickly formed" puede tentar porque el hipocampo registra rápido, pero no es el significado de la palabra.',
      },
      {
        id: 'f17-rd-ap-sleep-memory-q3',
        kind: 'single',
        skill: 'purpose',
        paragraph: 1,
        prompt: 'Why does the author mention rats exploring a maze in paragraph 2?',
        options: [
          'To show that rats remember mazes better than humans',
          'To explain how the cortex differs from the hippocampus',
          'To argue that slow-wave sleep is not needed for memory',
          'To give evidence that brain activity repeats in sleep',
        ],
        answer: [3],
        explanation:
          'Las ratas ilustran el "replay": "groups of neurons that fired while an animal explored a maze fire again, in a similar order, while it sleeps". Es una prueba de la repetición de actividad, no una comparación con humanos.',
      },
      {
        id: 'f17-rd-ap-sleep-memory-q4',
        kind: 'single',
        skill: 'detail',
        paragraph: 2,
        prompt: 'According to paragraph 3, REM sleep has been linked to',
        options: [
          'memory for new vocabulary words',
          'memories that involve emotions',
          'the content of a recent lecture',
          'the long-term storage of facts',
        ],
        answer: [1],
        explanation:
          'El párrafo 3 dice que el sueño REM "has been linked to emotional memories and to certain skills". El vocabulario y el contenido de una clase se asocian con el "slow-wave sleep", la trampa más probable.',
      },
      {
        id: 'f17-rd-ap-sleep-memory-q5',
        kind: 'single',
        skill: 'inference',
        paragraph: 3,
        prompt: 'What can be inferred from paragraph 4 about students who stay up all night before an exam?',
        options: [
          'They remember more because they study for longer.',
          'They are unable to learn any new information at all.',
          'They recall word pairs better than students who nap.',
          'They may not retain the material as well as they hope.',
        ],
        answer: [3],
        explanation:
          'El texto advierte que pasar la noche estudiando "may leave newly learned material poorly consolidated"; se deduce que recordarán peor lo estudiado. Decir que no pueden aprender nada es una exageración que el texto no afirma.',
      },
    ],
  },
  {
    id: 'f17-rd-ap-moral-hazard',
    form: 17,
    section: 'reading',
    task: 'academic-passage',
    title: 'When Protection Changes Behavior',
    topic: 'economics',
    difficulty: 'hard',
    paragraphs: [
      'Insurance exists to protect people from losses they could not easily bear on their own. A homeowner pays a modest premium each year, and in exchange the insurer agrees to cover the cost of a fire or a burst pipe. Economists have long noticed, however, that such protection can subtly alter the very behavior that leads to losses. When people no longer bear the full cost of a risky action, they may become less careful. This tendency is known as moral hazard.',
      'The term does not imply that insured people are dishonest. Moral hazard usually arises from ordinary, rational decisions. A driver with full car insurance, for example, might park on a poorly lit street instead of paying for a garage, since any theft would be largely covered. Similarly, someone whose medical bills are fully covered may visit the doctor more often for minor problems. The underlying problem is one of information: insurers cannot observe every action their customers take, so they cannot simply write a contract that pays only when the customer has behaved responsibly.',
      'Insurers therefore design policies that leave part of the risk with the customer. A deductible requires the policyholder to pay the first portion of any loss, and a co-payment requires a patient to pay a share of each medical bill. Because customers still lose something when things go wrong, they retain a reason to take precautions. Some insurers go further and reward careful behavior directly, offering lower premiums to drivers with clean records or to buildings equipped with smoke detectors and sprinklers.',
      'Moral hazard also appears well beyond the insurance industry. When governments have rescued large banks during financial crises, critics have argued that such rescues encourage future recklessness: if managers expect to be saved from failure, they may make riskier investments, knowing that taxpayers will absorb much of any loss. Policymakers thus face a genuine dilemma. Protection against disaster is valuable, yet the more complete the protection, the weaker the incentive to avoid disaster in the first place.',
    ],
    questions: [
      {
        id: 'f17-rd-ap-moral-hazard-q1',
        kind: 'single',
        skill: 'organization',
        prompt: 'Which of the following best describes the organization of the passage?',
        options: [
          'A concept is defined, explained, limited by remedies, and applied more widely.',
          'Two competing theories of insurance are compared, and one is finally rejected.',
          'A historical problem is traced, and the solution that ended it is evaluated.',
          'Several examples are given to show that insured people tend to be dishonest.',
        ],
        answer: [0],
        explanation:
          'El párrafo 1 define el riesgo moral ("This tendency is known as moral hazard"), el 2 explica su causa, el 3 describe soluciones (deducibles, copagos) y el 4 lo aplica a otro ámbito ("well beyond the insurance industry"). La última opción contradice "does not imply that insured people are dishonest".',
      },
      {
        id: 'f17-rd-ap-moral-hazard-q2',
        kind: 'single',
        skill: 'vocabulary',
        paragraph: 2,
        highlight: 'retain',
        prompt: 'The word "retain" in paragraph 3 is closest in meaning to',
        options: ['lose', 'question', 'keep', 'share'],
        answer: [2],
        explanation:
          '"Retain" significa conservar o mantener: como el cliente sigue perdiendo algo, "they retain a reason to take precautions", es decir, conservan un motivo para ser prudentes. "Lose" es justo lo contrario.',
      },
      {
        id: 'f17-rd-ap-moral-hazard-q3',
        kind: 'single',
        skill: 'detail',
        paragraph: 1,
        prompt: 'According to paragraph 2, why can\'t insurers write contracts that pay only when customers have acted responsibly?',
        options: [
          'Government regulators do not allow such contracts.',
          'They cannot see all of the actions customers take.',
          'Customers refuse to buy policies with such terms.',
          'Careful customers would then pay higher premiums.',
        ],
        answer: [1],
        explanation:
          'El párrafo 2 explica que el problema es de información: "insurers cannot observe every action their customers take". El texto no menciona reguladores ni rechazo de los clientes.',
      },
      {
        id: 'f17-rd-ap-moral-hazard-q4',
        kind: 'single',
        skill: 'inference',
        paragraph: 2,
        prompt: 'What can be inferred from paragraph 3 about a policy with no deductible or co-payment?',
        options: [
          'It would be cheaper for insurance companies to offer.',
          'It would be prohibited in most insurance markets.',
          'It would lead customers to install more sprinklers.',
          'It would give customers less reason to avoid losses.',
        ],
        answer: [3],
        explanation:
          'Los deducibles y copagos existen para que el cliente siga perdiendo algo y así "retain a reason to take precautions"; sin ellos, ese incentivo se debilitaría. Los rociadores aparecen en el texto, pero como ejemplo de prima reducida, no como efecto de una póliza sin deducible.',
      },
      {
        id: 'f17-rd-ap-moral-hazard-q5',
        kind: 'single',
        skill: 'purpose',
        paragraph: 3,
        prompt: 'Why does the author discuss government rescues of banks in paragraph 4?',
        options: [
          'To argue that banks should never be allowed to fail',
          'To show that taxpayers benefit from financial crises',
          'To show that moral hazard can occur outside insurance',
          'To explain how deductibles are used by large banks',
        ],
        answer: [2],
        explanation:
          'El párrafo empieza con "Moral hazard also appears well beyond the insurance industry" y usa los rescates bancarios como ejemplo. El autor presenta un dilema, no defiende que los bancos nunca deban quebrar, y los contribuyentes asumen pérdidas, no se benefician.',
      },
    ],
  },
  {
    id: 'f17-rd-ap-demographic-transition',
    form: 17,
    section: 'reading',
    task: 'academic-passage',
    title: 'Stages of Demographic Transition',
    topic: 'sociology',
    difficulty: 'hard',
    paragraphs: [
      'Demographers often describe long-term population change with a framework known as the demographic transition model. The model is based largely on the historical experience of Europe and North America, and it divides a society\'s development into a series of stages defined by birth rates and death rates. The difference between the two rates, called the rate of natural increase, determines whether a population grows, shrinks, or remains stable. In its simplest form, the model has four stages.',
      'In the first stage, typical of preindustrial societies, both birth and death rates are high. Families have many children, but disease, poor nutrition, and unsafe water cause many people, especially infants, to die young. Because births and deaths roughly balance, the population grows only slowly. The second stage begins when improvements in food supply, sanitation, and medicine cause death rates to fall sharply. Birth rates, however, remain high for some time, since cultural traditions and family expectations change more slowly than mortality does. The result is rapid population growth. Much of Europe experienced this surge during the nineteenth century.',
      'In the third stage, birth rates finally begin to decline. Several factors contribute to this shift. As more children survive, parents no longer need to have many births to ensure that some reach adulthood. Urbanization also changes the economics of family life: on a farm, children can contribute labor, but in a city they are costly to raise and educate. Wider access to schooling for women and to contraception further reduces family size. In the fourth stage, both birth and death rates are low, and population growth levels off.',
      'The model has proven useful, but it has limitations. It describes broad patterns rather than predicting them precisely, and many developing countries have moved through the stages far faster than Europe did, partly because modern medicine spread quickly. Some researchers have also proposed a fifth stage, observed in countries such as Japan and Italy, in which birth rates have fallen so low that populations are beginning to shrink.',
    ],
    questions: [
      {
        id: 'f17-rd-ap-demographic-transition-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'What is the main purpose of the passage?',
        options: [
          'To argue that every country must pass through five stages',
          'To compare population policies in Europe and in Japan',
          'To explain why death rates rose in preindustrial societies',
          'To describe a model of population change and its limits',
        ],
        answer: [3],
        explanation:
          'El texto presenta "the demographic transition model", describe sus etapas y termina con "it has limitations". No afirma que todos los países deban pasar por cinco etapas: la quinta es solo una propuesta ("Some researchers have also proposed").',
      },
      {
        id: 'f17-rd-ap-demographic-transition-q2',
        kind: 'single',
        skill: 'detail',
        paragraph: 1,
        prompt: 'According to paragraph 2, why does the population grow rapidly in the second stage?',
        options: [
          'Birth rates rise as food becomes more plentiful.',
          'Death rates fall while birth rates stay high.',
          'Families move from farms into growing cities.',
          'Infant deaths increase in crowded housing.',
        ],
        answer: [1],
        explanation:
          'En la segunda etapa "death rates… fall sharply" mientras que "Birth rates, however, remain high for some time"; esa diferencia produce "rapid population growth". La natalidad no sube: se mantiene alta.',
      },
      {
        id: 'f17-rd-ap-demographic-transition-q3',
        kind: 'single',
        skill: 'vocabulary',
        paragraph: 2,
        highlight: 'ensure',
        prompt: 'The word "ensure" in paragraph 3 is closest in meaning to',
        options: ['make certain', 'hope for', 'rule out', 'find out'],
        answer: [0],
        explanation:
          '"Ensure" significa asegurar o garantizar: los padres tenían muchos hijos para garantizar ("make certain") que algunos llegaran a adultos. "Hope for" (esperar, desear) es más débil y no expresa la idea de garantía.',
      },
      {
        id: 'f17-rd-ap-demographic-transition-q4',
        kind: 'single',
        skill: 'negative-factual',
        paragraph: 2,
        prompt: 'According to paragraph 3, all of the following contribute to falling birth rates EXCEPT',
        options: [
          'more children surviving to adulthood',
          'the cost of raising children in cities',
          'a sharp rise in deaths from disease',
          'wider access to education for women',
        ],
        answer: [2],
        explanation:
          'El párrafo 3 menciona la mayor supervivencia infantil ("As more children survive"), la urbanización ("costly to raise and educate") y la educación de las mujeres. Un aumento de muertes por enfermedad no aparece; al contrario, la mortalidad ya ha bajado.',
      },
      {
        id: 'f17-rd-ap-demographic-transition-q5',
        kind: 'single',
        skill: 'inference',
        paragraph: 3,
        prompt: 'What can be inferred about a country in the proposed fifth stage?',
        options: [
          'Its deaths now outnumber its births.',
          'Its death rate is rising sharply.',
          'It has not yet reached the fourth stage.',
          'Its population is growing quickly.',
        ],
        answer: [0],
        explanation:
          'Si "birth rates have fallen so low that populations are beginning to shrink", la natalidad es menor que la mortalidad, ya que la diferencia entre ambas "determines whether a population grows, shrinks". El texto no dice que la mortalidad suba.',
      },
    ],
  },
];
