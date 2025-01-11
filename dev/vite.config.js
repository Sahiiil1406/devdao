// vite.config.js
import { defineConfig } from "vite";
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import react from "@vitejs/plugin-react";
import path from "path";
export default defineConfig({
  define: {
    'process.env': {}, // Simulate process.env
  },
  plugins: [react(),
	nodePolyfills({
		// Whether to polyfill specific globals
		globals: {
		  Buffer: true,
		  global: true,
		  process: true,
		},
		// Whether to polyfill `node:` protocol imports
		protocolImports: true,
	  })
],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
});