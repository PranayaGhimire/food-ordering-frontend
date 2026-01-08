import { useMutation, useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../interceptors/axiosInterceptor";
import { IRegisterForm } from "../interfaces/RegisterForm";

export const useUploadProfile = () => 
    useMutation({
        mutationFn: async (data:FormData) => {
            const response = await axiosInstance.patch(`/users/me`,data);
            return response.data;
        }
    })

export const useGetUsers = () => 
    useQuery({
        queryKey:['users'],
        queryFn: async () => {
            const response = await axiosInstance.get(`/users`);
            return response.data;
        }
    })
export const useGetProfile = () => 
    useQuery({
        queryKey:['user'],
        queryFn: async () => {
            const response = await axiosInstance.get(`/users/me`);
            return response.data;
        },
        retry:false
    });

export const useUpdateProfile = () =>
    useMutation({
        mutationFn: async (data:IRegisterForm) => {
            const response = await axiosInstance.put(`/users/me`,data);
            return response.data;
        }
    })

export const useDeleteUser = () => 
    useMutation({
        mutationFn: async (id:string) => {
            const response = await axiosInstance.delete(`/users/${id}`);
            return response.data;
        } 
    })