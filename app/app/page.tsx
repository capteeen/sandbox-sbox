"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Box, Check, Clock3, Coins, Plus, Radio, Sparkles } from "lucide-react";
import { useDemo } from "@/components/demo-store";
import { AppShell, PageCard, SectionTitle, SessionRow, StatusBadge, TinyFooter } from "@/components/ui";

export default function Dashboard() {
  const { sessions } = useDemo();
  const active = sessions.filter((s) => s.status === "Running").length;
  const queued = sessions.filter((s) => s.status === "Queued").length;
  const review = sessions.filter((s) => s.status === "Review").length;
  const shipped = sessions.filter((s) => s.status === "Shipped").length;
  return <AppShell title="Overview" subtitle="Your command center for ideas in motion." action={<Link href="/spawn" className="button button-primary"><Plus size={17} /> Spawn sandbox</Link>}>
    <div className="dashboard-grid"><PageCard className="balance-card"><div className="card-topline"><span className="eyebrow">YOUR $SBOX BALANCE</span><span className="demo-label">DEMO BALANCE</span></div><div className="balance-line"><span>2,450<span className="balance-decimal">.00</span></span><span className="balance-unit">SBOX</span></div><p>Fuel for the next thing worth building.</p><div className="balance-card-bottom"><div><span className="balance-mini-icon"><Coins size={17} /></span><span>Suggested burn</span><strong>150 $SBOX</strong></div><Link href="/spawn" className="balance-arrow" aria-label="Spawn a sandbox"><ArrowUpRight size={20} /></Link></div><div className="balance-glow" /></PageCard>
      <PageCard className="metric-card"><div className="metric-icon icon-ice"><Radio size={20} /></div><span className="metric-number">{active.toString().padStart(2, "0")}</span><div className="metric-label">Running now <ArrowUpRight size={15} /></div><p>Boxes doing the work</p><div className="metric-bars"><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /></div></PageCard>
      <PageCard className="metric-card"><div className="metric-icon icon-amber"><Clock3 size={20} /></div><span className="metric-number">{queued.toString().padStart(2, "0")}</span><div className="metric-label">In the queue <ArrowUpRight size={15} /></div><p>Ready for their turn</p><div className="metric-dashes"><span /><span /><span /><span /><span /></div></PageCard>
      <PageCard className="metric-card"><div className="metric-icon icon-mint"><Check size={20} /></div><span className="metric-number">{shipped.toString().padStart(2, "0")}</span><div className="metric-label">Shipped <ArrowUpRight size={15} /></div><p>Approved by the community</p><div className="metric-sparkles">✳ <span>✧</span> ✳</div></PageCard></div>
    <div className="dashboard-lower"><div className="dashboard-primary"><SectionTitle label="SANDBOX ACTIVITY" title="Recent sessions" href="/approve" linkText="Review board" /><PageCard className="sessions-panel"><div className="table-head"><span>SESSION</span><span>PROGRESS</span><span>STATUS</span><span>CREATED</span></div>{sessions.slice(0, 5).map((session) => <SessionRow key={session.id} session={session} />)}<Link href="/spawn" className="add-session"><Plus size={17} /> Start a new session <ArrowRight size={16} /></Link></PageCard></div><div className="dashboard-aside"><SectionTitle label="NEXT UP" title="Community review" /><PageCard className="review-teaser"><div className="review-teaser-top"><span className="review-teaser-icon"><Box size={23} /></span><span className="demo-label">{review} WAITING</span></div><h3>The final call is yours.</h3><p>Finished work waits for a community green light before it ships.</p><div className="review-teaser-art"><Image src="/brand/boxi-approved.png" alt="Boxi with an approval token" width={94} height={94} /></div><Link href="/approve" className="text-link">Go to approve board <ArrowUpRight size={17} /></Link></PageCard><div className="aside-note"><Sparkles size={18} /><p><strong>Boxi says:</strong> Good ideas deserve a place to run.</p></div></div></div>
    <TinyFooter />
  </AppShell>;
}
