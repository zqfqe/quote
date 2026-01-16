
import React, { useState, useRef, useMemo } from 'react';
import { Quote } from '../types';
import { Heart, Copy, Check, Download, Loader2, Link as LinkIcon, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import html2canvas from 'html2canvas';
import { slugify, generateQuoteImage } from '../utils';

interface QuoteCardProps {
  quote: Quote;
  isFavorite: boolean;
  onToggleFavorite: (quote: Quote) => void;
  featured?: boolean;
}

const QuoteCard: React.FC<QuoteCardProps> = ({ quote, isFavorite, onToggleFavorite, featured = false }) => {
  const [copied, setCopied] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const cardRef = useRef<HTMLElement>(null);

  // Construct the Permalink
  const idParts = quote.id.split('_');
  const type = idParts[0]; 
  const source = idParts[1]; 
  
  const permalink = `/quote/${type}/${source}/${slugify(quote.text)}`;

  // Generate SEO-friendly Text-Over-Image
  // We use useMemo to avoid regenerating the Base64 string on every render
  const generatedImage = useMemo(() => {
    return generateQuoteImage(quote.text, quote.author);
  }, [quote.text, quote.author]);

  const handleCopy = () => {
    navigator.clipboard.writeText(`"${quote.text}" — ${quote.author}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadImage = async () => {
    if (!cardRef.current) return;
    setIsDownloading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 100));

      const canvas = await html2canvas(cardRef.current, {
        useCORS: true, 
        scale: 2, 
        backgroundColor: featured ? null : '#ffffff', 
        ignoreElements: (element) => element.classList.contains('action-buttons'), 
        logging: false
      });

      const link = document.createElement('a');
      link.download = `maximus-quote-${slugify(quote.author)}-${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error("Failed to generate image", error);
      alert("Could not generate image. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Quotation",
    "text": quote.text,
    "author": {
      "@type": "Person",
      "name": quote.author
    },
    "keywords": quote.category,
    "image": generatedImage // Feed the text-rich image to Schema
  };

  // SEO Optimized Image Metadata
  const imageAlt = `Quote: "${quote.text}" by ${quote.author}`;
  const imageTitle = `Read full quote by ${quote.author} about ${quote.category}`;

  if (featured) {
    return (
      <article 
        ref={cardRef}
        className="relative group overflow-hidden rounded-2xl shadow-2xl h-[400px] md:h-[500px] flex items-center justify-center text-center p-8 transition-transform hover:scale-[1.01] duration-300 bg-gray-900"
      >
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
        
        {/* Primary visual image (Generated SVG for relevance) */}
        <img 
          src={generatedImage}
          alt={imageAlt}
          title={imageTitle}
          className="absolute inset-0 w-full h-full object-cover z-0 transition-transform duration-700 group-hover:scale-110 opacity-90"
          loading="eager"
        />
        
        {/* Subtle overlay to ensure text contrast if user hovers or for style */}
        <div className="absolute inset-0 bg-white/60 z-10 backdrop-blur-[2px]" />
        
        <div className="relative z-20 max-w-2xl mx-auto flex flex-col items-center">
          <span className="inline-block px-3 py-1 mb-6 text-xs font-semibold tracking-wider text-brand-900 uppercase bg-brand-100/80 backdrop-blur-sm rounded-full border border-brand-200">
            Quote of the Day
          </span>
          <blockquote className="m-0 p-0 border-0">
            <Link to={permalink} className="hover:text-brand-700 transition-colors">
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-gray-900 mb-6 leading-tight drop-shadow-sm">
                "{quote.text}"
              </h2>
            </Link>
          </blockquote>
          <Link to={`/quotes/author/${slugify(quote.author)}`} className="text-xl md:text-2xl text-gray-700 font-medium hover:text-brand-600 transition">
            <cite className="not-italic">— {quote.author}</cite>
          </Link>
          
          <div className="mt-4 text-gray-400 text-xs font-medium tracking-widest uppercase">
            MaximusQuotes.org
          </div>
          
          <div className="mt-8 flex items-center space-x-4 action-buttons">
             <button 
              onClick={() => onToggleFavorite(quote)}
              className="p-3 bg-white hover:bg-gray-50 rounded-full shadow-md transition-all text-gray-600 border border-gray-200"
              title="Add to Favorites"
              aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
            >
              <Heart className={`w-6 h-6 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
            </button>
            
            <button 
              onClick={handleDownloadImage}
              disabled={isDownloading}
              className="p-3 bg-white hover:bg-gray-50 rounded-full shadow-md transition-all text-gray-600 border border-gray-200"
              title="Download Image"
              aria-label="Download quote as image"
            >
              {isDownloading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Download className="w-6 h-6" />}
            </button>

            <button 
              onClick={handleCopy}
              className="px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white rounded-full font-medium transition-all shadow-lg hover:shadow-brand-500/50 flex items-center space-x-2"
              aria-label="Copy quote text"
            >
              {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
              <span>{copied ? 'Copied' : 'Copy Text'}</span>
            </button>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article 
      ref={cardRef}
      className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 break-inside-avoid mb-6 flex flex-col h-auto relative group"
    >
      <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      
      {/* Hidden image for SEO/Sharing purposes - allows 'Save Image As' to work nicely too */}
      <img src={generatedImage} alt={imageAlt} className="hidden" />

      <blockquote className="mb-4 m-0 p-0 border-0">
        <span className="text-4xl text-brand-200 font-serif leading-none">“</span>
        <Link to={permalink} className="hover:text-brand-800 transition-colors block">
          <p className="text-lg text-gray-800 font-serif leading-relaxed -mt-4 px-2">
            {quote.text}
          </p>
        </Link>
      </blockquote>
      
      <footer className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
        <div className="flex flex-col">
          <Link 
            to={`/quotes/author/${slugify(quote.author)}`}
            className="text-sm font-semibold text-gray-600 hover:text-brand-600 transition"
          >
            <cite className="not-italic">{quote.author}</cite>
          </Link>
          <span className="text-[10px] text-gray-300 font-medium mt-1">maximusquotes.org</span>
        </div>
        
        <div className="flex items-center space-x-1 action-buttons">
          <Link 
            to={permalink}
            className="p-2 text-gray-400 hover:text-brand-600 hover:bg-brand-50 rounded-full transition md:opacity-0 md:group-hover:opacity-100"
            title="Permalink"
            aria-label="View quote page"
          >
             <ExternalLink className="w-4 h-4" />
          </Link>

          <button 
            onClick={handleDownloadImage}
            disabled={isDownloading}
            className="p-2 text-gray-400 hover:text-brand-600 hover:bg-brand-50 rounded-full transition"
            title="Download Image"
            aria-label="Download quote as image"
          >
             {isDownloading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
          </button>

          <button 
            onClick={handleCopy}
            className="p-2 text-gray-400 hover:text-brand-600 hover:bg-brand-50 rounded-full transition"
            title="Copy Text"
            aria-label="Copy quote text"
          >
             {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          </button>
          
          <button 
            onClick={() => onToggleFavorite(quote)}
            className={`p-2 rounded-full transition ${isFavorite ? 'text-red-500 bg-red-50' : 'text-gray-400 hover:text-red-500 hover:bg-red-50'}`}
            title="Add to Favorites"
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
          </button>
        </div>
      </footer>
      
      <div className="mt-2 text-xs text-gray-400 uppercase tracking-wide">
        <Link to={`/quotes/topic/${slugify(quote.category)}`} className="hover:underline hover:text-gray-500">
          #{quote.category}
        </Link>
      </div>
    </article>
  );
};

export default QuoteCard;
