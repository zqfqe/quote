
import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link, useSearchParams } from 'react-router-dom';
import { Quote, DataStatus } from '../types';
import { fetchQuotesByQuery, fetchRelatedEntities } from '../services/geminiService';
import QuoteCard from '../components/QuoteCard';
import SEO from '../components/SEO';
import { Loader2, ArrowRight, User, BookOpen, Sparkles, Tag, Network, ListOrdered, Grid3X3, Crown, Trophy, Medal } from 'lucide-react';
import { unslugify, slugify } from '../utils';

interface SearchResultsProps {
  favorites: string[];
  toggleFavorite: (q: Quote) => void;
}

interface RelatedItem {
  name: string;
  type: string;
  count: number;
  slug: string;
}

const ITEMS_PER_PAGE = 24;

// --- 1. SEO: Rich Content Generator (Thin Content Fix) ---
const RichIntro: React.FC<{ query: string; type: string; count: number; authorName?: string }> = ({ query, type, count, authorName }) => {
  const qCap = query; // Assumes query is already formatted nicely in the parent component
  const authCap = authorName ? authorName : '';

  let content = <></>;

  switch (type) {
    case 'author':
      content = (
        <>
          <p className="text-gray-600 leading-relaxed mb-4">
            Welcome to the curated collection of <strong>{qCap}</strong> quotes. 
            Known for their profound impact on {count > 10 ? "literature and culture" : "their field"}, {qCap}'s words continue to resonate with readers around the world.
          </p>
          <p className="text-gray-500 text-sm">
            Whether you are seeking inspiration, wisdom, or a fresh perspective, these {count} selected quotes capture the essence of {qCap}'s thinking. 
            Browse, save your favorites, and share the wisdom.
          </p>
        </>
      );
      break;
    case 'topic':
      content = (
        <>
          <p className="text-gray-600 leading-relaxed mb-4">
            Explore our extensive library of quotes about <strong>{qCap}</strong>. 
            In life, understanding {query.toLowerCase()} is often the key to growth and happiness. 
            We have compiled {count} of the most powerful sayings and proverbs to help you reflect on this important subject.
          </p>
          <p className="text-gray-500 text-sm">
            From ancient philosophers to modern thought leaders, these perspectives on {qCap} offer timeless guidance.
          </p>
        </>
      );
      break;
    case 'book':
      content = (
        <>
          <p className="text-gray-600 leading-relaxed mb-4">
            Dive into the memorable lines from <strong>{qCap}</strong>{authCap ? ` by ${authCap}` : ''}. 
            Literature has the power to transport us, and this book is no exception. 
            Here are {count} of the most iconic quotes and excerpts that have captured the hearts of readers.
          </p>
        </>
      );
      break;
    case 'movie':
      content = (
        <>
          <p className="text-gray-600 leading-relaxed mb-4">
            Relive the magic of <strong>{qCap}</strong>. 
            Great cinema writes itself into our memories, and these {count} quotes represent the best dialogue, monologues, and one-liners from the film.
          </p>
        </>
      );
      break;
    case 'lyrics':
      content = (
        <>
          <p className="text-gray-600 leading-relaxed mb-4">
            The power of music meets the beauty of poetry. 
            Discover {count} of the most memorable lyrics by <strong>{qCap}</strong>. 
            These lines transcend the melody to stand alone as powerful words of emotion and storytelling.
          </p>
        </>
      );
      break;
    default:
      content = (
        <>
          <p className="text-gray-600 leading-relaxed mb-4">
            You are browsing results for <strong>"{qCap}"</strong>. 
            We found {count} unique quotes that match your interest. 
            Our database is constantly updated to bring you the most relevant and inspiring words from across history.
          </p>
        </>
      );
  }

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-6 mb-10 shadow-sm max-w-3xl mx-auto text-center md:text-left">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
        <div className="bg-brand-50 p-3 rounded-full shrink-0 hidden md:block">
          <Sparkles className="w-6 h-6 text-brand-600" />
        </div>
        <div>{content}</div>
      </div>
    </div>
  );
};

// --- 2. SEO: Smart Cross-Linking Component ---
const SmartCrossLink: React.FC<{ type: string; quote: Quote }> = ({ type, quote }) => {
  // Only show for media types where we can infer an author link
  if (['book', 'movie', 'lyrics', 'poetry'].includes(type)) {
    const authorName = quote.author;
    const linkUrl = `/quotes/author/${slugify(authorName)}`;
    
    return (
      <div className="flex justify-center mb-10">
        <Link 
          to={linkUrl}
          className="group flex items-center space-x-3 px-6 py-3 bg-white border border-gray-200 hover:border-brand-300 rounded-full shadow-sm hover:shadow-md transition-all"
        >
          <div className="bg-gray-100 group-hover:bg-brand-50 p-2 rounded-full transition-colors">
            <User className="w-4 h-4 text-gray-600 group-hover:text-brand-600" />
          </div>
          <div className="text-left">
            <span className="block text-xs text-gray-400 uppercase tracking-wider font-semibold">More from Creator</span>
            <span className="block text-sm font-bold text-gray-900 group-hover:text-brand-700">{authorName}</span>
          </div>
          <ArrowRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    );
  }
  
  return null;
};

