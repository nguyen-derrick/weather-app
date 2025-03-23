import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    hmr: {
      // Force WebSocket connection to use the same protocol as the page
      protocol: 'ws',
      // Allow connections from any host (for Same preview)
      clientPort: 443
    },
  }
});
