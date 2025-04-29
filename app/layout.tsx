import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "./components/brand/Header";

// Import fonts
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Emerald Owl Productions",
  description: "Creating Unforgettable Experiences",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body className="bg-gray-900 text-white">
        <Header />
        <main className="min-h-screen pt-20">
          {children}
        </main>
      </body>
    </html>
  );
}
