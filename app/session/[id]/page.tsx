"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight, Box, Check, CheckCheck, Clock3, Code2, Copy, FileText, Flame, Play, Radio, ShieldCheck, Sparkles, TerminalSquare } from "lucide-react";
import { useState } from "react";
import { useDemo } from "@/components/demo-store";
import { AppShell, EmptyState, PageCard, StatusBadge, TinyFooter } from "@/components/ui";
import { SessionStatus, statusOrder } from "@/lib/sessions";

const stages = ["Plan", "Execute", "Verify", "Review", "Ship"];

export default function SessionPage() {
  const params = useParams<{ id: string }>();
  const { sessions, setStatus } = useDemo();
  const [copied, setCopied] = useState(false);
  const session = sessions.find((item) => item.id === params.id);
  if (!session) return <AppShell title="Session not found" subtitle="This box may have moved."><EmptyState title="No sandbox here" text="Try the overview to find an existing session." /><Link href="/app" className="button button-primary">Back to overview <ArrowRight size={17} /></Link></AppShell>;
  const currentStage = session.status === "Queued" ? -1 : session.status === "Running" ? 1 : session.status === "Review" ? 3 : session.status === "Shipped" ? 4 : 0;
  const next: SessionStatus | null = session.status === "Queued" ? "Running" : session.status === "Running" ? "Review" : null;
  const logs = session.status === "Queued" ? [
    ["15:42:06", "system", "Sandbox created. Waiting for a worker slot."],
    ["15:42:07", "queue", `${session.model} tier selected · ${session.burn} $SBOX demo burn.`]
  ] : [
    ["15:42:06", "system", "Sandbox initialized in demo mode."],
    ["15:42:08", "plan", "Reading task and outlining the work."],
    ["15:42:12", "plan", `Task: ${session.prompt.slice(0, 72)}${session.prompt.length > 72 ? "…" : ""}`],
    ["15:42:18", "execute", "Creating files and organizing the artifact."],
    ["15:42:24", "execute", "Implementation pass complete."],
    ...(session.status === "Review" || session.status === "Shipped" ? [["15:42:28", "verify", "Checks complete. Artifact ready for review."]] : []),
    ...(session.status === "Shipped" ? [["15:42:36", "ship", "Community approved the ship."]] : [])
  ];

  async function copyId() {
    try { await navigator.clipboard.writeText(session!.id); setCopied(true); setTimeout(() => setCopied(false), 1800); } catch { /* Clipboard may be unavailable. */ }
  }

  return <AppShell title="Session detail" subtitle="A window into the work, from first prompt to final ship." action={<Link href="/app" className="button button-outline"><ArrowLeft size={17} /> Overview</Link>}>
    <div className="session-detail-head"><div className="detail-title-line"><span className="detail-box-icon"><Box size={25} /></span><div><p className="eyebrow">SANDBOX SESSION <span className="eyebrow-line" /></p><h2>{session.title}</h2><button className="copy-id" onClick={copyId}>{session.id} {copied ? <Check size={14} /> : <Copy size={14} />}</button></div></div><StatusBadge status={session.status} /></div>
    <div className="session-stat-strip"><div><span>MODEL TIER</span><strong>{session.model}</strong></div><div><span>DEMO BURN</span><strong>{session.burn} $SBOX</strong></div><div><span>OWNER</span><strong>{session.owner}</strong></div><div><span>CREATED</span><strong>{new Date(session.createdAt).toLocaleString("en", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" })}</strong></div></div>
    <PageCard className="progress-panel"><div className="panel-heading"><div><p className="eyebrow">BUILD PIPELINE</p><h3>From idea to ship</h3></div><span className="demo-label">DEMO TIMELINE</span></div><div className="stage-track">{stages.map((stage, index) => <div className={`stage ${index <= currentStage ? "stage-complete" : ""} ${index === currentStage ? "stage-current" : ""}`} key={stage}><span className="stage-circle">{index < currentStage || session.status === "Shipped" ? <Check size={16} /> : String(index + 1).padStart(2, "0")}</span><strong>{stage}</strong><small>{index < currentStage || session.status === "Shipped" ? "Complete" : index === currentStage ? "In progress" : "Pending"}</small></div>)}</div></PageCard>
    <div className="session-detail-grid"><div className="session-detail-main"><PageCard className="terminal-panel"><div className="terminal-top"><div><TerminalSquare size={19} /><strong>Session log</strong><span className="log-live"><span className="pulse-dot" /> {session.status === "Running" ? "RUNNING" : "DEMO REPLAY"}</span></div><span>terminal / {session.id.toLowerCase()}</span></div><div className="terminal-lines">{logs.map(([time, level, message], index) => <div className="log-line" key={`${time}-${index}`}><span className="log-time">{time}</span><span className={`log-level log-${level}`}>{level}</span><span className="log-message">{message}</span></div>)}<div className="terminal-cursor">› <span /></div></div></PageCard><PageCard className="prompt-panel"><div className="panel-heading"><div><p className="eyebrow">THE BRIEF</p><h3>Original prompt</h3></div><FileText size={20} /></div><p>{session.prompt}</p></PageCard></div>
      <aside className="session-detail-aside"><PageCard className="artifact-panel"><div className="panel-heading"><div><p className="eyebrow">OUTPUT</p><h3>Artifacts</h3></div><Code2 size={20} /></div>{session.artifact ? <div className="artifact-item"><span><FileText size={20} /></span><div><strong>Session artifact</strong><small>{session.artifact}</small></div><ArrowUpRight size={17} /></div> : <div className="artifact-empty"><div className="artifact-empty-image"><Image src="/brand/boxi-running.png" alt="Boxi waiting for a session artifact" fill sizes="90px" /></div><strong>Nothing in the box yet.</strong><p>Boxi is waiting for the first artifact.</p></div>}</PageCard><PageCard className="action-panel"><span className="action-emblem"><ShieldCheck size={23} /></span><p className="eyebrow">COMMUNITY GATE</p><h3>{session.status === "Shipped" ? "This one shipped." : session.status === "Review" ? "Ready for your call." : "Work in progress."}</h3><p>{session.status === "Shipped" ? "The demo artifact has community approval." : session.status === "Review" ? "Review the demo artifact and approve the ship." : "Watch the session move through its steps. Review opens when the work is ready."}</p>{session.status === "Review" ? <button className="button button-primary action-full" onClick={() => setStatus(session.id, "Shipped")}><CheckCheck size={18} /> Approve ship <ArrowUpRight size={17} /></button> : next ? <button className="button button-outline action-full" onClick={() => setStatus(session.id, next)}><Play size={17} /> Advance demo to {next} <ArrowRight size={17} /></button> : <div className="shipped-celebrate"><Sparkles size={18} /> Approved in demo mode</div>}<small>Local demo action · no on-chain vote</small></PageCard></aside></div><TinyFooter />
  </AppShell>;
}
