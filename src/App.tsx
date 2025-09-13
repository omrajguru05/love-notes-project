import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { CategoryFilter } from './components/CategoryFilter';
import { NoteCard } from './components/NoteCard';
import { SurpriseLetterCard } from './components/SurpriseLetterCard';
import { SurpriseLetterModal } from './components/SurpriseLetterModal';
import { useProgress } from './hooks/useProgress';
import { appData } from './data/appData';
import { submitToFormspree } from './utils/formspree';
import { SurpriseLetter } from './types';

function App() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [selectedSurpriseLetter, setSelectedSurpriseLetter] = useState<SurpriseLetter | null>(null);
  const [showSurpriseModal, setShowSurpriseModal] = useState(false);

  const {
    progress,
    unlockDay,
    toggleFavorite,
    saveResponse,
    unlockSurpriseLetter,
    updateLastVisit
  } = useProgress();

  useEffect(() => {
    updateLastVisit();
  }, [updateLastVisit]);

  const categories = [...new Set(appData.notes.map(note => note.category))];

  const filteredNotes = activeCategory
    ? appData.notes.filter(note => note.category === activeCategory)
    : appData.notes;

  const handleSubmitResponse = async (noteNumber: number, response: string) => {
    try {
      await submitToFormspree(appData.formspree.endpoint, {
        message: response,
        noteNumber,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Failed to submit response:', error);
    }
  };

  const handleUnlockSurpriseLetter = (index: number) => {
    unlockSurpriseLetter(index);
    setSelectedSurpriseLetter(appData.surpriseLetters[index]);
    setShowSurpriseModal(true);
  };

  const handleSurpriseLetterClick = (index: number) => {
    setSelectedSurpriseLetter(appData.surpriseLetters[index]);
    setShowSurpriseModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdfcf8] via-white to-[#fdfcf8]">
      <Header
        totalNotes={appData.notes.length}
        unlockedCount={progress.unlockedDays.length}
      />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Welcome Section */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#3c2f2f] mb-3 sm:mb-4">
            For Aaru, With Love
          </h2>
          <p className="text-base sm:text-lg text-[#7a6a58] max-w-2xl mx-auto px-2 sm:px-0">
            A collection of love notes written from the heart, spanning the distance from Kolhapur to Mumbai. 
            Each day brings a new message, a new memory, a new reason to smile.
          </p>
        </div>

        {/* Category Filter */}
        <CategoryFilter
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        {/* Surprise Letters */}
        <div className="mb-8 sm:mb-12">
          <h3 className="text-xl sm:text-2xl font-bold text-[#3c2f2f] mb-4 sm:mb-6">
            Special Surprise Letters
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {appData.surpriseLetters.map((letter, index) => (
              <SurpriseLetterCard
                key={index}
                title={letter.title}
                isUnlocked={progress.surpriseLettersUnlocked.includes(index)}
                requiredProgress={index === 0 ? 10 : 20}
                currentProgress={progress.unlockedDays.length}
                onUnlock={() => handleUnlockSurpriseLetter(index)}
                onClick={() => handleSurpriseLetterClick(index)}
              />
            ))}
          </div>
        </div>

        {/* Notes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredNotes.map((note) => (
            <NoteCard
              key={note.day}
              note={note}
              isUnlocked={progress.unlockedDays.includes(note.day)}
              isFavorite={progress.favorites.includes(note.day)}
              response={progress.responses[note.day] || ''}
              onUnlock={() => unlockDay(note.day)}
              onToggleFavorite={() => toggleFavorite(note.day)}
              onSaveResponse={(response) => saveResponse(note.day, response)}
              onSubmitResponse={handleSubmitResponse}
            />
          ))}
        </div>

        {/* Footer */}
        <footer className="mt-12 sm:mt-16 py-6 sm:py-8 border-t border-[#d4b58c]/20 text-center">
          <p className="text-sm sm:text-base text-[#7a6a58] px-4">
            Made with ❤️ for the love that bridges cities
          </p>
          <p className="text-xs sm:text-sm text-[#7a6a58] mt-2 px-4">
            From Kolhapur to Mumbai, distance means nothing when love means everything
          </p>
        </footer>
      </main>

      {/* Surprise Letter Modal */}
      <SurpriseLetterModal
        letter={selectedSurpriseLetter}
        isOpen={showSurpriseModal}
        onClose={() => setShowSurpriseModal(false)}
      />
    </div>
  );
}

export default App;