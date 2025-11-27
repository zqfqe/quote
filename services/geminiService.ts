import { GoogleGenAI, Type } from "@google/genai";
import { Quote, Author } from "../types";

const apiKey = process.env.API_KEY || '';

// Safely initialize Gemini. If no key, we will handle it in the calls.
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

// Helper to create a delay for simulation if needed, or unique IDs
const generateId = () => Math.random().toString(36).substr(2, 9);

export const fetchDailyQuote = async (): Promise<Quote> => {
  if (!ai) throw new Error("API Key missing");

  const prompt = `Generate an inspiring "Quote of the Day".
  CRITICAL INSTRUCTION: The quote must be REAL and HISTORICALLY VERIFIED. 
  Do not invent quotes. Ensure the text is exactly what the author said or wrote.
  Return a JSON object with fields: text, author, category.
  The quote should be profound and motivational.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            text: { type: Type.STRING },
            author: { type: Type.STRING },
            category: { type: Type.STRING },
          },
          required: ["text", "author", "category"]
        }
      }
    });

    const data = JSON.parse(response.text || '{}');
    return {
      id: generateId(),
      text: data.text,
      author: data.author,
      category: data.category,
      imageUrl: `https://picsum.photos/800/600?grayscale&blur=2&random=${generateId()}` // Visual flair
    };
  } catch (error) {
    console.error("Gemini Error:", error);
    // Fallback
    return {
      id: 'fallback-1',
      text: "The only way to do great work is to love what you do.",
      author: "Steve Jobs",
      category: "Work",
      imageUrl: "https://picsum.photos/800/600?grayscale"
    };
  }
};

export const fetchQuotesByQuery = async (query: string, type: 'search' | 'author' | 'topic' | 'movie' | 'tv' | 'game' | 'book' | 'proverb' | 'lyrics' | 'anime' | 'poetry'): Promise<Quote[]> => {
  if (!ai) throw new Error("API Key missing");

  let prompt = "";
  if (type === 'author') {
    prompt = `List 8 famous, AUTHENTIC quotes by the author "${query}".
    CRITICAL INSTRUCTION: STRICTLY VERIFY ATTRIBUTION. 
    Many internet quotes are misattributed. Only return quotes that are found in this author's written works, speeches, or recorded interviews.
    If a quote is commonly misattributed to ${query} but not actually said by them, DO NOT include it.
    Return a JSON array of objects with keys: text, author (must be "${query}"), category.`;
  } else if (type === 'topic') {
    prompt = `List 8 inspiring, real quotes about "${query}". 
    Ensure the authors are real historical figures or verified contemporary voices.
    Return JSON array of objects with keys: text, author, category.`;
  } else if (type === 'movie') {
    prompt = `List 8 memorable and iconic quotes from the movie "${query}".
    Include the character name who said it in the author field (e.g., "The Joker (The Dark Knight)").
    Ensure quotes are word-for-word accurate to the film script.
    Return JSON array of objects with keys: text, author, category (use "${query}").`;
  } else if (type === 'tv') {
     prompt = `List 8 memorable and iconic quotes from the TV show "${query}".
    Include the character name who said it in the author field (e.g., "Walter White (Breaking Bad)").
    Ensure quotes are word-for-word accurate to the show script.
    Return JSON array of objects with keys: text, author, category (use "${query}").`;
  } else if (type === 'game') {
     prompt = `List 8 memorable and iconic quotes from the video game "${query}".
    Include the character name who said it in the author field (e.g., "Arthur Morgan (Red Dead Redemption 2)").
    Return JSON array of objects with keys: text, author, category (use "${query}").`;
  } else if (type === 'book') {
     prompt = `List 8 memorable quotes from the book "${query}".
    Ensure quotes are accurate to the text.
    Return JSON array of objects with keys: text, author (use the Author's Name), category (use "${query}").`;
  } else if (type === 'proverb') {
     prompt = `List 8 wise and famous "${query}".
    If the query is a specific culture (e.g. "Chinese Proverbs"), listing popular ones.
    Return JSON array of objects with keys: text, author (use "Proverb"), category (use "${query}").`;
  } else if (type === 'lyrics') {
     prompt = `List 8 famous lyrical lines or verses by the artist or from the album "${query}".
    Return JSON array of objects with keys: text (the lyric), author (The Artist Name), category (use "${query}").`;
  } else if (type === 'anime') {
     prompt = `List 8 memorable quotes from the anime "${query}".
    Include the character name in the author field.
    Return JSON array of objects with keys: text, author, category (use "${query}").`;
  } else if (type === 'poetry') {
     prompt = `List 8 famous lines or stanzas from the poem "${query}".
    Return JSON array of objects with keys: text, author (The Poet), category (use "Poetry").`;
  } else {
    // Default fallback for search
    prompt = `List 8 quotes related to the search term "${query}". 
    Ensure quotes are verified and not hallucinated.
    Return JSON array of objects with keys: text, author, category.`;
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              text: { type: Type.STRING },
              author: { type: Type.STRING },
              category: { type: Type.STRING },
            },
            required: ["text", "author", "category"]
          }
        }
      }
    });

    const data = JSON.parse(response.text || '[]');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return data.map((q: any) => ({
      id: generateId(),
      text: q.text,
      author: q.author,
      category: q.category
    }));

  } catch (error) {
    console.error("Gemini List Error:", error);
    return [];
  }
};