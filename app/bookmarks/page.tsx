"use client";

import { useBookmarks } from "@/contexts/BookmarksContext";
import Link from "next/link";
import { Bookmark, Trash2, Edit2, ExternalLink, BookOpen } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-10"
      >
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-2xl bg-[#16A34A] dark:bg-[#30D09A] flex items-center justify-center shadow-lg">
            <Bookmark className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-5xl md:text-6xl font-bold mb-2 text-[#0F172A] dark:text-[#ECFDF5]">
              العلامات المرجعية
            </h1>
            <p className="text-xl text-[#64748B] dark:text-[#ECFDF5]/60">
              {bookmarks.length} علامة مرجعية محفوظة
            </p>
          </div>
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        {bookmarks.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="text-center py-16 bg-white/60 dark:bg-[#141D1B]/60 backdrop-blur-[16px] rounded-[20px] shadow-[0_8px_32px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)] border border-[#16A34A]/10 dark:border-[#30D09A]/10"
          >
            <BookOpen className="h-20 w-20 text-[#64748B] dark:text-[#ECFDF5]/40 mx-auto mb-6" />
            <p className="text-xl text-[#64748B] dark:text-[#ECFDF5]/60 mb-6">
              لا توجد علامات مرجعية محفوظة
            </p>
            <Link href="/quran">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block px-8 py-4 bg-[#16A34A] dark:bg-[#30D09A] text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
              >
                ابدأ القراءة
              </motion.div>
            </Link>
          </motion.div>
        ) : (
          <div className="space-y-6">
            {sortedBookmarks.map((bookmark, index) => (
              <motion.div
                key={bookmark.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ y: -2 }}
                className="bg-white/60 dark:bg-[#141D1B]/60 backdrop-blur-[16px] rounded-[20px] p-8 shadow-[0_8px_32px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)] border border-[#16A34A]/10 dark:border-[#30D09A]/10 hover:shadow-[0_12px_48px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_12px_48px_rgba(0,0,0,0.4)] transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <Link
                        href={`/quran/${bookmark.surahNumber}`}
                        className="text-xl font-bold text-[#16A34A] dark:text-[#30D09A] hover:text-[#15803d] dark:hover:text-[#30D09A]/80 transition-colors"
                      >
                        {bookmark.surahName} - الآية {bookmark.ayahNumber}
                      </Link>
                      <Link
                        href={`/quran/${bookmark.surahNumber}`}
                        className="text-[#64748B] dark:text-[#ECFDF5]/60 hover:text-[#16A34A] dark:hover:text-[#30D09A] transition-colors"
                      >
                        <ExternalLink className="h-5 w-5" />
                      </Link>
                    </div>
                    <p className="text-2xl font-arabic text-[#0F172A] dark:text-[#ECFDF5] mb-4 text-right leading-relaxed" dir="rtl">
                      {bookmark.ayahText}
                    </p>
                    {editingId === bookmark.id ? (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="space-y-3"
                      >
                        <textarea
                          value={editNote}
                          onChange={(e) => setEditNote(e.target.value)}
                          className="w-full p-4 border-2 border-[#16A34A]/20 dark:border-[#30D09A]/20 rounded-xl bg-white/80 dark:bg-[#141D1B]/80 backdrop-blur-sm text-[#0F172A] dark:text-[#ECFDF5] resize-none focus:ring-2 focus:ring-[#16A34A] dark:focus:ring-[#30D09A] focus:border-transparent"
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
                            onClick={() => handleSave(bookmark.id)}
                            className="px-6 py-3 bg-[#16A34A] dark:bg-[#30D09A] text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
                          >
                            حفظ
                          </motion.button>
                        </div>
                      </motion.div>
                    ) : (
                      <>
                        {bookmark.note && (
                          <div className="bg-[#F7FDFB] dark:bg-[#141D1B] rounded-xl p-4 mb-4 border-r-4 border-[#16A34A] dark:border-[#30D09A]">
                            <p className="text-[#334155] dark:text-[#ECFDF5]/80 text-sm text-right leading-relaxed" dir="rtl">
                              {bookmark.note}
                            </p>
                          </div>
                        )}
                        <p className="text-xs text-[#64748B] dark:text-[#ECFDF5]/40">
                          {new Date(bookmark.timestamp).toLocaleString("ar-SA")}
                        </p>
                      </>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mr-4 rtl:mr-0 rtl:ml-4">
                    {editingId !== bookmark.id && (
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleEdit(bookmark.id, bookmark.note)}
                        className="p-3 text-[#64748B] dark:text-[#ECFDF5]/60 hover:bg-[#F7FDFB] dark:hover:bg-[#141D1B] rounded-xl transition-colors"
                        title="تعديل"
                      >
                        <Edit2 className="h-5 w-5" />
                      </motion.button>
                    )}
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => removeBookmark(bookmark.id)}
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
