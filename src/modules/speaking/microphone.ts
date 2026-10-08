/**
 * Gestión del micrófono con las API nativas del navegador.
 *
 * - Solo se solicita acceso cuando el usuario entra en una actividad de
 *   Speaking o pulsa "Probar micrófono".
 * - El flujo de audio se reutiliza mientras siga activo (no se pide permiso de nuevo).
 * - Detecta permisos revocados, dispositivos desconectados y cambios de dispositivo.
 * - `release()` detiene todas las pistas con MediaStreamTrack.stop().
 */

export type MicStatus =
  | 'idle'
  | 'requesting'
  | 'active'
  | 'blocked'
  | 'unavailable'
  | 'busy'
  | 'disconnected'
  | 'unsupported'
  | 'error';

export type PermissionState = 'granted' | 'denied' | 'prompt' | 'unknown';

export interface MicDevice {
  deviceId: string;
  label: string;
}

export interface MicError {
  name: string;
  title: string;
  message: string;
  help: string[];
}

export interface MicState {
  status: MicStatus;
  permission: PermissionState;
  devices: MicDevice[];
  activeDeviceId: string | null;
  activeLabel: string | null;
  muted: boolean;
  error: MicError | null;
  /** Aviso no bloqueante (p. ej. nuevo dispositivo conectado). */
  notice: string | null;
}

type Listener = (s: MicState) => void;

export interface MediaEnv {
  mediaDevices?: MediaDevices;
  permissions?: Permissions;
  isSecureContext: boolean;
  userAgent: string;
}

const defaultEnv = (): MediaEnv => ({
  mediaDevices: typeof navigator !== 'undefined' ? navigator.mediaDevices : undefined,
  permissions: typeof navigator !== 'undefined' ? navigator.permissions : undefined,
  isSecureContext: typeof window !== 'undefined' ? window.isSecureContext : true,
  userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
});

/** Instrucciones para habilitar el micrófono según el navegador. */
export function browserHelp(ua: string): string[] {
  const isIOS = /iPhone|iPad|iPod/i.test(ua);
  const isAndroid = /Android/i.test(ua);
  const isFirefox = /Firefox\//i.test(ua);
  const isSafari = /Safari\//i.test(ua) && !/Chrome|Chromium|Edg\//i.test(ua);
  const isEdge = /Edg\//i.test(ua);
  if (isIOS) return ['Abre Ajustes → Safari (o el navegador que uses) → Micrófono y elige "Permitir".', 'Vuelve a la página y recárgala.'];
  if (isAndroid) return ['En Chrome: menú ⋮ → Configuración → Configuración de sitios → Micrófono → permite este sitio.', 'Comprueba también Ajustes del sistema → Aplicaciones → Chrome → Permisos → Micrófono.'];
  if (isFirefox) return ['Haz clic en el icono del micrófono tachado (o del candado) en la barra de direcciones.', 'Elimina el bloqueo de "Usar el micrófono" y recarga la página.'];
  if (isSafari) return ['Menú Safari → Ajustes → Sitios web → Micrófono → selecciona "Permitir" para este sitio.', 'Recarga la página.'];
  if (isEdge) return ['Haz clic en el candado de la barra de direcciones → Permisos para este sitio → Micrófono → Permitir.', 'Recarga la página.'];
  return [
    'Haz clic en el icono del candado (o de ajustes) a la izquierda de la dirección web.',
    'En "Micrófono", elige "Permitir" y recarga la página.',
    'Si sigue bloqueado, revisa los permisos de micrófono del sistema operativo para el navegador.',
  ];
}

export function describeMicError(err: unknown, ua: string): { status: MicStatus; error: MicError } {
  const name = (err as { name?: string })?.name ?? 'Error';
  const raw = (err as { message?: string })?.message ?? String(err);
  switch (name) {
    case 'NotAllowedError':
    case 'PermissionDeniedError':
    case 'SecurityError':
      return {
        status: 'blocked',
        error: { name, title: 'Permiso de micrófono denegado', message: 'El navegador o el sistema han bloqueado el acceso al micrófono. La aplicación no puede activarlo sin tu permiso.', help: browserHelp(ua) },
      };
    case 'NotFoundError':
    case 'DevicesNotFoundError':
      return {
        status: 'unavailable',
        error: { name, title: 'No se encontró ningún micrófono', message: 'Conecta un micrófono o unos auriculares con micrófono y pulsa "Reintentar".', help: ['Comprueba que el dispositivo esté conectado y habilitado en el sistema.'] },
      };
    case 'OverconstrainedError':
      return {
        status: 'unavailable',
        error: { name, title: 'Micrófono seleccionado no disponible', message: 'El dispositivo elegido ya no está disponible. Selecciona otro micrófono.', help: [] },
      };
    case 'NotReadableError':
    case 'TrackStartError':
    case 'AbortError':
      return {
        status: 'busy',
        error: { name, title: 'No se pudo leer el micrófono', message: 'El micrófono puede estar en uso por otra aplicación (videollamadas, grabadoras) o haber fallado.', help: ['Cierra otras aplicaciones que usen el micrófono.', 'Desconecta y vuelve a conectar el dispositivo, y pulsa "Reintentar".'] },
      };
    default:
      return { status: 'error', error: { name, title: 'Error de micrófono', message: raw, help: [] } };
  }
}

