import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "../app/page";

test("main page renders the title and the hero image", () => {
  render(<Home />);

  expect(
    screen.getByRole("heading", { level: 1, name: "למדנים קטנים" }),
  ).toBeDefined();
  expect(screen.getByRole("img", { name: "ינשוף" })).toBeDefined();
});
