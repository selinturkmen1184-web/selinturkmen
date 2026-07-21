import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = (
    requestHeaders.get("x-forwarded-host") ??
    requestHeaders.get("host") ??
    "selin-turkmen-portfolio.kullanici209931.chatgpt.site"
  ).split(",")[0].trim();
  const protocol = (
    requestHeaders.get("x-forwarded-proto") ??
    (host.startsWith("localhost") ? "http" : "https")
  ).split(",")[0].trim();
  const siteUrl = new URL(`${protocol}://${host}`);
  const socialImage = new URL("/og.png", siteUrl).toString();

  return {
    metadataBase: siteUrl,
    title: "Selin Türkmen — Robotik, TÜBİTAK ve Dijital Deneyimler",
    description:
      "Selin Türkmen'in TÜBİTAK araştırmaları, robotik sistemleri, özgün tarımsal drone üretimi ve dijital ürünlerinden oluşan portfolyosu.",
    openGraph: {
      title: "Selin Türkmen — Portfolyo",
      description: "Robotik, yapay zekâ ve özgün mühendislik projeleri.",
      type: "website",
      locale: "tr_TR",
      url: siteUrl,
      images: [
        {
          url: socialImage,
          width: 1200,
          height: 630,
          alt: "Selin Türkmen robotik ve yapay zekâ portfolyosu",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Selin Türkmen — Portfolyo",
      description: "Robotik, TÜBİTAK ve yaratıcı mühendislik projeleri.",
      images: [socialImage],
    },
  };
}

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
