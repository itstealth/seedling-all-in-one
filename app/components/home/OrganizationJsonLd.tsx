import { findQrPage } from "@/lib/qr-pages";
import { SITE_ICON, SITE_NAME, SITE_URL } from "@/app/site-metadata";
import { LINKS } from "./links";

/**
 * schema.org EducationalOrganization for the group homepage.
 *
 * Deliberately limited to facts already published elsewhere in this app:
 * the four schools by name and URL, and the group admissions line and social
 * accounts from the group's QR landing entry. No foundingDate — the year is
 * still to be confirmed by the school.
 */
const group = findQrPage("seedlingschools");

export const ORGANIZATION_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: SITE_NAME,
  url: `${SITE_URL}/`,
  logo: SITE_ICON,
  ...(group?.phone && { telephone: group.phone }),
  sameAs: [group?.instagram, group?.facebook].filter(Boolean),
  subOrganization: [
    { "@type": "School", name: "Seedling Public School", url: `${LINKS.sps}/` },
    { "@type": "School", name: "Seedling Modern High School", url: `${LINKS.smhs}/` },
    { "@type": "School", name: "Seedling International Academy", url: LINKS.sia },
    { "@type": "School", name: "Seedling Modern International Academy", url: LINKS.smia },
  ],
};

export default function OrganizationJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(ORGANIZATION_JSON_LD).replace(/</g, "\\u003c"),
      }}
    />
  );
}
