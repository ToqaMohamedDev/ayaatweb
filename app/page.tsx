import Link from "next/link";
import { BookOpen, Heart, Bookmark, ArrowLeft } from "lucide-react";
import AppDownloadSection from "@/components/AppDownloadSection";
import Footer from "@/components/Footer";

export const dynamic = 'force-dynamic';

export default function Home() {
  const features = [
    {
      title: "القرآن الكريم",
      description: "اقرأ القرآن الكريم كاملاً مع إمكانية حفظ العلامات المرجعية والآيات المفضلة",
      href: "/quran",
      icon: BookOpen,
      color: "bg-blue-500",
    },
    {
      title: "الأذكار",
      description: "أذكار الصباح والمساء مع عداد للتكرار ومتابعة التقدم",
      href: "/adhkar",
      icon: Heart,
      color: "bg-green-500",
    },
    {
      title: "السبحة الإلكترونية",
      description: "سبحة إلكترونية مع إحصائيات يومية وإجمالية",
      href: "/tasbih",
      icon: Bookmark,
      color: "bg-purple-500",
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <div className="relative text-center py-20 px-4 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-200 dark:bg-primary-900/20 rounded-full blur-3xl opacity-30"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary-200 dark:bg-secondary-900/20 rounded-full blur-3xl opacity-30"></div>
        </div>
        
        <div className="relative animate-fadeIn">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 text-gradient animate-scaleIn">
            آيات
          </h1>
          <p className="text-2xl md:text-3xl text-gray-700 dark:text-gray-200 mb-10 font-light animate-slideUp">
            موقع إسلامي متكامل للقرآن الكريم والأذكار
          </p>
          <div className="flex justify-center items-center gap-4 flex-wrap animate-slideUp">
            <Link
              href="/quran"
              className="btn-primary text-lg px-8 py-4"
            >
              ابدأ القراءة
            </Link>
            <Link
              href="/adhkar"
              className="btn-secondary text-lg px-8 py-4"
            >
              الأذكار
            </Link>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 px-4">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <Link
              key={feature.href}
              href={feature.href}
              className="card-hover group animate-slideUp"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`${feature.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg`}>
                <Icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                {feature.description}
              </p>
              <div className="flex items-center text-primary-600 dark:text-primary-400 font-semibold group-hover:gap-2 transition-all">
                <span>اكتشف المزيد</span>
                <ArrowLeft className="h-5 w-5 mr-2 rtl:mr-0 rtl:ml-2 group-hover:translate-x-[-4px] rtl:group-hover:translate-x-[4px] transition-transform" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Quick Stats */}
      <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 px-4">
        {[
          { number: "114", label: "سورة", gradient: "from-primary-500 to-primary-600" },
          { number: "6236", label: "آية", gradient: "from-secondary-500 to-secondary-600" },
          { number: "30", label: "جزء", gradient: "from-gold-500 to-gold-600" },
          { number: "604", label: "صفحة", gradient: "from-purple-500 to-purple-600" },
        ].map((stat, index) => (
          <div
            key={index}
            className="card text-center animate-scaleIn"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className={`text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
              {stat.number}
            </div>
            <div className="text-gray-600 dark:text-gray-300 font-medium">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* App Download Section */}
      <AppDownloadSection />

      {/* Footer */}
      <Footer />
    </>
  );
}
