"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Language, translations, getTranslation } from "@/lib/translations";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, fallback?: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("fukey_language") as Language;
      if (saved === "en" || saved === "hi") {
        setLanguageState(saved);
        document.documentElement.lang = saved;
      }
    } catch (e) {}
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem("fukey_language", lang);
      document.documentElement.lang = lang;
    } catch (e) {}
  };

  const t = (key: string, fallback?: string) => {
    return getTranslation(language, key, fallback);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useTranslation must be used within a LanguageProvider");
  }
  return context;
};
