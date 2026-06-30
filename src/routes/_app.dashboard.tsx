import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  Brain,
  Calendar,
  Flame,
  Lightbulb,
  Play,
  Sparkles,
  TriangleAlert,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PriorityBadge, RiskDot } from "@/components/app/badges";
import { getCurrentDate } from "@/lib/date";
import { useNavigate } from "@tanstack/react-router";


export const Route = createFileRoute("/_app/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — ForceForge" }] }),
  component: Dashboard,
});

function Dashboard() {
  const [plan, setPlan] = useState<any>(null);
  const [quickNote, setQuickNote] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
  const loadNote = () => {
    const note = localStorage.getItem("forceforge-quick-note");
    setQuickNote(note ?? "");
  };

  loadNote();

  window.addEventListener("quick-note-updated", loadNote);

  const stored = localStorage.getItem("forceforge-plan");

  if (stored) {
    setPlan(JSON.parse(stored));
  }

  return () => {
    window.removeEventListener("quick-note-updated", loadNote);
  };
}, []);

 const forgeQueue = plan?.execution_plan ?? [];

  const insights = [
    {
      id: 1,
      title: "AI Analysis",
      body: plan
        ? "Your workload has been analyzed and prioritized based on urgency, deadlines, effort, and execution risk."
        : "Generate a plan to see AI insights.",
    },
  ];

  const deadlines =
    plan?.execution_plan?.map((task: any, index: number) => ({
      id: index,
      title: task.title,
      when: task.deadline,
      risk: plan?.risk?.level?.toLowerCase() ?? "low",
    })) ?? [];
  const today =
    plan?.execution_plan?.slice(0, 3).map((task: any, index: number) => ({
      id: index,
      title: task.title,
      estimatedMinutes: task.estimated_minutes,
      deadline: task.deadline,
      priority: task.priority,
      risk: plan?.risk?.level?.toLowerCase() ?? "low",
    })) ?? [];

    if (!plan) {
  return (
    <div className="mx-auto mt-24 max-w-xl text-center">
      <Brain className="mx-auto size-12 text-primary" />

      <h2 className="mt-4 text-3xl font-semibold">
        Welcome to ForceForge
      </h2>

      <p className="mt-2 text-muted-foreground">
        Generate your first AI execution plan to begin.
      </p>

      <Link to="/forge">
        <Button className="mt-6 gradient-bg text-white">
          Open Forge
        </Button>
      </Link>
    </div>
  );
}


  return (
    <div className="mx-auto max-w-6xl space-y-8">
          {quickNote && (
        <section className="glass-card rounded-3xl p-5">
          <h3 className="font-medium">Quick Capture</h3>

          <p className="mt-2 text-sm text-muted-foreground">
            {quickNote}
          </p>
        </section>
      )}

      <div className="flex items-end justify-between gap-4">
        <div>
          <div className="text-sm text-muted-foreground">
            {getCurrentDate()}
          </div>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight">AI Execution Dashboard</h1>
          <p className="mt-1 text-muted-foreground">
            {plan
              ? `Execution plan ready • ${plan.execution_plan.length} tasks prioritized`
              : "Generate a plan from the Forge page."}
          </p>
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
          <h2 className="mt-3 text-3xl font-semibold tracking-tight">
            {plan?.next_best_action?.title ?? "Generate a plan first"}
          </h2>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            {plan?.next_best_action?.reason ?? "Your AI-generated recommendation will appear here."}
          </p>

          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              {
                k: "Estimated",
                v: `${plan?.next_best_action?.estimated_minutes ?? "--"} min`,
              },
              {
                k: "Deadline",
                v: plan?.execution_plan?.[0]?.deadline ?? "--",
              },
              {
                k: "Priority",
                v: plan?.execution_plan?.[0]?.priority ?? "--",
              },
              {
                k: "Risk",
                v: plan?.risk?.level ?? "--",
              },
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
              <Button variant="outline" size="lg">
                Ask Forge for a plan
              </Button>
            </Link>
            <div className="ml-auto hidden items-center gap-2 text-xs text-muted-foreground md:flex">
              <Brain className="size-3.5 text-accent" />
              Why this first?{" "}
              {plan?.next_best_action?.reason ?? "AI will explain why this task is first."}
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
            <Link
              to="/forge"
              className="text-xs text-primary hover:underline inline-flex items-center gap-1"
            >
              Open Forge <ArrowRight className="size-3" />
            </Link>
          </div>
          <ol className="space-y-2">
            {forgeQueue.map((t: any, i: number) => (
              <li
                key={i}
                className="group flex items-center gap-4 rounded-2xl border border-transparent p-3 transition hover:border-border hover:bg-card/60"
              >
                <div className="grid size-8 place-items-center rounded-lg border border-border bg-card text-sm font-medium">
                  {i + 1}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium">{t.title}</div>
                  <div className="truncate text-xs text-muted-foreground">{t.deadline}</div>
                </div>
                <div className="text-xs text-muted-foreground">{t.estimated_minutes} min</div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    localStorage.setItem(
                      "forceforge-current-task",
                      JSON.stringify(t)
                    );

                    navigate({ to: "/focus" });
                  }}
                >
                  Start
                </Button>
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
            <Link to="/tasks" className="text-xs text-primary hover:underline">
              View all tasks
            </Link>
          </div>
          <ul className="divide-y divide-border/70">
            {today.map((t: any) => (
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
              {deadlines.map((d: any) => (
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
              {plan
                ? `${plan.risk.level} Risk • ${plan.risk.reason}`
                : "You're on track. No major execution risks detected."}
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
