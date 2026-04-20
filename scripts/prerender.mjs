import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir   = resolve(__dirname, '../dist');

const routes = [
  '/',
  '/about',
  '/ai-bpo',
  '/privacy',
  '/terms',
  '/service/customer-care',
  '/service/hr-automation',
  '/service/financial-analyst',
  '/service/document-intelligence',
  '/service/voice-ai',
  '/service/custom-process',
];

const template = readFileSync(resolve(distDir, 'index.html'), 'utf-8');
const { render } = await import('../dist/server/entry-server.js');

for (const route of routes) {
  try {
    const appHtml = render(route);
    const html = template.replace(
      '<div id="root"></div>',
      `<div id="root">${appHtml}</div>`
    );

    const outDir = route === '/'
      ? distDir
      : resolve(distDir, route.slice(1));

    mkdirSync(outDir, { recursive: true });
    writeFileSync(resolve(outDir, 'index.html'), html);
    console.log(`  ✓ ${route}`);
  } catch (err) {
    console.error(`  ✗ ${route}: ${err.message}`);
  }
}

console.log('\nPre-render complete.');
