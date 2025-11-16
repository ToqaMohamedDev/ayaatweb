"use client";

import { Ayah } from "@/types";
import { BookmarkButton } from "./BookmarkButton";
import { FavoriteButton } from "./FavoriteButton";
import { Copy, Share2, CheckCircle2, Volume2, VolumeX, Loader2 } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { useAudio } from "@/contexts/AudioContext";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AyahCardProps {
  ayah: Ayah;
  surahNumber: number;
  surahName: string;
  showBismillah?: boolean;
}

export function AyahCard({ ayah, surahNumber, surahName, showBismillah }: AyahCardProps) {
  const { settings } = useTheme();
  const { setCurrentAudio, currentAudioId } = useAudio();
  const [copied, setCopied] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioId = `${surahNumber}-${ayah.numberInSurah}`;

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

  // Get audio URL from free API
  const getAudioUrl = () => {
    // Using everyayah.com - free and reliable source
    // Format: https://everyayah.com/data/{reciter}/{surah_number}{ayah_number}.mp3
    const reciter = "Alafasy_128kbps"; // Default reciter (Alafasy)
    const surahStr = surahNumber.toString().padStart(3, '0');
    const ayahStr = ayah.numberInSurah.toString().padStart(3, '0');
    // Alternative: using Al-Quran Cloud API
    return `https://everyayah.com/data/${reciter}/${surahStr}${ayahStr}.mp3`;
  };

  const toggleAudio = async () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      setCurrentAudio(null, null);
    } else {
      try {
        setIsLoading(true);
        // Stop any currently playing audio first
        if (currentAudioId && currentAudioId !== audioId) {
          setCurrentAudio(null, null);
        }
        
        const audioUrl = getAudioUrl();
        audioRef.current.src = audioUrl;
        
        // Wait for audio to be ready before playing
        await new Promise((resolve, reject) => {
          if (!audioRef.current) {
            reject(new Error("Audio ref is null"));
            return;
          }
          
          const handleCanPlay = () => {
            audioRef.current?.removeEventListener('canplay', handleCanPlay);
            resolve(true);
          };
          
          const handleError = () => {
            audioRef.current?.removeEventListener('error', handleError);
            reject(new Error("Audio load error"));
          };
          
          audioRef.current.addEventListener('canplay', handleCanPlay);
          audioRef.current.addEventListener('error', handleError);
          audioRef.current.load();
        });
        
        // Play the audio
        if (audioRef.current) {
          await audioRef.current.play();
          // Only set as current after successful play
          setIsPlaying(true);
          setIsLoading(false);
          setCurrentAudio(audioRef.current, audioId, () => setIsPlaying(false));
        }
      } catch (err) {
          console.error("Error playing audio:", err);
          setIsLoading(false);
          // Fallback to alternative API
          if (audioRef.current) {
            try {
              const alternativeUrl = `https://cdn.islamic.network/quran/audio-surah/128/ar.alafasy/${ayah.numberInSurah}.mp3`;
              audioRef.current.src = alternativeUrl;
              
              await new Promise((resolve, reject) => {
                if (!audioRef.current) {
                  reject(new Error("Audio ref is null"));
                  return;
                }
                
                const handleCanPlay = () => {
                  audioRef.current?.removeEventListener('canplay', handleCanPlay);
                  resolve(true);
                };
                
                const handleError = () => {
                  audioRef.current?.removeEventListener('error', handleError);
                  reject(new Error("Audio load error"));
                };
                
                audioRef.current.addEventListener('canplay', handleCanPlay);
                audioRef.current.addEventListener('error', handleError);
                audioRef.current.load();
              });
              
              if (audioRef.current) {
                await audioRef.current.play();
                setIsPlaying(true);
                setIsLoading(false);
                setCurrentAudio(audioRef.current, audioId, () => setIsPlaying(false));
              }
            } catch (fallbackErr) {
              console.error("Fallback audio also failed:", fallbackErr);
              setIsLoading(false);
              alert("عذراً، تعذر تحميل الصوت. يرجى المحاولة مرة أخرى.");
            }
          }
        }
    }
  };

  useEffect(() => {
    const audio = new Audio();
    audioRef.current = audio;

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentAudio(null, null);
    };

    const handleError = (e: Event) => {
      console.error("Audio error:", e);
      setIsPlaying(false);
      setIsLoading(false);
      setCurrentAudio(null, null);
    };

    const handleCanPlay = () => {
      // Audio is ready to play
    };

    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);
    audio.addEventListener('canplay', handleCanPlay);

    return () => {
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('canplay', handleCanPlay);
      if (audio) {
        audio.pause();
        audio.src = '';
      }
    };
  }, []);

  // Listen for changes in currentAudioId to stop this one if another starts
  useEffect(() => {
    if (currentAudioId && currentAudioId !== audioId && isPlaying && audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }, [currentAudioId, audioId, isPlaying]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-150px" }}
      transition={{ duration: 0.2 }}
      className="group relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl p-8 mb-6 border border-gray-200/50 dark:border-gray-700/50 overflow-hidden transition-all duration-500 hover:border-emerald-500/50 dark:hover:border-emerald-400/50 hover:shadow-2xl hover:shadow-emerald-500/10 dark:hover:shadow-emerald-500/20"
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Glowing orb effect */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-all duration-700"></div>
      
      {/* Audio Button - Always Visible */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleAudio}
        disabled={isLoading}
        className={`absolute top-6 right-6 rtl:right-auto rtl:left-6 z-10 p-3 rounded-2xl transition-all duration-200 shadow-xl border border-gray-200/50 dark:border-gray-700/50 ${
          isPlaying
            ? "bg-emerald-500 dark:bg-emerald-400 text-white"
            : "bg-white/90 dark:bg-gray-800/90 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-900/30"
        } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
        title={isPlaying ? "إيقاف الصوت" : "تشغيل الصوت"}
      >
        {isLoading ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : isPlaying ? (
          <VolumeX className="h-5 w-5" />
        ) : (
          <Volume2 className="h-5 w-5" />
        )}
      </motion.button>

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
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400 }}
          className="relative flex-shrink-0"
        >
          {/* Icon glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl blur-xl opacity-40 group-hover:opacity-60 transition-opacity duration-300"></div>
          {/* Number background */}
          <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 dark:from-emerald-400 dark:to-teal-500 text-white flex items-center justify-center font-bold text-lg shadow-lg">
            {ayah.numberInSurah}
          </div>
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
            className={`${fontSizeClasses[settings.fontSize]} font-arabic text-gray-900 dark:text-white leading-loose text-right group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300`}
            dir="rtl"
          >
            {ayah.text}
          </p>
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

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
