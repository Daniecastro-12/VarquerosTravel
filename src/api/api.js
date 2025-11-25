import axios from "axios";

// Instancia principal de Axios
const api = axios.create({
  baseURL: "https://reserva-turistica.onrender.com/api",
});

// Interceptor para agregar token automáticamente
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
