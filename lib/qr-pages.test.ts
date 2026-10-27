import { describe, expect, it } from "vitest";
import { QR_PAGES, findQrPage } from "./qr-pages";

/**
 * These slugs are printed on physical material. A rename silently breaks every
 * card and banner already in circulation, so the set is pinned here.
 */
const PRINTED_SLUGS = ["sps", "smhs", "sia", "smia", "swkl", "seedlingschools"];

describe("QR landing pages", () => {
  it("keeps a page for every printed QR code", () => {
    for (const slug of PRINTED_SLUGS) {
      expect(findQrPage(slug), `missing page for /qr-${slug}.php`).toBeDefined();
    }
  });

  it("has no duplicate slugs", () => {
    const slugs = QR_PAGES.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("never links back to the retired PHP site", () => {
    for (const page of QR_PAGES) {
      for (const link of page.links) {
        expect(link.href, `${page.slug} -> ${link.href}`).not.toMatch(/\.php/);
        expect(link.href, `${page.slug} -> ${link.href}`).not.toMatch(/\/legacy\//);
      }
    }
  });

  it("carries only Instagram and Facebook, per the group's social policy", () => {
    for (const page of QR_PAGES) {
      const socials = [page.instagram, page.facebook].filter(Boolean).join(" ");
      expect(socials).not.toMatch(/twitter\.com|x\.com|linkedin\.com|youtube\.com/);
    }
  });

  it("gives every page a way to reach the school", () => {
    for (const page of QR_PAGES) {
      expect(page.links.length).toBeGreaterThan(0);
      const hasContact = page.whatsapp || page.phone || page.email;
      expect(hasContact, `${page.slug} has no contact route`).toBeTruthy();
    }
  });

  it("sends SMIA applicants to their own campus, not SIA's form", () => {
    // Cambridge's own form is hardcoded to sia-cambridge, so an unqualified
    // link would charge SMIA applicants against the wrong school.
    const apply = findQrPage("smia")!.links.find((l) => l.label.includes("Apply"))!;
    expect(apply.href).toContain("school=smia");
  });

  it("does not preselect a campus for Wonderland, which has two", () => {
    const apply = findQrPage("swkl")!.links.find((l) => l.label.includes("Apply"))!;
    expect(apply.href).not.toContain("school=");
  });

  it("links the group hub to every school page", () => {
    const hub = findQrPage("seedlingschools")!;
    for (const slug of ["sps", "smhs", "sia", "smia", "swkl"]) {
      expect(hub.links.some((l) => l.href === `/qr/${slug}`)).toBe(true);
    }
  });

  it("returns undefined for an unknown slug", () => {
    expect(findQrPage("nope")).toBeUndefined();
    expect(findQrPage(undefined)).toBeUndefined();
  });
});
