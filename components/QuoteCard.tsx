
import React, { useState, useRef } from 'react';
import { Quote } from '../types';
import { Heart, Copy, Check, Download, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import html2canvas from 'html2canvas';

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

  const handleCopy = () => {
    navigator.clipboard.writeText(`"${quote.text}" — ${quote.author}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadImage = async () => {
    if (!cardRef.current) return;
    setIsDownloading(true);

    try {
      // Small delay to ensure any rendering is settled
      await new Promise(resolve => setTimeout(resolve, 100));

      const canvas = await html2canvas(cardRef.current, {
        useCORS: true, // Needed for external images (picsum, etc)
        scale: 2, // Higher resolution for Retina/Mobile
        backgroundColor: featured ? null : '#ffffff', // Transparent for BG image cards, White for standard
        ignoreElements: (element) => element.classList.contains('action-buttons'), // Hide the buttons in the image
        logging: false
      });

      const link = document.createElement('a');
      link.download = `maximus-quote-${quote.author.replace(/\s+/g, '-').toLowerCase()}-${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error("Failed to generate image", error);
      alert("Could not generate image. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  // Structured Data for Google (Quotation Schema)
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Quotation",
    "text": quote.text,
    "author": {
      "@type": "Person",
      "name": quote.author
    },
    "keywords": quote.category
  };

  if (featured) {
    return (
      <article 
        ref={cardRef}
        className="relative group overflow-hidden rounded-2xl shadow-2xl h-[400px] md:h-[500px] flex items-center justify-center text-center p-8 transition-transform hover:scale-[1.01] duration-300"
      >
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
        
        {/* Background Image (SEO Optimized) */}
        {/* Using a real img tag allows Google Images to index the content */}
        <img 
          src={quote.imageUrl || 'https://picsum.photos/800/600'} 
          alt={`Inspirational Quote by ${quote.author}: ${quote.text}`}
          className="absolute inset-0 w-full h-full object-cover z-0 transition-transform duration-700 group-hover:scale-110"
          loading="eager"
        />
        
        <div className="absolute inset-0 bg-black/50 z-10" />
        
        {/* Content */}
        <div className="relative z-20 max-w-2xl mx-auto flex flex-col items-center">
          <span className="inline-block px-3 py-1 mb-6 text-xs font-semibold tracking-wider text-white uppercase bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
            Quote of the Day
          </span>
          <blockquote className="m-0 p-0 border-0">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-6 leading-tight drop-shadow-lg">
              "{quote.text}"
            </h2>
          </blockquote>
          <Link to={`/explore?type=author&q=${encodeURIComponent(quote.author)}`} className="text-xl md:text-2xl text-brand-100 font-medium hover:text-white transition drop-shadow-md">
            <cite className="not-italic">— {quote.author}</cite>
          </Link>
          
          {/* Watermark for Image (Visible mostly in download, keeps branding) */}
          <div className="mt-4 text-white/40 text-xs font-medium tracking-widest uppercase">
            MaximusQuotes.org
          </div>
          
          {/* Buttons (Hidden during HTML2Canvas capture via 'action-buttons' class) */}
          <div className="mt-8 flex items-center space-x-4 action-buttons">
             <button 
              onClick={() => onToggleFavorite(quote)}
              className="p-3 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-md transition-all text-white border border-white/20"
              title="Add to Favorites"
              aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
            >
              <Heart className={`w-6 h-6 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
            </button>
            
            <button 
              onClick={handleDownloadImage}
              disabled={isDownloading}
              className="p-3 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-md transition-all text-white border border-white/20"
              title="Download Image"
              aria-label="Download quote as image"
            >
              {isDownloading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Download className="w-6 h-6" />}
            </button>

            <button 
              onClick={handleCopy}
              className="px-6 py-3 bg-brand-600 hover:bg-brand-50 text-white rounded-full font-medium transition-all shadow-lg hover:shadow-brand-500/50 flex items-center space-x-2"
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

  // Standard Masonry Card
  return (
    <article 
      ref={cardRef}
      className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 break-inside-avoid mb-6 flex flex-col h-auto relative"
    >
      <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      
      {/* Decorative Quote Mark */}
      <blockquote className="mb-4 m-0 p-0 border-0">
        <span className="text-4xl text-brand-200 font-serif leading-none">“</span>
        <p className="text-lg text-gray-800 font-serif leading-relaxed -mt-4 px-2">
          {quote.text}
        </p>
      </blockquote>
      
      {/* Footer Area */}
      <footer className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
        <div className="flex flex-col">
          <Link 
            to={`/explore?type=author&q=${encodeURIComponent(quote.author)}`}
            className="text-sm font-semibold text-gray-600 hover:text-brand-600 transition"
          >
            <cite className="not-italic">{quote.author}</cite>
          </Link>
          <span className="text-[10px] text-gray-300 font-medium mt-1">maximusquotes.org</span>
        </div>
        
        {/* Action Buttons (Hidden in Download) */}
        <div className="flex items-center space-x-1 action-buttons">
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
      
      {/* Category Tag */}
      <div className="mt-2 text-xs text-gray-400 uppercase tracking-wide">
        <Link to={`/explore?type=topic&q=${encodeURIComponent(quote.category)}`} className="hover:underline hover:text-gray-500">
          #{quote.category}
        </Link>
      </div>
    </article>
  );
};

export default QuoteCard;
