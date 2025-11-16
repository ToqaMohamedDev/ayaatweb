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
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-white dark:bg-gray-800">
        {/* Animated Gradient Overlay - Only for Hero */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 via-teal-50/30 to-green-50/20 dark:from-emerald-950/30 dark:via-teal-950/20 dark:to-green-950/10"></div>
        
        {/* Animated Orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              x: [0, 100, 0],
              y: [0, 50, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-20 left-10 w-72 h-72 bg-emerald-200/20 dark:bg-emerald-900/15 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              x: [0, -80, 0],
              y: [0, -60, 0],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute bottom-20 right-10 w-96 h-96 bg-teal-200/20 dark:bg-teal-900/15 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              x: [0, 60, 0],
              y: [0, -40, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-1/2 right-1/4 w-64 h-64 bg-green-200/15 dark:bg-green-900/10 rounded-full blur-3xl"
          />
        </div>

        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px] opacity-30"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-24 sm:py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-10"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100/90 dark:bg-emerald-900/40 backdrop-blur-[2px] border border-emerald-200/50 dark:border-emerald-800/50"
            >
              <Sparkles className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
                موقع إسلامي
              </span>
            </motion.div>

            {/* Main Title with Gradient */}
            <motion.h1
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-7xl sm:text-8xl md:text-9xl lg:text-[12rem] font-bold mb-6 leading-none"
            >
              <span className="relative inline-block">
                <span className="absolute inset-0 blur-2xl opacity-30 bg-gradient-to-r from-emerald-400 via-teal-400 to-green-400"></span>
                <span className="relative bg-gradient-to-r from-emerald-600 via-teal-600 to-green-600 dark:from-emerald-400 dark:via-teal-400 dark:to-green-400 bg-clip-text text-transparent">
                  آيـات
                </span>
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-gray-800 dark:text-gray-100 font-light max-w-4xl mx-auto leading-relaxed"
            >
              موقع إسلامي للقرآن الكريم والأذكار والسبحة الإلكترونية
            </motion.p>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-light"
            >
              تجربة هادئة ومريحة للقراءة والتأمل في كلمات الله تعالى
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex justify-center items-center gap-6 flex-wrap pt-12"
            >
              <Link href="/quran">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative px-10 py-5 bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-500 dark:to-teal-500 text-white rounded-2xl font-semibold text-lg shadow-2xl hover:shadow-emerald-500/50 transition-all duration-300 overflow-hidden"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  <span className="relative flex items-center gap-2">
                    ابدأ القراءة
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-[-4px] rtl:group-hover:translate-x-[4px] transition-transform" />
                  </span>
                </motion.button>
              </Link>
              <Link href="/adhkar">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="group px-10 py-5 bg-white/95 dark:bg-gray-800/95 backdrop-blur-[4px] text-emerald-600 dark:text-emerald-400 rounded-2xl font-semibold text-lg border-2 border-emerald-200 dark:border-emerald-800 shadow-xl hover:shadow-2xl hover:border-emerald-300 dark:hover:border-emerald-700 transition-all duration-200"
                >
                  <span className="flex items-center gap-2">
                    الأذكار
                    <Heart className="h-5 w-5 group-hover:scale-110 transition-transform" />
                  </span>
                </motion.button>
              </Link>
            </motion.div>

            {/* Stats Preview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="flex justify-center items-center gap-8 pt-8 flex-wrap"
            >
              {stats.slice(0, 4).map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-[2px] border border-emerald-100 dark:border-emerald-900/50"
                  >
                    <Icon className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                    <span className="text-lg font-bold text-gray-800 dark:text-gray-200">{stat.number}</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</span>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-emerald-300 dark:border-emerald-700 flex items-start justify-center p-2"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section - Premium Cards */}
      <section className="py-[60px] px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-white dark:bg-gray-800">
        {/* Background decorative elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/5 dark:bg-emerald-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500/5 dark:bg-teal-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#0F172A] dark:text-[#ECFDF5] mb-4">
              الميزات
            </h2>
            <p className="text-lg sm:text-xl text-[#64748B] dark:text-[#ECFDF5]/60 max-w-2xl mx-auto">
              كل ما تحتاجه في مكان واحد
            </p>
          </motion.div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.href}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                >
                  <Link href={feature.href} className="block group h-full">
                    <div className="relative h-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-[2px] rounded-3xl p-8 border border-gray-200/50 dark:border-gray-700/50 overflow-hidden transition-all duration-300 hover:border-emerald-500/50 dark:hover:border-emerald-400/50 hover:shadow-2xl hover:shadow-emerald-500/10 dark:hover:shadow-emerald-500/20">
                      
                      {/* Animated gradient background */}
                      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      
                      {/* Glowing orb effect */}
                      <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-all duration-700"></div>

                      {/* Icon Container */}
                      <div className="relative mb-8">
                        <motion.div 
                          className="relative inline-block"
                          whileHover={{ scale: 1.05 }}
                          transition={{ type: "spring", stiffness: 400 }}
                        >
                          {/* Icon glow */}
                          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl blur-xl opacity-40 group-hover:opacity-60 transition-opacity duration-300"></div>
                          
                          {/* Icon background */}
                          <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 dark:from-emerald-400 dark:to-teal-500 flex items-center justify-center shadow-lg">
                            <Icon className="h-10 w-10 text-white" strokeWidth={2} />
                          </div>
                        </motion.div>
                      </div>

                      {/* Content */}
                      <div className="relative">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300">
                          {feature.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-300">
                          {feature.description}
                        </p>

                        {/* Action button */}
                        <div className="flex items-center gap-3 text-emerald-600 dark:text-emerald-400 font-medium group-hover:gap-5 transition-all duration-300">
                          <span>اكتشف المزيد</span>
                          <motion.div
                            animate={{ x: [0, 5, 0] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                          >
                            <ArrowRight className="h-5 w-5 rotate-180" />
                          </motion.div>
                        </div>
                      </div>

                      {/* Bottom accent line */}
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-[60px] px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-white dark:bg-gray-800">

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
                  <div className="bg-white/80 dark:bg-[#141D1B]/80 backdrop-blur-[4px] rounded-[20px] p-6 sm:p-8 border border-[#16A34A]/10 dark:border-[#30D09A]/10 shadow-[0_8px_32px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
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

      {/* App Download Section - Premium Style */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-white dark:bg-gray-800">

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
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
                  rotate: [0, 3, -3, 0],
                  y: [0, -15, 0]
                }}
                transition={{ 
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="relative z-10"
              >
                <div className="relative">
                  {/* Phone Frame */}
                  <div className="w-[300px] sm:w-[340px] h-[600px] sm:h-[680px] bg-gradient-to-br from-gray-800 to-gray-900 rounded-[3.5rem] p-[6px] shadow-2xl max-w-full">
                    {/* Screen Bezel */}
                    <div className="w-full h-full bg-gray-900 rounded-[3rem] p-1">
                      {/* Screen */}
                      <div className="w-full h-full bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 rounded-[2.8rem] overflow-hidden relative">
                        {/* Status Bar */}
                        <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-gray-100 to-transparent dark:from-gray-800 dark:to-transparent flex items-center justify-between px-6 pt-2">
                          <div className="text-xs font-semibold text-gray-900 dark:text-white">9:41</div>
                          <div className="flex gap-1">
                            <div className="w-1 h-1 rounded-full bg-gray-900 dark:bg-white"></div>
                            <div className="w-1 h-1 rounded-full bg-gray-900 dark:bg-white"></div>
                            <div className="w-1 h-1 rounded-full bg-gray-900 dark:bg-white"></div>
                          </div>
                        </div>
                        
                        {/* App Content */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-8 space-y-8 mt-12">
                          {/* App Icon with Glow */}
                          <motion.div
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ duration: 3, repeat: Infinity }}
                            className="relative"
                          >
                            <div className="absolute inset-0 bg-emerald-500/30 dark:bg-emerald-400/30 rounded-3xl blur-2xl scale-150"></div>
                            <div className="relative w-24 h-24 rounded-3xl bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-600 dark:from-emerald-400 dark:via-emerald-500 dark:to-teal-500 flex items-center justify-center shadow-2xl">
                              <BookOpen className="h-12 w-12 text-white" />
                            </div>
                          </motion.div>
                          
                          {/* App Name */}
                          <div className="text-center space-y-2">
                            <h3 className="text-4xl font-bold text-gray-900 dark:text-white">آيـات</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">تطبيق القرآن والأذكار</p>
                          </div>
                          
                          {/* Decorative Elements */}
                          <div className="flex gap-2 mt-4">
                            <div className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400"></div>
                            <div className="w-2 h-2 rounded-full bg-teal-500 dark:bg-teal-400"></div>
                            <div className="w-2 h-2 rounded-full bg-green-500 dark:bg-green-400"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Home Indicator */}
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gray-900 dark:bg-white rounded-full opacity-20"></div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right: Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-right space-y-10"
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100/90 dark:bg-emerald-900/40 backdrop-blur-[2px] border border-emerald-200/50 dark:border-emerald-800/50"
              >
                <Sparkles className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
                  متوفر الآن
                </span>
              </motion.div>

              <div className="space-y-6">
                <h2 className="text-5xl sm:text-6xl md:text-7xl font-bold bg-gradient-to-r from-gray-900 via-emerald-700 to-teal-700 dark:from-white dark:via-emerald-400 dark:to-teal-400 bg-clip-text text-transparent">
                  حمّل التطبيق
                </h2>
                <p className="text-xl sm:text-2xl text-gray-700 dark:text-gray-300 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                  استمتع بتجربة القرآن الكريم والأذكار على هاتفك المحمول
                </p>
                <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-lg mx-auto lg:mx-0">
                  تطبيق شامل ومتكامل مع جميع الميزات المتاحة على الموقع
                </p>
              </div>

              {/* App Store Badges - Enhanced */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-end gap-6 pt-6">
                <motion.a
                  href="https://apps.apple.com/eg/app/%D8%A2%D9%8A%D9%80%D9%80%D9%80%D9%80%D9%80%D9%80%D8%A7%D8%AA/id6744568865?l=ar"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative inline-block w-full sm:w-auto"
                >
                  <div className="absolute inset-0 bg-emerald-500/30 rounded-2xl blur-xl group-hover:blur-2xl transition-all opacity-0 group-hover:opacity-100"></div>
                  <div className="relative bg-white dark:bg-gray-900 rounded-2xl p-4 shadow-2xl hover:shadow-emerald-500/20 dark:hover:shadow-emerald-500/40 border-2 border-emerald-500 dark:border-emerald-400 transition-all group-hover:border-emerald-600 dark:group-hover:border-emerald-300 flex items-center justify-center min-w-[200px]">
                    <img
                      src="https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/ar-ar?size=250x83&releaseDate=1704067200"
                      alt="Download on the App Store"
                      className="h-14 w-auto"
                    />
                  </div>
                </motion.a>
                
                <motion.a
                  href="https://play.google.com/store/apps/details?id=com.ayatATDEV.QuranApp"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative inline-block w-full sm:w-auto"
                >
                  <div className="absolute inset-0 bg-emerald-500/30 rounded-2xl blur-xl group-hover:blur-2xl transition-all opacity-0 group-hover:opacity-100"></div>
                  <div className="relative bg-white dark:bg-gray-900 rounded-2xl p-4 shadow-2xl hover:shadow-emerald-500/20 dark:hover:shadow-emerald-500/40 border-2 border-emerald-500 dark:border-emerald-400 transition-all group-hover:border-emerald-600 dark:group-hover:border-emerald-300 flex items-center justify-center min-w-[200px]">
                    <img
                      src="https://play.google.com/intl/en_us/badges/static/images/badges/ar_badge_web_generic.png"
                      alt="Get it on Google Play"
                      className="h-14 w-auto"
                    />
                  </div>
                </motion.a>
              </div>

              {/* Features List */}
              <div className="grid grid-cols-2 gap-4 pt-8">
                {[
                  { icon: BookOpen, text: "القرآن الكريم" },
                  { icon: Heart, text: "الأذكار" },
                  { icon: Bookmark, text: "السبحة" },
                  { icon: Star, text: "مميزات متعددة" }
                ].map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-center gap-3 justify-center lg:justify-end p-3 rounded-xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-[2px] border border-emerald-100 dark:border-emerald-900/50"
                    >
                      <Icon className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{item.text}</span>
                    </motion.div>
                  );
                })}
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
