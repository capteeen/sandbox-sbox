"use client";

import { cn } from "cn";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";
import { ConnectButton } from "@/components/connect-button";
import { SboxChip, Wordmark } from "@/components/wordmark";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useSandbox } from "@/lib/mock-sessions";

const LINKS = [
  { href: "/app", label: "Dashboard" },
  { href: "/spawn", label: "Spawn" },
  { href: "/approve", label: "Approve" },
  { href: "/cashout", label: "Cash out" },
];

function isActive(path: string, href: string) {
  return path === href;
}

export function Shell({ children }: { children: ReactNode }) {
  const path = usePathname();
  if (path === "/") return <MarketingShell>{children}</MarketingShell>;
  return <AppShell path={path}>{children}</AppShell>;
}

function MarketingShell({ children }: { children: ReactNode }) {
  return (
    <div className="hero-glow min-h-svh">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 py-4 md:px-8">
        <Wordmark />
        <nav className="hidden items-center gap-5 text-sm text-muted-foreground md:flex">
          {LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-foreground">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <SboxChip />
          <ConnectButton />
        </div>
      </header>
      {children}
    </div>
  );
}

function AppShell({ path, children }: { path: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const reviewCount = useSandbox().sessions.filter((session) => session.status === "Review").length;

  return (
    <div className="min-h-svh md:grid md:grid-cols-[15.5rem_minmax(0,1fr)]">
      <aside className="sticky top-0 hidden h-svh flex-col border-r border-border bg-card md:flex">
        <div className="px-4 py-5">
          <Wordmark />
        </div>
        <Nav path={path} reviewCount={reviewCount} />
        <BagNote />
      </aside>
      <div className="flex min-w-0 flex-col">
        <header className="sticky top-0 z-30 flex items-center justify-between gap-3 border-b border-border bg-background/90 px-4 py-3 backdrop-blur md:px-8">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="md:hidden"
              onClick={() => setOpen(true)}
              aria-label="Open navigation"
            >
              <Menu />
            </Button>
            <div className="md:hidden">
              <Wordmark />
            </div>
            <SboxChip />
          </div>
          <ConnectButton />
        </header>
        <div className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 md:px-8 md:py-8">{children}</div>
      </div>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-72 bg-card p-0">
          <SheetHeader className="border-b border-border">
            <SheetTitle>
              <Wordmark />
            </SheetTitle>
          </SheetHeader>
          <Nav path={path} reviewCount={reviewCount} onNavigate={() => setOpen(false)} />
          <BagNote />
        </SheetContent>
      </Sheet>
    </div>
  );
}

function Nav({
  path,
  reviewCount,
  onNavigate,
}: {
  path: string;
  reviewCount: number;
  onNavigate?: () => void;
}) {
  return (
    <nav className="flex flex-col gap-1 px-3">
      {LINKS.map((link) => {
        const active = isActive(path, link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            onClick={onNavigate}
            className={cn(
              "flex items-center justify-between rounded-xl px-3 py-2.5 text-sm",
              active ? "bg-secondary text-foreground" : "text-muted-foreground hover:bg-secondary/70 hover:text-foreground",
            )}
          >
            <span>{link.label}</span>
            {link.href === "/approve" && reviewCount > 0 ? (
              <span className="rounded-full bg-mint/15 px-2 py-0.5 font-mono text-[11px] text-mint">
                {reviewCount}
              </span>
            ) : null}
          </Link>
        );
      })}
    </nav>
  );
}

function BagNote() {
  return (
    <div className="mt-auto flex items-center gap-3 px-4 py-5">
      <Image
        src="/brand/boxi-face.webp"
        alt=""
        width={512}
        height={512}
        className="size-11 rounded-xl"
      />
      <p className="text-xs leading-snug text-muted-foreground">Nothing ships without the bag.</p>
    </div>
  );
}
