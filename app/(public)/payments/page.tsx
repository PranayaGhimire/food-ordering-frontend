import KhaltiPayment from "@/components/payments/KhaltiPayment";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata:Metadata = {
  title:"Payments"
}
const Payments = () => {

  return (
    <Suspense>
        <KhaltiPayment/>
    </Suspense>
  );
};

export default Payments;
