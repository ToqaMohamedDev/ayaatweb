"use client";

import { motion } from "framer-motion";
import { Download, Apple, Smartphone } from "lucide-react";
import Link from "next/link";

export default function AppStoreSection() {
  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-slate-50 to-zinc-50 dark:from-black dark:via-gray-900 dark:to-gray-800"></div>
      
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gray-200/30 dark:bg-gray-800/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-slate-200/30 dark:bg-slate-800/30 rounded-full blur-3xl"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Visual */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative">
              {/* Phone Mockup */}
              <div className="relative mx-auto w-64 h-[500px] bg-gradient-to-br from-gray-900 to-black rounded-[3rem] p-3 shadow-2xl">
                <div className="w-full h-full bg-gradient-to-br from-gray-100 to-white dark:from-gray-800 dark:to-gray-700 rounded-[2.5rem] overflow-hidden relative">
                  {/* Screen Content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 space-y-4">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-gray-800 to-black flex items-center justify-center shadow-lg">
                      <Apple className="h-10 w-10 text-white" fill="white" />
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
                className="absolute -top-8 -left-8 w-16 h-16 bg-gray-400/20 rounded-full blur-xl"
              />
              <motion.div
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-8 -right-8 w-20 h-20 bg-slate-400/20 rounded-full blur-xl"
              />
            </div>
          </motion.div>

          {/* Right Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center lg:text-left space-y-6 order-1 lg:order-2"
          >
            <div className="inline-flex items-center justify-center lg:justify-start gap-3 mb-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gray-800 to-black flex items-center justify-center shadow-xl">
                <Apple className="h-8 w-8 text-white" fill="white" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
              حمّل على
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-gray-700 to-gray-900 dark:from-gray-300 dark:to-white">
                App Store
              </span>
            </h2>
            </div>
            
            <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
              استمتع بتجربة القرآن الكريم والأذكار على هاتفك الآيفون
            </p>
            
            <p className="text-lg text-gray-600 dark:text-gray-400">
              تطبيق شامل ومتكامل مع جميع الميزات المتاحة على الموقع
            </p>

            <Link
              href="https://apps.apple.com/eg/app/%D8%A2%D9%8A%D9%80%D9%80%D9%80%D9%80%D9%80%D9%80%D8%A7%D8%AA/id6744568865?l=ar"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-4 px-8 py-5 bg-gradient-to-r from-gray-900 to-black text-white rounded-2xl font-bold text-lg shadow-2xl hover:shadow-gray-900/50 transition-all duration-300"
              >
                <Download className="h-6 w-6" />
                <span>التحميل من App Store</span>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

