import Link from "next/link";
import { type Ekskul, JAM_SESI } from "@/data/ekskul";

type Props = {
  ekskul: Ekskul;
  jumlahPendaftar: number;
};

export default function KartuEkskul({ ekskul, jumlahPendaftar }: Props) {
  const sisa = ekskul.kuota - jumlahPendaftar;
  const isPenuh = sisa <= 0;
  const persentaseTerisi = (jumlahPendaftar / ekskul.kuota) * 100;

  return (
    <div className="group relative rounded-2xl border border-slate-200 bg-white p-6 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden hover:-translate-y-1">
      {/* Decorative gradient overlay */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 via-orange-500 to-red-500"></div>
      
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="rounded-lg bg-gradient-to-r from-red-500 to-orange-500 px-3 py-1 text-xs font-semibold text-white shadow-md">
            {ekskul.kategori}
          </span>
          {isPenuh && (
            <span className="rounded-lg bg-red-100 px-2.5 py-1 text-xs font-bold text-red-700 animate-pulse">
              ⚠️ Penuh
            </span>
          )}
        </div>

        <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-red-600 transition-colors">
          {ekskul.nama}
        </h3>
        
        <div className="mt-3 text-sm text-slate-600 space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-base">📅</span>
            <p className="font-medium">{ekskul.hari}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-base">⏰</span>
            <p>Sesi {ekskul.sesi} ({JAM_SESI[ekskul.sesi]})</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-base">👨‍🏫</span>
            <p>
              <span className="font-semibold text-slate-800">{ekskul.pembina}</span>
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-slate-100">
        {/* Progress bar */}
        <div className="mb-3">
          <div className="flex items-center justify-between text-xs text-slate-600 mb-1">
            <span className="font-medium">Kapasitas</span>
            <span className="font-semibold">{jumlahPendaftar}/{ekskul.kuota}</span>
          </div>
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-500 ${
                isPenuh 
                  ? 'bg-gradient-to-r from-red-500 to-red-600' 
                  : 'bg-gradient-to-r from-green-400 to-green-500'
              }`}
              style={{ width: `${Math.min(persentaseTerisi, 100)}%` }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <p className={`text-sm font-bold ${isPenuh ? "text-red-600" : "text-green-600"}`}>
            {isPenuh ? "🔴 Penuh" : `✅ ${sisa} tempat tersisa`}
          </p>
          
          <Link
            href={`/ekskul/${ekskul.id}`}
            className="rounded-xl bg-gradient-to-r from-red-500 to-orange-500 px-4 py-2 text-sm font-semibold text-white hover:from-red-600 hover:to-orange-600 transition-all shadow-md hover:shadow-lg transform hover:scale-105"
          >
            Detail →
          </Link>
        </div>
      </div>
    </div>
  );
}