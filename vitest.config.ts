import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    coverage: {
      provider: "v8",
      reporter: ["text", "json-summary", "html", "lcov"],
      reportsDirectory: "./coverage",
      include: ["src/**/*.{ts,tsx}"],
      exclude: [
        "**/*.d.ts",
        "**/*.test.ts",
        "**/*.test.tsx",
        "src/mocks/**",
        "src/test/**",
        "**/__test__/**",
        "src/providers/**",
        "src/apis/**",
        "src/hooks/api/**",
        "src/app/(bottomNav)/layout.tsx",
        "src/app/layout.tsx",
        "src/app/page.tsx",
        "src/app/not-found.tsx",
        "src/app/api/**",
      ],
    },
  },
});
