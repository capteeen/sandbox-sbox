"use client";

import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { useConnectUi } from "@/components/connect-button";
import { Celebration, EmptyState } from "@/components/empty-state";
import { StatusBadge } from "@/components/status-badge";
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
import { formatSbox } from "@/lib/format";
import { approveSession, tipSession, useSandbox, voteSession } from "@/lib/mock-sessions";

export function ApproveScreen() {
  const { openConnect } = useConnectUi();
  const state = useSandbox();
  const [tipFor, setTipFor] = useState<string | null>(null);
  const [tip, setTip] = useState("10");
  const [tipError, setTipError] = useState<string | null>(null);

  const review = state.sessions.filter((session) => session.status === "Review");
  const shipped = state.lastShippedId
    ? state.sessions.find((session) => session.id === state.lastShippedId && session.status === "Shipped")
    : undefined;

  function requireWallet() {
    if (state.wallet.connected) return true;
    openConnect();
    return false;
  }

  function onApprove(id: string) {
    if (!requireWallet()) return;
    const result = approveSession(id);
    if (!result.ok) {
      toast.error(result.error);
      return;
    }
    toast.success("Shipped.", { description: id });
  }

  function onVote(id: string) {
    if (!requireWallet()) return;
    const result = voteSession(id);
    if (!result.ok) {
      toast.error(result.error);
      return;
    }
    toast.message("Vote counted. Stub only.");
  }

  function onTip(event: React.FormEvent) {
    event.preventDefault();
    if (!tipFor || !requireWallet()) return;
    const result = tipSession(tipFor, Number(tip));
    if (!result.ok) {
      setTipError(result.error);
      return;
    }
    setTipError(null);
    setTipFor(null);
    toast.success("Tip queued. Stub only.");
  }

  return (
    <div className="space-y-6">
      <header>
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-ice">Approve</p>
        <h1 className="mt-1 text-2xl font-medium tracking-tight md:text-3xl">Waiting on the bag</h1>
        <p className="mt-2 max-w-xl text-sm text-muted-foreground">Nothing ships without the bag.</p>
      </header>

      {shipped ? <Celebration id={shipped.id} detail={shipped.title} /> : null}

      {review.length === 0 ? (
        <EmptyState
          title="Queue is clear."
          body="Nothing waiting on review. Spawn a box if the board looks too quiet."
          action={
            <Button className="h-10 px-4" render={<Link href="/spawn" />}>
              Spawn sandbox
            </Button>
          }
        />
      ) : (
        <div className="grid gap-4">
          {review.map((session) => (
            <article key={session.id} className="rounded-2xl bg-card p-4 ring-1 ring-foreground/10 md:p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <Link href={`/session/${session.id}`} className="font-mono text-sm text-ice">
                    {session.id}
                  </Link>
                  <h2 className="mt-1 text-lg font-medium">{session.title}</h2>
                </div>
                <StatusBadge status={session.status} />
              </div>
              <p className="mt-3 max-w-2xl text-sm text-muted-foreground">{session.prompt}</p>
              <p className="mt-3 text-xs text-muted-foreground">
                {session.tier} · {formatSbox(session.burn)} $SBOX · {session.artifacts.length} artifacts · {session.votes} votes
              </p>
              <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                <Button className="h-11" onClick={() => onApprove(session.id)}>
                  Approve ship
                </Button>
                <Button variant="outline" className="h-11" onClick={() => onVote(session.id)}>
                  Vote
                </Button>
                <Button
                  variant="outline"
                  className="h-11"
                  onClick={() => {
                    setTipError(null);
                    setTipFor(session.id);
                  }}
                >
                  Tip the sandbox
                </Button>
              </div>
            </article>
          ))}
        </div>
      )}

      <Dialog open={tipFor !== null} onOpenChange={(open) => !open && setTipFor(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Tip the sandbox</DialogTitle>
            <DialogDescription>
              {tipFor ? `${tipFor} · stub tip from the bag.` : "Stub tip from the bag."}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={onTip} className="space-y-3">
            <div className="space-y-2">
              <Label htmlFor="board-tip">$SBOX</Label>
              <Input
                id="board-tip"
                inputMode="numeric"
                value={tip}
                onChange={(event) => setTip(event.target.value)}
                className="h-11 font-mono"
              />
            </div>
            {tipError ? <p className="text-sm text-danger">{tipError}</p> : null}
            <DialogFooter className="mx-0 mb-0 border-0 bg-transparent p-0">
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
