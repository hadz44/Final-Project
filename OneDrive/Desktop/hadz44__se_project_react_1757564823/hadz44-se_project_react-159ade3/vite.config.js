import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  publicDir: "public",
  assetsInclude: ["**/*.otf", "**/*.woff", "**/*.woff2", "**/*.png", "**/*.jpg", "**/*.svg", "**/*.ico"],
  build: {
    rollupOptions: {
      input: "/index.html",
    },
  },
});
