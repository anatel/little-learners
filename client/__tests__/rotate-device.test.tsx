import { expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import RotateDevice from "../app/components/RotateDevice";
import RootLayout from "../app/layout";

// next/font only works inside the Next.js build, so fake it here.
vi.mock("next/font/google", () => ({
  Fredoka: () => ({ variable: "font-fredoka" }),
}));

test("the rotate screen is a labelled image with no text to read", () => {
  render(<RotateDevice />);
  const el = screen.getByRole("img", { name: "סובבו את המכשיר" });
  expect(el.textContent).toBe("");
});

test("the root layout renders the rotate screen next to the page", () => {
  // <html> can't be rendered inside a test container, so inspect the
  // element tree returned by the layout instead.
  const tree = RootLayout({ children: <main>page</main> } as never);
  const body = (tree as React.ReactElement<{ children: React.ReactElement }>)
    .props.children as React.ReactElement<{ children: React.ReactElement[] }>;
  const types = body.props.children.map((c) => c.type);
  expect(types).toContain(RotateDevice);
});
