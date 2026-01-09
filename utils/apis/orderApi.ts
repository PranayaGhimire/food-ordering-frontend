import { useMutation, useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../interceptors/axiosInterceptor";
import { ICreateOrder, IUpdateOrder } from "../interfaces/OrderInterface";

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
        mutationFn: async (data:ICreateOrder) => {
            const response = await axiosInstance.post(`/orders`,data);
            return response.data;
        }
    })

export const useUpdateOrder = () =>
    useMutation({
        mutationFn: async (data:IUpdateOrder) => {
            const response = await axiosInstance.put(`/orders/${data.id}`,data);
            return response.data;
        }
    })