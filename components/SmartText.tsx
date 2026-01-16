
import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { POPULAR_TOPICS, POPULAR_AUTHORS } from '../constants';
import { slugify } from '../utils';

interface SmartTextProps {
  text: string;
  className?: string;
}

/**
 * SmartText Component (The "Wikipedia Effect")
 * Scans the input text for known Authors and Topics.
 * Replaces plain text with React Router Links.
 */
const SmartText: React.FC<SmartTextProps> = ({ text, className = "" }) => {
  // 1. Prepare the Lookup Table (Memoized for performance)
  const { regex, map } = useMemo(() => {
    const linkMap = new Map<string, string>();
    const terms: string[] = [];

    // Combine sources. Prioritize longer names to prevent partial matches 
    // (e.g., match "Steve Jobs" before just "Jobs" or "Steve")
    const allEntities = [
      ...POPULAR_AUTHORS.map(a => ({ name: a.name, link: `/quotes/author/${a.slug || slugify(a.name)}` })),
      ...POPULAR_TOPICS.map(t => ({ name: t.name, link: `/quotes/topic/${t.slug || slugify(t.name)}` }))
    ];

    // Sort by length descending
    allEntities.sort((a, b) => b.name.length - a.name.length);

    allEntities.forEach(entity => {
      const lowerName = entity.name.toLowerCase();
      // Only add if not already present (topics vs authors might overlap, prioritize authors usually)
      if (!linkMap.has(lowerName)) {
        linkMap.set(lowerName, entity.link);
        // Escape regex special characters
        const escaped = entity.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        terms.push(escaped);
      }
    });

    // Create a robust regex:
    // \b ensures we match whole words only (prevents "Art" matching inside "Smart")
    // (term1|term2|...)
    const pattern = new RegExp(`\\b(${terms.join('|')})\\b`, 'gi');
    
    return { regex: pattern, map: linkMap };
  }, []);

  if (!text) return null;

  // 2. Parse and Replace
  const parts = text.split(regex);

  return (
    <span className={className}>
      {parts.map((part, i) => {
        const lowerPart = part.toLowerCase();
        const link = map.get(lowerPart);

        if (link) {
          return (
            <Link 
              key={i} 
              to={link} 
              className="text-brand-600 hover:text-brand-800 hover:underline decoration-brand-300 underline-offset-2 font-medium transition-colors"
            >
              {part}
            </Link>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </span>
  );
};

export default SmartText;
