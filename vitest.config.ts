import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "json-summary", "html", "lcov", "clover"],
      reportsDirectory: "./coverage",
      include: ["src/utils/**/*.ts"], //TODO: ci 테스트시 테스트 커버리지를 높이기 위해 추가함 - 세팅 완료 후 삭제
      exclude: ["**/*.test.ts", "**/*.spec.ts"] //TODO: ci 테스트시 테스트 커버리지를 높이기 위해 추가함 - 세팅 완료 후 삭제
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
