import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { AuthProvider } from "@/providers/AuthProvider";
import { ToastProvider } from "@/components/Toast";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "WellnessForge",
  description: "Forge Your Path to Better Health: Discover, Share, and Thrive",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <ToastProvider>
            <ThemeProvider>
            <AuthProvider>
              <Navbar />
              <main className="flex-grow min-h-[calc(100vh-theme(spacing.16)-theme(spacing.16))]">
                {children}
              </main>
            </AuthProvider>
          </ThemeProvider>
        </ToastProvider>
      </body>
    </html>
  );
}


