import { defineConfig } from "vite";
import { resolve } from "node:path";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: ["typewind/babel"],
      },
    }),
  ],
  resolve: {
    alias: {
      "~": resolve(__dirname, "src"),
    },
  },
});
