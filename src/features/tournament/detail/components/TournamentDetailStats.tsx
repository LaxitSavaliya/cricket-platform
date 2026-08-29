import { Flame, Medal, Users } from "lucide-react";

import type { TournamentDetailData } from "../tournament-detail.types";

interface TournamentDetailStatsProps {
  data: TournamentDetailData;
}

export function TournamentDetailStats({ data }: TournamentDetailStatsProps) {
  const { summaryStats } = data;
  const matchPercent = Math.round(
    (summaryStats.completedMatches / summaryStats.totalMatches) * 100,
  );

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {/* 1. Total Teams Card */}
      <div className="flex items-center gap-4 rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-xs">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-zinc-100 text-zinc-900">
          <Users className="h-6 w-6" />
        </div>
        <div>
          <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
            Registered Teams
          </p>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-zinc-950">
              {summaryStats.totalTeams}
            </span>
            <span className="text-xs text-zinc-400 font-medium">
              2 Groups (A & B)
            </span>
          </div>
        </div>
      </div>

      {/* 2. Matches Completion Card */}
      <div className="flex flex-col justify-between rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-xs">
        <div className="flex items-center justify-between">
          <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
            Matches Progress
          </p>
          <span className="text-xs font-semibold text-zinc-800">
            {matchPercent}%
          </span>
        </div>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-2xl font-bold text-zinc-950">
            {summaryStats.completedMatches}
          </span>
          <span className="text-xs text-zinc-400 font-medium">
            / {summaryStats.totalMatches} matches completed
          </span>
        </div>
        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-zinc-100">
          <div
            className="h-full rounded-full bg-zinc-900 transition-all duration-500"
            style={{ width: `${matchPercent}%` }}
          />
        </div>
      </div>

      {/* 3. Top Batter (Orange Cap) */}
      <div className="flex items-center gap-4 rounded-2xl border border-amber-200/70 bg-linear-to-br from-amber-50/50 to-white p-5 shadow-xs">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-500 text-white shadow-xs">
          <Flame className="h-6 w-6" />
        </div>
        <div className="min-w-0">
          <p className="text-xs font-semibold text-amber-700 uppercase tracking-wider flex items-center gap-1">
            Top Batter (Orange Cap)
          </p>
          <p className="mt-0.5 truncate text-base font-bold text-zinc-950">
            {summaryStats.topBatter.name}
          </p>
          <p className="text-xs text-zinc-600">
            <strong className="text-zinc-900 font-bold">
              {summaryStats.topBatter.runs} runs
            </strong>{" "}
            • SR {summaryStats.topBatter.strikeRate}
          </p>
        </div>
      </div>

      {/* 4. Top Bowler (Purple Cap) */}
      <div className="flex items-center gap-4 rounded-2xl border border-purple-200/70 bg-linear-to-br from-purple-50/50 to-white p-5 shadow-xs">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-purple-600 text-white shadow-xs">
          <Medal className="h-6 w-6" />
        </div>
        <div className="min-w-0">
          <p className="text-xs font-semibold text-purple-700 uppercase tracking-wider flex items-center gap-1">
            Top Bowler (Purple Cap)
          </p>
          <p className="mt-0.5 truncate text-base font-bold text-zinc-950">
            {summaryStats.topBowler.name}
          </p>
          <p className="text-xs text-zinc-600">
            <strong className="text-zinc-900 font-bold">
              {summaryStats.topBowler.wickets} wickets
            </strong>{" "}
            • Econ {summaryStats.topBowler.economy}
          </p>
        </div>
      </div>
    </div>
  );
}
