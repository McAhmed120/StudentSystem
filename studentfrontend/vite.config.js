import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    proxy: {
      // Proxy API requests during development to avoid CORS issues.
      '/student': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
        // keep path as-is
      },
    },
  },
});