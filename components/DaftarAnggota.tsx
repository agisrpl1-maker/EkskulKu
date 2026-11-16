import { cookies } from "next/headers";
import { ambilAnggota } from "@/data/ambil";
import { ambilEkskul } from "@/data/ambil";

export default async function DaftarAnggota({ ekskulId }: { ekskulId: number }) {
  const [anggotaList, ekskulItem] = await Promise.all([
    ambilAnggota(ekskulId),
    ambilEkskul(ekskulId)
  ]);

  const cookieStore = await cookies();
  const namaCookie = cookieStore.get("nama")?.value ?? "";

  const kuotaTotal = ekskulItem?.kuota ?? 0;
  const jumlahTerisi = anggotaList.length;
  const persentase = kuotaTotal > 0 ? (jumlahTerisi / kuotaTotal) * 100 : 0;

  return (
    <div>
      {/* Progress indicator */}
      <div className="mb-4 bg-gradient-to-br from-slate-50 to-white rounded-xl p-4 border border-slate-200">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-bold text-slate-700">Kapasitas Terdaftar</p>
          <p className="text-lg font-bold text-red-600">
            {jumlahTerisi} / {kuotaTotal}
          </p>
        </div>
        <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-red-500 to-orange-500 transition-all duration-500 rounded-full"
            style={{ width: `${Math.min(persentase, 100)}%` }}
          />
        </div>
        <p className="text-xs text-slate-500 mt-1">
          {kuotaTotal - jumlahTerisi > 0 
            ? `${kuotaTotal - jumlahTerisi} tempat tersisa` 
            : "Kuota penuh!"}
        </p>
      </div>

      {anggotaList.length === 0 ? (
        <div className="text-center py-12 bg-slate-50 rounded-xl border-2 border-dashed border-slate-300">
          <div className="text-5xl mb-3">👥</div>
          <p className="text-slate-500 font-medium">Belum ada anggota terdaftar</p>
          <p className="text-slate-400 text-sm mt-1">Jadilah yang pertama!</p>
        </div>
      ) : (
        <ul className="divide-y divide-slate-100 border-2 border-slate-200 rounded-xl bg-white overflow-hidden shadow-md">
          {anggotaList.map((p, index) => {
            const isKamu = p.nama.toLowerCase() === namaCookie.toLowerCase();
            return (
              <li 
                key={p.nomor} 
                className={`flex items-center justify-between px-5 py-4 transition-colors hover:bg-slate-50 ${
                  isKamu ? "bg-gradient-to-r from-red-50 to-orange-50" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-white font-bold shadow-md">
                    {index + 1}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900">{p.nama}</span>
                      {isKamu && (
                        <span className="rounded-lg bg-gradient-to-r from-red-500 to-orange-500 px-2.5 py-0.5 text-xs font-bold text-white shadow-sm">
                          ⭐ Kamu
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-slate-600 mt-0.5 flex items-center gap-1">
                      <span>🎓</span>
                      <span>{p.kelas}</span>
                    </p>
                  </div>
                </div>
                <span className="text-xs font-semibold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-lg">
                  #{p.nomor}
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}