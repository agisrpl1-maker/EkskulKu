"use client";

import { useEffect } from "react";

export default function ErrorEkskul({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="max-w-md mx-auto mt-20 p-8 text-center rounded-2xl border-2 border-red-200 bg-white shadow-xl">
      <div className="text-6xl mb-4">⚠️</div>
      <h2 className="text-2xl font-bold text-red-600 mb-3">Terjadi Kesalahan!</h2>
      <p className="text-slate-600 mb-6 leading-relaxed">
        Gagal memuat daftar ekstrakurikuler. Silakan coba beberapa saat lagi.
      </p>
      <button
        onClick={() => reset()}
        className="rounded-xl bg-gradient-to-r from-red-500 to-orange-500 px-6 py-3 text-base font-bold text-white hover:from-red-600 hover:to-orange-600 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
      >
        🔄 Coba Lagi
      </button>
    </main>
  );
}