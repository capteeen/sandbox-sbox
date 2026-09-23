# Sandbox ($SBOX)

Cloud boxes for agents. Burn $SBOX, spawn a sandbox, watch the work, and approve the ship.

This repository now contains a **visual product demo** built with Next.js App Router, TypeScript, and CSS. All sessions, wallet connections, burns, approvals, logs, and balances are simulated in the browser. There is no blockchain transaction or live agent worker.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Run `npm run build` for a production build and `npm run lint` for the TypeScript check.

## Routes

| Route | Preview |
| --- | --- |
| `/` | Landing page, Boxi hero, product loop, interactive spawn console, demo queue |
| `/app` | Dashboard with sample balance and sessions |
| `/spawn` | Model tier and prompt form that creates a local demo session |
| `/session/[id]` | Status pipeline, replay logs, artifact, demo approval |
| `/approve` | Local approval board |
| `/cashout` | Planned fee routing preview |

Demo state is saved to browser `localStorage`. The Connect wallet dialog only selects a named local demo wallet. Use the session page’s “Advance demo” button to move a session from Queued to Running to Review, then approve it.

## Brand

- Background `#0B0F14`; mint `#7CFFB2`; ice `#7EC8FF`
- Boxi is the friendly otter-raccoon in the cloud box. `public/brand/` now includes the hero plus spawn, running, and approved illustrations. They use the supplied `brand/boxi/boxi-sample-01.png` as the character reference.
- Product copy and behavior are based on `BUILD.md`, `SCREEN-MAP.md`, `COPY.md`, and `brand/`.

Visual research and implementation choices are recorded in [DESIGN-REFERENCES.md](./DESIGN-REFERENCES.md).

## Next build steps

1. Connect a real Solana wallet adapter and mint configuration.
2. Verify burns server side before creating paid sessions.
3. Add persisted sessions, a worker, real logs, and artifacts.
4. Add an authenticated community approval and fee routing flow.

The original project brief remains in [BUILD.md](./BUILD.md).
