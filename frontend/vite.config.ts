import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    headers: {
      'Content-Security-Policy':
        "default-src 'self'; " +
        "script-src 'self' 'unsafe-inline' 'unsafe-eval'; " +
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
        "img-src 'self' data: https://image.tmdb.org; " +
        "frame-ancestors 'none'; " +
        "font-src 'self' https://fonts.gstatic.com data:; " +
        "connect-src 'self' https://localhost:5000 https://*.database.windows.net; " +
        "object-src 'none'; base-uri 'self'; form-action 'self';",
    },
  },
});
