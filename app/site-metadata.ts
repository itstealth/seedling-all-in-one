import type { Metadata } from "next";

/**
 * Shared SEO building blocks for the group site.
 *
 * Metadata merges shallowly: a page that sets its own `openGraph` replaces the
 * root layout's object wholesale, so pages spread SHARED_OPEN_GRAPH back in
 * rather than redefining the image, site name and locale.
 */
export const SITE_URL = "https://seedlingschools.com";
export const SITE_NAME = "Seedling Group of Schools";

/** The site icon the legacy PHP pages already use. */
export const SITE_ICON = "https://seedlingschools.com/assets/img/favicon.png";

/** 1200x630 crop of public/campus/about-banner.jpg, the hero photograph. */
export const OG_IMAGE = {
  url: "/og-group-campus.jpg",
  width: 1200,
  height: 630,
  alt: "Seedling students in red tartan pipe-band uniforms marching across the school sports ground",
};

export const SHARED_OPEN_GRAPH = {
  type: "website",
  siteName: SITE_NAME,
  locale: "en_IN",
  images: [OG_IMAGE],
} satisfies NonNullable<Metadata["openGraph"]>;

/**
 * Self-referencing canonical plus og:url for an indexable page.
 *
 * Set per page, never in the root layout: a layout canonical is inherited by
 * every route beneath it, and Next resolves a relative './' against
 * metadataBase rather than the current route.
 */
export function canonicalFor(path: string): Pick<Metadata, "alternates" | "openGraph"> {
  const url = new URL(path, SITE_URL).href;
  return {
    alternates: { canonical: url },
    openGraph: { ...SHARED_OPEN_GRAPH, url },
  };
}

/** For confirmation, receipt and error pages: reachable, but kept out of the index. */
export const NOINDEX: Metadata["robots"] = { index: false, follow: true };
