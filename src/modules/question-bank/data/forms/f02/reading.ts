import type { ReadingSet } from '../../../types';

/** Simulación n.º 2 — Reading (contenido original). */
export const sets: ReadingSet[] = [
  // ---------- Complete the Words ----------
  {
    id: 'f02-rd-cw-graduation',
    form: 2,
    section: 'reading',
    task: 'complete-words',
    title: 'Graduation as a Rite of Passage',
    topic: 'sociology',
    difficulty: 'easy',
    text:
      'Every society marks important life changes with special ceremonies known as rites of passage. A {{gradu|ation}}, for {{exa|mple}}, shows {{th|at}} a {{stu|dent}} has {{fini|shed}} one {{st|age}} of {{educ|ation}} and {{i|s}} ready {{f|or}} the {{ne|xt}}. During the ceremony, students usually wear special gowns and walk across a platform to receive a diploma. Family members gather to celebrate, and the day often ends with a party. Sociologists explain that these rituals help people accept their new roles and remind the whole community that the person has changed.',
    note: 'Usa el contexto inmediato: "has" pide un participio (finished) y la estructura "ready for the next" es una colocación muy frecuente.',
  },
  {
    id: 'f02-rd-cw-ukiyo-e',
    form: 2,
    section: 'reading',
    task: 'complete-words',
    title: 'Teamwork Behind Ukiyo-e Prints',
    topic: 'art',
    difficulty: 'medium',
    text:
      'Japanese ukiyo-e prints were usually produced by a team rather than by a single artist. A publisher {{hi|red}} a {{desi|gner}}, who {{dr|ew}} the {{im|age}} in {{i|nk}} on {{th|in}} sheets {{o|f}} paper. {{Ne|xt}}, the {{dra|wing}} was {{gl|ued}} face down onto a block of cherry wood, and a carver cut away the wood around every line. Printers then brushed colored ink onto the finished block and pressed paper against it by hand. Because each color required its own block, a single print could involve more than ten carefully aligned impressions.',
    note: 'Fíjate en la secuencia del proceso (hired → drew → Next → glued): los verbos van en pasado simple y "sheets of paper" es una colocación fija.',
  },
  {
    id: 'f02-rd-cw-public-key',
    form: 2,
    section: 'reading',
    task: 'complete-words',
    title: 'Keys That Protect Online Messages',
    topic: 'technology',
    difficulty: 'hard',
    text:
      "Public-key encryption allows people who have never met to exchange information securely. Each {{parti|cipant}} generates two {{mathema|tically}} related keys, {{o|ne}} public and one {{pri|vate}}. The public key is {{distr|ibuted}} openly, {{whe|reas}} the private key {{ne|ver}} leaves {{i|ts}} owner's device. To send a {{confid|ential}} message, the {{sen|der}} encrypts it with the recipient's public key. Only the matching private key can decrypt the result, so an intercepted message remains unreadable. The system is secure because calculating the private key from the public one would take even powerful computers an impractical amount of time.",
    note: 'Busca los contrastes: "one public and one private" y "openly, whereas…" (mientras que) oponen las dos claves. El adverbio "mathematically" modifica al adjetivo "related".',
  },

  // ---------- Read in Daily Life ----------
  {
    id: 'f02-rd-dl-recycling-bins',
    form: 2,
    section: 'reading',
    task: 'daily-life',
    genre: 'memo',
    title: 'New Kitchen Recycling Bins',
    topic: 'daily-life',
    difficulty: 'easy',
    header: ['MEMO', 'To: All staff', 'From: Karen Wells, Office Manager', 'Subject: New recycling system in the kitchen'],
    text:
      'Starting Monday, the staff kitchen will have three color-coded bins instead of one trash can. Please use the blue bin for clean paper, cans, and plastic bottles. The green bin is for food scraps, coffee grounds, and used paper napkins. Everything else, including chip bags and plastic wrap, goes in the gray bin. Rinse containers before recycling them, because dirty items can spoil a whole load. A chart showing what goes where will be posted above the sink. Questions? Stop by my desk on the second floor.',
    questions: [
      {
        id: 'f02-rd-dl-recycling-bins-q1',
        kind: 'single',
        skill: 'detail',
        prompt: 'Where should employees put used coffee grounds?',
        options: ['In the blue bin', 'In the gray bin', 'In the green bin', 'In a bag next to the sink'],
        answer: [2],
        explanation:
          'El memo dice: "The green bin is for food scraps, coffee grounds, and used paper napkins". El contenedor azul ("blue") es para papel limpio, latas y botellas, por eso no es la respuesta.',
      },
      {
        id: 'f02-rd-dl-recycling-bins-q2',
        kind: 'single',
        skill: 'purpose',
        prompt: 'What is the main purpose of the memo?',
        options: [
          'To explain how staff should sort kitchen waste',
          'To announce that the kitchen will close on Monday',
          'To ask staff to clean the kitchen more often',
          'To invite staff to a meeting on the second floor',
        ],
        answer: [0],
        explanation:
          'Todo el texto explica qué va en cada contenedor ("three color-coded bins"). El segundo piso solo se menciona para resolver dudas, no para una reunión, y la cocina no cierra.',
      },
    ],
  },
  {
    id: 'f02-rd-dl-library-ebooks',
    form: 2,
    section: 'reading',
    task: 'daily-life',
    genre: 'webpage',
    title: 'Borrowing Digital Library Books',
    topic: 'daily-life',
    difficulty: 'easy',
    header: ['Riverside Public Library — Digital Collection', 'How to Borrow E-books and Audiobooks'],
    text:
      'All you need is a valid Riverside library card and its four-digit PIN. Download our free BookCloud app, sign in with your card number, and browse more than 20,000 titles. You may borrow up to five items at a time for 14 days. When the loan period ends, titles are returned automatically, so you will never pay a late fee. If a title is already checked out, tap "Place Hold," and we will email you when it becomes available. Forgot your PIN? Visit any branch with a photo ID to reset it.',
    questions: [
      {
        id: 'f02-rd-dl-library-ebooks-q1',
        kind: 'single',
        skill: 'detail',
        prompt: 'What happens when the loan period for an e-book ends?',
        options: [
          'The borrower is charged a small late fee.',
          'The library sends the borrower a reminder.',
          'The borrower must return it at a branch.',
          'The title goes back without any action.',
        ],
        answer: [3],
        explanation:
          'La página dice: "titles are returned automatically, so you will never pay a late fee". La opción del recordatorio confunde el correo que se envía al reservar ("Place Hold"), no al terminar el préstamo.',
      },
      {
        id: 'f02-rd-dl-library-ebooks-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'What should users do if a title they want is already checked out?',
        options: [
          'Borrow it from a different branch',
          'Place a hold and wait for an email',
          'Reset their PIN at the front desk',
          'Download a newer version of the app',
        ],
        answer: [1],
        explanation:
          'Según el texto: "tap \'Place Hold,\' and we will email you when it becomes available". Restablecer el PIN ("reset it") es para quien olvidó su clave, no para títulos prestados.',
      },
    ],
  },
  {
    id: 'f02-rd-dl-cafe-specials',
    form: 2,
    section: 'reading',
    task: 'daily-life',
    genre: 'menu',
    title: 'Campus Cafe Weekly Specials',
    topic: 'campus-life',
    difficulty: 'medium',
    header: ['THE GROUNDS CAFE — Weekly Specials (October 13–17)'],
    text:
      'MONDAY: Lentil and sweet potato soup with bread … $4.50 (V)\nTUESDAY: Chicken quesadilla with salsa … $6.75\nWEDNESDAY: Mushroom risotto … $7.25 (vegan on request: ask for no cheese)\nTHURSDAY: Black bean burger with fries … $7.00 (V)\nFRIDAY: Two fish tacos with lime slaw … $6.50\n(V) = vegan\n\nAdd a medium coffee or tea to any special for just $1.50.\n\nLOYALTY CARD: Buy 8 specials and get the 9th one free! Stamps are given for specials only, not for drinks bought on their own. Cards cannot be combined.\nSpecials are served 11 a.m.–2 p.m. or until sold out.',
    questions: [
      {
        id: 'f02-rd-dl-cafe-specials-q1',
        kind: 'single',
        skill: 'detail',
        prompt: "How much would a student pay for Thursday's special with a medium coffee?",
        options: ['$7.00', '$8.50', '$8.75', '$9.25'],
        answer: [1],
        explanation:
          'El especial del jueves ("Black bean burger with fries") cuesta $7.00 y el café mediano se añade por "$1.50": 7.00 + 1.50 = $8.50. La opción $7.00 olvida sumar la bebida.',
      },
      {
        id: 'f02-rd-dl-cafe-specials-q2',
        kind: 'single',
        skill: 'inference',
        prompt: 'What can be inferred about the Wednesday special?',
        options: [
          'It is the cheapest dish of the week.',
          'It is served only after 2 p.m.',
          'It cannot be ordered with a drink.',
          'It normally contains cheese.',
        ],
        answer: [3],
        explanation:
          'La nota "vegan on request: ask for no cheese" implica que el risotto lleva queso normalmente. No es el más barato: la sopa del lunes cuesta $4.50 y el risotto $7.25.',
      },
      {
        id: 'f02-rd-dl-cafe-specials-q3',
        kind: 'single',
        skill: 'detail',
        prompt: 'Which purchase would earn a stamp on the loyalty card?',
        options: [
          'Ordering the Friday fish tacos',
          'Buying a medium coffee by itself',
          'Buying a bottle of water at lunch',
          'Combining two half-full cards',
        ],
        answer: [0],
        explanation:
          'El menú dice: "Stamps are given for specials only, not for drinks bought on their own"; los tacos del viernes son un especial. El café solo es una bebida, y "Cards cannot be combined".',
      },
    ],
  },
  {
    id: 'f02-rd-dl-visa-documents',
    form: 2,
    section: 'reading',
    task: 'daily-life',
    genre: 'email',
    title: 'Documents for a Visa Appointment',
    topic: 'campus-life',
    difficulty: 'medium',
    header: ['From: Ana Ruiz, Office of Study Abroad', 'To: Daniel Okafor', 'Subject: Preparing for your visa appointment'],
    text:
      'Dear Daniel,\n\nCongratulations again on your acceptance to the spring program in Lisbon. Your visa appointment is on November 4 at 9:30 a.m. Please bring the originals of the following documents, plus one photocopy of each:\n• your passport, valid for at least six months after your return date\n• the acceptance letter from the host university\n• bank statements from the last three months\n• proof of health insurance\nYou also need two passport photos, but the consulate no longer accepts photos taken more than six months ago. Any document that is not in English must include a certified translation. Please email me scans of everything by October 28 so that I can check them before your appointment.\n\nBest,\nAna',
    questions: [
      {
        id: 'f02-rd-dl-visa-documents-q1',
        kind: 'single',
        skill: 'purpose',
        prompt: 'Why did Ana write to Daniel?',
        options: [
          'To inform him that he has been accepted',
          'To change the date of his visa appointment',
          'To list what he must bring to his appointment',
          'To offer him a university health insurance plan',
        ],
        answer: [2],
        explanation:
          'El núcleo del correo es "Please bring the originals of the following documents…", seguido de la lista. La aceptación ya se conocía ("Congratulations again"), así que no es el motivo del mensaje.',
      },
      {
        id: 'f02-rd-dl-visa-documents-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'According to the email, what must accompany a document that is not in English?',
        options: [
          'A certified translation',
          'A second photocopy',
          'A letter from the host university',
          'A recent passport photo',
        ],
        answer: [0],
        explanation:
          'El correo indica: "Any document that is not in English must include a certified translation". Las fotocopias se piden para todos los documentos, no solo para los que no están en inglés.',
      },
      {
        id: 'f02-rd-dl-visa-documents-q3',
        kind: 'single',
        skill: 'inference',
        prompt: 'What is implied about passport photos that Daniel took last year?',
        options: [
          'They are acceptable if they are in color.',
          'They need a certified translation.',
          'They should be emailed by October 28.',
          'They will probably be rejected.',
        ],
        answer: [3],
        explanation:
          'Como "the consulate no longer accepts photos taken more than six months ago", unas fotos del año pasado no servirán. La fecha del 28 de octubre se refiere a enviar escaneos, no a las fotos antiguas.',
      },
    ],
  },
  {
    id: 'f02-rd-dl-fare-cards',
    form: 2,
    section: 'reading',
    task: 'daily-life',
    genre: 'notice',
    title: 'Switch to Contactless Fare Cards',
    topic: 'daily-life',
    difficulty: 'hard',
    header: ['LAKESHORE REGIONAL TRANSIT', 'PUBLIC NOTICE: Paper Tickets Are Being Retired'],
    text:
      'Beginning March 1, all buses and trains will accept only TapGo contactless cards. Cards cost $2 and can be bought at any station machine or ordered online. Paper single-ride tickets and ten-ride books will still be accepted until February 28. After that date, unused paper tickets will no longer be valid for travel, but they can be exchanged for TapGo credit at full value at the Central Station customer service office until April 30. Cash refunds are available only for monthly passes purchased before January 15, and requests must include the original receipt. Riders aged 65 and over and riders with disabilities should not buy a standard card: if they are already registered for reduced fares, they will receive a free reduced-fare TapGo card by mail. Unregistered riders must apply in person with proof of eligibility.',
    questions: [
      {
        id: 'f02-rd-dl-fare-cards-q1',
        kind: 'single',
        skill: 'detail',
        prompt: 'What can a rider do with an unused ten-ride book in mid-March?',
        options: [
          'Exchange it for card credit at Central Station',
          'Use it on buses but not on trains',
          'Return it for cash at any station machine',
          'Nothing, because it lost all value in February',
        ],
        answer: [0],
        explanation:
          'Tras el 28 de febrero los billetes no sirven para viajar, pero "they can be exchanged for TapGo credit at full value at the Central Station customer service office until April 30". La última opción es tentadora, pero ignora ese canje.',
      },
      {
        id: 'f02-rd-dl-fare-cards-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'Under which condition can a rider receive a cash refund?',
        options: [
          'The rider bought a ten-ride book in late February.',
          'The rider is over 65 and already registered for reduced fares.',
          'The rider kept the receipt for a pass bought on January 10.',
          'The rider applies online before April 30.',
        ],
        answer: [2],
        explanation:
          'El aviso dice: "Cash refunds are available only for monthly passes purchased before January 15, and requests must include the original receipt". Los billetes de diez viajes solo se canjean por crédito, no por dinero.',
      },
      {
        id: 'f02-rd-dl-fare-cards-q3',
        kind: 'single',
        skill: 'inference',
        prompt: 'What is implied about a registered rider who is 70 years old?',
        options: [
          'The rider must buy a $2 card at a machine.',
          'The rider does not need to visit an office.',
          'The rider can keep using paper tickets.',
          'The rider will get a cash refund by mail.',
        ],
        answer: [1],
        explanation:
          'Los mayores de 65 ya registrados "will receive a free reduced-fare TapGo card by mail", así que no tienen que acudir a ninguna oficina. Solo los no registrados deben "apply in person"; tampoco deben comprar la tarjeta de $2.',
      },
    ],
  },

  // ---------- Read an Academic Passage ----------
  {
    id: 'f02-rd-ap-moon-phases',
    form: 2,
    section: 'reading',
    task: 'academic-passage',
    title: 'Why the Moon Has Phases',
    topic: 'astronomy',
    difficulty: 'easy',
    paragraphs: [
      'For thousands of years, people have watched the Moon change shape over the course of a month. On some nights it appears as a thin silver curve, while on others it shines as a complete circle. These changing appearances are called phases. Although the Moon seems to grow and shrink, its actual size never changes.',
      "The Moon produces no light of its own. Instead, it reflects light from the Sun, which always illuminates exactly half of the Moon's surface. What changes during the month is how much of that sunlit half can be seen from Earth.",
      'As the Moon orbits Earth, our viewing angle changes. When the Moon lies roughly between Earth and the Sun, its lit side faces away from us, and we see a new moon, which is almost invisible. As the Moon continues along its orbit, a growing portion of the lit side comes into view, a stage called waxing. About two weeks later, when Earth lies roughly between the Sun and the Moon, the entire sunlit half faces us, producing a full moon. Afterward, the visible portion shrinks, or wanes, until the cycle begins again.',
      "A common misconception is that the phases are caused by Earth's shadow. In reality, Earth's shadow falls on the Moon only during a lunar eclipse, a relatively rare event that can happen only at full moon. The complete cycle of phases takes about 29.5 days, slightly longer than the 27.3 days the Moon needs to circle Earth once, because Earth is also moving around the Sun.",
    ],
    questions: [
      {
        id: 'f02-rd-ap-moon-phases-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'What is the passage mainly about?',
        options: [
          "How the Moon's orbit causes eclipses of the Sun",
          "Why the Moon's visible shape changes each month",
          'How ancient people used the Moon to measure time',
          "Why the Moon's surface reflects so much sunlight",
        ],
        answer: [1],
        explanation:
          'El pasaje explica por qué cambia la forma visible de la Luna ("These changing appearances are called phases") y la causa real: cuánto vemos de la mitad iluminada. Los eclipses solo se mencionan para descartar un error común.',
      },
      {
        id: 'f02-rd-ap-moon-phases-q2',
        kind: 'single',
        skill: 'vocabulary',
        paragraph: 1,
        highlight: 'illuminates',
        prompt: 'The word "illuminates" in paragraph 2 is closest in meaning to',
        options: ['warms up', 'covers up', 'moves around', 'lights up'],
        answer: [3],
        explanation:
          '"Illuminates" significa iluminar ("lights up"): el Sol ilumina la mitad de la superficie, por eso se habla de "that sunlit half". "Warms up" (calienta) no encaja con la idea de luz reflejada.',
      },
      {
        id: 'f02-rd-ap-moon-phases-q3',
        kind: 'single',
        skill: 'detail',
        paragraph: 2,
        prompt: 'According to paragraph 3, what happens during a new moon?',
        options: [
          "The Moon's lit side faces away from Earth.",
          'Earth lies between the Sun and the Moon.',
          "Earth's shadow covers the Moon's surface.",
          'The Sun lights only a thin strip of the Moon.',
        ],
        answer: [0],
        explanation:
          'El párrafo 3 dice: "its lit side faces away from us, and we see a new moon". La Tierra entre el Sol y la Luna corresponde a la luna llena ("full moon"), no a la luna nueva.',
      },
      {
        id: 'f02-rd-ap-moon-phases-q4',
        kind: 'single',
        skill: 'inference',
        paragraph: 3,
        prompt: 'What can be inferred from paragraph 4 about lunar eclipses?',
        options: [
          'They happen once during every cycle of phases.',
          'They are the main cause of the waxing phase.',
          'They cannot take place during a new moon.',
          'They last for approximately 29.5 days.',
        ],
        answer: [2],
        explanation:
          'Si un eclipse lunar "can happen only at full moon", se deduce que nunca ocurre en luna nueva. No sucede en cada ciclo: el texto lo llama "a relatively rare event".',
      },
      {
        id: 'f02-rd-ap-moon-phases-q5',
        kind: 'single',
        skill: 'purpose',
        paragraph: 3,
        prompt: 'Why does the author mention "27.3 days" in paragraph 4?',
        options: [
          "To show that the Moon's orbit is slowly getting longer",
          'To contrast the phase cycle with the time of one orbit',
          'To explain why lunar eclipses are relatively rare',
          "To prove that Earth's shadow produces the phases",
        ],
        answer: [1],
        explanation:
          'El autor compara los 29.5 días del ciclo de fases con los "27.3 days the Moon needs to circle Earth once" y explica la diferencia. No dice que la órbita se alargue ni relaciona esa cifra con los eclipses.',
      },
    ],
  },
  {
    id: 'f02-rd-ap-first-language',
    form: 2,
    section: 'reading',
    task: 'academic-passage',
    title: 'From Babbling to Sentences',
    topic: 'linguistics',
    difficulty: 'medium',
    paragraphs: [
      'Children around the world learn their first language in a remarkably similar sequence, regardless of which language they hear. Within a few years, and usually without formal instruction, they progress from crying and cooing to producing complex sentences. Researchers describe this progression as a series of overlapping stages, although the age at which a particular child reaches each stage varies considerably.',
      'At around six months, infants begin to babble, repeating syllables such as "ba-ba" or "da-da." Babbling is not random noise. By the end of the first year, babies babble mostly with the sounds and rhythms of the language spoken around them, and they gradually become less able to distinguish sounds that their language does not use. Deaf infants exposed to sign language even produce a kind of babbling with their hands, which suggests that babbling reflects a general readiness for language rather than simple vocal play.',
      'Around their first birthday, most children produce their first recognizable words, typically names for familiar people, animals, and objects. For several months, vocabulary grows slowly, but at roughly eighteen months many children experience a vocabulary spurt, learning several new words a day. Soon afterward, they begin combining words into two-word utterances such as "more juice" or "daddy go." Although these phrases lack small grammatical words and endings, they usually follow the basic word order of the adult language.',
      'Between the ages of two and four, sentences grow longer and more grammatical. One revealing feature of this period is overregularization: a child who earlier said "went" may suddenly start saying "goed." Rather than a step backward, this error shows that the child has discovered the general rule for forming the past tense and is applying it too broadly. Because children could not have copied such forms from adults, these mistakes indicate that language learning involves actively building rules, not merely imitating speech.',
    ],
    questions: [
      {
        id: 'f02-rd-ap-first-language-q1',
        kind: 'single',
        skill: 'organization',
        prompt: 'How is the information in the passage organized?',
        options: [
          'It compares how children learn first and second languages.',
          'It presents a theory and then gives evidence against it.',
          'It describes stages of development in chronological order.',
          'It explains a learning problem and proposes solutions.',
        ],
        answer: [2],
        explanation:
          'El pasaje avanza por edades: "At around six months", "Around their first birthday", "Between the ages of two and four". No compara con segundas lenguas ni refuta una teoría.',
      },
      {
        id: 'f02-rd-ap-first-language-q2',
        kind: 'single',
        skill: 'detail',
        paragraph: 1,
        prompt: "According to paragraph 2, what is true by the end of a baby's first year?",
        options: [
          'Babbling reflects the sounds of the surrounding language.',
          'Babies stop babbling and start speaking in sentences.',
          'Babies hear differences in all languages more easily.',
          'Babbling is gradually replaced by crying and cooing.',
        ],
        answer: [0],
        explanation:
          'El texto dice: "babies babble mostly with the sounds and rhythms of the language spoken around them". La tercera opción es lo contrario: se vuelven "less able to distinguish sounds that their language does not use".',
      },
      {
        id: 'f02-rd-ap-first-language-q3',
        kind: 'single',
        skill: 'vocabulary',
        paragraph: 2,
        highlight: 'spurt',
        prompt: 'The word "spurt" in paragraph 3 is closest in meaning to',
        options: ['long pause', 'careful review', 'gradual decline', 'sudden burst'],
        answer: [3],
        explanation:
          '"Spurt" es un aumento repentino ("sudden burst"): el texto contrasta "vocabulary grows slowly" con aprender "several new words a day". "Gradual decline" expresa justo lo contrario.',
      },
      {
        id: 'f02-rd-ap-first-language-q4',
        kind: 'single',
        skill: 'inference',
        paragraph: 3,
        prompt: 'What can be inferred from paragraph 4 about a child who says "goed"?',
        options: [
          'The child has a hearing problem that affects speech.',
          'The child knows how most past-tense verbs are formed.',
          'The child heard the word "goed" from an adult.',
          'The child will never learn to say "went" correctly.',
        ],
        answer: [1],
        explanation:
          'El error muestra que el niño "has discovered the general rule for forming the past tense" (añadir -ed) y la aplica de más. El texto niega que lo haya copiado: "children could not have copied such forms from adults".',
      },
      {
        id: 'f02-rd-ap-first-language-q5',
        kind: 'single',
        skill: 'purpose',
        paragraph: 1,
        prompt: 'Why does the author mention deaf infants in paragraph 2?',
        options: [
          'To show that babbling can be a sign of hearing loss',
          'To explain why some children begin speaking late',
          'To show that babbling is more than vocal play',
          'To argue that sign languages have no real grammar',
        ],
        answer: [2],
        explanation:
          'Los bebés sordos balbucean con las manos, "which suggests that babbling reflects a general readiness for language rather than simple vocal play". El texto no habla de retrasos en el habla ni de la gramática de las lenguas de señas.',
      },
    ],
  },
  {
    id: 'f02-rd-ap-immune-memory',
    form: 2,
    section: 'reading',
    task: 'academic-passage',
    title: 'Immune Memory and Vaccines',
    topic: 'biology',
    difficulty: 'hard',
    paragraphs: [
      "When a pathogen such as a virus or bacterium enters the body for the first time, the immune system must respond to an enemy it has never encountered. This primary response is relatively slow. White blood cells called lymphocytes must first recognize the invader, and only the few lymphocytes whose receptors happen to match the pathogen's molecular markers, known as antigens, are activated. These cells then multiply over several days, which is why a person may become seriously ill before the infection is brought under control.",
      "Two main types of lymphocytes coordinate this defense. B cells, once activated, give rise to plasma cells that release large quantities of antibodies, proteins that bind to specific antigens and mark the pathogen for destruction. T cells play complementary roles: some help activate B cells, while others directly kill body cells that have already been infected. After the infection is cleared, most of these activated cells die off, since maintaining millions of them would waste the body's resources.",
      'A small fraction, however, survives as memory cells. These long-lived B and T cells retain the ability to recognize the same antigen, sometimes for decades. If the pathogen returns, memory cells respond far more quickly and vigorously than the original lymphocytes did. This secondary response often eliminates the invader before it can multiply enough to cause symptoms, which explains why people who recover from diseases such as measles rarely catch them a second time.',
      "Vaccines exploit this capacity for memory without requiring a person to survive a dangerous illness. A vaccine exposes the immune system to antigens in a harmless form, such as a weakened or inactivated pathogen, a purified protein, or genetic instructions that lead the body's own cells to produce a single viral protein. The immune system reacts as it would to a real infection and generates memory cells. Because some memory fades over time, and because certain viruses, such as influenza, frequently change their antigens, some vaccines must be repeated with booster doses or updated formulas.",
    ],
    questions: [
      {
        id: 'f02-rd-ap-immune-memory-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'Which of the following best expresses the main idea of the passage?',
        options: [
          'B cells play a more important role in defense than T cells do.',
          'Most activated lymphocytes die once an infection is cleared.',
          'Influenza vaccines must be updated because the virus changes.',
          'Memory cells speed up later responses, and vaccines use this.',
        ],
        answer: [3],
        explanation:
          'El pasaje pasa de la respuesta primaria lenta a las "memory cells" que responden "far more quickly" y termina con "Vaccines exploit this capacity for memory". Las demás opciones son detalles parciales; el texto no dice que las células B sean más importantes.',
      },
      {
        id: 'f02-rd-ap-immune-memory-q2',
        kind: 'single',
        skill: 'detail',
        paragraph: 0,
        prompt: 'According to paragraph 1, why is the primary response relatively slow?',
        options: [
          'Antibodies must travel a long way to reach the infection.',
          'Only a few matching lymphocytes exist and must multiply.',
          'The pathogen hides its antigens from white blood cells.',
          'Memory cells have to be produced before defense begins.',
        ],
        answer: [1],
        explanation:
          'Solo se activan "the few lymphocytes whose receptors happen to match", y luego "multiply over several days". Las células de memoria aparecen después de la infección, no antes de la defensa.',
      },
      {
        id: 'f02-rd-ap-immune-memory-q3',
        kind: 'single',
        skill: 'vocabulary',
        paragraph: 1,
        highlight: 'complementary',
        prompt: 'The word "complementary" in paragraph 2 is closest in meaning to',
        options: ['identical in every way', 'free of charge', 'completing each other', 'opposing one another'],
        answer: [2],
        explanation:
          '"Complementary" significa que se completan mutuamente: las células T ayudan a las B o eliminan células infectadas, tareas que completan la de los anticuerpos. "Free of charge" corresponde a "complimentary", una palabra parecida pero distinta.',
      },
      {
        id: 'f02-rd-ap-immune-memory-q4',
        kind: 'single',
        skill: 'negative-factual',
        paragraph: 3,
        prompt: 'According to paragraph 4, all of the following can be used in vaccines EXCEPT',
        options: [
          'antibodies taken from recovered patients',
          'a weakened or inactivated pathogen',
          'a purified protein from the pathogen',
          'genetic instructions for a viral protein',
        ],
        answer: [0],
        explanation:
          'El párrafo 4 enumera "a weakened or inactivated pathogen, a purified protein, or genetic instructions"; nunca menciona anticuerpos de pacientes recuperados. Los anticuerpos aparecen en el párrafo 2, pero no como componente de las vacunas.',
      },
      {
        id: 'f02-rd-ap-immune-memory-q5',
        kind: 'single',
        skill: 'inference',
        paragraph: 3,
        prompt: 'What can be inferred about influenza vaccines from paragraph 4?',
        options: [
          'They contain live viruses that cause a mild illness.',
          'They fail to produce any memory cells at all.',
          'They are more dangerous than other vaccines.',
          "Last year's version may not fully protect this year.",
        ],
        answer: [3],
        explanation:
          'Como la gripe "frequently change[s] their antigens", la memoria creada por una vacuna antigua puede no reconocer el virus nuevo; por eso hay "updated formulas". El texto no dice que no generen memoria ni que sean peligrosas.',
      },
    ],
  },
  {
    id: 'f02-rd-ap-columbian-exchange',
    form: 2,
    section: 'reading',
    task: 'academic-passage',
    title: 'The Columbian Exchange',
    topic: 'history',
    difficulty: 'hard',
    paragraphs: [
      "The voyages of Christopher Columbus beginning in 1492 reconnected two hemispheres whose plants, animals, and peoples had developed largely in isolation for thousands of years. The transfers that followed, which the historian Alfred Crosby named the 'Columbian Exchange' in 1972, reshaped diets, economies, and populations on every inhabited continent. Few events in human history have had such wide-ranging biological consequences.",
      'Crops from the Americas transformed agriculture in Europe, Africa, and Asia. Maize and potatoes produced high yields and could grow in soils and climates where traditional grains struggled. The potato became a staple food in northern Europe, and historians have linked it to population growth there in the eighteenth and nineteenth centuries. Cassava spread widely in Africa, and chili peppers became so central to cooking in South and Southeast Asia that many people today assume they originated in that region. In the opposite direction, Europeans brought wheat, sugarcane, and coffee to the Americas, where sugar and coffee plantations would come to depend on enslaved labor.',
      'Animals moved mainly from east to west. Before 1492, the Americas had no horses, cattle, pigs, or sheep, and the largest domesticated animals were the llamas and alpacas of the Andes. Horses brought by the Spanish (native horses had died out in North America thousands of years earlier) transformed life on the Great Plains, where peoples such as the Comanche and Lakota became skilled mounted hunters of bison. Cattle and pigs multiplied rapidly in their new environment, sometimes trampling the fields of Indigenous farmers.',
      'The most devastating element of the exchange, however, was invisible. Diseases such as smallpox, measles, and influenza had long circulated in Europe, Africa, and Asia, where dense populations living close to domesticated animals had developed some resistance over many generations. Indigenous Americans had no such prior exposure. Epidemics swept through communities, often spreading ahead of the Europeans themselves, and although estimates vary widely, many scholars believe that the Indigenous population of the Americas fell by well over half within a century of contact. This catastrophic loss of life eased European conquest and increased the demand for enslaved African laborers.',
    ],
    questions: [
      {
        id: 'f02-rd-ap-columbian-exchange-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'What is the main purpose of the passage?',
        options: [
          'To describe the transfers that followed 1492 and their effects',
          'To explain why Columbus chose to sail west across the Atlantic',
          'To compare the farming methods used in Europe and the Americas',
          'To argue that the horse was the most important animal in history',
        ],
        answer: [0],
        explanation:
          'Cada párrafo trata un tipo de transferencia (cultivos, animales, enfermedades) y sus consecuencias: "reshaped diets, economies, and populations". Los caballos son solo un ejemplo dentro del párrafo 3.',
      },
      {
        id: 'f02-rd-ap-columbian-exchange-q2',
        kind: 'single',
        skill: 'detail',
        paragraph: 1,
        prompt: 'According to paragraph 2, why did maize and potatoes spread so widely?',
        options: [
          'They were easier to ship across the ocean than wheat.',
          'They were grown on plantations that used enslaved labor.',
          'They gave large harvests where other grains did poorly.',
          'They were the only crops Columbus carried back to Europe.',
        ],
        answer: [2],
        explanation:
          'El texto dice que "produced high yields and could grow in soils and climates where traditional grains struggled". Las plantaciones con mano de obra esclavizada se refieren al azúcar y al café en América.',
      },
      {
        id: 'f02-rd-ap-columbian-exchange-q3',
        kind: 'single',
        skill: 'reference',
        paragraph: 1,
        highlight: 'there',
        prompt: 'The word "there" in paragraph 2 refers to',
        options: ['the Americas', 'northern Europe', 'Africa', 'South and Southeast Asia'],
        answer: [1],
        explanation:
          '"The potato became a staple food in northern Europe, and historians have linked it to population growth there": "there" retoma el lugar recién nombrado, el norte de Europa. América es el origen de la papa, no el lugar del crecimiento.',
      },
      {
        id: 'f02-rd-ap-columbian-exchange-q4',
        kind: 'single',
        skill: 'vocabulary',
        paragraph: 3,
        highlight: 'devastating',
        prompt: 'The word "devastating" in paragraph 4 is closest in meaning to',
        options: ['unexpected', 'gradual', 'short-lived', 'destructive'],
        answer: [3],
        explanation:
          '"Devastating" significa muy destructivo; el párrafo habla de "catastrophic loss of life". Aunque las epidemias fueron inesperadas, "unexpected" no recoge la idea de destrucción.',
      },
      {
        id: 'f02-rd-ap-columbian-exchange-q5',
        kind: 'single',
        skill: 'inference',
        paragraph: 2,
        prompt: 'What can be inferred from paragraph 3 about the Comanche and Lakota before Spanish horses arrived?',
        options: [
          'They did not hunt bison on horseback.',
          'They raised llamas and alpacas for food.',
          'They kept large herds of cattle and pigs.',
          'They lived mainly in the Andes mountains.',
        ],
        answer: [0],
        explanation:
          'Los caballos llegaron con los españoles y gracias a ellos estos pueblos "became skilled mounted hunters of bison"; antes no podían cazar a caballo. Las llamas y alpacas eran de los Andes, no de las Grandes Llanuras.',
      },
    ],
  },
];
