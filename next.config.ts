import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Served by a Node process behind IIS ARR (port 3003), matching how
  // sps/smhs/cambridge already run on this server.
  //
  // The admissions form is reverse-proxied under each school's own domain, and
  // those sites route `/_next/*` to their OWN Next app (ports 3000-3002). A
  // distinct asset prefix keeps this app's chunks from colliding with theirs —
  // without it the form renders completely unstyled on the school domains.
  // Kept as a path rather than an absolute URL so assets stay same-origin and
  // the self-hosted next/font files need no CORS headers.
  assetPrefix: "/_grp",

  // `sharp` isn't installed on the Windows Server 2016 host, so image
  // optimization stays off; the public/ images are pre-sized.
  images: { unoptimized: true },
};

export default nextConfig;
