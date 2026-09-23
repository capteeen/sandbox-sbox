"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { useConnectUi } from "@/components/connect-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { formatSbox } from "@/lib/format";
import {
  spawnSession,
  STAKE_COST,
  TIER_BURN,
  TIER_COPY,
  TIERS,
  useSandbox,
  type ModelTier,
} from "@/lib/mock-sessions";
import { cn } from "cn";

export function SpawnScreen() {
  const router = useRouter();
  const { openConnect } = useConnectUi();
  const { balance, wallet } = useSandbox();
  const [tier, setTier] = useState<ModelTier>("Standard");
  const [burn, setBurn] = useState(String(TIER_BURN.Standard));
  const [priority, setPriority] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const burnValue = Number(burn);
  const stake = priority ? STAKE_COST : 0;
  const cost = (Number.isFinite(burnValue) ? burnValue : 0) + stake;
  const after = balance - cost;

  function onTier(next: ModelTier) {
    setTier(next);
    setBurn(String(TIER_BURN[next]));
  }

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    if (!wallet.connected) {
      openConnect();
      return;
    }
    setPending(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    const result = spawnSession({
      prompt,
      tier,
      burn: burnValue,
      priority,
    });
    if (!result.ok) {
      setPending(false);
      setError(result.error);
      return;
    }
    toast.success("Sandbox spawned", { description: result.id });
    router.push(`/session/${result.id}`);
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(16rem,0.8fr)]">
      <form onSubmit={onSubmit} className="space-y-6">
        <header>
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-ice">Spawn</p>
          <h1 className="mt-1 text-2xl font-medium tracking-tight md:text-3xl">Spin up a sandbox</h1>
        </header>

        <fieldset className="space-y-2">
          <legend className="text-sm font-medium">Model tier</legend>
          <div className="grid gap-2 sm:grid-cols-3">
            {TIERS.map((item) => {
              const selected = item === tier;
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => onTier(item)}
                  aria-pressed={selected}
                  className={cn(
                    "rounded-2xl border px-3 py-3 text-left",
                    selected ? "border-mint/50 bg-mint/10" : "border-border bg-card hover:border-ice/30",
                  )}
                >
                  <span className="block text-sm font-medium">{item}</span>
                  <span className="mt-1 block text-xs text-muted-foreground">{TIER_COPY[item]}</span>
                  <span className="mt-2 block font-mono text-xs text-ice">{TIER_BURN[item]} $SBOX</span>
                </button>
              );
            })}
          </div>
        </fieldset>

        <div className="space-y-2">
          <Label htmlFor="burn">Burn amount</Label>
          <Input
            id="burn"
            inputMode="numeric"
            value={burn}
            onChange={(event) => setBurn(event.target.value)}
            className="h-12 font-mono text-lg tabular-nums"
            aria-describedby="burn-help"
          />
          <p id="burn-help" className="text-xs text-muted-foreground">
            Burns $SBOX to start the session
          </p>
        </div>

        <button
          type="button"
          role="switch"
          aria-checked={priority}
          onClick={() => setPriority((value) => !value)}
          className={cn(
            "flex w-full items-center justify-between gap-4 rounded-2xl border px-4 py-3 text-left",
            priority ? "border-mint/50 bg-mint/10" : "border-border bg-card",
          )}
        >
          <span>
            <span className="block text-sm font-medium">Stake for queue priority</span>
            <span className="mt-1 block text-xs text-muted-foreground">
              Stake {STAKE_COST} $SBOX and skip the queue.
            </span>
          </span>
          <span
            className={cn(
              "size-5 shrink-0 rounded-full border",
              priority ? "border-mint bg-mint" : "border-muted-foreground",
            )}
            aria-hidden
          />
        </button>

        <div className="space-y-2">
          <Label htmlFor="prompt">Task</Label>
          <Textarea
            id="prompt"
            value={prompt}
            onChange={(event) => setPrompt(event.target.value)}
            placeholder="What should the agent ship?"
            className="min-h-32"
            aria-invalid={error ? true : undefined}
          />
        </div>

        {error ? (
          <p role="alert" className="rounded-xl border border-danger/40 bg-danger/10 px-3 py-2 text-sm text-danger">
            {error}
          </p>
        ) : null}

        <Button type="submit" className="h-11 px-5" disabled={pending}>
          {pending ? "Burning…" : wallet.connected ? "Burn & spawn" : "Connect wallet"}
        </Button>
      </form>

      <aside className="h-fit rounded-2xl bg-card p-5 ring-1 ring-foreground/10">
        <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Receipt</p>
        <dl className="mt-4 space-y-3 text-sm">
          <Row label="Tier" value={tier} />
          <Row label="Burn" value={`${formatSbox(Number.isFinite(burnValue) ? burnValue : 0)} $SBOX`} />
          <Row label="Stake" value={priority ? `${STAKE_COST} $SBOX` : "—"} />
          <Row label="Lands as" value={priority ? "Running" : "Queued"} />
          <Row label="Bag after" value={`${formatSbox(after)} $SBOX`} />
        </dl>
        <p className="mt-4 text-xs text-muted-foreground">
          Mock burn. Nothing leaves this browser.
        </p>
      </aside>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="font-medium tabular-nums">{value}</dd>
    </div>
  );
}
