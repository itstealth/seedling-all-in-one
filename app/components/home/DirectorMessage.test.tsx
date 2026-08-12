import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import DirectorMessage from "./DirectorMessage";

test("introduces Dr. Sandeep Bakshi with his designation and portrait", () => {
  render(<DirectorMessage />);
  expect(screen.getByText("Dr. Sandeep Bakshi")).toBeInTheDocument();
  expect(
    screen.getByText("CEO & Director, Seedling Group of Institutions"),
  ).toBeInTheDocument();
  expect(screen.getByAltText("Dr. Sandeep Bakshi")).toBeInTheDocument();
});

test("links to the full communique", () => {
  render(<DirectorMessage />);
  expect(
    screen.getByRole("link", { name: /read the full communiqu/i }),
  ).toHaveAttribute("href", "https://seedlingschools.com/about-us.php");
});
