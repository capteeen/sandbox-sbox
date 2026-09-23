"use client";

import { useSyncExternalStore } from "react";

export const STATUSES = ["Queued", "Running", "Review", "Shipped", "Failed"] as const;
export const STEPS = ["Plan", "Execute", "Verify", "Review", "Ship"] as const;
export const TIERS = ["Frontier", "Standard", "Economy"] as const;
export const WALLETS = ["Phantom", "Solflare", "Backpack"] as const;

export type SessionStatus = (typeof STATUSES)[number];
export type StepId = (typeof STEPS)[number];
export type ModelTier = (typeof TIERS)[number];
export type WalletBrand = (typeof WALLETS)[number];
export type PayoutAsset = "SOL" | "USDT";
export type LogLevel = "info" | "ok" | "warn" | "err";

export type LogLine = {
  id: string;
  at: string;
  level: LogLevel;
  text: string;
};

export type Artifact = {
  name: string;
  kind: "diff" | "note";
  detail: string;
};

export type Session = {
  id: string;
  title: string;
  prompt: string;
  status: SessionStatus;
  tier: ModelTier;
  burn: number;
  stake: number;
  priority: boolean;
  createdAt: string;
  step: StepId;
  logs: LogLine[];
  artifacts: Artifact[];
  votes: number;
  tips: number;
  live: boolean;
  script: LogLine[];
  cursor: number;
  promoteAt: number;
  nextLogAt: number;
};

export type WalletState = {
  connected: boolean;
  name: WalletBrand | null;
  address: string | null;
  stub: boolean;
};

export type Receipt = {
  id: string;
  asset: PayoutAsset;
  sbox: number;
  out: number;
  at: string;
};

export type SandboxState = {
  version: 1;
  sessions: Session[];
  balance: number;
  wallet: WalletState;
  receipts: Receipt[];
  lastShippedId: string | null;
};

export const TIER_BURN: Record<ModelTier, number> = {
  Economy: 80,
  Standard: 200,
  Frontier: 500,
};

export const TIER_COPY: Record<ModelTier, string> = {
  Economy: "Short jobs. Smaller burn.",
  Standard: "The usual box.",
  Frontier: "Longer run. Higher burn.",
};

export const STAKE_COST = 40;
export const FEE_RATE = 0.04;
export const SOL_PER_SBOX = 0.00084;
export const USDT_PER_SBOX = 0.11;
export const START_BALANCE = 12480;

const STORAGE_KEY = "sbox-sandbox-v1";

const STUB_ADDRESS: Record<WalletBrand, string> = {
  Phantom: "7K3pQ9sT2uVwXyZ4aBcDeFgHjKmNpQrStUvWxY",
  Solflare: "4sF2LmN8pQrStUvWxYzAbCdEfGhJkMnPqRsTuV",
  Backpack: "9bP1QrStUvWxYzAbCdEfGhJkMnPqRsTuVwXyZa",
};

const EMPTY_WALLET: WalletState = {
  connected: false,
  name: null,
  address: null,
  stub: false,
};

function line(
  id: string,
  at: string,
  level: LogLevel,
  text: string,
): LogLine {
  return { id, at, level, text };
}

function seedSession(session: Session): Session {
  return session;
}

