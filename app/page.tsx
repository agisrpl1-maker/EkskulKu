import Link from "next/link";
import { ekskul, pendaftar } from '@/data/ekskul';
import KartuEkskul from '@/components/KartuEkskul';

export default function Beranda() {
  // Mengambil beberapa ekskul untuk ditampilkan di beranda
  const terdekat = ekskul.slice(0, 6);

  const hitungPendaftar = (id: number) => 
    pendaftar.filter((p) => p.ekskulId === id).length;

  return (
    <div className="max-w-6xl mx-auto">
      {/* Hero Section dengan gradient yang lebih menarik */}
      <section className="relative py-20 text-center overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-red-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
          <div className="absolute top-20 right-10 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative">
          <div className="inline-block mb-4 px-4 py-2 bg-red-100 rounded-full">
            <span className="text-red-600 font-semibold text-sm">✨ Platform Pendaftaran Ekskul</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 mb-4 leading-tight">
            Temukan{" "}
            <span className="bg-gradient-to-r from-red-600 via-orange-500 to-red-600 bg-clip-text text-transparent">
              Ekskul Seru
            </span>
            <br />
            di Sekolahmu! 🎉
          </h1>
          
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Olahraga, seni, akademik, dan teknologi. <br/>
            Pilih dan daftar kegiatannya langsung di sini dengan mudah!
          </p>
          
          <div className="mt-8 flex items-center justify-center gap-4">
            <Link
              href="/ekskul"
              className="group relative rounded-xl bg-gradient-to-r from-red-500 to-orange-500 px-8 py-4 font-bold text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              <span className="relative z-10">Lihat Semua Ekskul →</span>
            </Link>
            
            <Link
              href="/saya"
              className="rounded-xl border-2 border-slate-300 bg-white px-8 py-4 font-semibold text-slate-700 hover:border-red-500 hover:text-red-600 transition-all duration-300 hover:shadow-lg"
            >
              Ekskul Saya
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 text-center hover:shadow-xl transition-shadow">
            <div className="text-4xl mb-2">📚</div>
            <div className="text-3xl font-bold text-slate-900">{ekskul.length}</div>
            <div className="text-slate-600 font-medium">Ekskul Tersedia</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 text-center hover:shadow-xl transition-shadow">
            <div className="text-4xl mb-2">👥</div>
            <div className="text-3xl font-bold text-slate-900">{pendaftar.length}</div>
            <div className="text-slate-600 font-medium">Siswa Terdaftar</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 text-center hover:shadow-xl transition-shadow">
            <div className="text-4xl mb-2">🏆</div>
            <div className="text-3xl font-bold text-slate-900">4</div>
            <div className="text-slate-600 font-medium">Kategori</div>
          </div>
        </div>
      </section>

      {/* Daftar Ekskul Pilihan */}
      <section className="py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">Ekskul Pilihan ⭐</h2>
            <p className="text-slate-600 mt-1">Ekskul populer dan recommended untuk kamu</p>
          </div>
          <Link 
            href="/ekskul"
            className="text-red-600 hover:text-red-700 font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all"
          >
            Lihat Semua <span>→</span>
          </Link>
        </div>
        
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {terdekat.map((e) => (
            <KartuEkskul 
              key={e.id} 
              ekskul={e} 
              jumlahPendaftar={hitungPendaftar(e.id)} 
            />
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 my-12">
        <div className="bg-gradient-to-r from-red-500 via-orange-500 to-red-500 rounded-3xl p-12 text-center shadow-2xl relative overflow-hidden">
          {/* Decorative circles */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/10 rounded-full translate-x-1/2 translate-y-1/2"></div>
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Belum Menemukan Ekskul yang Cocok? 🤔
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              Jelajahi semua ekskul yang tersedia dan temukan yang paling sesuai dengan minat dan bakatmu!
            </p>
            <Link
              href="/ekskul"
              className="inline-block bg-white text-red-600 font-bold px-8 py-4 rounded-xl hover:bg-slate-50 transition-all shadow-xl hover:shadow-2xl hover:scale-105"
            >
              Jelajahi Semua Ekskul →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}