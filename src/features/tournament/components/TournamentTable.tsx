import { Calendar, ChevronRight, MapPin, Trophy, Users } from "lucide-react";
import Link from "next/link";

import type { TournamentTableProps } from "../tournament.types";

export function TournamentTable({ tournaments }: TournamentTableProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-200/80 bg-white shadow-xs">
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
          <tbody className="divide-y divide-zinc-100 text-zinc-700">
            {tournaments.map((tournament) => {
              const locationText = [tournament.city, tournament.state]
                .filter(Boolean)
                .join(", ");

              const formattedDate = new Date(
                tournament.createdAt,
              ).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              });

              return (
                <tr
                  key={tournament.slug}
                  className="transition-colors hover:bg-zinc-50/70"
                >
                  <td className="py-4 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-zinc-900 text-white font-semibold">
                        {tournament.logoUrl ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={tournament.logoUrl}
                            alt={tournament.name}
                            className="h-full w-full rounded-xl object-cover"
                          />
                        ) : (
                          <Trophy className="h-4 w-4 text-amber-400" />
                        )}
                      </div>
                      <div>
                        <p className="font-bold text-zinc-950">
                          {tournament.name}
                        </p>
                        <p className="text-[11px] font-mono text-zinc-400">
                          /{tournament.slug}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-3 py-4 text-zinc-600">
                    {locationText ? (
                      <div className="flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5 text-zinc-400 shrink-0" />
                        <span>{locationText}</span>
                      </div>
                    ) : (
                      <span className="text-zinc-400">—</span>
                    )}
                  </td>

                  <td className="px-3 py-4">
                    <div className="flex items-center gap-1.5">
                      <Users className="h-3.5 w-3.5 text-zinc-400 shrink-0" />
                      <span className="font-semibold text-zinc-900">
                        {tournament.teamsCount}
                      </span>
                    </div>
                  </td>

                  <td className="px-3 py-4 text-zinc-500">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5 text-zinc-400 shrink-0" />
                      <span>{formattedDate}</span>
                    </div>
                  </td>

                  <td className="px-3 py-4">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Active
                    </span>
                  </td>

                  <td className="py-4 pl-3 pr-6 text-right">
                    <Link
                      href={`/tournament/${tournament.slug}`}
                      className="inline-flex items-center gap-1 font-semibold text-zinc-900 hover:text-zinc-600"
                    >
                      <span>Manage</span>
                      <ChevronRight className="h-3.5 w-3.5" />
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
