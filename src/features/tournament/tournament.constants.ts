export const TOURNAMENT_QUERY_KEYS = {
  all: ["tournaments"] as const,
  lists: () => [...TOURNAMENT_QUERY_KEYS.all, "list"] as const,
  list: (filters?: Record<string, unknown>) =>
    [...TOURNAMENT_QUERY_KEYS.lists(), { ...(filters ?? {}) }] as const,
  details: () => [...TOURNAMENT_QUERY_KEYS.all, "detail"] as const,
  detail: (slug: string) => [...TOURNAMENT_QUERY_KEYS.details(), slug] as const,
};

export const TOURNAMENT_SORT_OPTIONS = [
  { value: "createdAt-desc", label: "Newest First" },
  { value: "createdAt-asc", label: "Oldest First" },
  { value: "name-asc", label: "Name (A-Z)" },
  { value: "name-desc", label: "Name (Z-A)" },
  { value: "teamsCount-desc", label: "Most Teams" },
] as const;
