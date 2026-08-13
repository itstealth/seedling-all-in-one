import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import Journey from "./Journey";

test("renders every stage of the journey in order", () => {
  render(<Journey />);
  const stages = screen.getAllByRole("heading", { level: 3 });
  expect(stages.map((heading) => heading.textContent)).toEqual([
    "Seedling Wonderland Kids League",
    "Seedling Public School",
    "Seedling Modern High School",
    "Seedling International Academy",
    "Seedling Modern International Academy",
    "University, and what follows",
  ]);
});

test("presents the stages as an ordered list", () => {
  render(<Journey />);
  expect(screen.getByRole("list")).toBeInTheDocument();
  expect(screen.getAllByRole("listitem")).toHaveLength(6);
});
