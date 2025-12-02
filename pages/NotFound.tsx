
import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <SEO 
        title="Page Not Found - Maximus Quotes" 
        description="The page you are looking for does not exist. Return to Maximus Quotes home." 
        noindex={true}
      />
      
      <div className="bg-brand-50 rounded-full p-8 mb-6">
        <span className="text-6xl">🤔</span>
      </div>
      
      <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
        Page Not Found
      </h1>
      
      <p className="text-xl text-gray-600 mb-8 max-w-lg">
        "Not all those who wander are lost... but you might be." 
        <br/>
        <span className="text-sm italic mt-2 block">— J.R.R. Tolkien (Adapted)</span>
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <Link 
          to="/" 
          className="px-8 py-3 bg-brand-600 hover:bg-brand-700 text-white rounded-lg font-medium transition shadow-lg"
        >
          Return Home
        </Link>
        <Link 
          to="/explore?type=topic&q=Life" 
          className="px-8 py-3 bg-white border border-gray-200 hover:border-brand-300 text-gray-700 hover:text-brand-600 rounded-lg font-medium transition"
        >
          Explore Quotes
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
