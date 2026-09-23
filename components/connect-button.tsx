"use client";

import { WalletReadyState } from "@solana/wallet-adapter-base";
import { useWallet } from "@solana/wallet-adapter-react";
import { cn } from "cn";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { toast } from "sonner";
import { shortAddress } from "@/lib/format";
import {
  connectReal,
  connectStub,
  disconnectWallet,
  useSandbox,
  WALLETS,
  type WalletBrand,
} from "@/lib/mock-sessions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const ConnectUiContext = createContext<{ openConnect: () => void }>({
  openConnect() {},
});

export function useConnectUi() {
  return useContext(ConnectUiContext);
}

export function ConnectProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const value = useMemo(() => ({ openConnect: () => setOpen(true) }), []);
  return (
    <ConnectUiContext.Provider value={value}>
      {children}
      <ConnectDialog open={open} onOpenChange={setOpen} />
    </ConnectUiContext.Provider>
  );
}

export function ConnectButton({ className }: { className?: string }) {
  const { openConnect } = useConnectUi();
  const { wallet } = useSandbox();

  if (!wallet.connected || !wallet.address || !wallet.name) {
    return (
      <Button className={cn("h-10 px-4", className)} onClick={openConnect}>
        Connect wallet
      </Button>
    );
  }

  return (
    <Button
      variant="outline"
      className={cn("h-10 px-3", className)}
      onClick={openConnect}
    >
      <span className="font-mono text-xs">{shortAddress(wallet.address)}</span>
      <span className="text-muted-foreground">{wallet.name}</span>
      {wallet.stub ? <span className="text-warning">stub</span> : null}
    </Button>
  );
}

function ConnectDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { wallets, select, connect, disconnect, wallet } = useWallet();
  const sandboxWallet = useSandbox().wallet;
  const [pending, setPending] = useState<WalletBrand | null>(null);
  const started = useRef<WalletBrand | null>(null);

  useEffect(() => {
    if (!pending || !wallet || wallet.adapter.name !== pending) return;
    if (started.current === pending) return;
    started.current = pending;
    let cancel = false;
    connect()
      .then(() => {
        if (cancel) return;
        const address = wallet.adapter.publicKey?.toBase58();
        if (address) {
          connectReal(pending, address);
          toast.success(`${pending} connected`);
        } else {
          connectStub(pending);
          toast.message("Stub wallet", {
            description: "Extension did not connect. You can still walk the loop.",
          });
        }
        setPending(null);
        started.current = null;
        onOpenChange(false);
      })
      .catch(() => {
        if (cancel) return;
        connectStub(pending);
        toast.message("Stub wallet", {
          description: "Extension did not connect. You can still walk the loop.",
        });
        setPending(null);
        started.current = null;
        onOpenChange(false);
      });
    return () => {
      cancel = true;
    };
  }, [connect, onOpenChange, pending, wallet]);

  function onPick(name: WalletBrand) {
    const found = wallets.find((item) => item.adapter.name === name);
    if (found?.readyState === WalletReadyState.Installed) {
      setPending(name);
      select(found.adapter.name);
      return;
    }
    connectStub(name);
    toast.message("Stub wallet", {
      description: "No extension in this browser. You can still walk the loop.",
    });
    onOpenChange(false);
  }

  async function onDisconnect() {
    try {
      await disconnect();
    } catch {
      // Stub sessions have no adapter session to close.
    }
    disconnectWallet();
    setPending(null);
    started.current = null;
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Connect wallet</DialogTitle>
          <DialogDescription>
            Phantom, Solflare, or Backpack. No extension means a stub wallet so the loop still runs.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-2">
          {WALLETS.map((name) => {
            const found = wallets.find((item) => item.adapter.name === name);
            const detected = found?.readyState === WalletReadyState.Installed;
            return (
              <button
                key={name}
                type="button"
                onClick={() => onPick(name)}
                disabled={pending !== null}
                className="flex items-center gap-3 rounded-xl border border-border bg-background px-3 py-3 text-left transition hover:border-ice/40 disabled:opacity-60"
              >
                {found?.adapter.icon ? (
                  // Adapter icons are data URIs shipped by the wallet packages.
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={found.adapter.icon} alt="" className="size-8 rounded-lg" />
                ) : (
                  <span className="flex size-8 items-center justify-center rounded-lg bg-secondary font-mono text-xs">
                    {name.slice(0, 1)}
                  </span>
                )}
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-medium">{name}</span>
                  <span className="block text-xs text-muted-foreground">
                    {pending === name ? "Connecting…" : detected ? "Extension detected" : "No extension · stub"}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
        {sandboxWallet.connected ? (
          <Button variant="outline" className="h-10" onClick={onDisconnect}>
            Disconnect
          </Button>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
