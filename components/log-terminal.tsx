"use client";

import { useEffect, useRef } from "react";
import { formatLogTime } from "@/lib/format";
import type { LogLine } from "@/lib/mock-sessions";
import { cn } from "cn";
import Image from "next/image";

const LEVEL: Record<LogLine["level"], string> = {
  info: "text-muted-foreground",
  ok: "text-mint",
  warn: "text-warning",
  err: "text-danger",
};

export function LogTerminal({
  lines,
  live,
}: {
  lines: LogLine[];
  live: boolean;
}) {
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "nearest" });
  }, [lines.length]);

  return (
    <section className="flex min-h-80 flex-col overflow-hidden rounded-2xl bg-[#070b10] ring-1 ring-foreground/10">
      <header className="flex items-center justify-between border-b border-white/5 px-4 py-3">
        <p className="font-mono text-xs text-muted-foreground">log</p>
        <p className="flex items-center gap-2 font-mono text-[11px] text-ice">
          <span className={cn("size-1.5 rounded-full bg-ice", live && "animate-pulse")} />
          {live ? "live" : "idle"}
        </p>
      </header>
      {lines.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center px-6 py-10 text-center">
          <Image
            src="/brand/boxi-face.webp"
            alt="Boxi waiting for a log line"
            width={512}
            height={512}
            className="size-20 rounded-2xl"
          />
          <p className="mt-4 text-sm text-foreground">Boxi is waiting for the first log line…</p>
        </div>
      ) : (
        <div className="terminal-scroll max-h-[28rem] flex-1 overflow-y-auto px-4 py-3 font-mono text-[13px] leading-6">
          {lines.map((line) => (
            <p key={line.id} className="grid grid-cols-[4.5rem_minmax(0,1fr)] gap-3">
              <span className="text-muted-foreground/70">{formatLogTime(line.at)}</span>
              <span className={LEVEL[line.level]}>{line.text}</span>
            </p>
          ))}
          <div ref={endRef} />
        </div>
      )}
    </section>
  );
}
