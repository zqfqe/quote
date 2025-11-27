import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Star, BookOpen, Users, Film, Tv, Gamepad2, Book, Globe, Music, Zap, Feather } from 'lucide-react';
import QuoteCard from '../components/QuoteCard';
import Directory from '../components/Directory';
import { Quote } from '../types';
import { fetchDailyQuote } from '../services/geminiService';
import { 
  POPULAR_TOPICS, POPULAR_AUTHORS, POPULAR_MOVIES, POPULAR_TV_SHOWS, 
  POPULAR_GAMES, POPULAR_BOOKS, POPULAR_PROVERBS, 
  POPULAR_LYRICS, POPULAR_ANIME, POPULAR_POEMS 
} from '../constants';

interface HomeProps {
  favorites: string[];
  toggleFavorite: (q: Quote) => void;
}

const Home: React.FC<HomeProps> = ({ favorites, toggleFavorite }) => {
  const [dailyQuote, setDailyQuote] = useState<Quote | null>(null);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      const quote = await fetchDailyQuote();
      setDailyQuote(quote);
    };
    loadData();
  }, []);

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if(search.trim()) {
      navigate(`/explore?type=search&q=${encodeURIComponent(search)}`);
    }
  };

  return (
    <div className="space-y-20 pb-20">
      
      {/* Hero Section */}
      <section className="relative bg-brand-50 pt-20 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-brand-100 opacity-50 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-indigo-100 opacity-50 blur-3xl"></div>
        
        <div className="relative max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-gray-900 mb-6 tracking-tight">
            Find the words that <br/>
            <span className="text-brand-600">move you.</span>
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Discover thousands of curated quotes to inspire your day, elevate your writing, and share with the world.
          </p>

          <form onSubmit={handleHeroSearch} className="max-w-xl mx-auto relative mb-8">
            <input 
              type="text" 
              placeholder="Search by author, topic, or keyword..."
              className="w-full px-6 py-4 rounded-full shadow-lg border-0 ring-1 ring-gray-200 focus:ring-2 focus:ring-brand-500 text-lg transition-shadow"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button 
              type="submit"
              className="absolute right-2 top-2 bottom-2 px-6 bg-brand-600 hover:bg-brand-700 text-white rounded-full font-medium transition"
            >
              Explore
            </button>
          </form>

          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm font-medium text-gray-500">
            <span>Popular:</span>
            <Link to="/explore?type=topic&q=Life" className="hover:text-brand-600 underline decoration-dotted">Life</Link>
            <Link to="/explore?type=topic&q=Love" className="hover:text-brand-600 underline decoration-dotted">Love</Link>
            <Link to="/explore?type=topic&q=Success" className="hover:text-brand-600 underline decoration-dotted">Success</Link>
          </div>
        </div>
      </section>

      {/* Quote of the Day */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-2 mb-6">
          <Star className="w-6 h-6 text-yellow-500 fill-current" />
          <h2 className="text-2xl font-bold text-gray-900">Quote of the Day</h2>
        </div>
        {dailyQuote ? (
          <QuoteCard 
            quote={dailyQuote} 
            isFavorite={favorites.includes(dailyQuote.id)}
            onToggleFavorite={toggleFavorite}
            featured
          />
        ) : (
          <div className="h-[400px] w-full bg-gray-200 animate-pulse rounded-2xl"></div>
        )}
      </section>

      {/* Directory Sections Stack */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif font-bold text-gray-900">Browse Collection</h2>
          <p className="text-gray-500 mt-2">Explore our extensive library by category</p>
        </div>

        {/* Vertical Stack of Directories */}
        <div className="space-y-12">
          
          <Directory 
            title="Topics" 
            items={POPULAR_TOPICS} 
            type="topic" 
            icon={BookOpen}
            theme="blue"
          />

          <Directory 
            title="Authors" 
            items={POPULAR_AUTHORS} 
            type="author" 
            icon={Users}
            theme="purple"
          />

          <Directory 
            title="Books" 
            items={POPULAR_BOOKS} 
            type="book" 
            icon={Book}
            theme="indigo"
          />

          <Directory 
            title="Movies" 
            items={POPULAR_MOVIES} 
            type="movie" 
            icon={Film}
            theme="rose"
          />

          <Directory 
            title="TV Shows" 
            items={POPULAR_TV_SHOWS} 
            type="tv" 
            icon={Tv}
            theme="amber"
          />

          <Directory 
            title="Video Games" 
            items={POPULAR_GAMES} 
            type="game" 
            icon={Gamepad2}
            theme="emerald"
          />

          <Directory 
            title="Music & Lyrics" 
            items={POPULAR_LYRICS} 
            type="lyrics" 
            icon={Music}
            theme="pink"
          />

          <Directory 
            title="Anime & Manga" 
            items={POPULAR_ANIME} 
            type="anime" 
            icon={Zap}
            theme="red"
          />

          <Directory 
            title="Poetry" 
            items={POPULAR_POEMS} 
            type="poetry" 
            icon={Feather}
            theme="teal"
          />

          <Directory 
            title="Proverbs" 
            items={POPULAR_PROVERBS} 
            type="proverb" 
            icon={Globe}
            theme="orange"
          />

        </div>

      </section>

      {/* Lead Magnet */}
      <section className="relative">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="bg-gradient-to-r from-brand-600 to-indigo-600 rounded-3xl p-10 md:p-14 shadow-2xl text-white">
            <h2 className="text-3xl font-serif font-bold mb-4">Daily dose of wisdom</h2>
            <p className="text-brand-100 mb-8 text-lg">Join 50,000+ subscribers who start their day with inspiration. No spam, just pure motivation delivered to your inbox.</p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input type="email" placeholder="Enter your email" className="flex-1 px-5 py-3 rounded-lg border-0 text-gray-900 focus:ring-2 focus:ring-white/50 shadow-inner" />
              <button className="px-8 py-3 bg-white text-brand-600 font-bold rounded-lg hover:bg-gray-100 transition shadow-lg">Subscribe</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;