import axios from "axios";
import Cookies from "js-cookie";
export const axiosInstance = axios.create({
    baseURL:process.env.NEXT_PUBLIC_URL
})

axiosInstance.interceptors.request.use((config) => {
    const token = Cookies.get("token");
    if(token) {
        config.headers.Authorization=`Bearer ${token}`;
    }
    return config;
},(error) => Promise.reject(error));

axiosInstance.interceptors.response.use((response) => response,(error) => {
    if(error?.response.status === 401) {
        console.warn("Unauthorized! Redirecting to /auth...");
    }
    return Promise.reject(error);
})