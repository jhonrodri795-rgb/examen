/** Limitador de ventana deslizante en memoria (suficiente para un servidor local). */
export function createRateLimiter(cfg: { windowMs: number; max: number }, now: () => number = Date.now) {
  const hits = new Map<string, number[]>();
  return {
    hit(key: string): { allowed: boolean; retryAfterSec?: number } {
      const t = now();
      const list = (hits.get(key) ?? []).filter((x) => t - x < cfg.windowMs);
      if (list.length >= cfg.max) {
        hits.set(key, list);
        return { allowed: false, retryAfterSec: Math.max(1, Math.ceil((cfg.windowMs - (t - list[0]!)) / 1000)) };
      }
      list.push(t);
      hits.set(key, list);
      if (hits.size > 5000) for (const [k, v] of hits) if (!v.some((x) => t - x < cfg.windowMs)) hits.delete(k);
      return { allowed: true };
    },
  };
}
