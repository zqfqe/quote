
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Quote, DataStatus } from '../types';
import { fetchQuoteDetail } from '../services/geminiService';
import QuoteCard from '../components/QuoteCard';
import SEO from '../components/SEO';
import SmartText from '../components/SmartText';
import { Loader2, ArrowRight, Quote as QuoteIcon, User, Lightbulb, BookOpen, Info } from 'lucide-react';
import { slugify, unslugify } from '../utils';

interface QuoteDetailProps {
  favorites: string[];
  toggleFavorite: (q: Quote) => void;
}

// --- OPTIMIZATION #2 & #3: FEATURED SNIPPET TARGETING + SMART LINKS ---
const QuoteAnalysis: React.FC<{ quote: Quote, bio?: string }> = ({ quote, bio }) => {
    const words = quote.text.split(' ').length;
    const isShort = words < 10;
    
    // Constructing semantic content for "Meaning" snippet
    const analysisText = isShort
        ? `This famous quote by ${quote.author} is a concise yet powerful reflection on ${quote.category.toLowerCase()}. Its brevity allows it to serve as a daily mantra, reminding us that simplicity often holds the deepest truth.`
        : `In this profound statement, ${quote.author} explores the complexities of ${quote.category.toLowerCase()}. The quote suggests that our perception of the world is deeply intertwined with our internal state, challenging the reader to look inward for answers.`;

    const contextText = `Quotes about ${quote.category} typically address the human condition, and this line is no exception. It has resonated with audiences for generations because it speaks to a universal truth about ${quote.category.toLowerCase()}.`;

    return (
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Main Content - Optimizing for "Meaning" Featured Snippet */}
            <div className="lg:col-span-8 space-y-8">
                <section className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
                        <div className="bg-brand-50 p-2 rounded-xl">
                            <Lightbulb className="w-6 h-6 text-brand-600" />
                        </div>
                        <h2 className="text-2xl font-serif font-bold text-gray-900">
                            What is the meaning of this quote?
                        </h2>
                    </div>
                    <div className="prose prose-lg text-gray-600 leading-relaxed">
                        <p>
                            <SmartText text={analysisText} />
                        </p>
                        <p>
                            <SmartText text={contextText} />
                        </p>
                    </div>
                </section>

                {bio && (
                    <section className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                        <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
                            <div className="bg-purple-50 p-2 rounded-xl">
                                <User className="w-6 h-6 text-purple-600" />
                            </div>
                            <h2 className="text-2xl font-serif font-bold text-gray-900">
                                Who is {quote.author}?
                            </h2>
                        </div>
                        <div className="prose prose-lg text-gray-600 leading-relaxed">
                            <p>
                                <SmartText text={bio} />
                            </p>
                        </div>
                        <div className="mt-6">
                            <Link 
                                to={`/quotes/author/${slugify(quote.author)}`} 
                                className="inline-flex items-center font-bold text-purple-700 hover:text-purple-900 transition-colors"
                            >
                                More quotes by {quote.author} <ArrowRight className="w-4 h-4 ml-2" />
                            </Link>
                        </div>
                    </section>
                )}
            </div>

            {/* Sidebar - Metadata & Quick Facts */}
            <div className="lg:col-span-4 space-y-6">
                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Quote Details</h3>
                    <ul className="space-y-4">
                        <li className="flex flex-col">
                            <span className="text-xs text-gray-500 font-medium">Author</span>
                            <Link to={`/quotes/author/${slugify(quote.author)}`} className="text-lg font-bold text-gray-900 hover:text-brand-600">
                                {quote.author}
                            </Link>
                        </li>
                        <li className="flex flex-col">
                            <span className="text-xs text-gray-500 font-medium">Category</span>
                            <Link to={`/quotes/topic/${slugify(quote.category)}`} className="text-lg font-bold text-gray-900 hover:text-brand-600">
                                {quote.category}
                            </Link>
                        </li>
                        <li className="flex flex-col">
                            <span className="text-xs text-gray-500 font-medium">Word Count</span>
                            <span className="text-gray-700 font-medium">{words} words</span>
                        </li>
                    </ul>
                </div>

                <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
                    <div className="flex items-start gap-3">
                        <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                        <div>
                            <h4 className="font-bold text-blue-900 text-sm mb-1">Did you know?</h4>
                            <p className="text-sm text-blue-800 leading-relaxed">
                                You can click on highlighted keywords in the description to explore related topics and authors!
                            </p>
                        </div>
                    </div>
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

      <div className="max-w-4xl mx-auto mb-12">
        <QuoteCard 
          quote={quote} 
          isFavorite={favorites.includes(quote.id)} 
          onToggleFavorite={toggleFavorite} 
          featured={true}
        />
        
        {/* REFACTORED: Featured Snippet Optimized Analysis */}
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
