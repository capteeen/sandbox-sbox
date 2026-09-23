"use client";

import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { EmptyState } from "@/components/empty-state";
import { SessionCard } from "@/components/session-card";
import { cn } from "cn";
import { formatSbox, shortAddress } from "@/lib/format";
import { STATUSES, useSandbox, type SessionStatus } from "@/lib/mock-sessions";

const COUNTS: SessionStatus[] = ["Running", "Queued", "Review", "Shipped"];

export function Dashboard() {
  const { sessions, balance, wallet } = useSandbox();

  const active = sessions.filter((session) => session.status === "Running" || session.status === "Queued");
  const shipped = sessions.filter((session) => session.status === "Shipped");
  const failed = sessions.filter((session) => session.status === "Failed");

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-ice">Dashboard</p>
          <h1 className="mt-1 text-2xl font-medium tracking-tight md:text-3xl">The bag and the queue</h1>
        </div>
        <Link href="/spawn" className={cn(buttonVariants(), "h-10 px-4")}>
          Spawn sandbox
        </Link>
      </header>

      <section className="rounded-2xl bg-card p-5 ring-1 ring-foreground/10 md:p-6">
        <p className="text-sm text-muted-foreground">$SBOX in the bag</p>
        <p className="mt-2 text-4xl font-medium tracking-tight tabular-nums md:text-5xl">
          {formatSbox(balance)}
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          {wallet.connected && wallet.address
            ? `${wallet.name}${wallet.stub ? " stub" : ""} · ${shortAddress(wallet.address)}`
            : "Preview balance. Connect to spawn."}
        </p>
      </section>

      <section className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {COUNTS.map((status) => (
          <div key={status} className="rounded-2xl bg-card px-4 py-3 ring-1 ring-foreground/10">
            <p className="text-xs text-muted-foreground">{status}</p>
            <p className="mt-1 text-2xl font-medium tabular-nums">
              {sessions.filter((session) => session.status === status).length}
            </p>
          </div>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div>
          <h2 className="mb-3 text-sm font-medium text-muted-foreground">Active / queued</h2>
          {active.length === 0 ? (
            <EmptyState
              title="Queue is clear."
              body="Spawn a sandbox when you want Boxi back on the keys."
              action={
                <Link href="/spawn" className={cn(buttonVariants(), "h-10 px-4")}>
                  Spawn sandbox
                </Link>
              }
            />
          ) : (
            <div className="space-y-3">
              {active.map((session) => (
                <SessionCard key={session.id} session={session} />
              ))}
            </div>
          )}
        </div>
        <div>
          <h2 className="mb-3 text-sm font-medium text-muted-foreground">Recent shipped</h2>
          {shipped.length === 0 ? (
            <EmptyState title="Nothing shipped yet." body="Approve a review when the bag is ready." />
          ) : (
            <div className="space-y-3">
              {shipped.map((session) => (
                <SessionCard key={session.id} session={session} />
              ))}
            </div>
          )}
        </div>
      </section>

      {failed.length > 0 ? (
        <section>
          <h2 className="mb-3 text-sm font-medium text-muted-foreground">Failed</h2>
          <div className="space-y-3">
            {failed.map((session) => (
              <SessionCard key={session.id} session={session} />
            ))}
          </div>
        </section>
      ) : null}

      <p className="text-xs text-muted-foreground">
        Status labels: {STATUSES.join(" · ")}. Mock queue. No fleet behind the glass.
      </p>
    </div>
  );
}
