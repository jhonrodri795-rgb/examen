import type { ExamBlueprint, ScoringSpec } from '../blueprint-types';

/**
 * Escalas y curvas de estimación. Las curvas son una aproximación propia de
 * esta aplicación (no publicada por ETS) para convertir proporciones de
 * aciertos en una banda orientativa 1–6.
 */
export const DEFAULT_SCORING: ScoringSpec = {
  bandMin: 1,
  bandMax: 6,
  bandStep: 0.5,
  curves: {
    linear: [[0, 1], [0.2, 1.5], [0.35, 2], [0.45, 2.5], [0.55, 3], [0.65, 3.5], [0.75, 4], [0.83, 4.5], [0.9, 5], [0.95, 5.5], [1, 6]],
    upper: [[0, 3], [0.4, 3.5], [0.55, 4], [0.68, 4.5], [0.8, 5], [0.9, 5.5], [0.96, 6], [1, 6]],
    lower: [[0, 1], [0.25, 1.5], [0.4, 2], [0.55, 2.5], [0.7, 3], [0.82, 3.5], [0.92, 4], [1, 4]],
  },
  writingWeights: { 'build-sentence': 0.3, email: 0.3, 'academic-discussion': 0.4 },
  speakingWeights: { 'listen-repeat': 0.4, interview: 0.6 },
  cefr: [
    { minBand: 6, level: 'C2' },
    { minBand: 5, level: 'C1' },
    { minBand: 4, level: 'B2' },
    { minBand: 3, level: 'B1' },
    { minBand: 2, level: 'A2' },
    { minBand: 1, level: 'A1' },
  ],
  legacyAnchors: [[3.5, 70], [4, 80], [4.5, 90], [5, 100]],
};

/**
 * TOEFL iBT — formato vigente desde el 21 de enero de 2026.
 * Reading y Listening son adaptativos en dos etapas; Writing (12 ítems,
 * ~23 min) y Speaking (11 ítems, ~8 min) son lineales.
 * Los recuentos de Reading/Listening varían en el examen real; aquí se
 * ajustan al banco disponible manteniéndose en el rango publicado.
 */
