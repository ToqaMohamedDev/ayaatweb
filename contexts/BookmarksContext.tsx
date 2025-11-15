"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Bookmark } from "@/types";
import { StorageKeys, getStorageItem, setStorageItem } from "@/lib/storage";

interface BookmarksContextType {
  bookmarks: Bookmark[];
  addBookmark: (bookmark: Omit<Bookmark, "id" | "timestamp">) => void;
  removeBookmark: (id: string) => void;
  updateBookmark: (id: string, note: string) => void;
  isBookmarked: (surahNumber: number, ayahNumber: number) => boolean;
  getBookmark: (surahNumber: number, ayahNumber: number) => Bookmark | undefined;
}

const BookmarksContext = createContext<BookmarksContextType | undefined>(undefined);

export function BookmarksProvider({ children }: { children: ReactNode }) {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

  useEffect(() => {
    const saved = getStorageItem<Bookmark[]>(StorageKeys.BOOKMARKS, []);
    setBookmarks(saved);
  }, []);

  const saveBookmarks = (newBookmarks: Bookmark[]) => {
    setBookmarks(newBookmarks);
    setStorageItem(StorageKeys.BOOKMARKS, newBookmarks);
  };

  const addBookmark = (bookmark: Omit<Bookmark, "id" | "timestamp">) => {
    const newBookmark: Bookmark = {
      ...bookmark,
      id: `${bookmark.surahNumber}-${bookmark.ayahNumber}-${Date.now()}`,
      timestamp: Date.now(),
    };
    const updated = [...bookmarks, newBookmark];
    saveBookmarks(updated);
  };

  const removeBookmark = (id: string) => {
    const updated = bookmarks.filter((b) => b.id !== id);
    saveBookmarks(updated);
  };

  const updateBookmark = (id: string, note: string) => {
    const updated = bookmarks.map((b) =>
      b.id === id ? { ...b, note } : b
    );
    saveBookmarks(updated);
  };

  const isBookmarked = (surahNumber: number, ayahNumber: number): boolean => {
    return bookmarks.some(
      (b) => b.surahNumber === surahNumber && b.ayahNumber === ayahNumber
    );
  };

  const getBookmark = (surahNumber: number, ayahNumber: number): Bookmark | undefined => {
    return bookmarks.find(
      (b) => b.surahNumber === surahNumber && b.ayahNumber === ayahNumber
    );
  };

  return (
    <BookmarksContext.Provider
      value={{
        bookmarks,
        addBookmark,
        removeBookmark,
        updateBookmark,
        isBookmarked,
        getBookmark,
      }}
    >
      {children}
    </BookmarksContext.Provider>
  );
}

export function useBookmarks() {
  const context = useContext(BookmarksContext);
  if (context === undefined) {
    throw new Error("useBookmarks must be used within a BookmarksProvider");
  }
  return context;
}

