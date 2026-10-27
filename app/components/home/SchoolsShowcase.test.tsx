import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import SchoolsShowcase from "./SchoolsShowcase";

test("groups the two CBSE schools under one card", () => {
  render(<SchoolsShowcase />);
  expect(
    screen.getByRole("link", { name: "Seedling Public School" }),
  ).toHaveAttribute("href", "https://sps.seedlingschools.com");
  expect(
    screen.getByRole("link", { name: "Seedling Modern High School" }),
  ).toHaveAttribute("href", "https://smhs.seedlingschools.com");
});

test("groups the two Cambridge schools under one card", () => {
  render(<SchoolsShowcase />);
  expect(
    screen.getByRole("link", { name: "Seedling International Academy" }),
  ).toHaveAttribute(
    "href",
    "https://cambridge.seedlingschools.com",
  );
  expect(
    screen.getByRole("link", {
      name: "Seedling Modern International Academy",
    }),
  ).toHaveAttribute(
    "href",
    "https://cambridge.seedlingschools.com",
  );
});

test("labels each card with its examination board", () => {
  render(<SchoolsShowcase />);
  expect(screen.getByText("CBSE")).toBeInTheDocument();
  expect(screen.getByText("Cambridge")).toBeInTheDocument();
});

test("gives every card a campus photograph", () => {
  const { container } = render(<SchoolsShowcase />);
  expect(container.querySelectorAll("img")).toHaveLength(2);
});

test("outbound links carry noopener noreferrer", () => {
  render(<SchoolsShowcase />);
  const outbound = screen.getAllByRole("link");
  expect(outbound).toHaveLength(4);
  for (const link of outbound) {
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  }
});
