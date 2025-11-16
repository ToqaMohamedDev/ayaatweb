"use client";

import { Download, Apple } from "lucide-react";
import Link from "next/link";

export default function AppStoreSection() {
  return (
    <section className="py-[60px] px-4 relative overflow-hidden bg-gradient-to-br from-white via-[#F7FDFB] to-white dark:bg-[#0E1412]">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#16A34A]/5 dark:bg-[#30D09A]/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#16A34A]/5 dark:bg-[#30D09A]/10 rounded-full blur-3xl"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Visual */}
          <div className="relative order-2 lg:order-1">
            <div className="relative mx-auto w-64 h-[500px] bg-gradient-to-br from-gray-900 to-black rounded-[3rem] p-3 shadow-2xl">
              <div className="w-full h-full bg-gradient-to-br from-[#F7FDFB] to-white dark:from-[#141D1B] dark:to-[#0E1412] rounded-[2.5rem] overflow-hidden relative">
                {/* Screen Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 space-y-4">
                  <div className="w-20 h-20 rounded-2xl bg-[#16A34A] dark:bg-[#30D09A] flex items-center justify-center shadow-lg">
                    <Apple className="h-10 w-10 text-white" fill="white" />
                  </div>
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-[#0F172A] dark:text-[#ECFDF5] mb-2">آيات</h3>
                    <p className="text-sm text-[#64748B] dark:text-[#ECFDF5]/60">تطبيق القرآن والأذكار</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="text-center lg:text-left space-y-6 order-1 lg:order-2">
            <div className="inline-flex items-center justify-center lg:justify-start gap-3 mb-4">
              <div className="w-16 h-16 rounded-2xl bg-[#16A34A] dark:bg-[#30D09A] flex items-center justify-center shadow-xl">
                <Apple className="h-8 w-8 text-white" fill="white" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-[#0F172A] dark:text-[#ECFDF5]">
                حمّل على
                <span className="block text-[#16A34A] dark:text-[#30D09A]">
                  App Store
                </span>
              </h2>
            </div>
            
            <p className="text-xl text-[#334155] dark:text-[#ECFDF5]/80 leading-relaxed">
              استمتع بتجربة القرآن الكريم والأذكار على هاتفك الآيفون
            </p>
            
            <p className="text-lg text-[#64748B] dark:text-[#ECFDF5]/60">
              تطبيق شامل ومتكامل مع جميع الميزات المتاحة على الموقع
            </p>

            <Link
              href="https://apps.apple.com/eg/app/%D8%A2%D9%8A%D9%80%D9%80%D9%80%D9%80%D9%80%D9%80%D8%A7%D8%AA/id6744568865?l=ar"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-4 px-8 py-5 bg-[#16A34A] dark:bg-[#30D09A] text-white rounded-2xl font-bold text-lg shadow-2xl hover:shadow-[#16A34A]/50 dark:hover:shadow-[#30D09A]/50 transition-all duration-200 hover:scale-105 active:scale-95"
            >
              <Download className="h-6 w-6" />
              <span>التحميل من App Store</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
