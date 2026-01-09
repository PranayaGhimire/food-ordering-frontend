"use client";

import { Button } from "@/components/ui/button";
import { useGetFood } from "@/utils/apis/foodApi";
import { useCreateOrder, useFindOrder } from "@/utils/apis/orderApi";
import { useGetProfile } from "@/utils/apis/userApi";
import { useQueryClient } from "@tanstack/react-query";
import { RefreshCcw, UtensilsCrossed, Wallet } from "lucide-react";
import {  useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

const Orders = () => {
  const searchParams = useSearchParams();
  const foodId = searchParams.get("food");
  const orderId = searchParams.get("order");
  const { data: food } = useGetFood(foodId);
  const { data: order } = useFindOrder(orderId);
  const {data:profile} = useGetProfile();
  const {mutate} = useCreateOrder();
  const queryClient = useQueryClient();
  const handleCreateOrder = () => {
    const data = {food:food?.data?._id,user:profile?.data?._id}
    mutate(data,{
        onSuccess: (response) => {
            toast.success(response.message);
            queryClient.invalidateQueries({queryKey:['orders']});
        },
        onError: () => toast.error("Oops! Something Went Wrong")
    })
  }
  return (
    <div className="px-5 md:px-20 py-10 space-y-2">
      <h1 className="text-[18px] font-medium">
        Your order for {food?.data?.name} has been received.
      </h1>
      <h2>Plz wait for some time</h2>
      <h3>Pay Now Button will be displayed on your screen</h3>
      <h4>Refresh the page if it doesn&apos;t appear</h4>
      {order?.data?.status === "ACCEPTED" ? (
        <Button variant={`primary`}><Wallet/>Pay Now</Button>
      ) : order?.data?.status === "REJECTED" ? (
        <Button onClick={handleCreateOrder} className="bg-red-500 hover:border-2 hover:border-red-500 hover:bg-white hover:text-red-500"><UtensilsCrossed/>Order Again</Button>
      ) : (
        <Button variant={`primary`} onClick={() => window.location.reload()}><RefreshCcw/>Refresh</Button>
      )}
    </div>
  );
};

export default Orders;
