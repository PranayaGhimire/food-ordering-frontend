import axios from "axios";
// import Cookies from "js-cookie";
export const axiosInstance = axios.create({
    baseURL:process.env.NEXT_PUBLIC_URL,
    withCredentials:true
})

axiosInstance.interceptors.request.use((config) => {
    // const token = Cookies.get("token");
    // if(token) {
    //     config.headers.Authorization=`Bearer ${token}`;
    // }
    return config;
},(error) => Promise.reject(error));

axiosInstance.interceptors.response.use((response) => response,async (error) => {
    const originalRequest = error.config;

    if(error?.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry=true;
        await axios.post(`/auth/refresh`,{},{withCredentials:true});
        return axios(originalRequest);
        // console.warn("Unauthorized! Redirecting to Auth page");
        // window.location.href="/auth"
    }
    return Promise.reject(error);
})