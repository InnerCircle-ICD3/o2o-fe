import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import "@vanilla-extract/css/disableRuntimeStyles";

export default defineConfig({
  plugins: [tsconfigPaths(), react(), vanillaExtractPlugin()],
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
  },
});
