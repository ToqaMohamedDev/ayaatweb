"use client";

import { Thikr, ThikrState } from "@/types";
import { CheckCircle2, RotateCcw, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";

interface ThikrCardProps {
  thikr: Thikr;
  state: ThikrState;
  onUpdate: (thikrId: string, currentCount: number, completed: boolean) => void;
}

export function ThikrCard({ thikr, state, onUpdate }: ThikrCardProps) {
  const [currentCount, setCurrentCount] = useState(state.currentCount);
  const [completed, setCompleted] = useState(state.completed);

  useEffect(() => {
    setCurrentCount(state.currentCount);
    setCompleted(state.completed);
  }, [state]);

  const handleIncrement = () => {
    if (completed) return;
    
    const newCount = Math.min(currentCount + 1, thikr.count);
    const newCompleted = newCount >= thikr.count;
    
    setCurrentCount(newCount);
    setCompleted(newCompleted);
    onUpdate(thikr.id, newCount, newCompleted);
  };

  const handleDecrement = () => {
    if (currentCount > 0) {
      const newCount = currentCount - 1;
      setCurrentCount(newCount);
      setCompleted(false);
      onUpdate(thikr.id, newCount, false);
    }
  };

  const handleReset = () => {
    setCurrentCount(0);
    setCompleted(false);
    onUpdate(thikr.id, 0, false);
  };

  const progress = thikr.count > 0 ? (currentCount / thikr.count) * 100 : 0;

  return (
    <div
      className={`relative bg-white/60 dark:bg-[#141D1B]/60 backdrop-blur-[16px] rounded-[20px] p-8 border transition-all duration-200 shadow-[0_8px_32px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:shadow-[0_12px_48px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_12px_48px_rgba(0,0,0,0.4)] overflow-hidden ${
        completed
          ? "border-[#16A34A] dark:border-[#30D09A]"
          : "border-[#16A34A]/10 dark:border-[#30D09A]/10"
      }`}
    >
      {/* Completed Badge */}
      {completed && (
        <div className="absolute top-6 left-6 rtl:left-auto rtl:right-6 z-10">
          <div className="bg-[#16A34A] dark:bg-[#30D09A] text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            <span className="font-bold">مكتمل</span>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="relative flex items-start justify-between mb-6">
        <div className="flex-1 pr-4 rtl:pr-0 rtl:pl-4">
          <p className="text-2xl md:text-3xl font-arabic text-[#0F172A] dark:text-[#ECFDF5] leading-loose mb-4 text-right font-bold" dir="rtl">
            {thikr.text}
          </p>
          {thikr.benefit && (
            <div className="bg-[#F7FDFB] dark:bg-[#141D1B] rounded-2xl p-5 mb-4 border-r-4 border-[#16A34A] dark:border-[#30D09A] shadow-md">
              <p className="text-sm text-[#334155] dark:text-[#ECFDF5]/80 text-right leading-relaxed font-medium" dir="rtl">
                {thikr.benefit}
              </p>
            </div>
          )}
          {thikr.source && (
            <p className="text-xs text-[#64748B] dark:text-[#ECFDF5]/40 font-semibold">
              📖 المصدر: {thikr.source}
            </p>
          )}
        </div>
      </div>

      {/* Counter */}
      <div className="relative mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#16A34A] dark:bg-[#30D09A] flex items-center justify-center shadow-lg">
              <span className="text-xl font-bold text-white">{currentCount}</span>
            </div>
            <div>
              <span className="text-2xl font-bold text-[#0F172A] dark:text-[#ECFDF5] block">
                {currentCount} / {thikr.count}
              </span>
              <span className="text-xs text-[#64748B] dark:text-[#ECFDF5]/60">ذكر</span>
            </div>
          </div>
          <button
            onClick={handleReset}
            className="p-3 rounded-xl bg-[#F7FDFB] dark:bg-[#141D1B] text-[#64748B] dark:text-[#ECFDF5]/60 hover:bg-[#F7FDFB]/80 dark:hover:bg-[#141D1B]/80 transition-all duration-200 active:scale-95 border border-[#16A34A]/10 dark:border-[#30D09A]/10"
            title="إعادة الضبط"
          >
            <RotateCcw className="h-5 w-5" />
          </button>
        </div>
        <div className="w-full bg-[#F7FDFB] dark:bg-[#0E1412] rounded-full h-4 overflow-hidden shadow-inner">
          <div
            className={`h-4 rounded-full transition-all duration-300 ${
              completed
                ? "bg-[#16A34A] dark:bg-[#30D09A]"
                : "bg-[#16A34A] dark:bg-[#30D09A]"
            }`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Actions */}
      <div className="relative flex items-center gap-4">
        <button
          onClick={handleDecrement}
          disabled={currentCount === 0}
          className="w-14 h-14 rounded-xl bg-[#F7FDFB] dark:bg-[#141D1B] text-[#334155] dark:text-[#ECFDF5]/60 font-bold text-xl hover:bg-[#F7FDFB]/80 dark:hover:bg-[#141D1B]/80 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg active:scale-95 border border-[#16A34A]/10 dark:border-[#30D09A]/10"
        >
          -
        </button>
        <button
          onClick={handleIncrement}
          disabled={completed}
          className={`flex-1 h-14 rounded-xl font-bold text-lg transition-all duration-200 shadow-xl active:scale-95 ${
            completed
              ? "bg-[#16A34A] dark:bg-[#30D09A] text-white cursor-not-allowed"
              : "bg-[#16A34A] dark:bg-[#30D09A] text-white hover:shadow-2xl"
          }`}
        >
          {completed ? "✓ مكتمل" : "اضغط للعد"}
        </button>
      </div>
    </div>
  );
}
