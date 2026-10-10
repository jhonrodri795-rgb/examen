import type { ReadingSet } from '../../../types';

/** Simulación n.º 5 — Reading (contenido original). */
export const sets: ReadingSet[] = [
  // ---------- Complete the Words ----------
  {
    id: 'f05-rd-cw-composting',
    form: 5,
    section: 'reading',
    task: 'complete-words',
    title: 'From Food Scraps to Soil',
    topic: 'environment',
    difficulty: 'easy',
    text:
      'Composting is a simple way to turn food scraps into rich, dark soil. Inside a {{com|post}} pile, {{ti|ny}} organisms {{su|ch}} as {{bact|eria}} and {{fu|ngi}} break {{do|wn}} peels, {{lea|ves}}, and {{cof|fee}} grounds. These {{orga|nisms}} need {{oxy|gen}} and moisture to work efficiently, so gardeners turn the pile regularly and keep it damp. As the material decomposes, the pile becomes warm, which speeds up the process. After a few months, the scraps become a crumbly substance called humus. Adding humus to a garden supplies plants with nutrients and helps the soil hold water.',
    note: '«Such as» introduce ejemplos (bacteria and fungi); «break down» es un phrasal verb que significa «descomponer». El contexto del compost ayuda con «oxygen» y «moisture».',
  },
  {
    id: 'f05-rd-cw-mere-exposure',
    form: 5,
    section: 'reading',
    task: 'complete-words',
    title: 'Why Familiar Things Appeal',
    topic: 'psychology',
    difficulty: 'medium',
    text:
      'The mere exposure effect is the tendency to like things more simply because we have encountered them before. In a classic {{ser|ies}} of {{exper|iments}}, participants {{vie|wed}} unfamiliar {{sym|bols}}, faces, {{o|r}} words {{diff|erent}} numbers {{o|f}} times. Later, {{th|ey}} usually {{ra|ted}} the {{it|ems}} they had seen most often as more pleasant, even when they could not remember seeing them. Psychologists suggest that familiar stimuli are easier for the brain to process, and this ease feels positive. The effect helps explain why a song often grows on listeners after several plays. However, the effect weakens with excessive repetition, which can eventually lead to boredom.',
    note: '«A series of» va seguido de sustantivo plural (experiments). El pasado simple (viewed, rated) narra el experimento, y «different numbers of times» significa «un número distinto de veces».',
  },
  {
    id: 'f05-rd-cw-price-elasticity',
    form: 5,
    section: 'reading',
    task: 'complete-words',
    title: 'Elastic and Inelastic Demand',
    topic: 'economics',
    difficulty: 'hard',
    text:
      'Price elasticity of demand measures how strongly the quantity that consumers buy responds to a change in price. When demand is {{ela|stic}}, even a {{sli|ght}} price {{incr|ease}} causes {{purc|hases}} to {{fa|ll}} substantially, {{usu|ally}} because {{shop|pers}} can {{swi|tch}} to {{compa|rable}} substitutes. In {{cont|rast}}, demand for necessities such as gasoline, electricity, or prescription medicine tends to be inelastic. Consumers continue purchasing these goods because they have few alternatives and cannot easily postpone consumption. Economists also observe that elasticity grows over longer periods, as households gradually find substitutes. Consequently, governments often tax inelastic goods, knowing that revenue will remain relatively stable.',
    note: 'Fíjate en el contraste «elastic / inelastic» y en el conector «In contrast». «Switch to» (cambiarse a) y «comparable substitutes» (sustitutos comparables) son colocaciones típicas de economía.',
  },

  // ---------- Read in Daily Life ----------
  {
    id: 'f05-rd-dl-moving-sale',
    form: 5,
    section: 'reading',
    task: 'daily-life',
    genre: 'advertisement',
    title: 'Graduation Moving Sale',
    topic: 'campus-life',
    difficulty: 'easy',
    header: ['FOR SALE — Graduating Senior Moving Out'],
    text:
      "I'm graduating in May and need to sell a few things before I leave campus:\n\n• Blue mountain bike, two years old, new tires — $90\n• Adjustable desk lamp with LED bulb — $10\n• Mini-fridge, perfect for a dorm room — $45\n\nBuy all three for $130! Everything works well. You can see the items in Carter Hall, Room 312, any weekday after 5 p.m. Cash or mobile payment only. All items must be picked up by May 20. Text Maya at 555-0148.",
    questions: [
      {
        id: 'f05-rd-dl-moving-sale-q1',
        kind: 'single',
        skill: 'inference',
        prompt: 'How much money would a buyer save by purchasing all three items together?',
        options: ['$5', '$10', '$15', '$45'],
        answer: [2],
        explanation:
          'Por separado cuestan $90 + $10 + $45 = $145; el anuncio dice "Buy all three for $130", así que el ahorro es de $15. $45 es el precio del "mini-fridge", no el ahorro.',
      },
      {
        id: 'f05-rd-dl-moving-sale-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'What does the advertisement say about collecting the items?',
        options: [
          'Buyers must pick them up by May 20.',
          'They can be seen on weekend mornings.',
          'Maya will deliver them to any dorm.',
          'Buyers must call before 5 p.m.',
        ],
        answer: [0],
        explanation:
          'El texto indica "All items must be picked up by May 20". Se pueden ver "any weekday after 5 p.m.", no los fines de semana, y no se menciona ninguna entrega a domicilio.',
      },
    ],
  },
  {
    id: 'f05-rd-dl-hotel-id',
    form: 5,
    section: 'reading',
    task: 'daily-life',
    genre: 'memo',
    title: 'Guest ID Check-In Rules',
    topic: 'daily-life',
    difficulty: 'easy',
    header: ['MEMO', 'To: Front Desk Staff', 'From: Daniel Ortiz, Hotel Manager', 'Subject: New ID rules at check-in'],
    text:
      'Starting Monday, March 10, every adult guest staying in a room must show a valid photo ID at check-in, not just the person who made the reservation. Please scan each ID and attach it to the booking in our system. If a guest cannot provide an ID, do not refuse the room yourself; instead, politely direct the guest to the duty manager. A short training video on the new procedure is available on the staff portal. Please watch it before your next shift.',
    questions: [
      {
        id: 'f05-rd-dl-hotel-id-q1',
        kind: 'single',
        skill: 'purpose',
        prompt: 'What is the main purpose of the memo?',
        options: [
          'To announce new training shifts for staff',
          'To explain a change to check-in procedures',
          'To ask staff to update the booking system',
          'To apologize to guests for longer check-ins',
        ],
        answer: [1],
        explanation:
          'El memo informa de que, desde el 10 de marzo, "every adult guest… must show a valid photo ID at check-in": es un cambio en el procedimiento de registro. El vídeo de formación es solo un detalle, no el propósito principal.',
      },
      {
        id: 'f05-rd-dl-hotel-id-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'What should a front-desk employee do if a guest has no ID?',
        options: [
          'Refuse to give the guest a room',
          'Scan the reservation instead of an ID',
          'Show the guest the training video',
          'Send the guest to the duty manager',
        ],
        answer: [3],
        explanation:
          'El memo dice "do not refuse the room yourself; instead, politely direct the guest to the duty manager". La opción de negar la habitación es justo lo que el texto prohíbe.',
      },
    ],
  },
  {
    id: 'f05-rd-dl-market-faq',
    form: 5,
    section: 'reading',
    task: 'daily-life',
    genre: 'webpage',
    title: 'Farmers’ Market FAQ',
    topic: 'daily-life',
    difficulty: 'medium',
    header: ['Millbrook Farmers’ Market — Frequently Asked Questions'],
    text:
      'When is the market open?\nEvery Saturday from 8 a.m. to 1 p.m., April through November. From December to March, the market moves indoors to the Community Center and closes at noon.\n\nWhere can I park?\nFree parking is available in the library lot on Elm Street. The lot next to the market is reserved for vendors until 1:30 p.m. Bicycle racks are located at the main entrance.\n\nWhat payment methods are accepted?\nMost vendors take both cash and credit cards. However, a few small farms accept cash only, so we recommend bringing some. You can also buy market tokens with a debit card at the information tent and spend them at any stall.',
    questions: [
      {
        id: 'f05-rd-dl-market-faq-q1',
        kind: 'single',
        skill: 'detail',
        prompt: 'At what time does the market close in January?',
        options: ['At 1 p.m.', 'At 1:30 p.m.', 'It does not open in January.', 'At noon'],
        answer: [3],
        explanation:
          'Enero está dentro del periodo "From December to March", cuando el mercado se traslada al Community Center y "closes at noon". La 1 p.m. es el horario de abril a noviembre.',
      },
      {
        id: 'f05-rd-dl-market-faq-q2',
        kind: 'single',
        skill: 'inference',
        prompt: 'What can be inferred about the parking lot next to the market?',
        options: [
          'Shoppers cannot park there during market hours.',
          'Drivers must pay a fee to park there on Saturdays.',
          'It is located on Elm Street near the library.',
          'It is open to the public only in winter.',
        ],
        answer: [0],
        explanation:
          'Ese aparcamiento está "reserved for vendors until 1:30 p.m.", y el mercado cierra a la 1 p.m. o antes, así que los compradores no pueden usarlo mientras el mercado está abierto. El de Elm Street es otro aparcamiento (el de la biblioteca).',
      },
      {
        id: 'f05-rd-dl-market-faq-q3',
        kind: 'single',
        skill: 'purpose',
        prompt: 'Why does the page mention that a few small farms accept cash only?',
        options: [
          'To encourage shoppers to use the bike racks',
          'To explain where the ATM is located',
          'To explain why shoppers should bring cash',
          'To warn that credit cards are not accepted',
        ],
        answer: [2],
        explanation:
          'La página dice que algunas granjas "accept cash only, so we recommend bringing some": la mención justifica la recomendación de llevar efectivo. No dice que no se acepten tarjetas en general ("Most vendors take both cash and credit cards").',
      },
    ],
  },
  {
    id: 'f05-rd-dl-diner-menu',
    form: 5,
    section: 'reading',
    task: 'daily-life',
    genre: 'menu',
    title: 'Maple Street Diner Menu',
    topic: 'daily-life',
    difficulty: 'medium',
    header: ['MAPLE STREET DINER — Breakfast Served All Day'],
    text:
      'BREAKFAST\nTwo Eggs Any Style, with toast and home fries — $8.50\nButtermilk Pancakes (stack of three) — $7.95\nVeggie Omelet, with toast and home fries — $10.25\nFrench Toast with fresh berries — $9.50\n\nWEEKDAY SPECIALS (Monday–Friday, 11 a.m.–3 p.m.)\nMonday: Chicken Noodle Soup and Half Sandwich — $9.00\nWednesday: Meatloaf with Mashed Potatoes — $11.50\nFriday: Fish Tacos (two) — $10.00\n\nSUBSTITUTIONS\nFruit cup instead of home fries — add $1.50\nEgg whites instead of whole eggs — add $1.00\nGluten-free toast — add $2.00\nSwap toast for an English muffin — no charge\nPlease note: weekday specials cannot be modified.',
    questions: [
      {
        id: 'f05-rd-dl-diner-menu-q1',
        kind: 'single',
        skill: 'detail',
        prompt: 'How much would a customer pay for a veggie omelet with a fruit cup instead of home fries?',
        options: ['$10.25', '$11.25', '$11.75', '$12.25'],
        answer: [2],
        explanation:
          'La tortilla ("Veggie Omelet") cuesta $10.25 y cambiar las patatas por fruta ("Fruit cup instead of home fries") cuesta $1.50 más: total $11.75. $10.25 es el precio sin el cambio.',
      },
      {
        id: 'f05-rd-dl-diner-menu-q2',
        kind: 'single',
        skill: 'inference',
        prompt: 'What can be inferred about a customer who arrives on a Saturday at noon?',
        options: [
          'The customer can order the fish tacos special.',
          'The customer can order breakfast but no specials.',
          'The customer will pay extra for any breakfast items.',
          'The customer can change the meatloaf at no cost.',
        ],
        answer: [1],
        explanation:
          'El desayuno se sirve "All Day", pero los especiales son "Monday–Friday" solamente, así que un sábado no hay especiales. Los "Fish Tacos" son el especial del viernes.',
      },
      {
        id: 'f05-rd-dl-diner-menu-q3',
        kind: 'single',
        skill: 'detail',
        prompt: 'Which change can a customer make without paying more?',
        options: [
          'Replacing toast with an English muffin',
          'Choosing gluten-free toast',
          'Ordering egg whites instead of whole eggs',
          'Changing the side dish of a weekday special',
        ],
        answer: [0],
        explanation:
          'Solo "Swap toast for an English muffin" aparece con "no charge". El pan sin gluten y las claras tienen recargo, y los especiales "cannot be modified".',
      },
    ],
  },
  {
    id: 'f05-rd-dl-scholarship-hold',
    form: 5,
    section: 'reading',
    task: 'daily-life',
    genre: 'email',
    title: 'Scholarship Renewal on Hold',
    topic: 'campus-life',
    difficulty: 'hard',
    header: [
      'From: Office of Scholarships and Financial Aid',
      'To: Priya Nair',
      'Subject: Scholarship renewal on hold — action required',
    ],
    text:
      "Dear Priya,\n\nYour renewal of the Dean's Merit Scholarship for the fall semester is currently on hold. Recipients must complete at least 24 credits per academic year with a cumulative GPA of 3.0 or higher. Our records show only 21 completed credits because your Statistics grade is still listed as Incomplete.\n\nTo release the hold, please submit the following by July 15:\n1. A completion form signed by your Statistics instructor, or an updated transcript showing the final grade.\n2. An academic plan approved by your advisor — required only if your GPA falls below 3.0 once the grade is posted.\n\nIf your documents arrive after July 15, your award may be reduced for the fall semester, although it can be restored in spring. Please upload all files through the student portal; emailed attachments cannot be accepted.\n\nSincerely,\nOffice of Scholarships and Financial Aid",
    questions: [
      {
        id: 'f05-rd-dl-scholarship-hold-q1',
        kind: 'single',
        skill: 'detail',
        prompt: "Why is Priya's scholarship renewal on hold?",
        options: [
          'Her cumulative GPA has recently dropped below 3.0.',
          'An incomplete course leaves her short of credits.',
          'She has not yet met with her academic advisor.',
          'She sent her documents as email attachments.',
        ],
        answer: [1],
        explanation:
          'El correo explica que solo tiene "21 completed credits" (se exigen 24) "because your Statistics grade is still listed as Incomplete". El GPA bajo es solo una posibilidad futura, no la causa actual.',
      },
      {
        id: 'f05-rd-dl-scholarship-hold-q2',
        kind: 'single',
        skill: 'detail',
        prompt: 'When must Priya submit an academic plan?',
        options: [
          'In every case, together with the completion form',
          'Only if her instructor refuses to sign the form',
          'Only if she wants the award restored in spring',
          'Only if her new grade brings her GPA below 3.0',
        ],
        answer: [3],
        explanation:
          'El plan académico es "required only if your GPA falls below 3.0 once the grade is posted". No es obligatorio en todos los casos, y la restauración en primavera se refiere a los envíos tardíos.',
      },
      {
        id: 'f05-rd-dl-scholarship-hold-q3',
        kind: 'single',
        skill: 'inference',
        prompt: 'What would most likely happen if Priya uploaded the documents on July 20?',
        options: [
          'She would lose the scholarship permanently.',
          'She would have to repeat the Statistics course.',
          'She might receive a smaller award in the fall.',
          'She would need to send the files by email.',
        ],
        answer: [2],
        explanation:
          'Si los documentos llegan después del 15 de julio, "your award may be reduced for the fall semester, although it can be restored in spring". Por eso no lo perdería para siempre.',
      },
    ],
  },

  // ---------- Read an Academic Passage ----------
  {
    id: 'f05-rd-ap-socialization',
    form: 5,
    section: 'reading',
    task: 'academic-passage',
    title: 'How Children Learn Social Norms',
    topic: 'sociology',
    difficulty: 'easy',
    paragraphs: [
      'Every society has social norms, the shared and often unwritten rules that tell people how to behave in particular situations. Children are not born knowing these rules. Instead, they acquire them through socialization, the lifelong process by which individuals learn the values, habits, and expectations of their culture. Sociologists describe several agents of socialization, and three of the most influential in childhood are the family, the school, and the peer group.',
      'The family is usually the first and most powerful agent. Long before children can speak, they watch how their parents greet visitors, share food, and settle disagreements. Parents also teach norms directly, for example by reminding a child to say "thank you" or to wait for a turn. Because these early lessons are repeated every day and are tied to strong emotional bonds, they often last a lifetime.',
      'When children start school, they encounter a wider set of expectations. Teachers reward punctuality, quiet attention, and cooperation, and they apply the same rules to every student in the class. Sociologists use the term "hidden curriculum" to describe these lessons, which do not appear in any official syllabus but prepare children for life in large organizations such as workplaces.',
      'Peers, or friends of a similar age, become increasingly important as children grow older. Unlike parents and teachers, peers interact as equals, so children must negotiate rules among themselves. Peer groups influence everything from clothing and music to the words children use, and sometimes they encourage behavior that adults would not approve of. Socialization, therefore, is not a simple transfer of rules from adults to children but an active process shaped by several sources at once.',
    ],
    questions: [
      {
        id: 'f05-rd-ap-socialization-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'What is the passage mainly about?',
        options: [
          'How children learn social rules from different groups in their lives',
          'Why parents have more influence on children than teachers or friends do',
          'How schools design the official subjects that children study',
          'Why peer groups often lead children to break social rules',
        ],
        answer: [0],
        explanation:
          'El pasaje define la socialización y presenta "three of the most influential" agentes (familia, escuela y compañeros), uno por párrafo. La opción sobre los compañeros que rompen reglas es solo un detalle del párrafo 4.',
      },
      {
        id: 'f05-rd-ap-socialization-q2',
        kind: 'single',
        skill: 'detail',
        paragraph: 1,
        prompt: 'According to paragraph 2, why do lessons learned in the family often last a lifetime?',
        options: [
          'Parents write the rules down for their children.',
          'Teachers repeat the same rules later at school.',
          'They are repeated daily and tied to strong emotions.',
          'Children learn them only after they are able to speak.',
        ],
        answer: [2],
        explanation:
          'El párrafo 2 dice: "Because these early lessons are repeated every day and are tied to strong emotional bonds, they often last a lifetime". Además, el aprendizaje empieza "Long before children can speak", lo que descarta la última opción.',
      },
      {
        id: 'f05-rd-ap-socialization-q3',
        kind: 'single',
        skill: 'vocabulary',
        paragraph: 2,
        highlight: 'encounter',
        prompt: 'The word "encounter" in paragraph 3 is closest in meaning to',
        options: ['stay away from', 'come across', 'create', 'remember'],
        answer: [1],
        explanation:
          '"Encounter" significa «encontrarse con»: al empezar la escuela, los niños se topan con ("come across") nuevas expectativas. "Create" no encaja porque son los profesores quienes fijan esas reglas.',
      },
      {
        id: 'f05-rd-ap-socialization-q4',
        kind: 'single',
        skill: 'inference',
        paragraph: 2,
        prompt: 'What can be inferred about the "hidden curriculum" from paragraph 3?',
        options: [
          'It is published by schools so that parents can review it.',
          'It matters mainly for students who plan to become teachers.',
          'It replaces the official subjects that schools teach.',
          'It is learned through daily classroom routines.',
        ],
        answer: [3],
        explanation:
          'Estas lecciones "do not appear in any official syllabus" y se transmiten cuando los profesores "reward punctuality, quiet attention, and cooperation"; se aprenden, pues, con la rutina diaria. El texto no dice que sustituyan a las asignaturas oficiales.',
      },
      {
        id: 'f05-rd-ap-socialization-q5',
        kind: 'single',
        skill: 'negative-factual',
        paragraph: 3,
        prompt: 'According to paragraph 4, all of the following are true of peer groups EXCEPT:',
        options: [
          'Their members interact with one another as equals.',
          'They can influence the words that children use.',
          'They sometimes encourage behavior adults dislike.',
          'They usually enforce the same rules as teachers.',
        ],
        answer: [3],
        explanation:
          'El párrafo 4 contrapone a los compañeros con padres y profesores ("Unlike parents and teachers, peers interact as equals") y dice que los niños negocian sus propias reglas; nunca afirma que impongan las reglas de los profesores. Las otras tres opciones sí aparecen en el texto.',
      },
    ],
  },
  {
    id: 'f05-rd-ap-stained-glass',
    form: 5,
    section: 'reading',
    task: 'academic-passage',
    title: 'Gothic Stained-Glass Windows',
    topic: 'art',
    difficulty: 'medium',
    paragraphs: [
      'During the twelfth and thirteenth centuries, builders in northern France developed a new style of church architecture that later became known as Gothic. Earlier Romanesque churches had thick walls with small windows, because their heavy stone roofs required massive support. Gothic architects solved this problem with pointed arches, ribbed vaults, and flying buttresses, which are external supports that carry the weight of the roof away from the walls. Freed from much of their load-bearing role, the walls could be opened up with enormous windows, and these windows were filled with stained glass.',
      'Stained glass was produced by adding metallic compounds to molten glass. Cobalt, for instance, created a deep blue, while copper could give a rich red or green. Craftsmen cut the colored sheets into small pieces and joined them with strips of lead, a soft metal that could be bent around curves. Fine details, such as facial features and the folds of clothing, were painted onto the glass with a dark paint and then fixed permanently by firing the pieces in a kiln.',
      'The windows were not merely decorative. Most people in medieval Europe could not read, and the windows presented familiar stories from the Bible and the lives of saints in a series of panels, much like a modern comic strip. Viewers usually followed these panels from the bottom upward, scene by scene. Some windows were paid for by local guilds, such as those of bakers or shoemakers, and these donors were sometimes shown at work in the lowest panels.',
      'The windows served a spiritual purpose as well. Abbot Suger, who rebuilt the abbey church of Saint-Denis near Paris in the 1140s, believed that beautiful light could lift the mind toward God. As sunlight passed through the glass, it filled the interior with shifting patches of color that changed throughout the day. For worshippers, this glowing light made the church feel like a vision of heaven on earth.',
    ],
    questions: [
      {
        id: 'f05-rd-ap-stained-glass-q1',
        kind: 'single',
        skill: 'detail',
        paragraph: 0,
        prompt: 'According to paragraph 1, what made the large windows of Gothic churches possible?',
        options: [
          'Thicker walls that could support heavier panes of glass',
          'Supports that moved the roof’s weight off the walls',
          'Roofs built from lighter materials than stone',
          'Strips of lead that strengthened the walls',
        ],
        answer: [1],
        explanation:
          'Los arbotantes ("flying buttresses") "carry the weight of the roof away from the walls"; así, los muros quedaron "Freed from much of their load-bearing role" y pudieron abrirse. Los muros gruesos eran propios del románico.',
      },
      {
        id: 'f05-rd-ap-stained-glass-q2',
        kind: 'single',
        skill: 'vocabulary',
        paragraph: 1,
        highlight: 'molten',
        prompt: 'The word "molten" in paragraph 2 is closest in meaning to',
        options: ['melted', 'colored', 'broken', 'cooled'],
        answer: [0],
        explanation:
          '"Molten" significa «fundido»: los compuestos metálicos se añadían al vidrio derretido ("melted"). "Colored" es tentador, pero el color es el resultado de añadir los metales, no el significado de la palabra.',
      },
      {
        id: 'f05-rd-ap-stained-glass-q3',
        kind: 'single',
        skill: 'purpose',
        paragraph: 2,
        prompt: 'Why does the author mention "a modern comic strip" in paragraph 3?',
        options: [
          'To argue that medieval artists invented comic strips',
          'To suggest that the windows were made mainly for children',
          'To show how the windows told stories in a sequence of images',
          'To contrast the bright glass with black-and-white printed images',
        ],
        answer: [2],
        explanation:
          'Las vidrieras contaban historias "in a series of panels", que se seguían "scene by scene"; la comparación con un cómic ilustra esa narración en secuencia. El texto no dice que los artistas medievales inventaran el cómic.',
      },
      {
        id: 'f05-rd-ap-stained-glass-q4',
        kind: 'single',
        skill: 'inference',
        paragraph: 2,
        prompt: 'What can be inferred from paragraph 3 about many medieval churchgoers?',
        options: [
          'They read the panels from the top down.',
          'Most of them belonged to bakers’ or shoemakers’ guilds.',
          'They found the stories in the windows unfamiliar.',
          'Many followed the stories through pictures, not texts.',
        ],
        answer: [3],
        explanation:
          'Como "Most people in medieval Europe could not read", seguían las historias de la Biblia a través de las imágenes de las vidrieras, no de textos escritos. Los paneles se leían "from the bottom upward", no de arriba abajo, y las historias eran "familiar".',
      },
      {
        id: 'f05-rd-ap-stained-glass-q5',
        kind: 'single',
        skill: 'organization',
        prompt: 'Which of the following best describes the organization of the passage?',
        options: [
          'It compares Romanesque and Gothic churches in every paragraph.',
          'It explains the windows’ origins, construction, and functions.',
          'It traces the career of one medieval craftsman from training to fame.',
          'It presents two opposing theories about the meaning of stained glass.',
        ],
        answer: [1],
        explanation:
          'El párrafo 1 explica qué hizo posibles los ventanales, el 2 cómo se fabricaba el vidrio y el 3 y el 4 sus funciones narrativa y espiritual. El románico solo aparece en el párrafo 1, como contraste.',
      },
    ],
  },
  {
    id: 'f05-rd-ap-gps-relativity',
    form: 5,
    section: 'reading',
    task: 'academic-passage',
    title: 'GPS Timing and Relativity',
    topic: 'technology',
    difficulty: 'hard',
    paragraphs: [
      'The Global Positioning System (GPS) relies on a constellation of roughly thirty satellites orbiting about 20,200 kilometers above Earth, arranged so that at least four are visible from almost any point on the surface at any time. Each satellite carries extremely precise atomic clocks and continuously broadcasts a signal that includes the exact time the signal was sent and the satellite’s position in orbit. A GPS receiver, such as the one in a smartphone, does not transmit anything back to the satellites; it simply listens.',
      'Because radio signals travel at the speed of light, a receiver can calculate its distance from a satellite by measuring how long the signal took to arrive. Knowing its distance from one satellite places the receiver somewhere on an imaginary sphere centered on that satellite. A technique called trilateration uses distances from three satellites to narrow the possibilities to two points, and usually only one of them lies near Earth’s surface. In practice, however, a fourth satellite is required. The inexpensive quartz clock inside a receiver is far less accurate than an atomic clock, and the fourth measurement allows the receiver to solve for its own clock error as well as its three coordinates.',
      'This timing must be astonishingly precise. A radio signal travels about 30 centimeters in a single nanosecond, so a clock error of just one microsecond would shift the calculated position by roughly 300 meters. For this reason, engineers must account for effects predicted by Einstein’s theories of relativity. According to special relativity, a moving clock runs slow compared with a stationary one; the satellites’ orbital speed of nearly four kilometers per second makes their clocks lose about 7 microseconds per day. General relativity predicts an opposite effect: clocks in a weaker gravitational field run faster, and because the satellites are far from Earth’s mass, their clocks gain about 45 microseconds per day.',
      'Combined, the two effects make a satellite clock run ahead by about 38 microseconds each day. If this drift were ignored, positioning errors would accumulate at a rate of roughly ten kilometers per day, quickly making the system useless for navigation. To prevent this, the satellite clocks are deliberately adjusted before launch to tick slightly slower than identical clocks on the ground, so that once in orbit they keep pace with ground time. Ground stations also monitor the satellites and upload small corrections regularly. GPS is therefore one of the few everyday technologies whose accuracy depends directly on relativity.',
    ],
    questions: [
      {
        id: 'f05-rd-ap-gps-relativity-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'What is the main idea of the passage?',
        options: [
          'GPS receivers keep better time than the atomic clocks carried on satellites.',
          'Satellites must orbit at a fixed height so that they are visible from Earth.',
          'GPS works by timing signals, and its clocks need corrections for relativity.',
          'Scientists first confirmed the theory of relativity by studying GPS errors.',
        ],
        answer: [2],
        explanation:
          'El pasaje explica cómo el receptor calcula su posición midiendo "how long the signal took to arrive" y por qué hay que corregir los relojes según la relatividad. El texto nunca dice que la relatividad se confirmara por primera vez gracias al GPS.',
      },
      {
        id: 'f05-rd-ap-gps-relativity-q2',
        kind: 'single',
        skill: 'detail',
        paragraph: 1,
        prompt: 'According to paragraph 2, why is a fourth satellite needed?',
        options: [
          'To let the receiver correct the error of its own clock',
          'To choose which of two points lies near Earth’s surface',
          'To replace a satellite whose signal has been blocked',
          'To measure the speed at which radio signals travel',
        ],
        answer: [0],
        explanation:
          'El reloj de cuarzo del receptor es poco preciso, y "the fourth measurement allows the receiver to solve for its own clock error". Elegir entre los dos puntos no requiere un cuarto satélite: "usually only one of them lies near Earth’s surface".',
      },
      {
        id: 'f05-rd-ap-gps-relativity-q3',
        kind: 'single',
        skill: 'vocabulary',
        paragraph: 3,
        highlight: 'accumulate',
        prompt: 'The word "accumulate" in paragraph 4 is closest in meaning to',
        options: ['disappear', 'build up', 'vary', 'be detected'],
        answer: [1],
        explanation:
          '"Accumulate" significa «acumularse»: los errores aumentarían ("build up") a razón de unos diez kilómetros por día. "Vary" no recoge la idea de crecimiento continuo.',
      },
      {
        id: 'f05-rd-ap-gps-relativity-q4',
        kind: 'single',
        skill: 'inference',
        paragraph: 2,
        prompt: 'Based on paragraph 3, which factor has the greater effect on satellite clocks?',
        options: [
          'The high orbital speed of the satellites',
          'The poor accuracy of quartz clocks in receivers',
          'The distance a signal travels in one nanosecond',
          'The weaker gravity at the satellites’ altitude',
        ],
        answer: [3],
        explanation:
          'La gravedad más débil hace que los relojes "gain about 45 microseconds per day", mientras que la velocidad orbital solo les hace "lose about 7 microseconds per day"; por tanto, el efecto gravitatorio es mayor. Los relojes de cuarzo están en los receptores, no en los satélites.',
      },
      {
        id: 'f05-rd-ap-gps-relativity-q5',
        kind: 'single',
        skill: 'paragraph-relation',
        paragraph: 3,
        prompt: 'How does paragraph 4 relate to paragraph 3?',
        options: [
          'It gives the net result of those effects and how engineers correct for it.',
          'It challenges the predictions of relativity that are presented in paragraph 3.',
          'It describes a past navigation failure caused by the effects in paragraph 3.',
          'It introduces a third effect that cancels out the two described in paragraph 3.',
        ],
        answer: [0],
        explanation:
          'El párrafo 4 empieza con "Combined, the two effects…" (el resultado neto de 38 microsegundos) y explica que los relojes "are deliberately adjusted before launch". No describe ningún fallo real: "If this drift were ignored" es una hipótesis.',
      },
    ],
  },
  {
    id: 'f05-rd-ap-stellar-remnants',
    form: 5,
    section: 'reading',
    task: 'academic-passage',
    title: 'The Fates of Dying Stars',
    topic: 'astronomy',
    difficulty: 'hard',
    paragraphs: [
      'Stars spend most of their lives fusing hydrogen into helium in their cores, a stage during which the outward pressure produced by fusion balances the inward pull of gravity. When the hydrogen in the core begins to run out, this balance is disturbed, and what happens next depends almost entirely on the star’s mass. Astronomers generally describe three possible outcomes: a white dwarf, a neutron star, or a black hole.',
      'Low- and medium-mass stars, including the Sun, follow the gentlest path. After their core hydrogen is exhausted, they swell into red giants and begin fusing helium into carbon and oxygen. Such stars, however, never become hot enough to fuse carbon. Eventually they shed their outer layers, which drift into space as a glowing cloud called a planetary nebula, a name that is misleading because these clouds have nothing to do with planets. The exposed core remains as a white dwarf, roughly the size of Earth but typically containing about 60 percent of the Sun’s mass. No fusion takes place inside it; instead, it is supported by electron degeneracy pressure, a quantum effect that resists further compression, and it slowly cools over billions of years.',
      'Stars born with more than about eight times the Sun’s mass end far more violently. Their cores fuse progressively heavier elements until they produce iron. Because fusing iron consumes energy instead of releasing energy, the core can no longer support itself, and it collapses in less than a second. The collapse triggers a supernova explosion that can briefly outshine an entire galaxy. If the remaining core contains less than roughly two to three solar masses, electrons and protons are squeezed together to form neutrons, producing a neutron star: an object only about 20 kilometers across but as dense as an atomic nucleus.',
      'If the collapsing core is even more massive, no known force can halt its collapse. Gravity compresses the matter until it forms a black hole, a region where gravity is so strong that not even light can escape. Because black holes emit no light of their own, astronomers detect them indirectly, for example by observing stars that orbit an unseen companion or by measuring X-rays from gas that is heated as it spirals inward. Thus, a star’s initial mass determines whether it ends as a slowly fading ember, a city-sized ball of neutrons, or an invisible pit in space.',
    ],
    questions: [
      {
        id: 'f05-rd-ap-stellar-remnants-q1',
        kind: 'single',
        skill: 'main-idea',
        prompt: 'What is the main idea of the passage?',
        options: [
          'Supernova explosions are the brightest events in the universe.',
          'All stars eventually become black holes once they use up their fuel.',
          'White dwarfs are the most common objects in a galaxy.',
          'A star’s mass determines which of three remnants it leaves behind.',
        ],
        answer: [3],
        explanation:
          'El párrafo 1 afirma que el final "depends almost entirely on the star’s mass" y presenta tres resultados, que luego se explican uno a uno; la última frase lo resume. La opción de que todas acaban como agujeros negros contradice el texto.',
      },
      {
        id: 'f05-rd-ap-stellar-remnants-q2',
        kind: 'single',
        skill: 'detail',
        paragraph: 1,
        prompt: 'According to paragraph 2, what keeps a white dwarf from collapsing further?',
        options: [
          'The fusion of carbon in its core',
          'A quantum effect that resists compression',
          'The outward pressure of helium fusion',
          'The surrounding gas of the planetary nebula',
        ],
        answer: [1],
        explanation:
          'La enana blanca "is supported by electron degeneracy pressure, a quantum effect that resists further compression". El texto aclara que "No fusion takes place inside it", lo que descarta las opciones de fusión.',
      },
      {
        id: 'f05-rd-ap-stellar-remnants-q3',
        kind: 'single',
        skill: 'vocabulary',
        paragraph: 1,
        highlight: 'shed',
        prompt: 'The word "shed" in paragraph 2 is closest in meaning to',
        options: ['cast off', 'heat up', 'draw inward', 'darken'],
        answer: [0],
        explanation:
          '"Shed" significa «desprenderse de»: las capas externas se separan y "drift into space", así que la estrella las expulsa ("cast off"). "Draw inward" expresa lo contrario.',
      },
      {
        id: 'f05-rd-ap-stellar-remnants-q4',
        kind: 'single',
        skill: 'negative-factual',
        paragraph: 2,
        prompt: 'According to paragraph 3, all of the following are true of stars born with more than about eight solar masses EXCEPT:',
        options: [
          'Their cores eventually produce iron.',
          'Their cores collapse extremely quickly.',
          'Their cores stop fusing before carbon.',
          'They can explode as bright supernovae.',
        ],
        answer: [2],
        explanation:
          'El párrafo 3 dice que sus núcleos fusionan "progressively heavier elements until they produce iron", así que no se detienen antes del carbono; eso les ocurre a las estrellas de masa baja y media (párrafo 2). Las demás opciones aparecen en el párrafo 3.',
      },
      {
        id: 'f05-rd-ap-stellar-remnants-q5',
        kind: 'single',
        skill: 'inference',
        prompt: 'Based on the passage, what would most likely happen to a collapsing core of five solar masses?',
        options: [
          'It would become a white dwarf after shedding its outer layers.',
          'It would form a black hole that light cannot escape.',
          'It would form a neutron star about 20 kilometers across.',
          'It would stop collapsing once its electrons and protons merged.',
        ],
        answer: [1],
        explanation:
          'Solo los núcleos con menos de "roughly two to three solar masses" se convierten en estrellas de neutrones; si el núcleo es "even more massive", "no known force can halt its collapse" y se forma un agujero negro. Cinco masas solares supera ese límite.',
      },
    ],
  },
];
