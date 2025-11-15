"use client";

import Link from "next/link";
import { BookOpen, Heart, Bookmark, ArrowLeft, Sparkles, Star, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import GooglePlaySection from "@/components/GooglePlaySection";
import AppStoreSection from "@/components/AppStoreSection";
import Footer from "@/components/Footer";

export const dynamic = 'force-dynamic';

export default function Home() {
  const features = [
    {
      title: "القرآن الكريم",
      description: "اقرأ القرآن الكريم كاملاً مع إمكانية حفظ العلامات المرجعية والآيات المفضلة",
      href: "/quran",
      icon: BookOpen,
      gradient: "from-blue-500 via-blue-600 to-indigo-600",
      bgGradient: "from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20",
    },
    {
      title: "الأذكار",
      description: "أذكار الصباح والمساء مع عداد للتكرار ومتابعة التقدم",
      href: "/adhkar",
      icon: Heart,
      gradient: "from-green-500 via-emerald-500 to-teal-500",
      bgGradient: "from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20",
    },
    {
      title: "السبحة الإلكترونية",
      description: "سبحة إلكترونية مع إحصائيات يومية وإجمالية",
      href: "/tasbih",
      icon: Bookmark,
      gradient: "from-purple-500 via-purple-600 to-pink-500",
      bgGradient: "from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20",
    },
  ];

  const stats = [
    { number: "114", label: "سورة", gradient: "from-primary-500 to-primary-600", icon: BookOpen },
    { number: "6236", label: "آية", gradient: "from-secondary-500 to-secondary-600", icon: Star },
    { number: "30", label: "جزء", gradient: "from-gold-500 to-gold-600", icon: TrendingUp },
    { number: "604", label: "صفحة", gradient: "from-purple-500 to-purple-600", icon: Sparkles },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"></div>
        
        {/* Animated Background Elements */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary-300/30 dark:bg-primary-700/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-secondary-300/30 dark:bg-secondary-700/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-200/20 dark:bg-primary-800/10 rounded-full blur-3xl"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Main Title */}
            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-7xl md:text-9xl font-bold mb-6"
            >
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-600 via-primary-500 to-secondary-500">
                آيات
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-2xl md:text-4xl text-gray-700 dark:text-gray-200 font-light max-w-3xl mx-auto leading-relaxed"
            >
              موقع إسلامي متكامل للقرآن الكريم والأذكار والسبحة الإلكترونية
            </motion.p>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
            >
              استمتع بتجربة رائعة مع القرآن الكريم والأذكار في مكان واحد
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex justify-center items-center gap-6 flex-wrap pt-6"
            >
              <Link href="/quran">
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-10 py-5 bg-gradient-to-r from-primary-600 to-primary-500 text-white rounded-2xl font-bold text-lg shadow-2xl hover:shadow-primary-500/50 transition-all duration-300"
                >
                  ابدأ القراءة
                </motion.div>
              </Link>
              <Link href="/adhkar">
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-10 py-5 bg-white dark:bg-gray-800 text-primary-600 dark:text-primary-400 rounded-2xl font-bold text-lg border-2 border-primary-200 dark:border-primary-700 shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  الأذكار
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"></div>

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              الميزات الرئيسية
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              اكتشف جميع الميزات المتاحة في موقع آيات
            </p>
          </motion.div>

          {/* Features Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.href}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                >
                  <Link href={feature.href} className="block h-full">
                    <div className={`relative h-full bg-gradient-to-br ${feature.bgGradient} rounded-3xl p-8 border border-gray-200/50 dark:border-gray-700/50 shadow-xl hover:shadow-2xl transition-all duration-300 group overflow-hidden`}>
                      {/* Background Gradient Overlay */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                      
                      {/* Icon */}
                      <div className="relative mb-6">
                        <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                          <Icon className="h-10 w-10 text-white" />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="relative">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                          {feature.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                          {feature.description}
                        </p>
                        
                        {/* Arrow */}
                        <div className="flex items-center text-primary-600 dark:text-primary-400 font-semibold group-hover:gap-3 transition-all">
                          <span>اكتشف المزيد</span>
                          <ArrowLeft className="h-5 w-5 group-hover:translate-x-[-8px] rtl:group-hover:translate-x-[8px] transition-transform" />
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

      {/* Quick Stats */}
      <section className="py-20 px-4 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-secondary-50 to-primary-100 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800"></div>
        
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-200/20 dark:bg-primary-900/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary-200/20 dark:bg-secondary-900/10 rounded-full blur-3xl"></div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="relative"
                >
                  <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 text-center border border-gray-200/50 dark:border-gray-700/50 shadow-xl hover:shadow-2xl transition-all duration-300 group">
                    {/* Icon */}
                    <div className="mb-4 flex justify-center">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                    </div>
                    
                    {/* Number */}
                    <div className={`text-5xl md:text-6xl font-bold mb-3 bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                      {stat.number}
                    </div>
                    
                    {/* Label */}
                    <div className="text-gray-600 dark:text-gray-300 font-semibold text-lg">
                      {stat.label}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Google Play Section */}
      <GooglePlaySection />

      {/* App Store Section */}
      <AppStoreSection />

      {/* Footer */}
      <Footer />
    </div>
  );
}
