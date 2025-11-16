import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "آيات - موقع القرآن الكريم والأذكار",
  description: "موقع إسلامي متكامل يحتوي على القرآن الكريم، أذكار الصباح والمساء، وسبحة إلكترونية",
  keywords: ["القرآن الكريم", "أذكار", "سبحة", "إسلامي"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="ar" dir="rtl" className="h-full">
        <body className={`${inter.className} h-full`}>
          <Providers>
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {children}
            </main>
          </Providers>
        </body>
      </html>
  );
}
