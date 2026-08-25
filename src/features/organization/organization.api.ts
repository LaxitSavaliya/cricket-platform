import { http } from "@/lib/api/http";
import { CreateOrganizationRequest } from "./organization.types";

export async function createOrganization(
  payload: CreateOrganizationRequest,
): Promise<void> {
  await http.post("/organization/create-organization", payload);
}
