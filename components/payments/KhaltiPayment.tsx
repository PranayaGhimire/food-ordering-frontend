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
import { Textarea } from "../ui/textarea";
import { useForm } from "react-hook-form";
import { IAddRating } from "@/utils/interfaces/ratingInterface";
const KhaltiPayment = () => {
  const {data:profile} = useGetProfile();
  const {handleSubmit,register,setValue,watch} = useForm<IAddRating>();
  const [hoveredRating,setHoveredRating] = useState(0);
  const ratingValue = watch("rating");
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
  const onSubmit = (data:IAddRating) => {
    data = {...data,user:profile?.data?._id,order:orderId};
    addRating(data, {
      onSuccess: (response) => {
        toast.success(response.message);
      },
      onError: () => toast.error("Oops! Something Went Wrong"),
    });
  } 
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
        className="text-white"
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
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <p className="font-medium text-[18px]">Add your review</p>
          <div className="flex gap-2" onMouseLeave={() => setHoveredRating(0)}>
            {Array.from({ length: 5 }).map((_, index) => {
              const starValue = index+1;
              const isActive = starValue<= (hoveredRating || ratingValue!); 
              return <FaStar
                onMouseEnter={() => setHoveredRating(starValue)}
                onClick={() => setValue("rating",index+1)}
                key={index}
                className={` ${isActive && "text-yellow-500"
                } text-xl  cursor-pointer transition-colors text-gray-500`}
              />}
            )}
          </div>
          <Textarea {...register('comment')} placeholder="Write a comment" className="md:w-1/2"/>
          <Button variant={`primary`} className="text-white">Submit</Button>
        </form>
      ) : (
        <div>
          <Button variant={`primary`} className="text-white" onClick={() => window.location.reload()}>
            <RefreshCcw />
            Refresh
          </Button>
        </div>
      )}
    </div>
  );
};

export default KhaltiPayment;
