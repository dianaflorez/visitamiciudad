import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Agregar un interceptor para las solicitudes
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Agregar un interceptor para las respuestas
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Manejar errores de respuesta
    if (error.response && error.response.status === 401) {
      console.error("No autorizado, redirigiendo a la página de login...");
    }
    return Promise.reject(error);
  }
);
/**/
export default apiClient;
