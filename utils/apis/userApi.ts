import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";

const baseUrl = process.env.NEXT_PUBLIC_URL;
const token = Cookies.get("token");
export const useUploadProfile = () => 
    useMutation({
        mutationFn: async (data:FormData) => {
            const response = await axios.patch(`${baseUrl}/users/me`,data,{
                headers:{
                    Authorization:`Bearer ${token}`,
                    "Content-Type":"multipart/form-data"
                }
            });
            return response.data;
        }
    })
export const useGetProfile = () => 
    useQuery({
        queryKey:['user'],
        queryFn: async () => {
            const response = await axios.get(`${baseUrl}/users/me`,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            });
            return response.data;
        }
    })