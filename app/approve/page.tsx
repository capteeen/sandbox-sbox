"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight, Box, CheckCheck, CircleCheck, ClipboardCheck, Sparkles } from "lucide-react";
import { useDemo } from "@/components/demo-store";
import { AppShell, EmptyState, PageCard, StatusBadge, TinyFooter } from "@/components/ui";

export default function ApprovePage() {
  const { sessions, setStatus } = useDemo();
  const waiting = sessions.filter((session) => session.status === "Review");
  const shipped = sessions.filter((session) => session.status === "Shipped").slice(0, 3);
  return <AppShell title="Approve board" subtitle="The community gives finished work its green light." action={<span className="demo-label">DEMO APPROVALS</span>}>
    <div className="approve-banner"><span className="approve-banner-icon"><ClipboardCheck size={31} /></span><div><p className="eyebrow">THE FINAL STEP</p><h2>Good work gets seen.<br /><em>Great work gets shipped.</em></h2><p>Review the output, then mark a session shipped. This board uses local demo actions.</p></div><span className="approve-banner-count"><strong>{waiting.length.toString().padStart(2, "0")}</strong><small>AWAITING REVIEW</small></span></div>
    <div className="approve-content"><div><div className="section-title"><div><p className="eyebrow">NEEDS A DECISION</p><h2>Waiting for review</h2></div><span className="section-count">{waiting.length} sessions</span></div>{waiting.length ? <div className="review-grid">{waiting.map((session) => <PageCard className="review-card" key={session.id}><div className="review-card-top"><span className="review-card-icon"><Box size={22} /></span><StatusBadge status={session.status} /></div><p className="eyebrow">{session.id} <span className="row-separator">/</span> {session.model.toUpperCase()}</p><h3>{session.title}</h3><p>{session.prompt}</p><div className="review-artifact"><span><CircleCheck size={17} /></span><div><strong>Artifact ready</strong><small>{session.artifact || "Demo output available for review"}</small></div></div><div className="review-actions"><Link href={`/session/${session.id}`} className="button button-outline">Inspect session <ArrowUpRight size={16} /></Link><button className="button button-primary" onClick={() => setStatus(session.id, "Shipped")}><CheckCheck size={17} /> Approve</button></div></PageCard>)}</div> : <PageCard><EmptyState title="The board is clear" text="Boxi is waiting for the next session to reach review. Advance a demo session to see the approval flow." /><Link href="/app" className="button button-outline centered-button">Browse sessions <ArrowRight size={16} /></Link></PageCard>}</div>
      <aside><div className="section-title"><div><p className="eyebrow">RECENTLY CLEARED</p><h2>Shipped</h2></div></div><PageCard className="shipped-list">{shipped.map((session) => <Link href={`/session/${session.id}`} key={session.id} className="shipped-row"><span><Sparkles size={18} /></span><div><strong>{session.title}</strong><small>{session.id}</small></div><ArrowUpRight size={16} /></Link>)}</PageCard><div className="approval-note"><Sparkles size={19} /><p>Nothing ships without the bag.</p></div></aside></div><TinyFooter />
  </AppShell>;
}
