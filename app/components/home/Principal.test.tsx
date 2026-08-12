import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import Principal from "./Principal";

test("names Dr. Preeti Bakshi with her portrait", () => {
  render(<Principal />);
  expect(
    screen.getByRole("heading", { name: "Dr. Preeti Bakshi" }),
  ).toBeInTheDocument();
  expect(screen.getByAltText("Dr. Preeti Bakshi")).toBeInTheDocument();
});

test("uses the designation the group publishes, not a principalship", () => {
  render(<Principal />);
  expect(
    screen.getByText("Executive Director, Seedling Group of Institutions"),
  ).toBeInTheDocument();
  // The statutory principals are Shruti Kukar (SPS) and Nidhi Adha (SMHS)
  // per each school's CBSE mandatory disclosure — never claim the post here.
  expect(screen.queryByText(/^Principal$/)).not.toBeInTheDocument();
});

test("lists both CBSE schools she directs", () => {
  const { container } = render(<Principal />);
  const schools = Array.from(container.querySelectorAll("dt")).map(
    (dt) => dt.textContent,
  );
  expect(schools).toEqual([
    "Seedling Public School",
    "Seedling Modern High School",
  ]);
});
