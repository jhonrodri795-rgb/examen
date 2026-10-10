import { describe, expect, it, vi } from 'vitest';
import { DICTATION_GUIDES, detectPlatform, looksSpanish, micPolicy } from './dictation';
import { LiveTranscriber, type SpeechRecognitionLike } from './browser-stt';

describe('detección del sistema para el dictado', () => {
  it.each([
    ['Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/130', 'Win32', 0, 'windows'],
    ['Mozilla/5.0 (Macintosh; Intel Mac OS X 14_5) AppleWebKit/605.1.15 Safari/605.1.15', 'MacIntel', 0, 'mac'],
    ['Mozilla/5.0 (Macintosh; Intel Mac OS X 14_5) AppleWebKit/605.1.15 Safari/605.1.15', 'MacIntel', 5, 'ios'],
    ['Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)', 'iPhone', 5, 'ios'],
    ['Mozilla/5.0 (Linux; Android 14; Pixel 8) Chrome/130 Mobile', 'Linux armv8l', 5, 'android'],
    ['Mozilla/5.0 (X11; CrOS x86_64 15000.0.0) Chrome/130', 'Linux x86_64', 0, 'chromeos'],
    ['Mozilla/5.0 (X11; Linux x86_64) Firefox/131', 'Linux x86_64', 0, 'linux'],
  ])('%s → %s', (userAgent, platform, maxTouchPoints, expected) => {
    expect(detectPlatform({ userAgent, platform, maxTouchPoints })).toBe(expected);
  });

  it('Windows indica Win + H y cómo poner el inglés', () => {
    expect(DICTATION_GUIDES.windows.shortcut).toBe('Win + H');
    expect(DICTATION_GUIDES.windows.language).toMatch(/Win \+ Espacio/);
    expect(DICTATION_GUIDES.linux.unavailable).toBe(true);
  });
});

describe('idioma del texto dictado', () => {
  it('detecta un dictado en español', () => {
    expect(looksSpanish('Hola, me llamo Ana y estudio para el examen porque quiero estudiar en el extranjero')).toBe(true);
    expect(looksSpanish('Yo prefiero la biblioteca')).toBe(true);
  });
  it('no marca respuestas en inglés', () => {
    expect(looksSpanish('I usually study in the library because it is quiet')).toBe(false);
    expect(looksSpanish('Hello, I am practicing for the TOEFL')).toBe(false);
    expect(looksSpanish('ok')).toBe(false);
  });
});

describe('política de micrófono del contenedor', () => {
  it('bloqueado si la política lo prohíbe; permitido si lo admite; desconocido sin API', () => {
    Object.defineProperty(navigator, 'mediaDevices', { value: { getUserMedia: vi.fn() }, configurable: true });
    Object.defineProperty(window, 'isSecureContext', { value: true, configurable: true });
    const doc = (allows?: boolean) => (allows === undefined ? {} : { featurePolicy: { allowsFeature: (f: string) => (f === 'microphone' ? allows : true) } }) as unknown as Document;
    expect(micPolicy(doc(false))).toBe('blocked');
    expect(micPolicy(doc(true))).toBe('allowed');
    expect(micPolicy(doc())).toBe('unknown');
    Object.defineProperty(navigator, 'mediaDevices', { value: undefined, configurable: true });
    expect(micPolicy(doc(true))).toBe('blocked'); // sin getUserMedia no hay micrófono posible
  });
});

class FakeRecognition implements SpeechRecognitionLike {
  static instances: FakeRecognition[] = [];
  lang = '';
  continuous = false;
  interimResults = false;
  maxAlternatives = 0;
  onresult: SpeechRecognitionLike['onresult'] = null;
  onerror: SpeechRecognitionLike['onerror'] = null;
  onend: SpeechRecognitionLike['onend'] = null;
  started = false;
  constructor() {
    FakeRecognition.instances.push(this);
  }
  start() {
    this.started = true;
  }
  stop() {
    queueMicrotask(() => this.onend?.());
  }
  abort() {
    this.onend?.();
  }
  emit(results: { text: string; final: boolean; confidence?: number }[], resultIndex = 0) {
    const list = results.map((r) => Object.assign([{ transcript: r.text, confidence: r.confidence ?? 0 }], { isFinal: r.final }));
    this.onresult?.({ resultIndex, results: Object.assign(list, { length: list.length }) as never });
  }
}

describe('transcripción en vivo del navegador', () => {
  it('acumula resultados finales, muestra los provisionales y se reinicia si el navegador corta', async () => {
    FakeRecognition.instances = [];
    const onUpdate = vi.fn();
    const t = new LiveTranscriber(FakeRecognition, { onUpdate, onError: vi.fn() });
    t.start();
    const first = FakeRecognition.instances[0]!;
    expect(first.lang).toBe('en-US');
    expect(first.continuous).toBe(true);
    first.emit([{ text: 'I usually study', final: true, confidence: 0.9 }, { text: ' in the', final: false }]);
    expect(onUpdate).toHaveBeenLastCalledWith('I usually study', 'in the');
    // El navegador termina la sesión por silencio: se abre otra y se conserva el texto.
    first.onend?.();
    const second = FakeRecognition.instances[1]!;
    expect(second.started).toBe(true);
    second.emit([{ text: 'in the library', final: true, confidence: 0.7 }]);
    expect(onUpdate).toHaveBeenLastCalledWith('I usually study in the library', '');
    const out = await t.stop();
    expect(out.text).toBe('I usually study in the library');
    expect(out.confidence).toBe(0.8);
    expect(FakeRecognition.instances).toHaveLength(2);
  });

  it('informa de errores de permiso sin reintentar e ignora el silencio', () => {
    FakeRecognition.instances = [];
    const onError = vi.fn();
    const t = new LiveTranscriber(FakeRecognition, { onUpdate: vi.fn(), onError });
    t.start();
    const r = FakeRecognition.instances[0]!;
    r.onerror?.({ error: 'no-speech' });
    expect(onError).not.toHaveBeenCalled();
    r.onerror?.({ error: 'not-allowed' });
    expect(onError).toHaveBeenCalledWith(expect.stringMatching(/no permiten/), 'not-allowed');
    r.onend?.();
    expect(FakeRecognition.instances).toHaveLength(1);
  });
});
