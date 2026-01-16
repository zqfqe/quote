
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Quote, DataStatus } from '../types';
import { fetchQuoteDetail } from '../services/geminiService';
import QuoteCard from '../components/QuoteCard';
import SEO from '../components/SEO';
import { Loader2, ArrowRight, Quote as QuoteIcon, User, BookOpen } from 'lucide-react';
import { slugify, unslugify } from '../utils';

interface QuoteDetailProps {
  favorites: string[];
  toggleFavorite: (q: Quote) => void;
}

// Helper to generate dynamic descriptions if no bio is present.
// This prevents every page from having the exact same sentence structure.
const getDynamicDescription = (quote: Quote, type: string) => {
  const len = quote.text.length;
  const isShort = len < 50;
  const templates = [
    // Template 1
    `This memorable line by <strong>${quote.author}</strong> stands as a testament to their perspective on ${quote.category.toLowerCase()}. It touches on themes of ${quote.category.toLowerCase()} that resonate with many.`,
    // Template 2
    `In this profound statement, <strong>${quote.author}</strong> captures the essence of ${quote.category.toLowerCase()}. ${isShort ? "Brief yet powerful, these words" : "These words"} have inspired readers to reflect on their own lives.`,
    // Template 3
    `<strong>${quote.author}</strong> is known for their wisdom regarding ${quote.category.toLowerCase()}. This specific quote highlights a unique viewpoint that continues to be relevant today.`,
    // Template 4
    `Explaining the concept of ${quote.category.toLowerCase()}, <strong>${quote.author}</strong> offers a thought-provoking idea: "${quote.text.substring(0, 20)}...". It serves as a reminder of the power of words.`,
    // Template 5 (Media specific)
    type === 'movie' || type === 'book' 
      ? `A classic moment from <strong>${quote.category}</strong>. This quote by ${quote.author} encapsulates the mood and theme of the work, leaving a lasting impression on the audience.`
      : `Reflecting on ${quote.category.toLowerCase()}, <strong>${quote.author}</strong> delivers a message that cuts through the noise. It is a call to understanding and awareness.`
  ];

  // Pick a template based on the length of the text (pseudo-random but consistent per quote)
  const index = len % templates.length;
  return templates[index];
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
        setBio(data.bio); // Set the fetched bio
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

  // 1. Breadcrumb Schema (Crucial for search path display)
  const breadcrumbSchema = {
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
        "name": typeLabel + "s", // e.g. Authors, Topics
        "item": `https://maximusquotes.org/directory#${type}`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": prettySource,
        "item": `https://maximusquotes.org/quotes/${type}/${source}`
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": "Quote",
        "item": window.location.href
      }
    ]
  };

  // 2. Quotation Schema (Main Entity)
  const quotationSchema = {
    "@type": "Quotation",
    "text": quote.text,
    "author": {
      "@type": "Person",
      "name": quote.author,
      "description": bio ? bio.substring(0, 150) + "..." : undefined,
      // Attempt to link to the Author page for internal authority
      "url": `https://maximusquotes.org/quotes/author/${slugify(quote.author)}`
    },
    "keywords": quote.category,
    "url": window.location.href,
    "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": window.location.href
    }
  };

  // Combine into @graph for robust linking
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      quotationSchema,
      breadcrumbSchema
    ]
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <SEO 
        title={`"${quote.text.substring(0, 50)}..." - ${quote.author}`}
        description={`Read the famous quote by ${quote.author}: "${quote.text}". ${bio ? bio.substring(0, 50) + "..." : `Discover more wisdom about ${quote.category}.`}`}
        schema={schema}
      />

      {/* Breadcrumbs */}
      <nav className="flex items-center text-sm text-gray-500 mb-8 space-x-2">
        <Link to="/" className="hover:text-brand-600">Home</Link>
        <span>/</span>
        <Link to={`/quotes/${type}/${source}`} className="hover:text-brand-600 capitalize">
          {source?.replace(/-/g, ' ')}
        </Link>
        <span>/</span>
        <span className="truncate max-w-[200px]">Quote</span>
      </nav>

      {/* Hero Quote Display */}
      <div className="max-w-4xl mx-auto mb-20">
        <QuoteCard 
          quote={quote} 
          isFavorite={favorites.includes(quote.id)} 
          onToggleFavorite={toggleFavorite} 
          featured={true}
        />
        
        {/* Context / Analysis Section */}
        <div className="mt-12 bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
            <div className="flex items-start gap-4">
                <div className="bg-brand-50 p-3 rounded-full shrink-0">
                    {bio ? <User className="w-6 h-6 text-brand-600" /> : <QuoteIcon className="w-6 h-6 text-brand-600" />}
                </div>
                <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                        {bio ? `About ${quote.author}` : "About this Quote"}
                    </h3>
                    
                    {bio ? (
                        // Render Rich Bio if available
                        <div className="text-gray-600 leading-relaxed space-y-4">
                            <p>{bio}</p>
                            <Link 
                                to={`/quotes/author/${slugify(quote.author)}`} 
                                className="inline-flex items-center text-brand-600 font-medium hover:underline text-sm"
                            >
                                More quotes by {quote.author} <ArrowRight className="w-3 h-3 ml-1" />
                            </Link>
                        </div>
                    ) : (
                        // Render Dynamic Description if no bio (Thin content fix)
                        <p 
                            className="text-gray-600 leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: getDynamicDescription(quote, type || '') }}
                        />
                    )}
                </div>
            </div>
        </div>
      </div>

      {/* Related Quotes Section */}
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
