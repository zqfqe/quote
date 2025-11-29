import { Quote } from "../types";
import { STATIC_QUOTES } from "../data/staticQuotes";

// Helper to get random image based on seed
const getImageUrl = (seed: string) => `https://picsum.photos/seed/${seed}/800/600?grayscale&blur=2`;

export const fetchDailyQuote = async (): Promise<Quote> => {
  // Instant response for local data
  
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
  // No delay for local static mode

  if (!query) return [];

  const normalizedQuery = query.toLowerCase().trim();
  
  // Strict filtering against the huge database
  let results = STATIC_QUOTES.filter(quote => {
    const text = quote.text.toLowerCase();
    const author = quote.author.toLowerCase();
    const category = quote.category.toLowerCase();

    // Strategy: Strict Match Priority
    
    switch (type) {
      case 'author':
        // Check Author Name specifically
        return author === normalizedQuery || author.includes(normalizedQuery);
      
      case 'topic':
        // Check Category specifically. 
        // If no direct category match, check if the text contains the topic word (e.g. "Love" inside the quote)
        return category === normalizedQuery || (category === 'general' && text.includes(normalizedQuery));
      
      case 'movie':
      case 'tv':
      case 'game':
      case 'book':
      case 'anime':
      case 'lyrics':
      case 'poetry':
      case 'proverb':
        // For media, the 'category' field usually holds the Title (e.g. "The Godfather")
        return category === normalizedQuery || category.includes(normalizedQuery);
      
      case 'search':
      default:
        // Global search
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