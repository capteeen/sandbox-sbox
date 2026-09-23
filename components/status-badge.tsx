import { cn } from "cn";
import type { SessionStatus } from "@/lib/mock-sessions";

const STYLES: Record<SessionStatus, string> = {
  Queued: "bg-warning/15 text-warning",
  Running: "bg-ice/15 text-ice",
  Review: "bg-foreground/10 text-foreground",
  Shipped: "bg-mint/15 text-mint",
  Failed: "bg-danger/15 text-danger",
};

export function StatusBadge({ status }: { status: SessionStatus }) {
  return (
    <span
      className={cn(
        "inline-flex h-6 items-center gap-1.5 rounded-full px-2 text-xs font-medium",
        STYLES[status],
      )}
    >
      <span
        className={cn(
          "size-1.5 rounded-full bg-current",
          status === "Running" && "animate-pulse",
        )}
        aria-hidden
      />
      {status}
    </span>
  );
}
