import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Isolate generated route types when building a release beside the active build.
  typescript: { tsconfigPath: process.env.NEXT_TSCONFIG_PATH || "tsconfig.json" },
  // Keep release builds from exhausting the shared Windows host.
  experimental: { cpus: 1 },
  // Lets a build target a scratch dir (NEXT_BUILD_DIR=.next-new) so the running
  // app keeps serving the current build until the new one is swapped in.
  distDir: process.env.NEXT_BUILD_DIR || ".next",
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

  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.seedlingschools.com" }],
        destination: "https://seedlingschools.com/:path*",
        statusCode: 301,
      },
      { source: "/about-us.php", destination: "https://seedlingschools.com/schools", statusCode: 301 },
      { source: "/swkl.php", destination: "https://seedlingschools.com/wonderland", statusCode: 301 },
      { source: "/media.php", destination: "https://smhs.seedlingschools.com/news-and-events", statusCode: 301 },
      { source: "/admission.php", destination: "https://seedlingschools.com/admissions", statusCode: 301 },
      { source: "/admission-online.php", destination: "https://seedlingschools.com/admissions/apply", statusCode: 301 },
      { source: "/admission-procedure.php", destination: "https://seedlingschools.com/admissions", statusCode: 301 },
      { source: "/career.php", destination: "https://seedlingschools.com/career", statusCode: 301 },
      { source: "/alumni.php", destination: "https://smhs.seedlingschools.com/alumni", statusCode: 301 },
      { source: "/erp-login.php", destination: "https://sps.seedlingschools.com/erp-login", statusCode: 301 },
      {
        source: "/sia.php/swkl.php",
        destination: "https://seedlingschools.com",
        statusCode: 301,
      },
    ];
  },
};

export default nextConfig;
