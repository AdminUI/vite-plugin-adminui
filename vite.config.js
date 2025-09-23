import { defineConfig } from "vite";
import { resolve } from "node:path";
import { nodeExternals } from 'rollup-plugin-node-externals'

export default defineConfig({
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, "index.js"),
      formats: ["cjs", "es"],
      fileName: "index",
    },
  },
  plugins: [nodeExternals()]
});
