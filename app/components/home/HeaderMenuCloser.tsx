"use client";

import { useEffect } from "react";

/**
 * The header menus are native <details> disclosures, so they open with no
 * JavaScript at all -- but a <details> only closes when its own summary is
 * clicked again. This adds the behaviour people expect on top: an open
 * header menu closes when you click or tap anywhere outside it, press
 * Escape, or pick a link inside it. Renders nothing; without JavaScript the
 * menus still open and close as before.
 */
export default function HeaderMenuCloser() {
  useEffect(() => {
    const openMenus = () =>
      Array.from(document.querySelectorAll<HTMLDetailsElement>("[data-site-header] details[open]"));

    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as Node | null;
      for (const menu of openMenus()) {
        if (!target || !menu.contains(target)) menu.open = false;
      }
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      const menus = openMenus();
      menus.forEach((menu) => (menu.open = false));
      // Return focus to the menu button so keyboard users don't lose their place.
      menus[0]?.querySelector("summary")?.focus();
    };

    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest?.("[data-site-header] details a");
      if (link) openMenus().forEach((menu) => (menu.open = false));
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("click", onClick);
    };
  }, []);

  return null;
}
