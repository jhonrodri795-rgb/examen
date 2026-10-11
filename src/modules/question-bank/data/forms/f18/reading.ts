import type { ReadingSet } from '../../../types';

/** Simulación n.º 18 — Reading (contenido original). */
export const sets: ReadingSet[] = [
  // ---------- Complete the Words ----------
  {
    id: 'f18-rd-cw-roundabouts',
    form: 18,
    section: 'reading',
    task: 'complete-words',
    title: 'Roundabouts and Traffic Safety',
    topic: 'engineering',
    difficulty: 'easy',
    text:
      'Roundabouts are circular intersections that many cities now use instead of traffic lights. Drivers {{ente|ring}} the {{cir|cle}} must {{yi|eld}} to {{vehi|cles}} that {{a|re}} already {{mov|ing}} around {{t|he}} central {{isl|and}}. Because {{a|ll}} traffic {{fl|ows}} in one direction, the most dangerous crashes, such as side impacts at high speed, become rare. Vehicles also slow down without stopping completely, so traffic keeps moving and fewer cars wait in long lines. Roundabouts also save energy because they need no electricity to operate.',
    note: '"Yield to" significa ceder el paso. "Vehicles that are already moving" usa el presente continuo con sujeto plural (vehicles → are). Fíjate en "Because all traffic flows…": el verbo lleva -s porque "traffic" es incontable.',
  },
  {
    id: 'f18-rd-cw-microplastics',
    form: 18,
    section: 'reading',
    task: 'complete-words',
    title: 'Plastic in the Ocean Food Chain',
    topic: 'environment',
    difficulty: 'medium',
    text:
      'Microplastics, fragments of plastic smaller than five millimeters, are now found in every part of the ocean. Because {{th|ey}} are {{s|o}} small, {{drif|ting}} organisms {{cal|led}} plankton {{of|ten}} mistake {{th|em}} for {{fo|od}}. Small {{fi|sh}} then {{e|at}} the {{plan|kton}}, and larger predators eat the small fish. In this way, plastic particles and the pollutants that cling to them can pass from one level of the food chain to the next, eventually reaching fish and shellfish that people eat.',
    note: '"Mistake X for Y" significa confundir X con Y; el pronombre "them" remite a "microplastics". La estructura "so + adjetivo" (so small) expresa causa, y "then" marca el siguiente paso de la cadena alimentaria.',
  },
  {
    id: 'f18-rd-cw-attribution-error',
    form: 18,
    section: 'reading',
    task: 'complete-words',
    title: 'Blaming Character Over Circumstance',
    topic: 'psychology',
    difficulty: 'hard',
    text:
      "Psychologists use the term fundamental attribution error for a common bias in how we explain other people's actions. When {{obse|rvers}} watch {{som|eone}} behave {{rud|ely}}, they {{typi|cally}} assume {{th|at}} the {{beha|vior}} reflects a stable {{perso|nality}} trait {{rat|her}} than {{temp|orary}} circumstances. However, {{su|ch}} behavior is often a response to pressures that the observer cannot see, such as fatigue, stress, or an unexpected emergency. Interestingly, people are much less likely to make this error when judging themselves; when they behave badly, they readily point to the situation.",
    note: '"Rather than" significa "en lugar de". Los adverbios en -ly (rudely, typically) modifican a los verbos. "Observers" son quienes juzgan y "someone" es la persona observada; "such behavior" retoma la conducta mencionada antes.',
  },

  // ---------- Read in Daily Life ----------
  {
    id: 'f18-rd-dl-package-lockers',
    form: 18,
    section: 'reading',
    task: 'daily-life',
    genre: 'notice',
    title: 'Mailroom Package Lockers',
    topic: 'campus-life',
    difficulty: 'easy',
    header: ['NOTICE — Campus Mail Center'],
    text:
      'Starting Monday, September 8, packages delivered to the Campus Mail Center will be placed in our new self-service lockers in the lobby of Hartley Hall. When your package arrives, you will receive an email with a six-digit pickup code. Enter the code on the locker screen, and the correct door will open automatically. Codes expire after five days; after that, uncollected packages are returned to the service window. The lockers are available 24 hours a day. Oversized items will still be handed out at the window from 9 a.m. to 5 p.m.',
    questions: [
      {
        id: 'f18-rd-dl-package-lockers-q1',
        kind: 'single',
        skill: 'detail',
        prompt: 'How do students open the locker that holds their package?',
        options: [
          'By scanning a student ID card at the window',
          "By entering a code on the locker's screen",
          'By asking staff to unlock the correct door',
          'By replying to the email they receive',
        ],
        answer: [1],
        explanation:
          'El aviso dice: "Enter the code on the locker screen, and the correct door will open automatically". El correo solo sirve para recibir el código; no hay que responderlo, y la ventanilla es solo para paquetes grandes.',
      },
      {
        id: 'f18-rd-dl-package-lockers-q2',
        kind: 'single',
        skill: 'inference',
        prompt: 'What will most likely happen to a package that a student has not collected after a week?',
        options: [
          'It will be sent back to the original sender.',
          'It will stay in the locker until the student comes.',
          "It will be delivered to the student's residence.",
          'It will be moved to the service window for pickup.',
        ],
        answer: [3],
        explanation:
          'Una semana supera el plazo de cinco días: "Codes expire after five days; after that, uncollected packages are returned to the service window". La opción de devolverlo al remitente es tentadora por "returned", pero el texto dice que vuelve a la ventanilla.',
      },
    ],
  },
  {
    id: 'f18-rd-dl-concession-menu',
    form: 18,
    section: 'reading',
    task: 'daily-life',
    genre: 'menu',
    title: 'Cinema Snack Bar Menu',
    topic: 'daily-life',
    difficulty: 'easy',
    header: ['Starlight Cinemas — Concession Stand'],
    text:
      "SNACKS\nPopcorn: small $5.00 | medium $6.50 | large $8.00 (free refill on large only)\nNachos with cheese: $6.00\nCandy (any box): $4.00\n\nDRINKS\nSoft drinks: small $3.50 | large $5.00\nBottled water: $2.50\n\nCOMBOS\nSolo Combo: medium popcorn + small soft drink — $9.00\nDate Night Combo: large popcorn + two large soft drinks — $16.00\nKids' Combo: small popcorn + juice box + candy — $8.50 (ages 12 and under)\n\nTuesday special: show your ticket stub for $1 off any combo.",
    questions: [
      {
        id: 'f18-rd-dl-concession-menu-q1',
        kind: 'single',
        skill: 'detail',
        prompt: 'Which item comes with a free refill?',
        options: ['A large popcorn', 'A large soft drink', 'A medium popcorn', 'A bottle of water'],
        answer: [0],
        explanation:
          'En la línea de las palomitas se indica "(free refill on large only)". Los refrescos grandes también tienen tamaño "large", pero el menú no les ofrece recarga gratuita.',
      },
      {
        id: 'f18-rd-dl-concession-menu-q2',
        kind: 'single',
        skill: 'inference',
        prompt: 'How much would a customer with a ticket stub pay for a Solo Combo on a Tuesday?',
        options: ['$9.00', '$6.50', '$8.00', '$7.50'],
        answer: [2],
        explanation:
          'El Solo Combo cuesta "$9.00" y el especial del martes da "$1 off any combo" al mostrar la entrada: 9 − 1 = 8 dólares. La opción de 9 dólares olvida aplicar el descuento.',
      },
    ],
  },
  {
    id: 'f18-rd-dl-waste-labels',
    form: 18,
    section: 'reading',
    task: 'daily-life',
    genre: 'memo',
    title: 'Chemical Waste Labeling Memo',
    topic: 'campus-life',
    difficulty: 'medium',
    header: [
      'MEMO',
      'To: All laboratory researchers, Building C',
      'From: Dana Whitfield, Laboratory Safety Officer',
      'Date: February 3',
      'Subject: New chemical-waste labeling rules',
    ],
    text:
      'Beginning March 1, every container of chemical waste must carry the new orange hazardous-waste label as soon as the first drop of waste is added, not when the container is full. Each label must list the full chemical names of all contents, along with approximate percentages and the date the container was started. Abbreviations and formulas such as "HCl" will no longer be accepted. Containers must be collected within 90 days of that start date. Waste with incomplete labels will not be picked up by Environmental Health staff, and the lab will be asked to correct the label before the next scheduled collection. Labels are available from the stockroom at no charge. Please contact me at ext. 4471 if you are unsure how to classify a mixture.',
    questions: [
      {
        id: 'f18-rd-dl-waste-labels-q1',
        kind: 'single',
        skill: 'purpose',
        prompt: 'What is the main purpose of the memo?',
        options: [
          'To announce a new schedule for collecting lab waste',
          'To remind researchers to order labels from the stockroom',
          'To warn researchers about a recent chemical accident',
          'To explain new rules for labeling waste containers',
        ],
        answer: [3],
        explanation:
          'El asunto ("New chemical-waste labeling rules") y todo el texto describen cómo y cuándo etiquetar los contenedores. El plazo de 90 días y las etiquetas del almacén ("stockroom") son detalles secundarios, no el propósito.',
      },
      {
        id: 'f18-rd-dl-waste-labels-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'According to the memo, when must a label be placed on a waste container?',
        options: [
          'As soon as any waste is put into it',
          'When the container becomes completely full',
          "Within 90 days of the container's first use",
          'Before the next scheduled waste collection',
        ],
        answer: [0],
        explanation:
          'La etiqueta debe ponerse "as soon as the first drop of waste is added, not when the container is full". Los 90 días son el plazo para la recogida, no para etiquetar.',
      },
      {
        id: 'f18-rd-dl-waste-labels-q3',
        kind: 'single',
        skill: 'inference',
        prompt: 'What will most likely happen to a container whose label lists its contents only as "HCl"?',
        options: [
          'Staff will correct the label during collection.',
          'It will remain in the lab until it is relabeled.',
          'The lab will be charged for a replacement label.',
          'It will be collected but stored in a separate area.',
        ],
        answer: [1],
        explanation:
          'Las fórmulas como "HCl" ya no se aceptan, y "Waste with incomplete labels will not be picked up… and the lab will be asked to correct the label". Por tanto, el contenedor se queda en el laboratorio; no es el personal quien corrige la etiqueta.',
      },
    ],
  },
  {
    id: 'f18-rd-dl-garden-plot',
    form: 18,
    section: 'reading',
    task: 'daily-life',
    genre: 'webpage',
    title: 'Renting a Community Garden Plot',
    topic: 'daily-life',
    difficulty: 'medium',
    header: ['Maple Street Community Garden', 'Rent a Plot | Member Responsibilities'],
    text:
      'Plots are available for the April–October growing season. A standard 10-by-10-foot plot costs $40, and raised beds for gardeners with limited mobility cost $25. Fees cover water, compost, and use of the shared tool shed. Applications open February 15, and plots are assigned in the order applications are received. Returning members who renew by February 1 keep their previous plot.\n\nMembers agree to:\n• Plant their plot by May 15 and keep it free of weeds all season.\n• Volunteer four hours per season on shared tasks, such as turning compost.\n• Use no chemical pesticides or synthetic fertilizers.\n\nPlots left untended for three weeks will receive a written warning; after a second warning, the plot may be reassigned to someone on the waiting list.',
    questions: [
      {
        id: 'f18-rd-dl-garden-plot-q1',
        kind: 'single',
        skill: 'detail',
        prompt: 'According to the page, what does the plot fee pay for?',
        options: [
          'Seeds and young plants for the whole season',
          "A private shed for each member's tools",
          'Water, compost, and access to shared tools',
          'Weekly help from volunteers with weeding',
        ],
        answer: [2],
        explanation:
          'La página dice: "Fees cover water, compost, and use of the shared tool shed". El cobertizo es compartido ("shared"), no privado, y el voluntariado lo hacen los propios miembros.',
      },
      {
        id: 'f18-rd-dl-garden-plot-q2',
        kind: 'single',
        skill: 'inference',
        prompt: 'What can be inferred about a returning member who renews on February 10?',
        options: [
          'They must pay a higher fee than new members.',
          'They are not guaranteed to keep their old plot.',
          'They will be assigned a raised bed automatically.',
          'They will have to wait until the next season.',
        ],
        answer: [1],
        explanation:
          'Solo "Returning members who renew by February 1 keep their previous plot". Quien renueva el 10 de febrero pierde esa garantía. El texto no habla de tarifas más altas ni de esperar a otra temporada.',
      },
      {
        id: 'f18-rd-dl-garden-plot-q3',
        kind: 'single',
        skill: 'vocabulary',
        prompt: 'The word "untended" in the text is closest in meaning to',
        options: ['not looked after', 'not paid for', 'not yet assigned', 'not fully planted'],
        answer: [0],
        explanation:
          '"Untended" significa descuidado, sin atender. El contexto (mantener la parcela "free of weeds", aviso tras tres semanas) muestra que se trata de parcelas que nadie cuida; "not fully planted" es tentadora, pero se refiere solo a la siembra.',
      },
    ],
  },
  {
    id: 'f18-rd-dl-journal-revisions',
    form: 18,
    section: 'reading',
    task: 'daily-life',
    genre: 'email',
    title: 'Journal Revision Request',
    topic: 'campus-life',
    difficulty: 'hard',
    header: [
      'From: Priya Raman, Managing Editor, The Crestview Undergraduate Review',
      'To: Marcus Bell',
      'Subject: Decision on your submission — revise and resubmit',
    ],
    text:
      'Dear Marcus,\n\nThank you for submitting "Rivers and Rail: Trade Routes in Nineteenth-Century Ohio." Both reviewers found your topic original, and we are pleased to invite a revised version. Before we can accept it, however, three changes are required. First, the literature review must be shortened to no more than two pages. Second, the claims in Section 3 need citations to primary sources rather than textbooks. Third, all figures must be resubmitted as separate high-resolution files. Reviewer 2 also suggested adding a map; this is optional, but it would strengthen the paper.\n\nPlease upload your revision, along with a short letter explaining how you addressed each required change, by April 18. If you need more time, you may request one extension of up to seven days, but only before the original deadline. Revisions received after that date will be treated as new submissions.\n\nBest wishes,\nPriya Raman',
    questions: [
      {
        id: 'f18-rd-dl-journal-revisions-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'What is the main purpose of the email?',
        options: [
          'To reject the paper and suggest another journal',
          "To ask Marcus to review another student's paper",
          'To explain what must change before acceptance',
          'To confirm that the paper will appear in print',
        ],
        answer: [2],
        explanation:
          'La editora invita a enviar una versión revisada y enumera los cambios: "Before we can accept it, however, three changes are required". El artículo no está rechazado ni aceptado todavía, así que las opciones de rechazo o publicación son incorrectas.',
      },
      {
        id: 'f18-rd-dl-journal-revisions-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'What does the editor say about adding a map?',
        options: [
          'It is one of the three required changes.',
          'It must be sent as a separate high-resolution file.',
          'It should replace one of the current figures.',
          'It would improve the paper but is not required.',
        ],
        answer: [3],
        explanation:
          'Sobre el mapa se dice: "this is optional, but it would strengthen the paper". Lo de "separate high-resolution files" se refiere a las figuras existentes, que sí son un cambio obligatorio.',
      },
      {
        id: 'f18-rd-dl-journal-revisions-q3',
        kind: 'single',
        skill: 'inference',
        prompt: 'What would most likely happen if Marcus asked for an extension on April 20?',
        options: [
          'His request would not be accepted.',
          'He would receive seven extra days.',
          "He would need a reviewer's approval.",
          'He would have to shorten the paper again.',
        ],
        answer: [0],
        explanation:
          'La prórroga solo puede pedirse "only before the original deadline", que es el 18 de abril. El 20 de abril ya es tarde, así que no se la concederían; la opción de los siete días ignora esa condición.',
      },
    ],
  },

  // ---------- Read an Academic Passage ----------
  {
    id: 'f18-rd-ap-writing-systems',
    form: 18,
    section: 'reading',
    task: 'academic-passage',
    title: 'Alphabets, Syllabaries, and Logograms',
    topic: 'linguistics',
    difficulty: 'easy',
    paragraphs: [
      'Every writing system links written symbols to spoken language, but systems differ in the size of the language unit that each symbol represents. Linguists generally recognize three major types: alphabets, syllabaries, and logographic scripts. Each type has its own advantages, and each reflects the history and structure of the languages that use it.',
      'In an alphabet, symbols stand for individual sounds, called phonemes. Because most languages have only a few dozen phonemes, alphabets usually need a small number of letters; the Latin alphabet used for English has just 26. However, the match between letters and sounds is not always exact. In English, for example, the letters "ough" are pronounced differently in "though," "through," and "tough."',
      'A syllabary uses one symbol for each syllable, such as "ka" or "mi." Japanese provides a well-known example: its two kana syllabaries, hiragana and katakana, each contain roughly 46 basic symbols. Syllabaries work especially well for languages with simple syllable structures, in which most syllables consist of a consonant followed by a vowel. In a language like English, which allows complex clusters of consonants such as "str" or "nths," a syllabary would require thousands of symbols.',
      'Logographic scripts take a different approach: their characters represent whole words or meaningful parts of words rather than sounds alone. Chinese is the most widely used example. Because each character carries meaning, readers must learn thousands of characters to read a newspaper. Yet this system offers a special benefit: speakers of Chinese varieties that sound very different from one another can often read the same written text.',
    ],
    questions: [
      {
        id: 'f18-rd-ap-writing-systems-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'What is the passage mainly about?',
        options: [
          'Why alphabets are easier to learn than other scripts',
          'How the Chinese writing system developed over time',
          'Different ways that scripts represent spoken language',
          'Why English spelling does not match pronunciation',
        ],
        answer: [2],
        explanation:
          'El párrafo 1 presenta la idea central: los sistemas difieren en "the size of the language unit that each symbol represents", y luego se describen alfabetos, silabarios y escrituras logográficas. La ortografía inglesa es solo un ejemplo del párrafo 2.',
      },
      {
        id: 'f18-rd-ap-writing-systems-q2',
        kind: 'single',
        skill: 'detail',
        paragraph: 1,
        prompt: 'According to paragraph 2, why do alphabets usually need only a small number of symbols?',
        options: [
          'Most languages use a limited set of distinct sounds.',
          'Each letter can stand for an entire syllable of speech.',
          'Letters were designed to match English spelling.',
          'Alphabets ignore sounds that are hard to write.',
        ],
        answer: [0],
        explanation:
          'El texto lo explica: "Because most languages have only a few dozen phonemes, alphabets usually need a small number of letters". Representar sílabas completas es propio de los silabarios, no de los alfabetos.',
      },
      {
        id: 'f18-rd-ap-writing-systems-q3',
        kind: 'single',
        skill: 'vocabulary',
        paragraph: 2,
        highlight: 'roughly',
        prompt: 'The word "roughly" in paragraph 3 is closest in meaning to',
        options: ['exactly', 'no fewer than', 'not more than', 'approximately'],
        answer: [3],
        explanation:
          '"Roughly" significa "aproximadamente": cada silabario tiene unos 46 símbolos básicos. No indica una cifra exacta ni un mínimo o máximo.',
      },
      {
        id: 'f18-rd-ap-writing-systems-q4',
        kind: 'single',
        skill: 'inference',
        paragraph: 2,
        prompt: 'What can be inferred from paragraph 3 about the Japanese language?',
        options: [
          'Its syllables are more complex than those of English.',
          'Many of its syllables are a consonant plus a vowel.',
          'It uses syllabaries because it has no alphabet.',
          'It needs thousands of symbols to write its syllables.',
        ],
        answer: [1],
        explanation:
          'Los silabarios funcionan bien "for languages with simple syllable structures, in which most syllables consist of a consonant followed by a vowel", y el japonés es el ejemplo con solo unos 46 símbolos. Los "thousands of symbols" se aplicarían al inglés, no al japonés.',
      },
      {
        id: 'f18-rd-ap-writing-systems-q5',
        kind: 'single',
        skill: 'purpose',
        paragraph: 1,
        prompt: 'Why does the author mention "though," "through," and "tough" in paragraph 2?',
        options: [
          'To show how English borrowed many words from other languages',
          'To prove that English needs more than 26 letters',
          'To illustrate that letters and sounds do not always match',
          'To compare English spelling with Japanese syllables',
        ],
        answer: [2],
        explanation:
          'Las tres palabras aparecen justo después de "the match between letters and sounds is not always exact": las mismas letras "ough" se pronuncian de forma distinta. El autor no afirma que el inglés necesite más de 26 letras.',
      },
    ],
  },
  {
    id: 'f18-rd-ap-acacia-ants',
    form: 18,
    section: 'reading',
    task: 'academic-passage',
    title: 'Acacias and Their Ant Defenders',
    topic: 'biology',
    difficulty: 'medium',
    paragraphs: [
      'Mutualism is a relationship between two species in which both partners benefit. One of the most thoroughly studied examples involves the bullhorn acacia, a small tree of Mexico and Central America, and the ants that live on it. The tree gets its common name from its large, paired thorns, which swell at the base and resemble the horns of a bull.',
      'The acacia provides its ants with both shelter and food. Worker ants hollow out the swollen thorns and use them as nests, where the queen lays her eggs and the young are raised. The tree also produces sugary nectar from small glands on its leaf stalks, and it grows tiny, protein-rich structures on the tips of its leaflets. These structures, called Beltian bodies, have no known function for the plant other than feeding the ants, which harvest them and carry them back to the larvae.',
      'In return, the ants act as a resident army. They patrol the branches day and night and aggressively attack insects and other animals that try to eat the leaves, stinging or biting intruders far larger than themselves. They also cut down vines and the seedlings of other plants that sprout near their tree, clearing a space that reduces competition for sunlight. Field experiments in the 1960s showed how important this defense is: when ants were removed from young acacias, the trees were quickly damaged by plant-eating insects, grew far more slowly, and often died.',
      'This partnership has shaped the evolution of both species. The ants depend so completely on the tree that they are rarely found living anywhere else. The acacia, for its part, contains fewer of the bitter chemical defenses found in related acacias that lack ant partners. In effect, the tree has traded chemical protection for a living one, an arrangement that works only as long as its ants remain.',
    ],
    questions: [
      {
        id: 'f18-rd-ap-acacia-ants-q1',
        kind: 'single',
        skill: 'organization',
        prompt: 'Which of the following best describes how the passage is organized?',
        options: [
          "A partnership is introduced, each partner's role is described, and its long-term effects are discussed.",
          'Two competing theories about why ants live on trees are presented, and the author argues for one of them.',
          'A problem facing acacia trees is described, and several possible solutions to it are compared.',
          "The life cycle of an ant colony is traced from the queen's eggs to the adult workers.",
        ],
        answer: [0],
        explanation:
          'El párrafo 1 presenta el mutualismo, el 2 describe lo que da la acacia, el 3 lo que hacen las hormigas ("In return") y el 4 sus efectos evolutivos ("shaped the evolution of both species"). No se comparan teorías ni se describe el ciclo de vida de la colonia.',
      },
      {
        id: 'f18-rd-ap-acacia-ants-q2',
        kind: 'single',
        skill: 'detail',
        paragraph: 1,
        prompt: 'According to paragraph 2, what do the ants do with Beltian bodies?',
        options: [
          'They store them inside the thorns for later seasons.',
          'They use them to build the walls of their nests.',
          'They avoid them because they contain bitter chemicals.',
          'They collect them and bring them to the larvae.',
        ],
        answer: [3],
        explanation:
          'El texto dice que las hormigas "harvest them and carry them back to the larvae". Las espinas sirven de nido, pero no se dice que los cuerpos de Belt se almacenen allí.',
      },
      {
        id: 'f18-rd-ap-acacia-ants-q3',
        kind: 'single',
        skill: 'negative-factual',
        paragraph: 1,
        prompt: 'According to paragraph 2, the acacia provides its ants with all of the following EXCEPT',
        options: [
          'hollow thorns that can be used as nests',
          'sugary nectar produced by small glands',
          'chemicals that keep predators away',
          'protein-rich structures on its leaflets',
        ],
        answer: [2],
        explanation:
          'El párrafo 2 menciona las espinas como nido, el néctar "from small glands" y las estructuras "protein-rich" (Beltian bodies). No menciona sustancias químicas que protejan a las hormigas; al contrario, el párrafo 4 dice que la acacia tiene menos defensas químicas.',
      },
      {
        id: 'f18-rd-ap-acacia-ants-q4',
        kind: 'single',
        skill: 'inference',
        paragraph: 3,
        prompt: 'What can be inferred from paragraph 4 about acacias that do not have ant partners?',
        options: [
          'They grow larger than bullhorn acacias do.',
          'They rely more heavily on chemical defenses.',
          'They are rarely attacked by plant-eating insects.',
          'They produce more nectar than bullhorn acacias.',
        ],
        answer: [1],
        explanation:
          'La acacia con hormigas "contains fewer of the bitter chemical defenses found in related acacias that lack ant partners"; por tanto, las acacias sin hormigas dependen más de las defensas químicas. El texto no dice que esas acacias sufran menos ataques.',
      },
      {
        id: 'f18-rd-ap-acacia-ants-q5',
        kind: 'single',
        skill: 'vocabulary',
        paragraph: 2,
        highlight: 'intruders',
        prompt: 'The word "intruders" in paragraph 3 is closest in meaning to',
        options: ['rival colonies', 'harmless guests', 'young workers', 'unwelcome visitors'],
        answer: [3],
        explanation:
          '"Intruders" son intrusos, visitantes no deseados: los animales que intentan comerse las hojas y a los que las hormigas pican o muerden. "Harmless guests" contradice el contexto de ataque.',
      },
    ],
  },
  {
    id: 'f18-rd-ap-british-industry',
    form: 18,
    section: 'reading',
    task: 'academic-passage',
    title: 'Why Industry Began in Britain',
    topic: 'history',
    difficulty: 'hard',
    paragraphs: [
      'Between roughly 1760 and 1840, Britain became the first society to shift from an economy based on farming and handicrafts to one dominated by machines and factories. Historians have long asked why this transformation began on a small island off the coast of Europe rather than in larger and, in some respects, more advanced economies such as China or France. No single cause explains the timing, but most scholars point to a combination of geographical, economic, and institutional advantages that, taken together, were unusual for their time.',
      'Geography gave Britain a head start in energy. Large coal deposits lay close to the surface, often near rivers or the coast, so the fuel could be mined and shipped cheaply. As forests were cut down and wood grew expensive, households and workshops increasingly turned to coal. Deep mines, however, tended to flood, and the need to pump water out of them encouraged the development of the first practical steam engines in the early eighteenth century. In this way, the coal industry both created a problem and supplied the cheap fuel needed to solve it.',
      'Economic conditions also favored mechanization. Wages in Britain were high compared with those in much of Europe and Asia, while energy was cheap. Under these circumstances, a machine that replaced workers with coal-powered equipment could quickly pay for itself, whereas the same invention would have been unprofitable where labor was inexpensive. Meanwhile, improvements in agriculture allowed fewer farmers to feed a growing population, releasing workers for the expanding towns, and profits from overseas trade provided merchants with capital to invest in new ventures.',
      'Finally, British institutions encouraged people to take risks. After the political settlement of 1688, Parliament limited the power of the monarch, and property rights became more secure. A patent system allowed inventors to profit from their ideas, and a culture of practical experimentation linked scientists, engineers, and skilled craftsmen. Some historians stress these institutional factors above all others, while others argue that they mattered only because they coincided with cheap coal and expensive labor. What is clear is that no other region of the time possessed all of these conditions at once.',
    ],
    questions: [
      {
        id: 'f18-rd-ap-british-industry-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'Which of the following best states the main idea of the passage?',
        options: [
          "Britain's coal supply was the single cause of its industrial growth.",
          'A rare combination of advantages allowed Britain to industrialize first.',
          'Political changes in 1688 made Britain richer than China and France.',
          'High wages in Britain delayed the spread of new machines and factory work.',
        ],
        answer: [1],
        explanation:
          'El párrafo 1 afirma: "No single cause explains the timing… a combination of geographical, economic, and institutional advantages", y el último concluye que ninguna otra región "possessed all of these conditions at once". La opción del carbón como causa única contradice "No single cause".',
      },
      {
        id: 'f18-rd-ap-british-industry-q2',
        kind: 'single',
        skill: 'detail',
        paragraph: 1,
        prompt: 'According to paragraph 2, what led to the development of the first practical steam engines?',
        options: [
          "A shortage of coal near Britain's coasts",
          'The rising price of wood for households',
          'The need to remove water from deep mines',
          'The demand for faster ships to carry fuel',
        ],
        answer: [2],
        explanation:
          'El texto dice: "the need to pump water out of them encouraged the development of the first practical steam engines". El encarecimiento de la madera explica el paso al carbón, no la invención de las máquinas de vapor.',
      },
      {
        id: 'f18-rd-ap-british-industry-q3',
        kind: 'single',
        skill: 'vocabulary',
        paragraph: 3,
        highlight: 'coincided',
        prompt: 'The word "coincided" in paragraph 4 is closest in meaning to',
        options: ['occurred at the same time', 'competed for public attention', 'were replaced over time', 'came into conflict'],
        answer: [0],
        explanation:
          '"Coincided" significa "coincidieron en el tiempo": los factores institucionales importaron porque se dieron a la vez que el carbón barato y los salarios altos. No implica conflicto ni competencia.',
      },
      {
        id: 'f18-rd-ap-british-industry-q4',
        kind: 'single',
        skill: 'inference',
        paragraph: 2,
        prompt: 'What can be inferred from paragraph 3 about a labor-saving machine in a region where wages were very low?',
        options: [
          'It would have been easier to build there.',
          'It would have used more coal than in Britain.',
          'It would have been banned to protect workers.',
          'It would have given owners little benefit.',
        ],
        answer: [3],
        explanation:
          'El párrafo 3 indica que la misma invención "would have been unprofitable where labor was inexpensive": si los trabajadores cuestan poco, sustituirlos por máquinas no compensa. Nada se dice sobre prohibiciones o mayor consumo de carbón.',
      },
      {
        id: 'f18-rd-ap-british-industry-q5',
        kind: 'single',
        skill: 'purpose',
        paragraph: 0,
        prompt: 'Why does the author mention China and France in paragraph 1?',
        options: [
          "To identify Britain's main trading partners at the time",
          "To show that Britain's lead is a puzzle worth explaining",
          'To argue that those countries industrialized soon after',
          'To explain where Britain obtained its early machines',
        ],
        answer: [1],
        explanation:
          'El autor señala que la transformación empezó en una isla pequeña "rather than in larger and, in some respects, more advanced economies such as China or France": la mención plantea el enigma que el pasaje intenta explicar. No se habla de socios comerciales.',
      },
    ],
  },
  {
    id: 'f18-rd-ap-himalayas',
    form: 18,
    section: 'reading',
    task: 'academic-passage',
    title: 'How the Himalayas Rose',
    topic: 'geology',
    difficulty: 'hard',
    paragraphs: [
      'The Himalayas contain the highest peaks on Earth, including Mount Everest, which rises nearly 8,850 meters above sea level. Yet in geological terms these mountains are surprisingly young. Their story began more than 100 million years ago, when the landmass that would become India broke away from the ancient southern supercontinent of Gondwana and began drifting north across an ocean known as the Tethys.',
      'As India advanced, the floor of the Tethys Ocean in front of it was forced down beneath the Eurasian Plate in a process called subduction. India moved unusually fast for a continent, at times as much as 15 centimeters per year, far faster than most plates move today. Roughly 50 million years ago, once the ocean floor between the two landmasses had been consumed, the continental crust of India began to collide with that of Asia.',
      'This collision differed from the subduction that preceded it. Continental crust is thick and relatively light, so it resists sinking into the dense mantle below. Instead of descending, the colliding crust crumpled, folded, and broke along great faults, with enormous slabs of rock pushed upward and stacked on top of one another. As a result, the crust beneath the Himalayas and the neighboring Tibetan Plateau has become roughly twice as thick as average continental crust. Striking evidence of this upheaval can be seen near the summit of Everest, where layers of limestone contain the fossils of sea creatures that once lived on the floor of the Tethys.',
      'The collision has not ended. India continues to push into Asia at about four to five centimeters per year, and the Himalayas are still rising by a few millimeters annually, although erosion by rivers and glaciers wears much of that height away. The same forces that build the mountains also make the region prone to powerful earthquakes, such as the one that struck Nepal in 2015 and killed thousands of people. In this sense, the Himalayas are a mountain range that is still under construction.',
    ],
    questions: [
      {
        id: 'f18-rd-ap-himalayas-q1',
        kind: 'single',
        skill: 'organization',
        prompt: 'How is the information in the passage mainly organized?',
        options: [
          'Two theories about mountain building are compared and evaluated.',
          'Several mountain ranges are described in order of their height.',
          'A geological process is traced from its origin to the present.',
          'A common belief about Everest is presented and then corrected.',
        ],
        answer: [2],
        explanation:
          'El pasaje sigue un orden cronológico: la separación de India de Gondwana, la subducción, la colisión de hace unos 50 millones de años y, por último, "The collision has not ended". No se comparan teorías ni varias cordilleras.',
      },
      {
        id: 'f18-rd-ap-himalayas-q2',
        kind: 'single',
        skill: 'detail',
        paragraph: 1,
        prompt: 'According to paragraph 2, what happened to the floor of the Tethys Ocean as India moved north?',
        options: [
          'It was forced down beneath the Eurasian Plate.',
          'It was lifted up to form the Tibetan Plateau.',
          "It slowed India's movement to a few centimeters.",
          'It became attached to the edge of Gondwana.',
        ],
        answer: [0],
        explanation:
          'El texto dice: "the floor of the Tethys Ocean in front of it was forced down beneath the Eurasian Plate in a process called subduction". La meseta tibetana se menciona en el párrafo 3 en relación con la corteza continental, no con el fondo oceánico.',
      },
      {
        id: 'f18-rd-ap-himalayas-q3',
        kind: 'single',
        skill: 'vocabulary',
        paragraph: 1,
        highlight: 'consumed',
        prompt: 'The word "consumed" in paragraph 2 is closest in meaning to',
        options: ['eaten by sea creatures', 'carefully measured', 'covered by sediment', 'completely used up'],
        answer: [3],
        explanation:
          'Aquí "consumed" significa que el fondo oceánico desapareció por completo al hundirse bajo Eurasia ("used up"); solo entonces chocaron los continentes. "Eaten by sea creatures" toma el sentido literal de "consume" (comer), que no encaja.',
      },
      {
        id: 'f18-rd-ap-himalayas-q4',
        kind: 'single',
        skill: 'inference',
        paragraph: 2,
        prompt: 'What can be inferred from paragraph 3 about the limestone near the summit of Everest?',
        options: [
          'It formed from lava during the collision.',
          'It was once part of an ocean floor.',
          'It is younger than the rest of the range.',
          "It came from deep within Earth's mantle.",
        ],
        answer: [1],
        explanation:
          'La caliza contiene "the fossils of sea creatures that once lived on the floor of the Tethys", así que esas rocas estuvieron antes en el fondo del océano y fueron elevadas. El texto no habla de lava ni de rocas del manto.',
      },
      {
        id: 'f18-rd-ap-himalayas-q5',
        kind: 'single',
        skill: 'reference',
        paragraph: 2,
        highlight: 'preceded it',
        prompt: 'The word "it" in the phrase "preceded it" in paragraph 3 refers to',
        options: ['this collision', 'subduction', 'continental crust', 'the dense mantle'],
        answer: [0],
        explanation:
          'En "This collision differed from the subduction that preceded it", la subducción ocurrió antes de la colisión: "it" remite a "this collision". "Subduction" es el sujeto de "preceded", por lo que no puede ser también su objeto.',
      },
    ],
  },
];
