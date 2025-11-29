import { Topic, Author } from "./types";
import { MOVIE_QUOTES } from './data/quotesMovies';
import { TV_QUOTES } from './data/quotesTV';
import { GAME_QUOTES } from './data/quotesGames';
import { BOOK_QUOTES } from './data/quotesBooks';
import { LYRICS_QUOTES } from './data/quotesLyrics';
import { ANIME_QUOTES } from './data/quotesAnime';
import { POETRY_QUOTES } from './data/quotesPoetry';
import { PROVERB_QUOTES } from './data/quotesProverbs';
import { TOPIC_QUOTES } from './data/quotesTopics';
import { AUTHOR_QUOTES } from './data/quotesAuthors';

// Helper to transform data dictionary to directory items
const createItems = (source: Record<string, any[]>, prefix: string): Topic[] => {
  return Object.keys(source).map((name, index) => ({
    id: `${prefix}_${index}`,
    name,
    slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    count: source[name].length
  }));
};

// Helper to create author objects
const createAuthors = (source: Record<string, any[]>): Author[] => {
  return Object.keys(source).map((name, index) => ({
    id: `a_${index}`,
    name,
    imageUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&color=fff`
  }));
};

export const POPULAR_TOPICS = createItems(TOPIC_QUOTES, 't');
export const POPULAR_AUTHORS = createAuthors(AUTHOR_QUOTES);
export const POPULAR_MOVIES = createItems(MOVIE_QUOTES, 'm');
export const POPULAR_TV_SHOWS = createItems(TV_QUOTES, 'tv');
export const POPULAR_GAMES = createItems(GAME_QUOTES, 'g');
export const POPULAR_BOOKS = createItems(BOOK_QUOTES, 'b');
export const POPULAR_LYRICS = createItems(LYRICS_QUOTES, 'l');
export const POPULAR_ANIME = createItems(ANIME_QUOTES, 'an');
export const POPULAR_POEMS = createItems(POETRY_QUOTES, 'p');
export const POPULAR_PROVERBS = createItems(PROVERB_QUOTES, 'pr');
