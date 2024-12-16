// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // Your backend server URL
        changeOrigin: true,
        secure: false, // Optional: set to false if your backend is not using HTTPS
        // Optional: rewrite the path if necessary
        // rewrite: (path) => path.replace(/^\/api/, ''),
      },
      '/supplier': {
        target: 'http://localhost:5000', // Proxy for supplier-specific routes
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
