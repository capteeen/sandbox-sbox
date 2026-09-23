"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Activity, ArrowRight, Box, Check, ChevronRight, CircleDollarSign, Compass, LayoutDashboard, LogOut, Menu, Plus, ShieldCheck, Wallet, X } from "lucide-react";
import { useDemo } from "@/components/demo-store";
import { Session, SessionStatus, shortDate, statusProgress } from "@/lib/sessions";

export function Brand({ compact = false }: { compact?: boolean }) {
  return <Link href="/" className={`brand ${compact ? "brand-compact" : ""}`} aria-label="Sandbox home">
    <span className="brand-mark"><Box size={21} strokeWidth={2.2} /><span className="brand-mark-dot" /></span>
    {!compact && <><span className="brand-name">sandbox<span className="brand-period">.</span></span><span className="token-pill">$SBOX</span></>}
  </Link>;
}

export function WalletButton({ small = false }: { small?: boolean }) {
  const { walletConnected, walletName, connectDemo, disconnect } = useDemo();
  const [open, setOpen] = useState(false);
  return <>
    <button className={`wallet-button ${small ? "wallet-button-small" : ""}`} onClick={() => setOpen(true)}>
      <Wallet size={16} /> {walletConnected ? `${walletName} demo` : "Connect wallet"}
    </button>
    {open && <div className="modal-backdrop" role="presentation" onMouseDown={() => setOpen(false)}>
      <div className="wallet-modal" role="dialog" aria-modal="true" aria-label="Wallet connection" onMouseDown={(event) => event.stopPropagation()}>
        <button className="icon-button modal-close" onClick={() => setOpen(false)} aria-label="Close wallet dialog"><X size={19} /></button>
        <div className="modal-icon"><Wallet size={24} /></div>
        <p className="eyebrow">SANDBOX DEMO</p>
        <h2>{walletConnected ? "Demo wallet connected" : "Choose a wallet"}</h2>
        <p className="muted">This preview uses a local demo wallet. No extension connects and no tokens move.</p>
        {walletConnected ? <button className="wallet-option" onClick={() => { disconnect(); setOpen(false); }}><LogOut size={19} /> Disconnect demo wallet <ArrowRight size={16} /></button> : <div className="wallet-options">
          {[["Phantom", "/logos/phantom.svg"], ["Solflare", "/logos/solflare.svg"], ["Backpack", "/logos/backpack.svg"]].map(([name, logo]) => <button className="wallet-option" key={name} onClick={() => { connectDemo(name); setOpen(false); }}><Image src={logo} alt="" width={24} height={24} /> Continue with {name} demo <ArrowRight size={16} /></button>)}
        </div>}
        <p className="modal-footnote"><ShieldCheck size={14} /> UI preview · local browser data only</p>
      </div>
    </div>}
  </>;
}

const nav = [
  { href: "/app", label: "Overview", icon: LayoutDashboard },
  { href: "/spawn", label: "Spawn sandbox", icon: Plus },
  { href: "/approve", label: "Approve board", icon: Check },
  { href: "/cashout", label: "Cash out", icon: CircleDollarSign }
];

export function AppShell({ children, title, subtitle, action }: { children: React.ReactNode; title: string; subtitle: string; action?: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  return <div className="app-shell">
    <aside className={`sidebar ${mobileOpen ? "sidebar-open" : ""}`}>
      <div className="sidebar-top"><Brand /><button className="icon-button mobile-close" onClick={() => setMobileOpen(false)} aria-label="Close navigation"><X size={18} /></button></div>
      <div className="sidebar-section-label">WORKSPACE</div>
      <nav className="side-nav" aria-label="App navigation">{nav.map(({ href, label, icon: Icon }) => <Link key={href} href={href} onClick={() => setMobileOpen(false)} className={`side-link ${pathname === href || (href === "/app" && pathname.startsWith("/session")) ? "active" : ""}`}><Icon size={18} /><span>{label}</span>{href === "/approve" && <ReviewCount />}</Link>)}</nav>
      <div className="sidebar-bottom"><div className="sidebar-signal"><span className="signal-icon"><Activity size={17} /></span><div><strong>System online</strong><small>Demo network · all systems ready</small></div><span className="signal-dot" /></div><div className="sidebar-foot">A little chaos. A lot of shipping.<br /><span>Experimental preview · v0.1</span></div></div>
    </aside>
    {mobileOpen && <button className="mobile-scrim" aria-label="Close navigation" onClick={() => setMobileOpen(false)} />}
    <div className="app-main">
      <header className="app-topbar"><button className="icon-button menu-button" onClick={() => setMobileOpen(true)} aria-label="Open navigation"><Menu size={21} /></button><div className="breadcrumb"><span>Sandbox</span><ChevronRight size={14} /><strong>{title}</strong></div><div className="topbar-right"><span className="demo-chip"><span className="pulse-dot" /> LIVE DEMO</span><WalletButton small /></div></header>
      <main className="app-content"><div className="page-heading"><div><p className="eyebrow">THE CONTROL ROOM <span className="eyebrow-line" /></p><h1>{title}</h1><p>{subtitle}</p></div>{action}</div>{children}</main>
    </div>
  </div>;
}

function ReviewCount() { const { sessions } = useDemo(); const count = sessions.filter((s) => s.status === "Review").length; return count > 0 ? <span className="nav-count">{count}</span> : null; }

export function StatusBadge({ status }: { status: SessionStatus }) {
  return <span className={`status-badge status-${status.toLowerCase()}`}><span className="status-dot" />{status}</span>;
}

export function SessionRow({ session }: { session: Session }) {
  return <Link href={`/session/${session.id}`} className="session-row">
    <div className="session-row-icon"><Box size={19} /></div>
    <div className="session-row-main"><strong>{session.title}</strong><span>{session.id} <span className="row-separator">·</span> {session.model} model</span></div>
    <div className="session-row-progress"><span className="mini-track"><span style={{ width: `${statusProgress(session.status)}%` }} /></span><small>{statusProgress(session.status)}%</small></div>
    <StatusBadge status={session.status} />
    <span className="session-row-date">{shortDate(session.createdAt)}</span>
    <ChevronRight size={17} className="row-arrow" />
  </Link>;
}

export function SectionTitle({ label, title, href, linkText }: { label?: string; title: string; href?: string; linkText?: string }) {
  return <div className="section-title"><div>{label && <p className="eyebrow">{label}</p>}<h2>{title}</h2></div>{href && <Link href={href} className="text-link">{linkText || "View all"}<ArrowRight size={16} /></Link>}</div>;
}

export function EmptyState({ title, text }: { title: string; text: string }) {
  return <div className="empty-state"><div className="empty-box"><Box size={32} /><span className="empty-eye left" /><span className="empty-eye right" /></div><h3>{title}</h3><p>{text}</p></div>;
}

export function PageCard({ children, className = "" }: { children: React.ReactNode; className?: string }) { return <div className={`panel ${className}`}>{children}</div>; }

export function TinyFooter() { return <footer className="tiny-footer"><span>© 2026 Sandbox · Nothing ships without the bag.</span><span>Experimental interface preview <Compass size={14} /></span></footer>; }
