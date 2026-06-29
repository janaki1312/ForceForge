import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Mic, Sparkles, Brain, Clock, ListChecks, Flame, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConfidenceBadge, PriorityBadge, RiskDot } from "@/components/app/badges";

export const Route = createFileRoute("/_app/forge")({
  head: () => ({ meta: [{ title: "Forge — ForceForge" }] }),
  component: Forge,
});

const initialMessages = [
  {
    role: "user" as const,
    text: "I have my DSA assignment tomorrow, a hackathon presentation, and an internship interview Thursday.",
  },
  {
    role: "ai" as const,
    text: "Got it. Three competing priorities with different cognitive loads. Here's a plan that protects your morning focus and de-risks the interview.",
  },
];

const plan = {
  title: "Execution plan: next 48 hours",
  steps: [
    { title: "DSA Question 5 — Graph traversal", duration: "25 min", when: "Today · 10:00 AM", priority: "high" as const, risk: "low" as const },
    { title: "Hackathon slide pass — story arc + demo flow", duration: "45 min", when: "Today · 2:00 PM", priority: "high" as const, risk: "medium" as const },
    { title: "Mock interview intro + STAR examples", duration: "30 min", when: "Wed · 11:00 AM", priority: "medium" as const, risk: "low" as const },
    { title: "DSA Q6 (stretch)", duration: "40 min", when: "Wed · 3:00 PM", priority: "medium" as const, risk: "low" as const },
  ],
  reasoning: [
    "DSA first — small, finishable win clears mental load.",
    "Slides in afternoon dip — visual work suits lower cognitive energy.",
    "Interview prep front-loaded so you sleep on it.",
  ],
};

const thinkingStates = [
  "Understanding your workload…",
  "Prioritizing your tasks…",
  "Building today's execution plan…",
  "Personalizing recommendations…",
];

function Forge() {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const [thinkIdx, setThinkIdx] = useState(0);

  const send = () => {
    if (!input.trim()) return;
    setMessages((m) => [...m, { role: "user", text: input }]);
    setInput("");
    setThinking(true);
    setThinkIdx(0);
    const iv = setInterval(() => setThinkIdx((i) => (i + 1) % thinkingStates.length), 900);
    setTimeout(() => {
      clearInterval(iv);
      setThinking(false);
      setMessages((m) => [...m, { role: "ai", text: "I've updated your plan with this new context. See the right panel." }]);
    }, 2600);
  };

  return (
    <div className="grid h-[calc(100vh-7rem)] gap-6 lg:grid-cols-[1fr_1.1fr]">
      {/* Left: conversation */}
      <section className="glass-card flex min-h-0 flex-col rounded-3xl p-5">
        <div className="mb-3 flex items-center gap-2 text-sm">
          <div className="grid size-7 place-items-center rounded-lg gradient-bg">
            <Sparkles className="size-3.5 text-white" />
          </div>
          <div className="font-medium">Forge</div>
          <span className="text-xs text-muted-foreground">Think out loud. I'll turn it into a plan.</span>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto pr-2">
          {messages.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={m.role === "user" ? "ml-auto max-w-[85%]" : "max-w-[90%]"}
            >
              {m.role === "user" ? (
                <div className="rounded-2xl rounded-tr-md bg-primary px-4 py-2.5 text-sm text-primary-foreground">
                  {m.text}
                </div>
              ) : (
                <div className="flex gap-2">
                  <div className="mt-1 grid size-6 shrink-0 place-items-center rounded-md bg-accent/15">
                    <Brain className="size-3.5 text-accent" />
                  </div>
                  <div className="text-sm text-foreground/90">{m.text}</div>
                </div>
              )}
            </motion.div>
          ))}

          <AnimatePresence>
            {thinking && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                  <span className="relative inline-flex size-2 rounded-full bg-accent" />
                </span>
                {thinkingStates[thinkIdx]}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-4 rounded-2xl border border-border bg-card/60 p-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send();
              }
            }}
            rows={2}
            placeholder="Dump your thoughts. The messier, the better."
            className="w-full resize-none bg-transparent px-2 py-1.5 text-sm outline-none placeholder:text-muted-foreground/70"
          />
          <div className="flex items-center justify-between px-1">
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              <Mic className="size-4" /> Voice
            </Button>
            <Button size="sm" className="gradient-bg text-white" onClick={send}>
              <Send className="size-3.5" /> Send
            </Button>
          </div>
        </div>
      </section>

      {/* Right: generated cards */}
      <section className="min-h-0 space-y-4 overflow-y-auto pr-1">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-3xl p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm">
              <ListChecks className="size-4 text-primary" />
              <div className="font-medium">{plan.title}</div>
            </div>
            <ConfidenceBadge value={86} />
          </div>
          <ol className="mt-4 space-y-2">
            {plan.steps.map((s, i) => (
              <li key={i} className="flex items-center gap-3 rounded-2xl border border-border bg-card/50 p-3">
                <div className="grid size-7 place-items-center rounded-lg border border-border bg-background text-xs">{i + 1}</div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium">{s.title}</div>
                  <div className="mt-0.5 flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1"><Clock className="size-3" /> {s.duration}</span>
                    <span>· {s.when}</span>
                    <RiskDot value={s.risk} />
                  </div>
                </div>
                <PriorityBadge value={s.priority} />
              </li>
            ))}
          </ol>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card rounded-3xl p-6">
          <div className="flex items-center gap-2 text-sm">
            <Brain className="size-4 text-accent" />
            <div className="font-medium">Why this order?</div>
          </div>
          <ul className="mt-3 space-y-2 text-sm text-foreground/90">
            {plan.reasoning.map((r, i) => (
              <li key={i} className="flex gap-2">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" /> {r}
              </li>
            ))}
          </ul>
        </motion.div>

        <div className="grid grid-cols-2 gap-4">
          <div className="glass-card rounded-3xl p-5">
            <div className="flex items-center gap-2 text-xs text-muted-foreground"><Flame className="size-3.5 text-primary" /> Next best action</div>
            <div className="mt-2 text-sm font-medium">Start with DSA Q5</div>
            <div className="mt-1 text-xs text-muted-foreground">25 min · low risk · clears mental load</div>
          </div>
          <div className="glass-card rounded-3xl p-5">
            <div className="flex items-center gap-2 text-xs text-muted-foreground"><ShieldCheck className="size-3.5 text-success" /> Buffer</div>
            <div className="mt-2 text-sm font-medium">2h 40m of slack</div>
            <div className="mt-1 text-xs text-muted-foreground">Healthy headroom for the unexpected.</div>
          </div>
        </div>
      </section>
    </div>
  );
}
