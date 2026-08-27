import type { ApiResponse } from "@/lib/api/api-response";
import { http } from "@/lib/api/http";
import type {
  TournamentListParams,
  TournamentListResult,
} from "./tournament.types";

export async function getTournaments(
  params?: TournamentListParams,
): Promise<TournamentListResult> {
  const response = await http.get<ApiResponse<TournamentListResult>>(
    "/tournaments",
    {
      params,
    },
  );
  return response.data.data;
}
