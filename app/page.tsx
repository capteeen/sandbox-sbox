"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight, Box, Check, ChevronRight, CircleDot, Command, Layers3, Radio, Sparkles, TerminalSquare, Zap } from "lucide-react";
import { Brand, SessionRow, TinyFooter, WalletButton } from "@/components/ui";
import { useDemo } from "@/components/demo-store";
import { LandingSpawnConsole } from "@/components/landing-spawn-console";

export default function Home() {
  const { sessions } = useDemo();
  const live = sessions.filter((session) => session.status !== "Shipped").slice(0, 3);
  return <div className="landing">
    <div className="landing-grid" />
    <header className="landing-header wrap"><Brand /><nav aria-label="Main navigation"><a href="#how-it-works">How it works</a><a href="#spawn-console">Spawn console</a><a href="#live-queue">Live queue</a><Link href="/app">Dashboard <ArrowUpRight size={13} /></Link></nav><div className="landing-header-actions"><WalletButton small /><Link href="/spawn" className="header-launch">Launch app <ArrowUpRight size={16} /></Link></div></header>
    <main>
      <section className="hero wrap">
        <div className="hero-copy"><div className="hero-kicker"><span className="kicker-star">✳</span> THE INTERNET&apos;S AGENT WORKSHOP <span className="kicker-line" /></div><h1>Cloud boxes<br />for <em>agents.</em></h1><p className="hero-sub">Burn $SBOX. Spawn a sandbox. Watch it work.<br />The community decides what ships.</p><div className="hero-actions"><Link href="/spawn" className="button button-primary button-large">Spawn a sandbox <ArrowUpRight size={19} /></Link><Link href="/app" className="button button-ghost button-large">Explore the demo <ArrowRight size={18} /></Link></div><div className="hero-note"><span className="avatar-stack"><span>B</span><span>S</span><span>✳</span></span><p><strong>Open by design.</strong> Every session has a trail.</p></div></div>
        <div className="hero-visual"><div className="hero-visual-orbit orbit-one" /><div className="hero-visual-orbit orbit-two" /><div className="hero-image-frame"><Image src="/brand/boxi-hero.png" alt="Boxi, the Sandbox mascot, working in a glowing cloud server box" fill priority sizes="(max-width: 900px) 100vw, 620px" /><div className="image-vignette" /></div><div className="hero-float float-top"><span className="float-icon"><Radio size={16} /></span><div><small>BOXI IS ONLINE</small><strong>Ready to ship ideas</strong></div><span className="float-live" /></div><div className="hero-float float-bottom"><span className="terminal-prompt">&gt;_</span><div><small>SESSION SBOX-1042</small><strong>Building in public<span className="typing-cursor">_</span></strong></div><span className="float-arrow"><ArrowUpRight size={16} /></span></div></div>
      </section>
      <div className="hero-scroll wrap"><span>SCROLL TO EXPLORE</span><ArrowDown size={16} /><span className="hero-scroll-line" /><span>01 / 03</span></div>
      <section id="how-it-works" className="loop-section wrap">
        <div className="loop-intro"><p className="eyebrow"><span className="eyebrow-line" /> THE LOOP</p><h2>A little token.<br /><span>A lot of doing.</span></h2><p>From a spark to a shipped artifact. Every step stays visible, and the final say stays with the community.</p><Link href="/spawn" className="text-link">Start a session <ArrowUpRight size={17} /></Link></div>
        <div className="loop-steps">
          <div className="loop-step"><div className="loop-step-art"><Image src="/brand/boxi-spawn.png" alt="Boxi placing a glowing sandbox cube into a server" fill sizes="(max-width: 700px) 90vw, 300px" /><span className="step-number">01 / IGNITE</span><span className="loop-icon"><Zap size={17} /></span></div><div className="loop-step-copy"><h3>Burn to spawn</h3><p>Put $SBOX behind a prompt. Pick a model tier and give your idea a box to run in.</p><ChevronRight size={20} /></div></div>
          <div className="loop-step"><div className="loop-step-art"><Image src="/brand/boxi-running.png" alt="Boxi monitoring a sandbox session and its logs" fill sizes="(max-width: 700px) 90vw, 300px" /><span className="step-number">02 / WATCH</span><span className="loop-icon"><TerminalSquare size={17} /></span></div><div className="loop-step-copy"><h3>Follow the work</h3><p>See the queue, live progress, logs, and artifacts from one focused control room.</p><ChevronRight size={20} /></div></div>
          <div className="loop-step"><div className="loop-step-art"><Image src="/brand/boxi-approved.png" alt="Boxi celebrating a community approved artifact" fill sizes="(max-width: 700px) 90vw, 300px" /><span className="step-number">03 / DECIDE</span><span className="loop-icon"><Check size={17} /></span></div><div className="loop-step-copy"><h3>Approve the ship</h3><p>Holders review the result and decide when a finished sandbox can ship.</p><ArrowUpRight size={20} /></div></div>
        </div>
      </section>
      <LandingSpawnConsole />
      <section id="live-queue" className="queue-section"><div className="wrap"><div className="queue-heading"><div><p className="eyebrow"><span className="pulse-dot" /> WORK HAPPENING NOW</p><h2>In the queue<span>.</span></h2></div><Link href="/app" className="button button-outline">Open control room <ArrowUpRight size={17} /></Link></div><div className="queue-preview"><div className="queue-preview-top"><span><CircleDot size={15} /> COMMUNITY SESSIONS</span><span>DEMO DATA <span className="preview-divider">/</span> UPDATED LOCALLY</span></div>{live.map((session) => <SessionRow key={session.id} session={session} />)}<div className="queue-preview-bottom"><span><Sparkles size={15} /> Boxi keeps the lights on.</span><span>Nothing ships without the bag. <ArrowUpRight size={15} /></span></div></div></div></section>
      <section className="final-cta wrap"><div className="cta-emblem"><Layers3 size={35} /><span>✳</span></div><div><p className="eyebrow">YOUR IDEA, IN MOTION</p><h2>Give it a box.<br /><em>See what ships.</em></h2></div><Link href="/spawn" className="button button-primary button-large">Spawn sandbox <ArrowUpRight size={19} /></Link></section>
    </main>
    <footer className="landing-footer wrap"><Brand /><span>Burn. Spawn. Approve.</span><span>Experimental demo. No tokens are burned here.</span></footer>
  </div>;
}
