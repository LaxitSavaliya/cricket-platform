import { useMutation } from "@tanstack/react-query";

import { createOrganization } from "./organization.api";
import type {
  CreateOrganizationMutationOptions,
  CreateOrganizationRequest,
  CreateOrganizationResult,
} from "./organization.types";

export function useCreateOrganization(
  options: CreateOrganizationMutationOptions = {},
) {
  return useMutation<
    CreateOrganizationResult,
    Error,
    CreateOrganizationRequest
  >({
    ...options,
    mutationFn: createOrganization,
  });
}
