import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// Función para determinar la URL base
function getBaseUrl(env) {
  switch (env.VITE_ENV) {
    case 'local':
      return env.VITE_LOCAL_API_URL;
    case 'production':
      return env.VITE_PROD_BASE_URL;
    default:
      return env.VITE_LOCAL_API_URL;
  }
}

export default defineConfig(({ mode }) => {
  // Cargar variables de entorno según el modo (desarrollo, producción, etc.)
  const env = loadEnv(mode, process.cwd());

  // Determinar la URL base
  const baseURL = getBaseUrl(env);

  return {
    plugins: [react()],
    base: baseURL, // Asegúrate de que esta es la URL base correcta
    publicDir: 'public', // Este es el directorio público
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
      ],
    },
  };
});
