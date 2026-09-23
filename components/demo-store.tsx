"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { ModelTier, Session, SessionStatus, seedSessions } from "@/lib/sessions";

type Store = {
  sessions: Session[];
  walletConnected: boolean;
  walletName: string;
  connectDemo: (walletName: string) => void;
  disconnect: () => void;
  spawn: (prompt: string, model: ModelTier, burn: number) => string;
  setStatus: (id: string, status: SessionStatus) => void;
};

const StoreContext = createContext<Store | null>(null);
const SESSIONS_KEY = "sbox-demo-sessions-v1";
const WALLET_KEY = "sbox-demo-wallet-v1";

export function DemoProvider({ children }: { children: React.ReactNode }) {
  const [sessions, setSessions] = useState<Session[]>(seedSessions);
  const [walletName, setWalletName] = useState("");

  useEffect(() => {
    try {
      const savedSessions = localStorage.getItem(SESSIONS_KEY);
      const savedWallet = localStorage.getItem(WALLET_KEY);
      if (savedSessions) {
        const parsed: unknown = JSON.parse(savedSessions);
        if (Array.isArray(parsed)) setSessions(parsed as Session[]);
      }
      if (savedWallet) setWalletName(savedWallet);
    } catch {
      // Keep the supplied demo data if browser storage is unavailable.
    }
  }, []);

  function saveSessions(next: Session[]) {
    setSessions(next);
    try { localStorage.setItem(SESSIONS_KEY, JSON.stringify(next)); } catch { /* demo still works in memory */ }
  }

  function connectDemo(name: string) {
    setWalletName(name);
    try { localStorage.setItem(WALLET_KEY, name); } catch { /* demo still works in memory */ }
  }

  function disconnect() {
    setWalletName("");
    try { localStorage.removeItem(WALLET_KEY); } catch { /* noop */ }
  }

  function spawn(prompt: string, model: ModelTier, burn: number) {
    const id = `SBOX-${Date.now().toString().slice(-7)}`;
    const firstLine = prompt.trim().split(/[.!?\n]/)[0].trim();
    const title = firstLine.length > 54 ? `${firstLine.slice(0, 52).replace(/\s+\S*$/, "")}…` : firstLine;
    const session: Session = {
      id,
      title: title || "New sandbox task",
      prompt: prompt.trim(),
      status: "Queued",
      model,
      burn,
      createdAt: new Date().toISOString(),
      owner: walletName ? "Demo wallet" : "Guest demo"
    };
    saveSessions([session, ...sessions]);
    return id;
  }

  function setStatus(id: string, status: SessionStatus) {
    saveSessions(sessions.map((session) => session.id === id ? {
      ...session,
      status,
      artifact: status === "Review" ? "Demo artifact ready for review" : status === "Shipped" ? "Demo artifact approved and shipped" : session.artifact
    } : session));
  }

  return <StoreContext.Provider value={{ sessions, walletConnected: Boolean(walletName), walletName, connectDemo, disconnect, spawn, setStatus }}>{children}</StoreContext.Provider>;
}

export function useDemo() {
  const store = useContext(StoreContext);
  if (!store) throw new Error("useDemo must be used inside DemoProvider");
  return store;
}
