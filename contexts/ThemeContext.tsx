"use client";

import React, { createContext, useContext, useState, useEffect, useLayoutEffect, ReactNode } from "react";
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

  // استخدام useLayoutEffect لتطبيق الثيم قبل الرسم لتقليل flicker
  useLayoutEffect(() => {
    const saved = getStorageItem<AppSettings>(StorageKeys.APP_SETTINGS, defaultSettings);
    setSettings(saved);
    
    // تطبيق الثيم فوراً
    const root = document.documentElement;
    if (saved.theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    
    setMounted(true);
  }, []);

  // استخدام useLayoutEffect لتطبيق الثيم قبل re-render
  useLayoutEffect(() => {
    if (!mounted) return;
    
    const root = document.documentElement;
    
    // تطبيق الثيم بشكل فوري
    if (settings.theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    
    // حفظ الإعدادات بعد تطبيق الثيم
    setStorageItem(StorageKeys.APP_SETTINGS, settings);
  }, [settings.theme, mounted]);

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

