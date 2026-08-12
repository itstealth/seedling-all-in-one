import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import AlumniSpotlight from "./AlumniSpotlight";

test("renders the three named alumni and a link to the full alumni page", () => {
  render(<AlumniSpotlight />);
  expect(screen.getByText(/harshil mathur/i)).toBeInTheDocument();
  expect(screen.getByText(/abhishek tripathi/i)).toBeInTheDocument();
  expect(screen.getByText(/shashank jain/i)).toBeInTheDocument();
  expect(
    screen.getByRole("link", { name: /see more alumni/i }),
  ).toHaveAttribute("href", "https://seedlingschools.com/alumni.php");
});
