"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { getAllSurahs } from "@/lib/quranData";
import { Bookmark, Search, Filter, Sparkles } from "lucide-react";
import { useBookmarks } from "@/contexts/BookmarksContext";
import { motion } from "framer-motion";

export const dynamic = 'force-dynamic';

export default function QuranPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<"all" | "Meccan" | "Medinan">("all");
  const { bookmarks } = useBookmarks();
  const surahs = getAllSurahs();

  const filteredSurahs = useMemo(() => {
    return surahs.filter((surah) => {
      const matchesSearch =
        surah.name.includes(searchQuery) ||
        surah.englishName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        surah.englishNameTranslation.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesFilter = filterType === "all" || surah.revelationType === filterType;
      
      return matchesSearch && matchesFilter;
    });
  }, [searchQuery, filterType, surahs]);

  const getBookmarkCount = (surahNumber: number) => {
    return bookmarks.filter((b: { surahNumber: number }) => b.surahNumber === surahNumber).length;
  };

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
          className="mb-16 pt-8"
        >
          <div className="flex items-center gap-4 mb-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl blur-xl opacity-40"></div>
              <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 dark:from-emerald-400 dark:to-teal-500 flex items-center justify-center shadow-lg">
                <Sparkles className="h-8 w-8 text-white" strokeWidth={2} />
              </div>
            </motion.div>
            <div>
              <h1 className="text-5xl md:text-6xl font-bold mb-2 bg-gradient-to-r from-emerald-600 via-teal-600 to-green-600 dark:from-emerald-400 dark:via-teal-400 dark:to-green-400 bg-clip-text text-transparent">
                القرآن الكريم
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                اختر سورة للبدء في القراءة
              </p>
            </div>
          </div>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12 space-y-6"
        >
          <div className="relative">
            <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="ابحث عن سورة..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-4 pr-12 border-2 border-gray-200 dark:border-gray-700 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 text-lg shadow-lg"
              dir="rtl"
            />
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <Filter className="h-5 w-5 text-gray-400" />
            {(["all", "Meccan", "Medinan"] as const).map((type) => (
              <motion.button
                key={type}
                onClick={() => setFilterType(type)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                  filterType === type
                    ? "text-white shadow-lg"
                    : "bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                }`}
                style={filterType === type ? { background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' } : {}}
              >
                {type === "all" ? "الكل" : type === "Meccan" ? "مكية" : "مدنية"}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Surahs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredSurahs.map((surah: { number: number; name: string; englishNameTranslation: string; numberOfAyahs: number; revelationType: string }, index: number) => {
            const bookmarkCount = getBookmarkCount(surah.number);
            return (
              <motion.div
                key={surah.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-150px" }}
                transition={{ duration: 0.2, delay: Math.min(index * 0.01, 0.3) }}
              >
                <Link
                  href={`/quran/${surah.number}`}
                  className="block group h-full"
                >
                  <div className="relative h-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl p-6 border border-gray-200/50 dark:border-gray-700/50 overflow-hidden transition-all duration-500 hover:border-emerald-500/50 dark:hover:border-emerald-400/50 hover:shadow-2xl hover:shadow-emerald-500/10 dark:hover:shadow-emerald-500/20">
                    
                    {/* Animated gradient background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    {/* Glowing orb effect */}
                    <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-all duration-700"></div>
                    
                    <div className="relative">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-3">
                            <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/30 px-3 py-1.5 rounded-xl">
                              {surah.number}
                            </span>
                            <span className={`px-3 py-1 rounded-xl text-xs font-semibold ${
                              surah.revelationType === "Meccan" 
                                ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300" 
                                : "bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300"
                            }`}>
                              {surah.revelationType === "Meccan" ? "مكية" : "مدنية"}
                            </span>
                          </div>
                          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 font-arabic group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300">
                            {surah.name}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-300">
                            {surah.englishNameTranslation}
                          </p>
                        </div>
                        {bookmarkCount > 0 && (
                          <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/30 px-3 py-1.5 rounded-xl">
                            <Bookmark className="h-4 w-4 fill-current" />
                            <span className="text-xs font-bold">{bookmarkCount}</span>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700/50">
                        <span className="text-sm font-semibold text-gray-600 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
                          {surah.numberOfAyahs} آية
                        </span>
                        <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-medium group-hover:gap-4 transition-all duration-300">
                          <span className="text-xs">اكتشف المزيد</span>
                          <motion.div
                            animate={{ x: [0, 5, 0] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                          >
                            <span className="text-xs">→</span>
                          </motion.div>
                        </div>
                      </div>
                    </div>

                    {/* Bottom accent line */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {filteredSurahs.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <div className="inline-block p-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-lg border border-gray-200/50 dark:border-gray-700/50">
              <p className="text-lg text-gray-600 dark:text-gray-400">
                لم يتم العثور على سور تطابق البحث
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
