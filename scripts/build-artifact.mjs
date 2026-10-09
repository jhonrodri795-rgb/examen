/**
 * Genera una versión estática de un solo archivo HTML (JS y CSS en línea)
 * para publicarla como página: `npm run build:artifact`.
 * Salida: dist-artifact/toefl-prep-studio.html (fragmento sin <html>/<head>/<body>).
 */
import { execSync } from 'node:child_process';
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

execSync('npx vite build --mode artifact', { stdio: 'inherit' });
const dir = 'dist-artifact';
const html = readFileSync(join(dir, 'index.html'), 'utf8');
const assets = readdirSync(join(dir, 'assets'));
const js = assets.filter((f) => f.endsWith('.js'));
const css = assets.filter((f) => f.endsWith('.css'));
if (js.length !== 1) throw new Error(`Se esperaba un único bundle JS y hay ${js.length}: ${js.join(', ')}`);

const script = readFileSync(join(dir, 'assets', js[0]), 'utf8').replace(/<\/script/gi, '<\\/script');
const style = css.map((f) => readFileSync(join(dir, 'assets', f), 'utf8')).join('\n').replace(/<\/style/gi, '<\\/style');
const title = html.match(/<title>[\s\S]*?<\/title>/)?.[0] ?? '<title>TOEFL Prep Studio</title>';
const themeScript = html.match(/<script>\s*\/\/ Evita el parpadeo[\s\S]*?<\/script>/)?.[0] ?? '';
const page = [
  title,
  '<meta name="description" content="Plataforma de práctica y simulación del TOEFL iBT (formato 2026).">',
  `<style>${style}</style>`,
  themeScript,
  '<div id="root"></div>',
  `<script type="module">${script}</script>`,
].join('\n');
const out = join(dir, 'toefl-prep-studio.html');
writeFileSync(out, page);
console.log(`${out}: ${(Buffer.byteLength(page) / 1024 / 1024).toFixed(2)} MB`);
