import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import GroupCta from "./GroupCta";

test("sends parents to the enquiry form, not back to this page", () => {
  render(<GroupCta />);
  const link = screen.getByRole("link", { name: /talk to the group office/i });
  expect(link).toHaveAttribute("href", "#enquire");
  // An in-page jump, so it must not open a new tab.
  expect(link).not.toHaveAttribute("target");
});
