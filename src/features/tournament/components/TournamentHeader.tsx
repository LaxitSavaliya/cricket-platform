import { Grid, List, Plus, Search } from "lucide-react";

import { FormField } from "@/components/form/FormField";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { TOURNAMENT_SORT_OPTIONS } from "../tournament.constants";
import type {
  TournamentHeaderProps,
  TournamentSortOptionValue,
} from "../tournament.types";

export function TournamentHeader({
  totalCount,
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange,
  onOpenCreateModal,
}: TournamentHeaderProps) {
  return (
    <div className="flex flex-col gap-5">
      {/* Top Banner with Title & Create Action */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight text-zinc-950">
              Tournaments
            </h1>
            <span className="inline-flex items-center rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-semibold text-zinc-700">
              {totalCount} {totalCount === 1 ? "Tournament" : "Tournaments"}
            </span>
          </div>
          <p className="mt-1 text-sm text-zinc-500">
            Manage championships, team registrations, venues, and match fixtures
          </p>
        </div>

        <Button
          variant="primary"
          onClick={onOpenCreateModal}
          leftIcon={<Plus className="h-4 w-4" />}
          className="px-4 py-2.5 text-xs font-semibold"
        >
          New Tournament
        </Button>
      </div>

      {/* Filter and Search Controls Bar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between rounded-2xl border border-zinc-200/80 bg-white p-3 shadow-xs">
        {/* Search Bar with FormField and Input */}
        <FormField className="relative flex-1 min-w-55">
          <Search className="pointer-events-none absolute left-3 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-zinc-400" />
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search tournament name, slug, or location..."
            className="h-9.5 rounded-xl border-zinc-200 bg-zinc-50/50 pl-9 pr-3 text-xs text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-400 focus:bg-white"
          />
        </FormField>

        {/* Controls: Sort and View mode */}
        <div className="flex items-center gap-2.5">
          <div className="w-44">
            <Select
              value={sortBy}
              options={TOURNAMENT_SORT_OPTIONS}
              onChange={(e) =>
                onSortChange(e.target.value as TournamentSortOptionValue)
              }
              className="h-9.5 rounded-xl border-zinc-200 bg-zinc-50/50 text-xs font-medium text-zinc-700 hover:bg-zinc-100/70 focus:border-zinc-400 focus:bg-white"
            />
          </div>

          <div className="flex items-center rounded-xl border border-zinc-200 py-0.5 px-1.5 bg-zinc-50/50">
            <button
              type="button"
              onClick={() => onViewModeChange("grid")}
              className={`flex h-8 w-8 items-center justify-center cursor-pointer rounded-lg text-xs transition-colors ${
                viewMode === "grid"
                  ? "bg-white text-zinc-950 shadow-xs font-semibold"
                  : "text-zinc-400 hover:text-zinc-700"
              }`}
              aria-label="Grid View"
            >
              <Grid className="h-4.25 w-4.25" />
            </button>
            <button
              type="button"
              onClick={() => onViewModeChange("list")}
              className={`flex h-8 w-8 items-center justify-center cursor-pointer rounded-lg text-xs transition-colors ${
                viewMode === "list"
                  ? "bg-white text-zinc-950 shadow-xs font-semibold"
                  : "text-zinc-400 hover:text-zinc-700"
              }`}
              aria-label="List View"
            >
              <List className="h-4.25 w-4.25" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
