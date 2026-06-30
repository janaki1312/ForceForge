import { createFileRoute } from "@tanstack/react-router";
import { Target, Briefcase } from "lucide-react";

export const Route = createFileRoute("/_app/profile")({
  head: () => ({ meta: [{ title: "Profile — ForceForge" }] }),
  component: Profile,
});

function Profile() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="glass-card flex items-center gap-5 rounded-3xl p-6">
        <div className="grid size-16 place-items-center rounded-2xl gradient-bg text-2xl font-semibold text-white">
          A
        </div>
        <div>
          <div className="text-2xl font-semibold tracking-tight">ForceForge User</div>

          <div className="text-sm text-muted-foreground">AI-Powered Productivity System</div>
        </div>
        <div className="ml-auto hidden text-right md:block">
          <div className="text-xs text-muted-foreground">Streak</div>
          <div className="text-2xl font-semibold gradient-text">7 days</div>
        </div>
      </div>

      <section className="glass-card rounded-3xl p-6">
        <div className="flex items-center gap-2 text-sm font-medium">
          <Target className="size-4 text-primary" /> Active goals
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {["Crack internships", "Learn DSA", "Build portfolio", "Prepare interviews"].map((g) => (
            <span
              key={g}
              className="rounded-full border border-border bg-card/60 px-3 py-1 text-xs"
            >
              {g}
            </span>
          ))}
        </div>
      </section>

      <section className="glass-card rounded-3xl p-6">
        <div className="flex items-center gap-2 text-sm font-medium">
          <Briefcase className="size-4 text-primary" /> Working style
        </div>
        <div className="mt-3 grid gap-3 sm:grid-cols-3 text-sm">
          <div className="rounded-2xl border border-border bg-card/50 p-3">
            <div className="text-xs text-muted-foreground">Best focus time</div>
            <div className="mt-1 font-medium">9 – 11 AM</div>
          </div>
          <div className="rounded-2xl border border-border bg-card/50 p-3">
            <div className="text-xs text-muted-foreground">Avg. session</div>
            <div className="mt-1 font-medium">28 min</div>
          </div>
          <div className="rounded-2xl border border-border bg-card/50 p-3">
            <div className="text-xs text-muted-foreground">Completion rate</div>
            <div className="mt-1 font-medium">82%</div>
          </div>
        </div>
      </section>
    </div>
  );
}
