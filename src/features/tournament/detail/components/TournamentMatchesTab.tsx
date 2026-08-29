"use client";

import { Calendar, MapPin, Plus, Radio, Search } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import type { MatchStatus, TournamentMatch } from "../tournament-detail.types";

interface TournamentMatchesTabProps {
  matches: TournamentMatch[];
  onOpenScheduleModal: () => void;
}

export function TournamentMatchesTab({
  matches,
  onOpenScheduleModal,
}: TournamentMatchesTabProps) {
  const [filterStatus, setFilterStatus] = useState<MatchStatus | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredMatches = useMemo(() => {
    return matches.filter((match) => {
      const matchesStatus =
        filterStatus === "all" || match.status === filterStatus;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        match.teamA.name.toLowerCase().includes(q) ||
        match.teamB.name.toLowerCase().includes(q) ||
        match.venue.toLowerCase().includes(q);
      return matchesStatus && matchesSearch;
    });
  }, [matches, filterStatus, searchQuery]);

  const counts = useMemo(() => {
    return {
      all: matches.length,
      live: matches.filter((m) => m.status === "live").length,
      upcoming: matches.filter((m) => m.status === "upcoming").length,
      completed: matches.filter((m) => m.status === "completed").length,
    };
  }, [matches]);

  return (
    <div className="space-y-6">
      {/* Controls Bar: Filter Pills, Search, Schedule Button */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Status Filters */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-zinc-100/80 border border-zinc-200/60 w-fit">
          <button
            type="button"
            onClick={() => setFilterStatus("all")}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
              filterStatus === "all"
                ? "bg-white text-zinc-950 shadow-2xs"
                : "text-zinc-600 hover:text-zinc-950"
            }`}
          >
            All Matches ({counts.all})
          </button>
          <button
            type="button"
            onClick={() => setFilterStatus("live")}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
              filterStatus === "live"
                ? "bg-rose-600 text-white shadow-2xs"
                : "text-zinc-600 hover:text-zinc-950"
            }`}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-rose-400 animate-pulse" />
            Live ({counts.live})
          </button>
          <button
            type="button"
            onClick={() => setFilterStatus("upcoming")}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
              filterStatus === "upcoming"
                ? "bg-white text-zinc-950 shadow-2xs"
                : "text-zinc-600 hover:text-zinc-950"
            }`}
          >
            Upcoming ({counts.upcoming})
          </button>
          <button
            type="button"
            onClick={() => setFilterStatus("completed")}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
              filterStatus === "completed"
                ? "bg-white text-zinc-950 shadow-2xs"
                : "text-zinc-600 hover:text-zinc-950"
            }`}
          >
            Results ({counts.completed})
          </button>
        </div>

        {/* Search & Schedule Button */}
        <div className="flex items-center gap-3">
          <div className="relative w-full sm:w-60">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-400" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search team or venue..."
              className="pl-8 text-xs h-9.5"
            />
          </div>

          <Button
            variant="primary"
            size="sm"
            onClick={onOpenScheduleModal}
            leftIcon={<Plus className="h-3.5 w-3.5" />}
          >
            Schedule
          </Button>
        </div>
      </div>

      {/* Match List Cards */}
      {filteredMatches.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-zinc-300 bg-white p-12 text-center">
          <Calendar className="mx-auto h-8 w-8 text-zinc-300" />
          <p className="mt-3 text-sm font-semibold text-zinc-900">
            No matches found
          </p>
          <p className="mt-1 text-xs text-zinc-500">
            No fixtures match the selected status or query.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredMatches.map((match) => {
            const isLive = match.status === "live";
            const isCompleted = match.status === "completed";
            const isUpcoming = match.status === "upcoming";

            return (
              <div
                key={match.id}
                className={`relative overflow-hidden rounded-2xl border bg-white p-5 shadow-xs transition-all hover:border-zinc-300 ${
                  isLive
                    ? "border-rose-200 ring-1 ring-rose-300/40"
                    : "border-zinc-200/80"
                }`}
              >
                {/* Accent Top Edge */}
                {isLive && (
                  <div className="absolute inset-x-0 top-0 h-1 bg-rose-600" />
                )}

                {/* Match Card Header */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-100 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="rounded-md bg-zinc-100 px-2 py-0.5 text-xs font-bold text-zinc-800">
                      Match #{match.matchNumber}
                    </span>
                    <span className="text-xs text-zinc-500 font-medium">
                      {match.stage} {match.group && `• ${match.group}`}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    {isLive && (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-50 px-2.5 py-0.5 text-xs font-bold text-rose-700">
                        <span className="h-1.5 w-1.5 rounded-full bg-rose-500 animate-pulse" />
                        LIVE SCORING
                      </span>
                    )}
                    {isUpcoming && (
                      <span className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-semibold text-zinc-700">
                        {match.date}, {match.time}
                      </span>
                    )}
                    {isCompleted && (
                      <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
                        Completed
                      </span>
                    )}
                  </div>
                </div>

                {/* Match Teams and Scores */}
                <div className="mt-4 grid grid-cols-1 md:grid-cols-12 items-center gap-4">
                  {/* Teams info */}
                  <div className="md:col-span-8 space-y-3">
                    {/* Team A */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-900 text-xs font-bold text-white">
                          {match.teamA.shortCode.slice(0, 2)}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-zinc-950">
                            {match.teamA.name}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        {match.teamA.score ? (
                          <div>
                            <span className="text-base font-bold text-zinc-950">
                              {match.teamA.score.runs}/
                              {match.teamA.score.wickets}
                            </span>
                            <span className="ml-1 text-xs text-zinc-500">
                              ({match.teamA.score.overs} ov)
                            </span>
                          </div>
                        ) : (
                          <span className="text-xs text-zinc-400 font-medium">
                            Yet to bat
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Team B */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-700 text-xs font-bold text-white">
                          {match.teamB.shortCode.slice(0, 2)}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-zinc-950">
                            {match.teamB.name}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        {match.teamB.score ? (
                          <div>
                            <span className="text-base font-bold text-zinc-950">
                              {match.teamB.score.runs}/
                              {match.teamB.score.wickets}
                            </span>
                            <span className="ml-1 text-xs text-zinc-500">
                              ({match.teamB.score.overs} ov)
                            </span>
                          </div>
                        ) : (
                          <span className="text-xs text-zinc-400 font-medium">
                            Yet to bat
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right Actions & Status */}
                  <div className="md:col-span-4 flex flex-col md:items-end justify-center gap-2 border-t md:border-t-0 md:border-l border-zinc-100 pt-3 md:pt-0 md:pl-6">
                    {isLive && (
                      <Link
                        href={`/scoring?match=${match.id}`}
                        className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-rose-600 px-4 py-2 text-xs font-bold text-white hover:bg-rose-700 shadow-xs transition w-full md:w-auto"
                      >
                        <Radio className="h-3.5 w-3.5" />
                        <span>Live Scorer</span>
                      </Link>
                    )}
                    {isUpcoming && (
                      <Link
                        href={`/scoring?match=${match.id}`}
                        className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-zinc-900 px-4 py-2 text-xs font-semibold text-white hover:bg-zinc-800 shadow-xs transition w-full md:w-auto"
                      >
                        <span>Start Match</span>
                      </Link>
                    )}
                    {isCompleted && (
                      <button
                        type="button"
                        className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-2 text-xs font-semibold text-zinc-800 hover:bg-zinc-100 transition w-full md:w-auto"
                      >
                        <span>View Full Scorecard</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Footer notes: venue & toss/result */}
                <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-zinc-100 pt-3 text-xs text-zinc-500">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-zinc-400" />
                    <span>{match.venue}</span>
                  </div>

                  {match.resultSummary && (
                    <span className="font-semibold text-emerald-700">
                      {match.resultSummary}
                    </span>
                  )}
                  {match.currentOverDetails && (
                    <span className="font-semibold text-rose-700">
                      {match.currentOverDetails}
                    </span>
                  )}
                  {!match.resultSummary && !match.currentOverDetails && (
                    <span className="italic">{match.tossInfo}</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
