"use client";

import { Star, StarOff } from "lucide-react";
import { useFavorites } from "@/contexts/FavoritesContext";
import { useState } from "react";

interface FavoriteButtonProps {
  surahNumber: number;
  surahName: string;
  ayahNumber: number;
  ayahText: string;
}

export function FavoriteButton({
  surahNumber,
  surahName,
  ayahNumber,
  ayahText,
}: FavoriteButtonProps) {
  const { isFavorite, addFavorite, removeFavorite, getFavorite } = useFavorites();
  const [showCategoryInput, setShowCategoryInput] = useState(false);
  const [category, setCategory] = useState<"memorization" | "reflection" | "share">("memorization");
  const [note, setNote] = useState("");

  const favorited = isFavorite(surahNumber, ayahNumber);
  const existingFavorite = getFavorite(surahNumber, ayahNumber);

  const handleClick = () => {
    if (favorited) {
      const favorite = existingFavorite;
      if (favorite) {
        removeFavorite(favorite.id);
      }
    } else {
      setShowCategoryInput(true);
      if (existingFavorite) {
        setCategory(existingFavorite.category);
        setNote(existingFavorite.note || "");
      }
    }
  };

  const handleSave = () => {
    if (!favorited) {
      addFavorite({
        surahNumber,
        surahName,
        ayahNumber,
        ayahText,
        category,
        note: note.trim() || undefined,
      });
    }
    setShowCategoryInput(false);
    setNote("");
  };

  const handleCancel = () => {
    setShowCategoryInput(false);
    setNote("");
  };

  return (
    <div className="relative">
      <button
        onClick={handleClick}
        className={`p-2 rounded-lg transition-colors ${
          favorited
            ? "text-yellow-500 dark:text-yellow-400 bg-yellow-500/10 dark:bg-yellow-400/10"
            : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
        }`}
        title={favorited ? "إزالة من المفضلة" : "إضافة للمفضلة"}
      >
        {favorited ? (
          <Star className="h-4 w-4 fill-current" />
        ) : (
          <StarOff className="h-4 w-4" />
        )}
      </button>

      {showCategoryInput && (
        <div className="absolute top-full left-0 rtl:left-auto rtl:right-0 mt-2 w-72 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 z-10 border border-gray-200 dark:border-gray-700">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            التصنيف
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as typeof category)}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm mb-3"
            dir="rtl"
          >
            <option value="memorization">للحفظ</option>
            <option value="reflection">للتدبر</option>
            <option value="share">للمشاركة</option>
          </select>
          
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            ملاحظة (اختياري)
          </label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm resize-none"
            rows={3}
            placeholder="أضف ملاحظة..."
            dir="rtl"
          />
          <div className="flex justify-end space-x-2 rtl:space-x-reverse mt-2">
            <button
              onClick={handleCancel}
              className="px-3 py-1 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
            >
              إلغاء
            </button>
            <button
              onClick={handleSave}
              className="px-3 py-1 text-sm bg-primary-light dark:bg-primary-dark text-white rounded-lg hover:opacity-90"
            >
              حفظ
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

