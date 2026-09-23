"use client";

import { buttonVariants } from "@/components/ui/button";
import { ConnectButton } from "@/components/connect-button";
import { SessionCard } from "@/components/session-card";
import { useSandbox, type SessionStatus } from "@/lib/mock-sessions";
import { cn } from "cn";
import Image from "next/image";
import Link from "next/link";

const PREVIEW: SessionStatus[] = ["Running", "Queued", "Review"];

const LOOP = [
  ["01", "Connect", "Phantom, Solflare, or Backpack."],
  ["02", "Burn", "Fixed $SBOX starts the box."],
  ["03", "Run", "Queued, then a live log."],
  ["04", "Approve", "The bag marks it shipped."],
  ["05", "Cash out", "Fees to a SOL or USDT stub."],
];

export function Landing() {
  const { sessions } = useSandbox();
  const preview = PREVIEW.map((status) => sessions.find((session) => session.status === status)).filter(
    (session) => session !== undefined,
  );

  return (
    <main>
      <section className="mx-auto grid w-full max-w-6xl items-center gap-10 px-4 py-10 md:px-8 md:py-16 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ice">$SBOX · Solana</p>
          <h1 className="mt-3 max-w-xl text-4xl font-medium tracking-tight text-balance md:text-6xl">
            Cloud boxes for agents.
          </h1>
          <p className="mt-4 max-w-md text-lg text-muted-foreground">
            Burn $SBOX. Spawn a sandbox. Approve the ship.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/spawn"
              className={cn(buttonVariants({ size: "lg" }), "h-11 px-5")}
            >
              Spawn sandbox
            </Link>
            <ConnectButton />
          </div>
          <p className="mt-4 text-sm text-muted-foreground">Nothing ships without the bag.</p>
          <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2 text-sm md:hidden">
            <Link href="/app" className="text-ice">
              Dashboard
            </Link>
            <Link href="/approve" className="text-ice">
              Approve
            </Link>
            <Link href="/cashout" className="text-ice">
              Cash out
            </Link>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-[1.75rem] bg-card ring-1 ring-foreground/10">
          <Image
            src="/brand/boxi-hero.webp"
            alt="Boxi, an otter-raccoon in a mint hoodie, typing inside a dark sandbox"
            width={1100}
            height={619}
            priority
            className="h-auto w-full"
          />
          <p className="absolute bottom-3 left-3 rounded-full bg-background/80 px-3 py-1 font-mono text-[11px] text-mint backdrop-blur">
            Boxi · watching the queue
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 pb-12 md:px-8">
        <div className="mb-4 flex items-end justify-between gap-3">
          <h2 className="text-sm font-medium tracking-wide text-muted-foreground uppercase">On the queue</h2>
          <Link href="/app" className="text-sm text-ice">
            Open dashboard
          </Link>
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          {preview.map((session) => (
            <SessionCard key={session.id} session={session} />
          ))}
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-6xl gap-3 px-4 pb-16 sm:grid-cols-2 md:px-8 lg:grid-cols-5">
        {LOOP.map(([index, title, body]) => (
          <article key={index} className="rounded-2xl bg-card p-4 ring-1 ring-foreground/10">
            <p className="font-mono text-xs text-ice">{index}</p>
            <h3 className="mt-2 text-base font-medium">{title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{body}</p>
          </article>
        ))}
      </section>

      <footer className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-4 py-8 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between md:px-8">
        <p>Sandbox ($SBOX) — cloud boxes for agents.</p>
        <p>Experimental meme utility. No fleet behind the glass yet.</p>
      </footer>
    </main>
  );
}
