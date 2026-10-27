import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import Footer from "./Footer";

test("renders links to each property and a copyright line", () => {
  render(<Footer />);
  expect(screen.getByRole("link", { name: /^sps\b/i })).toHaveAttribute(
    "href",
    "https://sps.seedlingschools.com",
  );
  expect(screen.getByRole("link", { name: /^smhs\b/i })).toHaveAttribute(
    "href",
    "https://smhs.seedlingschools.com",
  );
  expect(screen.getByRole("link", { name: /^sia\b/i })).toHaveAttribute(
    "href",
    "https://cambridge.seedlingschools.com",
  );
  // SMIA shares the Cambridge site but must reach its own campus page — both
  // pointing at the bare domain sent SMIA visitors to SIA.
  expect(screen.getByRole("link", { name: /^smia\b/i })).toHaveAttribute(
    "href",
    "https://cambridge.seedlingschools.com/smia",
  );
  expect(screen.getByRole("link", { name: /^alumni$/i })).toHaveAttribute(
    "href",
    "https://seedlingschools.com/alumni.php",
  );
  expect(screen.getByRole("link", { name: /^about us$/i })).toHaveAttribute(
    "href",
    "https://seedlingschools.com/about-us.php",
  );
  expect(screen.getByText(/all rights reserved/i)).toBeInTheDocument();
});

test("outbound links carry noopener noreferrer", () => {
  render(<Footer />);
  for (const link of screen.getAllByRole("link")) {
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  }
});
