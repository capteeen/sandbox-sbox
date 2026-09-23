import type { Metadata } from "next";
import { DemoProvider } from "@/components/demo-store";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sandbox — Cloud boxes for agents",
  description: "Burn $SBOX. Spawn a sandbox. Approve the ship. An experimental demo of community steered agent work."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><DemoProvider>{children}</DemoProvider></body></html>;
}
