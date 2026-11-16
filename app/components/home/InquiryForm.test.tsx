import { expect, test } from "vitest";
import { render } from "@testing-library/react";
import InquiryForm from "./InquiryForm";

test("gives the admissions widget room for all fields and a reachable enquiry anchor", () => {
  const { container } = render(<InquiryForm />);
  expect(container.querySelector("#enquire .npf_wgts")).toHaveAttribute("data-height", "720px");
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
