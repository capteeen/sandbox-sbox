"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { ArrowUpRight, Box, Check, Code2, Cpu, Plus, Search, ShieldCheck, Sparkles } from "lucide-react";
import { useDemo } from "@/components/demo-store";
import type { ModelTier } from "@/lib/sessions";

const modes = [
  { name: "Build", icon: Code2, example: "Build a public dashboard that tracks the latest Solana ecosystem grants and makes them easy to explore." },
  { name: "Research", icon: Search, example: "Research the best open source tools for Solana developers and ship a concise comparison." },
  { name: "Create", icon: Sparkles, example: "Create a responsive launch page for a community project, with clear copy and a memorable visual direction." }
] as const;

const tiers: { name: ModelTier; burn: number }[] = [
  { name: "Economy", burn: 75 },
  { name: "Standard", burn: 150 },
  { name: "Frontier", burn: 250 }
];

export function LandingSpawnConsole() {
  const router = useRouter();
  const { spawn } = useDemo();
  const [mode, setMode] = useState<(typeof modes)[number]["name"]>("Build");
  const [tier, setTier] = useState<ModelTier>("Standard");
  const [prompt, setPrompt] = useState("");
  const [error, setError] = useState("");
  const selectedMode = modes.find((item) => item.name === mode)!;
  const selectedTier = tiers.find((item) => item.name === tier)!;

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (prompt.trim().length < 12) {
      setError("Give Boxi a little more detail, or use the example prompt.");
      return;
    }
    const id = spawn(prompt, tier, selectedTier.burn);
    router.push(`/session/${id}`);
  }

  return <section id="spawn-console" className="landing-console" aria-labelledby="console-title">
    <div className="landing-console-glow" aria-hidden="true" />
    <div className="console-inner wrap">
      <div className="console-meta"><span>✳ SANDBOX / OPEN WORKSPACE</span><span>001 — SPAWN</span></div>
      <div className="console-modes" role="group" aria-label="Task type">
        {modes.map(({ name, icon: Icon }) => <button type="button" key={name} className={mode === name ? "active" : ""} aria-pressed={mode === name} onClick={() => { setMode(name); setError(""); }}><Icon size={15} />{name}</button>)}
      </div>
      <div className="console-heading"><span className="console-spark" aria-hidden="true">✳</span><h2 id="console-title">Spawn<span>.</span></h2><p className="console-kicker">AN IDEA NEEDS A PLACE TO RUN <span className="pulse-dot" /></p><p className="console-subtitle">Give Boxi the brief. Choose a tier. Watch the work unfold in public.</p></div>

      <form className="console-form" onSubmit={submit}>
        <div className="console-workspace">
          <div className="console-tool-rail" aria-label="Task type shortcuts">
            {modes.map(({ name, icon: Icon }) => <button type="button" key={name} className={mode === name ? "active" : ""} aria-label={`${name} task`} aria-pressed={mode === name} onClick={() => { setMode(name); setError(""); }}><Icon size={18} /><span>{name}</span></button>)}
          </div>
          <div className="console-prompt-card">
            <div className="console-card-top"><span className="console-card-icon"><Box size={18} /></span><strong>New sandbox brief</strong><span className="console-card-counter">01 / 03</span></div>
            <label className="sr-only" htmlFor="landing-task-prompt">Task prompt</label>
            <div className="console-input-wrap"><span className="console-input-plus" aria-hidden="true"><Plus size={24} /></span><textarea id="landing-task-prompt" value={prompt} onChange={(event) => { setPrompt(event.target.value); setError(""); }} placeholder={`What should Boxi ${mode.toLowerCase()}? Describe the result you want to see...`} maxLength={1500} rows={4} /></div>
            <div className="console-card-bottom"><button type="button" onClick={() => { setPrompt(selectedMode.example); setError(""); }}>Use an example <ArrowUpRight size={14} /></button><span>{prompt.length} / 1500</span></div>
          </div>
          <div className="console-stage-rail" aria-hidden="true"><span className="active"><Check size={14} /></span><i /><span><Cpu size={14} /></span><i /><span><Box size={14} /></span></div>
        </div>
        <div className="console-tier-row"><span>MODEL TIER</span><div role="group" aria-label="Model tier">{tiers.map((item) => <button type="button" key={item.name} className={tier === item.name ? "active" : ""} aria-pressed={tier === item.name} onClick={() => setTier(item.name)}>{item.name}</button>)}</div><strong>{selectedTier.burn} <small>$SBOX</small></strong></div>
        {error && <p className="console-error" role="alert">{error}</p>}
        <button className="console-submit" type="submit"><span className="console-submit-orbit" aria-hidden="true" />Spawn sandbox <ArrowUpRight size={20} /></button>
        <p className="console-disclaimer"><ShieldCheck size={14} /> Demo only. No tokens are burned and no agent job runs.</p>
      </form>
      <div className="console-footer"><span>BRIEF</span><i /><span>QUEUE</span><i /><span>REVIEW</span><i /><span>SHIP</span></div>
    </div>
  </section>;
}
