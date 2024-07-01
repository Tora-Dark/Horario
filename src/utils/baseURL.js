// baseUrl.js
export function baseUrl() {
    const env = import.meta.env.VITE_ENV;
  
    switch (env) {
      case "local":
        return import.meta.env.VITE_LOCAL_API_URL;
      case "production":
        return import.meta.env.VITE_PROD_BASE_URL;
      default:
        return import.meta.env.VITE_LOCAL_API_URL;
    }
  }
  