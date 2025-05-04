import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import compression from "vite-plugin-compression";

export default defineConfig({
  base: "/",
  plugins: [
    react(),

    compression({
      algorithm: "brotliCompress", // Use Brotli if possible
      ext: ".br",
      deleteOriginFile: false,
    }),

    compression({
      algorithm: "gzip",
      ext: ".gz",
      deleteOriginFile: false,
    }),
  ],
});
