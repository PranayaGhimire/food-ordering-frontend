import axios from "axios";
export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_URL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    console.log(originalRequest)
    if (error?.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      await axiosInstance.post("/auth/refresh");
      return axios(originalRequest);
      // console.warn("Unauthorized! Redirecting to Auth page");
      // window.location.href="/auth"
    }
    return Promise.reject(error);
  }
);
