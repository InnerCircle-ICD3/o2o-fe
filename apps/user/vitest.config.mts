import base from "../../vitest.config";
import { mergeConfig, defineConfig } from "vitest/config";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";

export default mergeConfig(
  base,
  defineConfig({
    plugins: [vanillaExtractPlugin()],
  }),
);
