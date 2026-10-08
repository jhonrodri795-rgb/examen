/** Validación de audio recibido: tipo declarado, firma binaria, tamaño y duración. */

export const ACCEPTED_AUDIO_TYPES = ['audio/webm', 'audio/ogg', 'audio/mp4', 'audio/x-m4a', 'audio/aac', 'audio/mpeg', 'audio/wav', 'audio/x-wav', 'audio/wave'];

export type AudioContainer = 'webm' | 'ogg' | 'mp4' | 'mp3' | 'wav' | 'aac' | 'unknown';

export function baseMime(contentType: string | undefined | null): string {
  return (contentType ?? '').split(';')[0]!.trim().toLowerCase();
}

/** Detecta el contenedor por los primeros bytes (no confía solo en Content-Type). */
export function sniffContainer(bytes: Uint8Array): AudioContainer {
  const b = bytes;
  if (b.length < 12) return 'unknown';
  if (b[0] === 0x1a && b[1] === 0x45 && b[2] === 0xdf && b[3] === 0xa3) return 'webm';
  if (b[0] === 0x4f && b[1] === 0x67 && b[2] === 0x67 && b[3] === 0x53) return 'ogg';
  if (b[0] === 0x52 && b[1] === 0x49 && b[2] === 0x46 && b[3] === 0x46 && b[8] === 0x57 && b[9] === 0x41 && b[10] === 0x56 && b[11] === 0x45) return 'wav';
  if (b[4] === 0x66 && b[5] === 0x74 && b[6] === 0x79 && b[7] === 0x70) return 'mp4';
  if ((b[0] === 0x49 && b[1] === 0x44 && b[2] === 0x33) || (b[0] === 0xff && (b[1]! & 0xe0) === 0xe0 && (b[1]! & 0x06) !== 0)) return 'mp3';
  if (b[0] === 0xff && (b[1]! & 0xf6) === 0xf0) return 'aac';
  return 'unknown';
}

const COMPATIBLE: Record<string, AudioContainer[]> = {
  'audio/webm': ['webm'],
  'audio/ogg': ['ogg'],
  'audio/mp4': ['mp4'],
  'audio/x-m4a': ['mp4'],
  'audio/aac': ['aac', 'mp4'],
  'audio/mpeg': ['mp3'],
  'audio/wav': ['wav'],
  'audio/x-wav': ['wav'],
  'audio/wave': ['wav'],
};

export interface WavInfo {
  sampleRate: number;
  channels: number;
  bitsPerSample: number;
  durationSec: number;
}

/** Lee la cabecera WAV (PCM) para conocer la duración exacta. */
export function parseWav(bytes: Uint8Array): WavInfo | null {
  if (sniffContainer(bytes) !== 'wav') return null;
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  let offset = 12;
  let fmt: { channels: number; sampleRate: number; bits: number } | null = null;
  while (offset + 8 <= bytes.length) {
    const id = String.fromCharCode(bytes[offset]!, bytes[offset + 1]!, bytes[offset + 2]!, bytes[offset + 3]!);
    const size = view.getUint32(offset + 4, true);
    if (id === 'fmt ' && offset + 24 <= bytes.length) {
      fmt = { channels: view.getUint16(offset + 10, true), sampleRate: view.getUint32(offset + 12, true), bits: view.getUint16(offset + 22, true) };
    }
    if (id === 'data' && fmt) {
      const dataSize = Math.min(size, bytes.length - offset - 8);
      const bytesPerSec = fmt.sampleRate * fmt.channels * (fmt.bits / 8);
      return { sampleRate: fmt.sampleRate, channels: fmt.channels, bitsPerSample: fmt.bits, durationSec: bytesPerSec ? dataSize / bytesPerSec : 0 };
    }
    offset += 8 + size + (size % 2);
  }
  return null;
}

export type AudioValidation =
  | { ok: true; mime: string; container: AudioContainer; durationSec: number | null }
  | { ok: false; status: number; code: string; message: string };

export function validateAudio(
  bytes: Uint8Array,
  contentType: string | undefined,
  declaredDurationMs: number | null,
  limits: { maxAudioBytes: number; maxAudioSec: number; minAudioSec: number },
): AudioValidation {
  const mime = baseMime(contentType);
  if (!ACCEPTED_AUDIO_TYPES.includes(mime)) {
    return { ok: false, status: 415, code: 'unsupported_type', message: `Formato de audio no admitido: ${mime || 'desconocido'}.` };
  }
  if (bytes.length === 0) return { ok: false, status: 400, code: 'empty_audio', message: 'La grabación está vacía.' };
  if (bytes.length > limits.maxAudioBytes) {
    return { ok: false, status: 413, code: 'audio_too_large', message: `El audio supera el tamaño máximo (${Math.round(limits.maxAudioBytes / 1024 / 1024)} MB).` };
  }
  const container = sniffContainer(bytes);
  if (!(COMPATIBLE[mime] ?? []).includes(container)) {
    return { ok: false, status: 415, code: 'content_mismatch', message: 'El contenido del archivo no coincide con el formato de audio declarado.' };
  }
  let durationSec: number | null = declaredDurationMs != null && Number.isFinite(declaredDurationMs) ? declaredDurationMs / 1000 : null;
  if (container === 'wav') durationSec = parseWav(bytes)?.durationSec ?? durationSec;
  if (durationSec == null) return { ok: false, status: 400, code: 'missing_duration', message: 'Falta la duración de la grabación.' };
  if (durationSec < limits.minAudioSec) return { ok: false, status: 422, code: 'audio_too_short', message: 'El audio es demasiado corto para transcribirlo.' };
  if (durationSec > limits.maxAudioSec) return { ok: false, status: 422, code: 'audio_too_long', message: `El audio supera la duración máxima (${limits.maxAudioSec} s).` };
  return { ok: true, mime, container, durationSec };
}
