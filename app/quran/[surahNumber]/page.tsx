"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { fetchSurah, getSurah } from "@/lib/quranData";
import { SurahWithAyahs } from "@/types";
import { AyahCard } from "@/components/AyahCard";
import { ArrowRight, ArrowLeft, Settings } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

export const dynamic = 'force-dynamic';

export default function SurahPage() {
  const params = useParams();
  const router = useRouter();
  const surahNumber = parseInt(params.surahNumber as string);
  const [surah, setSurah] = useState<SurahWithAyahs | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { settings, setFontSize } = useTheme();
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    const loadSurah = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchSurah(surahNumber);
        if (data) {
          setSurah(data);
        } else {
          setError("فشل في تحميل السورة");
        }
      } catch (err) {
        setError("حدث خطأ أثناء تحميل السورة");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (surahNumber && surahNumber >= 1 && surahNumber <= 114) {
      loadSurah();
    } else {
      setError("رقم السورة غير صحيح");
      setLoading(false);
    }
  }, [surahNumber]);

  const surahInfo = getSurah(surahNumber);
  const prevSurah = surahNumber > 1 ? surahNumber - 1 : null;
  const nextSurah = surahNumber < 114 ? surahNumber + 1 : null;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-light dark:border-primary-dark mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  if (error || !surah || !surahInfo) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 dark:text-red-400 mb-4">{error || "السورة غير موجودة"}</p>
        <button
          onClick={() => router.push("/quran")}
          className="px-4 py-2 bg-primary-light dark:bg-primary-dark text-white rounded-lg hover:opacity-90"
        >
          العودة لقائمة السور
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="mb-8 bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 font-arabic">
              {surah.name}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {surah.englishNameTranslation} • {surah.numberOfAyahs} آية •{" "}
              {surah.revelationType === "Meccan" ? "مكية" : "مدنية"}
            </p>
          </div>
          <div className="relative">
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Settings className="h-5 w-5" />
            </button>
            {showSettings && (
              <div className="absolute left-0 rtl:left-auto rtl:right-0 top-full mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 z-10 border border-gray-200 dark:border-gray-700">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  حجم الخط
                </label>
                <div className="space-y-2">
                  {(["small", "medium", "large", "xlarge"] as const).map((size) => (
                    <button
                      key={size}
                      onClick={() => {
                        setFontSize(size);
                        setShowSettings(false);
                      }}
                      className={`w-full text-right px-3 py-2 rounded-lg text-sm ${
                        settings.fontSize === size
                          ? "bg-primary-light dark:bg-primary-dark text-white"
                          : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                      }`}
                    >
                      {size === "small" && "صغير"}
                      {size === "medium" && "متوسط"}
                      {size === "large" && "كبير"}
                      {size === "xlarge" && "كبير جداً"}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
          {prevSurah ? (
            <button
              onClick={() => router.push(`/quran/${prevSurah}`)}
              className="flex items-center space-x-2 rtl:space-x-reverse text-primary-light dark:text-primary-dark hover:opacity-80"
            >
              <ArrowRight className="h-4 w-4" />
              <span>السورة السابقة</span>
            </button>
          ) : (
            <div></div>
          )}
          {nextSurah ? (
            <button
              onClick={() => router.push(`/quran/${nextSurah}`)}
              className="flex items-center space-x-2 rtl:space-x-reverse text-primary-light dark:text-primary-dark hover:opacity-80"
            >
              <span>السورة التالية</span>
              <ArrowLeft className="h-4 w-4" />
            </button>
          ) : (
            <div></div>
          )}
        </div>
      </div>

      {/* Ayahs */}
      <div className="space-y-4">
        {surah.ayahs.map((ayah, index) => (
          <AyahCard
            key={ayah.number}
            ayah={ayah}
            surahNumber={surah.number}
            surahName={surah.name}
            showBismillah={index === 0 && surah.number !== 1 && surah.number !== 9}
          />
        ))}
      </div>

      {/* Bottom Navigation */}
      <div className="mt-8 flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
        {prevSurah ? (
          <button
            onClick={() => {
              router.push(`/quran/${prevSurah}`);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center space-x-2 rtl:space-x-reverse text-primary-light dark:text-primary-dark hover:opacity-80"
          >
            <ArrowRight className="h-4 w-4" />
            <span>السورة السابقة</span>
          </button>
        ) : (
          <div></div>
        )}
        {nextSurah ? (
          <button
            onClick={() => {
              router.push(`/quran/${nextSurah}`);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center space-x-2 rtl:space-x-reverse text-primary-light dark:text-primary-dark hover:opacity-80"
          >
            <span>السورة التالية</span>
            <ArrowLeft className="h-4 w-4" />
          </button>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}

