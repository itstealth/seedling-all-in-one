import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
        permanent: true,
      },
      { source: "/about-us.php", destination: "https://seedlingschools.com/schools", permanent: true },
      { source: "/swkl.php", destination: "https://seedlingschools.com/wonderland", permanent: true },
      { source: "/media.php", destination: "https://smhs.seedlingschools.com/news-and-events", permanent: true },
      { source: "/admission.php", destination: "https://seedlingschools.com/admissions", permanent: true },
      { source: "/admission-online.php", destination: "https://seedlingschools.com/admissions/apply", permanent: true },
      { source: "/admission-procedure.php", destination: "https://seedlingschools.com/admissions", permanent: true },
      { source: "/career.php", destination: "https://seedlingschools.com/career", permanent: true },
      { source: "/alumni.php", destination: "https://smhs.seedlingschools.com/alumni", permanent: true },
      { source: "/erp-login.php", destination: "https://sps.seedlingschools.com/erp-login", permanent: true },
      {
        source: "/sia.php/swkl.php",
        destination: "https://seedlingschools.com",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
