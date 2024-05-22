import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: "https://Tora-Dark.github.io/Horario/", // Asegúrate de que este es el nombre correcto del repositorio
  publicDir: 'public', // Este es el directorio público
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
    ],
  },
});
