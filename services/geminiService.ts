import { Quote } from "../types";
import { STATIC_QUOTES } from "../data/staticQuotes";

// Utility to simulate network delay for better UX feel
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Helper to get random image based on seed
const getImageUrl = (seed: string) => `https://picsum.photos/seed/${seed}/800/600?grayscale&blur=2`;

export const fetchDailyQuote = async (): Promise<Quote> => {
  // Simulate API call
  await delay(300); 

  // Pick a random quote from the static list based on the day of the year
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24);
  // Ensure we always have a valid index even if database size changes
  const quoteIndex = dayOfYear % STATIC_QUOTES.length;
  const quote = STATIC_QUOTES[quoteIndex] || STATIC_QUOTES[0];

  return {
    ...quote,
    imageUrl: getImageUrl(quote.id)
  };
};

export const fetchQuotesByQuery = async (query: string, type: 'search' | 'author' | 'topic' | 'movie' | 'tv' | 'game' | 'book' | 'proverb' | 'lyrics' | 'anime' | 'poetry'): Promise<Quote[]> => {
  await delay(300); // Simulate search time

  if (!query) return [];

  const normalizedQuery = query.toLowerCase().trim();
  
  let results = STATIC_QUOTES.filter(quote => {
    const text = quote.text.toLowerCase();
    const author = quote.author.toLowerCase();
    const category = quote.category.toLowerCase();

    // Strict matching logic based on type to ensure accuracy
    switch (type) {
      case 'author':
        // Strict author match preferred, but partial allowed
        return author === normalizedQuery || author.includes(normalizedQuery);
      
      case 'topic':
        // Topic Super-Search:
        // 1. Matches strictly if the category matches (e.g. Category: "Hope")
        // 2. Fallback: If the quote TEXT contains the topic word (e.g. text says "hope is a good thing")
        return category === normalizedQuery || 
               category.includes(normalizedQuery) ||
               text.includes(` ${normalizedQuery} `) || // match whole words ideally
               text.includes(normalizedQuery);
      
      case 'movie':
      case 'tv':
      case 'game':
      case 'book':
      case 'anime':
      case 'lyrics':
      case 'poetry':
      case 'proverb':
        // For media, we check category (where we store the title) or author
        return category.includes(normalizedQuery) || author.includes(normalizedQuery);
      
      case 'search':
      default:
        // Global search matches everything
        return text.includes(normalizedQuery) || 
               author.includes(normalizedQuery) || 
               category.includes(normalizedQuery);
    }
  });

  // Visual enhancement: Add random images to them if they don't have one
  return results.map(q => ({
    ...q,
    imageUrl: q.imageUrl || getImageUrl(q.id)
  }));
};