export default function TournamentLoading() {
  return (
    <div className="flex flex-col gap-6 animate-pulse">
      {/* Top Banner & Controls Header Skeleton */}
      <div className="flex flex-col gap-5">
        {/* Title & Action Button */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <div className="h-8 w-44 rounded-xl bg-zinc-200" />
              <div className="h-5.5 w-24 rounded-full bg-zinc-100" />
            </div>
            <p className="mt-1 h-4.5 w-80 rounded-lg bg-zinc-100" />
          </div>
          <div className="h-9.5 w-34 rounded-xl bg-zinc-200" />
        </div>

        {/* Search and Filters Bar */}
        <div className="flex flex-col gap-3 rounded-2xl border border-zinc-200/80 bg-white p-3 shadow-xs sm:flex-row sm:items-center sm:justify-between">
          <div className="h-9.5 flex-1 rounded-xl bg-zinc-100" />
          <div className="flex items-center gap-2.5">
            <div className="h-9.5 w-44 rounded-xl bg-zinc-100" />
            <div className="h-8.5 w-16 rounded-xl bg-zinc-100" />
          </div>
        </div>
      </div>

      {/* Stats Summary Cards Skeleton */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="flex items-center gap-4 rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-xs"
          >
            <div className="h-12 w-12 shrink-0 rounded-xl bg-zinc-100" />
            <div className="space-y-1.5 flex-1">
              <div className="h-3.5 w-24 rounded bg-zinc-100" />
              <div className="h-8 w-12 rounded-lg bg-zinc-200" />
              <div className="h-3.5 w-32 rounded bg-zinc-100" />
            </div>
          </div>
        ))}
      </div>

      {/* Tournament Cards Grid Skeleton */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="relative flex flex-col justify-between overflow-hidden rounded-2xl border border-zinc-200/80 bg-white p-6 shadow-xs"
          >
            {/* Top Accent Line */}
            <div className="absolute inset-x-0 top-0 h-1.5 bg-linear-to-r from-zinc-800 via-zinc-600 to-zinc-900 opacity-30" />

            <div>
              {/* Header Icon & Status Badge */}
              <div className="flex items-start justify-between gap-3 pt-1">
                <div className="h-11 w-11 shrink-0 rounded-xl bg-zinc-200" />
                <div className="h-6 w-18 rounded-full bg-zinc-100" />
              </div>

              {/* Tournament Name & Slug */}
              <div className="mt-4">
                <div className="h-7 w-3/4 rounded-lg bg-zinc-200" />
                <div className="mt-1 h-3.5 w-28 rounded bg-zinc-100" />
              </div>

              {/* Metadata Details */}
              <div className="mt-5 space-y-2.5 border-t border-zinc-100 pt-4 text-xs">
                <div className="flex items-center gap-2">
                  <div className="h-3.5 w-3.5 shrink-0 rounded-full bg-zinc-200" />
                  <div className="h-3.5 w-36 rounded bg-zinc-100" />
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3.5 w-3.5 shrink-0 rounded-full bg-zinc-200" />
                  <div className="h-3.5 w-32 rounded bg-zinc-100" />
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3.5 w-3.5 shrink-0 rounded-full bg-zinc-200" />
                  <div className="h-3.5 w-28 rounded bg-zinc-100" />
                </div>
              </div>
            </div>

            {/* Action Footer */}
            <div className="mt-6 flex items-center justify-between gap-2 border-t border-zinc-100 pt-4">
              <div className="h-4 w-20 rounded bg-zinc-200" />
              <div className="flex items-center gap-2">
                <div className="h-6.5 w-12 rounded-lg bg-zinc-100" />
                <div className="h-6.5 w-14 rounded-lg bg-zinc-100" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
