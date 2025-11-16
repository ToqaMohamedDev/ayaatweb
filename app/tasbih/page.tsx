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
        <div className="w-16 h-16 rounded-2xl bg-[#16A34A] dark:bg-[#30D09A] flex items-center justify-center shadow-lg mx-auto mb-4">
          <Sparkles className="h-8 w-8 text-white animate-pulse" />
        </div>
        <p className="text-[#64748B] dark:text-[#ECFDF5]/60 text-lg">جاري التحميل...</p>
      </motion.div>
    </div>
  ),
  ssr: false,
});

export default function TasbihPage() {
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
            <Sparkles className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-5xl md:text-6xl font-bold mb-2 text-[#0F172A] dark:text-[#ECFDF5]">
              السبحة الإلكترونية
            </h1>
            <p className="text-xl text-[#64748B] dark:text-[#ECFDF5]/60">
              عد التسبيحات ومتابعة الإحصائيات
            </p>
          </div>
        </div>
      </motion.div>

      <Tasbih />
    </div>
  );
}
