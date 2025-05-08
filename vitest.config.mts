import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import "@vanilla-extract/css/disableRuntimeStyles";
import { resolve } from "node:path";

export default defineConfig({
  plugins: [tsconfigPaths(), react(), vanillaExtractPlugin()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/test/setup.ts"],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "json-summary", "html", "lcov", "clover"],
      reportsDirectory: "./coverage",
      include: ["src/utils/**/*.ts"], // TODO: 테스트를 위해 임시로 추가한 코드
      exclude: ["**/*.test.ts", "**/*.spec.ts"] // TODO: 테스트를 위해 임시로 추가한 코드
    },
    include: ["**/*.{test,spec}.{ts,tsx}"],
    exclude: ["**/node_modules/**", "**/dist/**", "**/.next/**"],
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
});
