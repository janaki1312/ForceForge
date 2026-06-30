import { createFileRoute } from "@tanstack/react-router";
import { Bell, Brain, Calendar, Moon, Sliders } from "lucide-react";

export const Route = createFileRoute("/_app/settings")({
  head: () => ({ meta: [{ title: "Settings — ForceForge" }] }),
  component: Settings,
});

function Row({
  icon: Icon,
  title,
  desc,
  control,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
  control: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-4 border-b border-border/60 py-4 last:border-b-0">
      <div className="grid size-10 place-items-center rounded-xl border border-border bg-card">
        <Icon className="size-4 text-primary" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-sm font-medium">{title}</div>
        <div className="text-xs text-muted-foreground">{desc}</div>
      </div>
      {control}
    </div>
  );
}

function Toggle({ on = true }: { on?: boolean }) {
  return (
    <div className={`relative h-6 w-11 rounded-full ${on ? "bg-primary" : "bg-muted"}`}>
      <div
        className={`absolute top-0.5 size-5 rounded-full bg-white transition ${on ? "left-[22px]" : "left-0.5"}`}
      />
    </div>
  );
}

function Settings() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Shape how ForceForge supports you.</p>
      </div>

      <section className="glass-card rounded-3xl px-6">
        <Row
          icon={Brain}
          title="AI personality"
          desc="Calm and encouraging · Practical depth"
          control={<button className="text-xs text-primary">Edit</button>}
        />
        <Row
          icon={Sliders}
          title="Working hours"
          desc="Mon–Fri · 9:00 AM – 6:00 PM"
          control={<button className="text-xs text-primary">Edit</button>}
        />
        <Row
          icon={Calendar}
          title="Connected calendar"
          desc="Google Calendar — not connected"
          control={
            <button className="rounded-lg border border-border px-3 py-1 text-xs">Connect</button>
          }
        />
        <Row
          icon={Bell}
          title="Notifications"
          desc="Insight-led, no spam"
          control={<Toggle on />}
        />
        <Row icon={Moon} title="Dark mode" desc="Always on (default)" control={<Toggle on />} />
      </section>
    </div>
  );
}
