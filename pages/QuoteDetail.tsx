
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Quote, DataStatus } from '../types';
import { fetchQuoteDetail } from '../services/geminiService';
import QuoteCard from '../components/QuoteCard';
import SEO from '../components/SEO';
import { Loader2, ArrowRight, Quote as QuoteIcon, User, Lightbulb, BookOpen } from 'lucide-react';
import { slugify, unslugify } from '../utils';

interface QuoteDetailProps {
  favorites: string[];
  toggleFavorite: (q: Quote) => void;
}

// --- OPTIMIZATION #2: ANALYSIS GENERATOR ---
// Generates a structured "Analysis" section to add unique content depth
const QuoteAnalysis: React.FC<{ quote: Quote, bio?: string }> = ({ quote, bio }) => {
    // Extract keywords for dynamic sentence construction
    const words = quote.text.split(' ').length;
    const isLong = words > 15;
    const isShort = words < 8;
    
    return (
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Col: Context */}
            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                    <div className="bg-purple-50 p-2 rounded-lg">
                        <Lightbulb className="w-5 h-5 text-purple-600" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">Interpretation & Analysis</h3>
                </div>
                <div className="text-gray-600 leading-relaxed space-y-4 text-sm md:text-base">
                    <p>
                        <strong>"{quote.text}"</strong> is a powerful statement about <Link to={`/quotes/topic/${slugify(quote.category)}`} className="text-brand-600 hover:underline">{quote.category}</Link>. 
                        {isShort 
                            ? " Despite its brevity, this quote packs a significant punch, distilling a complex idea into a memorable aphorism." 
                            : " The detailed nature of this quote allows for a nuanced exploration of the subject matter, offering deep insight into the author's perspective."}
                    </p>
                    <p>
                        Quotes by <strong>{quote.author}</strong> often reflect themes of {quote.category.toLowerCase()}, and this specific line is a prime example. 
                        It challenges the reader to reconsider their own views on {quote.category.toLowerCase()} and serves as a timeless reminder of the human condition.
                    </p>
                </div>
            </div>

            {/* Right Col: Author Context */}
            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                    <div className="bg-blue-50 p-2 rounded-lg">
                        <User className="w-5 h-5 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">About {quote.author}</h3>
                </div>
                <div className="text-gray-600 leading-relaxed space-y-4 text-sm md:text-base">
                    {bio ? (
                        <p>{bio}</p>
                    ) : (
                        <p>
                            {quote.author} is a renowned figure associated with wisdom regarding {quote.category}. 
                            Their contributions to literature, philosophy, or culture have solidified their place in history.
                        </p>
                    )}
                    <Link 
                        to={`/quotes/author/${slugify(quote.author)}`} 
                        className="inline-flex items-center text-brand-600 font-bold hover:text-brand-800 mt-2 group"
                    >
                        View all quotes by {quote.author} <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </div>
    );
};

const QuoteDetail: React.FC<QuoteDetailProps> = ({ favorites, toggleFavorite }) => {
  const { type, source, quoteSlug } = useParams<{ type: string; source: string; quoteSlug: string }>();
  const [quote, setQuote] = useState<Quote | null>(null);
  const [relatedQuotes, setRelatedQuotes] = useState<Quote[]>([]);
  const [bio, setBio] = useState<string | undefined>(undefined);
  const [status, setStatus] = useState<DataStatus>(DataStatus.IDLE);

  useEffect(() => {
    const loadQuote = async () => {
      if (!type || !source || !quoteSlug) return;
      
      setStatus(DataStatus.LOADING);
      const data = await fetchQuoteDetail(type, source, quoteSlug);
      
      if (data.quote) {
        setQuote(data.quote);
        setRelatedQuotes(data.related);
        setBio(data.bio); 
        setStatus(DataStatus.SUCCESS);
      } else {
        setStatus(DataStatus.ERROR);
      }
    };

    loadQuote();
  }, [type, source, quoteSlug]);

  if (status === DataStatus.LOADING) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="w-10 h-10 text-brand-600 animate-spin mb-4" />
        <p className="text-gray-500">Retrieving wisdom...</p>
      </div>
    );
  }

  if (status === DataStatus.ERROR || !quote) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Quote Not Found</h1>
        <p className="text-gray-500 mb-6">The quote you are looking for might have been moved or does not exist.</p>
        <Link to="/" className="text-brand-600 hover:underline">Return Home</Link>
      </div>
    );
  }

  // --- SEO SCHEMAS ---
  const prettySource = unslugify(source || '');
  const typeLabel = type ? type.charAt(0).toUpperCase() + type.slice(1) : 'Collection';

  const breadcrumbSchema = {
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://maximusquotes.org" },
      { "@type": "ListItem", "position": 2, "name": typeLabel + "s", "item": `https://maximusquotes.org/directory#${type}` },
      { "@type": "ListItem", "position": 3, "name": prettySource, "item": `https://maximusquotes.org/quotes/${type}/${source}` },
      { "@type": "ListItem", "position": 4, "name": "Quote", "item": window.location.href }
    ]
  };

  const quotationSchema = {
    "@type": "Quotation",
    "text": quote.text,
    "author": {
      "@type": "Person",
      "name": quote.author,
      "description": bio ? bio.substring(0, 150) + "..." : undefined,
      "url": `https://maximusquotes.org/quotes/author/${slugify(quote.author)}`
    },
    "keywords": quote.category,
    "url": window.location.href,
    "mainEntityOfPage": { "@type": "WebPage", "@id": window.location.href }
  };

  const schema = {
    "@context": "https://schema.org",
    "@graph": [quotationSchema, breadcrumbSchema]
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <SEO 
        title={`"${quote.text.substring(0, 50)}..." - ${quote.author}`}
        description={`Read the famous quote by ${quote.author}: "${quote.text}". ${bio ? bio.substring(0, 50) + "..." : `Discover more wisdom about ${quote.category}.`}`}
        schema={schema}
      />

      <nav className="flex items-center text-sm text-gray-500 mb-8 space-x-2">
        <Link to="/" className="hover:text-brand-600">Home</Link>
        <span>/</span>
        <Link to={`/quotes/${type}/${source}`} className="hover:text-brand-600 capitalize">
          {source?.replace(/-/g, ' ')}
        </Link>
        <span>/</span>
        <span className="truncate max-w-[200px] font-medium text-gray-900">Quote</span>
      </nav>

      <div className="max-w-4xl mx-auto mb-20">
        <QuoteCard 
          quote={quote} 
          isFavorite={favorites.includes(quote.id)} 
          onToggleFavorite={toggleFavorite} 
          featured={true}
        />
        
        {/* OPTIMIZATION #2: Content Differentiation Analysis Module */}
        <QuoteAnalysis quote={quote} bio={bio} />
      </div>

      {relatedQuotes.length > 0 && (
        <div className="border-t border-gray-100 pt-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-serif font-bold text-gray-900">
              More from {source?.replace(/-/g, ' ')}
            </h2>
            <Link 
              to={`/quotes/${type}/${source}`}
              className="text-brand-600 hover:text-brand-700 font-medium flex items-center"
            >
              View All <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
          
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {relatedQuotes.map((q) => (
              <QuoteCard
                key={q.id}
                quote={q}
                isFavorite={favorites.includes(q.id)}
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuoteDetail;
