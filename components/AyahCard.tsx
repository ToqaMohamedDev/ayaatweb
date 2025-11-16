"use client";

import { Ayah } from "@/types";
import { BookmarkButton } from "./BookmarkButton";
import { FavoriteButton } from "./FavoriteButton";
import { Copy, Share2, CheckCircle2 } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      className="group relative bg-white dark:bg-gray-800 rounded-3xl p-8 mb-6 border border-gray-100 dark:border-gray-700/50 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
    >
      {/* Decorative gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50/30 via-transparent to-secondary-50/30 dark:from-primary-900/10 dark:via-transparent dark:to-secondary-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Actions Bar */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        whileHover={{ opacity: 1, y: 0 }}
        className="absolute top-6 left-6 rtl:left-auto rtl:right-6 z-10 flex items-center gap-2 rtl:gap-reverse bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-2xl p-3 shadow-xl border border-gray-200/50 dark:border-gray-700/50"
      >
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
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={copyAyah}
          className="p-2.5 rounded-xl text-gray-600 dark:text-gray-400 hover:bg-primary-100 dark:hover:bg-primary-900/30 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-200"
          title="نسخ"
        >
          <Copy className="h-4 w-4" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={shareAyah}
          className="p-2.5 rounded-xl text-gray-600 dark:text-gray-400 hover:bg-secondary-100 dark:hover:bg-secondary-900/30 hover:text-secondary-600 dark:hover:text-secondary-400 transition-all duration-200"
          title="مشاركة"
        >
          <Share2 className="h-4 w-4" />
        </motion.button>
      </motion.div>

      {/* Ayah Content */}
      <div className="relative flex items-start gap-6 rtl:gap-reverse">
        {/* Ayah Number */}
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          className="flex-shrink-0 w-16 h-16 rounded-2xl text-white flex items-center justify-center font-bold text-lg shadow-xl"
          style={{ background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)' }}
        >
          {ayah.numberInSurah}
        </motion.div>

        {/* Ayah Text */}
        <div className="flex-1 pt-1">
          {showBismillah && surahNumber !== 1 && surahNumber !== 9 && (
            <div className="mb-6 text-center">
              <p className={`${fontSizeClasses[settings.fontSize]} font-arabic text-transparent bg-clip-text bg-gradient-to-r from-gold-600 to-gold-400 font-bold`}>
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
      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-2xl text-sm font-semibold shadow-2xl z-20 flex items-center gap-2"
          >
            <CheckCircle2 className="h-5 w-5" />
            <span>تم النسخ بنجاح!</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
