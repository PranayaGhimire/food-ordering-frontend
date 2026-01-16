import { useMutation, useQuery } from "@tanstack/react-query"
import { axiosInstance } from "../interceptors/axiosInterceptor";
import axios from "axios";

const baseURL=process.env.NEXT_PUBLIC_URL;
export const useAddFood = () => 
    useMutation({
        mutationFn: async (data:FormData) => {
            const response = await axiosInstance.post(`/foods`,data);
            return response.data;
        }
    })

export const useGetFoods = () => 
    useQuery({
        queryKey: ['foods'],
        queryFn: async () => {
            const response = await axios.get(`${baseURL}/foods`);
            return response.data;
        }
    });

export const useGetFood = (id:string | null) =>
    useQuery({
        queryKey:['foods',id],
        queryFn: async () => {
            const response = await axios.get(`${baseURL}/foods/${id}`);
            return response.data;
        }
    });

export const useUpdateFood = () =>
    useMutation({
        mutationFn: async ({id,data}:{id:string,data:FormData}) => {
            const response =await axiosInstance.put(`/foods/${id}`,data);
            return response.data;
        }
    });

export const useUpdateFoodAvailability = () =>
    useMutation({
        mutationFn: async ({id,isAvailable}:{id:string,isAvailable:boolean}) => {
            const response = await axiosInstance.patch(`/foods/${id}`,{
                isAvailable
            });
            return response.data
        }
    })

export const useDeleteFood = () =>
    useMutation({
        mutationFn: async (id:string) => {
            const response = await axiosInstance.delete(`/foods/${id}`);
            return response.data;
        }
    })