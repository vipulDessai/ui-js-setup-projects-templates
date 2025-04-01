import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./vitest.setup.ts",
    coverage: {
      provider: "istanbul", // Coverage provider, can also use 'nyc' or others.
      reporter: ["lcov", "text", "text", "json", "html"], // Coverage reporters (console, json file, HTML report)
      reportsDirectory: "./coverage", // Directory to output the coverage reports
      include: ["src/**/*.{ts,tsx,js,jsx}"], // Include files for coverage calculation
      exclude: ["src/**/*.d.ts", "src/setupTests.ts"], // Exclude files from coverage
    },
  },
});
