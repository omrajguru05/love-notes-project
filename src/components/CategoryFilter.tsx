import React from 'react';
import { Heart, BookOpen, Star, MapPin, Smile, MessageCircle } from 'lucide-react';

interface CategoryFilterProps {
  categories: string[];
  activeCategory: string | null;
  onCategoryChange: (category: string | null) => void;
}

const categoryIcons: Record<string, React.ReactNode> = {
  'Daily Love': <Heart className="w-4 h-4" />,
  'Memory Lane': <BookOpen className="w-4 h-4" />,
  'You Are Amazing': <Star className="w-4 h-4" />,
  'Future Dreams': <MapPin className="w-4 h-4" />,
  'Inside Jokes': <Smile className="w-4 h-4" />,
  'Deep Love': <MessageCircle className="w-4 h-4" />
};

export const CategoryFilter: React.FC<CategoryFilterProps> = ({ 
  categories, 
  activeCategory, 
  onCategoryChange 
}) => {
  return (
    <div className="mb-6 sm:mb-8">
      <div className="flex flex-wrap gap-2 sm:gap-3">
        <button
          onClick={() => onCategoryChange(null)}
          className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
            !activeCategory
              ? 'bg-[#8b5e3c] text-white shadow-lg'
              : 'bg-white text-[#5c4433] hover:bg-[#d4b58c]/20'
          }`}
        >
          All Notes
        </button>
        
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all flex items-center space-x-1 sm:space-x-2 ${
              activeCategory === category
                ? 'bg-[#8b5e3c] text-white shadow-lg'
                : 'bg-white text-[#5c4433] hover:bg-[#d4b58c]/20'
            }`}
          >
            <span className="w-3 h-3 sm:w-4 sm:h-4 flex items-center justify-center">
              {React.cloneElement(categoryIcons[category] as React.ReactElement, {
                className: 'w-3 h-3 sm:w-4 sm:h-4'
              })}
            </span>
            <span className="whitespace-nowrap">{category}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
