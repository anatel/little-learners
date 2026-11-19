import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { expect, test } from "vitest";
import manifest from "../app/manifest";

const publicDir = join(__dirname, "..", "public");

function pngSize(path: string) {
  const bytes = readFileSync(path);
  return {
    signature: bytes.subarray(0, 8).toString("hex"),
    width: bytes.readUInt32BE(16),
    height: bytes.readUInt32BE(20),
  };
}

test("manifest has the fields needed for a fullscreen landscape install", () => {
  const m = manifest();
  expect(m.name).toBe("למדנים קטנים");
  expect(m.display).toBe("fullscreen");
  expect(m.orientation).toBe("landscape");
  expect(m.start_url).toBe("/");
  expect(m.background_color).toBeTruthy();
  expect(m.theme_color).toBeTruthy();
});

test.each([192, 512])("manifest lists a maskable %ipx PNG icon that exists", (size) => {
  const icon = manifest().icons?.find(
    (i) => i.sizes === `${size}x${size}` && i.purpose === "maskable",
  );
  expect(icon).toBeDefined();
  expect(icon?.type).toBe("image/png");
  expect(icon?.purpose).toBe("maskable");

  const file = join(publicDir, icon!.src);
  expect(existsSync(file)).toBe(true);
  const { signature, width, height } = pngSize(file);
  expect(signature).toBe("89504e470d0a1a0a");
  expect(width).toBe(size);
  expect(height).toBe(size);
});

test("manifest has an 'any' icon of at least 144px, which Chrome requires to install", () => {
  const anyIcons = (manifest().icons ?? []).filter(
    (i) => i.purpose === "any" && parseInt(String(i.sizes), 10) >= 144,
  );
  expect(anyIcons.length).toBeGreaterThan(0);
});
