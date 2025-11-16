"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { fetchSurah, getSurah } from "@/lib/quranData";
import { SurahWithAyahs } from "@/types";
import { AyahCard } from "@/components/AyahCard";
import { MushafPage } from "@/components/MushafPage";
import { ArrowRight, ArrowLeft, Settings, BookOpen, Loader2, Layout, FileText } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { motion } from "framer-motion";

export const dynamic = 'force-dynamic';

export default function SurahPage() {
  const params = useParams();
  const router = useRouter();
  const surahNumber = parseInt(params.surahNumber as string);
  const [surah, setSurah] = useState<SurahWithAyahs | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { settings, setFontSize } = useTheme();
  const [showSettings, setShowSettings] = useState(false);
  const [viewMode, setViewMode] = useState<"cards" | "mushaf">("mushaf");

  useEffect(() => {
    const loadSurah = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchSurah(surahNumber);
        if (data) {
          setSurah(data);
        } else {
          setError("فشل في تحميل السورة");
        }
      } catch (err) {
        setError("حدث خطأ أثناء تحميل السورة");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (surahNumber && surahNumber >= 1 && surahNumber <= 114) {
      loadSurah();
    } else {
      setError("رقم السورة غير صحيح");
      setLoading(false);
    }
  }, [surahNumber]);

  const surahInfo = getSurah(surahNumber);
  const prevSurah = surahNumber > 1 ? surahNumber - 1 : null;
  const nextSurah = surahNumber < 114 ? surahNumber + 1 : null;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <Loader2 className="h-12 w-12 text-primary-600 dark:text-primary-400 animate-spin mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400 text-lg">جاري التحميل...</p>
        </motion.div>
      </div>
    );
  }

  if (error || !surah || !surahInfo) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-12"
      >
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-8 mb-6">
          <p className="text-red-600 dark:text-red-400 text-lg mb-4">{error || "السورة غير موجودة"}</p>
          <button
            onClick={() => router.push("/quran")}
            className="px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
          >
            العودة لقائمة السور
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/5 dark:bg-emerald-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500/5 dark:bg-teal-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 pt-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-gray-200/50 dark:border-gray-700/50"
        >
        <div className="flex flex-col sm:flex-row items-start justify-between gap-4 mb-6">
          <div className="flex-1 w-full">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-lg">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-2 font-arabic">
                  {surah.name}
                </h1>
                <p className="text-gray-600 dark:text-gray-400 text-lg">
                  {surah.englishNameTranslation} • {surah.numberOfAyahs} آية •{" "}
                  <span className={`px-3 py-1 rounded-lg text-sm font-semibold ${
                    surah.revelationType === "Meccan" 
                      ? "bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300" 
                      : "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
                  }`}>
                    {surah.revelationType === "Meccan" ? "مكية" : "مدنية"}
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            {/* View Mode Toggle */}
            <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 rounded-xl p-1 flex-1 sm:flex-initial">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setViewMode("mushaf")}
                className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center gap-1 sm:gap-2 flex-1 sm:flex-initial justify-center ${
                  viewMode === "mushaf"
                    ? "bg-[#16A34A] dark:bg-[#30D09A] text-white shadow-lg"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
              >
                <FileText className="h-4 w-4" />
                <span>مصحف</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setViewMode("cards")}
                className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center gap-1 sm:gap-2 flex-1 sm:flex-initial justify-center ${
                  viewMode === "cards"
                    ? "bg-[#16A34A] dark:bg-[#30D09A] text-white shadow-lg"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
              >
                <Layout className="h-4 w-4" />
                <span>بطاقات</span>
              </motion.button>
            </div>

            {/* Settings */}
            <div className="relative" style={{ zIndex: 9999 }}>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowSettings(!showSettings)}
                className="p-3 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                <Settings className="h-5 w-5" />
              </motion.button>
              {showSettings && (
                <>
                  {/* Backdrop to close on click outside */}
                  <div 
                    className="fixed inset-0" 
                    style={{ zIndex: 9998 }}
                    onClick={() => setShowSettings(false)}
                  />
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute left-0 rtl:left-auto rtl:right-0 top-full mt-2 w-56 sm:w-64 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-4 border border-gray-200 dark:border-gray-700"
                    style={{ zIndex: 9999 }}
                  >
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                      حجم الخط
                    </label>
                    <div className="space-y-2">
                      {(["small", "medium", "large", "xlarge"] as const).map((size) => (
                        <motion.button
                          key={size}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => {
                            setFontSize(size);
                            setShowSettings(false);
                          }}
                          className={`w-full text-right px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                            settings.fontSize === size
                              ? "bg-[#16A34A] dark:bg-[#30D09A] text-white shadow-lg"
                              : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                          }`}
                        >
                          {size === "small" && "صغير"}
                          {size === "medium" && "متوسط"}
                          {size === "large" && "كبير"}
                          {size === "xlarge" && "كبير جداً"}
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
          {prevSurah ? (
            <motion.button
              whileHover={{ scale: 1.05, x: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push(`/quran/${prevSurah}`)}
              className="flex items-center gap-2 px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <ArrowRight className="h-5 w-5" />
              <span>السورة السابقة</span>
            </motion.button>
          ) : (
            <div></div>
          )}
          {nextSurah ? (
            <motion.button
              whileHover={{ scale: 1.05, x: 5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push(`/quran/${nextSurah}`)}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
            >
              <span>السورة التالية</span>
              <ArrowLeft className="h-5 w-5" />
            </motion.button>
          ) : (
            <div></div>
          )}
        </div>
      </motion.div>

      {/* Ayahs */}
      {viewMode === "mushaf" ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <MushafPage
            ayahs={surah.ayahs}
            surahName={surah.name}
            surahNumber={surah.number}
            showBismillah={surah.number !== 1 && surah.number !== 9}
          />
        </motion.div>
      ) : (
        <div className="space-y-6">
          {surah.ayahs.map((ayah, index) => (
            <AyahCard
              key={ayah.number}
              ayah={ayah}
              surahNumber={surah.number}
              surahName={surah.name}
              showBismillah={index === 0 && surah.number !== 1 && surah.number !== 9}
            />
          ))}
        </div>
      )}

        {/* Bottom Navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 flex items-center justify-between pt-8 border-t border-gray-200 dark:border-gray-700"
        >
        {prevSurah ? (
          <motion.button
            whileHover={{ scale: 1.05, x: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              router.push(`/quran/${prevSurah}`);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center gap-2 px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            <ArrowRight className="h-5 w-5" />
            <span>السورة السابقة</span>
          </motion.button>
        ) : (
          <div></div>
        )}
        {nextSurah ? (
          <motion.button
            whileHover={{ scale: 1.05, x: 5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              router.push(`/quran/${nextSurah}`);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
          >
            <span>السورة التالية</span>
            <ArrowLeft className="h-5 w-5" />
          </motion.button>
        ) : (
          <div></div>
        )}
        </motion.div>
      </div>
    </div>
  );
}
