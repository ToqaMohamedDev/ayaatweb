"use client";

import { motion } from "framer-motion";
import { Smartphone, Download, Play, Apple } from "lucide-react";
import Link from "next/link";

const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.3,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const buttonHover = {
  scale: 1.05,
  boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
  transition: {
    duration: 0.3,
  },
};

export default function AppDownloadSection() {
  return (
    <section className="py-16 px-4 bg-gradient-to-br from-primary-50 via-secondary-50 to-primary-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 opacity-100"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
            حمّل التطبيق الآن
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            استمتع بتجربة القرآن والأذكار على هاتفك
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Google Play Store */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="card-hover group opacity-100"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <Play className="h-8 w-8 text-white" fill="white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                  حمّل التطبيق على أندرويد
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  استمتع بتجربة القرآن والأذكار على هاتفك
                </p>
              </div>
            </div>

            <Link
              href="https://play.google.com/store/apps/details?id=com.ayatATDEV.QuranApp"
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <motion.div
                whileHover={buttonHover}
                whileTap={{ scale: 0.95 }}
                className="w-full py-4 px-6 rounded-xl font-bold text-lg text-white flex items-center justify-center gap-3 shadow-lg"
                style={{ backgroundColor: "#34A853" }}
                aria-label="تحميل من Google Play"
              >
                <Download className="h-6 w-6" />
                <span>التحميل من Google Play</span>
              </motion.div>
            </Link>
          </motion.div>

          {/* Apple App Store */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="card-hover group opacity-100"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <Apple className="h-8 w-8 text-white" fill="white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                  حمّل التطبيق على آيفون
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  متوفر الآن على App Store
                </p>
              </div>
            </div>

            <Link
              href="https://apps.apple.com/eg/app/%D8%A2%D9%8A%D9%80%D9%80%D9%80%D9%80%D9%80%D9%80%D8%A7%D8%AA/id6744568865?l=ar"
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <motion.div
                whileHover={buttonHover}
                whileTap={{ scale: 0.95 }}
                className="w-full py-4 px-6 rounded-xl font-bold text-lg text-white flex items-center justify-center gap-3 shadow-lg bg-black dark:bg-gray-900"
                aria-label="تحميل من App Store"
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

