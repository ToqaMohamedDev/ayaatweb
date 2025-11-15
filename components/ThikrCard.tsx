"use client";

import { Thikr, ThikrState } from "@/types";
import { CheckCircle2, RotateCcw } from "lucide-react";
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
      className={`card relative overflow-hidden transition-all duration-300 ${
        completed
          ? "border-green-400 dark:border-green-500 bg-gradient-to-br from-green-50 to-green-100/50 dark:from-green-900/20 dark:to-green-800/10"
          : "hover:border-primary-300 dark:hover:border-primary-600"
      }`}
    >
      {/* Completed Badge */}
      {completed && (
        <div className="absolute top-4 left-4 rtl:left-auto rtl:right-4 z-10">
          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-xl shadow-lg flex items-center gap-2 animate-scaleIn">
            <CheckCircle2 className="h-5 w-5" />
            <span className="font-semibold">مكتمل</span>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex-1 pr-4 rtl:pr-0 rtl:pl-4">
          <p className="text-2xl md:text-3xl font-arabic text-gray-900 dark:text-white leading-loose mb-4 text-right font-bold" dir="rtl">
            {thikr.text}
          </p>
          {thikr.benefit && (
            <div className="bg-primary-50 dark:bg-primary-900/20 rounded-xl p-4 mb-3 border-r-4 border-primary-500 dark:border-primary-400">
              <p className="text-sm text-gray-700 dark:text-gray-300 text-right leading-relaxed" dir="rtl">
                {thikr.benefit}
              </p>
            </div>
          )}
          {thikr.source && (
            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
              📖 المصدر: {thikr.source}
            </p>
          )}
        </div>
      </div>

      {/* Counter */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-lg font-bold text-gray-700 dark:text-gray-300">
            {currentCount} / {thikr.count}
          </span>
          <button
            onClick={handleReset}
            className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700/50 hover:text-gray-700 dark:hover:text-gray-200 transition-all duration-200 hover:scale-110 hover:rotate-180"
            title="إعادة الضبط"
          >
            <RotateCcw className="h-5 w-5" />
          </button>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
          <div
            className={`h-3 rounded-full transition-all duration-500 ${
              completed
                ? "bg-gradient-to-r from-green-500 to-green-600"
                : ""
            }`}
            style={{
              ...(!completed ? { background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)' } : {}),
              width: `${progress}%`
            }}
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4">
        <button
          onClick={handleDecrement}
          disabled={currentCount === 0}
          className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-bold text-xl hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-110 active:scale-95 shadow-md"
        >
          -
        </button>
        <button
          onClick={handleIncrement}
          disabled={completed}
          className={`flex-1 h-12 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg ${
            completed
              ? "bg-gradient-to-r from-green-500 to-green-600 text-white cursor-not-allowed"
              : "text-white hover:shadow-glow hover:scale-105 active:scale-95"
          }`}
          style={!completed ? { background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)' } : {}}
        >
          {completed ? "✓ مكتمل" : "اضغط للعد"}
        </button>
      </div>
    </div>
  );
}

