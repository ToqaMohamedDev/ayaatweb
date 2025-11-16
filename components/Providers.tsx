"use client";

import { ReactNode } from "react";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { BookmarksProvider } from "@/contexts/BookmarksContext";
import { FavoritesProvider } from "@/contexts/FavoritesContext";
import { AudioProvider } from "@/contexts/AudioContext";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import Navbar from "@/components/Navbar";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <BookmarksProvider>
        <FavoritesProvider>
          <AudioProvider>
            <ScrollProgressBar />
            <Navbar />
            {children}
          </AudioProvider>
        </FavoritesProvider>
      </BookmarksProvider>
    </ThemeProvider>
  );
}

