"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Heart, Bookmark, Sun, Moon, Menu, X } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const pathname = usePathname();
  const { settings, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { href: "/", label: "الرئيسية", icon: BookOpen },
    { href: "/quran", label: "القرآن الكريم", icon: BookOpen },
    { href: "/adhkar", label: "الأذكار", icon: Heart },
    { href: "/tasbih", label: "السبحة", icon: Bookmark },
    { href: "/bookmarks", label: "العلامات", icon: Bookmark },
    { href: "/favorites", label: "المفضلة", icon: Heart },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-[#0E1412]/80 backdrop-blur-xl border-b border-[#16A34A]/10 dark:border-[#30D09A]/10 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 rounded-xl blur opacity-50 group-hover:opacity-75 transition-opacity" style={{ background: 'linear-gradient(135deg, #16A34A 0%, #15803d 100%)' }}></div>
              <div className="relative p-2 rounded-xl shadow-lg" style={{ background: 'linear-gradient(135deg, #16A34A 0%, #15803d 100%)' }}>
                <BookOpen className="h-6 w-6 text-white" />
              </div>
            </div>
            <span className="text-2xl font-bold text-[#0F172A] dark:text-[#ECFDF5]">
              آيات
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || 
                (item.href !== "/" && pathname?.startsWith(item.href));
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all duration-200 ${
                    isActive
                      ? "text-[#16A34A] dark:text-[#30D09A]"
                      : "text-[#334155] dark:text-[#ECFDF5]/60 hover:bg-[#F7FDFB] dark:hover:bg-[#141D1B]"
                  }`}
                >
                  <Icon className={`h-5 w-5 ${isActive ? 'text-[#16A34A] dark:text-[#30D09A]' : ''}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
            
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl text-[#334155] dark:text-[#ECFDF5]/60 hover:bg-[#F7FDFB] dark:hover:bg-[#141D1B] transition-all duration-200"
              aria-label="Toggle theme"
            >
              {settings.theme === "light" ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl text-[#334155] dark:text-[#ECFDF5]/60 hover:bg-[#F7FDFB] dark:hover:bg-[#141D1B] transition-all"
              aria-label="Toggle theme"
            >
              {settings.theme === "light" ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl text-[#334155] dark:text-[#ECFDF5]/60 hover:bg-[#F7FDFB] dark:hover:bg-[#141D1B] transition-all"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden py-4 border-t border-[#16A34A]/10 dark:border-[#30D09A]/10 overflow-hidden"
            >
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href || 
                  (item.href !== "/" && pathname?.startsWith(item.href));
                
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl mb-2 transition-all duration-200 ${
                      isActive
                        ? "text-[#16A34A] dark:text-[#30D09A] bg-[#F7FDFB] dark:bg-[#141D1B]"
                        : "text-[#334155] dark:text-[#ECFDF5]/60 hover:bg-[#F7FDFB] dark:hover:bg-[#141D1B]"
                    }`}
                  >
                    <Icon className={`h-5 w-5 ${isActive ? 'text-[#16A34A] dark:text-[#30D09A]' : ''}`} />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
