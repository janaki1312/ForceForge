import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Zap, Target, Brain, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ForceForge — From Intention to Execution" },
      {
        name: "description",
        content:
          "ForceForge is an AI execution companion that helps you turn messy thoughts into focused, finishable work.",
      },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      {/* ambient glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-80"
        style={{ background: "var(--gradient-glow)" }}
      />
      <div className="pointer-events-none absolute -top-40 -right-40 size-[600px] rounded-full blur-3xl opacity-25 gradient-bg" />

      <nav className="relative z-10 flex items-center justify-between px-8 py-6">
        <div className="flex items-center gap-2">
          <div className="grid size-8 place-items-center rounded-lg gradient-bg glow">
            <Zap className="size-4 text-white" />
          </div>
          <span className="text-lg font-semibold tracking-tight">ForceForge</span>
        </div>
        <div className="hidden gap-8 text-sm text-muted-foreground md:flex">
          <a href="#features" className="hover:text-foreground transition">
            Features
          </a>
          <a href="#how" className="hover:text-foreground transition">
            How it works
          </a>
          <a href="#philosophy" className="hover:text-foreground transition">
            Philosophy
          </a>
        </div>
        <Link to="/dashboard">
          <Button variant="ghost" size="sm">
            Launch Demo
          </Button>
        </Link>
      </nav>

      <main className="relative z-10 mx-auto max-w-5xl px-8 pt-24 pb-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-4 py-1.5 text-xs text-muted-foreground backdrop-blur"
        >
          <Sparkles className="size-3.5 text-accent" />
          Your AI execution companion
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05 }}
          className="text-balance text-6xl font-semibold tracking-tight md:text-7xl"
        >
          From <span className="gradient-text">intention</span>
          <br /> to execution.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mx-auto mt-6 max-w-2xl text-balance text-lg text-muted-foreground"
        >
          ForceForge turns the noise in your head into a calm, prioritized plan — and quietly walks
          beside you until the work is done.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <Link to="/dashboard">
            <Button
              size="lg"
              className="h-12 gradient-bg text-white shadow-lg shadow-primary/30 hover:opacity-95"
            >
              Get Started
              <ArrowRight className="size-4" />
            </Button>
          </Link>
          <Link to="/dashboard">
            <Button
              size="lg"
              variant="outline"
              className="h-12 border-border bg-card/40 backdrop-blur"
            >
              Try demo mode
            </Button>
          </Link>
        </motion.div>

        {/* preview card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="mx-auto mt-20 max-w-3xl"
        >
          <div className="glass-card rounded-3xl p-1.5">
            <div className="rounded-[22px] bg-background/60 p-8 text-left backdrop-blur">
              <div className="mb-3 flex items-center gap-2 text-xs text-muted-foreground">
                <Brain className="size-3.5 text-accent" /> Next best action
              </div>
              <div className="text-xl font-medium">Finish DSA Question 5 — Graph traversal</div>
              <div className="mt-1 text-sm text-muted-foreground">
                Highest leverage. Unblocks tomorrow's assignment.
              </div>
              <div className="mt-6 grid grid-cols-3 gap-3 text-sm">
                {[
                  { label: "Estimated", value: "25 min" },
                  { label: "Priority", value: "High" },
                  { label: "Risk", value: "Low" },
                ].map((s) => (
                  <div key={s.label} className="rounded-xl border border-border bg-card/60 p-3">
                    <div className="text-xs text-muted-foreground">{s.label}</div>
                    <div className="mt-0.5 font-medium">{s.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* features */}
        <section id="features" className="mt-40 grid gap-6 text-left md:grid-cols-3">
          {[
            {
              icon: Brain,
              title: "Think out loud",
              body: "Dump your thoughts. The AI turns them into a structured execution plan with reasoning.",
            },
            {
              icon: Target,
              title: "Always know what's next",
              body: "The Forge Queue keeps three actionable items in front of you — never more, never less.",
            },
            {
              icon: CheckCircle2,
              title: "Finish what matters",
              body: "Distraction-free focus sessions and gentle daily reflection close the loop on real work.",
            },
          ].map((f) => (
            <div key={f.title} className="glass-card rounded-2xl p-6">
              <div className="grid size-10 place-items-center rounded-xl border border-border bg-card">
                <f.icon className="size-5 text-primary" />
              </div>
              <div className="mt-4 font-medium">{f.title}</div>
              <div className="mt-1 text-sm text-muted-foreground">{f.body}</div>
            </div>
          ))}
        </section>

          {/* How it works */}
      <section id="how" className="mt-32">
        <h2 className="text-4xl font-semibold text-center">
          How it works
        </h2>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <div className="glass-card rounded-2xl p-6 text-left">
            <div className="text-lg font-medium">1. Brain Dump</div>
            <p className="mt-2 text-sm text-muted-foreground">
              Tell ForceForge everything on your mind—assignments, interviews,
              deadlines or ideas.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-6 text-left">
            <div className="text-lg font-medium">2. AI Planning</div>
            <p className="mt-2 text-sm text-muted-foreground">
              The AI prioritizes tasks based on urgency, effort, deadlines and
              execution risk.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-6 text-left">
            <div className="text-lg font-medium">3. Execute</div>
            <p className="mt-2 text-sm text-muted-foreground">
              Stay focused using the dashboard, focus sessions and reflections until
              every important task is complete.
            </p>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section id="philosophy" className="mt-32 text-center">
        <h2 className="text-4xl font-semibold">
          Our Philosophy
        </h2>

        <p className="mx-auto mt-6 max-w-3xl text-lg text-muted-foreground">
          Productivity isn't about doing more. It's about doing the right thing at
          the right time. ForceForge helps you reduce decision fatigue, stay focused,
          and consistently finish meaningful work.
        </p>
      </section>

      </main>

      <footer className="relative z-10 border-t border-border/60 px-8 py-8 text-center text-xs text-muted-foreground">
        © 2026 ForceForge. Built for the moments between intention and execution.
      </footer>
    </div>
  );
}
