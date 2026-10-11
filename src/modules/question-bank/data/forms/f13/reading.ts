import type { ReadingSet } from '../../../types';

/** Simulación n.º 13 — Reading (contenido original). */
export const sets: ReadingSet[] = [
  // ---------- Complete the Words ----------
  {
    id: 'f13-rd-cw-aluminum-cans',
    form: 13,
    section: 'reading',
    task: 'complete-words',
    title: 'Recycling Aluminum Cans',
    topic: 'environment',
    difficulty: 'easy',
    text:
      'Aluminum is one of the most valuable materials in a household recycling bin. Making {{n|ew}} metal {{fr|om}} raw ore {{requ|ires}} a {{hu|ge}} amount {{o|f}} electricity, {{bec|ause}} the aluminum {{mu|st}} be separated {{fr|om}} oxygen {{a|t}} very {{hi|gh}} temperatures. Recycled cans, in contrast, only need to be melted and reshaped. This saves about 95 percent of the energy. Moreover, aluminum does not lose quality when it is melted, so the same metal can return to store shelves again and again.',
    note: '«Because» introduce la causa y «amount of» acompaña a sustantivos incontables como «electricity». Observa también las colocaciones «separated from» y «at very high temperatures».',
  },
  {
    id: 'f13-rd-cw-serial-position',
    form: 13,
    section: 'reading',
    task: 'complete-words',
    title: 'Remembering the Ends of Lists',
    topic: 'psychology',
    difficulty: 'medium',
    text:
      'When people try to memorize a list of words, they usually recall the items at the beginning and the end better than those in the middle. Psychologists {{ca|ll}} this {{pat|tern}} the serial {{posi|tion}} effect. Early {{it|ems}} benefit {{bec|ause}} people {{ha|ve}} more {{ti|me}} to {{rehe|arse}} them, which {{he|lps}} move them {{in|to}} long-term memory. The last items, on the other hand, are still active in short-term memory when recall begins. Items in the middle receive neither advantage, so they are forgotten most often.',
    note: 'Aquí «benefit» funciona como verbo. Fíjate en la estructura «have more time to + verbo» y en «move … into», preposición que indica movimiento hacia dentro.',
  },
  {
    id: 'f13-rd-cw-sunk-cost',
    form: 13,
    section: 'reading',
    task: 'complete-words',
    title: 'Throwing Good Money After Bad',
    topic: 'economics',
    difficulty: 'hard',
    text:
      'The sunk cost fallacy is the tendency to continue investing in a project simply because resources have already been spent on it. Economists {{main|tain}} that {{rati|onal}} decisions {{sho|uld}} depend {{exclu|sively}} on {{antic|ipated}} costs {{a|nd}} benefits, {{si|nce}} previous {{expend|itures}} cannot {{b|e}} recovered {{un|der}} any circumstances. Nevertheless, individuals and organizations frequently persist with failing ventures, partly because abandoning them would require admitting that earlier judgments were mistaken. This reluctance helps explain why governments sometimes continue funding costly projects long after their benefits have become doubtful.',
    note: 'En textos densos, apóyate en la morfología: «exclusively» es un adverbio en -ly, «anticipated» es un participio usado como adjetivo y «expenditures» es un sustantivo plural tras «previous». «Under any circumstances» es una expresión fija.',
  },

  // ---------- Read in Daily Life ----------
  {
    id: 'f13-rd-dl-yoga-trial',
    form: 13,
    section: 'reading',
    task: 'daily-life',
    genre: 'email',
    title: 'Free Trial Yoga Class',
    topic: 'daily-life',
    difficulty: 'easy',
    header: ['From: Willow Tree Yoga', 'To: Maya Fernandez', 'Subject: Your free trial class is confirmed'],
    text:
      'Hi Maya,\n\nThanks for signing up! Your free trial class, Gentle Flow for Beginners, is booked for Saturday, May 9, at 10:00 a.m. Please arrive 10 minutes early so our instructor can ask about any injuries. Bring a water bottle and wear comfortable clothes you can stretch in. We provide mats and towels, but you are welcome to bring your own mat. Shoes are not allowed in the studio, so you will find cubbies for them by the door.\n\nSee you soon,\nWillow Tree Yoga',
    questions: [
      {
        id: 'f13-rd-dl-yoga-trial-q1',
        kind: 'single',
        skill: 'detail',
        prompt: 'What does the studio ask Maya to bring?',
        options: ['A yoga mat and a towel', 'A pair of exercise shoes', 'A bottle of water', 'A completed health form'],
        answer: [2],
        explanation:
          'El correo dice "Bring a water bottle". La esterilla es opcional ("you are welcome to bring your own mat") y el estudio ya ofrece "mats and towels"; por eso la opción A es la trampa.',
      },
      {
        id: 'f13-rd-dl-yoga-trial-q2',
        kind: 'single',
        skill: 'inference',
        prompt: 'What can be inferred about the studio?',
        options: [
          'Visitors take off their shoes before entering the room.',
          'Beginners must buy their own mats before the first class.',
          'The trial class is only for people who have injuries.',
          'Saturday classes begin ten minutes earlier than usual.',
        ],
        answer: [0],
        explanation:
          'Como "Shoes are not allowed in the studio" y hay "cubbies for them by the door", se deduce que los alumnos se quitan los zapatos al entrar. Las esterillas no hay que comprarlas ("We provide mats"), y llegar 10 minutos antes no significa que la clase empiece antes.',
      },
    ],
  },
  {
    id: 'f13-rd-dl-smoothie-menu',
    form: 13,
    section: 'reading',
    task: 'daily-life',
    genre: 'menu',
    title: 'Green Wave Smoothie Bar',
    topic: 'daily-life',
    difficulty: 'easy',
    header: ['GREEN WAVE SMOOTHIE BAR — MENU'],
    text:
      'CLASSIC SMOOTHIES\nBerry Blast — strawberry, blueberry, banana, apple juice\nMango Sunrise — mango, pineapple, orange juice\nGreen Machine — spinach, kiwi, banana, almond milk\n\nCUP SIZES\nSmall (12 oz) $4.50 | Medium (16 oz) $5.75 | Large (24 oz) $7.25\n\nADD-INS (75¢ each)\nProtein powder · Chia seeds · Peanut butter · Fresh ginger\n\nSwap in oat milk or almond milk in any smoothie at no extra cost.\nStudents with a valid ID get one free add-in with any large smoothie.',
    questions: [
      {
        id: 'f13-rd-dl-smoothie-menu-q1',
        kind: 'single',
        skill: 'detail',
        prompt: 'How much does a medium Mango Sunrise with chia seeds cost?',
        options: ['$5.75', '$6.50', '$7.25', '$8.00'],
        answer: [1],
        explanation:
          'Un "Medium (16 oz)" cuesta $5.75 y cada complemento suma "75¢ each": 5.75 + 0.75 = $6.50. La opción $5.75 olvida el precio del complemento.',
      },
      {
        id: 'f13-rd-dl-smoothie-menu-q2',
        kind: 'single',
        skill: 'inference',
        prompt: 'A student shows a valid ID and orders a large Green Machine with peanut butter. How much will the student pay?',
        options: ['$4.50', '$5.75', '$8.00', '$7.25'],
        answer: [3],
        explanation:
          'El tamaño grande cuesta $7.25 y "Students with a valid ID get one free add-in with any large smoothie", así que la mantequilla de cacahuete es gratis. $8.00 sería el precio sin el descuento de estudiante.',
      },
    ],
  },
  {
    id: 'f13-rd-dl-park-camping',
    form: 13,
    section: 'reading',
    task: 'daily-life',
    genre: 'webpage',
    title: 'Cedar Ridge Camping Rules',
    topic: 'daily-life',
    difficulty: 'medium',
    header: ['Cedar Ridge National Park › Plan Your Visit › Camping'],
    text:
      "Campsite Reservations\nSites in our three developed campgrounds can be reserved up to six months in advance through the park's online system. From June through August, all sites are reservation-only; during the rest of the year, about half are held for first-come, first-served visitors.\n\nBackcountry Permits\nOvernight trips outside developed campgrounds require a free backcountry permit, available at the visitor center no earlier than 24 hours before your trip. Groups are limited to eight people.\n\nFire Restrictions (in effect until further notice)\nCampfires are permitted only in the metal fire rings provided in developed campgrounds. Backcountry fires are prohibited, but gas camping stoves with an on/off valve may be used. Do not collect firewood inside the park; buy local wood at the camp store to avoid spreading insects.",
    questions: [
      {
        id: 'f13-rd-dl-park-camping-q1',
        kind: 'single',
        skill: 'detail',
        prompt: 'According to the webpage, how can a hiker get a backcountry permit?',
        options: [
          'By reserving it online up to six months ahead',
          'By paying a small fee at the camp store',
          'By requesting it from a campground host',
          'By picking it up at the visitor center',
        ],
        answer: [3],
        explanation:
          'El permiso está "available at the visitor center no earlier than 24 hours before your trip". La reserva en línea con seis meses de antelación se refiere a las parcelas de los campings, no a los permisos, y el permiso es "free".',
      },
      {
        id: 'f13-rd-dl-park-camping-q2',
        kind: 'single',
        skill: 'inference',
        prompt: 'What can be inferred about a family that arrives in July without a reservation?',
        options: [
          'They probably cannot get a site in a developed campground.',
          'They can claim one of the first-come, first-served sites.',
          'They must pay a higher fee for a summer campsite.',
          'They can reserve a campsite at the visitor center.',
        ],
        answer: [0],
        explanation:
          'De junio a agosto "all sites are reservation-only", así que sin reserva es muy probable que no consigan parcela. Las plazas "first-come, first-served" solo existen "during the rest of the year", por eso la opción B es incorrecta.',
      },
      {
        id: 'f13-rd-dl-park-camping-q3',
        kind: 'single',
        skill: 'detail',
        prompt: 'Which of the following is allowed in the backcountry?',
        options: [
          'A small campfire in a ring of stones',
          'Firewood gathered near the campsite',
          'A gas stove that can be turned off',
          'A group of ten people on one permit',
        ],
        answer: [2],
        explanation:
          'El texto dice "Backcountry fires are prohibited, but gas camping stoves with an on/off valve may be used". Las hogueras solo se permiten en "metal fire rings" de los campings, no se puede recoger leña y los grupos son de ocho personas como máximo.',
      },
    ],
  },
  {
    id: 'f13-rd-dl-it-2fa-memo',
    form: 13,
    section: 'reading',
    task: 'daily-life',
    genre: 'memo',
    title: 'Two-Factor Login Rollout',
    topic: 'campus-life',
    difficulty: 'medium',
    header: ['MEMO', 'To: All Faculty and Staff', 'From: Office of Information Technology', 'Date: September 2', 'Re: Mandatory two-factor authentication'],
    text:
      "To better protect university accounts, two-factor authentication (2FA) will become mandatory for all employees this fall. After entering your password, you will confirm each login with a code from the CampusKey app or a text message.\n\nRollout schedule:\n• September 15: Administrative offices\n• October 1: Academic departments\n• October 20: All remaining staff, including part-time employees\n\nYou may enroll voluntarily before your group's date at it.university.edu/2fa. Once your date arrives, you will not be able to access email or payroll until you have enrolled. Employees without a smartphone can request a small hardware key from the IT Help Desk at no cost. Please allow two business days for delivery.",
    questions: [
      {
        id: 'f13-rd-dl-it-2fa-memo-q1',
        kind: 'single',
        skill: 'purpose',
        prompt: 'What is the main purpose of the memo?',
        options: [
          'To announce that employee passwords will expire soon',
          'To explain a new login requirement and its timeline',
          'To invite staff to test a new online payroll system',
          'To warn employees about a recent security breach',
        ],
        answer: [1],
        explanation:
          'El memorando anuncia que "two-factor authentication (2FA) will become mandatory" y detalla un "Rollout schedule". El sistema de nóminas solo se menciona como algo a lo que no se podrá acceder sin inscribirse.',
      },
      {
        id: 'f13-rd-dl-it-2fa-memo-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'When will 2FA become required for staff in academic departments?',
        options: ['September 2', 'September 15', 'October 1', 'October 20'],
        answer: [2],
        explanation:
          'El calendario indica "October 1: Academic departments". El 2 de septiembre es la fecha del memorando y el 15 de septiembre corresponde a "Administrative offices".',
      },
      {
        id: 'f13-rd-dl-it-2fa-memo-q3',
        kind: 'single',
        skill: 'inference',
        prompt: 'What is implied about an employee who does not have a smartphone?',
        options: [
          'They should order a hardware key ahead of their date.',
          'They are not required to use two-factor authentication.',
          'They must buy a hardware key from the IT Help Desk.',
          'They will lose access to payroll on October 1.',
        ],
        answer: [0],
        explanation:
          'La llave se pide al servicio técnico y hay que "allow two business days for delivery"; además, sin inscribirse se pierde el acceso al llegar la fecha. Por eso conviene pedirla con antelación. No hay que comprarla ("at no cost") y la fecha depende del grupo de cada empleado.',
      },
    ],
  },
  {
    id: 'f13-rd-dl-linden-apartment',
    form: 13,
    section: 'reading',
    task: 'daily-life',
    genre: 'advertisement',
    title: 'Linden Street Apartment Listing',
    topic: 'daily-life',
    difficulty: 'hard',
    header: ['FOR RENT — 2-Bedroom Apartment, 418 Linden Street, Unit 3B'],
    text:
      "Bright second-floor apartment, a 10-minute walk from campus. $1,450/month on a 12-month lease starting August 1. Shorter 6-month leases are available for an additional $100 per month.\n\nIncluded: water, trash collection, and high-speed internet. Tenants pay electricity and gas separately; average winter heating bills run $60–$90.\n\nPets: Cats welcome with a one-time $200 fee. Dogs under 25 lb. are considered case by case after a meeting with the property manager. No other animals.\n\nTo apply: Submit an online application with a $40 non-refundable fee, a copy of photo ID, and proof of income of at least three times the monthly rent. Students who do not meet the income requirement may apply with a co-signer. A security deposit equal to one month's rent is due at lease signing.",
    questions: [
      {
        id: 'f13-rd-dl-linden-apartment-q1',
        kind: 'single',
        skill: 'detail',
        prompt: 'Which of the following is included in the monthly rent?',
        options: ['Electricity for lights', 'Gas for heating', 'A parking space', 'High-speed internet'],
        answer: [3],
        explanation:
          'El anuncio dice "Included: water, trash collection, and high-speed internet". La electricidad y el gas se pagan aparte ("Tenants pay electricity and gas separately") y el aparcamiento no se menciona.',
      },
      {
        id: 'f13-rd-dl-linden-apartment-q2',
        kind: 'single',
        skill: 'inference',
        prompt: 'A student who earns $2,000 a month wants a 12-month lease. What can be inferred?',
        options: [
          'The student must choose a 6-month lease instead.',
          'The student will need someone to co-sign the lease.',
          'The student can pay a larger deposit to qualify.',
          'The student is not allowed to submit an application.',
        ],
        answer: [1],
        explanation:
          'Se exigen ingresos de "at least three times the monthly rent" (3 × $1,450 = $4,350). Como el estudiante gana menos, puede solicitarlo "with a co-signer". El texto no prohíbe la solicitud ni ofrece un depósito mayor como alternativa.',
      },
      {
        id: 'f13-rd-dl-linden-apartment-q3',
        kind: 'single',
        skill: 'vocabulary',
        prompt: 'In the listing, the phrase "case by case" is closest in meaning to',
        options: ['all together', 'at no cost', 'individually', 'temporarily'],
        answer: [2],
        explanation:
          '"Case by case" significa que cada solicitud se estudia por separado, es decir, "individually"; por eso se exige "a meeting with the property manager". No indica que sea gratis ni temporal.',
      },
    ],
  },

  // ---------- Read an Academic Passage ----------
  {
    id: 'f13-rd-ap-octopus-camouflage',
    form: 13,
    section: 'reading',
    task: 'academic-passage',
    title: 'Octopus Skin Camouflage',
    topic: 'biology',
    difficulty: 'easy',
    paragraphs: [
      'Octopuses are among the most skilled masters of disguise in the animal kingdom. Within a fraction of a second, an octopus can change both the color and the texture of its skin to match a rocky reef, a patch of sand, or a bed of seaweed. This ability helps the soft-bodied animal hide from predators such as sharks and eels, and it also allows the octopus to approach its own prey without being noticed.',
      'The color changes are produced by thousands of tiny organs in the skin called chromatophores. Each chromatophore is a small elastic sac filled with red, yellow, brown, or black pigment and surrounded by muscles that are controlled directly by the nervous system. When the muscles contract, they pull the sac open and spread the pigment across a wider area, making the color visible. When they relax, the sac shrinks back to a tiny dot that is hard to see. Beneath the chromatophores, other cells reflect light to produce shimmering blues, greens, and whites.',
      'Octopuses can also alter the shape of their skin. By contracting special muscles, they raise small bumps and spikes called papillae, which make smooth skin look rough like coral or algae. Combined with the right colors, these three-dimensional textures allow an octopus to blend into its background almost perfectly.',
      'Remarkably, octopuses appear to be colorblind, since their eyes contain only one type of light-sensitive pigment. Scientists are still investigating how the animals match colors so accurately. One possibility is that light-sensitive proteins found in the skin itself help detect the colors of the surroundings.',
    ],
    questions: [
      {
        id: 'f13-rd-ap-octopus-camouflage-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'What is the passage mainly about?',
        options: [
          'How octopuses alter their skin to match their surroundings',
          'Why sharks and eels find octopuses difficult to catch',
          'How scientists proved that octopuses cannot see color',
          'Why octopuses prefer to live on rocky coral reefs',
        ],
        answer: [0],
        explanation:
          'Todo el pasaje explica cómo el pulpo cambia "both the color and the texture of its skin" (cromatóforos, células reflectantes, papilas). Los depredadores y la ceguera al color son detalles secundarios, no el tema central.',
      },
      {
        id: 'f13-rd-ap-octopus-camouflage-q2',
        kind: 'single',
        skill: 'detail',
        paragraph: 1,
        prompt: 'According to paragraph 2, what happens when the muscles around a chromatophore contract?',
        options: [
          'The pigment is pushed out of the skin.',
          'The sac shrinks back to a tiny dot.',
          'Light is reflected to create blue colors.',
          'The pigment spreads and becomes visible.',
        ],
        answer: [3],
        explanation:
          'El párrafo dice "When the muscles contract, they pull the sac open and spread the pigment across a wider area, making the color visible". La opción B describe lo contrario: lo que ocurre cuando los músculos "relax".',
      },
      {
        id: 'f13-rd-ap-octopus-camouflage-q3',
        kind: 'single',
        skill: 'vocabulary',
        paragraph: 2,
        highlight: 'alter',
        prompt: 'The word "alter" in paragraph 3 is closest in meaning to',
        options: ['measure', 'change', 'hide', 'protect'],
        answer: [1],
        explanation:
          '"Alter" significa modificar ("change"): el pulpo cambia la forma de su piel levantando "bumps and spikes called papillae". "Hide" se relaciona con el camuflaje en general, pero no es el significado de la palabra.',
      },
      {
        id: 'f13-rd-ap-octopus-camouflage-q4',
        kind: 'single',
        skill: 'inference',
        paragraph: 3,
        prompt: 'What can be inferred from paragraph 4 about how octopuses match colors?',
        options: [
          'It depends mainly on what the octopus has recently eaten.',
          'It is less accurate than the way they match textures.',
          'It may not rely entirely on the octopus\'s eyes.',
          'It was fully explained by scientists long ago.',
        ],
        answer: [2],
        explanation:
          'Los ojos tienen "only one type of light-sensitive pigment" y se plantea que "proteins found in the skin itself help detect the colors", así que la visión no lo explicaría todo. La opción D contradice "Scientists are still investigating".',
      },
      {
        id: 'f13-rd-ap-octopus-camouflage-q5',
        kind: 'single',
        skill: 'negative-factual',
        prompt: 'According to the passage, all of the following help an octopus hide EXCEPT',
        options: [
          'sacs of pigment in the skin',
          'cells that reflect light',
          'raised bumps called papillae',
          'a hard protective shell',
        ],
        answer: [3],
        explanation:
          'El pasaje describe al pulpo como "soft-bodied" y nunca menciona un caparazón. Los sacos de pigmento (cromatóforos), las células que "reflect light" y las "papillae" sí aparecen como mecanismos de camuflaje.',
      },
    ],
  },
  {
    id: 'f13-rd-ap-polynesian-navigation',
    form: 13,
    section: 'reading',
    task: 'academic-passage',
    title: 'Polynesian Wayfinding Without Instruments',
    topic: 'history',
    difficulty: 'medium',
    paragraphs: [
      'Over many centuries, ending roughly 700 years ago, Polynesian voyagers settled nearly every habitable island in a vast triangle of the Pacific Ocean bounded by Hawaii, New Zealand, and Easter Island. Many of these islands lie thousands of kilometers apart, and some are little more than specks of land in the open sea. Yet the voyagers reached them in double-hulled sailing canoes without compasses, charts, or any other instruments. Their success depended on a detailed body of knowledge about the sky and the sea, passed down orally from one generation of navigators to the next.',
      'The most important guide was the night sky. Navigators memorized the points on the horizon where dozens of stars rose and set. Because a given star always rises at the same point, a navigator could steer toward it while it was low in the sky and then switch to another star rising in the same place once the first had climbed too high. This sequence of stars, sometimes called a star path, served as a kind of compass that changed through the night.',
      'During the day and on cloudy nights, navigators relied on the ocean itself. Large swells, generated by distant and persistent winds, travel across the ocean in steady directions. By feeling the rhythm of these swells through the hull of the canoe, a skilled navigator could hold a course for hours. Swells also bend and reflect when they meet land, so changes in their pattern could reveal an island that was still out of sight.',
      'As a canoe approached its destination, other clues became useful. Certain seabirds, such as terns and noddies, fly out to sea to fish in the morning and return to land at dusk, so their flight paths pointed toward islands. Clouds that stayed fixed above the horizon, or that had a greenish tint on their undersides from a shallow lagoon below, offered further signs. Together, these methods turned a tiny island into a much wider target that was far easier to find.',
    ],
    questions: [
      {
        id: 'f13-rd-ap-polynesian-navigation-q1',
        kind: 'single',
        skill: 'organization',
        prompt: 'Which of the following best describes the organization of the passage?',
        options: [
          'It compares Polynesian canoes with European sailing ships.',
          'It traces the settlement of each island in time order.',
          'It presents a challenge and then several ways it was met.',
          'It describes a theory and then the evidence against it.',
        ],
        answer: [2],
        explanation:
          'El párrafo 1 plantea el reto (islas separadas por "thousands of kilometers" sin "any other instruments") y los párrafos 2–4 explican los métodos: estrellas, oleaje, aves y nubes. No hay comparación con barcos europeos ni un orden cronológico de asentamientos.',
      },
      {
        id: 'f13-rd-ap-polynesian-navigation-q2',
        kind: 'single',
        skill: 'detail',
        paragraph: 1,
        prompt: 'According to paragraph 2, why did a navigator switch from one star to another?',
        options: [
          'The first star had risen too high to guide the canoe.',
          'The first star had set below the opposite horizon.',
          'Clouds had moved in and covered the first star.',
          'The canoe had changed direction to avoid a storm.',
        ],
        answer: [0],
        explanation:
          'El navegante cambiaba de estrella "once the first had climbed too high". La opción B es tentadora porque el texto menciona que las estrellas "rose and set", pero el motivo del cambio era la altura, no la puesta.',
      },
      {
        id: 'f13-rd-ap-polynesian-navigation-q3',
        kind: 'single',
        skill: 'vocabulary',
        paragraph: 2,
        highlight: 'persistent',
        prompt: 'The word "persistent" in paragraph 3 is closest in meaning to',
        options: ['powerful', 'seasonal', 'unexpected', 'continuing'],
        answer: [3],
        explanation:
          '"Persistent" significa que se mantiene en el tiempo ("continuing"); por eso los vientos generan oleajes que viajan "in steady directions". "Powerful" es tentador, pero la palabra se refiere a la duración, no a la fuerza.',
      },
      {
        id: 'f13-rd-ap-polynesian-navigation-q4',
        kind: 'single',
        skill: 'inference',
        paragraph: 2,
        prompt: 'What can be inferred from paragraph 3 about Polynesian navigators?',
        options: [
          'They preferred to sail only when the sky was clear.',
          'They could keep their direction without seeing the stars.',
          'They used swells mainly to measure the speed of canoes.',
          'They avoided areas where swells bent around islands.',
        ],
        answer: [1],
        explanation:
          'Durante el día y "on cloudy nights" se guiaban por el oleaje y podían "hold a course for hours", así que mantenían el rumbo sin ver las estrellas. Nada indica que solo navegaran con cielo despejado; al contrario, usaban las olas que se curvan cerca de las islas para encontrarlas.',
      },
      {
        id: 'f13-rd-ap-polynesian-navigation-q5',
        kind: 'single',
        skill: 'purpose',
        paragraph: 3,
        prompt: 'Why does the author mention terns and noddies in paragraph 4?',
        options: [
          'To illustrate how animal behavior could point to land',
          'To show what voyagers ate during long ocean crossings',
          'To explain why some small islands were never settled',
          'To describe birds that followed canoes across the sea',
        ],
        answer: [0],
        explanation:
          'Estas aves "fly out to sea to fish in the morning and return to land at dusk, so their flight paths pointed toward islands": son un ejemplo de conducta animal que indica dónde hay tierra. El texto no dice que siguieran a las canoas ni que fueran alimento.',
      },
    ],
  },
  {
    id: 'f13-rd-ap-seismic-waves',
    form: 13,
    section: 'reading',
    task: 'academic-passage',
    title: "Seismic Waves and Earth's Interior",
    topic: 'geology',
    difficulty: 'hard',
    paragraphs: [
      "No borehole has ever reached deeper than about 12 kilometers into Earth, a tiny fraction of the planet's 6,371-kilometer radius. Nevertheless, geologists have constructed a detailed picture of the interior by studying how seismic waves generated by earthquakes travel through the planet. Two kinds of waves that pass through the interior, known as body waves, have proved especially informative: primary (P) waves and secondary (S) waves.",
      'P waves are compressional waves: they push and pull the material they pass through in the same direction that the wave is traveling, much like sound waves in air. As a result, they can move through solids, liquids, and gases alike, and they are the fastest seismic waves, arriving first at recording stations. S waves, by contrast, are shear waves that move material from side to side, perpendicular to their direction of travel. Since liquids cannot resist this kind of sideways deformation, S waves cannot pass through them at all. The speed of both wave types also depends on the density and rigidity of the rock, so changes in velocity reveal changes in composition and physical state.',
      'These properties allowed seismologists to identify Earth\'s major boundaries. In 1909, Andrija Mohorovičić noticed that waves from a Croatian earthquake reached distant stations sooner than expected, implying that they had sped up after descending into denser rock beneath the crust; that boundary now bears his name. A more dramatic discovery came from the so-called shadow zone. Stations located more than about 104 degrees of arc from an earthquake record no direct S waves, which suggests that the outer core is liquid and blocks them. P waves are also missing from much of this region because they bend sharply as they enter the core, leaving a gap between roughly 104 and 140 degrees.',
      'Seismic data also revealed a solid region at the very center. In 1936, the Danish seismologist Inge Lehmann observed faint P waves arriving inside the shadow zone, where none should have appeared if the core were entirely liquid. She proposed that these waves had been deflected by an inner core with different properties. Later measurements confirmed that this inner core is solid, apparently because the enormous pressure at the center keeps iron from melting despite temperatures comparable to those at the surface of the Sun.',
    ],
    questions: [
      {
        id: 'f13-rd-ap-seismic-waves-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'What is the passage mainly about?',
        options: [
          'Why drilling deep into Earth has proved so difficult',
          "How the behavior of seismic waves revealed Earth's layers",
          'How earthquakes cause damage far from where they begin',
          'Why P waves travel faster than other seismic waves',
        ],
        answer: [1],
        explanation:
          'El pasaje explica cómo el comportamiento de las ondas P y S permitió identificar la corteza, el núcleo externo líquido y el núcleo interno sólido ("constructed a detailed picture of the interior"). La perforación solo se menciona en la introducción y la velocidad de las ondas P es un detalle.',
      },
      {
        id: 'f13-rd-ap-seismic-waves-q2',
        kind: 'single',
        skill: 'detail',
        paragraph: 1,
        prompt: 'According to paragraph 2, why can S waves not travel through liquids?',
        options: [
          'Liquids are too dense for any wave to cross them.',
          'S waves lose their energy before they reach liquids.',
          'Liquids cannot resist the sideways motion of S waves.',
          'S waves move material in their direction of travel.',
        ],
        answer: [2],
        explanation:
          'El texto dice "Since liquids cannot resist this kind of sideways deformation, S waves cannot pass through them". La opción D describe en realidad las ondas P, que mueven el material "in the same direction that the wave is traveling".',
      },
      {
        id: 'f13-rd-ap-seismic-waves-q3',
        kind: 'single',
        skill: 'vocabulary',
        paragraph: 2,
        highlight: 'implying',
        prompt: 'The word "implying" in paragraph 3 is closest in meaning to',
        options: ['suggesting', 'contradicting', 'requiring', 'assuming'],
        answer: [0],
        explanation:
          '"Implying" significa dar a entender ("suggesting"): la llegada temprana de las ondas indicaba que habían acelerado en roca más densa. "Assuming" es tentador, pero supone dar algo por hecho sin pruebas, mientras que aquí los datos apuntan a una conclusión.',
      },
      {
        id: 'f13-rd-ap-seismic-waves-q4',
        kind: 'single',
        skill: 'inference',
        paragraph: 3,
        prompt: 'What can be inferred from paragraph 4 about the waves Lehmann observed?',
        options: [
          'They were S waves that had crossed the liquid outer core.',
          'They arrived earlier than waves outside the shadow zone.',
          'They showed that the entire core is made of solid iron.',
          'They could not be explained by a completely liquid core.',
        ],
        answer: [3],
        explanation:
          'Lehmann vio ondas P en la zona de sombra "where none should have appeared if the core were entirely liquid", por lo que un núcleo totalmente líquido no las explicaba. Eran ondas P, no S, y el texto mantiene que el núcleo externo es líquido (opción C).',
      },
      {
        id: 'f13-rd-ap-seismic-waves-q5',
        kind: 'single',
        skill: 'negative-factual',
        prompt: 'According to the passage, all of the following are true of P waves EXCEPT:',
        options: [
          'They can travel through liquids and gases.',
          'They are completely blocked by the outer core.',
          'They reach recording stations before S waves.',
          'They change direction when they enter the core.',
        ],
        answer: [1],
        explanation:
          'Las ondas P no quedan bloqueadas: "bend sharply as they enter the core", y Lehmann incluso detectó ondas P dentro de la zona de sombra. Las demás afirmaciones aparecen en el texto ("solids, liquids, and gases alike", "arriving first", "bend sharply").',
      },
    ],
  },
  {
    id: 'f13-rd-ap-jet-thrust',
    form: 13,
    section: 'reading',
    task: 'academic-passage',
    title: 'How Jet Engines Push Aircraft',
    topic: 'engineering',
    difficulty: 'hard',
    paragraphs: [
      "A jet engine produces thrust by applying one of the most basic principles of physics, Newton's third law of motion: for every action there is an equal and opposite reaction. The engine takes in a large mass of air, accelerates it, and expels it backward at high speed. The force required to push this air rearward is matched by an equal force pushing the engine, and therefore the aircraft, forward. In general, thrust depends on how much air passes through the engine each second and how much faster that air leaves than when it entered.",
      'In a simple turbojet, the process unfolds in four stages. First, a compressor made of many rows of rotating blades squeezes incoming air to a fraction of its original volume, greatly increasing its pressure. Next, in the combustion chamber, fuel is sprayed into this compressed air and ignited, raising its temperature dramatically. The hot, high-pressure gas then rushes through a turbine, spinning its blades. Because the turbine is connected to the compressor by a central shaft, it supplies the power needed to keep the compressor running. Finally, the gas expands through a narrow nozzle at the rear, where it accelerates to form a powerful jet.',
      "Most modern airliners, however, use a variation called the turbofan. In this design, a large fan at the front of the engine, also driven by the turbine, pushes a great deal of air around the outside of the engine core rather than through it. This bypass air never enters the combustion chamber, yet in many engines it generates most of the total thrust.",
      'The advantage of the turbofan lies in efficiency. Producing thrust by accelerating a small mass of air to very high speed wastes much of the fuel\'s energy in fast-moving, turbulent exhaust. Accelerating a much larger mass of air by a smaller amount produces the same thrust more economically and with considerably less noise. This is why airliners have such wide engines, whereas military fighters, which prioritize speed and compact size over fuel economy, generally rely on narrower engines with far less bypass air.',
    ],
    questions: [
      {
        id: 'f13-rd-ap-jet-thrust-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'What is the passage mainly about?',
        options: [
          'The history of jet engines in military aircraft',
          'The problems caused by noise from jet airliners',
          'The way fuel is stored and burned on long flights',
          'The way jet engines generate a forward force',
        ],
        answer: [3],
        explanation:
          'El pasaje explica cómo se produce el empuje ("thrust"): la tercera ley de Newton, las etapas del turborreactor y la ventaja del turbofán. El ruido y los cazas militares son detalles del último párrafo, no el tema principal.',
      },
      {
        id: 'f13-rd-ap-jet-thrust-q2',
        kind: 'single',
        skill: 'detail',
        paragraph: 1,
        prompt: 'According to paragraph 2, what is the function of the turbine in a turbojet?',
        options: [
          'It sprays fuel into the compressed air.',
          'It narrows the flow of gas at the rear.',
          'It powers the compressor through a shaft.',
          'It squeezes the air before it is ignited.',
        ],
        answer: [2],
        explanation:
          'El texto dice que la turbina "is connected to the compressor by a central shaft" y "supplies the power needed to keep the compressor running". Comprimir el aire (opción D) es la función del compresor, no de la turbina.',
      },
      {
        id: 'f13-rd-ap-jet-thrust-q3',
        kind: 'single',
        skill: 'vocabulary',
        paragraph: 0,
        highlight: 'expels',
        prompt: 'The word "expels" in paragraph 1 is closest in meaning to',
        options: ['heats', 'forces out', 'holds back', 'slows down'],
        answer: [1],
        explanation:
          '"Expels" significa expulsar ("forces out"): el motor saca el aire "backward at high speed". "Heats" es tentador porque el gas se calienta en la cámara de combustión, pero no es el significado de la palabra.',
      },
      {
        id: 'f13-rd-ap-jet-thrust-q4',
        kind: 'single',
        skill: 'inference',
        paragraph: 3,
        prompt: 'What can be inferred from paragraph 4 about the engines of military fighters?',
        options: [
          'They use more fuel to produce a given amount of thrust.',
          'They produce less thrust than the engines of airliners.',
          'They do not contain a compressor or a turbine at all.',
          'They are quieter than the wide engines of airliners.',
        ],
        answer: [0],
        explanation:
          'Los cazas "prioritize speed and compact size over fuel economy" y tienen "far less bypass air"; según el párrafo, acelerar poco aire a gran velocidad "wastes much of the fuel\'s energy". Por tanto gastan más combustible para el mismo empuje. El texto no dice que produzcan menos empuje.',
      },
      {
        id: 'f13-rd-ap-jet-thrust-q5',
        kind: 'single',
        skill: 'paragraph-relation',
        paragraph: 2,
        prompt: 'How does paragraph 3 relate to paragraph 2?',
        options: [
          'It explains why the design in paragraph 2 is no longer built.',
          'It gives the history of the stages described in paragraph 2.',
          'It describes a modified version of the design in paragraph 2.',
          'It provides evidence against the claims made in paragraph 2.',
        ],
        answer: [2],
        explanation:
          'El párrafo 3 presenta "a variation called the turbofan", es decir, una versión modificada del turborreactor del párrafo 2 (con un ventilador también "driven by the turbine"). No dice que el diseño anterior haya dejado de fabricarse ni lo contradice.',
      },
    ],
  },
];
