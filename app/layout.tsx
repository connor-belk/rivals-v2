import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ToastWrapper from "../components/ToastWrapper";
import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rivals",
  description:
    "Forza Motorsport Wheel to Wheel racing results, event stats, and highlights from a close-knit community of racers. Join us for clean competition and camaraderie on the track.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full bg-white dark:bg-gray-900">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-full`}
      >
        {/* <Navbar /> */}
        <ToastWrapper>{children}</ToastWrapper>
        {/* <Footer /> */}
      </body>
    </html>
  );
}
