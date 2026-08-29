"use client";

import { X } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { toast } from "@/providers/ToastProvider";
import type {
  MatchStage,
  TournamentMatch,
  TournamentTeam,
} from "../tournament-detail.types";

interface ScheduleMatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  teams: TournamentTeam[];
  onAddMatch: (match: TournamentMatch) => void;
}

export function ScheduleMatchModal({
  isOpen,
  onClose,
  teams,
  onAddMatch,
}: ScheduleMatchModalProps) {
  const [teamAId, setTeamAId] = useState(teams[0]?.id || "");
  const [teamBId, setTeamBId] = useState(teams[1]?.id || "");
  const [stage, setStage] = useState<MatchStage>("Group Stage");
  const [date, setDate] = useState("Sep 04, 2026");
  const [time, setTime] = useState("02:30 PM");
  const [venue, setVenue] = useState("Wankhede Stadium, Mumbai");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (teamAId === teamBId) {
      toast.error("Invalid Selection", "Team A and Team B cannot be the same.");
      return;
    }

    const teamA = teams.find((t) => t.id === teamAId);
    const teamB = teams.find((t) => t.id === teamBId);

    if (!teamA || !teamB) {
      toast.error("Error", "Please select valid teams.");
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const newMatch: TournamentMatch = {
        id: `m-${Date.now()}`,
        matchNumber: Math.floor(Math.random() * 50) + 21,
        stage,
        group: teamA.group === teamB.group ? teamA.group : undefined,
        teamA: {
          id: teamA.id,
          name: teamA.name,
          shortCode: teamA.shortCode,
        },
        teamB: {
          id: teamB.id,
          name: teamB.name,
          shortCode: teamB.shortCode,
        },
        status: "upcoming",
        date,
        time,
        venue,
        tossInfo: `Toss scheduled at ${time}`,
      };

      onAddMatch(newMatch);
      setIsSubmitting(false);
      toast.success(
        "Match Scheduled!",
        `${teamA.shortCode} vs ${teamB.shortCode} scheduled on ${date} at ${time}.`,
      );
      onClose();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl border border-zinc-200">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
          <div>
            <h3 className="text-lg font-bold text-zinc-950">Schedule Match</h3>
            <p className="text-xs text-zinc-500">
              Set up a new fixture between two tournament teams
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          {/* Team Selects */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
                Team 1 (Bat / Bowl)
              </label>
              <select
                value={teamAId}
                onChange={(e) => setTeamAId(e.target.value)}
                className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-xs text-zinc-900 outline-none focus:border-zinc-400 focus:ring-2 focus:ring-zinc-100"
              >
                {teams.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name} ({t.shortCode})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
                Team 2 (Opponent)
              </label>
              <select
                value={teamBId}
                onChange={(e) => setTeamBId(e.target.value)}
                className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-xs text-zinc-900 outline-none focus:border-zinc-400 focus:ring-2 focus:ring-zinc-100"
              >
                {teams.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name} ({t.shortCode})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Match Stage */}
          <div>
            <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
              Tournament Stage
            </label>
            <select
              value={stage}
              onChange={(e) => setStage(e.target.value as MatchStage)}
              className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-xs text-zinc-900 outline-none focus:border-zinc-400 focus:ring-2 focus:ring-zinc-100"
            >
              <option value="Group Stage">Group Stage</option>
              <option value="Quarter Final">Quarter Final</option>
              <option value="Semi Final">Semi Final</option>
              <option value="Final">Grand Final</option>
            </select>
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
                Date
              </label>
              <Input
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="e.g. Sep 04, 2026"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
                Time
              </label>
              <Input
                value={time}
                onChange={(e) => setTime(e.target.value)}
                placeholder="e.g. 02:30 PM"
                required
              />
            </div>
          </div>

          {/* Venue */}
          <div>
            <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
              Venue / Stadium
            </label>
            <Input
              value={venue}
              onChange={(e) => setVenue(e.target.value)}
              placeholder="e.g. Wankhede Stadium, Ground A"
              required
            />
          </div>

          {/* Footer Buttons */}
          <div className="mt-6 flex items-center justify-end gap-2.5 pt-3 border-t border-zinc-100">
            <Button variant="secondary" size="md" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="md"
              isLoading={isSubmitting}
            >
              Schedule Match
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
