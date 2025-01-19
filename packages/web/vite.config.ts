import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
// @ts-ignore
import eslint from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    eslint({
      failOnError: false,
      failOnWarning: false,
      include: ['src/**/*.ts', 'src/**/*.tsx'],
      lintOnStart: false,
      emitWarning: true,
      emitError: true,
      cache: true,
      fix: true
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: true,
    proxy: {
      '/api': {
        target: 'http://localhost:5001',
        ws: true,
        changeOrigin: true
      },
      '/health': 'http://localhost:5001'
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': [
            'react',
            'react-dom',
            'react-router-dom',
            '@tanstack/react-query',
          ],
        },
      },
    },
  },
});