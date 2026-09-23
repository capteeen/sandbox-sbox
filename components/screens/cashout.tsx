"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useConnectUi } from "@/components/connect-button";
import { EmptyState } from "@/components/empty-state";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatQuote, formatSbox, formatWhen } from "@/lib/format";
import {
  cashOut,
  feeAvailable,
  quoteOut,
  SOL_PER_SBOX,
  USDT_PER_SBOX,
  useSandbox,
  type PayoutAsset,
} from "@/lib/mock-sessions";
import { cn } from "cn";

const ASSETS: PayoutAsset[] = ["SOL", "USDT"];

export function CashoutScreen() {
  const { openConnect } = useConnectUi();
  const state = useSandbox();
  const available = feeAvailable(state);
  const [asset, setAsset] = useState<PayoutAsset>("USDT");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const parsed = Number(amount);
  const quote = Number.isFinite(parsed) && parsed > 0 ? quoteOut(asset, parsed) : 0;
  const rate = asset === "SOL" ? SOL_PER_SBOX : USDT_PER_SBOX;

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    if (!state.wallet.connected) {
      openConnect();
      return;
    }
    setPending(true);
    await new Promise((resolve) => setTimeout(resolve, 700));
    const result = cashOut(asset, parsed);
    setPending(false);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    toast.success("Stub receipt written", { description: result.id });
    setAmount("");
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(16rem,0.8fr)]">
      <div className="space-y-6">
        <header>
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-ice">Cash out</p>
          <h1 className="mt-1 text-2xl font-medium tracking-tight md:text-3xl">Fees from shipped sessions</h1>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground">
            Stub quote to SOL or USDT. Nothing hits the chain.
          </p>
        </header>

        <section className="rounded-2xl bg-card p-5 ring-1 ring-foreground/10">
          <p className="text-sm text-muted-foreground">Fee bag</p>
          <p className="mt-2 text-4xl font-medium tracking-tight tabular-nums">{formatSbox(available)}</p>
          <p className="mt-1 text-sm text-muted-foreground">$SBOX · 4% of shipped burns</p>
        </section>

        {available <= 0 ? (
          <EmptyState
            title="No fees yet."
            body="Approve a ship first. Fees show up here as a stub, not a treasury."
          />
        ) : (
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              {ASSETS.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setAsset(item)}
                  aria-pressed={asset === item}
                  className={cn(
                    "rounded-xl border px-3 py-3 text-sm font-medium",
                    asset === item ? "border-mint/50 bg-mint/10 text-mint" : "border-border bg-card",
                  )}
                >
                  {item}
                </button>
              ))}
            </div>
            <div className="space-y-2">
              <Label htmlFor="fee">Fee amount ($SBOX)</Label>
              <Input
                id="fee"
                inputMode="decimal"
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
                placeholder={formatSbox(available)}
                className="h-12 font-mono text-lg"
                aria-invalid={error ? true : undefined}
              />
            </div>
            <p className="text-sm text-muted-foreground">
              Stub quote · 1 $SBOX ≈ {asset === "SOL" ? rate.toFixed(5) : rate.toFixed(2)} {asset}
              {quote > 0 ? ` · ${formatSbox(parsed)} $SBOX → ${formatQuote(asset, quote)} ${asset}` : ""}
            </p>
            {error ? (
              <p role="alert" className="rounded-xl border border-danger/40 bg-danger/10 px-3 py-2 text-sm text-danger">
                {error}
              </p>
            ) : null}
            <div className="flex flex-col gap-2 sm:flex-row">
              <Button type="submit" className="h-11 px-5" disabled={pending}>
                {pending ? "Writing receipt…" : state.wallet.connected ? "Cash out" : "Connect wallet"}
              </Button>
              <Button
                type="button"
                variant="outline"
                className="h-11"
                onClick={() => setAmount(String(available))}
              >
                Use full fee
              </Button>
            </div>
          </form>
        )}
      </div>

      <aside className="h-fit rounded-2xl bg-card p-5 ring-1 ring-foreground/10">
        <h2 className="text-sm font-medium">Receipts</h2>
        {state.receipts.length === 0 ? (
          <p className="mt-3 text-sm text-muted-foreground">No stub receipts yet.</p>
        ) : (
          <ul className="mt-3 space-y-3">
            {state.receipts.map((receipt) => (
              <li key={receipt.id} className="rounded-xl bg-background px-3 py-2">
                <p className="font-mono text-xs text-ice">{receipt.id}</p>
                <p className="mt-1 text-sm">
                  {formatSbox(receipt.sbox)} $SBOX → {formatQuote(receipt.asset, receipt.out)} {receipt.asset}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">{formatWhen(receipt.at)}</p>
              </li>
            ))}
          </ul>
        )}
      </aside>
    </div>
  );
}
