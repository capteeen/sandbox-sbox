"use client";

import { BackpackWalletAdapter } from "@solana/wallet-adapter-backpack";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { SolflareWalletAdapter } from "@solana/wallet-adapter-solflare";
import { clusterApiUrl } from "@solana/web3.js";
import { useEffect, useMemo, type ReactNode } from "react";
import { ConnectProvider } from "@/components/connect-button";
import { Shell } from "@/components/shell";
import { Toaster } from "@/components/ui/sonner";
import { hydrate, tickLive } from "@/lib/mock-sessions";

const endpoint = clusterApiUrl("devnet");

export function Providers({ children }: { children: ReactNode }) {
  const wallets = useMemo(
    () => [new PhantomWalletAdapter(), new SolflareWalletAdapter(), new BackpackWalletAdapter()],
    [],
  );
  useEffect(() => {
    hydrate();
    const id = window.setInterval(() => tickLive(), 700);
    return () => window.clearInterval(id);
  }, []);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect={false}>
        <ConnectProvider>
          <Shell>{children}</Shell>
          <Toaster />
        </ConnectProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
