import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const REPO_BASE = '/noor-digital-portfolio/';
const IS_VERCEL = process.env.VERCEL === '1';

export default defineConfig(({ command, isPreview }) => ({
  base: IS_VERCEL
    ? '/'
    : command === 'build' || isPreview
      ? REPO_BASE
      : '/',
  plugins: [react()],
  build: {
    target: 'es2022',
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [{ name: 'vendor', test: /node_modules/ }],
        },
      },
    },
  },
}));