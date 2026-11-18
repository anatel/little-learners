import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    // Understand the "@/..." import alias defined in tsconfig.json.
    tsconfigPaths: true,
  },
  test: {
    // jsdom is a fake browser DOM running inside Node, so components
    // can "render" in tests without opening a real browser.
    environment: "jsdom",
  },
});
