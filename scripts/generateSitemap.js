
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

// Utility: Slugify
const slugify = (text) => {
  if (!text) return '';
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
};

// Utility: Escape XML
const escapeXml = (unsafe) => {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
    }
  });
};

// Helper to parse data files and return both keys AND quotes
function parseData(filePath) {
  const data = new Map(); // key -> array of quotes
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Regex to find "Key Name": [ ... ]
    const keyRegex = /"([^"]+)":\s*\[([\s\S]*?)\]/g; 
    let match;
    
    while ((match = keyRegex.exec(content)) !== null) {
      const key = match[1];
      const body = match[2];
      
      const quotes = [];
      // Extract quote text: q("Text", "Author") or { text: "Text", ... }
      const qRegex = /text:\s*"((?:[^"\\]|\\.)*)"/g; // Matches text: "..."
      const shorthandRegex = /q\(\s*"((?:[^"\\]|\\.)*)"/g; // Matches q("...")

      let qMatch;
      while ((qMatch = qRegex.exec(body)) !== null) {
        quotes.push(qMatch[1].replace(/\\"/g, '"'));
      }
      while ((qMatch = shorthandRegex.exec(body)) !== null) {
        quotes.push(qMatch[1].replace(/\\"/g, '"'));
      }

      if (quotes.length > 0) {
        data.set(key, quotes);
      }
    }
  } catch (err) {
    console.error(`Error reading ${filePath}:`, err);
  }
  return data;
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

let urls = [
  { loc: '/', priority: '1.0' },
  { loc: '/about', priority: '0.8' },
  { loc: '/contact', priority: '0.5' },
  { loc: '/privacy', priority: '0.5' },
  { loc: '/terms', priority: '0.5' },
];

console.log('Generating Sitemap with Deep Links & Image Extensions...');

dataFiles.forEach(({ type, file }) => {
  const fullPath = path.resolve(__dirname, file);
  const data = parseData(fullPath);
  console.log(`Processing ${type}: found ${data.size} categories.`);
  
  data.forEach((quotes, key) => {
    const safeKey = slugify(key);
    
    // 1. Category URL
    urls.push({
      loc: `/quotes/${type}/${safeKey}`,
      priority: '0.8'
    });

    // 2. Individual Quote URLs with Image Metadata
    quotes.forEach((quoteText, index) => {
      const safeQuote = slugify(quoteText);
      // Limit URL length to avoid SEO issues, though uniqueness is key
      if (safeQuote.length > 0) {
        // Replicate the ID generation logic used in geminiService to get the correct seed
        // Pattern: type_keySlug_index
        const seed = `${type}_${safeKey}_${index}`;
        const imageUrl = `https://picsum.photos/seed/${seed}/800/600?grayscale&blur=2`;
        
        urls.push({
          loc: `/quote/${type}/${safeKey}/${safeQuote}`,
          priority: '0.6',
          image: {
            loc: imageUrl,
            title: `Quote by ${key}: ${quoteText.substring(0, 100)}${quoteText.length > 100 ? '...' : ''}`
          }
        });
      }
    });
  });
});

const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls.map(url => `  <url>
    <loc>${BASE_URL}${url.loc.replace(/&/g, '&amp;')}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${url.priority}</priority>${url.image ? `
    <image:image>
      <image:loc>${url.image.loc.replace(/&/g, '&amp;')}</image:loc>
      <image:title>${escapeXml(url.image.title)}</image:title>
    </image:image>` : ''}
  </url>`).join('\n')}
</urlset>`;

const publicDir = path.resolve(__dirname, '../public');
if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir);
}

fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapContent);
console.log(`Sitemap generated with ${urls.length} URLs (including images) at public/sitemap.xml`);
