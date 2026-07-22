import type { Metadata } from "next";
import { Fraunces, Karla, Tiro_Devanagari_Sanskrit } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["SOFT", "WONK"],
});

const karla = Karla({
  variable: "--font-karla",
  subsets: ["latin"],
});

const tiro = Tiro_Devanagari_Sanskrit({
  variable: "--font-tiro",
  subsets: ["devanagari", "latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Seedling Group of Schools — Nursery to University",
  description:
    "Since 1992, the Seedling Group has carried students from play group to university across CBSE and Cambridge campuses in Jaipur. 20,000+ students, 5,000+ alumni.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${karla.variable} ${tiro.variable} h-full`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
