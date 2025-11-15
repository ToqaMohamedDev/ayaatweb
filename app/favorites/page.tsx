"use client";

import { useFavorites } from "@/contexts/FavoritesContext";
import Link from "next/link";
import { Star, Trash2, Edit2, ExternalLink, Download, Filter } from "lucide-react";
import { useState, useMemo } from "react";
import { FavoriteAyah } from "@/types";

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

  return (
    <div className="min-h-screen">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              الآيات المفضلة
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              {favorites.length} آية محفوظة
            </p>
          </div>
          {filteredFavorites.length > 0 && (
            <button
              onClick={handleExport}
              className="flex items-center space-x-2 rtl:space-x-reverse px-4 py-2 bg-primary-light dark:bg-primary-dark text-white rounded-lg hover:opacity-90 transition-opacity"
            >
              <Download className="h-4 w-4" />
              <span>تصدير</span>
            </button>
          )}
        </div>

        {/* Search and Filter */}
        <div className="space-y-4">
          <input
            type="text"
            placeholder="ابحث في الآيات..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark focus:border-transparent"
            dir="rtl"
          />
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <Filter className="h-5 w-5 text-gray-400" />
            <button
              onClick={() => setFilterCategory("all")}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filterCategory === "all"
                  ? "bg-primary-light dark:bg-primary-dark text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
              }`}
            >
              الكل
            </button>
            {(["memorization", "reflection", "share"] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  filterCategory === cat
                    ? "bg-primary-light dark:bg-primary-dark text-white"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                }`}
              >
                {categoryLabels[cat]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {filteredFavorites.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
          <Star className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {favorites.length === 0
              ? "لا توجد آيات محفوظة في المفضلة"
              : "لا توجد نتائج للبحث"}
          </p>
          {favorites.length === 0 && (
            <Link
              href="/quran"
              className="text-primary-light dark:text-primary-dark hover:opacity-80"
            >
              ابدأ القراءة
            </Link>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {sortedFavorites.map((favorite) => (
            <div
              key={favorite.id}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 rtl:space-x-reverse mb-2">
                    <Link
                      href={`/quran/${favorite.surahNumber}`}
                      className="text-lg font-bold text-primary-light dark:text-primary-dark hover:opacity-80"
                    >
                      {favorite.surahName} - الآية {favorite.ayahNumber}
                    </Link>
                    <Link
                      href={`/quran/${favorite.surahNumber}`}
                      className="text-gray-500 hover:text-primary-light dark:hover:text-primary-dark"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                    <span className="text-xs px-2 py-1 rounded-full bg-primary-light/10 dark:bg-primary-dark/10 text-primary-light dark:text-primary-dark">
                      {categoryLabels[favorite.category]}
                    </span>
                  </div>
                  <p className="text-xl font-arabic text-gray-900 dark:text-white mb-3 text-right" dir="rtl">
                    {favorite.ayahText}
                  </p>
                  {editingId === favorite.id ? (
                    <div className="space-y-2">
                      <select
                        value={editCategory}
                        onChange={(e) => setEditCategory(e.target.value as FavoriteAyah["category"])}
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm mb-2"
                        dir="rtl"
                      >
                        <option value="memorization">للحفظ</option>
                        <option value="reflection">للتدبر</option>
                        <option value="share">للمشاركة</option>
                      </select>
                      <textarea
                        value={editNote}
                        onChange={(e) => setEditNote(e.target.value)}
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm resize-none"
                        rows={3}
                        placeholder="أضف ملاحظة..."
                        dir="rtl"
                      />
                      <div className="flex justify-end space-x-2 rtl:space-x-reverse">
                        <button
                          onClick={handleCancel}
                          className="px-3 py-1 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                        >
                          إلغاء
                        </button>
                        <button
                          onClick={() => handleSave(favorite.id)}
                          className="px-3 py-1 text-sm bg-primary-light dark:bg-primary-dark text-white rounded-lg hover:opacity-90"
                        >
                          حفظ
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      {favorite.note && (
                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-2 text-right" dir="rtl">
                          {favorite.note}
                        </p>
                      )}
                      <p className="text-xs text-gray-500 dark:text-gray-500">
                        {new Date(favorite.timestamp).toLocaleString("ar-SA")}
                      </p>
                    </>
                  )}
                </div>
                <div className="flex items-center space-x-2 rtl:space-x-reverse ml-4 rtl:ml-0 rtl:mr-4">
                  {editingId !== favorite.id && (
                    <button
                      onClick={() => handleEdit(favorite.id, favorite.note, favorite.category)}
                      className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                      title="تعديل"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                  )}
                  <button
                    onClick={() => removeFavorite(favorite.id)}
                    className="p-2 text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    title="حذف"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