function createSeed(): SandboxState {
  return {
    version: 1,
    balance: START_BALANCE,
    wallet: EMPTY_WALLET,
    receipts: [],
    lastShippedId: null,
    sessions: [
      seedSession({
        id: "sbox-7c21",
        title: "Tighten the queue cards",
        prompt: "Tighten the queue cards. Keep status chips readable.",
        status: "Running",
        tier: "Standard",
        burn: 200,
        stake: 0,
        priority: false,
        createdAt: "2026-09-23T15:10:00.000Z",
        step: "Execute",
        votes: 1,
        tips: 0,
        live: false,
        script: [],
        cursor: 5,
        promoteAt: 0,
        nextLogAt: 0,
        artifacts: [],
        logs: [
          line("sbox-7c21-0", "2026-09-23T15:10:04.000Z", "info", "plan · tighten the queue cards. keep status chips readable."),
          line("sbox-7c21-1", "2026-09-23T15:10:08.000Z", "info", "plan · tier standard · box reserved"),
          line("sbox-7c21-2", "2026-09-23T15:10:14.000Z", "info", "execute · workspace up"),
          line("sbox-7c21-3", "2026-09-23T15:10:22.000Z", "info", "execute · agent is in the box"),
          line("sbox-7c21-4", "2026-09-23T15:10:31.000Z", "ok", "execute · card spacing locked"),
        ],
      }),
      seedSession({
        id: "sbox-1a90",
        title: "Cashout stub copy",
        prompt: "Write the cashout stub so it never claims a real balance on chain.",
        status: "Queued",
        tier: "Economy",
        burn: 80,
        stake: 0,
        priority: false,
        createdAt: "2026-09-23T15:40:00.000Z",
        step: "Plan",
        votes: 0,
        tips: 0,
        live: false,
        script: [],
        cursor: 0,
        promoteAt: 0,
        nextLogAt: 0,
        artifacts: [],
        logs: [],
      }),
      seedSession({
        id: "sbox-b44e",
        title: "Ship the approve board",
        prompt: "Ship the approve board. One card per session in review.",
        status: "Review",
        tier: "Frontier",
        burn: 500,
        stake: 40,
        priority: true,
        createdAt: "2026-09-23T12:05:00.000Z",
        step: "Review",
        votes: 6,
        tips: 20,
        live: false,
        script: [],
        cursor: 8,
        promoteAt: 0,
        nextLogAt: 0,
        artifacts: [
          { name: "ship.diff", kind: "diff", detail: "Approve board layout, ready for the bag." },
          { name: "notes.md", kind: "note", detail: "One card per session. Status stays Review until a holder ships it." },
        ],
        logs: [
          line("sbox-b44e-0", "2026-09-23T12:05:06.000Z", "info", "plan · ship the approve board"),
          line("sbox-b44e-1", "2026-09-23T12:05:11.000Z", "info", "plan · tier frontier · priority stake"),
          line("sbox-b44e-2", "2026-09-23T12:05:20.000Z", "info", "execute · workspace up"),
          line("sbox-b44e-3", "2026-09-23T12:05:34.000Z", "info", "execute · agent is in the box"),
          line("sbox-b44e-4", "2026-09-23T12:06:02.000Z", "ok", "execute · draft written"),
          line("sbox-b44e-5", "2026-09-23T12:06:18.000Z", "info", "verify · reading the diff"),
          line("sbox-b44e-6", "2026-09-23T12:06:29.000Z", "ok", "verify · checks passed"),
          line("sbox-b44e-7", "2026-09-23T12:06:33.000Z", "info", "review · waiting on the bag"),
        ],
      }),
      seedSession({
        id: "sbox-09d3",
        title: "Landing hero with Boxi",
        prompt: "Place Boxi on the landing hero. Keep the tagline short.",
        status: "Shipped",
        tier: "Standard",
        burn: 200,
        stake: 0,
        priority: false,
        createdAt: "2026-09-22T18:20:00.000Z",
        step: "Ship",
        votes: 11,
        tips: 40,
        live: false,
        script: [],
        cursor: 8,
        promoteAt: 0,
        nextLogAt: 0,
        artifacts: [
          { name: "hero.diff", kind: "diff", detail: "Boxi locked on the hero. Tagline untouched." },
          { name: "notes.md", kind: "note", detail: "Cloud boxes for agents." },
        ],
        logs: [
          line("sbox-09d3-0", "2026-09-22T18:20:05.000Z", "info", "plan · place Boxi on the landing hero"),
          line("sbox-09d3-1", "2026-09-22T18:20:12.000Z", "info", "execute · agent is in the box"),
          line("sbox-09d3-2", "2026-09-22T18:20:40.000Z", "ok", "verify · checks passed"),
          line("sbox-09d3-3", "2026-09-22T18:21:02.000Z", "ok", "ship · holders approved"),
        ],
      }),
      seedSession({
        id: "sbox-e18f",
        title: "Open a fleet socket",
        prompt: "Open a live fleet socket to a remote agent.",
        status: "Failed",
        tier: "Frontier",
        burn: 500,
        stake: 0,
        priority: false,
        createdAt: "2026-09-22T09:12:00.000Z",
        step: "Execute",
        votes: 0,
        tips: 0,
        live: false,
        script: [],
        cursor: 3,
        promoteAt: 0,
        nextLogAt: 0,
        artifacts: [],
        logs: [
          line("sbox-e18f-0", "2026-09-22T09:12:04.000Z", "info", "plan · open a live fleet socket"),
          line("sbox-e18f-1", "2026-09-22T09:12:16.000Z", "info", "execute · reaching for a worker"),
          line("sbox-e18f-2", "2026-09-22T09:12:28.000Z", "err", "execute · no fleet behind the glass"),
          line("sbox-e18f-3", "2026-09-22T09:12:29.000Z", "warn", "execute · job marked failed"),
        ],
      }),
      seedSession({
        id: "sbox-55c0",
        title: "Mono session ids",
        prompt: "Set session ids in mono. Ice blue, not mint.",
        status: "Shipped",
        tier: "Economy",
        burn: 80,
        stake: 0,
        priority: false,
        createdAt: "2026-09-21T16:44:00.000Z",
        step: "Ship",
        votes: 4,
        tips: 10,
        live: false,
        script: [],
        cursor: 4,
        promoteAt: 0,
        nextLogAt: 0,
        artifacts: [
          { name: "type.diff", kind: "diff", detail: "Session ids render in mono ice." },
        ],
        logs: [
          line("sbox-55c0-0", "2026-09-21T16:44:06.000Z", "info", "plan · mono session ids"),
          line("sbox-55c0-1", "2026-09-21T16:44:20.000Z", "ok", "verify · checks passed"),
          line("sbox-55c0-2", "2026-09-21T16:44:40.000Z", "ok", "ship · holders approved"),
        ],
      }),
    ],
  };
}

