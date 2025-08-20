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
  title: "CODEa Mining Fest 2026",
  description: "El evento que reúne a profesionales, empresas, autoridades y estudiantes para explorar el futuro de la minería en Latinoamérica.",
  keywords: ["minería", "tecnología", "evento", "Perú", "CODEa", "mining", "fest"],
  authors: [{ name: "CODEa UNI" }],
  openGraph: {
    title: "CODEa Mining Fest 2026",
    description: "El evento que reúne a profesionales, empresas, autoridades y estudiantes para explorar el futuro de la minería en Latinoamérica.",
    url: "https://codeaminingfest.com",
    siteName: "CODEa Mining Fest",
    images: [
      {
        url: "https://codeaminingfest.com/images/LOGO-CODEAMININGFEST-WEB.png",
        width: 1200,
        height: 630,
        alt: "CODEa Mining Fest 2026",
      },
    ],
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CODEa Mining Fest 2026",
    description: "El evento que reúne a profesionales, empresas, autoridades y estudiantes para explorar el futuro de la minería en Latinoamérica.",
    images: ["https://codeaminingfest.com/images/LOGO-CODEAMININGFEST-WEB.png"],
  },
  icons: {
    icon: [
      {
        url: "/images/FAVICON-CODEAMININGFEST.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/images/FAVICON-CODEAMININGFEST.png",
        sizes: "16x16",
        type: "image/png",
      },
    ],
    apple: [
      {
        url: "/images/FAVICON-CODEAMININGFEST.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
    shortcut: "/images/FAVICON-CODEAMININGFEST.png",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <meta name="theme-color" content="#f59e0b" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
