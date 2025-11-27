import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Quote, DataStatus } from '../types';
import { fetchQuotesByQuery } from '../services/geminiService';
import QuoteCard from '../components/QuoteCard';
import { Loader2 } from 'lucide-react';

interface SearchResultsProps {
  favorites: string[];
  toggleFavorite: (q: Quote) => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({ favorites, toggleFavorite }) => {
  const [searchParams] = useSearchParams();
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [status, setStatus] = useState<DataStatus>(DataStatus.IDLE);
  
  const query = searchParams.get('q') || '';
  const type = (searchParams.get('type') as 'search' | 'author' | 'topic' | 'movie' | 'tv' | 'game' | 'book' | 'proverb' | 'lyrics' | 'anime' | 'poetry') || 'search';

  useEffect(() => {
    const fetchData = async () => {
      setStatus(DataStatus.LOADING);
      const results = await fetchQuotesByQuery(query, type);
      setQuotes(results);
      setStatus(DataStatus.SUCCESS);
    };

    if (query) {
      fetchData();
    }
  }, [query, type]);

  const getTitle = () => {
    if (type === 'author') return `Quotes by ${query}`;
    if (type === 'topic') return `${query} Quotes`;
    if (type === 'movie') return `Quotes from ${query}`;
    if (type === 'tv') return `Quotes from ${query}`;
    if (type === 'game') return `Quotes from ${query}`;
    if (type === 'book') return `Quotes from ${query}`;
    if (type === 'proverb') return `${query}`;
    if (type === 'lyrics') return `Lyrics by ${query}`;
    if (type === 'anime') return `Quotes from ${query}`;
    if (type === 'poetry') return `Lines from ${query}`;
    return `Search Results for "${query}"`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10 text-center">
        <span className="text-sm font-semibold text-brand-600 tracking-wider uppercase bg-brand-50 px-3 py-1 rounded-full">
            {type === 'tv' ? 'TV Show' : type === 'game' ? 'Video Game' : type}
        </span>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mt-4">{getTitle()}</h1>
      </div>

      {status === DataStatus.LOADING && (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="w-10 h-10 text-brand-600 animate-spin mb-4" />
          <p className="text-gray-500">Curating the best quotes for you...</p>
        </div>
      )}

      {status === DataStatus.SUCCESS && quotes.length === 0 && (
        <div className="text-center py-20 bg-gray-50 rounded-2xl">
          <h3 className="text-xl font-medium text-gray-700">No quotes found.</h3>
          <p className="text-gray-500 mt-2">Try searching for a different term.</p>
        </div>
      )}

      {/* Masonry Layout for Quotes */}
      <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
        {quotes.map((quote) => (
          <QuoteCard
            key={quote.id}
            quote={quote}
            isFavorite={favorites.includes(quote.id)}
            onToggleFavorite={toggleFavorite}
          />
        ))}
      </div>
    </div>
  );
};

export default SearchResults;