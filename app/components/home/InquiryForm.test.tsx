import { expect, test } from "vitest";
import { render } from "@testing-library/react";
import InquiryForm from "./InquiryForm";

test("sizes the admissions widget to the form, without a large empty gap", () => {
  const { container } = render(<InquiryForm />);
  const widget = container.querySelector("#enquire .npf_wgts");
  expect(widget).toHaveAttribute("data-height", "710px");
  expect(widget?.className).toContain("[&_iframe]:h-[740px]");
  expect(widget?.className).toContain("sm:[&_iframe]:h-[710px]");
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
