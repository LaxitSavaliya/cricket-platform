import { Calendar, ChevronRight, MapPin, Trophy, Users } from "lucide-react";
import Link from "next/link";

import type { TournamentCardProps } from "../tournament.types";

export function TournamentCard({ tournament }: TournamentCardProps) {
  const formattedDate = new Date(tournament.createdAt).toLocaleDateString(
    "en-US",
    {
      month: "short",
      day: "numeric",
      year: "numeric",
    },
  );

  const locationText = [tournament.city, tournament.state]
    .filter(Boolean)
    .join(", ");

  return (
    <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-zinc-200/80 bg-white p-6 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-md">
      {/* Top Banner Accent */}
      <div className="absolute inset-x-0 top-0 h-1.5 bg-linear-to-r from-zinc-800 via-zinc-600 to-zinc-900" />

      <div>
        {/* Header with Icon & Status */}
        <div className="flex items-start justify-between gap-3 pt-1">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-zinc-900 text-white shadow-xs">
            {tournament.logoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={tournament.logoUrl}
                alt={tournament.name}
                className="h-full w-full rounded-xl object-cover"
              />
            ) : (
              <Trophy className="h-5 w-5 text-amber-400" />
            )}
          </div>

          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Active
          </span>
        </div>

        {/* Tournament Name & Slug */}
        <div className="mt-4">
          <h3 className="text-lg font-bold tracking-tight text-zinc-950 group-hover:text-zinc-800">
            {tournament.name}
          </h3>
          <p className="mt-0.5 text-xs text-zinc-400 font-mono">
            /{tournament.slug}
          </p>
        </div>

        {/* Metadata Details */}
        <div className="mt-5 space-y-2.5 border-t border-zinc-100 pt-4 text-xs text-zinc-600">
          {locationText && (
            <div className="flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5 text-zinc-400 shrink-0" />
              <span className="truncate">{locationText}</span>
            </div>
          )}

          <div className="flex items-center gap-2">
            <Users className="h-3.5 w-3.5 text-zinc-400 shrink-0" />
            <span>
              <strong className="text-zinc-800">{tournament.teamsCount}</strong>{" "}
              {tournament.teamsCount === 1
                ? "team registered"
                : "teams registered"}
            </span>
          </div>

          <div className="flex items-center gap-2 text-zinc-400">
            <Calendar className="h-3.5 w-3.5 shrink-0" />
            <span>Created {formattedDate}</span>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="mt-6 flex items-center justify-between gap-2 border-t border-zinc-100 pt-4">
        <Link
          href={`/tournament/${tournament.slug}`}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-900 hover:text-zinc-600 transition-colors"
        >
          <span>View Details</span>
          <ChevronRight className="h-3.5 w-3.5" />
        </Link>

        <div className="flex items-center gap-2">
          <Link
            href={`/teams?tournament=${tournament.slug}`}
            className="rounded-lg bg-zinc-100 px-2.5 py-1 text-[11px] font-medium text-zinc-700 hover:bg-zinc-200 transition-colors"
          >
            Teams
          </Link>
          <Link
            href={`/matches?tournament=${tournament.slug}`}
            className="rounded-lg bg-zinc-100 px-2.5 py-1 text-[11px] font-medium text-zinc-700 hover:bg-zinc-200 transition-colors"
          >
            Matches
          </Link>
        </div>
      </div>
    </div>
  );
}
