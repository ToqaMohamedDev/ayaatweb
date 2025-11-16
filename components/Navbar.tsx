"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Heart, Bookmark, Sun, Moon, Menu, X, Home, Sparkles, CircleDot } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const pathname = usePathname();
  const { settings, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { href: "/", label: "الرئيسية", icon: Home },
    { href: "/quran", label: "القرآن الكريم", icon: BookOpen },
    { href: "/adhkar", label: "الأذكار", icon: Sparkles },
    { href: "/tasbih", label: "السبحة", icon: CircleDot },
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
            <motion.button
  onClick={toggleTheme}
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  className="relative w-14 h-8 rounded-full p-1 transition-all duration-300 overflow-hidden"
  style={{
    background: settings.theme === "light" 
      ? "linear-gradient(135deg, #e5e7eb 0%, #d1d5db 100%)"
      : "linear-gradient(135deg, #1f2937 0%, #111827 100%)",
    boxShadow: settings.theme === "light"
      ? "inset 0 2px 4px rgba(0,0,0,0.1), inset 0 -2px 4px rgba(255,255,255,0.8), 0 2px 8px rgba(0,0,0,0.1)"
      : "inset 0 2px 4px rgba(0,0,0,0.5), inset 0 -2px 4px rgba(255,255,255,0.1), 0 2px 8px rgba(0,0,0,0.3)",
  }}
  aria-label="Toggle theme"
>
  {/* Animated Circle */}
  <motion.div
    className="absolute top-1 w-6 h-6 rounded-full flex items-center justify-center"
    initial={false}
    animate={{
      left: settings.theme === "light" ? "4px" : "calc(100% - 28px)",
    }}
    transition={{
      type: "spring",
      stiffness: 500,
      damping: 30,
    }}
    style={{
      background: settings.theme === "light"
        ? "linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)"
        : "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
      boxShadow: settings.theme === "light"
        ? "0 2px 8px rgba(251, 191, 36, 0.4), inset 0 1px 2px rgba(255,255,255,0.3), inset 0 -1px 2px rgba(0,0,0,0.2)"
        : "0 2px 8px rgba(59, 130, 246, 0.4), inset 0 1px 2px rgba(255,255,255,0.2), inset 0 -1px 2px rgba(0,0,0,0.3)",
    }}
  >
    <motion.div
      animate={{
        rotate: settings.theme === "light" ? 0 : 180,
      }}
      transition={{
        duration: 0.3,
      }}
    >
      {settings.theme === "light" ? (
        <Sun className="h-4 w-4 text-white" strokeWidth={2.5} />
      ) : (
        <Moon className="h-4 w-4 text-white" strokeWidth={2.5} />
      )}
    </motion.div>
  </motion.div>
  
  {/* Background gradient overlay */}
  <div 
    className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300"
    style={{
      background: settings.theme === "light"
        ? "linear-gradient(135deg, rgba(255,255,255,0.3) 0%, transparent 100%)"
        : "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 100%)",
    }}
  />
</motion.button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <motion.button
              onClick={toggleTheme}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative w-14 h-8 rounded-full p-1 transition-all duration-300 overflow-hidden"
              style={{
                background: settings.theme === "light" 
                  ? "linear-gradient(135deg, #e5e7eb 0%, #d1d5db 100%)"
                  : "linear-gradient(135deg, #1f2937 0%, #111827 100%)",
                boxShadow: settings.theme === "light"
                  ? "inset 0 2px 4px rgba(0,0,0,0.1), inset 0 -2px 4px rgba(255,255,255,0.8), 0 2px 8px rgba(0,0,0,0.1)"
                  : "inset 0 2px 4px rgba(0,0,0,0.5), inset 0 -2px 4px rgba(255,255,255,0.1), 0 2px 8px rgba(0,0,0,0.3)",
              }}
              aria-label="Toggle theme"
            >
              {/* Animated Circle */}
              <motion.div
                className="absolute top-1 w-6 h-6 rounded-full flex items-center justify-center"
                initial={false}
                animate={{
                  right: settings.theme === "light" ? "4px" : "auto",
                  left: settings.theme === "light" ? "auto" : "4px",
                }}
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 30,
                }}
                style={{
                  background: settings.theme === "light"
                    ? "linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)"
                    : "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
                  boxShadow: settings.theme === "light"
                    ? "0 2px 8px rgba(251, 191, 36, 0.4), inset 0 1px 2px rgba(255,255,255,0.3), inset 0 -1px 2px rgba(0,0,0,0.2)"
                    : "0 2px 8px rgba(59, 130, 246, 0.4), inset 0 1px 2px rgba(255,255,255,0.2), inset 0 -1px 2px rgba(0,0,0,0.3)",
                }}
              >
                <motion.div
                  animate={{
                    rotate: settings.theme === "light" ? 0 : 180,
                  }}
                  transition={{
                    duration: 0.3,
                  }}
                >
                  {settings.theme === "light" ? (
                    <Sun className="h-4 w-4 text-white" strokeWidth={2.5} />
                  ) : (
                    <Moon className="h-4 w-4 text-white" strokeWidth={2.5} />
                  )}
                </motion.div>
              </motion.div>
              
              {/* Background gradient overlay */}
              <div 
                className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: settings.theme === "light"
                    ? "linear-gradient(135deg, rgba(255,255,255,0.3) 0%, transparent 100%)"
                    : "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 100%)",
                }}
              />
            </motion.button>
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
