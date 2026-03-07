import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
      'react-router-dom': path.resolve(__dirname, 'src/router/react-router-dom.tsx'),
      'lucide-react': path.resolve(__dirname, 'src/components/lucide-react.tsx'),
    },
  },
});
