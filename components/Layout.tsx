
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import SearchAutocomplete from './SearchAutocomplete';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 shrink-0">
              <img 
                src="/logo.png" 
                alt="Maximus Quotes" 
                width="48"
                height="48"
                loading="lazy"
                className="h-12 w-auto object-contain"
                onError={(e) => {
                  // Fallback if image fails
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling?.classList.remove('hidden');
                }}
              />
              <span className="hidden text-2xl font-serif font-bold text-brand-900">Maximus.</span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-gray-600 hover:text-brand-600 font-medium transition">Home</Link>
              <Link to="/quotes/topic/Life" className="text-gray-600 hover:text-brand-600 font-medium transition">Explore</Link>
              <Link to="/favorites" className="text-gray-600 hover:text-brand-600 font-medium transition">Favorites</Link>
            </div>

            {/* Search (Desktop) - Replaced with Autocomplete */}
            <div className="hidden md:flex items-center ml-4">
              <SearchAutocomplete variant="navbar" className="w-64" />
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-gray-600 p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-b border-gray-100 px-4 pt-2 pb-6 space-y-4 shadow-lg animate-in slide-in-from-top-5 duration-200">
            {/* Mobile Autocomplete */}
            <div className="pt-2">
              <SearchAutocomplete 
                variant="hero" 
                placeholder="Search authors, topics..." 
                onSearchComplete={() => setIsMenuOpen(false)}
              />
            </div>
            
            <div className="flex flex-col space-y-3 pt-2">
              <Link to="/" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium text-gray-800 py-2 border-b border-gray-50">Home</Link>
              <Link to="/quotes/topic/Life" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium text-gray-800 py-2 border-b border-gray-50">Explore</Link>
              <Link to="/favorites" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium text-gray-800 py-2">Favorites</Link>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <div className="mb-6">
                <img 
                    src="/logo.png" 
                    alt="Maximus Quotes" 
                    width="64"
                    height="64"
                    loading="lazy"
                    className="h-16 w-auto"
                    onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.nextElementSibling?.classList.remove('hidden');
                    }}
                />
                <h3 className="hidden text-2xl font-serif font-bold text-white mb-4">Maximus.</h3>
            </div>
            <p className="text-sm text-gray-400">Fuel your mind with daily inspiration. The best collection of quotes from around the world.</p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Explore</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/quotes/topic/Love" className="hover:text-brand-400">Popular Topics</Link></li>
              <li><Link to="/quotes/author/Einstein" className="hover:text-brand-400">Famous Authors</Link></li>
              <li><Link to="/" className="hover:text-brand-400">Quote of the Day</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="hover:text-brand-400">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-brand-400">Contact</Link></li>
              <li><Link to="/privacy" className="hover:text-brand-400">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-brand-400">Terms & Conditions</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Subscribe</h4>
            <p className="text-xs text-gray-400 mb-2">Get daily inspiration delivered to your inbox.</p>
            <div className="flex">
              <input type="email" placeholder="Your email" className="bg-gray-800 border-none text-sm text-white px-3 py-2 rounded-l-md focus:ring-1 focus:ring-brand-500 w-full" />
              <button className="bg-brand-600 hover:bg-brand-700 text-white px-4 py-2 rounded-r-md text-sm font-medium">Join</button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-gray-800 text-center text-xs text-gray-500">
          &copy; {new Date().getFullYear()} Maximus Quotes. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Layout;
