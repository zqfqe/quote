import React from 'react';
import { Quote } from '../types';
import QuoteCard from '../components/QuoteCard';
import { Link } from 'react-router-dom';

interface FavoritesProps {
  favorites: Quote[]; // Array of full quote objects
  favoritesIds: string[];
  toggleFavorite: (q: Quote) => void;
}

const Favorites: React.FC<FavoritesProps> = ({ favorites, favoritesIds, toggleFavorite }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-[60vh]">
      <div className="mb-10 border-b border-gray-100 pb-6">
        <h1 className="text-3xl font-serif font-bold text-gray-900">Your Collection</h1>
        <p className="text-gray-500 mt-2">{favorites.length} Saved Quotes</p>
      </div>

      {favorites.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
          <div className="text-6xl mb-4">📭</div>
          <h3 className="text-xl font-medium text-gray-700">Your collection is empty</h3>
          <p className="text-gray-500 mt-2 mb-6">Start exploring to save quotes that inspire you.</p>
          <Link to="/" className="px-6 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition">
            Explore Quotes
          </Link>
        </div>
      ) : (
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {favorites.map((quote) => (
            <QuoteCard
              key={quote.id}
              quote={quote}
              isFavorite={favoritesIds.includes(quote.id)}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
