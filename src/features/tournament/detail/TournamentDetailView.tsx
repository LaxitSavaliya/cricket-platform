"use client";

import {
  Calendar,
  LayoutDashboard,
  Settings,
  Trophy,
  Users,
} from "lucide-react";
import { useState } from "react";

import { AddTeamModal } from "./components/AddTeamModal";
import { ScheduleMatchModal } from "./components/ScheduleMatchModal";
import { TournamentDetailHeader } from "./components/TournamentDetailHeader";
import { TournamentMatchesTab } from "./components/TournamentMatchesTab";
import { TournamentOverviewTab } from "./components/TournamentOverviewTab";
import { TournamentSettingsTab } from "./components/TournamentSettingsTab";
import { TournamentStandingsTab } from "./components/TournamentStandingsTab";
import { TournamentTeamsTab } from "./components/TournamentTeamsTab";
import { getMockTournamentDetail } from "./tournament-detail.mock";
import type {
  TournamentMatch,
  TournamentTeam,
} from "./tournament-detail.types";

interface TournamentDetailViewProps {
  slug: string;
}

export function TournamentDetailView({ slug }: TournamentDetailViewProps) {
  const initialData = getMockTournamentDetail(slug);
  const [data] = useState(initialData);
  const [matches, setMatches] = useState<TournamentMatch[]>(data.matches);
  const [teams, setTeams] = useState<TournamentTeam[]>(data.teams);
  const [pointsTable] = useState(data.pointsTable);
  const [activeTab, setActiveTab] = useState("overview");

  // Modals state
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [isAddTeamModalOpen, setIsAddTeamModalOpen] = useState(false);

  const handleAddMatch = (newMatch: TournamentMatch) => {
    setMatches((prev) => [newMatch, ...prev]);
  };

  const handleAddTeam = (newTeam: TournamentTeam) => {
    setTeams((prev) => [...prev, newTeam]);
  };

  const navTabs = [
    {
      id: "overview",
      label: "Overview",
      icon: LayoutDashboard,
    },
    {
      id: "matches",
      label: "Matches & Fixtures",
      icon: Calendar,
      count: matches.length,
    },
    {
      id: "teams",
      label: "Teams & Squads",
      icon: Users,
      count: teams.length,
    },
    {
      id: "standings",
      label: "Points Table",
      icon: Trophy,
    },
    {
      id: "settings",
      label: "Tournament Rules",
      icon: Settings,
    },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* 1. Header Banner */}
      <TournamentDetailHeader
        data={data}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onOpenScheduleModal={() => setIsScheduleModalOpen(true)}
        onOpenAddTeamModal={() => setIsAddTeamModalOpen(true)}
      />

      {/* 3. Navigation Tabs */}
      <div className="border-b border-zinc-200">
        <nav className="flex space-x-1 sm:space-x-3 overflow-x-auto pb-px">
          {navTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 border-b-2 py-3 px-3 sm:px-4 text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? "border-zinc-950 text-zinc-950"
                    : "border-transparent text-zinc-500 hover:border-zinc-300 hover:text-zinc-800"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span
                    className={`rounded-full px-1.5 py-0.2 text-[10px] font-bold ${
                      isActive
                        ? "bg-zinc-950 text-white"
                        : "bg-zinc-100 text-zinc-600"
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* 4. Active Tab Content */}
      <div className="pt-1">
        {activeTab === "overview" && (
          <TournamentOverviewTab
            data={data}
            matches={matches}
            pointsTable={pointsTable}
            onSwitchTab={setActiveTab}
            onOpenScheduleModal={() => setIsScheduleModalOpen(true)}
            onOpenAddTeamModal={() => setIsAddTeamModalOpen(true)}
          />
        )}

        {activeTab === "matches" && (
          <TournamentMatchesTab
            matches={matches}
            onOpenScheduleModal={() => setIsScheduleModalOpen(true)}
          />
        )}

        {activeTab === "teams" && (
          <TournamentTeamsTab
            teams={teams}
            onOpenAddTeamModal={() => setIsAddTeamModalOpen(true)}
          />
        )}

        {activeTab === "standings" && (
          <TournamentStandingsTab pointsTable={pointsTable} />
        )}

        {activeTab === "settings" && (
          <TournamentSettingsTab initialSettings={data.settings} />
        )}
      </div>

      {/* Modals */}
      <ScheduleMatchModal
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
        teams={teams}
        onAddMatch={handleAddMatch}
      />

      <AddTeamModal
        isOpen={isAddTeamModalOpen}
        onClose={() => setIsAddTeamModalOpen(false)}
        onAddTeam={handleAddTeam}
      />
    </div>
  );
}
