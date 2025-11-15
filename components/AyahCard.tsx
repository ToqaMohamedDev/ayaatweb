"use client";

import { Ayah } from "@/types";
import { BookmarkButton } from "./BookmarkButton";
import { FavoriteButton } from "./FavoriteButton";
import { Copy, Share2 } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { useState } from "react";

interface AyahCardProps {
  ayah: Ayah;
  surahNumber: number;
  surahName: string;
  showBismillah?: boolean;
}

export function AyahCard({ ayah, surahNumber, surahName, showBismillah }: AyahCardProps) {
  const { settings } = useTheme();
  const [copied, setCopied] = useState(false);

  const fontSizeClasses = {
    small: "text-lg",
    medium: "text-xl",
    large: "text-2xl",
    xlarge: "text-3xl",
  };

  const copyAyah = async () => {
    const text = `${ayah.text} (${surahName} ${ayah.numberInSurah})`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const shareAyah = async () => {
    const text = `${ayah.text}\n\n${surahName} - الآية ${ayah.numberInSurah}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${surahName} - الآية ${ayah.numberInSurah}`,
          text: text,
        });
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      copyAyah();
    }
  };

  return (
    <div className="group relative card mb-6 overflow-hidden">
      {/* Decorative gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50/50 via-transparent to-secondary-50/50 dark:from-primary-900/10 dark:via-transparent dark:to-secondary-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Actions Bar */}
      <div className="absolute top-4 left-4 rtl:left-auto rtl:right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-[-10px] group-hover:translate-y-0 z-10 flex items-center gap-2 rtl:gap-reverse glass rounded-xl p-2 shadow-lg">
        <BookmarkButton
          surahNumber={surahNumber}
          surahName={surahName}
          ayahNumber={ayah.numberInSurah}
          ayahText={ayah.text}
        />
        <FavoriteButton
          surahNumber={surahNumber}
          surahName={surahName}
          ayahNumber={ayah.numberInSurah}
          ayahText={ayah.text}
        />
        <button
          onClick={copyAyah}
          className="p-2.5 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-primary-100 dark:hover:bg-primary-900/30 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-200 hover:scale-110"
          title="نسخ"
        >
          <Copy className="h-4 w-4" />
        </button>
        <button
          onClick={shareAyah}
          className="p-2.5 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-secondary-100 dark:hover:bg-secondary-900/30 hover:text-secondary-600 dark:hover:text-secondary-400 transition-all duration-200 hover:scale-110"
          title="مشاركة"
        >
          <Share2 className="h-4 w-4" />
        </button>
      </div>

      {/* Ayah Content */}
      <div className="relative flex items-start gap-6 rtl:gap-reverse">
        {/* Ayah Number */}
        <div className="flex-shrink-0 w-14 h-14 rounded-2xl text-white flex items-center justify-center font-bold text-base shadow-lg group-hover:scale-110 transition-transform duration-300" style={{ background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)' }}>
          {ayah.numberInSurah}
        </div>

        {/* Ayah Text */}
        <div className="flex-1 pt-1">
          {showBismillah && surahNumber !== 1 && surahNumber !== 9 && (
            <div className="mb-6 text-center">
              <p className={`${fontSizeClasses[settings.fontSize]} font-arabic text-gradient-gold font-bold`}>
                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
              </p>
            </div>
          )}
          <p
            className={`${fontSizeClasses[settings.fontSize]} font-arabic text-gray-900 dark:text-white leading-loose text-right group-hover:text-primary-700 dark:group-hover:text-primary-300 transition-colors duration-300`}
            dir="rtl"
          >
            {ayah.text}
          </p>
        </div>
      </div>

      {/* Copy Feedback */}
      {copied && (
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-xl text-sm font-semibold shadow-lg animate-scaleIn z-20">
          ✓ تم النسخ بنجاح!
        </div>
      )}
    </div>
  );
}

