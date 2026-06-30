import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Trophy, Brain, Sparkles, ArrowRight, BookOpen } from "lucide-react";
import { useEffect, useState } from "react";
import { getCurrentDate } from "@/lib/date";

export const Route = createFileRoute("/_app/reflection")({
  head: () => ({ meta: [{ title: "Reflection — ForceForge" }] }),
  component: Reflection,
});

function Reflection() {
  const [plan, setPlan] = useState<any>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const stored = localStorage.getItem("forceforge-plan");

    if (stored) {
      setPlan(JSON.parse(stored));
    }
  }, []);

  const completed = [];
  const pending = plan?.execution_plan ?? [];

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <div>
        <div className="inline-flex items-center gap-2 text-xs text-muted-foreground">
          <Sparkles className="size-3.5 text-accent" />
            Daily reflection · {getCurrentDate()}
        </div>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">A quiet look back.</h1>
        <p className="text-muted-foreground">Reflection turns motion into momentum.</p>
      </div>

      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card rounded-3xl p-8"
      >
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Trophy className="size-3.5 text-warning" /> Today's wins
        </div>
        <ul className="mt-3 space-y-2">
          <li className="flex items-center gap-3 text-sm">
            <span className="size-1.5 rounded-full bg-success" />
            AI generated a complete execution strategy.
          </li>

          <li className="flex items-center gap-3 text-sm">
            <span className="size-1.5 rounded-full bg-success" />
            Highest priority task identified.
          </li>

          <li className="flex items-center gap-3 text-sm">
            <span className="size-1.5 rounded-full bg-success" />
            Deadlines organized automatically.
          </li>
        </ul>
      </motion.section>

      <div className="grid gap-6 md:grid-cols-2">
        <section className="glass-card rounded-3xl p-6">
          <div className="text-sm font-medium">Completed</div>
          <div className="mt-1 text-3xl font-semibold gradient-text">{0} tasks</div>
          <ul className="mt-3 text-sm text-muted-foreground">
            <li>No completed tasks yet.</li>
          </ul>
        </section>
        <section className="glass-card rounded-3xl p-6">
          <div className="text-sm font-medium">Still open</div>
          <div className="mt-1 text-3xl font-semibold">{pending.length} tasks</div>
          <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
            {pending.slice(0, 4).map((t: any, i: number) => (
              <li key={i}>• {t.title}</li>
            ))}
          </ul>
        </section>
      </div>

      <section className="glass-card rounded-3xl p-6">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Brain className="size-3.5 text-accent" /> AI reflection
        </div>
        <p className="mt-3 text-base leading-relaxed text-foreground/90">
          {plan?.reasoning ?? "Generate a plan from Forge to see AI insights."}
        </p>
        <div className="mt-4 rounded-2xl border border-border bg-card/50 p-4">
          <div className="text-xs text-muted-foreground">Biggest challenge</div>
          <div className="mt-1 text-sm">
            {plan?.risk?.reason ?? "No major challenges detected."}
          </div>
        </div>
      </section>

      <section className="glass-card rounded-3xl p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-medium">
            <ArrowRight className="size-4 text-primary" />
            Tomorrow's priorities
          </div>
        </div>

        <ol className="mt-3 space-y-2">
          {pending.slice(0, 3).map((t: any, i: number) => (
            <li
              key={i}
              className="flex items-center gap-3 rounded-2xl border border-border bg-card/50 p-3 text-sm"
            >
              <span className="grid size-6 place-items-center rounded-md border border-border text-xs">
                {i + 1}
              </span>

              {t.title}
            </li>
          ))}
        </ol>
      </section>

      <section className="glass-card rounded-3xl p-6">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <BookOpen className="size-3.5 text-accent" /> Learning summary
        </div>
        <p className="mt-2 text-sm">
          {plan
            ? "The AI analyzed your workload, prioritized urgent tasks, and generated a structured execution strategy."
            : "Generate a plan to receive personalized learning insights."}
        </p>
      </section>
    </div>
  );
}
