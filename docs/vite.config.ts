import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite reads docs/index.html as the entry template and emits the built site
// into docs/dist/. The GitHub Actions workflow uploads docs/dist/ to Pages,
// so nothing under docs/ besides source needs to be committed.
// publicDir is `public/` — playground engine assets live there and get
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
});
