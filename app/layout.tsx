import type { Metadata } from "next";
import { Fraunces, Karla, Tiro_Devanagari_Sanskrit } from "next/font/google";
import Script from "next/script";
import Reveal from "./components/Reveal";
import "./globals.css";

/**
 * Google Tag Manager. The legacy PHP pages carry this same container via
 * header.php, so the container ID must stay in sync with it — the whole
 * domain reports into one container.
 */
const GTM_ID = "GTM-MS6FKS3S";

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
      <head>
        <Script id="gtm" strategy="beforeInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script>
      </head>
      <body className="min-h-full flex flex-col">
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {children}
        <Reveal />
        
      </body>
    </html>
  );
}
