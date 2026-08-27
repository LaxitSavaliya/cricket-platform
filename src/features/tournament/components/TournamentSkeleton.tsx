import type { TournamentSkeletonProps } from "../tournament.types";

export function TournamentSkeleton({
  viewMode = "grid",
  count = 6,
}: TournamentSkeletonProps) {
  if (viewMode === "list") {
    return (
      <div className="overflow-hidden rounded-2xl border border-zinc-200/80 bg-white shadow-xs animate-pulse">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-zinc-200 bg-zinc-50/60 font-semibold text-zinc-600">
              <tr>
                <th className="py-3.5 pl-6 pr-3">Tournament</th>
                <th className="px-3 py-3.5">Location</th>
                <th className="px-3 py-3.5">Teams</th>
                <th className="px-3 py-3.5">Created</th>
                <th className="px-3 py-3.5">Status</th>
                <th className="py-3.5 pl-3 pr-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {Array.from({ length: count }).map((_, index) => (
                <tr key={index}>
                  <td className="py-4 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 shrink-0 rounded-xl bg-zinc-200" />
                      <div className="space-y-1.5 flex-1">
                        <div className="h-3.5 w-36 rounded bg-zinc-200" />
                        <div className="h-2.5 w-20 rounded bg-zinc-100" />
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-4">
                    <div className="flex items-center gap-1.5">
                      <div className="h-3.5 w-3.5 rounded-full bg-zinc-200" />
                      <div className="h-3 w-24 rounded bg-zinc-100" />
                    </div>
                  </td>
                  <td className="px-3 py-4">
                    <div className="flex items-center gap-1.5">
                      <div className="h-3.5 w-3.5 rounded-full bg-zinc-200" />
                      <div className="h-3 w-8 rounded bg-zinc-100" />
                    </div>
                  </td>
                  <td className="px-3 py-4">
                    <div className="flex items-center gap-1.5">
                      <div className="h-3.5 w-3.5 rounded-full bg-zinc-200" />
                      <div className="h-3 w-20 rounded bg-zinc-100" />
                    </div>
                  </td>
                  <td className="px-3 py-4">
                    <div className="h-5 w-16 rounded-full bg-zinc-100" />
                  </td>
                  <td className="py-4 pl-3 pr-6 text-right">
                    <div className="inline-block h-3.5 w-14 rounded bg-zinc-200" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3 animate-pulse">
      {Array.from({ length: count }).map((_, index) => (
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
  );
}
