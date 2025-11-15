"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { FavoriteAyah } from "@/types";
import { StorageKeys, getStorageItem, setStorageItem } from "@/lib/storage";

interface FavoritesContextType {
  favorites: FavoriteAyah[];
  addFavorite: (favorite: Omit<FavoriteAyah, "id" | "timestamp">) => void;
  removeFavorite: (id: string) => void;
  updateFavorite: (id: string, category?: string, note?: string) => void;
  isFavorite: (surahNumber: number, ayahNumber: number) => boolean;
  getFavorite: (surahNumber: number, ayahNumber: number) => FavoriteAyah | undefined;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<FavoriteAyah[]>([]);

  useEffect(() => {
    const saved = getStorageItem<FavoriteAyah[]>(StorageKeys.FAVORITES, []);
    setFavorites(saved);
  }, []);

  const saveFavorites = (newFavorites: FavoriteAyah[]) => {
    setFavorites(newFavorites);
    setStorageItem(StorageKeys.FAVORITES, newFavorites);
  };

  const addFavorite = (favorite: Omit<FavoriteAyah, "id" | "timestamp">) => {
    const newFavorite: FavoriteAyah = {
      ...favorite,
      id: `${favorite.surahNumber}-${favorite.ayahNumber}-${Date.now()}`,
      timestamp: Date.now(),
    };
    const updated = [...favorites, newFavorite];
    saveFavorites(updated);
  };

  const removeFavorite = (id: string) => {
    const updated = favorites.filter((f) => f.id !== id);
    saveFavorites(updated);
  };

  const updateFavorite = (id: string, category?: string, note?: string) => {
    const updated = favorites.map((f) =>
      f.id === id
        ? {
            ...f,
            ...(category && { category: category as FavoriteAyah["category"] }),
            ...(note !== undefined && { note }),
          }
        : f
    );
    saveFavorites(updated);
  };

  const isFavorite = (surahNumber: number, ayahNumber: number): boolean => {
    return favorites.some(
      (f) => f.surahNumber === surahNumber && f.ayahNumber === ayahNumber
    );
  };

  const getFavorite = (surahNumber: number, ayahNumber: number): FavoriteAyah | undefined => {
    return favorites.find(
      (f) => f.surahNumber === surahNumber && f.ayahNumber === ayahNumber
    );
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
        updateFavorite,
        isFavorite,
        getFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
}

