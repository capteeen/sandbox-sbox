import { cn } from "cn";
import { STEPS, type SessionStatus, type StepId } from "@/lib/mock-sessions";

export function Stepper({ step, status }: { step: StepId; status: SessionStatus }) {
  const current = STEPS.indexOf(step);
  return (
    <ol className="flex gap-2 overflow-x-auto pb-1">
      {STEPS.map((label, index) => {
        const done = status === "Shipped" || index < current;
        const active = status !== "Shipped" && index === current;
        const failed = status === "Failed" && index === current;
        return (
          <li
            key={label}
            className={cn(
              "flex min-w-[5.5rem] flex-1 items-center gap-2 rounded-xl border px-3 py-2",
              done && "border-mint/30 bg-mint/10 text-mint",
              active && !failed && "border-ice/40 bg-ice/10 text-ice",
              failed && "border-danger/40 bg-danger/10 text-danger",
              !done && !active && "border-border bg-card text-muted-foreground",
            )}
          >
            <span className="font-mono text-[11px]">{String(index + 1).padStart(2, "0")}</span>
            <span className="text-sm font-medium">{label}</span>
          </li>
        );
      })}
    </ol>
  );
}
