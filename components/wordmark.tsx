import { cn } from "cn";
import Link from "next/link";

export function Mark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={cn("size-8", className)} aria-hidden>
      <rect x="1.5" y="1.5" width="29" height="29" rx="8" fill="#121820" stroke="#7CFFB2" strokeWidth="1.5" />
      <rect x="7" y="8" width="18" height="12" rx="2.5" fill="#0B0F14" stroke="#7EC8FF" strokeWidth="1.2" />
      <circle cx="13" cy="14" r="1.35" fill="#E8EEF5" />
      <circle cx="19" cy="14" r="1.35" fill="#E8EEF5" />
      <path d="M11 23.5h10" stroke="#7CFFB2" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

export function Wordmark({ href = "/" }: { href?: string }) {
  return (
    <Link href={href} className="flex items-center gap-2.5 text-foreground">
      <Mark />
      <span className="text-base font-medium tracking-tight">Sandbox</span>
    </Link>
  );
}

export function SboxChip() {
  return (
    <span className="rounded-full border border-mint/30 bg-mint/10 px-2.5 py-1 font-mono text-[11px] tracking-wide text-mint">
      $SBOX
    </span>
  );
}
