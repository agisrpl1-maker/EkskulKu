import { type Metadata } from "next";
import { ambilSemuaEkskul } from "@/data/ambil";
import { pendaftar } from "@/data/ekskul";
import KartuEkskul from "@/components/KartuEkskul";
import KontrolKatalogEkskul from "@/components/KontrolKatalog";

export const metadata: Metadata = {
  title: "Daftar Ekskul · EkskulKu",
};

type PageProps = {
  searchParams: Promise<{
    cari?: string;
    kategori?: string;
    hari?: string;
  }>;
};

export default async function PageEkskul({ searchParams }: PageProps) {
  const { cari, kategori, hari } = await searchParams;
  const semuaEkskul = await ambilSemuaEkskul();

  const hitungPendaftar = (id: number) => 
    pendaftar.filter((p) => p.ekskulId === id).length;

  // Saring di server berdasarkan parameter URL (cari, kategori, hari)
  const hasilFilter = semuaEkskul.filter((item) => {
    const matchCari = !cari || 
      item.nama.toLowerCase().includes(cari.toLowerCase()) || 
      item.pembina.toLowerCase().includes(cari.toLowerCase());
    const matchKategori = !kategori || kategori === "Semua" || item.kategori === kategori;
    const matchHari = !hari || hari === "Semua" || item.hari === hari;
    
    return matchCari && matchKategori && matchHari;
  });

  return (
    <main className="max-w-6xl mx-auto">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center shadow-lg">
            <span className="text-white text-2xl">📚</span>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Daftar Ekstrakurikuler</h1>
            <p className="text-slate-600 text-sm">Temukan ekskul yang sesuai dengan minatmu</p>
          </div>
        </div>
      </div>
      
      <KontrolKatalogEkskul />

      {/* Results counter with better design */}
      <div className="flex items-center justify-between mb-6 bg-white rounded-xl p-4 shadow-md border border-slate-200">
        <p className="text-sm font-semibold text-slate-700 flex items-center gap-2">
          <span className="text-lg">🔍</span>
          <span>
            Ditemukan <span className="text-red-600 text-lg">{hasilFilter.length}</span> ekskul
          </span>
        </p>
        {(cari || (kategori && kategori !== "Semua") || (hari && hari !== "Semua")) && (
          <p className="text-xs text-slate-500">
            Filter aktif
          </p>
        )}
      </div>

      {hasilFilter.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">😔</div>
          <p className="text-slate-500 text-lg font-medium">Tidak ada ekskul yang cocok dengan filter ini</p>
          <p className="text-slate-400 text-sm mt-2">Coba ubah kriteria pencarian kamu</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {hasilFilter.map((item) => (
            <KartuEkskul
              key={item.id}
              ekskul={item}
              jumlahPendaftar={hitungPendaftar(item.id)}
            />
          ))}
        </div>
      )}
    </main>
  );
}