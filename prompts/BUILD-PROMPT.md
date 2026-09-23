# Cloud-agent build prompt — Sandbox ($SBOX)

Paste this into a Cursor cloud agent (Origin `new_repo` or existing repo) when ready to scaffold.

---

## Goal
Build **Sandbox ($SBOX)** — a Solana meme product site + app shell where users burn/stake $SBOX to spawn cloud agent sandboxes, watch sessions (Queued → Running → Review → Shipped), and approve ships. Cute brand pet **Boxi** is the face of the product.

## One-liner
Burn $SBOX. Spawn a sandbox. Approve the ship.

## Stack
- Next.js App Router + TypeScript + Tailwind
- Dark theme: bg `#0B0F14`, accent mint `#7CFFB2`, ice `#7EC8FF`
- Mock data OK for v1 (no real chain/agent required in first slice)
- Solana wallet adapter stub on Connect (Phantom/Solflare buttons with logos if assets provided)
- Deployable on Vercel

## Screens (must ship)
1. `/` Landing — hero with Boxi, tagline, CTA Spawn / Connect
2. `/app` Dashboard — $SBOX balance mock, active/queued sandboxes, recent shipped
3. `/spawn` — burn amount, model tier chips, task prompt, confirm
4. `/session/[id]` — stepper Plan→Execute→Verify→Review→Ship, log terminal, artifacts, Approve
5. `/approve` — board of sessions awaiting review
6. `/cashout` — stub fee → SOL/USDT

## UX references
Follow STYLE-TAKEAWAYS.md and ui-refs/ screenshots in the project pack:
- Tembo-like agent queue + session monitor
- LoanMeme-like mascot presence (pet on empty states / hero)
- Crypto dashboard density without clutter

## Brand
- Name: Sandbox / $SBOX
- Pet: Boxi (otter-raccoon in mint hoodie) — use placeholder SVG/PNG in `public/brand/` if final art not attached
- Voice: short, status-y, no enterprise fluff

## Non-goals (v1)
- Real Tembo/Claude Code fleet
- Real lending
- Storing user API keys
- Claiming partnership with Tembo or LoanMeme

## Done when
- `npm run build` succeeds
- All 6 routes render with mock data
- Mobile-friendly dark UI
- README with run instructions and brand one-liner

## Attached context
Use any uploaded BRAND.md, PET.md, SCREEN-MAP.md, ui-refs, and Boxi images as source of truth.
