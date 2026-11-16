import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import Hero from "./Hero";

test("renders the school age range and campus structure", () => {
  render(<Hero />);
  expect(
    screen.getByRole("heading", {
      level: 1,
      name: /from nursery to class xii\s+and beyond/i,
    }),
  ).toBeInTheDocument();
  expect(screen.getByText(/four schools across two campuses/i)).toBeInTheDocument();
});
