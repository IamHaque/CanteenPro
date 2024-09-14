import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    globals: true,
    mockReset: true,
    environment: 'jsdom',
  },
});
