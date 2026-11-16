import { Suspense } from "react";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { ekskul, JAM_SESI } from "@/data/ekskul";
import { ambilEkskul } from "@/data/ambil";
import FormPendaftaran from "@/components/FormPendaftaran";
import DaftarAnggota from "@/components/DaftarAnggota";
import { type Metadata } from "next";
import Link from "next/link";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const { id } = await params;
    const item = ekskul.find((e) => e.id === Number(id));
    if (!item) return { title: 'Ekskul tidak ditemukan · EkskulKu' };
    return {
        title: `${item.nama} · EkskulKu`,
    };
}

export default async function DetailEkskul({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const item = await ambilEkskul(Number(id));
    if (!item) notFound();

    const cookieStore = await cookies();
    const namaAwal = cookieStore.get("nama")?.value ?? "";
    const kelasAwal = cookieStore.get("kelas")?.value ?? "";

    return (
        <div className="max-w-4xl mx-auto">
            {/* Back button */}
            <Link 
                href="/ekskul"
                className="inline-flex items-center gap-2 text-slate-600 hover:text-red-600 font-medium mb-6 transition-colors"
            >
                <span>←</span>
                <span>Kembali ke Daftar Ekskul</span>
            </Link>

            <article className="rounded-2xl border border-slate-200 bg-white shadow-xl overflow-hidden">
                {/* Header gradient */}
                <div className="h-2 bg-gradient-to-r from-red-500 via-orange-500 to-red-500"></div>
                
                <div className="p-8">
                    <div className="mb-4">
                        <span className="rounded-lg bg-gradient-to-r from-red-500 to-orange-500 px-4 py-2 text-sm font-bold text-white shadow-md">
                            {item.kategori}
                        </span>
                    </div>

                    <h1 className="text-4xl font-extrabold text-slate-900 mb-6 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text">
                        {item.nama}
                    </h1>
                    
                    {/* Info Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                        <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-5 border border-red-100">
                            <div className="flex items-center gap-3 mb-2">
                                <span className="text-2xl">📅</span>
                                <h3 className="font-bold text-slate-900">Jadwal</h3>
                            </div>
                            <p className="text-slate-700 font-medium">
                                Setiap {item.hari}
                            </p>
                            <p className="text-slate-600 text-sm mt-1">
                                Sesi {item.sesi} • {JAM_SESI[item.sesi]}
                            </p>
                        </div>

                        <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl p-5 border border-orange-100">
                            <div className="flex items-center gap-3 mb-2">
                                <span className="text-2xl">👨‍🏫</span>
                                <h3 className="font-bold text-slate-900">Pembina</h3>
                            </div>
                            <p className="text-slate-700 font-semibold text-lg">
                                {item.pembina}
                            </p>
                        </div>
                    </div>

                    <div className="mt-8 pt-8 border-t-2 border-slate-100">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="text-2xl">📝</span>
                            <h2 className="text-2xl font-bold text-slate-900">Formulir Pendaftaran</h2>
                        </div>
                        <FormPendaftaran ekskul={item} namaAwal={namaAwal} kelasAwal={kelasAwal} />
                    </div>

                    <section className="mt-8 pt-8 border-t-2 border-slate-100">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="text-2xl">👥</span>
                            <h2 className="text-2xl font-bold text-slate-900">Anggota Terdaftar</h2>
                        </div>
                        <Suspense fallback={
                            <div className="text-center py-8">
                                <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-slate-200 border-t-red-600"></div>
                                <p className="text-slate-400 text-sm mt-3">Memuat anggota...</p>
                            </div>
                        }>
                            <DaftarAnggota ekskulId={item.id} />
                        </Suspense>
                    </section>
                </div>
            </article>
        </div>
    );
}