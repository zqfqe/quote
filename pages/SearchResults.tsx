
import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link, useSearchParams } from 'react-router-dom';
import { Quote, DataStatus } from '../types';
import { fetchQuotesByQuery, fetchRelatedEntities } from '../services/geminiService';
import QuoteCard from '../components/QuoteCard';
import SEO from '../components/SEO';
import SmartText from '../components/SmartText'; // Imported SmartText
import { Loader2, ArrowRight, User, BookOpen, Sparkles, Tag, Network, ListOrdered, Grid3X3, Crown, Trophy, Medal, HelpCircle, ChevronDown, ChevronUp, MapPin, Hash } from 'lucide-react';
import { unslugify, slugify } from '../utils';
import { AUTHOR_BIOS, TOPIC_DESCRIPTIONS } from '../data/metadata';

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

// --- OPTIMIZATION #3: PILLAR PAGE WIKI INTRO (With SmartText) ---
const PillarIntro: React.FC<{ displayName: string; type: string; count: number }> = ({ displayName, type, count }) => {
  let bio = "";
  
  // Try to find rich metadata
  if (type === 'author') bio = AUTHOR_BIOS[displayName] || "";
  if (type === 'topic') bio = TOPIC_DESCRIPTIONS[displayName] || "";

  // If no rich bio, generate specific descriptive text
  if (!bio) {
      if (type === 'author') bio = `${displayName} is a celebrated figure whose words continue to inspire millions. This collection features ${count} of their most impactful quotes.`;
      else if (type === 'topic') bio = `Explore the deeper meaning of ${displayName} through this curated collection of ${count} quotes from history's greatest minds.`;
      else bio = `Discover ${count} hand-picked quotes related to ${displayName}, carefully organized for your inspiration.`;
  }

  return (
    <div className="bg-white rounded-3xl p-8 mb-10 shadow-lg border border-gray-100 flex flex-col md:flex-row gap-8 items-start">
        {/* Placeholder Avatar/Icon */}
        <div className="shrink-0">
            {type === 'author' ? (
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-brand-100 to-indigo-100 flex items-center justify-center border-4 border-white shadow-md">
                    <User className="w-10 h-10 md:w-14 md:h-14 text-brand-600" />
                </div>
            ) : (
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center border-4 border-white shadow-md">
                    <Hash className="w-10 h-10 md:w-14 md:h-14 text-purple-600" />
                </div>
            )}
        </div>

        <div className="flex-grow">
            <div className="flex items-center gap-3 mb-2">
                <span className="bg-gray-900 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    {type}
                </span>
                <span className="text-gray-500 text-sm font-medium">{count} Quotes Available</span>
            </div>
            <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4">{displayName} Quotes</h1>
            <div className="text-gray-600 leading-relaxed text-lg">
                {/* Apply SmartText to auto-link keywords in the bio */}
                <SmartText text={bio} />
            </div>
        </div>
    </div>
  );
};

// --- OPTIMIZATION #3: SIDEBAR COMPONENT ---
const Sidebar: React.FC<{ related: RelatedItem[], type: string }> = ({ related, type }) => {
    if (!related || related.length === 0) return null;

    const title = type === 'topic' ? "Top Contributors" : "Related Topics";

    return (
        <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 sticky top-24">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <Network className="w-5 h-5 mr-2 text-brand-600" />
                {title}
            </h3>
            <div className="flex flex-col gap-2">
                {related.map((item, idx) => (
                    <Link 
                        key={idx}
                        to={`/quotes/${item.type}/${item.slug}`}
                        className="flex items-center justify-between p-3 bg-white rounded-xl border border-gray-100 hover:border-brand-300 hover:shadow-sm transition-all group"
                    >
                        <span className="text-gray-700 font-medium group-hover:text-brand-700 text-sm truncate max-w-[150px]">
                            {item.name}
                        </span>
                        <span className="bg-gray-100 text-gray-400 text-xs px-2 py-1 rounded-md">
                            {item.count}
                        </span>
                    </Link>
                ))}
            </div>
        </div>
    );
};

// --- OPTIMIZATION: VISIBLE FAQ COMPONENT (Enhanced with SmartText) ---
const VisibleFAQ: React.FC<{ faqs: { question: string, answer: string }[] }> = ({ faqs }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (!faqs || faqs.length === 0) return null;

  return (
    <div className="mt-12 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
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
      default:
        return {
          title: `${titleCap} Quotes - Search Results - Maximus Quotes`,
          desc: `Search results for "${titleCap}" on Maximus Quotes. Discover wisdom and inspiration.`
        };
    }
  };

  const getFaqData = () => {
    if (quotes.length === 0) return [];

    const faqs = [];
    const topQuotes = quotes.slice(0, 5); 

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

      {/* View Switcher Mobile Only - Hidden on Desktop */}
      <div className="md:hidden flex justify-center mb-6">
            <div className="inline-flex bg-gray-100 p-1 rounded-lg border border-gray-200">
                <Link to={`/quotes/${type}/${rawQuery}`} className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-all ${!isListView ? 'bg-white text-brand-600 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}>
                    <Grid3X3 className="w-4 h-4 mr-2" /> Grid
                </Link>
                <Link to={`/quotes/${type}/${rawQuery}/best`} className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-all ${isListView ? 'bg-white text-brand-600 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}>
                    <ListOrdered className="w-4 h-4 mr-2" /> List
                </Link>
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
          {/* OPTIMIZATION #3: PILLAR INTRO WITH SMART LINKS */}
          <PillarIntro displayName={displayName} type={type} count={quotes.length} />

          {/* TWO COLUMN PILLAR LAYOUT */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            {/* MAIN CONTENT (3/4 Width) */}
            <div className="lg:col-span-3">
                {isListView ? (
                    <div className="space-y-12">
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

                {/* FAQ SECTION IN MAIN CONTENT */}
                <VisibleFAQ faqs={faqs} />
            </div>

            {/* SIDEBAR (1/4 Width) - Hidden on mobile, visible on LG */}
            <div className="hidden lg:block lg:col-span-1">
                <Sidebar related={relatedEntities} type={type} />
                
                {/* Desktop View Switcher */}
                <div className="mt-8 p-4 bg-white border border-gray-100 rounded-2xl shadow-sm">
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">View Mode</h4>
                    <div className="flex flex-col gap-2">
                        <Link to={`/quotes/${type}/${rawQuery}`} className={`flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all ${!isListView ? 'bg-brand-50 text-brand-700 border border-brand-200' : 'text-gray-600 hover:bg-gray-50'}`}>
                            <Grid3X3 className="w-4 h-4 mr-3" /> Grid View
                        </Link>
                        <Link to={`/quotes/${type}/${rawQuery}/best`} className={`flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all ${isListView ? 'bg-brand-50 text-brand-700 border border-brand-200' : 'text-gray-600 hover:bg-gray-50'}`}>
                            <ListOrdered className="w-4 h-4 mr-3" /> Ranked List
                        </Link>
                    </div>
                </div>
            </div>

          </div>
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
