"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const Tasbih = dynamic(() => import("@/components/Tasbih"), {
  loading: () => (
    <div className="flex items-center justify-center min-h-[400px]">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 dark:from-emerald-400 dark:to-teal-500 flex items-center justify-center shadow-lg mx-auto mb-4">
          <Sparkles className="h-8 w-8 text-white animate-pulse" />
        </div>
        <p className="text-gray-600 dark:text-gray-300 text-lg">جاري التحميل...</p>
      </motion.div>
    </div>
  ),
  ssr: false,
});

export default function TasbihPage() {
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
          className="mb-12 pt-8"
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
                السبحة الإلكترونية
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                عد التسبيحات ومتابعة الإحصائيات
              </p>
            </div>
          </div>
        </motion.div>

        <Tasbih />
      </div>
    </div>
  );
}
