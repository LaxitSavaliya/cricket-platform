import { useInfiniteQuery, type InfiniteData } from "@tanstack/react-query";

import { getTournaments } from "./tournament.api";
import { TOURNAMENT_QUERY_KEYS } from "./tournament.constants";
import type {
  TournamentListResult,
  UseInfiniteTournamentsOptions,
} from "./tournament.types";

export function useInfiniteTournaments({
  search,
  sortBy = "createdAt",
  sortOrder = "desc",
  initialData,
}: UseInfiniteTournamentsOptions = {}) {
  const normalizedSearch = search?.trim() || undefined;

  const isDefaultQuery =
    !normalizedSearch && sortBy === "createdAt" && sortOrder === "desc";

  return useInfiniteQuery<
    TournamentListResult,
    Error,
    InfiniteData<TournamentListResult>,
    readonly unknown[],
    number
  >({
    queryKey: TOURNAMENT_QUERY_KEYS.list({
      search: normalizedSearch,
      sortBy,
      sortOrder,
    }),
    queryFn: ({ pageParam = 0 }) =>
      getTournaments({
        offset: pageParam,
        search: normalizedSearch,
        sortBy,
        sortOrder,
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextOffset ?? undefined,
    initialData:
      initialData && isDefaultQuery
        ? {
            pages: [initialData],
            pageParams: [0],
          }
        : undefined,
    staleTime: 1000 * 60 * 2, // 2 minutes
  });
}
