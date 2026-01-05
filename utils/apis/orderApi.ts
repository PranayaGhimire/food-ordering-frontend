import { useMutation, useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../interceptors/axiosInterceptor";
import { IOrder } from "../interfaces/OrderInterface";

export const useFindOrders = () =>
    useQuery({
        queryKey: ['orders'],
        queryFn: async () => {
            const response =await axiosInstance.get(`/orders`);
            return response.data;
        }
    })

export const useCreateOrder = () =>
    useMutation({
        mutationFn: async (data:IOrder) => {
            const response = await axiosInstance.post(`/orders`,data);
            return response.data;
        }
    })