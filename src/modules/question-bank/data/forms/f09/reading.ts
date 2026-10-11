import type { ReadingSet } from '../../../types';

/** Simulación n.º 9 — Reading (contenido original). */
export const sets: ReadingSet[] = [
  // ---------- Complete the Words ----------
  {
    id: 'f09-rd-cw-roman-mosaics',
    form: 9,
    section: 'reading',
    task: 'complete-words',
    title: 'Roman Mosaic Tiles',
    topic: 'art',
    difficulty: 'easy',
    text:
      'Roman artists decorated floors, walls, and fountains with mosaics, which are pictures made from many small pieces of hard material. Each {{pi|ece}}, called a tessera, {{w|as}} cut from colored stone, {{gl|ass}}, or baked {{cl|ay}}. To begin, {{wor|kers}} spread a thin {{la|yer}} of wet mortar {{ov|er}} a small area of the floor. Then they {{pre|ssed}} the {{ti|les}} into it one by one, {{foll|owing}} a drawing that showed the design. Because glass tiles reflected light, artists often used them for bright details such as eyes, jewels, and water.',
    note: 'Usa las listas para deducir: "stone, glass, or baked clay" enumera materiales. "Pressed the tiles into it" combina verbo en pasado + sustantivo plural.',
  },
  {
    id: 'f09-rd-cw-touchscreens',
    form: 9,
    section: 'reading',
    task: 'complete-words',
    title: 'How Touchscreens Sense Fingers',
    topic: 'technology',
    difficulty: 'medium',
    text:
      'Most smartphones use capacitive touchscreens, which rely on the fact that the human body conducts electricity. Beneath the {{gl|ass}} lies a thin {{gr|id}} of {{trans|parent}} conductors that {{ho|lds}} a {{ste|ady}} electric field. When a {{fin|ger}} touches the {{scr|een}}, it draws away a {{ti|ny}} amount of charge at that point. A {{contr|oller}} chip measures where the change is greatest and {{calcu|lates}} the exact position of the touch. Because plastic and cloth do not conduct electricity, ordinary gloves usually prevent the screen from responding.',
    note: 'Fíjate en la concordancia: "a thin grid … that holds" (singular → -s). "Transparent" (transparente) describe conductores que no se ven a través del cristal.',
  },
  {
    id: 'f09-rd-cw-redshift',
    form: 9,
    section: 'reading',
    task: 'complete-words',
    title: 'Redshift and an Expanding Universe',
    topic: 'astronomy',
    difficulty: 'hard',
    text:
      'When a source of light moves away from an observer, its waves are stretched toward longer wavelengths, an effect known as redshift. In 1929, Edwin Hubble compared the {{reds|hifts}} of {{nume|rous}} galaxies with their {{esti|mated}} distances. He found that {{nea|rly}} all of them were {{rece|ding}}, and that more {{rem|ote}} galaxies were moving away more {{rap|idly}}. This {{propor|tional}} relationship {{sugg|ested}} that space itself is {{expa|nding}} uniformly in every direction. This finding eventually led scientists to conclude that the universe was once far denser and hotter.',
    note: 'Aprovecha las palabras repetidas: "redshift" aparece en la primera frase y vuelve en plural ("redshifts"). "Receding" (alejándose) y "remote" (lejano) son sinónimos académicos de "moving away" y "distant".',
  },

  // ---------- Read in Daily Life ----------
  {
    id: 'f09-rd-dl-theater-crew',
    form: 9,
    section: 'reading',
    task: 'daily-life',
    genre: 'advertisement',
    title: 'Theater Crew Volunteers Wanted',
    topic: 'campus-life',
    difficulty: 'easy',
    header: ['BACKSTAGE HELP WANTED — Maple Hall Players'],
    text:
      "No acting experience? No problem! The Maple Hall Players need volunteers to build sets and make costumes for our spring musical. Set crews meet Tuesdays and Thursdays from 6 to 8 p.m. in the scene shop behind the Arts Building. Costume crews meet Saturday mornings in Room 112. We provide all tools, fabric, and training, so just wear clothes you don't mind getting dirty. Every volunteer receives two free tickets to opening night. Sign up at our table outside the Student Union this week.",
    questions: [
      {
        id: 'f09-rd-dl-theater-crew-q1',
        kind: 'single',
        skill: 'inference',
        prompt: 'What is suggested about the volunteers the group is looking for?',
        options: [
          'They must have performed in an earlier show.',
          'They need to bring their own tools and fabric.',
          'They do not need any experience on stage.',
          'They will be paid for each hour they work.',
        ],
        answer: [2],
        explanation:
          'El anuncio empieza con "No acting experience? No problem!", así que no hace falta experiencia actuando. La opción de traer herramientas es falsa: "We provide all tools, fabric, and training".',
      },
      {
        id: 'f09-rd-dl-theater-crew-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'What will every volunteer receive?',
        options: [
          'Tickets for the first performance',
          'A small part in the spring musical',
          'A discount on classes in the Arts Building',
          'A costume to keep after the show',
        ],
        answer: [0],
        explanation:
          'El texto dice "Every volunteer receives two free tickets to opening night"; "opening night" es la primera función. El vestuario se confecciona para el musical, no se regala.',
      },
    ],
  },
  {
    id: 'f09-rd-dl-day-camp',
    form: 9,
    section: 'reading',
    task: 'daily-life',
    genre: 'schedule',
    title: 'Sunny Creek Camp Weekly Plan',
    topic: 'daily-life',
    difficulty: 'easy',
    header: ['Sunny Creek Day Camp — Week 3 Activities'],
    text:
      'Every day: Drop-off 8:30–9:00 a.m. | Pick-up 3:30–4:00 p.m.\nMonday: Arts and crafts — painting rocks\nTuesday: Swimming at Lakeview Pool (bring a towel and swimsuit)\nWednesday: Nature walk and bug hunt\nThursday: Field trip to the science museum (bus leaves at 9:15 a.m. sharp)\nFriday: Talent show — families may watch at 2:30 p.m.\nPlease pack a lunch and a water bottle every day. Campers not picked up by 4:00 p.m. will wait in the camp office.',
    questions: [
      {
        id: 'f09-rd-dl-day-camp-q1',
        kind: 'single',
        skill: 'detail',
        prompt: 'What should campers bring on Tuesday that they do not need on other days?',
        options: ['A packed lunch', 'A water bottle', 'Painted rocks', 'A towel'],
        answer: [3],
        explanation:
          'Solo el martes aparece "bring a towel and swimsuit". El almuerzo y la botella de agua se piden "every day", así que no son exclusivos del martes.',
      },
      {
        id: 'f09-rd-dl-day-camp-q2',
        kind: 'single',
        skill: 'inference',
        prompt: 'What is implied about Thursday?',
        options: [
          'Campers will buy lunch at the museum.',
          'Campers should not arrive late that morning.',
          'Parents are invited to join the field trip.',
          'Pick-up will be earlier than on other days.',
        ],
        answer: [1],
        explanation:
          'El autobús sale "at 9:15 a.m. sharp" (en punto), así que llegar tarde haría perder la excursión. La invitación a las familias corresponde al viernes ("families may watch"), no al jueves.',
      },
    ],
  },
  {
    id: 'f09-rd-dl-roommate-chores',
    form: 9,
    section: 'reading',
    task: 'daily-life',
    genre: 'text-message',
    title: 'Chore Chart for Three',
    topic: 'daily-life',
    difficulty: 'medium',
    text:
      "Priya (7:02 p.m.): Now that Sam has moved in, let's redo the chore chart. I'll keep the kitchen, since I cook the most anyway.\nDaniel (7:05 p.m.): Fine by me. I can take the bathroom and the trash. Sam, could you handle vacuuming and recycling?\nSam (7:09 p.m.): Sure! What about the bills? I'm happy to pay my share.\nPriya (7:11 p.m.): Rent is already split three ways. Electricity and internet will be divided equally too, but this month's electricity bill covers the weeks before you arrived, so you can skip it. Just pay your third of the internet.\nDaniel (7:12 p.m.): I'll add you to our payment app tonight so you can see every bill as it comes in.\nSam (7:14 p.m.): Perfect, thanks. I'll vacuum this weekend.",
    questions: [
      {
        id: 'f09-rd-dl-roommate-chores-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'What are the roommates mainly doing in these messages?',
        options: [
          'Deciding how to share housework and household costs',
          'Planning a welcome dinner for their new roommate',
          'Complaining about a roommate who skips his chores',
          'Comparing the prices of different internet companies',
        ],
        answer: [0],
        explanation:
          'Primero reparten tareas ("redo the chore chart") y luego hablan de "the bills" (alquiler, electricidad e internet). La cena no se menciona; Priya solo dice que cocina más.',
      },
      {
        id: 'f09-rd-dl-roommate-chores-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'Why does Sam not have to pay for electricity this month?',
        options: [
          'Daniel has already paid the whole bill himself.',
          'Sam agreed to do extra chores instead of paying.',
          'The current bill covers a time before Sam arrived.',
          'The landlord includes electricity in the rent.',
        ],
        answer: [2],
        explanation:
          'Priya explica que "this month\'s electricity bill covers the weeks before you arrived, so you can skip it". Las tareas extra no sustituyen ningún pago en los mensajes.',
      },
      {
        id: 'f09-rd-dl-roommate-chores-q3',
        kind: 'single',
        skill: 'inference',
        prompt: "What can be inferred from Daniel's second message?",
        options: [
          'Sam has already paid his share of the rent.',
          'Daniel wants Sam to take over the trash.',
          'Priya has not paid the internet bill yet.',
          'The roommates keep track of bills with an app.',
        ],
        answer: [3],
        explanation:
          'Daniel añadirá a Sam a "our payment app" para que vea "every bill", lo que implica que gestionan las facturas con una aplicación. Que el alquiler esté "split three ways" no significa que Sam ya lo haya pagado.',
      },
    ],
  },
  {
    id: 'f09-rd-dl-snack-recall',
    form: 9,
    section: 'reading',
    task: 'daily-life',
    genre: 'notice',
    title: 'Trail Mix Recall and Refunds',
    topic: 'daily-life',
    difficulty: 'medium',
    header: ['PRODUCT RECALL NOTICE — Brookside Market'],
    text:
      'Hillcrest Snacks has voluntarily recalled its 12-ounce bags of Trail Mix Crunch with "best by" dates from June 1 to June 30, because the product may contain peanuts that are not listed on the label. Customers with peanut allergies should not eat this product. No other Hillcrest Snacks products are affected. If you bought a recalled bag, return it to the customer service desk at any Brookside Market for a full refund; a receipt is not required. If you have already thrown the bag away, bring a photo of the label showing the date, and we will refund the purchase price. Questions? Call customer service at 555-0142.',
    questions: [
      {
        id: 'f09-rd-dl-snack-recall-q1',
        kind: 'single',
        skill: 'purpose',
        prompt: 'What is the main purpose of the notice?',
        options: [
          'To announce that a snack brand will no longer be sold',
          'To explain a safety problem and how to get money back',
          'To warn customers about peanuts in all packaged snacks',
          'To advertise a new peanut-free version of a snack',
        ],
        answer: [1],
        explanation:
          'El aviso explica el riesgo ("may contain peanuts that are not listed on the label") y cómo obtener "a full refund". No afecta a todos los snacks: "No other Hillcrest Snacks products are affected".',
      },
      {
        id: 'f09-rd-dl-snack-recall-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'What should a customer who has thrown the bag away bring to the store?',
        options: [
          'The original receipt from the store',
          'Proof of a peanut allergy',
          'A note from customer service',
          'A picture that shows the date on the label',
        ],
        answer: [3],
        explanation:
          'El texto dice "If you have already thrown the bag away, bring a photo of the label showing the date". El recibo no es necesario: "a receipt is not required".',
      },
      {
        id: 'f09-rd-dl-snack-recall-q3',
        kind: 'single',
        skill: 'inference',
        prompt: 'What is implied about a bag of Trail Mix Crunch with a "best by" date of July 5?',
        options: [
          'It can be returned only with a receipt.',
          'It must be reported by phone before returning it.',
          'It is not included in the recall.',
          'It will be replaced with a new bag.',
        ],
        answer: [2],
        explanation:
          'La retirada solo incluye las fechas "from June 1 to June 30"; una bolsa con fecha del 5 de julio queda fuera. La primera opción es falsa porque "a receipt is not required".',
      },
    ],
  },
  {
    id: 'f09-rd-dl-airline-rebooking',
    form: 9,
    section: 'reading',
    task: 'daily-life',
    genre: 'email',
    title: 'Rebooking After a Canceled Connection',
    topic: 'daily-life',
    difficulty: 'hard',
    header: [
      'From: Caldera Airways Customer Care',
      'To: Elena Ruiz',
      'Subject: Re: Canceled connection in Denver — your options',
    ],
    text:
      'Dear Ms. Ruiz,\n\nWe apologize that your connecting flight from Denver to Portland (CA 482) on May 9 was canceled due to a mechanical problem. We have rebooked you on CA 486, leaving Denver at 7:40 a.m. on May 10. Because the cause was within our control, we will reimburse one night at an airport hotel and up to $40 in meals; please upload your receipts on our website within 30 days.\n\nIf this flight does not suit you, you may instead take a seat on a partner airline that evening, if one is available, or request a refund for the unused part of your ticket. Note that hotel and meal costs are not covered if you choose the refund. We have also added a $150 travel credit to your account. It is valid for one year and cannot be exchanged for cash.\n\nSincerely,\nCaldera Airways Customer Care',
    questions: [
      {
        id: 'f09-rd-dl-airline-rebooking-q1',
        kind: 'single',
        skill: 'detail',
        prompt: 'What must Ms. Ruiz do to be paid back for her hotel?',
        options: [
          'Show her boarding pass at the airport desk',
          'Call customer care before booking a room',
          'Submit her receipts online within a month',
          'Request a refund for the unused flight',
        ],
        answer: [2],
        explanation:
          'El correo indica "please upload your receipts on our website within 30 days". Pedir el reembolso del billete tiene el efecto contrario: "hotel and meal costs are not covered if you choose the refund".',
      },
      {
        id: 'f09-rd-dl-airline-rebooking-q2',
        kind: 'single',
        skill: 'inference',
        prompt: 'What would most likely happen if Ms. Ruiz chose a refund?',
        options: [
          'She would have to pay for her own hotel night.',
          'She would lose the $150 travel credit as well.',
          'She would be moved to a partner airline instead.',
          'She would receive her travel credit in cash.',
        ],
        answer: [0],
        explanation:
          'Según el texto, "hotel and meal costs are not covered if you choose the refund", así que pagaría ella el hotel. Nada indica que perdería el crédito de 150 dólares, que además "cannot be exchanged for cash".',
      },
      {
        id: 'f09-rd-dl-airline-rebooking-q3',
        kind: 'single',
        skill: 'vocabulary',
        highlight: 'suit',
        prompt: 'The word "suit" in the email is closest in meaning to',
        options: ['look good on', 'be convenient for', 'take legal action against', 'cost less for'],
        answer: [1],
        explanation:
          '"If this flight does not suit you" = si este vuelo no le conviene. "Suit" también puede significar "quedar bien (ropa)" o "demanda judicial", pero aquí habla de la conveniencia del horario.',
      },
    ],
  },

  // ---------- Read an Academic Passage ----------
  {
    id: 'f09-rd-ap-sign-languages',
    form: 9,
    section: 'reading',
    task: 'academic-passage',
    title: 'Sign Languages as Full Languages',
    topic: 'linguistics',
    difficulty: 'easy',
    paragraphs: [
      'Many people once assumed that sign languages were simply collections of gestures or a way of spelling out spoken words with the hands. Linguists now reject this view. Sign languages such as American Sign Language (ASL) are complete natural languages, with their own vocabulary and grammar, and they can express any idea that a spoken language can.',
      'One sign of this independence is that sign languages do not simply copy the spoken languages around them. British Sign Language and ASL, for example, are very different from each other, even though people in both countries speak English. In fact, ASL is historically closer to French Sign Language, because a French teacher helped found the first permanent school for deaf students in the United States in the early nineteenth century.',
      'Like spoken languages, sign languages have rules at every level. Signs are built from a small set of parts, including hand shape, location, and movement, much as spoken words are built from a small set of sounds. Changing just one of these parts can change the meaning of a sign. Grammar is also expressed through space and the face: a signer can place people at different points in space and later point back to them, and raised eyebrows can mark a yes-or-no question.',
      'Perhaps the strongest evidence comes from the way new sign languages are born. In the 1970s and 1980s, deaf children brought together at new schools in Nicaragua created a sign language of their own. Younger children who learned it from older classmates made it more regular and systematic, just as children shape spoken languages. This suggests that the human capacity for language is not tied to speech.',
    ],
    questions: [
      {
        id: 'f09-rd-ap-sign-languages-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'What is the passage mainly about?',
        options: [
          'How the first schools for deaf students were founded',
          'Why sign languages are easier to learn than spoken ones',
          'The differences between British and American signing',
          'Evidence that sign languages are complete languages',
        ],
        answer: [3],
        explanation:
          'La tesis aparece en el párrafo 1: "Sign languages … are complete natural languages", y los párrafos siguientes aportan pruebas. La diferencia entre la lengua de signos británica y la americana es solo un ejemplo del párrafo 2.',
      },
      {
        id: 'f09-rd-ap-sign-languages-q2',
        kind: 'single',
        skill: 'detail',
        paragraph: 1,
        prompt: 'According to paragraph 2, why is ASL closer to French Sign Language than to British Sign Language?',
        options: [
          'A French teacher helped found an early American deaf school.',
          'French Sign Language follows the grammar of spoken English.',
          'Many American deaf students went to school in France.',
          'British Sign Language developed much later than ASL.',
        ],
        answer: [0],
        explanation:
          'El texto dice "a French teacher helped found the first permanent school for deaf students in the United States". No se menciona que los estudiantes estadounidenses estudiaran en Francia.',
      },
      {
        id: 'f09-rd-ap-sign-languages-q3',
        kind: 'single',
        skill: 'vocabulary',
        paragraph: 3,
        highlight: 'capacity',
        prompt: 'The word "capacity" in paragraph 4 is closest in meaning to',
        options: ['size', 'space', 'ability', 'desire'],
        answer: [2],
        explanation:
          '"The human capacity for language" = la capacidad (habilidad) humana para el lenguaje. "Size" y "space" corresponden a otro sentido de "capacity" (volumen), que no encaja aquí.',
      },
      {
        id: 'f09-rd-ap-sign-languages-q4',
        kind: 'single',
        skill: 'inference',
        paragraph: 2,
        prompt: 'What can be inferred from paragraph 3 about two signs that differ only in hand shape?',
        options: [
          'They are always used together in the same sentence.',
          'They can have completely different meanings.',
          'They are used in different parts of the world.',
          'They must be produced with raised eyebrows.',
        ],
        answer: [1],
        explanation:
          'El párrafo 3 afirma que "Changing just one of these parts can change the meaning of a sign", y la forma de la mano es una de esas partes. Las cejas levantadas marcan preguntas, no diferencias entre signos.',
      },
      {
        id: 'f09-rd-ap-sign-languages-q5',
        kind: 'single',
        skill: 'purpose',
        paragraph: 3,
        prompt: 'Why does the author mention schools in Nicaragua in paragraph 4?',
        options: [
          'To show where linguists first studied sign languages',
          'To compare a new sign language with British signing',
          'To argue that deaf schools should teach spoken language',
          'To give an example of children creating a language',
        ],
        answer: [3],
        explanation:
          'Nicaragua ilustra cómo "deaf children … created a sign language of their own", prueba de que la capacidad lingüística no depende del habla. El texto no dice que allí empezaran los estudios lingüísticos.',
      },
    ],
  },
  {
    id: 'f09-rd-ap-bat-echolocation',
    form: 9,
    section: 'reading',
    task: 'academic-passage',
    title: 'How Bats Hunt by Echo',
    topic: 'biology',
    difficulty: 'medium',
    paragraphs: [
      "Many bats hunt at night, when most birds are inactive and flying insects are plentiful. To find their way and their prey in darkness, these bats rely on echolocation. A bat produces short, high-pitched calls, usually through its mouth, although some species emit them through the nose. When the sound waves strike an object, they bounce back as echoes, which the bat's large, sensitive ears detect. By analyzing these echoes, the bat builds a detailed picture of its surroundings.",
      "The information contained in an echo is surprisingly rich. The time between a call and its echo tells the bat how far away an object is, since sound travels at a nearly constant speed. Small differences in when the echo reaches each ear indicate the object's direction, and in some species slight shifts in the echo's pitch reveal whether a target is moving toward or away from the bat. Most bat calls are ultrasonic, meaning they are too high for humans to hear, and their short wavelengths reflect well off tiny objects, allowing bats to detect insects as small as a mosquito.",
      "Bats also adjust their calls as a hunt unfolds. While searching, a bat may emit only ten to twenty calls per second. Once it detects an insect, it calls more and more frequently, and in the final moments before capture the calls merge into a rapid sequence known as the feeding buzz, which can reach about 200 calls per second. This rising rate gives the bat constantly updated information about the insect's position as the distance between them shrinks.",
      "Not all bats echolocate, and the ability has triggered an evolutionary contest. Many large fruit bats find food mainly by sight and smell. Meanwhile, some moths have evolved ears that detect bat calls, which allows them to dive suddenly or fly in unpredictable patterns when a bat approaches. Certain tiger moths go further, producing clicks of their own that may warn bats of their bad taste or even interfere with the bats' echolocation.",
    ],
    questions: [
      {
        id: 'f09-rd-ap-bat-echolocation-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'What is the passage mainly about?',
        options: [
          'Why bats prefer insects to fruit as a food source',
          'How bats use sound to navigate and catch prey',
          'How moths have changed the way bats produce calls',
          'Why humans are unable to hear most bat calls',
        ],
        answer: [1],
        explanation:
          'Todo el texto explica la ecolocalización: "To find their way and their prey in darkness, these bats rely on echolocation". Las polillas solo aparecen en el último párrafo como respuesta evolutiva.',
      },
      {
        id: 'f09-rd-ap-bat-echolocation-q2',
        kind: 'single',
        skill: 'detail',
        paragraph: 1,
        prompt: 'According to paragraph 2, how does a bat determine how far away an object is?',
        options: [
          'By comparing how loud the echo is in each ear',
          'By noticing small changes in the pitch of the echo',
          'By measuring the delay before the echo returns',
          'By counting how many calls it makes per second',
        ],
        answer: [2],
        explanation:
          'El párrafo 2 dice "The time between a call and its echo tells the bat how far away an object is". Los cambios de tono indican si el objetivo se acerca o se aleja, no la distancia.',
      },
      {
        id: 'f09-rd-ap-bat-echolocation-q3',
        kind: 'single',
        skill: 'vocabulary',
        paragraph: 2,
        highlight: 'unfolds',
        prompt: 'The word "unfolds" in paragraph 3 is closest in meaning to',
        options: ['progresses', 'is planned', 'is repeated', 'comes to an end'],
        answer: [0],
        explanation:
          '"As a hunt unfolds" = a medida que la caza avanza. El párrafo describe cómo cambian las llamadas desde la búsqueda hasta la captura, es decir, a lo largo de la caza, no solo al final.',
      },
      {
        id: 'f09-rd-ap-bat-echolocation-q4',
        kind: 'single',
        skill: 'inference',
        paragraph: 2,
        prompt: 'What can be inferred from paragraph 3 about the feeding buzz?',
        options: [
          'It is used mainly to warn other bats away from food.',
          'It happens before the bat has detected an insect.',
          'It is a sound produced by moths rather than bats.',
          'It occurs when the bat is very close to its prey.',
        ],
        answer: [3],
        explanation:
          'El "feeding buzz" se produce "in the final moments before capture", cuando "the distance between them shrinks"; por tanto, el murciélago está muy cerca. Antes de detectar el insecto emite pocas llamadas ("ten to twenty calls per second").',
      },
      {
        id: 'f09-rd-ap-bat-echolocation-q5',
        kind: 'single',
        skill: 'negative-factual',
        paragraph: 3,
        prompt: 'According to paragraph 4, which of the following is NOT mentioned as a way that moths respond to bats?',
        options: [
          'Diving suddenly when a bat comes near',
          'Flying in patterns that are hard to predict',
          'Hiding among the leaves of fruit trees',
          'Making clicking sounds of their own',
        ],
        answer: [2],
        explanation:
          'El párrafo 4 menciona "dive suddenly", "fly in unpredictable patterns" y "producing clicks of their own". Esconderse entre hojas no aparece; los árboles frutales se asocian a los murciélagos frugívoros, no a las polillas.',
      },
    ],
  },
  {
    id: 'f09-rd-ap-black-death',
    form: 9,
    section: 'reading',
    task: 'academic-passage',
    title: "The Black Death's Aftermath",
    topic: 'history',
    difficulty: 'hard',
    paragraphs: [
      "The Black Death, an outbreak of plague that reached Europe in 1347, was one of the deadliest disasters in human history. Carried along trade routes from Central Asia and the Black Sea, the disease swept through Italy, France, England, and beyond within a few years. Most historians estimate that it killed between one-third and one-half of Europe's population by 1351. Its cause was not understood at the time, but modern genetic research has confirmed that the bacterium Yersinia pestis was responsible.",
      'The sudden loss of so many people transformed the economy. Before the plague, Europe had been crowded, and landlords could rely on an abundant supply of cheap labor. Afterward, workers were scarce, and survivors who labored in fields or workshops demanded higher wages. Land, by contrast, became relatively plentiful, so rents tended to fall. Many peasants discovered that they could bargain with landlords or move to estates that offered better terms.',
      "Authorities tried to resist these changes. In England, the Ordinance of Labourers of 1349 and the Statute of Labourers of 1351 attempted to fix wages at pre-plague levels and to prevent workers from leaving their employers. Such laws proved difficult to enforce, and resentment over them, combined with new taxes, contributed to the Peasants' Revolt of 1381. Over the following century, serfdom, a system in which peasants were bound to the land and owed labor to their lords, gradually declined in much of western Europe.",
      'The social consequences were equally profound. Faced with death on such a scale, some people turned to extreme religious practices; groups known as flagellants whipped themselves in public as an act of penance. Others searched for scapegoats, and Jewish communities in many towns were falsely accused of poisoning wells and were violently attacked. At the same time, the crisis encouraged practical innovations. Mediterranean ports such as Ragusa and, later, Venice began isolating arriving ships and travelers for a fixed period, a practice that gave English the word "quarantine," from the Venetian term for "forty days."',
    ],
    questions: [
      {
        id: 'f09-rd-ap-black-death-q1',
        kind: 'single',
        skill: 'organization',
        prompt: 'Which of the following best describes the organization of the passage?',
        options: [
          'It introduces a disaster and then examines its consequences.',
          'It compares competing theories about where the plague began.',
          "It traces how doctors' views of the plague changed over time.",
          'It argues that the laws passed after the plague succeeded.',
        ],
        answer: [0],
        explanation:
          'El párrafo 1 presenta la peste negra y los párrafos 2–4 analizan sus efectos económicos ("transformed the economy") y sociales ("The social consequences were equally profound"). Las leyes no tuvieron éxito: "proved difficult to enforce".',
      },
      {
        id: 'f09-rd-ap-black-death-q2',
        kind: 'single',
        skill: 'detail',
        paragraph: 1,
        prompt: 'According to paragraph 2, what happened to rents after the Black Death?',
        options: [
          'They rose because landlords had fewer tenants.',
          'They were fixed by law at pre-plague levels.',
          'They were replaced by labor owed to lords.',
          'They tended to fall as land became plentiful.',
        ],
        answer: [3],
        explanation:
          'El texto dice "Land, by contrast, became relatively plentiful, so rents tended to fall". Lo que la ley intentó fijar a niveles anteriores a la peste fueron los salarios ("wages"), no las rentas.',
      },
      {
        id: 'f09-rd-ap-black-death-q3',
        kind: 'single',
        skill: 'vocabulary',
        paragraph: 2,
        highlight: 'bound',
        prompt: 'The word "bound" in paragraph 3 is closest in meaning to',
        options: ['headed toward', 'legally tied to', 'certain to own', 'trained to work'],
        answer: [1],
        explanation:
          '"Peasants were bound to the land" = los campesinos estaban atados (legalmente) a la tierra en el sistema de servidumbre. "Bound for" sí significa "con destino a", pero aquí la preposición es "to" y el contexto es la servidumbre.',
      },
      {
        id: 'f09-rd-ap-black-death-q4',
        kind: 'single',
        skill: 'inference',
        paragraph: 2,
        prompt: 'What can be inferred from paragraph 3 about the Statute of Labourers?',
        options: [
          'It was supported by most of the peasants it affected.',
          'It caused wages to drop below pre-plague levels.',
          'It did not fully prevent wages from rising.',
          'It was passed in response to the Peasants\' Revolt.',
        ],
        answer: [2],
        explanation:
          'Si la ley "proved difficult to enforce", es lógico inferir que no logró impedir del todo la subida de salarios. No pudo ser una respuesta a la revuelta: la ley es de 1351 y la revuelta de 1381.',
      },
      {
        id: 'f09-rd-ap-black-death-q5',
        kind: 'single',
        skill: 'purpose',
        paragraph: 3,
        prompt: 'Why does the author mention the word "quarantine" in paragraph 4?',
        options: [
          'To illustrate a lasting practical response to the plague',
          'To explain how the plague first arrived in Italian ports',
          'To show that religious practices became more extreme',
          'To identify the true cause of the plague in Europe',
        ],
        answer: [0],
        explanation:
          'La palabra aparece tras "the crisis encouraged practical innovations": el aislamiento de barcos fue una respuesta práctica que perdura hasta hoy en el idioma. Las prácticas religiosas extremas se mencionan antes, como otra reacción distinta.',
      },
    ],
  },
  {
    id: 'f09-rd-ap-radiometric-dating',
    form: 9,
    section: 'reading',
    task: 'academic-passage',
    title: 'Clocks Inside Radioactive Rocks',
    topic: 'geology',
    difficulty: 'hard',
    paragraphs: [
      'For centuries, geologists could determine only the relative ages of rocks, stating that one layer was older than another without assigning an age in years. The discovery of radioactivity at the end of the nineteenth century changed this situation. Early in the twentieth century, scientists realized that the steady decay of radioactive elements could serve as a natural clock, making it possible to calculate the absolute ages of rocks and minerals.',
      "Radiometric dating depends on the behavior of unstable isotopes, known as parent isotopes, which spontaneously change into other isotopes, called daughter products. Each radioactive isotope decays at a characteristic rate, expressed as its half-life: the time required for half of the parent atoms in a sample to decay. After one half-life, 50 percent of the original parent remains; after two, 25 percent; after three, 12.5 percent. Crucially, this rate is not altered by temperature, pressure, or chemical conditions, so the clock runs at the same speed regardless of a rock's environment.",
      'To date a rock, a laboratory measures the ratio of parent atoms to daughter atoms in a suitable mineral. If the mineral contained no daughter atoms when it crystallized, this ratio reveals how many half-lives have passed since that moment. Different isotope systems suit different time spans. Uranium-238, with a half-life of about 4.5 billion years, is ideal for very old rocks, whereas carbon-14, whose half-life is roughly 5,730 years, is useful only for organic remains less than about 50,000 years old. Zircon crystals are especially valuable because they incorporate uranium but exclude lead when they form, so nearly all the lead later found in them was produced by decay.',
      'The method does have limitations. It works best on igneous rocks, which crystallize from molten material and therefore start their clocks at a definite moment. Sedimentary rocks, composed of fragments of older rocks, usually cannot be dated directly, since their grains would yield the ages of their sources rather than the age of the layer itself. Geologists therefore often date volcanic ash layers lying above and below a sedimentary bed in order to bracket its age. Using such techniques, researchers have shown that the oldest known mineral grains on Earth, zircons from Western Australia, are about 4.4 billion years old.',
    ],
    questions: [
      {
        id: 'f09-rd-ap-radiometric-dating-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'What is the passage mainly about?',
        options: [
          'Why carbon-14 is more useful than uranium for dating',
          "How the oldest minerals on Earth were found in Australia",
          'How radioactive decay is used to find the ages of rocks',
          'Why sedimentary rocks are older than igneous rocks',
        ],
        answer: [2],
        explanation:
          'El texto explica cómo "the steady decay of radioactive elements could serve as a natural clock" y cómo se aplica, con sus límites. Los circones de Australia son solo un ejemplo final.',
      },
      {
        id: 'f09-rd-ap-radiometric-dating-q2',
        kind: 'single',
        skill: 'detail',
        paragraph: 1,
        prompt: 'According to paragraph 2, which of the following is true of the rate of radioactive decay?',
        options: [
          'It increases when a rock is buried and heated.',
          "It stays the same whatever a rock's surroundings are.",
          'It is identical for all radioactive isotopes.',
          'It slows down after the first half-life has passed.',
        ],
        answer: [1],
        explanation:
          'El párrafo 2 dice "this rate is not altered by temperature, pressure, or chemical conditions". La última opción confunde la cantidad restante, que se reduce a la mitad, con la velocidad, que no cambia.',
      },
      {
        id: 'f09-rd-ap-radiometric-dating-q3',
        kind: 'single',
        skill: 'vocabulary',
        paragraph: 2,
        highlight: 'incorporate',
        prompt: 'The word "incorporate" in paragraph 3 is closest in meaning to',
        options: ['release', 'produce', 'measure', 'take in'],
        answer: [3],
        explanation:
          '"They incorporate uranium but exclude lead" = incorporan (absorben) uranio pero excluyen el plomo. El contraste con "exclude" confirma el sentido de "take in"; "release" sería lo opuesto.',
      },
      {
        id: 'f09-rd-ap-radiometric-dating-q4',
        kind: 'single',
        skill: 'inference',
        paragraph: 3,
        prompt: 'What can be inferred from paragraph 4 about the grains in a sedimentary rock?',
        options: [
          'They may give ages older than the layer itself.',
          'They are younger than the ash layers above them.',
          'They do not contain any radioactive isotopes.',
          'They formed from cooling molten material.',
        ],
        answer: [0],
        explanation:
          'Los granos dan "the ages of their sources rather than the age of the layer itself"; como proceden de "older rocks", pueden parecer más antiguos que el estrato. Los que cristalizan de material fundido son las rocas ígneas, no las sedimentarias.',
      },
      {
        id: 'f09-rd-ap-radiometric-dating-q5',
        kind: 'single',
        skill: 'purpose',
        paragraph: 2,
        prompt: 'Why does the author mention zircon crystals in paragraph 3?',
        options: [
          'To show that uranium is more common than lead',
          'To give an example of a mineral well suited to dating',
          'To explain why carbon-14 cannot date old rocks',
          'To argue that most rocks contain no daughter atoms',
        ],
        answer: [1],
        explanation:
          'Los circones son "especially valuable" porque excluyen el plomo al formarse, así que "nearly all the lead later found in them was produced by decay": cumplen la condición de no tener átomos hijos al cristalizar. No se compara la abundancia de uranio y plomo.',
      },
    ],
  },
];
