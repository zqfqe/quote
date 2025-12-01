import React, { useState } from 'react';
import { Quote } from '../types';
import { Heart, Share2, Copy, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

interface QuoteCardProps {
  quote: Quote;
  isFavorite: boolean;
  onToggleFavorite: (quote: Quote) => void;
  featured?: boolean;
}

const QuoteCard: React.FC<QuoteCardProps> = ({ quote, isFavorite, onToggleFavorite, featured = false }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(`"${quote.text}" — ${quote.author}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    // Simple Web Share API or mock
    if (navigator.share) {
      navigator.share({
        title: 'Maximus Quotes',
        text: `"${quote.text}" — ${quote.author}`,
        url: window.location.href,
      }).catch(console.error);
    } else {
      handleCopy(); // Fallback
    }
  };

  if (featured) {
    return (
      <div className="relative group overflow-hidden rounded-2xl shadow-2xl h-[400px] md:h-[500px] flex items-center justify-center text-center p-8 transition-transform hover:scale-[1.01] duration-300">
        <div 
          className="absolute inset-0 bg-cover bg-center z-0 transition-transform duration-700 group-hover:scale-110"
          style={{ backgroundImage: `url(${quote.imageUrl || 'https://picsum.photos/800/600'})` }}
        />
        <div className="absolute inset-0 bg-black/50 z-10" />
        
        <div className="relative z-20 max-w-2xl mx-auto flex flex-col items-center">
          <span className="inline-block px-3 py-1 mb-6 text-xs font-semibold tracking-wider text-white uppercase bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
            Quote of the Day
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-6 leading-tight drop-shadow-lg">
            "{quote.text}"
          </h2>
          <Link to={`/explore?type=author&q=${encodeURIComponent(quote.author)}`} className="text-xl md:text-2xl text-brand-100 font-medium hover:text-white transition drop-shadow-md">
            — {quote.author}
          </Link>
          
          <div className="mt-8 flex items-center space-x-4">
             <button 
              onClick={() => onToggleFavorite(quote)}
              className="p-3 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-md transition-all text-white border border-white/20"
              title="Add to Favorites"
            >
              <Heart className={`w-6 h-6 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
            </button>
            <button 
              onClick={handleCopy}
              className="px-6 py-3 bg-brand-600 hover:bg-brand-500 text-white rounded-full font-medium transition-all shadow-lg hover:shadow-brand-500/50 flex items-center space-x-2"
            >
              {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
              <span>{copied ? 'Copied' : 'Copy Text'}</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Standard Masonry Card
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 break-inside-avoid mb-6 flex flex-col h-auto">
      <div className="mb-4">
        <span className="text-4xl text-brand-200 font-serif leading-none">“</span>
        <p className="text-lg text-gray-800 font-serif leading-relaxed -mt-4 px-2">
          {quote.text}
        </p>
      </div>
      
      <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
        <Link 
          to={`/explore?type=author&q=${encodeURIComponent(quote.author)}`}
          className="text-sm font-semibold text-gray-600 hover:text-brand-600 transition"
        >
          {quote.author}
        </Link>
        
        <div className="flex items-center space-x-2">
          <button 
            onClick={handleCopy}
            className="p-2 text-gray-400 hover:text-brand-600 hover:bg-brand-50 rounded-full transition"
            title="Copy"
          >
             {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          </button>
          <button 
            onClick={() => onToggleFavorite(quote)}
            className={`p-2 rounded-full transition ${isFavorite ? 'text-red-500 bg-red-50' : 'text-gray-400 hover:text-red-500 hover:bg-red-50'}`}
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>
      <div className="mt-2 text-xs text-gray-400 uppercase tracking-wide">
        <Link to={`/explore?type=topic&q=${encodeURIComponent(quote.category)}`} className="hover:underline hover:text-gray-500">
          #{quote.category}
        </Link>
      </div>
    </div>
  );
};

export default QuoteCard;