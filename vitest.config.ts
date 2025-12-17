import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		// Test environment
		environment: "node",

		// Include patterns
		include: ["tests/**/*.test.ts", "tests/**/*.spec.ts"],

		// Exclude patterns
		exclude: ["node_modules", "dist", "build", "coverage"],

		// Coverage configuration
		coverage: {
			provider: "v8",
			reporter: ["text", "json", "html", "lcov"],
			exclude: [
				"node_modules/",
				"dist/",
				"build/",
				"coverage/",
				"tests/",
				"**/*.test.ts",
				"**/*.spec.ts",
				"**/*.config.ts",
				"**/*.config.js",
			],
			thresholds: {
				lines: 80,
				functions: 80,
				branches: 80,
				statements: 80,
			},
		},

		// Global test timeout
		testTimeout: 10000,

		// Globals
		globals: true,
	},
});
