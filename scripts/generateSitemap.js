
/**
 * Sitemap Generator for Maximus Quotes
 * 
 * Instructions:
 * 1. Ensure you have Node.js installed.
 * 2. Run this script from the root directory: `node scripts/generateSitemap.js`
 * 3. The `sitemap.xml` file will be created in the `public` folder.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const BASE_URL = 'https://maximusquotes.org';
const TODAY = new Date().toISOString().split('T')[0];

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper to extract keys from a TS data file content
function extractKeys(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    // Regex to find keys in objects like: "Key Name": [ ... ]
    const regex = /"([^"]+)":\s*\[/g;
    let match;
    const keys = [];
    while ((match = regex.exec(content)) !== null) {
      keys.push(match[1]);
    }
    return keys;
  } catch (err) {
    console.error(`Error reading ${filePath}:`, err);
    return [];
  }
}

const dataFiles = [
  { type: 'topic', file: '../data/quotesTopics.ts' },
  { type: 'author', file: '../data/quotesAuthors.ts' },
  { type: 'movie', file: '../data/quotesMovies.ts' },
  { type: 'tv', file: '../data/quotesTV.ts' },
  { type: 'book', file: '../data/quotesBooks.ts' },
  { type: 'game', file: '../data/quotesGames.ts' },
  { type: 'lyrics', file: '../data/quotesLyrics.ts' },
  { type: 'anime', file: '../data/quotesAnime.ts' },
  { type: 'poetry', file: '../data/quotesPoetry.ts' },
  { type: 'proverb', file: '../data/quotesProverbs.ts' },
];

// HashRouter URLs must include /#/
let urls = [
  { loc: '/', priority: '1.0' },
  { loc: '/#/about', priority: '0.8' },
  { loc: '/#/contact', priority: '0.5' },
  { loc: '/#/privacy', priority: '0.5' },
  { loc: '/#/terms', priority: '0.5' },
];

console.log('Generating Sitemap...');

dataFiles.forEach(({ type, file }) => {
  const fullPath = path.resolve(__dirname, file);
  const keys = extractKeys(fullPath);
  console.log(`Found ${keys.length} items for ${type}`);
  
  keys.forEach(key => {
    // Generate URL format with hash
    const safeKey = encodeURIComponent(key);
    urls.push({
      loc: `/#/explore?type=${type}&q=${safeKey}`,
      priority: '0.7'
    });
  });
});

const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${BASE_URL}${url.loc.replace(/&/g, '&amp;')}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

// Write to public folder
const publicDir = path.resolve(__dirname, '../public');
if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir);
}

fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapContent);
console.log(`Sitemap generated with ${urls.length} URLs at public/sitemap.xml`);
