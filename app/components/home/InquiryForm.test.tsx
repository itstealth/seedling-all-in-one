import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import InquiryForm from "./InquiryForm";

test("sizes the admissions widget to the form, without a large empty gap", () => {
  const { container } = render(<InquiryForm />);
  const widget = container.querySelector("#enquire .npf_wgts");
  expect(widget).toHaveAttribute("data-height", "700px");
  expect(widget?.className).toContain("[&_iframe]:h-[715px]");
  expect(widget?.className).toContain("min-[375px]:[&_iframe]:h-[700px]");
});

test("shows the form at 88% on desktop, with the box cut to the scaled height", () => {
  const { container } = render(<InquiryForm />);
  const classes = container.querySelector("#enquire .npf_wgts")?.className ?? "";
  expect(classes).toContain("lg:[&_iframe]:scale-[0.88]");
  expect(classes).toContain("lg:[&_iframe]:w-[113.64%]");
  expect(classes).toContain("lg:h-[599px]");
});

test("loads the enquiry provider only once when the form remounts", () => {
  document.querySelectorAll('script[data-npf-loader="true"]').forEach(script => script.remove());
  const first = render(<InquiryForm />);
  first.unmount();
  render(<InquiryForm />);
  const scripts = document.querySelectorAll('script[data-npf-loader="true"]');
  expect(scripts).toHaveLength(1);
  expect(scripts[0]).toHaveAttribute("src", "https://ke9zpvp4xn.in4.widgets.nopaperforms.com/vemwgts.js");
});

test("the form is headed Talk to our advisor", () => {
  render(<InquiryForm />);
  expect(screen.getByText("Talk to our advisor")).toBeInTheDocument();
});
