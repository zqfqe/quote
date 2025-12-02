
import { Quote } from "../types";
import { DAILY_QUOTES_POOL } from "../data/staticQuotes";
import Fuse from 'fuse.js';

// Helper to get random image based on seed
const getImageUrl = (seed: string) => `https://picsum.photos/seed/${seed}/800/600?grayscale&blur=2`;

// Helper to process raw data record into Quote array
const processQuotes = (source: Record<string, { text: string; author: string }[] | { text: string; author: string }>, categoryType: string): Quote[] => {
  return Object.entries(source).flatMap(([key, value]) => {
    // Determine category name (Use the key as the specific category/title)
    const catName = key;
    
    // Handle Array
    if (Array.isArray(value)) {
      return value.map((q, index) => ({
        id: `${categoryType}_${key.replace(/\s+/g, '_')}_${index}`,
        text: q.text,
        author: q.author,
        category: catName
      }));
    }
    // Handle Single Object
    return [{
      id: `${categoryType}_${key.replace(/\s+/g, '_')}`,
      text: value.text,
      author: value.author,
      category: catName
    }];
  });
};

export const fetchDailyQuote = async (): Promise<Quote> => {
  // Use the lightweight pool for instant homepage load
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24);
  const quoteIndex = dayOfYear % DAILY_QUOTES_POOL.length;
  const quote = DAILY_QUOTES_POOL[quoteIndex] || DAILY_QUOTES_POOL[0];

  return {
    ...quote,
    imageUrl: getImageUrl(quote.id)
  };
};

export const fetchQuotesByQuery = async (query: string, type: 'search' | 'author' | 'topic' | 'movie' | 'tv' | 'game' | 'book' | 'proverb' | 'lyrics' | 'anime' | 'poetry'): Promise<Quote[]> => {
  if (!query) return [];

  // Support multi-keyword search with '|' separator (e.g. "Love|Romance|Heart")
  const searchTerms = query.split('|').map(t => t.trim());
  const isMultiSearch = searchTerms.length > 1;
  const normalizedQuery = searchTerms[0]; // Use first term for single-search fallbacks

  let rawData: Quote[] = [];

  try {
    // DYNAMIC IMPORTS (Code Splitting)
    // Only load the specific database file needed for the query
    switch (type) {
      case 'movie':
        const { MOVIE_QUOTES } = await import('../data/quotesMovies');
        rawData = processQuotes(MOVIE_QUOTES, 'movie');
        break;
      case 'tv':
        const { TV_QUOTES } = await import('../data/quotesTV');
        rawData = processQuotes(TV_QUOTES, 'tv');
        break;
      case 'game':
        const { GAME_QUOTES } = await import('../data/quotesGames');
        rawData = processQuotes(GAME_QUOTES, 'game');
        break;
      case 'book':
        const { BOOK_QUOTES } = await import('../data/quotesBooks');
        rawData = processQuotes(BOOK_QUOTES, 'book');
        break;
      case 'anime':
        const { ANIME_QUOTES } = await import('../data/quotesAnime');
        rawData = processQuotes(ANIME_QUOTES, 'anime');
        break;
      case 'lyrics':
        const { LYRICS_QUOTES } = await import('../data/quotesLyrics');
        rawData = processQuotes(LYRICS_QUOTES, 'lyrics');
        break;
      case 'poetry':
        const { POETRY_QUOTES } = await import('../data/quotesPoetry');
        rawData = processQuotes(POETRY_QUOTES, 'poetry');
        break;
      case 'proverb':
        const { PROVERB_QUOTES } = await import('../data/quotesProverbs');
        rawData = processQuotes(PROVERB_QUOTES, 'proverb');
        break;
      case 'topic':
        const { TOPIC_QUOTES } = await import('../data/quotesTopics');
        rawData = processQuotes(TOPIC_QUOTES, 'topic');
        break;
      case 'author':
        const { AUTHOR_QUOTES } = await import('../data/quotesAuthors');
        rawData = processQuotes(AUTHOR_QUOTES, 'author');
        break;
      
      case 'search':
      default:
        // For global search, load multiple sources in parallel
        const [
          { TOPIC_QUOTES: topics },
          { AUTHOR_QUOTES: authors },
          { MOVIE_QUOTES: movies },
          { BOOK_QUOTES: books }
        ] = await Promise.all([
          import('../data/quotesTopics'),
          import('../data/quotesAuthors'),
          import('../data/quotesMovies'),
          import('../data/quotesBooks')
        ]);
        
        rawData = [
          ...processQuotes(topics, 'topic'),
          ...processQuotes(authors, 'author'),
          ...processQuotes(movies, 'movie'),
          ...processQuotes(books, 'book')
        ];
        break;
    }
  } catch (error) {
    console.error("Error loading quote data:", error);
    return [];
  }

  // --- FILTERING LOGIC ---

  let results: Quote[] = [];

  if (isMultiSearch) {
    // OR Logic: Return quote if it matches ANY of the search terms
    // We use standard inclusion instead of Fuse for speed and predictability on large sets
    results = rawData.filter(quote => {
      const textLower = quote.text.toLowerCase();
      const authorLower = quote.author.toLowerCase();
      const categoryLower = quote.category.toLowerCase();

      return searchTerms.some(term => {
        const t = term.toLowerCase();
        // Check if term matches category, author, or text
        return categoryLower.includes(t) || authorLower.includes(t) || textLower.includes(t);
      });
    });
  } else {
    // Single Term Logic with Fuzzy Search
    
    // Configure Fuse options based on search type
    let keys = ['text', 'author', 'category'];
    if (type !== 'search') {
      keys = ['category', 'author']; // Prioritize the Item Name (e.g., "The Godfather")
    }

    const fuse = new Fuse(rawData, {
      keys: keys,
      threshold: 0.3,
      distance: 100,
      ignoreLocation: true,
      minMatchCharLength: 2,
      shouldSort: true
    });

    const fuseResults = fuse.search(normalizedQuery);
    results = fuseResults.map(result => result.item);

    // Fallback: Strict inclusion if fuzzy fails
    if (results.length === 0) {
      const lowerQuery = normalizedQuery.toLowerCase();
      results = rawData.filter(quote => 
        quote.text.toLowerCase().includes(lowerQuery) ||
        quote.author.toLowerCase().includes(lowerQuery) ||
        quote.category.toLowerCase().includes(lowerQuery)
      );
    }
  }

  return results.map(q => ({
    ...q,
    imageUrl: q.imageUrl || getImageUrl(q.id)
  }));
};
