import { useMutation, useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../interceptors/axiosInterceptor";
import { IAddRating } from "../interfaces/ratingInterface";

export const useGetRatings = () =>
    useQuery({
        queryKey:['ratings'],
        queryFn: async () => {
            const response = await axiosInstance.get(`/ratings`);
            return response.data;
        }
    })

export const useAddRating = () => 
    useMutation({
        mutationFn: async (data:IAddRating) => {
            const response = await axiosInstance.post(`/ratings`,data);
            return response.data;
        }
    })

export const useDeleteRating = () =>
    useMutation({
        mutationFn: async (id:string) => {
            const response = await axiosInstance.delete(`/ratings/${id}`);
            return response.data;
        }
    })
