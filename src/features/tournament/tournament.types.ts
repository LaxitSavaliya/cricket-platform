export interface Tournament {
  name: string;
  slug: string;
  logoUrl: string | null;
  city: string | null;
  state: string | null;
  createdAt: string;
  updatedAt: string;
  teamsCount: number;
}

export type TournamentSortBy = "createdAt" | "name" | "teamsCount";

export type TournamentSortOrder = "asc" | "desc";

export type TournamentSortOptionValue =
  | "createdAt-desc"
  | "createdAt-asc"
  | "name-asc"
  | "name-desc"
  | "teamsCount-desc";

export type TournamentViewMode = "grid" | "list";

export interface TournamentListParams {
  offset?: number;
  search?: string;
  sortBy?: TournamentSortBy;
  sortOrder?: TournamentSortOrder;
}

export interface TournamentListResult {
  items: Tournament[];
  total: number;
  nextOffset: number | null;
  hasMore: boolean;
}

export interface TournamentFilterOptions {
  searchQuery?: string;
  city?: string;
  state?: string;
  sortBy?: TournamentSortBy;
  sortOrder?: TournamentSortOrder;
}

export interface TournamentStatsSummary {
  totalTournaments: number;
  totalTeams: number;
  totalLocations: number;
}

export interface TournamentViewProps {
  initialData: TournamentListResult;
}

export interface TournamentHeaderProps {
  totalCount: number;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  sortBy: TournamentSortOptionValue;
  onSortChange: (value: TournamentSortOptionValue) => void;
  viewMode: TournamentViewMode;
  onViewModeChange: (mode: TournamentViewMode) => void;
  onOpenCreateModal?: () => void;
}

export interface TournamentStatsProps {
  tournaments: Tournament[];
  totalCount?: number;
}

export interface TournamentCardProps {
  tournament: Tournament;
}

export interface TournamentTableProps {
  tournaments: Tournament[];
}

export interface TournamentSkeletonProps {
  viewMode?: TournamentViewMode;
  count?: number;
}

export interface TournamentEmptyStateProps {
  isSearchFiltered?: boolean;
  onClearSearch?: () => void;
  onCreateTournament?: () => void;
}

export interface CreateTournamentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (tournament: Tournament) => void;
}

export interface UseInfiniteTournamentsOptions {
  search?: string;
  sortBy?: TournamentSortBy;
  sortOrder?: TournamentSortOrder;
  initialData?: TournamentListResult;
}
