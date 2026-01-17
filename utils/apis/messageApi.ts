import { useMutation, useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../interceptors/axiosInterceptor";
import { ISendMessage } from "../interfaces/SendMessageInterface";
import axios from "axios";

export const useGetMessages = () =>
    useQuery({
        queryKey:['messages'],
        queryFn: async () => {
            const response = await axiosInstance.get('/messages');
            return response.data;
        }
    })

export const useSendMessage = () => 
    useMutation({
        mutationFn: async (data: ISendMessage) => {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_URL}/messages`,data);
            return response.data;
        }
    })