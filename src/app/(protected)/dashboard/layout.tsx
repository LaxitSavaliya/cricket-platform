import { redirect } from "next/navigation";

import type { ReactNode } from "react";

import { getOrganizationOnboardingStatusServer } from "@/features/organization/organization.server";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const onboarded = await getOrganizationOnboardingStatusServer();

  if (onboarded === null) {
    redirect("/login");
  }

  if (!onboarded) {
    redirect("/onboarding");
  }

  return children;
}
