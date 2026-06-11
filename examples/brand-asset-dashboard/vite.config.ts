import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Prevent Vite from walking up into the monorepo root postcss.config.js.
  css: {
    postcss: {}
  },
  server: {
    port: 4321,
    host: true
  }
});
