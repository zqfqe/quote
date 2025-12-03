
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, TrendingUp } from 'lucide-react';
import Fuse from 'fuse.js';
import {
  POPULAR_TOPICS, POPULAR_AUTHORS, POPULAR_MOVIES,
  POPULAR_TV_SHOWS, POPULAR_BOOKS, POPULAR_GAMES,
  POPULAR_LYRICS, POPULAR_ANIME, POPULAR_PROVERBS, POPULAR_POEMS
} from '../constants';

interface SearchItem {
  name: string;
  type: string;
  count?: number;
}

interface SearchAutocompleteProps {
  placeholder?: string;
  className?: string;
  variant?: 'hero' | 'navbar';
  onSearchComplete?: () => void;
}

const SearchAutocomplete: React.FC<SearchAutocompleteProps> = ({ 
  placeholder = "Search quotes...", 
  className = "",
  variant = 'navbar',
  onSearchComplete
}) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<SearchItem[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // 1. Aggregate all data sources into a single index
  const searchIndex = useMemo(() => {
    const allItems: SearchItem[] = [
      ...POPULAR_TOPICS.map(i => ({ name: i.name, type: 'topic', count: i.count })),
      ...POPULAR_AUTHORS.map(i => ({ name: i.name, type: 'author' })),
      ...POPULAR_MOVIES.map(i => ({ name: i.name, type: 'movie' })),
      ...POPULAR_BOOKS.map(i => ({ name: i.name, type: 'book' })),
      ...POPULAR_TV_SHOWS.map(i => ({ name: i.name, type: 'tv' })),
      ...POPULAR_ANIME.map(i => ({ name: i.name, type: 'anime' })),
      ...POPULAR_GAMES.map(i => ({ name: i.name, type: 'game' })),
      ...POPULAR_LYRICS.map(i => ({ name: i.name, type: 'lyrics' })),
      ...POPULAR_POEMS.map(i => ({ name: i.name, type: 'poetry' })),
      ...POPULAR_PROVERBS.map(i => ({ name: i.name, type: 'proverb' })),
    ];
    return new Fuse(allItems, {
      keys: ['name'],
      threshold: 0.3,
      limit: 10
    });
  }, []);

  // 2. Handle Search Logic
  useEffect(() => {
    if (query.trim().length > 1) {
      const hits = searchIndex.search(query);
      setResults(hits.map(h => h.item));
      setIsOpen(true);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  }, [query, searchIndex]);

  // 3. Close on Click Outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (item: SearchItem) => {
    setQuery(item.name);
    setIsOpen(false);
    // Updated to use clean URL path
    navigate(`/quotes/${item.type}/${encodeURIComponent(item.name)}`);
    if (onSearchComplete) onSearchComplete();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setIsOpen(false);
      // Updated to use clean URL path for general search
      navigate(`/quotes/search/${encodeURIComponent(query)}`);
      if (onSearchComplete) onSearchComplete();
    }
  };

  const clearSearch = () => {
    setQuery('');
    setIsOpen(false);
  };

  // Styles based on variant
  const inputStyles = variant === 'hero' 
    ? "w-full px-6 py-4 pl-12 rounded-full shadow-lg border-0 ring-1 ring-gray-200 focus:ring-2 focus:ring-brand-500 text-lg transition-shadow"
    : "w-full pl-9 pr-8 py-1.5 rounded-full bg-gray-100 border-none focus:ring-2 focus:ring-brand-500 text-sm transition-all focus:bg-white focus:w-64";

  const iconStyles = variant === 'hero'
    ? "w-6 h-6 text-gray-400 absolute left-4 top-4"
    : "w-4 h-4 text-gray-400 absolute left-3 top-2";

  return (
    <div ref={containerRef} className={`relative group ${className}`}>
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          placeholder={placeholder}
          className={inputStyles}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.length > 1 && setIsOpen(true)}
        />
        <Search className={iconStyles} />
        
        {query && (
          <button 
            type="button"
            onClick={clearSearch}
            className={`absolute text-gray-400 hover:text-gray-600 ${variant === 'hero' ? 'right-20 top-4' : 'right-3 top-2'}`}
          >
            <X className={variant === 'hero' ? "w-6 h-6" : "w-4 h-4"} />
          </button>
        )}

        {variant === 'hero' && (
          <button 
            type="submit"
            className="absolute right-2 top-2 bottom-2 px-6 bg-brand-600 hover:bg-brand-700 text-white rounded-full font-medium transition"
          >
            Explore
          </button>
        )}
      </form>

      {/* Dropdown Results */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-100">
          {results.length > 0 ? (
            <ul>
              {results.map((item, index) => (
                <li key={`${item.type}-${index}`}>
                  <button
                    onClick={() => handleSelect(item)}
                    className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center space-x-3 transition-colors border-b border-gray-50 last:border-none"
                  >
                    <div className="bg-brand-50 p-2 rounded-full shrink-0">
                      <TrendingUp className="w-4 h-4 text-brand-600" />
                    </div>
                    <div>
                      <span className="font-medium text-gray-900 block">{item.name}</span>
                      <span className="text-xs text-gray-500 capitalize">{item.type === 'tv' ? 'TV Show' : item.type}</span>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-4 text-center text-gray-500 text-sm">
              No matches found. Press Enter to search broadly.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchAutocomplete;
