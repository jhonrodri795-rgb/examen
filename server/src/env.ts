import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

/** Carga .env y .env.local (sin dependencias) sin sobrescribir variables ya definidas. */
export function loadDotEnv(dir = process.cwd()): void {
  for (const file of ['.env.local', '.env']) {
    const path = resolve(dir, file);
    if (!existsSync(path)) continue;
    for (const line of readFileSync(path, 'utf8').split(/\r?\n/)) {
      const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
      if (!m) continue;
      const key = m[1]!;
      let value = m[2]!;
      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) value = value.slice(1, -1);
      else value = value.replace(/\s+#.*$/, '');
      if (process.env[key] === undefined) process.env[key] = value;
    }
  }
}
