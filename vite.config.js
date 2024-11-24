import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/send-email": "http://localhost:3000", // Proxy för API-anrop till backend
    },
  },
});
