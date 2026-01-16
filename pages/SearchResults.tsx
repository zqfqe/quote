
import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link, useSearchParams } from 'react-router-dom';
import { Quote, DataStatus } from '../types';
import { fetchQuotesByQuery, fetchRelatedEntities } from '../services/geminiService';
import QuoteCard from '../components/QuoteCard';
import SEO from '../components/SEO';
import { Loader2, ArrowRight, User, BookOpen, Sparkles, Tag, Network, ListOrdered, Grid3X3, Crown, Trophy, Medal, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
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
  const qCap = query; // Assumes query is already formatted nicely
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
    // ... other cases remain same ...
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

// --- 3. SEO: Semantic Spider Web ---
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

// --- 4. SEO: VISIBLE FAQ Component (NEW) ---
const VisibleFAQ: React.FC<{ faqs: { question: string, answer: string }[] }> = ({ faqs }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (!faqs || faqs.length === 0) return null;

  return (
    <div className="mt-20 max-w-3xl mx-auto bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="bg-brand-50 p-6 border-b border-brand-100 flex items-center gap-3">
        <HelpCircle className="w-6 h-6 text-brand-600" />
        <h3 className="text-xl font-bold text-gray-900">Frequently Asked Questions</h3>
      </div>
      <div>
        {faqs.map((faq, idx) => (
          <div key={idx} className="border-b border-gray-50 last:border-0">
            <button 
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              className="w-full text-left p-6 focus:outline-none flex justify-between items-center group hover:bg-gray-50 transition-colors"
            >
              <span className="font-medium text-gray-900">{faq.question}</span>
              {openIndex === idx ? (
                <ChevronUp className="w-5 h-5 text-brand-500" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
              )}
            </button>
            {openIndex === idx && (
              <div 
                className="px-6 pb-6 text-gray-600 leading-relaxed text-sm prose prose-sm max-w-none prose-ul:pl-4"
                dangerouslySetInnerHTML={{ __html: faq.answer }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};


const SearchResults: React.FC<SearchResultsProps> = ({ favorites, toggleFavorite }) => {
  const params = useParams();
  const [searchParams] = useSearchParams();
  
  const rawQuery = params.query || searchParams.get('q') || '';
  const rawType = params.type || searchParams.get('type') || 'search';
  const modeParams = params.mode || 'grid'; 

  const type = rawType as 'search' | 'author' | 'topic' | 'movie' | 'tv' | 'game' | 'book' | 'proverb' | 'lyrics' | 'anime' | 'poetry';
  const isListView = ['best', 'top', 'list'].includes(modeParams);

  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [status, setStatus] = useState<DataStatus>(DataStatus.IDLE);
  const [relatedEntities, setRelatedEntities] = useState<RelatedItem[]>([]);
  const [displayName, setDisplayName] = useState(unslugify(rawQuery));
  
  const observerTarget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      setStatus(DataStatus.LOADING);
      setVisibleCount(ITEMS_PER_PAGE);
      setRelatedEntities([]); 

      const results = await fetchQuotesByQuery(rawQuery, type);
      
      setQuotes(results);
      setStatus(DataStatus.SUCCESS);

      let resolvedName = unslugify(rawQuery);
      if (results.length > 0) {
        if (type === 'author') {
            resolvedName = results[0].author;
        } else if (['topic', 'movie', 'book', 'tv', 'game'].includes(type)) {
            resolvedName = results[0].category;
        }
      }
      setDisplayName(resolvedName);

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

    if (observerTarget.current) observer.observe(observerTarget.current);
    return () => { if (observerTarget.current) observer.unobserve(observerTarget.current); };
  }, [quotes.length]);

  const getSEODetails = () => {
    const titleCap = displayName; 
    
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
      // ... default cases
      default:
        return {
          title: `${titleCap} Quotes - Search Results - Maximus Quotes`,
          desc: `Search results for "${titleCap}" on Maximus Quotes. Discover wisdom and inspiration.`
        };
    }
  };

  // --- Logic to Generate FAQ Data (Shared by SEO Schema and Visible UI) ---
  const getFaqData = () => {
    if (quotes.length === 0) return [];

    const faqs = [];
    const topQuotes = quotes.slice(0, 5); 

    // Q1
    let q1 = "";
    let a1 = `Here are some of the best ${displayName} quotes found in our collection: <ul>`;
    topQuotes.forEach(q => {
        const safeText = q.text.replace(/"/g, '&quot;');
        a1 += `<li>"${safeText}"</li>`;
    });
    a1 += `</ul>`;

    if (type === 'author') q1 = `What are the most famous quotes by ${displayName}?`;
    else if (type === 'topic') q1 = `What are the best quotes about ${displayName}?`;
    else if (type === 'movie') q1 = `What are the memorable lines from the movie ${displayName}?`;
    else q1 = `What are popular quotes related to ${displayName}?`;

    faqs.push({ question: q1, answer: a1 });

    // Q2
    if (topQuotes.length > 0) {
        const bestQuote = topQuotes[0];
        let q2 = "";
        let a2 = "";
        const safeQuoteText = bestQuote.text.replace(/"/g, '&quot;');

        if (type === 'author') {
            q2 = `What is a short inspirational quote by ${displayName}?`;
            a2 = `One of ${displayName}'s most inspiring short quotes is: "${safeQuoteText}"`;
        } else {
            q2 = `What is a famous saying about ${displayName}?`;
            a2 = `A popular saying about ${displayName} is: "${safeQuoteText}"`;
        }
        faqs.push({ question: q2, answer: a2 });
    }

    return faqs;
  };

  const faqs = getFaqData();
  const seo = getSEODetails();
  const visibleQuotes = quotes.slice(0, visibleCount);
  const primaryAuthor = quotes.length > 0 ? quotes[0].author : undefined;

  // --- Construct JSON-LD Schema ---
  const graph: any[] = [
    {
      "@type": "CollectionPage",
      "name": seo.title,
      "description": seo.desc,
      "mainEntity": {
        "@type": "ItemList",
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
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://maximusquotes.org" },
        { "@type": "ListItem", "position": 2, "name": type.charAt(0).toUpperCase() + type.slice(1), "item": `https://maximusquotes.org/directory#${type}` },
        { "@type": "ListItem", "position": 3, "name": displayName, "item": `https://maximusquotes.org/quotes/${type}/${encodeURIComponent(rawQuery)}` }
      ]
    }
  ];

  if (faqs.length > 0) {
      graph.push({
        "@type": "FAQPage",
        "mainEntity": faqs.map(f => ({
            "@type": "Question",
            "name": f.question,
            "acceptedAnswer": { "@type": "Answer", "text": f.answer }
        }))
      });
  }

  if (type === 'author') {
    const wikiName = displayName.replace(/ /g, '_');
    graph.push({
      "@type": "Person",
      "name": displayName,
      "description": `Quotes and wisdom by ${displayName}.`,
      "url": `https://maximusquotes.org/quotes/author/${encodeURIComponent(rawQuery)}`,
      "sameAs": [`https://en.wikipedia.org/wiki/${wikiName}`]
    });
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <SEO title={seo.title} description={seo.desc} schema={{"@context": "https://schema.org", "@graph": graph}} noindex={status === DataStatus.SUCCESS && quotes.length === 0} />

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
                <Link to={`/quotes/${type}/${rawQuery}`} className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-all ${!isListView ? 'bg-white text-brand-600 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}>
                    <Grid3X3 className="w-4 h-4 mr-2" /> Grid
                </Link>
                <Link to={`/quotes/${type}/${rawQuery}/best`} className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-all ${isListView ? 'bg-white text-brand-600 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}>
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
          <SmartCrossLink type={type} quote={quotes[0]} />
          <RichIntro query={displayName} type={type} count={quotes.length} authorName={primaryAuthor} />

          {isListView ? (
            <div className="max-w-4xl mx-auto space-y-12">
                {visibleQuotes.map((quote, index) => (
                    <div key={quote.id} className="flex flex-col md:flex-row gap-6 relative group">
                        <div className="shrink-0 flex flex-col items-center md:items-end w-16 pt-2">
                            {index === 0 && <Crown className="w-8 h-8 text-yellow-500 mb-1" fill="currentColor" />}
                            {index === 1 && <Medal className="w-8 h-8 text-gray-400 mb-1" />}
                            {index === 2 && <Trophy className="w-8 h-8 text-orange-400 mb-1" />}
                            <span className="text-5xl font-black text-gray-200 leading-none">#{index + 1}</span>
                        </div>
                        <div className="flex-grow">
                            <QuoteCard quote={quote} isFavorite={favorites.includes(quote.id)} onToggleFavorite={toggleFavorite} />
                        </div>
                    </div>
                ))}
            </div>
          ) : (
            <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
              {visibleQuotes.map((quote) => (
                <QuoteCard key={quote.id} quote={quote} isFavorite={favorites.includes(quote.id)} onToggleFavorite={toggleFavorite} />
              ))}
            </div>
          )}

          {visibleCount < quotes.length && (
            <div ref={observerTarget} className="py-10 flex justify-center">
              <Loader2 className="w-6 h-6 text-gray-400 animate-spin" />
            </div>
          )}

          <SpiderWeb type={type} name={displayName} related={relatedEntities} />
          
          {/* OPTIMIZATION #1: VISIBLE FAQ */}
          <VisibleFAQ faqs={faqs} />
        </>
      )}

      {status === DataStatus.SUCCESS && quotes.length === 0 && (
        <div className="text-center py-20 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
          <h3 className="text-xl font-medium text-gray-700">No quotes found.</h3>
          <Link to="/" className="inline-flex items-center mt-6 text-brand-600 hover:text-brand-700 font-medium">
            Back to Home <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
