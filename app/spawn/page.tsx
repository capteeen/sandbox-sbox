"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowRight, ArrowUpRight, Box, CircleHelp, Flame, ShieldCheck, Sparkles, Zap } from "lucide-react";
import { useDemo } from "@/components/demo-store";
import { AppShell, PageCard, TinyFooter } from "@/components/ui";
import { ModelTier } from "@/lib/sessions";

const tiers: { name: ModelTier; desc: string; burn: number; icon: string }[] = [
  { name: "Economy", desc: "Quick, simple tasks", burn: 75, icon: "/logos/gemini.svg" },
  { name: "Standard", desc: "Balanced builds", burn: 150, icon: "/logos/openai.svg" },
  { name: "Frontier", desc: "Bigger challenges", burn: 250, icon: "/logos/anthropic.svg" }
];

export default function SpawnPage() {
  const router = useRouter();
  const { spawn } = useDemo();
  const [model, setModel] = useState<ModelTier>("Standard");
  const [prompt, setPrompt] = useState("");
  const [error, setError] = useState("");
  const selected = tiers.find((tier) => tier.name === model)!;

  function submit(event: React.FormEvent) {
    event.preventDefault();
    if (prompt.trim().length < 12) { setError("Give Boxi a little more detail (at least 12 characters)."); return; }
    const id = spawn(prompt, model, selected.burn);
    router.push(`/session/${id}`);
  }

  return <AppShell title="Spawn sandbox" subtitle="Give your idea a box and let it run.">
    <div className="spawn-layout"><form className="spawn-form" onSubmit={submit}><PageCard className="form-panel"><div className="form-step"><span>01</span><div><h2>Choose your engine</h2><p>Pick the pace for this sandbox.</p></div></div><div className="tier-grid" role="radiogroup" aria-label="Model tier">{tiers.map((tier) => <button type="button" role="radio" aria-checked={model === tier.name} className={`tier-card ${model === tier.name ? "selected" : ""}`} key={tier.name} onClick={() => setModel(tier.name)}><span className="tier-radio" /><span className="tier-icon"><Image src={tier.icon} alt="" width={25} height={25} /></span><strong>{tier.name}</strong><small>{tier.desc}</small><span className="tier-burn">{tier.burn} <span>$SBOX</span></span></button>)}</div><p className="form-help"><CircleHelp size={14} /> Model tiers are illustrative in this preview.</p></PageCard>
      <PageCard className="form-panel"><div className="form-step"><span>02</span><div><h2>Tell Boxi what to build</h2><p>Make it clear. Make it interesting.</p></div></div><label htmlFor="task-prompt" className="field-label">YOUR TASK PROMPT</label><textarea id="task-prompt" value={prompt} onChange={(event) => { setPrompt(event.target.value); setError(""); }} placeholder="What should the agent ship? Describe the idea, desired output, and anything it should keep in mind..." rows={7} maxLength={1500} /><div className="textarea-foot"><span>{error ? <span className="field-error">{error}</span> : "Your prompt will be visible on the demo session page."}</span><span>{prompt.length} / 1500</span></div></PageCard><button type="submit" className="button button-primary spawn-submit"><Flame size={19} /> Spawn sandbox <ArrowUpRight size={19} /></button><p className="submit-disclaimer"><ShieldCheck size={15} /> Demo only. No $SBOX is burned and no agent job runs.</p></form>
      <aside className="spawn-aside"><PageCard className="receipt-card"><p className="eyebrow">YOUR SPAWN RECEIPT</p><div className="receipt-image"><Image src="/brand/boxi-spawn.png" alt="Boxi starting a sandbox in a server bay" fill sizes="(max-width: 950px) 50vw, 320px" /></div><div className="receipt-line"><span>Model tier</span><strong>{model}</strong></div><div className="receipt-line"><span>Session priority</span><strong>Standard queue</strong></div><div className="receipt-line"><span>Estimated burn</span><strong>{selected.burn} $SBOX</strong></div><div className="receipt-total"><span>Total in demo</span><strong>0 $SBOX</strong></div><p>Real burn and wallet verification come after the token and chain flow are connected.</p></PageCard><div className="tip-card"><span><Sparkles size={20} /></span><div><strong>A better prompt ships better work.</strong><p>Include the goal, format, and what “done” looks like.</p></div><ArrowRight size={17} /></div></aside></div><TinyFooter />
  </AppShell>;
}
