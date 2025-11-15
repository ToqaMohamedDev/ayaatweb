"use client";

import { motion } from "framer-motion";
import { Download, Play, Smartphone } from "lucide-react";
import Link from "next/link";

export default function GooglePlaySection() {
  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"></div>
      
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-green-200/30 dark:bg-green-900/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-200/30 dark:bg-emerald-900/20 rounded-full blur-3xl"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-right space-y-6"
          >
            <div className="inline-flex items-center justify-center lg:justify-end gap-3 mb-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-xl">
                <Play className="h-8 w-8 text-white" fill="white" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
              حمّل على
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">
                Google Play
              </span>
            </h2>
            </div>
            
            <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
              استمتع بتجربة القرآن الكريم والأذكار على هاتفك الأندرويد
            </p>
            
            <p className="text-lg text-gray-600 dark:text-gray-400">
              تطبيق شامل ومتكامل مع جميع الميزات المتاحة على الموقع
            </p>

            <Link
              href="https://play.google.com/store/apps/details?id=com.ayatATDEV.QuranApp"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-4 px-8 py-5 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-2xl font-bold text-lg shadow-2xl hover:shadow-green-500/50 transition-all duration-300"
              >
                <Download className="h-6 w-6" />
                <span>التحميل من Google Play</span>
              </motion.div>
            </Link>
          </motion.div>

          {/* Right Side - Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative">
              {/* Phone Mockup */}
              <div className="relative mx-auto w-64 h-[500px] bg-gradient-to-br from-gray-800 to-gray-900 rounded-[3rem] p-3 shadow-2xl">
                <div className="w-full h-full bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-700 rounded-[2.5rem] overflow-hidden relative">
                  {/* Screen Content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 space-y-4">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg">
                      <Play className="h-10 w-10 text-white" fill="white" />
                    </div>
                    <div className="text-center">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">آيات</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">تطبيق القرآن والأذكار</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating Elements */}
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-8 -right-8 w-16 h-16 bg-green-400/20 rounded-full blur-xl"
              />
              <motion.div
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-8 -left-8 w-20 h-20 bg-emerald-400/20 rounded-full blur-xl"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

