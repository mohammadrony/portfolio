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
  title: "Md. Rony",
  description: "Portfolio of Md. Rony - Software Engineer",
  icons: {
    icon: [
      { url: '/favicon-black.png', media: '(prefers-color-scheme: light)' },
      { url: '/favicon-white.png', media: '(prefers-color-scheme: dark)' },
    ],
  },
  metadataBase: new URL('https://mohammadrony.com'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
