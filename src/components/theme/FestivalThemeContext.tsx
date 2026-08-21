"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { FestivalType, FestivalTheme, FESTIVALS } from "./FestivalConfig";

interface FestivalContextType {
  activeFestival: FestivalTheme;
  setFestival: (type: FestivalType) => void;
  isTrailEnabled: boolean;
  setIsTrailEnabled: (enabled: boolean) => void;
}

const FestivalThemeContext = createContext<FestivalContextType | undefined>(undefined);

export const FestivalThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Default to Rakshabandhan matching user's current festive request
  const [festivalType, setFestivalType] = useState<FestivalType>("rakshabandhan");
  const [isTrailEnabled, setIsTrailEnabled] = useState(true);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("fukey_active_festival");
      if (saved && FESTIVALS[saved as FestivalType]) {
        setFestivalType(saved as FestivalType);
      }
    } catch (e) {}
  }, []);

  const setFestival = (type: FestivalType) => {
    setFestivalType(type);
    try {
      localStorage.setItem("fukey_active_festival", type);
    } catch (e) {}
  };

  const activeFestival = FESTIVALS[festivalType] || FESTIVALS.rakshabandhan;

  return (
    <FestivalThemeContext.Provider
      value={{
        activeFestival,
        setFestival,
        isTrailEnabled,
        setIsTrailEnabled,
      }}
    >
      {children}
    </FestivalThemeContext.Provider>
  );
};

export const useFestivalTheme = () => {
  const context = useContext(FestivalThemeContext);
  if (!context) {
    throw new Error("useFestivalTheme must be used within a FestivalThemeProvider");
  }
  return context;
};
