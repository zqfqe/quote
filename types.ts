export interface Quote {
  id: string;
  text: string;
  author: string;
  category: string;
  imageUrl?: string; // Optional background image for "Quote of the Day"
}

export interface Author {
  id: string;
  name: string;
  bio?: string;
  imageUrl?: string;
  slug?: string;
}

export interface Topic {
  id: string;
  name: string;
  slug: string;
  count?: number;
}

export enum DataStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}

export interface User {
  id: string;
  name: string;
  email: string;
  favorites: string[]; // Array of Quote IDs
}