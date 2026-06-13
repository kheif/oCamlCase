/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite reads docs/index.html as the entry template and emits the built site
// into docs/dist/. The GitHub Actions workflow uploads docs/dist/ to Pages,
// so nothing under docs/ besides source needs to be committed.
// publicDir is `public/`, where playground engine assets live and get
// copied verbatim, preserving `/playground/...` URLs that the legacy editor
// JS hard-codes.
export default defineConfig({
  plugins: [react()],
  base: '/',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    assetsDir: 'assets',
  },
  test: {
    // jsdom so the localStorage-backed progress hooks run; pure-logic tests
    // are environment-agnostic and run fine here too.
    environment: 'jsdom',
    include: ['src/**/*.test.{ts,tsx}'],
    restoreMocks: true,
  },
});
