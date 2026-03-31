import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
  },
  // @ts-ignore: Vite прекрасно понимает блок test, просто TS об этом не знает
  test: {
    environment: "happy-dom",
    setupFiles: "./src/setupTests.ts",
    css: false,
  },
});
