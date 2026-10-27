import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import Admissions from "./Admissions";

test("routes to every school that takes admissions", () => {
  render(<Admissions />);
  expect(
    screen.getByRole("link", { name: /seedling public school/i }),
  ).toHaveAttribute("href", "https://sps.seedlingschools.com");
  expect(
    screen.getByRole("link", { name: /seedling modern high school/i }),
  ).toHaveAttribute("href", "https://smhs.seedlingschools.com");
  expect(
    screen.getByRole("link", { name: /seedling international academy/i }),
  ).toHaveAttribute(
    "href",
    "https://cambridge.seedlingschools.com",
  );
});

test("offers the group office as a fallback", () => {
  render(<Admissions />);
  expect(
    screen.getByRole("link", { name: /talk to the group office/i }),
  ).toHaveAttribute("href", "https://seedlingschools.com");
});

test("outbound links carry noopener noreferrer", () => {
  render(<Admissions />);
  const outbound = screen
    .getAllByRole("link")
    .filter((link) => link.getAttribute("href")?.startsWith("http"));
  expect(outbound).toHaveLength(4);
  for (const link of outbound) {
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  }
});

test("the nav can anchor to it", () => {
  const { container } = render(<Admissions />);
  expect(container.querySelector("#admissions")).not.toBeNull();
});
