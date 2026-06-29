import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Pause, Play, CheckCircle2, Sparkles, Brain, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_app/focus")({
  head: () => ({ meta: [{ title: "Focus Session — ForceForge" }] }),
  component: Focus,
});

const TOTAL = 25 * 60;

function Focus() {
  const [remaining, setRemaining] = useState(TOTAL);
  const [running, setRunning] = useState(true);
  const [done, setDone] = useState(false);

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
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">DSA Question 5 — Graph traversal</h1>
        <p className="mt-1 text-muted-foreground">One task. One window. Quiet brain.</p>
      </div>

      <div className="glass-card relative grid grid-cols-1 gap-8 rounded-3xl p-10 md:grid-cols-[auto_1fr]">
        {/* Progress ring */}
        <div className="relative mx-auto">
          <svg width="260" height="260" viewBox="0 0 260 260" className="-rotate-90">
            <circle cx="130" cy="130" r={R} stroke="var(--color-border)" strokeWidth="10" fill="none" />
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
              <div className="text-5xl font-semibold tabular-nums tracking-tight">{mm}:{ss}</div>
              <div className="mt-1 text-xs text-muted-foreground">{Math.round(pct)}% complete</div>
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="text-xs text-muted-foreground">Current step</div>
          <div className="mt-1 text-lg font-medium">Implement BFS — adjacency list + visited set</div>

          <ul className="mt-5 space-y-2 text-sm">
            {[
              { d: true, t: "Re-read problem statement" },
              { d: true, t: "Sketch graph on paper" },
              { d: false, t: "Implement BFS function" },
              { d: false, t: "Add tests for cycle case" },
              { d: false, t: "Submit on portal" },
            ].map((s, i) => (
              <li key={i} className={`flex items-center gap-3 rounded-xl border border-border/60 p-2.5 ${s.d ? "opacity-60" : ""}`}>
                <CheckCircle2 className={`size-4 ${s.d ? "text-success" : "text-muted-foreground"}`} />
                <span className={s.d ? "line-through" : ""}>{s.t}</span>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-wrap gap-2">
            <Button onClick={() => setRunning((r) => !r)} variant="outline">
              {running ? <><Pause className="size-4" /> Pause</> : <><Play className="size-4" /> Resume</>}
            </Button>
            <Button variant="outline"><Brain className="size-4" /> Need AI help</Button>
            <Button className="ml-auto gradient-bg text-white" onClick={() => setDone(true)}>
              <CheckCircle2 className="size-4" /> Complete session
            </Button>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="glass-card rounded-3xl p-5">
          <div className="flex items-center gap-2 text-xs text-muted-foreground"><Brain className="size-3.5 text-accent" /> Mentor note</div>
          <p className="mt-2 text-sm">You're 40% through. Don't optimize early — get any working BFS first, then refine.</p>
        </div>
        <div className="glass-card rounded-3xl p-5">
          <div className="flex items-center gap-2 text-xs text-muted-foreground"><Flame className="size-3.5 text-primary" /> Streak</div>
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
              <p className="mt-2 text-muted-foreground">25 minutes of focused work. That's how it gets done.</p>
              <div className="mt-6 flex justify-center gap-2">
                <Link to="/dashboard"><Button variant="outline">Back to dashboard</Button></Link>
                <Link to="/reflection"><Button className="gradient-bg text-white">Reflect now</Button></Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
