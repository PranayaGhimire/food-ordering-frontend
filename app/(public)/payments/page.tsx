"use client";
import { Button } from "@/components/ui/button";
import { useVerifyKhalti } from "@/utils/apis/paymentApi";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import toast from "react-hot-toast";

const Payments = () => {
  const searchParams = useSearchParams();
  const pidx = searchParams.get("pidx");
  const orderId = searchParams.get("purchase_order_id");
  const { mutate: verifyKhalti } = useVerifyKhalti();
  const handleVerifyKhalti = () => {
    const data = { pidx, orderId };
    verifyKhalti(data, {
      onSuccess: (response) => {
        toast.success(response.message);
      },
      onError: () => toast.error("Oops! Something Went Wrong"),
    });
  };
  return (
    <Suspense>
      <div className="px-5 md:px-20 py-10 space-y-3">
        <h1>Your payment has been initiated successfully</h1>
        <h2>Click on verify payment to verify the payment</h2>
        <Button onClick={handleVerifyKhalti} variant={`primary`}>
          Verify Payment
        </Button>
      </div>
    </Suspense>
  );
};

export default Payments;
