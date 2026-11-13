import type { Metadata } from "next";
import ReceiptLookup from "./ReceiptLookup";
import { NOINDEX } from "@/app/site-metadata";

export const metadata: Metadata = {
  title: "Payment receipt — Seedling Group of Schools",
  description:
    "Look up and print the receipt for a Seedling Group of Schools admission application.",
  robots: NOINDEX,
};

export default function ReceiptPage() {
  return <ReceiptLookup />;
}
