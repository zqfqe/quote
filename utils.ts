
/**
 * Converts a string into a URL-friendly slug.
 * e.g. "Steve Jobs" -> "steve-jobs"
 * e.g. "Rock & Roll" -> "rock-roll"
 */
export const slugify = (text: string): string => {
  if (!text) return '';
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')        // Replace spaces with -
    .replace(/[^\w\-]+/g, '')    // Remove all non-word chars
    .replace(/\-\-+/g, '-');     // Replace multiple - with single -
};

/**
 * Converts a slug back into a readable title (simple approximation).
 * Used as a fallback for display titles before data loads.
 * e.g. "steve-jobs" -> "Steve Jobs"
 */
export const unslugify = (slug: string): string => {
  if (!slug) return '';
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

/**
 * Generates a deterministic color gradient based on a string input.
 */
const getGradient = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  const c1 = `hsl(${hash % 360}, 70%, 85%)`;
  const c2 = `hsl(${(hash + 40) % 360}, 70%, 90%)`;
  return `linear-gradient(135deg, ${c1}, ${c2})`;
};

/**
 * Generates a dynamic SVG Data URI containing the quote text.
 * This ensures Google Vision AI sees text, not random photos.
 */
export const generateQuoteImage = (text: string, author: string): string => {
  // Simple text wrapping for SVG
  const words = text.split(' ');
  let lines = [];
  let currentLine = words[0];

  for (let i = 1; i < words.length; i++) {
      if (currentLine.length + words[i].length < 25) { // Approx char limit per line
          currentLine += " " + words[i];
      } else {
          lines.push(currentLine);
          currentLine = words[i];
      }
  }
  lines.push(currentLine);
  
  // Limit to 6 lines to prevent overflow
  if (lines.length > 6) {
    lines = lines.slice(0, 5);
    lines.push("...");
  }

  const svgLines = lines.map((line, i) => 
    `<text x="50%" y="${40 + (i * 12)}%" dominant-baseline="middle" text-anchor="middle" font-family="Georgia, serif" font-size="24" fill="#333">${line}</text>`
  ).join('');

  // Deterministic background color
  let hash = 0;
  for (let i = 0; i < author.length; i++) hash = author.charCodeAt(i) + ((hash << 5) - hash);
  const hue = Math.abs(hash % 360);
  const color1 = `hsl(${hue}, 80%, 92%)`;
  const color2 = `hsl(${(hue + 60) % 360}, 80%, 88%)`;

  const svg = `
  <svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:${color1};stop-opacity:1" />
        <stop offset="100%" style="stop-color:${color2};stop-opacity:1" />
      </linearGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#grad)" />
    ${svgLines}
    <text x="50%" y="85%" dominant-baseline="middle" text-anchor="middle" font-family="Arial, sans-serif" font-size="18" fill="#555" font-weight="bold">— ${author}</text>
    <text x="50%" y="95%" dominant-baseline="middle" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" fill="#999">MAXIMUSQUOTES.ORG</text>
  </svg>
  `;

  return `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svg)))}`;
};
