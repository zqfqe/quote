import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';

interface DirectoryItem {
  id: string;
  name: string;
  count?: number;
}

type ThemeColor = 'blue' | 'purple' | 'rose' | 'amber' | 'emerald' | 'indigo' | 'orange' | 'pink' | 'red' | 'teal';

interface DirectoryProps {
  title: string;
  items: DirectoryItem[];
  type: 'topic' | 'author' | 'movie' | 'tv' | 'game' | 'book' | 'proverb' | 'lyrics' | 'anime' | 'poetry';
  icon?: LucideIcon;
  theme?: ThemeColor;
}

const ALPHABET = "#ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');

const THEME_STYLES: Record<ThemeColor, { 
  activeBg: string; 
  hoverText: string; 
  groupHoverText: string;
  hoverBg: string; 
  groupHoverBg: string;
  iconBg: string; 
  iconColor: string; 
}> = {
  blue: { 
    activeBg: 'bg-blue-600', 
    hoverText: 'hover:text-blue-700',
    groupHoverText: 'group-hover:text-blue-700',
    hoverBg: 'hover:bg-blue-100',
    groupHoverBg: 'group-hover:bg-blue-400',
    iconBg: 'bg-blue-50', 
    iconColor: 'text-blue-600' 
  },
  purple: { 
    activeBg: 'bg-purple-600', 
    hoverText: 'hover:text-purple-700', 
    groupHoverText: 'group-hover:text-purple-700',
    hoverBg: 'hover:bg-purple-100',
    groupHoverBg: 'group-hover:bg-purple-400',
    iconBg: 'bg-purple-50', 
    iconColor: 'text-purple-600' 
  },
  rose: { 
    activeBg: 'bg-rose-600', 
    hoverText: 'hover:text-rose-700', 
    groupHoverText: 'group-hover:text-rose-700',
    hoverBg: 'hover:bg-rose-100', 
    groupHoverBg: 'group-hover:bg-rose-400',
    iconBg: 'bg-rose-50', 
    iconColor: 'text-rose-600' 
  },
  amber: { 
    activeBg: 'bg-amber-600', 
    hoverText: 'hover:text-amber-700', 
    groupHoverText: 'group-hover:text-amber-700',
    hoverBg: 'hover:bg-amber-100', 
    groupHoverBg: 'group-hover:bg-amber-400',
    iconBg: 'bg-amber-50', 
    iconColor: 'text-amber-600' 
  },
  emerald: {
    activeBg: 'bg-emerald-600', 
    hoverText: 'hover:text-emerald-700', 
    groupHoverText: 'group-hover:text-emerald-700',
    hoverBg: 'hover:bg-emerald-100', 
    groupHoverBg: 'group-hover:bg-emerald-400',
    iconBg: 'bg-emerald-50', 
    iconColor: 'text-emerald-600' 
  },
  indigo: {
    activeBg: 'bg-indigo-600', 
    hoverText: 'hover:text-indigo-700', 
    groupHoverText: 'group-hover:text-indigo-700',
    hoverBg: 'hover:bg-indigo-100', 
    groupHoverBg: 'group-hover:bg-indigo-400',
    iconBg: 'bg-indigo-50', 
    iconColor: 'text-indigo-600' 
  },
  orange: {
    activeBg: 'bg-orange-600', 
    hoverText: 'hover:text-orange-700', 
    groupHoverText: 'group-hover:text-orange-700',
    hoverBg: 'hover:bg-orange-100', 
    groupHoverBg: 'group-hover:bg-orange-400',
    iconBg: 'bg-orange-50', 
    iconColor: 'text-orange-600' 
  },
  pink: {
    activeBg: 'bg-pink-600', 
    hoverText: 'hover:text-pink-700', 
    groupHoverText: 'group-hover:text-pink-700',
    hoverBg: 'hover:bg-pink-100', 
    groupHoverBg: 'group-hover:bg-pink-400',
    iconBg: 'bg-pink-50', 
    iconColor: 'text-pink-600' 
  },
  red: {
    activeBg: 'bg-red-600', 
    hoverText: 'hover:text-red-700', 
    groupHoverText: 'group-hover:text-red-700',
    hoverBg: 'hover:bg-red-100', 
    groupHoverBg: 'group-hover:bg-red-400',
    iconBg: 'bg-red-50', 
    iconColor: 'text-red-600' 
  },
  teal: {
    activeBg: 'bg-teal-600', 
    hoverText: 'hover:text-teal-700', 
    groupHoverText: 'group-hover:text-teal-700',
    hoverBg: 'hover:bg-teal-100', 
    groupHoverBg: 'group-hover:bg-teal-400',
    iconBg: 'bg-teal-50', 
    iconColor: 'text-teal-600' 
  }
};

