import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../interceptors/axiosInterceptor";
import { IInitiateKhalti, IVerifyKhalti } from "../interfaces/khaltiInterface";

export const useInitiateKhalti = () =>
    useMutation({
        mutationFn: async (data:IInitiateKhalti ) => {
            const response = await axiosInstance.post(`/payments/khalti/initiate`,data);
            return response.data; 
        }
    })

export const useVerifyKhalti = () =>
    useMutation({
        mutationFn: async (data:IVerifyKhalti) => {
            const response = await axiosInstance.post(`/payments/khalti/verify`,
                data
            );
            return response.data;
        }
    })