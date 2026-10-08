/**
 * Servidor de producción: sirve la aplicación compilada (dist/) y la API.
 * Uso: npm run build && npm start
 */
import { serve } from '@hono/node-server';
import { serveStatic } from '@hono/node-server/serve-static';
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { createApp } from './src/app.ts';
import { loadServerConfig } from './src/config.ts';
import { loadDotEnv } from './src/env.ts';

loadDotEnv();
const cfg = loadServerConfig(process.env);
const app = createApp(cfg);
const distDir = resolve(process.cwd(), 'dist');
const indexHtml = existsSync(resolve(distDir, 'index.html')) ? readFileSync(resolve(distDir, 'index.html'), 'utf8') : null;

app.use('*', async (c, next) => {
  await next();
  c.header('X-Content-Type-Options', 'nosniff');
  c.header('Permissions-Policy', 'microphone=(self), camera=(), geolocation=()');
  c.header('Referrer-Policy', 'no-referrer');
  c.header(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; media-src 'self' blob:; connect-src 'self'; font-src 'self' data:; object-src 'none'; base-uri 'self'; frame-ancestors 'none'",
  );
});
app.use('/*', serveStatic({ root: './dist' }));
app.get('*', (c) => (indexHtml ? c.html(indexHtml) : c.text('Ejecuta "npm run build" antes de "npm start".', 500)));

const port = Number(process.env.PORT ?? 8787);
const hostname = process.env.HOST ?? '127.0.0.1';
serve({ fetch: app.fetch, port, hostname }, (info) => {
  console.info(`TOEFL Prep Studio en http://${hostname === '0.0.0.0' ? 'localhost' : hostname}:${info.port}`);
  console.info(`Transcripción: ${cfg.stt.provider ?? 'no configurada'} · Pronunciación: ${cfg.pronunciation.provider ?? 'no configurada'} · Evaluador: ${cfg.evaluator.provider ?? 'no configurado'}`);
});
