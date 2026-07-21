import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Selin Türkmen — Yazılım, Sistemler ve Dijital Deneyimler",
  description:
    "Selin Türkmen'in robotik, web geliştirme, mobil ürün ve görsel anlatı projelerinden oluşan portfolyosu.",
  openGraph: {
    title: "Selin Türkmen — Portfolyo",
    description: "Fikirleri çalışan sistemlere dönüştürüyorum.",
    type: "website",
    locale: "tr_TR",
  },
  twitter: {
    card: "summary",
    title: "Selin Türkmen — Portfolyo",
    description: "Robotik, web ve yaratıcı mühendislik projeleri.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
