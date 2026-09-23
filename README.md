# Sandbox ($SBOX)

Burn $SBOX. Spawn a sandbox. Approve the ship.

Cloud boxes for agents. Connect a wallet, burn $SBOX to spawn a sandbox, watch the session move through the queue, approve the artifact, and cash fees out to a SOL or USDT stub.

## Run locally

```bash
npm i && npm run dev
```

## Product loop

1. **Connect** a wallet — Phantom, Solflare, or Backpack. If no extension is installed, Connect opens a stub wallet so the loop still runs.
2. **Spawn** a sandbox — burn a fixed $SBOX amount for a Frontier, Standard, or Economy tier. Stake to skip the queue.
3. **Run** — the session moves Queued → Running → Review, with a live log.
4. **Approve** — mark the artifact shipped.
5. **Cash out** — session fees to a SOL or USDT stub. Nothing hits the chain.

This version is mock data only. No real chain, no agent fleet, and no user API keys.

## Brand tokens

| Token | Value |
| --- | --- |
| Background | `#0B0F14` |
| Surfaces | `#121820` / `#1A2330` |
| Mint | `#7CFFB2` |
| Ice | `#7EC8FF` |
| Warning | `#FFC857` |
| Danger | `#FF6B6B` |
| Text | `#E8EEF5` / muted `#8B9BB0` |

## Routes

| Route | What |
| --- | --- |
| `/` | Landing, Boxi, and the queue preview |
| `/app` | $SBOX balance, active queue, shipped work |
| `/spawn` | Burn amount, tier, prompt |
| `/session/[id]` | Plan → Ship stepper, logs, artifacts |
| `/approve` | Sessions waiting on review |
| `/cashout` | Fee → SOL/USDT stub |

Status labels: Queued · Running · Review · Shipped · Failed.

Prep notes live in `BUILD.md`, `COPY.md`, `SCREEN-MAP.md`, `brand/`, and `ui-refs/`.
