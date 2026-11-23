import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import MobileActionBar from "./MobileActionBar";

test("has only Enquire Now, which jumps to the hero enquiry form", () => {
  render(<MobileActionBar />);
  const links = screen.getAllByRole("link");
  expect(links).toHaveLength(1);
  expect(screen.getByRole("link", { name: /^enquire now$/i })).toHaveAttribute("href", "#enquire");
  expect(screen.queryByRole("link", { name: /^call$/i })).toBeNull();
  expect(screen.queryByRole("link", { name: /^whatsapp$/i })).toBeNull();
});

test("is hidden from tablet width up", () => {
  render(<MobileActionBar />);
  expect(screen.getByRole("navigation", { name: /quick contact/i })).toHaveClass("md:hidden", "fixed");
});
