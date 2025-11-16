"use client";

import { useFavorites } from "@/contexts/FavoritesContext";
import Link from "next/link";
import { Star, Trash2, Edit2, ExternalLink, Download, Filter, Search, Heart } from "lucide-react";
import { useState, useMemo } from "react";
import { FavoriteAyah } from "@/types";
import { motion, AnimatePresence } from "framer-motion";

export const dynamic = 'force-dynamic';

export default function FavoritesPage() {
  const { favorites, removeFavorite, updateFavorite } = useFavorites();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState<"all" | FavoriteAyah["category"]>("all");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editNote, setEditNote] = useState("");
  const [editCategory, setEditCategory] = useState<FavoriteAyah["category"]>("memorization");

  const filteredFavorites = useMemo(() => {
    return favorites.filter((favorite) => {
      const matchesSearch =
        favorite.ayahText.includes(searchQuery) ||
        favorite.surahName.includes(searchQuery);
      const matchesCategory = filterCategory === "all" || favorite.category === filterCategory;
      return matchesSearch && matchesCategory;
    });
  }, [favorites, searchQuery, filterCategory]);

  const handleEdit = (id: string, currentNote?: string, currentCategory?: FavoriteAyah["category"]) => {
    setEditingId(id);
    setEditNote(currentNote || "");
    setEditCategory(currentCategory || "memorization");
  };

  const handleSave = (id: string) => {
    updateFavorite(id, editCategory, editNote);
    setEditingId(null);
    setEditNote("");
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditNote("");
  };

  const handleExport = () => {
    const text = filteredFavorites
      .map((f) => `${f.ayahText}\n(${f.surahName} - الآية ${f.ayahNumber})${f.note ? `\nملاحظة: ${f.note}` : ""}\n`)
      .join("\n---\n\n");
    
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "الآيات_المفضلة.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  const sortedFavorites = [...filteredFavorites].sort((a, b) => b.timestamp - a.timestamp);

  const categoryLabels = {
    memorization: "للحفظ",
    reflection: "للتدبر",
    share: "للمشاركة",
  };

  const categoryColors = {
    memorization: "from-blue-500 to-blue-600",
    reflection: "from-purple-500 to-purple-600",
    share: "from-green-500 to-green-600",
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-10"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[#16A34A] dark:bg-[#30D09A] flex items-center justify-center shadow-lg">
              <Heart className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-5xl md:text-6xl font-bold mb-2 text-[#0F172A] dark:text-[#ECFDF5]">
                الآيات المفضلة
              </h1>
              <p className="text-xl text-[#64748B] dark:text-[#ECFDF5]/60">
                {favorites.length} آية محفوظة
              </p>
            </div>
          </div>
          {filteredFavorites.length > 0 && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleExport}
              className="flex items-center gap-2 px-6 py-3 bg-[#16A34A] dark:bg-[#30D09A] text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
            >
              <Download className="h-5 w-5" />
              <span>تصدير</span>
            </motion.button>
          )}
        </div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="space-y-4"
        >
          <div className="relative">
            <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="ابحث في الآيات..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-4 pr-12 border-2 border-[#16A34A]/20 dark:border-[#30D09A]/20 rounded-2xl bg-white/80 dark:bg-[#141D1B]/80 backdrop-blur-sm text-[#0F172A] dark:text-[#ECFDF5] focus:outline-none focus:ring-2 focus:ring-[#16A34A] dark:focus:ring-[#30D09A] focus:border-transparent transition-all duration-200 text-lg"
              dir="rtl"
            />
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <Filter className="h-5 w-5 text-[#64748B] dark:text-[#ECFDF5]/60" />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilterCategory("all")}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                filterCategory === "all"
                  ? "text-white shadow-lg bg-[#16A34A] dark:bg-[#30D09A]"
                  : "bg-[#F7FDFB] dark:bg-[#141D1B] text-[#334155] dark:text-[#ECFDF5]/60 hover:bg-[#F7FDFB]/80 dark:hover:bg-[#141D1B]/80"
              }`}
            >
              الكل
            </motion.button>
            {(["memorization", "reflection", "share"] as const).map((cat) => (
              <motion.button
                key={cat}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFilterCategory(cat)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  filterCategory === cat
                    ? "text-white shadow-lg bg-[#16A34A] dark:bg-[#30D09A]"
                    : "bg-[#F7FDFB] dark:bg-[#141D1B] text-[#334155] dark:text-[#ECFDF5]/60 hover:bg-[#F7FDFB]/80 dark:hover:bg-[#141D1B]/80"
                }`}
              >
                {categoryLabels[cat]}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </motion.div>

      <AnimatePresence mode="wait">
        {filteredFavorites.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="text-center py-16 bg-white/60 dark:bg-[#141D1B]/60 backdrop-blur-[16px] rounded-[20px] shadow-[0_8px_32px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)] border border-[#16A34A]/10 dark:border-[#30D09A]/10"
          >
            <Star className="h-20 w-20 text-[#64748B] dark:text-[#ECFDF5]/40 mx-auto mb-6" />
            <p className="text-xl text-[#64748B] dark:text-[#ECFDF5]/60 mb-6">
              {favorites.length === 0
                ? "لا توجد آيات محفوظة في المفضلة"
                : "لا توجد نتائج للبحث"}
            </p>
            {favorites.length === 0 && (
              <Link href="/quran">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-block px-8 py-4 bg-[#16A34A] dark:bg-[#30D09A] text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
                >
                  ابدأ القراءة
                </motion.div>
              </Link>
            )}
          </motion.div>
        ) : (
          <div className="space-y-6">
            {sortedFavorites.map((favorite, index) => (
              <motion.div
                key={favorite.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.03 }}
                whileHover={{ y: -2 }}
                className="bg-white/60 dark:bg-[#141D1B]/60 backdrop-blur-[16px] rounded-[20px] p-8 shadow-[0_8px_32px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)] border border-[#16A34A]/10 dark:border-[#30D09A]/10 hover:shadow-[0_12px_48px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_12px_48px_rgba(0,0,0,0.4)] transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4 flex-wrap">
                      <Link
                        href={`/quran/${favorite.surahNumber}`}
                        className="text-xl font-bold text-[#16A34A] dark:text-[#30D09A] hover:text-[#15803d] dark:hover:text-[#30D09A]/80 transition-colors"
                      >
                        {favorite.surahName} - الآية {favorite.ayahNumber}
                      </Link>
                      <Link
                        href={`/quran/${favorite.surahNumber}`}
                        className="text-[#64748B] dark:text-[#ECFDF5]/60 hover:text-[#16A34A] dark:hover:text-[#30D09A] transition-colors"
                      >
                        <ExternalLink className="h-5 w-5" />
                      </Link>
                      <span className={`px-4 py-1.5 rounded-xl text-xs font-bold text-white bg-[#16A34A] dark:bg-[#30D09A]`}>
                        {categoryLabels[favorite.category]}
                      </span>
                    </div>
                    <p className="text-2xl font-arabic text-[#0F172A] dark:text-[#ECFDF5] mb-4 text-right leading-relaxed" dir="rtl">
                      {favorite.ayahText}
                    </p>
                    {editingId === favorite.id ? (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="space-y-3"
                      >
                        <select
                          value={editCategory}
                          onChange={(e) => setEditCategory(e.target.value as FavoriteAyah["category"])}
                          className="w-full p-4 border-2 border-[#16A34A]/20 dark:border-[#30D09A]/20 rounded-xl bg-white/80 dark:bg-[#141D1B]/80 backdrop-blur-sm text-[#0F172A] dark:text-[#ECFDF5] text-sm mb-2 focus:ring-2 focus:ring-[#16A34A] dark:focus:ring-[#30D09A] focus:border-transparent"
                          dir="rtl"
                        >
                          <option value="memorization">للحفظ</option>
                          <option value="reflection">للتدبر</option>
                          <option value="share">للمشاركة</option>
                        </select>
                        <textarea
                          value={editNote}
                          onChange={(e) => setEditNote(e.target.value)}
                          className="w-full p-4 border-2 border-[#16A34A]/20 dark:border-[#30D09A]/20 rounded-xl bg-white/80 dark:bg-[#141D1B]/80 backdrop-blur-sm text-[#0F172A] dark:text-[#ECFDF5] text-sm resize-none focus:ring-2 focus:ring-[#16A34A] dark:focus:ring-[#30D09A] focus:border-transparent"
                          rows={3}
                          placeholder="أضف ملاحظة..."
                          dir="rtl"
                        />
                        <div className="flex justify-end gap-3">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleCancel}
                            className="px-6 py-3 text-[#64748B] dark:text-[#ECFDF5]/60 hover:bg-[#F7FDFB] dark:hover:bg-[#141D1B] rounded-xl font-semibold transition-colors"
                          >
                            إلغاء
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleSave(favorite.id)}
                            className="px-6 py-3 bg-[#16A34A] dark:bg-[#30D09A] text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
                          >
                            حفظ
                          </motion.button>
                        </div>
                      </motion.div>
                    ) : (
                      <>
                        {favorite.note && (
                          <div className="bg-[#F7FDFB] dark:bg-[#141D1B] rounded-xl p-4 mb-4 border-r-4 border-[#16A34A] dark:border-[#30D09A]">
                            <p className="text-[#334155] dark:text-[#ECFDF5]/80 text-sm text-right leading-relaxed" dir="rtl">
                              {favorite.note}
                            </p>
                          </div>
                        )}
                        <p className="text-xs text-[#64748B] dark:text-[#ECFDF5]/40">
                          {new Date(favorite.timestamp).toLocaleString("ar-SA")}
                        </p>
                      </>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mr-4 rtl:mr-0 rtl:ml-4">
                    {editingId !== favorite.id && (
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleEdit(favorite.id, favorite.note, favorite.category)}
                        className="p-3 text-[#64748B] dark:text-[#ECFDF5]/60 hover:bg-[#F7FDFB] dark:hover:bg-[#141D1B] rounded-xl transition-colors"
                        title="تعديل"
                      >
                        <Edit2 className="h-5 w-5" />
                      </motion.button>
                    )}
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => removeFavorite(favorite.id)}
                      className="p-3 text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors"
                      title="حذف"
                    >
                      <Trash2 className="h-5 w-5" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
