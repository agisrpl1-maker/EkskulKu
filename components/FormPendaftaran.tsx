"use client";

import { useActionState } from "react";
import { daftarEkskulAction, type ActionState } from "@/app/actions";
import { type Ekskul } from "@/data/ekskul";

type Props = {
  ekskul: Ekskul;
  namaAwal: string;
  kelasAwal?: string;
};

const initialState: ActionState = {};

export default function FormPendaftaran({ ekskul, namaAwal, kelasAwal = "" }: Props) {
  const actionWithId = daftarEkskulAction.bind(null, ekskul.id);
  const [state, formAction, isPending] = useActionState(actionWithId, initialState);

  // Mempertahankan isian yang sudah diketik saat ada galat
  const defaultNama = state?.values?.nama ?? namaAwal;
  const defaultKelas = state?.values?.kelas ?? kelasAwal;

  return (
    <form action={formAction} className="space-y-5 rounded-2xl border-2 border-slate-200 bg-gradient-to-br from-slate-50 to-white p-6 shadow-lg">
      {/* Pesan Galat Umum atau Sukses di atas tombol */}
      {state?.message && (
        <div
          className={`p-4 rounded-xl text-sm font-semibold flex items-center gap-3 shadow-md ${
            state.success 
              ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white" 
              : "bg-gradient-to-r from-red-500 to-orange-500 text-white"
          }`}
        >
          <span className="text-xl">{state.success ? "✅" : "⚠️"}</span>
          <span>{state.message}</span>
        </div>
      )}

      {/* Kolom Nama */}
      <div>
        <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
          <span>👤</span>
          <span>Nama Lengkap</span>
        </label>
        <input
          type="text"
          name="nama"
          defaultValue={defaultNama}
          required
          placeholder="Masukkan nama lengkap Anda"
          className="w-full rounded-xl border-2 border-slate-300 bg-white px-4 py-3 text-sm focus:border-red-500 focus:ring-2 focus:ring-red-200 focus:outline-none transition-all"
        />
        {state?.errors?.nama && (
          <p className="mt-2 text-xs text-red-600 font-semibold flex items-center gap-1">
            <span>⚠️</span>
            <span>{state.errors.nama}</span>
          </p>
        )}
      </div>

      {/* Kolom Kelas */}
      <div>
        <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
          <span>🎓</span>
          <span>Kelas</span>
        </label>
        <input
          type="text"
          name="kelas"
          defaultValue={defaultKelas}
          required
          placeholder="Contoh: XI RPL 1"
          className="w-full rounded-xl border-2 border-slate-300 bg-white px-4 py-3 text-sm focus:border-red-500 focus:ring-2 focus:ring-red-200 focus:outline-none transition-all"
        />
        {state?.errors?.kelas && (
          <p className="mt-2 text-xs text-red-600 font-semibold flex items-center gap-1">
            <span>⚠️</span>
            <span>{state.errors.kelas}</span>
          </p>
        )}
      </div>

      {/* Tombol Berubah Menjadi "Memproses..." saat pending */}
      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-xl bg-gradient-to-r from-red-500 to-orange-500 px-6 py-3.5 text-base font-bold text-white hover:from-red-600 hover:to-orange-600 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
      >
        {isPending ? (
          <span className="flex items-center justify-center gap-2">
            <span className="inline-block animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></span>
            <span>Memproses...</span>
          </span>
        ) : (
          <span className="flex items-center justify-center gap-2">
            <span>📝</span>
            <span>Daftar Ekskul Ini</span>
          </span>
        )}
      </button>
    </form>
  );
}