import UserOrder from "@/components/orders/UserOrder";
import { Suspense } from "react";

const Orders = () => {
  
  return (
    <Suspense>
        <UserOrder/>
    </Suspense>
  );
};

export default Orders;
