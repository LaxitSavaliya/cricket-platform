"use client";

import {
  ArrowLeft,
  Calendar,
  Check,
  MapPin,
  Plus,
  Settings,
  Share2,
  Trophy,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/Button";
import { toast } from "@/providers/ToastProvider";
import type { TournamentDetailData } from "../tournament-detail.types";

interface TournamentDetailHeaderProps {
  data: TournamentDetailData;
  activeTab: string;
  onTabChange: (tab: string) => void;
  onOpenScheduleModal: () => void;
  onOpenAddTeamModal: () => void;
}

export function TournamentDetailHeader({
  data,
  onTabChange,
  onOpenScheduleModal,
  onOpenAddTeamModal,
}: TournamentDetailHeaderProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      toast.success(
        "Link copied to clipboard",
        "Tournament link ready to share with teams and players.",
      );
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="space-y-4">
      {/* Top breadcrumb navigation */}
      <div className="flex items-center justify-between">
        <Link
          href="/tournament"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-500 hover:text-zinc-900 transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to All Tournaments</span>
        </Link>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            {data.status} Tournament
          </span>
          <span className="rounded-full border border-zinc-200 bg-white px-2.5 py-1 text-xs font-medium text-zinc-700 shadow-2xs">
            {data.formatBadge}
          </span>
        </div>
      </div>

      {/* Main Tournament Banner Card */}
      <div className="relative overflow-hidden rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8 shadow-xs">
        {/* Subtle accent bar on top */}
        <div className="absolute inset-x-0 top-0 h-1.5 bg-linear-to-r from-zinc-900 via-zinc-700 to-zinc-800" />

        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          {/* Left: Icon & Meta */}
          <div className="flex items-start gap-4 sm:gap-5">
            <div className="flex h-14 w-14 sm:h-16 sm:w-16 shrink-0 items-center justify-center rounded-2xl bg-zinc-900 text-white shadow-md">
              <Trophy className="h-7 w-7 sm:h-8 sm:w-8 text-amber-400" />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950">
                  {data.name}
                </h1>
              </div>

              <div className="mt-1 flex items-center gap-2 text-xs font-mono text-zinc-400">
                <span>slug: /{data.slug}</span>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-y-2 gap-x-5 text-xs text-zinc-600">
                <div className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-zinc-400" />
                  <span>{data.location}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-zinc-400" />
                  <span>
                    {data.startDate} – {data.endDate}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                  <span>Prize Pool: {data.prizePool}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5 self-start pt-1">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopyLink}
              leftIcon={
                copied ? (
                  <Check className="h-3.5 w-3.5 text-emerald-600" />
                ) : (
                  <Share2 className="h-3.5 w-3.5" />
                )
              }
            >
              {copied ? "Link Copied" : "Share"}
            </Button>

            <Button
              variant="secondary"
              size="sm"
              onClick={() => onTabChange("settings")}
              leftIcon={<Settings className="h-3.5 w-3.5" />}
            >
              Settings
            </Button>

            <Button
              variant="secondary"
              size="sm"
              onClick={onOpenAddTeamModal}
              leftIcon={<Plus className="h-3.5 w-3.5" />}
            >
              Add Team
            </Button>

            <Button
              variant="primary"
              size="sm"
              onClick={onOpenScheduleModal}
              leftIcon={<Plus className="h-3.5 w-3.5" />}
            >
              Schedule Match
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
