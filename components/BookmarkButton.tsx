"use client";

import { Bookmark, BookmarkCheck } from "lucide-react";
import { useBookmarks } from "@/contexts/BookmarksContext";
import { useState } from "react";

interface BookmarkButtonProps {
  surahNumber: number;
  surahName: string;
  ayahNumber: number;
  ayahText: string;
}

export function BookmarkButton({
  surahNumber,
  surahName,
  ayahNumber,
  ayahText,
}: BookmarkButtonProps) {
  const { isBookmarked, addBookmark, removeBookmark, getBookmark } = useBookmarks();
  const [showNoteInput, setShowNoteInput] = useState(false);
  const [note, setNote] = useState("");

  const bookmarked = isBookmarked(surahNumber, ayahNumber);
  const existingBookmark = getBookmark(surahNumber, ayahNumber);

  const handleClick = () => {
    if (bookmarked) {
      const bookmark = existingBookmark;
      if (bookmark) {
        removeBookmark(bookmark.id);
      }
    } else {
      setShowNoteInput(true);
      if (existingBookmark) {
        setNote(existingBookmark.note || "");
      }
    }
  };

  const handleSave = () => {
    if (!bookmarked) {
      addBookmark({
        surahNumber,
        surahName,
        ayahNumber,
        ayahText,
        note: note.trim() || undefined,
      });
    }
    setShowNoteInput(false);
    setNote("");
  };

  const handleCancel = () => {
    setShowNoteInput(false);
    setNote("");
  };

  return (
    <div className="relative">
      <button
        onClick={handleClick}
        className={`p-2 rounded-lg transition-colors ${
          bookmarked
            ? "text-primary-light dark:text-primary-dark bg-primary-light/10 dark:bg-primary-dark/10"
            : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
        }`}
        title={bookmarked ? "إزالة العلامة المرجعية" : "إضافة علامة مرجعية"}
      >
        {bookmarked ? (
          <BookmarkCheck className="h-4 w-4" />
        ) : (
          <Bookmark className="h-4 w-4" />
        )}
      </button>

      {showNoteInput && (
        <div className="absolute top-full left-0 rtl:left-auto rtl:right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 z-10 border border-gray-200 dark:border-gray-700">
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

