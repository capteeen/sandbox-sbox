import Link from "next/link";
import { formatSbox, formatWhen } from "@/lib/format";
import type { Session } from "@/lib/mock-sessions";
import { StatusBadge } from "@/components/status-badge";

export function SessionCard({ session }: { session: Session }) {
  return (
    <Link
      href={`/session/${session.id}`}
      className="block rounded-2xl bg-card p-4 ring-1 ring-foreground/10 transition hover:ring-ice/40"
    >
      <div className="flex items-start justify-between gap-3">
        <p className="font-mono text-xs text-ice">{session.id}</p>
        <StatusBadge status={session.status} />
      </div>
      <p className="mt-3 text-base font-medium tracking-tight">{session.title}</p>
      <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{session.prompt}</p>
      <p className="mt-3 text-xs text-muted-foreground">
        {session.tier}
        {session.priority ? " · priority" : ""} · {formatSbox(session.burn)} $SBOX · {formatWhen(session.createdAt)}
      </p>
    </Link>
  );
}
