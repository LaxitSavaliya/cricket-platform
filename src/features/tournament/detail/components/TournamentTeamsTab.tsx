"use client";

import {
  ArrowLeft,
  ChevronRight,
  Crown,
  Plus,
  Search,
  User,
  Users,
} from "lucide-react";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import type {
  TournamentPlayer,
  TournamentTeam,
} from "../tournament-detail.types";
import { AddPlayerModal } from "./AddPlayerModal";

interface TournamentTeamsTabProps {
  teams: TournamentTeam[];
  onOpenAddTeamModal: () => void;
}

export function TournamentTeamsTab({
  teams,
  onOpenAddTeamModal,
}: TournamentTeamsTabProps) {
  const [selectedGroup, setSelectedGroup] = useState<
    "all" | "Group A" | "Group B"
  >("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTeamId, setSelectedTeamId] = useState<string | null>(null);

  // Modals state
  const [isAddPlayerModalOpen, setIsAddPlayerModalOpen] = useState(false);
  const [teamsData, setTeamsData] = useState<TournamentTeam[]>(teams);

  const filteredTeams = useMemo(() => {
    return teamsData.filter((team) => {
      const matchGroup =
        selectedGroup === "all" || team.group === selectedGroup;
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        team.name.toLowerCase().includes(q) ||
        team.shortCode.toLowerCase().includes(q) ||
        team.captainName.toLowerCase().includes(q) ||
        team.city.toLowerCase().includes(q);
      return matchGroup && matchSearch;
    });
  }, [teamsData, selectedGroup, searchQuery]);

  const activeTeam = useMemo(() => {
    if (!selectedTeamId) return null;
    return teamsData.find((t) => t.id === selectedTeamId) || null;
  }, [teamsData, selectedTeamId]);

  const handleAddPlayer = (newPlayer: TournamentPlayer) => {
    if (!activeTeam) return;
    setTeamsData((prev) =>
      prev.map((t) => {
        if (t.id === activeTeam.id) {
          return {
            ...t,
            playersCount: t.players.length + 1,
            players: [...t.players, newPlayer],
          };
        }
        return t;
      }),
    );
  };

  const getRoleBadgeColor = (role: TournamentPlayer["role"]) => {
    switch (role) {
      case "Batsman":
        return "bg-sky-50 text-sky-700 border-sky-200";
      case "All-Rounder":
        return "bg-purple-50 text-purple-700 border-purple-200";
      case "Wicketkeeper":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "Bowler":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      default:
        return "bg-zinc-50 text-zinc-700 border-zinc-200";
    }
  };

  const getRoleBorderAccent = (role: TournamentPlayer["role"]) => {
    switch (role) {
      case "Batsman":
        return "border-t-sky-500";
      case "All-Rounder":
        return "border-t-purple-600";
      case "Wicketkeeper":
        return "border-t-amber-500";
      case "Bowler":
        return "border-t-emerald-500";
      default:
        return "border-t-zinc-400";
    }
  };

  // Group players by role for the all-in-one view
  const roleGroups = useMemo(() => {
    if (!activeTeam) return [];

    const categories: Array<{
      role: TournamentPlayer["role"];
      label: string;
      icon: string;
      badgeColor: string;
    }> = [
      {
        role: "Batsman",
        label: "Batters",
        icon: "🏏",
        badgeColor: "bg-sky-100 text-sky-800",
      },
      {
        role: "All-Rounder",
        label: "All-Rounders",
        icon: "⚡",
        badgeColor: "bg-purple-100 text-purple-800",
      },
      {
        role: "Wicketkeeper",
        label: "Wicketkeepers",
        icon: "🧤",
        badgeColor: "bg-amber-100 text-amber-800",
      },
      {
        role: "Bowler",
        label: "Bowlers",
        icon: "🎯",
        badgeColor: "bg-emerald-100 text-emerald-800",
      },
    ];

    return categories
      .map((cat) => ({
        ...cat,
        players: activeTeam.players.filter((p) => p.role === cat.role),
      }))
      .filter((group) => group.players.length > 0);
  }, [activeTeam]);

  // Render individual player card
  const renderPlayerCard = (player: TournamentPlayer) => {
    const borderAccent = getRoleBorderAccent(player.role);
    const badgeColor = getRoleBadgeColor(player.role);
    const initials = player.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2);

    return (
      <div
        key={player.id}
        className={`relative overflow-hidden rounded-2xl border border-zinc-200/90 border-t-4 ${borderAccent} bg-white p-4.5 shadow-xs transition-all hover:border-zinc-300 hover:shadow-sm`}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-zinc-900 text-white font-bold text-sm">
              {initials}
              {player.jerseyNumber && (
                <span className="absolute -bottom-1 -right-1 rounded-md bg-zinc-800 border border-zinc-700 px-1 py-0.2 text-[9px] font-mono font-bold text-amber-300">
                  #{player.jerseyNumber}
                </span>
              )}
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <p className="text-sm font-bold text-zinc-950">{player.name}</p>
                {player.isCaptain && (
                  <span className="inline-flex items-center gap-0.5 rounded-full bg-amber-100 border border-amber-200 px-1.5 py-0.2 text-[10px] font-bold text-amber-800">
                    <Crown className="h-2.5 w-2.5" /> (C)
                  </span>
                )}
                {player.isViceCaptain && (
                  <span className="inline-flex items-center gap-0.5 rounded-full bg-sky-100 border border-sky-200 px-1.5 py-0.2 text-[10px] font-bold text-sky-800">
                    (VC)
                  </span>
                )}
              </div>
              <span
                className={`mt-1 inline-block rounded-md border px-2 py-0.2 text-[10px] font-semibold ${badgeColor}`}
              >
                {player.role}
              </span>
            </div>
          </div>
        </div>

        {/* Playing styles / specs */}
        <div className="mt-3.5 rounded-xl bg-zinc-50/75 p-2.5 space-y-1 text-xs text-zinc-600">
          {player.battingStyle && (
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-zinc-400">Batting:</span>
              <span className="font-medium text-zinc-800">
                {player.battingStyle}
              </span>
            </div>
          )}
          {player.bowlingStyle ? (
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-zinc-400">Bowling:</span>
              <span className="font-medium text-zinc-800">
                {player.bowlingStyle}
              </span>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-zinc-400">Specialty:</span>
              <span className="font-medium text-zinc-800">
                {player.role === "Wicketkeeper"
                  ? "Glovework & Fielding"
                  : "Specialist Batsman"}
              </span>
            </div>
          )}
        </div>
      </div>
    );
  };

  // ==========================================
  // VIEW 1: SQUAD VIEW (ALL IN ONE)
  // ==========================================
  if (activeTeam) {
    return (
      <div className="space-y-6 animate-in fade-in duration-200">
        {/* Top Header Row */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSelectedTeamId(null)}
              className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-3.5 py-2 text-xs font-semibold text-zinc-700 hover:bg-zinc-50 hover:text-zinc-950 shadow-2xs transition"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to All Teams</span>
            </button>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-zinc-950">
                  {activeTeam.name}
                </h2>
                <span className="rounded-full border border-zinc-200 bg-zinc-50 px-2 py-0.5 text-xs font-semibold text-zinc-600 font-mono">
                  {activeTeam.shortCode}
                </span>
                <span className="rounded-full bg-zinc-900 text-white px-2 py-0.5 text-[11px] font-bold">
                  {activeTeam.players.length} Players
                </span>
              </div>
            </div>
          </div>

          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsAddPlayerModalOpen(true)}
            leftIcon={<Plus className="h-3.5 w-3.5" />}
          >
            Add Player
          </Button>
        </div>

        {/* All Players in One View, Grouped by Cricket Role */}
        {roleGroups.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-zinc-300 bg-white p-12 text-center">
            <User className="mx-auto h-8 w-8 text-zinc-300" />
            <p className="mt-3 text-sm font-semibold text-zinc-900">
              No players registered in this squad
            </p>
            <p className="mt-1 text-xs text-zinc-500">
              Click &quot;Add Player&quot; to enroll players into this squad.
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {roleGroups.map((group) => (
              <div key={group.role} className="space-y-3">
                {/* Section Header */}
                <div className="flex items-center gap-2.5 border-b border-zinc-200/80 pb-2">
                  <span className="text-base">{group.icon}</span>
                  <h3 className="text-sm font-bold text-zinc-950">
                    {group.label}
                  </h3>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${group.badgeColor}`}
                  >
                    {group.players.length}
                  </span>
                </div>

                {/* Cards Grid for this category */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {group.players.map(renderPlayerCard)}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Add Player Modal */}
        <AddPlayerModal
          isOpen={isAddPlayerModalOpen}
          onClose={() => setIsAddPlayerModalOpen(false)}
          teamName={activeTeam.name}
          onAddPlayer={handleAddPlayer}
        />
      </div>
    );
  }

  // ==========================================
  // VIEW 2: ALL TEAMS GRID (DEFAULT)
  // ==========================================
  return (
    <div className="space-y-6">
      {/* Controls Bar: Group Filter pills, Search, Add Team */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-zinc-100/80 border border-zinc-200/60 w-fit">
          <button
            type="button"
            onClick={() => setSelectedGroup("all")}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
              selectedGroup === "all"
                ? "bg-white text-zinc-950 shadow-2xs"
                : "text-zinc-600 hover:text-zinc-950"
            }`}
          >
            All Teams ({teamsData.length})
          </button>
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
        </div>

        <div className="flex items-center gap-3">
          <div className="relative w-full sm:w-60">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-400" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search team or captain..."
              className="pl-8 text-xs h-9.5"
            />
          </div>

          <Button
            variant="primary"
            size="sm"
            onClick={onOpenAddTeamModal}
            leftIcon={<Plus className="h-3.5 w-3.5" />}
          >
            Add Team
          </Button>
        </div>
      </div>

      {/* Teams Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredTeams.map((team) => {
          return (
            <div
              key={team.id}
              onClick={() => setSelectedTeamId(team.id)}
              className="group rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-xs transition-all hover:border-zinc-400 hover:shadow-md cursor-pointer flex flex-col justify-between"
            >
              <div>
                {/* Top Row: Team Brand, Badges */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3.5">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-zinc-950 text-white font-bold shadow-xs group-hover:scale-105 transition-transform">
                      {team.shortCode.slice(0, 3)}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-zinc-950 group-hover:text-zinc-800">
                        {team.name}
                      </h3>
                      <p className="text-xs text-zinc-400 font-mono">
                        {team.shortCode} • {team.city}
                      </p>
                    </div>
                  </div>

                  <span className="rounded-full border border-zinc-200 bg-zinc-50 px-2.5 py-0.5 text-xs font-semibold text-zinc-700">
                    {team.group}
                  </span>
                </div>

                {/* Middle Row: Meta details & record */}
                <div className="mt-4 grid grid-cols-2 gap-2 rounded-xl bg-zinc-50 p-3 text-xs text-zinc-600">
                  <div>
                    <span className="text-[11px] text-zinc-400">Captain</span>
                    <p className="font-semibold text-zinc-900 truncate">
                      {team.captainName}
                    </p>
                  </div>
                  <div>
                    <span className="text-[11px] text-zinc-400">
                      Squad Size
                    </span>
                    <p className="font-semibold text-zinc-900">
                      {team.playersCount} Registered
                    </p>
                  </div>
                  <div>
                    <span className="text-[11px] text-zinc-400">Coach</span>
                    <p className="font-semibold text-zinc-900 truncate">
                      {team.coachName || "None"}
                    </p>
                  </div>
                  <div>
                    <span className="text-[11px] text-zinc-400">Record</span>
                    <p className="font-semibold text-zinc-900">
                      {team.stats.won}W / {team.stats.lost}L (
                      {team.stats.points} pts)
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Footer: View Squad & Players */}
              <div className="mt-4 border-t border-zinc-100 pt-3 flex items-center justify-between text-xs font-semibold text-zinc-900 group-hover:text-zinc-950">
                <span className="flex items-center gap-1.5 text-zinc-600 group-hover:text-zinc-900">
                  <Users className="h-3.5 w-3.5 text-zinc-500" />
                  <span>View Squad & Players</span>
                </span>
                <div className="flex items-center gap-1 text-zinc-400 group-hover:text-zinc-900 transition-colors">
                  <span className="text-[11px]">Explore Roster</span>
                  <ChevronRight className="h-4 w-4" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