// --- 3. SEO: Semantic Spider Web (Lateral Linking) ---
const SpiderWeb: React.FC<{ type: string; name: string; related: RelatedItem[] }> = ({ type, name, related }) => {
  if (!related || related.length === 0) return null;

  const title = type === 'topic' 
    ? `Top Voices on "${name}"`
    : `Common Themes by ${name}`;

  return (
    <div className="mt-20 border-t border-gray-100 pt-16">
      <div className="flex flex-col items-center text-center mb-8">
        <div className="bg-indigo-50 p-3 rounded-full mb-4">
          <Network className="w-6 h-6 text-indigo-600" />
        </div>
        <h3 className="text-2xl font-serif font-bold text-gray-900">{title}</h3>
        <p className="text-gray-500 mt-2 max-w-lg">
          Dive deeper into the semantic connections we've found in our library.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
        {related.map((item, idx) => (
          <Link 
            key={idx}
            to={`/quotes/${item.type}/${item.slug}`}
            className="group relative inline-flex items-center bg-white border border-gray-200 hover:border-indigo-300 px-5 py-3 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
          >
            <span className={`w-2 h-2 rounded-full mr-3 ${item.type === 'author' ? 'bg-purple-400' : 'bg-blue-400'}`}></span>
            <span className="font-medium text-gray-700 group-hover:text-indigo-700">{item.name}</span>
            <span className="ml-2 bg-gray-100 text-gray-400 text-xs py-0.5 px-2 rounded-md group-hover:bg-indigo-50 group-hover:text-indigo-500 transition-colors">
              {item.count}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};


const SearchResults: React.FC<SearchResultsProps> = ({ favorites, toggleFavorite }) => {
  const params = useParams();
  const [searchParams] = useSearchParams();
  
  // rawQuery is the slug from URL, e.g. "steve-jobs"
  const rawQuery = params.query || searchParams.get('q') || '';
  const rawType = params.type || searchParams.get('type') || 'search';
  const modeParams = params.mode || 'grid'; // 'best' or 'top' triggers listicle view

  const type = rawType as 'search' | 'author' | 'topic' | 'movie' | 'tv' | 'game' | 'book' | 'proverb' | 'lyrics' | 'anime' | 'poetry';
  const isListView = ['best', 'top', 'list'].includes(modeParams);

  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [status, setStatus] = useState<DataStatus>(DataStatus.IDLE);
  const [relatedEntities, setRelatedEntities] = useState<RelatedItem[]>([]);
  
  // displayName is the "Pretty" name (e.g. "Steve Jobs"). 
  // We initialize it with an unslugified version of the URL, but update it if we find exact data.
  const [displayName, setDisplayName] = useState(unslugify(rawQuery));
  
  const observerTarget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      setStatus(DataStatus.LOADING);
      setVisibleCount(ITEMS_PER_PAGE);
      setRelatedEntities([]); // Reset related

      // We pass the SLUG (rawQuery) to the service. The service handles looking up the real key.
      const results = await fetchQuotesByQuery(rawQuery, type);
      
      setQuotes(results);
      setStatus(DataStatus.SUCCESS);

      let resolvedName = unslugify(rawQuery);

      // Attempt to determine the "Real Name" from the data we got back
      if (results.length > 0) {
        if (type === 'author') {
            resolvedName = results[0].author;
        } else if (['topic', 'movie', 'book', 'tv', 'game'].includes(type)) {
            // For categories, the 'category' field in the quote usually holds the proper Title Case name
            resolvedName = results[0].category;
        }
      }
      setDisplayName(resolvedName);

      // --- FETCH SPIDER WEB LINKS ---
      if (results.length > 0) {
        const relations = await fetchRelatedEntities(type, resolvedName, results);
        setRelatedEntities(relations);
      }
    };

    if (rawQuery) {
      fetchData();
    }
  }, [rawQuery, type]);

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

  const getSEODetails = () => {
    const titleCap = displayName; // Use the resolved display name
    
    // SEO Title optimization for Listicle View
    if (isListView) {
        return {
            title: `Top ${Math.min(quotes.length, 50)}+ Best ${titleCap} Quotes (Ranked) - Maximus Quotes`,
            desc: `A curated list of the best ${titleCap} quotes, ranked and organized. Discover the most popular and inspiring sayings by ${titleCap}.`
        };
    }

    switch (type) {
      case 'author':
        return {
          title: `Best ${titleCap} Quotes & Sayings - Maximus Quotes`,
          desc: `Discover the most inspiring quotes by ${titleCap}. A curated collection of wisdom, thoughts, and sayings by ${titleCap} on Maximus Quotes.`
        };
      case 'topic':
        return {
          title: `Top ${titleCap} Quotes & Inspiration - Maximus Quotes`,
          desc: `Looking for quotes about ${titleCap}? Browse our extensive collection of the best ${titleCap} quotes to inspire and motivate you.`
        };
      case 'book':
        return {
          title: `Famous Quotes from ${titleCap} - Maximus Quotes`,
          desc: `Read the most memorable lines and quotes from the book ${titleCap}.`
        };
      case 'movie':
        return {
          title: `Classic Quotes from ${titleCap} (Movie) - Maximus Quotes`,
          desc: `Relive the best moments with these quotes from the movie ${titleCap}.`
        };
      default:
        return {
          title: `${titleCap} Quotes - Search Results - Maximus Quotes`,
          desc: `Search results for "${titleCap}" on Maximus Quotes. Discover wisdom and inspiration.`
        };
    }
  };

  // --- Dynamic FAQ Schema Generation ---
  const generateFAQ = () => {
    if (quotes.length === 0) return null;

    const faqEntities = [];
    const topQuotes = quotes.slice(0, 5); // Take top 5 for the answer list

    // Question 1: Best Quotes List (Rich Snippet optimized)
    let question1 = "";
    let answerText = `Here are some of the best ${displayName} quotes found in our collection: <ul>`;
    
    topQuotes.forEach(q => {
        // Simple HTML sanitization for the JSON-LD string
        const safeText = q.text.replace(/"/g, '&quot;');
        answerText += `<li>"${safeText}"</li>`;
    });
    answerText += `</ul>`;

    if (type === 'author') question1 = `What are the most famous quotes by ${displayName}?`;
    else if (type === 'topic') question1 = `What are the best quotes about ${displayName}?`;
    else if (type === 'movie') question1 = `What are the memorable lines from the movie ${displayName}?`;
    else if (type === 'book') question1 = `What are famous quotes from the book ${displayName}?`;
    else question1 = `What are popular quotes related to ${displayName}?`;

    faqEntities.push({
      "@type": "Question",
      "name": question1,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": answerText // HTML allowed in Google FAQ Schema
      }
    });

    // Question 2: Single Highlight
    if (topQuotes.length > 0) {
        const bestQuote = topQuotes[0];
        let question2 = "";
        let answer2 = "";
        const safeQuoteText = bestQuote.text.replace(/"/g, '\\"');

        if (type === 'author') {
            question2 = `What is a short inspirational quote by ${displayName}?`;
            answer2 = `One of ${displayName}'s most inspiring short quotes is: "${safeQuoteText}"`;
        } else {
            question2 = `What is a famous saying about ${displayName}?`;
            answer2 = `A popular saying about ${displayName} is: "${safeQuoteText}"`;
        }

        faqEntities.push({
            "@type": "Question",
            "name": question2,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": answer2
            }
        });
    }

    return {
      "@type": "FAQPage",
      "mainEntity": faqEntities
    };
  };

  const seo = getSEODetails();
  const visibleQuotes = quotes.slice(0, visibleCount);

  // Helper to determine the primary author name for the Intro/CrossLink
  const primaryAuthor = quotes.length > 0 ? quotes[0].author : undefined;

  const graph: any[] = [
    {
      "@type": "CollectionPage",
      "name": seo.title,
      "description": seo.desc,
      "mainEntity": {
        "@type": "ItemList",
        // Crucial for Listicle SEO: Ascending order tells Google this is a ranked list
        "itemListOrder": isListView ? "http://schema.org/ItemListOrderAscending" : "http://schema.org/ItemListOrderUnordered",
        "itemListElement": quotes.slice(0, 20).map((q, index) => ({
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
          "item": `https://maximusquotes.org/directory#${type}` 
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": displayName,
          "item": `https://maximusquotes.org/quotes/${type}/${encodeURIComponent(rawQuery)}`
        }
      ]
    }
  ];

  // Inject FAQ Schema
  const faqSchema = generateFAQ();
  if (faqSchema) {
      graph.push(faqSchema);
  }

  if (type === 'author') {
    // Construct valid Wikipedia URL format: https://en.wikipedia.org/wiki/Steve_Jobs
    const wikiName = displayName.replace(/ /g, '_');
    
    graph.push({
      "@type": "Person",
      "name": displayName,
      "description": `Quotes and wisdom by ${displayName}.`,
      "url": `https://maximusquotes.org/quotes/author/${encodeURIComponent(rawQuery)}`,
      "sameAs": [
        `https://en.wikipedia.org/wiki/${wikiName}`
      ]
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

      {/* Header Section */}
      <div className="mb-8 text-center max-w-4xl mx-auto relative">
        <div className="flex items-center justify-center text-sm text-gray-500 mb-4 space-x-2">
          <Link to="/" className="hover:text-brand-600">Home</Link>
          <span>/</span>
          <Link to={`/quotes/${type}/a`} className="capitalize hover:text-brand-600">{type}</Link>
          <span>/</span>
          <span className="font-medium text-gray-900">{displayName}</span>
        </div>

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-50 text-brand-700 text-sm font-semibold mb-4 border border-brand-100">
            {type === 'movie' && <Tag className="w-3 h-3" />}
            {type === 'book' && <BookOpen className="w-3 h-3" />}
            {type === 'author' && <User className="w-3 h-3" />}
            <span className="uppercase tracking-wide">{type === 'tv' ? 'TV Show' : type === 'game' ? 'Video Game' : type}</span>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">
          {isListView ? `Top ${quotes.length} ${displayName} Quotes Ranked` : `${displayName} Quotes`}
        </h1>

        {/* View Toggle */}
        <div className="flex justify-center mb-8">
            <div className="inline-flex bg-gray-100 p-1 rounded-lg border border-gray-200">
                <Link 
                    to={`/quotes/${type}/${rawQuery}`}
                    className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-all ${!isListView ? 'bg-white text-brand-600 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
                >
                    <Grid3X3 className="w-4 h-4 mr-2" /> Grid
                </Link>
                <Link 
                    to={`/quotes/${type}/${rawQuery}/best`}
                    className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-all ${isListView ? 'bg-white text-brand-600 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
                >
                    <ListOrdered className="w-4 h-4 mr-2" /> List
                </Link>
            </div>
        </div>
      </div>

      {status === DataStatus.LOADING && (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="w-10 h-10 text-brand-600 animate-spin mb-4" />
          <p className="text-gray-500">Curating the best quotes for you...</p>
        </div>
      )}

      {status === DataStatus.SUCCESS && quotes.length > 0 && (
        <>
          {/* Smart Cross-Linking Bar */}
          <SmartCrossLink type={type} quote={quotes[0]} />

          {/* Thin Content Fix: Rich Intro */}
          <RichIntro query={displayName} type={type} count={quotes.length} authorName={primaryAuthor} />

          {/* Render Mode Switch */}
          {isListView ? (
            // --- LISTICLE VIEW MODE ---
            <div className="max-w-4xl mx-auto space-y-12">
                {visibleQuotes.map((quote, index) => (
                    <div key={quote.id} className="flex flex-col md:flex-row gap-6 relative group">
                        {/* Rank Badge */}
                        <div className="shrink-0 flex flex-col items-center md:items-end w-16 pt-2">
                            {index === 0 && <Crown className="w-8 h-8 text-yellow-500 mb-1" fill="currentColor" />}
                            {index === 1 && <Medal className="w-8 h-8 text-gray-400 mb-1" />}
                            {index === 2 && <Trophy className="w-8 h-8 text-orange-400 mb-1" />}
                            <span className="text-5xl font-black text-gray-200 leading-none">#{index + 1}</span>
                        </div>
                        
                        {/* Quote Content */}
                        <div className="flex-grow">
                            <QuoteCard
                                quote={quote}
                                isFavorite={favorites.includes(quote.id)}
                                onToggleFavorite={toggleFavorite}
                            />
                        </div>
                    </div>
                ))}
            </div>
          ) : (
            // --- GRID VIEW MODE ---
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
          )}

          {/* Infinite Scroll Sensor */}
          {visibleCount < quotes.length && (
            <div ref={observerTarget} className="py-10 flex justify-center">
              <Loader2 className="w-6 h-6 text-gray-400 animate-spin" />
            </div>
          )}

          {/* --- SEMANTIC SPIDER WEB SECTION (NEW) --- */}
          <SpiderWeb type={type} name={displayName} related={relatedEntities} />

        </>
      )}

      {status === DataStatus.SUCCESS && quotes.length === 0 && (
        <div className="text-center py-20 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
          <h3 className="text-xl font-medium text-gray-700">No quotes found.</h3>
          <p className="text-gray-500 mt-2">Try searching for a different term or category.</p>
          <Link to="/" className="inline-flex items-center mt-6 text-brand-600 hover:text-brand-700 font-medium">
            Back to Home <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
