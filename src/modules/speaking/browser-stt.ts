/**
 * Transcripción en vivo con el reconocimiento de voz del navegador (Web
 * Speech API). Es opcional y solo se usa si el usuario lo activa: según el
 * navegador, el audio se envía a los servidores de su fabricante (Google en
 * Chrome, Microsoft en Edge, Apple en Safari). No es la única vía: el
 * estudiante siempre puede dictar con su sistema o escribir.
 */

interface SrAlternative {
  transcript: string;
  confidence: number;
}
interface SrResult {
  isFinal: boolean;
  length: number;
  [i: number]: SrAlternative;
}
interface SrEvent {
  resultIndex: number;
  results: { length: number; [i: number]: SrResult };
}
export interface SpeechRecognitionLike {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  maxAlternatives: number;
  onresult: ((e: SrEvent) => void) | null;
  onerror: ((e: { error: string }) => void) | null;
  onend: (() => void) | null;
  start(): void;
  stop(): void;
  abort(): void;
}
export type SpeechRecognitionCtor = new () => SpeechRecognitionLike;

export function speechRecognitionCtor(): SpeechRecognitionCtor | null {
  if (typeof window === 'undefined') return null;
  const w = window as unknown as { SpeechRecognition?: SpeechRecognitionCtor; webkitSpeechRecognition?: SpeechRecognitionCtor };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

export const BROWSER_STT_POLICY =
  'El reconocimiento de voz del navegador puede enviar tu audio a los servidores del fabricante del navegador (Google en Chrome, Microsoft en Edge, Apple en Safari) para convertirlo en texto. Esta página no guarda ni envía ese audio por su cuenta.';

const ERRORS: Record<string, string> = {
  'not-allowed': 'El navegador o el visor no permiten el reconocimiento de voz en esta página.',
  'service-not-allowed': 'El reconocimiento de voz del navegador no está disponible aquí.',
  'audio-capture': 'No se pudo usar el micrófono para el reconocimiento de voz.',
  network: 'El reconocimiento de voz del navegador necesita conexión con su servicio y no la tiene.',
  'language-not-supported': 'El navegador no reconoce voz en inglés.',
};

export interface LiveTranscript {
  /** Texto final acumulado. */
  text: string;
  /** Confianza media de los fragmentos finales (0–1) si el navegador la da. */
  confidence: number | null;
}

/** Reconocimiento continuo: reinicia la sesión si el navegador la corta por silencio. */
export class LiveTranscriber {
  private rec: SpeechRecognitionLike | null = null;
  private finals: { text: string; confidence: number }[] = [];
  private active = false;
  private restarts = 0;
  private endResolve: (() => void) | null = null;

  constructor(
    private readonly Ctor: SpeechRecognitionCtor,
    private readonly handlers: { onUpdate: (finalText: string, interim: string) => void; onError: (message: string, code: string) => void },
    private readonly lang = 'en-US',
  ) {}

  start(): void {
    this.active = true;
    this.finals = [];
    this.restarts = 0;
    this.spawn();
  }

  private spawn() {
    const rec = new this.Ctor();
    this.rec = rec;
    rec.lang = this.lang;
    rec.continuous = true;
    rec.interimResults = true;
    rec.maxAlternatives = 1;
    rec.onresult = (e) => {
      let interim = '';
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const r = e.results[i]!;
        const alt = r[0];
        if (!alt) continue;
        if (r.isFinal) this.finals.push({ text: alt.transcript.trim(), confidence: alt.confidence });
        else interim += alt.transcript;
      }
      this.handlers.onUpdate(this.text(), interim.trim());
    };
    rec.onerror = (e) => {
      if (e.error === 'no-speech' || e.error === 'aborted') return;
      this.active = false;
      this.handlers.onError(ERRORS[e.error] ?? `Error del reconocimiento de voz (${e.error}).`, e.error);
    };
    rec.onend = () => {
      if (this.active && this.restarts < 30) {
        this.restarts++;
        try {
          this.spawn();
          return;
        } catch {
          this.active = false;
        }
      }
      this.endResolve?.();
      this.endResolve = null;
    };
    rec.start();
  }

  private text(): string {
    return this.finals.map((f) => f.text).filter(Boolean).join(' ');
  }

  /** Detiene y devuelve el texto final (espera a los últimos resultados, máx. 1,5 s). */
  async stop(): Promise<LiveTranscript> {
    const wasActive = this.active;
    this.active = false;
    if (this.rec && wasActive) {
      await new Promise<void>((resolve) => {
        this.endResolve = resolve;
        setTimeout(resolve, 1500);
        try {
          this.rec!.stop();
        } catch {
          resolve();
        }
      });
    }
    const conf = this.finals.filter((f) => f.confidence > 0);
    return { text: this.text(), confidence: conf.length ? Math.round((conf.reduce((s, f) => s + f.confidence, 0) / conf.length) * 100) / 100 : null };
  }

  abort(): void {
    this.active = false;
    try {
      this.rec?.abort();
    } catch {
      /* ya detenido */
    }
  }
}
