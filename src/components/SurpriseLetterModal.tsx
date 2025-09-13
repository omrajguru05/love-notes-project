import React from 'react';
import { X, Heart } from 'lucide-react';
import { SurpriseLetter } from '../types';

interface SurpriseLetterModalProps {
  letter: SurpriseLetter | null;
  isOpen: boolean;
  onClose: () => void;
}

export const SurpriseLetterModal: React.FC<SurpriseLetterModalProps> = ({
  letter,
  isOpen,
  onClose
}) => {
  if (!isOpen || !letter) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl max-w-2xl w-full max-h-[85vh] sm:max-h-[90vh] overflow-hidden">
        <div className="bg-gradient-to-br from-[#8b5e3c] to-[#a47551] p-4 sm:p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Heart className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="text-base sm:text-xl font-bold truncate">{letter.title}</h2>
                <p className="text-xs sm:text-sm opacity-90">A special message for you</p>
              </div>
            </div>
            
            <button
              onClick={onClose}
              className="p-1.5 sm:p-2 hover:bg-white/10 rounded-full transition-colors ml-2 flex-shrink-0"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>
        
        <div className="p-4 sm:p-6 md:p-8 overflow-y-auto max-h-[calc(85vh-120px)] sm:max-h-[calc(90vh-140px)]">
          <div className="prose prose-sm sm:prose-base md:prose-lg max-w-none">
            {letter.content.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-3 sm:mb-4 leading-relaxed text-[#3c2f2f] text-sm sm:text-base">
                {paragraph}
              </p>
            ))}
          </div>
          
          <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-[#d4b58c]/30 text-center">
            <p className="text-xs sm:text-sm text-[#7a6a58] italic px-2">
              From Kolhapur to Mumbai, with all my love ❤️
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};