const serverSnapshot = createSeed();
let snapshot: SandboxState = createSeed();
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((listener) => listener());
  if (typeof window !== "undefined") {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
  }
}

function commit(next: SandboxState) {
  snapshot = next;
  emit();
}

export function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getSnapshot() {
  return snapshot;
}

export function getServerSnapshot() {
  return serverSnapshot;
}

export function hydrate() {
  if (typeof window === "undefined") return;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const parsed = JSON.parse(raw) as SandboxState;
    if (parsed?.version !== 1 || !Array.isArray(parsed.sessions)) return;
    snapshot = parsed;
    emit();
  } catch {
    snapshot = createSeed();
  }
}

export function useSandbox() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function feeAvailable(state: SandboxState = snapshot) {
  const earned = state.sessions
    .filter((session) => session.status === "Shipped")
    .reduce((sum, session) => sum + session.burn * FEE_RATE, 0);
  const spent = state.receipts.reduce((sum, receipt) => sum + receipt.sbox, 0);
  return Math.max(0, Math.round((earned - spent) * 100) / 100);
}

export function quoteOut(asset: PayoutAsset, sbox: number) {
  const rate = asset === "SOL" ? SOL_PER_SBOX : USDT_PER_SBOX;
  return sbox * rate;
}

function titleFrom(prompt: string) {
  const clean = prompt.trim().replace(/\s+/g, " ");
  const sentence = clean.split(/[.!?]/)[0] || clean;
  return sentence.length > 42 ? `${sentence.slice(0, 41)}…` : sentence;
}

