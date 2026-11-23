/**
 * Phone-only bar pinned to the bottom of the homepage with a single
 * "Enquire Now" button that scrolls to the admissions form in the hero.
 * (Call and WhatsApp were removed on 23 Nov 2026 as requested;
 * the admissions number is still in the footer.)
 *
 * Rendered only by the homepage: this app also serves the admission, receipt
 * and payment pages under each school's own domain.
 */
/** Height of the bar, reserved under the footer so it never hides content. */
export const MOBILE_BAR_SPACER = "h-[calc(4rem+env(safe-area-inset-bottom))]";

export default function MobileActionBar() {
  return (
    <nav
      aria-label="Quick contact"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-indigo-900/10 bg-paper-50/95 pb-[env(safe-area-inset-bottom)] shadow-[0_-6px_20px_rgba(1,57,117,0.12)] backdrop-blur md:hidden"
    >
      <div className="flex h-16 items-center justify-center py-2.5">
        <a
          href="#enquire"
          data-gtm="mobile-bar-enquire"
          className="flex h-full w-full items-center justify-center gap-2 text-sm font-semibold tracking-wide text-marigold-500 active:bg-marigold-500/10"
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