const Directory: React.FC<DirectoryProps> = ({ title, items, type, icon: Icon, theme = 'blue' }) => {
  const [activeLetter, setActiveLetter] = useState<string>('A');
  const styles = THEME_STYLES[theme];

  // Group items by first letter
  const groupedItems = useMemo(() => {
    const groups: Record<string, DirectoryItem[]> = {};
    
    // Initialize groups
    ALPHABET.forEach(letter => groups[letter] = []);

    items.forEach(item => {
      let firstChar = item.name.charAt(0).toUpperCase();
      // Handle numbers or symbols
      if (!ALPHABET.includes(firstChar)) {
        firstChar = '#';
      }
      
      if (groups[firstChar]) {
        groups[firstChar].push(item);
      } else {
        if (!groups['#']) groups['#'] = []; // Safety check
        groups['#'].push(item);
      }
    });
    return groups;
  }, [items]);

  const displayItems = groupedItems[activeLetter] || [];

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden mb-12 scroll-mt-24" id={type}>
      {/* Header */}
      <div className="p-6 md:p-8 border-b border-gray-50 flex items-center space-x-4">
        {Icon && (
            <div className={`p-3 rounded-2xl ${styles.iconBg} ${styles.iconColor}`}>
                <Icon className="w-6 h-6 md:w-8 md:h-8" />
            </div>
        )}
        <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900">{title}</h3>
      </div>

      <div className="p-4 md:p-8">
        {/* Alphabet Navigation */}
        {/* Mobile: Horizontal Scroll. Desktop: Wrap. */}
        <div className="flex overflow-x-auto md:flex-wrap gap-2 mb-8 pb-4 md:pb-6 md:justify-center no-scrollbar -mx-4 px-4 md:mx-0 md:px-0 md:border-b md:border-gray-50 snap-x">
          {ALPHABET.map((letter) => {
            const hasItems = groupedItems[letter]?.length > 0;
            const isActive = activeLetter === letter;
            
            return (
              <button
                key={letter}
                onClick={() => hasItems && setActiveLetter(letter)}
                disabled={!hasItems}
                className={`
                  snap-center flex-shrink-0 w-10 h-10 md:w-11 md:h-11 text-sm md:text-base font-semibold rounded-xl transition-all flex items-center justify-center
                  ${isActive 
                    ? `${styles.activeBg} text-white shadow-md scale-110` 
                    : hasItems 
                      ? `bg-gray-50 text-gray-700 ${styles.hoverBg} ${styles.hoverText} cursor-pointer` 
                      : 'bg-transparent text-gray-200 cursor-default'
                  }
                `}
              >
                {letter}
              </button>
            );
          })}
        </div>

        {/* Grid of Items */}
        {displayItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {displayItems.map((item) => (
              <Link
                key={item.id}
                to={`/explore?type=${type}&q=${encodeURIComponent(item.name)}`}
                className="flex items-center group p-3 rounded-xl hover:bg-gray-50 border border-transparent hover:border-gray-100 transition-all"
              >
                <div className={`w-2 h-2 rounded-full bg-gray-200 ${styles.groupHoverBg} mr-3 shrink-0 transition-colors`}></div>
                <span className={`text-gray-700 font-medium ${styles.groupHoverText} transition truncate text-sm md:text-base`}>
                  {item.name}
                </span>
                {item.count && (
                  <span className="ml-auto text-xs text-gray-400 group-hover:text-gray-500 pl-2">
                    {item.count}
                  </span>
                )}
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-10 text-gray-400 italic bg-gray-50 rounded-2xl border border-dashed border-gray-200">
            No items found starting with "{activeLetter}"
          </div>
        )}
      </div>
    </div>
  );
};

export default Directory;