"use client";

import {
  Calendar,
  CheckCircle2,
  ChevronRight,
  Download,
  MapPin,
  Plus,
  Radio,
  Shield,
  Trophy,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/Button";
import { toast } from "@/providers/ToastProvider";
import type {
  PointsTableEntry,
  TournamentDetailData,
  TournamentMatch,
} from "../tournament-detail.types";

interface TournamentOverviewTabProps {
  data: TournamentDetailData;
  matches: TournamentMatch[];
  pointsTable: PointsTableEntry[];
  onSwitchTab: (tab: string) => void;
  onOpenScheduleModal: () => void;
  onOpenAddTeamModal: () => void;
}

export function TournamentOverviewTab({
  data,
  matches,
  pointsTable,
  onSwitchTab,
  onOpenScheduleModal,
  onOpenAddTeamModal,
}: TournamentOverviewTabProps) {
  const liveMatch = matches.find((m) => m.status === "live");
  const upcomingMatches = matches
    .filter((m) => m.status === "upcoming")
    .slice(0, 2);
  const recentCompleted = matches
    .filter((m) => m.status === "completed")
    .slice(0, 2);

  const groupAStandings = pointsTable
    .filter((e) => e.group === "Group A")
    .slice(0, 2);
  const groupBStandings = pointsTable
    .filter((e) => e.group === "Group B")
    .slice(0, 2);

  const handleExportPDF = () => {
    toast.success(
      "Report Generated",
      "Tournament summary and points table report downloaded successfully.",
    );
  };

  return (
    <div className="space-y-6">
      {/* 1. Live Match Spotlight (if any) */}
      {liveMatch && (
        <div className="relative overflow-hidden rounded-2xl border border-rose-200 bg-linear-to-br from-rose-50/50 via-white to-white p-6 shadow-xs">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-rose-100 pb-4">
            <div className="flex items-center gap-2">
              <span className="flex h-3 w-3 items-center justify-center">
                <span className="h-2.5 w-2.5 rounded-full bg-rose-500 animate-ping" />
              </span>
              <span className="rounded-md bg-rose-600 px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider text-white">
                Match #{liveMatch.matchNumber} • LIVE
              </span>
              <span className="text-xs text-zinc-500 font-medium">
                {liveMatch.stage} {liveMatch.group && `(${liveMatch.group})`}
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs text-zinc-500">
              <MapPin className="h-3.5 w-3.5 text-zinc-400" />
              <span>{liveMatch.venue}</span>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-1 md:grid-cols-3 items-center gap-6">
            {/* Team A */}
            <div className="flex items-center justify-between md:justify-start md:gap-4">
              <div>
                <p className="text-base font-bold text-zinc-950">
                  {liveMatch.teamA.name}
                </p>
                <p className="text-xs text-zinc-400 font-mono">
                  {liveMatch.teamA.shortCode}
                </p>
              </div>
              <div className="text-right md:text-left">
                <span className="text-xl font-bold text-zinc-900">
                  {liveMatch.teamA.score?.runs}/{liveMatch.teamA.score?.wickets}
                </span>
                <p className="text-[11px] text-zinc-500">
                  ({liveMatch.teamA.score?.overs} ov)
                </p>
              </div>
            </div>

            {/* VS & Live context */}
            <div className="text-center">
              <span className="inline-block rounded-full bg-zinc-100 px-3 py-1 text-xs font-semibold text-zinc-600">
                VS
              </span>
              {liveMatch.currentOverDetails && (
                <p className="mt-2 text-xs font-semibold text-rose-700">
                  {liveMatch.currentOverDetails}
                </p>
              )}
            </div>

            {/* Team B */}
            <div className="flex items-center justify-between md:justify-end md:gap-4">
              <div className="text-left md:text-right">
                <span className="text-xl font-bold text-zinc-900">
                  {liveMatch.teamB.score?.runs}/{liveMatch.teamB.score?.wickets}
                </span>
                <p className="text-[11px] text-zinc-500">
                  ({liveMatch.teamB.score?.overs} ov)
                </p>
              </div>
              <div>
                <p className="text-base font-bold text-zinc-950 text-right">
                  {liveMatch.teamB.name}
                </p>
                <p className="text-xs text-zinc-400 font-mono text-right">
                  {liveMatch.teamB.shortCode}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-rose-100/70 pt-4">
            <p className="text-xs text-zinc-600 italic">{liveMatch.tossInfo}</p>
            <div className="flex items-center gap-2">
              <Button
                variant="primary"
                size="sm"
                className="bg-rose-600 hover:bg-rose-700"
                onClick={() => onSwitchTab("matches")}
                leftIcon={<Radio className="h-3.5 w-3.5" />}
              >
                Match Scorecard
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* 2. Grid: Upcoming & Recent Results (Left) + Quick Admin Tools (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Matches Highlights */}
        <div className="lg:col-span-2 space-y-6">
          {/* Upcoming Fixtures Card */}
          <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-xs">
            <div className="flex items-center justify-between border-b border-zinc-100 pb-3.5">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-zinc-500" />
                <h3 className="text-sm font-bold text-zinc-950">
                  Upcoming Tournament Fixtures
                </h3>
              </div>
              <button
                type="button"
                onClick={() => onSwitchTab("matches")}
                className="inline-flex items-center gap-1 text-xs font-semibold text-zinc-600 hover:text-zinc-950 transition"
              >
                <span>View All ({matches.length})</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="mt-4 divide-y divide-zinc-100">
              {upcomingMatches.map((m) => (
                <div
                  key={m.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-3 first:pt-0 last:pb-0"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-100 text-xs font-bold text-zinc-800">
                      M{m.matchNumber}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-zinc-900">
                        {m.teamA.name} <span className="text-zinc-400">vs</span>{" "}
                        {m.teamB.name}
                      </p>
                      <p className="text-[11px] text-zinc-500">
                        {m.venue} • {m.stage}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end sm:self-center">
                    <span className="rounded-md bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-700">
                      {m.date}, {m.time}
                    </span>
                    <button
                      type="button"
                      onClick={() => onSwitchTab("matches")}
                      className="text-xs font-semibold text-zinc-900 hover:underline"
                    >
                      Manage
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Match Results Card */}
          {recentCompleted.length > 0 && (
            <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-xs">
              <div className="flex items-center justify-between border-b border-zinc-100 pb-3.5">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  <h3 className="text-sm font-bold text-zinc-950">
                    Recent Match Results
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => onSwitchTab("matches")}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-zinc-600 hover:text-zinc-950 transition"
                >
                  <span>All Results</span>
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>

              <div className="mt-4 divide-y divide-zinc-100">
                {recentCompleted.map((m) => (
                  <div
                    key={m.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-3 first:pt-0 last:pb-0"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-xs font-bold text-emerald-800">
                        M{m.matchNumber}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-zinc-900">
                          {m.teamA.shortCode} {m.teamA.score?.runs}/
                          {m.teamA.score?.wickets} vs {m.teamB.shortCode}{" "}
                          {m.teamB.score?.runs}/{m.teamB.score?.wickets}
                        </p>
                        <p className="text-[11px] font-semibold text-emerald-700">
                          {m.resultSummary}
                        </p>
                      </div>
                    </div>

                    <span className="text-[11px] text-zinc-400">{m.date}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Standings Snapshot */}
          <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-xs">
            <div className="flex items-center justify-between border-b border-zinc-100 pb-3.5">
              <div className="flex items-center gap-2">
                <Trophy className="h-4 w-4 text-amber-500" />
                <h3 className="text-sm font-bold text-zinc-950">
                  Group Leaders & Standings Snapshot
                </h3>
              </div>
              <button
                type="button"
                onClick={() => onSwitchTab("standings")}
                className="inline-flex items-center gap-1 text-xs font-semibold text-zinc-600 hover:text-zinc-950 transition"
              >
                <span>Full Standings Table</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Group A Leaders */}
              <div className="rounded-xl border border-zinc-100 bg-zinc-50/70 p-3.5">
                <span className="text-xs font-bold text-zinc-700 uppercase tracking-wider">
                  Group A (Top 2 Qualify)
                </span>
                <div className="mt-2.5 space-y-2">
                  {groupAStandings.map((team, idx) => (
                    <div
                      key={team.teamId}
                      className="flex items-center justify-between text-xs bg-white p-2.5 rounded-lg border border-zinc-200/60"
                    >
                      <div className="flex items-center gap-2">
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-zinc-900 text-[10px] font-bold text-white">
                          {idx + 1}
                        </span>
                        <span className="font-semibold text-zinc-900">
                          {team.teamName}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-zinc-600">
                        <span>P: {team.played}</span>
                        <span className="font-bold text-zinc-950">
                          {team.points} pts
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Group B Leaders */}
              <div className="rounded-xl border border-zinc-100 bg-zinc-50/70 p-3.5">
                <span className="text-xs font-bold text-zinc-700 uppercase tracking-wider">
                  Group B (Top 2 Qualify)
                </span>
                <div className="mt-2.5 space-y-2">
                  {groupBStandings.map((team, idx) => (
                    <div
                      key={team.teamId}
                      className="flex items-center justify-between text-xs bg-white p-2.5 rounded-lg border border-zinc-200/60"
                    >
                      <div className="flex items-center gap-2">
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-zinc-900 text-[10px] font-bold text-white">
                          {idx + 1}
                        </span>
                        <span className="font-semibold text-zinc-900">
                          {team.teamName}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-zinc-600">
                        <span>P: {team.played}</span>
                        <span className="font-bold text-zinc-950">
                          {team.points} pts
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Tournament Milestones & Quick Admin Tools */}
        <div className="space-y-6">
          {/* Quick Admin Actions */}
          <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-xs">
            <h3 className="text-sm font-bold text-zinc-950 mb-3.5">
              Tournament Actions
            </h3>
            <div className="space-y-2">
              <Button
                variant="secondary"
                size="sm"
                className="w-full justify-start text-xs"
                leftIcon={<Plus className="h-4 w-4 text-zinc-700" />}
                onClick={onOpenScheduleModal}
              >
                Schedule New Fixture
              </Button>
              <Button
                variant="secondary"
                size="sm"
                className="w-full justify-start text-xs"
                leftIcon={<Users className="h-4 w-4 text-zinc-700" />}
                onClick={onOpenAddTeamModal}
              >
                Enroll New Team
              </Button>
              <Button
                variant="secondary"
                size="sm"
                className="w-full justify-start text-xs"
                leftIcon={<Download className="h-4 w-4 text-zinc-700" />}
                onClick={handleExportPDF}
              >
                Export Standings & Scores (PDF)
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start text-xs"
                leftIcon={<Shield className="h-4 w-4 text-zinc-700" />}
                onClick={() => onSwitchTab("settings")}
              >
                Match & Rule Configurations
              </Button>
            </div>
          </div>

          {/* Tournament Timeline Milestones */}
          <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-xs">
            <h3 className="text-sm font-bold text-zinc-950 mb-4">
              Tournament Progress Timeline
            </h3>

            <div className="relative pl-6 space-y-5 border-l-2 border-zinc-200">
              {data.milestones.map((m) => {
                const isCompleted = m.status === "completed";
                const isActive = m.status === "active";

                return (
                  <div key={m.id} className="relative">
                    {/* Bullet marker */}
                    <div
                      className={`absolute -left-7.75 top-0 flex h-4 w-4 items-center justify-center rounded-full ${
                        isCompleted
                          ? "bg-emerald-500 text-white"
                          : isActive
                            ? "bg-zinc-950 text-white ring-4 ring-zinc-200"
                            : "bg-zinc-200"
                      }`}
                    >
                      {isCompleted && <CheckCircle2 className="h-3 w-3" />}
                    </div>

                    <div>
                      <span className="text-[11px] font-semibold text-zinc-400">
                        {m.date}
                      </span>
                      <p className="text-xs font-bold text-zinc-900 mt-0.5">
                        {m.title}
                      </p>
                      <p className="text-[11px] text-zinc-500 mt-0.5">
                        {m.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
