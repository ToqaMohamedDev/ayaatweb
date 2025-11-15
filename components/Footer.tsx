"use client";

import { motion } from "framer-motion";
import { MessageCircle, Facebook, Instagram, Youtube } from "lucide-react";
import Link from "next/link";

// TikTok Icon Component
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

const iconHover = {
  scale: 1.15,
  rotate: [0, -5, 5, -5, 0],
  transition: {
    duration: 0.4,
  },
};

const socialLinks = [
  {
    name: "TikTok",
    icon: TikTokIcon,
    href: "https://tiktok.com/@username",
    hoverColor: "#000000",
    bgGradient: "from-gray-900 to-black",
  },
  {
    name: "WhatsApp",
    icon: MessageCircle,
    href: "https://wa.me/201234567890",
    hoverColor: "#25D366",
    bgGradient: "from-green-500 to-emerald-600",
  },
  {
    name: "Facebook",
    icon: Facebook,
    href: "https://facebook.com/yourpage",
    hoverColor: "#1877F2",
    bgGradient: "from-blue-600 to-blue-700",
  },
  {
    name: "Instagram",
    icon: Instagram,
    href: "https://instagram.com/username",
    hoverColor: "gradient",
    bgGradient: "from-purple-600 via-pink-600 to-orange-500",
  },
  {
    name: "YouTube",
    icon: Youtube,
    href: "https://youtube.com/@channel",
    hoverColor: "#FF0000",
    bgGradient: "from-red-600 to-red-700",
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary-500/5 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <h3 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary-400 via-primary-300 to-primary-400 bg-clip-text text-transparent">
              AlaaTaha
            </h3>
            <p className="text-gray-400 text-lg leading-relaxed">
              موقع إسلامي متكامل للقرآن الكريم والأذكار والسبحة الإلكترونية
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-4"
          >
            <h4 className="text-xl font-bold text-white mb-4">روابط سريعة</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/quran" className="text-gray-400 hover:text-primary-400 transition-colors duration-200">
                  القرآن الكريم
                </Link>
              </li>
              <li>
                <Link href="/adhkar" className="text-gray-400 hover:text-primary-400 transition-colors duration-200">
                  الأذكار
                </Link>
              </li>
              <li>
                <Link href="/tasbih" className="text-gray-400 hover:text-primary-400 transition-colors duration-200">
                  السبحة الإلكترونية
                </Link>
              </li>
              <li>
                <Link href="/bookmarks" className="text-gray-400 hover:text-primary-400 transition-colors duration-200">
                  العلامات المرجعية
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Social Media */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            <h4 className="text-xl font-bold text-white mb-4">تابعنا</h4>
            <div className="flex items-center gap-4 flex-wrap">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                const isGradient = social.hoverColor === "gradient";

                return (
                  <motion.div
                    key={social.name}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                    whileHover={iconHover}
                  >
                    <Link
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative group block"
                      aria-label={social.name}
                    >
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${social.bgGradient} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                        <Icon className="h-7 w-7 text-white" />
                      </div>
                      {/* Glow Effect on Hover */}
                      <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${social.bgGradient} opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-300 -z-10`}></div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-8"></div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <p className="text-gray-500 text-sm">
            © {currentYear} <span className="text-primary-400 font-semibold">AlaaTaha</span>. جميع الحقوق محفوظة
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
