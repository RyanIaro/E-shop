import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "E-shop",
  description: "My first E-commerce website for practice purposes",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="">
      <body
        className={`
          ${geistSans.variable} ${geistMono.variable}
          antialiased flex min-h-full flex-col bg-white text-black dark:bg-[#0a0a0a] dark:text-white
          `}
      >
        <Navbar/>
        <main className="flex-grow container mx-auto px-4 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}
