import type { ReadingSet } from '../../../types';

/** Simulación n.º 6 — Reading (contenido original). */
export const sets: ReadingSet[] = [
  // ---------- Complete the Words ----------
  {
    id: 'f06-rd-cw-borrowing',
    form: 6,
    section: 'reading',
    task: 'complete-words',
    title: 'Borrowed Words Across Languages',
    topic: 'linguistics',
    difficulty: 'easy',
    text:
      'No language develops in complete isolation, and most languages contain many words borrowed from their neighbors. When {{peo|ple}} trade, {{tra|vel}}, or {{li|ve}} side {{b|y}} side, {{th|ey}} often {{bor|row}} terms {{f|or}} new {{dis|hes}}, tools, {{a|nd}} ideas. English, {{f|or}} example, took ballet from French, kindergarten from German, and tsunami from Japanese. Over time, borrowed words are usually adapted to the sounds and grammar of the new language, so many speakers never notice that they came from abroad.',
    note: 'Observa la enumeración paralela "trade, travel, or live", la expresión fija "side by side" y el conector "for example", que introduce ejemplos concretos.',
  },
  {
    id: 'f06-rd-cw-autumn-leaves',
    form: 6,
    section: 'reading',
    task: 'complete-words',
    title: 'Why Autumn Leaves Change Color',
    topic: 'biology',
    difficulty: 'medium',
    text:
      'In autumn, the leaves of many deciduous trees turn from green to yellow, orange, or red. During {{t|he}} summer, {{lea|ves}} contain {{la|rge}} amounts {{o|f}} chlorophyll, {{t|he}} green {{pig|ment}} that {{abs|orbs}} sunlight {{f|or}} photosynthesis. {{Wh|en}} days {{bec|ome}} shorter in the fall, trees stop producing new chlorophyll, and the existing supply breaks down. This reveals yellow and orange pigments called carotenoids, which were present all along but hidden by the green. Some trees, such as maples, also produce red pigments called anthocyanins in autumn.',
    note: 'Fíjate en la colocación "large amounts of" y en la concordancia: "pigment that absorbs" (singular). "When days become shorter" expresa una condición temporal.',
  },
  {
    id: 'f06-rd-cw-rosetta',
    form: 6,
    section: 'reading',
    task: 'complete-words',
    title: 'Decoding the Rosetta Stone',
    topic: 'history',
    difficulty: 'hard',
    text:
      'The Rosetta Stone, discovered in Egypt in 1799, records a single decree in three scripts: hieroglyphic, demotic, and ancient Greek. Because {{scho|lars}} could {{st|ill}} read Greek, {{t|he}} inscription {{off|ered}} an {{extrao|rdinary}} opportunity {{t|o}} compare {{a|n}} unknown {{wri|ting}} system {{wi|th}} a {{reli|able}} translation. Earlier researchers had assumed that hieroglyphs were purely symbolic, representing ideas rather than sounds. Jean-François Champollion, however, demonstrated in 1822 that many signs functioned phonetically, especially in the oval rings, called cartouches, that enclosed royal names. His breakthrough laid the foundation of modern Egyptology.',
    note: 'Apóyate en las colocaciones "offered an extraordinary opportunity" y "a reliable translation"; "could still read" indica que el griego seguía siendo legible para los estudiosos.',
  },

  // ---------- Read in Daily Life ----------
  {
    id: 'f06-rd-dl-lost-found',
    form: 6,
    section: 'reading',
    task: 'daily-life',
    genre: 'notice',
    title: 'Student Union Found Items',
    topic: 'campus-life',
    difficulty: 'easy',
    header: ['STUDENT UNION LOST-AND-FOUND — Items Turned In This Week'],
    text:
      'The following items were turned in to the Information Desk (Student Union, first floor) between March 3 and March 9:\n• Black umbrella with a wooden handle\n• Blue water bottle covered in stickers\n• Gray hooded sweatshirt (size M)\n• Silver bracelet\n• Three keys on a red ring\n\nTo claim an item, visit the desk Monday–Friday, 9 a.m.–6 p.m., and describe it in detail. Keys, jewelry, and electronics are released only to owners who show a valid student ID. Items not claimed within 30 days will be donated to a local charity.',
    questions: [
      {
        id: 'f06-rd-dl-lost-found-q1',
        kind: 'single',
        skill: 'detail',
        prompt: 'What must a student do to collect the silver bracelet?',
        options: [
          'Complete an online claim form in advance',
          'Come to the desk on a Saturday morning',
          'Describe it and present a valid student ID',
          'Pay a small fee at the Information Desk',
        ],
        answer: [2],
        explanation:
          'Hay que describir el objeto ("describe it in detail") y, por ser una joya, "jewelry ... released only to owners who show a valid student ID". El sábado no sirve porque el horario es "Monday–Friday"; no se menciona ningún formulario ni tarifa.',
      },
      {
        id: 'f06-rd-dl-lost-found-q2',
        kind: 'single',
        skill: 'inference',
        prompt: 'What will probably happen to the gray sweatshirt if nobody claims it by the end of April?',
        options: [
          'It will be given away to a charity.',
          'It will be moved to a different floor.',
          'It will be sold at a student union sale.',
          'It will be kept until the semester ends.',
        ],
        answer: [0],
        explanation:
          'Se entregó entre el 3 y el 9 de marzo, y "Items not claimed within 30 days will be donated to a local charity". A finales de abril ya habrán pasado más de 30 días. El aviso no habla de venderlo ni de guardarlo hasta fin de semestre.',
      },
    ],
  },
  {
    id: 'f06-rd-dl-late-bus',
    form: 6,
    section: 'reading',
    task: 'daily-life',
    genre: 'text-message',
    title: 'Running Late for Chem Lab',
    topic: 'campus-life',
    difficulty: 'easy',
    text:
      "Priya (8:41 a.m.): Hi Sam, my bus is stuck in traffic on Route 9. I'll be about 20 minutes late for chem lab.\nSam (8:42 a.m.): Oh no! Dr. Hale said we have to finish the titration today.\nPriya (8:43 a.m.): I know. Could you start setting up? Grab a burette and two flasks from the cart, and rinse them with distilled water first.\nSam (8:44 a.m.): Got it. Should I fill the burette too?\nPriya (8:45 a.m.): Not yet. Wait until I get there so we can record the starting volume together.",
    questions: [
      {
        id: 'f06-rd-dl-late-bus-q1',
        kind: 'single',
        skill: 'detail',
        prompt: 'What does Priya ask Sam to do?',
        options: [
          'Tell Dr. Hale that she will miss the whole lab',
          'Get the equipment and rinse it with water',
          'Fill the burette before the lab begins',
          'Record the starting volume without her',
        ],
        answer: [1],
        explanation:
          'Priya escribe: "Grab a burette and two flasks from the cart, and rinse them with distilled water first." La opción de llenar la bureta es la trampa: cuando Sam lo pregunta, ella responde "Not yet".',
      },
      {
        id: 'f06-rd-dl-late-bus-q2',
        kind: 'single',
        skill: 'inference',
        prompt: 'Why does Priya most likely want Sam to wait before filling the burette?',
        options: [
          'She thinks the distilled water is not clean.',
          'She is afraid Sam will spill the liquid on the floor.',
          'Dr. Hale has not approved their procedure yet.',
          'She wants them both to note the first measurement.',
        ],
        answer: [3],
        explanation:
          'Ella explica: "Wait until I get there so we can record the starting volume together". Quiere estar presente para anotar la medida inicial. Nada indica que el agua esté sucia ni que tema un derrame.',
      },
    ],
  },
  {
    id: 'f06-rd-dl-career-fair',
    form: 6,
    section: 'reading',
    task: 'daily-life',
    genre: 'schedule',
    title: 'Spring Career Fair Schedule',
    topic: 'campus-life',
    difficulty: 'medium',
    header: ['Spring Career Fair — Thursday, April 9 — Hollis Student Center'],
    text:
      '9:00–9:45 a.m. Welcome and Fair Overview (Ballroom A)\n10:00 a.m.–3:00 p.m. Employer Booths Open (Ballrooms B and C)\n10:30–11:15 a.m. Presentation: Careers in Renewable Energy (Room 204)\n11:00 a.m.–1:00 p.m. Resume Clinic, walk-in (Room 210)\n1:30–2:15 p.m. Presentation: Data Jobs in Health Care (Room 204)\n2:00–4:00 p.m. Resume Clinic, appointment only (Room 210; book at the Career Center website)\n\nNotes: Bring at least ten printed copies of your resume. Business casual dress is recommended. Students who attend the Welcome session receive a priority pass that lets them skip the line at the three busiest employer booths.',
    questions: [
      {
        id: 'f06-rd-dl-career-fair-q1',
        kind: 'single',
        skill: 'detail',
        prompt: 'A student who cannot arrive until 2:30 p.m. wants help with a resume. What should the student do?',
        options: [
          'Wait in line at Room 210 for a walk-in slot',
          'Attend the Welcome session for a priority pass',
          'Ask for feedback at a booth in Ballroom B',
          'Book a clinic appointment online in advance',
        ],
        answer: [3],
        explanation:
          'Por la tarde la clínica es "2:00–4:00 p.m. Resume Clinic, appointment only (... book at the Career Center website)". La opción "walk-in" es la trampa: esa modalidad terminó a la 1:00 p.m.',
      },
      {
        id: 'f06-rd-dl-career-fair-q2',
        kind: 'single',
        skill: 'inference',
        prompt: 'What is implied about students who skip the Welcome session?',
        options: [
          'They may have to wait longer at the most popular booths.',
          'They will not be allowed into Ballrooms B and C.',
          'They cannot attend the afternoon presentation.',
          'They must bring extra copies of their resume.',
        ],
        answer: [0],
        explanation:
          'Solo quienes asisten a la bienvenida reciben un pase "that lets them skip the line at the three busiest employer booths"; los demás probablemente harán fila. No se dice que no puedan entrar a los salones ni a las presentaciones.',
      },
      {
        id: 'f06-rd-dl-career-fair-q3',
        kind: 'single',
        skill: 'detail',
        prompt: 'Which event takes place in the same room as the presentation on data jobs?',
        options: [
          'The welcome and fair overview',
          'The walk-in resume clinic',
          'The renewable energy presentation',
          'The appointment-only resume clinic',
        ],
        answer: [2],
        explanation:
          'La charla "Data Jobs in Health Care" es en "Room 204", igual que "Careers in Renewable Energy (Room 204)". Las clínicas de currículum son en la sala 210 y la bienvenida en el Ballroom A.',
      },
    ],
  },
  {
    id: 'f06-rd-dl-coworking',
    form: 6,
    section: 'reading',
    task: 'daily-life',
    genre: 'advertisement',
    title: 'Coworking Memberships for Freelancers',
    topic: 'daily-life',
    difficulty: 'medium',
    header: ['The Workroom on Fifth — Coworking for Freelancers'],
    text:
      'Tired of working from your kitchen table? Choose the membership that fits your schedule:\n\nFlex — $90/month: 8 days of access per month, any open desk, Monday–Friday, 8 a.m.–6 p.m.\nResident — $190/month: unlimited access Monday–Saturday, 7 a.m.–10 p.m., any open desk, 4 hours of meeting-room time.\nDedicated — $320/month: your own reserved desk with a locking cabinet, 24/7 access, 10 hours of meeting-room time, and mail handling.\n\nAll plans include high-speed Wi-Fi, free coffee, and up to 100 printed pages per month. Extra meeting-room hours cost $15 each. Sign up for any plan for three months and get the first month at half price. Ask at the front desk about a free one-day trial.',
    questions: [
      {
        id: 'f06-rd-dl-coworking-q1',
        kind: 'single',
        skill: 'detail',
        prompt: 'A graphic designer often works until midnight. Which membership would allow this?',
        options: [
          'Flex, with eight days of access per month',
          'Dedicated, with its own reserved desk',
          'Resident, with access six days a week',
          'Any plan that starts with a free trial day',
        ],
        answer: [1],
        explanation:
          'Solo el plan Dedicated ofrece "24/7 access". Resident es la trampa: tiene acceso amplio, pero solo de "7 a.m.–10 p.m."; Flex cierra a las 6 p.m.',
      },
      {
        id: 'f06-rd-dl-coworking-q2',
        kind: 'single',
        skill: 'inference',
        prompt: 'A Resident member uses the meeting room for six hours in one month. How much extra will she pay?',
        options: ['Nothing extra', '$15', '$30', '$60'],
        answer: [2],
        explanation:
          'El plan Resident incluye "4 hours of meeting-room time"; las dos horas adicionales cuestan "$15 each", es decir, 30 dólares. "Nothing extra" sería correcto solo con el plan Dedicated (10 horas).',
      },
      {
        id: 'f06-rd-dl-coworking-q3',
        kind: 'single',
        skill: 'purpose',
        prompt: 'What is the main purpose of the advertisement?',
        options: [
          'To compare memberships suited to different work needs',
          'To announce that the space will soon open on weekends',
          'To explain new prices for printing and meeting rooms',
          'To invite freelancers to a networking event downstairs',
        ],
        answer: [0],
        explanation:
          'El anuncio invita a elegir "the membership that fits your schedule" y describe tres planes con precios y ventajas distintas. Los precios de impresión y salas son solo detalles, no el propósito principal.',
      },
    ],
  },
  {
    id: 'f06-rd-dl-volunteer-memo',
    form: 6,
    section: 'reading',
    task: 'daily-life',
    genre: 'memo',
    title: 'Volunteer Badge Check-In Changes',
    topic: 'daily-life',
    difficulty: 'hard',
    header: [
      'MEMO',
      'To: All Volunteers, Lakemont Regional Hospital',
      'From: Dana Whitfield, Volunteer Services Coordinator',
      'Re: Badge check-in and shift changes',
    ],
    text:
      'Beginning Monday, May 4, all volunteers must scan their ID badges at the new kiosk inside the staff entrance instead of signing the paper log at the front desk. Scanning in and out records your hours automatically, so please do both every shift. If your badge does not scan, do not keep tapping it; go to Security on the ground floor, where a temporary pass can be issued. Volunteers who forget their badge entirely will not be permitted on patient floors that day.\n\nBecause the gift shop will be closed for renovation from May 4 to June 12, the volunteers normally assigned there have been moved to the information desk and the patient transport team. Your new assignment and shift times are listed in the volunteer portal. If the new times conflict with your availability, contact me by April 30; requests received after that date cannot be guaranteed.',
    questions: [
      {
        id: 'f06-rd-dl-volunteer-memo-q1',
        kind: 'single',
        skill: 'detail',
        prompt: "What should a volunteer do if the kiosk cannot read his or her badge?",
        options: [
          'Sign the paper log at the front desk instead',
          'Scan the badge several more times until it works',
          'Ask the coordinator to record the hours by hand',
          'Go to Security to receive a temporary pass',
        ],
        answer: [3],
        explanation:
          'El memo indica: "If your badge does not scan, do not keep tapping it; go to Security ..., where a temporary pass can be issued". El registro en papel es la trampa: es el sistema antiguo que se reemplaza.',
      },
      {
        id: 'f06-rd-dl-volunteer-memo-q2',
        kind: 'single',
        skill: 'inference',
        prompt: 'What can be inferred about volunteers who usually work in the gift shop?',
        options: [
          'They will not be needed until the renovation ends.',
          'They will have different duties while the shop is closed.',
          'They must scan their badges at the gift shop entrance.',
          'They may choose which of the two new teams they want to join.',
        ],
        answer: [1],
        explanation:
          'Durante la renovación "have been moved to the information desk and the patient transport team", así que tendrán otras tareas temporalmente. No eligen equipo: la asignación ya aparece "listed in the volunteer portal".',
      },
      {
        id: 'f06-rd-dl-volunteer-memo-q3',
        kind: 'single',
        skill: 'purpose',
        prompt: 'Why does the coordinator mention April 30?',
        options: [
          'It is the date when the new check-in kiosk will be installed.',
          'It is the last day the paper log can be used.',
          'It is the deadline for reporting a scheduling conflict.',
          'It is when the volunteer portal will post new shifts.',
        ],
        answer: [2],
        explanation:
          'La fecha aparece en "If the new times conflict with your availability, contact me by April 30": es el plazo para avisar de un conflicto de horario. El cambio al quiosco empieza el 4 de mayo, no el 30 de abril.',
      },
    ],
  },

  // ---------- Read an Academic Passage ----------
  {
    id: 'f06-rd-ap-geysers',
    form: 6,
    section: 'reading',
    task: 'academic-passage',
    title: 'How Geysers Erupt',
    topic: 'geology',
    difficulty: 'easy',
    paragraphs: [
      "A geyser is a hot spring that periodically shoots a column of water and steam into the air. Geysers are rare because they form only where three conditions occur together: a strong source of heat, a plentiful supply of water, and a special underground plumbing system. Yellowstone National Park in the United States contains about half of the world's geysers, including the famous Old Faithful.",
      'The heat comes from magma, or molten rock, that lies relatively close to the surface in volcanic regions. Rain and melted snow seep down through cracks in the ground and collect in narrow channels in the hot rock. There, the water is heated well beyond its normal boiling point of 100°C. It does not boil right away because the weight of the water above it creates great pressure, and water under pressure must become hotter before it can turn into steam.',
      'Eventually, water near the top of the system begins to boil, and rising bubbles push some water out of the vent. This small overflow reduces the pressure on the very hot water below, which suddenly flashes into steam. Because steam takes up far more space than liquid water, it expands violently and forces the remaining water upward in an eruption. Once the channels are empty, the cycle starts again as groundwater slowly refills them.',
      'Old Faithful earned its name because its eruptions are unusually regular. It erupts roughly every 60 to 110 minutes, and park rangers predict the next eruption from the length of the previous one: a long eruption empties more water and is followed by a longer wait. Even Old Faithful can change, however, because earthquakes sometimes alter its underground channels.',
    ],
    questions: [
      {
        id: 'f06-rd-ap-geysers-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'What is the passage mainly about?',
        options: [
          'Why Yellowstone National Park has so many hot springs',
          'How park rangers measure the height of eruptions',
          'The conditions and process that cause geysers to erupt',
          'The ways that earthquakes destroy underground channels',
        ],
        answer: [2],
        explanation:
          'El texto presenta las tres condiciones necesarias ("heat", "water", "plumbing system"), explica el proceso de la erupción y lo ilustra con Old Faithful. Yellowstone y los terremotos son solo detalles.',
      },
      {
        id: 'f06-rd-ap-geysers-q2',
        kind: 'single',
        skill: 'detail',
        paragraph: 1,
        prompt: 'According to paragraph 2, why does the underground water not boil at 100°C?',
        options: [
          'The water above it puts it under great pressure.',
          'The surrounding rock absorbs most of the heat.',
          'Melted snow keeps the water temperature low.',
          'The magma is too far below the surface to heat it quickly.',
        ],
        answer: [0],
        explanation:
          'El párrafo 2 dice: "the weight of the water above it creates great pressure, and water under pressure must become hotter before it can turn into steam". El texto afirma lo contrario de la opción del magma: está "relatively close to the surface".',
      },
      {
        id: 'f06-rd-ap-geysers-q3',
        kind: 'single',
        skill: 'vocabulary',
        paragraph: 1,
        highlight: 'seep',
        prompt: 'The word "seep" in paragraph 2 is closest in meaning to',
        options: ['flow rapidly', 'freeze solid', 'evaporate quickly', 'leak gradually'],
        answer: [3],
        explanation:
          '"Seep" significa filtrarse poco a poco. La lluvia y la nieve derretida "seep down through cracks", es decir, se filtran lentamente por las grietas; "flow rapidly" expresa la idea opuesta de velocidad.',
      },
      {
        id: 'f06-rd-ap-geysers-q4',
        kind: 'single',
        skill: 'inference',
        paragraph: 3,
        prompt: 'What can be inferred from paragraph 4 about a short eruption of Old Faithful?',
        options: [
          'It means that an earthquake has just occurred.',
          'It is likely to be followed by a shorter wait.',
          'It usually sends water higher into the air.',
          'It empties more water than a long eruption.',
        ],
        answer: [1],
        explanation:
          'Si "a long eruption empties more water and is followed by a longer wait", se deduce que una erupción corta vacía menos agua y va seguida de una espera más breve. La última opción invierte la relación del texto.',
      },
      {
        id: 'f06-rd-ap-geysers-q5',
        kind: 'single',
        skill: 'purpose',
        paragraph: 2,
        prompt: 'Why does the author mention that steam "takes up far more space than liquid water" in paragraph 3?',
        options: [
          'To show why geysers are found only in volcanic areas',
          'To explain how groundwater refills the channels',
          'To compare geysers with ordinary hot springs',
          'To explain the force that drives an eruption',
        ],
        answer: [3],
        explanation:
          'La frase continúa: "it expands violently and forces the remaining water upward in an eruption". La expansión del vapor explica la fuerza de la erupción. El rellenado de los canales se menciona después, pero no es la razón de ese dato.',
      },
    ],
  },
  {
    id: 'f06-rd-ap-wind-turbines',
    form: 6,
    section: 'reading',
    task: 'academic-passage',
    title: 'Turning Wind into Electricity',
    topic: 'engineering',
    difficulty: 'medium',
    paragraphs: [
      'Wind is simply air in motion, and like any moving mass it carries kinetic energy. For centuries, windmills used this energy to grind grain or pump water. Modern wind turbines perform a different task: they convert the motion of air into electricity that can be fed into the power grid. Although turbines look simple from a distance, each one depends on careful engineering.',
      'The process begins with the blades. A turbine blade is not a flat paddle that is merely pushed by the wind; its curved cross-section resembles the wing of an airplane. As air flows across the blade, it moves faster over one surface than the other, creating a difference in pressure that produces lift. This lift pulls the blade sideways and makes the rotor spin. Because the rotor of a large turbine turns slowly, often fewer than twenty times per minute, its shaft is usually connected to a gearbox that raises the speed to the much higher rate a generator requires.',
      'Inside the generator, the rotating shaft turns magnets past coils of copper wire. According to the principle of electromagnetic induction, a changing magnetic field near a conductor causes an electric current to flow in it. The electricity produced in this way is adjusted to the proper voltage and sent down the tower to the grid. All of this equipment sits in a housing called the nacelle, mounted at the top of the tower behind the rotor.',
      'Engineers pay close attention to wind speed because the power available in the wind rises with the cube of its speed: if the wind speed doubles, the available power increases eightfold. This is one reason turbines are placed on tall towers, where winds are stronger and steadier than near the ground. Very strong winds, however, can damage the machine. Sensors therefore monitor conditions constantly, and in a storm the blades can be rotated so that they catch less wind, or the turbine can be stopped entirely.',
    ],
    questions: [
      {
        id: 'f06-rd-ap-wind-turbines-q1',
        kind: 'single',
        skill: 'organization',
        prompt: 'How is the passage organized?',
        options: [
          'It contrasts older windmills with modern turbines throughout.',
          'It follows energy through a turbine and then considers wind speed.',
          'It describes a problem with wind power and then offers several solutions.',
          'It traces the history of turbine designs from oldest to newest.',
        ],
        answer: [1],
        explanation:
          'Tras la introducción, el texto sigue el recorrido de la energía: "The process begins with the blades", después el generador y la "nacelle", y el último párrafo trata la velocidad del viento. Los molinos antiguos solo aparecen una vez en el párrafo 1.',
      },
      {
        id: 'f06-rd-ap-wind-turbines-q2',
        kind: 'single',
        skill: 'detail',
        paragraph: 1,
        prompt: 'According to paragraph 2, what causes the rotor to spin?',
        options: [
          'The wind pushes directly against the flat face of each blade.',
          'The gearbox drives the blades at a very high speed.',
          'Air moves at the same speed over both sides of the blade.',
          'A pressure difference across the curved blade creates lift.',
        ],
        answer: [3],
        explanation:
          'El texto explica que el aire va más rápido por una cara, "creating a difference in pressure that produces lift. This lift ... makes the rotor spin". La primera opción es justo lo que niega el texto: "not a flat paddle that is merely pushed".',
      },
      {
        id: 'f06-rd-ap-wind-turbines-q3',
        kind: 'single',
        skill: 'vocabulary',
        paragraph: 1,
        highlight: 'merely',
        prompt: 'The word "merely" in paragraph 2 is closest in meaning to',
        options: ['only', 'rarely', 'strongly', 'gradually'],
        answer: [0],
        explanation:
          '"Merely" significa simplemente o solo: la pala no es una paleta que el viento "solo empuja". "Strongly" no encaja porque el texto no habla de la intensidad del empuje.',
      },
      {
        id: 'f06-rd-ap-wind-turbines-q4',
        kind: 'single',
        skill: 'inference',
        paragraph: 1,
        prompt: 'What can be inferred from paragraph 2 about the generator?',
        options: [
          'It is located at the base of the tower.',
          'It works best when the blades are turning slowly.',
          'It must rotate faster than the rotor turns.',
          'It is connected directly to the blades.',
        ],
        answer: [2],
        explanation:
          'El rotor gira despacio y la caja de cambios "raises the speed to the much higher rate a generator requires"; por tanto, el generador necesita girar más rápido que el rotor. La primera opción contradice el párrafo 3, que sitúa el equipo "at the top of the tower".',
      },
      {
        id: 'f06-rd-ap-wind-turbines-q5',
        kind: 'single',
        skill: 'negative-factual',
        paragraph: 3,
        prompt: 'According to paragraph 4, which of the following is NOT mentioned as a way of protecting a turbine in strong winds?',
        options: [
          'Turning the blades so that they catch less wind',
          'Lowering the turbine closer to the ground',
          'Stopping the turbine completely',
          'Monitoring conditions with sensors',
        ],
        answer: [1],
        explanation:
          'El párrafo menciona sensores ("Sensors therefore monitor conditions"), girar las palas ("rotated so that they catch less wind") y detener la turbina ("stopped entirely"). Nunca se habla de bajarla; las torres altas se mencionan por otra razón: vientos más fuertes y estables.',
      },
    ],
  },
  {
    id: 'f06-rd-ap-cane-toads',
    form: 6,
    section: 'reading',
    task: 'academic-passage',
    title: 'Cane Toads in Australia',
    topic: 'environment',
    difficulty: 'hard',
    paragraphs: [
      'Invasive species are organisms that spread aggressively after being introduced, deliberately or accidentally, into regions outside their native range. Free from the predators, parasites, and diseases that kept their numbers in check at home, they can multiply rapidly and reshape the ecosystems they enter. Few cases illustrate this danger as clearly as that of the cane toad in Australia.',
      'Native to Central and South America, the cane toad was brought to the state of Queensland in 1935 to control beetles that were damaging sugarcane crops. The plan failed almost immediately. The adult beetles spent much of their time high on the cane stalks, and their larvae lived underground, so the ground-dwelling toads rarely encountered them. Instead of controlling a pest, the toads became one themselves. A single female can lay tens of thousands of eggs at a time, and with abundant food and few enemies, the population exploded. Today cane toads occupy well over a million square kilometers of northern and eastern Australia.',
      "The toad's most serious impact comes from its toxin. Glands on its shoulders produce poisons powerful enough to kill an animal that bites or swallows it. Because Australia has no native toads, its predators had never evolved resistance to these chemicals or an instinct to avoid them. As the toads advanced, populations of the northern quoll, a small carnivorous marsupial, and of large lizards called goannas declined sharply in many areas, in some places by as much as 90 percent. These losses in turn affected the animals that those predators had once kept under control, spreading the disruption through the food web.",
      'The invasion has also revealed how quickly evolution can act. Toads at the leading edge of the expansion tend to have longer legs and greater endurance than toads in long-established populations, and the front now advances considerably faster than it did in the early decades. Meanwhile, some native species are adapting: certain snakes have become more tolerant of the toxin, and some birds have learned to flip toads over and eat only the nonpoisonous parts. Conservationists have also trained quolls to avoid toads by feeding them small pieces of toad meat treated with a chemical that causes nausea. Because eradicating the toads now appears impossible, most efforts focus on protecting the most vulnerable species.',
    ],
    questions: [
      {
        id: 'f06-rd-ap-cane-toads-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'Which of the following best expresses the main idea of the passage?',
        options: [
          'Cane toads were brought to Australia to protect native predators.',
          'Sugarcane farming in Queensland was ruined by an invasive beetle.',
          'Native Australian animals have fully adapted to the cane toad.',
          'An introduced toad has spread widely and disrupted native ecosystems.',
        ],
        answer: [3],
        explanation:
          'El pasaje presenta el caso como ejemplo de especie invasora ("Few cases illustrate this danger as clearly"), explica su expansión y sus efectos en la red trófica. La adaptación de algunas especies es parcial ("some native species are adapting"), no total.',
      },
      {
        id: 'f06-rd-ap-cane-toads-q2',
        kind: 'single',
        skill: 'detail',
        paragraph: 1,
        prompt: 'According to paragraph 2, why did the cane toads fail to control the beetles?',
        options: [
          'The beetles were poisonous to the toads.',
          'The toads seldom came into contact with the beetles.',
          'The toads preferred to feed on the sugarcane itself.',
          'The beetles had already left Queensland by 1935.',
        ],
        answer: [1],
        explanation:
          'Los escarabajos adultos estaban "high on the cane stalks" y las larvas "underground", así que "the ground-dwelling toads rarely encountered them". El veneno pertenece al sapo, no al escarabajo, por eso la primera opción es incorrecta.',
      },
      {
        id: 'f06-rd-ap-cane-toads-q3',
        kind: 'single',
        skill: 'vocabulary',
        paragraph: 2,
        highlight: 'sharply',
        prompt: 'The word "sharply" in paragraph 3 is closest in meaning to',
        options: ['dramatically', 'temporarily', 'gradually', 'occasionally'],
        answer: [0],
        explanation:
          '"Declined sharply" significa que disminuyeron de forma brusca y marcada, como confirma "by as much as 90 percent". "Gradually" y "slightly" expresan lo contrario.',
      },
      {
        id: 'f06-rd-ap-cane-toads-q4',
        kind: 'single',
        skill: 'inference',
        paragraph: 3,
        prompt: 'What can be inferred from paragraph 4 about toads at the front of the invasion?',
        options: [
          'They are more poisonous than toads in older populations.',
          'They are easier for native birds to catch and flip over.',
          'Their physical traits help them travel longer distances.',
          'They move more slowly than the first toads released.',
        ],
        answer: [2],
        explanation:
          'Tienen "longer legs and greater endurance" y el frente "now advances considerably faster"; se deduce que esos rasgos les permiten desplazarse más lejos. El texto no compara su toxicidad, y la última opción contradice "faster".',
      },
      {
        id: 'f06-rd-ap-cane-toads-q5',
        kind: 'single',
        skill: 'purpose',
        paragraph: 2,
        prompt: 'Why does the author mention that "Australia has no native toads"?',
        options: [
          'To explain why farmers decided to import toads',
          "To suggest that toads cannot survive Australia's climate",
          'To show that native frogs compete with toads for food',
          'To explain why native predators were so vulnerable',
        ],
        answer: [3],
        explanation:
          'La frase sigue: "its predators had never evolved resistance to these chemicals or an instinct to avoid them". Sirve para explicar la vulnerabilidad de los depredadores. Lo del clima contradice la enorme expansión del sapo.',
      },
    ],
  },
  {
    id: 'f06-rd-ap-piaget',
    form: 6,
    section: 'reading',
    task: 'academic-passage',
    title: "Piaget's Stages of Development",
    topic: 'psychology',
    difficulty: 'hard',
    paragraphs: [
      'Before the twentieth century, children were often viewed as miniature adults who simply knew less than their parents. The Swiss psychologist Jean Piaget challenged this assumption. After carefully observing children, including his own, as they solved problems, he concluded that children do not merely accumulate facts; rather, they think in qualitatively different ways at different ages. In his view, children actively construct their understanding of the world by forming mental frameworks, or schemas, and revising them when new experiences do not fit.',
      "Piaget proposed that development proceeds through four stages, always in the same order. In the sensorimotor stage, from birth to about age two, infants learn through their senses and physical actions. A major achievement of this period is object permanence, the understanding that objects continue to exist when they are out of sight. In the preoperational stage, roughly ages two to seven, children begin to use language and symbols, as seen in pretend play, but their thinking remains egocentric: they have difficulty imagining how a situation looks from another person's point of view.",
      'The limits of preoperational thought are clearest in Piaget\'s conservation tasks. If a child watches water being poured from a short, wide glass into a tall, narrow one, a four-year-old will typically insist that the tall glass now holds more, because the child focuses on a single feature, the height of the water. In the concrete operational stage, from about seven to eleven, children understand that the amount has not changed, and they can reason logically about objects and events they can see or handle. Only in the formal operational stage, beginning around adolescence, can individuals reason systematically about abstract ideas and hypothetical situations.',
      "Piaget's theory transformed developmental psychology and encouraged educators to provide hands-on activities suited to children's level of thinking. Later researchers, however, have challenged some of his conclusions. Using methods that require less verbal or physical skill, such as measuring how long infants look at unexpected events, they have found evidence that babies understand object permanence earlier than Piaget believed. Studies also suggest that development is more gradual and more influenced by culture and schooling than a strict sequence of stages implies. Nevertheless, his central idea that children are active builders of knowledge remains highly influential.",
    ],
    questions: [
      {
        id: 'f06-rd-ap-piaget-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'What is the passage mainly about?',
        options: [
          "A theory of children's thinking and later responses to it",
          'The methods researchers use to test what infants understand',
          'The reasons abstract ideas should be taught to young children',
          "The differences between Piaget's own children and other children",
        ],
        answer: [0],
        explanation:
          'El texto expone la teoría de Piaget (sus cuatro etapas) y, en el último párrafo, cómo "Later researchers ... have challenged some of his conclusions". Los métodos con bebés son solo un detalle del párrafo 4.',
      },
      {
        id: 'f06-rd-ap-piaget-q2',
        kind: 'single',
        skill: 'detail',
        paragraph: 2,
        prompt: 'According to paragraph 3, why does a four-year-old believe that the tall glass holds more water?',
        options: [
          'The child cannot see the water being poured.',
          'The child believes that taller people need more water.',
          "The child pays attention only to the water's height.",
          'The child has not yet learned to use language.',
        ],
        answer: [2],
        explanation:
          'El texto explica: "because the child focuses on a single feature, the height of the water". La última opción es falsa porque, según el párrafo 2, los niños preoperacionales ya "begin to use language".',
      },
      {
        id: 'f06-rd-ap-piaget-q3',
        kind: 'single',
        skill: 'vocabulary',
        paragraph: 0,
        highlight: 'accumulate',
        prompt: 'The word "accumulate" in paragraph 1 is closest in meaning to',
        options: ['test', 'gather', 'forget', 'question'],
        answer: [1],
        explanation:
          '"Accumulate" significa acumular o reunir. Piaget sostenía que los niños no solo "accumulate facts" (reúnen datos), sino que piensan de forma distinta. "Test" no encaja con la idea de cantidad creciente.',
      },
      {
        id: 'f06-rd-ap-piaget-q4',
        kind: 'single',
        skill: 'inference',
        paragraph: 1,
        prompt: 'Based on paragraph 2, a child in the preoperational stage would most likely have difficulty with which task?',
        options: [
          'Pretending that a wooden block is a car',
          'Finding a toy that was hidden under a blanket',
          'Using simple words to name familiar household objects',
          'Describing what a person across the table sees',
        ],
        answer: [3],
        explanation:
          'El pensamiento preoperacional es "egocentric": les cuesta imaginar "how a situation looks from another person\'s point of view". Fingir que un bloque es un coche es juego simbólico ("pretend play"), que sí dominan, y encontrar un juguete escondido corresponde a la permanencia del objeto, adquirida antes.',
      },
      {
        id: 'f06-rd-ap-piaget-q5',
        kind: 'single',
        skill: 'paragraph-relation',
        paragraph: 3,
        prompt: 'What is the relationship between paragraph 4 and the rest of the passage?',
        options: [
          'It assesses the theory presented earlier and notes some of its limitations.',
          'It introduces a fifth stage that Piaget added late in his career.',
          'It gives more examples of the conservation tasks described earlier.',
          'It explains why Piaget rejected the idea of children as small adults.',
        ],
        answer: [0],
        explanation:
          'El párrafo 4 reconoce el impacto de la teoría y luego señala críticas: "Later researchers, however, have challenged some of his conclusions". El rechazo de la idea de "miniature adults" aparece en el párrafo 1, no en el 4.',
      },
    ],
  },
];
