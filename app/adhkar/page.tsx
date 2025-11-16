"use client";

import Link from "next/link";
import { Sunrise, Sunset } from "lucide-react";
import { motion } from "framer-motion";

export const dynamic = 'force-dynamic';

export default function AdhkarPage() {
  const categories = [
    {
      title: "أذكار الصباح",
      description: "أذكار الصباح مع عداد للتكرار ومتابعة التقدم",
      href: "/adhkar/morning",
      icon: Sunrise,
      gradient: "from-[#16A34A] to-[#15803d]",
      bgGradient: "from-[#F7FDFB] to-white dark:from-[#141D1B] dark:to-[#0E1412]",
    },
    {
      title: "أذكار المساء",
      description: "أذكار المساء مع عداد للتكرار ومتابعة التقدم",
      href: "/adhkar/evening",
      icon: Sunset,
      gradient: "from-[#16A34A] to-[#15803d]",
      bgGradient: "from-[#F7FDFB] to-white dark:from-[#141D1B] dark:to-[#0E1412]",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-2xl bg-[#16A34A] dark:bg-[#30D09A] flex items-center justify-center shadow-lg">
            <Sunrise className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-5xl md:text-6xl font-bold mb-2 text-[#0F172A] dark:text-[#ECFDF5]">
              الأذكار
            </h1>
            <p className="text-xl text-[#64748B] dark:text-[#ECFDF5]/60">
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
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Link href={category.href} className="block h-full">
                <div className={`relative h-full bg-white/60 dark:bg-[#141D1B]/60 backdrop-blur-[16px] rounded-[20px] p-8 border border-[#16A34A]/10 dark:border-[#30D09A]/10 shadow-[0_8px_32px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:shadow-[0_12px_48px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_12px_48px_rgba(0,0,0,0.4)] transition-all duration-300 group overflow-hidden`}>
                  {/* Icon */}
                  <div className="relative mb-6">
                    <div className="w-20 h-20 rounded-2xl bg-[#16A34A] dark:bg-[#30D09A] flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-300">
                      <Icon className="h-10 w-10 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative">
                    <h2 className="text-3xl font-bold text-[#0F172A] dark:text-[#ECFDF5] mb-3 group-hover:text-[#16A34A] dark:group-hover:text-[#30D09A] transition-colors">
                      {category.title}
                    </h2>
                    <p className="text-[#64748B] dark:text-[#ECFDF5]/60 leading-relaxed mb-6">
                      {category.description}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
