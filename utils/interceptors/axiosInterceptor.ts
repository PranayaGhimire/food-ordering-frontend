import axios from "axios";

// Main axios instance for API calls
export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_URL,
  withCredentials: true,
});

// Separate instance for refresh token requests (to avoid interceptor loop)
const refreshAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_URL,
  withCredentials: true,
});

// Request interceptor (if you need to attach tokens from headers)
axiosInstance.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error),
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/auth/refresh")
    ) {
      originalRequest._retry = true;

      try {
        await refreshAxios.post("/auth/refresh"); // httpOnly cookie sent automatically
        return axiosInstance(originalRequest);
      } catch {
        // Guest or refresh token expired → fail silently
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  },
);
