import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import MobileActionBar from "./MobileActionBar";

test("offers call, WhatsApp and a jump to the hero enquiry form", () => {
  render(<MobileActionBar />);
  expect(screen.getByRole("link", { name: /^call$/i })).toHaveAttribute("href", "tel:+917413012351");
  const wa = screen.getByRole("link", { name: /^whatsapp$/i });
  expect(wa.getAttribute("href")).toMatch(/^https:\/\/wa\.me\/917413012351\?text=/);
  expect(wa).toHaveAttribute("target", "_blank");
  expect(screen.getByRole("link", { name: /^enquire now$/i })).toHaveAttribute("href", "#enquire");
});

test("is hidden from tablet width up", () => {
  render(<MobileActionBar />);
  expect(screen.getByRole("navigation", { name: /quick contact/i })).toHaveClass("md:hidden", "fixed");
});
