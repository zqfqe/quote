
import React, { useState, useRef } from 'react';
import { Quote } from '../types';
import { Heart, Copy, Check, Download, Loader2, Link as LinkIcon, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import html2canvas from 'html2canvas';
import { slugify } from '../utils';

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
  // Extract the ID format: type_slug_index
  // We need to reverse engineer the type for the URL if it's not explicit, 
  // but usually we can infer 'author' or 'topic' from the context or pass it down.
  // However, simpler is to use a reliable URL structure.
  // Let's assume the quote.id has the type prefix (e.g. "author_steve-jobs_0")
  const idParts = quote.id.split('_');
  const type = idParts[0]; // 'author', 'movie', 'topic' etc
  // The 'source' part might be multi-segment if the name had hyphens, so we rejoin everything between first and last part
  const sourceSlug = idParts.slice(1, -1).join('_'); // We used _ in ID generation, but standard slug uses -. 
  // Actually, processQuotes uses: `${categoryType}_${slugify(key)}_${index}`
  // So `idParts[1]` is the slugified key.
  const source = idParts[1]; 
  
  // Note: The ID generation in geminiService uses underscores as separators, but the slug inside is hyphenated.
  // Example ID: "movie_the-godfather_0"
  // Parts: ["movie", "the-godfather", "0"]
  // So type=movie, source=the-godfather.
  const permalink = `/quote/${type}/${source}/${slugify(quote.text)}`;

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
    "keywords": quote.category
  };

  if (featured) {
    return (
      <article 
        ref={cardRef}
        className="relative group overflow-hidden rounded-2xl shadow-2xl h-[400px] md:h-[500px] flex items-center justify-center text-center p-8 transition-transform hover:scale-[1.01] duration-300"
      >
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
        
        <img 
          src={quote.imageUrl || 'https://picsum.photos/800/600'} 
          alt={`Inspirational Quote by ${quote.author}: ${quote.text}`}
          className="absolute inset-0 w-full h-full object-cover z-0 transition-transform duration-700 group-hover:scale-110"
          loading="eager"
        />
        
        <div className="absolute inset-0 bg-black/50 z-10" />
        
        <div className="relative z-20 max-w-2xl mx-auto flex flex-col items-center">
          <span className="inline-block px-3 py-1 mb-6 text-xs font-semibold tracking-wider text-white uppercase bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
            Quote of the Day
          </span>
          <blockquote className="m-0 p-0 border-0">
            <Link to={permalink} className="hover:text-brand-100 transition-colors">
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-6 leading-tight drop-shadow-lg">
                "{quote.text}"
              </h2>
            </Link>
          </blockquote>
          <Link to={`/quotes/author/${slugify(quote.author)}`} className="text-xl md:text-2xl text-brand-100 font-medium hover:text-white transition drop-shadow-md">
            <cite className="not-italic">— {quote.author}</cite>
          </Link>
          
          <div className="mt-4 text-white/40 text-xs font-medium tracking-widest uppercase">
            MaximusQuotes.org
          </div>
          
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

  return (
    <article 
      ref={cardRef}
      className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 break-inside-avoid mb-6 flex flex-col h-auto relative group"
    >
      <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      
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
