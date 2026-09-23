import type { Metadata } from "next";
import { CashoutScreen } from "@/components/screens/cashout";

export const metadata: Metadata = {
  title: "Cash out",
};

export default function Page() {
  return <CashoutScreen />;
}
