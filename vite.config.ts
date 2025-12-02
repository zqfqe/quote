
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  publicDir: 'public', 
  build: {
    // Optimization for Production
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunk for React core to keep main bundle small
          'vendor': ['react', 'react-dom', 'react-router-dom'],
          // Utility chunk for heavier libraries
          'utils': ['fuse.js', 'html2canvas', 'lucide-react'],
          // Split massive data files into separate chunks so they are only loaded when needed
          'data-movies': ['./data/quotesMovies.ts'],
          'data-books': ['./data/quotesBooks.ts'],
          'data-lyrics': ['./data/quotesLyrics.ts'],
          'data-tv': ['./data/quotesTV.ts'],
          'data-games': ['./data/quotesGames.ts'],
          'data-anime': ['./data/quotesAnime.ts'],
          'data-authors': ['./data/quotesAuthors.ts'],
          'data-topics': ['./data/quotesTopics.ts'],
        }
      }
    },
    chunkSizeWarningLimit: 1000 // Increase warning limit since we know data files are large
  }
});
