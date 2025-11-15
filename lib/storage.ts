// مساعدات localStorage

export const StorageKeys = {
  BOOKMARKS: "quran_bookmarks",
  FAVORITES: "quran_favorites",
  ADHKAR_MORNING: "adhkar_morning_state",
  ADHKAR_EVENING: "adhkar_evening_state",
  TASBIH_STATS: "tasbih_stats",
  APP_SETTINGS: "app_settings",
} as const;

export function getStorageItem<T>(key: string, defaultValue: T): T {
  if (typeof window === "undefined") return defaultValue;
  
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error reading from localStorage key "${key}":`, error);
    return defaultValue;
  }
}

export function setStorageItem<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error writing to localStorage key "${key}":`, error);
  }
}

export function removeStorageItem(key: string): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(key);
}

