import { redirect } from "next/navigation";
import type { ReactNode } from "react";

import { Sidebar } from "@/components/layout";
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

  return (
    <div className="flex min-h-screen bg-zinc-50 text-zinc-900">
      <Sidebar />

      <div className="flex flex-1 flex-col min-w-0">
        {/* <Topbar /> */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
