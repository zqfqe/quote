
import { Quote } from "../types";
import { DAILY_QUOTES_POOL } from "../data/staticQuotes";
import { slugify } from "../utils";
import { AUTHOR_BIOS, TOPIC_DESCRIPTIONS } from "../data/metadata"; // Import metadata
import Fuse from 'fuse.js';

// Helper to get random image based on seed
const getImageUrl = (seed: string) => `https://picsum.photos/seed/${seed}/800/600?grayscale&blur=2`;

// Helper to find the real key from a slug
// e.g. "steve-jobs" -> "Steve Jobs"
const findKeyBySlug = (source: Record<string, any>, slug: string): string | undefined => {
  const normalizedSlug = slug.toLowerCase();
  // 1. Direct check (optimization)
  if (source[slug]) return slug;
  
  // 2. Iterate keys
  const keys = Object.keys(source);
  return keys.find(key => slugify(key) === normalizedSlug);
};

// Helper to process raw data record into Quote array
const processQuotes = (source: Record<string, { text: string; author: string }[] | { text: string; author: string }>, categoryType: string, specificKey?: string): Quote[] => {
  let entries = Object.entries(source);
  
  // If a specific key was found (via slug matching), filter for only that one
  if (specificKey) {
    entries = entries.filter(([k]) => k === specificKey);
  }

  return entries.flatMap(([key, value]) => {
    const catName = key;
    
    // Handle Array
    if (Array.isArray(value)) {
      return value.map((q, index) => ({
        id: `${categoryType}_${slugify(key)}_${index}`,
        text: q.text,
        author: q.author,
        category: catName
      }));
    }
    // Handle Single Object
    return [{
      id: `${categoryType}_${slugify(key)}`,
      text: value.text,
      author: value.author,
      category: catName
    }];
  });
};

export const fetchDailyQuote = async (): Promise<Quote> => {
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24);
  const quoteIndex = dayOfYear % DAILY_QUOTES_POOL.length;
  const quote = DAILY_QUOTES_POOL[quoteIndex] || DAILY_QUOTES_POOL[0];

  return {
    ...quote,
    imageUrl: getImageUrl(quote.id)
  };
};

// Return type updated to include optional bio
export const fetchQuoteDetail = async (type: string, sourceSlug: string, quoteSlug: string): Promise<{ quote: Quote | null, related: Quote[], bio?: string }> => {
  let sourceModule;
  let sourceData;

  try {
    switch (type) {
      case 'movie': sourceModule = await import('../data/quotesMovies'); sourceData = sourceModule.MOVIE_QUOTES; break;
      case 'tv': sourceModule = await import('../data/quotesTV'); sourceData = sourceModule.TV_QUOTES; break;
      case 'game': sourceModule = await import('../data/quotesGames'); sourceData = sourceModule.GAME_QUOTES; break;
      case 'book': sourceModule = await import('../data/quotesBooks'); sourceData = sourceModule.BOOK_QUOTES; break;
      case 'anime': sourceModule = await import('../data/quotesAnime'); sourceData = sourceModule.ANIME_QUOTES; break;
      case 'lyrics': sourceModule = await import('../data/quotesLyrics'); sourceData = sourceModule.LYRICS_QUOTES; break;
      case 'poetry': sourceModule = await import('../data/quotesPoetry'); sourceData = sourceModule.POETRY_QUOTES; break;
      case 'proverb': sourceModule = await import('../data/quotesProverbs'); sourceData = sourceModule.PROVERB_QUOTES; break;
      case 'topic': sourceModule = await import('../data/quotesTopics'); sourceData = sourceModule.TOPIC_QUOTES; break;
      case 'author': sourceModule = await import('../data/quotesAuthors'); sourceData = sourceModule.AUTHOR_QUOTES; break;
      default: return { quote: null, related: [] };
    }

    const matchedKey = findKeyBySlug(sourceData, sourceSlug);
    if (!matchedKey) return { quote: null, related: [] };

    const allQuotesForSource = processQuotes(sourceData, type, matchedKey);
    
    // Find specific quote by matching the slugified text
    const targetQuote = allQuotesForSource.find(q => slugify(q.text) === quoteSlug);
    
    if (!targetQuote) return { quote: null, related: [] };

    // Get related quotes (others from same source, excluding the target)
    const related = allQuotesForSource.filter(q => q.id !== targetQuote.id).slice(0, 6);

    // Metadata Retrieval Strategy
    let bio: string | undefined = undefined;
    
    // 1. If it's an Author type, fetch Author Bio
    if (type === 'author') {
        const authorName = targetQuote.author;
        bio = AUTHOR_BIOS[authorName]; // Direct lookup
    } 
    // 2. If it's a Topic type, fetch Topic Description
    else if (type === 'topic') {
        const topicName = targetQuote.category;
        bio = TOPIC_DESCRIPTIONS[topicName];
    }
    // 3. Fallback for mixed types (e.g. if we add bio data for movies later)
    else {
        // Can add more lookups here later (e.g. MOVIE_SUMMARIES)
    }

    return { 
      quote: {
        ...targetQuote,
        imageUrl: getImageUrl(targetQuote.id)
      }, 
      related: related.map(q => ({...q, imageUrl: getImageUrl(q.id)})),
      bio // Return the bio/description
    };

  } catch (error) {
    console.error("Error fetching quote detail:", error);
    return { quote: null, related: [] };
  }
};

