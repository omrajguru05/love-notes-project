import React from 'react';
import { Gift, Lock } from 'lucide-react';

interface SurpriseLetterCardProps {
  title: string;
  isUnlocked: boolean;
  requiredProgress: number;
  currentProgress: number;
  onUnlock: () => void;
  onClick: () => void;
}

export const SurpriseLetterCard: React.FC<SurpriseLetterCardProps> = ({
  title,
  isUnlocked,
  requiredProgress,
  currentProgress,
  onUnlock,
  onClick
}) => {
  const canUnlock = currentProgress >= requiredProgress;

  return (
    <div className="group relative overflow-hidden">
      <div className={`bg-gradient-to-br ${
        isUnlocked 
          ? 'from-[#8b5e3c]/20 to-[#a47551]/20 border-[#8b5e3c]/30'
          : 'from-[#d4b58c]/20 to-[#d4b58c]/30 border-[#d4b58c]/40'
      } rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 border`}>
        
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center ${
              isUnlocked ? 'bg-[#8b5e3c] text-white' : 'bg-[#d4b58c]/50 text-[#8b5e3c]'
            }`}>
              {isUnlocked ? <Gift className="w-4 h-4 sm:w-5 sm:h-5" /> : <Lock className="w-4 h-4 sm:w-5 sm:h-5" />}
            </div>
            <div className="min-w-0">
              <h3 className={`text-sm sm:text-base font-semibold truncate ${
                isUnlocked ? 'text-[#3c2f2f]' : 'text-[#7a6a58]'
              }`}>
                {title}
              </h3>
              <p className="text-[10px] sm:text-xs text-[#7a6a58]">
                Special Letter
              </p>
            </div>
          </div>
        </div>

        {!isUnlocked && (
          <div className="mb-3 sm:mb-4">
            <div className="flex justify-between items-center mb-1.5 sm:mb-2">
              <span className="text-xs sm:text-sm text-[#7a6a58]">Progress</span>
              <span className="text-xs sm:text-sm font-medium text-[#7a6a58]">
                {currentProgress} / {requiredProgress}
              </span>
            </div>
            <div className="w-full h-1.5 sm:h-2 bg-[#d4b58c]/30 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#8b5e3c] to-[#a47551] transition-all duration-500"
                style={{ width: `${Math.min((currentProgress / requiredProgress) * 100, 100)}%` }}
              />
            </div>
          </div>
        )}

        <div className="text-center py-3 sm:py-4">
          {isUnlocked ? (
            <button
              onClick={onClick}
              className="px-4 sm:px-6 py-2 sm:py-3 bg-[#8b5e3c] hover:bg-[#a47551] text-white rounded-full text-sm sm:text-base font-medium transition-colors"
            >
              Read Letter
            </button>
          ) : canUnlock ? (
            <button
              onClick={onUnlock}
              className="px-4 sm:px-6 py-2 sm:py-3 bg-[#8b5e3c] hover:bg-[#a47551] text-white rounded-full text-sm sm:text-base font-medium transition-colors"
            >
              Unlock Letter
            </button>
          ) : (
            <div className="text-xs sm:text-sm text-[#7a6a58]">
              Unlock {requiredProgress - currentProgress} more notes
            </div>
          )}
        </div>
      </div>
    </div>
  );
};