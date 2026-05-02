import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const SITE_URL = 'https://estudioe.eu';
const PAGES_DIR = path.resolve('src/pages');
const OUTPUT_FILE = path.resolve('public/sitemap-0.xml');
const DEFAULT_CHANGEFREQ = 'monthly';
const TODAY = new Date().toISOString().slice(0, 10);

const PRIORITY_BY_ROUTE = new Map([
  ['/', '1.0'],
  ['/about/', '0.9'],
  ['/cocinas/', '0.9'],
  ['/reformas/', '0.9'],
  ['/javea/', '0.8'],
  ['/moraira/', '0.8'],
  ['/calpe/', '0.8'],
  ['/oliva/', '0.8'],
  ['/gandia/', '0.8'],
  ['/contact/', '0.7'],
  ['/privacy/', '0.3'],
]);

const CHANGEFREQ_BY_ROUTE = new Map([
  ['/contact/', 'yearly'],
  ['/privacy/', 'yearly'],
]);

async function collectHtmlFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) return collectHtmlFiles(fullPath);
      if (entry.isFile() && entry.name.endsWith('.html')) return [fullPath];
      return [];
    })
  );

  return files.flat();
}

function toRoute(filePath) {
  const relative = path.relative(PAGES_DIR, filePath).replace(/\\/g, '/');
  if (relative === 'index.html') return '/';
  return `/${relative.replace(/\.html$/, '')}/`;
}

function isTechnicalRoute(route) {
  return route === '/404/';
}

function getPriority(route) {
  return PRIORITY_BY_ROUTE.get(route) ?? '0.7';
}

function getChangefreq(route) {
  return CHANGEFREQ_BY_ROUTE.get(route) ?? DEFAULT_CHANGEFREQ;
}

function hasNoindex(content) {
  return /<meta[^>]*name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(content);
}

function buildUrlNode(route) {
  const loc = `${SITE_URL}${route === '/' ? '/' : route}`;
  const priority = getPriority(route);
  const changefreq = getChangefreq(route);

  return `  <url>
    <loc>${loc}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

async function main() {
  const files = await collectHtmlFiles(PAGES_DIR);
  const candidates = await Promise.all(
    files.map(async (filePath) => {
      const route = toRoute(filePath);
      if (isTechnicalRoute(route)) return null;
      const content = await readFile(filePath, 'utf8');
      if (hasNoindex(content)) return null;
      return route;
    })
  );

  const routes = candidates.filter(Boolean).sort((a, b) => a.localeCompare(b));
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map((route) => buildUrlNode(route)).join('\n')}
</urlset>
`;

  await writeFile(OUTPUT_FILE, xml, 'utf8');
  console.log(`Generated sitemap with ${routes.length} URLs -> public/sitemap-0.xml`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
