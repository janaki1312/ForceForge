import { Link, useRouterState } from "@tanstack/react-router";
import { Home, Zap, Target, CheckSquare, LineChart, Settings, User, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { to: "/dashboard", label: "Dashboard", icon: Home },
  { to: "/forge", label: "Forge", icon: Zap },
  { to: "/focus", label: "Focus Session", icon: Target },
  { to: "/tasks", label: "Tasks", icon: CheckSquare },
  { to: "/reflection", label: "Reflection", icon: LineChart },
];

const footer = [
  { to: "/settings", label: "Settings", icon: Settings },
  { to: "/profile", label: "Profile", icon: User },
];

export function AppSidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <aside className="hidden h-screen w-60 shrink-0 flex-col border-r border-sidebar-border bg-sidebar p-3 md:flex">
      <Link to="/" className="mb-6 flex items-center gap-2 px-2 py-2">
        <div className="grid size-8 place-items-center rounded-lg gradient-bg glow">
          <Zap className="size-4 text-white" />
        </div>
        <div>
          <div className="text-sm font-semibold tracking-tight">ForceForge</div>
          <div className="text-[10px] text-muted-foreground">Execution companion</div>
        </div>
      </Link>

      <nav className="flex flex-1 flex-col gap-0.5">
        {items.map((it) => {
          const active = pathname === it.to;
          return (
            <Link
              key={it.to}
              to={it.to}
              className={cn(
                "group flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-sidebar-foreground/80 transition-all",
                active
                  ? "bg-sidebar-accent text-sidebar-foreground shadow-[inset_0_0_0_1px_var(--sidebar-border)]"
                  : "hover:bg-sidebar-accent/60 hover:text-sidebar-foreground",
              )}
            >
              <it.icon
                className={cn("size-4", active ? "text-primary" : "text-muted-foreground")}
              />
              {it.label}
              {active && <span className="ml-auto size-1.5 rounded-full bg-primary" />}
            </Link>
          );
        })}

        <div className="mx-2 my-4 h-px bg-sidebar-border/70" />

        {footer.map((it) => {
          const active = pathname === it.to;
          return (
            <Link
              key={it.to}
              to={it.to}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-sidebar-foreground/80 transition-all",
                active ? "bg-sidebar-accent text-sidebar-foreground" : "hover:bg-sidebar-accent/60",
              )}
            >
              <it.icon className="size-4 text-muted-foreground" />
              {it.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-3 rounded-2xl border border-sidebar-border bg-sidebar-accent/40 p-3">
        <div className="flex items-center gap-2 text-xs font-medium">
          <Sparkles className="size-3.5 text-accent" /> Streak
        </div>
        <div className="mt-1 text-2xl font-semibold">7 days</div>
        <div className="text-[11px] text-muted-foreground">Showing up consistently.</div>
      </div>
    </aside>
  );
}
