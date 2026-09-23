"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight, CircleDollarSign, Coins, LockKeyhole, ShieldCheck, Sparkles } from "lucide-react";
import { AppShell, PageCard, TinyFooter } from "@/components/ui";

export default function CashoutPage() {
  return <AppShell title="Cash out" subtitle="A clear path for fees when real sessions are live." action={<span className="demo-label">COMING AFTER V1</span>}>
    <div className="cashout-layout"><PageCard className="cashout-main"><div className="cashout-icon"><CircleDollarSign size={34} /></div><p className="eyebrow">FEE SINK / PREVIEW</p><h2>Fees that go somewhere.</h2><p>When on-chain sessions and real fees are connected, this space will show what can be settled in SOL or USDT and what returns to the $SBOX loop.</p><div className="cashout-route"><div><span className="route-token">$</span><strong>Session fees</strong><small>Real activity only</small></div><ArrowRight size={22} /><div><span className="route-token route-sol">◎</span><strong>SOL / USDT</strong><small>Planned settlement</small></div></div><div className="cashout-locked"><LockKeyhole size={18} /><span>Cashout is not active in this demo. No balances or earnings are represented.</span></div></PageCard><aside><PageCard className="cashout-side"><span className="side-step">01</span><Coins size={24} /><h3>Use the box</h3><p>Tokens fund a sandbox session when the burn flow is connected.</p></PageCard><PageCard className="cashout-side"><span className="side-step">02</span><ShieldCheck size={24} /><h3>Review the work</h3><p>The community decides what is ready to ship.</p></PageCard><PageCard className="cashout-side"><span className="side-step">03</span><Sparkles size={24} /><h3>Close the loop</h3><p>Real fee routing will be visible here once it exists.</p></PageCard></aside></div><div className="cashout-bottom"><p>For now, explore the product flow in demo mode.</p><Link href="/spawn" className="button button-primary">Spawn a sandbox <ArrowUpRight size={17} /></Link></div><TinyFooter />
  </AppShell>;
}
