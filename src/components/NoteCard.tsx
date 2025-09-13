import React, { useState } from 'react';
import { Heart, Lock, MessageSquare, Send } from 'lucide-react';
import { Note } from '../types';

interface NoteCardProps {
  note: Note;
  isUnlocked: boolean;
  isFavorite: boolean;
  response: string;
  onUnlock: () => void;
  onToggleFavorite: () => void;
  onSaveResponse: (response: string) => void;
  onSubmitResponse: (noteNumber: number, response: string) => void;
}

const getCardGradient = (category: string) => {
  const gradients: Record<string, string> = {
    'Daily Love': 'from-[#fdfcf8] to-[#d4b58c]/10',
    'Memory Lane': 'from-[#fdfcf8] to-[#d4b58c]/15',
    'You Are Amazing': 'from-[#fdfcf8] to-[#d4b58c]/20',
    'Future Dreams': 'from-[#fdfcf8] to-[#d4b58c]/25',
    'Inside Jokes': 'from-[#fdfcf8] to-[#d4b58c]/30',
    'Deep Love': 'from-[#8b5e3c]/10 to-[#a47551]/10'
  };
  return gradients[category] || 'from-[#fdfcf8] to-white';
};

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'love_letter':
      return '💌';
    case 'affirmation':
      return '✨';
    case 'vision':
      return '🌟';
    case 'playful':
      return '😊';
    case 'letter':
      return '📝';
    default:
      return '💝';
  }
};

export const NoteCard: React.FC<NoteCardProps> = ({
  note,
  isUnlocked,
  isFavorite,
  response,
  onUnlock,
  onToggleFavorite,
  onSaveResponse,
  onSubmitResponse
}) => {
  const [showResponse, setShowResponse] = useState(false);
  const [responseText, setResponseText] = useState(response);

  const handleResponseSubmit = () => {
    onSaveResponse(responseText);
    onSubmitResponse(note.day, responseText);
    setShowResponse(false);
  };

  if (!isUnlocked) {
    return (
      <div className="group relative overflow-hidden">
        <div className="bg-gradient-to-br from-[#d4b58c]/20 to-[#d4b58c]/30 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-[#d4b58c]/50 rounded-full flex items-center justify-center">
                <Lock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#8b5e3c]" />
              </div>
              <span className="text-xs sm:text-sm font-medium text-[#7a6a58]">Day {note.day}</span>
            </div>
            <div className="text-[10px] sm:text-xs px-2 py-1 bg-[#d4b58c]/40 rounded-full text-[#5c4433]">
              {note.category}
            </div>
          </div>
          
          <div className="text-center py-6 sm:py-8">
            <Lock className="w-10 h-10 sm:w-12 sm:h-12 text-[#8b5e3c] mx-auto mb-3 sm:mb-4" />
            <button
              onClick={onUnlock}
              className="px-4 sm:px-6 py-2 sm:py-3 bg-[#8b5e3c] hover:bg-[#a47551] text-white rounded-full text-sm sm:text-base font-medium transition-colors"
            >
              Unlock Day {note.day}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group relative overflow-hidden">
      <div className={`bg-gradient-to-br ${getCardGradient(note.category)} rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/50`}>
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="text-xl sm:text-2xl">{getTypeIcon(note.type)}</div>
            <div>
              <span className="text-xs sm:text-sm font-medium text-[#3c2f2f]">Day {note.day}</span>
              <div className="text-[10px] sm:text-xs text-[#7a6a58]">{note.type.replace('_', ' ')}</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-1 sm:space-x-2">
            <button
              onClick={onToggleFavorite}
              className={`p-1.5 sm:p-2 rounded-full transition-all ${
                isFavorite 
                  ? 'text-[#8b5e3c] bg-[#d4b58c]/30' 
                  : 'text-[#7a6a58] hover:text-[#8b5e3c] hover:bg-[#d4b58c]/20'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isFavorite ? 'fill-current' : ''}`} />
            </button>
            
            <div className="text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 bg-[#d4b58c]/30 rounded-full text-[#5c4433]">
              {note.category}
            </div>
          </div>
        </div>

        <div className="mb-4 sm:mb-6">
          <p className="text-[#3c2f2f] leading-relaxed text-sm sm:text-base md:text-lg">
            {note.content}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <button
            onClick={() => setShowResponse(!showResponse)}
            className="flex items-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-[#8b5e3c]/10 hover:bg-[#8b5e3c]/20 rounded-lg transition-colors text-[#8b5e3c]">
            <MessageSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span className="text-xs sm:text-sm">
              {response ? 'Edit Response' : 'Add Response'}
            </span>
          </button>
          
          <div className="text-[10px] sm:text-xs text-[#7a6a58]">
            From Om, with love
          </div>
        </div>

        {showResponse && (
          <div className="mt-3 sm:mt-4 p-3 sm:p-4 bg-white/50 rounded-lg">
            <textarea
              value={responseText}
              onChange={(e) => setResponseText(e.target.value)}
              placeholder="Share your thoughts..."
              className="w-full p-2 sm:p-3 text-sm sm:text-base border border-[#d4b58c]/30 rounded-lg resize-none focus:outline-none focus:border-[#8b5e3c] bg-white"
              rows={3}
            />
            <div className="flex justify-end space-x-2 mt-2 sm:mt-3">
              <button
                onClick={() => setShowResponse(false)}
                className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-[#7a6a58] hover:bg-[#d4b58c]/10 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleResponseSubmit}
                className="flex items-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-[#8b5e3c] hover:bg-[#a47551] text-white text-xs sm:text-sm rounded-lg transition-colors"
              >
                <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>Save Response</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};