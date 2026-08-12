import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import SchoolsShowcase from "./SchoolsShowcase";

test("renders a card linking to each school", () => {
  render(<SchoolsShowcase />);
  expect(
    screen.getByRole("link", { name: /^Seedling Public School —/ }),
  ).toHaveAttribute("href", "https://sps.seedlingschools.com");
  expect(
    screen.getByRole("link", { name: /^Seedling Modern High School —/ }),
  ).toHaveAttribute("href", "https://smhs.seedlingschools.com");
  expect(
    screen.getByRole("link", { name: /^Seedling International Academy —/ }),
  ).toHaveAttribute(
    "href",
    "https://seedling-international-academy.vercel.app",
  );
});

test("labels each school with its examination board", () => {
  render(<SchoolsShowcase />);
  expect(screen.getAllByText("CBSE")).toHaveLength(2);
  expect(screen.getByText("Cambridge")).toBeInTheDocument();
});

test("gives every card a campus photograph", () => {
  const { container } = render(<SchoolsShowcase />);
  expect(container.querySelectorAll("img")).toHaveLength(3);
});

test("outbound links carry noopener noreferrer", () => {
  render(<SchoolsShowcase />);
  for (const link of screen.getAllByRole("link")) {
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  }
});
