import Link from "next/link";
import { Sunrise, Sunset, Moon, Sun } from "lucide-react";

export const dynamic = 'force-dynamic';

export default function AdhkarPage() {
  const categories = [
    {
      title: "أذكار الصباح",
      description: "أذكار الصباح مع عداد للتكرار",
      href: "/adhkar/morning",
      icon: Sunrise,
      color: "bg-yellow-500",
    },
    {
      title: "أذكار المساء",
      description: "أذكار المساء مع عداد للتكرار",
      href: "/adhkar/evening",
      icon: Sunset,
      color: "bg-purple-500",
    },
  ];

  return (
    <div className="min-h-screen">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          الأذكار
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          اختر نوع الأذكار للبدء
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <Link
              key={category.href}
              href={category.href}
              className="group bg-white dark:bg-gray-800 rounded-xl p-8 shadow-md hover:shadow-lg transition-all border border-gray-200 dark:border-gray-700"
            >
              <div className={`${category.color} w-16 h-16 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <Icon className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {category.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                {category.description}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

