import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:9000',  // Reemplaza con la URL de tu API
});

// Añadir un interceptor para incluir el token en cada solicitud
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Obtener el token del localStorage

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;