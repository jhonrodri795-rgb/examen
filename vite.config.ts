import { defineConfig, loadEnv, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath, URL } from 'node:url';
import { getRequestListener } from '@hono/node-server';
import { createApp } from './server/src/app.ts';
import { loadServerConfig } from './server/src/config.ts';

/**
 * Monta la API (Hono) dentro del servidor de desarrollo de Vite, de modo que
 * `npm run dev` levanta frontend y backend en un único proceso.
 * Las variables de entorno se leen aquí, en Node: nunca llegan al bundle del
 * navegador (Vite solo expone variables con prefijo VITE_).
 */
function apiPlugin(): Plugin {
  return {
    name: 'toefl-local-api',
    configureServer(server) {
      const app = createApp(loadServerConfig(process.env));
      const listener = getRequestListener(app.fetch);
      server.middlewares.use((req, res, next) => {
        if (!req.url?.startsWith('/api/')) return next();
        void listener(req, res);
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  // Carga .env / .env.local en process.env solo para el proceso de Node.
  const env = loadEnv(mode, process.cwd(), '');
  for (const [key, value] of Object.entries(env)) {
    if (!(key in process.env)) process.env[key] = value;
  }
  // `--mode artifact`: versión estática de un solo archivo para publicarla como página (sin API local).
  const artifact = mode === 'artifact';
  return {
    plugins: [react(), tailwindcss(), apiPlugin()],
    define: artifact ? { 'import.meta.env.VITE_STATIC': JSON.stringify('true') } : undefined,
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '@shared': fileURLToPath(new URL('./shared', import.meta.url)),
      },
    },
    server: { port: 5173, host: 'localhost' },
    build: artifact
      ? {
          outDir: 'dist-artifact',
          sourcemap: false,
          cssCodeSplit: false,
          assetsInlineLimit: 100_000_000,
          chunkSizeWarningLimit: 4000,
          rollupOptions: { output: { inlineDynamicImports: true } },
        }
      : { sourcemap: true, chunkSizeWarningLimit: 1200 },
  };
});
