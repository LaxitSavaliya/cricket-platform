"use client";

import { X } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { toast } from "@/providers/ToastProvider";
import type { TournamentTeam } from "../tournament-detail.types";

interface AddTeamModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTeam: (team: TournamentTeam) => void;
}

export function AddTeamModal({
  isOpen,
  onClose,
  onAddTeam,
}: AddTeamModalProps) {
  const [name, setName] = useState("");
  const [shortCode, setShortCode] = useState("");
  const [group, setGroup] = useState<"Group A" | "Group B">("Group A");
  const [captainName, setCaptainName] = useState("");
  const [coachName, setCoachName] = useState("");
  const [city, setCity] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Required", "Team name is required.");
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const newTeam: TournamentTeam = {
        id: `team-${Date.now()}`,
        name: name.trim(),
        shortCode: (shortCode || name.slice(0, 3)).toUpperCase().trim(),
        group,
        captainName: captainName.trim() || "TBD",
        coachName: coachName.trim() || undefined,
        city: city.trim() || "Local",
        playersCount: 15,
        players: [
          {
            id: `p-${Date.now()}-1`,
            name: captainName.trim() || "Captain",
            role: "Batsman",
            isCaptain: true,
          },
          {
            id: `p-${Date.now()}-2`,
            name: "Vice Captain",
            role: "All-Rounder",
            isViceCaptain: true,
          },
          {
            id: `p-${Date.now()}-3`,
            name: "Lead Bowler",
            role: "Bowler",
          },
        ],
        stats: { matches: 0, won: 0, lost: 0, points: 0, nrr: 0.0 },
      };

      onAddTeam(newTeam);
      setIsSubmitting(false);
      toast.success(
        "Team Registered!",
        `${newTeam.name} (${newTeam.shortCode}) has been enrolled in ${group}.`,
      );
      setName("");
      setShortCode("");
      setCaptainName("");
      setCoachName("");
      setCity("");
      onClose();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl border border-zinc-200">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
          <div>
            <h3 className="text-lg font-bold text-zinc-950">Add New Team</h3>
            <p className="text-xs text-zinc-500">
              Register a team and assign them to a tournament group
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
          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-2">
              <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
                Team Full Name *
              </label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Royal Strikers Club"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
                Code (3-4 chars)
              </label>
              <Input
                value={shortCode}
                onChange={(e) => setShortCode(e.target.value.toUpperCase())}
                placeholder="RSC"
                maxLength={4}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
                Tournament Group
              </label>
              <select
                value={group}
                onChange={(e) =>
                  setGroup(e.target.value as "Group A" | "Group B")
                }
                className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-xs text-zinc-900 outline-none focus:border-zinc-400 focus:ring-2 focus:ring-zinc-100"
              >
                <option value="Group A">Group A</option>
                <option value="Group B">Group B</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
                City / Region
              </label>
              <Input
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="e.g. Mumbai"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
                Captain Name
              </label>
              <Input
                value={captainName}
                onChange={(e) => setCaptainName(e.target.value)}
                placeholder="e.g. Rohit Sharma"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
                Head Coach (Optional)
              </label>
              <Input
                value={coachName}
                onChange={(e) => setCoachName(e.target.value)}
                placeholder="e.g. Rahul Dravid"
              />
            </div>
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
              Register Team
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
