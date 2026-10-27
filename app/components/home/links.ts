/**
 * Prefix for public/ assets (images) referenced by literal path. Static
 * `<Image unoptimized>` src strings bypass Next's basePath rewriting, so it
 * has to be applied manually when deploying under a non-root basePath.
 */
export const BASE_PATH = process.env.NEXT_BASE_PATH ?? "";

/**
 * Formspree endpoint for the hero enquiry form. Create a free form at
 * https://formspree.io, then replace YOUR_FORM_ID below with the ID it gives
 * you — that is the only change needed to make submissions arrive for real.
 */
export const FORM_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID";

/** Single source of truth for outbound destinations. */
export const LINKS = {
  sps: "https://sps.seedlingschools.com",
  smhs: "https://smhs.seedlingschools.com",
  cambridge: "https://cambridge.seedlingschools.com",
  /** SMIA shares the Cambridge site but has its own campus page. */
  smia: "https://cambridge.seedlingschools.com/smia",
  alumni: "https://seedlingschools.com/alumni.php",
  about: "https://seedlingschools.com/about-us.php",
  group: "https://seedlingschools.com",
} as const;

/** Props every outbound link needs. */
export const external = {
  target: "_blank",
  rel: "noopener noreferrer",
} as const;
