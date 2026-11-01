import { resolve } from 'node:path';
import { defineConfig } from 'vite';

// Çok sayfalı build: ana hikâye + sipariş sayfası
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        siparis: resolve(import.meta.dirname, 'siparis.html'),
      },
    },
  },
});
