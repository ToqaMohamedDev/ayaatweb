"use client";

import { useState, useEffect } from "react";
import { TasbihStats } from "@/types";
import { StorageKeys, getStorageItem, setStorageItem } from "@/lib/storage";
import { RotateCcw, Save, TrendingUp, Calendar } from "lucide-react";

const tasbihTypes = [
  { id: "subhanallah", name: "سبحان الله", count: 33 },
  { id: "alhamdulillah", name: "الحمد لله", count: 33 },
  { id: "allahuakbar", name: "الله أكبر", count: 33 },
  { id: "laillaha", name: "لا إله إلا الله", count: 33 },
  { id: "astaghfirullah", name: "أستغفر الله", count: 33 },
  { id: "hasbunallah", name: "حسبي الله ونعم الوكيل", count: 33 },
  { id: "custom", name: "مخصص", count: 100 },
];

export default function Tasbih() {
  const [stats, setStats] = useState<TasbihStats>(() => {
    if (typeof window !== "undefined") {
      return getStorageItem<TasbihStats>(StorageKeys.TASBIH_STATS, {
        currentCount: 0,
        todayTotal: 0,
        allTimeTotal: 0,
        currentType: "subhanallah",
        history: [],
      });
    }
    return {
      currentCount: 0,
      todayTotal: 0,
      allTimeTotal: 0,
      currentType: "subhanallah",
      history: [],
    };
  });

  const [customText, setCustomText] = useState("");
  const [customCount, setCustomCount] = useState(100);
  const [vibrationEnabled, setVibrationEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setStorageItem(StorageKeys.TASBIH_STATS, stats);
    }
  }, [stats]);

  // تحديث اليوم
  useEffect(() => {
    const today = new Date().toDateString();
    const lastDate = stats.history[stats.history.length - 1]?.date;
    
    if (lastDate !== today) {
      // يوم جديد - حفظ إجمالي اليوم السابق
      if (stats.todayTotal > 0) {
        const updatedHistory = [...stats.history];
        const existingIndex = updatedHistory.findIndex((h) => h.date === today);
        
        if (existingIndex >= 0) {
          updatedHistory[existingIndex].count = stats.todayTotal;
        } else {
          updatedHistory.push({ date: today, count: stats.todayTotal });
        }
        
        setStats((prev) => ({
          ...prev,
          todayTotal: 0,
          currentCount: 0,
          history: updatedHistory,
        }));
      }
    }
  }, [stats.history, stats.todayTotal]);

  const currentType = tasbihTypes.find((t) => t.id === stats.currentType) || tasbihTypes[0];
  const targetCount = stats.currentType === "custom" ? customCount : currentType.count;

  const handleCount = () => {
    const newCount = stats.currentCount + 1;
    const newTodayTotal = stats.todayTotal + 1;
    const newAllTimeTotal = stats.allTimeTotal + 1;

    // اهتزاز عند الوصول لـ 33 أو 100
    if (vibrationEnabled && (newCount === 33 || newCount === 100)) {
      if (navigator.vibrate) {
        navigator.vibrate(200);
      }
    }

    // صوت خفيف
    if (soundEnabled) {
      // يمكن إضافة صوت هنا
    }

    setStats({
      ...stats,
      currentCount: newCount,
      todayTotal: newTodayTotal,
      allTimeTotal: newAllTimeTotal,
    });

    // إعادة الضبط التلقائي عند الوصول للهدف
    if (newCount >= targetCount) {
      setTimeout(() => {
        setStats((prev) => ({
          ...prev,
          currentCount: 0,
        }));
      }, 500);
    }
  };

  const handleReset = () => {
    setStats({
      ...stats,
      currentCount: 0,
    });
  };

  const handleSave = () => {
    const today = new Date().toDateString();
    const updatedHistory = [...stats.history];
    const existingIndex = updatedHistory.findIndex((h) => h.date === today);

    if (existingIndex >= 0) {
      updatedHistory[existingIndex].count = stats.todayTotal;
    } else {
      updatedHistory.push({ date: today, count: stats.todayTotal });
    }

    setStats({
      ...stats,
      history: updatedHistory,
    });
  };

  const handleTypeChange = (typeId: string) => {
    setStats({
      ...stats,
      currentType: typeId,
      currentCount: 0,
    });
  };

  const progress = targetCount > 0 ? (stats.currentCount / targetCount) * 100 : 0;

  return (
    <div className="min-h-screen">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          السبحة الإلكترونية
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          اضغط للعد والتسبيح
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Counter */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
            {/* Type Selector */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                نوع التسبيح
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {tasbihTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => handleTypeChange(type.id)}
                    className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                      stats.currentType === type.id
                        ? "bg-primary-light dark:bg-primary-dark text-white"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                    }`}
                  >
                    {type.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Input */}
            {stats.currentType === "custom" && (
              <div className="mb-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    نص التسبيح
                  </label>
                  <input
                    type="text"
                    value={customText}
                    onChange={(e) => setCustomText(e.target.value)}
                    placeholder="اكتب التسبيح..."
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    dir="rtl"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    عدد التكرار
                  </label>
                  <input
                    type="number"
                    value={customCount}
                    onChange={(e) => setCustomCount(parseInt(e.target.value) || 100)}
                    min="1"
                    max="1000"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
              </div>
            )}

            {/* Current Type Display */}
            <div className="text-center mb-8">
              <p className="text-2xl font-arabic text-gray-900 dark:text-white mb-2" dir="rtl">
                {stats.currentType === "custom" && customText
                  ? customText
                  : currentType.name}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                الهدف: {targetCount}
              </p>
            </div>

            {/* Counter Display */}
            <div className="text-center mb-6">
              <div className="text-8xl font-bold text-primary-light dark:text-primary-dark mb-4">
                {stats.currentCount}
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 mb-2">
                <div
                  className="bg-primary-light dark:bg-primary-dark h-4 rounded-full transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {stats.currentCount} / {targetCount}
              </p>
            </div>

            {/* Main Button */}
            <button
              onClick={handleCount}
              className="w-full py-6 bg-primary-light dark:bg-primary-dark text-white rounded-xl text-2xl font-bold hover:opacity-90 active:scale-95 transition-all shadow-lg"
            >
              اضغط للعد
            </button>

            {/* Actions */}
            <div className="flex items-center justify-center space-x-4 rtl:space-x-reverse mt-4">
              <button
                onClick={handleReset}
                className="flex items-center space-x-2 rtl:space-x-reverse px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                <RotateCcw className="h-4 w-4" />
                <span>إعادة ضبط</span>
              </button>
              <button
                onClick={handleSave}
                className="flex items-center space-x-2 rtl:space-x-reverse px-4 py-2 bg-green-500 dark:bg-green-400 text-white rounded-lg hover:opacity-90 transition-opacity"
              >
                <Save className="h-4 w-4" />
                <span>حفظ</span>
              </button>
            </div>

            {/* Settings */}
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 flex items-center justify-center space-x-4 rtl:space-x-reverse">
              <label className="flex items-center space-x-2 rtl:space-x-reverse text-sm text-gray-700 dark:text-gray-300">
                <input
                  type="checkbox"
                  checked={vibrationEnabled}
                  onChange={(e) => setVibrationEnabled(e.target.checked)}
                  className="rounded"
                />
                <span>الاهتزاز</span>
              </label>
              <label className="flex items-center space-x-2 rtl:space-x-reverse text-sm text-gray-700 dark:text-gray-300">
                <input
                  type="checkbox"
                  checked={soundEnabled}
                  onChange={(e) => setSoundEnabled(e.target.checked)}
                  className="rounded"
                />
                <span>الصوت</span>
              </label>
            </div>
          </div>
        </div>

        {/* Stats Sidebar */}
        <div className="space-y-6">
          {/* Today Stats */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-2 rtl:space-x-reverse mb-4">
              <Calendar className="h-5 w-5 text-primary-light dark:text-primary-dark" />
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                اليوم
              </h3>
            </div>
            <div className="text-3xl font-bold text-primary-light dark:text-primary-dark mb-2">
              {stats.todayTotal}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">تسبيحة</p>
          </div>

          {/* All Time Stats */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-2 rtl:space-x-reverse mb-4">
              <TrendingUp className="h-5 w-5 text-primary-light dark:text-primary-dark" />
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                الإجمالي
              </h3>
            </div>
            <div className="text-3xl font-bold text-primary-light dark:text-primary-dark mb-2">
              {stats.allTimeTotal}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">تسبيحة</p>
          </div>

          {/* Recent History */}
          {stats.history.length > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                السجل الأخير
              </h3>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {stats.history
                  .slice(-7)
                  .reverse()
                  .map((entry, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-700 last:border-0"
                    >
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {new Date(entry.date).toLocaleDateString("ar-SA")}
                      </span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {entry.count}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

