import {
  keepPreviousData,
  useInfiniteQuery,
  useMutation,
  useQueryClient,
  type InfiniteData,
} from "@tanstack/react-query";

import { createTournament, getTournaments } from "./tournament.api";
import { TOURNAMENT_QUERY_KEYS } from "./tournament.constants";
import type { CreateTournamentInput } from "./tournament.schema";
import type {
  Tournament,
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
    placeholderData: keepPreviousData,
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

export function useCreateTournament(options?: {
  onSuccess?: (data: Tournament, variables: CreateTournamentInput) => void;
  onError?: (error: Error) => void;
}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateTournamentInput) => createTournament(input),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: TOURNAMENT_QUERY_KEYS.all,
      });
      options?.onSuccess?.(data, variables);
    },
    onError: (error: Error) => {
      options?.onError?.(error);
    },
  });
}
