import type { ReadingSet } from '../../../types';

/** Simulación n.º 12 — Reading (contenido original). */
export const sets: ReadingSet[] = [
  // ---------- Complete the Words ----------
  {
    id: 'f12-rd-cw-stroop',
    form: 12,
    section: 'reading',
    task: 'complete-words',
    title: 'The Stroop Effect',
    topic: 'psychology',
    difficulty: 'easy',
    text:
      'The Stroop effect shows how difficult it can be to ignore information that we process automatically. In a {{typ|ical}} test, {{peo|ple}} see {{co|lor}} words {{pri|nted}} in {{diff|erent}} ink {{col|ors}}. Their {{ta|sk}} is {{t|o}} name {{t|he}} ink {{a|nd}} ignore the word. When the word and the ink match, answers are fast. When they conflict, people slow down and make more mistakes. Psychologists explain that skilled readers cannot easily stop themselves from reading a familiar word, so the meaning of the word competes with the color they are trying to name.',
    note: 'Distingue "color words" (palabras que nombran colores) de "ink colors" (el color de la tinta). Las palabras funcionales (to, the, and) se deducen por la estructura "Their task is to name…".',
  },
  {
    id: 'f12-rd-cw-economies-scale',
    form: 12,
    section: 'reading',
    task: 'complete-words',
    title: 'Economies of Scale',
    topic: 'economics',
    difficulty: 'medium',
    text:
      'Economies of scale explain why large producers can often sell goods more cheaply than small ones. {{So|me}} costs, {{su|ch}} as {{mach|inery}} and {{fac|tory}} rent, {{rem|ain}} fixed {{regar|dless}} of {{out|put}}. A {{lar|ger}} factory {{spr|eads}} these {{co|sts}} over more products, so each unit becomes cheaper to make. Big firms can also buy raw materials in bulk and negotiate lower prices with suppliers. However, growth has limits: if a company becomes too large, coordination problems may push costs up again.',
    note: '"Regardless of" (independientemente de) y "such as" (como, por ejemplo) son expresiones fijas muy frecuentes en textos de economía; "spreads" concuerda con el sujeto singular "A larger factory".',
  },
  {
    id: 'f12-rd-cw-cultural-lag',
    form: 12,
    section: 'reading',
    task: 'complete-words',
    title: 'Cultural Lag',
    topic: 'sociology',
    difficulty: 'hard',
    text:
      'The sociologist William Ogburn used the term cultural lag to describe what happens when technology changes faster than the norms and institutions that regulate it. Material {{innov|ations}} typically {{dif|fuse}} rapidly {{bec|ause}} their {{prac|tical}} advantages {{a|re}} immediately {{vis|ible}}. Nonmaterial {{cul|ture}}, however, {{incl|uding}} legal {{frame|works}}, ethical {{expect|ations}}, and educational systems, adapts considerably more slowly. During this transitional period, societies frequently confront dilemmas that existing regulations were never designed to address, such as questions about privacy raised by digital surveillance.',
    note: 'El texto contrapone "material culture" y "nonmaterial culture" con "however". "Diffuse" (difundirse) es el verbo típico para hablar de cómo se extienden las innovaciones. Atención a los sustantivos abstractos en plural (innovations, frameworks, expectations), típicos del registro académico.',
  },

  // ---------- Read in Daily Life ----------
  {
    id: 'f12-rd-dl-soccer-schedule',
    form: 12,
    section: 'reading',
    task: 'daily-life',
    genre: 'schedule',
    title: 'Intramural Soccer Week Three',
    topic: 'campus-life',
    difficulty: 'easy',
    header: ['Intramural Soccer League — Week 3 Game Schedule'],
    text:
      'All games last 50 minutes. Teams must arrive 15 minutes before kickoff to check in with the referee.\n\nTuesday, Oct. 14\n6:00 p.m. — Red Foxes vs. Blue Comets — North Field\n7:15 p.m. — Night Owls vs. Green Giants — South Field\n\nThursday, Oct. 16\n6:00 p.m. — Blue Comets vs. Night Owls — South Field\n7:15 p.m. — Green Giants vs. Red Foxes — North Field\n\nNorth Field has lights. If it rains, South Field games will move indoors to the Rec Center gym. Check the league page after 4:00 p.m. on game days for updates.',
    questions: [
      {
        id: 'f12-rd-dl-soccer-schedule-q1',
        kind: 'single',
        skill: 'detail',
        prompt: 'By what time must the Green Giants check in for their Thursday game?',
        options: ['6:00 p.m.', '6:45 p.m.', '7:00 p.m.', '7:15 p.m.'],
        answer: [2],
        explanation:
          'El jueves los Green Giants juegan a las "7:15 p.m." y los equipos deben llegar "15 minutes before kickoff", es decir, a las 7:00. La opción 7:15 es la hora del partido, no la del registro.',
      },
      {
        id: 'f12-rd-dl-soccer-schedule-q2',
        kind: 'single',
        skill: 'inference',
        prompt: "What is suggested about Tuesday's 7:15 p.m. game?",
        options: [
          'It may move to the gym if the weather is bad.',
          'It will be played on the field that has lights.',
          'It is the first game scheduled for that evening.',
          'It will last longer than the other games that week.',
        ],
        answer: [0],
        explanation:
          'Ese partido es en "South Field", y el horario dice que "If it rains, South Field games will move indoors to the Rec Center gym". La opción de las luces es incorrecta: las tiene "North Field".',
      },
    ],
  },
  {
    id: 'f12-rd-dl-missed-slides',
    form: 12,
    section: 'reading',
    task: 'daily-life',
    genre: 'text-message',
    title: 'Asking for Missed Slides',
    topic: 'campus-life',
    difficulty: 'easy',
    text:
      "Sofia (10:42 a.m.): Hi Daniel! I had a doctor's appointment this morning, so I missed Professor Hale's history lecture. Could you send me the slides?\nDaniel (10:50 a.m.): Sure! She didn't post them online this time, but I took photos of every slide. I'll text them to you after lunch.\nSofia (10:51 a.m.): Thanks so much! Did she say anything about the quiz?\nDaniel (10:53 a.m.): Yes, it's been moved from Friday to next Monday. She also said it will cover only Chapters 4 and 5.",
    questions: [
      {
        id: 'f12-rd-dl-missed-slides-q1',
        kind: 'single',
        skill: 'detail',
        prompt: 'How will Sofia get the lecture slides?',
        options: [
          'She will download them from the course website.',
          'Daniel will send her photos he took in class.',
          'She will ask Professor Hale for her own copy.',
          'Daniel will bring printed copies on Friday.',
        ],
        answer: [1],
        explanation:
          'Daniel escribe: "I took photos of every slide. I\'ll text them to you after lunch." La opción de la web es una trampa: la profesora "didn\'t post them online this time".',
      },
      {
        id: 'f12-rd-dl-missed-slides-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'What does Daniel say about the quiz?',
        options: [
          'It will take place this Friday as planned.',
          'It will cover every chapter studied so far.',
          'It has been canceled because of the lecture.',
          'It has been postponed until the next Monday.',
        ],
        answer: [3],
        explanation:
          'Daniel dice: "it\'s been moved from Friday to next Monday", es decir, se ha aplazado. Además solo cubrirá "Chapters 4 and 5", así que la opción de todos los capítulos es falsa.',
      },
    ],
  },
  {
    id: 'f12-rd-dl-green-bin',
    form: 12,
    section: 'reading',
    task: 'daily-life',
    genre: 'notice',
    title: 'Curbside Food-Waste Collection',
    topic: 'daily-life',
    difficulty: 'medium',
    header: ['CITY OF MAPLETON — Public Works Department', 'Curbside Food-Waste Collection Begins April 7'],
    text:
      'Starting Monday, April 7, the city will collect food waste every week on your regular trash day. Each household will receive a green bin by April 3; residents of buildings with more than four units should contact their property manager instead.\n\nWhat goes in the green bin: fruit and vegetable scraps, meat and fish bones, eggshells, coffee grounds, paper coffee filters, and used paper napkins.\n\nWhat stays out: plastic bags (including those labeled "compostable"), liquids, cooking oil, pet waste, and glass jars.\n\nPlace your bin at the curb by 7:00 a.m. with the lid closed. Bins containing items that are not allowed will be tagged and left unemptied. During weeks with a public holiday, collection will take place one day later than usual.',
    questions: [
      {
        id: 'f12-rd-dl-green-bin-q1',
        kind: 'single',
        skill: 'purpose',
        prompt: 'What is the main purpose of the notice?',
        options: [
          'To introduce a new weekly service and explain its rules',
          'To announce a change in the regular trash collection day',
          'To ask residents to buy compostable bags for their scraps',
          'To warn residents about fines for overfilled green bins',
        ],
        answer: [0],
        explanation:
          'El aviso anuncia que "the city will collect food waste every week" a partir del 7 de abril y explica qué se puede echar y cómo sacar el contenedor. No cambia el día de la basura: se recoge "on your regular trash day".',
      },
      {
        id: 'f12-rd-dl-green-bin-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'Which of the following may be placed in the green bin?',
        options: [
          'A plastic bag marked "compostable"',
          'Leftover cooking oil from a pan',
          'Coffee grounds in a paper filter',
          'An empty glass jar that held jam',
        ],
        answer: [2],
        explanation:
          'La lista de lo permitido incluye "coffee grounds" y "paper coffee filters". Las bolsas de plástico quedan fuera "including those labeled \'compostable\'", igual que el aceite y el vidrio.',
      },
      {
        id: 'f12-rd-dl-green-bin-q3',
        kind: 'single',
        skill: 'inference',
        prompt: 'What will probably happen if a resident puts pet waste in the green bin?',
        options: [
          'The city will deliver a replacement bin to the home.',
          'The bin will be marked and not emptied that week.',
          'The bin will be collected one day later than usual.',
          'The property manager will be asked to remove it.',
        ],
        answer: [1],
        explanation:
          '"Pet waste" está en la lista de "What stays out", y el aviso dice que "Bins containing items that are not allowed will be tagged and left unemptied". El retraso de un día solo se aplica en semanas con festivo.',
      },
    ],
  },
  {
    id: 'f12-rd-dl-grade-review',
    form: 12,
    section: 'reading',
    task: 'daily-life',
    genre: 'email',
    title: 'Midterm Essay Regrade Request',
    topic: 'campus-life',
    difficulty: 'medium',
    header: ['From: Prof. Elena Marsh', 'To: Kevin Doyle', 'Subject: RE: Review of my midterm essay grade'],
    text:
      'Dear Kevin,\n\nThank you for your message. I have received your request to have your midterm essay regraded, and I will handle it as follows.\n\nFirst, I will reread the entire essay, not only the section you mentioned, using the same rubric as before. Please note that this means your grade could go down as well as up. I expect to finish the review within ten business days, and I will send you my decision with written comments.\n\nIf you would like to discuss the essay before then, you are welcome to come to my office hours on Wednesday afternoon. If you are still unsatisfied after receiving my decision, you may submit a formal appeal to the department chair within one week.\n\nBest,\nProfessor Marsh',
    questions: [
      {
        id: 'f12-rd-dl-grade-review-q1',
        kind: 'single',
        skill: 'purpose',
        prompt: 'What is the main purpose of the email?',
        options: [
          "To inform Kevin that his essay's grade has been raised",
          'To invite Kevin to resubmit a revised version of his essay',
          "To explain why Kevin's request cannot be accepted",
          "To acknowledge Kevin's request and outline the next steps",
        ],
        answer: [3],
        explanation:
          'La profesora confirma "I have received your request" y explica "I will handle it as follows" (relectura, plazo, tutoría, apelación). La nota todavía no ha cambiado, así que la primera opción es incorrecta.',
      },
      {
        id: 'f12-rd-dl-grade-review-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'What does Professor Marsh warn Kevin about?',
        options: [
          'He must attend office hours before the review begins.',
          'The review may result in a lower grade than before.',
          'Only the section he mentioned will be read again.',
          'A different rubric will be used for the second reading.',
        ],
        answer: [1],
        explanation:
          'El correo advierte: "your grade could go down as well as up". Además se releerá "the entire essay, not only the section you mentioned", con "the same rubric", y la tutoría es opcional ("you are welcome to come").',
      },
      {
        id: 'f12-rd-dl-grade-review-q3',
        kind: 'single',
        skill: 'inference',
        prompt: 'What can be inferred about the department chair?',
        options: [
          'The chair acts only after the professor has decided.',
          "The chair will help the professor reread Kevin's essay.",
          'The chair holds office hours on Wednesday afternoons.',
          'The chair must approve all midterm grades in advance.',
        ],
        answer: [0],
        explanation:
          'Se puede apelar al director del departamento solo "after receiving my decision", es decir, después de la revisión de la profesora. Las tutorías del miércoles son de la profesora, no del director.',
      },
    ],
  },
  {
    id: 'f12-rd-dl-dining-car',
    form: 12,
    section: 'reading',
    task: 'daily-life',
    genre: 'menu',
    title: 'Northern Pines Dining Car',
    topic: 'daily-life',
    difficulty: 'hard',
    header: ['Northern Pines Limited — Dining Car Menu'],
    text:
      'SERVICE TIMES (by route segment)\nLakeport → Silver Falls: breakfast 6:30–9:00 a.m.; lunch 11:30 a.m.–2:00 p.m.\nSilver Falls → Cedar Pass (mountain segment): the dining car is closed; light snacks are sold at the café counter.\nCedar Pass → Harbor City: dinner 5:00–8:30 p.m.\n\nRESERVATIONS\nDinner is served by reservation only. Book a table with your car attendant before 3:00 p.m. Breakfast and lunch are first come, first served. Sleeping-car passengers receive all meals at no charge but must still reserve a dinner time.\n\nMENU\nBreakfast: Farmhouse omelet $14 · Oatmeal with berries $9\nLunch: Grilled chicken wrap $16 · Lentil soup with bread $11\nDinner (includes salad and dessert): Herb-roasted salmon $28 · Mushroom risotto $24\nChildren under 12 pay half price for all items. Payment by card only; cash is not accepted.',
    questions: [
      {
        id: 'f12-rd-dl-dining-car-q1',
        kind: 'single',
        skill: 'detail',
        prompt: 'A coach passenger wants to eat dinner on the train. What must she do?',
        options: [
          'Wait at the dining car door when it opens at 5:00 p.m.',
          'Pay for her meal in cash as soon as she is seated',
          'Ask her car attendant to book a table before 3:00 p.m.',
          'Order her dinner at the café counter in the mountains',
        ],
        answer: [2],
        explanation:
          'La cena es "by reservation only" y hay que reservar "with your car attendant before 3:00 p.m.". Esperar en la puerta solo sirve para el desayuno y el almuerzo ("first come, first served").',
      },
      {
        id: 'f12-rd-dl-dining-car-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'What is true about the trip between Silver Falls and Cedar Pass?',
        options: [
          'Lunch is served there on a first-come basis.',
          'Sleeping-car passengers can order free dinners.',
          'The dining car serves breakfast until 9:00 a.m.',
          'Only small snacks can be bought on that stretch.',
        ],
        answer: [3],
        explanation:
          'En ese tramo de montaña "the dining car is closed; light snacks are sold at the café counter". El almuerzo y el desayuno corresponden al tramo Lakeport → Silver Falls.',
      },
      {
        id: 'f12-rd-dl-dining-car-q3',
        kind: 'single',
        skill: 'inference',
        prompt: 'How much would an adult sleeping-car passenger pay for the mushroom risotto?',
        options: [
          '$12, because dinner items are half price',
          'Nothing, because the meal is included',
          '$24, the same as any other passenger',
          'It depends on which segment the train is in',
        ],
        answer: [1],
        explanation:
          'Los pasajeros de coche cama "receive all meals at no charge"; solo deben reservar hora para cenar. El descuento de la mitad ("half price") es para "Children under 12", no para la cena.',
      },
    ],
  },

  // ---------- Read an Academic Passage ----------
  {
    id: 'f12-rd-ap-lascaux',
    form: 12,
    section: 'reading',
    task: 'academic-passage',
    title: 'The Painters of Lascaux',
    topic: 'art',
    difficulty: 'easy',
    paragraphs: [
      'In 1940, four teenagers exploring a hillside in southwestern France found a narrow opening that led into a cave covered with paintings. The cave, known as Lascaux, contains hundreds of animal images created roughly 17,000 years ago. Because they are so well preserved, the paintings offer a rare view of the skills and ideas of Paleolithic, or Old Stone Age, people.',
      "Most of the images show large animals, especially horses, deer, wild cattle, and bison. The artists captured details such as the flowing mane of a horse or the heavy body of a bull. Human figures, however, are extremely rare, and plants and landscapes are almost absent. This suggests that the painters were not simply recording their surroundings; the animals seem to have held special importance for them.",
      'The paintings also reveal considerable technical knowledge. The artists made pigments by grinding minerals: iron oxides produced reds and yellows, while charcoal and manganese produced black. They applied the colors with pads of fur or moss and sometimes blew powdered pigment through hollow tubes. In several places, they used natural bulges in the rock to give their animals a sense of volume. Since no daylight reaches the inner chambers, they worked by the light of stone lamps that burned animal fat.',
      "Finally, the paintings point to cooperation. Some images are high on the walls and ceilings, far above a person's reach, and holes cut into the rock suggest that wooden platforms supported the painters. Such projects required planning and shared effort. Paleolithic artists, in other words, were skilled members of organized communities.",
    ],
    questions: [
      {
        id: 'f12-rd-ap-lascaux-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'What is the passage mainly about?',
        options: [
          'How a group of teenagers found a hidden cave in France',
          'What the Lascaux paintings reveal about their creators',
          'Why Stone Age painters preferred animals to human figures',
          'How scientists protect ancient paintings from damage',
        ],
        answer: [1],
        explanation:
          'Todo el texto explica lo que las pinturas muestran de sus autores: "a rare view of the skills and ideas of Paleolithic… people" (temas, técnica y cooperación). El descubrimiento de 1940 es solo la introducción.',
      },
      {
        id: 'f12-rd-ap-lascaux-q2',
        kind: 'single',
        skill: 'detail',
        paragraph: 1,
        prompt: 'According to paragraph 2, what is unusual about the subjects of the paintings?',
        options: [
          'People and scenery hardly ever appear in them.',
          'The animals are drawn with very little detail.',
          'Only animals that were hunted are represented.',
          'Most of the images show small animals like birds.',
        ],
        answer: [0],
        explanation:
          'El párrafo 2 dice: "Human figures, however, are extremely rare, and plants and landscapes are almost absent". La segunda opción contradice el texto, que destaca los detalles ("the flowing mane of a horse").',
      },
      {
        id: 'f12-rd-ap-lascaux-q3',
        kind: 'single',
        skill: 'vocabulary',
        paragraph: 2,
        highlight: 'considerable',
        prompt: 'The word "considerable" in paragraph 3 is closest in meaning to',
        options: ['ancient', 'traditional', 'limited', 'substantial'],
        answer: [3],
        explanation:
          '"Considerable" significa "grande, notable" (substantial). El párrafo enumera muchos conocimientos técnicos (pigmentos, tubos, relieve, lámparas), lo que descarta "limited".',
      },
      {
        id: 'f12-rd-ap-lascaux-q4',
        kind: 'single',
        skill: 'inference',
        paragraph: 2,
        prompt: 'What can be inferred from paragraph 3 about the inner chambers of the cave?',
        options: [
          'They were painted before the outer chambers were.',
          'They contained the richest deposits of iron oxide.',
          'They would have been completely dark without fire.',
          'They were used mainly for storing animal fat.',
        ],
        answer: [2],
        explanation:
          'Como "no daylight reaches the inner chambers", los artistas usaban "stone lamps that burned animal fat"; se deduce que sin fuego no habría luz. La grasa animal se menciona como combustible, no como algo almacenado.',
      },
      {
        id: 'f12-rd-ap-lascaux-q5',
        kind: 'single',
        skill: 'purpose',
        paragraph: 3,
        prompt: 'Why does the author mention "holes cut into the rock" in paragraph 4?',
        options: [
          'To support the claim that painters cooperated',
          'To explain how the artists mixed their pigments',
          'To show that some paintings were later damaged',
          'To describe how the cave was first entered in 1940',
        ],
        answer: [0],
        explanation:
          'El párrafo 4 empieza con "the paintings point to cooperation"; los agujeros indican que hubo "wooden platforms", lo que requirió "planning and shared effort". No se relacionan con los pigmentos.',
      },
    ],
  },
  {
    id: 'f12-rd-ap-3d-printing',
    form: 12,
    section: 'reading',
    task: 'academic-passage',
    title: 'Printing in Thin Layers',
    topic: 'technology',
    difficulty: 'medium',
    paragraphs: [
      'Most traditional manufacturing is subtractive: a machine starts with a solid block of material and cuts, drills, or grinds away everything that is not part of the final product. Three-dimensional (3D) printing reverses this logic. Known more formally as additive manufacturing, it builds an object by depositing material only where it is needed, one thin layer at a time.',
      'The process begins with a digital model, usually drawn in computer-aided design software. Before printing, a program called a slicer divides the model into hundreds or thousands of horizontal cross sections, each often less than a third of a millimeter thick. For every slice, the software calculates the exact path the printer must follow. The printer then reproduces the slices in order, starting at the bottom, so that each new layer rests on and bonds to the one beneath it.',
      'Printers differ mainly in how they form each layer. In the most common home machines, a plastic filament is melted and pushed through a heated nozzle, which traces the outline of each slice and fills in its interior; the plastic hardens almost immediately as it cools. Other printers use a laser to harden a liquid resin or to fuse fine powder particles together. Whatever the method, parts that overhang empty space pose a problem, since material cannot be deposited onto air. Printers therefore add temporary supports, which are removed once the object is finished.',
      'Building layer by layer brings both advantages and limitations. Because no cutting tool needs to reach inside the object, printers can create hollow structures and intricate internal channels that would be impossible to machine. Each item can also be customized at little extra cost, which is why the technology is used to make dental devices and hearing-aid shells shaped to individual patients. However, printing is slow compared with mass-production methods such as molding, and printed objects are often weaker along the boundaries between layers than within them.',
    ],
    questions: [
      {
        id: 'f12-rd-ap-3d-printing-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'Which of the following best expresses the main idea of the passage?',
        options: [
          'Home 3D printers now work as fast as factory production lines.',
          'Subtractive methods waste more material than any other process.',
          'Laser-based printers have replaced machines that melt plastic.',
          '3D printing builds objects layer by layer, with pros and cons.',
        ],
        answer: [3],
        explanation:
          'El texto explica que la impresión 3D "builds an object… one thin layer at a time", describe el proceso y termina con "both advantages and limitations". La primera opción contradice "printing is slow compared with mass-production methods".',
      },
      {
        id: 'f12-rd-ap-3d-printing-q2',
        kind: 'single',
        skill: 'detail',
        paragraph: 1,
        prompt: 'According to paragraph 2, what does a slicer do?',
        options: [
          'It melts plastic filament before it reaches the nozzle.',
          'It removes the supports once an object is complete.',
          'It divides a digital model into thin horizontal layers.',
          'It draws the original design of the object on screen.',
        ],
        answer: [2],
        explanation:
          'El párrafo 2 dice que "a program called a slicer divides the model into hundreds or thousands of horizontal cross sections". El diseño original se hace antes, en "computer-aided design software".',
      },
      {
        id: 'f12-rd-ap-3d-printing-q3',
        kind: 'single',
        skill: 'vocabulary',
        paragraph: 3,
        highlight: 'intricate',
        prompt: 'The word "intricate" in paragraph 4 is closest in meaning to',
        options: ['temporary', 'complicated', 'narrow', 'microscopic'],
        answer: [1],
        explanation:
          '"Intricate" significa "complejo, lleno de detalles" (complicated). Se refiere a canales internos que "would be impossible to machine" por su complejidad. "Narrow" (estrecho) no es sinónimo.',
      },
      {
        id: 'f12-rd-ap-3d-printing-q4',
        kind: 'single',
        skill: 'negative-factual',
        paragraph: 2,
        prompt: 'According to paragraph 3, all of the following are ways printers form layers EXCEPT',
        options: [
          'carving away material with a rotating blade',
          'pushing melted plastic through a heated nozzle',
          'using a laser to harden a liquid resin',
          'fusing fine powder particles with a laser',
        ],
        answer: [0],
        explanation:
          'El párrafo 3 menciona el filamento fundido ("pushed through a heated nozzle"), la resina endurecida por láser y el polvo fusionado. Cortar material es propio de la fabricación "subtractive" del párrafo 1, no de la impresión 3D.',
      },
      {
        id: 'f12-rd-ap-3d-printing-q5',
        kind: 'single',
        skill: 'inference',
        paragraph: 3,
        prompt: 'What can be inferred from paragraph 4 about molding?',
        options: [
          'It is the best way to make devices for individual patients.',
          'It can produce hollow internal channels more easily.',
          'It is more efficient for making many identical items.',
          'It produces objects that are weak between their layers.',
        ],
        answer: [2],
        explanation:
          'El texto dice que "printing is slow compared with mass-production methods such as molding", por lo que el moldeo es más eficiente para fabricar en serie. Los dispositivos personalizados se asocian a la impresión 3D, no al moldeo.',
      },
    ],
  },
  {
    id: 'f12-rd-ap-cosmic-background',
    form: 12,
    section: 'reading',
    task: 'academic-passage',
    title: 'Afterglow of the Big Bang',
    topic: 'astronomy',
    difficulty: 'hard',
    paragraphs: [
      'For much of the twentieth century, astronomers debated two competing pictures of the universe. According to the steady-state theory, the cosmos had no beginning and looked essentially the same at all times, with new matter continually appearing as space expanded. The Big Bang theory, by contrast, held that the universe had evolved from an extremely hot, dense early state. Both models could account for the observation that distant galaxies are moving away from us, so astronomers needed evidence that one model predicted and the other did not.',
      'The Big Bang theory supplied such a prediction. If the young universe had been hot and dense, it would have been filled with a glowing plasma of charged particles in which light could not travel far before being scattered by free electrons. Roughly 380,000 years after the beginning, the universe had cooled to about 3,000 kelvins, cool enough for electrons to combine with nuclei and form neutral atoms. At that point the universe became transparent, and the light released then has been traveling through space ever since. As space expanded, this radiation should have been stretched to much longer wavelengths, so that today it would arrive not as visible light but as faint microwaves from every direction.',
      'In 1965, two researchers in New Jersey who were preparing a sensitive antenna for radio observations encountered a persistent background hiss that they could not eliminate. At first, they suspected a fault in their own equipment. The hiss came equally from all parts of the sky and did not vary with the time of day or the season. Physicists soon recognized the signal as the predicted afterglow, now called the cosmic microwave background (CMB). Later measurements, especially from the COBE satellite launched in 1989, showed that the radiation has an almost perfect thermal spectrum corresponding to a temperature of about 2.7 degrees above absolute zero. The steady-state theory offered no natural way to produce such radiation, and most astronomers abandoned it.',
      'The CMB is not perfectly uniform, however. Satellites have mapped tiny temperature variations of roughly one part in 100,000 across the sky. Far from being a flaw, these ripples record slight differences in density in the early universe. Regions that were marginally denser drew in more matter through gravity, eventually forming the seeds of galaxies and clusters. The background radiation is therefore not only evidence that the Big Bang occurred but also a record of the conditions from which present-day structures emerged.',
    ],
    questions: [
      {
        id: 'f12-rd-ap-cosmic-background-q1',
        kind: 'single',
        skill: 'organization',
        prompt: 'How is the passage organized?',
        options: [
          'A debate is introduced, a key prediction is explained, and confirming evidence follows.',
          'Two theories are compared, and the author concludes that neither fits the evidence.',
          'An accidental discovery is described first, before the theory that predicted it is explained.',
          'Several satellite missions are compared according to the precision of their data.',
        ],
        answer: [0],
        explanation:
          'El párrafo 1 presenta el debate entre dos teorías, el 2 explica la predicción del Big Bang ("supplied such a prediction") y el 3 y el 4 describen las pruebas. La tercera opción invierte el orden: la predicción se explica antes del descubrimiento.',
      },
      {
        id: 'f12-rd-ap-cosmic-background-q2',
        kind: 'single',
        skill: 'detail',
        paragraph: 1,
        prompt: 'According to paragraph 2, why could light not travel far in the very early universe?',
        options: [
          'The universe was too small for light to spread out.',
          'Gravity pulled the light back toward dense regions.',
          'Neutral atoms absorbed nearly all of the light.',
          'Free electrons in the plasma kept scattering it.',
        ],
        answer: [3],
        explanation:
          'La luz "could not travel far before being scattered by free electrons". Los átomos neutros aparecieron después y precisamente hicieron que el universo se volviera "transparent", así que esa opción es la trampa.',
      },
      {
        id: 'f12-rd-ap-cosmic-background-q3',
        kind: 'single',
        skill: 'vocabulary',
        paragraph: 2,
        highlight: 'persistent',
        prompt: 'The word "persistent" in paragraph 3 is closest in meaning to',
        options: ['faint', 'sudden', 'continuing', 'unexplained'],
        answer: [2],
        explanation:
          '"Persistent" significa "que continúa, constante": el ruido no se podía eliminar ("could not eliminate") y no variaba con la hora ni la estación. "Unexplained" (sin explicación) encaja con la situación, pero no es el significado de la palabra.',
      },
      {
        id: 'f12-rd-ap-cosmic-background-q4',
        kind: 'single',
        skill: 'inference',
        paragraph: 2,
        prompt: 'What can be inferred from paragraph 3 about the two researchers?',
        options: [
          'They had built the antenna to test the Big Bang theory.',
          'They did not at first realize what they had detected.',
          'They believed the noise was produced by the Sun.',
          'They later designed instruments for the COBE satellite.',
        ],
        answer: [1],
        explanation:
          'Al principio "they suspected a fault in their own equipment", y fueron otros, "Physicists", quienes reconocieron la señal como "the predicted afterglow". Se deduce que no entendieron de inmediato lo que habían detectado. El texto no menciona el Sol ni que buscaran confirmar el Big Bang.',
      },
      {
        id: 'f12-rd-ap-cosmic-background-q5',
        kind: 'single',
        skill: 'paragraph-relation',
        paragraph: 3,
        prompt: 'How does paragraph 4 relate to paragraph 3?',
        options: [
          'It presents data that contradict the measurements in paragraph 3.',
          'It explains why the steady-state theory was later revived.',
          'It describes the antenna used in the 1965 discovery in detail.',
          'It adds that tiny variations in the CMB are also meaningful.',
        ],
        answer: [3],
        explanation:
          'El párrafo 3 dice que la radiación llega "equally from all parts of the sky"; el 4 matiza que "is not perfectly uniform" y que esas variaciones "record slight differences in density". No contradicen el párrafo 3: lo complementan ("Far from being a flaw").',
      },
    ],
  },
  {
    id: 'f12-rd-ap-proto-indo-european',
    form: 12,
    section: 'reading',
    task: 'academic-passage',
    title: 'Reconstructing a Lost Ancestor',
    topic: 'linguistics',
    difficulty: 'hard',
    paragraphs: [
      'In 1786, the British scholar William Jones observed that Sanskrit, the classical language of India, resembled Greek and Latin so closely in vocabulary and grammar that all three must have come from a common source. Over the following century, linguists showed that most languages of Europe and many of South and Western Asia descend from a single ancestor, now called Proto-Indo-European. Its speakers left no written records, so its words and grammar are known only through reconstruction.',
      'The tool that makes such reconstruction possible is the comparative method. Linguists first collect cognates, words in related languages that descend from the same original word. They focus on basic vocabulary such as numbers, body parts, and kinship terms, which are rarely borrowed from other languages. They then look not for mere resemblances but for regular sound correspondences. For example, where Latin and Greek have a p at the beginning of a word, English and the other Germanic languages consistently have an f: compare Latin pater and English father, or Latin piscis and English fish.',
      'Such regularity is the key to the method. In the late nineteenth century, a group of scholars known as the Neogrammarians argued that sound changes operate without exceptions: when a sound changes in a language, it changes in every word in which it occurs under the same conditions. This principle allows linguists to separate chance similarities from genuine inheritance and to work backward to the most likely original sound. Since p appears in most branches of the family while f is limited to Germanic, the ancestral sound is reconstructed as *p, and the Germanic f is treated as a later development. The asterisk signals that a form is inferred rather than attested in any document.',
      "The method's power is clearest when its predictions are confirmed. In 1879, the young Swiss linguist Ferdinand de Saussure proposed, purely on the basis of patterns within the reconstructed language, that Proto-Indo-European had contained sounds that had disappeared from every known daughter language. Decades later, scholars deciphered Hittite, an Indo-European language recorded on clay tablets from ancient Anatolia, and found consonants in the positions Saussure had predicted. Discoveries like this show that reconstructed languages, though never directly observed, are far more than educated guesses.",
    ],
    questions: [
      {
        id: 'f12-rd-ap-proto-indo-european-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'What is the passage mainly about?',
        options: [
          'Why Sanskrit is considered older than Greek and Latin',
          'How the Germanic languages came to use the sound f',
          'How linguists reconstruct an unrecorded parent language',
          'Why Hittite was the last Indo-European language deciphered',
        ],
        answer: [2],
        explanation:
          'El texto explica cómo el "comparative method" permite reconstruir el protoindoeuropeo, cuyos hablantes "left no written records". El caso de la f germánica es solo un ejemplo dentro de esa explicación.',
      },
      {
        id: 'f12-rd-ap-proto-indo-european-q2',
        kind: 'single',
        skill: 'detail',
        paragraph: 1,
        prompt: 'According to paragraph 2, why do linguists focus on basic vocabulary when collecting cognates?',
        options: [
          'Basic words change their sounds faster than other words.',
          'Such words are seldom taken from other languages.',
          'Such words appear most often in ancient documents.',
          'Basic words are the easiest to translate into English.',
        ],
        answer: [1],
        explanation:
          'El párrafo 2 indica que se eligen números, partes del cuerpo y parentesco porque "are rarely borrowed from other languages". "Seldom taken" equivale a "rarely borrowed". El texto no dice que cambien más rápido.',
      },
      {
        id: 'f12-rd-ap-proto-indo-european-q3',
        kind: 'single',
        skill: 'vocabulary',
        paragraph: 2,
        highlight: 'attested',
        prompt: 'The word "attested" in paragraph 3 is closest in meaning to',
        options: ['documented', 'pronounced', 'predicted', 'translated'],
        answer: [0],
        explanation:
          '"Attested" significa "registrado, documentado". El texto contrapone "inferred" (deducido) con "attested in any document" (que aparece por escrito). "Predicted" se acerca más a "inferred", que es justo lo contrario.',
      },
      {
        id: 'f12-rd-ap-proto-indo-european-q4',
        kind: 'single',
        skill: 'inference',
        paragraph: 2,
        prompt: 'What can be inferred from paragraph 3 about how linguists choose between possible original sounds?',
        options: [
          'They prefer the sound found in the oldest written texts.',
          'They assume that the sound used in English is original.',
          'They select the sound that Latin uses whenever possible.',
          'They favor the explanation requiring the fewest changes.',
        ],
        answer: [3],
        explanation:
          'Como la p aparece "in most branches" y la f "is limited to Germanic", se reconstruye *p y la f se considera "a later development": un solo cambio en una rama es más sencillo que muchos cambios. No se elige por ser latín, sino por la distribución.',
      },
      {
        id: 'f12-rd-ap-proto-indo-european-q5',
        kind: 'single',
        skill: 'purpose',
        paragraph: 3,
        prompt: 'Why does the author mention Hittite in paragraph 4?',
        options: [
          "To show that Saussure's proposal was later rejected",
          'To give an example of a prediction that was confirmed',
          'To explain where Proto-Indo-European was first spoken',
          'To argue that Hittite is the ancestor of Sanskrit',
        ],
        answer: [1],
        explanation:
          'El párrafo 4 empieza con "The method\'s power is clearest when its predictions are confirmed"; en el hitita se hallaron consonantes "in the positions Saussure had predicted". Su propuesta se confirmó, no se rechazó.',
      },
    ],
  },
];
