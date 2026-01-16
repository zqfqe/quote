
/**
 * ADVANCED STATIC PRERENDER SCRIPT
 * Generates static HTML for:
 * 1. Static Pages (About, Contact)
 * 2. Category Pages (Authors, Topics, etc.)
 * 3. Individual Quote Pages (Deep Links)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const BASE_URL = 'https://maximusquotes.org';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DIST_DIR = path.resolve(__dirname, '../dist');
const TEMPLATE_FILE = path.join(DIST_DIR, 'index.html');

// --- 1. CONFIGURATION ---

const dataSources = [
  { type: 'topic', file: '../data/quotesTopics.ts', label: 'Topic' },
  { type: 'author', file: '../data/quotesAuthors.ts', label: 'Author' },
  { type: 'movie', file: '../data/quotesMovies.ts', label: 'Movie' },
  { type: 'tv', file: '../data/quotesTV.ts', label: 'TV Show' },
  { type: 'book', file: '../data/quotesBooks.ts', label: 'Book' },
  { type: 'game', file: '../data/quotesGames.ts', label: 'Video Game' },
  { type: 'lyrics', file: '../data/quotesLyrics.ts', label: 'Lyrics' },
  { type: 'anime', file: '../data/quotesAnime.ts', label: 'Anime' },
  { type: 'poetry', file: '../data/quotesPoetry.ts', label: 'Poem' },
  { type: 'proverb', file: '../data/quotesProverbs.ts', label: 'Proverbs' },
];

const staticRoutes = [
  { path: 'about', title: 'About Us', desc: 'About Maximus Quotes - Our Mission & Vision' },
  { path: 'contact', title: 'Contact Us', desc: 'Get in touch with Maximus Quotes' },
  { path: 'privacy', title: 'Privacy Policy', desc: 'Privacy Policy' },
  { path: 'terms', title: 'Terms & Conditions', desc: 'Terms of Service' },
  { path: 'favorites', title: 'Your Favorites', desc: 'Your saved quotes collection' },
];

// --- 2. HELPERS ---

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

let template = '';
try {
  template = fs.readFileSync(TEMPLATE_FILE, 'utf8');
} catch (e) {
  console.error("Error: dist/index.html not found.");
  process.exit(1);
}

function parseDataFile(filePath) {
  const dataMap = new Map();
  try {
    const fullPath = path.resolve(__dirname, filePath);
    const content = fs.readFileSync(fullPath, 'utf8');
    const keyRegex = /"([^"]+)":\s*(\[|\{)([\s\S]*?)(\]|\})(?=\s*,?\s*"|\s*};)/g;
    
    let match;
    while ((match = keyRegex.exec(content)) !== null) {
      const key = match[1];
      const body = match[3];
      const quotes = [];

      const qRegex = /q\(\s*"((?:[^"\\]|\\.)*)"\s*,\s*"((?:[^"\\]|\\.)*)"\s*\)/g;
      const objRegex = /text:\s*"((?:[^"\\]|\\.)*)"\s*,\s*author:\s*"((?:[^"\\]|\\.)*)"/g;
      
      let qMatch;
      while ((qMatch = qRegex.exec(body)) !== null) {
        quotes.push({ text: qMatch[1].replace(/\\"/g, '"'), author: qMatch[2].replace(/\\"/g, '"') });
      }
      let objMatch;
      while ((objMatch = objRegex.exec(body)) !== null) {
        quotes.push({ text: objMatch[1].replace(/\\"/g, '"'), author: objMatch[2].replace(/\\"/g, '"') });
      }
      
      if (quotes.length > 0) {
        dataMap.set(key, quotes);
      }
    }
  } catch (err) {
    console.error(`Error parsing ${filePath}:`, err.message);
  }
  return dataMap;
}

function writeFile(urlPath, title, description, injectedContentHtml = '') {
  const relativePath = urlPath.startsWith('/') ? urlPath.slice(1) : urlPath; 
  const dir = path.join(DIST_DIR, relativePath);
  
  if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
  }

  let html = template;
  html = html.replace(/<title>.*?<\/title>/, `<title>${title}</title>`);
  html = html.replace(/<meta property="og:title" content=".*?" \/>/, `<meta property="og:title" content="${title}" />`);
  html = html.replace(/<meta name="twitter:title" content=".*?" \/>/, `<meta name="twitter:title" content="${title}" />`);
  
  const safeDesc = description.replace(/"/g, '&quot;');
  html = html.replace(/<meta name="description" content=".*?" \/>/, `<meta name="description" content="${safeDesc}" />`);
  html = html.replace(/<meta property="og:description" content=".*?" \/>/, `<meta property="og:description" content="${safeDesc}" />`);
  html = html.replace(/<meta name="twitter:description" content=".*?" \/>/, `<meta name="twitter:description" content="${safeDesc}" />`);
  
  const fullUrl = `${BASE_URL}/${relativePath}`;
  html = html.replace(/<meta property="og:url" content=".*?" \/>/, `<meta property="og:url" content="${fullUrl}" />`);

  if (injectedContentHtml) {
    html = html.replace('<!-- SEO_CONTENT -->', injectedContentHtml);
  }

  fs.writeFileSync(path.join(dir, 'index.html'), html);
}

// --- 3. EXECUTION ---

console.log('🚀 Starting Deep Prerender...');

// Static
staticRoutes.forEach(route => {
  writeFile(route.path, `${route.title} - Maximus Quotes`, route.desc);
});

// Dynamic Categories & Individual Quotes
let pageCount = 0;
dataSources.forEach(({ type, file, label }) => {
  const dataMap = parseDataFile(file);
  console.log(`Processing ${label}: found ${dataMap.size} categories.`);

  dataMap.forEach((quotes, item) => {
    const itemSlug = slugify(item);
    
    // 1. Category Page
    const catUrl = `quotes/${type}/${itemSlug}`;
    const catTitle = `${item} Quotes - Best ${label} Quotes`;
    const catDesc = `Browse our collection of the best quotes by ${item}.`;
    const catHtml = `<h1>${catTitle}</h1><ul>${quotes.slice(0,10).map(q => `<li>${q.text}</li>`).join('')}</ul>`;
    writeFile(catUrl, catTitle, catDesc, catHtml);
    pageCount++;

    // 2. Individual Quote Pages
    quotes.forEach(quote => {
        const quoteSlug = slugify(quote.text);
        if (quoteSlug.length > 0) {
            const quoteUrl = `quote/${type}/${itemSlug}/${quoteSlug}`;
            const quoteTitle = `"${quote.text.substring(0, 50)}..." - ${quote.author}`;
            const quoteDesc = `Famous quote by ${quote.author}: ${quote.text}`;
            const quoteHtml = `
                <article>
                    <h1>${quote.text}</h1>
                    <p>Author: ${quote.author}</p>
                    <p>Category: ${item}</p>
                </article>
            `;
            writeFile(quoteUrl, quoteTitle, quoteDesc, quoteHtml);
            pageCount++;
        }
    });
  });
});

console.log(`✅ Generated ${pageCount} pages.`);
// Copy 404
fs.copyFileSync(TEMPLATE_FILE, path.join(DIST_DIR, '404.html'));
