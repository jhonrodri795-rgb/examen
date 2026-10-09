/**
 * Modo de ejecución. `STATIC_BUILD` es true en la versión publicada como
 * página estática (sin servidor local): no hay API, ni transcripción, ni IA.
 */
export const STATIC_BUILD = import.meta.env.VITE_STATIC === 'true';

interface ClaudeHost {
  use(name: string): Promise<unknown>;
}

/** Capacidad del visor de claude.ai, si la página se abre allí (si no, null). */
export async function hostCapability<T>(name: string): Promise<T | null> {
  const host = (window as unknown as { claude?: ClaudeHost }).claude;
  if (!host?.use) return null;
  try {
    return ((await host.use(name)) as T | null) ?? null;
  } catch {
    return null;
  }
}
