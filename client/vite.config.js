import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";


// https://vite.dev/config/
export default defineConfig({
  plugins: [react({ jsxImportSource: "@emotion/react" })],
  server: {
    proxy: {
      "/api": {
        target: import.meta.env.VITE_BACKEND,
        secure: false,
      },
    },
  },
});