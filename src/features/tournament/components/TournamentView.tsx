"use client";

import { ChevronDown } from "lucide-react";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/Button";
import { useDebounce } from "@/hooks";
import { useInfiniteTournaments } from "../tournament.queries";
import type {
  TournamentListResult,
  TournamentSortBy,
  TournamentSortOptionValue,
  TournamentSortOrder,
  TournamentViewMode,
  TournamentViewProps,
} from "../tournament.types";
import { CreateTournamentModal } from "./CreateTournamentModal";
import { TournamentCard } from "./TournamentCard";
import { TournamentEmptyState } from "./TournamentEmptyState";
import { TournamentHeader } from "./TournamentHeader";
import { TournamentSkeleton } from "./TournamentSkeleton";
import { TournamentStats } from "./TournamentStats";
import { TournamentTable } from "./TournamentTable";

export function TournamentView({ initialData }: TournamentViewProps) {
  const normalizedInitialData: TournamentListResult = useMemo(() => {
    return (
      initialData ?? {
        items: [],
        total: 0,
        nextOffset: null,
        hasMore: false,
      }
    );
  }, [initialData]);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearch = useDebounce(searchQuery.trim(), 300);
  const [sortBy, setSortBy] =
    useState<TournamentSortOptionValue>("createdAt-desc");
  const [viewMode, setViewMode] = useState<TournamentViewMode>("grid");

  const [sortByField, sortOrderField] = useMemo((): [
    TournamentSortBy,
    TournamentSortOrder,
  ] => {
    switch (sortBy) {
      case "createdAt-asc":
        return ["createdAt", "asc"];
      case "name-asc":
        return ["name", "asc"];
      case "name-desc":
        return ["name", "desc"];
      case "teamsCount-desc":
        return ["teamsCount", "desc"];
      case "createdAt-desc":
      default:
        return ["createdAt", "desc"];
    }
  }, [sortBy]);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isFetching } =
    useInfiniteTournaments({
      search: debouncedSearch,
      sortBy: sortByField,
      sortOrder: sortOrderField,
      initialData: normalizedInitialData,
    });

  const isSearchActive = Boolean(searchQuery.trim() || debouncedSearch);
  const isDebouncing = searchQuery.trim() !== debouncedSearch;
  const isSearchLoading =
    isDebouncing ||
    (Boolean(debouncedSearch) && isFetching && !isFetchingNextPage);

  const tournaments = useMemo(() => {
    if (data?.pages) {
      return data.pages.flatMap((page) => page.items);
    }
    if (!isSearchActive && !debouncedSearch) {
      return normalizedInitialData.items;
    }
    return [];
  }, [data, isSearchActive, debouncedSearch, normalizedInitialData.items]);

  const totalCount =
    data?.pages[0]?.total ?? (isSearchActive ? 0 : normalizedInitialData.total);

  const isInitialEmpty =
    !isSearchActive &&
    !isFetching &&
    totalCount === 0 &&
    tournaments.length === 0;

  const isSearchEmpty =
    Boolean(debouncedSearch) &&
    !isSearchLoading &&
    !isFetching &&
    tournaments.length === 0;

  return (
    <div className="flex flex-col gap-6">
      {/* Top Header Controls */}
      <TournamentHeader
        totalCount={totalCount}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        sortBy={sortBy}
        onSortChange={setSortBy}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onOpenCreateModal={() => setIsCreateModalOpen(true)}
      />

      {/* Stats Summary */}
      {totalCount > 0 && !isSearchActive && (
        <TournamentStats tournaments={tournaments} totalCount={totalCount} />
      )}

      {/* Main Content Area */}
      {isInitialEmpty ? (
        <TournamentEmptyState
          onCreateTournament={() => setIsCreateModalOpen(true)}
        />
      ) : isSearchEmpty ? (
        <TournamentEmptyState
          isSearchFiltered
          onClearSearch={() => setSearchQuery("")}
        />
      ) : isSearchLoading && tournaments.length === 0 ? (
        <TournamentSkeleton viewMode={viewMode} count={6} />
      ) : (
        <div className="flex flex-col gap-6">
          {/* Subtle loading indicator during refetching/search */}
          <div
            className={`transition-opacity duration-200 ${
              isFetching && !isFetchingNextPage ? "opacity-60" : "opacity-100"
            }`}
          >
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                {tournaments.map((tournament) => (
                  <TournamentCard
                    key={tournament.slug}
                    tournament={tournament}
                  />
                ))}
              </div>
            ) : (
              <TournamentTable tournaments={tournaments} />
            )}
          </div>

          {/* Load More Pagination Section */}
          {hasNextPage ? (
            <div className="mt-4 flex flex-col items-center justify-center gap-3">
              <Button
                variant="secondary"
                onClick={() => fetchNextPage()}
                isLoading={isFetchingNextPage}
                loadingText="Loading more tournaments..."
                rightIcon={<ChevronDown className="h-4 w-4 text-zinc-500" />}
                className="px-5 py-2.5 text-xs font-semibold text-zinc-800"
              >
                Load More Tournaments
              </Button>
            </div>
          ) : null}
        </div>
      )}

      {/* Create Tournament Dialog Modal */}
      <CreateTournamentModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
}
