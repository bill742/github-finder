import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@context": path.resolve(__dirname, "./src/context"),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  // Environment variable prefix (CRA uses REACT_APP_, Vite uses VITE_)
  envPrefix: "VITE_",
});
