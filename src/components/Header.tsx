import React from 'react';
import { Heart } from 'lucide-react';

interface HeaderProps {
  totalNotes: number;
  unlockedCount: number;
}

export const Header: React.FC<HeaderProps> = ({ totalNotes, unlockedCount }) => {
  const progressPercentage = Math.round((unlockedCount / totalNotes) * 100);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-[#d4b58c]/20">
      <div className="max-w-6xl mx-auto px-3 sm:px-4 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-[#8b5e3c] to-[#a47551] rounded-full flex items-center justify-center flex-shrink-0">
              <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-white fill-current" />
            </div>
            <div className="min-w-0">
              <h1 className="text-base sm:text-xl font-bold text-[#3c2f2f] truncate">
                30 Days of Love
              </h1>
              <p className="text-xs sm:text-sm text-[#7a6a58] hidden sm:block">
                From Kolhapur to Mumbai, with love
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4">
            <div className="text-right">
              <div className="text-xs sm:text-sm font-medium text-[#3c2f2f]">
                {unlockedCount} / {totalNotes}
              </div>
              <div className="text-[10px] sm:text-xs text-[#7a6a58]">
                {progressPercentage}% complete
              </div>
            </div>
            
            <div className="w-16 sm:w-20 h-2 bg-[#d4b58c]/30 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#8b5e3c] to-[#a47551] transition-all duration-1000 ease-out"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};