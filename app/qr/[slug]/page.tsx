import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { QR_PAGES, findQrPage } from "@/lib/qr-pages";

/** Slugs are a permanent contract with already-printed QR codes. */
export function generateStaticParams() {
  return QR_PAGES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = findQrPage(slug);
  if (!page) return { title: "Not found" };
  return {
    title: `${page.name} — Quick Links`,
    description: `Website, admissions and contact links for ${page.name}.`,
    // A scan target, not a search result — keep it out of the index so it
    // can't outrank the school's own site.
    robots: { index: false, follow: true },
  };
}

export default async function QrLandingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = findQrPage(slug);
  if (!page) notFound();

  return (
    <main className="min-h-screen bg-indigo-950 px-5 py-10 flex flex-col items-center justify-center">
      <div className="w-full max-w-sm">
        <div className="rounded-2xl bg-marigold-500 px-6 py-8 text-center shadow-xl">
          {page.logo ? (
            <Image
              src={page.logo}
              alt={page.name}
              width={260}
              height={90}
              className="mx-auto h-auto w-auto max-h-20 object-contain"
              priority
            />
          ) : (
            <p className="font-display text-2xl leading-tight text-white">
              {page.name}
            </p>
          )}

          {page.logo && (
            <p className="mt-4 font-display text-lg leading-tight text-white">
              {page.name}
            </p>
          )}
          {page.tagline && (
            <p className="mt-1 text-xs text-white/80">{page.tagline}</p>
          )}

          <div className="mt-6 flex flex-col gap-2.5">
            {page.links.map((link) => (
              <a
                key={link.href + link.label}
                href={link.href}
                className={
                  link.variant === "outline"
                    ? "block rounded-lg border-2 border-white/70 px-4 py-2.5 text-[13px] font-semibold uppercase tracking-wide text-white transition-colors hover:bg-white hover:text-marigold-500"
                    : "block rounded-lg bg-indigo-950 px-4 py-3 text-[13px] font-bold uppercase tracking-wide text-white transition-colors hover:bg-white hover:text-indigo-950"
                }
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-center gap-3">
            {page.whatsapp && (
              <IconLink
                href={`https://api.whatsapp.com/send/?phone=${page.whatsapp}`}
                label="WhatsApp"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.693.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              </IconLink>
            )}
            {page.phone && (
              <IconLink href={`tel:${page.phone}`} label="Call">
                <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.05-.24c1.12.37 2.33.57 3.54.57a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.21.2 2.42.57 3.54a1 1 0 01-.24 1.05l-2.21 2.2z" />
              </IconLink>
            )}
            {page.email && (
              <IconLink href={`mailto:${page.email}`} label="Email">
                <path d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
              </IconLink>
            )}
            {page.instagram && (
              <IconLink href={page.instagram} label="Instagram">
                <path d="M12 2.2c3.2 0 3.6 0 4.9.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.86s0 3.6-.07 4.86c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.86.07s-3.6 0-4.86-.07c-1.17-.05-1.8-.25-2.23-.41a3.8 3.8 0 01-1.38-.9 3.8 3.8 0 01-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.2 15.6 2.2 15.2 2.2 12s0-3.6.07-4.86c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.4 2.2 8.8 2.2 12 2.2zm0 3.24a6.56 6.56 0 100 13.12 6.56 6.56 0 000-13.12zm0 10.82a4.26 4.26 0 110-8.52 4.26 4.26 0 010 8.52zm8.35-11.08a1.53 1.53 0 11-3.06 0 1.53 1.53 0 013.06 0z" />
              </IconLink>
            )}
            {page.facebook && (
              <IconLink href={page.facebook} label="Facebook">
                <path d="M22 12a10 10 0 10-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.45 2.89h-2.33v6.99A10 10 0 0022 12z" />
              </IconLink>
            )}
          </div>
        </div>

        <p className="mt-5 text-center text-[11px] text-paper-200/60">
          Seedling Group of Schools, Jaipur
        </p>
      </div>
    </main>
  );
}

function IconLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      aria-label={label}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="flex size-9 items-center justify-center rounded-full border-2 border-white/70 text-white transition-colors hover:bg-white hover:text-marigold-500"
    >
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-4" aria-hidden="true">
        {children}
      </svg>
    </a>
  );
}
