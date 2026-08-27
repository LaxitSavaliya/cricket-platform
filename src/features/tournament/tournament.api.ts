import type { ApiResponse } from "@/lib/api/api-response";
import { http } from "@/lib/api/http";
import type { CreateTournamentInput } from "./tournament.schema";
import type {
  Tournament,
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

export async function createTournament(
  data: CreateTournamentInput,
): Promise<Tournament> {
  const response = await http.post<ApiResponse<Tournament>>(
    "/tournaments",
    data,
  );
  return response.data.data;
}
