import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import SchoolsShowcase from "./SchoolsShowcase";

test("links each CBSE school to its own card", () => {
  render(<SchoolsShowcase />);
  expect(
    screen.getByRole("link", { name: /seedling public school/i }),
  ).toHaveAttribute("href", "https://sps.seedlingschools.com");
  expect(
    screen.getByRole("link", { name: /seedling modern high school/i }),
  ).toHaveAttribute("href", "https://smhs.seedlingschools.com");
});

test("links each Cambridge school to its own card", () => {
  render(<SchoolsShowcase />);
  expect(
    screen.getByRole("link", { name: /seedling international academy/i }),
  ).toHaveAttribute(
    "href",
    "https://seedling-international-academy.vercel.app",
  );
  expect(
    screen.getByRole("link", {
      name: /seedling modern international academy/i,
    }),
  ).toHaveAttribute(
    "href",
    "https://seedling-international-academy.vercel.app",
  );
});

test("labels each card with its examination board", () => {
  render(<SchoolsShowcase />);
  expect(screen.getAllByText("CBSE")).toHaveLength(2);
  expect(screen.getAllByText("Cambridge")).toHaveLength(2);
});

test("gives every school its own campus photograph", () => {
  const { container } = render(<SchoolsShowcase />);
  expect(container.querySelectorAll("img")).toHaveLength(4);
});

test("outbound links carry noopener noreferrer", () => {
  render(<SchoolsShowcase />);
  const outbound = screen
    .getAllByRole("link")
    .filter((link) => link.getAttribute("href")?.startsWith("http"));
  expect(outbound).toHaveLength(4);
  for (const link of outbound) {
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  }
});

test("links to the full schools page", () => {
  render(<SchoolsShowcase />);
  expect(
    screen.getByRole("link", { name: /view all schools/i }),
  ).toHaveAttribute("href", "/schools");
});
