import { afterEach, expect, test } from "vitest";
import { render } from "@testing-library/react";
import Reveal from "./Reveal";

const original = Reflect.get(window, "IntersectionObserver");

afterEach(() => {
  document.documentElement.className = "";
  document.body.innerHTML = "";
  Reflect.set(window, "IntersectionObserver", original);
});

function stubObserver() {
  const observed: Element[] = [];
  class Stub {
    constructor(private cb: IntersectionObserverCallback) {}
    observe(el: Element) {
      observed.push(el);
    }
    unobserve() {}
    disconnect() {}
    reveal(el: Element) {
      this.cb(
        [{ target: el, isIntersecting: true } as IntersectionObserverEntry],
        this as unknown as IntersectionObserver,
      );
    }
  }
  const instances: Stub[] = [];
  Reflect.set(
    window,
    "IntersectionObserver",
    class extends Stub {
      constructor(cb: IntersectionObserverCallback) {
        super(cb);
        instances.push(this);
      }
    },
  );
  return { observed, instances };
}

test("renders nothing into the page", () => {
  const { container } = render(<Reveal />);
  expect(container).toBeEmptyDOMElement();
});

test("arms the hidden start state only once it is running", () => {
  stubObserver();
  document.body.innerHTML = '<div data-reveal id="a"></div>';
  render(<Reveal />);
  expect(document.documentElement.classList.contains("js-reveal")).toBe(true);
});

test("marks a target visible when it enters view", () => {
  const { observed, instances } = stubObserver();
  document.body.innerHTML = '<div data-reveal id="a"></div>';
  render(<Reveal />);

  const target = observed[0];
  expect(target.classList.contains("is-visible")).toBe(false);
  instances[0].reveal(target);
  expect(target.classList.contains("is-visible")).toBe(true);
});

test("leaves the page untouched when motion is not wanted", () => {
  stubObserver();
  // jsdom ships no matchMedia, so define one that reports reduced motion.
  Object.defineProperty(window, "matchMedia", {
    configurable: true,
    writable: true,
    value: () => ({ matches: true }) as MediaQueryList,
  });
  document.body.innerHTML = '<div data-reveal id="a"></div>';

  render(<Reveal />);

  // No js-reveal means the hidden start state never applies, so every element
  // stays visible rather than waiting on an observer that will not run.
  expect(document.documentElement.classList.contains("js-reveal")).toBe(false);

  Reflect.deleteProperty(window, "matchMedia");
});

test("does nothing when the browser cannot observe intersections", () => {
  Reflect.set(window, "IntersectionObserver", undefined);
  document.body.innerHTML = '<div data-reveal id="a"></div>';

  render(<Reveal />);

  expect(document.documentElement.classList.contains("js-reveal")).toBe(false);
});
