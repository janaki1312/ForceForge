import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { LayoutGrid, List, Clock, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PriorityBadge, RiskDot } from "@/components/app/badges";
import { tasks, type Task } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_app/tasks")({
  head: () => ({ meta: [{ title: "Tasks — ForceForge" }] }),
  component: Tasks,
});

const groups: { id: Task["group"]; label: string }[] = [
  { id: "today", label: "Today" },
  { id: "tomorrow", label: "Tomorrow" },
  { id: "this_week", label: "This week" },
  { id: "completed", label: "Completed" },
];

function TaskCard({ t }: { t: Task }) {
  return (
    <div className="glass-card rounded-2xl p-4 transition hover:border-primary/40">
      <div className="flex items-start justify-between gap-2">
        <div className="text-sm font-medium">{t.title}</div>
        <PriorityBadge value={t.priority} />
      </div>
      {t.tag && <div className="mt-2 inline-block rounded-md border border-border bg-card/60 px-2 py-0.5 text-[10px] uppercase tracking-wider text-muted-foreground">{t.tag}</div>}
      <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1"><Clock className="size-3" /> {t.estimatedMinutes}m</span>
        <span className="inline-flex items-center gap-1"><Calendar className="size-3" /> {t.deadline}</span>
      </div>
      <div className="mt-3">
        <div className="h-1 w-full overflow-hidden rounded-full bg-muted">
          <div className="h-full gradient-bg" style={{ width: `${t.progress}%` }} />
        </div>
        <div className="mt-1.5 flex items-center justify-between text-[11px] text-muted-foreground">
          <span>{t.progress}% done</span>
          <RiskDot value={t.risk} />
        </div>
      </div>
    </div>
  );
}

function Tasks() {
  const [view, setView] = useState<"kanban" | "list">("kanban");

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Tasks</h1>
          <p className="text-muted-foreground">Everything on your plate, grouped by when it needs to move.</p>
        </div>
        <div className="flex rounded-xl border border-border bg-card/60 p-1">
          <button
            onClick={() => setView("kanban")}
            className={cn("inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs", view === "kanban" ? "bg-secondary text-foreground" : "text-muted-foreground")}
          >
            <LayoutGrid className="size-3.5" /> Kanban
          </button>
          <button
            onClick={() => setView("list")}
            className={cn("inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs", view === "list" ? "bg-secondary text-foreground" : "text-muted-foreground")}
          >
            <List className="size-3.5" /> List
          </button>
        </div>
      </div>

      {view === "kanban" ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {groups.map((g) => {
            const items = tasks.filter((t) => t.group === g.id);
            return (
              <div key={g.id} className="rounded-3xl border border-border/60 bg-card/30 p-3">
                <div className="mb-3 flex items-center justify-between px-1">
                  <div className="text-sm font-medium">{g.label}</div>
                  <span className="rounded-md bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground">{items.length}</span>
                </div>
                <div className="space-y-2">
                  {items.map((t) => <TaskCard key={t.id} t={t} />)}
                  {items.length === 0 && (
                    <div className="rounded-2xl border border-dashed border-border p-6 text-center text-xs text-muted-foreground">
                      Nothing here. Quiet wins.
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="glass-card overflow-hidden rounded-3xl">
          <ul className="divide-y divide-border/60">
            {tasks.map((t) => (
              <li key={t.id} className="flex items-center gap-4 px-5 py-3 hover:bg-card/50">
                <span className={cn("size-2 rounded-full", t.status === "done" ? "bg-success" : t.status === "in_progress" ? "bg-primary" : "bg-muted-foreground/50")} />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium">{t.title}</div>
                  <div className="text-xs text-muted-foreground">{t.deadline} · {t.estimatedMinutes} min</div>
                </div>
                <RiskDot value={t.risk} />
                <PriorityBadge value={t.priority} />
                <Button size="sm" variant="ghost">Open</Button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
