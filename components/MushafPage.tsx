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

// دالة لتحويل الأرقام إلى الأرقام العربية الشرقية
function toArabicNumerals(num: number): string {
  const arabicNumerals = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
  return num.toString().split('').map(digit => arabicNumerals[parseInt(digit)]).join('');
}

export function MushafPage({
  ayahs,
  surahName,
  surahNumber,
  showBismillah = false,
}: MushafPageProps) {
  const { settings } = useTheme();
  const isDark = settings.theme === "dark";
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

  // دمج النص مع ترقيم الآيات
  const processedAyahs = useMemo(() => {
    return ayahs.map((ayah, index) => {
      let text = ayah.text;
      const isBismillah = index === 0 && showBismillah && surahNumber !== 1 && surahNumber !== 9;
      
      // إزالة البسملة من بداية نص الآية الأولى فقط إذا كانت موجودة
      if (isBismillah && index === 0) {
        // إزالة البسملة بجميع أشكالها من بداية النص (مع أو بدون رقم الآية قبلها)
        const bismillahPatterns = [
          /^[٠١٢٣٤٥٦٧٨٩0-9]*\s*بِسْمِ\s*اللَّهِ\s*الرَّحْمَٰنِ\s*الرَّحِيمِ\s*/,
          /^[٠١٢٣٤٥٦٧٨٩0-9]*\s*بِسْمِ\s*اللَّهِ\s*الرَّحْمَٰنِ\s*الرَّحِيمِ\s*/,
          /^[٠١٢٣٤٥٦٧٨٩0-9]*\s*بِسْمِ\s*الله\s*الرَّحْمَٰنِ\s*الرَّحِيمِ\s*/,
          /^[٠١٢٣٤٥٦٧٨٩0-9]*\s*بِسْمِ\s*الله\s*الرَّحْمَٰنِ\s*الرَّحِيمِ\s*/,
          /^بِسْمِ\s*اللَّهِ\s*الرَّحْمَٰنِ\s*الرَّحِيمِ\s*/,
          /^بِسْمِ\s*اللَّهِ\s*الرَّحْمَٰنِ\s*الرَّحِيمِ\s*/,
          /^بِسْمِ\s*الله\s*الرَّحْمَٰنِ\s*الرَّحِيمِ\s*/,
          /^بِسْمِ\s*الله\s*الرَّحْمَٰنِ\s*الرَّحِيمِ\s*/,
        ];
        
        for (const pattern of bismillahPatterns) {
          text = text.replace(pattern, '');
        }
        // إزالة أي مسافات زائدة في البداية
        text = text.trim();
      }
      
      return {
        text: text,
        number: ayah.numberInSurah,
        isBismillah: isBismillah,
      };
    });
  }, [ayahs, showBismillah, surahNumber]);

  return (
    <div className="relative w-full" ref={containerRef}>
      {/* خلفية ورق كريمي بسيطة وهادئة */}
      <div
        className="relative rounded-lg overflow-hidden mx-auto"
        style={{
          background: isDark ? "#1a1a1a" : "#f9f7f4",
          minHeight: "900px",
          maxWidth: "1200px",
          boxShadow: isDark 
            ? "0 2px 20px rgba(0, 0, 0, 0.3)" 
            : "0 2px 20px rgba(0, 0, 0, 0.08)",
        }}
      >
        {/* حد بسيط وهادئ */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute inset-0 rounded-lg"
            style={{
              border: `1px solid ${isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(139, 69, 19, 0.08)"}`,
            }}
          />
        </div>

        {/* المحتوى */}
        <div className="relative z-10 p-20">
          {/* النص */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className={`${fontSizeClasses[settings.fontSize]} font-arabic`}
            dir="rtl"
            style={{
              color: isDark ? "#ECFDF5" : "#2c1810",
              fontFamily: "'Amiri', 'Scheherazade New', serif",
              textAlign: "justify",
              textJustify: "inter-word",
              lineHeight: "3.5",
              fontWeight: 400,
              letterSpacing: "0.02em",
              wordSpacing: "0.1em",
            }}
          >
            {processedAyahs.map((ayah, index) => (
              <span key={ayah.number} style={{ display: "inline" }}>
                {ayah.isBismillah && (
                  <>
                    <div style={{
                      display: "block",
                      textAlign: "center",
                      marginBottom: "16px",
                      color: isDark ? "#30D09A" : "#8b4513",
                      fontFamily: "'Amiri', serif",
                      fontWeight: 600,
                    }}>
                      بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                    </div>
                    <span 
                      style={{ 
                        display: "inline-block",
                        margin: "0 12px",
                        verticalAlign: "middle",
                      }}
                    >
                      <span
                        className="inline-flex items-center justify-center relative"
                        style={{
                          minWidth: "38px",
                          height: "38px",
                          borderRadius: "12px",
                          background: isDark ? "#141D1B" : "#fef9e7",
                          color: isDark ? "#30D09A" : "#8b4513",
                          fontSize: "0.48em",
                          fontWeight: 800,
                          fontFamily: "'Amiri', serif",
                          boxShadow: isDark
                            ? `
                              0 0 0 2px #30D09A,
                              0 4px 12px rgba(48, 208, 154, 0.2),
                              inset 0 1px 0 rgba(255, 255, 255, 0.1)
                            `
                            : `
                              0 0 0 2px #d4af37,
                              0 4px 12px rgba(212, 175, 55, 0.25),
                              inset 0 1px 0 rgba(255, 255, 255, 0.5)
                            `,
                          lineHeight: "1",
                          padding: "0",
                          position: "relative",
                        }}
                      >
                        <span style={{
                          position: "absolute",
                          top: "-2px",
                          right: "-2px",
                          width: "8px",
                          height: "8px",
                          borderRadius: "50%",
                          background: isDark
                            ? "linear-gradient(135deg, #30D09A, #16A34A)"
                            : "linear-gradient(135deg, #f4d03f, #d4af37)",
                          boxShadow: isDark
                            ? "0 2px 4px rgba(48, 208, 154, 0.4)"
                            : "0 2px 4px rgba(212, 175, 55, 0.4)",
                        }}></span>
                        {toArabicNumerals(ayah.number)}
                      </span>
                    </span>
                  </>
                )}
                {!ayah.isBismillah && (
                  <span 
                    style={{ 
                      display: "inline-block",
                      margin: "0 12px",
                      verticalAlign: "middle",
                    }}
                  >
                    <span
                      className="inline-flex items-center justify-center relative"
                      style={{
                        minWidth: "38px",
                        height: "38px",
                        borderRadius: "12px",
                        background: isDark ? "#141D1B" : "#fef9e7",
                        color: isDark ? "#30D09A" : "#8b4513",
                        fontSize: "0.48em",
                        fontWeight: 800,
                        fontFamily: "'Amiri', serif",
                        boxShadow: isDark
                          ? `
                            0 0 0 2px #30D09A,
                            0 4px 12px rgba(48, 208, 154, 0.2),
                            inset 0 1px 0 rgba(255, 255, 255, 0.1)
                          `
                          : `
                            0 0 0 2px #d4af37,
                            0 4px 12px rgba(212, 175, 55, 0.25),
                            inset 0 1px 0 rgba(255, 255, 255, 0.5)
                          `,
                        lineHeight: "1",
                        padding: "0",
                        position: "relative",
                      }}
                    >
                      <span style={{
                        position: "absolute",
                        top: "-2px",
                        right: "-2px",
                        width: "8px",
                        height: "8px",
                        borderRadius: "50%",
                        background: isDark
                          ? "linear-gradient(135deg, #30D09A, #16A34A)"
                          : "linear-gradient(135deg, #f4d03f, #d4af37)",
                        boxShadow: isDark
                          ? "0 2px 4px rgba(48, 208, 154, 0.4)"
                          : "0 2px 4px rgba(212, 175, 55, 0.4)",
                      }}></span>
                      {toArabicNumerals(ayah.number)}
                    </span>
                  </span>
                )}
                <span style={{ display: "inline" }}>{ayah.text}</span>
              </span>
            ))}
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
                background: isDark
                  ? "linear-gradient(90deg, transparent, #30D09A, #16A34A, #30D09A, transparent)"
                  : "linear-gradient(90deg, transparent, #d4af37, #f4d03f, #d4af37, transparent)",
                borderRadius: "2px",
              }}
            />
            <div
              className="text-base font-semibold opacity-70"
              style={{
                color: isDark ? "#ECFDF5" : "#8b4513",
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

