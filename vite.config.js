import { defineConfig, splitVendorChunkPlugin } from "vite";
import react from "@vitejs/plugin-react";
export default defineConfig({
  define: {
    "process.env": {},
  },
  plugins: [react(), splitVendorChunkPlugin()],
  build: {
    outDir: "public",
    emptyOutDir: false,
  },
});
