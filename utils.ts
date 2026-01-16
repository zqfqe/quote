
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
