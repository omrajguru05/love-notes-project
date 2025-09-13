export interface Note {
  day: number;
  category: string;
  type: string;
  content: string;
}

export interface SurpriseLetter {
  title: string;
  content: string;
}

export interface AppData {
  projectName: string;
  description: string;
  formspree: {
    endpoint: string;
    fields: string[];
    method: string;
  };
  designSystem: {
    colors: {
      primary: string;
      secondary: string;
      accent: string;
      background: {
        light: string;
        dark: string;
      };
      cards: {
        light: string;
        dark: string;
      };
      text: {
        primary: string;
        secondary: string;
        light: string;
      };
    };
    typography: {
      primary: string;
      secondary: string;
      sizes: Record<string, string>;
    };
    spacing: {
      grid: string;
      card: string;
      section: string;
    };
    shadows: {
      card: string;
      cardHover: string;
      modal: string;
    };
    borderRadius: {
      card: string;
      modal: string;
      button: string;
    };
  };
  notes: Note[];
  surpriseLetters: SurpriseLetter[];
}

export interface UserProgress {
  unlockedDays: number[];
  favorites: number[];
  responses: Record<number, string>;
  surpriseLettersUnlocked: number[];
  lastVisit: string;
}