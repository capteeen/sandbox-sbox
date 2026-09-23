import type { Metadata } from "next";
import { ApproveScreen } from "@/components/screens/approve";

export const metadata: Metadata = {
  title: "Approve",
};

export default function Page() {
  return <ApproveScreen />;
}
