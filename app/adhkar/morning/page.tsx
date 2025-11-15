"use client";

import { useState, useEffect } from "react";
import { morningThikr } from "@/lib/adhkarData";
import { ThikrCard } from "@/components/ThikrCard";
import { ThikrState } from "@/types";
import { StorageKeys, getStorageItem, setStorageItem } from "@/lib/storage";
import { RotateCcw } from "lucide-react";

export const dynamic = 'force-dynamic';

export default function MorningAdhkarPage() {
  const [thikrStates, setThikrStates] = useState<Record<string, ThikrState>>({});

  useEffect(() => {
    const saved = getStorageItem<Record<string, ThikrState>>(
      StorageKeys.ADHKAR_MORNING,
      {}
    );
    
    // تهيئة الحالات للذكريات غير المحفوظة
    const initialized: Record<string, ThikrState> = {};
    morningThikr.forEach((thikr) => {
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
    setStorageItem(StorageKeys.ADHKAR_MORNING, updated);
  };

  const handleResetAll = () => {
    const reset: Record<string, ThikrState> = {};
    morningThikr.forEach((thikr) => {
      reset[thikr.id] = {
        thikrId: thikr.id,
        currentCount: 0,
        completed: false,
        lastUpdated: Date.now(),
      };
    });
    setThikrStates(reset);
    setStorageItem(StorageKeys.ADHKAR_MORNING, reset);
  };

  const totalCompleted = Object.values(thikrStates).filter((s) => s.completed).length;
  const totalProgress = Object.values(thikrStates).reduce(
    (sum, state) => {
      const thikr = morningThikr.find((t) => t.id === state.thikrId);
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
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              أذكار الصباح
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              اقرأ الأذكار واضغط للعد
            </p>
          </div>
          <button
            onClick={handleResetAll}
            className="flex items-center space-x-2 rtl:space-x-reverse px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            <RotateCcw className="h-4 w-4" />
            <span>إعادة ضبط الكل</span>
          </button>
        </div>

        {/* Progress Summary */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md border border-gray-200 dark:border-gray-700 mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              التقدم العام
            </span>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {totalCompleted} / {morningThikr.length} مكتمل
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-2">
            <div
              className="bg-primary-light dark:bg-primary-dark h-3 rounded-full transition-all"
              style={{ width: `${overallProgress}%` }}
            />
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-500">
            {totalProgress.current} / {totalProgress.total} ذكر
          </div>
        </div>
      </div>

      {/* Thikr Cards */}
      <div className="space-y-6">
        {morningThikr.map((thikr) => {
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

