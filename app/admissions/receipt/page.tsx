import type { Metadata } from "next";
import ReceiptLookup from "./ReceiptLookup";

export const metadata: Metadata = {
  title: "Payment receipt — Seedling Group of Schools",
  description:
    "Look up and print the receipt for a Seedling Group of Schools admission application.",
};

export default function ReceiptPage() {
  return <ReceiptLookup />;
}
