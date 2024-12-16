import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "/api",
});

// Add a request interceptor to attach token
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;