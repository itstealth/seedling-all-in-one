import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import Nav from "./Nav";

test("the Our Schools menu links to every school by name", () => {
  render(<Nav />);
  const href = (name: string) =>
    screen.getAllByRole("link", { name: "Visit " + name })[0].getAttribute("href");
  expect(href("Seedling Public School")).toBe("https://sps.seedlingschools.com");
  expect(href("Seedling Modern High School")).toBe("https://smhs.seedlingschools.com");
  expect(href("Seedling International Academy")).toBe(
    "https://cambridge.seedlingschools.com/campuses/sia",
  );
  expect(href("Seedling Modern International Academy")).toBe(
    "https://cambridge.seedlingschools.com/campuses/smia",
  );
});

test("the header has no school logo bar", () => {
  const { container } = render(<Nav />);
  expect(container.querySelectorAll("img")).toHaveLength(0);
});

test("phones get an Our Schools button; desktop keeps the old row and Choose a school", () => {
  const { container } = render(<Nav />);
  const menus = Array.from(container.querySelectorAll("summary")).filter(
    (summary) => summary.textContent?.trim() === "Our Schools",
  );
  // One in the desktop link row, one as the phone header button.
  expect(menus).toHaveLength(2);
  expect(menus.some((m) => m.parentElement?.className.includes("lg:hidden"))).toBe(true);
  const choose = screen.getByRole("link", { name: /choose a school/i });
  expect(choose).toHaveAttribute("href", "/#schools");
  expect(choose.className).toContain("hidden");
  expect(choose.className).toContain("lg:inline-block");
  const hamburger = container.querySelector("summary[aria-label=\"Menu\"]")?.parentElement;
  expect(hamburger?.textContent).not.toContain("Our Schools");
});

test("links to the alumni page", () => {
  render(<Nav />);
  const alumni = screen.getAllByRole("link", { name: /^smhs alumni$/i });
  expect(alumni.length).toBeGreaterThan(0);
  for (const link of alumni) {
    expect(link).toHaveAttribute(
      "href",
      "https://smhs.seedlingschools.com/alumni",
    );
  }
});

test("outbound links carry noopener noreferrer", () => {
  render(<Nav />);
  const outbound = screen
    .getAllByRole("link")
    .filter((link) => link.getAttribute("href")?.startsWith("http"));
  // Four schools in each Our Schools menu (desktop row, phone button), plus
  // Alumni in both the desktop bar and the mobile menu.
  expect(outbound).toHaveLength(10);
  for (const link of outbound) {
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  }
});

test("links to each on-page section", () => {
  render(<Nav />);
  const href = (name: RegExp) =>
    screen
      .getAllByRole("link", { name })
      .map((link) => link.getAttribute("href"));

  expect(href(/the journey/i)).toContain("/#journey");
  expect(href(/our schools/i)).toContain("/#schools");
  expect(href(/leadership/i)).toContain("/#director");
});

test("the menu is reachable without JavaScript", () => {
  const { container } = render(<Nav />);
  // A <details> disclosure, so the mobile menu opens with no client bundle.
  const menu = container.querySelector("summary[aria-label=\"Menu\"]")?.parentElement;
  expect(menu).not.toBeNull();
  expect(menu?.querySelector("summary")).toHaveAttribute("aria-label", "Menu");
});
