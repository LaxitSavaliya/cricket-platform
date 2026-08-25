import "server-only";

import { headers } from "next/headers";

import { env } from "@/config/env";
import type { ApiResponse } from "@/lib/api/api-response";
import type { OrganizationOnboardingStatus } from "./organization.types";

export async function getOrganizationOnboardingStatusServer(): Promise<
  boolean | null
> {
  const requestHeaders = await headers();

  const cookieHeader = requestHeaders.get("cookie");

  if (!cookieHeader) {
    return null;
  }

  const response = await fetch(
    `${env.API_BASE_URL}/organization/onboarding-status`,
    {
      method: "GET",
      headers: {
        cookie: cookieHeader,
      },
      cache: "no-store",
    },
  );

  if (response.status === 401) {
    return null;
  }

  if (!response.ok) {
    throw new Error(
      `Failed to fetch organization onboarding status: ${response.status}`,
    );
  }

  const result =
    (await response.json()) as ApiResponse<OrganizationOnboardingStatus>;

  return result.data.onboarded;
}
