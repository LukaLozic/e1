// eslint.config.mjs
import { defineConfig } from 'eslint-config-next';

export default defineConfig({
  extends: ['next/core-web-vitals'],
  ignorePatterns: ['.next/**'], // Ignore the .next directory
});
