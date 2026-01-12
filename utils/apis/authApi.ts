import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { IRegisterForm } from "../interfaces/RegisterForm";
import { ILoginForm } from "../interfaces/LoginForm";
import { axiosInstance } from "../interceptors/axiosInterceptor";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const baseUrl = process.env.NEXT_PUBLIC_URL;
export const useRegister = () => 
    useMutation({
        mutationFn: async (data:IRegisterForm) => {
            const response = await axios.post(`${baseUrl}/auth/register`,data);
            return response.data;   
        },

    })
export const useLogin = () => 
    useMutation({
        mutationFn: async (data:ILoginForm) => {
            const response = await axiosInstance.post(`/auth/login`,data);
            return response.data;
        }
    })

export const useLogout = () => {
   const queryClient = useQueryClient();
   const router = useRouter();
   return useMutation({
        mutationFn: async () => {
            const response = await axiosInstance.post(`/auth/logout`);
            return response.data;
        },
        onSuccess: (response) => {
            toast.success(response.message);
            router.push("/auth");
            queryClient.removeQueries({queryKey:['user']})
        },
        onError: () => toast.error("Oops! Something Went Wrong")
    })
}