export class MicrophoneManager {
  private env: MediaEnv;
  private stream: MediaStream | null = null;
  private listeners = new Set<Listener>();
  private permissionStatus: PermissionStatus | null = null;
  private onDeviceChange = () => void this.handleDeviceChange();
  private state: MicState = {
    status: 'idle',
    permission: 'unknown',
    devices: [],
    activeDeviceId: null,
    activeLabel: null,
    muted: false,
    error: null,
    notice: null,
  };

  constructor(env: MediaEnv = defaultEnv()) {
    this.env = env;
    if (!env.isSecureContext || !env.mediaDevices?.getUserMedia) {
      this.state = {
        ...this.state,
        status: 'unsupported',
        error: {
          name: 'Unsupported',
          title: 'Micrófono no disponible en este contexto',
          message: env.isSecureContext
            ? 'Este navegador no admite captura de audio (getUserMedia).'
            : 'El navegador solo permite el micrófono en páginas seguras (HTTPS) o en localhost.',
          help: env.isSecureContext ? ['Usa una versión reciente de Chrome, Edge, Firefox o Safari.'] : ['Abre la aplicación en http://localhost:5173 o mediante HTTPS.'],
        },
      };
      return;
    }
    env.mediaDevices.addEventListener?.('devicechange', this.onDeviceChange);
  }

  getState(): MicState {
    return this.state;
  }

  getStream(): MediaStream | null {
    return this.stream && this.stream.getAudioTracks().some((t) => t.readyState === 'live') ? this.stream : null;
  }

  subscribe(fn: Listener): () => void {
    this.listeners.add(fn);
    fn(this.state);
    return () => this.listeners.delete(fn);
  }

  private set(patch: Partial<MicState>) {
    this.state = { ...this.state, ...patch };
    for (const l of this.listeners) l(this.state);
  }

  /** Consulta el permiso sin solicitarlo (no muestra ningún diálogo). */
  async init(): Promise<void> {
    if (this.state.status === 'unsupported') return;
    try {
      const status = await this.env.permissions?.query({ name: 'microphone' as PermissionName });
      if (status) {
        this.permissionStatus = status;
        this.set({ permission: status.state as PermissionState, status: status.state === 'denied' ? 'blocked' : this.state.status });
        if (status.state === 'denied') this.set({ error: describeMicError({ name: 'NotAllowedError' }, this.env.userAgent).error });
        status.onchange = () => this.handlePermissionChange(status.state as PermissionState);
      }
    } catch {
      // Firefox antiguo / Safari: la API de permisos no admite "microphone".
    }
    await this.refreshDevices();
  }

  private handlePermissionChange(p: PermissionState) {
    this.set({ permission: p });
    if (p === 'denied') {
      this.stopTracks();
      this.set({ status: 'blocked', error: describeMicError({ name: 'NotAllowedError' }, this.env.userAgent).error, activeDeviceId: null, activeLabel: null });
    } else if (p === 'granted' && this.state.status === 'blocked') {
      this.set({ status: 'idle', error: null, notice: 'Permiso concedido. Ya puedes activar el micrófono.' });
    }
  }

  async refreshDevices(): Promise<MicDevice[]> {
    try {
      const all = (await this.env.mediaDevices?.enumerateDevices()) ?? [];
      const devices = all
        .filter((d) => d.kind === 'audioinput')
        .map((d, i) => ({ deviceId: d.deviceId, label: d.label || (d.deviceId === 'default' ? 'Micrófono predeterminado' : `Micrófono ${i + 1}`) }));
      this.set({ devices });
      return devices;
    } catch {
      return this.state.devices;
    }
  }

  private async handleDeviceChange() {
    const before = new Set(this.state.devices.map((d) => d.deviceId));
    const devices = await this.refreshDevices();
    const active = this.state.activeDeviceId;
    const track = this.stream?.getAudioTracks()[0];
    const activeGone = active && active !== 'default' && !devices.some((d) => d.deviceId === active);
    if (this.state.status === 'active' && (activeGone || track?.readyState === 'ended')) {
      this.stopTracks();
      this.set({
        status: 'disconnected',
        activeDeviceId: null,
        activeLabel: null,
        error: { name: 'DeviceDisconnected', title: 'Micrófono desconectado', message: 'El dispositivo en uso se ha desconectado. Elige otro micrófono o vuelve a conectarlo.', help: [] },
      });
      return;
    }
    const added = devices.filter((d) => !before.has(d.deviceId));
    if (added.length && before.size > 0) this.set({ notice: `Nuevo dispositivo detectado: ${added.map((d) => d.label).join(', ')}` });
  }

