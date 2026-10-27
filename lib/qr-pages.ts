/**
 * Landing pages for the printed QR codes.
 *
 * These are reached by scanning codes already printed on banners, flyers and
 * visiting cards, so the URLs they answer on (`/qr-sps.php` and friends) can
 * never change — IIS rewrites those legacy paths onto the routes here. Treat
 * the slugs as a permanent public contract, not an implementation detail.
 *
 * The originals pointed at the PHP site's school pages and its old admission
 * form. Those destinations are being retired, so every link below targets the
 * new sites instead.
 */

export interface QrLink {
  label: string;
  href: string;
  /** `solid` is the primary action; `outline` is secondary. */
  variant?: "solid" | "outline";
}

export interface QrPage {
  slug: string;
  /** Name shown under the logo. */
  name: string;
  tagline?: string;
  /** Logo in the group app's public/logos, or null to use a text wordmark. */
  logo: string | null;
  links: QrLink[];
  whatsapp?: string;
  phone?: string;
  email?: string;
  instagram?: string;
  facebook?: string;
}

/** Group-level accounts, used where a campus has none of its own. */
const GROUP_INSTAGRAM = "https://www.instagram.com/seedlingschoolsjaipur/";
const GROUP_FACEBOOK = "https://www.facebook.com/seedlingschoolsjaipur";

export const QR_PAGES: readonly QrPage[] = [
  {
    slug: "sps",
    name: "Seedling Public School",
    tagline: "CBSE · Jawahar Nagar, Jaipur",
    logo: "/logos/sps-logo.png",
    links: [
      { label: "Visit our website", href: "https://sps.seedlingschools.com", variant: "solid" },
      { label: "Apply & pay online", href: "https://sps.seedlingschools.com/admissions/apply", variant: "solid" },
      { label: "Admissions", href: "https://sps.seedlingschools.com/admissions", variant: "outline" },
    ],
    whatsapp: "917413012351",
    phone: "+917413012351",
    email: "seedlingacademy@hotmail.com",
    instagram: GROUP_INSTAGRAM,
    facebook: GROUP_FACEBOOK,
  },
  {
    slug: "smhs",
    name: "Seedling Modern High School",
    tagline: "CBSE · Durgapura, Jaipur",
    logo: "/logos/smhs-logo.webp",
    links: [
      { label: "Visit our website", href: "https://smhs.seedlingschools.com", variant: "solid" },
      { label: "Apply & pay online", href: "https://smhs.seedlingschools.com/admissions/apply", variant: "solid" },
      { label: "Admissions", href: "https://smhs.seedlingschools.com/admissions", variant: "outline" },
    ],
    whatsapp: "917413012352",
    phone: "+919587772837",
    email: "infosmhs@seedlingschools.com",
    instagram: "https://www.instagram.com/smhsjaipur/",
    facebook: "https://www.facebook.com/SMHSJaipur",
  },
  {
    slug: "sia",
    name: "Seedling International Academy",
    tagline: "Cambridge · Jawahar Nagar, Jaipur",
    logo: "/logos/sia-logo.png",
    links: [
      { label: "Visit our website", href: "https://cambridge.seedlingschools.com", variant: "solid" },
      { label: "Apply & pay online", href: "https://cambridge.seedlingschools.com/admissions/apply", variant: "solid" },
      { label: "Admissions", href: "https://cambridge.seedlingschools.com/admissions", variant: "outline" },
    ],
    whatsapp: "917413012351",
    phone: "+917413012351",
    email: "seedlingacademy@hotmail.com",
    instagram: "https://www.instagram.com/seedlinginternational/",
    facebook: "https://www.facebook.com/seedlinginternationalacademy",
  },
  {
    slug: "smia",
    name: "Seedling Modern International Academy",
    tagline: "Cambridge · Durgapura, Jaipur",
    logo: "/logos/smia-logo.png",
    links: [
      { label: "Visit our website", href: "https://cambridge.seedlingschools.com/smia", variant: "solid" },
      // The Cambridge site's own form is fixed to SIA, so SMIA applicants go to
      // the group form with their campus preselected — otherwise they'd be
      // charged against the wrong school.
      { label: "Apply & pay online", href: "https://seedlingschools.com/admissions/apply?school=smia", variant: "solid" },
      { label: "Admissions", href: "https://cambridge.seedlingschools.com/admissions", variant: "outline" },
    ],
    whatsapp: "917413012352",
    phone: "+919587772837",
    email: "infosmhs@seedlingschools.com",
    instagram: "https://www.instagram.com/smiajaipur/",
    facebook: "https://www.facebook.com/SMIAJaipur",
  },
  {
    slug: "swkl",
    name: "Seedling Wonderland Kids League",
    tagline: "Early years · Jawahar Nagar & Durgapura",
    // No standalone site yet, so the group homepage is the honest destination —
    // it links on to every campus. Repoint once SWKL has its own section.
    logo: null,
    links: [
      { label: "Visit our website", href: "https://seedlingschools.com", variant: "solid" },
      // Two campuses, so no preselection — the parent picks theirs on the form.
      { label: "Apply & pay online", href: "https://seedlingschools.com/admissions/apply", variant: "solid" },
    ],
    whatsapp: "917413012351",
    phone: "+917413012351",
    email: "seedlingacademy@hotmail.com",
    instagram: GROUP_INSTAGRAM,
    facebook: GROUP_FACEBOOK,
  },
  {
    slug: "seedlingschools",
    name: "Seedling Group of Schools",
    tagline: "Nursery to university · Jaipur, since 1992",
    logo: null,
    links: [
      { label: "Visit our website", href: "https://seedlingschools.com", variant: "solid" },
      { label: "Apply & pay online", href: "https://seedlingschools.com/admissions/apply", variant: "solid" },
      { label: "Seedling Public School", href: "/qr/sps", variant: "outline" },
      { label: "Seedling Modern High School", href: "/qr/smhs", variant: "outline" },
      { label: "Seedling International Academy", href: "/qr/sia", variant: "outline" },
      { label: "Seedling Modern International Academy", href: "/qr/smia", variant: "outline" },
      { label: "Wonderland Kids League", href: "/qr/swkl", variant: "outline" },
    ],
    whatsapp: "917413012351",
    phone: "+917413012351",
    email: "seedlingacademy@hotmail.com",
    instagram: GROUP_INSTAGRAM,
    facebook: GROUP_FACEBOOK,
  },
] as const;

export function findQrPage(slug: string | undefined): QrPage | undefined {
  if (!slug) return undefined;
  return QR_PAGES.find((p) => p.slug === slug);
}
