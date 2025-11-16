"use client";

import { Ayah } from "@/types";
import { useTheme } from "@/contexts/ThemeContext";
import { motion } from "framer-motion";
import { useState, useMemo, useEffect, useRef } from "react";

interface MushafPageProps {
  ayahs: Ayah[];
  surahName: string;
  surahNumber: number;
  showBismillah?: boolean;
}

// رمز علامة الآية (U+06DD) - رمز عثماني تقليدي
const AYAH_MARKER = "۝";

// دالة لإدراج علامات الآيات في النص
function insertAyahMarkers(ayahs: Ayah[]): string {
  return ayahs.map(ayah => ayah.text).join(` ${AYAH_MARKER} `);
}

export function MushafPage({
  ayahs,
  surahName,
  surahNumber,
  showBismillah = false,
}: MushafPageProps) {
  const { settings } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const fontSizeClasses = {
    small: "text-2xl",
    medium: "text-3xl",
    large: "text-4xl",
    xlarge: "text-5xl",
  };

  // دمج النص مع علامات الآيات
  const fullText = useMemo(() => {
    if (showBismillah && surahNumber !== 1 && surahNumber !== 9) {
      return `بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ ${AYAH_MARKER} ${insertAyahMarkers(ayahs)}`;
    }
    return insertAyahMarkers(ayahs);
  }, [ayahs, showBismillah, surahNumber]);

  return (
    <div className="relative w-full" ref={containerRef}>
      {/* خلفية ورق كريمي مع نسيج */}
      <div
        className="relative rounded-lg overflow-hidden shadow-2xl mx-auto"
        style={{
          background: `
            linear-gradient(135deg, #fef9e7 0%, #fef5e7 50%, #fef3e7 100%),
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              rgba(139, 69, 19, 0.03) 2px,
              rgba(139, 69, 19, 0.03) 4px
            )
          `,
          minHeight: "900px",
          maxWidth: "1200px",
        }}
      >
        {/* حدود ذهبية */}
        <div className="absolute inset-0 pointer-events-none">
          {/* الحد الخارجي الذهبي */}
          <div
            className="absolute inset-0 rounded-lg"
            style={{
              border: "12px solid",
              borderImage: "linear-gradient(135deg, #d4af37 0%, #f4d03f 30%, #d4af37 60%, #c9a227 100%) 1",
            }}
          />
          
          {/* الحد الداخلي */}
          <div
            className="absolute inset-6 rounded"
            style={{
              border: "3px solid rgba(212, 175, 55, 0.4)",
            }}
          />
        </div>

        {/* زخارف زاوية إسلامية */}
        <div className="absolute top-12 right-12 w-32 h-32 opacity-15">
          <svg viewBox="0 0 120 120" className="w-full h-full" style={{ color: "#d4af37" }}>
            <path
              d="M20,20 L100,20 L100,100 L20,100 Z M30,30 L90,30 L90,90 L30,90 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
            <circle cx="60" cy="60" r="12" fill="currentColor" opacity="0.5" />
            <path
              d="M40,40 L80,40 M40,80 L80,80 M40,40 L40,80 M80,40 L80,80"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
        </div>
        <div className="absolute bottom-12 left-12 w-32 h-32 opacity-15">
          <svg viewBox="0 0 120 120" className="w-full h-full" style={{ color: "#d4af37" }}>
            <path
              d="M20,20 L100,20 L100,100 L20,100 Z M30,30 L90,30 L90,90 L30,90 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
            <circle cx="60" cy="60" r="12" fill="currentColor" opacity="0.5" />
            <path
              d="M40,40 L80,40 M40,80 L80,80 M40,40 L40,80 M80,40 L80,80"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
        </div>

        {/* المحتوى */}
        <div className="relative z-10 p-20">
          {/* عنوان السورة */}
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-arabic text-5xl font-bold mb-4"
              style={{
                color: "#8b4513",
                textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
                fontFamily: "'Amiri', serif",
              }}
            >
              {surahName}
            </motion.h2>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="w-40 h-1.5 mx-auto"
              style={{
                background: "linear-gradient(90deg, transparent, #d4af37, #f4d03f, #d4af37, transparent)",
                borderRadius: "2px",
              }}
            />
          </div>

          {/* النص */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className={`${fontSizeClasses[settings.fontSize]} font-arabic`}
            dir="rtl"
            style={{
              color: "#2c1810",
              fontFamily: "'Amiri', 'Scheherazade New', serif",
              textAlign: "justify",
              textJustify: "inter-word",
              lineHeight: "3.5",
              fontWeight: 400,
              letterSpacing: "0.02em",
              hyphens: "auto",
              WebkitHyphens: "auto",
              MozHyphens: "auto",
              msHyphens: "auto",
            }}
          >
            {fullText.split(/(۝)/g).map((part, index) => {
              if (part === AYAH_MARKER) {
                return (
                  <span
                    key={index}
                    className="inline-block mx-2 my-0 align-middle"
                    style={{
                      color: "#d4af37",
                      fontSize: "0.45em",
                      verticalAlign: "middle",
                      fontFamily: "serif",
                      lineHeight: "1",
                      minWidth: "28px",
                    }}
                  >
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 28 28"
                      className="inline-block align-middle"
                      style={{ verticalAlign: "middle" }}
                    >
                      <circle
                        cx="14"
                        cy="14"
                        r="10"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        opacity="0.8"
                      />
                      <circle
                        cx="14"
                        cy="14"
                        r="4"
                        fill="currentColor"
                      />
                      <path
                        d="M14,4 L14,8 M14,20 L14,24 M4,14 L8,14 M20,14 L24,14"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                );
              }
              return <span key={index}>{part}</span>;
            })}
          </motion.div>

          {/* زخرفة سفلية */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-20 text-center"
          >
            <div
              className="w-80 h-1.5 mx-auto mb-6"
              style={{
                background: "linear-gradient(90deg, transparent, #d4af37, #f4d03f, #d4af37, transparent)",
                borderRadius: "2px",
              }}
            />
            <div
              className="text-base font-semibold opacity-70"
              style={{
                color: "#8b4513",
                fontFamily: "'Amiri', serif",
              }}
            >
              {ayahs.length} آية
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

