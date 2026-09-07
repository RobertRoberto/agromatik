import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Agromatik",
  description: "Sistema de gestión y control de actividades agrícolas",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-screen flex">

        <Sidebar />

        <div className="flex-1 min-w-0 flex flex-col">

          <Header />

          <main className="flex-1 bg-[var(--agromatik-background)]">
            {children}
          </main>

        </div>

      </body>
    </html>
  );
}