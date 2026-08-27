import { Bell, Search } from "lucide-react";

export function Topbar() {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-zinc-200 bg-white/95 backdrop-blur-sm px-5">
      <div className="flex items-center gap-4">
        <div className="relative w-48 sm:w-72">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full rounded-xl border border-zinc-200 bg-zinc-50/50 py-1.5 pl-9 pr-3 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-400 focus:bg-white focus:outline-none"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          className="relative flex h-9.5 w-9.5 items-center justify-center rounded-xl border border-zinc-200 text-zinc-500 hover:bg-zinc-50 hover:text-zinc-800"
          aria-label="Notifications"
        >
          <Bell className="h-4.5 w-4.5" />
          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-emerald-500 ring-2 ring-white" />
        </button>

        <div className="flex items-center gap-2 border-l border-zinc-200 pl-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-900 text-xs font-medium text-white">
            CR
          </div>
        </div>
      </div>
    </header>
  );
}
