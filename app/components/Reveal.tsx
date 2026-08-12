"use client";

import { useEffect } from "react";

/**
 * Reveals `[data-reveal]` elements as they enter the viewport.
 *
 * This is the page's only client component: it renders nothing and instead
 * watches the markup the server already sent, so every section stays a Server
 * Component. One observer covers the whole page.
 *
 * A scroll-linked timeline (`animation-timeline: view()`) was the obvious way
 * to do this without JavaScript, but its progress is tied to scroll position
 * rather than to time — scroll at any normal speed and the whole reveal is
 * over within a frame or two. A duration is the point here, so it is driven by
 * a transition instead, and each element animates on its own clock however
 * fast the page was scrolled.
 *
 * The hidden start state lives behind a `js-reveal` class set here at runtime,
 * so if this never executes the page simply renders fully visible.
 */
export default function Reveal() {
  useEffect(() => {
    const root = document.documentElement;

    if (typeof window.IntersectionObserver !== "function") return;

    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (reduced?.matches) return;

    const targets = document.querySelectorAll<HTMLElement>(
      "[data-reveal], [data-reveal-group]",
    );
    if (targets.length === 0) return;

    root.classList.add("js-reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-visible");
          // Reveal once; re-animating on every pass is noise, not polish.
          observer.unobserve(entry.target);
        }
      },
      // Start a little before the element is fully on screen, so the motion
      // reads as the element arriving rather than as a late correction.
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 },
    );

    for (const target of targets) observer.observe(target);

    return () => observer.disconnect();
  }, []);

  return null;
}
