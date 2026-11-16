"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { DAFTAR_KATEGORI, DAFTAR_HARI } from "@/data/ekskul";

export default function KontrolKatalog() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const kategori = searchParams.get("kategori") || "Semua";
  const hari = searchParams.get("hari") || "Semua";
  const cari = searchParams.get("cari") || "";

  const handleKategoriChange = (val: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (val === "Semua") {
      params.delete("kategori");
    } else {
      params.set("kategori", val);
    }
    router.push(`/ekskul?${params.toString()}`);
  };

  const handleHariChange = (val: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (val === "Semua") {
      params.delete("hari");
    } else {
      params.set("hari", val);
    }
    router.push(`/ekskul?${params.toString()}`);
  };

  const handleCariChange = (val: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (val === "") {
      params.delete("cari");
    } else {
      params.set("cari", val);
    }
    router.push(`/ekskul?${params.toString()}`);
  };

  const resetFilter = () => {
    router.push("/ekskul");
  };

  const hasActiveFilter = kategori !== "Semua" || hari !== "Semua" || cari !== "";

  return (
    <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <span>🔍</span>
          <span>Filter & Pencarian</span>
        </h3>
        {hasActiveFilter && (
          <button
            onClick={resetFilter}
            className="text-xs font-medium text-red-600 hover:text-red-700 underline"
          >
            Reset Filter
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Pencarian */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-slate-700 flex items-center gap-1">
            <span>🔎</span>
            <span>Cari Ekskul</span>
          </label>
          <input
            type="text"
            value={cari}
            onChange={(e) => handleCariChange(e.target.value)}
            placeholder="Nama ekskul atau pembina..."
            className="rounded-xl border-2 border-slate-300 bg-white px-4 py-2.5 text-sm focus:border-red-500 focus:outline-none transition-colors"
          />
        </div>

        {/* Saringan Kategori */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-slate-700 flex items-center gap-1">
            <span>📂</span>
            <span>Kategori</span>
          </label>
          <select
            value={kategori}
            onChange={(e) => handleKategoriChange(e.target.value)}
            className="rounded-xl border-2 border-slate-300 bg-white px-4 py-2.5 text-sm focus:border-red-500 focus:outline-none transition-colors cursor-pointer"
          >
            <option value="Semua">Semua kategori</option>
            {DAFTAR_KATEGORI.map((k) => (
              <option key={k} value={k}>
                {k}
              </option>
            ))}
          </select>
        </div>

        {/* Saringan Hari */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-slate-700 flex items-center gap-1">
            <span>📅</span>
            <span>Hari</span>
          </label>
          <select
            value={hari}
            onChange={(e) => handleHariChange(e.target.value)}
            className="rounded-xl border-2 border-slate-300 bg-white px-4 py-2.5 text-sm focus:border-red-500 focus:outline-none transition-colors cursor-pointer"
          >
            <option value="Semua">Semua hari</option>
            {DAFTAR_HARI.map((h) => (
              <option key={h} value={h}>
                {h}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}