
import { Quote } from '../types';

// A lightweight pool of quotes for "Quote of the Day" to ensure instant loading
// without fetching the entire massive database bundles on homepage load.
export const DAILY_QUOTES_POOL: Quote[] = [
  { id: "dq_1", text: "The only way to do great work is to love what you do.", author: "Steve Jobs", category: "Work" },
  { id: "dq_2", text: "Life is what happens when you're busy making other plans.", author: "John Lennon", category: "Life" },
  { id: "dq_3", text: "The unexamined life is not worth living.", author: "Socrates", category: "Philosophy" },
  { id: "dq_4", text: "Turn your wounds into wisdom.", author: "Oprah Winfrey", category: "Wisdom" },
  { id: "dq_5", text: "The way to get started is to quit talking and begin doing.", author: "Walt Disney", category: "Motivation" },
  { id: "dq_6", text: "Be yourself; everyone else is already taken.", author: "Oscar Wilde", category: "Authenticity" },
  { id: "dq_7", text: "You only live once, but if you do it right, once is enough.", author: "Mae West", category: "Life" },
  { id: "dq_8", text: "Be the change that you wish to see in the world.", author: "Mahatma Gandhi", category: "Change" },
  { id: "dq_9", text: "In three words I can sum up everything I've learned about life: it goes on.", author: "Robert Frost", category: "Life" },
  { id: "dq_10", text: "If you tell the truth, you don't have to remember anything.", author: "Mark Twain", category: "Truth" },
  { id: "dq_11", text: "To live is the rarest thing in the world. Most people exist, that is all.", author: "Oscar Wilde", category: "Life" },
  { id: "dq_12", text: "We accept the love we think we deserve.", author: "Stephen Chbosky", category: "Love" },
  { id: "dq_13", text: "Without music, life would be a mistake.", author: "Friedrich Nietzsche", category: "Music" },
  { id: "dq_14", text: "It is better to be hated for what you are than to be loved for what you are not.", author: "Andre Gide", category: "Authenticity" },
  { id: "dq_15", text: "Fairy tales are more than true: not because they tell us that dragons exist, but because they tell us that dragons can be beaten.", author: "Neil Gaiman", category: "Literature" },
  { id: "dq_16", text: "Everything you can imagine is real.", author: "Pablo Picasso", category: "Creativity" },
  { id: "dq_17", text: "Do one thing every day that scares you.", author: "Eleanor Roosevelt", category: "Courage" },
  { id: "dq_18", text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt", category: "Future" },
  { id: "dq_19", text: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius", category: "Perseverance" },
  { id: "dq_20", text: "I have not failed. I've just found 10,000 ways that won't work.", author: "Thomas A. Edison", category: "Failure" },
  { id: "dq_21", text: "May the Force be with you.", author: "Star Wars", category: "Movie" },
  { id: "dq_22", text: "There's no place like home.", author: "The Wizard of Oz", category: "Movie" },
  { id: "dq_23", text: "Just keep swimming.", author: "Finding Nemo", category: "Movie" },
  { id: "dq_24", text: "To infinity and beyond!", author: "Toy Story", category: "Movie" },
  { id: "dq_25", text: "Winter is coming.", author: "Game of Thrones", category: "TV Show" },
  { id: "dq_26", text: "Bazinga!", author: "The Big Bang Theory", category: "TV Show" },
  { id: "dq_27", text: "It's a dangerous business, Frodo, going out your door.", author: "J.R.R. Tolkien", category: "Book" },
  { id: "dq_28", text: "Not all those who wander are lost.", author: "J.R.R. Tolkien", category: "Poetry" },
  { id: "dq_29", text: "All we have to decide is what to do with the time that is given us.", author: "J.R.R. Tolkien", category: "Book" },
  { id: "dq_30", text: "Whatever our souls are made of, his and mine are the same.", author: "Emily Bronte", category: "Book" }
];

// Deprecated aggregation to prevent bundle bloat.
// The service layer now handles loading specific files dynamically.
export const STATIC_QUOTES: Quote[] = [];
