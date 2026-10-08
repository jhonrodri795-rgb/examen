import type { CompleteWordsSet } from '../../types';

/**
 * Complete the Words (Reading, formato 2026).
 * La primera frase queda intacta; en las siguientes se elimina la segunda mitad
 * de palabras alternas. Sintaxis de hueco: {{prefijo|letras-que-faltan}}.
 */
export const sets: CompleteWordsSet[] = [
  {
    id: 'rd-cw-bees',
    section: 'reading',
    task: 'complete-words',
    title: 'Bees and Flowers',
    topic: 'biology',
    difficulty: 'easy',
    text:
      'Many flowering plants depend on insects to reproduce. When a bee {{vis|its}} a flower, it {{coll|ects}} sweet nectar {{f|or}} food. At {{t|he}} same time, {{ti|ny}} grains of {{pol|len}} stick to {{i|ts}} body. When {{t|he}} bee flies {{t|o}} another flower, {{so|me}} of this pollen falls off and fertilizes the plant.',
    note: 'Fíjate en la concordancia (visits con "a bee") y en las palabras funcionales frecuentes (for, the, to, its).',
  },
  {
    id: 'rd-cw-roman-roads',
    section: 'reading',
    task: 'complete-words',
    title: 'Ancient Roads',
    topic: 'history',
    difficulty: 'easy',
    text:
      'The Romans built one of the largest road networks of the ancient world. These roads {{conn|ected}} cities across {{Eur|ope}}, North Africa, {{a|nd}} the Middle {{Ea|st}}. Soldiers used {{th|em}} to move {{qui|ckly}}, and merchants {{car|ried}} goods along {{th|em}} to distant {{mar|kets}}. {{Ma|ny}} modern highways still follow the same routes.',
    note: 'El pasado simple (connected, carried) y el pronombre "them" se repiten para referirse a "roads".',
  },
  {
    id: 'rd-cw-caves',
    section: 'reading',
    task: 'complete-words',
    title: 'How Caves Form',
    topic: 'geology',
    difficulty: 'medium',
    text:
      'Most caves form in limestone, a rock that slowly dissolves in weak acid. Rainwater absorbs {{car|bon}} dioxide from {{t|he}} air and {{fr|om}} the soil, {{beco|ming}} slightly acidic. {{A|s}} this water {{tric|kles}} through cracks {{i|n}} the limestone, {{i|t}} gradually widens {{th|em}} into passages. {{Ov|er}} thousands of years, these passages can grow into enormous chambers.',
    note: '"Carbon dioxide" es una colocación fija; "trickles" (fluye gota a gota) concuerda con "this water".',
  },
  {
    id: 'rd-cw-prices',
    section: 'reading',
    task: 'complete-words',
    title: 'Why Prices Change',
    topic: 'economics',
    difficulty: 'medium',
    text:
      'In a market economy, prices are shaped largely by supply and demand. When {{ma|ny}} people {{wa|nt}} a product {{b|ut}} only a {{lim|ited}} amount is {{avai|lable}}, sellers {{c|an}} charge more. Conversely, {{wh|en}} supply greatly {{exc|eeds}} demand, prices {{te|nd}} to fall. Governments {{some|times}} intervene, but these basic forces remain powerful.',
    note: 'Observa el paralelismo "When… / Conversely, when…" y la colocación "tend to + verbo".',
  },
  {
    id: 'rd-cw-fresco',
    section: 'reading',
    task: 'complete-words',
    title: 'Fresco Painting',
    topic: 'art',
    difficulty: 'medium',
    text:
      'Fresco is a painting technique in which pigments are applied to wet plaster. As the plaster {{dr|ies}}, the colors {{bec|ome}} chemically bound {{t|o}} the wall, {{wh|ich}} makes them {{extr|emely}} durable. However, {{art|ists}} must work {{qui|ckly}}, because only {{sm|all}} sections can {{b|e}} painted before {{t|he}} plaster hardens.',
    note: '"Bound to" exige la preposición "to"; "which" introduce una cláusula relativa no restrictiva.',
  },
  {
    id: 'rd-cw-bridges',
    section: 'reading',
    task: 'complete-words',
    title: 'Bridges',
    topic: 'engineering',
    difficulty: 'easy',
    text:
      'Engineers design bridges to carry heavy loads safely across rivers and valleys. {{Ea|ch}} type of {{bri|dge}} handles weight {{diffe|rently}}. An {{ar|ch}} bridge {{pus|hes}} force {{out|ward}} into its {{supp|orts}}, while a suspension bridge {{ha|ngs}} its deck {{fr|om}} strong {{st|eel}} cables.',
    note: 'Concordancia en tercera persona (pushes, hangs) y adverbio de modo (differently).',
  },
  {
    id: 'rd-cw-memory',
    section: 'reading',
    task: 'complete-words',
    title: 'Reconstructing Memories',
    topic: 'psychology',
    difficulty: 'hard',
    text:
      'Memory does not work like a video recorder that stores events exactly as they happened. Instead, {{ea|ch}} time we {{rec|all}} an experience, {{t|he}} brain partially {{rebu|ilds}} it from {{scat|tered}} fragments. During {{th|is}} process, details {{c|an}} be altered, {{omi|tted}}, or even {{inve|nted}}, often {{wit|hout}} the person noticing.',
    note: 'Serie de participios en voz pasiva (altered, omitted, invented) tras "can be".',
  },
  {
    id: 'rd-cw-batteries',
    section: 'reading',
    task: 'complete-words',
    title: 'Lithium-Ion Batteries',
    topic: 'technology',
    difficulty: 'hard',
    text:
      'Lithium-ion batteries power devices ranging from phones to electric vehicles. Their {{popul|arity}} stems from {{th|eir}} high energy {{den|sity}}, which allows {{la|rge}} amounts of {{ene|rgy}} to be {{sto|red}} in a {{relat|ively}} small space. {{How|ever}}, they degrade {{grad|ually}} with each charging cycle, and extreme temperatures accelerate {{th|is}} decline.',
    note: 'Vocabulario académico: popularity, density, relatively, gradually. "However" marca contraste.',
  },
];
