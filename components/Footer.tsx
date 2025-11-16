"use client";

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

const socialLinks = [
  {
    name: "TikTok",
    icon: TikTokIcon,
    href: "https://tiktok.com/@username",
  },
  {
    name: "WhatsApp",
    icon: MessageCircle,
    href: "https://wa.me/201234567890",
  },
  {
    name: "Facebook",
    icon: Facebook,
    href: "https://facebook.com/yourpage",
  },
  {
    name: "Instagram",
    icon: Instagram,
    href: "https://instagram.com/username",
  },
  {
    name: "YouTube",
    icon: Youtube,
    href: "https://youtube.com/@channel",
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-screen py-12 bg-[#0E1412] text-[#ECFDF5] mt-0" style={{ 
      marginLeft: 'calc(-50vw + 50%)', 
      marginRight: 'calc(-50vw + 50%)',
    }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-right">
          {/* Brand Info */}
          <div>
            <h3 className="text-5xl font-extrabold text-[#ECFDF5] mb-4">
              آيات
            </h3>
            <p className="text-[#ECFDF5]/60 leading-relaxed mb-4">
              بوابتك المتكاملة للقرآن الكريم، الأذكار، والسبحة الإلكترونية.
            </p>
            <Link href="/" className="inline-flex items-center text-[#30D09A] hover:text-[#30D09A]/80 transition-colors font-medium">
              اكتشف المزيد
            </Link>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-2xl font-bold text-[#ECFDF5] mb-6">روابط سريعة</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/quran" className="text-[#ECFDF5]/60 hover:text-[#ECFDF5] transition-colors text-base">
                  القرآن الكريم
                </Link>
              </li>
              <li>
                <Link href="/adhkar" className="text-[#ECFDF5]/60 hover:text-[#ECFDF5] transition-colors text-base">
                  الأذكار
                </Link>
              </li>
              <li>
                <Link href="/tasbih" className="text-[#ECFDF5]/60 hover:text-[#ECFDF5] transition-colors text-base">
                  السبحة الإلكترونية
                </Link>
              </li>
              <li>
                <Link href="/bookmarks" className="text-[#ECFDF5]/60 hover:text-[#ECFDF5] transition-colors text-base">
                  العلامات المرجعية
                </Link>
              </li>
              <li>
                <Link href="/favorites" className="text-[#ECFDF5]/60 hover:text-[#ECFDF5] transition-colors text-base">
                  الآيات المفضلة
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-2xl font-bold text-[#ECFDF5] mb-6">تواصل معنا</h4>
            <div className="flex items-center justify-center md:justify-end gap-4 flex-wrap">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <Link
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative group block w-14 h-14"
                    aria-label={social.name}
                  >
                    <div className="absolute inset-0 rounded-full bg-[#141D1B] backdrop-blur-sm flex items-center justify-center transition-all duration-200 group-hover:bg-[#30D09A]/20 group-hover:scale-110 border border-[#30D09A]/10">
                      <Icon className="h-7 w-7 text-[#ECFDF5]" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center border-t border-[#141D1B] pt-6 mt-8">
          <p className="text-[#ECFDF5]/60 text-sm">
            © {currentYear} جميع الحقوق محفوظة لـ AlaaTaha
          </p>
        </div>
      </div>
    </footer>
  );
}
