"use client";

import { useBookmarks } from "@/contexts/BookmarksContext";
import Link from "next/link";
import { Bookmark, Trash2, Edit2, ExternalLink } from "lucide-react";
import { useState } from "react";

export const dynamic = 'force-dynamic';

export default function BookmarksPage() {
  const { bookmarks, removeBookmark, updateBookmark } = useBookmarks();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editNote, setEditNote] = useState("");

  const handleEdit = (id: string, currentNote?: string) => {
    setEditingId(id);
    setEditNote(currentNote || "");
  };

  const handleSave = (id: string) => {
    updateBookmark(id, editNote);
    setEditingId(null);
    setEditNote("");
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditNote("");
  };

  const sortedBookmarks = [...bookmarks].sort((a, b) => b.timestamp - a.timestamp);

  return (
    <div className="min-h-screen">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          العلامات المرجعية
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          {bookmarks.length} علامة مرجعية محفوظة
        </p>
      </div>

      {bookmarks.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
          <Bookmark className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            لا توجد علامات مرجعية محفوظة
          </p>
          <Link
            href="/quran"
            className="text-primary-light dark:text-primary-dark hover:opacity-80"
          >
            ابدأ القراءة
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {sortedBookmarks.map((bookmark) => (
            <div
              key={bookmark.id}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 rtl:space-x-reverse mb-2">
                    <Link
                      href={`/quran/${bookmark.surahNumber}`}
                      className="text-lg font-bold text-primary-light dark:text-primary-dark hover:opacity-80"
                    >
                      {bookmark.surahName} - الآية {bookmark.ayahNumber}
                    </Link>
                    <Link
                      href={`/quran/${bookmark.surahNumber}`}
                      className="text-gray-500 hover:text-primary-light dark:hover:text-primary-dark"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                  </div>
                  <p className="text-xl font-arabic text-gray-900 dark:text-white mb-3 text-right" dir="rtl">
                    {bookmark.ayahText}
                  </p>
                  {editingId === bookmark.id ? (
                    <div className="space-y-2">
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
                          onClick={() => handleSave(bookmark.id)}
                          className="px-3 py-1 text-sm bg-primary-light dark:bg-primary-dark text-white rounded-lg hover:opacity-90"
                        >
                          حفظ
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      {bookmark.note && (
                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-2 text-right" dir="rtl">
                          {bookmark.note}
                        </p>
                      )}
                      <p className="text-xs text-gray-500 dark:text-gray-500">
                        {new Date(bookmark.timestamp).toLocaleString("ar-SA")}
                      </p>
                    </>
                  )}
                </div>
                <div className="flex items-center space-x-2 rtl:space-x-reverse ml-4 rtl:ml-0 rtl:mr-4">
                  {editingId !== bookmark.id && (
                    <button
                      onClick={() => handleEdit(bookmark.id, bookmark.note)}
                      className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                      title="تعديل"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                  )}
                  <button
                    onClick={() => removeBookmark(bookmark.id)}
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

