"use client";

import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { useConnectUi } from "@/components/connect-button";
import { Celebration, EmptyState } from "@/components/empty-state";
import { LogTerminal } from "@/components/log-terminal";
import { StatusBadge } from "@/components/status-badge";
import { Stepper } from "@/components/stepper";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatSbox, formatWhen } from "@/lib/format";
import { approveSession, tipSession, useSandbox } from "@/lib/mock-sessions";

export function SessionScreen({ id }: { id: string }) {
  const { openConnect } = useConnectUi();
  const state = useSandbox();
  const session = state.sessions.find((item) => item.id === id);
  const [tipOpen, setTipOpen] = useState(false);
  const [tip, setTip] = useState("10");
  const [tipError, setTipError] = useState<string | null>(null);

  if (!session) {
    return (
      <EmptyState
        title="That session is not on the queue."
        body="Check the id, or head back to the dashboard."
        action={
          <Button className="h-10 px-4" render={<Link href="/app" />}>
            Dashboard
          </Button>
        }
      />
    );
  }

  const canApprove = session.status === "Review";
  const canTip = session.status === "Running" || session.status === "Review" || session.status === "Shipped";

  function onApprove() {
    if (!state.wallet.connected) {
      openConnect();
      return;
    }
    const result = approveSession(session!.id);
    if (!result.ok) {
      toast.error(result.error);
      return;
    }
    toast.success("Shipped.", { description: session!.id });
  }

  function onTip(event: React.FormEvent) {
    event.preventDefault();
    if (!state.wallet.connected) {
      openConnect();
      return;
    }
    const result = tipSession(session!.id, Number(tip));
    if (!result.ok) {
      setTipError(result.error);
      return;
    }
    setTipError(null);
    setTipOpen(false);
    toast.success("Tip queued. Stub only.");
  }

  return (
    <div className="space-y-5">
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="font-mono text-sm text-ice">{session.id}</p>
          <h1 className="mt-1 text-2xl font-medium tracking-tight md:text-3xl">{session.title}</h1>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{session.prompt}</p>
        </div>
        <StatusBadge status={session.status} />
      </header>

      {session.status === "Shipped" ? (
        <Celebration id={session.id} detail="On the board. Fees can cash out." />
      ) : null}

      {session.status === "Failed" ? (
        <div className="rounded-2xl border border-danger/40 bg-danger/10 px-4 py-3" role="alert">
          <p className="font-medium text-danger">Failed</p>
          <p className="mt-1 text-sm text-muted-foreground">
            No fleet behind the glass. Spawn another box.
          </p>
        </div>
      ) : null}

      <Stepper step={session.step} status={session.status} />

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.6fr)_minmax(16rem,0.8fr)]">
        <LogTerminal lines={session.logs} live={session.live || session.status === "Running"} />
        <div className="space-y-4">
          <section className="rounded-2xl bg-card p-4 ring-1 ring-foreground/10">
            <h2 className="text-sm font-medium">Artifacts</h2>
            {session.artifacts.length === 0 ? (
              <p className="mt-3 text-sm text-muted-foreground">Nothing to review yet.</p>
            ) : (
              <ul className="mt-3 space-y-3">
                {session.artifacts.map((artifact) => (
                  <li key={artifact.name} className="rounded-xl bg-background px-3 py-2">
                    <p className="font-mono text-xs text-ice">{artifact.name}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{artifact.detail}</p>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section className="rounded-2xl bg-card p-4 ring-1 ring-foreground/10">
            <dl className="space-y-2 text-sm">
              <Meta label="Tier" value={session.priority ? `${session.tier} · priority` : session.tier} />
              <Meta label="Burn" value={`${formatSbox(session.burn)} $SBOX`} />
              <Meta label="Stake" value={session.stake ? `${formatSbox(session.stake)} $SBOX` : "—"} />
              <Meta label="Votes" value={String(session.votes)} />
              <Meta label="Tips" value={`${formatSbox(session.tips)} $SBOX`} />
              <Meta label="Opened" value={formatWhen(session.createdAt)} />
            </dl>
            <div className="mt-4 flex flex-col gap-2">
              <Button className="h-11" disabled={!canApprove} onClick={onApprove}>
                Approve ship
              </Button>
              <Button
                variant="outline"
                className="h-10"
                disabled={!canTip}
                onClick={() => {
                  setTipError(null);
                  setTipOpen(true);
                }}
              >
                Tip the sandbox
              </Button>
            </div>
            {!canApprove && session.status !== "Shipped" ? (
              <p className="mt-2 text-xs text-muted-foreground">
                {session.status === "Failed"
                  ? "This one failed. Spawn another."
                  : "Not ready to ship."}
              </p>
            ) : null}
          </section>
        </div>
      </div>

      <Dialog open={tipOpen} onOpenChange={setTipOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Tip the sandbox</DialogTitle>
            <DialogDescription>Stub tip from the bag. Nothing hits the chain.</DialogDescription>
          </DialogHeader>
          <form onSubmit={onTip} className="space-y-3">
            <div className="space-y-2">
              <Label htmlFor="tip">$SBOX</Label>
              <Input
                id="tip"
                inputMode="numeric"
                value={tip}
                onChange={(event) => setTip(event.target.value)}
                className="h-11 font-mono"
              />
            </div>
            {tipError ? <p className="text-sm text-danger">{tipError}</p> : null}
            <DialogFooter className="mx-0 mb-0 border-0 bg-transparent p-0 sm:justify-end">
              <Button type="submit" className="h-10">
                Send tip
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="text-right font-medium">{value}</dd>
    </div>
  );
}
