import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";
import { Toaster } from "react-hot-toast";
// import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Johnny Boy",
  description: "Experience weightless shopping",
};

import { Providers } from "@/components/Providers";
import { LayoutShell } from "@/components/layout/LayoutShell";
import { AuthProvider } from "@/components/context/AuthContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col relative">
        <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-black to-black opacity-80 -z-10"></div>
       <Providers>
  <AuthProvider>
    <LayoutShell>{children}</LayoutShell>
  </AuthProvider>
</Providers>
 <Toaster position="top-right" />
      </body>
    </html>
  );
}
