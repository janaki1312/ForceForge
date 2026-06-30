import { cn } from "@/lib/utils";
import type { Priority, Risk } from "@/lib/mock-data";

export function PriorityBadge({ value }: { value: Priority }) {
  const map: Record<Priority, string> = {
    low: "bg-muted text-muted-foreground",
    medium: "bg-warning/15 text-warning",
    high: "bg-primary/15 text-primary",
  };
  return (
    <span
      className={cn(
        "rounded-md px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider",
        map[value],
      )}
    >
      {value}
    </span>
  );
}

export function RiskDot({ value }: { value: Risk }) {
  const color = value === "low" ? "bg-success" : value === "medium" ? "bg-warning" : "bg-danger";
  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
      <span className={cn("size-2 rounded-full", color)} />
      {value} risk
    </span>
  );
}

export function ConfidenceBadge({ value }: { value: number }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-md border border-border bg-card/60 px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
      <span className="size-1.5 rounded-full bg-accent" /> {value}% confidence
    </span>
  );
}
