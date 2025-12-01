
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import SearchResults from './pages/SearchResults';
import Favorites from './pages/Favorites';
import { About, Contact, Privacy, Terms } from './pages/Legal';
import { Quote } from './types';

function App() {
  // Favorites State
  const [savedQuoteObjects, setSavedQuoteObjects] = useState<Quote[]>(() => {
    const saved = localStorage.getItem('maximus_saved_quotes');
    return saved ? JSON.parse(saved) : [];
  });

  const savedIds = savedQuoteObjects.map(q => q.id);

  useEffect(() => {
    localStorage.setItem('maximus_saved_quotes', JSON.stringify(savedQuoteObjects));
  }, [savedQuoteObjects]);

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
      <Layout>
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
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
}

export default App;
