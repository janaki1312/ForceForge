import { Search, Bell, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Topbar() {
  return (
    <header className="sticky top-0 z-20 flex h-14 items-center gap-3 border-b border-border/60 bg-background/70 px-6 backdrop-blur-xl">
      <div className="relative max-w-md flex-1">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <input
          placeholder="Search tasks, plans, reflections…   ⌘K"
          className="w-full rounded-xl border border-border bg-card/60 py-2 pl-9 pr-3 text-sm placeholder:text-muted-foreground/70 outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/20"
        />
      </div>
      <div className="ml-auto flex items-center gap-2">
        <Button variant="ghost" size="icon" className="rounded-xl" aria-label="Notifications">
          <Bell className="size-4" />
        </Button>
        <Button size="sm" className="rounded-xl gradient-bg text-white">
          <Plus className="size-4" /> New plan
        </Button>
      </div>
    </header>
  );
}