export const toeflIbt2026: ExamBlueprint = {
  id: 'toefl-ibt-2026',
  name: 'TOEFL iBT (formato 2026)',
  version: '2026.1',
  effectiveFrom: '2026-01-21',
  description:
    'Simulación del formato vigente: Reading y Listening adaptativos (2 módulos), Writing con 3 tareas y Speaking con 2 tareas. Duración aproximada: 85–90 minutos.',
  sourceNotes: [
    'ETS: nuevo formato desde el 21-ene-2026; escala de bandas 1–6 en pasos de 0,5 alineada con el MCER; durante la transición también se informa una puntuación comparable 0–120.',
    'Speaking: Listen and Repeat + Take an Interview, 11 ítems, ~8 min, sin tiempo de preparación.',
    'Writing: Build a Sentence (10) + Write an Email + Academic Discussion, 12 ítems, ~23 min.',
    'Reading/Listening: adaptativos multietapa; las fuentes publicadas difieren en el número exacto de ítems y minutos (≈27–30 min por sección).',
  ],
  sections: [
    {
      id: 'reading',
      title: 'Reading',
      description: 'Complete the Words, Read in Daily Life y Read an Academic Passage. Sección adaptativa en dos módulos.',
      instructions: [
        'La sección tiene dos módulos. El contenido del segundo depende de tu rendimiento en el primero.',
        'Dentro de cada módulo puedes moverte libremente entre preguntas y marcarlas para revisión.',
        'Cuando el tiempo de un módulo se agota, tus respuestas se guardan y pasas automáticamente al siguiente.',
      ],
      navigation: 'free',
      modules: [
        {
          id: 'm1',
          title: 'Módulo 1',
          timeLimitSec: 13 * 60,
          parts: [
            { task: 'complete-words', sets: 1, difficulty: ['medium'] },
            { task: 'daily-life', sets: 2, difficulty: ['easy', 'medium'] },
            { task: 'academic-passage', sets: 1, difficulty: ['medium'] },
          ],
        },
        {
          id: 'm2',
          title: 'Módulo 2',
          timeLimitSec: 14 * 60,
          adaptive: {
            basedOn: 'm1',
            threshold: 0.6,
            upper: [
              { task: 'complete-words', sets: 1, difficulty: ['hard'] },
              { task: 'daily-life', sets: 1, difficulty: ['hard'] },
              { task: 'academic-passage', sets: 2, difficulty: ['hard'] },
            ],
            lower: [
              { task: 'complete-words', sets: 1, difficulty: ['easy'] },
              { task: 'daily-life', sets: 2, difficulty: ['easy'] },
              { task: 'academic-passage', sets: 1, difficulty: ['easy'] },
            ],
          },
        },
      ],
    },
    {
      id: 'listening',
      title: 'Listening',
      description: 'Listen and Choose a Response, conversaciones, anuncios y clases académicas. Sección adaptativa en dos módulos.',
      instructions: [
        'Escucharás cada audio una sola vez en modo examen. Puedes tomar notas mientras escuchas.',
        'Las preguntas aparecen después del audio. En modo examen no puedes volver a preguntas anteriores.',
        'Usa auriculares si es posible. El audio se genera con la síntesis de voz del navegador salvo que se hayan añadido grabaciones.',
      ],
      navigation: 'forward-only',
      maxPlays: 1,
      modules: [
        {
          id: 'm1',
          title: 'Módulo 1',
          timeLimitSec: 13 * 60,
          parts: [
            { task: 'choose-response', sets: 6, difficulty: ['medium'] },
            { task: 'conversation', sets: 1, difficulty: ['medium'] },
            { task: 'announcement', sets: 1, difficulty: ['medium', 'easy'] },
            { task: 'academic-talk', sets: 1, difficulty: ['medium'] },
          ],
        },
        {
          id: 'm2',
          title: 'Módulo 2',
          timeLimitSec: 14 * 60,
          adaptive: {
            basedOn: 'm1',
            threshold: 0.6,
            upper: [
              { task: 'choose-response', sets: 6, difficulty: ['hard'] },
              { task: 'conversation', sets: 1, difficulty: ['hard'] },
              { task: 'announcement', sets: 1, difficulty: ['hard', 'medium'] },
              { task: 'academic-talk', sets: 1, difficulty: ['hard'] },
            ],
            lower: [
              { task: 'choose-response', sets: 6, difficulty: ['easy'] },
              { task: 'conversation', sets: 1, difficulty: ['easy'] },
              { task: 'announcement', sets: 1, difficulty: ['easy'] },
              { task: 'academic-talk', sets: 1, difficulty: ['easy'] },
            ],
          },
        },
      ],
    },
    {
      id: 'writing',
      title: 'Writing',
      description: 'Build a Sentence (10 ítems), Write an Email (7 min) y Writing for an Academic Discussion (10 min).',
      instructions: [
        'Cada tarea tiene su propio temporizador. Al agotarse, tu texto se guarda y pasas a la siguiente tarea.',
        'El editor guarda automáticamente tu texto en este navegador.',
        'Build a Sentence se corrige automáticamente; el correo y la discusión se evalúan con rúbrica.',
      ],
      navigation: 'free',
      modules: [
        {
          id: 'build',
          title: 'Build a Sentence',
          timeLimitSec: 6 * 60,
          parts: [
            { task: 'build-sentence', sets: 3, difficulty: ['easy'] },
            { task: 'build-sentence', sets: 4, difficulty: ['medium'] },
            { task: 'build-sentence', sets: 3, difficulty: ['hard'] },
          ],
        },
        { id: 'email', title: 'Write an Email', timeLimitSec: 7 * 60, parts: [{ task: 'email', sets: 1 }] },
        { id: 'discussion', title: 'Academic Discussion', timeLimitSec: 10 * 60, parts: [{ task: 'academic-discussion', sets: 1 }] },
      ],
    },
    {
      id: 'speaking',
      title: 'Speaking',
      description: 'Listen and Repeat (7 frases) y Take an Interview (4 preguntas de 45 s). Sin tiempo de preparación.',
      instructions: [
        'Necesitas un micrófono. Se te pedirá permiso antes de empezar; la grabación solo se activa durante cada respuesta.',
        'Listen and Repeat: escucha cada frase y repítela exactamente.',
        'Take an Interview: responde a cada pregunta durante un máximo de 45 segundos.',
        'Las grabaciones se guardan solo en este navegador.',
      ],
      navigation: 'forward-only',
      modules: [
        {
          id: 'm1',
          title: 'Listen and Repeat · Interview',
          timeLimitSec: null,
          parts: [
            { task: 'listen-repeat', sets: 1 },
            { task: 'interview', sets: 1 },
          ],
        },
      ],
    },
  ],
  scoring: DEFAULT_SCORING,
};

