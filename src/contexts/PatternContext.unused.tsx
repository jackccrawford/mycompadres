import React, { createContext, useContext, useState } from 'react';

type Pattern = 'masonry' | 'cowbell' | 'cardswipe' | 'infinitescroll';

interface PatternContextType {
  currentPattern: Pattern;
  setPattern: (pattern: Pattern) => void;
}

const PatternContext = createContext<PatternContextType | undefined>(undefined);

export const PatternProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPattern, setPattern] = useState<Pattern>('masonry');

  return (
    <PatternContext.Provider value={{ currentPattern, setPattern }}>
      {children}
    </PatternContext.Provider>
  );
};

export const usePattern = () => {
  const context = useContext(PatternContext);
  if (context === undefined) {
    throw new Error('usePattern must be used within a PatternProvider');
  }
  return context;
};
