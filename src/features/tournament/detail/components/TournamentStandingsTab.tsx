"use client";

import { useMemo, useState } from "react";

import type { PointsTableEntry } from "../tournament-detail.types";

interface TournamentStandingsTabProps {
  pointsTable: PointsTableEntry[];
}

export function TournamentStandingsTab({
  pointsTable,
}: TournamentStandingsTabProps) {
  const [selectedGroup, setSelectedGroup] = useState<
    "Group A" | "Group B" | "combined"
  >("Group A");

  const displayedEntries = useMemo(() => {
    if (selectedGroup === "combined") {
      return [...pointsTable].sort((a, b) => {
        if (b.points !== a.points) return b.points - a.points;
        return b.netRunRate - a.netRunRate;
      });
    }
    return pointsTable.filter((entry) => entry.group === selectedGroup);
  }, [pointsTable, selectedGroup]);

  return (
    <div className="space-y-6">
      {/* Group Toggle Pills & Title */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-base font-bold text-zinc-950">
            Tournament Standings & Net Run Rate (NRR)
          </h3>
          <p className="text-xs text-zinc-500">
            Official group stage points table with qualification threshold
          </p>
        </div>

        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-zinc-100/80 border border-zinc-200/60 w-fit">
          <button
            type="button"
            onClick={() => setSelectedGroup("Group A")}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
              selectedGroup === "Group A"
                ? "bg-white text-zinc-950 shadow-2xs"
                : "text-zinc-600 hover:text-zinc-950"
            }`}
          >
            Group A
          </button>
          <button
            type="button"
            onClick={() => setSelectedGroup("Group B")}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
              selectedGroup === "Group B"
                ? "bg-white text-zinc-950 shadow-2xs"
                : "text-zinc-600 hover:text-zinc-950"
            }`}
          >
            Group B
          </button>
          <button
            type="button"
            onClick={() => setSelectedGroup("combined")}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
              selectedGroup === "combined"
                ? "bg-white text-zinc-950 shadow-2xs"
                : "text-zinc-600 hover:text-zinc-950"
            }`}
          >
            Overall Table
          </button>
        </div>
      </div>

      {/* Points Table */}
      <div className="overflow-hidden rounded-2xl border border-zinc-200/80 bg-white shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-zinc-200 bg-zinc-50/75 font-semibold text-zinc-600">
              <tr>
                <th className="py-3.5 pl-6 pr-2">POS</th>
                <th className="px-3 py-3.5">TEAM</th>
                {selectedGroup === "combined" && (
                  <th className="px-3 py-3.5">GROUP</th>
                )}
                <th className="px-3 py-3.5 text-center">P</th>
                <th className="px-3 py-3.5 text-center">W</th>
                <th className="px-3 py-3.5 text-center">L</th>
                <th className="px-3 py-3.5 text-center">T</th>
                <th className="px-3 py-3.5 text-center">NR</th>
                <th className="px-3 py-3.5 text-right">NRR</th>
                <th className="px-4 py-3.5 text-right font-bold text-zinc-950">
                  PTS
                </th>
                <th className="py-3.5 pl-4 pr-6 text-center">LAST 4 FORM</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 text-zinc-700">
              {displayedEntries.map((team, index) => {
                const pos = index + 1;
                const isQualifyingZone =
                  selectedGroup !== "combined" ? pos <= 2 : pos <= 4;
                const isPositiveNrr = team.netRunRate >= 0;

                return (
                  <tr
                    key={team.teamId}
                    className={`transition-colors hover:bg-zinc-50/70 ${
                      isQualifyingZone ? "bg-emerald-50/20" : ""
                    }`}
                  >
                    {/* Rank / Pos */}
                    <td className="py-4 pl-6 pr-2 font-bold text-zinc-950">
                      <div className="flex items-center gap-2">
                        <span
                          className={`flex h-6 w-6 items-center justify-center rounded-lg text-xs font-bold ${
                            isQualifyingZone
                              ? "bg-zinc-950 text-white"
                              : "bg-zinc-100 text-zinc-600"
                          }`}
                        >
                          {pos}
                        </span>
                      </div>
                    </td>

                    {/* Team Name */}
                    <td className="px-3 py-4">
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-zinc-900 text-[11px] font-bold text-white">
                          {team.shortCode.slice(0, 2)}
                        </div>
                        <div>
                          <p className="font-bold text-zinc-950">
                            {team.teamName}
                          </p>
                          <p className="text-[11px] text-zinc-400 font-mono">
                            {team.shortCode}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Group (if combined) */}
                    {selectedGroup === "combined" && (
                      <td className="px-3 py-4 text-zinc-500 font-medium">
                        {team.group}
                      </td>
                    )}

                    {/* Matches Played */}
                    <td className="px-3 py-4 text-center font-semibold text-zinc-900">
                      {team.played}
                    </td>

                    {/* Won */}
                    <td className="px-3 py-4 text-center font-semibold text-emerald-700">
                      {team.won}
                    </td>

                    {/* Lost */}
                    <td className="px-3 py-4 text-center font-semibold text-rose-600">
                      {team.lost}
                    </td>

                    {/* Tied */}
                    <td className="px-3 py-4 text-center text-zinc-500">
                      {team.tied}
                    </td>

                    {/* No Result */}
                    <td className="px-3 py-4 text-center text-zinc-500">
                      {team.noResult}
                    </td>

                    {/* NRR */}
                    <td
                      className={`px-3 py-4 text-right font-mono font-semibold ${
                        isPositiveNrr ? "text-emerald-600" : "text-rose-600"
                      }`}
                    >
                      {isPositiveNrr
                        ? `+${team.netRunRate.toFixed(3)}`
                        : team.netRunRate.toFixed(3)}
                    </td>

                    {/* Points */}
                    <td className="px-4 py-4 text-right">
                      <span className="inline-block rounded-lg bg-zinc-900 px-2.5 py-1 text-xs font-bold text-white shadow-2xs">
                        {team.points}
                      </span>
                    </td>

                    {/* Form Guide */}
                    <td className="py-4 pl-4 pr-6">
                      <div className="flex items-center justify-center gap-1.5">
                        {team.form.map((res, i) => (
                          <span
                            key={i}
                            className={`flex h-5 w-5 items-center justify-center rounded-md text-[10px] font-bold text-white ${
                              res === "W"
                                ? "bg-emerald-600"
                                : res === "L"
                                  ? "bg-rose-600"
                                  : "bg-zinc-400"
                            }`}
                          >
                            {res}
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Rules Explanations & Qualification Legend */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl border border-zinc-200/80 bg-zinc-50/60 p-4 text-xs text-zinc-600">
        <div className="flex items-center gap-2">
          <span className="flex h-3 w-3 rounded-full bg-emerald-500" />
          <span className="font-semibold text-zinc-900">
            Top 2 teams in each group qualify for Semi-Finals
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-zinc-500">
          <span>Win = 2 pts</span>
          <span>•</span>
          <span>Tie / No Result = 1 pt</span>
          <span>•</span>
          <span>Loss = 0 pts</span>
        </div>
      </div>
    </div>
  );
}
