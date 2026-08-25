import { redirect } from "next/navigation";

import type { ReactNode } from "react";

import { getOrganizationOnboardingStatusServer } from "@/features/organization/organization.server";

export default async function OnboardingLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const onboarded = await getOrganizationOnboardingStatusServer();

  if (onboarded === null) {
    redirect("/login");
  }

  if (onboarded) {
    redirect("/dashboard");
  }

  return children;
}
