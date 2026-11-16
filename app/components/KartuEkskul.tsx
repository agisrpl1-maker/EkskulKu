import Link from "next/link";
import type { Ekskul } from "@/data/ekskul";

const latarKategori: Record<Ekskul["kategori"], string> = {
  Olahraga: "linear-gradient(120deg, #059669, #84cc16)",
  Seni: "linear-gradient(120deg, #9333ea, #ec4899)",
  Akademik: "linear-gradient(120deg, #2563eb, #06b6d4)",
  Teknologi: "linear-gradient(120deg, #4f46e5, #0ea5e9)",
};

export default function KartuEkskul({ ekskul }: { ekskul: Ekskul }) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div
        className="relative mb-3 flex h-36 items-end overflow-hidden rounded-lg p-4 text-white"
        style={{
          backgroundColor: "#2563eb",
          backgroundImage: `radial-gradient(circle at 12% 18%, transparent 13px, rgba(255,255,255,.45) 14px, transparent 15px), radial-gradient(circle at 28% 62%, transparent 22px, rgba(255,255,255,.35) 23px, transparent 24px), radial-gradient(circle at 72% 24%, transparent 18px, rgba(255,255,255,.4) 19px, transparent 20px), radial-gradient(circle at 88% 72%, transparent 26px, rgba(255,255,255,.35) 27px, transparent 28px), ${latarKategori[ekskul.kategori]}`,
        }}
      >
        <div className="relative z-10">
          <p className="text-[10px] font-medium uppercase tracking-wide text-white/80">
            {ekskul.kategori}
          </p>
          <h3 className="mt-1 text-lg font-bold leading-tight drop-shadow-sm">{ekskul.nama}</h3>
        </div>
      </div>

      <span className="rounded bg-blue-100 px-2 py-0.5 text-xs text-blue-700">
        {ekskul.kategori}
      </span>

      <p className="text-sm text-slate-500">
        {ekskul.hari} · Sesi {ekskul.sesi}
      </p>

      <p className="mt-2 text-sm font-medium text-slate-700">{ekskul.pembina}</p>
      <p className="mt-1 text-sm text-slate-600">Kuota {ekskul.kuota} anggota</p>

      <Link
        href={`/eskul/${ekskul.id}`}
        className="mt-3 inline-block rounded bg-blue-600 px-3 py-1.5 text-sm text-white hover:bg-blue-700"
      >
        Lihat detail
      </Link>
    </article>
  );
}
