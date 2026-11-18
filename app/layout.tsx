import type { Metadata } from "next";
import { Fraunces, Karla, Tiro_Devanagari_Sanskrit } from "next/font/google";
import Script from "next/script";
import Reveal from "./components/Reveal";
import "./globals.css";
import LeadAttribution from '@/app/components/LeadAttribution';
import { SHARED_OPEN_GRAPH, OG_IMAGE, SITE_ICON, SITE_URL } from "./site-metadata";

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
  // Lets pages give relative URLs (og:image, canonicals) that resolve to
  // absolute ones. Canonicals themselves are set per page — see site-metadata.
  metadataBase: new URL(SITE_URL),
  title: "Seedling Group of Schools | Jaipur",
  description:
    "Explore four schools across two Jaipur campuses, with CBSE and Cambridge pathways from early years through Class XII.",
  icons: {
    icon: SITE_ICON,
  },
  // No url here: og:url belongs to each page, set alongside its canonical.
  // og:title and og:description fall back to the page's own title/description.
  openGraph: SHARED_OPEN_GRAPH,
  twitter: {
    card: "summary_large_image",
    title: "Seedling Group of Schools | Jaipur",
    description: "Explore four schools across two Jaipur campuses, with CBSE and Cambridge pathways from early years through Class XII.",
    images: [OG_IMAGE.url],
  },
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
        <script dangerouslySetInnerHTML={{ __html: `var npf_d='https://apply.seedlingschools.com';var npf_c='7260';var npf_m='1';var s=document.createElement("script");s.type="text/javascript";s.async=true;s.src="https://track.nopaperforms.com/js/track.js";document.body.appendChild(s);` }} />
        <LeadAttribution />
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
