import { TournamentSkeleton } from "@/features/tournament/components/TournamentSkeleton";

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
      <TournamentSkeleton count={6} />
    </div>
  );
}
