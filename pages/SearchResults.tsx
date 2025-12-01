
import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Quote, DataStatus } from '../types';
import { fetchQuotesByQuery } from '../services/geminiService';
import QuoteCard from '../components/QuoteCard';
import SEO from '../components/SEO';
import { Loader2, ArrowRight } from 'lucide-react';

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

  // SEO: Dynamic Title & Description generation
  const getSEODetails = () => {
    const qCap = query.charAt(0).toUpperCase() + query.slice(1);
    switch (type) {
      case 'author':
        return {
          title: `Best ${qCap} Quotes & Sayings - Maximus Quotes`,
          desc: `Discover the most inspiring quotes by ${qCap}. A curated collection of wisdom, thoughts, and sayings by ${qCap} on Maximus Quotes.`
        };
      case 'topic':
        return {
          title: `Top ${qCap} Quotes & Inspiration - Maximus Quotes`,
          desc: `Looking for quotes about ${qCap}? Browse our extensive collection of the best ${qCap} quotes to inspire and motivate you.`
        };
      case 'book':
        return {
          title: `Famous Quotes from ${qCap} - Maximus Quotes`,
          desc: `Read the most memorable lines and quotes from the book ${qCap}.`
        };
      case 'movie':
        return {
          title: `Classic Quotes from ${qCap} (Movie) - Maximus Quotes`,
          desc: `Relive the best moments with these quotes from the movie ${qCap}.`
        };
      default:
        return {
          title: `${qCap} Quotes - Search Results - Maximus Quotes`,
          desc: `Search results for "${query}" on Maximus Quotes. Discover wisdom and inspiration.`
        };
    }
  };

  const seo = getSEODetails();

  const getDisplayTitle = () => {
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
    return `Results for "${query}"`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <SEO 
        title={seo.title}
        description={seo.desc}
        schema={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": seo.title,
          "description": seo.desc,
          "mainEntity": {
            "@type": "ItemList",
            "itemListElement": quotes.slice(0, 10).map((q, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "item": {
                "@type": "Quotation",
                "text": q.text,
                "author": { "@type": "Person", "name": q.author }
              }
            }))
          }
        }}
      />

      <div className="mb-10 text-center">
        {/* Breadcrumb for internal linking structure */}
        <div className="flex items-center justify-center text-sm text-gray-500 mb-4 space-x-2">
          <Link to="/" className="hover:text-brand-600">Home</Link>
          <span>/</span>
          <span className="capitalize">{type}</span>
          <span>/</span>
          <span className="font-medium text-gray-900">{query}</span>
        </div>

        <span className="text-sm font-semibold text-brand-600 tracking-wider uppercase bg-brand-50 px-3 py-1 rounded-full">
            {type === 'tv' ? 'TV Show' : type === 'game' ? 'Video Game' : type}
        </span>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mt-4">{getDisplayTitle()}</h1>
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
          <Link to="/" className="inline-flex items-center mt-6 text-brand-600 hover:text-brand-700 font-medium">
            Back to Home <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
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

      {/* Internal Linking Suggestion (SEO) */}
      {status === DataStatus.SUCCESS && quotes.length > 0 && (
        <div className="mt-20 border-t border-gray-100 pt-10 text-center">
          <p className="text-gray-500 mb-4">Explore more related categories</p>
          <div className="flex flex-wrap justify-center gap-4">
             <Link to="/explore?type=topic&q=Life" className="px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-full text-sm text-gray-700 transition">Life Quotes</Link>
             <Link to="/explore?type=topic&q=Love" className="px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-full text-sm text-gray-700 transition">Love Quotes</Link>
             <Link to="/explore?type=topic&q=Wisdom" className="px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-full text-sm text-gray-700 transition">Wisdom Quotes</Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
