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
    <div className="min-h-screen">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-lg">
            <Sparkles className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-5xl md:text-6xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-400">
              القرآن الكريم
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              اختر سورة للبدء في القراءة
            </p>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="mb-10 space-y-6">
        <div className="relative">
          <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="ابحث عن سورة..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-4 pr-12 border-2 border-gray-200 dark:border-gray-700 rounded-2xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 text-lg"
            dir="rtl"
          />
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <Filter className="h-5 w-5 text-gray-400" />
          {(["all", "Meccan", "Medinan"] as const).map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                filterType === type
                  ? "text-white shadow-lg"
                  : "bg-gray-100 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
              style={filterType === type ? { background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)' } : {}}
            >
              {type === "all" ? "الكل" : type === "Meccan" ? "مكية" : "مدنية"}
            </button>
          ))}
        </div>
      </div>

      {/* Surahs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredSurahs.map((surah: { number: number; name: string; englishNameTranslation: string; numberOfAyahs: number; revelationType: string }) => {
          const bookmarkCount = getBookmarkCount(surah.number);
          return (
            <Link
              key={surah.number}
              href={`/quran/${surah.number}`}
              className="block h-full"
            >
              <div className="group relative bg-white dark:bg-gray-800 rounded-3xl p-6 border border-gray-100 dark:border-gray-700/50 shadow-lg hover:shadow-2xl transition-all duration-200 h-full overflow-hidden">
                {/* Background Gradient on Hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-50/50 via-transparent to-secondary-50/50 dark:from-primary-900/10 dark:via-transparent dark:to-secondary-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                
                <div className="relative">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-sm font-bold text-primary-600 dark:text-primary-400 bg-primary-100 dark:bg-primary-900/30 px-3 py-1.5 rounded-xl">
                          {surah.number}
                        </span>
                        <span className={`px-3 py-1 rounded-xl text-xs font-semibold ${
                          surah.revelationType === "Meccan" 
                            ? "bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300" 
                            : "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
                        }`}>
                          {surah.revelationType === "Meccan" ? "مكية" : "مدنية"}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 font-arabic group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                        {surah.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                        {surah.englishNameTranslation}
                      </p>
                    </div>
                    {bookmarkCount > 0 && (
                      <div className="flex items-center gap-1 text-primary-600 dark:text-primary-400 bg-primary-100 dark:bg-primary-900/30 px-3 py-1.5 rounded-xl">
                        <Bookmark className="h-4 w-4 fill-current" />
                        <span className="text-xs font-bold">{bookmarkCount}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700/50">
                    <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                      {surah.numberOfAyahs} آية
                    </span>
                    <span className="text-xs text-primary-600 dark:text-primary-400 font-medium group-hover:translate-x-[-4px] rtl:group-hover:translate-x-[4px] transition-transform">
                      اقرأ →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {filteredSurahs.length === 0 && (
        <div className="text-center py-20">
          <div className="inline-block p-8 bg-gray-100 dark:bg-gray-800 rounded-3xl shadow-lg">
            <p className="text-lg text-gray-600 dark:text-gray-400">
              لم يتم العثور على سور تطابق البحث
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
