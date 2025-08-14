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
  title: "CODEa Mining Fest 2025",
  description: "El evento que reúne a profesionales, empresas, autoridades y estudiantes para explorar el futuro de la minería en Latinoamérica.",
  icons: {
    icon: [
      {
        url: "/images/FAVICON-CODEAMININGFEST.png",
        sizes: "any",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/app/icon.png" type="image/png" sizes="32x32" />
        <link rel="apple-touch-icon" href="/app/apple-icon.png" />
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