function buildScript(prompt: string, tier: ModelTier, id: string, at: string): LogLine[] {
  const clipped = prompt.trim().replace(/\s+/g, " ").slice(0, 90);
  const texts: Array<[LogLevel, string]> = [
    ["info", `plan · ${clipped}`],
    ["info", `plan · tier ${tier.toLowerCase()} · box reserved`],
    ["info", "execute · workspace up"],
    ["info", "execute · agent is in the box"],
    ["ok", "execute · draft written"],
    ["info", "verify · reading the diff"],
    ["ok", "verify · checks passed"],
    ["info", "review · waiting on the bag"],
  ];
  return texts.map(([level, text], index) =>
    line(`${id}-live-${index}`, at, level, text),
  );
}

function stepFor(cursor: number): StepId {
  if (cursor <= 2) return "Plan";
  if (cursor <= 5) return "Execute";
  return "Verify";
}

function makeId(prefix: string) {
  const alphabet = "abcdef0123456789";
  let id = "";
  do {
    id = `${prefix}-`;
    for (let i = 0; i < 4; i += 1) {
      id += alphabet[Math.floor(Math.random() * alphabet.length)];
    }
  } while (snapshot.sessions.some((session) => session.id === id) || snapshot.receipts.some((receipt) => receipt.id === id));
  return id;
}

export function connectStub(name: WalletBrand) {
  commit({
    ...snapshot,
    wallet: {
      connected: true,
      name,
      address: STUB_ADDRESS[name],
      stub: true,
    },
  });
}

export function connectReal(name: WalletBrand, address: string) {
  commit({
    ...snapshot,
    wallet: {
      connected: true,
      name,
      address,
      stub: false,
    },
  });
}

export function disconnectWallet() {
  commit({ ...snapshot, wallet: EMPTY_WALLET });
}

export type SpawnInput = {
  prompt: string;
  tier: ModelTier;
  burn: number;
  priority: boolean;
};

export function spawnSession(input: SpawnInput): { ok: true; id: string } | { ok: false; error: string } {
  if (!snapshot.wallet.connected) {
    return { ok: false, error: "Connect a wallet first." };
  }
  const prompt = input.prompt.trim();
  if (prompt.length < 8) {
    return { ok: false, error: "Tell the agent what to ship." };
  }
  if (prompt.length > 280) {
    return { ok: false, error: "Keep the prompt under 280 characters." };
  }
  if (!Number.isFinite(input.burn) || input.burn < TIER_BURN[input.tier]) {
    return { ok: false, error: `Burn at least ${TIER_BURN[input.tier]} $SBOX for ${input.tier}.` };
  }
  const burn = Math.round(input.burn);
  const stake = input.priority ? STAKE_COST : 0;
  const cost = burn + stake;
  if (cost > snapshot.balance) {
    return { ok: false, error: "Not enough $SBOX in the bag." };
  }
  const now = Date.now();
  const id = makeId("sbox");
  const createdAt = new Date(now).toISOString();
  const session: Session = {
    id,
    title: titleFrom(prompt),
    prompt,
    status: input.priority ? "Running" : "Queued",
    tier: input.tier,
    burn,
    stake,
    priority: input.priority,
    createdAt,
    step: input.priority ? "Execute" : "Plan",
    logs: [],
    artifacts: [],
    votes: 0,
    tips: 0,
    live: true,
    script: buildScript(prompt, input.tier, id, createdAt),
    cursor: 0,
    promoteAt: input.priority ? now : now + 1800,
    nextLogAt: now + (input.priority ? 900 : 2700),
  };
  commit({
    ...snapshot,
    balance: Math.round((snapshot.balance - cost) * 100) / 100,
    sessions: [session, ...snapshot.sessions],
  });
  return { ok: true, id };
}

