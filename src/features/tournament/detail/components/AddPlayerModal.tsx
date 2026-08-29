"use client";

import { X } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { toast } from "@/providers/ToastProvider";
import type { TournamentPlayer } from "../tournament-detail.types";

interface AddPlayerModalProps {
  isOpen: boolean;
  onClose: () => void;
  teamName: string;
  onAddPlayer: (player: TournamentPlayer) => void;
}

export function AddPlayerModal({
  isOpen,
  onClose,
  teamName,
  onAddPlayer,
}: AddPlayerModalProps) {
  const [name, setName] = useState("");
  const [role, setRole] = useState<TournamentPlayer["role"]>("Batsman");
  const [jerseyNumber, setJerseyNumber] = useState<string>("10");
  const [battingStyle, setBattingStyle] = useState("Right-hand bat");
  const [bowlingStyle, setBowlingStyle] = useState("Right-arm medium fast");
  const [isCaptain, setIsCaptain] = useState(false);
  const [isViceCaptain, setIsViceCaptain] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Required", "Player name is required.");
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const newPlayer: TournamentPlayer = {
        id: `p-${Date.now()}`,
        name: name.trim(),
        role,
        jerseyNumber: Number(jerseyNumber) || undefined,
        battingStyle,
        bowlingStyle:
          role === "Bowler" || role === "All-Rounder"
            ? bowlingStyle
            : undefined,
        isCaptain,
        isViceCaptain: !isCaptain && isViceCaptain,
      };

      onAddPlayer(newPlayer);
      setIsSubmitting(false);
      toast.success(
        "Player Added",
        `${newPlayer.name} (#${newPlayer.jerseyNumber || "—"}) added to ${teamName} as ${newPlayer.role}.`,
      );
      setName("");
      onClose();
    }, 350);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl border border-zinc-200">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
          <div>
            <h3 className="text-lg font-bold text-zinc-950">Add Player</h3>
            <p className="text-xs text-zinc-500">
              Register player into {teamName}
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
                Player Full Name *
              </label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Jasprit Bumrah"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
                Jersey #
              </label>
              <Input
                value={jerseyNumber}
                onChange={(e) => setJerseyNumber(e.target.value)}
                type="number"
                min={1}
                max={99}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
              Primary Role
            </label>
            <select
              value={role}
              onChange={(e) =>
                setRole(e.target.value as TournamentPlayer["role"])
              }
              className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-xs text-zinc-900 outline-none focus:border-zinc-400 focus:ring-2 focus:ring-zinc-100"
            >
              <option value="Batsman">Batsman</option>
              <option value="All-Rounder">All-Rounder</option>
              <option value="Wicketkeeper">Wicketkeeper</option>
              <option value="Bowler">Bowler</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
                Batting Style
              </label>
              <select
                value={battingStyle}
                onChange={(e) => setBattingStyle(e.target.value)}
                className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-xs text-zinc-900 outline-none focus:border-zinc-400 focus:ring-2 focus:ring-zinc-100"
              >
                <option value="Right-hand bat">Right-hand bat</option>
                <option value="Left-hand bat">Left-hand bat</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
                Bowling Style
              </label>
              <select
                value={bowlingStyle}
                onChange={(e) => setBowlingStyle(e.target.value)}
                className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-xs text-zinc-900 outline-none focus:border-zinc-400 focus:ring-2 focus:ring-zinc-100"
              >
                <option value="Right-arm fast">Right-arm fast</option>
                <option value="Right-arm medium fast">
                  Right-arm medium fast
                </option>
                <option value="Left-arm fast">Left-arm fast</option>
                <option value="Right-arm off break">Right-arm off break</option>
                <option value="Right-arm leg break">Right-arm leg break</option>
                <option value="Slow left-arm orthodox">
                  Slow left-arm orthodox
                </option>
                <option value="None">None</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-6 pt-1">
            <label className="flex items-center gap-2 text-xs font-semibold text-zinc-700 cursor-pointer">
              <input
                type="checkbox"
                checked={isCaptain}
                onChange={(e) => {
                  setIsCaptain(e.target.checked);
                  if (e.target.checked) setIsViceCaptain(false);
                }}
                className="h-4 w-4 rounded text-zinc-900 border-zinc-300 focus:ring-zinc-900"
              />
              <span>Team Captain</span>
            </label>
            <label className="flex items-center gap-2 text-xs font-semibold text-zinc-700 cursor-pointer">
              <input
                type="checkbox"
                checked={isViceCaptain}
                disabled={isCaptain}
                onChange={(e) => setIsViceCaptain(e.target.checked)}
                className="h-4 w-4 rounded text-zinc-900 border-zinc-300 focus:ring-zinc-900"
              />
              <span>Vice Captain</span>
            </label>
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
              Add to Squad
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
