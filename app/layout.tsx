import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: { default:"EkskulKu", template: "%s • EkskulKu" },
  description: "Katalog dan pendaftaran ekstrakurikuler sekolah",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className="antialiased"
    >
      <body 
      className={`flex min-h-screen flex-col bg-gradient-to-br from-slate-50 via-red-50 to-orange-50 text-slate-800`}>
        <Suspense fallback={null}>
          <Navbar />
        </Suspense>
        <main className="mx-auto w-full max-w-6xl flex-1 p-6">
          {children}
        </main>
        <footer className="border-t bg-white/80 backdrop-blur-sm p-6 text-center text-sm text-slate-600">
          <p className="font-semibold text-red-600">EkskulKu</p>
          <p className="mt-1">Dibuat dengan ❤️ di kelas Junior Web Developer</p>
        </footer>
      </body>
    </html>
  );
}