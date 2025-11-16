"use client";

import Link from "next/link";
import { BookOpen, Heart, Bookmark, ArrowRight, Sparkles, Star, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import Footer from "@/components/Footer";

export const dynamic = 'force-dynamic';

export default function Home() {
  const features = [
    {
      title: "القرآن الكريم",
      description: "قراءة كاملة مع تفسير وترجمة",
      href: "/quran",
      icon: BookOpen,
    },
    {
      title: "الأذكار",
      description: "أذكار الصباح والمساء اليومية",
      href: "/adhkar",
      icon: Heart,
    },
    {
      title: "السبحة الإلكترونية",
      description: "تسبيح إلكتروني مع إحصائيات",
      href: "/tasbih",
      icon: Bookmark,
    },
  ];

  const stats = [
    { number: "114", label: "سورة", icon: BookOpen },
    { number: "6236", label: "آية", icon: Star },
    { number: "30", label: "جزء", icon: TrendingUp },
    { number: "604", label: "صفحة", icon: Sparkles },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-24 sm:py-32 flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-white dark:bg-gray-800"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Main Title */}
            <motion.h1
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold mb-6"
            >
              <span className="text-[#0F172A] dark:text-[#ECFDF5]">آيات</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl sm:text-2xl md:text-3xl text-[#334155] dark:text-[#ECFDF5]/80 font-light max-w-3xl mx-auto leading-relaxed"
            >
              موقع إسلامي متكامل للقرآن الكريم والأذكار والسبحة الإلكترونية
            </motion.p>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-base sm:text-lg text-[#64748B] dark:text-[#ECFDF5]/60 max-w-2xl mx-auto"
            >
              تجربة هادئة ومريحة للقراءة والتأمل
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex justify-center items-center gap-4 flex-wrap pt-8"
            >
              <Link href="/quran">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 bg-[#16A34A] dark:bg-[#30D09A] text-white rounded-2xl font-semibold text-base shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  ابدأ القراءة
                </motion.button>
              </Link>
              <Link href="/adhkar">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 bg-white/80 dark:bg-[#141D1B] backdrop-blur-sm text-[#16A34A] dark:text-[#30D09A] rounded-2xl font-semibold text-base border border-[#16A34A]/20 dark:border-[#30D09A]/20 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  الأذكار
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section - Premium Minimal Cards */}
      <section className="py-[60px] px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-white dark:bg-gray-800"></div>

        <div className="relative z-10 max-w-6xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#0F172A] dark:text-[#ECFDF5] mb-4">
              الميزات
            </h2>
            <p className="text-lg sm:text-xl text-[#64748B] dark:text-[#ECFDF5]/60 max-w-2xl mx-auto">
              كل ما تحتاجه في مكان واحد
            </p>
          </motion.div>

          {/* Premium Minimal Cards */}
          <div className="space-y-4">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.href}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Link href={feature.href} className="block group">
                    <div className="relative bg-white/60 dark:bg-[#141D1B]/60 backdrop-blur-[16px] rounded-[20px] p-6 sm:p-8 border border-[#16A34A]/10 dark:border-[#30D09A]/10 shadow-[0_8px_32px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:shadow-[0_12px_48px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_12px_48px_rgba(0,0,0,0.4)] transition-all duration-300">
                      <div className="flex items-center justify-between gap-6">
                        {/* Left: Icon */}
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl border border-[#16A34A]/20 dark:border-[#30D09A]/20 flex items-center justify-center group-hover:border-[#16A34A]/40 dark:group-hover:border-[#30D09A]/40 transition-colors">
                            <Icon className="h-6 w-6 sm:h-7 sm:w-7 text-[#16A34A] dark:text-[#30D09A] stroke-[1.5]" />
                          </div>
                        </div>

                        {/* Center: Content */}
                        <div className="flex-1 text-right">
                          <h3 className="text-xl sm:text-2xl font-bold text-[#0F172A] dark:text-[#ECFDF5] mb-1">
                            {feature.title}
                          </h3>
                          <p className="text-sm sm:text-base text-[#64748B] dark:text-[#ECFDF5]/60">
                            {feature.description}
                          </p>
                        </div>

                        {/* Right: Arrow */}
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 rounded-xl bg-[#16A34A]/5 dark:bg-[#30D09A]/10 flex items-center justify-center group-hover:bg-[#16A34A]/10 dark:group-hover:bg-[#30D09A]/20 transition-colors">
                            <ArrowRight className="h-5 w-5 text-[#16A34A] dark:text-[#30D09A] stroke-[1.5] group-hover:translate-x-[-4px] rtl:group-hover:translate-x-[4px] transition-transform" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-[60px] px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-white dark:bg-gray-800"></div>

        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="bg-white/60 dark:bg-[#141D1B]/60 backdrop-blur-[16px] rounded-[20px] p-6 sm:p-8 border border-[#16A34A]/10 dark:border-[#30D09A]/10 shadow-[0_8px_32px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
                    <div className="mb-4 flex justify-center">
                      <Icon className="h-6 w-6 text-[#16A34A] dark:text-[#30D09A] stroke-[1.5]" />
                    </div>
                    <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#0F172A] dark:text-[#ECFDF5] mb-2">
                      {stat.number}
                    </div>
                    <div className="text-sm sm:text-base text-[#64748B] dark:text-[#ECFDF5]/60 font-medium">
                      {stat.label}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* App Download Section - Apple Premium Style */}
      <section className="py-[60px] px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-white dark:bg-gray-800"></div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: Phone Mockup */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative flex justify-center lg:justify-end"
            >
              {/* Phone Mockup */}
              <motion.div
                animate={{ 
                  rotate: [0, 2, -2, 0],
                  y: [0, -10, 0]
                }}
                transition={{ 
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="relative z-10"
                style={{ transform: 'rotate(15deg)' }}
              >
                <div className="w-[280px] sm:w-[320px] h-[560px] sm:h-[640px] bg-gray-900 rounded-[3rem] p-3 shadow-2xl max-w-full">
                  <div className="w-full h-full bg-white dark:bg-[#0E1412] rounded-[2.5rem] overflow-hidden relative">
                    {/* Screen Content */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-8 space-y-6">
                      <div className="w-20 h-20 rounded-2xl bg-[#16A34A] dark:bg-[#30D09A] flex items-center justify-center shadow-lg">
                        <BookOpen className="h-10 w-10 text-white" />
                      </div>
                      <div className="text-center">
                        <h3 className="text-3xl font-bold text-[#0F172A] dark:text-[#ECFDF5] mb-2">آيات</h3>
                        <p className="text-sm text-[#64748B] dark:text-[#ECFDF5]/60">تطبيق القرآن والأذكار</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right: Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-right space-y-8"
            >
              <div>
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#0F172A] dark:text-[#ECFDF5] mb-4">
                  حمّل التطبيق
                </h2>
                <p className="text-lg sm:text-xl text-[#64748B] dark:text-[#ECFDF5]/60 max-w-xl mx-auto lg:mx-0">
                  استمتع بتجربة القرآن الكريم والأذكار على هاتفك
                </p>
              </div>

              {/* App Store Badges */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-end gap-4 pt-4">
                <a
                  href="https://apps.apple.com/eg/app/%D8%A2%D9%8A%D9%80%D9%80%D9%80%D9%80%D9%80%D9%80%D8%A7%D8%AA/id6744568865?l=ar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block"
                >
                  <img
                    src="https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/ar-ar?size=250x83&releaseDate=1704067200"
                    alt="Download on the App Store"
                    className="h-14 w-auto hover:opacity-80 transition-opacity"
                  />
                </a>
                <a
                  href="https://play.google.com/store/apps/details?id=com.ayatATDEV.QuranApp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block"
                >
                  <img
                    src="https://play.google.com/intl/en_us/badges/static/images/badges/ar_badge_web_generic.png"
                    alt="Get it on Google Play"
                    className="h-14 w-auto hover:opacity-80 transition-opacity"
                  />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
