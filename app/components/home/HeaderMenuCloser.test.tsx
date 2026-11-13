import { expect, test } from "vitest";
import { fireEvent, render } from "@testing-library/react";
import HeaderMenuCloser from "./HeaderMenuCloser";

function setup() {
  const utils = render(
    <>
      <header data-site-header>
        <HeaderMenuCloser />
        <details open data-testid="menu">
          <summary>Menu</summary>
          <a href="#journey">The Journey</a>
          <span data-testid="inside">inside</span>
        </details>
      </header>
      <main data-testid="outside">page</main>
    </>,
  );
  return { ...utils, menu: utils.getByTestId("menu") as HTMLDetailsElement };
}

test("closes an open header menu on a click outside it", () => {
  const { menu, getByTestId } = setup();
  fireEvent.pointerDown(getByTestId("outside"));
  expect(menu.open).toBe(false);
});

test("stays open when clicking inside the menu", () => {
  const { menu, getByTestId } = setup();
  fireEvent.pointerDown(getByTestId("inside"));
  expect(menu.open).toBe(true);
});

test("closes on Escape and when a link in the menu is chosen", () => {
  const { menu, getByText } = setup();
  fireEvent.keyDown(document, { key: "Escape" });
  expect(menu.open).toBe(false);
  menu.open = true;
  fireEvent.click(getByText("The Journey"));
  expect(menu.open).toBe(false);
});
