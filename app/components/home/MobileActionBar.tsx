import { findQrPage } from "@/lib/qr-pages";

/**
 * Phone-only action bar pinned to the bottom of the homepage: Call, WhatsApp,
 * and Enquire Now (which scrolls to the admissions form in the hero).
 *
 * Numbers come from the group's QR landing page entry, so the homepage and the
 * printed QR codes always point at the same admissions line. Change them there.
 *
 * Rendered only by the homepage: this app also serves the admission, receipt
 * and payment pages under each school's own domain, where a seedlingschools.com
 * call bar would be wrong.
 */
const group = findQrPage("seedlingschools");
const PHONE = group?.phone ?? "+917413012351";
const WHATSAPP = group?.whatsapp ?? "917413012351";
const WHATSAPP_TEXT = "Hi, I'd like to know about admissions at Seedling Schools.";

/** Height of the bar, reserved under the footer so it never hides content. */
export const MOBILE_BAR_SPACER = "h-[calc(4rem+env(safe-area-inset-bottom))]";

// Three equal thirds, split by thin vertical dividers.
const item =
  "flex min-w-0 flex-col items-center justify-center gap-0.5 text-[0.7rem] font-semibold tracking-wide";

export default function MobileActionBar() {
  return (
    <nav
      aria-label="Quick contact"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-indigo-900/10 bg-paper-50/95 pb-[env(safe-area-inset-bottom)] shadow-[0_-6px_20px_rgba(1,57,117,0.12)] backdrop-blur md:hidden"
    >
      <div className="grid h-16 grid-cols-3 divide-x divide-indigo-900/15 py-2.5">
        <a
          href={`tel:${PHONE}`}
          data-gtm="mobile-bar-call"
          className={`${item} text-indigo-800 active:bg-indigo-800/10`}
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
          Call
        </a>
        <a
          href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(WHATSAPP_TEXT)}`}
          target="_blank"
          rel="noopener noreferrer"
          data-gtm="mobile-bar-whatsapp"
          className={`${item} text-[#128C7E] active:bg-[#25D366]/10`}
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
            <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.23 8.23 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.83 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23zm4.52-6.16c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.15.17-.25.25-.42.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48a.92.92 0 0 0-.66.31c-.23.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.24 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.28z" />
          </svg>
          WhatsApp
        </a>
        <a
          href="#enquire"
          data-gtm="mobile-bar-enquire"
          className={`${item} text-marigold-500 active:bg-marigold-500/10`}
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 20h9" />
            <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
          </svg>
          Enquire Now
        </a>
      </div>
    </nav>
  );
}