export function tickLive(now = Date.now()) {
  let changed = false;
  const sessions = snapshot.sessions.map((session) => {
    if (!session.live) return session;
    if (session.status === "Queued" && now >= session.promoteAt) {
      changed = true;
      return { ...session, status: "Running" as const, step: "Execute" as const };
    }
    if (session.status === "Running" && now >= session.nextLogAt) {
      changed = true;
      if (session.cursor >= session.script.length) {
        return {
          ...session,
          status: "Review" as const,
          step: "Review" as const,
          live: false,
          artifacts: session.artifacts.length
            ? session.artifacts
            : [
                { name: "ship.diff", kind: "diff" as const, detail: "Patch ready for review." },
                { name: "notes.md", kind: "note" as const, detail: session.prompt },
              ],
        };
      }
      const nextLine = session.script[session.cursor];
      const cursor = session.cursor + 1;
      return {
        ...session,
        cursor,
        step: stepFor(cursor),
        nextLogAt: now + 1400,
        logs: [
          ...session.logs,
          { ...nextLine, at: new Date(now).toISOString() },
        ],
      };
    }
    return session;
  });
  if (changed) commit({ ...snapshot, sessions });
}

export function approveSession(id: string): { ok: true } | { ok: false; error: string } {
  if (!snapshot.wallet.connected) return { ok: false, error: "Connect a wallet first." };
  const session = snapshot.sessions.find((item) => item.id === id);
  if (!session) return { ok: false, error: "That session is not on the queue." };
  if (session.status === "Failed") return { ok: false, error: "This one failed. Spawn another." };
  if (session.status !== "Review") return { ok: false, error: "Not ready to ship." };
  commit({
    ...snapshot,
    lastShippedId: id,
    sessions: snapshot.sessions.map((item) =>
      item.id === id
        ? {
            ...item,
            status: "Shipped",
            step: "Ship",
            live: false,
            logs: [
              ...item.logs,
              line(`${id}-ship`, new Date().toISOString(), "ok", "ship · holders approved"),
            ],
          }
        : item,
    ),
  });
  return { ok: true };
}

export function voteSession(id: string): { ok: true } | { ok: false; error: string } {
  if (!snapshot.wallet.connected) return { ok: false, error: "Connect a wallet first." };
  const session = snapshot.sessions.find((item) => item.id === id);
  if (!session || session.status !== "Review") return { ok: false, error: "Votes land on review." };
  commit({
    ...snapshot,
    sessions: snapshot.sessions.map((item) =>
      item.id === id ? { ...item, votes: item.votes + 1 } : item,
    ),
  });
  return { ok: true };
}

export function tipSession(id: string, amount: number): { ok: true } | { ok: false; error: string } {
  if (!snapshot.wallet.connected) return { ok: false, error: "Connect a wallet first." };
  const tip = Math.round(amount);
  if (!Number.isFinite(tip) || tip < 1) return { ok: false, error: "Tip at least 1 $SBOX." };
  if (tip > snapshot.balance) return { ok: false, error: "Not enough $SBOX in the bag." };
  const session = snapshot.sessions.find((item) => item.id === id);
  if (!session) return { ok: false, error: "That session is not on the queue." };
  if (session.status === "Failed" || session.status === "Queued") {
    return { ok: false, error: "Tip a session that is running, in review, or shipped." };
  }
  commit({
    ...snapshot,
    balance: snapshot.balance - tip,
    sessions: snapshot.sessions.map((item) =>
      item.id === id ? { ...item, tips: item.tips + tip } : item,
    ),
  });
  return { ok: true };
}

export function cashOut(asset: PayoutAsset, amount: number): { ok: true; id: string } | { ok: false; error: string } {
  if (!snapshot.wallet.connected) return { ok: false, error: "Connect a wallet first." };
  const sbox = Math.round(amount * 100) / 100;
  if (!Number.isFinite(sbox) || sbox <= 0) return { ok: false, error: "Enter a fee amount." };
  const available = feeAvailable();
  if (sbox > available + 0.001) return { ok: false, error: "That is more than the fee bag." };
  const id = makeId("out");
  const receipt: Receipt = {
    id,
    asset,
    sbox,
    out: quoteOut(asset, sbox),
    at: new Date().toISOString(),
  };
  commit({ ...snapshot, receipts: [receipt, ...snapshot.receipts] });
  return { ok: true, id };
}

export function resetSandbox() {
  if (typeof window !== "undefined") window.localStorage.removeItem(STORAGE_KEY);
  snapshot = createSeed();
  emit();
}
