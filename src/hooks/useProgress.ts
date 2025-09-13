import { useState, useEffect } from 'react';
import { UserProgress } from '../types';

const STORAGE_KEY = 'love-notes-progress';

const defaultProgress: UserProgress = {
  unlockedDays: [1], // Start with day 1 unlocked
  favorites: [],
  responses: {},
  surpriseLettersUnlocked: [],
  lastVisit: new Date().toISOString()
};

export const useProgress = () => {
  const [progress, setProgress] = useState<UserProgress>(defaultProgress);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsedProgress = JSON.parse(saved);
        setProgress({ ...defaultProgress, ...parsedProgress });
      } catch (error) {
        console.error('Failed to parse saved progress:', error);
      }
    }
  }, []);

  const saveProgress = (newProgress: UserProgress) => {
    setProgress(newProgress);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newProgress));
  };

  const unlockDay = (day: number) => {
    const newProgress = {
      ...progress,
      unlockedDays: [...new Set([...progress.unlockedDays, day])].sort((a, b) => a - b)
    };
    saveProgress(newProgress);
  };

  const toggleFavorite = (day: number) => {
    const newFavorites = progress.favorites.includes(day)
      ? progress.favorites.filter(d => d !== day)
      : [...progress.favorites, day];
    
    const newProgress = {
      ...progress,
      favorites: newFavorites
    };
    saveProgress(newProgress);
  };

  const saveResponse = (day: number, response: string) => {
    const newProgress = {
      ...progress,
      responses: {
        ...progress.responses,
        [day]: response
      }
    };
    saveProgress(newProgress);
  };

  const unlockSurpriseLetter = (index: number) => {
    const newProgress = {
      ...progress,
      surpriseLettersUnlocked: [...new Set([...progress.surpriseLettersUnlocked, index])]
    };
    saveProgress(newProgress);
  };

  const updateLastVisit = () => {
    const newProgress = {
      ...progress,
      lastVisit: new Date().toISOString()
    };
    saveProgress(newProgress);
  };

  return {
    progress,
    unlockDay,
    toggleFavorite,
    saveResponse,
    unlockSurpriseLetter,
    updateLastVisit
  };
};