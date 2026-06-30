  import { createFileRoute, Link } from "@tanstack/react-router";
  import { useEffect, useState } from "react";
  import { motion, AnimatePresence } from "framer-motion";
  import { Pause, Play, CheckCircle2, Sparkles, Brain, Flame } from "lucide-react";
  import { Button } from "@/components/ui/button";
  import { useNavigate } from "@tanstack/react-router";

  export const Route = createFileRoute("/_app/focus")({
    head: () => ({ meta: [{ title: "Focus Session — ForceForge" }] }),
    component: Focus,
  });

  const TOTAL = 25 * 60;

  function Focus() {
    const [remaining, setRemaining] = useState(TOTAL);
    const [running, setRunning] = useState(true);
    const [done, setDone] = useState(false);
    const [plan, setPlan] = useState<any>(null);
    const [currentTask, setCurrentTask] = useState<any>(null);
    const navigate = useNavigate();

    useEffect(() => {
      if (typeof window === "undefined") return;

      const stored = localStorage.getItem("forceforge-plan");
        if (stored) {
          setPlan(JSON.parse(stored));
        }

        const task = localStorage.getItem("forceforge-current-task");

        if (task) {
          setCurrentTask(JSON.parse(task));
        }
    }, []);

    useEffect(() => {
      if (!running || done) return;
      const iv = setInterval(() => {
        setRemaining((r) => {
          if (r <= 1) {
            setDone(true);
            setRunning(false);
            return 0;
          }
          return r - 1;
        });
      }, 1000);
      return () => clearInterval(iv);
    }, [running, done]);

    const pct = ((TOTAL - remaining) / TOTAL) * 100;
    const mm = String(Math.floor(remaining / 60)).padStart(2, "0");
    const ss = String(remaining % 60).padStart(2, "0");

    const R = 110;
    const C = 2 * Math.PI * R;

    return (
      <div className="mx-auto max-w-3xl space-y-8">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 text-xs text-muted-foreground">
            <Sparkles className="size-3.5 text-accent" /> Focus session in progress
          </div>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">
            {currentTask?.title ?? plan?.next_best_action?.title ?? "Focus Session"}
          </h1>
          <p className="mt-1 text-muted-foreground">
          {currentTask
              ? `Estimated time: ${currentTask.estimated_minutes} minutes`
              : plan?.next_best_action?.reason ?? "Focus on one task."}
          </p>
        </div>

        <div className="glass-card relative grid grid-cols-1 gap-8 rounded-3xl p-10 md:grid-cols-[auto_1fr]">
          {/* Progress ring */}
          <div className="relative mx-auto">
            <svg width="260" height="260" viewBox="0 0 260 260" className="-rotate-90">
              <circle
                cx="130"
                cy="130"
                r={R}
                stroke="var(--color-border)"
                strokeWidth="10"
                fill="none"
              />
              <motion.circle
                cx="130"
                cy="130"
                r={R}
                stroke="url(#g)"
                strokeWidth="10"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={C}
                strokeDashoffset={C - (pct / 100) * C}
                transition={{ ease: "linear" }}
              />
              <defs>
                <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="oklch(0.62 0.19 264)" />
                  <stop offset="100%" stopColor="oklch(0.58 0.22 295)" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 grid place-items-center">
              <div className="text-center">
                <div className="text-5xl font-semibold tabular-nums tracking-tight">
                  {mm}:{ss}
                </div>
                <div className="mt-1 text-xs text-muted-foreground">{Math.round(pct)}% complete</div>
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="text-xs text-muted-foreground">Current step</div>
            <div className="mt-1 text-lg font-medium">
              {currentTask?.title ?? "No task selected"}
            </div>
              <ul className="mt-5 space-y-2 text-sm">
                {(currentTask
                  ? [currentTask]
                  : (plan?.execution_plan ?? []).slice(0, 5)
                ).map((task: any, i: number) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 rounded-xl border border-border/60 p-2.5"
                  >
                    <CheckCircle2 className="size-4 text-muted-foreground" />
                    <span>{task.title}</span>
                  </li>
                ))}
              </ul>

            <div className="mt-6 flex flex-wrap gap-2">
              <Button onClick={() => setRunning((r) => !r)} variant="outline">
                {running ? (
                  <>
                    <Pause className="size-4" /> Pause
                  </>
                ) : (
                  <>
                    <Play className="size-4" /> Resume
                  </>
                )}
              </Button>
             <Button
                  variant="outline"
                  onClick={() => {
                    localStorage.setItem(
                      "forceforge-help-task",
                      currentTask?.title ?? "Help me with my current task"
                    );

                    navigate({ to: "/forge" });
                  }}
                >
                  <Brain className="size-4" /> Need AI help
              </Button>
              <Button className="ml-auto gradient-bg text-white" onClick={() => {
                      localStorage.removeItem("forceforge-current-task");
                      setDone(true);
                    }}>
                <CheckCircle2 className="size-4" /> Complete session
              </Button>
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="glass-card rounded-3xl p-5">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Brain className="size-3.5 text-accent" /> Mentor note
            </div>
            <p className="mt-2 text-sm">
              {plan?.reasoning ?? "Focus on completing the current task before switching context."}
            </p>
          </div>
          <div className="glass-card rounded-3xl p-5">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Flame className="size-3.5 text-primary" /> Streak
            </div>
            <p className="mt-2 text-sm">7 days of showing up. Finish this to make it 8.</p>
          </div>
        </div>

        <AnimatePresence>
          {done && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 grid place-items-center bg-background/80 backdrop-blur"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="glass-card max-w-md rounded-3xl p-10 text-center"
              >
                <div className="mx-auto grid size-14 place-items-center rounded-2xl gradient-bg glow">
                  <CheckCircle2 className="size-7 text-white" />
                </div>
                <h2 className="mt-4 text-2xl font-semibold tracking-tight">Session complete</h2>
                <p className="mt-2 text-muted-foreground">
                  25 minutes of focused work. That's how it gets done.
                </p>
                <div className="mt-6 flex justify-center gap-2">
                  <Link to="/dashboard">
                    <Button variant="outline">Back to dashboard</Button>
                  </Link>
                  <Link to="/reflection">
                    <Button className="gradient-bg text-white">Reflect now</Button>
                  </Link>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