  /**
   * Obtiene el flujo de audio. Reutiliza el actual si sigue activo y es del
   * dispositivo pedido (no vuelve a solicitar permiso).
   */
  async acquire(deviceId?: string | null): Promise<MediaStream | null> {
    if (this.state.status === 'unsupported') return null;
    const wanted = deviceId ?? this.state.activeDeviceId ?? null;
    const live = this.getStream();
    if (live && (!wanted || wanted === this.state.activeDeviceId)) return live;
    if (live) this.stopTracks();

    this.set({ status: 'requesting', error: null, notice: null });
    try {
      const constraints: MediaStreamConstraints = {
        audio: {
          ...(wanted && wanted !== 'default' ? { deviceId: { exact: wanted } } : {}),
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
          channelCount: 1,
        },
        video: false,
      };
      const stream = await this.env.mediaDevices!.getUserMedia(constraints);
      this.stream = stream;
      const track = stream.getAudioTracks()[0];
      if (!track) throw Object.assign(new Error('Sin pista de audio'), { name: 'NotFoundError' });
      track.addEventListener('ended', () => {
        if (this.stream !== stream) return;
        this.stream = null;
        this.set({
          status: 'disconnected',
          activeDeviceId: null,
          activeLabel: null,
          error: { name: 'TrackEnded', title: 'El micrófono dejó de enviar audio', message: 'Se desconectó el dispositivo o se revocó el permiso. Pulsa "Reintentar" para volver a activarlo.', help: browserHelp(this.env.userAgent) },
        });
      });
      track.addEventListener('mute', () => this.set({ muted: true }));
      track.addEventListener('unmute', () => this.set({ muted: false }));
      const settings = track.getSettings?.() ?? {};
      await this.refreshDevices();
      this.set({
        status: 'active',
        permission: 'granted',
        activeDeviceId: settings.deviceId ?? wanted ?? 'default',
        activeLabel: track.label || 'Micrófono',
        muted: track.muted,
        error: null,
      });
      return stream;
    } catch (err) {
      const { status, error } = describeMicError(err, this.env.userAgent);
      this.set({ status, error, activeDeviceId: null, activeLabel: null, permission: status === 'blocked' ? 'denied' : this.state.permission });
      return null;
    }
  }

  async selectDevice(deviceId: string): Promise<MediaStream | null> {
    this.stopTracks();
    this.set({ activeDeviceId: deviceId });
    return this.acquire(deviceId);
  }

  private stopTracks() {
    this.stream?.getTracks().forEach((t) => t.stop());
    this.stream = null;
  }

  /** Detiene el micrófono (MediaStreamTrack.stop) y libera el dispositivo. */
  release(): void {
    const wasActive = this.stream != null;
    this.stopTracks();
    if (wasActive || this.state.status === 'active' || this.state.status === 'requesting') {
      this.set({ status: 'idle', activeLabel: null, muted: false });
    }
  }

  dispose(): void {
    this.release();
    this.env.mediaDevices?.removeEventListener?.('devicechange', this.onDeviceChange);
    if (this.permissionStatus) this.permissionStatus.onchange = null;
    this.listeners.clear();
  }
}

// ---------- Medidor de nivel ----------

export class LevelMeter {
  private ctx: AudioContext;
  private analyser: AnalyserNode;
  private source: MediaStreamAudioSourceNode;
  private buf: Float32Array<ArrayBuffer>;

  constructor(stream: MediaStream) {
    const Ctx = window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    this.ctx = new Ctx();
    this.analyser = this.ctx.createAnalyser();
    this.analyser.fftSize = 1024;
    this.source = this.ctx.createMediaStreamSource(stream);
    this.source.connect(this.analyser);
    this.buf = new Float32Array(this.analyser.fftSize);
  }

  /** Nivel actual: rms (0–1), dBFS y pico. */
  read(): { rms: number; db: number; peak: number } {
    if (this.ctx.state === 'suspended') void this.ctx.resume();
    this.analyser.getFloatTimeDomainData(this.buf);
    let sum = 0;
    let peak = 0;
    for (const v of this.buf) {
      sum += v * v;
      peak = Math.max(peak, Math.abs(v));
    }
    const rms = Math.sqrt(sum / this.buf.length);
    return { rms, db: 20 * Math.log10(Math.max(rms, 1e-8)), peak };
  }

  dispose(): void {
    this.source.disconnect();
    void this.ctx.close();
  }
}
