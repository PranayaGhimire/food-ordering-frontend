import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../interceptors/axiosInterceptor";
import { IAddRating } from "../interfaces/ratingInterface";


export const useAddRating = () => 
    useMutation({
        mutationFn: async (data:IAddRating) => {
            const response = await axiosInstance.post(`/ratings`,data);
            return response.data;
        }
    })
