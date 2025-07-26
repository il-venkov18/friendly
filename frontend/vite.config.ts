/// <reference types="vite/client" />

import path from "path"
import { defineConfig } from "vite"
import tsconfigPaths from "vite-tsconfig-paths"

import basicSsl from "@vitejs/plugin-basic-ssl"
import react from "@vitejs/plugin-react-swc"

export default defineConfig({
  plugins: [react(), tsconfigPaths(), basicSsl()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  server: {
    allowedHosts: true,
    host: true,
    port: 5173,
    strictPort: true,
    headers: {
      "Cross-Origin-Embedder-Policy": "require-corp",
      "Cross-Origin-Opener-Policy": "same-origin",
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "@/shared/styles/variables" as *;\n
        `,
      },
    },
  },
})
