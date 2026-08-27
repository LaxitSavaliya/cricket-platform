"use client";

import {
  ChevronRight,
  LayoutDashboard,
  Radio,
  Settings,
  Trophy,
  User,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
  name: string;
  href: string;
  icon: typeof LayoutDashboard;
}

const navigation: NavItem[] = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Tournament", href: "/tournament", icon: Trophy },
  { name: "Matches", href: "/matches", icon: Trophy },
  { name: "Teams & Players", href: "/teams", icon: Users },
  { name: "Live Scoring", href: "/scoring", icon: Radio },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col justify-between border-r border-zinc-200 bg-white md:flex">
      <div className="flex flex-col gap-6 p-4">
        {/* Logo & Brand */}
        <Link href="/dashboard" className="flex items-center gap-3 px-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-950 font-bold text-white shadow-xs">
            C
          </div>
          <div>
            <h1 className="text-base font-semibold tracking-tight text-zinc-950">
              Cricket
            </h1>
            <p className="text-xs text-zinc-400">Scoring & Management</p>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="flex flex-col gap-1.5">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname?.startsWith(item.href);

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 rounded-xl px-5 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-zinc-300/50 text-black shadow-xs border border-zinc-300"
                    : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950"
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Profile Button at Sidebar End */}
      <div className="border-t border-zinc-100 p-4">
        <Link
          href="/dashboard/profile"
          className="flex items-center justify-between rounded-xl bg-zinc-50 p-3 text-sm transition-colors hover:bg-zinc-100/80"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-900 text-xs font-semibold text-white">
              <User className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <p className="truncate text-xs font-semibold text-zinc-900">
                Admin Profile
              </p>
              <p className="truncate text-[11px] text-zinc-500">View profile</p>
            </div>
          </div>
          <ChevronRight className="h-4 w-4 text-zinc-400 shrink-0" />
        </Link>
      </div>
    </aside>
  );
}
