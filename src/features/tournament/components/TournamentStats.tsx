import { MapPin, Trophy, Users } from "lucide-react";

import type { TournamentStatsProps } from "../tournament.types";

export function TournamentStats({
  tournaments,
  totalCount,
}: TournamentStatsProps) {
  const totalTournaments = totalCount ?? tournaments.length;
  const totalTeams = tournaments.reduce(
    (sum, t) => sum + (t.teamsCount || 0),
    0,
  );
  const uniqueCities = new Set(
    tournaments
      .map((t) => t.city)
      .filter((c): c is string => Boolean(c && c.trim())),
  ).size;

  const stats = [
    {
      label: "Total Tournaments",
      value: totalTournaments,
      icon: Trophy,
      iconColor: "text-amber-600 bg-amber-50 border-amber-100",
      description: "Active championships",
    },
    {
      label: "Participating Teams",
      value: totalTeams,
      icon: Users,
      iconColor: "text-blue-600 bg-blue-50 border-blue-100",
      description: "Across all tournaments",
    },
    {
      label: "Host Cities",
      value: uniqueCities,
      icon: MapPin,
      iconColor: "text-emerald-600 bg-emerald-50 border-emerald-100",
      description: "Tournament locations",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.label}
            className="flex items-center gap-4 rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-xs transition-all hover:border-zinc-300"
          >
            <div
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border ${stat.iconColor}`}
            >
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-medium text-zinc-500">{stat.label}</p>
              <h3 className="text-2xl font-bold tracking-tight text-zinc-950">
                {stat.value}
              </h3>
              <p className="text-xs text-zinc-400">{stat.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
