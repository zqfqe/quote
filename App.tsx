import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import SearchResults from './pages/SearchResults';
import Favorites from './pages/Favorites';
import { Quote, User } from './types';

function App() {
  // Simple Mock User State
  const [user, setUser] = useState<User | null>(null);
  
  // Favorites State
  // In a real app, this would be synced with backend.
  // Here, we store just IDs for check, but also the full objects to render the favorites page without re-fetching
  const [savedQuoteObjects, setSavedQuoteObjects] = useState<Quote[]>(() => {
    const saved = localStorage.getItem('lumina_saved_quotes');
    return saved ? JSON.parse(saved) : [];
  });

  const savedIds = savedQuoteObjects.map(q => q.id);

  useEffect(() => {
    localStorage.setItem('lumina_saved_quotes', JSON.stringify(savedQuoteObjects));
  }, [savedQuoteObjects]);

  const handleLogin = () => {
    // Mock Login
    setUser({
      id: 'u1',
      name: 'Alex',
      email: 'alex@example.com',
      favorites: []
    });
  };

  const handleLogout = () => {
    setUser(null);
  };

  const toggleFavorite = (quote: Quote) => {
    setSavedQuoteObjects(prev => {
      const exists = prev.find(q => q.id === quote.id);
      if (exists) {
        return prev.filter(q => q.id !== quote.id);
      } else {
        return [...prev, quote];
      }
    });
  };

  return (
    <HashRouter>
      <Layout user={user} onLogin={handleLogin} onLogout={handleLogout}>
        <Routes>
          <Route 
            path="/" 
            element={<Home favorites={savedIds} toggleFavorite={toggleFavorite} />} 
          />
          <Route 
            path="/explore" 
            element={<SearchResults favorites={savedIds} toggleFavorite={toggleFavorite} />} 
          />
          <Route 
            path="/favorites" 
            element={<Favorites favorites={savedQuoteObjects} favoritesIds={savedIds} toggleFavorite={toggleFavorite} />} 
          />
        </Routes>
      </Layout>
    </HashRouter>
  );
}

export default App;
