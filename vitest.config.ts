/// <reference types="vitest" />
import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  resolve: {
    alias: {
      "@actions": path.resolve(__dirname, "./src/middleware/actions"),
      "@common": path.resolve(__dirname, "./src/components/common"),
      "@auth": path.resolve(__dirname, "./src/auth"),
      "@interfaces": path.resolve(__dirname, "./src/interfaces"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@enums": path.resolve(__dirname, "./src/interfaces/enum"),

      "@AmountActionTypes": path.resolve(
        __dirname,
        "./src/middleware/types/AmountActionTypes"
      ),
      "@BrandActionTypes": path.resolve(
        __dirname,
        "./src/middleware/types/BrandActionTypes"
      ),
      "@CartActionTypes": path.resolve(
        __dirname,
        "./src/middleware/types/CartActionTypes"
      ),
      "@ListActionTypes": path.resolve(
        __dirname,
        "./src/middleware/types/ListActionTypes"
      ),
      "@OrderActionTypes": path.resolve(
        __dirname,
        "./src/middleware/types/OrderActionTypes"
      ),
      "@ProductActionTypes": path.resolve(
        __dirname,
        "./src/middleware/types/ProductActionTypes"
      ),
      "@SnackActionTypes": path.resolve(
        __dirname,
        "./src/middleware/types/SnackActionTypes"
      ),

      "@theme": path.resolve(__dirname, "./src/components/common/theme"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@values": path.resolve(__dirname, "./src/values"),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.ts",
    include: ["src/**/*.{test,spec}.{ts,tsx}"], // Ajusta el patrón según tus necesidades
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      reportsDirectory: "./coverage",
      exclude: [
        "node_modules/",
        "src/setupTests.ts",
        "**/*.d.ts",
        "**/*.test.{ts,tsx}",
        "**/*.spec.{ts,tsx}",
      ],
    },
  },
});
