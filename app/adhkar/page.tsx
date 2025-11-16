"use client";

import Link from "next/link";
import { Sunrise, Sunset, ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export const dynamic = 'force-dynamic';

export default function AdhkarPage() {
  const categories = [
    {
      title: "أذكار الصباح",
      description: "أذكار الصباح مع عداد للتكرار ومتابعة التقدم",
      href: "/adhkar/morning",
      icon: Sunrise,
      gradient: "from-amber-500 to-orange-600",
    },
    {
      title: "أذكار المساء",
      description: "أذكار المساء مع عداد للتكرار ومتابعة التقدم",
      href: "/adhkar/evening",
      icon: Sunset,
      gradient: "from-violet-500 to-purple-600",
    },
  ];

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/5 dark:bg-emerald-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500/5 dark:bg-teal-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 pt-8"
        >
          <div className="flex items-center gap-4 mb-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl blur-xl opacity-40"></div>
              <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 dark:from-emerald-400 dark:to-teal-500 flex items-center justify-center shadow-lg">
                <Sparkles className="h-8 w-8 text-white" strokeWidth={2} />
              </div>
            </motion.div>
            <div>
              <h1 className="text-5xl md:text-6xl font-bold mb-2 bg-gradient-to-r from-emerald-600 via-teal-600 to-green-600 dark:from-emerald-400 dark:via-teal-400 dark:to-green-400 bg-clip-text text-transparent">
                الأذكار
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                اختر نوع الأذكار للبدء
              </p>
            </div>
          </div>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.href}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-150px" }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
              >
                <Link href={category.href} className="block group h-full">
                  <div className="relative h-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-200/50 dark:border-gray-700/50 overflow-hidden transition-all duration-500 hover:border-emerald-500/50 dark:hover:border-emerald-400/50 hover:shadow-2xl hover:shadow-emerald-500/10 dark:hover:shadow-emerald-500/20">
                    
                    {/* Animated gradient background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    {/* Glowing orb effect */}
                    <div className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br ${category.gradient} rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-all duration-700`}></div>

                    {/* Icon Container */}
                    <div className="relative mb-8">
                      <motion.div 
                        className="relative inline-block"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        {/* Icon glow */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} rounded-2xl blur-xl opacity-40 group-hover:opacity-60 transition-opacity duration-300`}></div>
                        
                        {/* Icon background */}
                        <div className={`relative w-20 h-20 rounded-2xl bg-gradient-to-br ${category.gradient} flex items-center justify-center shadow-lg`}>
                          <Icon className="h-10 w-10 text-white" strokeWidth={2} />
                        </div>
                      </motion.div>
                    </div>

                    {/* Content */}
                    <div className="relative">
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300">
                        {category.title}
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-300">
                        {category.description}
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
    </div>
  );
}
