import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Dev server runs on 5173, matching docker-compose.yml and the
// Gateway's CORS allow-list in gateway/nginx.conf.
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
  },
});
