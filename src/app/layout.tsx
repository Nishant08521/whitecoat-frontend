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
  metadataBase: new URL('https://thewhitecoatrevolution.in'),
  title: "The White Coat Revolution",
  description: "Join the White Coat Revolution – India's biggest medical movement. Register now for Online or Offline participation.",
  openGraph: {
    title: "The White Coat Revolution",
    description: "Join the White Coat Revolution – India's biggest medical movement. Register now for Online or Offline participation.",
    url: 'https://thewhitecoatrevolution.in',
    siteName: 'The White Coat Revolution',
    images: [
      {
        url: '/whitecoat.jpeg',
        width: 1200,
        height: 630,
        alt: 'The White Coat Revolution Poster',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
