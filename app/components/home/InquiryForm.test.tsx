import { afterEach, expect, test, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import InquiryForm from "./InquiryForm";

afterEach(() => {
  vi.unstubAllGlobals();
});

function fillRequiredFields() {
  fireEvent.change(screen.getByLabelText(/full name/i), {
    target: { value: "Aarav Sharma" },
  });
  fireEvent.change(screen.getByLabelText(/parent's name/i), {
    target: { value: "Rohit Sharma" },
  });
  fireEvent.change(screen.getByLabelText(/mobile number/i), {
    target: { value: "9876543210" },
  });
  fireEvent.change(screen.getByLabelText(/school/i), {
    target: { value: "Seedling Public School — CBSE" },
  });
  fireEvent.change(screen.getByLabelText(/grade applying for/i), {
    target: { value: "Class I" },
  });
  fireEvent.change(screen.getByLabelText(/gender/i), {
    target: { value: "Male" },
  });
}

test("renders every requested field, each required except the message", () => {
  render(<InquiryForm />);
  for (const name of [
    /full name/i,
    /parent's name/i,
    /mobile number/i,
    /school/i,
    /grade applying for/i,
    /gender/i,
  ]) {
    expect(screen.getByLabelText(name)).toBeRequired();
  }
  expect(screen.getByLabelText(/message/i)).not.toBeRequired();
});

test("hides the honeypot field from real visitors", () => {
  const { container } = render(<InquiryForm />);
  const honeypot = container.querySelector('input[name="_gotcha"]');
  expect(honeypot).not.toBeNull();
  expect(honeypot).toHaveAttribute("aria-hidden", "true");
  expect(honeypot).toHaveAttribute("tabindex", "-1");
});

test("posts the filled form to the configured endpoint and shows a thank-you", async () => {
  const fetchMock = vi.fn().mockResolvedValue({ ok: true });
  vi.stubGlobal("fetch", fetchMock);

  render(<InquiryForm />);
  fillRequiredFields();
  fireEvent.click(screen.getByRole("button", { name: /request a callback/i }));

  await waitFor(() =>
    expect(
      screen.getByText(/we.ve got your enquiry/i),
    ).toBeInTheDocument(),
  );

  expect(fetchMock).toHaveBeenCalledTimes(1);
  const [url, options] = fetchMock.mock.calls[0];
  expect(url).toBe("https://formspree.io/f/YOUR_FORM_ID");
  expect(options.method).toBe("POST");
  expect(options.headers).toEqual({ Accept: "application/json" });
  expect(options.body).toBeInstanceOf(FormData);
  expect(options.body.get("Full Name")).toBe("Aarav Sharma");
});

test("shows an inline error and keeps the form when the request fails", async () => {
  vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false }));

  render(<InquiryForm />);
  fillRequiredFields();
  fireEvent.click(screen.getByRole("button", { name: /request a callback/i }));

  await waitFor(() => expect(screen.getByRole("alert")).toBeInTheDocument());
  expect(
    screen.getByRole("button", { name: /request a callback/i }),
  ).toBeInTheDocument();
});
