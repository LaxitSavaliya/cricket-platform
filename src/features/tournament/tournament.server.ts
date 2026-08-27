import "server-only";

import { headers } from "next/headers";

import { env } from "@/config/env";
import type { ApiResponse } from "@/lib/api/api-response";
import type {
  TournamentListParams,
  TournamentListResult,
} from "./tournament.types";

const EMPTY_RESULT: TournamentListResult = {
  items: [],
  total: 0,
  nextOffset: null,
  hasMore: false,
};

export async function getTournamentsServer(
  params?: TournamentListParams,
): Promise<TournamentListResult> {
  const requestHeaders = await headers();

  const cookieHeader = requestHeaders.get("cookie");

  if (!cookieHeader) {
    return EMPTY_RESULT;
  }

  const queryParams = new URLSearchParams();
  if (params?.offset !== undefined) {
    queryParams.set("offset", String(params.offset));
  }
  if (params?.search) {
    queryParams.set("search", params.search);
  }
  if (params?.sortBy) {
    queryParams.set("sortBy", params.sortBy);
  }
  if (params?.sortOrder) {
    queryParams.set("sortOrder", params.sortOrder);
  }

  const queryString = queryParams.toString();
  const url = `${env.API_BASE_URL}/tournaments${queryString ? `?${queryString}` : ""}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      cookie: cookieHeader,
    },
    cache: "no-store",
  });

  if (response.status === 401 || response.status === 403) {
    return EMPTY_RESULT;
  }

  if (!response.ok) {
    throw new Error(`Failed to fetch tournaments: ${response.status}`);
  }

  const result = (await response.json()) as ApiResponse<TournamentListResult>;

  return result.data ?? EMPTY_RESULT;
}
