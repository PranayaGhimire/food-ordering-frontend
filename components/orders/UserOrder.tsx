"use client";

import { Button } from "@/components/ui/button";
import { useGetFood } from "@/utils/apis/foodApi";
import { useCreateOrder, useFindOrder } from "@/utils/apis/orderApi";
import { useInitiateKhalti } from "@/utils/apis/paymentApi";
import { useGetProfile } from "@/utils/apis/userApi";
import { useQueryClient } from "@tanstack/react-query";
import { RefreshCcw, UtensilsCrossed, Wallet } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

const UserOrder = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const foodId = searchParams.get("food");
  const orderId = searchParams.get("order");
  const { data: food } = useGetFood(foodId);
  const { data: order } = useFindOrder(orderId);
  const { data: profile } = useGetProfile();
  const { mutate: createOrder } = useCreateOrder();
  const { mutate: initiateKhalti } = useInitiateKhalti();
  const queryClient = useQueryClient();
  const handleCreateOrder = () => {
    const data = { food: food?.data?._id, user: profile?.data?._id };
    createOrder(data, {
      onSuccess: (response) => {
        toast.success(response.message);
        queryClient.invalidateQueries({ queryKey: ["orders"] });
      },
      onError: () => toast.error("Oops! Something Went Wrong"),
    });
  };
  const handleInitiateKhalti = () => {
    const data = { amount: food?.data?.price, orderId };
    initiateKhalti(data, {
      onSuccess: (response) => {
        toast.success(response.message);
        router.push(response.data.payment_url);
      },
      onError: () => toast.error("Oops! Something Went Wrong"),
    });
  };
  return (
    <div className="px-5 md:px-20 py-10 space-y-2">
      <h1 className="text-[18px] font-medium">
        Your order for {food?.data?.name} has been received.
      </h1>
      <h2>Plz wait for some time</h2>
      <h3>Pay Now Button will be displayed on your screen</h3>
      <h4>Refresh the page if it doesn&apos;t appear</h4>
      {order?.data?.status === "ACCEPTED" ? (
        <Button variant={`primary`} onClick={handleInitiateKhalti}>
          <Wallet />
          Pay Now
        </Button>
      ) : order?.data?.status === "REJECTED" ? (
        <Button
          onClick={handleCreateOrder}
          className="bg-red-500 hover:border-2 hover:border-red-500 hover:bg-white hover:text-red-500"
        >
          <UtensilsCrossed />
          Order Again
        </Button>
      ) : (
        <Button variant={`primary`} onClick={() => window.location.reload()}>
          <RefreshCcw />
          Refresh
        </Button>
      )}
    </div>
  );
};

export default UserOrder;
