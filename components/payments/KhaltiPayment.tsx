"use client";
import { Button } from "@/components/ui/button";
import { useFindOrder } from "@/utils/apis/orderApi";
import { useVerifyKhalti } from "@/utils/apis/paymentApi";
import { useAddRating } from "@/utils/apis/ratingApi";
import { useGetProfile } from "@/utils/apis/userApi";
import { RefreshCcw, ShieldCheck } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaStar } from "react-icons/fa";
import { ClipLoader } from "react-spinners";
const KhaltiPayment = () => {
  const {data:profile} = useGetProfile();
  const [rating, setRating] = useState<number>();
  const searchParams = useSearchParams();
  const pidx = searchParams.get("pidx");
  const orderId = searchParams.get("purchase_order_id");
  const food = searchParams.get("purchase_order_name");
  const {data:order} = useFindOrder(orderId);
  
  const { mutate: verifyKhalti, isPending } = useVerifyKhalti();
  const { mutate: addRating } = useAddRating();
  const handleVerifyKhalti = () => {
  const data = { pidx, orderId };
    verifyKhalti(data, {
      onSuccess: (response) => {
        toast.success(response.message);
      },
      onError: () => toast.error("Oops! Something Went Wrong"),
    });
  };
  const handleAddRating = (index: number) => {
    setRating(index);
    const data = {user:profile?.data?._id, order: orderId, rating };
    addRating(data, {
      onSuccess: (response) => {
        toast.success(response.message);
      },
      onError: () => toast.error("Oops! Something Went Wrong"),
    });
  };
  return (
    <div className="px-5 md:px-20 py-10 space-y-3">
      <h1 className="text-[18px] font-medium">
        Your payment for {food} has been initiated successfully
      </h1>
      <h2>Click on verify payment to verify the payment</h2>
      <Button
        onClick={handleVerifyKhalti}
        variant={`primary`}
        disabled={isPending}
      >
        {isPending ? (
          <ClipLoader size={20} color="white" />
        ) : (
          <p className="flex items-center gap-1.5">
              <ShieldCheck />Verify Payment 
          </p>
        )}
      </Button>
      <h3 className="text-[18px] font-medium">After verifying payment rate our food and service</h3>
          <h4>Refresh the page if rating window doesn&apos;t appear</h4>
      {order?.data?.paymentStatus === "PAID" ? (
        <div className="space-y-3">

          <div className="flex gap-2">
            {Array.from({ length: 5 }).map((_, index) => (
              <FaStar
                onClick={() => handleAddRating(index)}
                key={index}
                className={` ${
                  index <= rating! && "text-yellow-600"
                } text-xl hover:text-yellow-600 cursor-pointer`}
              />
            ))}
          </div>
        </div>
      ) : (
        <div>
          <Button variant={`primary`} onClick={() => window.location.reload()}>
            <RefreshCcw />
            Refresh
          </Button>
        </div>
      )}
    </div>
  );
};

export default KhaltiPayment;
