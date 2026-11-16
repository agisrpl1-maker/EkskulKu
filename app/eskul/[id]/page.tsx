import { ambilEkskul, ambilAnggota } from '@/data/ambil';
import { ekskul, pendaftar, tambahPendaftar, getJamSesi } from '@/data/ekskul';
import { notFound } from 'next/navigation';
import { cookies } from 'next/headers';
import { Suspense } from 'react';
import { revalidatePath } from 'next/cache';
import FormPendaftaran, { type FormState } from '@/components/FormPendaftaran';

type Props = {
  params: Promise<{ id: string }>;
};

// 1. Generate Metadata untuk Judul Tab[cite: 3]
export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const item = await ambilEkskul(Number(id));

  if (!item) {
    return { title: 'Ekskul tidak ditemukan' };
  }

  return { title: item.nama };
}

// 2. Komponen Anggota Terdaftar (Dibungkus Suspense karena lambat 1,5 detik)[cite: 2, 5]
async function BagianAnggota({ ekskulId, kuota }: { ekskulId: number; kuota: number }) {
  const anggota = await ambilAnggota(ekskulId);
  const cookieStore = await cookies();
  const namaCookie = cookieStore.get('nama')?.value;

  const jumlahTerisi = anggota.length;

  return (
    <div className="mt-8 rounded-xl border border-slate-200 bg-white p-5">
      <h2 className="mb-2 text-xl font-bold text-slate-900">Anggota Terdaftar</h2>
      <p className="text-sm font-medium text-gray-600 mb-4">
        {jumlahTerisi} dari {kuota} tempat terisi
      </p>

      {anggota.length === 0 ? (
        <p className="text-gray-500 italic">Belum ada anggota.</p>
      ) : (
        <ul className="space-y-2">
          {anggota.map((p) => {
            const isKamu = namaCookie && p.nama.toLowerCase() === namaCookie.toLowerCase();
            return (
              <li key={p.nomor} className="flex items-center gap-2 text-gray-800">
                <span>{p.nama} · {p.kelas}</span>
                {isKamu && (
                  <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-0.5 rounded">
                    Kamu
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

// 3. Halaman Utama Detail Ekskul
export default async function DetailEkskulPage({ params }: Props) {
  const { id } = await params;
  const ekskulId = Number(id);
  const dataEkskul = await ambilEkskul(ekskulId);

  // Jika ID ekskul tidak ada, tampilkan 404[cite: 5, 6]
  if (!dataEkskul) {
    notFound();
  }

  // Mengambil nilai default dari cookie jika tersedia
  const cookieStore = await cookies();
  const defaultNama = cookieStore.get('nama')?.value || '';
  const defaultKelas = cookieStore.get('kelas')?.value || '';

  // Server Action untuk Pendaftaran dengan Validasi Ketat[cite: 6]
  async function handleDaftarAction(_prevState: FormState, formData: FormData): Promise<FormState> {
    'use server';
    const nama = (formData.get('nama') as string) || '';
    const kelas = (formData.get('kelas') as string) || '';

    // Validasi per kolom (nama min 3 huruf, kelas min 3 karakter)[cite: 6]
    const namaHurufCount = nama.replace(/[^a-zA-Z]/g, '').length;
    const namaError = namaHurufCount < 3 ? 'Nama minimal 3 huruf' : null;
    const kelasError = kelas.trim().length < 3 ? 'Kelas minimal 3 karakter' : null;

    if (namaError || kelasError) {
      return {
        success: false,
        namaError,
        kelasError,
        message: null,
        nilaiNama: nama,
        nilaiKelas: kelas,
      };
    }

    // Validasi ID ekskul[cite: 6]
    const currentEkskul = await ambilEkskul(ekskulId);
    if (!currentEkskul) {
      return {
        success: false,
        namaError: null,
        kelasError: null,
        message: 'Ekskul tidak ditemukan.',
        nilaiNama: nama,
        nilaiKelas: kelas,
      };
    }

    // Validasi: sudah terdaftar (nama & kelas sama, case-insensitive)[cite: 6]
    const sudahAda = pendaftar.some(
      (p) =>
        p.ekskulId === ekskulId &&
        p.nama.toLowerCase() === nama.trim().toLowerCase() &&
        p.kelas.toLowerCase() === kelas.trim().toLowerCase()
    );
    if (sudahAda) {
      return {
        success: false,
        namaError: null,
        kelasError: null,
        message: `${nama.trim()} (${kelas.trim()}) sudah terdaftar di ${currentEkskul.nama}.`,
        nilaiNama: nama,
        nilaiKelas: kelas,
      };
    }

    // Validasi: kuota penuh[cite: 4, 6]
    const anggotaEkskul = pendaftar.filter((p) => p.ekskulId === ekskulId);
    if (anggotaEkskul.length >= currentEkskul.kuota) {
      return {
        success: false,
        namaError: null,
        kelasError: null,
        message: `Kuota ${currentEkskul.nama} sudah penuh (${currentEkskul.kuota} orang).`,
        nilaiNama: nama,
        nilaiKelas: kelas,
      };
    }

    // Validasi: bentrok jadwal (hari dan sesi sama di ekskul lain)[cite: 6]
    const ekskulDiikutiMurid = pendaftar
      .filter((p) => p.nama.toLowerCase() === nama.trim().toLowerCase())
      .map((p) => ekskul.find((e) => e.id === p.ekskulId))
      .filter(Boolean);

    const bentrokEkskul = ekskulDiikutiMurid.find(
      (e) => e && e.id !== ekskulId && e.hari === currentEkskul.hari && e.sesi === currentEkskul.sesi
    );

    if (bentrokEkskul) {
      return {
        success: false,
        namaError: null,
        kelasError: null,
        message: `Jadwal bentrok dengan ${bentrokEkskul.nama} (${bentrokEkskul.hari}, ${bentrokEkskul.sesi}).`,
        nilaiNama: nama,
        nilaiKelas: kelas,
      };
    }

    // Tambahkan pendaftar jika semua validasi lolos[cite: 1, 6]
    const nomorBaru = tambahPendaftar({
      ekskulId,
      nama: nama.trim(),
      kelas: kelas.trim(),
    });

    // Simpan nama dan kelas ke cookie[cite: 6]
    const cStore = await cookies();
    cStore.set('nama', nama.trim());
    cStore.set('kelas', kelas.trim());

    // Revalidasi halaman agar langsung berubah tanpa F5[cite: 6]
    revalidatePath(`/ekskul/${ekskulId}`);
    revalidatePath('/eskul');

    return {
      success: true,
      message: `Pendaftar #${nomorBaru} berhasil: ${currentEkskul.nama}, ${currentEkskul.hari}, ${currentEkskul.sesi} (${getJamSesi(currentEkskul.sesi)}).`,
      namaError: null,
      kelasError: null,
      nilaiNama: nama.trim(),
      nilaiKelas: kelas.trim(),
    };
  }

  return (
    <main className="mx-auto max-w-2xl">
      {/* Informasi Ekskul[cite: 5] */}
      <div className="mb-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <span className="text-xs font-semibold text-blue-600 uppercase bg-blue-50 px-2 py-1 rounded">
          {dataEkskul.kategori}
        </span>
        <h1 className="text-3xl font-bold text-gray-900 mt-2 mb-4">{dataEkskul.nama}</h1>
        
        <div className="space-y-2 text-gray-700 text-sm">
          <p><strong className="w-24 inline-block">Hari:</strong> {dataEkskul.hari}</p>
          <p><strong className="w-24 inline-block">Sesi & Jam:</strong> {dataEkskul.sesi} ({getJamSesi(dataEkskul.sesi)})</p>
          <p><strong className="w-24 inline-block">Pembina:</strong> {dataEkskul.pembina}</p>
          <p><strong className="w-24 inline-block">Kuota:</strong> {dataEkskul.kuota} tempat</p>
        </div>
      </div>

      {/* Formulir Pendaftaran Interaktif dengan Client Component */}
      <FormPendaftaran
        action={handleDaftarAction}
        defaultNama={defaultNama}
        defaultKelas={defaultKelas}
      />

      {/* Bagian Anggota Terdaftar (Suspense 1.5 detik)[cite: 2, 5] */}
      <Suspense fallback={<p className="mt-8 text-slate-400 italic">Memuat anggota...</p>}>
        <BagianAnggota ekskulId={ekskulId} kuota={dataEkskul.kuota} />
      </Suspense>
    </main>
  );
}