import { cookies } from "next/headers";
import Link from "next/link";
import { ekskul, JAM_SESI, pendaftar } from "@/data/ekskul";
import { batalkanPendaftaranAction } from "@/app/actions";

export default async function KontenSaya() {
  const cookieStore = await cookies();
  const nama = cookieStore.get("nama")?.value ?? "";
  const kelas = cookieStore.get("kelas")?.value ?? "";

  // 1. Kondisi tanpa cookie
  if (!nama || !kelas) {
    return (
      <div className="text-center py-16 bg-white rounded-2xl shadow-lg border border-slate-200">
        <div className="text-6xl mb-4">📚</div>
        <p className="text-slate-600 text-lg font-medium mb-6">Kamu belum mendaftar ekskul apa pun</p>
        <Link
          href="/ekskul"
          className="inline-block rounded-xl bg-gradient-to-r from-red-500 to-orange-500 px-6 py-3 text-base font-bold text-white hover:from-red-600 hover:to-orange-600 transition-all shadow-lg hover:shadow-xl"
        >
          Jelajahi Ekskul →
        </Link>
      </div>
    );
  }

  // Cari ekskul yang diikuti oleh murid berdasarkan nama & kelas di cookie
  const pendaftaranSaya = pendaftar.filter(
    (p) =>
      p.nama.toLowerCase() === nama.toLowerCase() &&
      p.kelas.toLowerCase() === kelas.toLowerCase()
  );

  const ekskulSayaList = pendaftaranSaya
    .map((p) => {
      const item = ekskul.find((e) => e.id === p.ekskulId);
      return item ? { ...item, pendaftarId: p.nomor } : null;
    })
    .filter(Boolean);

  return (
    <div>
      {/* Ringkasan Identitas & Jumlah Ekskul */}
      <div className="mb-6 rounded-2xl border-2 border-slate-200 bg-gradient-to-br from-white to-slate-50 p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center shadow-lg">
              <span className="text-white text-2xl font-bold">{nama.charAt(0).toUpperCase()}</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">{nama}</h2>
              <p className="text-slate-600 font-medium flex items-center gap-1 mt-1">
                <span>🎓</span>
                <span>{kelas}</span>
              </p>
            </div>
          </div>
          <div className="text-center bg-white rounded-xl px-6 py-3 shadow-md border border-slate-200">
            <div className="text-3xl font-bold text-red-600">{ekskulSayaList.length}</div>
            <div className="text-xs text-slate-600 font-semibold mt-1">Ekskul Diikuti</div>
          </div>
        </div>
      </div>

      {/* 2. Kondisi cookie ada tapi belum ada pendaftaran */}
      {ekskulSayaList.length === 0 ? (
        <div className="rounded-2xl border-2 border-dashed border-slate-300 bg-white p-12 text-center shadow-lg">
          <div className="text-7xl mb-4">🤔</div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">Belum Ada Ekskul Terdaftar</h3>
          <p className="text-slate-500 mb-6">Ayo temukan ekskul yang sesuai dengan minatmu!</p>
          <Link
            href="/ekskul"
            className="inline-block rounded-xl bg-gradient-to-r from-red-500 to-orange-500 px-6 py-3 text-base font-bold text-white hover:from-red-600 hover:to-orange-600 transition-all shadow-lg hover:shadow-xl"
          >
            Jelajahi Ekskul →
          </Link>
        </div>
      ) : (
        /* 3. Daftar ekskul yang diikuti dengan tombol Batalkan */
        <div className="grid gap-5 sm:grid-cols-1 lg:grid-cols-2">
          {ekskulSayaList.map((item) => {
            if (!item) return null;
            return (
              <div
                key={item.pendaftarId}
                className="group relative rounded-2xl border-2 border-slate-200 bg-white p-6 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
              >
                {/* Top gradient bar */}
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-red-500 to-orange-500"></div>
                
                <div className="mb-4">
                  <span className="inline-block rounded-lg bg-gradient-to-r from-red-500 to-orange-500 px-3 py-1.5 text-xs font-bold text-white shadow-md">
                    {item.kategori}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-red-600 transition-colors">
                  <Link href={`/ekskul/${item.id}`}>
                    {item.nama}
                  </Link>
                </h3>

                <div className="space-y-2 text-sm text-slate-600 mb-5">
                  <div className="flex items-center gap-2">
                    <span className="text-base">📅</span>
                    <p className="font-medium">{item.hari}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-base">⏰</span>
                    <p>Sesi {item.sesi} ({JAM_SESI[item.sesi]})</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-base">👨‍🏫</span>
                    <p><span className="font-semibold text-slate-800">{item.pembina}</span></p>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                  <Link
                    href={`/ekskul/${item.id}`}
                    className="flex-1 text-center rounded-xl bg-slate-100 px-4 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-200 transition-all"
                  >
                    Lihat Detail
                  </Link>
                  
                  <form action={batalkanPendaftaranAction.bind(null, item.pendaftarId)}>
                    <button
                      type="submit"
                      className="rounded-xl border-2 border-red-200 bg-red-50 px-4 py-2.5 text-sm font-bold text-red-600 hover:bg-red-100 hover:border-red-300 transition-all"
                    >
                      Batalkan ❌
                    </button>
                  </form>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}