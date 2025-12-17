import { defineConfig } from "tsdown";

export default defineConfig({
	// Entry point for the library
	entry: ["src/index.ts"],

	// Output formats (ESM and CommonJS for maximum compatibility)
	format: ["esm", "cjs"],

	// Generate TypeScript declaration files
	dts: true,

	// Generate source maps for debugging
	sourcemap: true,

	// Clean output directory before build
	clean: true,

	// Target Node.js version from package.json engines field
	target: "node22",

	// Minify output (disabled for library - users decide)
	minify: false,

	// External dependencies (don't bundle node_modules)
	external: [/node_modules/],

	// Platform target
	platform: "node",
});
