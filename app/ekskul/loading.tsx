export default function LoadingEkskul() {
  return (
    <main className="max-w-6xl mx-auto animate-pulse">
      {/* Header Skeleton */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 bg-slate-300 rounded-xl"></div>
          <div className="flex-1">
            <div className="h-8 bg-slate-300 rounded w-1/3 mb-2"></div>
            <div className="h-4 bg-slate-200 rounded w-1/4"></div>
          </div>
        </div>
      </div>

      {/* Filter Skeleton */}
      <div className="mb-6 rounded-2xl border-2 border-slate-200 bg-white p-6 shadow-lg">
        <div className="h-6 bg-slate-300 rounded w-1/4 mb-4"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="h-12 bg-slate-200 rounded-xl"></div>
          <div className="h-12 bg-slate-200 rounded-xl"></div>
          <div className="h-12 bg-slate-200 rounded-xl"></div>
        </div>
      </div>

      {/* Counter Skeleton */}
      <div className="mb-6 h-16 bg-slate-200 rounded-xl"></div>

      {/* Grid Kartu Skeleton */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="rounded-2xl border-2 border-slate-200 bg-white p-6 shadow-md">
            <div className="mb-3 h-6 w-20 bg-slate-300 rounded-lg"></div>
            <div className="h-7 bg-slate-300 rounded w-3/4 mb-3"></div>
            <div className="space-y-2 mb-4">
              <div className="h-4 bg-slate-200 rounded w-full"></div>
              <div className="h-4 bg-slate-200 rounded w-2/3"></div>
            </div>
            <div className="border-t pt-4">
              <div className="h-2 bg-slate-200 rounded-full mb-3"></div>
              <div className="flex justify-between items-center">
                <div className="h-4 bg-slate-200 rounded w-24"></div>
                <div className="h-9 bg-slate-300 rounded-xl w-20"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}