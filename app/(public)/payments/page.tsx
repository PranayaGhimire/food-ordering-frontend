import KhaltiPayment from "@/components/payments/KhaltiPayment";
import { Suspense } from "react";

const Payments = () => {

  return (
    <Suspense>
        <KhaltiPayment/>
    </Suspense>
  );
};

export default Payments;
