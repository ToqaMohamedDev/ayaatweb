"use client";

import { motion } from "framer-motion";
import { MessageCircle, Facebook, Instagram, Youtube } from "lucide-react";
import Link from "next/link";

// TikTok Icon Component (since Lucide doesn't have TikTok)
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

const iconVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.4,
    },
  }),
};

const iconHover = {
  scale: 1.2,
  rotate: [0, -10, 10, -10, 0],
  transition: {
    duration: 0.5,
  },
};

const socialLinks = [
  {
    name: "TikTok",
    icon: TikTokIcon,
    href: "https://tiktok.com/@username",
    hoverColor: "#000000",
  },
  {
    name: "WhatsApp",
    icon: MessageCircle,
    href: "https://wa.me/201234567890",
    hoverColor: "#25D366",
  },
  {
    name: "Facebook",
    icon: Facebook,
    href: "https://facebook.com/yourpage",
    hoverColor: "#1877F2",
  },
  {
    name: "Instagram",
    icon: Instagram,
    href: "https://instagram.com/username",
    hoverColor: "linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
  },
  {
    name: "YouTube",
    icon: Youtube,
    href: "https://youtube.com/@channel",
    hoverColor: "#FF0000",
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 dark:bg-black text-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Name */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 opacity-100"
        >
          <h3 className="text-4xl md:text-5xl font-bold text-gradient mb-2">
            AlaaTaha
          </h3>
        </motion.div>

        {/* Social Icons */}
        <div className="flex items-center justify-center gap-6 flex-wrap mb-8">
          {socialLinks.map((social, index) => {
            const Icon = social.icon;
            const isGradient = social.hoverColor.includes("gradient");

            return (
              <motion.div
                key={social.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                whileHover={iconHover}
                className="opacity-100"
              >
                <Link
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative group"
                  aria-label={social.name}
                >
                  <div
                    className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center transition-all duration-300 group-hover:bg-white/20"
                    style={
                      isGradient
                        ? {}
                        : {
                            backgroundColor: "rgba(255, 255, 255, 0.1)",
                          }
                    }
                  >
                    <Icon
                      className="h-7 w-7 text-white group-hover:scale-110 transition-transform"
                    />
                  </div>
                  <motion.div
                    className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300 -z-10"
                    style={
                      !isGradient
                        ? {
                            backgroundColor: social.hoverColor,
                            filter: "blur(15px)",
                          }
                        : {
                            background: social.hoverColor,
                            filter: "blur(15px)",
                          }
                    }
                  />
                  <motion.div
                    className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={
                      !isGradient
                        ? {
                            backgroundColor: social.hoverColor,
                            mixBlendMode: "overlay",
                          }
                        : {
                            background: social.hoverColor,
                            mixBlendMode: "overlay",
                          }
                    }
                  />
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center border-t border-gray-800 pt-8 opacity-100"
        >
          <p className="text-gray-400 text-sm">
            © {currentYear} جميع الحقوق محفوظة
          </p>
        </motion.div>
      </div>
    </footer>
  );
}

