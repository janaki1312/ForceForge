import { Search, Bell, Plus } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function Topbar() {
  const navigate = useNavigate();
  const [unread, setUnread] = useState(3);

  const [search, setSearch] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);

  const handleSearch = () => {
    const q = search.toLowerCase().trim();

    if (q.includes("dashboard")) navigate({ to: "/dashboard" });
    else if (q.includes("forge") || q.includes("plan"))
      navigate({ to: "/forge" });
    else if (q.includes("focus")) navigate({ to: "/focus" });
    else if (q.includes("task")) navigate({ to: "/tasks" });
    else if (q.includes("reflection")) navigate({ to: "/reflection" });
    else if (q.includes("profile")) navigate({ to: "/profile" });
    else if (q.includes("setting")) navigate({ to: "/settings" });
  };

  return (
    <header className="sticky top-0 z-20 flex h-14 items-center gap-3 border-b border-border/60 bg-background/70 px-6 backdrop-blur-xl">
      <div className="relative max-w-md flex-1">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              window.location.href = "/tasks";
            }
          }}
          placeholder="Search tasks, plans, reflections..."
          className="w-full rounded-xl border border-border bg-card/60 py-2 pl-9 pr-3 text-sm placeholder:text-muted-foreground/70 outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/20"
        />
      </div>

      <div className="ml-auto flex items-center gap-2">

        <div className="relative">
          <Button
              variant="ghost"
              size="icon"
              className="rounded-xl"
              aria-label="Notifications"
              onClick={() => alert("No new notifications. You're on track today!")}
            >
              <Bell className="size-4" />
            </Button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-72 rounded-xl border border-border bg-card p-4 shadow-xl">
              <h3 className="mb-2 font-medium">Notifications</h3>

              <p className="text-sm text-muted-foreground">
                ✅ AI execution plan generated.
              </p>

              <p className="mt-2 text-sm text-muted-foreground">
                🎯 Ready for a focus session.
              </p>

              <p className="mt-2 text-sm text-muted-foreground">
                🔥 Keep your streak alive today.
              </p>
            </div>
          )}
        </div>

            <Button
              size="sm"
              className="rounded-xl gradient-bg text-white"
              onClick={() => {
                localStorage.removeItem("forceforge-plan");
                localStorage.removeItem("forceforge-current-task");
                window.location.href = "/forge";
              }}
            >
              <Plus className="size-4" />
              New plan
            </Button>
      </div>
    </header>
  );
}