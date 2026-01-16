import axios from "axios";

let accessToken: string | null = null;
export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_URL,
  withCredentials: true,
});
axiosInstance.interceptors.request.use(
  (config) => {
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken};`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    console.log(originalRequest);
    if (error?.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // Call refresh endpoint, HttpOnly cookie is sent automatically
        const res = await axiosInstance.post("/auth/refresh");
        accessToken = res.data.accessToken;

        // Retry original request with new access token
        originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
        return axiosInstance(originalRequest);
      } catch (error) {
        // If refresh fails (e.g., refresh token expired), redirect to login
        console.warn("Refresh token failed, redirecting to login.");
        window.location.href = "/auth";
      }
    }
    return Promise.reject(error);
  }
);
