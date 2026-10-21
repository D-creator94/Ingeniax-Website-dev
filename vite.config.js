import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/Ingeniax-Website-dev/',
  server: { proxy: { '/api': 'http://127.0.0.1:3001' } },
});
