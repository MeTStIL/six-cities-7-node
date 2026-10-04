import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    target: 'esnext',
    outDir: 'dist',
    ssr: true,
    rollupOptions: {
      input: {
        'main.cli': 'src/main.cli.ts',
        'main': 'src/main.ts',
      },
    },
  },
});
