
import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link, useSearchParams } from 'react-router-dom';
import { Quote, DataStatus } from '../types';
import { fetchQuotesByQuery } from '../services/geminiService';
import QuoteCard from '../components/QuoteCard';
import SEO from '../components/SEO';
import { Loader2, ArrowRight } from 'lucide-react';

interface SearchResultsProps {
  favorites: string[];
  toggleFavorite: (q: Quote) => void;
}

const ITEMS_PER_PAGE = 24;

const SearchResults: React.FC<SearchResultsProps> = ({ favorites, toggleFavorite }) => {
  // Support both new Path params and legacy Query params for backward compatibility
  const params = useParams();
  const [searchParams] = useSearchParams();
  
  // Prefer path params, fallback to query params
  // decodeURIComponent is generally handled by useParams automatically, but good for safety if manual parsing
  const rawQuery = params.query || searchParams.get('q') || '';
  const rawType = params.type || searchParams.get('type') || 'search';

  const query = decodeURIComponent(rawQuery);
  const type = rawType as 'search' | 'author' | 'topic' | 'movie' | 'tv' | 'game' | 'book' | 'proverb' | 'lyrics' | 'anime' | 'poetry';

  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [status, setStatus] = useState<DataStatus>(DataStatus.IDLE);
  const observerTarget = useRef<HTMLDivElement>(null);

  // Fetch Data
  useEffect(() => {
    const fetchData = async () => {
      setStatus(DataStatus.LOADING);
      // Reset visible count when query changes
      setVisibleCount(ITEMS_PER_PAGE);
      const results = await fetchQuotesByQuery(query, type);
      setQuotes(results);
      setStatus(DataStatus.SUCCESS);
    };

    if (query) {
      fetchData();
    }
  }, [query, type]);

  // Infinite Scroll Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((prev) => Math.min(prev + ITEMS_PER_PAGE, quotes.length));
        }
      },
      { threshold: 0.1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [quotes.length]);

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

  // Programmatic SEO: Generate unique intro text based on type/query
  const getIntroText = () => {
    const qCap = query.charAt(0).toUpperCase() + query.slice(1);
    if (quotes.length === 0) return null;

    switch (type) {
      case 'author':
        return `Discover a curated collection of ${quotes.length}+ quotes by **${qCap}**. Known for their profound impact, ${qCap}'s words continue to inspire, motivate, and provoke thought. Explore their best sayings below.`;
      case 'topic':
        return `Looking for wisdom about **${qCap}**? We have compiled ${quotes.length}+ of the best quotes, sayings, and proverbs about ${qCap} to help you find the inspiration you need today.`;
      case 'movie':
        return `Relive the magic of **${qCap}**. Browse our collection of ${quotes.length}+ memorable lines, dialogues, and monologues from this classic movie.`;
      case 'book':
        return `Dive into the world of **${qCap}**. Here are ${quotes.length}+ famous quotes and excerpts that capture the essence of this literary masterpiece.`;
      case 'tv':
        return `From dramatic moments to hilarious one-liners, enjoy ${quotes.length}+ iconic quotes from the TV show **${qCap}**.`;
      default:
        return `Browse our extensive database for quotes matching "**${qCap}**". Whether you are looking for inspiration, humor, or wisdom, you'll find it here.`;
    }
  };

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

  // Contextual Linking Helper (Updated to new URL structure)
  const getRelatedLinks = () => {
    switch (type) {
      case 'movie':
      case 'tv':
        return [
          { label: 'Action Quotes', url: '/quotes/topic/Action' },
          { label: 'Classic Movies', url: '/quotes/topic/Classic' },
          { label: 'Funny Lines', url: '/quotes/topic/Funny' }
        ];
      case 'book':
      case 'poetry':
      case 'author':
        return [
          { label: 'Wisdom', url: '/quotes/topic/Wisdom' },
          { label: 'Success Quotes', url: '/quotes/topic/Success' },
          { label: 'Philosophy', url: '/quotes/topic/Philosophy' }
        ];
      case 'anime':
      case 'game':
        return [
          { label: 'Adventure', url: '/quotes/topic/Adventure' },
          { label: 'Courage', url: '/quotes/topic/Courage' },
          { label: 'Friendship', url: '/quotes/topic/Friendship' }
        ];
      default:
        return [
          { label: 'Life Quotes', url: '/quotes/topic/Life' },
          { label: 'Love Quotes', url: '/quotes/topic/Love' },
          { label: 'Wisdom Quotes', url: '/quotes/topic/Wisdom' }
        ];
    }
  };

  const visibleQuotes = quotes.slice(0, visibleCount);
  const relatedLinks = getRelatedLinks();

  // Structured Data with @graph to include CollectionPage, BreadcrumbList, AND Person (if author)
  const graph: any[] = [
    {
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
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://maximusquotes.org"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": type.charAt(0).toUpperCase() + type.slice(1),
          // Using clean URL
          "item": `https://maximusquotes.org/quotes/${type}` 
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": query,
          "item": `https://maximusquotes.org/quotes/${type}/${encodeURIComponent(query)}`
        }
      ]
    }
  ];

  // Inject Person Schema for Author Pages to boost Knowledge Graph signals
  if (type === 'author') {
    graph.push({
      "@type": "Person",
      "name": query,
      "description": `Quotes and wisdom by ${query}.`,
      "url": `https://maximusquotes.org/quotes/author/${encodeURIComponent(query)}`
    });
  }

  const schema = {
    "@context": "https://schema.org",
    "@graph": graph
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <SEO 
        title={seo.title}
        description={seo.desc}
        schema={schema}
        noindex={status === DataStatus.SUCCESS && quotes.length === 0}
      />

      <div className="mb-10 text-center max-w-3xl mx-auto">
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
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mt-4 mb-6">{getDisplayTitle()}</h1>
        
        {/* Dynamic Content Description (Programmatic SEO) */}
        {status === DataStatus.SUCCESS && quotes.length > 0 && (
          <p className="text-gray-600 text-lg leading-relaxed">
            {getIntroText()?.split('**').map((part, i) => 
              i % 2 === 1 ? <strong key={i} className="font-semibold text-gray-800">{part}</strong> : part
            )}
          </p>
        )}
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

      {/* Masonry Layout for Quotes - Lazy Rendered */}
      <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
        {visibleQuotes.map((quote) => (
          <QuoteCard
            key={quote.id}
            quote={quote}
            isFavorite={favorites.includes(quote.id)}
            onToggleFavorite={toggleFavorite}
          />
        ))}
      </div>

      {/* Infinite Scroll Sensor */}
      {status === DataStatus.SUCCESS && visibleCount < quotes.length && (
        <div ref={observerTarget} className="py-10 flex justify-center">
          <Loader2 className="w-6 h-6 text-gray-400 animate-spin" />
        </div>
      )}

      {/* Internal Linking Suggestion (SEO) - Contextual */}
      {status === DataStatus.SUCCESS && quotes.length > 0 && (
        <div className="mt-20 border-t border-gray-100 pt-10 text-center">
          <p className="text-gray-500 mb-4">Explore related categories</p>
          <div className="flex flex-wrap justify-center gap-4">
             {relatedLinks.map((link, idx) => (
               <Link 
                 key={idx}
                 to={link.url} 
                 className="px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-full text-sm text-gray-700 transition"
               >
                 {link.label}
               </Link>
             ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