/** Simulación breve (≈45 min) con la misma estructura y la mitad de contenido. */
export const toeflQuick2026: ExamBlueprint = {
  ...toeflIbt2026,
  id: 'toefl-ibt-2026-quick',
  name: 'Simulación breve (formato 2026)',
  description: 'Versión reducida para practicar en menos tiempo. Mantiene los tipos de tarea y la ruta adaptativa con menos ítems.',
  sections: toeflIbt2026.sections.map((section) => {
    switch (section.id) {
      case 'reading':
        return {
          ...section,
          modules: [
            { id: 'm1', title: 'Módulo 1', timeLimitSec: 8 * 60, parts: [
              { task: 'complete-words', sets: 1, difficulty: ['medium'] },
              { task: 'daily-life', sets: 1, difficulty: ['medium', 'easy'] },
              { task: 'academic-passage', sets: 1, difficulty: ['medium'] },
            ] },
            { id: 'm2', title: 'Módulo 2', timeLimitSec: 6 * 60, adaptive: {
              basedOn: 'm1', threshold: 0.6,
              upper: [{ task: 'academic-passage', sets: 1, difficulty: ['hard'] }, { task: 'daily-life', sets: 1, difficulty: ['hard'] }],
              lower: [{ task: 'academic-passage', sets: 1, difficulty: ['easy'] }, { task: 'daily-life', sets: 1, difficulty: ['easy'] }],
            } },
          ],
        };
      case 'listening':
        return {
          ...section,
          modules: [
            { id: 'm1', title: 'Módulo 1', timeLimitSec: 7 * 60, parts: [
              { task: 'choose-response', sets: 4, difficulty: ['medium'] },
              { task: 'conversation', sets: 1, difficulty: ['medium'] },
              { task: 'academic-talk', sets: 1, difficulty: ['medium'] },
            ] },
            { id: 'm2', title: 'Módulo 2', timeLimitSec: 6 * 60, adaptive: {
              basedOn: 'm1', threshold: 0.6,
              upper: [{ task: 'choose-response', sets: 3, difficulty: ['hard'] }, { task: 'academic-talk', sets: 1, difficulty: ['hard'] }],
              lower: [{ task: 'choose-response', sets: 3, difficulty: ['easy'] }, { task: 'academic-talk', sets: 1, difficulty: ['easy'] }],
            } },
          ],
        };
      case 'writing':
        return {
          ...section,
          modules: [
            { id: 'build', title: 'Build a Sentence', timeLimitSec: 3 * 60, parts: [{ task: 'build-sentence', sets: 5, difficulty: ['medium', 'easy', 'hard'] }] },
            { id: 'discussion', title: 'Academic Discussion', timeLimitSec: 10 * 60, parts: [{ task: 'academic-discussion', sets: 1 }] },
          ],
        };
      case 'speaking':
        return {
          ...section,
          modules: [{ id: 'm1', title: 'Listen and Repeat · Interview', timeLimitSec: null, parts: [{ task: 'listen-repeat', sets: 1 }, { task: 'interview', sets: 1 }] }],
        };
    }
  }),
};
