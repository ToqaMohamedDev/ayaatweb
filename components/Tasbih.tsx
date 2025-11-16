"use client";

import { useState, useEffect } from "react";
import { TasbihStats } from "@/types";
import { StorageKeys, getStorageItem, setStorageItem } from "@/lib/storage";
import { RotateCcw, Save, TrendingUp, Calendar, Sparkles, Volume2, Vibrate } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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

  useEffect(() => {
    const today = new Date().toDateString();
    const lastDate = stats.history[stats.history.length - 1]?.date;
    
    if (lastDate !== today) {
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

    if (vibrationEnabled && (newCount === 33 || newCount === 100)) {
      if (navigator.vibrate) {
        navigator.vibrate(200);
      }
    }

    setStats({
      ...stats,
      currentCount: newCount,
      todayTotal: newTodayTotal,
      allTimeTotal: newAllTimeTotal,
    });

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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Counter */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/60 dark:bg-[#141D1B]/60 backdrop-blur-[16px] rounded-[20px] p-8 shadow-[0_8px_32px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)] border border-[#16A34A]/10 dark:border-[#30D09A]/10"
          >
            {/* Type Selector */}
            <div className="mb-8">
              <label className="block text-lg font-semibold text-[#334155] dark:text-[#ECFDF5]/80 mb-4">
                نوع التسبيح
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {tasbihTypes.map((type) => (
                  <motion.button
                    key={type.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleTypeChange(type.id)}
                    className={`px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                      stats.currentType === type.id
                        ? "text-white shadow-lg bg-[#16A34A] dark:bg-[#30D09A]"
                        : "bg-[#F7FDFB] dark:bg-[#141D1B] text-[#334155] dark:text-[#ECFDF5]/60 hover:bg-[#F7FDFB]/80 dark:hover:bg-[#141D1B]/80 border border-[#16A34A]/10 dark:border-[#30D09A]/10"
                    }`}
                  >
                    {type.name}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Custom Input */}
            <AnimatePresence>
              {stats.currentType === "custom" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-8 space-y-4"
                >
                  <div>
                    <label className="block text-sm font-semibold text-[#334155] dark:text-[#ECFDF5]/80 mb-2">
                      نص التسبيح
                    </label>
                    <input
                      type="text"
                      value={customText}
                      onChange={(e) => setCustomText(e.target.value)}
                      placeholder="اكتب التسبيح..."
                      className="w-full px-4 py-3 border-2 border-[#16A34A]/20 dark:border-[#30D09A]/20 rounded-xl bg-white/80 dark:bg-[#141D1B]/80 backdrop-blur-sm text-[#0F172A] dark:text-[#ECFDF5] focus:ring-2 focus:ring-[#16A34A] dark:focus:ring-[#30D09A] focus:border-transparent transition-all"
                      dir="rtl"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#334155] dark:text-[#ECFDF5]/80 mb-2">
                      عدد التكرار
                    </label>
                    <input
                      type="number"
                      value={customCount}
                      onChange={(e) => setCustomCount(parseInt(e.target.value) || 100)}
                      min="1"
                      max="1000"
                      className="w-full px-4 py-3 border-2 border-[#16A34A]/20 dark:border-[#30D09A]/20 rounded-xl bg-white/80 dark:bg-[#141D1B]/80 backdrop-blur-sm text-[#0F172A] dark:text-[#ECFDF5] focus:ring-2 focus:ring-[#16A34A] dark:focus:ring-[#30D09A] focus:border-transparent transition-all"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Current Type Display */}
            <div className="text-center mb-10">
              <motion.p
                key={stats.currentType}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl md:text-4xl font-arabic text-[#0F172A] dark:text-[#ECFDF5] mb-3 font-bold" dir="rtl"
              >
                {stats.currentType === "custom" && customText
                  ? customText
                  : currentType.name}
              </motion.p>
              <p className="text-lg text-[#64748B] dark:text-[#ECFDF5]/60">
                الهدف: {targetCount}
              </p>
            </div>

            {/* Counter Display */}
            <div className="text-center mb-8">
              <motion.div
                key={stats.currentCount}
                initial={{ scale: 1.2, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-9xl md:text-[12rem] font-bold mb-6 text-[#16A34A] dark:text-[#30D09A]"
              >
                {stats.currentCount}
              </motion.div>
              <div className="w-full bg-[#F7FDFB] dark:bg-[#0E1412] rounded-full h-5 mb-3 overflow-hidden shadow-inner">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5 }}
                  className="h-5 rounded-full bg-[#16A34A] dark:bg-[#30D09A]"
                />
              </div>
              <p className="text-lg font-semibold text-[#64748B] dark:text-[#ECFDF5]/60">
                {stats.currentCount} / {targetCount}
              </p>
            </div>

            {/* Main Button */}
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleCount}
              className="w-full py-6 bg-[#16A34A] dark:bg-[#30D09A] text-white rounded-2xl text-2xl font-bold shadow-2xl hover:shadow-3xl transition-all duration-300"
            >
              اضغط للعد
            </motion.button>

            {/* Actions */}
            <div className="flex items-center justify-center gap-4 mt-6">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleReset}
                className="flex items-center gap-2 px-6 py-3 bg-[#F7FDFB] dark:bg-[#141D1B] text-[#334155] dark:text-[#ECFDF5]/60 rounded-xl font-semibold hover:bg-[#F7FDFB]/80 dark:hover:bg-[#141D1B]/80 transition-colors border border-[#16A34A]/10 dark:border-[#30D09A]/10"
              >
                <RotateCcw className="h-5 w-5" />
                <span>إعادة ضبط</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleSave}
                className="flex items-center gap-2 px-6 py-3 bg-[#16A34A] dark:bg-[#30D09A] text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
              >
                <Save className="h-5 w-5" />
                <span>حفظ</span>
              </motion.button>
            </div>

            {/* Settings */}
            <div className="mt-8 pt-6 border-t border-[#16A34A]/10 dark:border-[#30D09A]/10 flex items-center justify-center gap-6">
              <label className="flex items-center gap-2 text-sm font-semibold text-[#334155] dark:text-[#ECFDF5]/80 cursor-pointer">
                <input
                  type="checkbox"
                  checked={vibrationEnabled}
                  onChange={(e) => setVibrationEnabled(e.target.checked)}
                  className="w-5 h-5 rounded text-[#16A34A] dark:text-[#30D09A] focus:ring-2 focus:ring-[#16A34A] dark:focus:ring-[#30D09A]"
                />
                <Vibrate className="h-5 w-5" />
                <span>الاهتزاز</span>
              </label>
              <label className="flex items-center gap-2 text-sm font-semibold text-[#334155] dark:text-[#ECFDF5]/80 cursor-pointer">
                <input
                  type="checkbox"
                  checked={soundEnabled}
                  onChange={(e) => setSoundEnabled(e.target.checked)}
                  className="w-5 h-5 rounded text-[#16A34A] dark:text-[#30D09A] focus:ring-2 focus:ring-[#16A34A] dark:focus:ring-[#30D09A]"
                />
                <Volume2 className="h-5 w-5" />
                <span>الصوت</span>
              </label>
            </div>
          </motion.div>
        </div>

        {/* Stats Sidebar */}
        <div className="space-y-6">
          {/* Today Stats */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/60 dark:bg-[#141D1B]/60 backdrop-blur-[16px] rounded-[20px] p-6 shadow-[0_8px_32px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)] border border-[#16A34A]/10 dark:border-[#30D09A]/10"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-[#16A34A] dark:bg-[#30D09A] flex items-center justify-center shadow-lg">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#0F172A] dark:text-[#ECFDF5]">
                اليوم
              </h3>
            </div>
            <div className="text-5xl font-bold text-[#16A34A] dark:text-[#30D09A] mb-2">
              {stats.todayTotal}
            </div>
            <p className="text-sm text-[#64748B] dark:text-[#ECFDF5]/60 font-medium">تسبيحة</p>
          </motion.div>

          {/* All Time Stats */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/60 dark:bg-[#141D1B]/60 backdrop-blur-[16px] rounded-[20px] p-6 shadow-[0_8px_32px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)] border border-[#16A34A]/10 dark:border-[#30D09A]/10"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-[#16A34A] dark:bg-[#30D09A] flex items-center justify-center shadow-lg">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#0F172A] dark:text-[#ECFDF5]">
                الإجمالي
              </h3>
            </div>
            <div className="text-5xl font-bold text-[#16A34A] dark:text-[#30D09A] mb-2">
              {stats.allTimeTotal}
            </div>
            <p className="text-sm text-[#64748B] dark:text-[#ECFDF5]/60 font-medium">تسبيحة</p>
          </motion.div>

          {/* Recent History */}
          {stats.history.length > 0 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white/60 dark:bg-[#141D1B]/60 backdrop-blur-[16px] rounded-[20px] p-6 shadow-[0_8px_32px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)] border border-[#16A34A]/10 dark:border-[#30D09A]/10"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-[#16A34A] dark:bg-[#30D09A] flex items-center justify-center shadow-lg">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-[#0F172A] dark:text-[#ECFDF5]">
                  السجل الأخير
                </h3>
              </div>
              <div className="space-y-3 max-h-64 overflow-y-auto custom-scrollbar">
                {stats.history
                  .slice(-7)
                  .reverse()
                  .map((entry, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-center justify-between py-3 px-4 bg-[#F7FDFB] dark:bg-[#0E1412] rounded-xl"
                    >
                      <span className="text-sm font-medium text-[#64748B] dark:text-[#ECFDF5]/60">
                        {new Date(entry.date).toLocaleDateString("ar-SA")}
                      </span>
                      <span className="text-lg font-bold text-[#16A34A] dark:text-[#30D09A]">
                        {entry.count}
                      </span>
                    </motion.div>
                  ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
