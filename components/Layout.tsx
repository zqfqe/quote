import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Search, User, Heart, LogOut } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  user: { name: string } | null;
  onLogin: () => void;
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, user, onLogin, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/explore?q=${encodeURIComponent(searchQuery)}&type=search`);
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-2xl font-serif font-bold text-brand-900">Lumina.</span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-gray-600 hover:text-brand-600 font-medium transition">Home</Link>
              <Link to="/explore?type=topic&q=Life" className="text-gray-600 hover:text-brand-600 font-medium transition">Explore</Link>
              <Link to="/favorites" className="text-gray-600 hover:text-brand-600 font-medium transition">Favorites</Link>
            </div>

            {/* Search & Auth (Desktop) */}
            <div className="hidden md:flex items-center space-x-4">
              <form onSubmit={handleSearch} className="relative group">
                <input
                  type="text"
                  placeholder="Search quotes..."
                  className="pl-9 pr-4 py-1.5 rounded-full bg-gray-100 border-none focus:ring-2 focus:ring-brand-500 text-sm w-48 transition-all"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2" />
              </form>

              {user ? (
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-medium text-gray-700">Hi, {user.name}</span>
                  <button onClick={onLogout} className="text-gray-500 hover:text-red-500">
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <button 
                  onClick={onLogin}
                  className="bg-brand-600 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-brand-700 transition shadow-md hover:shadow-lg"
                >
                  Join / Login
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-gray-600"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-b border-gray-100 px-4 pt-2 pb-6 space-y-4">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search authors, topics..."
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:border-brand-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
            </form>
            <div className="flex flex-col space-y-3">
              <Link to="/" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium text-gray-800">Home</Link>
              <Link to="/explore?type=topic&q=Life" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium text-gray-800">Explore</Link>
              <Link to="/favorites" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium text-gray-800">Favorites</Link>
            </div>
            <div className="pt-4 border-t border-gray-100">
              {user ? (
                 <button onClick={onLogout} className="flex items-center space-x-2 text-red-500 font-medium">
                   <LogOut className="w-5 h-5" />
                   <span>Log Out</span>
                 </button>
              ) : (
                <button 
                  onClick={() => { onLogin(); setIsMenuOpen(false); }}
                  className="w-full bg-brand-600 text-white py-2 rounded-lg font-medium"
                >
                  Sign In
                </button>
              )}
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
            <h3 className="text-2xl font-serif font-bold text-white mb-4">Lumina.</h3>
            <p className="text-sm text-gray-400">Fuel your mind with daily inspiration. The best collection of quotes from around the world.</p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Explore</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/explore?type=topic&q=Love" className="hover:text-brand-400">Popular Topics</Link></li>
              <li><Link to="/explore?type=author&q=Einstein" className="hover:text-brand-400">Famous Authors</Link></li>
              <li><Link to="/" className="hover:text-brand-400">Quote of the Day</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><span className="cursor-pointer hover:text-brand-400">About Us</span></li>
              <li><span className="cursor-pointer hover:text-brand-400">Contact</span></li>
              <li><span className="cursor-pointer hover:text-brand-400">Privacy Policy</span></li>
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
          &copy; {new Date().getFullYear()} Lumina Quotes. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Layout;
