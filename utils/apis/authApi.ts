import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { IRegisterForm } from "../interfaces/RegisterForm";
import { ILoginForm } from "../interfaces/LoginForm";

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
            const response = await axios.post(`${baseUrl}/auth/login`,data);
            return response.data;
        }
    })