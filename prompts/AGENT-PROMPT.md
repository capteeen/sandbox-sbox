# Agent prompt — Sandbox ($SBOX) v1 scaffold

Repo: https://github.com/capteeen/sandbox-sbox

Copy everything below the line into your AI coding agent (Cursor cloud agent / Composer / Claude Code). Attach or clone this repo first so it can read `brand/`, `ui-refs/`, and `prompts/`.

---

## Goal
Build **Sandbox ($SBOX)** as a Next.js app: a Solana meme product where users burn/stake **$SBOX** to spawn cloud agent sandboxes, watch sessions (**Queued → Running → Review → Shipped**), and approve ships. Brand pet **Boxi** is the face of every empty state and the landing hero.

**One-liner:** Burn $SBOX. Spawn a sandbox. Approve the ship.  
**Tagline:** Cloud boxes for agents.

## Product loop (lock this)
1. Connect wallet (Phantom / Solflare / Backpack — stub OK in v1)
2. Spawn sandbox — burn fixed $SBOX (or stake for queue priority; mock burn OK)
3. Agent runs — live status machine + log terminal
4. Approve — mark artifact shipped (vote/tip stub OK)
5. Cashout — fees → SOL/USDT stub

Do **not** rebuild Tembo enterprise SaaS. Thin meme mechanic + Tembo-style dashboard UI + LoanMeme-style sticky pet face.

## Source of truth in this repo
Read these before coding and follow them:
- `brand/BRAND.md` — name, colors, voice, logo system
- `brand/PET.md` — Boxi character rules + poses
- `brand/boxi/` — Boxi sample art (put in `public/brand/`)
- `COPY.md` — landing / spawn / session copy
- `SCREEN-MAP.md` — screens
- `BUILD.md` — full brief + phases
- `ui-refs/` + `ui-refs/STYLE-TAKEAWAYS.md` — visual density and layout cues
- `prompts/BUILD-PROMPT.md` — short version of this ask

## Stack
- Next.js App Router + TypeScript + Tailwind CSS
- Dark theme tokens:
  - Background `#0B0F14`
  - Surfaces `#121820` / `#1A2330`
  - Accent mint `#7CFFB2` (primary CTA)
  - Ice `#7EC8FF` (sessions / links)
  - Warning `#FFC857` · Danger `#FF6B6B`
  - Text `#E8EEF5` / muted `#8B9BB0`
- Typography: Inter / Geist / Satoshi-like; mono for logs and session IDs
- Mock data for v1 (no real chain or real agent fleet required)
- `@solana/wallet-adapter-react` stub on Connect (buttons can be non-functional beyond connect UI)
- Deployable on Vercel

## Screens that must ship
| Route | Purpose |
|-------|---------|
| `/` | Landing — Boxi hero, tagline, CTAs Spawn + Connect, microcopy “Nothing ships without the bag.” |
| `/app` | Dashboard — mock $SBOX balance, active/queued sandboxes, recent shipped |
| `/spawn` | Burn amount, model tier chips (Frontier / Standard / Economy), task prompt, confirm |
| `/session/[id]` | Stepper Plan→Execute→Verify→Review→Ship, log terminal, artifacts panel, Approve CTA |
| `/approve` | Board of sessions awaiting review |
| `/cashout` | Stub fee → SOL/USDT |

Status labels everywhere: **Queued · Running · Review · Shipped · Failed**

## UX / visual direction
- Tembo energy: agent queue cards, session monitor, stepper
- LoanMeme energy: one sticky pet (Boxi) on landing, empty states, loading, shipped celebration
- Crypto dashboard density without clutter — study `ui-refs/` especially dark portfolio, wallet, mint SaaS, mascot landing, AI session monitor shots
- Soft outside, serious inside: pet is chill; the queue is busy

## Brand voice
Short sentences. Ship / queue / approve / spawn.  
Avoid: “revolutionary AI infrastructure,” Tembo clone claims, fake TVL, partnership claims.  
Do: status labels, burn amounts, session IDs.

## Boxi usage
- Landing hero companion (use `brand/boxi/boxi-sample-01.png` or `-02.png`)
- Favicon / app icon crop of face
- Session empty: “Boxi is waiting for the first log line…”
- Idle / running / shipped poses if you generate more later (rules in PET.md)

## Non-goals (v1)
- Real Tembo / Claude Code fleet
- Real lending protocol
- Storing user API keys
- Claiming partnership with Tembo or LoanMeme
- Copying Melo/Yeti art

## Implementation notes
- Prefer App Router file structure with a shared dark shell (nav: Sandbox wordmark + $SBOX chip + Connect)
- Central mock store (e.g. `lib/mock-sessions.ts`) with 4–6 fake sessions covering all statuses
- Spawn creates a new mock session and routes to `/session/[id]`
- Approve updates status to Shipped with a mint sparkle / Boxi celebration moment
- Mobile-friendly
- Include `README.md` with: one-liner, local run (`npm i && npm run dev`), brand tokens, link back to this prep docs

## Done when
1. `npm run build` succeeds
2. All 6 routes render with mock data
3. Boxi appears on landing + at least one empty state
4. Visual system matches charcoal + mint (not a light template)
5. README documents run instructions and the product loop

## Optional stretch (only if time)
- Subtle idle animation / status LED on Boxi collar
- Pump.fun-style token chip UI (no real mint)
- OG image route using Boxi + tagline

Start by reading BRAND.md, PET.md, STYLE-TAKEAWAYS.md, then scaffold the app and land the six routes.
