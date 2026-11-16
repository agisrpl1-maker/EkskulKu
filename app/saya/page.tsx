import { Suspense } from "react";
import { type Metadata } from "next";
import KontenSaya from "@/components/KontenSaya";

export const metadata: Metadata = {
  title: "Ekskul Saya · EkskulKu",
};

export default function PageSaya() {
  return (
    <main className="max-w-5xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center shadow-lg">
            <span className="text-white text-2xl">⭐</span>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Ekskul Saya</h1>
            <p className="text-slate-600 text-sm">Daftar ekstrakurikuler yang kamu ikuti</p>
          </div>
        </div>
      </div>
      
      {/* Bungkus dengan Suspense untuk mengatasi error blocking route */}
      <Suspense fallback={
        <div className="text-center py-16">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-slate-200 border-t-red-600 mb-4"></div>
          <p className="text-slate-400 text-sm">Memuat ekskul saya...</p>
        </div>
      }>
        <KontenSaya />
      </Suspense>
    </main>
  );
}