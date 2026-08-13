import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import Nav from "./Nav";

test("the group switcher links to every school by name", () => {
  render(<Nav />);
  expect(
    screen.getByRole("link", { name: "Seedling Public School" }),
  ).toHaveAttribute("href", "https://sps.seedlingschools.com");
  expect(
    screen.getByRole("link", { name: "Seedling Modern High School" }),
  ).toHaveAttribute("href", "https://smhs.seedlingschools.com");
  expect(
    screen.getByRole("link", { name: "Seedling International Academy" }),
  ).toHaveAttribute(
    "href",
    "https://seedling-international-academy.vercel.app",
  );
  expect(
    screen.getByRole("link", {
      name: "Seedling Modern International Academy",
    }),
  ).toHaveAttribute(
    "href",
    "https://seedling-international-academy.vercel.app",
  );
});

test("the group switcher shows each school logo", () => {
  const { container } = render(<Nav />);
  const logos = Array.from(container.querySelectorAll("img")).map(
    (img) => img.getAttribute("src") ?? "",
  );
  expect(logos.some((src) => src.includes("sps-logo"))).toBe(true);
  expect(logos.some((src) => src.includes("smhs-logo"))).toBe(true);
  expect(logos.some((src) => src.includes("sia-logo-dark"))).toBe(true);
  expect(logos.some((src) => src.includes("smia-logo-dark"))).toBe(true);
});

test("links to the alumni page", () => {
  render(<Nav />);
  const alumni = screen.getAllByRole("link", { name: /^alumni$/i });
  expect(alumni.length).toBeGreaterThan(0);
  for (const link of alumni) {
    expect(link).toHaveAttribute(
      "href",
      "https://seedlingschools.com/alumni.php",
    );
  }
});

test("outbound links carry noopener noreferrer", () => {
  render(<Nav />);
  const outbound = screen
    .getAllByRole("link")
    .filter((link) => link.getAttribute("href")?.startsWith("http"));
  // Four school tabs, plus Alumni in both the desktop bar and the mobile menu.
  expect(outbound).toHaveLength(6);
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

  expect(href(/the journey/i)).toContain("#journey");
  expect(href(/our schools/i)).toContain("#schools");
  expect(href(/leadership/i)).toContain("#director");
  expect(
    screen.getByRole("link", { name: /choose a school/i }),
  ).toHaveAttribute("href", "#schools");
});

test("the menu is reachable without JavaScript", () => {
  const { container } = render(<Nav />);
  // A <details> disclosure, so the mobile menu opens with no client bundle.
  const menu = container.querySelector("details");
  expect(menu).not.toBeNull();
  expect(menu?.querySelector("summary")).toHaveAttribute("aria-label", "Menu");
});
