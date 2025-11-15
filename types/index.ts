// أنواع البيانات الأساسية

export interface Surah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: "Meccan" | "Medinan";
}

export interface Ayah {
  number: number;
  text: string;
  numberInSurah: number;
  juz?: number;
  manzil?: number;
  page?: number;
  ruku?: number;
  sajda?: boolean;
}

export interface SurahWithAyahs extends Surah {
  ayahs: Ayah[];
}

// العلامات المرجعية
export interface Bookmark {
  id: string;
  surahNumber: number;
  surahName: string;
  ayahNumber: number;
  ayahText: string;
  note?: string;
  timestamp: number;
}

// الآيات المفضلة
export interface FavoriteAyah {
  id: string;
  surahNumber: number;
  surahName: string;
  ayahNumber: number;
  ayahText: string;
  category: "memorization" | "reflection" | "share";
  note?: string;
  timestamp: number;
}

// حالة الأذكار
export interface ThikrState {
  thikrId: string;
  currentCount: number;
  completed: boolean;
  lastUpdated: number;
}

// بيانات الذكر
export interface Thikr {
  id: string;
  text: string;
  count: number;
  benefit?: string;
  source?: string;
  transliteration?: string;
}

// إحصائيات السبحة
export interface TasbihStats {
  currentCount: number;
  todayTotal: number;
  allTimeTotal: number;
  currentType: string;
  history: {
    date: string;
    count: number;
  }[];
}

// إعدادات التطبيق
export interface AppSettings {
  theme: "light" | "dark";
  fontSize: "small" | "medium" | "large" | "xlarge";
  fontFamily: string;
}

