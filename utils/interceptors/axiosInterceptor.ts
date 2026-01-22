import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_URL,
  withCredentials: true,
});

// ✅ Attach access token
axiosInstance.interceptors.request.use(
  config =>  config,
  (error) => Promise.reject(error),
);

// ✅ Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  async function (error) {
        const originalRequest = error.config;
        if (error.response && error.response.status === 403 && !originalRequest._retry) {
            originalRequest._retry = true;
               await axiosInstance.post(`/auth/refresh`, {
                    withCredentials: true // This attaches cookies (e.g., refresh token) to the request
                });
                return axiosInstance(originalRequest);
        }
        return Promise.reject(error);
    }
);   
