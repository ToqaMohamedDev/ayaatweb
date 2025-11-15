"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { AppSettings } from "@/types";
import { StorageKeys, getStorageItem, setStorageItem } from "@/lib/storage";

interface ThemeContextType {
  settings: AppSettings;
  toggleTheme: () => void;
  setFontSize: (size: AppSettings["fontSize"]) => void;
}

const defaultSettings: AppSettings = {
  theme: "light",
  fontSize: "medium",
  fontFamily: "arabic",
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<AppSettings>(defaultSettings);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = getStorageItem<AppSettings>(StorageKeys.APP_SETTINGS, defaultSettings);
    setSettings(saved);
    
    // تطبيق الثيم
    if (saved.theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    setStorageItem(StorageKeys.APP_SETTINGS, settings);
    
    // تطبيق الثيم
    if (settings.theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [settings, mounted]);

  const toggleTheme = () => {
    setSettings((prev) => ({
      ...prev,
      theme: prev.theme === "light" ? "dark" : "light",
    }));
  };

  const setFontSize = (size: AppSettings["fontSize"]) => {
    setSettings((prev) => ({ ...prev, fontSize: size }));
  };

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <ThemeContext.Provider value={{ settings, toggleTheme, setFontSize }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    // Return default values if context is not available (e.g., during SSR)
    return {
      settings: defaultSettings,
      toggleTheme: () => {},
      setFontSize: () => {},
    };
  }
  return context;
}

