
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, BookOpen, Users, Film, Tv, Gamepad2, Book, Globe, Music, Zap, Feather, Sparkles, Compass, Share2, Layers } from 'lucide-react';
import QuoteCard from '../components/QuoteCard';
import Directory from '../components/Directory';
import SEO from '../components/SEO';
import SearchAutocomplete from '../components/SearchAutocomplete';
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

  useEffect(() => {
    const loadData = async () => {
      const quote = await fetchDailyQuote();
      setDailyQuote(quote);
    };
    loadData();
  }, []);

  // Structured Data: WebSite + FAQPage
  // UPDATED: SearchAction target now uses clean URL (removed /#/)
  const homeSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "name": "Maximus Quotes",
        "url": "https://maximusquotes.org",
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://maximusquotes.org/explore?q={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is Maximus Quotes?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Maximus Quotes is a curated digital library of wisdom, featuring thousands of quotes from authors, movies, books, and more, designed to inspire your daily life."
            }
          },
          {
            "@type": "Question",
            "name": "Is Maximus Quotes free to use?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, Maximus Quotes is 100% free to use. You can browse, search, and save quotes without any cost."
            }
          },
          {
            "@type": "Question",
            "name": "Can I download quote images?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes! You can generate and download beautiful, high-quality images of any quote on our site to share on social media like Instagram or Pinterest."
            }
          },
          {
            "@type": "Question",
            "name": "Does Maximus Quotes have an app?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Maximus Quotes is a Progressive Web App (PWA). You can 'Add to Home Screen' from your mobile browser to install it like a native app."
            }
          }
        ]
      }
    ]
  };

  // Featured Collections
  const collections = [
    { title: "Days of the Week", query: "Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday|Weekend", count: "Daily", color: "bg-blue-50 text-blue-700", type: "topic" },
    { title: "Four Seasons", query: "Spring|Summer|Autumn|Winter|Season", count: "Seasonal", color: "bg-green-50 text-green-700", type: "topic" },
    { title: "Daily Motivation", query: "Motivation|Inspiration|Dreams|Courage|Action", count: "1000+", color: "bg-orange-100 text-orange-700", type: "topic" },
    { title: "Stoic Wisdom", query: "Philosophy|Wisdom|Patience|Strength|Truth", count: "500+", color: "bg-slate-100 text-slate-700", type: "topic" },
    { title: "Movie Magic", query: "Godfather|Star Wars|Pulp Fiction|Dark Knight|Fight Club", count: "2000+", color: "bg-rose-100 text-rose-700", type: "movie" },
    { title: "Love & Romance", query: "Love|Romantic|Marriage|Affection|Valentine", count: "800+", color: "bg-pink-100 text-pink-700", type: "topic" },
    { title: "Success Mindset", query: "Success|Business|Money|Leadership|Work", count: "700+", color: "bg-green-100 text-green-700", type: "topic" },
    { title: "Laugh Out Loud", query: "Humor|Funny|Smile|Laughter|Amusement", count: "400+", color: "bg-yellow-100 text-yellow-700", type: "topic" },
  ];

  return (
    <div className="space-y-20 pb-20">
      <SEO 
        title="Maximus Quotes - Discover Wisdom & Inspiration"
        description="Your premier source for daily inspiration. Discover, save, and share thousands of curated quotes from authors, movies, books, and more."
        schema={homeSchema}
      />
      
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

          <div className="max-w-xl mx-auto relative mb-8">
            <SearchAutocomplete variant="hero" placeholder="Search by author, topic, or keyword..." />
          </div>

          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm font-medium text-gray-500">
            <span>Popular:</span>
            <Link to="/explore?type=topic&q=Life" className="hover:text-brand-600 underline decoration-dotted">Life</Link>
            <Link to="/explore?type=topic&q=Love" className="hover:text-brand-600 underline decoration-dotted">Love</Link>
            <Link to="/explore?type=topic&q=Success" className="hover:text-brand-600 underline decoration-dotted">Success</Link>
          </div>
        </div>
      </section>

      {/* Featured Collections (Enhanced) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-2 mb-6">
          <Layers className="w-6 h-6 text-brand-600" />
          <h2 className="text-2xl font-bold text-gray-900">Curated Collections</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {collections.map((col, idx) => (
            <Link 
              key={idx} 
              to={`/explore?type=${col.type}&q=${encodeURIComponent(col.query)}`}
              className={`p-4 rounded-xl transition-transform hover:scale-105 ${col.color} border border-black/5`}
            >
              <h3 className="font-bold text-sm md:text-base mb-1">{col.title}</h3>
              <p className="text-xs opacity-70">{col.count} Quotes</p>
            </Link>
          ))}
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

      {/* SEO Content Block - Redesigned */}
      <section className="bg-gradient-to-b from-white to-gray-50 border-t border-gray-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">Why Maximus Quotes?</h2>
            <p className="text-lg text-gray-600">Your ultimate destination for discovering, sharing, and saving the world's most powerful words.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition text-center">
              <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Curated Wisdom</h3>
              <p className="text-gray-600 leading-relaxed">
                In a digital age overflowing with noise, we curate the profound. From ancient philosophers like <strong>Socrates</strong> to modern visionaries like <strong>Steve Jobs</strong>, our database bridges the gap between timeless wisdom and daily life.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition text-center">
              <div className="w-14 h-14 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Compass className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Effortless Discovery</h3>
              <p className="text-gray-600 leading-relaxed">
                Whether you need <em>inspirational quotes</em> for the morning or <em>motivational sayings</em> for a workout, we've organized them into an easy-to-navigate library spanning categories like <strong>Love</strong>, <strong>Success</strong>, and <strong>Courage</strong>.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition text-center">
              <div className="w-14 h-14 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Share2 className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Share the Light</h3>
              <p className="text-gray-600 leading-relaxed">
                Join thousands using Maximus Quotes as their daily source of positivity. Save your favorites, <strong>generate beautiful quote images</strong> for Instagram and Pinterest, and let the right words change your perspective.
              </p>
            </div>
          </div>
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
