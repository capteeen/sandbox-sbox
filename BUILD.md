# Sandbox ($SBOX) — Build Brief
Date: 2026-09-22 (WAT)
Inspiration: Tembo.io (cloud coding agents) → Solana meme with a clear loop

## One-liner
Burn or stake **$SBOX** to spin up a **cloud agent sandbox**. The agent does public work. Holders **approve**. Fees sink to SOL/USDT or burn.

## Core loop (lock this)
1. **Connect wallet** (Phantom / Solflare / Backpack)
2. **Spawn sandbox** — burn fixed $SBOX (or stake for queue priority)
3. **Agent runs** — isolated job with live status: Queued → Running → Review → Shipped
4. **Approve** — holders or multisig mark the artifact shipped (vote / tip / on-chain ack)
5. **Exits** — cash fees to SOL/USDT, or burn more $SBOX to mint/launch related coins

Do **not** rebuild Tembo enterprise SaaS. Thin real mechanic + Tembo-style dashboard UI.

---

## Product surfaces (v1)
| Screen | Purpose |
|--------|---------|
| Landing | Meme + one-liner + CTA Connect / Spawn |
| Dashboard | Points/balance of $SBOX, active sandboxes, queue |
| Spawn | Burn amount, pick “model/harness” (even if stubbed), task prompt |
| Session | Live log feed, Plan→Execute→Verify→Review→Ship stepper, artifacts |
| Approve | Community vote / tip / mark shipped |
| Cashout | Fee → SOL/USDT (stub OK in v1) |

Visual language: dark SaaS agent control plane (Tembo energy) + crypto CTAs. Reuse Credits Dribbble refs under `/workspace/credits-dribbble-refs/` and wallet logos under Desktop `solana-wallet-logos`.

---

## Token ($SBOX)
- Chain: **Solana**
- Launch: pump.fun (or similar) for meme velocity, or SPL mint if you want more control
- Ticker: **$SBOX**
- Name: **Sandbox**
- Utility (v1 narrative + light on-chain):
  - Burn-to-spawn (main mechanic)
  - Stake-for-priority (optional)
  - Fee share / buyback-burn from cashout (RSRV-style clarity)
- Do not over-promise real Claude Code fleets on day one

### Resources — Solana / launch
- Solana docs: https://solana.com/docs
- SPL Token: https://spl.solana.com/token
- pump.fun: https://pump.fun
- Solana wallet adapter (web): https://github.com/anza-xyz/wallet-adapter
- Solana web3.js / kit: https://github.com/solana-labs/solana-web3.js
- Metaplex token metadata (if needed): https://developers.metaplex.com/

### Wallet logos (already collected)
Desktop: `/Users/jafarliman/Desktop/solana-wallet-logos/`
Box: `/workspace/solana-wallet-logos/`

---

## Agent / “sandbox” backend (thin real → thicker later)

### Phase 0 — meme site
- Fake sessions with canned logs + status machine
- Burn UI can be simulated or real burn once mint exists

### Phase 1 — thin real
- API: `POST /sessions` { wallet, prompt, modelTier }
- Verify on-chain burn/transfer of $SBOX (or pay SOL for MVP)
- Worker runs **one** cheap job:
  - LLM API (OpenAI/Anthropic/xAI) with a fixed system prompt, OR
  - Cursor Cloud Agent / similar if available
- Store session transcript + artifact URL
- Public session page

### Phase 2 — social triggers
- Tweet/Discord mention → paid session
- Holder tips

### Phase 3 — real sandboxes (only if product sticks)
- Docker/Firecracker/E2B-style isolated VMs
- Preview URLs (Tembo Preview analogue)
- Multi-agent queue

### Resources — agents / compute
- Tembo reference (UX only): https://www.tembo.io / https://www.tembo.io/agents
- E2B (code sandboxes): https://e2b.dev
- Modal / Fly.io / Railway for workers
- OpenAI API, Anthropic API, xAI API (model picker narrative)
- MCP concept (optional later): https://modelcontextprotocol.io
- Cursor cloud agents (if using Cursor Origin for shipping the site itself)

### AI model logos (already collected)
Desktop: `/Users/jafarliman/Desktop/ai-model-logos/`
Box: `/workspace/ai-model-logos/`
Use on Spawn screen model dropdown.

---

## Tech stack (recommended v1)
| Layer | Choice |
|-------|--------|
| Frontend | Next.js + TypeScript + Tailwind (same as Credits) |
| Wallet | `@solana/wallet-adapter-react` |
| Hosting | Vercel |
| DB | Postgres (Supabase/Neon) — sessions, logs, wallets |
| Queue | Inngest / BullMQ / simple cron worker |
| Chain reads | Helius / Triton / public RPC |
| Repo | Cursor Origin (like Credits) or GitHub |

Credits reference already live: https://ai-credit-platform-nine.vercel.app  
Origin pattern: https://cursor.com/codebase/al-3/ai-credit-platform

---

## Brand & design assets needed
- [ ] Logo mark + wordmark (**Sandbox** / **$SBOX**) — charcoal + one accent (mint or electric lime)
- [ ] App icon
- [ ] Hero / OG image (“cloud box agents live in”)
- [ ] Favicon
- [ ] UI kit: queue cards, stepper, log terminal, model chips
- [ ] Token metadata image (pump.fun square logo)

### Resources — design
- Tembo UI patterns: queue cards, Plan→Ship stepper, model dropdown
- Dribbble-style refs already: `/workspace/credits-dribbble-refs/`
- Higgsfield (connected) for logo generation
- Existing Credits brand for palette cues: `/workspace/credits-brand/` (charcoal `#0B0F14` + mint `#7CFFB2`)

---

## Copy kit (starter)
- Headline: **Cloud boxes for agents.**
- Sub: Burn $SBOX. Spawn a sandbox. Approve the ship.
- CTA: **Spawn sandbox**
- Status labels: Queued / Running / Review / Shipped / Failed
- Footer meme: Nothing merges without the bag.

---

## On-chain / program needs (minimal v1)
Option A (fastest): pump.fun token + off-chain burn tracking via transfers to a burn/treasury address  
Option B: simple Anchor program — `spawn_session(burn_amount)` CPI burn + emit event  
Option C: stake vault for priority queue

Resources:
- Anchor: https://www.anchor-lang.com/
- Solana Playground: https://beta.solpg.io/
- Burn address patterns / token burn docs on SPL

---

## Ops & accounts checklist
- [ ] Solana wallet (treasury + burn destination)
- [ ] RPC key (Helius/QuickNode)
- [ ] Vercel project
- [ ] Domain (optional): sandbox.fun / getsbox / etc.
- [ ] LLM API key (server-side only; never in client)
- [ ] Discord/Twitter for triggers (phase 2)
- [ ] Multisig for “approve” gate (Squads) — https://squads.so/

---

## Legal / trust (lightweight, not advice)
- Clearly meme + experimental utility
- Don’t claim you run Tembo or partner with them
- Don’t store user API keys (Credits rule still applies if you add BYOK later)
- Disclose agent jobs may be queued / rate-limited

---

## Suggested build order
1. Lock copy + logo ($SBOX)
2. Landing + dashboard UI (mock sessions)
3. Mint / launch token
4. Wire wallet + burn-to-spawn
5. One real agent worker + session page
6. Approve + fee sink
7. Polish Tembo-like monitor UI

---

## Files in this folder
- `BUILD.md` — this brief
- (add) `COPY.md`, `SCREEN-MAP.md`, logo exports as you generate them
