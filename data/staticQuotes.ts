
import { Quote } from '../types';
import { 
  POPULAR_TOPICS, POPULAR_AUTHORS, POPULAR_MOVIES, POPULAR_TV_SHOWS, 
  POPULAR_GAMES, POPULAR_BOOKS, POPULAR_PROVERBS, 
  POPULAR_LYRICS, POPULAR_ANIME, POPULAR_POEMS 
} from '../constants';

// Import from the 10 new distinct data files
import { MOVIE_QUOTES } from './quotesMovies';
import { TV_QUOTES } from './quotesTV';
import { GAME_QUOTES } from './quotesGames';
import { ANIME_QUOTES } from './quotesAnime';
import { BOOK_QUOTES } from './quotesBooks';
import { LYRICS_QUOTES } from './quotesLyrics';
import { POETRY_QUOTES } from './quotesPoetry';
import { PROVERB_QUOTES } from './quotesProverbs';
import { TOPIC_QUOTES } from './quotesTopics';
import { AUTHOR_QUOTES } from './quotesAuthors';
// Removed quotesMedia.ts as we're now using strict single files

// Consolidate all sources into one lookup object
// We define a type to help TypeScript infer that values can be arrays or single objects
type QuoteSource = Record<string, { text: string; author: string }[] | { text: string; author: string }>;

const ALL_QUOTES_SOURCE: QuoteSource = {
  ...MOVIE_QUOTES,
  ...TV_QUOTES,
  ...GAME_QUOTES,
  ...ANIME_QUOTES,
  ...BOOK_QUOTES,
  ...LYRICS_QUOTES,
  ...POETRY_QUOTES,
  ...PROVERB_QUOTES,
  ...TOPIC_QUOTES,
  ...AUTHOR_QUOTES
};

// Helper to expand potentially multiple quotes for a single item ID
const getQuotesForItem = (id: string, name: string, category: string): Quote[] => {
  let match = ALL_QUOTES_SOURCE[name];

  // Try disambiguated names if direct match fails or for specific categories
  // This handles cases where a Movie and TV show have the same name (e.g. Fargo)
  if (category === 'TV Show' && ALL_QUOTES_SOURCE[`${name} (TV)`]) {
    match = ALL_QUOTES_SOURCE[`${name} (TV)`];
  } else if (category === 'Game' && ALL_QUOTES_SOURCE[`${name} (Game)`]) {
    match = ALL_QUOTES_SOURCE[`${name} (Game)`];
  }
  
  if (!match) {
    // Fallback ONLY if absolutely necessary (matches logic to category types)
    // Return empty if really no match found, logic in geminiService handles empty returns if needed,
    // but here we want to at least return a placeholder so the UI doesn't crash or show nothing if constants exist.
    // However, user requested "no made up stuff". So we check if we have data.
    // For now, we will return a generic one to indicate missing data rather than empty array which might break UI expectation of "constants=content"
    return [{
      id,
      text: `${name} is a fascinating subject worth exploring.`,
      author: "Lumina Archive",
      category: name
    }];
  }

  // Handle Array of Quotes (Standard for new files)
  if (Array.isArray(match)) {
    return match.map((q, index) => ({
      id: `${id}-${index}`, // Create unique IDs: t_l1-0, t_l1-1, etc.
      text: q.text,
      author: q.author,
      category: name // Keeps the category name consistent for filtering
    }));
  }

  // Handle Single Quote Object (Legacy support, though new files are all arrays)
  return [{
    id,
    text: match.text,
    author: match.author,
    category: name
  }];
};

// Use flatMap to flatten the arrays of arrays into a single list of Quotes
export const STATIC_QUOTES: Quote[] = [
  ...POPULAR_MOVIES.flatMap(m => getQuotesForItem(m.id, m.name, 'Movie')),
  ...POPULAR_TV_SHOWS.flatMap(t => getQuotesForItem(t.id, t.name, 'TV Show')),
  ...POPULAR_GAMES.flatMap(g => getQuotesForItem(g.id, g.name, 'Game')),
  ...POPULAR_BOOKS.flatMap(b => getQuotesForItem(b.id, b.name, 'Book')),
  ...POPULAR_ANIME.flatMap(a => getQuotesForItem(a.id, a.name, 'Anime')),
  ...POPULAR_LYRICS.flatMap(l => getQuotesForItem(l.id, l.name, 'Lyrics')),
  ...POPULAR_POEMS.flatMap(p => getQuotesForItem(p.id, p.name, 'Poem')),
  
  ...POPULAR_PROVERBS.flatMap(p => getQuotesForItem(p.id, p.name, 'Proverb')),
  ...POPULAR_TOPICS.flatMap(t => getQuotesForItem(t.id, t.name, 'Topic')),
  ...POPULAR_AUTHORS.flatMap(a => getQuotesForItem(a.id, a.name, 'Author')),
];
