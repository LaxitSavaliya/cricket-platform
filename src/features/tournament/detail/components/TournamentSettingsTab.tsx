"use client";

import { AlertTriangle, Save } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Switch } from "@/components/ui/Switch";
import { toast } from "@/providers/ToastProvider";
import type { TournamentSettings } from "../tournament-detail.types";

interface TournamentSettingsTabProps {
  initialSettings: TournamentSettings;
}

export function TournamentSettingsTab({
  initialSettings,
}: TournamentSettingsTabProps) {
  const [settings, setSettings] = useState<TournamentSettings>(initialSettings);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    setTimeout(() => {
      setIsSaving(false);
      toast.success(
        "Settings Saved",
        "Tournament rules and match configurations have been updated.",
      );
    }, 400);
  };

  const handleResetFixtures = () => {
    toast.warning(
      "Action Noted",
      "Fixtures cannot be reset while active matches are ongoing.",
    );
  };

  return (
    <form onSubmit={handleSave} className="space-y-6">
      {/* 1. Cricket Match Configuration Card */}
      <div className="rounded-2xl border border-zinc-200/80 bg-white p-6 shadow-xs">
        <div className="border-b border-zinc-100 pb-4">
          <h3 className="text-base font-bold text-zinc-950">
            Cricket Match Configurations
          </h3>
          <p className="text-xs text-zinc-500">
            Basic rules governing match overs, balls, and ball specifications
          </p>
        </div>

        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Format */}
          <div>
            <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
              Match Format
            </label>
            <select
              value={settings.format}
              onChange={(e) =>
                setSettings((s) => ({
                  ...s,
                  format: e.target.value as TournamentSettings["format"],
                }))
              }
              className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-xs text-zinc-900 outline-none focus:border-zinc-400 focus:ring-2 focus:ring-zinc-100"
            >
              <option value="T20">T20 (20 Overs)</option>
              <option value="T10">T10 (10 Overs)</option>
              <option value="ODI">One Day (50 Overs)</option>
              <option value="Custom">Custom Overs</option>
            </select>
          </div>

          {/* Overs per innings */}
          <div>
            <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
              Overs Per Innings
            </label>
            <Input
              type="number"
              value={settings.oversPerInnings}
              onChange={(e) =>
                setSettings((s) => ({
                  ...s,
                  oversPerInnings: Number(e.target.value),
                }))
              }
              min={5}
              max={50}
            />
          </div>

          {/* Powerplay overs */}
          <div>
            <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
              Powerplay Overs
            </label>
            <Input
              type="number"
              value={settings.powerplayOvers}
              onChange={(e) =>
                setSettings((s) => ({
                  ...s,
                  powerplayOvers: Number(e.target.value),
                }))
              }
              min={1}
              max={15}
            />
          </div>

          {/* Max overs per bowler */}
          <div>
            <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
              Max Overs / Bowler
            </label>
            <Input
              type="number"
              value={settings.maxOversPerBowler}
              onChange={(e) =>
                setSettings((s) => ({
                  ...s,
                  maxOversPerBowler: Number(e.target.value),
                }))
              }
              min={1}
              max={10}
            />
          </div>
        </div>

        {/* Ball & Pitch Type */}
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-zinc-100">
          <div>
            <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
              Match Ball Type
            </label>
            <select
              value={settings.ballType}
              onChange={(e) =>
                setSettings((s) => ({
                  ...s,
                  ballType: e.target.value as TournamentSettings["ballType"],
                }))
              }
              className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-xs text-zinc-900 outline-none focus:border-zinc-400 focus:ring-2 focus:ring-zinc-100"
            >
              <option value="Leather (White)">
                Leather (White) - Night/Day
              </option>
              <option value="Leather (Red)">Leather (Red) - Traditional</option>
              <option value="Leather (Pink)">Leather (Pink) - Day/Night</option>
              <option value="Tennis (Heavy)">Heavy Tennis Ball</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
              Pitch Specification
            </label>
            <select
              value={settings.pitchType}
              onChange={(e) =>
                setSettings((s) => ({
                  ...s,
                  pitchType: e.target.value as TournamentSettings["pitchType"],
                }))
              }
              className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-xs text-zinc-900 outline-none focus:border-zinc-400 focus:ring-2 focus:ring-zinc-100"
            >
              <option value="Natural Turf">Natural Turf</option>
              <option value="Astro Turf">Astro Turf / Artificial</option>
              <option value="Matting">Coir Matting</option>
            </select>
          </div>
        </div>
      </div>

      {/* 2. Rules & Tie-breakers Card */}
      <div className="rounded-2xl border border-zinc-200/80 bg-white p-6 shadow-xs">
        <div className="border-b border-zinc-100 pb-4">
          <h3 className="text-base font-bold text-zinc-950">
            Rules, Penalties & Tie-breakers
          </h3>
          <p className="text-xs text-zinc-500">
            Toggle Super Over and rain calculation regulations
          </p>
        </div>

        <div className="mt-5 space-y-4">
          {/* Super Over Switch */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-50/70 border border-zinc-100">
            <div>
              <p className="text-xs font-bold text-zinc-900">
                Super Over on Match Tie
              </p>
              <p className="text-[11px] text-zinc-500">
                A 1-over eliminator will automatically decide the winner if
                scores are level
              </p>
            </div>
            <Switch
              checked={settings.superOverEnabled}
              onChange={(val) =>
                setSettings((s) => ({ ...s, superOverEnabled: val }))
              }
            />
          </div>

          {/* DLS Method */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-50/70 border border-zinc-100">
            <div>
              <p className="text-xs font-bold text-zinc-900">
                Duckworth-Lewis-Stern (DLS) Method
              </p>
              <p className="text-[11px] text-zinc-500">
                Enable mathematical target adjustments for rain interruptions
              </p>
            </div>
            <Switch
              checked={settings.dlsMethodEnabled}
              onChange={(val) =>
                setSettings((s) => ({ ...s, dlsMethodEnabled: val }))
              }
            />
          </div>

          {/* Free Hit on No Ball */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-50/70 border border-zinc-100">
            <div>
              <p className="text-xs font-bold text-zinc-900">
                Free Hit for Front-Foot No Balls
              </p>
              <p className="text-[11px] text-zinc-500">
                Next delivery is immune to dismissals other than run out
              </p>
            </div>
            <Switch
              checked={settings.freeHitOnNoBall}
              onChange={(val) =>
                setSettings((s) => ({ ...s, freeHitOnNoBall: val }))
              }
            />
          </div>
        </div>
      </div>

      {/* 3. Tournament Officials */}
      <div className="rounded-2xl border border-zinc-200/80 bg-white p-6 shadow-xs">
        <div className="border-b border-zinc-100 pb-4">
          <h3 className="text-base font-bold text-zinc-950">
            Tournament Staff & Officials
          </h3>
          <p className="text-xs text-zinc-500">
            Designated lead umpire and official match scorer for tournament
            dispute resolution
          </p>
        </div>

        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
              Chief Tournament Umpire
            </label>
            <Input
              value={settings.leadUmpire}
              onChange={(e) =>
                setSettings((s) => ({ ...s, leadUmpire: e.target.value }))
              }
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
              Official Head Scorer
            </label>
            <Input
              value={settings.officialScorer}
              onChange={(e) =>
                setSettings((s) => ({ ...s, officialScorer: e.target.value }))
              }
            />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex items-center justify-end gap-3">
        <Button
          type="submit"
          variant="primary"
          size="md"
          isLoading={isSaving}
          leftIcon={<Save className="h-4 w-4" />}
        >
          Save Configurations
        </Button>
      </div>

      {/* 4. Danger Zone */}
      <div className="rounded-2xl border border-rose-200 bg-rose-50/30 p-6">
        <div className="flex items-center gap-2 text-rose-700 mb-1">
          <AlertTriangle className="h-4 w-4" />
          <h3 className="text-xs font-bold uppercase tracking-wider">
            Danger Zone
          </h3>
        </div>
        <p className="text-xs text-zinc-600 mb-4">
          Irreversible actions for this tournament. Use with caution.
        </p>

        <div className="flex flex-wrap items-center gap-3">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleResetFixtures}
            className="text-xs text-rose-700 border-rose-200 hover:bg-rose-100/50"
          >
            Reset Fixtures & Schedule
          </Button>
          <Button
            type="button"
            variant="destructive"
            size="sm"
            onClick={() =>
              toast.error(
                "Protected Action",
                "Tournament is currently active and cannot be deleted.",
              )
            }
          >
            Archive Tournament
          </Button>
        </div>
      </div>
    </form>
  );
}
