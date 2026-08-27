import { Plus, Search, Trophy } from "lucide-react";

import { Button } from "@/components/ui/Button";
import type { TournamentEmptyStateProps } from "../tournament.types";

export function TournamentEmptyState({
  isSearchFiltered = false,
  onClearSearch,
  onCreateTournament,
}: TournamentEmptyStateProps) {
  if (isSearchFiltered) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-300 bg-white p-12 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-100 text-zinc-400">
          <Search className="h-6 w-6" />
        </div>
        <h3 className="mt-4 text-base font-semibold text-zinc-900">
          No matching tournaments found
        </h3>
        <p className="mt-1 max-w-sm text-xs text-zinc-500">
          We couldn&apos;t find any tournaments matching your search terms. Try
          checking your spelling or reset the filter.
        </p>
        {onClearSearch && (
          <Button
            variant="secondary"
            size="sm"
            onClick={onClearSearch}
            className="mt-5"
          >
            Clear Search Filter
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-300 bg-white p-12 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 border border-amber-100">
        <Trophy className="h-7 w-7" />
      </div>
      <h3 className="mt-4 text-base font-semibold text-zinc-900">
        No Tournaments Created Yet
      </h3>
      <p className="mt-1 max-w-md text-xs text-zinc-500">
        Create your first cricket tournament to start scheduling matches,
        registering teams, managing players, and running live scoring.
      </p>
      <Button
        variant="primary"
        onClick={onCreateTournament}
        leftIcon={<Plus className="h-4 w-4" />}
        className="mt-5 px-4 py-2.5 text-xs font-semibold"
      >
        Create First Tournament
      </Button>
    </div>
  );
}
