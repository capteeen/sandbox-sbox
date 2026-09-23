import type { Metadata } from "next";
import { SpawnScreen } from "@/components/screens/spawn";

export const metadata: Metadata = {
  title: "Spawn",
};

export default function Page() {
  return <SpawnScreen />;
}
