export type SessionStatus = "Queued" | "Running" | "Review" | "Shipped" | "Failed";
export type ModelTier = "Frontier" | "Standard" | "Economy";

export type Session = {
  id: string;
  title: string;
  prompt: string;
  status: SessionStatus;
  model: ModelTier;
  burn: number;
  createdAt: string;
  owner: string;
  artifact?: string;
};

export const seedSessions: Session[] = [
  { id: "SBOX-1042", title: "Build a Solana wallet activity tracker", prompt: "Create a simple wallet activity tracker with transaction summaries and a shareable report.", status: "Running", model: "Frontier", burn: 250, createdAt: "2026-09-23T15:42:00Z", owner: "7xKp...2aQm" },
  { id: "SBOX-1041", title: "Ship an open source token dashboard", prompt: "Build a clean token dashboard with price, holders, and recent activity.", status: "Review", model: "Standard", burn: 150, createdAt: "2026-09-23T14:18:00Z", owner: "9bVf...6nLt", artifact: "Preview and source package ready for community review" },
  { id: "SBOX-1040", title: "Research top Solana dev tools", prompt: "Compile a concise comparison of developer tooling on Solana.", status: "Queued", model: "Economy", burn: 75, createdAt: "2026-09-23T13:50:00Z", owner: "4dRw...1jPs" },
  { id: "SBOX-1039", title: "Generate a landing page for a mint", prompt: "Create a responsive mint landing page concept and source code.", status: "Shipped", model: "Standard", burn: 150, createdAt: "2026-09-22T19:10:00Z", owner: "2mAe...8tYk", artifact: "Landing page concept and source package shipped" },
  { id: "SBOX-1038", title: "Audit a DAO onboarding flow", prompt: "Review a DAO onboarding flow and suggest practical improvements.", status: "Shipped", model: "Frontier", burn: 250, createdAt: "2026-09-22T16:24:00Z", owner: "5qNo...3uXd", artifact: "Onboarding audit shipped" }
];

export const statusOrder: SessionStatus[] = ["Queued", "Running", "Review", "Shipped"];

export function statusProgress(status: SessionStatus) {
  return status === "Queued" ? 10 : status === "Running" ? 48 : status === "Review" ? 82 : status === "Shipped" ? 100 : 0;
}

export function shortDate(value: string) {
  return new Intl.DateTimeFormat("en", { month: "short", day: "numeric" }).format(new Date(value));
}
