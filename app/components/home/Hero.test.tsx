import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import Hero from "./Hero";

test("renders the headline and the founding year", () => {
  render(<Hero />);
  expect(
    screen.getByRole("heading", {
      level: 1,
      name: /the journey from nursery\s+to university/i,
    }),
  ).toBeInTheDocument();
  expect(screen.getByText(/established 1992/i)).toBeInTheDocument();
});
