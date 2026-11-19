import { expect, test } from "vitest";
import { devOrigins } from "../dev-origins";

test("allows the host given in DEV_HOST", () => {
  expect(devOrigins({ DEV_HOST: "192.168.1.140" })).toEqual(["192.168.1.140"]);
});

test("allows nothing extra when DEV_HOST is unset or blank", () => {
  expect(devOrigins({})).toEqual([]);
  expect(devOrigins({ DEV_HOST: "  " })).toEqual([]);
});
