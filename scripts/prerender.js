/**
 * STATIC PRERENDER SCRIPT (Head-Only SSG)
 * 
 * This script runs after `vite build`.
 * It reads the compiled `dist/index.html`.
 * It scans the `data/` folder for all topics, authors, etc.
 * It generates a physical directory structure (e.g. `dist/quotes/author/Einstein/index.html`)
 * It injects specific Title and Meta Description into each file.
 * 
 * Benefit: Social Media bots and Crawlers see correct metadata immediately.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const BASE_URL = 'https://maximusquotes.org';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DIST_DIR = path.resolve(__dirname, '../dist');
const TEMPLATE_FILE = path.join(DIST_DIR, 'index.html');

// Helper: Read the built index.html
let template = '';
try {
  template = fs.readFileSync(TEMPLATE_FILE, 'utf8');
} catch (e) {
  console.error("Error: dist/index.html not found. Run 'npm run build' first.");
  process.exit(1);
}

// Helper to extract keys from TS data files (RegEx parsing to avoid TS compilation)
function extractKeys(filePath) {
  try {
    const fullPath = path.resolve(__dirname, filePath);
    const content = fs.readFileSync(fullPath, 'utf8');
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

// Configuration of routes to generate
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
  { path: 'about', title: 'About Us', desc: 'About Maximus Quotes' },
  { path: 'contact', title: 'Contact Us', desc: 'Get in touch with Maximus Quotes' },
  { path: 'privacy', title: 'Privacy Policy', desc: 'Privacy Policy' },
  { path: 'terms', title: 'Terms & Conditions', desc: 'Terms of Service' },
  { path: 'favorites', title: 'Your Favorites', desc: 'Your saved quotes collection' },
];

// Function to generate a file
function writeFile(urlPath, title, description) {
  // 1. Create Directory
  // Remove leading slash for filesystem path
  const relativePath = urlPath.startsWith('/') ? urlPath.slice(1) : urlPath; 
  const dir = path.join(DIST_DIR, relativePath);
  
  if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
  }

  // 2. Inject Metadata into Template
  let html = template;
  
  // Replace Title
  html = html.replace(/<title>.*?<\/title>/, `<title>${title}</title>`);
  html = html.replace(/<meta property="og:title" content=".*?" \/>/, `<meta property="og:title" content="${title}" />`);
  html = html.replace(/<meta name="twitter:title" content=".*?" \/>/, `<meta name="twitter:title" content="${title}" />`);
  
  // Replace Description
  const safeDesc = description.replace(/"/g, '&quot;');
  html = html.replace(/<meta name="description" content=".*?" \/>/, `<meta name="description" content="${safeDesc}" />`);
  html = html.replace(/<meta property="og:description" content=".*?" \/>/, `<meta property="og:description" content="${safeDesc}" />`);
  html = html.replace(/<meta name="twitter:description" content=".*?" \/>/, `<meta name="twitter:description" content="${safeDesc}" />`);
  
  // Replace URL
  const fullUrl = `${BASE_URL}/${relativePath}`;
  html = html.replace(/<meta property="og:url" content=".*?" \/>/, `<meta property="og:url" content="${fullUrl}" />`);

  // 3. Write File
  fs.writeFileSync(path.join(dir, 'index.html'), html);
}

console.log('🚀 Starting Prerender Process...');

// 1. Generate Static Routes
staticRoutes.forEach(route => {
  writeFile(route.path, `${route.title} - Maximus Quotes`, route.desc);
});

// 2. Generate Dynamic Routes
let count = 0;
dataSources.forEach(({ type, file, label }) => {
  const items = extractKeys(file);
  items.forEach(item => {
    const encodedItem = encodeURIComponent(item);
    const urlPath = `quotes/${type}/${encodedItem}`;
    
    // Generate intelligent Title/Desc
    const title = `${item} Quotes - Best ${label} Quotes & Sayings`;
    let desc = '';
    
    switch(type) {
        case 'author': desc = `Discover the most inspiring quotes by ${item}. A curated collection of wisdom, thoughts, and sayings.`; break;
        case 'movie': desc = `Relive the best moments from ${item}. Top quotes, lines, and dialogue from the movie.`; break;
        case 'book': desc = `Famous quotes and memorable lines from the book ${item}.`; break;
        case 'lyrics': desc = `Best song lyrics and lines from ${item}.`; break;
        default: desc = `Browse our extensive collection of the best quotes about ${item}. Inspiration for your daily life.`;
    }

    writeFile(urlPath, title, desc);
    count++;
  });
});

console.log(`✅ Successfully prerendered ${count + staticRoutes.length} pages.`);

// 3. Create 404.html (Copy of index.html for SPA fallback)
fs.copyFileSync(TEMPLATE_FILE, path.join(DIST_DIR, '404.html'));
console.log('✅ Created 404.html fallback.');
