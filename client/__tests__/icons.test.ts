import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { expect, test } from "vitest";

const appDir = join(__dirname, "..", "app");

// PNG files start with these 8 bytes, then the width and height as 32-bit
// numbers inside the first (IHDR) chunk.
function pngSize(path: string) {
  const bytes = readFileSync(path);
  const signature = bytes.subarray(0, 8).toString("hex");
  return {
    signature,
    width: bytes.readUInt32BE(16),
    height: bytes.readUInt32BE(20),
  };
}

test("the default Next.js favicon.ico is removed", () => {
  expect(existsSync(join(appDir, "favicon.ico"))).toBe(false);
});

test("the app has its own SVG icon for the browser tab", () => {
  const svg = readFileSync(join(appDir, "icon.svg"), "utf8");
  expect(svg).toContain("<svg");
  expect(svg).toContain("viewBox");
});

test("the apple-icon is a 180x180 PNG for home-screen shortcuts", () => {
  const { signature, width, height } = pngSize(join(appDir, "apple-icon.png"));
  expect(signature).toBe("89504e470d0a1a0a");
  expect(width).toBe(180);
  expect(height).toBe(180);
});
