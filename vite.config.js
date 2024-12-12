import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/To-Do-List/', // Use the path from the 'homepage' field in your package.json
  build: {
    outDir: 'build', // Ensure the build output goes to the 'build' folder
  },
});
