/**
 * Ayudas para responder Speaking sin acceso al micrófono desde la página
 * (versión publicada en claude.ai): detección del sistema para explicar su
 * dictado, comprobación de si el contenedor permite el micrófono y aviso si
 * el texto dictado parece estar en español.
 */

export type Platform = 'windows' | 'mac' | 'ios' | 'android' | 'chromeos' | 'linux' | 'other';

export function detectPlatform(env: { userAgent: string; platform?: string; maxTouchPoints?: number }): Platform {
  const ua = env.userAgent;
  const pf = env.platform ?? '';
  if (/iPhone|iPad|iPod/i.test(ua) || (/Mac/i.test(pf) && (env.maxTouchPoints ?? 0) > 1)) return 'ios';
  if (/Android/i.test(ua)) return 'android';
  if (/CrOS/i.test(ua)) return 'chromeos';
  if (/Windows/i.test(ua) || /Win/i.test(pf)) return 'windows';
  if (/Mac OS X|Macintosh/i.test(ua) || /Mac/i.test(pf)) return 'mac';
  if (/Linux/i.test(ua)) return 'linux';
  return 'other';
}

export function currentPlatform(): Platform {
  if (typeof navigator === 'undefined') return 'other';
  return detectPlatform({ userAgent: navigator.userAgent, platform: navigator.platform, maxTouchPoints: navigator.maxTouchPoints });
}

export interface DictationGuide {
  /** Atajo o gesto principal, p. ej. "Win + H". */
  shortcut: string;
  /** Pasos para activarlo con el cursor en el cuadro de texto. */
  steps: string[];
  /** Cómo poner el dictado en inglés. */
  language: string;
  /** El sistema no trae dictado integrado. */
  unavailable?: boolean;
}

export const DICTATION_GUIDES: Record<Platform, DictationGuide> = {
  windows: {
    shortcut: 'Win + H',
    steps: ['Haz clic dentro del cuadro de texto.', 'Pulsa la tecla Windows + H: aparece la barra de dictado con un micrófono.', 'Si el micrófono de la barra no está activo, haz clic en él y habla.'],
    language: 'El dictado usa el idioma del teclado: si escribe en español, añade el inglés en Configuración → Hora e idioma → Idioma y cambia con Win + Espacio antes de dictar.',
  },
  mac: {
    shortcut: 'Fn dos veces (o la tecla 🎤)',
    steps: ['Haz clic dentro del cuadro de texto.', 'Pulsa dos veces la tecla Fn (o la tecla del micrófono 🎤), o usa Edición → Iniciar dictado.', 'Si nunca lo has usado, actívalo en Ajustes del Sistema → Teclado → Dictado.'],
    language: 'Elige «English» en el selector de idioma que aparece junto al icono del dictado (o en Ajustes → Teclado → Dictado → Idiomas).',
  },
  ios: {
    shortcut: '🎤 del teclado',
    steps: ['Toca el cuadro de texto para abrir el teclado.', 'Toca el micrófono 🎤 del teclado y habla.'],
    language: 'Mantén pulsado el globo 🌐 o el micrófono para elegir «English».',
  },
  android: {
    shortcut: '🎤 del teclado',
    steps: ['Toca el cuadro de texto para abrir el teclado.', 'Toca el micrófono 🎤 del teclado (Gboard) y habla.'],
    language: 'En Gboard: Ajustes → Escritura por voz → Idiomas, y añade «English».',
  },
  chromeos: {
    shortcut: 'Buscar + D',
    steps: ['Activa el dictado en Configuración → Accesibilidad → Teclado y entrada de texto → Dictado.', 'Haz clic en el cuadro de texto y pulsa Buscar (o Launcher) + D.'],
    language: 'Elige «English» como idioma del dictado en esa misma pantalla.',
  },
  linux: {
    shortcut: '—',
    steps: ['Linux no incluye dictado de serie: escribe tu respuesta justo después de decirla en voz alta.'],
    language: '',
    unavailable: true,
  },
  other: {
    shortcut: 'dictado del sistema',
    steps: ['Haz clic en el cuadro de texto y activa el dictado de tu sistema o teclado.', 'Si no tienes dictado, escribe tu respuesta justo después de decirla en voz alta.'],
    language: 'Configura el idioma del dictado en inglés.',
  },
};

/**
 * ¿Permite el contenedor de la página usar el micrófono?
 * 'blocked' cuando la política de permisos lo prohíbe (p. ej. un iframe sin
 * allow="microphone"): getUserMedia fallaría sin mostrar ningún diálogo.
 * No solicita nada ni activa el micrófono.
 */
export function micPolicy(doc: Document | undefined = typeof document !== 'undefined' ? document : undefined): 'allowed' | 'blocked' | 'unknown' {
  if (typeof navigator === 'undefined' || !navigator.mediaDevices?.getUserMedia) return 'blocked';
  if (typeof window !== 'undefined' && !window.isSecureContext) return 'blocked';
  const policy = (doc as unknown as { permissionsPolicy?: { allowsFeature(f: string): boolean }; featurePolicy?: { allowsFeature(f: string): boolean } } | undefined);
  const fp = policy?.permissionsPolicy ?? policy?.featurePolicy;
  if (fp?.allowsFeature) {
    try {
      return fp.allowsFeature('microphone') ? 'allowed' : 'blocked';
    } catch {
      return 'unknown';
    }
  }
  return 'unknown';
}

const ES = new Set(['el', 'la', 'los', 'las', 'que', 'de', 'del', 'y', 'en', 'es', 'por', 'para', 'con', 'una', 'un', 'mi', 'yo', 'pero', 'porque', 'muy', 'cuando', 'también', 'estudio', 'estudiar', 'hola', 'gracias', 'nombre', 'llamo']);
const EN = new Set(['the', 'and', 'is', 'to', 'of', 'my', 'i', 'a', 'in', 'it', 'that', 'because', 'for', 'with', 'you', 'we', 'are', 'was', 'this', 'like', 'name', 'hello', 'study', 'think']);

/** Heurística simple: ¿el texto parece español en vez de inglés? */
export function looksSpanish(text: string): boolean {
  const words = text.toLowerCase().normalize('NFC').match(/[a-záéíóúñü]+/g) ?? [];
  if (words.length < 3) return false;
  let es = 0;
  let en = 0;
  for (const w of words) {
    if (ES.has(w)) es++;
    if (EN.has(w)) en++;
  }
  const accents = /[áéíóúñ¿¡]/i.test(text) ? 1 : 0;
  return es + accents >= 2 && es + accents > en;
}

/** Grabadora de voz integrada en cada sistema (para medir la fluidez sin el micrófono de la página). */
export const RECORDER_GUIDES: Record<Platform, string> = {
  windows: 'app «Grabadora de sonido» (tecla Windows → escribe «Grabadora»). Guarda en Documentos → Grabaciones de sonido.',
  mac: 'app «Notas de voz» (o QuickTime Player → Archivo → Nueva grabación de audio).',
  ios: 'app «Notas de voz». Para subirla: Compartir → Guardar en Archivos.',
  android: 'app «Grabadora» del móvil.',
  chromeos: 'app «Grabadora» de ChromeOS.',
  linux: 'cualquier grabadora de audio (p. ej. «Grabadora de sonido» de GNOME).',
  other: 'la grabadora de voz de tu dispositivo.',
};
