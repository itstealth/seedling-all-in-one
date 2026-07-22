/** Single source of truth for outbound destinations. */
export const LINKS = {
  sps: "https://sps.seedlingschools.com",
  smhs: "https://smhs.seedlingschools.com",
  cambridge: "https://seedling-international-academy.vercel.app",
  alumni: "https://seedlingschools.com/alumni.php",
  about: "https://seedlingschools.com/about-us.php",
  group: "https://seedlingschools.com",
} as const;

/** Props every outbound link needs. */
export const external = {
  target: "_blank",
  rel: "noopener noreferrer",
} as const;