export const fetchQuotesByQuery = async (query: string, type: 'search' | 'author' | 'topic' | 'movie' | 'tv' | 'game' | 'book' | 'proverb' | 'lyrics' | 'anime' | 'poetry'): Promise<Quote[]> => {
  if (!query) return [];

  const searchTerms = query.split('|').map(t => t.trim());
  const isMultiSearch = searchTerms.length > 1;
  const normalizedQuery = searchTerms[0];

  let rawData: Quote[] = [];
  let matchedKey: string | undefined;

  try {
    let sourceModule;
    let sourceData;

    switch (type) {
      case 'movie':
        sourceModule = await import('../data/quotesMovies');
        sourceData = sourceModule.MOVIE_QUOTES;
        matchedKey = findKeyBySlug(sourceData, normalizedQuery);
        rawData = processQuotes(sourceData, 'movie', matchedKey);
        break;
      case 'tv':
        sourceModule = await import('../data/quotesTV');
        sourceData = sourceModule.TV_QUOTES;
        matchedKey = findKeyBySlug(sourceData, normalizedQuery);
        rawData = processQuotes(sourceData, 'tv', matchedKey);
        break;
      case 'game':
        sourceModule = await import('../data/quotesGames');
        sourceData = sourceModule.GAME_QUOTES;
        matchedKey = findKeyBySlug(sourceData, normalizedQuery);
        rawData = processQuotes(sourceData, 'game', matchedKey);
        break;
      case 'book':
        sourceModule = await import('../data/quotesBooks');
        sourceData = sourceModule.BOOK_QUOTES;
        matchedKey = findKeyBySlug(sourceData, normalizedQuery);
        rawData = processQuotes(sourceData, 'book', matchedKey);
        break;
      case 'anime':
        sourceModule = await import('../data/quotesAnime');
        sourceData = sourceModule.ANIME_QUOTES;
        matchedKey = findKeyBySlug(sourceData, normalizedQuery);
        rawData = processQuotes(sourceData, 'anime', matchedKey);
        break;
      case 'lyrics':
        sourceModule = await import('../data/quotesLyrics');
        sourceData = sourceModule.LYRICS_QUOTES;
        matchedKey = findKeyBySlug(sourceData, normalizedQuery);
        rawData = processQuotes(sourceData, 'lyrics', matchedKey);
        break;
      case 'poetry':
        sourceModule = await import('../data/quotesPoetry');
        sourceData = sourceModule.POETRY_QUOTES;
        matchedKey = findKeyBySlug(sourceData, normalizedQuery);
        rawData = processQuotes(sourceData, 'poetry', matchedKey);
        break;
      case 'proverb':
        sourceModule = await import('../data/quotesProverbs');
        sourceData = sourceModule.PROVERB_QUOTES;
        matchedKey = findKeyBySlug(sourceData, normalizedQuery);
        rawData = processQuotes(sourceData, 'proverb', matchedKey);
        break;
      case 'topic':
        sourceModule = await import('../data/quotesTopics');
        sourceData = sourceModule.TOPIC_QUOTES;
        matchedKey = findKeyBySlug(sourceData, normalizedQuery);
        rawData = processQuotes(sourceData, 'topic', matchedKey);
        break;
      case 'author':
        sourceModule = await import('../data/quotesAuthors');
        sourceData = sourceModule.AUTHOR_QUOTES;
        matchedKey = findKeyBySlug(sourceData, normalizedQuery);
        rawData = processQuotes(sourceData, 'author', matchedKey);
        break;
      
      case 'search':
      default:
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

  if (matchedKey) {
    return rawData.map(q => ({
        ...q,
        imageUrl: q.imageUrl || getImageUrl(q.id)
    }));
  }

  let results: Quote[] = [];

  if (isMultiSearch) {
    results = rawData.filter(quote => {
      const textLower = quote.text.toLowerCase();
      const authorLower = quote.author.toLowerCase();
      const categoryLower = quote.category.toLowerCase();

      return searchTerms.some(term => {
        const t = term.toLowerCase();
        return categoryLower.includes(t) || authorLower.includes(t) || textLower.includes(t);
      });
    });
  } else {
    let keys = ['text', 'author', 'category'];
    if (type !== 'search') {
      keys = ['category', 'author'];
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

/**
 * Calculates "Spider Web" connections for SEO lateral linking.
 * 
 * Logic:
 * - If viewing a Topic: Find Authors who have quotes in this topic.
 * - If viewing an Author: Find Topics that this author has been quoted in (Reverse lookup in TOPIC_QUOTES).
 */
export const fetchRelatedEntities = async (currentType: string, currentName: string, currentQuotes: Quote[]): Promise<{ name: string, type: string, count: number, slug: string }[]> => {
  // 1. TOPIC PAGE: Find Top Authors
  if (currentType === 'topic') {
    const authorCounts: Record<string, number> = {};
    currentQuotes.forEach(q => {
      const auth = q.author;
      if (auth) authorCounts[auth] = (authorCounts[auth] || 0) + 1;
    });
    
    // Sort by frequency
    return Object.entries(authorCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 8) // Top 8 Authors
      .map(([name, count]) => ({ name, type: 'author', count, slug: slugify(name) }));
  }

  // 2. AUTHOR/MEDIA PAGE: Find Related Topics (Reverse Lookup)
  if (['author', 'movie', 'book', 'tv'].includes(currentType)) {
    try {
        const { TOPIC_QUOTES } = await import('../data/quotesTopics');
        const relatedTopics: { name: string, count: number, slug: string }[] = [];
        
        const targetNameSlug = slugify(currentName);

        Object.entries(TOPIC_QUOTES).forEach(([topic, quotes]) => {
            // Count how many times the current author/movie appears in this topic
            const count = quotes.filter(q => slugify(q.author) === targetNameSlug).length;

            if (count > 0) {
                relatedTopics.push({ name: topic, count, slug: slugify(topic) });
            }
        });

        return relatedTopics
            .sort((a, b) => b.count - a.count)
            .slice(0, 12) // Top 12 Topics
            .map(t => ({ ...t, type: 'topic' }));
    } catch (e) {
        console.error("Failed to load related topics for spider web", e);
        return [];
    }
  }

  return [];
};
