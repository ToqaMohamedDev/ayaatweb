"use client";

import { useState, useEffect } from "react";
import { eveningThikr } from "@/lib/adhkarData";
import { ThikrCard } from "@/components/ThikrCard";
import { ThikrState } from "@/types";
import { StorageKeys, getStorageItem, setStorageItem } from "@/lib/storage";
import { RotateCcw, Sunset, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

export const dynamic = 'force-dynamic';

export default function EveningAdhkarPage() {
  const [thikrStates, setThikrStates] = useState<Record<string, ThikrState>>({});

  useEffect(() => {
    const saved = getStorageItem<Record<string, ThikrState>>(
      StorageKeys.ADHKAR_EVENING,
      {}
    );
    
    const initialized: Record<string, ThikrState> = {};
    eveningThikr.forEach((thikr) => {
      initialized[thikr.id] =
        saved[thikr.id] || {
          thikrId: thikr.id,
          currentCount: 0,
          completed: false,
          lastUpdated: Date.now(),
        };
    });
    
    setThikrStates(initialized);
  }, []);

  const handleUpdate = (thikrId: string, currentCount: number, completed: boolean) => {
    const updated = {
      ...thikrStates,
      [thikrId]: {
        thikrId,
        currentCount,
        completed,
        lastUpdated: Date.now(),
      },
    };
    setThikrStates(updated);
    setStorageItem(StorageKeys.ADHKAR_EVENING, updated);
  };

  const handleResetAll = () => {
    const reset: Record<string, ThikrState> = {};
    eveningThikr.forEach((thikr) => {
      reset[thikr.id] = {
        thikrId: thikr.id,
        currentCount: 0,
        completed: false,
        lastUpdated: Date.now(),
      };
    });
    setThikrStates(reset);
    setStorageItem(StorageKeys.ADHKAR_EVENING, reset);
  };

  const totalCompleted = Object.values(thikrStates).filter((s) => s.completed).length;
  const totalProgress = Object.values(thikrStates).reduce(
    (sum, state) => {
      const thikr = eveningThikr.find((t) => t.id === state.thikrId);
      if (thikr) {
        return {
          current: sum.current + state.currentCount,
          total: sum.total + thikr.count,
        };
      }
      return sum;
    },
    { current: 0, total: 0 }
  );

  const overallProgress =
    totalProgress.total > 0
      ? (totalProgress.current / totalProgress.total) * 100
      : 0;

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
              <Sunset className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-[#0F172A] dark:text-[#ECFDF5] mb-2">
                أذكار المساء
              </h1>
              <p className="text-[#64748B] dark:text-[#ECFDF5]/60 text-lg">
                اقرأ الأذكار واضغط للعد
              </p>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleResetAll}
            className="flex items-center gap-2 px-6 py-3 bg-[#F7FDFB] dark:bg-[#141D1B] text-[#334155] dark:text-[#ECFDF5]/60 rounded-xl font-semibold hover:bg-[#F7FDFB]/80 dark:hover:bg-[#141D1B]/80 transition-colors border border-[#16A34A]/10 dark:border-[#30D09A]/10"
          >
            <RotateCcw className="h-5 w-5" />
            <span>إعادة ضبط الكل</span>
          </motion.button>
        </div>

        {/* Progress Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white/60 dark:bg-[#141D1B]/60 backdrop-blur-[16px] rounded-[20px] p-8 shadow-[0_8px_32px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)] border border-[#16A34A]/10 dark:border-[#30D09A]/10"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-6 w-6 text-[#16A34A] dark:text-[#30D09A]" />
              <span className="text-lg font-semibold text-[#334155] dark:text-[#ECFDF5]/80">
                التقدم العام
              </span>
            </div>
            <span className="text-lg font-bold text-[#16A34A] dark:text-[#30D09A]">
              {totalCompleted} / {eveningThikr.length} مكتمل
            </span>
          </div>
          <div className="w-full bg-[#F7FDFB] dark:bg-[#0E1412] rounded-full h-4 mb-3 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${overallProgress}%` }}
              transition={{ duration: 1, delay: 0.3 }}
              className="h-4 rounded-full bg-[#16A34A] dark:bg-[#30D09A]"
            />
          </div>
          <div className="text-sm text-[#64748B] dark:text-[#ECFDF5]/60 font-medium">
            {totalProgress.current} / {totalProgress.total} ذكر
          </div>
        </motion.div>
      </motion.div>

      {/* Thikr Cards */}
      <div className="space-y-6">
        {eveningThikr.map((thikr) => {
          const state =
            thikrStates[thikr.id] || {
              thikrId: thikr.id,
              currentCount: 0,
              completed: false,
              lastUpdated: Date.now(),
            };
          return (
            <ThikrCard
              key={thikr.id}
              thikr={thikr}
              state={state}
              onUpdate={handleUpdate}
            />
          );
        })}
      </div>
    </div>
  );
}
