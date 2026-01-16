
import React from 'react';
import { BookOpen, Users, Film, Tv, Gamepad2, Book, Globe, Music, Zap, Feather, Map } from 'lucide-react';
import Directory from '../components/Directory';
import SEO from '../components/SEO';
import {
  POPULAR_TOPICS, POPULAR_AUTHORS, POPULAR_MOVIES, POPULAR_TV_SHOWS,
  POPULAR_GAMES, POPULAR_BOOKS, POPULAR_LYRICS, POPULAR_ANIME,
  POPULAR_POEMS, POPULAR_PROVERBS
} from '../constants';

const DirectoryPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <SEO
        title="Complete Directory - Maximus Quotes"
        description="Browse our complete A-Z index of authors, topics, movies, books, and more. Find the perfect quote for any occasion."
      />

      <header className="mb-12 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center justify-center p-3 bg-brand-50 rounded-full mb-6">
          <Map className="w-8 h-8 text-brand-600" />
        </div>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">Global Directory</h1>
        <p className="text-lg text-gray-600 leading-relaxed">
          Welcome to the heart of our library. Explore our entire database organized by category. 
          Use the A-Z filters within each section to find exactly who or what you are looking for.
        </p>
      </header>

      {/* Jump Links */}
      <nav className="sticky top-24 z-30 bg-white/80 backdrop-blur-md py-4 mb-16 border-y border-gray-100 flex flex-wrap justify-center gap-3">
        {[
          { id: 'topic', label: 'Topics' },
          { id: 'author', label: 'Authors' },
          { id: 'book', label: 'Books' },
          { id: 'movie', label: 'Movies' },
          { id: 'tv', label: 'TV Shows' },
          { id: 'lyrics', label: 'Music' },
          { id: 'anime', label: 'Anime' },
          { id: 'game', label: 'Games' },
          { id: 'poetry', label: 'Poetry' },
          { id: 'proverb', label: 'Proverbs' },
        ].map((link) => (
          <a
            key={link.id}
            href={`#${link.id}`}
            className="px-4 py-2 bg-gray-50 hover:bg-brand-50 border border-gray-200 hover:border-brand-200 rounded-full text-sm font-semibold text-gray-600 hover:text-brand-700 transition-all duration-300"
          >
            {link.label}
          </a>
        ))}
      </nav>

      <div className="space-y-24">
        <Directory title="Topics & Categories" items={POPULAR_TOPICS} type="topic" icon={BookOpen} theme="blue" />
        <Directory title="Famous Authors" items={POPULAR_AUTHORS} type="author" icon={Users} theme="purple" />
        <Directory title="Books & Literature" items={POPULAR_BOOKS} type="book" icon={Book} theme="indigo" />
        <Directory title="Movies & Cinema" items={POPULAR_MOVIES} type="movie" icon={Film} theme="rose" />
        <Directory title="TV Shows" items={POPULAR_TV_SHOWS} type="tv" icon={Tv} theme="amber" />
        <Directory title="Music Lyrics" items={POPULAR_LYRICS} type="lyrics" icon={Music} theme="pink" />
        <Directory title="Anime & Manga" items={POPULAR_ANIME} type="anime" icon={Zap} theme="red" />
        <Directory title="Video Games" items={POPULAR_GAMES} type="game" icon={Gamepad2} theme="emerald" />
        <Directory title="Poetry" items={POPULAR_POEMS} type="poetry" icon={Feather} theme="teal" />
        <Directory title="Proverbs" items={POPULAR_PROVERBS} type="proverb" icon={Globe} theme="orange" />
      </div>
    </div>
  );
};

export default DirectoryPage;
