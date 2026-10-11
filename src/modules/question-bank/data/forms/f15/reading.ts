import type { ReadingSet } from '../../../types';

/** Simulación n.º 15 — Reading (contenido original). */
export const sets: ReadingSet[] = [
  // ---------- Complete the Words ----------
  {
    id: 'f15-rd-cw-opportunity-cost',
    form: 15,
    section: 'reading',
    task: 'complete-words',
    title: 'The Price of Every Choice',
    topic: 'economics',
    difficulty: 'easy',
    text:
      'Every decision involves a hidden price that economists call opportunity cost. This {{co|st}} is {{t|he}} value {{o|f}} the {{be|st}} alternative {{th|at}} you {{gi|ve}} up {{wh|en}} you {{ma|ke}} a {{cho|ice}}. For {{exa|mple}}, if a student spends Saturday working at a café, she earns money but loses time she could have spent studying or resting. Thinking about opportunity cost helps people, businesses, and governments compare their options more carefully and use limited resources wisely.',
    note: 'Fíjate en las colocaciones "give up" (renunciar a algo) y "make a choice"; "best" es el superlativo que sigue a "the" antes de "alternative".',
  },
  {
    id: 'f15-rd-cw-veblen-status',
    form: 15,
    section: 'reading',
    task: 'complete-words',
    title: 'Spending to Display Status',
    topic: 'sociology',
    difficulty: 'medium',
    text:
      'In 1899, the economist Thorstein Veblen introduced the term conspicuous consumption to describe a puzzling kind of spending. He {{wr|ote}} that {{wea|lthy}} families {{of|ten}} bought {{expe|nsive}} goods {{n|ot}} because {{th|ey}} were {{use|ful}} but {{bec|ause}} they {{disp|layed}} social {{sta|tus}} to others. A silver spoon, for example, works no better than a cheap one, yet owning it signals that a family can afford to waste money. Veblen believed this desire for display spreads downward, as each social class imitates the spending habits of the class above it.',
    note: 'Observa la estructura "not because… but because…" y los sufijos de adjetivo -ful y -thy (useful, wealthy). El pasado irregular "wrote" mantiene el tiempo verbal del texto.',
  },
  {
    id: 'f15-rd-cw-lost-wax',
    form: 15,
    section: 'reading',
    task: 'complete-words',
    title: 'Casting Bronze with Wax',
    topic: 'art',
    difficulty: 'hard',
    text:
      'The lost-wax method is an ancient technique that allows artists to cast bronze sculpture with remarkable precision. Initially, {{t|he}} sculptor {{fash|ions}} a {{deta|iled}} model {{fr|om}} wax, {{wh|ich}} is {{subseq|uently}} encased {{i|n}} a {{prote|ctive}} shell {{th|at}} can {{with|stand}} intense heat. When the shell is heated in a kiln, the wax melts and drains away, leaving a hollow cavity that reproduces every contour of the original. Molten bronze is then poured into this cavity, and once the metal has cooled and solidified, the shell is broken apart to reveal the finished casting.',
    note: 'Los adverbios de secuencia (Initially, subsequently, then) ordenan las etapas del proceso. "Withstand" significa resistir; "fashion" como verbo significa dar forma.',
  },

  // ---------- Read in Daily Life ----------
  {
    id: 'f15-rd-dl-movie-seats',
    form: 15,
    section: 'reading',
    task: 'daily-life',
    genre: 'text-message',
    title: 'Running Late for the Movie',
    topic: 'daily-life',
    difficulty: 'easy',
    text:
      "Ana (7:02 p.m.): Hi Sam, my bus is stuck in traffic. I'll be about 15 minutes late.\nSam (7:03 p.m.): Oh no! The movie starts at 7:30.\nAna (7:04 p.m.): Could you buy both tickets at the counter? The online ones are sold out. I'll pay you back when I get there.\nSam (7:05 p.m.): No problem. Where do you want to sit?\nAna (7:06 p.m.): Somewhere in the middle, not too close to the screen. And please save me the seat on the aisle so I don't disturb anyone.\nSam (7:07 p.m.): Got it. I'll text you the row number.",
    questions: [
      {
        id: 'f15-rd-dl-movie-seats-q1',
        kind: 'single',
        skill: 'detail',
        prompt: 'Why will Ana arrive late?',
        options: [
          'She is waiting for Sam to send her money.',
          'She could not find any tickets online.',
          'Her bus has been delayed by traffic.',
          'She went to the wrong movie theater.',
        ],
        answer: [2],
        explanation:
          'Ana escribe: "my bus is stuck in traffic. I\'ll be about 15 minutes late". Que las entradas en línea estén agotadas ("The online ones are sold out") explica por qué pide comprarlas en taquilla, no por qué llega tarde.',
      },
      {
        id: 'f15-rd-dl-movie-seats-q2',
        kind: 'single',
        skill: 'inference',
        prompt: 'Why does Ana probably want the seat on the aisle?',
        options: [
          'She will get there after others are seated.',
          'She wants to sit close to the big screen.',
          'She plans to leave before the movie ends.',
          'Aisle seats are cheaper at the counter.',
        ],
        answer: [0],
        explanation:
          'Como llegará tarde, pide el asiento del pasillo "so I don\'t disturb anyone": se deduce que entrará cuando los demás ya estén sentados. La opción de la pantalla contradice "not too close to the screen".',
      },
    ],
  },
  {
    id: 'f15-rd-dl-laundromat',
    form: 15,
    section: 'reading',
    task: 'daily-life',
    genre: 'notice',
    title: 'Laundromat Prices and Hours',
    topic: 'daily-life',
    difficulty: 'easy',
    header: ['MAPLE STREET LAUNDROMAT — NEW PRICES AND HOURS'],
    text:
      'Starting Monday, June 2, our machine prices will change:\n• Small washer (up to 8 kg): $3.00\n• Large washer (up to 18 kg): $5.50\n• Dryers: $0.25 for every 8 minutes\nAll machines now accept cards and phone payments. Coins can still be used in the dryers only.\nNew opening hours: Monday–Saturday, 6 a.m. to 10 p.m.; Sunday, 8 a.m. to 8 p.m. The last wash must begin one hour before closing. Lost items are kept at the counter for 30 days.',
    questions: [
      {
        id: 'f15-rd-dl-laundromat-q1',
        kind: 'single',
        skill: 'detail',
        prompt: 'What is true about paying for the machines?',
        options: [
          'Cards are accepted only in the large washers.',
          'Coins can still be used in every machine.',
          'Dryers must be paid for at the front counter.',
          'Coins are accepted only in the dryers now.',
        ],
        answer: [3],
        explanation:
          'El aviso dice: "Coins can still be used in the dryers only". Las tarjetas sirven en todas las máquinas ("All machines now accept cards"), así que la opción de las lavadoras grandes es falsa.',
      },
      {
        id: 'f15-rd-dl-laundromat-q2',
        kind: 'single',
        skill: 'inference',
        prompt: 'A customer arrives at 9:30 p.m. on a Tuesday with dirty clothes. What will probably happen?',
        options: [
          'She can wash them if she pays by card.',
          'She will not be allowed to start a wash.',
          'She can use only the small washers.',
          'She must come back on Sunday morning.',
        ],
        answer: [1],
        explanation:
          'Entre semana cierran a las 10 p.m. y "The last wash must begin one hour before closing", es decir, a las 9 p.m. A las 9:30 ya no puede empezar un lavado. No tiene por qué volver el domingo: puede volver cualquier otro día.',
      },
    ],
  },
  {
    id: 'f15-rd-dl-internship-credit',
    form: 15,
    section: 'reading',
    task: 'daily-life',
    genre: 'email',
    title: 'Academic Credit for Internships',
    topic: 'campus-life',
    difficulty: 'medium',
    header: [
      'From: Dana Whitfield, Internship Coordinator',
      'To: Business Majors Mailing List',
      'Subject: Earning credit for your summer internship',
    ],
    text:
      'Dear students,\n\nIf you have a summer internship lined up, you may be able to earn three academic credits for it. To qualify, the internship must last at least eight weeks and include a minimum of 120 working hours. Before you start, submit a learning agreement signed by your site supervisor and a faculty sponsor; agreements are due May 15. During the internship, you will keep a weekly journal, and at the end you will write a 2,000-word reflection paper. Both paid and unpaid internships qualify, but positions at family businesses where a relative is your supervisor do not. Please note that summer tuition applies to internship credits.\n\nBest,\nDana Whitfield\nInternship Coordinator',
    questions: [
      {
        id: 'f15-rd-dl-internship-credit-q1',
        kind: 'single',
        skill: 'purpose',
        prompt: 'What is the main purpose of the email?',
        options: [
          'To explain how students can get credit for an internship',
          'To announce new internship positions for the summer',
          'To remind students that reflection papers are due soon',
          'To ask faculty members to sponsor student internships',
        ],
        answer: [0],
        explanation:
          'El correo empieza con "you may be able to earn three academic credits for it" y luego enumera requisitos y tareas. No anuncia puestos nuevos ni recuerda una entrega concreta del trabajo final.',
      },
      {
        id: 'f15-rd-dl-internship-credit-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'What must students do before their internship begins?',
        options: [
          'Complete 120 hours of work at the site',
          'Write a reflection paper of 2,000 words',
          'Turn in an agreement signed by two people',
          'Start keeping a journal of their weekly tasks',
        ],
        answer: [2],
        explanation:
          '"Before you start, submit a learning agreement signed by your site supervisor and a faculty sponsor": dos firmas. El diario se lleva "During the internship" y el ensayo se escribe "at the end".',
      },
      {
        id: 'f15-rd-dl-internship-credit-q3',
        kind: 'single',
        skill: 'inference',
        prompt: 'Which student would most likely NOT be able to earn credit?',
        options: [
          'A student doing an unpaid ten-week, 200-hour museum internship',
          'A student completing 150 hours over nine weeks at a local bank',
          'A student in a paid twelve-week, full-time internship at a lab',
          'A student supervised by her uncle at his shop for ten weeks',
        ],
        answer: [3],
        explanation:
          'Quedan excluidos los puestos "at family businesses where a relative is your supervisor". Las demás opciones cumplen las 8 semanas y las 120 horas, y el texto aclara que "Both paid and unpaid internships qualify".',
      },
    ],
  },
  {
    id: 'f15-rd-dl-food-festival',
    form: 15,
    section: 'reading',
    task: 'daily-life',
    genre: 'menu',
    title: 'Global Flavors Festival Menu',
    topic: 'campus-life',
    difficulty: 'medium',
    header: ['GLOBAL FLAVORS FESTIVAL — Student Union Lawn, Saturday, 11 a.m.–4 p.m.'],
    text:
      'TOKENS: 1 token = $2. Buy them at the welcome tent (cash or card). Unused tokens can be exchanged for cash until 3:30 p.m.\n\nBOOTH 1 — Korea: Kimchi pancake (2 tokens) • Beef bulgogi rice bowl (4 tokens)\nBOOTH 2 — Mexico: Chicken tamales, two pieces (3 tokens) • Horchata (1 token)\nBOOTH 3 — Ethiopia: Lentil stew with injera bread (3 tokens) — vegan\nBOOTH 4 — India: Vegetable samosas, three pieces (2 tokens) — vegan • Mango lassi (2 tokens)\nBOOTH 5 — Italy: Pistachio cannoli (2 tokens) — contains nuts\n\nFESTIVAL PASSPORT: Collect a stamp at every booth and receive a free dessert at Booth 5.\nItems marked "vegan" contain no animal products.',
    questions: [
      {
        id: 'f15-rd-dl-food-festival-q1',
        kind: 'single',
        skill: 'detail',
        prompt: 'A student wants the lentil stew and a mango lassi. How much money does she need to spend on tokens?',
        options: ['$5', '$10', '$6', '$8'],
        answer: [1],
        explanation:
          'El guiso cuesta 3 tokens y el lassi 2: 5 tokens en total. Como "1 token = $2", necesita $10. La opción $5 confunde el número de tokens con el precio en dólares.',
      },
      {
        id: 'f15-rd-dl-food-festival-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'Which item does the menu identify as containing no animal products?',
        options: ['The Korean kimchi pancake', 'The horchata', 'The mango lassi', 'The vegetable samosas'],
        answer: [3],
        explanation:
          'Solo los artículos marcados como "vegan" garantizan que no hay productos animales ("Items marked "vegan" contain no animal products"). Entre las opciones, solo las "Vegetable samosas" llevan esa marca; el lassi, de la misma caseta, no la lleva.',
      },
      {
        id: 'f15-rd-dl-food-festival-q3',
        kind: 'single',
        skill: 'inference',
        prompt: 'What is implied about a student who still has unused tokens at 3:45 p.m.?',
        options: [
          'She can no longer exchange them for cash.',
          'She can spend them at the welcome tent only.',
          'She will receive a free dessert instead.',
          'She must use them at Booth 5 before it closes.',
        ],
        answer: [0],
        explanation:
          'Los tokens se pueden canjear por dinero solo "until 3:30 p.m."; a las 3:45 ese plazo ya pasó. El postre gratis depende del pasaporte con sellos, no de tener tokens sobrantes.',
      },
    ],
  },
  {
    id: 'f15-rd-dl-time-of-use',
    form: 15,
    section: 'reading',
    task: 'daily-life',
    genre: 'webpage',
    title: 'Time-of-Use Electricity Plans',
    topic: 'daily-life',
    difficulty: 'hard',
    header: ['Time-of-Use Plans — Frequently Asked Questions | Northvale Energy'],
    text:
      'What is a time-of-use (TOU) plan? On a TOU plan, the price of electricity depends on when you use it. Peak hours are 4–9 p.m. on weekdays, when electricity costs 38 cents per kilowatt-hour. At all other times, including all day on weekends and public holidays, the off-peak rate of 14 cents applies.\n\nWho benefits most? Households that can shift laundry or electric-car charging to off-peak hours usually save money. Customers who use most of their power in the early evening may pay more than on our standard flat rate of 22 cents.\n\nHow do I switch? Select "Change plan" in your online account. Changes take effect at the start of your next billing cycle. You may return to the flat rate once within the first 12 months at no charge; after that, a $25 fee applies. Customers in a payment-assistance program must speak with an agent before switching.',
    questions: [
      {
        id: 'f15-rd-dl-time-of-use-q1',
        kind: 'single',
        skill: 'detail',
        prompt: 'According to the page, when does the off-peak rate apply?',
        options: [
          'Only between 9 p.m. and 4 a.m. on weekdays',
          'On weekdays between 4 p.m. and 9 p.m.',
          'At any time on a Saturday or a Sunday',
          'During the first 12 months of the plan',
        ],
        answer: [2],
        explanation:
          'La tarifa reducida se aplica "At all other times, including all day on weekends and public holidays". La franja de 4 a 9 p.m. entre semana es la hora punta, y la primera opción es demasiado restrictiva ("Only").',
      },
      {
        id: 'f15-rd-dl-time-of-use-q2',
        kind: 'single',
        skill: 'inference',
        prompt: 'Which customer would most likely pay more on a TOU plan than on the flat rate?',
        options: [
          'A family that runs the dishwasher after 10 p.m.',
          'A worker who does laundry at 6 p.m. on weekdays',
          'A driver who charges an electric car overnight',
          'A retiree who does most of the laundry on Sundays',
        ],
        answer: [1],
        explanation:
          'Quien consume sobre todo "in the early evening" puede pagar más ("may pay more than on our standard flat rate"); las 6 p.m. de un día laborable están dentro de la hora punta (4–9 p.m.). Las demás opciones usan horas valle.',
      },
      {
        id: 'f15-rd-dl-time-of-use-q3',
        kind: 'single',
        skill: 'detail',
        prompt:
          'A customer joined a TOU plan eight months ago and now wants to go back to the flat rate for the first time. He is not in a payment-assistance program. What is true?',
        options: [
          'He will have to pay a $25 fee.',
          'He must speak with an agent first.',
          'The change will take effect immediately.',
          'He can switch back without paying.',
        ],
        answer: [3],
        explanation:
          'Puede volver a la tarifa fija "once within the first 12 months at no charge"; ocho meses está dentro de ese plazo. La cuota de $25 solo se aplica "after that", y el cambio se hace en el siguiente ciclo de facturación, no de inmediato.',
      },
    ],
  },

  // ---------- Read an Academic Passage ----------
  {
    id: 'f15-rd-ap-river-deltas',
    form: 15,
    section: 'reading',
    task: 'academic-passage',
    title: 'How Rivers Build Deltas',
    topic: 'geology',
    difficulty: 'easy',
    paragraphs: [
      'A delta is an area of land that forms where a river flows into a larger, calmer body of water, such as a sea or a lake. The name comes from the Greek letter delta (Δ), because the Nile Delta in Egypt has a roughly triangular shape. Deltas are among the most fertile and densely populated landscapes on Earth.',
      'Deltas form because of a simple change in speed. As a river flows downhill, it carries large amounts of sediment—sand, silt, and clay—picked up from the land it has crossed. When the river reaches the sea, its current suddenly slows, and it can no longer carry this load. The heaviest particles, such as sand, settle first near the river mouth, while finer silt and clay are carried farther out before they sink.',
      'Over time, these deposits build up and push the shoreline outward. As sediment accumulates, it can block the main channel, forcing the river to split into smaller branches called distributaries. Each branch deposits its own sediment, so the delta gradually spreads in a fan shape. The Mississippi River, for example, has extended the coast of Louisiana many kilometers into the sea in this way.',
      'Not every river builds a delta, however. Where waves and tides along the coast are strong, they sweep sediment away before it can accumulate. Today, many deltas are also shrinking because dams upstream trap sediment that once reached the coast. Without a steady supply of new material, the land slowly sinks and is worn away by the sea.',
    ],
    questions: [
      {
        id: 'f15-rd-ap-river-deltas-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'What is the passage mainly about?',
        options: [
          'Why deltas are the most crowded places on Earth',
          'How deltas form and what can limit their growth',
          'The history of the Nile and Mississippi deltas',
          'How dams are built to protect coastal land',
        ],
        answer: [1],
        explanation:
          'El texto explica la formación ("Deltas form because of a simple change in speed"), el crecimiento en abanico y, al final, qué lo impide ("Not every river builds a delta"). El Nilo y el Misisipi son solo ejemplos.',
      },
      {
        id: 'f15-rd-ap-river-deltas-q2',
        kind: 'single',
        skill: 'detail',
        paragraph: 1,
        prompt: 'According to paragraph 2, why does a river drop its sediment near the sea?',
        options: [
          'The river channel becomes deeper near the coast.',
          'Waves push the sediment back toward the land.',
          'The river splits into many smaller branches.',
          'The water slows down and cannot carry its load.',
        ],
        answer: [3],
        explanation:
          '"When the river reaches the sea, its current suddenly slows, and it can no longer carry this load." La división en ramas aparece en el párrafo 3 y es una consecuencia de la acumulación, no su causa.',
      },
      {
        id: 'f15-rd-ap-river-deltas-q3',
        kind: 'single',
        skill: 'vocabulary',
        paragraph: 2,
        highlight: 'gradually',
        prompt: 'The word "gradually" in paragraph 3 is closest in meaning to',
        options: ['slowly over time', 'in a regular pattern', 'suddenly', 'in all directions'],
        answer: [0],
        explanation:
          '"Gradually" significa poco a poco: el delta "gradually spreads" a medida que cada brazo deposita sedimento. "In all directions" tienta por la forma de abanico, pero no es el significado de la palabra.',
      },
      {
        id: 'f15-rd-ap-river-deltas-q4',
        kind: 'single',
        skill: 'inference',
        paragraph: 1,
        prompt: 'What can be inferred from paragraph 2 about the parts of a delta farthest from the river mouth?',
        options: [
          'They consist mostly of coarse, heavy sand grains.',
          'They grow faster than the areas near the mouth.',
          'They hold finer material than areas near the mouth.',
          'They are shielded from waves by heavy deposits of sand.',
        ],
        answer: [2],
        explanation:
          'La arena se deposita "first near the river mouth", mientras que "finer silt and clay are carried farther out": las zonas lejanas tienen partículas más finas. La opción de la arena gruesa invierte esta relación.',
      },
      {
        id: 'f15-rd-ap-river-deltas-q5',
        kind: 'single',
        skill: 'purpose',
        paragraph: 2,
        prompt: 'Why does the author mention the Mississippi River in paragraph 3?',
        options: [
          'To show that some rivers never build deltas',
          'To give an example of a delta extending a coast',
          'To compare the sizes of two famous deltas',
          'To explain how dams reduce the supply of sediment',
        ],
        answer: [1],
        explanation:
          'El Misisipi ilustra cómo los depósitos "push the shoreline outward": "has extended the coast of Louisiana many kilometers into the sea". Los ríos sin delta y las presas aparecen en el párrafo 4.',
      },
    ],
  },
  {
    id: 'f15-rd-ap-reverse-osmosis',
    form: 15,
    section: 'reading',
    task: 'academic-passage',
    title: 'Desalination by Reverse Osmosis',
    topic: 'engineering',
    difficulty: 'medium',
    paragraphs: [
      'About 97 percent of the water on Earth is salty seawater, which humans cannot drink. In dry coastal regions such as the Middle East and parts of Australia, engineers have turned to desalination—the removal of salt from seawater—to supply cities with fresh water. Although several methods exist, most desalination plants built in recent decades rely on a process called reverse osmosis.',
      'To understand reverse osmosis, it helps to start with ordinary osmosis. When two solutions are separated by a semipermeable membrane—a thin barrier that lets water molecules pass but blocks dissolved salts—water naturally moves from the less salty side to the saltier side. In a desalination plant, engineers reverse this flow. Powerful pumps press seawater against the membrane at very high pressure, often more than 50 times the pressure of the atmosphere, forcing water molecules through it while leaving most of the salt behind.',
      "The membranes are delicate, so seawater must first be pretreated. Screens remove fish and seaweed, and filters capture sand and tiny particles that would otherwise clog the membrane's microscopic pores. After passing through the membranes, the purified water is still not quite ready to drink. Because it contains almost no minerals, plants add small amounts of calcium and other minerals to improve its taste and to protect the pipes that carry it to homes.",
      'Reverse osmosis also has drawbacks. Running high-pressure pumps consumes a great deal of electricity, although modern plants recover part of this energy from the pressurized waste stream. That waste, called brine, is roughly twice as salty as normal seawater, and if it is discharged carelessly, it can harm marine life near the outlet. Engineers therefore try to dilute the brine and release it through diffusers that spread it over a wide area.',
    ],
    questions: [
      {
        id: 'f15-rd-ap-reverse-osmosis-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'What is the passage mainly about?',
        options: [
          'Why seawater is unsafe for people to drink',
          'The history of desalination in dry regions',
          'How reverse osmosis works and its problems',
          'Ways to reduce the electricity used by pumps',
        ],
        answer: [2],
        explanation:
          'Tras presentar la desalinización, el texto explica el proceso ("engineers reverse this flow"), el pretratamiento y los inconvenientes ("Reverse osmosis also has drawbacks"). El ahorro de electricidad es solo un detalle del último párrafo.',
      },
      {
        id: 'f15-rd-ap-reverse-osmosis-q2',
        kind: 'single',
        skill: 'detail',
        paragraph: 1,
        prompt: 'According to paragraph 2, what happens inside a desalination plant?',
        options: [
          'Pressure forces water through a membrane, leaving salt behind.',
          'Water flows naturally from the less salty side to the saltier side.',
          'Salt passes through the membrane more quickly than water does.',
          'Seawater is heated until the water turns into steam.',
        ],
        answer: [0],
        explanation:
          'Las bombas presionan el agua de mar "forcing water molecules through it while leaving most of the salt behind". El flujo natural hacia el lado más salado es la ósmosis ordinaria, que la planta invierte ("engineers reverse this flow").',
      },
      {
        id: 'f15-rd-ap-reverse-osmosis-q3',
        kind: 'single',
        skill: 'vocabulary',
        paragraph: 2,
        highlight: 'clog',
        prompt: 'The word "clog" in paragraph 3 is closest in meaning to',
        options: ['damage', 'stretch', 'clean', 'block'],
        answer: [3],
        explanation:
          '"Clog" significa obstruir: la arena y las partículas taparían los "microscopic pores". "Damage" tienta porque las membranas son "delicate", pero el texto habla de tapar los poros, no de romperlos.',
      },
      {
        id: 'f15-rd-ap-reverse-osmosis-q4',
        kind: 'single',
        skill: 'inference',
        paragraph: 2,
        prompt: 'What can be inferred from paragraph 3 about water that has just passed through the membranes?',
        options: [
          'It still contains too much salt to be drunk.',
          'It could harm pipes if it were not treated.',
          'It is mixed with brine before reaching homes.',
          'It has a stronger taste than normal tap water.',
        ],
        answer: [1],
        explanation:
          'Se añaden minerales "to protect the pipes that carry it to homes", lo que implica que el agua sin minerales podría dañarlas. No está demasiado salada: el problema es que "contains almost no minerals".',
      },
      {
        id: 'f15-rd-ap-reverse-osmosis-q5',
        kind: 'single',
        skill: 'negative-factual',
        paragraph: 3,
        prompt:
          'According to paragraph 4, all of the following are ways engineers reduce the drawbacks of reverse osmosis EXCEPT',
        options: [
          'recovering energy from the pressurized waste stream',
          'releasing brine through diffusers over a wide area',
          'sending the brine through the membranes a second time',
          'diluting the brine before it is discharged',
        ],
        answer: [2],
        explanation:
          'El párrafo menciona recuperar energía ("recover part of this energy"), diluir la salmuera ("dilute the brine") y los difusores ("diffusers that spread it over a wide area"). Nunca dice que la salmuera vuelva a pasar por las membranas.',
      },
    ],
  },
  {
    id: 'f15-rd-ap-yellowstone-wolves',
    form: 15,
    section: 'reading',
    task: 'academic-passage',
    title: 'Wolves and Trophic Cascades',
    topic: 'environment',
    difficulty: 'hard',
    paragraphs: [
      'In ecology, a keystone species is one whose influence on its ecosystem is far greater than its abundance would suggest. The term was introduced in the late 1960s by the zoologist Robert Paine, who removed a predatory sea star from stretches of rocky shoreline in Washington State. Without the predator, mussels multiplied and crowded out many other species, and the diversity of the community dropped sharply. Like the central stone in an arch, the sea star had been holding the system together.',
      'Predators such as the sea star can shape ecosystems through what is known as a trophic cascade, a chain of effects that passes down through the levels of a food web. When a top predator reduces the number of herbivores, or changes where and how they feed, the plants those herbivores eat may recover, and that recovery can in turn affect many other organisms.',
      'The best-known example comes from Yellowstone National Park. By the 1920s, government programs had eliminated gray wolves from the park, and over the following decades elk populations grew large. Heavy browsing by elk prevented young willow and aspen trees from growing tall, particularly along streams. In 1995 and 1996, biologists released 31 wolves captured in Canada. Elk numbers subsequently declined, and in some areas willows began to grow again. Researchers reported more beaver colonies, which depend on willows for food and building material, and beaver dams created ponds that benefited fish, amphibians, and birds.',
      'However, the Yellowstone story is more complicated than popular accounts suggest. Some ecologists argue that the recovery of plants has been patchy and that other factors, such as drought, hunting by humans outside the park, and growing numbers of bears and cougars, also reduced elk populations. Others question the idea that elk avoided risky areas out of fear of wolves. Most researchers agree that wolves have mattered, but they caution that a cascade rarely follows a single, simple chain of cause and effect.',
    ],
    questions: [
      {
        id: 'f15-rd-ap-yellowstone-wolves-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'Which of the following best expresses the main idea of the passage?',
        options: [
          'Top predators can reshape ecosystems, though the effects are often complex.',
          'Wolves were removed from Yellowstone because they threatened the elk herds.',
          'Sea stars play a larger role in their ecosystems than wolves do in theirs.',
          'Plant recovery in Yellowstone was caused entirely by the work of beavers.',
        ],
        answer: [0],
        explanation:
          'El texto define las especies clave y la cascada trófica, la ilustra con Yellowstone y termina matizando: "a cascade rarely follows a single, simple chain of cause and effect". Ninguna parte compara la importancia de estrellas de mar y lobos.',
      },
      {
        id: 'f15-rd-ap-yellowstone-wolves-q2',
        kind: 'single',
        skill: 'detail',
        paragraph: 0,
        prompt: 'According to paragraph 1, what happened after Paine removed the sea star?',
        options: [
          'Other predators moved in to take its place.',
          'The number of mussels fell sharply.',
          'Mussels spread and pushed out other species.',
          'The shoreline community became more diverse.',
        ],
        answer: [2],
        explanation:
          '"Without the predator, mussels multiplied and crowded out many other species". Lo que cayó fue la diversidad ("the diversity of the community dropped sharply"), no el número de mejillones.',
      },
      {
        id: 'f15-rd-ap-yellowstone-wolves-q3',
        kind: 'single',
        skill: 'vocabulary',
        paragraph: 3,
        highlight: 'patchy',
        prompt: 'The word "patchy" in paragraph 4 is closest in meaning to',
        options: ['rapid', 'uneven', 'temporary', 'unexpected'],
        answer: [1],
        explanation:
          '"Patchy" significa irregular, por zonas: concuerda con el párrafo 3, donde los sauces volvieron a crecer solo "in some areas". "Temporary" alude al tiempo, no a la distribución desigual.',
      },
      {
        id: 'f15-rd-ap-yellowstone-wolves-q4',
        kind: 'single',
        skill: 'inference',
        paragraph: 2,
        prompt: 'What can be inferred from paragraph 3 about beavers in Yellowstone before the wolves returned?',
        options: [
          'They competed with elk for the same grasses.',
          'They were hunted by the wolves from Canada.',
          'They were removed by government programs.',
          'They were limited by a shortage of willows.',
        ],
        answer: [3],
        explanation:
          'Los castores "depend on willows for food and building material" y hubo más colonias cuando los sauces se recuperaron; antes, el ramoneo de los alces impedía que crecieran. Los programas del gobierno eliminaron lobos, no castores.',
      },
      {
        id: 'f15-rd-ap-yellowstone-wolves-q5',
        kind: 'single',
        skill: 'paragraph-relation',
        paragraph: 3,
        prompt: 'How does paragraph 4 relate to paragraph 3?',
        options: [
          'It qualifies the example by pointing to other possible causes.',
          'It gives more evidence that wolves alone restored the plants.',
          'It describes a later study that repeated the results of Paine.',
          'It explains the reasons why wolves were removed from the park.',
        ],
        answer: [0],
        explanation:
          'El párrafo 4 empieza con "However" y añade otros factores ("drought, hunting by humans outside the park… bears and cougars"), con lo que matiza el ejemplo. Afirma lo contrario de que los lobos actuaran solos.',
      },
    ],
  },
  {
    id: 'f15-rd-ap-strange-situation',
    form: 15,
    section: 'reading',
    task: 'academic-passage',
    title: "Ainsworth's Strange Situation",
    topic: 'psychology',
    difficulty: 'hard',
    paragraphs: [
      "Why do infants become so distressed when they are separated from their parents? In the 1950s and 1960s, the British psychiatrist John Bowlby proposed an answer that became known as attachment theory. Bowlby argued that human infants are born with a tendency to stay close to a caregiver, a behavior that would have protected them from danger throughout human evolution. In his view, a reliable caregiver serves as a secure base from which a child can explore the world and to which the child can return when frightened.",
      'Bowlby\'s ideas were difficult to test until the American-Canadian psychologist Mary Ainsworth designed a laboratory procedure called the Strange Situation. In a series of short episodes lasting about twenty minutes in total, a one-year-old child is observed in an unfamiliar playroom with the mother, with a friendly stranger, and briefly alone. The mother leaves the room twice and returns twice. Ainsworth concluded that the most revealing moments were not the separations themselves but the reunions: how the child behaved when the mother came back.',
      "Based on these observations, Ainsworth described three main patterns. Securely attached infants, the majority in her samples, might cry when the mother left but greeted her warmly on her return, were quickly comforted, and went back to playing. Insecure-avoidant infants showed little distress at separation and tended to ignore or turn away from the mother when she returned. Insecure-resistant infants were extremely upset by the separation, yet on reunion they mixed clinging with angry resistance and were difficult to soothe. Later researchers added a fourth, disorganized category for infants who showed confused or contradictory behavior. Ainsworth's home observations suggested that mothers who responded sensitively and consistently to their babies' signals were more likely to have securely attached children.",
      "The Strange Situation became one of the most widely used tools in developmental psychology, but it has also drawn criticism. Studies in other countries found different distributions of the patterns. In some Japanese samples, for example, resistant behavior was more common, possibly because infants there were rarely separated from their mothers and found the procedure unusually stressful. Critics have also argued that a child's inborn temperament, and not only the caregiver's behavior, may influence how the child responds in the laboratory.",
    ],
    questions: [
      {
        id: 'f15-rd-ap-strange-situation-q1',
        kind: 'single',
        skill: 'organization',
        prompt: 'Which of the following best describes the organization of the passage?',
        options: [
          'Two rival theories are compared, and one of them is rejected.',
          'A problem is described, and several solutions are evaluated.',
          'Several experiments are listed in the order they took place.',
          'A theory is introduced, followed by a test and its limits.',
        ],
        answer: [3],
        explanation:
          'Párrafo 1: la teoría de Bowlby; párrafo 2: el procedimiento de Ainsworth para comprobarla ("Bowlby\'s ideas were difficult to test until…"); párrafo 3: los resultados; párrafo 4: las críticas ("it has also drawn criticism"). No se comparan dos teorías rivales.',
      },
      {
        id: 'f15-rd-ap-strange-situation-q2',
        kind: 'single',
        skill: 'detail',
        paragraph: 1,
        prompt: 'According to paragraph 2, which part of the procedure did Ainsworth consider most informative?',
        options: [
          "The child's first reaction to the playroom",
          "The child's behavior when the mother returned",
          'The moment when the mother left the child',
          "The child's response to the friendly stranger",
        ],
        answer: [1],
        explanation:
          'Ainsworth concluyó que lo más revelador "were not the separations themselves but the reunions: how the child behaved when the mother came back". La salida de la madre es justamente lo que el texto descarta.',
      },
      {
        id: 'f15-rd-ap-strange-situation-q3',
        kind: 'single',
        skill: 'vocabulary',
        paragraph: 2,
        highlight: 'soothe',
        prompt: 'The word "soothe" in paragraph 3 is closest in meaning to',
        options: ['feed', 'separate', 'calm', 'understand'],
        answer: [2],
        explanation:
          '"Soothe" significa calmar o consolar: los bebés resistentes estaban muy alterados y eran "difficult to soothe", al contrario que los seguros, que "were quickly comforted".',
      },
      {
        id: 'f15-rd-ap-strange-situation-q4',
        kind: 'single',
        skill: 'inference',
        paragraph: 2,
        prompt:
          'Based on paragraph 3, an infant who barely reacts when the mother leaves and looks away when she returns would most likely be classified as',
        options: ['insecure-avoidant', 'securely attached', 'insecure-resistant', 'disorganized'],
        answer: [0],
        explanation:
          'Los bebés evitativos "showed little distress at separation and tended to ignore or turn away from the mother when she returned". Los resistentes, en cambio, se alteran mucho al separarse.',
      },
      {
        id: 'f15-rd-ap-strange-situation-q5',
        kind: 'single',
        skill: 'purpose',
        paragraph: 3,
        prompt: 'Why does the author mention Japanese samples in paragraph 4?',
        options: [
          'To argue that Japanese mothers respond less sensitively to babies',
          'To show that the procedure cannot be used outside the United States',
          'To explain why a fourth category was later added to the system',
          'To suggest that results may vary from one culture to another',
        ],
        answer: [3],
        explanation:
          'El ejemplo japonés ilustra que "Studies in other countries found different distributions", quizá porque esos bebés "found the procedure unusually stressful". El texto no culpa a las madres ni dice que el método no sirva fuera de EE. UU.',
      },
    ],
  },
];
