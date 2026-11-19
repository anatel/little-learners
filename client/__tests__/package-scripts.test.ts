import { readFileSync } from "node:fs";
import { join } from "node:path";
import { expect, test } from "vitest";

const root = join(__dirname, "..");

test("dev:https runs next dev over HTTPS with the certs from certs/", () => {
  const pkg = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
  const script: string = pkg.scripts["dev:https"];
  expect(script).toContain("next dev");
  expect(script).toContain("--experimental-https");
  expect(script).toContain("certs/cert.pem");
  expect(script).toContain("certs/key.pem");
});

test("certificate files are git-ignored", () => {
  const ignore = readFileSync(join(root, ".gitignore"), "utf8");
  expect(ignore).toMatch(/^\/certs\/$/m);
});
