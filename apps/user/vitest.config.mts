import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import { defineConfig, mergeConfig } from "vitest/config";
import base from "../../vitest.config";

export default mergeConfig(
  base,
  defineConfig({
    plugins: [vanillaExtractPlugin()],
    test: {
      coverage: {
        exclude: ["src/app/(not-used)/**", "src/lib/**"],
      },
    },
  }),
);
