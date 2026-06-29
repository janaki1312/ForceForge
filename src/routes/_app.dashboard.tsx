import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Brain, Calendar, Flame, Lightbulb, Play, Sparkles, TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PriorityBadge, RiskDot } from "@/components/app/badges";
import { tasks, forgeQueue, insights, deadlines } from "@/lib/mock-data";

export const Route = createFileRoute("/_app/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — ForceForge" }] }),
  component: Dashboard,
});

function Dashboard() {
  const today = tasks.filter((t) => t.group === "today");

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <div className="flex items-end justify-between gap-4">
        <div>
          <div className="text-sm text-muted-foreground">Tuesday, June 30</div>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight">Good morning, Aarav</h1>
          <p className="mt-1 text-muted-foreground">Three things to move forward today. Let's start with the one that matters most.</p>
        </div>
      </div>

      {/* Next best action — hero */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass-card relative overflow-hidden rounded-3xl p-8"
      >
        <div className="pointer-events-none absolute -right-20 -top-20 size-72 rounded-full opacity-30 blur-3xl gradient-bg" />
        <div className="relative">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Sparkles className="size-3.5 text-accent" /> Next best action
          </div>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight">Finish DSA Question 5 — Graph traversal</h2>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            Highest leverage right now. Unblocks tomorrow's assignment and clears mental load before your hackathon block.
          </p>

          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { k: "Estimated", v: "25 min" },
              { k: "Deadline", v: "Tomorrow 9 AM" },
              { k: "Priority", v: "High" },
              { k: "Risk", v: "Low" },
            ].map((s) => (
              <div key={s.k} className="rounded-2xl border border-border bg-card/60 p-3">
                <div className="text-xs text-muted-foreground">{s.k}</div>
                <div className="mt-0.5 text-sm font-medium">{s.v}</div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link to="/focus">
              <Button className="gradient-bg text-white" size="lg">
                <Play className="size-4" /> Start focus session
              </Button>
            </Link>
            <Link to="/forge">
              <Button variant="outline" size="lg">Ask Forge for a plan</Button>
            </Link>
            <div className="ml-auto hidden items-center gap-2 text-xs text-muted-foreground md:flex">
              <Brain className="size-3.5 text-accent" />
              Why this first? Deadline tomorrow · blocks Q6 · fits your morning focus window
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Forge Queue */}
        <section className="glass-card rounded-3xl p-6 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Flame className="size-4 text-primary" />
              <h3 className="font-medium">Forge Queue</h3>
              <span className="text-xs text-muted-foreground">Your next three moves</span>
            </div>
            <Link to="/forge" className="text-xs text-primary hover:underline inline-flex items-center gap-1">
              Open Forge <ArrowRight className="size-3" />
            </Link>
          </div>
          <ol className="space-y-2">
            {forgeQueue.map((t, i) => (
              <li
                key={t.id}
                className="group flex items-center gap-4 rounded-2xl border border-transparent p-3 transition hover:border-border hover:bg-card/60"
              >
                <div className="grid size-8 place-items-center rounded-lg border border-border bg-card text-sm font-medium">
                  {i + 1}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium">{t.title}</div>
                  <div className="truncate text-xs text-muted-foreground">{t.reason}</div>
                </div>
                <div className="text-xs text-muted-foreground">{t.minutes} min</div>
                <Button size="sm" variant="ghost" className="opacity-0 group-hover:opacity-100">Start</Button>
              </li>
            ))}
          </ol>
        </section>

        {/* AI Insights */}
        <section className="glass-card rounded-3xl p-6">
          <div className="mb-4 flex items-center gap-2">
            <Lightbulb className="size-4 text-accent" />
            <h3 className="font-medium">AI insights</h3>
          </div>
          <div className="space-y-3">
            {insights.map((i) => (
              <div key={i.id} className="rounded-2xl border border-border bg-card/40 p-3">
                <div className="text-sm font-medium">{i.title}</div>
                <div className="mt-1 text-xs text-muted-foreground">{i.body}</div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Today's focus */}
        <section className="glass-card rounded-3xl p-6 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-medium">Today's focus</h3>
            <Link to="/tasks" className="text-xs text-primary hover:underline">View all tasks</Link>
          </div>
          <ul className="divide-y divide-border/70">
            {today.map((t) => (
              <li key={t.id} className="flex items-center gap-4 py-3">
                <span className="size-2 rounded-full bg-primary" />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium">{t.title}</div>
                  <div className="mt-0.5 flex items-center gap-3 text-xs text-muted-foreground">
                    <span>{t.estimatedMinutes} min</span>
                    <span>· {t.deadline}</span>
                    <RiskDot value={t.risk} />
                  </div>
                </div>
                <PriorityBadge value={t.priority} />
              </li>
            ))}
          </ul>
        </section>

        {/* Deadlines & risks */}
        <section className="space-y-6">
          <div className="glass-card rounded-3xl p-6">
            <div className="mb-4 flex items-center gap-2">
              <Calendar className="size-4 text-primary" />
              <h3 className="font-medium">Upcoming deadlines</h3>
            </div>
            <div className="space-y-3">
              {deadlines.map((d) => (
                <div key={d.id} className="flex items-center justify-between gap-3">
                  <div>
                    <div className="text-sm font-medium">{d.title}</div>
                    <div className="text-xs text-muted-foreground">{d.when}</div>
                  </div>
                  <RiskDot value={d.risk} />
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-danger/30 bg-danger/5 p-6">
            <div className="flex items-center gap-2 text-danger">
              <TriangleAlert className="size-4" />
              <h3 className="text-sm font-medium">Risk alert</h3>
            </div>
            <p className="mt-2 text-sm text-foreground/90">
              Interview prep has slipped 2 days. Schedule 30 minutes today to stay on track.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
