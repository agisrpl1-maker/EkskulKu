import { ekskul } from '@/data/ekskul';
import KartuEkskul from '@/app/components/KartuEkskul';

export default function KatalogEkskulPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Katalog Ekskul</h1>
        <p className="mt-2 text-sm text-slate-400">{ekskul.length} ekskul tersedia</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {ekskul.map((item) => (
          <KartuEkskul key={item.id} ekskul={item} />
        ))}
      </div>
    </div>
  );
}