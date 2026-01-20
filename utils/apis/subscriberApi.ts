import { useMutation, useQuery } from "@tanstack/react-query";
import { IAddSubscriber } from "../interfaces/addSubscriberInterface";
import { axiosInstance } from "../interceptors/axiosInterceptor";

export const useGetSubscribers = () =>
    useQuery({
        queryKey:['subscribers'],
        queryFn: async () => {
            const response = await axiosInstance.get(`/subscribers`);
            return response.data;
        }
    })

export const useAddSubscriber = () =>
    useMutation({
        mutationFn: async (data:IAddSubscriber) => {
            const response = await axiosInstance.post(`/subscribers`,data);
            return response.data;
        }
    })