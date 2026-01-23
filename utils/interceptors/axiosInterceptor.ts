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

// Flag to prevent multiple refresh attempts simultaneously
// let isRefreshing = false;
// let failedQueue: Array<{
//   resolve: (value?: unknown) => void;
//   reject: (reason?: unknown) => void;
// }> = [];

// const processQueue = (error: unknown | null) => {
//   failedQueue.forEach((prom) => {
//     if (error) {
//       prom.reject(error);
//     } else {
//       prom.resolve();
//     }
//   });
//   failedQueue = [];
// };

// Request interceptor (if you need to attach tokens from headers)
axiosInstance.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Skip refresh logic for the refresh endpoint itself
    if (originalRequest.url?.includes("/auth/refresh")) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      // if (isRefreshing) {
      //   // If already refreshing, queue this request
      //   return new Promise((resolve, reject) => {
      //     failedQueue.push({ resolve, reject });
      //   })
      //     .then(() => axiosInstance(originalRequest))
      //     .catch((err) => Promise.reject(err));
      // }

      originalRequest._retry = true;
      // isRefreshing = true;

      try {
        // Use separate axios instance for refresh to avoid interceptor loop
        await refreshAxios.post("/auth/refresh");
        // processQueue(null);
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // processQueue(refreshError);
        // Optionally redirect to login or clear auth state here
        console.error("Token refresh failed:", refreshError);
        return Promise.reject(refreshError);
      } // finally {
      //   isRefreshing = false;
      // }
    }

    return Promise.reject(error);
  }
);
